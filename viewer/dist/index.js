import { jsx as t, jsxs as s, Fragment as U } from "react/jsx-runtime";
import { useState as E, useRef as D, useEffect as K, useCallback as ze, useMemo as oe, useContext as Gt, createContext as Xt, useId as Yt, Fragment as Zt } from "react";
import { createPortal as Qt } from "react-dom";
const F = (e) => "action" in e, ea = {
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
  shield: "M20 13c0 5-3.5 7.5-7.7 9a1 1 0 0 1-.6 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.2-2.7a1.2 1.2 0 0 1 1.6 0C14.5 3.8 17 5 19 5a1 1 0 0 1 1 1z"
};
function x({ name: e, size: a = 16, ...n }) {
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
      children: /* @__PURE__ */ t("path", { d: ea[e] })
    }
  );
}
function I(e, a, n) {
  const [i, r] = E({ loading: e !== null }), c = D(0), h = D(a);
  h.current = a;
  const v = ze(() => {
    if (e === null) return;
    const b = ++c.current;
    r((N) => ({ ...N, loading: !0 })), h.current().then(
      (N) => b === c.current && r({ data: N, loading: !1 }),
      (N) => b === c.current && r((y) => ({ data: y.data, error: N, loading: !1 }))
    );
  }, [e]);
  K(() => {
    r({ loading: e !== null }), v();
  }, [e, v]);
  const d = !!i.error;
  return K(() => {
    if (!n || e === null || d) return;
    const b = setInterval(v, n);
    return () => clearInterval(b);
  }, [n, e, d, v]), { ...i, refresh: v };
}
const Me = 20;
function ta(e, a, n, i, r) {
  var o;
  const c = a && JSON.stringify(a), [h, v] = E([]), [d, b] = E(!1), [N, y] = E({ loading: !1 }), m = D(c);
  m.current = c;
  const g = I(
    c,
    () => e("search", { method: "POST", body: { ...a, limit: n } }),
    i ? r : void 0
  ), k = D(0);
  K(() => {
    g.data && (k.current += 1, v([g.data]), b(!1), y({ loading: !1 }));
  }, [g.data]), K(() => {
    v([]), y({ loading: !1 });
  }, [c]);
  const f = ((o = h[h.length - 1]) == null ? void 0 : o.next_cursor) ?? null, T = ze(() => {
    if (!f || N.loading || !a) return;
    y({ loading: !0 });
    const p = c, _ = k.current;
    e("search", { method: "POST", body: { ...a, limit: n, cursor: f } }).then(
      (M) => {
        m.current !== p || k.current !== _ || (v((O) => [...O, M].slice(-Me)), h.length >= Me && b(!0), y({ loading: !1 }));
      },
      (M) => m.current === p && k.current === _ && y({ loading: !1, error: M })
    );
  }, [f, N.loading, a, c, e, n, h.length]);
  return {
    rows: h.flatMap((p) => p.items),
    trimmed: d,
    hasMore: !!f && !i,
    loading: g.loading && !h.length,
    refreshing: g.loading,
    error: g.error,
    more: N,
    loadMore: T,
    refresh: g.refresh,
    pageCount: h.length
  };
}
const z = (e) => Date.parse(`${e.slice(0, 23).replace(" ", "T")}Z`), R = (e) => e.replace(/[._]+/g, " ").trim(), ce = (e) => e.charAt(0).toUpperCase() + e.slice(1), Et = 864e5, aa = [[60, "second"], [60, "minute"], [24, "hour"], [7, "day"]], na = new Intl.RelativeTimeFormat(void 0, { numeric: "auto", style: "short" });
function Be(e, a = Date.now()) {
  let n = (z(e) - a) / 1e3;
  for (const [i, r] of aa) {
    if (Math.abs(n) < i) return na.format(Math.round(n), r);
    n /= i;
  }
  return "";
}
const ge = (e, a) => new Date(e).toLocaleString(void 0, { ...a, timeZone: "UTC" }), ee = (e) => ge(e, { day: "numeric", month: "short", year: "numeric" }), Y = (e) => ge(e, { day: "numeric", month: "short" }), qe = (e) => ge(e, { hour: "2-digit", minute: "2-digit", hour12: !1 });
function sa(e, a = Date.now()) {
  const n = e.slice(0, 10);
  return n === new Date(a).toISOString().slice(0, 10) ? "Today" : n === new Date(a - Et).toISOString().slice(0, 10) ? "Yesterday" : ge(z(`${n} 00:00:00`), { weekday: "short", day: "numeric", month: "short", year: "numeric" });
}
const be = (e) => e.slice(11, 23);
function la(e) {
  var n, i;
  if (/^[\d#]/.test(e)) return "#";
  const a = e.split(/[\s@._-]+/).filter(Boolean);
  return ((((n = a[0]) == null ? void 0 : n[0]) ?? "?") + (((i = a[1]) == null ? void 0 : i[0]) ?? "")).toUpperCase();
}
const ra = (e) => e.actor_name || (e.actor_type === "system" ? ce(R(e.actor_id)) || "System" : e.actor_id || "Anonymous"), Ae = (e) => /^\d{4}-\d{2}-\d{2}$/.test(e) && !Number.isNaN(Date.parse(`${e}T00:00:00Z`)), Re = (e) => `${e} 00:00:00`, ia = (e) => `${new Date(Date.parse(`${e}T00:00:00Z`) + Et).toISOString().slice(0, 10)} 00:00:00`, oa = (e, a = Date.now()) => new Date(a - e * 6e4).toISOString().slice(0, 19).replace("T", " "), ca = (e, a, n = `${a}s`) => `${e.toLocaleString()} ${e === 1 ? a : n}`, ve = 1e5, da = [
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
], ha = [
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
async function ua(e, a, n) {
  const i = [];
  let r = null;
  do {
    const c = await e("export", { method: "POST", body: { ...a, cursor: r } });
    i.push(...c.items), n(i.length), r = c.next_cursor;
  } while (r && i.length < ve);
  return { rows: i.slice(0, ve), more: !!r || i.length > ve };
}
function ma(e) {
  let a = e == null ? "" : typeof e == "object" ? JSON.stringify(e) : String(e);
  return /^[=+\-@\t\r]/.test(a) && (a = `'${a}`), /[",\n\r]/.test(a) ? `"${a.replace(/"/g, '""')}"` : a;
}
function va(e, a) {
  const n = e === "events" ? da : ha;
  return `\uFEFF${[n.join(","), ...a.map((r) => n.map((c) => ma(r[c])).join(","))].join(`\r
`)}\r
`;
}
const pa = (e) => e.map((a) => {
  const { children: n, ...i } = a;
  return JSON.stringify(i);
}).join(`
`) + `
`;
function De(e, a, n) {
  const i = URL.createObjectURL(new Blob([e], { type: n })), r = document.createElement("a");
  r.href = i, r.download = a, r.click(), setTimeout(() => URL.revokeObjectURL(i), 1e3);
}
const fa = /(-?)(?:([a-z_]+):)?("([^"]*)"?|\S+)/g;
function re(e) {
  const a = [];
  for (const n of e.matchAll(fa)) {
    let i = n[3].startsWith('"') ? n[4] ?? "" : n[3], r = n[2] ?? null;
    r && i.startsWith("//") && (i = `${r}:${i}`, r = null), i && a.push({ field: r, value: i, negated: n[1] === "-", text: n[0] });
  }
  return a;
}
const ga = (e, a) => re(e).filter((n) => n !== a && n.text !== a.text).map((n) => n.text).join(" "), Pe = (e) => /\s/.test(e) ? `"${e.replace(/"/g, "")}"` : e, Ot = [
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
], Fe = (e) => Ot.filter((a) => a.kinds.includes(e)), ba = { events: ["origin", "outcome", "session"], requests: ["origin", "session"] }, ya = (e) => [...Fe(e).map((a) => a.field), ...ba[e]], Na = (e) => {
  var a;
  return ((a = Ot.find((n) => n.field === e)) == null ? void 0 : a.label) ?? ce(R(e));
};
function ka(e, a, n, i = {}) {
  const r = e.startsWith("-"), c = r ? e.slice(1) : e, h = r ? "-" : "", v = c.indexOf(":");
  if (v < 0)
    return Fe(a).filter((y) => y.field.startsWith(c.toLowerCase()) || y.label.toLowerCase().startsWith(c.toLowerCase())).map((y) => ({ insert: `${h}${y.field}:`, label: `${y.field}:`, hint: y.hint }));
  const d = c.slice(0, v), b = c.slice(v + 1).toLowerCase();
  return (() => {
    const y = (m) => (i[m] ?? []).filter((g) => g.value).map((g) => ({ insert: g.value, label: g.value, hint: g.count.toLocaleString() }));
    switch (d) {
      case "action":
        return Object.entries((n == null ? void 0 : n.actions) ?? {}).map(([m, g]) => ({ insert: m, label: m, hint: g.title }));
      case "category":
        return [...new Set(Object.values((n == null ? void 0 : n.actions) ?? {}).map((m) => m.category))].map((m) => ({ insert: m, label: m }));
      case "actor_type":
        return Object.entries((n == null ? void 0 : n.actor_types) ?? {}).map(([m, g]) => ({ insert: m, label: m, hint: g }));
      case "result":
        return ["success", "failed", "refused"].map((m) => ({ insert: m, label: m }));
      case "method":
        return ["GET", "POST", "PUT", "PATCH", "DELETE"].map((m) => ({ insert: m, label: m }));
      case "status":
        return ["2xx", "4xx", "5xx"].map((m) => ({ insert: m, label: m }));
      case "on":
        return Object.entries((n == null ? void 0 : n.entities) ?? {}).filter(([m]) => !m.includes("_")).map(([m, g]) => ({ insert: `${m}:`, label: `${m}:`, hint: g }));
      case "app":
        return y("origin");
      case "service":
        return y("service");
      default:
        return [];
    }
  })().filter((y) => y.insert.toLowerCase().startsWith(b) || y.insert.toLowerCase().split(/[._:]/).some((m) => m.startsWith(b)) || (y.hint ?? "").toLowerCase().split(/\s+/).some((m) => m.startsWith(b))).slice(0, 12).map((y) => ({ ...y, insert: `${h}${d}:${y.insert.endsWith(":") ? y.insert : Pe(y.insert)}` }));
}
const fe = 6e4, Q = 1440, Sa = [15, 30, 60, 120, 180, 360, 720, 1440, 2880, 10080, 20160, 43200], pt = 7, _a = new Intl.NumberFormat(void 0, { notation: "compact", maximumFractionDigits: 1 });
function wa(e) {
  const a = e.bucket_minutes * fe, n = new Map(e.buckets.map((r) => [z(r.at), r.count])), i = [];
  for (let r = Math.floor(z(e.occurred_from) / a) * a; r < z(e.occurred_to); r += a)
    i.push({ at: r, count: n.get(r) ?? 0 });
  return i;
}
function Ca(e) {
  return e % Q === 0 ? e === Q ? "Daily bars" : `${e / Q}-day bars` : e % 60 === 0 ? e === 60 ? "Hourly bars" : `${e / 60}-hour bars` : `${e}-minute bars`;
}
function Le(e, a) {
  return a >= Q ? ee(e) : `${Y(e)}, ${qe(e)} – ${qe(e + a * fe)}`;
}
function $a(e, a) {
  if (e.length < 2) return [];
  const n = (e[e.length - 1].at - e[0].at) / fe, i = Sa.find((h) => h >= a && h % a === 0 && n / h <= pt) ?? a * Math.ceil(e.length / pt), r = i >= Q, c = [];
  return e.forEach((h, v) => {
    if (h.at % (i * fe) !== 0) return;
    const d = c[c.length - 1], b = !d || Y(e[d.index].at) !== Y(h.at);
    c.push({ index: v, top: r ? Y(h.at) : qe(h.at), bottom: !r && b ? Y(h.at) : "" });
  }), c;
}
function Ta({ chart: e, noun: a, loading: n }) {
  const i = oe(() => e ? wa(e) : [], [e]), [r, c] = E(null), h = i.reduce((g, k) => g + k.count, 0), v = i.reduce((g, k) => Math.max(g, k.count), 0), d = i.find((g) => g.count === v && v > 0), b = (e == null ? void 0 : e.bucket_minutes) ?? Q, N = oe(() => $a(i, b), [i, b]), y = a.replace(/s$/, ""), m = r !== null ? i[r] : void 0;
  return /* @__PURE__ */ s("div", { className: "ahv-chart", children: [
    /* @__PURE__ */ s("div", { className: "ahv-chart-head", children: [
      /* @__PURE__ */ s("span", { children: [
        /* @__PURE__ */ t("strong", { className: "ahv-num", children: n && !e ? "…" : h.toLocaleString() }),
        " ",
        h === 1 ? y : a,
        e && /* @__PURE__ */ s("span", { className: "ahv-dim", children: [
          " · ",
          Y(z(e.occurred_from)),
          " – ",
          ee(z(e.occurred_to) - 1),
          " UTC"
        ] })
      ] }),
      e && /* @__PURE__ */ s("span", { className: "ahv-dim", children: [
        d && /* @__PURE__ */ s(U, { children: [
          "Peak ",
          /* @__PURE__ */ t("strong", { className: "ahv-num", children: d.count.toLocaleString() }),
          " at ",
          Le(d.at, b).split(" – ")[0],
          " · "
        ] }),
        Ca(b)
      ] })
    ] }),
    /* @__PURE__ */ s(
      "div",
      {
        className: "ahv-chart-plot",
        role: "img",
        "aria-label": `${h.toLocaleString()} ${a}${d ? `, most at ${Le(d.at, b)} UTC (${d.count})` : ""}`,
        onMouseMove: (g) => {
          if (!i.length) return;
          const k = g.currentTarget.getBoundingClientRect();
          c(Math.min(i.length - 1, Math.max(0, Math.floor((g.clientX - k.left) / k.width * i.length))));
        },
        onMouseLeave: () => c(null),
        children: [
          v > 0 && /* @__PURE__ */ t("span", { className: "ahv-chart-max ahv-num", children: _a.format(v) }),
          /* @__PURE__ */ t("svg", { viewBox: `0 0 ${Math.max(i.length, 1)} 100`, preserveAspectRatio: "none", className: "ahv-chart-svg", children: i.map((g, k) => {
            const f = v ? Math.max(g.count / v * 100, g.count ? 2 : 0) : 0;
            return /* @__PURE__ */ t(
              "rect",
              {
                x: k + 0.12,
                width: 0.76,
                y: 100 - f,
                height: f,
                className: k === r ? "ahv-bar ahv-bar-on" : "ahv-bar"
              },
              g.at
            );
          }) }),
          !n && h === 0 && /* @__PURE__ */ s("span", { className: "ahv-chart-empty", children: [
            "No ",
            a,
            " in this period"
          ] }),
          m && /* @__PURE__ */ s("div", { className: "ahv-tip", style: { left: `${(r + 0.5) / i.length * 100}%` }, children: [
            /* @__PURE__ */ t("strong", { className: "ahv-num", children: m.count ? `${m.count.toLocaleString()} ${m.count === 1 ? y : a}` : `No ${a}` }),
            /* @__PURE__ */ s("span", { children: [
              Le(m.at, b),
              " UTC"
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ t("div", { className: "ahv-chart-axis", "aria-hidden": "true", children: N.map((g) => /* @__PURE__ */ s("span", { style: { left: `${(g.index + 0.5) / i.length * 100}%` }, children: [
      g.top,
      g.bottom && /* @__PURE__ */ t("b", { children: g.bottom })
    ] }, g.index)) })
  ] });
}
const q = (...e) => e.filter(Boolean).join(" "), Lt = (e) => F(e) ? e.actor : ra(e), Ie = (e, a = {}) => F(e) ? e.actor_label : a[e.actor_type] || ce(R(e.actor_type)) || "Unknown", Ue = {
  sealed: "Sealed: kept unchanged since its minute ended",
  waiting: "Waiting for its seal: each minute is sealed two minutes after it ends"
};
function Ea({ value: e, seal: a }) {
  return /* @__PURE__ */ s("span", { className: "ahv-when", title: `${e} UTC`, children: [
    /* @__PURE__ */ s("span", { className: "ahv-mono", children: [
      be(e),
      a && /* @__PURE__ */ t("span", { className: q("ahv-seal", a === "waiting" && "ahv-seal-waiting"), title: Ue[a], "aria-label": Ue[a], children: /* @__PURE__ */ t(x, { name: a === "sealed" ? "shield" : "history", size: 11 }) })
    ] }),
    /* @__PURE__ */ t("span", { className: "ahv-dim", children: Be(e) })
  ] });
}
const Oa = (e) => e ? Ue[e] : "";
function La({ onClick: e, title: a, children: n }) {
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
      children: n
    }
  ) : /* @__PURE__ */ t(U, { children: n });
}
function xa({ row: e, actorTypes: a, onFocus: n }) {
  const i = Lt(e), r = Ie(e, a), c = e.actor_type !== "system" && e.actor_id && e.actor_id !== i ? e.actor_id : "";
  return /* @__PURE__ */ s("span", { className: "ahv-who", children: [
    /* @__PURE__ */ t("span", { className: q("ahv-avatar", e.actor_type === "system" && "ahv-avatar-system"), "aria-hidden": "true", children: la(i) }),
    /* @__PURE__ */ s("span", { className: "ahv-stack", children: [
      /* @__PURE__ */ t(La, { title: `Only activity by ${i}`, onClick: e.actor_id ? n : void 0, children: /* @__PURE__ */ t("span", { className: "ahv-strong ahv-clip", children: i }) }),
      /* @__PURE__ */ t("span", { className: "ahv-dim ahv-clip", children: [r, c].filter(Boolean).join(" · ") })
    ] })
  ] });
}
function Ma({ row: e }) {
  return /* @__PURE__ */ s("span", { className: "ahv-where", children: [
    e.origin && /* @__PURE__ */ t("span", { className: "ahv-tag", children: R(e.origin) }),
    e.country && /* @__PURE__ */ t("span", { className: "ahv-dim", title: e.ip || void 0, children: e.country })
  ] });
}
function Ke({ outcome: e }) {
  return e === "success" ? null : /* @__PURE__ */ t("span", { className: q("ahv-tag", e === "failed" ? "ahv-tag-bad" : "ahv-tag-warn"), children: e });
}
const qa = (e) => e >= 500 ? "ahv-tag-bad" : e >= 400 ? "ahv-tag-warn" : "ahv-tag-ok", xt = ({ status: e }) => /* @__PURE__ */ t("span", { className: q("ahv-tag ahv-mono", qa(e)), children: e }), Mt = ({ method: e }) => /* @__PURE__ */ t("span", { className: q("ahv-tag ahv-mono", `ahv-method-${e.toLowerCase()}`), children: e });
function Aa({ row: e }) {
  var n;
  const a = e.children_count ?? ((n = e.children) == null ? void 0 : n.length) ?? 0;
  return /* @__PURE__ */ s("span", { className: "ahv-what", children: [
    e.importance === "high" && e.outcome === "success" && /* @__PURE__ */ t("span", { className: "ahv-mark", title: "Worth attention" }),
    e.outcome !== "success" && /* @__PURE__ */ t(x, { name: "alert", size: 14, className: e.outcome === "failed" ? "ahv-bad" : "ahv-warn" }),
    /* @__PURE__ */ t("span", { className: "ahv-sentence", children: e.summary }),
    a > 0 && /* @__PURE__ */ s("span", { className: "ahv-count", title: `${a} record change${a === 1 ? "" : "s"} made by the same request`, children: [
      /* @__PURE__ */ t(x, { name: "layers", size: 12 }),
      a
    ] })
  ] });
}
function qt({ row: e }) {
  return /* @__PURE__ */ s("span", { className: "ahv-what", children: [
    /* @__PURE__ */ t(Mt, { method: e.method }),
    /* @__PURE__ */ t("span", { className: "ahv-mono ahv-clip", children: e.route }),
    /* @__PURE__ */ t(xt, { status: e.status }),
    /* @__PURE__ */ s("span", { className: "ahv-dim ahv-num", children: [
      e.duration_ms,
      " ms"
    ] })
  ] });
}
function Z({ tone: e = "plain", children: a, action: n }) {
  return /* @__PURE__ */ s("div", { className: q("ahv-message", e === "bad" && "ahv-message-bad"), role: e === "bad" ? "alert" : void 0, children: [
    /* @__PURE__ */ t("span", { children: a }),
    n
  ] });
}
function He({ rows: e = 6 }) {
  return /* @__PURE__ */ t("div", { className: "ahv-skeleton", "aria-busy": "true", children: Array.from({ length: e }, (a, n) => /* @__PURE__ */ t("span", {}, n)) });
}
const Ra = 200, Da = Xt(null);
function B({ title: e, children: a }) {
  return /* @__PURE__ */ s("section", { className: "ahv-section", children: [
    /* @__PURE__ */ t("h3", { children: e }),
    a
  ] });
}
function X({ items: e }) {
  const a = e.filter(([, n]) => n != null && n !== "");
  return a.length ? /* @__PURE__ */ t("dl", { className: "ahv-facts", children: a.map(([n, i]) => /* @__PURE__ */ s("div", { children: [
    /* @__PURE__ */ t("dt", { children: n }),
    /* @__PURE__ */ t("dd", { children: typeof i == "object" ? JSON.stringify(i) : String(i) })
  ] }, n)) }) : null;
}
function Pa({ event: e }) {
  const a = e.change_list;
  if (!(a != null && a.length)) return null;
  const n = a.every((r) => r.before === null), i = a.every((r) => r.after === null);
  return /* @__PURE__ */ t(B, { title: n ? "Recorded values" : i ? "Values removed" : "Changes", children: /* @__PURE__ */ t("div", { className: "ahv-scroll-x", children: /* @__PURE__ */ s("table", { className: "ahv-changes", children: [
    /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ s("tr", { children: [
      /* @__PURE__ */ t("th", { children: "Field" }),
      !n && /* @__PURE__ */ t("th", { children: "Before" }),
      !i && /* @__PURE__ */ t("th", { children: "After" })
    ] }) }),
    /* @__PURE__ */ t("tbody", { children: a.map((r) => /* @__PURE__ */ s("tr", { children: [
      /* @__PURE__ */ t("td", { children: r.label }),
      !n && /* @__PURE__ */ t("td", { className: q("ahv-mono", !i && "ahv-before"), children: r.before ?? "—" }),
      !i && /* @__PURE__ */ t("td", { className: q("ahv-mono", !n && "ahv-after"), children: r.after ?? "—" })
    ] }, r.field)) })
  ] }) }) });
}
function Ia({ text: e }) {
  const [a, n] = E(!1);
  return /* @__PURE__ */ s("button", { type: "button", className: "ahv-button ahv-button-quiet", onClick: () => {
    var i;
    (i = navigator.clipboard) == null || i.writeText(e).then(() => {
      n(!0), setTimeout(() => n(!1), 1500);
    });
  }, children: [
    /* @__PURE__ */ t(x, { name: a ? "check" : "copy", size: 14 }),
    a ? "Copied" : "Copy"
  ] });
}
function Ua({ row: e }) {
  const [a, n] = E(!1), { children: i, details: r, ...c } = e, h = JSON.stringify(c, null, 2);
  return /* @__PURE__ */ s("section", { className: "ahv-section", children: [
    /* @__PURE__ */ s("div", { className: "ahv-row-between", children: [
      /* @__PURE__ */ s("button", { type: "button", className: "ahv-disclose", "aria-expanded": a, onClick: () => n((v) => !v), children: [
        /* @__PURE__ */ t(x, { name: "chevronDown", size: 14, className: q(a && "ahv-turned") }),
        "Full record (JSON)"
      ] }),
      /* @__PURE__ */ t(Ia, { text: h })
    ] }),
    a && /* @__PURE__ */ t("pre", { className: "ahv-pre", children: h })
  ] });
}
function ja({ open: e, events: a, calls: n, onOpen: i }) {
  const r = [...a, ...n].sort((c, h) => c.occurred_at.localeCompare(h.occurred_at));
  return r.length ? /* @__PURE__ */ t("ol", { className: "ahv-list", children: r.map((c) => /* @__PURE__ */ t("li", { children: /* @__PURE__ */ s("button", { type: "button", disabled: c.id === e.id, onClick: () => i(c), children: [
    /* @__PURE__ */ t("span", { className: "ahv-mono ahv-dim", children: be(c.occurred_at) }),
    F(c) ? /* @__PURE__ */ s("span", { className: "ahv-what", children: [
      /* @__PURE__ */ t("span", { className: "ahv-sentence", children: c.summary }),
      /* @__PURE__ */ t(Ke, { outcome: c.outcome })
    ] }) : /* @__PURE__ */ t(qt, { row: c })
  ] }) }, c.id)) }) : /* @__PURE__ */ t("p", { className: "ahv-dim", children: "Nothing else was recorded for this request." });
}
function Wa(e, a) {
  const n = F(a);
  return I(`${a.id}`, async () => {
    if (n) return e(`events/${a.id}`, { method: "GET" });
    if (!a.request_id) return { same_request: [], requests: [] };
    const i = (h) => e("search", {
      method: "POST",
      body: { kind: h, filters: { request_id: a.request_id }, limit: Ra }
    }), [r, c] = await Promise.all([i("events"), i("requests")]);
    return { same_request: r.items, requests: c.items.filter((h) => h.id !== a.id) };
  });
}
function At({ request: e, row: a, onClose: n, onFocus: i, actorTypes: r, entities: c, seal: h }) {
  const [v, d] = E(a);
  K(() => d(a), [a]);
  const b = D(null), N = D(null), y = D(n);
  y.current = n;
  const m = v !== null;
  K(() => {
    var S, o;
    if (!m) return;
    const k = ((S = b.current) == null ? void 0 : S.getRootNode()) ?? document, f = k.activeElement ?? document.activeElement;
    (o = b.current) == null || o.focus();
    const T = (p) => {
      if (p.key === "Escape")
        p.stopPropagation(), y.current();
      else if (p.key === "Tab" && N.current) {
        const _ = [...N.current.querySelectorAll("button:not(:disabled), [href], input, select, [tabindex]:not([tabindex='-1'])")], M = k.activeElement;
        if (!_.length) return;
        p.shiftKey && M === _[0] ? (p.preventDefault(), _[_.length - 1].focus()) : !p.shiftKey && M === _[_.length - 1] ? (p.preventDefault(), _[0].focus()) : N.current.contains(M) || (p.preventDefault(), _[0].focus());
      }
    };
    return window.addEventListener("keydown", T, !0), () => {
      var p;
      window.removeEventListener("keydown", T, !0), (p = f == null ? void 0 : f.focus) == null || p.call(f);
    };
  }, [m]);
  const g = Gt(Da);
  return v ? Qt(
    /* @__PURE__ */ s("div", { className: "ahv ahv-drawer-layer", children: [
      /* @__PURE__ */ t("div", { className: "ahv-backdrop", onClick: n }),
      /* @__PURE__ */ s("aside", { ref: N, className: "ahv-drawer", role: "dialog", "aria-modal": "true", "aria-label": "Activity details", children: [
        /* @__PURE__ */ t("button", { ref: b, type: "button", className: "ahv-icon-button ahv-drawer-close", onClick: n, "aria-label": "Close", children: /* @__PURE__ */ t(x, { name: "close" }) }),
        /* @__PURE__ */ t(
          za,
          {
            request: e,
            row: v,
            onOpen: d,
            onFocus: i,
            actorTypes: r,
            entities: c,
            seal: v === a ? h : null
          },
          v.id
        )
      ] })
    ] }),
    g ?? document.body
  ) : null;
}
function za({ request: e, row: a, onOpen: n, onFocus: i, actorTypes: r, entities: c = {}, seal: h }) {
  var m, g, k, f;
  const v = Wa(e, a), d = F(a) ? ((m = v.data) == null ? void 0 : m.event) ?? a : null, b = Lt(a), N = d != null && d.target_type ? `${c[d.target_type] ?? R(d.target_type)} ${d.target_name || d.target_id}` : "", y = `${ee(z(a.occurred_at))}, ${be(a.occurred_at)} UTC`;
  return /* @__PURE__ */ s("div", { className: "ahv-drawer-body", children: [
    /* @__PURE__ */ s("header", { className: "ahv-drawer-head", children: [
      d ? /* @__PURE__ */ s(U, { children: [
        /* @__PURE__ */ s("div", { className: "ahv-tags", children: [
          /* @__PURE__ */ t("span", { className: "ahv-tag", children: d.title }),
          /* @__PURE__ */ t(Ke, { outcome: d.outcome }),
          d.importance === "high" && /* @__PURE__ */ t("span", { className: "ahv-tag ahv-tag-accent", children: "Worth attention" }),
          d.imported && /* @__PURE__ */ t("span", { className: "ahv-tag", children: "Imported" })
        ] }),
        /* @__PURE__ */ t("h2", { children: d.summary })
      ] }) : /* @__PURE__ */ s(U, { children: [
        /* @__PURE__ */ s("div", { className: "ahv-tags", children: [
          /* @__PURE__ */ t(Mt, { method: a.method }),
          /* @__PURE__ */ t(xt, { status: a.status })
        ] }),
        /* @__PURE__ */ t("h2", { className: "ahv-mono", children: a.route })
      ] }),
      /* @__PURE__ */ s("p", { className: "ahv-dim", children: [
        b,
        " · ",
        Ie(a, r),
        " · ",
        y
      ] }),
      i && /* @__PURE__ */ s("div", { className: "ahv-actions", children: [
        a.actor_id && /* @__PURE__ */ s("button", { type: "button", className: "ahv-button", onClick: () => i({ actor_id: a.actor_id }), children: [
          /* @__PURE__ */ t(x, { name: "user", size: 14 }),
          "All by ",
          b
        ] }),
        (d == null ? void 0 : d.target_type) && /* @__PURE__ */ s(
          "button",
          {
            type: "button",
            className: "ahv-button",
            onClick: () => i({ target_type: d.target_type, target_id: d.target_id }),
            children: [
              /* @__PURE__ */ t(x, { name: "history", size: 14 }),
              "Timeline of ",
              N
            ]
          }
        )
      ] })
    ] }),
    d ? /* @__PURE__ */ s(U, { children: [
      d.outcome !== "success" && d.reason && /* @__PURE__ */ t(B, { title: "Reason", children: /* @__PURE__ */ t("p", { children: d.reason }) }),
      /* @__PURE__ */ t(Pa, { event: d }),
      (g = d.details) != null && g.length ? /* @__PURE__ */ t(B, { title: "Details", children: /* @__PURE__ */ t(X, { items: d.details.map((T) => [T.label, T.value]) }) }) : d.metadata && !v.loading ? /* @__PURE__ */ t(B, { title: "Details", children: /* @__PURE__ */ t(X, { items: Object.entries(d.metadata).map(([T, S]) => [ce(R(T)), S]) }) }) : null,
      (N || d.related.length > 0) && /* @__PURE__ */ t(B, { title: "Concerns", children: /* @__PURE__ */ t(X, { items: [
        ["Target", N],
        ...d.related.map(([T, S]) => [ce(c[T] ?? R(T)), S])
      ] }) })
    ] }) : /* @__PURE__ */ s(U, { children: [
      /* @__PURE__ */ t(B, { title: "Request", children: /* @__PURE__ */ t(X, { items: [["Path", a.path], ["Took", `${a.duration_ms} ms`], ["Service", R(a.service)]] }) }),
      a.request_body && /* @__PURE__ */ t(B, { title: "Sent (secrets masked)", children: /* @__PURE__ */ t("pre", { className: "ahv-pre", children: JSON.stringify(a.request_body, null, 2) }) })
    ] }),
    a.request_id && /* @__PURE__ */ t(B, { title: "Same request", children: v.error ? /* @__PURE__ */ s(Z, { tone: "bad", action: /* @__PURE__ */ t("button", { type: "button", className: "ahv-button", onClick: v.refresh, children: "Retry" }), children: [
      "Couldn't load: ",
      v.error.message
    ] }) : v.loading && !v.data ? /* @__PURE__ */ t(He, { rows: 2 }) : /* @__PURE__ */ t(ja, { open: a, events: ((k = v.data) == null ? void 0 : k.same_request) ?? [], calls: ((f = v.data) == null ? void 0 : f.requests) ?? [], onOpen: n }) }),
    /* @__PURE__ */ t(B, { title: "Who and from where", children: /* @__PURE__ */ t(X, { items: [
      ["Who", `${b} (${Ie(a, r)}${a.actor_id && a.actor_id !== b ? ` ${a.actor_id}` : ""})`],
      ["App", a.origin && R(a.origin)],
      ["Country", a.country],
      ["IP address", a.ip],
      ["Device", d ? d.device : a.user_agent],
      ["Session", a.session_id],
      ["Company", a.tenant_id],
      ["Service", R(a.service)]
    ] }) }),
    /* @__PURE__ */ t(B, { title: "Reference", children: /* @__PURE__ */ t(X, { items: [
      ["Record id", a.id],
      ["Request id", a.request_id],
      ["Recorded", `${a.received_at} UTC`],
      ["Integrity", Oa(h ?? null)],
      ...d ? [["Action", d.action]] : []
    ] }) }),
    /* @__PURE__ */ t(Ua, { row: d ?? a })
  ] });
}
const ft = 65, je = { events: "Events", access_logs: "Requests" }, Ba = 20, gt = (e, a = Date.now()) => (a - Date.parse(`${e.replace(" ", "T")}:00Z`)) / 6e4, Fa = () => new Date(Date.now() - 864e5).toISOString().slice(0, 10);
function Ka(e, a, n) {
  var r;
  const i = (r = n == null ? void 0 : n.sealed_until) == null ? void 0 : r[a];
  return i ? e.slice(0, 16) <= i ? "sealed" : "waiting" : null;
}
function Ha({ request: e, status: a }) {
  var _, M;
  const [n, i] = E(!1), [r, c] = E(Fa), [h, v] = E(!1), [d, b] = E(null), N = D(null), y = I(
    a != null && a.checks ? "integrity" : null,
    () => e("integrity", { method: "GET" })
  ), m = !!(a != null && a.checks && ((_ = y.data) != null && _.allowed));
  if (!a) return null;
  const g = Object.entries(a.sealed_until ?? {}), k = a.last_daily, f = (M = a.stats) == null ? void 0 : M.queued;
  if (!g.length && a.recording === void 0 && !k) return null;
  const T = async (O) => {
    v(!0);
    try {
      b(await O());
    } catch (u) {
      b({ kind: "error", message: u.message });
    } finally {
      v(!1);
    }
  }, S = () => T(async () => ({ kind: "day", ...await e("integrity/verify", { method: "POST", body: { day: r } }) })), o = () => T(async () => {
    const O = await e(`integrity/seal/${r}`, { method: "GET" });
    return De(`${JSON.stringify(O, null, 2)}
`, `activity-seal-${r}.json`, "application/json"), { kind: "downloaded", day: r };
  }), p = (O) => T(async () => {
    let u;
    try {
      u = JSON.parse(await O.text());
    } catch {
      u = {};
    }
    if (!u || !Array.isArray(u.seals) || !u.seals.length)
      throw new Error(`${O.name} is not a seal record: choose a proof downloaded here (activity-seal-<day>.json)`);
    const C = await e("integrity/check", { method: "POST", body: { record: u } });
    return { kind: "proof", name: O.name, day: String(u.day ?? ""), ...C };
  });
  return /* @__PURE__ */ s("div", { className: "ahv-status-wrap", children: [
    /* @__PURE__ */ s("div", { className: "ahv-status", role: "status", children: [
      /* @__PURE__ */ t(x, { name: "shield", size: 14 }),
      a.recording !== void 0 && /* @__PURE__ */ t("span", { className: q("ahv-tag", a.recording ? "ahv-tag-ok" : "ahv-tag-bad"), children: a.recording ? "Recording" : "Not recording" }),
      f !== void 0 && /* @__PURE__ */ s("span", { children: [
        "Waiting to be written ",
        /* @__PURE__ */ t("strong", { className: "ahv-num", children: f.toLocaleString() })
      ] }),
      g.map(([O, u]) => /* @__PURE__ */ s(
        "span",
        {
          className: q(gt(u) > ft && "ahv-warn"),
          title: gt(u) > ft ? "Sealing is behind" : "Every minute up to this one is sealed",
          children: [
            je[O] ?? O,
            " sealed through ",
            /* @__PURE__ */ t("strong", { className: "ahv-num", children: u })
          ]
        },
        O
      )),
      k && /* @__PURE__ */ s("span", { children: [
        "Check of ",
        k.day,
        ":",
        " ",
        /* @__PURE__ */ t("strong", { className: k.ok === !1 ? "ahv-bad" : k.ok ? "ahv-ok" : "ahv-warn", children: k.ok === !1 ? `${k.problems ?? ""} problem(s)`.trim() : k.ok ? "intact" : "not checked" })
      ] }),
      m && /* @__PURE__ */ t("button", { type: "button", className: "ahv-link-button ahv-push-right", "aria-expanded": n, onClick: () => i((O) => !O), children: "Check integrity" })
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
              value: r,
              max: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
              min: "2000-01-01",
              onChange: (O) => c(O.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ s("button", { type: "button", className: "ahv-button ahv-button-main", disabled: h || !r, onClick: S, children: [
          /* @__PURE__ */ t(x, { name: "shield", size: 14 }),
          h ? "Checking…" : "Check this day"
        ] }),
        /* @__PURE__ */ s(
          "button",
          {
            type: "button",
            className: "ahv-button",
            disabled: h || !r,
            onClick: o,
            title: "The day's last seal of each table, to keep outside the database",
            children: [
              /* @__PURE__ */ t(x, { name: "download", size: 14 }),
              "Download proof"
            ]
          }
        ),
        /* @__PURE__ */ s(
          "button",
          {
            type: "button",
            className: "ahv-button",
            disabled: h,
            title: "Compare a proof kept earlier with the database",
            onClick: () => {
              var O;
              return (O = N.current) == null ? void 0 : O.click();
            },
            children: [
              /* @__PURE__ */ t(x, { name: "check", size: 14 }),
              "Check a kept proof"
            ]
          }
        ),
        /* @__PURE__ */ t(
          "input",
          {
            ref: N,
            type: "file",
            accept: "application/json,.json",
            className: "ahv-hidden",
            tabIndex: -1,
            "aria-hidden": "true",
            onChange: (O) => {
              var C;
              const u = (C = O.target.files) == null ? void 0 : C[0];
              O.target.value = "", u && p(u);
            }
          }
        )
      ] }),
      d && /* @__PURE__ */ t(Ja, { verdict: d })
    ] })
  ] });
}
function Ja({ verdict: e }) {
  return e.kind === "error" ? /* @__PURE__ */ t("p", { className: "ahv-bad", role: "alert", children: e.message }) : e.kind === "day" ? /* @__PURE__ */ s("div", { role: "status", className: q("ahv-verdict", e.ok ? "ahv-verdict-ok" : "ahv-verdict-bad"), children: [
    /* @__PURE__ */ t("strong", { children: e.ok ? `${e.day}: intact. ${e.rows.toLocaleString()} records in ${e.checked.toLocaleString()} sealed minutes match their seals.` : `${e.day}: ${(e.problems.length + e.more).toLocaleString()} problem(s) found.` }),
    !e.ok && /* @__PURE__ */ s("ul", { children: [
      e.problems.slice(0, Ba).map((a, n) => /* @__PURE__ */ s("li", { children: [
        /* @__PURE__ */ t("span", { className: "ahv-mono", children: a.window_start }),
        " ",
        je[a.table] ?? a.table,
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
      je[a.table] ?? a.table,
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
function bt(e, a) {
  const n = e.lastIndexOf(" ", a - 1) + 1, i = e.indexOf(" ", a);
  return { start: n, end: i < 0 ? e.length : i, word: e.slice(n, i < 0 ? e.length : i) };
}
function Va({ value: e, onChange: a, onSubmit: n, suggestions: i, placeholder: r, inputRef: c }) {
  const h = D(null), v = c ?? h, d = Yt(), [b, N] = E(0), [y, m] = E(!1), [g, k] = E(0), [f, T] = E(!1), { start: S, end: o, word: p } = bt(e, b), _ = y ? i(p) : [], M = _[Math.min(g, _.length - 1)], O = (u) => {
    const C = e.slice(o), P = u.insert.endsWith(":") ? "" : " ", ye = `${e.slice(0, S)}${u.insert}${C.startsWith(" ") || !P ? "" : P}${C}`, te = S + u.insert.length + (u.insert.endsWith(":") ? 0 : 1);
    a(ye), k(0), T(!1), requestAnimationFrame(() => {
      var j, de;
      (j = v.current) == null || j.focus(), (de = v.current) == null || de.setSelectionRange(te, te), N(te);
    });
  };
  return /* @__PURE__ */ s("div", { className: "ahv-search", children: [
    /* @__PURE__ */ s("span", { className: "ahv-input-icon", children: [
      /* @__PURE__ */ t(x, { name: "search", size: 14 }),
      /* @__PURE__ */ t(
        "input",
        {
          ref: v,
          className: "ahv-input",
          role: "combobox",
          "aria-label": "Search",
          "aria-expanded": _.length > 0,
          "aria-controls": d,
          "aria-autocomplete": "list",
          "aria-activedescendant": _.length && f ? `${d}-${_.indexOf(M)}` : void 0,
          value: e,
          placeholder: r,
          spellCheck: !1,
          onChange: (u) => {
            a(u.target.value), N(u.target.selectionStart ?? u.target.value.length), m(!0), k(0), T(!1);
          },
          onSelect: (u) => {
            const C = u.currentTarget.selectionStart ?? 0;
            bt(e, C).start !== S && T(!1), N(C);
          },
          onFocus: () => m(!0),
          onBlur: () => setTimeout(() => {
            m(!1), T(!1);
          }, 120),
          onKeyDown: (u) => {
            _.length && (u.key === "ArrowDown" || u.key === "ArrowUp") ? (u.preventDefault(), k((C) => f ? (C + (u.key === "ArrowDown" ? 1 : _.length - 1)) % _.length : u.key === "ArrowDown" ? 0 : _.length - 1), T(!0)) : _.length && f && u.key === "Enter" ? (u.preventDefault(), O(M)) : u.key === "Escape" ? (m(!1), T(!1)) : u.key === "Enter" && (m(!1), n());
          }
        }
      )
    ] }),
    _.length > 0 && /* @__PURE__ */ t("ul", { id: d, role: "listbox", className: "ahv-suggest", children: _.map((u, C) => /* @__PURE__ */ s(
      "li",
      {
        id: `${d}-${C}`,
        role: "option",
        "aria-selected": f && u === M,
        className: q(f && u === M && "ahv-suggest-on"),
        onMouseDown: (P) => {
          P.preventDefault(), O(u);
        },
        onMouseEnter: () => {
          k(C), T(!0);
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
function Je({ label: e, icon: a, children: n, open: i, setOpen: r, badge: c, disabled: h }) {
  const v = D(null);
  return K(() => {
    if (!i) return;
    const d = (N) => {
      v.current && !N.composedPath().includes(v.current) && r(!1);
    }, b = (N) => N.key === "Escape" && r(!1);
    return document.addEventListener("mousedown", d), document.addEventListener("keydown", b), () => {
      document.removeEventListener("mousedown", d), document.removeEventListener("keydown", b);
    };
  }, [i, r]), /* @__PURE__ */ s("div", { className: "ahv-menu", ref: v, children: [
    /* @__PURE__ */ s("button", { type: "button", className: "ahv-button", "aria-expanded": i, disabled: h, onClick: () => r(!i), children: [
      /* @__PURE__ */ t(x, { name: a, size: 14 }),
      e,
      c && /* @__PURE__ */ t("span", { className: "ahv-count", children: c }),
      /* @__PURE__ */ t(x, { name: "chevronDown", size: 14 })
    ] }),
    i && /* @__PURE__ */ t("div", { className: "ahv-menu-list ahv-menu-panel", children: n })
  ] });
}
function Ga({ columns: e, shown: a, onChange: n }) {
  const [i, r] = E(!1);
  return /* @__PURE__ */ s(Je, { label: "Columns", icon: "sliders", open: i, setOpen: r, children: [
    /* @__PURE__ */ t("p", { className: "ahv-dim ahv-small", children: "When, who and what always show." }),
    e.map((c) => /* @__PURE__ */ s("label", { className: "ahv-check", children: [
      /* @__PURE__ */ t(
        "input",
        {
          type: "checkbox",
          checked: a.includes(c.key),
          onChange: (h) => n(h.target.checked ? [...a, c.key] : a.filter((v) => v !== c.key))
        }
      ),
      c.label
    ] }, c.key))
  ] });
}
function Xa({ request: e, current: a, onOpen: n }) {
  var o;
  const [i, r] = E(!1), c = I("views", () => e("views", { method: "GET" })), [h, v] = E(""), [d, b] = E(!1), [N, y] = E(!1), [m, g] = E(null);
  if (!((o = c.data) != null && o.enabled)) return null;
  const k = c.data.views, f = k.find((p) => p.search === a), T = async (p) => {
    y(!0), g(null);
    try {
      await p(), c.refresh(), v("");
    } catch (_) {
      g(_.message);
    } finally {
      y(!1);
    }
  }, S = (p, _ = h, M = d) => T(() => e("views", { method: "POST", body: { id: p, name: _.trim(), search: a, shared: M } }));
  return /* @__PURE__ */ s(Je, { label: f ? f.name : "Views", icon: "layers", open: i, setOpen: r, children: [
    k.length ? /* @__PURE__ */ t("ul", { className: "ahv-views", children: k.map((p) => /* @__PURE__ */ s("li", { className: q(p === f && "ahv-views-on"), children: [
      /* @__PURE__ */ s("button", { type: "button", className: "ahv-views-open", onClick: () => {
        n(p.search), r(!1);
      }, children: [
        /* @__PURE__ */ t("span", { children: p.name }),
        /* @__PURE__ */ t("span", { className: "ahv-dim ahv-small", children: p.mine ? p.shared ? "Shared by you" : "Only you" : `Shared by ${p.owner_name}` })
      ] }),
      p.mine && /* @__PURE__ */ s("span", { className: "ahv-views-tools", children: [
        p.search !== a && /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            className: "ahv-icon-button",
            title: "Save the current search into this view",
            disabled: N,
            onClick: () => S(p.id, p.name, p.shared),
            children: /* @__PURE__ */ t(x, { name: "refresh", size: 14 })
          }
        ),
        /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            className: "ahv-icon-button",
            title: "Remove this view",
            disabled: N,
            onClick: () => T(() => e(`views/${p.id}`, { method: "DELETE" })),
            children: /* @__PURE__ */ t(x, { name: "close", size: 14 })
          }
        )
      ] })
    ] }, p.id)) }) : /* @__PURE__ */ t("p", { className: "ahv-dim ahv-small", children: "No saved views yet. Save the current search to come back to it." }),
    /* @__PURE__ */ s("form", { className: "ahv-views-save", onSubmit: (p) => {
      p.preventDefault(), h.trim() && S();
    }, children: [
      /* @__PURE__ */ t(
        "input",
        {
          className: "ahv-input",
          value: h,
          maxLength: 80,
          placeholder: "Name this search",
          "aria-label": "View name",
          onChange: (p) => v(p.target.value)
        }
      ),
      /* @__PURE__ */ s("label", { className: "ahv-check", children: [
        /* @__PURE__ */ t("input", { type: "checkbox", checked: d, onChange: (p) => b(p.target.checked) }),
        "Share with my team"
      ] }),
      /* @__PURE__ */ t("button", { type: "submit", className: "ahv-button ahv-button-main", disabled: N || !h.trim(), children: "Save view" }),
      m && /* @__PURE__ */ t("span", { className: "ahv-bad ahv-small", children: m })
    ] })
  ] });
}
const Ya = { active: ["Active", "ahv-tag-ok"], failing: ["Failing", "ahv-tag-bad"], paused: ["Paused", "ahv-tag-warn"] }, yt = { events: "Events", requests: "API requests", both: "Events and API requests" }, Rt = {
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
}, xe = (e) => e.destination === "webhook" ? e.target.url ?? "" : `s3://${[e.target.bucket, e.target.prefix].filter(Boolean).join("/")}`, Nt = (e) => ({
  ...Rt,
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
function Za(e) {
  const a = {};
  for (const n of e.split(`
`)) {
    const i = n.indexOf(":");
    i > 0 && (a[n.slice(0, i).trim()] = n.slice(i + 1).trim());
  }
  return a;
}
function kt(e) {
  const a = e.destination === "webhook", n = a ? e.secret || void 0 : e.accessKey || e.secretKey ? { access_key: e.accessKey, secret_key: e.secretKey } : void 0;
  return {
    id: e.id,
    name: e.name.trim(),
    kind: e.kind,
    query: e.query.trim(),
    destination: e.destination,
    target: a ? { url: e.url.trim() } : { bucket: e.bucket.trim(), prefix: e.prefix.trim(), region: e.region.trim(), endpoint: e.endpoint.trim() },
    // header values are secrets: sent under a name the access log masks, kept encrypted
    secret: n,
    secret_headers: a ? Za(e.headers) : {},
    enabled: e.enabled,
    start: e.start
  };
}
const St = () => Array.from(crypto.getRandomValues(new Uint8Array(24)), (e) => e.toString(16).padStart(2, "0")).join("");
function Qa({ request: e, kinds: a, list: n, refresh: i }) {
  const [r, c] = E(null), [h, v] = E(!1), [d, b] = E(null), N = async (o, p) => {
    v(!0), b(null);
    try {
      return await o(), p && b({ ok: !0, text: p }), i(), !0;
    } catch (_) {
      return b({ ok: !1, text: _.message }), !1;
    } finally {
      v(!1);
    }
  }, y = async (o) => {
    o.preventDefault(), r && await N(() => e("streams", { method: "POST", body: kt(r) }), `${r.name.trim()} saved.`) && c(null);
  }, m = (o) => N(async () => {
    const p = await e(`streams/${o.id}/test`, { method: "POST" });
    if (!p.ok) throw new Error(`${o.name}: ${p.error}`);
  }, `${o.name}: the test line was delivered.`), g = (o) => N(
    () => e("streams", { method: "POST", body: { ...kt(Nt(o)), enabled: !o.enabled } }),
    `${o.name} ${o.enabled ? "paused" : "resumed"}.`
  ), k = (o) => window.confirm(`Remove ${o.name}? Nothing more is sent to ${xe(o)}.`) && N(() => e(`streams/${o.id}`, { method: "DELETE" }), `${o.name} removed.`), f = (o) => c((p) => p && { ...p, ...o }), T = a.includes("requests") ? ["events", "requests", "both"] : ["events"], S = r && !T.includes(r.kind) ? [...T, r.kind] : T;
  return /* @__PURE__ */ s("section", { className: "ahv-streams", "aria-label": "Streams", children: [
    /* @__PURE__ */ s("div", { className: "ahv-bar", children: [
      /* @__PURE__ */ t("p", { className: "ahv-dim ahv-small", children: "Each stream sends new records to your own system as they are sealed, a few minutes after they happen. Webhooks receive JSON lines signed with your secret; S3 buckets receive one gzip file per batch." }),
      !r && /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          className: "ahv-button ahv-button-main ahv-push-right",
          onClick: () => {
            b(null), c({ ...Rt, secret: St() });
          },
          children: "Add stream"
        }
      )
    ] }),
    n.streams.length > 0 && !r && /* @__PURE__ */ t("ul", { className: "ahv-stream-list", children: n.streams.map((o) => {
      const [p, _] = Ya[o.state];
      return /* @__PURE__ */ s("li", { children: [
        /* @__PURE__ */ s("div", { className: "ahv-stream-main", children: [
          /* @__PURE__ */ t("strong", { children: o.name }),
          /* @__PURE__ */ t("span", { className: q("ahv-tag", _), children: p }),
          /* @__PURE__ */ s("span", { className: "ahv-dim ahv-small", children: [
            yt[o.kind],
            o.query && /* @__PURE__ */ s(U, { children: [
              " matching ",
              /* @__PURE__ */ t("code", { className: "ahv-mono", children: o.query })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ t("span", { className: "ahv-mono ahv-dim ahv-stream-where", title: xe(o), children: xe(o) }),
        /* @__PURE__ */ s("span", { className: "ahv-small", children: [
          /* @__PURE__ */ t("strong", { className: "ahv-num", children: o.delivered.toLocaleString() }),
          " delivered",
          o.last_delivered_at && /* @__PURE__ */ s("span", { className: "ahv-dim", children: [
            ", last ",
            Be(o.last_delivered_at) || o.last_delivered_at.slice(0, 16)
          ] })
        ] }),
        /* @__PURE__ */ s("span", { className: "ahv-stream-tools", children: [
          /* @__PURE__ */ t("button", { type: "button", className: "ahv-link-button", disabled: h, onClick: () => m(o), children: "Send test" }),
          /* @__PURE__ */ t("button", { type: "button", className: "ahv-link-button", disabled: h, onClick: () => g(o), children: o.enabled ? "Pause" : "Resume" }),
          /* @__PURE__ */ t("button", { type: "button", className: "ahv-link-button", disabled: h, onClick: () => {
            b(null), c(Nt(o));
          }, children: "Edit" }),
          /* @__PURE__ */ t("button", { type: "button", className: "ahv-icon-button", title: `Remove ${o.name}`, disabled: h, onClick: () => k(o), children: /* @__PURE__ */ t(x, { name: "close", size: 14 }) })
        ] }),
        o.state === "failing" && o.error && /* @__PURE__ */ s("span", { className: "ahv-bad ahv-small", children: [
          o.error,
          ". It is tried again shortly."
        ] })
      ] }, o.id);
    }) }),
    !n.streams.length && !r && /* @__PURE__ */ t("p", { className: "ahv-dim ahv-small", children: "No streams yet." }),
    r && /* @__PURE__ */ s("form", { className: "ahv-stream-form", onSubmit: y, children: [
      /* @__PURE__ */ s("label", { className: "ahv-field", children: [
        /* @__PURE__ */ t("span", { children: "Name" }),
        /* @__PURE__ */ t("input", { className: "ahv-input", required: !0, maxLength: 80, value: r.name, placeholder: "CRM intake", onChange: (o) => f({ name: o.target.value }) })
      ] }),
      /* @__PURE__ */ s("label", { className: "ahv-field", children: [
        /* @__PURE__ */ t("span", { children: "Records" }),
        /* @__PURE__ */ t("select", { className: "ahv-input", value: r.kind, disabled: S.length < 2, onChange: (o) => f({ kind: o.target.value }), children: S.map((o) => /* @__PURE__ */ t("option", { value: o, children: yt[o] }, o)) })
      ] }),
      /* @__PURE__ */ s("label", { className: "ahv-field ahv-field-wide", children: [
        /* @__PURE__ */ s("span", { children: [
          "Only records matching ",
          /* @__PURE__ */ t("em", { className: "ahv-dim", children: "(optional, the search language)" })
        ] }),
        /* @__PURE__ */ t(
          "input",
          {
            className: "ahv-input ahv-mono",
            maxLength: 500,
            value: r.query,
            placeholder: "action:trade.* -result:success",
            onChange: (o) => f({ query: o.target.value })
          }
        )
      ] }),
      /* @__PURE__ */ s("div", { className: "ahv-field ahv-field-wide", children: [
        /* @__PURE__ */ t("span", { children: "Send to" }),
        /* @__PURE__ */ t("div", { className: "ahv-segment", role: "group", "aria-label": "Destination", children: ["webhook", "s3"].map((o) => /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            "aria-pressed": r.destination === o,
            disabled: !!r.id,
            onClick: () => f({ destination: o, secret: o === "webhook" && !r.id ? St() : "" }),
            children: o === "webhook" ? "Webhook" : "S3 bucket"
          },
          o
        )) })
      ] }),
      r.destination === "webhook" ? /* @__PURE__ */ s(U, { children: [
        /* @__PURE__ */ s("label", { className: "ahv-field ahv-field-wide", children: [
          /* @__PURE__ */ s("span", { children: [
            "URL ",
            /* @__PURE__ */ t("em", { className: "ahv-dim", children: "(https, on the internet)" })
          ] }),
          /* @__PURE__ */ t(
            "input",
            {
              className: "ahv-input ahv-mono",
              type: "url",
              required: !0,
              value: r.url,
              placeholder: "https://crm.example.com/activity",
              onChange: (o) => f({ url: o.target.value })
            }
          )
        ] }),
        /* @__PURE__ */ s("label", { className: "ahv-field ahv-field-wide", children: [
          /* @__PURE__ */ s("span", { children: [
            "Signing secret ",
            /* @__PURE__ */ t("em", { className: "ahv-dim", children: r.id ? "(blank keeps the current one while the URL's host stays the same)" : "(copy it to your receiver: it is not shown again)" })
          ] }),
          /* @__PURE__ */ t(
            "input",
            {
              className: "ahv-input ahv-mono",
              minLength: 16,
              required: !r.id,
              value: r.secret,
              autoComplete: "off",
              onChange: (o) => f({ secret: o.target.value })
            }
          )
        ] }),
        /* @__PURE__ */ s("label", { className: "ahv-field ahv-field-wide", children: [
          /* @__PURE__ */ s("span", { children: [
            "Headers ",
            /* @__PURE__ */ t("em", { className: "ahv-dim", children: '(one "Name: value" a line, kept encrypted; on an edit a blank value keeps the stored one)' })
          ] }),
          /* @__PURE__ */ t(
            "textarea",
            {
              className: "ahv-input ahv-textarea ahv-mono",
              rows: 2,
              value: r.headers,
              placeholder: "Authorization: Bearer …",
              onChange: (o) => f({ headers: o.target.value })
            }
          )
        ] })
      ] }) : /* @__PURE__ */ s(U, { children: [
        /* @__PURE__ */ s("label", { className: "ahv-field", children: [
          /* @__PURE__ */ t("span", { children: "Bucket" }),
          /* @__PURE__ */ t("input", { className: "ahv-input", required: !0, value: r.bucket, onChange: (o) => f({ bucket: o.target.value }) })
        ] }),
        /* @__PURE__ */ s("label", { className: "ahv-field", children: [
          /* @__PURE__ */ s("span", { children: [
            "Folder ",
            /* @__PURE__ */ t("em", { className: "ahv-dim", children: "(optional)" })
          ] }),
          /* @__PURE__ */ t("input", { className: "ahv-input", value: r.prefix, placeholder: "activity", onChange: (o) => f({ prefix: o.target.value }) })
        ] }),
        /* @__PURE__ */ s("label", { className: "ahv-field", children: [
          /* @__PURE__ */ s("span", { children: [
            "Region ",
            /* @__PURE__ */ t("em", { className: "ahv-dim", children: "(optional)" })
          ] }),
          /* @__PURE__ */ t("input", { className: "ahv-input", value: r.region, placeholder: "eu-central-1", onChange: (o) => f({ region: o.target.value }) })
        ] }),
        /* @__PURE__ */ s("label", { className: "ahv-field", children: [
          /* @__PURE__ */ s("span", { children: [
            "Endpoint ",
            /* @__PURE__ */ t("em", { className: "ahv-dim", children: "(for R2, MinIO …)" })
          ] }),
          /* @__PURE__ */ t("input", { className: "ahv-input ahv-mono", type: "url", value: r.endpoint, onChange: (o) => f({ endpoint: o.target.value }) })
        ] }),
        /* @__PURE__ */ s("label", { className: "ahv-field", children: [
          /* @__PURE__ */ s("span", { children: [
            "Access key ",
            r.id && /* @__PURE__ */ t("em", { className: "ahv-dim", children: "(blank keeps it)" })
          ] }),
          /* @__PURE__ */ t("input", { className: "ahv-input ahv-mono", required: !r.id, autoComplete: "off", value: r.accessKey, onChange: (o) => f({ accessKey: o.target.value }) })
        ] }),
        /* @__PURE__ */ s("label", { className: "ahv-field", children: [
          /* @__PURE__ */ t("span", { children: "Secret key" }),
          /* @__PURE__ */ t(
            "input",
            {
              className: "ahv-input ahv-mono",
              type: "password",
              required: !r.id || !!r.accessKey,
              autoComplete: "new-password",
              value: r.secretKey,
              onChange: (o) => f({ secretKey: o.target.value })
            }
          )
        ] })
      ] }),
      !r.id && /* @__PURE__ */ s("label", { className: "ahv-field ahv-field-wide", children: [
        /* @__PURE__ */ t("span", { children: "Start with" }),
        /* @__PURE__ */ s("select", { className: "ahv-input", value: r.start, onChange: (o) => f({ start: o.target.value }), children: [
          /* @__PURE__ */ t("option", { value: "now", children: "Records from now on" }),
          /* @__PURE__ */ t("option", { value: "beginning", children: "Everything already kept, then what follows" })
        ] })
      ] }),
      /* @__PURE__ */ s("div", { className: "ahv-bar ahv-field-wide", children: [
        /* @__PURE__ */ t("button", { type: "submit", className: "ahv-button ahv-button-main", disabled: h, children: h ? "Saving…" : r.id ? "Save changes" : "Add stream" }),
        /* @__PURE__ */ t("button", { type: "button", className: "ahv-button", disabled: h, onClick: () => c(null), children: "Cancel" })
      ] })
    ] }),
    d && /* @__PURE__ */ t("p", { role: d.ok ? "status" : "alert", className: q("ahv-small", d.ok ? "ahv-ok" : "ahv-bad"), children: d.text })
  ] });
}
const _t = [
  { value: "important", label: "Important", hint: "What people did, without the details behind it" },
  { value: "all", label: "All", hint: "Every record, each request's row changes inside its event" },
  { value: "problems", label: "Problems", hint: "Only what failed or was refused" }
], en = [
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
], wt = {
  events: [
    { key: "where", label: "Where" },
    { key: "concerning", label: "Concerning" },
    { key: "result", label: "Result" },
    { key: "service", label: "Service" },
    { key: "ip", label: "IP address" }
  ],
  requests: [{ key: "where", label: "Where" }, { key: "service", label: "Service" }, { key: "ip", label: "IP address" }]
}, Ct = ["where"], tn = [], Dt = "activity-hub-columns", pe = ["kind", "view", "p", "q", "range", "from", "to", "cols"], ie = (e) => e ? "all" : "7d";
function $t(e, a) {
  const n = (c) => {
    const h = e.get(c) ?? "";
    return Ae(h) ? h : "";
  }, i = n("from"), r = n("to");
  return { q: e.get("q") ?? "", from: i, to: r, range: e.get("range") || (i || r ? "custom" : ie(a)) };
}
function an(e) {
  var n;
  if (e.range === "custom")
    return { occurred_from: Ae(e.from) ? Re(e.from) : void 0, occurred_to: Ae(e.to) ? ia(e.to) : void 0 };
  const a = (n = We.find((i) => i.value === e.range)) == null ? void 0 : n.minutes;
  return a ? { occurred_from: `${oa(a).slice(0, 16)}:00` } : {};
}
function nn(e, a, n, i, r) {
  const c = { ...(n == null ? void 0 : n.search.filters) ?? {} }, h = { kind: e, filters: c, query: i.q.trim() || void 0, ...an(i) };
  return e === "events" ? (h.view = a, h.action = n == null ? void 0 : n.search.action, r && Object.assign(h, { related_type: r.type, related_id: r.id })) : (h.status_from = n == null ? void 0 : n.search.status_from, r && (c.actor_id = r.id)), h;
}
const sn = (e) => {
  const a = new URLSearchParams();
  return e.forEach((n, i) => pe.includes(i) && a.set(i, n)), a.toString();
};
function ln() {
  try {
    return JSON.parse(localStorage.getItem(Dt) ?? "null") ?? Ct;
  } catch {
    return Ct;
  }
}
function dn({
  request: e,
  title: a = "Activity Log",
  description: n,
  presets: i = tn,
  kinds: r = ["events", "requests"],
  entity: c,
  params: h,
  onParamsChange: v,
  canExport: d = !1,
  showStatus: b = !0,
  pageSize: N = 100,
  liveEveryMs: y = 5e3,
  className: m
}) {
  var ot, ct, dt, ht, ut, mt, vt;
  const [g, k] = E(() => new URLSearchParams()), f = h ?? g, T = ze((l) => v ? v(l) : k(l), [v]), S = f.get("kind") === "requests" && r.includes("requests") ? "requests" : r[0], o = ((ot = _t.find((l) => l.value === f.get("view"))) == null ? void 0 : ot.value) ?? "important", p = oe(() => S === "events" ? [{ label: "Everything", search: {} }, ...i] : en, [S, i]), _ = Math.min(Math.max(Number(f.get("p")) || 0, 0), p.length - 1), M = f.has("cols") ? (f.get("cols") || "").split(",").filter(Boolean) : ln(), O = wt[S].filter((l) => M.includes(l.key)), u = oe(() => $t(f, c), [f, c]), [C, P] = E(u), [ye, te] = E(f.toString());
  ye !== f.toString() && (te(f.toString()), P(u));
  const [j, de] = E(!1), [Ne, he] = E(null), [ke, Se] = E(null), [Pt, Ve] = E(!1), [Ge, _e] = E(null), Xe = D(null), [, It] = E(0);
  K(() => {
    const l = setInterval(() => It((w) => w + 1), 3e4);
    return () => clearInterval(l);
  }, []);
  const H = oe(
    () => nn(S, o, p[_], u, c),
    [S, o, p, _, u, c]
  ), ue = JSON.stringify(H), A = ta(e, H, N, j, y), we = D(null), ae = I(ue, () => {
    var L;
    const l = ue, w = !H.occurred_from && ((L = we.current) == null ? void 0 : L.key) === l;
    return e("chart", { method: "POST", body: w ? { ...H, occurred_from: we.current.from } : H }).then(($) => (H.occurred_from || (we.current = { key: l, from: $.occurred_from }), $));
  }, j ? y : void 0), ne = I("catalog", () => e("catalog", { method: "GET" })), Ye = I(b ? "status" : null, () => e("status", { method: "GET" }), 6e4), se = I(d && !c ? "streams" : null, () => e("streams", { method: "GET" }), 6e4), [Ze, Ut] = E(!1), Qe = (l) => Ka(l.received_at, F(l) ? "events" : "access_logs", Ye.data), et = (l) => () => e("values", { method: "POST", body: { ...H, field: l } }).then((w) => w.values), jt = I(`${ue}|service`, et("service")), Wt = I(`${ue}|origin`, et("origin")), tt = (l = {}) => {
    const w = new URLSearchParams(f);
    for (const Oe of pe) w.delete(Oe);
    const L = l.kind ?? S;
    let $ = l.draft ?? C;
    if (L !== S) {
      const Oe = new Set(ya(L));
      $ = { ...$, q: re($.q).filter((me) => !me.field || Oe.has(me.field)).map((me) => me.text).join(" ") };
    }
    L !== r[0] && w.set("kind", L), (l.view ?? o) !== "important" && w.set("view", l.view ?? o);
    const G = l.preset ?? (l.kind && l.kind !== S ? 0 : _);
    return G && w.set("p", String(G)), $.q.trim() && w.set("q", $.q.trim()), $.range !== ie(c) && w.set("range", $.range), $.range === "custom" && ($.from && w.set("from", $.from), $.to && w.set("to", $.to)), (l.columns || f.has("cols")) && w.set("cols", (l.columns ?? M).join(",")), w;
  }, W = (l = {}) => {
    l.draft && P(l.draft), T(tt(l));
  }, zt = (l) => {
    try {
      localStorage.setItem(Dt, JSON.stringify(l));
    } catch {
    }
    W({ draft: u, columns: l });
  }, Bt = (l, w) => {
    const L = re(u.q).filter(($) => $.field !== l).map(($) => $.text);
    W({ draft: { ...u, q: [...L, `${l}:${Pe(w)}`].join(" ") } });
  }, at = (l) => {
    he(null), l.actor_id ? Bt("actor", l.actor_id) : l.target_type && l.target_id && W({
      kind: "events",
      view: "all",
      preset: 0,
      draft: { q: `on:${l.target_type}:${Pe(l.target_id)}`, range: "all", from: "", to: "" }
    });
  }, Ft = (l) => {
    const w = C.q.trim();
    P({ ...C, q: `${w ? `${w} ` : ""}${l}:` }), requestAnimationFrame(() => {
      const L = Xe.current;
      L && (L.focus(), L.setSelectionRange(L.value.length, L.value.length));
    });
  }, Kt = C.q.trim() !== u.q.trim() || C.range !== u.range || C.from !== u.from || C.to !== u.to, le = !!(C.range === "custom" && C.from && C.to && C.to < C.from), Ce = D(null), nt = D(null), { hasMore: st, loadMore: $e, more: J, pageCount: lt } = A;
  K(() => {
    if (!Ce.current || !st || J.loading || J.error || lt >= Me) return;
    const l = new IntersectionObserver(([w]) => w.isIntersecting && $e(), { root: nt.current, rootMargin: "240px" });
    return l.observe(Ce.current), () => l.disconnect();
  }, [st, $e, J.loading, J.error, lt, A.rows.length]);
  const rt = async (l) => {
    Ve(!1), Se(0);
    try {
      const { rows: w, more: L } = await ua(e, H, Se);
      L && _e(`Only the newest ${ve.toLocaleString()} rows were exported. Narrow the dates for the rest.`);
      const $ = (/* @__PURE__ */ new Date()).toISOString().slice(0, 16).replace(/[-:T]/g, ""), G = `activity-${c ? `${c.type}-${c.id}-` : ""}${S}-${$}`;
      l === "csv" ? De(va(S, w), `${G}.csv`, "text/csv;charset=utf-8") : De(pa(w), `${G}.jsonl`, "application/x-ndjson");
    } catch (w) {
      _e(`Export failed: ${w.message}`);
    } finally {
      Se(null);
    }
  }, Te = S === "events" ? "events" : "requests", Ee = ((ct = ne.data) == null ? void 0 : ct.actor_types) ?? {}, it = ((dt = ne.data) == null ? void 0 : dt.entities) ?? {}, Ht = (l) => {
    var w, L;
    if (l.field === "action") return ((L = (w = ne.data) == null ? void 0 : w.actions[l.value]) == null ? void 0 : L.title) ?? l.value;
    if (l.field === "actor_type") return Ee[l.value] ?? l.value;
    if (l.field === "on") {
      const [$, ...G] = l.value.split(":");
      return `${it[$] ?? R($)} ${G.join(":")}`;
    }
    return l.value;
  }, V = A.rows, Jt = { service: jt.data ?? [], origin: Wt.data ?? [] }, Vt = 3 + O.length;
  return c && !(c.type && c.id) ? /* @__PURE__ */ t("div", { className: q("ahv ahv-log", m), children: /* @__PURE__ */ s(Z, { children: [
    "Nothing to show: no ",
    c.type || "record",
    " chosen."
  ] }) }) : /* @__PURE__ */ s("div", { className: q("ahv ahv-log", m), children: [
    /* @__PURE__ */ s("header", { className: "ahv-head", children: [
      /* @__PURE__ */ s("div", { children: [
        /* @__PURE__ */ s("h2", { className: "ahv-title", children: [
          /* @__PURE__ */ t(x, { name: "log", size: 18 }),
          c && a === "Activity Log" ? "Activity" : a
        ] }),
        /* @__PURE__ */ t("p", { className: "ahv-dim", children: n ?? (c ? `Everything about ${c.label}, and the API requests it made itself. Times are UTC.` : "Every action and API request, kept permanently and sealed. Times are UTC.") })
      ] }),
      /* @__PURE__ */ s("div", { className: "ahv-actions", children: [
        !c && /* @__PURE__ */ t(
          Xa,
          {
            request: e,
            current: sn(tt({ draft: u })),
            onOpen: (l) => {
              const w = new URLSearchParams(f);
              for (const L of pe) w.delete(L);
              new URLSearchParams(l).forEach((L, $) => pe.includes($) && w.set($, L)), T(w);
            }
          }
        ),
        /* @__PURE__ */ t(Ga, { columns: wt[S], shown: M, onChange: zt }),
        d && /* @__PURE__ */ s(
          Je,
          {
            label: ke === null ? "Export" : `Exporting… ${ke.toLocaleString()}`,
            icon: "download",
            open: Pt,
            setOpen: Ve,
            disabled: ke !== null || !V.length,
            children: [
              /* @__PURE__ */ t("button", { type: "button", role: "menuitem", onClick: () => rt("csv"), children: "CSV, for spreadsheets" }),
              /* @__PURE__ */ t("button", { type: "button", role: "menuitem", onClick: () => rt("jsonl"), children: "JSON Lines, for other tools" })
            ]
          }
        ),
        ((ht = se.data) == null ? void 0 : ht.enabled) && /* @__PURE__ */ s(
          "button",
          {
            type: "button",
            className: "ahv-button",
            "aria-expanded": Ze,
            onClick: () => Ut((l) => !l),
            title: "Send the log to your own systems as it is written",
            children: [
              /* @__PURE__ */ t(x, { name: "send", size: 14 }),
              "Streams",
              se.data.streams.some((l) => l.state === "failing") && /* @__PURE__ */ t("span", { className: "ahv-count ahv-count-bad", children: "!" })
            ]
          }
        ),
        /* @__PURE__ */ s(
          "button",
          {
            type: "button",
            className: q("ahv-button", j && "ahv-button-live"),
            "aria-pressed": j,
            title: "Check for new activity every few seconds",
            onClick: () => de((l) => !l),
            children: [
              /* @__PURE__ */ t(x, { name: "live", size: 14, className: q(j && "ahv-pulse") }),
              j ? "Live" : "Go live"
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
              A.refresh(), ae.refresh();
            },
            children: [
              /* @__PURE__ */ t(x, { name: "refresh", size: 14, className: q(A.refreshing && !j && "ahv-spin") }),
              "Refresh"
            ]
          }
        )
      ] })
    ] }),
    Ze && ((ut = se.data) == null ? void 0 : ut.enabled) && /* @__PURE__ */ t(Qa, { request: e, kinds: r, list: se.data, refresh: se.refresh }),
    b && !c && /* @__PURE__ */ t(Ha, { request: e, status: Ye.data }),
    /* @__PURE__ */ s("div", { className: "ahv-filters", children: [
      /* @__PURE__ */ s("div", { className: "ahv-bar", children: [
        r.length > 1 && /* @__PURE__ */ t("div", { className: "ahv-segment", role: "group", "aria-label": "Records", children: r.map((l) => /* @__PURE__ */ t("button", { type: "button", "aria-pressed": S === l, onClick: () => W({ kind: l, draft: u }), children: l === "events" ? "Events" : "API requests" }, l)) }),
        S === "events" && /* @__PURE__ */ t("div", { className: "ahv-segment", role: "group", "aria-label": "Show", children: _t.map((l) => /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            title: l.hint,
            "aria-pressed": o === l.value,
            onClick: () => W({ view: l.value, draft: u }),
            children: l.label
          },
          l.value
        )) }),
        p.length > 1 && /* @__PURE__ */ t("div", { className: "ahv-chips", role: "group", "aria-label": "Presets", children: p.map((l, w) => /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            className: "ahv-chip",
            "aria-pressed": _ === w,
            onClick: () => W({ preset: w, draft: u }),
            children: l.label
          },
          l.label
        )) })
      ] }),
      /* @__PURE__ */ s("div", { className: "ahv-searchbar", children: [
        /* @__PURE__ */ t(
          Va,
          {
            value: C.q,
            inputRef: Xe,
            onChange: (l) => P({ ...C, q: l }),
            onSubmit: () => !le && W({ draft: C }),
            suggestions: (l) => ka(l, S, ne.data, Jt),
            placeholder: S === "events" ? "Search: words, or actor:… action:trade.* -result:success on:account:100234" : "Search: words, or actor:… method:POST status:4xx route:/trading/*"
          }
        ),
        /* @__PURE__ */ t(
          "select",
          {
            className: "ahv-input ahv-range",
            value: C.range,
            "aria-label": "When",
            onChange: (l) => P({ ...C, range: l.target.value }),
            children: We.map((l) => /* @__PURE__ */ t("option", { value: l.value, children: l.label }, l.value))
          }
        ),
        C.range === "custom" && /* @__PURE__ */ s("span", { className: "ahv-pair", children: [
          /* @__PURE__ */ t(
            "input",
            {
              type: "date",
              className: "ahv-input",
              value: C.from,
              "aria-label": "From (UTC)",
              "aria-invalid": le || void 0,
              onChange: (l) => P({ ...C, from: l.target.value })
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
              onChange: (l) => P({ ...C, to: l.target.value })
            }
          )
        ] }),
        /* @__PURE__ */ t("button", { type: "button", className: "ahv-button ahv-button-main", disabled: le, onClick: () => W({ draft: C }), children: "Search" })
      ] }),
      le && /* @__PURE__ */ t("em", { className: "ahv-bad ahv-small", children: "The end date is before the start date" }),
      /* @__PURE__ */ s("div", { className: "ahv-bar ahv-add", children: [
        /* @__PURE__ */ t("span", { className: "ahv-dim ahv-small", children: "Add" }),
        Fe(S).filter((l) => !(c && (l.field === "on" || S === "requests" && l.field === "actor"))).slice(0, 8).map((l) => /* @__PURE__ */ t("button", { type: "button", className: "ahv-link-button", title: l.hint, onClick: () => Ft(l.field), children: l.label }, l.field)),
        Kt && /* @__PURE__ */ t("span", { className: "ahv-warn ahv-small ahv-push-right", children: "Not searched yet: press Enter or Search" })
      ] }),
      (re(u.q).length > 0 || u.range !== ie(c)) && /* @__PURE__ */ s("div", { className: "ahv-applied", children: [
        re(u.q).map((l) => /* @__PURE__ */ s("span", { className: q("ahv-pill", l.negated && "ahv-pill-not"), children: [
          /* @__PURE__ */ s("span", { className: "ahv-dim", children: [
            l.negated ? "Not " : "",
            l.field ? `${Na(l.field)}:` : "Text:"
          ] }),
          " ",
          Ht(l),
          /* @__PURE__ */ t("button", { type: "button", "aria-label": `Remove ${l.text}`, onClick: () => W({ draft: { ...u, q: ga(u.q, l) } }), children: /* @__PURE__ */ t(x, { name: "close", size: 12 }) })
        ] }, l.text)),
        u.range !== ie(c) && /* @__PURE__ */ s("span", { className: "ahv-pill", children: [
          /* @__PURE__ */ t("span", { className: "ahv-dim", children: "When:" }),
          " ",
          u.range === "custom" ? [u.from && ee(z(Re(u.from))), u.to && ee(z(Re(u.to)))].filter(Boolean).join(" – ") || "Any date" : (mt = We.find((l) => l.value === u.range)) == null ? void 0 : mt.label,
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              "aria-label": "Remove the time range",
              onClick: () => W({ draft: { ...u, range: ie(c), from: "", to: "" } }),
              children: /* @__PURE__ */ t(x, { name: "close", size: 12 })
            }
          )
        ] }),
        /* @__PURE__ */ t("button", { type: "button", className: "ahv-link-button", onClick: () => W({ preset: 0, draft: $t(new URLSearchParams(), c) }), children: "Clear all" })
      ] })
    ] }),
    ae.error && !ae.data ? null : /* @__PURE__ */ t(Ta, { chart: ae.data, noun: Te, loading: ae.loading }),
    Ge && /* @__PURE__ */ t(Z, { action: /* @__PURE__ */ t("button", { type: "button", className: "ahv-icon-button", "aria-label": "Dismiss", onClick: () => _e(null), children: /* @__PURE__ */ t(x, { name: "close", size: 14 }) }), children: Ge }),
    A.error && V.length > 0 && /* @__PURE__ */ s(Z, { tone: "bad", action: /* @__PURE__ */ t("button", { type: "button", className: "ahv-button", onClick: A.refresh, children: "Retry" }), children: [
      "Couldn't load newer activity: ",
      A.error.message
    ] }),
    A.error && !V.length ? /* @__PURE__ */ t(Z, { tone: "bad", action: /* @__PURE__ */ t("button", { type: "button", className: "ahv-button", onClick: A.refresh, children: "Retry" }), children: A.error.message }) : A.loading ? /* @__PURE__ */ t(He, {}) : V.length ? /* @__PURE__ */ s("div", { className: "ahv-table-wrap", ref: nt, children: [
      /* @__PURE__ */ s("table", { className: "ahv-table", children: [
        /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ s("tr", { children: [
          /* @__PURE__ */ t("th", { children: "When (UTC)" }),
          /* @__PURE__ */ t("th", { children: "Who" }),
          /* @__PURE__ */ t("th", { children: S === "events" ? "What happened" : "Request" }),
          O.map((l) => /* @__PURE__ */ t("th", { children: l.label }, l.key))
        ] }) }),
        /* @__PURE__ */ t("tbody", { children: V.map((l, w) => {
          var L;
          return /* @__PURE__ */ s(Zt, { children: [
            l.occurred_at.slice(0, 10) !== ((L = V[w - 1]) == null ? void 0 : L.occurred_at.slice(0, 10)) && /* @__PURE__ */ t("tr", { className: "ahv-day", children: /* @__PURE__ */ t("td", { colSpan: Vt, children: sa(l.occurred_at) }) }),
            /* @__PURE__ */ s(
              "tr",
              {
                tabIndex: 0,
                className: q("ahv-row", F(l) && l.outcome !== "success" && "ahv-row-problem"),
                onClick: () => he(l),
                onKeyDown: ($) => {
                  $.target === $.currentTarget && ($.key === "Enter" || $.key === " ") && ($.preventDefault(), he(l));
                },
                children: [
                  /* @__PURE__ */ t("td", { children: /* @__PURE__ */ t(Ea, { value: l.occurred_at, seal: Qe(l) }) }),
                  /* @__PURE__ */ t("td", { children: /* @__PURE__ */ t(
                    xa,
                    {
                      row: l,
                      actorTypes: Ee,
                      onFocus: c && S === "requests" ? void 0 : () => at({ actor_id: l.actor_id })
                    }
                  ) }),
                  /* @__PURE__ */ t("td", { children: F(l) ? /* @__PURE__ */ t(Aa, { row: l }) : /* @__PURE__ */ t(qt, { row: l }) }),
                  O.map(($) => /* @__PURE__ */ t("td", { className: "ahv-cell", children: $.key === "where" ? /* @__PURE__ */ t(Ma, { row: l }) : $.key === "service" ? /* @__PURE__ */ t("span", { className: "ahv-dim", children: R(l.service) }) : $.key === "ip" ? /* @__PURE__ */ t("span", { className: "ahv-mono ahv-dim", children: l.ip || "—" }) : F(l) ? $.key === "result" ? l.outcome === "success" ? /* @__PURE__ */ t("span", { className: "ahv-dim", children: "success" }) : /* @__PURE__ */ t(Ke, { outcome: l.outcome }) : l.target_type ? /* @__PURE__ */ s("span", { children: [
                    it[l.target_type] ?? R(l.target_type),
                    " ",
                    /* @__PURE__ */ t("span", { className: "ahv-mono", children: l.target_name || l.target_id })
                  ] }) : "—" : null }, $.key))
                ]
              }
            )
          ] }, l.id);
        }) })
      ] }),
      /* @__PURE__ */ t("div", { ref: Ce, "aria-hidden": "true" })
    ] }) : /* @__PURE__ */ s("div", { className: "ahv-empty", children: [
      /* @__PURE__ */ t(x, { name: "log", size: 28 }),
      /* @__PURE__ */ s("strong", { children: [
        "No ",
        Te,
        " match"
      ] }),
      /* @__PURE__ */ t("span", { className: "ahv-dim", children: S === "events" && o === "important" ? "Try All, or a wider time range." : "Try a wider time range or fewer filters." })
    ] }),
    V.length > 0 && /* @__PURE__ */ s("footer", { className: "ahv-foot", children: [
      /* @__PURE__ */ s("span", { className: "ahv-dim ahv-num", children: [
        ca(V.length, Te.slice(0, -1)),
        " shown",
        j ? " · Live keeps the newest page" : A.trimmed ? " · the newest were let go to keep the list light; Refresh brings them back" : A.hasMore ? "" : " · that is all of them"
      ] }),
      J.error && /* @__PURE__ */ s("span", { className: "ahv-bad ahv-small", children: [
        "Couldn't load more: ",
        J.error.message
      ] }),
      A.hasMore && /* @__PURE__ */ t("button", { type: "button", className: "ahv-button", onClick: $e, disabled: J.loading, children: J.loading ? "Loading…" : "Load more" })
    ] }),
    /* @__PURE__ */ t(
      At,
      {
        request: e,
        row: Ne,
        onClose: () => he(null),
        onFocus: c ? void 0 : at,
        actorTypes: Ee,
        entities: (vt = ne.data) == null ? void 0 : vt.entities,
        seal: Ne ? Qe(Ne) : null
      }
    )
  ] });
}
const Tt = 500;
function hn({ request: e, entity: a, view: n = "all", action: i, newestFirst: r = !1, more: c, className: h }) {
  var k, f, T, S;
  const v = a.type && a.id ? `${a.type}:${a.id}:${n}:${i ?? ""}` : null, d = I(v, () => e("search", {
    method: "POST",
    body: { kind: "events", filters: {}, related_type: a.type, related_id: a.id, view: n, action: i, limit: Tt }
  })), b = I("catalog", () => e("catalog", { method: "GET" })), [N, y] = E(null), m = ((k = d.data) == null ? void 0 : k.items) ?? [], g = r ? m : [...m].reverse();
  return /* @__PURE__ */ s("div", { className: q("ahv ahv-timeline", h), children: [
    d.error ? /* @__PURE__ */ s(Z, { tone: "bad", action: /* @__PURE__ */ t("button", { type: "button", className: "ahv-button", onClick: d.refresh, children: "Retry" }), children: [
      "Couldn't load: ",
      d.error.message
    ] }) : d.loading && !d.data ? /* @__PURE__ */ t(He, { rows: 4 }) : g.length ? /* @__PURE__ */ s(U, { children: [
      ((f = d.data) == null ? void 0 : f.next_cursor) && /* @__PURE__ */ s("p", { className: "ahv-dim ahv-small", children: [
        "Showing the newest ",
        Tt,
        " steps.",
        c && /* @__PURE__ */ s(U, { children: [
          " ",
          c
        ] })
      ] }),
      /* @__PURE__ */ t("ol", { className: "ahv-steps", children: g.map((o) => {
        var M;
        const p = o.outcome === "failed" ? "bad" : o.outcome === "refused" ? "warn" : o.importance === "high" ? "accent" : "plain", _ = o.children_count ?? ((M = o.children) == null ? void 0 : M.length) ?? 0;
        return /* @__PURE__ */ s("li", { className: `ahv-step ahv-step-${p}`, children: [
          /* @__PURE__ */ t("span", { className: "ahv-step-dot", "aria-hidden": "true" }),
          /* @__PURE__ */ s("button", { type: "button", className: "ahv-step-body", onClick: () => y(o), children: [
            /* @__PURE__ */ s("span", { className: "ahv-step-top", children: [
              /* @__PURE__ */ t("span", { className: "ahv-strong", children: o.title }),
              /* @__PURE__ */ s("span", { className: "ahv-dim ahv-num", title: `${o.occurred_at} UTC`, children: [
                ee(z(o.occurred_at)),
                ", ",
                be(o.occurred_at),
                " · ",
                Be(o.occurred_at)
              ] })
            ] }),
            /* @__PURE__ */ t("span", { className: "ahv-sentence", children: o.summary }),
            /* @__PURE__ */ s("span", { className: "ahv-dim ahv-small", children: [
              [`${o.actor} · ${o.actor_label}`, o.origin && R(o.origin), o.country, o.ip].filter(Boolean).join(" · "),
              _ > 0 && /* @__PURE__ */ s(U, { children: [
                " · ",
                /* @__PURE__ */ t(x, { name: "layers", size: 12 }),
                " ",
                _,
                " record change",
                _ === 1 ? "" : "s"
              ] })
            ] })
          ] })
        ] }, o.id);
      }) })
    ] }) : /* @__PURE__ */ t("p", { className: "ahv-dim", children: "Nothing has been recorded about this yet." }),
    /* @__PURE__ */ t(
      At,
      {
        request: e,
        row: N,
        onClose: () => y(null),
        actorTypes: (T = b.data) == null ? void 0 : T.actor_types,
        entities: (S = b.data) == null ? void 0 : S.entities
      }
    )
  ] });
}
export {
  At as ActivityDetail,
  dn as ActivityLog,
  hn as ActivityTimeline,
  Ha as IntegrityStatus,
  Da as PanelHost
};
