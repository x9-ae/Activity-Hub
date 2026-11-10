import { jsx as a, jsxs as l, Fragment as B } from "react/jsx-runtime";
import { useState as E, useRef as R, useEffect as H, useCallback as We, useMemo as ie, useContext as It, createContext as Ut, useId as Wt, Fragment as jt } from "react";
import { createPortal as zt } from "react-dom";
const F = (e) => "action" in e, Bt = {
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
  shield: "M20 13c0 5-3.5 7.5-7.7 9a1 1 0 0 1-.6 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.2-2.7a1.2 1.2 0 0 1 1.6 0C14.5 3.8 17 5 19 5a1 1 0 0 1 1 1z"
};
function O({ name: e, size: t = 16, ...n }) {
  return /* @__PURE__ */ a(
    "svg",
    {
      width: t,
      height: t,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 2,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      focusable: "false",
      ...n,
      children: /* @__PURE__ */ a("path", { d: Bt[e] })
    }
  );
}
function W(e, t, n) {
  const [r, i] = E({ loading: e !== null }), o = R(0), h = R(t);
  h.current = t;
  const m = We(() => {
    if (e === null) return;
    const b = ++o.current;
    i((k) => ({ ...k, loading: !0 })), h.current().then(
      (k) => b === o.current && i({ data: k, loading: !1 }),
      (k) => b === o.current && i((f) => ({ data: f.data, error: k, loading: !1 }))
    );
  }, [e]);
  H(() => {
    i({ loading: e !== null }), m();
  }, [e, m]);
  const c = !!r.error;
  return H(() => {
    if (!n || e === null || c) return;
    const b = setInterval(m, n);
    return () => clearInterval(b);
  }, [n, e, c, m]), { ...r, refresh: m };
}
const Le = 20;
function Ft(e, t, n, r, i) {
  var C;
  const o = t && JSON.stringify(t), [h, m] = E([]), [c, b] = E(!1), [k, f] = E({ loading: !1 }), u = R(o);
  u.current = o;
  const v = W(
    o,
    () => e("search", { method: "POST", body: { ...t, limit: n } }),
    r ? i : void 0
  ), y = R(0);
  H(() => {
    v.data && (y.current += 1, m([v.data]), b(!1), f({ loading: !1 }));
  }, [v.data]), H(() => {
    m([]), f({ loading: !1 });
  }, [o]);
  const g = ((C = h[h.length - 1]) == null ? void 0 : C.next_cursor) ?? null, T = We(() => {
    if (!g || k.loading || !t) return;
    f({ loading: !0 });
    const p = o, _ = y.current;
    e("search", { method: "POST", body: { ...t, limit: n, cursor: g } }).then(
      (x) => {
        u.current !== p || y.current !== _ || (m((M) => [...M, x].slice(-Le)), h.length >= Le && b(!0), f({ loading: !1 }));
      },
      (x) => u.current === p && y.current === _ && f({ loading: !1, error: x })
    );
  }, [g, k.loading, t, o, e, n, h.length]);
  return {
    rows: h.flatMap((p) => p.items),
    trimmed: c,
    hasMore: !!g && !r,
    loading: v.loading && !h.length,
    refreshing: v.loading,
    error: v.error,
    more: k,
    loadMore: T,
    refresh: v.refresh,
    pageCount: h.length
  };
}
const j = (e) => Date.parse(`${e.slice(0, 23).replace(" ", "T")}Z`), D = (e) => e.replace(/[._]+/g, " ").trim(), oe = (e) => e.charAt(0).toUpperCase() + e.slice(1), bt = 864e5, Ht = [[60, "second"], [60, "minute"], [24, "hour"], [7, "day"]], Jt = new Intl.RelativeTimeFormat(void 0, { numeric: "auto", style: "short" });
function yt(e, t = Date.now()) {
  let n = (j(e) - t) / 1e3;
  for (const [r, i] of Ht) {
    if (Math.abs(n) < r) return Jt.format(Math.round(n), i);
    n /= r;
  }
  return "";
}
const fe = (e, t) => new Date(e).toLocaleString(void 0, { ...t, timeZone: "UTC" }), ee = (e) => fe(e, { day: "numeric", month: "short", year: "numeric" }), Z = (e) => fe(e, { day: "numeric", month: "short" }), Oe = (e) => fe(e, { hour: "2-digit", minute: "2-digit", hour12: !1 });
function Vt(e, t = Date.now()) {
  const n = e.slice(0, 10);
  return n === new Date(t).toISOString().slice(0, 10) ? "Today" : n === new Date(t - bt).toISOString().slice(0, 10) ? "Yesterday" : fe(j(`${n} 00:00:00`), { weekday: "short", day: "numeric", month: "short", year: "numeric" });
}
const ge = (e) => e.slice(11, 23);
function Gt(e) {
  var n, r;
  if (/^[\d#]/.test(e)) return "#";
  const t = e.split(/[\s@._-]+/).filter(Boolean);
  return ((((n = t[0]) == null ? void 0 : n[0]) ?? "?") + (((r = t[1]) == null ? void 0 : r[0]) ?? "")).toUpperCase();
}
const Kt = (e) => e.actor_name || (e.actor_type === "system" ? oe(D(e.actor_id)) || "System" : e.actor_id || "Anonymous"), xe = (e) => /^\d{4}-\d{2}-\d{2}$/.test(e) && !Number.isNaN(Date.parse(`${e}T00:00:00Z`)), qe = (e) => `${e} 00:00:00`, Xt = (e) => `${new Date(Date.parse(`${e}T00:00:00Z`) + bt).toISOString().slice(0, 10)} 00:00:00`, Zt = (e, t = Date.now()) => new Date(t - e * 6e4).toISOString().slice(0, 19).replace("T", " "), Yt = (e, t, n = `${t}s`) => `${e.toLocaleString()} ${e === 1 ? t : n}`, me = 1e5, Qt = [
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
], ea = [
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
async function ta(e, t, n) {
  const r = [];
  let i = null;
  do {
    const o = await e("export", { method: "POST", body: { ...t, cursor: i } });
    r.push(...o.items), n(r.length), i = o.next_cursor;
  } while (i && r.length < me);
  return { rows: r.slice(0, me), more: !!i || r.length > me };
}
function aa(e) {
  let t = e == null ? "" : typeof e == "object" ? JSON.stringify(e) : String(e);
  return /^[=+\-@\t\r]/.test(t) && (t = `'${t}`), /[",\n\r]/.test(t) ? `"${t.replace(/"/g, '""')}"` : t;
}
function na(e, t) {
  const n = e === "events" ? Qt : ea;
  return `\uFEFF${[n.join(","), ...t.map((i) => n.map((o) => aa(i[o])).join(","))].join(`\r
`)}\r
`;
}
const sa = (e) => e.map((t) => {
  const { children: n, ...r } = t;
  return JSON.stringify(r);
}).join(`
`) + `
`;
function Ae(e, t, n) {
  const r = URL.createObjectURL(new Blob([e], { type: n })), i = document.createElement("a");
  i.href = r, i.download = t, i.click(), setTimeout(() => URL.revokeObjectURL(r), 1e3);
}
const ra = /(-?)(?:([a-z_]+):)?("([^"]*)"?|\S+)/g;
function re(e) {
  const t = [];
  for (const n of e.matchAll(ra)) {
    let r = n[3].startsWith('"') ? n[4] ?? "" : n[3], i = n[2] ?? null;
    i && r.startsWith("//") && (r = `${i}:${r}`, i = null), r && t.push({ field: i, value: r, negated: n[1] === "-", text: n[0] });
  }
  return t;
}
const la = (e, t) => re(e).filter((n) => n !== t && n.text !== t.text).map((n) => n.text).join(" "), De = (e) => /\s/.test(e) ? `"${e.replace(/"/g, "")}"` : e, Nt = [
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
], je = (e) => Nt.filter((t) => t.kinds.includes(e)), ia = { events: ["origin", "outcome", "session"], requests: ["origin", "session"] }, oa = (e) => [...je(e).map((t) => t.field), ...ia[e]], ca = (e) => {
  var t;
  return ((t = Nt.find((n) => n.field === e)) == null ? void 0 : t.label) ?? oe(D(e));
};
function da(e, t, n, r = {}) {
  const i = e.startsWith("-"), o = i ? e.slice(1) : e, h = i ? "-" : "", m = o.indexOf(":");
  if (m < 0)
    return je(t).filter((f) => f.field.startsWith(o.toLowerCase()) || f.label.toLowerCase().startsWith(o.toLowerCase())).map((f) => ({ insert: `${h}${f.field}:`, label: `${f.field}:`, hint: f.hint }));
  const c = o.slice(0, m), b = o.slice(m + 1).toLowerCase();
  return (() => {
    const f = (u) => (r[u] ?? []).filter((v) => v.value).map((v) => ({ insert: v.value, label: v.value, hint: v.count.toLocaleString() }));
    switch (c) {
      case "action":
        return Object.entries((n == null ? void 0 : n.actions) ?? {}).map(([u, v]) => ({ insert: u, label: u, hint: v.title }));
      case "category":
        return [...new Set(Object.values((n == null ? void 0 : n.actions) ?? {}).map((u) => u.category))].map((u) => ({ insert: u, label: u }));
      case "actor_type":
        return Object.entries((n == null ? void 0 : n.actor_types) ?? {}).map(([u, v]) => ({ insert: u, label: u, hint: v }));
      case "result":
        return ["success", "failed", "refused"].map((u) => ({ insert: u, label: u }));
      case "method":
        return ["GET", "POST", "PUT", "PATCH", "DELETE"].map((u) => ({ insert: u, label: u }));
      case "status":
        return ["2xx", "4xx", "5xx"].map((u) => ({ insert: u, label: u }));
      case "on":
        return Object.entries((n == null ? void 0 : n.entities) ?? {}).filter(([u]) => !u.includes("_")).map(([u, v]) => ({ insert: `${u}:`, label: `${u}:`, hint: v }));
      case "app":
        return f("origin");
      case "service":
        return f("service");
      default:
        return [];
    }
  })().filter((f) => f.insert.toLowerCase().startsWith(b) || f.insert.toLowerCase().split(/[._:]/).some((u) => u.startsWith(b)) || (f.hint ?? "").toLowerCase().split(/\s+/).some((u) => u.startsWith(b))).slice(0, 12).map((f) => ({ ...f, insert: `${h}${c}:${f.insert.endsWith(":") ? f.insert : De(f.insert)}` }));
}
const pe = 6e4, Q = 1440, ha = [15, 30, 60, 120, 180, 360, 720, 1440, 2880, 10080, 20160, 43200], ct = 7, ua = new Intl.NumberFormat(void 0, { notation: "compact", maximumFractionDigits: 1 });
function ma(e) {
  const t = e.bucket_minutes * pe, n = new Map(e.buckets.map((i) => [j(i.at), i.count])), r = [];
  for (let i = Math.floor(j(e.occurred_from) / t) * t; i < j(e.occurred_to); i += t)
    r.push({ at: i, count: n.get(i) ?? 0 });
  return r;
}
function va(e) {
  return e % Q === 0 ? e === Q ? "Daily bars" : `${e / Q}-day bars` : e % 60 === 0 ? e === 60 ? "Hourly bars" : `${e / 60}-hour bars` : `${e}-minute bars`;
}
function Me(e, t) {
  return t >= Q ? ee(e) : `${Z(e)}, ${Oe(e)} – ${Oe(e + t * pe)}`;
}
function pa(e, t) {
  if (e.length < 2) return [];
  const n = (e[e.length - 1].at - e[0].at) / pe, r = ha.find((h) => h >= t && h % t === 0 && n / h <= ct) ?? t * Math.ceil(e.length / ct), i = r >= Q, o = [];
  return e.forEach((h, m) => {
    if (h.at % (r * pe) !== 0) return;
    const c = o[o.length - 1], b = !c || Z(e[c.index].at) !== Z(h.at);
    o.push({ index: m, top: i ? Z(h.at) : Oe(h.at), bottom: !i && b ? Z(h.at) : "" });
  }), o;
}
function fa({ chart: e, noun: t, loading: n }) {
  const r = ie(() => e ? ma(e) : [], [e]), [i, o] = E(null), h = r.reduce((v, y) => v + y.count, 0), m = r.reduce((v, y) => Math.max(v, y.count), 0), c = r.find((v) => v.count === m && m > 0), b = (e == null ? void 0 : e.bucket_minutes) ?? Q, k = ie(() => pa(r, b), [r, b]), f = t.replace(/s$/, ""), u = i !== null ? r[i] : void 0;
  return /* @__PURE__ */ l("div", { className: "ahv-chart", children: [
    /* @__PURE__ */ l("div", { className: "ahv-chart-head", children: [
      /* @__PURE__ */ l("span", { children: [
        /* @__PURE__ */ a("strong", { className: "ahv-num", children: n && !e ? "…" : h.toLocaleString() }),
        " ",
        h === 1 ? f : t,
        e && /* @__PURE__ */ l("span", { className: "ahv-dim", children: [
          " · ",
          Z(j(e.occurred_from)),
          " – ",
          ee(j(e.occurred_to) - 1),
          " UTC"
        ] })
      ] }),
      e && /* @__PURE__ */ l("span", { className: "ahv-dim", children: [
        c && /* @__PURE__ */ l(B, { children: [
          "Peak ",
          /* @__PURE__ */ a("strong", { className: "ahv-num", children: c.count.toLocaleString() }),
          " at ",
          Me(c.at, b).split(" – ")[0],
          " · "
        ] }),
        va(b)
      ] })
    ] }),
    /* @__PURE__ */ l(
      "div",
      {
        className: "ahv-chart-plot",
        role: "img",
        "aria-label": `${h.toLocaleString()} ${t}${c ? `, most at ${Me(c.at, b)} UTC (${c.count})` : ""}`,
        onMouseMove: (v) => {
          if (!r.length) return;
          const y = v.currentTarget.getBoundingClientRect();
          o(Math.min(r.length - 1, Math.max(0, Math.floor((v.clientX - y.left) / y.width * r.length))));
        },
        onMouseLeave: () => o(null),
        children: [
          m > 0 && /* @__PURE__ */ a("span", { className: "ahv-chart-max ahv-num", children: ua.format(m) }),
          /* @__PURE__ */ a("svg", { viewBox: `0 0 ${Math.max(r.length, 1)} 100`, preserveAspectRatio: "none", className: "ahv-chart-svg", children: r.map((v, y) => {
            const g = m ? Math.max(v.count / m * 100, v.count ? 2 : 0) : 0;
            return /* @__PURE__ */ a(
              "rect",
              {
                x: y + 0.12,
                width: 0.76,
                y: 100 - g,
                height: g,
                className: y === i ? "ahv-bar ahv-bar-on" : "ahv-bar"
              },
              v.at
            );
          }) }),
          !n && h === 0 && /* @__PURE__ */ l("span", { className: "ahv-chart-empty", children: [
            "No ",
            t,
            " in this period"
          ] }),
          u && /* @__PURE__ */ l("div", { className: "ahv-tip", style: { left: `${(i + 0.5) / r.length * 100}%` }, children: [
            /* @__PURE__ */ a("strong", { className: "ahv-num", children: u.count ? `${u.count.toLocaleString()} ${u.count === 1 ? f : t}` : `No ${t}` }),
            /* @__PURE__ */ l("span", { children: [
              Me(u.at, b),
              " UTC"
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ a("div", { className: "ahv-chart-axis", "aria-hidden": "true", children: k.map((v) => /* @__PURE__ */ l("span", { style: { left: `${(v.index + 0.5) / r.length * 100}%` }, children: [
      v.top,
      v.bottom && /* @__PURE__ */ a("b", { children: v.bottom })
    ] }, v.index)) })
  ] });
}
const q = (...e) => e.filter(Boolean).join(" "), kt = (e) => F(e) ? e.actor : Kt(e), Re = (e, t = {}) => F(e) ? e.actor_label : t[e.actor_type] || oe(D(e.actor_type)) || "Unknown", Pe = {
  sealed: "Sealed: kept unchanged since its minute ended",
  waiting: "Waiting for its seal: each minute is sealed two minutes after it ends"
};
function ga({ value: e, seal: t }) {
  return /* @__PURE__ */ l("span", { className: "ahv-when", title: `${e} UTC`, children: [
    /* @__PURE__ */ l("span", { className: "ahv-mono", children: [
      ge(e),
      t && /* @__PURE__ */ a("span", { className: q("ahv-seal", t === "waiting" && "ahv-seal-waiting"), title: Pe[t], "aria-label": Pe[t], children: /* @__PURE__ */ a(O, { name: t === "sealed" ? "shield" : "history", size: 11 }) })
    ] }),
    /* @__PURE__ */ a("span", { className: "ahv-dim", children: yt(e) })
  ] });
}
const ba = (e) => e ? Pe[e] : "";
function ya({ onClick: e, title: t, children: n }) {
  return e ? /* @__PURE__ */ a(
    "button",
    {
      type: "button",
      className: "ahv-link",
      title: t,
      onClick: (r) => {
        r.stopPropagation(), e();
      },
      onKeyDown: (r) => r.stopPropagation(),
      children: n
    }
  ) : /* @__PURE__ */ a(B, { children: n });
}
function Na({ row: e, actorTypes: t, onFocus: n }) {
  const r = kt(e), i = Re(e, t), o = e.actor_type !== "system" && e.actor_id && e.actor_id !== r ? e.actor_id : "";
  return /* @__PURE__ */ l("span", { className: "ahv-who", children: [
    /* @__PURE__ */ a("span", { className: q("ahv-avatar", e.actor_type === "system" && "ahv-avatar-system"), "aria-hidden": "true", children: Gt(r) }),
    /* @__PURE__ */ l("span", { className: "ahv-stack", children: [
      /* @__PURE__ */ a(ya, { title: `Only activity by ${r}`, onClick: e.actor_id ? n : void 0, children: /* @__PURE__ */ a("span", { className: "ahv-strong ahv-clip", children: r }) }),
      /* @__PURE__ */ a("span", { className: "ahv-dim ahv-clip", children: [i, o].filter(Boolean).join(" · ") })
    ] })
  ] });
}
function ka({ row: e }) {
  return /* @__PURE__ */ l("span", { className: "ahv-where", children: [
    e.origin && /* @__PURE__ */ a("span", { className: "ahv-tag", children: D(e.origin) }),
    e.country && /* @__PURE__ */ a("span", { className: "ahv-dim", title: e.ip || void 0, children: e.country })
  ] });
}
function ze({ outcome: e }) {
  return e === "success" ? null : /* @__PURE__ */ a("span", { className: q("ahv-tag", e === "failed" ? "ahv-tag-bad" : "ahv-tag-warn"), children: e });
}
const _a = (e) => e >= 500 ? "ahv-tag-bad" : e >= 400 ? "ahv-tag-warn" : "ahv-tag-ok", _t = ({ status: e }) => /* @__PURE__ */ a("span", { className: q("ahv-tag ahv-mono", _a(e)), children: e }), St = ({ method: e }) => /* @__PURE__ */ a("span", { className: q("ahv-tag ahv-mono", `ahv-method-${e.toLowerCase()}`), children: e });
function Sa({ row: e }) {
  var n;
  const t = e.children_count ?? ((n = e.children) == null ? void 0 : n.length) ?? 0;
  return /* @__PURE__ */ l("span", { className: "ahv-what", children: [
    e.importance === "high" && e.outcome === "success" && /* @__PURE__ */ a("span", { className: "ahv-mark", title: "Worth attention" }),
    e.outcome !== "success" && /* @__PURE__ */ a(O, { name: "alert", size: 14, className: e.outcome === "failed" ? "ahv-bad" : "ahv-warn" }),
    /* @__PURE__ */ a("span", { className: "ahv-sentence", children: e.summary }),
    t > 0 && /* @__PURE__ */ l("span", { className: "ahv-count", title: `${t} record change${t === 1 ? "" : "s"} made by the same request`, children: [
      /* @__PURE__ */ a(O, { name: "layers", size: 12 }),
      t
    ] })
  ] });
}
function Ct({ row: e }) {
  return /* @__PURE__ */ l("span", { className: "ahv-what", children: [
    /* @__PURE__ */ a(St, { method: e.method }),
    /* @__PURE__ */ a("span", { className: "ahv-mono ahv-clip", children: e.route }),
    /* @__PURE__ */ a(_t, { status: e.status }),
    /* @__PURE__ */ l("span", { className: "ahv-dim ahv-num", children: [
      e.duration_ms,
      " ms"
    ] })
  ] });
}
function Y({ tone: e = "plain", children: t, action: n }) {
  return /* @__PURE__ */ l("div", { className: q("ahv-message", e === "bad" && "ahv-message-bad"), role: e === "bad" ? "alert" : void 0, children: [
    /* @__PURE__ */ a("span", { children: t }),
    n
  ] });
}
function Be({ rows: e = 6 }) {
  return /* @__PURE__ */ a("div", { className: "ahv-skeleton", "aria-busy": "true", children: Array.from({ length: e }, (t, n) => /* @__PURE__ */ a("span", {}, n)) });
}
const Ca = 200, wa = Ut(null);
function z({ title: e, children: t }) {
  return /* @__PURE__ */ l("section", { className: "ahv-section", children: [
    /* @__PURE__ */ a("h3", { children: e }),
    t
  ] });
}
function X({ items: e }) {
  const t = e.filter(([, n]) => n != null && n !== "");
  return t.length ? /* @__PURE__ */ a("dl", { className: "ahv-facts", children: t.map(([n, r]) => /* @__PURE__ */ l("div", { children: [
    /* @__PURE__ */ a("dt", { children: n }),
    /* @__PURE__ */ a("dd", { children: typeof r == "object" ? JSON.stringify(r) : String(r) })
  ] }, n)) }) : null;
}
function $a({ event: e }) {
  const t = e.change_list;
  if (!(t != null && t.length)) return null;
  const n = t.every((i) => i.before === null), r = t.every((i) => i.after === null);
  return /* @__PURE__ */ a(z, { title: n ? "Recorded values" : r ? "Values removed" : "Changes", children: /* @__PURE__ */ a("div", { className: "ahv-scroll-x", children: /* @__PURE__ */ l("table", { className: "ahv-changes", children: [
    /* @__PURE__ */ a("thead", { children: /* @__PURE__ */ l("tr", { children: [
      /* @__PURE__ */ a("th", { children: "Field" }),
      !n && /* @__PURE__ */ a("th", { children: "Before" }),
      !r && /* @__PURE__ */ a("th", { children: "After" })
    ] }) }),
    /* @__PURE__ */ a("tbody", { children: t.map((i) => /* @__PURE__ */ l("tr", { children: [
      /* @__PURE__ */ a("td", { children: i.label }),
      !n && /* @__PURE__ */ a("td", { className: q("ahv-mono", !r && "ahv-before"), children: i.before ?? "—" }),
      !r && /* @__PURE__ */ a("td", { className: q("ahv-mono", !n && "ahv-after"), children: i.after ?? "—" })
    ] }, i.field)) })
  ] }) }) });
}
function Ta({ text: e }) {
  const [t, n] = E(!1);
  return /* @__PURE__ */ l("button", { type: "button", className: "ahv-button ahv-button-quiet", onClick: () => {
    var r;
    (r = navigator.clipboard) == null || r.writeText(e).then(() => {
      n(!0), setTimeout(() => n(!1), 1500);
    });
  }, children: [
    /* @__PURE__ */ a(O, { name: t ? "check" : "copy", size: 14 }),
    t ? "Copied" : "Copy"
  ] });
}
function Ea({ row: e }) {
  const [t, n] = E(!1), { children: r, details: i, ...o } = e, h = JSON.stringify(o, null, 2);
  return /* @__PURE__ */ l("section", { className: "ahv-section", children: [
    /* @__PURE__ */ l("div", { className: "ahv-row-between", children: [
      /* @__PURE__ */ l("button", { type: "button", className: "ahv-disclose", "aria-expanded": t, onClick: () => n((m) => !m), children: [
        /* @__PURE__ */ a(O, { name: "chevronDown", size: 14, className: q(t && "ahv-turned") }),
        "Full record (JSON)"
      ] }),
      /* @__PURE__ */ a(Ta, { text: h })
    ] }),
    t && /* @__PURE__ */ a("pre", { className: "ahv-pre", children: h })
  ] });
}
function Ma({ open: e, events: t, calls: n, onOpen: r }) {
  const i = [...t, ...n].sort((o, h) => o.occurred_at.localeCompare(h.occurred_at));
  return i.length ? /* @__PURE__ */ a("ol", { className: "ahv-list", children: i.map((o) => /* @__PURE__ */ a("li", { children: /* @__PURE__ */ l("button", { type: "button", disabled: o.id === e.id, onClick: () => r(o), children: [
    /* @__PURE__ */ a("span", { className: "ahv-mono ahv-dim", children: ge(o.occurred_at) }),
    F(o) ? /* @__PURE__ */ l("span", { className: "ahv-what", children: [
      /* @__PURE__ */ a("span", { className: "ahv-sentence", children: o.summary }),
      /* @__PURE__ */ a(ze, { outcome: o.outcome })
    ] }) : /* @__PURE__ */ a(Ct, { row: o })
  ] }) }, o.id)) }) : /* @__PURE__ */ a("p", { className: "ahv-dim", children: "Nothing else was recorded for this request." });
}
function La(e, t) {
  const n = F(t);
  return W(`${t.id}`, async () => {
    if (n) return e(`events/${t.id}`, { method: "GET" });
    if (!t.request_id) return { same_request: [], requests: [] };
    const r = (h) => e("search", {
      method: "POST",
      body: { kind: h, filters: { request_id: t.request_id }, limit: Ca }
    }), [i, o] = await Promise.all([r("events"), r("requests")]);
    return { same_request: i.items, requests: o.items.filter((h) => h.id !== t.id) };
  });
}
function wt({ request: e, row: t, onClose: n, onFocus: r, actorTypes: i, entities: o, seal: h }) {
  const [m, c] = E(t);
  H(() => c(t), [t]);
  const b = R(null), k = R(null), f = R(n);
  f.current = n;
  const u = m !== null;
  H(() => {
    var N, C;
    if (!u) return;
    const y = ((N = b.current) == null ? void 0 : N.getRootNode()) ?? document, g = y.activeElement ?? document.activeElement;
    (C = b.current) == null || C.focus();
    const T = (p) => {
      if (p.key === "Escape")
        p.stopPropagation(), f.current();
      else if (p.key === "Tab" && k.current) {
        const _ = [...k.current.querySelectorAll("button:not(:disabled), [href], input, select, [tabindex]:not([tabindex='-1'])")], x = y.activeElement;
        if (!_.length) return;
        p.shiftKey && x === _[0] ? (p.preventDefault(), _[_.length - 1].focus()) : !p.shiftKey && x === _[_.length - 1] ? (p.preventDefault(), _[0].focus()) : k.current.contains(x) || (p.preventDefault(), _[0].focus());
      }
    };
    return window.addEventListener("keydown", T, !0), () => {
      var p;
      window.removeEventListener("keydown", T, !0), (p = g == null ? void 0 : g.focus) == null || p.call(g);
    };
  }, [u]);
  const v = It(wa);
  return m ? zt(
    /* @__PURE__ */ l("div", { className: "ahv ahv-drawer-layer", children: [
      /* @__PURE__ */ a("div", { className: "ahv-backdrop", onClick: n }),
      /* @__PURE__ */ l("aside", { ref: k, className: "ahv-drawer", role: "dialog", "aria-modal": "true", "aria-label": "Activity details", children: [
        /* @__PURE__ */ a("button", { ref: b, type: "button", className: "ahv-icon-button ahv-drawer-close", onClick: n, "aria-label": "Close", children: /* @__PURE__ */ a(O, { name: "close" }) }),
        /* @__PURE__ */ a(
          Oa,
          {
            request: e,
            row: m,
            onOpen: c,
            onFocus: r,
            actorTypes: i,
            entities: o,
            seal: m === t ? h : null
          },
          m.id
        )
      ] })
    ] }),
    v ?? document.body
  ) : null;
}
function Oa({ request: e, row: t, onOpen: n, onFocus: r, actorTypes: i, entities: o = {}, seal: h }) {
  var u, v, y, g;
  const m = La(e, t), c = F(t) ? ((u = m.data) == null ? void 0 : u.event) ?? t : null, b = kt(t), k = c != null && c.target_type ? `${o[c.target_type] ?? D(c.target_type)} ${c.target_name || c.target_id}` : "", f = `${ee(j(t.occurred_at))}, ${ge(t.occurred_at)} UTC`;
  return /* @__PURE__ */ l("div", { className: "ahv-drawer-body", children: [
    /* @__PURE__ */ l("header", { className: "ahv-drawer-head", children: [
      c ? /* @__PURE__ */ l(B, { children: [
        /* @__PURE__ */ l("div", { className: "ahv-tags", children: [
          /* @__PURE__ */ a("span", { className: "ahv-tag", children: c.title }),
          /* @__PURE__ */ a(ze, { outcome: c.outcome }),
          c.importance === "high" && /* @__PURE__ */ a("span", { className: "ahv-tag ahv-tag-accent", children: "Worth attention" }),
          c.imported && /* @__PURE__ */ a("span", { className: "ahv-tag", children: "Imported" })
        ] }),
        /* @__PURE__ */ a("h2", { children: c.summary })
      ] }) : /* @__PURE__ */ l(B, { children: [
        /* @__PURE__ */ l("div", { className: "ahv-tags", children: [
          /* @__PURE__ */ a(St, { method: t.method }),
          /* @__PURE__ */ a(_t, { status: t.status })
        ] }),
        /* @__PURE__ */ a("h2", { className: "ahv-mono", children: t.route })
      ] }),
      /* @__PURE__ */ l("p", { className: "ahv-dim", children: [
        b,
        " · ",
        Re(t, i),
        " · ",
        f
      ] }),
      r && /* @__PURE__ */ l("div", { className: "ahv-actions", children: [
        t.actor_id && /* @__PURE__ */ l("button", { type: "button", className: "ahv-button", onClick: () => r({ actor_id: t.actor_id }), children: [
          /* @__PURE__ */ a(O, { name: "user", size: 14 }),
          "All by ",
          b
        ] }),
        (c == null ? void 0 : c.target_type) && /* @__PURE__ */ l(
          "button",
          {
            type: "button",
            className: "ahv-button",
            onClick: () => r({ target_type: c.target_type, target_id: c.target_id }),
            children: [
              /* @__PURE__ */ a(O, { name: "history", size: 14 }),
              "Timeline of ",
              k
            ]
          }
        )
      ] })
    ] }),
    c ? /* @__PURE__ */ l(B, { children: [
      c.outcome !== "success" && c.reason && /* @__PURE__ */ a(z, { title: "Reason", children: /* @__PURE__ */ a("p", { children: c.reason }) }),
      /* @__PURE__ */ a($a, { event: c }),
      (v = c.details) != null && v.length ? /* @__PURE__ */ a(z, { title: "Details", children: /* @__PURE__ */ a(X, { items: c.details.map((T) => [T.label, T.value]) }) }) : c.metadata && !m.loading ? /* @__PURE__ */ a(z, { title: "Details", children: /* @__PURE__ */ a(X, { items: Object.entries(c.metadata).map(([T, N]) => [oe(D(T)), N]) }) }) : null,
      (k || c.related.length > 0) && /* @__PURE__ */ a(z, { title: "Concerns", children: /* @__PURE__ */ a(X, { items: [
        ["Target", k],
        ...c.related.map(([T, N]) => [oe(o[T] ?? D(T)), N])
      ] }) })
    ] }) : /* @__PURE__ */ l(B, { children: [
      /* @__PURE__ */ a(z, { title: "Request", children: /* @__PURE__ */ a(X, { items: [["Path", t.path], ["Took", `${t.duration_ms} ms`], ["Service", D(t.service)]] }) }),
      t.request_body && /* @__PURE__ */ a(z, { title: "Sent (secrets masked)", children: /* @__PURE__ */ a("pre", { className: "ahv-pre", children: JSON.stringify(t.request_body, null, 2) }) })
    ] }),
    t.request_id && /* @__PURE__ */ a(z, { title: "Same request", children: m.error ? /* @__PURE__ */ l(Y, { tone: "bad", action: /* @__PURE__ */ a("button", { type: "button", className: "ahv-button", onClick: m.refresh, children: "Retry" }), children: [
      "Couldn't load: ",
      m.error.message
    ] }) : m.loading && !m.data ? /* @__PURE__ */ a(Be, { rows: 2 }) : /* @__PURE__ */ a(Ma, { open: t, events: ((y = m.data) == null ? void 0 : y.same_request) ?? [], calls: ((g = m.data) == null ? void 0 : g.requests) ?? [], onOpen: n }) }),
    /* @__PURE__ */ a(z, { title: "Who and from where", children: /* @__PURE__ */ a(X, { items: [
      ["Who", `${b} (${Re(t, i)}${t.actor_id && t.actor_id !== b ? ` ${t.actor_id}` : ""})`],
      ["App", t.origin && D(t.origin)],
      ["Country", t.country],
      ["IP address", t.ip],
      ["Device", c ? c.device : t.user_agent],
      ["Session", t.session_id],
      ["Company", t.tenant_id],
      ["Service", D(t.service)]
    ] }) }),
    /* @__PURE__ */ a(z, { title: "Reference", children: /* @__PURE__ */ a(X, { items: [
      ["Record id", t.id],
      ["Request id", t.request_id],
      ["Recorded", `${t.received_at} UTC`],
      ["Integrity", ba(h ?? null)],
      ...c ? [["Action", c.action]] : []
    ] }) }),
    /* @__PURE__ */ a(Ea, { row: c ?? t })
  ] });
}
const dt = 65, Ie = { events: "Events", access_logs: "Requests" }, xa = 20, ht = (e, t = Date.now()) => (t - Date.parse(`${e.replace(" ", "T")}:00Z`)) / 6e4, qa = () => new Date(Date.now() - 864e5).toISOString().slice(0, 10);
function Aa(e, t, n) {
  var i;
  const r = (i = n == null ? void 0 : n.sealed_until) == null ? void 0 : i[t];
  return r ? e.slice(0, 16) <= r ? "sealed" : "waiting" : null;
}
function Da({ request: e, status: t }) {
  var _, x;
  const [n, r] = E(!1), [i, o] = E(qa), [h, m] = E(!1), [c, b] = E(null), k = R(null), f = W(
    t != null && t.checks ? "integrity" : null,
    () => e("integrity", { method: "GET" })
  ), u = !!(t != null && t.checks && ((_ = f.data) != null && _.allowed));
  if (!t) return null;
  const v = Object.entries(t.sealed_until ?? {}), y = t.last_daily, g = (x = t.stats) == null ? void 0 : x.queued;
  if (!v.length && t.recording === void 0 && !y) return null;
  const T = async (M) => {
    m(!0);
    try {
      b(await M());
    } catch (d) {
      b({ kind: "error", message: d.message });
    } finally {
      m(!1);
    }
  }, N = () => T(async () => ({ kind: "day", ...await e("integrity/verify", { method: "POST", body: { day: i } }) })), C = () => T(async () => {
    const M = await e(`integrity/seal/${i}`, { method: "GET" });
    return Ae(`${JSON.stringify(M, null, 2)}
`, `activity-seal-${i}.json`, "application/json"), { kind: "downloaded", day: i };
  }), p = (M) => T(async () => {
    let d;
    try {
      d = JSON.parse(await M.text());
    } catch {
      d = {};
    }
    if (!d || !Array.isArray(d.seals) || !d.seals.length)
      throw new Error(`${M.name} is not a seal record: choose a proof downloaded here (activity-seal-<day>.json)`);
    const w = await e("integrity/check", { method: "POST", body: { record: d } });
    return { kind: "proof", name: M.name, day: String(d.day ?? ""), ...w };
  });
  return /* @__PURE__ */ l("div", { className: "ahv-status-wrap", children: [
    /* @__PURE__ */ l("div", { className: "ahv-status", role: "status", children: [
      /* @__PURE__ */ a(O, { name: "shield", size: 14 }),
      t.recording !== void 0 && /* @__PURE__ */ a("span", { className: q("ahv-tag", t.recording ? "ahv-tag-ok" : "ahv-tag-bad"), children: t.recording ? "Recording" : "Not recording" }),
      g !== void 0 && /* @__PURE__ */ l("span", { children: [
        "Waiting to be written ",
        /* @__PURE__ */ a("strong", { className: "ahv-num", children: g.toLocaleString() })
      ] }),
      v.map(([M, d]) => /* @__PURE__ */ l(
        "span",
        {
          className: q(ht(d) > dt && "ahv-warn"),
          title: ht(d) > dt ? "Sealing is behind" : "Every minute up to this one is sealed",
          children: [
            Ie[M] ?? M,
            " sealed through ",
            /* @__PURE__ */ a("strong", { className: "ahv-num", children: d })
          ]
        },
        M
      )),
      y && /* @__PURE__ */ l("span", { children: [
        "Check of ",
        y.day,
        ":",
        " ",
        /* @__PURE__ */ a("strong", { className: y.ok === !1 ? "ahv-bad" : y.ok ? "ahv-ok" : "ahv-warn", children: y.ok === !1 ? `${y.problems ?? ""} problem(s)`.trim() : y.ok ? "intact" : "not checked" })
      ] }),
      u && /* @__PURE__ */ a("button", { type: "button", className: "ahv-link-button ahv-push-right", "aria-expanded": n, onClick: () => r((M) => !M), children: "Check integrity" })
    ] }),
    n && u && /* @__PURE__ */ l("div", { className: "ahv-checks", children: [
      /* @__PURE__ */ l("div", { className: "ahv-bar", children: [
        /* @__PURE__ */ l("label", { className: "ahv-field", children: [
          /* @__PURE__ */ a("span", { children: "Day (UTC)" }),
          /* @__PURE__ */ a(
            "input",
            {
              type: "date",
              className: "ahv-input",
              value: i,
              max: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
              min: "2000-01-01",
              onChange: (M) => o(M.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ l("button", { type: "button", className: "ahv-button ahv-button-main", disabled: h || !i, onClick: N, children: [
          /* @__PURE__ */ a(O, { name: "shield", size: 14 }),
          h ? "Checking…" : "Check this day"
        ] }),
        /* @__PURE__ */ l(
          "button",
          {
            type: "button",
            className: "ahv-button",
            disabled: h || !i,
            onClick: C,
            title: "The day's last seal of each table, to keep outside the database",
            children: [
              /* @__PURE__ */ a(O, { name: "download", size: 14 }),
              "Download proof"
            ]
          }
        ),
        /* @__PURE__ */ l(
          "button",
          {
            type: "button",
            className: "ahv-button",
            disabled: h,
            title: "Compare a proof kept earlier with the database",
            onClick: () => {
              var M;
              return (M = k.current) == null ? void 0 : M.click();
            },
            children: [
              /* @__PURE__ */ a(O, { name: "check", size: 14 }),
              "Check a kept proof"
            ]
          }
        ),
        /* @__PURE__ */ a(
          "input",
          {
            ref: k,
            type: "file",
            accept: "application/json,.json",
            className: "ahv-hidden",
            tabIndex: -1,
            "aria-hidden": "true",
            onChange: (M) => {
              var w;
              const d = (w = M.target.files) == null ? void 0 : w[0];
              M.target.value = "", d && p(d);
            }
          }
        )
      ] }),
      c && /* @__PURE__ */ a(Ra, { verdict: c })
    ] })
  ] });
}
function Ra({ verdict: e }) {
  return e.kind === "error" ? /* @__PURE__ */ a("p", { className: "ahv-bad", role: "alert", children: e.message }) : e.kind === "day" ? /* @__PURE__ */ l("div", { role: "status", className: q("ahv-verdict", e.ok ? "ahv-verdict-ok" : "ahv-verdict-bad"), children: [
    /* @__PURE__ */ a("strong", { children: e.ok ? `${e.day}: intact. ${e.rows.toLocaleString()} records in ${e.checked.toLocaleString()} sealed minutes match their seals.` : `${e.day}: ${(e.problems.length + e.more).toLocaleString()} problem(s) found.` }),
    !e.ok && /* @__PURE__ */ l("ul", { children: [
      e.problems.slice(0, xa).map((t, n) => /* @__PURE__ */ l("li", { children: [
        /* @__PURE__ */ a("span", { className: "ahv-mono", children: t.window_start }),
        " ",
        Ie[t.table] ?? t.table,
        ": ",
        t.problem
      ] }, n)),
      e.more > 0 && /* @__PURE__ */ l("li", { className: "ahv-dim", children: [
        "and ",
        e.more.toLocaleString(),
        " more"
      ] })
    ] })
  ] }) : e.kind === "downloaded" ? /* @__PURE__ */ a("div", { role: "status", className: "ahv-verdict ahv-verdict-ok", children: /* @__PURE__ */ l("strong", { children: [
    "Proof of ",
    e.day,
    " downloaded. Keep it outside this system: checking it later shows any rewrite since."
  ] }) }) : e.mismatches.length ? /* @__PURE__ */ l("div", { role: "status", className: "ahv-verdict ahv-verdict-bad", children: [
    /* @__PURE__ */ l("strong", { children: [
      e.name,
      ": the database no longer matches this proof of ",
      e.day,
      "."
    ] }),
    /* @__PURE__ */ a("ul", { children: e.mismatches.map((t, n) => /* @__PURE__ */ l("li", { children: [
      /* @__PURE__ */ a("span", { className: "ahv-mono", children: t.window_start }),
      " ",
      Ie[t.table] ?? t.table,
      ": ",
      t.problem
    ] }, n)) })
  ] }) : /* @__PURE__ */ a("div", { role: "status", className: "ahv-verdict ahv-verdict-ok", children: /* @__PURE__ */ l("strong", { children: [
    e.name,
    ": the database still matches this proof of ",
    e.day,
    "."
  ] }) });
}
function ut(e, t) {
  const n = e.lastIndexOf(" ", t - 1) + 1, r = e.indexOf(" ", t);
  return { start: n, end: r < 0 ? e.length : r, word: e.slice(n, r < 0 ? e.length : r) };
}
function Pa({ value: e, onChange: t, onSubmit: n, suggestions: r, placeholder: i, inputRef: o }) {
  const h = R(null), m = o ?? h, c = Wt(), [b, k] = E(0), [f, u] = E(!1), [v, y] = E(0), [g, T] = E(!1), { start: N, end: C, word: p } = ut(e, b), _ = f ? r(p) : [], x = _[Math.min(v, _.length - 1)], M = (d) => {
    const w = e.slice(C), P = d.insert.endsWith(":") ? "" : " ", be = `${e.slice(0, N)}${d.insert}${w.startsWith(" ") || !P ? "" : P}${w}`, te = N + d.insert.length + (d.insert.endsWith(":") ? 0 : 1);
    t(be), y(0), T(!1), requestAnimationFrame(() => {
      var I, ce;
      (I = m.current) == null || I.focus(), (ce = m.current) == null || ce.setSelectionRange(te, te), k(te);
    });
  };
  return /* @__PURE__ */ l("div", { className: "ahv-search", children: [
    /* @__PURE__ */ l("span", { className: "ahv-input-icon", children: [
      /* @__PURE__ */ a(O, { name: "search", size: 14 }),
      /* @__PURE__ */ a(
        "input",
        {
          ref: m,
          className: "ahv-input",
          role: "combobox",
          "aria-label": "Search",
          "aria-expanded": _.length > 0,
          "aria-controls": c,
          "aria-autocomplete": "list",
          "aria-activedescendant": _.length && g ? `${c}-${_.indexOf(x)}` : void 0,
          value: e,
          placeholder: i,
          spellCheck: !1,
          onChange: (d) => {
            t(d.target.value), k(d.target.selectionStart ?? d.target.value.length), u(!0), y(0), T(!1);
          },
          onSelect: (d) => {
            const w = d.currentTarget.selectionStart ?? 0;
            ut(e, w).start !== N && T(!1), k(w);
          },
          onFocus: () => u(!0),
          onBlur: () => setTimeout(() => {
            u(!1), T(!1);
          }, 120),
          onKeyDown: (d) => {
            _.length && (d.key === "ArrowDown" || d.key === "ArrowUp") ? (d.preventDefault(), y((w) => g ? (w + (d.key === "ArrowDown" ? 1 : _.length - 1)) % _.length : d.key === "ArrowDown" ? 0 : _.length - 1), T(!0)) : _.length && g && d.key === "Enter" ? (d.preventDefault(), M(x)) : d.key === "Escape" ? (u(!1), T(!1)) : d.key === "Enter" && (u(!1), n());
          }
        }
      )
    ] }),
    _.length > 0 && /* @__PURE__ */ a("ul", { id: c, role: "listbox", className: "ahv-suggest", children: _.map((d, w) => /* @__PURE__ */ l(
      "li",
      {
        id: `${c}-${w}`,
        role: "option",
        "aria-selected": g && d === x,
        className: q(g && d === x && "ahv-suggest-on"),
        onMouseDown: (P) => {
          P.preventDefault(), M(d);
        },
        onMouseEnter: () => {
          y(w), T(!0);
        },
        children: [
          /* @__PURE__ */ a("span", { className: "ahv-mono", children: d.label }),
          d.hint && /* @__PURE__ */ a("span", { className: "ahv-dim", children: d.hint })
        ]
      },
      d.insert
    )) })
  ] });
}
function Fe({ label: e, icon: t, children: n, open: r, setOpen: i, badge: o, disabled: h }) {
  const m = R(null);
  return H(() => {
    if (!r) return;
    const c = (k) => {
      m.current && !k.composedPath().includes(m.current) && i(!1);
    }, b = (k) => k.key === "Escape" && i(!1);
    return document.addEventListener("mousedown", c), document.addEventListener("keydown", b), () => {
      document.removeEventListener("mousedown", c), document.removeEventListener("keydown", b);
    };
  }, [r, i]), /* @__PURE__ */ l("div", { className: "ahv-menu", ref: m, children: [
    /* @__PURE__ */ l("button", { type: "button", className: "ahv-button", "aria-expanded": r, disabled: h, onClick: () => i(!r), children: [
      /* @__PURE__ */ a(O, { name: t, size: 14 }),
      e,
      o && /* @__PURE__ */ a("span", { className: "ahv-count", children: o }),
      /* @__PURE__ */ a(O, { name: "chevronDown", size: 14 })
    ] }),
    r && /* @__PURE__ */ a("div", { className: "ahv-menu-list ahv-menu-panel", children: n })
  ] });
}
function Ia({ columns: e, shown: t, onChange: n }) {
  const [r, i] = E(!1);
  return /* @__PURE__ */ l(Fe, { label: "Columns", icon: "sliders", open: r, setOpen: i, children: [
    /* @__PURE__ */ a("p", { className: "ahv-dim ahv-small", children: "When, who and what always show." }),
    e.map((o) => /* @__PURE__ */ l("label", { className: "ahv-check", children: [
      /* @__PURE__ */ a(
        "input",
        {
          type: "checkbox",
          checked: t.includes(o.key),
          onChange: (h) => n(h.target.checked ? [...t, o.key] : t.filter((m) => m !== o.key))
        }
      ),
      o.label
    ] }, o.key))
  ] });
}
function Ua({ request: e, current: t, onOpen: n }) {
  var C;
  const [r, i] = E(!1), o = W("views", () => e("views", { method: "GET" })), [h, m] = E(""), [c, b] = E(!1), [k, f] = E(!1), [u, v] = E(null);
  if (!((C = o.data) != null && C.enabled)) return null;
  const y = o.data.views, g = y.find((p) => p.search === t), T = async (p) => {
    f(!0), v(null);
    try {
      await p(), o.refresh(), m("");
    } catch (_) {
      v(_.message);
    } finally {
      f(!1);
    }
  }, N = (p, _ = h, x = c) => T(() => e("views", { method: "POST", body: { id: p, name: _.trim(), search: t, shared: x } }));
  return /* @__PURE__ */ l(Fe, { label: g ? g.name : "Views", icon: "layers", open: r, setOpen: i, children: [
    y.length ? /* @__PURE__ */ a("ul", { className: "ahv-views", children: y.map((p) => /* @__PURE__ */ l("li", { className: q(p === g && "ahv-views-on"), children: [
      /* @__PURE__ */ l("button", { type: "button", className: "ahv-views-open", onClick: () => {
        n(p.search), i(!1);
      }, children: [
        /* @__PURE__ */ a("span", { children: p.name }),
        /* @__PURE__ */ a("span", { className: "ahv-dim ahv-small", children: p.mine ? p.shared ? "Shared by you" : "Only you" : `Shared by ${p.owner_name}` })
      ] }),
      p.mine && /* @__PURE__ */ l("span", { className: "ahv-views-tools", children: [
        p.search !== t && /* @__PURE__ */ a(
          "button",
          {
            type: "button",
            className: "ahv-icon-button",
            title: "Save the current search into this view",
            disabled: k,
            onClick: () => N(p.id, p.name, p.shared),
            children: /* @__PURE__ */ a(O, { name: "refresh", size: 14 })
          }
        ),
        /* @__PURE__ */ a(
          "button",
          {
            type: "button",
            className: "ahv-icon-button",
            title: "Remove this view",
            disabled: k,
            onClick: () => T(() => e(`views/${p.id}`, { method: "DELETE" })),
            children: /* @__PURE__ */ a(O, { name: "close", size: 14 })
          }
        )
      ] })
    ] }, p.id)) }) : /* @__PURE__ */ a("p", { className: "ahv-dim ahv-small", children: "No saved views yet. Save the current search to come back to it." }),
    /* @__PURE__ */ l("form", { className: "ahv-views-save", onSubmit: (p) => {
      p.preventDefault(), h.trim() && N();
    }, children: [
      /* @__PURE__ */ a(
        "input",
        {
          className: "ahv-input",
          value: h,
          maxLength: 80,
          placeholder: "Name this search",
          "aria-label": "View name",
          onChange: (p) => m(p.target.value)
        }
      ),
      /* @__PURE__ */ l("label", { className: "ahv-check", children: [
        /* @__PURE__ */ a("input", { type: "checkbox", checked: c, onChange: (p) => b(p.target.checked) }),
        "Share with my team"
      ] }),
      /* @__PURE__ */ a("button", { type: "submit", className: "ahv-button ahv-button-main", disabled: k || !h.trim(), children: "Save view" }),
      u && /* @__PURE__ */ a("span", { className: "ahv-bad ahv-small", children: u })
    ] })
  ] });
}
const mt = [
  { value: "important", label: "Important", hint: "What people did, without the details behind it" },
  { value: "all", label: "All", hint: "Every record, each request's row changes inside its event" },
  { value: "problems", label: "Problems", hint: "Only what failed or was refused" }
], Wa = [
  { label: "All requests", search: {} },
  { label: "Changes only", search: { filters: { method: ["POST", "PUT", "PATCH", "DELETE"] } } },
  { label: "Errors", search: { status_from: 400 } }
], Ue = [
  { value: "1h", label: "Last hour", minutes: 60 },
  { value: "24h", label: "Last 24 hours", minutes: 1440 },
  { value: "7d", label: "Last 7 days", minutes: 10080 },
  { value: "30d", label: "Last 30 days", minutes: 43200 },
  { value: "all", label: "All time" },
  { value: "custom", label: "Dates…" }
], vt = {
  events: [
    { key: "where", label: "Where" },
    { key: "concerning", label: "Concerning" },
    { key: "result", label: "Result" },
    { key: "service", label: "Service" },
    { key: "ip", label: "IP address" }
  ],
  requests: [{ key: "where", label: "Where" }, { key: "service", label: "Service" }, { key: "ip", label: "IP address" }]
}, pt = ["where"], ja = [], $t = "activity-hub-columns", ve = ["kind", "view", "p", "q", "range", "from", "to", "cols"], le = (e) => e ? "all" : "7d";
function ft(e, t) {
  const n = (o) => {
    const h = e.get(o) ?? "";
    return xe(h) ? h : "";
  }, r = n("from"), i = n("to");
  return { q: e.get("q") ?? "", from: r, to: i, range: e.get("range") || (r || i ? "custom" : le(t)) };
}
function za(e) {
  var n;
  if (e.range === "custom")
    return { occurred_from: xe(e.from) ? qe(e.from) : void 0, occurred_to: xe(e.to) ? Xt(e.to) : void 0 };
  const t = (n = Ue.find((r) => r.value === e.range)) == null ? void 0 : n.minutes;
  return t ? { occurred_from: `${Zt(t).slice(0, 16)}:00` } : {};
}
function Ba(e, t, n, r, i) {
  const o = { ...(n == null ? void 0 : n.search.filters) ?? {} }, h = { kind: e, filters: o, query: r.q.trim() || void 0, ...za(r) };
  return e === "events" ? (h.view = t, h.action = n == null ? void 0 : n.search.action, i && Object.assign(h, { related_type: i.type, related_id: i.id })) : (h.status_from = n == null ? void 0 : n.search.status_from, i && (o.actor_id = i.id)), h;
}
const Fa = (e) => {
  const t = new URLSearchParams();
  return e.forEach((n, r) => ve.includes(r) && t.set(r, n)), t.toString();
};
function Ha() {
  try {
    return JSON.parse(localStorage.getItem($t) ?? "null") ?? pt;
  } catch {
    return pt;
  }
}
function Ka({
  request: e,
  title: t = "Activity Log",
  description: n,
  presets: r = ja,
  kinds: i = ["events", "requests"],
  entity: o,
  params: h,
  onParamsChange: m,
  canExport: c = !1,
  showStatus: b = !0,
  pageSize: k = 100,
  liveEveryMs: f = 5e3,
  className: u
}) {
  var st, rt, lt, it, ot;
  const [v, y] = E(() => new URLSearchParams()), g = h ?? v, T = We((s) => m ? m(s) : y(s), [m]), N = g.get("kind") === "requests" && i.includes("requests") ? "requests" : i[0], C = ((st = mt.find((s) => s.value === g.get("view"))) == null ? void 0 : st.value) ?? "important", p = ie(() => N === "events" ? [{ label: "Everything", search: {} }, ...r] : Wa, [N, r]), _ = Math.min(Math.max(Number(g.get("p")) || 0, 0), p.length - 1), x = g.has("cols") ? (g.get("cols") || "").split(",").filter(Boolean) : Ha(), M = vt[N].filter((s) => x.includes(s.key)), d = ie(() => ft(g, o), [g, o]), [w, P] = E(d), [be, te] = E(g.toString());
  be !== g.toString() && (te(g.toString()), P(d));
  const [I, ce] = E(!1), [ye, de] = E(null), [Ne, ke] = E(null), [Tt, He] = E(!1), [Je, _e] = E(null), Ve = R(null), [, Et] = E(0);
  H(() => {
    const s = setInterval(() => Et((S) => S + 1), 3e4);
    return () => clearInterval(s);
  }, []);
  const J = ie(
    () => Ba(N, C, p[_], d, o),
    [N, C, p, _, d, o]
  ), he = JSON.stringify(J), A = Ft(e, J, k, I, f), Se = R(null), ae = W(he, () => {
    var L;
    const s = he, S = !J.occurred_from && ((L = Se.current) == null ? void 0 : L.key) === s;
    return e("chart", { method: "POST", body: S ? { ...J, occurred_from: Se.current.from } : J }).then(($) => (J.occurred_from || (Se.current = { key: s, from: $.occurred_from }), $));
  }, I ? f : void 0), ne = W("catalog", () => e("catalog", { method: "GET" })), Ge = W(b ? "status" : null, () => e("status", { method: "GET" }), 6e4), Ke = (s) => Aa(s.received_at, F(s) ? "events" : "access_logs", Ge.data), Xe = (s) => () => e("values", { method: "POST", body: { ...J, field: s } }).then((S) => S.values), Mt = W(`${he}|service`, Xe("service")), Lt = W(`${he}|origin`, Xe("origin")), Ze = (s = {}) => {
    const S = new URLSearchParams(g);
    for (const Ee of ve) S.delete(Ee);
    const L = s.kind ?? N;
    let $ = s.draft ?? w;
    if (L !== N) {
      const Ee = new Set(oa(L));
      $ = { ...$, q: re($.q).filter((ue) => !ue.field || Ee.has(ue.field)).map((ue) => ue.text).join(" ") };
    }
    L !== i[0] && S.set("kind", L), (s.view ?? C) !== "important" && S.set("view", s.view ?? C);
    const K = s.preset ?? (s.kind && s.kind !== N ? 0 : _);
    return K && S.set("p", String(K)), $.q.trim() && S.set("q", $.q.trim()), $.range !== le(o) && S.set("range", $.range), $.range === "custom" && ($.from && S.set("from", $.from), $.to && S.set("to", $.to)), (s.columns || g.has("cols")) && S.set("cols", (s.columns ?? x).join(",")), S;
  }, U = (s = {}) => {
    s.draft && P(s.draft), T(Ze(s));
  }, Ot = (s) => {
    try {
      localStorage.setItem($t, JSON.stringify(s));
    } catch {
    }
    U({ draft: d, columns: s });
  }, xt = (s, S) => {
    const L = re(d.q).filter(($) => $.field !== s).map(($) => $.text);
    U({ draft: { ...d, q: [...L, `${s}:${De(S)}`].join(" ") } });
  }, Ye = (s) => {
    de(null), s.actor_id ? xt("actor", s.actor_id) : s.target_type && s.target_id && U({
      kind: "events",
      view: "all",
      preset: 0,
      draft: { q: `on:${s.target_type}:${De(s.target_id)}`, range: "all", from: "", to: "" }
    });
  }, qt = (s) => {
    const S = w.q.trim();
    P({ ...w, q: `${S ? `${S} ` : ""}${s}:` }), requestAnimationFrame(() => {
      const L = Ve.current;
      L && (L.focus(), L.setSelectionRange(L.value.length, L.value.length));
    });
  }, At = w.q.trim() !== d.q.trim() || w.range !== d.range || w.from !== d.from || w.to !== d.to, se = !!(w.range === "custom" && w.from && w.to && w.to < w.from), Ce = R(null), Qe = R(null), { hasMore: et, loadMore: we, more: V, pageCount: tt } = A;
  H(() => {
    if (!Ce.current || !et || V.loading || V.error || tt >= Le) return;
    const s = new IntersectionObserver(([S]) => S.isIntersecting && we(), { root: Qe.current, rootMargin: "240px" });
    return s.observe(Ce.current), () => s.disconnect();
  }, [et, we, V.loading, V.error, tt, A.rows.length]);
  const at = async (s) => {
    He(!1), ke(0);
    try {
      const { rows: S, more: L } = await ta(e, J, ke);
      L && _e(`Only the newest ${me.toLocaleString()} rows were exported. Narrow the dates for the rest.`);
      const $ = (/* @__PURE__ */ new Date()).toISOString().slice(0, 16).replace(/[-:T]/g, ""), K = `activity-${o ? `${o.type}-${o.id}-` : ""}${N}-${$}`;
      s === "csv" ? Ae(na(N, S), `${K}.csv`, "text/csv;charset=utf-8") : Ae(sa(S), `${K}.jsonl`, "application/x-ndjson");
    } catch (S) {
      _e(`Export failed: ${S.message}`);
    } finally {
      ke(null);
    }
  }, $e = N === "events" ? "events" : "requests", Te = ((rt = ne.data) == null ? void 0 : rt.actor_types) ?? {}, nt = ((lt = ne.data) == null ? void 0 : lt.entities) ?? {}, Dt = (s) => {
    var S, L;
    if (s.field === "action") return ((L = (S = ne.data) == null ? void 0 : S.actions[s.value]) == null ? void 0 : L.title) ?? s.value;
    if (s.field === "actor_type") return Te[s.value] ?? s.value;
    if (s.field === "on") {
      const [$, ...K] = s.value.split(":");
      return `${nt[$] ?? D($)} ${K.join(":")}`;
    }
    return s.value;
  }, G = A.rows, Rt = { service: Mt.data ?? [], origin: Lt.data ?? [] }, Pt = 3 + M.length;
  return o && !(o.type && o.id) ? /* @__PURE__ */ a("div", { className: q("ahv ahv-log", u), children: /* @__PURE__ */ l(Y, { children: [
    "Nothing to show: no ",
    o.type || "record",
    " chosen."
  ] }) }) : /* @__PURE__ */ l("div", { className: q("ahv ahv-log", u), children: [
    /* @__PURE__ */ l("header", { className: "ahv-head", children: [
      /* @__PURE__ */ l("div", { children: [
        /* @__PURE__ */ l("h2", { className: "ahv-title", children: [
          /* @__PURE__ */ a(O, { name: "log", size: 18 }),
          o && t === "Activity Log" ? "Activity" : t
        ] }),
        /* @__PURE__ */ a("p", { className: "ahv-dim", children: n ?? (o ? `Everything about ${o.label}, and the API requests it made itself. Times are UTC.` : "Every action and API request, kept permanently and sealed. Times are UTC.") })
      ] }),
      /* @__PURE__ */ l("div", { className: "ahv-actions", children: [
        !o && /* @__PURE__ */ a(
          Ua,
          {
            request: e,
            current: Fa(Ze({ draft: d })),
            onOpen: (s) => {
              const S = new URLSearchParams(g);
              for (const L of ve) S.delete(L);
              new URLSearchParams(s).forEach((L, $) => ve.includes($) && S.set($, L)), T(S);
            }
          }
        ),
        /* @__PURE__ */ a(Ia, { columns: vt[N], shown: x, onChange: Ot }),
        c && /* @__PURE__ */ l(
          Fe,
          {
            label: Ne === null ? "Export" : `Exporting… ${Ne.toLocaleString()}`,
            icon: "download",
            open: Tt,
            setOpen: He,
            disabled: Ne !== null || !G.length,
            children: [
              /* @__PURE__ */ a("button", { type: "button", role: "menuitem", onClick: () => at("csv"), children: "CSV, for spreadsheets" }),
              /* @__PURE__ */ a("button", { type: "button", role: "menuitem", onClick: () => at("jsonl"), children: "JSON Lines, for other tools" })
            ]
          }
        ),
        /* @__PURE__ */ l(
          "button",
          {
            type: "button",
            className: q("ahv-button", I && "ahv-button-live"),
            "aria-pressed": I,
            title: "Check for new activity every few seconds",
            onClick: () => ce((s) => !s),
            children: [
              /* @__PURE__ */ a(O, { name: "live", size: 14, className: q(I && "ahv-pulse") }),
              I ? "Live" : "Go live"
            ]
          }
        ),
        /* @__PURE__ */ l(
          "button",
          {
            type: "button",
            className: "ahv-button",
            disabled: A.refreshing && !A.error,
            onClick: () => {
              A.refresh(), ae.refresh();
            },
            children: [
              /* @__PURE__ */ a(O, { name: "refresh", size: 14, className: q(A.refreshing && !I && "ahv-spin") }),
              "Refresh"
            ]
          }
        )
      ] })
    ] }),
    b && !o && /* @__PURE__ */ a(Da, { request: e, status: Ge.data }),
    /* @__PURE__ */ l("div", { className: "ahv-filters", children: [
      /* @__PURE__ */ l("div", { className: "ahv-bar", children: [
        i.length > 1 && /* @__PURE__ */ a("div", { className: "ahv-segment", role: "group", "aria-label": "Records", children: i.map((s) => /* @__PURE__ */ a("button", { type: "button", "aria-pressed": N === s, onClick: () => U({ kind: s, draft: d }), children: s === "events" ? "Events" : "API requests" }, s)) }),
        N === "events" && /* @__PURE__ */ a("div", { className: "ahv-segment", role: "group", "aria-label": "Show", children: mt.map((s) => /* @__PURE__ */ a(
          "button",
          {
            type: "button",
            title: s.hint,
            "aria-pressed": C === s.value,
            onClick: () => U({ view: s.value, draft: d }),
            children: s.label
          },
          s.value
        )) }),
        p.length > 1 && /* @__PURE__ */ a("div", { className: "ahv-chips", role: "group", "aria-label": "Presets", children: p.map((s, S) => /* @__PURE__ */ a(
          "button",
          {
            type: "button",
            className: "ahv-chip",
            "aria-pressed": _ === S,
            onClick: () => U({ preset: S, draft: d }),
            children: s.label
          },
          s.label
        )) })
      ] }),
      /* @__PURE__ */ l("div", { className: "ahv-searchbar", children: [
        /* @__PURE__ */ a(
          Pa,
          {
            value: w.q,
            inputRef: Ve,
            onChange: (s) => P({ ...w, q: s }),
            onSubmit: () => !se && U({ draft: w }),
            suggestions: (s) => da(s, N, ne.data, Rt),
            placeholder: N === "events" ? "Search: words, or actor:… action:trade.* -result:success on:account:100234" : "Search: words, or actor:… method:POST status:4xx route:/trading/*"
          }
        ),
        /* @__PURE__ */ a(
          "select",
          {
            className: "ahv-input ahv-range",
            value: w.range,
            "aria-label": "When",
            onChange: (s) => P({ ...w, range: s.target.value }),
            children: Ue.map((s) => /* @__PURE__ */ a("option", { value: s.value, children: s.label }, s.value))
          }
        ),
        w.range === "custom" && /* @__PURE__ */ l("span", { className: "ahv-pair", children: [
          /* @__PURE__ */ a(
            "input",
            {
              type: "date",
              className: "ahv-input",
              value: w.from,
              "aria-label": "From (UTC)",
              "aria-invalid": se || void 0,
              onChange: (s) => P({ ...w, from: s.target.value })
            }
          ),
          /* @__PURE__ */ a(
            "input",
            {
              type: "date",
              className: "ahv-input",
              value: w.to,
              "aria-label": "To (UTC)",
              "aria-invalid": se || void 0,
              onChange: (s) => P({ ...w, to: s.target.value })
            }
          )
        ] }),
        /* @__PURE__ */ a("button", { type: "button", className: "ahv-button ahv-button-main", disabled: se, onClick: () => U({ draft: w }), children: "Search" })
      ] }),
      se && /* @__PURE__ */ a("em", { className: "ahv-bad ahv-small", children: "The end date is before the start date" }),
      /* @__PURE__ */ l("div", { className: "ahv-bar ahv-add", children: [
        /* @__PURE__ */ a("span", { className: "ahv-dim ahv-small", children: "Add" }),
        je(N).filter((s) => !(o && (s.field === "on" || N === "requests" && s.field === "actor"))).slice(0, 8).map((s) => /* @__PURE__ */ a("button", { type: "button", className: "ahv-link-button", title: s.hint, onClick: () => qt(s.field), children: s.label }, s.field)),
        At && /* @__PURE__ */ a("span", { className: "ahv-warn ahv-small ahv-push-right", children: "Not searched yet: press Enter or Search" })
      ] }),
      (re(d.q).length > 0 || d.range !== le(o)) && /* @__PURE__ */ l("div", { className: "ahv-applied", children: [
        re(d.q).map((s) => /* @__PURE__ */ l("span", { className: q("ahv-pill", s.negated && "ahv-pill-not"), children: [
          /* @__PURE__ */ l("span", { className: "ahv-dim", children: [
            s.negated ? "Not " : "",
            s.field ? `${ca(s.field)}:` : "Text:"
          ] }),
          " ",
          Dt(s),
          /* @__PURE__ */ a("button", { type: "button", "aria-label": `Remove ${s.text}`, onClick: () => U({ draft: { ...d, q: la(d.q, s) } }), children: /* @__PURE__ */ a(O, { name: "close", size: 12 }) })
        ] }, s.text)),
        d.range !== le(o) && /* @__PURE__ */ l("span", { className: "ahv-pill", children: [
          /* @__PURE__ */ a("span", { className: "ahv-dim", children: "When:" }),
          " ",
          d.range === "custom" ? [d.from && ee(j(qe(d.from))), d.to && ee(j(qe(d.to)))].filter(Boolean).join(" – ") || "Any date" : (it = Ue.find((s) => s.value === d.range)) == null ? void 0 : it.label,
          /* @__PURE__ */ a(
            "button",
            {
              type: "button",
              "aria-label": "Remove the time range",
              onClick: () => U({ draft: { ...d, range: le(o), from: "", to: "" } }),
              children: /* @__PURE__ */ a(O, { name: "close", size: 12 })
            }
          )
        ] }),
        /* @__PURE__ */ a("button", { type: "button", className: "ahv-link-button", onClick: () => U({ preset: 0, draft: ft(new URLSearchParams(), o) }), children: "Clear all" })
      ] })
    ] }),
    ae.error && !ae.data ? null : /* @__PURE__ */ a(fa, { chart: ae.data, noun: $e, loading: ae.loading }),
    Je && /* @__PURE__ */ a(Y, { action: /* @__PURE__ */ a("button", { type: "button", className: "ahv-icon-button", "aria-label": "Dismiss", onClick: () => _e(null), children: /* @__PURE__ */ a(O, { name: "close", size: 14 }) }), children: Je }),
    A.error && G.length > 0 && /* @__PURE__ */ l(Y, { tone: "bad", action: /* @__PURE__ */ a("button", { type: "button", className: "ahv-button", onClick: A.refresh, children: "Retry" }), children: [
      "Couldn't load newer activity: ",
      A.error.message
    ] }),
    A.error && !G.length ? /* @__PURE__ */ a(Y, { tone: "bad", action: /* @__PURE__ */ a("button", { type: "button", className: "ahv-button", onClick: A.refresh, children: "Retry" }), children: A.error.message }) : A.loading ? /* @__PURE__ */ a(Be, {}) : G.length ? /* @__PURE__ */ l("div", { className: "ahv-table-wrap", ref: Qe, children: [
      /* @__PURE__ */ l("table", { className: "ahv-table", children: [
        /* @__PURE__ */ a("thead", { children: /* @__PURE__ */ l("tr", { children: [
          /* @__PURE__ */ a("th", { children: "When (UTC)" }),
          /* @__PURE__ */ a("th", { children: "Who" }),
          /* @__PURE__ */ a("th", { children: N === "events" ? "What happened" : "Request" }),
          M.map((s) => /* @__PURE__ */ a("th", { children: s.label }, s.key))
        ] }) }),
        /* @__PURE__ */ a("tbody", { children: G.map((s, S) => {
          var L;
          return /* @__PURE__ */ l(jt, { children: [
            s.occurred_at.slice(0, 10) !== ((L = G[S - 1]) == null ? void 0 : L.occurred_at.slice(0, 10)) && /* @__PURE__ */ a("tr", { className: "ahv-day", children: /* @__PURE__ */ a("td", { colSpan: Pt, children: Vt(s.occurred_at) }) }),
            /* @__PURE__ */ l(
              "tr",
              {
                tabIndex: 0,
                className: q("ahv-row", F(s) && s.outcome !== "success" && "ahv-row-problem"),
                onClick: () => de(s),
                onKeyDown: ($) => {
                  $.target === $.currentTarget && ($.key === "Enter" || $.key === " ") && ($.preventDefault(), de(s));
                },
                children: [
                  /* @__PURE__ */ a("td", { children: /* @__PURE__ */ a(ga, { value: s.occurred_at, seal: Ke(s) }) }),
                  /* @__PURE__ */ a("td", { children: /* @__PURE__ */ a(
                    Na,
                    {
                      row: s,
                      actorTypes: Te,
                      onFocus: o && N === "requests" ? void 0 : () => Ye({ actor_id: s.actor_id })
                    }
                  ) }),
                  /* @__PURE__ */ a("td", { children: F(s) ? /* @__PURE__ */ a(Sa, { row: s }) : /* @__PURE__ */ a(Ct, { row: s }) }),
                  M.map(($) => /* @__PURE__ */ a("td", { className: "ahv-cell", children: $.key === "where" ? /* @__PURE__ */ a(ka, { row: s }) : $.key === "service" ? /* @__PURE__ */ a("span", { className: "ahv-dim", children: D(s.service) }) : $.key === "ip" ? /* @__PURE__ */ a("span", { className: "ahv-mono ahv-dim", children: s.ip || "—" }) : F(s) ? $.key === "result" ? s.outcome === "success" ? /* @__PURE__ */ a("span", { className: "ahv-dim", children: "success" }) : /* @__PURE__ */ a(ze, { outcome: s.outcome }) : s.target_type ? /* @__PURE__ */ l("span", { children: [
                    nt[s.target_type] ?? D(s.target_type),
                    " ",
                    /* @__PURE__ */ a("span", { className: "ahv-mono", children: s.target_name || s.target_id })
                  ] }) : "—" : null }, $.key))
                ]
              }
            )
          ] }, s.id);
        }) })
      ] }),
      /* @__PURE__ */ a("div", { ref: Ce, "aria-hidden": "true" })
    ] }) : /* @__PURE__ */ l("div", { className: "ahv-empty", children: [
      /* @__PURE__ */ a(O, { name: "log", size: 28 }),
      /* @__PURE__ */ l("strong", { children: [
        "No ",
        $e,
        " match"
      ] }),
      /* @__PURE__ */ a("span", { className: "ahv-dim", children: N === "events" && C === "important" ? "Try All, or a wider time range." : "Try a wider time range or fewer filters." })
    ] }),
    G.length > 0 && /* @__PURE__ */ l("footer", { className: "ahv-foot", children: [
      /* @__PURE__ */ l("span", { className: "ahv-dim ahv-num", children: [
        Yt(G.length, $e.slice(0, -1)),
        " shown",
        I ? " · Live keeps the newest page" : A.trimmed ? " · the newest were let go to keep the list light; Refresh brings them back" : A.hasMore ? "" : " · that is all of them"
      ] }),
      V.error && /* @__PURE__ */ l("span", { className: "ahv-bad ahv-small", children: [
        "Couldn't load more: ",
        V.error.message
      ] }),
      A.hasMore && /* @__PURE__ */ a("button", { type: "button", className: "ahv-button", onClick: we, disabled: V.loading, children: V.loading ? "Loading…" : "Load more" })
    ] }),
    /* @__PURE__ */ a(
      wt,
      {
        request: e,
        row: ye,
        onClose: () => de(null),
        onFocus: o ? void 0 : Ye,
        actorTypes: Te,
        entities: (ot = ne.data) == null ? void 0 : ot.entities,
        seal: ye ? Ke(ye) : null
      }
    )
  ] });
}
const gt = 500;
function Xa({ request: e, entity: t, view: n = "all", action: r, newestFirst: i = !1, more: o, className: h }) {
  var y, g, T, N;
  const m = t.type && t.id ? `${t.type}:${t.id}:${n}:${r ?? ""}` : null, c = W(m, () => e("search", {
    method: "POST",
    body: { kind: "events", filters: {}, related_type: t.type, related_id: t.id, view: n, action: r, limit: gt }
  })), b = W("catalog", () => e("catalog", { method: "GET" })), [k, f] = E(null), u = ((y = c.data) == null ? void 0 : y.items) ?? [], v = i ? u : [...u].reverse();
  return /* @__PURE__ */ l("div", { className: q("ahv ahv-timeline", h), children: [
    c.error ? /* @__PURE__ */ l(Y, { tone: "bad", action: /* @__PURE__ */ a("button", { type: "button", className: "ahv-button", onClick: c.refresh, children: "Retry" }), children: [
      "Couldn't load: ",
      c.error.message
    ] }) : c.loading && !c.data ? /* @__PURE__ */ a(Be, { rows: 4 }) : v.length ? /* @__PURE__ */ l(B, { children: [
      ((g = c.data) == null ? void 0 : g.next_cursor) && /* @__PURE__ */ l("p", { className: "ahv-dim ahv-small", children: [
        "Showing the newest ",
        gt,
        " steps.",
        o && /* @__PURE__ */ l(B, { children: [
          " ",
          o
        ] })
      ] }),
      /* @__PURE__ */ a("ol", { className: "ahv-steps", children: v.map((C) => {
        var x;
        const p = C.outcome === "failed" ? "bad" : C.outcome === "refused" ? "warn" : C.importance === "high" ? "accent" : "plain", _ = C.children_count ?? ((x = C.children) == null ? void 0 : x.length) ?? 0;
        return /* @__PURE__ */ l("li", { className: `ahv-step ahv-step-${p}`, children: [
          /* @__PURE__ */ a("span", { className: "ahv-step-dot", "aria-hidden": "true" }),
          /* @__PURE__ */ l("button", { type: "button", className: "ahv-step-body", onClick: () => f(C), children: [
            /* @__PURE__ */ l("span", { className: "ahv-step-top", children: [
              /* @__PURE__ */ a("span", { className: "ahv-strong", children: C.title }),
              /* @__PURE__ */ l("span", { className: "ahv-dim ahv-num", title: `${C.occurred_at} UTC`, children: [
                ee(j(C.occurred_at)),
                ", ",
                ge(C.occurred_at),
                " · ",
                yt(C.occurred_at)
              ] })
            ] }),
            /* @__PURE__ */ a("span", { className: "ahv-sentence", children: C.summary }),
            /* @__PURE__ */ l("span", { className: "ahv-dim ahv-small", children: [
              [`${C.actor} · ${C.actor_label}`, C.origin && D(C.origin), C.country, C.ip].filter(Boolean).join(" · "),
              _ > 0 && /* @__PURE__ */ l(B, { children: [
                " · ",
                /* @__PURE__ */ a(O, { name: "layers", size: 12 }),
                " ",
                _,
                " record change",
                _ === 1 ? "" : "s"
              ] })
            ] })
          ] })
        ] }, C.id);
      }) })
    ] }) : /* @__PURE__ */ a("p", { className: "ahv-dim", children: "Nothing has been recorded about this yet." }),
    /* @__PURE__ */ a(
      wt,
      {
        request: e,
        row: k,
        onClose: () => f(null),
        actorTypes: (T = b.data) == null ? void 0 : T.actor_types,
        entities: (N = b.data) == null ? void 0 : N.entities
      }
    )
  ] });
}
export {
  wt as ActivityDetail,
  Ka as ActivityLog,
  Xa as ActivityTimeline,
  Da as IntegrityStatus,
  wa as PanelHost
};
