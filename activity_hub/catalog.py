"""What each recorded action means and how it reads.

A catalog declares each action once: its title, the sentence it reads as, and how important it is.
The reader uses it to give every record a readable line, to keep details out of the default view,
and to fold the row changes a request made under the event that caused them. The hub uses it to
report actions nobody declared. The package declares the general actions (sign-ins, passwords, data
changes, exports); an application adds its own, as plain data:

    CATALOG = Catalog(
        events={"trade.opened": {"title": "Trade opened", "importance": "normal",
                                 "says": "Opened {side} {volume} {symbol}[ at {price}]"}},
        entities={"ticket": "ticket"}, fields={"sl": "stop loss"},
        values={"side": {"1": "BUY"}, "margin_level": "{:.2f}"},
        actor_types={"account": "Client"}, actor_names={"system:liquidation": "Stop-out liquidation"})

An event entry:
- title: a short name ("Trade opened"), or one per outcome {"success": ..., "failed": ...}.
- says: the sentence, or one per outcome. It names values in {braces}: any field of the event, any
  key of its metadata, and {actor} who acted, {on} what it was done to ("account 100234"),
  {target} the kind of thing, {changed} the changed fields' names, {changes} the same with their
  before and after values. A part in [brackets] is said only when every value in it is known.
  A refusal or failure without a sentence of its own is said with its reason.
- importance: "high" (worth attention: money, security), "normal" (the default), "low" (a detail,
  out of the default view). importance_for: a different importance per actor type.
- fold: the record is a side effect of its request; it is shown inside the request's main event.
- facts: the few values a timeline shows as chips, [[label, value], …], both written like a sentence:
  [["{order_type}", "{order_volume}"], ["@", "{order_price}"], ["SL", "{stop_loss}"]]. A chip whose
  value is not known is left out.
- icon and tone: how a timeline marks the step. icon is one of ICONS, tone one of TONES; a failed or
  refused step is always marked as a problem.

entities name the kinds of things ("ticket"), fields name values ("stop loss"), and values say a
field's codes ({"1": "BUY"}) or format its numbers ("{:.2f}"). computed adds values worked out from an
event's metadata, {"left_volume": lambda metadata: …}, usable in sentences and facts like any other.
"""
import re
import json
from activity_hub.records import OUTCOMES, MASKED

IMPORTANCE = ("high", "normal", "low")
ENTRY_KEYS = {"title", "says", "importance", "importance_for", "fold", "facts", "icon", "tone"}
ICONS = ("clock", "bolt", "pencil", "scissors", "checkCircle", "xCircle", "trendUp", "trendDown", "user", "key",
         "money", "alert", "shield", "download", "send", "log", "layers")
TONES = ("sky", "violet", "amber", "emerald", "rose", "neutral")
PLACEHOLDER = re.compile(r"\{([a-z_][a-z0-9_]*)\}")
OPTIONAL = re.compile(r"\[([^\[\]]*)\]")
# a sentence names at most this many changed fields, then "and N more"
NAMED_CHANGES = 3
# a value said in a sentence is cut to this length; the record keeps all of it
SAID_LENGTH = 80
# values an event has without anyone passing them
DERIVED = ("actor", "on", "target", "changed", "changes")

