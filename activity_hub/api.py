"""The activity log's read API for FastAPI applications, the one every viewer talks to.

    from activity_hub.api import activity_router

    app.include_router(activity_router(get_reader=lambda: reader, authorize=can_read,
                                       authorize_export=can_export, record=hub.record_event),
                       prefix="/activity")

authorize and authorize_export are FastAPI dependencies (they may take the application's own, such
as the signed-in user) that refuse with an HTTPException or return the caller's scope:
- "filters": exact filters added to every read, e.g. {"tenant_id": "3"} for a company's staff or
  {"actor_type": "account", "actor_id": "100234"} for a client's own log. A filter in the scope wins
  over the same filter sent by the caller, and binds the rows folded under an event too.
- "viewer" (optional): {"id", "name"} of the person, for saved views; without it there are none.
- "kinds" (optional): what the caller may read, ["events"] to leave the API access log out (a client).
- "hide" (optional): fields taken out of every record answered, e.g. ["service", "tenant_id",
  "request_id"] for someone outside the company running it.

get_reader returns the ActivityReader, or None while the application has no Hub (answered 503). It is
called off the event loop: making it may connect. record (optional) records each export page as
activity.exported. status (optional) adds the application's own figures to /status.

Every route answers JSON; a wrong filter or cursor is 400, a database that does not answer 503.
Install with `pip install "activity-hub[api] @ …"`.
"""
import threading
from datetime import date, datetime, timedelta, timezone
from typing import Literal, Optional, Union
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field, field_validator
from starlette.concurrency import run_in_threadpool
from activity_hub.logger import logger
from activity_hub.reader import MAX_PAGE_SIZE, EVENT_FILTERS, ACCESS_FILTERS, MAX_VIEW_NAME, MAX_VIEW_SEARCH
from activity_hub.query import MAX_QUERY_LENGTH
from activity_hub import query as search_language

# rows one list page may ask for; an export reads MAX_PAGE_SIZE per page
MAX_LIST_SIZE = 500
# fields whose values the viewer may list with their counts (a facet); never tenant_id
VALUE_FIELDS = ("service", "origin", "actor_type", "category", "outcome", "target_type", "method", "app")
# the chart's range when none is given, and its bar width by range: (up to days, minutes per bar)
CHART_DEFAULT_DAYS = 7
CHART_BUCKETS = ((1, 15), (7, 60), (31, 360))
CHART_DAILY_MINUTES = 1440
# events and API requests of one request shown with an event
SAME_REQUEST_LIMIT = 200
NOT_SET = "The activity log is not set up on this server"
UNREACHABLE = "The activity log could not be read; try again shortly"
NOT_FOUND = "No such event"
KINDS = ("events", "requests")
# the groups of routes a router may mount, and the handler each route belongs to
PARTS = ("search", "chart", "values", "export", "event", "catalog", "views", "integrity", "status", "streams")
ROUTE_PART = {"search_log": "search", "chart": "chart", "values": "values", "export": "export", "event_detail": "event",
              "catalog": "catalog", "views": "views", "save_view": "views", "remove_view": "views",
              "verify_day": "integrity", "day_seal": "integrity", "check_proof": "integrity",
              "integrity_allowed": "integrity", "log_status": "status", "list_streams": "streams", "save_stream": "streams",
              "remove_stream": "streams", "test_stream": "streams"}
NO_VIEWS = "Saved views are not available here"
NO_STREAMS = "Streams are not set up on this server"
EARLIEST_DAY = date(2000, 1, 1)
# a kept proof names each table's last seal: a few, never thousands
MAX_PROOF_SEALS = 50
CHECKS_WHOLE_LOG = "Integrity checks cover every company's records: ask a platform administrator"
# problems of a check answered in full; the rest are counted
SHOWN_PROBLEMS = 100


