"""Streams: the log delivered, as it grows, to a destination its owner runs, as WorkOS's log streams
do. Two kinds of destination:

- webhook: an HTTPS endpoint gets batches of JSON lines (POST, application/x-ndjson), signed:
  X-Activity-Signature: t=<unix seconds>,v1=<hex HMAC-SHA256 of "<t>.<body>" with the stream's secret>.
  A Datadog, Splunk HEC or Sentinel intake takes these too, with its key in the stream's headers.
- s3: an S3-compatible bucket (R2, S3, MinIO) gets one gzip JSON-lines file per batch, at
  <prefix>/<events|requests>/YYYY/MM/DD/HHMMSS-<first id>.jsonl.gz. It works with object-lock buckets.

A stream sends events, API requests or both, narrowed by a search (activity_hub.query) and always
held to its tenant. Delivery follows arrival (received_at, id) and waits the same lag as sealing, so a
record still being written is never passed over; the cursor moves only once a batch is accepted, so
nothing is lost. Delivery is at least once: a batch accepted just before a failure is sent again, so a
receiver drops a line whose id it already has. A failing destination is retried later, waiting longer
each time. The signing secret, the bucket's keys and the webhook's header values are kept encrypted.

    store = StreamStore(settings, key=application_secret)       # the key encrypts the secrets
    deliver_streams(settings, key=application_secret, catalog=CATALOG)   # every minute, one process

Install with `pip install "activity-hub[streams] @ …"` (boto3 and cryptography).
"""
import gzip
import hmac
import json
import time
import uuid
import base64
import socket
import hashlib
import ipaddress
import http.client
import urllib.error
import urllib.request
from datetime import datetime, timedelta, timezone
from urllib.parse import urlparse
from activity_hub.database import get_client
from activity_hub.logger import logger
from activity_hub.catalog import Catalog
from activity_hub.records import EVENTS_TABLE, ACCESS_TABLE, EVENT_COLUMNS, ACCESS_COLUMNS, utc_timestamp, related_pairs
from activity_hub import query as search_language
from activity_hub.integrity import DEFAULT_LAG_SECONDS
from activity_hub.reader import _moment

KINDS = {"events": (EVENTS_TABLE,), "requests": (ACCESS_TABLE,), "both": (EVENTS_TABLE, ACCESS_TABLE)}
DESTINATIONS = ("webhook", "s3")
TABLE_KIND = {EVENTS_TABLE: "events", ACCESS_TABLE: "requests"}
STREAM_COLUMNS = ("id", "tenant_id", "name", "kind", "query", "destination", "target", "secret", "enabled", "removed",
                  "created_by", "updated_at")
PROGRESS_COLUMNS = ("stream_id", "table_name", "cursor_at", "cursor_id", "delivered", "last_ok_at", "last_error",
                    "failures", "next_try_at", "updated_at")
EPOCH = datetime(1970, 1, 1, tzinfo=timezone.utc)
NIL = uuid.UUID(int=0)
# records per send, and sends per stream and table in one run of deliver_streams
BATCH_SIZE = 1000
BATCHES_PER_RUN = 20
SEND_TIMEOUT_SECONDS = 10
# a failing destination waits 2, 4, 8 … minutes, never more than an hour, before it is tried again
MAX_BACKOFF_MINUTES = 60
MAX_STREAMS = 20
MAX_HEADERS = 10
# a run stops starting new sends after this long, so the next minute's run does not overlap it
RUN_SECONDS = 45


class _NoRedirect(urllib.request.HTTPRedirectHandler):
    """A redirect could lead a stream to an internal address: it is an error, never followed."""

    def redirect_request(self, request, fp, code, message, headers, new_url):
        raise urllib.error.HTTPError(request.full_url, code, f"redirects to {new_url}, which a stream does not follow",
                                     headers, fp)


def _public_address(host: str, port: int | None) -> str:
    """An address host resolves to, refused unless every one is on the public internet."""
    try:
        addresses = {info[4][0] for info in socket.getaddrinfo(host, port or 443, type=socket.SOCK_STREAM)}
    except socket.gaierror:
        raise ValueError(f"{host} does not resolve")
    for address in addresses:
        if not ipaddress.ip_address(address.split("%")[0]).is_global:
            raise ValueError(f"{host} is an internal address; a stream goes to the internet only")
    return sorted(addresses)[0]


