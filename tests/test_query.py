import pytest
from datetime import datetime, timedelta, timezone
from fastapi import FastAPI, Header
from fastapi.testclient import TestClient
from activity_hub import ActivityHub, ActivityReader, activity_context
from activity_hub.api import activity_router
from activity_hub.query import parse, to_sql
from conftest import needs_clickhouse

AT = datetime(2026, 11, 9, 12, 0, tzinfo=timezone.utc)


def test_a_search_reads_fields_negations_quotes_and_words():
    assert parse('actor:"ops team" -result:success action:trade.* wrong "stop loss"', "events") == [
        ("actor", "ops team", False), ("result", "success", True), ("action", "trade.*", False),
        (None, "wrong", False), (None, "stop loss", False)]
    with pytest.raises(ValueError, match="unknown search field method"):
        parse("method:GET", "events")
    with pytest.raises(ValueError, match="on: takes"):
        to_sql("on:100234", "events", {})
    with pytest.raises(ValueError, match="status: takes"):
        to_sql("status:bad", "requests", {})
    with pytest.raises(ValueError, match="at most"):
        parse(" ".join(["x"] * 21), "events")


def test_values_of_one_field_are_any_of_them_and_never_reach_the_sql_text():
    parameters = {}
    clauses = to_sql("action:trade.* action:order.placed -ip:1.2.3.4 x'); DROP", "events", parameters)
    assert clauses[0] == "(startsWith(action, {q0:String}) OR action = {q1:String})"
    assert "DROP" not in " ".join(clauses) and parameters["q4"] == "DROP"
    assert clauses[-1] == "NOT ip = {q2:String}"


@pytest.fixture
def reader(settings, tmp_path):
    hub = ActivityHub(settings, spool_dir=str(tmp_path), app="x9", environment="test", service="trading")
    hub.record_event("trade.opened", actor_type="account", actor_id="100234", actor_name="Mick Trades", tenant_id="3",
                     target_type="ticket", target_id="32101", related=[("account", "100234")], ip="1.2.3.4",
                     metadata={"symbol": "EURUSD"}, occurred_at=AT)
    hub.record_event("order.placed", actor_type="account", actor_id="100234", tenant_id="3", target_type="ticket",
                     target_id="32102", metadata={"symbol": "XAUUSD"}, occurred_at=AT + timedelta(seconds=1))
    hub.record_event("user.signed_in", actor_type="visitor", actor_id="5", outcome="failed", reason="Wrong password",
                     tenant_id="3", occurred_at=AT + timedelta(seconds=2))
    with activity_context(actor_type="staff", actor_id="12", tenant_id="3"):
        hub.record_access(method="POST", route="/trading/close", path="/trading/close", status=409, duration_ms=5)
        hub.record_access(method="GET", route="/symbols", path="/symbols", status=200, duration_ms=2)
    hub.flush()
    hub.close()
    reader = ActivityReader(settings)
    yield reader
    reader.close()


def actions(page):
    return [item["action"] for item in page["items"]]


@needs_clickhouse
def test_the_search_language_finds_what_it_says(reader):
    assert actions(reader.search_events(query="actor:\"mick trades\"")) == ["trade.opened"]
    assert actions(reader.search_events(query="action:trade.* action:order.*")) == ["order.placed", "trade.opened"]
    assert actions(reader.search_events(query="-result:success")) == ["user.signed_in"]
    assert actions(reader.search_events(query="on:account:100234")) == ["trade.opened"]
    assert actions(reader.search_events(query="xauusd")) == ["order.placed"]
    assert actions(reader.search_events(query='"wrong password"')) == ["user.signed_in"]
    assert [r["route"] for r in reader.search_access_logs(query="status:4xx")["items"]] == ["/trading/close"]
    assert [r["route"] for r in reader.search_access_logs(query="route:/trading/*")["items"]] == ["/trading/close"]
    assert reader.count_over_time("events", bucket_minutes=60, query="actor:100234")[0]["count"] == 2


def scope(x_user: str = Header(""), x_company: str = Header("3")):
    return {"filters": {"tenant_id": x_company}, **({"viewer": {"id": x_user, "name": x_user.title()}} if x_user else {})}


@needs_clickhouse
def test_saved_views_are_ones_own_or_shared_in_the_company(settings):
    reader = ActivityReader(settings)
    app = FastAPI()
    app.include_router(activity_router(get_reader=lambda: reader, authorize=scope), prefix="/activity")
    client = TestClient(app)
    ann, bob, other = {"x-user": "ann"}, {"x-user": "bob"}, {"x-user": "cat", "x-company": "4"}

    assert client.get("/activity/views").json() == {"enabled": False, "views": []}
    mine = client.post("/activity/views", json={"name": "My failed sign-ins", "search": "view=problems&q=action%3Auser."},
                       headers=ann).json()
    shared = client.post("/activity/views", json={"name": "Money", "search": "p=3", "shared": True}, headers=ann).json()
    assert [v["name"] for v in client.get("/activity/views", headers=ann).json()["views"]] == ["Money", "My failed sign-ins"]
    seen_by_bob = client.get("/activity/views", headers=bob).json()["views"]
    assert [(v["name"], v["mine"], v["owner_name"]) for v in seen_by_bob] == [("Money", False, "Ann")]
    assert client.get("/activity/views", headers=other).json()["views"] == [], "another company sees nothing"

    renamed = client.post("/activity/views", json={"id": mine["id"], "name": "Failed sign-ins", "search": "view=problems"},
                          headers=ann).json()
    assert renamed["id"] == mine["id"]
    assert client.post("/activity/views", json={"id": shared["id"], "name": "Mine now"}, headers=bob).status_code == 400
    assert client.delete(f"/activity/views/{shared['id']}", headers=bob).status_code == 404
    assert client.delete(f"/activity/views/{shared['id']}", headers=ann).json() == {"removed": True}
    assert [v["name"] for v in client.get("/activity/views", headers=ann).json()["views"]] == ["Failed sign-ins"]
    assert client.post("/activity/views", json={"name": "x"}).status_code == 403
    reader.close()


def test_unclosed_quotes_links_and_status_bounds():
    assert parse('"wrong password', "events") == [(None, "wrong password", False)]
    assert parse("see http://x.com", "events") == [(None, "see", False), (None, "http://x.com", False)]
    with pytest.raises(ValueError, match="status: takes"):
        to_sql("status:70000", "requests", {})
    parameters = {}
    clause = to_sql("Müller", "events", parameters)[0]
    assert parameters["q0_json"] == "M\\u00fcller" and "OR" in clause


@needs_clickhouse
def test_a_non_ascii_word_is_found_inside_the_details(settings, tmp_path):
    hub = ActivityHub(settings, spool_dir=str(tmp_path), app="x9", environment="test", service="s")
    hub.record_event("data.updated", actor_type="staff", actor_id="1", target_type="users", target_id="9",
                     changes={"before": {"name": "Muller"}, "after": {"name": "Müller"}})
    hub.flush()
    hub.close()
    reader = ActivityReader(settings)
    assert len(reader.search_events(query="müller")["items"]) == 1
    reader.close()