class Search(BaseModel):
    """A search of the log. kind "events" is the audit trail, "requests" the API access log.
    filters: exact values, or a list for any of several, e.g. {"actor_id": "12", "category": ["trade", "order"]}.
    action (events): "trade.closed" exactly, or "trade." for every trade action.
    related_type + related_id (events): one entity's timeline, e.g. account 100234 with its trades.
    view (events): "important", "all" or "problems"; each request's row changes come inside its event.
    status_from (requests): e.g. 400 for failed requests. Times are UTC.
    query: the search language (activity_hub.query), e.g. 'actor:12 action:trade.* -result:success'."""
    kind: Literal["events", "requests"] = "events"
    filters: dict[str, Union[str, int, list[str]]] = Field(default_factory=dict)
    action: Optional[str] = None
    related_type: Optional[str] = None
    related_id: Optional[str] = None
    view: Optional[Literal["all", "important", "problems"]] = None
    status_from: Optional[int] = None
    query: Optional[str] = Field(None, max_length=MAX_QUERY_LENGTH)
    # events only: each also carries its metadata labelled, as its detail does
    details: bool = False
    occurred_from: Optional[str] = None
    occurred_to: Optional[str] = None
    cursor: Optional[str] = None
    limit: int = Field(50, ge=1, le=MAX_LIST_SIZE)

    @field_validator("filters")
    @classmethod
    def known_filters(cls, value: dict) -> dict:
        # a filter named like the page arguments (limit, cursor) must never reach them
        unknown = set(value) - set(EVENT_FILTERS) - set(ACCESS_FILTERS)
        if unknown:
            raise ValueError(f"unknown filters: {', '.join(sorted(unknown))}")
        return value


def _past_day(value: date) -> date:
    if not EARLIEST_DAY <= value <= datetime.now(timezone.utc).date():
        raise ValueError(f"the day must be between {EARLIEST_DAY} and today")
    return value


class Day(BaseModel):
    """A UTC day to check, e.g. 2026-11-09."""
    day: date

    @field_validator("day")
    @classmethod
    def a_past_day(cls, value: date) -> date:
        return _past_day(value)


class Proof(BaseModel):
    """A kept proof (GET /integrity/seal/{day}) to compare with the database."""
    record: dict

    @field_validator("record")
    @classmethod
    def is_a_seal_record(cls, value: dict) -> dict:
        seals = value.get("seals")

        def a_seal(seal) -> bool:
            if not isinstance(seal, dict) or not all(isinstance(seal.get(k), str) for k in ("table", "window_start", "hash")):
                return False
            try:
                datetime.strptime(seal["window_start"], "%Y-%m-%d %H:%M:%S")
            except ValueError:
                return False
            return True
        if not isinstance(seals, list) or not 0 < len(seals) <= MAX_PROOF_SEALS or not all(a_seal(seal) for seal in seals):
            raise ValueError("not a seal record (activity-seal-<day>.json): it holds seals [{table, window_start, hash}]")
        return value


class StreamIn(BaseModel):
    """A stream to save (activity_hub.streams). secret: the webhook's signing secret, or the bucket's
    {"access_key", "secret_key"}; secret_headers: the webhook's own headers, {name: value}. Left blank
    on an update, the stored secret and header values are kept while the stream still goes to the
    same address. start: "now" sends records from now on, "beginning" everything kept too (a new
    stream only). Both secret fields are masked in the access log."""
    id: Optional[str] = None
    name: str = Field(min_length=1, max_length=80)
    kind: Literal["events", "requests", "both"] = "events"
    query: str = Field("", max_length=MAX_QUERY_LENGTH)
    destination: Literal["webhook", "s3"]
    target: dict = Field(default_factory=dict)
    secret: Optional[Union[str, dict]] = None
    secret_headers: dict[str, str] = Field(default_factory=dict)
    enabled: bool = True
    start: Literal["now", "beginning"] = "now"


class SavedView(BaseModel):
    """A view to save: its name, the viewer's search (the address's query string) and whether everyone
    in the tenant sees it. id: a view of one's own to replace."""
    id: Optional[str] = None
    name: str = Field(min_length=1, max_length=MAX_VIEW_NAME)
    search: str = Field("", max_length=MAX_VIEW_SEARCH)
    shared: bool = False


