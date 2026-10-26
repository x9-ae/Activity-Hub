import io
import csv
import json
import base64
from datetime import timezone
from activity_hub.database import get_client
from activity_hub.records import EVENTS_TABLE, ACCESS_TABLE, EVENT_COLUMNS, ACCESS_COLUMNS

MAX_PAGE_SIZE = 5000
RELATED_KEYS = "arrayMap(r -> concat(tupleElement(r, 1), ':', tupleElement(r, 2)), related)"
# filter name -> (column, ClickHouse type); each is an exact match
EVENT_FILTERS = {
    "app": ("app", "String"), "environment": ("environment", "String"), "service": ("service", "String"),
    "tenant_id": ("tenant_id", "String"), "category": ("category", "String"), "outcome": ("outcome", "String"),
    "actor_type": ("actor_type", "String"), "actor_id": ("actor_id", "String"),
    "target_type": ("target_type", "String"), "target_id": ("target_id", "String"),
    "origin": ("origin", "String"), "ip": ("ip", "String"), "request_id": ("request_id", "String"),
    "session_id": ("session_id", "String"),
}
ACCESS_FILTERS = {
    "app": ("app", "String"), "environment": ("environment", "String"), "service": ("service", "String"),
    "tenant_id": ("tenant_id", "String"), "actor_type": ("actor_type", "String"), "actor_id": ("actor_id", "String"),
    "origin": ("origin", "String"), "method": ("method", "String"), "route": ("route", "String"),
    "status": ("status", "UInt16"), "ip": ("ip", "String"), "request_id": ("request_id", "String"),
    "session_id": ("session_id", "String"),
}


def _timestamp(value) -> str:
    if value.tzinfo is not None:
        value = value.astimezone(timezone.utc)
    return value.strftime("%Y-%m-%d %H:%M:%S.") + f"{value.microsecond // 1000:03d}"


def _encode_cursor(row: dict) -> str:
    return base64.urlsafe_b64encode(f"{row['occurred_at']}|{row['id']}".encode()).decode()


def _decode_cursor(cursor: str) -> tuple:
    try:
        occurred_at, row_id = base64.urlsafe_b64decode(cursor.encode()).decode().split("|")
        return occurred_at, row_id
    except ValueError:
        raise ValueError("invalid cursor")


