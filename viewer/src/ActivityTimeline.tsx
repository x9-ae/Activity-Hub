import { useState, type ReactNode } from "react"
import type { ActivityEvent, ActivityRequest, Catalog, Page, Row } from "./types"
import { useRemote } from "./remote"
import { dayText, initials, relativeTime, timeOfDay, toMs, words } from "./format"
import { ActivityDetail } from "./ActivityDetail"
import { Icon, type IconName } from "./icons"
import { ChangeTable, Facts, KeyValues, Message, OutcomeTag, Skeleton, cx } from "./parts"

const LIMIT = 500

export type ActivityTimelineProps = {
  request: ActivityRequest
  /** the entity whose story this is, e.g. {type: "ticket", id: "32101"} */
  entity: { type: string; id: string }
  /** "all" keeps every step; "important" leaves out the details */
  view?: "all" | "important"
  /** only these actions: "user.signed_in", or "user." for every user action */
  action?: string
  /** newest first, for a feed such as sign-ins; a story reads oldest first */
  newestFirst?: boolean
  /** shown above the steps, from the same events: e.g. a summary of the ticket as it stands */
  header?: (events: ActivityEvent[], partial: boolean) => ReactNode
  /** shown under the last step when older steps were left out, e.g. a link to the full log */
  more?: ReactNode
  className?: string
}

/** One entity's story: each step with who did it, from where and its key values, its changes and
 * the record changes behind it one click away, and its full detail on its title. */
export function ActivityTimeline({ request, entity, view = "all", action, newestFirst = false, header, more, className }: ActivityTimelineProps) {
  // no story to tell until both are known: never the whole log
  const key = entity.type && entity.id ? `${entity.type}:${entity.id}:${view}:${action ?? ""}` : null
  const steps = useRemote<Page<ActivityEvent>>(key, () => request("search", {
    method: "POST",
    body: { kind: "events", filters: {}, related_type: entity.type, related_id: entity.id, view, action, limit: LIMIT, details: true },
  }))
  const catalog = useRemote<Catalog>("catalog", () => request("catalog", { method: "GET" }))
  const [selected, setSelected] = useState<Row | null>(null)
  const items = steps.data?.items ?? []
  const events = newestFirst ? items : [...items].reverse()
  const partial = Boolean(steps.data?.next_cursor)

  return (
    <div className={cx("ahv ahv-timeline", className)}>
      {steps.error ? (
        <Message tone="bad" action={<button type="button" className="ahv-button" onClick={steps.refresh}>Retry</button>}>
          Couldn't load: {steps.error.message}
        </Message>
      ) : steps.loading && !steps.data ? <Skeleton rows={4} /> : !events.length ? (
        <p className="ahv-dim">Nothing has been recorded about this yet.</p>
      ) : (
        <>
          {header?.(items.length ? [...items].reverse() : [], partial)}
          {partial && <p className="ahv-dim ahv-small">Showing the newest {LIMIT} steps.{more && <> {more}</>}</p>}
          <h3 className="ahv-eyebrow">{events.length} step{events.length === 1 ? "" : "s"}, {newestFirst ? "newest" : "oldest"} first</h3>
          <ol className="ahv-steps">
            {events.map((event) => <Step key={event.id} event={event} onOpen={() => setSelected(event)} />)}
          </ol>
        </>
      )}
      <ActivityDetail request={request} row={selected} onClose={() => setSelected(null)}
        actorTypes={catalog.data?.actor_types} entities={catalog.data?.entities} />
    </div>
  )
}

const markOf = (event: ActivityEvent): { icon: IconName; tone: string } => {
  if (event.outcome !== "success") return { icon: "alert", tone: "rose" }
  return { icon: event.icon ?? (event.category === "data" ? "layers" : "log"), tone: event.tone ?? "neutral" }
}

