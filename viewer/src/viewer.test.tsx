import { afterEach, describe, expect, it, vi } from "vitest"
import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react"
import { ActivityLog } from "./ActivityLog"
import { ActivityTimeline } from "./ActivityTimeline"
import { dayLabel, relativeTime, toMs } from "./format"
import { toCsv } from "./export"
import type { ActivityEvent, ActivityRequest } from "./types"

class Watcher { observe() {} disconnect() {} }
vi.stubGlobal("IntersectionObserver", Watcher)
afterEach(cleanup)

const NOW = Date.parse("2026-11-10T12:00:00Z")

function event(id: string, at: string, fields: Partial<ActivityEvent> = {}): ActivityEvent {
  return {
    id, occurred_at: at, received_at: at, app: "x9", environment: "", service: "trading_service", tenant_id: "3",
    action: "trade.opened", category: "trade", outcome: "success", reason: "", actor_type: "account", actor_id: "100234",
    actor_name: "", target_type: "ticket", target_id: "32101", target_name: "", related: [], origin: "web", ip: "1.2.3.4",
    country: "AE", user_agent: "", request_id: "r1", session_id: "", changes: null, metadata: { side: "1" }, imported: false,
    title: "Trade opened", summary: "Opened BUY 0.10 EURUSD at 1.08321 (#32101)", importance: "normal", actor: "100234",
    actor_label: "Client", device: "Chrome 157 on macOS", change_list: null, ...fields,
  }
}

const OPENED = event("e1", "2026-11-10 11:58:00.120", {
  children: [event("e0", "2026-11-10 11:58:00.100", { action: "data.created", title: "Record created", summary: "Created position record 9" })],
})
const FAILED = event("e2", "2026-11-09 08:00:00.000", {
  action: "user.signed_in", outcome: "failed", reason: "wrong password", title: "Sign-in failed",
  summary: "Failed sign-in to account 5: wrong password", actor_type: "visitor", actor: "5", actor_label: "Visitor", request_id: "",
})
const CATALOG = { views: ["important", "all", "problems"], actions: { "trade.opened": { title: "Trade opened", importance: "normal", category: "trade" } },
  actor_types: { account: "Client", staff: "Staff" }, entities: { account: "account", ticket: "ticket" } }

function fakeRequest(): ActivityRequest & { mock: ReturnType<typeof vi.fn>["mock"] } {
  return vi.fn(async (path: string, init?: { method: string; body?: unknown }) => {
    if (path === "search") return { items: [OPENED, FAILED], next_cursor: null }
    if (path === "chart") return { bucket_minutes: 60, occurred_from: "2026-11-03 12:00:00", occurred_to: "2026-11-10 12:00:00",
      buckets: [{ at: "2026-11-10 11:00:00.000", count: 2 }] }
    if (path === "catalog") return CATALOG
    if (path === "values") return { values: [{ value: "trading_service", count: 2 }] }
    if (path === "status") return { sealed_until: { events: "2026-11-10 11:57" }, recording: true, stats: { queued: 0 },
      last_daily: { day: "2026-11-09", ok: true, problems: 0 }, checks: true }
    if (path === "integrity") return { allowed: true }
    if (path === "integrity/verify") return { day: (init!.body as { day: string }).day, ok: false, checked: 1440, rows: 812,
      problems: [{ table: "events", window_start: "2026-11-09 10:41:00", problem: "rows changed: sealed 3 row(s), now 2" }], more: 0 }
    if (path === "views") return init?.method === "POST" ? { id: "v2", ...(init.body as object), mine: true, owner_name: "Me" }
      : { enabled: true, views: [{ id: "v1", name: "Money moves", search: "q=category%3Abalance", shared: true, mine: false, owner_name: "Ann" }] }
    if (path === "events/e1") return { event: { ...OPENED, details: [{ field: "side", label: "Side", value: "BUY" }] },
      same_request: [OPENED.children![0]], requests: [] }
    throw new Error(`unexpected ${path}`)
  }) as never
}

const bodies = (request: ReturnType<typeof fakeRequest>, path: string) =>
  request.mock.calls.filter(([p]) => p === path).map(([, init]) => (init as { body: Record<string, unknown> }).body)

