import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react"
import { createPortal } from "react-dom"
import type { ActivityEvent, ActivityRequest, ApiCall, EventDetail, Focus, Page, Row } from "./types"
import { isEvent } from "./types"
import { Icon } from "./icons"
import { useRemote } from "./remote"
import { dayText, sentenceCase, timeOfDay, toMs, words } from "./format"
import {
  CallLine, ChangeTable, Facts as Chips, KeyValues, Message, MethodTag, OutcomeTag, Skeleton, StatusTag, actorLabelOf, actorOf,
  cx, sealText,
} from "./parts"

const SAME_REQUEST_LIMIT = 200

/** Where the panel opens: the page's body, or a shadow root when the viewer runs inside an element. */
export const PanelHost = createContext<Element | null>(null)

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="ahv-section">
      <h3>{title}</h3>
      {children}
    </section>
  )
}

const Facts = KeyValues

function Changes({ event }: { event: ActivityEvent }) {
  const list = event.change_list
  if (!list?.length) return null
  const created = list.every((c) => c.before === null)
  const deleted = list.every((c) => c.after === null)
  return (
    <Section title={created ? "Recorded values" : deleted ? "Values removed" : "Changes"}>
      <ChangeTable changes={list} />
    </Section>
  )
}

function Copy({ text }: { text: string }) {
  const [done, setDone] = useState(false)
  return (
    <button type="button" className="ahv-button ahv-button-quiet" onClick={() => {
      navigator.clipboard?.writeText(text).then(() => { setDone(true); setTimeout(() => setDone(false), 1500) })
    }}>
      <Icon name={done ? "check" : "copy"} size={14} />{done ? "Copied" : "Copy"}
    </button>
  )
}

function Raw({ row }: { row: Row }) {
  const [open, setOpen] = useState(false)
  const { children: _children, details: _details, ...stored } = row as ActivityEvent
  const text = JSON.stringify(stored, null, 2)
  return (
    <section className="ahv-section">
      <div className="ahv-row-between">
        <button type="button" className="ahv-disclose" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
          <Icon name="chevronDown" size={14} className={cx(open && "ahv-turned")} />Full record (JSON)
        </button>
        <Copy text={text} />
      </div>
      {open && <pre className="ahv-pre">{text}</pre>}
    </section>
  )
}

/** Everything recorded while serving the same request, oldest first; the open one is marked. */
function SameRequest({ open, events, calls, onOpen }: {
  open: Row; events: ActivityEvent[]; calls: ApiCall[]; onOpen: (row: Row) => void
}) {
  const rows: Row[] = [...events, ...calls].sort((a, b) => a.occurred_at.localeCompare(b.occurred_at))
  if (!rows.length) return <p className="ahv-dim">Nothing else was recorded for this request.</p>
  return (
    <ol className="ahv-list">
      {rows.map((row) => (
        <li key={row.id}>
          <button type="button" disabled={row.id === open.id} onClick={() => onOpen(row)}>
            <span className="ahv-mono ahv-dim">{timeOfDay(row.occurred_at)}</span>
            {isEvent(row) ? (
              <span className="ahv-what"><span className="ahv-sentence">{row.summary}</span><OutcomeTag outcome={row.outcome} /></span>
            ) : <CallLine row={row} />}
          </button>
        </li>
      ))}
    </ol>
  )
}

function useRequestRows(request: ActivityRequest, row: Row) {
  const event = isEvent(row)
  // an event's detail brings its request along; an API call's request is searched for
  return useRemote<EventDetail | { same_request: ActivityEvent[]; requests: ApiCall[] }>(`${row.id}`, async () => {
    if (event) return request(`events/${row.id}`, { method: "GET" })
    if (!row.request_id) return { same_request: [], requests: [] }
    const ask = (kind: string) => request("search", {
      method: "POST", body: { kind, filters: { request_id: row.request_id }, limit: SAME_REQUEST_LIMIT },
    }) as Promise<Page>
    const [events, calls] = await Promise.all([ask("events"), ask("requests")])
    return { same_request: events.items as ActivityEvent[], requests: (calls.items as ApiCall[]).filter((c) => c.id !== row.id) }
  })
}

