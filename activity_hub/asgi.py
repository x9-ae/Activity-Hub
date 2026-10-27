import json
import time
from urllib.parse import unquote
from activity_hub.context import _current, FORWARD_HEADERS
from activity_hub.ids import uuid7
from activity_hub.logger import logger

DEFAULT_SKIP_PATHS = ("/healthz", "/health", "/metrics", "/docs", "/redoc", "/openapi.json", "/favicon.ico")
# Cloudflare sets this and overwrites any value the caller sent. X-Forwarded-For is not trusted by
# default: its left-most entry is whatever the caller wrote. Behind another proxy, name its header.
DEFAULT_IP_HEADERS = ("cf-connecting-ip",)
# requests that change something: what they sent is kept, so every change is on record
WRITE_METHODS = ("POST", "PUT", "PATCH", "DELETE")
# well under the 64 KB a stored JSON field may take, whatever masking does to the length
MAX_REQUEST_BODY_BYTES = 32 * 1024


def route_template(scope) -> str:
    """/positions/{ticket} rather than /positions/11450, so requests group by endpoint. FastAPI
    puts the matched route in the scope; for other routers the path parameters are put back."""
    route = getattr(scope.get("route"), "path", "")
    if route:
        return route
    by_value = {str(value): name for name, value in (scope.get("path_params") or {}).items()}
    return "/".join(f"{{{by_value[part]}}}" if part in by_value else part for part in scope["path"].split("/"))


def _sent(body: dict):
    """The JSON a request sent, or a note on why it is not kept."""
    if body["size"] > MAX_REQUEST_BODY_BYTES:
        return {"not_kept": f"body of {body['size']} bytes is over {MAX_REQUEST_BODY_BYTES}"}
    if not body["size"]:
        return None
    try:
        return json.loads(b"".join(body["chunks"]))
    except ValueError:
        return {"not_kept": "body is not valid JSON"}


class ActivityMiddleware:
    """ASGI middleware (FastAPI, Starlette, any ASGI app). For every HTTP request it opens the
    activity context (IP, country, user agent, origin, request id), echoes X-Request-Id on the
    response and records one access-log row once the response is sent. For a request that changes
    something (POST, PUT, PATCH, DELETE) with a JSON body, the row also keeps what was sent, with
    passwords, tokens and keys masked, so every change is recorded without code per feature.

    The application names the actor with set_actor() once it has authenticated the request.

    skip_request(headers) -> bool: requests left out of the access log (they still get the context,
    so events recorded while handling them carry the actor), e.g. calls between the application's own
    services, which the calling service already logs at its edge.
    trust_forwarded(headers) -> bool: requests whose X-Actor-* / X-Client-* headers are believed,
    e.g. calls carrying the application's internal service key; never true for public traffic.
    """

    def __init__(self, app, hub, *, skip_paths=DEFAULT_SKIP_PATHS, ip_headers=DEFAULT_IP_HEADERS,
                 country_header="cf-ipcountry", origin_header="x-client-origin",
                 skip_request=None, trust_forwarded=None):
        self.app = app
        self.hub = hub
        self.skip_paths = set(skip_paths)
        self.ip_headers = ip_headers
        self.country_header = country_header
        self.origin_header = origin_header
        self.skip_request = skip_request
        self.trust_forwarded = trust_forwarded

    async def __call__(self, scope, receive, send):
        if scope["type"] != "http" or scope["method"] == "OPTIONS" or scope["path"] in self.skip_paths:
            return await self.app(scope, receive, send)
        headers = {key.decode("latin-1").lower(): value.decode("latin-1") for key, value in scope["headers"]}
        log_access = not (self.skip_request and self.skip_request(headers))
        context = self._context(scope, headers)
        token = _current.set(context)
        request_id = context["request_id"].encode("latin-1")
        status = {"code": 500}
        started = time.perf_counter()
        keep_body = (log_access and scope["method"] in WRITE_METHODS
                     and "json" in headers.get("content-type", ""))
        body = {"chunks": [], "size": 0}

        async def receive_and_keep():
            message = await receive()
            if keep_body and message["type"] == "http.request":
                chunk = message.get("body", b"")
                body["size"] += len(chunk)
                if body["size"] <= MAX_REQUEST_BODY_BYTES:
                    body["chunks"].append(chunk)
            return message

        async def send_with_request_id(message):
            if message["type"] == "http.response.start":
                status["code"] = message["status"]
                message.setdefault("headers", [])
                message["headers"] = [*message["headers"], (b"x-request-id", request_id)]
            await send(message)

        try:
            await self.app(scope, receive_and_keep if keep_body else receive, send_with_request_id)
        finally:
            try:
                if log_access:
                    self.hub.record_access(
                        method=scope["method"],
                        route=route_template(scope),
                        path=scope["path"],
                        status=status["code"],
                        duration_ms=round((time.perf_counter() - started) * 1000),
                        request_body=_sent(body) if keep_body else None,
                    )
            except Exception:
                logger.exception("activity hub: access row not recorded")
            _current.reset(token)

    def _context(self, scope, headers: dict) -> dict:
        client = scope.get("client")
        ip = next((headers[name].split(",")[0].strip() for name in self.ip_headers if headers.get(name)),
                  client[0] if client else "")
        context = {
            "ip": ip,
            "country": headers.get(self.country_header, ""),
            "user_agent": headers.get("user-agent", ""),
            "origin": headers.get(self.origin_header, ""),
            "request_id": headers.get("x-request-id", "")[:128] or uuid7(),
        }
        if self.trust_forwarded and self.trust_forwarded(headers):
            context.update({field: unquote(headers[header]) for field, header in FORWARD_HEADERS.items() if headers.get(header)})
        return context