BUILT_IN_EVENTS = {
    "user.signed_in": {
        "title": {"success": "Signed in", "failed": "Sign-in failed", "refused": "Sign-in refused"},
        "says": {"success": "Signed in", "failed": "Failed sign-in[ to {on}]", "refused": "Sign-in refused[ to {on}]"},
        "icon": "user", "tone": "sky",
    },
    "user.signed_out": {"title": "Signed out", "says": "Signed out", "icon": "user", "tone": "neutral"},
    "user.password_changed": {
        "title": {"success": "Password changed", "refused": "Password change refused"},
        "says": {"success": "Changed the password[ of {on}]", "refused": "Password change refused[ for {on}]"},
        "importance": "high", "icon": "key", "tone": "amber",
    },
    "user.password_reset_requested": {
        "title": {"success": "Password reset requested", "refused": "Password reset refused"},
        "says": {"success": "Requested a password reset[ for {on}]", "refused": "Password reset refused[ for {on}]"},
        "icon": "key", "tone": "amber",
    },
    "activity.exported": {"title": "Activity exported", "says": "Exported the activity log[ ({rows} rows)]",
                          "importance": "high", "icon": "download", "tone": "neutral"},
    "activity.searched": {"title": "Activity searched", "says": "Searched the activity log", "importance": "low",
                          "icon": "log", "tone": "neutral"},
    "activity.stream_saved": {"title": "Activity stream saved",
                              "says": "Saved the stream {stream}[ of {kind}] to {destination}", "importance": "high",
                              "icon": "send", "tone": "violet"},
    "activity.stream_removed": {"title": "Activity stream removed", "says": "Removed the stream {stream}",
                                "importance": "high", "icon": "send", "tone": "rose"},
    # track_changes: every row change, a detail unless staff or a partner made it by hand
    "data.created": {"title": "Record created", "says": "Created {on}", "importance": "low",
                     "importance_for": {"staff": "normal", "api_key": "normal"}, "fold": True, "icon": "layers"},
    "data.updated": {"title": "Record updated", "says": "Updated {on}[: {changed}]", "importance": "low",
                     "importance_for": {"staff": "normal", "api_key": "normal"}, "fold": True, "icon": "layers"},
    "data.deleted": {"title": "Record deleted", "says": "Deleted {on}", "importance": "low",
                     "importance_for": {"staff": "normal", "api_key": "normal"}, "fold": True, "icon": "layers"},
}
BUILT_IN_ACTOR_TYPES = {"staff": "Staff", "system": "System", "visitor": "Visitor", "api_key": "API key"}

BROWSERS = (("Edg/", "Edge"), ("OPR/", "Opera"), ("Chrome/", "Chrome"), ("CriOS/", "Chrome"),
            ("Firefox/", "Firefox"), ("FxiOS/", "Firefox"), ("Version/", "Safari"))
SYSTEMS = (("iPhone", "iOS"), ("iPad", "iOS"), ("Android", "Android"), ("Windows", "Windows"),
           ("Mac OS X", "macOS"), ("Macintosh", "macOS"), ("Linux", "Linux"))


def words(value) -> str:
    return re.sub(r"[._]+", " ", str(value or "")).strip()


def sentence_case(value: str) -> str:
    return value[:1].upper() + value[1:]


def device(user_agent: str) -> str | None:
    """'Chrome 157 on macOS' from a browser's user agent; a program's own name ('python-httpx 0.27')
    otherwise."""
    if not user_agent:
        return None
    system = next((name for key, name in SYSTEMS if key in user_agent), None)
    for key, name in BROWSERS:
        match = re.search(re.escape(key) + r"(\d+)", user_agent)
        if match and "Mozilla/" in user_agent:
            return f"{name} {match.group(1)}" + (f" on {system}" if system else "")
    program = re.match(r"([A-Za-z][\w.-]*)/([\w.]+)", user_agent)
    if program and not user_agent.startswith("Mozilla/"):
        return f"{program.group(1)} {program.group(2)}"
    return system or user_agent[:SAID_LENGTH]


def _short(value):
    return value if value is None or len(value) <= SAID_LENGTH else value[:SAID_LENGTH - 1] + "…"


def _by_outcome(value, outcome: str):
    if isinstance(value, dict):
        return value.get(outcome)
    return value if outcome == "success" else None


def _required(template: str) -> set:
    return set(PLACEHOLDER.findall(OPTIONAL.sub("", template)))


def _render(template: str, values: dict) -> str:
    def optional(match):
        part = match.group(1)
        if all(values.get(name) for name in PLACEHOLDER.findall(part)):
            return PLACEHOLDER.sub(lambda m: values[m.group(1)], part)
        return ""
    text = PLACEHOLDER.sub(lambda m: values.get(m.group(1)) or "", OPTIONAL.sub(optional, template))
    return re.sub(r"\s{2,}", " ", text).strip()