describe("time and text", () => {
  it("reads stored UTC times", () => {
    expect(toMs("2026-11-10 11:58:00.120")).toBe(Date.parse("2026-11-10T11:58:00.120Z"))
    expect(dayLabel("2026-11-10 01:00:00.000", NOW)).toBe("Today")
    expect(dayLabel("2026-11-09 23:00:00.000", NOW)).toBe("Yesterday")
    expect(relativeTime("2026-11-10 11:55:00.000", NOW)).toMatch(/5/)
    expect(relativeTime("2026-10-01 00:00:00.000", NOW)).toBe("")
  })

  it("writes CSV a spreadsheet cannot run", () => {
    const csv = toCsv("events", [event("x", "2026-11-10 00:00:00.000", { actor_name: "=cmd()", summary: 'Said "hi", twice' })])
    expect(csv).toContain(`'=cmd()`)
    expect(csv).toContain('"Said ""hi"", twice"')
  })
})

describe("ActivityLog", () => {
  it("lists sentences by day, important first, with the row changes counted", async () => {
    const request = fakeRequest()
    render(<ActivityLog request={request} canExport />)
    expect(await screen.findByText("Opened BUY 0.10 EURUSD at 1.08321 (#32101)")).toBeTruthy()
    expect(screen.getByText("Failed sign-in to account 5: wrong password")).toBeTruthy()
    expect(screen.getByTitle("1 record change made by the same request")).toBeTruthy()
    expect(await screen.findByText("intact")).toBeTruthy()
    const first = bodies(request, "search")[0]
    expect(first.view).toBe("important")
    expect(String(first.occurred_from)).toMatch(/^\d{4}-\d\d-\d\d \d\d:\d\d:00$/)
  })

  it("searches with what is typed, offers fields and values, and shows each term as a chip", async () => {
    const request = fakeRequest()
    render(<ActivityLog request={request} />)
    await screen.findByText("Opened BUY 0.10 EURUSD at 1.08321 (#32101)")
    const box = screen.getByRole("combobox", { name: "Search" })
    fireEvent.focus(box)
    fireEvent.change(box, { target: { value: "act", selectionStart: 3 } })
    expect(screen.getByRole("option", { name: /actor:/ })).toBeTruthy()
    expect(screen.getByRole("option", { name: /action:/ })).toBeTruthy()
    fireEvent.change(box, { target: { value: "action:trade", selectionStart: 12 } })
    expect(screen.getByRole("option", { name: /trade\.opened/ })).toBeTruthy()
    expect(screen.queryByRole("option", { name: /subtracted/ })).toBeNull()
    fireEvent.change(box, { target: { value: "actor:100234 -result:success", selectionStart: 28 } })
    fireEvent.keyDown(box, { key: "Escape" })
    fireEvent.keyDown(box, { key: "Enter" })
    await waitFor(() => expect(bodies(request, "search").at(-1)!.query).toBe("actor:100234 -result:success"))
    expect(screen.getByText("Not Result:")).toBeTruthy()
    fireEvent.click(screen.getByRole("button", { name: "Remove -result:success" }))
    await waitFor(() => expect(bodies(request, "search").at(-1)!.query).toBe("actor:100234"))
    fireEvent.click(screen.getByRole("button", { name: "Problems" }))
    await waitFor(() => expect(bodies(request, "search").at(-1)!.view).toBe("problems"))
  })

  it("narrows to a person from a row", async () => {
    const request = fakeRequest()
    render(<ActivityLog request={request} />)
    fireEvent.click((await screen.findAllByTitle("Only activity by 100234"))[0])
    await waitFor(() => expect(bodies(request, "search").at(-1)!.query).toBe("actor:100234"))
  })

  it("keeps the search in the address it is given, and opens a saved view", async () => {
    const request = fakeRequest()
    const onParamsChange = vi.fn()
    render(<ActivityLog request={request} params={new URLSearchParams("view=all&q=actor%3A7&range=24h")} onParamsChange={onParamsChange} />)
    await screen.findByText("Opened BUY 0.10 EURUSD at 1.08321 (#32101)")
    const body = bodies(request, "search")[0]
    expect([body.view, body.query]).toEqual(["all", "actor:7"])
    fireEvent.click(screen.getByRole("button", { name: "Problems" }))
    expect(onParamsChange.mock.calls[0][0].toString()).toBe("view=problems&q=actor%3A7&range=24h")
    fireEvent.click(await screen.findByRole("button", { name: /Views/ }))
    fireEvent.click(screen.getByText("Money moves"))
    expect(onParamsChange.mock.calls.at(-1)![0].toString()).toBe("q=category%3Abalance")
  })

  it("saves the current search as a view and adds columns", async () => {
    const request = fakeRequest()
    render(<ActivityLog request={request} />)
    await screen.findByText("Opened BUY 0.10 EURUSD at 1.08321 (#32101)")
    fireEvent.click(await screen.findByRole("button", { name: /Views/ }))
    fireEvent.change(screen.getByLabelText("View name"), { target: { value: "Mine" } })
    fireEvent.click(screen.getByLabelText("Share with my team"))
    fireEvent.click(screen.getByRole("button", { name: "Save view" }))
    await waitFor(() => expect(bodies(request, "views").at(-1)).toEqual({ id: undefined, name: "Mine", search: "", shared: true }))
    fireEvent.click(screen.getByRole("button", { name: /Columns/ }))
    fireEvent.click(screen.getByLabelText("IP address"))
    expect((await screen.findAllByText("1.2.3.4")).length).toBe(2)
  })

  it("opens a record with its details, changes and request", async () => {
    const request = fakeRequest()
    render(<ActivityLog request={request} />)
    fireEvent.click(await screen.findByText("Opened BUY 0.10 EURUSD at 1.08321 (#32101)"))
    const panel = await screen.findByRole("dialog")
    expect(await screen.findByText("BUY")).toBeTruthy()
    expect(panel.textContent).toContain("Created position record 9")
    expect(panel.textContent).toContain("Chrome 157 on macOS")
    act(() => { fireEvent.keyDown(window, { key: "Escape" }) })
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull())
  })

  it("shows one entity: its events, and only the requests it made", async () => {
    const request = fakeRequest()
    render(<ActivityLog request={request} entity={{ type: "account", id: "100234", label: "account 100234" }} />)
    await screen.findByText("Opened BUY 0.10 EURUSD at 1.08321 (#32101)")
    const body = bodies(request, "search")[0]
    expect([body.related_type, body.related_id, body.occurred_from]).toEqual(["account", "100234", undefined])
    fireEvent.click(screen.getByRole("button", { name: "API requests" }))
    await waitFor(() => expect((bodies(request, "search").at(-1)!.filters as Record<string, string>).actor_id).toBe("100234"))
  })

  it("says why nothing loaded", async () => {
    const request = vi.fn(async (path: string) => {
      if (path === "search") throw new Error("The activity log could not be read; try again shortly")
      return path === "catalog" ? CATALOG : { values: [], buckets: [], bucket_minutes: 60, occurred_from: "2026-11-10 00:00:00", occurred_to: "2026-11-10 12:00:00", sealed_until: {} }
    })
    render(<ActivityLog request={request} />)
    expect(await screen.findByText("The activity log could not be read; try again shortly")).toBeTruthy()
  })
})

