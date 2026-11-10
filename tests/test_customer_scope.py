from datetime import datetime, timedelta, timezone
from fastapi import FastAPI
from fastapi.testclient import TestClient
from activity_hub import ActivityHub, ActivityReader, activity_context
from activity_hub.api import activity_router
from conftest import needs_clickhouse

HIDDEN = ["service", "tenant_id", "request_id", "session_id", "environment", "app"]
AT = datetime(2026, 11, 9, 12, tzinfo=timezone.utc)


def client_scope():
    """A trader reading their own activity: only what they did, no access log, no internals."""
    return {"filters": {"actor_id": "100234"}, "kinds": ["events"], "hide": HIDDEN}


@needs_clickhouse
def test_a_client_reads_only_their_own_events_without_internals(settings, tmp_path):
    hub = ActivityHub(settings, spool_dir=str(tmp_path), app="x9", environment="1x", service="trading_service")
    with activity_context(actor_type="account", actor_id="100234", request_id="r1", tenant_id="3"):
        hub.record_event("data.created", target_type="trading_positions", target_id="9", occurred_at=AT)
        opened = hub.record_event("trade.opened", target_type="ticket", target_id="1", occurred_at=AT + timedelta(milliseconds=1))
        hub.record_access(method="POST", route="/trade", path="/trade", status=200, duration_ms=3)
    hub.record_event("user.signed_in", actor_type="visitor", actor_id="100234", outcome="failed", reason="wrong password",
                     tenant_id="3", occurred_at=AT + timedelta(seconds=1))
    hub.record_event("balance.added", actor_type="staff", actor_id="12", actor_name="ops@x9.ae", tenant_id="3",
                     target_type="account", target_id="100234", occurred_at=AT + timedelta(seconds=2))
    hub.record_event("trade.opened", actor_type="account", actor_id="555", tenant_id="3", occurred_at=AT + timedelta(seconds=3))
    hub.flush()
    hub.close()
    reader = ActivityReader(settings)
    app = FastAPI()
    app.include_router(activity_router(get_reader=lambda: reader, authorize=client_scope), prefix="/me")
    client = TestClient(app)

    page = client.post("/me/search", json={"view": "all"}).json()
    assert [i["action"] for i in page["items"]] == ["user.signed_in", "trade.opened"], "never staff or other clients"
    opened_row = page["items"][1]
    assert not set(HIDDEN) & set(opened_row) and not set(HIDDEN) & set(opened_row["children"][0])
    assert opened_row["children"][0]["action"] == "data.created"

    assert client.post("/me/search", json={"kind": "requests"}).status_code == 403
    assert client.post("/me/chart", json={"kind": "requests"}).status_code == 403
    assert client.post("/me/values", json={"field": "service"}).json() == {"values": []}
    assert client.post("/me/search", json={"filters": {"actor_id": "555"}}).json()["items"][0]["actor_id"] == "100234"

    detail = client.get(f"/me/events/{opened}").json()
    assert detail["requests"] == [] and "request_id" not in detail["event"]
    assert client.get("/me/status").json()["checks"] is False
    assert client.get("/me/views").json() == {"enabled": False, "views": []}
    reader.close()


def test_a_router_mounts_only_the_parts_asked_for():
    import pytest
    router = activity_router(get_reader=lambda: None, authorize=client_scope, parts=("search", "event", "export", "catalog"))
    assert sorted(route.path for route in router.routes) == ["/catalog", "/events/{event_id}", "/export", "/search"]
    every = activity_router(get_reader=lambda: None, authorize=client_scope)
    assert len(every.routes) == 14, "every route belongs to a part"
    with pytest.raises(ValueError, match="unknown parts"):
        activity_router(get_reader=lambda: None, authorize=client_scope, parts=("search", "alerts"))


@needs_clickhouse
def test_answers_come_in_the_application_s_envelope(settings):
    reader = ActivityReader(settings)
    app = FastAPI()
    app.include_router(activity_router(get_reader=lambda: reader, authorize=client_scope,
                                       respond=lambda payload: {"status": True, "data": payload}), prefix="/me")
    client = TestClient(app)
    assert client.post("/me/search", json={}).json() == {"status": True, "data": {"items": [], "next_cursor": None}}
    assert client.post("/me/values", json={"field": "service"}).json() == {"status": True, "data": {"values": []}}
    assert client.get("/me/views").json()["data"] == {"enabled": False, "views": []}
    reader.close()
