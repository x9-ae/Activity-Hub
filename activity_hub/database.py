import clickhouse_connect

# a stuck server must not hold a request or the writer for clickhouse-connect's default 300 s
CONNECT_TIMEOUT_SECONDS = 5
QUERY_TIMEOUT_SECONDS = 30


def get_client(settings: dict, admin: bool = False, database: str | None = None):
    """A ClickHouse client as the Hub's user, or as the admin login when admin is set.
    Without a session id the client can run queries from several threads at once."""
    return clickhouse_connect.get_client(
        host=settings["host"],
        port=settings["port"],
        username=settings["admin_user"] if admin else settings["user"],
        password=settings["admin_password"] if admin else settings["password"],
        database=database or "",
        autogenerate_session_id=False,
        connect_timeout=CONNECT_TIMEOUT_SECONDS,
        send_receive_timeout=QUERY_TIMEOUT_SECONDS,
    )
