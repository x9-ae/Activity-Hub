import gzip
import hmac
import json
import hashlib
import threading
from http.server import BaseHTTPRequestHandler, HTTPServer
import pytest
from fastapi import FastAPI, Header
from fastapi.testclient import TestClient
from activity_hub import ActivityHub, ActivityReader, activity_context
from activity_hub import streams as streams_module
from activity_hub.api import activity_router
from activity_hub.streams import StreamStore, check_destination, deliver_streams
from conftest import needs_clickhouse, admin_command

KEY = "the application's own secret"
SIGNING = "a signing secret of some length"


class Receiver:
    """A local endpoint that keeps what it is sent and answers with the status it is told."""

    def __init__(self):
        self.bodies, self.headers, self.status = [], [], 200
        outer = self

        class Handler(BaseHTTPRequestHandler):
            def do_POST(self):
                outer.bodies.append(self.rfile.read(int(self.headers["Content-Length"])))
                outer.headers.append(dict(self.headers))
                self.send_response(outer.status)
                self.end_headers()

            def log_message(self, *args):
                pass
        self.server = HTTPServer(("127.0.0.1", 0), Handler)
        threading.Thread(target=self.server.serve_forever, daemon=True).start()
        self.url = f"http://127.0.0.1:{self.server.server_port}/intake"

    def lines(self):
        return [json.loads(line) for body in self.bodies for line in body.decode().splitlines()]


@pytest.fixture
def receiver():
    r = Receiver()
    yield r
    r.server.shutdown()


@pytest.fixture
def settled_at_once(monkeypatch):
    monkeypatch.setattr(streams_module, "DEFAULT_LAG_SECONDS", 0)


def record(settings, tmp_path, actions):
    hub = ActivityHub(settings, spool_dir=str(tmp_path), app="x9", environment="test", service="s")
    for tenant, action in actions:
        hub.record_event(action, actor_type="account", actor_id="1", tenant_id=tenant, target_type="ticket", target_id="1",
                         metadata={"side": "BUY"})
    hub.flush()
    hub.close()


def test_a_stream_goes_to_the_internet_only():
    for refused in ("http://example.com/x", "https://127.0.0.1/x", "https://10.0.0.5/x", "https://169.254.169.254/latest",
                    "https://[::1]/x", "ftp://example.com", "https://100.100.100.200/latest"):
        with pytest.raises(ValueError):
            check_destination(refused)
    check_destination("https://8.8.8.8/intake")
    check_destination("http://127.0.0.1:9000/x", allow_private=True)


@needs_clickhouse
def test_records_are_delivered_signed_once_each_and_held_to_the_tenant(settings, tmp_path, receiver, settled_at_once):
    store = StreamStore(settings, KEY, allow_private=True)
    stream = store.save("3", name="CRM intake", kind="events", destination="webhook", target={"url": receiver.url},
                        headers={"Authorization": "Bearer partner"}, secret=SIGNING, query="-action:user.*", start="beginning")
    assert "secret" not in stream and stream["has_secret"] and stream["state"] == "active"
    record(settings, tmp_path, [("3", "trade.opened"), ("4", "trade.opened"), ("3", "user.signed_in"), ("3", "trade.closed")])

    assert deliver_streams(settings, key=KEY, allow_private=True)["sent"] == 2
    # one insert shares its arrival time: within it the order is the ids', not the recording's
    assert sorted((l["tenant_id"], l["action"]) for l in receiver.lines()) == [("3", "trade.closed"), ("3", "trade.opened")]
    assert receiver.lines()[0]["summary"] and receiver.lines()[0]["kind"] == "events"
    head, body = receiver.headers[0], receiver.bodies[0]
    stamp, signature = (part.split("=", 1)[1] for part in head["X-Activity-Signature"].split(","))
    assert signature == hmac.new(SIGNING.encode(), f"{stamp}.".encode() + body, hashlib.sha256).hexdigest()
    assert head["Authorization"] == "Bearer partner" and head["Content-Type"] == "application/x-ndjson"

    assert deliver_streams(settings, key=KEY, allow_private=True)["sent"] == 0, "nothing twice"
    record(settings, tmp_path, [("3", "order.placed")])
    deliver_streams(settings, key=KEY, allow_private=True)
    assert sorted(l["action"] for l in receiver.lines()) == ["order.placed", "trade.closed", "trade.opened"]
    assert receiver.lines()[-1]["action"] == "order.placed"
    listed = store.list("3")[0]
    assert listed["delivered"] == 3 and listed["last_delivered_at"] and store.list("4") == []
    assert listed["target"]["headers"] == {"Authorization": ""}, "header values are never answered"
    store.save("3", name="CRM intake", kind="events", destination="webhook", stream_id=listed["id"],
               target={"url": receiver.url}, headers={"Authorization": ""})
    assert store.test("3", listed["id"])["ok"] and receiver.headers[-1]["Authorization"] == "Bearer partner"
    raw = ActivityReader(settings)._client.query("SELECT target FROM streams FINAL").result_rows[0][0]
    assert "Bearer partner" not in raw, "header values are kept encrypted"

    # what is stored goes only where it went before: another address needs the secret and headers again
    elsewhere = receiver.url.replace("127.0.0.1", "localhost")
    with pytest.raises(ValueError, match="needs its secret again"):
        store.save("3", name="CRM intake", kind="events", destination="webhook", stream_id=listed["id"],
                   target={"url": elsewhere}, headers={"Authorization": ""})
    with pytest.raises(ValueError, match="needs its value"):
        store.save("3", name="CRM intake", kind="events", destination="webhook", stream_id=listed["id"],
                   target={"url": elsewhere}, headers={"Authorization": ""}, secret=SIGNING)
    with pytest.raises(ValueError, match="needs its secret again"):
        store.save("3", name="CRM intake", kind="events", destination="s3", stream_id=listed["id"],
                   target={"bucket": "b"})


