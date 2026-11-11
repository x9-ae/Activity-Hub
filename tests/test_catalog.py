import logging
import pytest
from datetime import datetime, timedelta, timezone
from activity_hub import ActivityHub, ActivityReader, Catalog, activity_context, device
from conftest import needs_clickhouse

CATALOG = Catalog(
    events={
        "trade.opened": {"title": "Trade opened", "says": "Opened {side} {volume} {symbol}[ at {price}][ (#{ticket})]"},
        "trade.modified": {"title": "Trade modified", "says": "Modified #{ticket}[: {changes}]"},
        "balance.added": {"title": {"success": "Balance added", "refused": "Balance add refused"},
                          "says": {"success": "Added {amount} to {on}", "refused": "Refused adding {amount} to {on}"},
                          "importance": "high"},
        "session.opened": {"title": "Session opened", "says": "Session opened", "importance": "low",
                           "importance_for": {"taker": "normal"}},
    },
    entities={"account": "account", "trading_positions": "position"},
    fields={"sl": "stop loss", "tp": "take profit"},
    values={"side": {"1": "BUY", "2": "SELL"}, "level": "{:.2f}"},
    actor_types={"account": "Client"},
    actor_names={"system:liquidation": "Stop-out liquidation"},
)


def event(action, **fields):
    return {"action": action, "outcome": "success", "actor_type": "account", "actor_id": "100234", "actor_name": "",
            "target_type": "", "target_id": "", "target_name": "", "reason": "", "user_agent": "", "related": [],
            "metadata": None, "changes": None, **fields}


def test_a_sentence_names_the_values_and_leaves_out_unknown_optional_parts():
    said = CATALOG.present(event("trade.opened", metadata={"side": "1", "volume": 0.1, "symbol": "EURUSD",
                                                           "price": 1.08321, "ticket": 32101}))
    assert said["summary"] == "Opened BUY 0.1 EURUSD at 1.08321 (#32101)"
    assert said["title"] == "Trade opened" and said["importance"] == "normal"
    assert CATALOG.present(event("trade.opened", metadata={"side": "2", "volume": 1, "symbol": "XAUUSD"}))["summary"] \
        == "Opened SELL 1 XAUUSD"


def test_changes_read_as_before_and_after_and_secrets_by_name_only():
    said = CATALOG.present(event("trade.modified", metadata={"ticket": 7},
                                 changes={"before": {"sl": 1.08, "tp": None, "password": "[masked]"},
                                          "after": {"sl": 1.07, "tp": 1.2, "password": "[masked]"}}))
    assert said["summary"] == "Modified #7: stop loss 1.08 → 1.07, take profit 1.2, password"
    assert said["change_list"][0] == {"field": "sl", "label": "Stop loss", "before": "1.08", "after": "1.07"}
    many = {f"f{n}": n for n in range(5)}
    assert CATALOG.present(event("data.updated", target_type="trading_positions", target_id="9",
                                 changes={"before": many, "after": {k: v + 1 for k, v in many.items()}}))["summary"] \
        == "Updated position 9: f0, f1, f2 and 2 more"


def test_an_outcome_reads_with_its_own_sentence_and_its_reason():
    refused = event("balance.added", outcome="refused", reason="not enough funds", target_type="account",
                    target_id="100234", metadata={"amount": 50})
    said = CATALOG.present(refused)
    assert said["title"] == "Balance add refused"
    assert said["summary"] == "Refused adding 50 to account 100234: not enough funds"
    failed = CATALOG.present(event("trade.opened", outcome="failed", reason="market closed",
                                   metadata={"side": "1", "volume": 1, "symbol": "EURUSD"}))
    assert failed["summary"] == "Opened BUY 1 EURUSD (failed: market closed)"
    assert failed["title"] == "Trade opened: failed"
    assert CATALOG.present(event("user.signed_in", outcome="failed", reason="wrong password", actor_type="visitor",
                                 target_type="account", target_id="5"))["summary"] \
        == "Failed sign-in to account 5: wrong password"


