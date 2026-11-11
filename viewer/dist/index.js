import { jsx as t, jsxs as n, Fragment as D } from "react/jsx-runtime";
import { useState as T, useRef as P, useEffect as K, useCallback as Be, useMemo as oe, useContext as Qt, createContext as ea, useId as ta, Fragment as aa } from "react";
import { createPortal as na } from "react-dom";
const F = (e) => "action" in e, sa = {
  search: "M21 21l-4.3-4.3M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14z",
  download: "M12 15V3m0 12-4-4m4 4 4-4M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
  refresh: "M21 12a9 9 0 0 1-15.3 6.4L3 16m0 5v-5h5M3 12a9 9 0 0 1 15.3-6.4L21 8m0-5v5h-5",
  live: "M4.9 19.1a10 10 0 0 1 0-14.2M7.8 16.2a6 6 0 0 1 0-8.4M16.2 7.8a6 6 0 0 1 0 8.4M19.1 4.9a10 10 0 0 1 0 14.2M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z",
  close: "M18 6 6 18M6 6l12 12",
  chevronDown: "m6 9 6 6 6-6",
  chevronRight: "m9 18 6-6-6-6",
  arrowRight: "M5 12h14m-7-7 7 7-7 7",
  sliders: "M21 4h-7M10 4H3M21 12h-9M8 12H3M21 20h-5M12 20H3M14 2v4M8 10v4M16 18v4",
  alert: "M12 9v4m0 4h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z",
  user: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  history: "M3 12a9 9 0 1 0 9-9 9.8 9.8 0 0 0-6.7 2.7L3 8m0-5v5h5m4-1v5l4 2",
  layers: "m12 2 10 5-10 5L2 7l10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  copy: "M8 8h12v12H8zM16 8V4H4v12h4",
  check: "M20 6 9 17l-5-5",
  log: "M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01",
  send: "M14.5 21.7a.5.5 0 0 0 .9 0L22 2.6a.5.5 0 0 0-.6-.6L2.3 8.6a.5.5 0 0 0 0 .9l8 3.2a2 2 0 0 1 1 1zM21.9 2.1 10.9 13.1",
  clock: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 6v6l4 2",
  bolt: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
  pencil: "M21.17 6.81a2.83 2.83 0 0 0-4-4L3.84 16.17a2 2 0 0 0-.5.83l-1.32 4.35a.5.5 0 0 0 .62.62l4.35-1.32a2 2 0 0 0 .83-.5zM15 5l4 4",
  scissors: "M6 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM20 4 8.12 15.88M14.47 14.48 20 20M8.12 8.12 12 12",
  checkCircle: "M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4 12 14.01l-3-3",
  xCircle: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM15 9l-6 6M9 9l6 6",
  trendUp: "M22 7 13.5 15.5 8.5 10.5 2 17M16 7h6v6",
  trendDown: "M22 17 13.5 8.5 8.5 13.5 2 7M16 17h6v-6",
  key: "M2.59 18.4A2 2 0 0 0 2 19.82V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.17a2 2 0 0 0 1.42-.59l.81-.81a6.5 6.5 0 1 0-4.24-4.24zM16.5 7.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z",
  money: "M2 6h20v12H2zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 12h.01M18 12h.01",
  shield: "M20 13c0 5-3.5 7.5-7.7 9a1 1 0 0 1-.6 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.2-2.7a1.2 1.2 0 0 1 1.6 0C14.5 3.8 17 5 19 5a1 1 0 0 1 1 1z"
};
function O({ name: e, size: a = 16, ...s }) {
  return /* @__PURE__ */ t(
    "svg",
    {
      width: a,
      height: a,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 2,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      focusable: "false",
      ...s,
      children: /* @__PURE__ */ t("path", { d: sa[e] })
    }
  );
}
function U(e, a, s) {
  const [i, l] = T({ loading: e !== null }), o = P(0), d = P(a);
  d.current = a;
  const u = Be(() => {
    if (e === null) return;
    const b = ++o.current;
    l((k) => ({ ...k, loading: !0 })), d.current().then(
      (k) => b === o.current && l({ data: k, loading: !1 }),
      (k) => b === o.current && l((y) => ({ data: y.data, error: k, loading: !1 }))
    );
  }, [e]);
  K(() => {
    l({ loading: e !== null }), u();
  }, [e, u]);
  const h = !!i.error;
  return K(() => {
    if (!s || e === null || h) return;
    const b = setInterval(u, s);
    return () => clearInterval(b);
  }, [s, e, h, u]), { ...i, refresh: u };
}
const qe = 20;
function la(e, a, s, i, l) {
  var c;
  const o = a && JSON.stringify(a), [d, u] = T([]), [h, b] = T(!1), [k, y] = T({ loading: !1 }), v = P(o);
  v.current = o;
  const f = U(
    o,
    () => e("search", { method: "POST", body: { ...a, limit: s } }),
    i ? l : void 0
  ), N = P(0);
  K(() => {
    f.data && (N.current += 1, u([f.data]), b(!1), y({ loading: !1 }));
  }, [f.data]), K(() => {
    u([]), y({ loading: !1 });
  }, [o]);
  const p = ((c = d[d.length - 1]) == null ? void 0 : c.next_cursor) ?? null, M = Be(() => {
    if (!p || k.loading || !a) return;
    y({ loading: !0 });
    const g = o, _ = N.current;
    e("search", { method: "POST", body: { ...a, limit: s, cursor: p } }).then(
      (q) => {
        v.current !== g || N.current !== _ || (u((E) => [...E, q].slice(-qe)), d.length >= qe && b(!0), y({ loading: !1 }));
      },
      (q) => v.current === g && N.current === _ && y({ loading: !1, error: q })
    );
  }, [p, k.loading, a, o, e, s, d.length]);
  return {
    rows: d.flatMap((g) => g.items),
    trimmed: h,
    hasMore: !!p && !i,
    loading: f.loading && !d.length,
    refreshing: f.loading,
    error: f.error,
    more: k,
    loadMore: M,
    refresh: f.refresh,
    pageCount: d.length
  };
}
const W = (e) => Date.parse(`${e.slice(0, 23).replace(" ", "T")}Z`), A = (e) => e.replace(/[._]+/g, " ").trim(), ce = (e) => e.charAt(0).toUpperCase() + e.slice(1), Et = 864e5, ra = [[60, "second"], [60, "minute"], [24, "hour"], [7, "day"]], ia = new Intl.RelativeTimeFormat(void 0, { numeric: "auto", style: "short" });
function Fe(e, a = Date.now()) {
  let s = (W(e) - a) / 1e3;
  for (const [i, l] of ra) {
    if (Math.abs(s) < i) return ia.format(Math.round(s), l);
    s /= i;
  }
  return "";
}
const fe = (e, a) => new Date(e).toLocaleString(void 0, { ...a, timeZone: "UTC" }), ee = (e) => fe(e, { day: "numeric", month: "short", year: "numeric" }), Y = (e) => fe(e, { day: "numeric", month: "short" }), Re = (e) => fe(e, { hour: "2-digit", minute: "2-digit", hour12: !1 });
function oa(e, a = Date.now()) {
  const s = e.slice(0, 10);
  return s === new Date(a).toISOString().slice(0, 10) ? "Today" : s === new Date(a - Et).toISOString().slice(0, 10) ? "Yesterday" : fe(W(`${s} 00:00:00`), { weekday: "short", day: "numeric", month: "short", year: "numeric" });
}
const be = (e) => e.slice(11, 23);
function Ot(e) {
  var s, i;
  if (/^[\d#]/.test(e)) return "#";
  const a = e.split(/[\s@._-]+/).filter(Boolean);
  return ((((s = a[0]) == null ? void 0 : s[0]) ?? "?") + (((i = a[1]) == null ? void 0 : i[0]) ?? "")).toUpperCase();
}
const ca = (e) => e.actor_name || (e.actor_type === "system" ? ce(A(e.actor_id)) || "System" : e.actor_id || "Anonymous"), Ae = (e) => /^\d{4}-\d{2}-\d{2}$/.test(e) && !Number.isNaN(Date.parse(`${e}T00:00:00Z`)), De = (e) => `${e} 00:00:00`, da = (e) => `${new Date(Date.parse(`${e}T00:00:00Z`) + Et).toISOString().slice(0, 10)} 00:00:00`, ha = (e, a = Date.now()) => new Date(a - e * 6e4).toISOString().slice(0, 19).replace("T", " "), ua = (e, a, s = `${a}s`) => `${e.toLocaleString()} ${e === 1 ? a : s}`, ve = 1e5, ma = [
  "occurred_at",
  "title",
  "summary",
  "action",
  "outcome",
  "reason",
  "importance",
  "actor_type",
  "actor_id",
  "actor_name",
  "target_type",
  "target_id",
  "origin",
  "ip",
  "country",
  "device",
  "service",
  "tenant_id",
  "request_id",
  "session_id",
  "changes",
  "metadata",
  "id"
], va = [
  "occurred_at",
  "method",
  "route",
  "path",
  "status",
  "duration_ms",
  "actor_type",
  "actor_id",
  "actor_name",
  "origin",
  "ip",
  "country",
  "service",
  "tenant_id",
  "request_id",
  "session_id",
  "request_body",
  "id"
];
async function pa(e, a, s) {
  const i = [];
  let l = null;
  do {
    const o = await e("export", { method: "POST", body: { ...a, cursor: l } });
    i.push(...o.items), s(i.length), l = o.next_cursor;
  } while (l && i.length < ve);
  return { rows: i.slice(0, ve), more: !!l || i.length > ve };
}
function ga(e) {
  let a = e == null ? "" : typeof e == "object" ? JSON.stringify(e) : String(e);
  return /^[=+\-@\t\r]/.test(a) && (a = `'${a}`), /[",\n\r]/.test(a) ? `"${a.replace(/"/g, '""')}"` : a;
}
function fa(e, a) {
  const s = e === "events" ? ma : va;
  return `\uFEFF${[s.join(","), ...a.map((l) => s.map((o) => ga(l[o])).join(","))].join(`\r
`)}\r
`;
}
const ba = (e) => e.map((a) => {
  const { children: s, ...i } = a;
  return JSON.stringify(i);
}).join(`
`) + `
`;
function Pe(e, a, s) {
  const i = URL.createObjectURL(new Blob([e], { type: s })), l = document.createElement("a");
  l.href = i, l.download = a, l.click(), setTimeout(() => URL.revokeObjectURL(i), 1e3);
}
const ya = /(-?)(?:([a-z_]+):)?("([^"]*)"?|\S+)/g;
function re(e) {
  const a = [];
  for (const s of e.matchAll(ya)) {
    let i = s[3].startsWith('"') ? s[4] ?? "" : s[3], l = s[2] ?? null;
    l && i.startsWith("//") && (i = `${l}:${i}`, l = null), i && a.push({ field: l, value: i, negated: s[1] === "-", text: s[0] });
  }
  return a;
}
const Na = (e, a) => re(e).filter((s) => s !== a && s.text !== a.text).map((s) => s.text).join(" "), Ie = (e) => /\s/.test(e) ? `"${e.replace(/"/g, "")}"` : e, xt = [
  { field: "actor", label: "Who", hint: "a login, account, key or name", kinds: ["events", "requests"] },
  { field: "action", label: "Action", hint: "e.g. trade.closed, or trade.* for all", kinds: ["events"] },
  { field: "result", label: "Result", hint: "success, failed or refused", kinds: ["events"] },
  { field: "on", label: "Concerning", hint: "kind:id, e.g. account:100234", kinds: ["events"] },
  { field: "category", label: "Category", hint: "e.g. trade, user, data", kinds: ["events"] },
  { field: "actor_type", label: "Actor type", hint: "e.g. staff, system", kinds: ["events", "requests"] },
  { field: "app", label: "App", hint: "where it came from, e.g. web", kinds: ["events", "requests"] },
  { field: "service", label: "Service", hint: "the service that recorded it", kinds: ["events", "requests"] },
  { field: "ip", label: "IP address", hint: "e.g. 202.66.180.61", kinds: ["events", "requests"] },
  { field: "country", label: "Country", hint: "two letters, e.g. AE", kinds: ["events", "requests"] },
  { field: "method", label: "Method", hint: "GET, POST, PUT, PATCH or DELETE", kinds: ["requests"] },
  { field: "route", label: "Route", hint: "e.g. /trading/* ", kinds: ["requests"] },
  { field: "status", label: "Status", hint: "a code or a range, e.g. 4xx", kinds: ["requests"] },
  { field: "request", label: "Request id", hint: "everything one request did", kinds: ["events", "requests"] }
], Ke = (e) => xt.filter((a) => a.kinds.includes(e)), ka = { events: ["origin", "outcome", "session"], requests: ["origin", "session"] }, Sa = (e) => [...Ke(e).map((a) => a.field), ...ka[e]], _a = (e) => {
  var a;
  return ((a = xt.find((s) => s.field === e)) == null ? void 0 : a.label) ?? ce(A(e));
};
function wa(e, a, s, i = {}) {
  const l = e.startsWith("-"), o = l ? e.slice(1) : e, d = l ? "-" : "", u = o.indexOf(":");
  if (u < 0)
    return Ke(a).filter((y) => y.field.startsWith(o.toLowerCase()) || y.label.toLowerCase().startsWith(o.toLowerCase())).map((y) => ({ insert: `${d}${y.field}:`, label: `${y.field}:`, hint: y.hint }));
  const h = o.slice(0, u), b = o.slice(u + 1).toLowerCase();
  return (() => {
    const y = (v) => (i[v] ?? []).filter((f) => f.value).map((f) => ({ insert: f.value, label: f.value, hint: f.count.toLocaleString() }));
    switch (h) {
      case "action":
        return Object.entries((s == null ? void 0 : s.actions) ?? {}).map(([v, f]) => ({ insert: v, label: v, hint: f.title }));
      case "category":
        return [...new Set(Object.values((s == null ? void 0 : s.actions) ?? {}).map((v) => v.category))].map((v) => ({ insert: v, label: v }));
      case "actor_type":
        return Object.entries((s == null ? void 0 : s.actor_types) ?? {}).map(([v, f]) => ({ insert: v, label: v, hint: f }));
      case "result":
        return ["success", "failed", "refused"].map((v) => ({ insert: v, label: v }));
      case "method":
        return ["GET", "POST", "PUT", "PATCH", "DELETE"].map((v) => ({ insert: v, label: v }));
      case "status":
        return ["2xx", "4xx", "5xx"].map((v) => ({ insert: v, label: v }));
      case "on":
        return Object.entries((s == null ? void 0 : s.entities) ?? {}).filter(([v]) => !v.includes("_")).map(([v, f]) => ({ insert: `${v}:`, label: `${v}:`, hint: f }));
      case "app":
        return y("origin");
      case "service":
        return y("service");
      default:
        return [];
    }
  })().filter((y) => y.insert.toLowerCase().startsWith(b) || y.insert.toLowerCase().split(/[._:]/).some((v) => v.startsWith(b)) || (y.hint ?? "").toLowerCase().split(/\s+/).some((v) => v.startsWith(b))).slice(0, 12).map((y) => ({ ...y, insert: `${d}${h}:${y.insert.endsWith(":") ? y.insert : Ie(y.insert)}` }));
}
const ge = 6e4, Q = 1440, Ca = [15, 30, 60, 120, 180, 360, 720, 1440, 2880, 10080, 20160, 43200], gt = 7, $a = new Intl.NumberFormat(void 0, { notation: "compact", maximumFractionDigits: 1 });
function Ta(e) {
  const a = e.bucket_minutes * ge, s = new Map(e.buckets.map((l) => [W(l.at), l.count])), i = [];
  for (let l = Math.floor(W(e.occurred_from) / a) * a; l < W(e.occurred_to); l += a)
    i.push({ at: l, count: s.get(l) ?? 0 });
  return i;
}
function Ma(e) {
  return e % Q === 0 ? e === Q ? "Daily bars" : `${e / Q}-day bars` : e % 60 === 0 ? e === 60 ? "Hourly bars" : `${e / 60}-hour bars` : `${e}-minute bars`;
}
function xe(e, a) {
  return a >= Q ? ee(e) : `${Y(e)}, ${Re(e)} – ${Re(e + a * ge)}`;
}
function Ea(e, a) {
  if (e.length < 2) return [];
  const s = (e[e.length - 1].at - e[0].at) / ge, i = Ca.find((d) => d >= a && d % a === 0 && s / d <= gt) ?? a * Math.ceil(e.length / gt), l = i >= Q, o = [];
  return e.forEach((d, u) => {
    if (d.at % (i * ge) !== 0) return;
    const h = o[o.length - 1], b = !h || Y(e[h.index].at) !== Y(d.at);
    o.push({ index: u, top: l ? Y(d.at) : Re(d.at), bottom: !l && b ? Y(d.at) : "" });
  }), o;
}
function Oa({ chart: e, noun: a, loading: s }) {
  const i = oe(() => e ? Ta(e) : [], [e]), [l, o] = T(null), d = i.reduce((f, N) => f + N.count, 0), u = i.reduce((f, N) => Math.max(f, N.count), 0), h = i.find((f) => f.count === u && u > 0), b = (e == null ? void 0 : e.bucket_minutes) ?? Q, k = oe(() => Ea(i, b), [i, b]), y = a.replace(/s$/, ""), v = l !== null ? i[l] : void 0;
  return /* @__PURE__ */ n("div", { className: "ahv-chart", children: [
    /* @__PURE__ */ n("div", { className: "ahv-chart-head", children: [
      /* @__PURE__ */ n("span", { children: [
        /* @__PURE__ */ t("strong", { className: "ahv-num", children: s && !e ? "…" : d.toLocaleString() }),
        " ",
        d === 1 ? y : a,
        e && /* @__PURE__ */ n("span", { className: "ahv-dim", children: [
          " · ",
          Y(W(e.occurred_from)),
          " – ",
          ee(W(e.occurred_to) - 1),
          " UTC"
        ] })
      ] }),
      e && /* @__PURE__ */ n("span", { className: "ahv-dim", children: [
        h && /* @__PURE__ */ n(D, { children: [
          "Peak ",
          /* @__PURE__ */ t("strong", { className: "ahv-num", children: h.count.toLocaleString() }),
          " at ",
          xe(h.at, b).split(" – ")[0],
          " · "
        ] }),
        Ma(b)
      ] })
    ] }),
    /* @__PURE__ */ n(
      "div",
      {
        className: "ahv-chart-plot",
        role: "img",
        "aria-label": `${d.toLocaleString()} ${a}${h ? `, most at ${xe(h.at, b)} UTC (${h.count})` : ""}`,
        onMouseMove: (f) => {
          if (!i.length) return;
          const N = f.currentTarget.getBoundingClientRect();
          o(Math.min(i.length - 1, Math.max(0, Math.floor((f.clientX - N.left) / N.width * i.length))));
        },
        onMouseLeave: () => o(null),
        children: [
          u > 0 && /* @__PURE__ */ t("span", { className: "ahv-chart-max ahv-num", children: $a.format(u) }),
          /* @__PURE__ */ t("svg", { viewBox: `0 0 ${Math.max(i.length, 1)} 100`, preserveAspectRatio: "none", className: "ahv-chart-svg", children: i.map((f, N) => {
            const p = u ? Math.max(f.count / u * 100, f.count ? 2 : 0) : 0;
            return /* @__PURE__ */ t(
              "rect",
              {
                x: N + 0.12,
                width: 0.76,
                y: 100 - p,
                height: p,
                className: N === l ? "ahv-bar ahv-bar-on" : "ahv-bar"
              },
              f.at
            );
          }) }),
          !s && d === 0 && /* @__PURE__ */ n("span", { className: "ahv-chart-empty", children: [
            "No ",
            a,
            " in this period"
          ] }),
          v && /* @__PURE__ */ n("div", { className: "ahv-tip", style: { left: `${(l + 0.5) / i.length * 100}%` }, children: [
            /* @__PURE__ */ t("strong", { className: "ahv-num", children: v.count ? `${v.count.toLocaleString()} ${v.count === 1 ? y : a}` : `No ${a}` }),
            /* @__PURE__ */ n("span", { children: [
              xe(v.at, b),
              " UTC"
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ t("div", { className: "ahv-chart-axis", "aria-hidden": "true", children: k.map((f) => /* @__PURE__ */ n("span", { style: { left: `${(f.index + 0.5) / i.length * 100}%` }, children: [
      f.top,
      f.bottom && /* @__PURE__ */ t("b", { children: f.bottom })
    ] }, f.index)) })
  ] });
}
const L = (...e) => e.filter(Boolean).join(" "), Lt = (e) => F(e) ? e.actor : ca(e), Ue = (e, a = {}) => F(e) ? e.actor_label : a[e.actor_type] || ce(A(e.actor_type)) || "Unknown", ze = {
  sealed: "Sealed: kept unchanged since its minute ended",
  waiting: "Waiting for its seal: each minute is sealed two minutes after it ends"
};
function xa({ value: e, seal: a }) {
  return /* @__PURE__ */ n("span", { className: "ahv-when", title: `${e} UTC`, children: [
    /* @__PURE__ */ n("span", { className: "ahv-mono", children: [
      be(e),
      a && /* @__PURE__ */ t("span", { className: L("ahv-seal", a === "waiting" && "ahv-seal-waiting"), title: ze[a], "aria-label": ze[a], children: /* @__PURE__ */ t(O, { name: a === "sealed" ? "shield" : "history", size: 11 }) })
    ] }),
    /* @__PURE__ */ t("span", { className: "ahv-dim", children: Fe(e) })
  ] });
}
const La = (e) => e ? ze[e] : "";
function qa({ onClick: e, title: a, children: s }) {
  return e ? /* @__PURE__ */ t(
    "button",
    {
      type: "button",
      className: "ahv-link",
      title: a,
      onClick: (i) => {
        i.stopPropagation(), e();
      },
      onKeyDown: (i) => i.stopPropagation(),
      children: s
    }
  ) : /* @__PURE__ */ t(D, { children: s });
}
function Ra({ row: e, actorTypes: a, onFocus: s }) {
  const i = Lt(e), l = Ue(e, a), o = e.actor_type !== "system" && e.actor_id && e.actor_id !== i ? e.actor_id : "";
  return /* @__PURE__ */ n("span", { className: "ahv-who", children: [
    /* @__PURE__ */ t("span", { className: L("ahv-avatar", e.actor_type === "system" && "ahv-avatar-system"), "aria-hidden": "true", children: Ot(i) }),
    /* @__PURE__ */ n("span", { className: "ahv-stack", children: [
      /* @__PURE__ */ t(qa, { title: `Only activity by ${i}`, onClick: e.actor_id ? s : void 0, children: /* @__PURE__ */ t("span", { className: "ahv-strong ahv-clip", children: i }) }),
      /* @__PURE__ */ t("span", { className: "ahv-dim ahv-clip", children: [l, o].filter(Boolean).join(" · ") })
    ] })
  ] });
}
function Aa({ row: e }) {
  return /* @__PURE__ */ n("span", { className: "ahv-where", children: [
    e.origin && /* @__PURE__ */ t("span", { className: "ahv-tag", children: A(e.origin) }),
    e.country && /* @__PURE__ */ t("span", { className: "ahv-dim", title: e.ip || void 0, children: e.country })
  ] });
}
function ye({ outcome: e }) {
  return e === "success" ? null : /* @__PURE__ */ t("span", { className: L("ahv-tag", e === "failed" ? "ahv-tag-bad" : "ahv-tag-warn"), children: e });
}
const Da = (e) => e >= 500 ? "ahv-tag-bad" : e >= 400 ? "ahv-tag-warn" : "ahv-tag-ok", qt = ({ status: e }) => /* @__PURE__ */ t("span", { className: L("ahv-tag ahv-mono", Da(e)), children: e }), Rt = ({ method: e }) => /* @__PURE__ */ t("span", { className: L("ahv-tag ahv-mono", `ahv-method-${e.toLowerCase()}`), children: e });
function Pa({ row: e }) {
  var s;
  const a = e.children_count ?? ((s = e.children) == null ? void 0 : s.length) ?? 0;
  return /* @__PURE__ */ n("span", { className: "ahv-what", children: [
    e.importance === "high" && e.outcome === "success" && /* @__PURE__ */ t("span", { className: "ahv-mark", title: "Worth attention" }),
    e.outcome !== "success" && /* @__PURE__ */ t(O, { name: "alert", size: 14, className: e.outcome === "failed" ? "ahv-bad" : "ahv-warn" }),
    /* @__PURE__ */ t("span", { className: "ahv-sentence", children: e.summary }),
    a > 0 && /* @__PURE__ */ n("span", { className: "ahv-count", title: `${a} record change${a === 1 ? "" : "s"} made by the same request`, children: [
      /* @__PURE__ */ t(O, { name: "layers", size: 12 }),
      a
    ] })
  ] });
}
function At({ row: e }) {
  return /* @__PURE__ */ n("span", { className: "ahv-what", children: [
    /* @__PURE__ */ t(Rt, { method: e.method }),
    /* @__PURE__ */ t("span", { className: "ahv-mono ahv-clip", children: e.route }),
    /* @__PURE__ */ t(qt, { status: e.status }),
    /* @__PURE__ */ n("span", { className: "ahv-dim ahv-num", children: [
      e.duration_ms,
      " ms"
    ] })
  ] });
}
function Z({ tone: e = "plain", children: a, action: s }) {
  return /* @__PURE__ */ n("div", { className: L("ahv-message", e === "bad" && "ahv-message-bad"), role: e === "bad" ? "alert" : void 0, children: [
    /* @__PURE__ */ t("span", { children: a }),
    s
  ] });
}
function He({ rows: e = 6 }) {
  return /* @__PURE__ */ t("div", { className: "ahv-skeleton", "aria-busy": "true", children: Array.from({ length: e }, (a, s) => /* @__PURE__ */ t("span", {}, s)) });
}
function Dt({ facts: e }) {
  return e != null && e.length ? /* @__PURE__ */ t("span", { className: "ahv-chips-row", children: e.map((a, s) => /* @__PURE__ */ n("span", { className: "ahv-fact", children: [
    a.label && /* @__PURE__ */ t("span", { className: "ahv-dim", children: a.label }),
    /* @__PURE__ */ t("span", { className: "ahv-mono", children: a.value })
  ] }, s)) }) : null;
}
function Pt({ items: e, mono: a = !1 }) {
  const s = e.filter(([, i]) => i != null && i !== "");
  return s.length ? /* @__PURE__ */ t("div", { className: "ahv-scroll-x", children: /* @__PURE__ */ t("table", { className: "ahv-kv", children: /* @__PURE__ */ t("tbody", { children: s.map(([i, l], o) => /* @__PURE__ */ n("tr", { children: [
    /* @__PURE__ */ t("th", { scope: "row", children: i }),
    /* @__PURE__ */ t("td", { className: L(a && "ahv-mono"), children: typeof l == "object" ? JSON.stringify(l) : String(l) })
  ] }, `${i}-${o}`)) }) }) }) : null;
}
function Ve({ changes: e, valueLabel: a = "Value" }) {
  if (!e.length) return null;
  const s = e.every((l) => l.before === null), i = e.every((l) => l.after === null);
  return /* @__PURE__ */ t("div", { className: "ahv-scroll-x", children: /* @__PURE__ */ n("table", { className: "ahv-changes", children: [
    /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ n("tr", { children: [
      /* @__PURE__ */ t("th", { children: "Field" }),
      s || i ? /* @__PURE__ */ t("th", { children: a }) : /* @__PURE__ */ n(D, { children: [
        /* @__PURE__ */ t("th", { children: "Before" }),
        /* @__PURE__ */ t("th", { children: "After" })
      ] })
    ] }) }),
    /* @__PURE__ */ t("tbody", { children: e.map((l) => /* @__PURE__ */ n("tr", { children: [
      /* @__PURE__ */ t("td", { children: l.label }),
      s || i ? /* @__PURE__ */ t("td", { className: "ahv-mono", children: (s ? l.after : l.before) ?? "—" }) : /* @__PURE__ */ n(D, { children: [
        /* @__PURE__ */ t("td", { className: "ahv-mono ahv-before", children: l.before ?? "—" }),
        /* @__PURE__ */ t("td", { className: "ahv-mono ahv-after", children: l.after ?? "—" })
      ] })
    ] }, l.field)) })
  ] }) });
}
const Ia = 200, Ua = ea(null);
function B({ title: e, children: a }) {
  return /* @__PURE__ */ n("section", { className: "ahv-section", children: [
    /* @__PURE__ */ t("h3", { children: e }),
    a
  ] });
}
const X = Pt;
function za({ event: e }) {
  const a = e.change_list;
  if (!(a != null && a.length)) return null;
  const s = a.every((l) => l.before === null), i = a.every((l) => l.after === null);
  return /* @__PURE__ */ t(B, { title: s ? "Recorded values" : i ? "Values removed" : "Changes", children: /* @__PURE__ */ t(Ve, { changes: a }) });
}
function ja({ text: e }) {
  const [a, s] = T(!1);
  return /* @__PURE__ */ n("button", { type: "button", className: "ahv-button ahv-button-quiet", onClick: () => {
    var i;
    (i = navigator.clipboard) == null || i.writeText(e).then(() => {
      s(!0), setTimeout(() => s(!1), 1500);
    });
  }, children: [
    /* @__PURE__ */ t(O, { name: a ? "check" : "copy", size: 14 }),
    a ? "Copied" : "Copy"
  ] });
}
function Wa({ row: e }) {
  const [a, s] = T(!1), { children: i, details: l, ...o } = e, d = JSON.stringify(o, null, 2);
  return /* @__PURE__ */ n("section", { className: "ahv-section", children: [
    /* @__PURE__ */ n("div", { className: "ahv-row-between", children: [
      /* @__PURE__ */ n("button", { type: "button", className: "ahv-disclose", "aria-expanded": a, onClick: () => s((u) => !u), children: [
        /* @__PURE__ */ t(O, { name: "chevronDown", size: 14, className: L(a && "ahv-turned") }),
        "Full record (JSON)"
      ] }),
      /* @__PURE__ */ t(ja, { text: d })
    ] }),
    a && /* @__PURE__ */ t("pre", { className: "ahv-pre", children: d })
  ] });
}
function Ba({ open: e, events: a, calls: s, onOpen: i }) {
  const l = [...a, ...s].sort((o, d) => o.occurred_at.localeCompare(d.occurred_at));
  return l.length ? /* @__PURE__ */ t("ol", { className: "ahv-list", children: l.map((o) => /* @__PURE__ */ t("li", { children: /* @__PURE__ */ n("button", { type: "button", disabled: o.id === e.id, onClick: () => i(o), children: [
    /* @__PURE__ */ t("span", { className: "ahv-mono ahv-dim", children: be(o.occurred_at) }),
    F(o) ? /* @__PURE__ */ n("span", { className: "ahv-what", children: [
      /* @__PURE__ */ t("span", { className: "ahv-sentence", children: o.summary }),
      /* @__PURE__ */ t(ye, { outcome: o.outcome })
    ] }) : /* @__PURE__ */ t(At, { row: o })
  ] }) }, o.id)) }) : /* @__PURE__ */ t("p", { className: "ahv-dim", children: "Nothing else was recorded for this request." });
}
function Fa(e, a) {
  const s = F(a);
  return U(`${a.id}`, async () => {
    if (s) return e(`events/${a.id}`, { method: "GET" });
    if (!a.request_id) return { same_request: [], requests: [] };
    const i = (d) => e("search", {
      method: "POST",
      body: { kind: d, filters: { request_id: a.request_id }, limit: Ia }
    }), [l, o] = await Promise.all([i("events"), i("requests")]);
    return { same_request: l.items, requests: o.items.filter((d) => d.id !== a.id) };
  });
}
function It({ request: e, row: a, onClose: s, onFocus: i, actorTypes: l, entities: o, seal: d }) {
  const [u, h] = T(a);
  K(() => h(a), [a]);
  const b = P(null), k = P(null), y = P(s);
  y.current = s;
  const v = u !== null;
  K(() => {
    var S, c;
    if (!v) return;
    const N = ((S = b.current) == null ? void 0 : S.getRootNode()) ?? document, p = N.activeElement ?? document.activeElement;
    (c = b.current) == null || c.focus();
    const M = (g) => {
      if (g.key === "Escape")
        g.stopPropagation(), y.current();
      else if (g.key === "Tab" && k.current) {
        const _ = [...k.current.querySelectorAll("button:not(:disabled), [href], input, select, [tabindex]:not([tabindex='-1'])")], q = N.activeElement;
        if (!_.length) return;
        g.shiftKey && q === _[0] ? (g.preventDefault(), _[_.length - 1].focus()) : !g.shiftKey && q === _[_.length - 1] ? (g.preventDefault(), _[0].focus()) : k.current.contains(q) || (g.preventDefault(), _[0].focus());
      }
    };
    return window.addEventListener("keydown", M, !0), () => {
      var g;
      window.removeEventListener("keydown", M, !0), (g = p == null ? void 0 : p.focus) == null || g.call(p);
    };
  }, [v]);
  const f = Qt(Ua);
  return u ? na(
    /* @__PURE__ */ n("div", { className: "ahv ahv-drawer-layer", children: [
      /* @__PURE__ */ t("div", { className: "ahv-backdrop", onClick: s }),
      /* @__PURE__ */ n("aside", { ref: k, className: "ahv-drawer", role: "dialog", "aria-modal": "true", "aria-label": "Activity details", children: [
        /* @__PURE__ */ t("button", { ref: b, type: "button", className: "ahv-icon-button ahv-drawer-close", onClick: s, "aria-label": "Close", children: /* @__PURE__ */ t(O, { name: "close" }) }),
        /* @__PURE__ */ t(
          Ka,
          {
            request: e,
            row: u,
            onOpen: h,
            onFocus: i,
            actorTypes: l,
            entities: o,
            seal: u === a ? d : null
          },
          u.id
        )
      ] })
    ] }),
    f ?? document.body
  ) : null;
}
function Ka({ request: e, row: a, onOpen: s, onFocus: i, actorTypes: l, entities: o = {}, seal: d }) {
  var v, f, N, p;
  const u = Fa(e, a), h = F(a) ? ((v = u.data) == null ? void 0 : v.event) ?? a : null, b = Lt(a), k = h != null && h.target_type ? `${o[h.target_type] ?? A(h.target_type)} ${h.target_name || h.target_id}` : "", y = `${ee(W(a.occurred_at))}, ${be(a.occurred_at)} UTC`;
  return /* @__PURE__ */ n("div", { className: "ahv-drawer-body", children: [
    /* @__PURE__ */ n("header", { className: "ahv-drawer-head", children: [
      h ? /* @__PURE__ */ n(D, { children: [
        /* @__PURE__ */ n("div", { className: "ahv-tags", children: [
          /* @__PURE__ */ t("span", { className: "ahv-tag", children: h.title }),
          /* @__PURE__ */ t(ye, { outcome: h.outcome }),
          h.importance === "high" && /* @__PURE__ */ t("span", { className: "ahv-tag ahv-tag-accent", children: "Worth attention" }),
          h.imported && /* @__PURE__ */ t("span", { className: "ahv-tag", children: "Imported" })
        ] }),
        /* @__PURE__ */ t("h2", { children: h.summary }),
        /* @__PURE__ */ t(Dt, { facts: h.facts })
      ] }) : /* @__PURE__ */ n(D, { children: [
        /* @__PURE__ */ n("div", { className: "ahv-tags", children: [
          /* @__PURE__ */ t(Rt, { method: a.method }),
          /* @__PURE__ */ t(qt, { status: a.status })
        ] }),
        /* @__PURE__ */ t("h2", { className: "ahv-mono", children: a.route })
      ] }),
      /* @__PURE__ */ n("p", { className: "ahv-dim", children: [
        b,
        " · ",
        Ue(a, l),
        " · ",
        y
      ] }),
      i && /* @__PURE__ */ n("div", { className: "ahv-actions", children: [
        a.actor_id && /* @__PURE__ */ n("button", { type: "button", className: "ahv-button", onClick: () => i({ actor_id: a.actor_id }), children: [
          /* @__PURE__ */ t(O, { name: "user", size: 14 }),
          "All by ",
          b
        ] }),
        (h == null ? void 0 : h.target_type) && /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            className: "ahv-button",
            onClick: () => i({ target_type: h.target_type, target_id: h.target_id }),
            children: [
              /* @__PURE__ */ t(O, { name: "history", size: 14 }),
              "Timeline of ",
              k
            ]
          }
        )
      ] })
    ] }),
    h ? /* @__PURE__ */ n(D, { children: [
      h.outcome !== "success" && h.reason && /* @__PURE__ */ t(B, { title: "Reason", children: /* @__PURE__ */ t("p", { children: h.reason }) }),
      /* @__PURE__ */ t(za, { event: h }),
      (f = h.details) != null && f.length ? /* @__PURE__ */ t(B, { title: "Details", children: /* @__PURE__ */ t(X, { items: h.details.map((M) => [M.label, M.value]) }) }) : h.metadata && !u.loading ? /* @__PURE__ */ t(B, { title: "Details", children: /* @__PURE__ */ t(X, { items: Object.entries(h.metadata).map(([M, S]) => [ce(A(M)), S]) }) }) : null,
      (k || h.related.length > 0) && /* @__PURE__ */ t(B, { title: "Concerns", children: /* @__PURE__ */ t(X, { items: [
        ["Target", k],
        ...h.related.map(([M, S]) => [ce(o[M] ?? A(M)), S])
      ] }) })
    ] }) : /* @__PURE__ */ n(D, { children: [
      /* @__PURE__ */ t(B, { title: "Request", children: /* @__PURE__ */ t(X, { items: [["Path", a.path], ["Took", `${a.duration_ms} ms`], ["Service", A(a.service)]] }) }),
      a.request_body && /* @__PURE__ */ t(B, { title: "Sent (secrets masked)", children: /* @__PURE__ */ t("pre", { className: "ahv-pre", children: JSON.stringify(a.request_body, null, 2) }) })
    ] }),
    a.request_id && /* @__PURE__ */ t(B, { title: "Same request", children: u.error ? /* @__PURE__ */ n(Z, { tone: "bad", action: /* @__PURE__ */ t("button", { type: "button", className: "ahv-button", onClick: u.refresh, children: "Retry" }), children: [
      "Couldn't load: ",
      u.error.message
    ] }) : u.loading && !u.data ? /* @__PURE__ */ t(He, { rows: 2 }) : /* @__PURE__ */ t(Ba, { open: a, events: ((N = u.data) == null ? void 0 : N.same_request) ?? [], calls: ((p = u.data) == null ? void 0 : p.requests) ?? [], onOpen: s }) }),
    /* @__PURE__ */ t(B, { title: "Who and from where", children: /* @__PURE__ */ t(X, { items: [
      ["Who", `${b} (${Ue(a, l)}${a.actor_id && a.actor_id !== b ? ` ${a.actor_id}` : ""})`],
      ["App", a.origin && A(a.origin)],
      ["Country", a.country],
      ["IP address", a.ip],
      ["Device", h ? h.device : a.user_agent],
      ["Session", a.session_id],
      ["Company", a.tenant_id],
      ["Service", A(a.service)]
    ] }) }),
    /* @__PURE__ */ t(B, { title: "Reference", children: /* @__PURE__ */ t(X, { items: [
      ["Record id", a.id],
      ["Request id", a.request_id],
      ["Recorded", `${a.received_at} UTC`],
      ["Integrity", La(d ?? null)],
      ...h ? [["Action", h.action]] : []
    ] }) }),
    /* @__PURE__ */ t(Wa, { row: h ?? a })
  ] });
}
const ft = 65, je = { events: "Events", access_logs: "Requests" }, Ha = 20, bt = (e, a = Date.now()) => (a - Date.parse(`${e.replace(" ", "T")}:00Z`)) / 6e4, Va = () => new Date(Date.now() - 864e5).toISOString().slice(0, 10);
function Ja(e, a, s) {
  var l;
  const i = (l = s == null ? void 0 : s.sealed_until) == null ? void 0 : l[a];
  return i ? e.slice(0, 16) <= i ? "sealed" : "waiting" : null;
}
function Ga({ request: e, status: a }) {
  var _, q;
  const [s, i] = T(!1), [l, o] = T(Va), [d, u] = T(!1), [h, b] = T(null), k = P(null), y = U(
    a != null && a.checks ? "integrity" : null,
    () => e("integrity", { method: "GET" })
  ), v = !!(a != null && a.checks && ((_ = y.data) != null && _.allowed));
  if (!a) return null;
  const f = Object.entries(a.sealed_until ?? {}), N = a.last_daily, p = (q = a.stats) == null ? void 0 : q.queued;
  if (!f.length && a.recording === void 0 && !N) return null;
  const M = async (E) => {
    u(!0);
    try {
      b(await E());
    } catch (m) {
      b({ kind: "error", message: m.message });
    } finally {
      u(!1);
    }
  }, S = () => M(async () => ({ kind: "day", ...await e("integrity/verify", { method: "POST", body: { day: l } }) })), c = () => M(async () => {
    const E = await e(`integrity/seal/${l}`, { method: "GET" });
    return Pe(`${JSON.stringify(E, null, 2)}
`, `activity-seal-${l}.json`, "application/json"), { kind: "downloaded", day: l };
  }), g = (E) => M(async () => {
    let m;
    try {
      m = JSON.parse(await E.text());
    } catch {
      m = {};
    }
    if (!m || !Array.isArray(m.seals) || !m.seals.length)
      throw new Error(`${E.name} is not a seal record: choose a proof downloaded here (activity-seal-<day>.json)`);
    const C = await e("integrity/check", { method: "POST", body: { record: m } });
    return { kind: "proof", name: E.name, day: String(m.day ?? ""), ...C };
  });
  return /* @__PURE__ */ n("div", { className: "ahv-status-wrap", children: [
    /* @__PURE__ */ n("div", { className: "ahv-status", role: "status", children: [
      /* @__PURE__ */ t(O, { name: "shield", size: 14 }),
      a.recording !== void 0 && /* @__PURE__ */ t("span", { className: L("ahv-tag", a.recording ? "ahv-tag-ok" : "ahv-tag-bad"), children: a.recording ? "Recording" : "Not recording" }),
      p !== void 0 && /* @__PURE__ */ n("span", { children: [
        "Waiting to be written ",
        /* @__PURE__ */ t("strong", { className: "ahv-num", children: p.toLocaleString() })
      ] }),
      f.map(([E, m]) => /* @__PURE__ */ n(
        "span",
        {
          className: L(bt(m) > ft && "ahv-warn"),
          title: bt(m) > ft ? "Sealing is behind" : "Every minute up to this one is sealed",
          children: [
            je[E] ?? E,
            " sealed through ",
            /* @__PURE__ */ t("strong", { className: "ahv-num", children: m })
          ]
        },
        E
      )),
      N && /* @__PURE__ */ n("span", { children: [
        "Check of ",
        N.day,
        ":",
        " ",
        /* @__PURE__ */ t("strong", { className: N.ok === !1 ? "ahv-bad" : N.ok ? "ahv-ok" : "ahv-warn", children: N.ok === !1 ? `${N.problems ?? ""} problem(s)`.trim() : N.ok ? "intact" : "not checked" })
      ] }),
      v && /* @__PURE__ */ t("button", { type: "button", className: "ahv-link-button ahv-push-right", "aria-expanded": s, onClick: () => i((E) => !E), children: "Check integrity" })
    ] }),
    s && v && /* @__PURE__ */ n("div", { className: "ahv-checks", children: [
      /* @__PURE__ */ n("div", { className: "ahv-bar", children: [
        /* @__PURE__ */ n("label", { className: "ahv-field", children: [
          /* @__PURE__ */ t("span", { children: "Day (UTC)" }),
          /* @__PURE__ */ t(
            "input",
            {
              type: "date",
              className: "ahv-input",
              value: l,
              max: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
              min: "2000-01-01",
              onChange: (E) => o(E.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ n("button", { type: "button", className: "ahv-button ahv-button-main", disabled: d || !l, onClick: S, children: [
          /* @__PURE__ */ t(O, { name: "shield", size: 14 }),
          d ? "Checking…" : "Check this day"
        ] }),
        /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            className: "ahv-button",
            disabled: d || !l,
            onClick: c,
            title: "The day's last seal of each table, to keep outside the database",
            children: [
              /* @__PURE__ */ t(O, { name: "download", size: 14 }),
              "Download proof"
            ]
          }
        ),
        /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            className: "ahv-button",
            disabled: d,
            title: "Compare a proof kept earlier with the database",
            onClick: () => {
              var E;
              return (E = k.current) == null ? void 0 : E.click();
            },
            children: [
              /* @__PURE__ */ t(O, { name: "check", size: 14 }),
              "Check a kept proof"
            ]
          }
        ),
        /* @__PURE__ */ t(
          "input",
          {
            ref: k,
            type: "file",
            accept: "application/json,.json",
            className: "ahv-hidden",
            tabIndex: -1,
            "aria-hidden": "true",
            onChange: (E) => {
              var C;
              const m = (C = E.target.files) == null ? void 0 : C[0];
              E.target.value = "", m && g(m);
            }
          }
        )
      ] }),
      h && /* @__PURE__ */ t(Xa, { verdict: h })
    ] })
  ] });
}
function Xa({ verdict: e }) {
  return e.kind === "error" ? /* @__PURE__ */ t("p", { className: "ahv-bad", role: "alert", children: e.message }) : e.kind === "day" ? /* @__PURE__ */ n("div", { role: "status", className: L("ahv-verdict", e.ok ? "ahv-verdict-ok" : "ahv-verdict-bad"), children: [
    /* @__PURE__ */ t("strong", { children: e.ok ? `${e.day}: intact. ${e.rows.toLocaleString()} records in ${e.checked.toLocaleString()} sealed minutes match their seals.` : `${e.day}: ${(e.problems.length + e.more).toLocaleString()} problem(s) found.` }),
    !e.ok && /* @__PURE__ */ n("ul", { children: [
      e.problems.slice(0, Ha).map((a, s) => /* @__PURE__ */ n("li", { children: [
        /* @__PURE__ */ t("span", { className: "ahv-mono", children: a.window_start }),
        " ",
        je[a.table] ?? a.table,
        ": ",
        a.problem
      ] }, s)),
      e.more > 0 && /* @__PURE__ */ n("li", { className: "ahv-dim", children: [
        "and ",
        e.more.toLocaleString(),
        " more"
      ] })
    ] })
  ] }) : e.kind === "downloaded" ? /* @__PURE__ */ t("div", { role: "status", className: "ahv-verdict ahv-verdict-ok", children: /* @__PURE__ */ n("strong", { children: [
    "Proof of ",
    e.day,
    " downloaded. Keep it outside this system: checking it later shows any rewrite since."
  ] }) }) : e.mismatches.length ? /* @__PURE__ */ n("div", { role: "status", className: "ahv-verdict ahv-verdict-bad", children: [
    /* @__PURE__ */ n("strong", { children: [
      e.name,
      ": the database no longer matches this proof of ",
      e.day,
      "."
    ] }),
    /* @__PURE__ */ t("ul", { children: e.mismatches.map((a, s) => /* @__PURE__ */ n("li", { children: [
      /* @__PURE__ */ t("span", { className: "ahv-mono", children: a.window_start }),
      " ",
      je[a.table] ?? a.table,
      ": ",
      a.problem
    ] }, s)) })
  ] }) : /* @__PURE__ */ t("div", { role: "status", className: "ahv-verdict ahv-verdict-ok", children: /* @__PURE__ */ n("strong", { children: [
    e.name,
    ": the database still matches this proof of ",
    e.day,
    "."
  ] }) });
}
function yt(e, a) {
  const s = e.lastIndexOf(" ", a - 1) + 1, i = e.indexOf(" ", a);
  return { start: s, end: i < 0 ? e.length : i, word: e.slice(s, i < 0 ? e.length : i) };
}
function Ya({ value: e, onChange: a, onSubmit: s, suggestions: i, placeholder: l, inputRef: o }) {
  const d = P(null), u = o ?? d, h = ta(), [b, k] = T(0), [y, v] = T(!1), [f, N] = T(0), [p, M] = T(!1), { start: S, end: c, word: g } = yt(e, b), _ = y ? i(g) : [], q = _[Math.min(f, _.length - 1)], E = (m) => {
    const C = e.slice(c), I = m.insert.endsWith(":") ? "" : " ", Ne = `${e.slice(0, S)}${m.insert}${C.startsWith(" ") || !I ? "" : I}${C}`, te = S + m.insert.length + (m.insert.endsWith(":") ? 0 : 1);
    a(Ne), N(0), M(!1), requestAnimationFrame(() => {
      var z, de;
      (z = u.current) == null || z.focus(), (de = u.current) == null || de.setSelectionRange(te, te), k(te);
    });
  };
  return /* @__PURE__ */ n("div", { className: "ahv-search", children: [
    /* @__PURE__ */ n("span", { className: "ahv-input-icon", children: [
      /* @__PURE__ */ t(O, { name: "search", size: 14 }),
      /* @__PURE__ */ t(
        "input",
        {
          ref: u,
          className: "ahv-input",
          role: "combobox",
          "aria-label": "Search",
          "aria-expanded": _.length > 0,
          "aria-controls": h,
          "aria-autocomplete": "list",
          "aria-activedescendant": _.length && p ? `${h}-${_.indexOf(q)}` : void 0,
          value: e,
          placeholder: l,
          spellCheck: !1,
          onChange: (m) => {
            a(m.target.value), k(m.target.selectionStart ?? m.target.value.length), v(!0), N(0), M(!1);
          },
          onSelect: (m) => {
            const C = m.currentTarget.selectionStart ?? 0;
            yt(e, C).start !== S && M(!1), k(C);
          },
          onFocus: () => v(!0),
          onBlur: () => setTimeout(() => {
            v(!1), M(!1);
          }, 120),
          onKeyDown: (m) => {
            _.length && (m.key === "ArrowDown" || m.key === "ArrowUp") ? (m.preventDefault(), N((C) => p ? (C + (m.key === "ArrowDown" ? 1 : _.length - 1)) % _.length : m.key === "ArrowDown" ? 0 : _.length - 1), M(!0)) : _.length && p && m.key === "Enter" ? (m.preventDefault(), E(q)) : m.key === "Escape" ? (v(!1), M(!1)) : m.key === "Enter" && (v(!1), s());
          }
        }
      )
    ] }),
    _.length > 0 && /* @__PURE__ */ t("ul", { id: h, role: "listbox", className: "ahv-suggest", children: _.map((m, C) => /* @__PURE__ */ n(
      "li",
      {
        id: `${h}-${C}`,
        role: "option",
        "aria-selected": p && m === q,
        className: L(p && m === q && "ahv-suggest-on"),
        onMouseDown: (I) => {
          I.preventDefault(), E(m);
        },
        onMouseEnter: () => {
          N(C), M(!0);
        },
        children: [
          /* @__PURE__ */ t("span", { className: "ahv-mono", children: m.label }),
          m.hint && /* @__PURE__ */ t("span", { className: "ahv-dim", children: m.hint })
        ]
      },
      m.insert
    )) })
  ] });
}
function Je({ label: e, icon: a, children: s, open: i, setOpen: l, badge: o, disabled: d }) {
  const u = P(null);
  return K(() => {
    if (!i) return;
    const h = (k) => {
      u.current && !k.composedPath().includes(u.current) && l(!1);
    }, b = (k) => k.key === "Escape" && l(!1);
    return document.addEventListener("mousedown", h), document.addEventListener("keydown", b), () => {
      document.removeEventListener("mousedown", h), document.removeEventListener("keydown", b);
    };
  }, [i, l]), /* @__PURE__ */ n("div", { className: "ahv-menu", ref: u, children: [
    /* @__PURE__ */ n("button", { type: "button", className: "ahv-button", "aria-expanded": i, disabled: d, onClick: () => l(!i), children: [
      /* @__PURE__ */ t(O, { name: a, size: 14 }),
      e,
      o && /* @__PURE__ */ t("span", { className: "ahv-count", children: o }),
      /* @__PURE__ */ t(O, { name: "chevronDown", size: 14 })
    ] }),
    i && /* @__PURE__ */ t("div", { className: "ahv-menu-list ahv-menu-panel", children: s })
  ] });
}
function Za({ columns: e, shown: a, onChange: s }) {
  const [i, l] = T(!1);
  return /* @__PURE__ */ n(Je, { label: "Columns", icon: "sliders", open: i, setOpen: l, children: [
    /* @__PURE__ */ t("p", { className: "ahv-dim ahv-small", children: "When, who and what always show." }),
    e.map((o) => /* @__PURE__ */ n("label", { className: "ahv-check", children: [
      /* @__PURE__ */ t(
        "input",
        {
          type: "checkbox",
          checked: a.includes(o.key),
          onChange: (d) => s(d.target.checked ? [...a, o.key] : a.filter((u) => u !== o.key))
        }
      ),
      o.label
    ] }, o.key))
  ] });
}
function Qa({ request: e, current: a, onOpen: s }) {
  var c;
  const [i, l] = T(!1), o = U("views", () => e("views", { method: "GET" })), [d, u] = T(""), [h, b] = T(!1), [k, y] = T(!1), [v, f] = T(null);
  if (!((c = o.data) != null && c.enabled)) return null;
  const N = o.data.views, p = N.find((g) => g.search === a), M = async (g) => {
    y(!0), f(null);
    try {
      await g(), o.refresh(), u("");
    } catch (_) {
      f(_.message);
    } finally {
      y(!1);
    }
  }, S = (g, _ = d, q = h) => M(() => e("views", { method: "POST", body: { id: g, name: _.trim(), search: a, shared: q } }));
  return /* @__PURE__ */ n(Je, { label: p ? p.name : "Views", icon: "layers", open: i, setOpen: l, children: [
    N.length ? /* @__PURE__ */ t("ul", { className: "ahv-views", children: N.map((g) => /* @__PURE__ */ n("li", { className: L(g === p && "ahv-views-on"), children: [
      /* @__PURE__ */ n("button", { type: "button", className: "ahv-views-open", onClick: () => {
        s(g.search), l(!1);
      }, children: [
        /* @__PURE__ */ t("span", { children: g.name }),
        /* @__PURE__ */ t("span", { className: "ahv-dim ahv-small", children: g.mine ? g.shared ? "Shared by you" : "Only you" : `Shared by ${g.owner_name}` })
      ] }),
      g.mine && /* @__PURE__ */ n("span", { className: "ahv-views-tools", children: [
        g.search !== a && /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            className: "ahv-icon-button",
            title: "Save the current search into this view",
            disabled: k,
            onClick: () => S(g.id, g.name, g.shared),
            children: /* @__PURE__ */ t(O, { name: "refresh", size: 14 })
          }
        ),
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            className: "ahv-icon-button",
            title: "Remove this view",
            disabled: k,
            onClick: () => M(() => e(`views/${g.id}`, { method: "DELETE" })),
            children: /* @__PURE__ */ t(O, { name: "close", size: 14 })
          }
        )
      ] })
    ] }, g.id)) }) : /* @__PURE__ */ t("p", { className: "ahv-dim ahv-small", children: "No saved views yet. Save the current search to come back to it." }),
    /* @__PURE__ */ n("form", { className: "ahv-views-save", onSubmit: (g) => {
      g.preventDefault(), d.trim() && S();
    }, children: [
      /* @__PURE__ */ t(
        "input",
        {
          className: "ahv-input",
          value: d,
          maxLength: 80,
          placeholder: "Name this search",
          "aria-label": "View name",
          onChange: (g) => u(g.target.value)
        }
      ),
      /* @__PURE__ */ n("label", { className: "ahv-check", children: [
        /* @__PURE__ */ t("input", { type: "checkbox", checked: h, onChange: (g) => b(g.target.checked) }),
        "Share with my team"
      ] }),
      /* @__PURE__ */ t("button", { type: "submit", className: "ahv-button ahv-button-main", disabled: k || !d.trim(), children: "Save view" }),
      v && /* @__PURE__ */ t("span", { className: "ahv-bad ahv-small", children: v })
    ] })
  ] });
}
const en = { active: ["Active", "ahv-tag-ok"], failing: ["Failing", "ahv-tag-bad"], paused: ["Paused", "ahv-tag-warn"] }, Nt = { events: "Events", requests: "API requests", both: "Events and API requests" }, Ut = {
  name: "",
  kind: "events",
  query: "",
  destination: "webhook",
  url: "",
  headers: "",
  secret: "",
  bucket: "",
  prefix: "",
  region: "",
  endpoint: "",
  accessKey: "",
  secretKey: "",
  start: "now",
  enabled: !0
}, Le = (e) => e.destination === "webhook" ? e.target.url ?? "" : `s3://${[e.target.bucket, e.target.prefix].filter(Boolean).join("/")}`, kt = (e) => ({
  ...Ut,
  id: e.id,
  name: e.name,
  kind: e.kind,
  query: e.query,
  destination: e.destination,
  url: e.target.url ?? "",
  headers: Object.keys(e.target.headers ?? {}).map((a) => `${a}: `).join(`
`),
  bucket: e.target.bucket ?? "",
  prefix: e.target.prefix ?? "",
  region: e.target.region ?? "",
  endpoint: e.target.endpoint ?? "",
  enabled: e.enabled
});
function tn(e) {
  const a = {};
  for (const s of e.split(`
`)) {
    const i = s.indexOf(":");
    i > 0 && (a[s.slice(0, i).trim()] = s.slice(i + 1).trim());
  }
  return a;
}
function St(e) {
  const a = e.destination === "webhook", s = a ? e.secret || void 0 : e.accessKey || e.secretKey ? { access_key: e.accessKey, secret_key: e.secretKey } : void 0;
  return {
    id: e.id,
    name: e.name.trim(),
    kind: e.kind,
    query: e.query.trim(),
    destination: e.destination,
    target: a ? { url: e.url.trim() } : { bucket: e.bucket.trim(), prefix: e.prefix.trim(), region: e.region.trim(), endpoint: e.endpoint.trim() },
    // header values are secrets: sent under a name the access log masks, kept encrypted
    secret: s,
    secret_headers: a ? tn(e.headers) : {},
    enabled: e.enabled,
    start: e.start
  };
}
const _t = () => Array.from(crypto.getRandomValues(new Uint8Array(24)), (e) => e.toString(16).padStart(2, "0")).join("");
function an({ request: e, kinds: a, list: s, refresh: i }) {
  const [l, o] = T(null), [d, u] = T(!1), [h, b] = T(null), k = async (c, g) => {
    u(!0), b(null);
    try {
      return await c(), g && b({ ok: !0, text: g }), i(), !0;
    } catch (_) {
      return b({ ok: !1, text: _.message }), !1;
    } finally {
      u(!1);
    }
  }, y = async (c) => {
    c.preventDefault(), l && await k(() => e("streams", { method: "POST", body: St(l) }), `${l.name.trim()} saved.`) && o(null);
  }, v = (c) => k(async () => {
    const g = await e(`streams/${c.id}/test`, { method: "POST" });
    if (!g.ok) throw new Error(`${c.name}: ${g.error}`);
  }, `${c.name}: the test line was delivered.`), f = (c) => k(
    () => e("streams", { method: "POST", body: { ...St(kt(c)), enabled: !c.enabled } }),
    `${c.name} ${c.enabled ? "paused" : "resumed"}.`
  ), N = (c) => window.confirm(`Remove ${c.name}? Nothing more is sent to ${Le(c)}.`) && k(() => e(`streams/${c.id}`, { method: "DELETE" }), `${c.name} removed.`), p = (c) => o((g) => g && { ...g, ...c }), M = a.includes("requests") ? ["events", "requests", "both"] : ["events"], S = l && !M.includes(l.kind) ? [...M, l.kind] : M;
  return /* @__PURE__ */ n("section", { className: "ahv-streams", "aria-label": "Streams", children: [
    /* @__PURE__ */ n("div", { className: "ahv-bar", children: [
      /* @__PURE__ */ t("p", { className: "ahv-dim ahv-small", children: "Each stream sends new records to your own system as they are sealed, a few minutes after they happen. Webhooks receive JSON lines signed with your secret; S3 buckets receive one gzip file per batch." }),
      !l && /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          className: "ahv-button ahv-button-main ahv-push-right",
          onClick: () => {
            b(null), o({ ...Ut, secret: _t() });
          },
          children: "Add stream"
        }
      )
    ] }),
    s.streams.length > 0 && !l && /* @__PURE__ */ t("ul", { className: "ahv-stream-list", children: s.streams.map((c) => {
      const [g, _] = en[c.state];
      return /* @__PURE__ */ n("li", { children: [
        /* @__PURE__ */ n("div", { className: "ahv-stream-main", children: [
          /* @__PURE__ */ t("strong", { children: c.name }),
          /* @__PURE__ */ t("span", { className: L("ahv-tag", _), children: g }),
          /* @__PURE__ */ n("span", { className: "ahv-dim ahv-small", children: [
            Nt[c.kind],
            c.query && /* @__PURE__ */ n(D, { children: [
              " matching ",
              /* @__PURE__ */ t("code", { className: "ahv-mono", children: c.query })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ t("span", { className: "ahv-mono ahv-dim ahv-stream-where", title: Le(c), children: Le(c) }),
        /* @__PURE__ */ n("span", { className: "ahv-small", children: [
          /* @__PURE__ */ t("strong", { className: "ahv-num", children: c.delivered.toLocaleString() }),
          " delivered",
          c.last_delivered_at && /* @__PURE__ */ n("span", { className: "ahv-dim", children: [
            ", last ",
            Fe(c.last_delivered_at) || c.last_delivered_at.slice(0, 16)
          ] })
        ] }),
        /* @__PURE__ */ n("span", { className: "ahv-stream-tools", children: [
          /* @__PURE__ */ t("button", { type: "button", className: "ahv-link-button", disabled: d, onClick: () => v(c), children: "Send test" }),
          /* @__PURE__ */ t("button", { type: "button", className: "ahv-link-button", disabled: d, onClick: () => f(c), children: c.enabled ? "Pause" : "Resume" }),
          /* @__PURE__ */ t("button", { type: "button", className: "ahv-link-button", disabled: d, onClick: () => {
            b(null), o(kt(c));
          }, children: "Edit" }),
          /* @__PURE__ */ t("button", { type: "button", className: "ahv-icon-button", title: `Remove ${c.name}`, disabled: d, onClick: () => N(c), children: /* @__PURE__ */ t(O, { name: "close", size: 14 }) })
        ] }),
        c.state === "failing" && c.error && /* @__PURE__ */ n("span", { className: "ahv-bad ahv-small", children: [
          c.error,
          ". It is tried again shortly."
        ] })
      ] }, c.id);
    }) }),
    !s.streams.length && !l && /* @__PURE__ */ t("p", { className: "ahv-dim ahv-small", children: "No streams yet." }),
    l && /* @__PURE__ */ n("form", { className: "ahv-stream-form", onSubmit: y, children: [
      /* @__PURE__ */ n("label", { className: "ahv-field", children: [
        /* @__PURE__ */ t("span", { children: "Name" }),
        /* @__PURE__ */ t("input", { className: "ahv-input", required: !0, maxLength: 80, value: l.name, placeholder: "CRM intake", onChange: (c) => p({ name: c.target.value }) })
      ] }),
      /* @__PURE__ */ n("label", { className: "ahv-field", children: [
        /* @__PURE__ */ t("span", { children: "Records" }),
        /* @__PURE__ */ t("select", { className: "ahv-input", value: l.kind, disabled: S.length < 2, onChange: (c) => p({ kind: c.target.value }), children: S.map((c) => /* @__PURE__ */ t("option", { value: c, children: Nt[c] }, c)) })
      ] }),
      /* @__PURE__ */ n("label", { className: "ahv-field ahv-field-wide", children: [
        /* @__PURE__ */ n("span", { children: [
          "Only records matching ",
          /* @__PURE__ */ t("em", { className: "ahv-dim", children: "(optional, the search language)" })
        ] }),
        /* @__PURE__ */ t(
          "input",
          {
            className: "ahv-input ahv-mono",
            maxLength: 500,
            value: l.query,
            placeholder: "action:trade.* -result:success",
            onChange: (c) => p({ query: c.target.value })
          }
        )
      ] }),
      /* @__PURE__ */ n("div", { className: "ahv-field ahv-field-wide", children: [
        /* @__PURE__ */ t("span", { children: "Send to" }),
        /* @__PURE__ */ t("div", { className: "ahv-segment", role: "group", "aria-label": "Destination", children: ["webhook", "s3"].map((c) => /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            "aria-pressed": l.destination === c,
            disabled: !!l.id,
            onClick: () => p({ destination: c, secret: c === "webhook" && !l.id ? _t() : "" }),
            children: c === "webhook" ? "Webhook" : "S3 bucket"
          },
          c
        )) })
      ] }),
      l.destination === "webhook" ? /* @__PURE__ */ n(D, { children: [
        /* @__PURE__ */ n("label", { className: "ahv-field ahv-field-wide", children: [
          /* @__PURE__ */ n("span", { children: [
            "URL ",
            /* @__PURE__ */ t("em", { className: "ahv-dim", children: "(https, on the internet)" })
          ] }),
          /* @__PURE__ */ t(
            "input",
            {
              className: "ahv-input ahv-mono",
              type: "url",
              required: !0,
              value: l.url,
              placeholder: "https://crm.example.com/activity",
              onChange: (c) => p({ url: c.target.value })
            }
          )
        ] }),
        /* @__PURE__ */ n("label", { className: "ahv-field ahv-field-wide", children: [
          /* @__PURE__ */ n("span", { children: [
            "Signing secret ",
            /* @__PURE__ */ t("em", { className: "ahv-dim", children: l.id ? "(blank keeps the current one while the URL's host stays the same)" : "(copy it to your receiver: it is not shown again)" })
          ] }),
          /* @__PURE__ */ t(
            "input",
            {
              className: "ahv-input ahv-mono",
              minLength: 16,
              required: !l.id,
              value: l.secret,
              autoComplete: "off",
              onChange: (c) => p({ secret: c.target.value })
            }
          )
        ] }),
        /* @__PURE__ */ n("label", { className: "ahv-field ahv-field-wide", children: [
          /* @__PURE__ */ n("span", { children: [
            "Headers ",
            /* @__PURE__ */ t("em", { className: "ahv-dim", children: '(one "Name: value" a line, kept encrypted; on an edit a blank value keeps the stored one)' })
          ] }),
          /* @__PURE__ */ t(
            "textarea",
            {
              className: "ahv-input ahv-textarea ahv-mono",
              rows: 2,
              value: l.headers,
              placeholder: "Authorization: Bearer …",
              onChange: (c) => p({ headers: c.target.value })
            }
          )
        ] })
      ] }) : /* @__PURE__ */ n(D, { children: [
        /* @__PURE__ */ n("label", { className: "ahv-field", children: [
          /* @__PURE__ */ t("span", { children: "Bucket" }),
          /* @__PURE__ */ t("input", { className: "ahv-input", required: !0, value: l.bucket, onChange: (c) => p({ bucket: c.target.value }) })
        ] }),
        /* @__PURE__ */ n("label", { className: "ahv-field", children: [
          /* @__PURE__ */ n("span", { children: [
            "Folder ",
            /* @__PURE__ */ t("em", { className: "ahv-dim", children: "(optional)" })
          ] }),
          /* @__PURE__ */ t("input", { className: "ahv-input", value: l.prefix, placeholder: "activity", onChange: (c) => p({ prefix: c.target.value }) })
        ] }),
        /* @__PURE__ */ n("label", { className: "ahv-field", children: [
          /* @__PURE__ */ n("span", { children: [
            "Region ",
            /* @__PURE__ */ t("em", { className: "ahv-dim", children: "(optional)" })
          ] }),
          /* @__PURE__ */ t("input", { className: "ahv-input", value: l.region, placeholder: "eu-central-1", onChange: (c) => p({ region: c.target.value }) })
        ] }),
        /* @__PURE__ */ n("label", { className: "ahv-field", children: [
          /* @__PURE__ */ n("span", { children: [
            "Endpoint ",
            /* @__PURE__ */ t("em", { className: "ahv-dim", children: "(for R2, MinIO …)" })
          ] }),
          /* @__PURE__ */ t("input", { className: "ahv-input ahv-mono", type: "url", value: l.endpoint, onChange: (c) => p({ endpoint: c.target.value }) })
        ] }),
        /* @__PURE__ */ n("label", { className: "ahv-field", children: [
          /* @__PURE__ */ n("span", { children: [
            "Access key ",
            l.id && /* @__PURE__ */ t("em", { className: "ahv-dim", children: "(blank keeps it)" })
          ] }),
          /* @__PURE__ */ t("input", { className: "ahv-input ahv-mono", required: !l.id, autoComplete: "off", value: l.accessKey, onChange: (c) => p({ accessKey: c.target.value }) })
        ] }),
        /* @__PURE__ */ n("label", { className: "ahv-field", children: [
          /* @__PURE__ */ t("span", { children: "Secret key" }),
          /* @__PURE__ */ t(
            "input",
            {
              className: "ahv-input ahv-mono",
              type: "password",
              required: !l.id || !!l.accessKey,
              autoComplete: "new-password",
              value: l.secretKey,
              onChange: (c) => p({ secretKey: c.target.value })
            }
          )
        ] })
      ] }),
      !l.id && /* @__PURE__ */ n("label", { className: "ahv-field ahv-field-wide", children: [
        /* @__PURE__ */ t("span", { children: "Start with" }),
        /* @__PURE__ */ n("select", { className: "ahv-input", value: l.start, onChange: (c) => p({ start: c.target.value }), children: [
          /* @__PURE__ */ t("option", { value: "now", children: "Records from now on" }),
          /* @__PURE__ */ t("option", { value: "beginning", children: "Everything already kept, then what follows" })
        ] })
      ] }),
      /* @__PURE__ */ n("div", { className: "ahv-bar ahv-field-wide", children: [
        /* @__PURE__ */ t("button", { type: "submit", className: "ahv-button ahv-button-main", disabled: d, children: d ? "Saving…" : l.id ? "Save changes" : "Add stream" }),
        /* @__PURE__ */ t("button", { type: "button", className: "ahv-button", disabled: d, onClick: () => o(null), children: "Cancel" })
      ] })
    ] }),
    h && /* @__PURE__ */ t("p", { role: h.ok ? "status" : "alert", className: L("ahv-small", h.ok ? "ahv-ok" : "ahv-bad"), children: h.text })
  ] });
}
const wt = [
  { value: "important", label: "Important", hint: "What people did, without the details behind it" },
  { value: "all", label: "All", hint: "Every record, each request's row changes inside its event" },
  { value: "problems", label: "Problems", hint: "Only what failed or was refused" }
], nn = [
  { label: "All requests", search: {} },
  { label: "Changes only", search: { filters: { method: ["POST", "PUT", "PATCH", "DELETE"] } } },
  { label: "Errors", search: { status_from: 400 } }
], We = [
  { value: "1h", label: "Last hour", minutes: 60 },
  { value: "24h", label: "Last 24 hours", minutes: 1440 },
  { value: "7d", label: "Last 7 days", minutes: 10080 },
  { value: "30d", label: "Last 30 days", minutes: 43200 },
  { value: "all", label: "All time" },
  { value: "custom", label: "Dates…" }
], Ct = {
  events: [
    { key: "where", label: "Where" },
    { key: "concerning", label: "Concerning" },
    { key: "result", label: "Result" },
    { key: "service", label: "Service" },
    { key: "ip", label: "IP address" }
  ],
  requests: [{ key: "where", label: "Where" }, { key: "service", label: "Service" }, { key: "ip", label: "IP address" }]
}, $t = ["where"], sn = [], zt = "activity-hub-columns", pe = ["kind", "view", "p", "q", "range", "from", "to", "cols"], ie = (e) => e ? "all" : "7d";
function Tt(e, a) {
  const s = (o) => {
    const d = e.get(o) ?? "";
    return Ae(d) ? d : "";
  }, i = s("from"), l = s("to");
  return { q: e.get("q") ?? "", from: i, to: l, range: e.get("range") || (i || l ? "custom" : ie(a)) };
}
function ln(e) {
  var s;
  if (e.range === "custom")
    return { occurred_from: Ae(e.from) ? De(e.from) : void 0, occurred_to: Ae(e.to) ? da(e.to) : void 0 };
  const a = (s = We.find((i) => i.value === e.range)) == null ? void 0 : s.minutes;
  return a ? { occurred_from: `${ha(a).slice(0, 16)}:00` } : {};
}
function rn(e, a, s, i, l) {
  const o = { ...(s == null ? void 0 : s.search.filters) ?? {} }, d = { kind: e, filters: o, query: i.q.trim() || void 0, ...ln(i) };
  return e === "events" ? (d.view = a, d.action = s == null ? void 0 : s.search.action, l && Object.assign(d, { related_type: l.type, related_id: l.id })) : (d.status_from = s == null ? void 0 : s.search.status_from, l && (o.actor_id = l.id)), d;
}
const on = (e) => {
  const a = new URLSearchParams();
  return e.forEach((s, i) => pe.includes(i) && a.set(i, s)), a.toString();
};
function cn() {
  try {
    return JSON.parse(localStorage.getItem(zt) ?? "null") ?? $t;
  } catch {
    return $t;
  }
}
function bn({
  request: e,
  title: a = "Activity Log",
  description: s,
  presets: i = sn,
  kinds: l = ["events", "requests"],
  entity: o,
  params: d,
  onParamsChange: u,
  canExport: h = !1,
  showStatus: b = !0,
  pageSize: k = 100,
  liveEveryMs: y = 5e3,
  className: v
}) {
  var ct, dt, ht, ut, mt, vt, pt;
  const [f, N] = T(() => new URLSearchParams()), p = d ?? f, M = Be((r) => u ? u(r) : N(r), [u]), S = p.get("kind") === "requests" && l.includes("requests") ? "requests" : l[0], c = ((ct = wt.find((r) => r.value === p.get("view"))) == null ? void 0 : ct.value) ?? "important", g = oe(() => S === "events" ? [{ label: "Everything", search: {} }, ...i] : nn, [S, i]), _ = Math.min(Math.max(Number(p.get("p")) || 0, 0), g.length - 1), q = p.has("cols") ? (p.get("cols") || "").split(",").filter(Boolean) : cn(), E = Ct[S].filter((r) => q.includes(r.key)), m = oe(() => Tt(p, o), [p, o]), [C, I] = T(m), [Ne, te] = T(p.toString());
  Ne !== p.toString() && (te(p.toString()), I(m));
  const [z, de] = T(!1), [ke, he] = T(null), [Se, _e] = T(null), [jt, Ge] = T(!1), [Xe, we] = T(null), Ye = P(null), [, Wt] = T(0);
  K(() => {
    const r = setInterval(() => Wt((w) => w + 1), 3e4);
    return () => clearInterval(r);
  }, []);
  const H = oe(
    () => rn(S, c, g[_], m, o),
    [S, c, g, _, m, o]
  ), ue = JSON.stringify(H), R = la(e, H, k, z, y), Ce = P(null), ae = U(ue, () => {
    var x;
    const r = ue, w = !H.occurred_from && ((x = Ce.current) == null ? void 0 : x.key) === r;
    return e("chart", { method: "POST", body: w ? { ...H, occurred_from: Ce.current.from } : H }).then(($) => (H.occurred_from || (Ce.current = { key: r, from: $.occurred_from }), $));
  }, z ? y : void 0), ne = U("catalog", () => e("catalog", { method: "GET" })), Ze = U(b ? "status" : null, () => e("status", { method: "GET" }), 6e4), se = U(h && !o ? "streams" : null, () => e("streams", { method: "GET" }), 6e4), [Qe, Bt] = T(!1), et = (r) => Ja(r.received_at, F(r) ? "events" : "access_logs", Ze.data), tt = (r) => () => e("values", { method: "POST", body: { ...H, field: r } }).then((w) => w.values), Ft = U(`${ue}|service`, tt("service")), Kt = U(`${ue}|origin`, tt("origin")), at = (r = {}) => {
    const w = new URLSearchParams(p);
    for (const Oe of pe) w.delete(Oe);
    const x = r.kind ?? S;
    let $ = r.draft ?? C;
    if (x !== S) {
      const Oe = new Set(Sa(x));
      $ = { ...$, q: re($.q).filter((me) => !me.field || Oe.has(me.field)).map((me) => me.text).join(" ") };
    }
    x !== l[0] && w.set("kind", x), (r.view ?? c) !== "important" && w.set("view", r.view ?? c);
    const G = r.preset ?? (r.kind && r.kind !== S ? 0 : _);
    return G && w.set("p", String(G)), $.q.trim() && w.set("q", $.q.trim()), $.range !== ie(o) && w.set("range", $.range), $.range === "custom" && ($.from && w.set("from", $.from), $.to && w.set("to", $.to)), (r.columns || p.has("cols")) && w.set("cols", (r.columns ?? q).join(",")), w;
  }, j = (r = {}) => {
    r.draft && I(r.draft), M(at(r));
  }, Ht = (r) => {
    try {
      localStorage.setItem(zt, JSON.stringify(r));
    } catch {
    }
    j({ draft: m, columns: r });
  }, Vt = (r, w) => {
    const x = re(m.q).filter(($) => $.field !== r).map(($) => $.text);
    j({ draft: { ...m, q: [...x, `${r}:${Ie(w)}`].join(" ") } });
  }, nt = (r) => {
    he(null), r.actor_id ? Vt("actor", r.actor_id) : r.target_type && r.target_id && j({
      kind: "events",
      view: "all",
      preset: 0,
      draft: { q: `on:${r.target_type}:${Ie(r.target_id)}`, range: "all", from: "", to: "" }
    });
  }, Jt = (r) => {
    const w = C.q.trim();
    I({ ...C, q: `${w ? `${w} ` : ""}${r}:` }), requestAnimationFrame(() => {
      const x = Ye.current;
      x && (x.focus(), x.setSelectionRange(x.value.length, x.value.length));
    });
  }, Gt = C.q.trim() !== m.q.trim() || C.range !== m.range || C.from !== m.from || C.to !== m.to, le = !!(C.range === "custom" && C.from && C.to && C.to < C.from), $e = P(null), st = P(null), { hasMore: lt, loadMore: Te, more: V, pageCount: rt } = R;
  K(() => {
    if (!$e.current || !lt || V.loading || V.error || rt >= qe) return;
    const r = new IntersectionObserver(([w]) => w.isIntersecting && Te(), { root: st.current, rootMargin: "240px" });
    return r.observe($e.current), () => r.disconnect();
  }, [lt, Te, V.loading, V.error, rt, R.rows.length]);
  const it = async (r) => {
    Ge(!1), _e(0);
    try {
      const { rows: w, more: x } = await pa(e, H, _e);
      x && we(`Only the newest ${ve.toLocaleString()} rows were exported. Narrow the dates for the rest.`);
      const $ = (/* @__PURE__ */ new Date()).toISOString().slice(0, 16).replace(/[-:T]/g, ""), G = `activity-${o ? `${o.type}-${o.id}-` : ""}${S}-${$}`;
      r === "csv" ? Pe(fa(S, w), `${G}.csv`, "text/csv;charset=utf-8") : Pe(ba(w), `${G}.jsonl`, "application/x-ndjson");
    } catch (w) {
      we(`Export failed: ${w.message}`);
    } finally {
      _e(null);
    }
  }, Me = S === "events" ? "events" : "requests", Ee = ((dt = ne.data) == null ? void 0 : dt.actor_types) ?? {}, ot = ((ht = ne.data) == null ? void 0 : ht.entities) ?? {}, Xt = (r) => {
    var w, x;
    if (r.field === "action") return ((x = (w = ne.data) == null ? void 0 : w.actions[r.value]) == null ? void 0 : x.title) ?? r.value;
    if (r.field === "actor_type") return Ee[r.value] ?? r.value;
    if (r.field === "on") {
      const [$, ...G] = r.value.split(":");
      return `${ot[$] ?? A($)} ${G.join(":")}`;
    }
    return r.value;
  }, J = R.rows, Yt = { service: Ft.data ?? [], origin: Kt.data ?? [] }, Zt = 3 + E.length;
  return o && !(o.type && o.id) ? /* @__PURE__ */ t("div", { className: L("ahv ahv-log", v), children: /* @__PURE__ */ n(Z, { children: [
    "Nothing to show: no ",
    o.type || "record",
    " chosen."
  ] }) }) : /* @__PURE__ */ n("div", { className: L("ahv ahv-log", v), children: [
    /* @__PURE__ */ n("header", { className: "ahv-head", children: [
      /* @__PURE__ */ n("div", { children: [
        /* @__PURE__ */ n("h2", { className: "ahv-title", children: [
          /* @__PURE__ */ t(O, { name: "log", size: 18 }),
          o && a === "Activity Log" ? "Activity" : a
        ] }),
        /* @__PURE__ */ t("p", { className: "ahv-dim", children: s ?? (o ? `Everything about ${o.label}, and the API requests it made itself. Times are UTC.` : "Every action and API request, kept permanently and sealed. Times are UTC.") })
      ] }),
      /* @__PURE__ */ n("div", { className: "ahv-actions", children: [
        !o && /* @__PURE__ */ t(
          Qa,
          {
            request: e,
            current: on(at({ draft: m })),
            onOpen: (r) => {
              const w = new URLSearchParams(p);
              for (const x of pe) w.delete(x);
              new URLSearchParams(r).forEach((x, $) => pe.includes($) && w.set($, x)), M(w);
            }
          }
        ),
        /* @__PURE__ */ t(Za, { columns: Ct[S], shown: q, onChange: Ht }),
        h && /* @__PURE__ */ n(
          Je,
          {
            label: Se === null ? "Export" : `Exporting… ${Se.toLocaleString()}`,
            icon: "download",
            open: jt,
            setOpen: Ge,
            disabled: Se !== null || !J.length,
            children: [
              /* @__PURE__ */ t("button", { type: "button", role: "menuitem", onClick: () => it("csv"), children: "CSV, for spreadsheets" }),
              /* @__PURE__ */ t("button", { type: "button", role: "menuitem", onClick: () => it("jsonl"), children: "JSON Lines, for other tools" })
            ]
          }
        ),
        ((ut = se.data) == null ? void 0 : ut.enabled) && /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            className: "ahv-button",
            "aria-expanded": Qe,
            onClick: () => Bt((r) => !r),
            title: "Send the log to your own systems as it is written",
            children: [
              /* @__PURE__ */ t(O, { name: "send", size: 14 }),
              "Streams",
              se.data.streams.some((r) => r.state === "failing") && /* @__PURE__ */ t("span", { className: "ahv-count ahv-count-bad", children: "!" })
            ]
          }
        ),
        /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            className: L("ahv-button", z && "ahv-button-live"),
            "aria-pressed": z,
            title: "Check for new activity every few seconds",
            onClick: () => de((r) => !r),
            children: [
              /* @__PURE__ */ t(O, { name: "live", size: 14, className: L(z && "ahv-pulse") }),
              z ? "Live" : "Go live"
            ]
          }
        ),
        /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            className: "ahv-button",
            disabled: R.refreshing && !R.error,
            onClick: () => {
              R.refresh(), ae.refresh();
            },
            children: [
              /* @__PURE__ */ t(O, { name: "refresh", size: 14, className: L(R.refreshing && !z && "ahv-spin") }),
              "Refresh"
            ]
          }
        )
      ] })
    ] }),
    Qe && ((mt = se.data) == null ? void 0 : mt.enabled) && /* @__PURE__ */ t(an, { request: e, kinds: l, list: se.data, refresh: se.refresh }),
    b && !o && /* @__PURE__ */ t(Ga, { request: e, status: Ze.data }),
    /* @__PURE__ */ n("div", { className: "ahv-filters", children: [
      /* @__PURE__ */ n("div", { className: "ahv-bar", children: [
        l.length > 1 && /* @__PURE__ */ t("div", { className: "ahv-segment", role: "group", "aria-label": "Records", children: l.map((r) => /* @__PURE__ */ t("button", { type: "button", "aria-pressed": S === r, onClick: () => j({ kind: r, draft: m }), children: r === "events" ? "Events" : "API requests" }, r)) }),
        S === "events" && /* @__PURE__ */ t("div", { className: "ahv-segment", role: "group", "aria-label": "Show", children: wt.map((r) => /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            title: r.hint,
            "aria-pressed": c === r.value,
            onClick: () => j({ view: r.value, draft: m }),
            children: r.label
          },
          r.value
        )) }),
        g.length > 1 && /* @__PURE__ */ t("div", { className: "ahv-chips", role: "group", "aria-label": "Presets", children: g.map((r, w) => /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            className: "ahv-chip",
            "aria-pressed": _ === w,
            onClick: () => j({ preset: w, draft: m }),
            children: r.label
          },
          r.label
        )) })
      ] }),
      /* @__PURE__ */ n("div", { className: "ahv-searchbar", children: [
        /* @__PURE__ */ t(
          Ya,
          {
            value: C.q,
            inputRef: Ye,
            onChange: (r) => I({ ...C, q: r }),
            onSubmit: () => !le && j({ draft: C }),
            suggestions: (r) => wa(r, S, ne.data, Yt),
            placeholder: S === "events" ? "Search: words, or actor:… action:trade.* -result:success on:account:100234" : "Search: words, or actor:… method:POST status:4xx route:/trading/*"
          }
        ),
        /* @__PURE__ */ t(
          "select",
          {
            className: "ahv-input ahv-range",
            value: C.range,
            "aria-label": "When",
            onChange: (r) => I({ ...C, range: r.target.value }),
            children: We.map((r) => /* @__PURE__ */ t("option", { value: r.value, children: r.label }, r.value))
          }
        ),
        C.range === "custom" && /* @__PURE__ */ n("span", { className: "ahv-pair", children: [
          /* @__PURE__ */ t(
            "input",
            {
              type: "date",
              className: "ahv-input",
              value: C.from,
              "aria-label": "From (UTC)",
              "aria-invalid": le || void 0,
              onChange: (r) => I({ ...C, from: r.target.value })
            }
          ),
          /* @__PURE__ */ t(
            "input",
            {
              type: "date",
              className: "ahv-input",
              value: C.to,
              "aria-label": "To (UTC)",
              "aria-invalid": le || void 0,
              onChange: (r) => I({ ...C, to: r.target.value })
            }
          )
        ] }),
        /* @__PURE__ */ t("button", { type: "button", className: "ahv-button ahv-button-main", disabled: le, onClick: () => j({ draft: C }), children: "Search" })
      ] }),
      le && /* @__PURE__ */ t("em", { className: "ahv-bad ahv-small", children: "The end date is before the start date" }),
      /* @__PURE__ */ n("div", { className: "ahv-bar ahv-add", children: [
        /* @__PURE__ */ t("span", { className: "ahv-dim ahv-small", children: "Add" }),
        Ke(S).filter((r) => !(o && (r.field === "on" || S === "requests" && r.field === "actor"))).slice(0, 8).map((r) => /* @__PURE__ */ t("button", { type: "button", className: "ahv-link-button", title: r.hint, onClick: () => Jt(r.field), children: r.label }, r.field)),
        Gt && /* @__PURE__ */ t("span", { className: "ahv-warn ahv-small ahv-push-right", children: "Not searched yet: press Enter or Search" })
      ] }),
      (re(m.q).length > 0 || m.range !== ie(o)) && /* @__PURE__ */ n("div", { className: "ahv-applied", children: [
        re(m.q).map((r) => /* @__PURE__ */ n("span", { className: L("ahv-pill", r.negated && "ahv-pill-not"), children: [
          /* @__PURE__ */ n("span", { className: "ahv-dim", children: [
            r.negated ? "Not " : "",
            r.field ? `${_a(r.field)}:` : "Text:"
          ] }),
          " ",
          Xt(r),
          /* @__PURE__ */ t("button", { type: "button", "aria-label": `Remove ${r.text}`, onClick: () => j({ draft: { ...m, q: Na(m.q, r) } }), children: /* @__PURE__ */ t(O, { name: "close", size: 12 }) })
        ] }, r.text)),
        m.range !== ie(o) && /* @__PURE__ */ n("span", { className: "ahv-pill", children: [
          /* @__PURE__ */ t("span", { className: "ahv-dim", children: "When:" }),
          " ",
          m.range === "custom" ? [m.from && ee(W(De(m.from))), m.to && ee(W(De(m.to)))].filter(Boolean).join(" – ") || "Any date" : (vt = We.find((r) => r.value === m.range)) == null ? void 0 : vt.label,
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              "aria-label": "Remove the time range",
              onClick: () => j({ draft: { ...m, range: ie(o), from: "", to: "" } }),
              children: /* @__PURE__ */ t(O, { name: "close", size: 12 })
            }
          )
        ] }),
        /* @__PURE__ */ t("button", { type: "button", className: "ahv-link-button", onClick: () => j({ preset: 0, draft: Tt(new URLSearchParams(), o) }), children: "Clear all" })
      ] })
    ] }),
    ae.error && !ae.data ? null : /* @__PURE__ */ t(Oa, { chart: ae.data, noun: Me, loading: ae.loading }),
    Xe && /* @__PURE__ */ t(Z, { action: /* @__PURE__ */ t("button", { type: "button", className: "ahv-icon-button", "aria-label": "Dismiss", onClick: () => we(null), children: /* @__PURE__ */ t(O, { name: "close", size: 14 }) }), children: Xe }),
    R.error && J.length > 0 && /* @__PURE__ */ n(Z, { tone: "bad", action: /* @__PURE__ */ t("button", { type: "button", className: "ahv-button", onClick: R.refresh, children: "Retry" }), children: [
      "Couldn't load newer activity: ",
      R.error.message
    ] }),
    R.error && !J.length ? /* @__PURE__ */ t(Z, { tone: "bad", action: /* @__PURE__ */ t("button", { type: "button", className: "ahv-button", onClick: R.refresh, children: "Retry" }), children: R.error.message }) : R.loading ? /* @__PURE__ */ t(He, {}) : J.length ? /* @__PURE__ */ n("div", { className: "ahv-table-wrap", ref: st, children: [
      /* @__PURE__ */ n("table", { className: "ahv-table", children: [
        /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ n("tr", { children: [
          /* @__PURE__ */ t("th", { children: "When (UTC)" }),
          /* @__PURE__ */ t("th", { children: "Who" }),
          /* @__PURE__ */ t("th", { children: S === "events" ? "What happened" : "Request" }),
          E.map((r) => /* @__PURE__ */ t("th", { children: r.label }, r.key))
        ] }) }),
        /* @__PURE__ */ t("tbody", { children: J.map((r, w) => {
          var x;
          return /* @__PURE__ */ n(aa, { children: [
            r.occurred_at.slice(0, 10) !== ((x = J[w - 1]) == null ? void 0 : x.occurred_at.slice(0, 10)) && /* @__PURE__ */ t("tr", { className: "ahv-day", children: /* @__PURE__ */ t("td", { colSpan: Zt, children: oa(r.occurred_at) }) }),
            /* @__PURE__ */ n(
              "tr",
              {
                tabIndex: 0,
                className: L("ahv-row", F(r) && r.outcome !== "success" && "ahv-row-problem"),
                onClick: () => he(r),
                onKeyDown: ($) => {
                  $.target === $.currentTarget && ($.key === "Enter" || $.key === " ") && ($.preventDefault(), he(r));
                },
                children: [
                  /* @__PURE__ */ t("td", { children: /* @__PURE__ */ t(xa, { value: r.occurred_at, seal: et(r) }) }),
                  /* @__PURE__ */ t("td", { children: /* @__PURE__ */ t(
                    Ra,
                    {
                      row: r,
                      actorTypes: Ee,
                      onFocus: o && S === "requests" ? void 0 : () => nt({ actor_id: r.actor_id })
                    }
                  ) }),
                  /* @__PURE__ */ t("td", { children: F(r) ? /* @__PURE__ */ t(Pa, { row: r }) : /* @__PURE__ */ t(At, { row: r }) }),
                  E.map(($) => /* @__PURE__ */ t("td", { className: "ahv-cell", children: $.key === "where" ? /* @__PURE__ */ t(Aa, { row: r }) : $.key === "service" ? /* @__PURE__ */ t("span", { className: "ahv-dim", children: A(r.service) }) : $.key === "ip" ? /* @__PURE__ */ t("span", { className: "ahv-mono ahv-dim", children: r.ip || "—" }) : F(r) ? $.key === "result" ? r.outcome === "success" ? /* @__PURE__ */ t("span", { className: "ahv-dim", children: "success" }) : /* @__PURE__ */ t(ye, { outcome: r.outcome }) : r.target_type ? /* @__PURE__ */ n("span", { children: [
                    ot[r.target_type] ?? A(r.target_type),
                    " ",
                    /* @__PURE__ */ t("span", { className: "ahv-mono", children: r.target_name || r.target_id })
                  ] }) : "—" : null }, $.key))
                ]
              }
            )
          ] }, r.id);
        }) })
      ] }),
      /* @__PURE__ */ t("div", { ref: $e, "aria-hidden": "true" })
    ] }) : /* @__PURE__ */ n("div", { className: "ahv-empty", children: [
      /* @__PURE__ */ t(O, { name: "log", size: 28 }),
      /* @__PURE__ */ n("strong", { children: [
        "No ",
        Me,
        " match"
      ] }),
      /* @__PURE__ */ t("span", { className: "ahv-dim", children: S === "events" && c === "important" ? "Try All, or a wider time range." : "Try a wider time range or fewer filters." })
    ] }),
    J.length > 0 && /* @__PURE__ */ n("footer", { className: "ahv-foot", children: [
      /* @__PURE__ */ n("span", { className: "ahv-dim ahv-num", children: [
        ua(J.length, Me.slice(0, -1)),
        " shown",
        z ? " · Live keeps the newest page" : R.trimmed ? " · the newest were let go to keep the list light; Refresh brings them back" : R.hasMore ? "" : " · that is all of them"
      ] }),
      V.error && /* @__PURE__ */ n("span", { className: "ahv-bad ahv-small", children: [
        "Couldn't load more: ",
        V.error.message
      ] }),
      R.hasMore && /* @__PURE__ */ t("button", { type: "button", className: "ahv-button", onClick: Te, disabled: V.loading, children: V.loading ? "Loading…" : "Load more" })
    ] }),
    /* @__PURE__ */ t(
      It,
      {
        request: e,
        row: ke,
        onClose: () => he(null),
        onFocus: o ? void 0 : nt,
        actorTypes: Ee,
        entities: (pt = ne.data) == null ? void 0 : pt.entities,
        seal: ke ? et(ke) : null
      }
    )
  ] });
}
const Mt = 500;
function yn({ request: e, entity: a, view: s = "all", action: i, newestFirst: l = !1, header: o, more: d, className: u }) {
  var M, S, c, g;
  const h = a.type && a.id ? `${a.type}:${a.id}:${s}:${i ?? ""}` : null, b = U(h, () => e("search", {
    method: "POST",
    body: { kind: "events", filters: {}, related_type: a.type, related_id: a.id, view: s, action: i, limit: Mt, details: !0 }
  })), k = U("catalog", () => e("catalog", { method: "GET" })), [y, v] = T(null), f = ((M = b.data) == null ? void 0 : M.items) ?? [], N = l ? f : [...f].reverse(), p = !!((S = b.data) != null && S.next_cursor);
  return /* @__PURE__ */ n("div", { className: L("ahv ahv-timeline", u), children: [
    b.error ? /* @__PURE__ */ n(Z, { tone: "bad", action: /* @__PURE__ */ t("button", { type: "button", className: "ahv-button", onClick: b.refresh, children: "Retry" }), children: [
      "Couldn't load: ",
      b.error.message
    ] }) : b.loading && !b.data ? /* @__PURE__ */ t(He, { rows: 4 }) : N.length ? /* @__PURE__ */ n(D, { children: [
      o == null ? void 0 : o(f.length ? [...f].reverse() : [], p),
      p && /* @__PURE__ */ n("p", { className: "ahv-dim ahv-small", children: [
        "Showing the newest ",
        Mt,
        " steps.",
        d && /* @__PURE__ */ n(D, { children: [
          " ",
          d
        ] })
      ] }),
      /* @__PURE__ */ n("h3", { className: "ahv-eyebrow", children: [
        N.length,
        " step",
        N.length === 1 ? "" : "s",
        ", ",
        l ? "newest" : "oldest",
        " first"
      ] }),
      /* @__PURE__ */ t("ol", { className: "ahv-steps", children: N.map((_) => /* @__PURE__ */ t(hn, { event: _, onOpen: () => v(_) }, _.id)) })
    ] }) : /* @__PURE__ */ t("p", { className: "ahv-dim", children: "Nothing has been recorded about this yet." }),
    /* @__PURE__ */ t(
      It,
      {
        request: e,
        row: y,
        onClose: () => v(null),
        actorTypes: (c = k.data) == null ? void 0 : c.actor_types,
        entities: (g = k.data) == null ? void 0 : g.entities
      }
    )
  ] });
}
const dn = (e) => e.outcome !== "success" ? { icon: "alert", tone: "rose" } : { icon: e.icon ?? (e.category === "data" ? "layers" : "log"), tone: e.tone ?? "neutral" };
function hn({ event: e, onOpen: a }) {
  var k, y, v, f, N;
  const [s, i] = T(!1), { icon: l, tone: o } = dn(e), d = e.children ?? [], u = e.children_count ?? d.length, h = e.category !== "data" && ((k = e.change_list) != null && k.length) ? e.change_list : null, b = !!((y = e.details) != null && y.length) || u > 0;
  return /* @__PURE__ */ n("li", { className: `ahv-step ahv-tone-${o}`, children: [
    /* @__PURE__ */ t("span", { className: "ahv-step-icon", "aria-hidden": "true", children: /* @__PURE__ */ t(O, { name: l, size: 14 }) }),
    /* @__PURE__ */ n("div", { className: "ahv-step-main", children: [
      /* @__PURE__ */ n("div", { className: "ahv-step-head", children: [
        /* @__PURE__ */ n("div", { className: "ahv-stack", children: [
          /* @__PURE__ */ n("button", { type: "button", className: "ahv-step-title", onClick: a, title: "Open the full detail", children: [
            e.title,
            /* @__PURE__ */ t(ye, { outcome: e.outcome })
          ] }),
          /* @__PURE__ */ t(un, { event: e })
        ] }),
        /* @__PURE__ */ n("span", { className: "ahv-step-when", title: `${e.occurred_at} UTC`, children: [
          /* @__PURE__ */ t("span", { className: "ahv-mono", children: be(e.occurred_at) }),
          /* @__PURE__ */ t("span", { className: "ahv-dim", children: Fe(e.occurred_at) || ee(W(e.occurred_at)) })
        ] })
      ] }),
      e.outcome !== "success" ? /* @__PURE__ */ t("p", { className: "ahv-step-problem", children: e.summary }) : (v = e.facts) != null && v.length ? /* @__PURE__ */ t(Dt, { facts: e.facts }) : !h && e.summary !== e.title ? /* @__PURE__ */ t("p", { className: "ahv-sentence", children: e.summary }) : null,
      h && /* @__PURE__ */ t(Ve, { changes: h, valueLabel: "Set to" }),
      b && /* @__PURE__ */ n("button", { type: "button", className: "ahv-disclose", "aria-expanded": s, onClick: () => i((p) => !p), children: [
        /* @__PURE__ */ t(O, { name: "chevronDown", size: 13, className: L(s && "ahv-turned") }),
        s ? "Hide" : [((f = e.details) == null ? void 0 : f.length) && "Details", u > 0 && `${u} record change${u === 1 ? "" : "s"}`].filter(Boolean).join(" and ")
      ] }),
      s && /* @__PURE__ */ n("div", { className: "ahv-step-more", children: [
        (N = e.details) != null && N.length ? /* @__PURE__ */ t(Pt, { items: e.details.map((p) => [p.label, p.value]), mono: !0 }) : null,
        u > 0 && /* @__PURE__ */ t(mn, { records: d, counted: u, onOpen: a })
      ] })
    ] })
  ] });
}
function un({ event: e }) {
  return /* @__PURE__ */ n("span", { className: "ahv-byline", children: [
    /* @__PURE__ */ t("span", { className: L("ahv-avatar ahv-avatar-small", e.actor_type === "system" && "ahv-avatar-system"), "aria-hidden": "true", children: Ot(e.actor) }),
    [
      e.actor,
      e.actor_label,
      e.origin && A(e.origin).toUpperCase(),
      e.actor_type !== "system" && e.device,
      e.country,
      e.ip
    ].filter(Boolean).map((a, s) => /* @__PURE__ */ t("span", { className: L(s === 0 ? "ahv-strong" : "ahv-sep"), children: a }, s))
  ] });
}
function mn({ records: e, counted: a, onOpen: s }) {
  const [i, l] = T(null);
  return /* @__PURE__ */ n("div", { className: "ahv-records", children: [
    /* @__PURE__ */ n("table", { className: "ahv-changes ahv-records-table", children: [
      /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ n("tr", { children: [
        /* @__PURE__ */ t("th", { children: "Record" }),
        /* @__PURE__ */ t("th", { children: "Change" }),
        /* @__PURE__ */ t("th", { children: "Fields" })
      ] }) }),
      /* @__PURE__ */ t("tbody", { children: e.map((o) => {
        const d = o.change_list ?? [], u = i === o.id;
        return /* @__PURE__ */ t(
          vn,
          {
            record: o,
            fields: d.length,
            open: u,
            onToggle: () => l(u ? null : o.id),
            children: u && /* @__PURE__ */ t("tr", { className: "ahv-records-fields", children: /* @__PURE__ */ t("td", { colSpan: 3, children: /* @__PURE__ */ t(Ve, { changes: d }) }) })
          },
          o.id
        );
      }) })
    ] }),
    a > e.length && /* @__PURE__ */ n("button", { type: "button", className: "ahv-link-button", onClick: s, children: [
      a - e.length,
      " more in the full detail"
    ] })
  ] });
}
function vn({ record: e, fields: a, open: s, onToggle: i, children: l }) {
  const o = e.action === "data.created" ? "Created" : e.action === "data.deleted" ? "Deleted" : "Updated";
  return /* @__PURE__ */ n(D, { children: [
    /* @__PURE__ */ n("tr", { children: [
      /* @__PURE__ */ t("td", { children: /* @__PURE__ */ n("button", { type: "button", className: "ahv-disclose", "aria-expanded": s, disabled: !a, onClick: i, children: [
        /* @__PURE__ */ t(O, { name: "chevronRight", size: 12, className: L(s && "ahv-turned-right") }),
        e.summary.replace(/^(Created|Updated|Deleted) /, "").split(":")[0]
      ] }) }),
      /* @__PURE__ */ t("td", { children: o }),
      /* @__PURE__ */ t("td", { className: "ahv-dim", children: e.action === "data.updated" ? (e.change_list ?? []).slice(0, 3).map((d) => d.label).join(", ") + (a > 3 ? ` and ${a - 3} more` : "") : `${a} value${a === 1 ? "" : "s"}` })
    ] }),
    l
  ] });
}
export {
  It as ActivityDetail,
  bn as ActivityLog,
  yn as ActivityTimeline,
  Ga as IntegrityStatus,
  Ua as PanelHost
};
