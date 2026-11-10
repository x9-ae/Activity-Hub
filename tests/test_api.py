import pytest
from datetime import datetime, timedelta, timezone
from fastapi import FastAPI, Header, HTTPException
from fastapi.testclient import TestClient
from activity_hub import ActivityHub, ActivityReader, Catalog, activity_context, seal_new_rows
from activity_hub.api import activity_router
from conftest import needs_clickhouse

CATALOG = Catalog(events={"trade.opened": {"title": "Trade opened", "says": "Opened {side} {volume} {symbol}"}},
                  values={"side": {"1": "BUY"}}, entities={"trading_positions": "position record"})
AT = datetime(2026, 11, 9, 20, 31, 47, tzinfo=timezone.utc)


def scope(x_company: str = Header(""), x_role: str = Header("")):
    """The test's sign-in: a company's staff see their company; no role, no access."""
    if not x_role:
        raise HTTPException(status_code=403, detail="no access")
    return {"filters": {"tenant_id": x_company}} if x_company else {}


def export_scope(x_company: str = Header(""), x_role: str = Header("")):
    if x_role != "owner":
        raise HTTPException(status_code=403, detail="no export")
    return scope(x_company, x_role)


@pytest.fixture
def setup(settings, tmp_path):
    hub = ActivityHub(settings, spool_dir=str(tmp_path), app="x9", environment="test", service="trading")
    ms = timedelta(milliseconds=1)
    with activity_context(actor_type="account", actor_id="100234", request_id="r1", tenant_id="3"):
        hub.record_event("data.created", target_type="trading_positions", target_id="9", occurred_at=AT,
                         related=[("ticket", "32101")])
        opened = hub.record_event("trade.opened", target_type="ticket", target_id="32101", occurred_at=AT + ms,
                                  metadata={"side": "1", "volume": 0.1, "symbol": "EURUSD"})
        hub.record_access(method="POST", route="/trade", path="/trade", status=200, duration_ms=12)
    other = hub.record_event("trade.opened", actor_type="account", actor_id="7", tenant_id="4", target_type="ticket",
                             target_id="555", occurred_at=AT + 2 * ms, metadata={"side": "1", "volume": 1, "symbol": "XAUUSD"})
    hub.record_event("user.signed_in", actor_type="visitor", actor_id="5", outcome="failed", reason="wrong password",
                     tenant_id="3", occurred_at=AT + 3 * ms)
    hub.flush()
    hub.close()
    reader = ActivityReader(settings, catalog=CATALOG)
    recorded = []
    holder = {"reader": reader}
    app = FastAPI()
    app.include_router(activity_router(get_reader=lambda: holder["reader"], authorize=scope,
                                       authorize_export=export_scope,
                                       record=lambda action, **fields: recorded.append((action, fields)),
                                       status=lambda: {"recording": True}), prefix="/activity")
    yield {"client": TestClient(app), "recorded": recorded, "holder": holder, "opened": opened, "other": other,
           "settings": settings}
    reader.close()


STAFF_3 = {"x-company": "3", "x-role": "support"}
RANGE = {"occurred_from": "2026-11-09 00:00:00", "occurred_to": "2026-11-10 00:00:00"}


@needs_clickhouse
def test_search_is_held_to_the_callers_company(setup):
    client = setup["client"]
    body = client.post("/activity/search", json={"filters": {"tenant_id": "4"}, **RANGE}, headers=STAFF_3).json()
    assert {item["tenant_id"] for item in body["items"]} == {"3"}, "the scope's tenant wins over the caller's"
    everyone = client.post("/activity/search", json=RANGE, headers={"x-role": "owner"}).json()["items"]
    assert len(everyone) == 4
    assert client.post("/activity/search", json=RANGE).status_code == 403


@needs_clickhouse
def test_the_important_view_reads_as_sentences_with_changes_folded(setup):
    items = setup["client"].post("/activity/search", json={"view": "important", **RANGE}, headers=STAFF_3).json()["items"]
    assert [(i["title"], i["summary"]) for i in items] == [("Sign-in failed", "Failed sign-in: wrong password"),
                                                           ("Trade opened", "Opened BUY 0.1 EURUSD")]
    assert [child["summary"] for child in items[1]["children"]] == ["Created position record 9"]
    requests = setup["client"].post("/activity/search", json={"kind": "requests"}, headers=STAFF_3).json()
    assert [row["route"] for row in requests["items"]] == ["/trade"]


