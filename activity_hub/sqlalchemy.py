"""Every insert, update and delete made through SQLAlchemy sessions, recorded with before/after.

    from activity_hub.sqlalchemy import track_changes
    track_changes(hub)

Records data.created / data.updated / data.deleted with the table as target type and the primary key
as target id; changes holds the changed columns (all columns for a create or delete), with secrets
masked. A change is recorded only once its transaction commits; a rolled-back one never is.
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
ACTION_CREATED = "data.created"
ACTION_UPDATED = "data.updated"
ACTION_DELETED = "data.deleted"

_tracked = []


def _change(obj, action: str) -> dict | None:
    state = inspect(obj)
    mapper = state.mapper
    if action == ACTION_UPDATED:
        before, after = {}, {}
        for column in mapper.column_attrs:
            history = state.attrs[column.key].history
            if history.has_changes():
                before[column.key] = history.deleted[0] if history.deleted else None
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
    return {
        "action": action,
        "target_type": mapper.persist_selectable.name,
        "target_id": ":".join(str(value) for value in mapper.primary_key_from_instance(obj)),
        "changes": changes,
    }


def track_changes(hub, *, exclude_tables=(), session_class=Session) -> None:
    """Starts recording ORM changes for every session of session_class (all sessions by default).
    Safe to call more than once; recording never raises into the application's commit."""
    if session_class in _tracked:
        return
    _tracked.append(session_class)
    excluded = set(exclude_tables)

    @event.listens_for(session_class, "after_flush")
    def collect(session, flush_context):
        # after the flush: primary keys are assigned and each attribute's history is still there
        pending = session.info.setdefault(PENDING_KEY, [])
        for objects, action in ((session.new, ACTION_CREATED), (session.dirty, ACTION_UPDATED),
                                (session.deleted, ACTION_DELETED)):
            for obj in objects:
                try:
                    if inspect(obj).mapper.persist_selectable.name in excluded:
                        continue
                    change = _change(obj, action)
                    if change:
                        pending.append(change)
                except Exception:
                    logger.exception("activity hub: a data change could not be read")

    @event.listens_for(session_class, "after_commit")
    def record(session):
        for change in session.info.pop(PENDING_KEY, []):
            action = change.pop("action")
            try:
                hub.record_event(action, **change)
            except Exception:
                logger.exception(f"activity hub: {action} of {change['target_type']} {change['target_id']} not recorded")

    @event.listens_for(session_class, "after_rollback")
    def forget(session):
        session.info.pop(PENDING_KEY, None)