@needs_clickhouse
def test_a_failing_destination_waits_then_resumes_where_it_stopped(settings, tmp_path, receiver, settled_at_once):
    store = StreamStore(settings, KEY, allow_private=True)
    store.save("", name="Archive", kind="both", destination="webhook", target={"url": receiver.url}, secret=SIGNING,
               start="beginning")
    record(settings, tmp_path, [("3", "trade.opened")])
    receiver.status = 500
    assert deliver_streams(settings, key=KEY, allow_private=True)["failed"] == 1
    failing = store.list("")[0]
    assert failing["state"] == "failing" and "500" in failing["error"]

    receiver.status = 200
    received = len(receiver.bodies)
    deliver_streams(settings, key=KEY, allow_private=True)
    assert len(receiver.bodies) == received, "it waits before trying again"
    admin_command(settings, "ALTER TABLE stream_progress UPDATE next_try_at = toDateTime64(0, 3, 'UTC') WHERE 1")
    deliver_streams(settings, key=KEY, allow_private=True)
    assert [l["action"] for l in receiver.lines() if l.get("action")][-1] == "trade.opened"
    assert store.list("")[0]["state"] == "active"


@needs_clickhouse
def test_secrets_stay_put_and_unreadable(settings):
    store = StreamStore(settings, KEY, allow_private=True)
    with pytest.raises(ValueError, match="needs its secret"):
        store.save("3", name="x", kind="events", destination="webhook", target={"url": "http://127.0.0.1:1/x"})
    with pytest.raises(ValueError, match="unknown search field"):
        store.save("3", name="x", kind="requests", destination="webhook", target={"url": "http://127.0.0.1:1/x"},
                   secret=SIGNING, query="action:trade.*")
    saved = store.save("3", name="x", kind="events", destination="webhook", target={"url": "http://127.0.0.1:1/x"}, secret=SIGNING)
    renamed = store.save("3", name="y", kind="events", destination="webhook", target={"url": "http://127.0.0.1:1/x"},
                         stream_id=saved["id"])
    assert renamed["has_secret"] and store._secrets(store._rows(store._client(), "3")[0])["secret"] == SIGNING
    raw = ActivityReader(settings)._client.query("SELECT secret FROM streams").result_rows[0][0]
    assert SIGNING not in raw, "encrypted at rest"
    with pytest.raises(ValueError, match="no longer opens"):
        StreamStore(settings, "another key", allow_private=True)._secrets(store._rows(store._client(), "3")[0])
    assert store.remove("3", saved["id"]) and store.list("3") == []


