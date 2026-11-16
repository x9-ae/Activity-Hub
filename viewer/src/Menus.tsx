import { useEffect, useRef, useState, type ReactNode } from "react"
import type { ActivityRequest } from "./types"
import { useRemote } from "./remote"
import { Icon } from "./icons"
import { cx } from "./parts"

/** A button that opens a small panel under it; a click elsewhere or Escape closes it. */
export function Popover({ label, icon, children, open, setOpen, badge, disabled }: {
  label: string; icon: Parameters<typeof Icon>[0]["name"]; children: ReactNode; open: boolean; setOpen: (open: boolean) => void
  badge?: string; disabled?: boolean
}) {
  const box = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!open) return
    // the event's path, not its target: inside a shadow root the page sees only the host element
    const away = (e: MouseEvent) => { if (box.current && !e.composedPath().includes(box.current)) setOpen(false) }
    const key = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    document.addEventListener("mousedown", away)
    document.addEventListener("keydown", key)
    return () => { document.removeEventListener("mousedown", away); document.removeEventListener("keydown", key) }
  }, [open, setOpen])
  return (
    <div className="ahv-menu" ref={box}>
      <button type="button" className="ahv-button" aria-expanded={open} disabled={disabled} onClick={() => setOpen(!open)}>
        <Icon name={icon} size={14} />{label}{badge && <span className="ahv-count">{badge}</span>}<Icon name="chevronDown" size={14} />
      </button>
      {open && <div className="ahv-menu-list ahv-menu-panel">{children}</div>}
    </div>
  )
}

export type Column = { key: string; label: string }

/** Which of the optional columns the list shows. */
export function ColumnsMenu({ columns, shown, onChange }: { columns: Column[]; shown: string[]; onChange: (shown: string[]) => void }) {
  const [open, setOpen] = useState(false)
  return (
    <Popover label="Columns" icon="sliders" open={open} setOpen={setOpen}>
      <p className="ahv-dim ahv-small">When, who and what always show.</p>
      {columns.map((column) => (
        <label key={column.key} className="ahv-check">
          <input type="checkbox" checked={shown.includes(column.key)}
            onChange={(e) => onChange(e.target.checked ? [...shown, column.key] : shown.filter((k) => k !== column.key))} />
          {column.label}
        </label>
      ))}
    </Popover>
  )
}

type SavedView = { id: string; name: string; search: string; shared: boolean; mine: boolean; owner_name: string }

/** Saved views: one's own and those shared in the company, kept by the Hub. Opening one applies its
 * search; the current search can be saved, and one's own views updated or removed. */
export function ViewsMenu({ request, current, onOpen }: { request: ActivityRequest; current: string; onOpen: (search: string) => void }) {
  const [open, setOpen] = useState(false)
  const saved = useRemote<{ enabled: boolean; views: SavedView[] }>("views", () => request("views", { method: "GET" }))
  const [name, setName] = useState("")
  const [shared, setShared] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  if (!saved.data?.enabled) return null
  const views = saved.data.views
  const active = views.find((v) => v.search === current)

  const act = async (work: () => Promise<unknown>) => {
    setBusy(true)
    setError(null)
    try {
      await work()
      saved.refresh()
      setName("")
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setBusy(false)
    }
  }
  const save = (id?: string, viewName = name, viewShared = shared) =>
    act(() => request("views", { method: "POST", body: { id, name: viewName.trim(), search: current, shared: viewShared } }))

  return (
    <Popover label={active ? active.name : "Views"} icon="layers" open={open} setOpen={setOpen}>
      {views.length ? (
        <ul className="ahv-views">
          {views.map((view) => (
            <li key={view.id} className={cx(view === active && "ahv-views-on")}>
              <button type="button" className="ahv-views-open" onClick={() => { onOpen(view.search); setOpen(false) }}>
                <span>{view.name}</span>
                <span className="ahv-dim ahv-small">{view.mine ? (view.shared ? "Shared by you" : "Only you") : `Shared by ${view.owner_name}`}</span>
              </button>
              {view.mine && (
                <span className="ahv-views-tools">
                  {view.search !== current && (
                    <button type="button" className="ahv-icon-button" title="Save the current search into this view" disabled={busy}
                      onClick={() => save(view.id, view.name, view.shared)}><Icon name="refresh" size={14} /></button>
                  )}
                  <button type="button" className="ahv-icon-button" title="Remove this view" disabled={busy}
                    onClick={() => act(() => request(`views/${view.id}`, { method: "DELETE" }))}><Icon name="close" size={14} /></button>
                </span>
              )}
            </li>
          ))}
        </ul>
      ) : <p className="ahv-dim ahv-small">No saved views yet. Save the current search to come back to it.</p>}
      <form className="ahv-views-save" onSubmit={(e) => { e.preventDefault(); if (name.trim()) save() }}>
        <input className="ahv-input" value={name} maxLength={80} placeholder="Name this search" aria-label="View name"
          onChange={(e) => setName(e.target.value)} />
        <label className="ahv-check"><input type="checkbox" checked={shared} onChange={(e) => setShared(e.target.checked)} />Share with my team</label>
        <button type="submit" className="ahv-button ahv-button-main" disabled={busy || !name.trim()}>Save view</button>
        {error && <span className="ahv-bad ahv-small">{error}</span>}
      </form>
    </Popover>
  )
}
