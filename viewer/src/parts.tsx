import type { ReactNode } from "react"
import type { ActivityEvent, ApiCall, Change, Fact, Row } from "./types"
import { isEvent } from "./types"
import { Icon } from "./icons"
import { initials, relativeTime, requestActor, sentenceCase, timeOfDay, words } from "./format"

export const cx = (...names: (string | false | null | undefined)[]) => names.filter(Boolean).join(" ")

export const actorOf = (row: Row) => (isEvent(row) ? row.actor : requestActor(row))
export const actorLabelOf = (row: Row, actorTypes: Record<string, string> = {}) =>
  isEvent(row) ? row.actor_label : actorTypes[row.actor_type] || sentenceCase(words(row.actor_type)) || "Unknown"

const SEAL_TEXT = {
  sealed: "Sealed: kept unchanged since its minute ended",
  waiting: "Waiting for its seal: each minute is sealed two minutes after it ends",
}

export function When({ value, seal }: { value: string; seal?: "sealed" | "waiting" | null }) {
  return (
    <span className="ahv-when" title={`${value} UTC`}>
      <span className="ahv-mono">
        {timeOfDay(value)}
        {seal && (
          <span className={cx("ahv-seal", seal === "waiting" && "ahv-seal-waiting")} title={SEAL_TEXT[seal]} aria-label={SEAL_TEXT[seal]}>
            <Icon name={seal === "sealed" ? "shield" : "history"} size={11} />
          </span>
        )}
      </span>
      <span className="ahv-dim">{relativeTime(value)}</span>
    </span>
  )
}

export const sealText = (seal: "sealed" | "waiting" | null) => (seal ? SEAL_TEXT[seal] : "")

/** A value in a row that narrows the log to itself; the row's own click still opens its details. */
export function FocusLink({ onClick, title, children }: { onClick?: () => void; title: string; children: ReactNode }) {
  if (!onClick) return <>{children}</>
  return (
    <button type="button" className="ahv-link" title={title}
      onClick={(e) => { e.stopPropagation(); onClick() }} onKeyDown={(e) => e.stopPropagation()}>
      {children}
    </button>
  )
}

export function Who({ row, actorTypes, onFocus }: { row: Row; actorTypes?: Record<string, string>; onFocus?: () => void }) {
  const name = actorOf(row)
  const label = actorLabelOf(row, actorTypes)
  // the login number when the name is something else (an email, a staff name)
  const id = row.actor_type !== "system" && row.actor_id && row.actor_id !== name ? row.actor_id : ""
  return (
    <span className="ahv-who">
      <span className={cx("ahv-avatar", row.actor_type === "system" && "ahv-avatar-system")} aria-hidden="true">{initials(name)}</span>
      <span className="ahv-stack">
        <FocusLink title={`Only activity by ${name}`} onClick={row.actor_id ? onFocus : undefined}>
          <span className="ahv-strong ahv-clip">{name}</span>
        </FocusLink>
        <span className="ahv-dim ahv-clip">{[label, id].filter(Boolean).join(" · ")}</span>
      </span>
    </span>
  )
}

export function Where({ row }: { row: Row }) {
  return (
    <span className="ahv-where">
      {row.origin && <span className="ahv-tag">{words(row.origin)}</span>}
      {row.country && <span className="ahv-dim" title={row.ip || undefined}>{row.country}</span>}
    </span>
  )
}

export function OutcomeTag({ outcome }: { outcome: string }) {
  if (outcome === "success") return null
  return <span className={cx("ahv-tag", outcome === "failed" ? "ahv-tag-bad" : "ahv-tag-warn")}>{outcome}</span>
}

const statusTone = (status: number) => (status >= 500 ? "ahv-tag-bad" : status >= 400 ? "ahv-tag-warn" : "ahv-tag-ok")
export const StatusTag = ({ status }: { status: number }) => <span className={cx("ahv-tag ahv-mono", statusTone(status))}>{status}</span>
export const MethodTag = ({ method }: { method: string }) => <span className={cx("ahv-tag ahv-mono", `ahv-method-${method.toLowerCase()}`)}>{method}</span>

