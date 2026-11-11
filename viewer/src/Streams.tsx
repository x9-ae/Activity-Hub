import { useState, type FormEvent } from "react"
import type { ActivityRequest, Kind } from "./types"
import { Icon } from "./icons"
import { cx } from "./parts"
import { relativeTime } from "./format"

type StreamKind = "events" | "requests" | "both"
export type Stream = {
  id: string; name: string; kind: StreamKind; query: string; destination: "webhook" | "s3"
  target: { url?: string; headers?: Record<string, string>; bucket?: string; prefix?: string; region?: string; endpoint?: string }
  enabled: boolean; state: "active" | "failing" | "paused"; error: string; delivered: number
  last_delivered_at: string | null; delivered_through: string | null
}
export type StreamList = { enabled: boolean; streams: Stream[] }

type Draft = {
  id?: string; name: string; kind: StreamKind; query: string; destination: "webhook" | "s3"; url: string; headers: string
  secret: string; bucket: string; prefix: string; region: string; endpoint: string; accessKey: string; secretKey: string
  start: "now" | "beginning"; enabled: boolean
}

const STATES = { active: ["Active", "ahv-tag-ok"], failing: ["Failing", "ahv-tag-bad"], paused: ["Paused", "ahv-tag-warn"] } as const
const RECORDS: Record<StreamKind, string> = { events: "Events", requests: "API requests", both: "Events and API requests" }
const EMPTY: Draft = {
  name: "", kind: "events", query: "", destination: "webhook", url: "", headers: "", secret: "", bucket: "", prefix: "",
  region: "", endpoint: "", accessKey: "", secretKey: "", start: "now", enabled: true,
}

const where = (stream: Stream) => stream.destination === "webhook"
  ? stream.target.url ?? ""
  : `s3://${[stream.target.bucket, stream.target.prefix].filter(Boolean).join("/")}`

const draftOf = (stream: Stream): Draft => ({
  ...EMPTY, id: stream.id, name: stream.name, kind: stream.kind, query: stream.query, destination: stream.destination,
  url: stream.target.url ?? "", headers: Object.keys(stream.target.headers ?? {}).map((name) => `${name}: `).join("\n"),
  bucket: stream.target.bucket ?? "", prefix: stream.target.prefix ?? "", region: stream.target.region ?? "",
  endpoint: stream.target.endpoint ?? "", enabled: stream.enabled,
})

function headersOf(text: string): Record<string, string> {
  const headers: Record<string, string> = {}
  for (const line of text.split("\n")) {
    const at = line.indexOf(":")
    if (at > 0) headers[line.slice(0, at).trim()] = line.slice(at + 1).trim()
  }
  return headers
}

function bodyOf(draft: Draft) {
  const webhook = draft.destination === "webhook"
  const secret = webhook ? draft.secret || undefined
    : draft.accessKey || draft.secretKey ? { access_key: draft.accessKey, secret_key: draft.secretKey } : undefined
  return {
    id: draft.id, name: draft.name.trim(), kind: draft.kind, query: draft.query.trim(), destination: draft.destination,
    target: webhook ? { url: draft.url.trim() }
      : { bucket: draft.bucket.trim(), prefix: draft.prefix.trim(), region: draft.region.trim(), endpoint: draft.endpoint.trim() },
    // header values are secrets: sent under a name the access log masks, kept encrypted
    secret, secret_headers: webhook ? headersOf(draft.headers) : {}, enabled: draft.enabled, start: draft.start,
  }
}

const newSecret = () => Array.from(crypto.getRandomValues(new Uint8Array(24)), (b) => b.toString(16).padStart(2, "0")).join("")

/** Where the log is sent as it is written: each stream's destination, how its delivery stands, and a
 * form to add or change one. Records reach a stream once they are sealed, a few minutes after. */