describe("what the review found", () => {
  it("survives a cut link and keeps the page's own address parameters", async () => {
    const request = fakeRequest()
    const onParamsChange = vi.fn()
    render(<ActivityLog request={request} params={new URLSearchParams("tab=activity&range=custom&to=2026-1")} onParamsChange={onParamsChange} />)
    await screen.findByText("Opened BUY 0.10 EURUSD at 1.08321 (#32101)")
    expect(bodies(request, "search")[0].occurred_to).toBeUndefined()
    fireEvent.click(screen.getByRole("button", { name: "All" }))
    expect(onParamsChange.mock.calls[0][0].get("tab")).toBe("activity")
  })

  it("closes only the panel on Escape, not a sheet listening under it", async () => {
    const sheet = vi.fn()
    document.addEventListener("keydown", (e) => e.key === "Escape" && sheet())
    render(<ActivityLog request={fakeRequest()} />)
    fireEvent.click(await screen.findByText("Opened BUY 0.10 EURUSD at 1.08321 (#32101)"))
    await screen.findByRole("dialog")
    fireEvent.keyDown(document.activeElement!, { key: "Escape" })
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull())
    expect(sheet).not.toHaveBeenCalled()
  })

  it("reads nothing for an entity without an id", async () => {
    const request = fakeRequest()
    render(<ActivityTimeline request={request} entity={{ type: "account", id: "" }} />)
    await new Promise((r) => setTimeout(r, 20))
    expect(bodies(request, "search")).toEqual([])
  })
})

