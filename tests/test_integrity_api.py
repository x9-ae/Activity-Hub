from datetime import datetime, timedelta, timezone
from fastapi import FastAPI, Header, HTTPException
from fastapi.testclient import TestClient
from activity_hub import ActivityHub, ActivityReader, seal_new_rows
from activity_hub.api import activity_router
from conftest import needs_clickhouse, admin_command


def scope(x_company: str = Header(""), x_role: str = Header("owner")):
    if x_role == "none":
        raise HTTPException(status_code=403, detail="no access")
    return {"filters": {"tenant_id": x_company}} if x_company else {"filters": {}}


def checker(x_role: str = Header("owner"), x_company: str = Header("")):
    if x_role != "owner":
        raise HTTPException(status_code=403, detail="needs the export permission")
    return scope(x_company, x_role)


def app_for(settings):
    reader = ActivityReader(settings)
    app = FastAPI()
    app.include_router(activity_router(get_reader=lambda: reader, authorize=scope, authorize_export=checker),
                       prefix="/activity")
    return TestClient(app), reader


@needs_clickhouse
def test_a_day_is_checked_against_its_seals_and_a_change_shows(settings, tmp_path):
    hub = ActivityHub(settings, spool_dir=str(tmp_path), app="x9", environment="test", service="s")
    for n in range(3):
        hub.record_event("trade.opened", actor_type="account", actor_id="1", target_type="ticket", target_id=str(n))
    hub.flush()
    hub.close()
    seal_new_rows(settings, until=datetime.now(timezone.utc) + timedelta(minutes=3))
    client, reader = app_for(settings)
    today = datetime.now(timezone.utc).date().isoformat()

    status = client.get("/activity/status").json()
    assert status["checks"] is True
    assert client.get("/activity/status", headers={"x-company": "3"}).json()["checks"] is False

    intact = client.post("/activity/integrity/verify", json={"day": today}).json()
    assert intact["ok"] is True and intact["rows"] == 3 and intact["day"] == today, intact["problems"]

    admin_command(settings, "ALTER TABLE events UPDATE actor_id = '2' WHERE target_id = '1'")
    broken = client.post("/activity/integrity/verify", json={"day": today}).json()
    assert broken["ok"] is False and "rows changed" in broken["problems"][0]["problem"]
    reader.close()


@needs_clickhouse
def test_a_proof_is_downloaded_and_a_rewrite_of_rows_and_seals_together_shows(settings, tmp_path):
    hub = ActivityHub(settings, spool_dir=str(tmp_path), app="x9", environment="test", service="s")
    hub.record_event("trade.opened", actor_type="account", actor_id="1", target_type="ticket", target_id="1")
    hub.flush()
    hub.close()
    seal_new_rows(settings, until=datetime.now(timezone.utc) + timedelta(minutes=3))
    client, reader = app_for(settings)
    today = datetime.now(timezone.utc).date().isoformat()

    assert client.get(f"/activity/integrity/seal/{today}").status_code == 400, "today is not over"
    from activity_hub import daily_seal
    proof = daily_seal(settings, datetime.now(timezone.utc).date())
    assert {s["table"] for s in proof["seals"]} >= {"events"}
    assert client.post("/activity/integrity/check", json={"record": proof}).json() == {"ok": True, "mismatches": []}

    # someone with database access rewrites a seal to cover a changed row: the kept proof no longer matches
    admin_command(settings, "ALTER TABLE seals UPDATE hash = 'forged' WHERE table_name = 'events'")
    answer = client.post("/activity/integrity/check", json={"record": proof}).json()
    assert answer["ok"] is False and answer["mismatches"][0]["problem"] == "seal differs"
    reader.close()


@needs_clickhouse
def test_checks_are_for_those_who_see_every_record(settings):
    client, reader = app_for(settings)
    today = datetime.now(timezone.utc).date().isoformat()
    assert client.post("/activity/integrity/verify", json={"day": today}, headers={"x-company": "3"}).status_code == 403
    assert client.post("/activity/integrity/verify", json={"day": today}, headers={"x-role": "support"}).status_code == 403
    assert client.get(f"/activity/integrity/seal/{today}", headers={"x-company": "3"}).status_code == 403
    assert client.post("/activity/integrity/verify", json={"day": "yesterday"}).status_code == 422
    assert client.post("/activity/integrity/check", json={"record": {"day": today}}).status_code == 422
    assert client.post("/activity/integrity/check", json={"record": {"day": today, "seals": [
        {"table": "events", "window_start": 123, "hash": "x"}]}}).status_code == 422
    assert client.post("/activity/integrity/check", json={"record": {"day": today, "seals": []}}).status_code == 422
    assert client.post("/activity/integrity/verify", json={"day": "9999-12-31"}).status_code == 422
    assert client.get("/activity/integrity/seal/2001-01-01").status_code == 404, "nothing sealed then"
    assert client.get("/activity/integrity").json() == {"allowed": True}
    assert client.get("/activity/integrity", headers={"x-role": "support"}).status_code == 403
    reader.close()


@needs_clickhouse
def test_seals_removed_at_a_day_s_edges_or_all_of_them_show(settings, tmp_path):
    from activity_hub import verify
    start = datetime(2026, 11, 8, tzinfo=timezone.utc)
    hub = ActivityHub(settings, spool_dir=str(tmp_path), app="x9", environment="test", service="s")
    hub.record_event("trade.opened", actor_type="account", actor_id="1", target_type="ticket", target_id="1")
    hub.flush()
    hub.close()
    # backdate the row to the day before, then seal the three days around it
    admin_command(settings, "ALTER TABLE events UPDATE received_at = toDateTime64('2026-11-08 10:30:00', 3, 'UTC') WHERE 1")
    seal_new_rows(settings, until=start + timedelta(days=3))
    day = dict(window_from=start, window_to=start + timedelta(days=1))
    assert verify(settings, **day)["ok"] is True

    admin_command(settings, "ALTER TABLE seals DELETE WHERE window_start >= '2026-11-08 22:00:00' AND window_start < '2026-11-09 00:00:00'")
    tail = verify(settings, **day)
    assert not tail["ok"] and any("seals missing" in p["problem"] for p in tail["problems"])

    admin_command(settings, "ALTER TABLE seals DELETE WHERE window_start >= '2026-11-08 00:00:00' AND window_start < '2026-11-09 00:00:00'")
    gone = verify(settings, **day)
    assert not gone["ok"] and any(p["problem"] == "rows in a minute with no seal" for p in gone["problems"])

    before = verify(settings, window_from=start - timedelta(days=30), window_to=start - timedelta(days=29))
    assert before["ok"] is True, "a day before the log began is not a gap"