class _CheckedConnection(http.client.HTTPSConnection):
    """Connects to the address that was checked: a name resolved again at connect time could point
    somewhere else by then. The certificate is still checked against the name."""

    def connect(self):
        sock = socket.create_connection((_public_address(self.host, self.port), self.port or 443), self.timeout)
        self.sock = self._context.wrap_socket(sock, server_hostname=self.host)


class _CheckedHTTPS(urllib.request.HTTPSHandler):
    def https_open(self, request):
        return self.do_open(_CheckedConnection, request)


# no proxies from the environment: the connection goes to the checked address itself
_OPENER = urllib.request.build_opener(urllib.request.ProxyHandler({}), _NoRedirect, _CheckedHTTPS)
_LOCAL_OPENER = urllib.request.build_opener(_NoRedirect)


def _fernet(key: str):
    from cryptography.fernet import Fernet
    return Fernet(base64.urlsafe_b64encode(hashlib.sha256(f"activity-hub-streams|{key}".encode()).digest()))


def check_destination(url: str, *, allow_private: bool = False) -> None:
    """Refuses what a stream must never be pointed at: anything but HTTPS, and a host that is, or
    resolves to, a private, loopback, link-local or reserved address (the platform's own services).
    allow_private: for a test or a local setup only; it also lets http through."""
    parsed = urlparse(url or "")
    if parsed.scheme not in (("https", "http") if allow_private else ("https",)) or not parsed.hostname:
        raise ValueError("the destination must be an https:// address")
    if not allow_private:
        _public_address(parsed.hostname, parsed.port)


def _check_target(destination: str, target: dict, headers: dict, allow_private: bool) -> dict:
    if destination == "webhook":
        check_destination(str(target.get("url", "")), allow_private=allow_private)
        if not isinstance(headers, dict) or len(headers) > MAX_HEADERS or not all(
                isinstance(k, str) and isinstance(v, str) and k.strip() and "\n" not in k + v and "\r" not in k + v
                for k, v in headers.items()):
            raise ValueError(f"headers are up to {MAX_HEADERS} name: value pairs")
        # the values are secrets, kept with the signing secret: the target names them only
        return {"url": target["url"], "headers": {name.strip(): "" for name in headers}}
    if destination == "s3":
        if not target.get("bucket"):
            raise ValueError("an S3 destination needs a bucket")
        if target.get("endpoint"):
            check_destination(str(target["endpoint"]), allow_private=allow_private)
        return {key: str(target.get(key) or "") for key in ("endpoint", "bucket", "prefix", "region")}
    raise ValueError(f"destination must be one of {', '.join(DESTINATIONS)}")


