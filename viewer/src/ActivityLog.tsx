import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from "react"
import type { ActivityRequest, Catalog, Chart, Focus, Kind, Preset, Row, Search, View } from "./types"
import { isEvent } from "./types"
import { Icon } from "./icons"
import { useRemote, usePages, MAX_PAGES } from "./remote"
import { ago, dayLabel, dayStart, dayText, isDay, nextDayStart, plural, toMs, words } from "./format"
import { EXPORT_MAX_ROWS, download, fetchExport, toCsv, toJsonLines } from "./export"
import { fieldLabel, fieldsOf, quote, searchableFields, suggest, terms, without, type Term } from "./query"
import { ActivityChart } from "./ActivityChart"
import { ActivityDetail } from "./ActivityDetail"
import { IntegrityStatus, sealState, type Status } from "./IntegrityStatus"
import { SearchBox } from "./SearchBox"
import { ColumnsMenu, Popover, ViewsMenu, type Column } from "./Menus"
import { Streams, type StreamList } from "./Streams"
import { CallLine, EventLine, Message, OutcomeTag, Skeleton, When, Where, Who, cx } from "./parts"

const VIEWS: { value: View; label: string; hint: string }[] = [
  { value: "important", label: "Important", hint: "What people did, without the details behind it" },
  { value: "all", label: "All", hint: "Every record, each request's row changes inside its event" },
  { value: "problems", label: "Problems", hint: "Only what failed or was refused" },
]
const REQUEST_PRESETS: Preset[] = [
  { label: "All requests", search: {} },
  { label: "Changes only", search: { filters: { method: ["POST", "PUT", "PATCH", "DELETE"] } } },
  { label: "Errors", search: { status_from: 400 } },
]
const RANGES: { value: string; label: string; minutes?: number }[] = [
  { value: "1h", label: "Last hour", minutes: 60 },
  { value: "24h", label: "Last 24 hours", minutes: 1440 },
  { value: "7d", label: "Last 7 days", minutes: 10080 },
  { value: "30d", label: "Last 30 days", minutes: 43200 },
  { value: "all", label: "All time" },
  { value: "custom", label: "Dates…" },
]
// columns a person may add to When, Who and What
const OPTIONAL: Record<Kind, Column[]> = {
  events: [{ key: "where", label: "Where" }, { key: "concerning", label: "Concerning" }, { key: "result", label: "Result" },
    { key: "service", label: "Service" }, { key: "ip", label: "IP address" }],
  requests: [{ key: "where", label: "Where" }, { key: "service", label: "Service" }, { key: "ip", label: "IP address" }],
}
const DEFAULT_COLUMNS = ["where"]
// one empty list for every render: a new one would remake the search each time
const NO_PRESETS: Preset[] = []
const COLUMNS_KEY = "activity-hub-columns"
// the search kept in the address, under these names
const OWN_PARAMS = ["kind", "view", "p", "q", "range", "from", "to", "cols"]
type Draft = { q: string; range: string; from: string; to: string }

/** One entity's activity on its own page, e.g. an account's tab: its events, and the API requests it
 * made itself. label names it in the header. */
export type Entity = { type: string; id: string; label: string }

export type ActivityLogProps = {
  request: ActivityRequest
  title?: string
  description?: string
  /** one-click views of events for this application, e.g. "Money" */
  presets?: Preset[]
  /** "requests" shows the API access log as a second tab */
  kinds?: Kind[]
  entity?: Entity
  /** the search kept in the address: pass the page's query and a setter to keep it there */
  params?: URLSearchParams
  onParamsChange?: (params: URLSearchParams) => void
  canExport?: boolean
  /** the integrity strip (recording, sealing, the daily check) under the header */
  showStatus?: boolean
  pageSize?: number
  liveEveryMs?: number
  className?: string
}

const defaultRange = (entity?: Entity) => (entity ? "all" : "7d")

