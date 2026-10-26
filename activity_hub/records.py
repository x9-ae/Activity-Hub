import re
import json
import uuid
from datetime import datetime, timezone
from activity_hub.ids import uuid7

EVENTS_TABLE = "events"
ACCESS_TABLE = "access_logs"
EVENT_COLUMNS = (
    "id", "occurred_at", "app", "environment", "service", "tenant_id",
    "action", "category", "outcome", "reason",
    "actor_type", "actor_id", "actor_name",
    "target_type", "target_id", "target_name", "related",
    "origin", "ip", "country", "user_agent", "request_id", "session_id",
    "changes", "metadata", "imported",
)
ACCESS_COLUMNS = (
    "id", "occurred_at", "app", "environment", "service", "tenant_id",
    "actor_type", "actor_id", "origin",
    "method", "route", "path", "status", "duration_ms", "request_body",
    "ip", "country", "user_agent", "request_id", "session_id",
)
COLUMNS = {EVENTS_TABLE: EVENT_COLUMNS, ACCESS_TABLE: ACCESS_COLUMNS}
# dotted names, e.g. trade.closed or user.password.changed; the first part is the category
ACTION_PATTERN = re.compile(r"^[a-z][a-z0-9_]*(\.[a-z][a-z0-9_]*)+$")
OUTCOMES = ("success", "refused", "failed")
MAX_JSON_BYTES = 64 * 1024
MAX_TEXT_LENGTH = 2048
# keys whose values are never stored, at any depth of a recorded request body
SECRET_KEY = re.compile(r"pass|secret|token|api_?key|access_?key|private_?key|credential|authori[sz]ation|cvv|otp|^pin$",
                        re.IGNORECASE)
MASKED = "[masked]"


def utc_timestamp(value: datetime | None = None) -> str:
    """'YYYY-MM-DD HH:MM:SS.mmm' in UTC; a naive datetime is taken as UTC."""
    value = value or datetime.now(timezone.utc)
    if value.tzinfo is not None:
        value = value.astimezone(timezone.utc)
    return value.strftime("%Y-%m-%d %H:%M:%S.") + f"{value.microsecond // 1000:03d}"


def _text(value) -> str:
    return "" if value is None else str(value)[:MAX_TEXT_LENGTH]


def _json(name: str, value) -> str:
    if value in (None, "", {}, []):
        return ""
    encoded = json.dumps(value, default=str, separators=(",", ":"), sort_keys=True)
    if len(encoded.encode()) > MAX_JSON_BYTES:
        raise ValueError(f"{name} is larger than {MAX_JSON_BYTES} bytes")
    return encoded


def mask_secrets(value):
    """The value with every secret-looking key's value replaced, recursively."""
    if isinstance(value, dict):
        return {key: MASKED if SECRET_KEY.search(str(key)) else mask_secrets(item) for key, item in value.items()}
    if isinstance(value, list):
        return [mask_secrets(item) for item in value]
    return value


def _event_id(value) -> str:
    if value is None:
        return uuid7()
    return str(uuid.UUID(str(value)))


def event_row(source: dict, context: dict, *, action: str, actor_type=None, actor_id=None, actor_name=None,
              target_type="", target_id="", target_name="", related=(), tenant_id=None, outcome="success",
              reason="", changes=None, metadata=None, origin=None, ip=None, country=None, user_agent=None,
              request_id=None, session_id=None, occurred_at=None, event_id=None, imported=False) -> dict:
    """One events row. Fields not given come from the current context; source is app/environment/service."""
    if not ACTION_PATTERN.match(action or ""):
        raise ValueError(f"action must be dotted lower-case words, e.g. trade.closed: {action!r}")
    if outcome not in OUTCOMES:
        raise ValueError(f"outcome must be one of {OUTCOMES}: {outcome!r}")

    def pick(name, given):
        return _text(given if given is not None else context.get(name))

    row = {
        "id": _event_id(event_id),
        "occurred_at": utc_timestamp(occurred_at),
        **source,
        "tenant_id": pick("tenant_id", tenant_id),
        "action": action,
        "category": action.split(".", 1)[0],
        "outcome": outcome,
        "reason": _text(reason),
        "actor_type": pick("actor_type", actor_type),
        "actor_id": pick("actor_id", actor_id),
        "actor_name": pick("actor_name", actor_name),
        "target_type": _text(target_type),
        "target_id": _text(target_id),
        "target_name": _text(target_name),
        "related": [[_text(kind), _text(key)] for kind, key in related],
        "origin": pick("origin", origin),
        "ip": pick("ip", ip),
        "country": pick("country", country),
        "user_agent": pick("user_agent", user_agent),
        "request_id": pick("request_id", request_id),
        "session_id": pick("session_id", session_id),
        "changes": _json("changes", changes),
        "metadata": _json("metadata", metadata),
        "imported": 1 if imported else 0,
    }
    if not row["actor_type"]:
        raise ValueError("actor_type is required: pass it or call set_actor() for the request")
    return row


def _request_body(value) -> str:
    """The masked body as stored; a note instead when masking left it over the size limit."""
    try:
        return _json("request_body", mask_secrets(value))
    except ValueError:
        return _json("request_body", {"not_kept": f"body is over {MAX_JSON_BYTES} bytes after masking"})


def access_row(source: dict, context: dict, *, method: str, route: str, path: str, status: int,
               duration_ms: int, request_body=None, occurred_at=None) -> dict:
    """One access_logs row; who and from where come from the context. request_body: what a change
    sent, stored with its secrets masked."""
    return {
        "id": uuid7(),
        "occurred_at": utc_timestamp(occurred_at),
        **source,
        "tenant_id": _text(context.get("tenant_id")),
        "actor_type": _text(context.get("actor_type")),
        "actor_id": _text(context.get("actor_id")),
        "origin": _text(context.get("origin")),
        "method": _text(method),
        "route": _text(route),
        "path": _text(path),
        "status": int(status),
        "duration_ms": max(0, int(duration_ms)),
        "request_body": _request_body(request_body),
        "ip": _text(context.get("ip")),
        "country": _text(context.get("country")),
        "user_agent": _text(context.get("user_agent")),
        "request_id": _text(context.get("request_id")),
        "session_id": _text(context.get("session_id")),
    }


def insert_values(table: str, row: dict) -> list:
    """The row as ClickHouse insert values, in column order."""
    values = []
    for column in COLUMNS[table]:
        value = row[column]
        if column == "occurred_at":
            value = datetime.strptime(value, "%Y-%m-%d %H:%M:%S.%f").replace(tzinfo=timezone.utc)
        elif column == "related":
            value = [tuple(pair) for pair in value]
        values.append(value)
    return values
