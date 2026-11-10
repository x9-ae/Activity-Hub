import type { ReactNode } from "react"
import type { ActivityEvent, ApiCall, Row } from "./types"
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