type DetailProps = {
  request: ActivityRequest
  row: Row | null
  onClose: () => void
  /** narrows the log to a person or an entity; left out where that cannot apply */
  onFocus?: (focus: Focus) => void
  actorTypes?: Record<string, string>
  entities?: Record<string, string>
  /** whether the record's minute is sealed yet */
  seal?: "sealed" | "waiting" | null
}

/** The side panel for one record: what happened in full, and everything around it. */
export function ActivityDetail({ request, row, onClose, onFocus, actorTypes, entities, seal }: DetailProps) {
  const [shown, setShown] = useState<Row | null>(row)
  useEffect(() => setShown(row), [row])
  const closer = useRef<HTMLButtonElement>(null)
  const panel = useRef<HTMLElement>(null)
  const close = useRef(onClose)
  close.current = onClose
  const open = shown !== null
  useEffect(() => {
    if (!open) return
    // inside a shadow root the page only sees the host element: ask the panel's own root
    const root = (closer.current?.getRootNode() ?? document) as Document | ShadowRoot
    const before = (root.activeElement ?? document.activeElement) as HTMLElement | null
    closer.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        // the panel is the top layer: a sheet or dialog under it stays open
        e.stopPropagation()
        close.current()
      } else if (e.key === "Tab" && panel.current) {
        const focusable = [...panel.current.querySelectorAll<HTMLElement>("button:not(:disabled), [href], input, select, [tabindex]:not([tabindex='-1'])")]
        const active = root.activeElement
        if (!focusable.length) return
        if (e.shiftKey && active === focusable[0]) { e.preventDefault(); focusable[focusable.length - 1].focus() }
        else if (!e.shiftKey && active === focusable[focusable.length - 1]) { e.preventDefault(); focusable[0].focus() }
        else if (!panel.current.contains(active as Node)) { e.preventDefault(); focusable[0].focus() }
      }
    }
    window.addEventListener("keydown", onKey, true)
    return () => {
      window.removeEventListener("keydown", onKey, true)
      before?.focus?.()   // back to the row that opened it
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])
  const host = useContext(PanelHost)
  if (!shown) return null
  return createPortal(
    <div className="ahv ahv-drawer-layer">
      <div className="ahv-backdrop" onClick={onClose} />
      <aside ref={panel} className="ahv-drawer" role="dialog" aria-modal="true" aria-label="Activity details">
        <button ref={closer} type="button" className="ahv-icon-button ahv-drawer-close" onClick={onClose} aria-label="Close">
          <Icon name="close" />
        </button>
        <Body key={shown.id} request={request} row={shown} onOpen={setShown} onFocus={onFocus}
          actorTypes={actorTypes} entities={entities} seal={shown === row ? seal : null} />
      </aside>
    </div>,
    host ?? document.body,
  )
}

