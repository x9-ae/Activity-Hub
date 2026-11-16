var Hs = { exports: {} }, Wn = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var $d;
function Cm() {
  if ($d) return Wn;
  $d = 1;
  var c = Symbol.for("react.transitional.element"), o = Symbol.for("react.fragment");
  function m(f, b, E) {
    var M = null;
    if (E !== void 0 && (M = "" + E), b.key !== void 0 && (M = "" + b.key), "key" in b) {
      E = {};
      for (var q in b)
        q !== "key" && (E[q] = b[q]);
    } else E = b;
    return b = E.ref, {
      $$typeof: c,
      type: f,
      key: M,
      ref: b !== void 0 ? b : null,
      props: E
    };
  }
  return Wn.Fragment = o, Wn.jsx = m, Wn.jsxs = m, Wn;
}
var Wd;
function Hm() {
  return Wd || (Wd = 1, Hs.exports = Cm()), Hs.exports;
}
var s = Hm(), Bs = { exports: {} }, Fn = {}, Ys = { exports: {} }, Gs = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Fd;
function Bm() {
  return Fd || (Fd = 1, (function(c) {
    function o(N, B) {
      var I = N.length;
      N.push(B);
      t: for (; 0 < I; ) {
        var bt = I - 1 >>> 1, h = N[bt];
        if (0 < b(h, B))
          N[bt] = B, N[I] = h, I = bt;
        else break t;
      }
    }
    function m(N) {
      return N.length === 0 ? null : N[0];
    }
    function f(N) {
      if (N.length === 0) return null;
      var B = N[0], I = N.pop();
      if (I !== B) {
        N[0] = I;
        t: for (var bt = 0, h = N.length, D = h >>> 1; bt < D; ) {
          var X = 2 * (bt + 1) - 1, Y = N[X], K = X + 1, ft = N[K];
          if (0 > b(Y, I))
            K < h && 0 > b(ft, Y) ? (N[bt] = ft, N[K] = I, bt = K) : (N[bt] = Y, N[X] = I, bt = X);
          else if (K < h && 0 > b(ft, I))
            N[bt] = ft, N[K] = I, bt = K;
          else break t;
        }
      }
      return B;
    }
    function b(N, B) {
      var I = N.sortIndex - B.sortIndex;
      return I !== 0 ? I : N.id - B.id;
    }
    if (c.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var E = performance;
      c.unstable_now = function() {
        return E.now();
      };
    } else {
      var M = Date, q = M.now();
      c.unstable_now = function() {
        return M.now() - q;
      };
    }
    var _ = [], j = [], R = 1, H = null, U = 3, C = !1, Q = !1, k = !1, et = !1, at = typeof setTimeout == "function" ? setTimeout : null, vt = typeof clearTimeout == "function" ? clearTimeout : null, L = typeof setImmediate < "u" ? setImmediate : null;
    function F(N) {
      for (var B = m(j); B !== null; ) {
        if (B.callback === null) f(j);
        else if (B.startTime <= N)
          f(j), B.sortIndex = B.expirationTime, o(_, B);
        else break;
        B = m(j);
      }
    }
    function J(N) {
      if (k = !1, F(N), !Q)
        if (m(_) !== null)
          Q = !0, nt || (nt = !0, Tt());
        else {
          var B = m(j);
          B !== null && wt(J, B.startTime - N);
        }
    }
    var nt = !1, w = -1, W = 5, Ot = -1;
    function Kt() {
      return et ? !0 : !(c.unstable_now() - Ot < W);
    }
    function Jt() {
      if (et = !1, nt) {
        var N = c.unstable_now();
        Ot = N;
        var B = !0;
        try {
          t: {
            Q = !1, k && (k = !1, vt(w), w = -1), C = !0;
            var I = U;
            try {
              a: {
                for (F(N), H = m(_); H !== null && !(H.expirationTime > N && Kt()); ) {
                  var bt = H.callback;
                  if (typeof bt == "function") {
                    H.callback = null, U = H.priorityLevel;
                    var h = bt(
                      H.expirationTime <= N
                    );
                    if (N = c.unstable_now(), typeof h == "function") {
                      H.callback = h, F(N), B = !0;
                      break a;
                    }
                    H === m(_) && f(_), F(N);
                  } else f(_);
                  H = m(_);
                }
                if (H !== null) B = !0;
                else {
                  var D = m(j);
                  D !== null && wt(
                    J,
                    D.startTime - N
                  ), B = !1;
                }
              }
              break t;
            } finally {
              H = null, U = I, C = !1;
            }
            B = void 0;
          }
        } finally {
          B ? Tt() : nt = !1;
        }
      }
    }
    var Tt;
    if (typeof L == "function")
      Tt = function() {
        L(Jt);
      };
    else if (typeof MessageChannel < "u") {
      var ba = new MessageChannel(), Ra = ba.port2;
      ba.port1.onmessage = Jt, Tt = function() {
        Ra.postMessage(null);
      };
    } else
      Tt = function() {
        at(Jt, 0);
      };
    function wt(N, B) {
      w = at(function() {
        N(c.unstable_now());
      }, B);
    }
    c.unstable_IdlePriority = 5, c.unstable_ImmediatePriority = 1, c.unstable_LowPriority = 4, c.unstable_NormalPriority = 3, c.unstable_Profiling = null, c.unstable_UserBlockingPriority = 2, c.unstable_cancelCallback = function(N) {
      N.callback = null;
    }, c.unstable_forceFrameRate = function(N) {
      0 > N || 125 < N ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : W = 0 < N ? Math.floor(1e3 / N) : 5;
    }, c.unstable_getCurrentPriorityLevel = function() {
      return U;
    }, c.unstable_next = function(N) {
      switch (U) {
        case 1:
        case 2:
        case 3:
          var B = 3;
          break;
        default:
          B = U;
      }
      var I = U;
      U = B;
      try {
        return N();
      } finally {
        U = I;
      }
    }, c.unstable_requestPaint = function() {
      et = !0;
    }, c.unstable_runWithPriority = function(N, B) {
      switch (N) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          N = 3;
      }
      var I = U;
      U = N;
      try {
        return B();
      } finally {
        U = I;
      }
    }, c.unstable_scheduleCallback = function(N, B, I) {
      var bt = c.unstable_now();
      switch (typeof I == "object" && I !== null ? (I = I.delay, I = typeof I == "number" && 0 < I ? bt + I : bt) : I = bt, N) {
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
      return h = I + h, N = {
        id: R++,
        callback: B,
        priorityLevel: N,
        startTime: I,
        expirationTime: h,
        sortIndex: -1
      }, I > bt ? (N.sortIndex = I, o(j, N), m(_) === null && N === m(j) && (k ? (vt(w), w = -1) : k = !0, wt(J, I - bt))) : (N.sortIndex = h, o(_, N), Q || C || (Q = !0, nt || (nt = !0, Tt()))), N;
    }, c.unstable_shouldYield = Kt, c.unstable_wrapCallback = function(N) {
      var B = U;
      return function() {
        var I = U;
        U = B;
        try {
          return N.apply(this, arguments);
        } finally {
          U = I;
        }
      };
    };
  })(Gs)), Gs;
}
var Id;
function Ym() {
  return Id || (Id = 1, Ys.exports = Bm()), Ys.exports;
}
var Ls = { exports: {} }, ct = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Pd;
function Gm() {
  if (Pd) return ct;
  Pd = 1;
  var c = Symbol.for("react.transitional.element"), o = Symbol.for("react.portal"), m = Symbol.for("react.fragment"), f = Symbol.for("react.strict_mode"), b = Symbol.for("react.profiler"), E = Symbol.for("react.consumer"), M = Symbol.for("react.context"), q = Symbol.for("react.forward_ref"), _ = Symbol.for("react.suspense"), j = Symbol.for("react.memo"), R = Symbol.for("react.lazy"), H = Symbol.iterator;
  function U(h) {
    return h === null || typeof h != "object" ? null : (h = H && h[H] || h["@@iterator"], typeof h == "function" ? h : null);
  }
  var C = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, Q = Object.assign, k = {};
  function et(h, D, X) {
    this.props = h, this.context = D, this.refs = k, this.updater = X || C;
  }
  et.prototype.isReactComponent = {}, et.prototype.setState = function(h, D) {
    if (typeof h != "object" && typeof h != "function" && h != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, h, D, "setState");
  }, et.prototype.forceUpdate = function(h) {
    this.updater.enqueueForceUpdate(this, h, "forceUpdate");
  };
  function at() {
  }
  at.prototype = et.prototype;
  function vt(h, D, X) {
    this.props = h, this.context = D, this.refs = k, this.updater = X || C;
  }
  var L = vt.prototype = new at();
  L.constructor = vt, Q(L, et.prototype), L.isPureReactComponent = !0;
  var F = Array.isArray, J = { H: null, A: null, T: null, S: null, V: null }, nt = Object.prototype.hasOwnProperty;
  function w(h, D, X, Y, K, ft) {
    return X = ft.ref, {
      $$typeof: c,
      type: h,
      key: D,
      ref: X !== void 0 ? X : null,
      props: ft
    };
  }
  function W(h, D) {
    return w(
      h.type,
      D,
      void 0,
      void 0,
      void 0,
      h.props
    );
  }
  function Ot(h) {
    return typeof h == "object" && h !== null && h.$$typeof === c;
  }
  function Kt(h) {
    var D = { "=": "=0", ":": "=2" };
    return "$" + h.replace(/[=:]/g, function(X) {
      return D[X];
    });
  }
  var Jt = /\/+/g;
  function Tt(h, D) {
    return typeof h == "object" && h !== null && h.key != null ? Kt("" + h.key) : D.toString(36);
  }
  function ba() {
  }
  function Ra(h) {
    switch (h.status) {
      case "fulfilled":
        return h.value;
      case "rejected":
        throw h.reason;
      default:
        switch (typeof h.status == "string" ? h.then(ba, ba) : (h.status = "pending", h.then(
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
  function wt(h, D, X, Y, K) {
    var ft = typeof h;
    (ft === "undefined" || ft === "boolean") && (h = null);
    var V = !1;
    if (h === null) V = !0;
    else
      switch (ft) {
        case "bigint":
        case "string":
        case "number":
          V = !0;
          break;
        case "object":
          switch (h.$$typeof) {
            case c:
            case o:
              V = !0;
              break;
            case R:
              return V = h._init, wt(
                V(h._payload),
                D,
                X,
                Y,
                K
              );
          }
      }
    if (V)
      return K = K(h), V = Y === "" ? "." + Tt(h, 0) : Y, F(K) ? (X = "", V != null && (X = V.replace(Jt, "$&/") + "/"), wt(K, D, X, "", function(Ba) {
        return Ba;
      })) : K != null && (Ot(K) && (K = W(
        K,
        X + (K.key == null || h && h.key === K.key ? "" : ("" + K.key).replace(
          Jt,
          "$&/"
        ) + "/") + V
      )), D.push(K)), 1;
    V = 0;
    var $t = Y === "" ? "." : Y + ":";
    if (F(h))
      for (var pt = 0; pt < h.length; pt++)
        Y = h[pt], ft = $t + Tt(Y, pt), V += wt(
          Y,
          D,
          X,
          ft,
          K
        );
    else if (pt = U(h), typeof pt == "function")
      for (h = pt.call(h), pt = 0; !(Y = h.next()).done; )
        Y = Y.value, ft = $t + Tt(Y, pt++), V += wt(
          Y,
          D,
          X,
          ft,
          K
        );
    else if (ft === "object") {
      if (typeof h.then == "function")
        return wt(
          Ra(h),
          D,
          X,
          Y,
          K
        );
      throw D = String(h), Error(
        "Objects are not valid as a React child (found: " + (D === "[object Object]" ? "object with keys {" + Object.keys(h).join(", ") + "}" : D) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return V;
  }
  function N(h, D, X) {
    if (h == null) return h;
    var Y = [], K = 0;
    return wt(h, Y, "", "", function(ft) {
      return D.call(X, ft, K++);
    }), Y;
  }
  function B(h) {
    if (h._status === -1) {
      var D = h._result;
      D = D(), D.then(
        function(X) {
          (h._status === 0 || h._status === -1) && (h._status = 1, h._result = X);
        },
        function(X) {
          (h._status === 0 || h._status === -1) && (h._status = 2, h._result = X);
        }
      ), h._status === -1 && (h._status = 0, h._result = D);
    }
    if (h._status === 1) return h._result.default;
    throw h._result;
  }
  var I = typeof reportError == "function" ? reportError : function(h) {
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
  function bt() {
  }
  return ct.Children = {
    map: N,
    forEach: function(h, D, X) {
      N(
        h,
        function() {
          D.apply(this, arguments);
        },
        X
      );
    },
    count: function(h) {
      var D = 0;
      return N(h, function() {
        D++;
      }), D;
    },
    toArray: function(h) {
      return N(h, function(D) {
        return D;
      }) || [];
    },
    only: function(h) {
      if (!Ot(h))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return h;
    }
  }, ct.Component = et, ct.Fragment = m, ct.Profiler = b, ct.PureComponent = vt, ct.StrictMode = f, ct.Suspense = _, ct.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = J, ct.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(h) {
      return J.H.useMemoCache(h);
    }
  }, ct.cache = function(h) {
    return function() {
      return h.apply(null, arguments);
    };
  }, ct.cloneElement = function(h, D, X) {
    if (h == null)
      throw Error(
        "The argument must be a React element, but you passed " + h + "."
      );
    var Y = Q({}, h.props), K = h.key, ft = void 0;
    if (D != null)
      for (V in D.ref !== void 0 && (ft = void 0), D.key !== void 0 && (K = "" + D.key), D)
        !nt.call(D, V) || V === "key" || V === "__self" || V === "__source" || V === "ref" && D.ref === void 0 || (Y[V] = D[V]);
    var V = arguments.length - 2;
    if (V === 1) Y.children = X;
    else if (1 < V) {
      for (var $t = Array(V), pt = 0; pt < V; pt++)
        $t[pt] = arguments[pt + 2];
      Y.children = $t;
    }
    return w(h.type, K, void 0, void 0, ft, Y);
  }, ct.createContext = function(h) {
    return h = {
      $$typeof: M,
      _currentValue: h,
      _currentValue2: h,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, h.Provider = h, h.Consumer = {
      $$typeof: E,
      _context: h
    }, h;
  }, ct.createElement = function(h, D, X) {
    var Y, K = {}, ft = null;
    if (D != null)
      for (Y in D.key !== void 0 && (ft = "" + D.key), D)
        nt.call(D, Y) && Y !== "key" && Y !== "__self" && Y !== "__source" && (K[Y] = D[Y]);
    var V = arguments.length - 2;
    if (V === 1) K.children = X;
    else if (1 < V) {
      for (var $t = Array(V), pt = 0; pt < V; pt++)
        $t[pt] = arguments[pt + 2];
      K.children = $t;
    }
    if (h && h.defaultProps)
      for (Y in V = h.defaultProps, V)
        K[Y] === void 0 && (K[Y] = V[Y]);
    return w(h, ft, void 0, void 0, null, K);
  }, ct.createRef = function() {
    return { current: null };
  }, ct.forwardRef = function(h) {
    return { $$typeof: q, render: h };
  }, ct.isValidElement = Ot, ct.lazy = function(h) {
    return {
      $$typeof: R,
      _payload: { _status: -1, _result: h },
      _init: B
    };
  }, ct.memo = function(h, D) {
    return {
      $$typeof: j,
      type: h,
      compare: D === void 0 ? null : D
    };
  }, ct.startTransition = function(h) {
    var D = J.T, X = {};
    J.T = X;
    try {
      var Y = h(), K = J.S;
      K !== null && K(X, Y), typeof Y == "object" && Y !== null && typeof Y.then == "function" && Y.then(bt, I);
    } catch (ft) {
      I(ft);
    } finally {
      J.T = D;
    }
  }, ct.unstable_useCacheRefresh = function() {
    return J.H.useCacheRefresh();
  }, ct.use = function(h) {
    return J.H.use(h);
  }, ct.useActionState = function(h, D, X) {
    return J.H.useActionState(h, D, X);
  }, ct.useCallback = function(h, D) {
    return J.H.useCallback(h, D);
  }, ct.useContext = function(h) {
    return J.H.useContext(h);
  }, ct.useDebugValue = function() {
  }, ct.useDeferredValue = function(h, D) {
    return J.H.useDeferredValue(h, D);
  }, ct.useEffect = function(h, D, X) {
    var Y = J.H;
    if (typeof X == "function")
      throw Error(
        "useEffect CRUD overload is not enabled in this build of React."
      );
    return Y.useEffect(h, D);
  }, ct.useId = function() {
    return J.H.useId();
  }, ct.useImperativeHandle = function(h, D, X) {
    return J.H.useImperativeHandle(h, D, X);
  }, ct.useInsertionEffect = function(h, D) {
    return J.H.useInsertionEffect(h, D);
  }, ct.useLayoutEffect = function(h, D) {
    return J.H.useLayoutEffect(h, D);
  }, ct.useMemo = function(h, D) {
    return J.H.useMemo(h, D);
  }, ct.useOptimistic = function(h, D) {
    return J.H.useOptimistic(h, D);
  }, ct.useReducer = function(h, D, X) {
    return J.H.useReducer(h, D, X);
  }, ct.useRef = function(h) {
    return J.H.useRef(h);
  }, ct.useState = function(h) {
    return J.H.useState(h);
  }, ct.useSyncExternalStore = function(h, D, X) {
    return J.H.useSyncExternalStore(
      h,
      D,
      X
    );
  }, ct.useTransition = function() {
    return J.H.useTransition();
  }, ct.version = "19.1.0", ct;
}
var th;
function tr() {
  return th || (th = 1, Ls.exports = Gm()), Ls.exports;
}
var Xs = { exports: {} }, ea = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ah;
function Lm() {
  if (ah) return ea;
  ah = 1;
  var c = tr();
  function o(_) {
    var j = "https://react.dev/errors/" + _;
    if (1 < arguments.length) {
      j += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var R = 2; R < arguments.length; R++)
        j += "&args[]=" + encodeURIComponent(arguments[R]);
    }
    return "Minified React error #" + _ + "; visit " + j + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
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
  }, b = Symbol.for("react.portal");
  function E(_, j, R) {
    var H = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: b,
      key: H == null ? null : "" + H,
      children: _,
      containerInfo: j,
      implementation: R
    };
  }
  var M = c.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function q(_, j) {
    if (_ === "font") return "";
    if (typeof j == "string")
      return j === "use-credentials" ? j : "";
  }
  return ea.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = f, ea.createPortal = function(_, j) {
    var R = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!j || j.nodeType !== 1 && j.nodeType !== 9 && j.nodeType !== 11)
      throw Error(o(299));
    return E(_, j, null, R);
  }, ea.flushSync = function(_) {
    var j = M.T, R = f.p;
    try {
      if (M.T = null, f.p = 2, _) return _();
    } finally {
      M.T = j, f.p = R, f.d.f();
    }
  }, ea.preconnect = function(_, j) {
    typeof _ == "string" && (j ? (j = j.crossOrigin, j = typeof j == "string" ? j === "use-credentials" ? j : "" : void 0) : j = null, f.d.C(_, j));
  }, ea.prefetchDNS = function(_) {
    typeof _ == "string" && f.d.D(_);
  }, ea.preinit = function(_, j) {
    if (typeof _ == "string" && j && typeof j.as == "string") {
      var R = j.as, H = q(R, j.crossOrigin), U = typeof j.integrity == "string" ? j.integrity : void 0, C = typeof j.fetchPriority == "string" ? j.fetchPriority : void 0;
      R === "style" ? f.d.S(
        _,
        typeof j.precedence == "string" ? j.precedence : void 0,
        {
          crossOrigin: H,
          integrity: U,
          fetchPriority: C
        }
      ) : R === "script" && f.d.X(_, {
        crossOrigin: H,
        integrity: U,
        fetchPriority: C,
        nonce: typeof j.nonce == "string" ? j.nonce : void 0
      });
    }
  }, ea.preinitModule = function(_, j) {
    if (typeof _ == "string")
      if (typeof j == "object" && j !== null) {
        if (j.as == null || j.as === "script") {
          var R = q(
            j.as,
            j.crossOrigin
          );
          f.d.M(_, {
            crossOrigin: R,
            integrity: typeof j.integrity == "string" ? j.integrity : void 0,
            nonce: typeof j.nonce == "string" ? j.nonce : void 0
          });
        }
      } else j == null && f.d.M(_);
  }, ea.preload = function(_, j) {
    if (typeof _ == "string" && typeof j == "object" && j !== null && typeof j.as == "string") {
      var R = j.as, H = q(R, j.crossOrigin);
      f.d.L(_, R, {
        crossOrigin: H,
        integrity: typeof j.integrity == "string" ? j.integrity : void 0,
        nonce: typeof j.nonce == "string" ? j.nonce : void 0,
        type: typeof j.type == "string" ? j.type : void 0,
        fetchPriority: typeof j.fetchPriority == "string" ? j.fetchPriority : void 0,
        referrerPolicy: typeof j.referrerPolicy == "string" ? j.referrerPolicy : void 0,
        imageSrcSet: typeof j.imageSrcSet == "string" ? j.imageSrcSet : void 0,
        imageSizes: typeof j.imageSizes == "string" ? j.imageSizes : void 0,
        media: typeof j.media == "string" ? j.media : void 0
      });
    }
  }, ea.preloadModule = function(_, j) {
    if (typeof _ == "string")
      if (j) {
        var R = q(j.as, j.crossOrigin);
        f.d.m(_, {
          as: typeof j.as == "string" && j.as !== "script" ? j.as : void 0,
          crossOrigin: R,
          integrity: typeof j.integrity == "string" ? j.integrity : void 0
        });
      } else f.d.m(_);
  }, ea.requestFormReset = function(_) {
    f.d.r(_);
  }, ea.unstable_batchedUpdates = function(_, j) {
    return _(j);
  }, ea.useFormState = function(_, j, R) {
    return M.H.useFormState(_, j, R);
  }, ea.useFormStatus = function() {
    return M.H.useHostTransitionStatus();
  }, ea.version = "19.1.0", ea;
}
var eh;
function dh() {
  if (eh) return Xs.exports;
  eh = 1;
  function c() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(c);
      } catch (o) {
        console.error(o);
      }
  }
  return c(), Xs.exports = Lm(), Xs.exports;
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
var lh;
function Xm() {
  if (lh) return Fn;
  lh = 1;
  var c = Ym(), o = tr(), m = dh();
  function f(t) {
    var a = "https://react.dev/errors/" + t;
    if (1 < arguments.length) {
      a += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var e = 2; e < arguments.length; e++)
        a += "&args[]=" + encodeURIComponent(arguments[e]);
    }
    return "Minified React error #" + t + "; visit " + a + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function b(t) {
    return !(!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11);
  }
  function E(t) {
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
  function M(t) {
    if (t.tag === 13) {
      var a = t.memoizedState;
      if (a === null && (t = t.alternate, t !== null && (a = t.memoizedState)), a !== null) return a.dehydrated;
    }
    return null;
  }
  function q(t) {
    if (E(t) !== t)
      throw Error(f(188));
  }
  function _(t) {
    var a = t.alternate;
    if (!a) {
      if (a = E(t), a === null) throw Error(f(188));
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
          if (u === e) return q(n), t;
          if (u === l) return q(n), a;
          u = u.sibling;
        }
        throw Error(f(188));
      }
      if (e.return !== l.return) e = n, l = u;
      else {
        for (var i = !1, r = n.child; r; ) {
          if (r === e) {
            i = !0, e = n, l = u;
            break;
          }
          if (r === l) {
            i = !0, l = n, e = u;
            break;
          }
          r = r.sibling;
        }
        if (!i) {
          for (r = u.child; r; ) {
            if (r === e) {
              i = !0, e = u, l = n;
              break;
            }
            if (r === l) {
              i = !0, l = u, e = n;
              break;
            }
            r = r.sibling;
          }
          if (!i) throw Error(f(189));
        }
      }
      if (e.alternate !== l) throw Error(f(190));
    }
    if (e.tag !== 3) throw Error(f(188));
    return e.stateNode.current === e ? t : a;
  }
  function j(t) {
    var a = t.tag;
    if (a === 5 || a === 26 || a === 27 || a === 6) return t;
    for (t = t.child; t !== null; ) {
      if (a = j(t), a !== null) return a;
      t = t.sibling;
    }
    return null;
  }
  var R = Object.assign, H = Symbol.for("react.element"), U = Symbol.for("react.transitional.element"), C = Symbol.for("react.portal"), Q = Symbol.for("react.fragment"), k = Symbol.for("react.strict_mode"), et = Symbol.for("react.profiler"), at = Symbol.for("react.provider"), vt = Symbol.for("react.consumer"), L = Symbol.for("react.context"), F = Symbol.for("react.forward_ref"), J = Symbol.for("react.suspense"), nt = Symbol.for("react.suspense_list"), w = Symbol.for("react.memo"), W = Symbol.for("react.lazy"), Ot = Symbol.for("react.activity"), Kt = Symbol.for("react.memo_cache_sentinel"), Jt = Symbol.iterator;
  function Tt(t) {
    return t === null || typeof t != "object" ? null : (t = Jt && t[Jt] || t["@@iterator"], typeof t == "function" ? t : null);
  }
  var ba = Symbol.for("react.client.reference");
  function Ra(t) {
    if (t == null) return null;
    if (typeof t == "function")
      return t.$$typeof === ba ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case Q:
        return "Fragment";
      case et:
        return "Profiler";
      case k:
        return "StrictMode";
      case J:
        return "Suspense";
      case nt:
        return "SuspenseList";
      case Ot:
        return "Activity";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case C:
          return "Portal";
        case L:
          return (t.displayName || "Context") + ".Provider";
        case vt:
          return (t._context.displayName || "Context") + ".Consumer";
        case F:
          var a = t.render;
          return t = t.displayName, t || (t = a.displayName || a.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
        case w:
          return a = t.displayName || null, a !== null ? a : Ra(t.type) || "Memo";
        case W:
          a = t._payload, t = t._init;
          try {
            return Ra(t(a));
          } catch {
          }
      }
    return null;
  }
  var wt = Array.isArray, N = o.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, B = m.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, I = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, bt = [], h = -1;
  function D(t) {
    return { current: t };
  }
  function X(t) {
    0 > h || (t.current = bt[h], bt[h] = null, h--);
  }
  function Y(t, a) {
    h++, bt[h] = t.current, t.current = a;
  }
  var K = D(null), ft = D(null), V = D(null), $t = D(null);
  function pt(t, a) {
    switch (Y(V, a), Y(ft, t), Y(K, null), a.nodeType) {
      case 9:
      case 11:
        t = (t = a.documentElement) && (t = t.namespaceURI) ? Td(t) : 0;
        break;
      default:
        if (t = a.tagName, a = a.namespaceURI)
          a = Td(a), t = Ed(a, t);
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
    X(K), Y(K, t);
  }
  function Ba() {
    X(K), X(ft), X(V);
  }
  function Il(t) {
    t.memoizedState !== null && Y($t, t);
    var a = K.current, e = Ed(a, t.type);
    a !== e && (Y(ft, t), Y(K, e));
  }
  function Ya(t) {
    ft.current === t && (X(K), X(ft)), $t.current === t && (X($t), Zn._currentValue = I);
  }
  var Ja = Object.prototype.hasOwnProperty, ll = c.unstable_scheduleCallback, nl = c.unstable_cancelCallback, eu = c.unstable_shouldYield, Ni = c.unstable_requestPaint, xa = c.unstable_now, lu = c.unstable_getCurrentPriorityLevel, na = c.unstable_ImmediatePriority, nu = c.unstable_UserBlockingPriority, ul = c.unstable_NormalPriority, uu = c.unstable_LowPriority, iu = c.unstable_IdlePriority, zi = c.log, Be = c.unstable_setDisableYieldValue, $a = null, ta = null;
  function Ua(t) {
    if (typeof zi == "function" && Be(t), ta && typeof ta.setStrictMode == "function")
      try {
        ta.setStrictMode($a, t);
      } catch {
      }
  }
  var Wt = Math.clz32 ? Math.clz32 : su, Ga = Math.log, cu = Math.LN2;
  function su(t) {
    return t >>>= 0, t === 0 ? 32 : 31 - (Ga(t) / cu | 0) | 0;
  }
  var he = 256, ve = 4194304;
  function La(t) {
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
  function il(t, a, e) {
    var l = t.pendingLanes;
    if (l === 0) return 0;
    var n = 0, u = t.suspendedLanes, i = t.pingedLanes;
    t = t.warmLanes;
    var r = l & 134217727;
    return r !== 0 ? (l = r & ~u, l !== 0 ? n = La(l) : (i &= r, i !== 0 ? n = La(i) : e || (e = r & ~t, e !== 0 && (n = La(e))))) : (r = l & ~u, r !== 0 ? n = La(r) : i !== 0 ? n = La(i) : e || (e = l & ~t, e !== 0 && (n = La(e)))), n === 0 ? 0 : a !== 0 && a !== n && (a & u) === 0 && (u = n & -n, e = a & -a, u >= e || u === 32 && (e & 4194048) !== 0) ? a : n;
  }
  function ua(t, a) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & a) === 0;
  }
  function Ai(t, a) {
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
  function ru() {
    var t = he;
    return he <<= 1, (he & 4194048) === 0 && (he = 256), t;
  }
  function Pl() {
    var t = ve;
    return ve <<= 1, (ve & 62914560) === 0 && (ve = 4194304), t;
  }
  function cl(t) {
    for (var a = [], e = 0; 31 > e; e++) a.push(t);
    return a;
  }
  function me(t, a) {
    t.pendingLanes |= a, a !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0);
  }
  function fu(t, a, e, l, n, u) {
    var i = t.pendingLanes;
    t.pendingLanes = e, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= e, t.entangledLanes &= e, t.errorRecoveryDisabledLanes &= e, t.shellSuspendCounter = 0;
    var r = t.entanglements, d = t.expirationTimes, y = t.hiddenUpdates;
    for (e = i & ~e; 0 < e; ) {
      var z = 31 - Wt(e), O = 1 << z;
      r[z] = 0, d[z] = -1;
      var x = y[z];
      if (x !== null)
        for (y[z] = null, z = 0; z < x.length; z++) {
          var S = x[z];
          S !== null && (S.lane &= -536870913);
        }
      e &= ~O;
    }
    l !== 0 && tn(t, l, 0), u !== 0 && n === 0 && t.tag !== 0 && (t.suspendedLanes |= u & ~(i & ~a));
  }
  function tn(t, a, e) {
    t.pendingLanes |= a, t.suspendedLanes &= ~a;
    var l = 31 - Wt(a);
    t.entangledLanes |= a, t.entanglements[l] = t.entanglements[l] | 1073741824 | e & 4194090;
  }
  function T(t, a) {
    var e = t.entangledLanes |= a;
    for (t = t.entanglements; e; ) {
      var l = 31 - Wt(e), n = 1 << l;
      n & a | t[l] & a && (t[l] |= a), e &= ~n;
    }
  }
  function ut(t) {
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
  function gt(t) {
    return t &= -t, 2 < t ? 8 < t ? (t & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function it() {
    var t = B.p;
    return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : Qd(t.type));
  }
  function Wa(t, a) {
    var e = B.p;
    try {
      return B.p = t, a();
    } finally {
      B.p = e;
    }
  }
  var Sa = Math.random().toString(36).slice(2), Ct = "__reactFiber$" + Sa, ia = "__reactProps$" + Sa, sl = "__reactContainer$" + Sa, Mi = "__reactEvents$" + Sa, Nh = "__reactListeners$" + Sa, zh = "__reactHandles$" + Sa, rr = "__reactResources$" + Sa, an = "__reactMarker$" + Sa;
  function Oi(t) {
    delete t[Ct], delete t[ia], delete t[Mi], delete t[Nh], delete t[zh];
  }
  function rl(t) {
    var a = t[Ct];
    if (a) return a;
    for (var e = t.parentNode; e; ) {
      if (a = e[sl] || e[Ct]) {
        if (e = a.alternate, a.child !== null || e !== null && e.child !== null)
          for (t = Ad(t); t !== null; ) {
            if (e = t[Ct]) return e;
            t = Ad(t);
          }
        return a;
      }
      t = e, e = t.parentNode;
    }
    return null;
  }
  function fl(t) {
    if (t = t[Ct] || t[sl]) {
      var a = t.tag;
      if (a === 5 || a === 6 || a === 13 || a === 26 || a === 27 || a === 3)
        return t;
    }
    return null;
  }
  function en(t) {
    var a = t.tag;
    if (a === 5 || a === 26 || a === 27 || a === 6) return t.stateNode;
    throw Error(f(33));
  }
  function ol(t) {
    var a = t[rr];
    return a || (a = t[rr] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), a;
  }
  function Qt(t) {
    t[an] = !0;
  }
  var fr = /* @__PURE__ */ new Set(), or = {};
  function Ye(t, a) {
    dl(t, a), dl(t + "Capture", a);
  }
  function dl(t, a) {
    for (or[t] = a, t = 0; t < a.length; t++)
      fr.add(a[t]);
  }
  var Ah = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), dr = {}, hr = {};
  function Mh(t) {
    return Ja.call(hr, t) ? !0 : Ja.call(dr, t) ? !1 : Ah.test(t) ? hr[t] = !0 : (dr[t] = !0, !1);
  }
  function ou(t, a, e) {
    if (Mh(a))
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
  function du(t, a, e) {
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
  function Fa(t, a, e, l) {
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
  var Di, vr;
  function hl(t) {
    if (Di === void 0)
      try {
        throw Error();
      } catch (e) {
        var a = e.stack.trim().match(/\n( *(at )?)/);
        Di = a && a[1] || "", vr = -1 < e.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + Di + t + vr;
  }
  var Ri = !1;
  function Ui(t, a) {
    if (!t || Ri) return "";
    Ri = !0;
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
                } catch (S) {
                  var x = S;
                }
                Reflect.construct(t, [], O);
              } else {
                try {
                  O.call();
                } catch (S) {
                  x = S;
                }
                t.call(O.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (S) {
                x = S;
              }
              (O = t()) && typeof O.catch == "function" && O.catch(function() {
              });
            }
          } catch (S) {
            if (S && x && typeof S.stack == "string")
              return [S.stack, x.stack];
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
`), y = r.split(`
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
                  var z = `
` + d[l].replace(" at new ", " at ");
                  return t.displayName && z.includes("<anonymous>") && (z = z.replace("<anonymous>", t.displayName)), z;
                }
              while (1 <= l && 0 <= n);
            break;
          }
      }
    } finally {
      Ri = !1, Error.prepareStackTrace = e;
    }
    return (e = t ? t.displayName || t.name : "") ? hl(e) : "";
  }
  function Oh(t) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return hl(t.type);
      case 16:
        return hl("Lazy");
      case 13:
        return hl("Suspense");
      case 19:
        return hl("SuspenseList");
      case 0:
      case 15:
        return Ui(t.type, !1);
      case 11:
        return Ui(t.type.render, !1);
      case 1:
        return Ui(t.type, !0);
      case 31:
        return hl("Activity");
      default:
        return "";
    }
  }
  function mr(t) {
    try {
      var a = "";
      do
        a += Oh(t), t = t.return;
      while (t);
      return a;
    } catch (e) {
      return `
Error generating stack: ` + e.message + `
` + e.stack;
    }
  }
  function ja(t) {
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
  function pr(t) {
    var a = t.type;
    return (t = t.nodeName) && t.toLowerCase() === "input" && (a === "checkbox" || a === "radio");
  }
  function Dh(t) {
    var a = pr(t) ? "checked" : "value", e = Object.getOwnPropertyDescriptor(
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
  function hu(t) {
    t._valueTracker || (t._valueTracker = Dh(t));
  }
  function gr(t) {
    if (!t) return !1;
    var a = t._valueTracker;
    if (!a) return !0;
    var e = a.getValue(), l = "";
    return t && (l = pr(t) ? t.checked ? "true" : "false" : t.value), t = l, t !== e ? (a.setValue(t), !0) : !1;
  }
  function vu(t) {
    if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u") return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  var Rh = /[\n"\\]/g;
  function Ta(t) {
    return t.replace(
      Rh,
      function(a) {
        return "\\" + a.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function qi(t, a, e, l, n, u, i, r) {
    t.name = "", i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" ? t.type = i : t.removeAttribute("type"), a != null ? i === "number" ? (a === 0 && t.value === "" || t.value != a) && (t.value = "" + ja(a)) : t.value !== "" + ja(a) && (t.value = "" + ja(a)) : i !== "submit" && i !== "reset" || t.removeAttribute("value"), a != null ? wi(t, i, ja(a)) : e != null ? wi(t, i, ja(e)) : l != null && t.removeAttribute("value"), n == null && u != null && (t.defaultChecked = !!u), n != null && (t.checked = n && typeof n != "function" && typeof n != "symbol"), r != null && typeof r != "function" && typeof r != "symbol" && typeof r != "boolean" ? t.name = "" + ja(r) : t.removeAttribute("name");
  }
  function yr(t, a, e, l, n, u, i, r) {
    if (u != null && typeof u != "function" && typeof u != "symbol" && typeof u != "boolean" && (t.type = u), a != null || e != null) {
      if (!(u !== "submit" && u !== "reset" || a != null))
        return;
      e = e != null ? "" + ja(e) : "", a = a != null ? "" + ja(a) : e, r || a === t.value || (t.value = a), t.defaultValue = a;
    }
    l = l ?? n, l = typeof l != "function" && typeof l != "symbol" && !!l, t.checked = r ? t.checked : !!l, t.defaultChecked = !!l, i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" && (t.name = i);
  }
  function wi(t, a, e) {
    a === "number" && vu(t.ownerDocument) === t || t.defaultValue === "" + e || (t.defaultValue = "" + e);
  }
  function vl(t, a, e, l) {
    if (t = t.options, a) {
      a = {};
      for (var n = 0; n < e.length; n++)
        a["$" + e[n]] = !0;
      for (e = 0; e < t.length; e++)
        n = a.hasOwnProperty("$" + t[e].value), t[e].selected !== n && (t[e].selected = n), n && l && (t[e].defaultSelected = !0);
    } else {
      for (e = "" + ja(e), a = null, n = 0; n < t.length; n++) {
        if (t[n].value === e) {
          t[n].selected = !0, l && (t[n].defaultSelected = !0);
          return;
        }
        a !== null || t[n].disabled || (a = t[n]);
      }
      a !== null && (a.selected = !0);
    }
  }
  function br(t, a, e) {
    if (a != null && (a = "" + ja(a), a !== t.value && (t.value = a), e == null)) {
      t.defaultValue !== a && (t.defaultValue = a);
      return;
    }
    t.defaultValue = e != null ? "" + ja(e) : "";
  }
  function xr(t, a, e, l) {
    if (a == null) {
      if (l != null) {
        if (e != null) throw Error(f(92));
        if (wt(l)) {
          if (1 < l.length) throw Error(f(93));
          l = l[0];
        }
        e = l;
      }
      e == null && (e = ""), a = e;
    }
    e = ja(a), t.defaultValue = e, l = t.textContent, l === e && l !== "" && l !== null && (t.value = l);
  }
  function ml(t, a) {
    if (a) {
      var e = t.firstChild;
      if (e && e === t.lastChild && e.nodeType === 3) {
        e.nodeValue = a;
        return;
      }
    }
    t.textContent = a;
  }
  var Uh = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Sr(t, a, e) {
    var l = a.indexOf("--") === 0;
    e == null || typeof e == "boolean" || e === "" ? l ? t.setProperty(a, "") : a === "float" ? t.cssFloat = "" : t[a] = "" : l ? t.setProperty(a, e) : typeof e != "number" || e === 0 || Uh.has(a) ? a === "float" ? t.cssFloat = e : t[a] = ("" + e).trim() : t[a] = e + "px";
  }
  function jr(t, a, e) {
    if (a != null && typeof a != "object")
      throw Error(f(62));
    if (t = t.style, e != null) {
      for (var l in e)
        !e.hasOwnProperty(l) || a != null && a.hasOwnProperty(l) || (l.indexOf("--") === 0 ? t.setProperty(l, "") : l === "float" ? t.cssFloat = "" : t[l] = "");
      for (var n in a)
        l = a[n], a.hasOwnProperty(n) && e[n] !== l && Sr(t, n, l);
    } else
      for (var u in a)
        a.hasOwnProperty(u) && Sr(t, u, a[u]);
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
  var qh = /* @__PURE__ */ new Map([
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
  function mu(t) {
    return wh.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
  }
  var Hi = null;
  function Bi(t) {
    return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
  }
  var pl = null, gl = null;
  function Tr(t) {
    var a = fl(t);
    if (a && (t = a.stateNode)) {
      var e = t[ia] || null;
      t: switch (t = a.stateNode, a.type) {
        case "input":
          if (qi(
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
                var n = l[ia] || null;
                if (!n) throw Error(f(90));
                qi(
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
              l = e[a], l.form === t.form && gr(l);
          }
          break t;
        case "textarea":
          br(t, e.value, e.defaultValue);
          break t;
        case "select":
          a = e.value, a != null && vl(t, !!e.multiple, a, !1);
      }
    }
  }
  var Yi = !1;
  function Er(t, a, e) {
    if (Yi) return t(a, e);
    Yi = !0;
    try {
      var l = t(a);
      return l;
    } finally {
      if (Yi = !1, (pl !== null || gl !== null) && (ti(), pl && (a = pl, t = gl, gl = pl = null, Tr(a), t)))
        for (a = 0; a < t.length; a++) Tr(t[a]);
    }
  }
  function ln(t, a) {
    var e = t.stateNode;
    if (e === null) return null;
    var l = e[ia] || null;
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
        f(231, a, typeof e)
      );
    return e;
  }
  var Ia = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Gi = !1;
  if (Ia)
    try {
      var nn = {};
      Object.defineProperty(nn, "passive", {
        get: function() {
          Gi = !0;
        }
      }), window.addEventListener("test", nn, nn), window.removeEventListener("test", nn, nn);
    } catch {
      Gi = !1;
    }
  var pe = null, Li = null, pu = null;
  function _r() {
    if (pu) return pu;
    var t, a = Li, e = a.length, l, n = "value" in pe ? pe.value : pe.textContent, u = n.length;
    for (t = 0; t < e && a[t] === n[t]; t++) ;
    var i = e - t;
    for (l = 1; l <= i && a[e - l] === n[u - l]; l++) ;
    return pu = n.slice(t, 1 < l ? 1 - l : void 0);
  }
  function gu(t) {
    var a = t.keyCode;
    return "charCode" in t ? (t = t.charCode, t === 0 && a === 13 && (t = 13)) : t = a, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
  }
  function yu() {
    return !0;
  }
  function Nr() {
    return !1;
  }
  function ca(t) {
    function a(e, l, n, u, i) {
      this._reactName = e, this._targetInst = n, this.type = l, this.nativeEvent = u, this.target = i, this.currentTarget = null;
      for (var r in t)
        t.hasOwnProperty(r) && (e = t[r], this[r] = e ? e(u) : u[r]);
      return this.isDefaultPrevented = (u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1) ? yu : Nr, this.isPropagationStopped = Nr, this;
    }
    return R(a.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var e = this.nativeEvent;
        e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = yu);
      },
      stopPropagation: function() {
        var e = this.nativeEvent;
        e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = yu);
      },
      persist: function() {
      },
      isPersistent: yu
    }), a;
  }
  var Ge = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(t) {
      return t.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, bu = ca(Ge), un = R({}, Ge, { view: 0, detail: 0 }), Ch = ca(un), Xi, Qi, cn, xu = R({}, un, {
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
    getModifierState: Zi,
    button: 0,
    buttons: 0,
    relatedTarget: function(t) {
      return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
    },
    movementX: function(t) {
      return "movementX" in t ? t.movementX : (t !== cn && (cn && t.type === "mousemove" ? (Xi = t.screenX - cn.screenX, Qi = t.screenY - cn.screenY) : Qi = Xi = 0, cn = t), Xi);
    },
    movementY: function(t) {
      return "movementY" in t ? t.movementY : Qi;
    }
  }), zr = ca(xu), Hh = R({}, xu, { dataTransfer: 0 }), Bh = ca(Hh), Yh = R({}, un, { relatedTarget: 0 }), ki = ca(Yh), Gh = R({}, Ge, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Lh = ca(Gh), Xh = R({}, Ge, {
    clipboardData: function(t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    }
  }), Qh = ca(Xh), kh = R({}, Ge, { data: 0 }), Ar = ca(kh), Zh = {
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
  }, Vh = {
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
  }, Kh = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function Jh(t) {
    var a = this.nativeEvent;
    return a.getModifierState ? a.getModifierState(t) : (t = Kh[t]) ? !!a[t] : !1;
  }
  function Zi() {
    return Jh;
  }
  var $h = R({}, un, {
    key: function(t) {
      if (t.key) {
        var a = Zh[t.key] || t.key;
        if (a !== "Unidentified") return a;
      }
      return t.type === "keypress" ? (t = gu(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? Vh[t.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Zi,
    charCode: function(t) {
      return t.type === "keypress" ? gu(t) : 0;
    },
    keyCode: function(t) {
      return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    },
    which: function(t) {
      return t.type === "keypress" ? gu(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    }
  }), Wh = ca($h), Fh = R({}, xu, {
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
  }), Mr = ca(Fh), Ih = R({}, un, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Zi
  }), Ph = ca(Ih), tv = R({}, Ge, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), av = ca(tv), ev = R({}, xu, {
    deltaX: function(t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    },
    deltaY: function(t) {
      return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), lv = ca(ev), nv = R({}, Ge, {
    newState: 0,
    oldState: 0
  }), uv = ca(nv), iv = [9, 13, 27, 32], Vi = Ia && "CompositionEvent" in window, sn = null;
  Ia && "documentMode" in document && (sn = document.documentMode);
  var cv = Ia && "TextEvent" in window && !sn, Or = Ia && (!Vi || sn && 8 < sn && 11 >= sn), Dr = " ", Rr = !1;
  function Ur(t, a) {
    switch (t) {
      case "keyup":
        return iv.indexOf(a.keyCode) !== -1;
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
  function qr(t) {
    return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
  }
  var yl = !1;
  function sv(t, a) {
    switch (t) {
      case "compositionend":
        return qr(a);
      case "keypress":
        return a.which !== 32 ? null : (Rr = !0, Dr);
      case "textInput":
        return t = a.data, t === Dr && Rr ? null : t;
      default:
        return null;
    }
  }
  function rv(t, a) {
    if (yl)
      return t === "compositionend" || !Vi && Ur(t, a) ? (t = _r(), pu = Li = pe = null, yl = !1, t) : null;
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
        return Or && a.locale !== "ko" ? null : a.data;
      default:
        return null;
    }
  }
  var fv = {
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
  function wr(t) {
    var a = t && t.nodeName && t.nodeName.toLowerCase();
    return a === "input" ? !!fv[t.type] : a === "textarea";
  }
  function Cr(t, a, e, l) {
    pl ? gl ? gl.push(l) : gl = [l] : pl = l, a = ii(a, "onChange"), 0 < a.length && (e = new bu(
      "onChange",
      "change",
      null,
      e,
      l
    ), t.push({ event: e, listeners: a }));
  }
  var rn = null, fn = null;
  function ov(t) {
    yd(t, 0);
  }
  function Su(t) {
    var a = en(t);
    if (gr(a)) return t;
  }
  function Hr(t, a) {
    if (t === "change") return a;
  }
  var Br = !1;
  if (Ia) {
    var Ki;
    if (Ia) {
      var Ji = "oninput" in document;
      if (!Ji) {
        var Yr = document.createElement("div");
        Yr.setAttribute("oninput", "return;"), Ji = typeof Yr.oninput == "function";
      }
      Ki = Ji;
    } else Ki = !1;
    Br = Ki && (!document.documentMode || 9 < document.documentMode);
  }
  function Gr() {
    rn && (rn.detachEvent("onpropertychange", Lr), fn = rn = null);
  }
  function Lr(t) {
    if (t.propertyName === "value" && Su(fn)) {
      var a = [];
      Cr(
        a,
        fn,
        t,
        Bi(t)
      ), Er(ov, a);
    }
  }
  function dv(t, a, e) {
    t === "focusin" ? (Gr(), rn = a, fn = e, rn.attachEvent("onpropertychange", Lr)) : t === "focusout" && Gr();
  }
  function hv(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return Su(fn);
  }
  function vv(t, a) {
    if (t === "click") return Su(a);
  }
  function mv(t, a) {
    if (t === "input" || t === "change")
      return Su(a);
  }
  function pv(t, a) {
    return t === a && (t !== 0 || 1 / t === 1 / a) || t !== t && a !== a;
  }
  var da = typeof Object.is == "function" ? Object.is : pv;
  function on(t, a) {
    if (da(t, a)) return !0;
    if (typeof t != "object" || t === null || typeof a != "object" || a === null)
      return !1;
    var e = Object.keys(t), l = Object.keys(a);
    if (e.length !== l.length) return !1;
    for (l = 0; l < e.length; l++) {
      var n = e[l];
      if (!Ja.call(a, n) || !da(t[n], a[n]))
        return !1;
    }
    return !0;
  }
  function Xr(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function Qr(t, a) {
    var e = Xr(t);
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
      e = Xr(e);
    }
  }
  function kr(t, a) {
    return t && a ? t === a ? !0 : t && t.nodeType === 3 ? !1 : a && a.nodeType === 3 ? kr(t, a.parentNode) : "contains" in t ? t.contains(a) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(a) & 16) : !1 : !1;
  }
  function Zr(t) {
    t = t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null ? t.ownerDocument.defaultView : window;
    for (var a = vu(t.document); a instanceof t.HTMLIFrameElement; ) {
      try {
        var e = typeof a.contentWindow.location.href == "string";
      } catch {
        e = !1;
      }
      if (e) t = a.contentWindow;
      else break;
      a = vu(t.document);
    }
    return a;
  }
  function $i(t) {
    var a = t && t.nodeName && t.nodeName.toLowerCase();
    return a && (a === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || a === "textarea" || t.contentEditable === "true");
  }
  var gv = Ia && "documentMode" in document && 11 >= document.documentMode, bl = null, Wi = null, dn = null, Fi = !1;
  function Vr(t, a, e) {
    var l = e.window === e ? e.document : e.nodeType === 9 ? e : e.ownerDocument;
    Fi || bl == null || bl !== vu(l) || (l = bl, "selectionStart" in l && $i(l) ? l = { start: l.selectionStart, end: l.selectionEnd } : (l = (l.ownerDocument && l.ownerDocument.defaultView || window).getSelection(), l = {
      anchorNode: l.anchorNode,
      anchorOffset: l.anchorOffset,
      focusNode: l.focusNode,
      focusOffset: l.focusOffset
    }), dn && on(dn, l) || (dn = l, l = ii(Wi, "onSelect"), 0 < l.length && (a = new bu(
      "onSelect",
      "select",
      null,
      a,
      e
    ), t.push({ event: a, listeners: l }), a.target = bl)));
  }
  function Le(t, a) {
    var e = {};
    return e[t.toLowerCase()] = a.toLowerCase(), e["Webkit" + t] = "webkit" + a, e["Moz" + t] = "moz" + a, e;
  }
  var xl = {
    animationend: Le("Animation", "AnimationEnd"),
    animationiteration: Le("Animation", "AnimationIteration"),
    animationstart: Le("Animation", "AnimationStart"),
    transitionrun: Le("Transition", "TransitionRun"),
    transitionstart: Le("Transition", "TransitionStart"),
    transitioncancel: Le("Transition", "TransitionCancel"),
    transitionend: Le("Transition", "TransitionEnd")
  }, Ii = {}, Kr = {};
  Ia && (Kr = document.createElement("div").style, "AnimationEvent" in window || (delete xl.animationend.animation, delete xl.animationiteration.animation, delete xl.animationstart.animation), "TransitionEvent" in window || delete xl.transitionend.transition);
  function Xe(t) {
    if (Ii[t]) return Ii[t];
    if (!xl[t]) return t;
    var a = xl[t], e;
    for (e in a)
      if (a.hasOwnProperty(e) && e in Kr)
        return Ii[t] = a[e];
    return t;
  }
  var Jr = Xe("animationend"), $r = Xe("animationiteration"), Wr = Xe("animationstart"), yv = Xe("transitionrun"), bv = Xe("transitionstart"), xv = Xe("transitioncancel"), Fr = Xe("transitionend"), Ir = /* @__PURE__ */ new Map(), Pi = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Pi.push("scrollEnd");
  function qa(t, a) {
    Ir.set(t, a), Ye(a, [t]);
  }
  var Pr = /* @__PURE__ */ new WeakMap();
  function Ea(t, a) {
    if (typeof t == "object" && t !== null) {
      var e = Pr.get(t);
      return e !== void 0 ? e : (a = {
        value: t,
        source: a,
        stack: mr(a)
      }, Pr.set(t, a), a);
    }
    return {
      value: t,
      source: a,
      stack: mr(a)
    };
  }
  var _a = [], Sl = 0, tc = 0;
  function ju() {
    for (var t = Sl, a = tc = Sl = 0; a < t; ) {
      var e = _a[a];
      _a[a++] = null;
      var l = _a[a];
      _a[a++] = null;
      var n = _a[a];
      _a[a++] = null;
      var u = _a[a];
      if (_a[a++] = null, l !== null && n !== null) {
        var i = l.pending;
        i === null ? n.next = n : (n.next = i.next, i.next = n), l.pending = n;
      }
      u !== 0 && tf(e, n, u);
    }
  }
  function Tu(t, a, e, l) {
    _a[Sl++] = t, _a[Sl++] = a, _a[Sl++] = e, _a[Sl++] = l, tc |= l, t.lanes |= l, t = t.alternate, t !== null && (t.lanes |= l);
  }
  function ac(t, a, e, l) {
    return Tu(t, a, e, l), Eu(t);
  }
  function jl(t, a) {
    return Tu(t, null, null, a), Eu(t);
  }
  function tf(t, a, e) {
    t.lanes |= e;
    var l = t.alternate;
    l !== null && (l.lanes |= e);
    for (var n = !1, u = t.return; u !== null; )
      u.childLanes |= e, l = u.alternate, l !== null && (l.childLanes |= e), u.tag === 22 && (t = u.stateNode, t === null || t._visibility & 1 || (n = !0)), t = u, u = u.return;
    return t.tag === 3 ? (u = t.stateNode, n && a !== null && (n = 31 - Wt(e), t = u.hiddenUpdates, l = t[n], l === null ? t[n] = [a] : l.push(a), a.lane = e | 536870912), u) : null;
  }
  function Eu(t) {
    if (50 < Hn)
      throw Hn = 0, cs = null, Error(f(185));
    for (var a = t.return; a !== null; )
      t = a, a = t.return;
    return t.tag === 3 ? t.stateNode : null;
  }
  var Tl = {};
  function Sv(t, a, e, l) {
    this.tag = t, this.key = e, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = a, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = l, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function ha(t, a, e, l) {
    return new Sv(t, a, e, l);
  }
  function ec(t) {
    return t = t.prototype, !(!t || !t.isReactComponent);
  }
  function Pa(t, a) {
    var e = t.alternate;
    return e === null ? (e = ha(
      t.tag,
      a,
      t.key,
      t.mode
    ), e.elementType = t.elementType, e.type = t.type, e.stateNode = t.stateNode, e.alternate = t, t.alternate = e) : (e.pendingProps = a, e.type = t.type, e.flags = 0, e.subtreeFlags = 0, e.deletions = null), e.flags = t.flags & 65011712, e.childLanes = t.childLanes, e.lanes = t.lanes, e.child = t.child, e.memoizedProps = t.memoizedProps, e.memoizedState = t.memoizedState, e.updateQueue = t.updateQueue, a = t.dependencies, e.dependencies = a === null ? null : { lanes: a.lanes, firstContext: a.firstContext }, e.sibling = t.sibling, e.index = t.index, e.ref = t.ref, e.refCleanup = t.refCleanup, e;
  }
  function af(t, a) {
    t.flags &= 65011714;
    var e = t.alternate;
    return e === null ? (t.childLanes = 0, t.lanes = a, t.child = null, t.subtreeFlags = 0, t.memoizedProps = null, t.memoizedState = null, t.updateQueue = null, t.dependencies = null, t.stateNode = null) : (t.childLanes = e.childLanes, t.lanes = e.lanes, t.child = e.child, t.subtreeFlags = 0, t.deletions = null, t.memoizedProps = e.memoizedProps, t.memoizedState = e.memoizedState, t.updateQueue = e.updateQueue, t.type = e.type, a = e.dependencies, t.dependencies = a === null ? null : {
      lanes: a.lanes,
      firstContext: a.firstContext
    }), t;
  }
  function _u(t, a, e, l, n, u) {
    var i = 0;
    if (l = t, typeof t == "function") ec(t) && (i = 1);
    else if (typeof t == "string")
      i = Tm(
        t,
        e,
        K.current
      ) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
    else
      t: switch (t) {
        case Ot:
          return t = ha(31, e, a, n), t.elementType = Ot, t.lanes = u, t;
        case Q:
          return Qe(e.children, n, u, a);
        case k:
          i = 8, n |= 24;
          break;
        case et:
          return t = ha(12, e, a, n | 2), t.elementType = et, t.lanes = u, t;
        case J:
          return t = ha(13, e, a, n), t.elementType = J, t.lanes = u, t;
        case nt:
          return t = ha(19, e, a, n), t.elementType = nt, t.lanes = u, t;
        default:
          if (typeof t == "object" && t !== null)
            switch (t.$$typeof) {
              case at:
              case L:
                i = 10;
                break t;
              case vt:
                i = 9;
                break t;
              case F:
                i = 11;
                break t;
              case w:
                i = 14;
                break t;
              case W:
                i = 16, l = null;
                break t;
            }
          i = 29, e = Error(
            f(130, t === null ? "null" : typeof t, "")
          ), l = null;
      }
    return a = ha(i, e, a, n), a.elementType = t, a.type = l, a.lanes = u, a;
  }
  function Qe(t, a, e, l) {
    return t = ha(7, t, l, a), t.lanes = e, t;
  }
  function lc(t, a, e) {
    return t = ha(6, t, null, a), t.lanes = e, t;
  }
  function nc(t, a, e) {
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
  var El = [], _l = 0, Nu = null, zu = 0, Na = [], za = 0, ke = null, te = 1, ae = "";
  function Ze(t, a) {
    El[_l++] = zu, El[_l++] = Nu, Nu = t, zu = a;
  }
  function ef(t, a, e) {
    Na[za++] = te, Na[za++] = ae, Na[za++] = ke, ke = t;
    var l = te;
    t = ae;
    var n = 32 - Wt(l) - 1;
    l &= ~(1 << n), e += 1;
    var u = 32 - Wt(a) + n;
    if (30 < u) {
      var i = n - n % 5;
      u = (l & (1 << i) - 1).toString(32), l >>= i, n -= i, te = 1 << 32 - Wt(a) + n | e << n | l, ae = u + t;
    } else
      te = 1 << u | e << n | l, ae = t;
  }
  function uc(t) {
    t.return !== null && (Ze(t, 1), ef(t, 1, 0));
  }
  function ic(t) {
    for (; t === Nu; )
      Nu = El[--_l], El[_l] = null, zu = El[--_l], El[_l] = null;
    for (; t === ke; )
      ke = Na[--za], Na[za] = null, ae = Na[--za], Na[za] = null, te = Na[--za], Na[za] = null;
  }
  var la = null, Ut = null, yt = !1, Ve = null, Xa = !1, cc = Error(f(519));
  function Ke(t) {
    var a = Error(f(418, ""));
    throw mn(Ea(a, t)), cc;
  }
  function lf(t) {
    var a = t.stateNode, e = t.type, l = t.memoizedProps;
    switch (a[Ct] = t, a[ia] = l, e) {
      case "dialog":
        dt("cancel", a), dt("close", a);
        break;
      case "iframe":
      case "object":
      case "embed":
        dt("load", a);
        break;
      case "video":
      case "audio":
        for (e = 0; e < Yn.length; e++)
          dt(Yn[e], a);
        break;
      case "source":
        dt("error", a);
        break;
      case "img":
      case "image":
      case "link":
        dt("error", a), dt("load", a);
        break;
      case "details":
        dt("toggle", a);
        break;
      case "input":
        dt("invalid", a), yr(
          a,
          l.value,
          l.defaultValue,
          l.checked,
          l.defaultChecked,
          l.type,
          l.name,
          !0
        ), hu(a);
        break;
      case "select":
        dt("invalid", a);
        break;
      case "textarea":
        dt("invalid", a), xr(a, l.value, l.defaultValue, l.children), hu(a);
    }
    e = l.children, typeof e != "string" && typeof e != "number" && typeof e != "bigint" || a.textContent === "" + e || l.suppressHydrationWarning === !0 || jd(a.textContent, e) ? (l.popover != null && (dt("beforetoggle", a), dt("toggle", a)), l.onScroll != null && dt("scroll", a), l.onScrollEnd != null && dt("scrollend", a), l.onClick != null && (a.onclick = ci), a = !0) : a = !1, a || Ke(t);
  }
  function nf(t) {
    for (la = t.return; la; )
      switch (la.tag) {
        case 5:
        case 13:
          Xa = !1;
          return;
        case 27:
        case 3:
          Xa = !0;
          return;
        default:
          la = la.return;
      }
  }
  function hn(t) {
    if (t !== la) return !1;
    if (!yt) return nf(t), yt = !0, !1;
    var a = t.tag, e;
    if ((e = a !== 3 && a !== 27) && ((e = a === 5) && (e = t.type, e = !(e !== "form" && e !== "button") || Ts(t.type, t.memoizedProps)), e = !e), e && Ut && Ke(t), nf(t), a === 13) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(f(317));
      t: {
        for (t = t.nextSibling, a = 0; t; ) {
          if (t.nodeType === 8)
            if (e = t.data, e === "/$") {
              if (a === 0) {
                Ut = Ca(t.nextSibling);
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
      a === 27 ? (a = Ut, Re(t.type) ? (t = zs, zs = null, Ut = t) : Ut = a) : Ut = la ? Ca(t.stateNode.nextSibling) : null;
    return !0;
  }
  function vn() {
    Ut = la = null, yt = !1;
  }
  function uf() {
    var t = Ve;
    return t !== null && (fa === null ? fa = t : fa.push.apply(
      fa,
      t
    ), Ve = null), t;
  }
  function mn(t) {
    Ve === null ? Ve = [t] : Ve.push(t);
  }
  var sc = D(null), Je = null, ee = null;
  function ge(t, a, e) {
    Y(sc, a._currentValue), a._currentValue = e;
  }
  function le(t) {
    t._currentValue = sc.current, X(sc);
  }
  function rc(t, a, e) {
    for (; t !== null; ) {
      var l = t.alternate;
      if ((t.childLanes & a) !== a ? (t.childLanes |= a, l !== null && (l.childLanes |= a)) : l !== null && (l.childLanes & a) !== a && (l.childLanes |= a), t === e) break;
      t = t.return;
    }
  }
  function fc(t, a, e, l) {
    var n = t.child;
    for (n !== null && (n.return = t); n !== null; ) {
      var u = n.dependencies;
      if (u !== null) {
        var i = n.child;
        u = u.firstContext;
        t: for (; u !== null; ) {
          var r = u;
          u = n;
          for (var d = 0; d < a.length; d++)
            if (r.context === a[d]) {
              u.lanes |= e, r = u.alternate, r !== null && (r.lanes |= e), rc(
                u.return,
                e,
                t
              ), l || (i = null);
              break t;
            }
          u = r.next;
        }
      } else if (n.tag === 18) {
        if (i = n.return, i === null) throw Error(f(341));
        i.lanes |= e, u = i.alternate, u !== null && (u.lanes |= e), rc(i, e, t), i = null;
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
  function pn(t, a, e, l) {
    t = null;
    for (var n = a, u = !1; n !== null; ) {
      if (!u) {
        if ((n.flags & 524288) !== 0) u = !0;
        else if ((n.flags & 262144) !== 0) break;
      }
      if (n.tag === 10) {
        var i = n.alternate;
        if (i === null) throw Error(f(387));
        if (i = i.memoizedProps, i !== null) {
          var r = n.type;
          da(n.pendingProps.value, i.value) || (t !== null ? t.push(r) : t = [r]);
        }
      } else if (n === $t.current) {
        if (i = n.alternate, i === null) throw Error(f(387));
        i.memoizedState.memoizedState !== n.memoizedState.memoizedState && (t !== null ? t.push(Zn) : t = [Zn]);
      }
      n = n.return;
    }
    t !== null && fc(
      a,
      t,
      e,
      l
    ), a.flags |= 262144;
  }
  function Au(t) {
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
  function $e(t) {
    Je = t, ee = null, t = t.dependencies, t !== null && (t.firstContext = null);
  }
  function aa(t) {
    return cf(Je, t);
  }
  function Mu(t, a) {
    return Je === null && $e(t), cf(t, a);
  }
  function cf(t, a) {
    var e = a._currentValue;
    if (a = { context: a, memoizedValue: e, next: null }, ee === null) {
      if (t === null) throw Error(f(308));
      ee = a, t.dependencies = { lanes: 0, firstContext: a }, t.flags |= 524288;
    } else ee = ee.next = a;
    return e;
  }
  var jv = typeof AbortController < "u" ? AbortController : function() {
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
  }, Tv = c.unstable_scheduleCallback, Ev = c.unstable_NormalPriority, Lt = {
    $$typeof: L,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function oc() {
    return {
      controller: new jv(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function gn(t) {
    t.refCount--, t.refCount === 0 && Tv(Ev, function() {
      t.controller.abort();
    });
  }
  var yn = null, dc = 0, Nl = 0, zl = null;
  function _v(t, a) {
    if (yn === null) {
      var e = yn = [];
      dc = 0, Nl = vs(), zl = {
        status: "pending",
        value: void 0,
        then: function(l) {
          e.push(l);
        }
      };
    }
    return dc++, a.then(sf, sf), a;
  }
  function sf() {
    if (--dc === 0 && yn !== null) {
      zl !== null && (zl.status = "fulfilled");
      var t = yn;
      yn = null, Nl = 0, zl = null;
      for (var a = 0; a < t.length; a++) (0, t[a])();
    }
  }
  function Nv(t, a) {
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
  var rf = N.S;
  N.S = function(t, a) {
    typeof a == "object" && a !== null && typeof a.then == "function" && _v(t, a), rf !== null && rf(t, a);
  };
  var We = D(null);
  function hc() {
    var t = We.current;
    return t !== null ? t : At.pooledCache;
  }
  function Ou(t, a) {
    a === null ? Y(We, We.current) : Y(We, a.pool);
  }
  function ff() {
    var t = hc();
    return t === null ? null : { parent: Lt._currentValue, pool: t };
  }
  var bn = Error(f(460)), of = Error(f(474)), Du = Error(f(542)), vc = { then: function() {
  } };
  function df(t) {
    return t = t.status, t === "fulfilled" || t === "rejected";
  }
  function Ru() {
  }
  function hf(t, a, e) {
    switch (e = t[e], e === void 0 ? t.push(a) : e !== a && (a.then(Ru, Ru), a = e), a.status) {
      case "fulfilled":
        return a.value;
      case "rejected":
        throw t = a.reason, mf(t), t;
      default:
        if (typeof a.status == "string") a.then(Ru, Ru);
        else {
          if (t = At, t !== null && 100 < t.shellSuspendCounter)
            throw Error(f(482));
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
            throw t = a.reason, mf(t), t;
        }
        throw xn = a, bn;
    }
  }
  var xn = null;
  function vf() {
    if (xn === null) throw Error(f(459));
    var t = xn;
    return xn = null, t;
  }
  function mf(t) {
    if (t === bn || t === Du)
      throw Error(f(483));
  }
  var ye = !1;
  function mc(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function pc(t, a) {
    t = t.updateQueue, a.updateQueue === t && (a.updateQueue = {
      baseState: t.baseState,
      firstBaseUpdate: t.firstBaseUpdate,
      lastBaseUpdate: t.lastBaseUpdate,
      shared: t.shared,
      callbacks: null
    });
  }
  function be(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function xe(t, a, e) {
    var l = t.updateQueue;
    if (l === null) return null;
    if (l = l.shared, (St & 2) !== 0) {
      var n = l.pending;
      return n === null ? a.next = a : (a.next = n.next, n.next = a), l.pending = a, a = Eu(t), tf(t, null, e), a;
    }
    return Tu(t, l, a, e), Eu(t);
  }
  function Sn(t, a, e) {
    if (a = a.updateQueue, a !== null && (a = a.shared, (e & 4194048) !== 0)) {
      var l = a.lanes;
      l &= t.pendingLanes, e |= l, a.lanes = e, T(t, e);
    }
  }
  function gc(t, a) {
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
  var yc = !1;
  function jn() {
    if (yc) {
      var t = zl;
      if (t !== null) throw t;
    }
  }
  function Tn(t, a, e, l) {
    yc = !1;
    var n = t.updateQueue;
    ye = !1;
    var u = n.firstBaseUpdate, i = n.lastBaseUpdate, r = n.shared.pending;
    if (r !== null) {
      n.shared.pending = null;
      var d = r, y = d.next;
      d.next = null, i === null ? u = y : i.next = y, i = d;
      var z = t.alternate;
      z !== null && (z = z.updateQueue, r = z.lastBaseUpdate, r !== i && (r === null ? z.firstBaseUpdate = y : r.next = y, z.lastBaseUpdate = d));
    }
    if (u !== null) {
      var O = n.baseState;
      i = 0, z = y = d = null, r = u;
      do {
        var x = r.lane & -536870913, S = x !== r.lane;
        if (S ? (ht & x) === x : (l & x) === x) {
          x !== 0 && x === Nl && (yc = !0), z !== null && (z = z.next = {
            lane: 0,
            tag: r.tag,
            payload: r.payload,
            callback: null,
            next: null
          });
          t: {
            var lt = t, P = r;
            x = a;
            var Nt = e;
            switch (P.tag) {
              case 1:
                if (lt = P.payload, typeof lt == "function") {
                  O = lt.call(Nt, O, x);
                  break t;
                }
                O = lt;
                break t;
              case 3:
                lt.flags = lt.flags & -65537 | 128;
              case 0:
                if (lt = P.payload, x = typeof lt == "function" ? lt.call(Nt, O, x) : lt, x == null) break t;
                O = R({}, O, x);
                break t;
              case 2:
                ye = !0;
            }
          }
          x = r.callback, x !== null && (t.flags |= 64, S && (t.flags |= 8192), S = n.callbacks, S === null ? n.callbacks = [x] : S.push(x));
        } else
          S = {
            lane: x,
            tag: r.tag,
            payload: r.payload,
            callback: r.callback,
            next: null
          }, z === null ? (y = z = S, d = O) : z = z.next = S, i |= x;
        if (r = r.next, r === null) {
          if (r = n.shared.pending, r === null)
            break;
          S = r, r = S.next, S.next = null, n.lastBaseUpdate = S, n.shared.pending = null;
        }
      } while (!0);
      z === null && (d = O), n.baseState = d, n.firstBaseUpdate = y, n.lastBaseUpdate = z, u === null && (n.shared.lanes = 0), Ae |= i, t.lanes = i, t.memoizedState = O;
    }
  }
  function pf(t, a) {
    if (typeof t != "function")
      throw Error(f(191, t));
    t.call(a);
  }
  function gf(t, a) {
    var e = t.callbacks;
    if (e !== null)
      for (t.callbacks = null, t = 0; t < e.length; t++)
        pf(e[t], a);
  }
  var Al = D(null), Uu = D(0);
  function yf(t, a) {
    t = fe, Y(Uu, t), Y(Al, a), fe = t | a.baseLanes;
  }
  function bc() {
    Y(Uu, fe), Y(Al, Al.current);
  }
  function xc() {
    fe = Uu.current, X(Al), X(Uu);
  }
  var Se = 0, st = null, Et = null, Yt = null, qu = !1, Ml = !1, Fe = !1, wu = 0, En = 0, Ol = null, zv = 0;
  function Ht() {
    throw Error(f(321));
  }
  function Sc(t, a) {
    if (a === null) return !1;
    for (var e = 0; e < a.length && e < t.length; e++)
      if (!da(t[e], a[e])) return !1;
    return !0;
  }
  function jc(t, a, e, l, n, u) {
    return Se = u, st = a, a.memoizedState = null, a.updateQueue = null, a.lanes = 0, N.H = t === null || t.memoizedState === null ? ao : eo, Fe = !1, u = e(l, n), Fe = !1, Ml && (u = xf(
      a,
      e,
      l,
      n
    )), bf(t), u;
  }
  function bf(t) {
    N.H = Lu;
    var a = Et !== null && Et.next !== null;
    if (Se = 0, Yt = Et = st = null, qu = !1, En = 0, Ol = null, a) throw Error(f(300));
    t === null || kt || (t = t.dependencies, t !== null && Au(t) && (kt = !0));
  }
  function xf(t, a, e, l) {
    st = t;
    var n = 0;
    do {
      if (Ml && (Ol = null), En = 0, Ml = !1, 25 <= n) throw Error(f(301));
      if (n += 1, Yt = Et = null, t.updateQueue != null) {
        var u = t.updateQueue;
        u.lastEffect = null, u.events = null, u.stores = null, u.memoCache != null && (u.memoCache.index = 0);
      }
      N.H = qv, u = a(e, l);
    } while (Ml);
    return u;
  }
  function Av() {
    var t = N.H, a = t.useState()[0];
    return a = typeof a.then == "function" ? _n(a) : a, t = t.useState()[0], (Et !== null ? Et.memoizedState : null) !== t && (st.flags |= 1024), a;
  }
  function Tc() {
    var t = wu !== 0;
    return wu = 0, t;
  }
  function Ec(t, a, e) {
    a.updateQueue = t.updateQueue, a.flags &= -2053, t.lanes &= ~e;
  }
  function _c(t) {
    if (qu) {
      for (t = t.memoizedState; t !== null; ) {
        var a = t.queue;
        a !== null && (a.pending = null), t = t.next;
      }
      qu = !1;
    }
    Se = 0, Yt = Et = st = null, Ml = !1, En = wu = 0, Ol = null;
  }
  function sa() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Yt === null ? st.memoizedState = Yt = t : Yt = Yt.next = t, Yt;
  }
  function Gt() {
    if (Et === null) {
      var t = st.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = Et.next;
    var a = Yt === null ? st.memoizedState : Yt.next;
    if (a !== null)
      Yt = a, Et = t;
    else {
      if (t === null)
        throw st.alternate === null ? Error(f(467)) : Error(f(310));
      Et = t, t = {
        memoizedState: Et.memoizedState,
        baseState: Et.baseState,
        baseQueue: Et.baseQueue,
        queue: Et.queue,
        next: null
      }, Yt === null ? st.memoizedState = Yt = t : Yt = Yt.next = t;
    }
    return Yt;
  }
  function Nc() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function _n(t) {
    var a = En;
    return En += 1, Ol === null && (Ol = []), t = hf(Ol, t, a), a = st, (Yt === null ? a.memoizedState : Yt.next) === null && (a = a.alternate, N.H = a === null || a.memoizedState === null ? ao : eo), t;
  }
  function Cu(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return _n(t);
      if (t.$$typeof === L) return aa(t);
    }
    throw Error(f(438, String(t)));
  }
  function zc(t) {
    var a = null, e = st.updateQueue;
    if (e !== null && (a = e.memoCache), a == null) {
      var l = st.alternate;
      l !== null && (l = l.updateQueue, l !== null && (l = l.memoCache, l != null && (a = {
        data: l.data.map(function(n) {
          return n.slice();
        }),
        index: 0
      })));
    }
    if (a == null && (a = { data: [], index: 0 }), e === null && (e = Nc(), st.updateQueue = e), e.memoCache = a, e = a.data[a.index], e === void 0)
      for (e = a.data[a.index] = Array(t), l = 0; l < t; l++)
        e[l] = Kt;
    return a.index++, e;
  }
  function ne(t, a) {
    return typeof a == "function" ? a(t) : a;
  }
  function Hu(t) {
    var a = Gt();
    return Ac(a, Et, t);
  }
  function Ac(t, a, e) {
    var l = t.queue;
    if (l === null) throw Error(f(311));
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
      var r = i = null, d = null, y = a, z = !1;
      do {
        var O = y.lane & -536870913;
        if (O !== y.lane ? (ht & O) === O : (Se & O) === O) {
          var x = y.revertLane;
          if (x === 0)
            d !== null && (d = d.next = {
              lane: 0,
              revertLane: 0,
              action: y.action,
              hasEagerState: y.hasEagerState,
              eagerState: y.eagerState,
              next: null
            }), O === Nl && (z = !0);
          else if ((Se & x) === x) {
            y = y.next, x === Nl && (z = !0);
            continue;
          } else
            O = {
              lane: 0,
              revertLane: y.revertLane,
              action: y.action,
              hasEagerState: y.hasEagerState,
              eagerState: y.eagerState,
              next: null
            }, d === null ? (r = d = O, i = u) : d = d.next = O, st.lanes |= x, Ae |= x;
          O = y.action, Fe && e(u, O), u = y.hasEagerState ? y.eagerState : e(u, O);
        } else
          x = {
            lane: O,
            revertLane: y.revertLane,
            action: y.action,
            hasEagerState: y.hasEagerState,
            eagerState: y.eagerState,
            next: null
          }, d === null ? (r = d = x, i = u) : d = d.next = x, st.lanes |= O, Ae |= O;
        y = y.next;
      } while (y !== null && y !== a);
      if (d === null ? i = u : d.next = r, !da(u, t.memoizedState) && (kt = !0, z && (e = zl, e !== null)))
        throw e;
      t.memoizedState = u, t.baseState = i, t.baseQueue = d, l.lastRenderedState = u;
    }
    return n === null && (l.lanes = 0), [t.memoizedState, l.dispatch];
  }
  function Mc(t) {
    var a = Gt(), e = a.queue;
    if (e === null) throw Error(f(311));
    e.lastRenderedReducer = t;
    var l = e.dispatch, n = e.pending, u = a.memoizedState;
    if (n !== null) {
      e.pending = null;
      var i = n = n.next;
      do
        u = t(u, i.action), i = i.next;
      while (i !== n);
      da(u, a.memoizedState) || (kt = !0), a.memoizedState = u, a.baseQueue === null && (a.baseState = u), e.lastRenderedState = u;
    }
    return [u, l];
  }
  function Sf(t, a, e) {
    var l = st, n = Gt(), u = yt;
    if (u) {
      if (e === void 0) throw Error(f(407));
      e = e();
    } else e = a();
    var i = !da(
      (Et || n).memoizedState,
      e
    );
    i && (n.memoizedState = e, kt = !0), n = n.queue;
    var r = Ef.bind(null, l, n, t);
    if (Nn(2048, 8, r, [t]), n.getSnapshot !== a || i || Yt !== null && Yt.memoizedState.tag & 1) {
      if (l.flags |= 2048, Dl(
        9,
        Bu(),
        Tf.bind(
          null,
          l,
          n,
          e,
          a
        ),
        null
      ), At === null) throw Error(f(349));
      u || (Se & 124) !== 0 || jf(l, a, e);
    }
    return e;
  }
  function jf(t, a, e) {
    t.flags |= 16384, t = { getSnapshot: a, value: e }, a = st.updateQueue, a === null ? (a = Nc(), st.updateQueue = a, a.stores = [t]) : (e = a.stores, e === null ? a.stores = [t] : e.push(t));
  }
  function Tf(t, a, e, l) {
    a.value = e, a.getSnapshot = l, _f(a) && Nf(t);
  }
  function Ef(t, a, e) {
    return e(function() {
      _f(a) && Nf(t);
    });
  }
  function _f(t) {
    var a = t.getSnapshot;
    t = t.value;
    try {
      var e = a();
      return !da(t, e);
    } catch {
      return !0;
    }
  }
  function Nf(t) {
    var a = jl(t, 2);
    a !== null && ya(a, t, 2);
  }
  function Oc(t) {
    var a = sa();
    if (typeof t == "function") {
      var e = t;
      if (t = e(), Fe) {
        Ua(!0);
        try {
          e();
        } finally {
          Ua(!1);
        }
      }
    }
    return a.memoizedState = a.baseState = t, a.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: ne,
      lastRenderedState: t
    }, a;
  }
  function zf(t, a, e, l) {
    return t.baseState = e, Ac(
      t,
      Et,
      typeof l == "function" ? l : ne
    );
  }
  function Mv(t, a, e, l, n) {
    if (Gu(t)) throw Error(f(485));
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
      N.T !== null ? e(!0) : u.isTransition = !1, l(u), e = a.pending, e === null ? (u.next = a.pending = u, Af(a, u)) : (u.next = e.next, a.pending = e.next = u);
    }
  }
  function Af(t, a) {
    var e = a.action, l = a.payload, n = t.state;
    if (a.isTransition) {
      var u = N.T, i = {};
      N.T = i;
      try {
        var r = e(n, l), d = N.S;
        d !== null && d(i, r), Mf(t, a, r);
      } catch (y) {
        Dc(t, a, y);
      } finally {
        N.T = u;
      }
    } else
      try {
        u = e(n, l), Mf(t, a, u);
      } catch (y) {
        Dc(t, a, y);
      }
  }
  function Mf(t, a, e) {
    e !== null && typeof e == "object" && typeof e.then == "function" ? e.then(
      function(l) {
        Of(t, a, l);
      },
      function(l) {
        return Dc(t, a, l);
      }
    ) : Of(t, a, e);
  }
  function Of(t, a, e) {
    a.status = "fulfilled", a.value = e, Df(a), t.state = e, a = t.pending, a !== null && (e = a.next, e === a ? t.pending = null : (e = e.next, a.next = e, Af(t, e)));
  }
  function Dc(t, a, e) {
    var l = t.pending;
    if (t.pending = null, l !== null) {
      l = l.next;
      do
        a.status = "rejected", a.reason = e, Df(a), a = a.next;
      while (a !== l);
    }
    t.action = null;
  }
  function Df(t) {
    t = t.listeners;
    for (var a = 0; a < t.length; a++) (0, t[a])();
  }
  function Rf(t, a) {
    return a;
  }
  function Uf(t, a) {
    if (yt) {
      var e = At.formState;
      if (e !== null) {
        t: {
          var l = st;
          if (yt) {
            if (Ut) {
              a: {
                for (var n = Ut, u = Xa; n.nodeType !== 8; ) {
                  if (!u) {
                    n = null;
                    break a;
                  }
                  if (n = Ca(
                    n.nextSibling
                  ), n === null) {
                    n = null;
                    break a;
                  }
                }
                u = n.data, n = u === "F!" || u === "F" ? n : null;
              }
              if (n) {
                Ut = Ca(
                  n.nextSibling
                ), l = n.data === "F!";
                break t;
              }
            }
            Ke(l);
          }
          l = !1;
        }
        l && (a = e[0]);
      }
    }
    return e = sa(), e.memoizedState = e.baseState = a, l = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Rf,
      lastRenderedState: a
    }, e.queue = l, e = If.bind(
      null,
      st,
      l
    ), l.dispatch = e, l = Oc(!1), u = Cc.bind(
      null,
      st,
      !1,
      l.queue
    ), l = sa(), n = {
      state: a,
      dispatch: null,
      action: t,
      pending: null
    }, l.queue = n, e = Mv.bind(
      null,
      st,
      n,
      u,
      e
    ), n.dispatch = e, l.memoizedState = t, [a, e, !1];
  }
  function qf(t) {
    var a = Gt();
    return wf(a, Et, t);
  }
  function wf(t, a, e) {
    if (a = Ac(
      t,
      a,
      Rf
    )[0], t = Hu(ne)[0], typeof a == "object" && a !== null && typeof a.then == "function")
      try {
        var l = _n(a);
      } catch (i) {
        throw i === bn ? Du : i;
      }
    else l = a;
    a = Gt();
    var n = a.queue, u = n.dispatch;
    return e !== a.memoizedState && (st.flags |= 2048, Dl(
      9,
      Bu(),
      Ov.bind(null, n, e),
      null
    )), [l, u, t];
  }
  function Ov(t, a) {
    t.action = a;
  }
  function Cf(t) {
    var a = Gt(), e = Et;
    if (e !== null)
      return wf(a, e, t);
    Gt(), a = a.memoizedState, e = Gt();
    var l = e.queue.dispatch;
    return e.memoizedState = t, [a, l, !1];
  }
  function Dl(t, a, e, l) {
    return t = { tag: t, create: e, deps: l, inst: a, next: null }, a = st.updateQueue, a === null && (a = Nc(), st.updateQueue = a), e = a.lastEffect, e === null ? a.lastEffect = t.next = t : (l = e.next, e.next = t, t.next = l, a.lastEffect = t), t;
  }
  function Bu() {
    return { destroy: void 0, resource: void 0 };
  }
  function Hf() {
    return Gt().memoizedState;
  }
  function Yu(t, a, e, l) {
    var n = sa();
    l = l === void 0 ? null : l, st.flags |= t, n.memoizedState = Dl(
      1 | a,
      Bu(),
      e,
      l
    );
  }
  function Nn(t, a, e, l) {
    var n = Gt();
    l = l === void 0 ? null : l;
    var u = n.memoizedState.inst;
    Et !== null && l !== null && Sc(l, Et.memoizedState.deps) ? n.memoizedState = Dl(a, u, e, l) : (st.flags |= t, n.memoizedState = Dl(
      1 | a,
      u,
      e,
      l
    ));
  }
  function Bf(t, a) {
    Yu(8390656, 8, t, a);
  }
  function Yf(t, a) {
    Nn(2048, 8, t, a);
  }
  function Gf(t, a) {
    return Nn(4, 2, t, a);
  }
  function Lf(t, a) {
    return Nn(4, 4, t, a);
  }
  function Xf(t, a) {
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
  function Qf(t, a, e) {
    e = e != null ? e.concat([t]) : null, Nn(4, 4, Xf.bind(null, a, t), e);
  }
  function Rc() {
  }
  function kf(t, a) {
    var e = Gt();
    a = a === void 0 ? null : a;
    var l = e.memoizedState;
    return a !== null && Sc(a, l[1]) ? l[0] : (e.memoizedState = [t, a], t);
  }
  function Zf(t, a) {
    var e = Gt();
    a = a === void 0 ? null : a;
    var l = e.memoizedState;
    if (a !== null && Sc(a, l[1]))
      return l[0];
    if (l = t(), Fe) {
      Ua(!0);
      try {
        t();
      } finally {
        Ua(!1);
      }
    }
    return e.memoizedState = [l, a], l;
  }
  function Uc(t, a, e) {
    return e === void 0 || (Se & 1073741824) !== 0 ? t.memoizedState = a : (t.memoizedState = e, t = $o(), st.lanes |= t, Ae |= t, e);
  }
  function Vf(t, a, e, l) {
    return da(e, a) ? e : Al.current !== null ? (t = Uc(t, e, l), da(t, a) || (kt = !0), t) : (Se & 42) === 0 ? (kt = !0, t.memoizedState = e) : (t = $o(), st.lanes |= t, Ae |= t, a);
  }
  function Kf(t, a, e, l, n) {
    var u = B.p;
    B.p = u !== 0 && 8 > u ? u : 8;
    var i = N.T, r = {};
    N.T = r, Cc(t, !1, a, e);
    try {
      var d = n(), y = N.S;
      if (y !== null && y(r, d), d !== null && typeof d == "object" && typeof d.then == "function") {
        var z = Nv(
          d,
          l
        );
        zn(
          t,
          a,
          z,
          ga(t)
        );
      } else
        zn(
          t,
          a,
          l,
          ga(t)
        );
    } catch (O) {
      zn(
        t,
        a,
        { then: function() {
        }, status: "rejected", reason: O },
        ga()
      );
    } finally {
      B.p = u, N.T = i;
    }
  }
  function Dv() {
  }
  function qc(t, a, e, l) {
    if (t.tag !== 5) throw Error(f(476));
    var n = Jf(t).queue;
    Kf(
      t,
      n,
      a,
      I,
      e === null ? Dv : function() {
        return $f(t), e(l);
      }
    );
  }
  function Jf(t) {
    var a = t.memoizedState;
    if (a !== null) return a;
    a = {
      memoizedState: I,
      baseState: I,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: ne,
        lastRenderedState: I
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
        lastRenderedReducer: ne,
        lastRenderedState: e
      },
      next: null
    }, t.memoizedState = a, t = t.alternate, t !== null && (t.memoizedState = a), a;
  }
  function $f(t) {
    var a = Jf(t).next.queue;
    zn(t, a, {}, ga());
  }
  function wc() {
    return aa(Zn);
  }
  function Wf() {
    return Gt().memoizedState;
  }
  function Ff() {
    return Gt().memoizedState;
  }
  function Rv(t) {
    for (var a = t.return; a !== null; ) {
      switch (a.tag) {
        case 24:
        case 3:
          var e = ga();
          t = be(e);
          var l = xe(a, t, e);
          l !== null && (ya(l, a, e), Sn(l, a, e)), a = { cache: oc() }, t.payload = a;
          return;
      }
      a = a.return;
    }
  }
  function Uv(t, a, e) {
    var l = ga();
    e = {
      lane: l,
      revertLane: 0,
      action: e,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Gu(t) ? Pf(a, e) : (e = ac(t, a, e, l), e !== null && (ya(e, t, l), to(e, a, l)));
  }
  function If(t, a, e) {
    var l = ga();
    zn(t, a, e, l);
  }
  function zn(t, a, e, l) {
    var n = {
      lane: l,
      revertLane: 0,
      action: e,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Gu(t)) Pf(a, n);
    else {
      var u = t.alternate;
      if (t.lanes === 0 && (u === null || u.lanes === 0) && (u = a.lastRenderedReducer, u !== null))
        try {
          var i = a.lastRenderedState, r = u(i, e);
          if (n.hasEagerState = !0, n.eagerState = r, da(r, i))
            return Tu(t, a, n, 0), At === null && ju(), !1;
        } catch {
        } finally {
        }
      if (e = ac(t, a, n, l), e !== null)
        return ya(e, t, l), to(e, a, l), !0;
    }
    return !1;
  }
  function Cc(t, a, e, l) {
    if (l = {
      lane: 2,
      revertLane: vs(),
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Gu(t)) {
      if (a) throw Error(f(479));
    } else
      a = ac(
        t,
        e,
        l,
        2
      ), a !== null && ya(a, t, 2);
  }
  function Gu(t) {
    var a = t.alternate;
    return t === st || a !== null && a === st;
  }
  function Pf(t, a) {
    Ml = qu = !0;
    var e = t.pending;
    e === null ? a.next = a : (a.next = e.next, e.next = a), t.pending = a;
  }
  function to(t, a, e) {
    if ((e & 4194048) !== 0) {
      var l = a.lanes;
      l &= t.pendingLanes, e |= l, a.lanes = e, T(t, e);
    }
  }
  var Lu = {
    readContext: aa,
    use: Cu,
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
  }, ao = {
    readContext: aa,
    use: Cu,
    useCallback: function(t, a) {
      return sa().memoizedState = [
        t,
        a === void 0 ? null : a
      ], t;
    },
    useContext: aa,
    useEffect: Bf,
    useImperativeHandle: function(t, a, e) {
      e = e != null ? e.concat([t]) : null, Yu(
        4194308,
        4,
        Xf.bind(null, a, t),
        e
      );
    },
    useLayoutEffect: function(t, a) {
      return Yu(4194308, 4, t, a);
    },
    useInsertionEffect: function(t, a) {
      Yu(4, 2, t, a);
    },
    useMemo: function(t, a) {
      var e = sa();
      a = a === void 0 ? null : a;
      var l = t();
      if (Fe) {
        Ua(!0);
        try {
          t();
        } finally {
          Ua(!1);
        }
      }
      return e.memoizedState = [l, a], l;
    },
    useReducer: function(t, a, e) {
      var l = sa();
      if (e !== void 0) {
        var n = e(a);
        if (Fe) {
          Ua(!0);
          try {
            e(a);
          } finally {
            Ua(!1);
          }
        }
      } else n = a;
      return l.memoizedState = l.baseState = n, t = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: t,
        lastRenderedState: n
      }, l.queue = t, t = t.dispatch = Uv.bind(
        null,
        st,
        t
      ), [l.memoizedState, t];
    },
    useRef: function(t) {
      var a = sa();
      return t = { current: t }, a.memoizedState = t;
    },
    useState: function(t) {
      t = Oc(t);
      var a = t.queue, e = If.bind(null, st, a);
      return a.dispatch = e, [t.memoizedState, e];
    },
    useDebugValue: Rc,
    useDeferredValue: function(t, a) {
      var e = sa();
      return Uc(e, t, a);
    },
    useTransition: function() {
      var t = Oc(!1);
      return t = Kf.bind(
        null,
        st,
        t.queue,
        !0,
        !1
      ), sa().memoizedState = t, [!1, t];
    },
    useSyncExternalStore: function(t, a, e) {
      var l = st, n = sa();
      if (yt) {
        if (e === void 0)
          throw Error(f(407));
        e = e();
      } else {
        if (e = a(), At === null)
          throw Error(f(349));
        (ht & 124) !== 0 || jf(l, a, e);
      }
      n.memoizedState = e;
      var u = { value: e, getSnapshot: a };
      return n.queue = u, Bf(Ef.bind(null, l, u, t), [
        t
      ]), l.flags |= 2048, Dl(
        9,
        Bu(),
        Tf.bind(
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
      var t = sa(), a = At.identifierPrefix;
      if (yt) {
        var e = ae, l = te;
        e = (l & ~(1 << 32 - Wt(l) - 1)).toString(32) + e, a = "«" + a + "R" + e, e = wu++, 0 < e && (a += "H" + e.toString(32)), a += "»";
      } else
        e = zv++, a = "«" + a + "r" + e.toString(32) + "»";
      return t.memoizedState = a;
    },
    useHostTransitionStatus: wc,
    useFormState: Uf,
    useActionState: Uf,
    useOptimistic: function(t) {
      var a = sa();
      a.memoizedState = a.baseState = t;
      var e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return a.queue = e, a = Cc.bind(
        null,
        st,
        !0,
        e
      ), e.dispatch = a, [t, a];
    },
    useMemoCache: zc,
    useCacheRefresh: function() {
      return sa().memoizedState = Rv.bind(
        null,
        st
      );
    }
  }, eo = {
    readContext: aa,
    use: Cu,
    useCallback: kf,
    useContext: aa,
    useEffect: Yf,
    useImperativeHandle: Qf,
    useInsertionEffect: Gf,
    useLayoutEffect: Lf,
    useMemo: Zf,
    useReducer: Hu,
    useRef: Hf,
    useState: function() {
      return Hu(ne);
    },
    useDebugValue: Rc,
    useDeferredValue: function(t, a) {
      var e = Gt();
      return Vf(
        e,
        Et.memoizedState,
        t,
        a
      );
    },
    useTransition: function() {
      var t = Hu(ne)[0], a = Gt().memoizedState;
      return [
        typeof t == "boolean" ? t : _n(t),
        a
      ];
    },
    useSyncExternalStore: Sf,
    useId: Wf,
    useHostTransitionStatus: wc,
    useFormState: qf,
    useActionState: qf,
    useOptimistic: function(t, a) {
      var e = Gt();
      return zf(e, Et, t, a);
    },
    useMemoCache: zc,
    useCacheRefresh: Ff
  }, qv = {
    readContext: aa,
    use: Cu,
    useCallback: kf,
    useContext: aa,
    useEffect: Yf,
    useImperativeHandle: Qf,
    useInsertionEffect: Gf,
    useLayoutEffect: Lf,
    useMemo: Zf,
    useReducer: Mc,
    useRef: Hf,
    useState: function() {
      return Mc(ne);
    },
    useDebugValue: Rc,
    useDeferredValue: function(t, a) {
      var e = Gt();
      return Et === null ? Uc(e, t, a) : Vf(
        e,
        Et.memoizedState,
        t,
        a
      );
    },
    useTransition: function() {
      var t = Mc(ne)[0], a = Gt().memoizedState;
      return [
        typeof t == "boolean" ? t : _n(t),
        a
      ];
    },
    useSyncExternalStore: Sf,
    useId: Wf,
    useHostTransitionStatus: wc,
    useFormState: Cf,
    useActionState: Cf,
    useOptimistic: function(t, a) {
      var e = Gt();
      return Et !== null ? zf(e, Et, t, a) : (e.baseState = t, [t, e.queue.dispatch]);
    },
    useMemoCache: zc,
    useCacheRefresh: Ff
  }, Rl = null, An = 0;
  function Xu(t) {
    var a = An;
    return An += 1, Rl === null && (Rl = []), hf(Rl, t, a);
  }
  function Mn(t, a) {
    a = a.props.ref, t.ref = a !== void 0 ? a : null;
  }
  function Qu(t, a) {
    throw a.$$typeof === H ? Error(f(525)) : (t = Object.prototype.toString.call(a), Error(
      f(
        31,
        t === "[object Object]" ? "object with keys {" + Object.keys(a).join(", ") + "}" : t
      )
    ));
  }
  function lo(t) {
    var a = t._init;
    return a(t._payload);
  }
  function no(t) {
    function a(p, v) {
      if (t) {
        var g = p.deletions;
        g === null ? (p.deletions = [v], p.flags |= 16) : g.push(v);
      }
    }
    function e(p, v) {
      if (!t) return null;
      for (; v !== null; )
        a(p, v), v = v.sibling;
      return null;
    }
    function l(p) {
      for (var v = /* @__PURE__ */ new Map(); p !== null; )
        p.key !== null ? v.set(p.key, p) : v.set(p.index, p), p = p.sibling;
      return v;
    }
    function n(p, v) {
      return p = Pa(p, v), p.index = 0, p.sibling = null, p;
    }
    function u(p, v, g) {
      return p.index = g, t ? (g = p.alternate, g !== null ? (g = g.index, g < v ? (p.flags |= 67108866, v) : g) : (p.flags |= 67108866, v)) : (p.flags |= 1048576, v);
    }
    function i(p) {
      return t && p.alternate === null && (p.flags |= 67108866), p;
    }
    function r(p, v, g, A) {
      return v === null || v.tag !== 6 ? (v = lc(g, p.mode, A), v.return = p, v) : (v = n(v, g), v.return = p, v);
    }
    function d(p, v, g, A) {
      var Z = g.type;
      return Z === Q ? z(
        p,
        v,
        g.props.children,
        A,
        g.key
      ) : v !== null && (v.elementType === Z || typeof Z == "object" && Z !== null && Z.$$typeof === W && lo(Z) === v.type) ? (v = n(v, g.props), Mn(v, g), v.return = p, v) : (v = _u(
        g.type,
        g.key,
        g.props,
        null,
        p.mode,
        A
      ), Mn(v, g), v.return = p, v);
    }
    function y(p, v, g, A) {
      return v === null || v.tag !== 4 || v.stateNode.containerInfo !== g.containerInfo || v.stateNode.implementation !== g.implementation ? (v = nc(g, p.mode, A), v.return = p, v) : (v = n(v, g.children || []), v.return = p, v);
    }
    function z(p, v, g, A, Z) {
      return v === null || v.tag !== 7 ? (v = Qe(
        g,
        p.mode,
        A,
        Z
      ), v.return = p, v) : (v = n(v, g), v.return = p, v);
    }
    function O(p, v, g) {
      if (typeof v == "string" && v !== "" || typeof v == "number" || typeof v == "bigint")
        return v = lc(
          "" + v,
          p.mode,
          g
        ), v.return = p, v;
      if (typeof v == "object" && v !== null) {
        switch (v.$$typeof) {
          case U:
            return g = _u(
              v.type,
              v.key,
              v.props,
              null,
              p.mode,
              g
            ), Mn(g, v), g.return = p, g;
          case C:
            return v = nc(
              v,
              p.mode,
              g
            ), v.return = p, v;
          case W:
            var A = v._init;
            return v = A(v._payload), O(p, v, g);
        }
        if (wt(v) || Tt(v))
          return v = Qe(
            v,
            p.mode,
            g,
            null
          ), v.return = p, v;
        if (typeof v.then == "function")
          return O(p, Xu(v), g);
        if (v.$$typeof === L)
          return O(
            p,
            Mu(p, v),
            g
          );
        Qu(p, v);
      }
      return null;
    }
    function x(p, v, g, A) {
      var Z = v !== null ? v.key : null;
      if (typeof g == "string" && g !== "" || typeof g == "number" || typeof g == "bigint")
        return Z !== null ? null : r(p, v, "" + g, A);
      if (typeof g == "object" && g !== null) {
        switch (g.$$typeof) {
          case U:
            return g.key === Z ? d(p, v, g, A) : null;
          case C:
            return g.key === Z ? y(p, v, g, A) : null;
          case W:
            return Z = g._init, g = Z(g._payload), x(p, v, g, A);
        }
        if (wt(g) || Tt(g))
          return Z !== null ? null : z(p, v, g, A, null);
        if (typeof g.then == "function")
          return x(
            p,
            v,
            Xu(g),
            A
          );
        if (g.$$typeof === L)
          return x(
            p,
            v,
            Mu(p, g),
            A
          );
        Qu(p, g);
      }
      return null;
    }
    function S(p, v, g, A, Z) {
      if (typeof A == "string" && A !== "" || typeof A == "number" || typeof A == "bigint")
        return p = p.get(g) || null, r(v, p, "" + A, Z);
      if (typeof A == "object" && A !== null) {
        switch (A.$$typeof) {
          case U:
            return p = p.get(
              A.key === null ? g : A.key
            ) || null, d(v, p, A, Z);
          case C:
            return p = p.get(
              A.key === null ? g : A.key
            ) || null, y(v, p, A, Z);
          case W:
            var rt = A._init;
            return A = rt(A._payload), S(
              p,
              v,
              g,
              A,
              Z
            );
        }
        if (wt(A) || Tt(A))
          return p = p.get(g) || null, z(v, p, A, Z, null);
        if (typeof A.then == "function")
          return S(
            p,
            v,
            g,
            Xu(A),
            Z
          );
        if (A.$$typeof === L)
          return S(
            p,
            v,
            g,
            Mu(v, A),
            Z
          );
        Qu(v, A);
      }
      return null;
    }
    function lt(p, v, g, A) {
      for (var Z = null, rt = null, $ = v, tt = v = 0, Vt = null; $ !== null && tt < g.length; tt++) {
        $.index > tt ? (Vt = $, $ = null) : Vt = $.sibling;
        var mt = x(
          p,
          $,
          g[tt],
          A
        );
        if (mt === null) {
          $ === null && ($ = Vt);
          break;
        }
        t && $ && mt.alternate === null && a(p, $), v = u(mt, v, tt), rt === null ? Z = mt : rt.sibling = mt, rt = mt, $ = Vt;
      }
      if (tt === g.length)
        return e(p, $), yt && Ze(p, tt), Z;
      if ($ === null) {
        for (; tt < g.length; tt++)
          $ = O(p, g[tt], A), $ !== null && (v = u(
            $,
            v,
            tt
          ), rt === null ? Z = $ : rt.sibling = $, rt = $);
        return yt && Ze(p, tt), Z;
      }
      for ($ = l($); tt < g.length; tt++)
        Vt = S(
          $,
          p,
          tt,
          g[tt],
          A
        ), Vt !== null && (t && Vt.alternate !== null && $.delete(
          Vt.key === null ? tt : Vt.key
        ), v = u(
          Vt,
          v,
          tt
        ), rt === null ? Z = Vt : rt.sibling = Vt, rt = Vt);
      return t && $.forEach(function(He) {
        return a(p, He);
      }), yt && Ze(p, tt), Z;
    }
    function P(p, v, g, A) {
      if (g == null) throw Error(f(151));
      for (var Z = null, rt = null, $ = v, tt = v = 0, Vt = null, mt = g.next(); $ !== null && !mt.done; tt++, mt = g.next()) {
        $.index > tt ? (Vt = $, $ = null) : Vt = $.sibling;
        var He = x(p, $, mt.value, A);
        if (He === null) {
          $ === null && ($ = Vt);
          break;
        }
        t && $ && He.alternate === null && a(p, $), v = u(He, v, tt), rt === null ? Z = He : rt.sibling = He, rt = He, $ = Vt;
      }
      if (mt.done)
        return e(p, $), yt && Ze(p, tt), Z;
      if ($ === null) {
        for (; !mt.done; tt++, mt = g.next())
          mt = O(p, mt.value, A), mt !== null && (v = u(mt, v, tt), rt === null ? Z = mt : rt.sibling = mt, rt = mt);
        return yt && Ze(p, tt), Z;
      }
      for ($ = l($); !mt.done; tt++, mt = g.next())
        mt = S($, p, tt, mt.value, A), mt !== null && (t && mt.alternate !== null && $.delete(mt.key === null ? tt : mt.key), v = u(mt, v, tt), rt === null ? Z = mt : rt.sibling = mt, rt = mt);
      return t && $.forEach(function(wm) {
        return a(p, wm);
      }), yt && Ze(p, tt), Z;
    }
    function Nt(p, v, g, A) {
      if (typeof g == "object" && g !== null && g.type === Q && g.key === null && (g = g.props.children), typeof g == "object" && g !== null) {
        switch (g.$$typeof) {
          case U:
            t: {
              for (var Z = g.key; v !== null; ) {
                if (v.key === Z) {
                  if (Z = g.type, Z === Q) {
                    if (v.tag === 7) {
                      e(
                        p,
                        v.sibling
                      ), A = n(
                        v,
                        g.props.children
                      ), A.return = p, p = A;
                      break t;
                    }
                  } else if (v.elementType === Z || typeof Z == "object" && Z !== null && Z.$$typeof === W && lo(Z) === v.type) {
                    e(
                      p,
                      v.sibling
                    ), A = n(v, g.props), Mn(A, g), A.return = p, p = A;
                    break t;
                  }
                  e(p, v);
                  break;
                } else a(p, v);
                v = v.sibling;
              }
              g.type === Q ? (A = Qe(
                g.props.children,
                p.mode,
                A,
                g.key
              ), A.return = p, p = A) : (A = _u(
                g.type,
                g.key,
                g.props,
                null,
                p.mode,
                A
              ), Mn(A, g), A.return = p, p = A);
            }
            return i(p);
          case C:
            t: {
              for (Z = g.key; v !== null; ) {
                if (v.key === Z)
                  if (v.tag === 4 && v.stateNode.containerInfo === g.containerInfo && v.stateNode.implementation === g.implementation) {
                    e(
                      p,
                      v.sibling
                    ), A = n(v, g.children || []), A.return = p, p = A;
                    break t;
                  } else {
                    e(p, v);
                    break;
                  }
                else a(p, v);
                v = v.sibling;
              }
              A = nc(g, p.mode, A), A.return = p, p = A;
            }
            return i(p);
          case W:
            return Z = g._init, g = Z(g._payload), Nt(
              p,
              v,
              g,
              A
            );
        }
        if (wt(g))
          return lt(
            p,
            v,
            g,
            A
          );
        if (Tt(g)) {
          if (Z = Tt(g), typeof Z != "function") throw Error(f(150));
          return g = Z.call(g), P(
            p,
            v,
            g,
            A
          );
        }
        if (typeof g.then == "function")
          return Nt(
            p,
            v,
            Xu(g),
            A
          );
        if (g.$$typeof === L)
          return Nt(
            p,
            v,
            Mu(p, g),
            A
          );
        Qu(p, g);
      }
      return typeof g == "string" && g !== "" || typeof g == "number" || typeof g == "bigint" ? (g = "" + g, v !== null && v.tag === 6 ? (e(p, v.sibling), A = n(v, g), A.return = p, p = A) : (e(p, v), A = lc(g, p.mode, A), A.return = p, p = A), i(p)) : e(p, v);
    }
    return function(p, v, g, A) {
      try {
        An = 0;
        var Z = Nt(
          p,
          v,
          g,
          A
        );
        return Rl = null, Z;
      } catch ($) {
        if ($ === bn || $ === Du) throw $;
        var rt = ha(29, $, null, p.mode);
        return rt.lanes = A, rt.return = p, rt;
      } finally {
      }
    };
  }
  var Ul = no(!0), uo = no(!1), Aa = D(null), Qa = null;
  function je(t) {
    var a = t.alternate;
    Y(Xt, Xt.current & 1), Y(Aa, t), Qa === null && (a === null || Al.current !== null || a.memoizedState !== null) && (Qa = t);
  }
  function io(t) {
    if (t.tag === 22) {
      if (Y(Xt, Xt.current), Y(Aa, t), Qa === null) {
        var a = t.alternate;
        a !== null && a.memoizedState !== null && (Qa = t);
      }
    } else Te();
  }
  function Te() {
    Y(Xt, Xt.current), Y(Aa, Aa.current);
  }
  function ue(t) {
    X(Aa), Qa === t && (Qa = null), X(Xt);
  }
  var Xt = D(0);
  function ku(t) {
    for (var a = t; a !== null; ) {
      if (a.tag === 13) {
        var e = a.memoizedState;
        if (e !== null && (e = e.dehydrated, e === null || e.data === "$?" || Ns(e)))
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
    a = t.memoizedState, e = e(l, a), e = e == null ? a : R({}, a, e), t.memoizedState = e, t.lanes === 0 && (t.updateQueue.baseState = e);
  }
  var Bc = {
    enqueueSetState: function(t, a, e) {
      t = t._reactInternals;
      var l = ga(), n = be(l);
      n.payload = a, e != null && (n.callback = e), a = xe(t, n, l), a !== null && (ya(a, t, l), Sn(a, t, l));
    },
    enqueueReplaceState: function(t, a, e) {
      t = t._reactInternals;
      var l = ga(), n = be(l);
      n.tag = 1, n.payload = a, e != null && (n.callback = e), a = xe(t, n, l), a !== null && (ya(a, t, l), Sn(a, t, l));
    },
    enqueueForceUpdate: function(t, a) {
      t = t._reactInternals;
      var e = ga(), l = be(e);
      l.tag = 2, a != null && (l.callback = a), a = xe(t, l, e), a !== null && (ya(a, t, e), Sn(a, t, e));
    }
  };
  function co(t, a, e, l, n, u, i) {
    return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(l, u, i) : a.prototype && a.prototype.isPureReactComponent ? !on(e, l) || !on(n, u) : !0;
  }
  function so(t, a, e, l) {
    t = a.state, typeof a.componentWillReceiveProps == "function" && a.componentWillReceiveProps(e, l), typeof a.UNSAFE_componentWillReceiveProps == "function" && a.UNSAFE_componentWillReceiveProps(e, l), a.state !== t && Bc.enqueueReplaceState(a, a.state, null);
  }
  function Ie(t, a) {
    var e = a;
    if ("ref" in a) {
      e = {};
      for (var l in a)
        l !== "ref" && (e[l] = a[l]);
    }
    if (t = t.defaultProps) {
      e === a && (e = R({}, e));
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
  function ro(t) {
    Zu(t);
  }
  function fo(t) {
    console.error(t);
  }
  function oo(t) {
    Zu(t);
  }
  function Vu(t, a) {
    try {
      var e = t.onUncaughtError;
      e(a.value, { componentStack: a.stack });
    } catch (l) {
      setTimeout(function() {
        throw l;
      });
    }
  }
  function ho(t, a, e) {
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
  function Yc(t, a, e) {
    return e = be(e), e.tag = 3, e.payload = { element: null }, e.callback = function() {
      Vu(t, a);
    }, e;
  }
  function vo(t) {
    return t = be(t), t.tag = 3, t;
  }
  function mo(t, a, e, l) {
    var n = e.type.getDerivedStateFromError;
    if (typeof n == "function") {
      var u = l.value;
      t.payload = function() {
        return n(u);
      }, t.callback = function() {
        ho(a, e, l);
      };
    }
    var i = e.stateNode;
    i !== null && typeof i.componentDidCatch == "function" && (t.callback = function() {
      ho(a, e, l), typeof n != "function" && (Me === null ? Me = /* @__PURE__ */ new Set([this]) : Me.add(this));
      var r = l.stack;
      this.componentDidCatch(l.value, {
        componentStack: r !== null ? r : ""
      });
    });
  }
  function wv(t, a, e, l, n) {
    if (e.flags |= 32768, l !== null && typeof l == "object" && typeof l.then == "function") {
      if (a = e.alternate, a !== null && pn(
        a,
        e,
        n,
        !0
      ), e = Aa.current, e !== null) {
        switch (e.tag) {
          case 13:
            return Qa === null ? rs() : e.alternate === null && qt === 0 && (qt = 3), e.flags &= -257, e.flags |= 65536, e.lanes = n, l === vc ? e.flags |= 16384 : (a = e.updateQueue, a === null ? e.updateQueue = /* @__PURE__ */ new Set([l]) : a.add(l), os(t, l, n)), !1;
          case 22:
            return e.flags |= 65536, l === vc ? e.flags |= 16384 : (a = e.updateQueue, a === null ? (a = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([l])
            }, e.updateQueue = a) : (e = a.retryQueue, e === null ? a.retryQueue = /* @__PURE__ */ new Set([l]) : e.add(l)), os(t, l, n)), !1;
        }
        throw Error(f(435, e.tag));
      }
      return os(t, l, n), rs(), !1;
    }
    if (yt)
      return a = Aa.current, a !== null ? ((a.flags & 65536) === 0 && (a.flags |= 256), a.flags |= 65536, a.lanes = n, l !== cc && (t = Error(f(422), { cause: l }), mn(Ea(t, e)))) : (l !== cc && (a = Error(f(423), {
        cause: l
      }), mn(
        Ea(a, e)
      )), t = t.current.alternate, t.flags |= 65536, n &= -n, t.lanes |= n, l = Ea(l, e), n = Yc(
        t.stateNode,
        l,
        n
      ), gc(t, n), qt !== 4 && (qt = 2)), !1;
    var u = Error(f(520), { cause: l });
    if (u = Ea(u, e), Cn === null ? Cn = [u] : Cn.push(u), qt !== 4 && (qt = 2), a === null) return !0;
    l = Ea(l, e), e = a;
    do {
      switch (e.tag) {
        case 3:
          return e.flags |= 65536, t = n & -n, e.lanes |= t, t = Yc(e.stateNode, l, t), gc(e, t), !1;
        case 1:
          if (a = e.type, u = e.stateNode, (e.flags & 128) === 0 && (typeof a.getDerivedStateFromError == "function" || u !== null && typeof u.componentDidCatch == "function" && (Me === null || !Me.has(u))))
            return e.flags |= 65536, n &= -n, e.lanes |= n, n = vo(n), mo(
              n,
              t,
              e,
              l
            ), gc(e, n), !1;
      }
      e = e.return;
    } while (e !== null);
    return !1;
  }
  var po = Error(f(461)), kt = !1;
  function Ft(t, a, e, l) {
    a.child = t === null ? uo(a, null, e, l) : Ul(
      a,
      t.child,
      e,
      l
    );
  }
  function go(t, a, e, l, n) {
    e = e.render;
    var u = a.ref;
    if ("ref" in l) {
      var i = {};
      for (var r in l)
        r !== "ref" && (i[r] = l[r]);
    } else i = l;
    return $e(a), l = jc(
      t,
      a,
      e,
      i,
      u,
      n
    ), r = Tc(), t !== null && !kt ? (Ec(t, a, n), ie(t, a, n)) : (yt && r && uc(a), a.flags |= 1, Ft(t, a, l, n), a.child);
  }
  function yo(t, a, e, l, n) {
    if (t === null) {
      var u = e.type;
      return typeof u == "function" && !ec(u) && u.defaultProps === void 0 && e.compare === null ? (a.tag = 15, a.type = u, bo(
        t,
        a,
        u,
        l,
        n
      )) : (t = _u(
        e.type,
        null,
        l,
        a,
        a.mode,
        n
      ), t.ref = a.ref, t.return = a, a.child = t);
    }
    if (u = t.child, !Kc(t, n)) {
      var i = u.memoizedProps;
      if (e = e.compare, e = e !== null ? e : on, e(i, l) && t.ref === a.ref)
        return ie(t, a, n);
    }
    return a.flags |= 1, t = Pa(u, l), t.ref = a.ref, t.return = a, a.child = t;
  }
  function bo(t, a, e, l, n) {
    if (t !== null) {
      var u = t.memoizedProps;
      if (on(u, l) && t.ref === a.ref)
        if (kt = !1, a.pendingProps = l = u, Kc(t, n))
          (t.flags & 131072) !== 0 && (kt = !0);
        else
          return a.lanes = t.lanes, ie(t, a, n);
    }
    return Gc(
      t,
      a,
      e,
      l,
      n
    );
  }
  function xo(t, a, e) {
    var l = a.pendingProps, n = l.children, u = t !== null ? t.memoizedState : null;
    if (l.mode === "hidden") {
      if ((a.flags & 128) !== 0) {
        if (l = u !== null ? u.baseLanes | e : e, t !== null) {
          for (n = a.child = t.child, u = 0; n !== null; )
            u = u | n.lanes | n.childLanes, n = n.sibling;
          a.childLanes = u & ~l;
        } else a.childLanes = 0, a.child = null;
        return So(
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
        ), u !== null ? yf(a, u) : bc(), io(a);
      else
        return a.lanes = a.childLanes = 536870912, So(
          t,
          a,
          u !== null ? u.baseLanes | e : e,
          e
        );
    } else
      u !== null ? (Ou(a, u.cachePool), yf(a, u), Te(), a.memoizedState = null) : (t !== null && Ou(a, null), bc(), Te());
    return Ft(t, a, n, e), a.child;
  }
  function So(t, a, e, l) {
    var n = hc();
    return n = n === null ? null : { parent: Lt._currentValue, pool: n }, a.memoizedState = {
      baseLanes: e,
      cachePool: n
    }, t !== null && Ou(a, null), bc(), io(a), t !== null && pn(t, a, l, !0), null;
  }
  function Ku(t, a) {
    var e = a.ref;
    if (e === null)
      t !== null && t.ref !== null && (a.flags |= 4194816);
    else {
      if (typeof e != "function" && typeof e != "object")
        throw Error(f(284));
      (t === null || t.ref !== e) && (a.flags |= 4194816);
    }
  }
  function Gc(t, a, e, l, n) {
    return $e(a), e = jc(
      t,
      a,
      e,
      l,
      void 0,
      n
    ), l = Tc(), t !== null && !kt ? (Ec(t, a, n), ie(t, a, n)) : (yt && l && uc(a), a.flags |= 1, Ft(t, a, e, n), a.child);
  }
  function jo(t, a, e, l, n, u) {
    return $e(a), a.updateQueue = null, e = xf(
      a,
      l,
      e,
      n
    ), bf(t), l = Tc(), t !== null && !kt ? (Ec(t, a, u), ie(t, a, u)) : (yt && l && uc(a), a.flags |= 1, Ft(t, a, e, u), a.child);
  }
  function To(t, a, e, l, n) {
    if ($e(a), a.stateNode === null) {
      var u = Tl, i = e.contextType;
      typeof i == "object" && i !== null && (u = aa(i)), u = new e(l, u), a.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null, u.updater = Bc, a.stateNode = u, u._reactInternals = a, u = a.stateNode, u.props = l, u.state = a.memoizedState, u.refs = {}, mc(a), i = e.contextType, u.context = typeof i == "object" && i !== null ? aa(i) : Tl, u.state = a.memoizedState, i = e.getDerivedStateFromProps, typeof i == "function" && (Hc(
        a,
        e,
        i,
        l
      ), u.state = a.memoizedState), typeof e.getDerivedStateFromProps == "function" || typeof u.getSnapshotBeforeUpdate == "function" || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (i = u.state, typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount(), i !== u.state && Bc.enqueueReplaceState(u, u.state, null), Tn(a, l, u, n), jn(), u.state = a.memoizedState), typeof u.componentDidMount == "function" && (a.flags |= 4194308), l = !0;
    } else if (t === null) {
      u = a.stateNode;
      var r = a.memoizedProps, d = Ie(e, r);
      u.props = d;
      var y = u.context, z = e.contextType;
      i = Tl, typeof z == "object" && z !== null && (i = aa(z));
      var O = e.getDerivedStateFromProps;
      z = typeof O == "function" || typeof u.getSnapshotBeforeUpdate == "function", r = a.pendingProps !== r, z || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (r || y !== i) && so(
        a,
        u,
        l,
        i
      ), ye = !1;
      var x = a.memoizedState;
      u.state = x, Tn(a, l, u, n), jn(), y = a.memoizedState, r || x !== y || ye ? (typeof O == "function" && (Hc(
        a,
        e,
        O,
        l
      ), y = a.memoizedState), (d = ye || co(
        a,
        e,
        d,
        l,
        x,
        y,
        i
      )) ? (z || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function" && (a.flags |= 4194308)) : (typeof u.componentDidMount == "function" && (a.flags |= 4194308), a.memoizedProps = l, a.memoizedState = y), u.props = l, u.state = y, u.context = i, l = d) : (typeof u.componentDidMount == "function" && (a.flags |= 4194308), l = !1);
    } else {
      u = a.stateNode, pc(t, a), i = a.memoizedProps, z = Ie(e, i), u.props = z, O = a.pendingProps, x = u.context, y = e.contextType, d = Tl, typeof y == "object" && y !== null && (d = aa(y)), r = e.getDerivedStateFromProps, (y = typeof r == "function" || typeof u.getSnapshotBeforeUpdate == "function") || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (i !== O || x !== d) && so(
        a,
        u,
        l,
        d
      ), ye = !1, x = a.memoizedState, u.state = x, Tn(a, l, u, n), jn();
      var S = a.memoizedState;
      i !== O || x !== S || ye || t !== null && t.dependencies !== null && Au(t.dependencies) ? (typeof r == "function" && (Hc(
        a,
        e,
        r,
        l
      ), S = a.memoizedState), (z = ye || co(
        a,
        e,
        z,
        l,
        x,
        S,
        d
      ) || t !== null && t.dependencies !== null && Au(t.dependencies)) ? (y || typeof u.UNSAFE_componentWillUpdate != "function" && typeof u.componentWillUpdate != "function" || (typeof u.componentWillUpdate == "function" && u.componentWillUpdate(l, S, d), typeof u.UNSAFE_componentWillUpdate == "function" && u.UNSAFE_componentWillUpdate(
        l,
        S,
        d
      )), typeof u.componentDidUpdate == "function" && (a.flags |= 4), typeof u.getSnapshotBeforeUpdate == "function" && (a.flags |= 1024)) : (typeof u.componentDidUpdate != "function" || i === t.memoizedProps && x === t.memoizedState || (a.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || i === t.memoizedProps && x === t.memoizedState || (a.flags |= 1024), a.memoizedProps = l, a.memoizedState = S), u.props = l, u.state = S, u.context = d, l = z) : (typeof u.componentDidUpdate != "function" || i === t.memoizedProps && x === t.memoizedState || (a.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || i === t.memoizedProps && x === t.memoizedState || (a.flags |= 1024), l = !1);
    }
    return u = l, Ku(t, a), l = (a.flags & 128) !== 0, u || l ? (u = a.stateNode, e = l && typeof e.getDerivedStateFromError != "function" ? null : u.render(), a.flags |= 1, t !== null && l ? (a.child = Ul(
      a,
      t.child,
      null,
      n
    ), a.child = Ul(
      a,
      null,
      e,
      n
    )) : Ft(t, a, e, n), a.memoizedState = u.state, t = a.child) : t = ie(
      t,
      a,
      n
    ), t;
  }
  function Eo(t, a, e, l) {
    return vn(), a.flags |= 256, Ft(t, a, e, l), a.child;
  }
  var Lc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Xc(t) {
    return { baseLanes: t, cachePool: ff() };
  }
  function Qc(t, a, e) {
    return t = t !== null ? t.childLanes & ~e : 0, a && (t |= Ma), t;
  }
  function _o(t, a, e) {
    var l = a.pendingProps, n = !1, u = (a.flags & 128) !== 0, i;
    if ((i = u) || (i = t !== null && t.memoizedState === null ? !1 : (Xt.current & 2) !== 0), i && (n = !0, a.flags &= -129), i = (a.flags & 32) !== 0, a.flags &= -33, t === null) {
      if (yt) {
        if (n ? je(a) : Te(), yt) {
          var r = Ut, d;
          if (d = r) {
            t: {
              for (d = r, r = Xa; d.nodeType !== 8; ) {
                if (!r) {
                  r = null;
                  break t;
                }
                if (d = Ca(
                  d.nextSibling
                ), d === null) {
                  r = null;
                  break t;
                }
              }
              r = d;
            }
            r !== null ? (a.memoizedState = {
              dehydrated: r,
              treeContext: ke !== null ? { id: te, overflow: ae } : null,
              retryLane: 536870912,
              hydrationErrors: null
            }, d = ha(
              18,
              null,
              null,
              0
            ), d.stateNode = r, d.return = a, a.child = d, la = a, Ut = null, d = !0) : d = !1;
          }
          d || Ke(a);
        }
        if (r = a.memoizedState, r !== null && (r = r.dehydrated, r !== null))
          return Ns(r) ? a.lanes = 32 : a.lanes = 536870912, null;
        ue(a);
      }
      return r = l.children, l = l.fallback, n ? (Te(), n = a.mode, r = Ju(
        { mode: "hidden", children: r },
        n
      ), l = Qe(
        l,
        n,
        e,
        null
      ), r.return = a, l.return = a, r.sibling = l, a.child = r, n = a.child, n.memoizedState = Xc(e), n.childLanes = Qc(
        t,
        i,
        e
      ), a.memoizedState = Lc, l) : (je(a), kc(a, r));
    }
    if (d = t.memoizedState, d !== null && (r = d.dehydrated, r !== null)) {
      if (u)
        a.flags & 256 ? (je(a), a.flags &= -257, a = Zc(
          t,
          a,
          e
        )) : a.memoizedState !== null ? (Te(), a.child = t.child, a.flags |= 128, a = null) : (Te(), n = l.fallback, r = a.mode, l = Ju(
          { mode: "visible", children: l.children },
          r
        ), n = Qe(
          n,
          r,
          e,
          null
        ), n.flags |= 2, l.return = a, n.return = a, l.sibling = n, a.child = l, Ul(
          a,
          t.child,
          null,
          e
        ), l = a.child, l.memoizedState = Xc(e), l.childLanes = Qc(
          t,
          i,
          e
        ), a.memoizedState = Lc, a = n);
      else if (je(a), Ns(r)) {
        if (i = r.nextSibling && r.nextSibling.dataset, i) var y = i.dgst;
        i = y, l = Error(f(419)), l.stack = "", l.digest = i, mn({ value: l, source: null, stack: null }), a = Zc(
          t,
          a,
          e
        );
      } else if (kt || pn(t, a, e, !1), i = (e & t.childLanes) !== 0, kt || i) {
        if (i = At, i !== null && (l = e & -e, l = (l & 42) !== 0 ? 1 : ut(l), l = (l & (i.suspendedLanes | e)) !== 0 ? 0 : l, l !== 0 && l !== d.retryLane))
          throw d.retryLane = l, jl(t, l), ya(i, t, l), po;
        r.data === "$?" || rs(), a = Zc(
          t,
          a,
          e
        );
      } else
        r.data === "$?" ? (a.flags |= 192, a.child = t.child, a = null) : (t = d.treeContext, Ut = Ca(
          r.nextSibling
        ), la = a, yt = !0, Ve = null, Xa = !1, t !== null && (Na[za++] = te, Na[za++] = ae, Na[za++] = ke, te = t.id, ae = t.overflow, ke = a), a = kc(
          a,
          l.children
        ), a.flags |= 4096);
      return a;
    }
    return n ? (Te(), n = l.fallback, r = a.mode, d = t.child, y = d.sibling, l = Pa(d, {
      mode: "hidden",
      children: l.children
    }), l.subtreeFlags = d.subtreeFlags & 65011712, y !== null ? n = Pa(y, n) : (n = Qe(
      n,
      r,
      e,
      null
    ), n.flags |= 2), n.return = a, l.return = a, l.sibling = n, a.child = l, l = n, n = a.child, r = t.child.memoizedState, r === null ? r = Xc(e) : (d = r.cachePool, d !== null ? (y = Lt._currentValue, d = d.parent !== y ? { parent: y, pool: y } : d) : d = ff(), r = {
      baseLanes: r.baseLanes | e,
      cachePool: d
    }), n.memoizedState = r, n.childLanes = Qc(
      t,
      i,
      e
    ), a.memoizedState = Lc, l) : (je(a), e = t.child, t = e.sibling, e = Pa(e, {
      mode: "visible",
      children: l.children
    }), e.return = a, e.sibling = null, t !== null && (i = a.deletions, i === null ? (a.deletions = [t], a.flags |= 16) : i.push(t)), a.child = e, a.memoizedState = null, e);
  }
  function kc(t, a) {
    return a = Ju(
      { mode: "visible", children: a },
      t.mode
    ), a.return = t, t.child = a;
  }
  function Ju(t, a) {
    return t = ha(22, t, null, a), t.lanes = 0, t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }, t;
  }
  function Zc(t, a, e) {
    return Ul(a, t.child, null, e), t = kc(
      a,
      a.pendingProps.children
    ), t.flags |= 2, a.memoizedState = null, t;
  }
  function No(t, a, e) {
    t.lanes |= a;
    var l = t.alternate;
    l !== null && (l.lanes |= a), rc(t.return, a, e);
  }
  function Vc(t, a, e, l, n) {
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
  function zo(t, a, e) {
    var l = a.pendingProps, n = l.revealOrder, u = l.tail;
    if (Ft(t, a, l.children, e), l = Xt.current, (l & 2) !== 0)
      l = l & 1 | 2, a.flags |= 128;
    else {
      if (t !== null && (t.flags & 128) !== 0)
        t: for (t = a.child; t !== null; ) {
          if (t.tag === 13)
            t.memoizedState !== null && No(t, e, a);
          else if (t.tag === 19)
            No(t, e, a);
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
    switch (Y(Xt, l), n) {
      case "forwards":
        for (e = a.child, n = null; e !== null; )
          t = e.alternate, t !== null && ku(t) === null && (n = e), e = e.sibling;
        e = n, e === null ? (n = a.child, a.child = null) : (n = e.sibling, e.sibling = null), Vc(
          a,
          !1,
          n,
          e,
          u
        );
        break;
      case "backwards":
        for (e = null, n = a.child, a.child = null; n !== null; ) {
          if (t = n.alternate, t !== null && ku(t) === null) {
            a.child = n;
            break;
          }
          t = n.sibling, n.sibling = e, e = n, n = t;
        }
        Vc(
          a,
          !0,
          e,
          null,
          u
        );
        break;
      case "together":
        Vc(a, !1, null, null, void 0);
        break;
      default:
        a.memoizedState = null;
    }
    return a.child;
  }
  function ie(t, a, e) {
    if (t !== null && (a.dependencies = t.dependencies), Ae |= a.lanes, (e & a.childLanes) === 0)
      if (t !== null) {
        if (pn(
          t,
          a,
          e,
          !1
        ), (e & a.childLanes) === 0)
          return null;
      } else return null;
    if (t !== null && a.child !== t.child)
      throw Error(f(153));
    if (a.child !== null) {
      for (t = a.child, e = Pa(t, t.pendingProps), a.child = e, e.return = a; t.sibling !== null; )
        t = t.sibling, e = e.sibling = Pa(t, t.pendingProps), e.return = a;
      e.sibling = null;
    }
    return a.child;
  }
  function Kc(t, a) {
    return (t.lanes & a) !== 0 ? !0 : (t = t.dependencies, !!(t !== null && Au(t)));
  }
  function Cv(t, a, e) {
    switch (a.tag) {
      case 3:
        pt(a, a.stateNode.containerInfo), ge(a, Lt, t.memoizedState.cache), vn();
        break;
      case 27:
      case 5:
        Il(a);
        break;
      case 4:
        pt(a, a.stateNode.containerInfo);
        break;
      case 10:
        ge(
          a,
          a.type,
          a.memoizedProps.value
        );
        break;
      case 13:
        var l = a.memoizedState;
        if (l !== null)
          return l.dehydrated !== null ? (je(a), a.flags |= 128, null) : (e & a.child.childLanes) !== 0 ? _o(t, a, e) : (je(a), t = ie(
            t,
            a,
            e
          ), t !== null ? t.sibling : null);
        je(a);
        break;
      case 19:
        var n = (t.flags & 128) !== 0;
        if (l = (e & a.childLanes) !== 0, l || (pn(
          t,
          a,
          e,
          !1
        ), l = (e & a.childLanes) !== 0), n) {
          if (l)
            return zo(
              t,
              a,
              e
            );
          a.flags |= 128;
        }
        if (n = a.memoizedState, n !== null && (n.rendering = null, n.tail = null, n.lastEffect = null), Y(Xt, Xt.current), l) break;
        return null;
      case 22:
      case 23:
        return a.lanes = 0, xo(t, a, e);
      case 24:
        ge(a, Lt, t.memoizedState.cache);
    }
    return ie(t, a, e);
  }
  function Ao(t, a, e) {
    if (t !== null)
      if (t.memoizedProps !== a.pendingProps)
        kt = !0;
      else {
        if (!Kc(t, e) && (a.flags & 128) === 0)
          return kt = !1, Cv(
            t,
            a,
            e
          );
        kt = (t.flags & 131072) !== 0;
      }
    else
      kt = !1, yt && (a.flags & 1048576) !== 0 && ef(a, zu, a.index);
    switch (a.lanes = 0, a.tag) {
      case 16:
        t: {
          t = a.pendingProps;
          var l = a.elementType, n = l._init;
          if (l = n(l._payload), a.type = l, typeof l == "function")
            ec(l) ? (t = Ie(l, t), a.tag = 1, a = To(
              null,
              a,
              l,
              t,
              e
            )) : (a.tag = 0, a = Gc(
              null,
              a,
              l,
              t,
              e
            ));
          else {
            if (l != null) {
              if (n = l.$$typeof, n === F) {
                a.tag = 11, a = go(
                  null,
                  a,
                  l,
                  t,
                  e
                );
                break t;
              } else if (n === w) {
                a.tag = 14, a = yo(
                  null,
                  a,
                  l,
                  t,
                  e
                );
                break t;
              }
            }
            throw a = Ra(l) || l, Error(f(306, a, ""));
          }
        }
        return a;
      case 0:
        return Gc(
          t,
          a,
          a.type,
          a.pendingProps,
          e
        );
      case 1:
        return l = a.type, n = Ie(
          l,
          a.pendingProps
        ), To(
          t,
          a,
          l,
          n,
          e
        );
      case 3:
        t: {
          if (pt(
            a,
            a.stateNode.containerInfo
          ), t === null) throw Error(f(387));
          l = a.pendingProps;
          var u = a.memoizedState;
          n = u.element, pc(t, a), Tn(a, l, null, e);
          var i = a.memoizedState;
          if (l = i.cache, ge(a, Lt, l), l !== u.cache && fc(
            a,
            [Lt],
            e,
            !0
          ), jn(), l = i.element, u.isDehydrated)
            if (u = {
              element: l,
              isDehydrated: !1,
              cache: i.cache
            }, a.updateQueue.baseState = u, a.memoizedState = u, a.flags & 256) {
              a = Eo(
                t,
                a,
                l,
                e
              );
              break t;
            } else if (l !== n) {
              n = Ea(
                Error(f(424)),
                a
              ), mn(n), a = Eo(
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
              for (Ut = Ca(t.firstChild), la = a, yt = !0, Ve = null, Xa = !0, e = uo(
                a,
                null,
                l,
                e
              ), a.child = e; e; )
                e.flags = e.flags & -3 | 4096, e = e.sibling;
            }
          else {
            if (vn(), l === n) {
              a = ie(
                t,
                a,
                e
              );
              break t;
            }
            Ft(
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
        return Ku(t, a), t === null ? (e = Rd(
          a.type,
          null,
          a.pendingProps,
          null
        )) ? a.memoizedState = e : yt || (e = a.type, t = a.pendingProps, l = si(
          V.current
        ).createElement(e), l[Ct] = a, l[ia] = t, Pt(l, e, t), Qt(l), a.stateNode = l) : a.memoizedState = Rd(
          a.type,
          t.memoizedProps,
          a.pendingProps,
          t.memoizedState
        ), null;
      case 27:
        return Il(a), t === null && yt && (l = a.stateNode = Md(
          a.type,
          a.pendingProps,
          V.current
        ), la = a, Xa = !0, n = Ut, Re(a.type) ? (zs = n, Ut = Ca(
          l.firstChild
        )) : Ut = n), Ft(
          t,
          a,
          a.pendingProps.children,
          e
        ), Ku(t, a), t === null && (a.flags |= 4194304), a.child;
      case 5:
        return t === null && yt && ((n = l = Ut) && (l = fm(
          l,
          a.type,
          a.pendingProps,
          Xa
        ), l !== null ? (a.stateNode = l, la = a, Ut = Ca(
          l.firstChild
        ), Xa = !1, n = !0) : n = !1), n || Ke(a)), Il(a), n = a.type, u = a.pendingProps, i = t !== null ? t.memoizedProps : null, l = u.children, Ts(n, u) ? l = null : i !== null && Ts(n, i) && (a.flags |= 32), a.memoizedState !== null && (n = jc(
          t,
          a,
          Av,
          null,
          null,
          e
        ), Zn._currentValue = n), Ku(t, a), Ft(t, a, l, e), a.child;
      case 6:
        return t === null && yt && ((t = e = Ut) && (e = om(
          e,
          a.pendingProps,
          Xa
        ), e !== null ? (a.stateNode = e, la = a, Ut = null, t = !0) : t = !1), t || Ke(a)), null;
      case 13:
        return _o(t, a, e);
      case 4:
        return pt(
          a,
          a.stateNode.containerInfo
        ), l = a.pendingProps, t === null ? a.child = Ul(
          a,
          null,
          l,
          e
        ) : Ft(
          t,
          a,
          l,
          e
        ), a.child;
      case 11:
        return go(
          t,
          a,
          a.type,
          a.pendingProps,
          e
        );
      case 7:
        return Ft(
          t,
          a,
          a.pendingProps,
          e
        ), a.child;
      case 8:
        return Ft(
          t,
          a,
          a.pendingProps.children,
          e
        ), a.child;
      case 12:
        return Ft(
          t,
          a,
          a.pendingProps.children,
          e
        ), a.child;
      case 10:
        return l = a.pendingProps, ge(a, a.type, l.value), Ft(
          t,
          a,
          l.children,
          e
        ), a.child;
      case 9:
        return n = a.type._context, l = a.pendingProps.children, $e(a), n = aa(n), l = l(n), a.flags |= 1, Ft(t, a, l, e), a.child;
      case 14:
        return yo(
          t,
          a,
          a.type,
          a.pendingProps,
          e
        );
      case 15:
        return bo(
          t,
          a,
          a.type,
          a.pendingProps,
          e
        );
      case 19:
        return zo(t, a, e);
      case 31:
        return l = a.pendingProps, e = a.mode, l = {
          mode: l.mode,
          children: l.children
        }, t === null ? (e = Ju(
          l,
          e
        ), e.ref = a.ref, a.child = e, e.return = a, a = e) : (e = Pa(t.child, l), e.ref = a.ref, a.child = e, e.return = a, a = e), a;
      case 22:
        return xo(t, a, e);
      case 24:
        return $e(a), l = aa(Lt), t === null ? (n = hc(), n === null && (n = At, u = oc(), n.pooledCache = u, u.refCount++, u !== null && (n.pooledCacheLanes |= e), n = u), a.memoizedState = {
          parent: l,
          cache: n
        }, mc(a), ge(a, Lt, n)) : ((t.lanes & e) !== 0 && (pc(t, a), Tn(a, null, null, e), jn()), n = t.memoizedState, u = a.memoizedState, n.parent !== l ? (n = { parent: l, cache: l }, a.memoizedState = n, a.lanes === 0 && (a.memoizedState = a.updateQueue.baseState = n), ge(a, Lt, l)) : (l = u.cache, ge(a, Lt, l), l !== n.cache && fc(
          a,
          [Lt],
          e,
          !0
        ))), Ft(
          t,
          a,
          a.pendingProps.children,
          e
        ), a.child;
      case 29:
        throw a.pendingProps;
    }
    throw Error(f(156, a.tag));
  }
  function ce(t) {
    t.flags |= 4;
  }
  function Mo(t, a) {
    if (a.type !== "stylesheet" || (a.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (t.flags |= 16777216, !Hd(a)) {
      if (a = Aa.current, a !== null && ((ht & 4194048) === ht ? Qa !== null : (ht & 62914560) !== ht && (ht & 536870912) === 0 || a !== Qa))
        throw xn = vc, of;
      t.flags |= 8192;
    }
  }
  function $u(t, a) {
    a !== null && (t.flags |= 4), t.flags & 16384 && (a = t.tag !== 22 ? Pl() : 536870912, t.lanes |= a, Hl |= a);
  }
  function On(t, a) {
    if (!yt)
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
  function Rt(t) {
    var a = t.alternate !== null && t.alternate.child === t.child, e = 0, l = 0;
    if (a)
      for (var n = t.child; n !== null; )
        e |= n.lanes | n.childLanes, l |= n.subtreeFlags & 65011712, l |= n.flags & 65011712, n.return = t, n = n.sibling;
    else
      for (n = t.child; n !== null; )
        e |= n.lanes | n.childLanes, l |= n.subtreeFlags, l |= n.flags, n.return = t, n = n.sibling;
    return t.subtreeFlags |= l, t.childLanes = e, a;
  }
  function Hv(t, a, e) {
    var l = a.pendingProps;
    switch (ic(a), a.tag) {
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
        return Rt(a), null;
      case 1:
        return Rt(a), null;
      case 3:
        return e = a.stateNode, l = null, t !== null && (l = t.memoizedState.cache), a.memoizedState.cache !== l && (a.flags |= 2048), le(Lt), Ba(), e.pendingContext && (e.context = e.pendingContext, e.pendingContext = null), (t === null || t.child === null) && (hn(a) ? ce(a) : t === null || t.memoizedState.isDehydrated && (a.flags & 256) === 0 || (a.flags |= 1024, uf())), Rt(a), null;
      case 26:
        return e = a.memoizedState, t === null ? (ce(a), e !== null ? (Rt(a), Mo(a, e)) : (Rt(a), a.flags &= -16777217)) : e ? e !== t.memoizedState ? (ce(a), Rt(a), Mo(a, e)) : (Rt(a), a.flags &= -16777217) : (t.memoizedProps !== l && ce(a), Rt(a), a.flags &= -16777217), null;
      case 27:
        Ya(a), e = V.current;
        var n = a.type;
        if (t !== null && a.stateNode != null)
          t.memoizedProps !== l && ce(a);
        else {
          if (!l) {
            if (a.stateNode === null)
              throw Error(f(166));
            return Rt(a), null;
          }
          t = K.current, hn(a) ? lf(a) : (t = Md(n, l, e), a.stateNode = t, ce(a));
        }
        return Rt(a), null;
      case 5:
        if (Ya(a), e = a.type, t !== null && a.stateNode != null)
          t.memoizedProps !== l && ce(a);
        else {
          if (!l) {
            if (a.stateNode === null)
              throw Error(f(166));
            return Rt(a), null;
          }
          if (t = K.current, hn(a))
            lf(a);
          else {
            switch (n = si(
              V.current
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
            t[Ct] = a, t[ia] = l;
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
            t: switch (Pt(t, e, l), e) {
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
            t && ce(a);
          }
        }
        return Rt(a), a.flags &= -16777217, null;
      case 6:
        if (t && a.stateNode != null)
          t.memoizedProps !== l && ce(a);
        else {
          if (typeof l != "string" && a.stateNode === null)
            throw Error(f(166));
          if (t = V.current, hn(a)) {
            if (t = a.stateNode, e = a.memoizedProps, l = null, n = la, n !== null)
              switch (n.tag) {
                case 27:
                case 5:
                  l = n.memoizedProps;
              }
            t[Ct] = a, t = !!(t.nodeValue === e || l !== null && l.suppressHydrationWarning === !0 || jd(t.nodeValue, e)), t || Ke(a);
          } else
            t = si(t).createTextNode(
              l
            ), t[Ct] = a, a.stateNode = t;
        }
        return Rt(a), null;
      case 13:
        if (l = a.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
          if (n = hn(a), l !== null && l.dehydrated !== null) {
            if (t === null) {
              if (!n) throw Error(f(318));
              if (n = a.memoizedState, n = n !== null ? n.dehydrated : null, !n) throw Error(f(317));
              n[Ct] = a;
            } else
              vn(), (a.flags & 128) === 0 && (a.memoizedState = null), a.flags |= 4;
            Rt(a), n = !1;
          } else
            n = uf(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = n), n = !0;
          if (!n)
            return a.flags & 256 ? (ue(a), a) : (ue(a), null);
        }
        if (ue(a), (a.flags & 128) !== 0)
          return a.lanes = e, a;
        if (e = l !== null, t = t !== null && t.memoizedState !== null, e) {
          l = a.child, n = null, l.alternate !== null && l.alternate.memoizedState !== null && l.alternate.memoizedState.cachePool !== null && (n = l.alternate.memoizedState.cachePool.pool);
          var u = null;
          l.memoizedState !== null && l.memoizedState.cachePool !== null && (u = l.memoizedState.cachePool.pool), u !== n && (l.flags |= 2048);
        }
        return e !== t && e && (a.child.flags |= 8192), $u(a, a.updateQueue), Rt(a), null;
      case 4:
        return Ba(), t === null && ys(a.stateNode.containerInfo), Rt(a), null;
      case 10:
        return le(a.type), Rt(a), null;
      case 19:
        if (X(Xt), n = a.memoizedState, n === null) return Rt(a), null;
        if (l = (a.flags & 128) !== 0, u = n.rendering, u === null)
          if (l) On(n, !1);
          else {
            if (qt !== 0 || t !== null && (t.flags & 128) !== 0)
              for (t = a.child; t !== null; ) {
                if (u = ku(t), u !== null) {
                  for (a.flags |= 128, On(n, !1), t = u.updateQueue, a.updateQueue = t, $u(a, t), a.subtreeFlags = 0, t = e, e = a.child; e !== null; )
                    af(e, t), e = e.sibling;
                  return Y(
                    Xt,
                    Xt.current & 1 | 2
                  ), a.child;
                }
                t = t.sibling;
              }
            n.tail !== null && xa() > Iu && (a.flags |= 128, l = !0, On(n, !1), a.lanes = 4194304);
          }
        else {
          if (!l)
            if (t = ku(u), t !== null) {
              if (a.flags |= 128, l = !0, t = t.updateQueue, a.updateQueue = t, $u(a, t), On(n, !0), n.tail === null && n.tailMode === "hidden" && !u.alternate && !yt)
                return Rt(a), null;
            } else
              2 * xa() - n.renderingStartTime > Iu && e !== 536870912 && (a.flags |= 128, l = !0, On(n, !1), a.lanes = 4194304);
          n.isBackwards ? (u.sibling = a.child, a.child = u) : (t = n.last, t !== null ? t.sibling = u : a.child = u, n.last = u);
        }
        return n.tail !== null ? (a = n.tail, n.rendering = a, n.tail = a.sibling, n.renderingStartTime = xa(), a.sibling = null, t = Xt.current, Y(Xt, l ? t & 1 | 2 : t & 1), a) : (Rt(a), null);
      case 22:
      case 23:
        return ue(a), xc(), l = a.memoizedState !== null, t !== null ? t.memoizedState !== null !== l && (a.flags |= 8192) : l && (a.flags |= 8192), l ? (e & 536870912) !== 0 && (a.flags & 128) === 0 && (Rt(a), a.subtreeFlags & 6 && (a.flags |= 8192)) : Rt(a), e = a.updateQueue, e !== null && $u(a, e.retryQueue), e = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), l = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (l = a.memoizedState.cachePool.pool), l !== e && (a.flags |= 2048), t !== null && X(We), null;
      case 24:
        return e = null, t !== null && (e = t.memoizedState.cache), a.memoizedState.cache !== e && (a.flags |= 2048), le(Lt), Rt(a), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(f(156, a.tag));
  }
  function Bv(t, a) {
    switch (ic(a), a.tag) {
      case 1:
        return t = a.flags, t & 65536 ? (a.flags = t & -65537 | 128, a) : null;
      case 3:
        return le(Lt), Ba(), t = a.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (a.flags = t & -65537 | 128, a) : null;
      case 26:
      case 27:
      case 5:
        return Ya(a), null;
      case 13:
        if (ue(a), t = a.memoizedState, t !== null && t.dehydrated !== null) {
          if (a.alternate === null)
            throw Error(f(340));
          vn();
        }
        return t = a.flags, t & 65536 ? (a.flags = t & -65537 | 128, a) : null;
      case 19:
        return X(Xt), null;
      case 4:
        return Ba(), null;
      case 10:
        return le(a.type), null;
      case 22:
      case 23:
        return ue(a), xc(), t !== null && X(We), t = a.flags, t & 65536 ? (a.flags = t & -65537 | 128, a) : null;
      case 24:
        return le(Lt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Oo(t, a) {
    switch (ic(a), a.tag) {
      case 3:
        le(Lt), Ba();
        break;
      case 26:
      case 27:
      case 5:
        Ya(a);
        break;
      case 4:
        Ba();
        break;
      case 13:
        ue(a);
        break;
      case 19:
        X(Xt);
        break;
      case 10:
        le(a.type);
        break;
      case 22:
      case 23:
        ue(a), xc(), t !== null && X(We);
        break;
      case 24:
        le(Lt);
    }
  }
  function Dn(t, a) {
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
    } catch (r) {
      zt(a, a.return, r);
    }
  }
  function Ee(t, a, e) {
    try {
      var l = a.updateQueue, n = l !== null ? l.lastEffect : null;
      if (n !== null) {
        var u = n.next;
        l = u;
        do {
          if ((l.tag & t) === t) {
            var i = l.inst, r = i.destroy;
            if (r !== void 0) {
              i.destroy = void 0, n = a;
              var d = e, y = r;
              try {
                y();
              } catch (z) {
                zt(
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
      zt(a, a.return, z);
    }
  }
  function Do(t) {
    var a = t.updateQueue;
    if (a !== null) {
      var e = t.stateNode;
      try {
        gf(a, e);
      } catch (l) {
        zt(t, t.return, l);
      }
    }
  }
  function Ro(t, a, e) {
    e.props = Ie(
      t.type,
      t.memoizedProps
    ), e.state = t.memoizedState;
    try {
      e.componentWillUnmount();
    } catch (l) {
      zt(t, a, l);
    }
  }
  function Rn(t, a) {
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
      zt(t, a, n);
    }
  }
  function ka(t, a) {
    var e = t.ref, l = t.refCleanup;
    if (e !== null)
      if (typeof l == "function")
        try {
          l();
        } catch (n) {
          zt(t, a, n);
        } finally {
          t.refCleanup = null, t = t.alternate, t != null && (t.refCleanup = null);
        }
      else if (typeof e == "function")
        try {
          e(null);
        } catch (n) {
          zt(t, a, n);
        }
      else e.current = null;
  }
  function Uo(t) {
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
      zt(t, t.return, n);
    }
  }
  function Jc(t, a, e) {
    try {
      var l = t.stateNode;
      um(l, t.type, e, a), l[ia] = a;
    } catch (n) {
      zt(t, t.return, n);
    }
  }
  function qo(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && Re(t.type) || t.tag === 4;
  }
  function $c(t) {
    t: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || qo(t.return)) return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
        if (t.tag === 27 && Re(t.type) || t.flags & 2 || t.child === null || t.tag === 4) continue t;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function Wc(t, a, e) {
    var l = t.tag;
    if (l === 5 || l === 6)
      t = t.stateNode, a ? (e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e).insertBefore(t, a) : (a = e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, a.appendChild(t), e = e._reactRootContainer, e != null || a.onclick !== null || (a.onclick = ci));
    else if (l !== 4 && (l === 27 && Re(t.type) && (e = t.stateNode, a = null), t = t.child, t !== null))
      for (Wc(t, a, e), t = t.sibling; t !== null; )
        Wc(t, a, e), t = t.sibling;
  }
  function Wu(t, a, e) {
    var l = t.tag;
    if (l === 5 || l === 6)
      t = t.stateNode, a ? e.insertBefore(t, a) : e.appendChild(t);
    else if (l !== 4 && (l === 27 && Re(t.type) && (e = t.stateNode), t = t.child, t !== null))
      for (Wu(t, a, e), t = t.sibling; t !== null; )
        Wu(t, a, e), t = t.sibling;
  }
  function wo(t) {
    var a = t.stateNode, e = t.memoizedProps;
    try {
      for (var l = t.type, n = a.attributes; n.length; )
        a.removeAttributeNode(n[0]);
      Pt(a, l, e), a[Ct] = t, a[ia] = e;
    } catch (u) {
      zt(t, t.return, u);
    }
  }
  var se = !1, Bt = !1, Fc = !1, Co = typeof WeakSet == "function" ? WeakSet : Set, Zt = null;
  function Yv(t, a) {
    if (t = t.containerInfo, Ss = vi, t = Zr(t), $i(t)) {
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
            var i = 0, r = -1, d = -1, y = 0, z = 0, O = t, x = null;
            a: for (; ; ) {
              for (var S; O !== e || n !== 0 && O.nodeType !== 3 || (r = i + n), O !== u || l !== 0 && O.nodeType !== 3 || (d = i + l), O.nodeType === 3 && (i += O.nodeValue.length), (S = O.firstChild) !== null; )
                x = O, O = S;
              for (; ; ) {
                if (O === t) break a;
                if (x === e && ++y === n && (r = i), x === u && ++z === l && (d = i), (S = O.nextSibling) !== null) break;
                O = x, x = O.parentNode;
              }
              O = S;
            }
            e = r === -1 || d === -1 ? null : { start: r, end: d };
          } else e = null;
        }
      e = e || { start: 0, end: 0 };
    } else e = null;
    for (js = { focusedElem: t, selectionRange: e }, vi = !1, Zt = a; Zt !== null; )
      if (a = Zt, t = a.child, (a.subtreeFlags & 1024) !== 0 && t !== null)
        t.return = a, Zt = t;
      else
        for (; Zt !== null; ) {
          switch (a = Zt, u = a.alternate, t = a.flags, a.tag) {
            case 0:
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((t & 1024) !== 0 && u !== null) {
                t = void 0, e = a, n = u.memoizedProps, u = u.memoizedState, l = e.stateNode;
                try {
                  var lt = Ie(
                    e.type,
                    n,
                    e.elementType === e.type
                  );
                  t = l.getSnapshotBeforeUpdate(
                    lt,
                    u
                  ), l.__reactInternalSnapshotBeforeUpdate = t;
                } catch (P) {
                  zt(
                    e,
                    e.return,
                    P
                  );
                }
              }
              break;
            case 3:
              if ((t & 1024) !== 0) {
                if (t = a.stateNode.containerInfo, e = t.nodeType, e === 9)
                  _s(t);
                else if (e === 1)
                  switch (t.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      _s(t);
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
          if (t = a.sibling, t !== null) {
            t.return = a.return, Zt = t;
            break;
          }
          Zt = a.return;
        }
  }
  function Ho(t, a, e) {
    var l = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        _e(t, e), l & 4 && Dn(5, e);
        break;
      case 1:
        if (_e(t, e), l & 4)
          if (t = e.stateNode, a === null)
            try {
              t.componentDidMount();
            } catch (i) {
              zt(e, e.return, i);
            }
          else {
            var n = Ie(
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
              zt(
                e,
                e.return,
                i
              );
            }
          }
        l & 64 && Do(e), l & 512 && Rn(e, e.return);
        break;
      case 3:
        if (_e(t, e), l & 64 && (t = e.updateQueue, t !== null)) {
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
            gf(t, a);
          } catch (i) {
            zt(e, e.return, i);
          }
        }
        break;
      case 27:
        a === null && l & 4 && wo(e);
      case 26:
      case 5:
        _e(t, e), a === null && l & 4 && Uo(e), l & 512 && Rn(e, e.return);
        break;
      case 12:
        _e(t, e);
        break;
      case 13:
        _e(t, e), l & 4 && Go(t, e), l & 64 && (t = e.memoizedState, t !== null && (t = t.dehydrated, t !== null && (e = Jv.bind(
          null,
          e
        ), dm(t, e))));
        break;
      case 22:
        if (l = e.memoizedState !== null || se, !l) {
          a = a !== null && a.memoizedState !== null || Bt, n = se;
          var u = Bt;
          se = l, (Bt = a) && !u ? Ne(
            t,
            e,
            (e.subtreeFlags & 8772) !== 0
          ) : _e(t, e), se = n, Bt = u;
        }
        break;
      case 30:
        break;
      default:
        _e(t, e);
    }
  }
  function Bo(t) {
    var a = t.alternate;
    a !== null && (t.alternate = null, Bo(a)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (a = t.stateNode, a !== null && Oi(a)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
  }
  var Dt = null, ra = !1;
  function re(t, a, e) {
    for (e = e.child; e !== null; )
      Yo(t, a, e), e = e.sibling;
  }
  function Yo(t, a, e) {
    if (ta && typeof ta.onCommitFiberUnmount == "function")
      try {
        ta.onCommitFiberUnmount($a, e);
      } catch {
      }
    switch (e.tag) {
      case 26:
        Bt || ka(e, a), re(
          t,
          a,
          e
        ), e.memoizedState ? e.memoizedState.count-- : e.stateNode && (e = e.stateNode, e.parentNode.removeChild(e));
        break;
      case 27:
        Bt || ka(e, a);
        var l = Dt, n = ra;
        Re(e.type) && (Dt = e.stateNode, ra = !1), re(
          t,
          a,
          e
        ), Ln(e.stateNode), Dt = l, ra = n;
        break;
      case 5:
        Bt || ka(e, a);
      case 6:
        if (l = Dt, n = ra, Dt = null, re(
          t,
          a,
          e
        ), Dt = l, ra = n, Dt !== null)
          if (ra)
            try {
              (Dt.nodeType === 9 ? Dt.body : Dt.nodeName === "HTML" ? Dt.ownerDocument.body : Dt).removeChild(e.stateNode);
            } catch (u) {
              zt(
                e,
                a,
                u
              );
            }
          else
            try {
              Dt.removeChild(e.stateNode);
            } catch (u) {
              zt(
                e,
                a,
                u
              );
            }
        break;
      case 18:
        Dt !== null && (ra ? (t = Dt, zd(
          t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t,
          e.stateNode
        ), $n(t)) : zd(Dt, e.stateNode));
        break;
      case 4:
        l = Dt, n = ra, Dt = e.stateNode.containerInfo, ra = !0, re(
          t,
          a,
          e
        ), Dt = l, ra = n;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Bt || Ee(2, e, a), Bt || Ee(4, e, a), re(
          t,
          a,
          e
        );
        break;
      case 1:
        Bt || (ka(e, a), l = e.stateNode, typeof l.componentWillUnmount == "function" && Ro(
          e,
          a,
          l
        )), re(
          t,
          a,
          e
        );
        break;
      case 21:
        re(
          t,
          a,
          e
        );
        break;
      case 22:
        Bt = (l = Bt) || e.memoizedState !== null, re(
          t,
          a,
          e
        ), Bt = l;
        break;
      default:
        re(
          t,
          a,
          e
        );
    }
  }
  function Go(t, a) {
    if (a.memoizedState === null && (t = a.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null))))
      try {
        $n(t);
      } catch (e) {
        zt(a, a.return, e);
      }
  }
  function Gv(t) {
    switch (t.tag) {
      case 13:
      case 19:
        var a = t.stateNode;
        return a === null && (a = t.stateNode = new Co()), a;
      case 22:
        return t = t.stateNode, a = t._retryCache, a === null && (a = t._retryCache = new Co()), a;
      default:
        throw Error(f(435, t.tag));
    }
  }
  function Ic(t, a) {
    var e = Gv(t);
    a.forEach(function(l) {
      var n = $v.bind(null, t, l);
      e.has(l) || (e.add(l), l.then(n, n));
    });
  }
  function va(t, a) {
    var e = a.deletions;
    if (e !== null)
      for (var l = 0; l < e.length; l++) {
        var n = e[l], u = t, i = a, r = i;
        t: for (; r !== null; ) {
          switch (r.tag) {
            case 27:
              if (Re(r.type)) {
                Dt = r.stateNode, ra = !1;
                break t;
              }
              break;
            case 5:
              Dt = r.stateNode, ra = !1;
              break t;
            case 3:
            case 4:
              Dt = r.stateNode.containerInfo, ra = !0;
              break t;
          }
          r = r.return;
        }
        if (Dt === null) throw Error(f(160));
        Yo(u, i, n), Dt = null, ra = !1, u = n.alternate, u !== null && (u.return = null), n.return = null;
      }
    if (a.subtreeFlags & 13878)
      for (a = a.child; a !== null; )
        Lo(a, t), a = a.sibling;
  }
  var wa = null;
  function Lo(t, a) {
    var e = t.alternate, l = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        va(a, t), ma(t), l & 4 && (Ee(3, t, t.return), Dn(3, t), Ee(5, t, t.return));
        break;
      case 1:
        va(a, t), ma(t), l & 512 && (Bt || e === null || ka(e, e.return)), l & 64 && se && (t = t.updateQueue, t !== null && (l = t.callbacks, l !== null && (e = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = e === null ? l : e.concat(l))));
        break;
      case 26:
        var n = wa;
        if (va(a, t), ma(t), l & 512 && (Bt || e === null || ka(e, e.return)), l & 4) {
          var u = e !== null ? e.memoizedState : null;
          if (l = t.memoizedState, e === null)
            if (l === null)
              if (t.stateNode === null) {
                t: {
                  l = t.type, e = t.memoizedProps, n = n.ownerDocument || n;
                  a: switch (l) {
                    case "title":
                      u = n.getElementsByTagName("title")[0], (!u || u[an] || u[Ct] || u.namespaceURI === "http://www.w3.org/2000/svg" || u.hasAttribute("itemprop")) && (u = n.createElement(l), n.head.insertBefore(
                        u,
                        n.querySelector("head > title")
                      )), Pt(u, l, e), u[Ct] = t, Qt(u), l = u;
                      break t;
                    case "link":
                      var i = wd(
                        "link",
                        "href",
                        n
                      ).get(l + (e.href || ""));
                      if (i) {
                        for (var r = 0; r < i.length; r++)
                          if (u = i[r], u.getAttribute("href") === (e.href == null || e.href === "" ? null : e.href) && u.getAttribute("rel") === (e.rel == null ? null : e.rel) && u.getAttribute("title") === (e.title == null ? null : e.title) && u.getAttribute("crossorigin") === (e.crossOrigin == null ? null : e.crossOrigin)) {
                            i.splice(r, 1);
                            break a;
                          }
                      }
                      u = n.createElement(l), Pt(u, l, e), n.head.appendChild(u);
                      break;
                    case "meta":
                      if (i = wd(
                        "meta",
                        "content",
                        n
                      ).get(l + (e.content || ""))) {
                        for (r = 0; r < i.length; r++)
                          if (u = i[r], u.getAttribute("content") === (e.content == null ? null : "" + e.content) && u.getAttribute("name") === (e.name == null ? null : e.name) && u.getAttribute("property") === (e.property == null ? null : e.property) && u.getAttribute("http-equiv") === (e.httpEquiv == null ? null : e.httpEquiv) && u.getAttribute("charset") === (e.charSet == null ? null : e.charSet)) {
                            i.splice(r, 1);
                            break a;
                          }
                      }
                      u = n.createElement(l), Pt(u, l, e), n.head.appendChild(u);
                      break;
                    default:
                      throw Error(f(468, l));
                  }
                  u[Ct] = t, Qt(u), l = u;
                }
                t.stateNode = l;
              } else
                Cd(
                  n,
                  t.type,
                  t.stateNode
                );
            else
              t.stateNode = qd(
                n,
                l,
                t.memoizedProps
              );
          else
            u !== l ? (u === null ? e.stateNode !== null && (e = e.stateNode, e.parentNode.removeChild(e)) : u.count--, l === null ? Cd(
              n,
              t.type,
              t.stateNode
            ) : qd(
              n,
              l,
              t.memoizedProps
            )) : l === null && t.stateNode !== null && Jc(
              t,
              t.memoizedProps,
              e.memoizedProps
            );
        }
        break;
      case 27:
        va(a, t), ma(t), l & 512 && (Bt || e === null || ka(e, e.return)), e !== null && l & 4 && Jc(
          t,
          t.memoizedProps,
          e.memoizedProps
        );
        break;
      case 5:
        if (va(a, t), ma(t), l & 512 && (Bt || e === null || ka(e, e.return)), t.flags & 32) {
          n = t.stateNode;
          try {
            ml(n, "");
          } catch (S) {
            zt(t, t.return, S);
          }
        }
        l & 4 && t.stateNode != null && (n = t.memoizedProps, Jc(
          t,
          n,
          e !== null ? e.memoizedProps : n
        )), l & 1024 && (Fc = !0);
        break;
      case 6:
        if (va(a, t), ma(t), l & 4) {
          if (t.stateNode === null)
            throw Error(f(162));
          l = t.memoizedProps, e = t.stateNode;
          try {
            e.nodeValue = l;
          } catch (S) {
            zt(t, t.return, S);
          }
        }
        break;
      case 3:
        if (oi = null, n = wa, wa = ri(a.containerInfo), va(a, t), wa = n, ma(t), l & 4 && e !== null && e.memoizedState.isDehydrated)
          try {
            $n(a.containerInfo);
          } catch (S) {
            zt(t, t.return, S);
          }
        Fc && (Fc = !1, Xo(t));
        break;
      case 4:
        l = wa, wa = ri(
          t.stateNode.containerInfo
        ), va(a, t), ma(t), wa = l;
        break;
      case 12:
        va(a, t), ma(t);
        break;
      case 13:
        va(a, t), ma(t), t.child.flags & 8192 && t.memoizedState !== null != (e !== null && e.memoizedState !== null) && (ns = xa()), l & 4 && (l = t.updateQueue, l !== null && (t.updateQueue = null, Ic(t, l)));
        break;
      case 22:
        n = t.memoizedState !== null;
        var d = e !== null && e.memoizedState !== null, y = se, z = Bt;
        if (se = y || n, Bt = z || d, va(a, t), Bt = z, se = y, ma(t), l & 8192)
          t: for (a = t.stateNode, a._visibility = n ? a._visibility & -2 : a._visibility | 1, n && (e === null || d || se || Bt || Pe(t)), e = null, a = t; ; ) {
            if (a.tag === 5 || a.tag === 26) {
              if (e === null) {
                d = e = a;
                try {
                  if (u = d.stateNode, n)
                    i = u.style, typeof i.setProperty == "function" ? i.setProperty("display", "none", "important") : i.display = "none";
                  else {
                    r = d.stateNode;
                    var O = d.memoizedProps.style, x = O != null && O.hasOwnProperty("display") ? O.display : null;
                    r.style.display = x == null || typeof x == "boolean" ? "" : ("" + x).trim();
                  }
                } catch (S) {
                  zt(d, d.return, S);
                }
              }
            } else if (a.tag === 6) {
              if (e === null) {
                d = a;
                try {
                  d.stateNode.nodeValue = n ? "" : d.memoizedProps;
                } catch (S) {
                  zt(d, d.return, S);
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
        l & 4 && (l = t.updateQueue, l !== null && (e = l.retryQueue, e !== null && (l.retryQueue = null, Ic(t, e))));
        break;
      case 19:
        va(a, t), ma(t), l & 4 && (l = t.updateQueue, l !== null && (t.updateQueue = null, Ic(t, l)));
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
          if (qo(l)) {
            e = l;
            break;
          }
          l = l.return;
        }
        if (e == null) throw Error(f(160));
        switch (e.tag) {
          case 27:
            var n = e.stateNode, u = $c(t);
            Wu(t, u, n);
            break;
          case 5:
            var i = e.stateNode;
            e.flags & 32 && (ml(i, ""), e.flags &= -33);
            var r = $c(t);
            Wu(t, r, i);
            break;
          case 3:
          case 4:
            var d = e.stateNode.containerInfo, y = $c(t);
            Wc(
              t,
              y,
              d
            );
            break;
          default:
            throw Error(f(161));
        }
      } catch (z) {
        zt(t, t.return, z);
      }
      t.flags &= -3;
    }
    a & 4096 && (t.flags &= -4097);
  }
  function Xo(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var a = t;
        Xo(a), a.tag === 5 && a.flags & 1024 && a.stateNode.reset(), t = t.sibling;
      }
  }
  function _e(t, a) {
    if (a.subtreeFlags & 8772)
      for (a = a.child; a !== null; )
        Ho(t, a.alternate, a), a = a.sibling;
  }
  function Pe(t) {
    for (t = t.child; t !== null; ) {
      var a = t;
      switch (a.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Ee(4, a, a.return), Pe(a);
          break;
        case 1:
          ka(a, a.return);
          var e = a.stateNode;
          typeof e.componentWillUnmount == "function" && Ro(
            a,
            a.return,
            e
          ), Pe(a);
          break;
        case 27:
          Ln(a.stateNode);
        case 26:
        case 5:
          ka(a, a.return), Pe(a);
          break;
        case 22:
          a.memoizedState === null && Pe(a);
          break;
        case 30:
          Pe(a);
          break;
        default:
          Pe(a);
      }
      t = t.sibling;
    }
  }
  function Ne(t, a, e) {
    for (e = e && (a.subtreeFlags & 8772) !== 0, a = a.child; a !== null; ) {
      var l = a.alternate, n = t, u = a, i = u.flags;
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          Ne(
            n,
            u,
            e
          ), Dn(4, u);
          break;
        case 1:
          if (Ne(
            n,
            u,
            e
          ), l = u, n = l.stateNode, typeof n.componentDidMount == "function")
            try {
              n.componentDidMount();
            } catch (y) {
              zt(l, l.return, y);
            }
          if (l = u, n = l.updateQueue, n !== null) {
            var r = l.stateNode;
            try {
              var d = n.shared.hiddenCallbacks;
              if (d !== null)
                for (n.shared.hiddenCallbacks = null, n = 0; n < d.length; n++)
                  pf(d[n], r);
            } catch (y) {
              zt(l, l.return, y);
            }
          }
          e && i & 64 && Do(u), Rn(u, u.return);
          break;
        case 27:
          wo(u);
        case 26:
        case 5:
          Ne(
            n,
            u,
            e
          ), e && l === null && i & 4 && Uo(u), Rn(u, u.return);
          break;
        case 12:
          Ne(
            n,
            u,
            e
          );
          break;
        case 13:
          Ne(
            n,
            u,
            e
          ), e && i & 4 && Go(n, u);
          break;
        case 22:
          u.memoizedState === null && Ne(
            n,
            u,
            e
          ), Rn(u, u.return);
          break;
        case 30:
          break;
        default:
          Ne(
            n,
            u,
            e
          );
      }
      a = a.sibling;
    }
  }
  function Pc(t, a) {
    var e = null;
    t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), t = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (t = a.memoizedState.cachePool.pool), t !== e && (t != null && t.refCount++, e != null && gn(e));
  }
  function ts(t, a) {
    t = null, a.alternate !== null && (t = a.alternate.memoizedState.cache), a = a.memoizedState.cache, a !== t && (a.refCount++, t != null && gn(t));
  }
  function Za(t, a, e, l) {
    if (a.subtreeFlags & 10256)
      for (a = a.child; a !== null; )
        Qo(
          t,
          a,
          e,
          l
        ), a = a.sibling;
  }
  function Qo(t, a, e, l) {
    var n = a.flags;
    switch (a.tag) {
      case 0:
      case 11:
      case 15:
        Za(
          t,
          a,
          e,
          l
        ), n & 2048 && Dn(9, a);
        break;
      case 1:
        Za(
          t,
          a,
          e,
          l
        );
        break;
      case 3:
        Za(
          t,
          a,
          e,
          l
        ), n & 2048 && (t = null, a.alternate !== null && (t = a.alternate.memoizedState.cache), a = a.memoizedState.cache, a !== t && (a.refCount++, t != null && gn(t)));
        break;
      case 12:
        if (n & 2048) {
          Za(
            t,
            a,
            e,
            l
          ), t = a.stateNode;
          try {
            var u = a.memoizedProps, i = u.id, r = u.onPostCommit;
            typeof r == "function" && r(
              i,
              a.alternate === null ? "mount" : "update",
              t.passiveEffectDuration,
              -0
            );
          } catch (d) {
            zt(a, a.return, d);
          }
        } else
          Za(
            t,
            a,
            e,
            l
          );
        break;
      case 13:
        Za(
          t,
          a,
          e,
          l
        );
        break;
      case 23:
        break;
      case 22:
        u = a.stateNode, i = a.alternate, a.memoizedState !== null ? u._visibility & 2 ? Za(
          t,
          a,
          e,
          l
        ) : Un(t, a) : u._visibility & 2 ? Za(
          t,
          a,
          e,
          l
        ) : (u._visibility |= 2, ql(
          t,
          a,
          e,
          l,
          (a.subtreeFlags & 10256) !== 0
        )), n & 2048 && Pc(i, a);
        break;
      case 24:
        Za(
          t,
          a,
          e,
          l
        ), n & 2048 && ts(a.alternate, a);
        break;
      default:
        Za(
          t,
          a,
          e,
          l
        );
    }
  }
  function ql(t, a, e, l, n) {
    for (n = n && (a.subtreeFlags & 10256) !== 0, a = a.child; a !== null; ) {
      var u = t, i = a, r = e, d = l, y = i.flags;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          ql(
            u,
            i,
            r,
            d,
            n
          ), Dn(8, i);
          break;
        case 23:
          break;
        case 22:
          var z = i.stateNode;
          i.memoizedState !== null ? z._visibility & 2 ? ql(
            u,
            i,
            r,
            d,
            n
          ) : Un(
            u,
            i
          ) : (z._visibility |= 2, ql(
            u,
            i,
            r,
            d,
            n
          )), n && y & 2048 && Pc(
            i.alternate,
            i
          );
          break;
        case 24:
          ql(
            u,
            i,
            r,
            d,
            n
          ), n && y & 2048 && ts(i.alternate, i);
          break;
        default:
          ql(
            u,
            i,
            r,
            d,
            n
          );
      }
      a = a.sibling;
    }
  }
  function Un(t, a) {
    if (a.subtreeFlags & 10256)
      for (a = a.child; a !== null; ) {
        var e = t, l = a, n = l.flags;
        switch (l.tag) {
          case 22:
            Un(e, l), n & 2048 && Pc(
              l.alternate,
              l
            );
            break;
          case 24:
            Un(e, l), n & 2048 && ts(l.alternate, l);
            break;
          default:
            Un(e, l);
        }
        a = a.sibling;
      }
  }
  var qn = 8192;
  function wl(t) {
    if (t.subtreeFlags & qn)
      for (t = t.child; t !== null; )
        ko(t), t = t.sibling;
  }
  function ko(t) {
    switch (t.tag) {
      case 26:
        wl(t), t.flags & qn && t.memoizedState !== null && _m(
          wa,
          t.memoizedState,
          t.memoizedProps
        );
        break;
      case 5:
        wl(t);
        break;
      case 3:
      case 4:
        var a = wa;
        wa = ri(t.stateNode.containerInfo), wl(t), wa = a;
        break;
      case 22:
        t.memoizedState === null && (a = t.alternate, a !== null && a.memoizedState !== null ? (a = qn, qn = 16777216, wl(t), qn = a) : wl(t));
        break;
      default:
        wl(t);
    }
  }
  function Zo(t) {
    var a = t.alternate;
    if (a !== null && (t = a.child, t !== null)) {
      a.child = null;
      do
        a = t.sibling, t.sibling = null, t = a;
      while (t !== null);
    }
  }
  function wn(t) {
    var a = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (a !== null)
        for (var e = 0; e < a.length; e++) {
          var l = a[e];
          Zt = l, Ko(
            l,
            t
          );
        }
      Zo(t);
    }
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        Vo(t), t = t.sibling;
  }
  function Vo(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        wn(t), t.flags & 2048 && Ee(9, t, t.return);
        break;
      case 3:
        wn(t);
        break;
      case 12:
        wn(t);
        break;
      case 22:
        var a = t.stateNode;
        t.memoizedState !== null && a._visibility & 2 && (t.return === null || t.return.tag !== 13) ? (a._visibility &= -3, Fu(t)) : wn(t);
        break;
      default:
        wn(t);
    }
  }
  function Fu(t) {
    var a = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (a !== null)
        for (var e = 0; e < a.length; e++) {
          var l = a[e];
          Zt = l, Ko(
            l,
            t
          );
        }
      Zo(t);
    }
    for (t = t.child; t !== null; ) {
      switch (a = t, a.tag) {
        case 0:
        case 11:
        case 15:
          Ee(8, a, a.return), Fu(a);
          break;
        case 22:
          e = a.stateNode, e._visibility & 2 && (e._visibility &= -3, Fu(a));
          break;
        default:
          Fu(a);
      }
      t = t.sibling;
    }
  }
  function Ko(t, a) {
    for (; Zt !== null; ) {
      var e = Zt;
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          Ee(8, e, a);
          break;
        case 23:
        case 22:
          if (e.memoizedState !== null && e.memoizedState.cachePool !== null) {
            var l = e.memoizedState.cachePool.pool;
            l != null && l.refCount++;
          }
          break;
        case 24:
          gn(e.memoizedState.cache);
      }
      if (l = e.child, l !== null) l.return = e, Zt = l;
      else
        t: for (e = t; Zt !== null; ) {
          l = Zt;
          var n = l.sibling, u = l.return;
          if (Bo(l), l === e) {
            Zt = null;
            break t;
          }
          if (n !== null) {
            n.return = u, Zt = n;
            break t;
          }
          Zt = u;
        }
    }
  }
  var Lv = {
    getCacheForType: function(t) {
      var a = aa(Lt), e = a.data.get(t);
      return e === void 0 && (e = t(), a.data.set(t, e)), e;
    }
  }, Xv = typeof WeakMap == "function" ? WeakMap : Map, St = 0, At = null, ot = null, ht = 0, jt = 0, pa = null, ze = !1, Cl = !1, as = !1, fe = 0, qt = 0, Ae = 0, tl = 0, es = 0, Ma = 0, Hl = 0, Cn = null, fa = null, ls = !1, ns = 0, Iu = 1 / 0, Pu = null, Me = null, It = 0, Oe = null, Bl = null, Yl = 0, us = 0, is = null, Jo = null, Hn = 0, cs = null;
  function ga() {
    if ((St & 2) !== 0 && ht !== 0)
      return ht & -ht;
    if (N.T !== null) {
      var t = Nl;
      return t !== 0 ? t : vs();
    }
    return it();
  }
  function $o() {
    Ma === 0 && (Ma = (ht & 536870912) === 0 || yt ? ru() : 536870912);
    var t = Aa.current;
    return t !== null && (t.flags |= 32), Ma;
  }
  function ya(t, a, e) {
    (t === At && (jt === 2 || jt === 9) || t.cancelPendingCommit !== null) && (Gl(t, 0), De(
      t,
      ht,
      Ma,
      !1
    )), me(t, e), ((St & 2) === 0 || t !== At) && (t === At && ((St & 2) === 0 && (tl |= e), qt === 4 && De(
      t,
      ht,
      Ma,
      !1
    )), Va(t));
  }
  function Wo(t, a, e) {
    if ((St & 6) !== 0) throw Error(f(327));
    var l = !e && (a & 124) === 0 && (a & t.expiredLanes) === 0 || ua(t, a), n = l ? Zv(t, a) : fs(t, a, !0), u = l;
    do {
      if (n === 0) {
        Cl && !l && De(t, a, 0, !1);
        break;
      } else {
        if (e = t.current.alternate, u && !Qv(e)) {
          n = fs(t, a, !1), u = !1;
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
              var r = t;
              n = Cn;
              var d = r.current.memoizedState.isDehydrated;
              if (d && (Gl(r, i).flags |= 256), i = fs(
                r,
                i,
                !1
              ), i !== 2) {
                if (as && !d) {
                  r.errorRecoveryDisabledLanes |= u, tl |= u, n = 4;
                  break t;
                }
                u = fa, fa = n, u !== null && (fa === null ? fa = u : fa.push.apply(
                  fa,
                  u
                ));
              }
              n = i;
            }
            if (u = !1, n !== 2) continue;
          }
        }
        if (n === 1) {
          Gl(t, 0), De(t, a, 0, !0);
          break;
        }
        t: {
          switch (l = t, u = n, u) {
            case 0:
            case 1:
              throw Error(f(345));
            case 4:
              if ((a & 4194048) !== a) break;
            case 6:
              De(
                l,
                a,
                Ma,
                !ze
              );
              break t;
            case 2:
              fa = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(f(329));
          }
          if ((a & 62914560) === a && (n = ns + 300 - xa(), 10 < n)) {
            if (De(
              l,
              a,
              Ma,
              !ze
            ), il(l, 0, !0) !== 0) break t;
            l.timeoutHandle = _d(
              Fo.bind(
                null,
                l,
                e,
                fa,
                Pu,
                ls,
                a,
                Ma,
                tl,
                Hl,
                ze,
                u,
                2,
                -0,
                0
              ),
              n
            );
            break t;
          }
          Fo(
            l,
            e,
            fa,
            Pu,
            ls,
            a,
            Ma,
            tl,
            Hl,
            ze,
            u,
            0,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    Va(t);
  }
  function Fo(t, a, e, l, n, u, i, r, d, y, z, O, x, S) {
    if (t.timeoutHandle = -1, O = a.subtreeFlags, (O & 8192 || (O & 16785408) === 16785408) && (kn = { stylesheets: null, count: 0, unsuspend: Em }, ko(a), O = Nm(), O !== null)) {
      t.cancelPendingCommit = O(
        nd.bind(
          null,
          t,
          a,
          u,
          e,
          l,
          n,
          i,
          r,
          d,
          z,
          1,
          x,
          S
        )
      ), De(t, u, i, !y);
      return;
    }
    nd(
      t,
      a,
      u,
      e,
      l,
      n,
      i,
      r,
      d
    );
  }
  function Qv(t) {
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
  function De(t, a, e, l) {
    a &= ~es, a &= ~tl, t.suspendedLanes |= a, t.pingedLanes &= ~a, l && (t.warmLanes |= a), l = t.expirationTimes;
    for (var n = a; 0 < n; ) {
      var u = 31 - Wt(n), i = 1 << u;
      l[u] = -1, n &= ~i;
    }
    e !== 0 && tn(t, e, a);
  }
  function ti() {
    return (St & 6) === 0 ? (Bn(0), !1) : !0;
  }
  function ss() {
    if (ot !== null) {
      if (jt === 0)
        var t = ot.return;
      else
        t = ot, ee = Je = null, _c(t), Rl = null, An = 0, t = ot;
      for (; t !== null; )
        Oo(t.alternate, t), t = t.return;
      ot = null;
    }
  }
  function Gl(t, a) {
    var e = t.timeoutHandle;
    e !== -1 && (t.timeoutHandle = -1, cm(e)), e = t.cancelPendingCommit, e !== null && (t.cancelPendingCommit = null, e()), ss(), At = t, ot = e = Pa(t.current, null), ht = a, jt = 0, pa = null, ze = !1, Cl = ua(t, a), as = !1, Hl = Ma = es = tl = Ae = qt = 0, fa = Cn = null, ls = !1, (a & 8) !== 0 && (a |= a & 32);
    var l = t.entangledLanes;
    if (l !== 0)
      for (t = t.entanglements, l &= a; 0 < l; ) {
        var n = 31 - Wt(l), u = 1 << n;
        a |= t[n], l &= ~u;
      }
    return fe = a, ju(), e;
  }
  function Io(t, a) {
    st = null, N.H = Lu, a === bn || a === Du ? (a = vf(), jt = 3) : a === of ? (a = vf(), jt = 4) : jt = a === po ? 8 : a !== null && typeof a == "object" && typeof a.then == "function" ? 6 : 1, pa = a, ot === null && (qt = 1, Vu(
      t,
      Ea(a, t.current)
    ));
  }
  function Po() {
    var t = N.H;
    return N.H = Lu, t === null ? Lu : t;
  }
  function td() {
    var t = N.A;
    return N.A = Lv, t;
  }
  function rs() {
    qt = 4, ze || (ht & 4194048) !== ht && Aa.current !== null || (Cl = !0), (Ae & 134217727) === 0 && (tl & 134217727) === 0 || At === null || De(
      At,
      ht,
      Ma,
      !1
    );
  }
  function fs(t, a, e) {
    var l = St;
    St |= 2;
    var n = Po(), u = td();
    (At !== t || ht !== a) && (Pu = null, Gl(t, a)), a = !1;
    var i = qt;
    t: do
      try {
        if (jt !== 0 && ot !== null) {
          var r = ot, d = pa;
          switch (jt) {
            case 8:
              ss(), i = 6;
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              Aa.current === null && (a = !0);
              var y = jt;
              if (jt = 0, pa = null, Ll(t, r, d, y), e && Cl) {
                i = 0;
                break t;
              }
              break;
            default:
              y = jt, jt = 0, pa = null, Ll(t, r, d, y);
          }
        }
        kv(), i = qt;
        break;
      } catch (z) {
        Io(t, z);
      }
    while (!0);
    return a && t.shellSuspendCounter++, ee = Je = null, St = l, N.H = n, N.A = u, ot === null && (At = null, ht = 0, ju()), i;
  }
  function kv() {
    for (; ot !== null; ) ad(ot);
  }
  function Zv(t, a) {
    var e = St;
    St |= 2;
    var l = Po(), n = td();
    At !== t || ht !== a ? (Pu = null, Iu = xa() + 500, Gl(t, a)) : Cl = ua(
      t,
      a
    );
    t: do
      try {
        if (jt !== 0 && ot !== null) {
          a = ot;
          var u = pa;
          a: switch (jt) {
            case 1:
              jt = 0, pa = null, Ll(t, a, u, 1);
              break;
            case 2:
            case 9:
              if (df(u)) {
                jt = 0, pa = null, ed(a);
                break;
              }
              a = function() {
                jt !== 2 && jt !== 9 || At !== t || (jt = 7), Va(t);
              }, u.then(a, a);
              break t;
            case 3:
              jt = 7;
              break t;
            case 4:
              jt = 5;
              break t;
            case 7:
              df(u) ? (jt = 0, pa = null, ed(a)) : (jt = 0, pa = null, Ll(t, a, u, 7));
              break;
            case 5:
              var i = null;
              switch (ot.tag) {
                case 26:
                  i = ot.memoizedState;
                case 5:
                case 27:
                  var r = ot;
                  if (!i || Hd(i)) {
                    jt = 0, pa = null;
                    var d = r.sibling;
                    if (d !== null) ot = d;
                    else {
                      var y = r.return;
                      y !== null ? (ot = y, ai(y)) : ot = null;
                    }
                    break a;
                  }
              }
              jt = 0, pa = null, Ll(t, a, u, 5);
              break;
            case 6:
              jt = 0, pa = null, Ll(t, a, u, 6);
              break;
            case 8:
              ss(), qt = 6;
              break t;
            default:
              throw Error(f(462));
          }
        }
        Vv();
        break;
      } catch (z) {
        Io(t, z);
      }
    while (!0);
    return ee = Je = null, N.H = l, N.A = n, St = e, ot !== null ? 0 : (At = null, ht = 0, ju(), qt);
  }
  function Vv() {
    for (; ot !== null && !eu(); )
      ad(ot);
  }
  function ad(t) {
    var a = Ao(t.alternate, t, fe);
    t.memoizedProps = t.pendingProps, a === null ? ai(t) : ot = a;
  }
  function ed(t) {
    var a = t, e = a.alternate;
    switch (a.tag) {
      case 15:
      case 0:
        a = jo(
          e,
          a,
          a.pendingProps,
          a.type,
          void 0,
          ht
        );
        break;
      case 11:
        a = jo(
          e,
          a,
          a.pendingProps,
          a.type.render,
          a.ref,
          ht
        );
        break;
      case 5:
        _c(a);
      default:
        Oo(e, a), a = ot = af(a, fe), a = Ao(e, a, fe);
    }
    t.memoizedProps = t.pendingProps, a === null ? ai(t) : ot = a;
  }
  function Ll(t, a, e, l) {
    ee = Je = null, _c(a), Rl = null, An = 0;
    var n = a.return;
    try {
      if (wv(
        t,
        n,
        a,
        e,
        ht
      )) {
        qt = 1, Vu(
          t,
          Ea(e, t.current)
        ), ot = null;
        return;
      }
    } catch (u) {
      if (n !== null) throw ot = n, u;
      qt = 1, Vu(
        t,
        Ea(e, t.current)
      ), ot = null;
      return;
    }
    a.flags & 32768 ? (yt || l === 1 ? t = !0 : Cl || (ht & 536870912) !== 0 ? t = !1 : (ze = t = !0, (l === 2 || l === 9 || l === 3 || l === 6) && (l = Aa.current, l !== null && l.tag === 13 && (l.flags |= 16384))), ld(a, t)) : ai(a);
  }
  function ai(t) {
    var a = t;
    do {
      if ((a.flags & 32768) !== 0) {
        ld(
          a,
          ze
        );
        return;
      }
      t = a.return;
      var e = Hv(
        a.alternate,
        a,
        fe
      );
      if (e !== null) {
        ot = e;
        return;
      }
      if (a = a.sibling, a !== null) {
        ot = a;
        return;
      }
      ot = a = t;
    } while (a !== null);
    qt === 0 && (qt = 5);
  }
  function ld(t, a) {
    do {
      var e = Bv(t.alternate, t);
      if (e !== null) {
        e.flags &= 32767, ot = e;
        return;
      }
      if (e = t.return, e !== null && (e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null), !a && (t = t.sibling, t !== null)) {
        ot = t;
        return;
      }
      ot = t = e;
    } while (t !== null);
    qt = 6, ot = null;
  }
  function nd(t, a, e, l, n, u, i, r, d) {
    t.cancelPendingCommit = null;
    do
      ei();
    while (It !== 0);
    if ((St & 6) !== 0) throw Error(f(327));
    if (a !== null) {
      if (a === t.current) throw Error(f(177));
      if (u = a.lanes | a.childLanes, u |= tc, fu(
        t,
        e,
        u,
        i,
        r,
        d
      ), t === At && (ot = At = null, ht = 0), Bl = a, Oe = t, Yl = e, us = u, is = n, Jo = l, (a.subtreeFlags & 10256) !== 0 || (a.flags & 10256) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, Wv(ul, function() {
        return rd(), null;
      })) : (t.callbackNode = null, t.callbackPriority = 0), l = (a.flags & 13878) !== 0, (a.subtreeFlags & 13878) !== 0 || l) {
        l = N.T, N.T = null, n = B.p, B.p = 2, i = St, St |= 4;
        try {
          Yv(t, a, e);
        } finally {
          St = i, B.p = n, N.T = l;
        }
      }
      It = 1, ud(), id(), cd();
    }
  }
  function ud() {
    if (It === 1) {
      It = 0;
      var t = Oe, a = Bl, e = (a.flags & 13878) !== 0;
      if ((a.subtreeFlags & 13878) !== 0 || e) {
        e = N.T, N.T = null;
        var l = B.p;
        B.p = 2;
        var n = St;
        St |= 4;
        try {
          Lo(a, t);
          var u = js, i = Zr(t.containerInfo), r = u.focusedElem, d = u.selectionRange;
          if (i !== r && r && r.ownerDocument && kr(
            r.ownerDocument.documentElement,
            r
          )) {
            if (d !== null && $i(r)) {
              var y = d.start, z = d.end;
              if (z === void 0 && (z = y), "selectionStart" in r)
                r.selectionStart = y, r.selectionEnd = Math.min(
                  z,
                  r.value.length
                );
              else {
                var O = r.ownerDocument || document, x = O && O.defaultView || window;
                if (x.getSelection) {
                  var S = x.getSelection(), lt = r.textContent.length, P = Math.min(d.start, lt), Nt = d.end === void 0 ? P : Math.min(d.end, lt);
                  !S.extend && P > Nt && (i = Nt, Nt = P, P = i);
                  var p = Qr(
                    r,
                    P
                  ), v = Qr(
                    r,
                    Nt
                  );
                  if (p && v && (S.rangeCount !== 1 || S.anchorNode !== p.node || S.anchorOffset !== p.offset || S.focusNode !== v.node || S.focusOffset !== v.offset)) {
                    var g = O.createRange();
                    g.setStart(p.node, p.offset), S.removeAllRanges(), P > Nt ? (S.addRange(g), S.extend(v.node, v.offset)) : (g.setEnd(v.node, v.offset), S.addRange(g));
                  }
                }
              }
            }
            for (O = [], S = r; S = S.parentNode; )
              S.nodeType === 1 && O.push({
                element: S,
                left: S.scrollLeft,
                top: S.scrollTop
              });
            for (typeof r.focus == "function" && r.focus(), r = 0; r < O.length; r++) {
              var A = O[r];
              A.element.scrollLeft = A.left, A.element.scrollTop = A.top;
            }
          }
          vi = !!Ss, js = Ss = null;
        } finally {
          St = n, B.p = l, N.T = e;
        }
      }
      t.current = a, It = 2;
    }
  }
  function id() {
    if (It === 2) {
      It = 0;
      var t = Oe, a = Bl, e = (a.flags & 8772) !== 0;
      if ((a.subtreeFlags & 8772) !== 0 || e) {
        e = N.T, N.T = null;
        var l = B.p;
        B.p = 2;
        var n = St;
        St |= 4;
        try {
          Ho(t, a.alternate, a);
        } finally {
          St = n, B.p = l, N.T = e;
        }
      }
      It = 3;
    }
  }
  function cd() {
    if (It === 4 || It === 3) {
      It = 0, Ni();
      var t = Oe, a = Bl, e = Yl, l = Jo;
      (a.subtreeFlags & 10256) !== 0 || (a.flags & 10256) !== 0 ? It = 5 : (It = 0, Bl = Oe = null, sd(t, t.pendingLanes));
      var n = t.pendingLanes;
      if (n === 0 && (Me = null), gt(e), a = a.stateNode, ta && typeof ta.onCommitFiberRoot == "function")
        try {
          ta.onCommitFiberRoot(
            $a,
            a,
            void 0,
            (a.current.flags & 128) === 128
          );
        } catch {
        }
      if (l !== null) {
        a = N.T, n = B.p, B.p = 2, N.T = null;
        try {
          for (var u = t.onRecoverableError, i = 0; i < l.length; i++) {
            var r = l[i];
            u(r.value, {
              componentStack: r.stack
            });
          }
        } finally {
          N.T = a, B.p = n;
        }
      }
      (Yl & 3) !== 0 && ei(), Va(t), n = t.pendingLanes, (e & 4194090) !== 0 && (n & 42) !== 0 ? t === cs ? Hn++ : (Hn = 0, cs = t) : Hn = 0, Bn(0);
    }
  }
  function sd(t, a) {
    (t.pooledCacheLanes &= a) === 0 && (a = t.pooledCache, a != null && (t.pooledCache = null, gn(a)));
  }
  function ei(t) {
    return ud(), id(), cd(), rd();
  }
  function rd() {
    if (It !== 5) return !1;
    var t = Oe, a = us;
    us = 0;
    var e = gt(Yl), l = N.T, n = B.p;
    try {
      B.p = 32 > e ? 32 : e, N.T = null, e = is, is = null;
      var u = Oe, i = Yl;
      if (It = 0, Bl = Oe = null, Yl = 0, (St & 6) !== 0) throw Error(f(331));
      var r = St;
      if (St |= 4, Vo(u.current), Qo(
        u,
        u.current,
        i,
        e
      ), St = r, Bn(0, !1), ta && typeof ta.onPostCommitFiberRoot == "function")
        try {
          ta.onPostCommitFiberRoot($a, u);
        } catch {
        }
      return !0;
    } finally {
      B.p = n, N.T = l, sd(t, a);
    }
  }
  function fd(t, a, e) {
    a = Ea(e, a), a = Yc(t.stateNode, a, 2), t = xe(t, a, 2), t !== null && (me(t, 2), Va(t));
  }
  function zt(t, a, e) {
    if (t.tag === 3)
      fd(t, t, e);
    else
      for (; a !== null; ) {
        if (a.tag === 3) {
          fd(
            a,
            t,
            e
          );
          break;
        } else if (a.tag === 1) {
          var l = a.stateNode;
          if (typeof a.type.getDerivedStateFromError == "function" || typeof l.componentDidCatch == "function" && (Me === null || !Me.has(l))) {
            t = Ea(e, t), e = vo(2), l = xe(a, e, 2), l !== null && (mo(
              e,
              l,
              a,
              t
            ), me(l, 2), Va(l));
            break;
          }
        }
        a = a.return;
      }
  }
  function os(t, a, e) {
    var l = t.pingCache;
    if (l === null) {
      l = t.pingCache = new Xv();
      var n = /* @__PURE__ */ new Set();
      l.set(a, n);
    } else
      n = l.get(a), n === void 0 && (n = /* @__PURE__ */ new Set(), l.set(a, n));
    n.has(e) || (as = !0, n.add(e), t = Kv.bind(null, t, a, e), a.then(t, t));
  }
  function Kv(t, a, e) {
    var l = t.pingCache;
    l !== null && l.delete(a), t.pingedLanes |= t.suspendedLanes & e, t.warmLanes &= ~e, At === t && (ht & e) === e && (qt === 4 || qt === 3 && (ht & 62914560) === ht && 300 > xa() - ns ? (St & 2) === 0 && Gl(t, 0) : es |= e, Hl === ht && (Hl = 0)), Va(t);
  }
  function od(t, a) {
    a === 0 && (a = Pl()), t = jl(t, a), t !== null && (me(t, a), Va(t));
  }
  function Jv(t) {
    var a = t.memoizedState, e = 0;
    a !== null && (e = a.retryLane), od(t, e);
  }
  function $v(t, a) {
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
        throw Error(f(314));
    }
    l !== null && l.delete(a), od(t, e);
  }
  function Wv(t, a) {
    return ll(t, a);
  }
  var li = null, Xl = null, ds = !1, ni = !1, hs = !1, al = 0;
  function Va(t) {
    t !== Xl && t.next === null && (Xl === null ? li = Xl = t : Xl = Xl.next = t), ni = !0, ds || (ds = !0, Iv());
  }
  function Bn(t, a) {
    if (!hs && ni) {
      hs = !0;
      do
        for (var e = !1, l = li; l !== null; ) {
          if (t !== 0) {
            var n = l.pendingLanes;
            if (n === 0) var u = 0;
            else {
              var i = l.suspendedLanes, r = l.pingedLanes;
              u = (1 << 31 - Wt(42 | t) + 1) - 1, u &= n & ~(i & ~r), u = u & 201326741 ? u & 201326741 | 1 : u ? u | 2 : 0;
            }
            u !== 0 && (e = !0, md(l, u));
          } else
            u = ht, u = il(
              l,
              l === At ? u : 0,
              l.cancelPendingCommit !== null || l.timeoutHandle !== -1
            ), (u & 3) === 0 || ua(l, u) || (e = !0, md(l, u));
          l = l.next;
        }
      while (e);
      hs = !1;
    }
  }
  function Fv() {
    dd();
  }
  function dd() {
    ni = ds = !1;
    var t = 0;
    al !== 0 && (im() && (t = al), al = 0);
    for (var a = xa(), e = null, l = li; l !== null; ) {
      var n = l.next, u = hd(l, a);
      u === 0 ? (l.next = null, e === null ? li = n : e.next = n, n === null && (Xl = e)) : (e = l, (t !== 0 || (u & 3) !== 0) && (ni = !0)), l = n;
    }
    Bn(t);
  }
  function hd(t, a) {
    for (var e = t.suspendedLanes, l = t.pingedLanes, n = t.expirationTimes, u = t.pendingLanes & -62914561; 0 < u; ) {
      var i = 31 - Wt(u), r = 1 << i, d = n[i];
      d === -1 ? ((r & e) === 0 || (r & l) !== 0) && (n[i] = Ai(r, a)) : d <= a && (t.expiredLanes |= r), u &= ~r;
    }
    if (a = At, e = ht, e = il(
      t,
      t === a ? e : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), l = t.callbackNode, e === 0 || t === a && (jt === 2 || jt === 9) || t.cancelPendingCommit !== null)
      return l !== null && l !== null && nl(l), t.callbackNode = null, t.callbackPriority = 0;
    if ((e & 3) === 0 || ua(t, e)) {
      if (a = e & -e, a === t.callbackPriority) return a;
      switch (l !== null && nl(l), gt(e)) {
        case 2:
        case 8:
          e = nu;
          break;
        case 32:
          e = ul;
          break;
        case 268435456:
          e = iu;
          break;
        default:
          e = ul;
      }
      return l = vd.bind(null, t), e = ll(e, l), t.callbackPriority = a, t.callbackNode = e, a;
    }
    return l !== null && l !== null && nl(l), t.callbackPriority = 2, t.callbackNode = null, 2;
  }
  function vd(t, a) {
    if (It !== 0 && It !== 5)
      return t.callbackNode = null, t.callbackPriority = 0, null;
    var e = t.callbackNode;
    if (ei() && t.callbackNode !== e)
      return null;
    var l = ht;
    return l = il(
      t,
      t === At ? l : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), l === 0 ? null : (Wo(t, l, a), hd(t, xa()), t.callbackNode != null && t.callbackNode === e ? vd.bind(null, t) : null);
  }
  function md(t, a) {
    if (ei()) return null;
    Wo(t, a, !0);
  }
  function Iv() {
    sm(function() {
      (St & 6) !== 0 ? ll(
        na,
        Fv
      ) : dd();
    });
  }
  function vs() {
    return al === 0 && (al = ru()), al;
  }
  function pd(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : mu("" + t);
  }
  function gd(t, a) {
    var e = a.ownerDocument.createElement("input");
    return e.name = a.name, e.value = a.value, t.id && e.setAttribute("form", t.id), a.parentNode.insertBefore(e, a), t = new FormData(t), e.parentNode.removeChild(e), t;
  }
  function Pv(t, a, e, l, n) {
    if (a === "submit" && e && e.stateNode === n) {
      var u = pd(
        (n[ia] || null).action
      ), i = l.submitter;
      i && (a = (a = i[ia] || null) ? pd(a.formAction) : i.getAttribute("formAction"), a !== null && (u = a, i = null));
      var r = new bu(
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
                if (al !== 0) {
                  var d = i ? gd(n, i) : new FormData(n);
                  qc(
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
                typeof u == "function" && (r.preventDefault(), d = i ? gd(n, i) : new FormData(n), qc(
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
  for (var ms = 0; ms < Pi.length; ms++) {
    var ps = Pi[ms], tm = ps.toLowerCase(), am = ps[0].toUpperCase() + ps.slice(1);
    qa(
      tm,
      "on" + am
    );
  }
  qa(Jr, "onAnimationEnd"), qa($r, "onAnimationIteration"), qa(Wr, "onAnimationStart"), qa("dblclick", "onDoubleClick"), qa("focusin", "onFocus"), qa("focusout", "onBlur"), qa(yv, "onTransitionRun"), qa(bv, "onTransitionStart"), qa(xv, "onTransitionCancel"), qa(Fr, "onTransitionEnd"), dl("onMouseEnter", ["mouseout", "mouseover"]), dl("onMouseLeave", ["mouseout", "mouseover"]), dl("onPointerEnter", ["pointerout", "pointerover"]), dl("onPointerLeave", ["pointerout", "pointerover"]), Ye(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), Ye(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), Ye("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Ye(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), Ye(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), Ye(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var Yn = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), em = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Yn)
  );
  function yd(t, a) {
    a = (a & 4) !== 0;
    for (var e = 0; e < t.length; e++) {
      var l = t[e], n = l.event;
      l = l.listeners;
      t: {
        var u = void 0;
        if (a)
          for (var i = l.length - 1; 0 <= i; i--) {
            var r = l[i], d = r.instance, y = r.currentTarget;
            if (r = r.listener, d !== u && n.isPropagationStopped())
              break t;
            u = r, n.currentTarget = y;
            try {
              u(n);
            } catch (z) {
              Zu(z);
            }
            n.currentTarget = null, u = d;
          }
        else
          for (i = 0; i < l.length; i++) {
            if (r = l[i], d = r.instance, y = r.currentTarget, r = r.listener, d !== u && n.isPropagationStopped())
              break t;
            u = r, n.currentTarget = y;
            try {
              u(n);
            } catch (z) {
              Zu(z);
            }
            n.currentTarget = null, u = d;
          }
      }
    }
  }
  function dt(t, a) {
    var e = a[Mi];
    e === void 0 && (e = a[Mi] = /* @__PURE__ */ new Set());
    var l = t + "__bubble";
    e.has(l) || (bd(a, t, 2, !1), e.add(l));
  }
  function gs(t, a, e) {
    var l = 0;
    a && (l |= 4), bd(
      e,
      t,
      l,
      a
    );
  }
  var ui = "_reactListening" + Math.random().toString(36).slice(2);
  function ys(t) {
    if (!t[ui]) {
      t[ui] = !0, fr.forEach(function(e) {
        e !== "selectionchange" && (em.has(e) || gs(e, !1, t), gs(e, !0, t));
      });
      var a = t.nodeType === 9 ? t : t.ownerDocument;
      a === null || a[ui] || (a[ui] = !0, gs("selectionchange", !1, a));
    }
  }
  function bd(t, a, e, l) {
    switch (Qd(a)) {
      case 2:
        var n = Mm;
        break;
      case 8:
        n = Om;
        break;
      default:
        n = Rs;
    }
    e = n.bind(
      null,
      a,
      e,
      t
    ), n = void 0, !Gi || a !== "touchstart" && a !== "touchmove" && a !== "wheel" || (n = !0), l ? n !== void 0 ? t.addEventListener(a, e, {
      capture: !0,
      passive: n
    }) : t.addEventListener(a, e, !0) : n !== void 0 ? t.addEventListener(a, e, {
      passive: n
    }) : t.addEventListener(a, e, !1);
  }
  function bs(t, a, e, l, n) {
    var u = l;
    if ((a & 1) === 0 && (a & 2) === 0 && l !== null)
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
            if (i = rl(r), i === null) return;
            if (d = i.tag, d === 5 || d === 6 || d === 26 || d === 27) {
              l = u = i;
              continue t;
            }
            r = r.parentNode;
          }
        }
        l = l.return;
      }
    Er(function() {
      var y = u, z = Bi(e), O = [];
      t: {
        var x = Ir.get(t);
        if (x !== void 0) {
          var S = bu, lt = t;
          switch (t) {
            case "keypress":
              if (gu(e) === 0) break t;
            case "keydown":
            case "keyup":
              S = Wh;
              break;
            case "focusin":
              lt = "focus", S = ki;
              break;
            case "focusout":
              lt = "blur", S = ki;
              break;
            case "beforeblur":
            case "afterblur":
              S = ki;
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
              S = zr;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              S = Bh;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              S = Ph;
              break;
            case Jr:
            case $r:
            case Wr:
              S = Lh;
              break;
            case Fr:
              S = av;
              break;
            case "scroll":
            case "scrollend":
              S = Ch;
              break;
            case "wheel":
              S = lv;
              break;
            case "copy":
            case "cut":
            case "paste":
              S = Qh;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              S = Mr;
              break;
            case "toggle":
            case "beforetoggle":
              S = uv;
          }
          var P = (a & 4) !== 0, Nt = !P && (t === "scroll" || t === "scrollend"), p = P ? x !== null ? x + "Capture" : null : x;
          P = [];
          for (var v = y, g; v !== null; ) {
            var A = v;
            if (g = A.stateNode, A = A.tag, A !== 5 && A !== 26 && A !== 27 || g === null || p === null || (A = ln(v, p), A != null && P.push(
              Gn(v, A, g)
            )), Nt) break;
            v = v.return;
          }
          0 < P.length && (x = new S(
            x,
            lt,
            null,
            e,
            z
          ), O.push({ event: x, listeners: P }));
        }
      }
      if ((a & 7) === 0) {
        t: {
          if (x = t === "mouseover" || t === "pointerover", S = t === "mouseout" || t === "pointerout", x && e !== Hi && (lt = e.relatedTarget || e.fromElement) && (rl(lt) || lt[sl]))
            break t;
          if ((S || x) && (x = z.window === z ? z : (x = z.ownerDocument) ? x.defaultView || x.parentWindow : window, S ? (lt = e.relatedTarget || e.toElement, S = y, lt = lt ? rl(lt) : null, lt !== null && (Nt = E(lt), P = lt.tag, lt !== Nt || P !== 5 && P !== 27 && P !== 6) && (lt = null)) : (S = null, lt = y), S !== lt)) {
            if (P = zr, A = "onMouseLeave", p = "onMouseEnter", v = "mouse", (t === "pointerout" || t === "pointerover") && (P = Mr, A = "onPointerLeave", p = "onPointerEnter", v = "pointer"), Nt = S == null ? x : en(S), g = lt == null ? x : en(lt), x = new P(
              A,
              v + "leave",
              S,
              e,
              z
            ), x.target = Nt, x.relatedTarget = g, A = null, rl(z) === y && (P = new P(
              p,
              v + "enter",
              lt,
              e,
              z
            ), P.target = g, P.relatedTarget = Nt, A = P), Nt = A, S && lt)
              a: {
                for (P = S, p = lt, v = 0, g = P; g; g = Ql(g))
                  v++;
                for (g = 0, A = p; A; A = Ql(A))
                  g++;
                for (; 0 < v - g; )
                  P = Ql(P), v--;
                for (; 0 < g - v; )
                  p = Ql(p), g--;
                for (; v--; ) {
                  if (P === p || p !== null && P === p.alternate)
                    break a;
                  P = Ql(P), p = Ql(p);
                }
                P = null;
              }
            else P = null;
            S !== null && xd(
              O,
              x,
              S,
              P,
              !1
            ), lt !== null && Nt !== null && xd(
              O,
              Nt,
              lt,
              P,
              !0
            );
          }
        }
        t: {
          if (x = y ? en(y) : window, S = x.nodeName && x.nodeName.toLowerCase(), S === "select" || S === "input" && x.type === "file")
            var Z = Hr;
          else if (wr(x))
            if (Br)
              Z = mv;
            else {
              Z = hv;
              var rt = dv;
            }
          else
            S = x.nodeName, !S || S.toLowerCase() !== "input" || x.type !== "checkbox" && x.type !== "radio" ? y && Ci(y.elementType) && (Z = Hr) : Z = vv;
          if (Z && (Z = Z(t, y))) {
            Cr(
              O,
              Z,
              e,
              z
            );
            break t;
          }
          rt && rt(t, x, y), t === "focusout" && y && x.type === "number" && y.memoizedProps.value != null && wi(x, "number", x.value);
        }
        switch (rt = y ? en(y) : window, t) {
          case "focusin":
            (wr(rt) || rt.contentEditable === "true") && (bl = rt, Wi = y, dn = null);
            break;
          case "focusout":
            dn = Wi = bl = null;
            break;
          case "mousedown":
            Fi = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Fi = !1, Vr(O, e, z);
            break;
          case "selectionchange":
            if (gv) break;
          case "keydown":
          case "keyup":
            Vr(O, e, z);
        }
        var $;
        if (Vi)
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
          yl ? Ur(t, e) && (tt = "onCompositionEnd") : t === "keydown" && e.keyCode === 229 && (tt = "onCompositionStart");
        tt && (Or && e.locale !== "ko" && (yl || tt !== "onCompositionStart" ? tt === "onCompositionEnd" && yl && ($ = _r()) : (pe = z, Li = "value" in pe ? pe.value : pe.textContent, yl = !0)), rt = ii(y, tt), 0 < rt.length && (tt = new Ar(
          tt,
          t,
          null,
          e,
          z
        ), O.push({ event: tt, listeners: rt }), $ ? tt.data = $ : ($ = qr(e), $ !== null && (tt.data = $)))), ($ = cv ? sv(t, e) : rv(t, e)) && (tt = ii(y, "onBeforeInput"), 0 < tt.length && (rt = new Ar(
          "onBeforeInput",
          "beforeinput",
          null,
          e,
          z
        ), O.push({
          event: rt,
          listeners: tt
        }), rt.data = $)), Pv(
          O,
          t,
          y,
          e,
          z
        );
      }
      yd(O, a);
    });
  }
  function Gn(t, a, e) {
    return {
      instance: t,
      listener: a,
      currentTarget: e
    };
  }
  function ii(t, a) {
    for (var e = a + "Capture", l = []; t !== null; ) {
      var n = t, u = n.stateNode;
      if (n = n.tag, n !== 5 && n !== 26 && n !== 27 || u === null || (n = ln(t, e), n != null && l.unshift(
        Gn(t, n, u)
      ), n = ln(t, a), n != null && l.push(
        Gn(t, n, u)
      )), t.tag === 3) return l;
      t = t.return;
    }
    return [];
  }
  function Ql(t) {
    if (t === null) return null;
    do
      t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function xd(t, a, e, l, n) {
    for (var u = a._reactName, i = []; e !== null && e !== l; ) {
      var r = e, d = r.alternate, y = r.stateNode;
      if (r = r.tag, d !== null && d === l) break;
      r !== 5 && r !== 26 && r !== 27 || y === null || (d = y, n ? (y = ln(e, u), y != null && i.unshift(
        Gn(e, y, d)
      )) : n || (y = ln(e, u), y != null && i.push(
        Gn(e, y, d)
      ))), e = e.return;
    }
    i.length !== 0 && t.push({ event: a, listeners: i });
  }
  var lm = /\r\n?/g, nm = /\u0000|\uFFFD/g;
  function Sd(t) {
    return (typeof t == "string" ? t : "" + t).replace(lm, `
`).replace(nm, "");
  }
  function jd(t, a) {
    return a = Sd(a), Sd(t) === a;
  }
  function ci() {
  }
  function _t(t, a, e, l, n, u) {
    switch (e) {
      case "children":
        typeof l == "string" ? a === "body" || a === "textarea" && l === "" || ml(t, l) : (typeof l == "number" || typeof l == "bigint") && a !== "body" && ml(t, "" + l);
        break;
      case "className":
        du(t, "class", l);
        break;
      case "tabIndex":
        du(t, "tabindex", l);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        du(t, e, l);
        break;
      case "style":
        jr(t, l, u);
        break;
      case "data":
        if (a !== "object") {
          du(t, "data", l);
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
        l = mu("" + l), t.setAttribute(e, l);
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
          typeof u == "function" && (e === "formAction" ? (a !== "input" && _t(t, a, "name", n.name, n, null), _t(
            t,
            a,
            "formEncType",
            n.formEncType,
            n,
            null
          ), _t(
            t,
            a,
            "formMethod",
            n.formMethod,
            n,
            null
          ), _t(
            t,
            a,
            "formTarget",
            n.formTarget,
            n,
            null
          )) : (_t(t, a, "encType", n.encType, n, null), _t(t, a, "method", n.method, n, null), _t(t, a, "target", n.target, n, null)));
        if (l == null || typeof l == "symbol" || typeof l == "boolean") {
          t.removeAttribute(e);
          break;
        }
        l = mu("" + l), t.setAttribute(e, l);
        break;
      case "onClick":
        l != null && (t.onclick = ci);
        break;
      case "onScroll":
        l != null && dt("scroll", t);
        break;
      case "onScrollEnd":
        l != null && dt("scrollend", t);
        break;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l))
            throw Error(f(61));
          if (e = l.__html, e != null) {
            if (n.children != null) throw Error(f(60));
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
        e = mu("" + l), t.setAttributeNS(
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
        dt("beforetoggle", t), dt("toggle", t), ou(t, "popover", l);
        break;
      case "xlinkActuate":
        Fa(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          l
        );
        break;
      case "xlinkArcrole":
        Fa(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          l
        );
        break;
      case "xlinkRole":
        Fa(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          l
        );
        break;
      case "xlinkShow":
        Fa(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          l
        );
        break;
      case "xlinkTitle":
        Fa(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          l
        );
        break;
      case "xlinkType":
        Fa(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          l
        );
        break;
      case "xmlBase":
        Fa(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          l
        );
        break;
      case "xmlLang":
        Fa(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          l
        );
        break;
      case "xmlSpace":
        Fa(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          l
        );
        break;
      case "is":
        ou(t, "is", l);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < e.length) || e[0] !== "o" && e[0] !== "O" || e[1] !== "n" && e[1] !== "N") && (e = qh.get(e) || e, ou(t, e, l));
    }
  }
  function xs(t, a, e, l, n, u) {
    switch (e) {
      case "style":
        jr(t, l, u);
        break;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l))
            throw Error(f(61));
          if (e = l.__html, e != null) {
            if (n.children != null) throw Error(f(60));
            t.innerHTML = e;
          }
        }
        break;
      case "children":
        typeof l == "string" ? ml(t, l) : (typeof l == "number" || typeof l == "bigint") && ml(t, "" + l);
        break;
      case "onScroll":
        l != null && dt("scroll", t);
        break;
      case "onScrollEnd":
        l != null && dt("scrollend", t);
        break;
      case "onClick":
        l != null && (t.onclick = ci);
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
        if (!or.hasOwnProperty(e))
          t: {
            if (e[0] === "o" && e[1] === "n" && (n = e.endsWith("Capture"), a = e.slice(2, n ? e.length - 7 : void 0), u = t[ia] || null, u = u != null ? u[e] : null, typeof u == "function" && t.removeEventListener(a, u, n), typeof l == "function")) {
              typeof u != "function" && u !== null && (e in t ? t[e] = null : t.hasAttribute(e) && t.removeAttribute(e)), t.addEventListener(a, l, n);
              break t;
            }
            e in t ? t[e] = l : l === !0 ? t.setAttribute(e, "") : ou(t, e, l);
          }
    }
  }
  function Pt(t, a, e) {
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
        dt("error", t), dt("load", t);
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
                  throw Error(f(137, a));
                default:
                  _t(t, a, u, i, e, null);
              }
          }
        n && _t(t, a, "srcSet", e.srcSet, e, null), l && _t(t, a, "src", e.src, e, null);
        return;
      case "input":
        dt("invalid", t);
        var r = u = i = n = null, d = null, y = null;
        for (l in e)
          if (e.hasOwnProperty(l)) {
            var z = e[l];
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
                  y = z;
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
                    throw Error(f(137, a));
                  break;
                default:
                  _t(t, a, l, z, e, null);
              }
          }
        yr(
          t,
          u,
          r,
          d,
          y,
          i,
          n,
          !1
        ), hu(t);
        return;
      case "select":
        dt("invalid", t), l = i = u = null;
        for (n in e)
          if (e.hasOwnProperty(n) && (r = e[n], r != null))
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
                _t(t, a, n, r, e, null);
            }
        a = u, e = i, t.multiple = !!l, a != null ? vl(t, !!l, a, !1) : e != null && vl(t, !!l, e, !0);
        return;
      case "textarea":
        dt("invalid", t), u = n = l = null;
        for (i in e)
          if (e.hasOwnProperty(i) && (r = e[i], r != null))
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
                _t(t, a, i, r, e, null);
            }
        xr(t, l, n, u), hu(t);
        return;
      case "option":
        for (d in e)
          if (e.hasOwnProperty(d) && (l = e[d], l != null))
            switch (d) {
              case "selected":
                t.selected = l && typeof l != "function" && typeof l != "symbol";
                break;
              default:
                _t(t, a, d, l, e, null);
            }
        return;
      case "dialog":
        dt("beforetoggle", t), dt("toggle", t), dt("cancel", t), dt("close", t);
        break;
      case "iframe":
      case "object":
        dt("load", t);
        break;
      case "video":
      case "audio":
        for (l = 0; l < Yn.length; l++)
          dt(Yn[l], t);
        break;
      case "image":
        dt("error", t), dt("load", t);
        break;
      case "details":
        dt("toggle", t);
        break;
      case "embed":
      case "source":
      case "link":
        dt("error", t), dt("load", t);
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
                throw Error(f(137, a));
              default:
                _t(t, a, y, l, e, null);
            }
        return;
      default:
        if (Ci(a)) {
          for (z in e)
            e.hasOwnProperty(z) && (l = e[z], l !== void 0 && xs(
              t,
              a,
              z,
              l,
              e,
              void 0
            ));
          return;
        }
    }
    for (r in e)
      e.hasOwnProperty(r) && (l = e[r], l != null && _t(t, a, r, l, e, null));
  }
  function um(t, a, e, l) {
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
        var n = null, u = null, i = null, r = null, d = null, y = null, z = null;
        for (S in e) {
          var O = e[S];
          if (e.hasOwnProperty(S) && O != null)
            switch (S) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                d = O;
              default:
                l.hasOwnProperty(S) || _t(t, a, S, null, l, O);
            }
        }
        for (var x in l) {
          var S = l[x];
          if (O = e[x], l.hasOwnProperty(x) && (S != null || O != null))
            switch (x) {
              case "type":
                u = S;
                break;
              case "name":
                n = S;
                break;
              case "checked":
                y = S;
                break;
              case "defaultChecked":
                z = S;
                break;
              case "value":
                i = S;
                break;
              case "defaultValue":
                r = S;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (S != null)
                  throw Error(f(137, a));
                break;
              default:
                S !== O && _t(
                  t,
                  a,
                  x,
                  S,
                  l,
                  O
                );
            }
        }
        qi(
          t,
          i,
          r,
          d,
          y,
          z,
          u,
          n
        );
        return;
      case "select":
        S = i = r = x = null;
        for (u in e)
          if (d = e[u], e.hasOwnProperty(u) && d != null)
            switch (u) {
              case "value":
                break;
              case "multiple":
                S = d;
              default:
                l.hasOwnProperty(u) || _t(
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
                x = u;
                break;
              case "defaultValue":
                r = u;
                break;
              case "multiple":
                i = u;
              default:
                u !== d && _t(
                  t,
                  a,
                  n,
                  u,
                  l,
                  d
                );
            }
        a = r, e = i, l = S, x != null ? vl(t, !!e, x, !1) : !!l != !!e && (a != null ? vl(t, !!e, a, !0) : vl(t, !!e, e ? [] : "", !1));
        return;
      case "textarea":
        S = x = null;
        for (r in e)
          if (n = e[r], e.hasOwnProperty(r) && n != null && !l.hasOwnProperty(r))
            switch (r) {
              case "value":
                break;
              case "children":
                break;
              default:
                _t(t, a, r, null, l, n);
            }
        for (i in l)
          if (n = l[i], u = e[i], l.hasOwnProperty(i) && (n != null || u != null))
            switch (i) {
              case "value":
                x = n;
                break;
              case "defaultValue":
                S = n;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (n != null) throw Error(f(91));
                break;
              default:
                n !== u && _t(t, a, i, n, l, u);
            }
        br(t, x, S);
        return;
      case "option":
        for (var lt in e)
          if (x = e[lt], e.hasOwnProperty(lt) && x != null && !l.hasOwnProperty(lt))
            switch (lt) {
              case "selected":
                t.selected = !1;
                break;
              default:
                _t(
                  t,
                  a,
                  lt,
                  null,
                  l,
                  x
                );
            }
        for (d in l)
          if (x = l[d], S = e[d], l.hasOwnProperty(d) && x !== S && (x != null || S != null))
            switch (d) {
              case "selected":
                t.selected = x && typeof x != "function" && typeof x != "symbol";
                break;
              default:
                _t(
                  t,
                  a,
                  d,
                  x,
                  l,
                  S
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
        for (var P in e)
          x = e[P], e.hasOwnProperty(P) && x != null && !l.hasOwnProperty(P) && _t(t, a, P, null, l, x);
        for (y in l)
          if (x = l[y], S = e[y], l.hasOwnProperty(y) && x !== S && (x != null || S != null))
            switch (y) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (x != null)
                  throw Error(f(137, a));
                break;
              default:
                _t(
                  t,
                  a,
                  y,
                  x,
                  l,
                  S
                );
            }
        return;
      default:
        if (Ci(a)) {
          for (var Nt in e)
            x = e[Nt], e.hasOwnProperty(Nt) && x !== void 0 && !l.hasOwnProperty(Nt) && xs(
              t,
              a,
              Nt,
              void 0,
              l,
              x
            );
          for (z in l)
            x = l[z], S = e[z], !l.hasOwnProperty(z) || x === S || x === void 0 && S === void 0 || xs(
              t,
              a,
              z,
              x,
              l,
              S
            );
          return;
        }
    }
    for (var p in e)
      x = e[p], e.hasOwnProperty(p) && x != null && !l.hasOwnProperty(p) && _t(t, a, p, null, l, x);
    for (O in l)
      x = l[O], S = e[O], !l.hasOwnProperty(O) || x === S || x == null && S == null || _t(t, a, O, x, l, S);
  }
  var Ss = null, js = null;
  function si(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function Td(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Ed(t, a) {
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
  function Ts(t, a) {
    return t === "textarea" || t === "noscript" || typeof a.children == "string" || typeof a.children == "number" || typeof a.children == "bigint" || typeof a.dangerouslySetInnerHTML == "object" && a.dangerouslySetInnerHTML !== null && a.dangerouslySetInnerHTML.__html != null;
  }
  var Es = null;
  function im() {
    var t = window.event;
    return t && t.type === "popstate" ? t === Es ? !1 : (Es = t, !0) : (Es = null, !1);
  }
  var _d = typeof setTimeout == "function" ? setTimeout : void 0, cm = typeof clearTimeout == "function" ? clearTimeout : void 0, Nd = typeof Promise == "function" ? Promise : void 0, sm = typeof queueMicrotask == "function" ? queueMicrotask : typeof Nd < "u" ? function(t) {
    return Nd.resolve(null).then(t).catch(rm);
  } : _d;
  function rm(t) {
    setTimeout(function() {
      throw t;
    });
  }
  function Re(t) {
    return t === "head";
  }
  function zd(t, a) {
    var e = a, l = 0, n = 0;
    do {
      var u = e.nextSibling;
      if (t.removeChild(e), u && u.nodeType === 8)
        if (e = u.data, e === "/$") {
          if (0 < l && 8 > l) {
            e = l;
            var i = t.ownerDocument;
            if (e & 1 && Ln(i.documentElement), e & 2 && Ln(i.body), e & 4)
              for (e = i.head, Ln(e), i = e.firstChild; i; ) {
                var r = i.nextSibling, d = i.nodeName;
                i[an] || d === "SCRIPT" || d === "STYLE" || d === "LINK" && i.rel.toLowerCase() === "stylesheet" || e.removeChild(i), i = r;
              }
          }
          if (n === 0) {
            t.removeChild(u), $n(a);
            return;
          }
          n--;
        } else
          e === "$" || e === "$?" || e === "$!" ? n++ : l = e.charCodeAt(0) - 48;
      else l = 0;
      e = u;
    } while (e);
    $n(a);
  }
  function _s(t) {
    var a = t.firstChild;
    for (a && a.nodeType === 10 && (a = a.nextSibling); a; ) {
      var e = a;
      switch (a = a.nextSibling, e.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          _s(e), Oi(e);
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
  function fm(t, a, e, l) {
    for (; t.nodeType === 1; ) {
      var n = e;
      if (t.nodeName.toLowerCase() !== a.toLowerCase()) {
        if (!l && (t.nodeName !== "INPUT" || t.type !== "hidden"))
          break;
      } else if (l) {
        if (!t[an])
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
      if (t = Ca(t.nextSibling), t === null) break;
    }
    return null;
  }
  function om(t, a, e) {
    if (a === "") return null;
    for (; t.nodeType !== 3; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !e || (t = Ca(t.nextSibling), t === null)) return null;
    return t;
  }
  function Ns(t) {
    return t.data === "$!" || t.data === "$?" && t.ownerDocument.readyState === "complete";
  }
  function dm(t, a) {
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
  function Ca(t) {
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
  var zs = null;
  function Ad(t) {
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
  function Md(t, a, e) {
    switch (a = si(e), t) {
      case "html":
        if (t = a.documentElement, !t) throw Error(f(452));
        return t;
      case "head":
        if (t = a.head, !t) throw Error(f(453));
        return t;
      case "body":
        if (t = a.body, !t) throw Error(f(454));
        return t;
      default:
        throw Error(f(451));
    }
  }
  function Ln(t) {
    for (var a = t.attributes; a.length; )
      t.removeAttributeNode(a[0]);
    Oi(t);
  }
  var Oa = /* @__PURE__ */ new Map(), Od = /* @__PURE__ */ new Set();
  function ri(t) {
    return typeof t.getRootNode == "function" ? t.getRootNode() : t.nodeType === 9 ? t : t.ownerDocument;
  }
  var oe = B.d;
  B.d = {
    f: hm,
    r: vm,
    D: mm,
    C: pm,
    L: gm,
    m: ym,
    X: xm,
    S: bm,
    M: Sm
  };
  function hm() {
    var t = oe.f(), a = ti();
    return t || a;
  }
  function vm(t) {
    var a = fl(t);
    a !== null && a.tag === 5 && a.type === "form" ? $f(a) : oe.r(t);
  }
  var kl = typeof document > "u" ? null : document;
  function Dd(t, a, e) {
    var l = kl;
    if (l && typeof a == "string" && a) {
      var n = Ta(a);
      n = 'link[rel="' + t + '"][href="' + n + '"]', typeof e == "string" && (n += '[crossorigin="' + e + '"]'), Od.has(n) || (Od.add(n), t = { rel: t, crossOrigin: e, href: a }, l.querySelector(n) === null && (a = l.createElement("link"), Pt(a, "link", t), Qt(a), l.head.appendChild(a)));
    }
  }
  function mm(t) {
    oe.D(t), Dd("dns-prefetch", t, null);
  }
  function pm(t, a) {
    oe.C(t, a), Dd("preconnect", t, a);
  }
  function gm(t, a, e) {
    oe.L(t, a, e);
    var l = kl;
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
          u = Vl(t);
      }
      Oa.has(u) || (t = R(
        {
          rel: "preload",
          href: a === "image" && e && e.imageSrcSet ? void 0 : t,
          as: a
        },
        e
      ), Oa.set(u, t), l.querySelector(n) !== null || a === "style" && l.querySelector(Xn(u)) || a === "script" && l.querySelector(Qn(u)) || (a = l.createElement("link"), Pt(a, "link", t), Qt(a), l.head.appendChild(a)));
    }
  }
  function ym(t, a) {
    oe.m(t, a);
    var e = kl;
    if (e && t) {
      var l = a && typeof a.as == "string" ? a.as : "script", n = 'link[rel="modulepreload"][as="' + Ta(l) + '"][href="' + Ta(t) + '"]', u = n;
      switch (l) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          u = Vl(t);
      }
      if (!Oa.has(u) && (t = R({ rel: "modulepreload", href: t }, a), Oa.set(u, t), e.querySelector(n) === null)) {
        switch (l) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (e.querySelector(Qn(u)))
              return;
        }
        l = e.createElement("link"), Pt(l, "link", t), Qt(l), e.head.appendChild(l);
      }
    }
  }
  function bm(t, a, e) {
    oe.S(t, a, e);
    var l = kl;
    if (l && t) {
      var n = ol(l).hoistableStyles, u = Zl(t);
      a = a || "default";
      var i = n.get(u);
      if (!i) {
        var r = { loading: 0, preload: null };
        if (i = l.querySelector(
          Xn(u)
        ))
          r.loading = 5;
        else {
          t = R(
            { rel: "stylesheet", href: t, "data-precedence": a },
            e
          ), (e = Oa.get(u)) && As(t, e);
          var d = i = l.createElement("link");
          Qt(d), Pt(d, "link", t), d._p = new Promise(function(y, z) {
            d.onload = y, d.onerror = z;
          }), d.addEventListener("load", function() {
            r.loading |= 1;
          }), d.addEventListener("error", function() {
            r.loading |= 2;
          }), r.loading |= 4, fi(i, a, l);
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
  function xm(t, a) {
    oe.X(t, a);
    var e = kl;
    if (e && t) {
      var l = ol(e).hoistableScripts, n = Vl(t), u = l.get(n);
      u || (u = e.querySelector(Qn(n)), u || (t = R({ src: t, async: !0 }, a), (a = Oa.get(n)) && Ms(t, a), u = e.createElement("script"), Qt(u), Pt(u, "link", t), e.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, l.set(n, u));
    }
  }
  function Sm(t, a) {
    oe.M(t, a);
    var e = kl;
    if (e && t) {
      var l = ol(e).hoistableScripts, n = Vl(t), u = l.get(n);
      u || (u = e.querySelector(Qn(n)), u || (t = R({ src: t, async: !0, type: "module" }, a), (a = Oa.get(n)) && Ms(t, a), u = e.createElement("script"), Qt(u), Pt(u, "link", t), e.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, l.set(n, u));
    }
  }
  function Rd(t, a, e, l) {
    var n = (n = V.current) ? ri(n) : null;
    if (!n) throw Error(f(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof e.precedence == "string" && typeof e.href == "string" ? (a = Zl(e.href), e = ol(
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
          var u = ol(
            n
          ).hoistableStyles, i = u.get(t);
          if (i || (n = n.ownerDocument || n, i = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, u.set(t, i), (u = n.querySelector(
            Xn(t)
          )) && !u._p && (i.instance = u, i.state.loading = 5), Oa.has(t) || (e = {
            rel: "preload",
            as: "style",
            href: e.href,
            crossOrigin: e.crossOrigin,
            integrity: e.integrity,
            media: e.media,
            hrefLang: e.hrefLang,
            referrerPolicy: e.referrerPolicy
          }, Oa.set(t, e), u || jm(
            n,
            t,
            e,
            i.state
          ))), a && l === null)
            throw Error(f(528, ""));
          return i;
        }
        if (a && l !== null)
          throw Error(f(529, ""));
        return null;
      case "script":
        return a = e.async, e = e.src, typeof e == "string" && a && typeof a != "function" && typeof a != "symbol" ? (a = Vl(e), e = ol(
          n
        ).hoistableScripts, l = e.get(a), l || (l = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, e.set(a, l)), l) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(f(444, t));
    }
  }
  function Zl(t) {
    return 'href="' + Ta(t) + '"';
  }
  function Xn(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function Ud(t) {
    return R({}, t, {
      "data-precedence": t.precedence,
      precedence: null
    });
  }
  function jm(t, a, e, l) {
    t.querySelector('link[rel="preload"][as="style"][' + a + "]") ? l.loading = 1 : (a = t.createElement("link"), l.preload = a, a.addEventListener("load", function() {
      return l.loading |= 1;
    }), a.addEventListener("error", function() {
      return l.loading |= 2;
    }), Pt(a, "link", e), Qt(a), t.head.appendChild(a));
  }
  function Vl(t) {
    return '[src="' + Ta(t) + '"]';
  }
  function Qn(t) {
    return "script[async]" + t;
  }
  function qd(t, a, e) {
    if (a.count++, a.instance === null)
      switch (a.type) {
        case "style":
          var l = t.querySelector(
            'style[data-href~="' + Ta(e.href) + '"]'
          );
          if (l)
            return a.instance = l, Qt(l), l;
          var n = R({}, e, {
            "data-href": e.href,
            "data-precedence": e.precedence,
            href: null,
            precedence: null
          });
          return l = (t.ownerDocument || t).createElement(
            "style"
          ), Qt(l), Pt(l, "style", n), fi(l, e.precedence, t), a.instance = l;
        case "stylesheet":
          n = Zl(e.href);
          var u = t.querySelector(
            Xn(n)
          );
          if (u)
            return a.state.loading |= 4, a.instance = u, Qt(u), u;
          l = Ud(e), (n = Oa.get(n)) && As(l, n), u = (t.ownerDocument || t).createElement("link"), Qt(u);
          var i = u;
          return i._p = new Promise(function(r, d) {
            i.onload = r, i.onerror = d;
          }), Pt(u, "link", l), a.state.loading |= 4, fi(u, e.precedence, t), a.instance = u;
        case "script":
          return u = Vl(e.src), (n = t.querySelector(
            Qn(u)
          )) ? (a.instance = n, Qt(n), n) : (l = e, (n = Oa.get(u)) && (l = R({}, e), Ms(l, n)), t = t.ownerDocument || t, n = t.createElement("script"), Qt(n), Pt(n, "link", l), t.head.appendChild(n), a.instance = n);
        case "void":
          return null;
        default:
          throw Error(f(443, a.type));
      }
    else
      a.type === "stylesheet" && (a.state.loading & 4) === 0 && (l = a.instance, a.state.loading |= 4, fi(l, e.precedence, t));
    return a.instance;
  }
  function fi(t, a, e) {
    for (var l = e.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), n = l.length ? l[l.length - 1] : null, u = n, i = 0; i < l.length; i++) {
      var r = l[i];
      if (r.dataset.precedence === a) u = r;
      else if (u !== n) break;
    }
    u ? u.parentNode.insertBefore(t, u.nextSibling) : (a = e.nodeType === 9 ? e.head : e, a.insertBefore(t, a.firstChild));
  }
  function As(t, a) {
    t.crossOrigin == null && (t.crossOrigin = a.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = a.referrerPolicy), t.title == null && (t.title = a.title);
  }
  function Ms(t, a) {
    t.crossOrigin == null && (t.crossOrigin = a.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = a.referrerPolicy), t.integrity == null && (t.integrity = a.integrity);
  }
  var oi = null;
  function wd(t, a, e) {
    if (oi === null) {
      var l = /* @__PURE__ */ new Map(), n = oi = /* @__PURE__ */ new Map();
      n.set(e, l);
    } else
      n = oi, l = n.get(e), l || (l = /* @__PURE__ */ new Map(), n.set(e, l));
    if (l.has(t)) return l;
    for (l.set(t, null), e = e.getElementsByTagName(t), n = 0; n < e.length; n++) {
      var u = e[n];
      if (!(u[an] || u[Ct] || t === "link" && u.getAttribute("rel") === "stylesheet") && u.namespaceURI !== "http://www.w3.org/2000/svg") {
        var i = u.getAttribute(a) || "";
        i = t + i;
        var r = l.get(i);
        r ? r.push(u) : l.set(i, [u]);
      }
    }
    return l;
  }
  function Cd(t, a, e) {
    t = t.ownerDocument || t, t.head.insertBefore(
      e,
      a === "title" ? t.querySelector("head > title") : null
    );
  }
  function Tm(t, a, e) {
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
  function Hd(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  var kn = null;
  function Em() {
  }
  function _m(t, a, e) {
    if (kn === null) throw Error(f(475));
    var l = kn;
    if (a.type === "stylesheet" && (typeof e.media != "string" || matchMedia(e.media).matches !== !1) && (a.state.loading & 4) === 0) {
      if (a.instance === null) {
        var n = Zl(e.href), u = t.querySelector(
          Xn(n)
        );
        if (u) {
          t = u._p, t !== null && typeof t == "object" && typeof t.then == "function" && (l.count++, l = di.bind(l), t.then(l, l)), a.state.loading |= 4, a.instance = u, Qt(u);
          return;
        }
        u = t.ownerDocument || t, e = Ud(e), (n = Oa.get(n)) && As(e, n), u = u.createElement("link"), Qt(u);
        var i = u;
        i._p = new Promise(function(r, d) {
          i.onload = r, i.onerror = d;
        }), Pt(u, "link", e), a.instance = u;
      }
      l.stylesheets === null && (l.stylesheets = /* @__PURE__ */ new Map()), l.stylesheets.set(a, t), (t = a.state.preload) && (a.state.loading & 3) === 0 && (l.count++, a = di.bind(l), t.addEventListener("load", a), t.addEventListener("error", a));
    }
  }
  function Nm() {
    if (kn === null) throw Error(f(475));
    var t = kn;
    return t.stylesheets && t.count === 0 && Os(t, t.stylesheets), 0 < t.count ? function(a) {
      var e = setTimeout(function() {
        if (t.stylesheets && Os(t, t.stylesheets), t.unsuspend) {
          var l = t.unsuspend;
          t.unsuspend = null, l();
        }
      }, 6e4);
      return t.unsuspend = a, function() {
        t.unsuspend = null, clearTimeout(e);
      };
    } : null;
  }
  function di() {
    if (this.count--, this.count === 0) {
      if (this.stylesheets) Os(this, this.stylesheets);
      else if (this.unsuspend) {
        var t = this.unsuspend;
        this.unsuspend = null, t();
      }
    }
  }
  var hi = null;
  function Os(t, a) {
    t.stylesheets = null, t.unsuspend !== null && (t.count++, hi = /* @__PURE__ */ new Map(), a.forEach(zm, t), hi = null, di.call(t));
  }
  function zm(t, a) {
    if (!(a.state.loading & 4)) {
      var e = hi.get(t);
      if (e) var l = e.get(null);
      else {
        e = /* @__PURE__ */ new Map(), hi.set(t, e);
        for (var n = t.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), u = 0; u < n.length; u++) {
          var i = n[u];
          (i.nodeName === "LINK" || i.getAttribute("media") !== "not all") && (e.set(i.dataset.precedence, i), l = i);
        }
        l && e.set(null, l);
      }
      n = a.instance, i = n.getAttribute("data-precedence"), u = e.get(i) || l, u === l && e.set(null, n), e.set(i, n), this.count++, l = di.bind(this), n.addEventListener("load", l), n.addEventListener("error", l), u ? u.parentNode.insertBefore(n, u.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(n, t.firstChild)), a.state.loading |= 4;
    }
  }
  var Zn = {
    $$typeof: L,
    Provider: null,
    Consumer: null,
    _currentValue: I,
    _currentValue2: I,
    _threadCount: 0
  };
  function Am(t, a, e, l, n, u, i, r) {
    this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = cl(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = cl(0), this.hiddenUpdates = cl(null), this.identifierPrefix = l, this.onUncaughtError = n, this.onCaughtError = u, this.onRecoverableError = i, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = r, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Bd(t, a, e, l, n, u, i, r, d, y, z, O) {
    return t = new Am(
      t,
      a,
      e,
      i,
      r,
      d,
      y,
      O
    ), a = 1, u === !0 && (a |= 24), u = ha(3, null, null, a), t.current = u, u.stateNode = t, a = oc(), a.refCount++, t.pooledCache = a, a.refCount++, u.memoizedState = {
      element: l,
      isDehydrated: e,
      cache: a
    }, mc(u), t;
  }
  function Yd(t) {
    return t ? (t = Tl, t) : Tl;
  }
  function Gd(t, a, e, l, n, u) {
    n = Yd(n), l.context === null ? l.context = n : l.pendingContext = n, l = be(a), l.payload = { element: e }, u = u === void 0 ? null : u, u !== null && (l.callback = u), e = xe(t, l, a), e !== null && (ya(e, t, a), Sn(e, t, a));
  }
  function Ld(t, a) {
    if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
      var e = t.retryLane;
      t.retryLane = e !== 0 && e < a ? e : a;
    }
  }
  function Ds(t, a) {
    Ld(t, a), (t = t.alternate) && Ld(t, a);
  }
  function Xd(t) {
    if (t.tag === 13) {
      var a = jl(t, 67108864);
      a !== null && ya(a, t, 67108864), Ds(t, 67108864);
    }
  }
  var vi = !0;
  function Mm(t, a, e, l) {
    var n = N.T;
    N.T = null;
    var u = B.p;
    try {
      B.p = 2, Rs(t, a, e, l);
    } finally {
      B.p = u, N.T = n;
    }
  }
  function Om(t, a, e, l) {
    var n = N.T;
    N.T = null;
    var u = B.p;
    try {
      B.p = 8, Rs(t, a, e, l);
    } finally {
      B.p = u, N.T = n;
    }
  }
  function Rs(t, a, e, l) {
    if (vi) {
      var n = Us(l);
      if (n === null)
        bs(
          t,
          a,
          l,
          mi,
          e
        ), kd(t, l);
      else if (Rm(
        n,
        t,
        a,
        e,
        l
      ))
        l.stopPropagation();
      else if (kd(t, l), a & 4 && -1 < Dm.indexOf(t)) {
        for (; n !== null; ) {
          var u = fl(n);
          if (u !== null)
            switch (u.tag) {
              case 3:
                if (u = u.stateNode, u.current.memoizedState.isDehydrated) {
                  var i = La(u.pendingLanes);
                  if (i !== 0) {
                    var r = u;
                    for (r.pendingLanes |= 2, r.entangledLanes |= 2; i; ) {
                      var d = 1 << 31 - Wt(i);
                      r.entanglements[1] |= d, i &= ~d;
                    }
                    Va(u), (St & 6) === 0 && (Iu = xa() + 500, Bn(0));
                  }
                }
                break;
              case 13:
                r = jl(u, 2), r !== null && ya(r, u, 2), ti(), Ds(u, 2);
            }
          if (u = Us(l), u === null && bs(
            t,
            a,
            l,
            mi,
            e
          ), u === n) break;
          n = u;
        }
        n !== null && l.stopPropagation();
      } else
        bs(
          t,
          a,
          l,
          null,
          e
        );
    }
  }
  function Us(t) {
    return t = Bi(t), qs(t);
  }
  var mi = null;
  function qs(t) {
    if (mi = null, t = rl(t), t !== null) {
      var a = E(t);
      if (a === null) t = null;
      else {
        var e = a.tag;
        if (e === 13) {
          if (t = M(a), t !== null) return t;
          t = null;
        } else if (e === 3) {
          if (a.stateNode.current.memoizedState.isDehydrated)
            return a.tag === 3 ? a.stateNode.containerInfo : null;
          t = null;
        } else a !== t && (t = null);
      }
    }
    return mi = t, null;
  }
  function Qd(t) {
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
        switch (lu()) {
          case na:
            return 2;
          case nu:
            return 8;
          case ul:
          case uu:
            return 32;
          case iu:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var ws = !1, Ue = null, qe = null, we = null, Vn = /* @__PURE__ */ new Map(), Kn = /* @__PURE__ */ new Map(), Ce = [], Dm = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function kd(t, a) {
    switch (t) {
      case "focusin":
      case "focusout":
        Ue = null;
        break;
      case "dragenter":
      case "dragleave":
        qe = null;
        break;
      case "mouseover":
      case "mouseout":
        we = null;
        break;
      case "pointerover":
      case "pointerout":
        Vn.delete(a.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Kn.delete(a.pointerId);
    }
  }
  function Jn(t, a, e, l, n, u) {
    return t === null || t.nativeEvent !== u ? (t = {
      blockedOn: a,
      domEventName: e,
      eventSystemFlags: l,
      nativeEvent: u,
      targetContainers: [n]
    }, a !== null && (a = fl(a), a !== null && Xd(a)), t) : (t.eventSystemFlags |= l, a = t.targetContainers, n !== null && a.indexOf(n) === -1 && a.push(n), t);
  }
  function Rm(t, a, e, l, n) {
    switch (a) {
      case "focusin":
        return Ue = Jn(
          Ue,
          t,
          a,
          e,
          l,
          n
        ), !0;
      case "dragenter":
        return qe = Jn(
          qe,
          t,
          a,
          e,
          l,
          n
        ), !0;
      case "mouseover":
        return we = Jn(
          we,
          t,
          a,
          e,
          l,
          n
        ), !0;
      case "pointerover":
        var u = n.pointerId;
        return Vn.set(
          u,
          Jn(
            Vn.get(u) || null,
            t,
            a,
            e,
            l,
            n
          )
        ), !0;
      case "gotpointercapture":
        return u = n.pointerId, Kn.set(
          u,
          Jn(
            Kn.get(u) || null,
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
  function Zd(t) {
    var a = rl(t.target);
    if (a !== null) {
      var e = E(a);
      if (e !== null) {
        if (a = e.tag, a === 13) {
          if (a = M(e), a !== null) {
            t.blockedOn = a, Wa(t.priority, function() {
              if (e.tag === 13) {
                var l = ga();
                l = ut(l);
                var n = jl(e, l);
                n !== null && ya(n, e, l), Ds(e, l);
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
  function pi(t) {
    if (t.blockedOn !== null) return !1;
    for (var a = t.targetContainers; 0 < a.length; ) {
      var e = Us(t.nativeEvent);
      if (e === null) {
        e = t.nativeEvent;
        var l = new e.constructor(
          e.type,
          e
        );
        Hi = l, e.target.dispatchEvent(l), Hi = null;
      } else
        return a = fl(e), a !== null && Xd(a), t.blockedOn = e, !1;
      a.shift();
    }
    return !0;
  }
  function Vd(t, a, e) {
    pi(t) && e.delete(a);
  }
  function Um() {
    ws = !1, Ue !== null && pi(Ue) && (Ue = null), qe !== null && pi(qe) && (qe = null), we !== null && pi(we) && (we = null), Vn.forEach(Vd), Kn.forEach(Vd);
  }
  function gi(t, a) {
    t.blockedOn === a && (t.blockedOn = null, ws || (ws = !0, c.unstable_scheduleCallback(
      c.unstable_NormalPriority,
      Um
    )));
  }
  var yi = null;
  function Kd(t) {
    yi !== t && (yi = t, c.unstable_scheduleCallback(
      c.unstable_NormalPriority,
      function() {
        yi === t && (yi = null);
        for (var a = 0; a < t.length; a += 3) {
          var e = t[a], l = t[a + 1], n = t[a + 2];
          if (typeof l != "function") {
            if (qs(l || e) === null)
              continue;
            break;
          }
          var u = fl(e);
          u !== null && (t.splice(a, 3), a -= 3, qc(
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
  function $n(t) {
    function a(d) {
      return gi(d, t);
    }
    Ue !== null && gi(Ue, t), qe !== null && gi(qe, t), we !== null && gi(we, t), Vn.forEach(a), Kn.forEach(a);
    for (var e = 0; e < Ce.length; e++) {
      var l = Ce[e];
      l.blockedOn === t && (l.blockedOn = null);
    }
    for (; 0 < Ce.length && (e = Ce[0], e.blockedOn === null); )
      Zd(e), e.blockedOn === null && Ce.shift();
    if (e = (t.ownerDocument || t).$$reactFormReplay, e != null)
      for (l = 0; l < e.length; l += 3) {
        var n = e[l], u = e[l + 1], i = n[ia] || null;
        if (typeof u == "function")
          i || Kd(e);
        else if (i) {
          var r = null;
          if (u && u.hasAttribute("formAction")) {
            if (n = u, i = u[ia] || null)
              r = i.formAction;
            else if (qs(n) !== null) continue;
          } else r = i.action;
          typeof r == "function" ? e[l + 1] = r : (e.splice(l, 3), l -= 3), Kd(e);
        }
      }
  }
  function Cs(t) {
    this._internalRoot = t;
  }
  bi.prototype.render = Cs.prototype.render = function(t) {
    var a = this._internalRoot;
    if (a === null) throw Error(f(409));
    var e = a.current, l = ga();
    Gd(e, l, t, a, null, null);
  }, bi.prototype.unmount = Cs.prototype.unmount = function() {
    var t = this._internalRoot;
    if (t !== null) {
      this._internalRoot = null;
      var a = t.containerInfo;
      Gd(t.current, 2, null, t, null, null), ti(), a[sl] = null;
    }
  };
  function bi(t) {
    this._internalRoot = t;
  }
  bi.prototype.unstable_scheduleHydration = function(t) {
    if (t) {
      var a = it();
      t = { blockedOn: null, target: t, priority: a };
      for (var e = 0; e < Ce.length && a !== 0 && a < Ce[e].priority; e++) ;
      Ce.splice(e, 0, t), e === 0 && Zd(t);
    }
  };
  var Jd = o.version;
  if (Jd !== "19.1.0")
    throw Error(
      f(
        527,
        Jd,
        "19.1.0"
      )
    );
  B.findDOMNode = function(t) {
    var a = t._reactInternals;
    if (a === void 0)
      throw typeof t.render == "function" ? Error(f(188)) : (t = Object.keys(t).join(","), Error(f(268, t)));
    return t = _(a), t = t !== null ? j(t) : null, t = t === null ? null : t.stateNode, t;
  };
  var qm = {
    bundleType: 0,
    version: "19.1.0",
    rendererPackageName: "react-dom",
    currentDispatcherRef: N,
    reconcilerVersion: "19.1.0"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var xi = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!xi.isDisabled && xi.supportsFiber)
      try {
        $a = xi.inject(
          qm
        ), ta = xi;
      } catch {
      }
  }
  return Fn.createRoot = function(t, a) {
    if (!b(t)) throw Error(f(299));
    var e = !1, l = "", n = ro, u = fo, i = oo, r = null;
    return a != null && (a.unstable_strictMode === !0 && (e = !0), a.identifierPrefix !== void 0 && (l = a.identifierPrefix), a.onUncaughtError !== void 0 && (n = a.onUncaughtError), a.onCaughtError !== void 0 && (u = a.onCaughtError), a.onRecoverableError !== void 0 && (i = a.onRecoverableError), a.unstable_transitionCallbacks !== void 0 && (r = a.unstable_transitionCallbacks)), a = Bd(
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
      r,
      null
    ), t[sl] = a.current, ys(t), new Cs(a);
  }, Fn.hydrateRoot = function(t, a, e) {
    if (!b(t)) throw Error(f(299));
    var l = !1, n = "", u = ro, i = fo, r = oo, d = null, y = null;
    return e != null && (e.unstable_strictMode === !0 && (l = !0), e.identifierPrefix !== void 0 && (n = e.identifierPrefix), e.onUncaughtError !== void 0 && (u = e.onUncaughtError), e.onCaughtError !== void 0 && (i = e.onCaughtError), e.onRecoverableError !== void 0 && (r = e.onRecoverableError), e.unstable_transitionCallbacks !== void 0 && (d = e.unstable_transitionCallbacks), e.formState !== void 0 && (y = e.formState)), a = Bd(
      t,
      1,
      !0,
      a,
      e ?? null,
      l,
      n,
      u,
      i,
      r,
      d,
      y
    ), a.context = Yd(null), e = a.current, l = ga(), l = ut(l), n = be(l), n.callback = null, xe(e, n, l), e = l, a.current.lanes = e, me(a, e), Va(a), t[sl] = a.current, ys(t), new bi(a);
  }, Fn.version = "19.1.0", Fn;
}
var nh;
function Qm() {
  if (nh) return Bs.exports;
  nh = 1;
  function c() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(c);
      } catch (o) {
        console.error(o);
      }
  }
  return c(), Bs.exports = Xm(), Bs.exports;
}
var km = Qm();
const Zm = '.ahv{--ahv-bg: var(--activity-bg, var(--background, #ffffff));--ahv-fg: var(--activity-fg, var(--foreground, #16181d));--ahv-muted: var(--activity-muted, var(--muted-foreground, #6b7080));--ahv-subtle: var(--activity-subtle, var(--muted, #f3f4f7));--ahv-line: var(--activity-line, var(--border, #e3e5ea));--ahv-main: var(--activity-main, var(--primary, #16181d));--ahv-main-fg: var(--activity-main-fg, var(--primary-foreground, #ffffff));--ahv-radius: var(--activity-radius, var(--radius, .625rem));--ahv-mono-font: var(--activity-mono-font, var(--font-mono, ui-monospace, "SF Mono", Menlo, Consolas, monospace));--ahv-bad: var(--activity-bad, #d92d20);--ahv-warn: var(--activity-warn, #b54708);--ahv-ok: var(--activity-ok, #067647);--ahv-attention: var(--activity-attention, #3e63dd);color:var(--ahv-fg);font-size:13px;line-height:1.45}.dark .ahv,[data-theme=dark] .ahv,.ahv-dark-host .ahv,.ahv.ahv-dark-host{--ahv-bad: var(--activity-bad, #f97066);--ahv-warn: var(--activity-warn, #fdb022);--ahv-ok: var(--activity-ok, #47cd89);--ahv-attention: var(--activity-attention, #8da4ef)}.ahv *,.ahv *:before,.ahv *:after{box-sizing:border-box}.ahv button{font:inherit}.ahv h2,.ahv h3,.ahv p{margin:0}.ahv-dim{color:var(--ahv-muted)}.ahv-strong{font-weight:600}.ahv-small{font-size:12px}.ahv-mono{font-family:var(--ahv-mono-font);font-size:12px}.ahv-num{font-variant-numeric:tabular-nums}.ahv-clip{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:100%}.ahv-bad{color:var(--ahv-bad)}.ahv-warn{color:var(--ahv-warn)}.ahv-log{display:flex;flex-direction:column;min-width:0;background:var(--ahv-bg);border:1px solid var(--ahv-line);border-radius:calc(var(--ahv-radius) * 1.4);overflow:hidden}.ahv-head{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px 16px;padding:16px 20px;border-bottom:1px solid var(--ahv-line)}.ahv-title{display:flex;align-items:center;gap:8px;font-size:16px;font-weight:600;text-wrap:balance}.ahv-head p{margin-top:2px;font-size:13px}.ahv-actions{display:flex;flex-wrap:wrap;align-items:center;gap:8px}.ahv-status{display:flex;flex-wrap:wrap;align-items:center;gap:6px 18px;padding:9px 20px;font-size:12.5px;color:var(--ahv-muted);border-bottom:1px solid var(--ahv-line)}.ahv-status strong{color:var(--ahv-fg);font-weight:500}.ahv-seal-chip{display:inline-flex;align-items:center;gap:6px;cursor:help}.ahv-seal-chip.ahv-ok>svg{color:var(--ahv-ok)}.ahv-button-small{padding:4px 10px;font-size:12px}.ahv-status .ahv-bad,.ahv-status strong.ahv-bad{color:var(--ahv-bad)}.ahv-status .ahv-warn{color:var(--ahv-warn)}.ahv-ok,.ahv-status strong.ahv-ok{color:var(--ahv-ok)}.ahv-status-wrap{border-bottom:1px solid var(--ahv-line)}.ahv-status-wrap .ahv-status{border-bottom:0}.ahv-checks{display:grid;gap:10px;padding:4px 20px 14px}.ahv-checks .ahv-bar{align-items:flex-end}.ahv-checks .ahv-field{width:170px}.ahv-hidden{display:none}.ahv-disabled{opacity:.55;pointer-events:none}label.ahv-button{cursor:pointer}.ahv-verdict{display:grid;gap:6px;padding:10px 12px;font-size:12.5px;border-radius:var(--ahv-radius);border:1px solid}.ahv-verdict ul{margin:0;padding-left:18px;display:grid;gap:2px}.ahv-verdict-ok{color:var(--ahv-ok);border-color:color-mix(in srgb,var(--ahv-ok) 35%,transparent);background:color-mix(in srgb,var(--ahv-ok) 6%,transparent)}.ahv-verdict-bad{color:var(--ahv-bad);border-color:color-mix(in srgb,var(--ahv-bad) 35%,transparent);background:color-mix(in srgb,var(--ahv-bad) 6%,transparent)}.ahv-seal{display:inline-flex;vertical-align:-2px;margin-left:4px;color:var(--ahv-ok)}.ahv-seal-waiting{color:var(--ahv-muted)}.ahv-button{display:inline-flex;align-items:center;gap:6px;height:32px;padding:0 12px;cursor:pointer;color:var(--ahv-fg);background:var(--ahv-bg);border:1px solid var(--ahv-line);border-radius:var(--ahv-radius);font-size:13px;font-weight:500;white-space:nowrap;transition:background-color .15s,border-color .15s}.ahv-button:hover:not(:disabled){background:var(--ahv-subtle)}.ahv-button:disabled{opacity:.55;cursor:default}.ahv-button-quiet{border-color:transparent;background:transparent;color:var(--ahv-muted)}.ahv-button-quiet:hover:not(:disabled){color:var(--ahv-fg)}.ahv-button-main{background:var(--ahv-main);color:var(--ahv-main-fg);border-color:var(--ahv-main);padding:0 16px}.ahv-button-main:hover:not(:disabled){background:var(--ahv-main);opacity:.9}.ahv-button-live{color:var(--ahv-ok);border-color:color-mix(in srgb,var(--ahv-ok) 45%,transparent)}.ahv-icon-button{display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;padding:0;cursor:pointer;background:transparent;border:0;border-radius:var(--ahv-radius);color:var(--ahv-muted)}.ahv-icon-button:hover{background:var(--ahv-subtle);color:var(--ahv-fg)}.ahv :focus-visible{outline:2px solid var(--ahv-attention);outline-offset:1px}.ahv-input{width:100%;min-width:0;height:34px;padding:0 10px;font:inherit;font-size:13px;color:var(--ahv-fg);background:var(--ahv-bg);border:1px solid var(--ahv-line);border-radius:var(--ahv-radius)}.ahv-input[aria-invalid]{border-color:var(--ahv-bad)}.ahv-input::placeholder{color:var(--ahv-muted)}.ahv-input-icon{position:relative;display:block}.ahv-input-icon>svg{position:absolute;left:10px;top:50%;transform:translateY(-50%);color:var(--ahv-muted);pointer-events:none}.ahv-input-icon>.ahv-input{padding-left:30px}.ahv-pair{display:flex;gap:6px}.ahv-segment{display:inline-flex;padding:2px;gap:2px;background:var(--ahv-subtle);border-radius:var(--ahv-radius)}.ahv-segment button{height:28px;padding:0 12px;border:0;border-radius:calc(var(--ahv-radius) * .8);background:transparent;cursor:pointer;color:var(--ahv-muted);font-size:12.5px;font-weight:500}.ahv-segment button[aria-pressed=true]{background:var(--ahv-bg);color:var(--ahv-fg);box-shadow:0 1px 2px #00000014}.ahv-chips{display:flex;flex-wrap:wrap;gap:6px}.ahv-chip{height:28px;padding:0 11px;cursor:pointer;font-size:12.5px;color:var(--ahv-muted);background:transparent;border:1px solid var(--ahv-line);border-radius:999px}.ahv-chip[aria-pressed=true]{color:var(--ahv-fg);border-color:var(--ahv-fg);font-weight:500}.ahv-menu{position:relative}.ahv-menu-list{position:absolute;right:0;top:calc(100% + 4px);z-index:20;min-width:220px;padding:4px;display:grid;background:var(--ahv-bg);border:1px solid var(--ahv-line);border-radius:var(--ahv-radius);box-shadow:0 8px 24px #0000001f}.ahv-menu-from-start{right:auto;left:0}.ahv-menu-list>button{color:inherit;text-align:left;padding:8px 10px;border:0;background:transparent;border-radius:calc(var(--ahv-radius) * .8);cursor:pointer}.ahv-menu-list>button:hover{background:var(--ahv-subtle)}.ahv-filters{display:grid;gap:14px;padding:14px 20px;border-bottom:1px solid var(--ahv-line);background:color-mix(in srgb,var(--ahv-subtle) 35%,var(--ahv-bg))}.ahv-bar{display:flex;flex-wrap:wrap;align-items:center;gap:8px 12px}.ahv-bar-end{gap:8px}.ahv-push{flex:1}.ahv-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:12px}.ahv-more{padding:12px;border:1px dashed var(--ahv-line);border-radius:var(--ahv-radius)}.ahv-field{display:grid;gap:5px;align-content:start;min-width:0}.ahv-field>span:first-child{font-size:12px;font-weight:500;color:var(--ahv-muted)}.ahv-field em{font-style:normal;font-size:12px}.ahv-applied{display:flex;flex-wrap:wrap;align-items:center;gap:6px;padding-top:12px;border-top:1px dashed var(--ahv-line)}.ahv-pill{display:inline-flex;align-items:center;gap:4px;height:26px;padding:0 2px 0 9px;font-size:12.5px;background:var(--ahv-bg);border:1px solid var(--ahv-line);border-radius:var(--ahv-radius)}.ahv-pill button{display:inline-flex;padding:3px;border:0;background:transparent;border-radius:4px;cursor:pointer;color:var(--ahv-muted)}.ahv-pill button:hover{background:var(--ahv-subtle);color:var(--ahv-fg)}.ahv-searchbar{display:flex;flex-wrap:wrap;gap:8px;align-items:flex-start}.ahv-search{position:relative;flex:1 1 360px;min-width:0}.ahv-range{width:auto;flex:0 0 auto}.ahv-searchbar .ahv-pair{flex:0 1 300px}.ahv-suggest{position:absolute;left:0;right:0;top:calc(100% + 4px);z-index:30;margin:0;padding:4px;list-style:none;max-height:300px;overflow:auto;background:var(--ahv-bg);border:1px solid var(--ahv-line);border-radius:var(--ahv-radius);box-shadow:0 8px 24px #0000001f}.ahv-suggest li{display:flex;justify-content:space-between;gap:12px;padding:6px 9px;border-radius:calc(var(--ahv-radius) * .8);cursor:pointer}.ahv-suggest li .ahv-dim{font-size:12px;text-align:right}.ahv-suggest-on{background:var(--ahv-subtle)}.ahv-add{gap:4px 6px}.ahv-link-button{padding:2px 8px;font-size:12.5px;color:var(--ahv-muted);background:transparent;border:1px dashed var(--ahv-line);border-radius:999px;cursor:pointer}.ahv-link-button:hover{color:var(--ahv-fg);border-style:solid}.ahv-push-right{margin-left:auto}.ahv-pill-not{border-style:dashed}.ahv-cell{white-space:nowrap}.ahv-check{display:flex;align-items:center;gap:8px;padding:5px 4px;font-size:13px;cursor:pointer}.ahv-menu-panel{min-width:280px;padding:10px;gap:4px}.ahv-views{margin:0 0 6px;padding:0;list-style:none;display:grid;gap:2px;max-height:300px;overflow:auto}.ahv-views li{display:flex;align-items:center;gap:4px;border-radius:calc(var(--ahv-radius) * .8)}.ahv-views li:hover,.ahv-views-on{background:var(--ahv-subtle)}.ahv-views-open{flex:1;display:grid;gap:1px;padding:6px 8px;text-align:left;color:inherit;background:transparent;border:0;cursor:pointer;min-width:0}.ahv-views-tools{display:flex}.ahv-views-save{display:grid;gap:6px;padding-top:8px;border-top:1px solid var(--ahv-line)}.ahv-chart{padding:14px 20px 10px;border-bottom:1px solid var(--ahv-line)}.ahv-chart-head{display:flex;flex-wrap:wrap;justify-content:space-between;gap:4px 16px;margin-bottom:10px;font-size:12.5px}.ahv-chart-head strong{font-size:14px}.ahv-chart-plot{position:relative;height:96px;border-bottom:1px solid var(--ahv-line)}.ahv-chart-svg{display:block;width:100%;height:100%}.ahv-bar{fill:var(--ahv-main);fill-opacity:.55}.ahv-bar-on{fill-opacity:1}.ahv-chart-max{position:absolute;left:0;top:-2px;font-size:10.5px;color:var(--ahv-muted)}.ahv-chart-empty{position:absolute;top:0;right:0;bottom:0;left:0;display:grid;place-items:center;color:var(--ahv-muted);font-size:12.5px}.ahv-chart-axis{position:relative;height:30px}.ahv-chart-axis span{position:absolute;top:4px;transform:translate(-50%);display:grid;justify-items:center;font-size:10.5px;color:var(--ahv-muted);font-variant-numeric:tabular-nums;white-space:nowrap}.ahv-chart-axis b{font-weight:600}.ahv-tip{position:absolute;top:-6px;transform:translate(-50%,-100%);z-index:5;display:grid;gap:1px;padding:6px 9px;pointer-events:none;font-size:12px;white-space:nowrap;background:var(--ahv-bg);border:1px solid var(--ahv-line);border-radius:var(--ahv-radius);box-shadow:0 6px 18px #0000001f}.ahv-tip span{color:var(--ahv-muted)}.ahv-table-wrap{max-height:min(70vh,52rem);overflow:auto}.ahv-table{width:100%;border-collapse:collapse}.ahv-table thead th{position:sticky;top:0;z-index:2;padding:9px 14px;text-align:left;font-size:12px;font-weight:500;color:var(--ahv-muted);background:var(--ahv-bg);box-shadow:inset 0 -1px 0 var(--ahv-line);white-space:nowrap}.ahv-table td{padding:10px 14px;vertical-align:middle;border-bottom:1px solid color-mix(in srgb,var(--ahv-line) 70%,transparent)}.ahv-table th:first-child,.ahv-table td:first-child{padding-left:20px;width:1%}.ahv-table th:last-child,.ahv-table td:last-child{padding-right:20px;width:1%}.ahv-table td:nth-child(2){width:22%;max-width:260px}.ahv-day td{padding:6px 20px;font-size:11px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:var(--ahv-muted);background:color-mix(in srgb,var(--ahv-subtle) 60%,var(--ahv-bg))}.ahv-row{cursor:pointer}.ahv-row:hover td{background:color-mix(in srgb,var(--ahv-subtle) 55%,transparent)}.ahv-row-problem td:first-child{box-shadow:inset 3px 0 0 var(--ahv-bad)}.ahv-when{display:grid;white-space:nowrap;line-height:1.3}.ahv-when .ahv-dim{font-size:11.5px}.ahv-who{display:flex;align-items:center;gap:10px;min-width:0}.ahv-avatar{flex:none;display:grid;place-items:center;width:28px;height:28px;border-radius:999px;font-size:10.5px;font-weight:600;color:var(--ahv-muted);background:var(--ahv-subtle)}.ahv-avatar-system{border-radius:8px}.ahv-stack{display:grid;min-width:0;line-height:1.3}.ahv-stack .ahv-dim{font-size:11.5px}.ahv-link{display:block;max-width:100%;padding:0;color:inherit;border:0;background:none;text-align:left;cursor:pointer}.ahv-link:hover{text-decoration:underline;text-underline-offset:2px}.ahv-what{display:flex;align-items:center;gap:8px;min-width:0}.ahv-sentence{min-width:0;overflow-wrap:anywhere}.ahv-mark{flex:none;width:7px;height:7px;border-radius:999px;background:var(--ahv-attention)}.ahv-what>svg{flex:none}.ahv-what-event{align-items:flex-start;gap:10px}.ahv-what-icon{--tone: var(--ahv-muted);flex:none;display:grid;place-items:center;width:24px;height:24px;border-radius:999px;margin-top:1px;color:var(--tone);background:color-mix(in srgb,var(--tone) 12%,var(--ahv-bg))}.ahv-what-text{display:grid;gap:2px;min-width:0;flex:1}.ahv-what-title{display:inline-flex;align-items:center;gap:8px;font-weight:600;line-height:1.3}.ahv-what-text .ahv-sentence{color:var(--ahv-muted);font-size:12.5px;line-height:1.4}.ahv-what-changes{flex:none;align-self:center;font-size:11.5px;color:var(--ahv-muted);visibility:hidden;white-space:nowrap}.ahv-row:hover .ahv-what-changes,.ahv-row:focus .ahv-what-changes{visibility:visible}.ahv-count{flex:none;display:inline-flex;align-items:center;gap:3px;padding:1px 6px;font-size:11px;color:var(--ahv-muted);border:1px solid var(--ahv-line);border-radius:999px;font-variant-numeric:tabular-nums}.ahv-where{display:flex;align-items:center;gap:6px;white-space:nowrap}.ahv-tag{display:inline-flex;align-items:center;height:20px;padding:0 7px;font-size:11px;font-weight:500;white-space:nowrap;color:var(--ahv-muted);background:var(--ahv-subtle);border-radius:6px;text-transform:none}.ahv-tag-bad{color:var(--ahv-bad);background:color-mix(in srgb,var(--ahv-bad) 12%,transparent)}.ahv-tag-warn{color:var(--ahv-warn);background:color-mix(in srgb,var(--ahv-warn) 12%,transparent)}.ahv-tag-ok{color:var(--ahv-ok);background:color-mix(in srgb,var(--ahv-ok) 12%,transparent)}.ahv-tag-accent{color:var(--ahv-attention);background:color-mix(in srgb,var(--ahv-attention) 12%,transparent)}.ahv-method-get{color:var(--ahv-attention)}.ahv-method-post{color:var(--ahv-ok)}.ahv-method-put,.ahv-method-patch{color:var(--ahv-warn)}.ahv-method-delete{color:var(--ahv-bad)}.ahv-foot{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:8px;padding:10px 20px;font-size:12.5px}.ahv-empty{display:grid;justify-items:center;gap:6px;padding:48px 20px;text-align:center;color:var(--ahv-muted)}.ahv-empty strong{color:var(--ahv-fg);font-size:14px}.ahv-message{display:flex;align-items:center;justify-content:space-between;gap:12px;margin:12px 20px;padding:9px 12px;font-size:12.5px;border:1px solid var(--ahv-line);border-radius:var(--ahv-radius);background:var(--ahv-subtle)}.ahv-message-bad{color:var(--ahv-bad);border-color:color-mix(in srgb,var(--ahv-bad) 35%,transparent);background:color-mix(in srgb,var(--ahv-bad) 6%,transparent)}.ahv-timeline .ahv-message{margin:0}.ahv-skeleton{display:grid;gap:8px;padding:16px 20px}.ahv-timeline .ahv-skeleton{padding:0}.ahv-skeleton span{height:38px;border-radius:var(--ahv-radius);background:var(--ahv-subtle);animation:ahv-fade 1.4s ease-in-out infinite}.ahv-drawer-layer{position:fixed;top:0;right:0;bottom:0;left:0;z-index:60;display:flex;justify-content:flex-end}.ahv-backdrop{position:absolute;top:0;right:0;bottom:0;left:0;background:#00000052;animation:ahv-fade-in .15s ease-out}.ahv-drawer{position:relative;width:min(680px,100%);height:100%;overflow-y:auto;background:var(--ahv-bg);color:var(--ahv-fg);border-left:1px solid var(--ahv-line);box-shadow:-12px 0 32px #00000024;animation:ahv-slide-in .18s ease-out}.ahv-drawer-close{position:absolute;top:14px;right:14px}.ahv-drawer-body{display:grid;gap:22px;padding:22px 24px 32px}.ahv-drawer-head{display:grid;gap:8px;padding-right:36px;padding-bottom:18px;border-bottom:1px solid var(--ahv-line)}.ahv-drawer-head h2{font-size:17px;font-weight:600;line-height:1.35;text-wrap:balance;overflow-wrap:anywhere}.ahv-drawer-head .ahv-actions{margin-top:4px}.ahv-tags{display:flex;flex-wrap:wrap;gap:6px}.ahv-section{display:grid;gap:8px}.ahv-section h3{font-size:11px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;color:var(--ahv-muted)}.ahv-pairs{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,250px),1fr));margin:0;font-size:12.5px;border:1px solid var(--ahv-line);border-radius:var(--ahv-radius);overflow:hidden}.ahv-pair-cell{display:grid;grid-template-columns:minmax(84px,42%) 1fr;box-shadow:1px 0 0 var(--ahv-line),0 1px 0 var(--ahv-line)}.ahv-pair-cell dt{padding:7px 10px;color:var(--ahv-muted);font-weight:500;background:color-mix(in srgb,var(--ahv-subtle) 60%,var(--ahv-bg));overflow-wrap:break-word}.ahv-pair-wide{grid-column:1 / -1;grid-template-columns:minmax(84px,21%) 1fr}.ahv-pair-cell dd{margin:0;padding:7px 10px;min-width:0;overflow-wrap:anywhere}.ahv-stack-gap{display:grid;gap:6px}.ahv-changes .ahv-field-name{width:34%;overflow-wrap:break-word}.ahv-scroll-x{overflow-x:auto;border:1px solid var(--ahv-line);border-radius:var(--ahv-radius)}.ahv-changes{width:100%;border-collapse:collapse;font-size:12.5px}.ahv-changes th{padding:7px 12px;text-align:left;font-weight:500;color:var(--ahv-muted);background:var(--ahv-subtle)}.ahv-changes td{padding:7px 12px;border-top:1px solid var(--ahv-line);overflow-wrap:anywhere}.ahv-before{color:var(--ahv-bad)}.ahv-after{color:var(--ahv-ok)}.ahv-list{margin:0;padding:0;list-style:none;border:1px solid var(--ahv-line);border-radius:var(--ahv-radius);overflow:hidden}.ahv-list li+li{border-top:1px solid var(--ahv-line)}.ahv-list button{display:flex;align-items:center;gap:10px;width:100%;padding:8px 12px;text-align:left;border:0;background:transparent;cursor:pointer;color:inherit}.ahv-list button:hover:not(:disabled){background:var(--ahv-subtle)}.ahv-list button:disabled{cursor:default;background:var(--ahv-subtle)}.ahv-row-between{display:flex;align-items:center;justify-content:space-between;gap:8px}.ahv-disclose{display:inline-flex;align-items:center;gap:4px;padding:0;border:0;background:none;cursor:pointer;font-size:11px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;color:var(--ahv-muted)}.ahv-pre{margin:0;max-height:380px;overflow:auto;padding:12px;font-family:var(--ahv-mono-font);font-size:12px;background:var(--ahv-subtle);border:1px solid var(--ahv-line);border-radius:var(--ahv-radius);white-space:pre-wrap;overflow-wrap:anywhere}.ahv-timeline{display:grid;gap:12px}.ahv-eyebrow{font-size:11px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;color:var(--ahv-muted)}.ahv-steps{margin:0;padding:0;list-style:none;display:grid}.ahv-step{--tone: var(--ahv-muted);position:relative;display:flex;gap:12px;padding-bottom:20px}.ahv-step:before{content:"";position:absolute;left:13.5px;top:30px;bottom:2px;width:1px;background:var(--ahv-line)}.ahv-step:last-child{padding-bottom:0}.ahv-step:last-child:before{display:none}.ahv-tone-sky{--tone: #0284c7}.ahv-tone-violet{--tone: #7c3aed}.ahv-tone-amber{--tone: #b45309}.ahv-tone-emerald{--tone: #047857}.ahv-tone-rose{--tone: var(--ahv-bad)}.ahv-tone-neutral{--tone: var(--ahv-fg)}.dark .ahv-tone-sky,[data-theme=dark] .ahv-tone-sky,.ahv-dark-host .ahv-tone-sky{--tone: #38bdf8}.dark .ahv-tone-violet,[data-theme=dark] .ahv-tone-violet,.ahv-dark-host .ahv-tone-violet{--tone: #a78bfa}.dark .ahv-tone-amber,[data-theme=dark] .ahv-tone-amber,.ahv-dark-host .ahv-tone-amber{--tone: #fbbf24}.dark .ahv-tone-emerald,[data-theme=dark] .ahv-tone-emerald,.ahv-dark-host .ahv-tone-emerald{--tone: #34d399}.ahv-step-icon{position:relative;z-index:1;flex:none;display:grid;place-items:center;width:28px;height:28px;border-radius:999px;color:var(--tone);background:color-mix(in srgb,var(--tone) 12%,var(--ahv-bg));box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--tone) 35%,transparent)}.ahv-step-main{flex:1;min-width:0;display:grid;gap:8px;align-content:start}.ahv-step-head{display:flex;align-items:flex-start;justify-content:space-between;gap:12px}.ahv .ahv-step-title{display:inline-flex;align-items:center;gap:8px;padding:0;border:0;background:none;cursor:pointer;text-align:left;color:inherit;font-size:14px;font-weight:600;line-height:1.3}.ahv .ahv-step-title:hover{text-decoration:underline;text-underline-offset:3px}.ahv-timeline-simple .ahv-step{gap:14px;padding:14px 0;border-bottom:1px solid var(--ahv-line)}.ahv-timeline-simple .ahv-step:last-child{padding-bottom:14px;border-bottom:0}.ahv-timeline-simple .ahv-step:before{display:none}.ahv-timeline-simple .ahv-step-icon{width:36px;height:36px}.ahv-timeline-simple .ahv-step-title{cursor:default;font-size:15px}.ahv-timeline-simple .ahv-step-title:hover{text-decoration:none}.ahv-timeline-simple .ahv-sentence{margin:2px 0 0;font-size:14px}.ahv-timeline-simple .ahv-byline{font-size:13px;margin-top:4px}.ahv-timeline-simple .ahv-step-when .ahv-mono{font-size:13px}.ahv-timeline-simple .ahv-step-when .ahv-dim{font-size:12px}.ahv-step-when{flex:none;display:grid;justify-items:end;line-height:1.3}.ahv-step-when .ahv-mono{font-size:12px;font-weight:500}.ahv-step-when .ahv-dim{font-size:11px}.ahv-byline{display:flex;flex-wrap:wrap;align-items:center;gap:2px 6px;font-size:12px;color:var(--ahv-muted);margin-top:3px}.ahv-byline .ahv-sep:before{content:"·";margin-right:6px}.ahv-byline .ahv-strong{color:var(--ahv-fg);font-weight:500}.ahv-avatar-small{width:18px;height:18px;font-size:8px}.ahv-step-problem{padding:8px 12px;font-size:12.5px;color:var(--ahv-bad);border-radius:var(--ahv-radius);border:1px solid color-mix(in srgb,var(--ahv-bad) 30%,transparent);background:color-mix(in srgb,var(--ahv-bad) 6%,transparent)}.ahv-chips-row{display:flex;flex-wrap:wrap;gap:6px}.ahv-fact{display:inline-flex;align-items:baseline;gap:6px;padding:3px 9px;font-size:12px;border:1px solid var(--ahv-line);border-radius:calc(var(--ahv-radius) * .8);background:var(--ahv-bg)}.ahv-fact .ahv-mono{font-weight:500;color:var(--ahv-fg)}.ahv-step-more{display:grid;gap:10px}.ahv-records{display:grid;gap:6px;justify-items:start}.ahv-records .ahv-records-table{border:1px solid var(--ahv-line);border-radius:var(--ahv-radius);border-collapse:separate;border-spacing:0;overflow:hidden}.ahv-records-table>tbody>tr>td:nth-child(2){white-space:nowrap}.ahv-records-table>tbody>tr>td:first-child>.ahv-disclose{text-align:left;justify-content:flex-start;text-transform:none;letter-spacing:0;font-size:12.5px;font-weight:500;color:var(--ahv-fg)}.ahv-records-table>tbody>tr>td>.ahv-disclose:disabled{cursor:default}.ahv-records-table .ahv-cell-end{width:1%;text-align:right;padding:2px 6px}.ahv-records-fields>td{padding:8px 12px 12px;background:var(--ahv-subtle)}.ahv-turned-right{transform:rotate(90deg)}.ahv-turned{transform:rotate(180deg)}.ahv-spin{animation:ahv-spin 1s linear infinite}.ahv-pulse{animation:ahv-fade 1.6s ease-in-out infinite}@keyframes ahv-spin{to{transform:rotate(360deg)}}@keyframes ahv-fade{50%{opacity:.45}}@keyframes ahv-fade-in{0%{opacity:0}}@keyframes ahv-slide-in{0%{transform:translate(24px);opacity:0}}@media(prefers-reduced-motion:reduce){.ahv *,.ahv-drawer-layer *{animation:none!important;transition:none!important}}@media(max-width:720px){.ahv-head,.ahv-filters,.ahv-chart,.ahv-foot{padding-left:16px;padding-right:16px}.ahv-table thead{display:none}.ahv-table,.ahv-table tbody,.ahv-table tr,.ahv-table td{display:block;width:auto!important;max-width:none!important}.ahv-table td{border:0;padding:2px 16px!important}.ahv-row{padding:10px 0;border-bottom:1px solid var(--ahv-line)}.ahv-day td{padding:6px 16px!important}}';
var G = tr();
const de = (c) => "action" in c, Vm = {
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
function xt({ name: c, size: o = 16, ...m }) {
  return /* @__PURE__ */ s.jsx(
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
      children: /* @__PURE__ */ s.jsx("path", { d: Vm[c] })
    }
  );
}
function Ha(c, o, m) {
  const [f, b] = G.useState({ loading: c !== null }), E = G.useRef(0), M = G.useRef(o);
  M.current = o;
  const q = G.useCallback(() => {
    if (c === null) return;
    const j = ++E.current;
    b((R) => ({ ...R, loading: !0 })), M.current().then(
      (R) => j === E.current && b({ data: R, loading: !1 }),
      (R) => j === E.current && b((H) => ({ data: H.data, error: R, loading: !1 }))
    );
  }, [c]);
  G.useEffect(() => {
    b({ loading: c !== null }), q();
  }, [c, q]);
  const _ = !!f.error;
  return G.useEffect(() => {
    if (!m || c === null || _) return;
    const j = setInterval(q, m);
    return () => clearInterval(j);
  }, [m, c, _, q]), { ...f, refresh: q };
}
const ks = 20;
function Km(c, o, m, f, b) {
  var vt;
  const E = o && JSON.stringify(o), [M, q] = G.useState([]), [_, j] = G.useState(!1), [R, H] = G.useState({ loading: !1 }), U = G.useRef(E);
  U.current = E;
  const C = Ha(
    E,
    () => c("search", { method: "POST", body: { ...o, limit: m } }),
    f ? b : void 0
  ), Q = G.useRef(0);
  G.useEffect(() => {
    C.data && (Q.current += 1, q([C.data]), j(!1), H({ loading: !1 }));
  }, [C.data]), G.useEffect(() => {
    q([]), H({ loading: !1 });
  }, [E]);
  const k = ((vt = M[M.length - 1]) == null ? void 0 : vt.next_cursor) ?? null, et = G.useCallback(() => {
    if (!k || R.loading || !o) return;
    H({ loading: !0 });
    const L = E, F = Q.current;
    c("search", { method: "POST", body: { ...o, limit: m, cursor: k } }).then(
      (J) => {
        U.current !== L || Q.current !== F || (q((nt) => [...nt, J].slice(-ks)), M.length >= ks && j(!0), H({ loading: !1 }));
      },
      (J) => U.current === L && Q.current === F && H({ loading: !1, error: J })
    );
  }, [k, R.loading, o, E, c, m, M.length]);
  return {
    rows: M.flatMap((L) => L.items),
    trimmed: _,
    hasMore: !!k && !f,
    loading: C.loading && !M.length,
    refreshing: C.loading,
    error: C.error,
    more: R,
    loadMore: et,
    refresh: C.refresh,
    pageCount: M.length
  };
}
const Da = (c) => Date.parse(`${c.slice(0, 23).replace(" ", "T")}Z`), oa = (c) => c.replace(/[._]+/g, " ").trim(), tu = (c) => c.charAt(0).toUpperCase() + c.slice(1), hh = 864e5, Jm = [[60, "second"], [60, "minute"], [24, "hour"], [7, "day"]], $m = new Intl.RelativeTimeFormat(void 0, { numeric: "auto", style: "short" });
function ar(c, o = Date.now()) {
  let m = (Da(c) - o) / 1e3;
  for (const [f, b] of Jm) {
    if (Math.abs(m) < f) return $m.format(Math.round(m), b);
    m /= f;
  }
  return "";
}
const _i = (c, o) => new Date(c).toLocaleString(void 0, { ...o, timeZone: "UTC" }), el = (c) => _i(c, { day: "numeric", month: "short", year: "numeric" }), Jl = (c) => _i(c, { day: "numeric", month: "short" }), Zs = (c) => _i(c, { hour: "2-digit", minute: "2-digit", hour12: !1 });
function Wm(c, o = Date.now()) {
  const m = c.slice(0, 10);
  return m === new Date(o).toISOString().slice(0, 10) ? "Today" : m === new Date(o - hh).toISOString().slice(0, 10) ? "Yesterday" : _i(Da(`${m} 00:00:00`), { weekday: "short", day: "numeric", month: "short", year: "numeric" });
}
const au = (c) => c.slice(11, 23);
function vh(c) {
  var m, f;
  if (/^[\d#]/.test(c)) return "#";
  const o = c.split(/[\s@._-]+/).filter(Boolean);
  return ((((m = o[0]) == null ? void 0 : m[0]) ?? "?") + (((f = o[1]) == null ? void 0 : f[0]) ?? "")).toUpperCase();
}
const Fm = (c) => c.actor_name || (c.actor_type === "system" ? tu(oa(c.actor_id)) || "System" : c.actor_id || "Anonymous"), Vs = (c) => /^\d{4}-\d{2}-\d{2}$/.test(c) && !Number.isNaN(Date.parse(`${c}T00:00:00Z`)), Ks = (c) => `${c} 00:00:00`, Im = (c) => `${new Date(Date.parse(`${c}T00:00:00Z`) + hh).toISOString().slice(0, 10)} 00:00:00`, Pm = (c, o = Date.now()) => new Date(o - c * 6e4).toISOString().slice(0, 19).replace("T", " "), t0 = (c, o, m = `${o}s`) => `${c.toLocaleString()} ${c === 1 ? o : m}`, Si = 1e5, a0 = [
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
], e0 = [
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
async function l0(c, o, m) {
  const f = [];
  let b = null;
  do {
    const E = await c("export", { method: "POST", body: { ...o, cursor: b } });
    f.push(...E.items), m(f.length), b = E.next_cursor;
  } while (b && f.length < Si);
  return { rows: f.slice(0, Si), more: !!b || f.length > Si };
}
function n0(c) {
  let o = c == null ? "" : typeof c == "object" ? JSON.stringify(c) : String(c);
  return /^[=+\-@\t\r]/.test(o) && (o = `'${o}`), /[",\n\r]/.test(o) ? `"${o.replace(/"/g, '""')}"` : o;
}
function u0(c, o) {
  const m = c === "events" ? a0 : e0;
  return `\uFEFF${[m.join(","), ...o.map((b) => m.map((E) => n0(b[E])).join(","))].join(`\r
`)}\r
`;
}
const i0 = (c) => c.map((o) => {
  const { children: m, ...f } = o;
  return JSON.stringify(f);
}).join(`
`) + `
`;
function Js(c, o, m) {
  const f = URL.createObjectURL(new Blob([c], { type: m })), b = document.createElement("a");
  b.href = f, b.download = o, b.click(), setTimeout(() => URL.revokeObjectURL(f), 1e3);
}
const c0 = /(-?)(?:([a-z_]+):)?("([^"]*)"?|\S+)/g;
function In(c) {
  const o = [];
  for (const m of c.matchAll(c0)) {
    let f = m[3].startsWith('"') ? m[4] ?? "" : m[3], b = m[2] ?? null;
    b && f.startsWith("//") && (f = `${b}:${f}`, b = null), f && o.push({ field: b, value: f, negated: m[1] === "-", text: m[0] });
  }
  return o;
}
const s0 = (c, o) => In(c).filter((m) => m !== o && m.text !== o.text).map((m) => m.text).join(" "), $s = (c) => /\s/.test(c) ? `"${c.replace(/"/g, "")}"` : c, mh = [
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
], er = (c) => mh.filter((o) => o.kinds.includes(c)), r0 = { events: ["origin", "outcome", "session"], requests: ["origin", "session"] }, f0 = (c) => [...er(c).map((o) => o.field), ...r0[c]], o0 = (c) => {
  var o;
  return ((o = mh.find((m) => m.field === c)) == null ? void 0 : o.label) ?? tu(oa(c));
};
function d0(c, o, m, f = {}) {
  const b = c.startsWith("-"), E = b ? c.slice(1) : c, M = b ? "-" : "", q = E.indexOf(":");
  if (q < 0)
    return er(o).filter((H) => H.field.startsWith(E.toLowerCase()) || H.label.toLowerCase().startsWith(E.toLowerCase())).map((H) => ({ insert: `${M}${H.field}:`, label: `${H.field}:`, hint: H.hint }));
  const _ = E.slice(0, q), j = E.slice(q + 1).toLowerCase();
  return (() => {
    const H = (U) => (f[U] ?? []).filter((C) => C.value).map((C) => ({ insert: C.value, label: C.value, hint: C.count.toLocaleString() }));
    switch (_) {
      case "action":
        return Object.entries((m == null ? void 0 : m.actions) ?? {}).map(([U, C]) => ({ insert: U, label: U, hint: C.title }));
      case "category":
        return [...new Set(Object.values((m == null ? void 0 : m.actions) ?? {}).map((U) => U.category))].map((U) => ({ insert: U, label: U }));
      case "actor_type":
        return Object.entries((m == null ? void 0 : m.actor_types) ?? {}).map(([U, C]) => ({ insert: U, label: U, hint: C }));
      case "result":
        return ["success", "failed", "refused"].map((U) => ({ insert: U, label: U }));
      case "method":
        return ["GET", "POST", "PUT", "PATCH", "DELETE"].map((U) => ({ insert: U, label: U }));
      case "status":
        return ["2xx", "4xx", "5xx"].map((U) => ({ insert: U, label: U }));
      case "on":
        return Object.entries((m == null ? void 0 : m.entities) ?? {}).filter(([U]) => !U.includes("_")).map(([U, C]) => ({ insert: `${U}:`, label: `${U}:`, hint: C }));
      case "app":
        return H("origin");
      case "service":
        return H("service");
      default:
        return [];
    }
  })().filter((H) => H.insert.toLowerCase().startsWith(j) || H.insert.toLowerCase().split(/[._:]/).some((U) => U.startsWith(j)) || (H.hint ?? "").toLowerCase().split(/\s+/).some((U) => U.startsWith(j))).slice(0, 12).map((H) => ({ ...H, insert: `${M}${_}:${H.insert.endsWith(":") ? H.insert : $s(H.insert)}` }));
}
const Ti = 6e4, Wl = 1440, h0 = [15, 30, 60, 120, 180, 360, 720, 1440, 2880, 10080, 20160, 43200], uh = 7, v0 = new Intl.NumberFormat(void 0, { notation: "compact", maximumFractionDigits: 1 });
function m0(c) {
  const o = c.bucket_minutes * Ti, m = new Map(c.buckets.map((b) => [Da(b.at), b.count])), f = [];
  for (let b = Math.floor(Da(c.occurred_from) / o) * o; b < Da(c.occurred_to); b += o)
    f.push({ at: b, count: m.get(b) ?? 0 });
  return f;
}
function p0(c) {
  return c % Wl === 0 ? c === Wl ? "Daily bars" : `${c / Wl}-day bars` : c % 60 === 0 ? c === 60 ? "Hourly bars" : `${c / 60}-hour bars` : `${c}-minute bars`;
}
function Qs(c, o) {
  return o >= Wl ? el(c) : `${Jl(c)}, ${Zs(c)} – ${Zs(c + o * Ti)}`;
}
function g0(c, o) {
  if (c.length < 2) return [];
  const m = (c[c.length - 1].at - c[0].at) / Ti, f = h0.find((M) => M >= o && M % o === 0 && m / M <= uh) ?? o * Math.ceil(c.length / uh), b = f >= Wl, E = [];
  return c.forEach((M, q) => {
    if (M.at % (f * Ti) !== 0) return;
    const _ = E[E.length - 1], j = !_ || Jl(c[_.index].at) !== Jl(M.at);
    E.push({ index: q, top: b ? Jl(M.at) : Zs(M.at), bottom: !b && j ? Jl(M.at) : "" });
  }), E;
}
function y0({ chart: c, noun: o, loading: m }) {
  const f = G.useMemo(() => c ? m0(c) : [], [c]), [b, E] = G.useState(null), M = f.reduce((C, Q) => C + Q.count, 0), q = f.reduce((C, Q) => Math.max(C, Q.count), 0), _ = f.find((C) => C.count === q && q > 0), j = (c == null ? void 0 : c.bucket_minutes) ?? Wl, R = G.useMemo(() => g0(f, j), [f, j]), H = o.replace(/s$/, ""), U = b !== null ? f[b] : void 0;
  return /* @__PURE__ */ s.jsxs("div", { className: "ahv-chart", children: [
    /* @__PURE__ */ s.jsxs("div", { className: "ahv-chart-head", children: [
      /* @__PURE__ */ s.jsxs("span", { children: [
        /* @__PURE__ */ s.jsx("strong", { className: "ahv-num", children: m && !c ? "…" : M.toLocaleString() }),
        " ",
        M === 1 ? H : o,
        c && /* @__PURE__ */ s.jsxs("span", { className: "ahv-dim", children: [
          " · ",
          Jl(Da(c.occurred_from)),
          " – ",
          el(Da(c.occurred_to) - 1),
          " UTC"
        ] })
      ] }),
      c && /* @__PURE__ */ s.jsxs("span", { className: "ahv-dim", children: [
        _ && /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
          "Peak ",
          /* @__PURE__ */ s.jsx("strong", { className: "ahv-num", children: _.count.toLocaleString() }),
          " at ",
          Qs(_.at, j).split(" – ")[0],
          " · "
        ] }),
        p0(j)
      ] })
    ] }),
    /* @__PURE__ */ s.jsxs(
      "div",
      {
        className: "ahv-chart-plot",
        role: "img",
        "aria-label": `${M.toLocaleString()} ${o}${_ ? `, most at ${Qs(_.at, j)} UTC (${_.count})` : ""}`,
        onMouseMove: (C) => {
          if (!f.length) return;
          const Q = C.currentTarget.getBoundingClientRect();
          E(Math.min(f.length - 1, Math.max(0, Math.floor((C.clientX - Q.left) / Q.width * f.length))));
        },
        onMouseLeave: () => E(null),
        children: [
          q > 0 && /* @__PURE__ */ s.jsx("span", { className: "ahv-chart-max ahv-num", children: v0.format(q) }),
          /* @__PURE__ */ s.jsx("svg", { viewBox: `0 0 ${Math.max(f.length, 1)} 100`, preserveAspectRatio: "none", className: "ahv-chart-svg", children: f.map((C, Q) => {
            const k = q ? Math.max(C.count / q * 100, C.count ? 2 : 0) : 0;
            return /* @__PURE__ */ s.jsx(
              "rect",
              {
                x: Q + 0.12,
                width: 0.76,
                y: 100 - k,
                height: k,
                className: Q === b ? "ahv-bar ahv-bar-on" : "ahv-bar"
              },
              C.at
            );
          }) }),
          !m && M === 0 && /* @__PURE__ */ s.jsxs("span", { className: "ahv-chart-empty", children: [
            "No ",
            o,
            " in this period"
          ] }),
          U && /* @__PURE__ */ s.jsxs("div", { className: "ahv-tip", style: { left: `${(b + 0.5) / f.length * 100}%` }, children: [
            /* @__PURE__ */ s.jsx("strong", { className: "ahv-num", children: U.count ? `${U.count.toLocaleString()} ${U.count === 1 ? H : o}` : `No ${o}` }),
            /* @__PURE__ */ s.jsxs("span", { children: [
              Qs(U.at, j),
              " UTC"
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ s.jsx("div", { className: "ahv-chart-axis", "aria-hidden": "true", children: R.map((C) => /* @__PURE__ */ s.jsxs("span", { style: { left: `${(C.index + 0.5) / f.length * 100}%` }, children: [
      C.top,
      C.bottom && /* @__PURE__ */ s.jsx("b", { children: C.bottom })
    ] }, C.index)) })
  ] });
}
var b0 = dh();
const Mt = (...c) => c.filter(Boolean).join(" "), ph = (c) => de(c) ? c.actor : Fm(c), Ws = (c, o = {}) => de(c) ? c.actor_label : o[c.actor_type] || tu(oa(c.actor_type)) || "Unknown", Fs = {
  sealed: "Sealed: kept unchanged since its minute ended",
  waiting: "Waiting for its seal: each minute is sealed two minutes after it ends"
};
function x0({ value: c, seal: o }) {
  return /* @__PURE__ */ s.jsxs("span", { className: "ahv-when", title: `${c} UTC`, children: [
    /* @__PURE__ */ s.jsxs("span", { className: "ahv-mono", children: [
      au(c),
      o && /* @__PURE__ */ s.jsx("span", { className: Mt("ahv-seal", o === "waiting" && "ahv-seal-waiting"), title: Fs[o], "aria-label": Fs[o], children: /* @__PURE__ */ s.jsx(xt, { name: o === "sealed" ? "shield" : "history", size: 11 }) })
    ] }),
    /* @__PURE__ */ s.jsx("span", { className: "ahv-dim", children: ar(c) })
  ] });
}
const S0 = (c) => c ? Fs[c] : "";
function j0({ onClick: c, title: o, children: m }) {
  return c ? /* @__PURE__ */ s.jsx(
    "button",
    {
      type: "button",
      className: "ahv-link",
      title: o,
      onClick: (f) => {
        f.stopPropagation(), c();
      },
      onKeyDown: (f) => f.stopPropagation(),
      children: m
    }
  ) : /* @__PURE__ */ s.jsx(s.Fragment, { children: m });
}
function T0({ row: c, actorTypes: o, onFocus: m }) {
  const f = ph(c), b = Ws(c, o), E = c.actor_type !== "system" && c.actor_id && c.actor_id !== f ? c.actor_id : "";
  return /* @__PURE__ */ s.jsxs("span", { className: "ahv-who", children: [
    /* @__PURE__ */ s.jsx("span", { className: Mt("ahv-avatar", c.actor_type === "system" && "ahv-avatar-system"), "aria-hidden": "true", children: vh(f) }),
    /* @__PURE__ */ s.jsxs("span", { className: "ahv-stack", children: [
      /* @__PURE__ */ s.jsx(j0, { title: `Only activity by ${f}`, onClick: c.actor_id ? m : void 0, children: /* @__PURE__ */ s.jsx("span", { className: "ahv-strong ahv-clip", children: f }) }),
      /* @__PURE__ */ s.jsx("span", { className: "ahv-dim ahv-clip", children: [b, E].filter(Boolean).join(" · ") })
    ] })
  ] });
}
function E0({ row: c }) {
  return /* @__PURE__ */ s.jsxs("span", { className: "ahv-where", children: [
    c.origin && /* @__PURE__ */ s.jsx("span", { className: "ahv-tag", children: oa(c.origin) }),
    c.country && /* @__PURE__ */ s.jsx("span", { className: "ahv-dim", title: c.ip || void 0, children: c.country })
  ] });
}
function Fl({ outcome: c }) {
  return c === "success" ? null : /* @__PURE__ */ s.jsx("span", { className: Mt("ahv-tag", c === "failed" ? "ahv-tag-bad" : "ahv-tag-warn"), children: c });
}
const _0 = (c) => c >= 500 ? "ahv-tag-bad" : c >= 400 ? "ahv-tag-warn" : "ahv-tag-ok", gh = ({ status: c }) => /* @__PURE__ */ s.jsx("span", { className: Mt("ahv-tag ahv-mono", _0(c)), children: c }), yh = ({ method: c }) => /* @__PURE__ */ s.jsx("span", { className: Mt("ahv-tag ahv-mono", `ahv-method-${c.toLowerCase()}`), children: c }), lr = (c) => c.outcome !== "success" ? { icon: "alert", tone: "rose" } : { icon: c.icon ?? (c.category === "data" ? "layers" : "log"), tone: c.tone ?? "neutral" };
function N0({ row: c }) {
  var b;
  const o = c.children_count ?? ((b = c.children) == null ? void 0 : b.length) ?? 0, { icon: m, tone: f } = lr(c);
  return /* @__PURE__ */ s.jsxs("span", { className: "ahv-what ahv-what-event", children: [
    /* @__PURE__ */ s.jsx("span", { className: `ahv-what-icon ahv-tone-${f}`, "aria-hidden": "true", children: /* @__PURE__ */ s.jsx(xt, { name: m, size: 13 }) }),
    /* @__PURE__ */ s.jsxs("span", { className: "ahv-what-text", children: [
      /* @__PURE__ */ s.jsxs("span", { className: "ahv-what-title", children: [
        c.title,
        /* @__PURE__ */ s.jsx(Fl, { outcome: c.outcome }),
        c.importance === "high" && c.outcome === "success" && /* @__PURE__ */ s.jsx("span", { className: "ahv-mark", title: "Worth attention" })
      ] }),
      c.summary !== c.title && /* @__PURE__ */ s.jsx("span", { className: "ahv-sentence", children: c.summary })
    ] }),
    o > 0 && /* @__PURE__ */ s.jsxs("span", { className: "ahv-what-changes", title: "Database records changed by the same request; open the row to see them", children: [
      o,
      " change",
      o === 1 ? "" : "s"
    ] })
  ] });
}
function bh({ row: c }) {
  return /* @__PURE__ */ s.jsxs("span", { className: "ahv-what", children: [
    /* @__PURE__ */ s.jsx(yh, { method: c.method }),
    /* @__PURE__ */ s.jsx("span", { className: "ahv-mono ahv-clip", children: c.route }),
    /* @__PURE__ */ s.jsx(gh, { status: c.status }),
    /* @__PURE__ */ s.jsxs("span", { className: "ahv-dim ahv-num", children: [
      c.duration_ms,
      " ms"
    ] })
  ] });
}
function $l({ tone: c = "plain", children: o, action: m }) {
  return /* @__PURE__ */ s.jsxs("div", { className: Mt("ahv-message", c === "bad" && "ahv-message-bad"), role: c === "bad" ? "alert" : void 0, children: [
    /* @__PURE__ */ s.jsx("span", { children: o }),
    m
  ] });
}
function nr({ rows: c = 6 }) {
  return /* @__PURE__ */ s.jsx("div", { className: "ahv-skeleton", "aria-busy": "true", children: Array.from({ length: c }, (o, m) => /* @__PURE__ */ s.jsx("span", {}, m)) });
}
function xh({ facts: c }) {
  return c != null && c.length ? /* @__PURE__ */ s.jsx("span", { className: "ahv-chips-row", children: c.map((o, m) => /* @__PURE__ */ s.jsxs("span", { className: "ahv-fact", children: [
    o.label && /* @__PURE__ */ s.jsx("span", { className: "ahv-dim", children: o.label }),
    /* @__PURE__ */ s.jsx("span", { className: "ahv-mono", children: o.value })
  ] }, m)) }) : null;
}
const z0 = 36;
function ur({ items: c, mono: o = !1 }) {
  const m = c.filter(([, f]) => f != null && f !== "");
  return m.length ? /* @__PURE__ */ s.jsx("dl", { className: "ahv-pairs", children: m.map(([f, b], E) => {
    const M = typeof b == "object" ? JSON.stringify(b) : String(b);
    return /* @__PURE__ */ s.jsxs("div", { className: Mt("ahv-pair-cell", M.length > z0 && "ahv-pair-wide"), children: [
      /* @__PURE__ */ s.jsx("dt", { children: f }),
      /* @__PURE__ */ s.jsx("dd", { className: Mt(o && "ahv-mono"), children: M })
    ] }, `${f}-${E}`);
  }) }) : null;
}
function ir({ changes: c, valueLabel: o = "Value" }) {
  if (!c.length) return null;
  const m = c.every((b) => b.before === null), f = c.every((b) => b.after === null);
  if (m || f) {
    const b = c.filter((M) => (m ? M.after : M.before) !== null), E = c.length - b.length;
    return /* @__PURE__ */ s.jsxs("div", { className: "ahv-stack-gap", children: [
      o !== "Value" && /* @__PURE__ */ s.jsx("span", { className: "ahv-eyebrow", children: o }),
      /* @__PURE__ */ s.jsx(ur, { items: b.map((M) => [M.label, m ? M.after : M.before]), mono: !0 }),
      E > 0 && /* @__PURE__ */ s.jsxs("span", { className: "ahv-dim ahv-small", children: [
        E,
        " empty field",
        E === 1 ? "" : "s",
        " not shown"
      ] })
    ] });
  }
  return /* @__PURE__ */ s.jsx("div", { className: "ahv-scroll-x", children: /* @__PURE__ */ s.jsxs("table", { className: "ahv-changes", children: [
    /* @__PURE__ */ s.jsx("thead", { children: /* @__PURE__ */ s.jsxs("tr", { children: [
      /* @__PURE__ */ s.jsx("th", { children: "Field" }),
      /* @__PURE__ */ s.jsx("th", { children: "Before" }),
      /* @__PURE__ */ s.jsx("th", { children: "After" })
    ] }) }),
    /* @__PURE__ */ s.jsx("tbody", { children: c.map((b) => /* @__PURE__ */ s.jsxs("tr", { children: [
      /* @__PURE__ */ s.jsx("td", { className: "ahv-field-name", children: b.label }),
      /* @__PURE__ */ s.jsx("td", { className: "ahv-mono ahv-before", children: b.before ?? "—" }),
      /* @__PURE__ */ s.jsx("td", { className: "ahv-mono ahv-after", children: b.after ?? "—" })
    ] }, b.field)) })
  ] }) });
}
const A0 = 200, Sh = G.createContext(null);
function Ka({ title: c, children: o }) {
  return /* @__PURE__ */ s.jsxs("section", { className: "ahv-section", children: [
    /* @__PURE__ */ s.jsx("h3", { children: c }),
    o
  ] });
}
const Kl = ur;
function M0({ event: c }) {
  const o = c.change_list;
  if (!(o != null && o.length)) return null;
  const m = o.every((b) => b.before === null), f = o.every((b) => b.after === null);
  return /* @__PURE__ */ s.jsx(Ka, { title: m ? "Recorded values" : f ? "Values removed" : "Changes", children: /* @__PURE__ */ s.jsx(ir, { changes: o }) });
}
function O0({ text: c }) {
  const [o, m] = G.useState(!1);
  return /* @__PURE__ */ s.jsxs("button", { type: "button", className: "ahv-button ahv-button-quiet", onClick: () => {
    var f;
    (f = navigator.clipboard) == null || f.writeText(c).then(() => {
      m(!0), setTimeout(() => m(!1), 1500);
    });
  }, children: [
    /* @__PURE__ */ s.jsx(xt, { name: o ? "check" : "copy", size: 14 }),
    o ? "Copied" : "Copy"
  ] });
}
function D0({ row: c }) {
  const [o, m] = G.useState(!1), { children: f, details: b, ...E } = c, M = JSON.stringify(E, null, 2);
  return /* @__PURE__ */ s.jsxs("section", { className: "ahv-section", children: [
    /* @__PURE__ */ s.jsxs("div", { className: "ahv-row-between", children: [
      /* @__PURE__ */ s.jsxs("button", { type: "button", className: "ahv-disclose", "aria-expanded": o, onClick: () => m((q) => !q), children: [
        /* @__PURE__ */ s.jsx(xt, { name: "chevronDown", size: 14, className: Mt(o && "ahv-turned") }),
        "Full record (JSON)"
      ] }),
      /* @__PURE__ */ s.jsx(O0, { text: M })
    ] }),
    o && /* @__PURE__ */ s.jsx("pre", { className: "ahv-pre", children: M })
  ] });
}
function R0({ open: c, events: o, calls: m, onOpen: f }) {
  const b = [...o, ...m].sort((E, M) => E.occurred_at.localeCompare(M.occurred_at));
  return b.length ? /* @__PURE__ */ s.jsx("ol", { className: "ahv-list", children: b.map((E) => /* @__PURE__ */ s.jsx("li", { children: /* @__PURE__ */ s.jsxs("button", { type: "button", disabled: E.id === c.id, onClick: () => f(E), children: [
    /* @__PURE__ */ s.jsx("span", { className: "ahv-mono ahv-dim", children: au(E.occurred_at) }),
    de(E) ? /* @__PURE__ */ s.jsxs("span", { className: "ahv-what", children: [
      /* @__PURE__ */ s.jsx("span", { className: "ahv-sentence", children: E.summary }),
      /* @__PURE__ */ s.jsx(Fl, { outcome: E.outcome })
    ] }) : /* @__PURE__ */ s.jsx(bh, { row: E })
  ] }) }, E.id)) }) : /* @__PURE__ */ s.jsx("p", { className: "ahv-dim", children: "Nothing else was recorded for this request." });
}
function U0(c, o) {
  const m = de(o);
  return Ha(`${o.id}`, async () => {
    if (m) return c(`events/${o.id}`, { method: "GET" });
    if (!o.request_id) return { same_request: [], requests: [] };
    const f = (M) => c("search", {
      method: "POST",
      body: { kind: M, filters: { request_id: o.request_id }, limit: A0 }
    }), [b, E] = await Promise.all([f("events"), f("requests")]);
    return { same_request: b.items, requests: E.items.filter((M) => M.id !== o.id) };
  });
}
function jh({ request: c, row: o, onClose: m, onFocus: f, actorTypes: b, entities: E, seal: M }) {
  const [q, _] = G.useState(o);
  G.useEffect(() => _(o), [o]);
  const j = G.useRef(null), R = G.useRef(null), H = G.useRef(m);
  H.current = m;
  const U = q !== null;
  G.useEffect(() => {
    var at, vt;
    if (!U) return;
    const Q = ((at = j.current) == null ? void 0 : at.getRootNode()) ?? document, k = Q.activeElement ?? document.activeElement;
    (vt = j.current) == null || vt.focus();
    const et = (L) => {
      if (L.key === "Escape")
        L.stopPropagation(), H.current();
      else if (L.key === "Tab" && R.current) {
        const F = [...R.current.querySelectorAll("button:not(:disabled), [href], input, select, [tabindex]:not([tabindex='-1'])")], J = Q.activeElement;
        if (!F.length) return;
        L.shiftKey && J === F[0] ? (L.preventDefault(), F[F.length - 1].focus()) : !L.shiftKey && J === F[F.length - 1] ? (L.preventDefault(), F[0].focus()) : R.current.contains(J) || (L.preventDefault(), F[0].focus());
      }
    };
    return window.addEventListener("keydown", et, !0), () => {
      var L;
      window.removeEventListener("keydown", et, !0), (L = k == null ? void 0 : k.focus) == null || L.call(k);
    };
  }, [U]);
  const C = G.useContext(Sh);
  return q ? b0.createPortal(
    /* @__PURE__ */ s.jsxs("div", { className: "ahv ahv-drawer-layer", children: [
      /* @__PURE__ */ s.jsx("div", { className: "ahv-backdrop", onClick: m }),
      /* @__PURE__ */ s.jsxs("aside", { ref: R, className: "ahv-drawer", role: "dialog", "aria-modal": "true", "aria-label": "Activity details", children: [
        /* @__PURE__ */ s.jsx("button", { ref: j, type: "button", className: "ahv-icon-button ahv-drawer-close", onClick: m, "aria-label": "Close", children: /* @__PURE__ */ s.jsx(xt, { name: "close" }) }),
        /* @__PURE__ */ s.jsx(
          q0,
          {
            request: c,
            row: q,
            onOpen: _,
            onFocus: f,
            actorTypes: b,
            entities: E,
            seal: q === o ? M : null
          },
          q.id
        )
      ] })
    ] }),
    C ?? document.body
  ) : null;
}
function q0({ request: c, row: o, onOpen: m, onFocus: f, actorTypes: b, entities: E = {}, seal: M }) {
  var U, C, Q, k;
  const q = U0(c, o), _ = de(o) ? ((U = q.data) == null ? void 0 : U.event) ?? o : null, j = ph(o), R = _ != null && _.target_type ? `${E[_.target_type] ?? oa(_.target_type)} ${_.target_name || _.target_id}` : "", H = `${el(Da(o.occurred_at))}, ${au(o.occurred_at)} UTC`;
  return /* @__PURE__ */ s.jsxs("div", { className: "ahv-drawer-body", children: [
    /* @__PURE__ */ s.jsxs("header", { className: "ahv-drawer-head", children: [
      _ ? /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
        /* @__PURE__ */ s.jsxs("div", { className: "ahv-tags", children: [
          /* @__PURE__ */ s.jsx("span", { className: "ahv-tag", children: _.title }),
          /* @__PURE__ */ s.jsx(Fl, { outcome: _.outcome }),
          _.importance === "high" && /* @__PURE__ */ s.jsx("span", { className: "ahv-tag ahv-tag-accent", children: "Worth attention" }),
          _.imported && /* @__PURE__ */ s.jsx("span", { className: "ahv-tag", children: "Imported" })
        ] }),
        /* @__PURE__ */ s.jsx("h2", { children: _.summary }),
        /* @__PURE__ */ s.jsx(xh, { facts: _.facts })
      ] }) : /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
        /* @__PURE__ */ s.jsxs("div", { className: "ahv-tags", children: [
          /* @__PURE__ */ s.jsx(yh, { method: o.method }),
          /* @__PURE__ */ s.jsx(gh, { status: o.status })
        ] }),
        /* @__PURE__ */ s.jsx("h2", { className: "ahv-mono", children: o.route })
      ] }),
      /* @__PURE__ */ s.jsxs("p", { className: "ahv-dim", children: [
        j,
        " · ",
        Ws(o, b),
        " · ",
        H
      ] }),
      f && /* @__PURE__ */ s.jsxs("div", { className: "ahv-actions", children: [
        o.actor_id && /* @__PURE__ */ s.jsxs("button", { type: "button", className: "ahv-button", onClick: () => f({ actor_id: o.actor_id }), children: [
          /* @__PURE__ */ s.jsx(xt, { name: "user", size: 14 }),
          "All by ",
          j
        ] }),
        (_ == null ? void 0 : _.target_type) && /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: "ahv-button",
            onClick: () => f({ target_type: _.target_type, target_id: _.target_id }),
            children: [
              /* @__PURE__ */ s.jsx(xt, { name: "history", size: 14 }),
              "Timeline of ",
              R
            ]
          }
        )
      ] })
    ] }),
    _ ? /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
      _.outcome !== "success" && _.reason && /* @__PURE__ */ s.jsx(Ka, { title: "Reason", children: /* @__PURE__ */ s.jsx("p", { children: _.reason }) }),
      /* @__PURE__ */ s.jsx(M0, { event: _ }),
      (C = _.details) != null && C.length ? /* @__PURE__ */ s.jsx(Ka, { title: "Details", children: /* @__PURE__ */ s.jsx(Kl, { items: _.details.map((et) => [et.label, et.value]) }) }) : _.metadata && !q.loading ? /* @__PURE__ */ s.jsx(Ka, { title: "Details", children: /* @__PURE__ */ s.jsx(Kl, { items: Object.entries(_.metadata).map(([et, at]) => [tu(oa(et)), at]) }) }) : null,
      (R || _.related.length > 0) && /* @__PURE__ */ s.jsx(Ka, { title: "Concerns", children: /* @__PURE__ */ s.jsx(Kl, { items: [
        ["Target", R],
        ..._.related.map(([et, at]) => [tu(E[et] ?? oa(et)), at])
      ] }) })
    ] }) : /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
      /* @__PURE__ */ s.jsx(Ka, { title: "Request", children: /* @__PURE__ */ s.jsx(Kl, { items: [["Path", o.path], ["Took", `${o.duration_ms} ms`], ["Service", oa(o.service)]] }) }),
      o.request_body && /* @__PURE__ */ s.jsx(Ka, { title: "Sent (secrets masked)", children: /* @__PURE__ */ s.jsx("pre", { className: "ahv-pre", children: JSON.stringify(o.request_body, null, 2) }) })
    ] }),
    o.request_id && /* @__PURE__ */ s.jsx(Ka, { title: "Same request", children: q.error ? /* @__PURE__ */ s.jsxs($l, { tone: "bad", action: /* @__PURE__ */ s.jsx("button", { type: "button", className: "ahv-button", onClick: q.refresh, children: "Retry" }), children: [
      "Couldn't load: ",
      q.error.message
    ] }) : q.loading && !q.data ? /* @__PURE__ */ s.jsx(nr, { rows: 2 }) : /* @__PURE__ */ s.jsx(R0, { open: o, events: ((Q = q.data) == null ? void 0 : Q.same_request) ?? [], calls: ((k = q.data) == null ? void 0 : k.requests) ?? [], onOpen: m }) }),
    /* @__PURE__ */ s.jsx(Ka, { title: "Who and from where", children: /* @__PURE__ */ s.jsx(Kl, { items: [
      ["Who", `${j} (${Ws(o, b)}${o.actor_id && o.actor_id !== j ? ` ${o.actor_id}` : ""})`],
      ["App", o.origin && oa(o.origin)],
      ["Country", o.country],
      ["IP address", o.ip],
      ["Device", _ ? _.device : o.user_agent],
      ["Session", o.session_id],
      ["Company", o.tenant_id],
      ["Service", oa(o.service)]
    ] }) }),
    /* @__PURE__ */ s.jsx(Ka, { title: "Reference", children: /* @__PURE__ */ s.jsx(Kl, { items: [
      ["Record id", o.id],
      ["Request id", o.request_id],
      ["Recorded", `${o.received_at} UTC`],
      ["Integrity", S0(M ?? null)],
      ..._ ? [["Action", _.action]] : []
    ] }) }),
    /* @__PURE__ */ s.jsx(D0, { row: _ ?? o })
  ] });
}
const w0 = 65, Is = { events: "Events", access_logs: "Requests" }, C0 = 20, H0 = (c, o = Date.now()) => (o - Date.parse(`${c.replace(" ", "T")}:00Z`)) / 6e4, B0 = () => new Date(Date.now() - 864e5).toISOString().slice(0, 10);
function Y0(c, o, m) {
  var b;
  const f = (b = m == null ? void 0 : m.sealed_until) == null ? void 0 : b[o];
  return f ? c.slice(0, 16) <= f ? "sealed" : "waiting" : null;
}
function G0({ request: c, status: o }) {
  var F, J;
  const [m, f] = G.useState(!1), [b, E] = G.useState(B0), [M, q] = G.useState(!1), [_, j] = G.useState(null), R = G.useRef(null), H = Ha(
    o != null && o.checks ? "integrity" : null,
    () => c("integrity", { method: "GET" })
  ), U = !!(o != null && o.checks && ((F = H.data) != null && F.allowed));
  if (!o) return null;
  const C = Object.entries(o.sealed_until ?? {}), Q = o.last_daily, k = (J = o.stats) == null ? void 0 : J.queued;
  if (!C.length && o.recording === void 0 && !Q) return null;
  const et = async (nt) => {
    q(!0);
    try {
      j(await nt());
    } catch (w) {
      j({ kind: "error", message: w.message });
    } finally {
      q(!1);
    }
  }, at = () => et(async () => ({ kind: "day", ...await c("integrity/verify", { method: "POST", body: { day: b } }) })), vt = () => et(async () => {
    const nt = await c(`integrity/seal/${b}`, { method: "GET" });
    return Js(`${JSON.stringify(nt, null, 2)}
`, `activity-seal-${b}.json`, "application/json"), { kind: "downloaded", day: b };
  }), L = (nt) => et(async () => {
    let w;
    try {
      w = JSON.parse(await nt.text());
    } catch {
      w = {};
    }
    if (!w || !Array.isArray(w.seals) || !w.seals.length)
      throw new Error(`${nt.name} is not a seal record: choose a proof downloaded here (activity-seal-<day>.json)`);
    const W = await c("integrity/check", { method: "POST", body: { record: w } });
    return { kind: "proof", name: nt.name, day: String(w.day ?? ""), ...W };
  });
  return /* @__PURE__ */ s.jsxs("div", { className: "ahv-status-wrap", children: [
    /* @__PURE__ */ s.jsxs("div", { className: "ahv-status", role: "status", children: [
      (() => {
        const nt = C.map(([, Kt]) => Kt).sort()[0], w = C.some(([, Kt]) => H0(Kt) > w0), W = [
          ...C.map(([Kt, Jt]) => `${Is[Kt] ?? Kt} sealed through ${Jt} UTC`),
          k !== void 0 && `${k.toLocaleString()} waiting to be written`,
          Q && `Check of ${Q.day}: ${Q.ok === !1 ? `${Q.problems ?? ""} problem(s)`.trim() : Q.ok ? "intact" : "not checked"}`
        ].filter(Boolean).join(`
`), Ot = nt != null && nt.startsWith((/* @__PURE__ */ new Date()).toISOString().slice(0, 10)) ? nt.slice(11, 16) : nt;
        return nt && /* @__PURE__ */ s.jsxs("span", { className: Mt("ahv-seal-chip", w ? "ahv-warn" : "ahv-ok"), title: W, children: [
          /* @__PURE__ */ s.jsx(xt, { name: w ? "alert" : "shield", size: 14 }),
          w ? "Sealing is behind, last sealed" : "Sealed up to",
          " ",
          /* @__PURE__ */ s.jsx("strong", { className: "ahv-num", children: Ot }),
          " UTC"
        ] });
      })(),
      o.recording === !1 && /* @__PURE__ */ s.jsx("span", { className: "ahv-tag ahv-tag-bad", children: "Not recording" }),
      !!k && /* @__PURE__ */ s.jsxs("span", { className: "ahv-dim", children: [
        k.toLocaleString(),
        " waiting to be written"
      ] }),
      (Q == null ? void 0 : Q.ok) === !1 && /* @__PURE__ */ s.jsxs("span", { className: "ahv-tag ahv-tag-bad", children: [
        "Check of ",
        Q.day,
        ": ",
        Q.problems ?? "",
        " problem(s)"
      ] }),
      U && /* @__PURE__ */ s.jsxs(
        "button",
        {
          type: "button",
          className: "ahv-button ahv-button-small ahv-push-right",
          "aria-expanded": m,
          onClick: () => f((nt) => !nt),
          title: "Prove that no record was changed or removed since it was sealed",
          children: [
            /* @__PURE__ */ s.jsx(xt, { name: "check", size: 13 }),
            "Verify"
          ]
        }
      )
    ] }),
    m && U && /* @__PURE__ */ s.jsxs("div", { className: "ahv-checks", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "ahv-bar", children: [
        /* @__PURE__ */ s.jsxs("label", { className: "ahv-field", children: [
          /* @__PURE__ */ s.jsx("span", { children: "Day (UTC)" }),
          /* @__PURE__ */ s.jsx(
            "input",
            {
              type: "date",
              className: "ahv-input",
              value: b,
              max: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
              min: "2000-01-01",
              onChange: (nt) => E(nt.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ s.jsxs("button", { type: "button", className: "ahv-button ahv-button-main", disabled: M || !b, onClick: at, children: [
          /* @__PURE__ */ s.jsx(xt, { name: "shield", size: 14 }),
          M ? "Checking…" : "Check this day"
        ] }),
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: "ahv-button",
            disabled: M || !b,
            onClick: vt,
            title: "The day's last seal of each table, to keep outside the database",
            children: [
              /* @__PURE__ */ s.jsx(xt, { name: "download", size: 14 }),
              "Download proof"
            ]
          }
        ),
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: "ahv-button",
            disabled: M,
            title: "Compare a proof kept earlier with the database",
            onClick: () => {
              var nt;
              return (nt = R.current) == null ? void 0 : nt.click();
            },
            children: [
              /* @__PURE__ */ s.jsx(xt, { name: "check", size: 14 }),
              "Check a kept proof"
            ]
          }
        ),
        /* @__PURE__ */ s.jsx(
          "input",
          {
            ref: R,
            type: "file",
            accept: "application/json,.json",
            className: "ahv-hidden",
            tabIndex: -1,
            "aria-hidden": "true",
            onChange: (nt) => {
              var W;
              const w = (W = nt.target.files) == null ? void 0 : W[0];
              nt.target.value = "", w && L(w);
            }
          }
        )
      ] }),
      _ && /* @__PURE__ */ s.jsx(L0, { verdict: _ })
    ] })
  ] });
}
function L0({ verdict: c }) {
  return c.kind === "error" ? /* @__PURE__ */ s.jsx("p", { className: "ahv-bad", role: "alert", children: c.message }) : c.kind === "day" ? /* @__PURE__ */ s.jsxs("div", { role: "status", className: Mt("ahv-verdict", c.ok ? "ahv-verdict-ok" : "ahv-verdict-bad"), children: [
    /* @__PURE__ */ s.jsx("strong", { children: c.ok ? `${c.day}: intact. ${c.rows.toLocaleString()} records in ${c.checked.toLocaleString()} sealed minutes match their seals.` : `${c.day}: ${(c.problems.length + c.more).toLocaleString()} problem(s) found.` }),
    !c.ok && /* @__PURE__ */ s.jsxs("ul", { children: [
      c.problems.slice(0, C0).map((o, m) => /* @__PURE__ */ s.jsxs("li", { children: [
        /* @__PURE__ */ s.jsx("span", { className: "ahv-mono", children: o.window_start }),
        " ",
        Is[o.table] ?? o.table,
        ": ",
        o.problem
      ] }, m)),
      c.more > 0 && /* @__PURE__ */ s.jsxs("li", { className: "ahv-dim", children: [
        "and ",
        c.more.toLocaleString(),
        " more"
      ] })
    ] })
  ] }) : c.kind === "downloaded" ? /* @__PURE__ */ s.jsx("div", { role: "status", className: "ahv-verdict ahv-verdict-ok", children: /* @__PURE__ */ s.jsxs("strong", { children: [
    "Proof of ",
    c.day,
    " downloaded. Keep it outside this system: checking it later shows any rewrite since."
  ] }) }) : c.mismatches.length ? /* @__PURE__ */ s.jsxs("div", { role: "status", className: "ahv-verdict ahv-verdict-bad", children: [
    /* @__PURE__ */ s.jsxs("strong", { children: [
      c.name,
      ": the database no longer matches this proof of ",
      c.day,
      "."
    ] }),
    /* @__PURE__ */ s.jsx("ul", { children: c.mismatches.map((o, m) => /* @__PURE__ */ s.jsxs("li", { children: [
      /* @__PURE__ */ s.jsx("span", { className: "ahv-mono", children: o.window_start }),
      " ",
      Is[o.table] ?? o.table,
      ": ",
      o.problem
    ] }, m)) })
  ] }) : /* @__PURE__ */ s.jsx("div", { role: "status", className: "ahv-verdict ahv-verdict-ok", children: /* @__PURE__ */ s.jsxs("strong", { children: [
    c.name,
    ": the database still matches this proof of ",
    c.day,
    "."
  ] }) });
}
function ih(c, o) {
  const m = c.lastIndexOf(" ", o - 1) + 1, f = c.indexOf(" ", o);
  return { start: m, end: f < 0 ? c.length : f, word: c.slice(m, f < 0 ? c.length : f) };
}
function X0({ value: c, onChange: o, onSubmit: m, suggestions: f, placeholder: b, inputRef: E }) {
  const M = G.useRef(null), q = E ?? M, _ = G.useId(), [j, R] = G.useState(0), [H, U] = G.useState(!1), [C, Q] = G.useState(0), [k, et] = G.useState(!1), { start: at, end: vt, word: L } = ih(c, j), F = H ? f(L) : [], J = F[Math.min(C, F.length - 1)], nt = (w) => {
    const W = c.slice(vt), Ot = w.insert.endsWith(":") ? "" : " ", Kt = `${c.slice(0, at)}${w.insert}${W.startsWith(" ") || !Ot ? "" : Ot}${W}`, Jt = at + w.insert.length + (w.insert.endsWith(":") ? 0 : 1);
    o(Kt), Q(0), et(!1), requestAnimationFrame(() => {
      var Tt, ba;
      (Tt = q.current) == null || Tt.focus(), (ba = q.current) == null || ba.setSelectionRange(Jt, Jt), R(Jt);
    });
  };
  return /* @__PURE__ */ s.jsxs("div", { className: "ahv-search", children: [
    /* @__PURE__ */ s.jsxs("span", { className: "ahv-input-icon", children: [
      /* @__PURE__ */ s.jsx(xt, { name: "search", size: 14 }),
      /* @__PURE__ */ s.jsx(
        "input",
        {
          ref: q,
          className: "ahv-input",
          role: "combobox",
          "aria-label": "Search",
          "aria-expanded": F.length > 0,
          "aria-controls": _,
          "aria-autocomplete": "list",
          "aria-activedescendant": F.length && k ? `${_}-${F.indexOf(J)}` : void 0,
          value: c,
          placeholder: b,
          spellCheck: !1,
          onChange: (w) => {
            o(w.target.value), R(w.target.selectionStart ?? w.target.value.length), U(!0), Q(0), et(!1);
          },
          onSelect: (w) => {
            const W = w.currentTarget.selectionStart ?? 0;
            ih(c, W).start !== at && et(!1), R(W);
          },
          onFocus: () => U(!0),
          onBlur: () => setTimeout(() => {
            U(!1), et(!1);
          }, 120),
          onKeyDown: (w) => {
            F.length && (w.key === "ArrowDown" || w.key === "ArrowUp") ? (w.preventDefault(), Q((W) => k ? (W + (w.key === "ArrowDown" ? 1 : F.length - 1)) % F.length : w.key === "ArrowDown" ? 0 : F.length - 1), et(!0)) : F.length && k && w.key === "Enter" ? (w.preventDefault(), nt(J)) : w.key === "Escape" ? (U(!1), et(!1)) : w.key === "Enter" && (U(!1), m());
          }
        }
      )
    ] }),
    F.length > 0 && /* @__PURE__ */ s.jsx("ul", { id: _, role: "listbox", className: "ahv-suggest", children: F.map((w, W) => /* @__PURE__ */ s.jsxs(
      "li",
      {
        id: `${_}-${W}`,
        role: "option",
        "aria-selected": k && w === J,
        className: Mt(k && w === J && "ahv-suggest-on"),
        onMouseDown: (Ot) => {
          Ot.preventDefault(), nt(w);
        },
        onMouseEnter: () => {
          Q(W), et(!0);
        },
        children: [
          /* @__PURE__ */ s.jsx("span", { className: "ahv-mono", children: w.label }),
          w.hint && /* @__PURE__ */ s.jsx("span", { className: "ahv-dim", children: w.hint })
        ]
      },
      w.insert
    )) })
  ] });
}
function cr({ label: c, icon: o, children: m, open: f, setOpen: b, badge: E, disabled: M }) {
  const q = G.useRef(null), _ = G.useRef(null), [j, R] = G.useState(!1);
  return G.useLayoutEffect(() => {
    if (!f) return R(!1);
    _.current && _.current.getBoundingClientRect().left < 8 && R(!0);
  }, [f]), G.useEffect(() => {
    if (!f) return;
    const H = (C) => {
      q.current && !C.composedPath().includes(q.current) && b(!1);
    }, U = (C) => C.key === "Escape" && b(!1);
    return document.addEventListener("mousedown", H), document.addEventListener("keydown", U), () => {
      document.removeEventListener("mousedown", H), document.removeEventListener("keydown", U);
    };
  }, [f, b]), /* @__PURE__ */ s.jsxs("div", { className: "ahv-menu", ref: q, children: [
    /* @__PURE__ */ s.jsxs("button", { type: "button", className: "ahv-button", "aria-expanded": f, disabled: M, onClick: () => b(!f), children: [
      /* @__PURE__ */ s.jsx(xt, { name: o, size: 14 }),
      c,
      E && /* @__PURE__ */ s.jsx("span", { className: "ahv-count", children: E }),
      /* @__PURE__ */ s.jsx(xt, { name: "chevronDown", size: 14 })
    ] }),
    f && /* @__PURE__ */ s.jsx("div", { ref: _, className: Mt("ahv-menu-list ahv-menu-panel", j && "ahv-menu-from-start"), children: m })
  ] });
}
function Q0({ columns: c, shown: o, onChange: m }) {
  const [f, b] = G.useState(!1);
  return /* @__PURE__ */ s.jsxs(cr, { label: "Columns", icon: "sliders", open: f, setOpen: b, children: [
    /* @__PURE__ */ s.jsx("p", { className: "ahv-dim ahv-small", children: "When, who and what always show." }),
    c.map((E) => /* @__PURE__ */ s.jsxs("label", { className: "ahv-check", children: [
      /* @__PURE__ */ s.jsx(
        "input",
        {
          type: "checkbox",
          checked: o.includes(E.key),
          onChange: (M) => m(M.target.checked ? [...o, E.key] : o.filter((q) => q !== E.key))
        }
      ),
      E.label
    ] }, E.key))
  ] });
}
function k0({ request: c, current: o, onOpen: m }) {
  var vt;
  const [f, b] = G.useState(!1), E = Ha("views", () => c("views", { method: "GET" })), [M, q] = G.useState(""), [_, j] = G.useState(!1), [R, H] = G.useState(!1), [U, C] = G.useState(null);
  if (!((vt = E.data) != null && vt.enabled)) return null;
  const Q = E.data.views, k = Q.find((L) => L.search === o), et = async (L) => {
    H(!0), C(null);
    try {
      await L(), E.refresh(), q("");
    } catch (F) {
      C(F.message);
    } finally {
      H(!1);
    }
  }, at = (L, F = M, J = _) => et(() => c("views", { method: "POST", body: { id: L, name: F.trim(), search: o, shared: J } }));
  return /* @__PURE__ */ s.jsxs(cr, { label: k ? k.name : "Views", icon: "layers", open: f, setOpen: b, children: [
    Q.length ? /* @__PURE__ */ s.jsx("ul", { className: "ahv-views", children: Q.map((L) => /* @__PURE__ */ s.jsxs("li", { className: Mt(L === k && "ahv-views-on"), children: [
      /* @__PURE__ */ s.jsxs("button", { type: "button", className: "ahv-views-open", onClick: () => {
        m(L.search), b(!1);
      }, children: [
        /* @__PURE__ */ s.jsx("span", { children: L.name }),
        /* @__PURE__ */ s.jsx("span", { className: "ahv-dim ahv-small", children: L.mine ? L.shared ? "Shared by you" : "Only you" : `Shared by ${L.owner_name}` })
      ] }),
      L.mine && /* @__PURE__ */ s.jsxs("span", { className: "ahv-views-tools", children: [
        L.search !== o && /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: "ahv-icon-button",
            title: "Save the current search into this view",
            disabled: R,
            onClick: () => at(L.id, L.name, L.shared),
            children: /* @__PURE__ */ s.jsx(xt, { name: "refresh", size: 14 })
          }
        ),
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: "ahv-icon-button",
            title: "Remove this view",
            disabled: R,
            onClick: () => et(() => c(`views/${L.id}`, { method: "DELETE" })),
            children: /* @__PURE__ */ s.jsx(xt, { name: "close", size: 14 })
          }
        )
      ] })
    ] }, L.id)) }) : /* @__PURE__ */ s.jsx("p", { className: "ahv-dim ahv-small", children: "No saved views yet. Save the current search to come back to it." }),
    /* @__PURE__ */ s.jsxs("form", { className: "ahv-views-save", onSubmit: (L) => {
      L.preventDefault(), M.trim() && at();
    }, children: [
      /* @__PURE__ */ s.jsx(
        "input",
        {
          className: "ahv-input",
          value: M,
          maxLength: 80,
          placeholder: "Name this search",
          "aria-label": "View name",
          onChange: (L) => q(L.target.value)
        }
      ),
      /* @__PURE__ */ s.jsxs("label", { className: "ahv-check", children: [
        /* @__PURE__ */ s.jsx("input", { type: "checkbox", checked: _, onChange: (L) => j(L.target.checked) }),
        "Share with my team"
      ] }),
      /* @__PURE__ */ s.jsx("button", { type: "submit", className: "ahv-button ahv-button-main", disabled: R || !M.trim(), children: "Save view" }),
      U && /* @__PURE__ */ s.jsx("span", { className: "ahv-bad ahv-small", children: U })
    ] })
  ] });
}
const ch = [
  { value: "important", label: "Important", hint: "What people did, without the details behind it" },
  { value: "all", label: "All", hint: "Every record, each request's row changes inside its event" },
  { value: "problems", label: "Problems", hint: "Only what failed or was refused" }
], Z0 = [
  { label: "All requests", search: {} },
  { label: "Changes only", search: { filters: { method: ["POST", "PUT", "PATCH", "DELETE"] } } },
  { label: "Errors", search: { status_from: 400 } }
], Ps = [
  { value: "1h", label: "Last hour", minutes: 60 },
  { value: "24h", label: "Last 24 hours", minutes: 1440 },
  { value: "7d", label: "Last 7 days", minutes: 10080 },
  { value: "30d", label: "Last 30 days", minutes: 43200 },
  { value: "all", label: "All time" },
  { value: "custom", label: "Dates…" }
], sh = {
  events: [
    { key: "where", label: "Where" },
    { key: "concerning", label: "Concerning" },
    { key: "result", label: "Result" },
    { key: "service", label: "Service" },
    { key: "ip", label: "IP address" }
  ],
  requests: [{ key: "where", label: "Where" }, { key: "service", label: "Service" }, { key: "ip", label: "IP address" }]
}, rh = ["where"], V0 = [], Th = "activity-hub-columns", Eh = "activity-hub-chart", ji = ["kind", "view", "p", "q", "range", "from", "to", "cols"], Pn = (c) => c ? "all" : "7d";
function fh(c, o) {
  const m = (E) => {
    const M = c.get(E) ?? "";
    return Vs(M) ? M : "";
  }, f = m("from"), b = m("to");
  return { q: c.get("q") ?? "", from: f, to: b, range: c.get("range") || (f || b ? "custom" : Pn(o)) };
}
function K0(c) {
  var m;
  if (c.range === "custom")
    return { occurred_from: Vs(c.from) ? Ks(c.from) : void 0, occurred_to: Vs(c.to) ? Im(c.to) : void 0 };
  const o = (m = Ps.find((f) => f.value === c.range)) == null ? void 0 : m.minutes;
  return o ? { occurred_from: `${Pm(o).slice(0, 16)}:00` } : {};
}
function J0(c, o, m, f, b) {
  const E = { ...(m == null ? void 0 : m.search.filters) ?? {} }, M = { kind: c, filters: E, query: f.q.trim() || void 0, ...K0(f) };
  return c === "events" ? (M.view = o, M.action = m == null ? void 0 : m.search.action, b && Object.assign(M, { related_type: b.type, related_id: b.id })) : (M.status_from = m == null ? void 0 : m.search.status_from, b && (E.actor_id = b.id)), M;
}
const $0 = (c) => {
  const o = new URLSearchParams();
  return c.forEach((m, f) => ji.includes(f) && o.set(f, m)), o.toString();
};
function W0() {
  try {
    return localStorage.getItem(Eh) === "hidden";
  } catch {
    return !1;
  }
}
function F0() {
  try {
    return JSON.parse(localStorage.getItem(Th) ?? "null") ?? rh;
  } catch {
    return rh;
  }
}
function I0({
  request: c,
  title: o = "Activity Log",
  description: m,
  presets: f = V0,
  kinds: b = ["events", "requests"],
  entity: E,
  params: M,
  onParamsChange: q,
  canExport: _ = !1,
  showStatus: j = !0,
  pageSize: R = 100,
  liveEveryMs: H = 5e3,
  className: U
}) {
  var Pl, cl, me, fu, tn;
  const [C, Q] = G.useState(() => new URLSearchParams()), k = M ?? C, et = G.useCallback((T) => q ? q(T) : Q(T), [q]), at = k.get("kind") === "requests" && b.includes("requests") ? "requests" : b[0], vt = ((Pl = ch.find((T) => T.value === k.get("view"))) == null ? void 0 : Pl.value) ?? "important", L = G.useMemo(() => at === "events" ? [{ label: "Everything", search: {} }, ...f] : Z0, [at, f]), F = Math.min(Math.max(Number(k.get("p")) || 0, 0), L.length - 1), J = k.has("cols") ? (k.get("cols") || "").split(",").filter(Boolean) : F0(), nt = sh[at].filter((T) => J.includes(T.key)), w = G.useMemo(() => fh(k, E), [k, E]), [W, Ot] = G.useState(w), [Kt, Jt] = G.useState(k.toString());
  Kt !== k.toString() && (Jt(k.toString()), Ot(w));
  const [Tt, ba] = G.useState(!1), [Ra, wt] = G.useState(null), [N, B] = G.useState(null), [I, bt] = G.useState(!1), [h, D] = G.useState(null), X = G.useRef(null), [, Y] = G.useState(0);
  G.useEffect(() => {
    const T = setInterval(() => Y((ut) => ut + 1), 3e4);
    return () => clearInterval(T);
  }, []);
  const K = G.useMemo(
    () => J0(at, vt, L[F], w, E),
    [at, vt, L, F, w, E]
  ), ft = JSON.stringify(K), V = Km(c, K, R, Tt, H), $t = G.useRef(null), [pt, Ba] = G.useState(W0), Il = () => {
    const T = !pt;
    try {
      localStorage.setItem(Eh, T ? "hidden" : "shown");
    } catch {
    }
    Ba(T);
  }, Ya = Ha(pt ? null : ft, () => {
    var gt;
    const T = ft, ut = !K.occurred_from && ((gt = $t.current) == null ? void 0 : gt.key) === T;
    return c("chart", { method: "POST", body: ut ? { ...K, occurred_from: $t.current.from } : K }).then((it) => (K.occurred_from || ($t.current = { key: T, from: it.occurred_from }), it));
  }, Tt ? H : void 0), Ja = Ha("catalog", () => c("catalog", { method: "GET" })), ll = Ha(j ? "status" : null, () => c("status", { method: "GET" }), 6e4), nl = (T) => Y0(T.received_at, de(T) ? "events" : "access_logs", ll.data), eu = (T) => () => c("values", { method: "POST", body: { ...K, field: T } }).then((ut) => ut.values), Ni = Ha(`${ft}|service`, eu("service")), xa = Ha(`${ft}|origin`, eu("origin")), lu = (T = {}) => {
    const ut = new URLSearchParams(k);
    for (const Sa of ji) ut.delete(Sa);
    const gt = T.kind ?? at;
    let it = T.draft ?? W;
    if (gt !== at) {
      const Sa = new Set(f0(gt));
      it = { ...it, q: In(it.q).filter((Ct) => !Ct.field || Sa.has(Ct.field)).map((Ct) => Ct.text).join(" ") };
    }
    gt !== b[0] && ut.set("kind", gt), (T.view ?? vt) !== "important" && ut.set("view", T.view ?? vt);
    const Wa = T.preset ?? (T.kind && T.kind !== at ? 0 : F);
    return Wa && ut.set("p", String(Wa)), it.q.trim() && ut.set("q", it.q.trim()), it.range !== Pn(E) && ut.set("range", it.range), it.range === "custom" && (it.from && ut.set("from", it.from), it.to && ut.set("to", it.to)), (T.columns || k.has("cols")) && ut.set("cols", (T.columns ?? J).join(",")), ut;
  }, na = (T = {}) => {
    T.draft && Ot(T.draft), et(lu(T));
  }, nu = (T) => {
    try {
      localStorage.setItem(Th, JSON.stringify(T));
    } catch {
    }
    na({ draft: w, columns: T });
  }, ul = (T, ut) => {
    const gt = In(w.q).filter((it) => it.field !== T).map((it) => it.text);
    na({ draft: { ...w, q: [...gt, `${T}:${$s(ut)}`].join(" ") } });
  }, uu = (T) => {
    wt(null), T.actor_id ? ul("actor", T.actor_id) : T.target_type && T.target_id && na({
      kind: "events",
      view: "all",
      preset: 0,
      draft: { q: `on:${T.target_type}:${$s(T.target_id)}`, range: "all", from: "", to: "" }
    });
  }, iu = (T) => {
    const ut = W.q.trim();
    Ot({ ...W, q: `${ut ? `${ut} ` : ""}${T}:` }), requestAnimationFrame(() => {
      const gt = X.current;
      gt && (gt.focus(), gt.setSelectionRange(gt.value.length, gt.value.length));
    });
  }, zi = W.q.trim() !== w.q.trim() || W.range !== w.range || W.from !== w.from || W.to !== w.to, Be = !!(W.range === "custom" && W.from && W.to && W.to < W.from), $a = G.useRef(null), ta = G.useRef(null), { hasMore: Ua, loadMore: Wt, more: Ga, pageCount: cu } = V;
  G.useEffect(() => {
    if (!$a.current || !Ua || Ga.loading || Ga.error || cu >= ks) return;
    const T = new IntersectionObserver(([ut]) => ut.isIntersecting && Wt(), { root: ta.current, rootMargin: "240px" });
    return T.observe($a.current), () => T.disconnect();
  }, [Ua, Wt, Ga.loading, Ga.error, cu, V.rows.length]);
  const su = async (T) => {
    bt(!1), B(0);
    try {
      const { rows: ut, more: gt } = await l0(c, K, B);
      gt && D(`Only the newest ${Si.toLocaleString()} rows were exported. Narrow the dates for the rest.`);
      const it = (/* @__PURE__ */ new Date()).toISOString().slice(0, 16).replace(/[-:T]/g, ""), Wa = `activity-${E ? `${E.type}-${E.id}-` : ""}${at}-${it}`;
      T === "csv" ? Js(u0(at, ut), `${Wa}.csv`, "text/csv;charset=utf-8") : Js(i0(ut), `${Wa}.jsonl`, "application/x-ndjson");
    } catch (ut) {
      D(`Export failed: ${ut.message}`);
    } finally {
      B(null);
    }
  }, he = at === "events" ? "events" : "requests", ve = ((cl = Ja.data) == null ? void 0 : cl.actor_types) ?? {}, La = ((me = Ja.data) == null ? void 0 : me.entities) ?? {}, il = (T) => {
    var ut, gt;
    if (T.field === "action") return ((gt = (ut = Ja.data) == null ? void 0 : ut.actions[T.value]) == null ? void 0 : gt.title) ?? T.value;
    if (T.field === "actor_type") return ve[T.value] ?? T.value;
    if (T.field === "on") {
      const [it, ...Wa] = T.value.split(":");
      return `${La[it] ?? oa(it)} ${Wa.join(":")}`;
    }
    return T.value;
  }, ua = V.rows, Ai = { service: Ni.data ?? [], origin: xa.data ?? [] }, ru = 3 + nt.length;
  return E && !(E.type && E.id) ? /* @__PURE__ */ s.jsx("div", { className: Mt("ahv ahv-log", U), children: /* @__PURE__ */ s.jsxs($l, { children: [
    "Nothing to show: no ",
    E.type || "record",
    " chosen."
  ] }) }) : /* @__PURE__ */ s.jsxs("div", { className: Mt("ahv ahv-log", U), children: [
    /* @__PURE__ */ s.jsxs("header", { className: "ahv-head", children: [
      /* @__PURE__ */ s.jsxs("div", { children: [
        /* @__PURE__ */ s.jsxs("h2", { className: "ahv-title", children: [
          /* @__PURE__ */ s.jsx(xt, { name: "log", size: 18 }),
          E && o === "Activity Log" ? "Activity" : o
        ] }),
        /* @__PURE__ */ s.jsx("p", { className: "ahv-dim", children: m ?? (E ? `Everything about ${E.label}, and the API requests it made itself. Times are UTC.` : "Every action and API request, kept permanently and sealed. Times are UTC.") })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "ahv-actions", children: [
        !E && /* @__PURE__ */ s.jsx(
          k0,
          {
            request: c,
            current: $0(lu({ draft: w })),
            onOpen: (T) => {
              const ut = new URLSearchParams(k);
              for (const gt of ji) ut.delete(gt);
              new URLSearchParams(T).forEach((gt, it) => ji.includes(it) && ut.set(it, gt)), et(ut);
            }
          }
        ),
        /* @__PURE__ */ s.jsx(Q0, { columns: sh[at], shown: J, onChange: nu }),
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: "ahv-button",
            "aria-pressed": !pt,
            onClick: Il,
            title: pt ? "Show the activity chart" : "Hide the activity chart",
            children: [
              /* @__PURE__ */ s.jsx(xt, { name: "chart", size: 14 }),
              pt ? "Show chart" : "Hide chart"
            ]
          }
        ),
        _ && /* @__PURE__ */ s.jsxs(
          cr,
          {
            label: N === null ? "Export" : `Exporting… ${N.toLocaleString()}`,
            icon: "download",
            open: I,
            setOpen: bt,
            disabled: N !== null || !ua.length,
            children: [
              /* @__PURE__ */ s.jsx("button", { type: "button", role: "menuitem", onClick: () => su("csv"), children: "CSV, for spreadsheets" }),
              /* @__PURE__ */ s.jsx("button", { type: "button", role: "menuitem", onClick: () => su("jsonl"), children: "JSON Lines, for other tools" })
            ]
          }
        ),
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: Mt("ahv-button", Tt && "ahv-button-live"),
            "aria-pressed": Tt,
            title: "Check for new activity every few seconds",
            onClick: () => ba((T) => !T),
            children: [
              /* @__PURE__ */ s.jsx(xt, { name: "live", size: 14, className: Mt(Tt && "ahv-pulse") }),
              Tt ? "Live" : "Go live"
            ]
          }
        ),
        /* @__PURE__ */ s.jsxs(
          "button",
          {
            type: "button",
            className: "ahv-button",
            disabled: V.refreshing && !V.error,
            onClick: () => {
              V.refresh(), Ya.refresh();
            },
            children: [
              /* @__PURE__ */ s.jsx(xt, { name: "refresh", size: 14, className: Mt(V.refreshing && !Tt && "ahv-spin") }),
              "Refresh"
            ]
          }
        )
      ] })
    ] }),
    j && !E && /* @__PURE__ */ s.jsx(G0, { request: c, status: ll.data }),
    /* @__PURE__ */ s.jsxs("div", { className: "ahv-filters", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "ahv-bar", children: [
        b.length > 1 && /* @__PURE__ */ s.jsx("div", { className: "ahv-segment", role: "group", "aria-label": "Records", children: b.map((T) => /* @__PURE__ */ s.jsx("button", { type: "button", "aria-pressed": at === T, onClick: () => na({ kind: T, draft: w }), children: T === "events" ? "Events" : "API requests" }, T)) }),
        at === "events" && /* @__PURE__ */ s.jsx("div", { className: "ahv-segment", role: "group", "aria-label": "Show", children: ch.map((T) => /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            title: T.hint,
            "aria-pressed": vt === T.value,
            onClick: () => na({ view: T.value, draft: w }),
            children: T.label
          },
          T.value
        )) }),
        L.length > 1 && /* @__PURE__ */ s.jsx("div", { className: "ahv-chips", role: "group", "aria-label": "Presets", children: L.map((T, ut) => /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: "ahv-chip",
            "aria-pressed": F === ut,
            onClick: () => na({ preset: ut, draft: w }),
            children: T.label
          },
          T.label
        )) })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "ahv-searchbar", children: [
        /* @__PURE__ */ s.jsx(
          X0,
          {
            value: W.q,
            inputRef: X,
            onChange: (T) => Ot({ ...W, q: T }),
            onSubmit: () => !Be && na({ draft: W }),
            suggestions: (T) => d0(T, at, Ja.data, Ai),
            placeholder: at === "events" ? "Search: words, or actor:… action:trade.* -result:success on:account:100234" : "Search: words, or actor:… method:POST status:4xx route:/trading/*"
          }
        ),
        /* @__PURE__ */ s.jsx(
          "select",
          {
            className: "ahv-input ahv-range",
            value: W.range,
            "aria-label": "When",
            onChange: (T) => Ot({ ...W, range: T.target.value }),
            children: Ps.map((T) => /* @__PURE__ */ s.jsx("option", { value: T.value, children: T.label }, T.value))
          }
        ),
        W.range === "custom" && /* @__PURE__ */ s.jsxs("span", { className: "ahv-pair", children: [
          /* @__PURE__ */ s.jsx(
            "input",
            {
              type: "date",
              className: "ahv-input",
              value: W.from,
              "aria-label": "From (UTC)",
              "aria-invalid": Be || void 0,
              onChange: (T) => Ot({ ...W, from: T.target.value })
            }
          ),
          /* @__PURE__ */ s.jsx(
            "input",
            {
              type: "date",
              className: "ahv-input",
              value: W.to,
              "aria-label": "To (UTC)",
              "aria-invalid": Be || void 0,
              onChange: (T) => Ot({ ...W, to: T.target.value })
            }
          )
        ] }),
        /* @__PURE__ */ s.jsx("button", { type: "button", className: "ahv-button ahv-button-main", disabled: Be, onClick: () => na({ draft: W }), children: "Search" })
      ] }),
      Be && /* @__PURE__ */ s.jsx("em", { className: "ahv-bad ahv-small", children: "The end date is before the start date" }),
      /* @__PURE__ */ s.jsxs("div", { className: "ahv-bar ahv-add", children: [
        /* @__PURE__ */ s.jsx("span", { className: "ahv-dim ahv-small", children: "Add" }),
        er(at).filter((T) => !(E && (T.field === "on" || at === "requests" && T.field === "actor"))).slice(0, 8).map((T) => /* @__PURE__ */ s.jsx("button", { type: "button", className: "ahv-link-button", title: T.hint, onClick: () => iu(T.field), children: T.label }, T.field)),
        zi && /* @__PURE__ */ s.jsx("span", { className: "ahv-warn ahv-small ahv-push-right", children: "Not searched yet: press Enter or Search" })
      ] }),
      (In(w.q).length > 0 || w.range !== Pn(E)) && /* @__PURE__ */ s.jsxs("div", { className: "ahv-applied", children: [
        In(w.q).map((T) => /* @__PURE__ */ s.jsxs("span", { className: Mt("ahv-pill", T.negated && "ahv-pill-not"), children: [
          /* @__PURE__ */ s.jsxs("span", { className: "ahv-dim", children: [
            T.negated ? "Not " : "",
            T.field ? `${o0(T.field)}:` : "Text:"
          ] }),
          " ",
          il(T),
          /* @__PURE__ */ s.jsx("button", { type: "button", "aria-label": `Remove ${T.text}`, onClick: () => na({ draft: { ...w, q: s0(w.q, T) } }), children: /* @__PURE__ */ s.jsx(xt, { name: "close", size: 12 }) })
        ] }, T.text)),
        w.range !== Pn(E) && /* @__PURE__ */ s.jsxs("span", { className: "ahv-pill", children: [
          /* @__PURE__ */ s.jsx("span", { className: "ahv-dim", children: "When:" }),
          " ",
          w.range === "custom" ? [w.from && el(Da(Ks(w.from))), w.to && el(Da(Ks(w.to)))].filter(Boolean).join(" – ") || "Any date" : (fu = Ps.find((T) => T.value === w.range)) == null ? void 0 : fu.label,
          /* @__PURE__ */ s.jsx(
            "button",
            {
              type: "button",
              "aria-label": "Remove the time range",
              onClick: () => na({ draft: { ...w, range: Pn(E), from: "", to: "" } }),
              children: /* @__PURE__ */ s.jsx(xt, { name: "close", size: 12 })
            }
          )
        ] }),
        /* @__PURE__ */ s.jsx("button", { type: "button", className: "ahv-link-button", onClick: () => na({ preset: 0, draft: fh(new URLSearchParams(), E) }), children: "Clear all" })
      ] })
    ] }),
    pt || Ya.error && !Ya.data ? null : /* @__PURE__ */ s.jsx(y0, { chart: Ya.data, noun: he, loading: Ya.loading }),
    h && /* @__PURE__ */ s.jsx($l, { action: /* @__PURE__ */ s.jsx("button", { type: "button", className: "ahv-icon-button", "aria-label": "Dismiss", onClick: () => D(null), children: /* @__PURE__ */ s.jsx(xt, { name: "close", size: 14 }) }), children: h }),
    V.error && ua.length > 0 && /* @__PURE__ */ s.jsxs($l, { tone: "bad", action: /* @__PURE__ */ s.jsx("button", { type: "button", className: "ahv-button", onClick: V.refresh, children: "Retry" }), children: [
      "Couldn't load newer activity: ",
      V.error.message
    ] }),
    V.error && !ua.length ? /* @__PURE__ */ s.jsx($l, { tone: "bad", action: /* @__PURE__ */ s.jsx("button", { type: "button", className: "ahv-button", onClick: V.refresh, children: "Retry" }), children: V.error.message }) : V.loading ? /* @__PURE__ */ s.jsx(nr, {}) : ua.length ? /* @__PURE__ */ s.jsxs("div", { className: "ahv-table-wrap", ref: ta, children: [
      /* @__PURE__ */ s.jsxs("table", { className: "ahv-table", children: [
        /* @__PURE__ */ s.jsx("thead", { children: /* @__PURE__ */ s.jsxs("tr", { children: [
          /* @__PURE__ */ s.jsx("th", { children: "When (UTC)" }),
          /* @__PURE__ */ s.jsx("th", { children: "Who" }),
          /* @__PURE__ */ s.jsx("th", { children: at === "events" ? "What happened" : "Request" }),
          nt.map((T) => /* @__PURE__ */ s.jsx("th", { children: T.label }, T.key))
        ] }) }),
        /* @__PURE__ */ s.jsx("tbody", { children: ua.map((T, ut) => {
          var gt;
          return /* @__PURE__ */ s.jsxs(G.Fragment, { children: [
            T.occurred_at.slice(0, 10) !== ((gt = ua[ut - 1]) == null ? void 0 : gt.occurred_at.slice(0, 10)) && /* @__PURE__ */ s.jsx("tr", { className: "ahv-day", children: /* @__PURE__ */ s.jsx("td", { colSpan: ru, children: Wm(T.occurred_at) }) }),
            /* @__PURE__ */ s.jsxs(
              "tr",
              {
                tabIndex: 0,
                className: Mt("ahv-row", de(T) && T.outcome !== "success" && "ahv-row-problem"),
                onClick: () => wt(T),
                onKeyDown: (it) => {
                  it.target === it.currentTarget && (it.key === "Enter" || it.key === " ") && (it.preventDefault(), wt(T));
                },
                children: [
                  /* @__PURE__ */ s.jsx("td", { children: /* @__PURE__ */ s.jsx(x0, { value: T.occurred_at, seal: nl(T) }) }),
                  /* @__PURE__ */ s.jsx("td", { children: /* @__PURE__ */ s.jsx(
                    T0,
                    {
                      row: T,
                      actorTypes: ve,
                      onFocus: E && at === "requests" ? void 0 : () => uu({ actor_id: T.actor_id })
                    }
                  ) }),
                  /* @__PURE__ */ s.jsx("td", { children: de(T) ? /* @__PURE__ */ s.jsx(N0, { row: T }) : /* @__PURE__ */ s.jsx(bh, { row: T }) }),
                  nt.map((it) => /* @__PURE__ */ s.jsx("td", { className: "ahv-cell", children: it.key === "where" ? /* @__PURE__ */ s.jsx(E0, { row: T }) : it.key === "service" ? /* @__PURE__ */ s.jsx("span", { className: "ahv-dim", children: oa(T.service) }) : it.key === "ip" ? /* @__PURE__ */ s.jsx("span", { className: "ahv-mono ahv-dim", children: T.ip || "—" }) : de(T) ? it.key === "result" ? T.outcome === "success" ? /* @__PURE__ */ s.jsx("span", { className: "ahv-dim", children: "success" }) : /* @__PURE__ */ s.jsx(Fl, { outcome: T.outcome }) : T.target_type ? /* @__PURE__ */ s.jsxs("span", { children: [
                    La[T.target_type] ?? oa(T.target_type),
                    " ",
                    /* @__PURE__ */ s.jsx("span", { className: "ahv-mono", children: T.target_name || T.target_id })
                  ] }) : "—" : null }, it.key))
                ]
              }
            )
          ] }, T.id);
        }) })
      ] }),
      /* @__PURE__ */ s.jsx("div", { ref: $a, "aria-hidden": "true" })
    ] }) : /* @__PURE__ */ s.jsxs("div", { className: "ahv-empty", children: [
      /* @__PURE__ */ s.jsx(xt, { name: "log", size: 28 }),
      /* @__PURE__ */ s.jsxs("strong", { children: [
        "No ",
        he,
        " match"
      ] }),
      /* @__PURE__ */ s.jsx("span", { className: "ahv-dim", children: at === "events" && vt === "important" ? "Try All, or a wider time range." : "Try a wider time range or fewer filters." })
    ] }),
    ua.length > 0 && /* @__PURE__ */ s.jsxs("footer", { className: "ahv-foot", children: [
      /* @__PURE__ */ s.jsxs("span", { className: "ahv-dim ahv-num", children: [
        t0(ua.length, he.slice(0, -1)),
        " shown",
        Tt ? " · Live keeps the newest page" : V.trimmed ? " · the newest were let go to keep the list light; Refresh brings them back" : V.hasMore ? "" : " · that is all of them"
      ] }),
      Ga.error && /* @__PURE__ */ s.jsxs("span", { className: "ahv-bad ahv-small", children: [
        "Couldn't load more: ",
        Ga.error.message
      ] }),
      V.hasMore && /* @__PURE__ */ s.jsx("button", { type: "button", className: "ahv-button", onClick: Wt, disabled: Ga.loading, children: Ga.loading ? "Loading…" : "Load more" })
    ] }),
    /* @__PURE__ */ s.jsx(
      jh,
      {
        request: c,
        row: Ra,
        onClose: () => wt(null),
        onFocus: E ? void 0 : uu,
        actorTypes: ve,
        entities: (tn = Ja.data) == null ? void 0 : tn.entities,
        seal: Ra ? nl(Ra) : null
      }
    )
  ] });
}
const oh = 500;
function P0({ request: c, entity: o, view: m = "all", action: f, newestFirst: b = !1, header: E, more: M, simple: q = !1, className: _ }) {
  var at, vt, L, F;
  const j = o.type && o.id ? `${o.type}:${o.id}:${m}:${f ?? ""}` : null, R = Ha(j, () => c("search", {
    method: "POST",
    body: { kind: "events", filters: {}, related_type: o.type, related_id: o.id, view: m, action: f, limit: oh, details: !0 }
  })), H = Ha("catalog", () => c("catalog", { method: "GET" })), [U, C] = G.useState(null), Q = ((at = R.data) == null ? void 0 : at.items) ?? [], k = b ? Q : [...Q].reverse(), et = !!((vt = R.data) != null && vt.next_cursor);
  return /* @__PURE__ */ s.jsxs("div", { className: Mt("ahv ahv-timeline", q && "ahv-timeline-simple", _), children: [
    R.error ? /* @__PURE__ */ s.jsxs($l, { tone: "bad", action: /* @__PURE__ */ s.jsx("button", { type: "button", className: "ahv-button", onClick: R.refresh, children: "Retry" }), children: [
      "Couldn't load: ",
      R.error.message
    ] }) : R.loading && !R.data ? /* @__PURE__ */ s.jsx(nr, { rows: 4 }) : k.length ? /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
      E == null ? void 0 : E(Q.length ? [...Q].reverse() : [], et),
      et && /* @__PURE__ */ s.jsxs("p", { className: "ahv-dim ahv-small", children: [
        "Showing the newest ",
        oh,
        " steps.",
        M && /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
          " ",
          M
        ] })
      ] }),
      !q && /* @__PURE__ */ s.jsxs("h3", { className: "ahv-eyebrow", children: [
        k.length,
        " step",
        k.length === 1 ? "" : "s",
        ", ",
        b ? "newest" : "oldest",
        " first"
      ] }),
      /* @__PURE__ */ s.jsx("ol", { className: "ahv-steps", children: k.map((J) => q ? /* @__PURE__ */ s.jsx(ap, { event: J }, J.id) : /* @__PURE__ */ s.jsx(tp, { event: J, onOpen: C }, J.id)) })
    ] }) : /* @__PURE__ */ s.jsx("p", { className: "ahv-dim", children: "Nothing has been recorded about this yet." }),
    /* @__PURE__ */ s.jsx(
      jh,
      {
        request: c,
        row: U,
        onClose: () => C(null),
        actorTypes: (L = H.data) == null ? void 0 : L.actor_types,
        entities: (F = H.data) == null ? void 0 : F.entities
      }
    )
  ] });
}
function tp({ event: c, onOpen: o }) {
  var R, H, U, C, Q;
  const [m, f] = G.useState(!1), { icon: b, tone: E } = lr(c), M = c.children ?? [], q = c.children_count ?? M.length, _ = c.category !== "data" && ((R = c.change_list) != null && R.length) ? c.change_list : null, j = !!((H = c.details) != null && H.length) || q > 0;
  return /* @__PURE__ */ s.jsxs("li", { className: `ahv-step ahv-tone-${E}`, children: [
    /* @__PURE__ */ s.jsx("span", { className: "ahv-step-icon", "aria-hidden": "true", children: /* @__PURE__ */ s.jsx(xt, { name: b, size: 14 }) }),
    /* @__PURE__ */ s.jsxs("div", { className: "ahv-step-main", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "ahv-step-head", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "ahv-stack", children: [
          /* @__PURE__ */ s.jsxs("button", { type: "button", className: "ahv-step-title", onClick: () => o(c), title: "Open the full detail", children: [
            c.title,
            /* @__PURE__ */ s.jsx(Fl, { outcome: c.outcome })
          ] }),
          /* @__PURE__ */ s.jsx(_h, { event: c })
        ] }),
        /* @__PURE__ */ s.jsxs("span", { className: "ahv-step-when", title: `${c.occurred_at} UTC`, children: [
          /* @__PURE__ */ s.jsx("span", { className: "ahv-mono", children: au(c.occurred_at) }),
          /* @__PURE__ */ s.jsx("span", { className: "ahv-dim", children: ar(c.occurred_at) || el(Da(c.occurred_at)) })
        ] })
      ] }),
      c.outcome !== "success" ? /* @__PURE__ */ s.jsx("p", { className: "ahv-step-problem", children: c.summary }) : (U = c.facts) != null && U.length ? /* @__PURE__ */ s.jsx(xh, { facts: c.facts }) : !_ && c.summary !== c.title ? /* @__PURE__ */ s.jsx("p", { className: "ahv-sentence", children: c.summary }) : null,
      _ && /* @__PURE__ */ s.jsx(ir, { changes: _, valueLabel: "Set to" }),
      j && /* @__PURE__ */ s.jsxs("button", { type: "button", className: "ahv-disclose", "aria-expanded": m, onClick: () => f((k) => !k), children: [
        /* @__PURE__ */ s.jsx(xt, { name: "chevronDown", size: 13, className: Mt(m && "ahv-turned") }),
        m ? "Hide" : [((C = c.details) == null ? void 0 : C.length) && "Details", q > 0 && `${q} record change${q === 1 ? "" : "s"}`].filter(Boolean).join(" and ")
      ] }),
      m && /* @__PURE__ */ s.jsxs("div", { className: "ahv-step-more", children: [
        (Q = c.details) != null && Q.length ? /* @__PURE__ */ s.jsx(ur, { items: c.details.map((k) => [k.label, k.value]), mono: !0 }) : null,
        q > 0 && /* @__PURE__ */ s.jsx(ep, { records: M, counted: q, onOpen: o, parent: c })
      ] })
    ] })
  ] });
}
function ap({ event: c }) {
  const { icon: o, tone: m } = lr(c);
  return /* @__PURE__ */ s.jsxs("li", { className: `ahv-step ahv-tone-${m}`, children: [
    /* @__PURE__ */ s.jsx("span", { className: "ahv-step-icon", "aria-hidden": "true", children: /* @__PURE__ */ s.jsx(xt, { name: o, size: 16 }) }),
    /* @__PURE__ */ s.jsx("div", { className: "ahv-step-main", children: /* @__PURE__ */ s.jsxs("div", { className: "ahv-step-head", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "ahv-stack", children: [
        /* @__PURE__ */ s.jsxs("span", { className: "ahv-step-title", children: [
          c.title,
          /* @__PURE__ */ s.jsx(Fl, { outcome: c.outcome })
        ] }),
        c.summary !== c.title && /* @__PURE__ */ s.jsx("p", { className: "ahv-sentence", children: c.summary }),
        /* @__PURE__ */ s.jsx(_h, { event: c, simple: !0 })
      ] }),
      /* @__PURE__ */ s.jsxs("span", { className: "ahv-step-when", title: `${c.occurred_at} UTC`, children: [
        /* @__PURE__ */ s.jsx("span", { className: "ahv-mono", children: au(c.occurred_at) }),
        /* @__PURE__ */ s.jsx("span", { className: "ahv-dim", children: ar(c.occurred_at) || el(Da(c.occurred_at)) })
      ] })
    ] }) })
  ] });
}
function _h({ event: c, simple: o = !1 }) {
  return /* @__PURE__ */ s.jsxs("span", { className: "ahv-byline", children: [
    /* @__PURE__ */ s.jsx("span", { className: Mt("ahv-avatar ahv-avatar-small", c.actor_type === "system" && "ahv-avatar-system"), "aria-hidden": "true", children: vh(c.actor) }),
    [
      c.actor,
      !o && c.actor_label,
      c.origin && oa(c.origin).toUpperCase(),
      c.actor_type !== "system" && c.device,
      c.country,
      c.ip
    ].filter(Boolean).map((m, f) => /* @__PURE__ */ s.jsx("span", { className: Mt(f === 0 ? "ahv-strong" : "ahv-sep"), children: m }, f))
  ] });
}
function ep({ records: c, counted: o, onOpen: m, parent: f }) {
  const [b, E] = G.useState(null);
  return /* @__PURE__ */ s.jsxs("div", { className: "ahv-records", children: [
    /* @__PURE__ */ s.jsxs("table", { className: "ahv-changes ahv-records-table", children: [
      /* @__PURE__ */ s.jsx("thead", { children: /* @__PURE__ */ s.jsxs("tr", { children: [
        /* @__PURE__ */ s.jsx("th", { children: "Record" }),
        /* @__PURE__ */ s.jsx("th", { children: "Change" }),
        /* @__PURE__ */ s.jsx("th", { children: "Fields" }),
        /* @__PURE__ */ s.jsx("th", { children: /* @__PURE__ */ s.jsx("span", { className: "ahv-hidden", children: "Detail" }) })
      ] }) }),
      /* @__PURE__ */ s.jsx("tbody", { children: c.map((M) => {
        const q = M.change_list ?? [], _ = b === M.id;
        return /* @__PURE__ */ s.jsx(
          lp,
          {
            record: M,
            fields: q.length,
            open: _,
            onToggle: () => E(_ ? null : M.id),
            onOpen: () => m(M),
            children: _ && /* @__PURE__ */ s.jsx("tr", { className: "ahv-records-fields", children: /* @__PURE__ */ s.jsx("td", { colSpan: 4, children: /* @__PURE__ */ s.jsx(ir, { changes: q }) }) })
          },
          M.id
        );
      }) })
    ] }),
    o > c.length && /* @__PURE__ */ s.jsxs("button", { type: "button", className: "ahv-link-button", onClick: () => m(f), children: [
      o - c.length,
      " more in the full detail"
    ] })
  ] });
}
function lp({ record: c, fields: o, open: m, onToggle: f, onOpen: b, children: E }) {
  const M = c.action === "data.created" ? "Created" : c.action === "data.deleted" ? "Deleted" : "Updated";
  return /* @__PURE__ */ s.jsxs(s.Fragment, { children: [
    /* @__PURE__ */ s.jsxs("tr", { children: [
      /* @__PURE__ */ s.jsx("td", { children: /* @__PURE__ */ s.jsxs("button", { type: "button", className: "ahv-disclose", "aria-expanded": m, disabled: !o, onClick: f, children: [
        /* @__PURE__ */ s.jsx(xt, { name: "chevronRight", size: 12, className: Mt(m && "ahv-turned-right") }),
        c.summary.replace(/^(Created|Updated|Deleted) /, "").split(":")[0]
      ] }) }),
      /* @__PURE__ */ s.jsx("td", { children: M }),
      /* @__PURE__ */ s.jsx("td", { className: "ahv-dim", children: c.action === "data.updated" ? (c.change_list ?? []).slice(0, 3).map((q) => q.label).join(", ") + (o > 3 ? ` and ${o - 3} more` : "") : `${o} value${o === 1 ? "" : "s"}` }),
      /* @__PURE__ */ s.jsx("td", { className: "ahv-cell-end", children: /* @__PURE__ */ s.jsx(
        "button",
        {
          type: "button",
          className: "ahv-icon-button",
          title: "Open the record's full detail",
          "aria-label": "Open the record's full detail",
          onClick: b,
          children: /* @__PURE__ */ s.jsx(xt, { name: "arrowRight", size: 13 })
        }
      ) })
    ] }),
    E
  ] });
}
const sr = class sr extends HTMLElement {
  get request() {
    return this.requester;
  }
  set request(o) {
    this.requester = o, this.render();
  }
  connectedCallback() {
    if (!this.root) {
      const o = this.shadowRoot ?? this.attachShadow({ mode: "open" }), m = document.createElement("style");
      m.textContent = Zm;
      const f = document.createElement("div");
      this.panel = document.createElement("div"), o.replaceChildren(m, f, this.panel), this.root = km.createRoot(f);
      const b = document.documentElement, E = () => {
        var q;
        const M = b.classList.contains("dark") || b.dataset.theme === "dark";
        f.classList.toggle("ahv-dark-host", M), (q = this.panel) == null || q.classList.toggle("ahv-dark-host", M);
      };
      E(), this.theme = new MutationObserver(E), this.theme.observe(b, { attributes: !0, attributeFilter: ["class", "data-theme"] });
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
    !this.root || !this.requester || this.root.render(/* @__PURE__ */ s.jsx(Sh.Provider, { value: this.panel ?? null, children: this.view(this.requester) }));
  }
};
sr.observedAttributes = [
  "entity-type",
  "entity-id",
  "entity-label",
  "title",
  "kinds",
  "can-export",
  "action",
  "newest-first",
  "view",
  "no-status",
  "simple"
];
let Ei = sr;
class np extends Ei {
  view(o) {
    const m = this.getAttribute("entity-type"), f = this.getAttribute("entity-id"), b = (this.getAttribute("kinds") || "events,requests").split(",").map((E) => E.trim());
    return /* @__PURE__ */ s.jsx(
      I0,
      {
        request: o,
        title: this.getAttribute("title") || void 0,
        kinds: b,
        canExport: this.hasAttribute("can-export"),
        showStatus: !this.hasAttribute("no-status"),
        entity: m && f ? { type: m, id: f, label: this.getAttribute("entity-label") || `${m} ${f}` } : void 0
      }
    );
  }
}
class up extends Ei {
  view(o) {
    return /* @__PURE__ */ s.jsx(
      P0,
      {
        request: o,
        entity: { type: this.getAttribute("entity-type") || "", id: this.getAttribute("entity-id") || "" },
        action: this.getAttribute("action") || void 0,
        newestFirst: this.hasAttribute("newest-first"),
        view: this.getAttribute("view") === "important" ? "important" : "all",
        simple: this.hasAttribute("simple")
      }
    );
  }
}
customElements.get("activity-log") || customElements.define("activity-log", np);
customElements.get("activity-timeline") || customElements.define("activity-timeline", up);