class StreamStore:
    """The streams of each tenant: kept in the Hub's database, their secrets encrypted with key."""

    def __init__(self, settings: dict, key: str, *, allow_private: bool = False):
        if not key:
            raise ValueError("streams need the application's key to keep their secrets")
        self._settings = settings
        self._key = key
        self.allow_private = allow_private

    def _client(self):
        return get_client(self._settings, database=self._settings["database"])

    def _rows(self, client, tenant_id: str | None = None, stream_id: str | None = None) -> list:
        clauses, parameters = ["removed = 0"], {}
        if tenant_id is not None:
            clauses.append("tenant_id = {tenant:String}")
            parameters["tenant"] = tenant_id
        if stream_id is not None:
            clauses.append("id = {id:UUID}")
            parameters["id"] = stream_id
        result = client.query(f"SELECT {', '.join(STREAM_COLUMNS)} FROM streams FINAL WHERE {' AND '.join(clauses)} "
                              "ORDER BY lower(name)", parameters=parameters)
        return [dict(zip(STREAM_COLUMNS, row)) for row in result.result_rows]

    def list(self, tenant_id: str) -> list:
        """The tenant's streams with how each stands, secrets left out."""
        client = self._client()
        try:
            streams = self._rows(client, tenant_id)
            progress = _progress(client, [s["id"] for s in streams])
        finally:
            client.close()
        return [_public(stream, progress) for stream in streams]

    def save(self, tenant_id: str, *, name: str, kind: str, destination: str, target: dict, secret=None,
             headers: dict | None = None, query: str = "", enabled: bool = True, start: str = "now",
             stream_id: str | None = None, created_by: str = "") -> dict:
        """A new stream, or a new version of one of the tenant's own. secret: the webhook's signing
        secret (text) or the bucket's {"access_key", "secret_key"}; headers: the webhook's own
        {name: value}. Left blank on an update, the stored secret and header values are kept, as long as
        the stream still goes to the same address. start "now" sends records from now on, "beginning"
        everything already kept too (a new stream, or a table a changed kind adds, starts from now)."""
        name = (name or "").strip()
        if not name or len(name) > 80:
            raise ValueError("a stream needs a name of up to 80 characters")
        if kind not in KINDS:
            raise ValueError(f"kind must be one of {', '.join(KINDS)}")
        for table in KINDS[kind]:
            search_language.parse(query or "", TABLE_KIND[table])   # a bad search is refused now, not at delivery
        headers = {k.strip(): v for k, v in (headers or {}).items()} if destination == "webhook" else {}
        target = _check_target(destination, target or {}, headers, self.allow_private)
        client = self._client()
        try:
            now = _db_now(client)
            existing = None
            if stream_id:
                stream_id = str(uuid.UUID(str(stream_id)))
                found = self._rows(client, tenant_id, stream_id)
                if not found:
                    raise ValueError("no such stream")
                existing = found[0]
            elif len(self._rows(client, tenant_id)) >= MAX_STREAMS:
                raise ValueError(f"a tenant keeps up to {MAX_STREAMS} streams")
            # what is stored goes only where it went before: a changed address needs it all again
            same_place = existing is not None and existing["destination"] == destination and _place(
                destination, json.loads(existing["target"] or "{}")) == _place(destination, target)
            kept = self._secrets(existing) if same_place and (secret in (None, "", {}) or not all(headers.values())) else {}
            if secret in (None, "", {}):
                if not same_place:
                    raise ValueError("this stream needs its secret: the signing secret, or the bucket's keys"
                                     if existing is None else "a stream sent somewhere else needs its secret again")
                secret = kept["secret"]
            elif destination == "s3" and not (isinstance(secret, dict) and secret.get("access_key") and secret.get("secret_key")):
                raise ValueError("an S3 destination's secret is {access_key, secret_key}")
            elif destination == "webhook" and (not isinstance(secret, str) or len(secret) < 16):
                raise ValueError("a signing secret has at least 16 characters")
            for header, value in headers.items():
                if not value:
                    headers[header] = (kept.get("headers") or {}).get(header, "")
                    if not headers[header]:
                        raise ValueError(f"the {header} header needs its value")
            sealed = _fernet(self._key).encrypt(json.dumps({"secret": secret, "headers": headers}).encode()).decode()
            row = {"id": uuid.UUID(stream_id) if stream_id else uuid.uuid4(), "tenant_id": tenant_id, "name": name, "kind": kind,
                   "query": (query or "").strip(), "destination": destination, "target": json.dumps(target),
                   "secret": sealed, "enabled": int(bool(enabled)), "removed": 0,
                   "created_by": existing["created_by"] if existing else created_by, "updated_at": now}
            client.insert("streams", [[row[c] for c in STREAM_COLUMNS]], column_names=list(STREAM_COLUMNS))
            if existing is None:
                since = EPOCH if start == "beginning" else now
                _write_progress(client, [_fresh(row["id"], table, since, now) for table in KINDS[kind]])
            else:
                # a table the stream did not send before starts from now, never from an old cursor
                added = [table for table in KINDS[kind] if table not in KINDS[existing["kind"]]]
                if added:
                    _write_progress(client, [_fresh(row["id"], table, now, now) for table in added])
            progress = _progress(client, [row["id"]])
        finally:
            client.close()
        return _public(row, progress)

    def remove(self, tenant_id: str, stream_id: str) -> bool:
        stream_id = str(uuid.UUID(str(stream_id)))
        client = self._client()
        try:
            found = self._rows(client, tenant_id, stream_id)
            if not found:
                return False
            row = {**found[0], "removed": 1, "updated_at": _db_now(client)}
            client.insert("streams", [[_utc(row[c]) for c in STREAM_COLUMNS]], column_names=list(STREAM_COLUMNS))
        finally:
            client.close()
        return True

    def test(self, tenant_id: str, stream_id: str) -> dict:
        """Sends one test line to the stream's destination: {"ok", "error"}."""
        client = self._client()
        try:
            found = self._rows(client, tenant_id, str(uuid.UUID(str(stream_id))))
        finally:
            client.close()
        if not found:
            raise ValueError("no such stream")
        stream = found[0]
        line = {"test": True, "stream": stream["name"], "sent_at": utc_timestamp()}
        try:
            _send(stream, self._secrets(stream), "events", [line], self.allow_private)
            return {"ok": True, "error": ""}
        except Exception as e:
            return {"ok": False, "error": _error_text(e)}

    def _secrets(self, stream: dict) -> dict:
        """{"secret", "headers"} of a stream, decrypted."""
        from cryptography.fernet import InvalidToken
        try:
            return json.loads(_fernet(self._key).decrypt(stream["secret"].encode()))
        except InvalidToken:
            raise ValueError("the stream's secret no longer opens with the application's key: save it with its secret again")


