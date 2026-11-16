import { jsx as t, jsxs as n, Fragment as U } from "react/jsx-runtime";
import { useState as T, useRef as D, useEffect as K, useCallback as Be, useMemo as oe, useContext as Qt, createContext as ea, useId as ta, Fragment as aa } from "react";
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
function I(e, a, s) {
  const [r, l] = T({ loading: e !== null }), o = D(0), c = D(a);
  c.current = a;
  const u = Be(() => {
    if (e === null) return;
    const b = ++o.current;
    l((k) => ({ ...k, loading: !0 })), c.current().then(
      (k) => b === o.current && l({ data: k, loading: !1 }),
      (k) => b === o.current && l((y) => ({ data: y.data, error: k, loading: !1 }))
    );
  }, [e]);
  K(() => {
    l({ loading: e !== null }), u();
  }, [e, u]);
  const h = !!r.error;
  return K(() => {
    if (!s || e === null || h) return;
    const b = setInterval(u, s);
    return () => clearInterval(b);
  }, [s, e, h, u]), { ...r, refresh: u };
}
const qe = 20;
function la(e, a, s, r, l) {
  var d;
  const o = a && JSON.stringify(a), [c, u] = T([]), [h, b] = T(!1), [k, y] = T({ loading: !1 }), v = D(o);
  v.current = o;
  const g = I(
    o,
    () => e("search", { method: "POST", body: { ...a, limit: s } }),
    r ? l : void 0
  ), N = D(0);
  K(() => {
    g.data && (N.current += 1, u([g.data]), b(!1), y({ loading: !1 }));
  }, [g.data]), K(() => {
    u([]), y({ loading: !1 });
  }, [o]);
  const p = ((d = c[c.length - 1]) == null ? void 0 : d.next_cursor) ?? null, M = Be(() => {
    if (!p || k.loading || !a) return;
    y({ loading: !0 });
    const f = o, _ = N.current;
    e("search", { method: "POST", body: { ...a, limit: s, cursor: p } }).then(
      (q) => {
        v.current !== f || N.current !== _ || (u((E) => [...E, q].slice(-qe)), c.length >= qe && b(!0), y({ loading: !1 }));
      },
      (q) => v.current === f && N.current === _ && y({ loading: !1, error: q })
    );
  }, [p, k.loading, a, o, e, s, c.length]);
  return {
    rows: c.flatMap((f) => f.items),
    trimmed: h,
    hasMore: !!p && !r,
    loading: g.loading && !c.length,
    refreshing: g.loading,
    error: g.error,
    more: k,
    loadMore: M,
    refresh: g.refresh,
    pageCount: c.length
  };
}
const W = (e) => Date.parse(`${e.slice(0, 23).replace(" ", "T")}Z`), A = (e) => e.replace(/[._]+/g, " ").trim(), ce = (e) => e.charAt(0).toUpperCase() + e.slice(1), Ot = 864e5, ia = [[60, "second"], [60, "minute"], [24, "hour"], [7, "day"]], ra = new Intl.RelativeTimeFormat(void 0, { numeric: "auto", style: "short" });
function Fe(e, a = Date.now()) {
  let s = (W(e) - a) / 1e3;
  for (const [r, l] of ia) {
    if (Math.abs(s) < r) return ra.format(Math.round(s), l);
    s /= r;
  }
  return "";
}
const ge = (e, a) => new Date(e).toLocaleString(void 0, { ...a, timeZone: "UTC" }), ee = (e) => ge(e, { day: "numeric", month: "short", year: "numeric" }), Y = (e) => ge(e, { day: "numeric", month: "short" }), Re = (e) => ge(e, { hour: "2-digit", minute: "2-digit", hour12: !1 });
function oa(e, a = Date.now()) {
  const s = e.slice(0, 10);
  return s === new Date(a).toISOString().slice(0, 10) ? "Today" : s === new Date(a - Ot).toISOString().slice(0, 10) ? "Yesterday" : ge(W(`${s} 00:00:00`), { weekday: "short", day: "numeric", month: "short", year: "numeric" });
}
const be = (e) => e.slice(11, 23);
function xt(e) {
  var s, r;
  if (/^[\d#]/.test(e)) return "#";
  const a = e.split(/[\s@._-]+/).filter(Boolean);
  return ((((s = a[0]) == null ? void 0 : s[0]) ?? "?") + (((r = a[1]) == null ? void 0 : r[0]) ?? "")).toUpperCase();
}
const ca = (e) => e.actor_name || (e.actor_type === "system" ? ce(A(e.actor_id)) || "System" : e.actor_id || "Anonymous"), Ae = (e) => /^\d{4}-\d{2}-\d{2}$/.test(e) && !Number.isNaN(Date.parse(`${e}T00:00:00Z`)), De = (e) => `${e} 00:00:00`, da = (e) => `${new Date(Date.parse(`${e}T00:00:00Z`) + Ot).toISOString().slice(0, 10)} 00:00:00`, ha = (e, a = Date.now()) => new Date(a - e * 6e4).toISOString().slice(0, 19).replace("T", " "), ua = (e, a, s = `${a}s`) => `${e.toLocaleString()} ${e === 1 ? a : s}`, ve = 1e5, ma = [
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
  const r = [];
  let l = null;
  do {
    const o = await e("export", { method: "POST", body: { ...a, cursor: l } });
    r.push(...o.items), s(r.length), l = o.next_cursor;
  } while (l && r.length < ve);
  return { rows: r.slice(0, ve), more: !!l || r.length > ve };
}
function fa(e) {
  let a = e == null ? "" : typeof e == "object" ? JSON.stringify(e) : String(e);
  return /^[=+\-@\t\r]/.test(a) && (a = `'${a}`), /[",\n\r]/.test(a) ? `"${a.replace(/"/g, '""')}"` : a;
}
function ga(e, a) {
  const s = e === "events" ? ma : va;
  return `\uFEFF${[s.join(","), ...a.map((l) => s.map((o) => fa(l[o])).join(","))].join(`\r
`)}\r
`;
}
const ba = (e) => e.map((a) => {
  const { children: s, ...r } = a;
  return JSON.stringify(r);
}).join(`
`) + `
`;
function Pe(e, a, s) {
  const r = URL.createObjectURL(new Blob([e], { type: s })), l = document.createElement("a");
  l.href = r, l.download = a, l.click(), setTimeout(() => URL.revokeObjectURL(r), 1e3);
}
const ya = /(-?)(?:([a-z_]+):)?("([^"]*)"?|\S+)/g;
function ie(e) {
  const a = [];
  for (const s of e.matchAll(ya)) {
    let r = s[3].startsWith('"') ? s[4] ?? "" : s[3], l = s[2] ?? null;
    l && r.startsWith("//") && (r = `${l}:${r}`, l = null), r && a.push({ field: l, value: r, negated: s[1] === "-", text: s[0] });
  }
  return a;
}
const Na = (e, a) => ie(e).filter((s) => s !== a && s.text !== a.text).map((s) => s.text).join(" "), Ie = (e) => /\s/.test(e) ? `"${e.replace(/"/g, "")}"` : e, Lt = [
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
], Ke = (e) => Lt.filter((a) => a.kinds.includes(e)), ka = { events: ["origin", "outcome", "session"], requests: ["origin", "session"] }, Sa = (e) => [...Ke(e).map((a) => a.field), ...ka[e]], _a = (e) => {
  var a;
  return ((a = Lt.find((s) => s.field === e)) == null ? void 0 : a.label) ?? ce(A(e));
};
function wa(e, a, s, r = {}) {
  const l = e.startsWith("-"), o = l ? e.slice(1) : e, c = l ? "-" : "", u = o.indexOf(":");
  if (u < 0)
    return Ke(a).filter((y) => y.field.startsWith(o.toLowerCase()) || y.label.toLowerCase().startsWith(o.toLowerCase())).map((y) => ({ insert: `${c}${y.field}:`, label: `${y.field}:`, hint: y.hint }));
  const h = o.slice(0, u), b = o.slice(u + 1).toLowerCase();
  return (() => {
    const y = (v) => (r[v] ?? []).filter((g) => g.value).map((g) => ({ insert: g.value, label: g.value, hint: g.count.toLocaleString() }));
    switch (h) {
      case "action":
        return Object.entries((s == null ? void 0 : s.actions) ?? {}).map(([v, g]) => ({ insert: v, label: v, hint: g.title }));
      case "category":
        return [...new Set(Object.values((s == null ? void 0 : s.actions) ?? {}).map((v) => v.category))].map((v) => ({ insert: v, label: v }));
      case "actor_type":
        return Object.entries((s == null ? void 0 : s.actor_types) ?? {}).map(([v, g]) => ({ insert: v, label: v, hint: g }));
      case "result":
        return ["success", "failed", "refused"].map((v) => ({ insert: v, label: v }));
      case "method":
        return ["GET", "POST", "PUT", "PATCH", "DELETE"].map((v) => ({ insert: v, label: v }));
      case "status":
        return ["2xx", "4xx", "5xx"].map((v) => ({ insert: v, label: v }));
      case "on":
        return Object.entries((s == null ? void 0 : s.entities) ?? {}).filter(([v]) => !v.includes("_")).map(([v, g]) => ({ insert: `${v}:`, label: `${v}:`, hint: g }));
      case "app":
        return y("origin");
      case "service":
        return y("service");
      default:
        return [];
    }
  })().filter((y) => y.insert.toLowerCase().startsWith(b) || y.insert.toLowerCase().split(/[._:]/).some((v) => v.startsWith(b)) || (y.hint ?? "").toLowerCase().split(/\s+/).some((v) => v.startsWith(b))).slice(0, 12).map((y) => ({ ...y, insert: `${c}${h}:${y.insert.endsWith(":") ? y.insert : Ie(y.insert)}` }));
}
const fe = 6e4, Q = 1440, Ca = [15, 30, 60, 120, 180, 360, 720, 1440, 2880, 10080, 20160, 43200], gt = 7, $a = new Intl.NumberFormat(void 0, { notation: "compact", maximumFractionDigits: 1 });
function Ta(e) {
  const a = e.bucket_minutes * fe, s = new Map(e.buckets.map((l) => [W(l.at), l.count])), r = [];
  for (let l = Math.floor(W(e.occurred_from) / a) * a; l < W(e.occurred_to); l += a)
    r.push({ at: l, count: s.get(l) ?? 0 });
  return r;
}
function Ma(e) {
  return e % Q === 0 ? e === Q ? "Daily bars" : `${e / Q}-day bars` : e % 60 === 0 ? e === 60 ? "Hourly bars" : `${e / 60}-hour bars` : `${e}-minute bars`;
}
function xe(e, a) {
  return a >= Q ? ee(e) : `${Y(e)}, ${Re(e)} – ${Re(e + a * fe)}`;
}
function Ea(e, a) {
  if (e.length < 2) return [];
  const s = (e[e.length - 1].at - e[0].at) / fe, r = Ca.find((c) => c >= a && c % a === 0 && s / c <= gt) ?? a * Math.ceil(e.length / gt), l = r >= Q, o = [];
  return e.forEach((c, u) => {
    if (c.at % (r * fe) !== 0) return;
    const h = o[o.length - 1], b = !h || Y(e[h.index].at) !== Y(c.at);
    o.push({ index: u, top: l ? Y(c.at) : Re(c.at), bottom: !l && b ? Y(c.at) : "" });
  }), o;
}
function Oa({ chart: e, noun: a, loading: s }) {
  const r = oe(() => e ? Ta(e) : [], [e]), [l, o] = T(null), c = r.reduce((g, N) => g + N.count, 0), u = r.reduce((g, N) => Math.max(g, N.count), 0), h = r.find((g) => g.count === u && u > 0), b = (e == null ? void 0 : e.bucket_minutes) ?? Q, k = oe(() => Ea(r, b), [r, b]), y = a.replace(/s$/, ""), v = l !== null ? r[l] : void 0;
  return /* @__PURE__ */ n("div", { className: "ahv-chart", children: [
    /* @__PURE__ */ n("div", { className: "ahv-chart-head", children: [
      /* @__PURE__ */ n("span", { children: [
        /* @__PURE__ */ t("strong", { className: "ahv-num", children: s && !e ? "…" : c.toLocaleString() }),
        " ",
        c === 1 ? y : a,
        e && /* @__PURE__ */ n("span", { className: "ahv-dim", children: [
          " · ",
          Y(W(e.occurred_from)),
          " – ",
          ee(W(e.occurred_to) - 1),
          " UTC"
        ] })
      ] }),
      e && /* @__PURE__ */ n("span", { className: "ahv-dim", children: [
        h && /* @__PURE__ */ n(U, { children: [
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
        "aria-label": `${c.toLocaleString()} ${a}${h ? `, most at ${xe(h.at, b)} UTC (${h.count})` : ""}`,
        onMouseMove: (g) => {
          if (!r.length) return;
          const N = g.currentTarget.getBoundingClientRect();
          o(Math.min(r.length - 1, Math.max(0, Math.floor((g.clientX - N.left) / N.width * r.length))));
        },
        onMouseLeave: () => o(null),
        children: [
          u > 0 && /* @__PURE__ */ t("span", { className: "ahv-chart-max ahv-num", children: $a.format(u) }),
          /* @__PURE__ */ t("svg", { viewBox: `0 0 ${Math.max(r.length, 1)} 100`, preserveAspectRatio: "none", className: "ahv-chart-svg", children: r.map((g, N) => {
            const p = u ? Math.max(g.count / u * 100, g.count ? 2 : 0) : 0;
            return /* @__PURE__ */ t(
              "rect",
              {
                x: N + 0.12,
                width: 0.76,
                y: 100 - p,
                height: p,
                className: N === l ? "ahv-bar ahv-bar-on" : "ahv-bar"
              },
              g.at
            );
          }) }),
          !s && c === 0 && /* @__PURE__ */ n("span", { className: "ahv-chart-empty", children: [
            "No ",
            a,
            " in this period"
          ] }),
          v && /* @__PURE__ */ n("div", { className: "ahv-tip", style: { left: `${(l + 0.5) / r.length * 100}%` }, children: [
            /* @__PURE__ */ t("strong", { className: "ahv-num", children: v.count ? `${v.count.toLocaleString()} ${v.count === 1 ? y : a}` : `No ${a}` }),
            /* @__PURE__ */ n("span", { children: [
              xe(v.at, b),
              " UTC"
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ t("div", { className: "ahv-chart-axis", "aria-hidden": "true", children: k.map((g) => /* @__PURE__ */ n("span", { style: { left: `${(g.index + 0.5) / r.length * 100}%` }, children: [
      g.top,
      g.bottom && /* @__PURE__ */ t("b", { children: g.bottom })
    ] }, g.index)) })
  ] });
}
const x = (...e) => e.filter(Boolean).join(" "), qt = (e) => F(e) ? e.actor : ca(e), Ue = (e, a = {}) => F(e) ? e.actor_label : a[e.actor_type] || ce(A(e.actor_type)) || "Unknown", ze = {
  sealed: "Sealed: kept unchanged since its minute ended",
  waiting: "Waiting for its seal: each minute is sealed two minutes after it ends"
};
function xa({ value: e, seal: a }) {
  return /* @__PURE__ */ n("span", { className: "ahv-when", title: `${e} UTC`, children: [
    /* @__PURE__ */ n("span", { className: "ahv-mono", children: [
      be(e),
      a && /* @__PURE__ */ t("span", { className: x("ahv-seal", a === "waiting" && "ahv-seal-waiting"), title: ze[a], "aria-label": ze[a], children: /* @__PURE__ */ t(O, { name: a === "sealed" ? "shield" : "history", size: 11 }) })
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
      onClick: (r) => {
        r.stopPropagation(), e();
      },
      onKeyDown: (r) => r.stopPropagation(),
      children: s
    }
  ) : /* @__PURE__ */ t(U, { children: s });
}
function Ra({ row: e, actorTypes: a, onFocus: s }) {
  const r = qt(e), l = Ue(e, a), o = e.actor_type !== "system" && e.actor_id && e.actor_id !== r ? e.actor_id : "";
  return /* @__PURE__ */ n("span", { className: "ahv-who", children: [
    /* @__PURE__ */ t("span", { className: x("ahv-avatar", e.actor_type === "system" && "ahv-avatar-system"), "aria-hidden": "true", children: xt(r) }),
    /* @__PURE__ */ n("span", { className: "ahv-stack", children: [
      /* @__PURE__ */ t(qa, { title: `Only activity by ${r}`, onClick: e.actor_id ? s : void 0, children: /* @__PURE__ */ t("span", { className: "ahv-strong ahv-clip", children: r }) }),
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
  return e === "success" ? null : /* @__PURE__ */ t("span", { className: x("ahv-tag", e === "failed" ? "ahv-tag-bad" : "ahv-tag-warn"), children: e });
}
const Da = (e) => e >= 500 ? "ahv-tag-bad" : e >= 400 ? "ahv-tag-warn" : "ahv-tag-ok", Rt = ({ status: e }) => /* @__PURE__ */ t("span", { className: x("ahv-tag ahv-mono", Da(e)), children: e }), At = ({ method: e }) => /* @__PURE__ */ t("span", { className: x("ahv-tag ahv-mono", `ahv-method-${e.toLowerCase()}`), children: e });
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
function Dt({ row: e }) {
  return /* @__PURE__ */ n("span", { className: "ahv-what", children: [
    /* @__PURE__ */ t(At, { method: e.method }),
    /* @__PURE__ */ t("span", { className: "ahv-mono ahv-clip", children: e.route }),
    /* @__PURE__ */ t(Rt, { status: e.status }),
    /* @__PURE__ */ n("span", { className: "ahv-dim ahv-num", children: [
      e.duration_ms,
      " ms"
    ] })
  ] });
}
function Z({ tone: e = "plain", children: a, action: s }) {
  return /* @__PURE__ */ n("div", { className: x("ahv-message", e === "bad" && "ahv-message-bad"), role: e === "bad" ? "alert" : void 0, children: [
    /* @__PURE__ */ t("span", { children: a }),
    s
  ] });
}
function Ve({ rows: e = 6 }) {
  return /* @__PURE__ */ t("div", { className: "ahv-skeleton", "aria-busy": "true", children: Array.from({ length: e }, (a, s) => /* @__PURE__ */ t("span", {}, s)) });
}
function Pt({ facts: e }) {
  return e != null && e.length ? /* @__PURE__ */ t("span", { className: "ahv-chips-row", children: e.map((a, s) => /* @__PURE__ */ n("span", { className: "ahv-fact", children: [
    a.label && /* @__PURE__ */ t("span", { className: "ahv-dim", children: a.label }),
    /* @__PURE__ */ t("span", { className: "ahv-mono", children: a.value })
  ] }, s)) }) : null;
}
const Ia = 36;
function He({ items: e, mono: a = !1 }) {
  const s = e.filter(([, r]) => r != null && r !== "");
  return s.length ? /* @__PURE__ */ t("dl", { className: "ahv-pairs", children: s.map(([r, l], o) => {
    const c = typeof l == "object" ? JSON.stringify(l) : String(l);
    return /* @__PURE__ */ n("div", { className: x("ahv-pair-cell", c.length > Ia && "ahv-pair-wide"), children: [
      /* @__PURE__ */ t("dt", { children: r }),
      /* @__PURE__ */ t("dd", { className: x(a && "ahv-mono"), children: c })
    ] }, `${r}-${o}`);
  }) }) : null;
}
function Je({ changes: e, valueLabel: a = "Value" }) {
  if (!e.length) return null;
  const s = e.every((l) => l.before === null), r = e.every((l) => l.after === null);
  if (s || r) {
    const l = e.filter((c) => (s ? c.after : c.before) !== null), o = e.length - l.length;
    return /* @__PURE__ */ n("div", { className: "ahv-stack-gap", children: [
      a !== "Value" && /* @__PURE__ */ t("span", { className: "ahv-eyebrow", children: a }),
      /* @__PURE__ */ t(He, { items: l.map((c) => [c.label, s ? c.after : c.before]), mono: !0 }),
      o > 0 && /* @__PURE__ */ n("span", { className: "ahv-dim ahv-small", children: [
        o,
        " empty field",
        o === 1 ? "" : "s",
        " not shown"
      ] })
    ] });
  }
  return /* @__PURE__ */ t("div", { className: "ahv-scroll-x", children: /* @__PURE__ */ n("table", { className: "ahv-changes", children: [
    /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ n("tr", { children: [
      /* @__PURE__ */ t("th", { children: "Field" }),
      /* @__PURE__ */ t("th", { children: "Before" }),
      /* @__PURE__ */ t("th", { children: "After" })
    ] }) }),
    /* @__PURE__ */ t("tbody", { children: e.map((l) => /* @__PURE__ */ n("tr", { children: [
      /* @__PURE__ */ t("td", { className: "ahv-field-name", children: l.label }),
      /* @__PURE__ */ t("td", { className: "ahv-mono ahv-before", children: l.before ?? "—" }),
      /* @__PURE__ */ t("td", { className: "ahv-mono ahv-after", children: l.after ?? "—" })
    ] }, l.field)) })
  ] }) });
}
const Ua = 200, za = ea(null);
function B({ title: e, children: a }) {
  return /* @__PURE__ */ n("section", { className: "ahv-section", children: [
    /* @__PURE__ */ t("h3", { children: e }),
    a
  ] });
}
const X = He;
function ja({ event: e }) {
  const a = e.change_list;
  if (!(a != null && a.length)) return null;
  const s = a.every((l) => l.before === null), r = a.every((l) => l.after === null);
  return /* @__PURE__ */ t(B, { title: s ? "Recorded values" : r ? "Values removed" : "Changes", children: /* @__PURE__ */ t(Je, { changes: a }) });
}
function Wa({ text: e }) {
  const [a, s] = T(!1);
  return /* @__PURE__ */ n("button", { type: "button", className: "ahv-button ahv-button-quiet", onClick: () => {
    var r;
    (r = navigator.clipboard) == null || r.writeText(e).then(() => {
      s(!0), setTimeout(() => s(!1), 1500);
    });
  }, children: [
    /* @__PURE__ */ t(O, { name: a ? "check" : "copy", size: 14 }),
    a ? "Copied" : "Copy"
  ] });
}
function Ba({ row: e }) {
  const [a, s] = T(!1), { children: r, details: l, ...o } = e, c = JSON.stringify(o, null, 2);
  return /* @__PURE__ */ n("section", { className: "ahv-section", children: [
    /* @__PURE__ */ n("div", { className: "ahv-row-between", children: [
      /* @__PURE__ */ n("button", { type: "button", className: "ahv-disclose", "aria-expanded": a, onClick: () => s((u) => !u), children: [
        /* @__PURE__ */ t(O, { name: "chevronDown", size: 14, className: x(a && "ahv-turned") }),
        "Full record (JSON)"
      ] }),
      /* @__PURE__ */ t(Wa, { text: c })
    ] }),
    a && /* @__PURE__ */ t("pre", { className: "ahv-pre", children: c })
  ] });
}
function Fa({ open: e, events: a, calls: s, onOpen: r }) {
  const l = [...a, ...s].sort((o, c) => o.occurred_at.localeCompare(c.occurred_at));
  return l.length ? /* @__PURE__ */ t("ol", { className: "ahv-list", children: l.map((o) => /* @__PURE__ */ t("li", { children: /* @__PURE__ */ n("button", { type: "button", disabled: o.id === e.id, onClick: () => r(o), children: [
    /* @__PURE__ */ t("span", { className: "ahv-mono ahv-dim", children: be(o.occurred_at) }),
    F(o) ? /* @__PURE__ */ n("span", { className: "ahv-what", children: [
      /* @__PURE__ */ t("span", { className: "ahv-sentence", children: o.summary }),
      /* @__PURE__ */ t(ye, { outcome: o.outcome })
    ] }) : /* @__PURE__ */ t(Dt, { row: o })
  ] }) }, o.id)) }) : /* @__PURE__ */ t("p", { className: "ahv-dim", children: "Nothing else was recorded for this request." });
}
function Ka(e, a) {
  const s = F(a);
  return I(`${a.id}`, async () => {
    if (s) return e(`events/${a.id}`, { method: "GET" });
    if (!a.request_id) return { same_request: [], requests: [] };
    const r = (c) => e("search", {
      method: "POST",
      body: { kind: c, filters: { request_id: a.request_id }, limit: Ua }
    }), [l, o] = await Promise.all([r("events"), r("requests")]);
    return { same_request: l.items, requests: o.items.filter((c) => c.id !== a.id) };
  });
}
function It({ request: e, row: a, onClose: s, onFocus: r, actorTypes: l, entities: o, seal: c }) {
  const [u, h] = T(a);
  K(() => h(a), [a]);
  const b = D(null), k = D(null), y = D(s);
  y.current = s;
  const v = u !== null;
  K(() => {
    var S, d;
    if (!v) return;
    const N = ((S = b.current) == null ? void 0 : S.getRootNode()) ?? document, p = N.activeElement ?? document.activeElement;
    (d = b.current) == null || d.focus();
    const M = (f) => {
      if (f.key === "Escape")
        f.stopPropagation(), y.current();
      else if (f.key === "Tab" && k.current) {
        const _ = [...k.current.querySelectorAll("button:not(:disabled), [href], input, select, [tabindex]:not([tabindex='-1'])")], q = N.activeElement;
        if (!_.length) return;
        f.shiftKey && q === _[0] ? (f.preventDefault(), _[_.length - 1].focus()) : !f.shiftKey && q === _[_.length - 1] ? (f.preventDefault(), _[0].focus()) : k.current.contains(q) || (f.preventDefault(), _[0].focus());
      }
    };
    return window.addEventListener("keydown", M, !0), () => {
      var f;
      window.removeEventListener("keydown", M, !0), (f = p == null ? void 0 : p.focus) == null || f.call(p);
    };
  }, [v]);
  const g = Qt(za);
  return u ? na(
    /* @__PURE__ */ n("div", { className: "ahv ahv-drawer-layer", children: [
      /* @__PURE__ */ t("div", { className: "ahv-backdrop", onClick: s }),
      /* @__PURE__ */ n("aside", { ref: k, className: "ahv-drawer", role: "dialog", "aria-modal": "true", "aria-label": "Activity details", children: [
        /* @__PURE__ */ t("button", { ref: b, type: "button", className: "ahv-icon-button ahv-drawer-close", onClick: s, "aria-label": "Close", children: /* @__PURE__ */ t(O, { name: "close" }) }),
        /* @__PURE__ */ t(
          Va,
          {
            request: e,
            row: u,
            onOpen: h,
            onFocus: r,
            actorTypes: l,
            entities: o,
            seal: u === a ? c : null
          },
          u.id
        )
      ] })
    ] }),
    g ?? document.body
  ) : null;
}
function Va({ request: e, row: a, onOpen: s, onFocus: r, actorTypes: l, entities: o = {}, seal: c }) {
  var v, g, N, p;
  const u = Ka(e, a), h = F(a) ? ((v = u.data) == null ? void 0 : v.event) ?? a : null, b = qt(a), k = h != null && h.target_type ? `${o[h.target_type] ?? A(h.target_type)} ${h.target_name || h.target_id}` : "", y = `${ee(W(a.occurred_at))}, ${be(a.occurred_at)} UTC`;
  return /* @__PURE__ */ n("div", { className: "ahv-drawer-body", children: [
    /* @__PURE__ */ n("header", { className: "ahv-drawer-head", children: [
      h ? /* @__PURE__ */ n(U, { children: [
        /* @__PURE__ */ n("div", { className: "ahv-tags", children: [
          /* @__PURE__ */ t("span", { className: "ahv-tag", children: h.title }),
          /* @__PURE__ */ t(ye, { outcome: h.outcome }),
          h.importance === "high" && /* @__PURE__ */ t("span", { className: "ahv-tag ahv-tag-accent", children: "Worth attention" }),
          h.imported && /* @__PURE__ */ t("span", { className: "ahv-tag", children: "Imported" })
        ] }),
        /* @__PURE__ */ t("h2", { children: h.summary }),
        /* @__PURE__ */ t(Pt, { facts: h.facts })
      ] }) : /* @__PURE__ */ n(U, { children: [
        /* @__PURE__ */ n("div", { className: "ahv-tags", children: [
          /* @__PURE__ */ t(At, { method: a.method }),
          /* @__PURE__ */ t(Rt, { status: a.status })
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
      r && /* @__PURE__ */ n("div", { className: "ahv-actions", children: [
        a.actor_id && /* @__PURE__ */ n("button", { type: "button", className: "ahv-button", onClick: () => r({ actor_id: a.actor_id }), children: [
          /* @__PURE__ */ t(O, { name: "user", size: 14 }),
          "All by ",
          b
        ] }),
        (h == null ? void 0 : h.target_type) && /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            className: "ahv-button",
            onClick: () => r({ target_type: h.target_type, target_id: h.target_id }),
            children: [
              /* @__PURE__ */ t(O, { name: "history", size: 14 }),
              "Timeline of ",
              k
            ]
          }
        )
      ] })
    ] }),
    h ? /* @__PURE__ */ n(U, { children: [
      h.outcome !== "success" && h.reason && /* @__PURE__ */ t(B, { title: "Reason", children: /* @__PURE__ */ t("p", { children: h.reason }) }),
      /* @__PURE__ */ t(ja, { event: h }),
      (g = h.details) != null && g.length ? /* @__PURE__ */ t(B, { title: "Details", children: /* @__PURE__ */ t(X, { items: h.details.map((M) => [M.label, M.value]) }) }) : h.metadata && !u.loading ? /* @__PURE__ */ t(B, { title: "Details", children: /* @__PURE__ */ t(X, { items: Object.entries(h.metadata).map(([M, S]) => [ce(A(M)), S]) }) }) : null,
      (k || h.related.length > 0) && /* @__PURE__ */ t(B, { title: "Concerns", children: /* @__PURE__ */ t(X, { items: [
        ["Target", k],
        ...h.related.map(([M, S]) => [ce(o[M] ?? A(M)), S])
      ] }) })
    ] }) : /* @__PURE__ */ n(U, { children: [
      /* @__PURE__ */ t(B, { title: "Request", children: /* @__PURE__ */ t(X, { items: [["Path", a.path], ["Took", `${a.duration_ms} ms`], ["Service", A(a.service)]] }) }),
      a.request_body && /* @__PURE__ */ t(B, { title: "Sent (secrets masked)", children: /* @__PURE__ */ t("pre", { className: "ahv-pre", children: JSON.stringify(a.request_body, null, 2) }) })
    ] }),
    a.request_id && /* @__PURE__ */ t(B, { title: "Same request", children: u.error ? /* @__PURE__ */ n(Z, { tone: "bad", action: /* @__PURE__ */ t("button", { type: "button", className: "ahv-button", onClick: u.refresh, children: "Retry" }), children: [
      "Couldn't load: ",
      u.error.message
    ] }) : u.loading && !u.data ? /* @__PURE__ */ t(Ve, { rows: 2 }) : /* @__PURE__ */ t(Fa, { open: a, events: ((N = u.data) == null ? void 0 : N.same_request) ?? [], calls: ((p = u.data) == null ? void 0 : p.requests) ?? [], onOpen: s }) }),
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
      ["Integrity", La(c ?? null)],
      ...h ? [["Action", h.action]] : []
    ] }) }),
    /* @__PURE__ */ t(Ba, { row: h ?? a })
  ] });
}
const bt = 65, je = { events: "Events", access_logs: "Requests" }, Ha = 20, yt = (e, a = Date.now()) => (a - Date.parse(`${e.replace(" ", "T")}:00Z`)) / 6e4, Ja = () => new Date(Date.now() - 864e5).toISOString().slice(0, 10);
function Ga(e, a, s) {
  var l;
  const r = (l = s == null ? void 0 : s.sealed_until) == null ? void 0 : l[a];
  return r ? e.slice(0, 16) <= r ? "sealed" : "waiting" : null;
}
function Xa({ request: e, status: a }) {
  var _, q;
  const [s, r] = T(!1), [l, o] = T(Ja), [c, u] = T(!1), [h, b] = T(null), k = D(null), y = I(
    a != null && a.checks ? "integrity" : null,
    () => e("integrity", { method: "GET" })
  ), v = !!(a != null && a.checks && ((_ = y.data) != null && _.allowed));
  if (!a) return null;
  const g = Object.entries(a.sealed_until ?? {}), N = a.last_daily, p = (q = a.stats) == null ? void 0 : q.queued;
  if (!g.length && a.recording === void 0 && !N) return null;
  const M = async (E) => {
    u(!0);
    try {
      b(await E());
    } catch (m) {
      b({ kind: "error", message: m.message });
    } finally {
      u(!1);
    }
  }, S = () => M(async () => ({ kind: "day", ...await e("integrity/verify", { method: "POST", body: { day: l } }) })), d = () => M(async () => {
    const E = await e(`integrity/seal/${l}`, { method: "GET" });
    return Pe(`${JSON.stringify(E, null, 2)}
`, `activity-seal-${l}.json`, "application/json"), { kind: "downloaded", day: l };
  }), f = (E) => M(async () => {
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
      a.recording !== void 0 && /* @__PURE__ */ t("span", { className: x("ahv-tag", a.recording ? "ahv-tag-ok" : "ahv-tag-bad"), children: a.recording ? "Recording" : "Not recording" }),
      p !== void 0 && /* @__PURE__ */ n("span", { children: [
        "Waiting to be written ",
        /* @__PURE__ */ t("strong", { className: "ahv-num", children: p.toLocaleString() })
      ] }),
      g.map(([E, m]) => /* @__PURE__ */ n(
        "span",
        {
          className: x(yt(m) > bt && "ahv-warn"),
          title: yt(m) > bt ? "Sealing is behind" : "Every minute up to this one is sealed",
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
      v && /* @__PURE__ */ t("button", { type: "button", className: "ahv-link-button ahv-push-right", "aria-expanded": s, onClick: () => r((E) => !E), children: "Check integrity" })
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
        /* @__PURE__ */ n("button", { type: "button", className: "ahv-button ahv-button-main", disabled: c || !l, onClick: S, children: [
          /* @__PURE__ */ t(O, { name: "shield", size: 14 }),
          c ? "Checking…" : "Check this day"
        ] }),
        /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            className: "ahv-button",
            disabled: c || !l,
            onClick: d,
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
            disabled: c,
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
              E.target.value = "", m && f(m);
            }
          }
        )
      ] }),
      h && /* @__PURE__ */ t(Ya, { verdict: h })
    ] })
  ] });
}
function Ya({ verdict: e }) {
  return e.kind === "error" ? /* @__PURE__ */ t("p", { className: "ahv-bad", role: "alert", children: e.message }) : e.kind === "day" ? /* @__PURE__ */ n("div", { role: "status", className: x("ahv-verdict", e.ok ? "ahv-verdict-ok" : "ahv-verdict-bad"), children: [
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
function Nt(e, a) {
  const s = e.lastIndexOf(" ", a - 1) + 1, r = e.indexOf(" ", a);
  return { start: s, end: r < 0 ? e.length : r, word: e.slice(s, r < 0 ? e.length : r) };
}
function Za({ value: e, onChange: a, onSubmit: s, suggestions: r, placeholder: l, inputRef: o }) {
  const c = D(null), u = o ?? c, h = ta(), [b, k] = T(0), [y, v] = T(!1), [g, N] = T(0), [p, M] = T(!1), { start: S, end: d, word: f } = Nt(e, b), _ = y ? r(f) : [], q = _[Math.min(g, _.length - 1)], E = (m) => {
    const C = e.slice(d), P = m.insert.endsWith(":") ? "" : " ", Ne = `${e.slice(0, S)}${m.insert}${C.startsWith(" ") || !P ? "" : P}${C}`, te = S + m.insert.length + (m.insert.endsWith(":") ? 0 : 1);
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
            Nt(e, C).start !== S && M(!1), k(C);
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
        className: x(p && m === q && "ahv-suggest-on"),
        onMouseDown: (P) => {
          P.preventDefault(), E(m);
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
function Ge({ label: e, icon: a, children: s, open: r, setOpen: l, badge: o, disabled: c }) {
  const u = D(null);
  return K(() => {
    if (!r) return;
    const h = (k) => {
      u.current && !k.composedPath().includes(u.current) && l(!1);
    }, b = (k) => k.key === "Escape" && l(!1);
    return document.addEventListener("mousedown", h), document.addEventListener("keydown", b), () => {
      document.removeEventListener("mousedown", h), document.removeEventListener("keydown", b);
    };
  }, [r, l]), /* @__PURE__ */ n("div", { className: "ahv-menu", ref: u, children: [
    /* @__PURE__ */ n("button", { type: "button", className: "ahv-button", "aria-expanded": r, disabled: c, onClick: () => l(!r), children: [
      /* @__PURE__ */ t(O, { name: a, size: 14 }),
      e,
      o && /* @__PURE__ */ t("span", { className: "ahv-count", children: o }),
      /* @__PURE__ */ t(O, { name: "chevronDown", size: 14 })
    ] }),
    r && /* @__PURE__ */ t("div", { className: "ahv-menu-list ahv-menu-panel", children: s })
  ] });
}
function Qa({ columns: e, shown: a, onChange: s }) {
  const [r, l] = T(!1);
  return /* @__PURE__ */ n(Ge, { label: "Columns", icon: "sliders", open: r, setOpen: l, children: [
    /* @__PURE__ */ t("p", { className: "ahv-dim ahv-small", children: "When, who and what always show." }),
    e.map((o) => /* @__PURE__ */ n("label", { className: "ahv-check", children: [
      /* @__PURE__ */ t(
        "input",
        {
          type: "checkbox",
          checked: a.includes(o.key),
          onChange: (c) => s(c.target.checked ? [...a, o.key] : a.filter((u) => u !== o.key))
        }
      ),
      o.label
    ] }, o.key))
  ] });
}
function en({ request: e, current: a, onOpen: s }) {
  var d;
  const [r, l] = T(!1), o = I("views", () => e("views", { method: "GET" })), [c, u] = T(""), [h, b] = T(!1), [k, y] = T(!1), [v, g] = T(null);
  if (!((d = o.data) != null && d.enabled)) return null;
  const N = o.data.views, p = N.find((f) => f.search === a), M = async (f) => {
    y(!0), g(null);
    try {
      await f(), o.refresh(), u("");
    } catch (_) {
      g(_.message);
    } finally {
      y(!1);
    }
  }, S = (f, _ = c, q = h) => M(() => e("views", { method: "POST", body: { id: f, name: _.trim(), search: a, shared: q } }));
  return /* @__PURE__ */ n(Ge, { label: p ? p.name : "Views", icon: "layers", open: r, setOpen: l, children: [
    N.length ? /* @__PURE__ */ t("ul", { className: "ahv-views", children: N.map((f) => /* @__PURE__ */ n("li", { className: x(f === p && "ahv-views-on"), children: [
      /* @__PURE__ */ n("button", { type: "button", className: "ahv-views-open", onClick: () => {
        s(f.search), l(!1);
      }, children: [
        /* @__PURE__ */ t("span", { children: f.name }),
        /* @__PURE__ */ t("span", { className: "ahv-dim ahv-small", children: f.mine ? f.shared ? "Shared by you" : "Only you" : `Shared by ${f.owner_name}` })
      ] }),
      f.mine && /* @__PURE__ */ n("span", { className: "ahv-views-tools", children: [
        f.search !== a && /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            className: "ahv-icon-button",
            title: "Save the current search into this view",
            disabled: k,
            onClick: () => S(f.id, f.name, f.shared),
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
            onClick: () => M(() => e(`views/${f.id}`, { method: "DELETE" })),
            children: /* @__PURE__ */ t(O, { name: "close", size: 14 })
          }
        )
      ] })
    ] }, f.id)) }) : /* @__PURE__ */ t("p", { className: "ahv-dim ahv-small", children: "No saved views yet. Save the current search to come back to it." }),
    /* @__PURE__ */ n("form", { className: "ahv-views-save", onSubmit: (f) => {
      f.preventDefault(), c.trim() && S();
    }, children: [
      /* @__PURE__ */ t(
        "input",
        {
          className: "ahv-input",
          value: c,
          maxLength: 80,
          placeholder: "Name this search",
          "aria-label": "View name",
          onChange: (f) => u(f.target.value)
        }
      ),
      /* @__PURE__ */ n("label", { className: "ahv-check", children: [
        /* @__PURE__ */ t("input", { type: "checkbox", checked: h, onChange: (f) => b(f.target.checked) }),
        "Share with my team"
      ] }),
      /* @__PURE__ */ t("button", { type: "submit", className: "ahv-button ahv-button-main", disabled: k || !c.trim(), children: "Save view" }),
      v && /* @__PURE__ */ t("span", { className: "ahv-bad ahv-small", children: v })
    ] })
  ] });
}
const tn = { active: ["Active", "ahv-tag-ok"], failing: ["Failing", "ahv-tag-bad"], paused: ["Paused", "ahv-tag-warn"] }, kt = { events: "Events", requests: "API requests", both: "Events and API requests" }, Ut = {
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
}, Le = (e) => e.destination === "webhook" ? e.target.url ?? "" : `s3://${[e.target.bucket, e.target.prefix].filter(Boolean).join("/")}`, St = (e) => ({
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
function an(e) {
  const a = {};
  for (const s of e.split(`
`)) {
    const r = s.indexOf(":");
    r > 0 && (a[s.slice(0, r).trim()] = s.slice(r + 1).trim());
  }
  return a;
}
function _t(e) {
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
    secret_headers: a ? an(e.headers) : {},
    enabled: e.enabled,
    start: e.start
  };
}
const wt = () => Array.from(crypto.getRandomValues(new Uint8Array(24)), (e) => e.toString(16).padStart(2, "0")).join("");
function nn({ request: e, kinds: a, list: s, refresh: r }) {
  const [l, o] = T(null), [c, u] = T(!1), [h, b] = T(null), k = async (d, f) => {
    u(!0), b(null);
    try {
      return await d(), f && b({ ok: !0, text: f }), r(), !0;
    } catch (_) {
      return b({ ok: !1, text: _.message }), !1;
    } finally {
      u(!1);
    }
  }, y = async (d) => {
    d.preventDefault(), l && await k(() => e("streams", { method: "POST", body: _t(l) }), `${l.name.trim()} saved.`) && o(null);
  }, v = (d) => k(async () => {
    const f = await e(`streams/${d.id}/test`, { method: "POST" });
    if (!f.ok) throw new Error(`${d.name}: ${f.error}`);
  }, `${d.name}: the test line was delivered.`), g = (d) => k(
    () => e("streams", { method: "POST", body: { ..._t(St(d)), enabled: !d.enabled } }),
    `${d.name} ${d.enabled ? "paused" : "resumed"}.`
  ), N = (d) => window.confirm(`Remove ${d.name}? Nothing more is sent to ${Le(d)}.`) && k(() => e(`streams/${d.id}`, { method: "DELETE" }), `${d.name} removed.`), p = (d) => o((f) => f && { ...f, ...d }), M = a.includes("requests") ? ["events", "requests", "both"] : ["events"], S = l && !M.includes(l.kind) ? [...M, l.kind] : M;
  return /* @__PURE__ */ n("section", { className: "ahv-streams", "aria-label": "Streams", children: [
    /* @__PURE__ */ n("div", { className: "ahv-bar", children: [
      /* @__PURE__ */ t("p", { className: "ahv-dim ahv-small", children: "Each stream sends new records to your own system as they are sealed, a few minutes after they happen. Webhooks receive JSON lines signed with your secret; S3 buckets receive one gzip file per batch." }),
      !l && /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          className: "ahv-button ahv-button-main ahv-push-right",
          onClick: () => {
            b(null), o({ ...Ut, secret: wt() });
          },
          children: "Add stream"
        }
      )
    ] }),
    s.streams.length > 0 && !l && /* @__PURE__ */ t("ul", { className: "ahv-stream-list", children: s.streams.map((d) => {
      const [f, _] = tn[d.state];
      return /* @__PURE__ */ n("li", { children: [
        /* @__PURE__ */ n("div", { className: "ahv-stream-main", children: [
          /* @__PURE__ */ t("strong", { children: d.name }),
          /* @__PURE__ */ t("span", { className: x("ahv-tag", _), children: f }),
          /* @__PURE__ */ n("span", { className: "ahv-dim ahv-small", children: [
            kt[d.kind],
            d.query && /* @__PURE__ */ n(U, { children: [
              " matching ",
              /* @__PURE__ */ t("code", { className: "ahv-mono", children: d.query })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ t("span", { className: "ahv-mono ahv-dim ahv-stream-where", title: Le(d), children: Le(d) }),
        /* @__PURE__ */ n("span", { className: "ahv-small", children: [
          /* @__PURE__ */ t("strong", { className: "ahv-num", children: d.delivered.toLocaleString() }),
          " delivered",
          d.last_delivered_at && /* @__PURE__ */ n("span", { className: "ahv-dim", children: [
            ", last ",
            Fe(d.last_delivered_at) || d.last_delivered_at.slice(0, 16)
          ] })
        ] }),
        /* @__PURE__ */ n("span", { className: "ahv-stream-tools", children: [
          /* @__PURE__ */ t("button", { type: "button", className: "ahv-link-button", disabled: c, onClick: () => v(d), children: "Send test" }),
          /* @__PURE__ */ t("button", { type: "button", className: "ahv-link-button", disabled: c, onClick: () => g(d), children: d.enabled ? "Pause" : "Resume" }),
          /* @__PURE__ */ t("button", { type: "button", className: "ahv-link-button", disabled: c, onClick: () => {
            b(null), o(St(d));
          }, children: "Edit" }),
          /* @__PURE__ */ t("button", { type: "button", className: "ahv-icon-button", title: `Remove ${d.name}`, disabled: c, onClick: () => N(d), children: /* @__PURE__ */ t(O, { name: "close", size: 14 }) })
        ] }),
        d.state === "failing" && d.error && /* @__PURE__ */ n("span", { className: "ahv-bad ahv-small", children: [
          d.error,
          ". It is tried again shortly."
        ] })
      ] }, d.id);
    }) }),
    !s.streams.length && !l && /* @__PURE__ */ t("p", { className: "ahv-dim ahv-small", children: "No streams yet." }),
    l && /* @__PURE__ */ n("form", { className: "ahv-stream-form", onSubmit: y, children: [
      /* @__PURE__ */ n("label", { className: "ahv-field", children: [
        /* @__PURE__ */ t("span", { children: "Name" }),
        /* @__PURE__ */ t("input", { className: "ahv-input", required: !0, maxLength: 80, value: l.name, placeholder: "CRM intake", onChange: (d) => p({ name: d.target.value }) })
      ] }),
      /* @__PURE__ */ n("label", { className: "ahv-field", children: [
        /* @__PURE__ */ t("span", { children: "Records" }),
        /* @__PURE__ */ t("select", { className: "ahv-input", value: l.kind, disabled: S.length < 2, onChange: (d) => p({ kind: d.target.value }), children: S.map((d) => /* @__PURE__ */ t("option", { value: d, children: kt[d] }, d)) })
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
            onChange: (d) => p({ query: d.target.value })
          }
        )
      ] }),
      /* @__PURE__ */ n("div", { className: "ahv-field ahv-field-wide", children: [
        /* @__PURE__ */ t("span", { children: "Send to" }),
        /* @__PURE__ */ t("div", { className: "ahv-segment", role: "group", "aria-label": "Destination", children: ["webhook", "s3"].map((d) => /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            "aria-pressed": l.destination === d,
            disabled: !!l.id,
            onClick: () => p({ destination: d, secret: d === "webhook" && !l.id ? wt() : "" }),
            children: d === "webhook" ? "Webhook" : "S3 bucket"
          },
          d
        )) })
      ] }),
      l.destination === "webhook" ? /* @__PURE__ */ n(U, { children: [
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
              onChange: (d) => p({ url: d.target.value })
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
              onChange: (d) => p({ secret: d.target.value })
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
              onChange: (d) => p({ headers: d.target.value })
            }
          )
        ] })
      ] }) : /* @__PURE__ */ n(U, { children: [
        /* @__PURE__ */ n("label", { className: "ahv-field", children: [
          /* @__PURE__ */ t("span", { children: "Bucket" }),
          /* @__PURE__ */ t("input", { className: "ahv-input", required: !0, value: l.bucket, onChange: (d) => p({ bucket: d.target.value }) })
        ] }),
        /* @__PURE__ */ n("label", { className: "ahv-field", children: [
          /* @__PURE__ */ n("span", { children: [
            "Folder ",
            /* @__PURE__ */ t("em", { className: "ahv-dim", children: "(optional)" })
          ] }),
          /* @__PURE__ */ t("input", { className: "ahv-input", value: l.prefix, placeholder: "activity", onChange: (d) => p({ prefix: d.target.value }) })
        ] }),
        /* @__PURE__ */ n("label", { className: "ahv-field", children: [
          /* @__PURE__ */ n("span", { children: [
            "Region ",
            /* @__PURE__ */ t("em", { className: "ahv-dim", children: "(optional)" })
          ] }),
          /* @__PURE__ */ t("input", { className: "ahv-input", value: l.region, placeholder: "eu-central-1", onChange: (d) => p({ region: d.target.value }) })
        ] }),
        /* @__PURE__ */ n("label", { className: "ahv-field", children: [
          /* @__PURE__ */ n("span", { children: [
            "Endpoint ",
            /* @__PURE__ */ t("em", { className: "ahv-dim", children: "(for R2, MinIO …)" })
          ] }),
          /* @__PURE__ */ t("input", { className: "ahv-input ahv-mono", type: "url", value: l.endpoint, onChange: (d) => p({ endpoint: d.target.value }) })
        ] }),
        /* @__PURE__ */ n("label", { className: "ahv-field", children: [
          /* @__PURE__ */ n("span", { children: [
            "Access key ",
            l.id && /* @__PURE__ */ t("em", { className: "ahv-dim", children: "(blank keeps it)" })
          ] }),
          /* @__PURE__ */ t("input", { className: "ahv-input ahv-mono", required: !l.id, autoComplete: "off", value: l.accessKey, onChange: (d) => p({ accessKey: d.target.value }) })
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
              onChange: (d) => p({ secretKey: d.target.value })
            }
          )
        ] })
      ] }),
      !l.id && /* @__PURE__ */ n("label", { className: "ahv-field ahv-field-wide", children: [
        /* @__PURE__ */ t("span", { children: "Start with" }),
        /* @__PURE__ */ n("select", { className: "ahv-input", value: l.start, onChange: (d) => p({ start: d.target.value }), children: [
          /* @__PURE__ */ t("option", { value: "now", children: "Records from now on" }),
          /* @__PURE__ */ t("option", { value: "beginning", children: "Everything already kept, then what follows" })
        ] })
      ] }),
      /* @__PURE__ */ n("div", { className: "ahv-bar ahv-field-wide", children: [
        /* @__PURE__ */ t("button", { type: "submit", className: "ahv-button ahv-button-main", disabled: c, children: c ? "Saving…" : l.id ? "Save changes" : "Add stream" }),
        /* @__PURE__ */ t("button", { type: "button", className: "ahv-button", disabled: c, onClick: () => o(null), children: "Cancel" })
      ] })
    ] }),
    h && /* @__PURE__ */ t("p", { role: h.ok ? "status" : "alert", className: x("ahv-small", h.ok ? "ahv-ok" : "ahv-bad"), children: h.text })
  ] });
}
const Ct = [
  { value: "important", label: "Important", hint: "What people did, without the details behind it" },
  { value: "all", label: "All", hint: "Every record, each request's row changes inside its event" },
  { value: "problems", label: "Problems", hint: "Only what failed or was refused" }
], sn = [
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
], $t = {
  events: [
    { key: "where", label: "Where" },
    { key: "concerning", label: "Concerning" },
    { key: "result", label: "Result" },
    { key: "service", label: "Service" },
    { key: "ip", label: "IP address" }
  ],
  requests: [{ key: "where", label: "Where" }, { key: "service", label: "Service" }, { key: "ip", label: "IP address" }]
}, Tt = ["where"], ln = [], zt = "activity-hub-columns", pe = ["kind", "view", "p", "q", "range", "from", "to", "cols"], re = (e) => e ? "all" : "7d";
function Mt(e, a) {
  const s = (o) => {
    const c = e.get(o) ?? "";
    return Ae(c) ? c : "";
  }, r = s("from"), l = s("to");
  return { q: e.get("q") ?? "", from: r, to: l, range: e.get("range") || (r || l ? "custom" : re(a)) };
}
function rn(e) {
  var s;
  if (e.range === "custom")
    return { occurred_from: Ae(e.from) ? De(e.from) : void 0, occurred_to: Ae(e.to) ? da(e.to) : void 0 };
  const a = (s = We.find((r) => r.value === e.range)) == null ? void 0 : s.minutes;
  return a ? { occurred_from: `${ha(a).slice(0, 16)}:00` } : {};
}
function on(e, a, s, r, l) {
  const o = { ...(s == null ? void 0 : s.search.filters) ?? {} }, c = { kind: e, filters: o, query: r.q.trim() || void 0, ...rn(r) };
  return e === "events" ? (c.view = a, c.action = s == null ? void 0 : s.search.action, l && Object.assign(c, { related_type: l.type, related_id: l.id })) : (c.status_from = s == null ? void 0 : s.search.status_from, l && (o.actor_id = l.id)), c;
}
const cn = (e) => {
  const a = new URLSearchParams();
  return e.forEach((s, r) => pe.includes(r) && a.set(r, s)), a.toString();
};
function dn() {
  try {
    return JSON.parse(localStorage.getItem(zt) ?? "null") ?? Tt;
  } catch {
    return Tt;
  }
}
function yn({
  request: e,
  title: a = "Activity Log",
  description: s,
  presets: r = ln,
  kinds: l = ["events", "requests"],
  entity: o,
  params: c,
  onParamsChange: u,
  canExport: h = !1,
  showStatus: b = !0,
  pageSize: k = 100,
  liveEveryMs: y = 5e3,
  className: v
}) {
  var dt, ht, ut, mt, vt, pt, ft;
  const [g, N] = T(() => new URLSearchParams()), p = c ?? g, M = Be((i) => u ? u(i) : N(i), [u]), S = p.get("kind") === "requests" && l.includes("requests") ? "requests" : l[0], d = ((dt = Ct.find((i) => i.value === p.get("view"))) == null ? void 0 : dt.value) ?? "important", f = oe(() => S === "events" ? [{ label: "Everything", search: {} }, ...r] : sn, [S, r]), _ = Math.min(Math.max(Number(p.get("p")) || 0, 0), f.length - 1), q = p.has("cols") ? (p.get("cols") || "").split(",").filter(Boolean) : dn(), E = $t[S].filter((i) => q.includes(i.key)), m = oe(() => Mt(p, o), [p, o]), [C, P] = T(m), [Ne, te] = T(p.toString());
  Ne !== p.toString() && (te(p.toString()), P(m));
  const [z, de] = T(!1), [ke, he] = T(null), [Se, _e] = T(null), [jt, Xe] = T(!1), [Ye, we] = T(null), Ze = D(null), [, Wt] = T(0);
  K(() => {
    const i = setInterval(() => Wt((w) => w + 1), 3e4);
    return () => clearInterval(i);
  }, []);
  const V = oe(
    () => on(S, d, f[_], m, o),
    [S, d, f, _, m, o]
  ), ue = JSON.stringify(V), R = la(e, V, k, z, y), Ce = D(null), ae = I(ue, () => {
    var L;
    const i = ue, w = !V.occurred_from && ((L = Ce.current) == null ? void 0 : L.key) === i;
    return e("chart", { method: "POST", body: w ? { ...V, occurred_from: Ce.current.from } : V }).then(($) => (V.occurred_from || (Ce.current = { key: i, from: $.occurred_from }), $));
  }, z ? y : void 0), ne = I("catalog", () => e("catalog", { method: "GET" })), Qe = I(b ? "status" : null, () => e("status", { method: "GET" }), 6e4), se = I(h && !o ? "streams" : null, () => e("streams", { method: "GET" }), 6e4), [et, Bt] = T(!1), tt = (i) => Ga(i.received_at, F(i) ? "events" : "access_logs", Qe.data), at = (i) => () => e("values", { method: "POST", body: { ...V, field: i } }).then((w) => w.values), Ft = I(`${ue}|service`, at("service")), Kt = I(`${ue}|origin`, at("origin")), nt = (i = {}) => {
    const w = new URLSearchParams(p);
    for (const Oe of pe) w.delete(Oe);
    const L = i.kind ?? S;
    let $ = i.draft ?? C;
    if (L !== S) {
      const Oe = new Set(Sa(L));
      $ = { ...$, q: ie($.q).filter((me) => !me.field || Oe.has(me.field)).map((me) => me.text).join(" ") };
    }
    L !== l[0] && w.set("kind", L), (i.view ?? d) !== "important" && w.set("view", i.view ?? d);
    const G = i.preset ?? (i.kind && i.kind !== S ? 0 : _);
    return G && w.set("p", String(G)), $.q.trim() && w.set("q", $.q.trim()), $.range !== re(o) && w.set("range", $.range), $.range === "custom" && ($.from && w.set("from", $.from), $.to && w.set("to", $.to)), (i.columns || p.has("cols")) && w.set("cols", (i.columns ?? q).join(",")), w;
  }, j = (i = {}) => {
    i.draft && P(i.draft), M(nt(i));
  }, Vt = (i) => {
    try {
      localStorage.setItem(zt, JSON.stringify(i));
    } catch {
    }
    j({ draft: m, columns: i });
  }, Ht = (i, w) => {
    const L = ie(m.q).filter(($) => $.field !== i).map(($) => $.text);
    j({ draft: { ...m, q: [...L, `${i}:${Ie(w)}`].join(" ") } });
  }, st = (i) => {
    he(null), i.actor_id ? Ht("actor", i.actor_id) : i.target_type && i.target_id && j({
      kind: "events",
      view: "all",
      preset: 0,
      draft: { q: `on:${i.target_type}:${Ie(i.target_id)}`, range: "all", from: "", to: "" }
    });
  }, Jt = (i) => {
    const w = C.q.trim();
    P({ ...C, q: `${w ? `${w} ` : ""}${i}:` }), requestAnimationFrame(() => {
      const L = Ze.current;
      L && (L.focus(), L.setSelectionRange(L.value.length, L.value.length));
    });
  }, Gt = C.q.trim() !== m.q.trim() || C.range !== m.range || C.from !== m.from || C.to !== m.to, le = !!(C.range === "custom" && C.from && C.to && C.to < C.from), $e = D(null), lt = D(null), { hasMore: it, loadMore: Te, more: H, pageCount: rt } = R;
  K(() => {
    if (!$e.current || !it || H.loading || H.error || rt >= qe) return;
    const i = new IntersectionObserver(([w]) => w.isIntersecting && Te(), { root: lt.current, rootMargin: "240px" });
    return i.observe($e.current), () => i.disconnect();
  }, [it, Te, H.loading, H.error, rt, R.rows.length]);
  const ot = async (i) => {
    Xe(!1), _e(0);
    try {
      const { rows: w, more: L } = await pa(e, V, _e);
      L && we(`Only the newest ${ve.toLocaleString()} rows were exported. Narrow the dates for the rest.`);
      const $ = (/* @__PURE__ */ new Date()).toISOString().slice(0, 16).replace(/[-:T]/g, ""), G = `activity-${o ? `${o.type}-${o.id}-` : ""}${S}-${$}`;
      i === "csv" ? Pe(ga(S, w), `${G}.csv`, "text/csv;charset=utf-8") : Pe(ba(w), `${G}.jsonl`, "application/x-ndjson");
    } catch (w) {
      we(`Export failed: ${w.message}`);
    } finally {
      _e(null);
    }
  }, Me = S === "events" ? "events" : "requests", Ee = ((ht = ne.data) == null ? void 0 : ht.actor_types) ?? {}, ct = ((ut = ne.data) == null ? void 0 : ut.entities) ?? {}, Xt = (i) => {
    var w, L;
    if (i.field === "action") return ((L = (w = ne.data) == null ? void 0 : w.actions[i.value]) == null ? void 0 : L.title) ?? i.value;
    if (i.field === "actor_type") return Ee[i.value] ?? i.value;
    if (i.field === "on") {
      const [$, ...G] = i.value.split(":");
      return `${ct[$] ?? A($)} ${G.join(":")}`;
    }
    return i.value;
  }, J = R.rows, Yt = { service: Ft.data ?? [], origin: Kt.data ?? [] }, Zt = 3 + E.length;
  return o && !(o.type && o.id) ? /* @__PURE__ */ t("div", { className: x("ahv ahv-log", v), children: /* @__PURE__ */ n(Z, { children: [
    "Nothing to show: no ",
    o.type || "record",
    " chosen."
  ] }) }) : /* @__PURE__ */ n("div", { className: x("ahv ahv-log", v), children: [
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
          en,
          {
            request: e,
            current: cn(nt({ draft: m })),
            onOpen: (i) => {
              const w = new URLSearchParams(p);
              for (const L of pe) w.delete(L);
              new URLSearchParams(i).forEach((L, $) => pe.includes($) && w.set($, L)), M(w);
            }
          }
        ),
        /* @__PURE__ */ t(Qa, { columns: $t[S], shown: q, onChange: Vt }),
        h && /* @__PURE__ */ n(
          Ge,
          {
            label: Se === null ? "Export" : `Exporting… ${Se.toLocaleString()}`,
            icon: "download",
            open: jt,
            setOpen: Xe,
            disabled: Se !== null || !J.length,
            children: [
              /* @__PURE__ */ t("button", { type: "button", role: "menuitem", onClick: () => ot("csv"), children: "CSV, for spreadsheets" }),
              /* @__PURE__ */ t("button", { type: "button", role: "menuitem", onClick: () => ot("jsonl"), children: "JSON Lines, for other tools" })
            ]
          }
        ),
        ((mt = se.data) == null ? void 0 : mt.enabled) && /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            className: "ahv-button",
            "aria-expanded": et,
            onClick: () => Bt((i) => !i),
            title: "Send the log to your own systems as it is written",
            children: [
              /* @__PURE__ */ t(O, { name: "send", size: 14 }),
              "Streams",
              se.data.streams.some((i) => i.state === "failing") && /* @__PURE__ */ t("span", { className: "ahv-count ahv-count-bad", children: "!" })
            ]
          }
        ),
        /* @__PURE__ */ n(
          "button",
          {
            type: "button",
            className: x("ahv-button", z && "ahv-button-live"),
            "aria-pressed": z,
            title: "Check for new activity every few seconds",
            onClick: () => de((i) => !i),
            children: [
              /* @__PURE__ */ t(O, { name: "live", size: 14, className: x(z && "ahv-pulse") }),
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
              /* @__PURE__ */ t(O, { name: "refresh", size: 14, className: x(R.refreshing && !z && "ahv-spin") }),
              "Refresh"
            ]
          }
        )
      ] })
    ] }),
    et && ((vt = se.data) == null ? void 0 : vt.enabled) && /* @__PURE__ */ t(nn, { request: e, kinds: l, list: se.data, refresh: se.refresh }),
    b && !o && /* @__PURE__ */ t(Xa, { request: e, status: Qe.data }),
    /* @__PURE__ */ n("div", { className: "ahv-filters", children: [
      /* @__PURE__ */ n("div", { className: "ahv-bar", children: [
        l.length > 1 && /* @__PURE__ */ t("div", { className: "ahv-segment", role: "group", "aria-label": "Records", children: l.map((i) => /* @__PURE__ */ t("button", { type: "button", "aria-pressed": S === i, onClick: () => j({ kind: i, draft: m }), children: i === "events" ? "Events" : "API requests" }, i)) }),
        S === "events" && /* @__PURE__ */ t("div", { className: "ahv-segment", role: "group", "aria-label": "Show", children: Ct.map((i) => /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            title: i.hint,
            "aria-pressed": d === i.value,
            onClick: () => j({ view: i.value, draft: m }),
            children: i.label
          },
          i.value
        )) }),
        f.length > 1 && /* @__PURE__ */ t("div", { className: "ahv-chips", role: "group", "aria-label": "Presets", children: f.map((i, w) => /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            className: "ahv-chip",
            "aria-pressed": _ === w,
            onClick: () => j({ preset: w, draft: m }),
            children: i.label
          },
          i.label
        )) })
      ] }),
      /* @__PURE__ */ n("div", { className: "ahv-searchbar", children: [
        /* @__PURE__ */ t(
          Za,
          {
            value: C.q,
            inputRef: Ze,
            onChange: (i) => P({ ...C, q: i }),
            onSubmit: () => !le && j({ draft: C }),
            suggestions: (i) => wa(i, S, ne.data, Yt),
            placeholder: S === "events" ? "Search: words, or actor:… action:trade.* -result:success on:account:100234" : "Search: words, or actor:… method:POST status:4xx route:/trading/*"
          }
        ),
        /* @__PURE__ */ t(
          "select",
          {
            className: "ahv-input ahv-range",
            value: C.range,
            "aria-label": "When",
            onChange: (i) => P({ ...C, range: i.target.value }),
            children: We.map((i) => /* @__PURE__ */ t("option", { value: i.value, children: i.label }, i.value))
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
              onChange: (i) => P({ ...C, from: i.target.value })
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
              onChange: (i) => P({ ...C, to: i.target.value })
            }
          )
        ] }),
        /* @__PURE__ */ t("button", { type: "button", className: "ahv-button ahv-button-main", disabled: le, onClick: () => j({ draft: C }), children: "Search" })
      ] }),
      le && /* @__PURE__ */ t("em", { className: "ahv-bad ahv-small", children: "The end date is before the start date" }),
      /* @__PURE__ */ n("div", { className: "ahv-bar ahv-add", children: [
        /* @__PURE__ */ t("span", { className: "ahv-dim ahv-small", children: "Add" }),
        Ke(S).filter((i) => !(o && (i.field === "on" || S === "requests" && i.field === "actor"))).slice(0, 8).map((i) => /* @__PURE__ */ t("button", { type: "button", className: "ahv-link-button", title: i.hint, onClick: () => Jt(i.field), children: i.label }, i.field)),
        Gt && /* @__PURE__ */ t("span", { className: "ahv-warn ahv-small ahv-push-right", children: "Not searched yet: press Enter or Search" })
      ] }),
      (ie(m.q).length > 0 || m.range !== re(o)) && /* @__PURE__ */ n("div", { className: "ahv-applied", children: [
        ie(m.q).map((i) => /* @__PURE__ */ n("span", { className: x("ahv-pill", i.negated && "ahv-pill-not"), children: [
          /* @__PURE__ */ n("span", { className: "ahv-dim", children: [
            i.negated ? "Not " : "",
            i.field ? `${_a(i.field)}:` : "Text:"
          ] }),
          " ",
          Xt(i),
          /* @__PURE__ */ t("button", { type: "button", "aria-label": `Remove ${i.text}`, onClick: () => j({ draft: { ...m, q: Na(m.q, i) } }), children: /* @__PURE__ */ t(O, { name: "close", size: 12 }) })
        ] }, i.text)),
        m.range !== re(o) && /* @__PURE__ */ n("span", { className: "ahv-pill", children: [
          /* @__PURE__ */ t("span", { className: "ahv-dim", children: "When:" }),
          " ",
          m.range === "custom" ? [m.from && ee(W(De(m.from))), m.to && ee(W(De(m.to)))].filter(Boolean).join(" – ") || "Any date" : (pt = We.find((i) => i.value === m.range)) == null ? void 0 : pt.label,
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              "aria-label": "Remove the time range",
              onClick: () => j({ draft: { ...m, range: re(o), from: "", to: "" } }),
              children: /* @__PURE__ */ t(O, { name: "close", size: 12 })
            }
          )
        ] }),
        /* @__PURE__ */ t("button", { type: "button", className: "ahv-link-button", onClick: () => j({ preset: 0, draft: Mt(new URLSearchParams(), o) }), children: "Clear all" })
      ] })
    ] }),
    ae.error && !ae.data ? null : /* @__PURE__ */ t(Oa, { chart: ae.data, noun: Me, loading: ae.loading }),
    Ye && /* @__PURE__ */ t(Z, { action: /* @__PURE__ */ t("button", { type: "button", className: "ahv-icon-button", "aria-label": "Dismiss", onClick: () => we(null), children: /* @__PURE__ */ t(O, { name: "close", size: 14 }) }), children: Ye }),
    R.error && J.length > 0 && /* @__PURE__ */ n(Z, { tone: "bad", action: /* @__PURE__ */ t("button", { type: "button", className: "ahv-button", onClick: R.refresh, children: "Retry" }), children: [
      "Couldn't load newer activity: ",
      R.error.message
    ] }),
    R.error && !J.length ? /* @__PURE__ */ t(Z, { tone: "bad", action: /* @__PURE__ */ t("button", { type: "button", className: "ahv-button", onClick: R.refresh, children: "Retry" }), children: R.error.message }) : R.loading ? /* @__PURE__ */ t(Ve, {}) : J.length ? /* @__PURE__ */ n("div", { className: "ahv-table-wrap", ref: lt, children: [
      /* @__PURE__ */ n("table", { className: "ahv-table", children: [
        /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ n("tr", { children: [
          /* @__PURE__ */ t("th", { children: "When (UTC)" }),
          /* @__PURE__ */ t("th", { children: "Who" }),
          /* @__PURE__ */ t("th", { children: S === "events" ? "What happened" : "Request" }),
          E.map((i) => /* @__PURE__ */ t("th", { children: i.label }, i.key))
        ] }) }),
        /* @__PURE__ */ t("tbody", { children: J.map((i, w) => {
          var L;
          return /* @__PURE__ */ n(aa, { children: [
            i.occurred_at.slice(0, 10) !== ((L = J[w - 1]) == null ? void 0 : L.occurred_at.slice(0, 10)) && /* @__PURE__ */ t("tr", { className: "ahv-day", children: /* @__PURE__ */ t("td", { colSpan: Zt, children: oa(i.occurred_at) }) }),
            /* @__PURE__ */ n(
              "tr",
              {
                tabIndex: 0,
                className: x("ahv-row", F(i) && i.outcome !== "success" && "ahv-row-problem"),
                onClick: () => he(i),
                onKeyDown: ($) => {
                  $.target === $.currentTarget && ($.key === "Enter" || $.key === " ") && ($.preventDefault(), he(i));
                },
                children: [
                  /* @__PURE__ */ t("td", { children: /* @__PURE__ */ t(xa, { value: i.occurred_at, seal: tt(i) }) }),
                  /* @__PURE__ */ t("td", { children: /* @__PURE__ */ t(
                    Ra,
                    {
                      row: i,
                      actorTypes: Ee,
                      onFocus: o && S === "requests" ? void 0 : () => st({ actor_id: i.actor_id })
                    }
                  ) }),
                  /* @__PURE__ */ t("td", { children: F(i) ? /* @__PURE__ */ t(Pa, { row: i }) : /* @__PURE__ */ t(Dt, { row: i }) }),
                  E.map(($) => /* @__PURE__ */ t("td", { className: "ahv-cell", children: $.key === "where" ? /* @__PURE__ */ t(Aa, { row: i }) : $.key === "service" ? /* @__PURE__ */ t("span", { className: "ahv-dim", children: A(i.service) }) : $.key === "ip" ? /* @__PURE__ */ t("span", { className: "ahv-mono ahv-dim", children: i.ip || "—" }) : F(i) ? $.key === "result" ? i.outcome === "success" ? /* @__PURE__ */ t("span", { className: "ahv-dim", children: "success" }) : /* @__PURE__ */ t(ye, { outcome: i.outcome }) : i.target_type ? /* @__PURE__ */ n("span", { children: [
                    ct[i.target_type] ?? A(i.target_type),
                    " ",
                    /* @__PURE__ */ t("span", { className: "ahv-mono", children: i.target_name || i.target_id })
                  ] }) : "—" : null }, $.key))
                ]
              }
            )
          ] }, i.id);
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
      /* @__PURE__ */ t("span", { className: "ahv-dim", children: S === "events" && d === "important" ? "Try All, or a wider time range." : "Try a wider time range or fewer filters." })
    ] }),
    J.length > 0 && /* @__PURE__ */ n("footer", { className: "ahv-foot", children: [
      /* @__PURE__ */ n("span", { className: "ahv-dim ahv-num", children: [
        ua(J.length, Me.slice(0, -1)),
        " shown",
        z ? " · Live keeps the newest page" : R.trimmed ? " · the newest were let go to keep the list light; Refresh brings them back" : R.hasMore ? "" : " · that is all of them"
      ] }),
      H.error && /* @__PURE__ */ n("span", { className: "ahv-bad ahv-small", children: [
        "Couldn't load more: ",
        H.error.message
      ] }),
      R.hasMore && /* @__PURE__ */ t("button", { type: "button", className: "ahv-button", onClick: Te, disabled: H.loading, children: H.loading ? "Loading…" : "Load more" })
    ] }),
    /* @__PURE__ */ t(
      It,
      {
        request: e,
        row: ke,
        onClose: () => he(null),
        onFocus: o ? void 0 : st,
        actorTypes: Ee,
        entities: (ft = ne.data) == null ? void 0 : ft.entities,
        seal: ke ? tt(ke) : null
      }
    )
  ] });
}
const Et = 500;
function Nn({ request: e, entity: a, view: s = "all", action: r, newestFirst: l = !1, header: o, more: c, className: u }) {
  var M, S, d, f;
  const h = a.type && a.id ? `${a.type}:${a.id}:${s}:${r ?? ""}` : null, b = I(h, () => e("search", {
    method: "POST",
    body: { kind: "events", filters: {}, related_type: a.type, related_id: a.id, view: s, action: r, limit: Et, details: !0 }
  })), k = I("catalog", () => e("catalog", { method: "GET" })), [y, v] = T(null), g = ((M = b.data) == null ? void 0 : M.items) ?? [], N = l ? g : [...g].reverse(), p = !!((S = b.data) != null && S.next_cursor);
  return /* @__PURE__ */ n("div", { className: x("ahv ahv-timeline", u), children: [
    b.error ? /* @__PURE__ */ n(Z, { tone: "bad", action: /* @__PURE__ */ t("button", { type: "button", className: "ahv-button", onClick: b.refresh, children: "Retry" }), children: [
      "Couldn't load: ",
      b.error.message
    ] }) : b.loading && !b.data ? /* @__PURE__ */ t(Ve, { rows: 4 }) : N.length ? /* @__PURE__ */ n(U, { children: [
      o == null ? void 0 : o(g.length ? [...g].reverse() : [], p),
      p && /* @__PURE__ */ n("p", { className: "ahv-dim ahv-small", children: [
        "Showing the newest ",
        Et,
        " steps.",
        c && /* @__PURE__ */ n(U, { children: [
          " ",
          c
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
      /* @__PURE__ */ t("ol", { className: "ahv-steps", children: N.map((_) => /* @__PURE__ */ t(un, { event: _, onOpen: v }, _.id)) })
    ] }) : /* @__PURE__ */ t("p", { className: "ahv-dim", children: "Nothing has been recorded about this yet." }),
    /* @__PURE__ */ t(
      It,
      {
        request: e,
        row: y,
        onClose: () => v(null),
        actorTypes: (d = k.data) == null ? void 0 : d.actor_types,
        entities: (f = k.data) == null ? void 0 : f.entities
      }
    )
  ] });
}
const hn = (e) => e.outcome !== "success" ? { icon: "alert", tone: "rose" } : { icon: e.icon ?? (e.category === "data" ? "layers" : "log"), tone: e.tone ?? "neutral" };
function un({ event: e, onOpen: a }) {
  var k, y, v, g, N;
  const [s, r] = T(!1), { icon: l, tone: o } = hn(e), c = e.children ?? [], u = e.children_count ?? c.length, h = e.category !== "data" && ((k = e.change_list) != null && k.length) ? e.change_list : null, b = !!((y = e.details) != null && y.length) || u > 0;
  return /* @__PURE__ */ n("li", { className: `ahv-step ahv-tone-${o}`, children: [
    /* @__PURE__ */ t("span", { className: "ahv-step-icon", "aria-hidden": "true", children: /* @__PURE__ */ t(O, { name: l, size: 14 }) }),
    /* @__PURE__ */ n("div", { className: "ahv-step-main", children: [
      /* @__PURE__ */ n("div", { className: "ahv-step-head", children: [
        /* @__PURE__ */ n("div", { className: "ahv-stack", children: [
          /* @__PURE__ */ n("button", { type: "button", className: "ahv-step-title", onClick: () => a(e), title: "Open the full detail", children: [
            e.title,
            /* @__PURE__ */ t(ye, { outcome: e.outcome })
          ] }),
          /* @__PURE__ */ t(mn, { event: e })
        ] }),
        /* @__PURE__ */ n("span", { className: "ahv-step-when", title: `${e.occurred_at} UTC`, children: [
          /* @__PURE__ */ t("span", { className: "ahv-mono", children: be(e.occurred_at) }),
          /* @__PURE__ */ t("span", { className: "ahv-dim", children: Fe(e.occurred_at) || ee(W(e.occurred_at)) })
        ] })
      ] }),
      e.outcome !== "success" ? /* @__PURE__ */ t("p", { className: "ahv-step-problem", children: e.summary }) : (v = e.facts) != null && v.length ? /* @__PURE__ */ t(Pt, { facts: e.facts }) : !h && e.summary !== e.title ? /* @__PURE__ */ t("p", { className: "ahv-sentence", children: e.summary }) : null,
      h && /* @__PURE__ */ t(Je, { changes: h, valueLabel: "Set to" }),
      b && /* @__PURE__ */ n("button", { type: "button", className: "ahv-disclose", "aria-expanded": s, onClick: () => r((p) => !p), children: [
        /* @__PURE__ */ t(O, { name: "chevronDown", size: 13, className: x(s && "ahv-turned") }),
        s ? "Hide" : [((g = e.details) == null ? void 0 : g.length) && "Details", u > 0 && `${u} record change${u === 1 ? "" : "s"}`].filter(Boolean).join(" and ")
      ] }),
      s && /* @__PURE__ */ n("div", { className: "ahv-step-more", children: [
        (N = e.details) != null && N.length ? /* @__PURE__ */ t(He, { items: e.details.map((p) => [p.label, p.value]), mono: !0 }) : null,
        u > 0 && /* @__PURE__ */ t(vn, { records: c, counted: u, onOpen: a, parent: e })
      ] })
    ] })
  ] });
}
function mn({ event: e }) {
  return /* @__PURE__ */ n("span", { className: "ahv-byline", children: [
    /* @__PURE__ */ t("span", { className: x("ahv-avatar ahv-avatar-small", e.actor_type === "system" && "ahv-avatar-system"), "aria-hidden": "true", children: xt(e.actor) }),
    [
      e.actor,
      e.actor_label,
      e.origin && A(e.origin).toUpperCase(),
      e.actor_type !== "system" && e.device,
      e.country,
      e.ip
    ].filter(Boolean).map((a, s) => /* @__PURE__ */ t("span", { className: x(s === 0 ? "ahv-strong" : "ahv-sep"), children: a }, s))
  ] });
}
function vn({ records: e, counted: a, onOpen: s, parent: r }) {
  const [l, o] = T(null);
  return /* @__PURE__ */ n("div", { className: "ahv-records", children: [
    /* @__PURE__ */ n("table", { className: "ahv-changes ahv-records-table", children: [
      /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ n("tr", { children: [
        /* @__PURE__ */ t("th", { children: "Record" }),
        /* @__PURE__ */ t("th", { children: "Change" }),
        /* @__PURE__ */ t("th", { children: "Fields" }),
        /* @__PURE__ */ t("th", { children: /* @__PURE__ */ t("span", { className: "ahv-hidden", children: "Detail" }) })
      ] }) }),
      /* @__PURE__ */ t("tbody", { children: e.map((c) => {
        const u = c.change_list ?? [], h = l === c.id;
        return /* @__PURE__ */ t(
          pn,
          {
            record: c,
            fields: u.length,
            open: h,
            onToggle: () => o(h ? null : c.id),
            onOpen: () => s(c),
            children: h && /* @__PURE__ */ t("tr", { className: "ahv-records-fields", children: /* @__PURE__ */ t("td", { colSpan: 4, children: /* @__PURE__ */ t(Je, { changes: u }) }) })
          },
          c.id
        );
      }) })
    ] }),
    a > e.length && /* @__PURE__ */ n("button", { type: "button", className: "ahv-link-button", onClick: () => s(r), children: [
      a - e.length,
      " more in the full detail"
    ] })
  ] });
}
function pn({ record: e, fields: a, open: s, onToggle: r, onOpen: l, children: o }) {
  const c = e.action === "data.created" ? "Created" : e.action === "data.deleted" ? "Deleted" : "Updated";
  return /* @__PURE__ */ n(U, { children: [
    /* @__PURE__ */ n("tr", { children: [
      /* @__PURE__ */ t("td", { children: /* @__PURE__ */ n("button", { type: "button", className: "ahv-disclose", "aria-expanded": s, disabled: !a, onClick: r, children: [
        /* @__PURE__ */ t(O, { name: "chevronRight", size: 12, className: x(s && "ahv-turned-right") }),
        e.summary.replace(/^(Created|Updated|Deleted) /, "").split(":")[0]
      ] }) }),
      /* @__PURE__ */ t("td", { children: c }),
      /* @__PURE__ */ t("td", { className: "ahv-dim", children: e.action === "data.updated" ? (e.change_list ?? []).slice(0, 3).map((u) => u.label).join(", ") + (a > 3 ? ` and ${a - 3} more` : "") : `${a} value${a === 1 ? "" : "s"}` }),
      /* @__PURE__ */ t("td", { className: "ahv-cell-end", children: /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          className: "ahv-icon-button",
          title: "Open the record's full detail",
          "aria-label": "Open the record's full detail",
          onClick: l,
          children: /* @__PURE__ */ t(O, { name: "arrowRight", size: 13 })
        }
      ) })
    ] }),
    o
  ] });
}
export {
  It as ActivityDetail,
  yn as ActivityLog,
  Nn as ActivityTimeline,
  Xa as IntegrityStatus,
  za as PanelHost
};
