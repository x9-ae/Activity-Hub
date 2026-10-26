import atexit
import tempfile
from pathlib import Path
from activity_hub.context import current_context
from activity_hub.records import EVENTS_TABLE, ACCESS_TABLE, event_row, access_row
from activity_hub.writer import Writer


class ActivityHub:
    """Records activity from an application into the Hub's database.

    Recording never waits for the database: rows are written in the background, in batches.
    When the database cannot be reached they are kept in spool files and written later, and a
    row is never stored twice. Create one per process, after any fork, and close it on shutdown.

    settings: host, port, database, user, password (the Hub's append-only user).
    """

    def __init__(self, settings: dict, *, app: str, environment: str, service: str, enabled: bool = True,
                 spool_dir: str | None = None, batch_size: int = 200, flush_interval: float = 1.0,
                 max_queue: int = 100_000):
        self.enabled = enabled
        self._source = {"app": app, "environment": environment, "service": service}
        self._writer = None
        if enabled:
            spool = spool_dir or str(Path(tempfile.gettempdir()) / "activity_hub_spool" / f"{app}-{service}")
            self._writer = Writer(settings, spool, batch_size, flush_interval, max_queue)
            atexit.register(self.close)

    def record_event(self, action: str, **fields) -> str:
        """Records one audit event and returns its id.

        action: dotted name, e.g. "trade.closed"; its first part is the category.
        fields: actor_type, actor_id, actor_name, target_type, target_id, target_name,
        related [(type, id), ...], tenant_id, outcome ("success" | "refused" | "failed"), reason,
        changes {"before": ..., "after": ...}, metadata, origin, ip, country, user_agent, request_id,
        session_id, occurred_at, imported, and event_id: an idempotency key; the same id recorded
        again within a day of the first is stored once.
        Actor, origin, IP and request come from the current request when not given.
        Raises ValueError when the event itself is wrong; never because of the database.
        """
        row = event_row(self._source, current_context(), action=action, **fields)
        if self._writer:
            self._writer.put(EVENTS_TABLE, row)
        return row["id"]

    def record_access(self, *, method: str, route: str, path: str, status: int, duration_ms: int) -> None:
        """Records one API request; who and from where come from the current request."""
        if self._writer:
            self._writer.put(ACCESS_TABLE, access_row(self._source, current_context(), method=method, route=route,
                                                      path=path, status=status, duration_ms=duration_ms))

    def flush(self, timeout: float = 10.0) -> bool:
        """Waits until everything recorded so far is written or spooled."""
        return self._writer.flush(timeout) if self._writer else True

    def stats(self) -> dict:
        """Counters for monitoring: queued, written, duplicates, spooled, replayed, write_errors."""
        if not self._writer:
            return {}
        return {"queued": self._writer.queued(), **self._writer.stats}

    def close(self, timeout: float = 10.0) -> None:
        if self._writer:
            writer, self._writer = self._writer, None
            writer.close(timeout)
