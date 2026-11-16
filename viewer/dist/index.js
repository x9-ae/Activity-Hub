import { jsx as t, jsxs as s, Fragment as H } from "react/jsx-runtime";
import { useState as $, useRef as R, useEffect as V, useCallback as We, useMemo as de, useContext as Vt, createContext as Jt, useId as Kt, useLayoutEffect as Gt, Fragment as Xt } from "react";
import { createPortal as Yt } from "react-dom";
const F = (e) => "action" in e, Zt = {
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
  clock: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 6v6l4 2",
  bolt: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
  pencil: "M21.17 6.81a2.83 2.83 0 0 0-4-4L3.84 16.17a2 2 0 0 0-.5.83l-1.32 4.35a.5.5 0 0 0 .62.62l4.35-1.32a2 2 0 0 0 .83-.5zM15 5l4 4",
  scissors: "M6 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM20 4 8.12 15.88M14.47 14.48 20 20M8.12 8.12 12 12",
  checkCircle: "M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4 12 14.01l-3-3",
  xCircle: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM15 9l-6 6M9 9l6 6",
  trendUp: "M22 7 13.5 15.5 8.5 10.5 2 17M16 7h6v6",
  chart: "M3 3v18h18M8 17v-5M13 17V7M18 17v-9",
  trendDown: "M22 17 13.5 8.5 8.5 13.5 2 7M16 17h6v-6",
  key: "M2.59 18.4A2 2 0 0 0 2 19.82V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.17a2 2 0 0 0 1.42-.59l.81-.81a6.5 6.5 0 1 0-4.24-4.24zM16.5 7.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z",
  money: "M2 6h20v12H2zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 12h.01M18 12h.01",
  shield: "M20 13c0 5-3.5 7.5-7.7 9a1 1 0 0 1-.6 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.2-2.7a1.2 1.2 0 0 1 1.6 0C14.5 3.8 17 5 19 5a1 1 0 0 1 1 1z"
};
function E({ name: e, size: a = 16, ...n }) {
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
      ...n,
      children: /* @__PURE__ */ t("path", { d: Zt[e] })
    }
  );
}
function j(e, a, n) {
  const [r, i] = $({ loading: e !== null }), c = R(0), o = R(a);
  o.current = a;
  const h = We(() => {
    if (e === null) return;
    const N = ++c.current;
    i((y) => ({ ...y, loading: !0 })), o.current().then(
      (y) => N === c.current && i({ data: y, loading: !1 }),
      (y) => N === c.current && i((g) => ({ data: g.data, error: y, loading: !1 }))
    );
  }, [e]);
  V(() => {
    i({ loading: e !== null }), h();
  }, [e, h]);
  const d = !!r.error;
  return V(() => {
    if (!n || e === null || d) return;
    const N = setInterval(h, n);
    return () => clearInterval(N);
  }, [n, e, d, h]), { ...r, refresh: h };
}
const xe = 20;
function Qt(e, a, n, r, i) {
  var D;
  const c = a && JSON.stringify(a), [o, h] = $([]), [d, N] = $(!1), [y, g] = $({ loading: !1 }), m = R(c);
  m.current = c;
  const v = j(
    c,
    () => e("search", { method: "POST", body: { ...a, limit: n } }),
    r ? i : void 0
  ), b = R(0);
  V(() => {
    v.data && (b.current += 1, h([v.data]), N(!1), g({ loading: !1 }));
  }, [v.data]), V(() => {
    h([]), g({ loading: !1 });
  }, [c]);
  const p = ((D = o[o.length - 1]) == null ? void 0 : D.next_cursor) ?? null, M = We(() => {
    if (!p || y.loading || !a) return;
    g({ loading: !0 });
    const f = c, C = b.current;
    e("search", { method: "POST", body: { ...a, limit: n, cursor: p } }).then(
      (L) => {
        m.current !== f || b.current !== C || (h((T) => [...T, L].slice(-xe)), o.length >= xe && N(!0), g({ loading: !1 }));
      },
      (L) => m.current === f && b.current === C && g({ loading: !1, error: L })
    );
  }, [p, y.loading, a, c, e, n, o.length]);
  return {
    rows: o.flatMap((f) => f.items),
    trimmed: d,
    hasMore: !!p && !r,
    loading: v.loading && !o.length,
    refreshing: v.loading,
    error: v.error,
    more: y,
    loadMore: M,
    refresh: v.refresh,
    pageCount: o.length
  };
}
const I = (e) => Date.parse(`${e.slice(0, 23).replace(" ", "T")}Z`), P = (e) => e.replace(/[._]+/g, " ").trim(), he = (e) => e.charAt(0).toUpperCase() + e.slice(1), kt = 864e5, ea = [[60, "second"], [60, "minute"], [24, "hour"], [7, "day"]], ta = new Intl.RelativeTimeFormat(void 0, { numeric: "auto", style: "short" });
function Be(e, a = Date.now()) {
  let n = (I(e) - a) / 1e3;
  for (const [r, i] of ea) {
    if (Math.abs(n) < r) return ta.format(Math.round(n), i);
    n /= r;
  }
  return "";
}
const Ne = (e, a) => new Date(e).toLocaleString(void 0, { ...a, timeZone: "UTC" }), Z = (e) => Ne(e, { day: "numeric", month: "short", year: "numeric" }), te = (e) => Ne(e, { day: "numeric", month: "short" }), De = (e) => Ne(e, { hour: "2-digit", minute: "2-digit", hour12: !1 });
function aa(e, a = Date.now()) {
  const n = e.slice(0, 10);
  return n === new Date(a).toISOString().slice(0, 10) ? "Today" : n === new Date(a - kt).toISOString().slice(0, 10) ? "Yesterday" : Ne(I(`${n} 00:00:00`), { weekday: "short", day: "numeric", month: "short", year: "numeric" });
}
const ue = (e) => e.slice(11, 23);
function St(e) {
  var n, r;
  if (/^[\d#]/.test(e)) return "#";
  const a = e.split(/[\s@._-]+/).filter(Boolean);
  return ((((n = a[0]) == null ? void 0 : n[0]) ?? "?") + (((r = a[1]) == null ? void 0 : r[0]) ?? "")).toUpperCase();
}
const na = (e) => e.actor_name || (e.actor_type === "system" ? he(P(e.actor_id)) || "System" : e.actor_id || "Anonymous"), Ae = (e) => /^\d{4}-\d{2}-\d{2}$/.test(e) && !Number.isNaN(Date.parse(`${e}T00:00:00Z`)), Re = (e) => `${e} 00:00:00`, sa = (e) => `${new Date(Date.parse(`${e}T00:00:00Z`) + kt).toISOString().slice(0, 10)} 00:00:00`, la = (e, a = Date.now()) => new Date(a - e * 6e4).toISOString().slice(0, 19).replace("T", " "), ra = (e, a, n = `${a}s`) => `${e.toLocaleString()} ${e === 1 ? a : n}`, ge = 1e5, ia = [
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
], ca = [
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
async function oa(e, a, n) {
  const r = [];
  let i = null;
  do {
    const c = await e("export", { method: "POST", body: { ...a, cursor: i } });
    r.push(...c.items), n(r.length), i = c.next_cursor;
  } while (i && r.length < ge);
  return { rows: r.slice(0, ge), more: !!i || r.length > ge };
}
function da(e) {
  let a = e == null ? "" : typeof e == "object" ? JSON.stringify(e) : String(e);
  return /^[=+\-@\t\r]/.test(a) && (a = `'${a}`), /[",\n\r]/.test(a) ? `"${a.replace(/"/g, '""')}"` : a;
}
function ha(e, a) {
  const n = e === "events" ? ia : ca;
  return `\uFEFF${[n.join(","), ...a.map((i) => n.map((c) => da(i[c])).join(","))].join(`\r
`)}\r
`;
}
const ua = (e) => e.map((a) => {
  const { children: n, ...r } = a;
  return JSON.stringify(r);
}).join(`
`) + `
`;
function qe(e, a, n) {
  const r = URL.createObjectURL(new Blob([e], { type: n })), i = document.createElement("a");
  i.href = r, i.download = a, i.click(), setTimeout(() => URL.revokeObjectURL(r), 1e3);
}
const ma = /(-?)(?:([a-z_]+):)?("([^"]*)"?|\S+)/g;
function ce(e) {
  const a = [];
  for (const n of e.matchAll(ma)) {
    let r = n[3].startsWith('"') ? n[4] ?? "" : n[3], i = n[2] ?? null;
    i && r.startsWith("//") && (r = `${i}:${r}`, i = null), r && a.push({ field: i, value: r, negated: n[1] === "-", text: n[0] });
  }
  return a;
}
const va = (e, a) => ce(e).filter((n) => n !== a && n.text !== a.text).map((n) => n.text).join(" "), Pe = (e) => /\s/.test(e) ? `"${e.replace(/"/g, "")}"` : e, _t = [
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
], He = (e) => _t.filter((a) => a.kinds.includes(e)), pa = { events: ["origin", "outcome", "session"], requests: ["origin", "session"] }, fa = (e) => [...He(e).map((a) => a.field), ...pa[e]], ga = (e) => {
  var a;
  return ((a = _t.find((n) => n.field === e)) == null ? void 0 : a.label) ?? he(P(e));
};
function ba(e, a, n, r = {}) {
  const i = e.startsWith("-"), c = i ? e.slice(1) : e, o = i ? "-" : "", h = c.indexOf(":");
  if (h < 0)
    return He(a).filter((g) => g.field.startsWith(c.toLowerCase()) || g.label.toLowerCase().startsWith(c.toLowerCase())).map((g) => ({ insert: `${o}${g.field}:`, label: `${g.field}:`, hint: g.hint }));
  const d = c.slice(0, h), N = c.slice(h + 1).toLowerCase();
  return (() => {
    const g = (m) => (r[m] ?? []).filter((v) => v.value).map((v) => ({ insert: v.value, label: v.value, hint: v.count.toLocaleString() }));
    switch (d) {
      case "action":
        return Object.entries((n == null ? void 0 : n.actions) ?? {}).map(([m, v]) => ({ insert: m, label: m, hint: v.title }));
      case "category":
        return [...new Set(Object.values((n == null ? void 0 : n.actions) ?? {}).map((m) => m.category))].map((m) => ({ insert: m, label: m }));
      case "actor_type":
        return Object.entries((n == null ? void 0 : n.actor_types) ?? {}).map(([m, v]) => ({ insert: m, label: m, hint: v }));
      case "result":
        return ["success", "failed", "refused"].map((m) => ({ insert: m, label: m }));
      case "method":
        return ["GET", "POST", "PUT", "PATCH", "DELETE"].map((m) => ({ insert: m, label: m }));
      case "status":
        return ["2xx", "4xx", "5xx"].map((m) => ({ insert: m, label: m }));
      case "on":
        return Object.entries((n == null ? void 0 : n.entities) ?? {}).filter(([m]) => !m.includes("_")).map(([m, v]) => ({ insert: `${m}:`, label: `${m}:`, hint: v }));
      case "app":
        return g("origin");
      case "service":
        return g("service");
      default:
        return [];
    }
  })().filter((g) => g.insert.toLowerCase().startsWith(N) || g.insert.toLowerCase().split(/[._:]/).some((m) => m.startsWith(N)) || (g.hint ?? "").toLowerCase().split(/\s+/).some((m) => m.startsWith(N))).slice(0, 12).map((g) => ({ ...g, insert: `${o}${d}:${g.insert.endsWith(":") ? g.insert : Pe(g.insert)}` }));
}
const ye = 6e4, ne = 1440, ya = [15, 30, 60, 120, 180, 360, 720, 1440, 2880, 10080, 20160, 43200], vt = 7, Na = new Intl.NumberFormat(void 0, { notation: "compact", maximumFractionDigits: 1 });
function ka(e) {
  const a = e.bucket_minutes * ye, n = new Map(e.buckets.map((i) => [I(i.at), i.count])), r = [];
  for (let i = Math.floor(I(e.occurred_from) / a) * a; i < I(e.occurred_to); i += a)
    r.push({ at: i, count: n.get(i) ?? 0 });
  return r;
}
function Sa(e) {
  return e % ne === 0 ? e === ne ? "Daily bars" : `${e / ne}-day bars` : e % 60 === 0 ? e === 60 ? "Hourly bars" : `${e / 60}-hour bars` : `${e}-minute bars`;
}
function Le(e, a) {
  return a >= ne ? Z(e) : `${te(e)}, ${De(e)} – ${De(e + a * ye)}`;
}
function _a(e, a) {
  if (e.length < 2) return [];
  const n = (e[e.length - 1].at - e[0].at) / ye, r = ya.find((o) => o >= a && o % a === 0 && n / o <= vt) ?? a * Math.ceil(e.length / vt), i = r >= ne, c = [];
  return e.forEach((o, h) => {
    if (o.at % (r * ye) !== 0) return;
    const d = c[c.length - 1], N = !d || te(e[d.index].at) !== te(o.at);
    c.push({ index: h, top: i ? te(o.at) : De(o.at), bottom: !i && N ? te(o.at) : "" });
  }), c;
}
function Ca({ chart: e, noun: a, loading: n }) {
  const r = de(() => e ? ka(e) : [], [e]), [i, c] = $(null), o = r.reduce((v, b) => v + b.count, 0), h = r.reduce((v, b) => Math.max(v, b.count), 0), d = r.find((v) => v.count === h && h > 0), N = (e == null ? void 0 : e.bucket_minutes) ?? ne, y = de(() => _a(r, N), [r, N]), g = a.replace(/s$/, ""), m = i !== null ? r[i] : void 0;
  return /* @__PURE__ */ s("div", { className: "ahv-chart", children: [
    /* @__PURE__ */ s("div", { className: "ahv-chart-head", children: [
      /* @__PURE__ */ s("span", { children: [
        /* @__PURE__ */ t("strong", { className: "ahv-num", children: n && !e ? "…" : o.toLocaleString() }),
        " ",
        o === 1 ? g : a,
        e && /* @__PURE__ */ s("span", { className: "ahv-dim", children: [
          " · ",
          te(I(e.occurred_from)),
          " – ",
          Z(I(e.occurred_to) - 1),
          " UTC"
        ] })
      ] }),
      e && /* @__PURE__ */ s("span", { className: "ahv-dim", children: [
        d && /* @__PURE__ */ s(H, { children: [
          "Peak ",
          /* @__PURE__ */ t("strong", { className: "ahv-num", children: d.count.toLocaleString() }),
          " at ",
          Le(d.at, N).split(" – ")[0],
          " · "
        ] }),
        Sa(N)
      ] })
    ] }),
    /* @__PURE__ */ s(
      "div",
      {
        className: "ahv-chart-plot",
        role: "img",
        "aria-label": `${o.toLocaleString()} ${a}${d ? `, most at ${Le(d.at, N)} UTC (${d.count})` : ""}`,
        onMouseMove: (v) => {
          if (!r.length) return;
          const b = v.currentTarget.getBoundingClientRect();
          c(Math.min(r.length - 1, Math.max(0, Math.floor((v.clientX - b.left) / b.width * r.length))));
        },
        onMouseLeave: () => c(null),
        children: [
          h > 0 && /* @__PURE__ */ t("span", { className: "ahv-chart-max ahv-num", children: Na.format(h) }),
          /* @__PURE__ */ t("svg", { viewBox: `0 0 ${Math.max(r.length, 1)} 100`, preserveAspectRatio: "none", className: "ahv-chart-svg", children: r.map((v, b) => {
            const p = h ? Math.max(v.count / h * 100, v.count ? 2 : 0) : 0;
            return /* @__PURE__ */ t(
              "rect",
              {
                x: b + 0.12,
                width: 0.76,
                y: 100 - p,
                height: p,
                className: b === i ? "ahv-bar ahv-bar-on" : "ahv-bar"
              },
              v.at
            );
          }) }),
          !n && o === 0 && /* @__PURE__ */ s("span", { className: "ahv-chart-empty", children: [
            "No ",
            a,
            " in this period"
          ] }),
          m && /* @__PURE__ */ s("div", { className: "ahv-tip", style: { left: `${(i + 0.5) / r.length * 100}%` }, children: [
            /* @__PURE__ */ t("strong", { className: "ahv-num", children: m.count ? `${m.count.toLocaleString()} ${m.count === 1 ? g : a}` : `No ${a}` }),
            /* @__PURE__ */ s("span", { children: [
              Le(m.at, N),
              " UTC"
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ t("div", { className: "ahv-chart-axis", "aria-hidden": "true", children: y.map((v) => /* @__PURE__ */ s("span", { style: { left: `${(v.index + 0.5) / r.length * 100}%` }, children: [
      v.top,
      v.bottom && /* @__PURE__ */ t("b", { children: v.bottom })
    ] }, v.index)) })
  ] });
}
const x = (...e) => e.filter(Boolean).join(" "), Ct = (e) => F(e) ? e.actor : na(e), Ie = (e, a = {}) => F(e) ? e.actor_label : a[e.actor_type] || he(P(e.actor_type)) || "Unknown", Ue = {
  sealed: "Sealed: kept unchanged since its minute ended",
  waiting: "Waiting for its seal: each minute is sealed two minutes after it ends"
};
function wa({ value: e, seal: a }) {
  return /* @__PURE__ */ s("span", { className: "ahv-when", title: `${e} UTC`, children: [
    /* @__PURE__ */ s("span", { className: "ahv-mono", children: [
      ue(e),
      a && /* @__PURE__ */ t("span", { className: x("ahv-seal", a === "waiting" && "ahv-seal-waiting"), title: Ue[a], "aria-label": Ue[a], children: /* @__PURE__ */ t(E, { name: a === "sealed" ? "shield" : "history", size: 11 }) })
    ] }),
    /* @__PURE__ */ t("span", { className: "ahv-dim", children: Be(e) })
  ] });
}
const $a = (e) => e ? Ue[e] : "";
function Ma({ onClick: e, title: a, children: n }) {
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
      children: n
    }
  ) : /* @__PURE__ */ t(H, { children: n });
}
function Ta({ row: e, actorTypes: a, onFocus: n }) {
  const r = Ct(e), i = Ie(e, a), c = e.actor_type !== "system" && e.actor_id && e.actor_id !== r ? e.actor_id : "";
  return /* @__PURE__ */ s("span", { className: "ahv-who", children: [
    /* @__PURE__ */ t("span", { className: x("ahv-avatar", e.actor_type === "system" && "ahv-avatar-system"), "aria-hidden": "true", children: St(r) }),
    /* @__PURE__ */ s("span", { className: "ahv-stack", children: [
      /* @__PURE__ */ t(Ma, { title: `Only activity by ${r}`, onClick: e.actor_id ? n : void 0, children: /* @__PURE__ */ t("span", { className: "ahv-strong ahv-clip", children: r }) }),
      /* @__PURE__ */ t("span", { className: "ahv-dim ahv-clip", children: [i, c].filter(Boolean).join(" · ") })
    ] })
  ] });
}
function Ea({ row: e }) {
  return /* @__PURE__ */ s("span", { className: "ahv-where", children: [
    e.origin && /* @__PURE__ */ t("span", { className: "ahv-tag", children: P(e.origin) }),
    e.country && /* @__PURE__ */ t("span", { className: "ahv-dim", title: e.ip || void 0, children: e.country })
  ] });
}
function se({ outcome: e }) {
  return e === "success" ? null : /* @__PURE__ */ t("span", { className: x("ahv-tag", e === "failed" ? "ahv-tag-bad" : "ahv-tag-warn"), children: e });
}
const Oa = (e) => e >= 500 ? "ahv-tag-bad" : e >= 400 ? "ahv-tag-warn" : "ahv-tag-ok", wt = ({ status: e }) => /* @__PURE__ */ t("span", { className: x("ahv-tag ahv-mono", Oa(e)), children: e }), $t = ({ method: e }) => /* @__PURE__ */ t("span", { className: x("ahv-tag ahv-mono", `ahv-method-${e.toLowerCase()}`), children: e }), Fe = (e) => e.outcome !== "success" ? { icon: "alert", tone: "rose" } : { icon: e.icon ?? (e.category === "data" ? "layers" : "log"), tone: e.tone ?? "neutral" };
function La({ row: e }) {
  var i;
  const a = e.children_count ?? ((i = e.children) == null ? void 0 : i.length) ?? 0, { icon: n, tone: r } = Fe(e);
  return /* @__PURE__ */ s("span", { className: "ahv-what ahv-what-event", children: [
    /* @__PURE__ */ t("span", { className: `ahv-what-icon ahv-tone-${r}`, "aria-hidden": "true", children: /* @__PURE__ */ t(E, { name: n, size: 13 }) }),
    /* @__PURE__ */ s("span", { className: "ahv-what-text", children: [
      /* @__PURE__ */ s("span", { className: "ahv-what-title", children: [
        e.title,
        /* @__PURE__ */ t(se, { outcome: e.outcome }),
        e.importance === "high" && e.outcome === "success" && /* @__PURE__ */ t("span", { className: "ahv-mark", title: "Worth attention" })
      ] }),
      e.summary !== e.title && /* @__PURE__ */ t("span", { className: "ahv-sentence", children: e.summary })
    ] }),
    a > 0 && /* @__PURE__ */ s("span", { className: "ahv-what-changes", title: "Database records changed by the same request; open the row to see them", children: [
      a,
      " change",
      a === 1 ? "" : "s"
    ] })
  ] });
}
function Mt({ row: e }) {
  return /* @__PURE__ */ s("span", { className: "ahv-what", children: [
    /* @__PURE__ */ t($t, { method: e.method }),
    /* @__PURE__ */ t("span", { className: "ahv-mono ahv-clip", children: e.route }),
    /* @__PURE__ */ t(wt, { status: e.status }),
    /* @__PURE__ */ s("span", { className: "ahv-dim ahv-num", children: [
      e.duration_ms,
      " ms"
    ] })
  ] });
}
function ae({ tone: e = "plain", children: a, action: n }) {
  return /* @__PURE__ */ s("div", { className: x("ahv-message", e === "bad" && "ahv-message-bad"), role: e === "bad" ? "alert" : void 0, children: [
    /* @__PURE__ */ t("span", { children: a }),
    n
  ] });
}
function Ve({ rows: e = 6 }) {
  return /* @__PURE__ */ t("div", { className: "ahv-skeleton", "aria-busy": "true", children: Array.from({ length: e }, (a, n) => /* @__PURE__ */ t("span", {}, n)) });
}
function Tt({ facts: e }) {
  return e != null && e.length ? /* @__PURE__ */ t("span", { className: "ahv-chips-row", children: e.map((a, n) => /* @__PURE__ */ s("span", { className: "ahv-fact", children: [
    a.label && /* @__PURE__ */ t("span", { className: "ahv-dim", children: a.label }),
    /* @__PURE__ */ t("span", { className: "ahv-mono", children: a.value })
  ] }, n)) }) : null;
}
const xa = 36;
function Je({ items: e, mono: a = !1 }) {
  const n = e.filter(([, r]) => r != null && r !== "");
  return n.length ? /* @__PURE__ */ t("dl", { className: "ahv-pairs", children: n.map(([r, i], c) => {
    const o = typeof i == "object" ? JSON.stringify(i) : String(i);
    return /* @__PURE__ */ s("div", { className: x("ahv-pair-cell", o.length > xa && "ahv-pair-wide"), children: [
      /* @__PURE__ */ t("dt", { children: r }),
      /* @__PURE__ */ t("dd", { className: x(a && "ahv-mono"), children: o })
    ] }, `${r}-${c}`);
  }) }) : null;
}
function Ke({ changes: e, valueLabel: a = "Value" }) {
  if (!e.length) return null;
  const n = e.every((i) => i.before === null), r = e.every((i) => i.after === null);
  if (n || r) {
    const i = e.filter((o) => (n ? o.after : o.before) !== null), c = e.length - i.length;
    return /* @__PURE__ */ s("div", { className: "ahv-stack-gap", children: [
      a !== "Value" && /* @__PURE__ */ t("span", { className: "ahv-eyebrow", children: a }),
      /* @__PURE__ */ t(Je, { items: i.map((o) => [o.label, n ? o.after : o.before]), mono: !0 }),
      c > 0 && /* @__PURE__ */ s("span", { className: "ahv-dim ahv-small", children: [
        c,
        " empty field",
        c === 1 ? "" : "s",
        " not shown"
      ] })
    ] });
  }
  return /* @__PURE__ */ t("div", { className: "ahv-scroll-x", children: /* @__PURE__ */ s("table", { className: "ahv-changes", children: [
    /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ s("tr", { children: [
      /* @__PURE__ */ t("th", { children: "Field" }),
      /* @__PURE__ */ t("th", { children: "Before" }),
      /* @__PURE__ */ t("th", { children: "After" })
    ] }) }),
    /* @__PURE__ */ t("tbody", { children: e.map((i) => /* @__PURE__ */ s("tr", { children: [
      /* @__PURE__ */ t("td", { className: "ahv-field-name", children: i.label }),
      /* @__PURE__ */ t("td", { className: "ahv-mono ahv-before", children: i.before ?? "—" }),
      /* @__PURE__ */ t("td", { className: "ahv-mono ahv-after", children: i.after ?? "—" })
    ] }, i.field)) })
  ] }) });
}
const Da = 200, Aa = Jt(null);
function B({ title: e, children: a }) {
  return /* @__PURE__ */ s("section", { className: "ahv-section", children: [
    /* @__PURE__ */ t("h3", { children: e }),
    a
  ] });
}
const ee = Je;
function Ra({ event: e }) {
  const a = e.change_list;
  if (!(a != null && a.length)) return null;
  const n = a.every((i) => i.before === null), r = a.every((i) => i.after === null);
  return /* @__PURE__ */ t(B, { title: n ? "Recorded values" : r ? "Values removed" : "Changes", children: /* @__PURE__ */ t(Ke, { changes: a }) });
}
function qa({ text: e }) {
  const [a, n] = $(!1);
  return /* @__PURE__ */ s("button", { type: "button", className: "ahv-button ahv-button-quiet", onClick: () => {
    var r;
    (r = navigator.clipboard) == null || r.writeText(e).then(() => {
      n(!0), setTimeout(() => n(!1), 1500);
    });
  }, children: [
    /* @__PURE__ */ t(E, { name: a ? "check" : "copy", size: 14 }),
    a ? "Copied" : "Copy"
  ] });
}
function Pa({ row: e }) {
  const [a, n] = $(!1), { children: r, details: i, ...c } = e, o = JSON.stringify(c, null, 2);
  return /* @__PURE__ */ s("section", { className: "ahv-section", children: [
    /* @__PURE__ */ s("div", { className: "ahv-row-between", children: [
      /* @__PURE__ */ s("button", { type: "button", className: "ahv-disclose", "aria-expanded": a, onClick: () => n((h) => !h), children: [
        /* @__PURE__ */ t(E, { name: "chevronDown", size: 14, className: x(a && "ahv-turned") }),
        "Full record (JSON)"
      ] }),
      /* @__PURE__ */ t(qa, { text: o })
    ] }),
    a && /* @__PURE__ */ t("pre", { className: "ahv-pre", children: o })
  ] });
}
function Ia({ open: e, events: a, calls: n, onOpen: r }) {
  const i = [...a, ...n].sort((c, o) => c.occurred_at.localeCompare(o.occurred_at));
  return i.length ? /* @__PURE__ */ t("ol", { className: "ahv-list", children: i.map((c) => /* @__PURE__ */ t("li", { children: /* @__PURE__ */ s("button", { type: "button", disabled: c.id === e.id, onClick: () => r(c), children: [
    /* @__PURE__ */ t("span", { className: "ahv-mono ahv-dim", children: ue(c.occurred_at) }),
    F(c) ? /* @__PURE__ */ s("span", { className: "ahv-what", children: [
      /* @__PURE__ */ t("span", { className: "ahv-sentence", children: c.summary }),
      /* @__PURE__ */ t(se, { outcome: c.outcome })
    ] }) : /* @__PURE__ */ t(Mt, { row: c })
  ] }) }, c.id)) }) : /* @__PURE__ */ t("p", { className: "ahv-dim", children: "Nothing else was recorded for this request." });
}
function Ua(e, a) {
  const n = F(a);
  return j(`${a.id}`, async () => {
    if (n) return e(`events/${a.id}`, { method: "GET" });
    if (!a.request_id) return { same_request: [], requests: [] };
    const r = (o) => e("search", {
      method: "POST",
      body: { kind: o, filters: { request_id: a.request_id }, limit: Da }
    }), [i, c] = await Promise.all([r("events"), r("requests")]);
    return { same_request: i.items, requests: c.items.filter((o) => o.id !== a.id) };
  });
}
function Et({ request: e, row: a, onClose: n, onFocus: r, actorTypes: i, entities: c, seal: o }) {
  const [h, d] = $(a);
  V(() => d(a), [a]);
  const N = R(null), y = R(null), g = R(n);
  g.current = n;
  const m = h !== null;
  V(() => {
    var k, D;
    if (!m) return;
    const b = ((k = N.current) == null ? void 0 : k.getRootNode()) ?? document, p = b.activeElement ?? document.activeElement;
    (D = N.current) == null || D.focus();
    const M = (f) => {
      if (f.key === "Escape")
        f.stopPropagation(), g.current();
      else if (f.key === "Tab" && y.current) {
        const C = [...y.current.querySelectorAll("button:not(:disabled), [href], input, select, [tabindex]:not([tabindex='-1'])")], L = b.activeElement;
        if (!C.length) return;
        f.shiftKey && L === C[0] ? (f.preventDefault(), C[C.length - 1].focus()) : !f.shiftKey && L === C[C.length - 1] ? (f.preventDefault(), C[0].focus()) : y.current.contains(L) || (f.preventDefault(), C[0].focus());
      }
    };
    return window.addEventListener("keydown", M, !0), () => {
      var f;
      window.removeEventListener("keydown", M, !0), (f = p == null ? void 0 : p.focus) == null || f.call(p);
    };
  }, [m]);
  const v = Vt(Aa);
  return h ? Yt(
    /* @__PURE__ */ s("div", { className: "ahv ahv-drawer-layer", children: [
      /* @__PURE__ */ t("div", { className: "ahv-backdrop", onClick: n }),
      /* @__PURE__ */ s("aside", { ref: y, className: "ahv-drawer", role: "dialog", "aria-modal": "true", "aria-label": "Activity details", children: [
        /* @__PURE__ */ t("button", { ref: N, type: "button", className: "ahv-icon-button ahv-drawer-close", onClick: n, "aria-label": "Close", children: /* @__PURE__ */ t(E, { name: "close" }) }),
        /* @__PURE__ */ t(
          za,
          {
            request: e,
            row: h,
            onOpen: d,
            onFocus: r,
            actorTypes: i,
            entities: c,
            seal: h === a ? o : null
          },
          h.id
        )
      ] })
    ] }),
    v ?? document.body
  ) : null;
}
function za({ request: e, row: a, onOpen: n, onFocus: r, actorTypes: i, entities: c = {}, seal: o }) {
  var m, v, b, p;
  const h = Ua(e, a), d = F(a) ? ((m = h.data) == null ? void 0 : m.event) ?? a : null, N = Ct(a), y = d != null && d.target_type ? `${c[d.target_type] ?? P(d.target_type)} ${d.target_name || d.target_id}` : "", g = `${Z(I(a.occurred_at))}, ${ue(a.occurred_at)} UTC`;
  return /* @__PURE__ */ s("div", { className: "ahv-drawer-body", children: [
    /* @__PURE__ */ s("header", { className: "ahv-drawer-head", children: [
      d ? /* @__PURE__ */ s(H, { children: [
        /* @__PURE__ */ s("div", { className: "ahv-tags", children: [
          /* @__PURE__ */ t("span", { className: "ahv-tag", children: d.title }),
          /* @__PURE__ */ t(se, { outcome: d.outcome }),
          d.importance === "high" && /* @__PURE__ */ t("span", { className: "ahv-tag ahv-tag-accent", children: "Worth attention" }),
          d.imported && /* @__PURE__ */ t("span", { className: "ahv-tag", children: "Imported" })
        ] }),
        /* @__PURE__ */ t("h2", { children: d.summary }),
        /* @__PURE__ */ t(Tt, { facts: d.facts })
      ] }) : /* @__PURE__ */ s(H, { children: [
        /* @__PURE__ */ s("div", { className: "ahv-tags", children: [
          /* @__PURE__ */ t($t, { method: a.method }),
          /* @__PURE__ */ t(wt, { status: a.status })
        ] }),
        /* @__PURE__ */ t("h2", { className: "ahv-mono", children: a.route })
      ] }),
      /* @__PURE__ */ s("p", { className: "ahv-dim", children: [
        N,
        " · ",
        Ie(a, i),
        " · ",
        g
      ] }),
      r && /* @__PURE__ */ s("div", { className: "ahv-actions", children: [
        a.actor_id && /* @__PURE__ */ s("button", { type: "button", className: "ahv-button", onClick: () => r({ actor_id: a.actor_id }), children: [
          /* @__PURE__ */ t(E, { name: "user", size: 14 }),
          "All by ",
          N
        ] }),
        (d == null ? void 0 : d.target_type) && /* @__PURE__ */ s(
          "button",
          {
            type: "button",
            className: "ahv-button",
            onClick: () => r({ target_type: d.target_type, target_id: d.target_id }),
            children: [
              /* @__PURE__ */ t(E, { name: "history", size: 14 }),
              "Timeline of ",
              y
            ]
          }
        )
      ] })
    ] }),
    d ? /* @__PURE__ */ s(H, { children: [
      d.outcome !== "success" && d.reason && /* @__PURE__ */ t(B, { title: "Reason", children: /* @__PURE__ */ t("p", { children: d.reason }) }),
      /* @__PURE__ */ t(Ra, { event: d }),
      (v = d.details) != null && v.length ? /* @__PURE__ */ t(B, { title: "Details", children: /* @__PURE__ */ t(ee, { items: d.details.map((M) => [M.label, M.value]) }) }) : d.metadata && !h.loading ? /* @__PURE__ */ t(B, { title: "Details", children: /* @__PURE__ */ t(ee, { items: Object.entries(d.metadata).map(([M, k]) => [he(P(M)), k]) }) }) : null,
      (y || d.related.length > 0) && /* @__PURE__ */ t(B, { title: "Concerns", children: /* @__PURE__ */ t(ee, { items: [
        ["Target", y],
        ...d.related.map(([M, k]) => [he(c[M] ?? P(M)), k])
      ] }) })
    ] }) : /* @__PURE__ */ s(H, { children: [
      /* @__PURE__ */ t(B, { title: "Request", children: /* @__PURE__ */ t(ee, { items: [["Path", a.path], ["Took", `${a.duration_ms} ms`], ["Service", P(a.service)]] }) }),
      a.request_body && /* @__PURE__ */ t(B, { title: "Sent (secrets masked)", children: /* @__PURE__ */ t("pre", { className: "ahv-pre", children: JSON.stringify(a.request_body, null, 2) }) })
    ] }),
    a.request_id && /* @__PURE__ */ t(B, { title: "Same request", children: h.error ? /* @__PURE__ */ s(ae, { tone: "bad", action: /* @__PURE__ */ t("button", { type: "button", className: "ahv-button", onClick: h.refresh, children: "Retry" }), children: [
      "Couldn't load: ",
      h.error.message
    ] }) : h.loading && !h.data ? /* @__PURE__ */ t(Ve, { rows: 2 }) : /* @__PURE__ */ t(Ia, { open: a, events: ((b = h.data) == null ? void 0 : b.same_request) ?? [], calls: ((p = h.data) == null ? void 0 : p.requests) ?? [], onOpen: n }) }),
    /* @__PURE__ */ t(B, { title: "Who and from where", children: /* @__PURE__ */ t(ee, { items: [
      ["Who", `${N} (${Ie(a, i)}${a.actor_id && a.actor_id !== N ? ` ${a.actor_id}` : ""})`],
      ["App", a.origin && P(a.origin)],
      ["Country", a.country],
      ["IP address", a.ip],
      ["Device", d ? d.device : a.user_agent],
      ["Session", a.session_id],
      ["Company", a.tenant_id],
      ["Service", P(a.service)]
    ] }) }),
    /* @__PURE__ */ t(B, { title: "Reference", children: /* @__PURE__ */ t(ee, { items: [
      ["Record id", a.id],
      ["Request id", a.request_id],
      ["Recorded", `${a.received_at} UTC`],
      ["Integrity", $a(o ?? null)],
      ...d ? [["Action", d.action]] : []
    ] }) }),
    /* @__PURE__ */ t(Pa, { row: d ?? a })
  ] });
}
const ja = 65, ze = { events: "Events", access_logs: "Requests" }, Wa = 20, Ba = (e, a = Date.now()) => (a - Date.parse(`${e.replace(" ", "T")}:00Z`)) / 6e4, Ha = () => new Date(Date.now() - 864e5).toISOString().slice(0, 10);
function Fa(e, a, n) {
  var i;
  const r = (i = n == null ? void 0 : n.sealed_until) == null ? void 0 : i[a];
  return r ? e.slice(0, 16) <= r ? "sealed" : "waiting" : null;
}
function Va({ request: e, status: a }) {
  var C, L;
  const [n, r] = $(!1), [i, c] = $(Ha), [o, h] = $(!1), [d, N] = $(null), y = R(null), g = j(
    a != null && a.checks ? "integrity" : null,
    () => e("integrity", { method: "GET" })
  ), m = !!(a != null && a.checks && ((C = g.data) != null && C.allowed));
  if (!a) return null;
  const v = Object.entries(a.sealed_until ?? {}), b = a.last_daily, p = (L = a.stats) == null ? void 0 : L.queued;
  if (!v.length && a.recording === void 0 && !b) return null;
  const M = async (T) => {
    h(!0);
    try {
      N(await T());
    } catch (u) {
      N({ kind: "error", message: u.message });
    } finally {
      h(!1);
    }
  }, k = () => M(async () => ({ kind: "day", ...await e("integrity/verify", { method: "POST", body: { day: i } }) })), D = () => M(async () => {
    const T = await e(`integrity/seal/${i}`, { method: "GET" });
    return qe(`${JSON.stringify(T, null, 2)}
`, `activity-seal-${i}.json`, "application/json"), { kind: "downloaded", day: i };
  }), f = (T) => M(async () => {
    let u;
    try {
      u = JSON.parse(await T.text());
    } catch {
      u = {};
    }
    if (!u || !Array.isArray(u.seals) || !u.seals.length)
      throw new Error(`${T.name} is not a seal record: choose a proof downloaded here (activity-seal-<day>.json)`);
    const S = await e("integrity/check", { method: "POST", body: { record: u } });
    return { kind: "proof", name: T.name, day: String(u.day ?? ""), ...S };
  });
  return /* @__PURE__ */ s("div", { className: "ahv-status-wrap", children: [
    /* @__PURE__ */ s("div", { className: "ahv-status", role: "status", children: [
      (() => {
        const T = v.map(([, W]) => W).sort()[0], u = v.some(([, W]) => Ba(W) > ja), S = [
          ...v.map(([W, X]) => `${ze[W] ?? W} sealed through ${X} UTC`),
          p !== void 0 && `${p.toLocaleString()} waiting to be written`,
          b && `Check of ${b.day}: ${b.ok === !1 ? `${b.problems ?? ""} problem(s)`.trim() : b.ok ? "intact" : "not checked"}`
        ].filter(Boolean).join(`
`), q = T != null && T.startsWith((/* @__PURE__ */ new Date()).toISOString().slice(0, 10)) ? T.slice(11, 16) : T;
        return T && /* @__PURE__ */ s("span", { className: x("ahv-seal-chip", u ? "ahv-warn" : "ahv-ok"), title: S, children: [
          /* @__PURE__ */ t(E, { name: u ? "alert" : "shield", size: 14 }),
          u ? "Sealing is behind, last sealed" : "Sealed up to",
          " ",
          /* @__PURE__ */ t("strong", { className: "ahv-num", children: q }),
          " UTC"
        ] });
      })(),
      a.recording === !1 && /* @__PURE__ */ t("span", { className: "ahv-tag ahv-tag-bad", children: "Not recording" }),
      !!p && /* @__PURE__ */ s("span", { className: "ahv-dim", children: [
        p.toLocaleString(),
        " waiting to be written"
      ] }),
      (b == null ? void 0 : b.ok) === !1 && /* @__PURE__ */ s("span", { className: "ahv-tag ahv-tag-bad", children: [
        "Check of ",
        b.day,
        ": ",
        b.problems ?? "",
        " problem(s)"
      ] }),
      m && /* @__PURE__ */ s(
        "button",
        {
          type: "button",
          className: "ahv-button ahv-button-small ahv-push-right",
          "aria-expanded": n,
          onClick: () => r((T) => !T),
          title: "Prove that no record was changed or removed since it was sealed",
          children: [
            /* @__PURE__ */ t(E, { name: "check", size: 13 }),
            "Verify"
          ]
        }
      )
    ] }),
    n && m && /* @__PURE__ */ s("div", { className: "ahv-checks", children: [
      /* @__PURE__ */ s("div", { className: "ahv-bar", children: [
        /* @__PURE__ */ s("label", { className: "ahv-field", children: [
          /* @__PURE__ */ t("span", { children: "Day (UTC)" }),
          /* @__PURE__ */ t(
            "input",
            {
              type: "date",
              className: "ahv-input",
              value: i,
              max: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
              min: "2000-01-01",
              onChange: (T) => c(T.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ s("button", { type: "button", className: "ahv-button ahv-button-main", disabled: o || !i, onClick: k, children: [
          /* @__PURE__ */ t(E, { name: "shield", size: 14 }),
          o ? "Checking…" : "Check this day"
        ] }),
        /* @__PURE__ */ s(
          "button",
          {
            type: "button",
            className: "ahv-button",
            disabled: o || !i,
            onClick: D,
            title: "The day's last seal of each table, to keep outside the database",
            children: [
              /* @__PURE__ */ t(E, { name: "download", size: 14 }),
              "Download proof"
            ]
          }
        ),
        /* @__PURE__ */ s(
          "button",
          {
            type: "button",
            className: "ahv-button",
            disabled: o,
            title: "Compare a proof kept earlier with the database",
            onClick: () => {
              var T;
              return (T = y.current) == null ? void 0 : T.click();
            },
            children: [
              /* @__PURE__ */ t(E, { name: "check", size: 14 }),
              "Check a kept proof"
            ]
          }
        ),
        /* @__PURE__ */ t(
          "input",
          {
            ref: y,
            type: "file",
            accept: "application/json,.json",
            className: "ahv-hidden",
            tabIndex: -1,
            "aria-hidden": "true",
            onChange: (T) => {
              var S;
              const u = (S = T.target.files) == null ? void 0 : S[0];
              T.target.value = "", u && f(u);
            }
          }
        )
      ] }),
      d && /* @__PURE__ */ t(Ja, { verdict: d })
    ] })
  ] });
}
function Ja({ verdict: e }) {
  return e.kind === "error" ? /* @__PURE__ */ t("p", { className: "ahv-bad", role: "alert", children: e.message }) : e.kind === "day" ? /* @__PURE__ */ s("div", { role: "status", className: x("ahv-verdict", e.ok ? "ahv-verdict-ok" : "ahv-verdict-bad"), children: [
    /* @__PURE__ */ t("strong", { children: e.ok ? `${e.day}: intact. ${e.rows.toLocaleString()} records in ${e.checked.toLocaleString()} sealed minutes match their seals.` : `${e.day}: ${(e.problems.length + e.more).toLocaleString()} problem(s) found.` }),
    !e.ok && /* @__PURE__ */ s("ul", { children: [
      e.problems.slice(0, Wa).map((a, n) => /* @__PURE__ */ s("li", { children: [
        /* @__PURE__ */ t("span", { className: "ahv-mono", children: a.window_start }),
        " ",
        ze[a.table] ?? a.table,
        ": ",
        a.problem
      ] }, n)),
      e.more > 0 && /* @__PURE__ */ s("li", { className: "ahv-dim", children: [
        "and ",
        e.more.toLocaleString(),
        " more"
      ] })
    ] })
  ] }) : e.kind === "downloaded" ? /* @__PURE__ */ t("div", { role: "status", className: "ahv-verdict ahv-verdict-ok", children: /* @__PURE__ */ s("strong", { children: [
    "Proof of ",
    e.day,
    " downloaded. Keep it outside this system: checking it later shows any rewrite since."
  ] }) }) : e.mismatches.length ? /* @__PURE__ */ s("div", { role: "status", className: "ahv-verdict ahv-verdict-bad", children: [
    /* @__PURE__ */ s("strong", { children: [
      e.name,
      ": the database no longer matches this proof of ",
      e.day,
      "."
    ] }),
    /* @__PURE__ */ t("ul", { children: e.mismatches.map((a, n) => /* @__PURE__ */ s("li", { children: [
      /* @__PURE__ */ t("span", { className: "ahv-mono", children: a.window_start }),
      " ",
      ze[a.table] ?? a.table,
      ": ",
      a.problem
    ] }, n)) })
  ] }) : /* @__PURE__ */ t("div", { role: "status", className: "ahv-verdict ahv-verdict-ok", children: /* @__PURE__ */ s("strong", { children: [
    e.name,
    ": the database still matches this proof of ",
    e.day,
    "."
  ] }) });
}
function pt(e, a) {
  const n = e.lastIndexOf(" ", a - 1) + 1, r = e.indexOf(" ", a);
  return { start: n, end: r < 0 ? e.length : r, word: e.slice(n, r < 0 ? e.length : r) };
}
function Ka({ value: e, onChange: a, onSubmit: n, suggestions: r, placeholder: i, inputRef: c }) {
  const o = R(null), h = c ?? o, d = Kt(), [N, y] = $(0), [g, m] = $(!1), [v, b] = $(0), [p, M] = $(!1), { start: k, end: D, word: f } = pt(e, N), C = g ? r(f) : [], L = C[Math.min(v, C.length - 1)], T = (u) => {
    const S = e.slice(D), q = u.insert.endsWith(":") ? "" : " ", W = `${e.slice(0, k)}${u.insert}${S.startsWith(" ") || !q ? "" : q}${S}`, X = k + u.insert.length + (u.insert.endsWith(":") ? 0 : 1);
    a(W), b(0), M(!1), requestAnimationFrame(() => {
      var U, me;
      (U = h.current) == null || U.focus(), (me = h.current) == null || me.setSelectionRange(X, X), y(X);
    });
  };
  return /* @__PURE__ */ s("div", { className: "ahv-search", children: [
    /* @__PURE__ */ s("span", { className: "ahv-input-icon", children: [
      /* @__PURE__ */ t(E, { name: "search", size: 14 }),
      /* @__PURE__ */ t(
        "input",
        {
          ref: h,
          className: "ahv-input",
          role: "combobox",
          "aria-label": "Search",
          "aria-expanded": C.length > 0,
          "aria-controls": d,
          "aria-autocomplete": "list",
          "aria-activedescendant": C.length && p ? `${d}-${C.indexOf(L)}` : void 0,
          value: e,
          placeholder: i,
          spellCheck: !1,
          onChange: (u) => {
            a(u.target.value), y(u.target.selectionStart ?? u.target.value.length), m(!0), b(0), M(!1);
          },
          onSelect: (u) => {
            const S = u.currentTarget.selectionStart ?? 0;
            pt(e, S).start !== k && M(!1), y(S);
          },
          onFocus: () => m(!0),
          onBlur: () => setTimeout(() => {
            m(!1), M(!1);
          }, 120),
          onKeyDown: (u) => {
            C.length && (u.key === "ArrowDown" || u.key === "ArrowUp") ? (u.preventDefault(), b((S) => p ? (S + (u.key === "ArrowDown" ? 1 : C.length - 1)) % C.length : u.key === "ArrowDown" ? 0 : C.length - 1), M(!0)) : C.length && p && u.key === "Enter" ? (u.preventDefault(), T(L)) : u.key === "Escape" ? (m(!1), M(!1)) : u.key === "Enter" && (m(!1), n());
          }
        }
      )
    ] }),
    C.length > 0 && /* @__PURE__ */ t("ul", { id: d, role: "listbox", className: "ahv-suggest", children: C.map((u, S) => /* @__PURE__ */ s(
      "li",
      {
        id: `${d}-${S}`,
        role: "option",
        "aria-selected": p && u === L,
        className: x(p && u === L && "ahv-suggest-on"),
        onMouseDown: (q) => {
          q.preventDefault(), T(u);
        },
        onMouseEnter: () => {
          b(S), M(!0);
        },
        children: [
          /* @__PURE__ */ t("span", { className: "ahv-mono", children: u.label }),
          u.hint && /* @__PURE__ */ t("span", { className: "ahv-dim", children: u.hint })
        ]
      },
      u.insert
    )) })
  ] });
}
function Ge({ label: e, icon: a, children: n, open: r, setOpen: i, badge: c, disabled: o }) {
  const h = R(null), d = R(null), [N, y] = $(!1);
  return Gt(() => {
    if (!r) return y(!1);
    d.current && d.current.getBoundingClientRect().left < 8 && y(!0);
  }, [r]), V(() => {
    if (!r) return;
    const g = (v) => {
      h.current && !v.composedPath().includes(h.current) && i(!1);
    }, m = (v) => v.key === "Escape" && i(!1);
    return document.addEventListener("mousedown", g), document.addEventListener("keydown", m), () => {
      document.removeEventListener("mousedown", g), document.removeEventListener("keydown", m);
    };
  }, [r, i]), /* @__PURE__ */ s("div", { className: "ahv-menu", ref: h, children: [
    /* @__PURE__ */ s("button", { type: "button", className: "ahv-button", "aria-expanded": r, disabled: o, onClick: () => i(!r), children: [
      /* @__PURE__ */ t(E, { name: a, size: 14 }),
      e,
      c && /* @__PURE__ */ t("span", { className: "ahv-count", children: c }),
      /* @__PURE__ */ t(E, { name: "chevronDown", size: 14 })
    ] }),
    r && /* @__PURE__ */ t("div", { ref: d, className: x("ahv-menu-list ahv-menu-panel", N && "ahv-menu-from-start"), children: n })
  ] });
}
function Ga({ columns: e, shown: a, onChange: n }) {
  const [r, i] = $(!1);
  return /* @__PURE__ */ s(Ge, { label: "Columns", icon: "sliders", open: r, setOpen: i, children: [
    /* @__PURE__ */ t("p", { className: "ahv-dim ahv-small", children: "When, who and what always show." }),
    e.map((c) => /* @__PURE__ */ s("label", { className: "ahv-check", children: [
      /* @__PURE__ */ t(
        "input",
        {
          type: "checkbox",
          checked: a.includes(c.key),
          onChange: (o) => n(o.target.checked ? [...a, c.key] : a.filter((h) => h !== c.key))
        }
      ),
      c.label
    ] }, c.key))
  ] });
}
function Xa({ request: e, current: a, onOpen: n }) {
  var D;
  const [r, i] = $(!1), c = j("views", () => e("views", { method: "GET" })), [o, h] = $(""), [d, N] = $(!1), [y, g] = $(!1), [m, v] = $(null);
  if (!((D = c.data) != null && D.enabled)) return null;
  const b = c.data.views, p = b.find((f) => f.search === a), M = async (f) => {
    g(!0), v(null);
    try {
      await f(), c.refresh(), h("");
    } catch (C) {
      v(C.message);
    } finally {
      g(!1);
    }
  }, k = (f, C = o, L = d) => M(() => e("views", { method: "POST", body: { id: f, name: C.trim(), search: a, shared: L } }));
  return /* @__PURE__ */ s(Ge, { label: p ? p.name : "Views", icon: "layers", open: r, setOpen: i, children: [
    b.length ? /* @__PURE__ */ t("ul", { className: "ahv-views", children: b.map((f) => /* @__PURE__ */ s("li", { className: x(f === p && "ahv-views-on"), children: [
      /* @__PURE__ */ s("button", { type: "button", className: "ahv-views-open", onClick: () => {
        n(f.search), i(!1);
      }, children: [
        /* @__PURE__ */ t("span", { children: f.name }),
        /* @__PURE__ */ t("span", { className: "ahv-dim ahv-small", children: f.mine ? f.shared ? "Shared by you" : "Only you" : `Shared by ${f.owner_name}` })
      ] }),
      f.mine && /* @__PURE__ */ s("span", { className: "ahv-views-tools", children: [
        f.search !== a && /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            className: "ahv-icon-button",
            title: "Save the current search into this view",
            disabled: y,
            onClick: () => k(f.id, f.name, f.shared),
            children: /* @__PURE__ */ t(E, { name: "refresh", size: 14 })
          }
        ),
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            className: "ahv-icon-button",
            title: "Remove this view",
            disabled: y,
            onClick: () => M(() => e(`views/${f.id}`, { method: "DELETE" })),
            children: /* @__PURE__ */ t(E, { name: "close", size: 14 })
          }
        )
      ] })
    ] }, f.id)) }) : /* @__PURE__ */ t("p", { className: "ahv-dim ahv-small", children: "No saved views yet. Save the current search to come back to it." }),
    /* @__PURE__ */ s("form", { className: "ahv-views-save", onSubmit: (f) => {
      f.preventDefault(), o.trim() && k();
    }, children: [
      /* @__PURE__ */ t(
        "input",
        {
          className: "ahv-input",
          value: o,
          maxLength: 80,
          placeholder: "Name this search",
          "aria-label": "View name",
          onChange: (f) => h(f.target.value)
        }
      ),
      /* @__PURE__ */ s("label", { className: "ahv-check", children: [
        /* @__PURE__ */ t("input", { type: "checkbox", checked: d, onChange: (f) => N(f.target.checked) }),
        "Share with my team"
      ] }),
      /* @__PURE__ */ t("button", { type: "submit", className: "ahv-button ahv-button-main", disabled: y || !o.trim(), children: "Save view" }),
      m && /* @__PURE__ */ t("span", { className: "ahv-bad ahv-small", children: m })
    ] })
  ] });
}
const ft = [
  { value: "important", label: "Important", hint: "What people did, without the details behind it" },
  { value: "all", label: "All", hint: "Every record, each request's row changes inside its event" },
  { value: "problems", label: "Problems", hint: "Only what failed or was refused" }
], Ya = [
  { label: "All requests", search: {} },
  { label: "Changes only", search: { filters: { method: ["POST", "PUT", "PATCH", "DELETE"] } } },
  { label: "Errors", search: { status_from: 400 } }
], je = [
  { value: "1h", label: "Last hour", minutes: 60 },
  { value: "24h", label: "Last 24 hours", minutes: 1440 },
  { value: "7d", label: "Last 7 days", minutes: 10080 },
  { value: "30d", label: "Last 30 days", minutes: 43200 },
  { value: "all", label: "All time" },
  { value: "custom", label: "Dates…" }
], gt = {
  events: [
    { key: "where", label: "Where" },
    { key: "concerning", label: "Concerning" },
    { key: "result", label: "Result" },
    { key: "service", label: "Service" },
    { key: "ip", label: "IP address" }
  ],
  requests: [{ key: "where", label: "Where" }, { key: "service", label: "Service" }, { key: "ip", label: "IP address" }]
}, bt = ["where"], Za = [], Ot = "activity-hub-columns", Lt = "activity-hub-chart", be = ["kind", "view", "p", "q", "range", "from", "to", "cols"], oe = (e) => e ? "all" : "7d";
function yt(e, a) {
  const n = (c) => {
    const o = e.get(c) ?? "";
    return Ae(o) ? o : "";
  }, r = n("from"), i = n("to");
  return { q: e.get("q") ?? "", from: r, to: i, range: e.get("range") || (r || i ? "custom" : oe(a)) };
}
function Qa(e) {
  var n;
  if (e.range === "custom")
    return { occurred_from: Ae(e.from) ? Re(e.from) : void 0, occurred_to: Ae(e.to) ? sa(e.to) : void 0 };
  const a = (n = je.find((r) => r.value === e.range)) == null ? void 0 : n.minutes;
  return a ? { occurred_from: `${la(a).slice(0, 16)}:00` } : {};
}
function en(e, a, n, r, i) {
  const c = { ...(n == null ? void 0 : n.search.filters) ?? {} }, o = { kind: e, filters: c, query: r.q.trim() || void 0, ...Qa(r) };
  return e === "events" ? (o.view = a, o.action = n == null ? void 0 : n.search.action, i && Object.assign(o, { related_type: i.type, related_id: i.id })) : (o.status_from = n == null ? void 0 : n.search.status_from, i && (c.actor_id = i.id)), o;
}
const tn = (e) => {
  const a = new URLSearchParams();
  return e.forEach((n, r) => be.includes(r) && a.set(r, n)), a.toString();
};
function an() {
  try {
    return localStorage.getItem(Lt) === "hidden";
  } catch {
    return !1;
  }
}
function nn() {
  try {
    return JSON.parse(localStorage.getItem(Ot) ?? "null") ?? bt;
  } catch {
    return bt;
  }
}
function un({
  request: e,
  title: a = "Activity Log",
  description: n,
  presets: r = Za,
  kinds: i = ["events", "requests"],
  entity: c,
  params: o,
  onParamsChange: h,
  canExport: d = !1,
  showStatus: N = !0,
  pageSize: y = 100,
  liveEveryMs: g = 5e3,
  className: m
}) {
  var ot, dt, ht, ut, mt;
  const [v, b] = $(() => new URLSearchParams()), p = o ?? v, M = We((l) => h ? h(l) : b(l), [h]), k = p.get("kind") === "requests" && i.includes("requests") ? "requests" : i[0], D = ((ot = ft.find((l) => l.value === p.get("view"))) == null ? void 0 : ot.value) ?? "important", f = de(() => k === "events" ? [{ label: "Everything", search: {} }, ...r] : Ya, [k, r]), C = Math.min(Math.max(Number(p.get("p")) || 0, 0), f.length - 1), L = p.has("cols") ? (p.get("cols") || "").split(",").filter(Boolean) : nn(), T = gt[k].filter((l) => L.includes(l.key)), u = de(() => yt(p, c), [p, c]), [S, q] = $(u), [W, X] = $(p.toString());
  W !== p.toString() && (X(p.toString()), q(u));
  const [U, me] = $(!1), [ke, ve] = $(null), [Se, _e] = $(null), [Dt, Xe] = $(!1), [Ye, Ce] = $(null), Ze = R(null), [, At] = $(0);
  V(() => {
    const l = setInterval(() => At((_) => _ + 1), 3e4);
    return () => clearInterval(l);
  }, []);
  const J = de(
    () => en(k, D, f[C], u, c),
    [k, D, f, C, u, c]
  ), pe = JSON.stringify(J), A = Qt(e, J, y, U, g), we = R(null), [Q, Rt] = $(an), qt = () => {
    const l = !Q;
    try {
      localStorage.setItem(Lt, l ? "hidden" : "shown");
    } catch {
    }
    Rt(l);
  }, le = j(Q ? null : pe, () => {
    var O;
    const l = pe, _ = !J.occurred_from && ((O = we.current) == null ? void 0 : O.key) === l;
    return e("chart", { method: "POST", body: _ ? { ...J, occurred_from: we.current.from } : J }).then((w) => (J.occurred_from || (we.current = { key: l, from: w.occurred_from }), w));
  }, U ? g : void 0), re = j("catalog", () => e("catalog", { method: "GET" })), Qe = j(N ? "status" : null, () => e("status", { method: "GET" }), 6e4), et = (l) => Fa(l.received_at, F(l) ? "events" : "access_logs", Qe.data), tt = (l) => () => e("values", { method: "POST", body: { ...J, field: l } }).then((_) => _.values), Pt = j(`${pe}|service`, tt("service")), It = j(`${pe}|origin`, tt("origin")), at = (l = {}) => {
    const _ = new URLSearchParams(p);
    for (const Oe of be) _.delete(Oe);
    const O = l.kind ?? k;
    let w = l.draft ?? S;
    if (O !== k) {
      const Oe = new Set(fa(O));
      w = { ...w, q: ce(w.q).filter((fe) => !fe.field || Oe.has(fe.field)).map((fe) => fe.text).join(" ") };
    }
    O !== i[0] && _.set("kind", O), (l.view ?? D) !== "important" && _.set("view", l.view ?? D);
    const Y = l.preset ?? (l.kind && l.kind !== k ? 0 : C);
    return Y && _.set("p", String(Y)), w.q.trim() && _.set("q", w.q.trim()), w.range !== oe(c) && _.set("range", w.range), w.range === "custom" && (w.from && _.set("from", w.from), w.to && _.set("to", w.to)), (l.columns || p.has("cols")) && _.set("cols", (l.columns ?? L).join(",")), _;
  }, z = (l = {}) => {
    l.draft && q(l.draft), M(at(l));
  }, Ut = (l) => {
    try {
      localStorage.setItem(Ot, JSON.stringify(l));
    } catch {
    }
    z({ draft: u, columns: l });
  }, zt = (l, _) => {
    const O = ce(u.q).filter((w) => w.field !== l).map((w) => w.text);
    z({ draft: { ...u, q: [...O, `${l}:${Pe(_)}`].join(" ") } });
  }, nt = (l) => {
    ve(null), l.actor_id ? zt("actor", l.actor_id) : l.target_type && l.target_id && z({
      kind: "events",
      view: "all",
      preset: 0,
      draft: { q: `on:${l.target_type}:${Pe(l.target_id)}`, range: "all", from: "", to: "" }
    });
  }, jt = (l) => {
    const _ = S.q.trim();
    q({ ...S, q: `${_ ? `${_} ` : ""}${l}:` }), requestAnimationFrame(() => {
      const O = Ze.current;
      O && (O.focus(), O.setSelectionRange(O.value.length, O.value.length));
    });
  }, Wt = S.q.trim() !== u.q.trim() || S.range !== u.range || S.from !== u.from || S.to !== u.to, ie = !!(S.range === "custom" && S.from && S.to && S.to < S.from), $e = R(null), st = R(null), { hasMore: lt, loadMore: Me, more: K, pageCount: rt } = A;
  V(() => {
    if (!$e.current || !lt || K.loading || K.error || rt >= xe) return;
    const l = new IntersectionObserver(([_]) => _.isIntersecting && Me(), { root: st.current, rootMargin: "240px" });
    return l.observe($e.current), () => l.disconnect();
  }, [lt, Me, K.loading, K.error, rt, A.rows.length]);
  const it = async (l) => {
    Xe(!1), _e(0);
    try {
      const { rows: _, more: O } = await oa(e, J, _e);
      O && Ce(`Only the newest ${ge.toLocaleString()} rows were exported. Narrow the dates for the rest.`);
      const w = (/* @__PURE__ */ new Date()).toISOString().slice(0, 16).replace(/[-:T]/g, ""), Y = `activity-${c ? `${c.type}-${c.id}-` : ""}${k}-${w}`;
      l === "csv" ? qe(ha(k, _), `${Y}.csv`, "text/csv;charset=utf-8") : qe(ua(_), `${Y}.jsonl`, "application/x-ndjson");
    } catch (_) {
      Ce(`Export failed: ${_.message}`);
    } finally {
      _e(null);
    }
  }, Te = k === "events" ? "events" : "requests", Ee = ((dt = re.data) == null ? void 0 : dt.actor_types) ?? {}, ct = ((ht = re.data) == null ? void 0 : ht.entities) ?? {}, Bt = (l) => {
    var _, O;
    if (l.field === "action") return ((O = (_ = re.data) == null ? void 0 : _.actions[l.value]) == null ? void 0 : O.title) ?? l.value;
    if (l.field === "actor_type") return Ee[l.value] ?? l.value;
    if (l.field === "on") {
      const [w, ...Y] = l.value.split(":");
      return `${ct[w] ?? P(w)} ${Y.join(":")}`;
    }
    return l.value;
  }, G = A.rows, Ht = { service: Pt.data ?? [], origin: It.data ?? [] }, Ft = 3 + T.length;
  return c && !(c.type && c.id) ? /* @__PURE__ */ t("div", { className: x("ahv ahv-log", m), children: /* @__PURE__ */ s(ae, { children: [
    "Nothing to show: no ",
    c.type || "record",
    " chosen."
  ] }) }) : /* @__PURE__ */ s("div", { className: x("ahv ahv-log", m), children: [
    /* @__PURE__ */ s("header", { className: "ahv-head", children: [
      /* @__PURE__ */ s("div", { children: [
        /* @__PURE__ */ s("h2", { className: "ahv-title", children: [
          /* @__PURE__ */ t(E, { name: "log", size: 18 }),
          c && a === "Activity Log" ? "Activity" : a
        ] }),
        /* @__PURE__ */ t("p", { className: "ahv-dim", children: n ?? (c ? `Everything about ${c.label}, and the API requests it made itself. Times are UTC.` : "Every action and API request, kept permanently and sealed. Times are UTC.") })
      ] }),
      /* @__PURE__ */ s("div", { className: "ahv-actions", children: [
        !c && /* @__PURE__ */ t(
          Xa,
          {
            request: e,
            current: tn(at({ draft: u })),
            onOpen: (l) => {
              const _ = new URLSearchParams(p);
              for (const O of be) _.delete(O);
              new URLSearchParams(l).forEach((O, w) => be.includes(w) && _.set(w, O)), M(_);
            }
          }
        ),
        /* @__PURE__ */ t(Ga, { columns: gt[k], shown: L, onChange: Ut }),
        /* @__PURE__ */ s(
          "button",
          {
            type: "button",
            className: "ahv-button",
            "aria-pressed": !Q,
            onClick: qt,
            title: Q ? "Show the activity chart" : "Hide the activity chart",
            children: [
              /* @__PURE__ */ t(E, { name: "chart", size: 14 }),
              Q ? "Show chart" : "Hide chart"
            ]
          }
        ),
        d && /* @__PURE__ */ s(
          Ge,
          {
            label: Se === null ? "Export" : `Exporting… ${Se.toLocaleString()}`,
            icon: "download",
            open: Dt,
            setOpen: Xe,
            disabled: Se !== null || !G.length,
            children: [
              /* @__PURE__ */ t("button", { type: "button", role: "menuitem", onClick: () => it("csv"), children: "CSV, for spreadsheets" }),
              /* @__PURE__ */ t("button", { type: "button", role: "menuitem", onClick: () => it("jsonl"), children: "JSON Lines, for other tools" })
            ]
          }
        ),
        /* @__PURE__ */ s(
          "button",
          {
            type: "button",
            className: x("ahv-button", U && "ahv-button-live"),
            "aria-pressed": U,
            title: "Check for new activity every few seconds",
            onClick: () => me((l) => !l),
            children: [
              /* @__PURE__ */ t(E, { name: "live", size: 14, className: x(U && "ahv-pulse") }),
              U ? "Live" : "Go live"
            ]
          }
        ),
        /* @__PURE__ */ s(
          "button",
          {
            type: "button",
            className: "ahv-button",
            disabled: A.refreshing && !A.error,
            onClick: () => {
              A.refresh(), le.refresh();
            },
            children: [
              /* @__PURE__ */ t(E, { name: "refresh", size: 14, className: x(A.refreshing && !U && "ahv-spin") }),
              "Refresh"
            ]
          }
        )
      ] })
    ] }),
    N && !c && /* @__PURE__ */ t(Va, { request: e, status: Qe.data }),
    /* @__PURE__ */ s("div", { className: "ahv-filters", children: [
      /* @__PURE__ */ s("div", { className: "ahv-bar", children: [
        i.length > 1 && /* @__PURE__ */ t("div", { className: "ahv-segment", role: "group", "aria-label": "Records", children: i.map((l) => /* @__PURE__ */ t("button", { type: "button", "aria-pressed": k === l, onClick: () => z({ kind: l, draft: u }), children: l === "events" ? "Events" : "API requests" }, l)) }),
        k === "events" && /* @__PURE__ */ t("div", { className: "ahv-segment", role: "group", "aria-label": "Show", children: ft.map((l) => /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            title: l.hint,
            "aria-pressed": D === l.value,
            onClick: () => z({ view: l.value, draft: u }),
            children: l.label
          },
          l.value
        )) }),
        f.length > 1 && /* @__PURE__ */ t("div", { className: "ahv-chips", role: "group", "aria-label": "Presets", children: f.map((l, _) => /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            className: "ahv-chip",
            "aria-pressed": C === _,
            onClick: () => z({ preset: _, draft: u }),
            children: l.label
          },
          l.label
        )) })
      ] }),
      /* @__PURE__ */ s("div", { className: "ahv-searchbar", children: [
        /* @__PURE__ */ t(
          Ka,
          {
            value: S.q,
            inputRef: Ze,
            onChange: (l) => q({ ...S, q: l }),
            onSubmit: () => !ie && z({ draft: S }),
            suggestions: (l) => ba(l, k, re.data, Ht),
            placeholder: k === "events" ? "Search: words, or actor:… action:trade.* -result:success on:account:100234" : "Search: words, or actor:… method:POST status:4xx route:/trading/*"
          }
        ),
        /* @__PURE__ */ t(
          "select",
          {
            className: "ahv-input ahv-range",
            value: S.range,
            "aria-label": "When",
            onChange: (l) => q({ ...S, range: l.target.value }),
            children: je.map((l) => /* @__PURE__ */ t("option", { value: l.value, children: l.label }, l.value))
          }
        ),
        S.range === "custom" && /* @__PURE__ */ s("span", { className: "ahv-pair", children: [
          /* @__PURE__ */ t(
            "input",
            {
              type: "date",
              className: "ahv-input",
              value: S.from,
              "aria-label": "From (UTC)",
              "aria-invalid": ie || void 0,
              onChange: (l) => q({ ...S, from: l.target.value })
            }
          ),
          /* @__PURE__ */ t(
            "input",
            {
              type: "date",
              className: "ahv-input",
              value: S.to,
              "aria-label": "To (UTC)",
              "aria-invalid": ie || void 0,
              onChange: (l) => q({ ...S, to: l.target.value })
            }
          )
        ] }),
        /* @__PURE__ */ t("button", { type: "button", className: "ahv-button ahv-button-main", disabled: ie, onClick: () => z({ draft: S }), children: "Search" })
      ] }),
      ie && /* @__PURE__ */ t("em", { className: "ahv-bad ahv-small", children: "The end date is before the start date" }),
      /* @__PURE__ */ s("div", { className: "ahv-bar ahv-add", children: [
        /* @__PURE__ */ t("span", { className: "ahv-dim ahv-small", children: "Add" }),
        He(k).filter((l) => !(c && (l.field === "on" || k === "requests" && l.field === "actor"))).slice(0, 8).map((l) => /* @__PURE__ */ t("button", { type: "button", className: "ahv-link-button", title: l.hint, onClick: () => jt(l.field), children: l.label }, l.field)),
        Wt && /* @__PURE__ */ t("span", { className: "ahv-warn ahv-small ahv-push-right", children: "Not searched yet: press Enter or Search" })
      ] }),
      (ce(u.q).length > 0 || u.range !== oe(c)) && /* @__PURE__ */ s("div", { className: "ahv-applied", children: [
        ce(u.q).map((l) => /* @__PURE__ */ s("span", { className: x("ahv-pill", l.negated && "ahv-pill-not"), children: [
          /* @__PURE__ */ s("span", { className: "ahv-dim", children: [
            l.negated ? "Not " : "",
            l.field ? `${ga(l.field)}:` : "Text:"
          ] }),
          " ",
          Bt(l),
          /* @__PURE__ */ t("button", { type: "button", "aria-label": `Remove ${l.text}`, onClick: () => z({ draft: { ...u, q: va(u.q, l) } }), children: /* @__PURE__ */ t(E, { name: "close", size: 12 }) })
        ] }, l.text)),
        u.range !== oe(c) && /* @__PURE__ */ s("span", { className: "ahv-pill", children: [
          /* @__PURE__ */ t("span", { className: "ahv-dim", children: "When:" }),
          " ",
          u.range === "custom" ? [u.from && Z(I(Re(u.from))), u.to && Z(I(Re(u.to)))].filter(Boolean).join(" – ") || "Any date" : (ut = je.find((l) => l.value === u.range)) == null ? void 0 : ut.label,
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              "aria-label": "Remove the time range",
              onClick: () => z({ draft: { ...u, range: oe(c), from: "", to: "" } }),
              children: /* @__PURE__ */ t(E, { name: "close", size: 12 })
            }
          )
        ] }),
        /* @__PURE__ */ t("button", { type: "button", className: "ahv-link-button", onClick: () => z({ preset: 0, draft: yt(new URLSearchParams(), c) }), children: "Clear all" })
      ] })
    ] }),
    Q || le.error && !le.data ? null : /* @__PURE__ */ t(Ca, { chart: le.data, noun: Te, loading: le.loading }),
    Ye && /* @__PURE__ */ t(ae, { action: /* @__PURE__ */ t("button", { type: "button", className: "ahv-icon-button", "aria-label": "Dismiss", onClick: () => Ce(null), children: /* @__PURE__ */ t(E, { name: "close", size: 14 }) }), children: Ye }),
    A.error && G.length > 0 && /* @__PURE__ */ s(ae, { tone: "bad", action: /* @__PURE__ */ t("button", { type: "button", className: "ahv-button", onClick: A.refresh, children: "Retry" }), children: [
      "Couldn't load newer activity: ",
      A.error.message
    ] }),
    A.error && !G.length ? /* @__PURE__ */ t(ae, { tone: "bad", action: /* @__PURE__ */ t("button", { type: "button", className: "ahv-button", onClick: A.refresh, children: "Retry" }), children: A.error.message }) : A.loading ? /* @__PURE__ */ t(Ve, {}) : G.length ? /* @__PURE__ */ s("div", { className: "ahv-table-wrap", ref: st, children: [
      /* @__PURE__ */ s("table", { className: "ahv-table", children: [
        /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ s("tr", { children: [
          /* @__PURE__ */ t("th", { children: "When (UTC)" }),
          /* @__PURE__ */ t("th", { children: "Who" }),
          /* @__PURE__ */ t("th", { children: k === "events" ? "What happened" : "Request" }),
          T.map((l) => /* @__PURE__ */ t("th", { children: l.label }, l.key))
        ] }) }),
        /* @__PURE__ */ t("tbody", { children: G.map((l, _) => {
          var O;
          return /* @__PURE__ */ s(Xt, { children: [
            l.occurred_at.slice(0, 10) !== ((O = G[_ - 1]) == null ? void 0 : O.occurred_at.slice(0, 10)) && /* @__PURE__ */ t("tr", { className: "ahv-day", children: /* @__PURE__ */ t("td", { colSpan: Ft, children: aa(l.occurred_at) }) }),
            /* @__PURE__ */ s(
              "tr",
              {
                tabIndex: 0,
                className: x("ahv-row", F(l) && l.outcome !== "success" && "ahv-row-problem"),
                onClick: () => ve(l),
                onKeyDown: (w) => {
                  w.target === w.currentTarget && (w.key === "Enter" || w.key === " ") && (w.preventDefault(), ve(l));
                },
                children: [
                  /* @__PURE__ */ t("td", { children: /* @__PURE__ */ t(wa, { value: l.occurred_at, seal: et(l) }) }),
                  /* @__PURE__ */ t("td", { children: /* @__PURE__ */ t(
                    Ta,
                    {
                      row: l,
                      actorTypes: Ee,
                      onFocus: c && k === "requests" ? void 0 : () => nt({ actor_id: l.actor_id })
                    }
                  ) }),
                  /* @__PURE__ */ t("td", { children: F(l) ? /* @__PURE__ */ t(La, { row: l }) : /* @__PURE__ */ t(Mt, { row: l }) }),
                  T.map((w) => /* @__PURE__ */ t("td", { className: "ahv-cell", children: w.key === "where" ? /* @__PURE__ */ t(Ea, { row: l }) : w.key === "service" ? /* @__PURE__ */ t("span", { className: "ahv-dim", children: P(l.service) }) : w.key === "ip" ? /* @__PURE__ */ t("span", { className: "ahv-mono ahv-dim", children: l.ip || "—" }) : F(l) ? w.key === "result" ? l.outcome === "success" ? /* @__PURE__ */ t("span", { className: "ahv-dim", children: "success" }) : /* @__PURE__ */ t(se, { outcome: l.outcome }) : l.target_type ? /* @__PURE__ */ s("span", { children: [
                    ct[l.target_type] ?? P(l.target_type),
                    " ",
                    /* @__PURE__ */ t("span", { className: "ahv-mono", children: l.target_name || l.target_id })
                  ] }) : "—" : null }, w.key))
                ]
              }
            )
          ] }, l.id);
        }) })
      ] }),
      /* @__PURE__ */ t("div", { ref: $e, "aria-hidden": "true" })
    ] }) : /* @__PURE__ */ s("div", { className: "ahv-empty", children: [
      /* @__PURE__ */ t(E, { name: "log", size: 28 }),
      /* @__PURE__ */ s("strong", { children: [
        "No ",
        Te,
        " match"
      ] }),
      /* @__PURE__ */ t("span", { className: "ahv-dim", children: k === "events" && D === "important" ? "Try All, or a wider time range." : "Try a wider time range or fewer filters." })
    ] }),
    G.length > 0 && /* @__PURE__ */ s("footer", { className: "ahv-foot", children: [
      /* @__PURE__ */ s("span", { className: "ahv-dim ahv-num", children: [
        ra(G.length, Te.slice(0, -1)),
        " shown",
        U ? " · Live keeps the newest page" : A.trimmed ? " · the newest were let go to keep the list light; Refresh brings them back" : A.hasMore ? "" : " · that is all of them"
      ] }),
      K.error && /* @__PURE__ */ s("span", { className: "ahv-bad ahv-small", children: [
        "Couldn't load more: ",
        K.error.message
      ] }),
      A.hasMore && /* @__PURE__ */ t("button", { type: "button", className: "ahv-button", onClick: Me, disabled: K.loading, children: K.loading ? "Loading…" : "Load more" })
    ] }),
    /* @__PURE__ */ t(
      Et,
      {
        request: e,
        row: ke,
        onClose: () => ve(null),
        onFocus: c ? void 0 : nt,
        actorTypes: Ee,
        entities: (mt = re.data) == null ? void 0 : mt.entities,
        seal: ke ? et(ke) : null
      }
    )
  ] });
}
const Nt = 500;
function mn({ request: e, entity: a, view: n = "all", action: r, newestFirst: i = !1, header: c, more: o, simple: h = !1, className: d }) {
  var k, D, f, C;
  const N = a.type && a.id ? `${a.type}:${a.id}:${n}:${r ?? ""}` : null, y = j(N, () => e("search", {
    method: "POST",
    body: { kind: "events", filters: {}, related_type: a.type, related_id: a.id, view: n, action: r, limit: Nt, details: !0 }
  })), g = j("catalog", () => e("catalog", { method: "GET" })), [m, v] = $(null), b = ((k = y.data) == null ? void 0 : k.items) ?? [], p = i ? b : [...b].reverse(), M = !!((D = y.data) != null && D.next_cursor);
  return /* @__PURE__ */ s("div", { className: x("ahv ahv-timeline", h && "ahv-timeline-simple", d), children: [
    y.error ? /* @__PURE__ */ s(ae, { tone: "bad", action: /* @__PURE__ */ t("button", { type: "button", className: "ahv-button", onClick: y.refresh, children: "Retry" }), children: [
      "Couldn't load: ",
      y.error.message
    ] }) : y.loading && !y.data ? /* @__PURE__ */ t(Ve, { rows: 4 }) : p.length ? /* @__PURE__ */ s(H, { children: [
      c == null ? void 0 : c(b.length ? [...b].reverse() : [], M),
      M && /* @__PURE__ */ s("p", { className: "ahv-dim ahv-small", children: [
        "Showing the newest ",
        Nt,
        " steps.",
        o && /* @__PURE__ */ s(H, { children: [
          " ",
          o
        ] })
      ] }),
      !h && /* @__PURE__ */ s("h3", { className: "ahv-eyebrow", children: [
        p.length,
        " step",
        p.length === 1 ? "" : "s",
        ", ",
        i ? "newest" : "oldest",
        " first"
      ] }),
      /* @__PURE__ */ t("ol", { className: "ahv-steps", children: p.map((L) => h ? /* @__PURE__ */ t(ln, { event: L }, L.id) : /* @__PURE__ */ t(sn, { event: L, onOpen: v }, L.id)) })
    ] }) : /* @__PURE__ */ t("p", { className: "ahv-dim", children: "Nothing has been recorded about this yet." }),
    /* @__PURE__ */ t(
      Et,
      {
        request: e,
        row: m,
        onClose: () => v(null),
        actorTypes: (f = g.data) == null ? void 0 : f.actor_types,
        entities: (C = g.data) == null ? void 0 : C.entities
      }
    )
  ] });
}
function sn({ event: e, onOpen: a }) {
  var y, g, m, v, b;
  const [n, r] = $(!1), { icon: i, tone: c } = Fe(e), o = e.children ?? [], h = e.children_count ?? o.length, d = e.category !== "data" && ((y = e.change_list) != null && y.length) ? e.change_list : null, N = !!((g = e.details) != null && g.length) || h > 0;
  return /* @__PURE__ */ s("li", { className: `ahv-step ahv-tone-${c}`, children: [
    /* @__PURE__ */ t("span", { className: "ahv-step-icon", "aria-hidden": "true", children: /* @__PURE__ */ t(E, { name: i, size: 14 }) }),
    /* @__PURE__ */ s("div", { className: "ahv-step-main", children: [
      /* @__PURE__ */ s("div", { className: "ahv-step-head", children: [
        /* @__PURE__ */ s("div", { className: "ahv-stack", children: [
          /* @__PURE__ */ s("button", { type: "button", className: "ahv-step-title", onClick: () => a(e), title: "Open the full detail", children: [
            e.title,
            /* @__PURE__ */ t(se, { outcome: e.outcome })
          ] }),
          /* @__PURE__ */ t(xt, { event: e })
        ] }),
        /* @__PURE__ */ s("span", { className: "ahv-step-when", title: `${e.occurred_at} UTC`, children: [
          /* @__PURE__ */ t("span", { className: "ahv-mono", children: ue(e.occurred_at) }),
          /* @__PURE__ */ t("span", { className: "ahv-dim", children: Be(e.occurred_at) || Z(I(e.occurred_at)) })
        ] })
      ] }),
      e.outcome !== "success" ? /* @__PURE__ */ t("p", { className: "ahv-step-problem", children: e.summary }) : (m = e.facts) != null && m.length ? /* @__PURE__ */ t(Tt, { facts: e.facts }) : !d && e.summary !== e.title ? /* @__PURE__ */ t("p", { className: "ahv-sentence", children: e.summary }) : null,
      d && /* @__PURE__ */ t(Ke, { changes: d, valueLabel: "Set to" }),
      N && /* @__PURE__ */ s("button", { type: "button", className: "ahv-disclose", "aria-expanded": n, onClick: () => r((p) => !p), children: [
        /* @__PURE__ */ t(E, { name: "chevronDown", size: 13, className: x(n && "ahv-turned") }),
        n ? "Hide" : [((v = e.details) == null ? void 0 : v.length) && "Details", h > 0 && `${h} record change${h === 1 ? "" : "s"}`].filter(Boolean).join(" and ")
      ] }),
      n && /* @__PURE__ */ s("div", { className: "ahv-step-more", children: [
        (b = e.details) != null && b.length ? /* @__PURE__ */ t(Je, { items: e.details.map((p) => [p.label, p.value]), mono: !0 }) : null,
        h > 0 && /* @__PURE__ */ t(rn, { records: o, counted: h, onOpen: a, parent: e })
      ] })
    ] })
  ] });
}
function ln({ event: e }) {
  const { icon: a, tone: n } = Fe(e);
  return /* @__PURE__ */ s("li", { className: `ahv-step ahv-tone-${n}`, children: [
    /* @__PURE__ */ t("span", { className: "ahv-step-icon", "aria-hidden": "true", children: /* @__PURE__ */ t(E, { name: a, size: 16 }) }),
    /* @__PURE__ */ t("div", { className: "ahv-step-main", children: /* @__PURE__ */ s("div", { className: "ahv-step-head", children: [
      /* @__PURE__ */ s("div", { className: "ahv-stack", children: [
        /* @__PURE__ */ s("span", { className: "ahv-step-title", children: [
          e.title,
          /* @__PURE__ */ t(se, { outcome: e.outcome })
        ] }),
        e.summary !== e.title && /* @__PURE__ */ t("p", { className: "ahv-sentence", children: e.summary }),
        /* @__PURE__ */ t(xt, { event: e, simple: !0 })
      ] }),
      /* @__PURE__ */ s("span", { className: "ahv-step-when", title: `${e.occurred_at} UTC`, children: [
        /* @__PURE__ */ t("span", { className: "ahv-mono", children: ue(e.occurred_at) }),
        /* @__PURE__ */ t("span", { className: "ahv-dim", children: Be(e.occurred_at) || Z(I(e.occurred_at)) })
      ] })
    ] }) })
  ] });
}
function xt({ event: e, simple: a = !1 }) {
  return /* @__PURE__ */ s("span", { className: "ahv-byline", children: [
    /* @__PURE__ */ t("span", { className: x("ahv-avatar ahv-avatar-small", e.actor_type === "system" && "ahv-avatar-system"), "aria-hidden": "true", children: St(e.actor) }),
    [
      e.actor,
      !a && e.actor_label,
      e.origin && P(e.origin).toUpperCase(),
      e.actor_type !== "system" && e.device,
      e.country,
      e.ip
    ].filter(Boolean).map((n, r) => /* @__PURE__ */ t("span", { className: x(r === 0 ? "ahv-strong" : "ahv-sep"), children: n }, r))
  ] });
}
function rn({ records: e, counted: a, onOpen: n, parent: r }) {
  const [i, c] = $(null);
  return /* @__PURE__ */ s("div", { className: "ahv-records", children: [
    /* @__PURE__ */ s("table", { className: "ahv-changes ahv-records-table", children: [
      /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ s("tr", { children: [
        /* @__PURE__ */ t("th", { children: "Record" }),
        /* @__PURE__ */ t("th", { children: "Change" }),
        /* @__PURE__ */ t("th", { children: "Fields" }),
        /* @__PURE__ */ t("th", { children: /* @__PURE__ */ t("span", { className: "ahv-hidden", children: "Detail" }) })
      ] }) }),
      /* @__PURE__ */ t("tbody", { children: e.map((o) => {
        const h = o.change_list ?? [], d = i === o.id;
        return /* @__PURE__ */ t(
          cn,
          {
            record: o,
            fields: h.length,
            open: d,
            onToggle: () => c(d ? null : o.id),
            onOpen: () => n(o),
            children: d && /* @__PURE__ */ t("tr", { className: "ahv-records-fields", children: /* @__PURE__ */ t("td", { colSpan: 4, children: /* @__PURE__ */ t(Ke, { changes: h }) }) })
          },
          o.id
        );
      }) })
    ] }),
    a > e.length && /* @__PURE__ */ s("button", { type: "button", className: "ahv-link-button", onClick: () => n(r), children: [
      a - e.length,
      " more in the full detail"
    ] })
  ] });
}
function cn({ record: e, fields: a, open: n, onToggle: r, onOpen: i, children: c }) {
  const o = e.action === "data.created" ? "Created" : e.action === "data.deleted" ? "Deleted" : "Updated";
  return /* @__PURE__ */ s(H, { children: [
    /* @__PURE__ */ s("tr", { children: [
      /* @__PURE__ */ t("td", { children: /* @__PURE__ */ s("button", { type: "button", className: "ahv-disclose", "aria-expanded": n, disabled: !a, onClick: r, children: [
        /* @__PURE__ */ t(E, { name: "chevronRight", size: 12, className: x(n && "ahv-turned-right") }),
        e.summary.replace(/^(Created|Updated|Deleted) /, "").split(":")[0]
      ] }) }),
      /* @__PURE__ */ t("td", { children: o }),
      /* @__PURE__ */ t("td", { className: "ahv-dim", children: e.action === "data.updated" ? (e.change_list ?? []).slice(0, 3).map((h) => h.label).join(", ") + (a > 3 ? ` and ${a - 3} more` : "") : `${a} value${a === 1 ? "" : "s"}` }),
      /* @__PURE__ */ t("td", { className: "ahv-cell-end", children: /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          className: "ahv-icon-button",
          title: "Open the record's full detail",
          "aria-label": "Open the record's full detail",
          onClick: i,
          children: /* @__PURE__ */ t(E, { name: "arrowRight", size: 13 })
        }
      ) })
    ] }),
    c
  ] });
}
export {
  Et as ActivityDetail,
  un as ActivityLog,
  mn as ActivityTimeline,
  Va as IntegrityStatus,
  Aa as PanelHost
};
