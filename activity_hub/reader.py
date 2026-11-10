import io
import csv
import json
import uuid
import base64
from datetime import date, datetime, timedelta, timezone
from activity_hub.database import get_client
from activity_hub.catalog import Catalog
from activity_hub.integrity import verify, daily_seal, check_daily_seal
from activity_hub import query as search_language
from activity_hub.records import EVENTS_TABLE, ACCESS_TABLE, EVENT_COLUMNS, ACCESS_COLUMNS

MAX_PAGE_SIZE = 5000
# filter name -> (column, ClickHouse type); a value is an exact match, a list matches any of its values
EVENT_FILTERS = {
    "app": ("app", "String"), "environment": ("environment", "String"), "service": ("service", "String"),
    "tenant_id": ("tenant_id", "String"), "category": ("category", "String"), "outcome": ("outcome", "String"),
    "actor_type": ("actor_type", "String"), "actor_id": ("actor_id", "String"),
    "target_type": ("target_type", "String"), "target_id": ("target_id", "String"),
    "origin": ("origin", "String"), "ip": ("ip", "String"), "request_id": ("request_id", "String"),
    "session_id": ("session_id", "String"),
}
# view: None every record as stored; "all" every record, with each request's row changes folded under
# its main event; "important" leaves out the low-importance ones (failures and refusals always show);
# "problems" only failures and refusals
VIEWS = (None, "all", "important", "problems")
# filters that scope who may see what; folded rows are read under them too
SCOPE_FILTERS = ("app", "environment", "tenant_id")
# a request's row changes are committed just before its event is recorded: they are looked for this
# long around the page's events
FOLD_WINDOW = timedelta(minutes=5)
# row changes shown inside one event; children_count has them all
SHOWN_CHILDREN = 100
# saved views: how many one person keeps, and how long a name and a search may be
MAX_VIEWS = 50
MAX_VIEW_NAME = 80
MAX_VIEW_SEARCH = 2000
VIEW_COLUMNS = ("id", "tenant_id", "owner_id", "owner_name", "name", "search", "shared", "removed", "updated_at")
ACCESS_FILTERS = {
    "app": ("app", "String"), "environment": ("environment", "String"), "service": ("service", "String"),
    "tenant_id": ("tenant_id", "String"), "actor_type": ("actor_type", "String"), "actor_id": ("actor_id", "String"),
    "origin": ("origin", "String"), "method": ("method", "String"), "route": ("route", "String"),
    "status": ("status", "UInt16"), "ip": ("ip", "String"), "request_id": ("request_id", "String"),
    "session_id": ("session_id", "String"),
}


def _timestamp(value) -> str:
    if value.tzinfo is not None:
        value = value.astimezone(timezone.utc)
    return value.strftime("%Y-%m-%d %H:%M:%S.") + f"{value.microsecond // 1000:03d}"


def _encode_cursor(row: dict) -> str:
    return base64.urlsafe_b64encode(f"{row['occurred_at']}|{row['id']}".encode()).decode()


def _decode_cursor(cursor: str) -> tuple:
    try:
        occurred_at, row_id = base64.urlsafe_b64decode(cursor.encode()).decode().split("|")
        return _moment(occurred_at, "cursor"), str(uuid.UUID(row_id))
    except ValueError:
        raise ValueError("invalid cursor")


def _moment(value, name: str) -> str:
    """A time for a query, 'YYYY-MM-DD HH:MM:SS.mmm' in UTC, from a datetime or an ISO text; ValueError
    for anything else (it would otherwise reach the database as a failed query)."""
    if isinstance(value, datetime):
        return _timestamp(value if value.tzinfo else value.replace(tzinfo=timezone.utc))
    try:
        return _timestamp(datetime.fromisoformat(str(value).strip().replace(" ", "T")))
    except ValueError:
        raise ValueError(f"{name} must be a date and time, e.g. 2026-11-01 00:00:00")


def _cell(value):
    """A CSV value; text a spreadsheet would run as a formula (a user agent or name can be anything)
    is prefixed so it stays text."""
    if isinstance(value, (dict, list)):
        value = json.dumps(value)
    if isinstance(value, str) and value[:1] in ("=", "+", "-", "@", "\t", "\r"):
        return "'" + value
    return value