/** What happened, in one sentence, with what is worth seeing next to it. */
export function EventLine({ row }: { row: ActivityEvent }) {
  const folded = row.children_count ?? row.children?.length ?? 0
  return (
    <span className="ahv-what">
      {row.importance === "high" && row.outcome === "success" && <span className="ahv-mark" title="Worth attention" />}
      {row.outcome !== "success" && <Icon name="alert" size={14} className={row.outcome === "failed" ? "ahv-bad" : "ahv-warn"} />}
      <span className="ahv-sentence">{row.summary}</span>
      {folded > 0 && (
        <span className="ahv-count" title={`${folded} record change${folded === 1 ? "" : "s"} made by the same request`}>
          <Icon name="layers" size={12} />{folded}
        </span>
      )}
    </span>
  )
}

export function CallLine({ row }: { row: ApiCall }) {
  return (
    <span className="ahv-what">
      <MethodTag method={row.method} />
      <span className="ahv-mono ahv-clip">{row.route}</span>
      <StatusTag status={row.status} />
      <span className="ahv-dim ahv-num">{row.duration_ms} ms</span>
    </span>
  )
}

export function Message({ tone = "plain", children, action }: { tone?: "plain" | "bad"; children: ReactNode; action?: ReactNode }) {
  return (
    <div className={cx("ahv-message", tone === "bad" && "ahv-message-bad")} role={tone === "bad" ? "alert" : undefined}>
      <span>{children}</span>
      {action}
    </div>
  )
}

export function Skeleton({ rows = 6 }: { rows?: number }) {
  return <div className="ahv-skeleton" aria-busy="true">{Array.from({ length: rows }, (_, i) => <span key={i} />)}</div>
}

/** A step's key values as chips: [SELL 0.6] [@ 0.97496] [SL 0.97726]. */
export function Facts({ facts }: { facts?: Fact[] }) {
  if (!facts?.length) return null
  return (
    <span className="ahv-chips-row">
      {facts.map((fact, i) => (
        <span key={i} className="ahv-fact">{fact.label && <span className="ahv-dim">{fact.label}</span>}<span className="ahv-mono">{fact.value}</span></span>
      ))}
    </span>
  )
}

// a value longer than this takes a whole row, so it does not stretch the pair beside it
const WIDE_VALUE = 36

/** Label and value pairs in a grid: two pairs a row where there is room, one on a narrow screen.
 * Empty values are left out. */
export function KeyValues({ items, mono = false }: { items: [string, unknown][]; mono?: boolean }) {
  const shown = items.filter(([, value]) => value !== null && value !== undefined && value !== "")
  if (!shown.length) return null
  return (
    <dl className="ahv-pairs">
      {shown.map(([label, value], i) => {
        const text = typeof value === "object" ? JSON.stringify(value) : String(value)
        return (
          <div key={`${label}-${i}`} className={cx("ahv-pair-cell", text.length > WIDE_VALUE && "ahv-pair-wide")}>
            <dt>{label}</dt>
            <dd className={cx(mono && "ahv-mono")}>{text}</dd>
          </div>
        )
      })}
    </dl>
  )
}

/** What a change did, field by field: the values a new record was given, those a removed one had,
 * or each field's before and after. */
export function ChangeTable({ changes, valueLabel = "Value" }: { changes: Change[]; valueLabel?: string }) {
  if (!changes.length) return null
  const created = changes.every((c) => c.before === null)
  const deleted = changes.every((c) => c.after === null)
  if (created || deleted) {
    // a record's values: the ones it has, the empty ones counted
    const given = changes.filter((c) => (created ? c.after : c.before) !== null)
    const empty = changes.length - given.length
    return (
      <div className="ahv-stack-gap">
        {valueLabel !== "Value" && <span className="ahv-eyebrow">{valueLabel}</span>}
        <KeyValues items={given.map((c) => [c.label, created ? c.after : c.before])} mono />
        {empty > 0 && <span className="ahv-dim ahv-small">{empty} empty field{empty === 1 ? "" : "s"} not shown</span>}
      </div>
    )
  }
  return (
    <div className="ahv-scroll-x">
      <table className="ahv-changes">
        <thead><tr><th>Field</th><th>Before</th><th>After</th></tr></thead>
        <tbody>
          {changes.map((c) => (
            <tr key={c.field}>
              <td className="ahv-field-name">{c.label}</td>
              <td className="ahv-mono ahv-before">{c.before ?? "—"}</td>
              <td className="ahv-mono ahv-after">{c.after ?? "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
