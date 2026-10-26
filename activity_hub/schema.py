import re
from pathlib import Path
from activity_hub.database import get_client
from activity_hub.logger import logger

MIGRATIONS_DIR = Path(__file__).resolve().parent / "migrations"
# the Hub's user may read and add rows, never change or remove them
HUB_USER_GRANTS = "SELECT, INSERT"
IDENTIFIER = re.compile(r"^[A-Za-z_][A-Za-z0-9_]{0,63}$")


def sql_string(value: str) -> str:
    return "'" + value.replace("\\", "\\\\").replace("'", "\\'") + "'"


def split_statements(sql: str) -> list:
    """The statements of a migration file: comment lines dropped, split on ';'."""
    code = "\n".join(line for line in sql.splitlines() if not line.strip().startswith("--"))
    return [statement.strip() for statement in code.split(";") if statement.strip()]


def create_database_and_user(settings: dict) -> None:
    database, user = settings["database"], settings["user"]
    # both are written into DDL, which takes no bound parameters
    for name in (database, user):
        if not IDENTIFIER.match(name):
            raise ValueError(f"not a valid ClickHouse name: {name!r}")
    password = sql_string(settings["password"])
    client = get_client(settings, admin=True)
    try:
        client.command(f"CREATE DATABASE IF NOT EXISTS {database}")
        client.command(f"CREATE USER IF NOT EXISTS {user} IDENTIFIED WITH sha256_password BY {password}")
        # keeps the stored password in step with the settings when it is changed
        client.command(f"ALTER USER {user} IDENTIFIED WITH sha256_password BY {password}")
        client.command(f"GRANT {HUB_USER_GRANTS} ON {database}.* TO {user}")
    finally:
        client.close()


def run_migrations(settings: dict) -> list:
    """Applies the migration files not applied yet, in name order; returns their names.
    Statements are written to be re-runnable, so a file stopped halfway is simply run again."""
    client = get_client(settings, admin=True, database=settings["database"])
    try:
        client.command(
            "CREATE TABLE IF NOT EXISTS schema_migrations "
            "(version String, applied_at DateTime64(3, 'UTC') DEFAULT now64(3)) "
            "ENGINE = MergeTree ORDER BY version"
        )
        applied = {row[0] for row in client.query("SELECT version FROM schema_migrations").result_rows}
        pending = [path for path in sorted(MIGRATIONS_DIR.glob("*.sql")) if path.stem not in applied]
        for path in pending:
            for statement in split_statements(path.read_text()):
                client.command(statement)
            client.insert("schema_migrations", [[path.stem]], column_names=["version"])
            logger.info(f"activity hub migration applied: {path.stem}")
        return [path.stem for path in pending]
    finally:
        client.close()


def prepare_database(settings: dict) -> None:
    """Creates the database, the Hub's append-only user and the tables. Safe to call on every
    start; settings: host, port, database, user, password, admin_user, admin_password."""
    create_database_and_user(settings)
    run_migrations(settings)