class ActivityReader:
    """Searches the Hub. Every method takes filters (a value, or a list of values any of which
    matches) plus a time range, returns newest
    first, and pages with an opaque cursor (stable while new rows keep arriving).

    settings: host, port, database, user, password (the Hub's user only needs SELECT).
    catalog: the application's Catalog; every event comes with what a person reads (title, summary,
    importance, actor, actor_label, device, change_list), and views use its importance and folding.
    Reading the log is itself worth recording: the application calls record_event for it.
    """

    def __init__(self, settings: dict, catalog: Catalog | None = None):
        self._settings = settings
        self._client = get_client(settings, database=settings["database"])
        self.catalog = catalog or Catalog()

    def close(self) -> None:
        self._client.close()

    def search_events(self, *, action: str | None = None, related: tuple | None = None, occurred_from=None,
                      occurred_to=None, limit: int = 50, cursor: str | None = None, view: str | None = None,
                      scope: dict | None = None, query: str | None = None, fold: bool = True, **filters) -> dict:
        """Events matching every filter given (see EVENT_FILTERS). action "trade.closed" matches
        exactly; "trade." matches every trade action. related=("account", "100234") finds events
        whose target or related entities include that account. view: see VIEWS; with a view, an
        event holds the row changes its request made in "children", and those rows are not listed
        on their own (a page can then hold fewer than limit items). scope: the filters that bind those
        folded rows too (the caller's scope); app, environment and tenant_id among the filters when not
        given. query: the search language (activity_hub.query), e.g. 'actor:12 -result:success'.
        fold=False keeps the view's records as rows (an export)."""
        clauses, parameters = self._event_criteria(action, related, occurred_from, occurred_to, filters, view, query)
        page = self._page(EVENTS_TABLE, EVENT_COLUMNS, clauses, parameters, limit, cursor)
        if view and fold:
            bound = scope if scope is not None else {k: v for k, v in filters.items() if k in SCOPE_FILTERS}
            page["items"] = self._fold(page["items"], bound, clauses, parameters)
        for item in page["items"]:
            self._present(item)
        return page

    def count_over_time(self, kind: str, *, bucket_minutes: int, action: str | None = None,
                        related: tuple | None = None, status_from: int | None = None, occurred_from=None,
                        occurred_to=None, view: str | None = None, query: str | None = None, **filters) -> list:
        """[{"at", "count"}] per bucket_minutes, oldest first, for the same criteria as the searches;
        kind "events" or "requests". Buckets with nothing are left out."""
        if kind == "events":
            table = EVENTS_TABLE
            clauses, parameters = self._event_criteria(action, related, occurred_from, occurred_to, filters, view, query)
        else:
            table = ACCESS_TABLE
            clauses, parameters = self._access_criteria(status_from, occurred_from, occurred_to, filters, query)
        where = f"WHERE {' AND '.join(clauses)}" if clauses else ""
        result = self._client.query(
            f"SELECT toStartOfInterval(occurred_at, INTERVAL {{bucket:UInt32}} MINUTE) AS at, count() "
            f"FROM {table} {where} GROUP BY at ORDER BY at",
            parameters={**parameters, "bucket": max(1, int(bucket_minutes))},
        )
        return [{"at": _timestamp(row[0]), "count": row[1]} for row in result.result_rows]

    def count_by(self, kind: str, field: str, *, action: str | None = None, related: tuple | None = None,
                 status_from: int | None = None, occurred_from=None, occurred_to=None, limit: int = 100,
                 view: str | None = None, query: str | None = None, **filters) -> list:
        """[{"value", "count"}] for one filter field, most frequent first, under the same criteria as the
        searches; a filter on the field itself is left out, so every choice stays visible (a facet)."""
        allowed = EVENT_FILTERS if kind == "events" else ACCESS_FILTERS
        if field not in allowed or field == "tenant_id":
            # tenant_id's own filter would be dropped below and count every tenant's rows
            raise ValueError(f"unknown field: {field}")
        filters.pop(field, None)
        if kind == "events":
            table = EVENTS_TABLE
            clauses, parameters = self._event_criteria(action, related, occurred_from, occurred_to, filters, view, query)
        else:
            table = ACCESS_TABLE
            clauses, parameters = self._access_criteria(status_from, occurred_from, occurred_to, filters, query)
        where = f"WHERE {' AND '.join(clauses)}" if clauses else ""
        result = self._client.query(
            f"SELECT {allowed[field][0]} AS value, count() AS n FROM {table} {where} "
            f"GROUP BY value ORDER BY n DESC, value LIMIT {{limit:UInt32}}",
            parameters={**parameters, "limit": max(1, min(int(limit), MAX_PAGE_SIZE))},
        )
        return [{"value": str(row[0]), "count": row[1]} for row in result.result_rows]

    def earliest(self, kind: str, *, action: str | None = None, related: tuple | None = None,
                 status_from: int | None = None, occurred_from=None, occurred_to=None, view: str | None = None,
                 query: str | None = None, **filters) -> str | None:
        """When the first record of a search happened ('YYYY-MM-DD HH:MM:SS.mmm'); None when there is none."""
        if kind == "events":
            table = EVENTS_TABLE
            clauses, parameters = self._event_criteria(action, related, occurred_from, occurred_to, filters, view, query)
        else:
            table = ACCESS_TABLE
            clauses, parameters = self._access_criteria(status_from, occurred_from, occurred_to, filters, query)
        where = f"WHERE {' AND '.join(clauses)}" if clauses else ""
        result = self._client.query(f"SELECT min(occurred_at), count() FROM {table} {where}", parameters=parameters)
        first, rows = result.result_rows[0]
        return _timestamp(first) if rows else None

    def _event_criteria(self, action, related, occurred_from, occurred_to, filters: dict, view=None, query=None) -> tuple:
        if view not in VIEWS:
            raise ValueError(f"view must be one of {VIEWS}: {view!r}")
        clauses, parameters = self._filters(EVENT_FILTERS, filters, occurred_from, occurred_to)
        if view == "problems":
            clauses.append("outcome != 'success'")
        elif view == "important":
            clauses.extend(self._important(parameters))
        if query:
            clauses.extend(search_language.to_sql(query, "events", parameters))
        if action:
            if action.endswith("."):
                clauses.append("startsWith(action, {action:String})")
            else:
                clauses.append("action = {action:String}")
            parameters["action"] = action
        if related:
            # related_keys holds the target too (migration 0006), behind its own index
            clauses.append("has(related_keys, {rel_key:String})")
            parameters["rel_key"] = f"{related[0]}:{related[1]}"
        return clauses, parameters

    def _important(self, parameters: dict) -> list:
        """The clause leaving out low-importance events; a failure or refusal always stays."""
        always, conditional = self.catalog.low_rules()
        low = []
        if always:
            low.append("action IN {low_actions:Array(String)}")
            parameters["low_actions"] = always
        for n, (action, actor_types, low_for_them) in enumerate(conditional):
            low.append(f"(action = {{low_{n}:String}} AND actor_type {'' if low_for_them else 'NOT '}"
                       f"IN {{low_{n}_actors:Array(String)}})")
            parameters[f"low_{n}"] = action
            parameters[f"low_{n}_actors"] = actor_types
        return [f"(outcome != 'success' OR NOT ({' OR '.join(low)}))"] if low else []

    def _fold(self, items: list, scope: dict, clauses: list, parameters: dict) -> list:
        """The page with each request's row changes (foldable actions) inside the event that caused them.
        Every record of the page's requests is read in one query, so a change sits under its own event
        even when the event, or the change, is on another page; it is listed there, never twice. A
        request whose events this search does not list keeps its first change here, holding the others.
        clauses and parameters: the page's search, which says which records it lists."""
        foldable = set(self.catalog.foldable())
        for item in items:
            item["children"] = []
        on_page = {item["id"]: item for item in items}
        requests = {item["request_id"] for item in items if item["request_id"]}
        if not requests or not foldable:
            return items
        family = {}
        for row in self._family(requests, items, scope, clauses, parameters):
            family.setdefault(row["request_id"], []).append(on_page.get(row["id"], row))
        for item in items:   # a page row the bounded read left out still belongs to its request
            rows = family.setdefault(item["request_id"], []) if item["request_id"] else None
            if rows is not None and item not in rows:
                item["listed"] = True
                rows.append(item)
        folded = set()
        for request_id, rows in family.items():
            events = [row for row in rows if row["action"] not in foldable and (row["id"] in on_page or row.get("listed"))]
            changes = [row for row in rows if row["action"] in foldable]
            if events:
                for change in changes:
                    owner = self._parent_of(change, events)
                    if owner["id"] in on_page:
                        owner["children"].append(change)
                    if change["id"] in on_page:
                        folded.add(change["id"])
                continue
            here = [item for item in items if item["request_id"] == request_id and item["action"] in foldable]
            for change in here[1:]:
                here[0]["children"].append(change)
                folded.add(change["id"])
        for item in items:
            item.pop("listed", None)
            item["children"].sort(key=lambda child: (child["occurred_at"], child["id"]))
            # a bulk request's thousands of changes: the first are shown, all are counted
            item["children_count"] = len(item["children"])
            item["children"] = item["children"][:SHOWN_CHILDREN]
            for child in item["children"]:
                child.pop("listed", None)
                self._present(child)
        return [item for item in items if item["id"] not in folded]

    def _family(self, requests: set, items: list, scope: dict, clauses: list, parameters: dict) -> list:
        """Every record of these requests the caller may see, each marked with whether the page's
        search lists it ("listed")."""
        times = [datetime.strptime(item["occurred_at"], "%Y-%m-%d %H:%M:%S.%f") for item in items]
        # the scope under names of its own: the page's search keeps its parameters for "listed"
        where, bound = self._filters(EVENT_FILTERS, {f"fam_{k}": v for k, v in scope.items()}, None, None,
                                     names={f"fam_{k}": EVENT_FILTERS[k] for k in scope if k in EVENT_FILTERS})
        where += ["occurred_at >= {fam_from:DateTime64(3, 'UTC')}", "occurred_at <= {fam_to:DateTime64(3, 'UTC')}",
                  "request_id IN {fam_requests:Array(String)}"]
        listed = " AND ".join(clauses) or "1"
        # every event first, so a bulk request's own event is never cut off by the limit
        result = self._client.query(
            f"SELECT {', '.join(('received_at', *EVENT_COLUMNS))}, ({listed}) AS listed FROM {EVENTS_TABLE} "
            f"WHERE {' AND '.join(where)} ORDER BY has({{fam_fold:Array(String)}}, action), occurred_at, id "
            f"LIMIT {MAX_PAGE_SIZE}",
            parameters={**parameters, **bound, "fam_from": _timestamp(min(times) - FOLD_WINDOW),
                        "fam_to": _timestamp(max(times) + FOLD_WINDOW), "fam_requests": sorted(requests),
                        "fam_fold": sorted(self.catalog.foldable())})
        rows = []
        for values in result.result_rows:
            row = dict(zip(result.column_names, values))
            row["listed"] = bool(row["listed"])
            rows.append(self._item(row))
        return rows

    @staticmethod
    def _parent_of(child: dict, candidates: list) -> dict:
        """The event a row change belongs to: the one about the same entity, else the first recorded
        after it (a change commits before its event is recorded), else the request's last event."""
        keys = {f"{child['target_type']}:{child['target_id']}", *(f"{kind}:{key}" for kind, key in child["related"])}
        ordered = sorted(candidates, key=lambda p: (p["occurred_at"], p["id"]))
        return (next((p for p in ordered if f"{p['target_type']}:{p['target_id']}" in keys), None)
                or next((p for p in ordered if p["occurred_at"] >= child["occurred_at"]), None)
                or ordered[-1])

    def _present(self, item: dict) -> None:
        item.update(self.catalog.present(item))

    def timeline(self, target_type: str, target_id: str, *, limit: int = 50, cursor: str | None = None,
                 **filters) -> dict:
        """Everything that happened to one entity: as the target, or as a related entity
        (an account's timeline includes its trades)."""
        return self.search_events(related=(target_type, target_id), limit=limit, cursor=cursor, **filters)

    def get_event(self, event_id: str) -> dict | None:
        """One event by its id; ValueError for something that is not an event id."""
        event_id = str(uuid.UUID(str(event_id)))
        page = self._page(EVENTS_TABLE, EVENT_COLUMNS, ["id = {event_id:UUID}"], {"event_id": event_id}, 1, None)
        if not page["items"]:
            return None
        self._present(page["items"][0])
        return page["items"][0]

    def verify_day(self, day: date) -> dict:
        """Every record of a UTC day checked against its seals (activity_hub.integrity.verify)."""
        start = datetime(day.year, day.month, day.day, tzinfo=timezone.utc)
        return verify(self._settings, window_from=start, window_to=start + timedelta(days=1))

    def day_seal(self, day: date) -> dict:
        """The day's proof: the last seal of each table up to its end, to keep outside the database."""
        return daily_seal(self._settings, day)

    def check_day_seal(self, record: dict) -> list:
        """The differences between a kept proof and the seals in the database; [] while they match."""
        return check_daily_seal(self._settings, record)

    def sealed_until(self) -> dict:
        """{table: 'YYYY-MM-DD HH:MM'}: the newest sealed minute of each table."""
        rows = self._client.query("SELECT table_name, max(window_start) FROM seals GROUP BY table_name").result_rows
        return {table: f"{until:%Y-%m-%d %H:%M}" for table, until in rows}

    def saved_views(self, tenant_id: str, owner_id: str) -> list:
        """The views a person may use: their own and those shared in their tenant, by name."""
        result = self._client.query(
            "SELECT id, owner_id, owner_name, name, search, shared, updated_at FROM views FINAL "
            "WHERE tenant_id = {tenant:String} AND removed = 0 AND (owner_id = {owner:String} OR shared = 1) "
            "ORDER BY lower(name) LIMIT {limit:UInt32}",
            parameters={"tenant": tenant_id, "owner": owner_id, "limit": MAX_VIEWS * 10})
        return [{"id": str(row[0]), "owner_id": row[1], "owner_name": row[2], "name": row[3], "search": row[4],
                 "shared": bool(row[5]), "mine": row[1] == owner_id, "updated_at": _timestamp(row[6])}
                for row in result.result_rows]

    def _own_views(self, tenant_id: str, owner_id: str) -> list:
        result = self._client.query(
            "SELECT id, owner_name, name, search, shared FROM views FINAL "
            "WHERE tenant_id = {tenant:String} AND owner_id = {owner:String} AND removed = 0",
            parameters={"tenant": tenant_id, "owner": owner_id})
        return [{"id": str(r[0]), "owner_name": r[1], "name": r[2], "search": r[3], "shared": bool(r[4])}
                for r in result.result_rows]

    def save_view(self, tenant_id: str, owner_id: str, owner_name: str, name: str, search: str, shared: bool,
                  view_id: str | None = None) -> dict:
        """Saves a new view, or a new version of one of the person's own; ValueError otherwise."""
        name, search = name.strip(), search.strip()
        if not name or len(name) > MAX_VIEW_NAME or len(search) > MAX_VIEW_SEARCH:
            raise ValueError(f"a view needs a name of up to {MAX_VIEW_NAME} characters and a search of up to {MAX_VIEW_SEARCH}")
        own = self._own_views(tenant_id, owner_id)
        if view_id:
            view_id = str(uuid.UUID(str(view_id)))
            if not any(v["id"] == view_id for v in own):
                raise ValueError("only your own views can be changed")
        elif len(own) >= MAX_VIEWS:
            raise ValueError(f"you can keep up to {MAX_VIEWS} views; remove one first")
        row = [uuid.UUID(view_id) if view_id else uuid.uuid4(), tenant_id, owner_id, owner_name, name, search,
               int(shared), 0, datetime.now(timezone.utc)]
        self._client.insert("views", [row], column_names=VIEW_COLUMNS)
        return {"id": str(row[0]), "owner_id": owner_id, "owner_name": owner_name, "name": name, "search": search,
                "shared": bool(shared), "mine": True, "updated_at": _timestamp(row[8])}

    def remove_view(self, tenant_id: str, owner_id: str, view_id: str) -> bool:
        """Removes one of the person's own views; False when it is not theirs or not there."""
        view_id = str(uuid.UUID(str(view_id)))
        view = next((v for v in self._own_views(tenant_id, owner_id) if v["id"] == view_id), None)
        if view is None:
            return False
        self._client.insert("views", [[uuid.UUID(view_id), tenant_id, owner_id, view["owner_name"], view["name"],
                                       view["search"], int(view["shared"]), 1, datetime.now(timezone.utc)]],
                            column_names=VIEW_COLUMNS)
        return True

    def search_access_logs(self, *, occurred_from=None, occurred_to=None, status_from: int | None = None,
                           limit: int = 50, cursor: str | None = None, query: str | None = None, **filters) -> dict:
        """API requests matching every filter given (see ACCESS_FILTERS); status_from=400 finds errors."""
        clauses, parameters = self._access_criteria(status_from, occurred_from, occurred_to, filters, query)
        return self._page(ACCESS_TABLE, ACCESS_COLUMNS, clauses, parameters, limit, cursor)

    def _access_criteria(self, status_from, occurred_from, occurred_to, filters: dict, query=None) -> tuple:
        clauses, parameters = self._filters(ACCESS_FILTERS, filters, occurred_from, occurred_to)
        if status_from is not None:
            clauses.append("status >= {status_from:UInt16}")
            parameters["status_from"] = status_from
        if query:
            clauses.extend(search_language.to_sql(query, "requests", parameters))
        return clauses, parameters

    def export_events_csv(self, **search):
        """CSV lines (header first) of every event matching the search, for streaming to a download."""
        yield from self._export(lambda **criteria: self.search_events(fold=False, **criteria), EVENT_COLUMNS, search)

    def export_access_logs_csv(self, **search):
        yield from self._export(self.search_access_logs, ACCESS_COLUMNS, search)

    def _export(self, search, columns: tuple, criteria: dict):
        criteria.pop("limit", None)
        criteria.pop("cursor", None)
        buffer = io.StringIO()
        writer = csv.writer(buffer)
        writer.writerow(columns)
        cursor = None
        while True:
            page = search(limit=MAX_PAGE_SIZE, cursor=cursor, **criteria)
            for item in page["items"]:
                writer.writerow([_cell(item[c]) for c in columns])
            yield buffer.getvalue()
            buffer.seek(0)
            buffer.truncate()
            cursor = page["next_cursor"]
            if not cursor:
                return

    @staticmethod
    def _filters(allowed: dict, filters: dict, occurred_from, occurred_to, names: dict | None = None) -> tuple:
        allowed = names or allowed
        unknown = set(filters) - set(allowed)
        if unknown:
            raise ValueError(f"unknown filters: {sorted(unknown)}")
        clauses, parameters = [], {}
        for name, value in filters.items():
            if value is None or value == "" or value == []:
                continue
            column, kind = allowed[name]
            if isinstance(value, (list, tuple)):
                clauses.append(f"{column} IN {{{name}:Array({kind})}}")
                parameters[name] = list(value)
            else:
                clauses.append(f"{column} = {{{name}:{kind}}}")
                parameters[name] = value
        if occurred_from:
            clauses.append("occurred_at >= {occurred_from:DateTime64(3, 'UTC')}")
            parameters["occurred_from"] = _moment(occurred_from, "occurred_from")
        if occurred_to:
            clauses.append("occurred_at < {occurred_to:DateTime64(3, 'UTC')}")
            parameters["occurred_to"] = _moment(occurred_to, "occurred_to")
        return clauses, parameters

    def _page(self, table: str, columns: tuple, clauses: list, parameters: dict, limit: int, cursor) -> dict:
        limit = max(1, min(int(limit), MAX_PAGE_SIZE))
        if cursor:
            occurred_at, row_id = _decode_cursor(cursor)
            # the plain bound lets ClickHouse skip the partitions and granules past the cursor
            clauses = [*clauses, "occurred_at <= {cursor_at:DateTime64(3, 'UTC')}",
                       "(occurred_at, id) < ({cursor_at:DateTime64(3, 'UTC')}, {cursor_id:UUID})"]
            parameters = {**parameters, "cursor_at": occurred_at, "cursor_id": row_id}
        where = f"WHERE {' AND '.join(clauses)}" if clauses else ""
        selected = ", ".join(("received_at", *columns))
        result = self._client.query(
            f"SELECT {selected} FROM {table} {where} ORDER BY occurred_at DESC, id DESC LIMIT {{limit:UInt32}}",
            parameters={**parameters, "limit": limit + 1},
        )
        items = [self._item(dict(zip(result.column_names, row))) for row in result.result_rows]
        has_more = len(items) > limit
        items = items[:limit]
        return {"items": items, "next_cursor": _encode_cursor(items[-1]) if has_more else None}

    @staticmethod
    def _item(row: dict) -> dict:
        row["id"] = str(row["id"])
        for key in ("occurred_at", "received_at"):
            row[key] = _timestamp(row[key])
        if row.get("request_body"):
            row["request_body"] = json.loads(row["request_body"])
        if "related" in row:
            row["related"] = [list(pair) for pair in row["related"]]
            for key in ("changes", "metadata"):
                row[key] = json.loads(row[key]) if row[key] else None
            row["imported"] = bool(row["imported"])
        return row