@needs_clickhouse
def test_chart_values_catalog_and_status(setup):
    client = setup["client"]
    chart = client.post("/activity/chart", json=RANGE, headers=STAFF_3).json()
    assert chart["bucket_minutes"] == 15 and sum(b["count"] for b in chart["buckets"]) == 3
    all_time = client.post("/activity/chart", json={}, headers=STAFF_3).json()
    assert all_time["occurred_from"] == "2026-11-09 20:00:00" and sum(b["count"] for b in all_time["buckets"]) == 3
    values = client.post("/activity/values", json={"field": "outcome", **RANGE}, headers=STAFF_3).json()["values"]
    assert {v["value"]: v["count"] for v in values} == {"success": 2, "failed": 1}
    assert client.post("/activity/values", json={"field": "tenant_id"}, headers=STAFF_3).status_code == 422
    catalog = client.get("/activity/catalog", headers=STAFF_3).json()
    assert catalog["actions"]["trade.opened"] == {"title": "Trade opened", "importance": "normal", "category": "trade"}
    assert catalog["actor_types"]["api_key"] == "API key"
    seal_new_rows(setup["settings"], until=datetime.now(timezone.utc) + timedelta(minutes=2))
    status = client.get("/activity/status", headers=STAFF_3).json()
    assert status["recording"] is True and "events" in status["sealed_until"]


@needs_clickhouse
def test_an_event_comes_with_its_request(setup):
    client = setup["client"]
    detail = client.get(f"/activity/events/{setup['opened']}", headers=STAFF_3).json()
    assert detail["event"]["summary"] == "Opened BUY 0.1 EURUSD"
    assert {"field": "side", "label": "Side", "value": "BUY"} in detail["event"]["details"]
    assert [e["action"] for e in detail["same_request"]] == ["data.created"]
    assert [r["route"] for r in detail["requests"]] == ["/trade"]
    assert client.get(f"/activity/events/{setup['other']}", headers=STAFF_3).status_code == 404, "another company's"
    assert client.get("/activity/events/not-an-id", headers=STAFF_3).status_code == 404


@needs_clickhouse
def test_export_needs_its_own_permission_and_is_recorded(setup):
    client = setup["client"]
    assert client.post("/activity/export", json=RANGE, headers=STAFF_3).status_code == 403
    page = client.post("/activity/export", json=RANGE, headers={"x-company": "3", "x-role": "owner"}).json()
    assert len(page["items"]) == 3 and page["next_cursor"] is None
    action, fields = setup["recorded"][0]
    assert action == "activity.exported" and fields["metadata"]["rows"] == 3


@needs_clickhouse
def test_errors_answer_400_and_503(setup):
    client = setup["client"]
    assert client.post("/activity/search", json={"filters": {"password": "x"}}, headers=STAFF_3).status_code == 422
    assert client.post("/activity/search", json={"filters": {"limit": "5000"}}, headers=STAFF_3).status_code == 422
    assert client.post("/activity/search", json={"kind": "requests", "filters": {"category": "x"}},
                       headers=STAFF_3).status_code == 400, "a filter of the other kind"
    assert client.post("/activity/search", json={"cursor": "broken"}, headers=STAFF_3).status_code == 400
    assert client.post("/activity/chart", json={"occurred_from": "yesterday"}, headers=STAFF_3).status_code == 400
    assert client.post("/activity/search", json={"occurred_from": "yesterday"}, headers=STAFF_3).status_code == 400
    assert client.post("/activity/search", json={"related_type": "account"}, headers=STAFF_3).status_code == 400
    assert client.post("/activity/values", json={"field": "service", "related_id": "1"}, headers=STAFF_3).status_code == 400
    import base64
    forged = base64.urlsafe_b64encode(b"x|y").decode()
    assert client.post("/activity/search", json={"cursor": forged}, headers=STAFF_3).status_code == 400
    setup["holder"]["reader"] = None
    answer = client.post("/activity/search", json={}, headers=STAFF_3)
    assert answer.status_code == 503 and answer.json()["detail"] == "The activity log is not set up on this server"