class Values(Search):
    """The values one field takes under the rest of the search, with how many records have each."""
    field: Literal[VALUE_FIELDS]


def _scope_filters(scope) -> dict:
    return dict((scope or {}).get("filters") or {})


def _refuse_hidden(search: Search, scope) -> None:
    """A field the scope hides is not searched either: each search would tell its value apart."""
    hide = set((scope or {}).get("hide") or ())
    if not hide:
        return
    hidden = sorted(hide & set(search.filters))
    # the search's own arguments, by the fields they read
    asked = {"action": search.action, "status": search.status_from,
             "outcome": search.view in ("problems", "important") or None,
             "target_id": search.related_id, "target_type": search.related_type, "related": search.related_id}
    hidden += [field for field, value in asked.items() if value is not None and field in hide]
    for field, _value, _negated in search_language.parse(search.query or "", search.kind):
        if field is None and hide & set(search_language.TEXT_COLUMNS[search.kind]):
            raise ValueError("free-text search is not available here: search by field, e.g. action:trade.*")
        column = search_language.FIELDS[search.kind].get(field)
        if column and hide & ({"actor_id", "actor_name"} if column == "actor" else {column}):
            hidden.append(field)
    if hidden:
        raise ValueError(f"not searchable here: {', '.join(sorted(set(hidden)))}")


def _criteria(search: Search, scope) -> dict:
    """The reader's arguments for a search under the caller's scope (the scope's filters win)."""
    _refuse_hidden(search, scope)
    forced = _scope_filters(scope)
    criteria = {**search.filters, **forced, "occurred_from": search.occurred_from, "occurred_to": search.occurred_to,
                "query": search.query}
    if search.kind == "requests":
        return {**criteria, "status_from": search.status_from}
    if bool(search.related_type) != bool(search.related_id):
        # half an entity would otherwise widen to the whole log
        raise ValueError("related_type and related_id go together")
    related = (search.related_type, search.related_id) if search.related_type else None
    return {**criteria, "action": search.action, "related": related, "view": search.view, "scope": forced or None}


def _moment(value: str) -> datetime:
    parsed = datetime.fromisoformat(value.strip().replace(" ", "T"))
    return parsed.replace(tzinfo=None) if parsed.tzinfo is None else parsed.astimezone(timezone.utc).replace(tzinfo=None)


def _chart_range(search: Search, first: str | None = None) -> tuple:
    """The chart's period: the search's, else from its first record (or the last CHART_DEFAULT_DAYS) to now."""
    end = _moment(search.occurred_to) if search.occurred_to else datetime.now(timezone.utc).replace(tzinfo=None)
    start = (_moment(search.occurred_from) if search.occurred_from else _moment(first).replace(minute=0, second=0, microsecond=0)
             if first else end - timedelta(days=CHART_DEFAULT_DAYS))
    days = (end - start).total_seconds() / 86400
    bucket = next((minutes for limit, minutes in CHART_BUCKETS if days <= limit), CHART_DAILY_MINUTES)
    return start, end, bucket


def _allowed(scope, kind: str) -> None:
    if kind not in ((scope or {}).get("kinds") or KINDS):
        raise HTTPException(status_code=403, detail=f"The {kind} of the log are not available here")


def _hidden(scope, value):
    """The answer without the fields the scope hides, at any depth (children, the same request)."""
    hide = set((scope or {}).get("hide") or ())
    if not hide:
        return value
    if "metadata" in hide:
        hide.add("details")   # the labelled metadata
    if "request_body" in hide or "changes" in hide:
        hide.add("change_list")

    def strip(item):
        if isinstance(item, list):
            return [strip(x) for x in item]
        if isinstance(item, dict):
            return {k: strip(v) for k, v in item.items() if k not in hide}
        return item
    return strip(value)


def _within(row: dict, forced: dict) -> bool:
    """Whether a record falls inside the caller's scope filters."""
    for key, value in forced.items():
        allowed = [str(v) for v in value] if isinstance(value, (list, tuple)) else [str(value)]
        if str(row.get(key, "")) not in allowed:
            return False
    return True