def _fresh(stream_id, table: str, since: datetime, at: datetime) -> dict:
    return {"stream_id": stream_id, "table_name": table, "cursor_at": since, "cursor_id": NIL, "delivered": 0,
            "last_ok_at": EPOCH, "last_error": "", "failures": 0, "next_try_at": EPOCH, "updated_at": at}


def _db_now(client) -> datetime:
    """The database's clock: the newest row version wins, so every writer stamps with the same clock."""
    return client.query("SELECT now64(3, 'UTC')").result_rows[0][0].replace(tzinfo=timezone.utc)


def _place(destination: str, target: dict) -> tuple:
    """Where a stream's secrets go: the webhook's scheme, host and port, or the bucket's endpoint and name."""
    if destination == "webhook":
        url = urlparse(target.get("url") or "")
        return url.scheme, url.hostname, url.port
    return target.get("endpoint") or "", target.get("bucket") or ""


def _utc(value):
    """A time as UTC: the database answers without a zone, and an insert reads a bare time as the
    host's local time."""
    return value.replace(tzinfo=timezone.utc) if isinstance(value, datetime) and value.tzinfo is None else value


def _write_progress(client, rows: list) -> None:
    client.insert("stream_progress", [[_utc(row[c]) for c in PROGRESS_COLUMNS] for row in rows],
                  column_names=list(PROGRESS_COLUMNS))


def _progress(client, stream_ids: list) -> dict:
    if not stream_ids:
        return {}
    result = client.query(f"SELECT {', '.join(PROGRESS_COLUMNS)} FROM stream_progress FINAL "
                          "WHERE stream_id IN {ids:Array(UUID)}", parameters={"ids": [str(i) for i in stream_ids]})
    found = {}
    for row in result.result_rows:
        item = dict(zip(PROGRESS_COLUMNS, row))
        found.setdefault(str(item["stream_id"]), []).append(item)
    return found


def _stamp(value) -> str | None:
    if not value or value.replace(tzinfo=timezone.utc) <= EPOCH:
        return None
    return utc_timestamp(value)


def _public(stream: dict, progress: dict) -> dict:
    """A stream as its owner sees it: never its secret, and how its delivery stands."""
    mine = progress.get(str(stream["id"]), [])
    failures = max((p["failures"] for p in mine), default=0)
    errors = [p["last_error"] for p in mine if p["last_error"] and p["failures"]]
    state = "paused" if not stream["enabled"] else "failing" if failures else "active"
    target = json.loads(stream["target"] or "{}")
    if "headers" in target:
        target["headers"] = {name: "" for name in target["headers"]}
    return {
        "id": str(stream["id"]), "name": stream["name"], "kind": stream["kind"], "query": stream["query"],
        "destination": stream["destination"], "target": target, "has_secret": bool(stream["secret"]),
        "enabled": bool(stream["enabled"]), "state": state, "error": errors[0] if errors else "",
        "delivered": sum(p["delivered"] for p in mine),
        "last_delivered_at": max(filter(None, (_stamp(p["last_ok_at"]) for p in mine)), default=None),
        "delivered_through": min(filter(None, (_stamp(p["cursor_at"]) for p in mine)), default=None),
        "updated_at": _stamp(stream["updated_at"]),
    }