@needs_clickhouse
def test_an_s3_destination_gets_one_gzip_file_per_batch(settings, tmp_path, settled_at_once, monkeypatch):
    put = []

    class FakeS3:
        def put_object(self, **fields):
            put.append(fields)
    import boto3
    monkeypatch.setattr(boto3, "client", lambda *a, **k: FakeS3())
    store = StreamStore(settings, KEY, allow_private=True)
    store.save("3", name="Bucket", kind="events", destination="s3", target={"bucket": "logs", "prefix": "x9/activity"},
               secret={"access_key": "a", "secret_key": "b"}, start="beginning")
    record(settings, tmp_path, [("3", "trade.opened")])
    deliver_streams(settings, key=KEY, allow_private=True)
    assert put[0]["Bucket"] == "logs" and put[0]["Key"].startswith("x9/activity/events/") and put[0]["Key"].endswith(".jsonl.gz")
    assert json.loads(gzip.decompress(put[0]["Body"]))["action"] == "trade.opened"


@needs_clickhouse
def test_a_kind_added_later_is_delivered_from_then_on(settings, tmp_path, receiver, settled_at_once):
    store = StreamStore(settings, KEY, allow_private=True)
    made = store.save("3", name="CRM", kind="events", destination="webhook", target={"url": receiver.url}, secret=SIGNING)
    store.save("3", name="CRM", kind="both", destination="webhook", target={"url": receiver.url}, stream_id=made["id"])
    hub = ActivityHub(settings, spool_dir=str(tmp_path), app="x9", environment="test", service="s")
    with activity_context(tenant_id="3", actor_type="account", actor_id="1"):
        hub.record_access(method="POST", route="/trade", path="/trade", status=200, duration_ms=3)
    hub.flush()
    hub.close()
    deliver_streams(settings, key=KEY, allow_private=True)
    assert [l["kind"] for l in receiver.lines()] == ["requests"]


def scope(x_company: str = Header(""), x_actor: str = Header("")):
    filters = {"tenant_id": x_company} if x_company else {}
    if x_actor:
        filters["actor_id"] = x_actor
    return {"filters": filters, "viewer": {"id": "12", "name": "ops@x9.ae"}}


@needs_clickhouse
def test_the_stream_routes_keep_to_the_company(settings, receiver):
    store = StreamStore(settings, KEY, allow_private=True)
    app = FastAPI()
    recorded = []
    app.include_router(activity_router(get_reader=lambda: None, authorize=scope, streams=lambda: store,
                                       record=lambda action, **fields: recorded.append((action, fields))), prefix="/a")
    client = TestClient(app)
    company = {"x-company": "3"}
    made = client.post("/a/streams", headers=company, json={"name": "CRM", "destination": "webhook",
                       "target": {"url": receiver.url}, "secret": SIGNING}).json()
    assert made["state"] == "active" and "secret" not in made
    assert [s["name"] for s in client.get("/a/streams", headers=company).json()["streams"]] == ["CRM"]
    assert client.get("/a/streams", headers={"x-company": "4"}).json()["streams"] == []
    assert client.get("/a/streams", headers={"x-actor": "100234"}).status_code == 403
    assert client.post(f"/a/streams/{made['id']}/test", headers=company).json() == {"ok": True, "error": ""}
    assert receiver.lines()[-1]["test"] is True
    assert client.post("/a/streams", headers=company, json={"name": "Bad", "destination": "webhook",
                       "target": {"url": "ftp://x"}, "secret": SIGNING}).status_code == 400
    assert client.delete(f"/a/streams/{made['id']}", headers={"x-company": "4"}).status_code == 404
    assert client.delete(f"/a/streams/{made['id']}", headers=company).json() == {"removed": True}
    assert [a for a, _ in recorded] == ["activity.stream_saved", "activity.stream_removed"], "stream changes are on record"
    assert recorded[0][1]["tenant_id"] == "3" and recorded[0][1]["metadata"]["destination"] == receiver.url

    narrow = FastAPI()
    narrow.include_router(activity_router(get_reader=lambda: None, streams=lambda: store, authorize=lambda: {
        "filters": {"tenant_id": "3"}, "kinds": ["events"]}), prefix="/a")
    assert TestClient(narrow).post("/a/streams", json={"name": "All", "kind": "both", "destination": "webhook",
                                   "target": {"url": receiver.url}, "secret": SIGNING}).status_code == 403
    hidden = FastAPI()
    hidden.include_router(activity_router(get_reader=lambda: None, streams=lambda: store, authorize=lambda: {
        "filters": {"tenant_id": "3"}, "hide": ["ip"]}), prefix="/a")
    assert TestClient(hidden).get("/a/streams").status_code == 403, "a stream sends whole records"

    off = FastAPI()
    off.include_router(activity_router(get_reader=lambda: None, authorize=scope), prefix="/a")
    assert TestClient(off).get("/a/streams").json() == {"enabled": False, "streams": []}