def test_who_acted_reads_as_a_name():
    assert CATALOG.actor({"actor_type": "system", "actor_id": "liquidation"}) == "Stop-out liquidation"
    assert CATALOG.actor({"actor_type": "system", "actor_id": "margin_monitor"}) == "Margin monitor"
    assert CATALOG.actor({"actor_type": "staff", "actor_id": "12", "actor_name": "ops@x9.ae"}) == "ops@x9.ae"
    assert CATALOG.actor({"actor_type": "visitor", "actor_id": ""}) == "Anonymous"
    assert CATALOG.actor_label("account") == "Client" and CATALOG.actor_label("api_key") == "API key"
    assert CATALOG.actor_label("risk_desk") == "Risk desk"


def test_an_unknown_action_still_reads():
    said = CATALOG.present(event("hedge.gap_found", target_type="ticket", target_id="11"))
    assert (said["title"], said["summary"], said["importance"]) == ("Hedge gap found", "Hedge gap found ticket 11",
                                                                    "normal")


def test_device_names_the_browser_and_system():
    chrome = ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) "
              "Chrome/157.0.0.0 Safari/537.36")
    safari = ("Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) "
              "Version/18.0 Mobile/15E148 Safari/604.1")
    assert device(chrome) == "Chrome 157 on macOS"
    assert device(safari) == "Safari 18 on iOS"
    assert device("python-httpx/0.27.2") == "python-httpx 0.27.2"
    assert device("") is None


def test_a_long_value_is_cut_in_the_sentence_only():
    reason = "ConnectionRefusedError: " + "x" * 200
    said = CATALOG.present(event("trade.opened", outcome="failed", reason=reason,
                                 metadata={"side": "1", "volume": 1, "symbol": "EURUSD"}))
    assert said["summary"].endswith("…)") and len(said["summary"]) < 140


def test_values_say_codes_and_format_numbers():
    assert CATALOG.say("level", 49.123456) == "49.12"
    assert CATALOG.say("level", "n/a") == "n/a"
    assert CATALOG.say("side", 2) == "SELL"
    assert CATALOG.say("flags", [True, None, "x"]) == "yes, x"


def test_importance_follows_the_actor_and_the_default_view_rules():
    assert CATALOG.importance("data.updated", "account") == "low"
    assert CATALOG.importance("data.updated", "staff") == "normal"
    always, conditional = CATALOG.low_rules()
    assert "activity.searched" in always
    assert ("data.updated", ["api_key", "staff"], False) in conditional
    assert ("session.opened", ["taker"], False) in conditional
    assert set(CATALOG.foldable()) == {"data.created", "data.updated", "data.deleted"}


def test_a_wrong_entry_is_refused():
    with pytest.raises(ValueError, match="importance"):
        Catalog(events={"x.y": {"importance": "urgent"}})
    with pytest.raises(ValueError, match="unknown keys"):
        Catalog(events={"x.y": {"sentence": "X"}})
    with pytest.raises(ValueError, match="outcomes"):
        Catalog(events={"x.y": {"says": {"ok": "X"}}})


def test_the_hub_reports_each_problem_once(caplog):
    hub = ActivityHub({}, app="a", environment="t", service="s", enabled=False, catalog=CATALOG)
    with caplog.at_level(logging.WARNING, logger="activity_hub"):
        for _ in range(3):
            hub.record_event("hedge.gap_found", actor_type="system", actor_id="x")
            hub.record_event("trade.opened", actor_type="account", actor_id="1", metadata={"side": "1"})
        hub.record_event("trade.opened", actor_type="account", actor_id="1",
                         metadata={"side": "1", "volume": 1, "symbol": "EURUSD"})
    assert [r.getMessage() for r in caplog.records] == [
        "activity hub: hedge.gap_found is not in the catalog; recorded as it is",
        "activity hub: trade.opened has no symbol, volume for its sentence; recorded as it is",
    ]


