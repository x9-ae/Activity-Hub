from datetime import datetime, timezone, timedelta
from activity_hub import ActivityHub, seal_new_rows, verify, daily_seal, check_daily_seal
from conftest import needs_clickhouse, admin_command, count

SOURCE = {"app": "x9-platform", "environment": "test", "service": "trading_service"}


def record(settings, tmp_path, count: int) -> list:
    hub = ActivityHub(settings, spool_dir=str(tmp_path), **SOURCE)
    ids = [hub.record_event("trade.closed", actor_type="account", actor_id=str(n)) for n in range(count)]
    hub.record_access(method="GET", route="/x", path="/x", status=200, duration_ms=1)
    hub.flush()
    hub.close()
    return ids


@needs_clickhouse
def test_sealed_rows_verify_and_a_second_run_seals_nothing_new(settings, tmp_path):
    record(settings, tmp_path, 5)
    until = datetime.now(timezone.utc) + timedelta(minutes=2)
    assert seal_new_rows(settings, until=until) >= 2
    assert seal_new_rows(settings, until=until) == 0
    report = verify(settings)
    assert report["ok"], report["problems"]


@needs_clickhouse
def test_a_row_changed_or_removed_after_sealing_is_reported(settings, tmp_path):
    ids = record(settings, tmp_path, 3)
    seal_new_rows(settings, until=datetime.now(timezone.utc) + timedelta(minutes=2))

    admin_command(settings, f"ALTER TABLE events UPDATE actor_name = 'someone else' WHERE id = '{ids[0]}'")
    problems = verify(settings, table="events")["problems"]
    assert [p["problem"] for p in problems] == ["rows changed: sealed 3 row(s), now 3"]

    admin_command(settings, f"ALTER TABLE events DELETE WHERE id = '{ids[1]}'")
    assert "now 2" in verify(settings, table="events")["problems"][0]["problem"]


@needs_clickhouse
def test_seals_removed_or_rewritten_are_reported_and_the_daily_record_catches_a_full_rewrite(settings, tmp_path):
    record(settings, tmp_path, 2)
    now = datetime.now(timezone.utc)
    seal_new_rows(settings, until=now + timedelta(minutes=4))
    kept = daily_seal(settings, (now + timedelta(days=1)).date())
    assert check_daily_seal(settings, kept) == []

    assert verify(settings, table="events")["checked"] >= 3
    second = count(settings, "SELECT toString(min(window_start) + 60) FROM seals WHERE table_name = 'events'")
    admin_command(settings, f"ALTER TABLE seals DELETE WHERE table_name = 'events' AND window_start = '{second}'")
    assert any("seals missing" in p["problem"] for p in verify(settings, table="events")["problems"])

    admin_command(settings, "ALTER TABLE seals UPDATE hash = 'forged' WHERE table_name = 'access_logs'")
    assert any(p["problem"] == "seal altered" for p in verify(settings, table="access_logs")["problems"])
    assert check_daily_seal(settings, kept)[0]["problem"] == "seal differs"
