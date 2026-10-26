import clickhouse_connect

# a stuck server must not hold a request or the writer for clickhouse-connect's default 300 s
CONNECT_TIMEOUT_SECONDS = 5
QUERY_TIMEOUT_SECONDS = 30


def get_client(settings: dict, database: str | None = None):
    """A ClickHouse client with the application's login (settings: host, port, user, password).
    Without a session id the client can run queries from several threads at once."""
    return clickhouse_connect.get_client(
        host=settings["host"],
        port=settings["port"],
        username=settings["user"],
        password=settings["password"],
        database=database or "",
        autogenerate_session_id=False,
        connect_timeout=CONNECT_TIMEOUT_SECONDS,
        send_receive_timeout=QUERY_TIMEOUT_SECONDS,
    )
