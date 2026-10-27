import hashlib
from datetime import datetime, timedelta, timezone
from activity_hub.database import get_client
from activity_hub.records import COLUMNS

SEALS_TABLE = "seals"
SEAL_COLUMNS = ("table_name", "window_start", "row_count", "rows_hash", "prev_hash", "hash", "columns")
SEALED_TABLES = tuple(COLUMNS)
MINUTE = timedelta(minutes=1)
EMPTY_ROWS_HASH = hashlib.sha256(b"").hexdigest()
# rows still being inserted when a minute ends are given this long to land before it is sealed
DEFAULT_LAG_SECONDS = 120


def _columns(table: str) -> str:
    return ",".join((*COLUMNS[table], "received_at"))


def _minute(value: datetime) -> datetime:
    value = value.astimezone(timezone.utc) if value.tzinfo else value.replace(tzinfo=timezone.utc)
    return value.replace(second=0, microsecond=0)


def _text(window: datetime) -> str:
    return f"{window:%Y-%m-%d %H:%M:%S}"


def _chain(prev_hash: str, table: str, window: datetime, row_count: int, rows_hash: str, columns: str) -> str:
    text = f"{prev_hash}|{table}|{_text(window)}|{row_count}|{rows_hash}|{columns}"
    return hashlib.sha256(text.encode()).hexdigest()


def _window_hashes(client, table: str, columns: str, start: datetime, end: datetime) -> dict:
    """{window_start: (row_count, rows_hash)} for every minute holding rows, in one query.
    rows_hash is the SHA-256 of the rows' own SHA-256 hashes, in id order."""
    result = client.query(
        f"SELECT toStartOfMinute(received_at) AS window_start, count(), "
        f"lower(hex(SHA256(arrayStringConcat(arrayMap(x -> x.2, arraySort(x -> x.1, groupArray("
        f"(toString(id), lower(hex(SHA256(formatRow('TabSeparated', {columns})))))))), '')))) "
        f"FROM {table} WHERE received_at >= {{start:DateTime64(3, 'UTC')}} "
        f"AND received_at < {{end:DateTime64(3, 'UTC')}} GROUP BY window_start",
        parameters={"start": start, "end": end},
    )
    return {_minute(row[0]): (row[1], row[2]) for row in result.result_rows}


def seal_new_rows(settings: dict, *, lag_seconds: int = DEFAULT_LAG_SECONDS, until: datetime | None = None) -> int:
    """Seals every complete minute not sealed yet, in each table; returns the number of seals written.
    Run it from one process only, e.g. every minute from a scheduler."""
    client = get_client(settings, database=settings["database"])
    try:
        # the server's clock, which stamps received_at; the app host's may drift
        now = until or client.query("SELECT now64(3, 'UTC')").result_rows[0][0].replace(tzinfo=timezone.utc)
        end = _minute(now - timedelta(seconds=0 if until else lag_seconds))
        return sum(_seal_table(client, table, end) for table in SEALED_TABLES)
    finally:
        client.close()


def _seal_table(client, table: str, end: datetime) -> int:
    last = client.query(
        "SELECT count(), max(window_start), argMax(hash, window_start) FROM seals WHERE table_name = {table:String}",
        parameters={"table": table},
    ).result_rows[0]
    if last[0]:
        window, prev_hash = _minute(last[1]) + MINUTE, last[2]
    else:
        rows, first = client.query(f"SELECT count(), min(received_at) FROM {table}").result_rows[0]
        if not rows:
            return 0
        window, prev_hash = _minute(first), ""
    if window >= end:
        return 0

    columns = _columns(table)
    windows = _window_hashes(client, table, columns, window, end)
    seals = []
    while window < end:
        row_count, rows_hash = windows.get(window, (0, EMPTY_ROWS_HASH))
        digest = _chain(prev_hash, table, window, row_count, rows_hash, columns)
        seals.append([table, window, row_count, rows_hash, prev_hash, digest, columns])
        prev_hash, window = digest, window + MINUTE
    client.insert(SEALS_TABLE, seals, column_names=list(SEAL_COLUMNS))
    return len(seals)


def verify(settings: dict, *, table: str | None = None, window_from: datetime | None = None,
           window_to: datetime | None = None) -> dict:
    """Recomputes the sealed minutes from the rows and checks the chain between them.
    Returns {"ok", "checked", "problems": [{table, window_start, problem}]}."""
    client = get_client(settings, database=settings["database"])
    problems, checked = [], 0
    try:
        for name in (table,) if table else SEALED_TABLES:
            seals = _seals(client, name, window_from, window_to)
            checked += len(seals)
            problems += _check_table(client, name, seals)
    finally:
        client.close()
    return {"ok": not problems, "checked": checked, "problems": problems}