function draftOf(params: URLSearchParams, entity?: Entity): Draft {
  // a day the address cannot hold (a cut link) is left out, never searched
  const day = (name: string) => { const value = params.get(name) ?? ""; return isDay(value) ? value : "" }
  const from = day("from")
  const to = day("to")
  return { q: params.get("q") ?? "", from, to, range: params.get("range") || (from || to ? "custom" : defaultRange(entity)) }
}

function rangeOf(draft: Draft): { occurred_from?: string; occurred_to?: string } {
  if (draft.range === "custom") {
    return { occurred_from: isDay(draft.from) ? dayStart(draft.from) : undefined, occurred_to: isDay(draft.to) ? nextDayStart(draft.to) : undefined }
  }
  const minutes = RANGES.find((r) => r.value === draft.range)?.minutes
  // to the minute, so the search stays the same while a page is open
  return minutes ? { occurred_from: `${ago(minutes).slice(0, 16)}:00` } : {}
}

function searchOf(kind: Kind, view: View, preset: Preset | undefined, draft: Draft, entity?: Entity): Search {
  const filters: Record<string, string | string[]> = { ...(preset?.search.filters ?? {}) }
  const search: Search = { kind, filters, query: draft.q.trim() || undefined, ...rangeOf(draft) }
  if (kind === "events") {
    search.view = view
    search.action = preset?.search.action
    if (entity) Object.assign(search, { related_type: entity.type, related_id: entity.id })
  } else {
    search.status_from = preset?.search.status_from
    if (entity) filters.actor_id = entity.id
  }
  return search
}

/** Only the viewer's own parameters: what a saved view keeps. */
const ownParams = (params: URLSearchParams) => {
  const own = new URLSearchParams()
  params.forEach((value, name) => OWN_PARAMS.includes(name) && own.set(name, value))
  return own.toString()
}

function savedColumns(): string[] {
  try {
    return JSON.parse(localStorage.getItem(COLUMNS_KEY) ?? "null") ?? DEFAULT_COLUMNS
  } catch {
    return DEFAULT_COLUMNS
  }
}

/** The activity log: what happened, who did it and from where, read as sentences, with the detail
 * behind each record one click away. */
