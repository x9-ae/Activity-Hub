import type { ActivityRequest, Kind, Row, Search } from "./types"

// rows one export may hold: spreadsheets open about a million, a browser's memory gives out well before
export const EXPORT_MAX_ROWS = 100_000

export const EVENT_COLUMNS = ["occurred_at", "title", "summary", "action", "outcome", "reason", "importance", "actor_type",
  "actor_id", "actor_name", "target_type", "target_id", "origin", "ip", "country", "device", "service", "tenant_id",
  "request_id", "session_id", "changes", "metadata", "id"] as const
export const REQUEST_COLUMNS = ["occurred_at", "method", "route", "path", "status", "duration_ms", "actor_type", "actor_id",
  "actor_name", "origin", "ip", "country", "service", "tenant_id", "request_id", "session_id", "request_body", "id"] as const

/** Every row of the search, newest first, page by page up to EXPORT_MAX_ROWS; progress gets the count
 * so far. more: rows were left out (narrow the dates). */
export async function fetchExport(request: ActivityRequest, search: Search, progress: (rows: number) => void) {
  const rows: Row[] = []
  let cursor: string | null = null
  do {
    const page: { items: Row[]; next_cursor: string | null } =
      await request("export", { method: "POST", body: { ...search, cursor } })
    rows.push(...page.items)
    progress(rows.length)
    cursor = page.next_cursor
  } while (cursor && rows.length < EXPORT_MAX_ROWS)
  return { rows: rows.slice(0, EXPORT_MAX_ROWS), more: Boolean(cursor) || rows.length > EXPORT_MAX_ROWS }
}

function cell(value: unknown): string {
  let text = value === null || value === undefined ? "" : typeof value === "object" ? JSON.stringify(value) : String(value)
  // text a spreadsheet would run as a formula stays text
  if (/^[=+\-@\t\r]/.test(text)) text = `'${text}`
  return /[",\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text
}

export function toCsv(kind: Kind, rows: Row[]): string {
  const columns: readonly string[] = kind === "events" ? EVENT_COLUMNS : REQUEST_COLUMNS
  const lines = [columns.join(","), ...rows.map((row) => columns.map((c) => cell((row as Record<string, unknown>)[c])).join(","))]
  return `﻿${lines.join("\r\n")}\r\n`
}

/** One JSON record per line, as stored and as read, for loading into another tool. */
export const toJsonLines = (rows: Row[]) => rows.map((row) => {
  const { children: _children, ...rest } = row as Row & { children?: unknown }
  return JSON.stringify(rest)
}).join("\n") + "\n"

export function download(text: string, filename: string, type: string) {
  const url = URL.createObjectURL(new Blob([text], { type }))
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  link.click()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
