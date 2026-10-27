import os
import json
import time
import queue
import socket
import threading
from pathlib import Path
from activity_hub.ids import uuid7
from activity_hub.database import get_client
from activity_hub.records import COLUMNS, insert_values
from activity_hub.logger import logger

REPLAY_EVERY_SECONDS = 10
DEDUP_WINDOW_DAYS = 1
# a claimed spool file still there after this long belongs to a writer that died while replaying it
# (the claim refreshes the file's time, so an old spool file is not taken for an abandoned claim)
STALE_CLAIM_SECONDS = 600
# spool files replayed per round, so a long backlog never starves the live queue
REPLAY_FILES_PER_ROUND = 20
# rows spooled per file while the database is down: writing each small batch would cost a file and,
# before that, a connect timeout per batch
SPOOL_ROWS_PER_FILE = 10_000


class Writer:
    """Takes rows from any thread and writes them to ClickHouse from one background thread, in batches.
    A batch that cannot be written goes to a spool file and is written again later; a row already
    in the table (a retry whose first attempt did land) is dropped, so each id is stored once."""

    def __init__(self, settings: dict, spool_dir: str, batch_size: int, flush_interval: float, max_queue: int):
        self._settings = settings
        self._batch_size = batch_size
        self._flush_interval = flush_interval
        self._queue = queue.Queue(maxsize=max_queue)
        self._spool_dir = Path(spool_dir)
        self._spool_dir.mkdir(parents=True, exist_ok=True)
        self._claim_suffix = f".claimed-{socket.gethostname()}-{os.getpid()}"
        self._client = None
        # set when a write fails: rows go straight to the spool until a replay round gets through
        self._down = False
        self._overflow = []
        self._overflow_lock = threading.Lock()
        self._stopping = threading.Event()
        self._last_replay = 0.0
        self.stats = {"written": 0, "duplicates": 0, "spooled": 0, "replayed": 0, "write_errors": 0}
        self._thread = threading.Thread(target=self._run, name="activity-hub-writer", daemon=True)
        self._thread.start()

    def put(self, table: str, row: dict) -> None:
        try:
            self._queue.put_nowait((table, row))
        except queue.Full:
            # kept for the writer thread to spool in bulk: never a file per row on the caller's thread
            with self._overflow_lock:
                self._overflow.append((table, row))

    def flush(self, timeout: float) -> bool:
        """Waits until everything put before this call is written or spooled."""
        done = threading.Event()
        started = time.monotonic()
        try:
            self._queue.put(("flush", done), timeout=timeout)
        except queue.Full:
            return False
        return done.wait(max(0.0, timeout - (time.monotonic() - started)))

    def close(self, timeout: float) -> None:
        self.flush(timeout)
        self._stopping.set()
        self._thread.join(timeout)
        # whatever the thread could not write in time is spooled, not lost with the process
        rest = self._drain(self._queue.qsize())
        with self._overflow_lock:
            rest, self._overflow = rest + self._overflow, []
        if rest:
            self._spool(rest)

    def queued(self) -> int:
        return self._queue.qsize()

    def _run(self) -> None:
        while not self._stopping.is_set():
            waiting = []
            try:
                batch, waiting = self._take()
                with self._overflow_lock:
                    overflow, self._overflow = self._overflow, []
                if self._down:
                    batch += self._drain(SPOOL_ROWS_PER_FILE - len(batch))
                if batch:
                    self._write_or_spool(batch)
                if overflow:
                    self._spool(overflow)
                if time.monotonic() - self._last_replay >= REPLAY_EVERY_SECONDS:
                    self._last_replay = time.monotonic()
                    if self._replay_spool() and self._queue.qsize() < self._batch_size:
                        self._last_replay = 0.0   # more backlog and a quiet queue: carry on next loop
            except Exception:
                # the thread must outlive any surprise, or recording stops for the process's lifetime
                logger.exception("activity hub: writer loop error")
            finally:
                for done in waiting:
                    done.set()

    def _take(self) -> tuple:
        """Up to batch_size rows, gathered for at most flush_interval; and any flush waiters seen."""
        batch, waiting = [], []
        deadline = time.monotonic() + self._flush_interval
        while len(batch) < self._batch_size:
            remaining = deadline - time.monotonic()
            if remaining <= 0:
                break
            try:
                table, item = self._queue.get(timeout=remaining)
            except queue.Empty:
                break
            if table == "flush":
                waiting.append(item)
                break
            batch.append((table, item))
        return batch, waiting

    def _drain(self, limit: int) -> list:
        """Up to limit rows already queued, without waiting; flush waiters seen are released."""
        rows = []
        while len(rows) < limit:
            try:
                table, item = self._queue.get_nowait()
            except queue.Empty:
                break
            if table == "flush":
                item.set()
            else:
                rows.append((table, item))
        return rows

    def _write_or_spool(self, batch: list) -> None:
        if self._down:
            self._spool(batch)
            return
        try:
            self._write(batch)
        except Exception as e:
            self.stats["write_errors"] += 1
            logger.warning(f"activity hub: write failed, {len(batch)} row(s) spooled until it is back: {e}")
            self._client = None
            self._down = True
            self._spool(batch)

    def _write(self, batch: list) -> None:
        if self._client is None:
            self._client = get_client(self._settings, database=self._settings["database"])
        by_table, received = {}, {}
        for table, row in batch:
            by_table.setdefault(table, {})[row["id"]] = row
            received[table] = received.get(table, 0) + 1
        for table, rows in by_table.items():
            existing = self._existing_ids(table, rows)
            fresh = [row for row_id, row in rows.items() if row_id not in existing]
            self.stats["duplicates"] += received[table] - len(fresh)
            if fresh:
                # The server gathers the inserts of every service into a few parts (one per insert
                # would leave it merging all day); wait_for_async_insert keeps each insert answered
                # only once it is stored, so a failure still reaches the spool.
                self._client.insert(table, [insert_values(table, row) for row in fresh],
                                    column_names=list(COLUMNS[table]),
                                    settings={"async_insert": 1, "wait_for_async_insert": 1})
                self.stats["written"] += len(fresh)

    def _existing_ids(self, table: str, rows: dict) -> set:
        """Ids of these rows already stored, in one query. The lookup is bounded to a day either side
        of the rows' times, which keeps it to a few partitions and covers any realistic resend."""
        times = [row["occurred_at"] for row in rows.values()]
        result = self._client.query(
            f"SELECT toString(id) FROM {table} WHERE occurred_at BETWEEN "
            f"{{low:DateTime64(3, 'UTC')}} - INTERVAL {DEDUP_WINDOW_DAYS} DAY AND "
            f"{{high:DateTime64(3, 'UTC')}} + INTERVAL {DEDUP_WINDOW_DAYS} DAY AND id IN {{ids:Array(UUID)}}",
            parameters={"low": min(times), "high": max(times), "ids": list(rows)},
        )
        return {row[0] for row in result.result_rows}

    def _spool(self, batch: list) -> None:
        """Writes the rows to a new file, made visible only once complete (written, then renamed)."""
        name = self._spool_dir / f"{uuid7()}.jsonl"
        temporary = name.with_suffix(".tmp")
        try:
            with open(temporary, "w") as handle:
                for table, row in batch:
                    handle.write(json.dumps({"table": table, "row": row}) + "\n")
                handle.flush()
                os.fsync(handle.fileno())   # a rename that survives a power cut must not name an empty file
            temporary.rename(name)
            self.stats["spooled"] += len(batch)
        except OSError as e:
            logger.error(f"activity hub: {len(batch)} row(s) lost, spool not writable: {e}")

    def _replay_spool(self) -> bool:
        """Writes spooled files back, oldest first, at most REPLAY_FILES_PER_ROUND; True when more are
        waiting. A file is claimed by renaming it, so writers of several processes sharing the
        directory never replay the same file twice. A round that gets through ends an outage."""
        now = time.time()
        candidates = sorted(self._spool_dir.glob("*.jsonl")) + [
            path for path in self._spool_dir.glob("*.claimed-*") if now - path.stat().st_mtime > STALE_CLAIM_SECONDS
        ]
        if not candidates and self._down:
            try:
                self._write([])   # nothing to replay: a plain connect tells whether it is back
                self._down = False
            except Exception:
                self._client = None
            return False
        for path in candidates[:REPLAY_FILES_PER_ROUND]:
            spool_name = path.name.split(".", 1)[0] + ".jsonl"
            claimed = path.with_name(spool_name + self._claim_suffix)
            try:
                path.rename(claimed)
                os.utime(claimed)
            except OSError:
                continue
            try:
                batch = [(entry["table"], entry["row"]) for entry in map(json.loads, claimed.read_text().splitlines())]
            except (OSError, ValueError, KeyError) as e:
                logger.error(f"activity hub: unreadable spool file {claimed.name} kept for inspection: {e}")
                continue
            try:
                for start in range(0, len(batch), self._batch_size):
                    self._write(batch[start:start + self._batch_size])
            except Exception as e:
                # rows already written by this attempt are dropped as duplicates next time
                logger.warning(f"activity hub: replay of {spool_name} failed, kept for later: {e}")
                self._client = None
                self._down = True
                claimed.rename(path.with_name(spool_name))
                # the database is most likely still down; the rest waits for the next round
                return False
            claimed.unlink()
            self.stats["replayed"] += len(batch)
        self._down = False
        return len(candidates) > REPLAY_FILES_PER_ROUND
