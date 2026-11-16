import { useRef, useState } from "react"
import type { ActivityRequest } from "./types"
import { Icon } from "./icons"
import { download } from "./export"
import { cx } from "./parts"
import { useRemote } from "./remote"

// a table sealed longer ago than this is behind: a minute with records is sealed two minutes after it
// ends, and a quiet table still gets an hourly checkpoint
const BEHIND_MINUTES = 65
const TABLES: Record<string, string> = { events: "Events", access_logs: "Requests" }
const SHOWN_PROBLEMS = 20

export type Status = {
  sealed_until?: Record<string, string>
  recording?: boolean
  stats?: { queued?: number; spooled?: number; write_errors?: number }
  last_daily?: { day: string; ok: boolean | null; problems?: number } | null
  /** whether this person may run the checks: they cover every record */
  checks?: boolean
}

type Problem = { table: string; window_start: string; problem: string }
type Verdict =
  | { kind: "day"; day: string; ok: boolean; checked: number; rows: number; problems: Problem[]; more: number }
  | { kind: "proof"; name: string; day: string; ok: boolean; mismatches: { table: string; window_start: string; problem: string }[] }
  | { kind: "downloaded"; day: string }
  | { kind: "error"; message: string }

const minutesAgo = (stamp: string, now = Date.now()) => (now - Date.parse(`${stamp.replace(" ", "T")}:00Z`)) / 60_000
const yesterday = () => new Date(Date.now() - 86_400_000).toISOString().slice(0, 10)

/** Whether a record is in a sealed minute: sealing covers whole minutes of when records arrived. */
export function sealState(receivedAt: string, table: "events" | "access_logs", status?: Status): "sealed" | "waiting" | null {
  const until = status?.sealed_until?.[table]
  if (!until) return null
  return receivedAt.slice(0, 16) <= until ? "sealed" : "waiting"
}

/** How the record stands: whether it records, what waits to be written, until when it is sealed and
 * the last daily check; and, for those allowed, a check of any day against its seals, the day's proof
 * to keep, and a check of a kept proof against the database (which catches a rewrite of records and
 * seals together). */