function Body({ request, row, onOpen, onFocus, actorTypes, entities = {}, seal }: Omit<DetailProps, "row" | "onClose"> & {
  row: Row; onOpen: (row: Row) => void
}) {
  const around = useRequestRows(request, row)
  // the detail route returns the event with its details labelled
  const event = isEvent(row) ? ((around.data as EventDetail | undefined)?.event ?? row) : null
  const name = actorOf(row)
  const target = event?.target_type
    ? `${entities[event.target_type] ?? words(event.target_type)} ${event.target_name || event.target_id}` : ""
  const when = `${dayText(toMs(row.occurred_at))}, ${timeOfDay(row.occurred_at)} UTC`

  return (
    <div className="ahv-drawer-body">
      <header className="ahv-drawer-head">
        {event ? (
          <>
            <div className="ahv-tags">
              <span className="ahv-tag">{event.title}</span>
              <OutcomeTag outcome={event.outcome} />
              {event.importance === "high" && <span className="ahv-tag ahv-tag-accent">Worth attention</span>}
              {event.imported && <span className="ahv-tag">Imported</span>}
            </div>
            <h2>{event.summary}</h2>
            <Chips facts={event.facts} />
          </>
        ) : (
          <>
            <div className="ahv-tags"><MethodTag method={(row as ApiCall).method} /><StatusTag status={(row as ApiCall).status} /></div>
            <h2 className="ahv-mono">{(row as ApiCall).route}</h2>
          </>
        )}
        <p className="ahv-dim">{name} · {actorLabelOf(row, actorTypes)} · {when}</p>
        {onFocus && (
          <div className="ahv-actions">
            {row.actor_id && (
              <button type="button" className="ahv-button" onClick={() => onFocus({ actor_id: row.actor_id })}>
                <Icon name="user" size={14} />All by {name}
              </button>
            )}
            {event?.target_type && (
              <button type="button" className="ahv-button"
                onClick={() => onFocus({ target_type: event.target_type, target_id: event.target_id })}>
                <Icon name="history" size={14} />Timeline of {target}
              </button>
            )}
          </div>
        )}
      </header>

      {event ? (
        <>
          {event.outcome !== "success" && event.reason && <Section title="Reason"><p>{event.reason}</p></Section>}
          <Changes event={event} />
          {event.details?.length ? (
            <Section title="Details">
              <Facts items={event.details.map((d) => [d.label, d.value])} />
            </Section>
          ) : event.metadata && !around.loading ? (
            <Section title="Details">
              <Facts items={Object.entries(event.metadata).map(([k, v]) => [sentenceCase(words(k)), v])} />
            </Section>
          ) : null}
          {(target || event.related.length > 0) && (
            <Section title="Concerns">
              <Facts items={[["Target", target],
                ...event.related.map(([type, id]): [string, unknown] => [sentenceCase(entities[type] ?? words(type)), id])]} />
            </Section>
          )}
        </>
      ) : (
        <>
          <Section title="Request">
            <Facts items={[["Path", (row as ApiCall).path], ["Took", `${(row as ApiCall).duration_ms} ms`], ["Service", words(row.service)]]} />
          </Section>
          {(row as ApiCall).request_body && (
            <Section title="Sent (secrets masked)">
              <pre className="ahv-pre">{JSON.stringify((row as ApiCall).request_body, null, 2)}</pre>
            </Section>
          )}
        </>
      )}

      {row.request_id && (
        <Section title="Same request">
          {around.error ? <Message tone="bad" action={<button type="button" className="ahv-button" onClick={around.refresh}>Retry</button>}>
            Couldn't load: {around.error.message}</Message>
            : around.loading && !around.data ? <Skeleton rows={2} />
            : <SameRequest open={row} events={around.data?.same_request ?? []} calls={around.data?.requests ?? []} onOpen={onOpen} />}
        </Section>
      )}

      <Section title="Who and from where">
        <Facts items={[
          ["Who", `${name} (${actorLabelOf(row, actorTypes)}${row.actor_id && row.actor_id !== name ? ` ${row.actor_id}` : ""})`],
          ["App", row.origin && words(row.origin)],
          ["Country", row.country],
          ["IP address", row.ip],
          ["Device", event ? event.device : row.user_agent],
          ["Session", row.session_id],
          ["Company", row.tenant_id],
          ["Service", words(row.service)],
        ]} />
      </Section>
      <Section title="Reference">
        <Facts items={[
          ["Record id", row.id],
          ["Request id", row.request_id],
          ["Recorded", `${row.received_at} UTC`],
          ["Integrity", sealText(seal ?? null)],
          ...(event ? [["Action", event.action] as [string, unknown]] : []),
        ]} />
      </Section>
      <Raw row={event ?? row} />
    </div>
  )
}
