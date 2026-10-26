import os
import uuid
import pytest
from activity_hub import prepare_database
from activity_hub.database import get_client

needs_clickhouse = pytest.mark.skipif("CLICKHOUSE_HOST" not in os.environ, reason="no ClickHouse configured")


@pytest.fixture
def settings():
    """A fresh, prepared Hub database for one test, dropped afterwards."""
    values = {
        "host": os.environ["CLICKHOUSE_HOST"],
        "port": int(os.environ["CLICKHOUSE_PORT"]),
        "database": f"hub_test_{uuid.uuid4().hex[:10]}",
        "user": os.environ["CLICKHOUSE_USER"],
        "password": os.environ["CLICKHOUSE_PASSWORD"],
        "admin_user": os.environ["CLICKHOUSE_ADMIN_USER"],
        "admin_password": os.environ["CLICKHOUSE_ADMIN_PASSWORD"],
    }
    prepare_database(values)
    yield values
    admin = get_client(values, admin=True)
    admin.command(f"DROP DATABASE IF EXISTS {values['database']}")
    admin.close()


def admin_command(settings: dict, statement: str) -> None:
    admin = get_client(settings, admin=True, database=settings["database"])
    admin.command(statement, settings={"mutations_sync": 2})
    admin.close()


def count(settings: dict, sql: str, **parameters) -> int:
    client = get_client(settings, database=settings["database"])
    value = client.query(sql, parameters=parameters).result_rows[0][0]
    client.close()
    return value