class ActivityReader:
    """Searches the Hub. Every method takes exact-match filters plus a time range, returns newest
    first, and pages with an opaque cursor (stable while new rows keep arriving).

    settings: host, port, database, user, password (the Hub's user only needs SELECT).
    Reading the log is itself worth recording: the application calls record_event for it.
    """

    def __init__(self, settings: dict):
        self._client = get_client(settings, database=settings["database"])

    def close(self) -> None:
        self._client.close()

    def search_events(self, *, action: str | None = None, related: tuple | None = None, occurred_from=None,
                      occurred_to=None, limit: int = 50, cursor: str | None = None, **filters) -> dict:
        """Events matching every filter given (see EVENT_FILTERS). action "trade.closed" matches
        exactly; "trade." matches every trade action. related=("account", "100234") finds events
        whose target or related entities include that account."""
        clauses, parameters = self._filters(EVENT_FILTERS, filters, occurred_from, occurred_to)
        if action:
            if action.endswith("."):
                clauses.append("startsWith(action, {action:String})")
            else:
                clauses.append("action = {action:String}")
            parameters["action"] = action
        if related:
            clauses.append(f"((target_type = {{rel_type:String}} AND target_id = {{rel_id:String}}) "
                           f"OR has({RELATED_KEYS}, {{rel_key:String}}))")
            parameters.update(rel_type=related[0], rel_id=str(related[1]), rel_key=f"{related[0]}:{related[1]}")
        return self._page(EVENTS_TABLE, EVENT_COLUMNS, clauses, parameters, limit, cursor)

    def timeline(self, target_type: str, target_id: str, *, limit: int = 50, cursor: str | None = None,
                 **filters) -> dict:
        """Everything that happened to one entity: as the target, or as a related entity
        (an account's timeline includes its trades)."""
        return self.search_events(related=(target_type, target_id), limit=limit, cursor=cursor, **filters)

    def get_event(self, event_id: str) -> dict | None:
        page = self._page(EVENTS_TABLE, EVENT_COLUMNS, ["id = {event_id:UUID}"], {"event_id": event_id}, 1, None)
        return page["items"][0] if page["items"] else None

    def search_access_logs(self, *, occurred_from=None, occurred_to=None, status_from: int | None = None,
                           limit: int = 50, cursor: str | None = None, **filters) -> dict:
        """API requests matching every filter given (see ACCESS_FILTERS); status_from=400 finds errors."""
        clauses, parameters = self._filters(ACCESS_FILTERS, filters, occurred_from, occurred_to)
        if status_from is not None:
            clauses.append("status >= {status_from:UInt16}")
            parameters["status_from"] = status_from
        return self._page(ACCESS_TABLE, ACCESS_COLUMNS, clauses, parameters, limit, cursor)

    def export_events_csv(self, **search):
        """CSV lines (header first) of every event matching the search, for streaming to a download."""
        yield from self._export(self.search_events, EVENT_COLUMNS, search)

    def export_access_logs_csv(self, **search):
        yield from self._export(self.search_access_logs, ACCESS_COLUMNS, search)

    def _export(self, search, columns: tuple, criteria: dict):
        criteria.pop("limit", None)
        criteria.pop("cursor", None)
        buffer = io.StringIO()
        writer = csv.writer(buffer)
        writer.writerow(columns)
        cursor = None
        while True:
            page = search(limit=MAX_PAGE_SIZE, cursor=cursor, **criteria)
            for item in page["items"]:
                writer.writerow([json.dumps(item[c]) if isinstance(item[c], (dict, list)) else item[c] for c in columns])
            yield buffer.getvalue()
            buffer.seek(0)
            buffer.truncate()
            cursor = page["next_cursor"]
            if not cursor:
                return

    @staticmethod
    def _filters(allowed: dict, filters: dict, occurred_from, occurred_to) -> tuple:
        unknown = set(filters) - set(allowed)
        if unknown:
            raise ValueError(f"unknown filters: {sorted(unknown)}")
        clauses, parameters = [], {}
        for name, value in filters.items():
            if value is None or value == "":
                continue
            column, kind = allowed[name]
            clauses.append(f"{column} = {{{name}:{kind}}}")
            parameters[name] = value
        if occurred_from:
            clauses.append("occurred_at >= {occurred_from:DateTime64(3, 'UTC')}")
            parameters["occurred_from"] = occurred_from
        if occurred_to:
            clauses.append("occurred_at < {occurred_to:DateTime64(3, 'UTC')}")
            parameters["occurred_to"] = occurred_to
        return clauses, parameters

    def _page(self, table: str, columns: tuple, clauses: list, parameters: dict, limit: int, cursor) -> dict:
        limit = max(1, min(int(limit), MAX_PAGE_SIZE))
        if cursor:
            occurred_at, row_id = _decode_cursor(cursor)
            clauses = [*clauses, "(occurred_at, id) < ({cursor_at:DateTime64(3, 'UTC')}, {cursor_id:UUID})"]
            parameters = {**parameters, "cursor_at": occurred_at, "cursor_id": row_id}
        where = f"WHERE {' AND '.join(clauses)}" if clauses else ""
        selected = ", ".join(("received_at", *columns))
        result = self._client.query(
            f"SELECT {selected} FROM {table} {where} ORDER BY occurred_at DESC, id DESC LIMIT {{limit:UInt32}}",
            parameters={**parameters, "limit": limit + 1},
        )
        items = [self._item(dict(zip(result.column_names, row))) for row in result.result_rows]
        has_more = len(items) > limit
        items = items[:limit]
        return {"items": items, "next_cursor": _encode_cursor(items[-1]) if has_more else None}

    @staticmethod
    def _item(row: dict) -> dict:
        row["id"] = str(row["id"])
        for key in ("occurred_at", "received_at"):
            row[key] = _timestamp(row[key])
        if row.get("request_body"):
            row["request_body"] = json.loads(row["request_body"])
        if "related" in row:
            row["related"] = [list(pair) for pair in row["related"]]
            for key in ("changes", "metadata"):
                row[key] = json.loads(row[key]) if row[key] else None
            row["imported"] = bool(row["imported"])
        return row
