import type { Row } from "./types"

/** Stored times are UTC, "YYYY-MM-DD HH:MM:SS.mmm". */
export const toMs = (value: string) => Date.parse(`${value.slice(0, 23).replace(" ", "T")}Z`)

export const words = (value: string) => value.replace(/[._]+/g, " ").trim()
export const sentenceCase = (value: string) => value.charAt(0).toUpperCase() + value.slice(1)

const DAY_MS = 86_400_000
const STEPS: [number, Intl.RelativeTimeFormatUnit][] = [[60, "second"], [60, "minute"], [24, "hour"], [7, "day"]]
const relative = new Intl.RelativeTimeFormat(undefined, { numeric: "auto", style: "short" })

/** "12 sec. ago", "5 min. ago"; empty past a week, where the date says it better. */
export function relativeTime(value: string, now = Date.now()): string {
  let amount = (toMs(value) - now) / 1000
  for (const [size, unit] of STEPS) {
    if (Math.abs(amount) < size) return relative.format(Math.round(amount), unit)
    amount /= size
  }
  return ""
}

const utc = (ms: number, options: Intl.DateTimeFormatOptions) =>
  new Date(ms).toLocaleString(undefined, { ...options, timeZone: "UTC" })

export const dayText = (ms: number) => utc(ms, { day: "numeric", month: "short", year: "numeric" })
export const shortDay = (ms: number) => utc(ms, { day: "numeric", month: "short" })
export const clockText = (ms: number) => utc(ms, { hour: "2-digit", minute: "2-digit", hour12: false })

/** "Today", "Yesterday" or "Fri, 24 Oct 2026" for the UTC day of a stored time. */
export function dayLabel(value: string, now = Date.now()): string {
  const day = value.slice(0, 10)
  if (day === new Date(now).toISOString().slice(0, 10)) return "Today"
  if (day === new Date(now - DAY_MS).toISOString().slice(0, 10)) return "Yesterday"
  return utc(toMs(`${day} 00:00:00`), { weekday: "short", day: "numeric", month: "short", year: "numeric" })
}

/** The time of day of a stored time, to the millisecond. */
export const timeOfDay = (value: string) => value.slice(11, 23)

export function initials(name: string): string {
  if (/^[\d#]/.test(name)) return "#"   // a login or account number
  const parts = name.split(/[\s@._-]+/).filter(Boolean)
  return ((parts[0]?.[0] ?? "?") + (parts[1]?.[0] ?? "")).toUpperCase()
}

/** Who made an API request, as a name (events carry theirs from the catalog). */
export const requestActor = (row: Row) =>
  row.actor_name || (row.actor_type === "system" ? sentenceCase(words(row.actor_id)) || "System" : row.actor_id || "Anonymous")

/** Whether a text is a day, "YYYY-MM-DD" (what an <input type="date"> gives). */
export const isDay = (day: string) => /^\d{4}-\d{2}-\d{2}$/.test(day) && !Number.isNaN(Date.parse(`${day}T00:00:00Z`))

/** "UTC start of a day" for a day, and the start of the day after it. */
export const dayStart = (day: string) => `${day} 00:00:00`
export const nextDayStart = (day: string) => `${new Date(Date.parse(`${day}T00:00:00Z`) + DAY_MS).toISOString().slice(0, 10)} 00:00:00`

/** "YYYY-MM-DD HH:MM:SS" this long before now, UTC. */
export const ago = (minutes: number, now = Date.now()) =>
  new Date(now - minutes * 60_000).toISOString().slice(0, 19).replace("T", " ")

export const plural = (count: number, one: string, many = `${one}s`) => `${count.toLocaleString()} ${count === 1 ? one : many}`