function Step({ event, onOpen }: { event: ActivityEvent; onOpen: () => void }) {
  const [open, setOpen] = useState(false)
  const { icon, tone } = markOf(event)
  const records = event.children ?? []
  const counted = event.children_count ?? records.length
  // an edit's own before and after is what the step did: shown, not folded away
  const edited = event.category !== "data" && event.change_list?.length ? event.change_list : null
  const hasMore = Boolean(event.details?.length) || counted > 0
  return (
    <li className={`ahv-step ahv-tone-${tone}`}>
      <span className="ahv-step-icon" aria-hidden="true"><Icon name={icon} size={14} /></span>
      <div className="ahv-step-main">
        <div className="ahv-step-head">
          <div className="ahv-stack">
            <button type="button" className="ahv-step-title" onClick={onOpen} title="Open the full detail">
              {event.title}<OutcomeTag outcome={event.outcome} />
            </button>
            <ByLine event={event} />
          </div>
          <span className="ahv-step-when" title={`${event.occurred_at} UTC`}>
            <span className="ahv-mono">{timeOfDay(event.occurred_at)}</span>
            <span className="ahv-dim">{relativeTime(event.occurred_at) || dayText(toMs(event.occurred_at))}</span>
          </span>
        </div>
        {event.outcome !== "success" ? (
          <p className="ahv-step-problem">{event.summary}</p>
        ) : event.facts?.length ? <Facts facts={event.facts} />
          : !edited && event.summary !== event.title ? <p className="ahv-sentence">{event.summary}</p> : null}
        {edited && <ChangeTable changes={edited} valueLabel="Set to" />}
        {hasMore && (
          <button type="button" className="ahv-disclose" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
            <Icon name="chevronDown" size={13} className={cx(open && "ahv-turned")} />
            {open ? "Hide" : [event.details?.length && "Details", counted > 0 && `${counted} record change${counted === 1 ? "" : "s"}`]
              .filter(Boolean).join(" and ")}
          </button>
        )}
        {open && (
          <div className="ahv-step-more">
            {event.details?.length ? <KeyValues items={event.details.map((d) => [d.label, d.value])} mono /> : null}
            {counted > 0 && <RecordChanges records={records} counted={counted} onOpen={onOpen} />}
          </div>
        )}
      </div>
    </li>
  )
}

/** Who did a step and from where, on one line. */
function ByLine({ event }: { event: ActivityEvent }) {
  return (
    <span className="ahv-byline">
      <span className={cx("ahv-avatar ahv-avatar-small", event.actor_type === "system" && "ahv-avatar-system")} aria-hidden="true">
        {initials(event.actor)}
      </span>
      {[event.actor, event.actor_label, event.origin && words(event.origin).toUpperCase(),
        event.actor_type !== "system" && event.device, event.country, event.ip]
        .filter(Boolean).map((part, i) => <span key={i} className={cx(i === 0 ? "ahv-strong" : "ahv-sep")}>{part}</span>)}
    </span>
  )
}

/** The record changes a step's request made: one row each, its fields a click away. */
function RecordChanges({ records, counted, onOpen }: { records: ActivityEvent[]; counted: number; onOpen: () => void }) {
  const [shown, setShown] = useState<string | null>(null)
  return (
    <div className="ahv-records">
      <table className="ahv-changes ahv-records-table">
        <thead><tr><th>Record</th><th>Change</th><th>Fields</th></tr></thead>
        <tbody>
          {records.map((record) => {
            const fields = record.change_list ?? []
            const isOpen = shown === record.id
            return (
              <RecordRow key={record.id} record={record} fields={fields.length} open={isOpen}
                onToggle={() => setShown(isOpen ? null : record.id)}>
                {isOpen && <tr className="ahv-records-fields"><td colSpan={3}><ChangeTable changes={fields} /></td></tr>}
              </RecordRow>
            )
          })}
        </tbody>
      </table>
      {counted > records.length && (
        <button type="button" className="ahv-link-button" onClick={onOpen}>
          {counted - records.length} more in the full detail
        </button>
      )}
    </div>
  )
}

function RecordRow({ record, fields, open, onToggle, children }: {
  record: ActivityEvent; fields: number; open: boolean; onToggle: () => void; children: ReactNode
}) {
  const change = record.action === "data.created" ? "Created" : record.action === "data.deleted" ? "Deleted" : "Updated"
  return (
    <>
      <tr>
        <td>
          <button type="button" className="ahv-disclose" aria-expanded={open} disabled={!fields} onClick={onToggle}>
            <Icon name="chevronRight" size={12} className={cx(open && "ahv-turned-right")} />
            {record.summary.replace(/^(Created|Updated|Deleted) /, "").split(":")[0]}
          </button>
        </td>
        <td>{change}</td>
        <td className="ahv-dim">
          {record.action === "data.updated"
            ? (record.change_list ?? []).slice(0, 3).map((c) => c.label).join(", ") + (fields > 3 ? ` and ${fields - 3} more` : "")
            : `${fields} value${fields === 1 ? "" : "s"}`}
        </td>
      </tr>
      {children}
    </>
  )
}