class Catalog:
    """The application's actions on top of the package's own; see the module's description."""

    def __init__(self, events: dict | None = None, entities: dict | None = None, fields: dict | None = None,
                 values: dict | None = None, actor_types: dict | None = None, actor_names: dict | None = None,
                 computed: dict | None = None):
        self.events = {**BUILT_IN_EVENTS, **(events or {})}
        self.entities = dict(entities or {})
        self.fields = dict(fields or {})
        self.values = {field: spec if isinstance(spec, str) else {str(raw): said for raw, said in spec.items()}
                       for field, spec in (values or {}).items()}
        self.actor_types = {**BUILT_IN_ACTOR_TYPES, **(actor_types or {})}
        self.actor_names = dict(actor_names or {})
        self.computed = dict(computed or {})
        for action, entry in self.events.items():
            self._check_entry(action, entry)

    @staticmethod
    def _check_entry(action: str, entry: dict) -> None:
        unknown = set(entry) - ENTRY_KEYS
        if unknown:
            raise ValueError(f"{action}: unknown keys {sorted(unknown)}")
        levels = [entry.get("importance", "normal"), *(entry.get("importance_for") or {}).values()]
        if any(level not in IMPORTANCE for level in levels):
            raise ValueError(f"{action}: importance must be one of {IMPORTANCE}")
        for key in ("title", "says"):
            if isinstance(entry.get(key), dict) and set(entry[key]) - set(OUTCOMES):
                raise ValueError(f"{action}: {key} outcomes must be among {OUTCOMES}")
        if not all(isinstance(fact, (list, tuple)) and len(fact) == 2 for fact in entry.get("facts") or ()):
            raise ValueError(f"{action}: facts are [label, value] pairs")
        if entry.get("icon", ICONS[0]) not in ICONS or entry.get("tone", TONES[0]) not in TONES:
            raise ValueError(f"{action}: icon must be one of {ICONS} and tone one of {TONES}")

    # what the reader asks

    def importance(self, action: str, actor_type: str = "") -> str:
        entry = self.events.get(action) or {}
        return (entry.get("importance_for") or {}).get(actor_type) or entry.get("importance", "normal")

    def low_rules(self) -> tuple:
        """(actions that are always low, [(action, actor types, low for those types or for all others)])
        for the query of the default view."""
        always, conditional = [], []
        for action, entry in self.events.items():
            base = entry.get("importance", "normal")
            overrides = entry.get("importance_for") or {}
            if base == "low":
                raised = sorted(t for t, level in overrides.items() if level != "low")
                if raised:
                    conditional.append((action, raised, False))
                else:
                    always.append(action)
            else:
                lowered = sorted(t for t, level in overrides.items() if level == "low")
                if lowered:
                    conditional.append((action, lowered, True))
        return always, conditional

    def foldable(self) -> list:
        return [action for action, entry in self.events.items() if entry.get("fold")]

    # how a record reads

    def label(self, field: str) -> str:
        return self.fields.get(field) or words(field)

    def say(self, field: str, value) -> str | None:
        """A value as a reader sees it: a named code ('1' -> 'BUY'), a formatted number, yes/no, a list
        joined."""
        if value is None or value == "":
            return None
        if isinstance(value, bool):
            return "yes" if value else "no"
        if isinstance(value, (list, tuple)):
            return ", ".join(filter(None, (self.say(field, item) for item in value))) or None
        if isinstance(value, dict):
            return json.dumps(value, default=str, separators=(", ", ": "))
        spec = self.values.get(field)
        if isinstance(spec, str):
            try:
                return spec.format(float(value))
            except (TypeError, ValueError):
                return str(value)
        return (spec or {}).get(str(value), str(value))

    def change_list(self, changes) -> list | None:
        """[{field, label, before, after}] of an event's changes, said as a reader sees them."""
        if not isinstance(changes, dict) or not any(isinstance(changes.get(k), dict) for k in ("before", "after")):
            return None
        before, after = changes.get("before") or {}, changes.get("after") or {}
        return [{"field": key, "label": sentence_case(self.label(key)), "before": self.say(key, before.get(key)),
                 "after": self.say(key, after.get(key))} for key in dict.fromkeys([*before, *after])]

    def details(self, row: dict) -> list:
        """[{field, label, value}] of an event's metadata and the values computed from it, said as a
        reader sees them; for its detail."""
        metadata = self._with_computed(row.get("metadata") if isinstance(row.get("metadata"), dict) else {})
        return [{"field": key, "label": sentence_case(self.label(key)), "value": self.say(key, value)}
                for key, value in metadata.items() if self.say(key, value) is not None]

    def _with_computed(self, metadata: dict) -> dict:
        for name, work_out in self.computed.items():
            try:
                metadata = {**metadata, name: work_out(metadata)}
            except (KeyError, TypeError, ValueError, ArithmeticError):
                pass   # not every event carries what it needs
        return metadata

    def actor(self, row: dict) -> str:
        named = self.actor_names.get(f"{row.get('actor_type')}:{row.get('actor_id')}")
        if named:
            return named
        if row.get("actor_name"):
            return row["actor_name"]
        if row.get("actor_type") == "system":
            return sentence_case(words(row.get("actor_id"))) or "System"
        return row.get("actor_id") or "Anonymous"

    def actor_label(self, actor_type: str) -> str:
        return self.actor_types.get(actor_type) or sentence_case(words(actor_type)) or "Unknown"

    def _on(self, row: dict) -> str:
        kind = row.get("target_type") or ""
        name = row.get("target_name") or row.get("target_id") or ""
        entity = self.entities.get(kind) or words(kind)
        return f"{entity} {name}".strip()

    def _changes_said(self, changes: list | None) -> tuple:
        if not changes:
            return "", ""
        shown, more = changes[:NAMED_CHANGES], len(changes) - NAMED_CHANGES
        tail = f" and {more} more" if more > 0 else ""

        def one(change):
            label = self.label(change["field"])
            if MASKED in (change["before"], change["after"]) or change["before"] == change["after"]:
                return label
            if change["before"] is None:
                return f"{label} {_short(change['after'])}"
            return f"{label} {_short(change['before'])} → {_short(change['after']) or '—'}"
        return (", ".join(self.label(c["field"]) for c in shown) + tail,
                ", ".join(one(c) for c in shown) + tail)

    def _values(self, row: dict, change_list: list | None) -> dict:
        metadata = self._with_computed(row.get("metadata") if isinstance(row.get("metadata"), dict) else {})
        said = {key: _short(self.say(key, value)) for key, value in metadata.items()}
        for key, value in row.items():
            if isinstance(value, str) and value:
                said[key] = _short(self.say(key, value))
        changed, changes = self._changes_said(change_list)
        return {**said, "actor": self.actor(row), "on": self._on(row),
                "target": self.entities.get(row.get("target_type")) or words(row.get("target_type")),
                "changed": changed, "changes": changes}

    def _sentence(self, row: dict, values: dict) -> str:
        action, outcome = row.get("action", ""), row.get("outcome") or "success"
        entry = self.events.get(action) or {}
        template = _by_outcome(entry.get("says"), outcome)
        if template is None and outcome != "success":
            sentence = self._sentence({**row, "outcome": "success"}, values)
            return f"{sentence} ({outcome}" + (f": {values['reason']})" if values.get("reason") else ")")
        if template is None:
            template = self.title(action, outcome) + "[ {on}]"
        sentence = _render(template, values)
        if outcome != "success" and values.get("reason") and "{reason}" not in template:
            sentence = f"{sentence}: {values['reason']}"
        return sentence

    def title(self, action: str, outcome: str = "success") -> str:
        entry = self.events.get(action) or {}
        title = _by_outcome(entry.get("title"), outcome)
        if title:
            return title
        base = _by_outcome(entry.get("title"), "success") or sentence_case(words(action))
        return base if outcome == "success" else f"{base}: {outcome}"

    def _facts(self, entry: dict, values: dict) -> list:
        facts = []
        for label, value in entry.get("facts") or ():
            if all(values.get(name) for name in _required(value)):
                facts.append({"label": _render(label, values), "value": _render(value, values)})
        return facts

    def present(self, row: dict) -> dict:
        """What a person reads for one event: its title, its sentence, its key values (facts), its
        importance, who acted and as what, the device, its changes as a list, and how a timeline marks it."""
        change_list = self.change_list(row.get("changes"))
        values = self._values(row, change_list)
        entry = self.events.get(row.get("action", "")) or {}
        return {
            "title": self.title(row.get("action", ""), row.get("outcome") or "success"),
            "summary": self._sentence(row, values),
            "facts": self._facts(entry, values) if (row.get("outcome") or "success") == "success" else [],
            "icon": entry.get("icon"), "tone": entry.get("tone"),
            "importance": self.importance(row.get("action", ""), row.get("actor_type", "")),
            "actor": self.actor(row),
            "actor_label": self.actor_label(row.get("actor_type", "")),
            "device": device(row.get("user_agent", "")),
            "change_list": change_list,
        }

    # what the hub asks

    def problems(self, action: str, outcome: str, known: set) -> list:
        """Why an event about to be recorded would not read well: an action nobody declared, or a
        value its sentence needs that the event does not carry. known: the names it has values for."""
        entry = self.events.get(action)
        if entry is None:
            return [f"{action} is not in the catalog"]
        template = _by_outcome(entry.get("says"), outcome) or _by_outcome(entry.get("says"), "success") or ""
        missing = sorted(_required(template) - known - set(DERIVED))
        return [f"{action} has no {', '.join(missing)} for its sentence"] if missing else []
