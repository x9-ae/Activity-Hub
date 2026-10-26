import uuid
import pytest
from activity_hub import prepare_database, create_append_only_user
from activity_hub.database import get_client
from activity_hub.schema import split_statements, run_migrations
from conftest import needs_clickhouse


def test_split_statements_drops_comments_and_blanks():
    sql = "-- a comment\nCREATE TABLE a (x UInt8) ENGINE = Memory;\n\n-- another\nCREATE TABLE b (y UInt8) ENGINE = Memory;\n"
    assert split_statements(sql) == [
        "CREATE TABLE a (x UInt8) ENGINE = Memory",
        "CREATE TABLE b (y UInt8) ENGINE = Memory",
    ]


@pytest.mark.parametrize("name", ["hub; DROP DATABASE x", "1hub", "hub-db", ""])
def test_prepare_database_refuses_names_that_are_not_identifiers(name):
    with pytest.raises(ValueError, match="not a valid ClickHouse name"):
        prepare_database({"database": name, "user": "activity_hub", "password": "x"})


@needs_clickhouse
def test_an_optional_append_only_login_can_read_and_add_but_never_change(settings):
    prepare_database(settings)
    assert run_migrations(settings) == []
    create_append_only_user(settings, "hub_writer", "a'quoted\\password")
    create_append_only_user(settings, "hub_writer", "another-password")

    client = get_client({**settings, "user": "hub_writer", "password": "another-password"},
                        database=settings["database"])
    event_id = str(uuid.uuid4())
    client.insert("events", [[event_id, "test"]], column_names=["id", "app"])
    row = client.query("SELECT count(), max(received_at) > now64(3) - 60 FROM events WHERE id = {id:UUID}",
                       parameters={"id": event_id}).result_rows[0]
    assert row == (1, True), "the server stamps received_at"

    for statement in (
        "ALTER TABLE events DELETE WHERE 1",
        "ALTER TABLE events UPDATE app = 'x' WHERE 1",
        "TRUNCATE TABLE events",
        "DROP TABLE access_logs",
        "ALTER TABLE seals DELETE WHERE 1",
    ):
        with pytest.raises(Exception, match="ACCESS_DENIED|Not enough privileges"):
            client.command(statement)
    client.close()
