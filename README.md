# Activity Hub

A Python package that keeps a permanent, tamper-evident record of what happens in an application,
stored in ClickHouse.

- **Audit events:** who did what, to what, when, from where, and with what result.
- **Access log:** every API request: who, which endpoint, the result, the time taken, the IP.

The application installs the package and nothing else runs. Recording never slows a request down
or makes it fail. Nothing is ever updated or deleted, and sealed records show any change made
behind the package's back.

## Install

```bash
pip install "activity-hub @ https://github.com/x9-ae/Activity-Hub/archive/refs/tags/v0.3.2.tar.gz"
```

(The release archive needs no git on the machine installing it.)

Python 3.11+, ClickHouse 24.8+.

## Settings

The application passes a dict. Where it keeps the values is up to the application.

| Key | Purpose |
|---|---|
| `host`, `port` | The application's ClickHouse server, HTTP port (usually 8123) |
| `user`, `password` | The application's ClickHouse login |
| `database` | The Hub's own database on that server, created if missing |

The Hub needs no server or login of its own; it keeps its records in their own database.

## 1. Prepare the database

Run once at start-up, from one place; it is safe on every start:

```python
from activity_hub import prepare_database

prepare_database(settings)
```

It creates the database and the tables, and applies new migrations. Migrations only ever add
tables or columns, so an older version of the package keeps working on a newer schema.

Optional: `create_append_only_user(settings, "hub_writer", password)` creates a login that may only
read and add records in the Hub's database. An application that writes with it cannot change
history even by mistake.

## 2. Record

One `ActivityHub` per process, created after any fork:

```python
from activity_hub import ActivityHub

hub = ActivityHub(settings, app="x9-platform", environment="production", service="trading_service",
                  spool_dir="/var/lib/myapp/activity-spool")

hub.record_event(
    "trade.closed",                        # dotted name; the first part ("trade") is the category
    target_type="trade", target_id="11450",
    related=[("account", "100234"), ("symbol", "EURUSD")],
    changes={"before": {"sl": 1.10}, "after": {"sl": 1.12}},
    metadata={"volume": 0.5, "price": 1.0832},
    outcome="success",                     # or "refused" / "failed", with reason="..."
)
```

`record_event` returns the event id. Every field is listed in its docstring.

- Who acted, from which IP and app, and in which request: taken from the current request (see 3)
  when not passed.
- `event_id` makes a call idempotent: the same id recorded again within a day is stored once.
- A wrong event (bad action name, no actor, oversized metadata) raises `ValueError`. Problems
  with the database never raise.

