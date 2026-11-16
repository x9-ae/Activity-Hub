import { useMemo, useState } from "react"
import type { Chart } from "./types"
import { clockText, dayText, shortDay, toMs } from "./format"

const MINUTE_MS = 60_000
const DAILY = 1440
// axis steps a reader expects, in minutes; the smallest giving at most TICKS labels is used
const TICK_STEPS = [15, 30, 60, 120, 180, 360, 720, 1440, 2880, 10080, 20160, 43200]
const TICKS = 7
const compact = new Intl.NumberFormat(undefined, { notation: "compact", maximumFractionDigits: 1 })

type Bar = { at: number; count: number }

function barsOf(chart: Chart): Bar[] {
  const step = chart.bucket_minutes * MINUTE_MS
  const counts = new Map(chart.buckets.map((b) => [toMs(b.at), b.count]))
  const out: Bar[] = []
  for (let at = Math.floor(toMs(chart.occurred_from) / step) * step; at < toMs(chart.occurred_to); at += step) {
    out.push({ at, count: counts.get(at) ?? 0 })
  }
  return out
}

export function bucketText(minutes: number): string {
  if (minutes % DAILY === 0) return minutes === DAILY ? "Daily bars" : `${minutes / DAILY}-day bars`
  if (minutes % 60 === 0) return minutes === 60 ? "Hourly bars" : `${minutes / 60}-hour bars`
  return `${minutes}-minute bars`
}

/** The period one bar covers: "24 Oct 2026" for a day, "24 Oct, 17:00 – 18:00" for less. */
function periodText(at: number, minutes: number): string {
  if (minutes >= DAILY) return dayText(at)
  return `${shortDay(at)}, ${clockText(at)} – ${clockText(at + minutes * MINUTE_MS)}`
}

function ticksOf(bars: Bar[], minutes: number): { index: number; top: string; bottom: string }[] {
  if (bars.length < 2) return []
  const span = (bars[bars.length - 1].at - bars[0].at) / MINUTE_MS
  const step = TICK_STEPS.find((s) => s >= minutes && s % minutes === 0 && span / s <= TICKS) ?? minutes * Math.ceil(bars.length / TICKS)
  const daily = step >= DAILY
  const out: { index: number; top: string; bottom: string }[] = []
  bars.forEach((bar, index) => {
    if (bar.at % (step * MINUTE_MS) !== 0) return
    const previous = out[out.length - 1]
    const newDay = !previous || shortDay(bars[previous.index].at) !== shortDay(bar.at)
    out.push({ index, top: daily ? shortDay(bar.at) : clockText(bar.at), bottom: !daily && newDay ? shortDay(bar.at) : "" })
  })
  return out
}

/** Records per period over the searched range, so a spike or a gap shows before a row is read. */
export function ActivityChart({ chart, noun, loading }: { chart?: Chart; noun: string; loading: boolean }) {
  const bars = useMemo(() => (chart ? barsOf(chart) : []), [chart])
  const [hover, setHover] = useState<number | null>(null)
  const total = bars.reduce((sum, bar) => sum + bar.count, 0)
  const max = bars.reduce((most, bar) => Math.max(most, bar.count), 0)
  const peak = bars.find((bar) => bar.count === max && max > 0)
  const minutes = chart?.bucket_minutes ?? DAILY
  const ticks = useMemo(() => ticksOf(bars, minutes), [bars, minutes])
  const one = noun.replace(/s$/, "")
  const shown = hover !== null ? bars[hover] : undefined

  return (
    <div className="ahv-chart">
      <div className="ahv-chart-head">
        <span>
          <strong className="ahv-num">{loading && !chart ? "…" : total.toLocaleString()}</strong> {total === 1 ? one : noun}
          {chart && <span className="ahv-dim"> · {shortDay(toMs(chart.occurred_from))} – {dayText(toMs(chart.occurred_to) - 1)} UTC</span>}
        </span>
        {chart && (
          <span className="ahv-dim">
            {peak && <>Peak <strong className="ahv-num">{peak.count.toLocaleString()}</strong> at {periodText(peak.at, minutes).split(" – ")[0]} · </>}
            {bucketText(minutes)}
          </span>
        )}
      </div>
      <div
        className="ahv-chart-plot"
        role="img"
        aria-label={`${total.toLocaleString()} ${noun}${peak ? `, most at ${periodText(peak.at, minutes)} UTC (${peak.count})` : ""}`}
        onMouseMove={(e) => {
          if (!bars.length) return
          const box = e.currentTarget.getBoundingClientRect()
          setHover(Math.min(bars.length - 1, Math.max(0, Math.floor(((e.clientX - box.left) / box.width) * bars.length))))
        }}
        onMouseLeave={() => setHover(null)}
      >
        {max > 0 && <span className="ahv-chart-max ahv-num">{compact.format(max)}</span>}
        <svg viewBox={`0 0 ${Math.max(bars.length, 1)} 100`} preserveAspectRatio="none" className="ahv-chart-svg">
          {bars.map((bar, i) => {
            const height = max ? Math.max((bar.count / max) * 100, bar.count ? 2 : 0) : 0
            return <rect key={bar.at} x={i + 0.12} width={0.76} y={100 - height} height={height}
              className={i === hover ? "ahv-bar ahv-bar-on" : "ahv-bar"} />
          })}
        </svg>
        {!loading && total === 0 && <span className="ahv-chart-empty">No {noun} in this period</span>}
        {shown && (
          <div className="ahv-tip" style={{ left: `${((hover! + 0.5) / bars.length) * 100}%` }}>
            <strong className="ahv-num">{shown.count ? `${shown.count.toLocaleString()} ${shown.count === 1 ? one : noun}` : `No ${noun}`}</strong>
            <span>{periodText(shown.at, minutes)} UTC</span>
          </div>
        )}
      </div>
      <div className="ahv-chart-axis" aria-hidden="true">
        {ticks.map((tick) => (
          <span key={tick.index} style={{ left: `${((tick.index + 0.5) / bars.length) * 100}%` }}>
            {tick.top}{tick.bottom && <b>{tick.bottom}</b>}
          </span>
        ))}
      </div>
    </div>
  )
}
