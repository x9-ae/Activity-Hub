import csv
import io
import pytest
from datetime import datetime, timezone, timedelta
from activity_hub import ActivityHub, ActivityReader, activity_context
from conftest import needs_clickhouse

SOURCE = {"app": "x9-platform", "environment": "test", "service": "trading_service"}


@pytest.fixture
def reader(settings, tmp_path):
    hub = ActivityHub(settings, spool_dir=str(tmp_path), **SOURCE)
    start = datetime(2026, 10, 1, tzinfo=timezone.utc)
    for n in range(7):
        hub.record_event("trade.closed", actor_type="account", actor_id="100234", target_type="trade",
                         target_id=str(11000 + n), related=[("account", "100234")], occurred_at=start + timedelta(hours=n),
                         metadata={"volume": n})
    hub.record_event("account.updated", actor_type="staff", actor_id="12", target_type="account", target_id="100234",
                     tenant_id="3", changes={"before": {"leverage": 100}, "after": {"leverage": 200}},
                     occurred_at=start + timedelta(days=1))
    hub.record_event("user.signed_in", actor_type="account", actor_id="555", occurred_at=start)
    with activity_context(actor_type="staff", actor_id="12"):
        hub.record_access(method="GET", route="/x", path="/x", status=200, duration_ms=3)
        hub.record_access(method="POST", route="/y", path="/y", status=409, duration_ms=5)
    hub.flush()
    hub.close()
    reader = ActivityReader(settings)
    yield reader
    reader.close()


@needs_clickhouse
def test_search_filters_and_newest_first(reader):
    items = reader.search_events(actor_id="100234")["items"]
    assert [item["target_id"] for item in items] == [str(11000 + n) for n in reversed(range(7))]
    assert items[0]["occurred_at"] == "2026-10-01 06:00:00.000"
    assert items[0]["metadata"] == {"volume": 6}
    assert len(reader.search_events(action="trade.")["items"]) == 7
    assert len(reader.search_events(action="trade.closed", occurred_from="2026-10-01 03:00:00")["items"]) == 4
    assert reader.search_events(tenant_id="3")["items"][0]["changes"]["after"] == {"leverage": 200}
    assert len(reader.search_events(category=["trade", "account"])["items"]) == 8
    assert len(reader.search_events(category=[])["items"]) == 9, "an empty list filters nothing"
    assert [i["route"] for i in reader.search_access_logs(method=["POST", "DELETE"])["items"]] == ["/y"]
    with pytest.raises(ValueError, match="unknown filters"):
        reader.search_events(password="x")


@needs_clickhouse
def test_timeline_includes_events_where_the_entity_is_related(reader):
    actions = [item["action"] for item in reader.timeline("account", "100234")["items"]]
    assert actions == ["account.updated"] + ["trade.closed"] * 7


@needs_clickhouse
def test_cursor_pages_through_everything_once(reader):
    seen, cursor = [], None
    while True:
        page = reader.search_events(limit=3, cursor=cursor)
        seen += [item["id"] for item in page["items"]]
        cursor = page["next_cursor"]
        if not cursor:
            break
    assert len(seen) == len(set(seen)) == 9
    assert reader.get_event(seen[0])["id"] == seen[0]


@needs_clickhouse
def test_counts_over_time_follow_the_same_criteria(reader):
    hourly = reader.count_over_time("events", bucket_minutes=60, actor_id="100234")
    assert [bucket["count"] for bucket in hourly] == [1] * 7
    assert hourly[0]["at"] == "2026-10-01 00:00:00.000"
    assert reader.count_over_time("events", bucket_minutes=1440, action="trade.")[0]["count"] == 7
    assert sum(b["count"] for b in reader.count_over_time("requests", bucket_minutes=60, status_from=400)) == 1


@needs_clickhouse
def test_count_by_lists_each_value_without_its_own_filter(reader):
    assert reader.count_by("events", "actor_id")[0] == {"value": "100234", "count": 7}
    by_category = reader.count_by("events", "category", category="trade", actor_id="100234")
    assert by_category == [{"value": "trade", "count": 7}], "the field's own filter is ignored, the others apply"
    assert reader.count_by("requests", "route", status_from=400) == [{"value": "/y", "count": 1}]
    assert reader.count_by("requests", "actor_id")[0]["count"] == 2
    with pytest.raises(ValueError, match="unknown field"):
        reader.count_by("requests", "password")


@needs_clickhouse
def test_csv_export_and_access_log_search(reader):
    rows = list(csv.reader(io.StringIO("".join(reader.export_events_csv(action="trade.")))))
    assert rows[0][0] == "id" and len(rows) == 8
    errors = reader.search_access_logs(status_from=400)["items"]
    assert [(item["route"], item["status"]) for item in errors] == [("/y", 409)]


@needs_clickhouse
def test_a_timeline_reads_by_the_indexed_key_and_finds_target_and_related(settings, tmp_path):
    from activity_hub import ActivityHub, ActivityReader
    hub = ActivityHub(settings, app="x9", environment="t", service="s", spool_dir=str(tmp_path))
    hub.record_event("trade.closed", actor_type="system", target_type="ticket", target_id="11450",
                     related=[("account", "100234")])
    hub.record_event("balance.added", actor_type="system", target_type="account", target_id="100234")
    hub.record_event("balance.added", actor_type="system", target_type="account", target_id="999")
    hub.flush()
    hub.close()
    reader = ActivityReader(settings)
    assert len(reader.timeline("account", "100234")["items"]) == 2
    assert [e["action"] for e in reader.timeline("ticket", "11450")["items"]] == ["trade.closed"]
    reader.close()
