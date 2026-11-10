import { useState, type ReactNode } from "react"
import type { ActivityEvent, ActivityRequest, Catalog, Page, Row } from "./types"
import { useRemote } from "./remote"
import { dayText, relativeTime, timeOfDay, toMs, words } from "./format"
import { ActivityDetail } from "./ActivityDetail"
import { Icon } from "./icons"
import { Message, Skeleton, cx } from "./parts"

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
  /** shown under the last step when older steps were left out, e.g. a link to the full log */
  more?: ReactNode
  className?: string
}

/** One entity's story, oldest first: each step as a sentence, its row changes inside it, and the
 * detail of any step one click away. */
export function ActivityTimeline({ request, entity, view = "all", action, newestFirst = false, more, className }: ActivityTimelineProps) {
  // no story to tell until both are known: never the whole log
  const key = entity.type && entity.id ? `${entity.type}:${entity.id}:${view}:${action ?? ""}` : null
  const steps = useRemote<Page<ActivityEvent>>(key, () => request("search", {
    method: "POST",
    body: { kind: "events", filters: {}, related_type: entity.type, related_id: entity.id, view, action, limit: LIMIT },
  }))
  const catalog = useRemote<Catalog>("catalog", () => request("catalog", { method: "GET" }))
  const [selected, setSelected] = useState<Row | null>(null)
  const items = steps.data?.items ?? []
  const events = newestFirst ? items : [...items].reverse()

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
          {steps.data?.next_cursor && <p className="ahv-dim ahv-small">Showing the newest {LIMIT} steps.{more && <> {more}</>}</p>}
          <ol className="ahv-steps">
            {events.map((event) => {
              const tone = event.outcome === "failed" ? "bad" : event.outcome === "refused" ? "warn"
                : event.importance === "high" ? "accent" : "plain"
              const folded = event.children_count ?? event.children?.length ?? 0
              return (
                <li key={event.id} className={`ahv-step ahv-step-${tone}`}>
                  <span className="ahv-step-dot" aria-hidden="true" />
                  <button type="button" className="ahv-step-body" onClick={() => setSelected(event)}>
                    <span className="ahv-step-top">
                      <span className="ahv-strong">{event.title}</span>
                      <span className="ahv-dim ahv-num" title={`${event.occurred_at} UTC`}>
                        {dayText(toMs(event.occurred_at))}, {timeOfDay(event.occurred_at)} · {relativeTime(event.occurred_at)}
                      </span>
                    </span>
                    <span className="ahv-sentence">{event.summary}</span>
                    <span className="ahv-dim ahv-small">
                      {[`${event.actor} · ${event.actor_label}`, event.origin && words(event.origin), event.country, event.ip]
                        .filter(Boolean).join(" · ")}
                      {folded > 0 && <> · <Icon name="layers" size={12} /> {folded} record change{folded === 1 ? "" : "s"}</>}
                    </span>
                  </button>
                </li>
              )
            })}
          </ol>
        </>
      )}
      <ActivityDetail request={request} row={selected} onClose={() => setSelected(null)}
        actorTypes={catalog.data?.actor_types} entities={catalog.data?.entities} />
    </div>
  )
}
