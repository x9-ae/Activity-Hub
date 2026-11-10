var Hs = { exports: {} }, In = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Zd;
function Dm() {
  if (Zd) return In;
  Zd = 1;
  var c = Symbol.for("react.transitional.element"), o = Symbol.for("react.fragment");
  function m(r, E, _) {
    var R = null;
    if (_ !== void 0 && (R = "" + _), E.key !== void 0 && (R = "" + E.key), "key" in E) {
      _ = {};
      for (var H in E)
        H !== "key" && (_[H] = E[H]);
    } else _ = E;
    return E = _.ref, {
      $$typeof: c,
      type: r,
      key: R,
      ref: E !== void 0 ? E : null,
      props: _
    };
  }
  return In.Fragment = o, In.jsx = m, In.jsxs = m, In;
}
var kd;
function Rm() {
  return kd || (kd = 1, Hs.exports = Dm()), Hs.exports;
}
var f = Rm(), Cs = { exports: {} }, tu = {}, ws = { exports: {} }, Bs = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Vd;
function Um() {
  return Vd || (Vd = 1, (function(c) {
    function o(A, C) {
      var P = A.length;
      A.push(C);
      t: for (; 0 < P; ) {
        var pt = P - 1 >>> 1, h = A[pt];
        if (0 < E(h, C))
          A[pt] = C, A[P] = h, P = pt;
        else break t;
      }
    }
    function m(A) {
      return A.length === 0 ? null : A[0];
    }
    function r(A) {
      if (A.length === 0) return null;
      var C = A[0], P = A.pop();
      if (P !== C) {
        A[0] = P;
        t: for (var pt = 0, h = A.length, M = h >>> 1; pt < M; ) {
          var L = 2 * (pt + 1) - 1, w = A[L], k = L + 1, ot = A[k];
          if (0 > E(w, P))
            k < h && 0 > E(ot, w) ? (A[pt] = ot, A[k] = P, pt = k) : (A[pt] = w, A[L] = P, pt = L);
          else if (k < h && 0 > E(ot, P))
            A[pt] = ot, A[k] = P, pt = k;
          else break t;
        }
      }
      return C;
    }
    function E(A, C) {
      var P = A.sortIndex - C.sortIndex;
      return P !== 0 ? P : A.id - C.id;
    }
    if (c.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var _ = performance;
      c.unstable_now = function() {
        return _.now();
      };
    } else {
      var R = Date, H = R.now();
      c.unstable_now = function() {
        return R.now() - H;
      };
    }
    var j = [], S = [], D = 1, B = null, U = 3, Y = !1, V = !1, K = !1, lt = !1, at = typeof setTimeout == "function" ? setTimeout : null, et = typeof clearTimeout == "function" ? clearTimeout : null, G = typeof setImmediate < "u" ? setImmediate : null;
    function F(A) {
      for (var C = m(S); C !== null; ) {
        if (C.callback === null) r(S);
        else if (C.startTime <= A)
          r(S), C.sortIndex = C.expirationTime, o(j, C);
        else break;
        C = m(S);
      }
    }
    function J(A) {
      if (K = !1, F(A), !V)
        if (m(j) !== null)
          V = !0, ut || (ut = !0, Tt());
        else {
          var C = m(S);
          C !== null && Ct(J, C.startTime - A);
        }
    }
    var ut = !1, q = -1, W = 5, Mt = -1;
    function Ba() {
      return lt ? !0 : !(c.unstable_now() - Mt < W);
    }
    function aa() {
      if (lt = !1, ut) {
        var A = c.unstable_now();
        Mt = A;
        var C = !0;
        try {
          t: {
            V = !1, K && (K = !1, et(q), q = -1), Y = !0;
            var P = U;
            try {
              a: {
                for (F(A), B = m(j); B !== null && !(B.expirationTime > A && Ba()); ) {
                  var pt = B.callback;
                  if (typeof pt == "function") {
                    B.callback = null, U = B.priorityLevel;
                    var h = pt(
                      B.expirationTime <= A
                    );
                    if (A = c.unstable_now(), typeof h == "function") {
                      B.callback = h, F(A), C = !0;
                      break a;
                    }
                    B === m(j) && r(j), F(A);
                  } else r(j);
                  B = m(j);
                }
                if (B !== null) C = !0;
                else {
                  var M = m(S);
                  M !== null && Ct(
                    J,
                    M.startTime - A
                  ), C = !1;
                }
              }
              break t;
            } finally {
              B = null, U = P, Y = !1;
            }
            C = void 0;
          }
        } finally {
          C ? Tt() : ut = !1;
        }
      }
    }
    var Tt;
    if (typeof G == "function")
      Tt = function() {
        G(aa);
      };
    else if (typeof MessageChannel < "u") {
      var ba = new MessageChannel(), Ma = ba.port2;
      ba.port1.onmessage = aa, Tt = function() {
        Ma.postMessage(null);
      };
    } else
      Tt = function() {
        at(aa, 0);
      };
    function Ct(A, C) {
      q = at(function() {
        A(c.unstable_now());
      }, C);
    }
    c.unstable_IdlePriority = 5, c.unstable_ImmediatePriority = 1, c.unstable_LowPriority = 4, c.unstable_NormalPriority = 3, c.unstable_Profiling = null, c.unstable_UserBlockingPriority = 2, c.unstable_cancelCallback = function(A) {
      A.callback = null;
    }, c.unstable_forceFrameRate = function(A) {
      0 > A || 125 < A ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : W = 0 < A ? Math.floor(1e3 / A) : 5;
    }, c.unstable_getCurrentPriorityLevel = function() {
      return U;
    }, c.unstable_next = function(A) {
      switch (U) {
        case 1:
        case 2:
        case 3:
          var C = 3;
          break;
        default:
          C = U;
      }
      var P = U;
      U = C;
      try {
        return A();
      } finally {
        U = P;
      }
    }, c.unstable_requestPaint = function() {
      lt = !0;
    }, c.unstable_runWithPriority = function(A, C) {
      switch (A) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          A = 3;
      }
      var P = U;
      U = A;
      try {
        return C();
      } finally {
        U = P;
      }
    }, c.unstable_scheduleCallback = function(A, C, P) {
      var pt = c.unstable_now();
      switch (typeof P == "object" && P !== null ? (P = P.delay, P = typeof P == "number" && 0 < P ? pt + P : pt) : P = pt, A) {
        case 1:
          var h = -1;
          break;
        case 2:
          h = 250;
          break;
        case 5:
          h = 1073741823;
          break;
        case 4:
          h = 1e4;
          break;
        default:
          h = 5e3;
      }
      return h = P + h, A = {
        id: D++,
        callback: C,
        priorityLevel: A,
        startTime: P,
        expirationTime: h,
        sortIndex: -1
      }, P > pt ? (A.sortIndex = P, o(S, A), m(j) === null && A === m(S) && (K ? (et(q), q = -1) : K = !0, Ct(J, P - pt))) : (A.sortIndex = h, o(j, A), V || Y || (V = !0, ut || (ut = !0, Tt()))), A;
    }, c.unstable_shouldYield = Ba, c.unstable_wrapCallback = function(A) {
      var C = U;
      return function() {
        var P = U;
        U = C;
        try {
          return A.apply(this, arguments);
        } finally {
          U = P;
        }
      };
    };
  })(Bs)), Bs;
}
var Kd;
function qm() {
  return Kd || (Kd = 1, ws.exports = Um()), ws.exports;
}
var Ys = { exports: {} }, st = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Jd;
function Hm() {
  if (Jd) return st;
  Jd = 1;
  var c = Symbol.for("react.transitional.element"), o = Symbol.for("react.portal"), m = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), E = Symbol.for("react.profiler"), _ = Symbol.for("react.consumer"), R = Symbol.for("react.context"), H = Symbol.for("react.forward_ref"), j = Symbol.for("react.suspense"), S = Symbol.for("react.memo"), D = Symbol.for("react.lazy"), B = Symbol.iterator;
  function U(h) {
    return h === null || typeof h != "object" ? null : (h = B && h[B] || h["@@iterator"], typeof h == "function" ? h : null);
  }
  var Y = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, V = Object.assign, K = {};
  function lt(h, M, L) {
    this.props = h, this.context = M, this.refs = K, this.updater = L || Y;
  }
  lt.prototype.isReactComponent = {}, lt.prototype.setState = function(h, M) {
    if (typeof h != "object" && typeof h != "function" && h != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, h, M, "setState");
  }, lt.prototype.forceUpdate = function(h) {
    this.updater.enqueueForceUpdate(this, h, "forceUpdate");
  };
  function at() {
  }
  at.prototype = lt.prototype;
  function et(h, M, L) {
    this.props = h, this.context = M, this.refs = K, this.updater = L || Y;
  }
  var G = et.prototype = new at();
  G.constructor = et, V(G, lt.prototype), G.isPureReactComponent = !0;
  var F = Array.isArray, J = { H: null, A: null, T: null, S: null, V: null }, ut = Object.prototype.hasOwnProperty;
  function q(h, M, L, w, k, ot) {
    return L = ot.ref, {
      $$typeof: c,
      type: h,
      key: M,
      ref: L !== void 0 ? L : null,
      props: ot
    };
  }
  function W(h, M) {
    return q(
      h.type,
      M,
      void 0,
      void 0,
      void 0,
      h.props
    );
  }
  function Mt(h) {
    return typeof h == "object" && h !== null && h.$$typeof === c;
  }
  function Ba(h) {
    var M = { "=": "=0", ":": "=2" };
    return "$" + h.replace(/[=:]/g, function(L) {
      return M[L];
    });
  }
  var aa = /\/+/g;
  function Tt(h, M) {
    return typeof h == "object" && h !== null && h.key != null ? Ba("" + h.key) : M.toString(36);
  }
  function ba() {
  }
  function Ma(h) {
    switch (h.status) {
      case "fulfilled":
        return h.value;
      case "rejected":
        throw h.reason;
      default:
        switch (typeof h.status == "string" ? h.then(ba, ba) : (h.status = "pending", h.then(
          function(M) {
            h.status === "pending" && (h.status = "fulfilled", h.value = M);
          },
          function(M) {
            h.status === "pending" && (h.status = "rejected", h.reason = M);
          }
        )), h.status) {
          case "fulfilled":
            return h.value;
          case "rejected":
            throw h.reason;
        }
    }
    throw h;
  }
  function Ct(h, M, L, w, k) {
    var ot = typeof h;
    (ot === "undefined" || ot === "boolean") && (h = null);
    var Z = !1;
    if (h === null) Z = !0;
    else
      switch (ot) {
        case "bigint":
        case "string":
        case "number":
          Z = !0;
          break;
        case "object":
          switch (h.$$typeof) {
            case c:
            case o:
              Z = !0;
              break;
            case D:
              return Z = h._init, Ct(
                Z(h._payload),
                M,
                L,
                w,
                k
              );
          }
      }
    if (Z)
      return k = k(h), Z = w === "" ? "." + Tt(h, 0) : w, F(k) ? (L = "", Z != null && (L = Z.replace(aa, "$&/") + "/"), Ct(k, M, L, "", function(la) {
        return la;
      })) : k != null && (Mt(k) && (k = W(
        k,
        L + (k.key == null || h && h.key === k.key ? "" : ("" + k.key).replace(
          aa,
          "$&/"
        ) + "/") + Z
      )), M.push(k)), 1;
    Z = 0;
    var Kt = w === "" ? "." : w + ":";
    if (F(h))
      for (var yt = 0; yt < h.length; yt++)
        w = h[yt], ot = Kt + Tt(w, yt), Z += Ct(
          w,
          M,
          L,
          ot,
          k
        );
    else if (yt = U(h), typeof yt == "function")
      for (h = yt.call(h), yt = 0; !(w = h.next()).done; )
        w = w.value, ot = Kt + Tt(w, yt++), Z += Ct(
          w,
          M,
          L,
          ot,
          k
        );
    else if (ot === "object") {
      if (typeof h.then == "function")
        return Ct(
          Ma(h),
          M,
          L,
          w,
          k
        );
      throw M = String(h), Error(
        "Objects are not valid as a React child (found: " + (M === "[object Object]" ? "object with keys {" + Object.keys(h).join(", ") + "}" : M) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return Z;
  }
  function A(h, M, L) {
    if (h == null) return h;
    var w = [], k = 0;
    return Ct(h, w, "", "", function(ot) {
      return M.call(L, ot, k++);
    }), w;
  }
  function C(h) {
    if (h._status === -1) {
      var M = h._result;
      M = M(), M.then(
        function(L) {
          (h._status === 0 || h._status === -1) && (h._status = 1, h._result = L);
        },
        function(L) {
          (h._status === 0 || h._status === -1) && (h._status = 2, h._result = L);
        }
      ), h._status === -1 && (h._status = 0, h._result = M);
    }
    if (h._status === 1) return h._result.default;
    throw h._result;
  }
  var P = typeof reportError == "function" ? reportError : function(h) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var M = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof h == "object" && h !== null && typeof h.message == "string" ? String(h.message) : String(h),
        error: h
      });
      if (!window.dispatchEvent(M)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", h);
      return;
    }
    console.error(h);
  };
  function pt() {
  }
  return st.Children = {
    map: A,
    forEach: function(h, M, L) {
      A(
        h,
        function() {
          M.apply(this, arguments);
        },
        L
      );
    },
    count: function(h) {
      var M = 0;
      return A(h, function() {
        M++;
      }), M;
    },
    toArray: function(h) {
      return A(h, function(M) {
        return M;
      }) || [];
    },
    only: function(h) {
      if (!Mt(h))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return h;
    }
  }, st.Component = lt, st.Fragment = m, st.Profiler = E, st.PureComponent = et, st.StrictMode = r, st.Suspense = j, st.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = J, st.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(h) {
      return J.H.useMemoCache(h);
    }
  }, st.cache = function(h) {
    return function() {
      return h.apply(null, arguments);
    };
  }, st.cloneElement = function(h, M, L) {
    if (h == null)
      throw Error(
        "The argument must be a React element, but you passed " + h + "."
      );
    var w = V({}, h.props), k = h.key, ot = void 0;
    if (M != null)
      for (Z in M.ref !== void 0 && (ot = void 0), M.key !== void 0 && (k = "" + M.key), M)
        !ut.call(M, Z) || Z === "key" || Z === "__self" || Z === "__source" || Z === "ref" && M.ref === void 0 || (w[Z] = M[Z]);
    var Z = arguments.length - 2;
    if (Z === 1) w.children = L;
    else if (1 < Z) {
      for (var Kt = Array(Z), yt = 0; yt < Z; yt++)
        Kt[yt] = arguments[yt + 2];
      w.children = Kt;
    }
    return q(h.type, k, void 0, void 0, ot, w);
  }, st.createContext = function(h) {
    return h = {
      $$typeof: R,
      _currentValue: h,
      _currentValue2: h,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, h.Provider = h, h.Consumer = {
      $$typeof: _,
      _context: h
    }, h;
  }, st.createElement = function(h, M, L) {
    var w, k = {}, ot = null;
    if (M != null)
      for (w in M.key !== void 0 && (ot = "" + M.key), M)
        ut.call(M, w) && w !== "key" && w !== "__self" && w !== "__source" && (k[w] = M[w]);
    var Z = arguments.length - 2;
    if (Z === 1) k.children = L;
    else if (1 < Z) {
      for (var Kt = Array(Z), yt = 0; yt < Z; yt++)
        Kt[yt] = arguments[yt + 2];
      k.children = Kt;
    }
    if (h && h.defaultProps)
      for (w in Z = h.defaultProps, Z)
        k[w] === void 0 && (k[w] = Z[w]);
    return q(h, ot, void 0, void 0, null, k);
  }, st.createRef = function() {
    return { current: null };
  }, st.forwardRef = function(h) {
    return { $$typeof: H, render: h };
  }, st.isValidElement = Mt, st.lazy = function(h) {
    return {
      $$typeof: D,
      _payload: { _status: -1, _result: h },
      _init: C
    };
  }, st.memo = function(h, M) {
    return {
      $$typeof: S,
      type: h,
      compare: M === void 0 ? null : M
    };
  }, st.startTransition = function(h) {
    var M = J.T, L = {};
    J.T = L;
    try {
      var w = h(), k = J.S;
      k !== null && k(L, w), typeof w == "object" && w !== null && typeof w.then == "function" && w.then(pt, P);
    } catch (ot) {
      P(ot);
    } finally {
      J.T = M;
    }
  }, st.unstable_useCacheRefresh = function() {
    return J.H.useCacheRefresh();
  }, st.use = function(h) {
    return J.H.use(h);
  }, st.useActionState = function(h, M, L) {
    return J.H.useActionState(h, M, L);
  }, st.useCallback = function(h, M) {
    return J.H.useCallback(h, M);
  }, st.useContext = function(h) {
    return J.H.useContext(h);
  }, st.useDebugValue = function() {
  }, st.useDeferredValue = function(h, M) {
    return J.H.useDeferredValue(h, M);
  }, st.useEffect = function(h, M, L) {
    var w = J.H;
    if (typeof L == "function")
      throw Error(
        "useEffect CRUD overload is not enabled in this build of React."
      );
    return w.useEffect(h, M);
  }, st.useId = function() {
    return J.H.useId();
  }, st.useImperativeHandle = function(h, M, L) {
    return J.H.useImperativeHandle(h, M, L);
  }, st.useInsertionEffect = function(h, M) {
    return J.H.useInsertionEffect(h, M);
  }, st.useLayoutEffect = function(h, M) {
    return J.H.useLayoutEffect(h, M);
  }, st.useMemo = function(h, M) {
    return J.H.useMemo(h, M);
  }, st.useOptimistic = function(h, M) {
    return J.H.useOptimistic(h, M);
  }, st.useReducer = function(h, M, L) {
    return J.H.useReducer(h, M, L);
  }, st.useRef = function(h) {
    return J.H.useRef(h);
  }, st.useState = function(h) {
    return J.H.useState(h);
  }, st.useSyncExternalStore = function(h, M, L) {
    return J.H.useSyncExternalStore(
      h,
      M,
      L
    );
  }, st.useTransition = function() {
    return J.H.useTransition();
  }, st.version = "19.1.0", st;
}
var $d;
function Ps() {
  return $d || ($d = 1, Ys.exports = Hm()), Ys.exports;
}
var Gs = { exports: {} }, ta = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Wd;
function Cm() {
  if (Wd) return ta;
  Wd = 1;
  var c = Ps();
  function o(j) {
    var S = "https://react.dev/errors/" + j;
    if (1 < arguments.length) {
      S += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var D = 2; D < arguments.length; D++)
        S += "&args[]=" + encodeURIComponent(arguments[D]);
    }
    return "Minified React error #" + j + "; visit " + S + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function m() {
  }
  var r = {
    d: {
      f: m,
      r: function() {
        throw Error(o(522));
      },
      D: m,
      C: m,
      L: m,
      m,
      X: m,
      S: m,
      M: m
    },
    p: 0,
    findDOMNode: null
  }, E = Symbol.for("react.portal");
  function _(j, S, D) {
    var B = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: E,
      key: B == null ? null : "" + B,
      children: j,
      containerInfo: S,
      implementation: D
    };
  }
  var R = c.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function H(j, S) {
    if (j === "font") return "";
    if (typeof S == "string")
      return S === "use-credentials" ? S : "";
  }
  return ta.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = r, ta.createPortal = function(j, S) {
    var D = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!S || S.nodeType !== 1 && S.nodeType !== 9 && S.nodeType !== 11)
      throw Error(o(299));
    return _(j, S, null, D);
  }, ta.flushSync = function(j) {
    var S = R.T, D = r.p;
    try {
      if (R.T = null, r.p = 2, j) return j();
    } finally {
      R.T = S, r.p = D, r.d.f();
    }
  }, ta.preconnect = function(j, S) {
    typeof j == "string" && (S ? (S = S.crossOrigin, S = typeof S == "string" ? S === "use-credentials" ? S : "" : void 0) : S = null, r.d.C(j, S));
  }, ta.prefetchDNS = function(j) {
    typeof j == "string" && r.d.D(j);
  }, ta.preinit = function(j, S) {
    if (typeof j == "string" && S && typeof S.as == "string") {
      var D = S.as, B = H(D, S.crossOrigin), U = typeof S.integrity == "string" ? S.integrity : void 0, Y = typeof S.fetchPriority == "string" ? S.fetchPriority : void 0;
      D === "style" ? r.d.S(
        j,
        typeof S.precedence == "string" ? S.precedence : void 0,
        {
          crossOrigin: B,
          integrity: U,
          fetchPriority: Y
        }
      ) : D === "script" && r.d.X(j, {
        crossOrigin: B,
        integrity: U,
        fetchPriority: Y,
        nonce: typeof S.nonce == "string" ? S.nonce : void 0
      });
    }
  }, ta.preinitModule = function(j, S) {
    if (typeof j == "string")
      if (typeof S == "object" && S !== null) {
        if (S.as == null || S.as === "script") {
          var D = H(
            S.as,
            S.crossOrigin
          );
          r.d.M(j, {
            crossOrigin: D,
            integrity: typeof S.integrity == "string" ? S.integrity : void 0,
            nonce: typeof S.nonce == "string" ? S.nonce : void 0
          });
        }
      } else S == null && r.d.M(j);
  }, ta.preload = function(j, S) {
    if (typeof j == "string" && typeof S == "object" && S !== null && typeof S.as == "string") {
      var D = S.as, B = H(D, S.crossOrigin);
      r.d.L(j, D, {
        crossOrigin: B,
        integrity: typeof S.integrity == "string" ? S.integrity : void 0,
        nonce: typeof S.nonce == "string" ? S.nonce : void 0,
        type: typeof S.type == "string" ? S.type : void 0,
        fetchPriority: typeof S.fetchPriority == "string" ? S.fetchPriority : void 0,
        referrerPolicy: typeof S.referrerPolicy == "string" ? S.referrerPolicy : void 0,
        imageSrcSet: typeof S.imageSrcSet == "string" ? S.imageSrcSet : void 0,
        imageSizes: typeof S.imageSizes == "string" ? S.imageSizes : void 0,
        media: typeof S.media == "string" ? S.media : void 0
      });
    }
  }, ta.preloadModule = function(j, S) {
    if (typeof j == "string")
      if (S) {
        var D = H(S.as, S.crossOrigin);
        r.d.m(j, {
          as: typeof S.as == "string" && S.as !== "script" ? S.as : void 0,
          crossOrigin: D,
          integrity: typeof S.integrity == "string" ? S.integrity : void 0
        });
      } else r.d.m(j);
  }, ta.requestFormReset = function(j) {
    r.d.r(j);
  }, ta.unstable_batchedUpdates = function(j, S) {
    return j(S);
  }, ta.useFormState = function(j, S, D) {
    return R.H.useFormState(j, S, D);
  }, ta.useFormStatus = function() {
    return R.H.useHostTransitionStatus();
  }, ta.version = "19.1.0", ta;
}
var Fd;
function fh() {
  if (Fd) return Gs.exports;
  Fd = 1;
  function c() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(c);
      } catch (o) {
        console.error(o);
      }
  }
  return c(), Gs.exports = Cm(), Gs.exports;
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Pd;
function wm() {
  if (Pd) return tu;
  Pd = 1;
  var c = qm(), o = Ps(), m = fh();
  function r(t) {
    var a = "https://react.dev/errors/" + t;
    if (1 < arguments.length) {
      a += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var e = 2; e < arguments.length; e++)
        a += "&args[]=" + encodeURIComponent(arguments[e]);
    }
    return "Minified React error #" + t + "; visit " + a + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function E(t) {
    return !(!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11);
  }
  function _(t) {
    var a = t, e = t;
    if (t.alternate) for (; a.return; ) a = a.return;
    else {
      t = a;
      do
        a = t, (a.flags & 4098) !== 0 && (e = a.return), t = a.return;
      while (t);
    }
    return a.tag === 3 ? e : null;
  }
  function R(t) {
    if (t.tag === 13) {
      var a = t.memoizedState;
      if (a === null && (t = t.alternate, t !== null && (a = t.memoizedState)), a !== null) return a.dehydrated;
    }
    return null;
  }
  function H(t) {
    if (_(t) !== t)
      throw Error(r(188));
  }
  function j(t) {
    var a = t.alternate;
    if (!a) {
      if (a = _(t), a === null) throw Error(r(188));
      return a !== t ? null : t;
    }
    for (var e = t, l = a; ; ) {
      var n = e.return;
      if (n === null) break;
      var u = n.alternate;
      if (u === null) {
        if (l = n.return, l !== null) {
          e = l;
          continue;
        }
        break;
      }
      if (n.child === u.child) {
        for (u = n.child; u; ) {
          if (u === e) return H(n), t;
          if (u === l) return H(n), a;
          u = u.sibling;
        }
        throw Error(r(188));
      }
      if (e.return !== l.return) e = n, l = u;
      else {
        for (var i = !1, s = n.child; s; ) {
          if (s === e) {
            i = !0, e = n, l = u;
            break;
          }
          if (s === l) {
            i = !0, l = n, e = u;
            break;
          }
          s = s.sibling;
        }
        if (!i) {
          for (s = u.child; s; ) {
            if (s === e) {
              i = !0, e = u, l = n;
              break;
            }
            if (s === l) {
              i = !0, l = u, e = n;
              break;
            }
            s = s.sibling;
          }
          if (!i) throw Error(r(189));
        }
      }
      if (e.alternate !== l) throw Error(r(190));
    }
    if (e.tag !== 3) throw Error(r(188));
    return e.stateNode.current === e ? t : a;
  }
  function S(t) {
    var a = t.tag;
    if (a === 5 || a === 26 || a === 27 || a === 6) return t;
    for (t = t.child; t !== null; ) {
      if (a = S(t), a !== null) return a;
      t = t.sibling;
    }
    return null;
  }
  var D = Object.assign, B = Symbol.for("react.element"), U = Symbol.for("react.transitional.element"), Y = Symbol.for("react.portal"), V = Symbol.for("react.fragment"), K = Symbol.for("react.strict_mode"), lt = Symbol.for("react.profiler"), at = Symbol.for("react.provider"), et = Symbol.for("react.consumer"), G = Symbol.for("react.context"), F = Symbol.for("react.forward_ref"), J = Symbol.for("react.suspense"), ut = Symbol.for("react.suspense_list"), q = Symbol.for("react.memo"), W = Symbol.for("react.lazy"), Mt = Symbol.for("react.activity"), Ba = Symbol.for("react.memo_cache_sentinel"), aa = Symbol.iterator;
  function Tt(t) {
    return t === null || typeof t != "object" ? null : (t = aa && t[aa] || t["@@iterator"], typeof t == "function" ? t : null);
  }
  var ba = Symbol.for("react.client.reference");
  function Ma(t) {
    if (t == null) return null;
    if (typeof t == "function")
      return t.$$typeof === ba ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case V:
        return "Fragment";
      case lt:
        return "Profiler";
      case K:
        return "StrictMode";
      case J:
        return "Suspense";
      case ut:
        return "SuspenseList";
      case Mt:
        return "Activity";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case Y:
          return "Portal";
        case G:
          return (t.displayName || "Context") + ".Provider";
        case et:
          return (t._context.displayName || "Context") + ".Consumer";
        case F:
          var a = t.render;
          return t = t.displayName, t || (t = a.displayName || a.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
        case q:
          return a = t.displayName || null, a !== null ? a : Ma(t.type) || "Memo";
        case W:
          a = t._payload, t = t._init;
          try {
            return Ma(t(a));
          } catch {
          }
      }
    return null;
  }
  var Ct = Array.isArray, A = o.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, C = m.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, P = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, pt = [], h = -1;
  function M(t) {
    return { current: t };
  }
  function L(t) {
    0 > h || (t.current = pt[h], pt[h] = null, h--);
  }
  function w(t, a) {
    h++, pt[h] = t.current, t.current = a;
  }
  var k = M(null), ot = M(null), Z = M(null), Kt = M(null);
  function yt(t, a) {
    switch (w(Z, a), w(ot, t), w(k, null), a.nodeType) {
      case 9:
      case 11:
        t = (t = a.documentElement) && (t = t.namespaceURI) ? yd(t) : 0;
        break;
      default:
        if (t = a.tagName, a = a.namespaceURI)
          a = yd(a), t = bd(a, t);
        else
          switch (t) {
            case "svg":
              t = 1;
              break;
            case "math":
              t = 2;
              break;
            default:
              t = 0;
          }
    }
    L(k), w(k, t);
  }
  function la() {
    L(k), L(ot), L(Z);
  }
  function tl(t) {
    t.memoizedState !== null && w(Kt, t);
    var a = k.current, e = bd(a, t.type);
    a !== e && (w(ot, t), w(k, e));
  }
  function Ue(t) {
    ot.current === t && (L(k), L(ot)), Kt.current === t && (L(Kt), Jn._currentValue = P);
  }
  var al = Object.prototype.hasOwnProperty, Fl = c.unstable_scheduleCallback, Pl = c.unstable_cancelCallback, nu = c.unstable_shouldYield, ra = c.unstable_requestPaint, xa = c.unstable_now, Ai = c.unstable_getCurrentPriorityLevel, Il = c.unstable_ImmediatePriority, uu = c.unstable_UserBlockingPriority, el = c.unstable_NormalPriority, qe = c.unstable_LowPriority, ll = c.unstable_IdlePriority, iu = c.log, cu = c.unstable_setDisableYieldValue, ka = null, Rt = null;
  function Da(t) {
    if (typeof iu == "function" && cu(t), Rt && typeof Rt.setStrictMode == "function")
      try {
        Rt.setStrictMode(ka, t);
      } catch {
      }
  }
  var Ft = Math.clz32 ? Math.clz32 : su, tn = Math.log, an = Math.LN2;
  function su(t) {
    return t >>>= 0, t === 0 ? 32 : 31 - (tn(t) / an | 0) | 0;
  }
  var nl = 256, oa = 4194304;
  function Va(t) {
    var a = t & 42;
    if (a !== 0) return a;
    switch (t & -t) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t & 4194048;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return t & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return t;
    }
  }
  function ul(t, a, e) {
    var l = t.pendingLanes;
    if (l === 0) return 0;
    var n = 0, u = t.suspendedLanes, i = t.pingedLanes;
    t = t.warmLanes;
    var s = l & 134217727;
    return s !== 0 ? (l = s & ~u, l !== 0 ? n = Va(l) : (i &= s, i !== 0 ? n = Va(i) : e || (e = s & ~t, e !== 0 && (n = Va(e))))) : (s = l & ~u, s !== 0 ? n = Va(s) : i !== 0 ? n = Va(i) : e || (e = l & ~t, e !== 0 && (n = Va(e)))), n === 0 ? 0 : a !== 0 && a !== n && (a & u) === 0 && (u = n & -n, e = a & -a, u >= e || u === 32 && (e & 4194048) !== 0) ? a : n;
  }
  function fe(t, a) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & a) === 0;
  }
  function fu(t, a) {
    switch (t) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return a + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return a + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function en() {
    var t = nl;
    return nl <<= 1, (nl & 4194048) === 0 && (nl = 256), t;
  }
  function ln() {
    var t = oa;
    return oa <<= 1, (oa & 62914560) === 0 && (oa = 4194304), t;
  }
  function il(t) {
    for (var a = [], e = 0; 31 > e; e++) a.push(t);
    return a;
  }
  function T(t, a) {
    t.pendingLanes |= a, a !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0);
  }
  function it(t, a, e, l, n, u) {
    var i = t.pendingLanes;
    t.pendingLanes = e, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= e, t.entangledLanes &= e, t.errorRecoveryDisabledLanes &= e, t.shellSuspendCounter = 0;
    var s = t.entanglements, d = t.expirationTimes, y = t.hiddenUpdates;
    for (e = i & ~e; 0 < e; ) {
      var N = 31 - Ft(e), O = 1 << N;
      s[N] = 0, d[N] = -1;
      var b = y[N];
      if (b !== null)
        for (y[N] = null, N = 0; N < b.length; N++) {
          var x = b[N];
          x !== null && (x.lane &= -536870913);
        }
      e &= ~O;
    }
    l !== 0 && bt(t, l, 0), u !== 0 && n === 0 && t.tag !== 0 && (t.suspendedLanes |= u & ~(i & ~a));
  }
  function bt(t, a, e) {
    t.pendingLanes |= a, t.suspendedLanes &= ~a;
    var l = 31 - Ft(a);
    t.entangledLanes |= a, t.entanglements[l] = t.entanglements[l] | 1073741824 | e & 4194090;
  }
  function ct(t, a) {
    var e = t.entangledLanes |= a;
    for (t = t.entanglements; e; ) {
      var l = 31 - Ft(e), n = 1 << l;
      n & a | t[l] & a && (t[l] |= a), e &= ~n;
    }
  }
  function Ra(t) {
    switch (t) {
      case 2:
        t = 1;
        break;
      case 8:
        t = 4;
        break;
      case 32:
        t = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        t = 128;
        break;
      case 268435456:
        t = 134217728;
        break;
      default:
        t = 0;
    }
    return t;
  }
  function He(t) {
    return t &= -t, 2 < t ? 8 < t ? (t & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function Ce() {
    var t = C.p;
    return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : Bd(t.type));
  }
  function xh(t, a) {
    var e = C.p;
    try {
      return C.p = t, a();
    } finally {
      C.p = e;
    }
  }
  var re = Math.random().toString(36).slice(2), Pt = "__reactFiber$" + re, na = "__reactProps$" + re, cl = "__reactContainer$" + re, Ni = "__reactEvents$" + re, Sh = "__reactListeners$" + re, Th = "__reactHandles$" + re, nf = "__reactResources$" + re, nn = "__reactMarker$" + re;
  function zi(t) {
    delete t[Pt], delete t[na], delete t[Ni], delete t[Sh], delete t[Th];
  }
  function sl(t) {
    var a = t[Pt];
    if (a) return a;
    for (var e = t.parentNode; e; ) {
      if (a = e[cl] || e[Pt]) {
        if (e = a.alternate, a.child !== null || e !== null && e.child !== null)
          for (t = Ed(t); t !== null; ) {
            if (e = t[Pt]) return e;
            t = Ed(t);
          }
        return a;
      }
      t = e, e = t.parentNode;
    }
    return null;
  }
  function fl(t) {
    if (t = t[Pt] || t[cl]) {
      var a = t.tag;
      if (a === 5 || a === 6 || a === 13 || a === 26 || a === 27 || a === 3)
        return t;
    }
    return null;
  }
  function un(t) {
    var a = t.tag;
    if (a === 5 || a === 26 || a === 27 || a === 6) return t.stateNode;
    throw Error(r(33));
  }
  function rl(t) {
    var a = t[nf];
    return a || (a = t[nf] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), a;
  }
  function Qt(t) {
    t[nn] = !0;
  }
  var uf = /* @__PURE__ */ new Set(), cf = {};
  function we(t, a) {
    ol(t, a), ol(t + "Capture", a);
  }
  function ol(t, a) {
    for (cf[t] = a, t = 0; t < a.length; t++)
      uf.add(a[t]);
  }
  var Eh = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), sf = {}, ff = {};
  function jh(t) {
    return al.call(ff, t) ? !0 : al.call(sf, t) ? !1 : Eh.test(t) ? ff[t] = !0 : (sf[t] = !0, !1);
  }
  function ru(t, a, e) {
    if (jh(a))
      if (e === null) t.removeAttribute(a);
      else {
        switch (typeof e) {
          case "undefined":
          case "function":
          case "symbol":
            t.removeAttribute(a);
            return;
          case "boolean":
            var l = a.toLowerCase().slice(0, 5);
            if (l !== "data-" && l !== "aria-") {
              t.removeAttribute(a);
              return;
            }
        }
        t.setAttribute(a, "" + e);
      }
  }
  function ou(t, a, e) {
    if (e === null) t.removeAttribute(a);
    else {
      switch (typeof e) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(a);
          return;
      }
      t.setAttribute(a, "" + e);
    }
  }
  function Ka(t, a, e, l) {
    if (l === null) t.removeAttribute(e);
    else {
      switch (typeof l) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(e);
          return;
      }
      t.setAttributeNS(a, e, "" + l);
    }
  }
  var Oi, rf;
  function dl(t) {
    if (Oi === void 0)
      try {
        throw Error();
      } catch (e) {
        var a = e.stack.trim().match(/\n( *(at )?)/);
        Oi = a && a[1] || "", rf = -1 < e.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + Oi + t + rf;
  }
  var Mi = !1;
  function Di(t, a) {
    if (!t || Mi) return "";
    Mi = !0;
    var e = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var l = {
        DetermineComponentFrameRoot: function() {
          try {
            if (a) {
              var O = function() {
                throw Error();
              };
              if (Object.defineProperty(O.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(O, []);
                } catch (x) {
                  var b = x;
                }
                Reflect.construct(t, [], O);
              } else {
                try {
                  O.call();
                } catch (x) {
                  b = x;
                }
                t.call(O.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (x) {
                b = x;
              }
              (O = t()) && typeof O.catch == "function" && O.catch(function() {
              });
            }
          } catch (x) {
            if (x && b && typeof x.stack == "string")
              return [x.stack, b.stack];
          }
          return [null, null];
        }
      };
      l.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var n = Object.getOwnPropertyDescriptor(
        l.DetermineComponentFrameRoot,
        "name"
      );
      n && n.configurable && Object.defineProperty(
        l.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var u = l.DetermineComponentFrameRoot(), i = u[0], s = u[1];
      if (i && s) {
        var d = i.split(`
`), y = s.split(`
`);
        for (n = l = 0; l < d.length && !d[l].includes("DetermineComponentFrameRoot"); )
          l++;
        for (; n < y.length && !y[n].includes(
          "DetermineComponentFrameRoot"
        ); )
          n++;
        if (l === d.length || n === y.length)
          for (l = d.length - 1, n = y.length - 1; 1 <= l && 0 <= n && d[l] !== y[n]; )
            n--;
        for (; 1 <= l && 0 <= n; l--, n--)
          if (d[l] !== y[n]) {
            if (l !== 1 || n !== 1)
              do
                if (l--, n--, 0 > n || d[l] !== y[n]) {
                  var N = `
` + d[l].replace(" at new ", " at ");
                  return t.displayName && N.includes("<anonymous>") && (N = N.replace("<anonymous>", t.displayName)), N;
                }
              while (1 <= l && 0 <= n);
            break;
          }
      }
    } finally {
      Mi = !1, Error.prepareStackTrace = e;
    }
    return (e = t ? t.displayName || t.name : "") ? dl(e) : "";
  }
  function _h(t) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return dl(t.type);
      case 16:
        return dl("Lazy");
      case 13:
        return dl("Suspense");
      case 19:
        return dl("SuspenseList");
      case 0:
      case 15:
        return Di(t.type, !1);
      case 11:
        return Di(t.type.render, !1);
      case 1:
        return Di(t.type, !0);
      case 31:
        return dl("Activity");
      default:
        return "";
    }
  }
  function of(t) {
    try {
      var a = "";
      do
        a += _h(t), t = t.return;
      while (t);
      return a;
    } catch (e) {
      return `
Error generating stack: ` + e.message + `
` + e.stack;
    }
  }
  function Sa(t) {
    switch (typeof t) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return t;
      case "object":
        return t;
      default:
        return "";
    }
  }
  function df(t) {
    var a = t.type;
    return (t = t.nodeName) && t.toLowerCase() === "input" && (a === "checkbox" || a === "radio");
  }
  function Ah(t) {
    var a = df(t) ? "checked" : "value", e = Object.getOwnPropertyDescriptor(
      t.constructor.prototype,
      a
    ), l = "" + t[a];
    if (!t.hasOwnProperty(a) && typeof e < "u" && typeof e.get == "function" && typeof e.set == "function") {
      var n = e.get, u = e.set;
      return Object.defineProperty(t, a, {
        configurable: !0,
        get: function() {
          return n.call(this);
        },
        set: function(i) {
          l = "" + i, u.call(this, i);
        }
      }), Object.defineProperty(t, a, {
        enumerable: e.enumerable
      }), {
        getValue: function() {
          return l;
        },
        setValue: function(i) {
          l = "" + i;
        },
        stopTracking: function() {
          t._valueTracker = null, delete t[a];
        }
      };
    }
  }
  function du(t) {
    t._valueTracker || (t._valueTracker = Ah(t));
  }
  function hf(t) {
    if (!t) return !1;
    var a = t._valueTracker;
    if (!a) return !0;
    var e = a.getValue(), l = "";
    return t && (l = df(t) ? t.checked ? "true" : "false" : t.value), t = l, t !== e ? (a.setValue(t), !0) : !1;
  }
  function hu(t) {
    if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u") return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  var Nh = /[\n"\\]/g;
  function Ta(t) {
    return t.replace(
      Nh,
      function(a) {
        return "\\" + a.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Ri(t, a, e, l, n, u, i, s) {
    t.name = "", i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" ? t.type = i : t.removeAttribute("type"), a != null ? i === "number" ? (a === 0 && t.value === "" || t.value != a) && (t.value = "" + Sa(a)) : t.value !== "" + Sa(a) && (t.value = "" + Sa(a)) : i !== "submit" && i !== "reset" || t.removeAttribute("value"), a != null ? Ui(t, i, Sa(a)) : e != null ? Ui(t, i, Sa(e)) : l != null && t.removeAttribute("value"), n == null && u != null && (t.defaultChecked = !!u), n != null && (t.checked = n && typeof n != "function" && typeof n != "symbol"), s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? t.name = "" + Sa(s) : t.removeAttribute("name");
  }
  function vf(t, a, e, l, n, u, i, s) {
    if (u != null && typeof u != "function" && typeof u != "symbol" && typeof u != "boolean" && (t.type = u), a != null || e != null) {
      if (!(u !== "submit" && u !== "reset" || a != null))
        return;
      e = e != null ? "" + Sa(e) : "", a = a != null ? "" + Sa(a) : e, s || a === t.value || (t.value = a), t.defaultValue = a;
    }
    l = l ?? n, l = typeof l != "function" && typeof l != "symbol" && !!l, t.checked = s ? t.checked : !!l, t.defaultChecked = !!l, i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" && (t.name = i);
  }
  function Ui(t, a, e) {
    a === "number" && hu(t.ownerDocument) === t || t.defaultValue === "" + e || (t.defaultValue = "" + e);
  }
  function hl(t, a, e, l) {
    if (t = t.options, a) {
      a = {};
      for (var n = 0; n < e.length; n++)
        a["$" + e[n]] = !0;
      for (e = 0; e < t.length; e++)
        n = a.hasOwnProperty("$" + t[e].value), t[e].selected !== n && (t[e].selected = n), n && l && (t[e].defaultSelected = !0);
    } else {
      for (e = "" + Sa(e), a = null, n = 0; n < t.length; n++) {
        if (t[n].value === e) {
          t[n].selected = !0, l && (t[n].defaultSelected = !0);
          return;
        }
        a !== null || t[n].disabled || (a = t[n]);
      }
      a !== null && (a.selected = !0);
    }
  }
  function mf(t, a, e) {
    if (a != null && (a = "" + Sa(a), a !== t.value && (t.value = a), e == null)) {
      t.defaultValue !== a && (t.defaultValue = a);
      return;
    }
    t.defaultValue = e != null ? "" + Sa(e) : "";
  }
  function gf(t, a, e, l) {
    if (a == null) {
      if (l != null) {
        if (e != null) throw Error(r(92));
        if (Ct(l)) {
          if (1 < l.length) throw Error(r(93));
          l = l[0];
        }
        e = l;
      }
      e == null && (e = ""), a = e;
    }
    e = Sa(a), t.defaultValue = e, l = t.textContent, l === e && l !== "" && l !== null && (t.value = l);
  }
  function vl(t, a) {
    if (a) {
      var e = t.firstChild;
      if (e && e === t.lastChild && e.nodeType === 3) {
        e.nodeValue = a;
        return;
      }
    }
    t.textContent = a;
  }
  var zh = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function pf(t, a, e) {
    var l = a.indexOf("--") === 0;
    e == null || typeof e == "boolean" || e === "" ? l ? t.setProperty(a, "") : a === "float" ? t.cssFloat = "" : t[a] = "" : l ? t.setProperty(a, e) : typeof e != "number" || e === 0 || zh.has(a) ? a === "float" ? t.cssFloat = e : t[a] = ("" + e).trim() : t[a] = e + "px";
  }
  function yf(t, a, e) {
    if (a != null && typeof a != "object")
      throw Error(r(62));
    if (t = t.style, e != null) {
      for (var l in e)
        !e.hasOwnProperty(l) || a != null && a.hasOwnProperty(l) || (l.indexOf("--") === 0 ? t.setProperty(l, "") : l === "float" ? t.cssFloat = "" : t[l] = "");
      for (var n in a)
        l = a[n], a.hasOwnProperty(n) && e[n] !== l && pf(t, n, l);
    } else
      for (var u in a)
        a.hasOwnProperty(u) && pf(t, u, a[u]);
  }
  function qi(t) {
    if (t.indexOf("-") === -1) return !1;
    switch (t) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var Oh = /* @__PURE__ */ new Map([
    ["acceptCharset", "accept-charset"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"],
    ["crossOrigin", "crossorigin"],
    ["accentHeight", "accent-height"],
    ["alignmentBaseline", "alignment-baseline"],
    ["arabicForm", "arabic-form"],
    ["baselineShift", "baseline-shift"],
    ["capHeight", "cap-height"],
    ["clipPath", "clip-path"],
    ["clipRule", "clip-rule"],
    ["colorInterpolation", "color-interpolation"],
    ["colorInterpolationFilters", "color-interpolation-filters"],
    ["colorProfile", "color-profile"],
    ["colorRendering", "color-rendering"],
    ["dominantBaseline", "dominant-baseline"],
    ["enableBackground", "enable-background"],
    ["fillOpacity", "fill-opacity"],
    ["fillRule", "fill-rule"],
    ["floodColor", "flood-color"],
    ["floodOpacity", "flood-opacity"],
    ["fontFamily", "font-family"],
    ["fontSize", "font-size"],
    ["fontSizeAdjust", "font-size-adjust"],
    ["fontStretch", "font-stretch"],
    ["fontStyle", "font-style"],
    ["fontVariant", "font-variant"],
    ["fontWeight", "font-weight"],
    ["glyphName", "glyph-name"],
    ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
    ["glyphOrientationVertical", "glyph-orientation-vertical"],
    ["horizAdvX", "horiz-adv-x"],
    ["horizOriginX", "horiz-origin-x"],
    ["imageRendering", "image-rendering"],
    ["letterSpacing", "letter-spacing"],
    ["lightingColor", "lighting-color"],
    ["markerEnd", "marker-end"],
    ["markerMid", "marker-mid"],
    ["markerStart", "marker-start"],
    ["overlinePosition", "overline-position"],
    ["overlineThickness", "overline-thickness"],
    ["paintOrder", "paint-order"],
    ["panose-1", "panose-1"],
    ["pointerEvents", "pointer-events"],
    ["renderingIntent", "rendering-intent"],
    ["shapeRendering", "shape-rendering"],
    ["stopColor", "stop-color"],
    ["stopOpacity", "stop-opacity"],
    ["strikethroughPosition", "strikethrough-position"],
    ["strikethroughThickness", "strikethrough-thickness"],
    ["strokeDasharray", "stroke-dasharray"],
    ["strokeDashoffset", "stroke-dashoffset"],
    ["strokeLinecap", "stroke-linecap"],
    ["strokeLinejoin", "stroke-linejoin"],
    ["strokeMiterlimit", "stroke-miterlimit"],
    ["strokeOpacity", "stroke-opacity"],
    ["strokeWidth", "stroke-width"],
    ["textAnchor", "text-anchor"],
    ["textDecoration", "text-decoration"],
    ["textRendering", "text-rendering"],
    ["transformOrigin", "transform-origin"],
    ["underlinePosition", "underline-position"],
    ["underlineThickness", "underline-thickness"],
    ["unicodeBidi", "unicode-bidi"],
    ["unicodeRange", "unicode-range"],
    ["unitsPerEm", "units-per-em"],
    ["vAlphabetic", "v-alphabetic"],
    ["vHanging", "v-hanging"],
    ["vIdeographic", "v-ideographic"],
    ["vMathematical", "v-mathematical"],
    ["vectorEffect", "vector-effect"],
    ["vertAdvY", "vert-adv-y"],
    ["vertOriginX", "vert-origin-x"],
    ["vertOriginY", "vert-origin-y"],
    ["wordSpacing", "word-spacing"],
    ["writingMode", "writing-mode"],
    ["xmlnsXlink", "xmlns:xlink"],
    ["xHeight", "x-height"]
  ]), Mh = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function vu(t) {
    return Mh.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
  }
  var Hi = null;
  function Ci(t) {
    return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
  }
  var ml = null, gl = null;
  function bf(t) {
    var a = fl(t);
    if (a && (t = a.stateNode)) {
      var e = t[na] || null;
      t: switch (t = a.stateNode, a.type) {
        case "input":
          if (Ri(
            t,
            e.value,
            e.defaultValue,
            e.defaultValue,
            e.checked,
            e.defaultChecked,
            e.type,
            e.name
          ), a = e.name, e.type === "radio" && a != null) {
            for (e = t; e.parentNode; ) e = e.parentNode;
            for (e = e.querySelectorAll(
              'input[name="' + Ta(
                "" + a
              ) + '"][type="radio"]'
            ), a = 0; a < e.length; a++) {
              var l = e[a];
              if (l !== t && l.form === t.form) {
                var n = l[na] || null;
                if (!n) throw Error(r(90));
                Ri(
                  l,
                  n.value,
                  n.defaultValue,
                  n.defaultValue,
                  n.checked,
                  n.defaultChecked,
                  n.type,
                  n.name
                );
              }
            }
            for (a = 0; a < e.length; a++)
              l = e[a], l.form === t.form && hf(l);
          }
          break t;
        case "textarea":
          mf(t, e.value, e.defaultValue);
          break t;
        case "select":
          a = e.value, a != null && hl(t, !!e.multiple, a, !1);
      }
    }
  }
  var wi = !1;
  function xf(t, a, e) {
    if (wi) return t(a, e);
    wi = !0;
    try {
      var l = t(a);
      return l;
    } finally {
      if (wi = !1, (ml !== null || gl !== null) && (Iu(), ml && (a = ml, t = gl, gl = ml = null, bf(a), t)))
        for (a = 0; a < t.length; a++) bf(t[a]);
    }
  }
  function cn(t, a) {
    var e = t.stateNode;
    if (e === null) return null;
    var l = e[na] || null;
    if (l === null) return null;
    e = l[a];
    t: switch (a) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (l = !l.disabled) || (t = t.type, l = !(t === "button" || t === "input" || t === "select" || t === "textarea")), t = !l;
        break t;
      default:
        t = !1;
    }
    if (t) return null;
    if (e && typeof e != "function")
      throw Error(
        r(231, a, typeof e)
      );
    return e;
  }
  var Ja = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Bi = !1;
  if (Ja)
    try {
      var sn = {};
      Object.defineProperty(sn, "passive", {
        get: function() {
          Bi = !0;
        }
      }), window.addEventListener("test", sn, sn), window.removeEventListener("test", sn, sn);
    } catch {
      Bi = !1;
    }
  var oe = null, Yi = null, mu = null;
  function Sf() {
    if (mu) return mu;
    var t, a = Yi, e = a.length, l, n = "value" in oe ? oe.value : oe.textContent, u = n.length;
    for (t = 0; t < e && a[t] === n[t]; t++) ;
    var i = e - t;
    for (l = 1; l <= i && a[e - l] === n[u - l]; l++) ;
    return mu = n.slice(t, 1 < l ? 1 - l : void 0);
  }
  function gu(t) {
    var a = t.keyCode;
    return "charCode" in t ? (t = t.charCode, t === 0 && a === 13 && (t = 13)) : t = a, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
  }
  function pu() {
    return !0;
  }
  function Tf() {
    return !1;
  }
  function ua(t) {
    function a(e, l, n, u, i) {
      this._reactName = e, this._targetInst = n, this.type = l, this.nativeEvent = u, this.target = i, this.currentTarget = null;
      for (var s in t)
        t.hasOwnProperty(s) && (e = t[s], this[s] = e ? e(u) : u[s]);
      return this.isDefaultPrevented = (u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1) ? pu : Tf, this.isPropagationStopped = Tf, this;
    }
    return D(a.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var e = this.nativeEvent;
        e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = pu);
      },
      stopPropagation: function() {
        var e = this.nativeEvent;
        e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = pu);
      },
      persist: function() {
      },
      isPersistent: pu
    }), a;
  }
  var Be = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(t) {
      return t.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, yu = ua(Be), fn = D({}, Be, { view: 0, detail: 0 }), Dh = ua(fn), Gi, Li, rn, bu = D({}, fn, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: Qi,
    button: 0,
    buttons: 0,
    relatedTarget: function(t) {
      return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
    },
    movementX: function(t) {
      return "movementX" in t ? t.movementX : (t !== rn && (rn && t.type === "mousemove" ? (Gi = t.screenX - rn.screenX, Li = t.screenY - rn.screenY) : Li = Gi = 0, rn = t), Gi);
    },
    movementY: function(t) {
      return "movementY" in t ? t.movementY : Li;
    }
  }), Ef = ua(bu), Rh = D({}, bu, { dataTransfer: 0 }), Uh = ua(Rh), qh = D({}, fn, { relatedTarget: 0 }), Xi = ua(qh), Hh = D({}, Be, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Ch = ua(Hh), wh = D({}, Be, {
    clipboardData: function(t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    }
  }), Bh = ua(wh), Yh = D({}, Be, { data: 0 }), jf = ua(Yh), Gh = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, Lh = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, Xh = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function Qh(t) {
    var a = this.nativeEvent;
    return a.getModifierState ? a.getModifierState(t) : (t = Xh[t]) ? !!a[t] : !1;
  }
  function Qi() {
    return Qh;
  }
  var Zh = D({}, fn, {
    key: function(t) {
      if (t.key) {
        var a = Gh[t.key] || t.key;
        if (a !== "Unidentified") return a;
      }
      return t.type === "keypress" ? (t = gu(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? Lh[t.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Qi,
    charCode: function(t) {
      return t.type === "keypress" ? gu(t) : 0;
    },
    keyCode: function(t) {
      return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    },
    which: function(t) {
      return t.type === "keypress" ? gu(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    }
  }), kh = ua(Zh), Vh = D({}, bu, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0
  }), _f = ua(Vh), Kh = D({}, fn, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Qi
  }), Jh = ua(Kh), $h = D({}, Be, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Wh = ua($h), Fh = D({}, bu, {
    deltaX: function(t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    },
    deltaY: function(t) {
      return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Ph = ua(Fh), Ih = D({}, Be, {
    newState: 0,
    oldState: 0
  }), tv = ua(Ih), av = [9, 13, 27, 32], Zi = Ja && "CompositionEvent" in window, on = null;
  Ja && "documentMode" in document && (on = document.documentMode);
  var ev = Ja && "TextEvent" in window && !on, Af = Ja && (!Zi || on && 8 < on && 11 >= on), Nf = " ", zf = !1;
  function Of(t, a) {
    switch (t) {
      case "keyup":
        return av.indexOf(a.keyCode) !== -1;
      case "keydown":
        return a.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function Mf(t) {
    return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
  }
  var pl = !1;
  function lv(t, a) {
    switch (t) {
      case "compositionend":
        return Mf(a);
      case "keypress":
        return a.which !== 32 ? null : (zf = !0, Nf);
      case "textInput":
        return t = a.data, t === Nf && zf ? null : t;
      default:
        return null;
    }
  }
  function nv(t, a) {
    if (pl)
      return t === "compositionend" || !Zi && Of(t, a) ? (t = Sf(), mu = Yi = oe = null, pl = !1, t) : null;
    switch (t) {
      case "paste":
        return null;
      case "keypress":
        if (!(a.ctrlKey || a.altKey || a.metaKey) || a.ctrlKey && a.altKey) {
          if (a.char && 1 < a.char.length)
            return a.char;
          if (a.which) return String.fromCharCode(a.which);
        }
        return null;
      case "compositionend":
        return Af && a.locale !== "ko" ? null : a.data;
      default:
        return null;
    }
  }
  var uv = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0
  };
  function Df(t) {
    var a = t && t.nodeName && t.nodeName.toLowerCase();
    return a === "input" ? !!uv[t.type] : a === "textarea";
  }
  function Rf(t, a, e, l) {
    ml ? gl ? gl.push(l) : gl = [l] : ml = l, a = ui(a, "onChange"), 0 < a.length && (e = new yu(
      "onChange",
      "change",
      null,
      e,
      l
    ), t.push({ event: e, listeners: a }));
  }
  var dn = null, hn = null;
  function iv(t) {
    hd(t, 0);
  }
  function xu(t) {
    var a = un(t);
    if (hf(a)) return t;
  }
  function Uf(t, a) {
    if (t === "change") return a;
  }
  var qf = !1;
  if (Ja) {
    var ki;
    if (Ja) {
      var Vi = "oninput" in document;
      if (!Vi) {
        var Hf = document.createElement("div");
        Hf.setAttribute("oninput", "return;"), Vi = typeof Hf.oninput == "function";
      }
      ki = Vi;
    } else ki = !1;
    qf = ki && (!document.documentMode || 9 < document.documentMode);
  }
  function Cf() {
    dn && (dn.detachEvent("onpropertychange", wf), hn = dn = null);
  }
  function wf(t) {
    if (t.propertyName === "value" && xu(hn)) {
      var a = [];
      Rf(
        a,
        hn,
        t,
        Ci(t)
      ), xf(iv, a);
    }
  }
  function cv(t, a, e) {
    t === "focusin" ? (Cf(), dn = a, hn = e, dn.attachEvent("onpropertychange", wf)) : t === "focusout" && Cf();
  }
  function sv(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return xu(hn);
  }
  function fv(t, a) {
    if (t === "click") return xu(a);
  }
  function rv(t, a) {
    if (t === "input" || t === "change")
      return xu(a);
  }
  function ov(t, a) {
    return t === a && (t !== 0 || 1 / t === 1 / a) || t !== t && a !== a;
  }
  var da = typeof Object.is == "function" ? Object.is : ov;
  function vn(t, a) {
    if (da(t, a)) return !0;
    if (typeof t != "object" || t === null || typeof a != "object" || a === null)
      return !1;
    var e = Object.keys(t), l = Object.keys(a);
    if (e.length !== l.length) return !1;
    for (l = 0; l < e.length; l++) {
      var n = e[l];
      if (!al.call(a, n) || !da(t[n], a[n]))
        return !1;
    }
    return !0;
  }
  function Bf(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function Yf(t, a) {
    var e = Bf(t);
    t = 0;
    for (var l; e; ) {
      if (e.nodeType === 3) {
        if (l = t + e.textContent.length, t <= a && l >= a)
          return { node: e, offset: a - t };
        t = l;
      }
      t: {
        for (; e; ) {
          if (e.nextSibling) {
            e = e.nextSibling;
            break t;
          }
          e = e.parentNode;
        }
        e = void 0;
      }
      e = Bf(e);
    }
  }
  function Gf(t, a) {
    return t && a ? t === a ? !0 : t && t.nodeType === 3 ? !1 : a && a.nodeType === 3 ? Gf(t, a.parentNode) : "contains" in t ? t.contains(a) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(a) & 16) : !1 : !1;
  }
  function Lf(t) {
    t = t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null ? t.ownerDocument.defaultView : window;
    for (var a = hu(t.document); a instanceof t.HTMLIFrameElement; ) {
      try {
        var e = typeof a.contentWindow.location.href == "string";
      } catch {
        e = !1;
      }
      if (e) t = a.contentWindow;
      else break;
      a = hu(t.document);
    }
    return a;
  }
  function Ki(t) {
    var a = t && t.nodeName && t.nodeName.toLowerCase();
    return a && (a === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || a === "textarea" || t.contentEditable === "true");
  }
  var dv = Ja && "documentMode" in document && 11 >= document.documentMode, yl = null, Ji = null, mn = null, $i = !1;
  function Xf(t, a, e) {
    var l = e.window === e ? e.document : e.nodeType === 9 ? e : e.ownerDocument;
    $i || yl == null || yl !== hu(l) || (l = yl, "selectionStart" in l && Ki(l) ? l = { start: l.selectionStart, end: l.selectionEnd } : (l = (l.ownerDocument && l.ownerDocument.defaultView || window).getSelection(), l = {
      anchorNode: l.anchorNode,
      anchorOffset: l.anchorOffset,
      focusNode: l.focusNode,
      focusOffset: l.focusOffset
    }), mn && vn(mn, l) || (mn = l, l = ui(Ji, "onSelect"), 0 < l.length && (a = new yu(
      "onSelect",
      "select",
      null,
      a,
      e
    ), t.push({ event: a, listeners: l }), a.target = yl)));
  }
  function Ye(t, a) {
    var e = {};
    return e[t.toLowerCase()] = a.toLowerCase(), e["Webkit" + t] = "webkit" + a, e["Moz" + t] = "moz" + a, e;
  }
  var bl = {
    animationend: Ye("Animation", "AnimationEnd"),
    animationiteration: Ye("Animation", "AnimationIteration"),
    animationstart: Ye("Animation", "AnimationStart"),
    transitionrun: Ye("Transition", "TransitionRun"),
    transitionstart: Ye("Transition", "TransitionStart"),
    transitioncancel: Ye("Transition", "TransitionCancel"),
    transitionend: Ye("Transition", "TransitionEnd")
  }, Wi = {}, Qf = {};
  Ja && (Qf = document.createElement("div").style, "AnimationEvent" in window || (delete bl.animationend.animation, delete bl.animationiteration.animation, delete bl.animationstart.animation), "TransitionEvent" in window || delete bl.transitionend.transition);
  function Ge(t) {
    if (Wi[t]) return Wi[t];
    if (!bl[t]) return t;
    var a = bl[t], e;
    for (e in a)
      if (a.hasOwnProperty(e) && e in Qf)
        return Wi[t] = a[e];
    return t;
  }
  var Zf = Ge("animationend"), kf = Ge("animationiteration"), Vf = Ge("animationstart"), hv = Ge("transitionrun"), vv = Ge("transitionstart"), mv = Ge("transitioncancel"), Kf = Ge("transitionend"), Jf = /* @__PURE__ */ new Map(), Fi = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Fi.push("scrollEnd");
  function Ua(t, a) {
    Jf.set(t, a), we(a, [t]);
  }
  var $f = /* @__PURE__ */ new WeakMap();
  function Ea(t, a) {
    if (typeof t == "object" && t !== null) {
      var e = $f.get(t);
      return e !== void 0 ? e : (a = {
        value: t,
        source: a,
        stack: of(a)
      }, $f.set(t, a), a);
    }
    return {
      value: t,
      source: a,
      stack: of(a)
    };
  }
  var ja = [], xl = 0, Pi = 0;
  function Su() {
    for (var t = xl, a = Pi = xl = 0; a < t; ) {
      var e = ja[a];
      ja[a++] = null;
      var l = ja[a];
      ja[a++] = null;
      var n = ja[a];
      ja[a++] = null;
      var u = ja[a];
      if (ja[a++] = null, l !== null && n !== null) {
        var i = l.pending;
        i === null ? n.next = n : (n.next = i.next, i.next = n), l.pending = n;
      }
      u !== 0 && Wf(e, n, u);
    }
  }
  function Tu(t, a, e, l) {
    ja[xl++] = t, ja[xl++] = a, ja[xl++] = e, ja[xl++] = l, Pi |= l, t.lanes |= l, t = t.alternate, t !== null && (t.lanes |= l);
  }
  function Ii(t, a, e, l) {
    return Tu(t, a, e, l), Eu(t);
  }
  function Sl(t, a) {
    return Tu(t, null, null, a), Eu(t);
  }
  function Wf(t, a, e) {
    t.lanes |= e;
    var l = t.alternate;
    l !== null && (l.lanes |= e);
    for (var n = !1, u = t.return; u !== null; )
      u.childLanes |= e, l = u.alternate, l !== null && (l.childLanes |= e), u.tag === 22 && (t = u.stateNode, t === null || t._visibility & 1 || (n = !0)), t = u, u = u.return;
    return t.tag === 3 ? (u = t.stateNode, n && a !== null && (n = 31 - Ft(e), t = u.hiddenUpdates, l = t[n], l === null ? t[n] = [a] : l.push(a), a.lane = e | 536870912), u) : null;
  }
  function Eu(t) {
    if (50 < Gn)
      throw Gn = 0, us = null, Error(r(185));
    for (var a = t.return; a !== null; )
      t = a, a = t.return;
    return t.tag === 3 ? t.stateNode : null;
  }
  var Tl = {};
  function gv(t, a, e, l) {
    this.tag = t, this.key = e, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = a, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = l, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function ha(t, a, e, l) {
    return new gv(t, a, e, l);
  }
  function tc(t) {
    return t = t.prototype, !(!t || !t.isReactComponent);
  }
  function $a(t, a) {
    var e = t.alternate;
    return e === null ? (e = ha(
      t.tag,
      a,
      t.key,
      t.mode
    ), e.elementType = t.elementType, e.type = t.type, e.stateNode = t.stateNode, e.alternate = t, t.alternate = e) : (e.pendingProps = a, e.type = t.type, e.flags = 0, e.subtreeFlags = 0, e.deletions = null), e.flags = t.flags & 65011712, e.childLanes = t.childLanes, e.lanes = t.lanes, e.child = t.child, e.memoizedProps = t.memoizedProps, e.memoizedState = t.memoizedState, e.updateQueue = t.updateQueue, a = t.dependencies, e.dependencies = a === null ? null : { lanes: a.lanes, firstContext: a.firstContext }, e.sibling = t.sibling, e.index = t.index, e.ref = t.ref, e.refCleanup = t.refCleanup, e;
  }
  function Ff(t, a) {
    t.flags &= 65011714;
    var e = t.alternate;
    return e === null ? (t.childLanes = 0, t.lanes = a, t.child = null, t.subtreeFlags = 0, t.memoizedProps = null, t.memoizedState = null, t.updateQueue = null, t.dependencies = null, t.stateNode = null) : (t.childLanes = e.childLanes, t.lanes = e.lanes, t.child = e.child, t.subtreeFlags = 0, t.deletions = null, t.memoizedProps = e.memoizedProps, t.memoizedState = e.memoizedState, t.updateQueue = e.updateQueue, t.type = e.type, a = e.dependencies, t.dependencies = a === null ? null : {
      lanes: a.lanes,
      firstContext: a.firstContext
    }), t;
  }
  function ju(t, a, e, l, n, u) {
    var i = 0;
    if (l = t, typeof t == "function") tc(t) && (i = 1);
    else if (typeof t == "string")
      i = ym(
        t,
        e,
        k.current
      ) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
    else
      t: switch (t) {
        case Mt:
          return t = ha(31, e, a, n), t.elementType = Mt, t.lanes = u, t;
        case V:
          return Le(e.children, n, u, a);
        case K:
          i = 8, n |= 24;
          break;
        case lt:
          return t = ha(12, e, a, n | 2), t.elementType = lt, t.lanes = u, t;
        case J:
          return t = ha(13, e, a, n), t.elementType = J, t.lanes = u, t;
        case ut:
          return t = ha(19, e, a, n), t.elementType = ut, t.lanes = u, t;
        default:
          if (typeof t == "object" && t !== null)
            switch (t.$$typeof) {
              case at:
              case G:
                i = 10;
                break t;
              case et:
                i = 9;
                break t;
              case F:
                i = 11;
                break t;
              case q:
                i = 14;
                break t;
              case W:
                i = 16, l = null;
                break t;
            }
          i = 29, e = Error(
            r(130, t === null ? "null" : typeof t, "")
          ), l = null;
      }
    return a = ha(i, e, a, n), a.elementType = t, a.type = l, a.lanes = u, a;
  }
  function Le(t, a, e, l) {
    return t = ha(7, t, l, a), t.lanes = e, t;
  }
  function ac(t, a, e) {
    return t = ha(6, t, null, a), t.lanes = e, t;
  }
  function ec(t, a, e) {
    return a = ha(
      4,
      t.children !== null ? t.children : [],
      t.key,
      a
    ), a.lanes = e, a.stateNode = {
      containerInfo: t.containerInfo,
      pendingChildren: null,
      implementation: t.implementation
    }, a;
  }
  var El = [], jl = 0, _u = null, Au = 0, _a = [], Aa = 0, Xe = null, Wa = 1, Fa = "";
  function Qe(t, a) {
    El[jl++] = Au, El[jl++] = _u, _u = t, Au = a;
  }
  function Pf(t, a, e) {
    _a[Aa++] = Wa, _a[Aa++] = Fa, _a[Aa++] = Xe, Xe = t;
    var l = Wa;
    t = Fa;
    var n = 32 - Ft(l) - 1;
    l &= ~(1 << n), e += 1;
    var u = 32 - Ft(a) + n;
    if (30 < u) {
      var i = n - n % 5;
      u = (l & (1 << i) - 1).toString(32), l >>= i, n -= i, Wa = 1 << 32 - Ft(a) + n | e << n | l, Fa = u + t;
    } else
      Wa = 1 << u | e << n | l, Fa = t;
  }
  function lc(t) {
    t.return !== null && (Qe(t, 1), Pf(t, 1, 0));
  }
  function nc(t) {
    for (; t === _u; )
      _u = El[--jl], El[jl] = null, Au = El[--jl], El[jl] = null;
    for (; t === Xe; )
      Xe = _a[--Aa], _a[Aa] = null, Fa = _a[--Aa], _a[Aa] = null, Wa = _a[--Aa], _a[Aa] = null;
  }
  var ea = null, Ut = null, gt = !1, Ze = null, Ya = !1, uc = Error(r(519));
  function ke(t) {
    var a = Error(r(418, ""));
    throw yn(Ea(a, t)), uc;
  }
  function If(t) {
    var a = t.stateNode, e = t.type, l = t.memoizedProps;
    switch (a[Pt] = t, a[na] = l, e) {
      case "dialog":
        ht("cancel", a), ht("close", a);
        break;
      case "iframe":
      case "object":
      case "embed":
        ht("load", a);
        break;
      case "video":
      case "audio":
        for (e = 0; e < Xn.length; e++)
          ht(Xn[e], a);
        break;
      case "source":
        ht("error", a);
        break;
      case "img":
      case "image":
      case "link":
        ht("error", a), ht("load", a);
        break;
      case "details":
        ht("toggle", a);
        break;
      case "input":
        ht("invalid", a), vf(
          a,
          l.value,
          l.defaultValue,
          l.checked,
          l.defaultChecked,
          l.type,
          l.name,
          !0
        ), du(a);
        break;
      case "select":
        ht("invalid", a);
        break;
      case "textarea":
        ht("invalid", a), gf(a, l.value, l.defaultValue, l.children), du(a);
    }
    e = l.children, typeof e != "string" && typeof e != "number" && typeof e != "bigint" || a.textContent === "" + e || l.suppressHydrationWarning === !0 || pd(a.textContent, e) ? (l.popover != null && (ht("beforetoggle", a), ht("toggle", a)), l.onScroll != null && ht("scroll", a), l.onScrollEnd != null && ht("scrollend", a), l.onClick != null && (a.onclick = ii), a = !0) : a = !1, a || ke(t);
  }
  function tr(t) {
    for (ea = t.return; ea; )
      switch (ea.tag) {
        case 5:
        case 13:
          Ya = !1;
          return;
        case 27:
        case 3:
          Ya = !0;
          return;
        default:
          ea = ea.return;
      }
  }
  function gn(t) {
    if (t !== ea) return !1;
    if (!gt) return tr(t), gt = !0, !1;
    var a = t.tag, e;
    if ((e = a !== 3 && a !== 27) && ((e = a === 5) && (e = t.type, e = !(e !== "form" && e !== "button") || Ss(t.type, t.memoizedProps)), e = !e), e && Ut && ke(t), tr(t), a === 13) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(r(317));
      t: {
        for (t = t.nextSibling, a = 0; t; ) {
          if (t.nodeType === 8)
            if (e = t.data, e === "/$") {
              if (a === 0) {
                Ut = Ha(t.nextSibling);
                break t;
              }
              a--;
            } else
              e !== "$" && e !== "$!" && e !== "$?" || a++;
          t = t.nextSibling;
        }
        Ut = null;
      }
    } else
      a === 27 ? (a = Ut, Ne(t.type) ? (t = _s, _s = null, Ut = t) : Ut = a) : Ut = ea ? Ha(t.stateNode.nextSibling) : null;
    return !0;
  }
  function pn() {
    Ut = ea = null, gt = !1;
  }
  function ar() {
    var t = Ze;
    return t !== null && (sa === null ? sa = t : sa.push.apply(
      sa,
      t
    ), Ze = null), t;
  }
  function yn(t) {
    Ze === null ? Ze = [t] : Ze.push(t);
  }
  var ic = M(null), Ve = null, Pa = null;
  function de(t, a, e) {
    w(ic, a._currentValue), a._currentValue = e;
  }
  function Ia(t) {
    t._currentValue = ic.current, L(ic);
  }
  function cc(t, a, e) {
    for (; t !== null; ) {
      var l = t.alternate;
      if ((t.childLanes & a) !== a ? (t.childLanes |= a, l !== null && (l.childLanes |= a)) : l !== null && (l.childLanes & a) !== a && (l.childLanes |= a), t === e) break;
      t = t.return;
    }
  }
  function sc(t, a, e, l) {
    var n = t.child;
    for (n !== null && (n.return = t); n !== null; ) {
      var u = n.dependencies;
      if (u !== null) {
        var i = n.child;
        u = u.firstContext;
        t: for (; u !== null; ) {
          var s = u;
          u = n;
          for (var d = 0; d < a.length; d++)
            if (s.context === a[d]) {
              u.lanes |= e, s = u.alternate, s !== null && (s.lanes |= e), cc(
                u.return,
                e,
                t
              ), l || (i = null);
              break t;
            }
          u = s.next;
        }
      } else if (n.tag === 18) {
        if (i = n.return, i === null) throw Error(r(341));
        i.lanes |= e, u = i.alternate, u !== null && (u.lanes |= e), cc(i, e, t), i = null;
      } else i = n.child;
      if (i !== null) i.return = n;
      else
        for (i = n; i !== null; ) {
          if (i === t) {
            i = null;
            break;
          }
          if (n = i.sibling, n !== null) {
            n.return = i.return, i = n;
            break;
          }
          i = i.return;
        }
      n = i;
    }
  }
  function bn(t, a, e, l) {
    t = null;
    for (var n = a, u = !1; n !== null; ) {
      if (!u) {
        if ((n.flags & 524288) !== 0) u = !0;
        else if ((n.flags & 262144) !== 0) break;
      }
      if (n.tag === 10) {
        var i = n.alternate;
        if (i === null) throw Error(r(387));
        if (i = i.memoizedProps, i !== null) {
          var s = n.type;
          da(n.pendingProps.value, i.value) || (t !== null ? t.push(s) : t = [s]);
        }
      } else if (n === Kt.current) {
        if (i = n.alternate, i === null) throw Error(r(387));
        i.memoizedState.memoizedState !== n.memoizedState.memoizedState && (t !== null ? t.push(Jn) : t = [Jn]);
      }
      n = n.return;
    }
    t !== null && sc(
      a,
      t,
      e,
      l
    ), a.flags |= 262144;
  }
  function Nu(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!da(
        t.context._currentValue,
        t.memoizedValue
      ))
        return !0;
      t = t.next;
    }
    return !1;
  }
  function Ke(t) {
    Ve = t, Pa = null, t = t.dependencies, t !== null && (t.firstContext = null);
  }
  function It(t) {
    return er(Ve, t);
  }
  function zu(t, a) {
    return Ve === null && Ke(t), er(t, a);
  }
  function er(t, a) {
    var e = a._currentValue;
    if (a = { context: a, memoizedValue: e, next: null }, Pa === null) {
      if (t === null) throw Error(r(308));
      Pa = a, t.dependencies = { lanes: 0, firstContext: a }, t.flags |= 524288;
    } else Pa = Pa.next = a;
    return e;
  }
  var pv = typeof AbortController < "u" ? AbortController : function() {
    var t = [], a = this.signal = {
      aborted: !1,
      addEventListener: function(e, l) {
        t.push(l);
      }
    };
    this.abort = function() {
      a.aborted = !0, t.forEach(function(e) {
        return e();
      });
    };
  }, yv = c.unstable_scheduleCallback, bv = c.unstable_NormalPriority, Lt = {
    $$typeof: G,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function fc() {
    return {
      controller: new pv(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function xn(t) {
    t.refCount--, t.refCount === 0 && yv(bv, function() {
      t.controller.abort();
    });
  }
  var Sn = null, rc = 0, _l = 0, Al = null;
  function xv(t, a) {
    if (Sn === null) {
      var e = Sn = [];
      rc = 0, _l = ds(), Al = {
        status: "pending",
        value: void 0,
        then: function(l) {
          e.push(l);
        }
      };
    }
    return rc++, a.then(lr, lr), a;
  }
  function lr() {
    if (--rc === 0 && Sn !== null) {
      Al !== null && (Al.status = "fulfilled");
      var t = Sn;
      Sn = null, _l = 0, Al = null;
      for (var a = 0; a < t.length; a++) (0, t[a])();
    }
  }
  function Sv(t, a) {
    var e = [], l = {
      status: "pending",
      value: null,
      reason: null,
      then: function(n) {
        e.push(n);
      }
    };
    return t.then(
      function() {
        l.status = "fulfilled", l.value = a;
        for (var n = 0; n < e.length; n++) (0, e[n])(a);
      },
      function(n) {
        for (l.status = "rejected", l.reason = n, n = 0; n < e.length; n++)
          (0, e[n])(void 0);
      }
    ), l;
  }
  var nr = A.S;
  A.S = function(t, a) {
    typeof a == "object" && a !== null && typeof a.then == "function" && xv(t, a), nr !== null && nr(t, a);
  };
  var Je = M(null);
  function oc() {
    var t = Je.current;
    return t !== null ? t : Nt.pooledCache;
  }
  function Ou(t, a) {
    a === null ? w(Je, Je.current) : w(Je, a.pool);
  }
  function ur() {
    var t = oc();
    return t === null ? null : { parent: Lt._currentValue, pool: t };
  }
  var Tn = Error(r(460)), ir = Error(r(474)), Mu = Error(r(542)), dc = { then: function() {
  } };
  function cr(t) {
    return t = t.status, t === "fulfilled" || t === "rejected";
  }
  function Du() {
  }
  function sr(t, a, e) {
    switch (e = t[e], e === void 0 ? t.push(a) : e !== a && (a.then(Du, Du), a = e), a.status) {
      case "fulfilled":
        return a.value;
      case "rejected":
        throw t = a.reason, rr(t), t;
      default:
        if (typeof a.status == "string") a.then(Du, Du);
        else {
          if (t = Nt, t !== null && 100 < t.shellSuspendCounter)
            throw Error(r(482));
          t = a, t.status = "pending", t.then(
            function(l) {
              if (a.status === "pending") {
                var n = a;
                n.status = "fulfilled", n.value = l;
              }
            },
            function(l) {
              if (a.status === "pending") {
                var n = a;
                n.status = "rejected", n.reason = l;
              }
            }
          );
        }
        switch (a.status) {
          case "fulfilled":
            return a.value;
          case "rejected":
            throw t = a.reason, rr(t), t;
        }
        throw En = a, Tn;
    }
  }
  var En = null;
  function fr() {
    if (En === null) throw Error(r(459));
    var t = En;
    return En = null, t;
  }
  function rr(t) {
    if (t === Tn || t === Mu)
      throw Error(r(483));
  }
  var he = !1;
  function hc(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function vc(t, a) {
    t = t.updateQueue, a.updateQueue === t && (a.updateQueue = {
      baseState: t.baseState,
      firstBaseUpdate: t.firstBaseUpdate,
      lastBaseUpdate: t.lastBaseUpdate,
      shared: t.shared,
      callbacks: null
    });
  }
  function ve(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function me(t, a, e) {
    var l = t.updateQueue;
    if (l === null) return null;
    if (l = l.shared, (xt & 2) !== 0) {
      var n = l.pending;
      return n === null ? a.next = a : (a.next = n.next, n.next = a), l.pending = a, a = Eu(t), Wf(t, null, e), a;
    }
    return Tu(t, l, a, e), Eu(t);
  }
  function jn(t, a, e) {
    if (a = a.updateQueue, a !== null && (a = a.shared, (e & 4194048) !== 0)) {
      var l = a.lanes;
      l &= t.pendingLanes, e |= l, a.lanes = e, ct(t, e);
    }
  }
  function mc(t, a) {
    var e = t.updateQueue, l = t.alternate;
    if (l !== null && (l = l.updateQueue, e === l)) {
      var n = null, u = null;
      if (e = e.firstBaseUpdate, e !== null) {
        do {
          var i = {
            lane: e.lane,
            tag: e.tag,
            payload: e.payload,
            callback: null,
            next: null
          };
          u === null ? n = u = i : u = u.next = i, e = e.next;
        } while (e !== null);
        u === null ? n = u = a : u = u.next = a;
      } else n = u = a;
      e = {
        baseState: l.baseState,
        firstBaseUpdate: n,
        lastBaseUpdate: u,
        shared: l.shared,
        callbacks: l.callbacks
      }, t.updateQueue = e;
      return;
    }
    t = e.lastBaseUpdate, t === null ? e.firstBaseUpdate = a : t.next = a, e.lastBaseUpdate = a;
  }
  var gc = !1;
  function _n() {
    if (gc) {
      var t = Al;
      if (t !== null) throw t;
    }
  }
  function An(t, a, e, l) {
    gc = !1;
    var n = t.updateQueue;
    he = !1;
    var u = n.firstBaseUpdate, i = n.lastBaseUpdate, s = n.shared.pending;
    if (s !== null) {
      n.shared.pending = null;
      var d = s, y = d.next;
      d.next = null, i === null ? u = y : i.next = y, i = d;
      var N = t.alternate;
      N !== null && (N = N.updateQueue, s = N.lastBaseUpdate, s !== i && (s === null ? N.firstBaseUpdate = y : s.next = y, N.lastBaseUpdate = d));
    }
    if (u !== null) {
      var O = n.baseState;
      i = 0, N = y = d = null, s = u;
      do {
        var b = s.lane & -536870913, x = b !== s.lane;
        if (x ? (vt & b) === b : (l & b) === b) {
          b !== 0 && b === _l && (gc = !0), N !== null && (N = N.next = {
            lane: 0,
            tag: s.tag,
            payload: s.payload,
            callback: null,
            next: null
          });
          t: {
            var nt = t, I = s;
            b = a;
            var _t = e;
            switch (I.tag) {
              case 1:
                if (nt = I.payload, typeof nt == "function") {
                  O = nt.call(_t, O, b);
                  break t;
                }
                O = nt;
                break t;
              case 3:
                nt.flags = nt.flags & -65537 | 128;
              case 0:
                if (nt = I.payload, b = typeof nt == "function" ? nt.call(_t, O, b) : nt, b == null) break t;
                O = D({}, O, b);
                break t;
              case 2:
                he = !0;
            }
          }
          b = s.callback, b !== null && (t.flags |= 64, x && (t.flags |= 8192), x = n.callbacks, x === null ? n.callbacks = [b] : x.push(b));
        } else
          x = {
            lane: b,
            tag: s.tag,
            payload: s.payload,
            callback: s.callback,
            next: null
          }, N === null ? (y = N = x, d = O) : N = N.next = x, i |= b;
        if (s = s.next, s === null) {
          if (s = n.shared.pending, s === null)
            break;
          x = s, s = x.next, x.next = null, n.lastBaseUpdate = x, n.shared.pending = null;
        }
      } while (!0);
      N === null && (d = O), n.baseState = d, n.firstBaseUpdate = y, n.lastBaseUpdate = N, u === null && (n.shared.lanes = 0), Ee |= i, t.lanes = i, t.memoizedState = O;
    }
  }
  function or(t, a) {
    if (typeof t != "function")
      throw Error(r(191, t));
    t.call(a);
  }
  function dr(t, a) {
    var e = t.callbacks;
    if (e !== null)
      for (t.callbacks = null, t = 0; t < e.length; t++)
        or(e[t], a);
  }
  var Nl = M(null), Ru = M(0);
  function hr(t, a) {
    t = ie, w(Ru, t), w(Nl, a), ie = t | a.baseLanes;
  }
  function pc() {
    w(Ru, ie), w(Nl, Nl.current);
  }
  function yc() {
    ie = Ru.current, L(Nl), L(Ru);
  }
  var ge = 0, ft = null, Et = null, Yt = null, Uu = !1, zl = !1, $e = !1, qu = 0, Nn = 0, Ol = null, Tv = 0;
  function wt() {
    throw Error(r(321));
  }
  function bc(t, a) {
    if (a === null) return !1;
    for (var e = 0; e < a.length && e < t.length; e++)
      if (!da(t[e], a[e])) return !1;
    return !0;
  }
  function xc(t, a, e, l, n, u) {
    return ge = u, ft = a, a.memoizedState = null, a.updateQueue = null, a.lanes = 0, A.H = t === null || t.memoizedState === null ? Wr : Fr, $e = !1, u = e(l, n), $e = !1, zl && (u = mr(
      a,
      e,
      l,
      n
    )), vr(t), u;
  }
  function vr(t) {
    A.H = Gu;
    var a = Et !== null && Et.next !== null;
    if (ge = 0, Yt = Et = ft = null, Uu = !1, Nn = 0, Ol = null, a) throw Error(r(300));
    t === null || Zt || (t = t.dependencies, t !== null && Nu(t) && (Zt = !0));
  }
  function mr(t, a, e, l) {
    ft = t;
    var n = 0;
    do {
      if (zl && (Ol = null), Nn = 0, zl = !1, 25 <= n) throw Error(r(301));
      if (n += 1, Yt = Et = null, t.updateQueue != null) {
        var u = t.updateQueue;
        u.lastEffect = null, u.events = null, u.stores = null, u.memoCache != null && (u.memoCache.index = 0);
      }
      A.H = Ov, u = a(e, l);
    } while (zl);
    return u;
  }
  function Ev() {
    var t = A.H, a = t.useState()[0];
    return a = typeof a.then == "function" ? zn(a) : a, t = t.useState()[0], (Et !== null ? Et.memoizedState : null) !== t && (ft.flags |= 1024), a;
  }
  function Sc() {
    var t = qu !== 0;
    return qu = 0, t;
  }
  function Tc(t, a, e) {
    a.updateQueue = t.updateQueue, a.flags &= -2053, t.lanes &= ~e;
  }
  function Ec(t) {
    if (Uu) {
      for (t = t.memoizedState; t !== null; ) {
        var a = t.queue;
        a !== null && (a.pending = null), t = t.next;
      }
      Uu = !1;
    }
    ge = 0, Yt = Et = ft = null, zl = !1, Nn = qu = 0, Ol = null;
  }
  function ia() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Yt === null ? ft.memoizedState = Yt = t : Yt = Yt.next = t, Yt;
  }
  function Gt() {
    if (Et === null) {
      var t = ft.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = Et.next;
    var a = Yt === null ? ft.memoizedState : Yt.next;
    if (a !== null)
      Yt = a, Et = t;
    else {
      if (t === null)
        throw ft.alternate === null ? Error(r(467)) : Error(r(310));
      Et = t, t = {
        memoizedState: Et.memoizedState,
        baseState: Et.baseState,
        baseQueue: Et.baseQueue,
        queue: Et.queue,
        next: null
      }, Yt === null ? ft.memoizedState = Yt = t : Yt = Yt.next = t;
    }
    return Yt;
  }
  function jc() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function zn(t) {
    var a = Nn;
    return Nn += 1, Ol === null && (Ol = []), t = sr(Ol, t, a), a = ft, (Yt === null ? a.memoizedState : Yt.next) === null && (a = a.alternate, A.H = a === null || a.memoizedState === null ? Wr : Fr), t;
  }
  function Hu(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return zn(t);
      if (t.$$typeof === G) return It(t);
    }
    throw Error(r(438, String(t)));
  }
  function _c(t) {
    var a = null, e = ft.updateQueue;
    if (e !== null && (a = e.memoCache), a == null) {
      var l = ft.alternate;
      l !== null && (l = l.updateQueue, l !== null && (l = l.memoCache, l != null && (a = {
        data: l.data.map(function(n) {
          return n.slice();
        }),
        index: 0
      })));
    }
    if (a == null && (a = { data: [], index: 0 }), e === null && (e = jc(), ft.updateQueue = e), e.memoCache = a, e = a.data[a.index], e === void 0)
      for (e = a.data[a.index] = Array(t), l = 0; l < t; l++)
        e[l] = Ba;
    return a.index++, e;
  }
  function te(t, a) {
    return typeof a == "function" ? a(t) : a;
  }
  function Cu(t) {
    var a = Gt();
    return Ac(a, Et, t);
  }
  function Ac(t, a, e) {
    var l = t.queue;
    if (l === null) throw Error(r(311));
    l.lastRenderedReducer = e;
    var n = t.baseQueue, u = l.pending;
    if (u !== null) {
      if (n !== null) {
        var i = n.next;
        n.next = u.next, u.next = i;
      }
      a.baseQueue = n = u, l.pending = null;
    }
    if (u = t.baseState, n === null) t.memoizedState = u;
    else {
      a = n.next;
      var s = i = null, d = null, y = a, N = !1;
      do {
        var O = y.lane & -536870913;
        if (O !== y.lane ? (vt & O) === O : (ge & O) === O) {
          var b = y.revertLane;
          if (b === 0)
            d !== null && (d = d.next = {
              lane: 0,
              revertLane: 0,
              action: y.action,
              hasEagerState: y.hasEagerState,
              eagerState: y.eagerState,
              next: null
            }), O === _l && (N = !0);
          else if ((ge & b) === b) {
            y = y.next, b === _l && (N = !0);
            continue;
          } else
            O = {
              lane: 0,
              revertLane: y.revertLane,
              action: y.action,
              hasEagerState: y.hasEagerState,
              eagerState: y.eagerState,
              next: null
            }, d === null ? (s = d = O, i = u) : d = d.next = O, ft.lanes |= b, Ee |= b;
          O = y.action, $e && e(u, O), u = y.hasEagerState ? y.eagerState : e(u, O);
        } else
          b = {
            lane: O,
            revertLane: y.revertLane,
            action: y.action,
            hasEagerState: y.hasEagerState,
            eagerState: y.eagerState,
            next: null
          }, d === null ? (s = d = b, i = u) : d = d.next = b, ft.lanes |= O, Ee |= O;
        y = y.next;
      } while (y !== null && y !== a);
      if (d === null ? i = u : d.next = s, !da(u, t.memoizedState) && (Zt = !0, N && (e = Al, e !== null)))
        throw e;
      t.memoizedState = u, t.baseState = i, t.baseQueue = d, l.lastRenderedState = u;
    }
    return n === null && (l.lanes = 0), [t.memoizedState, l.dispatch];
  }
  function Nc(t) {
    var a = Gt(), e = a.queue;
    if (e === null) throw Error(r(311));
    e.lastRenderedReducer = t;
    var l = e.dispatch, n = e.pending, u = a.memoizedState;
    if (n !== null) {
      e.pending = null;
      var i = n = n.next;
      do
        u = t(u, i.action), i = i.next;
      while (i !== n);
      da(u, a.memoizedState) || (Zt = !0), a.memoizedState = u, a.baseQueue === null && (a.baseState = u), e.lastRenderedState = u;
    }
    return [u, l];
  }
  function gr(t, a, e) {
    var l = ft, n = Gt(), u = gt;
    if (u) {
      if (e === void 0) throw Error(r(407));
      e = e();
    } else e = a();
    var i = !da(
      (Et || n).memoizedState,
      e
    );
    i && (n.memoizedState = e, Zt = !0), n = n.queue;
    var s = br.bind(null, l, n, t);
    if (On(2048, 8, s, [t]), n.getSnapshot !== a || i || Yt !== null && Yt.memoizedState.tag & 1) {
      if (l.flags |= 2048, Ml(
        9,
        wu(),
        yr.bind(
          null,
          l,
          n,
          e,
          a
        ),
        null
      ), Nt === null) throw Error(r(349));
      u || (ge & 124) !== 0 || pr(l, a, e);
    }
    return e;
  }
  function pr(t, a, e) {
    t.flags |= 16384, t = { getSnapshot: a, value: e }, a = ft.updateQueue, a === null ? (a = jc(), ft.updateQueue = a, a.stores = [t]) : (e = a.stores, e === null ? a.stores = [t] : e.push(t));
  }
  function yr(t, a, e, l) {
    a.value = e, a.getSnapshot = l, xr(a) && Sr(t);
  }
  function br(t, a, e) {
    return e(function() {
      xr(a) && Sr(t);
    });
  }
  function xr(t) {
    var a = t.getSnapshot;
    t = t.value;
    try {
      var e = a();
      return !da(t, e);
    } catch {
      return !0;
    }
  }
  function Sr(t) {
    var a = Sl(t, 2);
    a !== null && ya(a, t, 2);
  }
  function zc(t) {
    var a = ia();
    if (typeof t == "function") {
      var e = t;
      if (t = e(), $e) {
        Da(!0);
        try {
          e();
        } finally {
          Da(!1);
        }
      }
    }
    return a.memoizedState = a.baseState = t, a.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: te,
      lastRenderedState: t
    }, a;
  }
  function Tr(t, a, e, l) {
    return t.baseState = e, Ac(
      t,
      Et,
      typeof l == "function" ? l : te
    );
  }
  function jv(t, a, e, l, n) {
    if (Yu(t)) throw Error(r(485));
    if (t = a.action, t !== null) {
      var u = {
        payload: n,
        action: t,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(i) {
          u.listeners.push(i);
        }
      };
      A.T !== null ? e(!0) : u.isTransition = !1, l(u), e = a.pending, e === null ? (u.next = a.pending = u, Er(a, u)) : (u.next = e.next, a.pending = e.next = u);
    }
  }
  function Er(t, a) {
    var e = a.action, l = a.payload, n = t.state;
    if (a.isTransition) {
      var u = A.T, i = {};
      A.T = i;
      try {
        var s = e(n, l), d = A.S;
        d !== null && d(i, s), jr(t, a, s);
      } catch (y) {
        Oc(t, a, y);
      } finally {
        A.T = u;
      }
    } else
      try {
        u = e(n, l), jr(t, a, u);
      } catch (y) {
        Oc(t, a, y);
      }
  }
  function jr(t, a, e) {
    e !== null && typeof e == "object" && typeof e.then == "function" ? e.then(
      function(l) {
        _r(t, a, l);
      },
      function(l) {
        return Oc(t, a, l);
      }
    ) : _r(t, a, e);
  }
  function _r(t, a, e) {
    a.status = "fulfilled", a.value = e, Ar(a), t.state = e, a = t.pending, a !== null && (e = a.next, e === a ? t.pending = null : (e = e.next, a.next = e, Er(t, e)));
  }
  function Oc(t, a, e) {
    var l = t.pending;
    if (t.pending = null, l !== null) {
      l = l.next;
      do
        a.status = "rejected", a.reason = e, Ar(a), a = a.next;
      while (a !== l);
    }
    t.action = null;
  }
  function Ar(t) {
    t = t.listeners;
    for (var a = 0; a < t.length; a++) (0, t[a])();
  }
  function Nr(t, a) {
    return a;
  }
  function zr(t, a) {
    if (gt) {
      var e = Nt.formState;
      if (e !== null) {
        t: {
          var l = ft;
          if (gt) {
            if (Ut) {
              a: {
                for (var n = Ut, u = Ya; n.nodeType !== 8; ) {
                  if (!u) {
                    n = null;
                    break a;
                  }
                  if (n = Ha(
                    n.nextSibling
                  ), n === null) {
                    n = null;
                    break a;
                  }
                }
                u = n.data, n = u === "F!" || u === "F" ? n : null;
              }
              if (n) {
                Ut = Ha(
                  n.nextSibling
                ), l = n.data === "F!";
                break t;
              }
            }
            ke(l);
          }
          l = !1;
        }
        l && (a = e[0]);
      }
    }
    return e = ia(), e.memoizedState = e.baseState = a, l = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Nr,
      lastRenderedState: a
    }, e.queue = l, e = Kr.bind(
      null,
      ft,
      l
    ), l.dispatch = e, l = zc(!1), u = qc.bind(
      null,
      ft,
      !1,
      l.queue
    ), l = ia(), n = {
      state: a,
      dispatch: null,
      action: t,
      pending: null
    }, l.queue = n, e = jv.bind(
      null,
      ft,
      n,
      u,
      e
    ), n.dispatch = e, l.memoizedState = t, [a, e, !1];
  }
  function Or(t) {
    var a = Gt();
    return Mr(a, Et, t);
  }
  function Mr(t, a, e) {
    if (a = Ac(
      t,
      a,
      Nr
    )[0], t = Cu(te)[0], typeof a == "object" && a !== null && typeof a.then == "function")
      try {
        var l = zn(a);
      } catch (i) {
        throw i === Tn ? Mu : i;
      }
    else l = a;
    a = Gt();
    var n = a.queue, u = n.dispatch;
    return e !== a.memoizedState && (ft.flags |= 2048, Ml(
      9,
      wu(),
      _v.bind(null, n, e),
      null
    )), [l, u, t];
  }
  function _v(t, a) {
    t.action = a;
  }
  function Dr(t) {
    var a = Gt(), e = Et;
    if (e !== null)
      return Mr(a, e, t);
    Gt(), a = a.memoizedState, e = Gt();
    var l = e.queue.dispatch;
    return e.memoizedState = t, [a, l, !1];
  }
  function Ml(t, a, e, l) {
    return t = { tag: t, create: e, deps: l, inst: a, next: null }, a = ft.updateQueue, a === null && (a = jc(), ft.updateQueue = a), e = a.lastEffect, e === null ? a.lastEffect = t.next = t : (l = e.next, e.next = t, t.next = l, a.lastEffect = t), t;
  }
  function wu() {
    return { destroy: void 0, resource: void 0 };
  }
  function Rr() {
    return Gt().memoizedState;
  }
  function Bu(t, a, e, l) {
    var n = ia();
    l = l === void 0 ? null : l, ft.flags |= t, n.memoizedState = Ml(
      1 | a,
      wu(),
      e,
      l
    );
  }
  function On(t, a, e, l) {
    var n = Gt();
    l = l === void 0 ? null : l;
    var u = n.memoizedState.inst;
    Et !== null && l !== null && bc(l, Et.memoizedState.deps) ? n.memoizedState = Ml(a, u, e, l) : (ft.flags |= t, n.memoizedState = Ml(
      1 | a,
      u,
      e,
      l
    ));
  }
  function Ur(t, a) {
    Bu(8390656, 8, t, a);
  }
  function qr(t, a) {
    On(2048, 8, t, a);
  }
  function Hr(t, a) {
    return On(4, 2, t, a);
  }
  function Cr(t, a) {
    return On(4, 4, t, a);
  }
  function wr(t, a) {
    if (typeof a == "function") {
      t = t();
      var e = a(t);
      return function() {
        typeof e == "function" ? e() : a(null);
      };
    }
    if (a != null)
      return t = t(), a.current = t, function() {
        a.current = null;
      };
  }
  function Br(t, a, e) {
    e = e != null ? e.concat([t]) : null, On(4, 4, wr.bind(null, a, t), e);
  }
  function Mc() {
  }
  function Yr(t, a) {
    var e = Gt();
    a = a === void 0 ? null : a;
    var l = e.memoizedState;
    return a !== null && bc(a, l[1]) ? l[0] : (e.memoizedState = [t, a], t);
  }
  function Gr(t, a) {
    var e = Gt();
    a = a === void 0 ? null : a;
    var l = e.memoizedState;
    if (a !== null && bc(a, l[1]))
      return l[0];
    if (l = t(), $e) {
      Da(!0);
      try {
        t();
      } finally {
        Da(!1);
      }
    }
    return e.memoizedState = [l, a], l;
  }
  function Dc(t, a, e) {
    return e === void 0 || (ge & 1073741824) !== 0 ? t.memoizedState = a : (t.memoizedState = e, t = Zo(), ft.lanes |= t, Ee |= t, e);
  }
  function Lr(t, a, e, l) {
    return da(e, a) ? e : Nl.current !== null ? (t = Dc(t, e, l), da(t, a) || (Zt = !0), t) : (ge & 42) === 0 ? (Zt = !0, t.memoizedState = e) : (t = Zo(), ft.lanes |= t, Ee |= t, a);
  }
  function Xr(t, a, e, l, n) {
    var u = C.p;
    C.p = u !== 0 && 8 > u ? u : 8;
    var i = A.T, s = {};
    A.T = s, qc(t, !1, a, e);
    try {
      var d = n(), y = A.S;
      if (y !== null && y(s, d), d !== null && typeof d == "object" && typeof d.then == "function") {
        var N = Sv(
          d,
          l
        );
        Mn(
          t,
          a,
          N,
          pa(t)
        );
      } else
        Mn(
          t,
          a,
          l,
          pa(t)
        );
    } catch (O) {
      Mn(
        t,
        a,
        { then: function() {
        }, status: "rejected", reason: O },
        pa()
      );
    } finally {
      C.p = u, A.T = i;
    }
  }
  function Av() {
  }
  function Rc(t, a, e, l) {
    if (t.tag !== 5) throw Error(r(476));
    var n = Qr(t).queue;
    Xr(
      t,
      n,
      a,
      P,
      e === null ? Av : function() {
        return Zr(t), e(l);
      }
    );
  }
  function Qr(t) {
    var a = t.memoizedState;
    if (a !== null) return a;
    a = {
      memoizedState: P,
      baseState: P,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: te,
        lastRenderedState: P
      },
      next: null
    };
    var e = {};
    return a.next = {
      memoizedState: e,
      baseState: e,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: te,
        lastRenderedState: e
      },
      next: null
    }, t.memoizedState = a, t = t.alternate, t !== null && (t.memoizedState = a), a;
  }
  function Zr(t) {
    var a = Qr(t).next.queue;
    Mn(t, a, {}, pa());
  }
  function Uc() {
    return It(Jn);
  }
  function kr() {
    return Gt().memoizedState;
  }
  function Vr() {
    return Gt().memoizedState;
  }
  function Nv(t) {
    for (var a = t.return; a !== null; ) {
      switch (a.tag) {
        case 24:
        case 3:
          var e = pa();
          t = ve(e);
          var l = me(a, t, e);
          l !== null && (ya(l, a, e), jn(l, a, e)), a = { cache: fc() }, t.payload = a;
          return;
      }
      a = a.return;
    }
  }
  function zv(t, a, e) {
    var l = pa();
    e = {
      lane: l,
      revertLane: 0,
      action: e,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Yu(t) ? Jr(a, e) : (e = Ii(t, a, e, l), e !== null && (ya(e, t, l), $r(e, a, l)));
  }
  function Kr(t, a, e) {
    var l = pa();
    Mn(t, a, e, l);
  }
  function Mn(t, a, e, l) {
    var n = {
      lane: l,
      revertLane: 0,
      action: e,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Yu(t)) Jr(a, n);
    else {
      var u = t.alternate;
      if (t.lanes === 0 && (u === null || u.lanes === 0) && (u = a.lastRenderedReducer, u !== null))
        try {
          var i = a.lastRenderedState, s = u(i, e);
          if (n.hasEagerState = !0, n.eagerState = s, da(s, i))
            return Tu(t, a, n, 0), Nt === null && Su(), !1;
        } catch {
        } finally {
        }
      if (e = Ii(t, a, n, l), e !== null)
        return ya(e, t, l), $r(e, a, l), !0;
    }
    return !1;
  }
  function qc(t, a, e, l) {
    if (l = {
      lane: 2,
      revertLane: ds(),
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Yu(t)) {
      if (a) throw Error(r(479));
    } else
      a = Ii(
        t,
        e,
        l,
        2
      ), a !== null && ya(a, t, 2);
  }
  function Yu(t) {
    var a = t.alternate;
    return t === ft || a !== null && a === ft;
  }
  function Jr(t, a) {
    zl = Uu = !0;
    var e = t.pending;
    e === null ? a.next = a : (a.next = e.next, e.next = a), t.pending = a;
  }
  function $r(t, a, e) {
    if ((e & 4194048) !== 0) {
      var l = a.lanes;
      l &= t.pendingLanes, e |= l, a.lanes = e, ct(t, e);
    }
  }
  var Gu = {
    readContext: It,
    use: Hu,
    useCallback: wt,
    useContext: wt,
    useEffect: wt,
    useImperativeHandle: wt,
    useLayoutEffect: wt,
    useInsertionEffect: wt,
    useMemo: wt,
    useReducer: wt,
    useRef: wt,
    useState: wt,
    useDebugValue: wt,
    useDeferredValue: wt,
    useTransition: wt,
    useSyncExternalStore: wt,
    useId: wt,
    useHostTransitionStatus: wt,
    useFormState: wt,
    useActionState: wt,
    useOptimistic: wt,
    useMemoCache: wt,
    useCacheRefresh: wt
  }, Wr = {
    readContext: It,
    use: Hu,
    useCallback: function(t, a) {
      return ia().memoizedState = [
        t,
        a === void 0 ? null : a
      ], t;
    },
    useContext: It,
    useEffect: Ur,
    useImperativeHandle: function(t, a, e) {
      e = e != null ? e.concat([t]) : null, Bu(
        4194308,
        4,
        wr.bind(null, a, t),
        e
      );
    },
    useLayoutEffect: function(t, a) {
      return Bu(4194308, 4, t, a);
    },
    useInsertionEffect: function(t, a) {
      Bu(4, 2, t, a);
    },
    useMemo: function(t, a) {
      var e = ia();
      a = a === void 0 ? null : a;
      var l = t();
      if ($e) {
        Da(!0);
        try {
          t();
        } finally {
          Da(!1);
        }
      }
      return e.memoizedState = [l, a], l;
    },
    useReducer: function(t, a, e) {
      var l = ia();
      if (e !== void 0) {
        var n = e(a);
        if ($e) {
          Da(!0);
          try {
            e(a);
          } finally {
            Da(!1);
          }
        }
      } else n = a;
      return l.memoizedState = l.baseState = n, t = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: t,
        lastRenderedState: n
      }, l.queue = t, t = t.dispatch = zv.bind(
        null,
        ft,
        t
      ), [l.memoizedState, t];
    },
    useRef: function(t) {
      var a = ia();
      return t = { current: t }, a.memoizedState = t;
    },
    useState: function(t) {
      t = zc(t);
      var a = t.queue, e = Kr.bind(null, ft, a);
      return a.dispatch = e, [t.memoizedState, e];
    },
    useDebugValue: Mc,
    useDeferredValue: function(t, a) {
      var e = ia();
      return Dc(e, t, a);
    },
    useTransition: function() {
      var t = zc(!1);
      return t = Xr.bind(
        null,
        ft,
        t.queue,
        !0,
        !1
      ), ia().memoizedState = t, [!1, t];
    },
    useSyncExternalStore: function(t, a, e) {
      var l = ft, n = ia();
      if (gt) {
        if (e === void 0)
          throw Error(r(407));
        e = e();
      } else {
        if (e = a(), Nt === null)
          throw Error(r(349));
        (vt & 124) !== 0 || pr(l, a, e);
      }
      n.memoizedState = e;
      var u = { value: e, getSnapshot: a };
      return n.queue = u, Ur(br.bind(null, l, u, t), [
        t
      ]), l.flags |= 2048, Ml(
        9,
        wu(),
        yr.bind(
          null,
          l,
          u,
          e,
          a
        ),
        null
      ), e;
    },
    useId: function() {
      var t = ia(), a = Nt.identifierPrefix;
      if (gt) {
        var e = Fa, l = Wa;
        e = (l & ~(1 << 32 - Ft(l) - 1)).toString(32) + e, a = "«" + a + "R" + e, e = qu++, 0 < e && (a += "H" + e.toString(32)), a += "»";
      } else
        e = Tv++, a = "«" + a + "r" + e.toString(32) + "»";
      return t.memoizedState = a;
    },
    useHostTransitionStatus: Uc,
    useFormState: zr,
    useActionState: zr,
    useOptimistic: function(t) {
      var a = ia();
      a.memoizedState = a.baseState = t;
      var e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return a.queue = e, a = qc.bind(
        null,
        ft,
        !0,
        e
      ), e.dispatch = a, [t, a];
    },
    useMemoCache: _c,
    useCacheRefresh: function() {
      return ia().memoizedState = Nv.bind(
        null,
        ft
      );
    }
  }, Fr = {
    readContext: It,
    use: Hu,
    useCallback: Yr,
    useContext: It,
    useEffect: qr,
    useImperativeHandle: Br,
    useInsertionEffect: Hr,
    useLayoutEffect: Cr,
    useMemo: Gr,
    useReducer: Cu,
    useRef: Rr,
    useState: function() {
      return Cu(te);
    },
    useDebugValue: Mc,
    useDeferredValue: function(t, a) {
      var e = Gt();
      return Lr(
        e,
        Et.memoizedState,
        t,
        a
      );
    },
    useTransition: function() {
      var t = Cu(te)[0], a = Gt().memoizedState;
      return [
        typeof t == "boolean" ? t : zn(t),
        a
      ];
    },
    useSyncExternalStore: gr,
    useId: kr,
    useHostTransitionStatus: Uc,
    useFormState: Or,
    useActionState: Or,
    useOptimistic: function(t, a) {
      var e = Gt();
      return Tr(e, Et, t, a);
    },
    useMemoCache: _c,
    useCacheRefresh: Vr
  }, Ov = {
    readContext: It,
    use: Hu,
    useCallback: Yr,
    useContext: It,
    useEffect: qr,
    useImperativeHandle: Br,
    useInsertionEffect: Hr,
    useLayoutEffect: Cr,
    useMemo: Gr,
    useReducer: Nc,
    useRef: Rr,
    useState: function() {
      return Nc(te);
    },
    useDebugValue: Mc,
    useDeferredValue: function(t, a) {
      var e = Gt();
      return Et === null ? Dc(e, t, a) : Lr(
        e,
        Et.memoizedState,
        t,
        a
      );
    },
    useTransition: function() {
      var t = Nc(te)[0], a = Gt().memoizedState;
      return [
        typeof t == "boolean" ? t : zn(t),
        a
      ];
    },
    useSyncExternalStore: gr,
    useId: kr,
    useHostTransitionStatus: Uc,
    useFormState: Dr,
    useActionState: Dr,
    useOptimistic: function(t, a) {
      var e = Gt();
      return Et !== null ? Tr(e, Et, t, a) : (e.baseState = t, [t, e.queue.dispatch]);
    },
    useMemoCache: _c,
    useCacheRefresh: Vr
  }, Dl = null, Dn = 0;
  function Lu(t) {
    var a = Dn;
    return Dn += 1, Dl === null && (Dl = []), sr(Dl, t, a);
  }
  function Rn(t, a) {
    a = a.props.ref, t.ref = a !== void 0 ? a : null;
  }
  function Xu(t, a) {
    throw a.$$typeof === B ? Error(r(525)) : (t = Object.prototype.toString.call(a), Error(
      r(
        31,
        t === "[object Object]" ? "object with keys {" + Object.keys(a).join(", ") + "}" : t
      )
    ));
  }
  function Pr(t) {
    var a = t._init;
    return a(t._payload);
  }
  function Ir(t) {
    function a(g, v) {
      if (t) {
        var p = g.deletions;
        p === null ? (g.deletions = [v], g.flags |= 16) : p.push(v);
      }
    }
    function e(g, v) {
      if (!t) return null;
      for (; v !== null; )
        a(g, v), v = v.sibling;
      return null;
    }
    function l(g) {
      for (var v = /* @__PURE__ */ new Map(); g !== null; )
        g.key !== null ? v.set(g.key, g) : v.set(g.index, g), g = g.sibling;
      return v;
    }
    function n(g, v) {
      return g = $a(g, v), g.index = 0, g.sibling = null, g;
    }
    function u(g, v, p) {
      return g.index = p, t ? (p = g.alternate, p !== null ? (p = p.index, p < v ? (g.flags |= 67108866, v) : p) : (g.flags |= 67108866, v)) : (g.flags |= 1048576, v);
    }
    function i(g) {
      return t && g.alternate === null && (g.flags |= 67108866), g;
    }
    function s(g, v, p, z) {
      return v === null || v.tag !== 6 ? (v = ac(p, g.mode, z), v.return = g, v) : (v = n(v, p), v.return = g, v);
    }
    function d(g, v, p, z) {
      var Q = p.type;
      return Q === V ? N(
        g,
        v,
        p.props.children,
        z,
        p.key
      ) : v !== null && (v.elementType === Q || typeof Q == "object" && Q !== null && Q.$$typeof === W && Pr(Q) === v.type) ? (v = n(v, p.props), Rn(v, p), v.return = g, v) : (v = ju(
        p.type,
        p.key,
        p.props,
        null,
        g.mode,
        z
      ), Rn(v, p), v.return = g, v);
    }
    function y(g, v, p, z) {
      return v === null || v.tag !== 4 || v.stateNode.containerInfo !== p.containerInfo || v.stateNode.implementation !== p.implementation ? (v = ec(p, g.mode, z), v.return = g, v) : (v = n(v, p.children || []), v.return = g, v);
    }
    function N(g, v, p, z, Q) {
      return v === null || v.tag !== 7 ? (v = Le(
        p,
        g.mode,
        z,
        Q
      ), v.return = g, v) : (v = n(v, p), v.return = g, v);
    }
    function O(g, v, p) {
      if (typeof v == "string" && v !== "" || typeof v == "number" || typeof v == "bigint")
        return v = ac(
          "" + v,
          g.mode,
          p
        ), v.return = g, v;
      if (typeof v == "object" && v !== null) {
        switch (v.$$typeof) {
          case U:
            return p = ju(
              v.type,
              v.key,
              v.props,
              null,
              g.mode,
              p
            ), Rn(p, v), p.return = g, p;
          case Y:
            return v = ec(
              v,
              g.mode,
              p
            ), v.return = g, v;
          case W:
            var z = v._init;
            return v = z(v._payload), O(g, v, p);
        }
        if (Ct(v) || Tt(v))
          return v = Le(
            v,
            g.mode,
            p,
            null
          ), v.return = g, v;
        if (typeof v.then == "function")
          return O(g, Lu(v), p);
        if (v.$$typeof === G)
          return O(
            g,
            zu(g, v),
            p
          );
        Xu(g, v);
      }
      return null;
    }
    function b(g, v, p, z) {
      var Q = v !== null ? v.key : null;
      if (typeof p == "string" && p !== "" || typeof p == "number" || typeof p == "bigint")
        return Q !== null ? null : s(g, v, "" + p, z);
      if (typeof p == "object" && p !== null) {
        switch (p.$$typeof) {
          case U:
            return p.key === Q ? d(g, v, p, z) : null;
          case Y:
            return p.key === Q ? y(g, v, p, z) : null;
          case W:
            return Q = p._init, p = Q(p._payload), b(g, v, p, z);
        }
        if (Ct(p) || Tt(p))
          return Q !== null ? null : N(g, v, p, z, null);
        if (typeof p.then == "function")
          return b(
            g,
            v,
            Lu(p),
            z
          );
        if (p.$$typeof === G)
          return b(
            g,
            v,
            zu(g, p),
            z
          );
        Xu(g, p);
      }
      return null;
    }
    function x(g, v, p, z, Q) {
      if (typeof z == "string" && z !== "" || typeof z == "number" || typeof z == "bigint")
        return g = g.get(p) || null, s(v, g, "" + z, Q);
      if (typeof z == "object" && z !== null) {
        switch (z.$$typeof) {
          case U:
            return g = g.get(
              z.key === null ? p : z.key
            ) || null, d(v, g, z, Q);
          case Y:
            return g = g.get(
              z.key === null ? p : z.key
            ) || null, y(v, g, z, Q);
          case W:
            var rt = z._init;
            return z = rt(z._payload), x(
              g,
              v,
              p,
              z,
              Q
            );
        }
        if (Ct(z) || Tt(z))
          return g = g.get(p) || null, N(v, g, z, Q, null);
        if (typeof z.then == "function")
          return x(
            g,
            v,
            p,
            Lu(z),
            Q
          );
        if (z.$$typeof === G)
          return x(
            g,
            v,
            p,
            zu(v, z),
            Q
          );
        Xu(v, z);
      }
      return null;
    }
    function nt(g, v, p, z) {
      for (var Q = null, rt = null, $ = v, tt = v = 0, Vt = null; $ !== null && tt < p.length; tt++) {
        $.index > tt ? (Vt = $, $ = null) : Vt = $.sibling;
        var mt = b(
          g,
          $,
          p[tt],
          z
        );
        if (mt === null) {
          $ === null && ($ = Vt);
          break;
        }
        t && $ && mt.alternate === null && a(g, $), v = u(mt, v, tt), rt === null ? Q = mt : rt.sibling = mt, rt = mt, $ = Vt;
      }
      if (tt === p.length)
        return e(g, $), gt && Qe(g, tt), Q;
      if ($ === null) {
        for (; tt < p.length; tt++)
          $ = O(g, p[tt], z), $ !== null && (v = u(
            $,
            v,
            tt
          ), rt === null ? Q = $ : rt.sibling = $, rt = $);
        return gt && Qe(g, tt), Q;
      }
      for ($ = l($); tt < p.length; tt++)
        Vt = x(
          $,
          g,
          tt,
          p[tt],
          z
        ), Vt !== null && (t && Vt.alternate !== null && $.delete(
          Vt.key === null ? tt : Vt.key
        ), v = u(
          Vt,
          v,
          tt
        ), rt === null ? Q = Vt : rt.sibling = Vt, rt = Vt);
      return t && $.forEach(function(Re) {
        return a(g, Re);
      }), gt && Qe(g, tt), Q;
    }
    function I(g, v, p, z) {
      if (p == null) throw Error(r(151));
      for (var Q = null, rt = null, $ = v, tt = v = 0, Vt = null, mt = p.next(); $ !== null && !mt.done; tt++, mt = p.next()) {
        $.index > tt ? (Vt = $, $ = null) : Vt = $.sibling;
        var Re = b(g, $, mt.value, z);
        if (Re === null) {
          $ === null && ($ = Vt);
          break;
        }
        t && $ && Re.alternate === null && a(g, $), v = u(Re, v, tt), rt === null ? Q = Re : rt.sibling = Re, rt = Re, $ = Vt;
      }
      if (mt.done)
        return e(g, $), gt && Qe(g, tt), Q;
      if ($ === null) {
        for (; !mt.done; tt++, mt = p.next())
          mt = O(g, mt.value, z), mt !== null && (v = u(mt, v, tt), rt === null ? Q = mt : rt.sibling = mt, rt = mt);
        return gt && Qe(g, tt), Q;
      }
      for ($ = l($); !mt.done; tt++, mt = p.next())
        mt = x($, g, tt, mt.value, z), mt !== null && (t && mt.alternate !== null && $.delete(mt.key === null ? tt : mt.key), v = u(mt, v, tt), rt === null ? Q = mt : rt.sibling = mt, rt = mt);
      return t && $.forEach(function(Mm) {
        return a(g, Mm);
      }), gt && Qe(g, tt), Q;
    }
    function _t(g, v, p, z) {
      if (typeof p == "object" && p !== null && p.type === V && p.key === null && (p = p.props.children), typeof p == "object" && p !== null) {
        switch (p.$$typeof) {
          case U:
            t: {
              for (var Q = p.key; v !== null; ) {
                if (v.key === Q) {
                  if (Q = p.type, Q === V) {
                    if (v.tag === 7) {
                      e(
                        g,
                        v.sibling
                      ), z = n(
                        v,
                        p.props.children
                      ), z.return = g, g = z;
                      break t;
                    }
                  } else if (v.elementType === Q || typeof Q == "object" && Q !== null && Q.$$typeof === W && Pr(Q) === v.type) {
                    e(
                      g,
                      v.sibling
                    ), z = n(v, p.props), Rn(z, p), z.return = g, g = z;
                    break t;
                  }
                  e(g, v);
                  break;
                } else a(g, v);
                v = v.sibling;
              }
              p.type === V ? (z = Le(
                p.props.children,
                g.mode,
                z,
                p.key
              ), z.return = g, g = z) : (z = ju(
                p.type,
                p.key,
                p.props,
                null,
                g.mode,
                z
              ), Rn(z, p), z.return = g, g = z);
            }
            return i(g);
          case Y:
            t: {
              for (Q = p.key; v !== null; ) {
                if (v.key === Q)
                  if (v.tag === 4 && v.stateNode.containerInfo === p.containerInfo && v.stateNode.implementation === p.implementation) {
                    e(
                      g,
                      v.sibling
                    ), z = n(v, p.children || []), z.return = g, g = z;
                    break t;
                  } else {
                    e(g, v);
                    break;
                  }
                else a(g, v);
                v = v.sibling;
              }
              z = ec(p, g.mode, z), z.return = g, g = z;
            }
            return i(g);
          case W:
            return Q = p._init, p = Q(p._payload), _t(
              g,
              v,
              p,
              z
            );
        }
        if (Ct(p))
          return nt(
            g,
            v,
            p,
            z
          );
        if (Tt(p)) {
          if (Q = Tt(p), typeof Q != "function") throw Error(r(150));
          return p = Q.call(p), I(
            g,
            v,
            p,
            z
          );
        }
        if (typeof p.then == "function")
          return _t(
            g,
            v,
            Lu(p),
            z
          );
        if (p.$$typeof === G)
          return _t(
            g,
            v,
            zu(g, p),
            z
          );
        Xu(g, p);
      }
      return typeof p == "string" && p !== "" || typeof p == "number" || typeof p == "bigint" ? (p = "" + p, v !== null && v.tag === 6 ? (e(g, v.sibling), z = n(v, p), z.return = g, g = z) : (e(g, v), z = ac(p, g.mode, z), z.return = g, g = z), i(g)) : e(g, v);
    }
    return function(g, v, p, z) {
      try {
        Dn = 0;
        var Q = _t(
          g,
          v,
          p,
          z
        );
        return Dl = null, Q;
      } catch ($) {
        if ($ === Tn || $ === Mu) throw $;
        var rt = ha(29, $, null, g.mode);
        return rt.lanes = z, rt.return = g, rt;
      } finally {
      }
    };
  }
  var Rl = Ir(!0), to = Ir(!1), Na = M(null), Ga = null;
  function pe(t) {
    var a = t.alternate;
    w(Xt, Xt.current & 1), w(Na, t), Ga === null && (a === null || Nl.current !== null || a.memoizedState !== null) && (Ga = t);
  }
  function ao(t) {
    if (t.tag === 22) {
      if (w(Xt, Xt.current), w(Na, t), Ga === null) {
        var a = t.alternate;
        a !== null && a.memoizedState !== null && (Ga = t);
      }
    } else ye();
  }
  function ye() {
    w(Xt, Xt.current), w(Na, Na.current);
  }
  function ae(t) {
    L(Na), Ga === t && (Ga = null), L(Xt);
  }
  var Xt = M(0);
  function Qu(t) {
    for (var a = t; a !== null; ) {
      if (a.tag === 13) {
        var e = a.memoizedState;
        if (e !== null && (e = e.dehydrated, e === null || e.data === "$?" || js(e)))
          return a;
      } else if (a.tag === 19 && a.memoizedProps.revealOrder !== void 0) {
        if ((a.flags & 128) !== 0) return a;
      } else if (a.child !== null) {
        a.child.return = a, a = a.child;
        continue;
      }
      if (a === t) break;
      for (; a.sibling === null; ) {
        if (a.return === null || a.return === t) return null;
        a = a.return;
      }
      a.sibling.return = a.return, a = a.sibling;
    }
    return null;
  }
  function Hc(t, a, e, l) {
    a = t.memoizedState, e = e(l, a), e = e == null ? a : D({}, a, e), t.memoizedState = e, t.lanes === 0 && (t.updateQueue.baseState = e);
  }
  var Cc = {
    enqueueSetState: function(t, a, e) {
      t = t._reactInternals;
      var l = pa(), n = ve(l);
      n.payload = a, e != null && (n.callback = e), a = me(t, n, l), a !== null && (ya(a, t, l), jn(a, t, l));
    },
    enqueueReplaceState: function(t, a, e) {
      t = t._reactInternals;
      var l = pa(), n = ve(l);
      n.tag = 1, n.payload = a, e != null && (n.callback = e), a = me(t, n, l), a !== null && (ya(a, t, l), jn(a, t, l));
    },
    enqueueForceUpdate: function(t, a) {
      t = t._reactInternals;
      var e = pa(), l = ve(e);
      l.tag = 2, a != null && (l.callback = a), a = me(t, l, e), a !== null && (ya(a, t, e), jn(a, t, e));
    }
  };
  function eo(t, a, e, l, n, u, i) {
    return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(l, u, i) : a.prototype && a.prototype.isPureReactComponent ? !vn(e, l) || !vn(n, u) : !0;
  }
  function lo(t, a, e, l) {
    t = a.state, typeof a.componentWillReceiveProps == "function" && a.componentWillReceiveProps(e, l), typeof a.UNSAFE_componentWillReceiveProps == "function" && a.UNSAFE_componentWillReceiveProps(e, l), a.state !== t && Cc.enqueueReplaceState(a, a.state, null);
  }
  function We(t, a) {
    var e = a;
    if ("ref" in a) {
      e = {};
      for (var l in a)
        l !== "ref" && (e[l] = a[l]);
    }
    if (t = t.defaultProps) {
      e === a && (e = D({}, e));
      for (var n in t)
        e[n] === void 0 && (e[n] = t[n]);
    }
    return e;
  }
  var Zu = typeof reportError == "function" ? reportError : function(t) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var a = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof t == "object" && t !== null && typeof t.message == "string" ? String(t.message) : String(t),
        error: t
      });
      if (!window.dispatchEvent(a)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", t);
      return;
    }
    console.error(t);
  };
  function no(t) {
    Zu(t);
  }
  function uo(t) {
    console.error(t);
  }
  function io(t) {
    Zu(t);
  }
  function ku(t, a) {
    try {
      var e = t.onUncaughtError;
      e(a.value, { componentStack: a.stack });
    } catch (l) {
      setTimeout(function() {
        throw l;
      });
    }
  }
  function co(t, a, e) {
    try {
      var l = t.onCaughtError;
      l(e.value, {
        componentStack: e.stack,
        errorBoundary: a.tag === 1 ? a.stateNode : null
      });
    } catch (n) {
      setTimeout(function() {
        throw n;
      });
    }
  }
  function wc(t, a, e) {
    return e = ve(e), e.tag = 3, e.payload = { element: null }, e.callback = function() {
      ku(t, a);
    }, e;
  }
  function so(t) {
    return t = ve(t), t.tag = 3, t;
  }
  function fo(t, a, e, l) {
    var n = e.type.getDerivedStateFromError;
    if (typeof n == "function") {
      var u = l.value;
      t.payload = function() {
        return n(u);
      }, t.callback = function() {
        co(a, e, l);
      };
    }
    var i = e.stateNode;
    i !== null && typeof i.componentDidCatch == "function" && (t.callback = function() {
      co(a, e, l), typeof n != "function" && (je === null ? je = /* @__PURE__ */ new Set([this]) : je.add(this));
      var s = l.stack;
      this.componentDidCatch(l.value, {
        componentStack: s !== null ? s : ""
      });
    });
  }
  function Mv(t, a, e, l, n) {
    if (e.flags |= 32768, l !== null && typeof l == "object" && typeof l.then == "function") {
      if (a = e.alternate, a !== null && bn(
        a,
        e,
        n,
        !0
      ), e = Na.current, e !== null) {
        switch (e.tag) {
          case 13:
            return Ga === null ? cs() : e.alternate === null && qt === 0 && (qt = 3), e.flags &= -257, e.flags |= 65536, e.lanes = n, l === dc ? e.flags |= 16384 : (a = e.updateQueue, a === null ? e.updateQueue = /* @__PURE__ */ new Set([l]) : a.add(l), fs(t, l, n)), !1;
          case 22:
            return e.flags |= 65536, l === dc ? e.flags |= 16384 : (a = e.updateQueue, a === null ? (a = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([l])
            }, e.updateQueue = a) : (e = a.retryQueue, e === null ? a.retryQueue = /* @__PURE__ */ new Set([l]) : e.add(l)), fs(t, l, n)), !1;
        }
        throw Error(r(435, e.tag));
      }
      return fs(t, l, n), cs(), !1;
    }
    if (gt)
      return a = Na.current, a !== null ? ((a.flags & 65536) === 0 && (a.flags |= 256), a.flags |= 65536, a.lanes = n, l !== uc && (t = Error(r(422), { cause: l }), yn(Ea(t, e)))) : (l !== uc && (a = Error(r(423), {
        cause: l
      }), yn(
        Ea(a, e)
      )), t = t.current.alternate, t.flags |= 65536, n &= -n, t.lanes |= n, l = Ea(l, e), n = wc(
        t.stateNode,
        l,
        n
      ), mc(t, n), qt !== 4 && (qt = 2)), !1;
    var u = Error(r(520), { cause: l });
    if (u = Ea(u, e), Yn === null ? Yn = [u] : Yn.push(u), qt !== 4 && (qt = 2), a === null) return !0;
    l = Ea(l, e), e = a;
    do {
      switch (e.tag) {
        case 3:
          return e.flags |= 65536, t = n & -n, e.lanes |= t, t = wc(e.stateNode, l, t), mc(e, t), !1;
        case 1:
          if (a = e.type, u = e.stateNode, (e.flags & 128) === 0 && (typeof a.getDerivedStateFromError == "function" || u !== null && typeof u.componentDidCatch == "function" && (je === null || !je.has(u))))
            return e.flags |= 65536, n &= -n, e.lanes |= n, n = so(n), fo(
              n,
              t,
              e,
              l
            ), mc(e, n), !1;
      }
      e = e.return;
    } while (e !== null);
    return !1;
  }
  var ro = Error(r(461)), Zt = !1;
  function Jt(t, a, e, l) {
    a.child = t === null ? to(a, null, e, l) : Rl(
      a,
      t.child,
      e,
      l
    );
  }
  function oo(t, a, e, l, n) {
    e = e.render;
    var u = a.ref;
    if ("ref" in l) {
      var i = {};
      for (var s in l)
        s !== "ref" && (i[s] = l[s]);
    } else i = l;
    return Ke(a), l = xc(
      t,
      a,
      e,
      i,
      u,
      n
    ), s = Sc(), t !== null && !Zt ? (Tc(t, a, n), ee(t, a, n)) : (gt && s && lc(a), a.flags |= 1, Jt(t, a, l, n), a.child);
  }
  function ho(t, a, e, l, n) {
    if (t === null) {
      var u = e.type;
      return typeof u == "function" && !tc(u) && u.defaultProps === void 0 && e.compare === null ? (a.tag = 15, a.type = u, vo(
        t,
        a,
        u,
        l,
        n
      )) : (t = ju(
        e.type,
        null,
        l,
        a,
        a.mode,
        n
      ), t.ref = a.ref, t.return = a, a.child = t);
    }
    if (u = t.child, !kc(t, n)) {
      var i = u.memoizedProps;
      if (e = e.compare, e = e !== null ? e : vn, e(i, l) && t.ref === a.ref)
        return ee(t, a, n);
    }
    return a.flags |= 1, t = $a(u, l), t.ref = a.ref, t.return = a, a.child = t;
  }
  function vo(t, a, e, l, n) {
    if (t !== null) {
      var u = t.memoizedProps;
      if (vn(u, l) && t.ref === a.ref)
        if (Zt = !1, a.pendingProps = l = u, kc(t, n))
          (t.flags & 131072) !== 0 && (Zt = !0);
        else
          return a.lanes = t.lanes, ee(t, a, n);
    }
    return Bc(
      t,
      a,
      e,
      l,
      n
    );
  }
  function mo(t, a, e) {
    var l = a.pendingProps, n = l.children, u = t !== null ? t.memoizedState : null;
    if (l.mode === "hidden") {
      if ((a.flags & 128) !== 0) {
        if (l = u !== null ? u.baseLanes | e : e, t !== null) {
          for (n = a.child = t.child, u = 0; n !== null; )
            u = u | n.lanes | n.childLanes, n = n.sibling;
          a.childLanes = u & ~l;
        } else a.childLanes = 0, a.child = null;
        return go(
          t,
          a,
          l,
          e
        );
      }
      if ((e & 536870912) !== 0)
        a.memoizedState = { baseLanes: 0, cachePool: null }, t !== null && Ou(
          a,
          u !== null ? u.cachePool : null
        ), u !== null ? hr(a, u) : pc(), ao(a);
      else
        return a.lanes = a.childLanes = 536870912, go(
          t,
          a,
          u !== null ? u.baseLanes | e : e,
          e
        );
    } else
      u !== null ? (Ou(a, u.cachePool), hr(a, u), ye(), a.memoizedState = null) : (t !== null && Ou(a, null), pc(), ye());
    return Jt(t, a, n, e), a.child;
  }
  function go(t, a, e, l) {
    var n = oc();
    return n = n === null ? null : { parent: Lt._currentValue, pool: n }, a.memoizedState = {
      baseLanes: e,
      cachePool: n
    }, t !== null && Ou(a, null), pc(), ao(a), t !== null && bn(t, a, l, !0), null;
  }
  function Vu(t, a) {
    var e = a.ref;
    if (e === null)
      t !== null && t.ref !== null && (a.flags |= 4194816);
    else {
      if (typeof e != "function" && typeof e != "object")
        throw Error(r(284));
      (t === null || t.ref !== e) && (a.flags |= 4194816);
    }
  }
  function Bc(t, a, e, l, n) {
    return Ke(a), e = xc(
      t,
      a,
      e,
      l,
      void 0,
      n
    ), l = Sc(), t !== null && !Zt ? (Tc(t, a, n), ee(t, a, n)) : (gt && l && lc(a), a.flags |= 1, Jt(t, a, e, n), a.child);
  }
  function po(t, a, e, l, n, u) {
    return Ke(a), a.updateQueue = null, e = mr(
      a,
      l,
      e,
      n
    ), vr(t), l = Sc(), t !== null && !Zt ? (Tc(t, a, u), ee(t, a, u)) : (gt && l && lc(a), a.flags |= 1, Jt(t, a, e, u), a.child);
  }
  function yo(t, a, e, l, n) {
    if (Ke(a), a.stateNode === null) {
      var u = Tl, i = e.contextType;
      typeof i == "object" && i !== null && (u = It(i)), u = new e(l, u), a.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null, u.updater = Cc, a.stateNode = u, u._reactInternals = a, u = a.stateNode, u.props = l, u.state = a.memoizedState, u.refs = {}, hc(a), i = e.contextType, u.context = typeof i == "object" && i !== null ? It(i) : Tl, u.state = a.memoizedState, i = e.getDerivedStateFromProps, typeof i == "function" && (Hc(
        a,
        e,
        i,
        l
      ), u.state = a.memoizedState), typeof e.getDerivedStateFromProps == "function" || typeof u.getSnapshotBeforeUpdate == "function" || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (i = u.state, typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount(), i !== u.state && Cc.enqueueReplaceState(u, u.state, null), An(a, l, u, n), _n(), u.state = a.memoizedState), typeof u.componentDidMount == "function" && (a.flags |= 4194308), l = !0;
    } else if (t === null) {
      u = a.stateNode;
      var s = a.memoizedProps, d = We(e, s);
      u.props = d;
      var y = u.context, N = e.contextType;
      i = Tl, typeof N == "object" && N !== null && (i = It(N));
      var O = e.getDerivedStateFromProps;
      N = typeof O == "function" || typeof u.getSnapshotBeforeUpdate == "function", s = a.pendingProps !== s, N || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (s || y !== i) && lo(
        a,
        u,
        l,
        i
      ), he = !1;
      var b = a.memoizedState;
      u.state = b, An(a, l, u, n), _n(), y = a.memoizedState, s || b !== y || he ? (typeof O == "function" && (Hc(
        a,
        e,
        O,
        l
      ), y = a.memoizedState), (d = he || eo(
        a,
        e,
        d,
        l,
        b,
        y,
        i
      )) ? (N || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function" && (a.flags |= 4194308)) : (typeof u.componentDidMount == "function" && (a.flags |= 4194308), a.memoizedProps = l, a.memoizedState = y), u.props = l, u.state = y, u.context = i, l = d) : (typeof u.componentDidMount == "function" && (a.flags |= 4194308), l = !1);
    } else {
      u = a.stateNode, vc(t, a), i = a.memoizedProps, N = We(e, i), u.props = N, O = a.pendingProps, b = u.context, y = e.contextType, d = Tl, typeof y == "object" && y !== null && (d = It(y)), s = e.getDerivedStateFromProps, (y = typeof s == "function" || typeof u.getSnapshotBeforeUpdate == "function") || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (i !== O || b !== d) && lo(
        a,
        u,
        l,
        d
      ), he = !1, b = a.memoizedState, u.state = b, An(a, l, u, n), _n();
      var x = a.memoizedState;
      i !== O || b !== x || he || t !== null && t.dependencies !== null && Nu(t.dependencies) ? (typeof s == "function" && (Hc(
        a,
        e,
        s,
        l
      ), x = a.memoizedState), (N = he || eo(
        a,
        e,
        N,
        l,
        b,
        x,
        d
      ) || t !== null && t.dependencies !== null && Nu(t.dependencies)) ? (y || typeof u.UNSAFE_componentWillUpdate != "function" && typeof u.componentWillUpdate != "function" || (typeof u.componentWillUpdate == "function" && u.componentWillUpdate(l, x, d), typeof u.UNSAFE_componentWillUpdate == "function" && u.UNSAFE_componentWillUpdate(
        l,
        x,
        d
      )), typeof u.componentDidUpdate == "function" && (a.flags |= 4), typeof u.getSnapshotBeforeUpdate == "function" && (a.flags |= 1024)) : (typeof u.componentDidUpdate != "function" || i === t.memoizedProps && b === t.memoizedState || (a.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || i === t.memoizedProps && b === t.memoizedState || (a.flags |= 1024), a.memoizedProps = l, a.memoizedState = x), u.props = l, u.state = x, u.context = d, l = N) : (typeof u.componentDidUpdate != "function" || i === t.memoizedProps && b === t.memoizedState || (a.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || i === t.memoizedProps && b === t.memoizedState || (a.flags |= 1024), l = !1);
    }
    return u = l, Vu(t, a), l = (a.flags & 128) !== 0, u || l ? (u = a.stateNode, e = l && typeof e.getDerivedStateFromError != "function" ? null : u.render(), a.flags |= 1, t !== null && l ? (a.child = Rl(
      a,
      t.child,
      null,
      n
    ), a.child = Rl(
      a,
      null,
      e,
      n
    )) : Jt(t, a, e, n), a.memoizedState = u.state, t = a.child) : t = ee(
      t,
      a,
      n
    ), t;
  }
  function bo(t, a, e, l) {
    return pn(), a.flags |= 256, Jt(t, a, e, l), a.child;
  }
  var Yc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Gc(t) {
    return { baseLanes: t, cachePool: ur() };
  }
  function Lc(t, a, e) {
    return t = t !== null ? t.childLanes & ~e : 0, a && (t |= za), t;
  }
  function xo(t, a, e) {
    var l = a.pendingProps, n = !1, u = (a.flags & 128) !== 0, i;
    if ((i = u) || (i = t !== null && t.memoizedState === null ? !1 : (Xt.current & 2) !== 0), i && (n = !0, a.flags &= -129), i = (a.flags & 32) !== 0, a.flags &= -33, t === null) {
      if (gt) {
        if (n ? pe(a) : ye(), gt) {
          var s = Ut, d;
          if (d = s) {
            t: {
              for (d = s, s = Ya; d.nodeType !== 8; ) {
                if (!s) {
                  s = null;
                  break t;
                }
                if (d = Ha(
                  d.nextSibling
                ), d === null) {
                  s = null;
                  break t;
                }
              }
              s = d;
            }
            s !== null ? (a.memoizedState = {
              dehydrated: s,
              treeContext: Xe !== null ? { id: Wa, overflow: Fa } : null,
              retryLane: 536870912,
              hydrationErrors: null
            }, d = ha(
              18,
              null,
              null,
              0
            ), d.stateNode = s, d.return = a, a.child = d, ea = a, Ut = null, d = !0) : d = !1;
          }
          d || ke(a);
        }
        if (s = a.memoizedState, s !== null && (s = s.dehydrated, s !== null))
          return js(s) ? a.lanes = 32 : a.lanes = 536870912, null;
        ae(a);
      }
      return s = l.children, l = l.fallback, n ? (ye(), n = a.mode, s = Ku(
        { mode: "hidden", children: s },
        n
      ), l = Le(
        l,
        n,
        e,
        null
      ), s.return = a, l.return = a, s.sibling = l, a.child = s, n = a.child, n.memoizedState = Gc(e), n.childLanes = Lc(
        t,
        i,
        e
      ), a.memoizedState = Yc, l) : (pe(a), Xc(a, s));
    }
    if (d = t.memoizedState, d !== null && (s = d.dehydrated, s !== null)) {
      if (u)
        a.flags & 256 ? (pe(a), a.flags &= -257, a = Qc(
          t,
          a,
          e
        )) : a.memoizedState !== null ? (ye(), a.child = t.child, a.flags |= 128, a = null) : (ye(), n = l.fallback, s = a.mode, l = Ku(
          { mode: "visible", children: l.children },
          s
        ), n = Le(
          n,
          s,
          e,
          null
        ), n.flags |= 2, l.return = a, n.return = a, l.sibling = n, a.child = l, Rl(
          a,
          t.child,
          null,
          e
        ), l = a.child, l.memoizedState = Gc(e), l.childLanes = Lc(
          t,
          i,
          e
        ), a.memoizedState = Yc, a = n);
      else if (pe(a), js(s)) {
        if (i = s.nextSibling && s.nextSibling.dataset, i) var y = i.dgst;
        i = y, l = Error(r(419)), l.stack = "", l.digest = i, yn({ value: l, source: null, stack: null }), a = Qc(
          t,
          a,
          e
        );
      } else if (Zt || bn(t, a, e, !1), i = (e & t.childLanes) !== 0, Zt || i) {
        if (i = Nt, i !== null && (l = e & -e, l = (l & 42) !== 0 ? 1 : Ra(l), l = (l & (i.suspendedLanes | e)) !== 0 ? 0 : l, l !== 0 && l !== d.retryLane))
          throw d.retryLane = l, Sl(t, l), ya(i, t, l), ro;
        s.data === "$?" || cs(), a = Qc(
          t,
          a,
          e
        );
      } else
        s.data === "$?" ? (a.flags |= 192, a.child = t.child, a = null) : (t = d.treeContext, Ut = Ha(
          s.nextSibling
        ), ea = a, gt = !0, Ze = null, Ya = !1, t !== null && (_a[Aa++] = Wa, _a[Aa++] = Fa, _a[Aa++] = Xe, Wa = t.id, Fa = t.overflow, Xe = a), a = Xc(
          a,
          l.children
        ), a.flags |= 4096);
      return a;
    }
    return n ? (ye(), n = l.fallback, s = a.mode, d = t.child, y = d.sibling, l = $a(d, {
      mode: "hidden",
      children: l.children
    }), l.subtreeFlags = d.subtreeFlags & 65011712, y !== null ? n = $a(y, n) : (n = Le(
      n,
      s,
      e,
      null
    ), n.flags |= 2), n.return = a, l.return = a, l.sibling = n, a.child = l, l = n, n = a.child, s = t.child.memoizedState, s === null ? s = Gc(e) : (d = s.cachePool, d !== null ? (y = Lt._currentValue, d = d.parent !== y ? { parent: y, pool: y } : d) : d = ur(), s = {
      baseLanes: s.baseLanes | e,
      cachePool: d
    }), n.memoizedState = s, n.childLanes = Lc(
      t,
      i,
      e
    ), a.memoizedState = Yc, l) : (pe(a), e = t.child, t = e.sibling, e = $a(e, {
      mode: "visible",
      children: l.children
    }), e.return = a, e.sibling = null, t !== null && (i = a.deletions, i === null ? (a.deletions = [t], a.flags |= 16) : i.push(t)), a.child = e, a.memoizedState = null, e);
  }
  function Xc(t, a) {
    return a = Ku(
      { mode: "visible", children: a },
      t.mode
    ), a.return = t, t.child = a;
  }
  function Ku(t, a) {
    return t = ha(22, t, null, a), t.lanes = 0, t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }, t;
  }
  function Qc(t, a, e) {
    return Rl(a, t.child, null, e), t = Xc(
      a,
      a.pendingProps.children
    ), t.flags |= 2, a.memoizedState = null, t;
  }
  function So(t, a, e) {
    t.lanes |= a;
    var l = t.alternate;
    l !== null && (l.lanes |= a), cc(t.return, a, e);
  }
  function Zc(t, a, e, l, n) {
    var u = t.memoizedState;
    u === null ? t.memoizedState = {
      isBackwards: a,
      rendering: null,
      renderingStartTime: 0,
      last: l,
      tail: e,
      tailMode: n
    } : (u.isBackwards = a, u.rendering = null, u.renderingStartTime = 0, u.last = l, u.tail = e, u.tailMode = n);
  }
  function To(t, a, e) {
    var l = a.pendingProps, n = l.revealOrder, u = l.tail;
    if (Jt(t, a, l.children, e), l = Xt.current, (l & 2) !== 0)
      l = l & 1 | 2, a.flags |= 128;
    else {
      if (t !== null && (t.flags & 128) !== 0)
        t: for (t = a.child; t !== null; ) {
          if (t.tag === 13)
            t.memoizedState !== null && So(t, e, a);
          else if (t.tag === 19)
            So(t, e, a);
          else if (t.child !== null) {
            t.child.return = t, t = t.child;
            continue;
          }
          if (t === a) break t;
          for (; t.sibling === null; ) {
            if (t.return === null || t.return === a)
              break t;
            t = t.return;
          }
          t.sibling.return = t.return, t = t.sibling;
        }
      l &= 1;
    }
    switch (w(Xt, l), n) {
      case "forwards":
        for (e = a.child, n = null; e !== null; )
          t = e.alternate, t !== null && Qu(t) === null && (n = e), e = e.sibling;
        e = n, e === null ? (n = a.child, a.child = null) : (n = e.sibling, e.sibling = null), Zc(
          a,
          !1,
          n,
          e,
          u
        );
        break;
      case "backwards":
        for (e = null, n = a.child, a.child = null; n !== null; ) {
          if (t = n.alternate, t !== null && Qu(t) === null) {
            a.child = n;
            break;
          }
          t = n.sibling, n.sibling = e, e = n, n = t;
        }
        Zc(
          a,
          !0,
          e,
          null,
          u
        );
        break;
      case "together":
        Zc(a, !1, null, null, void 0);
        break;
      default:
        a.memoizedState = null;
    }
    return a.child;
  }
  function ee(t, a, e) {
    if (t !== null && (a.dependencies = t.dependencies), Ee |= a.lanes, (e & a.childLanes) === 0)
      if (t !== null) {
        if (bn(
          t,
          a,
          e,
          !1
        ), (e & a.childLanes) === 0)
          return null;
      } else return null;
    if (t !== null && a.child !== t.child)
      throw Error(r(153));
    if (a.child !== null) {
      for (t = a.child, e = $a(t, t.pendingProps), a.child = e, e.return = a; t.sibling !== null; )
        t = t.sibling, e = e.sibling = $a(t, t.pendingProps), e.return = a;
      e.sibling = null;
    }
    return a.child;
  }
  function kc(t, a) {
    return (t.lanes & a) !== 0 ? !0 : (t = t.dependencies, !!(t !== null && Nu(t)));
  }
  function Dv(t, a, e) {
    switch (a.tag) {
      case 3:
        yt(a, a.stateNode.containerInfo), de(a, Lt, t.memoizedState.cache), pn();
        break;
      case 27:
      case 5:
        tl(a);
        break;
      case 4:
        yt(a, a.stateNode.containerInfo);
        break;
      case 10:
        de(
          a,
          a.type,
          a.memoizedProps.value
        );
        break;
      case 13:
        var l = a.memoizedState;
        if (l !== null)
          return l.dehydrated !== null ? (pe(a), a.flags |= 128, null) : (e & a.child.childLanes) !== 0 ? xo(t, a, e) : (pe(a), t = ee(
            t,
            a,
            e
          ), t !== null ? t.sibling : null);
        pe(a);
        break;
      case 19:
        var n = (t.flags & 128) !== 0;
        if (l = (e & a.childLanes) !== 0, l || (bn(
          t,
          a,
          e,
          !1
        ), l = (e & a.childLanes) !== 0), n) {
          if (l)
            return To(
              t,
              a,
              e
            );
          a.flags |= 128;
        }
        if (n = a.memoizedState, n !== null && (n.rendering = null, n.tail = null, n.lastEffect = null), w(Xt, Xt.current), l) break;
        return null;
      case 22:
      case 23:
        return a.lanes = 0, mo(t, a, e);
      case 24:
        de(a, Lt, t.memoizedState.cache);
    }
    return ee(t, a, e);
  }
  function Eo(t, a, e) {
    if (t !== null)
      if (t.memoizedProps !== a.pendingProps)
        Zt = !0;
      else {
        if (!kc(t, e) && (a.flags & 128) === 0)
          return Zt = !1, Dv(
            t,
            a,
            e
          );
        Zt = (t.flags & 131072) !== 0;
      }
    else
      Zt = !1, gt && (a.flags & 1048576) !== 0 && Pf(a, Au, a.index);
    switch (a.lanes = 0, a.tag) {
      case 16:
        t: {
          t = a.pendingProps;
          var l = a.elementType, n = l._init;
          if (l = n(l._payload), a.type = l, typeof l == "function")
            tc(l) ? (t = We(l, t), a.tag = 1, a = yo(
              null,
              a,
              l,
              t,
              e
            )) : (a.tag = 0, a = Bc(
              null,
              a,
              l,
              t,
              e
            ));
          else {
            if (l != null) {
              if (n = l.$$typeof, n === F) {
                a.tag = 11, a = oo(
                  null,
                  a,
                  l,
                  t,
                  e
                );
                break t;
              } else if (n === q) {
                a.tag = 14, a = ho(
                  null,
                  a,
                  l,
                  t,
                  e
                );
                break t;
              }
            }
            throw a = Ma(l) || l, Error(r(306, a, ""));
          }
        }
        return a;
      case 0:
        return Bc(
          t,
          a,
          a.type,
          a.pendingProps,
          e
        );
      case 1:
        return l = a.type, n = We(
          l,
          a.pendingProps
        ), yo(
          t,
          a,
          l,
          n,
          e
        );
      case 3:
        t: {
          if (yt(
            a,
            a.stateNode.containerInfo
          ), t === null) throw Error(r(387));
          l = a.pendingProps;
          var u = a.memoizedState;
          n = u.element, vc(t, a), An(a, l, null, e);
          var i = a.memoizedState;
          if (l = i.cache, de(a, Lt, l), l !== u.cache && sc(
            a,
            [Lt],
            e,
            !0
          ), _n(), l = i.element, u.isDehydrated)
            if (u = {
              element: l,
              isDehydrated: !1,
              cache: i.cache
            }, a.updateQueue.baseState = u, a.memoizedState = u, a.flags & 256) {
              a = bo(
                t,
                a,
                l,
                e
              );
              break t;
            } else if (l !== n) {
              n = Ea(
                Error(r(424)),
                a
              ), yn(n), a = bo(
                t,
                a,
                l,
                e
              );
              break t;
            } else {
              switch (t = a.stateNode.containerInfo, t.nodeType) {
                case 9:
                  t = t.body;
                  break;
                default:
                  t = t.nodeName === "HTML" ? t.ownerDocument.body : t;
              }
              for (Ut = Ha(t.firstChild), ea = a, gt = !0, Ze = null, Ya = !0, e = to(
                a,
                null,
                l,
                e
              ), a.child = e; e; )
                e.flags = e.flags & -3 | 4096, e = e.sibling;
            }
          else {
            if (pn(), l === n) {
              a = ee(
                t,
                a,
                e
              );
              break t;
            }
            Jt(
              t,
              a,
              l,
              e
            );
          }
          a = a.child;
        }
        return a;
      case 26:
        return Vu(t, a), t === null ? (e = Nd(
          a.type,
          null,
          a.pendingProps,
          null
        )) ? a.memoizedState = e : gt || (e = a.type, t = a.pendingProps, l = ci(
          Z.current
        ).createElement(e), l[Pt] = a, l[na] = t, Wt(l, e, t), Qt(l), a.stateNode = l) : a.memoizedState = Nd(
          a.type,
          t.memoizedProps,
          a.pendingProps,
          t.memoizedState
        ), null;
      case 27:
        return tl(a), t === null && gt && (l = a.stateNode = jd(
          a.type,
          a.pendingProps,
          Z.current
        ), ea = a, Ya = !0, n = Ut, Ne(a.type) ? (_s = n, Ut = Ha(
          l.firstChild
        )) : Ut = n), Jt(
          t,
          a,
          a.pendingProps.children,
          e
        ), Vu(t, a), t === null && (a.flags |= 4194304), a.child;
      case 5:
        return t === null && gt && ((n = l = Ut) && (l = um(
          l,
          a.type,
          a.pendingProps,
          Ya
        ), l !== null ? (a.stateNode = l, ea = a, Ut = Ha(
          l.firstChild
        ), Ya = !1, n = !0) : n = !1), n || ke(a)), tl(a), n = a.type, u = a.pendingProps, i = t !== null ? t.memoizedProps : null, l = u.children, Ss(n, u) ? l = null : i !== null && Ss(n, i) && (a.flags |= 32), a.memoizedState !== null && (n = xc(
          t,
          a,
          Ev,
          null,
          null,
          e
        ), Jn._currentValue = n), Vu(t, a), Jt(t, a, l, e), a.child;
      case 6:
        return t === null && gt && ((t = e = Ut) && (e = im(
          e,
          a.pendingProps,
          Ya
        ), e !== null ? (a.stateNode = e, ea = a, Ut = null, t = !0) : t = !1), t || ke(a)), null;
      case 13:
        return xo(t, a, e);
      case 4:
        return yt(
          a,
          a.stateNode.containerInfo
        ), l = a.pendingProps, t === null ? a.child = Rl(
          a,
          null,
          l,
          e
        ) : Jt(
          t,
          a,
          l,
          e
        ), a.child;
      case 11:
        return oo(
          t,
          a,
          a.type,
          a.pendingProps,
          e
        );
      case 7:
        return Jt(
          t,
          a,
          a.pendingProps,
          e
        ), a.child;
      case 8:
        return Jt(
          t,
          a,
          a.pendingProps.children,
          e
        ), a.child;
      case 12:
        return Jt(
          t,
          a,
          a.pendingProps.children,
          e
        ), a.child;
      case 10:
        return l = a.pendingProps, de(a, a.type, l.value), Jt(
          t,
          a,
          l.children,
          e
        ), a.child;
      case 9:
        return n = a.type._context, l = a.pendingProps.children, Ke(a), n = It(n), l = l(n), a.flags |= 1, Jt(t, a, l, e), a.child;
      case 14:
        return ho(
          t,
          a,
          a.type,
          a.pendingProps,
          e
        );
      case 15:
        return vo(
          t,
          a,
          a.type,
          a.pendingProps,
          e
        );
      case 19:
        return To(t, a, e);
      case 31:
        return l = a.pendingProps, e = a.mode, l = {
          mode: l.mode,
          children: l.children
        }, t === null ? (e = Ku(
          l,
          e
        ), e.ref = a.ref, a.child = e, e.return = a, a = e) : (e = $a(t.child, l), e.ref = a.ref, a.child = e, e.return = a, a = e), a;
      case 22:
        return mo(t, a, e);
      case 24:
        return Ke(a), l = It(Lt), t === null ? (n = oc(), n === null && (n = Nt, u = fc(), n.pooledCache = u, u.refCount++, u !== null && (n.pooledCacheLanes |= e), n = u), a.memoizedState = {
          parent: l,
          cache: n
        }, hc(a), de(a, Lt, n)) : ((t.lanes & e) !== 0 && (vc(t, a), An(a, null, null, e), _n()), n = t.memoizedState, u = a.memoizedState, n.parent !== l ? (n = { parent: l, cache: l }, a.memoizedState = n, a.lanes === 0 && (a.memoizedState = a.updateQueue.baseState = n), de(a, Lt, l)) : (l = u.cache, de(a, Lt, l), l !== n.cache && sc(
          a,
          [Lt],
          e,
          !0
        ))), Jt(
          t,
          a,
          a.pendingProps.children,
          e
        ), a.child;
      case 29:
        throw a.pendingProps;
    }
    throw Error(r(156, a.tag));
  }
  function le(t) {
    t.flags |= 4;
  }
  function jo(t, a) {
    if (a.type !== "stylesheet" || (a.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (t.flags |= 16777216, !Rd(a)) {
      if (a = Na.current, a !== null && ((vt & 4194048) === vt ? Ga !== null : (vt & 62914560) !== vt && (vt & 536870912) === 0 || a !== Ga))
        throw En = dc, ir;
      t.flags |= 8192;
    }
  }
  function Ju(t, a) {
    a !== null && (t.flags |= 4), t.flags & 16384 && (a = t.tag !== 22 ? ln() : 536870912, t.lanes |= a, Cl |= a);
  }
  function Un(t, a) {
    if (!gt)
      switch (t.tailMode) {
        case "hidden":
          a = t.tail;
          for (var e = null; a !== null; )
            a.alternate !== null && (e = a), a = a.sibling;
          e === null ? t.tail = null : e.sibling = null;
          break;
        case "collapsed":
          e = t.tail;
          for (var l = null; e !== null; )
            e.alternate !== null && (l = e), e = e.sibling;
          l === null ? a || t.tail === null ? t.tail = null : t.tail.sibling = null : l.sibling = null;
      }
  }
  function Dt(t) {
    var a = t.alternate !== null && t.alternate.child === t.child, e = 0, l = 0;
    if (a)
      for (var n = t.child; n !== null; )
        e |= n.lanes | n.childLanes, l |= n.subtreeFlags & 65011712, l |= n.flags & 65011712, n.return = t, n = n.sibling;
    else
      for (n = t.child; n !== null; )
        e |= n.lanes | n.childLanes, l |= n.subtreeFlags, l |= n.flags, n.return = t, n = n.sibling;
    return t.subtreeFlags |= l, t.childLanes = e, a;
  }
  function Rv(t, a, e) {
    var l = a.pendingProps;
    switch (nc(a), a.tag) {
      case 31:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Dt(a), null;
      case 1:
        return Dt(a), null;
      case 3:
        return e = a.stateNode, l = null, t !== null && (l = t.memoizedState.cache), a.memoizedState.cache !== l && (a.flags |= 2048), Ia(Lt), la(), e.pendingContext && (e.context = e.pendingContext, e.pendingContext = null), (t === null || t.child === null) && (gn(a) ? le(a) : t === null || t.memoizedState.isDehydrated && (a.flags & 256) === 0 || (a.flags |= 1024, ar())), Dt(a), null;
      case 26:
        return e = a.memoizedState, t === null ? (le(a), e !== null ? (Dt(a), jo(a, e)) : (Dt(a), a.flags &= -16777217)) : e ? e !== t.memoizedState ? (le(a), Dt(a), jo(a, e)) : (Dt(a), a.flags &= -16777217) : (t.memoizedProps !== l && le(a), Dt(a), a.flags &= -16777217), null;
      case 27:
        Ue(a), e = Z.current;
        var n = a.type;
        if (t !== null && a.stateNode != null)
          t.memoizedProps !== l && le(a);
        else {
          if (!l) {
            if (a.stateNode === null)
              throw Error(r(166));
            return Dt(a), null;
          }
          t = k.current, gn(a) ? If(a) : (t = jd(n, l, e), a.stateNode = t, le(a));
        }
        return Dt(a), null;
      case 5:
        if (Ue(a), e = a.type, t !== null && a.stateNode != null)
          t.memoizedProps !== l && le(a);
        else {
          if (!l) {
            if (a.stateNode === null)
              throw Error(r(166));
            return Dt(a), null;
          }
          if (t = k.current, gn(a))
            If(a);
          else {
            switch (n = ci(
              Z.current
            ), t) {
              case 1:
                t = n.createElementNS(
                  "http://www.w3.org/2000/svg",
                  e
                );
                break;
              case 2:
                t = n.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  e
                );
                break;
              default:
                switch (e) {
                  case "svg":
                    t = n.createElementNS(
                      "http://www.w3.org/2000/svg",
                      e
                    );
                    break;
                  case "math":
                    t = n.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      e
                    );
                    break;
                  case "script":
                    t = n.createElement("div"), t.innerHTML = "<script><\/script>", t = t.removeChild(t.firstChild);
                    break;
                  case "select":
                    t = typeof l.is == "string" ? n.createElement("select", { is: l.is }) : n.createElement("select"), l.multiple ? t.multiple = !0 : l.size && (t.size = l.size);
                    break;
                  default:
                    t = typeof l.is == "string" ? n.createElement(e, { is: l.is }) : n.createElement(e);
                }
            }
            t[Pt] = a, t[na] = l;
            t: for (n = a.child; n !== null; ) {
              if (n.tag === 5 || n.tag === 6)
                t.appendChild(n.stateNode);
              else if (n.tag !== 4 && n.tag !== 27 && n.child !== null) {
                n.child.return = n, n = n.child;
                continue;
              }
              if (n === a) break t;
              for (; n.sibling === null; ) {
                if (n.return === null || n.return === a)
                  break t;
                n = n.return;
              }
              n.sibling.return = n.return, n = n.sibling;
            }
            a.stateNode = t;
            t: switch (Wt(t, e, l), e) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                t = !!l.autoFocus;
                break t;
              case "img":
                t = !0;
                break t;
              default:
                t = !1;
            }
            t && le(a);
          }
        }
        return Dt(a), a.flags &= -16777217, null;
      case 6:
        if (t && a.stateNode != null)
          t.memoizedProps !== l && le(a);
        else {
          if (typeof l != "string" && a.stateNode === null)
            throw Error(r(166));
          if (t = Z.current, gn(a)) {
            if (t = a.stateNode, e = a.memoizedProps, l = null, n = ea, n !== null)
              switch (n.tag) {
                case 27:
                case 5:
                  l = n.memoizedProps;
              }
            t[Pt] = a, t = !!(t.nodeValue === e || l !== null && l.suppressHydrationWarning === !0 || pd(t.nodeValue, e)), t || ke(a);
          } else
            t = ci(t).createTextNode(
              l
            ), t[Pt] = a, a.stateNode = t;
        }
        return Dt(a), null;
      case 13:
        if (l = a.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
          if (n = gn(a), l !== null && l.dehydrated !== null) {
            if (t === null) {
              if (!n) throw Error(r(318));
              if (n = a.memoizedState, n = n !== null ? n.dehydrated : null, !n) throw Error(r(317));
              n[Pt] = a;
            } else
              pn(), (a.flags & 128) === 0 && (a.memoizedState = null), a.flags |= 4;
            Dt(a), n = !1;
          } else
            n = ar(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = n), n = !0;
          if (!n)
            return a.flags & 256 ? (ae(a), a) : (ae(a), null);
        }
        if (ae(a), (a.flags & 128) !== 0)
          return a.lanes = e, a;
        if (e = l !== null, t = t !== null && t.memoizedState !== null, e) {
          l = a.child, n = null, l.alternate !== null && l.alternate.memoizedState !== null && l.alternate.memoizedState.cachePool !== null && (n = l.alternate.memoizedState.cachePool.pool);
          var u = null;
          l.memoizedState !== null && l.memoizedState.cachePool !== null && (u = l.memoizedState.cachePool.pool), u !== n && (l.flags |= 2048);
        }
        return e !== t && e && (a.child.flags |= 8192), Ju(a, a.updateQueue), Dt(a), null;
      case 4:
        return la(), t === null && gs(a.stateNode.containerInfo), Dt(a), null;
      case 10:
        return Ia(a.type), Dt(a), null;
      case 19:
        if (L(Xt), n = a.memoizedState, n === null) return Dt(a), null;
        if (l = (a.flags & 128) !== 0, u = n.rendering, u === null)
          if (l) Un(n, !1);
          else {
            if (qt !== 0 || t !== null && (t.flags & 128) !== 0)
              for (t = a.child; t !== null; ) {
                if (u = Qu(t), u !== null) {
                  for (a.flags |= 128, Un(n, !1), t = u.updateQueue, a.updateQueue = t, Ju(a, t), a.subtreeFlags = 0, t = e, e = a.child; e !== null; )
                    Ff(e, t), e = e.sibling;
                  return w(
                    Xt,
                    Xt.current & 1 | 2
                  ), a.child;
                }
                t = t.sibling;
              }
            n.tail !== null && xa() > Fu && (a.flags |= 128, l = !0, Un(n, !1), a.lanes = 4194304);
          }
        else {
          if (!l)
            if (t = Qu(u), t !== null) {
              if (a.flags |= 128, l = !0, t = t.updateQueue, a.updateQueue = t, Ju(a, t), Un(n, !0), n.tail === null && n.tailMode === "hidden" && !u.alternate && !gt)
                return Dt(a), null;
            } else
              2 * xa() - n.renderingStartTime > Fu && e !== 536870912 && (a.flags |= 128, l = !0, Un(n, !1), a.lanes = 4194304);
          n.isBackwards ? (u.sibling = a.child, a.child = u) : (t = n.last, t !== null ? t.sibling = u : a.child = u, n.last = u);
        }
        return n.tail !== null ? (a = n.tail, n.rendering = a, n.tail = a.sibling, n.renderingStartTime = xa(), a.sibling = null, t = Xt.current, w(Xt, l ? t & 1 | 2 : t & 1), a) : (Dt(a), null);
      case 22:
      case 23:
        return ae(a), yc(), l = a.memoizedState !== null, t !== null ? t.memoizedState !== null !== l && (a.flags |= 8192) : l && (a.flags |= 8192), l ? (e & 536870912) !== 0 && (a.flags & 128) === 0 && (Dt(a), a.subtreeFlags & 6 && (a.flags |= 8192)) : Dt(a), e = a.updateQueue, e !== null && Ju(a, e.retryQueue), e = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), l = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (l = a.memoizedState.cachePool.pool), l !== e && (a.flags |= 2048), t !== null && L(Je), null;
      case 24:
        return e = null, t !== null && (e = t.memoizedState.cache), a.memoizedState.cache !== e && (a.flags |= 2048), Ia(Lt), Dt(a), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(r(156, a.tag));
  }
  function Uv(t, a) {
    switch (nc(a), a.tag) {
      case 1:
        return t = a.flags, t & 65536 ? (a.flags = t & -65537 | 128, a) : null;
      case 3:
        return Ia(Lt), la(), t = a.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (a.flags = t & -65537 | 128, a) : null;
      case 26:
      case 27:
      case 5:
        return Ue(a), null;
      case 13:
        if (ae(a), t = a.memoizedState, t !== null && t.dehydrated !== null) {
          if (a.alternate === null)
            throw Error(r(340));
          pn();
        }
        return t = a.flags, t & 65536 ? (a.flags = t & -65537 | 128, a) : null;
      case 19:
        return L(Xt), null;
      case 4:
        return la(), null;
      case 10:
        return Ia(a.type), null;
      case 22:
      case 23:
        return ae(a), yc(), t !== null && L(Je), t = a.flags, t & 65536 ? (a.flags = t & -65537 | 128, a) : null;
      case 24:
        return Ia(Lt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function _o(t, a) {
    switch (nc(a), a.tag) {
      case 3:
        Ia(Lt), la();
        break;
      case 26:
      case 27:
      case 5:
        Ue(a);
        break;
      case 4:
        la();
        break;
      case 13:
        ae(a);
        break;
      case 19:
        L(Xt);
        break;
      case 10:
        Ia(a.type);
        break;
      case 22:
      case 23:
        ae(a), yc(), t !== null && L(Je);
        break;
      case 24:
        Ia(Lt);
    }
  }
  function qn(t, a) {
    try {
      var e = a.updateQueue, l = e !== null ? e.lastEffect : null;
      if (l !== null) {
        var n = l.next;
        e = n;
        do {
          if ((e.tag & t) === t) {
            l = void 0;
            var u = e.create, i = e.inst;
            l = u(), i.destroy = l;
          }
          e = e.next;
        } while (e !== n);
      }
    } catch (s) {
      At(a, a.return, s);
    }
  }
  function be(t, a, e) {
    try {
      var l = a.updateQueue, n = l !== null ? l.lastEffect : null;
      if (n !== null) {
        var u = n.next;
        l = u;
        do {
          if ((l.tag & t) === t) {
            var i = l.inst, s = i.destroy;
            if (s !== void 0) {
              i.destroy = void 0, n = a;
              var d = e, y = s;
              try {
                y();
              } catch (N) {
                At(
                  n,
                  d,
                  N
                );
              }
            }
          }
          l = l.next;
        } while (l !== u);
      }
    } catch (N) {
      At(a, a.return, N);
    }
  }
  function Ao(t) {
    var a = t.updateQueue;
    if (a !== null) {
      var e = t.stateNode;
      try {
        dr(a, e);
      } catch (l) {
        At(t, t.return, l);
      }
    }
  }
  function No(t, a, e) {
    e.props = We(
      t.type,
      t.memoizedProps
    ), e.state = t.memoizedState;
    try {
      e.componentWillUnmount();
    } catch (l) {
      At(t, a, l);
    }
  }
  function Hn(t, a) {
    try {
      var e = t.ref;
      if (e !== null) {
        switch (t.tag) {
          case 26:
          case 27:
          case 5:
            var l = t.stateNode;
            break;
          case 30:
            l = t.stateNode;
            break;
          default:
            l = t.stateNode;
        }
        typeof e == "function" ? t.refCleanup = e(l) : e.current = l;
      }
    } catch (n) {
      At(t, a, n);
    }
  }
  function La(t, a) {
    var e = t.ref, l = t.refCleanup;
    if (e !== null)
      if (typeof l == "function")
        try {
          l();
        } catch (n) {
          At(t, a, n);
        } finally {
          t.refCleanup = null, t = t.alternate, t != null && (t.refCleanup = null);
        }
      else if (typeof e == "function")
        try {
          e(null);
        } catch (n) {
          At(t, a, n);
        }
      else e.current = null;
  }
  function zo(t) {
    var a = t.type, e = t.memoizedProps, l = t.stateNode;
    try {
      t: switch (a) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          e.autoFocus && l.focus();
          break t;
        case "img":
          e.src ? l.src = e.src : e.srcSet && (l.srcset = e.srcSet);
      }
    } catch (n) {
      At(t, t.return, n);
    }
  }
  function Vc(t, a, e) {
    try {
      var l = t.stateNode;
      tm(l, t.type, e, a), l[na] = a;
    } catch (n) {
      At(t, t.return, n);
    }
  }
  function Oo(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && Ne(t.type) || t.tag === 4;
  }
  function Kc(t) {
    t: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || Oo(t.return)) return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
        if (t.tag === 27 && Ne(t.type) || t.flags & 2 || t.child === null || t.tag === 4) continue t;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function Jc(t, a, e) {
    var l = t.tag;
    if (l === 5 || l === 6)
      t = t.stateNode, a ? (e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e).insertBefore(t, a) : (a = e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, a.appendChild(t), e = e._reactRootContainer, e != null || a.onclick !== null || (a.onclick = ii));
    else if (l !== 4 && (l === 27 && Ne(t.type) && (e = t.stateNode, a = null), t = t.child, t !== null))
      for (Jc(t, a, e), t = t.sibling; t !== null; )
        Jc(t, a, e), t = t.sibling;
  }
  function $u(t, a, e) {
    var l = t.tag;
    if (l === 5 || l === 6)
      t = t.stateNode, a ? e.insertBefore(t, a) : e.appendChild(t);
    else if (l !== 4 && (l === 27 && Ne(t.type) && (e = t.stateNode), t = t.child, t !== null))
      for ($u(t, a, e), t = t.sibling; t !== null; )
        $u(t, a, e), t = t.sibling;
  }
  function Mo(t) {
    var a = t.stateNode, e = t.memoizedProps;
    try {
      for (var l = t.type, n = a.attributes; n.length; )
        a.removeAttributeNode(n[0]);
      Wt(a, l, e), a[Pt] = t, a[na] = e;
    } catch (u) {
      At(t, t.return, u);
    }
  }
  var ne = !1, Bt = !1, $c = !1, Do = typeof WeakSet == "function" ? WeakSet : Set, kt = null;
  function qv(t, a) {
    if (t = t.containerInfo, bs = hi, t = Lf(t), Ki(t)) {
      if ("selectionStart" in t)
        var e = {
          start: t.selectionStart,
          end: t.selectionEnd
        };
      else
        t: {
          e = (e = t.ownerDocument) && e.defaultView || window;
          var l = e.getSelection && e.getSelection();
          if (l && l.rangeCount !== 0) {
            e = l.anchorNode;
            var n = l.anchorOffset, u = l.focusNode;
            l = l.focusOffset;
            try {
              e.nodeType, u.nodeType;
            } catch {
              e = null;
              break t;
            }
            var i = 0, s = -1, d = -1, y = 0, N = 0, O = t, b = null;
            a: for (; ; ) {
              for (var x; O !== e || n !== 0 && O.nodeType !== 3 || (s = i + n), O !== u || l !== 0 && O.nodeType !== 3 || (d = i + l), O.nodeType === 3 && (i += O.nodeValue.length), (x = O.firstChild) !== null; )
                b = O, O = x;
              for (; ; ) {
                if (O === t) break a;
                if (b === e && ++y === n && (s = i), b === u && ++N === l && (d = i), (x = O.nextSibling) !== null) break;
                O = b, b = O.parentNode;
              }
              O = x;
            }
            e = s === -1 || d === -1 ? null : { start: s, end: d };
          } else e = null;
        }
      e = e || { start: 0, end: 0 };
    } else e = null;
    for (xs = { focusedElem: t, selectionRange: e }, hi = !1, kt = a; kt !== null; )
      if (a = kt, t = a.child, (a.subtreeFlags & 1024) !== 0 && t !== null)
        t.return = a, kt = t;
      else
        for (; kt !== null; ) {
          switch (a = kt, u = a.alternate, t = a.flags, a.tag) {
            case 0:
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((t & 1024) !== 0 && u !== null) {
                t = void 0, e = a, n = u.memoizedProps, u = u.memoizedState, l = e.stateNode;
                try {
                  var nt = We(
                    e.type,
                    n,
                    e.elementType === e.type
                  );
                  t = l.getSnapshotBeforeUpdate(
                    nt,
                    u
                  ), l.__reactInternalSnapshotBeforeUpdate = t;
                } catch (I) {
                  At(
                    e,
                    e.return,
                    I
                  );
                }
              }
              break;
            case 3:
              if ((t & 1024) !== 0) {
                if (t = a.stateNode.containerInfo, e = t.nodeType, e === 9)
                  Es(t);
                else if (e === 1)
                  switch (t.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Es(t);
                      break;
                    default:
                      t.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((t & 1024) !== 0) throw Error(r(163));
          }
          if (t = a.sibling, t !== null) {
            t.return = a.return, kt = t;
            break;
          }
          kt = a.return;
        }
  }
  function Ro(t, a, e) {
    var l = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        xe(t, e), l & 4 && qn(5, e);
        break;
      case 1:
        if (xe(t, e), l & 4)
          if (t = e.stateNode, a === null)
            try {
              t.componentDidMount();
            } catch (i) {
              At(e, e.return, i);
            }
          else {
            var n = We(
              e.type,
              a.memoizedProps
            );
            a = a.memoizedState;
            try {
              t.componentDidUpdate(
                n,
                a,
                t.__reactInternalSnapshotBeforeUpdate
              );
            } catch (i) {
              At(
                e,
                e.return,
                i
              );
            }
          }
        l & 64 && Ao(e), l & 512 && Hn(e, e.return);
        break;
      case 3:
        if (xe(t, e), l & 64 && (t = e.updateQueue, t !== null)) {
          if (a = null, e.child !== null)
            switch (e.child.tag) {
              case 27:
              case 5:
                a = e.child.stateNode;
                break;
              case 1:
                a = e.child.stateNode;
            }
          try {
            dr(t, a);
          } catch (i) {
            At(e, e.return, i);
          }
        }
        break;
      case 27:
        a === null && l & 4 && Mo(e);
      case 26:
      case 5:
        xe(t, e), a === null && l & 4 && zo(e), l & 512 && Hn(e, e.return);
        break;
      case 12:
        xe(t, e);
        break;
      case 13:
        xe(t, e), l & 4 && Ho(t, e), l & 64 && (t = e.memoizedState, t !== null && (t = t.dehydrated, t !== null && (e = Qv.bind(
          null,
          e
        ), cm(t, e))));
        break;
      case 22:
        if (l = e.memoizedState !== null || ne, !l) {
          a = a !== null && a.memoizedState !== null || Bt, n = ne;
          var u = Bt;
          ne = l, (Bt = a) && !u ? Se(
            t,
            e,
            (e.subtreeFlags & 8772) !== 0
          ) : xe(t, e), ne = n, Bt = u;
        }
        break;
      case 30:
        break;
      default:
        xe(t, e);
    }
  }
  function Uo(t) {
    var a = t.alternate;
    a !== null && (t.alternate = null, Uo(a)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (a = t.stateNode, a !== null && zi(a)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
  }
  var Ot = null, ca = !1;
  function ue(t, a, e) {
    for (e = e.child; e !== null; )
      qo(t, a, e), e = e.sibling;
  }
  function qo(t, a, e) {
    if (Rt && typeof Rt.onCommitFiberUnmount == "function")
      try {
        Rt.onCommitFiberUnmount(ka, e);
      } catch {
      }
    switch (e.tag) {
      case 26:
        Bt || La(e, a), ue(
          t,
          a,
          e
        ), e.memoizedState ? e.memoizedState.count-- : e.stateNode && (e = e.stateNode, e.parentNode.removeChild(e));
        break;
      case 27:
        Bt || La(e, a);
        var l = Ot, n = ca;
        Ne(e.type) && (Ot = e.stateNode, ca = !1), ue(
          t,
          a,
          e
        ), Zn(e.stateNode), Ot = l, ca = n;
        break;
      case 5:
        Bt || La(e, a);
      case 6:
        if (l = Ot, n = ca, Ot = null, ue(
          t,
          a,
          e
        ), Ot = l, ca = n, Ot !== null)
          if (ca)
            try {
              (Ot.nodeType === 9 ? Ot.body : Ot.nodeName === "HTML" ? Ot.ownerDocument.body : Ot).removeChild(e.stateNode);
            } catch (u) {
              At(
                e,
                a,
                u
              );
            }
          else
            try {
              Ot.removeChild(e.stateNode);
            } catch (u) {
              At(
                e,
                a,
                u
              );
            }
        break;
      case 18:
        Ot !== null && (ca ? (t = Ot, Td(
          t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t,
          e.stateNode
        ), Pn(t)) : Td(Ot, e.stateNode));
        break;
      case 4:
        l = Ot, n = ca, Ot = e.stateNode.containerInfo, ca = !0, ue(
          t,
          a,
          e
        ), Ot = l, ca = n;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Bt || be(2, e, a), Bt || be(4, e, a), ue(
          t,
          a,
          e
        );
        break;
      case 1:
        Bt || (La(e, a), l = e.stateNode, typeof l.componentWillUnmount == "function" && No(
          e,
          a,
          l
        )), ue(
          t,
          a,
          e
        );
        break;
      case 21:
        ue(
          t,
          a,
          e
        );
        break;
      case 22:
        Bt = (l = Bt) || e.memoizedState !== null, ue(
          t,
          a,
          e
        ), Bt = l;
        break;
      default:
        ue(
          t,
          a,
          e
        );
    }
  }
  function Ho(t, a) {
    if (a.memoizedState === null && (t = a.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null))))
      try {
        Pn(t);
      } catch (e) {
        At(a, a.return, e);
      }
  }
  function Hv(t) {
    switch (t.tag) {
      case 13:
      case 19:
        var a = t.stateNode;
        return a === null && (a = t.stateNode = new Do()), a;
      case 22:
        return t = t.stateNode, a = t._retryCache, a === null && (a = t._retryCache = new Do()), a;
      default:
        throw Error(r(435, t.tag));
    }
  }
  function Wc(t, a) {
    var e = Hv(t);
    a.forEach(function(l) {
      var n = Zv.bind(null, t, l);
      e.has(l) || (e.add(l), l.then(n, n));
    });
  }
  function va(t, a) {
    var e = a.deletions;
    if (e !== null)
      for (var l = 0; l < e.length; l++) {
        var n = e[l], u = t, i = a, s = i;
        t: for (; s !== null; ) {
          switch (s.tag) {
            case 27:
              if (Ne(s.type)) {
                Ot = s.stateNode, ca = !1;
                break t;
              }
              break;
            case 5:
              Ot = s.stateNode, ca = !1;
              break t;
            case 3:
            case 4:
              Ot = s.stateNode.containerInfo, ca = !0;
              break t;
          }
          s = s.return;
        }
        if (Ot === null) throw Error(r(160));
        qo(u, i, n), Ot = null, ca = !1, u = n.alternate, u !== null && (u.return = null), n.return = null;
      }
    if (a.subtreeFlags & 13878)
      for (a = a.child; a !== null; )
        Co(a, t), a = a.sibling;
  }
  var qa = null;
  function Co(t, a) {
    var e = t.alternate, l = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        va(a, t), ma(t), l & 4 && (be(3, t, t.return), qn(3, t), be(5, t, t.return));
        break;
      case 1:
        va(a, t), ma(t), l & 512 && (Bt || e === null || La(e, e.return)), l & 64 && ne && (t = t.updateQueue, t !== null && (l = t.callbacks, l !== null && (e = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = e === null ? l : e.concat(l))));
        break;
      case 26:
        var n = qa;
        if (va(a, t), ma(t), l & 512 && (Bt || e === null || La(e, e.return)), l & 4) {
          var u = e !== null ? e.memoizedState : null;
          if (l = t.memoizedState, e === null)
            if (l === null)
              if (t.stateNode === null) {
                t: {
                  l = t.type, e = t.memoizedProps, n = n.ownerDocument || n;
                  a: switch (l) {
                    case "title":
                      u = n.getElementsByTagName("title")[0], (!u || u[nn] || u[Pt] || u.namespaceURI === "http://www.w3.org/2000/svg" || u.hasAttribute("itemprop")) && (u = n.createElement(l), n.head.insertBefore(
                        u,
                        n.querySelector("head > title")
                      )), Wt(u, l, e), u[Pt] = t, Qt(u), l = u;
                      break t;
                    case "link":
                      var i = Md(
                        "link",
                        "href",
                        n
                      ).get(l + (e.href || ""));
                      if (i) {
                        for (var s = 0; s < i.length; s++)
                          if (u = i[s], u.getAttribute("href") === (e.href == null || e.href === "" ? null : e.href) && u.getAttribute("rel") === (e.rel == null ? null : e.rel) && u.getAttribute("title") === (e.title == null ? null : e.title) && u.getAttribute("crossorigin") === (e.crossOrigin == null ? null : e.crossOrigin)) {
                            i.splice(s, 1);
                            break a;
                          }
                      }
                      u = n.createElement(l), Wt(u, l, e), n.head.appendChild(u);
                      break;
                    case "meta":
                      if (i = Md(
                        "meta",
                        "content",
                        n
                      ).get(l + (e.content || ""))) {
                        for (s = 0; s < i.length; s++)
                          if (u = i[s], u.getAttribute("content") === (e.content == null ? null : "" + e.content) && u.getAttribute("name") === (e.name == null ? null : e.name) && u.getAttribute("property") === (e.property == null ? null : e.property) && u.getAttribute("http-equiv") === (e.httpEquiv == null ? null : e.httpEquiv) && u.getAttribute("charset") === (e.charSet == null ? null : e.charSet)) {
                            i.splice(s, 1);
                            break a;
                          }
                      }
                      u = n.createElement(l), Wt(u, l, e), n.head.appendChild(u);
                      break;
                    default:
                      throw Error(r(468, l));
                  }
                  u[Pt] = t, Qt(u), l = u;
                }
                t.stateNode = l;
              } else
                Dd(
                  n,
                  t.type,
                  t.stateNode
                );
            else
              t.stateNode = Od(
                n,
                l,
                t.memoizedProps
              );
          else
            u !== l ? (u === null ? e.stateNode !== null && (e = e.stateNode, e.parentNode.removeChild(e)) : u.count--, l === null ? Dd(
              n,
              t.type,
              t.stateNode
            ) : Od(
              n,
              l,
              t.memoizedProps
            )) : l === null && t.stateNode !== null && Vc(
              t,
              t.memoizedProps,
              e.memoizedProps
            );
        }
        break;
      case 27:
        va(a, t), ma(t), l & 512 && (Bt || e === null || La(e, e.return)), e !== null && l & 4 && Vc(
          t,
          t.memoizedProps,
          e.memoizedProps
        );
        break;
      case 5:
        if (va(a, t), ma(t), l & 512 && (Bt || e === null || La(e, e.return)), t.flags & 32) {
          n = t.stateNode;
          try {
            vl(n, "");
          } catch (x) {
            At(t, t.return, x);
          }
        }
        l & 4 && t.stateNode != null && (n = t.memoizedProps, Vc(
          t,
          n,
          e !== null ? e.memoizedProps : n
        )), l & 1024 && ($c = !0);
        break;
      case 6:
        if (va(a, t), ma(t), l & 4) {
          if (t.stateNode === null)
            throw Error(r(162));
          l = t.memoizedProps, e = t.stateNode;
          try {
            e.nodeValue = l;
          } catch (x) {
            At(t, t.return, x);
          }
        }
        break;
      case 3:
        if (ri = null, n = qa, qa = si(a.containerInfo), va(a, t), qa = n, ma(t), l & 4 && e !== null && e.memoizedState.isDehydrated)
          try {
            Pn(a.containerInfo);
          } catch (x) {
            At(t, t.return, x);
          }
        $c && ($c = !1, wo(t));
        break;
      case 4:
        l = qa, qa = si(
          t.stateNode.containerInfo
        ), va(a, t), ma(t), qa = l;
        break;
      case 12:
        va(a, t), ma(t);
        break;
      case 13:
        va(a, t), ma(t), t.child.flags & 8192 && t.memoizedState !== null != (e !== null && e.memoizedState !== null) && (es = xa()), l & 4 && (l = t.updateQueue, l !== null && (t.updateQueue = null, Wc(t, l)));
        break;
      case 22:
        n = t.memoizedState !== null;
        var d = e !== null && e.memoizedState !== null, y = ne, N = Bt;
        if (ne = y || n, Bt = N || d, va(a, t), Bt = N, ne = y, ma(t), l & 8192)
          t: for (a = t.stateNode, a._visibility = n ? a._visibility & -2 : a._visibility | 1, n && (e === null || d || ne || Bt || Fe(t)), e = null, a = t; ; ) {
            if (a.tag === 5 || a.tag === 26) {
              if (e === null) {
                d = e = a;
                try {
                  if (u = d.stateNode, n)
                    i = u.style, typeof i.setProperty == "function" ? i.setProperty("display", "none", "important") : i.display = "none";
                  else {
                    s = d.stateNode;
                    var O = d.memoizedProps.style, b = O != null && O.hasOwnProperty("display") ? O.display : null;
                    s.style.display = b == null || typeof b == "boolean" ? "" : ("" + b).trim();
                  }
                } catch (x) {
                  At(d, d.return, x);
                }
              }
            } else if (a.tag === 6) {
              if (e === null) {
                d = a;
                try {
                  d.stateNode.nodeValue = n ? "" : d.memoizedProps;
                } catch (x) {
                  At(d, d.return, x);
                }
              }
            } else if ((a.tag !== 22 && a.tag !== 23 || a.memoizedState === null || a === t) && a.child !== null) {
              a.child.return = a, a = a.child;
              continue;
            }
            if (a === t) break t;
            for (; a.sibling === null; ) {
              if (a.return === null || a.return === t) break t;
              e === a && (e = null), a = a.return;
            }
            e === a && (e = null), a.sibling.return = a.return, a = a.sibling;
          }
        l & 4 && (l = t.updateQueue, l !== null && (e = l.retryQueue, e !== null && (l.retryQueue = null, Wc(t, e))));
        break;
      case 19:
        va(a, t), ma(t), l & 4 && (l = t.updateQueue, l !== null && (t.updateQueue = null, Wc(t, l)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        va(a, t), ma(t);
    }
  }
  function ma(t) {
    var a = t.flags;
    if (a & 2) {
      try {
        for (var e, l = t.return; l !== null; ) {
          if (Oo(l)) {
            e = l;
            break;
          }
          l = l.return;
        }
        if (e == null) throw Error(r(160));
        switch (e.tag) {
          case 27:
            var n = e.stateNode, u = Kc(t);
            $u(t, u, n);
            break;
          case 5:
            var i = e.stateNode;
            e.flags & 32 && (vl(i, ""), e.flags &= -33);
            var s = Kc(t);
            $u(t, s, i);
            break;
          case 3:
          case 4:
            var d = e.stateNode.containerInfo, y = Kc(t);
            Jc(
              t,
              y,
              d
            );
            break;
          default:
            throw Error(r(161));
        }
      } catch (N) {
        At(t, t.return, N);
      }
      t.flags &= -3;
    }
    a & 4096 && (t.flags &= -4097);
  }
  function wo(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var a = t;
        wo(a), a.tag === 5 && a.flags & 1024 && a.stateNode.reset(), t = t.sibling;
      }
  }
  function xe(t, a) {
    if (a.subtreeFlags & 8772)
      for (a = a.child; a !== null; )
        Ro(t, a.alternate, a), a = a.sibling;
  }
  function Fe(t) {
    for (t = t.child; t !== null; ) {
      var a = t;
      switch (a.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          be(4, a, a.return), Fe(a);
          break;
        case 1:
          La(a, a.return);
          var e = a.stateNode;
          typeof e.componentWillUnmount == "function" && No(
            a,
            a.return,
            e
          ), Fe(a);
          break;
        case 27:
          Zn(a.stateNode);
        case 26:
        case 5:
          La(a, a.return), Fe(a);
          break;
        case 22:
          a.memoizedState === null && Fe(a);
          break;
        case 30:
          Fe(a);
          break;
        default:
          Fe(a);
      }
      t = t.sibling;
    }
  }
  function Se(t, a, e) {
    for (e = e && (a.subtreeFlags & 8772) !== 0, a = a.child; a !== null; ) {
      var l = a.alternate, n = t, u = a, i = u.flags;
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          Se(
            n,
            u,
            e
          ), qn(4, u);
          break;
        case 1:
          if (Se(
            n,
            u,
            e
          ), l = u, n = l.stateNode, typeof n.componentDidMount == "function")
            try {
              n.componentDidMount();
            } catch (y) {
              At(l, l.return, y);
            }
          if (l = u, n = l.updateQueue, n !== null) {
            var s = l.stateNode;
            try {
              var d = n.shared.hiddenCallbacks;
              if (d !== null)
                for (n.shared.hiddenCallbacks = null, n = 0; n < d.length; n++)
                  or(d[n], s);
            } catch (y) {
              At(l, l.return, y);
            }
          }
          e && i & 64 && Ao(u), Hn(u, u.return);
          break;
        case 27:
          Mo(u);
        case 26:
        case 5:
          Se(
            n,
            u,
            e
          ), e && l === null && i & 4 && zo(u), Hn(u, u.return);
          break;
        case 12:
          Se(
            n,
            u,
            e
          );
          break;
        case 13:
          Se(
            n,
            u,
            e
          ), e && i & 4 && Ho(n, u);
          break;
        case 22:
          u.memoizedState === null && Se(
            n,
            u,
            e
          ), Hn(u, u.return);
          break;
        case 30:
          break;
        default:
          Se(
            n,
            u,
            e
          );
      }
      a = a.sibling;
    }
  }
  function Fc(t, a) {
    var e = null;
    t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), t = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (t = a.memoizedState.cachePool.pool), t !== e && (t != null && t.refCount++, e != null && xn(e));
  }
  function Pc(t, a) {
    t = null, a.alternate !== null && (t = a.alternate.memoizedState.cache), a = a.memoizedState.cache, a !== t && (a.refCount++, t != null && xn(t));
  }
  function Xa(t, a, e, l) {
    if (a.subtreeFlags & 10256)
      for (a = a.child; a !== null; )
        Bo(
          t,
          a,
          e,
          l
        ), a = a.sibling;
  }
  function Bo(t, a, e, l) {
    var n = a.flags;
    switch (a.tag) {
      case 0:
      case 11:
      case 15:
        Xa(
          t,
          a,
          e,
          l
        ), n & 2048 && qn(9, a);
        break;
      case 1:
        Xa(
          t,
          a,
          e,
          l
        );
        break;
      case 3:
        Xa(
          t,
          a,
          e,
          l
        ), n & 2048 && (t = null, a.alternate !== null && (t = a.alternate.memoizedState.cache), a = a.memoizedState.cache, a !== t && (a.refCount++, t != null && xn(t)));
        break;
      case 12:
        if (n & 2048) {
          Xa(
            t,
            a,
            e,
            l
          ), t = a.stateNode;
          try {
            var u = a.memoizedProps, i = u.id, s = u.onPostCommit;
            typeof s == "function" && s(
              i,
              a.alternate === null ? "mount" : "update",
              t.passiveEffectDuration,
              -0
            );
          } catch (d) {
            At(a, a.return, d);
          }
        } else
          Xa(
            t,
            a,
            e,
            l
          );
        break;
      case 13:
        Xa(
          t,
          a,
          e,
          l
        );
        break;
      case 23:
        break;
      case 22:
        u = a.stateNode, i = a.alternate, a.memoizedState !== null ? u._visibility & 2 ? Xa(
          t,
          a,
          e,
          l
        ) : Cn(t, a) : u._visibility & 2 ? Xa(
          t,
          a,
          e,
          l
        ) : (u._visibility |= 2, Ul(
          t,
          a,
          e,
          l,
          (a.subtreeFlags & 10256) !== 0
        )), n & 2048 && Fc(i, a);
        break;
      case 24:
        Xa(
          t,
          a,
          e,
          l
        ), n & 2048 && Pc(a.alternate, a);
        break;
      default:
        Xa(
          t,
          a,
          e,
          l
        );
    }
  }
  function Ul(t, a, e, l, n) {
    for (n = n && (a.subtreeFlags & 10256) !== 0, a = a.child; a !== null; ) {
      var u = t, i = a, s = e, d = l, y = i.flags;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          Ul(
            u,
            i,
            s,
            d,
            n
          ), qn(8, i);
          break;
        case 23:
          break;
        case 22:
          var N = i.stateNode;
          i.memoizedState !== null ? N._visibility & 2 ? Ul(
            u,
            i,
            s,
            d,
            n
          ) : Cn(
            u,
            i
          ) : (N._visibility |= 2, Ul(
            u,
            i,
            s,
            d,
            n
          )), n && y & 2048 && Fc(
            i.alternate,
            i
          );
          break;
        case 24:
          Ul(
            u,
            i,
            s,
            d,
            n
          ), n && y & 2048 && Pc(i.alternate, i);
          break;
        default:
          Ul(
            u,
            i,
            s,
            d,
            n
          );
      }
      a = a.sibling;
    }
  }
  function Cn(t, a) {
    if (a.subtreeFlags & 10256)
      for (a = a.child; a !== null; ) {
        var e = t, l = a, n = l.flags;
        switch (l.tag) {
          case 22:
            Cn(e, l), n & 2048 && Fc(
              l.alternate,
              l
            );
            break;
          case 24:
            Cn(e, l), n & 2048 && Pc(l.alternate, l);
            break;
          default:
            Cn(e, l);
        }
        a = a.sibling;
      }
  }
  var wn = 8192;
  function ql(t) {
    if (t.subtreeFlags & wn)
      for (t = t.child; t !== null; )
        Yo(t), t = t.sibling;
  }
  function Yo(t) {
    switch (t.tag) {
      case 26:
        ql(t), t.flags & wn && t.memoizedState !== null && xm(
          qa,
          t.memoizedState,
          t.memoizedProps
        );
        break;
      case 5:
        ql(t);
        break;
      case 3:
      case 4:
        var a = qa;
        qa = si(t.stateNode.containerInfo), ql(t), qa = a;
        break;
      case 22:
        t.memoizedState === null && (a = t.alternate, a !== null && a.memoizedState !== null ? (a = wn, wn = 16777216, ql(t), wn = a) : ql(t));
        break;
      default:
        ql(t);
    }
  }
  function Go(t) {
    var a = t.alternate;
    if (a !== null && (t = a.child, t !== null)) {
      a.child = null;
      do
        a = t.sibling, t.sibling = null, t = a;
      while (t !== null);
    }
  }
  function Bn(t) {
    var a = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (a !== null)
        for (var e = 0; e < a.length; e++) {
          var l = a[e];
          kt = l, Xo(
            l,
            t
          );
        }
      Go(t);
    }
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        Lo(t), t = t.sibling;
  }
  function Lo(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        Bn(t), t.flags & 2048 && be(9, t, t.return);
        break;
      case 3:
        Bn(t);
        break;
      case 12:
        Bn(t);
        break;
      case 22:
        var a = t.stateNode;
        t.memoizedState !== null && a._visibility & 2 && (t.return === null || t.return.tag !== 13) ? (a._visibility &= -3, Wu(t)) : Bn(t);
        break;
      default:
        Bn(t);
    }
  }
  function Wu(t) {
    var a = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (a !== null)
        for (var e = 0; e < a.length; e++) {
          var l = a[e];
          kt = l, Xo(
            l,
            t
          );
        }
      Go(t);
    }
    for (t = t.child; t !== null; ) {
      switch (a = t, a.tag) {
        case 0:
        case 11:
        case 15:
          be(8, a, a.return), Wu(a);
          break;
        case 22:
          e = a.stateNode, e._visibility & 2 && (e._visibility &= -3, Wu(a));
          break;
        default:
          Wu(a);
      }
      t = t.sibling;
    }
  }
  function Xo(t, a) {
    for (; kt !== null; ) {
      var e = kt;
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          be(8, e, a);
          break;
        case 23:
        case 22:
          if (e.memoizedState !== null && e.memoizedState.cachePool !== null) {
            var l = e.memoizedState.cachePool.pool;
            l != null && l.refCount++;
          }
          break;
        case 24:
          xn(e.memoizedState.cache);
      }
      if (l = e.child, l !== null) l.return = e, kt = l;
      else
        t: for (e = t; kt !== null; ) {
          l = kt;
          var n = l.sibling, u = l.return;
          if (Uo(l), l === e) {
            kt = null;
            break t;
          }
          if (n !== null) {
            n.return = u, kt = n;
            break t;
          }
          kt = u;
        }
    }
  }
  var Cv = {
    getCacheForType: function(t) {
      var a = It(Lt), e = a.data.get(t);
      return e === void 0 && (e = t(), a.data.set(t, e)), e;
    }
  }, wv = typeof WeakMap == "function" ? WeakMap : Map, xt = 0, Nt = null, dt = null, vt = 0, St = 0, ga = null, Te = !1, Hl = !1, Ic = !1, ie = 0, qt = 0, Ee = 0, Pe = 0, ts = 0, za = 0, Cl = 0, Yn = null, sa = null, as = !1, es = 0, Fu = 1 / 0, Pu = null, je = null, $t = 0, _e = null, wl = null, Bl = 0, ls = 0, ns = null, Qo = null, Gn = 0, us = null;
  function pa() {
    if ((xt & 2) !== 0 && vt !== 0)
      return vt & -vt;
    if (A.T !== null) {
      var t = _l;
      return t !== 0 ? t : ds();
    }
    return Ce();
  }
  function Zo() {
    za === 0 && (za = (vt & 536870912) === 0 || gt ? en() : 536870912);
    var t = Na.current;
    return t !== null && (t.flags |= 32), za;
  }
  function ya(t, a, e) {
    (t === Nt && (St === 2 || St === 9) || t.cancelPendingCommit !== null) && (Yl(t, 0), Ae(
      t,
      vt,
      za,
      !1
    )), T(t, e), ((xt & 2) === 0 || t !== Nt) && (t === Nt && ((xt & 2) === 0 && (Pe |= e), qt === 4 && Ae(
      t,
      vt,
      za,
      !1
    )), Qa(t));
  }
  function ko(t, a, e) {
    if ((xt & 6) !== 0) throw Error(r(327));
    var l = !e && (a & 124) === 0 && (a & t.expiredLanes) === 0 || fe(t, a), n = l ? Gv(t, a) : ss(t, a, !0), u = l;
    do {
      if (n === 0) {
        Hl && !l && Ae(t, a, 0, !1);
        break;
      } else {
        if (e = t.current.alternate, u && !Bv(e)) {
          n = ss(t, a, !1), u = !1;
          continue;
        }
        if (n === 2) {
          if (u = a, t.errorRecoveryDisabledLanes & u)
            var i = 0;
          else
            i = t.pendingLanes & -536870913, i = i !== 0 ? i : i & 536870912 ? 536870912 : 0;
          if (i !== 0) {
            a = i;
            t: {
              var s = t;
              n = Yn;
              var d = s.current.memoizedState.isDehydrated;
              if (d && (Yl(s, i).flags |= 256), i = ss(
                s,
                i,
                !1
              ), i !== 2) {
                if (Ic && !d) {
                  s.errorRecoveryDisabledLanes |= u, Pe |= u, n = 4;
                  break t;
                }
                u = sa, sa = n, u !== null && (sa === null ? sa = u : sa.push.apply(
                  sa,
                  u
                ));
              }
              n = i;
            }
            if (u = !1, n !== 2) continue;
          }
        }
        if (n === 1) {
          Yl(t, 0), Ae(t, a, 0, !0);
          break;
        }
        t: {
          switch (l = t, u = n, u) {
            case 0:
            case 1:
              throw Error(r(345));
            case 4:
              if ((a & 4194048) !== a) break;
            case 6:
              Ae(
                l,
                a,
                za,
                !Te
              );
              break t;
            case 2:
              sa = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(r(329));
          }
          if ((a & 62914560) === a && (n = es + 300 - xa(), 10 < n)) {
            if (Ae(
              l,
              a,
              za,
              !Te
            ), ul(l, 0, !0) !== 0) break t;
            l.timeoutHandle = xd(
              Vo.bind(
                null,
                l,
                e,
                sa,
                Pu,
                as,
                a,
                za,
                Pe,
                Cl,
                Te,
                u,
                2,
                -0,
                0
              ),
              n
            );
            break t;
          }
          Vo(
            l,
            e,
            sa,
            Pu,
            as,
            a,
            za,
            Pe,
            Cl,
            Te,
            u,
            0,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    Qa(t);
  }
  function Vo(t, a, e, l, n, u, i, s, d, y, N, O, b, x) {
    if (t.timeoutHandle = -1, O = a.subtreeFlags, (O & 8192 || (O & 16785408) === 16785408) && (Kn = { stylesheets: null, count: 0, unsuspend: bm }, Yo(a), O = Sm(), O !== null)) {
      t.cancelPendingCommit = O(
        Io.bind(
          null,
          t,
          a,
          u,
          e,
          l,
          n,
          i,
          s,
          d,
          N,
          1,
          b,
          x
        )
      ), Ae(t, u, i, !y);
      return;
    }
    Io(
      t,
      a,
      u,
      e,
      l,
      n,
      i,
      s,
      d
    );
  }
  function Bv(t) {
    for (var a = t; ; ) {
      var e = a.tag;
      if ((e === 0 || e === 11 || e === 15) && a.flags & 16384 && (e = a.updateQueue, e !== null && (e = e.stores, e !== null)))
        for (var l = 0; l < e.length; l++) {
          var n = e[l], u = n.getSnapshot;
          n = n.value;
          try {
            if (!da(u(), n)) return !1;
          } catch {
            return !1;
          }
        }
      if (e = a.child, a.subtreeFlags & 16384 && e !== null)
        e.return = a, a = e;
      else {
        if (a === t) break;
        for (; a.sibling === null; ) {
          if (a.return === null || a.return === t) return !0;
          a = a.return;
        }
        a.sibling.return = a.return, a = a.sibling;
      }
    }
    return !0;
  }
  function Ae(t, a, e, l) {
    a &= ~ts, a &= ~Pe, t.suspendedLanes |= a, t.pingedLanes &= ~a, l && (t.warmLanes |= a), l = t.expirationTimes;
    for (var n = a; 0 < n; ) {
      var u = 31 - Ft(n), i = 1 << u;
      l[u] = -1, n &= ~i;
    }
    e !== 0 && bt(t, e, a);
  }
  function Iu() {
    return (xt & 6) === 0 ? (Ln(0), !1) : !0;
  }
  function is() {
    if (dt !== null) {
      if (St === 0)
        var t = dt.return;
      else
        t = dt, Pa = Ve = null, Ec(t), Dl = null, Dn = 0, t = dt;
      for (; t !== null; )
        _o(t.alternate, t), t = t.return;
      dt = null;
    }
  }
  function Yl(t, a) {
    var e = t.timeoutHandle;
    e !== -1 && (t.timeoutHandle = -1, em(e)), e = t.cancelPendingCommit, e !== null && (t.cancelPendingCommit = null, e()), is(), Nt = t, dt = e = $a(t.current, null), vt = a, St = 0, ga = null, Te = !1, Hl = fe(t, a), Ic = !1, Cl = za = ts = Pe = Ee = qt = 0, sa = Yn = null, as = !1, (a & 8) !== 0 && (a |= a & 32);
    var l = t.entangledLanes;
    if (l !== 0)
      for (t = t.entanglements, l &= a; 0 < l; ) {
        var n = 31 - Ft(l), u = 1 << n;
        a |= t[n], l &= ~u;
      }
    return ie = a, Su(), e;
  }
  function Ko(t, a) {
    ft = null, A.H = Gu, a === Tn || a === Mu ? (a = fr(), St = 3) : a === ir ? (a = fr(), St = 4) : St = a === ro ? 8 : a !== null && typeof a == "object" && typeof a.then == "function" ? 6 : 1, ga = a, dt === null && (qt = 1, ku(
      t,
      Ea(a, t.current)
    ));
  }
  function Jo() {
    var t = A.H;
    return A.H = Gu, t === null ? Gu : t;
  }
  function $o() {
    var t = A.A;
    return A.A = Cv, t;
  }
  function cs() {
    qt = 4, Te || (vt & 4194048) !== vt && Na.current !== null || (Hl = !0), (Ee & 134217727) === 0 && (Pe & 134217727) === 0 || Nt === null || Ae(
      Nt,
      vt,
      za,
      !1
    );
  }
  function ss(t, a, e) {
    var l = xt;
    xt |= 2;
    var n = Jo(), u = $o();
    (Nt !== t || vt !== a) && (Pu = null, Yl(t, a)), a = !1;
    var i = qt;
    t: do
      try {
        if (St !== 0 && dt !== null) {
          var s = dt, d = ga;
          switch (St) {
            case 8:
              is(), i = 6;
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              Na.current === null && (a = !0);
              var y = St;
              if (St = 0, ga = null, Gl(t, s, d, y), e && Hl) {
                i = 0;
                break t;
              }
              break;
            default:
              y = St, St = 0, ga = null, Gl(t, s, d, y);
          }
        }
        Yv(), i = qt;
        break;
      } catch (N) {
        Ko(t, N);
      }
    while (!0);
    return a && t.shellSuspendCounter++, Pa = Ve = null, xt = l, A.H = n, A.A = u, dt === null && (Nt = null, vt = 0, Su()), i;
  }
  function Yv() {
    for (; dt !== null; ) Wo(dt);
  }
  function Gv(t, a) {
    var e = xt;
    xt |= 2;
    var l = Jo(), n = $o();
    Nt !== t || vt !== a ? (Pu = null, Fu = xa() + 500, Yl(t, a)) : Hl = fe(
      t,
      a
    );
    t: do
      try {
        if (St !== 0 && dt !== null) {
          a = dt;
          var u = ga;
          a: switch (St) {
            case 1:
              St = 0, ga = null, Gl(t, a, u, 1);
              break;
            case 2:
            case 9:
              if (cr(u)) {
                St = 0, ga = null, Fo(a);
                break;
              }
              a = function() {
                St !== 2 && St !== 9 || Nt !== t || (St = 7), Qa(t);
              }, u.then(a, a);
              break t;
            case 3:
              St = 7;
              break t;
            case 4:
              St = 5;
              break t;
            case 7:
              cr(u) ? (St = 0, ga = null, Fo(a)) : (St = 0, ga = null, Gl(t, a, u, 7));
              break;
            case 5:
              var i = null;
              switch (dt.tag) {
                case 26:
                  i = dt.memoizedState;
                case 5:
                case 27:
                  var s = dt;
                  if (!i || Rd(i)) {
                    St = 0, ga = null;
                    var d = s.sibling;
                    if (d !== null) dt = d;
                    else {
                      var y = s.return;
                      y !== null ? (dt = y, ti(y)) : dt = null;
                    }
                    break a;
                  }
              }
              St = 0, ga = null, Gl(t, a, u, 5);
              break;
            case 6:
              St = 0, ga = null, Gl(t, a, u, 6);
              break;
            case 8:
              is(), qt = 6;
              break t;
            default:
              throw Error(r(462));
          }
        }
        Lv();
        break;
      } catch (N) {
        Ko(t, N);
      }
    while (!0);
    return Pa = Ve = null, A.H = l, A.A = n, xt = e, dt !== null ? 0 : (Nt = null, vt = 0, Su(), qt);
  }
  function Lv() {
    for (; dt !== null && !nu(); )
      Wo(dt);
  }
  function Wo(t) {
    var a = Eo(t.alternate, t, ie);
    t.memoizedProps = t.pendingProps, a === null ? ti(t) : dt = a;
  }
  function Fo(t) {
    var a = t, e = a.alternate;
    switch (a.tag) {
      case 15:
      case 0:
        a = po(
          e,
          a,
          a.pendingProps,
          a.type,
          void 0,
          vt
        );
        break;
      case 11:
        a = po(
          e,
          a,
          a.pendingProps,
          a.type.render,
          a.ref,
          vt
        );
        break;
      case 5:
        Ec(a);
      default:
        _o(e, a), a = dt = Ff(a, ie), a = Eo(e, a, ie);
    }
    t.memoizedProps = t.pendingProps, a === null ? ti(t) : dt = a;
  }
  function Gl(t, a, e, l) {
    Pa = Ve = null, Ec(a), Dl = null, Dn = 0;
    var n = a.return;
    try {
      if (Mv(
        t,
        n,
        a,
        e,
        vt
      )) {
        qt = 1, ku(
          t,
          Ea(e, t.current)
        ), dt = null;
        return;
      }
    } catch (u) {
      if (n !== null) throw dt = n, u;
      qt = 1, ku(
        t,
        Ea(e, t.current)
      ), dt = null;
      return;
    }
    a.flags & 32768 ? (gt || l === 1 ? t = !0 : Hl || (vt & 536870912) !== 0 ? t = !1 : (Te = t = !0, (l === 2 || l === 9 || l === 3 || l === 6) && (l = Na.current, l !== null && l.tag === 13 && (l.flags |= 16384))), Po(a, t)) : ti(a);
  }
  function ti(t) {
    var a = t;
    do {
      if ((a.flags & 32768) !== 0) {
        Po(
          a,
          Te
        );
        return;
      }
      t = a.return;
      var e = Rv(
        a.alternate,
        a,
        ie
      );
      if (e !== null) {
        dt = e;
        return;
      }
      if (a = a.sibling, a !== null) {
        dt = a;
        return;
      }
      dt = a = t;
    } while (a !== null);
    qt === 0 && (qt = 5);
  }
  function Po(t, a) {
    do {
      var e = Uv(t.alternate, t);
      if (e !== null) {
        e.flags &= 32767, dt = e;
        return;
      }
      if (e = t.return, e !== null && (e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null), !a && (t = t.sibling, t !== null)) {
        dt = t;
        return;
      }
      dt = t = e;
    } while (t !== null);
    qt = 6, dt = null;
  }
  function Io(t, a, e, l, n, u, i, s, d) {
    t.cancelPendingCommit = null;
    do
      ai();
    while ($t !== 0);
    if ((xt & 6) !== 0) throw Error(r(327));
    if (a !== null) {
      if (a === t.current) throw Error(r(177));
      if (u = a.lanes | a.childLanes, u |= Pi, it(
        t,
        e,
        u,
        i,
        s,
        d
      ), t === Nt && (dt = Nt = null, vt = 0), wl = a, _e = t, Bl = e, ls = u, ns = n, Qo = l, (a.subtreeFlags & 10256) !== 0 || (a.flags & 10256) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, kv(el, function() {
        return nd(), null;
      })) : (t.callbackNode = null, t.callbackPriority = 0), l = (a.flags & 13878) !== 0, (a.subtreeFlags & 13878) !== 0 || l) {
        l = A.T, A.T = null, n = C.p, C.p = 2, i = xt, xt |= 4;
        try {
          qv(t, a, e);
        } finally {
          xt = i, C.p = n, A.T = l;
        }
      }
      $t = 1, td(), ad(), ed();
    }
  }
  function td() {
    if ($t === 1) {
      $t = 0;
      var t = _e, a = wl, e = (a.flags & 13878) !== 0;
      if ((a.subtreeFlags & 13878) !== 0 || e) {
        e = A.T, A.T = null;
        var l = C.p;
        C.p = 2;
        var n = xt;
        xt |= 4;
        try {
          Co(a, t);
          var u = xs, i = Lf(t.containerInfo), s = u.focusedElem, d = u.selectionRange;
          if (i !== s && s && s.ownerDocument && Gf(
            s.ownerDocument.documentElement,
            s
          )) {
            if (d !== null && Ki(s)) {
              var y = d.start, N = d.end;
              if (N === void 0 && (N = y), "selectionStart" in s)
                s.selectionStart = y, s.selectionEnd = Math.min(
                  N,
                  s.value.length
                );
              else {
                var O = s.ownerDocument || document, b = O && O.defaultView || window;
                if (b.getSelection) {
                  var x = b.getSelection(), nt = s.textContent.length, I = Math.min(d.start, nt), _t = d.end === void 0 ? I : Math.min(d.end, nt);
                  !x.extend && I > _t && (i = _t, _t = I, I = i);
                  var g = Yf(
                    s,
                    I
                  ), v = Yf(
                    s,
                    _t
                  );
                  if (g && v && (x.rangeCount !== 1 || x.anchorNode !== g.node || x.anchorOffset !== g.offset || x.focusNode !== v.node || x.focusOffset !== v.offset)) {
                    var p = O.createRange();
                    p.setStart(g.node, g.offset), x.removeAllRanges(), I > _t ? (x.addRange(p), x.extend(v.node, v.offset)) : (p.setEnd(v.node, v.offset), x.addRange(p));
                  }
                }
              }
            }
            for (O = [], x = s; x = x.parentNode; )
              x.nodeType === 1 && O.push({
                element: x,
                left: x.scrollLeft,
                top: x.scrollTop
              });
            for (typeof s.focus == "function" && s.focus(), s = 0; s < O.length; s++) {
              var z = O[s];
              z.element.scrollLeft = z.left, z.element.scrollTop = z.top;
            }
          }
          hi = !!bs, xs = bs = null;
        } finally {
          xt = n, C.p = l, A.T = e;
        }
      }
      t.current = a, $t = 2;
    }
  }
  function ad() {
    if ($t === 2) {
      $t = 0;
      var t = _e, a = wl, e = (a.flags & 8772) !== 0;
      if ((a.subtreeFlags & 8772) !== 0 || e) {
        e = A.T, A.T = null;
        var l = C.p;
        C.p = 2;
        var n = xt;
        xt |= 4;
        try {
          Ro(t, a.alternate, a);
        } finally {
          xt = n, C.p = l, A.T = e;
        }
      }
      $t = 3;
    }
  }
  function ed() {
    if ($t === 4 || $t === 3) {
      $t = 0, ra();
      var t = _e, a = wl, e = Bl, l = Qo;
      (a.subtreeFlags & 10256) !== 0 || (a.flags & 10256) !== 0 ? $t = 5 : ($t = 0, wl = _e = null, ld(t, t.pendingLanes));
      var n = t.pendingLanes;
      if (n === 0 && (je = null), He(e), a = a.stateNode, Rt && typeof Rt.onCommitFiberRoot == "function")
        try {
          Rt.onCommitFiberRoot(
            ka,
            a,
            void 0,
            (a.current.flags & 128) === 128
          );
        } catch {
        }
      if (l !== null) {
        a = A.T, n = C.p, C.p = 2, A.T = null;
        try {
          for (var u = t.onRecoverableError, i = 0; i < l.length; i++) {
            var s = l[i];
            u(s.value, {
              componentStack: s.stack
            });
          }
        } finally {
          A.T = a, C.p = n;
        }
      }
      (Bl & 3) !== 0 && ai(), Qa(t), n = t.pendingLanes, (e & 4194090) !== 0 && (n & 42) !== 0 ? t === us ? Gn++ : (Gn = 0, us = t) : Gn = 0, Ln(0);
    }
  }
  function ld(t, a) {
    (t.pooledCacheLanes &= a) === 0 && (a = t.pooledCache, a != null && (t.pooledCache = null, xn(a)));
  }
  function ai(t) {
    return td(), ad(), ed(), nd();
  }
  function nd() {
    if ($t !== 5) return !1;
    var t = _e, a = ls;
    ls = 0;
    var e = He(Bl), l = A.T, n = C.p;
    try {
      C.p = 32 > e ? 32 : e, A.T = null, e = ns, ns = null;
      var u = _e, i = Bl;
      if ($t = 0, wl = _e = null, Bl = 0, (xt & 6) !== 0) throw Error(r(331));
      var s = xt;
      if (xt |= 4, Lo(u.current), Bo(
        u,
        u.current,
        i,
        e
      ), xt = s, Ln(0, !1), Rt && typeof Rt.onPostCommitFiberRoot == "function")
        try {
          Rt.onPostCommitFiberRoot(ka, u);
        } catch {
        }
      return !0;
    } finally {
      C.p = n, A.T = l, ld(t, a);
    }
  }
  function ud(t, a, e) {
    a = Ea(e, a), a = wc(t.stateNode, a, 2), t = me(t, a, 2), t !== null && (T(t, 2), Qa(t));
  }
  function At(t, a, e) {
    if (t.tag === 3)
      ud(t, t, e);
    else
      for (; a !== null; ) {
        if (a.tag === 3) {
          ud(
            a,
            t,
            e
          );
          break;
        } else if (a.tag === 1) {
          var l = a.stateNode;
          if (typeof a.type.getDerivedStateFromError == "function" || typeof l.componentDidCatch == "function" && (je === null || !je.has(l))) {
            t = Ea(e, t), e = so(2), l = me(a, e, 2), l !== null && (fo(
              e,
              l,
              a,
              t
            ), T(l, 2), Qa(l));
            break;
          }
        }
        a = a.return;
      }
  }
  function fs(t, a, e) {
    var l = t.pingCache;
    if (l === null) {
      l = t.pingCache = new wv();
      var n = /* @__PURE__ */ new Set();
      l.set(a, n);
    } else
      n = l.get(a), n === void 0 && (n = /* @__PURE__ */ new Set(), l.set(a, n));
    n.has(e) || (Ic = !0, n.add(e), t = Xv.bind(null, t, a, e), a.then(t, t));
  }
  function Xv(t, a, e) {
    var l = t.pingCache;
    l !== null && l.delete(a), t.pingedLanes |= t.suspendedLanes & e, t.warmLanes &= ~e, Nt === t && (vt & e) === e && (qt === 4 || qt === 3 && (vt & 62914560) === vt && 300 > xa() - es ? (xt & 2) === 0 && Yl(t, 0) : ts |= e, Cl === vt && (Cl = 0)), Qa(t);
  }
  function id(t, a) {
    a === 0 && (a = ln()), t = Sl(t, a), t !== null && (T(t, a), Qa(t));
  }
  function Qv(t) {
    var a = t.memoizedState, e = 0;
    a !== null && (e = a.retryLane), id(t, e);
  }
  function Zv(t, a) {
    var e = 0;
    switch (t.tag) {
      case 13:
        var l = t.stateNode, n = t.memoizedState;
        n !== null && (e = n.retryLane);
        break;
      case 19:
        l = t.stateNode;
        break;
      case 22:
        l = t.stateNode._retryCache;
        break;
      default:
        throw Error(r(314));
    }
    l !== null && l.delete(a), id(t, e);
  }
  function kv(t, a) {
    return Fl(t, a);
  }
  var ei = null, Ll = null, rs = !1, li = !1, os = !1, Ie = 0;
  function Qa(t) {
    t !== Ll && t.next === null && (Ll === null ? ei = Ll = t : Ll = Ll.next = t), li = !0, rs || (rs = !0, Kv());
  }
  function Ln(t, a) {
    if (!os && li) {
      os = !0;
      do
        for (var e = !1, l = ei; l !== null; ) {
          if (t !== 0) {
            var n = l.pendingLanes;
            if (n === 0) var u = 0;
            else {
              var i = l.suspendedLanes, s = l.pingedLanes;
              u = (1 << 31 - Ft(42 | t) + 1) - 1, u &= n & ~(i & ~s), u = u & 201326741 ? u & 201326741 | 1 : u ? u | 2 : 0;
            }
            u !== 0 && (e = !0, rd(l, u));
          } else
            u = vt, u = ul(
              l,
              l === Nt ? u : 0,
              l.cancelPendingCommit !== null || l.timeoutHandle !== -1
            ), (u & 3) === 0 || fe(l, u) || (e = !0, rd(l, u));
          l = l.next;
        }
      while (e);
      os = !1;
    }
  }
  function Vv() {
    cd();
  }
  function cd() {
    li = rs = !1;
    var t = 0;
    Ie !== 0 && (am() && (t = Ie), Ie = 0);
    for (var a = xa(), e = null, l = ei; l !== null; ) {
      var n = l.next, u = sd(l, a);
      u === 0 ? (l.next = null, e === null ? ei = n : e.next = n, n === null && (Ll = e)) : (e = l, (t !== 0 || (u & 3) !== 0) && (li = !0)), l = n;
    }
    Ln(t);
  }
  function sd(t, a) {
    for (var e = t.suspendedLanes, l = t.pingedLanes, n = t.expirationTimes, u = t.pendingLanes & -62914561; 0 < u; ) {
      var i = 31 - Ft(u), s = 1 << i, d = n[i];
      d === -1 ? ((s & e) === 0 || (s & l) !== 0) && (n[i] = fu(s, a)) : d <= a && (t.expiredLanes |= s), u &= ~s;
    }
    if (a = Nt, e = vt, e = ul(
      t,
      t === a ? e : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), l = t.callbackNode, e === 0 || t === a && (St === 2 || St === 9) || t.cancelPendingCommit !== null)
      return l !== null && l !== null && Pl(l), t.callbackNode = null, t.callbackPriority = 0;
    if ((e & 3) === 0 || fe(t, e)) {
      if (a = e & -e, a === t.callbackPriority) return a;
      switch (l !== null && Pl(l), He(e)) {
        case 2:
        case 8:
          e = uu;
          break;
        case 32:
          e = el;
          break;
        case 268435456:
          e = ll;
          break;
        default:
          e = el;
      }
      return l = fd.bind(null, t), e = Fl(e, l), t.callbackPriority = a, t.callbackNode = e, a;
    }
    return l !== null && l !== null && Pl(l), t.callbackPriority = 2, t.callbackNode = null, 2;
  }
  function fd(t, a) {
    if ($t !== 0 && $t !== 5)
      return t.callbackNode = null, t.callbackPriority = 0, null;
    var e = t.callbackNode;
    if (ai() && t.callbackNode !== e)
      return null;
    var l = vt;
    return l = ul(
      t,
      t === Nt ? l : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), l === 0 ? null : (ko(t, l, a), sd(t, xa()), t.callbackNode != null && t.callbackNode === e ? fd.bind(null, t) : null);
  }
  function rd(t, a) {
    if (ai()) return null;
    ko(t, a, !0);
  }
  function Kv() {
    lm(function() {
      (xt & 6) !== 0 ? Fl(
        Il,
        Vv
      ) : cd();
    });
  }
  function ds() {
    return Ie === 0 && (Ie = en()), Ie;
  }
  function od(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : vu("" + t);
  }
  function dd(t, a) {
    var e = a.ownerDocument.createElement("input");
    return e.name = a.name, e.value = a.value, t.id && e.setAttribute("form", t.id), a.parentNode.insertBefore(e, a), t = new FormData(t), e.parentNode.removeChild(e), t;
  }
  function Jv(t, a, e, l, n) {
    if (a === "submit" && e && e.stateNode === n) {
      var u = od(
        (n[na] || null).action
      ), i = l.submitter;
      i && (a = (a = i[na] || null) ? od(a.formAction) : i.getAttribute("formAction"), a !== null && (u = a, i = null));
      var s = new yu(
        "action",
        "action",
        null,
        l,
        n
      );
      t.push({
        event: s,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (l.defaultPrevented) {
                if (Ie !== 0) {
                  var d = i ? dd(n, i) : new FormData(n);
                  Rc(
                    e,
                    {
                      pending: !0,
                      data: d,
                      method: n.method,
                      action: u
                    },
                    null,
                    d
                  );
                }
              } else
                typeof u == "function" && (s.preventDefault(), d = i ? dd(n, i) : new FormData(n), Rc(
                  e,
                  {
                    pending: !0,
                    data: d,
                    method: n.method,
                    action: u
                  },
                  u,
                  d
                ));
            },
            currentTarget: n
          }
        ]
      });
    }
  }
  for (var hs = 0; hs < Fi.length; hs++) {
    var vs = Fi[hs], $v = vs.toLowerCase(), Wv = vs[0].toUpperCase() + vs.slice(1);
    Ua(
      $v,
      "on" + Wv
    );
  }
  Ua(Zf, "onAnimationEnd"), Ua(kf, "onAnimationIteration"), Ua(Vf, "onAnimationStart"), Ua("dblclick", "onDoubleClick"), Ua("focusin", "onFocus"), Ua("focusout", "onBlur"), Ua(hv, "onTransitionRun"), Ua(vv, "onTransitionStart"), Ua(mv, "onTransitionCancel"), Ua(Kf, "onTransitionEnd"), ol("onMouseEnter", ["mouseout", "mouseover"]), ol("onMouseLeave", ["mouseout", "mouseover"]), ol("onPointerEnter", ["pointerout", "pointerover"]), ol("onPointerLeave", ["pointerout", "pointerover"]), we(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), we(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), we("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), we(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), we(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), we(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var Xn = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), Fv = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Xn)
  );
  function hd(t, a) {
    a = (a & 4) !== 0;
    for (var e = 0; e < t.length; e++) {
      var l = t[e], n = l.event;
      l = l.listeners;
      t: {
        var u = void 0;
        if (a)
          for (var i = l.length - 1; 0 <= i; i--) {
            var s = l[i], d = s.instance, y = s.currentTarget;
            if (s = s.listener, d !== u && n.isPropagationStopped())
              break t;
            u = s, n.currentTarget = y;
            try {
              u(n);
            } catch (N) {
              Zu(N);
            }
            n.currentTarget = null, u = d;
          }
        else
          for (i = 0; i < l.length; i++) {
            if (s = l[i], d = s.instance, y = s.currentTarget, s = s.listener, d !== u && n.isPropagationStopped())
              break t;
            u = s, n.currentTarget = y;
            try {
              u(n);
            } catch (N) {
              Zu(N);
            }
            n.currentTarget = null, u = d;
          }
      }
    }
  }
  function ht(t, a) {
    var e = a[Ni];
    e === void 0 && (e = a[Ni] = /* @__PURE__ */ new Set());
    var l = t + "__bubble";
    e.has(l) || (vd(a, t, 2, !1), e.add(l));
  }
  function ms(t, a, e) {
    var l = 0;
    a && (l |= 4), vd(
      e,
      t,
      l,
      a
    );
  }
  var ni = "_reactListening" + Math.random().toString(36).slice(2);
  function gs(t) {
    if (!t[ni]) {
      t[ni] = !0, uf.forEach(function(e) {
        e !== "selectionchange" && (Fv.has(e) || ms(e, !1, t), ms(e, !0, t));
      });
      var a = t.nodeType === 9 ? t : t.ownerDocument;
      a === null || a[ni] || (a[ni] = !0, ms("selectionchange", !1, a));
    }
  }
  function vd(t, a, e, l) {
    switch (Bd(a)) {
      case 2:
        var n = jm;
        break;
      case 8:
        n = _m;
        break;
      default:
        n = Ms;
    }
    e = n.bind(
      null,
      a,
      e,
      t
    ), n = void 0, !Bi || a !== "touchstart" && a !== "touchmove" && a !== "wheel" || (n = !0), l ? n !== void 0 ? t.addEventListener(a, e, {
      capture: !0,
      passive: n
    }) : t.addEventListener(a, e, !0) : n !== void 0 ? t.addEventListener(a, e, {
      passive: n
    }) : t.addEventListener(a, e, !1);
  }
  function ps(t, a, e, l, n) {
    var u = l;
    if ((a & 1) === 0 && (a & 2) === 0 && l !== null)
      t: for (; ; ) {
        if (l === null) return;
        var i = l.tag;
        if (i === 3 || i === 4) {
          var s = l.stateNode.containerInfo;
          if (s === n) break;
          if (i === 4)
            for (i = l.return; i !== null; ) {
              var d = i.tag;
              if ((d === 3 || d === 4) && i.stateNode.containerInfo === n)
                return;
              i = i.return;
            }
          for (; s !== null; ) {
            if (i = sl(s), i === null) return;
            if (d = i.tag, d === 5 || d === 6 || d === 26 || d === 27) {
              l = u = i;
              continue t;
            }
            s = s.parentNode;
          }
        }
        l = l.return;
      }
    xf(function() {
      var y = u, N = Ci(e), O = [];
      t: {
        var b = Jf.get(t);
        if (b !== void 0) {
          var x = yu, nt = t;
          switch (t) {
            case "keypress":
              if (gu(e) === 0) break t;
            case "keydown":
            case "keyup":
              x = kh;
              break;
            case "focusin":
              nt = "focus", x = Xi;
              break;
            case "focusout":
              nt = "blur", x = Xi;
              break;
            case "beforeblur":
            case "afterblur":
              x = Xi;
              break;
            case "click":
              if (e.button === 2) break t;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              x = Ef;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              x = Uh;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              x = Jh;
              break;
            case Zf:
            case kf:
            case Vf:
              x = Ch;
              break;
            case Kf:
              x = Wh;
              break;
            case "scroll":
            case "scrollend":
              x = Dh;
              break;
            case "wheel":
              x = Ph;
              break;
            case "copy":
            case "cut":
            case "paste":
              x = Bh;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              x = _f;
              break;
            case "toggle":
            case "beforetoggle":
              x = tv;
          }
          var I = (a & 4) !== 0, _t = !I && (t === "scroll" || t === "scrollend"), g = I ? b !== null ? b + "Capture" : null : b;
          I = [];
          for (var v = y, p; v !== null; ) {
            var z = v;
            if (p = z.stateNode, z = z.tag, z !== 5 && z !== 26 && z !== 27 || p === null || g === null || (z = cn(v, g), z != null && I.push(
              Qn(v, z, p)
            )), _t) break;
            v = v.return;
          }
          0 < I.length && (b = new x(
            b,
            nt,
            null,
            e,
            N
          ), O.push({ event: b, listeners: I }));
        }
      }
      if ((a & 7) === 0) {
        t: {
          if (b = t === "mouseover" || t === "pointerover", x = t === "mouseout" || t === "pointerout", b && e !== Hi && (nt = e.relatedTarget || e.fromElement) && (sl(nt) || nt[cl]))
            break t;
          if ((x || b) && (b = N.window === N ? N : (b = N.ownerDocument) ? b.defaultView || b.parentWindow : window, x ? (nt = e.relatedTarget || e.toElement, x = y, nt = nt ? sl(nt) : null, nt !== null && (_t = _(nt), I = nt.tag, nt !== _t || I !== 5 && I !== 27 && I !== 6) && (nt = null)) : (x = null, nt = y), x !== nt)) {
            if (I = Ef, z = "onMouseLeave", g = "onMouseEnter", v = "mouse", (t === "pointerout" || t === "pointerover") && (I = _f, z = "onPointerLeave", g = "onPointerEnter", v = "pointer"), _t = x == null ? b : un(x), p = nt == null ? b : un(nt), b = new I(
              z,
              v + "leave",
              x,
              e,
              N
            ), b.target = _t, b.relatedTarget = p, z = null, sl(N) === y && (I = new I(
              g,
              v + "enter",
              nt,
              e,
              N
            ), I.target = p, I.relatedTarget = _t, z = I), _t = z, x && nt)
              a: {
                for (I = x, g = nt, v = 0, p = I; p; p = Xl(p))
                  v++;
                for (p = 0, z = g; z; z = Xl(z))
                  p++;
                for (; 0 < v - p; )
                  I = Xl(I), v--;
                for (; 0 < p - v; )
                  g = Xl(g), p--;
                for (; v--; ) {
                  if (I === g || g !== null && I === g.alternate)
                    break a;
                  I = Xl(I), g = Xl(g);
                }
                I = null;
              }
            else I = null;
            x !== null && md(
              O,
              b,
              x,
              I,
              !1
            ), nt !== null && _t !== null && md(
              O,
              _t,
              nt,
              I,
              !0
            );
          }
        }
        t: {
          if (b = y ? un(y) : window, x = b.nodeName && b.nodeName.toLowerCase(), x === "select" || x === "input" && b.type === "file")
            var Q = Uf;
          else if (Df(b))
            if (qf)
              Q = rv;
            else {
              Q = sv;
              var rt = cv;
            }
          else
            x = b.nodeName, !x || x.toLowerCase() !== "input" || b.type !== "checkbox" && b.type !== "radio" ? y && qi(y.elementType) && (Q = Uf) : Q = fv;
          if (Q && (Q = Q(t, y))) {
            Rf(
              O,
              Q,
              e,
              N
            );
            break t;
          }
          rt && rt(t, b, y), t === "focusout" && y && b.type === "number" && y.memoizedProps.value != null && Ui(b, "number", b.value);
        }
        switch (rt = y ? un(y) : window, t) {
          case "focusin":
            (Df(rt) || rt.contentEditable === "true") && (yl = rt, Ji = y, mn = null);
            break;
          case "focusout":
            mn = Ji = yl = null;
            break;
          case "mousedown":
            $i = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            $i = !1, Xf(O, e, N);
            break;
          case "selectionchange":
            if (dv) break;
          case "keydown":
          case "keyup":
            Xf(O, e, N);
        }
        var $;
        if (Zi)
          t: {
            switch (t) {
              case "compositionstart":
                var tt = "onCompositionStart";
                break t;
              case "compositionend":
                tt = "onCompositionEnd";
                break t;
              case "compositionupdate":
                tt = "onCompositionUpdate";
                break t;
            }
            tt = void 0;
          }
        else
          pl ? Of(t, e) && (tt = "onCompositionEnd") : t === "keydown" && e.keyCode === 229 && (tt = "onCompositionStart");
        tt && (Af && e.locale !== "ko" && (pl || tt !== "onCompositionStart" ? tt === "onCompositionEnd" && pl && ($ = Sf()) : (oe = N, Yi = "value" in oe ? oe.value : oe.textContent, pl = !0)), rt = ui(y, tt), 0 < rt.length && (tt = new jf(
          tt,
          t,
          null,
          e,
          N
        ), O.push({ event: tt, listeners: rt }), $ ? tt.data = $ : ($ = Mf(e), $ !== null && (tt.data = $)))), ($ = ev ? lv(t, e) : nv(t, e)) && (tt = ui(y, "onBeforeInput"), 0 < tt.length && (rt = new jf(
          "onBeforeInput",
          "beforeinput",
          null,
          e,
          N
        ), O.push({
          event: rt,
          listeners: tt
        }), rt.data = $)), Jv(
          O,
          t,
          y,
          e,
          N
        );
      }
      hd(O, a);
    });
  }
  function Qn(t, a, e) {
    return {
      instance: t,
      listener: a,
      currentTarget: e
    };
  }
  function ui(t, a) {
    for (var e = a + "Capture", l = []; t !== null; ) {
      var n = t, u = n.stateNode;
      if (n = n.tag, n !== 5 && n !== 26 && n !== 27 || u === null || (n = cn(t, e), n != null && l.unshift(
        Qn(t, n, u)
      ), n = cn(t, a), n != null && l.push(
        Qn(t, n, u)
      )), t.tag === 3) return l;
      t = t.return;
    }
    return [];
  }
  function Xl(t) {
    if (t === null) return null;
    do
      t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function md(t, a, e, l, n) {
    for (var u = a._reactName, i = []; e !== null && e !== l; ) {
      var s = e, d = s.alternate, y = s.stateNode;
      if (s = s.tag, d !== null && d === l) break;
      s !== 5 && s !== 26 && s !== 27 || y === null || (d = y, n ? (y = cn(e, u), y != null && i.unshift(
        Qn(e, y, d)
      )) : n || (y = cn(e, u), y != null && i.push(
        Qn(e, y, d)
      ))), e = e.return;
    }
    i.length !== 0 && t.push({ event: a, listeners: i });
  }
  var Pv = /\r\n?/g, Iv = /\u0000|\uFFFD/g;
  function gd(t) {
    return (typeof t == "string" ? t : "" + t).replace(Pv, `
`).replace(Iv, "");
  }
  function pd(t, a) {
    return a = gd(a), gd(t) === a;
  }
  function ii() {
  }
  function jt(t, a, e, l, n, u) {
    switch (e) {
      case "children":
        typeof l == "string" ? a === "body" || a === "textarea" && l === "" || vl(t, l) : (typeof l == "number" || typeof l == "bigint") && a !== "body" && vl(t, "" + l);
        break;
      case "className":
        ou(t, "class", l);
        break;
      case "tabIndex":
        ou(t, "tabindex", l);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        ou(t, e, l);
        break;
      case "style":
        yf(t, l, u);
        break;
      case "data":
        if (a !== "object") {
          ou(t, "data", l);
          break;
        }
      case "src":
      case "href":
        if (l === "" && (a !== "a" || e !== "href")) {
          t.removeAttribute(e);
          break;
        }
        if (l == null || typeof l == "function" || typeof l == "symbol" || typeof l == "boolean") {
          t.removeAttribute(e);
          break;
        }
        l = vu("" + l), t.setAttribute(e, l);
        break;
      case "action":
      case "formAction":
        if (typeof l == "function") {
          t.setAttribute(
            e,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof u == "function" && (e === "formAction" ? (a !== "input" && jt(t, a, "name", n.name, n, null), jt(
            t,
            a,
            "formEncType",
            n.formEncType,
            n,
            null
          ), jt(
            t,
            a,
            "formMethod",
            n.formMethod,
            n,
            null
          ), jt(
            t,
            a,
            "formTarget",
            n.formTarget,
            n,
            null
          )) : (jt(t, a, "encType", n.encType, n, null), jt(t, a, "method", n.method, n, null), jt(t, a, "target", n.target, n, null)));
        if (l == null || typeof l == "symbol" || typeof l == "boolean") {
          t.removeAttribute(e);
          break;
        }
        l = vu("" + l), t.setAttribute(e, l);
        break;
      case "onClick":
        l != null && (t.onclick = ii);
        break;
      case "onScroll":
        l != null && ht("scroll", t);
        break;
      case "onScrollEnd":
        l != null && ht("scrollend", t);
        break;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l))
            throw Error(r(61));
          if (e = l.__html, e != null) {
            if (n.children != null) throw Error(r(60));
            t.innerHTML = e;
          }
        }
        break;
      case "multiple":
        t.multiple = l && typeof l != "function" && typeof l != "symbol";
        break;
      case "muted":
        t.muted = l && typeof l != "function" && typeof l != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (l == null || typeof l == "function" || typeof l == "boolean" || typeof l == "symbol") {
          t.removeAttribute("xlink:href");
          break;
        }
        e = vu("" + l), t.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          e
        );
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        l != null && typeof l != "function" && typeof l != "symbol" ? t.setAttribute(e, "" + l) : t.removeAttribute(e);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        l && typeof l != "function" && typeof l != "symbol" ? t.setAttribute(e, "") : t.removeAttribute(e);
        break;
      case "capture":
      case "download":
        l === !0 ? t.setAttribute(e, "") : l !== !1 && l != null && typeof l != "function" && typeof l != "symbol" ? t.setAttribute(e, l) : t.removeAttribute(e);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        l != null && typeof l != "function" && typeof l != "symbol" && !isNaN(l) && 1 <= l ? t.setAttribute(e, l) : t.removeAttribute(e);
        break;
      case "rowSpan":
      case "start":
        l == null || typeof l == "function" || typeof l == "symbol" || isNaN(l) ? t.removeAttribute(e) : t.setAttribute(e, l);
        break;
      case "popover":
        ht("beforetoggle", t), ht("toggle", t), ru(t, "popover", l);
        break;
      case "xlinkActuate":
        Ka(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          l
        );
        break;
      case "xlinkArcrole":
        Ka(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          l
        );
        break;
      case "xlinkRole":
        Ka(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          l
        );
        break;
      case "xlinkShow":
        Ka(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          l
        );
        break;
      case "xlinkTitle":
        Ka(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          l
        );
        break;
      case "xlinkType":
        Ka(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          l
        );
        break;
      case "xmlBase":
        Ka(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          l
        );
        break;
      case "xmlLang":
        Ka(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          l
        );
        break;
      case "xmlSpace":
        Ka(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          l
        );
        break;
      case "is":
        ru(t, "is", l);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < e.length) || e[0] !== "o" && e[0] !== "O" || e[1] !== "n" && e[1] !== "N") && (e = Oh.get(e) || e, ru(t, e, l));
    }
  }
  function ys(t, a, e, l, n, u) {
    switch (e) {
      case "style":
        yf(t, l, u);
        break;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l))
            throw Error(r(61));
          if (e = l.__html, e != null) {
            if (n.children != null) throw Error(r(60));
            t.innerHTML = e;
          }
        }
        break;
      case "children":
        typeof l == "string" ? vl(t, l) : (typeof l == "number" || typeof l == "bigint") && vl(t, "" + l);
        break;
      case "onScroll":
        l != null && ht("scroll", t);
        break;
      case "onScrollEnd":
        l != null && ht("scrollend", t);
        break;
      case "onClick":
        l != null && (t.onclick = ii);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!cf.hasOwnProperty(e))
          t: {
            if (e[0] === "o" && e[1] === "n" && (n = e.endsWith("Capture"), a = e.slice(2, n ? e.length - 7 : void 0), u = t[na] || null, u = u != null ? u[e] : null, typeof u == "function" && t.removeEventListener(a, u, n), typeof l == "function")) {
              typeof u != "function" && u !== null && (e in t ? t[e] = null : t.hasAttribute(e) && t.removeAttribute(e)), t.addEventListener(a, l, n);
              break t;
            }
            e in t ? t[e] = l : l === !0 ? t.setAttribute(e, "") : ru(t, e, l);
          }
    }
  }
  function Wt(t, a, e) {
    switch (a) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        ht("error", t), ht("load", t);
        var l = !1, n = !1, u;
        for (u in e)
          if (e.hasOwnProperty(u)) {
            var i = e[u];
            if (i != null)
              switch (u) {
                case "src":
                  l = !0;
                  break;
                case "srcSet":
                  n = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(r(137, a));
                default:
                  jt(t, a, u, i, e, null);
              }
          }
        n && jt(t, a, "srcSet", e.srcSet, e, null), l && jt(t, a, "src", e.src, e, null);
        return;
      case "input":
        ht("invalid", t);
        var s = u = i = n = null, d = null, y = null;
        for (l in e)
          if (e.hasOwnProperty(l)) {
            var N = e[l];
            if (N != null)
              switch (l) {
                case "name":
                  n = N;
                  break;
                case "type":
                  i = N;
                  break;
                case "checked":
                  d = N;
                  break;
                case "defaultChecked":
                  y = N;
                  break;
                case "value":
                  u = N;
                  break;
                case "defaultValue":
                  s = N;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (N != null)
                    throw Error(r(137, a));
                  break;
                default:
                  jt(t, a, l, N, e, null);
              }
          }
        vf(
          t,
          u,
          s,
          d,
          y,
          i,
          n,
          !1
        ), du(t);
        return;
      case "select":
        ht("invalid", t), l = i = u = null;
        for (n in e)
          if (e.hasOwnProperty(n) && (s = e[n], s != null))
            switch (n) {
              case "value":
                u = s;
                break;
              case "defaultValue":
                i = s;
                break;
              case "multiple":
                l = s;
              default:
                jt(t, a, n, s, e, null);
            }
        a = u, e = i, t.multiple = !!l, a != null ? hl(t, !!l, a, !1) : e != null && hl(t, !!l, e, !0);
        return;
      case "textarea":
        ht("invalid", t), u = n = l = null;
        for (i in e)
          if (e.hasOwnProperty(i) && (s = e[i], s != null))
            switch (i) {
              case "value":
                l = s;
                break;
              case "defaultValue":
                n = s;
                break;
              case "children":
                u = s;
                break;
              case "dangerouslySetInnerHTML":
                if (s != null) throw Error(r(91));
                break;
              default:
                jt(t, a, i, s, e, null);
            }
        gf(t, l, n, u), du(t);
        return;
      case "option":
        for (d in e)
          if (e.hasOwnProperty(d) && (l = e[d], l != null))
            switch (d) {
              case "selected":
                t.selected = l && typeof l != "function" && typeof l != "symbol";
                break;
              default:
                jt(t, a, d, l, e, null);
            }
        return;
      case "dialog":
        ht("beforetoggle", t), ht("toggle", t), ht("cancel", t), ht("close", t);
        break;
      case "iframe":
      case "object":
        ht("load", t);
        break;
      case "video":
      case "audio":
        for (l = 0; l < Xn.length; l++)
          ht(Xn[l], t);
        break;
      case "image":
        ht("error", t), ht("load", t);
        break;
      case "details":
        ht("toggle", t);
        break;
      case "embed":
      case "source":
      case "link":
        ht("error", t), ht("load", t);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (y in e)
          if (e.hasOwnProperty(y) && (l = e[y], l != null))
            switch (y) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(r(137, a));
              default:
                jt(t, a, y, l, e, null);
            }
        return;
      default:
        if (qi(a)) {
          for (N in e)
            e.hasOwnProperty(N) && (l = e[N], l !== void 0 && ys(
              t,
              a,
              N,
              l,
              e,
              void 0
            ));
          return;
        }
    }
    for (s in e)
      e.hasOwnProperty(s) && (l = e[s], l != null && jt(t, a, s, l, e, null));
  }
  function tm(t, a, e, l) {
    switch (a) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var n = null, u = null, i = null, s = null, d = null, y = null, N = null;
        for (x in e) {
          var O = e[x];
          if (e.hasOwnProperty(x) && O != null)
            switch (x) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                d = O;
              default:
                l.hasOwnProperty(x) || jt(t, a, x, null, l, O);
            }
        }
        for (var b in l) {
          var x = l[b];
          if (O = e[b], l.hasOwnProperty(b) && (x != null || O != null))
            switch (b) {
              case "type":
                u = x;
                break;
              case "name":
                n = x;
                break;
              case "checked":
                y = x;
                break;
              case "defaultChecked":
                N = x;
                break;
              case "value":
                i = x;
                break;
              case "defaultValue":
                s = x;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (x != null)
                  throw Error(r(137, a));
                break;
              default:
                x !== O && jt(
                  t,
                  a,
                  b,
                  x,
                  l,
                  O
                );
            }
        }
        Ri(
          t,
          i,
          s,
          d,
          y,
          N,
          u,
          n
        );
        return;
      case "select":
        x = i = s = b = null;
        for (u in e)
          if (d = e[u], e.hasOwnProperty(u) && d != null)
            switch (u) {
              case "value":
                break;
              case "multiple":
                x = d;
              default:
                l.hasOwnProperty(u) || jt(
                  t,
                  a,
                  u,
                  null,
                  l,
                  d
                );
            }
        for (n in l)
          if (u = l[n], d = e[n], l.hasOwnProperty(n) && (u != null || d != null))
            switch (n) {
              case "value":
                b = u;
                break;
              case "defaultValue":
                s = u;
                break;
              case "multiple":
                i = u;
              default:
                u !== d && jt(
                  t,
                  a,
                  n,
                  u,
                  l,
                  d
                );
            }
        a = s, e = i, l = x, b != null ? hl(t, !!e, b, !1) : !!l != !!e && (a != null ? hl(t, !!e, a, !0) : hl(t, !!e, e ? [] : "", !1));
        return;
      case "textarea":
        x = b = null;
        for (s in e)
          if (n = e[s], e.hasOwnProperty(s) && n != null && !l.hasOwnProperty(s))
            switch (s) {
              case "value":
                break;
              case "children":
                break;
              default:
                jt(t, a, s, null, l, n);
            }
        for (i in l)
          if (n = l[i], u = e[i], l.hasOwnProperty(i) && (n != null || u != null))
            switch (i) {
              case "value":
                b = n;
                break;
              case "defaultValue":
                x = n;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (n != null) throw Error(r(91));
                break;
              default:
                n !== u && jt(t, a, i, n, l, u);
            }
        mf(t, b, x);
        return;
      case "option":
        for (var nt in e)
          if (b = e[nt], e.hasOwnProperty(nt) && b != null && !l.hasOwnProperty(nt))
            switch (nt) {
              case "selected":
                t.selected = !1;
                break;
              default:
                jt(
                  t,
                  a,
                  nt,
                  null,
                  l,
                  b
                );
            }
        for (d in l)
          if (b = l[d], x = e[d], l.hasOwnProperty(d) && b !== x && (b != null || x != null))
            switch (d) {
              case "selected":
                t.selected = b && typeof b != "function" && typeof b != "symbol";
                break;
              default:
                jt(
                  t,
                  a,
                  d,
                  b,
                  l,
                  x
                );
            }
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var I in e)
          b = e[I], e.hasOwnProperty(I) && b != null && !l.hasOwnProperty(I) && jt(t, a, I, null, l, b);
        for (y in l)
          if (b = l[y], x = e[y], l.hasOwnProperty(y) && b !== x && (b != null || x != null))
            switch (y) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (b != null)
                  throw Error(r(137, a));
                break;
              default:
                jt(
                  t,
                  a,
                  y,
                  b,
                  l,
                  x
                );
            }
        return;
      default:
        if (qi(a)) {
          for (var _t in e)
            b = e[_t], e.hasOwnProperty(_t) && b !== void 0 && !l.hasOwnProperty(_t) && ys(
              t,
              a,
              _t,
              void 0,
              l,
              b
            );
          for (N in l)
            b = l[N], x = e[N], !l.hasOwnProperty(N) || b === x || b === void 0 && x === void 0 || ys(
              t,
              a,
              N,
              b,
              l,
              x
            );
          return;
        }
    }
    for (var g in e)
      b = e[g], e.hasOwnProperty(g) && b != null && !l.hasOwnProperty(g) && jt(t, a, g, null, l, b);
    for (O in l)
      b = l[O], x = e[O], !l.hasOwnProperty(O) || b === x || b == null && x == null || jt(t, a, O, b, l, x);
  }
  var bs = null, xs = null;
  function ci(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function yd(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function bd(t, a) {
    if (t === 0)
      switch (a) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return t === 1 && a === "foreignObject" ? 0 : t;
  }
  function Ss(t, a) {
    return t === "textarea" || t === "noscript" || typeof a.children == "string" || typeof a.children == "number" || typeof a.children == "bigint" || typeof a.dangerouslySetInnerHTML == "object" && a.dangerouslySetInnerHTML !== null && a.dangerouslySetInnerHTML.__html != null;
  }
  var Ts = null;
  function am() {
    var t = window.event;
    return t && t.type === "popstate" ? t === Ts ? !1 : (Ts = t, !0) : (Ts = null, !1);
  }
  var xd = typeof setTimeout == "function" ? setTimeout : void 0, em = typeof clearTimeout == "function" ? clearTimeout : void 0, Sd = typeof Promise == "function" ? Promise : void 0, lm = typeof queueMicrotask == "function" ? queueMicrotask : typeof Sd < "u" ? function(t) {
    return Sd.resolve(null).then(t).catch(nm);
  } : xd;
  function nm(t) {
    setTimeout(function() {
      throw t;
    });
  }
  function Ne(t) {
    return t === "head";
  }
  function Td(t, a) {
    var e = a, l = 0, n = 0;
    do {
      var u = e.nextSibling;
      if (t.removeChild(e), u && u.nodeType === 8)
        if (e = u.data, e === "/$") {
          if (0 < l && 8 > l) {
            e = l;
            var i = t.ownerDocument;
            if (e & 1 && Zn(i.documentElement), e & 2 && Zn(i.body), e & 4)
              for (e = i.head, Zn(e), i = e.firstChild; i; ) {
                var s = i.nextSibling, d = i.nodeName;
                i[nn] || d === "SCRIPT" || d === "STYLE" || d === "LINK" && i.rel.toLowerCase() === "stylesheet" || e.removeChild(i), i = s;
              }
          }
          if (n === 0) {
            t.removeChild(u), Pn(a);
            return;
          }
          n--;
        } else
          e === "$" || e === "$?" || e === "$!" ? n++ : l = e.charCodeAt(0) - 48;
      else l = 0;
      e = u;
    } while (e);
    Pn(a);
  }
  function Es(t) {
    var a = t.firstChild;
    for (a && a.nodeType === 10 && (a = a.nextSibling); a; ) {
      var e = a;
      switch (a = a.nextSibling, e.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Es(e), zi(e);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (e.rel.toLowerCase() === "stylesheet") continue;
      }
      t.removeChild(e);
    }
  }
  function um(t, a, e, l) {
    for (; t.nodeType === 1; ) {
      var n = e;
      if (t.nodeName.toLowerCase() !== a.toLowerCase()) {
        if (!l && (t.nodeName !== "INPUT" || t.type !== "hidden"))
          break;
      } else if (l) {
        if (!t[nn])
          switch (a) {
            case "meta":
              if (!t.hasAttribute("itemprop")) break;
              return t;
            case "link":
              if (u = t.getAttribute("rel"), u === "stylesheet" && t.hasAttribute("data-precedence"))
                break;
              if (u !== n.rel || t.getAttribute("href") !== (n.href == null || n.href === "" ? null : n.href) || t.getAttribute("crossorigin") !== (n.crossOrigin == null ? null : n.crossOrigin) || t.getAttribute("title") !== (n.title == null ? null : n.title))
                break;
              return t;
            case "style":
              if (t.hasAttribute("data-precedence")) break;
              return t;
            case "script":
              if (u = t.getAttribute("src"), (u !== (n.src == null ? null : n.src) || t.getAttribute("type") !== (n.type == null ? null : n.type) || t.getAttribute("crossorigin") !== (n.crossOrigin == null ? null : n.crossOrigin)) && u && t.hasAttribute("async") && !t.hasAttribute("itemprop"))
                break;
              return t;
            default:
              return t;
          }
      } else if (a === "input" && t.type === "hidden") {
        var u = n.name == null ? null : "" + n.name;
        if (n.type === "hidden" && t.getAttribute("name") === u)
          return t;
      } else return t;
      if (t = Ha(t.nextSibling), t === null) break;
    }
    return null;
  }
  function im(t, a, e) {
    if (a === "") return null;
    for (; t.nodeType !== 3; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !e || (t = Ha(t.nextSibling), t === null)) return null;
    return t;
  }
  function js(t) {
    return t.data === "$!" || t.data === "$?" && t.ownerDocument.readyState === "complete";
  }
  function cm(t, a) {
    var e = t.ownerDocument;
    if (t.data !== "$?" || e.readyState === "complete")
      a();
    else {
      var l = function() {
        a(), e.removeEventListener("DOMContentLoaded", l);
      };
      e.addEventListener("DOMContentLoaded", l), t._reactRetry = l;
    }
  }
  function Ha(t) {
    for (; t != null; t = t.nextSibling) {
      var a = t.nodeType;
      if (a === 1 || a === 3) break;
      if (a === 8) {
        if (a = t.data, a === "$" || a === "$!" || a === "$?" || a === "F!" || a === "F")
          break;
        if (a === "/$") return null;
      }
    }
    return t;
  }
  var _s = null;
  function Ed(t) {
    t = t.previousSibling;
    for (var a = 0; t; ) {
      if (t.nodeType === 8) {
        var e = t.data;
        if (e === "$" || e === "$!" || e === "$?") {
          if (a === 0) return t;
          a--;
        } else e === "/$" && a++;
      }
      t = t.previousSibling;
    }
    return null;
  }
  function jd(t, a, e) {
    switch (a = ci(e), t) {
      case "html":
        if (t = a.documentElement, !t) throw Error(r(452));
        return t;
      case "head":
        if (t = a.head, !t) throw Error(r(453));
        return t;
      case "body":
        if (t = a.body, !t) throw Error(r(454));
        return t;
      default:
        throw Error(r(451));
    }
  }
  function Zn(t) {
    for (var a = t.attributes; a.length; )
      t.removeAttributeNode(a[0]);
    zi(t);
  }
  var Oa = /* @__PURE__ */ new Map(), _d = /* @__PURE__ */ new Set();
  function si(t) {
    return typeof t.getRootNode == "function" ? t.getRootNode() : t.nodeType === 9 ? t : t.ownerDocument;
  }
  var ce = C.d;
  C.d = {
    f: sm,
    r: fm,
    D: rm,
    C: om,
    L: dm,
    m: hm,
    X: mm,
    S: vm,
    M: gm
  };
  function sm() {
    var t = ce.f(), a = Iu();
    return t || a;
  }
  function fm(t) {
    var a = fl(t);
    a !== null && a.tag === 5 && a.type === "form" ? Zr(a) : ce.r(t);
  }
  var Ql = typeof document > "u" ? null : document;
  function Ad(t, a, e) {
    var l = Ql;
    if (l && typeof a == "string" && a) {
      var n = Ta(a);
      n = 'link[rel="' + t + '"][href="' + n + '"]', typeof e == "string" && (n += '[crossorigin="' + e + '"]'), _d.has(n) || (_d.add(n), t = { rel: t, crossOrigin: e, href: a }, l.querySelector(n) === null && (a = l.createElement("link"), Wt(a, "link", t), Qt(a), l.head.appendChild(a)));
    }
  }
  function rm(t) {
    ce.D(t), Ad("dns-prefetch", t, null);
  }
  function om(t, a) {
    ce.C(t, a), Ad("preconnect", t, a);
  }
  function dm(t, a, e) {
    ce.L(t, a, e);
    var l = Ql;
    if (l && t && a) {
      var n = 'link[rel="preload"][as="' + Ta(a) + '"]';
      a === "image" && e && e.imageSrcSet ? (n += '[imagesrcset="' + Ta(
        e.imageSrcSet
      ) + '"]', typeof e.imageSizes == "string" && (n += '[imagesizes="' + Ta(
        e.imageSizes
      ) + '"]')) : n += '[href="' + Ta(t) + '"]';
      var u = n;
      switch (a) {
        case "style":
          u = Zl(t);
          break;
        case "script":
          u = kl(t);
      }
      Oa.has(u) || (t = D(
        {
          rel: "preload",
          href: a === "image" && e && e.imageSrcSet ? void 0 : t,
          as: a
        },
        e
      ), Oa.set(u, t), l.querySelector(n) !== null || a === "style" && l.querySelector(kn(u)) || a === "script" && l.querySelector(Vn(u)) || (a = l.createElement("link"), Wt(a, "link", t), Qt(a), l.head.appendChild(a)));
    }
  }
  function hm(t, a) {
    ce.m(t, a);
    var e = Ql;
    if (e && t) {
      var l = a && typeof a.as == "string" ? a.as : "script", n = 'link[rel="modulepreload"][as="' + Ta(l) + '"][href="' + Ta(t) + '"]', u = n;
      switch (l) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          u = kl(t);
      }
      if (!Oa.has(u) && (t = D({ rel: "modulepreload", href: t }, a), Oa.set(u, t), e.querySelector(n) === null)) {
        switch (l) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (e.querySelector(Vn(u)))
              return;
        }
        l = e.createElement("link"), Wt(l, "link", t), Qt(l), e.head.appendChild(l);
      }
    }
  }
  function vm(t, a, e) {
    ce.S(t, a, e);
    var l = Ql;
    if (l && t) {
      var n = rl(l).hoistableStyles, u = Zl(t);
      a = a || "default";
      var i = n.get(u);
      if (!i) {
        var s = { loading: 0, preload: null };
        if (i = l.querySelector(
          kn(u)
        ))
          s.loading = 5;
        else {
          t = D(
            { rel: "stylesheet", href: t, "data-precedence": a },
            e
          ), (e = Oa.get(u)) && As(t, e);
          var d = i = l.createElement("link");
          Qt(d), Wt(d, "link", t), d._p = new Promise(function(y, N) {
            d.onload = y, d.onerror = N;
          }), d.addEventListener("load", function() {
            s.loading |= 1;
          }), d.addEventListener("error", function() {
            s.loading |= 2;
          }), s.loading |= 4, fi(i, a, l);
        }
        i = {
          type: "stylesheet",
          instance: i,
          count: 1,
          state: s
        }, n.set(u, i);
      }
    }
  }
  function mm(t, a) {
    ce.X(t, a);
    var e = Ql;
    if (e && t) {
      var l = rl(e).hoistableScripts, n = kl(t), u = l.get(n);
      u || (u = e.querySelector(Vn(n)), u || (t = D({ src: t, async: !0 }, a), (a = Oa.get(n)) && Ns(t, a), u = e.createElement("script"), Qt(u), Wt(u, "link", t), e.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, l.set(n, u));
    }
  }
  function gm(t, a) {
    ce.M(t, a);
    var e = Ql;
    if (e && t) {
      var l = rl(e).hoistableScripts, n = kl(t), u = l.get(n);
      u || (u = e.querySelector(Vn(n)), u || (t = D({ src: t, async: !0, type: "module" }, a), (a = Oa.get(n)) && Ns(t, a), u = e.createElement("script"), Qt(u), Wt(u, "link", t), e.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, l.set(n, u));
    }
  }
  function Nd(t, a, e, l) {
    var n = (n = Z.current) ? si(n) : null;
    if (!n) throw Error(r(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof e.precedence == "string" && typeof e.href == "string" ? (a = Zl(e.href), e = rl(
          n
        ).hoistableStyles, l = e.get(a), l || (l = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, e.set(a, l)), l) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (e.rel === "stylesheet" && typeof e.href == "string" && typeof e.precedence == "string") {
          t = Zl(e.href);
          var u = rl(
            n
          ).hoistableStyles, i = u.get(t);
          if (i || (n = n.ownerDocument || n, i = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, u.set(t, i), (u = n.querySelector(
            kn(t)
          )) && !u._p && (i.instance = u, i.state.loading = 5), Oa.has(t) || (e = {
            rel: "preload",
            as: "style",
            href: e.href,
            crossOrigin: e.crossOrigin,
            integrity: e.integrity,
            media: e.media,
            hrefLang: e.hrefLang,
            referrerPolicy: e.referrerPolicy
          }, Oa.set(t, e), u || pm(
            n,
            t,
            e,
            i.state
          ))), a && l === null)
            throw Error(r(528, ""));
          return i;
        }
        if (a && l !== null)
          throw Error(r(529, ""));
        return null;
      case "script":
        return a = e.async, e = e.src, typeof e == "string" && a && typeof a != "function" && typeof a != "symbol" ? (a = kl(e), e = rl(
          n
        ).hoistableScripts, l = e.get(a), l || (l = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, e.set(a, l)), l) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(r(444, t));
    }
  }
  function Zl(t) {
    return 'href="' + Ta(t) + '"';
  }
  function kn(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function zd(t) {
    return D({}, t, {
      "data-precedence": t.precedence,
      precedence: null
    });
  }
  function pm(t, a, e, l) {
    t.querySelector('link[rel="preload"][as="style"][' + a + "]") ? l.loading = 1 : (a = t.createElement("link"), l.preload = a, a.addEventListener("load", function() {
      return l.loading |= 1;
    }), a.addEventListener("error", function() {
      return l.loading |= 2;
    }), Wt(a, "link", e), Qt(a), t.head.appendChild(a));
  }
  function kl(t) {
    return '[src="' + Ta(t) + '"]';
  }
  function Vn(t) {
    return "script[async]" + t;
  }
  function Od(t, a, e) {
    if (a.count++, a.instance === null)
      switch (a.type) {
        case "style":
          var l = t.querySelector(
            'style[data-href~="' + Ta(e.href) + '"]'
          );
          if (l)
            return a.instance = l, Qt(l), l;
          var n = D({}, e, {
            "data-href": e.href,
            "data-precedence": e.precedence,
            href: null,
            precedence: null
          });
          return l = (t.ownerDocument || t).createElement(
            "style"
          ), Qt(l), Wt(l, "style", n), fi(l, e.precedence, t), a.instance = l;
        case "stylesheet":
          n = Zl(e.href);
          var u = t.querySelector(
            kn(n)
          );
          if (u)
            return a.state.loading |= 4, a.instance = u, Qt(u), u;
          l = zd(e), (n = Oa.get(n)) && As(l, n), u = (t.ownerDocument || t).createElement("link"), Qt(u);
          var i = u;
          return i._p = new Promise(function(s, d) {
            i.onload = s, i.onerror = d;
          }), Wt(u, "link", l), a.state.loading |= 4, fi(u, e.precedence, t), a.instance = u;
        case "script":
          return u = kl(e.src), (n = t.querySelector(
            Vn(u)
          )) ? (a.instance = n, Qt(n), n) : (l = e, (n = Oa.get(u)) && (l = D({}, e), Ns(l, n)), t = t.ownerDocument || t, n = t.createElement("script"), Qt(n), Wt(n, "link", l), t.head.appendChild(n), a.instance = n);
        case "void":
          return null;
        default:
          throw Error(r(443, a.type));
      }
    else
      a.type === "stylesheet" && (a.state.loading & 4) === 0 && (l = a.instance, a.state.loading |= 4, fi(l, e.precedence, t));
    return a.instance;
  }
  function fi(t, a, e) {
    for (var l = e.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), n = l.length ? l[l.length - 1] : null, u = n, i = 0; i < l.length; i++) {
      var s = l[i];
      if (s.dataset.precedence === a) u = s;
      else if (u !== n) break;
    }
    u ? u.parentNode.insertBefore(t, u.nextSibling) : (a = e.nodeType === 9 ? e.head : e, a.insertBefore(t, a.firstChild));
  }
  function As(t, a) {
    t.crossOrigin == null && (t.crossOrigin = a.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = a.referrerPolicy), t.title == null && (t.title = a.title);
  }
  function Ns(t, a) {
    t.crossOrigin == null && (t.crossOrigin = a.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = a.referrerPolicy), t.integrity == null && (t.integrity = a.integrity);
  }
  var ri = null;
  function Md(t, a, e) {
    if (ri === null) {
      var l = /* @__PURE__ */ new Map(), n = ri = /* @__PURE__ */ new Map();
      n.set(e, l);
    } else
      n = ri, l = n.get(e), l || (l = /* @__PURE__ */ new Map(), n.set(e, l));
    if (l.has(t)) return l;
    for (l.set(t, null), e = e.getElementsByTagName(t), n = 0; n < e.length; n++) {
      var u = e[n];
      if (!(u[nn] || u[Pt] || t === "link" && u.getAttribute("rel") === "stylesheet") && u.namespaceURI !== "http://www.w3.org/2000/svg") {
        var i = u.getAttribute(a) || "";
        i = t + i;
        var s = l.get(i);
        s ? s.push(u) : l.set(i, [u]);
      }
    }
    return l;
  }
  function Dd(t, a, e) {
    t = t.ownerDocument || t, t.head.insertBefore(
      e,
      a === "title" ? t.querySelector("head > title") : null
    );
  }
  function ym(t, a, e) {
    if (e === 1 || a.itemProp != null) return !1;
    switch (t) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof a.precedence != "string" || typeof a.href != "string" || a.href === "")
          break;
        return !0;
      case "link":
        if (typeof a.rel != "string" || typeof a.href != "string" || a.href === "" || a.onLoad || a.onError)
          break;
        switch (a.rel) {
          case "stylesheet":
            return t = a.disabled, typeof a.precedence == "string" && t == null;
          default:
            return !0;
        }
      case "script":
        if (a.async && typeof a.async != "function" && typeof a.async != "symbol" && !a.onLoad && !a.onError && a.src && typeof a.src == "string")
          return !0;
    }
    return !1;
  }
  function Rd(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  var Kn = null;
  function bm() {
  }
  function xm(t, a, e) {
    if (Kn === null) throw Error(r(475));
    var l = Kn;
    if (a.type === "stylesheet" && (typeof e.media != "string" || matchMedia(e.media).matches !== !1) && (a.state.loading & 4) === 0) {
      if (a.instance === null) {
        var n = Zl(e.href), u = t.querySelector(
          kn(n)
        );
        if (u) {
          t = u._p, t !== null && typeof t == "object" && typeof t.then == "function" && (l.count++, l = oi.bind(l), t.then(l, l)), a.state.loading |= 4, a.instance = u, Qt(u);
          return;
        }
        u = t.ownerDocument || t, e = zd(e), (n = Oa.get(n)) && As(e, n), u = u.createElement("link"), Qt(u);
        var i = u;
        i._p = new Promise(function(s, d) {
          i.onload = s, i.onerror = d;
        }), Wt(u, "link", e), a.instance = u;
      }
      l.stylesheets === null && (l.stylesheets = /* @__PURE__ */ new Map()), l.stylesheets.set(a, t), (t = a.state.preload) && (a.state.loading & 3) === 0 && (l.count++, a = oi.bind(l), t.addEventListener("load", a), t.addEventListener("error", a));
    }
  }
  function Sm() {
    if (Kn === null) throw Error(r(475));
    var t = Kn;
    return t.stylesheets && t.count === 0 && zs(t, t.stylesheets), 0 < t.count ? function(a) {
      var e = setTimeout(function() {
        if (t.stylesheets && zs(t, t.stylesheets), t.unsuspend) {
          var l = t.unsuspend;
          t.unsuspend = null, l();
        }
      }, 6e4);
      return t.unsuspend = a, function() {
        t.unsuspend = null, clearTimeout(e);
      };
    } : null;
  }
  function oi() {
    if (this.count--, this.count === 0) {
      if (this.stylesheets) zs(this, this.stylesheets);
      else if (this.unsuspend) {
        var t = this.unsuspend;
        this.unsuspend = null, t();
      }
    }
  }
  var di = null;
  function zs(t, a) {
    t.stylesheets = null, t.unsuspend !== null && (t.count++, di = /* @__PURE__ */ new Map(), a.forEach(Tm, t), di = null, oi.call(t));
  }
  function Tm(t, a) {
    if (!(a.state.loading & 4)) {
      var e = di.get(t);
      if (e) var l = e.get(null);
      else {
        e = /* @__PURE__ */ new Map(), di.set(t, e);
        for (var n = t.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), u = 0; u < n.length; u++) {
          var i = n[u];
          (i.nodeName === "LINK" || i.getAttribute("media") !== "not all") && (e.set(i.dataset.precedence, i), l = i);
        }
        l && e.set(null, l);
      }
      n = a.instance, i = n.getAttribute("data-precedence"), u = e.get(i) || l, u === l && e.set(null, n), e.set(i, n), this.count++, l = oi.bind(this), n.addEventListener("load", l), n.addEventListener("error", l), u ? u.parentNode.insertBefore(n, u.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(n, t.firstChild)), a.state.loading |= 4;
    }
  }
  var Jn = {
    $$typeof: G,
    Provider: null,
    Consumer: null,
    _currentValue: P,
    _currentValue2: P,
    _threadCount: 0
  };
  function Em(t, a, e, l, n, u, i, s) {
    this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = il(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = il(0), this.hiddenUpdates = il(null), this.identifierPrefix = l, this.onUncaughtError = n, this.onCaughtError = u, this.onRecoverableError = i, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = s, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Ud(t, a, e, l, n, u, i, s, d, y, N, O) {
    return t = new Em(
      t,
      a,
      e,
      i,
      s,
      d,
      y,
      O
    ), a = 1, u === !0 && (a |= 24), u = ha(3, null, null, a), t.current = u, u.stateNode = t, a = fc(), a.refCount++, t.pooledCache = a, a.refCount++, u.memoizedState = {
      element: l,
      isDehydrated: e,
      cache: a
    }, hc(u), t;
  }
  function qd(t) {
    return t ? (t = Tl, t) : Tl;
  }
  function Hd(t, a, e, l, n, u) {
    n = qd(n), l.context === null ? l.context = n : l.pendingContext = n, l = ve(a), l.payload = { element: e }, u = u === void 0 ? null : u, u !== null && (l.callback = u), e = me(t, l, a), e !== null && (ya(e, t, a), jn(e, t, a));
  }
  function Cd(t, a) {
    if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
      var e = t.retryLane;
      t.retryLane = e !== 0 && e < a ? e : a;
    }
  }
  function Os(t, a) {
    Cd(t, a), (t = t.alternate) && Cd(t, a);
  }
  function wd(t) {
    if (t.tag === 13) {
      var a = Sl(t, 67108864);
      a !== null && ya(a, t, 67108864), Os(t, 67108864);
    }
  }
  var hi = !0;
  function jm(t, a, e, l) {
    var n = A.T;
    A.T = null;
    var u = C.p;
    try {
      C.p = 2, Ms(t, a, e, l);
    } finally {
      C.p = u, A.T = n;
    }
  }
  function _m(t, a, e, l) {
    var n = A.T;
    A.T = null;
    var u = C.p;
    try {
      C.p = 8, Ms(t, a, e, l);
    } finally {
      C.p = u, A.T = n;
    }
  }
  function Ms(t, a, e, l) {
    if (hi) {
      var n = Ds(l);
      if (n === null)
        ps(
          t,
          a,
          l,
          vi,
          e
        ), Yd(t, l);
      else if (Nm(
        n,
        t,
        a,
        e,
        l
      ))
        l.stopPropagation();
      else if (Yd(t, l), a & 4 && -1 < Am.indexOf(t)) {
        for (; n !== null; ) {
          var u = fl(n);
          if (u !== null)
            switch (u.tag) {
              case 3:
                if (u = u.stateNode, u.current.memoizedState.isDehydrated) {
                  var i = Va(u.pendingLanes);
                  if (i !== 0) {
                    var s = u;
                    for (s.pendingLanes |= 2, s.entangledLanes |= 2; i; ) {
                      var d = 1 << 31 - Ft(i);
                      s.entanglements[1] |= d, i &= ~d;
                    }
                    Qa(u), (xt & 6) === 0 && (Fu = xa() + 500, Ln(0));
                  }
                }
                break;
              case 13:
                s = Sl(u, 2), s !== null && ya(s, u, 2), Iu(), Os(u, 2);
            }
          if (u = Ds(l), u === null && ps(
            t,
            a,
            l,
            vi,
            e
          ), u === n) break;
          n = u;
        }
        n !== null && l.stopPropagation();
      } else
        ps(
          t,
          a,
          l,
          null,
          e
        );
    }
  }
  function Ds(t) {
    return t = Ci(t), Rs(t);
  }
  var vi = null;
  function Rs(t) {
    if (vi = null, t = sl(t), t !== null) {
      var a = _(t);
      if (a === null) t = null;
      else {
        var e = a.tag;
        if (e === 13) {
          if (t = R(a), t !== null) return t;
          t = null;
        } else if (e === 3) {
          if (a.stateNode.current.memoizedState.isDehydrated)
            return a.tag === 3 ? a.stateNode.containerInfo : null;
          t = null;
        } else a !== t && (t = null);
      }
    }
    return vi = t, null;
  }
  function Bd(t) {
    switch (t) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (Ai()) {
          case Il:
            return 2;
          case uu:
            return 8;
          case el:
          case qe:
            return 32;
          case ll:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Us = !1, ze = null, Oe = null, Me = null, $n = /* @__PURE__ */ new Map(), Wn = /* @__PURE__ */ new Map(), De = [], Am = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function Yd(t, a) {
    switch (t) {
      case "focusin":
      case "focusout":
        ze = null;
        break;
      case "dragenter":
      case "dragleave":
        Oe = null;
        break;
      case "mouseover":
      case "mouseout":
        Me = null;
        break;
      case "pointerover":
      case "pointerout":
        $n.delete(a.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Wn.delete(a.pointerId);
    }
  }
  function Fn(t, a, e, l, n, u) {
    return t === null || t.nativeEvent !== u ? (t = {
      blockedOn: a,
      domEventName: e,
      eventSystemFlags: l,
      nativeEvent: u,
      targetContainers: [n]
    }, a !== null && (a = fl(a), a !== null && wd(a)), t) : (t.eventSystemFlags |= l, a = t.targetContainers, n !== null && a.indexOf(n) === -1 && a.push(n), t);
  }
  function Nm(t, a, e, l, n) {
    switch (a) {
      case "focusin":
        return ze = Fn(
          ze,
          t,
          a,
          e,
          l,
          n
        ), !0;
      case "dragenter":
        return Oe = Fn(
          Oe,
          t,
          a,
          e,
          l,
          n
        ), !0;
      case "mouseover":
        return Me = Fn(
          Me,
          t,
          a,
          e,
          l,
          n
        ), !0;
      case "pointerover":
        var u = n.pointerId;
        return $n.set(
          u,
          Fn(
            $n.get(u) || null,
            t,
            a,
            e,
            l,
            n
          )
        ), !0;
      case "gotpointercapture":
        return u = n.pointerId, Wn.set(
          u,
          Fn(
            Wn.get(u) || null,
            t,
            a,
            e,
            l,
            n
          )
        ), !0;
    }
    return !1;
  }
  function Gd(t) {
    var a = sl(t.target);
    if (a !== null) {
      var e = _(a);
      if (e !== null) {
        if (a = e.tag, a === 13) {
          if (a = R(e), a !== null) {
            t.blockedOn = a, xh(t.priority, function() {
              if (e.tag === 13) {
                var l = pa();
                l = Ra(l);
                var n = Sl(e, l);
                n !== null && ya(n, e, l), Os(e, l);
              }
            });
            return;
          }
        } else if (a === 3 && e.stateNode.current.memoizedState.isDehydrated) {
          t.blockedOn = e.tag === 3 ? e.stateNode.containerInfo : null;
          return;
        }
      }
    }
    t.blockedOn = null;
  }
  function mi(t) {
    if (t.blockedOn !== null) return !1;
    for (var a = t.targetContainers; 0 < a.length; ) {
      var e = Ds(t.nativeEvent);
      if (e === null) {
        e = t.nativeEvent;
        var l = new e.constructor(
          e.type,
          e
        );
        Hi = l, e.target.dispatchEvent(l), Hi = null;
      } else
        return a = fl(e), a !== null && wd(a), t.blockedOn = e, !1;
      a.shift();
    }
    return !0;
  }
  function Ld(t, a, e) {
    mi(t) && e.delete(a);
  }
  function zm() {
    Us = !1, ze !== null && mi(ze) && (ze = null), Oe !== null && mi(Oe) && (Oe = null), Me !== null && mi(Me) && (Me = null), $n.forEach(Ld), Wn.forEach(Ld);
  }
  function gi(t, a) {
    t.blockedOn === a && (t.blockedOn = null, Us || (Us = !0, c.unstable_scheduleCallback(
      c.unstable_NormalPriority,
      zm
    )));
  }
  var pi = null;
  function Xd(t) {
    pi !== t && (pi = t, c.unstable_scheduleCallback(
      c.unstable_NormalPriority,
      function() {
        pi === t && (pi = null);
        for (var a = 0; a < t.length; a += 3) {
          var e = t[a], l = t[a + 1], n = t[a + 2];
          if (typeof l != "function") {
            if (Rs(l || e) === null)
              continue;
            break;
          }
          var u = fl(e);
          u !== null && (t.splice(a, 3), a -= 3, Rc(
            u,
            {
              pending: !0,
              data: n,
              method: e.method,
              action: l
            },
            l,
            n
          ));
        }
      }
    ));
  }
  function Pn(t) {
    function a(d) {
      return gi(d, t);
    }
    ze !== null && gi(ze, t), Oe !== null && gi(Oe, t), Me !== null && gi(Me, t), $n.forEach(a), Wn.forEach(a);
    for (var e = 0; e < De.length; e++) {
      var l = De[e];
      l.blockedOn === t && (l.blockedOn = null);
    }
    for (; 0 < De.length && (e = De[0], e.blockedOn === null); )
      Gd(e), e.blockedOn === null && De.shift();
    if (e = (t.ownerDocument || t).$$reactFormReplay, e != null)
      for (l = 0; l < e.length; l += 3) {
        var n = e[l], u = e[l + 1], i = n[na] || null;
        if (typeof u == "function")
          i || Xd(e);
        else if (i) {
          var s = null;
          if (u && u.hasAttribute("formAction")) {
            if (n = u, i = u[na] || null)
              s = i.formAction;
            else if (Rs(n) !== null) continue;
          } else s = i.action;
          typeof s == "function" ? e[l + 1] = s : (e.splice(l, 3), l -= 3), Xd(e);
        }
      }
  }
  function qs(t) {
    this._internalRoot = t;
  }
  yi.prototype.render = qs.prototype.render = function(t) {
    var a = this._internalRoot;
    if (a === null) throw Error(r(409));
    var e = a.current, l = pa();
    Hd(e, l, t, a, null, null);
  }, yi.prototype.unmount = qs.prototype.unmount = function() {
    var t = this._internalRoot;
    if (t !== null) {
      this._internalRoot = null;
      var a = t.containerInfo;
      Hd(t.current, 2, null, t, null, null), Iu(), a[cl] = null;
    }
  };
  function yi(t) {
    this._internalRoot = t;
  }
  yi.prototype.unstable_scheduleHydration = function(t) {
    if (t) {
      var a = Ce();
      t = { blockedOn: null, target: t, priority: a };
      for (var e = 0; e < De.length && a !== 0 && a < De[e].priority; e++) ;
      De.splice(e, 0, t), e === 0 && Gd(t);
    }
  };
  var Qd = o.version;
  if (Qd !== "19.1.0")
    throw Error(
      r(
        527,
        Qd,
        "19.1.0"
      )
    );
  C.findDOMNode = function(t) {
    var a = t._reactInternals;
    if (a === void 0)
      throw typeof t.render == "function" ? Error(r(188)) : (t = Object.keys(t).join(","), Error(r(268, t)));
    return t = j(a), t = t !== null ? S(t) : null, t = t === null ? null : t.stateNode, t;
  };
  var Om = {
    bundleType: 0,
    version: "19.1.0",
    rendererPackageName: "react-dom",
    currentDispatcherRef: A,
    reconcilerVersion: "19.1.0"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var bi = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!bi.isDisabled && bi.supportsFiber)
      try {
        ka = bi.inject(
          Om
        ), Rt = bi;
      } catch {
      }
  }
  return tu.createRoot = function(t, a) {
    if (!E(t)) throw Error(r(299));
    var e = !1, l = "", n = no, u = uo, i = io, s = null;
    return a != null && (a.unstable_strictMode === !0 && (e = !0), a.identifierPrefix !== void 0 && (l = a.identifierPrefix), a.onUncaughtError !== void 0 && (n = a.onUncaughtError), a.onCaughtError !== void 0 && (u = a.onCaughtError), a.onRecoverableError !== void 0 && (i = a.onRecoverableError), a.unstable_transitionCallbacks !== void 0 && (s = a.unstable_transitionCallbacks)), a = Ud(
      t,
      1,
      !1,
      null,
      null,
      e,
      l,
      n,
      u,
      i,
      s,
      null
    ), t[cl] = a.current, gs(t), new qs(a);
  }, tu.hydrateRoot = function(t, a, e) {
    if (!E(t)) throw Error(r(299));
    var l = !1, n = "", u = no, i = uo, s = io, d = null, y = null;
    return e != null && (e.unstable_strictMode === !0 && (l = !0), e.identifierPrefix !== void 0 && (n = e.identifierPrefix), e.onUncaughtError !== void 0 && (u = e.onUncaughtError), e.onCaughtError !== void 0 && (i = e.onCaughtError), e.onRecoverableError !== void 0 && (s = e.onRecoverableError), e.unstable_transitionCallbacks !== void 0 && (d = e.unstable_transitionCallbacks), e.formState !== void 0 && (y = e.formState)), a = Ud(
      t,
      1,
      !0,
      a,
      e ?? null,
      l,
      n,
      u,
      i,
      s,
      d,
      y
    ), a.context = qd(null), e = a.current, l = pa(), l = Ra(l), n = ve(l), n.callback = null, me(e, n, l), e = l, a.current.lanes = e, T(a, e), Qa(a), t[cl] = a.current, gs(t), new yi(a);
  }, tu.version = "19.1.0", tu;
}
var Id;
function Bm() {
  if (Id) return Cs.exports;
  Id = 1;
  function c() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(c);
      } catch (o) {
        console.error(o);
      }
  }
  return c(), Cs.exports = wm(), Cs.exports;
}
var Ym = Bm();
const Gm = '.ahv{--ahv-bg: var(--activity-bg, var(--background, #ffffff));--ahv-fg: var(--activity-fg, var(--foreground, #16181d));--ahv-muted: var(--activity-muted, var(--muted-foreground, #6b7080));--ahv-subtle: var(--activity-subtle, var(--muted, #f3f4f7));--ahv-line: var(--activity-line, var(--border, #e3e5ea));--ahv-main: var(--activity-main, var(--primary, #16181d));--ahv-main-fg: var(--activity-main-fg, var(--primary-foreground, #ffffff));--ahv-radius: var(--activity-radius, var(--radius, .625rem));--ahv-mono-font: var(--activity-mono-font, var(--font-mono, ui-monospace, "SF Mono", Menlo, Consolas, monospace));--ahv-bad: var(--activity-bad, #d92d20);--ahv-warn: var(--activity-warn, #b54708);--ahv-ok: var(--activity-ok, #067647);--ahv-attention: var(--activity-attention, #3e63dd);color:var(--ahv-fg);font-size:13px;line-height:1.45}.dark .ahv,[data-theme=dark] .ahv,.ahv-dark-host .ahv,.ahv.ahv-dark-host{--ahv-bad: var(--activity-bad, #f97066);--ahv-warn: var(--activity-warn, #fdb022);--ahv-ok: var(--activity-ok, #47cd89);--ahv-attention: var(--activity-attention, #8da4ef)}.ahv *,.ahv *:before,.ahv *:after{box-sizing:border-box}.ahv button{font:inherit}.ahv h2,.ahv h3,.ahv p{margin:0}.ahv-dim{color:var(--ahv-muted)}.ahv-strong{font-weight:600}.ahv-small{font-size:12px}.ahv-mono{font-family:var(--ahv-mono-font);font-size:12px}.ahv-num{font-variant-numeric:tabular-nums}.ahv-clip{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:100%}.ahv-bad{color:var(--ahv-bad)}.ahv-warn{color:var(--ahv-warn)}.ahv-log{display:flex;flex-direction:column;min-width:0;background:var(--ahv-bg);border:1px solid var(--ahv-line);border-radius:calc(var(--ahv-radius) * 1.4);overflow:hidden}.ahv-head{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px 16px;padding:16px 20px;border-bottom:1px solid var(--ahv-line)}.ahv-title{display:flex;align-items:center;gap:8px;font-size:16px;font-weight:600;text-wrap:balance}.ahv-head p{margin-top:2px;font-size:13px}.ahv-actions{display:flex;flex-wrap:wrap;align-items:center;gap:8px}.ahv-status{display:flex;flex-wrap:wrap;align-items:center;gap:6px 18px;padding:9px 20px;font-size:12.5px;color:var(--ahv-muted);border-bottom:1px solid var(--ahv-line)}.ahv-status strong{color:var(--ahv-fg);font-weight:500}.ahv-status .ahv-bad,.ahv-status strong.ahv-bad{color:var(--ahv-bad)}.ahv-status .ahv-warn{color:var(--ahv-warn)}.ahv-ok,.ahv-status strong.ahv-ok{color:var(--ahv-ok)}.ahv-status-wrap{border-bottom:1px solid var(--ahv-line)}.ahv-status-wrap .ahv-status{border-bottom:0}.ahv-checks{display:grid;gap:10px;padding:4px 20px 14px}.ahv-checks .ahv-bar{align-items:flex-end}.ahv-checks .ahv-field{width:170px}.ahv-hidden{display:none}.ahv-disabled{opacity:.55;pointer-events:none}label.ahv-button{cursor:pointer}.ahv-verdict{display:grid;gap:6px;padding:10px 12px;font-size:12.5px;border-radius:var(--ahv-radius);border:1px solid}.ahv-verdict ul{margin:0;padding-left:18px;display:grid;gap:2px}.ahv-verdict-ok{color:var(--ahv-ok);border-color:color-mix(in srgb,var(--ahv-ok) 35%,transparent);background:color-mix(in srgb,var(--ahv-ok) 6%,transparent)}.ahv-verdict-bad{color:var(--ahv-bad);border-color:color-mix(in srgb,var(--ahv-bad) 35%,transparent);background:color-mix(in srgb,var(--ahv-bad) 6%,transparent)}.ahv-seal{display:inline-flex;vertical-align:-2px;margin-left:4px;color:var(--ahv-ok)}.ahv-seal-waiting{color:var(--ahv-muted)}.ahv-button{display:inline-flex;align-items:center;gap:6px;height:32px;padding:0 12px;cursor:pointer;color:var(--ahv-fg);background:var(--ahv-bg);border:1px solid var(--ahv-line);border-radius:var(--ahv-radius);font-size:13px;font-weight:500;white-space:nowrap;transition:background-color .15s,border-color .15s}.ahv-button:hover:not(:disabled){background:var(--ahv-subtle)}.ahv-button:disabled{opacity:.55;cursor:default}.ahv-button-quiet{border-color:transparent;background:transparent;color:var(--ahv-muted)}.ahv-button-quiet:hover:not(:disabled){color:var(--ahv-fg)}.ahv-button-main{background:var(--ahv-main);color:var(--ahv-main-fg);border-color:var(--ahv-main);padding:0 16px}.ahv-button-main:hover:not(:disabled){background:var(--ahv-main);opacity:.9}.ahv-button-live{color:var(--ahv-ok);border-color:color-mix(in srgb,var(--ahv-ok) 45%,transparent)}.ahv-icon-button{display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;padding:0;cursor:pointer;background:transparent;border:0;border-radius:var(--ahv-radius);color:var(--ahv-muted)}.ahv-icon-button:hover{background:var(--ahv-subtle);color:var(--ahv-fg)}.ahv :focus-visible{outline:2px solid var(--ahv-attention);outline-offset:1px}.ahv-input{width:100%;min-width:0;height:34px;padding:0 10px;font:inherit;font-size:13px;color:var(--ahv-fg);background:var(--ahv-bg);border:1px solid var(--ahv-line);border-radius:var(--ahv-radius)}.ahv-input[aria-invalid]{border-color:var(--ahv-bad)}.ahv-input::placeholder{color:var(--ahv-muted)}.ahv-input-icon{position:relative;display:block}.ahv-input-icon>svg{position:absolute;left:10px;top:50%;transform:translateY(-50%);color:var(--ahv-muted);pointer-events:none}.ahv-input-icon>.ahv-input{padding-left:30px}.ahv-pair{display:flex;gap:6px}.ahv-segment{display:inline-flex;padding:2px;gap:2px;background:var(--ahv-subtle);border-radius:var(--ahv-radius)}.ahv-segment button{height:28px;padding:0 12px;border:0;border-radius:calc(var(--ahv-radius) * .8);background:transparent;cursor:pointer;color:var(--ahv-muted);font-size:12.5px;font-weight:500}.ahv-segment button[aria-pressed=true]{background:var(--ahv-bg);color:var(--ahv-fg);box-shadow:0 1px 2px #00000014}.ahv-chips{display:flex;flex-wrap:wrap;gap:6px}.ahv-chip{height:28px;padding:0 11px;cursor:pointer;font-size:12.5px;color:var(--ahv-muted);background:transparent;border:1px solid var(--ahv-line);border-radius:999px}.ahv-chip[aria-pressed=true]{color:var(--ahv-fg);border-color:var(--ahv-fg);font-weight:500}.ahv-menu{position:relative}.ahv-menu-list{position:absolute;right:0;top:calc(100% + 4px);z-index:20;min-width:220px;padding:4px;display:grid;background:var(--ahv-bg);border:1px solid var(--ahv-line);border-radius:var(--ahv-radius);box-shadow:0 8px 24px #0000001f}.ahv-menu-list>button{color:inherit;text-align:left;padding:8px 10px;border:0;background:transparent;border-radius:calc(var(--ahv-radius) * .8);cursor:pointer}.ahv-menu-list>button:hover{background:var(--ahv-subtle)}.ahv-filters{display:grid;gap:14px;padding:14px 20px;border-bottom:1px solid var(--ahv-line);background:color-mix(in srgb,var(--ahv-subtle) 35%,var(--ahv-bg))}.ahv-bar{display:flex;flex-wrap:wrap;align-items:center;gap:8px 12px}.ahv-bar-end{gap:8px}.ahv-push{flex:1}.ahv-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:12px}.ahv-more{padding:12px;border:1px dashed var(--ahv-line);border-radius:var(--ahv-radius)}.ahv-field{display:grid;gap:5px;align-content:start;min-width:0}.ahv-field-wide{grid-column:span 2}.ahv-field>span:first-child{font-size:12px;font-weight:500;color:var(--ahv-muted)}.ahv-field em{font-style:normal;font-size:12px}.ahv-applied{display:flex;flex-wrap:wrap;align-items:center;gap:6px;padding-top:12px;border-top:1px dashed var(--ahv-line)}.ahv-pill{display:inline-flex;align-items:center;gap:4px;height:26px;padding:0 2px 0 9px;font-size:12.5px;background:var(--ahv-bg);border:1px solid var(--ahv-line);border-radius:var(--ahv-radius)}.ahv-pill button{display:inline-flex;padding:3px;border:0;background:transparent;border-radius:4px;cursor:pointer;color:var(--ahv-muted)}.ahv-pill button:hover{background:var(--ahv-subtle);color:var(--ahv-fg)}.ahv-searchbar{display:flex;flex-wrap:wrap;gap:8px;align-items:flex-start}.ahv-search{position:relative;flex:1 1 360px;min-width:0}.ahv-range{width:auto;flex:0 0 auto}.ahv-searchbar .ahv-pair{flex:0 1 300px}.ahv-suggest{position:absolute;left:0;right:0;top:calc(100% + 4px);z-index:30;margin:0;padding:4px;list-style:none;max-height:300px;overflow:auto;background:var(--ahv-bg);border:1px solid var(--ahv-line);border-radius:var(--ahv-radius);box-shadow:0 8px 24px #0000001f}.ahv-suggest li{display:flex;justify-content:space-between;gap:12px;padding:6px 9px;border-radius:calc(var(--ahv-radius) * .8);cursor:pointer}.ahv-suggest li .ahv-dim{font-size:12px;text-align:right}.ahv-suggest-on{background:var(--ahv-subtle)}.ahv-add{gap:4px 6px}.ahv-link-button{padding:2px 8px;font-size:12.5px;color:var(--ahv-muted);background:transparent;border:1px dashed var(--ahv-line);border-radius:999px;cursor:pointer}.ahv-link-button:hover{color:var(--ahv-fg);border-style:solid}.ahv-push-right{margin-left:auto}.ahv-pill-not{border-style:dashed}.ahv-cell{white-space:nowrap}.ahv-check{display:flex;align-items:center;gap:8px;padding:5px 4px;font-size:13px;cursor:pointer}.ahv-menu-panel{min-width:280px;padding:10px;gap:4px}.ahv-views{margin:0 0 6px;padding:0;list-style:none;display:grid;gap:2px;max-height:300px;overflow:auto}.ahv-views li{display:flex;align-items:center;gap:4px;border-radius:calc(var(--ahv-radius) * .8)}.ahv-views li:hover,.ahv-views-on{background:var(--ahv-subtle)}.ahv-views-open{flex:1;display:grid;gap:1px;padding:6px 8px;text-align:left;color:inherit;background:transparent;border:0;cursor:pointer;min-width:0}.ahv-views-tools{display:flex}.ahv-views-save{display:grid;gap:6px;padding-top:8px;border-top:1px solid var(--ahv-line)}.ahv-chart{padding:14px 20px 10px;border-bottom:1px solid var(--ahv-line)}.ahv-chart-head{display:flex;flex-wrap:wrap;justify-content:space-between;gap:4px 16px;margin-bottom:10px;font-size:12.5px}.ahv-chart-head strong{font-size:14px}.ahv-chart-plot{position:relative;height:96px;border-bottom:1px solid var(--ahv-line)}.ahv-chart-svg{display:block;width:100%;height:100%}.ahv-bar{fill:var(--ahv-main);fill-opacity:.55}.ahv-bar-on{fill-opacity:1}.ahv-chart-max{position:absolute;left:0;top:-2px;font-size:10.5px;color:var(--ahv-muted)}.ahv-chart-empty{position:absolute;top:0;right:0;bottom:0;left:0;display:grid;place-items:center;color:var(--ahv-muted);font-size:12.5px}.ahv-chart-axis{position:relative;height:30px}.ahv-chart-axis span{position:absolute;top:4px;transform:translate(-50%);display:grid;justify-items:center;font-size:10.5px;color:var(--ahv-muted);font-variant-numeric:tabular-nums;white-space:nowrap}.ahv-chart-axis b{font-weight:600}.ahv-tip{position:absolute;top:-6px;transform:translate(-50%,-100%);z-index:5;display:grid;gap:1px;padding:6px 9px;pointer-events:none;font-size:12px;white-space:nowrap;background:var(--ahv-bg);border:1px solid var(--ahv-line);border-radius:var(--ahv-radius);box-shadow:0 6px 18px #0000001f}.ahv-tip span{color:var(--ahv-muted)}.ahv-table-wrap{max-height:min(70vh,52rem);overflow:auto}.ahv-table{width:100%;border-collapse:collapse}.ahv-table thead th{position:sticky;top:0;z-index:2;padding:9px 14px;text-align:left;font-size:12px;font-weight:500;color:var(--ahv-muted);background:var(--ahv-bg);box-shadow:inset 0 -1px 0 var(--ahv-line);white-space:nowrap}.ahv-table td{padding:10px 14px;vertical-align:middle;border-bottom:1px solid color-mix(in srgb,var(--ahv-line) 70%,transparent)}.ahv-table th:first-child,.ahv-table td:first-child{padding-left:20px;width:1%}.ahv-table th:last-child,.ahv-table td:last-child{padding-right:20px;width:1%}.ahv-table td:nth-child(2){width:22%;max-width:260px}.ahv-day td{padding:6px 20px;font-size:11px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:var(--ahv-muted);background:color-mix(in srgb,var(--ahv-subtle) 60%,var(--ahv-bg))}.ahv-row{cursor:pointer}.ahv-row:hover td{background:color-mix(in srgb,var(--ahv-subtle) 55%,transparent)}.ahv-row-problem td:first-child{box-shadow:inset 3px 0 0 var(--ahv-bad)}.ahv-when{display:grid;white-space:nowrap;line-height:1.3}.ahv-when .ahv-dim{font-size:11.5px}.ahv-who{display:flex;align-items:center;gap:10px;min-width:0}.ahv-avatar{flex:none;display:grid;place-items:center;width:28px;height:28px;border-radius:999px;font-size:10.5px;font-weight:600;color:var(--ahv-muted);background:var(--ahv-subtle)}.ahv-avatar-system{border-radius:8px}.ahv-stack{display:grid;min-width:0;line-height:1.3}.ahv-stack .ahv-dim{font-size:11.5px}.ahv-link{display:block;max-width:100%;padding:0;color:inherit;border:0;background:none;text-align:left;cursor:pointer}.ahv-link:hover{text-decoration:underline;text-underline-offset:2px}.ahv-what{display:flex;align-items:center;gap:8px;min-width:0}.ahv-sentence{min-width:0;overflow-wrap:anywhere}.ahv-mark{flex:none;width:7px;height:7px;border-radius:999px;background:var(--ahv-attention)}.ahv-what>svg{flex:none}.ahv-count{flex:none;display:inline-flex;align-items:center;gap:3px;padding:1px 6px;font-size:11px;color:var(--ahv-muted);border:1px solid var(--ahv-line);border-radius:999px;font-variant-numeric:tabular-nums}.ahv-where{display:flex;align-items:center;gap:6px;white-space:nowrap}.ahv-tag{display:inline-flex;align-items:center;height:20px;padding:0 7px;font-size:11px;font-weight:500;white-space:nowrap;color:var(--ahv-muted);background:var(--ahv-subtle);border-radius:6px;text-transform:none}.ahv-tag-bad{color:var(--ahv-bad);background:color-mix(in srgb,var(--ahv-bad) 12%,transparent)}.ahv-tag-warn{color:var(--ahv-warn);background:color-mix(in srgb,var(--ahv-warn) 12%,transparent)}.ahv-tag-ok{color:var(--ahv-ok);background:color-mix(in srgb,var(--ahv-ok) 12%,transparent)}.ahv-tag-accent{color:var(--ahv-attention);background:color-mix(in srgb,var(--ahv-attention) 12%,transparent)}.ahv-method-get{color:var(--ahv-attention)}.ahv-method-post{color:var(--ahv-ok)}.ahv-method-put,.ahv-method-patch{color:var(--ahv-warn)}.ahv-method-delete{color:var(--ahv-bad)}.ahv-foot{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:8px;padding:10px 20px;font-size:12.5px}.ahv-empty{display:grid;justify-items:center;gap:6px;padding:48px 20px;text-align:center;color:var(--ahv-muted)}.ahv-empty strong{color:var(--ahv-fg);font-size:14px}.ahv-message{display:flex;align-items:center;justify-content:space-between;gap:12px;margin:12px 20px;padding:9px 12px;font-size:12.5px;border:1px solid var(--ahv-line);border-radius:var(--ahv-radius);background:var(--ahv-subtle)}.ahv-message-bad{color:var(--ahv-bad);border-color:color-mix(in srgb,var(--ahv-bad) 35%,transparent);background:color-mix(in srgb,var(--ahv-bad) 6%,transparent)}.ahv-timeline .ahv-message{margin:0}.ahv-skeleton{display:grid;gap:8px;padding:16px 20px}.ahv-timeline .ahv-skeleton{padding:0}.ahv-skeleton span{height:38px;border-radius:var(--ahv-radius);background:var(--ahv-subtle);animation:ahv-fade 1.4s ease-in-out infinite}.ahv-drawer-layer{position:fixed;top:0;right:0;bottom:0;left:0;z-index:60;display:flex;justify-content:flex-end}.ahv-backdrop{position:absolute;top:0;right:0;bottom:0;left:0;background:#00000052;animation:ahv-fade-in .15s ease-out}.ahv-drawer{position:relative;width:min(680px,100%);height:100%;overflow-y:auto;background:var(--ahv-bg);color:var(--ahv-fg);border-left:1px solid var(--ahv-line);box-shadow:-12px 0 32px #00000024;animation:ahv-slide-in .18s ease-out}.ahv-drawer-close{position:absolute;top:14px;right:14px}.ahv-drawer-body{display:grid;gap:22px;padding:22px 24px 32px}.ahv-drawer-head{display:grid;gap:8px;padding-right:36px;padding-bottom:18px;border-bottom:1px solid var(--ahv-line)}.ahv-drawer-head h2{font-size:17px;font-weight:600;line-height:1.35;text-wrap:balance;overflow-wrap:anywhere}.ahv-drawer-head .ahv-actions{margin-top:4px}.ahv-tags{display:flex;flex-wrap:wrap;gap:6px}.ahv-section{display:grid;gap:8px}.ahv-section h3{font-size:11px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;color:var(--ahv-muted)}.ahv-facts{display:grid;grid-template-columns:minmax(110px,auto) 1fr;gap:6px 16px;margin:0;font-size:12.5px}.ahv-facts>div{display:contents}.ahv-facts dt{color:var(--ahv-muted)}.ahv-facts dd{margin:0;min-width:0;overflow-wrap:anywhere}.ahv-scroll-x{overflow-x:auto;border:1px solid var(--ahv-line);border-radius:var(--ahv-radius)}.ahv-changes{width:100%;border-collapse:collapse;font-size:12.5px}.ahv-changes th{padding:7px 12px;text-align:left;font-weight:500;color:var(--ahv-muted);background:var(--ahv-subtle)}.ahv-changes td{padding:7px 12px;border-top:1px solid var(--ahv-line);overflow-wrap:anywhere}.ahv-before{color:var(--ahv-bad)}.ahv-after{color:var(--ahv-ok)}.ahv-list{margin:0;padding:0;list-style:none;border:1px solid var(--ahv-line);border-radius:var(--ahv-radius);overflow:hidden}.ahv-list li+li{border-top:1px solid var(--ahv-line)}.ahv-list button{display:flex;align-items:center;gap:10px;width:100%;padding:8px 12px;text-align:left;border:0;background:transparent;cursor:pointer;color:inherit}.ahv-list button:hover:not(:disabled){background:var(--ahv-subtle)}.ahv-list button:disabled{cursor:default;background:var(--ahv-subtle)}.ahv-row-between{display:flex;align-items:center;justify-content:space-between;gap:8px}.ahv-disclose{display:inline-flex;align-items:center;gap:4px;padding:0;border:0;background:none;cursor:pointer;font-size:11px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;color:var(--ahv-muted)}.ahv-pre{margin:0;max-height:380px;overflow:auto;padding:12px;font-family:var(--ahv-mono-font);font-size:12px;background:var(--ahv-subtle);border:1px solid var(--ahv-line);border-radius:var(--ahv-radius);white-space:pre-wrap;overflow-wrap:anywhere}.ahv-timeline{display:grid;gap:10px}.ahv-steps{position:relative;margin:0;padding:0;list-style:none;display:grid;gap:4px}.ahv-step{position:relative;padding-left:22px}.ahv-step:before{content:"";position:absolute;left:5px;top:18px;bottom:-8px;width:1px;background:var(--ahv-line)}.ahv-step:last-child:before{display:none}.ahv-step-dot{position:absolute;left:0;top:13px;width:11px;height:11px;border-radius:999px;background:var(--ahv-bg);border:2px solid var(--ahv-muted)}.ahv-step-accent .ahv-step-dot{border-color:var(--ahv-attention);background:var(--ahv-attention)}.ahv-step-warn .ahv-step-dot{border-color:var(--ahv-warn);background:var(--ahv-warn)}.ahv-step-bad .ahv-step-dot{border-color:var(--ahv-bad);background:var(--ahv-bad)}.ahv-step-body{display:grid;gap:2px;width:100%;padding:8px 10px;text-align:left;border:0;background:transparent;cursor:pointer;border-radius:var(--ahv-radius);color:inherit}.ahv-step-body:hover{background:var(--ahv-subtle)}.ahv-step-top{display:flex;flex-wrap:wrap;justify-content:space-between;gap:2px 12px}.ahv-step-top .ahv-dim{font-size:11.5px}.ahv-turned{transform:rotate(180deg)}.ahv-spin{animation:ahv-spin 1s linear infinite}.ahv-pulse{animation:ahv-fade 1.6s ease-in-out infinite}@keyframes ahv-spin{to{transform:rotate(360deg)}}@keyframes ahv-fade{50%{opacity:.45}}@keyframes ahv-fade-in{0%{opacity:0}}@keyframes ahv-slide-in{0%{transform:translate(24px);opacity:0}}@media(prefers-reduced-motion:reduce){.ahv *,.ahv-drawer-layer *{animation:none!important;transition:none!important}}@media(max-width:720px){.ahv-head,.ahv-filters,.ahv-chart,.ahv-foot{padding-left:16px;padding-right:16px}.ahv-field-wide{grid-column:span 1}.ahv-table thead{display:none}.ahv-table,.ahv-table tbody,.ahv-table tr,.ahv-table td{display:block;width:auto!important;max-width:none!important}.ahv-table td{border:0;padding:2px 16px!important}.ahv-row{padding:10px 0;border-bottom:1px solid var(--ahv-line)}.ahv-day td{padding:6px 16px!important}}';
var X = Ps();
const se = (c) => "action" in c, Lm = {
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
function zt({ name: c, size: o = 16, ...m }) {
  return /* @__PURE__ */ f.jsx(
    "svg",
    {
      width: o,
      height: o,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 2,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      focusable: "false",
      ...m,
      children: /* @__PURE__ */ f.jsx("path", { d: Lm[c] })
    }
  );
}
function Ca(c, o, m) {
  const [r, E] = X.useState({ loading: c !== null }), _ = X.useRef(0), R = X.useRef(o);
  R.current = o;
  const H = X.useCallback(() => {
    if (c === null) return;
    const S = ++_.current;
    E((D) => ({ ...D, loading: !0 })), R.current().then(
      (D) => S === _.current && E({ data: D, loading: !1 }),
      (D) => S === _.current && E((B) => ({ data: B.data, error: D, loading: !1 }))
    );
  }, [c]);
  X.useEffect(() => {
    E({ loading: c !== null }), H();
  }, [c, H]);
  const j = !!r.error;
  return X.useEffect(() => {
    if (!m || c === null || j) return;
    const S = setInterval(H, m);
    return () => clearInterval(S);
  }, [m, c, j, H]), { ...r, refresh: H };
}
const Xs = 20;
function Xm(c, o, m, r, E) {
  var et;
  const _ = o && JSON.stringify(o), [R, H] = X.useState([]), [j, S] = X.useState(!1), [D, B] = X.useState({ loading: !1 }), U = X.useRef(_);
  U.current = _;
  const Y = Ca(
    _,
    () => c("search", { method: "POST", body: { ...o, limit: m } }),
    r ? E : void 0
  ), V = X.useRef(0);
  X.useEffect(() => {
    Y.data && (V.current += 1, H([Y.data]), S(!1), B({ loading: !1 }));
  }, [Y.data]), X.useEffect(() => {
    H([]), B({ loading: !1 });
  }, [_]);
  const K = ((et = R[R.length - 1]) == null ? void 0 : et.next_cursor) ?? null, lt = X.useCallback(() => {
    if (!K || D.loading || !o) return;
    B({ loading: !0 });
    const G = _, F = V.current;
    c("search", { method: "POST", body: { ...o, limit: m, cursor: K } }).then(
      (J) => {
        U.current !== G || V.current !== F || (H((ut) => [...ut, J].slice(-Xs)), R.length >= Xs && S(!0), B({ loading: !1 }));
      },
      (J) => U.current === G && V.current === F && B({ loading: !1, error: J })
    );
  }, [K, D.loading, o, _, c, m, R.length]);
  return {
    rows: R.flatMap((G) => G.items),
    trimmed: j,
    hasMore: !!K && !r,
    loading: Y.loading && !R.length,
    refreshing: Y.loading,
    error: Y.error,
    more: D,
    loadMore: lt,
    refresh: Y.refresh,
    pageCount: R.length
  };
}
const wa = (c) => Date.parse(`${c.slice(0, 23).replace(" ", "T")}Z`), fa = (c) => c.replace(/[._]+/g, " ").trim(), lu = (c) => c.charAt(0).toUpperCase() + c.slice(1), rh = 864e5, Qm = [[60, "second"], [60, "minute"], [24, "hour"], [7, "day"]], Zm = new Intl.RelativeTimeFormat(void 0, { numeric: "auto", style: "short" });
function oh(c, o = Date.now()) {
  let m = (wa(c) - o) / 1e3;
  for (const [r, E] of Qm) {
    if (Math.abs(m) < r) return Zm.format(Math.round(m), E);
    m /= r;
  }
  return "";
}
const ji = (c, o) => new Date(c).toLocaleString(void 0, { ...o, timeZone: "UTC" }), Wl = (c) => ji(c, { day: "numeric", month: "short", year: "numeric" }), Kl = (c) => ji(c, { day: "numeric", month: "short" }), Qs = (c) => ji(c, { hour: "2-digit", minute: "2-digit", hour12: !1 });
function km(c, o = Date.now()) {
  const m = c.slice(0, 10);
  return m === new Date(o).toISOString().slice(0, 10) ? "Today" : m === new Date(o - rh).toISOString().slice(0, 10) ? "Yesterday" : ji(wa(`${m} 00:00:00`), { weekday: "short", day: "numeric", month: "short", year: "numeric" });
}
const _i = (c) => c.slice(11, 23);
function Vm(c) {
  var m, r;
  if (/^[\d#]/.test(c)) return "#";
  const o = c.split(/[\s@._-]+/).filter(Boolean);
  return ((((m = o[0]) == null ? void 0 : m[0]) ?? "?") + (((r = o[1]) == null ? void 0 : r[0]) ?? "")).toUpperCase();
}
const Km = (c) => c.actor_name || (c.actor_type === "system" ? lu(fa(c.actor_id)) || "System" : c.actor_id || "Anonymous"), Zs = (c) => /^\d{4}-\d{2}-\d{2}$/.test(c) && !Number.isNaN(Date.parse(`${c}T00:00:00Z`)), ks = (c) => `${c} 00:00:00`, Jm = (c) => `${new Date(Date.parse(`${c}T00:00:00Z`) + rh).toISOString().slice(0, 10)} 00:00:00`, $m = (c, o = Date.now()) => new Date(o - c * 6e4).toISOString().slice(0, 19).replace("T", " "), Wm = (c, o, m = `${o}s`) => `${c.toLocaleString()} ${c === 1 ? o : m}`, xi = 1e5, Fm = [
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
], Pm = [
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
async function Im(c, o, m) {
  const r = [];
  let E = null;
  do {
    const _ = await c("export", { method: "POST", body: { ...o, cursor: E } });
    r.push(..._.items), m(r.length), E = _.next_cursor;
  } while (E && r.length < xi);
  return { rows: r.slice(0, xi), more: !!E || r.length > xi };
}
function t0(c) {
  let o = c == null ? "" : typeof c == "object" ? JSON.stringify(c) : String(c);
  return /^[=+\-@\t\r]/.test(o) && (o = `'${o}`), /[",\n\r]/.test(o) ? `"${o.replace(/"/g, '""')}"` : o;
}
function a0(c, o) {
  const m = c === "events" ? Fm : Pm;
  return `\uFEFF${[m.join(","), ...o.map((E) => m.map((_) => t0(E[_])).join(","))].join(`\r
`)}\r
`;
}
const e0 = (c) => c.map((o) => {
  const { children: m, ...r } = o;
  return JSON.stringify(r);
}).join(`
`) + `
`;
function Vs(c, o, m) {
  const r = URL.createObjectURL(new Blob([c], { type: m })), E = document.createElement("a");
  E.href = r, E.download = o, E.click(), setTimeout(() => URL.revokeObjectURL(r), 1e3);
}
const l0 = /(-?)(?:([a-z_]+):)?("([^"]*)"?|\S+)/g;
function au(c) {
  const o = [];
  for (const m of c.matchAll(l0)) {
    let r = m[3].startsWith('"') ? m[4] ?? "" : m[3], E = m[2] ?? null;
    E && r.startsWith("//") && (r = `${E}:${r}`, E = null), r && o.push({ field: E, value: r, negated: m[1] === "-", text: m[0] });
  }
  return o;
}
const n0 = (c, o) => au(c).filter((m) => m !== o && m.text !== o.text).map((m) => m.text).join(" "), Ks = (c) => /\s/.test(c) ? `"${c.replace(/"/g, "")}"` : c, dh = [
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
], Is = (c) => dh.filter((o) => o.kinds.includes(c)), u0 = { events: ["origin", "outcome", "session"], requests: ["origin", "session"] }, i0 = (c) => [...Is(c).map((o) => o.field), ...u0[c]], c0 = (c) => {
  var o;
  return ((o = dh.find((m) => m.field === c)) == null ? void 0 : o.label) ?? lu(fa(c));
};
function s0(c, o, m, r = {}) {
  const E = c.startsWith("-"), _ = E ? c.slice(1) : c, R = E ? "-" : "", H = _.indexOf(":");
  if (H < 0)
    return Is(o).filter((B) => B.field.startsWith(_.toLowerCase()) || B.label.toLowerCase().startsWith(_.toLowerCase())).map((B) => ({ insert: `${R}${B.field}:`, label: `${B.field}:`, hint: B.hint }));
  const j = _.slice(0, H), S = _.slice(H + 1).toLowerCase();
  return (() => {
    const B = (U) => (r[U] ?? []).filter((Y) => Y.value).map((Y) => ({ insert: Y.value, label: Y.value, hint: Y.count.toLocaleString() }));
    switch (j) {
      case "action":
        return Object.entries((m == null ? void 0 : m.actions) ?? {}).map(([U, Y]) => ({ insert: U, label: U, hint: Y.title }));
      case "category":
        return [...new Set(Object.values((m == null ? void 0 : m.actions) ?? {}).map((U) => U.category))].map((U) => ({ insert: U, label: U }));
      case "actor_type":
        return Object.entries((m == null ? void 0 : m.actor_types) ?? {}).map(([U, Y]) => ({ insert: U, label: U, hint: Y }));
      case "result":
        return ["success", "failed", "refused"].map((U) => ({ insert: U, label: U }));
      case "method":
        return ["GET", "POST", "PUT", "PATCH", "DELETE"].map((U) => ({ insert: U, label: U }));
      case "status":
        return ["2xx", "4xx", "5xx"].map((U) => ({ insert: U, label: U }));
      case "on":
        return Object.entries((m == null ? void 0 : m.entities) ?? {}).filter(([U]) => !U.includes("_")).map(([U, Y]) => ({ insert: `${U}:`, label: `${U}:`, hint: Y }));
      case "app":
        return B("origin");
      case "service":
        return B("service");
      default:
        return [];
    }
  })().filter((B) => B.insert.toLowerCase().startsWith(S) || B.insert.toLowerCase().split(/[._:]/).some((U) => U.startsWith(S)) || (B.hint ?? "").toLowerCase().split(/\s+/).some((U) => U.startsWith(S))).slice(0, 12).map((B) => ({ ...B, insert: `${R}${j}:${B.insert.endsWith(":") ? B.insert : Ks(B.insert)}` }));
}
const Ti = 6e4, $l = 1440, f0 = [15, 30, 60, 120, 180, 360, 720, 1440, 2880, 10080, 20160, 43200], th = 7, r0 = new Intl.NumberFormat(void 0, { notation: "compact", maximumFractionDigits: 1 });
function o0(c) {
  const o = c.bucket_minutes * Ti, m = new Map(c.buckets.map((E) => [wa(E.at), E.count])), r = [];
  for (let E = Math.floor(wa(c.occurred_from) / o) * o; E < wa(c.occurred_to); E += o)
    r.push({ at: E, count: m.get(E) ?? 0 });
  return r;
}
function d0(c) {
  return c % $l === 0 ? c === $l ? "Daily bars" : `${c / $l}-day bars` : c % 60 === 0 ? c === 60 ? "Hourly bars" : `${c / 60}-hour bars` : `${c}-minute bars`;
}
function Ls(c, o) {
  return o >= $l ? Wl(c) : `${Kl(c)}, ${Qs(c)} – ${Qs(c + o * Ti)}`;
}
function h0(c, o) {
  if (c.length < 2) return [];
  const m = (c[c.length - 1].at - c[0].at) / Ti, r = f0.find((R) => R >= o && R % o === 0 && m / R <= th) ?? o * Math.ceil(c.length / th), E = r >= $l, _ = [];
  return c.forEach((R, H) => {
    if (R.at % (r * Ti) !== 0) return;
    const j = _[_.length - 1], S = !j || Kl(c[j.index].at) !== Kl(R.at);
    _.push({ index: H, top: E ? Kl(R.at) : Qs(R.at), bottom: !E && S ? Kl(R.at) : "" });
  }), _;
}
function v0({ chart: c, noun: o, loading: m }) {
  const r = X.useMemo(() => c ? o0(c) : [], [c]), [E, _] = X.useState(null), R = r.reduce((Y, V) => Y + V.count, 0), H = r.reduce((Y, V) => Math.max(Y, V.count), 0), j = r.find((Y) => Y.count === H && H > 0), S = (c == null ? void 0 : c.bucket_minutes) ?? $l, D = X.useMemo(() => h0(r, S), [r, S]), B = o.replace(/s$/, ""), U = E !== null ? r[E] : void 0;
  return /* @__PURE__ */ f.jsxs("div", { className: "ahv-chart", children: [
    /* @__PURE__ */ f.jsxs("div", { className: "ahv-chart-head", children: [
      /* @__PURE__ */ f.jsxs("span", { children: [
        /* @__PURE__ */ f.jsx("strong", { className: "ahv-num", children: m && !c ? "…" : R.toLocaleString() }),
        " ",
        R === 1 ? B : o,
        c && /* @__PURE__ */ f.jsxs("span", { className: "ahv-dim", children: [
          " · ",
          Kl(wa(c.occurred_from)),
          " – ",
          Wl(wa(c.occurred_to) - 1),
          " UTC"
        ] })
      ] }),
      c && /* @__PURE__ */ f.jsxs("span", { className: "ahv-dim", children: [
        j && /* @__PURE__ */ f.jsxs(f.Fragment, { children: [
          "Peak ",
          /* @__PURE__ */ f.jsx("strong", { className: "ahv-num", children: j.count.toLocaleString() }),
          " at ",
          Ls(j.at, S).split(" – ")[0],
          " · "
        ] }),
        d0(S)
      ] })
    ] }),
    /* @__PURE__ */ f.jsxs(
      "div",
      {
        className: "ahv-chart-plot",
        role: "img",
        "aria-label": `${R.toLocaleString()} ${o}${j ? `, most at ${Ls(j.at, S)} UTC (${j.count})` : ""}`,
        onMouseMove: (Y) => {
          if (!r.length) return;
          const V = Y.currentTarget.getBoundingClientRect();
          _(Math.min(r.length - 1, Math.max(0, Math.floor((Y.clientX - V.left) / V.width * r.length))));
        },
        onMouseLeave: () => _(null),
        children: [
          H > 0 && /* @__PURE__ */ f.jsx("span", { className: "ahv-chart-max ahv-num", children: r0.format(H) }),
          /* @__PURE__ */ f.jsx("svg", { viewBox: `0 0 ${Math.max(r.length, 1)} 100`, preserveAspectRatio: "none", className: "ahv-chart-svg", children: r.map((Y, V) => {
            const K = H ? Math.max(Y.count / H * 100, Y.count ? 2 : 0) : 0;
            return /* @__PURE__ */ f.jsx(
              "rect",
              {
                x: V + 0.12,
                width: 0.76,
                y: 100 - K,
                height: K,
                className: V === E ? "ahv-bar ahv-bar-on" : "ahv-bar"
              },
              Y.at
            );
          }) }),
          !m && R === 0 && /* @__PURE__ */ f.jsxs("span", { className: "ahv-chart-empty", children: [
            "No ",
            o,
            " in this period"
          ] }),
          U && /* @__PURE__ */ f.jsxs("div", { className: "ahv-tip", style: { left: `${(E + 0.5) / r.length * 100}%` }, children: [
            /* @__PURE__ */ f.jsx("strong", { className: "ahv-num", children: U.count ? `${U.count.toLocaleString()} ${U.count === 1 ? B : o}` : `No ${o}` }),
            /* @__PURE__ */ f.jsxs("span", { children: [
              Ls(U.at, S),
              " UTC"
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ f.jsx("div", { className: "ahv-chart-axis", "aria-hidden": "true", children: D.map((Y) => /* @__PURE__ */ f.jsxs("span", { style: { left: `${(Y.index + 0.5) / r.length * 100}%` }, children: [
      Y.top,
      Y.bottom && /* @__PURE__ */ f.jsx("b", { children: Y.bottom })
    ] }, Y.index)) })
  ] });
}
var m0 = fh();
const Ht = (...c) => c.filter(Boolean).join(" "), hh = (c) => se(c) ? c.actor : Km(c), Js = (c, o = {}) => se(c) ? c.actor_label : o[c.actor_type] || lu(fa(c.actor_type)) || "Unknown", $s = {
  sealed: "Sealed: kept unchanged since its minute ended",
  waiting: "Waiting for its seal: each minute is sealed two minutes after it ends"
};
function g0({ value: c, seal: o }) {
  return /* @__PURE__ */ f.jsxs("span", { className: "ahv-when", title: `${c} UTC`, children: [
    /* @__PURE__ */ f.jsxs("span", { className: "ahv-mono", children: [
      _i(c),
      o && /* @__PURE__ */ f.jsx("span", { className: Ht("ahv-seal", o === "waiting" && "ahv-seal-waiting"), title: $s[o], "aria-label": $s[o], children: /* @__PURE__ */ f.jsx(zt, { name: o === "sealed" ? "shield" : "history", size: 11 }) })
    ] }),
    /* @__PURE__ */ f.jsx("span", { className: "ahv-dim", children: oh(c) })
  ] });
}
const p0 = (c) => c ? $s[c] : "";
function y0({ onClick: c, title: o, children: m }) {
  return c ? /* @__PURE__ */ f.jsx(
    "button",
    {
      type: "button",
      className: "ahv-link",
      title: o,
      onClick: (r) => {
        r.stopPropagation(), c();
      },
      onKeyDown: (r) => r.stopPropagation(),
      children: m
    }
  ) : /* @__PURE__ */ f.jsx(f.Fragment, { children: m });
}
function b0({ row: c, actorTypes: o, onFocus: m }) {
  const r = hh(c), E = Js(c, o), _ = c.actor_type !== "system" && c.actor_id && c.actor_id !== r ? c.actor_id : "";
  return /* @__PURE__ */ f.jsxs("span", { className: "ahv-who", children: [
    /* @__PURE__ */ f.jsx("span", { className: Ht("ahv-avatar", c.actor_type === "system" && "ahv-avatar-system"), "aria-hidden": "true", children: Vm(r) }),
    /* @__PURE__ */ f.jsxs("span", { className: "ahv-stack", children: [
      /* @__PURE__ */ f.jsx(y0, { title: `Only activity by ${r}`, onClick: c.actor_id ? m : void 0, children: /* @__PURE__ */ f.jsx("span", { className: "ahv-strong ahv-clip", children: r }) }),
      /* @__PURE__ */ f.jsx("span", { className: "ahv-dim ahv-clip", children: [E, _].filter(Boolean).join(" · ") })
    ] })
  ] });
}
function x0({ row: c }) {
  return /* @__PURE__ */ f.jsxs("span", { className: "ahv-where", children: [
    c.origin && /* @__PURE__ */ f.jsx("span", { className: "ahv-tag", children: fa(c.origin) }),
    c.country && /* @__PURE__ */ f.jsx("span", { className: "ahv-dim", title: c.ip || void 0, children: c.country })
  ] });
}
function tf({ outcome: c }) {
  return c === "success" ? null : /* @__PURE__ */ f.jsx("span", { className: Ht("ahv-tag", c === "failed" ? "ahv-tag-bad" : "ahv-tag-warn"), children: c });
}
const S0 = (c) => c >= 500 ? "ahv-tag-bad" : c >= 400 ? "ahv-tag-warn" : "ahv-tag-ok", vh = ({ status: c }) => /* @__PURE__ */ f.jsx("span", { className: Ht("ahv-tag ahv-mono", S0(c)), children: c }), mh = ({ method: c }) => /* @__PURE__ */ f.jsx("span", { className: Ht("ahv-tag ahv-mono", `ahv-method-${c.toLowerCase()}`), children: c });
function T0({ row: c }) {
  var m;
  const o = c.children_count ?? ((m = c.children) == null ? void 0 : m.length) ?? 0;
  return /* @__PURE__ */ f.jsxs("span", { className: "ahv-what", children: [
    c.importance === "high" && c.outcome === "success" && /* @__PURE__ */ f.jsx("span", { className: "ahv-mark", title: "Worth attention" }),
    c.outcome !== "success" && /* @__PURE__ */ f.jsx(zt, { name: "alert", size: 14, className: c.outcome === "failed" ? "ahv-bad" : "ahv-warn" }),
    /* @__PURE__ */ f.jsx("span", { className: "ahv-sentence", children: c.summary }),
    o > 0 && /* @__PURE__ */ f.jsxs("span", { className: "ahv-count", title: `${o} record change${o === 1 ? "" : "s"} made by the same request`, children: [
      /* @__PURE__ */ f.jsx(zt, { name: "layers", size: 12 }),
      o
    ] })
  ] });
}
function gh({ row: c }) {
  return /* @__PURE__ */ f.jsxs("span", { className: "ahv-what", children: [
    /* @__PURE__ */ f.jsx(mh, { method: c.method }),
    /* @__PURE__ */ f.jsx("span", { className: "ahv-mono ahv-clip", children: c.route }),
    /* @__PURE__ */ f.jsx(vh, { status: c.status }),
    /* @__PURE__ */ f.jsxs("span", { className: "ahv-dim ahv-num", children: [
      c.duration_ms,
      " ms"
    ] })
  ] });
}
function Jl({ tone: c = "plain", children: o, action: m }) {
  return /* @__PURE__ */ f.jsxs("div", { className: Ht("ahv-message", c === "bad" && "ahv-message-bad"), role: c === "bad" ? "alert" : void 0, children: [
    /* @__PURE__ */ f.jsx("span", { children: o }),
    m
  ] });
}
function af({ rows: c = 6 }) {
  return /* @__PURE__ */ f.jsx("div", { className: "ahv-skeleton", "aria-busy": "true", children: Array.from({ length: c }, (o, m) => /* @__PURE__ */ f.jsx("span", {}, m)) });
}
const E0 = 200, ph = X.createContext(null);
function Za({ title: c, children: o }) {
  return /* @__PURE__ */ f.jsxs("section", { className: "ahv-section", children: [
    /* @__PURE__ */ f.jsx("h3", { children: c }),
    o
  ] });
}
function Vl({ items: c }) {
  const o = c.filter(([, m]) => m != null && m !== "");
  return o.length ? /* @__PURE__ */ f.jsx("dl", { className: "ahv-facts", children: o.map(([m, r]) => /* @__PURE__ */ f.jsxs("div", { children: [
    /* @__PURE__ */ f.jsx("dt", { children: m }),
    /* @__PURE__ */ f.jsx("dd", { children: typeof r == "object" ? JSON.stringify(r) : String(r) })
  ] }, m)) }) : null;
}
function j0({ event: c }) {
  const o = c.change_list;
  if (!(o != null && o.length)) return null;
  const m = o.every((E) => E.before === null), r = o.every((E) => E.after === null);
  return /* @__PURE__ */ f.jsx(Za, { title: m ? "Recorded values" : r ? "Values removed" : "Changes", children: /* @__PURE__ */ f.jsx("div", { className: "ahv-scroll-x", children: /* @__PURE__ */ f.jsxs("table", { className: "ahv-changes", children: [
    /* @__PURE__ */ f.jsx("thead", { children: /* @__PURE__ */ f.jsxs("tr", { children: [
      /* @__PURE__ */ f.jsx("th", { children: "Field" }),
      !m && /* @__PURE__ */ f.jsx("th", { children: "Before" }),
      !r && /* @__PURE__ */ f.jsx("th", { children: "After" })
    ] }) }),
    /* @__PURE__ */ f.jsx("tbody", { children: o.map((E) => /* @__PURE__ */ f.jsxs("tr", { children: [
      /* @__PURE__ */ f.jsx("td", { children: E.label }),
      !m && /* @__PURE__ */ f.jsx("td", { className: Ht("ahv-mono", !r && "ahv-before"), children: E.before ?? "—" }),
      !r && /* @__PURE__ */ f.jsx("td", { className: Ht("ahv-mono", !m && "ahv-after"), children: E.after ?? "—" })
    ] }, E.field)) })
  ] }) }) });
}
function _0({ text: c }) {
  const [o, m] = X.useState(!1);
  return /* @__PURE__ */ f.jsxs("button", { type: "button", className: "ahv-button ahv-button-quiet", onClick: () => {
    var r;
    (r = navigator.clipboard) == null || r.writeText(c).then(() => {
      m(!0), setTimeout(() => m(!1), 1500);
    });
  }, children: [
    /* @__PURE__ */ f.jsx(zt, { name: o ? "check" : "copy", size: 14 }),
    o ? "Copied" : "Copy"
  ] });
}
function A0({ row: c }) {
  const [o, m] = X.useState(!1), { children: r, details: E, ..._ } = c, R = JSON.stringify(_, null, 2);
  return /* @__PURE__ */ f.jsxs("section", { className: "ahv-section", children: [
    /* @__PURE__ */ f.jsxs("div", { className: "ahv-row-between", children: [
      /* @__PURE__ */ f.jsxs("button", { type: "button", className: "ahv-disclose", "aria-expanded": o, onClick: () => m((H) => !H), children: [
        /* @__PURE__ */ f.jsx(zt, { name: "chevronDown", size: 14, className: Ht(o && "ahv-turned") }),
        "Full record (JSON)"
      ] }),
      /* @__PURE__ */ f.jsx(_0, { text: R })
    ] }),
    o && /* @__PURE__ */ f.jsx("pre", { className: "ahv-pre", children: R })
  ] });
}
function N0({ open: c, events: o, calls: m, onOpen: r }) {
  const E = [...o, ...m].sort((_, R) => _.occurred_at.localeCompare(R.occurred_at));
  return E.length ? /* @__PURE__ */ f.jsx("ol", { className: "ahv-list", children: E.map((_) => /* @__PURE__ */ f.jsx("li", { children: /* @__PURE__ */ f.jsxs("button", { type: "button", disabled: _.id === c.id, onClick: () => r(_), children: [
    /* @__PURE__ */ f.jsx("span", { className: "ahv-mono ahv-dim", children: _i(_.occurred_at) }),
    se(_) ? /* @__PURE__ */ f.jsxs("span", { className: "ahv-what", children: [
      /* @__PURE__ */ f.jsx("span", { className: "ahv-sentence", children: _.summary }),
      /* @__PURE__ */ f.jsx(tf, { outcome: _.outcome })
    ] }) : /* @__PURE__ */ f.jsx(gh, { row: _ })
  ] }) }, _.id)) }) : /* @__PURE__ */ f.jsx("p", { className: "ahv-dim", children: "Nothing else was recorded for this request." });
}
function z0(c, o) {
  const m = se(o);
  return Ca(`${o.id}`, async () => {
    if (m) return c(`events/${o.id}`, { method: "GET" });
    if (!o.request_id) return { same_request: [], requests: [] };
    const r = (R) => c("search", {
      method: "POST",
      body: { kind: R, filters: { request_id: o.request_id }, limit: E0 }
    }), [E, _] = await Promise.all([r("events"), r("requests")]);
    return { same_request: E.items, requests: _.items.filter((R) => R.id !== o.id) };
  });
}
function yh({ request: c, row: o, onClose: m, onFocus: r, actorTypes: E, entities: _, seal: R }) {
  const [H, j] = X.useState(o);
  X.useEffect(() => j(o), [o]);
  const S = X.useRef(null), D = X.useRef(null), B = X.useRef(m);
  B.current = m;
  const U = H !== null;
  X.useEffect(() => {
    var at, et;
    if (!U) return;
    const V = ((at = S.current) == null ? void 0 : at.getRootNode()) ?? document, K = V.activeElement ?? document.activeElement;
    (et = S.current) == null || et.focus();
    const lt = (G) => {
      if (G.key === "Escape")
        G.stopPropagation(), B.current();
      else if (G.key === "Tab" && D.current) {
        const F = [...D.current.querySelectorAll("button:not(:disabled), [href], input, select, [tabindex]:not([tabindex='-1'])")], J = V.activeElement;
        if (!F.length) return;
        G.shiftKey && J === F[0] ? (G.preventDefault(), F[F.length - 1].focus()) : !G.shiftKey && J === F[F.length - 1] ? (G.preventDefault(), F[0].focus()) : D.current.contains(J) || (G.preventDefault(), F[0].focus());
      }
    };
    return window.addEventListener("keydown", lt, !0), () => {
      var G;
      window.removeEventListener("keydown", lt, !0), (G = K == null ? void 0 : K.focus) == null || G.call(K);
    };
  }, [U]);
  const Y = X.useContext(ph);
  return H ? m0.createPortal(
    /* @__PURE__ */ f.jsxs("div", { className: "ahv ahv-drawer-layer", children: [
      /* @__PURE__ */ f.jsx("div", { className: "ahv-backdrop", onClick: m }),
      /* @__PURE__ */ f.jsxs("aside", { ref: D, className: "ahv-drawer", role: "dialog", "aria-modal": "true", "aria-label": "Activity details", children: [
        /* @__PURE__ */ f.jsx("button", { ref: S, type: "button", className: "ahv-icon-button ahv-drawer-close", onClick: m, "aria-label": "Close", children: /* @__PURE__ */ f.jsx(zt, { name: "close" }) }),
        /* @__PURE__ */ f.jsx(
          O0,
          {
            request: c,
            row: H,
            onOpen: j,
            onFocus: r,
            actorTypes: E,
            entities: _,
            seal: H === o ? R : null
          },
          H.id
        )
      ] })
    ] }),
    Y ?? document.body
  ) : null;
}
function O0({ request: c, row: o, onOpen: m, onFocus: r, actorTypes: E, entities: _ = {}, seal: R }) {
  var U, Y, V, K;
  const H = z0(c, o), j = se(o) ? ((U = H.data) == null ? void 0 : U.event) ?? o : null, S = hh(o), D = j != null && j.target_type ? `${_[j.target_type] ?? fa(j.target_type)} ${j.target_name || j.target_id}` : "", B = `${Wl(wa(o.occurred_at))}, ${_i(o.occurred_at)} UTC`;
  return /* @__PURE__ */ f.jsxs("div", { className: "ahv-drawer-body", children: [
    /* @__PURE__ */ f.jsxs("header", { className: "ahv-drawer-head", children: [
      j ? /* @__PURE__ */ f.jsxs(f.Fragment, { children: [
        /* @__PURE__ */ f.jsxs("div", { className: "ahv-tags", children: [
          /* @__PURE__ */ f.jsx("span", { className: "ahv-tag", children: j.title }),
          /* @__PURE__ */ f.jsx(tf, { outcome: j.outcome }),
          j.importance === "high" && /* @__PURE__ */ f.jsx("span", { className: "ahv-tag ahv-tag-accent", children: "Worth attention" }),
          j.imported && /* @__PURE__ */ f.jsx("span", { className: "ahv-tag", children: "Imported" })
        ] }),
        /* @__PURE__ */ f.jsx("h2", { children: j.summary })
      ] }) : /* @__PURE__ */ f.jsxs(f.Fragment, { children: [
        /* @__PURE__ */ f.jsxs("div", { className: "ahv-tags", children: [
          /* @__PURE__ */ f.jsx(mh, { method: o.method }),
          /* @__PURE__ */ f.jsx(vh, { status: o.status })
        ] }),
        /* @__PURE__ */ f.jsx("h2", { className: "ahv-mono", children: o.route })
      ] }),
      /* @__PURE__ */ f.jsxs("p", { className: "ahv-dim", children: [
        S,
        " · ",
        Js(o, E),
        " · ",
        B
      ] }),
      r && /* @__PURE__ */ f.jsxs("div", { className: "ahv-actions", children: [
        o.actor_id && /* @__PURE__ */ f.jsxs("button", { type: "button", className: "ahv-button", onClick: () => r({ actor_id: o.actor_id }), children: [
          /* @__PURE__ */ f.jsx(zt, { name: "user", size: 14 }),
          "All by ",
          S
        ] }),
        (j == null ? void 0 : j.target_type) && /* @__PURE__ */ f.jsxs(
          "button",
          {
            type: "button",
            className: "ahv-button",
            onClick: () => r({ target_type: j.target_type, target_id: j.target_id }),
            children: [
              /* @__PURE__ */ f.jsx(zt, { name: "history", size: 14 }),
              "Timeline of ",
              D
            ]
          }
        )
      ] })
    ] }),
    j ? /* @__PURE__ */ f.jsxs(f.Fragment, { children: [
      j.outcome !== "success" && j.reason && /* @__PURE__ */ f.jsx(Za, { title: "Reason", children: /* @__PURE__ */ f.jsx("p", { children: j.reason }) }),
      /* @__PURE__ */ f.jsx(j0, { event: j }),
      (Y = j.details) != null && Y.length ? /* @__PURE__ */ f.jsx(Za, { title: "Details", children: /* @__PURE__ */ f.jsx(Vl, { items: j.details.map((lt) => [lt.label, lt.value]) }) }) : j.metadata && !H.loading ? /* @__PURE__ */ f.jsx(Za, { title: "Details", children: /* @__PURE__ */ f.jsx(Vl, { items: Object.entries(j.metadata).map(([lt, at]) => [lu(fa(lt)), at]) }) }) : null,
      (D || j.related.length > 0) && /* @__PURE__ */ f.jsx(Za, { title: "Concerns", children: /* @__PURE__ */ f.jsx(Vl, { items: [
        ["Target", D],
        ...j.related.map(([lt, at]) => [lu(_[lt] ?? fa(lt)), at])
      ] }) })
    ] }) : /* @__PURE__ */ f.jsxs(f.Fragment, { children: [
      /* @__PURE__ */ f.jsx(Za, { title: "Request", children: /* @__PURE__ */ f.jsx(Vl, { items: [["Path", o.path], ["Took", `${o.duration_ms} ms`], ["Service", fa(o.service)]] }) }),
      o.request_body && /* @__PURE__ */ f.jsx(Za, { title: "Sent (secrets masked)", children: /* @__PURE__ */ f.jsx("pre", { className: "ahv-pre", children: JSON.stringify(o.request_body, null, 2) }) })
    ] }),
    o.request_id && /* @__PURE__ */ f.jsx(Za, { title: "Same request", children: H.error ? /* @__PURE__ */ f.jsxs(Jl, { tone: "bad", action: /* @__PURE__ */ f.jsx("button", { type: "button", className: "ahv-button", onClick: H.refresh, children: "Retry" }), children: [
      "Couldn't load: ",
      H.error.message
    ] }) : H.loading && !H.data ? /* @__PURE__ */ f.jsx(af, { rows: 2 }) : /* @__PURE__ */ f.jsx(N0, { open: o, events: ((V = H.data) == null ? void 0 : V.same_request) ?? [], calls: ((K = H.data) == null ? void 0 : K.requests) ?? [], onOpen: m }) }),
    /* @__PURE__ */ f.jsx(Za, { title: "Who and from where", children: /* @__PURE__ */ f.jsx(Vl, { items: [
      ["Who", `${S} (${Js(o, E)}${o.actor_id && o.actor_id !== S ? ` ${o.actor_id}` : ""})`],
      ["App", o.origin && fa(o.origin)],
      ["Country", o.country],
      ["IP address", o.ip],
      ["Device", j ? j.device : o.user_agent],
      ["Session", o.session_id],
      ["Company", o.tenant_id],
      ["Service", fa(o.service)]
    ] }) }),
    /* @__PURE__ */ f.jsx(Za, { title: "Reference", children: /* @__PURE__ */ f.jsx(Vl, { items: [
      ["Record id", o.id],
      ["Request id", o.request_id],
      ["Recorded", `${o.received_at} UTC`],
      ["Integrity", p0(R ?? null)],
      ...j ? [["Action", j.action]] : []
    ] }) }),
    /* @__PURE__ */ f.jsx(A0, { row: j ?? o })
  ] });
}
const ah = 65, Ws = { events: "Events", access_logs: "Requests" }, M0 = 20, eh = (c, o = Date.now()) => (o - Date.parse(`${c.replace(" ", "T")}:00Z`)) / 6e4, D0 = () => new Date(Date.now() - 864e5).toISOString().slice(0, 10);
function R0(c, o, m) {
  var E;
  const r = (E = m == null ? void 0 : m.sealed_until) == null ? void 0 : E[o];
  return r ? c.slice(0, 16) <= r ? "sealed" : "waiting" : null;
}
function U0({ request: c, status: o }) {
  var F, J;
  const [m, r] = X.useState(!1), [E, _] = X.useState(D0), [R, H] = X.useState(!1), [j, S] = X.useState(null), D = X.useRef(null), B = Ca(
    o != null && o.checks ? "integrity" : null,
    () => c("integrity", { method: "GET" })
  ), U = !!(o != null && o.checks && ((F = B.data) != null && F.allowed));
  if (!o) return null;
  const Y = Object.entries(o.sealed_until ?? {}), V = o.last_daily, K = (J = o.stats) == null ? void 0 : J.queued;
  if (!Y.length && o.recording === void 0 && !V) return null;
  const lt = async (ut) => {
    H(!0);
    try {
      S(await ut());
    } catch (q) {
      S({ kind: "error", message: q.message });
    } finally {
      H(!1);
    }
  }, at = () => lt(async () => ({ kind: "day", ...await c("integrity/verify", { method: "POST", body: { day: E } }) })), et = () => lt(async () => {
    const ut = await c(`integrity/seal/${E}`, { method: "GET" });
    return Vs(`${JSON.stringify(ut, null, 2)}
`, `activity-seal-${E}.json`, "application/json"), { kind: "downloaded", day: E };
  }), G = (ut) => lt(async () => {
    let q;
    try {
      q = JSON.parse(await ut.text());
    } catch {
      q = {};
    }
    if (!q || !Array.isArray(q.seals) || !q.seals.length)
      throw new Error(`${ut.name} is not a seal record: choose a proof downloaded here (activity-seal-<day>.json)`);
    const W = await c("integrity/check", { method: "POST", body: { record: q } });
    return { kind: "proof", name: ut.name, day: String(q.day ?? ""), ...W };
  });
  return /* @__PURE__ */ f.jsxs("div", { className: "ahv-status-wrap", children: [
    /* @__PURE__ */ f.jsxs("div", { className: "ahv-status", role: "status", children: [
      /* @__PURE__ */ f.jsx(zt, { name: "shield", size: 14 }),
      o.recording !== void 0 && /* @__PURE__ */ f.jsx("span", { className: Ht("ahv-tag", o.recording ? "ahv-tag-ok" : "ahv-tag-bad"), children: o.recording ? "Recording" : "Not recording" }),
      K !== void 0 && /* @__PURE__ */ f.jsxs("span", { children: [
        "Waiting to be written ",
        /* @__PURE__ */ f.jsx("strong", { className: "ahv-num", children: K.toLocaleString() })
      ] }),
      Y.map(([ut, q]) => /* @__PURE__ */ f.jsxs(
        "span",
        {
          className: Ht(eh(q) > ah && "ahv-warn"),
          title: eh(q) > ah ? "Sealing is behind" : "Every minute up to this one is sealed",
          children: [
            Ws[ut] ?? ut,
            " sealed through ",
            /* @__PURE__ */ f.jsx("strong", { className: "ahv-num", children: q })
          ]
        },
        ut
      )),
      V && /* @__PURE__ */ f.jsxs("span", { children: [
        "Check of ",
        V.day,
        ":",
        " ",
        /* @__PURE__ */ f.jsx("strong", { className: V.ok === !1 ? "ahv-bad" : V.ok ? "ahv-ok" : "ahv-warn", children: V.ok === !1 ? `${V.problems ?? ""} problem(s)`.trim() : V.ok ? "intact" : "not checked" })
      ] }),
      U && /* @__PURE__ */ f.jsx("button", { type: "button", className: "ahv-link-button ahv-push-right", "aria-expanded": m, onClick: () => r((ut) => !ut), children: "Check integrity" })
    ] }),
    m && U && /* @__PURE__ */ f.jsxs("div", { className: "ahv-checks", children: [
      /* @__PURE__ */ f.jsxs("div", { className: "ahv-bar", children: [
        /* @__PURE__ */ f.jsxs("label", { className: "ahv-field", children: [
          /* @__PURE__ */ f.jsx("span", { children: "Day (UTC)" }),
          /* @__PURE__ */ f.jsx(
            "input",
            {
              type: "date",
              className: "ahv-input",
              value: E,
              max: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
              min: "2000-01-01",
              onChange: (ut) => _(ut.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ f.jsxs("button", { type: "button", className: "ahv-button ahv-button-main", disabled: R || !E, onClick: at, children: [
          /* @__PURE__ */ f.jsx(zt, { name: "shield", size: 14 }),
          R ? "Checking…" : "Check this day"
        ] }),
        /* @__PURE__ */ f.jsxs(
          "button",
          {
            type: "button",
            className: "ahv-button",
            disabled: R || !E,
            onClick: et,
            title: "The day's last seal of each table, to keep outside the database",
            children: [
              /* @__PURE__ */ f.jsx(zt, { name: "download", size: 14 }),
              "Download proof"
            ]
          }
        ),
        /* @__PURE__ */ f.jsxs(
          "button",
          {
            type: "button",
            className: "ahv-button",
            disabled: R,
            title: "Compare a proof kept earlier with the database",
            onClick: () => {
              var ut;
              return (ut = D.current) == null ? void 0 : ut.click();
            },
            children: [
              /* @__PURE__ */ f.jsx(zt, { name: "check", size: 14 }),
              "Check a kept proof"
            ]
          }
        ),
        /* @__PURE__ */ f.jsx(
          "input",
          {
            ref: D,
            type: "file",
            accept: "application/json,.json",
            className: "ahv-hidden",
            tabIndex: -1,
            "aria-hidden": "true",
            onChange: (ut) => {
              var W;
              const q = (W = ut.target.files) == null ? void 0 : W[0];
              ut.target.value = "", q && G(q);
            }
          }
        )
      ] }),
      j && /* @__PURE__ */ f.jsx(q0, { verdict: j })
    ] })
  ] });
}
function q0({ verdict: c }) {
  return c.kind === "error" ? /* @__PURE__ */ f.jsx("p", { className: "ahv-bad", role: "alert", children: c.message }) : c.kind === "day" ? /* @__PURE__ */ f.jsxs("div", { role: "status", className: Ht("ahv-verdict", c.ok ? "ahv-verdict-ok" : "ahv-verdict-bad"), children: [
    /* @__PURE__ */ f.jsx("strong", { children: c.ok ? `${c.day}: intact. ${c.rows.toLocaleString()} records in ${c.checked.toLocaleString()} sealed minutes match their seals.` : `${c.day}: ${(c.problems.length + c.more).toLocaleString()} problem(s) found.` }),
    !c.ok && /* @__PURE__ */ f.jsxs("ul", { children: [
      c.problems.slice(0, M0).map((o, m) => /* @__PURE__ */ f.jsxs("li", { children: [
        /* @__PURE__ */ f.jsx("span", { className: "ahv-mono", children: o.window_start }),
        " ",
        Ws[o.table] ?? o.table,
        ": ",
        o.problem
      ] }, m)),
      c.more > 0 && /* @__PURE__ */ f.jsxs("li", { className: "ahv-dim", children: [
        "and ",
        c.more.toLocaleString(),
        " more"
      ] })
    ] })
  ] }) : c.kind === "downloaded" ? /* @__PURE__ */ f.jsx("div", { role: "status", className: "ahv-verdict ahv-verdict-ok", children: /* @__PURE__ */ f.jsxs("strong", { children: [
    "Proof of ",
    c.day,
    " downloaded. Keep it outside this system: checking it later shows any rewrite since."
  ] }) }) : c.mismatches.length ? /* @__PURE__ */ f.jsxs("div", { role: "status", className: "ahv-verdict ahv-verdict-bad", children: [
    /* @__PURE__ */ f.jsxs("strong", { children: [
      c.name,
      ": the database no longer matches this proof of ",
      c.day,
      "."
    ] }),
    /* @__PURE__ */ f.jsx("ul", { children: c.mismatches.map((o, m) => /* @__PURE__ */ f.jsxs("li", { children: [
      /* @__PURE__ */ f.jsx("span", { className: "ahv-mono", children: o.window_start }),
      " ",
      Ws[o.table] ?? o.table,
      ": ",
      o.problem
    ] }, m)) })
  ] }) : /* @__PURE__ */ f.jsx("div", { role: "status", className: "ahv-verdict ahv-verdict-ok", children: /* @__PURE__ */ f.jsxs("strong", { children: [
    c.name,
    ": the database still matches this proof of ",
    c.day,
    "."
  ] }) });
}
function lh(c, o) {
  const m = c.lastIndexOf(" ", o - 1) + 1, r = c.indexOf(" ", o);
  return { start: m, end: r < 0 ? c.length : r, word: c.slice(m, r < 0 ? c.length : r) };
}
function H0({ value: c, onChange: o, onSubmit: m, suggestions: r, placeholder: E, inputRef: _ }) {
  const R = X.useRef(null), H = _ ?? R, j = X.useId(), [S, D] = X.useState(0), [B, U] = X.useState(!1), [Y, V] = X.useState(0), [K, lt] = X.useState(!1), { start: at, end: et, word: G } = lh(c, S), F = B ? r(G) : [], J = F[Math.min(Y, F.length - 1)], ut = (q) => {
    const W = c.slice(et), Mt = q.insert.endsWith(":") ? "" : " ", Ba = `${c.slice(0, at)}${q.insert}${W.startsWith(" ") || !Mt ? "" : Mt}${W}`, aa = at + q.insert.length + (q.insert.endsWith(":") ? 0 : 1);
    o(Ba), V(0), lt(!1), requestAnimationFrame(() => {
      var Tt, ba;
      (Tt = H.current) == null || Tt.focus(), (ba = H.current) == null || ba.setSelectionRange(aa, aa), D(aa);
    });
  };
  return /* @__PURE__ */ f.jsxs("div", { className: "ahv-search", children: [
    /* @__PURE__ */ f.jsxs("span", { className: "ahv-input-icon", children: [
      /* @__PURE__ */ f.jsx(zt, { name: "search", size: 14 }),
      /* @__PURE__ */ f.jsx(
        "input",
        {
          ref: H,
          className: "ahv-input",
          role: "combobox",
          "aria-label": "Search",
          "aria-expanded": F.length > 0,
          "aria-controls": j,
          "aria-autocomplete": "list",
          "aria-activedescendant": F.length && K ? `${j}-${F.indexOf(J)}` : void 0,
          value: c,
          placeholder: E,
          spellCheck: !1,
          onChange: (q) => {
            o(q.target.value), D(q.target.selectionStart ?? q.target.value.length), U(!0), V(0), lt(!1);
          },
          onSelect: (q) => {
            const W = q.currentTarget.selectionStart ?? 0;
            lh(c, W).start !== at && lt(!1), D(W);
          },
          onFocus: () => U(!0),
          onBlur: () => setTimeout(() => {
            U(!1), lt(!1);
          }, 120),
          onKeyDown: (q) => {
            F.length && (q.key === "ArrowDown" || q.key === "ArrowUp") ? (q.preventDefault(), V((W) => K ? (W + (q.key === "ArrowDown" ? 1 : F.length - 1)) % F.length : q.key === "ArrowDown" ? 0 : F.length - 1), lt(!0)) : F.length && K && q.key === "Enter" ? (q.preventDefault(), ut(J)) : q.key === "Escape" ? (U(!1), lt(!1)) : q.key === "Enter" && (U(!1), m());
          }
        }
      )
    ] }),
    F.length > 0 && /* @__PURE__ */ f.jsx("ul", { id: j, role: "listbox", className: "ahv-suggest", children: F.map((q, W) => /* @__PURE__ */ f.jsxs(
      "li",
      {
        id: `${j}-${W}`,
        role: "option",
        "aria-selected": K && q === J,
        className: Ht(K && q === J && "ahv-suggest-on"),
        onMouseDown: (Mt) => {
          Mt.preventDefault(), ut(q);
        },
        onMouseEnter: () => {
          V(W), lt(!0);
        },
        children: [
          /* @__PURE__ */ f.jsx("span", { className: "ahv-mono", children: q.label }),
          q.hint && /* @__PURE__ */ f.jsx("span", { className: "ahv-dim", children: q.hint })
        ]
      },
      q.insert
    )) })
  ] });
}
function ef({ label: c, icon: o, children: m, open: r, setOpen: E, badge: _, disabled: R }) {
  const H = X.useRef(null);
  return X.useEffect(() => {
    if (!r) return;
    const j = (D) => {
      H.current && !D.composedPath().includes(H.current) && E(!1);
    }, S = (D) => D.key === "Escape" && E(!1);
    return document.addEventListener("mousedown", j), document.addEventListener("keydown", S), () => {
      document.removeEventListener("mousedown", j), document.removeEventListener("keydown", S);
    };
  }, [r, E]), /* @__PURE__ */ f.jsxs("div", { className: "ahv-menu", ref: H, children: [
    /* @__PURE__ */ f.jsxs("button", { type: "button", className: "ahv-button", "aria-expanded": r, disabled: R, onClick: () => E(!r), children: [
      /* @__PURE__ */ f.jsx(zt, { name: o, size: 14 }),
      c,
      _ && /* @__PURE__ */ f.jsx("span", { className: "ahv-count", children: _ }),
      /* @__PURE__ */ f.jsx(zt, { name: "chevronDown", size: 14 })
    ] }),
    r && /* @__PURE__ */ f.jsx("div", { className: "ahv-menu-list ahv-menu-panel", children: m })
  ] });
}
function C0({ columns: c, shown: o, onChange: m }) {
  const [r, E] = X.useState(!1);
  return /* @__PURE__ */ f.jsxs(ef, { label: "Columns", icon: "sliders", open: r, setOpen: E, children: [
    /* @__PURE__ */ f.jsx("p", { className: "ahv-dim ahv-small", children: "When, who and what always show." }),
    c.map((_) => /* @__PURE__ */ f.jsxs("label", { className: "ahv-check", children: [
      /* @__PURE__ */ f.jsx(
        "input",
        {
          type: "checkbox",
          checked: o.includes(_.key),
          onChange: (R) => m(R.target.checked ? [...o, _.key] : o.filter((H) => H !== _.key))
        }
      ),
      _.label
    ] }, _.key))
  ] });
}
function w0({ request: c, current: o, onOpen: m }) {
  var et;
  const [r, E] = X.useState(!1), _ = Ca("views", () => c("views", { method: "GET" })), [R, H] = X.useState(""), [j, S] = X.useState(!1), [D, B] = X.useState(!1), [U, Y] = X.useState(null);
  if (!((et = _.data) != null && et.enabled)) return null;
  const V = _.data.views, K = V.find((G) => G.search === o), lt = async (G) => {
    B(!0), Y(null);
    try {
      await G(), _.refresh(), H("");
    } catch (F) {
      Y(F.message);
    } finally {
      B(!1);
    }
  }, at = (G, F = R, J = j) => lt(() => c("views", { method: "POST", body: { id: G, name: F.trim(), search: o, shared: J } }));
  return /* @__PURE__ */ f.jsxs(ef, { label: K ? K.name : "Views", icon: "layers", open: r, setOpen: E, children: [
    V.length ? /* @__PURE__ */ f.jsx("ul", { className: "ahv-views", children: V.map((G) => /* @__PURE__ */ f.jsxs("li", { className: Ht(G === K && "ahv-views-on"), children: [
      /* @__PURE__ */ f.jsxs("button", { type: "button", className: "ahv-views-open", onClick: () => {
        m(G.search), E(!1);
      }, children: [
        /* @__PURE__ */ f.jsx("span", { children: G.name }),
        /* @__PURE__ */ f.jsx("span", { className: "ahv-dim ahv-small", children: G.mine ? G.shared ? "Shared by you" : "Only you" : `Shared by ${G.owner_name}` })
      ] }),
      G.mine && /* @__PURE__ */ f.jsxs("span", { className: "ahv-views-tools", children: [
        G.search !== o && /* @__PURE__ */ f.jsx(
          "button",
          {
            type: "button",
            className: "ahv-icon-button",
            title: "Save the current search into this view",
            disabled: D,
            onClick: () => at(G.id, G.name, G.shared),
            children: /* @__PURE__ */ f.jsx(zt, { name: "refresh", size: 14 })
          }
        ),
        /* @__PURE__ */ f.jsx(
          "button",
          {
            type: "button",
            className: "ahv-icon-button",
            title: "Remove this view",
            disabled: D,
            onClick: () => lt(() => c(`views/${G.id}`, { method: "DELETE" })),
            children: /* @__PURE__ */ f.jsx(zt, { name: "close", size: 14 })
          }
        )
      ] })
    ] }, G.id)) }) : /* @__PURE__ */ f.jsx("p", { className: "ahv-dim ahv-small", children: "No saved views yet. Save the current search to come back to it." }),
    /* @__PURE__ */ f.jsxs("form", { className: "ahv-views-save", onSubmit: (G) => {
      G.preventDefault(), R.trim() && at();
    }, children: [
      /* @__PURE__ */ f.jsx(
        "input",
        {
          className: "ahv-input",
          value: R,
          maxLength: 80,
          placeholder: "Name this search",
          "aria-label": "View name",
          onChange: (G) => H(G.target.value)
        }
      ),
      /* @__PURE__ */ f.jsxs("label", { className: "ahv-check", children: [
        /* @__PURE__ */ f.jsx("input", { type: "checkbox", checked: j, onChange: (G) => S(G.target.checked) }),
        "Share with my team"
      ] }),
      /* @__PURE__ */ f.jsx("button", { type: "submit", className: "ahv-button ahv-button-main", disabled: D || !R.trim(), children: "Save view" }),
      U && /* @__PURE__ */ f.jsx("span", { className: "ahv-bad ahv-small", children: U })
    ] })
  ] });
}
const nh = [
  { value: "important", label: "Important", hint: "What people did, without the details behind it" },
  { value: "all", label: "All", hint: "Every record, each request's row changes inside its event" },
  { value: "problems", label: "Problems", hint: "Only what failed or was refused" }
], B0 = [
  { label: "All requests", search: {} },
  { label: "Changes only", search: { filters: { method: ["POST", "PUT", "PATCH", "DELETE"] } } },
  { label: "Errors", search: { status_from: 400 } }
], Fs = [
  { value: "1h", label: "Last hour", minutes: 60 },
  { value: "24h", label: "Last 24 hours", minutes: 1440 },
  { value: "7d", label: "Last 7 days", minutes: 10080 },
  { value: "30d", label: "Last 30 days", minutes: 43200 },
  { value: "all", label: "All time" },
  { value: "custom", label: "Dates…" }
], uh = {
  events: [
    { key: "where", label: "Where" },
    { key: "concerning", label: "Concerning" },
    { key: "result", label: "Result" },
    { key: "service", label: "Service" },
    { key: "ip", label: "IP address" }
  ],
  requests: [{ key: "where", label: "Where" }, { key: "service", label: "Service" }, { key: "ip", label: "IP address" }]
}, ih = ["where"], Y0 = [], bh = "activity-hub-columns", Si = ["kind", "view", "p", "q", "range", "from", "to", "cols"], eu = (c) => c ? "all" : "7d";
function ch(c, o) {
  const m = (_) => {
    const R = c.get(_) ?? "";
    return Zs(R) ? R : "";
  }, r = m("from"), E = m("to");
  return { q: c.get("q") ?? "", from: r, to: E, range: c.get("range") || (r || E ? "custom" : eu(o)) };
}
function G0(c) {
  var m;
  if (c.range === "custom")
    return { occurred_from: Zs(c.from) ? ks(c.from) : void 0, occurred_to: Zs(c.to) ? Jm(c.to) : void 0 };
  const o = (m = Fs.find((r) => r.value === c.range)) == null ? void 0 : m.minutes;
  return o ? { occurred_from: `${$m(o).slice(0, 16)}:00` } : {};
}
function L0(c, o, m, r, E) {
  const _ = { ...(m == null ? void 0 : m.search.filters) ?? {} }, R = { kind: c, filters: _, query: r.q.trim() || void 0, ...G0(r) };
  return c === "events" ? (R.view = o, R.action = m == null ? void 0 : m.search.action, E && Object.assign(R, { related_type: E.type, related_id: E.id })) : (R.status_from = m == null ? void 0 : m.search.status_from, E && (_.actor_id = E.id)), R;
}
const X0 = (c) => {
  const o = new URLSearchParams();
  return c.forEach((m, r) => Si.includes(r) && o.set(r, m)), o.toString();
};
function Q0() {
  try {
    return JSON.parse(localStorage.getItem(bh) ?? "null") ?? ih;
  } catch {
    return ih;
  }
}
function Z0({
  request: c,
  title: o = "Activity Log",
  description: m,
  presets: r = Y0,
  kinds: E = ["events", "requests"],
  entity: _,
  params: R,
  onParamsChange: H,
  canExport: j = !1,
  showStatus: S = !0,
  pageSize: D = 100,
  liveEveryMs: B = 5e3,
  className: U
}) {
  var fe, fu, en, ln, il;
  const [Y, V] = X.useState(() => new URLSearchParams()), K = R ?? Y, lt = X.useCallback((T) => H ? H(T) : V(T), [H]), at = K.get("kind") === "requests" && E.includes("requests") ? "requests" : E[0], et = ((fe = nh.find((T) => T.value === K.get("view"))) == null ? void 0 : fe.value) ?? "important", G = X.useMemo(() => at === "events" ? [{ label: "Everything", search: {} }, ...r] : B0, [at, r]), F = Math.min(Math.max(Number(K.get("p")) || 0, 0), G.length - 1), J = K.has("cols") ? (K.get("cols") || "").split(",").filter(Boolean) : Q0(), ut = uh[at].filter((T) => J.includes(T.key)), q = X.useMemo(() => ch(K, _), [K, _]), [W, Mt] = X.useState(q), [Ba, aa] = X.useState(K.toString());
  Ba !== K.toString() && (aa(K.toString()), Mt(q));
  const [Tt, ba] = X.useState(!1), [Ma, Ct] = X.useState(null), [A, C] = X.useState(null), [P, pt] = X.useState(!1), [h, M] = X.useState(null), L = X.useRef(null), [, w] = X.useState(0);
  X.useEffect(() => {
    const T = setInterval(() => w((it) => it + 1), 3e4);
    return () => clearInterval(T);
  }, []);
  const k = X.useMemo(
    () => L0(at, et, G[F], q, _),
    [at, et, G, F, q, _]
  ), ot = JSON.stringify(k), Z = Xm(c, k, D, Tt, B), Kt = X.useRef(null), yt = Ca(ot, () => {
    var bt;
    const T = ot, it = !k.occurred_from && ((bt = Kt.current) == null ? void 0 : bt.key) === T;
    return c("chart", { method: "POST", body: it ? { ...k, occurred_from: Kt.current.from } : k }).then((ct) => (k.occurred_from || (Kt.current = { key: T, from: ct.occurred_from }), ct));
  }, Tt ? B : void 0), la = Ca("catalog", () => c("catalog", { method: "GET" })), tl = Ca(S ? "status" : null, () => c("status", { method: "GET" }), 6e4), Ue = (T) => R0(T.received_at, se(T) ? "events" : "access_logs", tl.data), al = (T) => () => c("values", { method: "POST", body: { ...k, field: T } }).then((it) => it.values), Fl = Ca(`${ot}|service`, al("service")), Pl = Ca(`${ot}|origin`, al("origin")), nu = (T = {}) => {
    const it = new URLSearchParams(K);
    for (const He of Si) it.delete(He);
    const bt = T.kind ?? at;
    let ct = T.draft ?? W;
    if (bt !== at) {
      const He = new Set(i0(bt));
      ct = { ...ct, q: au(ct.q).filter((Ce) => !Ce.field || He.has(Ce.field)).map((Ce) => Ce.text).join(" ") };
    }
    bt !== E[0] && it.set("kind", bt), (T.view ?? et) !== "important" && it.set("view", T.view ?? et);
    const Ra = T.preset ?? (T.kind && T.kind !== at ? 0 : F);
    return Ra && it.set("p", String(Ra)), ct.q.trim() && it.set("q", ct.q.trim()), ct.range !== eu(_) && it.set("range", ct.range), ct.range === "custom" && (ct.from && it.set("from", ct.from), ct.to && it.set("to", ct.to)), (T.columns || K.has("cols")) && it.set("cols", (T.columns ?? J).join(",")), it;
  }, ra = (T = {}) => {
    T.draft && Mt(T.draft), lt(nu(T));
  }, xa = (T) => {
    try {
      localStorage.setItem(bh, JSON.stringify(T));
    } catch {
    }
    ra({ draft: q, columns: T });
  }, Ai = (T, it) => {
    const bt = au(q.q).filter((ct) => ct.field !== T).map((ct) => ct.text);
    ra({ draft: { ...q, q: [...bt, `${T}:${Ks(it)}`].join(" ") } });
  }, Il = (T) => {
    Ct(null), T.actor_id ? Ai("actor", T.actor_id) : T.target_type && T.target_id && ra({
      kind: "events",
      view: "all",
      preset: 0,
      draft: { q: `on:${T.target_type}:${Ks(T.target_id)}`, range: "all", from: "", to: "" }
    });
  }, uu = (T) => {
    const it = W.q.trim();
    Mt({ ...W, q: `${it ? `${it} ` : ""}${T}:` }), requestAnimationFrame(() => {
      const bt = L.current;
      bt && (bt.focus(), bt.setSelectionRange(bt.value.length, bt.value.length));
    });
  }, el = W.q.trim() !== q.q.trim() || W.range !== q.range || W.from !== q.from || W.to !== q.to, qe = !!(W.range === "custom" && W.from && W.to && W.to < W.from), ll = X.useRef(null), iu = X.useRef(null), { hasMore: cu, loadMore: ka, more: Rt, pageCount: Da } = Z;
  X.useEffect(() => {
    if (!ll.current || !cu || Rt.loading || Rt.error || Da >= Xs) return;
    const T = new IntersectionObserver(([it]) => it.isIntersecting && ka(), { root: iu.current, rootMargin: "240px" });
    return T.observe(ll.current), () => T.disconnect();
  }, [cu, ka, Rt.loading, Rt.error, Da, Z.rows.length]);
  const Ft = async (T) => {
    pt(!1), C(0);
    try {
      const { rows: it, more: bt } = await Im(c, k, C);
      bt && M(`Only the newest ${xi.toLocaleString()} rows were exported. Narrow the dates for the rest.`);
      const ct = (/* @__PURE__ */ new Date()).toISOString().slice(0, 16).replace(/[-:T]/g, ""), Ra = `activity-${_ ? `${_.type}-${_.id}-` : ""}${at}-${ct}`;
      T === "csv" ? Vs(a0(at, it), `${Ra}.csv`, "text/csv;charset=utf-8") : Vs(e0(it), `${Ra}.jsonl`, "application/x-ndjson");
    } catch (it) {
      M(`Export failed: ${it.message}`);
    } finally {
      C(null);
    }
  }, tn = at === "events" ? "events" : "requests", an = ((fu = la.data) == null ? void 0 : fu.actor_types) ?? {}, su = ((en = la.data) == null ? void 0 : en.entities) ?? {}, nl = (T) => {
    var it, bt;
    if (T.field === "action") return ((bt = (it = la.data) == null ? void 0 : it.actions[T.value]) == null ? void 0 : bt.title) ?? T.value;
    if (T.field === "actor_type") return an[T.value] ?? T.value;
    if (T.field === "on") {
      const [ct, ...Ra] = T.value.split(":");
      return `${su[ct] ?? fa(ct)} ${Ra.join(":")}`;
    }
    return T.value;
  }, oa = Z.rows, Va = { service: Fl.data ?? [], origin: Pl.data ?? [] }, ul = 3 + ut.length;
  return _ && !(_.type && _.id) ? /* @__PURE__ */ f.jsx("div", { className: Ht("ahv ahv-log", U), children: /* @__PURE__ */ f.jsxs(Jl, { children: [
    "Nothing to show: no ",
    _.type || "record",
    " chosen."
  ] }) }) : /* @__PURE__ */ f.jsxs("div", { className: Ht("ahv ahv-log", U), children: [
    /* @__PURE__ */ f.jsxs("header", { className: "ahv-head", children: [
      /* @__PURE__ */ f.jsxs("div", { children: [
        /* @__PURE__ */ f.jsxs("h2", { className: "ahv-title", children: [
          /* @__PURE__ */ f.jsx(zt, { name: "log", size: 18 }),
          _ && o === "Activity Log" ? "Activity" : o
        ] }),
        /* @__PURE__ */ f.jsx("p", { className: "ahv-dim", children: m ?? (_ ? `Everything about ${_.label}, and the API requests it made itself. Times are UTC.` : "Every action and API request, kept permanently and sealed. Times are UTC.") })
      ] }),
      /* @__PURE__ */ f.jsxs("div", { className: "ahv-actions", children: [
        !_ && /* @__PURE__ */ f.jsx(
          w0,
          {
            request: c,
            current: X0(nu({ draft: q })),
            onOpen: (T) => {
              const it = new URLSearchParams(K);
              for (const bt of Si) it.delete(bt);
              new URLSearchParams(T).forEach((bt, ct) => Si.includes(ct) && it.set(ct, bt)), lt(it);
            }
          }
        ),
        /* @__PURE__ */ f.jsx(C0, { columns: uh[at], shown: J, onChange: xa }),
        j && /* @__PURE__ */ f.jsxs(
          ef,
          {
            label: A === null ? "Export" : `Exporting… ${A.toLocaleString()}`,
            icon: "download",
            open: P,
            setOpen: pt,
            disabled: A !== null || !oa.length,
            children: [
              /* @__PURE__ */ f.jsx("button", { type: "button", role: "menuitem", onClick: () => Ft("csv"), children: "CSV, for spreadsheets" }),
              /* @__PURE__ */ f.jsx("button", { type: "button", role: "menuitem", onClick: () => Ft("jsonl"), children: "JSON Lines, for other tools" })
            ]
          }
        ),
        /* @__PURE__ */ f.jsxs(
          "button",
          {
            type: "button",
            className: Ht("ahv-button", Tt && "ahv-button-live"),
            "aria-pressed": Tt,
            title: "Check for new activity every few seconds",
            onClick: () => ba((T) => !T),
            children: [
              /* @__PURE__ */ f.jsx(zt, { name: "live", size: 14, className: Ht(Tt && "ahv-pulse") }),
              Tt ? "Live" : "Go live"
            ]
          }
        ),
        /* @__PURE__ */ f.jsxs(
          "button",
          {
            type: "button",
            className: "ahv-button",
            disabled: Z.refreshing && !Z.error,
            onClick: () => {
              Z.refresh(), yt.refresh();
            },
            children: [
              /* @__PURE__ */ f.jsx(zt, { name: "refresh", size: 14, className: Ht(Z.refreshing && !Tt && "ahv-spin") }),
              "Refresh"
            ]
          }
        )
      ] })
    ] }),
    S && !_ && /* @__PURE__ */ f.jsx(U0, { request: c, status: tl.data }),
    /* @__PURE__ */ f.jsxs("div", { className: "ahv-filters", children: [
      /* @__PURE__ */ f.jsxs("div", { className: "ahv-bar", children: [
        E.length > 1 && /* @__PURE__ */ f.jsx("div", { className: "ahv-segment", role: "group", "aria-label": "Records", children: E.map((T) => /* @__PURE__ */ f.jsx("button", { type: "button", "aria-pressed": at === T, onClick: () => ra({ kind: T, draft: q }), children: T === "events" ? "Events" : "API requests" }, T)) }),
        at === "events" && /* @__PURE__ */ f.jsx("div", { className: "ahv-segment", role: "group", "aria-label": "Show", children: nh.map((T) => /* @__PURE__ */ f.jsx(
          "button",
          {
            type: "button",
            title: T.hint,
            "aria-pressed": et === T.value,
            onClick: () => ra({ view: T.value, draft: q }),
            children: T.label
          },
          T.value
        )) }),
        G.length > 1 && /* @__PURE__ */ f.jsx("div", { className: "ahv-chips", role: "group", "aria-label": "Presets", children: G.map((T, it) => /* @__PURE__ */ f.jsx(
          "button",
          {
            type: "button",
            className: "ahv-chip",
            "aria-pressed": F === it,
            onClick: () => ra({ preset: it, draft: q }),
            children: T.label
          },
          T.label
        )) })
      ] }),
      /* @__PURE__ */ f.jsxs("div", { className: "ahv-searchbar", children: [
        /* @__PURE__ */ f.jsx(
          H0,
          {
            value: W.q,
            inputRef: L,
            onChange: (T) => Mt({ ...W, q: T }),
            onSubmit: () => !qe && ra({ draft: W }),
            suggestions: (T) => s0(T, at, la.data, Va),
            placeholder: at === "events" ? "Search: words, or actor:… action:trade.* -result:success on:account:100234" : "Search: words, or actor:… method:POST status:4xx route:/trading/*"
          }
        ),
        /* @__PURE__ */ f.jsx(
          "select",
          {
            className: "ahv-input ahv-range",
            value: W.range,
            "aria-label": "When",
            onChange: (T) => Mt({ ...W, range: T.target.value }),
            children: Fs.map((T) => /* @__PURE__ */ f.jsx("option", { value: T.value, children: T.label }, T.value))
          }
        ),
        W.range === "custom" && /* @__PURE__ */ f.jsxs("span", { className: "ahv-pair", children: [
          /* @__PURE__ */ f.jsx(
            "input",
            {
              type: "date",
              className: "ahv-input",
              value: W.from,
              "aria-label": "From (UTC)",
              "aria-invalid": qe || void 0,
              onChange: (T) => Mt({ ...W, from: T.target.value })
            }
          ),
          /* @__PURE__ */ f.jsx(
            "input",
            {
              type: "date",
              className: "ahv-input",
              value: W.to,
              "aria-label": "To (UTC)",
              "aria-invalid": qe || void 0,
              onChange: (T) => Mt({ ...W, to: T.target.value })
            }
          )
        ] }),
        /* @__PURE__ */ f.jsx("button", { type: "button", className: "ahv-button ahv-button-main", disabled: qe, onClick: () => ra({ draft: W }), children: "Search" })
      ] }),
      qe && /* @__PURE__ */ f.jsx("em", { className: "ahv-bad ahv-small", children: "The end date is before the start date" }),
      /* @__PURE__ */ f.jsxs("div", { className: "ahv-bar ahv-add", children: [
        /* @__PURE__ */ f.jsx("span", { className: "ahv-dim ahv-small", children: "Add" }),
        Is(at).filter((T) => !(_ && (T.field === "on" || at === "requests" && T.field === "actor"))).slice(0, 8).map((T) => /* @__PURE__ */ f.jsx("button", { type: "button", className: "ahv-link-button", title: T.hint, onClick: () => uu(T.field), children: T.label }, T.field)),
        el && /* @__PURE__ */ f.jsx("span", { className: "ahv-warn ahv-small ahv-push-right", children: "Not searched yet: press Enter or Search" })
      ] }),
      (au(q.q).length > 0 || q.range !== eu(_)) && /* @__PURE__ */ f.jsxs("div", { className: "ahv-applied", children: [
        au(q.q).map((T) => /* @__PURE__ */ f.jsxs("span", { className: Ht("ahv-pill", T.negated && "ahv-pill-not"), children: [
          /* @__PURE__ */ f.jsxs("span", { className: "ahv-dim", children: [
            T.negated ? "Not " : "",
            T.field ? `${c0(T.field)}:` : "Text:"
          ] }),
          " ",
          nl(T),
          /* @__PURE__ */ f.jsx("button", { type: "button", "aria-label": `Remove ${T.text}`, onClick: () => ra({ draft: { ...q, q: n0(q.q, T) } }), children: /* @__PURE__ */ f.jsx(zt, { name: "close", size: 12 }) })
        ] }, T.text)),
        q.range !== eu(_) && /* @__PURE__ */ f.jsxs("span", { className: "ahv-pill", children: [
          /* @__PURE__ */ f.jsx("span", { className: "ahv-dim", children: "When:" }),
          " ",
          q.range === "custom" ? [q.from && Wl(wa(ks(q.from))), q.to && Wl(wa(ks(q.to)))].filter(Boolean).join(" – ") || "Any date" : (ln = Fs.find((T) => T.value === q.range)) == null ? void 0 : ln.label,
          /* @__PURE__ */ f.jsx(
            "button",
            {
              type: "button",
              "aria-label": "Remove the time range",
              onClick: () => ra({ draft: { ...q, range: eu(_), from: "", to: "" } }),
              children: /* @__PURE__ */ f.jsx(zt, { name: "close", size: 12 })
            }
          )
        ] }),
        /* @__PURE__ */ f.jsx("button", { type: "button", className: "ahv-link-button", onClick: () => ra({ preset: 0, draft: ch(new URLSearchParams(), _) }), children: "Clear all" })
      ] })
    ] }),
    yt.error && !yt.data ? null : /* @__PURE__ */ f.jsx(v0, { chart: yt.data, noun: tn, loading: yt.loading }),
    h && /* @__PURE__ */ f.jsx(Jl, { action: /* @__PURE__ */ f.jsx("button", { type: "button", className: "ahv-icon-button", "aria-label": "Dismiss", onClick: () => M(null), children: /* @__PURE__ */ f.jsx(zt, { name: "close", size: 14 }) }), children: h }),
    Z.error && oa.length > 0 && /* @__PURE__ */ f.jsxs(Jl, { tone: "bad", action: /* @__PURE__ */ f.jsx("button", { type: "button", className: "ahv-button", onClick: Z.refresh, children: "Retry" }), children: [
      "Couldn't load newer activity: ",
      Z.error.message
    ] }),
    Z.error && !oa.length ? /* @__PURE__ */ f.jsx(Jl, { tone: "bad", action: /* @__PURE__ */ f.jsx("button", { type: "button", className: "ahv-button", onClick: Z.refresh, children: "Retry" }), children: Z.error.message }) : Z.loading ? /* @__PURE__ */ f.jsx(af, {}) : oa.length ? /* @__PURE__ */ f.jsxs("div", { className: "ahv-table-wrap", ref: iu, children: [
      /* @__PURE__ */ f.jsxs("table", { className: "ahv-table", children: [
        /* @__PURE__ */ f.jsx("thead", { children: /* @__PURE__ */ f.jsxs("tr", { children: [
          /* @__PURE__ */ f.jsx("th", { children: "When (UTC)" }),
          /* @__PURE__ */ f.jsx("th", { children: "Who" }),
          /* @__PURE__ */ f.jsx("th", { children: at === "events" ? "What happened" : "Request" }),
          ut.map((T) => /* @__PURE__ */ f.jsx("th", { children: T.label }, T.key))
        ] }) }),
        /* @__PURE__ */ f.jsx("tbody", { children: oa.map((T, it) => {
          var bt;
          return /* @__PURE__ */ f.jsxs(X.Fragment, { children: [
            T.occurred_at.slice(0, 10) !== ((bt = oa[it - 1]) == null ? void 0 : bt.occurred_at.slice(0, 10)) && /* @__PURE__ */ f.jsx("tr", { className: "ahv-day", children: /* @__PURE__ */ f.jsx("td", { colSpan: ul, children: km(T.occurred_at) }) }),
            /* @__PURE__ */ f.jsxs(
              "tr",
              {
                tabIndex: 0,
                className: Ht("ahv-row", se(T) && T.outcome !== "success" && "ahv-row-problem"),
                onClick: () => Ct(T),
                onKeyDown: (ct) => {
                  ct.target === ct.currentTarget && (ct.key === "Enter" || ct.key === " ") && (ct.preventDefault(), Ct(T));
                },
                children: [
                  /* @__PURE__ */ f.jsx("td", { children: /* @__PURE__ */ f.jsx(g0, { value: T.occurred_at, seal: Ue(T) }) }),
                  /* @__PURE__ */ f.jsx("td", { children: /* @__PURE__ */ f.jsx(
                    b0,
                    {
                      row: T,
                      actorTypes: an,
                      onFocus: _ && at === "requests" ? void 0 : () => Il({ actor_id: T.actor_id })
                    }
                  ) }),
                  /* @__PURE__ */ f.jsx("td", { children: se(T) ? /* @__PURE__ */ f.jsx(T0, { row: T }) : /* @__PURE__ */ f.jsx(gh, { row: T }) }),
                  ut.map((ct) => /* @__PURE__ */ f.jsx("td", { className: "ahv-cell", children: ct.key === "where" ? /* @__PURE__ */ f.jsx(x0, { row: T }) : ct.key === "service" ? /* @__PURE__ */ f.jsx("span", { className: "ahv-dim", children: fa(T.service) }) : ct.key === "ip" ? /* @__PURE__ */ f.jsx("span", { className: "ahv-mono ahv-dim", children: T.ip || "—" }) : se(T) ? ct.key === "result" ? T.outcome === "success" ? /* @__PURE__ */ f.jsx("span", { className: "ahv-dim", children: "success" }) : /* @__PURE__ */ f.jsx(tf, { outcome: T.outcome }) : T.target_type ? /* @__PURE__ */ f.jsxs("span", { children: [
                    su[T.target_type] ?? fa(T.target_type),
                    " ",
                    /* @__PURE__ */ f.jsx("span", { className: "ahv-mono", children: T.target_name || T.target_id })
                  ] }) : "—" : null }, ct.key))
                ]
              }
            )
          ] }, T.id);
        }) })
      ] }),
      /* @__PURE__ */ f.jsx("div", { ref: ll, "aria-hidden": "true" })
    ] }) : /* @__PURE__ */ f.jsxs("div", { className: "ahv-empty", children: [
      /* @__PURE__ */ f.jsx(zt, { name: "log", size: 28 }),
      /* @__PURE__ */ f.jsxs("strong", { children: [
        "No ",
        tn,
        " match"
      ] }),
      /* @__PURE__ */ f.jsx("span", { className: "ahv-dim", children: at === "events" && et === "important" ? "Try All, or a wider time range." : "Try a wider time range or fewer filters." })
    ] }),
    oa.length > 0 && /* @__PURE__ */ f.jsxs("footer", { className: "ahv-foot", children: [
      /* @__PURE__ */ f.jsxs("span", { className: "ahv-dim ahv-num", children: [
        Wm(oa.length, tn.slice(0, -1)),
        " shown",
        Tt ? " · Live keeps the newest page" : Z.trimmed ? " · the newest were let go to keep the list light; Refresh brings them back" : Z.hasMore ? "" : " · that is all of them"
      ] }),
      Rt.error && /* @__PURE__ */ f.jsxs("span", { className: "ahv-bad ahv-small", children: [
        "Couldn't load more: ",
        Rt.error.message
      ] }),
      Z.hasMore && /* @__PURE__ */ f.jsx("button", { type: "button", className: "ahv-button", onClick: ka, disabled: Rt.loading, children: Rt.loading ? "Loading…" : "Load more" })
    ] }),
    /* @__PURE__ */ f.jsx(
      yh,
      {
        request: c,
        row: Ma,
        onClose: () => Ct(null),
        onFocus: _ ? void 0 : Il,
        actorTypes: an,
        entities: (il = la.data) == null ? void 0 : il.entities,
        seal: Ma ? Ue(Ma) : null
      }
    )
  ] });
}
const sh = 500;
function k0({ request: c, entity: o, view: m = "all", action: r, newestFirst: E = !1, more: _, className: R }) {
  var V, K, lt, at;
  const H = o.type && o.id ? `${o.type}:${o.id}:${m}:${r ?? ""}` : null, j = Ca(H, () => c("search", {
    method: "POST",
    body: { kind: "events", filters: {}, related_type: o.type, related_id: o.id, view: m, action: r, limit: sh }
  })), S = Ca("catalog", () => c("catalog", { method: "GET" })), [D, B] = X.useState(null), U = ((V = j.data) == null ? void 0 : V.items) ?? [], Y = E ? U : [...U].reverse();
  return /* @__PURE__ */ f.jsxs("div", { className: Ht("ahv ahv-timeline", R), children: [
    j.error ? /* @__PURE__ */ f.jsxs(Jl, { tone: "bad", action: /* @__PURE__ */ f.jsx("button", { type: "button", className: "ahv-button", onClick: j.refresh, children: "Retry" }), children: [
      "Couldn't load: ",
      j.error.message
    ] }) : j.loading && !j.data ? /* @__PURE__ */ f.jsx(af, { rows: 4 }) : Y.length ? /* @__PURE__ */ f.jsxs(f.Fragment, { children: [
      ((K = j.data) == null ? void 0 : K.next_cursor) && /* @__PURE__ */ f.jsxs("p", { className: "ahv-dim ahv-small", children: [
        "Showing the newest ",
        sh,
        " steps.",
        _ && /* @__PURE__ */ f.jsxs(f.Fragment, { children: [
          " ",
          _
        ] })
      ] }),
      /* @__PURE__ */ f.jsx("ol", { className: "ahv-steps", children: Y.map((et) => {
        var J;
        const G = et.outcome === "failed" ? "bad" : et.outcome === "refused" ? "warn" : et.importance === "high" ? "accent" : "plain", F = et.children_count ?? ((J = et.children) == null ? void 0 : J.length) ?? 0;
        return /* @__PURE__ */ f.jsxs("li", { className: `ahv-step ahv-step-${G}`, children: [
          /* @__PURE__ */ f.jsx("span", { className: "ahv-step-dot", "aria-hidden": "true" }),
          /* @__PURE__ */ f.jsxs("button", { type: "button", className: "ahv-step-body", onClick: () => B(et), children: [
            /* @__PURE__ */ f.jsxs("span", { className: "ahv-step-top", children: [
              /* @__PURE__ */ f.jsx("span", { className: "ahv-strong", children: et.title }),
              /* @__PURE__ */ f.jsxs("span", { className: "ahv-dim ahv-num", title: `${et.occurred_at} UTC`, children: [
                Wl(wa(et.occurred_at)),
                ", ",
                _i(et.occurred_at),
                " · ",
                oh(et.occurred_at)
              ] })
            ] }),
            /* @__PURE__ */ f.jsx("span", { className: "ahv-sentence", children: et.summary }),
            /* @__PURE__ */ f.jsxs("span", { className: "ahv-dim ahv-small", children: [
              [`${et.actor} · ${et.actor_label}`, et.origin && fa(et.origin), et.country, et.ip].filter(Boolean).join(" · "),
              F > 0 && /* @__PURE__ */ f.jsxs(f.Fragment, { children: [
                " · ",
                /* @__PURE__ */ f.jsx(zt, { name: "layers", size: 12 }),
                " ",
                F,
                " record change",
                F === 1 ? "" : "s"
              ] })
            ] })
          ] })
        ] }, et.id);
      }) })
    ] }) : /* @__PURE__ */ f.jsx("p", { className: "ahv-dim", children: "Nothing has been recorded about this yet." }),
    /* @__PURE__ */ f.jsx(
      yh,
      {
        request: c,
        row: D,
        onClose: () => B(null),
        actorTypes: (lt = S.data) == null ? void 0 : lt.actor_types,
        entities: (at = S.data) == null ? void 0 : at.entities
      }
    )
  ] });
}
const lf = class lf extends HTMLElement {
  get request() {
    return this.requester;
  }
  set request(o) {
    this.requester = o, this.render();
  }
  connectedCallback() {
    if (!this.root) {
      const o = this.shadowRoot ?? this.attachShadow({ mode: "open" }), m = document.createElement("style");
      m.textContent = Gm;
      const r = document.createElement("div");
      this.panel = document.createElement("div"), o.replaceChildren(m, r, this.panel), this.root = Ym.createRoot(r);
      const E = document.documentElement, _ = () => {
        var H;
        const R = E.classList.contains("dark") || E.dataset.theme === "dark";
        r.classList.toggle("ahv-dark-host", R), (H = this.panel) == null || H.classList.toggle("ahv-dark-host", R);
      };
      _(), this.theme = new MutationObserver(_), this.theme.observe(E, { attributes: !0, attributeFilter: ["class", "data-theme"] });
    }
    this.render();
  }
  disconnectedCallback() {
    var o, m, r;
    (o = this.theme) == null || o.disconnect(), (m = this.root) == null || m.unmount(), this.root = void 0, (r = this.shadowRoot) == null || r.replaceChildren();
  }
  attributeChangedCallback() {
    this.render();
  }
  render() {
    !this.root || !this.requester || this.root.render(/* @__PURE__ */ f.jsx(ph.Provider, { value: this.panel ?? null, children: this.view(this.requester) }));
  }
};
lf.observedAttributes = [
  "entity-type",
  "entity-id",
  "entity-label",
  "title",
  "kinds",
  "can-export",
  "action",
  "newest-first",
  "view",
  "no-status"
];
let Ei = lf;
class V0 extends Ei {
  view(o) {
    const m = this.getAttribute("entity-type"), r = this.getAttribute("entity-id"), E = (this.getAttribute("kinds") || "events,requests").split(",").map((_) => _.trim());
    return /* @__PURE__ */ f.jsx(
      Z0,
      {
        request: o,
        title: this.getAttribute("title") || void 0,
        kinds: E,
        canExport: this.hasAttribute("can-export"),
        showStatus: !this.hasAttribute("no-status"),
        entity: m && r ? { type: m, id: r, label: this.getAttribute("entity-label") || `${m} ${r}` } : void 0
      }
    );
  }
}
class K0 extends Ei {
  view(o) {
    return /* @__PURE__ */ f.jsx(
      k0,
      {
        request: o,
        entity: { type: this.getAttribute("entity-type") || "", id: this.getAttribute("entity-id") || "" },
        action: this.getAttribute("action") || void 0,
        newestFirst: this.hasAttribute("newest-first"),
        view: this.getAttribute("view") === "important" ? "important" : "all"
      }
    );
  }
}
customElements.get("activity-log") || customElements.define("activity-log", V0);
customElements.get("activity-timeline") || customElements.define("activity-timeline", K0);
