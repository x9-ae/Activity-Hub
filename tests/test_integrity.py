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
    record(settings, tmp_path, 1)
    # rows in two earlier minutes too, so three minutes are sealed, one after another
    for minutes_ago in (3, 2):
        admin_command(settings, "INSERT INTO events (id, occurred_at, app, action, category, actor_type, received_at) "
                                "VALUES (generateUUIDv7(), now64(3), 'x9-platform', 'trade.closed', 'trade', 'system', "
                                f"now64(3) - INTERVAL {minutes_ago} MINUTE)")
    now = datetime.now(timezone.utc)
    seal_new_rows(settings, until=now + timedelta(minutes=4))
    kept = daily_seal(settings, (now + timedelta(days=1)).date())
    assert check_daily_seal(settings, kept) == []

    assert verify(settings, table="events")["checked"] >= 3
    second = count(settings, "SELECT toString(min(window_start) + 60) FROM seals WHERE table_name = 'events'")
    admin_command(settings, f"ALTER TABLE seals DELETE WHERE table_name = 'events' AND window_start = '{second}'")
    problems = [p["problem"] for p in verify(settings, table="events")["problems"]]
    assert "chain broken" in problems and "rows in a minute with no seal" in problems

    admin_command(settings, "ALTER TABLE seals UPDATE hash = 'forged' WHERE table_name = 'access_logs'")
    assert any(p["problem"] == "seal altered" for p in verify(settings, table="access_logs")["problems"])
    assert check_daily_seal(settings, kept)[0]["problem"] == "seal differs"


@needs_clickhouse
def test_an_empty_minute_is_sealed_only_on_the_hour_and_rows_added_to_one_later_show(settings, tmp_path):
    record(settings, tmp_path, 1)
    start = datetime.now(timezone.utc)
    seal_new_rows(settings, until=start + timedelta(minutes=125))
    windows = _seal_windows(settings, "events")
    assert len(windows) <= 4, "the rows' minute and the two or three hours passed, not 125 minutes"
    assert all(w.minute == 0 for w, rows in windows if rows == 0)
    late = start + timedelta(minutes=30)
    if late.minute == 0:
        late += timedelta(minutes=1)
    admin_command(settings, "INSERT INTO events (id, occurred_at, app, action, category, actor_type, received_at) "
                            "VALUES (generateUUIDv7(), now64(3), 'x9-platform', 'trade.closed', 'trade', 'system', "
                            f"toDateTime64('{late:%Y-%m-%d %H:%M:%S}', 3, 'UTC'))")
    assert "rows in a minute with no seal" in [p["problem"] for p in verify(settings, table="events")["problems"]]


def _seal_windows(settings, table):
    from activity_hub.database import get_client
    client = get_client(settings, database=settings["database"])
    try:
        return [(row[0], row[1]) for row in client.query(
            "SELECT window_start, row_count FROM seals WHERE table_name = {t:String} ORDER BY window_start",
            parameters={"t": table}).result_rows]
    finally:
        client.close()