@pytest.fixture
def reader(settings, tmp_path):
    hub = ActivityHub(settings, spool_dir=str(tmp_path), app="x9", environment="test", service="trading")
    at = datetime(2026, 11, 9, 20, 31, 47, tzinfo=timezone.utc)
    ms = timedelta(milliseconds=1)
    # a client opens a trade: two row changes commit, then the event
    with activity_context(actor_type="account", actor_id="100234", request_id="r1", tenant_id="3"):
        hub.record_event("data.created", target_type="trading_positions", target_id="9", occurred_at=at,
                         related=[("ticket", "32101"), ("account", "100234")])
        hub.record_event("data.updated", target_type="balances", target_id="5", occurred_at=at + ms,
                         related=[("account", "100234")])
        hub.record_event("trade.opened", target_type="ticket", target_id="32101", occurred_at=at + 2 * ms,
                         metadata={"side": "1", "volume": 0.1, "symbol": "EURUSD"})
    # a close-all: two trades closed in one request, each with its position row
    with activity_context(actor_type="staff", actor_id="12", actor_name="ops@x9.ae", request_id="r2", tenant_id="3"):
        for n, ticket in enumerate(("40", "41")):
            moment = at + timedelta(minutes=1, milliseconds=10 * n)
            hub.record_event("data.deleted", target_type="trading_positions", target_id=ticket, occurred_at=moment,
                             related=[("ticket", ticket)])
            hub.record_event("trade.closed", target_type="ticket", target_id=ticket, occurred_at=moment + ms)
    # staff edits a setting: two rows in one request, no event of its own
    with activity_context(actor_type="staff", actor_id="12", request_id="r3", tenant_id="3"):
        hub.record_event("data.updated", target_type="symbols", target_id="EURUSD", occurred_at=at + timedelta(minutes=2),
                         changes={"before": {"digits": 5}, "after": {"digits": 3}})
        hub.record_event("data.updated", target_type="symbol_settings", target_id="EURUSD",
                         occurred_at=at + timedelta(minutes=2, milliseconds=1))
    # another company's row in r1's request id must never be shown to company 3
    hub.record_event("data.updated", actor_type="account", actor_id="9", request_id="r1", tenant_id="4",
                     target_type="balances", target_id="6", occurred_at=at + ms)
    hub.record_event("user.signed_in", actor_type="visitor", actor_id="5", outcome="failed", reason="wrong password",
                     tenant_id="3", target_type="account", target_id="5", occurred_at=at + timedelta(minutes=3))
    hub.record_event("data.updated", actor_type="system", actor_id="scheduler", tenant_id="3", target_type="jobs",
                     target_id="1", occurred_at=at + timedelta(minutes=4))
    hub.flush()
    hub.close()
    reader = ActivityReader(settings, catalog=CATALOG)
    yield reader
    reader.close()


def lines(page):
    return [(item["action"], item["target_id"], [(c["action"], c["target_id"]) for c in item["children"]])
            for item in page["items"]]


@needs_clickhouse
def test_the_important_view_folds_each_requests_changes_under_its_event(reader):
    page = reader.search_events(view="important", tenant_id="3")
    assert lines(page) == [
        ("user.signed_in", "5", []),
        ("data.updated", "EURUSD", [("data.updated", "EURUSD")]),
        ("trade.closed", "41", [("data.deleted", "41")]),
        ("trade.closed", "40", [("data.deleted", "40")]),
        ("trade.opened", "32101", [("data.created", "9"), ("data.updated", "5")]),
    ]
    opened = page["items"][-1]
    assert opened["summary"] == "Opened BUY 0.1 EURUSD"
    assert opened["children"][0]["summary"] == "Created position 9"
    assert [c["tenant_id"] for c in opened["children"]] == ["3", "3"]


@needs_clickhouse
def test_the_all_view_keeps_details_and_still_folds(reader):
    page = reader.search_events(view="all", tenant_id="3")
    assert [item["action"] for item in page["items"]] == [
        "data.updated", "user.signed_in", "data.updated", "trade.closed", "trade.closed", "trade.opened"]
    assert page["items"][0]["importance"] == "low"


@needs_clickhouse
def test_the_problems_view_and_the_plain_search(reader):
    assert [i["action"] for i in reader.search_events(view="problems")["items"]] == ["user.signed_in"]
    plain = reader.search_events(tenant_id="3")["items"]
    assert len(plain) == 11 and "children" not in plain[0] and plain[0]["summary"] == "Updated jobs 1"
    assert reader.count_over_time("events", bucket_minutes=60, view="important", tenant_id="3")[0]["count"] == 8, "records, folded ones too"
    with pytest.raises(ValueError, match="view"):
        reader.search_events(view="everything")


