import { describe, expect, it, vi } from "vitest"
import { act, waitFor } from "@testing-library/react"
import "./element"

class Watcher { observe() {} disconnect() {} }
vi.stubGlobal("IntersectionObserver", Watcher)

const request = vi.fn(async (path: string) => {
  if (path === "search") return { items: [], next_cursor: null }
  if (path === "chart") return { bucket_minutes: 60, occurred_from: "2026-11-10 00:00:00", occurred_to: "2026-11-10 12:00:00", buckets: [] }
  if (path === "catalog") return { views: [], actions: {}, actor_types: {}, entities: {} }
  if (path === "values") return { values: [] }
  if (path === "views") return { enabled: false, views: [] }
  return { sealed_until: {} }
})

describe("<activity-log>", () => {
  it("keeps a menu open while it is used inside the shadow root, and survives a move", async () => {
    const element = document.createElement("activity-log") as HTMLElement & { request: unknown }
    element.request = request
    await act(async () => { document.body.append(element) })
    const root = element.shadowRoot!
    await waitFor(() => expect(root.querySelector("button[aria-expanded]")).toBeTruthy())
    const columns = [...root.querySelectorAll("button")].find((b) => b.textContent?.includes("Columns"))!
    await act(async () => { columns.click() })
    const box = root.querySelector<HTMLInputElement>(".ahv-menu-panel input[type=checkbox]")!
    await act(async () => {
      box.dispatchEvent(new MouseEvent("mousedown", { bubbles: true, composed: true }))
      box.click()
    })
    expect(root.querySelector(".ahv-menu-panel")).toBeTruthy()

    const other = document.createElement("div")
    document.body.append(other)
    await act(async () => { other.append(element) })   // moved: connects again
    await waitFor(() => expect(element.shadowRoot!.querySelector(".ahv-log")).toBeTruthy())
  })
})