describe("the keyboard and the tabs", () => {
  it("lets Tab pass, searches what was typed on Enter, and takes a suggestion only once chosen", async () => {
    const request = fakeRequest()
    render(<ActivityLog request={request} />)
    await screen.findByText("Opened BUY 0.10 EURUSD at 1.08321 (#32101)")
    const box = screen.getByRole("combobox", { name: "Search" }) as HTMLInputElement
    fireEvent.focus(box)
    fireEvent.keyDown(box, { key: "Tab" })
    expect(box.value).toBe("")
    fireEvent.change(box, { target: { value: "ip", selectionStart: 2 } })
    fireEvent.keyDown(box, { key: "Enter" })
    await waitFor(() => expect(bodies(request, "search").at(-1)!.query).toBe("ip"))
    fireEvent.change(box, { target: { value: "act", selectionStart: 3 } })
    fireEvent.keyDown(box, { key: "ArrowDown" })
    fireEvent.keyDown(box, { key: "Enter" })
    expect(box.value).toBe("actor:")
  })

  it("leaves event-only terms behind when switching to API requests", async () => {
    const request = fakeRequest()
    render(<ActivityLog request={request} params={new URLSearchParams("q=on%3Aaccount%3A7+actor%3A9+refund")} onParamsChange={vi.fn()} />)
    await screen.findByText("Opened BUY 0.10 EURUSD at 1.08321 (#32101)")
    const onParamsChange = vi.fn()
    cleanup()
    render(<ActivityLog request={request} params={new URLSearchParams("q=on%3Aaccount%3A7+actor%3A9+refund")} onParamsChange={onParamsChange} />)
    fireEvent.click(await screen.findByRole("button", { name: "API requests" }))
    expect(onParamsChange.mock.calls[0][0].get("q")).toBe("actor:9 refund")
  })
})

describe("integrity", () => {
  it("marks each row sealed or waiting, and checks a day", async () => {
    const request = fakeRequest()
    render(<ActivityLog request={request} />)
    await screen.findByText("Opened BUY 0.10 EURUSD at 1.08321 (#32101)")
    await waitFor(() => expect(screen.getAllByLabelText(/^Sealed/).length).toBe(1))
    expect(screen.getAllByLabelText(/^Waiting for its seal/).length).toBe(1)
    fireEvent.click(await screen.findByRole("button", { name: "Check integrity" }))
    fireEvent.change(screen.getByLabelText("Day (UTC)"), { target: { value: "2026-11-09" } })
    fireEvent.click(screen.getByRole("button", { name: /Check this day/ }))
    expect(await screen.findByText("2026-11-09: 1 problem(s) found.")).toBeTruthy()
    expect(screen.getByText(/rows changed: sealed 3 row\(s\), now 2/)).toBeTruthy()
  })
})

describe("integrity checks", () => {
  it("are offered only when the application lets this person run them", async () => {
    const base = fakeRequest()
    const request = vi.fn(async (path: string, init?: { method: string; body?: unknown }) => {
      if (path === "integrity") throw new Error("Your role cannot do this")
      return base(path, init as never)
    })
    render(<ActivityLog request={request} />)
    await screen.findByText("intact")
    await waitFor(() => expect(request.mock.calls.some(([p]) => p === "integrity")).toBe(true))
    expect(screen.queryByRole("button", { name: "Check integrity" })).toBeNull()
  })
})