@needs_clickhouse
def test_a_request_split_across_pages_shows_each_change_once_under_its_own_event(reader):
    seen, placed, cursor = [], {}, None
    while True:
        page = reader.search_events(view="all", tenant_id="3", limit=5, cursor=cursor)
        for item in page["items"]:
            seen.append(item["id"])
            for child in item["children"]:
                seen.append(child["id"])
                placed[child["target_id"]] = item["target_id"]
        cursor = page["next_cursor"]
        if not cursor:
            break
    assert len(seen) == len(set(seen)) == 11, "every record once"
    assert placed["40"] == "40" and placed["41"] == "41", "each closed position under its own close"


@needs_clickhouse
def test_a_bulk_request_keeps_its_own_event_however_many_changes_it_made(settings, tmp_path, monkeypatch):
    from activity_hub import reader as reader_module
    monkeypatch.setattr(reader_module, "MAX_PAGE_SIZE", 10)
    monkeypatch.setattr(reader_module, "SHOWN_CHILDREN", 5)
    hub = ActivityHub(settings, spool_dir=str(tmp_path), app="x9", environment="test", service="s")
    at = datetime(2026, 11, 9, 12, tzinfo=timezone.utc)
    with activity_context(actor_type="staff", actor_id="12", request_id="bulk", tenant_id="3"):
        for n in range(30):
            hub.record_event("data.updated", target_type="symbols", target_id=str(n), occurred_at=at + timedelta(milliseconds=n))
        hub.record_event("trade.closed", target_type="ticket", target_id="1", occurred_at=at + timedelta(seconds=1))
    hub.flush()
    hub.close()
    reader = ActivityReader(settings, catalog=CATALOG)
    first = reader.search_events(view="all", tenant_id="3", limit=5)
    assert [i["action"] for i in first["items"]] == ["trade.closed"] and first["items"][0]["children_count"] >= 4
    assert len(first["items"][0]["children"]) <= 5
    rest = reader.search_events(view="all", tenant_id="3", limit=5, cursor=first["next_cursor"])
    assert rest["items"] == [], "the changes are under their event, not listed again"
    reader.close()


def test_a_step_shows_its_key_values_as_chips_and_values_worked_out_from_others():
    catalog = Catalog(events={"trade.partially_closed": {
        "title": "Trade partly closed", "says": "Closed {closed} of #{ticket}[, {left} left]",
        "facts": [["{side}", "{closed}"], ["@", "{price}"], ["SL", "{sl}"], ["Still open", "{left}"]],
        "icon": "scissors", "tone": "amber"}},
        values={"side": {"1": "BUY"}},
        computed={"left": lambda m: round(float(m["volume"]) - float(m["closed"]), 8)})
    said = catalog.present(event("trade.partially_closed", metadata={"side": "1", "closed": "0.2", "volume": "1.0",
                                                                      "price": "2315.99", "ticket": "11623"}))
    assert said["summary"] == "Closed 0.2 of #11623, 0.8 left", "what is left after the close, not before it"
    assert said["facts"] == [{"label": "BUY", "value": "0.2"}, {"label": "@", "value": "2315.99"},
                             {"label": "Still open", "value": "0.8"}], "a chip with no value is left out"
    assert (said["icon"], said["tone"]) == ("scissors", "amber")
    refused = catalog.present(event("trade.partially_closed", outcome="refused", metadata={"closed": "0.2"}))
    assert refused["facts"] == [], "a refused step shows its reason, not values that never applied"
    assert catalog.present(event("trade.partially_closed", metadata={"closed": "x"}))["summary"].startswith("Closed x")
    with pytest.raises(ValueError, match="icon must be one of"):
        Catalog(events={"x.y": {"title": "X", "icon": "rocket"}})
    with pytest.raises(ValueError, match="facts are"):
        Catalog(events={"x.y": {"title": "X", "facts": ["{a}"]}})


def test_related_entities_read_the_same_from_either_driver_shape():
    from activity_hub.records import related_pairs
    assert related_pairs([{"type": "account", "id": "1"}, ("ticket", "2")]) == [["account", "1"], ["ticket", "2"]]
    assert related_pairs(None) == []
