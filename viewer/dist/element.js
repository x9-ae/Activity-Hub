var ws = { exports: {} }, $n = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Kd;
function Hm() {
  if (Kd) return $n;
  Kd = 1;
  var s = Symbol.for("react.transitional.element"), o = Symbol.for("react.fragment");
  function m(f, g, N) {
    var R = null;
    if (N !== void 0 && (R = "" + N), g.key !== void 0 && (R = "" + g.key), "key" in g) {
      N = {};
      for (var w in g)
        w !== "key" && (N[w] = g[w]);
    } else N = g;
    return g = N.ref, {
      $$typeof: s,
      type: f,
      key: R,
      ref: g !== void 0 ? g : null,
      props: N
    };
  }
  return $n.Fragment = o, $n.jsx = m, $n.jsxs = m, $n;
}
var Jd;
function Bm() {
  return Jd || (Jd = 1, ws.exports = Hm()), ws.exports;
}
var c = Bm(), Hs = { exports: {} }, Wn = {}, Bs = { exports: {} }, Ys = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var $d;
function Ym() {
  return $d || ($d = 1, (function(s) {
    function o(A, Y) {
      var et = A.length;
      A.push(Y);
      t: for (; 0 < et; ) {
        var gt = et - 1 >>> 1, h = A[gt];
        if (0 < g(h, Y))
          A[gt] = Y, A[et] = h, et = gt;
        else break t;
      }
    }
    function m(A) {
      return A.length === 0 ? null : A[0];
    }
    function f(A) {
      if (A.length === 0) return null;
      var Y = A[0], et = A.pop();
      if (et !== Y) {
        A[0] = et;
        t: for (var gt = 0, h = A.length, D = h >>> 1; gt < D; ) {
          var Q = 2 * (gt + 1) - 1, k = A[Q], J = Q + 1, ot = A[J];
          if (0 > g(k, et))
            J < h && 0 > g(ot, k) ? (A[gt] = ot, A[J] = et, gt = J) : (A[gt] = k, A[Q] = et, gt = Q);
          else if (J < h && 0 > g(ot, et))
            A[gt] = ot, A[J] = et, gt = J;
          else break t;
        }
      }
      return Y;
    }
    function g(A, Y) {
      var et = A.sortIndex - Y.sortIndex;
      return et !== 0 ? et : A.id - Y.id;
    }
    if (s.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var N = performance;
      s.unstable_now = function() {
        return N.now();
      };
    } else {
      var R = Date, w = R.now();
      s.unstable_now = function() {
        return R.now() - w;
      };
    }
    var E = [], x = [], U = 1, B = null, q = 3, G = !1, K = !1, L = !1, I = !1, tt = typeof setTimeout == "function" ? setTimeout : null, _ = typeof clearTimeout == "function" ? clearTimeout : null, H = typeof setImmediate < "u" ? setImmediate : null;
    function F(A) {
      for (var Y = m(x); Y !== null; ) {
        if (Y.callback === null) f(x);
        else if (Y.startTime <= A)
          f(x), Y.sortIndex = Y.expirationTime, o(E, Y);
        else break;
        Y = m(x);
      }
    }
    function $(A) {
      if (L = !1, F(A), !K)
        if (m(E) !== null)
          K = !0, it || (it = !0, jt());
        else {
          var Y = m(x);
          Y !== null && wt($, Y.startTime - A);
        }
    }
    var it = !1, C = -1, P = 5, Rt = -1;
    function Be() {
      return I ? !0 : !(s.unstable_now() - Rt < P);
    }
    function ae() {
      if (I = !1, it) {
        var A = s.unstable_now();
        Rt = A;
        var Y = !0;
        try {
          t: {
            K = !1, L && (L = !1, _(C), C = -1), G = !0;
            var et = q;
            try {
              e: {
                for (F(A), B = m(E); B !== null && !(B.expirationTime > A && Be()); ) {
                  var gt = B.callback;
                  if (typeof gt == "function") {
                    B.callback = null, q = B.priorityLevel;
                    var h = gt(
                      B.expirationTime <= A
                    );
                    if (A = s.unstable_now(), typeof h == "function") {
                      B.callback = h, F(A), Y = !0;
                      break e;
                    }
                    B === m(E) && f(E), F(A);
                  } else f(E);
                  B = m(E);
                }
                if (B !== null) Y = !0;
                else {
                  var D = m(x);
                  D !== null && wt(
                    $,
                    D.startTime - A
                  ), Y = !1;
                }
              }
              break t;
            } finally {
              B = null, q = et, G = !1;
            }
            Y = void 0;
          }
        } finally {
          Y ? jt() : it = !1;
        }
      }
    }
    var jt;
    if (typeof H == "function")
      jt = function() {
        H(ae);
      };
    else if (typeof MessageChannel < "u") {
      var be = new MessageChannel(), De = be.port2;
      be.port1.onmessage = ae, jt = function() {
        De.postMessage(null);
      };
    } else
      jt = function() {
        tt(ae, 0);
      };
    function wt(A, Y) {
      C = tt(function() {
        A(s.unstable_now());
      }, Y);
    }
    s.unstable_IdlePriority = 5, s.unstable_ImmediatePriority = 1, s.unstable_LowPriority = 4, s.unstable_NormalPriority = 3, s.unstable_Profiling = null, s.unstable_UserBlockingPriority = 2, s.unstable_cancelCallback = function(A) {
      A.callback = null;
    }, s.unstable_forceFrameRate = function(A) {
      0 > A || 125 < A ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : P = 0 < A ? Math.floor(1e3 / A) : 5;
    }, s.unstable_getCurrentPriorityLevel = function() {
      return q;
    }, s.unstable_next = function(A) {
      switch (q) {
        case 1:
        case 2:
        case 3:
          var Y = 3;
          break;
        default:
          Y = q;
      }
      var et = q;
      q = Y;
      try {
        return A();
      } finally {
        q = et;
      }
    }, s.unstable_requestPaint = function() {
      I = !0;
    }, s.unstable_runWithPriority = function(A, Y) {
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
      var et = q;
      q = A;
      try {
        return Y();
      } finally {
        q = et;
      }
    }, s.unstable_scheduleCallback = function(A, Y, et) {
      var gt = s.unstable_now();
      switch (typeof et == "object" && et !== null ? (et = et.delay, et = typeof et == "number" && 0 < et ? gt + et : gt) : et = gt, A) {
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
      return h = et + h, A = {
        id: U++,
        callback: Y,
        priorityLevel: A,
        startTime: et,
        expirationTime: h,
        sortIndex: -1
      }, et > gt ? (A.sortIndex = et, o(x, A), m(E) === null && A === m(x) && (L ? (_(C), C = -1) : L = !0, wt($, et - gt))) : (A.sortIndex = h, o(E, A), K || G || (K = !0, it || (it = !0, jt()))), A;
    }, s.unstable_shouldYield = Be, s.unstable_wrapCallback = function(A) {
      var Y = q;
      return function() {
        var et = q;
        q = Y;
        try {
          return A.apply(this, arguments);
        } finally {
          q = et;
        }
      };
    };
  })(Ys)), Ys;
}
var Wd;
function Gm() {
  return Wd || (Wd = 1, Bs.exports = Ym()), Bs.exports;
}
var Gs = { exports: {} }, st = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Fd;
function km() {
  if (Fd) return st;
  Fd = 1;
  var s = Symbol.for("react.transitional.element"), o = Symbol.for("react.portal"), m = Symbol.for("react.fragment"), f = Symbol.for("react.strict_mode"), g = Symbol.for("react.profiler"), N = Symbol.for("react.consumer"), R = Symbol.for("react.context"), w = Symbol.for("react.forward_ref"), E = Symbol.for("react.suspense"), x = Symbol.for("react.memo"), U = Symbol.for("react.lazy"), B = Symbol.iterator;
  function q(h) {
    return h === null || typeof h != "object" ? null : (h = B && h[B] || h["@@iterator"], typeof h == "function" ? h : null);
  }
  var G = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, K = Object.assign, L = {};
  function I(h, D, Q) {
    this.props = h, this.context = D, this.refs = L, this.updater = Q || G;
  }
  I.prototype.isReactComponent = {}, I.prototype.setState = function(h, D) {
    if (typeof h != "object" && typeof h != "function" && h != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, h, D, "setState");
  }, I.prototype.forceUpdate = function(h) {
    this.updater.enqueueForceUpdate(this, h, "forceUpdate");
  };
  function tt() {
  }
  tt.prototype = I.prototype;
  function _(h, D, Q) {
    this.props = h, this.context = D, this.refs = L, this.updater = Q || G;
  }
  var H = _.prototype = new tt();
  H.constructor = _, K(H, I.prototype), H.isPureReactComponent = !0;
  var F = Array.isArray, $ = { H: null, A: null, T: null, S: null, V: null }, it = Object.prototype.hasOwnProperty;
  function C(h, D, Q, k, J, ot) {
    return Q = ot.ref, {
      $$typeof: s,
      type: h,
      key: D,
      ref: Q !== void 0 ? Q : null,
      props: ot
    };
  }
  function P(h, D) {
    return C(
      h.type,
      D,
      void 0,
      void 0,
      void 0,
      h.props
    );
  }
  function Rt(h) {
    return typeof h == "object" && h !== null && h.$$typeof === s;
  }
  function Be(h) {
    var D = { "=": "=0", ":": "=2" };
    return "$" + h.replace(/[=:]/g, function(Q) {
      return D[Q];
    });
  }
  var ae = /\/+/g;
  function jt(h, D) {
    return typeof h == "object" && h !== null && h.key != null ? Be("" + h.key) : D.toString(36);
  }
  function be() {
  }
  function De(h) {
    switch (h.status) {
      case "fulfilled":
        return h.value;
      case "rejected":
        throw h.reason;
      default:
        switch (typeof h.status == "string" ? h.then(be, be) : (h.status = "pending", h.then(
          function(D) {
            h.status === "pending" && (h.status = "fulfilled", h.value = D);
          },
          function(D) {
            h.status === "pending" && (h.status = "rejected", h.reason = D);
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
  function wt(h, D, Q, k, J) {
    var ot = typeof h;
    (ot === "undefined" || ot === "boolean") && (h = null);
    var V = !1;
    if (h === null) V = !0;
    else
      switch (ot) {
        case "bigint":
        case "string":
        case "number":
          V = !0;
          break;
        case "object":
          switch (h.$$typeof) {
            case s:
            case o:
              V = !0;
              break;
            case U:
              return V = h._init, wt(
                V(h._payload),
                D,
                Q,
                k,
                J
              );
          }
      }
    if (V)
      return J = J(h), V = k === "" ? "." + jt(h, 0) : k, F(J) ? (Q = "", V != null && (Q = V.replace(ae, "$&/") + "/"), wt(J, D, Q, "", function(ne) {
        return ne;
      })) : J != null && (Rt(J) && (J = P(
        J,
        Q + (J.key == null || h && h.key === J.key ? "" : ("" + J.key).replace(
          ae,
          "$&/"
        ) + "/") + V
      )), D.push(J)), 1;
    V = 0;
    var Jt = k === "" ? "." : k + ":";
    if (F(h))
      for (var yt = 0; yt < h.length; yt++)
        k = h[yt], ot = Jt + jt(k, yt), V += wt(
          k,
          D,
          Q,
          ot,
          J
        );
    else if (yt = q(h), typeof yt == "function")
      for (h = yt.call(h), yt = 0; !(k = h.next()).done; )
        k = k.value, ot = Jt + jt(k, yt++), V += wt(
          k,
          D,
          Q,
          ot,
          J
        );
    else if (ot === "object") {
      if (typeof h.then == "function")
        return wt(
          De(h),
          D,
          Q,
          k,
          J
        );
      throw D = String(h), Error(
        "Objects are not valid as a React child (found: " + (D === "[object Object]" ? "object with keys {" + Object.keys(h).join(", ") + "}" : D) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return V;
  }
  function A(h, D, Q) {
    if (h == null) return h;
    var k = [], J = 0;
    return wt(h, k, "", "", function(ot) {
      return D.call(Q, ot, J++);
    }), k;
  }
  function Y(h) {
    if (h._status === -1) {
      var D = h._result;
      D = D(), D.then(
        function(Q) {
          (h._status === 0 || h._status === -1) && (h._status = 1, h._result = Q);
        },
        function(Q) {
          (h._status === 0 || h._status === -1) && (h._status = 2, h._result = Q);
        }
      ), h._status === -1 && (h._status = 0, h._result = D);
    }
    if (h._status === 1) return h._result.default;
    throw h._result;
  }
  var et = typeof reportError == "function" ? reportError : function(h) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var D = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof h == "object" && h !== null && typeof h.message == "string" ? String(h.message) : String(h),
        error: h
      });
      if (!window.dispatchEvent(D)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", h);
      return;
    }
    console.error(h);
  };
  function gt() {
  }
  return st.Children = {
    map: A,
    forEach: function(h, D, Q) {
      A(
        h,
        function() {
          D.apply(this, arguments);
        },
        Q
      );
    },
    count: function(h) {
      var D = 0;
      return A(h, function() {
        D++;
      }), D;
    },
    toArray: function(h) {
      return A(h, function(D) {
        return D;
      }) || [];
    },
    only: function(h) {
      if (!Rt(h))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return h;
    }
  }, st.Component = I, st.Fragment = m, st.Profiler = g, st.PureComponent = _, st.StrictMode = f, st.Suspense = E, st.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = $, st.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(h) {
      return $.H.useMemoCache(h);
    }
  }, st.cache = function(h) {
    return function() {
      return h.apply(null, arguments);
    };
  }, st.cloneElement = function(h, D, Q) {
    if (h == null)
      throw Error(
        "The argument must be a React element, but you passed " + h + "."
      );
    var k = K({}, h.props), J = h.key, ot = void 0;
    if (D != null)
      for (V in D.ref !== void 0 && (ot = void 0), D.key !== void 0 && (J = "" + D.key), D)
        !it.call(D, V) || V === "key" || V === "__self" || V === "__source" || V === "ref" && D.ref === void 0 || (k[V] = D[V]);
    var V = arguments.length - 2;
    if (V === 1) k.children = Q;
    else if (1 < V) {
      for (var Jt = Array(V), yt = 0; yt < V; yt++)
        Jt[yt] = arguments[yt + 2];
      k.children = Jt;
    }
    return C(h.type, J, void 0, void 0, ot, k);
  }, st.createContext = function(h) {
    return h = {
      $$typeof: R,
      _currentValue: h,
      _currentValue2: h,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, h.Provider = h, h.Consumer = {
      $$typeof: N,
      _context: h
    }, h;
  }, st.createElement = function(h, D, Q) {
    var k, J = {}, ot = null;
    if (D != null)
      for (k in D.key !== void 0 && (ot = "" + D.key), D)
        it.call(D, k) && k !== "key" && k !== "__self" && k !== "__source" && (J[k] = D[k]);
    var V = arguments.length - 2;
    if (V === 1) J.children = Q;
    else if (1 < V) {
      for (var Jt = Array(V), yt = 0; yt < V; yt++)
        Jt[yt] = arguments[yt + 2];
      J.children = Jt;
    }
    if (h && h.defaultProps)
      for (k in V = h.defaultProps, V)
        J[k] === void 0 && (J[k] = V[k]);
    return C(h, ot, void 0, void 0, null, J);
  }, st.createRef = function() {
    return { current: null };
  }, st.forwardRef = function(h) {
    return { $$typeof: w, render: h };
  }, st.isValidElement = Rt, st.lazy = function(h) {
    return {
      $$typeof: U,
      _payload: { _status: -1, _result: h },
      _init: Y
    };
  }, st.memo = function(h, D) {
    return {
      $$typeof: x,
      type: h,
      compare: D === void 0 ? null : D
    };
  }, st.startTransition = function(h) {
    var D = $.T, Q = {};
    $.T = Q;
    try {
      var k = h(), J = $.S;
      J !== null && J(Q, k), typeof k == "object" && k !== null && typeof k.then == "function" && k.then(gt, et);
    } catch (ot) {
      et(ot);
    } finally {
      $.T = D;
    }
  }, st.unstable_useCacheRefresh = function() {
    return $.H.useCacheRefresh();
  }, st.use = function(h) {
    return $.H.use(h);
  }, st.useActionState = function(h, D, Q) {
    return $.H.useActionState(h, D, Q);
  }, st.useCallback = function(h, D) {
    return $.H.useCallback(h, D);
  }, st.useContext = function(h) {
    return $.H.useContext(h);
  }, st.useDebugValue = function() {
  }, st.useDeferredValue = function(h, D) {
    return $.H.useDeferredValue(h, D);
  }, st.useEffect = function(h, D, Q) {
    var k = $.H;
    if (typeof Q == "function")
      throw Error(
        "useEffect CRUD overload is not enabled in this build of React."
      );
    return k.useEffect(h, D);
  }, st.useId = function() {
    return $.H.useId();
  }, st.useImperativeHandle = function(h, D, Q) {
    return $.H.useImperativeHandle(h, D, Q);
  }, st.useInsertionEffect = function(h, D) {
    return $.H.useInsertionEffect(h, D);
  }, st.useLayoutEffect = function(h, D) {
    return $.H.useLayoutEffect(h, D);
  }, st.useMemo = function(h, D) {
    return $.H.useMemo(h, D);
  }, st.useOptimistic = function(h, D) {
    return $.H.useOptimistic(h, D);
  }, st.useReducer = function(h, D, Q) {
    return $.H.useReducer(h, D, Q);
  }, st.useRef = function(h) {
    return $.H.useRef(h);
  }, st.useState = function(h) {
    return $.H.useState(h);
  }, st.useSyncExternalStore = function(h, D, Q) {
    return $.H.useSyncExternalStore(
      h,
      D,
      Q
    );
  }, st.useTransition = function() {
    return $.H.useTransition();
  }, st.version = "19.1.0", st;
}
var Pd;
function tr() {
  return Pd || (Pd = 1, Gs.exports = km()), Gs.exports;
}
var ks = { exports: {} }, ee = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Id;
function Lm() {
  if (Id) return ee;
  Id = 1;
  var s = tr();
  function o(E) {
    var x = "https://react.dev/errors/" + E;
    if (1 < arguments.length) {
      x += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var U = 2; U < arguments.length; U++)
        x += "&args[]=" + encodeURIComponent(arguments[U]);
    }
    return "Minified React error #" + E + "; visit " + x + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function m() {
  }
  var f = {
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
  }, g = Symbol.for("react.portal");
  function N(E, x, U) {
    var B = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: g,
      key: B == null ? null : "" + B,
      children: E,
      containerInfo: x,
      implementation: U
    };
  }
  var R = s.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function w(E, x) {
    if (E === "font") return "";
    if (typeof x == "string")
      return x === "use-credentials" ? x : "";
  }
  return ee.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = f, ee.createPortal = function(E, x) {
    var U = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!x || x.nodeType !== 1 && x.nodeType !== 9 && x.nodeType !== 11)
      throw Error(o(299));
    return N(E, x, null, U);
  }, ee.flushSync = function(E) {
    var x = R.T, U = f.p;
    try {
      if (R.T = null, f.p = 2, E) return E();
    } finally {
      R.T = x, f.p = U, f.d.f();
    }
  }, ee.preconnect = function(E, x) {
    typeof E == "string" && (x ? (x = x.crossOrigin, x = typeof x == "string" ? x === "use-credentials" ? x : "" : void 0) : x = null, f.d.C(E, x));
  }, ee.prefetchDNS = function(E) {
    typeof E == "string" && f.d.D(E);
  }, ee.preinit = function(E, x) {
    if (typeof E == "string" && x && typeof x.as == "string") {
      var U = x.as, B = w(U, x.crossOrigin), q = typeof x.integrity == "string" ? x.integrity : void 0, G = typeof x.fetchPriority == "string" ? x.fetchPriority : void 0;
      U === "style" ? f.d.S(
        E,
        typeof x.precedence == "string" ? x.precedence : void 0,
        {
          crossOrigin: B,
          integrity: q,
          fetchPriority: G
        }
      ) : U === "script" && f.d.X(E, {
        crossOrigin: B,
        integrity: q,
        fetchPriority: G,
        nonce: typeof x.nonce == "string" ? x.nonce : void 0
      });
    }
  }, ee.preinitModule = function(E, x) {
    if (typeof E == "string")
      if (typeof x == "object" && x !== null) {
        if (x.as == null || x.as === "script") {
          var U = w(
            x.as,
            x.crossOrigin
          );
          f.d.M(E, {
            crossOrigin: U,
            integrity: typeof x.integrity == "string" ? x.integrity : void 0,
            nonce: typeof x.nonce == "string" ? x.nonce : void 0
          });
        }
      } else x == null && f.d.M(E);
  }, ee.preload = function(E, x) {
    if (typeof E == "string" && typeof x == "object" && x !== null && typeof x.as == "string") {
      var U = x.as, B = w(U, x.crossOrigin);
      f.d.L(E, U, {
        crossOrigin: B,
        integrity: typeof x.integrity == "string" ? x.integrity : void 0,
        nonce: typeof x.nonce == "string" ? x.nonce : void 0,
        type: typeof x.type == "string" ? x.type : void 0,
        fetchPriority: typeof x.fetchPriority == "string" ? x.fetchPriority : void 0,
        referrerPolicy: typeof x.referrerPolicy == "string" ? x.referrerPolicy : void 0,
        imageSrcSet: typeof x.imageSrcSet == "string" ? x.imageSrcSet : void 0,
        imageSizes: typeof x.imageSizes == "string" ? x.imageSizes : void 0,
        media: typeof x.media == "string" ? x.media : void 0
      });
    }
  }, ee.preloadModule = function(E, x) {
    if (typeof E == "string")
      if (x) {
        var U = w(x.as, x.crossOrigin);
        f.d.m(E, {
          as: typeof x.as == "string" && x.as !== "script" ? x.as : void 0,
          crossOrigin: U,
          integrity: typeof x.integrity == "string" ? x.integrity : void 0
        });
      } else f.d.m(E);
  }, ee.requestFormReset = function(E) {
    f.d.r(E);
  }, ee.unstable_batchedUpdates = function(E, x) {
    return E(x);
  }, ee.useFormState = function(E, x, U) {
    return R.H.useFormState(E, x, U);
  }, ee.useFormStatus = function() {
    return R.H.useHostTransitionStatus();
  }, ee.version = "19.1.0", ee;
}
var th;
function ph() {
  if (th) return ks.exports;
  th = 1;
  function s() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s);
      } catch (o) {
        console.error(o);
      }
  }
  return s(), ks.exports = Lm(), ks.exports;
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
var eh;
function Xm() {
  if (eh) return Wn;
  eh = 1;
  var s = Gm(), o = tr(), m = ph();
  function f(t) {
    var e = "https://react.dev/errors/" + t;
    if (1 < arguments.length) {
      e += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var a = 2; a < arguments.length; a++)
        e += "&args[]=" + encodeURIComponent(arguments[a]);
    }
    return "Minified React error #" + t + "; visit " + e + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function g(t) {
    return !(!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11);
  }
  function N(t) {
    var e = t, a = t;
    if (t.alternate) for (; e.return; ) e = e.return;
    else {
      t = e;
      do
        e = t, (e.flags & 4098) !== 0 && (a = e.return), t = e.return;
      while (t);
    }
    return e.tag === 3 ? a : null;
  }
  function R(t) {
    if (t.tag === 13) {
      var e = t.memoizedState;
      if (e === null && (t = t.alternate, t !== null && (e = t.memoizedState)), e !== null) return e.dehydrated;
    }
    return null;
  }
  function w(t) {
    if (N(t) !== t)
      throw Error(f(188));
  }
  function E(t) {
    var e = t.alternate;
    if (!e) {
      if (e = N(t), e === null) throw Error(f(188));
      return e !== t ? null : t;
    }
    for (var a = t, l = e; ; ) {
      var n = a.return;
      if (n === null) break;
      var u = n.alternate;
      if (u === null) {
        if (l = n.return, l !== null) {
          a = l;
          continue;
        }
        break;
      }
      if (n.child === u.child) {
        for (u = n.child; u; ) {
          if (u === a) return w(n), t;
          if (u === l) return w(n), e;
          u = u.sibling;
        }
        throw Error(f(188));
      }
      if (a.return !== l.return) a = n, l = u;
      else {
        for (var i = !1, r = n.child; r; ) {
          if (r === a) {
            i = !0, a = n, l = u;
            break;
          }
          if (r === l) {
            i = !0, l = n, a = u;
            break;
          }
          r = r.sibling;
        }
        if (!i) {
          for (r = u.child; r; ) {
            if (r === a) {
              i = !0, a = u, l = n;
              break;
            }
            if (r === l) {
              i = !0, l = u, a = n;
              break;
            }
            r = r.sibling;
          }
          if (!i) throw Error(f(189));
        }
      }
      if (a.alternate !== l) throw Error(f(190));
    }
    if (a.tag !== 3) throw Error(f(188));
    return a.stateNode.current === a ? t : e;
  }
  function x(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t;
    for (t = t.child; t !== null; ) {
      if (e = x(t), e !== null) return e;
      t = t.sibling;
    }
    return null;
  }
  var U = Object.assign, B = Symbol.for("react.element"), q = Symbol.for("react.transitional.element"), G = Symbol.for("react.portal"), K = Symbol.for("react.fragment"), L = Symbol.for("react.strict_mode"), I = Symbol.for("react.profiler"), tt = Symbol.for("react.provider"), _ = Symbol.for("react.consumer"), H = Symbol.for("react.context"), F = Symbol.for("react.forward_ref"), $ = Symbol.for("react.suspense"), it = Symbol.for("react.suspense_list"), C = Symbol.for("react.memo"), P = Symbol.for("react.lazy"), Rt = Symbol.for("react.activity"), Be = Symbol.for("react.memo_cache_sentinel"), ae = Symbol.iterator;
  function jt(t) {
    return t === null || typeof t != "object" ? null : (t = ae && t[ae] || t["@@iterator"], typeof t == "function" ? t : null);
  }
  var be = Symbol.for("react.client.reference");
  function De(t) {
    if (t == null) return null;
    if (typeof t == "function")
      return t.$$typeof === be ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case K:
        return "Fragment";
      case I:
        return "Profiler";
      case L:
        return "StrictMode";
      case $:
        return "Suspense";
      case it:
        return "SuspenseList";
      case Rt:
        return "Activity";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case G:
          return "Portal";
        case H:
          return (t.displayName || "Context") + ".Provider";
        case _:
          return (t._context.displayName || "Context") + ".Consumer";
        case F:
          var e = t.render;
          return t = t.displayName, t || (t = e.displayName || e.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
        case C:
          return e = t.displayName || null, e !== null ? e : De(t.type) || "Memo";
        case P:
          e = t._payload, t = t._init;
          try {
            return De(t(e));
          } catch {
          }
      }
    return null;
  }
  var wt = Array.isArray, A = o.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Y = m.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, et = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, gt = [], h = -1;
  function D(t) {
    return { current: t };
  }
  function Q(t) {
    0 > h || (t.current = gt[h], gt[h] = null, h--);
  }
  function k(t, e) {
    h++, gt[h] = t.current, t.current = e;
  }
  var J = D(null), ot = D(null), V = D(null), Jt = D(null);
  function yt(t, e) {
    switch (k(V, e), k(ot, t), k(J, null), e.nodeType) {
      case 9:
      case 11:
        t = (t = e.documentElement) && (t = t.namespaceURI) ? Sd(t) : 0;
        break;
      default:
        if (t = e.tagName, e = e.namespaceURI)
          e = Sd(e), t = jd(e, t);
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
    Q(J), k(J, t);
  }
  function ne() {
    Q(J), Q(ot), Q(V);
  }
  function tl(t) {
    t.memoizedState !== null && k(Jt, t);
    var e = J.current, a = jd(e, t.type);
    e !== a && (k(ot, t), k(J, a));
  }
  function Ye(t) {
    ot.current === t && (Q(J), Q(ot)), Jt.current === t && (Q(Jt), Qn._currentValue = et);
  }
  var el = Object.prototype.hasOwnProperty, Wl = s.unstable_scheduleCallback, al = s.unstable_cancelCallback, tu = s.unstable_shouldYield, Ni = s.unstable_requestPaint, xe = s.unstable_now, eu = s.unstable_getCurrentPriorityLevel, ue = s.unstable_ImmediatePriority, au = s.unstable_UserBlockingPriority, ll = s.unstable_NormalPriority, lu = s.unstable_LowPriority, nu = s.unstable_IdlePriority, _i = s.log, wa = s.unstable_setDisableYieldValue, Je = null, It = null;
  function Re(t) {
    if (typeof _i == "function" && wa(t), It && typeof It.setStrictMode == "function")
      try {
        It.setStrictMode(Je, t);
      } catch {
      }
  }
  var $t = Math.clz32 ? Math.clz32 : iu, Ge = Math.log, uu = Math.LN2;
  function iu(t) {
    return t >>>= 0, t === 0 ? 32 : 31 - (Ge(t) / uu | 0) | 0;
  }
  var oa = 256, da = 4194304;
  function ke(t) {
    var e = t & 42;
    if (e !== 0) return e;
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
  function nl(t, e, a) {
    var l = t.pendingLanes;
    if (l === 0) return 0;
    var n = 0, u = t.suspendedLanes, i = t.pingedLanes;
    t = t.warmLanes;
    var r = l & 134217727;
    return r !== 0 ? (l = r & ~u, l !== 0 ? n = ke(l) : (i &= r, i !== 0 ? n = ke(i) : a || (a = r & ~t, a !== 0 && (n = ke(a))))) : (r = l & ~u, r !== 0 ? n = ke(r) : i !== 0 ? n = ke(i) : a || (a = l & ~t, a !== 0 && (n = ke(a)))), n === 0 ? 0 : e !== 0 && e !== n && (e & u) === 0 && (u = n & -n, a = e & -e, u >= a || u === 32 && (a & 4194048) !== 0) ? e : n;
  }
  function ie(t, e) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & e) === 0;
  }
  function Ai(t, e) {
    switch (t) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return e + 250;
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
        return e + 5e3;
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
  function cu() {
    var t = oa;
    return oa <<= 1, (oa & 4194048) === 0 && (oa = 256), t;
  }
  function Fl() {
    var t = da;
    return da <<= 1, (da & 62914560) === 0 && (da = 4194304), t;
  }
  function ul(t) {
    for (var e = [], a = 0; 31 > a; a++) e.push(t);
    return e;
  }
  function ha(t, e) {
    t.pendingLanes |= e, e !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0);
  }
  function su(t, e, a, l, n, u) {
    var i = t.pendingLanes;
    t.pendingLanes = a, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= a, t.entangledLanes &= a, t.errorRecoveryDisabledLanes &= a, t.shellSuspendCounter = 0;
    var r = t.entanglements, d = t.expirationTimes, b = t.hiddenUpdates;
    for (a = i & ~a; 0 < a; ) {
      var z = 31 - $t(a), M = 1 << z;
      r[z] = 0, d[z] = -1;
      var S = b[z];
      if (S !== null)
        for (b[z] = null, z = 0; z < S.length; z++) {
          var T = S[z];
          T !== null && (T.lane &= -536870913);
        }
      a &= ~M;
    }
    l !== 0 && Pl(t, l, 0), u !== 0 && n === 0 && t.tag !== 0 && (t.suspendedLanes |= u & ~(i & ~e));
  }
  function Pl(t, e, a) {
    t.pendingLanes |= e, t.suspendedLanes &= ~e;
    var l = 31 - $t(e);
    t.entangledLanes |= e, t.entanglements[l] = t.entanglements[l] | 1073741824 | a & 4194090;
  }
  function Il(t, e) {
    var a = t.entangledLanes |= e;
    for (t = t.entanglements; a; ) {
      var l = 31 - $t(a), n = 1 << l;
      n & e | t[l] & e && (t[l] |= e), a &= ~n;
    }
  }
  function il(t) {
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
  function j(t) {
    return t &= -t, 2 < t ? 8 < t ? (t & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function ct() {
    var t = Y.p;
    return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : kd(t.type));
  }
  function bt(t, e) {
    var a = Y.p;
    try {
      return Y.p = t, e();
    } finally {
      Y.p = a;
    }
  }
  var nt = Math.random().toString(36).slice(2), Ot = "__reactFiber$" + nt, Xt = "__reactProps$" + nt, Ue = "__reactContainer$" + nt, zi = "__reactEvents$" + nt, Ah = "__reactListeners$" + nt, zh = "__reactHandles$" + nt, cr = "__reactResources$" + nt, tn = "__reactMarker$" + nt;
  function Oi(t) {
    delete t[Ot], delete t[Xt], delete t[zi], delete t[Ah], delete t[zh];
  }
  function cl(t) {
    var e = t[Ot];
    if (e) return e;
    for (var a = t.parentNode; a; ) {
      if (e = a[Ue] || a[Ot]) {
        if (a = e.alternate, e.child !== null || a !== null && a.child !== null)
          for (t = _d(t); t !== null; ) {
            if (a = t[Ot]) return a;
            t = _d(t);
          }
        return e;
      }
      t = a, a = t.parentNode;
    }
    return null;
  }
  function sl(t) {
    if (t = t[Ot] || t[Ue]) {
      var e = t.tag;
      if (e === 5 || e === 6 || e === 13 || e === 26 || e === 27 || e === 3)
        return t;
    }
    return null;
  }
  function en(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t.stateNode;
    throw Error(f(33));
  }
  function rl(t) {
    var e = t[cr];
    return e || (e = t[cr] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), e;
  }
  function Qt(t) {
    t[tn] = !0;
  }
  var sr = /* @__PURE__ */ new Set(), rr = {};
  function Ha(t, e) {
    fl(t, e), fl(t + "Capture", e);
  }
  function fl(t, e) {
    for (rr[t] = e, t = 0; t < e.length; t++)
      sr.add(e[t]);
  }
  var Oh = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), fr = {}, or = {};
  function Mh(t) {
    return el.call(or, t) ? !0 : el.call(fr, t) ? !1 : Oh.test(t) ? or[t] = !0 : (fr[t] = !0, !1);
  }
  function ru(t, e, a) {
    if (Mh(e))
      if (a === null) t.removeAttribute(e);
      else {
        switch (typeof a) {
          case "undefined":
          case "function":
          case "symbol":
            t.removeAttribute(e);
            return;
          case "boolean":
            var l = e.toLowerCase().slice(0, 5);
            if (l !== "data-" && l !== "aria-") {
              t.removeAttribute(e);
              return;
            }
        }
        t.setAttribute(e, "" + a);
      }
  }
  function fu(t, e, a) {
    if (a === null) t.removeAttribute(e);
    else {
      switch (typeof a) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(e);
          return;
      }
      t.setAttribute(e, "" + a);
    }
  }
  function $e(t, e, a, l) {
    if (l === null) t.removeAttribute(a);
    else {
      switch (typeof l) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(a);
          return;
      }
      t.setAttributeNS(e, a, "" + l);
    }
  }
  var Mi, dr;
  function ol(t) {
    if (Mi === void 0)
      try {
        throw Error();
      } catch (a) {
        var e = a.stack.trim().match(/\n( *(at )?)/);
        Mi = e && e[1] || "", dr = -1 < a.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < a.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + Mi + t + dr;
  }
  var Di = !1;
  function Ri(t, e) {
    if (!t || Di) return "";
    Di = !0;
    var a = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var l = {
        DetermineComponentFrameRoot: function() {
          try {
            if (e) {
              var M = function() {
                throw Error();
              };
              if (Object.defineProperty(M.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(M, []);
                } catch (T) {
                  var S = T;
                }
                Reflect.construct(t, [], M);
              } else {
                try {
                  M.call();
                } catch (T) {
                  S = T;
                }
                t.call(M.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (T) {
                S = T;
              }
              (M = t()) && typeof M.catch == "function" && M.catch(function() {
              });
            }
          } catch (T) {
            if (T && S && typeof T.stack == "string")
              return [T.stack, S.stack];
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
      var u = l.DetermineComponentFrameRoot(), i = u[0], r = u[1];
      if (i && r) {
        var d = i.split(`
`), b = r.split(`
`);
        for (n = l = 0; l < d.length && !d[l].includes("DetermineComponentFrameRoot"); )
          l++;
        for (; n < b.length && !b[n].includes(
          "DetermineComponentFrameRoot"
        ); )
          n++;
        if (l === d.length || n === b.length)
          for (l = d.length - 1, n = b.length - 1; 1 <= l && 0 <= n && d[l] !== b[n]; )
            n--;
        for (; 1 <= l && 0 <= n; l--, n--)
          if (d[l] !== b[n]) {
            if (l !== 1 || n !== 1)
              do
                if (l--, n--, 0 > n || d[l] !== b[n]) {
                  var z = `
` + d[l].replace(" at new ", " at ");
                  return t.displayName && z.includes("<anonymous>") && (z = z.replace("<anonymous>", t.displayName)), z;
                }
              while (1 <= l && 0 <= n);
            break;
          }
      }
    } finally {
      Di = !1, Error.prepareStackTrace = a;
    }
    return (a = t ? t.displayName || t.name : "") ? ol(a) : "";
  }
  function Dh(t) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return ol(t.type);
      case 16:
        return ol("Lazy");
      case 13:
        return ol("Suspense");
      case 19:
        return ol("SuspenseList");
      case 0:
      case 15:
        return Ri(t.type, !1);
      case 11:
        return Ri(t.type.render, !1);
      case 1:
        return Ri(t.type, !0);
      case 31:
        return ol("Activity");
      default:
        return "";
    }
  }
  function hr(t) {
    try {
      var e = "";
      do
        e += Dh(t), t = t.return;
      while (t);
      return e;
    } catch (a) {
      return `
Error generating stack: ` + a.message + `
` + a.stack;
    }
  }
  function Se(t) {
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
  function vr(t) {
    var e = t.type;
    return (t = t.nodeName) && t.toLowerCase() === "input" && (e === "checkbox" || e === "radio");
  }
  function Rh(t) {
    var e = vr(t) ? "checked" : "value", a = Object.getOwnPropertyDescriptor(
      t.constructor.prototype,
      e
    ), l = "" + t[e];
    if (!t.hasOwnProperty(e) && typeof a < "u" && typeof a.get == "function" && typeof a.set == "function") {
      var n = a.get, u = a.set;
      return Object.defineProperty(t, e, {
        configurable: !0,
        get: function() {
          return n.call(this);
        },
        set: function(i) {
          l = "" + i, u.call(this, i);
        }
      }), Object.defineProperty(t, e, {
        enumerable: a.enumerable
      }), {
        getValue: function() {
          return l;
        },
        setValue: function(i) {
          l = "" + i;
        },
        stopTracking: function() {
          t._valueTracker = null, delete t[e];
        }
      };
    }
  }
  function ou(t) {
    t._valueTracker || (t._valueTracker = Rh(t));
  }
  function mr(t) {
    if (!t) return !1;
    var e = t._valueTracker;
    if (!e) return !0;
    var a = e.getValue(), l = "";
    return t && (l = vr(t) ? t.checked ? "true" : "false" : t.value), t = l, t !== a ? (e.setValue(t), !0) : !1;
  }
  function du(t) {
    if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u") return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  var Uh = /[\n"\\]/g;
  function je(t) {
    return t.replace(
      Uh,
      function(e) {
        return "\\" + e.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Ui(t, e, a, l, n, u, i, r) {
    t.name = "", i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" ? t.type = i : t.removeAttribute("type"), e != null ? i === "number" ? (e === 0 && t.value === "" || t.value != e) && (t.value = "" + Se(e)) : t.value !== "" + Se(e) && (t.value = "" + Se(e)) : i !== "submit" && i !== "reset" || t.removeAttribute("value"), e != null ? qi(t, i, Se(e)) : a != null ? qi(t, i, Se(a)) : l != null && t.removeAttribute("value"), n == null && u != null && (t.defaultChecked = !!u), n != null && (t.checked = n && typeof n != "function" && typeof n != "symbol"), r != null && typeof r != "function" && typeof r != "symbol" && typeof r != "boolean" ? t.name = "" + Se(r) : t.removeAttribute("name");
  }
  function pr(t, e, a, l, n, u, i, r) {
    if (u != null && typeof u != "function" && typeof u != "symbol" && typeof u != "boolean" && (t.type = u), e != null || a != null) {
      if (!(u !== "submit" && u !== "reset" || e != null))
        return;
      a = a != null ? "" + Se(a) : "", e = e != null ? "" + Se(e) : a, r || e === t.value || (t.value = e), t.defaultValue = e;
    }
    l = l ?? n, l = typeof l != "function" && typeof l != "symbol" && !!l, t.checked = r ? t.checked : !!l, t.defaultChecked = !!l, i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" && (t.name = i);
  }
  function qi(t, e, a) {
    e === "number" && du(t.ownerDocument) === t || t.defaultValue === "" + a || (t.defaultValue = "" + a);
  }
  function dl(t, e, a, l) {
    if (t = t.options, e) {
      e = {};
      for (var n = 0; n < a.length; n++)
        e["$" + a[n]] = !0;
      for (a = 0; a < t.length; a++)
        n = e.hasOwnProperty("$" + t[a].value), t[a].selected !== n && (t[a].selected = n), n && l && (t[a].defaultSelected = !0);
    } else {
      for (a = "" + Se(a), e = null, n = 0; n < t.length; n++) {
        if (t[n].value === a) {
          t[n].selected = !0, l && (t[n].defaultSelected = !0);
          return;
        }
        e !== null || t[n].disabled || (e = t[n]);
      }
      e !== null && (e.selected = !0);
    }
  }
  function gr(t, e, a) {
    if (e != null && (e = "" + Se(e), e !== t.value && (t.value = e), a == null)) {
      t.defaultValue !== e && (t.defaultValue = e);
      return;
    }
    t.defaultValue = a != null ? "" + Se(a) : "";
  }
  function yr(t, e, a, l) {
    if (e == null) {
      if (l != null) {
        if (a != null) throw Error(f(92));
        if (wt(l)) {
          if (1 < l.length) throw Error(f(93));
          l = l[0];
        }
        a = l;
      }
      a == null && (a = ""), e = a;
    }
    a = Se(e), t.defaultValue = a, l = t.textContent, l === a && l !== "" && l !== null && (t.value = l);
  }
  function hl(t, e) {
    if (e) {
      var a = t.firstChild;
      if (a && a === t.lastChild && a.nodeType === 3) {
        a.nodeValue = e;
        return;
      }
    }
    t.textContent = e;
  }
  var qh = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function br(t, e, a) {
    var l = e.indexOf("--") === 0;
    a == null || typeof a == "boolean" || a === "" ? l ? t.setProperty(e, "") : e === "float" ? t.cssFloat = "" : t[e] = "" : l ? t.setProperty(e, a) : typeof a != "number" || a === 0 || qh.has(e) ? e === "float" ? t.cssFloat = a : t[e] = ("" + a).trim() : t[e] = a + "px";
  }
  function xr(t, e, a) {
    if (e != null && typeof e != "object")
      throw Error(f(62));
    if (t = t.style, a != null) {
      for (var l in a)
        !a.hasOwnProperty(l) || e != null && e.hasOwnProperty(l) || (l.indexOf("--") === 0 ? t.setProperty(l, "") : l === "float" ? t.cssFloat = "" : t[l] = "");
      for (var n in e)
        l = e[n], e.hasOwnProperty(n) && a[n] !== l && br(t, n, l);
    } else
      for (var u in e)
        e.hasOwnProperty(u) && br(t, u, e[u]);
  }
  function Ci(t) {
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
  var Ch = /* @__PURE__ */ new Map([
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
  ]), wh = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function hu(t) {
    return wh.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
  }
  var wi = null;
  function Hi(t) {
    return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
  }
  var vl = null, ml = null;
  function Sr(t) {
    var e = sl(t);
    if (e && (t = e.stateNode)) {
      var a = t[Xt] || null;
      t: switch (t = e.stateNode, e.type) {
        case "input":
          if (Ui(
            t,
            a.value,
            a.defaultValue,
            a.defaultValue,
            a.checked,
            a.defaultChecked,
            a.type,
            a.name
          ), e = a.name, a.type === "radio" && e != null) {
            for (a = t; a.parentNode; ) a = a.parentNode;
            for (a = a.querySelectorAll(
              'input[name="' + je(
                "" + e
              ) + '"][type="radio"]'
            ), e = 0; e < a.length; e++) {
              var l = a[e];
              if (l !== t && l.form === t.form) {
                var n = l[Xt] || null;
                if (!n) throw Error(f(90));
                Ui(
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
            for (e = 0; e < a.length; e++)
              l = a[e], l.form === t.form && mr(l);
          }
          break t;
        case "textarea":
          gr(t, a.value, a.defaultValue);
          break t;
        case "select":
          e = a.value, e != null && dl(t, !!a.multiple, e, !1);
      }
    }
  }
  var Bi = !1;
  function jr(t, e, a) {
    if (Bi) return t(e, a);
    Bi = !0;
    try {
      var l = t(e);
      return l;
    } finally {
      if (Bi = !1, (vl !== null || ml !== null) && (Pu(), vl && (e = vl, t = ml, ml = vl = null, Sr(e), t)))
        for (e = 0; e < t.length; e++) Sr(t[e]);
    }
  }
  function an(t, e) {
    var a = t.stateNode;
    if (a === null) return null;
    var l = a[Xt] || null;
    if (l === null) return null;
    a = l[e];
    t: switch (e) {
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
    if (a && typeof a != "function")
      throw Error(
        f(231, e, typeof a)
      );
    return a;
  }
  var We = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Yi = !1;
  if (We)
    try {
      var ln = {};
      Object.defineProperty(ln, "passive", {
        get: function() {
          Yi = !0;
        }
      }), window.addEventListener("test", ln, ln), window.removeEventListener("test", ln, ln);
    } catch {
      Yi = !1;
    }
  var va = null, Gi = null, vu = null;
  function Tr() {
    if (vu) return vu;
    var t, e = Gi, a = e.length, l, n = "value" in va ? va.value : va.textContent, u = n.length;
    for (t = 0; t < a && e[t] === n[t]; t++) ;
    var i = a - t;
    for (l = 1; l <= i && e[a - l] === n[u - l]; l++) ;
    return vu = n.slice(t, 1 < l ? 1 - l : void 0);
  }
  function mu(t) {
    var e = t.keyCode;
    return "charCode" in t ? (t = t.charCode, t === 0 && e === 13 && (t = 13)) : t = e, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
  }
  function pu() {
    return !0;
  }
  function Er() {
    return !1;
  }
  function ce(t) {
    function e(a, l, n, u, i) {
      this._reactName = a, this._targetInst = n, this.type = l, this.nativeEvent = u, this.target = i, this.currentTarget = null;
      for (var r in t)
        t.hasOwnProperty(r) && (a = t[r], this[r] = a ? a(u) : u[r]);
      return this.isDefaultPrevented = (u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1) ? pu : Er, this.isPropagationStopped = Er, this;
    }
    return U(e.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var a = this.nativeEvent;
        a && (a.preventDefault ? a.preventDefault() : typeof a.returnValue != "unknown" && (a.returnValue = !1), this.isDefaultPrevented = pu);
      },
      stopPropagation: function() {
        var a = this.nativeEvent;
        a && (a.stopPropagation ? a.stopPropagation() : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0), this.isPropagationStopped = pu);
      },
      persist: function() {
      },
      isPersistent: pu
    }), e;
  }
  var Ba = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(t) {
      return t.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, gu = ce(Ba), nn = U({}, Ba, { view: 0, detail: 0 }), Hh = ce(nn), ki, Li, un, yu = U({}, nn, {
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
      return "movementX" in t ? t.movementX : (t !== un && (un && t.type === "mousemove" ? (ki = t.screenX - un.screenX, Li = t.screenY - un.screenY) : Li = ki = 0, un = t), ki);
    },
    movementY: function(t) {
      return "movementY" in t ? t.movementY : Li;
    }
  }), Nr = ce(yu), Bh = U({}, yu, { dataTransfer: 0 }), Yh = ce(Bh), Gh = U({}, nn, { relatedTarget: 0 }), Xi = ce(Gh), kh = U({}, Ba, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Lh = ce(kh), Xh = U({}, Ba, {
    clipboardData: function(t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    }
  }), Qh = ce(Xh), Zh = U({}, Ba, { data: 0 }), _r = ce(Zh), Vh = {
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
  }, Kh = {
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
  }, Jh = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function $h(t) {
    var e = this.nativeEvent;
    return e.getModifierState ? e.getModifierState(t) : (t = Jh[t]) ? !!e[t] : !1;
  }
  function Qi() {
    return $h;
  }
  var Wh = U({}, nn, {
    key: function(t) {
      if (t.key) {
        var e = Vh[t.key] || t.key;
        if (e !== "Unidentified") return e;
      }
      return t.type === "keypress" ? (t = mu(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? Kh[t.keyCode] || "Unidentified" : "";
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
      return t.type === "keypress" ? mu(t) : 0;
    },
    keyCode: function(t) {
      return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    },
    which: function(t) {
      return t.type === "keypress" ? mu(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    }
  }), Fh = ce(Wh), Ph = U({}, yu, {
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
  }), Ar = ce(Ph), Ih = U({}, nn, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Qi
  }), tv = ce(Ih), ev = U({}, Ba, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), av = ce(ev), lv = U({}, yu, {
    deltaX: function(t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    },
    deltaY: function(t) {
      return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), nv = ce(lv), uv = U({}, Ba, {
    newState: 0,
    oldState: 0
  }), iv = ce(uv), cv = [9, 13, 27, 32], Zi = We && "CompositionEvent" in window, cn = null;
  We && "documentMode" in document && (cn = document.documentMode);
  var sv = We && "TextEvent" in window && !cn, zr = We && (!Zi || cn && 8 < cn && 11 >= cn), Or = " ", Mr = !1;
  function Dr(t, e) {
    switch (t) {
      case "keyup":
        return cv.indexOf(e.keyCode) !== -1;
      case "keydown":
        return e.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function Rr(t) {
    return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
  }
  var pl = !1;
  function rv(t, e) {
    switch (t) {
      case "compositionend":
        return Rr(e);
      case "keypress":
        return e.which !== 32 ? null : (Mr = !0, Or);
      case "textInput":
        return t = e.data, t === Or && Mr ? null : t;
      default:
        return null;
    }
  }
  function fv(t, e) {
    if (pl)
      return t === "compositionend" || !Zi && Dr(t, e) ? (t = Tr(), vu = Gi = va = null, pl = !1, t) : null;
    switch (t) {
      case "paste":
        return null;
      case "keypress":
        if (!(e.ctrlKey || e.altKey || e.metaKey) || e.ctrlKey && e.altKey) {
          if (e.char && 1 < e.char.length)
            return e.char;
          if (e.which) return String.fromCharCode(e.which);
        }
        return null;
      case "compositionend":
        return zr && e.locale !== "ko" ? null : e.data;
      default:
        return null;
    }
  }
  var ov = {
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
  function Ur(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e === "input" ? !!ov[t.type] : e === "textarea";
  }
  function qr(t, e, a, l) {
    vl ? ml ? ml.push(l) : ml = [l] : vl = l, e = ni(e, "onChange"), 0 < e.length && (a = new gu(
      "onChange",
      "change",
      null,
      a,
      l
    ), t.push({ event: a, listeners: e }));
  }
  var sn = null, rn = null;
  function dv(t) {
    pd(t, 0);
  }
  function bu(t) {
    var e = en(t);
    if (mr(e)) return t;
  }
  function Cr(t, e) {
    if (t === "change") return e;
  }
  var wr = !1;
  if (We) {
    var Vi;
    if (We) {
      var Ki = "oninput" in document;
      if (!Ki) {
        var Hr = document.createElement("div");
        Hr.setAttribute("oninput", "return;"), Ki = typeof Hr.oninput == "function";
      }
      Vi = Ki;
    } else Vi = !1;
    wr = Vi && (!document.documentMode || 9 < document.documentMode);
  }
  function Br() {
    sn && (sn.detachEvent("onpropertychange", Yr), rn = sn = null);
  }
  function Yr(t) {
    if (t.propertyName === "value" && bu(rn)) {
      var e = [];
      qr(
        e,
        rn,
        t,
        Hi(t)
      ), jr(dv, e);
    }
  }
  function hv(t, e, a) {
    t === "focusin" ? (Br(), sn = e, rn = a, sn.attachEvent("onpropertychange", Yr)) : t === "focusout" && Br();
  }
  function vv(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return bu(rn);
  }
  function mv(t, e) {
    if (t === "click") return bu(e);
  }
  function pv(t, e) {
    if (t === "input" || t === "change")
      return bu(e);
  }
  function gv(t, e) {
    return t === e && (t !== 0 || 1 / t === 1 / e) || t !== t && e !== e;
  }
  var de = typeof Object.is == "function" ? Object.is : gv;
  function fn(t, e) {
    if (de(t, e)) return !0;
    if (typeof t != "object" || t === null || typeof e != "object" || e === null)
      return !1;
    var a = Object.keys(t), l = Object.keys(e);
    if (a.length !== l.length) return !1;
    for (l = 0; l < a.length; l++) {
      var n = a[l];
      if (!el.call(e, n) || !de(t[n], e[n]))
        return !1;
    }
    return !0;
  }
  function Gr(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function kr(t, e) {
    var a = Gr(t);
    t = 0;
    for (var l; a; ) {
      if (a.nodeType === 3) {
        if (l = t + a.textContent.length, t <= e && l >= e)
          return { node: a, offset: e - t };
        t = l;
      }
      t: {
        for (; a; ) {
          if (a.nextSibling) {
            a = a.nextSibling;
            break t;
          }
          a = a.parentNode;
        }
        a = void 0;
      }
      a = Gr(a);
    }
  }
  function Lr(t, e) {
    return t && e ? t === e ? !0 : t && t.nodeType === 3 ? !1 : e && e.nodeType === 3 ? Lr(t, e.parentNode) : "contains" in t ? t.contains(e) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(e) & 16) : !1 : !1;
  }
  function Xr(t) {
    t = t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null ? t.ownerDocument.defaultView : window;
    for (var e = du(t.document); e instanceof t.HTMLIFrameElement; ) {
      try {
        var a = typeof e.contentWindow.location.href == "string";
      } catch {
        a = !1;
      }
      if (a) t = e.contentWindow;
      else break;
      e = du(t.document);
    }
    return e;
  }
  function Ji(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e && (e === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || e === "textarea" || t.contentEditable === "true");
  }
  var yv = We && "documentMode" in document && 11 >= document.documentMode, gl = null, $i = null, on = null, Wi = !1;
  function Qr(t, e, a) {
    var l = a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
    Wi || gl == null || gl !== du(l) || (l = gl, "selectionStart" in l && Ji(l) ? l = { start: l.selectionStart, end: l.selectionEnd } : (l = (l.ownerDocument && l.ownerDocument.defaultView || window).getSelection(), l = {
      anchorNode: l.anchorNode,
      anchorOffset: l.anchorOffset,
      focusNode: l.focusNode,
      focusOffset: l.focusOffset
    }), on && fn(on, l) || (on = l, l = ni($i, "onSelect"), 0 < l.length && (e = new gu(
      "onSelect",
      "select",
      null,
      e,
      a
    ), t.push({ event: e, listeners: l }), e.target = gl)));
  }
  function Ya(t, e) {
    var a = {};
    return a[t.toLowerCase()] = e.toLowerCase(), a["Webkit" + t] = "webkit" + e, a["Moz" + t] = "moz" + e, a;
  }
  var yl = {
    animationend: Ya("Animation", "AnimationEnd"),
    animationiteration: Ya("Animation", "AnimationIteration"),
    animationstart: Ya("Animation", "AnimationStart"),
    transitionrun: Ya("Transition", "TransitionRun"),
    transitionstart: Ya("Transition", "TransitionStart"),
    transitioncancel: Ya("Transition", "TransitionCancel"),
    transitionend: Ya("Transition", "TransitionEnd")
  }, Fi = {}, Zr = {};
  We && (Zr = document.createElement("div").style, "AnimationEvent" in window || (delete yl.animationend.animation, delete yl.animationiteration.animation, delete yl.animationstart.animation), "TransitionEvent" in window || delete yl.transitionend.transition);
  function Ga(t) {
    if (Fi[t]) return Fi[t];
    if (!yl[t]) return t;
    var e = yl[t], a;
    for (a in e)
      if (e.hasOwnProperty(a) && a in Zr)
        return Fi[t] = e[a];
    return t;
  }
  var Vr = Ga("animationend"), Kr = Ga("animationiteration"), Jr = Ga("animationstart"), bv = Ga("transitionrun"), xv = Ga("transitionstart"), Sv = Ga("transitioncancel"), $r = Ga("transitionend"), Wr = /* @__PURE__ */ new Map(), Pi = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Pi.push("scrollEnd");
  function qe(t, e) {
    Wr.set(t, e), Ha(e, [t]);
  }
  var Fr = /* @__PURE__ */ new WeakMap();
  function Te(t, e) {
    if (typeof t == "object" && t !== null) {
      var a = Fr.get(t);
      return a !== void 0 ? a : (e = {
        value: t,
        source: e,
        stack: hr(e)
      }, Fr.set(t, e), e);
    }
    return {
      value: t,
      source: e,
      stack: hr(e)
    };
  }
  var Ee = [], bl = 0, Ii = 0;
  function xu() {
    for (var t = bl, e = Ii = bl = 0; e < t; ) {
      var a = Ee[e];
      Ee[e++] = null;
      var l = Ee[e];
      Ee[e++] = null;
      var n = Ee[e];
      Ee[e++] = null;
      var u = Ee[e];
      if (Ee[e++] = null, l !== null && n !== null) {
        var i = l.pending;
        i === null ? n.next = n : (n.next = i.next, i.next = n), l.pending = n;
      }
      u !== 0 && Pr(a, n, u);
    }
  }
  function Su(t, e, a, l) {
    Ee[bl++] = t, Ee[bl++] = e, Ee[bl++] = a, Ee[bl++] = l, Ii |= l, t.lanes |= l, t = t.alternate, t !== null && (t.lanes |= l);
  }
  function tc(t, e, a, l) {
    return Su(t, e, a, l), ju(t);
  }
  function xl(t, e) {
    return Su(t, null, null, e), ju(t);
  }
  function Pr(t, e, a) {
    t.lanes |= a;
    var l = t.alternate;
    l !== null && (l.lanes |= a);
    for (var n = !1, u = t.return; u !== null; )
      u.childLanes |= a, l = u.alternate, l !== null && (l.childLanes |= a), u.tag === 22 && (t = u.stateNode, t === null || t._visibility & 1 || (n = !0)), t = u, u = u.return;
    return t.tag === 3 ? (u = t.stateNode, n && e !== null && (n = 31 - $t(a), t = u.hiddenUpdates, l = t[n], l === null ? t[n] = [e] : l.push(e), e.lane = a | 536870912), u) : null;
  }
  function ju(t) {
    if (50 < wn)
      throw wn = 0, is = null, Error(f(185));
    for (var e = t.return; e !== null; )
      t = e, e = t.return;
    return t.tag === 3 ? t.stateNode : null;
  }
  var Sl = {};
  function jv(t, e, a, l) {
    this.tag = t, this.key = a, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = e, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = l, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function he(t, e, a, l) {
    return new jv(t, e, a, l);
  }
  function ec(t) {
    return t = t.prototype, !(!t || !t.isReactComponent);
  }
  function Fe(t, e) {
    var a = t.alternate;
    return a === null ? (a = he(
      t.tag,
      e,
      t.key,
      t.mode
    ), a.elementType = t.elementType, a.type = t.type, a.stateNode = t.stateNode, a.alternate = t, t.alternate = a) : (a.pendingProps = e, a.type = t.type, a.flags = 0, a.subtreeFlags = 0, a.deletions = null), a.flags = t.flags & 65011712, a.childLanes = t.childLanes, a.lanes = t.lanes, a.child = t.child, a.memoizedProps = t.memoizedProps, a.memoizedState = t.memoizedState, a.updateQueue = t.updateQueue, e = t.dependencies, a.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }, a.sibling = t.sibling, a.index = t.index, a.ref = t.ref, a.refCleanup = t.refCleanup, a;
  }
  function Ir(t, e) {
    t.flags &= 65011714;
    var a = t.alternate;
    return a === null ? (t.childLanes = 0, t.lanes = e, t.child = null, t.subtreeFlags = 0, t.memoizedProps = null, t.memoizedState = null, t.updateQueue = null, t.dependencies = null, t.stateNode = null) : (t.childLanes = a.childLanes, t.lanes = a.lanes, t.child = a.child, t.subtreeFlags = 0, t.deletions = null, t.memoizedProps = a.memoizedProps, t.memoizedState = a.memoizedState, t.updateQueue = a.updateQueue, t.type = a.type, e = a.dependencies, t.dependencies = e === null ? null : {
      lanes: e.lanes,
      firstContext: e.firstContext
    }), t;
  }
  function Tu(t, e, a, l, n, u) {
    var i = 0;
    if (l = t, typeof t == "function") ec(t) && (i = 1);
    else if (typeof t == "string")
      i = Em(
        t,
        a,
        J.current
      ) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
    else
      t: switch (t) {
        case Rt:
          return t = he(31, a, e, n), t.elementType = Rt, t.lanes = u, t;
        case K:
          return ka(a.children, n, u, e);
        case L:
          i = 8, n |= 24;
          break;
        case I:
          return t = he(12, a, e, n | 2), t.elementType = I, t.lanes = u, t;
        case $:
          return t = he(13, a, e, n), t.elementType = $, t.lanes = u, t;
        case it:
          return t = he(19, a, e, n), t.elementType = it, t.lanes = u, t;
        default:
          if (typeof t == "object" && t !== null)
            switch (t.$$typeof) {
              case tt:
              case H:
                i = 10;
                break t;
              case _:
                i = 9;
                break t;
              case F:
                i = 11;
                break t;
              case C:
                i = 14;
                break t;
              case P:
                i = 16, l = null;
                break t;
            }
          i = 29, a = Error(
            f(130, t === null ? "null" : typeof t, "")
          ), l = null;
      }
    return e = he(i, a, e, n), e.elementType = t, e.type = l, e.lanes = u, e;
  }
  function ka(t, e, a, l) {
    return t = he(7, t, l, e), t.lanes = a, t;
  }
  function ac(t, e, a) {
    return t = he(6, t, null, e), t.lanes = a, t;
  }
  function lc(t, e, a) {
    return e = he(
      4,
      t.children !== null ? t.children : [],
      t.key,
      e
    ), e.lanes = a, e.stateNode = {
      containerInfo: t.containerInfo,
      pendingChildren: null,
      implementation: t.implementation
    }, e;
  }
  var jl = [], Tl = 0, Eu = null, Nu = 0, Ne = [], _e = 0, La = null, Pe = 1, Ie = "";
  function Xa(t, e) {
    jl[Tl++] = Nu, jl[Tl++] = Eu, Eu = t, Nu = e;
  }
  function tf(t, e, a) {
    Ne[_e++] = Pe, Ne[_e++] = Ie, Ne[_e++] = La, La = t;
    var l = Pe;
    t = Ie;
    var n = 32 - $t(l) - 1;
    l &= ~(1 << n), a += 1;
    var u = 32 - $t(e) + n;
    if (30 < u) {
      var i = n - n % 5;
      u = (l & (1 << i) - 1).toString(32), l >>= i, n -= i, Pe = 1 << 32 - $t(e) + n | a << n | l, Ie = u + t;
    } else
      Pe = 1 << u | a << n | l, Ie = t;
  }
  function nc(t) {
    t.return !== null && (Xa(t, 1), tf(t, 1, 0));
  }
  function uc(t) {
    for (; t === Eu; )
      Eu = jl[--Tl], jl[Tl] = null, Nu = jl[--Tl], jl[Tl] = null;
    for (; t === La; )
      La = Ne[--_e], Ne[_e] = null, Ie = Ne[--_e], Ne[_e] = null, Pe = Ne[--_e], Ne[_e] = null;
  }
  var le = null, qt = null, pt = !1, Qa = null, Le = !1, ic = Error(f(519));
  function Za(t) {
    var e = Error(f(418, ""));
    throw vn(Te(e, t)), ic;
  }
  function ef(t) {
    var e = t.stateNode, a = t.type, l = t.memoizedProps;
    switch (e[Ot] = t, e[Xt] = l, a) {
      case "dialog":
        ht("cancel", e), ht("close", e);
        break;
      case "iframe":
      case "object":
      case "embed":
        ht("load", e);
        break;
      case "video":
      case "audio":
        for (a = 0; a < Bn.length; a++)
          ht(Bn[a], e);
        break;
      case "source":
        ht("error", e);
        break;
      case "img":
      case "image":
      case "link":
        ht("error", e), ht("load", e);
        break;
      case "details":
        ht("toggle", e);
        break;
      case "input":
        ht("invalid", e), pr(
          e,
          l.value,
          l.defaultValue,
          l.checked,
          l.defaultChecked,
          l.type,
          l.name,
          !0
        ), ou(e);
        break;
      case "select":
        ht("invalid", e);
        break;
      case "textarea":
        ht("invalid", e), yr(e, l.value, l.defaultValue, l.children), ou(e);
    }
    a = l.children, typeof a != "string" && typeof a != "number" && typeof a != "bigint" || e.textContent === "" + a || l.suppressHydrationWarning === !0 || xd(e.textContent, a) ? (l.popover != null && (ht("beforetoggle", e), ht("toggle", e)), l.onScroll != null && ht("scroll", e), l.onScrollEnd != null && ht("scrollend", e), l.onClick != null && (e.onclick = ui), e = !0) : e = !1, e || Za(t);
  }
  function af(t) {
    for (le = t.return; le; )
      switch (le.tag) {
        case 5:
        case 13:
          Le = !1;
          return;
        case 27:
        case 3:
          Le = !0;
          return;
        default:
          le = le.return;
      }
  }
  function dn(t) {
    if (t !== le) return !1;
    if (!pt) return af(t), pt = !0, !1;
    var e = t.tag, a;
    if ((a = e !== 3 && e !== 27) && ((a = e === 5) && (a = t.type, a = !(a !== "form" && a !== "button") || js(t.type, t.memoizedProps)), a = !a), a && qt && Za(t), af(t), e === 13) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(f(317));
      t: {
        for (t = t.nextSibling, e = 0; t; ) {
          if (t.nodeType === 8)
            if (a = t.data, a === "/$") {
              if (e === 0) {
                qt = we(t.nextSibling);
                break t;
              }
              e--;
            } else
              a !== "$" && a !== "$!" && a !== "$?" || e++;
          t = t.nextSibling;
        }
        qt = null;
      }
    } else
      e === 27 ? (e = qt, Ma(t.type) ? (t = _s, _s = null, qt = t) : qt = e) : qt = le ? we(t.stateNode.nextSibling) : null;
    return !0;
  }
  function hn() {
    qt = le = null, pt = !1;
  }
  function lf() {
    var t = Qa;
    return t !== null && (fe === null ? fe = t : fe.push.apply(
      fe,
      t
    ), Qa = null), t;
  }
  function vn(t) {
    Qa === null ? Qa = [t] : Qa.push(t);
  }
  var cc = D(null), Va = null, ta = null;
  function ma(t, e, a) {
    k(cc, e._currentValue), e._currentValue = a;
  }
  function ea(t) {
    t._currentValue = cc.current, Q(cc);
  }
  function sc(t, e, a) {
    for (; t !== null; ) {
      var l = t.alternate;
      if ((t.childLanes & e) !== e ? (t.childLanes |= e, l !== null && (l.childLanes |= e)) : l !== null && (l.childLanes & e) !== e && (l.childLanes |= e), t === a) break;
      t = t.return;
    }
  }
  function rc(t, e, a, l) {
    var n = t.child;
    for (n !== null && (n.return = t); n !== null; ) {
      var u = n.dependencies;
      if (u !== null) {
        var i = n.child;
        u = u.firstContext;
        t: for (; u !== null; ) {
          var r = u;
          u = n;
          for (var d = 0; d < e.length; d++)
            if (r.context === e[d]) {
              u.lanes |= a, r = u.alternate, r !== null && (r.lanes |= a), sc(
                u.return,
                a,
                t
              ), l || (i = null);
              break t;
            }
          u = r.next;
        }
      } else if (n.tag === 18) {
        if (i = n.return, i === null) throw Error(f(341));
        i.lanes |= a, u = i.alternate, u !== null && (u.lanes |= a), sc(i, a, t), i = null;
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
  function mn(t, e, a, l) {
    t = null;
    for (var n = e, u = !1; n !== null; ) {
      if (!u) {
        if ((n.flags & 524288) !== 0) u = !0;
        else if ((n.flags & 262144) !== 0) break;
      }
      if (n.tag === 10) {
        var i = n.alternate;
        if (i === null) throw Error(f(387));
        if (i = i.memoizedProps, i !== null) {
          var r = n.type;
          de(n.pendingProps.value, i.value) || (t !== null ? t.push(r) : t = [r]);
        }
      } else if (n === Jt.current) {
        if (i = n.alternate, i === null) throw Error(f(387));
        i.memoizedState.memoizedState !== n.memoizedState.memoizedState && (t !== null ? t.push(Qn) : t = [Qn]);
      }
      n = n.return;
    }
    t !== null && rc(
      e,
      t,
      a,
      l
    ), e.flags |= 262144;
  }
  function _u(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!de(
        t.context._currentValue,
        t.memoizedValue
      ))
        return !0;
      t = t.next;
    }
    return !1;
  }
  function Ka(t) {
    Va = t, ta = null, t = t.dependencies, t !== null && (t.firstContext = null);
  }
  function te(t) {
    return nf(Va, t);
  }
  function Au(t, e) {
    return Va === null && Ka(t), nf(t, e);
  }
  function nf(t, e) {
    var a = e._currentValue;
    if (e = { context: e, memoizedValue: a, next: null }, ta === null) {
      if (t === null) throw Error(f(308));
      ta = e, t.dependencies = { lanes: 0, firstContext: e }, t.flags |= 524288;
    } else ta = ta.next = e;
    return a;
  }
  var Tv = typeof AbortController < "u" ? AbortController : function() {
    var t = [], e = this.signal = {
      aborted: !1,
      addEventListener: function(a, l) {
        t.push(l);
      }
    };
    this.abort = function() {
      e.aborted = !0, t.forEach(function(a) {
        return a();
      });
    };
  }, Ev = s.unstable_scheduleCallback, Nv = s.unstable_NormalPriority, kt = {
    $$typeof: H,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function fc() {
    return {
      controller: new Tv(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function pn(t) {
    t.refCount--, t.refCount === 0 && Ev(Nv, function() {
      t.controller.abort();
    });
  }
  var gn = null, oc = 0, El = 0, Nl = null;
  function _v(t, e) {
    if (gn === null) {
      var a = gn = [];
      oc = 0, El = hs(), Nl = {
        status: "pending",
        value: void 0,
        then: function(l) {
          a.push(l);
        }
      };
    }
    return oc++, e.then(uf, uf), e;
  }
  function uf() {
    if (--oc === 0 && gn !== null) {
      Nl !== null && (Nl.status = "fulfilled");
      var t = gn;
      gn = null, El = 0, Nl = null;
      for (var e = 0; e < t.length; e++) (0, t[e])();
    }
  }
  function Av(t, e) {
    var a = [], l = {
      status: "pending",
      value: null,
      reason: null,
      then: function(n) {
        a.push(n);
      }
    };
    return t.then(
      function() {
        l.status = "fulfilled", l.value = e;
        for (var n = 0; n < a.length; n++) (0, a[n])(e);
      },
      function(n) {
        for (l.status = "rejected", l.reason = n, n = 0; n < a.length; n++)
          (0, a[n])(void 0);
      }
    ), l;
  }
  var cf = A.S;
  A.S = function(t, e) {
    typeof e == "object" && e !== null && typeof e.then == "function" && _v(t, e), cf !== null && cf(t, e);
  };
  var Ja = D(null);
  function dc() {
    var t = Ja.current;
    return t !== null ? t : zt.pooledCache;
  }
  function zu(t, e) {
    e === null ? k(Ja, Ja.current) : k(Ja, e.pool);
  }
  function sf() {
    var t = dc();
    return t === null ? null : { parent: kt._currentValue, pool: t };
  }
  var yn = Error(f(460)), rf = Error(f(474)), Ou = Error(f(542)), hc = { then: function() {
  } };
  function ff(t) {
    return t = t.status, t === "fulfilled" || t === "rejected";
  }
  function Mu() {
  }
  function of(t, e, a) {
    switch (a = t[a], a === void 0 ? t.push(e) : a !== e && (e.then(Mu, Mu), e = a), e.status) {
      case "fulfilled":
        return e.value;
      case "rejected":
        throw t = e.reason, hf(t), t;
      default:
        if (typeof e.status == "string") e.then(Mu, Mu);
        else {
          if (t = zt, t !== null && 100 < t.shellSuspendCounter)
            throw Error(f(482));
          t = e, t.status = "pending", t.then(
            function(l) {
              if (e.status === "pending") {
                var n = e;
                n.status = "fulfilled", n.value = l;
              }
            },
            function(l) {
              if (e.status === "pending") {
                var n = e;
                n.status = "rejected", n.reason = l;
              }
            }
          );
        }
        switch (e.status) {
          case "fulfilled":
            return e.value;
          case "rejected":
            throw t = e.reason, hf(t), t;
        }
        throw bn = e, yn;
    }
  }
  var bn = null;
  function df() {
    if (bn === null) throw Error(f(459));
    var t = bn;
    return bn = null, t;
  }
  function hf(t) {
    if (t === yn || t === Ou)
      throw Error(f(483));
  }
  var pa = !1;
  function vc(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function mc(t, e) {
    t = t.updateQueue, e.updateQueue === t && (e.updateQueue = {
      baseState: t.baseState,
      firstBaseUpdate: t.firstBaseUpdate,
      lastBaseUpdate: t.lastBaseUpdate,
      shared: t.shared,
      callbacks: null
    });
  }
  function ga(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function ya(t, e, a) {
    var l = t.updateQueue;
    if (l === null) return null;
    if (l = l.shared, (xt & 2) !== 0) {
      var n = l.pending;
      return n === null ? e.next = e : (e.next = n.next, n.next = e), l.pending = e, e = ju(t), Pr(t, null, a), e;
    }
    return Su(t, l, e, a), ju(t);
  }
  function xn(t, e, a) {
    if (e = e.updateQueue, e !== null && (e = e.shared, (a & 4194048) !== 0)) {
      var l = e.lanes;
      l &= t.pendingLanes, a |= l, e.lanes = a, Il(t, a);
    }
  }
  function pc(t, e) {
    var a = t.updateQueue, l = t.alternate;
    if (l !== null && (l = l.updateQueue, a === l)) {
      var n = null, u = null;
      if (a = a.firstBaseUpdate, a !== null) {
        do {
          var i = {
            lane: a.lane,
            tag: a.tag,
            payload: a.payload,
            callback: null,
            next: null
          };
          u === null ? n = u = i : u = u.next = i, a = a.next;
        } while (a !== null);
        u === null ? n = u = e : u = u.next = e;
      } else n = u = e;
      a = {
        baseState: l.baseState,
        firstBaseUpdate: n,
        lastBaseUpdate: u,
        shared: l.shared,
        callbacks: l.callbacks
      }, t.updateQueue = a;
      return;
    }
    t = a.lastBaseUpdate, t === null ? a.firstBaseUpdate = e : t.next = e, a.lastBaseUpdate = e;
  }
  var gc = !1;
  function Sn() {
    if (gc) {
      var t = Nl;
      if (t !== null) throw t;
    }
  }
  function jn(t, e, a, l) {
    gc = !1;
    var n = t.updateQueue;
    pa = !1;
    var u = n.firstBaseUpdate, i = n.lastBaseUpdate, r = n.shared.pending;
    if (r !== null) {
      n.shared.pending = null;
      var d = r, b = d.next;
      d.next = null, i === null ? u = b : i.next = b, i = d;
      var z = t.alternate;
      z !== null && (z = z.updateQueue, r = z.lastBaseUpdate, r !== i && (r === null ? z.firstBaseUpdate = b : r.next = b, z.lastBaseUpdate = d));
    }
    if (u !== null) {
      var M = n.baseState;
      i = 0, z = b = d = null, r = u;
      do {
        var S = r.lane & -536870913, T = S !== r.lane;
        if (T ? (vt & S) === S : (l & S) === S) {
          S !== 0 && S === El && (gc = !0), z !== null && (z = z.next = {
            lane: 0,
            tag: r.tag,
            payload: r.payload,
            callback: null,
            next: null
          });
          t: {
            var ut = t, at = r;
            S = e;
            var Nt = a;
            switch (at.tag) {
              case 1:
                if (ut = at.payload, typeof ut == "function") {
                  M = ut.call(Nt, M, S);
                  break t;
                }
                M = ut;
                break t;
              case 3:
                ut.flags = ut.flags & -65537 | 128;
              case 0:
                if (ut = at.payload, S = typeof ut == "function" ? ut.call(Nt, M, S) : ut, S == null) break t;
                M = U({}, M, S);
                break t;
              case 2:
                pa = !0;
            }
          }
          S = r.callback, S !== null && (t.flags |= 64, T && (t.flags |= 8192), T = n.callbacks, T === null ? n.callbacks = [S] : T.push(S));
        } else
          T = {
            lane: S,
            tag: r.tag,
            payload: r.payload,
            callback: r.callback,
            next: null
          }, z === null ? (b = z = T, d = M) : z = z.next = T, i |= S;
        if (r = r.next, r === null) {
          if (r = n.shared.pending, r === null)
            break;
          T = r, r = T.next, T.next = null, n.lastBaseUpdate = T, n.shared.pending = null;
        }
      } while (!0);
      z === null && (d = M), n.baseState = d, n.firstBaseUpdate = b, n.lastBaseUpdate = z, u === null && (n.shared.lanes = 0), _a |= i, t.lanes = i, t.memoizedState = M;
    }
  }
  function vf(t, e) {
    if (typeof t != "function")
      throw Error(f(191, t));
    t.call(e);
  }
  function mf(t, e) {
    var a = t.callbacks;
    if (a !== null)
      for (t.callbacks = null, t = 0; t < a.length; t++)
        vf(a[t], e);
  }
  var _l = D(null), Du = D(0);
  function pf(t, e) {
    t = sa, k(Du, t), k(_l, e), sa = t | e.baseLanes;
  }
  function yc() {
    k(Du, sa), k(_l, _l.current);
  }
  function bc() {
    sa = Du.current, Q(_l), Q(Du);
  }
  var ba = 0, rt = null, Tt = null, Yt = null, Ru = !1, Al = !1, $a = !1, Uu = 0, Tn = 0, zl = null, zv = 0;
  function Ht() {
    throw Error(f(321));
  }
  function xc(t, e) {
    if (e === null) return !1;
    for (var a = 0; a < e.length && a < t.length; a++)
      if (!de(t[a], e[a])) return !1;
    return !0;
  }
  function Sc(t, e, a, l, n, u) {
    return ba = u, rt = e, e.memoizedState = null, e.updateQueue = null, e.lanes = 0, A.H = t === null || t.memoizedState === null ? If : to, $a = !1, u = a(l, n), $a = !1, Al && (u = yf(
      e,
      a,
      l,
      n
    )), gf(t), u;
  }
  function gf(t) {
    A.H = Yu;
    var e = Tt !== null && Tt.next !== null;
    if (ba = 0, Yt = Tt = rt = null, Ru = !1, Tn = 0, zl = null, e) throw Error(f(300));
    t === null || Zt || (t = t.dependencies, t !== null && _u(t) && (Zt = !0));
  }
  function yf(t, e, a, l) {
    rt = t;
    var n = 0;
    do {
      if (Al && (zl = null), Tn = 0, Al = !1, 25 <= n) throw Error(f(301));
      if (n += 1, Yt = Tt = null, t.updateQueue != null) {
        var u = t.updateQueue;
        u.lastEffect = null, u.events = null, u.stores = null, u.memoCache != null && (u.memoCache.index = 0);
      }
      A.H = Cv, u = e(a, l);
    } while (Al);
    return u;
  }
  function Ov() {
    var t = A.H, e = t.useState()[0];
    return e = typeof e.then == "function" ? En(e) : e, t = t.useState()[0], (Tt !== null ? Tt.memoizedState : null) !== t && (rt.flags |= 1024), e;
  }
  function jc() {
    var t = Uu !== 0;
    return Uu = 0, t;
  }
  function Tc(t, e, a) {
    e.updateQueue = t.updateQueue, e.flags &= -2053, t.lanes &= ~a;
  }
  function Ec(t) {
    if (Ru) {
      for (t = t.memoizedState; t !== null; ) {
        var e = t.queue;
        e !== null && (e.pending = null), t = t.next;
      }
      Ru = !1;
    }
    ba = 0, Yt = Tt = rt = null, Al = !1, Tn = Uu = 0, zl = null;
  }
  function se() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Yt === null ? rt.memoizedState = Yt = t : Yt = Yt.next = t, Yt;
  }
  function Gt() {
    if (Tt === null) {
      var t = rt.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = Tt.next;
    var e = Yt === null ? rt.memoizedState : Yt.next;
    if (e !== null)
      Yt = e, Tt = t;
    else {
      if (t === null)
        throw rt.alternate === null ? Error(f(467)) : Error(f(310));
      Tt = t, t = {
        memoizedState: Tt.memoizedState,
        baseState: Tt.baseState,
        baseQueue: Tt.baseQueue,
        queue: Tt.queue,
        next: null
      }, Yt === null ? rt.memoizedState = Yt = t : Yt = Yt.next = t;
    }
    return Yt;
  }
  function Nc() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function En(t) {
    var e = Tn;
    return Tn += 1, zl === null && (zl = []), t = of(zl, t, e), e = rt, (Yt === null ? e.memoizedState : Yt.next) === null && (e = e.alternate, A.H = e === null || e.memoizedState === null ? If : to), t;
  }
  function qu(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return En(t);
      if (t.$$typeof === H) return te(t);
    }
    throw Error(f(438, String(t)));
  }
  function _c(t) {
    var e = null, a = rt.updateQueue;
    if (a !== null && (e = a.memoCache), e == null) {
      var l = rt.alternate;
      l !== null && (l = l.updateQueue, l !== null && (l = l.memoCache, l != null && (e = {
        data: l.data.map(function(n) {
          return n.slice();
        }),
        index: 0
      })));
    }
    if (e == null && (e = { data: [], index: 0 }), a === null && (a = Nc(), rt.updateQueue = a), a.memoCache = e, a = e.data[e.index], a === void 0)
      for (a = e.data[e.index] = Array(t), l = 0; l < t; l++)
        a[l] = Be;
    return e.index++, a;
  }
  function aa(t, e) {
    return typeof e == "function" ? e(t) : e;
  }
  function Cu(t) {
    var e = Gt();
    return Ac(e, Tt, t);
  }
  function Ac(t, e, a) {
    var l = t.queue;
    if (l === null) throw Error(f(311));
    l.lastRenderedReducer = a;
    var n = t.baseQueue, u = l.pending;
    if (u !== null) {
      if (n !== null) {
        var i = n.next;
        n.next = u.next, u.next = i;
      }
      e.baseQueue = n = u, l.pending = null;
    }
    if (u = t.baseState, n === null) t.memoizedState = u;
    else {
      e = n.next;
      var r = i = null, d = null, b = e, z = !1;
      do {
        var M = b.lane & -536870913;
        if (M !== b.lane ? (vt & M) === M : (ba & M) === M) {
          var S = b.revertLane;
          if (S === 0)
            d !== null && (d = d.next = {
              lane: 0,
              revertLane: 0,
              action: b.action,
              hasEagerState: b.hasEagerState,
              eagerState: b.eagerState,
              next: null
            }), M === El && (z = !0);
          else if ((ba & S) === S) {
            b = b.next, S === El && (z = !0);
            continue;
          } else
            M = {
              lane: 0,
              revertLane: b.revertLane,
              action: b.action,
              hasEagerState: b.hasEagerState,
              eagerState: b.eagerState,
              next: null
            }, d === null ? (r = d = M, i = u) : d = d.next = M, rt.lanes |= S, _a |= S;
          M = b.action, $a && a(u, M), u = b.hasEagerState ? b.eagerState : a(u, M);
        } else
          S = {
            lane: M,
            revertLane: b.revertLane,
            action: b.action,
            hasEagerState: b.hasEagerState,
            eagerState: b.eagerState,
            next: null
          }, d === null ? (r = d = S, i = u) : d = d.next = S, rt.lanes |= M, _a |= M;
        b = b.next;
      } while (b !== null && b !== e);
      if (d === null ? i = u : d.next = r, !de(u, t.memoizedState) && (Zt = !0, z && (a = Nl, a !== null)))
        throw a;
      t.memoizedState = u, t.baseState = i, t.baseQueue = d, l.lastRenderedState = u;
    }
    return n === null && (l.lanes = 0), [t.memoizedState, l.dispatch];
  }
  function zc(t) {
    var e = Gt(), a = e.queue;
    if (a === null) throw Error(f(311));
    a.lastRenderedReducer = t;
    var l = a.dispatch, n = a.pending, u = e.memoizedState;
    if (n !== null) {
      a.pending = null;
      var i = n = n.next;
      do
        u = t(u, i.action), i = i.next;
      while (i !== n);
      de(u, e.memoizedState) || (Zt = !0), e.memoizedState = u, e.baseQueue === null && (e.baseState = u), a.lastRenderedState = u;
    }
    return [u, l];
  }
  function bf(t, e, a) {
    var l = rt, n = Gt(), u = pt;
    if (u) {
      if (a === void 0) throw Error(f(407));
      a = a();
    } else a = e();
    var i = !de(
      (Tt || n).memoizedState,
      a
    );
    i && (n.memoizedState = a, Zt = !0), n = n.queue;
    var r = jf.bind(null, l, n, t);
    if (Nn(2048, 8, r, [t]), n.getSnapshot !== e || i || Yt !== null && Yt.memoizedState.tag & 1) {
      if (l.flags |= 2048, Ol(
        9,
        wu(),
        Sf.bind(
          null,
          l,
          n,
          a,
          e
        ),
        null
      ), zt === null) throw Error(f(349));
      u || (ba & 124) !== 0 || xf(l, e, a);
    }
    return a;
  }
  function xf(t, e, a) {
    t.flags |= 16384, t = { getSnapshot: e, value: a }, e = rt.updateQueue, e === null ? (e = Nc(), rt.updateQueue = e, e.stores = [t]) : (a = e.stores, a === null ? e.stores = [t] : a.push(t));
  }
  function Sf(t, e, a, l) {
    e.value = a, e.getSnapshot = l, Tf(e) && Ef(t);
  }
  function jf(t, e, a) {
    return a(function() {
      Tf(e) && Ef(t);
    });
  }
  function Tf(t) {
    var e = t.getSnapshot;
    t = t.value;
    try {
      var a = e();
      return !de(t, a);
    } catch {
      return !0;
    }
  }
  function Ef(t) {
    var e = xl(t, 2);
    e !== null && ye(e, t, 2);
  }
  function Oc(t) {
    var e = se();
    if (typeof t == "function") {
      var a = t;
      if (t = a(), $a) {
        Re(!0);
        try {
          a();
        } finally {
          Re(!1);
        }
      }
    }
    return e.memoizedState = e.baseState = t, e.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: aa,
      lastRenderedState: t
    }, e;
  }
  function Nf(t, e, a, l) {
    return t.baseState = a, Ac(
      t,
      Tt,
      typeof l == "function" ? l : aa
    );
  }
  function Mv(t, e, a, l, n) {
    if (Bu(t)) throw Error(f(485));
    if (t = e.action, t !== null) {
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
      A.T !== null ? a(!0) : u.isTransition = !1, l(u), a = e.pending, a === null ? (u.next = e.pending = u, _f(e, u)) : (u.next = a.next, e.pending = a.next = u);
    }
  }
  function _f(t, e) {
    var a = e.action, l = e.payload, n = t.state;
    if (e.isTransition) {
      var u = A.T, i = {};
      A.T = i;
      try {
        var r = a(n, l), d = A.S;
        d !== null && d(i, r), Af(t, e, r);
      } catch (b) {
        Mc(t, e, b);
      } finally {
        A.T = u;
      }
    } else
      try {
        u = a(n, l), Af(t, e, u);
      } catch (b) {
        Mc(t, e, b);
      }
  }
  function Af(t, e, a) {
    a !== null && typeof a == "object" && typeof a.then == "function" ? a.then(
      function(l) {
        zf(t, e, l);
      },
      function(l) {
        return Mc(t, e, l);
      }
    ) : zf(t, e, a);
  }
  function zf(t, e, a) {
    e.status = "fulfilled", e.value = a, Of(e), t.state = a, e = t.pending, e !== null && (a = e.next, a === e ? t.pending = null : (a = a.next, e.next = a, _f(t, a)));
  }
  function Mc(t, e, a) {
    var l = t.pending;
    if (t.pending = null, l !== null) {
      l = l.next;
      do
        e.status = "rejected", e.reason = a, Of(e), e = e.next;
      while (e !== l);
    }
    t.action = null;
  }
  function Of(t) {
    t = t.listeners;
    for (var e = 0; e < t.length; e++) (0, t[e])();
  }
  function Mf(t, e) {
    return e;
  }
  function Df(t, e) {
    if (pt) {
      var a = zt.formState;
      if (a !== null) {
        t: {
          var l = rt;
          if (pt) {
            if (qt) {
              e: {
                for (var n = qt, u = Le; n.nodeType !== 8; ) {
                  if (!u) {
                    n = null;
                    break e;
                  }
                  if (n = we(
                    n.nextSibling
                  ), n === null) {
                    n = null;
                    break e;
                  }
                }
                u = n.data, n = u === "F!" || u === "F" ? n : null;
              }
              if (n) {
                qt = we(
                  n.nextSibling
                ), l = n.data === "F!";
                break t;
              }
            }
            Za(l);
          }
          l = !1;
        }
        l && (e = a[0]);
      }
    }
    return a = se(), a.memoizedState = a.baseState = e, l = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Mf,
      lastRenderedState: e
    }, a.queue = l, a = Wf.bind(
      null,
      rt,
      l
    ), l.dispatch = a, l = Oc(!1), u = Cc.bind(
      null,
      rt,
      !1,
      l.queue
    ), l = se(), n = {
      state: e,
      dispatch: null,
      action: t,
      pending: null
    }, l.queue = n, a = Mv.bind(
      null,
      rt,
      n,
      u,
      a
    ), n.dispatch = a, l.memoizedState = t, [e, a, !1];
  }
  function Rf(t) {
    var e = Gt();
    return Uf(e, Tt, t);
  }
  function Uf(t, e, a) {
    if (e = Ac(
      t,
      e,
      Mf
    )[0], t = Cu(aa)[0], typeof e == "object" && e !== null && typeof e.then == "function")
      try {
        var l = En(e);
      } catch (i) {
        throw i === yn ? Ou : i;
      }
    else l = e;
    e = Gt();
    var n = e.queue, u = n.dispatch;
    return a !== e.memoizedState && (rt.flags |= 2048, Ol(
      9,
      wu(),
      Dv.bind(null, n, a),
      null
    )), [l, u, t];
  }
  function Dv(t, e) {
    t.action = e;
  }
  function qf(t) {
    var e = Gt(), a = Tt;
    if (a !== null)
      return Uf(e, a, t);
    Gt(), e = e.memoizedState, a = Gt();
    var l = a.queue.dispatch;
    return a.memoizedState = t, [e, l, !1];
  }
  function Ol(t, e, a, l) {
    return t = { tag: t, create: a, deps: l, inst: e, next: null }, e = rt.updateQueue, e === null && (e = Nc(), rt.updateQueue = e), a = e.lastEffect, a === null ? e.lastEffect = t.next = t : (l = a.next, a.next = t, t.next = l, e.lastEffect = t), t;
  }
  function wu() {
    return { destroy: void 0, resource: void 0 };
  }
  function Cf() {
    return Gt().memoizedState;
  }
  function Hu(t, e, a, l) {
    var n = se();
    l = l === void 0 ? null : l, rt.flags |= t, n.memoizedState = Ol(
      1 | e,
      wu(),
      a,
      l
    );
  }
  function Nn(t, e, a, l) {
    var n = Gt();
    l = l === void 0 ? null : l;
    var u = n.memoizedState.inst;
    Tt !== null && l !== null && xc(l, Tt.memoizedState.deps) ? n.memoizedState = Ol(e, u, a, l) : (rt.flags |= t, n.memoizedState = Ol(
      1 | e,
      u,
      a,
      l
    ));
  }
  function wf(t, e) {
    Hu(8390656, 8, t, e);
  }
  function Hf(t, e) {
    Nn(2048, 8, t, e);
  }
  function Bf(t, e) {
    return Nn(4, 2, t, e);
  }
  function Yf(t, e) {
    return Nn(4, 4, t, e);
  }
  function Gf(t, e) {
    if (typeof e == "function") {
      t = t();
      var a = e(t);
      return function() {
        typeof a == "function" ? a() : e(null);
      };
    }
    if (e != null)
      return t = t(), e.current = t, function() {
        e.current = null;
      };
  }
  function kf(t, e, a) {
    a = a != null ? a.concat([t]) : null, Nn(4, 4, Gf.bind(null, e, t), a);
  }
  function Dc() {
  }
  function Lf(t, e) {
    var a = Gt();
    e = e === void 0 ? null : e;
    var l = a.memoizedState;
    return e !== null && xc(e, l[1]) ? l[0] : (a.memoizedState = [t, e], t);
  }
  function Xf(t, e) {
    var a = Gt();
    e = e === void 0 ? null : e;
    var l = a.memoizedState;
    if (e !== null && xc(e, l[1]))
      return l[0];
    if (l = t(), $a) {
      Re(!0);
      try {
        t();
      } finally {
        Re(!1);
      }
    }
    return a.memoizedState = [l, e], l;
  }
  function Rc(t, e, a) {
    return a === void 0 || (ba & 1073741824) !== 0 ? t.memoizedState = e : (t.memoizedState = a, t = Ko(), rt.lanes |= t, _a |= t, a);
  }
  function Qf(t, e, a, l) {
    return de(a, e) ? a : _l.current !== null ? (t = Rc(t, a, l), de(t, e) || (Zt = !0), t) : (ba & 42) === 0 ? (Zt = !0, t.memoizedState = a) : (t = Ko(), rt.lanes |= t, _a |= t, e);
  }
  function Zf(t, e, a, l, n) {
    var u = Y.p;
    Y.p = u !== 0 && 8 > u ? u : 8;
    var i = A.T, r = {};
    A.T = r, Cc(t, !1, e, a);
    try {
      var d = n(), b = A.S;
      if (b !== null && b(r, d), d !== null && typeof d == "object" && typeof d.then == "function") {
        var z = Av(
          d,
          l
        );
        _n(
          t,
          e,
          z,
          ge(t)
        );
      } else
        _n(
          t,
          e,
          l,
          ge(t)
        );
    } catch (M) {
      _n(
        t,
        e,
        { then: function() {
        }, status: "rejected", reason: M },
        ge()
      );
    } finally {
      Y.p = u, A.T = i;
    }
  }
  function Rv() {
  }
  function Uc(t, e, a, l) {
    if (t.tag !== 5) throw Error(f(476));
    var n = Vf(t).queue;
    Zf(
      t,
      n,
      e,
      et,
      a === null ? Rv : function() {
        return Kf(t), a(l);
      }
    );
  }
  function Vf(t) {
    var e = t.memoizedState;
    if (e !== null) return e;
    e = {
      memoizedState: et,
      baseState: et,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: aa,
        lastRenderedState: et
      },
      next: null
    };
    var a = {};
    return e.next = {
      memoizedState: a,
      baseState: a,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: aa,
        lastRenderedState: a
      },
      next: null
    }, t.memoizedState = e, t = t.alternate, t !== null && (t.memoizedState = e), e;
  }
  function Kf(t) {
    var e = Vf(t).next.queue;
    _n(t, e, {}, ge());
  }
  function qc() {
    return te(Qn);
  }
  function Jf() {
    return Gt().memoizedState;
  }
  function $f() {
    return Gt().memoizedState;
  }
  function Uv(t) {
    for (var e = t.return; e !== null; ) {
      switch (e.tag) {
        case 24:
        case 3:
          var a = ge();
          t = ga(a);
          var l = ya(e, t, a);
          l !== null && (ye(l, e, a), xn(l, e, a)), e = { cache: fc() }, t.payload = e;
          return;
      }
      e = e.return;
    }
  }
  function qv(t, e, a) {
    var l = ge();
    a = {
      lane: l,
      revertLane: 0,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Bu(t) ? Ff(e, a) : (a = tc(t, e, a, l), a !== null && (ye(a, t, l), Pf(a, e, l)));
  }
  function Wf(t, e, a) {
    var l = ge();
    _n(t, e, a, l);
  }
  function _n(t, e, a, l) {
    var n = {
      lane: l,
      revertLane: 0,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Bu(t)) Ff(e, n);
    else {
      var u = t.alternate;
      if (t.lanes === 0 && (u === null || u.lanes === 0) && (u = e.lastRenderedReducer, u !== null))
        try {
          var i = e.lastRenderedState, r = u(i, a);
          if (n.hasEagerState = !0, n.eagerState = r, de(r, i))
            return Su(t, e, n, 0), zt === null && xu(), !1;
        } catch {
        } finally {
        }
      if (a = tc(t, e, n, l), a !== null)
        return ye(a, t, l), Pf(a, e, l), !0;
    }
    return !1;
  }
  function Cc(t, e, a, l) {
    if (l = {
      lane: 2,
      revertLane: hs(),
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Bu(t)) {
      if (e) throw Error(f(479));
    } else
      e = tc(
        t,
        a,
        l,
        2
      ), e !== null && ye(e, t, 2);
  }
  function Bu(t) {
    var e = t.alternate;
    return t === rt || e !== null && e === rt;
  }
  function Ff(t, e) {
    Al = Ru = !0;
    var a = t.pending;
    a === null ? e.next = e : (e.next = a.next, a.next = e), t.pending = e;
  }
  function Pf(t, e, a) {
    if ((a & 4194048) !== 0) {
      var l = e.lanes;
      l &= t.pendingLanes, a |= l, e.lanes = a, Il(t, a);
    }
  }
  var Yu = {
    readContext: te,
    use: qu,
    useCallback: Ht,
    useContext: Ht,
    useEffect: Ht,
    useImperativeHandle: Ht,
    useLayoutEffect: Ht,
    useInsertionEffect: Ht,
    useMemo: Ht,
    useReducer: Ht,
    useRef: Ht,
    useState: Ht,
    useDebugValue: Ht,
    useDeferredValue: Ht,
    useTransition: Ht,
    useSyncExternalStore: Ht,
    useId: Ht,
    useHostTransitionStatus: Ht,
    useFormState: Ht,
    useActionState: Ht,
    useOptimistic: Ht,
    useMemoCache: Ht,
    useCacheRefresh: Ht
  }, If = {
    readContext: te,
    use: qu,
    useCallback: function(t, e) {
      return se().memoizedState = [
        t,
        e === void 0 ? null : e
      ], t;
    },
    useContext: te,
    useEffect: wf,
    useImperativeHandle: function(t, e, a) {
      a = a != null ? a.concat([t]) : null, Hu(
        4194308,
        4,
        Gf.bind(null, e, t),
        a
      );
    },
    useLayoutEffect: function(t, e) {
      return Hu(4194308, 4, t, e);
    },
    useInsertionEffect: function(t, e) {
      Hu(4, 2, t, e);
    },
    useMemo: function(t, e) {
      var a = se();
      e = e === void 0 ? null : e;
      var l = t();
      if ($a) {
        Re(!0);
        try {
          t();
        } finally {
          Re(!1);
        }
      }
      return a.memoizedState = [l, e], l;
    },
    useReducer: function(t, e, a) {
      var l = se();
      if (a !== void 0) {
        var n = a(e);
        if ($a) {
          Re(!0);
          try {
            a(e);
          } finally {
            Re(!1);
          }
        }
      } else n = e;
      return l.memoizedState = l.baseState = n, t = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: t,
        lastRenderedState: n
      }, l.queue = t, t = t.dispatch = qv.bind(
        null,
        rt,
        t
      ), [l.memoizedState, t];
    },
    useRef: function(t) {
      var e = se();
      return t = { current: t }, e.memoizedState = t;
    },
    useState: function(t) {
      t = Oc(t);
      var e = t.queue, a = Wf.bind(null, rt, e);
      return e.dispatch = a, [t.memoizedState, a];
    },
    useDebugValue: Dc,
    useDeferredValue: function(t, e) {
      var a = se();
      return Rc(a, t, e);
    },
    useTransition: function() {
      var t = Oc(!1);
      return t = Zf.bind(
        null,
        rt,
        t.queue,
        !0,
        !1
      ), se().memoizedState = t, [!1, t];
    },
    useSyncExternalStore: function(t, e, a) {
      var l = rt, n = se();
      if (pt) {
        if (a === void 0)
          throw Error(f(407));
        a = a();
      } else {
        if (a = e(), zt === null)
          throw Error(f(349));
        (vt & 124) !== 0 || xf(l, e, a);
      }
      n.memoizedState = a;
      var u = { value: a, getSnapshot: e };
      return n.queue = u, wf(jf.bind(null, l, u, t), [
        t
      ]), l.flags |= 2048, Ol(
        9,
        wu(),
        Sf.bind(
          null,
          l,
          u,
          a,
          e
        ),
        null
      ), a;
    },
    useId: function() {
      var t = se(), e = zt.identifierPrefix;
      if (pt) {
        var a = Ie, l = Pe;
        a = (l & ~(1 << 32 - $t(l) - 1)).toString(32) + a, e = "«" + e + "R" + a, a = Uu++, 0 < a && (e += "H" + a.toString(32)), e += "»";
      } else
        a = zv++, e = "«" + e + "r" + a.toString(32) + "»";
      return t.memoizedState = e;
    },
    useHostTransitionStatus: qc,
    useFormState: Df,
    useActionState: Df,
    useOptimistic: function(t) {
      var e = se();
      e.memoizedState = e.baseState = t;
      var a = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return e.queue = a, e = Cc.bind(
        null,
        rt,
        !0,
        a
      ), a.dispatch = e, [t, e];
    },
    useMemoCache: _c,
    useCacheRefresh: function() {
      return se().memoizedState = Uv.bind(
        null,
        rt
      );
    }
  }, to = {
    readContext: te,
    use: qu,
    useCallback: Lf,
    useContext: te,
    useEffect: Hf,
    useImperativeHandle: kf,
    useInsertionEffect: Bf,
    useLayoutEffect: Yf,
    useMemo: Xf,
    useReducer: Cu,
    useRef: Cf,
    useState: function() {
      return Cu(aa);
    },
    useDebugValue: Dc,
    useDeferredValue: function(t, e) {
      var a = Gt();
      return Qf(
        a,
        Tt.memoizedState,
        t,
        e
      );
    },
    useTransition: function() {
      var t = Cu(aa)[0], e = Gt().memoizedState;
      return [
        typeof t == "boolean" ? t : En(t),
        e
      ];
    },
    useSyncExternalStore: bf,
    useId: Jf,
    useHostTransitionStatus: qc,
    useFormState: Rf,
    useActionState: Rf,
    useOptimistic: function(t, e) {
      var a = Gt();
      return Nf(a, Tt, t, e);
    },
    useMemoCache: _c,
    useCacheRefresh: $f
  }, Cv = {
    readContext: te,
    use: qu,
    useCallback: Lf,
    useContext: te,
    useEffect: Hf,
    useImperativeHandle: kf,
    useInsertionEffect: Bf,
    useLayoutEffect: Yf,
    useMemo: Xf,
    useReducer: zc,
    useRef: Cf,
    useState: function() {
      return zc(aa);
    },
    useDebugValue: Dc,
    useDeferredValue: function(t, e) {
      var a = Gt();
      return Tt === null ? Rc(a, t, e) : Qf(
        a,
        Tt.memoizedState,
        t,
        e
      );
    },
    useTransition: function() {
      var t = zc(aa)[0], e = Gt().memoizedState;
      return [
        typeof t == "boolean" ? t : En(t),
        e
      ];
    },
    useSyncExternalStore: bf,
    useId: Jf,
    useHostTransitionStatus: qc,
    useFormState: qf,
    useActionState: qf,
    useOptimistic: function(t, e) {
      var a = Gt();
      return Tt !== null ? Nf(a, Tt, t, e) : (a.baseState = t, [t, a.queue.dispatch]);
    },
    useMemoCache: _c,
    useCacheRefresh: $f
  }, Ml = null, An = 0;
  function Gu(t) {
    var e = An;
    return An += 1, Ml === null && (Ml = []), of(Ml, t, e);
  }
  function zn(t, e) {
    e = e.props.ref, t.ref = e !== void 0 ? e : null;
  }
  function ku(t, e) {
    throw e.$$typeof === B ? Error(f(525)) : (t = Object.prototype.toString.call(e), Error(
      f(
        31,
        t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t
      )
    ));
  }
  function eo(t) {
    var e = t._init;
    return e(t._payload);
  }
  function ao(t) {
    function e(p, v) {
      if (t) {
        var y = p.deletions;
        y === null ? (p.deletions = [v], p.flags |= 16) : y.push(v);
      }
    }
    function a(p, v) {
      if (!t) return null;
      for (; v !== null; )
        e(p, v), v = v.sibling;
      return null;
    }
    function l(p) {
      for (var v = /* @__PURE__ */ new Map(); p !== null; )
        p.key !== null ? v.set(p.key, p) : v.set(p.index, p), p = p.sibling;
      return v;
    }
    function n(p, v) {
      return p = Fe(p, v), p.index = 0, p.sibling = null, p;
    }
    function u(p, v, y) {
      return p.index = y, t ? (y = p.alternate, y !== null ? (y = y.index, y < v ? (p.flags |= 67108866, v) : y) : (p.flags |= 67108866, v)) : (p.flags |= 1048576, v);
    }
    function i(p) {
      return t && p.alternate === null && (p.flags |= 67108866), p;
    }
    function r(p, v, y, O) {
      return v === null || v.tag !== 6 ? (v = ac(y, p.mode, O), v.return = p, v) : (v = n(v, y), v.return = p, v);
    }
    function d(p, v, y, O) {
      var Z = y.type;
      return Z === K ? z(
        p,
        v,
        y.props.children,
        O,
        y.key
      ) : v !== null && (v.elementType === Z || typeof Z == "object" && Z !== null && Z.$$typeof === P && eo(Z) === v.type) ? (v = n(v, y.props), zn(v, y), v.return = p, v) : (v = Tu(
        y.type,
        y.key,
        y.props,
        null,
        p.mode,
        O
      ), zn(v, y), v.return = p, v);
    }
    function b(p, v, y, O) {
      return v === null || v.tag !== 4 || v.stateNode.containerInfo !== y.containerInfo || v.stateNode.implementation !== y.implementation ? (v = lc(y, p.mode, O), v.return = p, v) : (v = n(v, y.children || []), v.return = p, v);
    }
    function z(p, v, y, O, Z) {
      return v === null || v.tag !== 7 ? (v = ka(
        y,
        p.mode,
        O,
        Z
      ), v.return = p, v) : (v = n(v, y), v.return = p, v);
    }
    function M(p, v, y) {
      if (typeof v == "string" && v !== "" || typeof v == "number" || typeof v == "bigint")
        return v = ac(
          "" + v,
          p.mode,
          y
        ), v.return = p, v;
      if (typeof v == "object" && v !== null) {
        switch (v.$$typeof) {
          case q:
            return y = Tu(
              v.type,
              v.key,
              v.props,
              null,
              p.mode,
              y
            ), zn(y, v), y.return = p, y;
          case G:
            return v = lc(
              v,
              p.mode,
              y
            ), v.return = p, v;
          case P:
            var O = v._init;
            return v = O(v._payload), M(p, v, y);
        }
        if (wt(v) || jt(v))
          return v = ka(
            v,
            p.mode,
            y,
            null
          ), v.return = p, v;
        if (typeof v.then == "function")
          return M(p, Gu(v), y);
        if (v.$$typeof === H)
          return M(
            p,
            Au(p, v),
            y
          );
        ku(p, v);
      }
      return null;
    }
    function S(p, v, y, O) {
      var Z = v !== null ? v.key : null;
      if (typeof y == "string" && y !== "" || typeof y == "number" || typeof y == "bigint")
        return Z !== null ? null : r(p, v, "" + y, O);
      if (typeof y == "object" && y !== null) {
        switch (y.$$typeof) {
          case q:
            return y.key === Z ? d(p, v, y, O) : null;
          case G:
            return y.key === Z ? b(p, v, y, O) : null;
          case P:
            return Z = y._init, y = Z(y._payload), S(p, v, y, O);
        }
        if (wt(y) || jt(y))
          return Z !== null ? null : z(p, v, y, O, null);
        if (typeof y.then == "function")
          return S(
            p,
            v,
            Gu(y),
            O
          );
        if (y.$$typeof === H)
          return S(
            p,
            v,
            Au(p, y),
            O
          );
        ku(p, y);
      }
      return null;
    }
    function T(p, v, y, O, Z) {
      if (typeof O == "string" && O !== "" || typeof O == "number" || typeof O == "bigint")
        return p = p.get(y) || null, r(v, p, "" + O, Z);
      if (typeof O == "object" && O !== null) {
        switch (O.$$typeof) {
          case q:
            return p = p.get(
              O.key === null ? y : O.key
            ) || null, d(v, p, O, Z);
          case G:
            return p = p.get(
              O.key === null ? y : O.key
            ) || null, b(v, p, O, Z);
          case P:
            var ft = O._init;
            return O = ft(O._payload), T(
              p,
              v,
              y,
              O,
              Z
            );
        }
        if (wt(O) || jt(O))
          return p = p.get(y) || null, z(v, p, O, Z, null);
        if (typeof O.then == "function")
          return T(
            p,
            v,
            y,
            Gu(O),
            Z
          );
        if (O.$$typeof === H)
          return T(
            p,
            v,
            y,
            Au(v, O),
            Z
          );
        ku(v, O);
      }
      return null;
    }
    function ut(p, v, y, O) {
      for (var Z = null, ft = null, W = v, lt = v = 0, Kt = null; W !== null && lt < y.length; lt++) {
        W.index > lt ? (Kt = W, W = null) : Kt = W.sibling;
        var mt = S(
          p,
          W,
          y[lt],
          O
        );
        if (mt === null) {
          W === null && (W = Kt);
          break;
        }
        t && W && mt.alternate === null && e(p, W), v = u(mt, v, lt), ft === null ? Z = mt : ft.sibling = mt, ft = mt, W = Kt;
      }
      if (lt === y.length)
        return a(p, W), pt && Xa(p, lt), Z;
      if (W === null) {
        for (; lt < y.length; lt++)
          W = M(p, y[lt], O), W !== null && (v = u(
            W,
            v,
            lt
          ), ft === null ? Z = W : ft.sibling = W, ft = W);
        return pt && Xa(p, lt), Z;
      }
      for (W = l(W); lt < y.length; lt++)
        Kt = T(
          W,
          p,
          lt,
          y[lt],
          O
        ), Kt !== null && (t && Kt.alternate !== null && W.delete(
          Kt.key === null ? lt : Kt.key
        ), v = u(
          Kt,
          v,
          lt
        ), ft === null ? Z = Kt : ft.sibling = Kt, ft = Kt);
      return t && W.forEach(function(Ca) {
        return e(p, Ca);
      }), pt && Xa(p, lt), Z;
    }
    function at(p, v, y, O) {
      if (y == null) throw Error(f(151));
      for (var Z = null, ft = null, W = v, lt = v = 0, Kt = null, mt = y.next(); W !== null && !mt.done; lt++, mt = y.next()) {
        W.index > lt ? (Kt = W, W = null) : Kt = W.sibling;
        var Ca = S(p, W, mt.value, O);
        if (Ca === null) {
          W === null && (W = Kt);
          break;
        }
        t && W && Ca.alternate === null && e(p, W), v = u(Ca, v, lt), ft === null ? Z = Ca : ft.sibling = Ca, ft = Ca, W = Kt;
      }
      if (mt.done)
        return a(p, W), pt && Xa(p, lt), Z;
      if (W === null) {
        for (; !mt.done; lt++, mt = y.next())
          mt = M(p, mt.value, O), mt !== null && (v = u(mt, v, lt), ft === null ? Z = mt : ft.sibling = mt, ft = mt);
        return pt && Xa(p, lt), Z;
      }
      for (W = l(W); !mt.done; lt++, mt = y.next())
        mt = T(W, p, lt, mt.value, O), mt !== null && (t && mt.alternate !== null && W.delete(mt.key === null ? lt : mt.key), v = u(mt, v, lt), ft === null ? Z = mt : ft.sibling = mt, ft = mt);
      return t && W.forEach(function(wm) {
        return e(p, wm);
      }), pt && Xa(p, lt), Z;
    }
    function Nt(p, v, y, O) {
      if (typeof y == "object" && y !== null && y.type === K && y.key === null && (y = y.props.children), typeof y == "object" && y !== null) {
        switch (y.$$typeof) {
          case q:
            t: {
              for (var Z = y.key; v !== null; ) {
                if (v.key === Z) {
                  if (Z = y.type, Z === K) {
                    if (v.tag === 7) {
                      a(
                        p,
                        v.sibling
                      ), O = n(
                        v,
                        y.props.children
                      ), O.return = p, p = O;
                      break t;
                    }
                  } else if (v.elementType === Z || typeof Z == "object" && Z !== null && Z.$$typeof === P && eo(Z) === v.type) {
                    a(
                      p,
                      v.sibling
                    ), O = n(v, y.props), zn(O, y), O.return = p, p = O;
                    break t;
                  }
                  a(p, v);
                  break;
                } else e(p, v);
                v = v.sibling;
              }
              y.type === K ? (O = ka(
                y.props.children,
                p.mode,
                O,
                y.key
              ), O.return = p, p = O) : (O = Tu(
                y.type,
                y.key,
                y.props,
                null,
                p.mode,
                O
              ), zn(O, y), O.return = p, p = O);
            }
            return i(p);
          case G:
            t: {
              for (Z = y.key; v !== null; ) {
                if (v.key === Z)
                  if (v.tag === 4 && v.stateNode.containerInfo === y.containerInfo && v.stateNode.implementation === y.implementation) {
                    a(
                      p,
                      v.sibling
                    ), O = n(v, y.children || []), O.return = p, p = O;
                    break t;
                  } else {
                    a(p, v);
                    break;
                  }
                else e(p, v);
                v = v.sibling;
              }
              O = lc(y, p.mode, O), O.return = p, p = O;
            }
            return i(p);
          case P:
            return Z = y._init, y = Z(y._payload), Nt(
              p,
              v,
              y,
              O
            );
        }
        if (wt(y))
          return ut(
            p,
            v,
            y,
            O
          );
        if (jt(y)) {
          if (Z = jt(y), typeof Z != "function") throw Error(f(150));
          return y = Z.call(y), at(
            p,
            v,
            y,
            O
          );
        }
        if (typeof y.then == "function")
          return Nt(
            p,
            v,
            Gu(y),
            O
          );
        if (y.$$typeof === H)
          return Nt(
            p,
            v,
            Au(p, y),
            O
          );
        ku(p, y);
      }
      return typeof y == "string" && y !== "" || typeof y == "number" || typeof y == "bigint" ? (y = "" + y, v !== null && v.tag === 6 ? (a(p, v.sibling), O = n(v, y), O.return = p, p = O) : (a(p, v), O = ac(y, p.mode, O), O.return = p, p = O), i(p)) : a(p, v);
    }
    return function(p, v, y, O) {
      try {
        An = 0;
        var Z = Nt(
          p,
          v,
          y,
          O
        );
        return Ml = null, Z;
      } catch (W) {
        if (W === yn || W === Ou) throw W;
        var ft = he(29, W, null, p.mode);
        return ft.lanes = O, ft.return = p, ft;
      } finally {
      }
    };
  }
  var Dl = ao(!0), lo = ao(!1), Ae = D(null), Xe = null;
  function xa(t) {
    var e = t.alternate;
    k(Lt, Lt.current & 1), k(Ae, t), Xe === null && (e === null || _l.current !== null || e.memoizedState !== null) && (Xe = t);
  }
  function no(t) {
    if (t.tag === 22) {
      if (k(Lt, Lt.current), k(Ae, t), Xe === null) {
        var e = t.alternate;
        e !== null && e.memoizedState !== null && (Xe = t);
      }
    } else Sa();
  }
  function Sa() {
    k(Lt, Lt.current), k(Ae, Ae.current);
  }
  function la(t) {
    Q(Ae), Xe === t && (Xe = null), Q(Lt);
  }
  var Lt = D(0);
  function Lu(t) {
    for (var e = t; e !== null; ) {
      if (e.tag === 13) {
        var a = e.memoizedState;
        if (a !== null && (a = a.dehydrated, a === null || a.data === "$?" || Ns(a)))
          return e;
      } else if (e.tag === 19 && e.memoizedProps.revealOrder !== void 0) {
        if ((e.flags & 128) !== 0) return e;
      } else if (e.child !== null) {
        e.child.return = e, e = e.child;
        continue;
      }
      if (e === t) break;
      for (; e.sibling === null; ) {
        if (e.return === null || e.return === t) return null;
        e = e.return;
      }
      e.sibling.return = e.return, e = e.sibling;
    }
    return null;
  }
  function wc(t, e, a, l) {
    e = t.memoizedState, a = a(l, e), a = a == null ? e : U({}, e, a), t.memoizedState = a, t.lanes === 0 && (t.updateQueue.baseState = a);
  }
  var Hc = {
    enqueueSetState: function(t, e, a) {
      t = t._reactInternals;
      var l = ge(), n = ga(l);
      n.payload = e, a != null && (n.callback = a), e = ya(t, n, l), e !== null && (ye(e, t, l), xn(e, t, l));
    },
    enqueueReplaceState: function(t, e, a) {
      t = t._reactInternals;
      var l = ge(), n = ga(l);
      n.tag = 1, n.payload = e, a != null && (n.callback = a), e = ya(t, n, l), e !== null && (ye(e, t, l), xn(e, t, l));
    },
    enqueueForceUpdate: function(t, e) {
      t = t._reactInternals;
      var a = ge(), l = ga(a);
      l.tag = 2, e != null && (l.callback = e), e = ya(t, l, a), e !== null && (ye(e, t, a), xn(e, t, a));
    }
  };
  function uo(t, e, a, l, n, u, i) {
    return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(l, u, i) : e.prototype && e.prototype.isPureReactComponent ? !fn(a, l) || !fn(n, u) : !0;
  }
  function io(t, e, a, l) {
    t = e.state, typeof e.componentWillReceiveProps == "function" && e.componentWillReceiveProps(a, l), typeof e.UNSAFE_componentWillReceiveProps == "function" && e.UNSAFE_componentWillReceiveProps(a, l), e.state !== t && Hc.enqueueReplaceState(e, e.state, null);
  }
  function Wa(t, e) {
    var a = e;
    if ("ref" in e) {
      a = {};
      for (var l in e)
        l !== "ref" && (a[l] = e[l]);
    }
    if (t = t.defaultProps) {
      a === e && (a = U({}, a));
      for (var n in t)
        a[n] === void 0 && (a[n] = t[n]);
    }
    return a;
  }
  var Xu = typeof reportError == "function" ? reportError : function(t) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var e = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof t == "object" && t !== null && typeof t.message == "string" ? String(t.message) : String(t),
        error: t
      });
      if (!window.dispatchEvent(e)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", t);
      return;
    }
    console.error(t);
  };
  function co(t) {
    Xu(t);
  }
  function so(t) {
    console.error(t);
  }
  function ro(t) {
    Xu(t);
  }
  function Qu(t, e) {
    try {
      var a = t.onUncaughtError;
      a(e.value, { componentStack: e.stack });
    } catch (l) {
      setTimeout(function() {
        throw l;
      });
    }
  }
  function fo(t, e, a) {
    try {
      var l = t.onCaughtError;
      l(a.value, {
        componentStack: a.stack,
        errorBoundary: e.tag === 1 ? e.stateNode : null
      });
    } catch (n) {
      setTimeout(function() {
        throw n;
      });
    }
  }
  function Bc(t, e, a) {
    return a = ga(a), a.tag = 3, a.payload = { element: null }, a.callback = function() {
      Qu(t, e);
    }, a;
  }
  function oo(t) {
    return t = ga(t), t.tag = 3, t;
  }
  function ho(t, e, a, l) {
    var n = a.type.getDerivedStateFromError;
    if (typeof n == "function") {
      var u = l.value;
      t.payload = function() {
        return n(u);
      }, t.callback = function() {
        fo(e, a, l);
      };
    }
    var i = a.stateNode;
    i !== null && typeof i.componentDidCatch == "function" && (t.callback = function() {
      fo(e, a, l), typeof n != "function" && (Aa === null ? Aa = /* @__PURE__ */ new Set([this]) : Aa.add(this));
      var r = l.stack;
      this.componentDidCatch(l.value, {
        componentStack: r !== null ? r : ""
      });
    });
  }
  function wv(t, e, a, l, n) {
    if (a.flags |= 32768, l !== null && typeof l == "object" && typeof l.then == "function") {
      if (e = a.alternate, e !== null && mn(
        e,
        a,
        n,
        !0
      ), a = Ae.current, a !== null) {
        switch (a.tag) {
          case 13:
            return Xe === null ? ss() : a.alternate === null && Ct === 0 && (Ct = 3), a.flags &= -257, a.flags |= 65536, a.lanes = n, l === hc ? a.flags |= 16384 : (e = a.updateQueue, e === null ? a.updateQueue = /* @__PURE__ */ new Set([l]) : e.add(l), fs(t, l, n)), !1;
          case 22:
            return a.flags |= 65536, l === hc ? a.flags |= 16384 : (e = a.updateQueue, e === null ? (e = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([l])
            }, a.updateQueue = e) : (a = e.retryQueue, a === null ? e.retryQueue = /* @__PURE__ */ new Set([l]) : a.add(l)), fs(t, l, n)), !1;
        }
        throw Error(f(435, a.tag));
      }
      return fs(t, l, n), ss(), !1;
    }
    if (pt)
      return e = Ae.current, e !== null ? ((e.flags & 65536) === 0 && (e.flags |= 256), e.flags |= 65536, e.lanes = n, l !== ic && (t = Error(f(422), { cause: l }), vn(Te(t, a)))) : (l !== ic && (e = Error(f(423), {
        cause: l
      }), vn(
        Te(e, a)
      )), t = t.current.alternate, t.flags |= 65536, n &= -n, t.lanes |= n, l = Te(l, a), n = Bc(
        t.stateNode,
        l,
        n
      ), pc(t, n), Ct !== 4 && (Ct = 2)), !1;
    var u = Error(f(520), { cause: l });
    if (u = Te(u, a), Cn === null ? Cn = [u] : Cn.push(u), Ct !== 4 && (Ct = 2), e === null) return !0;
    l = Te(l, a), a = e;
    do {
      switch (a.tag) {
        case 3:
          return a.flags |= 65536, t = n & -n, a.lanes |= t, t = Bc(a.stateNode, l, t), pc(a, t), !1;
        case 1:
          if (e = a.type, u = a.stateNode, (a.flags & 128) === 0 && (typeof e.getDerivedStateFromError == "function" || u !== null && typeof u.componentDidCatch == "function" && (Aa === null || !Aa.has(u))))
            return a.flags |= 65536, n &= -n, a.lanes |= n, n = oo(n), ho(
              n,
              t,
              a,
              l
            ), pc(a, n), !1;
      }
      a = a.return;
    } while (a !== null);
    return !1;
  }
  var vo = Error(f(461)), Zt = !1;
  function Wt(t, e, a, l) {
    e.child = t === null ? lo(e, null, a, l) : Dl(
      e,
      t.child,
      a,
      l
    );
  }
  function mo(t, e, a, l, n) {
    a = a.render;
    var u = e.ref;
    if ("ref" in l) {
      var i = {};
      for (var r in l)
        r !== "ref" && (i[r] = l[r]);
    } else i = l;
    return Ka(e), l = Sc(
      t,
      e,
      a,
      i,
      u,
      n
    ), r = jc(), t !== null && !Zt ? (Tc(t, e, n), na(t, e, n)) : (pt && r && nc(e), e.flags |= 1, Wt(t, e, l, n), e.child);
  }
  function po(t, e, a, l, n) {
    if (t === null) {
      var u = a.type;
      return typeof u == "function" && !ec(u) && u.defaultProps === void 0 && a.compare === null ? (e.tag = 15, e.type = u, go(
        t,
        e,
        u,
        l,
        n
      )) : (t = Tu(
        a.type,
        null,
        l,
        e,
        e.mode,
        n
      ), t.ref = e.ref, t.return = e, e.child = t);
    }
    if (u = t.child, !Vc(t, n)) {
      var i = u.memoizedProps;
      if (a = a.compare, a = a !== null ? a : fn, a(i, l) && t.ref === e.ref)
        return na(t, e, n);
    }
    return e.flags |= 1, t = Fe(u, l), t.ref = e.ref, t.return = e, e.child = t;
  }
  function go(t, e, a, l, n) {
    if (t !== null) {
      var u = t.memoizedProps;
      if (fn(u, l) && t.ref === e.ref)
        if (Zt = !1, e.pendingProps = l = u, Vc(t, n))
          (t.flags & 131072) !== 0 && (Zt = !0);
        else
          return e.lanes = t.lanes, na(t, e, n);
    }
    return Yc(
      t,
      e,
      a,
      l,
      n
    );
  }
  function yo(t, e, a) {
    var l = e.pendingProps, n = l.children, u = t !== null ? t.memoizedState : null;
    if (l.mode === "hidden") {
      if ((e.flags & 128) !== 0) {
        if (l = u !== null ? u.baseLanes | a : a, t !== null) {
          for (n = e.child = t.child, u = 0; n !== null; )
            u = u | n.lanes | n.childLanes, n = n.sibling;
          e.childLanes = u & ~l;
        } else e.childLanes = 0, e.child = null;
        return bo(
          t,
          e,
          l,
          a
        );
      }
      if ((a & 536870912) !== 0)
        e.memoizedState = { baseLanes: 0, cachePool: null }, t !== null && zu(
          e,
          u !== null ? u.cachePool : null
        ), u !== null ? pf(e, u) : yc(), no(e);
      else
        return e.lanes = e.childLanes = 536870912, bo(
          t,
          e,
          u !== null ? u.baseLanes | a : a,
          a
        );
    } else
      u !== null ? (zu(e, u.cachePool), pf(e, u), Sa(), e.memoizedState = null) : (t !== null && zu(e, null), yc(), Sa());
    return Wt(t, e, n, a), e.child;
  }
  function bo(t, e, a, l) {
    var n = dc();
    return n = n === null ? null : { parent: kt._currentValue, pool: n }, e.memoizedState = {
      baseLanes: a,
      cachePool: n
    }, t !== null && zu(e, null), yc(), no(e), t !== null && mn(t, e, l, !0), null;
  }
  function Zu(t, e) {
    var a = e.ref;
    if (a === null)
      t !== null && t.ref !== null && (e.flags |= 4194816);
    else {
      if (typeof a != "function" && typeof a != "object")
        throw Error(f(284));
      (t === null || t.ref !== a) && (e.flags |= 4194816);
    }
  }
  function Yc(t, e, a, l, n) {
    return Ka(e), a = Sc(
      t,
      e,
      a,
      l,
      void 0,
      n
    ), l = jc(), t !== null && !Zt ? (Tc(t, e, n), na(t, e, n)) : (pt && l && nc(e), e.flags |= 1, Wt(t, e, a, n), e.child);
  }
  function xo(t, e, a, l, n, u) {
    return Ka(e), e.updateQueue = null, a = yf(
      e,
      l,
      a,
      n
    ), gf(t), l = jc(), t !== null && !Zt ? (Tc(t, e, u), na(t, e, u)) : (pt && l && nc(e), e.flags |= 1, Wt(t, e, a, u), e.child);
  }
  function So(t, e, a, l, n) {
    if (Ka(e), e.stateNode === null) {
      var u = Sl, i = a.contextType;
      typeof i == "object" && i !== null && (u = te(i)), u = new a(l, u), e.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null, u.updater = Hc, e.stateNode = u, u._reactInternals = e, u = e.stateNode, u.props = l, u.state = e.memoizedState, u.refs = {}, vc(e), i = a.contextType, u.context = typeof i == "object" && i !== null ? te(i) : Sl, u.state = e.memoizedState, i = a.getDerivedStateFromProps, typeof i == "function" && (wc(
        e,
        a,
        i,
        l
      ), u.state = e.memoizedState), typeof a.getDerivedStateFromProps == "function" || typeof u.getSnapshotBeforeUpdate == "function" || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (i = u.state, typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount(), i !== u.state && Hc.enqueueReplaceState(u, u.state, null), jn(e, l, u, n), Sn(), u.state = e.memoizedState), typeof u.componentDidMount == "function" && (e.flags |= 4194308), l = !0;
    } else if (t === null) {
      u = e.stateNode;
      var r = e.memoizedProps, d = Wa(a, r);
      u.props = d;
      var b = u.context, z = a.contextType;
      i = Sl, typeof z == "object" && z !== null && (i = te(z));
      var M = a.getDerivedStateFromProps;
      z = typeof M == "function" || typeof u.getSnapshotBeforeUpdate == "function", r = e.pendingProps !== r, z || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (r || b !== i) && io(
        e,
        u,
        l,
        i
      ), pa = !1;
      var S = e.memoizedState;
      u.state = S, jn(e, l, u, n), Sn(), b = e.memoizedState, r || S !== b || pa ? (typeof M == "function" && (wc(
        e,
        a,
        M,
        l
      ), b = e.memoizedState), (d = pa || uo(
        e,
        a,
        d,
        l,
        S,
        b,
        i
      )) ? (z || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function" && (e.flags |= 4194308)) : (typeof u.componentDidMount == "function" && (e.flags |= 4194308), e.memoizedProps = l, e.memoizedState = b), u.props = l, u.state = b, u.context = i, l = d) : (typeof u.componentDidMount == "function" && (e.flags |= 4194308), l = !1);
    } else {
      u = e.stateNode, mc(t, e), i = e.memoizedProps, z = Wa(a, i), u.props = z, M = e.pendingProps, S = u.context, b = a.contextType, d = Sl, typeof b == "object" && b !== null && (d = te(b)), r = a.getDerivedStateFromProps, (b = typeof r == "function" || typeof u.getSnapshotBeforeUpdate == "function") || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (i !== M || S !== d) && io(
        e,
        u,
        l,
        d
      ), pa = !1, S = e.memoizedState, u.state = S, jn(e, l, u, n), Sn();
      var T = e.memoizedState;
      i !== M || S !== T || pa || t !== null && t.dependencies !== null && _u(t.dependencies) ? (typeof r == "function" && (wc(
        e,
        a,
        r,
        l
      ), T = e.memoizedState), (z = pa || uo(
        e,
        a,
        z,
        l,
        S,
        T,
        d
      ) || t !== null && t.dependencies !== null && _u(t.dependencies)) ? (b || typeof u.UNSAFE_componentWillUpdate != "function" && typeof u.componentWillUpdate != "function" || (typeof u.componentWillUpdate == "function" && u.componentWillUpdate(l, T, d), typeof u.UNSAFE_componentWillUpdate == "function" && u.UNSAFE_componentWillUpdate(
        l,
        T,
        d
      )), typeof u.componentDidUpdate == "function" && (e.flags |= 4), typeof u.getSnapshotBeforeUpdate == "function" && (e.flags |= 1024)) : (typeof u.componentDidUpdate != "function" || i === t.memoizedProps && S === t.memoizedState || (e.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || i === t.memoizedProps && S === t.memoizedState || (e.flags |= 1024), e.memoizedProps = l, e.memoizedState = T), u.props = l, u.state = T, u.context = d, l = z) : (typeof u.componentDidUpdate != "function" || i === t.memoizedProps && S === t.memoizedState || (e.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || i === t.memoizedProps && S === t.memoizedState || (e.flags |= 1024), l = !1);
    }
    return u = l, Zu(t, e), l = (e.flags & 128) !== 0, u || l ? (u = e.stateNode, a = l && typeof a.getDerivedStateFromError != "function" ? null : u.render(), e.flags |= 1, t !== null && l ? (e.child = Dl(
      e,
      t.child,
      null,
      n
    ), e.child = Dl(
      e,
      null,
      a,
      n
    )) : Wt(t, e, a, n), e.memoizedState = u.state, t = e.child) : t = na(
      t,
      e,
      n
    ), t;
  }
  function jo(t, e, a, l) {
    return hn(), e.flags |= 256, Wt(t, e, a, l), e.child;
  }
  var Gc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function kc(t) {
    return { baseLanes: t, cachePool: sf() };
  }
  function Lc(t, e, a) {
    return t = t !== null ? t.childLanes & ~a : 0, e && (t |= ze), t;
  }
  function To(t, e, a) {
    var l = e.pendingProps, n = !1, u = (e.flags & 128) !== 0, i;
    if ((i = u) || (i = t !== null && t.memoizedState === null ? !1 : (Lt.current & 2) !== 0), i && (n = !0, e.flags &= -129), i = (e.flags & 32) !== 0, e.flags &= -33, t === null) {
      if (pt) {
        if (n ? xa(e) : Sa(), pt) {
          var r = qt, d;
          if (d = r) {
            t: {
              for (d = r, r = Le; d.nodeType !== 8; ) {
                if (!r) {
                  r = null;
                  break t;
                }
                if (d = we(
                  d.nextSibling
                ), d === null) {
                  r = null;
                  break t;
                }
              }
              r = d;
            }
            r !== null ? (e.memoizedState = {
              dehydrated: r,
              treeContext: La !== null ? { id: Pe, overflow: Ie } : null,
              retryLane: 536870912,
              hydrationErrors: null
            }, d = he(
              18,
              null,
              null,
              0
            ), d.stateNode = r, d.return = e, e.child = d, le = e, qt = null, d = !0) : d = !1;
          }
          d || Za(e);
        }
        if (r = e.memoizedState, r !== null && (r = r.dehydrated, r !== null))
          return Ns(r) ? e.lanes = 32 : e.lanes = 536870912, null;
        la(e);
      }
      return r = l.children, l = l.fallback, n ? (Sa(), n = e.mode, r = Vu(
        { mode: "hidden", children: r },
        n
      ), l = ka(
        l,
        n,
        a,
        null
      ), r.return = e, l.return = e, r.sibling = l, e.child = r, n = e.child, n.memoizedState = kc(a), n.childLanes = Lc(
        t,
        i,
        a
      ), e.memoizedState = Gc, l) : (xa(e), Xc(e, r));
    }
    if (d = t.memoizedState, d !== null && (r = d.dehydrated, r !== null)) {
      if (u)
        e.flags & 256 ? (xa(e), e.flags &= -257, e = Qc(
          t,
          e,
          a
        )) : e.memoizedState !== null ? (Sa(), e.child = t.child, e.flags |= 128, e = null) : (Sa(), n = l.fallback, r = e.mode, l = Vu(
          { mode: "visible", children: l.children },
          r
        ), n = ka(
          n,
          r,
          a,
          null
        ), n.flags |= 2, l.return = e, n.return = e, l.sibling = n, e.child = l, Dl(
          e,
          t.child,
          null,
          a
        ), l = e.child, l.memoizedState = kc(a), l.childLanes = Lc(
          t,
          i,
          a
        ), e.memoizedState = Gc, e = n);
      else if (xa(e), Ns(r)) {
        if (i = r.nextSibling && r.nextSibling.dataset, i) var b = i.dgst;
        i = b, l = Error(f(419)), l.stack = "", l.digest = i, vn({ value: l, source: null, stack: null }), e = Qc(
          t,
          e,
          a
        );
      } else if (Zt || mn(t, e, a, !1), i = (a & t.childLanes) !== 0, Zt || i) {
        if (i = zt, i !== null && (l = a & -a, l = (l & 42) !== 0 ? 1 : il(l), l = (l & (i.suspendedLanes | a)) !== 0 ? 0 : l, l !== 0 && l !== d.retryLane))
          throw d.retryLane = l, xl(t, l), ye(i, t, l), vo;
        r.data === "$?" || ss(), e = Qc(
          t,
          e,
          a
        );
      } else
        r.data === "$?" ? (e.flags |= 192, e.child = t.child, e = null) : (t = d.treeContext, qt = we(
          r.nextSibling
        ), le = e, pt = !0, Qa = null, Le = !1, t !== null && (Ne[_e++] = Pe, Ne[_e++] = Ie, Ne[_e++] = La, Pe = t.id, Ie = t.overflow, La = e), e = Xc(
          e,
          l.children
        ), e.flags |= 4096);
      return e;
    }
    return n ? (Sa(), n = l.fallback, r = e.mode, d = t.child, b = d.sibling, l = Fe(d, {
      mode: "hidden",
      children: l.children
    }), l.subtreeFlags = d.subtreeFlags & 65011712, b !== null ? n = Fe(b, n) : (n = ka(
      n,
      r,
      a,
      null
    ), n.flags |= 2), n.return = e, l.return = e, l.sibling = n, e.child = l, l = n, n = e.child, r = t.child.memoizedState, r === null ? r = kc(a) : (d = r.cachePool, d !== null ? (b = kt._currentValue, d = d.parent !== b ? { parent: b, pool: b } : d) : d = sf(), r = {
      baseLanes: r.baseLanes | a,
      cachePool: d
    }), n.memoizedState = r, n.childLanes = Lc(
      t,
      i,
      a
    ), e.memoizedState = Gc, l) : (xa(e), a = t.child, t = a.sibling, a = Fe(a, {
      mode: "visible",
      children: l.children
    }), a.return = e, a.sibling = null, t !== null && (i = e.deletions, i === null ? (e.deletions = [t], e.flags |= 16) : i.push(t)), e.child = a, e.memoizedState = null, a);
  }
  function Xc(t, e) {
    return e = Vu(
      { mode: "visible", children: e },
      t.mode
    ), e.return = t, t.child = e;
  }
  function Vu(t, e) {
    return t = he(22, t, null, e), t.lanes = 0, t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }, t;
  }
  function Qc(t, e, a) {
    return Dl(e, t.child, null, a), t = Xc(
      e,
      e.pendingProps.children
    ), t.flags |= 2, e.memoizedState = null, t;
  }
  function Eo(t, e, a) {
    t.lanes |= e;
    var l = t.alternate;
    l !== null && (l.lanes |= e), sc(t.return, e, a);
  }
  function Zc(t, e, a, l, n) {
    var u = t.memoizedState;
    u === null ? t.memoizedState = {
      isBackwards: e,
      rendering: null,
      renderingStartTime: 0,
      last: l,
      tail: a,
      tailMode: n
    } : (u.isBackwards = e, u.rendering = null, u.renderingStartTime = 0, u.last = l, u.tail = a, u.tailMode = n);
  }
  function No(t, e, a) {
    var l = e.pendingProps, n = l.revealOrder, u = l.tail;
    if (Wt(t, e, l.children, a), l = Lt.current, (l & 2) !== 0)
      l = l & 1 | 2, e.flags |= 128;
    else {
      if (t !== null && (t.flags & 128) !== 0)
        t: for (t = e.child; t !== null; ) {
          if (t.tag === 13)
            t.memoizedState !== null && Eo(t, a, e);
          else if (t.tag === 19)
            Eo(t, a, e);
          else if (t.child !== null) {
            t.child.return = t, t = t.child;
            continue;
          }
          if (t === e) break t;
          for (; t.sibling === null; ) {
            if (t.return === null || t.return === e)
              break t;
            t = t.return;
          }
          t.sibling.return = t.return, t = t.sibling;
        }
      l &= 1;
    }
    switch (k(Lt, l), n) {
      case "forwards":
        for (a = e.child, n = null; a !== null; )
          t = a.alternate, t !== null && Lu(t) === null && (n = a), a = a.sibling;
        a = n, a === null ? (n = e.child, e.child = null) : (n = a.sibling, a.sibling = null), Zc(
          e,
          !1,
          n,
          a,
          u
        );
        break;
      case "backwards":
        for (a = null, n = e.child, e.child = null; n !== null; ) {
          if (t = n.alternate, t !== null && Lu(t) === null) {
            e.child = n;
            break;
          }
          t = n.sibling, n.sibling = a, a = n, n = t;
        }
        Zc(
          e,
          !0,
          a,
          null,
          u
        );
        break;
      case "together":
        Zc(e, !1, null, null, void 0);
        break;
      default:
        e.memoizedState = null;
    }
    return e.child;
  }
  function na(t, e, a) {
    if (t !== null && (e.dependencies = t.dependencies), _a |= e.lanes, (a & e.childLanes) === 0)
      if (t !== null) {
        if (mn(
          t,
          e,
          a,
          !1
        ), (a & e.childLanes) === 0)
          return null;
      } else return null;
    if (t !== null && e.child !== t.child)
      throw Error(f(153));
    if (e.child !== null) {
      for (t = e.child, a = Fe(t, t.pendingProps), e.child = a, a.return = e; t.sibling !== null; )
        t = t.sibling, a = a.sibling = Fe(t, t.pendingProps), a.return = e;
      a.sibling = null;
    }
    return e.child;
  }
  function Vc(t, e) {
    return (t.lanes & e) !== 0 ? !0 : (t = t.dependencies, !!(t !== null && _u(t)));
  }
  function Hv(t, e, a) {
    switch (e.tag) {
      case 3:
        yt(e, e.stateNode.containerInfo), ma(e, kt, t.memoizedState.cache), hn();
        break;
      case 27:
      case 5:
        tl(e);
        break;
      case 4:
        yt(e, e.stateNode.containerInfo);
        break;
      case 10:
        ma(
          e,
          e.type,
          e.memoizedProps.value
        );
        break;
      case 13:
        var l = e.memoizedState;
        if (l !== null)
          return l.dehydrated !== null ? (xa(e), e.flags |= 128, null) : (a & e.child.childLanes) !== 0 ? To(t, e, a) : (xa(e), t = na(
            t,
            e,
            a
          ), t !== null ? t.sibling : null);
        xa(e);
        break;
      case 19:
        var n = (t.flags & 128) !== 0;
        if (l = (a & e.childLanes) !== 0, l || (mn(
          t,
          e,
          a,
          !1
        ), l = (a & e.childLanes) !== 0), n) {
          if (l)
            return No(
              t,
              e,
              a
            );
          e.flags |= 128;
        }
        if (n = e.memoizedState, n !== null && (n.rendering = null, n.tail = null, n.lastEffect = null), k(Lt, Lt.current), l) break;
        return null;
      case 22:
      case 23:
        return e.lanes = 0, yo(t, e, a);
      case 24:
        ma(e, kt, t.memoizedState.cache);
    }
    return na(t, e, a);
  }
  function _o(t, e, a) {
    if (t !== null)
      if (t.memoizedProps !== e.pendingProps)
        Zt = !0;
      else {
        if (!Vc(t, a) && (e.flags & 128) === 0)
          return Zt = !1, Hv(
            t,
            e,
            a
          );
        Zt = (t.flags & 131072) !== 0;
      }
    else
      Zt = !1, pt && (e.flags & 1048576) !== 0 && tf(e, Nu, e.index);
    switch (e.lanes = 0, e.tag) {
      case 16:
        t: {
          t = e.pendingProps;
          var l = e.elementType, n = l._init;
          if (l = n(l._payload), e.type = l, typeof l == "function")
            ec(l) ? (t = Wa(l, t), e.tag = 1, e = So(
              null,
              e,
              l,
              t,
              a
            )) : (e.tag = 0, e = Yc(
              null,
              e,
              l,
              t,
              a
            ));
          else {
            if (l != null) {
              if (n = l.$$typeof, n === F) {
                e.tag = 11, e = mo(
                  null,
                  e,
                  l,
                  t,
                  a
                );
                break t;
              } else if (n === C) {
                e.tag = 14, e = po(
                  null,
                  e,
                  l,
                  t,
                  a
                );
                break t;
              }
            }
            throw e = De(l) || l, Error(f(306, e, ""));
          }
        }
        return e;
      case 0:
        return Yc(
          t,
          e,
          e.type,
          e.pendingProps,
          a
        );
      case 1:
        return l = e.type, n = Wa(
          l,
          e.pendingProps
        ), So(
          t,
          e,
          l,
          n,
          a
        );
      case 3:
        t: {
          if (yt(
            e,
            e.stateNode.containerInfo
          ), t === null) throw Error(f(387));
          l = e.pendingProps;
          var u = e.memoizedState;
          n = u.element, mc(t, e), jn(e, l, null, a);
          var i = e.memoizedState;
          if (l = i.cache, ma(e, kt, l), l !== u.cache && rc(
            e,
            [kt],
            a,
            !0
          ), Sn(), l = i.element, u.isDehydrated)
            if (u = {
              element: l,
              isDehydrated: !1,
              cache: i.cache
            }, e.updateQueue.baseState = u, e.memoizedState = u, e.flags & 256) {
              e = jo(
                t,
                e,
                l,
                a
              );
              break t;
            } else if (l !== n) {
              n = Te(
                Error(f(424)),
                e
              ), vn(n), e = jo(
                t,
                e,
                l,
                a
              );
              break t;
            } else {
              switch (t = e.stateNode.containerInfo, t.nodeType) {
                case 9:
                  t = t.body;
                  break;
                default:
                  t = t.nodeName === "HTML" ? t.ownerDocument.body : t;
              }
              for (qt = we(t.firstChild), le = e, pt = !0, Qa = null, Le = !0, a = lo(
                e,
                null,
                l,
                a
              ), e.child = a; a; )
                a.flags = a.flags & -3 | 4096, a = a.sibling;
            }
          else {
            if (hn(), l === n) {
              e = na(
                t,
                e,
                a
              );
              break t;
            }
            Wt(
              t,
              e,
              l,
              a
            );
          }
          e = e.child;
        }
        return e;
      case 26:
        return Zu(t, e), t === null ? (a = Md(
          e.type,
          null,
          e.pendingProps,
          null
        )) ? e.memoizedState = a : pt || (a = e.type, t = e.pendingProps, l = ii(
          V.current
        ).createElement(a), l[Ot] = e, l[Xt] = t, Pt(l, a, t), Qt(l), e.stateNode = l) : e.memoizedState = Md(
          e.type,
          t.memoizedProps,
          e.pendingProps,
          t.memoizedState
        ), null;
      case 27:
        return tl(e), t === null && pt && (l = e.stateNode = Ad(
          e.type,
          e.pendingProps,
          V.current
        ), le = e, Le = !0, n = qt, Ma(e.type) ? (_s = n, qt = we(
          l.firstChild
        )) : qt = n), Wt(
          t,
          e,
          e.pendingProps.children,
          a
        ), Zu(t, e), t === null && (e.flags |= 4194304), e.child;
      case 5:
        return t === null && pt && ((n = l = qt) && (l = om(
          l,
          e.type,
          e.pendingProps,
          Le
        ), l !== null ? (e.stateNode = l, le = e, qt = we(
          l.firstChild
        ), Le = !1, n = !0) : n = !1), n || Za(e)), tl(e), n = e.type, u = e.pendingProps, i = t !== null ? t.memoizedProps : null, l = u.children, js(n, u) ? l = null : i !== null && js(n, i) && (e.flags |= 32), e.memoizedState !== null && (n = Sc(
          t,
          e,
          Ov,
          null,
          null,
          a
        ), Qn._currentValue = n), Zu(t, e), Wt(t, e, l, a), e.child;
      case 6:
        return t === null && pt && ((t = a = qt) && (a = dm(
          a,
          e.pendingProps,
          Le
        ), a !== null ? (e.stateNode = a, le = e, qt = null, t = !0) : t = !1), t || Za(e)), null;
      case 13:
        return To(t, e, a);
      case 4:
        return yt(
          e,
          e.stateNode.containerInfo
        ), l = e.pendingProps, t === null ? e.child = Dl(
          e,
          null,
          l,
          a
        ) : Wt(
          t,
          e,
          l,
          a
        ), e.child;
      case 11:
        return mo(
          t,
          e,
          e.type,
          e.pendingProps,
          a
        );
      case 7:
        return Wt(
          t,
          e,
          e.pendingProps,
          a
        ), e.child;
      case 8:
        return Wt(
          t,
          e,
          e.pendingProps.children,
          a
        ), e.child;
      case 12:
        return Wt(
          t,
          e,
          e.pendingProps.children,
          a
        ), e.child;
      case 10:
        return l = e.pendingProps, ma(e, e.type, l.value), Wt(
          t,
          e,
          l.children,
          a
        ), e.child;
      case 9:
        return n = e.type._context, l = e.pendingProps.children, Ka(e), n = te(n), l = l(n), e.flags |= 1, Wt(t, e, l, a), e.child;
      case 14:
        return po(
          t,
          e,
          e.type,
          e.pendingProps,
          a
        );
      case 15:
        return go(
          t,
          e,
          e.type,
          e.pendingProps,
          a
        );
      case 19:
        return No(t, e, a);
      case 31:
        return l = e.pendingProps, a = e.mode, l = {
          mode: l.mode,
          children: l.children
        }, t === null ? (a = Vu(
          l,
          a
        ), a.ref = e.ref, e.child = a, a.return = e, e = a) : (a = Fe(t.child, l), a.ref = e.ref, e.child = a, a.return = e, e = a), e;
      case 22:
        return yo(t, e, a);
      case 24:
        return Ka(e), l = te(kt), t === null ? (n = dc(), n === null && (n = zt, u = fc(), n.pooledCache = u, u.refCount++, u !== null && (n.pooledCacheLanes |= a), n = u), e.memoizedState = {
          parent: l,
          cache: n
        }, vc(e), ma(e, kt, n)) : ((t.lanes & a) !== 0 && (mc(t, e), jn(e, null, null, a), Sn()), n = t.memoizedState, u = e.memoizedState, n.parent !== l ? (n = { parent: l, cache: l }, e.memoizedState = n, e.lanes === 0 && (e.memoizedState = e.updateQueue.baseState = n), ma(e, kt, l)) : (l = u.cache, ma(e, kt, l), l !== n.cache && rc(
          e,
          [kt],
          a,
          !0
        ))), Wt(
          t,
          e,
          e.pendingProps.children,
          a
        ), e.child;
      case 29:
        throw e.pendingProps;
    }
    throw Error(f(156, e.tag));
  }
  function ua(t) {
    t.flags |= 4;
  }
  function Ao(t, e) {
    if (e.type !== "stylesheet" || (e.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (t.flags |= 16777216, !Cd(e)) {
      if (e = Ae.current, e !== null && ((vt & 4194048) === vt ? Xe !== null : (vt & 62914560) !== vt && (vt & 536870912) === 0 || e !== Xe))
        throw bn = hc, rf;
      t.flags |= 8192;
    }
  }
  function Ku(t, e) {
    e !== null && (t.flags |= 4), t.flags & 16384 && (e = t.tag !== 22 ? Fl() : 536870912, t.lanes |= e, Cl |= e);
  }
  function On(t, e) {
    if (!pt)
      switch (t.tailMode) {
        case "hidden":
          e = t.tail;
          for (var a = null; e !== null; )
            e.alternate !== null && (a = e), e = e.sibling;
          a === null ? t.tail = null : a.sibling = null;
          break;
        case "collapsed":
          a = t.tail;
          for (var l = null; a !== null; )
            a.alternate !== null && (l = a), a = a.sibling;
          l === null ? e || t.tail === null ? t.tail = null : t.tail.sibling = null : l.sibling = null;
      }
  }
  function Ut(t) {
    var e = t.alternate !== null && t.alternate.child === t.child, a = 0, l = 0;
    if (e)
      for (var n = t.child; n !== null; )
        a |= n.lanes | n.childLanes, l |= n.subtreeFlags & 65011712, l |= n.flags & 65011712, n.return = t, n = n.sibling;
    else
      for (n = t.child; n !== null; )
        a |= n.lanes | n.childLanes, l |= n.subtreeFlags, l |= n.flags, n.return = t, n = n.sibling;
    return t.subtreeFlags |= l, t.childLanes = a, e;
  }
  function Bv(t, e, a) {
    var l = e.pendingProps;
    switch (uc(e), e.tag) {
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
        return Ut(e), null;
      case 1:
        return Ut(e), null;
      case 3:
        return a = e.stateNode, l = null, t !== null && (l = t.memoizedState.cache), e.memoizedState.cache !== l && (e.flags |= 2048), ea(kt), ne(), a.pendingContext && (a.context = a.pendingContext, a.pendingContext = null), (t === null || t.child === null) && (dn(e) ? ua(e) : t === null || t.memoizedState.isDehydrated && (e.flags & 256) === 0 || (e.flags |= 1024, lf())), Ut(e), null;
      case 26:
        return a = e.memoizedState, t === null ? (ua(e), a !== null ? (Ut(e), Ao(e, a)) : (Ut(e), e.flags &= -16777217)) : a ? a !== t.memoizedState ? (ua(e), Ut(e), Ao(e, a)) : (Ut(e), e.flags &= -16777217) : (t.memoizedProps !== l && ua(e), Ut(e), e.flags &= -16777217), null;
      case 27:
        Ye(e), a = V.current;
        var n = e.type;
        if (t !== null && e.stateNode != null)
          t.memoizedProps !== l && ua(e);
        else {
          if (!l) {
            if (e.stateNode === null)
              throw Error(f(166));
            return Ut(e), null;
          }
          t = J.current, dn(e) ? ef(e) : (t = Ad(n, l, a), e.stateNode = t, ua(e));
        }
        return Ut(e), null;
      case 5:
        if (Ye(e), a = e.type, t !== null && e.stateNode != null)
          t.memoizedProps !== l && ua(e);
        else {
          if (!l) {
            if (e.stateNode === null)
              throw Error(f(166));
            return Ut(e), null;
          }
          if (t = J.current, dn(e))
            ef(e);
          else {
            switch (n = ii(
              V.current
            ), t) {
              case 1:
                t = n.createElementNS(
                  "http://www.w3.org/2000/svg",
                  a
                );
                break;
              case 2:
                t = n.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  a
                );
                break;
              default:
                switch (a) {
                  case "svg":
                    t = n.createElementNS(
                      "http://www.w3.org/2000/svg",
                      a
                    );
                    break;
                  case "math":
                    t = n.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      a
                    );
                    break;
                  case "script":
                    t = n.createElement("div"), t.innerHTML = "<script><\/script>", t = t.removeChild(t.firstChild);
                    break;
                  case "select":
                    t = typeof l.is == "string" ? n.createElement("select", { is: l.is }) : n.createElement("select"), l.multiple ? t.multiple = !0 : l.size && (t.size = l.size);
                    break;
                  default:
                    t = typeof l.is == "string" ? n.createElement(a, { is: l.is }) : n.createElement(a);
                }
            }
            t[Ot] = e, t[Xt] = l;
            t: for (n = e.child; n !== null; ) {
              if (n.tag === 5 || n.tag === 6)
                t.appendChild(n.stateNode);
              else if (n.tag !== 4 && n.tag !== 27 && n.child !== null) {
                n.child.return = n, n = n.child;
                continue;
              }
              if (n === e) break t;
              for (; n.sibling === null; ) {
                if (n.return === null || n.return === e)
                  break t;
                n = n.return;
              }
              n.sibling.return = n.return, n = n.sibling;
            }
            e.stateNode = t;
            t: switch (Pt(t, a, l), a) {
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
            t && ua(e);
          }
        }
        return Ut(e), e.flags &= -16777217, null;
      case 6:
        if (t && e.stateNode != null)
          t.memoizedProps !== l && ua(e);
        else {
          if (typeof l != "string" && e.stateNode === null)
            throw Error(f(166));
          if (t = V.current, dn(e)) {
            if (t = e.stateNode, a = e.memoizedProps, l = null, n = le, n !== null)
              switch (n.tag) {
                case 27:
                case 5:
                  l = n.memoizedProps;
              }
            t[Ot] = e, t = !!(t.nodeValue === a || l !== null && l.suppressHydrationWarning === !0 || xd(t.nodeValue, a)), t || Za(e);
          } else
            t = ii(t).createTextNode(
              l
            ), t[Ot] = e, e.stateNode = t;
        }
        return Ut(e), null;
      case 13:
        if (l = e.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
          if (n = dn(e), l !== null && l.dehydrated !== null) {
            if (t === null) {
              if (!n) throw Error(f(318));
              if (n = e.memoizedState, n = n !== null ? n.dehydrated : null, !n) throw Error(f(317));
              n[Ot] = e;
            } else
              hn(), (e.flags & 128) === 0 && (e.memoizedState = null), e.flags |= 4;
            Ut(e), n = !1;
          } else
            n = lf(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = n), n = !0;
          if (!n)
            return e.flags & 256 ? (la(e), e) : (la(e), null);
        }
        if (la(e), (e.flags & 128) !== 0)
          return e.lanes = a, e;
        if (a = l !== null, t = t !== null && t.memoizedState !== null, a) {
          l = e.child, n = null, l.alternate !== null && l.alternate.memoizedState !== null && l.alternate.memoizedState.cachePool !== null && (n = l.alternate.memoizedState.cachePool.pool);
          var u = null;
          l.memoizedState !== null && l.memoizedState.cachePool !== null && (u = l.memoizedState.cachePool.pool), u !== n && (l.flags |= 2048);
        }
        return a !== t && a && (e.child.flags |= 8192), Ku(e, e.updateQueue), Ut(e), null;
      case 4:
        return ne(), t === null && gs(e.stateNode.containerInfo), Ut(e), null;
      case 10:
        return ea(e.type), Ut(e), null;
      case 19:
        if (Q(Lt), n = e.memoizedState, n === null) return Ut(e), null;
        if (l = (e.flags & 128) !== 0, u = n.rendering, u === null)
          if (l) On(n, !1);
          else {
            if (Ct !== 0 || t !== null && (t.flags & 128) !== 0)
              for (t = e.child; t !== null; ) {
                if (u = Lu(t), u !== null) {
                  for (e.flags |= 128, On(n, !1), t = u.updateQueue, e.updateQueue = t, Ku(e, t), e.subtreeFlags = 0, t = a, a = e.child; a !== null; )
                    Ir(a, t), a = a.sibling;
                  return k(
                    Lt,
                    Lt.current & 1 | 2
                  ), e.child;
                }
                t = t.sibling;
              }
            n.tail !== null && xe() > Wu && (e.flags |= 128, l = !0, On(n, !1), e.lanes = 4194304);
          }
        else {
          if (!l)
            if (t = Lu(u), t !== null) {
              if (e.flags |= 128, l = !0, t = t.updateQueue, e.updateQueue = t, Ku(e, t), On(n, !0), n.tail === null && n.tailMode === "hidden" && !u.alternate && !pt)
                return Ut(e), null;
            } else
              2 * xe() - n.renderingStartTime > Wu && a !== 536870912 && (e.flags |= 128, l = !0, On(n, !1), e.lanes = 4194304);
          n.isBackwards ? (u.sibling = e.child, e.child = u) : (t = n.last, t !== null ? t.sibling = u : e.child = u, n.last = u);
        }
        return n.tail !== null ? (e = n.tail, n.rendering = e, n.tail = e.sibling, n.renderingStartTime = xe(), e.sibling = null, t = Lt.current, k(Lt, l ? t & 1 | 2 : t & 1), e) : (Ut(e), null);
      case 22:
      case 23:
        return la(e), bc(), l = e.memoizedState !== null, t !== null ? t.memoizedState !== null !== l && (e.flags |= 8192) : l && (e.flags |= 8192), l ? (a & 536870912) !== 0 && (e.flags & 128) === 0 && (Ut(e), e.subtreeFlags & 6 && (e.flags |= 8192)) : Ut(e), a = e.updateQueue, a !== null && Ku(e, a.retryQueue), a = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (a = t.memoizedState.cachePool.pool), l = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (l = e.memoizedState.cachePool.pool), l !== a && (e.flags |= 2048), t !== null && Q(Ja), null;
      case 24:
        return a = null, t !== null && (a = t.memoizedState.cache), e.memoizedState.cache !== a && (e.flags |= 2048), ea(kt), Ut(e), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(f(156, e.tag));
  }
  function Yv(t, e) {
    switch (uc(e), e.tag) {
      case 1:
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 3:
        return ea(kt), ne(), t = e.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (e.flags = t & -65537 | 128, e) : null;
      case 26:
      case 27:
      case 5:
        return Ye(e), null;
      case 13:
        if (la(e), t = e.memoizedState, t !== null && t.dehydrated !== null) {
          if (e.alternate === null)
            throw Error(f(340));
          hn();
        }
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 19:
        return Q(Lt), null;
      case 4:
        return ne(), null;
      case 10:
        return ea(e.type), null;
      case 22:
      case 23:
        return la(e), bc(), t !== null && Q(Ja), t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 24:
        return ea(kt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function zo(t, e) {
    switch (uc(e), e.tag) {
      case 3:
        ea(kt), ne();
        break;
      case 26:
      case 27:
      case 5:
        Ye(e);
        break;
      case 4:
        ne();
        break;
      case 13:
        la(e);
        break;
      case 19:
        Q(Lt);
        break;
      case 10:
        ea(e.type);
        break;
      case 22:
      case 23:
        la(e), bc(), t !== null && Q(Ja);
        break;
      case 24:
        ea(kt);
    }
  }
  function Mn(t, e) {
    try {
      var a = e.updateQueue, l = a !== null ? a.lastEffect : null;
      if (l !== null) {
        var n = l.next;
        a = n;
        do {
          if ((a.tag & t) === t) {
            l = void 0;
            var u = a.create, i = a.inst;
            l = u(), i.destroy = l;
          }
          a = a.next;
        } while (a !== n);
      }
    } catch (r) {
      _t(e, e.return, r);
    }
  }
  function ja(t, e, a) {
    try {
      var l = e.updateQueue, n = l !== null ? l.lastEffect : null;
      if (n !== null) {
        var u = n.next;
        l = u;
        do {
          if ((l.tag & t) === t) {
            var i = l.inst, r = i.destroy;
            if (r !== void 0) {
              i.destroy = void 0, n = e;
              var d = a, b = r;
              try {
                b();
              } catch (z) {
                _t(
                  n,
                  d,
                  z
                );
              }
            }
          }
          l = l.next;
        } while (l !== u);
      }
    } catch (z) {
      _t(e, e.return, z);
    }
  }
  function Oo(t) {
    var e = t.updateQueue;
    if (e !== null) {
      var a = t.stateNode;
      try {
        mf(e, a);
      } catch (l) {
        _t(t, t.return, l);
      }
    }
  }
  function Mo(t, e, a) {
    a.props = Wa(
      t.type,
      t.memoizedProps
    ), a.state = t.memoizedState;
    try {
      a.componentWillUnmount();
    } catch (l) {
      _t(t, e, l);
    }
  }
  function Dn(t, e) {
    try {
      var a = t.ref;
      if (a !== null) {
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
        typeof a == "function" ? t.refCleanup = a(l) : a.current = l;
      }
    } catch (n) {
      _t(t, e, n);
    }
  }
  function Qe(t, e) {
    var a = t.ref, l = t.refCleanup;
    if (a !== null)
      if (typeof l == "function")
        try {
          l();
        } catch (n) {
          _t(t, e, n);
        } finally {
          t.refCleanup = null, t = t.alternate, t != null && (t.refCleanup = null);
        }
      else if (typeof a == "function")
        try {
          a(null);
        } catch (n) {
          _t(t, e, n);
        }
      else a.current = null;
  }
  function Do(t) {
    var e = t.type, a = t.memoizedProps, l = t.stateNode;
    try {
      t: switch (e) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          a.autoFocus && l.focus();
          break t;
        case "img":
          a.src ? l.src = a.src : a.srcSet && (l.srcset = a.srcSet);
      }
    } catch (n) {
      _t(t, t.return, n);
    }
  }
  function Kc(t, e, a) {
    try {
      var l = t.stateNode;
      im(l, t.type, a, e), l[Xt] = e;
    } catch (n) {
      _t(t, t.return, n);
    }
  }
  function Ro(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && Ma(t.type) || t.tag === 4;
  }
  function Jc(t) {
    t: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || Ro(t.return)) return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
        if (t.tag === 27 && Ma(t.type) || t.flags & 2 || t.child === null || t.tag === 4) continue t;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function $c(t, e, a) {
    var l = t.tag;
    if (l === 5 || l === 6)
      t = t.stateNode, e ? (a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a).insertBefore(t, e) : (e = a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a, e.appendChild(t), a = a._reactRootContainer, a != null || e.onclick !== null || (e.onclick = ui));
    else if (l !== 4 && (l === 27 && Ma(t.type) && (a = t.stateNode, e = null), t = t.child, t !== null))
      for ($c(t, e, a), t = t.sibling; t !== null; )
        $c(t, e, a), t = t.sibling;
  }
  function Ju(t, e, a) {
    var l = t.tag;
    if (l === 5 || l === 6)
      t = t.stateNode, e ? a.insertBefore(t, e) : a.appendChild(t);
    else if (l !== 4 && (l === 27 && Ma(t.type) && (a = t.stateNode), t = t.child, t !== null))
      for (Ju(t, e, a), t = t.sibling; t !== null; )
        Ju(t, e, a), t = t.sibling;
  }
  function Uo(t) {
    var e = t.stateNode, a = t.memoizedProps;
    try {
      for (var l = t.type, n = e.attributes; n.length; )
        e.removeAttributeNode(n[0]);
      Pt(e, l, a), e[Ot] = t, e[Xt] = a;
    } catch (u) {
      _t(t, t.return, u);
    }
  }
  var ia = !1, Bt = !1, Wc = !1, qo = typeof WeakSet == "function" ? WeakSet : Set, Vt = null;
  function Gv(t, e) {
    if (t = t.containerInfo, xs = di, t = Xr(t), Ji(t)) {
      if ("selectionStart" in t)
        var a = {
          start: t.selectionStart,
          end: t.selectionEnd
        };
      else
        t: {
          a = (a = t.ownerDocument) && a.defaultView || window;
          var l = a.getSelection && a.getSelection();
          if (l && l.rangeCount !== 0) {
            a = l.anchorNode;
            var n = l.anchorOffset, u = l.focusNode;
            l = l.focusOffset;
            try {
              a.nodeType, u.nodeType;
            } catch {
              a = null;
              break t;
            }
            var i = 0, r = -1, d = -1, b = 0, z = 0, M = t, S = null;
            e: for (; ; ) {
              for (var T; M !== a || n !== 0 && M.nodeType !== 3 || (r = i + n), M !== u || l !== 0 && M.nodeType !== 3 || (d = i + l), M.nodeType === 3 && (i += M.nodeValue.length), (T = M.firstChild) !== null; )
                S = M, M = T;
              for (; ; ) {
                if (M === t) break e;
                if (S === a && ++b === n && (r = i), S === u && ++z === l && (d = i), (T = M.nextSibling) !== null) break;
                M = S, S = M.parentNode;
              }
              M = T;
            }
            a = r === -1 || d === -1 ? null : { start: r, end: d };
          } else a = null;
        }
      a = a || { start: 0, end: 0 };
    } else a = null;
    for (Ss = { focusedElem: t, selectionRange: a }, di = !1, Vt = e; Vt !== null; )
      if (e = Vt, t = e.child, (e.subtreeFlags & 1024) !== 0 && t !== null)
        t.return = e, Vt = t;
      else
        for (; Vt !== null; ) {
          switch (e = Vt, u = e.alternate, t = e.flags, e.tag) {
            case 0:
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((t & 1024) !== 0 && u !== null) {
                t = void 0, a = e, n = u.memoizedProps, u = u.memoizedState, l = a.stateNode;
                try {
                  var ut = Wa(
                    a.type,
                    n,
                    a.elementType === a.type
                  );
                  t = l.getSnapshotBeforeUpdate(
                    ut,
                    u
                  ), l.__reactInternalSnapshotBeforeUpdate = t;
                } catch (at) {
                  _t(
                    a,
                    a.return,
                    at
                  );
                }
              }
              break;
            case 3:
              if ((t & 1024) !== 0) {
                if (t = e.stateNode.containerInfo, a = t.nodeType, a === 9)
                  Es(t);
                else if (a === 1)
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
              if ((t & 1024) !== 0) throw Error(f(163));
          }
          if (t = e.sibling, t !== null) {
            t.return = e.return, Vt = t;
            break;
          }
          Vt = e.return;
        }
  }
  function Co(t, e, a) {
    var l = a.flags;
    switch (a.tag) {
      case 0:
      case 11:
      case 15:
        Ta(t, a), l & 4 && Mn(5, a);
        break;
      case 1:
        if (Ta(t, a), l & 4)
          if (t = a.stateNode, e === null)
            try {
              t.componentDidMount();
            } catch (i) {
              _t(a, a.return, i);
            }
          else {
            var n = Wa(
              a.type,
              e.memoizedProps
            );
            e = e.memoizedState;
            try {
              t.componentDidUpdate(
                n,
                e,
                t.__reactInternalSnapshotBeforeUpdate
              );
            } catch (i) {
              _t(
                a,
                a.return,
                i
              );
            }
          }
        l & 64 && Oo(a), l & 512 && Dn(a, a.return);
        break;
      case 3:
        if (Ta(t, a), l & 64 && (t = a.updateQueue, t !== null)) {
          if (e = null, a.child !== null)
            switch (a.child.tag) {
              case 27:
              case 5:
                e = a.child.stateNode;
                break;
              case 1:
                e = a.child.stateNode;
            }
          try {
            mf(t, e);
          } catch (i) {
            _t(a, a.return, i);
          }
        }
        break;
      case 27:
        e === null && l & 4 && Uo(a);
      case 26:
      case 5:
        Ta(t, a), e === null && l & 4 && Do(a), l & 512 && Dn(a, a.return);
        break;
      case 12:
        Ta(t, a);
        break;
      case 13:
        Ta(t, a), l & 4 && Bo(t, a), l & 64 && (t = a.memoizedState, t !== null && (t = t.dehydrated, t !== null && (a = $v.bind(
          null,
          a
        ), hm(t, a))));
        break;
      case 22:
        if (l = a.memoizedState !== null || ia, !l) {
          e = e !== null && e.memoizedState !== null || Bt, n = ia;
          var u = Bt;
          ia = l, (Bt = e) && !u ? Ea(
            t,
            a,
            (a.subtreeFlags & 8772) !== 0
          ) : Ta(t, a), ia = n, Bt = u;
        }
        break;
      case 30:
        break;
      default:
        Ta(t, a);
    }
  }
  function wo(t) {
    var e = t.alternate;
    e !== null && (t.alternate = null, wo(e)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (e = t.stateNode, e !== null && Oi(e)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
  }
  var Mt = null, re = !1;
  function ca(t, e, a) {
    for (a = a.child; a !== null; )
      Ho(t, e, a), a = a.sibling;
  }
  function Ho(t, e, a) {
    if (It && typeof It.onCommitFiberUnmount == "function")
      try {
        It.onCommitFiberUnmount(Je, a);
      } catch {
      }
    switch (a.tag) {
      case 26:
        Bt || Qe(a, e), ca(
          t,
          e,
          a
        ), a.memoizedState ? a.memoizedState.count-- : a.stateNode && (a = a.stateNode, a.parentNode.removeChild(a));
        break;
      case 27:
        Bt || Qe(a, e);
        var l = Mt, n = re;
        Ma(a.type) && (Mt = a.stateNode, re = !1), ca(
          t,
          e,
          a
        ), Gn(a.stateNode), Mt = l, re = n;
        break;
      case 5:
        Bt || Qe(a, e);
      case 6:
        if (l = Mt, n = re, Mt = null, ca(
          t,
          e,
          a
        ), Mt = l, re = n, Mt !== null)
          if (re)
            try {
              (Mt.nodeType === 9 ? Mt.body : Mt.nodeName === "HTML" ? Mt.ownerDocument.body : Mt).removeChild(a.stateNode);
            } catch (u) {
              _t(
                a,
                e,
                u
              );
            }
          else
            try {
              Mt.removeChild(a.stateNode);
            } catch (u) {
              _t(
                a,
                e,
                u
              );
            }
        break;
      case 18:
        Mt !== null && (re ? (t = Mt, Nd(
          t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t,
          a.stateNode
        ), Jn(t)) : Nd(Mt, a.stateNode));
        break;
      case 4:
        l = Mt, n = re, Mt = a.stateNode.containerInfo, re = !0, ca(
          t,
          e,
          a
        ), Mt = l, re = n;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Bt || ja(2, a, e), Bt || ja(4, a, e), ca(
          t,
          e,
          a
        );
        break;
      case 1:
        Bt || (Qe(a, e), l = a.stateNode, typeof l.componentWillUnmount == "function" && Mo(
          a,
          e,
          l
        )), ca(
          t,
          e,
          a
        );
        break;
      case 21:
        ca(
          t,
          e,
          a
        );
        break;
      case 22:
        Bt = (l = Bt) || a.memoizedState !== null, ca(
          t,
          e,
          a
        ), Bt = l;
        break;
      default:
        ca(
          t,
          e,
          a
        );
    }
  }
  function Bo(t, e) {
    if (e.memoizedState === null && (t = e.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null))))
      try {
        Jn(t);
      } catch (a) {
        _t(e, e.return, a);
      }
  }
  function kv(t) {
    switch (t.tag) {
      case 13:
      case 19:
        var e = t.stateNode;
        return e === null && (e = t.stateNode = new qo()), e;
      case 22:
        return t = t.stateNode, e = t._retryCache, e === null && (e = t._retryCache = new qo()), e;
      default:
        throw Error(f(435, t.tag));
    }
  }
  function Fc(t, e) {
    var a = kv(t);
    e.forEach(function(l) {
      var n = Wv.bind(null, t, l);
      a.has(l) || (a.add(l), l.then(n, n));
    });
  }
  function ve(t, e) {
    var a = e.deletions;
    if (a !== null)
      for (var l = 0; l < a.length; l++) {
        var n = a[l], u = t, i = e, r = i;
        t: for (; r !== null; ) {
          switch (r.tag) {
            case 27:
              if (Ma(r.type)) {
                Mt = r.stateNode, re = !1;
                break t;
              }
              break;
            case 5:
              Mt = r.stateNode, re = !1;
              break t;
            case 3:
            case 4:
              Mt = r.stateNode.containerInfo, re = !0;
              break t;
          }
          r = r.return;
        }
        if (Mt === null) throw Error(f(160));
        Ho(u, i, n), Mt = null, re = !1, u = n.alternate, u !== null && (u.return = null), n.return = null;
      }
    if (e.subtreeFlags & 13878)
      for (e = e.child; e !== null; )
        Yo(e, t), e = e.sibling;
  }
  var Ce = null;
  function Yo(t, e) {
    var a = t.alternate, l = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        ve(e, t), me(t), l & 4 && (ja(3, t, t.return), Mn(3, t), ja(5, t, t.return));
        break;
      case 1:
        ve(e, t), me(t), l & 512 && (Bt || a === null || Qe(a, a.return)), l & 64 && ia && (t = t.updateQueue, t !== null && (l = t.callbacks, l !== null && (a = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = a === null ? l : a.concat(l))));
        break;
      case 26:
        var n = Ce;
        if (ve(e, t), me(t), l & 512 && (Bt || a === null || Qe(a, a.return)), l & 4) {
          var u = a !== null ? a.memoizedState : null;
          if (l = t.memoizedState, a === null)
            if (l === null)
              if (t.stateNode === null) {
                t: {
                  l = t.type, a = t.memoizedProps, n = n.ownerDocument || n;
                  e: switch (l) {
                    case "title":
                      u = n.getElementsByTagName("title")[0], (!u || u[tn] || u[Ot] || u.namespaceURI === "http://www.w3.org/2000/svg" || u.hasAttribute("itemprop")) && (u = n.createElement(l), n.head.insertBefore(
                        u,
                        n.querySelector("head > title")
                      )), Pt(u, l, a), u[Ot] = t, Qt(u), l = u;
                      break t;
                    case "link":
                      var i = Ud(
                        "link",
                        "href",
                        n
                      ).get(l + (a.href || ""));
                      if (i) {
                        for (var r = 0; r < i.length; r++)
                          if (u = i[r], u.getAttribute("href") === (a.href == null || a.href === "" ? null : a.href) && u.getAttribute("rel") === (a.rel == null ? null : a.rel) && u.getAttribute("title") === (a.title == null ? null : a.title) && u.getAttribute("crossorigin") === (a.crossOrigin == null ? null : a.crossOrigin)) {
                            i.splice(r, 1);
                            break e;
                          }
                      }
                      u = n.createElement(l), Pt(u, l, a), n.head.appendChild(u);
                      break;
                    case "meta":
                      if (i = Ud(
                        "meta",
                        "content",
                        n
                      ).get(l + (a.content || ""))) {
                        for (r = 0; r < i.length; r++)
                          if (u = i[r], u.getAttribute("content") === (a.content == null ? null : "" + a.content) && u.getAttribute("name") === (a.name == null ? null : a.name) && u.getAttribute("property") === (a.property == null ? null : a.property) && u.getAttribute("http-equiv") === (a.httpEquiv == null ? null : a.httpEquiv) && u.getAttribute("charset") === (a.charSet == null ? null : a.charSet)) {
                            i.splice(r, 1);
                            break e;
                          }
                      }
                      u = n.createElement(l), Pt(u, l, a), n.head.appendChild(u);
                      break;
                    default:
                      throw Error(f(468, l));
                  }
                  u[Ot] = t, Qt(u), l = u;
                }
                t.stateNode = l;
              } else
                qd(
                  n,
                  t.type,
                  t.stateNode
                );
            else
              t.stateNode = Rd(
                n,
                l,
                t.memoizedProps
              );
          else
            u !== l ? (u === null ? a.stateNode !== null && (a = a.stateNode, a.parentNode.removeChild(a)) : u.count--, l === null ? qd(
              n,
              t.type,
              t.stateNode
            ) : Rd(
              n,
              l,
              t.memoizedProps
            )) : l === null && t.stateNode !== null && Kc(
              t,
              t.memoizedProps,
              a.memoizedProps
            );
        }
        break;
      case 27:
        ve(e, t), me(t), l & 512 && (Bt || a === null || Qe(a, a.return)), a !== null && l & 4 && Kc(
          t,
          t.memoizedProps,
          a.memoizedProps
        );
        break;
      case 5:
        if (ve(e, t), me(t), l & 512 && (Bt || a === null || Qe(a, a.return)), t.flags & 32) {
          n = t.stateNode;
          try {
            hl(n, "");
          } catch (T) {
            _t(t, t.return, T);
          }
        }
        l & 4 && t.stateNode != null && (n = t.memoizedProps, Kc(
          t,
          n,
          a !== null ? a.memoizedProps : n
        )), l & 1024 && (Wc = !0);
        break;
      case 6:
        if (ve(e, t), me(t), l & 4) {
          if (t.stateNode === null)
            throw Error(f(162));
          l = t.memoizedProps, a = t.stateNode;
          try {
            a.nodeValue = l;
          } catch (T) {
            _t(t, t.return, T);
          }
        }
        break;
      case 3:
        if (ri = null, n = Ce, Ce = ci(e.containerInfo), ve(e, t), Ce = n, me(t), l & 4 && a !== null && a.memoizedState.isDehydrated)
          try {
            Jn(e.containerInfo);
          } catch (T) {
            _t(t, t.return, T);
          }
        Wc && (Wc = !1, Go(t));
        break;
      case 4:
        l = Ce, Ce = ci(
          t.stateNode.containerInfo
        ), ve(e, t), me(t), Ce = l;
        break;
      case 12:
        ve(e, t), me(t);
        break;
      case 13:
        ve(e, t), me(t), t.child.flags & 8192 && t.memoizedState !== null != (a !== null && a.memoizedState !== null) && (ls = xe()), l & 4 && (l = t.updateQueue, l !== null && (t.updateQueue = null, Fc(t, l)));
        break;
      case 22:
        n = t.memoizedState !== null;
        var d = a !== null && a.memoizedState !== null, b = ia, z = Bt;
        if (ia = b || n, Bt = z || d, ve(e, t), Bt = z, ia = b, me(t), l & 8192)
          t: for (e = t.stateNode, e._visibility = n ? e._visibility & -2 : e._visibility | 1, n && (a === null || d || ia || Bt || Fa(t)), a = null, e = t; ; ) {
            if (e.tag === 5 || e.tag === 26) {
              if (a === null) {
                d = a = e;
                try {
                  if (u = d.stateNode, n)
                    i = u.style, typeof i.setProperty == "function" ? i.setProperty("display", "none", "important") : i.display = "none";
                  else {
                    r = d.stateNode;
                    var M = d.memoizedProps.style, S = M != null && M.hasOwnProperty("display") ? M.display : null;
                    r.style.display = S == null || typeof S == "boolean" ? "" : ("" + S).trim();
                  }
                } catch (T) {
                  _t(d, d.return, T);
                }
              }
            } else if (e.tag === 6) {
              if (a === null) {
                d = e;
                try {
                  d.stateNode.nodeValue = n ? "" : d.memoizedProps;
                } catch (T) {
                  _t(d, d.return, T);
                }
              }
            } else if ((e.tag !== 22 && e.tag !== 23 || e.memoizedState === null || e === t) && e.child !== null) {
              e.child.return = e, e = e.child;
              continue;
            }
            if (e === t) break t;
            for (; e.sibling === null; ) {
              if (e.return === null || e.return === t) break t;
              a === e && (a = null), e = e.return;
            }
            a === e && (a = null), e.sibling.return = e.return, e = e.sibling;
          }
        l & 4 && (l = t.updateQueue, l !== null && (a = l.retryQueue, a !== null && (l.retryQueue = null, Fc(t, a))));
        break;
      case 19:
        ve(e, t), me(t), l & 4 && (l = t.updateQueue, l !== null && (t.updateQueue = null, Fc(t, l)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        ve(e, t), me(t);
    }
  }
  function me(t) {
    var e = t.flags;
    if (e & 2) {
      try {
        for (var a, l = t.return; l !== null; ) {
          if (Ro(l)) {
            a = l;
            break;
          }
          l = l.return;
        }
        if (a == null) throw Error(f(160));
        switch (a.tag) {
          case 27:
            var n = a.stateNode, u = Jc(t);
            Ju(t, u, n);
            break;
          case 5:
            var i = a.stateNode;
            a.flags & 32 && (hl(i, ""), a.flags &= -33);
            var r = Jc(t);
            Ju(t, r, i);
            break;
          case 3:
          case 4:
            var d = a.stateNode.containerInfo, b = Jc(t);
            $c(
              t,
              b,
              d
            );
            break;
          default:
            throw Error(f(161));
        }
      } catch (z) {
        _t(t, t.return, z);
      }
      t.flags &= -3;
    }
    e & 4096 && (t.flags &= -4097);
  }
  function Go(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var e = t;
        Go(e), e.tag === 5 && e.flags & 1024 && e.stateNode.reset(), t = t.sibling;
      }
  }
  function Ta(t, e) {
    if (e.subtreeFlags & 8772)
      for (e = e.child; e !== null; )
        Co(t, e.alternate, e), e = e.sibling;
  }
  function Fa(t) {
    for (t = t.child; t !== null; ) {
      var e = t;
      switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          ja(4, e, e.return), Fa(e);
          break;
        case 1:
          Qe(e, e.return);
          var a = e.stateNode;
          typeof a.componentWillUnmount == "function" && Mo(
            e,
            e.return,
            a
          ), Fa(e);
          break;
        case 27:
          Gn(e.stateNode);
        case 26:
        case 5:
          Qe(e, e.return), Fa(e);
          break;
        case 22:
          e.memoizedState === null && Fa(e);
          break;
        case 30:
          Fa(e);
          break;
        default:
          Fa(e);
      }
      t = t.sibling;
    }
  }
  function Ea(t, e, a) {
    for (a = a && (e.subtreeFlags & 8772) !== 0, e = e.child; e !== null; ) {
      var l = e.alternate, n = t, u = e, i = u.flags;
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          Ea(
            n,
            u,
            a
          ), Mn(4, u);
          break;
        case 1:
          if (Ea(
            n,
            u,
            a
          ), l = u, n = l.stateNode, typeof n.componentDidMount == "function")
            try {
              n.componentDidMount();
            } catch (b) {
              _t(l, l.return, b);
            }
          if (l = u, n = l.updateQueue, n !== null) {
            var r = l.stateNode;
            try {
              var d = n.shared.hiddenCallbacks;
              if (d !== null)
                for (n.shared.hiddenCallbacks = null, n = 0; n < d.length; n++)
                  vf(d[n], r);
            } catch (b) {
              _t(l, l.return, b);
            }
          }
          a && i & 64 && Oo(u), Dn(u, u.return);
          break;
        case 27:
          Uo(u);
        case 26:
        case 5:
          Ea(
            n,
            u,
            a
          ), a && l === null && i & 4 && Do(u), Dn(u, u.return);
          break;
        case 12:
          Ea(
            n,
            u,
            a
          );
          break;
        case 13:
          Ea(
            n,
            u,
            a
          ), a && i & 4 && Bo(n, u);
          break;
        case 22:
          u.memoizedState === null && Ea(
            n,
            u,
            a
          ), Dn(u, u.return);
          break;
        case 30:
          break;
        default:
          Ea(
            n,
            u,
            a
          );
      }
      e = e.sibling;
    }
  }
  function Pc(t, e) {
    var a = null;
    t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (a = t.memoizedState.cachePool.pool), t = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (t = e.memoizedState.cachePool.pool), t !== a && (t != null && t.refCount++, a != null && pn(a));
  }
  function Ic(t, e) {
    t = null, e.alternate !== null && (t = e.alternate.memoizedState.cache), e = e.memoizedState.cache, e !== t && (e.refCount++, t != null && pn(t));
  }
  function Ze(t, e, a, l) {
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        ko(
          t,
          e,
          a,
          l
        ), e = e.sibling;
  }
  function ko(t, e, a, l) {
    var n = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        Ze(
          t,
          e,
          a,
          l
        ), n & 2048 && Mn(9, e);
        break;
      case 1:
        Ze(
          t,
          e,
          a,
          l
        );
        break;
      case 3:
        Ze(
          t,
          e,
          a,
          l
        ), n & 2048 && (t = null, e.alternate !== null && (t = e.alternate.memoizedState.cache), e = e.memoizedState.cache, e !== t && (e.refCount++, t != null && pn(t)));
        break;
      case 12:
        if (n & 2048) {
          Ze(
            t,
            e,
            a,
            l
          ), t = e.stateNode;
          try {
            var u = e.memoizedProps, i = u.id, r = u.onPostCommit;
            typeof r == "function" && r(
              i,
              e.alternate === null ? "mount" : "update",
              t.passiveEffectDuration,
              -0
            );
          } catch (d) {
            _t(e, e.return, d);
          }
        } else
          Ze(
            t,
            e,
            a,
            l
          );
        break;
      case 13:
        Ze(
          t,
          e,
          a,
          l
        );
        break;
      case 23:
        break;
      case 22:
        u = e.stateNode, i = e.alternate, e.memoizedState !== null ? u._visibility & 2 ? Ze(
          t,
          e,
          a,
          l
        ) : Rn(t, e) : u._visibility & 2 ? Ze(
          t,
          e,
          a,
          l
        ) : (u._visibility |= 2, Rl(
          t,
          e,
          a,
          l,
          (e.subtreeFlags & 10256) !== 0
        )), n & 2048 && Pc(i, e);
        break;
      case 24:
        Ze(
          t,
          e,
          a,
          l
        ), n & 2048 && Ic(e.alternate, e);
        break;
      default:
        Ze(
          t,
          e,
          a,
          l
        );
    }
  }
  function Rl(t, e, a, l, n) {
    for (n = n && (e.subtreeFlags & 10256) !== 0, e = e.child; e !== null; ) {
      var u = t, i = e, r = a, d = l, b = i.flags;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          Rl(
            u,
            i,
            r,
            d,
            n
          ), Mn(8, i);
          break;
        case 23:
          break;
        case 22:
          var z = i.stateNode;
          i.memoizedState !== null ? z._visibility & 2 ? Rl(
            u,
            i,
            r,
            d,
            n
          ) : Rn(
            u,
            i
          ) : (z._visibility |= 2, Rl(
            u,
            i,
            r,
            d,
            n
          )), n && b & 2048 && Pc(
            i.alternate,
            i
          );
          break;
        case 24:
          Rl(
            u,
            i,
            r,
            d,
            n
          ), n && b & 2048 && Ic(i.alternate, i);
          break;
        default:
          Rl(
            u,
            i,
            r,
            d,
            n
          );
      }
      e = e.sibling;
    }
  }
  function Rn(t, e) {
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; ) {
        var a = t, l = e, n = l.flags;
        switch (l.tag) {
          case 22:
            Rn(a, l), n & 2048 && Pc(
              l.alternate,
              l
            );
            break;
          case 24:
            Rn(a, l), n & 2048 && Ic(l.alternate, l);
            break;
          default:
            Rn(a, l);
        }
        e = e.sibling;
      }
  }
  var Un = 8192;
  function Ul(t) {
    if (t.subtreeFlags & Un)
      for (t = t.child; t !== null; )
        Lo(t), t = t.sibling;
  }
  function Lo(t) {
    switch (t.tag) {
      case 26:
        Ul(t), t.flags & Un && t.memoizedState !== null && _m(
          Ce,
          t.memoizedState,
          t.memoizedProps
        );
        break;
      case 5:
        Ul(t);
        break;
      case 3:
      case 4:
        var e = Ce;
        Ce = ci(t.stateNode.containerInfo), Ul(t), Ce = e;
        break;
      case 22:
        t.memoizedState === null && (e = t.alternate, e !== null && e.memoizedState !== null ? (e = Un, Un = 16777216, Ul(t), Un = e) : Ul(t));
        break;
      default:
        Ul(t);
    }
  }
  function Xo(t) {
    var e = t.alternate;
    if (e !== null && (t = e.child, t !== null)) {
      e.child = null;
      do
        e = t.sibling, t.sibling = null, t = e;
      while (t !== null);
    }
  }
  function qn(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var a = 0; a < e.length; a++) {
          var l = e[a];
          Vt = l, Zo(
            l,
            t
          );
        }
      Xo(t);
    }
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        Qo(t), t = t.sibling;
  }
  function Qo(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        qn(t), t.flags & 2048 && ja(9, t, t.return);
        break;
      case 3:
        qn(t);
        break;
      case 12:
        qn(t);
        break;
      case 22:
        var e = t.stateNode;
        t.memoizedState !== null && e._visibility & 2 && (t.return === null || t.return.tag !== 13) ? (e._visibility &= -3, $u(t)) : qn(t);
        break;
      default:
        qn(t);
    }
  }
  function $u(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var a = 0; a < e.length; a++) {
          var l = e[a];
          Vt = l, Zo(
            l,
            t
          );
        }
      Xo(t);
    }
    for (t = t.child; t !== null; ) {
      switch (e = t, e.tag) {
        case 0:
        case 11:
        case 15:
          ja(8, e, e.return), $u(e);
          break;
        case 22:
          a = e.stateNode, a._visibility & 2 && (a._visibility &= -3, $u(e));
          break;
        default:
          $u(e);
      }
      t = t.sibling;
    }
  }
  function Zo(t, e) {
    for (; Vt !== null; ) {
      var a = Vt;
      switch (a.tag) {
        case 0:
        case 11:
        case 15:
          ja(8, a, e);
          break;
        case 23:
        case 22:
          if (a.memoizedState !== null && a.memoizedState.cachePool !== null) {
            var l = a.memoizedState.cachePool.pool;
            l != null && l.refCount++;
          }
          break;
        case 24:
          pn(a.memoizedState.cache);
      }
      if (l = a.child, l !== null) l.return = a, Vt = l;
      else
        t: for (a = t; Vt !== null; ) {
          l = Vt;
          var n = l.sibling, u = l.return;
          if (wo(l), l === a) {
            Vt = null;
            break t;
          }
          if (n !== null) {
            n.return = u, Vt = n;
            break t;
          }
          Vt = u;
        }
    }
  }
  var Lv = {
    getCacheForType: function(t) {
      var e = te(kt), a = e.data.get(t);
      return a === void 0 && (a = t(), e.data.set(t, a)), a;
    }
  }, Xv = typeof WeakMap == "function" ? WeakMap : Map, xt = 0, zt = null, dt = null, vt = 0, St = 0, pe = null, Na = !1, ql = !1, ts = !1, sa = 0, Ct = 0, _a = 0, Pa = 0, es = 0, ze = 0, Cl = 0, Cn = null, fe = null, as = !1, ls = 0, Wu = 1 / 0, Fu = null, Aa = null, Ft = 0, za = null, wl = null, Hl = 0, ns = 0, us = null, Vo = null, wn = 0, is = null;
  function ge() {
    if ((xt & 2) !== 0 && vt !== 0)
      return vt & -vt;
    if (A.T !== null) {
      var t = El;
      return t !== 0 ? t : hs();
    }
    return ct();
  }
  function Ko() {
    ze === 0 && (ze = (vt & 536870912) === 0 || pt ? cu() : 536870912);
    var t = Ae.current;
    return t !== null && (t.flags |= 32), ze;
  }
  function ye(t, e, a) {
    (t === zt && (St === 2 || St === 9) || t.cancelPendingCommit !== null) && (Bl(t, 0), Oa(
      t,
      vt,
      ze,
      !1
    )), ha(t, a), ((xt & 2) === 0 || t !== zt) && (t === zt && ((xt & 2) === 0 && (Pa |= a), Ct === 4 && Oa(
      t,
      vt,
      ze,
      !1
    )), Ve(t));
  }
  function Jo(t, e, a) {
    if ((xt & 6) !== 0) throw Error(f(327));
    var l = !a && (e & 124) === 0 && (e & t.expiredLanes) === 0 || ie(t, e), n = l ? Vv(t, e) : rs(t, e, !0), u = l;
    do {
      if (n === 0) {
        ql && !l && Oa(t, e, 0, !1);
        break;
      } else {
        if (a = t.current.alternate, u && !Qv(a)) {
          n = rs(t, e, !1), u = !1;
          continue;
        }
        if (n === 2) {
          if (u = e, t.errorRecoveryDisabledLanes & u)
            var i = 0;
          else
            i = t.pendingLanes & -536870913, i = i !== 0 ? i : i & 536870912 ? 536870912 : 0;
          if (i !== 0) {
            e = i;
            t: {
              var r = t;
              n = Cn;
              var d = r.current.memoizedState.isDehydrated;
              if (d && (Bl(r, i).flags |= 256), i = rs(
                r,
                i,
                !1
              ), i !== 2) {
                if (ts && !d) {
                  r.errorRecoveryDisabledLanes |= u, Pa |= u, n = 4;
                  break t;
                }
                u = fe, fe = n, u !== null && (fe === null ? fe = u : fe.push.apply(
                  fe,
                  u
                ));
              }
              n = i;
            }
            if (u = !1, n !== 2) continue;
          }
        }
        if (n === 1) {
          Bl(t, 0), Oa(t, e, 0, !0);
          break;
        }
        t: {
          switch (l = t, u = n, u) {
            case 0:
            case 1:
              throw Error(f(345));
            case 4:
              if ((e & 4194048) !== e) break;
            case 6:
              Oa(
                l,
                e,
                ze,
                !Na
              );
              break t;
            case 2:
              fe = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(f(329));
          }
          if ((e & 62914560) === e && (n = ls + 300 - xe(), 10 < n)) {
            if (Oa(
              l,
              e,
              ze,
              !Na
            ), nl(l, 0, !0) !== 0) break t;
            l.timeoutHandle = Td(
              $o.bind(
                null,
                l,
                a,
                fe,
                Fu,
                as,
                e,
                ze,
                Pa,
                Cl,
                Na,
                u,
                2,
                -0,
                0
              ),
              n
            );
            break t;
          }
          $o(
            l,
            a,
            fe,
            Fu,
            as,
            e,
            ze,
            Pa,
            Cl,
            Na,
            u,
            0,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    Ve(t);
  }
  function $o(t, e, a, l, n, u, i, r, d, b, z, M, S, T) {
    if (t.timeoutHandle = -1, M = e.subtreeFlags, (M & 8192 || (M & 16785408) === 16785408) && (Xn = { stylesheets: null, count: 0, unsuspend: Nm }, Lo(e), M = Am(), M !== null)) {
      t.cancelPendingCommit = M(
        ad.bind(
          null,
          t,
          e,
          u,
          a,
          l,
          n,
          i,
          r,
          d,
          z,
          1,
          S,
          T
        )
      ), Oa(t, u, i, !b);
      return;
    }
    ad(
      t,
      e,
      u,
      a,
      l,
      n,
      i,
      r,
      d
    );
  }
  function Qv(t) {
    for (var e = t; ; ) {
      var a = e.tag;
      if ((a === 0 || a === 11 || a === 15) && e.flags & 16384 && (a = e.updateQueue, a !== null && (a = a.stores, a !== null)))
        for (var l = 0; l < a.length; l++) {
          var n = a[l], u = n.getSnapshot;
          n = n.value;
          try {
            if (!de(u(), n)) return !1;
          } catch {
            return !1;
          }
        }
      if (a = e.child, e.subtreeFlags & 16384 && a !== null)
        a.return = e, e = a;
      else {
        if (e === t) break;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) return !0;
          e = e.return;
        }
        e.sibling.return = e.return, e = e.sibling;
      }
    }
    return !0;
  }
  function Oa(t, e, a, l) {
    e &= ~es, e &= ~Pa, t.suspendedLanes |= e, t.pingedLanes &= ~e, l && (t.warmLanes |= e), l = t.expirationTimes;
    for (var n = e; 0 < n; ) {
      var u = 31 - $t(n), i = 1 << u;
      l[u] = -1, n &= ~i;
    }
    a !== 0 && Pl(t, a, e);
  }
  function Pu() {
    return (xt & 6) === 0 ? (Hn(0), !1) : !0;
  }
  function cs() {
    if (dt !== null) {
      if (St === 0)
        var t = dt.return;
      else
        t = dt, ta = Va = null, Ec(t), Ml = null, An = 0, t = dt;
      for (; t !== null; )
        zo(t.alternate, t), t = t.return;
      dt = null;
    }
  }
  function Bl(t, e) {
    var a = t.timeoutHandle;
    a !== -1 && (t.timeoutHandle = -1, sm(a)), a = t.cancelPendingCommit, a !== null && (t.cancelPendingCommit = null, a()), cs(), zt = t, dt = a = Fe(t.current, null), vt = e, St = 0, pe = null, Na = !1, ql = ie(t, e), ts = !1, Cl = ze = es = Pa = _a = Ct = 0, fe = Cn = null, as = !1, (e & 8) !== 0 && (e |= e & 32);
    var l = t.entangledLanes;
    if (l !== 0)
      for (t = t.entanglements, l &= e; 0 < l; ) {
        var n = 31 - $t(l), u = 1 << n;
        e |= t[n], l &= ~u;
      }
    return sa = e, xu(), a;
  }
  function Wo(t, e) {
    rt = null, A.H = Yu, e === yn || e === Ou ? (e = df(), St = 3) : e === rf ? (e = df(), St = 4) : St = e === vo ? 8 : e !== null && typeof e == "object" && typeof e.then == "function" ? 6 : 1, pe = e, dt === null && (Ct = 1, Qu(
      t,
      Te(e, t.current)
    ));
  }
  function Fo() {
    var t = A.H;
    return A.H = Yu, t === null ? Yu : t;
  }
  function Po() {
    var t = A.A;
    return A.A = Lv, t;
  }
  function ss() {
    Ct = 4, Na || (vt & 4194048) !== vt && Ae.current !== null || (ql = !0), (_a & 134217727) === 0 && (Pa & 134217727) === 0 || zt === null || Oa(
      zt,
      vt,
      ze,
      !1
    );
  }
  function rs(t, e, a) {
    var l = xt;
    xt |= 2;
    var n = Fo(), u = Po();
    (zt !== t || vt !== e) && (Fu = null, Bl(t, e)), e = !1;
    var i = Ct;
    t: do
      try {
        if (St !== 0 && dt !== null) {
          var r = dt, d = pe;
          switch (St) {
            case 8:
              cs(), i = 6;
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              Ae.current === null && (e = !0);
              var b = St;
              if (St = 0, pe = null, Yl(t, r, d, b), a && ql) {
                i = 0;
                break t;
              }
              break;
            default:
              b = St, St = 0, pe = null, Yl(t, r, d, b);
          }
        }
        Zv(), i = Ct;
        break;
      } catch (z) {
        Wo(t, z);
      }
    while (!0);
    return e && t.shellSuspendCounter++, ta = Va = null, xt = l, A.H = n, A.A = u, dt === null && (zt = null, vt = 0, xu()), i;
  }
  function Zv() {
    for (; dt !== null; ) Io(dt);
  }
  function Vv(t, e) {
    var a = xt;
    xt |= 2;
    var l = Fo(), n = Po();
    zt !== t || vt !== e ? (Fu = null, Wu = xe() + 500, Bl(t, e)) : ql = ie(
      t,
      e
    );
    t: do
      try {
        if (St !== 0 && dt !== null) {
          e = dt;
          var u = pe;
          e: switch (St) {
            case 1:
              St = 0, pe = null, Yl(t, e, u, 1);
              break;
            case 2:
            case 9:
              if (ff(u)) {
                St = 0, pe = null, td(e);
                break;
              }
              e = function() {
                St !== 2 && St !== 9 || zt !== t || (St = 7), Ve(t);
              }, u.then(e, e);
              break t;
            case 3:
              St = 7;
              break t;
            case 4:
              St = 5;
              break t;
            case 7:
              ff(u) ? (St = 0, pe = null, td(e)) : (St = 0, pe = null, Yl(t, e, u, 7));
              break;
            case 5:
              var i = null;
              switch (dt.tag) {
                case 26:
                  i = dt.memoizedState;
                case 5:
                case 27:
                  var r = dt;
                  if (!i || Cd(i)) {
                    St = 0, pe = null;
                    var d = r.sibling;
                    if (d !== null) dt = d;
                    else {
                      var b = r.return;
                      b !== null ? (dt = b, Iu(b)) : dt = null;
                    }
                    break e;
                  }
              }
              St = 0, pe = null, Yl(t, e, u, 5);
              break;
            case 6:
              St = 0, pe = null, Yl(t, e, u, 6);
              break;
            case 8:
              cs(), Ct = 6;
              break t;
            default:
              throw Error(f(462));
          }
        }
        Kv();
        break;
      } catch (z) {
        Wo(t, z);
      }
    while (!0);
    return ta = Va = null, A.H = l, A.A = n, xt = a, dt !== null ? 0 : (zt = null, vt = 0, xu(), Ct);
  }
  function Kv() {
    for (; dt !== null && !tu(); )
      Io(dt);
  }
  function Io(t) {
    var e = _o(t.alternate, t, sa);
    t.memoizedProps = t.pendingProps, e === null ? Iu(t) : dt = e;
  }
  function td(t) {
    var e = t, a = e.alternate;
    switch (e.tag) {
      case 15:
      case 0:
        e = xo(
          a,
          e,
          e.pendingProps,
          e.type,
          void 0,
          vt
        );
        break;
      case 11:
        e = xo(
          a,
          e,
          e.pendingProps,
          e.type.render,
          e.ref,
          vt
        );
        break;
      case 5:
        Ec(e);
      default:
        zo(a, e), e = dt = Ir(e, sa), e = _o(a, e, sa);
    }
    t.memoizedProps = t.pendingProps, e === null ? Iu(t) : dt = e;
  }
  function Yl(t, e, a, l) {
    ta = Va = null, Ec(e), Ml = null, An = 0;
    var n = e.return;
    try {
      if (wv(
        t,
        n,
        e,
        a,
        vt
      )) {
        Ct = 1, Qu(
          t,
          Te(a, t.current)
        ), dt = null;
        return;
      }
    } catch (u) {
      if (n !== null) throw dt = n, u;
      Ct = 1, Qu(
        t,
        Te(a, t.current)
      ), dt = null;
      return;
    }
    e.flags & 32768 ? (pt || l === 1 ? t = !0 : ql || (vt & 536870912) !== 0 ? t = !1 : (Na = t = !0, (l === 2 || l === 9 || l === 3 || l === 6) && (l = Ae.current, l !== null && l.tag === 13 && (l.flags |= 16384))), ed(e, t)) : Iu(e);
  }
  function Iu(t) {
    var e = t;
    do {
      if ((e.flags & 32768) !== 0) {
        ed(
          e,
          Na
        );
        return;
      }
      t = e.return;
      var a = Bv(
        e.alternate,
        e,
        sa
      );
      if (a !== null) {
        dt = a;
        return;
      }
      if (e = e.sibling, e !== null) {
        dt = e;
        return;
      }
      dt = e = t;
    } while (e !== null);
    Ct === 0 && (Ct = 5);
  }
  function ed(t, e) {
    do {
      var a = Yv(t.alternate, t);
      if (a !== null) {
        a.flags &= 32767, dt = a;
        return;
      }
      if (a = t.return, a !== null && (a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null), !e && (t = t.sibling, t !== null)) {
        dt = t;
        return;
      }
      dt = t = a;
    } while (t !== null);
    Ct = 6, dt = null;
  }
  function ad(t, e, a, l, n, u, i, r, d) {
    t.cancelPendingCommit = null;
    do
      ti();
    while (Ft !== 0);
    if ((xt & 6) !== 0) throw Error(f(327));
    if (e !== null) {
      if (e === t.current) throw Error(f(177));
      if (u = e.lanes | e.childLanes, u |= Ii, su(
        t,
        a,
        u,
        i,
        r,
        d
      ), t === zt && (dt = zt = null, vt = 0), wl = e, za = t, Hl = a, ns = u, us = n, Vo = l, (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, Fv(ll, function() {
        return cd(), null;
      })) : (t.callbackNode = null, t.callbackPriority = 0), l = (e.flags & 13878) !== 0, (e.subtreeFlags & 13878) !== 0 || l) {
        l = A.T, A.T = null, n = Y.p, Y.p = 2, i = xt, xt |= 4;
        try {
          Gv(t, e, a);
        } finally {
          xt = i, Y.p = n, A.T = l;
        }
      }
      Ft = 1, ld(), nd(), ud();
    }
  }
  function ld() {
    if (Ft === 1) {
      Ft = 0;
      var t = za, e = wl, a = (e.flags & 13878) !== 0;
      if ((e.subtreeFlags & 13878) !== 0 || a) {
        a = A.T, A.T = null;
        var l = Y.p;
        Y.p = 2;
        var n = xt;
        xt |= 4;
        try {
          Yo(e, t);
          var u = Ss, i = Xr(t.containerInfo), r = u.focusedElem, d = u.selectionRange;
          if (i !== r && r && r.ownerDocument && Lr(
            r.ownerDocument.documentElement,
            r
          )) {
            if (d !== null && Ji(r)) {
              var b = d.start, z = d.end;
              if (z === void 0 && (z = b), "selectionStart" in r)
                r.selectionStart = b, r.selectionEnd = Math.min(
                  z,
                  r.value.length
                );
              else {
                var M = r.ownerDocument || document, S = M && M.defaultView || window;
                if (S.getSelection) {
                  var T = S.getSelection(), ut = r.textContent.length, at = Math.min(d.start, ut), Nt = d.end === void 0 ? at : Math.min(d.end, ut);
                  !T.extend && at > Nt && (i = Nt, Nt = at, at = i);
                  var p = kr(
                    r,
                    at
                  ), v = kr(
                    r,
                    Nt
                  );
                  if (p && v && (T.rangeCount !== 1 || T.anchorNode !== p.node || T.anchorOffset !== p.offset || T.focusNode !== v.node || T.focusOffset !== v.offset)) {
                    var y = M.createRange();
                    y.setStart(p.node, p.offset), T.removeAllRanges(), at > Nt ? (T.addRange(y), T.extend(v.node, v.offset)) : (y.setEnd(v.node, v.offset), T.addRange(y));
                  }
                }
              }
            }
            for (M = [], T = r; T = T.parentNode; )
              T.nodeType === 1 && M.push({
                element: T,
                left: T.scrollLeft,
                top: T.scrollTop
              });
            for (typeof r.focus == "function" && r.focus(), r = 0; r < M.length; r++) {
              var O = M[r];
              O.element.scrollLeft = O.left, O.element.scrollTop = O.top;
            }
          }
          di = !!xs, Ss = xs = null;
        } finally {
          xt = n, Y.p = l, A.T = a;
        }
      }
      t.current = e, Ft = 2;
    }
  }
  function nd() {
    if (Ft === 2) {
      Ft = 0;
      var t = za, e = wl, a = (e.flags & 8772) !== 0;
      if ((e.subtreeFlags & 8772) !== 0 || a) {
        a = A.T, A.T = null;
        var l = Y.p;
        Y.p = 2;
        var n = xt;
        xt |= 4;
        try {
          Co(t, e.alternate, e);
        } finally {
          xt = n, Y.p = l, A.T = a;
        }
      }
      Ft = 3;
    }
  }
  function ud() {
    if (Ft === 4 || Ft === 3) {
      Ft = 0, Ni();
      var t = za, e = wl, a = Hl, l = Vo;
      (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0 ? Ft = 5 : (Ft = 0, wl = za = null, id(t, t.pendingLanes));
      var n = t.pendingLanes;
      if (n === 0 && (Aa = null), j(a), e = e.stateNode, It && typeof It.onCommitFiberRoot == "function")
        try {
          It.onCommitFiberRoot(
            Je,
            e,
            void 0,
            (e.current.flags & 128) === 128
          );
        } catch {
        }
      if (l !== null) {
        e = A.T, n = Y.p, Y.p = 2, A.T = null;
        try {
          for (var u = t.onRecoverableError, i = 0; i < l.length; i++) {
            var r = l[i];
            u(r.value, {
              componentStack: r.stack
            });
          }
        } finally {
          A.T = e, Y.p = n;
        }
      }
      (Hl & 3) !== 0 && ti(), Ve(t), n = t.pendingLanes, (a & 4194090) !== 0 && (n & 42) !== 0 ? t === is ? wn++ : (wn = 0, is = t) : wn = 0, Hn(0);
    }
  }
  function id(t, e) {
    (t.pooledCacheLanes &= e) === 0 && (e = t.pooledCache, e != null && (t.pooledCache = null, pn(e)));
  }
  function ti(t) {
    return ld(), nd(), ud(), cd();
  }
  function cd() {
    if (Ft !== 5) return !1;
    var t = za, e = ns;
    ns = 0;
    var a = j(Hl), l = A.T, n = Y.p;
    try {
      Y.p = 32 > a ? 32 : a, A.T = null, a = us, us = null;
      var u = za, i = Hl;
      if (Ft = 0, wl = za = null, Hl = 0, (xt & 6) !== 0) throw Error(f(331));
      var r = xt;
      if (xt |= 4, Qo(u.current), ko(
        u,
        u.current,
        i,
        a
      ), xt = r, Hn(0, !1), It && typeof It.onPostCommitFiberRoot == "function")
        try {
          It.onPostCommitFiberRoot(Je, u);
        } catch {
        }
      return !0;
    } finally {
      Y.p = n, A.T = l, id(t, e);
    }
  }
  function sd(t, e, a) {
    e = Te(a, e), e = Bc(t.stateNode, e, 2), t = ya(t, e, 2), t !== null && (ha(t, 2), Ve(t));
  }
  function _t(t, e, a) {
    if (t.tag === 3)
      sd(t, t, a);
    else
      for (; e !== null; ) {
        if (e.tag === 3) {
          sd(
            e,
            t,
            a
          );
          break;
        } else if (e.tag === 1) {
          var l = e.stateNode;
          if (typeof e.type.getDerivedStateFromError == "function" || typeof l.componentDidCatch == "function" && (Aa === null || !Aa.has(l))) {
            t = Te(a, t), a = oo(2), l = ya(e, a, 2), l !== null && (ho(
              a,
              l,
              e,
              t
            ), ha(l, 2), Ve(l));
            break;
          }
        }
        e = e.return;
      }
  }
  function fs(t, e, a) {
    var l = t.pingCache;
    if (l === null) {
      l = t.pingCache = new Xv();
      var n = /* @__PURE__ */ new Set();
      l.set(e, n);
    } else
      n = l.get(e), n === void 0 && (n = /* @__PURE__ */ new Set(), l.set(e, n));
    n.has(a) || (ts = !0, n.add(a), t = Jv.bind(null, t, e, a), e.then(t, t));
  }
  function Jv(t, e, a) {
    var l = t.pingCache;
    l !== null && l.delete(e), t.pingedLanes |= t.suspendedLanes & a, t.warmLanes &= ~a, zt === t && (vt & a) === a && (Ct === 4 || Ct === 3 && (vt & 62914560) === vt && 300 > xe() - ls ? (xt & 2) === 0 && Bl(t, 0) : es |= a, Cl === vt && (Cl = 0)), Ve(t);
  }
  function rd(t, e) {
    e === 0 && (e = Fl()), t = xl(t, e), t !== null && (ha(t, e), Ve(t));
  }
  function $v(t) {
    var e = t.memoizedState, a = 0;
    e !== null && (a = e.retryLane), rd(t, a);
  }
  function Wv(t, e) {
    var a = 0;
    switch (t.tag) {
      case 13:
        var l = t.stateNode, n = t.memoizedState;
        n !== null && (a = n.retryLane);
        break;
      case 19:
        l = t.stateNode;
        break;
      case 22:
        l = t.stateNode._retryCache;
        break;
      default:
        throw Error(f(314));
    }
    l !== null && l.delete(e), rd(t, a);
  }
  function Fv(t, e) {
    return Wl(t, e);
  }
  var ei = null, Gl = null, os = !1, ai = !1, ds = !1, Ia = 0;
  function Ve(t) {
    t !== Gl && t.next === null && (Gl === null ? ei = Gl = t : Gl = Gl.next = t), ai = !0, os || (os = !0, Iv());
  }
  function Hn(t, e) {
    if (!ds && ai) {
      ds = !0;
      do
        for (var a = !1, l = ei; l !== null; ) {
          if (t !== 0) {
            var n = l.pendingLanes;
            if (n === 0) var u = 0;
            else {
              var i = l.suspendedLanes, r = l.pingedLanes;
              u = (1 << 31 - $t(42 | t) + 1) - 1, u &= n & ~(i & ~r), u = u & 201326741 ? u & 201326741 | 1 : u ? u | 2 : 0;
            }
            u !== 0 && (a = !0, hd(l, u));
          } else
            u = vt, u = nl(
              l,
              l === zt ? u : 0,
              l.cancelPendingCommit !== null || l.timeoutHandle !== -1
            ), (u & 3) === 0 || ie(l, u) || (a = !0, hd(l, u));
          l = l.next;
        }
      while (a);
      ds = !1;
    }
  }
  function Pv() {
    fd();
  }
  function fd() {
    ai = os = !1;
    var t = 0;
    Ia !== 0 && (cm() && (t = Ia), Ia = 0);
    for (var e = xe(), a = null, l = ei; l !== null; ) {
      var n = l.next, u = od(l, e);
      u === 0 ? (l.next = null, a === null ? ei = n : a.next = n, n === null && (Gl = a)) : (a = l, (t !== 0 || (u & 3) !== 0) && (ai = !0)), l = n;
    }
    Hn(t);
  }
  function od(t, e) {
    for (var a = t.suspendedLanes, l = t.pingedLanes, n = t.expirationTimes, u = t.pendingLanes & -62914561; 0 < u; ) {
      var i = 31 - $t(u), r = 1 << i, d = n[i];
      d === -1 ? ((r & a) === 0 || (r & l) !== 0) && (n[i] = Ai(r, e)) : d <= e && (t.expiredLanes |= r), u &= ~r;
    }
    if (e = zt, a = vt, a = nl(
      t,
      t === e ? a : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), l = t.callbackNode, a === 0 || t === e && (St === 2 || St === 9) || t.cancelPendingCommit !== null)
      return l !== null && l !== null && al(l), t.callbackNode = null, t.callbackPriority = 0;
    if ((a & 3) === 0 || ie(t, a)) {
      if (e = a & -a, e === t.callbackPriority) return e;
      switch (l !== null && al(l), j(a)) {
        case 2:
        case 8:
          a = au;
          break;
        case 32:
          a = ll;
          break;
        case 268435456:
          a = nu;
          break;
        default:
          a = ll;
      }
      return l = dd.bind(null, t), a = Wl(a, l), t.callbackPriority = e, t.callbackNode = a, e;
    }
    return l !== null && l !== null && al(l), t.callbackPriority = 2, t.callbackNode = null, 2;
  }
  function dd(t, e) {
    if (Ft !== 0 && Ft !== 5)
      return t.callbackNode = null, t.callbackPriority = 0, null;
    var a = t.callbackNode;
    if (ti() && t.callbackNode !== a)
      return null;
    var l = vt;
    return l = nl(
      t,
      t === zt ? l : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), l === 0 ? null : (Jo(t, l, e), od(t, xe()), t.callbackNode != null && t.callbackNode === a ? dd.bind(null, t) : null);
  }
  function hd(t, e) {
    if (ti()) return null;
    Jo(t, e, !0);
  }
  function Iv() {
    rm(function() {
      (xt & 6) !== 0 ? Wl(
        ue,
        Pv
      ) : fd();
    });
  }
  function hs() {
    return Ia === 0 && (Ia = cu()), Ia;
  }
  function vd(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : hu("" + t);
  }
  function md(t, e) {
    var a = e.ownerDocument.createElement("input");
    return a.name = e.name, a.value = e.value, t.id && a.setAttribute("form", t.id), e.parentNode.insertBefore(a, e), t = new FormData(t), a.parentNode.removeChild(a), t;
  }
  function tm(t, e, a, l, n) {
    if (e === "submit" && a && a.stateNode === n) {
      var u = vd(
        (n[Xt] || null).action
      ), i = l.submitter;
      i && (e = (e = i[Xt] || null) ? vd(e.formAction) : i.getAttribute("formAction"), e !== null && (u = e, i = null));
      var r = new gu(
        "action",
        "action",
        null,
        l,
        n
      );
      t.push({
        event: r,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (l.defaultPrevented) {
                if (Ia !== 0) {
                  var d = i ? md(n, i) : new FormData(n);
                  Uc(
                    a,
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
                typeof u == "function" && (r.preventDefault(), d = i ? md(n, i) : new FormData(n), Uc(
                  a,
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
  for (var vs = 0; vs < Pi.length; vs++) {
    var ms = Pi[vs], em = ms.toLowerCase(), am = ms[0].toUpperCase() + ms.slice(1);
    qe(
      em,
      "on" + am
    );
  }
  qe(Vr, "onAnimationEnd"), qe(Kr, "onAnimationIteration"), qe(Jr, "onAnimationStart"), qe("dblclick", "onDoubleClick"), qe("focusin", "onFocus"), qe("focusout", "onBlur"), qe(bv, "onTransitionRun"), qe(xv, "onTransitionStart"), qe(Sv, "onTransitionCancel"), qe($r, "onTransitionEnd"), fl("onMouseEnter", ["mouseout", "mouseover"]), fl("onMouseLeave", ["mouseout", "mouseover"]), fl("onPointerEnter", ["pointerout", "pointerover"]), fl("onPointerLeave", ["pointerout", "pointerover"]), Ha(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), Ha(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), Ha("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Ha(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), Ha(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), Ha(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var Bn = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), lm = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Bn)
  );
  function pd(t, e) {
    e = (e & 4) !== 0;
    for (var a = 0; a < t.length; a++) {
      var l = t[a], n = l.event;
      l = l.listeners;
      t: {
        var u = void 0;
        if (e)
          for (var i = l.length - 1; 0 <= i; i--) {
            var r = l[i], d = r.instance, b = r.currentTarget;
            if (r = r.listener, d !== u && n.isPropagationStopped())
              break t;
            u = r, n.currentTarget = b;
            try {
              u(n);
            } catch (z) {
              Xu(z);
            }
            n.currentTarget = null, u = d;
          }
        else
          for (i = 0; i < l.length; i++) {
            if (r = l[i], d = r.instance, b = r.currentTarget, r = r.listener, d !== u && n.isPropagationStopped())
              break t;
            u = r, n.currentTarget = b;
            try {
              u(n);
            } catch (z) {
              Xu(z);
            }
            n.currentTarget = null, u = d;
          }
      }
    }
  }
  function ht(t, e) {
    var a = e[zi];
    a === void 0 && (a = e[zi] = /* @__PURE__ */ new Set());
    var l = t + "__bubble";
    a.has(l) || (gd(e, t, 2, !1), a.add(l));
  }
  function ps(t, e, a) {
    var l = 0;
    e && (l |= 4), gd(
      a,
      t,
      l,
      e
    );
  }
  var li = "_reactListening" + Math.random().toString(36).slice(2);
  function gs(t) {
    if (!t[li]) {
      t[li] = !0, sr.forEach(function(a) {
        a !== "selectionchange" && (lm.has(a) || ps(a, !1, t), ps(a, !0, t));
      });
      var e = t.nodeType === 9 ? t : t.ownerDocument;
      e === null || e[li] || (e[li] = !0, ps("selectionchange", !1, e));
    }
  }
  function gd(t, e, a, l) {
    switch (kd(e)) {
      case 2:
        var n = Mm;
        break;
      case 8:
        n = Dm;
        break;
      default:
        n = Ds;
    }
    a = n.bind(
      null,
      e,
      a,
      t
    ), n = void 0, !Yi || e !== "touchstart" && e !== "touchmove" && e !== "wheel" || (n = !0), l ? n !== void 0 ? t.addEventListener(e, a, {
      capture: !0,
      passive: n
    }) : t.addEventListener(e, a, !0) : n !== void 0 ? t.addEventListener(e, a, {
      passive: n
    }) : t.addEventListener(e, a, !1);
  }
  function ys(t, e, a, l, n) {
    var u = l;
    if ((e & 1) === 0 && (e & 2) === 0 && l !== null)
      t: for (; ; ) {
        if (l === null) return;
        var i = l.tag;
        if (i === 3 || i === 4) {
          var r = l.stateNode.containerInfo;
          if (r === n) break;
          if (i === 4)
            for (i = l.return; i !== null; ) {
              var d = i.tag;
              if ((d === 3 || d === 4) && i.stateNode.containerInfo === n)
                return;
              i = i.return;
            }
          for (; r !== null; ) {
            if (i = cl(r), i === null) return;
            if (d = i.tag, d === 5 || d === 6 || d === 26 || d === 27) {
              l = u = i;
              continue t;
            }
            r = r.parentNode;
          }
        }
        l = l.return;
      }
    jr(function() {
      var b = u, z = Hi(a), M = [];
      t: {
        var S = Wr.get(t);
        if (S !== void 0) {
          var T = gu, ut = t;
          switch (t) {
            case "keypress":
              if (mu(a) === 0) break t;
            case "keydown":
            case "keyup":
              T = Fh;
              break;
            case "focusin":
              ut = "focus", T = Xi;
              break;
            case "focusout":
              ut = "blur", T = Xi;
              break;
            case "beforeblur":
            case "afterblur":
              T = Xi;
              break;
            case "click":
              if (a.button === 2) break t;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              T = Nr;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              T = Yh;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              T = tv;
              break;
            case Vr:
            case Kr:
            case Jr:
              T = Lh;
              break;
            case $r:
              T = av;
              break;
            case "scroll":
            case "scrollend":
              T = Hh;
              break;
            case "wheel":
              T = nv;
              break;
            case "copy":
            case "cut":
            case "paste":
              T = Qh;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              T = Ar;
              break;
            case "toggle":
            case "beforetoggle":
              T = iv;
          }
          var at = (e & 4) !== 0, Nt = !at && (t === "scroll" || t === "scrollend"), p = at ? S !== null ? S + "Capture" : null : S;
          at = [];
          for (var v = b, y; v !== null; ) {
            var O = v;
            if (y = O.stateNode, O = O.tag, O !== 5 && O !== 26 && O !== 27 || y === null || p === null || (O = an(v, p), O != null && at.push(
              Yn(v, O, y)
            )), Nt) break;
            v = v.return;
          }
          0 < at.length && (S = new T(
            S,
            ut,
            null,
            a,
            z
          ), M.push({ event: S, listeners: at }));
        }
      }
      if ((e & 7) === 0) {
        t: {
          if (S = t === "mouseover" || t === "pointerover", T = t === "mouseout" || t === "pointerout", S && a !== wi && (ut = a.relatedTarget || a.fromElement) && (cl(ut) || ut[Ue]))
            break t;
          if ((T || S) && (S = z.window === z ? z : (S = z.ownerDocument) ? S.defaultView || S.parentWindow : window, T ? (ut = a.relatedTarget || a.toElement, T = b, ut = ut ? cl(ut) : null, ut !== null && (Nt = N(ut), at = ut.tag, ut !== Nt || at !== 5 && at !== 27 && at !== 6) && (ut = null)) : (T = null, ut = b), T !== ut)) {
            if (at = Nr, O = "onMouseLeave", p = "onMouseEnter", v = "mouse", (t === "pointerout" || t === "pointerover") && (at = Ar, O = "onPointerLeave", p = "onPointerEnter", v = "pointer"), Nt = T == null ? S : en(T), y = ut == null ? S : en(ut), S = new at(
              O,
              v + "leave",
              T,
              a,
              z
            ), S.target = Nt, S.relatedTarget = y, O = null, cl(z) === b && (at = new at(
              p,
              v + "enter",
              ut,
              a,
              z
            ), at.target = y, at.relatedTarget = Nt, O = at), Nt = O, T && ut)
              e: {
                for (at = T, p = ut, v = 0, y = at; y; y = kl(y))
                  v++;
                for (y = 0, O = p; O; O = kl(O))
                  y++;
                for (; 0 < v - y; )
                  at = kl(at), v--;
                for (; 0 < y - v; )
                  p = kl(p), y--;
                for (; v--; ) {
                  if (at === p || p !== null && at === p.alternate)
                    break e;
                  at = kl(at), p = kl(p);
                }
                at = null;
              }
            else at = null;
            T !== null && yd(
              M,
              S,
              T,
              at,
              !1
            ), ut !== null && Nt !== null && yd(
              M,
              Nt,
              ut,
              at,
              !0
            );
          }
        }
        t: {
          if (S = b ? en(b) : window, T = S.nodeName && S.nodeName.toLowerCase(), T === "select" || T === "input" && S.type === "file")
            var Z = Cr;
          else if (Ur(S))
            if (wr)
              Z = pv;
            else {
              Z = vv;
              var ft = hv;
            }
          else
            T = S.nodeName, !T || T.toLowerCase() !== "input" || S.type !== "checkbox" && S.type !== "radio" ? b && Ci(b.elementType) && (Z = Cr) : Z = mv;
          if (Z && (Z = Z(t, b))) {
            qr(
              M,
              Z,
              a,
              z
            );
            break t;
          }
          ft && ft(t, S, b), t === "focusout" && b && S.type === "number" && b.memoizedProps.value != null && qi(S, "number", S.value);
        }
        switch (ft = b ? en(b) : window, t) {
          case "focusin":
            (Ur(ft) || ft.contentEditable === "true") && (gl = ft, $i = b, on = null);
            break;
          case "focusout":
            on = $i = gl = null;
            break;
          case "mousedown":
            Wi = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Wi = !1, Qr(M, a, z);
            break;
          case "selectionchange":
            if (yv) break;
          case "keydown":
          case "keyup":
            Qr(M, a, z);
        }
        var W;
        if (Zi)
          t: {
            switch (t) {
              case "compositionstart":
                var lt = "onCompositionStart";
                break t;
              case "compositionend":
                lt = "onCompositionEnd";
                break t;
              case "compositionupdate":
                lt = "onCompositionUpdate";
                break t;
            }
            lt = void 0;
          }
        else
          pl ? Dr(t, a) && (lt = "onCompositionEnd") : t === "keydown" && a.keyCode === 229 && (lt = "onCompositionStart");
        lt && (zr && a.locale !== "ko" && (pl || lt !== "onCompositionStart" ? lt === "onCompositionEnd" && pl && (W = Tr()) : (va = z, Gi = "value" in va ? va.value : va.textContent, pl = !0)), ft = ni(b, lt), 0 < ft.length && (lt = new _r(
          lt,
          t,
          null,
          a,
          z
        ), M.push({ event: lt, listeners: ft }), W ? lt.data = W : (W = Rr(a), W !== null && (lt.data = W)))), (W = sv ? rv(t, a) : fv(t, a)) && (lt = ni(b, "onBeforeInput"), 0 < lt.length && (ft = new _r(
          "onBeforeInput",
          "beforeinput",
          null,
          a,
          z
        ), M.push({
          event: ft,
          listeners: lt
        }), ft.data = W)), tm(
          M,
          t,
          b,
          a,
          z
        );
      }
      pd(M, e);
    });
  }
  function Yn(t, e, a) {
    return {
      instance: t,
      listener: e,
      currentTarget: a
    };
  }
  function ni(t, e) {
    for (var a = e + "Capture", l = []; t !== null; ) {
      var n = t, u = n.stateNode;
      if (n = n.tag, n !== 5 && n !== 26 && n !== 27 || u === null || (n = an(t, a), n != null && l.unshift(
        Yn(t, n, u)
      ), n = an(t, e), n != null && l.push(
        Yn(t, n, u)
      )), t.tag === 3) return l;
      t = t.return;
    }
    return [];
  }
  function kl(t) {
    if (t === null) return null;
    do
      t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function yd(t, e, a, l, n) {
    for (var u = e._reactName, i = []; a !== null && a !== l; ) {
      var r = a, d = r.alternate, b = r.stateNode;
      if (r = r.tag, d !== null && d === l) break;
      r !== 5 && r !== 26 && r !== 27 || b === null || (d = b, n ? (b = an(a, u), b != null && i.unshift(
        Yn(a, b, d)
      )) : n || (b = an(a, u), b != null && i.push(
        Yn(a, b, d)
      ))), a = a.return;
    }
    i.length !== 0 && t.push({ event: e, listeners: i });
  }
  var nm = /\r\n?/g, um = /\u0000|\uFFFD/g;
  function bd(t) {
    return (typeof t == "string" ? t : "" + t).replace(nm, `
`).replace(um, "");
  }
  function xd(t, e) {
    return e = bd(e), bd(t) === e;
  }
  function ui() {
  }
  function Et(t, e, a, l, n, u) {
    switch (a) {
      case "children":
        typeof l == "string" ? e === "body" || e === "textarea" && l === "" || hl(t, l) : (typeof l == "number" || typeof l == "bigint") && e !== "body" && hl(t, "" + l);
        break;
      case "className":
        fu(t, "class", l);
        break;
      case "tabIndex":
        fu(t, "tabindex", l);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        fu(t, a, l);
        break;
      case "style":
        xr(t, l, u);
        break;
      case "data":
        if (e !== "object") {
          fu(t, "data", l);
          break;
        }
      case "src":
      case "href":
        if (l === "" && (e !== "a" || a !== "href")) {
          t.removeAttribute(a);
          break;
        }
        if (l == null || typeof l == "function" || typeof l == "symbol" || typeof l == "boolean") {
          t.removeAttribute(a);
          break;
        }
        l = hu("" + l), t.setAttribute(a, l);
        break;
      case "action":
      case "formAction":
        if (typeof l == "function") {
          t.setAttribute(
            a,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof u == "function" && (a === "formAction" ? (e !== "input" && Et(t, e, "name", n.name, n, null), Et(
            t,
            e,
            "formEncType",
            n.formEncType,
            n,
            null
          ), Et(
            t,
            e,
            "formMethod",
            n.formMethod,
            n,
            null
          ), Et(
            t,
            e,
            "formTarget",
            n.formTarget,
            n,
            null
          )) : (Et(t, e, "encType", n.encType, n, null), Et(t, e, "method", n.method, n, null), Et(t, e, "target", n.target, n, null)));
        if (l == null || typeof l == "symbol" || typeof l == "boolean") {
          t.removeAttribute(a);
          break;
        }
        l = hu("" + l), t.setAttribute(a, l);
        break;
      case "onClick":
        l != null && (t.onclick = ui);
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
            throw Error(f(61));
          if (a = l.__html, a != null) {
            if (n.children != null) throw Error(f(60));
            t.innerHTML = a;
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
        a = hu("" + l), t.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          a
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
        l != null && typeof l != "function" && typeof l != "symbol" ? t.setAttribute(a, "" + l) : t.removeAttribute(a);
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
        l && typeof l != "function" && typeof l != "symbol" ? t.setAttribute(a, "") : t.removeAttribute(a);
        break;
      case "capture":
      case "download":
        l === !0 ? t.setAttribute(a, "") : l !== !1 && l != null && typeof l != "function" && typeof l != "symbol" ? t.setAttribute(a, l) : t.removeAttribute(a);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        l != null && typeof l != "function" && typeof l != "symbol" && !isNaN(l) && 1 <= l ? t.setAttribute(a, l) : t.removeAttribute(a);
        break;
      case "rowSpan":
      case "start":
        l == null || typeof l == "function" || typeof l == "symbol" || isNaN(l) ? t.removeAttribute(a) : t.setAttribute(a, l);
        break;
      case "popover":
        ht("beforetoggle", t), ht("toggle", t), ru(t, "popover", l);
        break;
      case "xlinkActuate":
        $e(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          l
        );
        break;
      case "xlinkArcrole":
        $e(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          l
        );
        break;
      case "xlinkRole":
        $e(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          l
        );
        break;
      case "xlinkShow":
        $e(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          l
        );
        break;
      case "xlinkTitle":
        $e(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          l
        );
        break;
      case "xlinkType":
        $e(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          l
        );
        break;
      case "xmlBase":
        $e(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          l
        );
        break;
      case "xmlLang":
        $e(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          l
        );
        break;
      case "xmlSpace":
        $e(
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
        (!(2 < a.length) || a[0] !== "o" && a[0] !== "O" || a[1] !== "n" && a[1] !== "N") && (a = Ch.get(a) || a, ru(t, a, l));
    }
  }
  function bs(t, e, a, l, n, u) {
    switch (a) {
      case "style":
        xr(t, l, u);
        break;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l))
            throw Error(f(61));
          if (a = l.__html, a != null) {
            if (n.children != null) throw Error(f(60));
            t.innerHTML = a;
          }
        }
        break;
      case "children":
        typeof l == "string" ? hl(t, l) : (typeof l == "number" || typeof l == "bigint") && hl(t, "" + l);
        break;
      case "onScroll":
        l != null && ht("scroll", t);
        break;
      case "onScrollEnd":
        l != null && ht("scrollend", t);
        break;
      case "onClick":
        l != null && (t.onclick = ui);
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
        if (!rr.hasOwnProperty(a))
          t: {
            if (a[0] === "o" && a[1] === "n" && (n = a.endsWith("Capture"), e = a.slice(2, n ? a.length - 7 : void 0), u = t[Xt] || null, u = u != null ? u[a] : null, typeof u == "function" && t.removeEventListener(e, u, n), typeof l == "function")) {
              typeof u != "function" && u !== null && (a in t ? t[a] = null : t.hasAttribute(a) && t.removeAttribute(a)), t.addEventListener(e, l, n);
              break t;
            }
            a in t ? t[a] = l : l === !0 ? t.setAttribute(a, "") : ru(t, a, l);
          }
    }
  }
  function Pt(t, e, a) {
    switch (e) {
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
        for (u in a)
          if (a.hasOwnProperty(u)) {
            var i = a[u];
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
                  throw Error(f(137, e));
                default:
                  Et(t, e, u, i, a, null);
              }
          }
        n && Et(t, e, "srcSet", a.srcSet, a, null), l && Et(t, e, "src", a.src, a, null);
        return;
      case "input":
        ht("invalid", t);
        var r = u = i = n = null, d = null, b = null;
        for (l in a)
          if (a.hasOwnProperty(l)) {
            var z = a[l];
            if (z != null)
              switch (l) {
                case "name":
                  n = z;
                  break;
                case "type":
                  i = z;
                  break;
                case "checked":
                  d = z;
                  break;
                case "defaultChecked":
                  b = z;
                  break;
                case "value":
                  u = z;
                  break;
                case "defaultValue":
                  r = z;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (z != null)
                    throw Error(f(137, e));
                  break;
                default:
                  Et(t, e, l, z, a, null);
              }
          }
        pr(
          t,
          u,
          r,
          d,
          b,
          i,
          n,
          !1
        ), ou(t);
        return;
      case "select":
        ht("invalid", t), l = i = u = null;
        for (n in a)
          if (a.hasOwnProperty(n) && (r = a[n], r != null))
            switch (n) {
              case "value":
                u = r;
                break;
              case "defaultValue":
                i = r;
                break;
              case "multiple":
                l = r;
              default:
                Et(t, e, n, r, a, null);
            }
        e = u, a = i, t.multiple = !!l, e != null ? dl(t, !!l, e, !1) : a != null && dl(t, !!l, a, !0);
        return;
      case "textarea":
        ht("invalid", t), u = n = l = null;
        for (i in a)
          if (a.hasOwnProperty(i) && (r = a[i], r != null))
            switch (i) {
              case "value":
                l = r;
                break;
              case "defaultValue":
                n = r;
                break;
              case "children":
                u = r;
                break;
              case "dangerouslySetInnerHTML":
                if (r != null) throw Error(f(91));
                break;
              default:
                Et(t, e, i, r, a, null);
            }
        yr(t, l, n, u), ou(t);
        return;
      case "option":
        for (d in a)
          if (a.hasOwnProperty(d) && (l = a[d], l != null))
            switch (d) {
              case "selected":
                t.selected = l && typeof l != "function" && typeof l != "symbol";
                break;
              default:
                Et(t, e, d, l, a, null);
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
        for (l = 0; l < Bn.length; l++)
          ht(Bn[l], t);
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
        for (b in a)
          if (a.hasOwnProperty(b) && (l = a[b], l != null))
            switch (b) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(f(137, e));
              default:
                Et(t, e, b, l, a, null);
            }
        return;
      default:
        if (Ci(e)) {
          for (z in a)
            a.hasOwnProperty(z) && (l = a[z], l !== void 0 && bs(
              t,
              e,
              z,
              l,
              a,
              void 0
            ));
          return;
        }
    }
    for (r in a)
      a.hasOwnProperty(r) && (l = a[r], l != null && Et(t, e, r, l, a, null));
  }
  function im(t, e, a, l) {
    switch (e) {
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
        var n = null, u = null, i = null, r = null, d = null, b = null, z = null;
        for (T in a) {
          var M = a[T];
          if (a.hasOwnProperty(T) && M != null)
            switch (T) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                d = M;
              default:
                l.hasOwnProperty(T) || Et(t, e, T, null, l, M);
            }
        }
        for (var S in l) {
          var T = l[S];
          if (M = a[S], l.hasOwnProperty(S) && (T != null || M != null))
            switch (S) {
              case "type":
                u = T;
                break;
              case "name":
                n = T;
                break;
              case "checked":
                b = T;
                break;
              case "defaultChecked":
                z = T;
                break;
              case "value":
                i = T;
                break;
              case "defaultValue":
                r = T;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (T != null)
                  throw Error(f(137, e));
                break;
              default:
                T !== M && Et(
                  t,
                  e,
                  S,
                  T,
                  l,
                  M
                );
            }
        }
        Ui(
          t,
          i,
          r,
          d,
          b,
          z,
          u,
          n
        );
        return;
      case "select":
        T = i = r = S = null;
        for (u in a)
          if (d = a[u], a.hasOwnProperty(u) && d != null)
            switch (u) {
              case "value":
                break;
              case "multiple":
                T = d;
              default:
                l.hasOwnProperty(u) || Et(
                  t,
                  e,
                  u,
                  null,
                  l,
                  d
                );
            }
        for (n in l)
          if (u = l[n], d = a[n], l.hasOwnProperty(n) && (u != null || d != null))
            switch (n) {
              case "value":
                S = u;
                break;
              case "defaultValue":
                r = u;
                break;
              case "multiple":
                i = u;
              default:
                u !== d && Et(
                  t,
                  e,
                  n,
                  u,
                  l,
                  d
                );
            }
        e = r, a = i, l = T, S != null ? dl(t, !!a, S, !1) : !!l != !!a && (e != null ? dl(t, !!a, e, !0) : dl(t, !!a, a ? [] : "", !1));
        return;
      case "textarea":
        T = S = null;
        for (r in a)
          if (n = a[r], a.hasOwnProperty(r) && n != null && !l.hasOwnProperty(r))
            switch (r) {
              case "value":
                break;
              case "children":
                break;
              default:
                Et(t, e, r, null, l, n);
            }
        for (i in l)
          if (n = l[i], u = a[i], l.hasOwnProperty(i) && (n != null || u != null))
            switch (i) {
              case "value":
                S = n;
                break;
              case "defaultValue":
                T = n;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (n != null) throw Error(f(91));
                break;
              default:
                n !== u && Et(t, e, i, n, l, u);
            }
        gr(t, S, T);
        return;
      case "option":
        for (var ut in a)
          if (S = a[ut], a.hasOwnProperty(ut) && S != null && !l.hasOwnProperty(ut))
            switch (ut) {
              case "selected":
                t.selected = !1;
                break;
              default:
                Et(
                  t,
                  e,
                  ut,
                  null,
                  l,
                  S
                );
            }
        for (d in l)
          if (S = l[d], T = a[d], l.hasOwnProperty(d) && S !== T && (S != null || T != null))
            switch (d) {
              case "selected":
                t.selected = S && typeof S != "function" && typeof S != "symbol";
                break;
              default:
                Et(
                  t,
                  e,
                  d,
                  S,
                  l,
                  T
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
        for (var at in a)
          S = a[at], a.hasOwnProperty(at) && S != null && !l.hasOwnProperty(at) && Et(t, e, at, null, l, S);
        for (b in l)
          if (S = l[b], T = a[b], l.hasOwnProperty(b) && S !== T && (S != null || T != null))
            switch (b) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (S != null)
                  throw Error(f(137, e));
                break;
              default:
                Et(
                  t,
                  e,
                  b,
                  S,
                  l,
                  T
                );
            }
        return;
      default:
        if (Ci(e)) {
          for (var Nt in a)
            S = a[Nt], a.hasOwnProperty(Nt) && S !== void 0 && !l.hasOwnProperty(Nt) && bs(
              t,
              e,
              Nt,
              void 0,
              l,
              S
            );
          for (z in l)
            S = l[z], T = a[z], !l.hasOwnProperty(z) || S === T || S === void 0 && T === void 0 || bs(
              t,
              e,
              z,
              S,
              l,
              T
            );
          return;
        }
    }
    for (var p in a)
      S = a[p], a.hasOwnProperty(p) && S != null && !l.hasOwnProperty(p) && Et(t, e, p, null, l, S);
    for (M in l)
      S = l[M], T = a[M], !l.hasOwnProperty(M) || S === T || S == null && T == null || Et(t, e, M, S, l, T);
  }
  var xs = null, Ss = null;
  function ii(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function Sd(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function jd(t, e) {
    if (t === 0)
      switch (e) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return t === 1 && e === "foreignObject" ? 0 : t;
  }
  function js(t, e) {
    return t === "textarea" || t === "noscript" || typeof e.children == "string" || typeof e.children == "number" || typeof e.children == "bigint" || typeof e.dangerouslySetInnerHTML == "object" && e.dangerouslySetInnerHTML !== null && e.dangerouslySetInnerHTML.__html != null;
  }
  var Ts = null;
  function cm() {
    var t = window.event;
    return t && t.type === "popstate" ? t === Ts ? !1 : (Ts = t, !0) : (Ts = null, !1);
  }
  var Td = typeof setTimeout == "function" ? setTimeout : void 0, sm = typeof clearTimeout == "function" ? clearTimeout : void 0, Ed = typeof Promise == "function" ? Promise : void 0, rm = typeof queueMicrotask == "function" ? queueMicrotask : typeof Ed < "u" ? function(t) {
    return Ed.resolve(null).then(t).catch(fm);
  } : Td;
  function fm(t) {
    setTimeout(function() {
      throw t;
    });
  }
  function Ma(t) {
    return t === "head";
  }
  function Nd(t, e) {
    var a = e, l = 0, n = 0;
    do {
      var u = a.nextSibling;
      if (t.removeChild(a), u && u.nodeType === 8)
        if (a = u.data, a === "/$") {
          if (0 < l && 8 > l) {
            a = l;
            var i = t.ownerDocument;
            if (a & 1 && Gn(i.documentElement), a & 2 && Gn(i.body), a & 4)
              for (a = i.head, Gn(a), i = a.firstChild; i; ) {
                var r = i.nextSibling, d = i.nodeName;
                i[tn] || d === "SCRIPT" || d === "STYLE" || d === "LINK" && i.rel.toLowerCase() === "stylesheet" || a.removeChild(i), i = r;
              }
          }
          if (n === 0) {
            t.removeChild(u), Jn(e);
            return;
          }
          n--;
        } else
          a === "$" || a === "$?" || a === "$!" ? n++ : l = a.charCodeAt(0) - 48;
      else l = 0;
      a = u;
    } while (a);
    Jn(e);
  }
  function Es(t) {
    var e = t.firstChild;
    for (e && e.nodeType === 10 && (e = e.nextSibling); e; ) {
      var a = e;
      switch (e = e.nextSibling, a.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Es(a), Oi(a);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (a.rel.toLowerCase() === "stylesheet") continue;
      }
      t.removeChild(a);
    }
  }
  function om(t, e, a, l) {
    for (; t.nodeType === 1; ) {
      var n = a;
      if (t.nodeName.toLowerCase() !== e.toLowerCase()) {
        if (!l && (t.nodeName !== "INPUT" || t.type !== "hidden"))
          break;
      } else if (l) {
        if (!t[tn])
          switch (e) {
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
      } else if (e === "input" && t.type === "hidden") {
        var u = n.name == null ? null : "" + n.name;
        if (n.type === "hidden" && t.getAttribute("name") === u)
          return t;
      } else return t;
      if (t = we(t.nextSibling), t === null) break;
    }
    return null;
  }
  function dm(t, e, a) {
    if (e === "") return null;
    for (; t.nodeType !== 3; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !a || (t = we(t.nextSibling), t === null)) return null;
    return t;
  }
  function Ns(t) {
    return t.data === "$!" || t.data === "$?" && t.ownerDocument.readyState === "complete";
  }
  function hm(t, e) {
    var a = t.ownerDocument;
    if (t.data !== "$?" || a.readyState === "complete")
      e();
    else {
      var l = function() {
        e(), a.removeEventListener("DOMContentLoaded", l);
      };
      a.addEventListener("DOMContentLoaded", l), t._reactRetry = l;
    }
  }
  function we(t) {
    for (; t != null; t = t.nextSibling) {
      var e = t.nodeType;
      if (e === 1 || e === 3) break;
      if (e === 8) {
        if (e = t.data, e === "$" || e === "$!" || e === "$?" || e === "F!" || e === "F")
          break;
        if (e === "/$") return null;
      }
    }
    return t;
  }
  var _s = null;
  function _d(t) {
    t = t.previousSibling;
    for (var e = 0; t; ) {
      if (t.nodeType === 8) {
        var a = t.data;
        if (a === "$" || a === "$!" || a === "$?") {
          if (e === 0) return t;
          e--;
        } else a === "/$" && e++;
      }
      t = t.previousSibling;
    }
    return null;
  }
  function Ad(t, e, a) {
    switch (e = ii(a), t) {
      case "html":
        if (t = e.documentElement, !t) throw Error(f(452));
        return t;
      case "head":
        if (t = e.head, !t) throw Error(f(453));
        return t;
      case "body":
        if (t = e.body, !t) throw Error(f(454));
        return t;
      default:
        throw Error(f(451));
    }
  }
  function Gn(t) {
    for (var e = t.attributes; e.length; )
      t.removeAttributeNode(e[0]);
    Oi(t);
  }
  var Oe = /* @__PURE__ */ new Map(), zd = /* @__PURE__ */ new Set();
  function ci(t) {
    return typeof t.getRootNode == "function" ? t.getRootNode() : t.nodeType === 9 ? t : t.ownerDocument;
  }
  var ra = Y.d;
  Y.d = {
    f: vm,
    r: mm,
    D: pm,
    C: gm,
    L: ym,
    m: bm,
    X: Sm,
    S: xm,
    M: jm
  };
  function vm() {
    var t = ra.f(), e = Pu();
    return t || e;
  }
  function mm(t) {
    var e = sl(t);
    e !== null && e.tag === 5 && e.type === "form" ? Kf(e) : ra.r(t);
  }
  var Ll = typeof document > "u" ? null : document;
  function Od(t, e, a) {
    var l = Ll;
    if (l && typeof e == "string" && e) {
      var n = je(e);
      n = 'link[rel="' + t + '"][href="' + n + '"]', typeof a == "string" && (n += '[crossorigin="' + a + '"]'), zd.has(n) || (zd.add(n), t = { rel: t, crossOrigin: a, href: e }, l.querySelector(n) === null && (e = l.createElement("link"), Pt(e, "link", t), Qt(e), l.head.appendChild(e)));
    }
  }
  function pm(t) {
    ra.D(t), Od("dns-prefetch", t, null);
  }
  function gm(t, e) {
    ra.C(t, e), Od("preconnect", t, e);
  }
  function ym(t, e, a) {
    ra.L(t, e, a);
    var l = Ll;
    if (l && t && e) {
      var n = 'link[rel="preload"][as="' + je(e) + '"]';
      e === "image" && a && a.imageSrcSet ? (n += '[imagesrcset="' + je(
        a.imageSrcSet
      ) + '"]', typeof a.imageSizes == "string" && (n += '[imagesizes="' + je(
        a.imageSizes
      ) + '"]')) : n += '[href="' + je(t) + '"]';
      var u = n;
      switch (e) {
        case "style":
          u = Xl(t);
          break;
        case "script":
          u = Ql(t);
      }
      Oe.has(u) || (t = U(
        {
          rel: "preload",
          href: e === "image" && a && a.imageSrcSet ? void 0 : t,
          as: e
        },
        a
      ), Oe.set(u, t), l.querySelector(n) !== null || e === "style" && l.querySelector(kn(u)) || e === "script" && l.querySelector(Ln(u)) || (e = l.createElement("link"), Pt(e, "link", t), Qt(e), l.head.appendChild(e)));
    }
  }
  function bm(t, e) {
    ra.m(t, e);
    var a = Ll;
    if (a && t) {
      var l = e && typeof e.as == "string" ? e.as : "script", n = 'link[rel="modulepreload"][as="' + je(l) + '"][href="' + je(t) + '"]', u = n;
      switch (l) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          u = Ql(t);
      }
      if (!Oe.has(u) && (t = U({ rel: "modulepreload", href: t }, e), Oe.set(u, t), a.querySelector(n) === null)) {
        switch (l) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (a.querySelector(Ln(u)))
              return;
        }
        l = a.createElement("link"), Pt(l, "link", t), Qt(l), a.head.appendChild(l);
      }
    }
  }
  function xm(t, e, a) {
    ra.S(t, e, a);
    var l = Ll;
    if (l && t) {
      var n = rl(l).hoistableStyles, u = Xl(t);
      e = e || "default";
      var i = n.get(u);
      if (!i) {
        var r = { loading: 0, preload: null };
        if (i = l.querySelector(
          kn(u)
        ))
          r.loading = 5;
        else {
          t = U(
            { rel: "stylesheet", href: t, "data-precedence": e },
            a
          ), (a = Oe.get(u)) && As(t, a);
          var d = i = l.createElement("link");
          Qt(d), Pt(d, "link", t), d._p = new Promise(function(b, z) {
            d.onload = b, d.onerror = z;
          }), d.addEventListener("load", function() {
            r.loading |= 1;
          }), d.addEventListener("error", function() {
            r.loading |= 2;
          }), r.loading |= 4, si(i, e, l);
        }
        i = {
          type: "stylesheet",
          instance: i,
          count: 1,
          state: r
        }, n.set(u, i);
      }
    }
  }
  function Sm(t, e) {
    ra.X(t, e);
    var a = Ll;
    if (a && t) {
      var l = rl(a).hoistableScripts, n = Ql(t), u = l.get(n);
      u || (u = a.querySelector(Ln(n)), u || (t = U({ src: t, async: !0 }, e), (e = Oe.get(n)) && zs(t, e), u = a.createElement("script"), Qt(u), Pt(u, "link", t), a.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, l.set(n, u));
    }
  }
  function jm(t, e) {
    ra.M(t, e);
    var a = Ll;
    if (a && t) {
      var l = rl(a).hoistableScripts, n = Ql(t), u = l.get(n);
      u || (u = a.querySelector(Ln(n)), u || (t = U({ src: t, async: !0, type: "module" }, e), (e = Oe.get(n)) && zs(t, e), u = a.createElement("script"), Qt(u), Pt(u, "link", t), a.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, l.set(n, u));
    }
  }
  function Md(t, e, a, l) {
    var n = (n = V.current) ? ci(n) : null;
    if (!n) throw Error(f(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof a.precedence == "string" && typeof a.href == "string" ? (e = Xl(a.href), a = rl(
          n
        ).hoistableStyles, l = a.get(e), l || (l = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, a.set(e, l)), l) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (a.rel === "stylesheet" && typeof a.href == "string" && typeof a.precedence == "string") {
          t = Xl(a.href);
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
          )) && !u._p && (i.instance = u, i.state.loading = 5), Oe.has(t) || (a = {
            rel: "preload",
            as: "style",
            href: a.href,
            crossOrigin: a.crossOrigin,
            integrity: a.integrity,
            media: a.media,
            hrefLang: a.hrefLang,
            referrerPolicy: a.referrerPolicy
          }, Oe.set(t, a), u || Tm(
            n,
            t,
            a,
            i.state
          ))), e && l === null)
            throw Error(f(528, ""));
          return i;
        }
        if (e && l !== null)
          throw Error(f(529, ""));
        return null;
      case "script":
        return e = a.async, a = a.src, typeof a == "string" && e && typeof e != "function" && typeof e != "symbol" ? (e = Ql(a), a = rl(
          n
        ).hoistableScripts, l = a.get(e), l || (l = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, a.set(e, l)), l) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(f(444, t));
    }
  }
  function Xl(t) {
    return 'href="' + je(t) + '"';
  }
  function kn(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function Dd(t) {
    return U({}, t, {
      "data-precedence": t.precedence,
      precedence: null
    });
  }
  function Tm(t, e, a, l) {
    t.querySelector('link[rel="preload"][as="style"][' + e + "]") ? l.loading = 1 : (e = t.createElement("link"), l.preload = e, e.addEventListener("load", function() {
      return l.loading |= 1;
    }), e.addEventListener("error", function() {
      return l.loading |= 2;
    }), Pt(e, "link", a), Qt(e), t.head.appendChild(e));
  }
  function Ql(t) {
    return '[src="' + je(t) + '"]';
  }
  function Ln(t) {
    return "script[async]" + t;
  }
  function Rd(t, e, a) {
    if (e.count++, e.instance === null)
      switch (e.type) {
        case "style":
          var l = t.querySelector(
            'style[data-href~="' + je(a.href) + '"]'
          );
          if (l)
            return e.instance = l, Qt(l), l;
          var n = U({}, a, {
            "data-href": a.href,
            "data-precedence": a.precedence,
            href: null,
            precedence: null
          });
          return l = (t.ownerDocument || t).createElement(
            "style"
          ), Qt(l), Pt(l, "style", n), si(l, a.precedence, t), e.instance = l;
        case "stylesheet":
          n = Xl(a.href);
          var u = t.querySelector(
            kn(n)
          );
          if (u)
            return e.state.loading |= 4, e.instance = u, Qt(u), u;
          l = Dd(a), (n = Oe.get(n)) && As(l, n), u = (t.ownerDocument || t).createElement("link"), Qt(u);
          var i = u;
          return i._p = new Promise(function(r, d) {
            i.onload = r, i.onerror = d;
          }), Pt(u, "link", l), e.state.loading |= 4, si(u, a.precedence, t), e.instance = u;
        case "script":
          return u = Ql(a.src), (n = t.querySelector(
            Ln(u)
          )) ? (e.instance = n, Qt(n), n) : (l = a, (n = Oe.get(u)) && (l = U({}, a), zs(l, n)), t = t.ownerDocument || t, n = t.createElement("script"), Qt(n), Pt(n, "link", l), t.head.appendChild(n), e.instance = n);
        case "void":
          return null;
        default:
          throw Error(f(443, e.type));
      }
    else
      e.type === "stylesheet" && (e.state.loading & 4) === 0 && (l = e.instance, e.state.loading |= 4, si(l, a.precedence, t));
    return e.instance;
  }
  function si(t, e, a) {
    for (var l = a.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), n = l.length ? l[l.length - 1] : null, u = n, i = 0; i < l.length; i++) {
      var r = l[i];
      if (r.dataset.precedence === e) u = r;
      else if (u !== n) break;
    }
    u ? u.parentNode.insertBefore(t, u.nextSibling) : (e = a.nodeType === 9 ? a.head : a, e.insertBefore(t, e.firstChild));
  }
  function As(t, e) {
    t.crossOrigin == null && (t.crossOrigin = e.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy), t.title == null && (t.title = e.title);
  }
  function zs(t, e) {
    t.crossOrigin == null && (t.crossOrigin = e.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy), t.integrity == null && (t.integrity = e.integrity);
  }
  var ri = null;
  function Ud(t, e, a) {
    if (ri === null) {
      var l = /* @__PURE__ */ new Map(), n = ri = /* @__PURE__ */ new Map();
      n.set(a, l);
    } else
      n = ri, l = n.get(a), l || (l = /* @__PURE__ */ new Map(), n.set(a, l));
    if (l.has(t)) return l;
    for (l.set(t, null), a = a.getElementsByTagName(t), n = 0; n < a.length; n++) {
      var u = a[n];
      if (!(u[tn] || u[Ot] || t === "link" && u.getAttribute("rel") === "stylesheet") && u.namespaceURI !== "http://www.w3.org/2000/svg") {
        var i = u.getAttribute(e) || "";
        i = t + i;
        var r = l.get(i);
        r ? r.push(u) : l.set(i, [u]);
      }
    }
    return l;
  }
  function qd(t, e, a) {
    t = t.ownerDocument || t, t.head.insertBefore(
      a,
      e === "title" ? t.querySelector("head > title") : null
    );
  }
  function Em(t, e, a) {
    if (a === 1 || e.itemProp != null) return !1;
    switch (t) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof e.precedence != "string" || typeof e.href != "string" || e.href === "")
          break;
        return !0;
      case "link":
        if (typeof e.rel != "string" || typeof e.href != "string" || e.href === "" || e.onLoad || e.onError)
          break;
        switch (e.rel) {
          case "stylesheet":
            return t = e.disabled, typeof e.precedence == "string" && t == null;
          default:
            return !0;
        }
      case "script":
        if (e.async && typeof e.async != "function" && typeof e.async != "symbol" && !e.onLoad && !e.onError && e.src && typeof e.src == "string")
          return !0;
    }
    return !1;
  }
  function Cd(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  var Xn = null;
  function Nm() {
  }
  function _m(t, e, a) {
    if (Xn === null) throw Error(f(475));
    var l = Xn;
    if (e.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== !1) && (e.state.loading & 4) === 0) {
      if (e.instance === null) {
        var n = Xl(a.href), u = t.querySelector(
          kn(n)
        );
        if (u) {
          t = u._p, t !== null && typeof t == "object" && typeof t.then == "function" && (l.count++, l = fi.bind(l), t.then(l, l)), e.state.loading |= 4, e.instance = u, Qt(u);
          return;
        }
        u = t.ownerDocument || t, a = Dd(a), (n = Oe.get(n)) && As(a, n), u = u.createElement("link"), Qt(u);
        var i = u;
        i._p = new Promise(function(r, d) {
          i.onload = r, i.onerror = d;
        }), Pt(u, "link", a), e.instance = u;
      }
      l.stylesheets === null && (l.stylesheets = /* @__PURE__ */ new Map()), l.stylesheets.set(e, t), (t = e.state.preload) && (e.state.loading & 3) === 0 && (l.count++, e = fi.bind(l), t.addEventListener("load", e), t.addEventListener("error", e));
    }
  }
  function Am() {
    if (Xn === null) throw Error(f(475));
    var t = Xn;
    return t.stylesheets && t.count === 0 && Os(t, t.stylesheets), 0 < t.count ? function(e) {
      var a = setTimeout(function() {
        if (t.stylesheets && Os(t, t.stylesheets), t.unsuspend) {
          var l = t.unsuspend;
          t.unsuspend = null, l();
        }
      }, 6e4);
      return t.unsuspend = e, function() {
        t.unsuspend = null, clearTimeout(a);
      };
    } : null;
  }
  function fi() {
    if (this.count--, this.count === 0) {
      if (this.stylesheets) Os(this, this.stylesheets);
      else if (this.unsuspend) {
        var t = this.unsuspend;
        this.unsuspend = null, t();
      }
    }
  }
  var oi = null;
  function Os(t, e) {
    t.stylesheets = null, t.unsuspend !== null && (t.count++, oi = /* @__PURE__ */ new Map(), e.forEach(zm, t), oi = null, fi.call(t));
  }
  function zm(t, e) {
    if (!(e.state.loading & 4)) {
      var a = oi.get(t);
      if (a) var l = a.get(null);
      else {
        a = /* @__PURE__ */ new Map(), oi.set(t, a);
        for (var n = t.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), u = 0; u < n.length; u++) {
          var i = n[u];
          (i.nodeName === "LINK" || i.getAttribute("media") !== "not all") && (a.set(i.dataset.precedence, i), l = i);
        }
        l && a.set(null, l);
      }
      n = e.instance, i = n.getAttribute("data-precedence"), u = a.get(i) || l, u === l && a.set(null, n), a.set(i, n), this.count++, l = fi.bind(this), n.addEventListener("load", l), n.addEventListener("error", l), u ? u.parentNode.insertBefore(n, u.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(n, t.firstChild)), e.state.loading |= 4;
    }
  }
  var Qn = {
    $$typeof: H,
    Provider: null,
    Consumer: null,
    _currentValue: et,
    _currentValue2: et,
    _threadCount: 0
  };
  function Om(t, e, a, l, n, u, i, r) {
    this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = ul(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = ul(0), this.hiddenUpdates = ul(null), this.identifierPrefix = l, this.onUncaughtError = n, this.onCaughtError = u, this.onRecoverableError = i, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = r, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function wd(t, e, a, l, n, u, i, r, d, b, z, M) {
    return t = new Om(
      t,
      e,
      a,
      i,
      r,
      d,
      b,
      M
    ), e = 1, u === !0 && (e |= 24), u = he(3, null, null, e), t.current = u, u.stateNode = t, e = fc(), e.refCount++, t.pooledCache = e, e.refCount++, u.memoizedState = {
      element: l,
      isDehydrated: a,
      cache: e
    }, vc(u), t;
  }
  function Hd(t) {
    return t ? (t = Sl, t) : Sl;
  }
  function Bd(t, e, a, l, n, u) {
    n = Hd(n), l.context === null ? l.context = n : l.pendingContext = n, l = ga(e), l.payload = { element: a }, u = u === void 0 ? null : u, u !== null && (l.callback = u), a = ya(t, l, e), a !== null && (ye(a, t, e), xn(a, t, e));
  }
  function Yd(t, e) {
    if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
      var a = t.retryLane;
      t.retryLane = a !== 0 && a < e ? a : e;
    }
  }
  function Ms(t, e) {
    Yd(t, e), (t = t.alternate) && Yd(t, e);
  }
  function Gd(t) {
    if (t.tag === 13) {
      var e = xl(t, 67108864);
      e !== null && ye(e, t, 67108864), Ms(t, 67108864);
    }
  }
  var di = !0;
  function Mm(t, e, a, l) {
    var n = A.T;
    A.T = null;
    var u = Y.p;
    try {
      Y.p = 2, Ds(t, e, a, l);
    } finally {
      Y.p = u, A.T = n;
    }
  }
  function Dm(t, e, a, l) {
    var n = A.T;
    A.T = null;
    var u = Y.p;
    try {
      Y.p = 8, Ds(t, e, a, l);
    } finally {
      Y.p = u, A.T = n;
    }
  }
  function Ds(t, e, a, l) {
    if (di) {
      var n = Rs(l);
      if (n === null)
        ys(
          t,
          e,
          l,
          hi,
          a
        ), Ld(t, l);
      else if (Um(
        n,
        t,
        e,
        a,
        l
      ))
        l.stopPropagation();
      else if (Ld(t, l), e & 4 && -1 < Rm.indexOf(t)) {
        for (; n !== null; ) {
          var u = sl(n);
          if (u !== null)
            switch (u.tag) {
              case 3:
                if (u = u.stateNode, u.current.memoizedState.isDehydrated) {
                  var i = ke(u.pendingLanes);
                  if (i !== 0) {
                    var r = u;
                    for (r.pendingLanes |= 2, r.entangledLanes |= 2; i; ) {
                      var d = 1 << 31 - $t(i);
                      r.entanglements[1] |= d, i &= ~d;
                    }
                    Ve(u), (xt & 6) === 0 && (Wu = xe() + 500, Hn(0));
                  }
                }
                break;
              case 13:
                r = xl(u, 2), r !== null && ye(r, u, 2), Pu(), Ms(u, 2);
            }
          if (u = Rs(l), u === null && ys(
            t,
            e,
            l,
            hi,
            a
          ), u === n) break;
          n = u;
        }
        n !== null && l.stopPropagation();
      } else
        ys(
          t,
          e,
          l,
          null,
          a
        );
    }
  }
  function Rs(t) {
    return t = Hi(t), Us(t);
  }
  var hi = null;
  function Us(t) {
    if (hi = null, t = cl(t), t !== null) {
      var e = N(t);
      if (e === null) t = null;
      else {
        var a = e.tag;
        if (a === 13) {
          if (t = R(e), t !== null) return t;
          t = null;
        } else if (a === 3) {
          if (e.stateNode.current.memoizedState.isDehydrated)
            return e.tag === 3 ? e.stateNode.containerInfo : null;
          t = null;
        } else e !== t && (t = null);
      }
    }
    return hi = t, null;
  }
  function kd(t) {
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
        switch (eu()) {
          case ue:
            return 2;
          case au:
            return 8;
          case ll:
          case lu:
            return 32;
          case nu:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var qs = !1, Da = null, Ra = null, Ua = null, Zn = /* @__PURE__ */ new Map(), Vn = /* @__PURE__ */ new Map(), qa = [], Rm = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function Ld(t, e) {
    switch (t) {
      case "focusin":
      case "focusout":
        Da = null;
        break;
      case "dragenter":
      case "dragleave":
        Ra = null;
        break;
      case "mouseover":
      case "mouseout":
        Ua = null;
        break;
      case "pointerover":
      case "pointerout":
        Zn.delete(e.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Vn.delete(e.pointerId);
    }
  }
  function Kn(t, e, a, l, n, u) {
    return t === null || t.nativeEvent !== u ? (t = {
      blockedOn: e,
      domEventName: a,
      eventSystemFlags: l,
      nativeEvent: u,
      targetContainers: [n]
    }, e !== null && (e = sl(e), e !== null && Gd(e)), t) : (t.eventSystemFlags |= l, e = t.targetContainers, n !== null && e.indexOf(n) === -1 && e.push(n), t);
  }
  function Um(t, e, a, l, n) {
    switch (e) {
      case "focusin":
        return Da = Kn(
          Da,
          t,
          e,
          a,
          l,
          n
        ), !0;
      case "dragenter":
        return Ra = Kn(
          Ra,
          t,
          e,
          a,
          l,
          n
        ), !0;
      case "mouseover":
        return Ua = Kn(
          Ua,
          t,
          e,
          a,
          l,
          n
        ), !0;
      case "pointerover":
        var u = n.pointerId;
        return Zn.set(
          u,
          Kn(
            Zn.get(u) || null,
            t,
            e,
            a,
            l,
            n
          )
        ), !0;
      case "gotpointercapture":
        return u = n.pointerId, Vn.set(
          u,
          Kn(
            Vn.get(u) || null,
            t,
            e,
            a,
            l,
            n
          )
        ), !0;
    }
    return !1;
  }
  function Xd(t) {
    var e = cl(t.target);
    if (e !== null) {
      var a = N(e);
      if (a !== null) {
        if (e = a.tag, e === 13) {
          if (e = R(a), e !== null) {
            t.blockedOn = e, bt(t.priority, function() {
              if (a.tag === 13) {
                var l = ge();
                l = il(l);
                var n = xl(a, l);
                n !== null && ye(n, a, l), Ms(a, l);
              }
            });
            return;
          }
        } else if (e === 3 && a.stateNode.current.memoizedState.isDehydrated) {
          t.blockedOn = a.tag === 3 ? a.stateNode.containerInfo : null;
          return;
        }
      }
    }
    t.blockedOn = null;
  }
  function vi(t) {
    if (t.blockedOn !== null) return !1;
    for (var e = t.targetContainers; 0 < e.length; ) {
      var a = Rs(t.nativeEvent);
      if (a === null) {
        a = t.nativeEvent;
        var l = new a.constructor(
          a.type,
          a
        );
        wi = l, a.target.dispatchEvent(l), wi = null;
      } else
        return e = sl(a), e !== null && Gd(e), t.blockedOn = a, !1;
      e.shift();
    }
    return !0;
  }
  function Qd(t, e, a) {
    vi(t) && a.delete(e);
  }
  function qm() {
    qs = !1, Da !== null && vi(Da) && (Da = null), Ra !== null && vi(Ra) && (Ra = null), Ua !== null && vi(Ua) && (Ua = null), Zn.forEach(Qd), Vn.forEach(Qd);
  }
  function mi(t, e) {
    t.blockedOn === e && (t.blockedOn = null, qs || (qs = !0, s.unstable_scheduleCallback(
      s.unstable_NormalPriority,
      qm
    )));
  }
  var pi = null;
  function Zd(t) {
    pi !== t && (pi = t, s.unstable_scheduleCallback(
      s.unstable_NormalPriority,
      function() {
        pi === t && (pi = null);
        for (var e = 0; e < t.length; e += 3) {
          var a = t[e], l = t[e + 1], n = t[e + 2];
          if (typeof l != "function") {
            if (Us(l || a) === null)
              continue;
            break;
          }
          var u = sl(a);
          u !== null && (t.splice(e, 3), e -= 3, Uc(
            u,
            {
              pending: !0,
              data: n,
              method: a.method,
              action: l
            },
            l,
            n
          ));
        }
      }
    ));
  }
  function Jn(t) {
    function e(d) {
      return mi(d, t);
    }
    Da !== null && mi(Da, t), Ra !== null && mi(Ra, t), Ua !== null && mi(Ua, t), Zn.forEach(e), Vn.forEach(e);
    for (var a = 0; a < qa.length; a++) {
      var l = qa[a];
      l.blockedOn === t && (l.blockedOn = null);
    }
    for (; 0 < qa.length && (a = qa[0], a.blockedOn === null); )
      Xd(a), a.blockedOn === null && qa.shift();
    if (a = (t.ownerDocument || t).$$reactFormReplay, a != null)
      for (l = 0; l < a.length; l += 3) {
        var n = a[l], u = a[l + 1], i = n[Xt] || null;
        if (typeof u == "function")
          i || Zd(a);
        else if (i) {
          var r = null;
          if (u && u.hasAttribute("formAction")) {
            if (n = u, i = u[Xt] || null)
              r = i.formAction;
            else if (Us(n) !== null) continue;
          } else r = i.action;
          typeof r == "function" ? a[l + 1] = r : (a.splice(l, 3), l -= 3), Zd(a);
        }
      }
  }
  function Cs(t) {
    this._internalRoot = t;
  }
  gi.prototype.render = Cs.prototype.render = function(t) {
    var e = this._internalRoot;
    if (e === null) throw Error(f(409));
    var a = e.current, l = ge();
    Bd(a, l, t, e, null, null);
  }, gi.prototype.unmount = Cs.prototype.unmount = function() {
    var t = this._internalRoot;
    if (t !== null) {
      this._internalRoot = null;
      var e = t.containerInfo;
      Bd(t.current, 2, null, t, null, null), Pu(), e[Ue] = null;
    }
  };
  function gi(t) {
    this._internalRoot = t;
  }
  gi.prototype.unstable_scheduleHydration = function(t) {
    if (t) {
      var e = ct();
      t = { blockedOn: null, target: t, priority: e };
      for (var a = 0; a < qa.length && e !== 0 && e < qa[a].priority; a++) ;
      qa.splice(a, 0, t), a === 0 && Xd(t);
    }
  };
  var Vd = o.version;
  if (Vd !== "19.1.0")
    throw Error(
      f(
        527,
        Vd,
        "19.1.0"
      )
    );
  Y.findDOMNode = function(t) {
    var e = t._reactInternals;
    if (e === void 0)
      throw typeof t.render == "function" ? Error(f(188)) : (t = Object.keys(t).join(","), Error(f(268, t)));
    return t = E(e), t = t !== null ? x(t) : null, t = t === null ? null : t.stateNode, t;
  };
  var Cm = {
    bundleType: 0,
    version: "19.1.0",
    rendererPackageName: "react-dom",
    currentDispatcherRef: A,
    reconcilerVersion: "19.1.0"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var yi = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!yi.isDisabled && yi.supportsFiber)
      try {
        Je = yi.inject(
          Cm
        ), It = yi;
      } catch {
      }
  }
  return Wn.createRoot = function(t, e) {
    if (!g(t)) throw Error(f(299));
    var a = !1, l = "", n = co, u = so, i = ro, r = null;
    return e != null && (e.unstable_strictMode === !0 && (a = !0), e.identifierPrefix !== void 0 && (l = e.identifierPrefix), e.onUncaughtError !== void 0 && (n = e.onUncaughtError), e.onCaughtError !== void 0 && (u = e.onCaughtError), e.onRecoverableError !== void 0 && (i = e.onRecoverableError), e.unstable_transitionCallbacks !== void 0 && (r = e.unstable_transitionCallbacks)), e = wd(
      t,
      1,
      !1,
      null,
      null,
      a,
      l,
      n,
      u,
      i,
      r,
      null
    ), t[Ue] = e.current, gs(t), new Cs(e);
  }, Wn.hydrateRoot = function(t, e, a) {
    if (!g(t)) throw Error(f(299));
    var l = !1, n = "", u = co, i = so, r = ro, d = null, b = null;
    return a != null && (a.unstable_strictMode === !0 && (l = !0), a.identifierPrefix !== void 0 && (n = a.identifierPrefix), a.onUncaughtError !== void 0 && (u = a.onUncaughtError), a.onCaughtError !== void 0 && (i = a.onCaughtError), a.onRecoverableError !== void 0 && (r = a.onRecoverableError), a.unstable_transitionCallbacks !== void 0 && (d = a.unstable_transitionCallbacks), a.formState !== void 0 && (b = a.formState)), e = wd(
      t,
      1,
      !0,
      e,
      a ?? null,
      l,
      n,
      u,
      i,
      r,
      d,
      b
    ), e.context = Hd(null), a = e.current, l = ge(), l = il(l), n = ga(l), n.callback = null, ya(a, n, l), a = l, e.current.lanes = a, ha(e, a), Ve(e), t[Ue] = e.current, gs(t), new gi(e);
  }, Wn.version = "19.1.0", Wn;
}
var ah;
function Qm() {
  if (ah) return Hs.exports;
  ah = 1;
  function s() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s);
      } catch (o) {
        console.error(o);
      }
  }
  return s(), Hs.exports = Xm(), Hs.exports;
}
var Zm = Qm();
const Vm = '.ahv{--ahv-bg: var(--activity-bg, var(--background, #ffffff));--ahv-fg: var(--activity-fg, var(--foreground, #16181d));--ahv-muted: var(--activity-muted, var(--muted-foreground, #6b7080));--ahv-subtle: var(--activity-subtle, var(--muted, #f3f4f7));--ahv-line: var(--activity-line, var(--border, #e3e5ea));--ahv-main: var(--activity-main, var(--primary, #16181d));--ahv-main-fg: var(--activity-main-fg, var(--primary-foreground, #ffffff));--ahv-radius: var(--activity-radius, var(--radius, .625rem));--ahv-mono-font: var(--activity-mono-font, var(--font-mono, ui-monospace, "SF Mono", Menlo, Consolas, monospace));--ahv-bad: var(--activity-bad, #d92d20);--ahv-warn: var(--activity-warn, #b54708);--ahv-ok: var(--activity-ok, #067647);--ahv-attention: var(--activity-attention, #3e63dd);color:var(--ahv-fg);font-size:13px;line-height:1.45}.dark .ahv,[data-theme=dark] .ahv,.ahv-dark-host .ahv,.ahv.ahv-dark-host{--ahv-bad: var(--activity-bad, #f97066);--ahv-warn: var(--activity-warn, #fdb022);--ahv-ok: var(--activity-ok, #47cd89);--ahv-attention: var(--activity-attention, #8da4ef)}.ahv *,.ahv *:before,.ahv *:after{box-sizing:border-box}.ahv button{font:inherit}.ahv h2,.ahv h3,.ahv p{margin:0}.ahv-dim{color:var(--ahv-muted)}.ahv-strong{font-weight:600}.ahv-small{font-size:12px}.ahv-mono{font-family:var(--ahv-mono-font);font-size:12px}.ahv-num{font-variant-numeric:tabular-nums}.ahv-clip{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:100%}.ahv-bad{color:var(--ahv-bad)}.ahv-warn{color:var(--ahv-warn)}.ahv-log{display:flex;flex-direction:column;min-width:0;background:var(--ahv-bg);border:1px solid var(--ahv-line);border-radius:calc(var(--ahv-radius) * 1.4);overflow:hidden}.ahv-head{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px 16px;padding:16px 20px;border-bottom:1px solid var(--ahv-line)}.ahv-title{display:flex;align-items:center;gap:8px;font-size:16px;font-weight:600;text-wrap:balance}.ahv-head p{margin-top:2px;font-size:13px}.ahv-actions{display:flex;flex-wrap:wrap;align-items:center;gap:8px}.ahv-status{display:flex;flex-wrap:wrap;align-items:center;gap:6px 18px;padding:9px 20px;font-size:12.5px;color:var(--ahv-muted);border-bottom:1px solid var(--ahv-line)}.ahv-status strong{color:var(--ahv-fg);font-weight:500}.ahv-status .ahv-bad,.ahv-status strong.ahv-bad{color:var(--ahv-bad)}.ahv-status .ahv-warn{color:var(--ahv-warn)}.ahv-ok,.ahv-status strong.ahv-ok{color:var(--ahv-ok)}.ahv-status-wrap{border-bottom:1px solid var(--ahv-line)}.ahv-status-wrap .ahv-status{border-bottom:0}.ahv-checks{display:grid;gap:10px;padding:4px 20px 14px}.ahv-checks .ahv-bar{align-items:flex-end}.ahv-checks .ahv-field{width:170px}.ahv-hidden{display:none}.ahv-disabled{opacity:.55;pointer-events:none}label.ahv-button{cursor:pointer}.ahv-streams{display:grid;gap:12px;padding:12px 20px 16px;border-bottom:1px solid var(--ahv-line)}.ahv-streams .ahv-bar>p{margin:0;flex:1 1 320px;max-width:70ch}.ahv-stream-list{margin:0;padding:0;list-style:none;display:grid;border:1px solid var(--ahv-line);border-radius:var(--ahv-radius)}.ahv-stream-list li{display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,1fr) 230px 250px;align-items:center;gap:6px 16px;padding:10px 14px}.ahv-stream-list li+li{border-top:1px solid var(--ahv-line)}.ahv-stream-list li>.ahv-bad{grid-column:1 / -1}.ahv-stream-main{display:flex;flex-wrap:wrap;align-items:center;gap:4px 8px;min-width:0}.ahv-stream-where{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.ahv-stream-tools{display:flex;align-items:center;gap:6px;justify-self:end}.ahv-stream-form{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px 16px;max-width:760px}.ahv-stream-form .ahv-segment{justify-self:start}.ahv-textarea{height:auto;padding:8px 10px;resize:vertical}@media(max-width:720px){.ahv-stream-list li{grid-template-columns:minmax(0,1fr)}.ahv-stream-tools{justify-self:start;flex-wrap:wrap}.ahv-stream-form{grid-template-columns:minmax(0,1fr)}.ahv-stream-form .ahv-field-wide{grid-column:auto}}.ahv-verdict{display:grid;gap:6px;padding:10px 12px;font-size:12.5px;border-radius:var(--ahv-radius);border:1px solid}.ahv-verdict ul{margin:0;padding-left:18px;display:grid;gap:2px}.ahv-verdict-ok{color:var(--ahv-ok);border-color:color-mix(in srgb,var(--ahv-ok) 35%,transparent);background:color-mix(in srgb,var(--ahv-ok) 6%,transparent)}.ahv-verdict-bad{color:var(--ahv-bad);border-color:color-mix(in srgb,var(--ahv-bad) 35%,transparent);background:color-mix(in srgb,var(--ahv-bad) 6%,transparent)}.ahv-seal{display:inline-flex;vertical-align:-2px;margin-left:4px;color:var(--ahv-ok)}.ahv-seal-waiting{color:var(--ahv-muted)}.ahv-button{display:inline-flex;align-items:center;gap:6px;height:32px;padding:0 12px;cursor:pointer;color:var(--ahv-fg);background:var(--ahv-bg);border:1px solid var(--ahv-line);border-radius:var(--ahv-radius);font-size:13px;font-weight:500;white-space:nowrap;transition:background-color .15s,border-color .15s}.ahv-button:hover:not(:disabled){background:var(--ahv-subtle)}.ahv-button:disabled{opacity:.55;cursor:default}.ahv-button-quiet{border-color:transparent;background:transparent;color:var(--ahv-muted)}.ahv-button-quiet:hover:not(:disabled){color:var(--ahv-fg)}.ahv-button-main{background:var(--ahv-main);color:var(--ahv-main-fg);border-color:var(--ahv-main);padding:0 16px}.ahv-button-main:hover:not(:disabled){background:var(--ahv-main);opacity:.9}.ahv-button-live{color:var(--ahv-ok);border-color:color-mix(in srgb,var(--ahv-ok) 45%,transparent)}.ahv-icon-button{display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;padding:0;cursor:pointer;background:transparent;border:0;border-radius:var(--ahv-radius);color:var(--ahv-muted)}.ahv-icon-button:hover{background:var(--ahv-subtle);color:var(--ahv-fg)}.ahv :focus-visible{outline:2px solid var(--ahv-attention);outline-offset:1px}.ahv-input{width:100%;min-width:0;height:34px;padding:0 10px;font:inherit;font-size:13px;color:var(--ahv-fg);background:var(--ahv-bg);border:1px solid var(--ahv-line);border-radius:var(--ahv-radius)}.ahv-input[aria-invalid]{border-color:var(--ahv-bad)}.ahv-input::placeholder{color:var(--ahv-muted)}.ahv-input-icon{position:relative;display:block}.ahv-input-icon>svg{position:absolute;left:10px;top:50%;transform:translateY(-50%);color:var(--ahv-muted);pointer-events:none}.ahv-input-icon>.ahv-input{padding-left:30px}.ahv-pair{display:flex;gap:6px}.ahv-segment{display:inline-flex;padding:2px;gap:2px;background:var(--ahv-subtle);border-radius:var(--ahv-radius)}.ahv-segment button{height:28px;padding:0 12px;border:0;border-radius:calc(var(--ahv-radius) * .8);background:transparent;cursor:pointer;color:var(--ahv-muted);font-size:12.5px;font-weight:500}.ahv-segment button[aria-pressed=true]{background:var(--ahv-bg);color:var(--ahv-fg);box-shadow:0 1px 2px #00000014}.ahv-chips{display:flex;flex-wrap:wrap;gap:6px}.ahv-chip{height:28px;padding:0 11px;cursor:pointer;font-size:12.5px;color:var(--ahv-muted);background:transparent;border:1px solid var(--ahv-line);border-radius:999px}.ahv-chip[aria-pressed=true]{color:var(--ahv-fg);border-color:var(--ahv-fg);font-weight:500}.ahv-menu{position:relative}.ahv-menu-list{position:absolute;right:0;top:calc(100% + 4px);z-index:20;min-width:220px;padding:4px;display:grid;background:var(--ahv-bg);border:1px solid var(--ahv-line);border-radius:var(--ahv-radius);box-shadow:0 8px 24px #0000001f}.ahv-menu-list>button{color:inherit;text-align:left;padding:8px 10px;border:0;background:transparent;border-radius:calc(var(--ahv-radius) * .8);cursor:pointer}.ahv-menu-list>button:hover{background:var(--ahv-subtle)}.ahv-filters{display:grid;gap:14px;padding:14px 20px;border-bottom:1px solid var(--ahv-line);background:color-mix(in srgb,var(--ahv-subtle) 35%,var(--ahv-bg))}.ahv-bar{display:flex;flex-wrap:wrap;align-items:center;gap:8px 12px}.ahv-bar-end{gap:8px}.ahv-push{flex:1}.ahv-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:12px}.ahv-more{padding:12px;border:1px dashed var(--ahv-line);border-radius:var(--ahv-radius)}.ahv-field{display:grid;gap:5px;align-content:start;min-width:0}.ahv-field-wide{grid-column:span 2}.ahv-field>span:first-child{font-size:12px;font-weight:500;color:var(--ahv-muted)}.ahv-field em{font-style:normal;font-size:12px}.ahv-applied{display:flex;flex-wrap:wrap;align-items:center;gap:6px;padding-top:12px;border-top:1px dashed var(--ahv-line)}.ahv-pill{display:inline-flex;align-items:center;gap:4px;height:26px;padding:0 2px 0 9px;font-size:12.5px;background:var(--ahv-bg);border:1px solid var(--ahv-line);border-radius:var(--ahv-radius)}.ahv-pill button{display:inline-flex;padding:3px;border:0;background:transparent;border-radius:4px;cursor:pointer;color:var(--ahv-muted)}.ahv-pill button:hover{background:var(--ahv-subtle);color:var(--ahv-fg)}.ahv-searchbar{display:flex;flex-wrap:wrap;gap:8px;align-items:flex-start}.ahv-search{position:relative;flex:1 1 360px;min-width:0}.ahv-range{width:auto;flex:0 0 auto}.ahv-searchbar .ahv-pair{flex:0 1 300px}.ahv-suggest{position:absolute;left:0;right:0;top:calc(100% + 4px);z-index:30;margin:0;padding:4px;list-style:none;max-height:300px;overflow:auto;background:var(--ahv-bg);border:1px solid var(--ahv-line);border-radius:var(--ahv-radius);box-shadow:0 8px 24px #0000001f}.ahv-suggest li{display:flex;justify-content:space-between;gap:12px;padding:6px 9px;border-radius:calc(var(--ahv-radius) * .8);cursor:pointer}.ahv-suggest li .ahv-dim{font-size:12px;text-align:right}.ahv-suggest-on{background:var(--ahv-subtle)}.ahv-add{gap:4px 6px}.ahv-link-button{padding:2px 8px;font-size:12.5px;color:var(--ahv-muted);background:transparent;border:1px dashed var(--ahv-line);border-radius:999px;cursor:pointer}.ahv-link-button:hover{color:var(--ahv-fg);border-style:solid}.ahv-push-right{margin-left:auto}.ahv-pill-not{border-style:dashed}.ahv-cell{white-space:nowrap}.ahv-check{display:flex;align-items:center;gap:8px;padding:5px 4px;font-size:13px;cursor:pointer}.ahv-menu-panel{min-width:280px;padding:10px;gap:4px}.ahv-views{margin:0 0 6px;padding:0;list-style:none;display:grid;gap:2px;max-height:300px;overflow:auto}.ahv-views li{display:flex;align-items:center;gap:4px;border-radius:calc(var(--ahv-radius) * .8)}.ahv-views li:hover,.ahv-views-on{background:var(--ahv-subtle)}.ahv-views-open{flex:1;display:grid;gap:1px;padding:6px 8px;text-align:left;color:inherit;background:transparent;border:0;cursor:pointer;min-width:0}.ahv-views-tools{display:flex}.ahv-views-save{display:grid;gap:6px;padding-top:8px;border-top:1px solid var(--ahv-line)}.ahv-chart{padding:14px 20px 10px;border-bottom:1px solid var(--ahv-line)}.ahv-chart-head{display:flex;flex-wrap:wrap;justify-content:space-between;gap:4px 16px;margin-bottom:10px;font-size:12.5px}.ahv-chart-head strong{font-size:14px}.ahv-chart-plot{position:relative;height:96px;border-bottom:1px solid var(--ahv-line)}.ahv-chart-svg{display:block;width:100%;height:100%}.ahv-bar{fill:var(--ahv-main);fill-opacity:.55}.ahv-bar-on{fill-opacity:1}.ahv-chart-max{position:absolute;left:0;top:-2px;font-size:10.5px;color:var(--ahv-muted)}.ahv-chart-empty{position:absolute;top:0;right:0;bottom:0;left:0;display:grid;place-items:center;color:var(--ahv-muted);font-size:12.5px}.ahv-chart-axis{position:relative;height:30px}.ahv-chart-axis span{position:absolute;top:4px;transform:translate(-50%);display:grid;justify-items:center;font-size:10.5px;color:var(--ahv-muted);font-variant-numeric:tabular-nums;white-space:nowrap}.ahv-chart-axis b{font-weight:600}.ahv-tip{position:absolute;top:-6px;transform:translate(-50%,-100%);z-index:5;display:grid;gap:1px;padding:6px 9px;pointer-events:none;font-size:12px;white-space:nowrap;background:var(--ahv-bg);border:1px solid var(--ahv-line);border-radius:var(--ahv-radius);box-shadow:0 6px 18px #0000001f}.ahv-tip span{color:var(--ahv-muted)}.ahv-table-wrap{max-height:min(70vh,52rem);overflow:auto}.ahv-table{width:100%;border-collapse:collapse}.ahv-table thead th{position:sticky;top:0;z-index:2;padding:9px 14px;text-align:left;font-size:12px;font-weight:500;color:var(--ahv-muted);background:var(--ahv-bg);box-shadow:inset 0 -1px 0 var(--ahv-line);white-space:nowrap}.ahv-table td{padding:10px 14px;vertical-align:middle;border-bottom:1px solid color-mix(in srgb,var(--ahv-line) 70%,transparent)}.ahv-table th:first-child,.ahv-table td:first-child{padding-left:20px;width:1%}.ahv-table th:last-child,.ahv-table td:last-child{padding-right:20px;width:1%}.ahv-table td:nth-child(2){width:22%;max-width:260px}.ahv-day td{padding:6px 20px;font-size:11px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:var(--ahv-muted);background:color-mix(in srgb,var(--ahv-subtle) 60%,var(--ahv-bg))}.ahv-row{cursor:pointer}.ahv-row:hover td{background:color-mix(in srgb,var(--ahv-subtle) 55%,transparent)}.ahv-row-problem td:first-child{box-shadow:inset 3px 0 0 var(--ahv-bad)}.ahv-when{display:grid;white-space:nowrap;line-height:1.3}.ahv-when .ahv-dim{font-size:11.5px}.ahv-who{display:flex;align-items:center;gap:10px;min-width:0}.ahv-avatar{flex:none;display:grid;place-items:center;width:28px;height:28px;border-radius:999px;font-size:10.5px;font-weight:600;color:var(--ahv-muted);background:var(--ahv-subtle)}.ahv-avatar-system{border-radius:8px}.ahv-stack{display:grid;min-width:0;line-height:1.3}.ahv-stack .ahv-dim{font-size:11.5px}.ahv-link{display:block;max-width:100%;padding:0;color:inherit;border:0;background:none;text-align:left;cursor:pointer}.ahv-link:hover{text-decoration:underline;text-underline-offset:2px}.ahv-what{display:flex;align-items:center;gap:8px;min-width:0}.ahv-sentence{min-width:0;overflow-wrap:anywhere}.ahv-mark{flex:none;width:7px;height:7px;border-radius:999px;background:var(--ahv-attention)}.ahv-what>svg{flex:none}.ahv-count{flex:none;display:inline-flex;align-items:center;gap:3px;padding:1px 6px;font-size:11px;color:var(--ahv-muted);border:1px solid var(--ahv-line);border-radius:999px;font-variant-numeric:tabular-nums}.ahv-count-bad{color:var(--ahv-main-fg);background:var(--ahv-bad);border-color:var(--ahv-bad)}.ahv-where{display:flex;align-items:center;gap:6px;white-space:nowrap}.ahv-tag{display:inline-flex;align-items:center;height:20px;padding:0 7px;font-size:11px;font-weight:500;white-space:nowrap;color:var(--ahv-muted);background:var(--ahv-subtle);border-radius:6px;text-transform:none}.ahv-tag-bad{color:var(--ahv-bad);background:color-mix(in srgb,var(--ahv-bad) 12%,transparent)}.ahv-tag-warn{color:var(--ahv-warn);background:color-mix(in srgb,var(--ahv-warn) 12%,transparent)}.ahv-tag-ok{color:var(--ahv-ok);background:color-mix(in srgb,var(--ahv-ok) 12%,transparent)}.ahv-tag-accent{color:var(--ahv-attention);background:color-mix(in srgb,var(--ahv-attention) 12%,transparent)}.ahv-method-get{color:var(--ahv-attention)}.ahv-method-post{color:var(--ahv-ok)}.ahv-method-put,.ahv-method-patch{color:var(--ahv-warn)}.ahv-method-delete{color:var(--ahv-bad)}.ahv-foot{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:8px;padding:10px 20px;font-size:12.5px}.ahv-empty{display:grid;justify-items:center;gap:6px;padding:48px 20px;text-align:center;color:var(--ahv-muted)}.ahv-empty strong{color:var(--ahv-fg);font-size:14px}.ahv-message{display:flex;align-items:center;justify-content:space-between;gap:12px;margin:12px 20px;padding:9px 12px;font-size:12.5px;border:1px solid var(--ahv-line);border-radius:var(--ahv-radius);background:var(--ahv-subtle)}.ahv-message-bad{color:var(--ahv-bad);border-color:color-mix(in srgb,var(--ahv-bad) 35%,transparent);background:color-mix(in srgb,var(--ahv-bad) 6%,transparent)}.ahv-timeline .ahv-message{margin:0}.ahv-skeleton{display:grid;gap:8px;padding:16px 20px}.ahv-timeline .ahv-skeleton{padding:0}.ahv-skeleton span{height:38px;border-radius:var(--ahv-radius);background:var(--ahv-subtle);animation:ahv-fade 1.4s ease-in-out infinite}.ahv-drawer-layer{position:fixed;top:0;right:0;bottom:0;left:0;z-index:60;display:flex;justify-content:flex-end}.ahv-backdrop{position:absolute;top:0;right:0;bottom:0;left:0;background:#00000052;animation:ahv-fade-in .15s ease-out}.ahv-drawer{position:relative;width:min(680px,100%);height:100%;overflow-y:auto;background:var(--ahv-bg);color:var(--ahv-fg);border-left:1px solid var(--ahv-line);box-shadow:-12px 0 32px #00000024;animation:ahv-slide-in .18s ease-out}.ahv-drawer-close{position:absolute;top:14px;right:14px}.ahv-drawer-body{display:grid;gap:22px;padding:22px 24px 32px}.ahv-drawer-head{display:grid;gap:8px;padding-right:36px;padding-bottom:18px;border-bottom:1px solid var(--ahv-line)}.ahv-drawer-head h2{font-size:17px;font-weight:600;line-height:1.35;text-wrap:balance;overflow-wrap:anywhere}.ahv-drawer-head .ahv-actions{margin-top:4px}.ahv-tags{display:flex;flex-wrap:wrap;gap:6px}.ahv-section{display:grid;gap:8px}.ahv-section h3{font-size:11px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;color:var(--ahv-muted)}.ahv-facts{display:grid;grid-template-columns:minmax(110px,auto) 1fr;gap:6px 16px;margin:0;font-size:12.5px}.ahv-facts>div{display:contents}.ahv-facts dt{color:var(--ahv-muted)}.ahv-facts dd{margin:0;min-width:0;overflow-wrap:anywhere}.ahv-scroll-x{overflow-x:auto;border:1px solid var(--ahv-line);border-radius:var(--ahv-radius)}.ahv-changes{width:100%;border-collapse:collapse;font-size:12.5px}.ahv-changes th{padding:7px 12px;text-align:left;font-weight:500;color:var(--ahv-muted);background:var(--ahv-subtle)}.ahv-changes td{padding:7px 12px;border-top:1px solid var(--ahv-line);overflow-wrap:anywhere}.ahv-before{color:var(--ahv-bad)}.ahv-after{color:var(--ahv-ok)}.ahv-list{margin:0;padding:0;list-style:none;border:1px solid var(--ahv-line);border-radius:var(--ahv-radius);overflow:hidden}.ahv-list li+li{border-top:1px solid var(--ahv-line)}.ahv-list button{display:flex;align-items:center;gap:10px;width:100%;padding:8px 12px;text-align:left;border:0;background:transparent;cursor:pointer;color:inherit}.ahv-list button:hover:not(:disabled){background:var(--ahv-subtle)}.ahv-list button:disabled{cursor:default;background:var(--ahv-subtle)}.ahv-row-between{display:flex;align-items:center;justify-content:space-between;gap:8px}.ahv-disclose{display:inline-flex;align-items:center;gap:4px;padding:0;border:0;background:none;cursor:pointer;font-size:11px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;color:var(--ahv-muted)}.ahv-pre{margin:0;max-height:380px;overflow:auto;padding:12px;font-family:var(--ahv-mono-font);font-size:12px;background:var(--ahv-subtle);border:1px solid var(--ahv-line);border-radius:var(--ahv-radius);white-space:pre-wrap;overflow-wrap:anywhere}.ahv-timeline{display:grid;gap:10px}.ahv-steps{position:relative;margin:0;padding:0;list-style:none;display:grid;gap:4px}.ahv-step{position:relative;padding-left:22px}.ahv-step:before{content:"";position:absolute;left:5px;top:18px;bottom:-8px;width:1px;background:var(--ahv-line)}.ahv-step:last-child:before{display:none}.ahv-step-dot{position:absolute;left:0;top:13px;width:11px;height:11px;border-radius:999px;background:var(--ahv-bg);border:2px solid var(--ahv-muted)}.ahv-step-accent .ahv-step-dot{border-color:var(--ahv-attention);background:var(--ahv-attention)}.ahv-step-warn .ahv-step-dot{border-color:var(--ahv-warn);background:var(--ahv-warn)}.ahv-step-bad .ahv-step-dot{border-color:var(--ahv-bad);background:var(--ahv-bad)}.ahv-step-body{display:grid;gap:2px;width:100%;padding:8px 10px;text-align:left;border:0;background:transparent;cursor:pointer;border-radius:var(--ahv-radius);color:inherit}.ahv-step-body:hover{background:var(--ahv-subtle)}.ahv-step-top{display:flex;flex-wrap:wrap;justify-content:space-between;gap:2px 12px}.ahv-step-top .ahv-dim{font-size:11.5px}.ahv-turned{transform:rotate(180deg)}.ahv-spin{animation:ahv-spin 1s linear infinite}.ahv-pulse{animation:ahv-fade 1.6s ease-in-out infinite}@keyframes ahv-spin{to{transform:rotate(360deg)}}@keyframes ahv-fade{50%{opacity:.45}}@keyframes ahv-fade-in{0%{opacity:0}}@keyframes ahv-slide-in{0%{transform:translate(24px);opacity:0}}@media(prefers-reduced-motion:reduce){.ahv *,.ahv-drawer-layer *{animation:none!important;transition:none!important}}@media(max-width:720px){.ahv-head,.ahv-filters,.ahv-chart,.ahv-foot{padding-left:16px;padding-right:16px}.ahv-field-wide{grid-column:span 1}.ahv-table thead{display:none}.ahv-table,.ahv-table tbody,.ahv-table tr,.ahv-table td{display:block;width:auto!important;max-width:none!important}.ahv-table td{border:0;padding:2px 16px!important}.ahv-row{padding:10px 0;border-bottom:1px solid var(--ahv-line)}.ahv-day td{padding:6px 16px!important}}';
var X = tr();
const fa = (s) => "action" in s, Km = {
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
function At({ name: s, size: o = 16, ...m }) {
  return /* @__PURE__ */ c.jsx(
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
      children: /* @__PURE__ */ c.jsx("path", { d: Km[s] })
    }
  );
}
function Me(s, o, m) {
  const [f, g] = X.useState({ loading: s !== null }), N = X.useRef(0), R = X.useRef(o);
  R.current = o;
  const w = X.useCallback(() => {
    if (s === null) return;
    const x = ++N.current;
    g((U) => ({ ...U, loading: !0 })), R.current().then(
      (U) => x === N.current && g({ data: U, loading: !1 }),
      (U) => x === N.current && g((B) => ({ data: B.data, error: U, loading: !1 }))
    );
  }, [s]);
  X.useEffect(() => {
    g({ loading: s !== null }), w();
  }, [s, w]);
  const E = !!f.error;
  return X.useEffect(() => {
    if (!m || s === null || E) return;
    const x = setInterval(w, m);
    return () => clearInterval(x);
  }, [m, s, E, w]), { ...f, refresh: w };
}
const Qs = 20;
function Jm(s, o, m, f, g) {
  var _;
  const N = o && JSON.stringify(o), [R, w] = X.useState([]), [E, x] = X.useState(!1), [U, B] = X.useState({ loading: !1 }), q = X.useRef(N);
  q.current = N;
  const G = Me(
    N,
    () => s("search", { method: "POST", body: { ...o, limit: m } }),
    f ? g : void 0
  ), K = X.useRef(0);
  X.useEffect(() => {
    G.data && (K.current += 1, w([G.data]), x(!1), B({ loading: !1 }));
  }, [G.data]), X.useEffect(() => {
    w([]), B({ loading: !1 });
  }, [N]);
  const L = ((_ = R[R.length - 1]) == null ? void 0 : _.next_cursor) ?? null, I = X.useCallback(() => {
    if (!L || U.loading || !o) return;
    B({ loading: !0 });
    const H = N, F = K.current;
    s("search", { method: "POST", body: { ...o, limit: m, cursor: L } }).then(
      ($) => {
        q.current !== H || K.current !== F || (w((it) => [...it, $].slice(-Qs)), R.length >= Qs && x(!0), B({ loading: !1 }));
      },
      ($) => q.current === H && K.current === F && B({ loading: !1, error: $ })
    );
  }, [L, U.loading, o, N, s, m, R.length]);
  return {
    rows: R.flatMap((H) => H.items),
    trimmed: E,
    hasMore: !!L && !f,
    loading: G.loading && !R.length,
    refreshing: G.loading,
    error: G.error,
    more: U,
    loadMore: I,
    refresh: G.refresh,
    pageCount: R.length
  };
}
const He = (s) => Date.parse(`${s.slice(0, 23).replace(" ", "T")}Z`), oe = (s) => s.replace(/[._]+/g, " ").trim(), In = (s) => s.charAt(0).toUpperCase() + s.slice(1), gh = 864e5, $m = [[60, "second"], [60, "minute"], [24, "hour"], [7, "day"]], Wm = new Intl.RelativeTimeFormat(void 0, { numeric: "auto", style: "short" });
function er(s, o = Date.now()) {
  let m = (He(s) - o) / 1e3;
  for (const [f, g] of $m) {
    if (Math.abs(m) < f) return Wm.format(Math.round(m), g);
    m /= f;
  }
  return "";
}
const Ti = (s, o) => new Date(s).toLocaleString(void 0, { ...o, timeZone: "UTC" }), $l = (s) => Ti(s, { day: "numeric", month: "short", year: "numeric" }), Vl = (s) => Ti(s, { day: "numeric", month: "short" }), Zs = (s) => Ti(s, { hour: "2-digit", minute: "2-digit", hour12: !1 });
function Fm(s, o = Date.now()) {
  const m = s.slice(0, 10);
  return m === new Date(o).toISOString().slice(0, 10) ? "Today" : m === new Date(o - gh).toISOString().slice(0, 10) ? "Yesterday" : Ti(He(`${m} 00:00:00`), { weekday: "short", day: "numeric", month: "short", year: "numeric" });
}
const Ei = (s) => s.slice(11, 23);
function Pm(s) {
  var m, f;
  if (/^[\d#]/.test(s)) return "#";
  const o = s.split(/[\s@._-]+/).filter(Boolean);
  return ((((m = o[0]) == null ? void 0 : m[0]) ?? "?") + (((f = o[1]) == null ? void 0 : f[0]) ?? "")).toUpperCase();
}
const Im = (s) => s.actor_name || (s.actor_type === "system" ? In(oe(s.actor_id)) || "System" : s.actor_id || "Anonymous"), Vs = (s) => /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(Date.parse(`${s}T00:00:00Z`)), Ks = (s) => `${s} 00:00:00`, t0 = (s) => `${new Date(Date.parse(`${s}T00:00:00Z`) + gh).toISOString().slice(0, 10)} 00:00:00`, e0 = (s, o = Date.now()) => new Date(o - s * 6e4).toISOString().slice(0, 19).replace("T", " "), a0 = (s, o, m = `${o}s`) => `${s.toLocaleString()} ${s === 1 ? o : m}`, bi = 1e5, l0 = [
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
], n0 = [
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
async function u0(s, o, m) {
  const f = [];
  let g = null;
  do {
    const N = await s("export", { method: "POST", body: { ...o, cursor: g } });
    f.push(...N.items), m(f.length), g = N.next_cursor;
  } while (g && f.length < bi);
  return { rows: f.slice(0, bi), more: !!g || f.length > bi };
}
function i0(s) {
  let o = s == null ? "" : typeof s == "object" ? JSON.stringify(s) : String(s);
  return /^[=+\-@\t\r]/.test(o) && (o = `'${o}`), /[",\n\r]/.test(o) ? `"${o.replace(/"/g, '""')}"` : o;
}
function c0(s, o) {
  const m = s === "events" ? l0 : n0;
  return `\uFEFF${[m.join(","), ...o.map((g) => m.map((N) => i0(g[N])).join(","))].join(`\r
`)}\r
`;
}
const s0 = (s) => s.map((o) => {
  const { children: m, ...f } = o;
  return JSON.stringify(f);
}).join(`
`) + `
`;
function Js(s, o, m) {
  const f = URL.createObjectURL(new Blob([s], { type: m })), g = document.createElement("a");
  g.href = f, g.download = o, g.click(), setTimeout(() => URL.revokeObjectURL(f), 1e3);
}
const r0 = /(-?)(?:([a-z_]+):)?("([^"]*)"?|\S+)/g;
function Fn(s) {
  const o = [];
  for (const m of s.matchAll(r0)) {
    let f = m[3].startsWith('"') ? m[4] ?? "" : m[3], g = m[2] ?? null;
    g && f.startsWith("//") && (f = `${g}:${f}`, g = null), f && o.push({ field: g, value: f, negated: m[1] === "-", text: m[0] });
  }
  return o;
}
const f0 = (s, o) => Fn(s).filter((m) => m !== o && m.text !== o.text).map((m) => m.text).join(" "), $s = (s) => /\s/.test(s) ? `"${s.replace(/"/g, "")}"` : s, yh = [
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
], ar = (s) => yh.filter((o) => o.kinds.includes(s)), o0 = { events: ["origin", "outcome", "session"], requests: ["origin", "session"] }, d0 = (s) => [...ar(s).map((o) => o.field), ...o0[s]], h0 = (s) => {
  var o;
  return ((o = yh.find((m) => m.field === s)) == null ? void 0 : o.label) ?? In(oe(s));
};
function v0(s, o, m, f = {}) {
  const g = s.startsWith("-"), N = g ? s.slice(1) : s, R = g ? "-" : "", w = N.indexOf(":");
  if (w < 0)
    return ar(o).filter((B) => B.field.startsWith(N.toLowerCase()) || B.label.toLowerCase().startsWith(N.toLowerCase())).map((B) => ({ insert: `${R}${B.field}:`, label: `${B.field}:`, hint: B.hint }));
  const E = N.slice(0, w), x = N.slice(w + 1).toLowerCase();
  return (() => {
    const B = (q) => (f[q] ?? []).filter((G) => G.value).map((G) => ({ insert: G.value, label: G.value, hint: G.count.toLocaleString() }));
    switch (E) {
      case "action":
        return Object.entries((m == null ? void 0 : m.actions) ?? {}).map(([q, G]) => ({ insert: q, label: q, hint: G.title }));
      case "category":
        return [...new Set(Object.values((m == null ? void 0 : m.actions) ?? {}).map((q) => q.category))].map((q) => ({ insert: q, label: q }));
      case "actor_type":
        return Object.entries((m == null ? void 0 : m.actor_types) ?? {}).map(([q, G]) => ({ insert: q, label: q, hint: G }));
      case "result":
        return ["success", "failed", "refused"].map((q) => ({ insert: q, label: q }));
      case "method":
        return ["GET", "POST", "PUT", "PATCH", "DELETE"].map((q) => ({ insert: q, label: q }));
      case "status":
        return ["2xx", "4xx", "5xx"].map((q) => ({ insert: q, label: q }));
      case "on":
        return Object.entries((m == null ? void 0 : m.entities) ?? {}).filter(([q]) => !q.includes("_")).map(([q, G]) => ({ insert: `${q}:`, label: `${q}:`, hint: G }));
      case "app":
        return B("origin");
      case "service":
        return B("service");
      default:
        return [];
    }
  })().filter((B) => B.insert.toLowerCase().startsWith(x) || B.insert.toLowerCase().split(/[._:]/).some((q) => q.startsWith(x)) || (B.hint ?? "").toLowerCase().split(/\s+/).some((q) => q.startsWith(x))).slice(0, 12).map((B) => ({ ...B, insert: `${R}${E}:${B.insert.endsWith(":") ? B.insert : $s(B.insert)}` }));
}
const Si = 6e4, Jl = 1440, m0 = [15, 30, 60, 120, 180, 360, 720, 1440, 2880, 10080, 20160, 43200], lh = 7, p0 = new Intl.NumberFormat(void 0, { notation: "compact", maximumFractionDigits: 1 });
function g0(s) {
  const o = s.bucket_minutes * Si, m = new Map(s.buckets.map((g) => [He(g.at), g.count])), f = [];
  for (let g = Math.floor(He(s.occurred_from) / o) * o; g < He(s.occurred_to); g += o)
    f.push({ at: g, count: m.get(g) ?? 0 });
  return f;
}
function y0(s) {
  return s % Jl === 0 ? s === Jl ? "Daily bars" : `${s / Jl}-day bars` : s % 60 === 0 ? s === 60 ? "Hourly bars" : `${s / 60}-hour bars` : `${s}-minute bars`;
}
function Ls(s, o) {
  return o >= Jl ? $l(s) : `${Vl(s)}, ${Zs(s)} – ${Zs(s + o * Si)}`;
}
function b0(s, o) {
  if (s.length < 2) return [];
  const m = (s[s.length - 1].at - s[0].at) / Si, f = m0.find((R) => R >= o && R % o === 0 && m / R <= lh) ?? o * Math.ceil(s.length / lh), g = f >= Jl, N = [];
  return s.forEach((R, w) => {
    if (R.at % (f * Si) !== 0) return;
    const E = N[N.length - 1], x = !E || Vl(s[E.index].at) !== Vl(R.at);
    N.push({ index: w, top: g ? Vl(R.at) : Zs(R.at), bottom: !g && x ? Vl(R.at) : "" });
  }), N;
}
function x0({ chart: s, noun: o, loading: m }) {
  const f = X.useMemo(() => s ? g0(s) : [], [s]), [g, N] = X.useState(null), R = f.reduce((G, K) => G + K.count, 0), w = f.reduce((G, K) => Math.max(G, K.count), 0), E = f.find((G) => G.count === w && w > 0), x = (s == null ? void 0 : s.bucket_minutes) ?? Jl, U = X.useMemo(() => b0(f, x), [f, x]), B = o.replace(/s$/, ""), q = g !== null ? f[g] : void 0;
  return /* @__PURE__ */ c.jsxs("div", { className: "ahv-chart", children: [
    /* @__PURE__ */ c.jsxs("div", { className: "ahv-chart-head", children: [
      /* @__PURE__ */ c.jsxs("span", { children: [
        /* @__PURE__ */ c.jsx("strong", { className: "ahv-num", children: m && !s ? "…" : R.toLocaleString() }),
        " ",
        R === 1 ? B : o,
        s && /* @__PURE__ */ c.jsxs("span", { className: "ahv-dim", children: [
          " · ",
          Vl(He(s.occurred_from)),
          " – ",
          $l(He(s.occurred_to) - 1),
          " UTC"
        ] })
      ] }),
      s && /* @__PURE__ */ c.jsxs("span", { className: "ahv-dim", children: [
        E && /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
          "Peak ",
          /* @__PURE__ */ c.jsx("strong", { className: "ahv-num", children: E.count.toLocaleString() }),
          " at ",
          Ls(E.at, x).split(" – ")[0],
          " · "
        ] }),
        y0(x)
      ] })
    ] }),
    /* @__PURE__ */ c.jsxs(
      "div",
      {
        className: "ahv-chart-plot",
        role: "img",
        "aria-label": `${R.toLocaleString()} ${o}${E ? `, most at ${Ls(E.at, x)} UTC (${E.count})` : ""}`,
        onMouseMove: (G) => {
          if (!f.length) return;
          const K = G.currentTarget.getBoundingClientRect();
          N(Math.min(f.length - 1, Math.max(0, Math.floor((G.clientX - K.left) / K.width * f.length))));
        },
        onMouseLeave: () => N(null),
        children: [
          w > 0 && /* @__PURE__ */ c.jsx("span", { className: "ahv-chart-max ahv-num", children: p0.format(w) }),
          /* @__PURE__ */ c.jsx("svg", { viewBox: `0 0 ${Math.max(f.length, 1)} 100`, preserveAspectRatio: "none", className: "ahv-chart-svg", children: f.map((G, K) => {
            const L = w ? Math.max(G.count / w * 100, G.count ? 2 : 0) : 0;
            return /* @__PURE__ */ c.jsx(
              "rect",
              {
                x: K + 0.12,
                width: 0.76,
                y: 100 - L,
                height: L,
                className: K === g ? "ahv-bar ahv-bar-on" : "ahv-bar"
              },
              G.at
            );
          }) }),
          !m && R === 0 && /* @__PURE__ */ c.jsxs("span", { className: "ahv-chart-empty", children: [
            "No ",
            o,
            " in this period"
          ] }),
          q && /* @__PURE__ */ c.jsxs("div", { className: "ahv-tip", style: { left: `${(g + 0.5) / f.length * 100}%` }, children: [
            /* @__PURE__ */ c.jsx("strong", { className: "ahv-num", children: q.count ? `${q.count.toLocaleString()} ${q.count === 1 ? B : o}` : `No ${o}` }),
            /* @__PURE__ */ c.jsxs("span", { children: [
              Ls(q.at, x),
              " UTC"
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ c.jsx("div", { className: "ahv-chart-axis", "aria-hidden": "true", children: U.map((G) => /* @__PURE__ */ c.jsxs("span", { style: { left: `${(G.index + 0.5) / f.length * 100}%` }, children: [
      G.top,
      G.bottom && /* @__PURE__ */ c.jsx("b", { children: G.bottom })
    ] }, G.index)) })
  ] });
}
var S0 = ph();
const Dt = (...s) => s.filter(Boolean).join(" "), bh = (s) => fa(s) ? s.actor : Im(s), Ws = (s, o = {}) => fa(s) ? s.actor_label : o[s.actor_type] || In(oe(s.actor_type)) || "Unknown", Fs = {
  sealed: "Sealed: kept unchanged since its minute ended",
  waiting: "Waiting for its seal: each minute is sealed two minutes after it ends"
};
function j0({ value: s, seal: o }) {
  return /* @__PURE__ */ c.jsxs("span", { className: "ahv-when", title: `${s} UTC`, children: [
    /* @__PURE__ */ c.jsxs("span", { className: "ahv-mono", children: [
      Ei(s),
      o && /* @__PURE__ */ c.jsx("span", { className: Dt("ahv-seal", o === "waiting" && "ahv-seal-waiting"), title: Fs[o], "aria-label": Fs[o], children: /* @__PURE__ */ c.jsx(At, { name: o === "sealed" ? "shield" : "history", size: 11 }) })
    ] }),
    /* @__PURE__ */ c.jsx("span", { className: "ahv-dim", children: er(s) })
  ] });
}
const T0 = (s) => s ? Fs[s] : "";
function E0({ onClick: s, title: o, children: m }) {
  return s ? /* @__PURE__ */ c.jsx(
    "button",
    {
      type: "button",
      className: "ahv-link",
      title: o,
      onClick: (f) => {
        f.stopPropagation(), s();
      },
      onKeyDown: (f) => f.stopPropagation(),
      children: m
    }
  ) : /* @__PURE__ */ c.jsx(c.Fragment, { children: m });
}
function N0({ row: s, actorTypes: o, onFocus: m }) {
  const f = bh(s), g = Ws(s, o), N = s.actor_type !== "system" && s.actor_id && s.actor_id !== f ? s.actor_id : "";
  return /* @__PURE__ */ c.jsxs("span", { className: "ahv-who", children: [
    /* @__PURE__ */ c.jsx("span", { className: Dt("ahv-avatar", s.actor_type === "system" && "ahv-avatar-system"), "aria-hidden": "true", children: Pm(f) }),
    /* @__PURE__ */ c.jsxs("span", { className: "ahv-stack", children: [
      /* @__PURE__ */ c.jsx(E0, { title: `Only activity by ${f}`, onClick: s.actor_id ? m : void 0, children: /* @__PURE__ */ c.jsx("span", { className: "ahv-strong ahv-clip", children: f }) }),
      /* @__PURE__ */ c.jsx("span", { className: "ahv-dim ahv-clip", children: [g, N].filter(Boolean).join(" · ") })
    ] })
  ] });
}
function _0({ row: s }) {
  return /* @__PURE__ */ c.jsxs("span", { className: "ahv-where", children: [
    s.origin && /* @__PURE__ */ c.jsx("span", { className: "ahv-tag", children: oe(s.origin) }),
    s.country && /* @__PURE__ */ c.jsx("span", { className: "ahv-dim", title: s.ip || void 0, children: s.country })
  ] });
}
function lr({ outcome: s }) {
  return s === "success" ? null : /* @__PURE__ */ c.jsx("span", { className: Dt("ahv-tag", s === "failed" ? "ahv-tag-bad" : "ahv-tag-warn"), children: s });
}
const A0 = (s) => s >= 500 ? "ahv-tag-bad" : s >= 400 ? "ahv-tag-warn" : "ahv-tag-ok", xh = ({ status: s }) => /* @__PURE__ */ c.jsx("span", { className: Dt("ahv-tag ahv-mono", A0(s)), children: s }), Sh = ({ method: s }) => /* @__PURE__ */ c.jsx("span", { className: Dt("ahv-tag ahv-mono", `ahv-method-${s.toLowerCase()}`), children: s });
function z0({ row: s }) {
  var m;
  const o = s.children_count ?? ((m = s.children) == null ? void 0 : m.length) ?? 0;
  return /* @__PURE__ */ c.jsxs("span", { className: "ahv-what", children: [
    s.importance === "high" && s.outcome === "success" && /* @__PURE__ */ c.jsx("span", { className: "ahv-mark", title: "Worth attention" }),
    s.outcome !== "success" && /* @__PURE__ */ c.jsx(At, { name: "alert", size: 14, className: s.outcome === "failed" ? "ahv-bad" : "ahv-warn" }),
    /* @__PURE__ */ c.jsx("span", { className: "ahv-sentence", children: s.summary }),
    o > 0 && /* @__PURE__ */ c.jsxs("span", { className: "ahv-count", title: `${o} record change${o === 1 ? "" : "s"} made by the same request`, children: [
      /* @__PURE__ */ c.jsx(At, { name: "layers", size: 12 }),
      o
    ] })
  ] });
}
function jh({ row: s }) {
  return /* @__PURE__ */ c.jsxs("span", { className: "ahv-what", children: [
    /* @__PURE__ */ c.jsx(Sh, { method: s.method }),
    /* @__PURE__ */ c.jsx("span", { className: "ahv-mono ahv-clip", children: s.route }),
    /* @__PURE__ */ c.jsx(xh, { status: s.status }),
    /* @__PURE__ */ c.jsxs("span", { className: "ahv-dim ahv-num", children: [
      s.duration_ms,
      " ms"
    ] })
  ] });
}
function Kl({ tone: s = "plain", children: o, action: m }) {
  return /* @__PURE__ */ c.jsxs("div", { className: Dt("ahv-message", s === "bad" && "ahv-message-bad"), role: s === "bad" ? "alert" : void 0, children: [
    /* @__PURE__ */ c.jsx("span", { children: o }),
    m
  ] });
}
function nr({ rows: s = 6 }) {
  return /* @__PURE__ */ c.jsx("div", { className: "ahv-skeleton", "aria-busy": "true", children: Array.from({ length: s }, (o, m) => /* @__PURE__ */ c.jsx("span", {}, m)) });
}
const O0 = 200, Th = X.createContext(null);
function Ke({ title: s, children: o }) {
  return /* @__PURE__ */ c.jsxs("section", { className: "ahv-section", children: [
    /* @__PURE__ */ c.jsx("h3", { children: s }),
    o
  ] });
}
function Zl({ items: s }) {
  const o = s.filter(([, m]) => m != null && m !== "");
  return o.length ? /* @__PURE__ */ c.jsx("dl", { className: "ahv-facts", children: o.map(([m, f]) => /* @__PURE__ */ c.jsxs("div", { children: [
    /* @__PURE__ */ c.jsx("dt", { children: m }),
    /* @__PURE__ */ c.jsx("dd", { children: typeof f == "object" ? JSON.stringify(f) : String(f) })
  ] }, m)) }) : null;
}
function M0({ event: s }) {
  const o = s.change_list;
  if (!(o != null && o.length)) return null;
  const m = o.every((g) => g.before === null), f = o.every((g) => g.after === null);
  return /* @__PURE__ */ c.jsx(Ke, { title: m ? "Recorded values" : f ? "Values removed" : "Changes", children: /* @__PURE__ */ c.jsx("div", { className: "ahv-scroll-x", children: /* @__PURE__ */ c.jsxs("table", { className: "ahv-changes", children: [
    /* @__PURE__ */ c.jsx("thead", { children: /* @__PURE__ */ c.jsxs("tr", { children: [
      /* @__PURE__ */ c.jsx("th", { children: "Field" }),
      !m && /* @__PURE__ */ c.jsx("th", { children: "Before" }),
      !f && /* @__PURE__ */ c.jsx("th", { children: "After" })
    ] }) }),
    /* @__PURE__ */ c.jsx("tbody", { children: o.map((g) => /* @__PURE__ */ c.jsxs("tr", { children: [
      /* @__PURE__ */ c.jsx("td", { children: g.label }),
      !m && /* @__PURE__ */ c.jsx("td", { className: Dt("ahv-mono", !f && "ahv-before"), children: g.before ?? "—" }),
      !f && /* @__PURE__ */ c.jsx("td", { className: Dt("ahv-mono", !m && "ahv-after"), children: g.after ?? "—" })
    ] }, g.field)) })
  ] }) }) });
}
function D0({ text: s }) {
  const [o, m] = X.useState(!1);
  return /* @__PURE__ */ c.jsxs("button", { type: "button", className: "ahv-button ahv-button-quiet", onClick: () => {
    var f;
    (f = navigator.clipboard) == null || f.writeText(s).then(() => {
      m(!0), setTimeout(() => m(!1), 1500);
    });
  }, children: [
    /* @__PURE__ */ c.jsx(At, { name: o ? "check" : "copy", size: 14 }),
    o ? "Copied" : "Copy"
  ] });
}
function R0({ row: s }) {
  const [o, m] = X.useState(!1), { children: f, details: g, ...N } = s, R = JSON.stringify(N, null, 2);
  return /* @__PURE__ */ c.jsxs("section", { className: "ahv-section", children: [
    /* @__PURE__ */ c.jsxs("div", { className: "ahv-row-between", children: [
      /* @__PURE__ */ c.jsxs("button", { type: "button", className: "ahv-disclose", "aria-expanded": o, onClick: () => m((w) => !w), children: [
        /* @__PURE__ */ c.jsx(At, { name: "chevronDown", size: 14, className: Dt(o && "ahv-turned") }),
        "Full record (JSON)"
      ] }),
      /* @__PURE__ */ c.jsx(D0, { text: R })
    ] }),
    o && /* @__PURE__ */ c.jsx("pre", { className: "ahv-pre", children: R })
  ] });
}
function U0({ open: s, events: o, calls: m, onOpen: f }) {
  const g = [...o, ...m].sort((N, R) => N.occurred_at.localeCompare(R.occurred_at));
  return g.length ? /* @__PURE__ */ c.jsx("ol", { className: "ahv-list", children: g.map((N) => /* @__PURE__ */ c.jsx("li", { children: /* @__PURE__ */ c.jsxs("button", { type: "button", disabled: N.id === s.id, onClick: () => f(N), children: [
    /* @__PURE__ */ c.jsx("span", { className: "ahv-mono ahv-dim", children: Ei(N.occurred_at) }),
    fa(N) ? /* @__PURE__ */ c.jsxs("span", { className: "ahv-what", children: [
      /* @__PURE__ */ c.jsx("span", { className: "ahv-sentence", children: N.summary }),
      /* @__PURE__ */ c.jsx(lr, { outcome: N.outcome })
    ] }) : /* @__PURE__ */ c.jsx(jh, { row: N })
  ] }) }, N.id)) }) : /* @__PURE__ */ c.jsx("p", { className: "ahv-dim", children: "Nothing else was recorded for this request." });
}
function q0(s, o) {
  const m = fa(o);
  return Me(`${o.id}`, async () => {
    if (m) return s(`events/${o.id}`, { method: "GET" });
    if (!o.request_id) return { same_request: [], requests: [] };
    const f = (R) => s("search", {
      method: "POST",
      body: { kind: R, filters: { request_id: o.request_id }, limit: O0 }
    }), [g, N] = await Promise.all([f("events"), f("requests")]);
    return { same_request: g.items, requests: N.items.filter((R) => R.id !== o.id) };
  });
}
function Eh({ request: s, row: o, onClose: m, onFocus: f, actorTypes: g, entities: N, seal: R }) {
  const [w, E] = X.useState(o);
  X.useEffect(() => E(o), [o]);
  const x = X.useRef(null), U = X.useRef(null), B = X.useRef(m);
  B.current = m;
  const q = w !== null;
  X.useEffect(() => {
    var tt, _;
    if (!q) return;
    const K = ((tt = x.current) == null ? void 0 : tt.getRootNode()) ?? document, L = K.activeElement ?? document.activeElement;
    (_ = x.current) == null || _.focus();
    const I = (H) => {
      if (H.key === "Escape")
        H.stopPropagation(), B.current();
      else if (H.key === "Tab" && U.current) {
        const F = [...U.current.querySelectorAll("button:not(:disabled), [href], input, select, [tabindex]:not([tabindex='-1'])")], $ = K.activeElement;
        if (!F.length) return;
        H.shiftKey && $ === F[0] ? (H.preventDefault(), F[F.length - 1].focus()) : !H.shiftKey && $ === F[F.length - 1] ? (H.preventDefault(), F[0].focus()) : U.current.contains($) || (H.preventDefault(), F[0].focus());
      }
    };
    return window.addEventListener("keydown", I, !0), () => {
      var H;
      window.removeEventListener("keydown", I, !0), (H = L == null ? void 0 : L.focus) == null || H.call(L);
    };
  }, [q]);
  const G = X.useContext(Th);
  return w ? S0.createPortal(
    /* @__PURE__ */ c.jsxs("div", { className: "ahv ahv-drawer-layer", children: [
      /* @__PURE__ */ c.jsx("div", { className: "ahv-backdrop", onClick: m }),
      /* @__PURE__ */ c.jsxs("aside", { ref: U, className: "ahv-drawer", role: "dialog", "aria-modal": "true", "aria-label": "Activity details", children: [
        /* @__PURE__ */ c.jsx("button", { ref: x, type: "button", className: "ahv-icon-button ahv-drawer-close", onClick: m, "aria-label": "Close", children: /* @__PURE__ */ c.jsx(At, { name: "close" }) }),
        /* @__PURE__ */ c.jsx(
          C0,
          {
            request: s,
            row: w,
            onOpen: E,
            onFocus: f,
            actorTypes: g,
            entities: N,
            seal: w === o ? R : null
          },
          w.id
        )
      ] })
    ] }),
    G ?? document.body
  ) : null;
}
function C0({ request: s, row: o, onOpen: m, onFocus: f, actorTypes: g, entities: N = {}, seal: R }) {
  var q, G, K, L;
  const w = q0(s, o), E = fa(o) ? ((q = w.data) == null ? void 0 : q.event) ?? o : null, x = bh(o), U = E != null && E.target_type ? `${N[E.target_type] ?? oe(E.target_type)} ${E.target_name || E.target_id}` : "", B = `${$l(He(o.occurred_at))}, ${Ei(o.occurred_at)} UTC`;
  return /* @__PURE__ */ c.jsxs("div", { className: "ahv-drawer-body", children: [
    /* @__PURE__ */ c.jsxs("header", { className: "ahv-drawer-head", children: [
      E ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
        /* @__PURE__ */ c.jsxs("div", { className: "ahv-tags", children: [
          /* @__PURE__ */ c.jsx("span", { className: "ahv-tag", children: E.title }),
          /* @__PURE__ */ c.jsx(lr, { outcome: E.outcome }),
          E.importance === "high" && /* @__PURE__ */ c.jsx("span", { className: "ahv-tag ahv-tag-accent", children: "Worth attention" }),
          E.imported && /* @__PURE__ */ c.jsx("span", { className: "ahv-tag", children: "Imported" })
        ] }),
        /* @__PURE__ */ c.jsx("h2", { children: E.summary })
      ] }) : /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
        /* @__PURE__ */ c.jsxs("div", { className: "ahv-tags", children: [
          /* @__PURE__ */ c.jsx(Sh, { method: o.method }),
          /* @__PURE__ */ c.jsx(xh, { status: o.status })
        ] }),
        /* @__PURE__ */ c.jsx("h2", { className: "ahv-mono", children: o.route })
      ] }),
      /* @__PURE__ */ c.jsxs("p", { className: "ahv-dim", children: [
        x,
        " · ",
        Ws(o, g),
        " · ",
        B
      ] }),
      f && /* @__PURE__ */ c.jsxs("div", { className: "ahv-actions", children: [
        o.actor_id && /* @__PURE__ */ c.jsxs("button", { type: "button", className: "ahv-button", onClick: () => f({ actor_id: o.actor_id }), children: [
          /* @__PURE__ */ c.jsx(At, { name: "user", size: 14 }),
          "All by ",
          x
        ] }),
        (E == null ? void 0 : E.target_type) && /* @__PURE__ */ c.jsxs(
          "button",
          {
            type: "button",
            className: "ahv-button",
            onClick: () => f({ target_type: E.target_type, target_id: E.target_id }),
            children: [
              /* @__PURE__ */ c.jsx(At, { name: "history", size: 14 }),
              "Timeline of ",
              U
            ]
          }
        )
      ] })
    ] }),
    E ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
      E.outcome !== "success" && E.reason && /* @__PURE__ */ c.jsx(Ke, { title: "Reason", children: /* @__PURE__ */ c.jsx("p", { children: E.reason }) }),
      /* @__PURE__ */ c.jsx(M0, { event: E }),
      (G = E.details) != null && G.length ? /* @__PURE__ */ c.jsx(Ke, { title: "Details", children: /* @__PURE__ */ c.jsx(Zl, { items: E.details.map((I) => [I.label, I.value]) }) }) : E.metadata && !w.loading ? /* @__PURE__ */ c.jsx(Ke, { title: "Details", children: /* @__PURE__ */ c.jsx(Zl, { items: Object.entries(E.metadata).map(([I, tt]) => [In(oe(I)), tt]) }) }) : null,
      (U || E.related.length > 0) && /* @__PURE__ */ c.jsx(Ke, { title: "Concerns", children: /* @__PURE__ */ c.jsx(Zl, { items: [
        ["Target", U],
        ...E.related.map(([I, tt]) => [In(N[I] ?? oe(I)), tt])
      ] }) })
    ] }) : /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
      /* @__PURE__ */ c.jsx(Ke, { title: "Request", children: /* @__PURE__ */ c.jsx(Zl, { items: [["Path", o.path], ["Took", `${o.duration_ms} ms`], ["Service", oe(o.service)]] }) }),
      o.request_body && /* @__PURE__ */ c.jsx(Ke, { title: "Sent (secrets masked)", children: /* @__PURE__ */ c.jsx("pre", { className: "ahv-pre", children: JSON.stringify(o.request_body, null, 2) }) })
    ] }),
    o.request_id && /* @__PURE__ */ c.jsx(Ke, { title: "Same request", children: w.error ? /* @__PURE__ */ c.jsxs(Kl, { tone: "bad", action: /* @__PURE__ */ c.jsx("button", { type: "button", className: "ahv-button", onClick: w.refresh, children: "Retry" }), children: [
      "Couldn't load: ",
      w.error.message
    ] }) : w.loading && !w.data ? /* @__PURE__ */ c.jsx(nr, { rows: 2 }) : /* @__PURE__ */ c.jsx(U0, { open: o, events: ((K = w.data) == null ? void 0 : K.same_request) ?? [], calls: ((L = w.data) == null ? void 0 : L.requests) ?? [], onOpen: m }) }),
    /* @__PURE__ */ c.jsx(Ke, { title: "Who and from where", children: /* @__PURE__ */ c.jsx(Zl, { items: [
      ["Who", `${x} (${Ws(o, g)}${o.actor_id && o.actor_id !== x ? ` ${o.actor_id}` : ""})`],
      ["App", o.origin && oe(o.origin)],
      ["Country", o.country],
      ["IP address", o.ip],
      ["Device", E ? E.device : o.user_agent],
      ["Session", o.session_id],
      ["Company", o.tenant_id],
      ["Service", oe(o.service)]
    ] }) }),
    /* @__PURE__ */ c.jsx(Ke, { title: "Reference", children: /* @__PURE__ */ c.jsx(Zl, { items: [
      ["Record id", o.id],
      ["Request id", o.request_id],
      ["Recorded", `${o.received_at} UTC`],
      ["Integrity", T0(R ?? null)],
      ...E ? [["Action", E.action]] : []
    ] }) }),
    /* @__PURE__ */ c.jsx(R0, { row: E ?? o })
  ] });
}
const nh = 65, Ps = { events: "Events", access_logs: "Requests" }, w0 = 20, uh = (s, o = Date.now()) => (o - Date.parse(`${s.replace(" ", "T")}:00Z`)) / 6e4, H0 = () => new Date(Date.now() - 864e5).toISOString().slice(0, 10);
function B0(s, o, m) {
  var g;
  const f = (g = m == null ? void 0 : m.sealed_until) == null ? void 0 : g[o];
  return f ? s.slice(0, 16) <= f ? "sealed" : "waiting" : null;
}
function Y0({ request: s, status: o }) {
  var F, $;
  const [m, f] = X.useState(!1), [g, N] = X.useState(H0), [R, w] = X.useState(!1), [E, x] = X.useState(null), U = X.useRef(null), B = Me(
    o != null && o.checks ? "integrity" : null,
    () => s("integrity", { method: "GET" })
  ), q = !!(o != null && o.checks && ((F = B.data) != null && F.allowed));
  if (!o) return null;
  const G = Object.entries(o.sealed_until ?? {}), K = o.last_daily, L = ($ = o.stats) == null ? void 0 : $.queued;
  if (!G.length && o.recording === void 0 && !K) return null;
  const I = async (it) => {
    w(!0);
    try {
      x(await it());
    } catch (C) {
      x({ kind: "error", message: C.message });
    } finally {
      w(!1);
    }
  }, tt = () => I(async () => ({ kind: "day", ...await s("integrity/verify", { method: "POST", body: { day: g } }) })), _ = () => I(async () => {
    const it = await s(`integrity/seal/${g}`, { method: "GET" });
    return Js(`${JSON.stringify(it, null, 2)}
`, `activity-seal-${g}.json`, "application/json"), { kind: "downloaded", day: g };
  }), H = (it) => I(async () => {
    let C;
    try {
      C = JSON.parse(await it.text());
    } catch {
      C = {};
    }
    if (!C || !Array.isArray(C.seals) || !C.seals.length)
      throw new Error(`${it.name} is not a seal record: choose a proof downloaded here (activity-seal-<day>.json)`);
    const P = await s("integrity/check", { method: "POST", body: { record: C } });
    return { kind: "proof", name: it.name, day: String(C.day ?? ""), ...P };
  });
  return /* @__PURE__ */ c.jsxs("div", { className: "ahv-status-wrap", children: [
    /* @__PURE__ */ c.jsxs("div", { className: "ahv-status", role: "status", children: [
      /* @__PURE__ */ c.jsx(At, { name: "shield", size: 14 }),
      o.recording !== void 0 && /* @__PURE__ */ c.jsx("span", { className: Dt("ahv-tag", o.recording ? "ahv-tag-ok" : "ahv-tag-bad"), children: o.recording ? "Recording" : "Not recording" }),
      L !== void 0 && /* @__PURE__ */ c.jsxs("span", { children: [
        "Waiting to be written ",
        /* @__PURE__ */ c.jsx("strong", { className: "ahv-num", children: L.toLocaleString() })
      ] }),
      G.map(([it, C]) => /* @__PURE__ */ c.jsxs(
        "span",
        {
          className: Dt(uh(C) > nh && "ahv-warn"),
          title: uh(C) > nh ? "Sealing is behind" : "Every minute up to this one is sealed",
          children: [
            Ps[it] ?? it,
            " sealed through ",
            /* @__PURE__ */ c.jsx("strong", { className: "ahv-num", children: C })
          ]
        },
        it
      )),
      K && /* @__PURE__ */ c.jsxs("span", { children: [
        "Check of ",
        K.day,
        ":",
        " ",
        /* @__PURE__ */ c.jsx("strong", { className: K.ok === !1 ? "ahv-bad" : K.ok ? "ahv-ok" : "ahv-warn", children: K.ok === !1 ? `${K.problems ?? ""} problem(s)`.trim() : K.ok ? "intact" : "not checked" })
      ] }),
      q && /* @__PURE__ */ c.jsx("button", { type: "button", className: "ahv-link-button ahv-push-right", "aria-expanded": m, onClick: () => f((it) => !it), children: "Check integrity" })
    ] }),
    m && q && /* @__PURE__ */ c.jsxs("div", { className: "ahv-checks", children: [
      /* @__PURE__ */ c.jsxs("div", { className: "ahv-bar", children: [
        /* @__PURE__ */ c.jsxs("label", { className: "ahv-field", children: [
          /* @__PURE__ */ c.jsx("span", { children: "Day (UTC)" }),
          /* @__PURE__ */ c.jsx(
            "input",
            {
              type: "date",
              className: "ahv-input",
              value: g,
              max: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
              min: "2000-01-01",
              onChange: (it) => N(it.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ c.jsxs("button", { type: "button", className: "ahv-button ahv-button-main", disabled: R || !g, onClick: tt, children: [
          /* @__PURE__ */ c.jsx(At, { name: "shield", size: 14 }),
          R ? "Checking…" : "Check this day"
        ] }),
        /* @__PURE__ */ c.jsxs(
          "button",
          {
            type: "button",
            className: "ahv-button",
            disabled: R || !g,
            onClick: _,
            title: "The day's last seal of each table, to keep outside the database",
            children: [
              /* @__PURE__ */ c.jsx(At, { name: "download", size: 14 }),
              "Download proof"
            ]
          }
        ),
        /* @__PURE__ */ c.jsxs(
          "button",
          {
            type: "button",
            className: "ahv-button",
            disabled: R,
            title: "Compare a proof kept earlier with the database",
            onClick: () => {
              var it;
              return (it = U.current) == null ? void 0 : it.click();
            },
            children: [
              /* @__PURE__ */ c.jsx(At, { name: "check", size: 14 }),
              "Check a kept proof"
            ]
          }
        ),
        /* @__PURE__ */ c.jsx(
          "input",
          {
            ref: U,
            type: "file",
            accept: "application/json,.json",
            className: "ahv-hidden",
            tabIndex: -1,
            "aria-hidden": "true",
            onChange: (it) => {
              var P;
              const C = (P = it.target.files) == null ? void 0 : P[0];
              it.target.value = "", C && H(C);
            }
          }
        )
      ] }),
      E && /* @__PURE__ */ c.jsx(G0, { verdict: E })
    ] })
  ] });
}
function G0({ verdict: s }) {
  return s.kind === "error" ? /* @__PURE__ */ c.jsx("p", { className: "ahv-bad", role: "alert", children: s.message }) : s.kind === "day" ? /* @__PURE__ */ c.jsxs("div", { role: "status", className: Dt("ahv-verdict", s.ok ? "ahv-verdict-ok" : "ahv-verdict-bad"), children: [
    /* @__PURE__ */ c.jsx("strong", { children: s.ok ? `${s.day}: intact. ${s.rows.toLocaleString()} records in ${s.checked.toLocaleString()} sealed minutes match their seals.` : `${s.day}: ${(s.problems.length + s.more).toLocaleString()} problem(s) found.` }),
    !s.ok && /* @__PURE__ */ c.jsxs("ul", { children: [
      s.problems.slice(0, w0).map((o, m) => /* @__PURE__ */ c.jsxs("li", { children: [
        /* @__PURE__ */ c.jsx("span", { className: "ahv-mono", children: o.window_start }),
        " ",
        Ps[o.table] ?? o.table,
        ": ",
        o.problem
      ] }, m)),
      s.more > 0 && /* @__PURE__ */ c.jsxs("li", { className: "ahv-dim", children: [
        "and ",
        s.more.toLocaleString(),
        " more"
      ] })
    ] })
  ] }) : s.kind === "downloaded" ? /* @__PURE__ */ c.jsx("div", { role: "status", className: "ahv-verdict ahv-verdict-ok", children: /* @__PURE__ */ c.jsxs("strong", { children: [
    "Proof of ",
    s.day,
    " downloaded. Keep it outside this system: checking it later shows any rewrite since."
  ] }) }) : s.mismatches.length ? /* @__PURE__ */ c.jsxs("div", { role: "status", className: "ahv-verdict ahv-verdict-bad", children: [
    /* @__PURE__ */ c.jsxs("strong", { children: [
      s.name,
      ": the database no longer matches this proof of ",
      s.day,
      "."
    ] }),
    /* @__PURE__ */ c.jsx("ul", { children: s.mismatches.map((o, m) => /* @__PURE__ */ c.jsxs("li", { children: [
      /* @__PURE__ */ c.jsx("span", { className: "ahv-mono", children: o.window_start }),
      " ",
      Ps[o.table] ?? o.table,
      ": ",
      o.problem
    ] }, m)) })
  ] }) : /* @__PURE__ */ c.jsx("div", { role: "status", className: "ahv-verdict ahv-verdict-ok", children: /* @__PURE__ */ c.jsxs("strong", { children: [
    s.name,
    ": the database still matches this proof of ",
    s.day,
    "."
  ] }) });
}
function ih(s, o) {
  const m = s.lastIndexOf(" ", o - 1) + 1, f = s.indexOf(" ", o);
  return { start: m, end: f < 0 ? s.length : f, word: s.slice(m, f < 0 ? s.length : f) };
}
function k0({ value: s, onChange: o, onSubmit: m, suggestions: f, placeholder: g, inputRef: N }) {
  const R = X.useRef(null), w = N ?? R, E = X.useId(), [x, U] = X.useState(0), [B, q] = X.useState(!1), [G, K] = X.useState(0), [L, I] = X.useState(!1), { start: tt, end: _, word: H } = ih(s, x), F = B ? f(H) : [], $ = F[Math.min(G, F.length - 1)], it = (C) => {
    const P = s.slice(_), Rt = C.insert.endsWith(":") ? "" : " ", Be = `${s.slice(0, tt)}${C.insert}${P.startsWith(" ") || !Rt ? "" : Rt}${P}`, ae = tt + C.insert.length + (C.insert.endsWith(":") ? 0 : 1);
    o(Be), K(0), I(!1), requestAnimationFrame(() => {
      var jt, be;
      (jt = w.current) == null || jt.focus(), (be = w.current) == null || be.setSelectionRange(ae, ae), U(ae);
    });
  };
  return /* @__PURE__ */ c.jsxs("div", { className: "ahv-search", children: [
    /* @__PURE__ */ c.jsxs("span", { className: "ahv-input-icon", children: [
      /* @__PURE__ */ c.jsx(At, { name: "search", size: 14 }),
      /* @__PURE__ */ c.jsx(
        "input",
        {
          ref: w,
          className: "ahv-input",
          role: "combobox",
          "aria-label": "Search",
          "aria-expanded": F.length > 0,
          "aria-controls": E,
          "aria-autocomplete": "list",
          "aria-activedescendant": F.length && L ? `${E}-${F.indexOf($)}` : void 0,
          value: s,
          placeholder: g,
          spellCheck: !1,
          onChange: (C) => {
            o(C.target.value), U(C.target.selectionStart ?? C.target.value.length), q(!0), K(0), I(!1);
          },
          onSelect: (C) => {
            const P = C.currentTarget.selectionStart ?? 0;
            ih(s, P).start !== tt && I(!1), U(P);
          },
          onFocus: () => q(!0),
          onBlur: () => setTimeout(() => {
            q(!1), I(!1);
          }, 120),
          onKeyDown: (C) => {
            F.length && (C.key === "ArrowDown" || C.key === "ArrowUp") ? (C.preventDefault(), K((P) => L ? (P + (C.key === "ArrowDown" ? 1 : F.length - 1)) % F.length : C.key === "ArrowDown" ? 0 : F.length - 1), I(!0)) : F.length && L && C.key === "Enter" ? (C.preventDefault(), it($)) : C.key === "Escape" ? (q(!1), I(!1)) : C.key === "Enter" && (q(!1), m());
          }
        }
      )
    ] }),
    F.length > 0 && /* @__PURE__ */ c.jsx("ul", { id: E, role: "listbox", className: "ahv-suggest", children: F.map((C, P) => /* @__PURE__ */ c.jsxs(
      "li",
      {
        id: `${E}-${P}`,
        role: "option",
        "aria-selected": L && C === $,
        className: Dt(L && C === $ && "ahv-suggest-on"),
        onMouseDown: (Rt) => {
          Rt.preventDefault(), it(C);
        },
        onMouseEnter: () => {
          K(P), I(!0);
        },
        children: [
          /* @__PURE__ */ c.jsx("span", { className: "ahv-mono", children: C.label }),
          C.hint && /* @__PURE__ */ c.jsx("span", { className: "ahv-dim", children: C.hint })
        ]
      },
      C.insert
    )) })
  ] });
}
function ur({ label: s, icon: o, children: m, open: f, setOpen: g, badge: N, disabled: R }) {
  const w = X.useRef(null);
  return X.useEffect(() => {
    if (!f) return;
    const E = (U) => {
      w.current && !U.composedPath().includes(w.current) && g(!1);
    }, x = (U) => U.key === "Escape" && g(!1);
    return document.addEventListener("mousedown", E), document.addEventListener("keydown", x), () => {
      document.removeEventListener("mousedown", E), document.removeEventListener("keydown", x);
    };
  }, [f, g]), /* @__PURE__ */ c.jsxs("div", { className: "ahv-menu", ref: w, children: [
    /* @__PURE__ */ c.jsxs("button", { type: "button", className: "ahv-button", "aria-expanded": f, disabled: R, onClick: () => g(!f), children: [
      /* @__PURE__ */ c.jsx(At, { name: o, size: 14 }),
      s,
      N && /* @__PURE__ */ c.jsx("span", { className: "ahv-count", children: N }),
      /* @__PURE__ */ c.jsx(At, { name: "chevronDown", size: 14 })
    ] }),
    f && /* @__PURE__ */ c.jsx("div", { className: "ahv-menu-list ahv-menu-panel", children: m })
  ] });
}
function L0({ columns: s, shown: o, onChange: m }) {
  const [f, g] = X.useState(!1);
  return /* @__PURE__ */ c.jsxs(ur, { label: "Columns", icon: "sliders", open: f, setOpen: g, children: [
    /* @__PURE__ */ c.jsx("p", { className: "ahv-dim ahv-small", children: "When, who and what always show." }),
    s.map((N) => /* @__PURE__ */ c.jsxs("label", { className: "ahv-check", children: [
      /* @__PURE__ */ c.jsx(
        "input",
        {
          type: "checkbox",
          checked: o.includes(N.key),
          onChange: (R) => m(R.target.checked ? [...o, N.key] : o.filter((w) => w !== N.key))
        }
      ),
      N.label
    ] }, N.key))
  ] });
}
function X0({ request: s, current: o, onOpen: m }) {
  var _;
  const [f, g] = X.useState(!1), N = Me("views", () => s("views", { method: "GET" })), [R, w] = X.useState(""), [E, x] = X.useState(!1), [U, B] = X.useState(!1), [q, G] = X.useState(null);
  if (!((_ = N.data) != null && _.enabled)) return null;
  const K = N.data.views, L = K.find((H) => H.search === o), I = async (H) => {
    B(!0), G(null);
    try {
      await H(), N.refresh(), w("");
    } catch (F) {
      G(F.message);
    } finally {
      B(!1);
    }
  }, tt = (H, F = R, $ = E) => I(() => s("views", { method: "POST", body: { id: H, name: F.trim(), search: o, shared: $ } }));
  return /* @__PURE__ */ c.jsxs(ur, { label: L ? L.name : "Views", icon: "layers", open: f, setOpen: g, children: [
    K.length ? /* @__PURE__ */ c.jsx("ul", { className: "ahv-views", children: K.map((H) => /* @__PURE__ */ c.jsxs("li", { className: Dt(H === L && "ahv-views-on"), children: [
      /* @__PURE__ */ c.jsxs("button", { type: "button", className: "ahv-views-open", onClick: () => {
        m(H.search), g(!1);
      }, children: [
        /* @__PURE__ */ c.jsx("span", { children: H.name }),
        /* @__PURE__ */ c.jsx("span", { className: "ahv-dim ahv-small", children: H.mine ? H.shared ? "Shared by you" : "Only you" : `Shared by ${H.owner_name}` })
      ] }),
      H.mine && /* @__PURE__ */ c.jsxs("span", { className: "ahv-views-tools", children: [
        H.search !== o && /* @__PURE__ */ c.jsx(
          "button",
          {
            type: "button",
            className: "ahv-icon-button",
            title: "Save the current search into this view",
            disabled: U,
            onClick: () => tt(H.id, H.name, H.shared),
            children: /* @__PURE__ */ c.jsx(At, { name: "refresh", size: 14 })
          }
        ),
        /* @__PURE__ */ c.jsx(
          "button",
          {
            type: "button",
            className: "ahv-icon-button",
            title: "Remove this view",
            disabled: U,
            onClick: () => I(() => s(`views/${H.id}`, { method: "DELETE" })),
            children: /* @__PURE__ */ c.jsx(At, { name: "close", size: 14 })
          }
        )
      ] })
    ] }, H.id)) }) : /* @__PURE__ */ c.jsx("p", { className: "ahv-dim ahv-small", children: "No saved views yet. Save the current search to come back to it." }),
    /* @__PURE__ */ c.jsxs("form", { className: "ahv-views-save", onSubmit: (H) => {
      H.preventDefault(), R.trim() && tt();
    }, children: [
      /* @__PURE__ */ c.jsx(
        "input",
        {
          className: "ahv-input",
          value: R,
          maxLength: 80,
          placeholder: "Name this search",
          "aria-label": "View name",
          onChange: (H) => w(H.target.value)
        }
      ),
      /* @__PURE__ */ c.jsxs("label", { className: "ahv-check", children: [
        /* @__PURE__ */ c.jsx("input", { type: "checkbox", checked: E, onChange: (H) => x(H.target.checked) }),
        "Share with my team"
      ] }),
      /* @__PURE__ */ c.jsx("button", { type: "submit", className: "ahv-button ahv-button-main", disabled: U || !R.trim(), children: "Save view" }),
      q && /* @__PURE__ */ c.jsx("span", { className: "ahv-bad ahv-small", children: q })
    ] })
  ] });
}
const Q0 = { active: ["Active", "ahv-tag-ok"], failing: ["Failing", "ahv-tag-bad"], paused: ["Paused", "ahv-tag-warn"] }, ch = { events: "Events", requests: "API requests", both: "Events and API requests" }, Nh = {
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
}, Xs = (s) => s.destination === "webhook" ? s.target.url ?? "" : `s3://${[s.target.bucket, s.target.prefix].filter(Boolean).join("/")}`, sh = (s) => ({
  ...Nh,
  id: s.id,
  name: s.name,
  kind: s.kind,
  query: s.query,
  destination: s.destination,
  url: s.target.url ?? "",
  headers: Object.keys(s.target.headers ?? {}).map((o) => `${o}: `).join(`
`),
  bucket: s.target.bucket ?? "",
  prefix: s.target.prefix ?? "",
  region: s.target.region ?? "",
  endpoint: s.target.endpoint ?? "",
  enabled: s.enabled
});
function Z0(s) {
  const o = {};
  for (const m of s.split(`
`)) {
    const f = m.indexOf(":");
    f > 0 && (o[m.slice(0, f).trim()] = m.slice(f + 1).trim());
  }
  return o;
}
function rh(s) {
  const o = s.destination === "webhook", m = o ? s.secret || void 0 : s.accessKey || s.secretKey ? { access_key: s.accessKey, secret_key: s.secretKey } : void 0;
  return {
    id: s.id,
    name: s.name.trim(),
    kind: s.kind,
    query: s.query.trim(),
    destination: s.destination,
    target: o ? { url: s.url.trim() } : { bucket: s.bucket.trim(), prefix: s.prefix.trim(), region: s.region.trim(), endpoint: s.endpoint.trim() },
    // header values are secrets: sent under a name the access log masks, kept encrypted
    secret: m,
    secret_headers: o ? Z0(s.headers) : {},
    enabled: s.enabled,
    start: s.start
  };
}
const fh = () => Array.from(crypto.getRandomValues(new Uint8Array(24)), (s) => s.toString(16).padStart(2, "0")).join("");
function V0({ request: s, kinds: o, list: m, refresh: f }) {
  const [g, N] = X.useState(null), [R, w] = X.useState(!1), [E, x] = X.useState(null), U = async (_, H) => {
    w(!0), x(null);
    try {
      return await _(), H && x({ ok: !0, text: H }), f(), !0;
    } catch (F) {
      return x({ ok: !1, text: F.message }), !1;
    } finally {
      w(!1);
    }
  }, B = async (_) => {
    _.preventDefault(), g && await U(() => s("streams", { method: "POST", body: rh(g) }), `${g.name.trim()} saved.`) && N(null);
  }, q = (_) => U(async () => {
    const H = await s(`streams/${_.id}/test`, { method: "POST" });
    if (!H.ok) throw new Error(`${_.name}: ${H.error}`);
  }, `${_.name}: the test line was delivered.`), G = (_) => U(
    () => s("streams", { method: "POST", body: { ...rh(sh(_)), enabled: !_.enabled } }),
    `${_.name} ${_.enabled ? "paused" : "resumed"}.`
  ), K = (_) => window.confirm(`Remove ${_.name}? Nothing more is sent to ${Xs(_)}.`) && U(() => s(`streams/${_.id}`, { method: "DELETE" }), `${_.name} removed.`), L = (_) => N((H) => H && { ...H, ..._ }), I = o.includes("requests") ? ["events", "requests", "both"] : ["events"], tt = g && !I.includes(g.kind) ? [...I, g.kind] : I;
  return /* @__PURE__ */ c.jsxs("section", { className: "ahv-streams", "aria-label": "Streams", children: [
    /* @__PURE__ */ c.jsxs("div", { className: "ahv-bar", children: [
      /* @__PURE__ */ c.jsx("p", { className: "ahv-dim ahv-small", children: "Each stream sends new records to your own system as they are sealed, a few minutes after they happen. Webhooks receive JSON lines signed with your secret; S3 buckets receive one gzip file per batch." }),
      !g && /* @__PURE__ */ c.jsx(
        "button",
        {
          type: "button",
          className: "ahv-button ahv-button-main ahv-push-right",
          onClick: () => {
            x(null), N({ ...Nh, secret: fh() });
          },
          children: "Add stream"
        }
      )
    ] }),
    m.streams.length > 0 && !g && /* @__PURE__ */ c.jsx("ul", { className: "ahv-stream-list", children: m.streams.map((_) => {
      const [H, F] = Q0[_.state];
      return /* @__PURE__ */ c.jsxs("li", { children: [
        /* @__PURE__ */ c.jsxs("div", { className: "ahv-stream-main", children: [
          /* @__PURE__ */ c.jsx("strong", { children: _.name }),
          /* @__PURE__ */ c.jsx("span", { className: Dt("ahv-tag", F), children: H }),
          /* @__PURE__ */ c.jsxs("span", { className: "ahv-dim ahv-small", children: [
            ch[_.kind],
            _.query && /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
              " matching ",
              /* @__PURE__ */ c.jsx("code", { className: "ahv-mono", children: _.query })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ c.jsx("span", { className: "ahv-mono ahv-dim ahv-stream-where", title: Xs(_), children: Xs(_) }),
        /* @__PURE__ */ c.jsxs("span", { className: "ahv-small", children: [
          /* @__PURE__ */ c.jsx("strong", { className: "ahv-num", children: _.delivered.toLocaleString() }),
          " delivered",
          _.last_delivered_at && /* @__PURE__ */ c.jsxs("span", { className: "ahv-dim", children: [
            ", last ",
            er(_.last_delivered_at) || _.last_delivered_at.slice(0, 16)
          ] })
        ] }),
        /* @__PURE__ */ c.jsxs("span", { className: "ahv-stream-tools", children: [
          /* @__PURE__ */ c.jsx("button", { type: "button", className: "ahv-link-button", disabled: R, onClick: () => q(_), children: "Send test" }),
          /* @__PURE__ */ c.jsx("button", { type: "button", className: "ahv-link-button", disabled: R, onClick: () => G(_), children: _.enabled ? "Pause" : "Resume" }),
          /* @__PURE__ */ c.jsx("button", { type: "button", className: "ahv-link-button", disabled: R, onClick: () => {
            x(null), N(sh(_));
          }, children: "Edit" }),
          /* @__PURE__ */ c.jsx("button", { type: "button", className: "ahv-icon-button", title: `Remove ${_.name}`, disabled: R, onClick: () => K(_), children: /* @__PURE__ */ c.jsx(At, { name: "close", size: 14 }) })
        ] }),
        _.state === "failing" && _.error && /* @__PURE__ */ c.jsxs("span", { className: "ahv-bad ahv-small", children: [
          _.error,
          ". It is tried again shortly."
        ] })
      ] }, _.id);
    }) }),
    !m.streams.length && !g && /* @__PURE__ */ c.jsx("p", { className: "ahv-dim ahv-small", children: "No streams yet." }),
    g && /* @__PURE__ */ c.jsxs("form", { className: "ahv-stream-form", onSubmit: B, children: [
      /* @__PURE__ */ c.jsxs("label", { className: "ahv-field", children: [
        /* @__PURE__ */ c.jsx("span", { children: "Name" }),
        /* @__PURE__ */ c.jsx("input", { className: "ahv-input", required: !0, maxLength: 80, value: g.name, placeholder: "CRM intake", onChange: (_) => L({ name: _.target.value }) })
      ] }),
      /* @__PURE__ */ c.jsxs("label", { className: "ahv-field", children: [
        /* @__PURE__ */ c.jsx("span", { children: "Records" }),
        /* @__PURE__ */ c.jsx("select", { className: "ahv-input", value: g.kind, disabled: tt.length < 2, onChange: (_) => L({ kind: _.target.value }), children: tt.map((_) => /* @__PURE__ */ c.jsx("option", { value: _, children: ch[_] }, _)) })
      ] }),
      /* @__PURE__ */ c.jsxs("label", { className: "ahv-field ahv-field-wide", children: [
        /* @__PURE__ */ c.jsxs("span", { children: [
          "Only records matching ",
          /* @__PURE__ */ c.jsx("em", { className: "ahv-dim", children: "(optional, the search language)" })
        ] }),
        /* @__PURE__ */ c.jsx(
          "input",
          {
            className: "ahv-input ahv-mono",
            maxLength: 500,
            value: g.query,
            placeholder: "action:trade.* -result:success",
            onChange: (_) => L({ query: _.target.value })
          }
        )
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: "ahv-field ahv-field-wide", children: [
        /* @__PURE__ */ c.jsx("span", { children: "Send to" }),
        /* @__PURE__ */ c.jsx("div", { className: "ahv-segment", role: "group", "aria-label": "Destination", children: ["webhook", "s3"].map((_) => /* @__PURE__ */ c.jsx(
          "button",
          {
            type: "button",
            "aria-pressed": g.destination === _,
            disabled: !!g.id,
            onClick: () => L({ destination: _, secret: _ === "webhook" && !g.id ? fh() : "" }),
            children: _ === "webhook" ? "Webhook" : "S3 bucket"
          },
          _
        )) })
      ] }),
      g.destination === "webhook" ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
        /* @__PURE__ */ c.jsxs("label", { className: "ahv-field ahv-field-wide", children: [
          /* @__PURE__ */ c.jsxs("span", { children: [
            "URL ",
            /* @__PURE__ */ c.jsx("em", { className: "ahv-dim", children: "(https, on the internet)" })
          ] }),
          /* @__PURE__ */ c.jsx(
            "input",
            {
              className: "ahv-input ahv-mono",
              type: "url",
              required: !0,
              value: g.url,
              placeholder: "https://crm.example.com/activity",
              onChange: (_) => L({ url: _.target.value })
            }
          )
        ] }),
        /* @__PURE__ */ c.jsxs("label", { className: "ahv-field ahv-field-wide", children: [
          /* @__PURE__ */ c.jsxs("span", { children: [
            "Signing secret ",
            /* @__PURE__ */ c.jsx("em", { className: "ahv-dim", children: g.id ? "(blank keeps the current one while the URL's host stays the same)" : "(copy it to your receiver: it is not shown again)" })
          ] }),
          /* @__PURE__ */ c.jsx(
            "input",
            {
              className: "ahv-input ahv-mono",
              minLength: 16,
              required: !g.id,
              value: g.secret,
              autoComplete: "off",
              onChange: (_) => L({ secret: _.target.value })
            }
          )
        ] }),
        /* @__PURE__ */ c.jsxs("label", { className: "ahv-field ahv-field-wide", children: [
          /* @__PURE__ */ c.jsxs("span", { children: [
            "Headers ",
            /* @__PURE__ */ c.jsx("em", { className: "ahv-dim", children: '(one "Name: value" a line, kept encrypted; on an edit a blank value keeps the stored one)' })
          ] }),
          /* @__PURE__ */ c.jsx(
            "textarea",
            {
              className: "ahv-input ahv-textarea ahv-mono",
              rows: 2,
              value: g.headers,
              placeholder: "Authorization: Bearer …",
              onChange: (_) => L({ headers: _.target.value })
            }
          )
        ] })
      ] }) : /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
        /* @__PURE__ */ c.jsxs("label", { className: "ahv-field", children: [
          /* @__PURE__ */ c.jsx("span", { children: "Bucket" }),
          /* @__PURE__ */ c.jsx("input", { className: "ahv-input", required: !0, value: g.bucket, onChange: (_) => L({ bucket: _.target.value }) })
        ] }),
        /* @__PURE__ */ c.jsxs("label", { className: "ahv-field", children: [
          /* @__PURE__ */ c.jsxs("span", { children: [
            "Folder ",
            /* @__PURE__ */ c.jsx("em", { className: "ahv-dim", children: "(optional)" })
          ] }),
          /* @__PURE__ */ c.jsx("input", { className: "ahv-input", value: g.prefix, placeholder: "activity", onChange: (_) => L({ prefix: _.target.value }) })
        ] }),
        /* @__PURE__ */ c.jsxs("label", { className: "ahv-field", children: [
          /* @__PURE__ */ c.jsxs("span", { children: [
            "Region ",
            /* @__PURE__ */ c.jsx("em", { className: "ahv-dim", children: "(optional)" })
          ] }),
          /* @__PURE__ */ c.jsx("input", { className: "ahv-input", value: g.region, placeholder: "eu-central-1", onChange: (_) => L({ region: _.target.value }) })
        ] }),
        /* @__PURE__ */ c.jsxs("label", { className: "ahv-field", children: [
          /* @__PURE__ */ c.jsxs("span", { children: [
            "Endpoint ",
            /* @__PURE__ */ c.jsx("em", { className: "ahv-dim", children: "(for R2, MinIO …)" })
          ] }),
          /* @__PURE__ */ c.jsx("input", { className: "ahv-input ahv-mono", type: "url", value: g.endpoint, onChange: (_) => L({ endpoint: _.target.value }) })
        ] }),
        /* @__PURE__ */ c.jsxs("label", { className: "ahv-field", children: [
          /* @__PURE__ */ c.jsxs("span", { children: [
            "Access key ",
            g.id && /* @__PURE__ */ c.jsx("em", { className: "ahv-dim", children: "(blank keeps it)" })
          ] }),
          /* @__PURE__ */ c.jsx("input", { className: "ahv-input ahv-mono", required: !g.id, autoComplete: "off", value: g.accessKey, onChange: (_) => L({ accessKey: _.target.value }) })
        ] }),
        /* @__PURE__ */ c.jsxs("label", { className: "ahv-field", children: [
          /* @__PURE__ */ c.jsx("span", { children: "Secret key" }),
          /* @__PURE__ */ c.jsx(
            "input",
            {
              className: "ahv-input ahv-mono",
              type: "password",
              required: !g.id || !!g.accessKey,
              autoComplete: "new-password",
              value: g.secretKey,
              onChange: (_) => L({ secretKey: _.target.value })
            }
          )
        ] })
      ] }),
      !g.id && /* @__PURE__ */ c.jsxs("label", { className: "ahv-field ahv-field-wide", children: [
        /* @__PURE__ */ c.jsx("span", { children: "Start with" }),
        /* @__PURE__ */ c.jsxs("select", { className: "ahv-input", value: g.start, onChange: (_) => L({ start: _.target.value }), children: [
          /* @__PURE__ */ c.jsx("option", { value: "now", children: "Records from now on" }),
          /* @__PURE__ */ c.jsx("option", { value: "beginning", children: "Everything already kept, then what follows" })
        ] })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: "ahv-bar ahv-field-wide", children: [
        /* @__PURE__ */ c.jsx("button", { type: "submit", className: "ahv-button ahv-button-main", disabled: R, children: R ? "Saving…" : g.id ? "Save changes" : "Add stream" }),
        /* @__PURE__ */ c.jsx("button", { type: "button", className: "ahv-button", disabled: R, onClick: () => N(null), children: "Cancel" })
      ] })
    ] }),
    E && /* @__PURE__ */ c.jsx("p", { role: E.ok ? "status" : "alert", className: Dt("ahv-small", E.ok ? "ahv-ok" : "ahv-bad"), children: E.text })
  ] });
}
const oh = [
  { value: "important", label: "Important", hint: "What people did, without the details behind it" },
  { value: "all", label: "All", hint: "Every record, each request's row changes inside its event" },
  { value: "problems", label: "Problems", hint: "Only what failed or was refused" }
], K0 = [
  { label: "All requests", search: {} },
  { label: "Changes only", search: { filters: { method: ["POST", "PUT", "PATCH", "DELETE"] } } },
  { label: "Errors", search: { status_from: 400 } }
], Is = [
  { value: "1h", label: "Last hour", minutes: 60 },
  { value: "24h", label: "Last 24 hours", minutes: 1440 },
  { value: "7d", label: "Last 7 days", minutes: 10080 },
  { value: "30d", label: "Last 30 days", minutes: 43200 },
  { value: "all", label: "All time" },
  { value: "custom", label: "Dates…" }
], dh = {
  events: [
    { key: "where", label: "Where" },
    { key: "concerning", label: "Concerning" },
    { key: "result", label: "Result" },
    { key: "service", label: "Service" },
    { key: "ip", label: "IP address" }
  ],
  requests: [{ key: "where", label: "Where" }, { key: "service", label: "Service" }, { key: "ip", label: "IP address" }]
}, hh = ["where"], J0 = [], _h = "activity-hub-columns", xi = ["kind", "view", "p", "q", "range", "from", "to", "cols"], Pn = (s) => s ? "all" : "7d";
function vh(s, o) {
  const m = (N) => {
    const R = s.get(N) ?? "";
    return Vs(R) ? R : "";
  }, f = m("from"), g = m("to");
  return { q: s.get("q") ?? "", from: f, to: g, range: s.get("range") || (f || g ? "custom" : Pn(o)) };
}
function $0(s) {
  var m;
  if (s.range === "custom")
    return { occurred_from: Vs(s.from) ? Ks(s.from) : void 0, occurred_to: Vs(s.to) ? t0(s.to) : void 0 };
  const o = (m = Is.find((f) => f.value === s.range)) == null ? void 0 : m.minutes;
  return o ? { occurred_from: `${e0(o).slice(0, 16)}:00` } : {};
}
function W0(s, o, m, f, g) {
  const N = { ...(m == null ? void 0 : m.search.filters) ?? {} }, R = { kind: s, filters: N, query: f.q.trim() || void 0, ...$0(f) };
  return s === "events" ? (R.view = o, R.action = m == null ? void 0 : m.search.action, g && Object.assign(R, { related_type: g.type, related_id: g.id })) : (R.status_from = m == null ? void 0 : m.search.status_from, g && (N.actor_id = g.id)), R;
}
const F0 = (s) => {
  const o = new URLSearchParams();
  return s.forEach((m, f) => xi.includes(f) && o.set(f, m)), o.toString();
};
function P0() {
  try {
    return JSON.parse(localStorage.getItem(_h) ?? "null") ?? hh;
  } catch {
    return hh;
  }
}
function I0({
  request: s,
  title: o = "Activity Log",
  description: m,
  presets: f = J0,
  kinds: g = ["events", "requests"],
  entity: N,
  params: R,
  onParamsChange: w,
  canExport: E = !1,
  showStatus: x = !0,
  pageSize: U = 100,
  liveEveryMs: B = 5e3,
  className: q
}) {
  var Fl, ul, ha, su, Pl, Il, il;
  const [G, K] = X.useState(() => new URLSearchParams()), L = R ?? G, I = X.useCallback((j) => w ? w(j) : K(j), [w]), tt = L.get("kind") === "requests" && g.includes("requests") ? "requests" : g[0], _ = ((Fl = oh.find((j) => j.value === L.get("view"))) == null ? void 0 : Fl.value) ?? "important", H = X.useMemo(() => tt === "events" ? [{ label: "Everything", search: {} }, ...f] : K0, [tt, f]), F = Math.min(Math.max(Number(L.get("p")) || 0, 0), H.length - 1), $ = L.has("cols") ? (L.get("cols") || "").split(",").filter(Boolean) : P0(), it = dh[tt].filter((j) => $.includes(j.key)), C = X.useMemo(() => vh(L, N), [L, N]), [P, Rt] = X.useState(C), [Be, ae] = X.useState(L.toString());
  Be !== L.toString() && (ae(L.toString()), Rt(C));
  const [jt, be] = X.useState(!1), [De, wt] = X.useState(null), [A, Y] = X.useState(null), [et, gt] = X.useState(!1), [h, D] = X.useState(null), Q = X.useRef(null), [, k] = X.useState(0);
  X.useEffect(() => {
    const j = setInterval(() => k((ct) => ct + 1), 3e4);
    return () => clearInterval(j);
  }, []);
  const J = X.useMemo(
    () => W0(tt, _, H[F], C, N),
    [tt, _, H, F, C, N]
  ), ot = JSON.stringify(J), V = Jm(s, J, U, jt, B), Jt = X.useRef(null), yt = Me(ot, () => {
    var bt;
    const j = ot, ct = !J.occurred_from && ((bt = Jt.current) == null ? void 0 : bt.key) === j;
    return s("chart", { method: "POST", body: ct ? { ...J, occurred_from: Jt.current.from } : J }).then((nt) => (J.occurred_from || (Jt.current = { key: j, from: nt.occurred_from }), nt));
  }, jt ? B : void 0), ne = Me("catalog", () => s("catalog", { method: "GET" })), tl = Me(x ? "status" : null, () => s("status", { method: "GET" }), 6e4), Ye = Me(E && !N ? "streams" : null, () => s("streams", { method: "GET" }), 6e4), [el, Wl] = X.useState(!1), al = (j) => B0(j.received_at, fa(j) ? "events" : "access_logs", tl.data), tu = (j) => () => s("values", { method: "POST", body: { ...J, field: j } }).then((ct) => ct.values), Ni = Me(`${ot}|service`, tu("service")), xe = Me(`${ot}|origin`, tu("origin")), eu = (j = {}) => {
    const ct = new URLSearchParams(L);
    for (const Xt of xi) ct.delete(Xt);
    const bt = j.kind ?? tt;
    let nt = j.draft ?? P;
    if (bt !== tt) {
      const Xt = new Set(d0(bt));
      nt = { ...nt, q: Fn(nt.q).filter((Ue) => !Ue.field || Xt.has(Ue.field)).map((Ue) => Ue.text).join(" ") };
    }
    bt !== g[0] && ct.set("kind", bt), (j.view ?? _) !== "important" && ct.set("view", j.view ?? _);
    const Ot = j.preset ?? (j.kind && j.kind !== tt ? 0 : F);
    return Ot && ct.set("p", String(Ot)), nt.q.trim() && ct.set("q", nt.q.trim()), nt.range !== Pn(N) && ct.set("range", nt.range), nt.range === "custom" && (nt.from && ct.set("from", nt.from), nt.to && ct.set("to", nt.to)), (j.columns || L.has("cols")) && ct.set("cols", (j.columns ?? $).join(",")), ct;
  }, ue = (j = {}) => {
    j.draft && Rt(j.draft), I(eu(j));
  }, au = (j) => {
    try {
      localStorage.setItem(_h, JSON.stringify(j));
    } catch {
    }
    ue({ draft: C, columns: j });
  }, ll = (j, ct) => {
    const bt = Fn(C.q).filter((nt) => nt.field !== j).map((nt) => nt.text);
    ue({ draft: { ...C, q: [...bt, `${j}:${$s(ct)}`].join(" ") } });
  }, lu = (j) => {
    wt(null), j.actor_id ? ll("actor", j.actor_id) : j.target_type && j.target_id && ue({
      kind: "events",
      view: "all",
      preset: 0,
      draft: { q: `on:${j.target_type}:${$s(j.target_id)}`, range: "all", from: "", to: "" }
    });
  }, nu = (j) => {
    const ct = P.q.trim();
    Rt({ ...P, q: `${ct ? `${ct} ` : ""}${j}:` }), requestAnimationFrame(() => {
      const bt = Q.current;
      bt && (bt.focus(), bt.setSelectionRange(bt.value.length, bt.value.length));
    });
  }, _i = P.q.trim() !== C.q.trim() || P.range !== C.range || P.from !== C.from || P.to !== C.to, wa = !!(P.range === "custom" && P.from && P.to && P.to < P.from), Je = X.useRef(null), It = X.useRef(null), { hasMore: Re, loadMore: $t, more: Ge, pageCount: uu } = V;
  X.useEffect(() => {
    if (!Je.current || !Re || Ge.loading || Ge.error || uu >= Qs) return;
    const j = new IntersectionObserver(([ct]) => ct.isIntersecting && $t(), { root: It.current, rootMargin: "240px" });
    return j.observe(Je.current), () => j.disconnect();
  }, [Re, $t, Ge.loading, Ge.error, uu, V.rows.length]);
  const iu = async (j) => {
    gt(!1), Y(0);
    try {
      const { rows: ct, more: bt } = await u0(s, J, Y);
      bt && D(`Only the newest ${bi.toLocaleString()} rows were exported. Narrow the dates for the rest.`);
      const nt = (/* @__PURE__ */ new Date()).toISOString().slice(0, 16).replace(/[-:T]/g, ""), Ot = `activity-${N ? `${N.type}-${N.id}-` : ""}${tt}-${nt}`;
      j === "csv" ? Js(c0(tt, ct), `${Ot}.csv`, "text/csv;charset=utf-8") : Js(s0(ct), `${Ot}.jsonl`, "application/x-ndjson");
    } catch (ct) {
      D(`Export failed: ${ct.message}`);
    } finally {
      Y(null);
    }
  }, oa = tt === "events" ? "events" : "requests", da = ((ul = ne.data) == null ? void 0 : ul.actor_types) ?? {}, ke = ((ha = ne.data) == null ? void 0 : ha.entities) ?? {}, nl = (j) => {
    var ct, bt;
    if (j.field === "action") return ((bt = (ct = ne.data) == null ? void 0 : ct.actions[j.value]) == null ? void 0 : bt.title) ?? j.value;
    if (j.field === "actor_type") return da[j.value] ?? j.value;
    if (j.field === "on") {
      const [nt, ...Ot] = j.value.split(":");
      return `${ke[nt] ?? oe(nt)} ${Ot.join(":")}`;
    }
    return j.value;
  }, ie = V.rows, Ai = { service: Ni.data ?? [], origin: xe.data ?? [] }, cu = 3 + it.length;
  return N && !(N.type && N.id) ? /* @__PURE__ */ c.jsx("div", { className: Dt("ahv ahv-log", q), children: /* @__PURE__ */ c.jsxs(Kl, { children: [
    "Nothing to show: no ",
    N.type || "record",
    " chosen."
  ] }) }) : /* @__PURE__ */ c.jsxs("div", { className: Dt("ahv ahv-log", q), children: [
    /* @__PURE__ */ c.jsxs("header", { className: "ahv-head", children: [
      /* @__PURE__ */ c.jsxs("div", { children: [
        /* @__PURE__ */ c.jsxs("h2", { className: "ahv-title", children: [
          /* @__PURE__ */ c.jsx(At, { name: "log", size: 18 }),
          N && o === "Activity Log" ? "Activity" : o
        ] }),
        /* @__PURE__ */ c.jsx("p", { className: "ahv-dim", children: m ?? (N ? `Everything about ${N.label}, and the API requests it made itself. Times are UTC.` : "Every action and API request, kept permanently and sealed. Times are UTC.") })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: "ahv-actions", children: [
        !N && /* @__PURE__ */ c.jsx(
          X0,
          {
            request: s,
            current: F0(eu({ draft: C })),
            onOpen: (j) => {
              const ct = new URLSearchParams(L);
              for (const bt of xi) ct.delete(bt);
              new URLSearchParams(j).forEach((bt, nt) => xi.includes(nt) && ct.set(nt, bt)), I(ct);
            }
          }
        ),
        /* @__PURE__ */ c.jsx(L0, { columns: dh[tt], shown: $, onChange: au }),
        E && /* @__PURE__ */ c.jsxs(
          ur,
          {
            label: A === null ? "Export" : `Exporting… ${A.toLocaleString()}`,
            icon: "download",
            open: et,
            setOpen: gt,
            disabled: A !== null || !ie.length,
            children: [
              /* @__PURE__ */ c.jsx("button", { type: "button", role: "menuitem", onClick: () => iu("csv"), children: "CSV, for spreadsheets" }),
              /* @__PURE__ */ c.jsx("button", { type: "button", role: "menuitem", onClick: () => iu("jsonl"), children: "JSON Lines, for other tools" })
            ]
          }
        ),
        ((su = Ye.data) == null ? void 0 : su.enabled) && /* @__PURE__ */ c.jsxs(
          "button",
          {
            type: "button",
            className: "ahv-button",
            "aria-expanded": el,
            onClick: () => Wl((j) => !j),
            title: "Send the log to your own systems as it is written",
            children: [
              /* @__PURE__ */ c.jsx(At, { name: "send", size: 14 }),
              "Streams",
              Ye.data.streams.some((j) => j.state === "failing") && /* @__PURE__ */ c.jsx("span", { className: "ahv-count ahv-count-bad", children: "!" })
            ]
          }
        ),
        /* @__PURE__ */ c.jsxs(
          "button",
          {
            type: "button",
            className: Dt("ahv-button", jt && "ahv-button-live"),
            "aria-pressed": jt,
            title: "Check for new activity every few seconds",
            onClick: () => be((j) => !j),
            children: [
              /* @__PURE__ */ c.jsx(At, { name: "live", size: 14, className: Dt(jt && "ahv-pulse") }),
              jt ? "Live" : "Go live"
            ]
          }
        ),
        /* @__PURE__ */ c.jsxs(
          "button",
          {
            type: "button",
            className: "ahv-button",
            disabled: V.refreshing && !V.error,
            onClick: () => {
              V.refresh(), yt.refresh();
            },
            children: [
              /* @__PURE__ */ c.jsx(At, { name: "refresh", size: 14, className: Dt(V.refreshing && !jt && "ahv-spin") }),
              "Refresh"
            ]
          }
        )
      ] })
    ] }),
    el && ((Pl = Ye.data) == null ? void 0 : Pl.enabled) && /* @__PURE__ */ c.jsx(V0, { request: s, kinds: g, list: Ye.data, refresh: Ye.refresh }),
    x && !N && /* @__PURE__ */ c.jsx(Y0, { request: s, status: tl.data }),
    /* @__PURE__ */ c.jsxs("div", { className: "ahv-filters", children: [
      /* @__PURE__ */ c.jsxs("div", { className: "ahv-bar", children: [
        g.length > 1 && /* @__PURE__ */ c.jsx("div", { className: "ahv-segment", role: "group", "aria-label": "Records", children: g.map((j) => /* @__PURE__ */ c.jsx("button", { type: "button", "aria-pressed": tt === j, onClick: () => ue({ kind: j, draft: C }), children: j === "events" ? "Events" : "API requests" }, j)) }),
        tt === "events" && /* @__PURE__ */ c.jsx("div", { className: "ahv-segment", role: "group", "aria-label": "Show", children: oh.map((j) => /* @__PURE__ */ c.jsx(
          "button",
          {
            type: "button",
            title: j.hint,
            "aria-pressed": _ === j.value,
            onClick: () => ue({ view: j.value, draft: C }),
            children: j.label
          },
          j.value
        )) }),
        H.length > 1 && /* @__PURE__ */ c.jsx("div", { className: "ahv-chips", role: "group", "aria-label": "Presets", children: H.map((j, ct) => /* @__PURE__ */ c.jsx(
          "button",
          {
            type: "button",
            className: "ahv-chip",
            "aria-pressed": F === ct,
            onClick: () => ue({ preset: ct, draft: C }),
            children: j.label
          },
          j.label
        )) })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: "ahv-searchbar", children: [
        /* @__PURE__ */ c.jsx(
          k0,
          {
            value: P.q,
            inputRef: Q,
            onChange: (j) => Rt({ ...P, q: j }),
            onSubmit: () => !wa && ue({ draft: P }),
            suggestions: (j) => v0(j, tt, ne.data, Ai),
            placeholder: tt === "events" ? "Search: words, or actor:… action:trade.* -result:success on:account:100234" : "Search: words, or actor:… method:POST status:4xx route:/trading/*"
          }
        ),
        /* @__PURE__ */ c.jsx(
          "select",
          {
            className: "ahv-input ahv-range",
            value: P.range,
            "aria-label": "When",
            onChange: (j) => Rt({ ...P, range: j.target.value }),
            children: Is.map((j) => /* @__PURE__ */ c.jsx("option", { value: j.value, children: j.label }, j.value))
          }
        ),
        P.range === "custom" && /* @__PURE__ */ c.jsxs("span", { className: "ahv-pair", children: [
          /* @__PURE__ */ c.jsx(
            "input",
            {
              type: "date",
              className: "ahv-input",
              value: P.from,
              "aria-label": "From (UTC)",
              "aria-invalid": wa || void 0,
              onChange: (j) => Rt({ ...P, from: j.target.value })
            }
          ),
          /* @__PURE__ */ c.jsx(
            "input",
            {
              type: "date",
              className: "ahv-input",
              value: P.to,
              "aria-label": "To (UTC)",
              "aria-invalid": wa || void 0,
              onChange: (j) => Rt({ ...P, to: j.target.value })
            }
          )
        ] }),
        /* @__PURE__ */ c.jsx("button", { type: "button", className: "ahv-button ahv-button-main", disabled: wa, onClick: () => ue({ draft: P }), children: "Search" })
      ] }),
      wa && /* @__PURE__ */ c.jsx("em", { className: "ahv-bad ahv-small", children: "The end date is before the start date" }),
      /* @__PURE__ */ c.jsxs("div", { className: "ahv-bar ahv-add", children: [
        /* @__PURE__ */ c.jsx("span", { className: "ahv-dim ahv-small", children: "Add" }),
        ar(tt).filter((j) => !(N && (j.field === "on" || tt === "requests" && j.field === "actor"))).slice(0, 8).map((j) => /* @__PURE__ */ c.jsx("button", { type: "button", className: "ahv-link-button", title: j.hint, onClick: () => nu(j.field), children: j.label }, j.field)),
        _i && /* @__PURE__ */ c.jsx("span", { className: "ahv-warn ahv-small ahv-push-right", children: "Not searched yet: press Enter or Search" })
      ] }),
      (Fn(C.q).length > 0 || C.range !== Pn(N)) && /* @__PURE__ */ c.jsxs("div", { className: "ahv-applied", children: [
        Fn(C.q).map((j) => /* @__PURE__ */ c.jsxs("span", { className: Dt("ahv-pill", j.negated && "ahv-pill-not"), children: [
          /* @__PURE__ */ c.jsxs("span", { className: "ahv-dim", children: [
            j.negated ? "Not " : "",
            j.field ? `${h0(j.field)}:` : "Text:"
          ] }),
          " ",
          nl(j),
          /* @__PURE__ */ c.jsx("button", { type: "button", "aria-label": `Remove ${j.text}`, onClick: () => ue({ draft: { ...C, q: f0(C.q, j) } }), children: /* @__PURE__ */ c.jsx(At, { name: "close", size: 12 }) })
        ] }, j.text)),
        C.range !== Pn(N) && /* @__PURE__ */ c.jsxs("span", { className: "ahv-pill", children: [
          /* @__PURE__ */ c.jsx("span", { className: "ahv-dim", children: "When:" }),
          " ",
          C.range === "custom" ? [C.from && $l(He(Ks(C.from))), C.to && $l(He(Ks(C.to)))].filter(Boolean).join(" – ") || "Any date" : (Il = Is.find((j) => j.value === C.range)) == null ? void 0 : Il.label,
          /* @__PURE__ */ c.jsx(
            "button",
            {
              type: "button",
              "aria-label": "Remove the time range",
              onClick: () => ue({ draft: { ...C, range: Pn(N), from: "", to: "" } }),
              children: /* @__PURE__ */ c.jsx(At, { name: "close", size: 12 })
            }
          )
        ] }),
        /* @__PURE__ */ c.jsx("button", { type: "button", className: "ahv-link-button", onClick: () => ue({ preset: 0, draft: vh(new URLSearchParams(), N) }), children: "Clear all" })
      ] })
    ] }),
    yt.error && !yt.data ? null : /* @__PURE__ */ c.jsx(x0, { chart: yt.data, noun: oa, loading: yt.loading }),
    h && /* @__PURE__ */ c.jsx(Kl, { action: /* @__PURE__ */ c.jsx("button", { type: "button", className: "ahv-icon-button", "aria-label": "Dismiss", onClick: () => D(null), children: /* @__PURE__ */ c.jsx(At, { name: "close", size: 14 }) }), children: h }),
    V.error && ie.length > 0 && /* @__PURE__ */ c.jsxs(Kl, { tone: "bad", action: /* @__PURE__ */ c.jsx("button", { type: "button", className: "ahv-button", onClick: V.refresh, children: "Retry" }), children: [
      "Couldn't load newer activity: ",
      V.error.message
    ] }),
    V.error && !ie.length ? /* @__PURE__ */ c.jsx(Kl, { tone: "bad", action: /* @__PURE__ */ c.jsx("button", { type: "button", className: "ahv-button", onClick: V.refresh, children: "Retry" }), children: V.error.message }) : V.loading ? /* @__PURE__ */ c.jsx(nr, {}) : ie.length ? /* @__PURE__ */ c.jsxs("div", { className: "ahv-table-wrap", ref: It, children: [
      /* @__PURE__ */ c.jsxs("table", { className: "ahv-table", children: [
        /* @__PURE__ */ c.jsx("thead", { children: /* @__PURE__ */ c.jsxs("tr", { children: [
          /* @__PURE__ */ c.jsx("th", { children: "When (UTC)" }),
          /* @__PURE__ */ c.jsx("th", { children: "Who" }),
          /* @__PURE__ */ c.jsx("th", { children: tt === "events" ? "What happened" : "Request" }),
          it.map((j) => /* @__PURE__ */ c.jsx("th", { children: j.label }, j.key))
        ] }) }),
        /* @__PURE__ */ c.jsx("tbody", { children: ie.map((j, ct) => {
          var bt;
          return /* @__PURE__ */ c.jsxs(X.Fragment, { children: [
            j.occurred_at.slice(0, 10) !== ((bt = ie[ct - 1]) == null ? void 0 : bt.occurred_at.slice(0, 10)) && /* @__PURE__ */ c.jsx("tr", { className: "ahv-day", children: /* @__PURE__ */ c.jsx("td", { colSpan: cu, children: Fm(j.occurred_at) }) }),
            /* @__PURE__ */ c.jsxs(
              "tr",
              {
                tabIndex: 0,
                className: Dt("ahv-row", fa(j) && j.outcome !== "success" && "ahv-row-problem"),
                onClick: () => wt(j),
                onKeyDown: (nt) => {
                  nt.target === nt.currentTarget && (nt.key === "Enter" || nt.key === " ") && (nt.preventDefault(), wt(j));
                },
                children: [
                  /* @__PURE__ */ c.jsx("td", { children: /* @__PURE__ */ c.jsx(j0, { value: j.occurred_at, seal: al(j) }) }),
                  /* @__PURE__ */ c.jsx("td", { children: /* @__PURE__ */ c.jsx(
                    N0,
                    {
                      row: j,
                      actorTypes: da,
                      onFocus: N && tt === "requests" ? void 0 : () => lu({ actor_id: j.actor_id })
                    }
                  ) }),
                  /* @__PURE__ */ c.jsx("td", { children: fa(j) ? /* @__PURE__ */ c.jsx(z0, { row: j }) : /* @__PURE__ */ c.jsx(jh, { row: j }) }),
                  it.map((nt) => /* @__PURE__ */ c.jsx("td", { className: "ahv-cell", children: nt.key === "where" ? /* @__PURE__ */ c.jsx(_0, { row: j }) : nt.key === "service" ? /* @__PURE__ */ c.jsx("span", { className: "ahv-dim", children: oe(j.service) }) : nt.key === "ip" ? /* @__PURE__ */ c.jsx("span", { className: "ahv-mono ahv-dim", children: j.ip || "—" }) : fa(j) ? nt.key === "result" ? j.outcome === "success" ? /* @__PURE__ */ c.jsx("span", { className: "ahv-dim", children: "success" }) : /* @__PURE__ */ c.jsx(lr, { outcome: j.outcome }) : j.target_type ? /* @__PURE__ */ c.jsxs("span", { children: [
                    ke[j.target_type] ?? oe(j.target_type),
                    " ",
                    /* @__PURE__ */ c.jsx("span", { className: "ahv-mono", children: j.target_name || j.target_id })
                  ] }) : "—" : null }, nt.key))
                ]
              }
            )
          ] }, j.id);
        }) })
      ] }),
      /* @__PURE__ */ c.jsx("div", { ref: Je, "aria-hidden": "true" })
    ] }) : /* @__PURE__ */ c.jsxs("div", { className: "ahv-empty", children: [
      /* @__PURE__ */ c.jsx(At, { name: "log", size: 28 }),
      /* @__PURE__ */ c.jsxs("strong", { children: [
        "No ",
        oa,
        " match"
      ] }),
      /* @__PURE__ */ c.jsx("span", { className: "ahv-dim", children: tt === "events" && _ === "important" ? "Try All, or a wider time range." : "Try a wider time range or fewer filters." })
    ] }),
    ie.length > 0 && /* @__PURE__ */ c.jsxs("footer", { className: "ahv-foot", children: [
      /* @__PURE__ */ c.jsxs("span", { className: "ahv-dim ahv-num", children: [
        a0(ie.length, oa.slice(0, -1)),
        " shown",
        jt ? " · Live keeps the newest page" : V.trimmed ? " · the newest were let go to keep the list light; Refresh brings them back" : V.hasMore ? "" : " · that is all of them"
      ] }),
      Ge.error && /* @__PURE__ */ c.jsxs("span", { className: "ahv-bad ahv-small", children: [
        "Couldn't load more: ",
        Ge.error.message
      ] }),
      V.hasMore && /* @__PURE__ */ c.jsx("button", { type: "button", className: "ahv-button", onClick: $t, disabled: Ge.loading, children: Ge.loading ? "Loading…" : "Load more" })
    ] }),
    /* @__PURE__ */ c.jsx(
      Eh,
      {
        request: s,
        row: De,
        onClose: () => wt(null),
        onFocus: N ? void 0 : lu,
        actorTypes: da,
        entities: (il = ne.data) == null ? void 0 : il.entities,
        seal: De ? al(De) : null
      }
    )
  ] });
}
const mh = 500;
function tp({ request: s, entity: o, view: m = "all", action: f, newestFirst: g = !1, more: N, className: R }) {
  var K, L, I, tt;
  const w = o.type && o.id ? `${o.type}:${o.id}:${m}:${f ?? ""}` : null, E = Me(w, () => s("search", {
    method: "POST",
    body: { kind: "events", filters: {}, related_type: o.type, related_id: o.id, view: m, action: f, limit: mh }
  })), x = Me("catalog", () => s("catalog", { method: "GET" })), [U, B] = X.useState(null), q = ((K = E.data) == null ? void 0 : K.items) ?? [], G = g ? q : [...q].reverse();
  return /* @__PURE__ */ c.jsxs("div", { className: Dt("ahv ahv-timeline", R), children: [
    E.error ? /* @__PURE__ */ c.jsxs(Kl, { tone: "bad", action: /* @__PURE__ */ c.jsx("button", { type: "button", className: "ahv-button", onClick: E.refresh, children: "Retry" }), children: [
      "Couldn't load: ",
      E.error.message
    ] }) : E.loading && !E.data ? /* @__PURE__ */ c.jsx(nr, { rows: 4 }) : G.length ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
      ((L = E.data) == null ? void 0 : L.next_cursor) && /* @__PURE__ */ c.jsxs("p", { className: "ahv-dim ahv-small", children: [
        "Showing the newest ",
        mh,
        " steps.",
        N && /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
          " ",
          N
        ] })
      ] }),
      /* @__PURE__ */ c.jsx("ol", { className: "ahv-steps", children: G.map((_) => {
        var $;
        const H = _.outcome === "failed" ? "bad" : _.outcome === "refused" ? "warn" : _.importance === "high" ? "accent" : "plain", F = _.children_count ?? (($ = _.children) == null ? void 0 : $.length) ?? 0;
        return /* @__PURE__ */ c.jsxs("li", { className: `ahv-step ahv-step-${H}`, children: [
          /* @__PURE__ */ c.jsx("span", { className: "ahv-step-dot", "aria-hidden": "true" }),
          /* @__PURE__ */ c.jsxs("button", { type: "button", className: "ahv-step-body", onClick: () => B(_), children: [
            /* @__PURE__ */ c.jsxs("span", { className: "ahv-step-top", children: [
              /* @__PURE__ */ c.jsx("span", { className: "ahv-strong", children: _.title }),
              /* @__PURE__ */ c.jsxs("span", { className: "ahv-dim ahv-num", title: `${_.occurred_at} UTC`, children: [
                $l(He(_.occurred_at)),
                ", ",
                Ei(_.occurred_at),
                " · ",
                er(_.occurred_at)
              ] })
            ] }),
            /* @__PURE__ */ c.jsx("span", { className: "ahv-sentence", children: _.summary }),
            /* @__PURE__ */ c.jsxs("span", { className: "ahv-dim ahv-small", children: [
              [`${_.actor} · ${_.actor_label}`, _.origin && oe(_.origin), _.country, _.ip].filter(Boolean).join(" · "),
              F > 0 && /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
                " · ",
                /* @__PURE__ */ c.jsx(At, { name: "layers", size: 12 }),
                " ",
                F,
                " record change",
                F === 1 ? "" : "s"
              ] })
            ] })
          ] })
        ] }, _.id);
      }) })
    ] }) : /* @__PURE__ */ c.jsx("p", { className: "ahv-dim", children: "Nothing has been recorded about this yet." }),
    /* @__PURE__ */ c.jsx(
      Eh,
      {
        request: s,
        row: U,
        onClose: () => B(null),
        actorTypes: (I = x.data) == null ? void 0 : I.actor_types,
        entities: (tt = x.data) == null ? void 0 : tt.entities
      }
    )
  ] });
}
const ir = class ir extends HTMLElement {
  get request() {
    return this.requester;
  }
  set request(o) {
    this.requester = o, this.render();
  }
  connectedCallback() {
    if (!this.root) {
      const o = this.shadowRoot ?? this.attachShadow({ mode: "open" }), m = document.createElement("style");
      m.textContent = Vm;
      const f = document.createElement("div");
      this.panel = document.createElement("div"), o.replaceChildren(m, f, this.panel), this.root = Zm.createRoot(f);
      const g = document.documentElement, N = () => {
        var w;
        const R = g.classList.contains("dark") || g.dataset.theme === "dark";
        f.classList.toggle("ahv-dark-host", R), (w = this.panel) == null || w.classList.toggle("ahv-dark-host", R);
      };
      N(), this.theme = new MutationObserver(N), this.theme.observe(g, { attributes: !0, attributeFilter: ["class", "data-theme"] });
    }
    this.render();
  }
  disconnectedCallback() {
    var o, m, f;
    (o = this.theme) == null || o.disconnect(), (m = this.root) == null || m.unmount(), this.root = void 0, (f = this.shadowRoot) == null || f.replaceChildren();
  }
  attributeChangedCallback() {
    this.render();
  }
  render() {
    !this.root || !this.requester || this.root.render(/* @__PURE__ */ c.jsx(Th.Provider, { value: this.panel ?? null, children: this.view(this.requester) }));
  }
};
ir.observedAttributes = [
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
let ji = ir;
class ep extends ji {
  view(o) {
    const m = this.getAttribute("entity-type"), f = this.getAttribute("entity-id"), g = (this.getAttribute("kinds") || "events,requests").split(",").map((N) => N.trim());
    return /* @__PURE__ */ c.jsx(
      I0,
      {
        request: o,
        title: this.getAttribute("title") || void 0,
        kinds: g,
        canExport: this.hasAttribute("can-export"),
        showStatus: !this.hasAttribute("no-status"),
        entity: m && f ? { type: m, id: f, label: this.getAttribute("entity-label") || `${m} ${f}` } : void 0
      }
    );
  }
}
class ap extends ji {
  view(o) {
    return /* @__PURE__ */ c.jsx(
      tp,
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
customElements.get("activity-log") || customElements.define("activity-log", ep);
customElements.get("activity-timeline") || customElements.define("activity-timeline", ap);
