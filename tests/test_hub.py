import time
import uuid
from activity_hub import ActivityHub, activity_context
from conftest import needs_clickhouse, count

SOURCE = {"app": "x9-platform", "environment": "test", "service": "trading_service"}


def wait_for(predicate, seconds: float = 15.0) -> bool:
    deadline = time.monotonic() + seconds
    while time.monotonic() < deadline:
        if predicate():
            return True
        time.sleep(0.2)
    return False


@needs_clickhouse
def test_records_events_and_requests_in_the_background(settings, tmp_path):
    hub = ActivityHub(settings, spool_dir=str(tmp_path), **SOURCE)
    with activity_context(actor_type="account", actor_id="100234", ip="1.2.3.4", origin="web"):
        event_id = hub.record_event("trade.closed", target_type="trade", target_id="11450",
                                    related=[("account", "100234")], metadata={"volume": 0.5})
        hub.record_access(method="POST", route="/close-order", path="/close-order", status=200, duration_ms=35)
    assert hub.flush()
    assert count(settings, "SELECT count() FROM events WHERE id = {id:UUID} AND actor_id = '100234' "
                           "AND ip = '1.2.3.4' AND category = 'trade'", id=event_id) == 1
    assert count(settings, "SELECT count() FROM access_logs WHERE route = '/close-order' AND origin = 'web'") == 1
    assert hub.stats()["written"] == 2
    hub.close()


@needs_clickhouse
def test_an_event_recorded_twice_is_stored_once(settings, tmp_path):
    hub = ActivityHub(settings, spool_dir=str(tmp_path), **SOURCE)
    event_id = str(uuid.uuid4())
    hub.record_event("balance.deposited", actor_type="staff", actor_id="12", event_id=event_id)
    hub.flush()
    hub.record_event("balance.deposited", actor_type="staff", actor_id="12", event_id=event_id)
    hub.flush()
    assert count(settings, "SELECT count() FROM events WHERE id = {id:UUID}", id=event_id) == 1
    assert hub.stats()["duplicates"] == 1
    hub.close()


@needs_clickhouse
def test_rows_are_spooled_while_the_database_is_unreachable_and_written_later(settings, tmp_path):
    unreachable = {**settings, "port": 1}
    offline = ActivityHub(unreachable, spool_dir=str(tmp_path), **SOURCE)
    ids = [offline.record_event("user.signed_in", actor_type="account", actor_id=str(n)) for n in range(3)]
    offline.flush()
    assert offline.stats()["spooled"] == 3
    offline.close()
    assert list(tmp_path.glob("*.jsonl"))

    online = ActivityHub(settings, spool_dir=str(tmp_path), **SOURCE)
    assert wait_for(lambda: count(settings, "SELECT count() FROM events WHERE id IN {ids:Array(UUID)}", ids=ids) == 3)
    assert wait_for(lambda: not list(tmp_path.iterdir()))
    online.close()


def test_a_disabled_hub_checks_events_but_writes_nothing(tmp_path):
    hub = ActivityHub({}, enabled=False, spool_dir=str(tmp_path), **SOURCE)
    assert hub.record_event("trade.closed", actor_type="system")
    assert hub.flush() and hub.stats() == {}
    assert not list(tmp_path.iterdir())
