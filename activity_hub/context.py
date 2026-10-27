from contextlib import contextmanager
from contextvars import ContextVar
from urllib.parse import quote

CONTEXT_FIELDS = (
    "actor_type", "actor_id", "actor_name", "tenant_id", "session_id",
    "origin", "ip", "country", "user_agent", "request_id",
)
# headers that carry the context to another service of the same application; values are
# percent-encoded (forward_value), since a header holds ASCII only and a name or a user agent need not
FORWARD_HEADERS = {
    "request_id": "x-request-id",
    "actor_type": "x-actor-type",
    "actor_id": "x-actor-id",
    "actor_name": "x-actor-name",
    "tenant_id": "x-tenant-id",
    "session_id": "x-session-id",
    "origin": "x-client-origin",
    "ip": "x-client-ip",
    "country": "x-client-country",
    "user_agent": "x-client-user-agent",
}

_current: ContextVar = ContextVar("activity_hub_context", default=None)


def current_context() -> dict:
    """What is known about the request or job being handled: who, from where, which request."""
    return _current.get() or {}


def set_actor(actor_type: str, actor_id: str, actor_name: str = "", tenant_id: str = "",
              session_id: str = "") -> None:
    """Called by the application once it knows who is acting, e.g. in its auth dependency.
    Fills the context the middleware opened; everything recorded afterwards carries the actor."""
    context = _current.get()
    if context is None:
        return
    context.update(actor_type=actor_type, actor_id=str(actor_id), actor_name=actor_name or "",
                   tenant_id=str(tenant_id or ""), session_id=session_id or "")


@contextmanager
def activity_context(**fields):
    """Opens a context outside a web request, e.g. for a background job:
    with activity_context(actor_type="system", actor_id="liquidation", origin="system"): ..."""
    unknown = set(fields) - set(CONTEXT_FIELDS)
    if unknown:
        raise ValueError(f"unknown context fields: {sorted(unknown)}")
    token = _current.set({**current_context(), **{key: str(value) for key, value in fields.items()}})
    try:
        yield
    finally:
        _current.reset(token)


def forward_value(value) -> str:
    """A context value as a header can carry it: printable ASCII as it is, anything else (accented
    or Arabic names, control characters, '%') percent-encoded. The middleware decodes it."""
    return quote(str(value), safe=" !\"#$&'()*+,-./:;<=>?@[]^_`{|}~")


def forwarded_headers() -> dict:
    """Headers to add to a call into another service, so it records the same actor and request."""
    context = current_context()
    return {header: forward_value(context[field]) for field, header in FORWARD_HEADERS.items() if context.get(field)}