export function ActivityLog({
  request, title = "Activity Log", description, presets = NO_PRESETS, kinds = ["events", "requests"], entity,
  params: given, onParamsChange, canExport = false, showStatus = true, pageSize = 100, liveEveryMs = 5000, className,
}: ActivityLogProps) {
  const [own, setOwn] = useState(() => new URLSearchParams())
  const params = given ?? own
  const setParams = useCallback((next: URLSearchParams) => (onParamsChange ? onParamsChange(next) : setOwn(next)), [onParamsChange])

  const kind: Kind = params.get("kind") === "requests" && kinds.includes("requests") ? "requests" : kinds[0]
  const view = (VIEWS.find((v) => v.value === params.get("view"))?.value ?? "important") as View
  const choices = useMemo(() => (kind === "events" ? [{ label: "Everything", search: {} }, ...presets] : REQUEST_PRESETS), [kind, presets])
  const presetIndex = Math.min(Math.max(Number(params.get("p")) || 0, 0), choices.length - 1)
  const columns = params.has("cols") ? (params.get("cols") || "").split(",").filter(Boolean) : savedColumns()
  const optional = OPTIONAL[kind].filter((c) => columns.includes(c.key))
  const applied = useMemo(() => draftOf(params, entity), [params, entity])
  const [draft, setDraft] = useState(applied)
  const [seen, setSeen] = useState(params.toString())
  if (seen !== params.toString()) {   // the address changed under the page (back, a link, a view): the inputs follow it
    setSeen(params.toString())
    setDraft(applied)
  }
  const [live, setLive] = useState(false)
  const [selected, setSelected] = useState<Row | null>(null)
  const [exporting, setExporting] = useState<number | null>(null)
  const [exportOpen, setExportOpen] = useState(false)
  const [notice, setNotice] = useState<string | null>(null)
  const box = useRef<HTMLInputElement>(null)
  const [, tick] = useState(0)
  useEffect(() => {   // "5 min. ago" stays true
    const timer = setInterval(() => tick((n) => n + 1), 30_000)
    return () => clearInterval(timer)
  }, [])

  const search = useMemo(() => searchOf(kind, view, choices[presetIndex], applied, entity),
    [kind, view, choices, presetIndex, applied, entity])
  const key = JSON.stringify(search)
  const list = usePages(request, search, pageSize, live, liveEveryMs)
  // over all time the server finds the first record once; the refreshes reuse that start
  const chartStart = useRef<{ key: string; from: string } | null>(null)
  const chart = useRemote<Chart>(key, () => {
    const asked = key
    const reuse = !search.occurred_from && chartStart.current?.key === asked
    return request("chart", { method: "POST", body: reuse ? { ...search, occurred_from: chartStart.current!.from } : search })
      .then((answer: Chart) => {
        // the start belongs to the search that was asked, whatever was asked since
        if (!search.occurred_from) chartStart.current = { key: asked, from: answer.occurred_from }
        return answer
      })
  }, live ? liveEveryMs : undefined)
  const catalog = useRemote<Catalog>("catalog", () => request("catalog", { method: "GET" }))
  // how far the record is sealed: the strip, and each row's seal mark
  const status = useRemote<Status>(showStatus ? "status" : null, () => request("status", { method: "GET" }), 60_000)
  // streams are offered to those who may export, while the application keeps them
  const streams = useRemote<StreamList>(canExport && !entity ? "streams" : null, () => request("streams", { method: "GET" }), 60_000)
  const [streamsOpen, setStreamsOpen] = useState(false)
  const sealOf = (row: Row) => sealState(row.received_at, isEvent(row) ? "events" : "access_logs", status.data)
  // the values seen in this search, offered while typing app: and service:
  const facet = (field: string) => () =>
    request("values", { method: "POST", body: { ...search, field } }).then((r) => r.values as { value: string; count: number }[])
  const services = useRemote(`${key}|service`, facet("service"))
  const origins = useRemote(`${key}|origin`, facet("origin"))

  /** The address for a search: only what differs from the defaults is written. */
  const paramsOf = (next: { kind?: Kind; view?: View; preset?: number; draft?: Draft; columns?: string[] } = {}) => {
    // the host page's own parameters stay; ours are written afresh
    const out = new URLSearchParams(params)
    for (const name of OWN_PARAMS) out.delete(name)
    const k = next.kind ?? kind
    let d = next.draft ?? draft
    if (k !== kind) {   // API requests have no action, result or timeline: those terms stay with the events
      const fields = new Set(searchableFields(k))
      d = { ...d, q: terms(d.q).filter((t) => !t.field || fields.has(t.field)).map((t) => t.text).join(" ") }
    }
    if (k !== kinds[0]) out.set("kind", k)
    if ((next.view ?? view) !== "important") out.set("view", next.view ?? view)
    const p = next.preset ?? (next.kind && next.kind !== kind ? 0 : presetIndex)
    if (p) out.set("p", String(p))
    if (d.q.trim()) out.set("q", d.q.trim())
    if (d.range !== defaultRange(entity)) out.set("range", d.range)
    if (d.range === "custom") {
      if (d.from) out.set("from", d.from)
      if (d.to) out.set("to", d.to)
    }
    if (next.columns || params.has("cols")) out.set("cols", (next.columns ?? columns).join(","))
    return out
  }
  const apply = (next: Parameters<typeof paramsOf>[0] = {}) => {
    if (next.draft) setDraft(next.draft)
    setParams(paramsOf(next))
  }
  const setColumns = (shown: string[]) => {
    try { localStorage.setItem(COLUMNS_KEY, JSON.stringify(shown)) } catch { /* a private window keeps none */ }
    apply({ draft: applied, columns: shown })
  }
  /** A term into the search box, in place of any of the same field, and searched at once. */
  const narrow = (field: string, value: string) => {
    const kept = terms(applied.q).filter((t) => t.field !== field).map((t) => t.text)
    apply({ draft: { ...applied, q: [...kept, `${field}:${quote(value)}`].join(" ") } })
  }
  const focus = (patch: Focus) => {
    setSelected(null)
    if (patch.actor_id) narrow("actor", patch.actor_id)
    else if (patch.target_type && patch.target_id) {
      // an entity's story: everything about it, whatever was searched before
      apply({ kind: "events", view: "all", preset: 0,
        draft: { q: `on:${patch.target_type}:${quote(patch.target_id)}`, range: "all", from: "", to: "" } })
    }
  }
  /** "field:" into the box, at its end, ready for a value. */
  const addField = (field: string) => {
    const q = draft.q.trim()
    setDraft({ ...draft, q: `${q ? `${q} ` : ""}${field}:` })
    requestAnimationFrame(() => {
      const input = box.current
      if (!input) return
      input.focus()
      input.setSelectionRange(input.value.length, input.value.length)
    })
  }
  const unapplied = draft.q.trim() !== applied.q.trim() || draft.range !== applied.range || draft.from !== applied.from || draft.to !== applied.to
  const reversed = Boolean(draft.range === "custom" && draft.from && draft.to && draft.to < draft.from)

  // the next page comes as the end of the list scrolls into view
  const end = useRef<HTMLDivElement>(null)
  const scroller = useRef<HTMLDivElement>(null)
  const { hasMore, loadMore, more, pageCount } = list
  useEffect(() => {
    if (!end.current || !hasMore || more.loading || more.error || pageCount >= MAX_PAGES) return
    const watcher = new IntersectionObserver(([entry]) => entry.isIntersecting && loadMore(), { root: scroller.current, rootMargin: "240px" })
    watcher.observe(end.current)
    return () => watcher.disconnect()
  }, [hasMore, loadMore, more.loading, more.error, pageCount, list.rows.length])

  const exportAs = async (format: "csv" | "jsonl") => {
    setExportOpen(false)
    setExporting(0)
    try {
      // the records this search lists, each a row of its own
      const { rows, more: left } = await fetchExport(request, search, setExporting)
      if (left) setNotice(`Only the newest ${EXPORT_MAX_ROWS.toLocaleString()} rows were exported. Narrow the dates for the rest.`)
      const stamp = new Date().toISOString().slice(0, 16).replace(/[-:T]/g, "")
      const name = `activity-${entity ? `${entity.type}-${entity.id}-` : ""}${kind}-${stamp}`
      if (format === "csv") download(toCsv(kind, rows), `${name}.csv`, "text/csv;charset=utf-8")
      else download(toJsonLines(rows), `${name}.jsonl`, "application/x-ndjson")
    } catch (e) {
      setNotice(`Export failed: ${(e as Error).message}`)
    } finally {
      setExporting(null)
    }
  }

  const noun = kind === "events" ? "events" : "requests"
  const actorTypes = catalog.data?.actor_types ?? {}
  const entities = catalog.data?.entities ?? {}
  const chipValue = (term: Term) => {
    if (term.field === "action") return catalog.data?.actions[term.value]?.title ?? term.value
    if (term.field === "actor_type") return actorTypes[term.value] ?? term.value
    if (term.field === "on") {
      const [type, ...id] = term.value.split(":")
      return `${entities[type] ?? words(type)} ${id.join(":")}`
    }
    return term.value
  }
  const rows = list.rows
  const facets = { service: services.data ?? [], origin: origins.data ?? [] }
  const span = 3 + optional.length

  if (entity && !(entity.type && entity.id)) {
    return <div className={cx("ahv ahv-log", className)}><Message>Nothing to show: no {entity.type || "record"} chosen.</Message></div>
  }
  return (
    <div className={cx("ahv ahv-log", className)}>
      <header className="ahv-head">
        <div>
          <h2 className="ahv-title"><Icon name="log" size={18} />{entity && title === "Activity Log" ? "Activity" : title}</h2>
          <p className="ahv-dim">
            {description ?? (entity
              ? `Everything about ${entity.label}, and the API requests it made itself. Times are UTC.`
              : "Every action and API request, kept permanently and sealed. Times are UTC.")}
          </p>
        </div>
        <div className="ahv-actions">
          {!entity && <ViewsMenu request={request} current={ownParams(paramsOf({ draft: applied }))}
            onOpen={(saved) => {
              const next = new URLSearchParams(params)
              for (const name of OWN_PARAMS) next.delete(name)
              new URLSearchParams(saved).forEach((value, name) => OWN_PARAMS.includes(name) && next.set(name, value))
              setParams(next)
            }} />}
          <ColumnsMenu columns={OPTIONAL[kind]} shown={columns} onChange={setColumns} />
          {canExport && (
            <Popover label={exporting === null ? "Export" : `Exporting… ${exporting.toLocaleString()}`} icon="download"
              open={exportOpen} setOpen={setExportOpen} disabled={exporting !== null || !rows.length}>
              <button type="button" role="menuitem" onClick={() => exportAs("csv")}>CSV, for spreadsheets</button>
              <button type="button" role="menuitem" onClick={() => exportAs("jsonl")}>JSON Lines, for other tools</button>
            </Popover>
          )}
          {streams.data?.enabled && (
            <button type="button" className="ahv-button" aria-expanded={streamsOpen} onClick={() => setStreamsOpen((o) => !o)}
              title="Send the log to your own systems as it is written">
              <Icon name="send" size={14} />Streams
              {streams.data.streams.some((s) => s.state === "failing") && <span className="ahv-count ahv-count-bad">!</span>}
            </button>
          )}
          <button type="button" className={cx("ahv-button", live && "ahv-button-live")} aria-pressed={live}
            title="Check for new activity every few seconds" onClick={() => setLive((on) => !on)}>
            <Icon name="live" size={14} className={cx(live && "ahv-pulse")} />{live ? "Live" : "Go live"}
          </button>
          <button type="button" className="ahv-button" disabled={list.refreshing && !list.error}
            onClick={() => { list.refresh(); chart.refresh() }}>
            <Icon name="refresh" size={14} className={cx(list.refreshing && !live && "ahv-spin")} />Refresh
          </button>
        </div>
      </header>
      {streamsOpen && streams.data?.enabled && (
        <Streams request={request} kinds={kinds} list={streams.data} refresh={streams.refresh} />
      )}
      {showStatus && !entity && <IntegrityStatus request={request} status={status.data} />}

      <div className="ahv-filters">
        <div className="ahv-bar">
          {kinds.length > 1 && (
            <div className="ahv-segment" role="group" aria-label="Records">
              {kinds.map((k) => (
                <button key={k} type="button" aria-pressed={kind === k} onClick={() => apply({ kind: k, draft: applied })}>
                  {k === "events" ? "Events" : "API requests"}
                </button>
              ))}
            </div>
          )}
          {kind === "events" && (
            <div className="ahv-segment" role="group" aria-label="Show">
              {VIEWS.map((v) => (
                <button key={v.value} type="button" title={v.hint} aria-pressed={view === v.value}
                  onClick={() => apply({ view: v.value, draft: applied })}>{v.label}</button>
              ))}
            </div>
          )}
          {choices.length > 1 && (
            <div className="ahv-chips" role="group" aria-label="Presets">
              {choices.map((choice, index) => (
                <button key={choice.label} type="button" className="ahv-chip" aria-pressed={presetIndex === index}
                  onClick={() => apply({ preset: index, draft: applied })}>{choice.label}</button>
              ))}
            </div>
          )}
        </div>

        <div className="ahv-searchbar">
          <SearchBox value={draft.q} inputRef={box} onChange={(q) => setDraft({ ...draft, q })}
            onSubmit={() => !reversed && apply({ draft })}
            suggestions={(token) => suggest(token, kind, catalog.data, facets)}
            placeholder={kind === "events" ? "Search: words, or actor:… action:trade.* -result:success on:account:100234"
              : "Search: words, or actor:… method:POST status:4xx route:/trading/*"} />
          <select className="ahv-input ahv-range" value={draft.range} aria-label="When"
            onChange={(e) => setDraft({ ...draft, range: e.target.value })}>
            {RANGES.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}
          </select>
          {draft.range === "custom" && (
            <span className="ahv-pair">
              <input type="date" className="ahv-input" value={draft.from} aria-label="From (UTC)" aria-invalid={reversed || undefined}
                onChange={(e) => setDraft({ ...draft, from: e.target.value })} />
              <input type="date" className="ahv-input" value={draft.to} aria-label="To (UTC)" aria-invalid={reversed || undefined}
                onChange={(e) => setDraft({ ...draft, to: e.target.value })} />
            </span>
          )}
          <button type="button" className="ahv-button ahv-button-main" disabled={reversed} onClick={() => apply({ draft })}>Search</button>
        </div>
        {reversed && <em className="ahv-bad ahv-small">The end date is before the start date</em>}

        <div className="ahv-bar ahv-add">
          <span className="ahv-dim ahv-small">Add</span>
          {fieldsOf(kind).filter((f) => !(entity && (f.field === "on" || (kind === "requests" && f.field === "actor")))).slice(0, 8).map((f) => (
            <button key={f.field} type="button" className="ahv-link-button" title={f.hint} onClick={() => addField(f.field)}>{f.label}</button>
          ))}
          {unapplied && <span className="ahv-warn ahv-small ahv-push-right">Not searched yet: press Enter or Search</span>}
        </div>

        {(terms(applied.q).length > 0 || applied.range !== defaultRange(entity)) && (
          <div className="ahv-applied">
            {terms(applied.q).map((term) => (
              <span key={term.text} className={cx("ahv-pill", term.negated && "ahv-pill-not")}>
                <span className="ahv-dim">{term.negated ? "Not " : ""}{term.field ? `${fieldLabel(term.field)}:` : "Text:"}</span> {chipValue(term)}
                <button type="button" aria-label={`Remove ${term.text}`} onClick={() => apply({ draft: { ...applied, q: without(applied.q, term) } })}>
                  <Icon name="close" size={12} />
                </button>
              </span>
            ))}
            {applied.range !== defaultRange(entity) && (
              <span className="ahv-pill">
                <span className="ahv-dim">When:</span>{" "}
                {applied.range === "custom"
                  ? [applied.from && dayText(toMs(dayStart(applied.from))), applied.to && dayText(toMs(dayStart(applied.to)))].filter(Boolean).join(" – ") || "Any date"
                  : RANGES.find((r) => r.value === applied.range)?.label}
                <button type="button" aria-label="Remove the time range"
                  onClick={() => apply({ draft: { ...applied, range: defaultRange(entity), from: "", to: "" } })}>
                  <Icon name="close" size={12} />
                </button>
              </span>
            )}
            <button type="button" className="ahv-link-button" onClick={() => apply({ preset: 0, draft: draftOf(new URLSearchParams(), entity) })}>Clear all</button>
          </div>
        )}
      </div>

      {chart.error && !chart.data ? null : <ActivityChart chart={chart.data} noun={noun} loading={chart.loading} />}
      {notice && <Message action={<button type="button" className="ahv-icon-button" aria-label="Dismiss" onClick={() => setNotice(null)}><Icon name="close" size={14} /></button>}>{notice}</Message>}
      {list.error && rows.length > 0 && (
        <Message tone="bad" action={<button type="button" className="ahv-button" onClick={list.refresh}>Retry</button>}>
          Couldn't load newer activity: {list.error.message}
        </Message>
      )}

      {list.error && !rows.length ? (
        <Message tone="bad" action={<button type="button" className="ahv-button" onClick={list.refresh}>Retry</button>}>{list.error.message}</Message>
      ) : list.loading ? <Skeleton /> : !rows.length ? (
        <div className="ahv-empty">
          <Icon name="log" size={28} />
          <strong>No {noun} match</strong>
          <span className="ahv-dim">{kind === "events" && view === "important" ? "Try All, or a wider time range." : "Try a wider time range or fewer filters."}</span>
        </div>
      ) : (
        <div className="ahv-table-wrap" ref={scroller}>
          <table className="ahv-table">
            <thead>
              <tr>
                <th>When (UTC)</th><th>Who</th><th>{kind === "events" ? "What happened" : "Request"}</th>
                {optional.map((c) => <th key={c.key}>{c.label}</th>)}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <Fragment key={row.id}>
                  {row.occurred_at.slice(0, 10) !== rows[index - 1]?.occurred_at.slice(0, 10) && (
                    <tr className="ahv-day"><td colSpan={span}>{dayLabel(row.occurred_at)}</td></tr>
                  )}
                  <tr tabIndex={0} className={cx("ahv-row", isEvent(row) && row.outcome !== "success" && "ahv-row-problem")}
                    onClick={() => setSelected(row)}
                    onKeyDown={(e) => { if (e.target === e.currentTarget && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); setSelected(row) } }}>
                    <td><When value={row.occurred_at} seal={sealOf(row)} /></td>
                    <td><Who row={row} actorTypes={actorTypes}
                      onFocus={entity && kind === "requests" ? undefined : () => focus({ actor_id: row.actor_id })} /></td>
                    <td>{isEvent(row) ? <EventLine row={row} /> : <CallLine row={row} />}</td>
                    {optional.map((c) => (
                      <td key={c.key} className="ahv-cell">
                        {c.key === "where" ? <Where row={row} />
                          : c.key === "service" ? <span className="ahv-dim">{words(row.service)}</span>
                          : c.key === "ip" ? <span className="ahv-mono ahv-dim">{row.ip || "—"}</span>
                          : !isEvent(row) ? null
                          : c.key === "result" ? (row.outcome === "success" ? <span className="ahv-dim">success</span> : <OutcomeTag outcome={row.outcome} />)
                          : row.target_type ? <span>{entities[row.target_type] ?? words(row.target_type)} <span className="ahv-mono">{row.target_name || row.target_id}</span></span>
                          : "—"}
                      </td>
                    ))}
                  </tr>
                </Fragment>
              ))}
            </tbody>
          </table>
          <div ref={end} aria-hidden="true" />
        </div>
      )}

      {rows.length > 0 && (
        <footer className="ahv-foot">
          <span className="ahv-dim ahv-num">
            {plural(rows.length, noun.slice(0, -1))} shown
            {live ? " · Live keeps the newest page" : list.trimmed ? " · the newest were let go to keep the list light; Refresh brings them back"
              : !list.hasMore ? " · that is all of them" : ""}
          </span>
          {more.error && <span className="ahv-bad ahv-small">Couldn't load more: {more.error.message}</span>}
          {list.hasMore && (
            <button type="button" className="ahv-button" onClick={loadMore} disabled={more.loading}>{more.loading ? "Loading…" : "Load more"}</button>
          )}
        </footer>
      )}

      <ActivityDetail request={request} row={selected} onClose={() => setSelected(null)}
        onFocus={entity ? undefined : focus} actorTypes={actorTypes} entities={catalog.data?.entities}
        seal={selected ? sealOf(selected) : null} />
    </div>
  )
}