def _owner(scope) -> tuple:
    """(tenant, person) whose saved views these are; None while the scope names no person."""
    viewer = (scope or {}).get("viewer") or {}
    if not viewer.get("id"):
        return None
    tenant = _scope_filters(scope).get("tenant_id") or ""
    return (str(tenant[0] if isinstance(tenant, (list, tuple)) else tenant), str(viewer["id"]),
            str(viewer.get("name") or viewer["id"]))


def activity_router(*, get_reader, authorize, authorize_export=None, authorize_checks=None, record=None,
                    status=None, parts=PARTS, respond=None, authorize_streams=None, streams=None) -> APIRouter:
    """The read routes: POST /search, /chart, /values, /export; GET /events/{id}, /catalog, /status;
    saved views at GET/POST /views and DELETE /views/{id}; integrity checks at POST /integrity/verify,
    GET /integrity/seal/{day} and POST /integrity/check. authorize_checks (the export permission when
    not given) lets a caller run the checks, which cover every tenant's records, so a scoped caller never
    may. parts: which groups of routes to mount (see PARTS), e.g. a partner API without views or checks.
    respond: turns every successful answer into the application's own response, e.g. its envelope
    {"status": true, "data": ...}; errors stay HTTPExceptions for its own handlers.
    streams: a callable returning the StreamStore (activity_hub.streams), or None while the
    application has none; authorize_streams (the export permission when not given) lets a caller
    manage its tenant's streams.
    See the module's description."""
    respond = respond or (lambda payload: payload)
    unknown = set(parts) - set(PARTS)
    if unknown:
        raise ValueError(f"unknown parts {sorted(unknown)}: use {', '.join(PARTS)}")
    router = APIRouter(tags=["Activity"])
    authorize_export = authorize_export or authorize
    authorize_checks = authorize_checks or authorize_export
    authorize_streams = authorize_streams or authorize_export

    def whole_log(scope) -> None:
        if _scope_filters(scope):
            raise HTTPException(status_code=403, detail=CHECKS_WHOLE_LOG)

    # a check recomputes a whole day of records: one at a time per process
    checking = threading.Lock()

    async def read(work):
        def run():
            reader = get_reader()
            return None if reader is None else work(reader)
        try:
            result = await run_in_threadpool(run)
        except ValueError as e:   # an unknown filter, view or field, or a damaged cursor
            raise HTTPException(status_code=400, detail=str(e))
        except Exception as e:
            logger.error(f"activity hub: reading failed: {e}")
            raise HTTPException(status_code=503, detail=UNREACHABLE)
        if result is None:
            raise HTTPException(status_code=503, detail=NOT_SET)
        return result

    def page(reader, search: Search, scope, limit: int, fold: bool = True) -> dict:
        criteria = _criteria(search, scope)
        if search.kind == "requests":
            return reader.search_access_logs(cursor=search.cursor, limit=limit, **criteria)
        return reader.search_events(cursor=search.cursor, limit=limit, fold=fold, details=search.details, **criteria)

    @router.post("/search")
    async def search_log(search: Search, scope=Depends(authorize)):
        """One page of events or API requests, newest first; next_cursor fetches the next."""
        _allowed(scope, search.kind)
        return respond(_hidden(scope, await read(lambda reader: page(reader, search, scope, search.limit))))

    @router.post("/chart")
    async def chart(search: Search, scope=Depends(authorize)):
        """How many records match per period (bucket_minutes, widening with the range), oldest first;
        periods with nothing are left out."""
        _allowed(scope, search.kind)
        def count(reader):
            first = None
            if not search.occurred_from:   # all time: from the search's first record
                criteria = _criteria(search, scope)
                criteria.pop("scope", None)
                first = reader.earliest(search.kind, **criteria)
            try:
                start, end, bucket = _chart_range(search, first)
            except ValueError:
                raise ValueError("occurred_from and occurred_to must be dates, e.g. 2026-11-01 00:00:00")
            occurred_from = search.occurred_from or f"{start:%Y-%m-%d %H:%M:%S}"
            occurred_to = search.occurred_to or f"{end:%Y-%m-%d %H:%M:%S}"
            criteria = _criteria(search.model_copy(update={"occurred_from": occurred_from, "occurred_to": occurred_to}), scope)
            criteria.pop("scope", None)
            buckets = reader.count_over_time(search.kind, bucket_minutes=bucket, **criteria)
            return {"bucket_minutes": bucket, "occurred_from": occurred_from, "occurred_to": occurred_to,
                    "buckets": buckets}
        return respond(await read(count))

    @router.post("/values")
    async def values(search: Values, scope=Depends(authorize)):
        """Each value of one field with its count, most frequent first; the field's own filter is left
        out so every choice stays visible."""
        _allowed(scope, search.kind)
        if search.field in _scope_filters(scope) or search.field in ((scope or {}).get("hide") or ()):
            return respond({"values": []})

        def values_of(reader):
            criteria = _criteria(search, scope)
            criteria.pop("scope", None)
            return {"values": reader.count_by(search.kind, search.field, **criteria)}
        return respond(await read(values_of))

    @router.post("/export")
    async def export(search: Search, scope=Depends(authorize_export)):
        """One page of an export (up to MAX_PAGE_SIZE rows); the viewer asks for the next until
        next_cursor is empty. Every page taken is recorded, so an export started from a made-up cursor
        is on record too."""
        # the view's records, each a row of its own
        _allowed(scope, search.kind)
        result = _hidden(scope, await read(lambda reader: page(reader, search, scope, MAX_PAGE_SIZE, fold=False)))
        if record is not None:
            try:
                record("activity.exported", target_type=search.kind,
                       metadata={**search.model_dump(exclude={"cursor", "limit"}), "rows": len(result["items"]),
                                 "continued": bool(search.cursor)})
            except Exception as e:
                logger.error(f"activity hub: export not recorded: {e}")
        return respond(result)

    @router.get("/events/{event_id}")
    async def event_detail(event_id: str, scope=Depends(authorize)):
        """One event as a person reads it, with everything else recorded while serving the same
        request: its other events and its API calls, oldest first."""
        forced = _scope_filters(scope)

        def detail(reader):
            event = reader.get_event(event_id)
            if event is None or not _within(event, forced):
                return {"event": None}
            same, calls = [], []
            if event["request_id"]:
                same = reader.search_events(request_id=event["request_id"], limit=SAME_REQUEST_LIMIT, **forced)["items"]
                if "requests" in ((scope or {}).get("kinds") or KINDS):
                    # a scope key the access log lacks would be dropped and read wider: then no calls
                    if set(forced) <= set(ACCESS_FILTERS):
                        calls = reader.search_access_logs(request_id=event["request_id"], limit=SAME_REQUEST_LIMIT,
                                                          **forced)["items"]
            event["details"] = reader.catalog.details(event)
            same = sorted((item for item in same if item["id"] != event["id"]), key=lambda item: item["occurred_at"])
            return {"event": event, "same_request": same, "requests": sorted(calls, key=lambda item: item["occurred_at"])}
        try:
            result = await read(detail)
        except HTTPException as e:
            if e.status_code == 400:   # not an event id at all
                raise HTTPException(status_code=404, detail=NOT_FOUND)
            raise
        if result["event"] is None:
            raise HTTPException(status_code=404, detail=NOT_FOUND)
        return respond(_hidden(scope, result))

    @router.get("/catalog")
    async def catalog(scope=Depends(authorize)):
        """What the viewer needs to name things: every declared action with its title and importance,
        the actor types and entity kinds, and the views."""
        def describe(reader):
            known = reader.catalog
            # a scope held to some categories is told of their actions only
            categories = _scope_filters(scope).get("category")
            categories = None if categories is None else {categories} if isinstance(categories, str) else set(categories)
            return {"views": ["important", "all", "problems"],
                    "actions": {action: {"title": known.title(action), "importance": known.importance(action),
                                         "category": action.split(".", 1)[0]} for action in sorted(known.events)
                                if categories is None or action.split(".", 1)[0] in categories},
                    "actor_types": known.actor_types, "entities": known.entities}
        return respond(await read(describe))

    @router.get("/views")
    async def views(scope=Depends(authorize)):
        """The caller's saved views and those shared in their tenant; enabled is false while the
        application names no person in the scope."""
        owner = _owner(scope)
        if owner is None:
            return respond({"enabled": False, "views": []})
        return respond(await read(lambda reader: {"enabled": True, "views": reader.saved_views(owner[0], owner[1])}))

    @router.post("/views")
    async def save_view(view: SavedView, scope=Depends(authorize)):
        """Saves a view, or a new version of one of the caller's own."""
        owner = _owner(scope)
        if owner is None:
            raise HTTPException(status_code=403, detail=NO_VIEWS)
        return respond(await read(lambda reader: reader.save_view(owner[0], owner[1], owner[2], view.name, view.search,
                                                                  view.shared, view.id)))

    @router.delete("/views/{view_id}")
    async def remove_view(view_id: str, scope=Depends(authorize)):
        owner = _owner(scope)
        if owner is None:
            raise HTTPException(status_code=403, detail=NO_VIEWS)
        removed = await read(lambda reader: {"removed": reader.remove_view(owner[0], owner[1], view_id)})
        if not removed["removed"]:
            raise HTTPException(status_code=404, detail="No such view of yours")
        return respond(removed)

    @router.post("/integrity/verify")
    async def verify_day(day: Day, scope=Depends(authorize_checks)):
        """Every record of a UTC day recomputed against its seals, and the chain between them."""
        whole_log(scope)

        def check(reader):
            # held by the thread doing the work: a request cancelled midway must not free it early
            if not checking.acquire(blocking=False):
                return None
            try:
                return reader.verify_day(day.day)
            finally:
                checking.release()
        report = await read(lambda reader: check(reader) or {"busy": True})
        if report.get("busy"):
            raise HTTPException(status_code=409, detail="A check is already running; try again when it ends")
        return respond({"day": day.day.isoformat(), "ok": report["ok"], "checked": report["checked"], "rows": report["rows"],
                        "problems": report["problems"][:SHOWN_PROBLEMS],
                        "more": max(0, len(report["problems"]) - SHOWN_PROBLEMS)})

    @router.get("/integrity/seal/{day}")
    async def day_seal(day: date, scope=Depends(authorize_checks)):
        """The day's proof, once the day is over, to keep outside the database: checking it later shows
        any rewrite since."""
        whole_log(scope)
        if not EARLIEST_DAY <= day < datetime.now(timezone.utc).date():
            raise HTTPException(status_code=400, detail="A day's proof exists once the day is over")
        record = await read(lambda reader: reader.day_seal(day))
        if not record["seals"]:
            raise HTTPException(status_code=404, detail="Nothing was sealed up to that day")
        return respond(record)

    @router.get("/integrity")
    async def integrity_allowed(scope=Depends(authorize_checks)):
        """Whether the caller may run the checks (403 when not): the viewer offers them only then."""
        whole_log(scope)
        return respond({"allowed": True})

    @router.post("/integrity/check")
    async def check_proof(proof: Proof, scope=Depends(authorize_checks)):
        """A kept proof compared with the seals in the database."""
        whole_log(scope)
        mismatches = await read(lambda reader: {"mismatches": reader.check_day_seal(proof.record)})
        return respond({"ok": not mismatches["mismatches"], **mismatches})

    def stream_tenant(scope, kind: str | None = None) -> str:
        """A stream sends whole records of one tenant: a caller held to anything narrower (an actor, some
        hidden fields, one kind of record, several tenants) sets none up."""
        forced = _scope_filters(scope)
        tenant = forced.get("tenant_id") or ""
        if isinstance(tenant, (list, tuple)):
            tenant = tenant[0] if len(tenant) == 1 else None
        if set(forced) - {"tenant_id"} or tenant is None or (scope or {}).get("hide"):
            raise HTTPException(status_code=403, detail="Streams are set up for a whole company")
        allowed = (scope or {}).get("kinds") or KINDS
        if kind and not set({"both": KINDS}.get(kind, (kind,))) <= set(allowed):
            raise HTTPException(status_code=403, detail=f"The {kind} of the log are not available here")
        return str(tenant)

    def note(action: str, **fields) -> None:
        if record is not None:
            try:
                record(action, **fields)
            except Exception as e:
                logger.error(f"activity hub: {action} not recorded: {e}")

    async def with_streams(work):
        store = streams() if streams else None
        if store is None:
            raise HTTPException(status_code=404, detail=NO_STREAMS)
        try:
            return await run_in_threadpool(work, store)
        except ValueError as e:
            raise HTTPException(status_code=400, detail=str(e))
        except Exception as e:
            logger.error(f"activity hub: streams failed: {e}")
            raise HTTPException(status_code=503, detail=UNREACHABLE)

    @router.get("/streams")
    async def list_streams(scope=Depends(authorize_streams)):
        """The company's streams and how each stands (active, failing or paused, what it last
        delivered); enabled is false while the application keeps no streams."""
        tenant = stream_tenant(scope)
        if not streams or streams() is None:
            return respond({"enabled": False, "streams": []})
        return respond({"enabled": True, "streams": await with_streams(lambda store: store.list(tenant))})

    @router.post("/streams")
    async def save_stream(stream: StreamIn, scope=Depends(authorize_streams)):
        """Saves a stream, or a new version of one of the company's own; its secret is never answered."""
        tenant = stream_tenant(scope, stream.kind)
        viewer = (scope or {}).get("viewer") or {}
        saved = await with_streams(lambda store: store.save(
            tenant, name=stream.name, kind=stream.kind, destination=stream.destination, target=stream.target,
            secret=stream.secret, headers=stream.secret_headers, query=stream.query, enabled=stream.enabled,
            start=stream.start, stream_id=stream.id, created_by=str(viewer.get("name") or viewer.get("id") or "")))
        place = saved["target"].get("url") or f"s3://{saved['target'].get('bucket', '')}/{saved['target'].get('prefix', '')}"
        note("activity.stream_saved", tenant_id=tenant or None, target_type="stream", target_id=saved["id"], target_name=saved["name"],
             metadata={"stream": saved["name"], "kind": saved["kind"], "destination": place.rstrip("/"),
                       "query": saved["query"], "enabled": saved["enabled"], "start": stream.start if not stream.id else None})
        return respond(saved)

    @router.delete("/streams/{stream_id}")
    async def remove_stream(stream_id: str, scope=Depends(authorize_streams)):
        tenant = stream_tenant(scope)
        if not await with_streams(lambda store: store.remove(tenant, stream_id)):
            raise HTTPException(status_code=404, detail="No such stream")
        note("activity.stream_removed", tenant_id=tenant or None, target_type="stream", target_id=stream_id, metadata={"stream": stream_id})
        return respond({"removed": True})

    @router.post("/streams/{stream_id}/test")
    async def test_stream(stream_id: str, scope=Depends(authorize_streams)):
        """Sends one test line to the stream's destination."""
        tenant = stream_tenant(scope)
        return respond(await with_streams(lambda store: store.test(tenant, stream_id)))

    @router.get("/status")
    async def log_status(scope=Depends(authorize)):
        """Until when each table is sealed, whether this caller may run the integrity checks, plus the
        application's own figures (status callback)."""
        result = await read(lambda reader: {"sealed_until": reader.sealed_until(),
                                            "checks": "integrity" in parts and not _scope_filters(scope)})
        if status is not None:
            try:
                result.update(status() or {})
            except Exception as e:
                logger.error(f"activity hub: status figures failed: {e}")
        return respond(result)

    router.routes = [route for route in router.routes if ROUTE_PART.get(getattr(route, "name", "")) in parts]
    return router