export function Streams({ request, kinds, list, refresh }: { request: ActivityRequest; kinds: Kind[]; list: StreamList; refresh: () => void }) {
  const [draft, setDraft] = useState<Draft | null>(null)
  const [busy, setBusy] = useState(false)
  const [note, setNote] = useState<{ ok: boolean; text: string } | null>(null)

  const act = async (work: () => Promise<unknown>, done?: string) => {
    setBusy(true)
    setNote(null)
    try {
      await work()
      if (done) setNote({ ok: true, text: done })
      refresh()
      return true
    } catch (e) {
      setNote({ ok: false, text: (e as Error).message })
      return false
    } finally {
      setBusy(false)
    }
  }
  const save = async (e: FormEvent) => {
    e.preventDefault()
    if (draft && await act(() => request("streams", { method: "POST", body: bodyOf(draft) }), `${draft.name.trim()} saved.`)) setDraft(null)
  }
  const test = (stream: Stream) => act(async () => {
    const answer = await request(`streams/${stream.id}/test`, { method: "POST" })
    if (!answer.ok) throw new Error(`${stream.name}: ${answer.error}`)
  }, `${stream.name}: the test line was delivered.`)
  const toggle = (stream: Stream) => act(() => request("streams", { method: "POST", body: { ...bodyOf(draftOf(stream)), enabled: !stream.enabled } }),
    `${stream.name} ${stream.enabled ? "paused" : "resumed"}.`)
  const remove = (stream: Stream) => window.confirm(`Remove ${stream.name}? Nothing more is sent to ${where(stream)}.`)
    && act(() => request(`streams/${stream.id}`, { method: "DELETE" }), `${stream.name} removed.`)
  const set = (patch: Partial<Draft>) => setDraft((d) => d && { ...d, ...patch })
  const offered: StreamKind[] = kinds.includes("requests") ? ["events", "requests", "both"] : ["events"]
  // an existing stream's own kind stays listed, so the form never shows one kind and saves another
  const recordKinds = draft && !offered.includes(draft.kind) ? [...offered, draft.kind] : offered

  return (
    <section className="ahv-streams" aria-label="Streams">
      <div className="ahv-bar">
        <p className="ahv-dim ahv-small">
          Each stream sends new records to your own system as they are sealed, a few minutes after they happen.
          Webhooks receive JSON lines signed with your secret; S3 buckets receive one gzip file per batch.
        </p>
        {!draft && (
          <button type="button" className="ahv-button ahv-button-main ahv-push-right"
            onClick={() => { setNote(null); setDraft({ ...EMPTY, secret: newSecret() }) }}>
            Add stream
          </button>
        )}
      </div>

      {list.streams.length > 0 && !draft && (
        <ul className="ahv-stream-list">
          {list.streams.map((stream) => {
            const [label, tone] = STATES[stream.state]
            return (
              <li key={stream.id}>
                <div className="ahv-stream-main">
                  <strong>{stream.name}</strong>
                  <span className={cx("ahv-tag", tone)}>{label}</span>
                  <span className="ahv-dim ahv-small">{RECORDS[stream.kind]}{stream.query && <> matching <code className="ahv-mono">{stream.query}</code></>}</span>
                </div>
                <span className="ahv-mono ahv-dim ahv-stream-where" title={where(stream)}>{where(stream)}</span>
                <span className="ahv-small">
                  <strong className="ahv-num">{stream.delivered.toLocaleString()}</strong> delivered
                  {stream.last_delivered_at && <span className="ahv-dim">, last {relativeTime(stream.last_delivered_at) || stream.last_delivered_at.slice(0, 16)}</span>}
                </span>
                <span className="ahv-stream-tools">
                  <button type="button" className="ahv-link-button" disabled={busy} onClick={() => test(stream)}>Send test</button>
                  <button type="button" className="ahv-link-button" disabled={busy} onClick={() => toggle(stream)}>{stream.enabled ? "Pause" : "Resume"}</button>
                  <button type="button" className="ahv-link-button" disabled={busy} onClick={() => { setNote(null); setDraft(draftOf(stream)) }}>Edit</button>
                  <button type="button" className="ahv-icon-button" title={`Remove ${stream.name}`} disabled={busy} onClick={() => remove(stream)}>
                    <Icon name="close" size={14} />
                  </button>
                </span>
                {stream.state === "failing" && stream.error && <span className="ahv-bad ahv-small">{stream.error}. It is tried again shortly.</span>}
              </li>
            )
          })}
        </ul>
      )}
      {!list.streams.length && !draft && <p className="ahv-dim ahv-small">No streams yet.</p>}

      {draft && (
        <form className="ahv-stream-form" onSubmit={save}>
          <label className="ahv-field">
            <span>Name</span>
            <input className="ahv-input" required maxLength={80} value={draft.name} placeholder="CRM intake" onChange={(e) => set({ name: e.target.value })} />
          </label>
          <label className="ahv-field">
            <span>Records</span>
            <select className="ahv-input" value={draft.kind} disabled={recordKinds.length < 2} onChange={(e) => set({ kind: e.target.value as StreamKind })}>
              {recordKinds.map((k) => <option key={k} value={k}>{RECORDS[k]}</option>)}
            </select>
          </label>
          <label className="ahv-field ahv-field-wide">
            <span>Only records matching <em className="ahv-dim">(optional, the search language)</em></span>
            <input className="ahv-input ahv-mono" maxLength={500} value={draft.query} placeholder="action:trade.* -result:success"
              onChange={(e) => set({ query: e.target.value })} />
          </label>
          <div className="ahv-field ahv-field-wide">
            <span>Send to</span>
            <div className="ahv-segment" role="group" aria-label="Destination">
              {(["webhook", "s3"] as const).map((d) => (
                <button key={d} type="button" aria-pressed={draft.destination === d} disabled={Boolean(draft.id)}
                  onClick={() => set({ destination: d, secret: d === "webhook" && !draft.id ? newSecret() : "" })}>
                  {d === "webhook" ? "Webhook" : "S3 bucket"}
                </button>
              ))}
            </div>
          </div>
          {draft.destination === "webhook" ? (
            <>
              <label className="ahv-field ahv-field-wide">
                <span>URL <em className="ahv-dim">(https, on the internet)</em></span>
                <input className="ahv-input ahv-mono" type="url" required value={draft.url} placeholder="https://crm.example.com/activity"
                  onChange={(e) => set({ url: e.target.value })} />
              </label>
              <label className="ahv-field ahv-field-wide">
                <span>Signing secret <em className="ahv-dim">{draft.id ? "(blank keeps the current one while the URL's host stays the same)" : "(copy it to your receiver: it is not shown again)"}</em></span>
                <input className="ahv-input ahv-mono" minLength={16} required={!draft.id} value={draft.secret} autoComplete="off"
                  onChange={(e) => set({ secret: e.target.value })} />
              </label>
              <label className="ahv-field ahv-field-wide">
                <span>Headers <em className="ahv-dim">(one "Name: value" a line, kept encrypted; on an edit a blank value keeps the stored one)</em></span>
                <textarea className="ahv-input ahv-textarea ahv-mono" rows={2} value={draft.headers} placeholder="Authorization: Bearer …"
                  onChange={(e) => set({ headers: e.target.value })} />
              </label>
            </>
          ) : (
            <>
              <label className="ahv-field">
                <span>Bucket</span>
                <input className="ahv-input" required value={draft.bucket} onChange={(e) => set({ bucket: e.target.value })} />
              </label>
              <label className="ahv-field">
                <span>Folder <em className="ahv-dim">(optional)</em></span>
                <input className="ahv-input" value={draft.prefix} placeholder="activity" onChange={(e) => set({ prefix: e.target.value })} />
              </label>
              <label className="ahv-field">
                <span>Region <em className="ahv-dim">(optional)</em></span>
                <input className="ahv-input" value={draft.region} placeholder="eu-central-1" onChange={(e) => set({ region: e.target.value })} />
              </label>
              <label className="ahv-field">
                <span>Endpoint <em className="ahv-dim">(for R2, MinIO …)</em></span>
                <input className="ahv-input ahv-mono" type="url" value={draft.endpoint} onChange={(e) => set({ endpoint: e.target.value })} />
              </label>
              <label className="ahv-field">
                <span>Access key {draft.id && <em className="ahv-dim">(blank keeps it)</em>}</span>
                <input className="ahv-input ahv-mono" required={!draft.id} autoComplete="off" value={draft.accessKey} onChange={(e) => set({ accessKey: e.target.value })} />
              </label>
              <label className="ahv-field">
                <span>Secret key</span>
                <input className="ahv-input ahv-mono" type="password" required={!draft.id || Boolean(draft.accessKey)} autoComplete="new-password"
                  value={draft.secretKey} onChange={(e) => set({ secretKey: e.target.value })} />
              </label>
            </>
          )}
          {!draft.id && (
            <label className="ahv-field ahv-field-wide">
              <span>Start with</span>
              <select className="ahv-input" value={draft.start} onChange={(e) => set({ start: e.target.value as Draft["start"] })}>
                <option value="now">Records from now on</option>
                <option value="beginning">Everything already kept, then what follows</option>
              </select>
            </label>
          )}
          <div className="ahv-bar ahv-field-wide">
            <button type="submit" className="ahv-button ahv-button-main" disabled={busy}>{busy ? "Saving…" : draft.id ? "Save changes" : "Add stream"}</button>
            <button type="button" className="ahv-button" disabled={busy} onClick={() => setDraft(null)}>Cancel</button>
          </div>
        </form>
      )}
      {note && <p role={note.ok ? "status" : "alert"} className={cx("ahv-small", note.ok ? "ahv-ok" : "ahv-bad")}>{note.text}</p>}
    </section>
  )
}
