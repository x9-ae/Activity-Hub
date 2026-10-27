"""Every insert, update and delete made through SQLAlchemy sessions, recorded with before/after.

    from activity_hub.sqlalchemy import track_changes
    track_changes(hub)

Records data.created / data.updated / data.deleted with the table as target type and the primary key
as target id; changes holds the changed columns (all columns for a create or delete), with secrets
masked. related_columns names columns that point at an entity, e.g. {"account_number": "account"}:
a row holding one is related to that entity, so the change shows on its timeline. A "table.column"
key applies to that table only and wins over the plain column; None there relates nothing. A change is recorded only once its transaction commits; a rolled-back one never is.
Statements that bypass the ORM unit of work (Core, or bulk query.update / query.delete) are not seen.

hub: anything with record_event(action, **fields). Outside a request no actor is known, so pass an
object that supplies one (or open activity_context) for background work.
"""
import json
from sqlalchemy import event, inspect
from sqlalchemy.orm import Session
from activity_hub.logger import logger
from activity_hub.records import mask_secrets, MAX_JSON_BYTES

PENDING_KEY = "activity_hub_changes"
# a before-value the session never loaded (the row was expired by an earlier commit and written
# without being read): unknown, which is not the same as empty
NOT_LOADED = "[not loaded]"
ACTION_CREATED = "data.created"
ACTION_UPDATED = "data.updated"
ACTION_DELETED = "data.deleted"

_tracked = []


def _columns_of(table: str, related_columns: dict) -> dict:
    """The related columns for one table: "table.column" entries override the plain "column" ones
    there (None: that table's column names no entity, e.g. a deal number beside position tickets)."""
    columns = {key: entity for key, entity in related_columns.items() if "." not in key}
    prefix = f"{table}."
    columns.update({key[len(prefix):]: entity for key, entity in related_columns.items() if key.startswith(prefix)})
    return columns


def _change(obj, action: str, related_columns: dict) -> dict | None:
    state = inspect(obj)
    mapper = state.mapper
    table = mapper.local_table.name
    if action == ACTION_UPDATED:
        before, after = {}, {}
        for column in mapper.column_attrs:
            history = state.attrs[column.key].history
            if history.has_changes():
                before[column.key] = history.deleted[0] if history.deleted else NOT_LOADED
                after[column.key] = history.added[0] if history.added else None
        if not after:
            return None
        changes = {"before": before, "after": after}
    else:
        # state.dict: the values already in memory, read without loading anything
        values = {column.key: state.dict.get(column.key) for column in mapper.column_attrs}
        changes = {"after": values} if action == ACTION_CREATED else {"before": values}
    changes = mask_secrets(changes)
    if len(json.dumps(changes, default=str)) > MAX_JSON_BYTES:
        changes = {"not_kept": f"the changed values are over {MAX_JSON_BYTES} bytes"}
    related = [(entity, str(state.dict[column])) for column, entity in _columns_of(table, related_columns).items()
               if entity and state.dict.get(column) not in (None, "")]
    return {
        "action": action,
        "target_type": table,
        "target_id": ":".join(str(value) for value in mapper.primary_key_from_instance(obj)),
        "changes": changes,
        **({"related": related} if related else {}),
    }


def snapshot(obj, *columns) -> dict:
    """A mapped object's column values as plain data (all columns, or the ones named), for
    record_event(about=...). Only values already in memory are read, so it never queries; take it
    before a commit, which expires them (and before a delete, after which the row is gone)."""
    values = inspect(obj).dict
    keys = columns or [column.key for column in inspect(obj).mapper.column_attrs]
    return {key: values[key] for key in keys if key in values}


def track_changes(hub, *, exclude_tables=(), session_class=Session, related_columns=None) -> None:
    """Starts recording ORM changes for every session of session_class (all sessions by default).
    related_columns defaults to the hub's own. Safe to call more than once; recording never raises
    into the application's commit."""
    if session_class in _tracked:
        return
    _tracked.append(session_class)
    excluded = set(exclude_tables)
    if related_columns is None:
        related_columns = getattr(hub, "related_columns", None)
    related_columns = dict(related_columns or {})

    # Pending changes per open transaction: the outermost one, then one per savepoint. A released
    # savepoint hands its changes to the one around it, a rolled-back one drops them, and only the
    # outermost commit records anything (SQLAlchemy reports a savepoint's release and rollback as
    # after_commit / after_rollback too).
    def stack(session) -> list:
        return session.info.setdefault(PENDING_KEY, [{"changes": [], "released": False}])

    @event.listens_for(session_class, "after_transaction_create")
    def open_savepoint(session, transaction):
        if transaction.nested:
            stack(session).append({"changes": [], "released": False})

    @event.listens_for(session_class, "after_transaction_end")
    def close_savepoint(session, transaction):
        pending = session.info.get(PENDING_KEY)
        if transaction.nested and pending and len(pending) > 1:
            closed = pending.pop()
            if closed["released"]:
                pending[-1]["changes"].extend(closed["changes"])

    @event.listens_for(session_class, "after_flush")
    def collect(session, flush_context):
        # after the flush: primary keys are assigned and each attribute's history is still there
        pending = stack(session)[-1]["changes"]
        for objects, action in ((session.new, ACTION_CREATED), (session.dirty, ACTION_UPDATED),
                                (session.deleted, ACTION_DELETED)):
            for obj in objects:
                try:
                    if inspect(obj).mapper.local_table.name in excluded:
                        continue
                    change = _change(obj, action, related_columns)
                    if change:
                        pending.append(change)
                except Exception:
                    logger.exception("activity hub: a data change could not be read")

    @event.listens_for(session_class, "after_commit")
    def record(session):
        if session.in_nested_transaction():
            stack(session)[-1]["released"] = True
            return
        for change in [change for level in session.info.pop(PENDING_KEY, []) for change in level["changes"]]:
            action = change.pop("action")
            try:
                hub.record_event(action, **change)
            except Exception:
                logger.exception(f"activity hub: {action} of {change['target_type']} {change['target_id']} not recorded")

    @event.listens_for(session_class, "after_rollback")
    def forget(session):
        if session.in_nested_transaction():
            stack(session)[-1]["changes"].clear()
        else:
            session.info.pop(PENDING_KEY, None)