def _error_text(error: Exception) -> str:
    if isinstance(error, urllib.error.HTTPError):
        return f"the destination answered {error.code} {error.reason}"
    if isinstance(error, ValueError):
        return str(error)[:500]
    if isinstance(error, urllib.error.URLError):
        return f"the destination could not be reached: {error.reason}"
    return f"{type(error).__name__}: {error}"[:500]


def _send(stream: dict, secrets: dict, kind: str, lines: list, allow_private: bool) -> None:
    body = ("\n".join(json.dumps(line, default=str, separators=(",", ":")) for line in lines) + "\n").encode()
    target = json.loads(stream["target"] or "{}")
    secret = secrets["secret"]
    if stream["destination"] == "webhook":
        check_destination(target["url"], allow_private=allow_private)
        stamp = str(int(time.time()))
        signature = hmac.new(str(secret).encode(), f"{stamp}.".encode() + body, hashlib.sha256).hexdigest()
        headers = {**(secrets.get("headers") or {}), "Content-Type": "application/x-ndjson",
                   "User-Agent": "activity-hub-stream", "X-Activity-Stream": str(stream["id"]),
                   "X-Activity-Signature": f"t={stamp},v1={signature}"}
        request = urllib.request.Request(target["url"], data=body, method="POST", headers=headers)
        with (_LOCAL_OPENER if allow_private else _OPENER).open(request, timeout=SEND_TIMEOUT_SECONDS) as answer:
            if not 200 <= answer.status < 300:
                raise urllib.error.HTTPError(target["url"], answer.status, answer.reason, answer.headers, None)
        return
    import boto3
    from botocore.config import Config
    if target.get("endpoint"):
        check_destination(target["endpoint"], allow_private=allow_private)
    s3 = boto3.client("s3", endpoint_url=target.get("endpoint") or None, region_name=target.get("region") or None,
                      aws_access_key_id=secret["access_key"], aws_secret_access_key=secret["secret_key"],
                      config=Config(connect_timeout=SEND_TIMEOUT_SECONDS, read_timeout=SEND_TIMEOUT_SECONDS,
                                    retries={"max_attempts": 1}))
    first = lines[0]
    moment = datetime.now(timezone.utc)
    key = "/".join(part for part in (target.get("prefix", "").strip("/"), kind, f"{moment:%Y/%m/%d}",
                                     f"{moment:%H%M%S}-{first.get('id', 'test')}.jsonl.gz") if part)
    payload = gzip.compress(body)
    s3.put_object(Bucket=target["bucket"], Key=key, Body=payload, ContentType="application/x-ndjson",
                  ContentEncoding="gzip", ContentMD5=base64.b64encode(hashlib.md5(payload).digest()).decode())


def _batch(client, catalog: Catalog, stream: dict, table: str, cursor: dict, settled: datetime) -> list:
    """The next records after the cursor that have settled, oldest arrival first, as delivered."""
    columns = EVENT_COLUMNS if table == EVENTS_TABLE else ACCESS_COLUMNS
    parameters = {"cursor_at": _moment(cursor["cursor_at"], "cursor_at"), "cursor_id": str(cursor["cursor_id"]),
                  "settled": _moment(settled, "settled"), "limit": BATCH_SIZE}
    # the plain bound lets the table's index skip what was delivered; the pair orders within a millisecond
    clauses = ["received_at >= {cursor_at:DateTime64(3, 'UTC')}",
               "(received_at, id) > ({cursor_at:DateTime64(3, 'UTC')}, {cursor_id:UUID})",
               "received_at < {settled:DateTime64(3, 'UTC')}"]
    if stream["tenant_id"]:
        clauses.append("tenant_id = {stream_tenant:String}")
        parameters["stream_tenant"] = stream["tenant_id"]
    if stream["query"]:
        clauses += search_language.to_sql(stream["query"], TABLE_KIND[table], parameters)
    result = client.query(f"SELECT received_at, {', '.join(columns)} FROM {table} WHERE {' AND '.join(clauses)} "
                          f"ORDER BY received_at, id LIMIT {{limit:UInt32}}", parameters=parameters)
    lines = []
    for values in result.result_rows:
        row = dict(zip(("received_at", *columns), values))
        line = {key: (utc_timestamp(value) if isinstance(value, datetime) else str(value) if isinstance(value, uuid.UUID)
                      else value) for key, value in row.items()}
        line["_received_at"] = row["received_at"]
        if "related" in line:
            line["related"] = related_pairs(line["related"])
            for key in ("changes", "metadata"):
                line[key] = json.loads(line[key]) if line[key] else None
            line.update(catalog.present(line))
        elif line.get("request_body"):
            line["request_body"] = json.loads(line["request_body"])
        line["kind"] = TABLE_KIND[table]
        lines.append(line)
    return lines


