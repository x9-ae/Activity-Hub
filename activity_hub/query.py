"""The search language of the log, as GitHub's and Pangea's audit logs have it:

    actor:ops@x9.ae action:trade.* -result:success on:account:100234 "wrong password"

- `field:value` keeps records whose field has the value; several values of one field are any of
  them (action:trade.* action:order.*), different fields all apply.
- `-field:value` leaves those records out.
- `action:trade.*` (or `trade.`) and `route:/trading/*` match by prefix.
- `on:type:id` is an entity's timeline: the records about it or related to it.
- `status:4xx` is a range of HTTP statuses.
- Any other word, or "words in quotes", is looked for in who, what it was done to, the reason,
  the IP, the details and the changes (events) or the path and what was sent (requests).
"""
import re
import json

MAX_QUERY_LENGTH = 500
MAX_TERMS = 20
# an unclosed quote runs to the end: never a narrower or wider search than typed
TOKEN = re.compile(r'(-?)(?:([a-z_]+):)?("([^"]*)"?|\S+)')

# field -> column, per kind; "actor" matches the id or the name
EVENT_FIELDS = {
    "actor": "actor", "actor_type": "actor_type", "action": "action", "category": "category",
    "result": "outcome", "outcome": "outcome", "on": "related", "ip": "ip", "country": "country",
    "app": "origin", "origin": "origin", "service": "service", "request": "request_id", "session": "session_id",
}
REQUEST_FIELDS = {
    "actor": "actor", "actor_type": "actor_type", "method": "method", "route": "route", "status": "status",
    "ip": "ip", "country": "country", "app": "origin", "origin": "origin", "service": "service",
    "request": "request_id", "session": "session_id",
}
FIELDS = {"events": EVENT_FIELDS, "requests": REQUEST_FIELDS}
TEXT_COLUMNS = {
    "events": ("actor_id", "actor_name", "target_id", "target_name", "reason", "ip", "metadata", "changes"),
    "requests": ("actor_id", "actor_name", "path", "ip", "request_body"),
}
PREFIX_COLUMNS = ("action", "route")
JSON_COLUMNS = ("metadata", "changes", "request_body")


def parse(query: str, kind: str) -> list:
    """[(field or None, value, negated)] of a search; ValueError for a field the kind does not have."""
    query = (query or "").strip()
    if len(query) > MAX_QUERY_LENGTH:
        raise ValueError(f"the search is longer than {MAX_QUERY_LENGTH} characters")
    fields = FIELDS[kind]
    terms = []
    for negated, field, raw, quoted in TOKEN.findall(query):
        value = quoted if raw.startswith('"') else raw
        if field and value.startswith("//"):   # a link in the text, not a field: http://…
            field, value = None, f"{field}:{value}"
        if field and field not in fields:
            raise ValueError(f"unknown search field {field}: use {', '.join(sorted(set(fields)))}")
        if value:
            terms.append((field or None, value, bool(negated)))
    if len(terms) > MAX_TERMS:
        raise ValueError(f"a search takes at most {MAX_TERMS} terms")
    return terms


def _condition(kind: str, field: str | None, value: str, name: str, parameters: dict) -> str:
    """One term as SQL, its value bound as parameter name."""
    if field is None:
        parameters[name] = value
        text = ", ' ', ".join(TEXT_COLUMNS[kind])
        found = f"positionCaseInsensitiveUTF8(concat({text}), {{{name}:String}}) > 0"
        escaped = json.dumps(value)[1:-1]
        if escaped == value:
            return found
        # details and changes are stored as JSON with non-ASCII letters escaped (\u00fc): look for that too
        parameters[f"{name}_json"] = escaped
        stored = ", ' ', ".join(c for c in TEXT_COLUMNS[kind] if c in JSON_COLUMNS)
        return f"({found} OR positionCaseInsensitiveUTF8(concat({stored}), {{{name}_json:String}}) > 0)"
    column = FIELDS[kind][field]
    if column == "actor":
        parameters[name] = value
        return f"(actor_id = {{{name}:String}} OR lower(actor_name) = lower({{{name}:String}}))"
    if column == "related":
        if ":" not in value:
            raise ValueError("on: takes a kind and an id, e.g. on:account:100234")
        parameters[name] = value
        return f"has(related_keys, {{{name}:String}})"
    if column == "status":
        match = re.fullmatch(r"([1-5])xx", value.lower())
        if match:
            parameters[name] = int(match.group(1)) * 100
            return f"(status >= {{{name}:UInt16}} AND status < {{{name}:UInt16}} + 100)"
        if not value.isdigit() or not 100 <= int(value) <= 599:
            raise ValueError("status: takes a code (404) or a range (4xx)")
        parameters[name] = int(value)
        return f"status = {{{name}:UInt16}}"
    if column in PREFIX_COLUMNS and (value.endswith("*") or (column == "action" and value.endswith("."))):
        parameters[name] = value.rstrip("*")
        return f"startsWith({column}, {{{name}:String}})"
    parameters[name] = value
    return f"{column} = {{{name}:String}}"


def to_sql(query: str, kind: str, parameters: dict) -> list:
    """The WHERE clauses of a search, with its values added to parameters (as q0, q1, ...)."""
    terms = parse(query, kind)
    wanted, unwanted = {}, []
    for n, (field, value, negated) in enumerate(terms):
        condition = _condition(kind, field, value, f"q{n}", parameters)
        if negated:
            unwanted.append(f"NOT {condition}")
        else:
            # several values of one field: any of them; free text: every word
            wanted.setdefault(field if field else f"text{n}", []).append(condition)
    clauses = [f"({' OR '.join(group)})" if len(group) > 1 else group[0] for group in wanted.values()]
    return clauses + unwanted