export function IntegrityStatus({ request, status }: { request: ActivityRequest; status?: Status }) {
  const [open, setOpen] = useState(false)
  const [day, setDay] = useState(yesterday)
  const [busy, setBusy] = useState(false)
  const [verdict, setVerdict] = useState<Verdict | null>(null)
  const picker = useRef<HTMLInputElement>(null)
  // the checks are offered only to those the application lets run them
  const allowed = useRemote<{ allowed: boolean }>(status?.checks ? "integrity" : null,
    () => request("integrity", { method: "GET" }))
  const canCheck = Boolean(status?.checks && allowed.data?.allowed)
  if (!status) return null
  const sealed = Object.entries(status.sealed_until ?? {})
  const daily = status.last_daily
  const waiting = status.stats?.queued
  if (!sealed.length && status.recording === undefined && !daily) return null

  const run = async (work: () => Promise<Verdict>) => {
    setBusy(true)
    try {
      setVerdict(await work())
    } catch (e) {
      setVerdict({ kind: "error", message: (e as Error).message })
    } finally {
      setBusy(false)
    }
  }
  const checkDay = () => run(async () => ({ kind: "day", ...(await request("integrity/verify", { method: "POST", body: { day } })) }))
  const proof = () => run(async () => {
    const record = await request(`integrity/seal/${day}`, { method: "GET" })
    download(`${JSON.stringify(record, null, 2)}\n`, `activity-seal-${day}.json`, "application/json")
    return { kind: "downloaded", day }
  })
  const checkProof = (file: File) => run(async () => {
    let record: { day?: string; seals?: unknown }
    try {
      record = JSON.parse(await file.text())
    } catch {
      record = {}
    }
    if (!record || !Array.isArray(record.seals) || !record.seals.length) {
      throw new Error(`${file.name} is not a seal record: choose a proof downloaded here (activity-seal-<day>.json)`)
    }
    const answer = await request("integrity/check", { method: "POST", body: { record } })
    return { kind: "proof", name: file.name, day: String(record.day ?? ""), ...answer }
  })

  return (
    <div className="ahv-status-wrap">
      <div className="ahv-status" role="status">
        <Icon name="shield" size={14} />
        {status.recording !== undefined && (
          <span className={cx("ahv-tag", status.recording ? "ahv-tag-ok" : "ahv-tag-bad")}>{status.recording ? "Recording" : "Not recording"}</span>
        )}
        {waiting !== undefined && <span>Waiting to be written <strong className="ahv-num">{waiting.toLocaleString()}</strong></span>}
        {sealed.map(([table, until]) => (
          <span key={table} className={cx(minutesAgo(until) > BEHIND_MINUTES && "ahv-warn")}
            title={minutesAgo(until) > BEHIND_MINUTES ? "Sealing is behind" : "Every minute up to this one is sealed"}>
            {TABLES[table] ?? table} sealed through <strong className="ahv-num">{until}</strong>
          </span>
        ))}
        {daily && (
          <span>
            Check of {daily.day}:{" "}
            <strong className={daily.ok === false ? "ahv-bad" : daily.ok ? "ahv-ok" : "ahv-warn"}>
              {daily.ok === false ? `${daily.problems ?? ""} problem(s)`.trim() : daily.ok ? "intact" : "not checked"}
            </strong>
          </span>
        )}
        {canCheck && (
          <button type="button" className="ahv-link-button ahv-push-right" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
            Check integrity
          </button>
        )}
      </div>
      {open && canCheck && (
        <div className="ahv-checks">
          <div className="ahv-bar">
            <label className="ahv-field">
              <span>Day (UTC)</span>
              <input type="date" className="ahv-input" value={day} max={new Date().toISOString().slice(0, 10)} min="2000-01-01"
                onChange={(e) => setDay(e.target.value)} />
            </label>
            <button type="button" className="ahv-button ahv-button-main" disabled={busy || !day} onClick={checkDay}>
              <Icon name="shield" size={14} />{busy ? "Checking…" : "Check this day"}
            </button>
            <button type="button" className="ahv-button" disabled={busy || !day} onClick={proof}
              title="The day's last seal of each table, to keep outside the database">
              <Icon name="download" size={14} />Download proof
            </button>
            <button type="button" className="ahv-button" disabled={busy} title="Compare a proof kept earlier with the database"
              onClick={() => picker.current?.click()}>
              <Icon name="check" size={14} />Check a kept proof
            </button>
            <input ref={picker} type="file" accept="application/json,.json" className="ahv-hidden" tabIndex={-1} aria-hidden="true"
              onChange={(e) => { const file = e.target.files?.[0]; e.target.value = ""; if (file) checkProof(file) }} />
          </div>
          {verdict && <VerdictLine verdict={verdict} />}
        </div>
      )}
    </div>
  )
}

function VerdictLine({ verdict }: { verdict: Verdict }) {
  if (verdict.kind === "error") return <p className="ahv-bad" role="alert">{verdict.message}</p>
  if (verdict.kind === "day") {
    return (
      <div role="status" className={cx("ahv-verdict", verdict.ok ? "ahv-verdict-ok" : "ahv-verdict-bad")}>
        <strong>
          {verdict.ok
            ? `${verdict.day}: intact. ${verdict.rows.toLocaleString()} records in ${verdict.checked.toLocaleString()} sealed minutes match their seals.`
            : `${verdict.day}: ${(verdict.problems.length + verdict.more).toLocaleString()} problem(s) found.`}
        </strong>
        {!verdict.ok && (
          <ul>
            {verdict.problems.slice(0, SHOWN_PROBLEMS).map((p, i) => (
              <li key={i}><span className="ahv-mono">{p.window_start}</span> {TABLES[p.table] ?? p.table}: {p.problem}</li>
            ))}
            {verdict.more > 0 && <li className="ahv-dim">and {verdict.more.toLocaleString()} more</li>}
          </ul>
        )}
      </div>
    )
  }
  if (verdict.kind === "downloaded") {
    return (
      <div role="status" className="ahv-verdict ahv-verdict-ok">
        <strong>Proof of {verdict.day} downloaded. Keep it outside this system: checking it later shows any rewrite since.</strong>
      </div>
    )
  }
  if (!verdict.mismatches.length) {
    return (
      <div role="status" className="ahv-verdict ahv-verdict-ok">
        <strong>{verdict.name}: the database still matches this proof of {verdict.day}.</strong>
      </div>
    )
  }
  return (
    <div role="status" className="ahv-verdict ahv-verdict-bad">
      <strong>{verdict.name}: the database no longer matches this proof of {verdict.day}.</strong>
      <ul>
        {verdict.mismatches.map((m, i) => (
          <li key={i}><span className="ahv-mono">{m.window_start}</span> {TABLES[m.table] ?? m.table}: {m.problem}</li>
        ))}
      </ul>
    </div>
  )
}
