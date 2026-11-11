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
pip install "activity-hub @ https://github.com/x9-ae/Activity-Hub/archive/refs/tags/v0.8.1.tar.gz"
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

An event about a database row passes the row itself, so the call names only the moment:

```python
from activity_hub import diff
from activity_hub.sqlalchemy import snapshot

hub = ActivityHub(settings, ..., related_columns={"account_number": "account", "ticket_number": "ticket"})

trade = snapshot(position)                 # plain values, read before the commit expires them
hub.record_event("trade.closed", about=trade, target_type="ticket", target_id=trade["ticket_number"],
                 metadata={"close_price": 1.0832})
```

- `about` goes into `metadata` (given metadata wins), and every column named in `related_columns`
  relates the event to that entity: the event shows on the account's timeline with no extra code.
- `snapshot(obj, *columns)` reads only values already in memory; it never queries.
- `diff(before, after)` gives the `changes` of two snapshots, or `None` when nothing changed.

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
- uses the application's own request id instead when an outer middleware has already chosen it
  (`scope["state"]["request_id"]`), and then leaves the `X-Request-Id` header to the application, so a
  response carries one id and every record matches it;
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

track_changes(hub, exclude_tables=("noisy_table",),
              related_columns={"account_number": "account", "ticket_number": "ticket"})
```

- Every insert, update and delete made through SQLAlchemy sessions is recorded as `data.created`,
  `data.updated` or `data.deleted`. The table is the target type and the primary key the target id.
- `changes` holds before/after of the changed columns (every column for a create or delete), with
  secrets masked. Values over 64 KB are noted, not kept.
- A change is recorded only after its transaction commits; a rolled-back change never is.
- `related_columns` (defaults to the hub's): a row holding one of these columns is related to that
  entity, so `reader.timeline("account", "100234")` shows its changes too.
- Recording never raises into the application's commit.
- Changes made outside the ORM unit of work (Core statements, bulk `query.update`) are not seen.
- Install with `pip install "activity-hub[sqlalchemy] @ …"`.

## 5. What each action means (catalog)

The application declares its actions once, as plain data. The reader uses this to give every record
a sentence a person reads. The hub uses it to report actions nobody declared.

```python
from activity_hub import Catalog

CATALOG = Catalog(
    events={
        "trade.opened": {"title": "Trade opened", "importance": "normal",
                         "says": "Opened {side} {volume} {symbol}[ at {price}][ (#{ticket})]"},
        "balance.added": {"title": {"success": "Balance added", "refused": "Balance not added"},
                          "says": {"success": "Added {amount} to {on}", "refused": "Refused adding {amount} to {on}"},
                          "importance": "high"},
    },
    entities={"account": "account", "trading_positions": "position record"},
    fields={"sl": "stop loss"},
    values={"side": {"1": "BUY", "2": "SELL"}, "margin_level": "{:.2f}"},
    actor_types={"account": "Client"},
    actor_names={"system:liquidation": "Stop-out"},
)
hub = ActivityHub(settings, ..., catalog=CATALOG)
reader = ActivityReader(settings, catalog=CATALOG)
```

**An event entry has these keys:**
- **`title`:** a short name, or one per outcome.
- **`says`:** the sentence, or one per outcome. A sentence names values in `{braces}`: any field of
  the event or key of its metadata. It can also use these values, which every event has:

  | Value | What it holds |
  |---|---|
  | `{actor}` | who acted |
  | `{on}` | what it was done to ("account 100234") |
  | `{target}` | the kind of thing |
  | `{changed}` | the changed fields' names |
  | `{changes}` | the changes with their before and after values |

  A part in `[brackets]` is said only when every value in it is known. A refusal or failure with no
  sentence of its own is said with its reason.
- **`importance`:** `high` for money and security, `normal` (the default), or `low` for details,
  which are left out of the default view. `importance_for` sets a different importance per actor
  type.
- **`fold`:** marks a side effect of its request, shown inside the request's main event.
- **`facts`:** the key values a timeline shows as chips, each `[label, value]` written like a
  sentence: `[["{side}", "{volume}"], ["@", "{price}"], ["SL", "{sl}"]]`. A chip whose value is not
  known is left out.
- **`icon` and `tone`:** how a timeline marks the step, e.g. `"icon": "scissors", "tone": "amber"`.
  A failed or refused step is always marked as a problem.
- **`computed`** (on the catalog): values worked out from an event's metadata, usable in sentences,
  facts and details, e.g. `{"left_volume": lambda m: float(m["volume"]) - float(m["closed"])}`.

**The other arguments:**
- `entities` names kinds of things.
- `fields` names values.
- `values` says a field's codes or formats its numbers.
- `actor_types` and `actor_names` name who acted.

**The package declares the general actions:**
- sign-in and sign-out, password changes and reset requests;
- `activity.exported` and `activity.searched`;
- `data.created`, `data.updated` and `data.deleted`. These are low importance and folded. Staff and
  API-key changes are normal importance.

An action that is not declared still reads, from its name.

## 6. Read

```python
from activity_hub import ActivityReader