Rows are written in the background, in batches of up to 200 or every second, as ClickHouse async
inserts that wait until stored (the server merges every writer's inserts into few parts). If ClickHouse cannot
be reached, they go to spool files in `spool_dir` and are written later, by this process or any
other one sharing the directory. Nothing is lost and nothing is stored twice.

- `hub.flush()` waits until everything recorded so far is stored.
- `hub.stats()` returns counters for monitoring: queued, written, duplicates, spooled, replayed,
  write_errors.
- `hub.close()` runs at exit.
- `ActivityHub(..., enabled=False)` checks events but stores nothing.

## 3. Web requests (FastAPI, Starlette, any ASGI app)

```python
from activity_hub import ActivityMiddleware, set_actor

app.add_middleware(ActivityMiddleware, hub=hub)

# in the authentication dependency, once the caller is known:
set_actor("staff", user["id"], actor_name=user["email"], tenant_id=user["company_id"], session_id=token_id)
```

For each request the middleware:
- reads the client IP (Cloudflare's `CF-Connecting-IP`), country (`CF-IPCountry`), user agent, app
  (`X-Client-Origin`) and request id (`X-Request-Id`, created when missing and returned on the
  response);
- makes them available to every `record_event` during the request;
- writes one access-log row with the route template (`/positions/{ticket}`), status and duration;
- for a request that changes something (POST, PUT, PATCH, DELETE) with a JSON body, also keeps what
  was sent, with every password, token, secret or key masked at any depth. Every change is on
  record this way, with no code per feature. Bodies over 32 KB are noted, not kept.

Query strings, responses and non-JSON bodies are never stored.

| Option | Use |
|---|---|
| `ip_headers` | Headers holding the client IP, trusted in order. Default: Cloudflare's only. Behind another proxy, name the header it sets. Never trust a header the caller can write. |
| `skip_paths` | Paths not logged (health checks, metrics, docs by default) |
| `skip_request(headers)` | Requests left out of the access log, e.g. calls between your own services |
| `trust_forwarded(headers)` | Requests whose `X-Actor-*` / `X-Client-*` headers are believed, e.g. internal calls carrying your service key |

Calling another of your services on behalf of the same user: add `forwarded_headers()` to the
outgoing request, so it records the same actor and request id. Values are percent-encoded (a
header carries ASCII only, a name or user agent need not) and decoded by the receiving middleware.

Outside a request, e.g. in a background job:

```python
from activity_hub import activity_context

with activity_context(actor_type="system", actor_id="liquidation", origin="system"):
    hub.record_event("trade.liquidated", target_type="trade", target_id="11450", reason="stop out at 20%")
```

## 4. Every database change (SQLAlchemy)

```python
from activity_hub.sqlalchemy import track_changes

track_changes(hub, exclude_tables=("noisy_table",))
```

- Every insert, update and delete made through SQLAlchemy sessions is recorded as `data.created`,
  `data.updated` or `data.deleted`. The table is the target type and the primary key the target id.
- `changes` holds before/after of the changed columns (every column for a create or delete), with
  secrets masked. Values over 64 KB are noted, not kept.
- A change is recorded only after its transaction commits; a rolled-back change never is.
- Recording never raises into the application's commit.
- Changes made outside the ORM unit of work (Core statements, bulk `query.update`) are not seen.
- Install with `pip install "activity-hub[sqlalchemy] @ …"`.

## 5. Read

```python
from activity_hub import ActivityReader

reader = ActivityReader(settings)
page = reader.search_events(actor_id="12", action="trade.", occurred_from="2026-10-01", limit=50)
page = reader.search_events(cursor=page["next_cursor"])    # next page, same filters
reader.timeline("account", "100234")                       # the account and everything related to it
reader.search_access_logs(status_from=400, service="trading_service")
reader.count_over_time("events", bucket_minutes=60, action="user.")   # [{at, count}] for a chart
reader.count_by("requests", "service", status_from=500)   # [{value, count}], e.g. a service picker
for chunk in reader.export_events_csv(tenant_id="3"):      # stream to a download
    ...
```

- Results come newest first. Times are UTC, written `YYYY-MM-DD HH:MM:SS.mmm`.
- Pages hold up to 5000 rows. The cursor stays stable while new rows keep arriving.
- Reading the log is itself worth recording: call `record_event("activity.searched", ...)`.

## 6. Integrity

```python
from activity_hub import seal_new_rows, verify, daily_seal, check_daily_seal

seal_new_rows(settings)                 # every minute, from one process
report = verify(settings)               # {"ok": bool, "checked": n, "problems": [...]}
record = daily_seal(settings, date)     # keep outside the database, e.g. object storage
check_daily_seal(settings, record)      # [] while the database still matches it
```

**How sealing works.** Each minute of each table is sealed: the row count, and a SHA-256 over
every row in id order. Each seal's hash also covers the previous seal's hash.

**What `verify` reports.**
- a row changed or removed after its minute was sealed;
- a seal altered, removed or duplicated;
- rows in a minute with no seal.

**The daily seal record.** Keeping it elsewhere catches even a rewrite of rows and seals together.

## Tests

```bash
pip install -e ".[test]"
pytest
```

The database tests run when these variables point at a ClickHouse: `CLICKHOUSE_HOST`,
`CLICKHOUSE_PORT`, `CLICKHOUSE_USER` and `CLICKHOUSE_PASSWORD` (a login that may create
databases). Each test uses its own database. GitHub Actions runs them against
ClickHouse 24.8 on every push.