def deliver_streams(settings: dict, *, key: str, catalog: Catalog | None = None, allow_private: bool = False) -> dict:
    """Sends every enabled stream what has settled since its cursor; returns {"sent": records,
    "failed": streams}. Run it every minute from ONE process: two at once would send batches twice.
    A run starts no new send after RUN_SECONDS, and the streams waiting longest go first, so one slow
    destination does not hold the others back for long. Never raises for one stream's failure."""
    catalog = catalog or Catalog()
    store = StreamStore(settings, key, allow_private=allow_private)
    client = store._client()
    sent, failed = 0, 0
    started = time.monotonic()
    try:
        now = _db_now(client)
        clock = lambda: now + timedelta(seconds=time.monotonic() - started)   # the database's clock, read once
        settled = now - timedelta(seconds=DEFAULT_LAG_SECONDS)
        streams = [s for s in store._rows(client) if s["enabled"]]
        progress = _progress(client, [s["id"] for s in streams])
        waited = lambda s: min((p["updated_at"] for p in progress.get(str(s["id"]), [])), default=EPOCH.replace(tzinfo=None))
        for stream in sorted(streams, key=waited):
            known = {p["table_name"]: p for p in progress.get(str(stream["id"]), [])}
            for table in KINDS[stream["kind"]]:
                if time.monotonic() - started > RUN_SECONDS:
                    return {"sent": sent, "failed": failed}
                cursor = known.get(table)
                if cursor is None:   # saved by an older version: start from now, and keep that start
                    cursor = _fresh(stream["id"], table, now, clock())
                    _write_progress(client, [cursor])
                if cursor["next_try_at"].replace(tzinfo=timezone.utc) > now:
                    continue
                try:
                    secrets = store._secrets(stream)
                    for _ in range(BATCHES_PER_RUN):
                        lines = _batch(client, catalog, stream, table, cursor, settled)
                        if not lines:
                            break
                        last = lines[-1]
                        _send(stream, secrets, TABLE_KIND[table], [{k: v for k, v in l.items() if k != "_received_at"} for l in lines],
                              allow_private)
                        cursor = {**cursor, "cursor_at": last["_received_at"], "cursor_id": uuid.UUID(last["id"]),
                                  "delivered": cursor["delivered"] + len(lines), "last_ok_at": clock(), "last_error": "",
                                  "failures": 0, "next_try_at": EPOCH, "updated_at": clock()}
                        _write_progress(client, [cursor])
                        sent += len(lines)
                        if len(lines) < BATCH_SIZE or time.monotonic() - started > RUN_SECONDS:
                            break
                except Exception as e:
                    failed += 1
                    failures = cursor["failures"] + 1
                    wait = min(2 ** failures, MAX_BACKOFF_MINUTES)
                    cursor = {**cursor, "last_error": _error_text(e), "failures": failures,
                              "next_try_at": now + timedelta(minutes=wait), "updated_at": clock()}
                    logger.warning(f"activity hub: stream {stream['name']} ({stream['id']}) failed, tried again in {wait} min: "
                                   f"{cursor['last_error']}")
                    try:
                        _write_progress(client, [cursor])
                    except Exception as write_error:   # the database itself: the next run tries again
                        logger.error(f"activity hub: stream {stream['id']} progress not saved: {write_error}")
    finally:
        client.close()
    return {"sent": sent, "failed": failed}