describe("ActivityTimeline", () => {
  it("tells one entity's story oldest first", async () => {
    const request = fakeRequest()
    render(<ActivityTimeline request={request} entity={{ type: "ticket", id: "32101" }} />)
    await screen.findByText("Opened BUY 0.10 EURUSD at 1.08321 (#32101)")
    const steps = screen.getAllByRole("listitem").map((li) => li.textContent)
    expect(steps[0]).toContain("Failed sign-in")
    expect(bodies(request, "search")[0]).toMatchObject({ related_type: "ticket", related_id: "32101", view: "all", details: true })
  })

  it("shows each step's key values, and its details and record changes on expand", async () => {
    const opened = {
      ...OPENED, icon: "trendUp" as const, tone: "emerald" as const,
      facts: [{ label: "BUY", value: "0.10" }, { label: "@", value: "1.08321" }],
      details: [{ field: "book", label: "Book", value: "A-book" }],
      children: [{ ...OPENED.children![0], change_list: [{ field: "volume", label: "Volume", before: null, after: "0.10" }] }],
      children_count: 1,
    }
    const request = vi.fn(async (path: string) => {
      if (path === "search") return { items: [opened], next_cursor: null }
      if (path === "catalog") return CATALOG
      return { event: opened, same_request: [], requests: [] }
    }) as never as ActivityRequest
    const header = vi.fn(() => <p>Ticket summary</p>)
    render(<ActivityTimeline request={request} entity={{ type: "ticket", id: "32101" }} header={header} />)
    expect(await screen.findByText("Ticket summary")).toBeTruthy()
    expect(header).toHaveBeenCalledWith([opened], false)
    expect(screen.getByText("1.08321")).toBeTruthy()
    expect(screen.queryByText("Opened BUY 0.10 EURUSD at 1.08321 (#32101)")).toBeNull()

    fireEvent.click(screen.getByRole("button", { name: /Details and 1 record change/ }))
    expect(screen.getByText("A-book")).toBeTruthy()
    fireEvent.click(screen.getByRole("button", { name: /position record 9/ }))
    expect(screen.getByText("0.10", { selector: "dd" })).toBeTruthy()

    fireEvent.click(screen.getByRole("button", { name: /Trade opened/ }))
    expect(await screen.findByRole("dialog", { name: "Activity details" })).toBeTruthy()
  })
})

describe("Streams", () => {
  const STREAM = { id: "s1", name: "CRM intake", kind: "events", query: "action:trade.*", destination: "webhook",
    target: { url: "https://crm.example.com/in", headers: { Authorization: "" } }, enabled: true, state: "failing",
    error: "the destination answered 503 Service Unavailable", delivered: 1204, last_delivered_at: "2026-11-10 11:50:00.000",
    delivered_through: "2026-11-10 11:50:00.000" }

  function streamsRequest() {
    const base = fakeRequest()
    return vi.fn(async (path: string, init: { method: string; body?: unknown }) => {
      if (path === "streams") return init.method === "GET" ? { enabled: true, streams: [STREAM] } : { ...STREAM, ...(init.body as object) }
      if (path === "streams/s1/test") return { ok: true, error: "" }
      return base(path, init as never)
    }) as never as ReturnType<typeof fakeRequest>
  }

  it("shows each stream's state and saves a new one with a fresh signing secret", async () => {
    const request = streamsRequest()
    render(<ActivityLog request={request} canExport />)
    fireEvent.click(await screen.findByRole("button", { name: /Streams/ }))
    expect(screen.getByText("CRM intake")).toBeTruthy()
    expect(screen.getByText("Failing")).toBeTruthy()
    expect(screen.getByText(/503 Service Unavailable/)).toBeTruthy()

    fireEvent.click(screen.getByRole("button", { name: "Send test" }))
    expect(await screen.findByText("CRM intake: the test line was delivered.")).toBeTruthy()

    fireEvent.click(screen.getByRole("button", { name: "Edit" }))
    expect((screen.getByPlaceholderText("Authorization: Bearer …") as HTMLTextAreaElement).value).toBe("Authorization: ")
    fireEvent.click(screen.getByRole("button", { name: "Cancel" }))

    fireEvent.click(screen.getByRole("button", { name: "Add stream" }))
    fireEvent.change(screen.getByPlaceholderText("CRM intake"), { target: { value: "Archive" } })
    fireEvent.change(screen.getByPlaceholderText("https://crm.example.com/activity"), { target: { value: "https://archive.example.com/in" } })
    fireEvent.submit(screen.getByRole("button", { name: "Add stream" }).closest("form")!)
    await waitFor(() => expect(bodies(request, "streams").filter(Boolean)).toHaveLength(1))
    const saved = bodies(request, "streams").find(Boolean) as { name: string; secret: string; target: { url: string }; start: string }
    expect(saved.name).toBe("Archive")
    expect(saved.secret).toMatch(/^[0-9a-f]{48}$/)
    expect(saved.target).toEqual({ url: "https://archive.example.com/in" })
    expect((saved as unknown as { secret_headers: object }).secret_headers).toEqual({})
    expect(saved.start).toBe("now")
  })

  it("is not offered without the export permission or while the application keeps no streams", async () => {
    const request = streamsRequest()
    render(<ActivityLog request={request} />)
    await screen.findByText("Opened BUY 0.10 EURUSD at 1.08321 (#32101)")
    expect(screen.queryByRole("button", { name: /Streams/ })).toBeNull()
    expect(request.mock.calls.some(([p]) => p === "streams")).toBe(false)
  })
})
