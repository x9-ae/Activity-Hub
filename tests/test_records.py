import uuid
import pytest
from datetime import datetime, timezone, timedelta
from activity_hub import activity_context, current_context, forwarded_headers
from activity_hub.ids import uuid7
from activity_hub.records import event_row, access_row, utc_timestamp, MAX_JSON_BYTES

SOURCE = {"app": "x9-platform", "environment": "test", "service": "trading_service"}


def test_uuid7_is_version_7_and_time_ordered():
    first, second = uuid7(), uuid7()
    assert uuid.UUID(first).version == 7
    assert uuid.UUID(first).variant == uuid.RFC_4122
    assert first[:13] <= second[:13]


def test_utc_timestamp_is_milliseconds_in_utc():
    value = datetime(2026, 10, 26, 15, 4, 5, 678901, tzinfo=timezone(timedelta(hours=5)))
    assert utc_timestamp(value) == "2026-10-26 10:04:05.678"


@pytest.mark.parametrize("fields, message", [
    ({"action": "Trade Closed", "actor_type": "staff"}, "dotted lower-case"),
    ({"action": "trade", "actor_type": "staff"}, "dotted lower-case"),
    ({"action": "trade.closed", "actor_type": "staff", "outcome": "ok"}, "outcome must be"),
    ({"action": "trade.closed"}, "actor_type is required"),
    ({"action": "trade.closed", "actor_type": "staff", "metadata": {"x": "y" * MAX_JSON_BYTES}}, "larger than"),
])
def test_event_row_refuses_a_wrong_event(fields, message):
    with pytest.raises(ValueError, match=message):
        event_row(SOURCE, {}, **fields)


def test_event_row_takes_missing_fields_from_the_context_and_given_fields_win():
    with activity_context(actor_type="account", actor_id="100234", ip="1.2.3.4", origin="web", request_id="r1"):
        row = event_row(SOURCE, current_context(), action="trade.closed", ip="5.6.7.8",
                        target_type="trade", target_id=11450, related=[("account", 100234)],
                        changes={"before": {"sl": 1.1}, "after": {"sl": 1.2}})
    assert row["actor_type"] == "account" and row["actor_id"] == "100234"
    assert row["origin"] == "web" and row["request_id"] == "r1"
    assert row["ip"] == "5.6.7.8"
    assert row["category"] == "trade"
    assert row["target_id"] == "11450" and row["related"] == [["account", "100234"]]
    assert row["changes"] == '{"after":{"sl":1.2},"before":{"sl":1.1}}'
    assert row["service"] == "trading_service"


def test_event_id_given_by_the_caller_is_kept():
    event_id = str(uuid.uuid4())
    assert event_row(SOURCE, {}, action="trade.closed", actor_type="system", event_id=event_id)["id"] == event_id


def test_access_row_reads_who_and_where_from_the_context():
    context = {"actor_type": "staff", "actor_id": "12", "ip": "1.2.3.4", "request_id": "r1"}
    row = access_row(SOURCE, context, method="GET", route="/positions/{ticket}", path="/positions/5",
                     status=200, duration_ms=12)
    assert (row["actor_id"], row["ip"], row["route"], row["status"]) == ("12", "1.2.3.4", "/positions/{ticket}", 200)


def test_activity_context_nests_and_forwards():
    with activity_context(actor_type="system", actor_id="liquidation", request_id="r9"):
        with activity_context(origin="system"):
            assert current_context()["actor_id"] == "liquidation"
            assert forwarded_headers() == {"x-request-id": "r9", "x-actor-type": "system",
                                           "x-actor-id": "liquidation", "x-client-origin": "system"}
    assert current_context() == {}
    with pytest.raises(ValueError, match="unknown context fields"):
        with activity_context(user="x"):
            pass
