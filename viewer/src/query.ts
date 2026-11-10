import type { Catalog, Kind } from "./types"
import { sentenceCase, words } from "./format"

/** A term of the search language (activity_hub.query): `field:value`, `-field:value`, a word or "words". */
export type Term = { field: string | null; value: string; negated: boolean; text: string }

// as activity_hub.query: an unclosed quote runs to the end
const TOKEN = /(-?)(?:([a-z_]+):)?("([^"]*)"?|\S+)/g

export function terms(query: string): Term[] {
  const out: Term[] = []
  for (const m of query.matchAll(TOKEN)) {
    let value = m[3].startsWith('"') ? m[4] ?? "" : m[3]
    let field: string | null = m[2] ?? null
    if (field && value.startsWith("//")) { value = `${field}:${value}`; field = null }   // a link, not a field
    if (value) out.push({ field, value, negated: m[1] === "-", text: m[0] })
  }
  return out
}

/** The query without one of its terms. */
export const without = (query: string, term: Term) =>
  terms(query).filter((t) => t !== term && t.text !== term.text).map((t) => t.text).join(" ")

/** A value as a term: quoted when it holds a space. */
export const quote = (value: string) => (/\s/.test(value) ? `"${value.replace(/"/g, "")}"` : value)

type FieldHelp = { field: string; label: string; hint: string; kinds: Kind[] }

export const FIELDS: FieldHelp[] = [
  { field: "actor", label: "Who", hint: "a login, account, key or name", kinds: ["events", "requests"] },
  { field: "action", label: "Action", hint: "e.g. trade.closed, or trade.* for all", kinds: ["events"] },
  { field: "result", label: "Result", hint: "success, failed or refused", kinds: ["events"] },
  { field: "on", label: "Concerning", hint: "kind:id, e.g. account:100234", kinds: ["events"] },
  { field: "category", label: "Category", hint: "e.g. trade, user, data", kinds: ["events"] },
  { field: "actor_type", label: "Actor type", hint: "e.g. staff, system", kinds: ["events", "requests"] },
  { field: "app", label: "App", hint: "where it came from, e.g. web", kinds: ["events", "requests"] },
  { field: "service", label: "Service", hint: "the service that recorded it", kinds: ["events", "requests"] },
  { field: "ip", label: "IP address", hint: "e.g. 202.66.180.61", kinds: ["events", "requests"] },
  { field: "country", label: "Country", hint: "two letters, e.g. AE", kinds: ["events", "requests"] },
  { field: "method", label: "Method", hint: "GET, POST, PUT, PATCH or DELETE", kinds: ["requests"] },
  { field: "route", label: "Route", hint: "e.g. /trading/* ", kinds: ["requests"] },
  { field: "status", label: "Status", hint: "a code or a range, e.g. 4xx", kinds: ["requests"] },
  { field: "request", label: "Request id", hint: "everything one request did", kinds: ["events", "requests"] },
]
export const fieldsOf = (kind: Kind) => FIELDS.filter((f) => f.kinds.includes(kind))
// other names the server also takes (activity_hub.query)
const ALIASES: Record<Kind, string[]> = { events: ["origin", "outcome", "session"], requests: ["origin", "session"] }
/** Every field the server searches for a kind: those offered, and their other names. */
export const searchableFields = (kind: Kind) => [...fieldsOf(kind).map((f) => f.field), ...ALIASES[kind]]
export const fieldLabel = (field: string) => FIELDS.find((f) => f.field === field)?.label ?? sentenceCase(words(field))

export type Suggestion = { insert: string; label: string; hint?: string }

/** What can follow what is typed: field names, then a field's known values. facets: values seen in
 * the log, with their counts. */
export function suggest(token: string, kind: Kind, catalog?: Catalog, facets: Record<string, { value: string; count: number }[]> = {}): Suggestion[] {
  const negated = token.startsWith("-")
  const bare = negated ? token.slice(1) : token
  const sign = negated ? "-" : ""
  const colon = bare.indexOf(":")
  if (colon < 0) {
    return fieldsOf(kind).filter((f) => f.field.startsWith(bare.toLowerCase()) || f.label.toLowerCase().startsWith(bare.toLowerCase()))
      .map((f) => ({ insert: `${sign}${f.field}:`, label: `${f.field}:`, hint: f.hint }))
  }
  const field = bare.slice(0, colon)
  const typed = bare.slice(colon + 1).toLowerCase()
  const values: Suggestion[] = (() => {
    const counted = (name: string) => (facets[name] ?? []).filter((v) => v.value)
      .map((v) => ({ insert: v.value, label: v.value, hint: v.count.toLocaleString() }))
    switch (field) {
      case "action":
        return Object.entries(catalog?.actions ?? {}).map(([action, a]) => ({ insert: action, label: action, hint: a.title }))
      case "category":
        return [...new Set(Object.values(catalog?.actions ?? {}).map((a) => a.category))].map((c) => ({ insert: c, label: c }))
      case "actor_type":
        return Object.entries(catalog?.actor_types ?? {}).map(([t, label]) => ({ insert: t, label: t, hint: label }))
      case "result":
        return ["success", "failed", "refused"].map((r) => ({ insert: r, label: r }))
      case "method":
        return ["GET", "POST", "PUT", "PATCH", "DELETE"].map((m) => ({ insert: m, label: m }))
      case "status":
        return ["2xx", "4xx", "5xx"].map((s) => ({ insert: s, label: s }))
      case "on":
        return Object.entries(catalog?.entities ?? {}).filter(([e]) => !e.includes("_"))
          .map(([e, label]) => ({ insert: `${e}:`, label: `${e}:`, hint: label }))
      case "app":
        return counted("origin")
      case "service":
        return counted("service")
      default:
        return []
    }
  })()
  // a value, or a word of what it means, starting with what is typed
  return values.filter((v) => v.insert.toLowerCase().startsWith(typed) || v.insert.toLowerCase().split(/[._:]/).some((w) => w.startsWith(typed))
      || (v.hint ?? "").toLowerCase().split(/\s+/).some((w) => w.startsWith(typed)))
    .slice(0, 12).map((v) => ({ ...v, insert: `${sign}${field}:${v.insert.endsWith(":") ? v.insert : quote(v.insert)}` }))
}