def _seals(client, table: str, window_from, window_to) -> list:
    clauses, parameters = ["table_name = {table:String}"], {"table": table}
    if window_from:
        clauses.append("window_start >= {window_from:DateTime('UTC')}")
        parameters["window_from"] = _minute(window_from)
    if window_to:
        clauses.append("window_start < {window_to:DateTime('UTC')}")
        parameters["window_to"] = _minute(window_to)
    result = client.query(
        f"SELECT {', '.join(SEAL_COLUMNS)} FROM seals WHERE {' AND '.join(clauses)} ORDER BY window_start",
        parameters=parameters,
    )
    return [{**dict(zip(SEAL_COLUMNS, row)), "window_start": _minute(row[1])} for row in result.result_rows]


def _check_table(client, table: str, seals: list) -> list:
    if not seals:
        return []
    start, end = seals[0]["window_start"], seals[-1]["window_start"] + MINUTE
    actual = {columns: _window_hashes(client, table, columns, start, end) for columns in {s["columns"] for s in seals}}

    problems, previous = [], None
    for seal in seals:
        window = seal["window_start"]

        def problem(text):
            problems.append({"table": table, "window_start": _text(window), "problem": text})

        found = actual[seal["columns"]].get(window, (0, EMPTY_ROWS_HASH))
        if found != (seal["row_count"], seal["rows_hash"]):
            problem(f"rows changed: sealed {seal['row_count']} row(s), now {found[0]}")
        if _chain(seal["prev_hash"], table, window, seal["row_count"], seal["rows_hash"], seal["columns"]) != seal["hash"]:
            problem("seal altered")
        if previous:
            if window == previous["window_start"]:
                # two sealers overlapping (a rolling deploy) write the same seal twice: harmless
                if seal["hash"] != previous["hash"]:
                    problem("minute sealed twice")
                continue
            elif window != previous["window_start"] + MINUTE:
                problem(f"seals missing from {_text(previous['window_start'] + MINUTE)}")
            elif seal["prev_hash"] != previous["hash"]:
                problem("chain broken")
        previous = seal

    sealed = {seal["window_start"] for seal in seals}
    for windows in actual.values():
        for window in sorted(set(windows) - sealed):
            problems.append({"table": table, "window_start": _text(window), "problem": "rows in a minute with no seal"})
    return problems


def daily_seal(settings: dict, day) -> dict:
    """The last seal of each table up to the end of day (a date), to keep outside the database,
    e.g. in object storage. Rewriting rows and seals together afterwards no longer matches it."""
    end = datetime(day.year, day.month, day.day, tzinfo=timezone.utc) + timedelta(days=1)
    client = get_client(settings, database=settings["database"])
    try:
        result = client.query(
            "SELECT table_name, max(window_start), argMax(hash, window_start) FROM seals "
            "WHERE window_start < {end:DateTime('UTC')} GROUP BY table_name ORDER BY table_name",
            parameters={"end": end},
        )
    finally:
        client.close()
    return {
        "day": day.isoformat(),
        "seals": [{"table": row[0], "window_start": _text(_minute(row[1])), "hash": row[2]} for row in result.result_rows],
    }


def check_daily_seal(settings: dict, record: dict) -> list:
    """Compares a kept daily_seal record with the seals in the database; returns the mismatches."""
    if not record["seals"]:
        return []
    keys = [(seal["table"], datetime.strptime(seal["window_start"], "%Y-%m-%d %H:%M:%S").replace(tzinfo=timezone.utc))
            for seal in record["seals"]]
    client = get_client(settings, database=settings["database"])
    try:
        result = client.query(
            "SELECT table_name, window_start, hash FROM seals "
            "WHERE (table_name, window_start) IN {keys:Array(Tuple(String, DateTime('UTC')))}",
            parameters={"keys": keys},
        )
    finally:
        client.close()
    stored = {(row[0], _text(_minute(row[1]))): row[2] for row in result.result_rows}
    mismatches = []
    for seal in record["seals"]:
        key = (seal["table"], seal["window_start"])
        if stored.get(key) != seal["hash"]:
            mismatches.append({**seal, "problem": "seal missing" if key not in stored else "seal differs"})
    return mismatches