reader = ActivityReader(settings, catalog=CATALOG)
page = reader.search_events(actor_id="12", action="trade.", occurred_from="2026-10-01", limit=50)
page = reader.search_events(view="important", tenant_id="3")   # what a person looks at first
page = reader.search_events(query='actor:12 action:trade.* -result:success "stop loss"')
page = reader.search_events(cursor=page["next_cursor"])    # next page, same filters
reader.timeline("account", "100234")                       # the account and everything related to it
reader.search_access_logs(status_from=400, service="trading_service")
reader.count_over_time("events", bucket_minutes=60, action="user.")   # [{at, count}] for a chart
reader.count_by("requests", "service", status_from=500)   # [{value, count}], e.g. a service picker
for chunk in reader.export_events_csv(tenant_id="3"):      # stream to a download
    ...
```

- Results come newest first. Times are UTC, written `YYYY-MM-DD HH:MM:SS.mmm`.
- **Readable fields.** Every event also carries what a person reads, from the catalog:
  - `title` and `summary` (the sentence);
  - `importance`;
  - `actor` and `actor_label`;
  - `device` ("Chrome 157 on macOS");
  - `change_list`: a list of field, label, before and after.
- **The search language.** `query` works on every read: the lists, the charts, the counts and the
  exports.

  | Term | Matches |
  |---|---|
  | `field:value` | that value |
  | several values of one field | any of them |
  | `-field:value` | everything without that value |
  | `action:trade.*` or `route:/trading/*` | a prefix |
  | `on:account:100234` | an entity's timeline |
  | `status:4xx` | a range of HTTP statuses |
  | any other word, or `"words"` | that text in who, the target, the reason, the IP, the details and the changes |

  The fields are:
  - events: `actor` (id or name), `actor_type`, `action`, `category`, `result`, `on`, `ip`,
    `country`, `app`, `service`, `request`, `session`;
  - API requests: `actor`, `actor_type`, `method`, `route`, `status`, `ip`, `country`, `app`,
    `service`, `request`, `session`.

  An unknown field, or more than 20 terms, is a `ValueError`.
- **Views.** `view` chooses which records are listed:

  | View | Lists |
  |---|---|
  | `None` | every record as stored (the default) |
  | `"all"` | every record |
  | `"important"` | leaves out low-importance records; failures and refusals always stay |
  | `"problems"` | only failures and refusals |

  With any view, each request's row changes are listed under the event that caused them, in
  `children` (the first 100; `children_count` has the number), and not on their own. This includes changes the view itself leaves out. They are read
  in one query per page, under the same app and tenant. A request with no event of its own keeps
  its first change and lists the others under it. The charts and counts take `view` too, and count
  records.
- A timeline (`related=` / `timeline`) reads by `related_keys`, every `type:id` the event concerns
  (target and related), which has its own index: only the blocks holding that key are read.
- Pages hold up to 5000 rows. The cursor stays stable while new rows keep arriving.
- Reading the log is itself worth recording: call `record_event("activity.searched", ...)`.

## 7. Read API (FastAPI)

Every viewer talks to the same routes, so an application only decides who may read what:

```python
from activity_hub.api import activity_router

def can_read(user=Depends(current_user)):          # the application's own sign-in
    if not user.may("activity", "read"):
        raise HTTPException(403)
    return {"filters": {"tenant_id": user.company_id}}   # added to every read; {} for everything

app.include_router(activity_router(get_reader=lambda: reader, authorize=can_read,
                                   authorize_export=can_export, record=hub.record_event,
                                   status=lambda: {"recording": hub.stats()}), prefix="/activity")
```

| Route | Answers |
|---|---|
| `POST /search` | A page of events or API requests, with `view`, `query` (the search language), filters, `action`, a timeline (`related_type` + `related_id`), times and `cursor`. `details: true` adds each event's labelled details. Each event carries its `facts`, `icon` and `tone` |
| `POST /chart` | Counts per period for the same search; the bar widens with the range (15 min, 1 h, 6 h, 1 day) |
| `POST /values` | Each value of one field with its count, for pickers |
| `POST /export` | One export page of up to 5000 rows: the view's records, each a row of its own. Each page is recorded as `activity.exported` |
| `GET /events/{id}` | One event, with the other events and the API calls of the same request |
| `GET /catalog` | Every declared action's title and importance, the actor types and the entity kinds |
| `GET /status` | Until when each table is sealed, whether the caller may run the checks, plus the application's own figures |
| `POST /integrity/verify` | Every record of one UTC day (`{"day": "2026-11-09"}`) checked against its seals: `ok`, the records and seals checked, the problems |
| `GET /integrity/seal/{day}` | The day's proof, to keep outside the database |
| `POST /integrity/check` | A kept proof (`{"record": …}`) compared with the database: catches a rewrite of records and seals together |
| `GET /streams` | The tenant's streams and how each stands; `{"enabled": false}` while the application keeps none |
| `POST /streams` | Saves a stream, or a new version of one (`id`): `name`, `kind`, `query`, `destination`, `target`, `secret`, `secret_headers`, `enabled`, `start`. Secrets are never answered. Recorded as `activity.stream_saved` |
| `DELETE /streams/{id}` | Removes a stream: nothing more is sent. Recorded as `activity.stream_removed` |
| `POST /streams/{id}/test` | Sends one test line to the destination: `{"ok", "error"}` |

- **Saved views:**
  - `GET /views` lists the caller's own views and those shared in their tenant;
  - `POST /views` saves one (`id` updates one of the caller's own);
  - `DELETE /views/{id}` removes one of the caller's own.

  They need `"viewer": {"id", "name"}` in the scope; without it, `GET /views` answers
  `{"enabled": false}`. Views are kept in the Hub's `views` table. They are settings, not records:
  they are not sealed.
- **Customer-facing logs.** The scope can also hold:
  - `"kinds": ["events"]`, which leaves the API access log out (403 for `kind: requests`);
  - `"hide": [...]`, fields taken out of every record answered, at any depth.

  A hidden field cannot be searched either: a filter or search term on it is 400, and so is free
  text while a field it reads (`metadata`, `changes` …) is hidden. Otherwise each search would tell
  its value apart.

  A trader's own log is, for example,
  `{"filters": {"actor_id": "100234"}, "kinds": ["events"], "hide": ["service", "tenant_id", "request_id"]}`.
- **`activity_router` options.** `parts=` mounts only some groups: `search`, `chart`, `values`,
  `export`, `event`, `catalog`, `views`, `integrity`, `status` and `streams`. `respond=` turns every answer
  into the application's own envelope.
- **The integrity checks** cover every tenant's records. A caller whose scope has filters gets
  403. `authorize_checks` decides who else may run them; without it, the export permission does.
- **The scope wins.** A filter in the scope overrides the same filter sent by the caller. It also
  limits the rows folded under an event and the rows an event's detail shows.
- **Errors:**
  - an unknown filter is 422, and a wrong one or a broken cursor is 400;
  - an event outside the scope is 404;
  - a database that does not answer is 503.
- **Install:** `pip install "activity-hub[api] @ …"`.

## 8. Viewer (React, or any page)

The same repository ships the viewer every application shows: the log, an entity's timeline and a
record's detail. It reads the routes above and nothing else.

```bash
npm install "https://github.com/x9-ae/Activity-Hub/archive/refs/tags/v0.8.1.tar.gz"
```

```tsx
import { ActivityLog, ActivityTimeline } from "activity-hub-viewer"
import "activity-hub-viewer/style.css"

// the application's own sign-in and base path (GET, POST and DELETE); reject with an Error a person can read
const request = (path, { method, body }) => apiFetch(`/activity/${path}`, { method, body })

<ActivityLog request={request} canExport presets={[{ label: "Money", search: { filters: { category: ["balance"] } } }]} />
<ActivityTimeline request={request} entity={{ type: "ticket", id: "32101" }} />
```

**What the components do:**
- **`ActivityLog`** (the full page):
  - one search box for the search language: it offers fields, then their values, while typing;
    "Add" buttons write a field in; every term shows as a removable chip;
  - saved views (personal or shared) and a column chooser;
  - the integrity strip, and a seal mark on every row, sealed or waiting for its minute's seal. For
    those allowed, it can check a day, download the day's proof, and check a kept proof.
  - views: Important, All and Problems;
  - the application's presets;
  - filters, with the applied ones shown as chips;
  - time ranges, a chart, live updates, CSV and JSON Lines export, and the integrity strip;
  - a detail panel with the record's changes, details, request, origin and raw JSON.

  To keep its search in the address, pass `params` and `onParamsChange`. For one entity's page,
  pass `entity`.
- **`ActivityTimeline`** (one entity's story, oldest first). Each step shows:
  - its icon, title and time to the millisecond;
  - who did it, as what and from where;
  - its key values as chips, and an edit's before and after;
  - on expand, its details and the record changes behind it, each record's fields one click away.

  The title opens the full detail. Pass `action` and `newestFirst` for a feed such as sign-ins, and
  `header={(events, partial) => …}` for a summary above the steps, made from the same events.
- **`PanelHost`**: inside a modal sheet or dialog, provide an element in it, so the detail panel
  opens there.

**Other pages.** Pages that are not React (Angular, plain HTML) load
`activity-hub-viewer/element`; React is bundled in it, so such a page needs no React of its own. It defines `<activity-log>` and `<activity-timeline>`, with React
and the styles inside a shadow root. Set the element's `request` property. The attributes are:
- `entity-type` and `entity-id`;
- `action` and `newest-first` for a timeline feed;
- `kinds`, `can-export` and `no-status` for the log.

The element runs in the browser only, so a page with a server render imports it there.

**Theming.** Colours follow the page's shadcn variables (`--background`, `--foreground`, `--muted`,
`--muted-foreground`, `--border`, `--primary`, `--radius`). A page with other names sets these on
`.ahv` instead:
- `--activity-bg`, `--activity-fg`, `--activity-muted`, `--activity-subtle`, `--activity-line`;
- `--activity-main`, `--activity-main-fg`;
- `--activity-bad`, `--activity-warn`, `--activity-ok`, `--activity-attention`;
- `--activity-radius`, `--activity-mono-font`.

**Development.** `npm ci`, then:

| Command | Does |
|---|---|
| `npm test` | Runs the viewer tests |
| `npm run build` | Writes `viewer/dist`. Commit it: the release archive is what applications install, and CI fails when it is out of date |

## 9. Integrity

```python
from activity_hub import seal_new_rows, verify, daily_seal, check_daily_seal

seal_new_rows(settings)                 # every minute, from one process
report = verify(settings)               # {"ok": bool, "checked": n, "problems": [...]}
record = daily_seal(settings, date)     # keep outside the database, e.g. object storage
check_daily_seal(settings, record)      # [] while the database still matches it
```

**How sealing works.** Each minute of each table that holds rows is sealed: the row count, and a
SHA-256 over every row in id order. Each seal's hash also covers the previous seal's hash. A minute
with no rows is sealed only on the hour, as a checkpoint: 24 empty seals a day, not 1440, and rows
added to an empty minute later still show.

**What `verify` reports.**
- a row changed or removed after its minute was sealed;
- a seal altered, removed (the chain breaks, or more than an hour passes between seals) or
  duplicated with a different hash;
- rows in a minute with no seal.

**The daily seal record.** Keeping it elsewhere catches even a rewrite of rows and seals together.

## 10. Streams

A stream sends new records to a system the tenant owns, as they are written: a CRM, a SIEM or an
archive bucket. It is set up in the viewer (Streams, next to Export) or through `/streams`.

```python
from activity_hub import StreamStore, deliver_streams

store = StreamStore(settings, key=app_secret)      # secrets are encrypted with a key derived from it
app.include_router(activity_router(..., streams=lambda: store), prefix="/activity")

deliver_streams(settings, key=app_secret)         # every minute, from one process
```

| Destination | Receives |
|---|---|
| Webhook (HTTPS) | `POST` batches of up to 1000 JSON lines (`application/x-ndjson`), with the stream's headers and `X-Activity-Signature: t=<unix time>,v1=<hex HMAC-SHA256 of "t." + body>` keyed by the signing secret |
| S3-compatible (S3, R2, MinIO, Wasabi) | One gzip JSON-lines file per batch at `<folder>/<events or requests>/YYYY/MM/DD/HHMMSS-<first id>.jsonl.gz` |

- **What is sent.** Each line is a record as the viewer reads it (events with their title and
  sentence), with `kind`. A stream sends events, API requests or both, and can be narrowed with
  the search language (`action:trade.* -result:success`). A tenant's stream only ever holds that
  tenant's records; a stream made with no tenant in the scope holds every record.
- **When.** A record goes out once it is past the sealing lag (two minutes), in arrival order. A
  new stream starts from now, or from the beginning of the log.
- **Delivery is at least once.** Each stream keeps where it got to. A failed send is tried again
  after 2, 4, 8 … minutes, never more than an hour, and resumes from the same record: nothing is
  skipped. A batch the receiver accepted just before a failure (a timeout, a lost progress write)
  is sent again, so a receiver drops a line whose `id` it already has.
- **One process.** Run `deliver_streams` every minute from one process only: two at once send
  batches twice. A run starts no new send after 45 seconds, and the streams waiting longest go first.
- **Changing a stream.** A kind added later (events, then both) starts from that moment.
- **Checking a webhook's signature:** recompute the HMAC over `t + "." + body` and compare; refuse a
  `t` more than five minutes old.
- **Safety.**
  - A webhook must be `https` to a public internet address. The address is checked at every send
    and the connection goes to the address checked, so a name cannot be re-pointed in between.
    Redirects and environment proxies are not used.
  - The signing secret, the bucket's keys and the webhook's header values (`secret_headers`, an
    intake key for Datadog or Splunk) are encrypted with the application's key and never answered.
    The access log masks both fields.
  - On an edit, a blank secret or header value keeps the stored one only while the stream goes to
    the same host (or the same bucket and endpoint). Pointing it elsewhere needs them all again.
  - Rotating the application's key means saving each stream's secret again.
- **Who.** `authorize_streams` decides; without it, the export permission does. A stream sends
  whole records of one tenant, so a scope narrower than that gets 403: filters other than
  `tenant_id`, several tenants, any `hide`, or a `kind` its `kinds` leave out.
- **Install:** `pip install "activity-hub[api,streams] @ …"` (cryptography, and boto3 for S3).

## Tests

```bash
pip install -e ".[test]"
pytest
```

The database tests run when these variables point at a ClickHouse: `CLICKHOUSE_HOST`,
`CLICKHOUSE_PORT`, `CLICKHOUSE_USER` and `CLICKHOUSE_PASSWORD` (a login that may create
databases). Each test uses its own database. GitHub Actions runs them against
ClickHouse 24.8 on every push.
