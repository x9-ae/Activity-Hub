var Hs = { exports: {} }, $n = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Jd;
function Gm() {
  if (Jd) return $n;
  Jd = 1;
  var c = Symbol.for("react.transitional.element"), o = Symbol.for("react.fragment");
  function h(f, p, T) {
    var D = null;
    if (T !== void 0 && (D = "" + T), p.key !== void 0 && (D = "" + p.key), "key" in p) {
      T = {};
      for (var q in p)
        q !== "key" && (T[q] = p[q]);
    } else T = p;
    return p = T.ref, {
      $$typeof: c,
      type: f,
      key: D,
      ref: p !== void 0 ? p : null,
      props: T
    };
  }
  return $n.Fragment = o, $n.jsx = h, $n.jsxs = h, $n;
}
var $d;
function Lm() {
  return $d || ($d = 1, Hs.exports = Gm()), Hs.exports;
}
var u = Lm(), Bs = { exports: {} }, Wn = {}, ks = { exports: {} }, Ys = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Wd;
function Xm() {
  return Wd || (Wd = 1, (function(c) {
    function o(_, G) {
      var et = _.length;
      _.push(G);
      t: for (; 0 < et; ) {
        var gt = et - 1 >>> 1, v = _[gt];
        if (0 < p(v, G))
          _[gt] = G, _[et] = v, et = gt;
        else break t;
      }
    }
    function h(_) {
      return _.length === 0 ? null : _[0];
    }
    function f(_) {
      if (_.length === 0) return null;
      var G = _[0], et = _.pop();
      if (et !== G) {
        _[0] = et;
        t: for (var gt = 0, v = _.length, R = v >>> 1; gt < R; ) {
          var Q = 2 * (gt + 1) - 1, L = _[Q], J = Q + 1, ft = _[J];
          if (0 > p(L, et))
            J < v && 0 > p(ft, L) ? (_[gt] = ft, _[J] = et, gt = J) : (_[gt] = L, _[Q] = et, gt = Q);
          else if (J < v && 0 > p(ft, et))
            _[gt] = ft, _[J] = et, gt = J;
          else break t;
        }
      }
      return G;
    }
    function p(_, G) {
      var et = _.sortIndex - G.sortIndex;
      return et !== 0 ? et : _.id - G.id;
    }
    if (c.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var T = performance;
      c.unstable_now = function() {
        return T.now();
      };
    } else {
      var D = Date, q = D.now();
      c.unstable_now = function() {
        return D.now() - q;
      };
    }
    var E = [], b = [], U = 1, Y = null, w = 3, B = !1, Z = !1, k = !1, I = !1, tt = typeof setTimeout == "function" ? setTimeout : null, O = typeof clearTimeout == "function" ? clearTimeout : null, H = typeof setImmediate < "u" ? setImmediate : null;
    function W(_) {
      for (var G = h(b); G !== null; ) {
        if (G.callback === null) f(b);
        else if (G.startTime <= _)
          f(b), G.sortIndex = G.expirationTime, o(E, G);
        else break;
        G = h(b);
      }
    }
    function F(_) {
      if (k = !1, W(_), !Z)
        if (h(E) !== null)
          Z = !0, ut || (ut = !0, Nt());
        else {
          var G = h(b);
          G !== null && Ct(F, G.startTime - _);
        }
    }
    var ut = !1, C = -1, P = 5, Rt = -1;
    function Be() {
      return I ? !0 : !(c.unstable_now() - Rt < P);
    }
    function ae() {
      if (I = !1, ut) {
        var _ = c.unstable_now();
        Rt = _;
        var G = !0;
        try {
          t: {
            Z = !1, k && (k = !1, O(C), C = -1), B = !0;
            var et = w;
            try {
              e: {
                for (W(_), Y = h(E); Y !== null && !(Y.expirationTime > _ && Be()); ) {
                  var gt = Y.callback;
                  if (typeof gt == "function") {
                    Y.callback = null, w = Y.priorityLevel;
                    var v = gt(
                      Y.expirationTime <= _
                    );
                    if (_ = c.unstable_now(), typeof v == "function") {
                      Y.callback = v, W(_), G = !0;
                      break e;
                    }
                    Y === h(E) && f(E), W(_);
                  } else f(E);
                  Y = h(E);
                }
                if (Y !== null) G = !0;
                else {
                  var R = h(b);
                  R !== null && Ct(
                    F,
                    R.startTime - _
                  ), G = !1;
                }
              }
              break t;
            } finally {
              Y = null, w = et, B = !1;
            }
            G = void 0;
          }
        } finally {
          G ? Nt() : ut = !1;
        }
      }
    }
    var Nt;
    if (typeof H == "function")
      Nt = function() {
        H(ae);
      };
    else if (typeof MessageChannel < "u") {
      var be = new MessageChannel(), De = be.port2;
      be.port1.onmessage = ae, Nt = function() {
        De.postMessage(null);
      };
    } else
      Nt = function() {
        tt(ae, 0);
      };
    function Ct(_, G) {
      C = tt(function() {
        _(c.unstable_now());
      }, G);
    }
    c.unstable_IdlePriority = 5, c.unstable_ImmediatePriority = 1, c.unstable_LowPriority = 4, c.unstable_NormalPriority = 3, c.unstable_Profiling = null, c.unstable_UserBlockingPriority = 2, c.unstable_cancelCallback = function(_) {
      _.callback = null;
    }, c.unstable_forceFrameRate = function(_) {
      0 > _ || 125 < _ ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : P = 0 < _ ? Math.floor(1e3 / _) : 5;
    }, c.unstable_getCurrentPriorityLevel = function() {
      return w;
    }, c.unstable_next = function(_) {
      switch (w) {
        case 1:
        case 2:
        case 3:
          var G = 3;
          break;
        default:
          G = w;
      }
      var et = w;
      w = G;
      try {
        return _();
      } finally {
        w = et;
      }
    }, c.unstable_requestPaint = function() {
      I = !0;
    }, c.unstable_runWithPriority = function(_, G) {
      switch (_) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          _ = 3;
      }
      var et = w;
      w = _;
      try {
        return G();
      } finally {
        w = et;
      }
    }, c.unstable_scheduleCallback = function(_, G, et) {
      var gt = c.unstable_now();
      switch (typeof et == "object" && et !== null ? (et = et.delay, et = typeof et == "number" && 0 < et ? gt + et : gt) : et = gt, _) {
        case 1:
          var v = -1;
          break;
        case 2:
          v = 250;
          break;
        case 5:
          v = 1073741823;
          break;
        case 4:
          v = 1e4;
          break;
        default:
          v = 5e3;
      }
      return v = et + v, _ = {
        id: U++,
        callback: G,
        priorityLevel: _,
        startTime: et,
        expirationTime: v,
        sortIndex: -1
      }, et > gt ? (_.sortIndex = et, o(b, _), h(E) === null && _ === h(b) && (k ? (O(C), C = -1) : k = !0, Ct(F, et - gt))) : (_.sortIndex = v, o(E, _), Z || B || (Z = !0, ut || (ut = !0, Nt()))), _;
    }, c.unstable_shouldYield = Be, c.unstable_wrapCallback = function(_) {
      var G = w;
      return function() {
        var et = w;
        w = G;
        try {
          return _.apply(this, arguments);
        } finally {
          w = et;
        }
      };
    };
  })(Ys)), Ys;
}
var Fd;
function Qm() {
  return Fd || (Fd = 1, ks.exports = Xm()), ks.exports;
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
var Pd;
function Zm() {
  if (Pd) return st;
  Pd = 1;
  var c = Symbol.for("react.transitional.element"), o = Symbol.for("react.portal"), h = Symbol.for("react.fragment"), f = Symbol.for("react.strict_mode"), p = Symbol.for("react.profiler"), T = Symbol.for("react.consumer"), D = Symbol.for("react.context"), q = Symbol.for("react.forward_ref"), E = Symbol.for("react.suspense"), b = Symbol.for("react.memo"), U = Symbol.for("react.lazy"), Y = Symbol.iterator;
  function w(v) {
    return v === null || typeof v != "object" ? null : (v = Y && v[Y] || v["@@iterator"], typeof v == "function" ? v : null);
  }
  var B = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, Z = Object.assign, k = {};
  function I(v, R, Q) {
    this.props = v, this.context = R, this.refs = k, this.updater = Q || B;
  }
  I.prototype.isReactComponent = {}, I.prototype.setState = function(v, R) {
    if (typeof v != "object" && typeof v != "function" && v != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, v, R, "setState");
  }, I.prototype.forceUpdate = function(v) {
    this.updater.enqueueForceUpdate(this, v, "forceUpdate");
  };
  function tt() {
  }
  tt.prototype = I.prototype;
  function O(v, R, Q) {
    this.props = v, this.context = R, this.refs = k, this.updater = Q || B;
  }
  var H = O.prototype = new tt();
  H.constructor = O, Z(H, I.prototype), H.isPureReactComponent = !0;
  var W = Array.isArray, F = { H: null, A: null, T: null, S: null, V: null }, ut = Object.prototype.hasOwnProperty;
  function C(v, R, Q, L, J, ft) {
    return Q = ft.ref, {
      $$typeof: c,
      type: v,
      key: R,
      ref: Q !== void 0 ? Q : null,
      props: ft
    };
  }
  function P(v, R) {
    return C(
      v.type,
      R,
      void 0,
      void 0,
      void 0,
      v.props
    );
  }
  function Rt(v) {
    return typeof v == "object" && v !== null && v.$$typeof === c;
  }
  function Be(v) {
    var R = { "=": "=0", ":": "=2" };
    return "$" + v.replace(/[=:]/g, function(Q) {
      return R[Q];
    });
  }
  var ae = /\/+/g;
  function Nt(v, R) {
    return typeof v == "object" && v !== null && v.key != null ? Be("" + v.key) : R.toString(36);
  }
  function be() {
  }
  function De(v) {
    switch (v.status) {
      case "fulfilled":
        return v.value;
      case "rejected":
        throw v.reason;
      default:
        switch (typeof v.status == "string" ? v.then(be, be) : (v.status = "pending", v.then(
          function(R) {
            v.status === "pending" && (v.status = "fulfilled", v.value = R);
          },
          function(R) {
            v.status === "pending" && (v.status = "rejected", v.reason = R);
          }
        )), v.status) {
          case "fulfilled":
            return v.value;
          case "rejected":
            throw v.reason;
        }
    }
    throw v;
  }
  function Ct(v, R, Q, L, J) {
    var ft = typeof v;
    (ft === "undefined" || ft === "boolean") && (v = null);
    var K = !1;
    if (v === null) K = !0;
    else
      switch (ft) {
        case "bigint":
        case "string":
        case "number":
          K = !0;
          break;
        case "object":
          switch (v.$$typeof) {
            case c:
            case o:
              K = !0;
              break;
            case U:
              return K = v._init, Ct(
                K(v._payload),
                R,
                Q,
                L,
                J
              );
          }
      }
    if (K)
      return J = J(v), K = L === "" ? "." + Nt(v, 0) : L, W(J) ? (Q = "", K != null && (Q = K.replace(ae, "$&/") + "/"), Ct(J, R, Q, "", function(ne) {
        return ne;
      })) : J != null && (Rt(J) && (J = P(
        J,
        Q + (J.key == null || v && v.key === J.key ? "" : ("" + J.key).replace(
          ae,
          "$&/"
        ) + "/") + K
      )), R.push(J)), 1;
    K = 0;
    var Jt = L === "" ? "." : L + ":";
    if (W(v))
      for (var yt = 0; yt < v.length; yt++)
        L = v[yt], ft = Jt + Nt(L, yt), K += Ct(
          L,
          R,
          Q,
          ft,
          J
        );
    else if (yt = w(v), typeof yt == "function")
      for (v = yt.call(v), yt = 0; !(L = v.next()).done; )
        L = L.value, ft = Jt + Nt(L, yt++), K += Ct(
          L,
          R,
          Q,
          ft,
          J
        );
    else if (ft === "object") {
      if (typeof v.then == "function")
        return Ct(
          De(v),
          R,
          Q,
          L,
          J
        );
      throw R = String(v), Error(
        "Objects are not valid as a React child (found: " + (R === "[object Object]" ? "object with keys {" + Object.keys(v).join(", ") + "}" : R) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return K;
  }
  function _(v, R, Q) {
    if (v == null) return v;
    var L = [], J = 0;
    return Ct(v, L, "", "", function(ft) {
      return R.call(Q, ft, J++);
    }), L;
  }
  function G(v) {
    if (v._status === -1) {
      var R = v._result;
      R = R(), R.then(
        function(Q) {
          (v._status === 0 || v._status === -1) && (v._status = 1, v._result = Q);
        },
        function(Q) {
          (v._status === 0 || v._status === -1) && (v._status = 2, v._result = Q);
        }
      ), v._status === -1 && (v._status = 0, v._result = R);
    }
    if (v._status === 1) return v._result.default;
    throw v._result;
  }
  var et = typeof reportError == "function" ? reportError : function(v) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var R = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof v == "object" && v !== null && typeof v.message == "string" ? String(v.message) : String(v),
        error: v
      });
      if (!window.dispatchEvent(R)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", v);
      return;
    }
    console.error(v);
  };
  function gt() {
  }
  return st.Children = {
    map: _,
    forEach: function(v, R, Q) {
      _(
        v,
        function() {
          R.apply(this, arguments);
        },
        Q
      );
    },
    count: function(v) {
      var R = 0;
      return _(v, function() {
        R++;
      }), R;
    },
    toArray: function(v) {
      return _(v, function(R) {
        return R;
      }) || [];
    },
    only: function(v) {
      if (!Rt(v))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return v;
    }
  }, st.Component = I, st.Fragment = h, st.Profiler = p, st.PureComponent = O, st.StrictMode = f, st.Suspense = E, st.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = F, st.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(v) {
      return F.H.useMemoCache(v);
    }
  }, st.cache = function(v) {
    return function() {
      return v.apply(null, arguments);
    };
  }, st.cloneElement = function(v, R, Q) {
    if (v == null)
      throw Error(
        "The argument must be a React element, but you passed " + v + "."
      );
    var L = Z({}, v.props), J = v.key, ft = void 0;
    if (R != null)
      for (K in R.ref !== void 0 && (ft = void 0), R.key !== void 0 && (J = "" + R.key), R)
        !ut.call(R, K) || K === "key" || K === "__self" || K === "__source" || K === "ref" && R.ref === void 0 || (L[K] = R[K]);
    var K = arguments.length - 2;
    if (K === 1) L.children = Q;
    else if (1 < K) {
      for (var Jt = Array(K), yt = 0; yt < K; yt++)
        Jt[yt] = arguments[yt + 2];
      L.children = Jt;
    }
    return C(v.type, J, void 0, void 0, ft, L);
  }, st.createContext = function(v) {
    return v = {
      $$typeof: D,
      _currentValue: v,
      _currentValue2: v,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, v.Provider = v, v.Consumer = {
      $$typeof: T,
      _context: v
    }, v;
  }, st.createElement = function(v, R, Q) {
    var L, J = {}, ft = null;
    if (R != null)
      for (L in R.key !== void 0 && (ft = "" + R.key), R)
        ut.call(R, L) && L !== "key" && L !== "__self" && L !== "__source" && (J[L] = R[L]);
    var K = arguments.length - 2;
    if (K === 1) J.children = Q;
    else if (1 < K) {
      for (var Jt = Array(K), yt = 0; yt < K; yt++)
        Jt[yt] = arguments[yt + 2];
      J.children = Jt;
    }
    if (v && v.defaultProps)
      for (L in K = v.defaultProps, K)
        J[L] === void 0 && (J[L] = K[L]);
    return C(v, ft, void 0, void 0, null, J);
  }, st.createRef = function() {
    return { current: null };
  }, st.forwardRef = function(v) {
    return { $$typeof: q, render: v };
  }, st.isValidElement = Rt, st.lazy = function(v) {
    return {
      $$typeof: U,
      _payload: { _status: -1, _result: v },
      _init: G
    };
  }, st.memo = function(v, R) {
    return {
      $$typeof: b,
      type: v,
      compare: R === void 0 ? null : R
    };
  }, st.startTransition = function(v) {
    var R = F.T, Q = {};
    F.T = Q;
    try {
      var L = v(), J = F.S;
      J !== null && J(Q, L), typeof L == "object" && L !== null && typeof L.then == "function" && L.then(gt, et);
    } catch (ft) {
      et(ft);
    } finally {
      F.T = R;
    }
  }, st.unstable_useCacheRefresh = function() {
    return F.H.useCacheRefresh();
  }, st.use = function(v) {
    return F.H.use(v);
  }, st.useActionState = function(v, R, Q) {
    return F.H.useActionState(v, R, Q);
  }, st.useCallback = function(v, R) {
    return F.H.useCallback(v, R);
  }, st.useContext = function(v) {
    return F.H.useContext(v);
  }, st.useDebugValue = function() {
  }, st.useDeferredValue = function(v, R) {
    return F.H.useDeferredValue(v, R);
  }, st.useEffect = function(v, R, Q) {
    var L = F.H;
    if (typeof Q == "function")
      throw Error(
        "useEffect CRUD overload is not enabled in this build of React."
      );
    return L.useEffect(v, R);
  }, st.useId = function() {
    return F.H.useId();
  }, st.useImperativeHandle = function(v, R, Q) {
    return F.H.useImperativeHandle(v, R, Q);
  }, st.useInsertionEffect = function(v, R) {
    return F.H.useInsertionEffect(v, R);
  }, st.useLayoutEffect = function(v, R) {
    return F.H.useLayoutEffect(v, R);
  }, st.useMemo = function(v, R) {
    return F.H.useMemo(v, R);
  }, st.useOptimistic = function(v, R) {
    return F.H.useOptimistic(v, R);
  }, st.useReducer = function(v, R, Q) {
    return F.H.useReducer(v, R, Q);
  }, st.useRef = function(v) {
    return F.H.useRef(v);
  }, st.useState = function(v) {
    return F.H.useState(v);
  }, st.useSyncExternalStore = function(v, R, Q) {
    return F.H.useSyncExternalStore(
      v,
      R,
      Q
    );
  }, st.useTransition = function() {
    return F.H.useTransition();
  }, st.version = "19.1.0", st;
}
var Id;
function er() {
  return Id || (Id = 1, Gs.exports = Zm()), Gs.exports;
}
var Ls = { exports: {} }, ee = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var th;
function Vm() {
  if (th) return ee;
  th = 1;
  var c = er();
  function o(E) {
    var b = "https://react.dev/errors/" + E;
    if (1 < arguments.length) {
      b += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var U = 2; U < arguments.length; U++)
        b += "&args[]=" + encodeURIComponent(arguments[U]);
    }
    return "Minified React error #" + E + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function h() {
  }
  var f = {
    d: {
      f: h,
      r: function() {
        throw Error(o(522));
      },
      D: h,
      C: h,
      L: h,
      m: h,
      X: h,
      S: h,
      M: h
    },
    p: 0,
    findDOMNode: null
  }, p = Symbol.for("react.portal");
  function T(E, b, U) {
    var Y = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: p,
      key: Y == null ? null : "" + Y,
      children: E,
      containerInfo: b,
      implementation: U
    };
  }
  var D = c.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function q(E, b) {
    if (E === "font") return "";
    if (typeof b == "string")
      return b === "use-credentials" ? b : "";
  }
  return ee.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = f, ee.createPortal = function(E, b) {
    var U = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!b || b.nodeType !== 1 && b.nodeType !== 9 && b.nodeType !== 11)
      throw Error(o(299));
    return T(E, b, null, U);
  }, ee.flushSync = function(E) {
    var b = D.T, U = f.p;
    try {
      if (D.T = null, f.p = 2, E) return E();
    } finally {
      D.T = b, f.p = U, f.d.f();
    }
  }, ee.preconnect = function(E, b) {
    typeof E == "string" && (b ? (b = b.crossOrigin, b = typeof b == "string" ? b === "use-credentials" ? b : "" : void 0) : b = null, f.d.C(E, b));
  }, ee.prefetchDNS = function(E) {
    typeof E == "string" && f.d.D(E);
  }, ee.preinit = function(E, b) {
    if (typeof E == "string" && b && typeof b.as == "string") {
      var U = b.as, Y = q(U, b.crossOrigin), w = typeof b.integrity == "string" ? b.integrity : void 0, B = typeof b.fetchPriority == "string" ? b.fetchPriority : void 0;
      U === "style" ? f.d.S(
        E,
        typeof b.precedence == "string" ? b.precedence : void 0,
        {
          crossOrigin: Y,
          integrity: w,
          fetchPriority: B
        }
      ) : U === "script" && f.d.X(E, {
        crossOrigin: Y,
        integrity: w,
        fetchPriority: B,
        nonce: typeof b.nonce == "string" ? b.nonce : void 0
      });
    }
  }, ee.preinitModule = function(E, b) {
    if (typeof E == "string")
      if (typeof b == "object" && b !== null) {
        if (b.as == null || b.as === "script") {
          var U = q(
            b.as,
            b.crossOrigin
          );
          f.d.M(E, {
            crossOrigin: U,
            integrity: typeof b.integrity == "string" ? b.integrity : void 0,
            nonce: typeof b.nonce == "string" ? b.nonce : void 0
          });
        }
      } else b == null && f.d.M(E);
  }, ee.preload = function(E, b) {
    if (typeof E == "string" && typeof b == "object" && b !== null && typeof b.as == "string") {
      var U = b.as, Y = q(U, b.crossOrigin);
      f.d.L(E, U, {
        crossOrigin: Y,
        integrity: typeof b.integrity == "string" ? b.integrity : void 0,
        nonce: typeof b.nonce == "string" ? b.nonce : void 0,
        type: typeof b.type == "string" ? b.type : void 0,
        fetchPriority: typeof b.fetchPriority == "string" ? b.fetchPriority : void 0,
        referrerPolicy: typeof b.referrerPolicy == "string" ? b.referrerPolicy : void 0,
        imageSrcSet: typeof b.imageSrcSet == "string" ? b.imageSrcSet : void 0,
        imageSizes: typeof b.imageSizes == "string" ? b.imageSizes : void 0,
        media: typeof b.media == "string" ? b.media : void 0
      });
    }
  }, ee.preloadModule = function(E, b) {
    if (typeof E == "string")
      if (b) {
        var U = q(b.as, b.crossOrigin);
        f.d.m(E, {
          as: typeof b.as == "string" && b.as !== "script" ? b.as : void 0,
          crossOrigin: U,
          integrity: typeof b.integrity == "string" ? b.integrity : void 0
        });
      } else f.d.m(E);
  }, ee.requestFormReset = function(E) {
    f.d.r(E);
  }, ee.unstable_batchedUpdates = function(E, b) {
    return E(b);
  }, ee.useFormState = function(E, b, U) {
    return D.H.useFormState(E, b, U);
  }, ee.useFormStatus = function() {
    return D.H.useHostTransitionStatus();
  }, ee.version = "19.1.0", ee;
}
var eh;
function gh() {
  if (eh) return Ls.exports;
  eh = 1;
  function c() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(c);
      } catch (o) {
        console.error(o);
      }
  }
  return c(), Ls.exports = Vm(), Ls.exports;
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
var ah;
function Km() {
  if (ah) return Wn;
  ah = 1;
  var c = Qm(), o = er(), h = gh();
  function f(t) {
    var e = "https://react.dev/errors/" + t;
    if (1 < arguments.length) {
      e += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var a = 2; a < arguments.length; a++)
        e += "&args[]=" + encodeURIComponent(arguments[a]);
    }
    return "Minified React error #" + t + "; visit " + e + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function p(t) {
    return !(!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11);
  }
  function T(t) {
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
  function D(t) {
    if (t.tag === 13) {
      var e = t.memoizedState;
      if (e === null && (t = t.alternate, t !== null && (e = t.memoizedState)), e !== null) return e.dehydrated;
    }
    return null;
  }
  function q(t) {
    if (T(t) !== t)
      throw Error(f(188));
  }
  function E(t) {
    var e = t.alternate;
    if (!e) {
      if (e = T(t), e === null) throw Error(f(188));
      return e !== t ? null : t;
    }
    for (var a = t, l = e; ; ) {
      var n = a.return;
      if (n === null) break;
      var i = n.alternate;
      if (i === null) {
        if (l = n.return, l !== null) {
          a = l;
          continue;
        }
        break;
      }
      if (n.child === i.child) {
        for (i = n.child; i; ) {
          if (i === a) return q(n), t;
          if (i === l) return q(n), e;
          i = i.sibling;
        }
        throw Error(f(188));
      }
      if (a.return !== l.return) a = n, l = i;
      else {
        for (var s = !1, r = n.child; r; ) {
          if (r === a) {
            s = !0, a = n, l = i;
            break;
          }
          if (r === l) {
            s = !0, l = n, a = i;
            break;
          }
          r = r.sibling;
        }
        if (!s) {
          for (r = i.child; r; ) {
            if (r === a) {
              s = !0, a = i, l = n;
              break;
            }
            if (r === l) {
              s = !0, l = i, a = n;
              break;
            }
            r = r.sibling;
          }
          if (!s) throw Error(f(189));
        }
      }
      if (a.alternate !== l) throw Error(f(190));
    }
    if (a.tag !== 3) throw Error(f(188));
    return a.stateNode.current === a ? t : e;
  }
  function b(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t;
    for (t = t.child; t !== null; ) {
      if (e = b(t), e !== null) return e;
      t = t.sibling;
    }
    return null;
  }
  var U = Object.assign, Y = Symbol.for("react.element"), w = Symbol.for("react.transitional.element"), B = Symbol.for("react.portal"), Z = Symbol.for("react.fragment"), k = Symbol.for("react.strict_mode"), I = Symbol.for("react.profiler"), tt = Symbol.for("react.provider"), O = Symbol.for("react.consumer"), H = Symbol.for("react.context"), W = Symbol.for("react.forward_ref"), F = Symbol.for("react.suspense"), ut = Symbol.for("react.suspense_list"), C = Symbol.for("react.memo"), P = Symbol.for("react.lazy"), Rt = Symbol.for("react.activity"), Be = Symbol.for("react.memo_cache_sentinel"), ae = Symbol.iterator;
  function Nt(t) {
    return t === null || typeof t != "object" ? null : (t = ae && t[ae] || t["@@iterator"], typeof t == "function" ? t : null);
  }
  var be = Symbol.for("react.client.reference");
  function De(t) {
    if (t == null) return null;
    if (typeof t == "function")
      return t.$$typeof === be ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case Z:
        return "Fragment";
      case I:
        return "Profiler";
      case k:
        return "StrictMode";
      case F:
        return "Suspense";
      case ut:
        return "SuspenseList";
      case Rt:
        return "Activity";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case B:
          return "Portal";
        case H:
          return (t.displayName || "Context") + ".Provider";
        case O:
          return (t._context.displayName || "Context") + ".Consumer";
        case W:
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
  var Ct = Array.isArray, _ = o.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, G = h.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, et = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, gt = [], v = -1;
  function R(t) {
    return { current: t };
  }
  function Q(t) {
    0 > v || (t.current = gt[v], gt[v] = null, v--);
  }
  function L(t, e) {
    v++, gt[v] = t.current, t.current = e;
  }
  var J = R(null), ft = R(null), K = R(null), Jt = R(null);
  function yt(t, e) {
    switch (L(K, e), L(ft, t), L(J, null), e.nodeType) {
      case 9:
      case 11:
        t = (t = e.documentElement) && (t = t.namespaceURI) ? jd(t) : 0;
        break;
      default:
        if (t = e.tagName, e = e.namespaceURI)
          e = jd(e), t = Nd(e, t);
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
    Q(J), L(J, t);
  }
  function ne() {
    Q(J), Q(ft), Q(K);
  }
  function tl(t) {
    t.memoizedState !== null && L(Jt, t);
    var e = J.current, a = Nd(e, t.type);
    e !== a && (L(ft, t), L(J, a));
  }
  function ke(t) {
    ft.current === t && (Q(J), Q(ft)), Jt.current === t && (Q(Jt), Qn._currentValue = et);
  }
  var el = Object.prototype.hasOwnProperty, Wl = c.unstable_scheduleCallback, al = c.unstable_cancelCallback, ti = c.unstable_shouldYield, _u = c.unstable_requestPaint, xe = c.unstable_now, ei = c.unstable_getCurrentPriorityLevel, ie = c.unstable_ImmediatePriority, ai = c.unstable_UserBlockingPriority, ll = c.unstable_NormalPriority, li = c.unstable_LowPriority, ni = c.unstable_IdlePriority, Au = c.log, Ca = c.unstable_setDisableYieldValue, Je = null, It = null;
  function Re(t) {
    if (typeof Au == "function" && Ca(t), It && typeof It.setStrictMode == "function")
      try {
        It.setStrictMode(Je, t);
      } catch {
      }
  }
  var $t = Math.clz32 ? Math.clz32 : ui, Ye = Math.log, ii = Math.LN2;
  function ui(t) {
    return t >>>= 0, t === 0 ? 32 : 31 - (Ye(t) / ii | 0) | 0;
  }
  var fa = 256, da = 4194304;
  function Ge(t) {
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
    var n = 0, i = t.suspendedLanes, s = t.pingedLanes;
    t = t.warmLanes;
    var r = l & 134217727;
    return r !== 0 ? (l = r & ~i, l !== 0 ? n = Ge(l) : (s &= r, s !== 0 ? n = Ge(s) : a || (a = r & ~t, a !== 0 && (n = Ge(a))))) : (r = l & ~i, r !== 0 ? n = Ge(r) : s !== 0 ? n = Ge(s) : a || (a = l & ~t, a !== 0 && (n = Ge(a)))), n === 0 ? 0 : e !== 0 && e !== n && (e & i) === 0 && (i = n & -n, a = e & -e, i >= a || i === 32 && (a & 4194048) !== 0) ? e : n;
  }
  function ue(t, e) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & e) === 0;
  }
  function zu(t, e) {
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
  function ci() {
    var t = fa;
    return fa <<= 1, (fa & 4194048) === 0 && (fa = 256), t;
  }
  function Fl() {
    var t = da;
    return da <<= 1, (da & 62914560) === 0 && (da = 4194304), t;
  }
  function il(t) {
    for (var e = [], a = 0; 31 > a; a++) e.push(t);
    return e;
  }
  function ha(t, e) {
    t.pendingLanes |= e, e !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0);
  }
  function si(t, e, a, l, n, i) {
    var s = t.pendingLanes;
    t.pendingLanes = a, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= a, t.entangledLanes &= a, t.errorRecoveryDisabledLanes &= a, t.shellSuspendCounter = 0;
    var r = t.entanglements, d = t.expirationTimes, x = t.hiddenUpdates;
    for (a = s & ~a; 0 < a; ) {
      var A = 31 - $t(a), M = 1 << A;
      r[A] = 0, d[A] = -1;
      var S = x[A];
      if (S !== null)
        for (x[A] = null, A = 0; A < S.length; A++) {
          var N = S[A];
          N !== null && (N.lane &= -536870913);
        }
      a &= ~M;
    }
    l !== 0 && Pl(t, l, 0), i !== 0 && n === 0 && t.tag !== 0 && (t.suspendedLanes |= i & ~(s & ~e));
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
  function ul(t) {
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
    var t = G.p;
    return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : Ld(t.type));
  }
  function bt(t, e) {
    var a = G.p;
    try {
      return G.p = t, e();
    } finally {
      G.p = a;
    }
  }
  var nt = Math.random().toString(36).slice(2), Ot = "__reactFiber$" + nt, Xt = "__reactProps$" + nt, Ue = "__reactContainer$" + nt, Mu = "__reactEvents$" + nt, Dh = "__reactListeners$" + nt, Rh = "__reactHandles$" + nt, sr = "__reactResources$" + nt, tn = "__reactMarker$" + nt;
  function Ou(t) {
    delete t[Ot], delete t[Xt], delete t[Mu], delete t[Dh], delete t[Rh];
  }
  function cl(t) {
    var e = t[Ot];
    if (e) return e;
    for (var a = t.parentNode; a; ) {
      if (e = a[Ue] || a[Ot]) {
        if (a = e.alternate, e.child !== null || a !== null && a.child !== null)
          for (t = Ad(t); t !== null; ) {
            if (a = t[Ot]) return a;
            t = Ad(t);
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
    var e = t[sr];
    return e || (e = t[sr] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), e;
  }
  function Qt(t) {
    t[tn] = !0;
  }
  var rr = /* @__PURE__ */ new Set(), or = {};
  function Ha(t, e) {
    ol(t, e), ol(t + "Capture", e);
  }
  function ol(t, e) {
    for (or[t] = e, t = 0; t < e.length; t++)
      rr.add(e[t]);
  }
  var Uh = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), fr = {}, dr = {};
  function wh(t) {
    return el.call(dr, t) ? !0 : el.call(fr, t) ? !1 : Uh.test(t) ? dr[t] = !0 : (fr[t] = !0, !1);
  }
  function ri(t, e, a) {
    if (wh(e))
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
  function oi(t, e, a) {
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
  var Du, hr;
  function fl(t) {
    if (Du === void 0)
      try {
        throw Error();
      } catch (a) {
        var e = a.stack.trim().match(/\n( *(at )?)/);
        Du = e && e[1] || "", hr = -1 < a.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < a.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + Du + t + hr;
  }
  var Ru = !1;
  function Uu(t, e) {
    if (!t || Ru) return "";
    Ru = !0;
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
                } catch (N) {
                  var S = N;
                }
                Reflect.construct(t, [], M);
              } else {
                try {
                  M.call();
                } catch (N) {
                  S = N;
                }
                t.call(M.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (N) {
                S = N;
              }
              (M = t()) && typeof M.catch == "function" && M.catch(function() {
              });
            }
          } catch (N) {
            if (N && S && typeof N.stack == "string")
              return [N.stack, S.stack];
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
      var i = l.DetermineComponentFrameRoot(), s = i[0], r = i[1];
      if (s && r) {
        var d = s.split(`
`), x = r.split(`
`);
        for (n = l = 0; l < d.length && !d[l].includes("DetermineComponentFrameRoot"); )
          l++;
        for (; n < x.length && !x[n].includes(
          "DetermineComponentFrameRoot"
        ); )
          n++;
        if (l === d.length || n === x.length)
          for (l = d.length - 1, n = x.length - 1; 1 <= l && 0 <= n && d[l] !== x[n]; )
            n--;
        for (; 1 <= l && 0 <= n; l--, n--)
          if (d[l] !== x[n]) {
            if (l !== 1 || n !== 1)
              do
                if (l--, n--, 0 > n || d[l] !== x[n]) {
                  var A = `
` + d[l].replace(" at new ", " at ");
                  return t.displayName && A.includes("<anonymous>") && (A = A.replace("<anonymous>", t.displayName)), A;
                }
              while (1 <= l && 0 <= n);
            break;
          }
      }
    } finally {
      Ru = !1, Error.prepareStackTrace = a;
    }
    return (a = t ? t.displayName || t.name : "") ? fl(a) : "";
  }
  function qh(t) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return fl(t.type);
      case 16:
        return fl("Lazy");
      case 13:
        return fl("Suspense");
      case 19:
        return fl("SuspenseList");
      case 0:
      case 15:
        return Uu(t.type, !1);
      case 11:
        return Uu(t.type.render, !1);
      case 1:
        return Uu(t.type, !0);
      case 31:
        return fl("Activity");
      default:
        return "";
    }
  }
  function vr(t) {
    try {
      var e = "";
      do
        e += qh(t), t = t.return;
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
  function mr(t) {
    var e = t.type;
    return (t = t.nodeName) && t.toLowerCase() === "input" && (e === "checkbox" || e === "radio");
  }
  function Ch(t) {
    var e = mr(t) ? "checked" : "value", a = Object.getOwnPropertyDescriptor(
      t.constructor.prototype,
      e
    ), l = "" + t[e];
    if (!t.hasOwnProperty(e) && typeof a < "u" && typeof a.get == "function" && typeof a.set == "function") {
      var n = a.get, i = a.set;
      return Object.defineProperty(t, e, {
        configurable: !0,
        get: function() {
          return n.call(this);
        },
        set: function(s) {
          l = "" + s, i.call(this, s);
        }
      }), Object.defineProperty(t, e, {
        enumerable: a.enumerable
      }), {
        getValue: function() {
          return l;
        },
        setValue: function(s) {
          l = "" + s;
        },
        stopTracking: function() {
          t._valueTracker = null, delete t[e];
        }
      };
    }
  }
  function fi(t) {
    t._valueTracker || (t._valueTracker = Ch(t));
  }
  function pr(t) {
    if (!t) return !1;
    var e = t._valueTracker;
    if (!e) return !0;
    var a = e.getValue(), l = "";
    return t && (l = mr(t) ? t.checked ? "true" : "false" : t.value), t = l, t !== a ? (e.setValue(t), !0) : !1;
  }
  function di(t) {
    if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u") return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  var Hh = /[\n"\\]/g;
  function je(t) {
    return t.replace(
      Hh,
      function(e) {
        return "\\" + e.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function wu(t, e, a, l, n, i, s, r) {
    t.name = "", s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? t.type = s : t.removeAttribute("type"), e != null ? s === "number" ? (e === 0 && t.value === "" || t.value != e) && (t.value = "" + Se(e)) : t.value !== "" + Se(e) && (t.value = "" + Se(e)) : s !== "submit" && s !== "reset" || t.removeAttribute("value"), e != null ? qu(t, s, Se(e)) : a != null ? qu(t, s, Se(a)) : l != null && t.removeAttribute("value"), n == null && i != null && (t.defaultChecked = !!i), n != null && (t.checked = n && typeof n != "function" && typeof n != "symbol"), r != null && typeof r != "function" && typeof r != "symbol" && typeof r != "boolean" ? t.name = "" + Se(r) : t.removeAttribute("name");
  }
  function gr(t, e, a, l, n, i, s, r) {
    if (i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" && (t.type = i), e != null || a != null) {
      if (!(i !== "submit" && i !== "reset" || e != null))
        return;
      a = a != null ? "" + Se(a) : "", e = e != null ? "" + Se(e) : a, r || e === t.value || (t.value = e), t.defaultValue = e;
    }
    l = l ?? n, l = typeof l != "function" && typeof l != "symbol" && !!l, t.checked = r ? t.checked : !!l, t.defaultChecked = !!l, s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" && (t.name = s);
  }
  function qu(t, e, a) {
    e === "number" && di(t.ownerDocument) === t || t.defaultValue === "" + a || (t.defaultValue = "" + a);
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
  function yr(t, e, a) {
    if (e != null && (e = "" + Se(e), e !== t.value && (t.value = e), a == null)) {
      t.defaultValue !== e && (t.defaultValue = e);
      return;
    }
    t.defaultValue = a != null ? "" + Se(a) : "";
  }
  function br(t, e, a, l) {
    if (e == null) {
      if (l != null) {
        if (a != null) throw Error(f(92));
        if (Ct(l)) {
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
  var Bh = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function xr(t, e, a) {
    var l = e.indexOf("--") === 0;
    a == null || typeof a == "boolean" || a === "" ? l ? t.setProperty(e, "") : e === "float" ? t.cssFloat = "" : t[e] = "" : l ? t.setProperty(e, a) : typeof a != "number" || a === 0 || Bh.has(e) ? e === "float" ? t.cssFloat = a : t[e] = ("" + a).trim() : t[e] = a + "px";
  }
  function Sr(t, e, a) {
    if (e != null && typeof e != "object")
      throw Error(f(62));
    if (t = t.style, a != null) {
      for (var l in a)
        !a.hasOwnProperty(l) || e != null && e.hasOwnProperty(l) || (l.indexOf("--") === 0 ? t.setProperty(l, "") : l === "float" ? t.cssFloat = "" : t[l] = "");
      for (var n in e)
        l = e[n], e.hasOwnProperty(n) && a[n] !== l && xr(t, n, l);
    } else
      for (var i in e)
        e.hasOwnProperty(i) && xr(t, i, e[i]);
  }
  function Cu(t) {
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
  var kh = /* @__PURE__ */ new Map([
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
  ]), Yh = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function hi(t) {
    return Yh.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
  }
  var Hu = null;
  function Bu(t) {
    return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
  }
  var vl = null, ml = null;
  function jr(t) {
    var e = sl(t);
    if (e && (t = e.stateNode)) {
      var a = t[Xt] || null;
      t: switch (t = e.stateNode, e.type) {
        case "input":
          if (wu(
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
                wu(
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
              l = a[e], l.form === t.form && pr(l);
          }
          break t;
        case "textarea":
          yr(t, a.value, a.defaultValue);
          break t;
        case "select":
          e = a.value, e != null && dl(t, !!a.multiple, e, !1);
      }
    }
  }
  var ku = !1;
  function Nr(t, e, a) {
    if (ku) return t(e, a);
    ku = !0;
    try {
      var l = t(e);
      return l;
    } finally {
      if (ku = !1, (vl !== null || ml !== null) && (Pi(), vl && (e = vl, t = ml, ml = vl = null, jr(e), t)))
        for (e = 0; e < t.length; e++) jr(t[e]);
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
  var We = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Yu = !1;
  if (We)
    try {
      var ln = {};
      Object.defineProperty(ln, "passive", {
        get: function() {
          Yu = !0;
        }
      }), window.addEventListener("test", ln, ln), window.removeEventListener("test", ln, ln);
    } catch {
      Yu = !1;
    }
  var va = null, Gu = null, vi = null;
  function Tr() {
    if (vi) return vi;
    var t, e = Gu, a = e.length, l, n = "value" in va ? va.value : va.textContent, i = n.length;
    for (t = 0; t < a && e[t] === n[t]; t++) ;
    var s = a - t;
    for (l = 1; l <= s && e[a - l] === n[i - l]; l++) ;
    return vi = n.slice(t, 1 < l ? 1 - l : void 0);
  }
  function mi(t) {
    var e = t.keyCode;
    return "charCode" in t ? (t = t.charCode, t === 0 && e === 13 && (t = 13)) : t = e, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
  }
  function pi() {
    return !0;
  }
  function Er() {
    return !1;
  }
  function ce(t) {
    function e(a, l, n, i, s) {
      this._reactName = a, this._targetInst = n, this.type = l, this.nativeEvent = i, this.target = s, this.currentTarget = null;
      for (var r in t)
        t.hasOwnProperty(r) && (a = t[r], this[r] = a ? a(i) : i[r]);
      return this.isDefaultPrevented = (i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1) ? pi : Er, this.isPropagationStopped = Er, this;
    }
    return U(e.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var a = this.nativeEvent;
        a && (a.preventDefault ? a.preventDefault() : typeof a.returnValue != "unknown" && (a.returnValue = !1), this.isDefaultPrevented = pi);
      },
      stopPropagation: function() {
        var a = this.nativeEvent;
        a && (a.stopPropagation ? a.stopPropagation() : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0), this.isPropagationStopped = pi);
      },
      persist: function() {
      },
      isPersistent: pi
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
  }, gi = ce(Ba), nn = U({}, Ba, { view: 0, detail: 0 }), Gh = ce(nn), Lu, Xu, un, yi = U({}, nn, {
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
    getModifierState: Zu,
    button: 0,
    buttons: 0,
    relatedTarget: function(t) {
      return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
    },
    movementX: function(t) {
      return "movementX" in t ? t.movementX : (t !== un && (un && t.type === "mousemove" ? (Lu = t.screenX - un.screenX, Xu = t.screenY - un.screenY) : Xu = Lu = 0, un = t), Lu);
    },
    movementY: function(t) {
      return "movementY" in t ? t.movementY : Xu;
    }
  }), _r = ce(yi), Lh = U({}, yi, { dataTransfer: 0 }), Xh = ce(Lh), Qh = U({}, nn, { relatedTarget: 0 }), Qu = ce(Qh), Zh = U({}, Ba, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Vh = ce(Zh), Kh = U({}, Ba, {
    clipboardData: function(t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    }
  }), Jh = ce(Kh), $h = U({}, Ba, { data: 0 }), Ar = ce($h), Wh = {
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
  }, Fh = {
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
  }, Ph = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function Ih(t) {
    var e = this.nativeEvent;
    return e.getModifierState ? e.getModifierState(t) : (t = Ph[t]) ? !!e[t] : !1;
  }
  function Zu() {
    return Ih;
  }
  var tv = U({}, nn, {
    key: function(t) {
      if (t.key) {
        var e = Wh[t.key] || t.key;
        if (e !== "Unidentified") return e;
      }
      return t.type === "keypress" ? (t = mi(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? Fh[t.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Zu,
    charCode: function(t) {
      return t.type === "keypress" ? mi(t) : 0;
    },
    keyCode: function(t) {
      return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    },
    which: function(t) {
      return t.type === "keypress" ? mi(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    }
  }), ev = ce(tv), av = U({}, yi, {
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
  }), zr = ce(av), lv = U({}, nn, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Zu
  }), nv = ce(lv), iv = U({}, Ba, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), uv = ce(iv), cv = U({}, yi, {
    deltaX: function(t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    },
    deltaY: function(t) {
      return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), sv = ce(cv), rv = U({}, Ba, {
    newState: 0,
    oldState: 0
  }), ov = ce(rv), fv = [9, 13, 27, 32], Vu = We && "CompositionEvent" in window, cn = null;
  We && "documentMode" in document && (cn = document.documentMode);
  var dv = We && "TextEvent" in window && !cn, Mr = We && (!Vu || cn && 8 < cn && 11 >= cn), Or = " ", Dr = !1;
  function Rr(t, e) {
    switch (t) {
      case "keyup":
        return fv.indexOf(e.keyCode) !== -1;
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
  function Ur(t) {
    return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
  }
  var pl = !1;
  function hv(t, e) {
    switch (t) {
      case "compositionend":
        return Ur(e);
      case "keypress":
        return e.which !== 32 ? null : (Dr = !0, Or);
      case "textInput":
        return t = e.data, t === Or && Dr ? null : t;
      default:
        return null;
    }
  }
  function vv(t, e) {
    if (pl)
      return t === "compositionend" || !Vu && Rr(t, e) ? (t = Tr(), vi = Gu = va = null, pl = !1, t) : null;
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
        return Mr && e.locale !== "ko" ? null : e.data;
      default:
        return null;
    }
  }
  var mv = {
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
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e === "input" ? !!mv[t.type] : e === "textarea";
  }
  function qr(t, e, a, l) {
    vl ? ml ? ml.push(l) : ml = [l] : vl = l, e = nu(e, "onChange"), 0 < e.length && (a = new gi(
      "onChange",
      "change",
      null,
      a,
      l
    ), t.push({ event: a, listeners: e }));
  }
  var sn = null, rn = null;
  function pv(t) {
    gd(t, 0);
  }
  function bi(t) {
    var e = en(t);
    if (pr(e)) return t;
  }
  function Cr(t, e) {
    if (t === "change") return e;
  }
  var Hr = !1;
  if (We) {
    var Ku;
    if (We) {
      var Ju = "oninput" in document;
      if (!Ju) {
        var Br = document.createElement("div");
        Br.setAttribute("oninput", "return;"), Ju = typeof Br.oninput == "function";
      }
      Ku = Ju;
    } else Ku = !1;
    Hr = Ku && (!document.documentMode || 9 < document.documentMode);
  }
  function kr() {
    sn && (sn.detachEvent("onpropertychange", Yr), rn = sn = null);
  }
  function Yr(t) {
    if (t.propertyName === "value" && bi(rn)) {
      var e = [];
      qr(
        e,
        rn,
        t,
        Bu(t)
      ), Nr(pv, e);
    }
  }
  function gv(t, e, a) {
    t === "focusin" ? (kr(), sn = e, rn = a, sn.attachEvent("onpropertychange", Yr)) : t === "focusout" && kr();
  }
  function yv(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return bi(rn);
  }
  function bv(t, e) {
    if (t === "click") return bi(e);
  }
  function xv(t, e) {
    if (t === "input" || t === "change")
      return bi(e);
  }
  function Sv(t, e) {
    return t === e && (t !== 0 || 1 / t === 1 / e) || t !== t && e !== e;
  }
  var de = typeof Object.is == "function" ? Object.is : Sv;
  function on(t, e) {
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
  function Lr(t, e) {
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
  function Xr(t, e) {
    return t && e ? t === e ? !0 : t && t.nodeType === 3 ? !1 : e && e.nodeType === 3 ? Xr(t, e.parentNode) : "contains" in t ? t.contains(e) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(e) & 16) : !1 : !1;
  }
  function Qr(t) {
    t = t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null ? t.ownerDocument.defaultView : window;
    for (var e = di(t.document); e instanceof t.HTMLIFrameElement; ) {
      try {
        var a = typeof e.contentWindow.location.href == "string";
      } catch {
        a = !1;
      }
      if (a) t = e.contentWindow;
      else break;
      e = di(t.document);
    }
    return e;
  }
  function $u(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e && (e === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || e === "textarea" || t.contentEditable === "true");
  }
  var jv = We && "documentMode" in document && 11 >= document.documentMode, gl = null, Wu = null, fn = null, Fu = !1;
  function Zr(t, e, a) {
    var l = a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
    Fu || gl == null || gl !== di(l) || (l = gl, "selectionStart" in l && $u(l) ? l = { start: l.selectionStart, end: l.selectionEnd } : (l = (l.ownerDocument && l.ownerDocument.defaultView || window).getSelection(), l = {
      anchorNode: l.anchorNode,
      anchorOffset: l.anchorOffset,
      focusNode: l.focusNode,
      focusOffset: l.focusOffset
    }), fn && on(fn, l) || (fn = l, l = nu(Wu, "onSelect"), 0 < l.length && (e = new gi(
      "onSelect",
      "select",
      null,
      e,
      a
    ), t.push({ event: e, listeners: l }), e.target = gl)));
  }
  function ka(t, e) {
    var a = {};
    return a[t.toLowerCase()] = e.toLowerCase(), a["Webkit" + t] = "webkit" + e, a["Moz" + t] = "moz" + e, a;
  }
  var yl = {
    animationend: ka("Animation", "AnimationEnd"),
    animationiteration: ka("Animation", "AnimationIteration"),
    animationstart: ka("Animation", "AnimationStart"),
    transitionrun: ka("Transition", "TransitionRun"),
    transitionstart: ka("Transition", "TransitionStart"),
    transitioncancel: ka("Transition", "TransitionCancel"),
    transitionend: ka("Transition", "TransitionEnd")
  }, Pu = {}, Vr = {};
  We && (Vr = document.createElement("div").style, "AnimationEvent" in window || (delete yl.animationend.animation, delete yl.animationiteration.animation, delete yl.animationstart.animation), "TransitionEvent" in window || delete yl.transitionend.transition);
  function Ya(t) {
    if (Pu[t]) return Pu[t];
    if (!yl[t]) return t;
    var e = yl[t], a;
    for (a in e)
      if (e.hasOwnProperty(a) && a in Vr)
        return Pu[t] = e[a];
    return t;
  }
  var Kr = Ya("animationend"), Jr = Ya("animationiteration"), $r = Ya("animationstart"), Nv = Ya("transitionrun"), Tv = Ya("transitionstart"), Ev = Ya("transitioncancel"), Wr = Ya("transitionend"), Fr = /* @__PURE__ */ new Map(), Iu = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Iu.push("scrollEnd");
  function we(t, e) {
    Fr.set(t, e), Ha(e, [t]);
  }
  var Pr = /* @__PURE__ */ new WeakMap();
  function Ne(t, e) {
    if (typeof t == "object" && t !== null) {
      var a = Pr.get(t);
      return a !== void 0 ? a : (e = {
        value: t,
        source: e,
        stack: vr(e)
      }, Pr.set(t, e), e);
    }
    return {
      value: t,
      source: e,
      stack: vr(e)
    };
  }
  var Te = [], bl = 0, tc = 0;
  function xi() {
    for (var t = bl, e = tc = bl = 0; e < t; ) {
      var a = Te[e];
      Te[e++] = null;
      var l = Te[e];
      Te[e++] = null;
      var n = Te[e];
      Te[e++] = null;
      var i = Te[e];
      if (Te[e++] = null, l !== null && n !== null) {
        var s = l.pending;
        s === null ? n.next = n : (n.next = s.next, s.next = n), l.pending = n;
      }
      i !== 0 && Ir(a, n, i);
    }
  }
  function Si(t, e, a, l) {
    Te[bl++] = t, Te[bl++] = e, Te[bl++] = a, Te[bl++] = l, tc |= l, t.lanes |= l, t = t.alternate, t !== null && (t.lanes |= l);
  }
  function ec(t, e, a, l) {
    return Si(t, e, a, l), ji(t);
  }
  function xl(t, e) {
    return Si(t, null, null, e), ji(t);
  }
  function Ir(t, e, a) {
    t.lanes |= a;
    var l = t.alternate;
    l !== null && (l.lanes |= a);
    for (var n = !1, i = t.return; i !== null; )
      i.childLanes |= a, l = i.alternate, l !== null && (l.childLanes |= a), i.tag === 22 && (t = i.stateNode, t === null || t._visibility & 1 || (n = !0)), t = i, i = i.return;
    return t.tag === 3 ? (i = t.stateNode, n && e !== null && (n = 31 - $t(a), t = i.hiddenUpdates, l = t[n], l === null ? t[n] = [e] : l.push(e), e.lane = a | 536870912), i) : null;
  }
  function ji(t) {
    if (50 < Cn)
      throw Cn = 0, cs = null, Error(f(185));
    for (var e = t.return; e !== null; )
      t = e, e = t.return;
    return t.tag === 3 ? t.stateNode : null;
  }
  var Sl = {};
  function _v(t, e, a, l) {
    this.tag = t, this.key = a, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = e, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = l, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function he(t, e, a, l) {
    return new _v(t, e, a, l);
  }
  function ac(t) {
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
  function to(t, e) {
    t.flags &= 65011714;
    var a = t.alternate;
    return a === null ? (t.childLanes = 0, t.lanes = e, t.child = null, t.subtreeFlags = 0, t.memoizedProps = null, t.memoizedState = null, t.updateQueue = null, t.dependencies = null, t.stateNode = null) : (t.childLanes = a.childLanes, t.lanes = a.lanes, t.child = a.child, t.subtreeFlags = 0, t.deletions = null, t.memoizedProps = a.memoizedProps, t.memoizedState = a.memoizedState, t.updateQueue = a.updateQueue, t.type = a.type, e = a.dependencies, t.dependencies = e === null ? null : {
      lanes: e.lanes,
      firstContext: e.firstContext
    }), t;
  }
  function Ni(t, e, a, l, n, i) {
    var s = 0;
    if (l = t, typeof t == "function") ac(t) && (s = 1);
    else if (typeof t == "string")
      s = zm(
        t,
        a,
        J.current
      ) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
    else
      t: switch (t) {
        case Rt:
          return t = he(31, a, e, n), t.elementType = Rt, t.lanes = i, t;
        case Z:
          return Ga(a.children, n, i, e);
        case k:
          s = 8, n |= 24;
          break;
        case I:
          return t = he(12, a, e, n | 2), t.elementType = I, t.lanes = i, t;
        case F:
          return t = he(13, a, e, n), t.elementType = F, t.lanes = i, t;
        case ut:
          return t = he(19, a, e, n), t.elementType = ut, t.lanes = i, t;
        default:
          if (typeof t == "object" && t !== null)
            switch (t.$$typeof) {
              case tt:
              case H:
                s = 10;
                break t;
              case O:
                s = 9;
                break t;
              case W:
                s = 11;
                break t;
              case C:
                s = 14;
                break t;
              case P:
                s = 16, l = null;
                break t;
            }
          s = 29, a = Error(
            f(130, t === null ? "null" : typeof t, "")
          ), l = null;
      }
    return e = he(s, a, e, n), e.elementType = t, e.type = l, e.lanes = i, e;
  }
  function Ga(t, e, a, l) {
    return t = he(7, t, l, e), t.lanes = a, t;
  }
  function lc(t, e, a) {
    return t = he(6, t, null, e), t.lanes = a, t;
  }
  function nc(t, e, a) {
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
  var jl = [], Nl = 0, Ti = null, Ei = 0, Ee = [], _e = 0, La = null, Pe = 1, Ie = "";
  function Xa(t, e) {
    jl[Nl++] = Ei, jl[Nl++] = Ti, Ti = t, Ei = e;
  }
  function eo(t, e, a) {
    Ee[_e++] = Pe, Ee[_e++] = Ie, Ee[_e++] = La, La = t;
    var l = Pe;
    t = Ie;
    var n = 32 - $t(l) - 1;
    l &= ~(1 << n), a += 1;
    var i = 32 - $t(e) + n;
    if (30 < i) {
      var s = n - n % 5;
      i = (l & (1 << s) - 1).toString(32), l >>= s, n -= s, Pe = 1 << 32 - $t(e) + n | a << n | l, Ie = i + t;
    } else
      Pe = 1 << i | a << n | l, Ie = t;
  }
  function ic(t) {
    t.return !== null && (Xa(t, 1), eo(t, 1, 0));
  }
  function uc(t) {
    for (; t === Ti; )
      Ti = jl[--Nl], jl[Nl] = null, Ei = jl[--Nl], jl[Nl] = null;
    for (; t === La; )
      La = Ee[--_e], Ee[_e] = null, Ie = Ee[--_e], Ee[_e] = null, Pe = Ee[--_e], Ee[_e] = null;
  }
  var le = null, wt = null, pt = !1, Qa = null, Le = !1, cc = Error(f(519));
  function Za(t) {
    var e = Error(f(418, ""));
    throw vn(Ne(e, t)), cc;
  }
  function ao(t) {
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
        ht("invalid", e), gr(
          e,
          l.value,
          l.defaultValue,
          l.checked,
          l.defaultChecked,
          l.type,
          l.name,
          !0
        ), fi(e);
        break;
      case "select":
        ht("invalid", e);
        break;
      case "textarea":
        ht("invalid", e), br(e, l.value, l.defaultValue, l.children), fi(e);
    }
    a = l.children, typeof a != "string" && typeof a != "number" && typeof a != "bigint" || e.textContent === "" + a || l.suppressHydrationWarning === !0 || Sd(e.textContent, a) ? (l.popover != null && (ht("beforetoggle", e), ht("toggle", e)), l.onScroll != null && ht("scroll", e), l.onScrollEnd != null && ht("scrollend", e), l.onClick != null && (e.onclick = iu), e = !0) : e = !1, e || Za(t);
  }
  function lo(t) {
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
    if (!pt) return lo(t), pt = !0, !1;
    var e = t.tag, a;
    if ((a = e !== 3 && e !== 27) && ((a = e === 5) && (a = t.type, a = !(a !== "form" && a !== "button") || Ns(t.type, t.memoizedProps)), a = !a), a && wt && Za(t), lo(t), e === 13) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(f(317));
      t: {
        for (t = t.nextSibling, e = 0; t; ) {
          if (t.nodeType === 8)
            if (a = t.data, a === "/$") {
              if (e === 0) {
                wt = Ce(t.nextSibling);
                break t;
              }
              e--;
            } else
              a !== "$" && a !== "$!" && a !== "$?" || e++;
          t = t.nextSibling;
        }
        wt = null;
      }
    } else
      e === 27 ? (e = wt, Oa(t.type) ? (t = As, As = null, wt = t) : wt = e) : wt = le ? Ce(t.stateNode.nextSibling) : null;
    return !0;
  }
  function hn() {
    wt = le = null, pt = !1;
  }
  function no() {
    var t = Qa;
    return t !== null && (oe === null ? oe = t : oe.push.apply(
      oe,
      t
    ), Qa = null), t;
  }
  function vn(t) {
    Qa === null ? Qa = [t] : Qa.push(t);
  }
  var sc = R(null), Va = null, ta = null;
  function ma(t, e, a) {
    L(sc, e._currentValue), e._currentValue = a;
  }
  function ea(t) {
    t._currentValue = sc.current, Q(sc);
  }
  function rc(t, e, a) {
    for (; t !== null; ) {
      var l = t.alternate;
      if ((t.childLanes & e) !== e ? (t.childLanes |= e, l !== null && (l.childLanes |= e)) : l !== null && (l.childLanes & e) !== e && (l.childLanes |= e), t === a) break;
      t = t.return;
    }
  }
  function oc(t, e, a, l) {
    var n = t.child;
    for (n !== null && (n.return = t); n !== null; ) {
      var i = n.dependencies;
      if (i !== null) {
        var s = n.child;
        i = i.firstContext;
        t: for (; i !== null; ) {
          var r = i;
          i = n;
          for (var d = 0; d < e.length; d++)
            if (r.context === e[d]) {
              i.lanes |= a, r = i.alternate, r !== null && (r.lanes |= a), rc(
                i.return,
                a,
                t
              ), l || (s = null);
              break t;
            }
          i = r.next;
        }
      } else if (n.tag === 18) {
        if (s = n.return, s === null) throw Error(f(341));
        s.lanes |= a, i = s.alternate, i !== null && (i.lanes |= a), rc(s, a, t), s = null;
      } else s = n.child;
      if (s !== null) s.return = n;
      else
        for (s = n; s !== null; ) {
          if (s === t) {
            s = null;
            break;
          }
          if (n = s.sibling, n !== null) {
            n.return = s.return, s = n;
            break;
          }
          s = s.return;
        }
      n = s;
    }
  }
  function mn(t, e, a, l) {
    t = null;
    for (var n = e, i = !1; n !== null; ) {
      if (!i) {
        if ((n.flags & 524288) !== 0) i = !0;
        else if ((n.flags & 262144) !== 0) break;
      }
      if (n.tag === 10) {
        var s = n.alternate;
        if (s === null) throw Error(f(387));
        if (s = s.memoizedProps, s !== null) {
          var r = n.type;
          de(n.pendingProps.value, s.value) || (t !== null ? t.push(r) : t = [r]);
        }
      } else if (n === Jt.current) {
        if (s = n.alternate, s === null) throw Error(f(387));
        s.memoizedState.memoizedState !== n.memoizedState.memoizedState && (t !== null ? t.push(Qn) : t = [Qn]);
      }
      n = n.return;
    }
    t !== null && oc(
      e,
      t,
      a,
      l
    ), e.flags |= 262144;
  }
  function _i(t) {
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
    return io(Va, t);
  }
  function Ai(t, e) {
    return Va === null && Ka(t), io(t, e);
  }
  function io(t, e) {
    var a = e._currentValue;
    if (e = { context: e, memoizedValue: a, next: null }, ta === null) {
      if (t === null) throw Error(f(308));
      ta = e, t.dependencies = { lanes: 0, firstContext: e }, t.flags |= 524288;
    } else ta = ta.next = e;
    return a;
  }
  var Av = typeof AbortController < "u" ? AbortController : function() {
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
  }, zv = c.unstable_scheduleCallback, Mv = c.unstable_NormalPriority, Gt = {
    $$typeof: H,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function fc() {
    return {
      controller: new Av(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function pn(t) {
    t.refCount--, t.refCount === 0 && zv(Mv, function() {
      t.controller.abort();
    });
  }
  var gn = null, dc = 0, Tl = 0, El = null;
  function Ov(t, e) {
    if (gn === null) {
      var a = gn = [];
      dc = 0, Tl = vs(), El = {
        status: "pending",
        value: void 0,
        then: function(l) {
          a.push(l);
        }
      };
    }
    return dc++, e.then(uo, uo), e;
  }
  function uo() {
    if (--dc === 0 && gn !== null) {
      El !== null && (El.status = "fulfilled");
      var t = gn;
      gn = null, Tl = 0, El = null;
      for (var e = 0; e < t.length; e++) (0, t[e])();
    }
  }
  function Dv(t, e) {
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
  var co = _.S;
  _.S = function(t, e) {
    typeof e == "object" && e !== null && typeof e.then == "function" && Ov(t, e), co !== null && co(t, e);
  };
  var Ja = R(null);
  function hc() {
    var t = Ja.current;
    return t !== null ? t : Mt.pooledCache;
  }
  function zi(t, e) {
    e === null ? L(Ja, Ja.current) : L(Ja, e.pool);
  }
  function so() {
    var t = hc();
    return t === null ? null : { parent: Gt._currentValue, pool: t };
  }
  var yn = Error(f(460)), ro = Error(f(474)), Mi = Error(f(542)), vc = { then: function() {
  } };
  function oo(t) {
    return t = t.status, t === "fulfilled" || t === "rejected";
  }
  function Oi() {
  }
  function fo(t, e, a) {
    switch (a = t[a], a === void 0 ? t.push(e) : a !== e && (e.then(Oi, Oi), e = a), e.status) {
      case "fulfilled":
        return e.value;
      case "rejected":
        throw t = e.reason, vo(t), t;
      default:
        if (typeof e.status == "string") e.then(Oi, Oi);
        else {
          if (t = Mt, t !== null && 100 < t.shellSuspendCounter)
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
            throw t = e.reason, vo(t), t;
        }
        throw bn = e, yn;
    }
  }
  var bn = null;
  function ho() {
    if (bn === null) throw Error(f(459));
    var t = bn;
    return bn = null, t;
  }
  function vo(t) {
    if (t === yn || t === Mi)
      throw Error(f(483));
  }
  var pa = !1;
  function mc(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function pc(t, e) {
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
      return n === null ? e.next = e : (e.next = n.next, n.next = e), l.pending = e, e = ji(t), Ir(t, null, a), e;
    }
    return Si(t, l, e, a), ji(t);
  }
  function xn(t, e, a) {
    if (e = e.updateQueue, e !== null && (e = e.shared, (a & 4194048) !== 0)) {
      var l = e.lanes;
      l &= t.pendingLanes, a |= l, e.lanes = a, Il(t, a);
    }
  }
  function gc(t, e) {
    var a = t.updateQueue, l = t.alternate;
    if (l !== null && (l = l.updateQueue, a === l)) {
      var n = null, i = null;
      if (a = a.firstBaseUpdate, a !== null) {
        do {
          var s = {
            lane: a.lane,
            tag: a.tag,
            payload: a.payload,
            callback: null,
            next: null
          };
          i === null ? n = i = s : i = i.next = s, a = a.next;
        } while (a !== null);
        i === null ? n = i = e : i = i.next = e;
      } else n = i = e;
      a = {
        baseState: l.baseState,
        firstBaseUpdate: n,
        lastBaseUpdate: i,
        shared: l.shared,
        callbacks: l.callbacks
      }, t.updateQueue = a;
      return;
    }
    t = a.lastBaseUpdate, t === null ? a.firstBaseUpdate = e : t.next = e, a.lastBaseUpdate = e;
  }
  var yc = !1;
  function Sn() {
    if (yc) {
      var t = El;
      if (t !== null) throw t;
    }
  }
  function jn(t, e, a, l) {
    yc = !1;
    var n = t.updateQueue;
    pa = !1;
    var i = n.firstBaseUpdate, s = n.lastBaseUpdate, r = n.shared.pending;
    if (r !== null) {
      n.shared.pending = null;
      var d = r, x = d.next;
      d.next = null, s === null ? i = x : s.next = x, s = d;
      var A = t.alternate;
      A !== null && (A = A.updateQueue, r = A.lastBaseUpdate, r !== s && (r === null ? A.firstBaseUpdate = x : r.next = x, A.lastBaseUpdate = d));
    }
    if (i !== null) {
      var M = n.baseState;
      s = 0, A = x = d = null, r = i;
      do {
        var S = r.lane & -536870913, N = S !== r.lane;
        if (N ? (vt & S) === S : (l & S) === S) {
          S !== 0 && S === Tl && (yc = !0), A !== null && (A = A.next = {
            lane: 0,
            tag: r.tag,
            payload: r.payload,
            callback: null,
            next: null
          });
          t: {
            var it = t, at = r;
            S = e;
            var _t = a;
            switch (at.tag) {
              case 1:
                if (it = at.payload, typeof it == "function") {
                  M = it.call(_t, M, S);
                  break t;
                }
                M = it;
                break t;
              case 3:
                it.flags = it.flags & -65537 | 128;
              case 0:
                if (it = at.payload, S = typeof it == "function" ? it.call(_t, M, S) : it, S == null) break t;
                M = U({}, M, S);
                break t;
              case 2:
                pa = !0;
            }
          }
          S = r.callback, S !== null && (t.flags |= 64, N && (t.flags |= 8192), N = n.callbacks, N === null ? n.callbacks = [S] : N.push(S));
        } else
          N = {
            lane: S,
            tag: r.tag,
            payload: r.payload,
            callback: r.callback,
            next: null
          }, A === null ? (x = A = N, d = M) : A = A.next = N, s |= S;
        if (r = r.next, r === null) {
          if (r = n.shared.pending, r === null)
            break;
          N = r, r = N.next, N.next = null, n.lastBaseUpdate = N, n.shared.pending = null;
        }
      } while (!0);
      A === null && (d = M), n.baseState = d, n.firstBaseUpdate = x, n.lastBaseUpdate = A, i === null && (n.shared.lanes = 0), _a |= s, t.lanes = s, t.memoizedState = M;
    }
  }
  function mo(t, e) {
    if (typeof t != "function")
      throw Error(f(191, t));
    t.call(e);
  }
  function po(t, e) {
    var a = t.callbacks;
    if (a !== null)
      for (t.callbacks = null, t = 0; t < a.length; t++)
        mo(a[t], e);
  }
  var _l = R(null), Di = R(0);
  function go(t, e) {
    t = sa, L(Di, t), L(_l, e), sa = t | e.baseLanes;
  }
  function bc() {
    L(Di, sa), L(_l, _l.current);
  }
  function xc() {
    sa = Di.current, Q(_l), Q(Di);
  }
  var ba = 0, rt = null, Tt = null, kt = null, Ri = !1, Al = !1, $a = !1, Ui = 0, Nn = 0, zl = null, Rv = 0;
  function Ht() {
    throw Error(f(321));
  }
  function Sc(t, e) {
    if (e === null) return !1;
    for (var a = 0; a < e.length && a < t.length; a++)
      if (!de(t[a], e[a])) return !1;
    return !0;
  }
  function jc(t, e, a, l, n, i) {
    return ba = i, rt = e, e.memoizedState = null, e.updateQueue = null, e.lanes = 0, _.H = t === null || t.memoizedState === null ? tf : ef, $a = !1, i = a(l, n), $a = !1, Al && (i = bo(
      e,
      a,
      l,
      n
    )), yo(t), i;
  }
  function yo(t) {
    _.H = ki;
    var e = Tt !== null && Tt.next !== null;
    if (ba = 0, kt = Tt = rt = null, Ri = !1, Nn = 0, zl = null, e) throw Error(f(300));
    t === null || Zt || (t = t.dependencies, t !== null && _i(t) && (Zt = !0));
  }
  function bo(t, e, a, l) {
    rt = t;
    var n = 0;
    do {
      if (Al && (zl = null), Nn = 0, Al = !1, 25 <= n) throw Error(f(301));
      if (n += 1, kt = Tt = null, t.updateQueue != null) {
        var i = t.updateQueue;
        i.lastEffect = null, i.events = null, i.stores = null, i.memoCache != null && (i.memoCache.index = 0);
      }
      _.H = kv, i = e(a, l);
    } while (Al);
    return i;
  }
  function Uv() {
    var t = _.H, e = t.useState()[0];
    return e = typeof e.then == "function" ? Tn(e) : e, t = t.useState()[0], (Tt !== null ? Tt.memoizedState : null) !== t && (rt.flags |= 1024), e;
  }
  function Nc() {
    var t = Ui !== 0;
    return Ui = 0, t;
  }
  function Tc(t, e, a) {
    e.updateQueue = t.updateQueue, e.flags &= -2053, t.lanes &= ~a;
  }
  function Ec(t) {
    if (Ri) {
      for (t = t.memoizedState; t !== null; ) {
        var e = t.queue;
        e !== null && (e.pending = null), t = t.next;
      }
      Ri = !1;
    }
    ba = 0, kt = Tt = rt = null, Al = !1, Nn = Ui = 0, zl = null;
  }
  function se() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return kt === null ? rt.memoizedState = kt = t : kt = kt.next = t, kt;
  }
  function Yt() {
    if (Tt === null) {
      var t = rt.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = Tt.next;
    var e = kt === null ? rt.memoizedState : kt.next;
    if (e !== null)
      kt = e, Tt = t;
    else {
      if (t === null)
        throw rt.alternate === null ? Error(f(467)) : Error(f(310));
      Tt = t, t = {
        memoizedState: Tt.memoizedState,
        baseState: Tt.baseState,
        baseQueue: Tt.baseQueue,
        queue: Tt.queue,
        next: null
      }, kt === null ? rt.memoizedState = kt = t : kt = kt.next = t;
    }
    return kt;
  }
  function _c() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Tn(t) {
    var e = Nn;
    return Nn += 1, zl === null && (zl = []), t = fo(zl, t, e), e = rt, (kt === null ? e.memoizedState : kt.next) === null && (e = e.alternate, _.H = e === null || e.memoizedState === null ? tf : ef), t;
  }
  function wi(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return Tn(t);
      if (t.$$typeof === H) return te(t);
    }
    throw Error(f(438, String(t)));
  }
  function Ac(t) {
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
    if (e == null && (e = { data: [], index: 0 }), a === null && (a = _c(), rt.updateQueue = a), a.memoCache = e, a = e.data[e.index], a === void 0)
      for (a = e.data[e.index] = Array(t), l = 0; l < t; l++)
        a[l] = Be;
    return e.index++, a;
  }
  function aa(t, e) {
    return typeof e == "function" ? e(t) : e;
  }
  function qi(t) {
    var e = Yt();
    return zc(e, Tt, t);
  }
  function zc(t, e, a) {
    var l = t.queue;
    if (l === null) throw Error(f(311));
    l.lastRenderedReducer = a;
    var n = t.baseQueue, i = l.pending;
    if (i !== null) {
      if (n !== null) {
        var s = n.next;
        n.next = i.next, i.next = s;
      }
      e.baseQueue = n = i, l.pending = null;
    }
    if (i = t.baseState, n === null) t.memoizedState = i;
    else {
      e = n.next;
      var r = s = null, d = null, x = e, A = !1;
      do {
        var M = x.lane & -536870913;
        if (M !== x.lane ? (vt & M) === M : (ba & M) === M) {
          var S = x.revertLane;
          if (S === 0)
            d !== null && (d = d.next = {
              lane: 0,
              revertLane: 0,
              action: x.action,
              hasEagerState: x.hasEagerState,
              eagerState: x.eagerState,
              next: null
            }), M === Tl && (A = !0);
          else if ((ba & S) === S) {
            x = x.next, S === Tl && (A = !0);
            continue;
          } else
            M = {
              lane: 0,
              revertLane: x.revertLane,
              action: x.action,
              hasEagerState: x.hasEagerState,
              eagerState: x.eagerState,
              next: null
            }, d === null ? (r = d = M, s = i) : d = d.next = M, rt.lanes |= S, _a |= S;
          M = x.action, $a && a(i, M), i = x.hasEagerState ? x.eagerState : a(i, M);
        } else
          S = {
            lane: M,
            revertLane: x.revertLane,
            action: x.action,
            hasEagerState: x.hasEagerState,
            eagerState: x.eagerState,
            next: null
          }, d === null ? (r = d = S, s = i) : d = d.next = S, rt.lanes |= M, _a |= M;
        x = x.next;
      } while (x !== null && x !== e);
      if (d === null ? s = i : d.next = r, !de(i, t.memoizedState) && (Zt = !0, A && (a = El, a !== null)))
        throw a;
      t.memoizedState = i, t.baseState = s, t.baseQueue = d, l.lastRenderedState = i;
    }
    return n === null && (l.lanes = 0), [t.memoizedState, l.dispatch];
  }
  function Mc(t) {
    var e = Yt(), a = e.queue;
    if (a === null) throw Error(f(311));
    a.lastRenderedReducer = t;
    var l = a.dispatch, n = a.pending, i = e.memoizedState;
    if (n !== null) {
      a.pending = null;
      var s = n = n.next;
      do
        i = t(i, s.action), s = s.next;
      while (s !== n);
      de(i, e.memoizedState) || (Zt = !0), e.memoizedState = i, e.baseQueue === null && (e.baseState = i), a.lastRenderedState = i;
    }
    return [i, l];
  }
  function xo(t, e, a) {
    var l = rt, n = Yt(), i = pt;
    if (i) {
      if (a === void 0) throw Error(f(407));
      a = a();
    } else a = e();
    var s = !de(
      (Tt || n).memoizedState,
      a
    );
    s && (n.memoizedState = a, Zt = !0), n = n.queue;
    var r = No.bind(null, l, n, t);
    if (En(2048, 8, r, [t]), n.getSnapshot !== e || s || kt !== null && kt.memoizedState.tag & 1) {
      if (l.flags |= 2048, Ml(
        9,
        Ci(),
        jo.bind(
          null,
          l,
          n,
          a,
          e
        ),
        null
      ), Mt === null) throw Error(f(349));
      i || (ba & 124) !== 0 || So(l, e, a);
    }
    return a;
  }
  function So(t, e, a) {
    t.flags |= 16384, t = { getSnapshot: e, value: a }, e = rt.updateQueue, e === null ? (e = _c(), rt.updateQueue = e, e.stores = [t]) : (a = e.stores, a === null ? e.stores = [t] : a.push(t));
  }
  function jo(t, e, a, l) {
    e.value = a, e.getSnapshot = l, To(e) && Eo(t);
  }
  function No(t, e, a) {
    return a(function() {
      To(e) && Eo(t);
    });
  }
  function To(t) {
    var e = t.getSnapshot;
    t = t.value;
    try {
      var a = e();
      return !de(t, a);
    } catch {
      return !0;
    }
  }
  function Eo(t) {
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
  function _o(t, e, a, l) {
    return t.baseState = a, zc(
      t,
      Tt,
      typeof l == "function" ? l : aa
    );
  }
  function wv(t, e, a, l, n) {
    if (Bi(t)) throw Error(f(485));
    if (t = e.action, t !== null) {
      var i = {
        payload: n,
        action: t,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(s) {
          i.listeners.push(s);
        }
      };
      _.T !== null ? a(!0) : i.isTransition = !1, l(i), a = e.pending, a === null ? (i.next = e.pending = i, Ao(e, i)) : (i.next = a.next, e.pending = a.next = i);
    }
  }
  function Ao(t, e) {
    var a = e.action, l = e.payload, n = t.state;
    if (e.isTransition) {
      var i = _.T, s = {};
      _.T = s;
      try {
        var r = a(n, l), d = _.S;
        d !== null && d(s, r), zo(t, e, r);
      } catch (x) {
        Dc(t, e, x);
      } finally {
        _.T = i;
      }
    } else
      try {
        i = a(n, l), zo(t, e, i);
      } catch (x) {
        Dc(t, e, x);
      }
  }
  function zo(t, e, a) {
    a !== null && typeof a == "object" && typeof a.then == "function" ? a.then(
      function(l) {
        Mo(t, e, l);
      },
      function(l) {
        return Dc(t, e, l);
      }
    ) : Mo(t, e, a);
  }
  function Mo(t, e, a) {
    e.status = "fulfilled", e.value = a, Oo(e), t.state = a, e = t.pending, e !== null && (a = e.next, a === e ? t.pending = null : (a = a.next, e.next = a, Ao(t, a)));
  }
  function Dc(t, e, a) {
    var l = t.pending;
    if (t.pending = null, l !== null) {
      l = l.next;
      do
        e.status = "rejected", e.reason = a, Oo(e), e = e.next;
      while (e !== l);
    }
    t.action = null;
  }
  function Oo(t) {
    t = t.listeners;
    for (var e = 0; e < t.length; e++) (0, t[e])();
  }
  function Do(t, e) {
    return e;
  }
  function Ro(t, e) {
    if (pt) {
      var a = Mt.formState;
      if (a !== null) {
        t: {
          var l = rt;
          if (pt) {
            if (wt) {
              e: {
                for (var n = wt, i = Le; n.nodeType !== 8; ) {
                  if (!i) {
                    n = null;
                    break e;
                  }
                  if (n = Ce(
                    n.nextSibling
                  ), n === null) {
                    n = null;
                    break e;
                  }
                }
                i = n.data, n = i === "F!" || i === "F" ? n : null;
              }
              if (n) {
                wt = Ce(
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
      lastRenderedReducer: Do,
      lastRenderedState: e
    }, a.queue = l, a = Fo.bind(
      null,
      rt,
      l
    ), l.dispatch = a, l = Oc(!1), i = Cc.bind(
      null,
      rt,
      !1,
      l.queue
    ), l = se(), n = {
      state: e,
      dispatch: null,
      action: t,
      pending: null
    }, l.queue = n, a = wv.bind(
      null,
      rt,
      n,
      i,
      a
    ), n.dispatch = a, l.memoizedState = t, [e, a, !1];
  }
  function Uo(t) {
    var e = Yt();
    return wo(e, Tt, t);
  }
  function wo(t, e, a) {
    if (e = zc(
      t,
      e,
      Do
    )[0], t = qi(aa)[0], typeof e == "object" && e !== null && typeof e.then == "function")
      try {
        var l = Tn(e);
      } catch (s) {
        throw s === yn ? Mi : s;
      }
    else l = e;
    e = Yt();
    var n = e.queue, i = n.dispatch;
    return a !== e.memoizedState && (rt.flags |= 2048, Ml(
      9,
      Ci(),
      qv.bind(null, n, a),
      null
    )), [l, i, t];
  }
  function qv(t, e) {
    t.action = e;
  }
  function qo(t) {
    var e = Yt(), a = Tt;
    if (a !== null)
      return wo(e, a, t);
    Yt(), e = e.memoizedState, a = Yt();
    var l = a.queue.dispatch;
    return a.memoizedState = t, [e, l, !1];
  }
  function Ml(t, e, a, l) {
    return t = { tag: t, create: a, deps: l, inst: e, next: null }, e = rt.updateQueue, e === null && (e = _c(), rt.updateQueue = e), a = e.lastEffect, a === null ? e.lastEffect = t.next = t : (l = a.next, a.next = t, t.next = l, e.lastEffect = t), t;
  }
  function Ci() {
    return { destroy: void 0, resource: void 0 };
  }
  function Co() {
    return Yt().memoizedState;
  }
  function Hi(t, e, a, l) {
    var n = se();
    l = l === void 0 ? null : l, rt.flags |= t, n.memoizedState = Ml(
      1 | e,
      Ci(),
      a,
      l
    );
  }
  function En(t, e, a, l) {
    var n = Yt();
    l = l === void 0 ? null : l;
    var i = n.memoizedState.inst;
    Tt !== null && l !== null && Sc(l, Tt.memoizedState.deps) ? n.memoizedState = Ml(e, i, a, l) : (rt.flags |= t, n.memoizedState = Ml(
      1 | e,
      i,
      a,
      l
    ));
  }
  function Ho(t, e) {
    Hi(8390656, 8, t, e);
  }
  function Bo(t, e) {
    En(2048, 8, t, e);
  }
  function ko(t, e) {
    return En(4, 2, t, e);
  }
  function Yo(t, e) {
    return En(4, 4, t, e);
  }
  function Go(t, e) {
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
  function Lo(t, e, a) {
    a = a != null ? a.concat([t]) : null, En(4, 4, Go.bind(null, e, t), a);
  }
  function Rc() {
  }
  function Xo(t, e) {
    var a = Yt();
    e = e === void 0 ? null : e;
    var l = a.memoizedState;
    return e !== null && Sc(e, l[1]) ? l[0] : (a.memoizedState = [t, e], t);
  }
  function Qo(t, e) {
    var a = Yt();
    e = e === void 0 ? null : e;
    var l = a.memoizedState;
    if (e !== null && Sc(e, l[1]))
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
  function Uc(t, e, a) {
    return a === void 0 || (ba & 1073741824) !== 0 ? t.memoizedState = e : (t.memoizedState = a, t = Jf(), rt.lanes |= t, _a |= t, a);
  }
  function Zo(t, e, a, l) {
    return de(a, e) ? a : _l.current !== null ? (t = Uc(t, a, l), de(t, e) || (Zt = !0), t) : (ba & 42) === 0 ? (Zt = !0, t.memoizedState = a) : (t = Jf(), rt.lanes |= t, _a |= t, e);
  }
  function Vo(t, e, a, l, n) {
    var i = G.p;
    G.p = i !== 0 && 8 > i ? i : 8;
    var s = _.T, r = {};
    _.T = r, Cc(t, !1, e, a);
    try {
      var d = n(), x = _.S;
      if (x !== null && x(r, d), d !== null && typeof d == "object" && typeof d.then == "function") {
        var A = Dv(
          d,
          l
        );
        _n(
          t,
          e,
          A,
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
      G.p = i, _.T = s;
    }
  }
  function Cv() {
  }
  function wc(t, e, a, l) {
    if (t.tag !== 5) throw Error(f(476));
    var n = Ko(t).queue;
    Vo(
      t,
      n,
      e,
      et,
      a === null ? Cv : function() {
        return Jo(t), a(l);
      }
    );
  }
  function Ko(t) {
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
  function Jo(t) {
    var e = Ko(t).next.queue;
    _n(t, e, {}, ge());
  }
  function qc() {
    return te(Qn);
  }
  function $o() {
    return Yt().memoizedState;
  }
  function Wo() {
    return Yt().memoizedState;
  }
  function Hv(t) {
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
  function Bv(t, e, a) {
    var l = ge();
    a = {
      lane: l,
      revertLane: 0,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Bi(t) ? Po(e, a) : (a = ec(t, e, a, l), a !== null && (ye(a, t, l), Io(a, e, l)));
  }
  function Fo(t, e, a) {
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
    if (Bi(t)) Po(e, n);
    else {
      var i = t.alternate;
      if (t.lanes === 0 && (i === null || i.lanes === 0) && (i = e.lastRenderedReducer, i !== null))
        try {
          var s = e.lastRenderedState, r = i(s, a);
          if (n.hasEagerState = !0, n.eagerState = r, de(r, s))
            return Si(t, e, n, 0), Mt === null && xi(), !1;
        } catch {
        } finally {
        }
      if (a = ec(t, e, n, l), a !== null)
        return ye(a, t, l), Io(a, e, l), !0;
    }
    return !1;
  }
  function Cc(t, e, a, l) {
    if (l = {
      lane: 2,
      revertLane: vs(),
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Bi(t)) {
      if (e) throw Error(f(479));
    } else
      e = ec(
        t,
        a,
        l,
        2
      ), e !== null && ye(e, t, 2);
  }
  function Bi(t) {
    var e = t.alternate;
    return t === rt || e !== null && e === rt;
  }
  function Po(t, e) {
    Al = Ri = !0;
    var a = t.pending;
    a === null ? e.next = e : (e.next = a.next, a.next = e), t.pending = e;
  }
  function Io(t, e, a) {
    if ((a & 4194048) !== 0) {
      var l = e.lanes;
      l &= t.pendingLanes, a |= l, e.lanes = a, Il(t, a);
    }
  }
  var ki = {
    readContext: te,
    use: wi,
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
  }, tf = {
    readContext: te,
    use: wi,
    useCallback: function(t, e) {
      return se().memoizedState = [
        t,
        e === void 0 ? null : e
      ], t;
    },
    useContext: te,
    useEffect: Ho,
    useImperativeHandle: function(t, e, a) {
      a = a != null ? a.concat([t]) : null, Hi(
        4194308,
        4,
        Go.bind(null, e, t),
        a
      );
    },
    useLayoutEffect: function(t, e) {
      return Hi(4194308, 4, t, e);
    },
    useInsertionEffect: function(t, e) {
      Hi(4, 2, t, e);
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
      }, l.queue = t, t = t.dispatch = Bv.bind(
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
      var e = t.queue, a = Fo.bind(null, rt, e);
      return e.dispatch = a, [t.memoizedState, a];
    },
    useDebugValue: Rc,
    useDeferredValue: function(t, e) {
      var a = se();
      return Uc(a, t, e);
    },
    useTransition: function() {
      var t = Oc(!1);
      return t = Vo.bind(
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
        if (a = e(), Mt === null)
          throw Error(f(349));
        (vt & 124) !== 0 || So(l, e, a);
      }
      n.memoizedState = a;
      var i = { value: a, getSnapshot: e };
      return n.queue = i, Ho(No.bind(null, l, i, t), [
        t
      ]), l.flags |= 2048, Ml(
        9,
        Ci(),
        jo.bind(
          null,
          l,
          i,
          a,
          e
        ),
        null
      ), a;
    },
    useId: function() {
      var t = se(), e = Mt.identifierPrefix;
      if (pt) {
        var a = Ie, l = Pe;
        a = (l & ~(1 << 32 - $t(l) - 1)).toString(32) + a, e = "«" + e + "R" + a, a = Ui++, 0 < a && (e += "H" + a.toString(32)), e += "»";
      } else
        a = Rv++, e = "«" + e + "r" + a.toString(32) + "»";
      return t.memoizedState = e;
    },
    useHostTransitionStatus: qc,
    useFormState: Ro,
    useActionState: Ro,
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
    useMemoCache: Ac,
    useCacheRefresh: function() {
      return se().memoizedState = Hv.bind(
        null,
        rt
      );
    }
  }, ef = {
    readContext: te,
    use: wi,
    useCallback: Xo,
    useContext: te,
    useEffect: Bo,
    useImperativeHandle: Lo,
    useInsertionEffect: ko,
    useLayoutEffect: Yo,
    useMemo: Qo,
    useReducer: qi,
    useRef: Co,
    useState: function() {
      return qi(aa);
    },
    useDebugValue: Rc,
    useDeferredValue: function(t, e) {
      var a = Yt();
      return Zo(
        a,
        Tt.memoizedState,
        t,
        e
      );
    },
    useTransition: function() {
      var t = qi(aa)[0], e = Yt().memoizedState;
      return [
        typeof t == "boolean" ? t : Tn(t),
        e
      ];
    },
    useSyncExternalStore: xo,
    useId: $o,
    useHostTransitionStatus: qc,
    useFormState: Uo,
    useActionState: Uo,
    useOptimistic: function(t, e) {
      var a = Yt();
      return _o(a, Tt, t, e);
    },
    useMemoCache: Ac,
    useCacheRefresh: Wo
  }, kv = {
    readContext: te,
    use: wi,
    useCallback: Xo,
    useContext: te,
    useEffect: Bo,
    useImperativeHandle: Lo,
    useInsertionEffect: ko,
    useLayoutEffect: Yo,
    useMemo: Qo,
    useReducer: Mc,
    useRef: Co,
    useState: function() {
      return Mc(aa);
    },
    useDebugValue: Rc,
    useDeferredValue: function(t, e) {
      var a = Yt();
      return Tt === null ? Uc(a, t, e) : Zo(
        a,
        Tt.memoizedState,
        t,
        e
      );
    },
    useTransition: function() {
      var t = Mc(aa)[0], e = Yt().memoizedState;
      return [
        typeof t == "boolean" ? t : Tn(t),
        e
      ];
    },
    useSyncExternalStore: xo,
    useId: $o,
    useHostTransitionStatus: qc,
    useFormState: qo,
    useActionState: qo,
    useOptimistic: function(t, e) {
      var a = Yt();
      return Tt !== null ? _o(a, Tt, t, e) : (a.baseState = t, [t, a.queue.dispatch]);
    },
    useMemoCache: Ac,
    useCacheRefresh: Wo
  }, Ol = null, An = 0;
  function Yi(t) {
    var e = An;
    return An += 1, Ol === null && (Ol = []), fo(Ol, t, e);
  }
  function zn(t, e) {
    e = e.props.ref, t.ref = e !== void 0 ? e : null;
  }
  function Gi(t, e) {
    throw e.$$typeof === Y ? Error(f(525)) : (t = Object.prototype.toString.call(e), Error(
      f(
        31,
        t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t
      )
    ));
  }
  function af(t) {
    var e = t._init;
    return e(t._payload);
  }
  function lf(t) {
    function e(g, m) {
      if (t) {
        var y = g.deletions;
        y === null ? (g.deletions = [m], g.flags |= 16) : y.push(m);
      }
    }
    function a(g, m) {
      if (!t) return null;
      for (; m !== null; )
        e(g, m), m = m.sibling;
      return null;
    }
    function l(g) {
      for (var m = /* @__PURE__ */ new Map(); g !== null; )
        g.key !== null ? m.set(g.key, g) : m.set(g.index, g), g = g.sibling;
      return m;
    }
    function n(g, m) {
      return g = Fe(g, m), g.index = 0, g.sibling = null, g;
    }
    function i(g, m, y) {
      return g.index = y, t ? (y = g.alternate, y !== null ? (y = y.index, y < m ? (g.flags |= 67108866, m) : y) : (g.flags |= 67108866, m)) : (g.flags |= 1048576, m);
    }
    function s(g) {
      return t && g.alternate === null && (g.flags |= 67108866), g;
    }
    function r(g, m, y, z) {
      return m === null || m.tag !== 6 ? (m = lc(y, g.mode, z), m.return = g, m) : (m = n(m, y), m.return = g, m);
    }
    function d(g, m, y, z) {
      var V = y.type;
      return V === Z ? A(
        g,
        m,
        y.props.children,
        z,
        y.key
      ) : m !== null && (m.elementType === V || typeof V == "object" && V !== null && V.$$typeof === P && af(V) === m.type) ? (m = n(m, y.props), zn(m, y), m.return = g, m) : (m = Ni(
        y.type,
        y.key,
        y.props,
        null,
        g.mode,
        z
      ), zn(m, y), m.return = g, m);
    }
    function x(g, m, y, z) {
      return m === null || m.tag !== 4 || m.stateNode.containerInfo !== y.containerInfo || m.stateNode.implementation !== y.implementation ? (m = nc(y, g.mode, z), m.return = g, m) : (m = n(m, y.children || []), m.return = g, m);
    }
    function A(g, m, y, z, V) {
      return m === null || m.tag !== 7 ? (m = Ga(
        y,
        g.mode,
        z,
        V
      ), m.return = g, m) : (m = n(m, y), m.return = g, m);
    }
    function M(g, m, y) {
      if (typeof m == "string" && m !== "" || typeof m == "number" || typeof m == "bigint")
        return m = lc(
          "" + m,
          g.mode,
          y
        ), m.return = g, m;
      if (typeof m == "object" && m !== null) {
        switch (m.$$typeof) {
          case w:
            return y = Ni(
              m.type,
              m.key,
              m.props,
              null,
              g.mode,
              y
            ), zn(y, m), y.return = g, y;
          case B:
            return m = nc(
              m,
              g.mode,
              y
            ), m.return = g, m;
          case P:
            var z = m._init;
            return m = z(m._payload), M(g, m, y);
        }
        if (Ct(m) || Nt(m))
          return m = Ga(
            m,
            g.mode,
            y,
            null
          ), m.return = g, m;
        if (typeof m.then == "function")
          return M(g, Yi(m), y);
        if (m.$$typeof === H)
          return M(
            g,
            Ai(g, m),
            y
          );
        Gi(g, m);
      }
      return null;
    }
    function S(g, m, y, z) {
      var V = m !== null ? m.key : null;
      if (typeof y == "string" && y !== "" || typeof y == "number" || typeof y == "bigint")
        return V !== null ? null : r(g, m, "" + y, z);
      if (typeof y == "object" && y !== null) {
        switch (y.$$typeof) {
          case w:
            return y.key === V ? d(g, m, y, z) : null;
          case B:
            return y.key === V ? x(g, m, y, z) : null;
          case P:
            return V = y._init, y = V(y._payload), S(g, m, y, z);
        }
        if (Ct(y) || Nt(y))
          return V !== null ? null : A(g, m, y, z, null);
        if (typeof y.then == "function")
          return S(
            g,
            m,
            Yi(y),
            z
          );
        if (y.$$typeof === H)
          return S(
            g,
            m,
            Ai(g, y),
            z
          );
        Gi(g, y);
      }
      return null;
    }
    function N(g, m, y, z, V) {
      if (typeof z == "string" && z !== "" || typeof z == "number" || typeof z == "bigint")
        return g = g.get(y) || null, r(m, g, "" + z, V);
      if (typeof z == "object" && z !== null) {
        switch (z.$$typeof) {
          case w:
            return g = g.get(
              z.key === null ? y : z.key
            ) || null, d(m, g, z, V);
          case B:
            return g = g.get(
              z.key === null ? y : z.key
            ) || null, x(m, g, z, V);
          case P:
            var ot = z._init;
            return z = ot(z._payload), N(
              g,
              m,
              y,
              z,
              V
            );
        }
        if (Ct(z) || Nt(z))
          return g = g.get(y) || null, A(m, g, z, V, null);
        if (typeof z.then == "function")
          return N(
            g,
            m,
            y,
            Yi(z),
            V
          );
        if (z.$$typeof === H)
          return N(
            g,
            m,
            y,
            Ai(m, z),
            V
          );
        Gi(m, z);
      }
      return null;
    }
    function it(g, m, y, z) {
      for (var V = null, ot = null, $ = m, lt = m = 0, Kt = null; $ !== null && lt < y.length; lt++) {
        $.index > lt ? (Kt = $, $ = null) : Kt = $.sibling;
        var mt = S(
          g,
          $,
          y[lt],
          z
        );
        if (mt === null) {
          $ === null && ($ = Kt);
          break;
        }
        t && $ && mt.alternate === null && e(g, $), m = i(mt, m, lt), ot === null ? V = mt : ot.sibling = mt, ot = mt, $ = Kt;
      }
      if (lt === y.length)
        return a(g, $), pt && Xa(g, lt), V;
      if ($ === null) {
        for (; lt < y.length; lt++)
          $ = M(g, y[lt], z), $ !== null && (m = i(
            $,
            m,
            lt
          ), ot === null ? V = $ : ot.sibling = $, ot = $);
        return pt && Xa(g, lt), V;
      }
      for ($ = l($); lt < y.length; lt++)
        Kt = N(
          $,
          g,
          lt,
          y[lt],
          z
        ), Kt !== null && (t && Kt.alternate !== null && $.delete(
          Kt.key === null ? lt : Kt.key
        ), m = i(
          Kt,
          m,
          lt
        ), ot === null ? V = Kt : ot.sibling = Kt, ot = Kt);
      return t && $.forEach(function(qa) {
        return e(g, qa);
      }), pt && Xa(g, lt), V;
    }
    function at(g, m, y, z) {
      if (y == null) throw Error(f(151));
      for (var V = null, ot = null, $ = m, lt = m = 0, Kt = null, mt = y.next(); $ !== null && !mt.done; lt++, mt = y.next()) {
        $.index > lt ? (Kt = $, $ = null) : Kt = $.sibling;
        var qa = S(g, $, mt.value, z);
        if (qa === null) {
          $ === null && ($ = Kt);
          break;
        }
        t && $ && qa.alternate === null && e(g, $), m = i(qa, m, lt), ot === null ? V = qa : ot.sibling = qa, ot = qa, $ = Kt;
      }
      if (mt.done)
        return a(g, $), pt && Xa(g, lt), V;
      if ($ === null) {
        for (; !mt.done; lt++, mt = y.next())
          mt = M(g, mt.value, z), mt !== null && (m = i(mt, m, lt), ot === null ? V = mt : ot.sibling = mt, ot = mt);
        return pt && Xa(g, lt), V;
      }
      for ($ = l($); !mt.done; lt++, mt = y.next())
        mt = N($, g, lt, mt.value, z), mt !== null && (t && mt.alternate !== null && $.delete(mt.key === null ? lt : mt.key), m = i(mt, m, lt), ot === null ? V = mt : ot.sibling = mt, ot = mt);
      return t && $.forEach(function(Ym) {
        return e(g, Ym);
      }), pt && Xa(g, lt), V;
    }
    function _t(g, m, y, z) {
      if (typeof y == "object" && y !== null && y.type === Z && y.key === null && (y = y.props.children), typeof y == "object" && y !== null) {
        switch (y.$$typeof) {
          case w:
            t: {
              for (var V = y.key; m !== null; ) {
                if (m.key === V) {
                  if (V = y.type, V === Z) {
                    if (m.tag === 7) {
                      a(
                        g,
                        m.sibling
                      ), z = n(
                        m,
                        y.props.children
                      ), z.return = g, g = z;
                      break t;
                    }
                  } else if (m.elementType === V || typeof V == "object" && V !== null && V.$$typeof === P && af(V) === m.type) {
                    a(
                      g,
                      m.sibling
                    ), z = n(m, y.props), zn(z, y), z.return = g, g = z;
                    break t;
                  }
                  a(g, m);
                  break;
                } else e(g, m);
                m = m.sibling;
              }
              y.type === Z ? (z = Ga(
                y.props.children,
                g.mode,
                z,
                y.key
              ), z.return = g, g = z) : (z = Ni(
                y.type,
                y.key,
                y.props,
                null,
                g.mode,
                z
              ), zn(z, y), z.return = g, g = z);
            }
            return s(g);
          case B:
            t: {
              for (V = y.key; m !== null; ) {
                if (m.key === V)
                  if (m.tag === 4 && m.stateNode.containerInfo === y.containerInfo && m.stateNode.implementation === y.implementation) {
                    a(
                      g,
                      m.sibling
                    ), z = n(m, y.children || []), z.return = g, g = z;
                    break t;
                  } else {
                    a(g, m);
                    break;
                  }
                else e(g, m);
                m = m.sibling;
              }
              z = nc(y, g.mode, z), z.return = g, g = z;
            }
            return s(g);
          case P:
            return V = y._init, y = V(y._payload), _t(
              g,
              m,
              y,
              z
            );
        }
        if (Ct(y))
          return it(
            g,
            m,
            y,
            z
          );
        if (Nt(y)) {
          if (V = Nt(y), typeof V != "function") throw Error(f(150));
          return y = V.call(y), at(
            g,
            m,
            y,
            z
          );
        }
        if (typeof y.then == "function")
          return _t(
            g,
            m,
            Yi(y),
            z
          );
        if (y.$$typeof === H)
          return _t(
            g,
            m,
            Ai(g, y),
            z
          );
        Gi(g, y);
      }
      return typeof y == "string" && y !== "" || typeof y == "number" || typeof y == "bigint" ? (y = "" + y, m !== null && m.tag === 6 ? (a(g, m.sibling), z = n(m, y), z.return = g, g = z) : (a(g, m), z = lc(y, g.mode, z), z.return = g, g = z), s(g)) : a(g, m);
    }
    return function(g, m, y, z) {
      try {
        An = 0;
        var V = _t(
          g,
          m,
          y,
          z
        );
        return Ol = null, V;
      } catch ($) {
        if ($ === yn || $ === Mi) throw $;
        var ot = he(29, $, null, g.mode);
        return ot.lanes = z, ot.return = g, ot;
      } finally {
      }
    };
  }
  var Dl = lf(!0), nf = lf(!1), Ae = R(null), Xe = null;
  function xa(t) {
    var e = t.alternate;
    L(Lt, Lt.current & 1), L(Ae, t), Xe === null && (e === null || _l.current !== null || e.memoizedState !== null) && (Xe = t);
  }
  function uf(t) {
    if (t.tag === 22) {
      if (L(Lt, Lt.current), L(Ae, t), Xe === null) {
        var e = t.alternate;
        e !== null && e.memoizedState !== null && (Xe = t);
      }
    } else Sa();
  }
  function Sa() {
    L(Lt, Lt.current), L(Ae, Ae.current);
  }
  function la(t) {
    Q(Ae), Xe === t && (Xe = null), Q(Lt);
  }
  var Lt = R(0);
  function Li(t) {
    for (var e = t; e !== null; ) {
      if (e.tag === 13) {
        var a = e.memoizedState;
        if (a !== null && (a = a.dehydrated, a === null || a.data === "$?" || _s(a)))
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
  function Hc(t, e, a, l) {
    e = t.memoizedState, a = a(l, e), a = a == null ? e : U({}, e, a), t.memoizedState = a, t.lanes === 0 && (t.updateQueue.baseState = a);
  }
  var Bc = {
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
  function cf(t, e, a, l, n, i, s) {
    return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(l, i, s) : e.prototype && e.prototype.isPureReactComponent ? !on(a, l) || !on(n, i) : !0;
  }
  function sf(t, e, a, l) {
    t = e.state, typeof e.componentWillReceiveProps == "function" && e.componentWillReceiveProps(a, l), typeof e.UNSAFE_componentWillReceiveProps == "function" && e.UNSAFE_componentWillReceiveProps(a, l), e.state !== t && Bc.enqueueReplaceState(e, e.state, null);
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
  var Xi = typeof reportError == "function" ? reportError : function(t) {
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
  function rf(t) {
    Xi(t);
  }
  function of(t) {
    console.error(t);
  }
  function ff(t) {
    Xi(t);
  }
  function Qi(t, e) {
    try {
      var a = t.onUncaughtError;
      a(e.value, { componentStack: e.stack });
    } catch (l) {
      setTimeout(function() {
        throw l;
      });
    }
  }
  function df(t, e, a) {
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
  function kc(t, e, a) {
    return a = ga(a), a.tag = 3, a.payload = { element: null }, a.callback = function() {
      Qi(t, e);
    }, a;
  }
  function hf(t) {
    return t = ga(t), t.tag = 3, t;
  }
  function vf(t, e, a, l) {
    var n = a.type.getDerivedStateFromError;
    if (typeof n == "function") {
      var i = l.value;
      t.payload = function() {
        return n(i);
      }, t.callback = function() {
        df(e, a, l);
      };
    }
    var s = a.stateNode;
    s !== null && typeof s.componentDidCatch == "function" && (t.callback = function() {
      df(e, a, l), typeof n != "function" && (Aa === null ? Aa = /* @__PURE__ */ new Set([this]) : Aa.add(this));
      var r = l.stack;
      this.componentDidCatch(l.value, {
        componentStack: r !== null ? r : ""
      });
    });
  }
  function Yv(t, e, a, l, n) {
    if (a.flags |= 32768, l !== null && typeof l == "object" && typeof l.then == "function") {
      if (e = a.alternate, e !== null && mn(
        e,
        a,
        n,
        !0
      ), a = Ae.current, a !== null) {
        switch (a.tag) {
          case 13:
            return Xe === null ? rs() : a.alternate === null && qt === 0 && (qt = 3), a.flags &= -257, a.flags |= 65536, a.lanes = n, l === vc ? a.flags |= 16384 : (e = a.updateQueue, e === null ? a.updateQueue = /* @__PURE__ */ new Set([l]) : e.add(l), fs(t, l, n)), !1;
          case 22:
            return a.flags |= 65536, l === vc ? a.flags |= 16384 : (e = a.updateQueue, e === null ? (e = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([l])
            }, a.updateQueue = e) : (a = e.retryQueue, a === null ? e.retryQueue = /* @__PURE__ */ new Set([l]) : a.add(l)), fs(t, l, n)), !1;
        }
        throw Error(f(435, a.tag));
      }
      return fs(t, l, n), rs(), !1;
    }
    if (pt)
      return e = Ae.current, e !== null ? ((e.flags & 65536) === 0 && (e.flags |= 256), e.flags |= 65536, e.lanes = n, l !== cc && (t = Error(f(422), { cause: l }), vn(Ne(t, a)))) : (l !== cc && (e = Error(f(423), {
        cause: l
      }), vn(
        Ne(e, a)
      )), t = t.current.alternate, t.flags |= 65536, n &= -n, t.lanes |= n, l = Ne(l, a), n = kc(
        t.stateNode,
        l,
        n
      ), gc(t, n), qt !== 4 && (qt = 2)), !1;
    var i = Error(f(520), { cause: l });
    if (i = Ne(i, a), qn === null ? qn = [i] : qn.push(i), qt !== 4 && (qt = 2), e === null) return !0;
    l = Ne(l, a), a = e;
    do {
      switch (a.tag) {
        case 3:
          return a.flags |= 65536, t = n & -n, a.lanes |= t, t = kc(a.stateNode, l, t), gc(a, t), !1;
        case 1:
          if (e = a.type, i = a.stateNode, (a.flags & 128) === 0 && (typeof e.getDerivedStateFromError == "function" || i !== null && typeof i.componentDidCatch == "function" && (Aa === null || !Aa.has(i))))
            return a.flags |= 65536, n &= -n, a.lanes |= n, n = hf(n), vf(
              n,
              t,
              a,
              l
            ), gc(a, n), !1;
      }
      a = a.return;
    } while (a !== null);
    return !1;
  }
  var mf = Error(f(461)), Zt = !1;
  function Wt(t, e, a, l) {
    e.child = t === null ? nf(e, null, a, l) : Dl(
      e,
      t.child,
      a,
      l
    );
  }
  function pf(t, e, a, l, n) {
    a = a.render;
    var i = e.ref;
    if ("ref" in l) {
      var s = {};
      for (var r in l)
        r !== "ref" && (s[r] = l[r]);
    } else s = l;
    return Ka(e), l = jc(
      t,
      e,
      a,
      s,
      i,
      n
    ), r = Nc(), t !== null && !Zt ? (Tc(t, e, n), na(t, e, n)) : (pt && r && ic(e), e.flags |= 1, Wt(t, e, l, n), e.child);
  }
  function gf(t, e, a, l, n) {
    if (t === null) {
      var i = a.type;
      return typeof i == "function" && !ac(i) && i.defaultProps === void 0 && a.compare === null ? (e.tag = 15, e.type = i, yf(
        t,
        e,
        i,
        l,
        n
      )) : (t = Ni(
        a.type,
        null,
        l,
        e,
        e.mode,
        n
      ), t.ref = e.ref, t.return = e, e.child = t);
    }
    if (i = t.child, !Kc(t, n)) {
      var s = i.memoizedProps;
      if (a = a.compare, a = a !== null ? a : on, a(s, l) && t.ref === e.ref)
        return na(t, e, n);
    }
    return e.flags |= 1, t = Fe(i, l), t.ref = e.ref, t.return = e, e.child = t;
  }
  function yf(t, e, a, l, n) {
    if (t !== null) {
      var i = t.memoizedProps;
      if (on(i, l) && t.ref === e.ref)
        if (Zt = !1, e.pendingProps = l = i, Kc(t, n))
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
  function bf(t, e, a) {
    var l = e.pendingProps, n = l.children, i = t !== null ? t.memoizedState : null;
    if (l.mode === "hidden") {
      if ((e.flags & 128) !== 0) {
        if (l = i !== null ? i.baseLanes | a : a, t !== null) {
          for (n = e.child = t.child, i = 0; n !== null; )
            i = i | n.lanes | n.childLanes, n = n.sibling;
          e.childLanes = i & ~l;
        } else e.childLanes = 0, e.child = null;
        return xf(
          t,
          e,
          l,
          a
        );
      }
      if ((a & 536870912) !== 0)
        e.memoizedState = { baseLanes: 0, cachePool: null }, t !== null && zi(
          e,
          i !== null ? i.cachePool : null
        ), i !== null ? go(e, i) : bc(), uf(e);
      else
        return e.lanes = e.childLanes = 536870912, xf(
          t,
          e,
          i !== null ? i.baseLanes | a : a,
          a
        );
    } else
      i !== null ? (zi(e, i.cachePool), go(e, i), Sa(), e.memoizedState = null) : (t !== null && zi(e, null), bc(), Sa());
    return Wt(t, e, n, a), e.child;
  }
  function xf(t, e, a, l) {
    var n = hc();
    return n = n === null ? null : { parent: Gt._currentValue, pool: n }, e.memoizedState = {
      baseLanes: a,
      cachePool: n
    }, t !== null && zi(e, null), bc(), uf(e), t !== null && mn(t, e, l, !0), null;
  }
  function Zi(t, e) {
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
    return Ka(e), a = jc(
      t,
      e,
      a,
      l,
      void 0,
      n
    ), l = Nc(), t !== null && !Zt ? (Tc(t, e, n), na(t, e, n)) : (pt && l && ic(e), e.flags |= 1, Wt(t, e, a, n), e.child);
  }
  function Sf(t, e, a, l, n, i) {
    return Ka(e), e.updateQueue = null, a = bo(
      e,
      l,
      a,
      n
    ), yo(t), l = Nc(), t !== null && !Zt ? (Tc(t, e, i), na(t, e, i)) : (pt && l && ic(e), e.flags |= 1, Wt(t, e, a, i), e.child);
  }
  function jf(t, e, a, l, n) {
    if (Ka(e), e.stateNode === null) {
      var i = Sl, s = a.contextType;
      typeof s == "object" && s !== null && (i = te(s)), i = new a(l, i), e.memoizedState = i.state !== null && i.state !== void 0 ? i.state : null, i.updater = Bc, e.stateNode = i, i._reactInternals = e, i = e.stateNode, i.props = l, i.state = e.memoizedState, i.refs = {}, mc(e), s = a.contextType, i.context = typeof s == "object" && s !== null ? te(s) : Sl, i.state = e.memoizedState, s = a.getDerivedStateFromProps, typeof s == "function" && (Hc(
        e,
        a,
        s,
        l
      ), i.state = e.memoizedState), typeof a.getDerivedStateFromProps == "function" || typeof i.getSnapshotBeforeUpdate == "function" || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (s = i.state, typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount(), s !== i.state && Bc.enqueueReplaceState(i, i.state, null), jn(e, l, i, n), Sn(), i.state = e.memoizedState), typeof i.componentDidMount == "function" && (e.flags |= 4194308), l = !0;
    } else if (t === null) {
      i = e.stateNode;
      var r = e.memoizedProps, d = Wa(a, r);
      i.props = d;
      var x = i.context, A = a.contextType;
      s = Sl, typeof A == "object" && A !== null && (s = te(A));
      var M = a.getDerivedStateFromProps;
      A = typeof M == "function" || typeof i.getSnapshotBeforeUpdate == "function", r = e.pendingProps !== r, A || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (r || x !== s) && sf(
        e,
        i,
        l,
        s
      ), pa = !1;
      var S = e.memoizedState;
      i.state = S, jn(e, l, i, n), Sn(), x = e.memoizedState, r || S !== x || pa ? (typeof M == "function" && (Hc(
        e,
        a,
        M,
        l
      ), x = e.memoizedState), (d = pa || cf(
        e,
        a,
        d,
        l,
        S,
        x,
        s
      )) ? (A || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount()), typeof i.componentDidMount == "function" && (e.flags |= 4194308)) : (typeof i.componentDidMount == "function" && (e.flags |= 4194308), e.memoizedProps = l, e.memoizedState = x), i.props = l, i.state = x, i.context = s, l = d) : (typeof i.componentDidMount == "function" && (e.flags |= 4194308), l = !1);
    } else {
      i = e.stateNode, pc(t, e), s = e.memoizedProps, A = Wa(a, s), i.props = A, M = e.pendingProps, S = i.context, x = a.contextType, d = Sl, typeof x == "object" && x !== null && (d = te(x)), r = a.getDerivedStateFromProps, (x = typeof r == "function" || typeof i.getSnapshotBeforeUpdate == "function") || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (s !== M || S !== d) && sf(
        e,
        i,
        l,
        d
      ), pa = !1, S = e.memoizedState, i.state = S, jn(e, l, i, n), Sn();
      var N = e.memoizedState;
      s !== M || S !== N || pa || t !== null && t.dependencies !== null && _i(t.dependencies) ? (typeof r == "function" && (Hc(
        e,
        a,
        r,
        l
      ), N = e.memoizedState), (A = pa || cf(
        e,
        a,
        A,
        l,
        S,
        N,
        d
      ) || t !== null && t.dependencies !== null && _i(t.dependencies)) ? (x || typeof i.UNSAFE_componentWillUpdate != "function" && typeof i.componentWillUpdate != "function" || (typeof i.componentWillUpdate == "function" && i.componentWillUpdate(l, N, d), typeof i.UNSAFE_componentWillUpdate == "function" && i.UNSAFE_componentWillUpdate(
        l,
        N,
        d
      )), typeof i.componentDidUpdate == "function" && (e.flags |= 4), typeof i.getSnapshotBeforeUpdate == "function" && (e.flags |= 1024)) : (typeof i.componentDidUpdate != "function" || s === t.memoizedProps && S === t.memoizedState || (e.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || s === t.memoizedProps && S === t.memoizedState || (e.flags |= 1024), e.memoizedProps = l, e.memoizedState = N), i.props = l, i.state = N, i.context = d, l = A) : (typeof i.componentDidUpdate != "function" || s === t.memoizedProps && S === t.memoizedState || (e.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || s === t.memoizedProps && S === t.memoizedState || (e.flags |= 1024), l = !1);
    }
    return i = l, Zi(t, e), l = (e.flags & 128) !== 0, i || l ? (i = e.stateNode, a = l && typeof a.getDerivedStateFromError != "function" ? null : i.render(), e.flags |= 1, t !== null && l ? (e.child = Dl(
      e,
      t.child,
      null,
      n
    ), e.child = Dl(
      e,
      null,
      a,
      n
    )) : Wt(t, e, a, n), e.memoizedState = i.state, t = e.child) : t = na(
      t,
      e,
      n
    ), t;
  }
  function Nf(t, e, a, l) {
    return hn(), e.flags |= 256, Wt(t, e, a, l), e.child;
  }
  var Gc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Lc(t) {
    return { baseLanes: t, cachePool: so() };
  }
  function Xc(t, e, a) {
    return t = t !== null ? t.childLanes & ~a : 0, e && (t |= ze), t;
  }
  function Tf(t, e, a) {
    var l = e.pendingProps, n = !1, i = (e.flags & 128) !== 0, s;
    if ((s = i) || (s = t !== null && t.memoizedState === null ? !1 : (Lt.current & 2) !== 0), s && (n = !0, e.flags &= -129), s = (e.flags & 32) !== 0, e.flags &= -33, t === null) {
      if (pt) {
        if (n ? xa(e) : Sa(), pt) {
          var r = wt, d;
          if (d = r) {
            t: {
              for (d = r, r = Le; d.nodeType !== 8; ) {
                if (!r) {
                  r = null;
                  break t;
                }
                if (d = Ce(
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
            ), d.stateNode = r, d.return = e, e.child = d, le = e, wt = null, d = !0) : d = !1;
          }
          d || Za(e);
        }
        if (r = e.memoizedState, r !== null && (r = r.dehydrated, r !== null))
          return _s(r) ? e.lanes = 32 : e.lanes = 536870912, null;
        la(e);
      }
      return r = l.children, l = l.fallback, n ? (Sa(), n = e.mode, r = Vi(
        { mode: "hidden", children: r },
        n
      ), l = Ga(
        l,
        n,
        a,
        null
      ), r.return = e, l.return = e, r.sibling = l, e.child = r, n = e.child, n.memoizedState = Lc(a), n.childLanes = Xc(
        t,
        s,
        a
      ), e.memoizedState = Gc, l) : (xa(e), Qc(e, r));
    }
    if (d = t.memoizedState, d !== null && (r = d.dehydrated, r !== null)) {
      if (i)
        e.flags & 256 ? (xa(e), e.flags &= -257, e = Zc(
          t,
          e,
          a
        )) : e.memoizedState !== null ? (Sa(), e.child = t.child, e.flags |= 128, e = null) : (Sa(), n = l.fallback, r = e.mode, l = Vi(
          { mode: "visible", children: l.children },
          r
        ), n = Ga(
          n,
          r,
          a,
          null
        ), n.flags |= 2, l.return = e, n.return = e, l.sibling = n, e.child = l, Dl(
          e,
          t.child,
          null,
          a
        ), l = e.child, l.memoizedState = Lc(a), l.childLanes = Xc(
          t,
          s,
          a
        ), e.memoizedState = Gc, e = n);
      else if (xa(e), _s(r)) {
        if (s = r.nextSibling && r.nextSibling.dataset, s) var x = s.dgst;
        s = x, l = Error(f(419)), l.stack = "", l.digest = s, vn({ value: l, source: null, stack: null }), e = Zc(
          t,
          e,
          a
        );
      } else if (Zt || mn(t, e, a, !1), s = (a & t.childLanes) !== 0, Zt || s) {
        if (s = Mt, s !== null && (l = a & -a, l = (l & 42) !== 0 ? 1 : ul(l), l = (l & (s.suspendedLanes | a)) !== 0 ? 0 : l, l !== 0 && l !== d.retryLane))
          throw d.retryLane = l, xl(t, l), ye(s, t, l), mf;
        r.data === "$?" || rs(), e = Zc(
          t,
          e,
          a
        );
      } else
        r.data === "$?" ? (e.flags |= 192, e.child = t.child, e = null) : (t = d.treeContext, wt = Ce(
          r.nextSibling
        ), le = e, pt = !0, Qa = null, Le = !1, t !== null && (Ee[_e++] = Pe, Ee[_e++] = Ie, Ee[_e++] = La, Pe = t.id, Ie = t.overflow, La = e), e = Qc(
          e,
          l.children
        ), e.flags |= 4096);
      return e;
    }
    return n ? (Sa(), n = l.fallback, r = e.mode, d = t.child, x = d.sibling, l = Fe(d, {
      mode: "hidden",
      children: l.children
    }), l.subtreeFlags = d.subtreeFlags & 65011712, x !== null ? n = Fe(x, n) : (n = Ga(
      n,
      r,
      a,
      null
    ), n.flags |= 2), n.return = e, l.return = e, l.sibling = n, e.child = l, l = n, n = e.child, r = t.child.memoizedState, r === null ? r = Lc(a) : (d = r.cachePool, d !== null ? (x = Gt._currentValue, d = d.parent !== x ? { parent: x, pool: x } : d) : d = so(), r = {
      baseLanes: r.baseLanes | a,
      cachePool: d
    }), n.memoizedState = r, n.childLanes = Xc(
      t,
      s,
      a
    ), e.memoizedState = Gc, l) : (xa(e), a = t.child, t = a.sibling, a = Fe(a, {
      mode: "visible",
      children: l.children
    }), a.return = e, a.sibling = null, t !== null && (s = e.deletions, s === null ? (e.deletions = [t], e.flags |= 16) : s.push(t)), e.child = a, e.memoizedState = null, a);
  }
  function Qc(t, e) {
    return e = Vi(
      { mode: "visible", children: e },
      t.mode
    ), e.return = t, t.child = e;
  }
  function Vi(t, e) {
    return t = he(22, t, null, e), t.lanes = 0, t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }, t;
  }
  function Zc(t, e, a) {
    return Dl(e, t.child, null, a), t = Qc(
      e,
      e.pendingProps.children
    ), t.flags |= 2, e.memoizedState = null, t;
  }
  function Ef(t, e, a) {
    t.lanes |= e;
    var l = t.alternate;
    l !== null && (l.lanes |= e), rc(t.return, e, a);
  }
  function Vc(t, e, a, l, n) {
    var i = t.memoizedState;
    i === null ? t.memoizedState = {
      isBackwards: e,
      rendering: null,
      renderingStartTime: 0,
      last: l,
      tail: a,
      tailMode: n
    } : (i.isBackwards = e, i.rendering = null, i.renderingStartTime = 0, i.last = l, i.tail = a, i.tailMode = n);
  }
  function _f(t, e, a) {
    var l = e.pendingProps, n = l.revealOrder, i = l.tail;
    if (Wt(t, e, l.children, a), l = Lt.current, (l & 2) !== 0)
      l = l & 1 | 2, e.flags |= 128;
    else {
      if (t !== null && (t.flags & 128) !== 0)
        t: for (t = e.child; t !== null; ) {
          if (t.tag === 13)
            t.memoizedState !== null && Ef(t, a, e);
          else if (t.tag === 19)
            Ef(t, a, e);
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
    switch (L(Lt, l), n) {
      case "forwards":
        for (a = e.child, n = null; a !== null; )
          t = a.alternate, t !== null && Li(t) === null && (n = a), a = a.sibling;
        a = n, a === null ? (n = e.child, e.child = null) : (n = a.sibling, a.sibling = null), Vc(
          e,
          !1,
          n,
          a,
          i
        );
        break;
      case "backwards":
        for (a = null, n = e.child, e.child = null; n !== null; ) {
          if (t = n.alternate, t !== null && Li(t) === null) {
            e.child = n;
            break;
          }
          t = n.sibling, n.sibling = a, a = n, n = t;
        }
        Vc(
          e,
          !0,
          a,
          null,
          i
        );
        break;
      case "together":
        Vc(e, !1, null, null, void 0);
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
  function Kc(t, e) {
    return (t.lanes & e) !== 0 ? !0 : (t = t.dependencies, !!(t !== null && _i(t)));
  }
  function Gv(t, e, a) {
    switch (e.tag) {
      case 3:
        yt(e, e.stateNode.containerInfo), ma(e, Gt, t.memoizedState.cache), hn();
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
          return l.dehydrated !== null ? (xa(e), e.flags |= 128, null) : (a & e.child.childLanes) !== 0 ? Tf(t, e, a) : (xa(e), t = na(
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
            return _f(
              t,
              e,
              a
            );
          e.flags |= 128;
        }
        if (n = e.memoizedState, n !== null && (n.rendering = null, n.tail = null, n.lastEffect = null), L(Lt, Lt.current), l) break;
        return null;
      case 22:
      case 23:
        return e.lanes = 0, bf(t, e, a);
      case 24:
        ma(e, Gt, t.memoizedState.cache);
    }
    return na(t, e, a);
  }
  function Af(t, e, a) {
    if (t !== null)
      if (t.memoizedProps !== e.pendingProps)
        Zt = !0;
      else {
        if (!Kc(t, a) && (e.flags & 128) === 0)
          return Zt = !1, Gv(
            t,
            e,
            a
          );
        Zt = (t.flags & 131072) !== 0;
      }
    else
      Zt = !1, pt && (e.flags & 1048576) !== 0 && eo(e, Ei, e.index);
    switch (e.lanes = 0, e.tag) {
      case 16:
        t: {
          t = e.pendingProps;
          var l = e.elementType, n = l._init;
          if (l = n(l._payload), e.type = l, typeof l == "function")
            ac(l) ? (t = Wa(l, t), e.tag = 1, e = jf(
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
              if (n = l.$$typeof, n === W) {
                e.tag = 11, e = pf(
                  null,
                  e,
                  l,
                  t,
                  a
                );
                break t;
              } else if (n === C) {
                e.tag = 14, e = gf(
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
        ), jf(
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
          var i = e.memoizedState;
          n = i.element, pc(t, e), jn(e, l, null, a);
          var s = e.memoizedState;
          if (l = s.cache, ma(e, Gt, l), l !== i.cache && oc(
            e,
            [Gt],
            a,
            !0
          ), Sn(), l = s.element, i.isDehydrated)
            if (i = {
              element: l,
              isDehydrated: !1,
              cache: s.cache
            }, e.updateQueue.baseState = i, e.memoizedState = i, e.flags & 256) {
              e = Nf(
                t,
                e,
                l,
                a
              );
              break t;
            } else if (l !== n) {
              n = Ne(
                Error(f(424)),
                e
              ), vn(n), e = Nf(
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
              for (wt = Ce(t.firstChild), le = e, pt = !0, Qa = null, Le = !0, a = nf(
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
        return Zi(t, e), t === null ? (a = Dd(
          e.type,
          null,
          e.pendingProps,
          null
        )) ? e.memoizedState = a : pt || (a = e.type, t = e.pendingProps, l = uu(
          K.current
        ).createElement(a), l[Ot] = e, l[Xt] = t, Pt(l, a, t), Qt(l), e.stateNode = l) : e.memoizedState = Dd(
          e.type,
          t.memoizedProps,
          e.pendingProps,
          t.memoizedState
        ), null;
      case 27:
        return tl(e), t === null && pt && (l = e.stateNode = zd(
          e.type,
          e.pendingProps,
          K.current
        ), le = e, Le = !0, n = wt, Oa(e.type) ? (As = n, wt = Ce(
          l.firstChild
        )) : wt = n), Wt(
          t,
          e,
          e.pendingProps.children,
          a
        ), Zi(t, e), t === null && (e.flags |= 4194304), e.child;
      case 5:
        return t === null && pt && ((n = l = wt) && (l = mm(
          l,
          e.type,
          e.pendingProps,
          Le
        ), l !== null ? (e.stateNode = l, le = e, wt = Ce(
          l.firstChild
        ), Le = !1, n = !0) : n = !1), n || Za(e)), tl(e), n = e.type, i = e.pendingProps, s = t !== null ? t.memoizedProps : null, l = i.children, Ns(n, i) ? l = null : s !== null && Ns(n, s) && (e.flags |= 32), e.memoizedState !== null && (n = jc(
          t,
          e,
          Uv,
          null,
          null,
          a
        ), Qn._currentValue = n), Zi(t, e), Wt(t, e, l, a), e.child;
      case 6:
        return t === null && pt && ((t = a = wt) && (a = pm(
          a,
          e.pendingProps,
          Le
        ), a !== null ? (e.stateNode = a, le = e, wt = null, t = !0) : t = !1), t || Za(e)), null;
      case 13:
        return Tf(t, e, a);
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
        return pf(
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
        return gf(
          t,
          e,
          e.type,
          e.pendingProps,
          a
        );
      case 15:
        return yf(
          t,
          e,
          e.type,
          e.pendingProps,
          a
        );
      case 19:
        return _f(t, e, a);
      case 31:
        return l = e.pendingProps, a = e.mode, l = {
          mode: l.mode,
          children: l.children
        }, t === null ? (a = Vi(
          l,
          a
        ), a.ref = e.ref, e.child = a, a.return = e, e = a) : (a = Fe(t.child, l), a.ref = e.ref, e.child = a, a.return = e, e = a), e;
      case 22:
        return bf(t, e, a);
      case 24:
        return Ka(e), l = te(Gt), t === null ? (n = hc(), n === null && (n = Mt, i = fc(), n.pooledCache = i, i.refCount++, i !== null && (n.pooledCacheLanes |= a), n = i), e.memoizedState = {
          parent: l,
          cache: n
        }, mc(e), ma(e, Gt, n)) : ((t.lanes & a) !== 0 && (pc(t, e), jn(e, null, null, a), Sn()), n = t.memoizedState, i = e.memoizedState, n.parent !== l ? (n = { parent: l, cache: l }, e.memoizedState = n, e.lanes === 0 && (e.memoizedState = e.updateQueue.baseState = n), ma(e, Gt, l)) : (l = i.cache, ma(e, Gt, l), l !== n.cache && oc(
          e,
          [Gt],
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
  function ia(t) {
    t.flags |= 4;
  }
  function zf(t, e) {
    if (e.type !== "stylesheet" || (e.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (t.flags |= 16777216, !Cd(e)) {
      if (e = Ae.current, e !== null && ((vt & 4194048) === vt ? Xe !== null : (vt & 62914560) !== vt && (vt & 536870912) === 0 || e !== Xe))
        throw bn = vc, ro;
      t.flags |= 8192;
    }
  }
  function Ki(t, e) {
    e !== null && (t.flags |= 4), t.flags & 16384 && (e = t.tag !== 22 ? Fl() : 536870912, t.lanes |= e, ql |= e);
  }
  function Mn(t, e) {
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
  function Lv(t, e, a) {
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
        return a = e.stateNode, l = null, t !== null && (l = t.memoizedState.cache), e.memoizedState.cache !== l && (e.flags |= 2048), ea(Gt), ne(), a.pendingContext && (a.context = a.pendingContext, a.pendingContext = null), (t === null || t.child === null) && (dn(e) ? ia(e) : t === null || t.memoizedState.isDehydrated && (e.flags & 256) === 0 || (e.flags |= 1024, no())), Ut(e), null;
      case 26:
        return a = e.memoizedState, t === null ? (ia(e), a !== null ? (Ut(e), zf(e, a)) : (Ut(e), e.flags &= -16777217)) : a ? a !== t.memoizedState ? (ia(e), Ut(e), zf(e, a)) : (Ut(e), e.flags &= -16777217) : (t.memoizedProps !== l && ia(e), Ut(e), e.flags &= -16777217), null;
      case 27:
        ke(e), a = K.current;
        var n = e.type;
        if (t !== null && e.stateNode != null)
          t.memoizedProps !== l && ia(e);
        else {
          if (!l) {
            if (e.stateNode === null)
              throw Error(f(166));
            return Ut(e), null;
          }
          t = J.current, dn(e) ? ao(e) : (t = zd(n, l, a), e.stateNode = t, ia(e));
        }
        return Ut(e), null;
      case 5:
        if (ke(e), a = e.type, t !== null && e.stateNode != null)
          t.memoizedProps !== l && ia(e);
        else {
          if (!l) {
            if (e.stateNode === null)
              throw Error(f(166));
            return Ut(e), null;
          }
          if (t = J.current, dn(e))
            ao(e);
          else {
            switch (n = uu(
              K.current
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
            t && ia(e);
          }
        }
        return Ut(e), e.flags &= -16777217, null;
      case 6:
        if (t && e.stateNode != null)
          t.memoizedProps !== l && ia(e);
        else {
          if (typeof l != "string" && e.stateNode === null)
            throw Error(f(166));
          if (t = K.current, dn(e)) {
            if (t = e.stateNode, a = e.memoizedProps, l = null, n = le, n !== null)
              switch (n.tag) {
                case 27:
                case 5:
                  l = n.memoizedProps;
              }
            t[Ot] = e, t = !!(t.nodeValue === a || l !== null && l.suppressHydrationWarning === !0 || Sd(t.nodeValue, a)), t || Za(e);
          } else
            t = uu(t).createTextNode(
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
            n = no(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = n), n = !0;
          if (!n)
            return e.flags & 256 ? (la(e), e) : (la(e), null);
        }
        if (la(e), (e.flags & 128) !== 0)
          return e.lanes = a, e;
        if (a = l !== null, t = t !== null && t.memoizedState !== null, a) {
          l = e.child, n = null, l.alternate !== null && l.alternate.memoizedState !== null && l.alternate.memoizedState.cachePool !== null && (n = l.alternate.memoizedState.cachePool.pool);
          var i = null;
          l.memoizedState !== null && l.memoizedState.cachePool !== null && (i = l.memoizedState.cachePool.pool), i !== n && (l.flags |= 2048);
        }
        return a !== t && a && (e.child.flags |= 8192), Ki(e, e.updateQueue), Ut(e), null;
      case 4:
        return ne(), t === null && ys(e.stateNode.containerInfo), Ut(e), null;
      case 10:
        return ea(e.type), Ut(e), null;
      case 19:
        if (Q(Lt), n = e.memoizedState, n === null) return Ut(e), null;
        if (l = (e.flags & 128) !== 0, i = n.rendering, i === null)
          if (l) Mn(n, !1);
          else {
            if (qt !== 0 || t !== null && (t.flags & 128) !== 0)
              for (t = e.child; t !== null; ) {
                if (i = Li(t), i !== null) {
                  for (e.flags |= 128, Mn(n, !1), t = i.updateQueue, e.updateQueue = t, Ki(e, t), e.subtreeFlags = 0, t = a, a = e.child; a !== null; )
                    to(a, t), a = a.sibling;
                  return L(
                    Lt,
                    Lt.current & 1 | 2
                  ), e.child;
                }
                t = t.sibling;
              }
            n.tail !== null && xe() > Wi && (e.flags |= 128, l = !0, Mn(n, !1), e.lanes = 4194304);
          }
        else {
          if (!l)
            if (t = Li(i), t !== null) {
              if (e.flags |= 128, l = !0, t = t.updateQueue, e.updateQueue = t, Ki(e, t), Mn(n, !0), n.tail === null && n.tailMode === "hidden" && !i.alternate && !pt)
                return Ut(e), null;
            } else
              2 * xe() - n.renderingStartTime > Wi && a !== 536870912 && (e.flags |= 128, l = !0, Mn(n, !1), e.lanes = 4194304);
          n.isBackwards ? (i.sibling = e.child, e.child = i) : (t = n.last, t !== null ? t.sibling = i : e.child = i, n.last = i);
        }
        return n.tail !== null ? (e = n.tail, n.rendering = e, n.tail = e.sibling, n.renderingStartTime = xe(), e.sibling = null, t = Lt.current, L(Lt, l ? t & 1 | 2 : t & 1), e) : (Ut(e), null);
      case 22:
      case 23:
        return la(e), xc(), l = e.memoizedState !== null, t !== null ? t.memoizedState !== null !== l && (e.flags |= 8192) : l && (e.flags |= 8192), l ? (a & 536870912) !== 0 && (e.flags & 128) === 0 && (Ut(e), e.subtreeFlags & 6 && (e.flags |= 8192)) : Ut(e), a = e.updateQueue, a !== null && Ki(e, a.retryQueue), a = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (a = t.memoizedState.cachePool.pool), l = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (l = e.memoizedState.cachePool.pool), l !== a && (e.flags |= 2048), t !== null && Q(Ja), null;
      case 24:
        return a = null, t !== null && (a = t.memoizedState.cache), e.memoizedState.cache !== a && (e.flags |= 2048), ea(Gt), Ut(e), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(f(156, e.tag));
  }
  function Xv(t, e) {
    switch (uc(e), e.tag) {
      case 1:
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 3:
        return ea(Gt), ne(), t = e.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (e.flags = t & -65537 | 128, e) : null;
      case 26:
      case 27:
      case 5:
        return ke(e), null;
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
        return la(e), xc(), t !== null && Q(Ja), t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 24:
        return ea(Gt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Mf(t, e) {
    switch (uc(e), e.tag) {
      case 3:
        ea(Gt), ne();
        break;
      case 26:
      case 27:
      case 5:
        ke(e);
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
        la(e), xc(), t !== null && Q(Ja);
        break;
      case 24:
        ea(Gt);
    }
  }
  function On(t, e) {
    try {
      var a = e.updateQueue, l = a !== null ? a.lastEffect : null;
      if (l !== null) {
        var n = l.next;
        a = n;
        do {
          if ((a.tag & t) === t) {
            l = void 0;
            var i = a.create, s = a.inst;
            l = i(), s.destroy = l;
          }
          a = a.next;
        } while (a !== n);
      }
    } catch (r) {
      At(e, e.return, r);
    }
  }
  function ja(t, e, a) {
    try {
      var l = e.updateQueue, n = l !== null ? l.lastEffect : null;
      if (n !== null) {
        var i = n.next;
        l = i;
        do {
          if ((l.tag & t) === t) {
            var s = l.inst, r = s.destroy;
            if (r !== void 0) {
              s.destroy = void 0, n = e;
              var d = a, x = r;
              try {
                x();
              } catch (A) {
                At(
                  n,
                  d,
                  A
                );
              }
            }
          }
          l = l.next;
        } while (l !== i);
      }
    } catch (A) {
      At(e, e.return, A);
    }
  }
  function Of(t) {
    var e = t.updateQueue;
    if (e !== null) {
      var a = t.stateNode;
      try {
        po(e, a);
      } catch (l) {
        At(t, t.return, l);
      }
    }
  }
  function Df(t, e, a) {
    a.props = Wa(
      t.type,
      t.memoizedProps
    ), a.state = t.memoizedState;
    try {
      a.componentWillUnmount();
    } catch (l) {
      At(t, e, l);
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
      At(t, e, n);
    }
  }
  function Qe(t, e) {
    var a = t.ref, l = t.refCleanup;
    if (a !== null)
      if (typeof l == "function")
        try {
          l();
        } catch (n) {
          At(t, e, n);
        } finally {
          t.refCleanup = null, t = t.alternate, t != null && (t.refCleanup = null);
        }
      else if (typeof a == "function")
        try {
          a(null);
        } catch (n) {
          At(t, e, n);
        }
      else a.current = null;
  }
  function Rf(t) {
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
      At(t, t.return, n);
    }
  }
  function Jc(t, e, a) {
    try {
      var l = t.stateNode;
      om(l, t.type, a, e), l[Xt] = e;
    } catch (n) {
      At(t, t.return, n);
    }
  }
  function Uf(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && Oa(t.type) || t.tag === 4;
  }
  function $c(t) {
    t: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || Uf(t.return)) return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
        if (t.tag === 27 && Oa(t.type) || t.flags & 2 || t.child === null || t.tag === 4) continue t;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function Wc(t, e, a) {
    var l = t.tag;
    if (l === 5 || l === 6)
      t = t.stateNode, e ? (a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a).insertBefore(t, e) : (e = a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a, e.appendChild(t), a = a._reactRootContainer, a != null || e.onclick !== null || (e.onclick = iu));
    else if (l !== 4 && (l === 27 && Oa(t.type) && (a = t.stateNode, e = null), t = t.child, t !== null))
      for (Wc(t, e, a), t = t.sibling; t !== null; )
        Wc(t, e, a), t = t.sibling;
  }
  function Ji(t, e, a) {
    var l = t.tag;
    if (l === 5 || l === 6)
      t = t.stateNode, e ? a.insertBefore(t, e) : a.appendChild(t);
    else if (l !== 4 && (l === 27 && Oa(t.type) && (a = t.stateNode), t = t.child, t !== null))
      for (Ji(t, e, a), t = t.sibling; t !== null; )
        Ji(t, e, a), t = t.sibling;
  }
  function wf(t) {
    var e = t.stateNode, a = t.memoizedProps;
    try {
      for (var l = t.type, n = e.attributes; n.length; )
        e.removeAttributeNode(n[0]);
      Pt(e, l, a), e[Ot] = t, e[Xt] = a;
    } catch (i) {
      At(t, t.return, i);
    }
  }
  var ua = !1, Bt = !1, Fc = !1, qf = typeof WeakSet == "function" ? WeakSet : Set, Vt = null;
  function Qv(t, e) {
    if (t = t.containerInfo, Ss = du, t = Qr(t), $u(t)) {
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
            var n = l.anchorOffset, i = l.focusNode;
            l = l.focusOffset;
            try {
              a.nodeType, i.nodeType;
            } catch {
              a = null;
              break t;
            }
            var s = 0, r = -1, d = -1, x = 0, A = 0, M = t, S = null;
            e: for (; ; ) {
              for (var N; M !== a || n !== 0 && M.nodeType !== 3 || (r = s + n), M !== i || l !== 0 && M.nodeType !== 3 || (d = s + l), M.nodeType === 3 && (s += M.nodeValue.length), (N = M.firstChild) !== null; )
                S = M, M = N;
              for (; ; ) {
                if (M === t) break e;
                if (S === a && ++x === n && (r = s), S === i && ++A === l && (d = s), (N = M.nextSibling) !== null) break;
                M = S, S = M.parentNode;
              }
              M = N;
            }
            a = r === -1 || d === -1 ? null : { start: r, end: d };
          } else a = null;
        }
      a = a || { start: 0, end: 0 };
    } else a = null;
    for (js = { focusedElem: t, selectionRange: a }, du = !1, Vt = e; Vt !== null; )
      if (e = Vt, t = e.child, (e.subtreeFlags & 1024) !== 0 && t !== null)
        t.return = e, Vt = t;
      else
        for (; Vt !== null; ) {
          switch (e = Vt, i = e.alternate, t = e.flags, e.tag) {
            case 0:
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((t & 1024) !== 0 && i !== null) {
                t = void 0, a = e, n = i.memoizedProps, i = i.memoizedState, l = a.stateNode;
                try {
                  var it = Wa(
                    a.type,
                    n,
                    a.elementType === a.type
                  );
                  t = l.getSnapshotBeforeUpdate(
                    it,
                    i
                  ), l.__reactInternalSnapshotBeforeUpdate = t;
                } catch (at) {
                  At(
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
  function Cf(t, e, a) {
    var l = a.flags;
    switch (a.tag) {
      case 0:
      case 11:
      case 15:
        Na(t, a), l & 4 && On(5, a);
        break;
      case 1:
        if (Na(t, a), l & 4)
          if (t = a.stateNode, e === null)
            try {
              t.componentDidMount();
            } catch (s) {
              At(a, a.return, s);
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
            } catch (s) {
              At(
                a,
                a.return,
                s
              );
            }
          }
        l & 64 && Of(a), l & 512 && Dn(a, a.return);
        break;
      case 3:
        if (Na(t, a), l & 64 && (t = a.updateQueue, t !== null)) {
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
            po(t, e);
          } catch (s) {
            At(a, a.return, s);
          }
        }
        break;
      case 27:
        e === null && l & 4 && wf(a);
      case 26:
      case 5:
        Na(t, a), e === null && l & 4 && Rf(a), l & 512 && Dn(a, a.return);
        break;
      case 12:
        Na(t, a);
        break;
      case 13:
        Na(t, a), l & 4 && kf(t, a), l & 64 && (t = a.memoizedState, t !== null && (t = t.dehydrated, t !== null && (a = Iv.bind(
          null,
          a
        ), gm(t, a))));
        break;
      case 22:
        if (l = a.memoizedState !== null || ua, !l) {
          e = e !== null && e.memoizedState !== null || Bt, n = ua;
          var i = Bt;
          ua = l, (Bt = e) && !i ? Ta(
            t,
            a,
            (a.subtreeFlags & 8772) !== 0
          ) : Na(t, a), ua = n, Bt = i;
        }
        break;
      case 30:
        break;
      default:
        Na(t, a);
    }
  }
  function Hf(t) {
    var e = t.alternate;
    e !== null && (t.alternate = null, Hf(e)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (e = t.stateNode, e !== null && Ou(e)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
  }
  var Dt = null, re = !1;
  function ca(t, e, a) {
    for (a = a.child; a !== null; )
      Bf(t, e, a), a = a.sibling;
  }
  function Bf(t, e, a) {
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
        var l = Dt, n = re;
        Oa(a.type) && (Dt = a.stateNode, re = !1), ca(
          t,
          e,
          a
        ), Yn(a.stateNode), Dt = l, re = n;
        break;
      case 5:
        Bt || Qe(a, e);
      case 6:
        if (l = Dt, n = re, Dt = null, ca(
          t,
          e,
          a
        ), Dt = l, re = n, Dt !== null)
          if (re)
            try {
              (Dt.nodeType === 9 ? Dt.body : Dt.nodeName === "HTML" ? Dt.ownerDocument.body : Dt).removeChild(a.stateNode);
            } catch (i) {
              At(
                a,
                e,
                i
              );
            }
          else
            try {
              Dt.removeChild(a.stateNode);
            } catch (i) {
              At(
                a,
                e,
                i
              );
            }
        break;
      case 18:
        Dt !== null && (re ? (t = Dt, _d(
          t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t,
          a.stateNode
        ), Jn(t)) : _d(Dt, a.stateNode));
        break;
      case 4:
        l = Dt, n = re, Dt = a.stateNode.containerInfo, re = !0, ca(
          t,
          e,
          a
        ), Dt = l, re = n;
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
        Bt || (Qe(a, e), l = a.stateNode, typeof l.componentWillUnmount == "function" && Df(
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
  function kf(t, e) {
    if (e.memoizedState === null && (t = e.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null))))
      try {
        Jn(t);
      } catch (a) {
        At(e, e.return, a);
      }
  }
  function Zv(t) {
    switch (t.tag) {
      case 13:
      case 19:
        var e = t.stateNode;
        return e === null && (e = t.stateNode = new qf()), e;
      case 22:
        return t = t.stateNode, e = t._retryCache, e === null && (e = t._retryCache = new qf()), e;
      default:
        throw Error(f(435, t.tag));
    }
  }
  function Pc(t, e) {
    var a = Zv(t);
    e.forEach(function(l) {
      var n = tm.bind(null, t, l);
      a.has(l) || (a.add(l), l.then(n, n));
    });
  }
  function ve(t, e) {
    var a = e.deletions;
    if (a !== null)
      for (var l = 0; l < a.length; l++) {
        var n = a[l], i = t, s = e, r = s;
        t: for (; r !== null; ) {
          switch (r.tag) {
            case 27:
              if (Oa(r.type)) {
                Dt = r.stateNode, re = !1;
                break t;
              }
              break;
            case 5:
              Dt = r.stateNode, re = !1;
              break t;
            case 3:
            case 4:
              Dt = r.stateNode.containerInfo, re = !0;
              break t;
          }
          r = r.return;
        }
        if (Dt === null) throw Error(f(160));
        Bf(i, s, n), Dt = null, re = !1, i = n.alternate, i !== null && (i.return = null), n.return = null;
      }
    if (e.subtreeFlags & 13878)
      for (e = e.child; e !== null; )
        Yf(e, t), e = e.sibling;
  }
  var qe = null;
  function Yf(t, e) {
    var a = t.alternate, l = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        ve(e, t), me(t), l & 4 && (ja(3, t, t.return), On(3, t), ja(5, t, t.return));
        break;
      case 1:
        ve(e, t), me(t), l & 512 && (Bt || a === null || Qe(a, a.return)), l & 64 && ua && (t = t.updateQueue, t !== null && (l = t.callbacks, l !== null && (a = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = a === null ? l : a.concat(l))));
        break;
      case 26:
        var n = qe;
        if (ve(e, t), me(t), l & 512 && (Bt || a === null || Qe(a, a.return)), l & 4) {
          var i = a !== null ? a.memoizedState : null;
          if (l = t.memoizedState, a === null)
            if (l === null)
              if (t.stateNode === null) {
                t: {
                  l = t.type, a = t.memoizedProps, n = n.ownerDocument || n;
                  e: switch (l) {
                    case "title":
                      i = n.getElementsByTagName("title")[0], (!i || i[tn] || i[Ot] || i.namespaceURI === "http://www.w3.org/2000/svg" || i.hasAttribute("itemprop")) && (i = n.createElement(l), n.head.insertBefore(
                        i,
                        n.querySelector("head > title")
                      )), Pt(i, l, a), i[Ot] = t, Qt(i), l = i;
                      break t;
                    case "link":
                      var s = wd(
                        "link",
                        "href",
                        n
                      ).get(l + (a.href || ""));
                      if (s) {
                        for (var r = 0; r < s.length; r++)
                          if (i = s[r], i.getAttribute("href") === (a.href == null || a.href === "" ? null : a.href) && i.getAttribute("rel") === (a.rel == null ? null : a.rel) && i.getAttribute("title") === (a.title == null ? null : a.title) && i.getAttribute("crossorigin") === (a.crossOrigin == null ? null : a.crossOrigin)) {
                            s.splice(r, 1);
                            break e;
                          }
                      }
                      i = n.createElement(l), Pt(i, l, a), n.head.appendChild(i);
                      break;
                    case "meta":
                      if (s = wd(
                        "meta",
                        "content",
                        n
                      ).get(l + (a.content || ""))) {
                        for (r = 0; r < s.length; r++)
                          if (i = s[r], i.getAttribute("content") === (a.content == null ? null : "" + a.content) && i.getAttribute("name") === (a.name == null ? null : a.name) && i.getAttribute("property") === (a.property == null ? null : a.property) && i.getAttribute("http-equiv") === (a.httpEquiv == null ? null : a.httpEquiv) && i.getAttribute("charset") === (a.charSet == null ? null : a.charSet)) {
                            s.splice(r, 1);
                            break e;
                          }
                      }
                      i = n.createElement(l), Pt(i, l, a), n.head.appendChild(i);
                      break;
                    default:
                      throw Error(f(468, l));
                  }
                  i[Ot] = t, Qt(i), l = i;
                }
                t.stateNode = l;
              } else
                qd(
                  n,
                  t.type,
                  t.stateNode
                );
            else
              t.stateNode = Ud(
                n,
                l,
                t.memoizedProps
              );
          else
            i !== l ? (i === null ? a.stateNode !== null && (a = a.stateNode, a.parentNode.removeChild(a)) : i.count--, l === null ? qd(
              n,
              t.type,
              t.stateNode
            ) : Ud(
              n,
              l,
              t.memoizedProps
            )) : l === null && t.stateNode !== null && Jc(
              t,
              t.memoizedProps,
              a.memoizedProps
            );
        }
        break;
      case 27:
        ve(e, t), me(t), l & 512 && (Bt || a === null || Qe(a, a.return)), a !== null && l & 4 && Jc(
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
          } catch (N) {
            At(t, t.return, N);
          }
        }
        l & 4 && t.stateNode != null && (n = t.memoizedProps, Jc(
          t,
          n,
          a !== null ? a.memoizedProps : n
        )), l & 1024 && (Fc = !0);
        break;
      case 6:
        if (ve(e, t), me(t), l & 4) {
          if (t.stateNode === null)
            throw Error(f(162));
          l = t.memoizedProps, a = t.stateNode;
          try {
            a.nodeValue = l;
          } catch (N) {
            At(t, t.return, N);
          }
        }
        break;
      case 3:
        if (ru = null, n = qe, qe = cu(e.containerInfo), ve(e, t), qe = n, me(t), l & 4 && a !== null && a.memoizedState.isDehydrated)
          try {
            Jn(e.containerInfo);
          } catch (N) {
            At(t, t.return, N);
          }
        Fc && (Fc = !1, Gf(t));
        break;
      case 4:
        l = qe, qe = cu(
          t.stateNode.containerInfo
        ), ve(e, t), me(t), qe = l;
        break;
      case 12:
        ve(e, t), me(t);
        break;
      case 13:
        ve(e, t), me(t), t.child.flags & 8192 && t.memoizedState !== null != (a !== null && a.memoizedState !== null) && (ns = xe()), l & 4 && (l = t.updateQueue, l !== null && (t.updateQueue = null, Pc(t, l)));
        break;
      case 22:
        n = t.memoizedState !== null;
        var d = a !== null && a.memoizedState !== null, x = ua, A = Bt;
        if (ua = x || n, Bt = A || d, ve(e, t), Bt = A, ua = x, me(t), l & 8192)
          t: for (e = t.stateNode, e._visibility = n ? e._visibility & -2 : e._visibility | 1, n && (a === null || d || ua || Bt || Fa(t)), a = null, e = t; ; ) {
            if (e.tag === 5 || e.tag === 26) {
              if (a === null) {
                d = a = e;
                try {
                  if (i = d.stateNode, n)
                    s = i.style, typeof s.setProperty == "function" ? s.setProperty("display", "none", "important") : s.display = "none";
                  else {
                    r = d.stateNode;
                    var M = d.memoizedProps.style, S = M != null && M.hasOwnProperty("display") ? M.display : null;
                    r.style.display = S == null || typeof S == "boolean" ? "" : ("" + S).trim();
                  }
                } catch (N) {
                  At(d, d.return, N);
                }
              }
            } else if (e.tag === 6) {
              if (a === null) {
                d = e;
                try {
                  d.stateNode.nodeValue = n ? "" : d.memoizedProps;
                } catch (N) {
                  At(d, d.return, N);
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
        l & 4 && (l = t.updateQueue, l !== null && (a = l.retryQueue, a !== null && (l.retryQueue = null, Pc(t, a))));
        break;
      case 19:
        ve(e, t), me(t), l & 4 && (l = t.updateQueue, l !== null && (t.updateQueue = null, Pc(t, l)));
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
          if (Uf(l)) {
            a = l;
            break;
          }
          l = l.return;
        }
        if (a == null) throw Error(f(160));
        switch (a.tag) {
          case 27:
            var n = a.stateNode, i = $c(t);
            Ji(t, i, n);
            break;
          case 5:
            var s = a.stateNode;
            a.flags & 32 && (hl(s, ""), a.flags &= -33);
            var r = $c(t);
            Ji(t, r, s);
            break;
          case 3:
          case 4:
            var d = a.stateNode.containerInfo, x = $c(t);
            Wc(
              t,
              x,
              d
            );
            break;
          default:
            throw Error(f(161));
        }
      } catch (A) {
        At(t, t.return, A);
      }
      t.flags &= -3;
    }
    e & 4096 && (t.flags &= -4097);
  }
  function Gf(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var e = t;
        Gf(e), e.tag === 5 && e.flags & 1024 && e.stateNode.reset(), t = t.sibling;
      }
  }
  function Na(t, e) {
    if (e.subtreeFlags & 8772)
      for (e = e.child; e !== null; )
        Cf(t, e.alternate, e), e = e.sibling;
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
          typeof a.componentWillUnmount == "function" && Df(
            e,
            e.return,
            a
          ), Fa(e);
          break;
        case 27:
          Yn(e.stateNode);
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
  function Ta(t, e, a) {
    for (a = a && (e.subtreeFlags & 8772) !== 0, e = e.child; e !== null; ) {
      var l = e.alternate, n = t, i = e, s = i.flags;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          Ta(
            n,
            i,
            a
          ), On(4, i);
          break;
        case 1:
          if (Ta(
            n,
            i,
            a
          ), l = i, n = l.stateNode, typeof n.componentDidMount == "function")
            try {
              n.componentDidMount();
            } catch (x) {
              At(l, l.return, x);
            }
          if (l = i, n = l.updateQueue, n !== null) {
            var r = l.stateNode;
            try {
              var d = n.shared.hiddenCallbacks;
              if (d !== null)
                for (n.shared.hiddenCallbacks = null, n = 0; n < d.length; n++)
                  mo(d[n], r);
            } catch (x) {
              At(l, l.return, x);
            }
          }
          a && s & 64 && Of(i), Dn(i, i.return);
          break;
        case 27:
          wf(i);
        case 26:
        case 5:
          Ta(
            n,
            i,
            a
          ), a && l === null && s & 4 && Rf(i), Dn(i, i.return);
          break;
        case 12:
          Ta(
            n,
            i,
            a
          );
          break;
        case 13:
          Ta(
            n,
            i,
            a
          ), a && s & 4 && kf(n, i);
          break;
        case 22:
          i.memoizedState === null && Ta(
            n,
            i,
            a
          ), Dn(i, i.return);
          break;
        case 30:
          break;
        default:
          Ta(
            n,
            i,
            a
          );
      }
      e = e.sibling;
    }
  }
  function Ic(t, e) {
    var a = null;
    t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (a = t.memoizedState.cachePool.pool), t = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (t = e.memoizedState.cachePool.pool), t !== a && (t != null && t.refCount++, a != null && pn(a));
  }
  function ts(t, e) {
    t = null, e.alternate !== null && (t = e.alternate.memoizedState.cache), e = e.memoizedState.cache, e !== t && (e.refCount++, t != null && pn(t));
  }
  function Ze(t, e, a, l) {
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        Lf(
          t,
          e,
          a,
          l
        ), e = e.sibling;
  }
  function Lf(t, e, a, l) {
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
        ), n & 2048 && On(9, e);
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
            var i = e.memoizedProps, s = i.id, r = i.onPostCommit;
            typeof r == "function" && r(
              s,
              e.alternate === null ? "mount" : "update",
              t.passiveEffectDuration,
              -0
            );
          } catch (d) {
            At(e, e.return, d);
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
        i = e.stateNode, s = e.alternate, e.memoizedState !== null ? i._visibility & 2 ? Ze(
          t,
          e,
          a,
          l
        ) : Rn(t, e) : i._visibility & 2 ? Ze(
          t,
          e,
          a,
          l
        ) : (i._visibility |= 2, Rl(
          t,
          e,
          a,
          l,
          (e.subtreeFlags & 10256) !== 0
        )), n & 2048 && Ic(s, e);
        break;
      case 24:
        Ze(
          t,
          e,
          a,
          l
        ), n & 2048 && ts(e.alternate, e);
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
      var i = t, s = e, r = a, d = l, x = s.flags;
      switch (s.tag) {
        case 0:
        case 11:
        case 15:
          Rl(
            i,
            s,
            r,
            d,
            n
          ), On(8, s);
          break;
        case 23:
          break;
        case 22:
          var A = s.stateNode;
          s.memoizedState !== null ? A._visibility & 2 ? Rl(
            i,
            s,
            r,
            d,
            n
          ) : Rn(
            i,
            s
          ) : (A._visibility |= 2, Rl(
            i,
            s,
            r,
            d,
            n
          )), n && x & 2048 && Ic(
            s.alternate,
            s
          );
          break;
        case 24:
          Rl(
            i,
            s,
            r,
            d,
            n
          ), n && x & 2048 && ts(s.alternate, s);
          break;
        default:
          Rl(
            i,
            s,
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
            Rn(a, l), n & 2048 && Ic(
              l.alternate,
              l
            );
            break;
          case 24:
            Rn(a, l), n & 2048 && ts(l.alternate, l);
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
        Xf(t), t = t.sibling;
  }
  function Xf(t) {
    switch (t.tag) {
      case 26:
        Ul(t), t.flags & Un && t.memoizedState !== null && Om(
          qe,
          t.memoizedState,
          t.memoizedProps
        );
        break;
      case 5:
        Ul(t);
        break;
      case 3:
      case 4:
        var e = qe;
        qe = cu(t.stateNode.containerInfo), Ul(t), qe = e;
        break;
      case 22:
        t.memoizedState === null && (e = t.alternate, e !== null && e.memoizedState !== null ? (e = Un, Un = 16777216, Ul(t), Un = e) : Ul(t));
        break;
      default:
        Ul(t);
    }
  }
  function Qf(t) {
    var e = t.alternate;
    if (e !== null && (t = e.child, t !== null)) {
      e.child = null;
      do
        e = t.sibling, t.sibling = null, t = e;
      while (t !== null);
    }
  }
  function wn(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var a = 0; a < e.length; a++) {
          var l = e[a];
          Vt = l, Vf(
            l,
            t
          );
        }
      Qf(t);
    }
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        Zf(t), t = t.sibling;
  }
  function Zf(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        wn(t), t.flags & 2048 && ja(9, t, t.return);
        break;
      case 3:
        wn(t);
        break;
      case 12:
        wn(t);
        break;
      case 22:
        var e = t.stateNode;
        t.memoizedState !== null && e._visibility & 2 && (t.return === null || t.return.tag !== 13) ? (e._visibility &= -3, $i(t)) : wn(t);
        break;
      default:
        wn(t);
    }
  }
  function $i(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var a = 0; a < e.length; a++) {
          var l = e[a];
          Vt = l, Vf(
            l,
            t
          );
        }
      Qf(t);
    }
    for (t = t.child; t !== null; ) {
      switch (e = t, e.tag) {
        case 0:
        case 11:
        case 15:
          ja(8, e, e.return), $i(e);
          break;
        case 22:
          a = e.stateNode, a._visibility & 2 && (a._visibility &= -3, $i(e));
          break;
        default:
          $i(e);
      }
      t = t.sibling;
    }
  }
  function Vf(t, e) {
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
          var n = l.sibling, i = l.return;
          if (Hf(l), l === a) {
            Vt = null;
            break t;
          }
          if (n !== null) {
            n.return = i, Vt = n;
            break t;
          }
          Vt = i;
        }
    }
  }
  var Vv = {
    getCacheForType: function(t) {
      var e = te(Gt), a = e.data.get(t);
      return a === void 0 && (a = t(), e.data.set(t, a)), a;
    }
  }, Kv = typeof WeakMap == "function" ? WeakMap : Map, xt = 0, Mt = null, dt = null, vt = 0, St = 0, pe = null, Ea = !1, wl = !1, es = !1, sa = 0, qt = 0, _a = 0, Pa = 0, as = 0, ze = 0, ql = 0, qn = null, oe = null, ls = !1, ns = 0, Wi = 1 / 0, Fi = null, Aa = null, Ft = 0, za = null, Cl = null, Hl = 0, is = 0, us = null, Kf = null, Cn = 0, cs = null;
  function ge() {
    if ((xt & 2) !== 0 && vt !== 0)
      return vt & -vt;
    if (_.T !== null) {
      var t = Tl;
      return t !== 0 ? t : vs();
    }
    return ct();
  }
  function Jf() {
    ze === 0 && (ze = (vt & 536870912) === 0 || pt ? ci() : 536870912);
    var t = Ae.current;
    return t !== null && (t.flags |= 32), ze;
  }
  function ye(t, e, a) {
    (t === Mt && (St === 2 || St === 9) || t.cancelPendingCommit !== null) && (Bl(t, 0), Ma(
      t,
      vt,
      ze,
      !1
    )), ha(t, a), ((xt & 2) === 0 || t !== Mt) && (t === Mt && ((xt & 2) === 0 && (Pa |= a), qt === 4 && Ma(
      t,
      vt,
      ze,
      !1
    )), Ve(t));
  }
  function $f(t, e, a) {
    if ((xt & 6) !== 0) throw Error(f(327));
    var l = !a && (e & 124) === 0 && (e & t.expiredLanes) === 0 || ue(t, e), n = l ? Wv(t, e) : os(t, e, !0), i = l;
    do {
      if (n === 0) {
        wl && !l && Ma(t, e, 0, !1);
        break;
      } else {
        if (a = t.current.alternate, i && !Jv(a)) {
          n = os(t, e, !1), i = !1;
          continue;
        }
        if (n === 2) {
          if (i = e, t.errorRecoveryDisabledLanes & i)
            var s = 0;
          else
            s = t.pendingLanes & -536870913, s = s !== 0 ? s : s & 536870912 ? 536870912 : 0;
          if (s !== 0) {
            e = s;
            t: {
              var r = t;
              n = qn;
              var d = r.current.memoizedState.isDehydrated;
              if (d && (Bl(r, s).flags |= 256), s = os(
                r,
                s,
                !1
              ), s !== 2) {
                if (es && !d) {
                  r.errorRecoveryDisabledLanes |= i, Pa |= i, n = 4;
                  break t;
                }
                i = oe, oe = n, i !== null && (oe === null ? oe = i : oe.push.apply(
                  oe,
                  i
                ));
              }
              n = s;
            }
            if (i = !1, n !== 2) continue;
          }
        }
        if (n === 1) {
          Bl(t, 0), Ma(t, e, 0, !0);
          break;
        }
        t: {
          switch (l = t, i = n, i) {
            case 0:
            case 1:
              throw Error(f(345));
            case 4:
              if ((e & 4194048) !== e) break;
            case 6:
              Ma(
                l,
                e,
                ze,
                !Ea
              );
              break t;
            case 2:
              oe = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(f(329));
          }
          if ((e & 62914560) === e && (n = ns + 300 - xe(), 10 < n)) {
            if (Ma(
              l,
              e,
              ze,
              !Ea
            ), nl(l, 0, !0) !== 0) break t;
            l.timeoutHandle = Td(
              Wf.bind(
                null,
                l,
                a,
                oe,
                Fi,
                ls,
                e,
                ze,
                Pa,
                ql,
                Ea,
                i,
                2,
                -0,
                0
              ),
              n
            );
            break t;
          }
          Wf(
            l,
            a,
            oe,
            Fi,
            ls,
            e,
            ze,
            Pa,
            ql,
            Ea,
            i,
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
  function Wf(t, e, a, l, n, i, s, r, d, x, A, M, S, N) {
    if (t.timeoutHandle = -1, M = e.subtreeFlags, (M & 8192 || (M & 16785408) === 16785408) && (Xn = { stylesheets: null, count: 0, unsuspend: Mm }, Xf(e), M = Dm(), M !== null)) {
      t.cancelPendingCommit = M(
        ld.bind(
          null,
          t,
          e,
          i,
          a,
          l,
          n,
          s,
          r,
          d,
          A,
          1,
          S,
          N
        )
      ), Ma(t, i, s, !x);
      return;
    }
    ld(
      t,
      e,
      i,
      a,
      l,
      n,
      s,
      r,
      d
    );
  }
  function Jv(t) {
    for (var e = t; ; ) {
      var a = e.tag;
      if ((a === 0 || a === 11 || a === 15) && e.flags & 16384 && (a = e.updateQueue, a !== null && (a = a.stores, a !== null)))
        for (var l = 0; l < a.length; l++) {
          var n = a[l], i = n.getSnapshot;
          n = n.value;
          try {
            if (!de(i(), n)) return !1;
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
  function Ma(t, e, a, l) {
    e &= ~as, e &= ~Pa, t.suspendedLanes |= e, t.pingedLanes &= ~e, l && (t.warmLanes |= e), l = t.expirationTimes;
    for (var n = e; 0 < n; ) {
      var i = 31 - $t(n), s = 1 << i;
      l[i] = -1, n &= ~s;
    }
    a !== 0 && Pl(t, a, e);
  }
  function Pi() {
    return (xt & 6) === 0 ? (Hn(0), !1) : !0;
  }
  function ss() {
    if (dt !== null) {
      if (St === 0)
        var t = dt.return;
      else
        t = dt, ta = Va = null, Ec(t), Ol = null, An = 0, t = dt;
      for (; t !== null; )
        Mf(t.alternate, t), t = t.return;
      dt = null;
    }
  }
  function Bl(t, e) {
    var a = t.timeoutHandle;
    a !== -1 && (t.timeoutHandle = -1, dm(a)), a = t.cancelPendingCommit, a !== null && (t.cancelPendingCommit = null, a()), ss(), Mt = t, dt = a = Fe(t.current, null), vt = e, St = 0, pe = null, Ea = !1, wl = ue(t, e), es = !1, ql = ze = as = Pa = _a = qt = 0, oe = qn = null, ls = !1, (e & 8) !== 0 && (e |= e & 32);
    var l = t.entangledLanes;
    if (l !== 0)
      for (t = t.entanglements, l &= e; 0 < l; ) {
        var n = 31 - $t(l), i = 1 << n;
        e |= t[n], l &= ~i;
      }
    return sa = e, xi(), a;
  }
  function Ff(t, e) {
    rt = null, _.H = ki, e === yn || e === Mi ? (e = ho(), St = 3) : e === ro ? (e = ho(), St = 4) : St = e === mf ? 8 : e !== null && typeof e == "object" && typeof e.then == "function" ? 6 : 1, pe = e, dt === null && (qt = 1, Qi(
      t,
      Ne(e, t.current)
    ));
  }
  function Pf() {
    var t = _.H;
    return _.H = ki, t === null ? ki : t;
  }
  function If() {
    var t = _.A;
    return _.A = Vv, t;
  }
  function rs() {
    qt = 4, Ea || (vt & 4194048) !== vt && Ae.current !== null || (wl = !0), (_a & 134217727) === 0 && (Pa & 134217727) === 0 || Mt === null || Ma(
      Mt,
      vt,
      ze,
      !1
    );
  }
  function os(t, e, a) {
    var l = xt;
    xt |= 2;
    var n = Pf(), i = If();
    (Mt !== t || vt !== e) && (Fi = null, Bl(t, e)), e = !1;
    var s = qt;
    t: do
      try {
        if (St !== 0 && dt !== null) {
          var r = dt, d = pe;
          switch (St) {
            case 8:
              ss(), s = 6;
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              Ae.current === null && (e = !0);
              var x = St;
              if (St = 0, pe = null, kl(t, r, d, x), a && wl) {
                s = 0;
                break t;
              }
              break;
            default:
              x = St, St = 0, pe = null, kl(t, r, d, x);
          }
        }
        $v(), s = qt;
        break;
      } catch (A) {
        Ff(t, A);
      }
    while (!0);
    return e && t.shellSuspendCounter++, ta = Va = null, xt = l, _.H = n, _.A = i, dt === null && (Mt = null, vt = 0, xi()), s;
  }
  function $v() {
    for (; dt !== null; ) td(dt);
  }
  function Wv(t, e) {
    var a = xt;
    xt |= 2;
    var l = Pf(), n = If();
    Mt !== t || vt !== e ? (Fi = null, Wi = xe() + 500, Bl(t, e)) : wl = ue(
      t,
      e
    );
    t: do
      try {
        if (St !== 0 && dt !== null) {
          e = dt;
          var i = pe;
          e: switch (St) {
            case 1:
              St = 0, pe = null, kl(t, e, i, 1);
              break;
            case 2:
            case 9:
              if (oo(i)) {
                St = 0, pe = null, ed(e);
                break;
              }
              e = function() {
                St !== 2 && St !== 9 || Mt !== t || (St = 7), Ve(t);
              }, i.then(e, e);
              break t;
            case 3:
              St = 7;
              break t;
            case 4:
              St = 5;
              break t;
            case 7:
              oo(i) ? (St = 0, pe = null, ed(e)) : (St = 0, pe = null, kl(t, e, i, 7));
              break;
            case 5:
              var s = null;
              switch (dt.tag) {
                case 26:
                  s = dt.memoizedState;
                case 5:
                case 27:
                  var r = dt;
                  if (!s || Cd(s)) {
                    St = 0, pe = null;
                    var d = r.sibling;
                    if (d !== null) dt = d;
                    else {
                      var x = r.return;
                      x !== null ? (dt = x, Ii(x)) : dt = null;
                    }
                    break e;
                  }
              }
              St = 0, pe = null, kl(t, e, i, 5);
              break;
            case 6:
              St = 0, pe = null, kl(t, e, i, 6);
              break;
            case 8:
              ss(), qt = 6;
              break t;
            default:
              throw Error(f(462));
          }
        }
        Fv();
        break;
      } catch (A) {
        Ff(t, A);
      }
    while (!0);
    return ta = Va = null, _.H = l, _.A = n, xt = a, dt !== null ? 0 : (Mt = null, vt = 0, xi(), qt);
  }
  function Fv() {
    for (; dt !== null && !ti(); )
      td(dt);
  }
  function td(t) {
    var e = Af(t.alternate, t, sa);
    t.memoizedProps = t.pendingProps, e === null ? Ii(t) : dt = e;
  }
  function ed(t) {
    var e = t, a = e.alternate;
    switch (e.tag) {
      case 15:
      case 0:
        e = Sf(
          a,
          e,
          e.pendingProps,
          e.type,
          void 0,
          vt
        );
        break;
      case 11:
        e = Sf(
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
        Mf(a, e), e = dt = to(e, sa), e = Af(a, e, sa);
    }
    t.memoizedProps = t.pendingProps, e === null ? Ii(t) : dt = e;
  }
  function kl(t, e, a, l) {
    ta = Va = null, Ec(e), Ol = null, An = 0;
    var n = e.return;
    try {
      if (Yv(
        t,
        n,
        e,
        a,
        vt
      )) {
        qt = 1, Qi(
          t,
          Ne(a, t.current)
        ), dt = null;
        return;
      }
    } catch (i) {
      if (n !== null) throw dt = n, i;
      qt = 1, Qi(
        t,
        Ne(a, t.current)
      ), dt = null;
      return;
    }
    e.flags & 32768 ? (pt || l === 1 ? t = !0 : wl || (vt & 536870912) !== 0 ? t = !1 : (Ea = t = !0, (l === 2 || l === 9 || l === 3 || l === 6) && (l = Ae.current, l !== null && l.tag === 13 && (l.flags |= 16384))), ad(e, t)) : Ii(e);
  }
  function Ii(t) {
    var e = t;
    do {
      if ((e.flags & 32768) !== 0) {
        ad(
          e,
          Ea
        );
        return;
      }
      t = e.return;
      var a = Lv(
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
    qt === 0 && (qt = 5);
  }
  function ad(t, e) {
    do {
      var a = Xv(t.alternate, t);
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
    qt = 6, dt = null;
  }
  function ld(t, e, a, l, n, i, s, r, d) {
    t.cancelPendingCommit = null;
    do
      tu();
    while (Ft !== 0);
    if ((xt & 6) !== 0) throw Error(f(327));
    if (e !== null) {
      if (e === t.current) throw Error(f(177));
      if (i = e.lanes | e.childLanes, i |= tc, si(
        t,
        a,
        i,
        s,
        r,
        d
      ), t === Mt && (dt = Mt = null, vt = 0), Cl = e, za = t, Hl = a, is = i, us = n, Kf = l, (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, em(ll, function() {
        return sd(), null;
      })) : (t.callbackNode = null, t.callbackPriority = 0), l = (e.flags & 13878) !== 0, (e.subtreeFlags & 13878) !== 0 || l) {
        l = _.T, _.T = null, n = G.p, G.p = 2, s = xt, xt |= 4;
        try {
          Qv(t, e, a);
        } finally {
          xt = s, G.p = n, _.T = l;
        }
      }
      Ft = 1, nd(), id(), ud();
    }
  }
  function nd() {
    if (Ft === 1) {
      Ft = 0;
      var t = za, e = Cl, a = (e.flags & 13878) !== 0;
      if ((e.subtreeFlags & 13878) !== 0 || a) {
        a = _.T, _.T = null;
        var l = G.p;
        G.p = 2;
        var n = xt;
        xt |= 4;
        try {
          Yf(e, t);
          var i = js, s = Qr(t.containerInfo), r = i.focusedElem, d = i.selectionRange;
          if (s !== r && r && r.ownerDocument && Xr(
            r.ownerDocument.documentElement,
            r
          )) {
            if (d !== null && $u(r)) {
              var x = d.start, A = d.end;
              if (A === void 0 && (A = x), "selectionStart" in r)
                r.selectionStart = x, r.selectionEnd = Math.min(
                  A,
                  r.value.length
                );
              else {
                var M = r.ownerDocument || document, S = M && M.defaultView || window;
                if (S.getSelection) {
                  var N = S.getSelection(), it = r.textContent.length, at = Math.min(d.start, it), _t = d.end === void 0 ? at : Math.min(d.end, it);
                  !N.extend && at > _t && (s = _t, _t = at, at = s);
                  var g = Lr(
                    r,
                    at
                  ), m = Lr(
                    r,
                    _t
                  );
                  if (g && m && (N.rangeCount !== 1 || N.anchorNode !== g.node || N.anchorOffset !== g.offset || N.focusNode !== m.node || N.focusOffset !== m.offset)) {
                    var y = M.createRange();
                    y.setStart(g.node, g.offset), N.removeAllRanges(), at > _t ? (N.addRange(y), N.extend(m.node, m.offset)) : (y.setEnd(m.node, m.offset), N.addRange(y));
                  }
                }
              }
            }
            for (M = [], N = r; N = N.parentNode; )
              N.nodeType === 1 && M.push({
                element: N,
                left: N.scrollLeft,
                top: N.scrollTop
              });
            for (typeof r.focus == "function" && r.focus(), r = 0; r < M.length; r++) {
              var z = M[r];
              z.element.scrollLeft = z.left, z.element.scrollTop = z.top;
            }
          }
          du = !!Ss, js = Ss = null;
        } finally {
          xt = n, G.p = l, _.T = a;
        }
      }
      t.current = e, Ft = 2;
    }
  }
  function id() {
    if (Ft === 2) {
      Ft = 0;
      var t = za, e = Cl, a = (e.flags & 8772) !== 0;
      if ((e.subtreeFlags & 8772) !== 0 || a) {
        a = _.T, _.T = null;
        var l = G.p;
        G.p = 2;
        var n = xt;
        xt |= 4;
        try {
          Cf(t, e.alternate, e);
        } finally {
          xt = n, G.p = l, _.T = a;
        }
      }
      Ft = 3;
    }
  }
  function ud() {
    if (Ft === 4 || Ft === 3) {
      Ft = 0, _u();
      var t = za, e = Cl, a = Hl, l = Kf;
      (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0 ? Ft = 5 : (Ft = 0, Cl = za = null, cd(t, t.pendingLanes));
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
        e = _.T, n = G.p, G.p = 2, _.T = null;
        try {
          for (var i = t.onRecoverableError, s = 0; s < l.length; s++) {
            var r = l[s];
            i(r.value, {
              componentStack: r.stack
            });
          }
        } finally {
          _.T = e, G.p = n;
        }
      }
      (Hl & 3) !== 0 && tu(), Ve(t), n = t.pendingLanes, (a & 4194090) !== 0 && (n & 42) !== 0 ? t === cs ? Cn++ : (Cn = 0, cs = t) : Cn = 0, Hn(0);
    }
  }
  function cd(t, e) {
    (t.pooledCacheLanes &= e) === 0 && (e = t.pooledCache, e != null && (t.pooledCache = null, pn(e)));
  }
  function tu(t) {
    return nd(), id(), ud(), sd();
  }
  function sd() {
    if (Ft !== 5) return !1;
    var t = za, e = is;
    is = 0;
    var a = j(Hl), l = _.T, n = G.p;
    try {
      G.p = 32 > a ? 32 : a, _.T = null, a = us, us = null;
      var i = za, s = Hl;
      if (Ft = 0, Cl = za = null, Hl = 0, (xt & 6) !== 0) throw Error(f(331));
      var r = xt;
      if (xt |= 4, Zf(i.current), Lf(
        i,
        i.current,
        s,
        a
      ), xt = r, Hn(0, !1), It && typeof It.onPostCommitFiberRoot == "function")
        try {
          It.onPostCommitFiberRoot(Je, i);
        } catch {
        }
      return !0;
    } finally {
      G.p = n, _.T = l, cd(t, e);
    }
  }
  function rd(t, e, a) {
    e = Ne(a, e), e = kc(t.stateNode, e, 2), t = ya(t, e, 2), t !== null && (ha(t, 2), Ve(t));
  }
  function At(t, e, a) {
    if (t.tag === 3)
      rd(t, t, a);
    else
      for (; e !== null; ) {
        if (e.tag === 3) {
          rd(
            e,
            t,
            a
          );
          break;
        } else if (e.tag === 1) {
          var l = e.stateNode;
          if (typeof e.type.getDerivedStateFromError == "function" || typeof l.componentDidCatch == "function" && (Aa === null || !Aa.has(l))) {
            t = Ne(a, t), a = hf(2), l = ya(e, a, 2), l !== null && (vf(
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
      l = t.pingCache = new Kv();
      var n = /* @__PURE__ */ new Set();
      l.set(e, n);
    } else
      n = l.get(e), n === void 0 && (n = /* @__PURE__ */ new Set(), l.set(e, n));
    n.has(a) || (es = !0, n.add(a), t = Pv.bind(null, t, e, a), e.then(t, t));
  }
  function Pv(t, e, a) {
    var l = t.pingCache;
    l !== null && l.delete(e), t.pingedLanes |= t.suspendedLanes & a, t.warmLanes &= ~a, Mt === t && (vt & a) === a && (qt === 4 || qt === 3 && (vt & 62914560) === vt && 300 > xe() - ns ? (xt & 2) === 0 && Bl(t, 0) : as |= a, ql === vt && (ql = 0)), Ve(t);
  }
  function od(t, e) {
    e === 0 && (e = Fl()), t = xl(t, e), t !== null && (ha(t, e), Ve(t));
  }
  function Iv(t) {
    var e = t.memoizedState, a = 0;
    e !== null && (a = e.retryLane), od(t, a);
  }
  function tm(t, e) {
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
    l !== null && l.delete(e), od(t, a);
  }
  function em(t, e) {
    return Wl(t, e);
  }
  var eu = null, Yl = null, ds = !1, au = !1, hs = !1, Ia = 0;
  function Ve(t) {
    t !== Yl && t.next === null && (Yl === null ? eu = Yl = t : Yl = Yl.next = t), au = !0, ds || (ds = !0, lm());
  }
  function Hn(t, e) {
    if (!hs && au) {
      hs = !0;
      do
        for (var a = !1, l = eu; l !== null; ) {
          if (t !== 0) {
            var n = l.pendingLanes;
            if (n === 0) var i = 0;
            else {
              var s = l.suspendedLanes, r = l.pingedLanes;
              i = (1 << 31 - $t(42 | t) + 1) - 1, i &= n & ~(s & ~r), i = i & 201326741 ? i & 201326741 | 1 : i ? i | 2 : 0;
            }
            i !== 0 && (a = !0, vd(l, i));
          } else
            i = vt, i = nl(
              l,
              l === Mt ? i : 0,
              l.cancelPendingCommit !== null || l.timeoutHandle !== -1
            ), (i & 3) === 0 || ue(l, i) || (a = !0, vd(l, i));
          l = l.next;
        }
      while (a);
      hs = !1;
    }
  }
  function am() {
    fd();
  }
  function fd() {
    au = ds = !1;
    var t = 0;
    Ia !== 0 && (fm() && (t = Ia), Ia = 0);
    for (var e = xe(), a = null, l = eu; l !== null; ) {
      var n = l.next, i = dd(l, e);
      i === 0 ? (l.next = null, a === null ? eu = n : a.next = n, n === null && (Yl = a)) : (a = l, (t !== 0 || (i & 3) !== 0) && (au = !0)), l = n;
    }
    Hn(t);
  }
  function dd(t, e) {
    for (var a = t.suspendedLanes, l = t.pingedLanes, n = t.expirationTimes, i = t.pendingLanes & -62914561; 0 < i; ) {
      var s = 31 - $t(i), r = 1 << s, d = n[s];
      d === -1 ? ((r & a) === 0 || (r & l) !== 0) && (n[s] = zu(r, e)) : d <= e && (t.expiredLanes |= r), i &= ~r;
    }
    if (e = Mt, a = vt, a = nl(
      t,
      t === e ? a : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), l = t.callbackNode, a === 0 || t === e && (St === 2 || St === 9) || t.cancelPendingCommit !== null)
      return l !== null && l !== null && al(l), t.callbackNode = null, t.callbackPriority = 0;
    if ((a & 3) === 0 || ue(t, a)) {
      if (e = a & -a, e === t.callbackPriority) return e;
      switch (l !== null && al(l), j(a)) {
        case 2:
        case 8:
          a = ai;
          break;
        case 32:
          a = ll;
          break;
        case 268435456:
          a = ni;
          break;
        default:
          a = ll;
      }
      return l = hd.bind(null, t), a = Wl(a, l), t.callbackPriority = e, t.callbackNode = a, e;
    }
    return l !== null && l !== null && al(l), t.callbackPriority = 2, t.callbackNode = null, 2;
  }
  function hd(t, e) {
    if (Ft !== 0 && Ft !== 5)
      return t.callbackNode = null, t.callbackPriority = 0, null;
    var a = t.callbackNode;
    if (tu() && t.callbackNode !== a)
      return null;
    var l = vt;
    return l = nl(
      t,
      t === Mt ? l : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), l === 0 ? null : ($f(t, l, e), dd(t, xe()), t.callbackNode != null && t.callbackNode === a ? hd.bind(null, t) : null);
  }
  function vd(t, e) {
    if (tu()) return null;
    $f(t, e, !0);
  }
  function lm() {
    hm(function() {
      (xt & 6) !== 0 ? Wl(
        ie,
        am
      ) : fd();
    });
  }
  function vs() {
    return Ia === 0 && (Ia = ci()), Ia;
  }
  function md(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : hi("" + t);
  }
  function pd(t, e) {
    var a = e.ownerDocument.createElement("input");
    return a.name = e.name, a.value = e.value, t.id && a.setAttribute("form", t.id), e.parentNode.insertBefore(a, e), t = new FormData(t), a.parentNode.removeChild(a), t;
  }
  function nm(t, e, a, l, n) {
    if (e === "submit" && a && a.stateNode === n) {
      var i = md(
        (n[Xt] || null).action
      ), s = l.submitter;
      s && (e = (e = s[Xt] || null) ? md(e.formAction) : s.getAttribute("formAction"), e !== null && (i = e, s = null));
      var r = new gi(
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
                  var d = s ? pd(n, s) : new FormData(n);
                  wc(
                    a,
                    {
                      pending: !0,
                      data: d,
                      method: n.method,
                      action: i
                    },
                    null,
                    d
                  );
                }
              } else
                typeof i == "function" && (r.preventDefault(), d = s ? pd(n, s) : new FormData(n), wc(
                  a,
                  {
                    pending: !0,
                    data: d,
                    method: n.method,
                    action: i
                  },
                  i,
                  d
                ));
            },
            currentTarget: n
          }
        ]
      });
    }
  }
  for (var ms = 0; ms < Iu.length; ms++) {
    var ps = Iu[ms], im = ps.toLowerCase(), um = ps[0].toUpperCase() + ps.slice(1);
    we(
      im,
      "on" + um
    );
  }
  we(Kr, "onAnimationEnd"), we(Jr, "onAnimationIteration"), we($r, "onAnimationStart"), we("dblclick", "onDoubleClick"), we("focusin", "onFocus"), we("focusout", "onBlur"), we(Nv, "onTransitionRun"), we(Tv, "onTransitionStart"), we(Ev, "onTransitionCancel"), we(Wr, "onTransitionEnd"), ol("onMouseEnter", ["mouseout", "mouseover"]), ol("onMouseLeave", ["mouseout", "mouseover"]), ol("onPointerEnter", ["pointerout", "pointerover"]), ol("onPointerLeave", ["pointerout", "pointerover"]), Ha(
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
  ), cm = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Bn)
  );
  function gd(t, e) {
    e = (e & 4) !== 0;
    for (var a = 0; a < t.length; a++) {
      var l = t[a], n = l.event;
      l = l.listeners;
      t: {
        var i = void 0;
        if (e)
          for (var s = l.length - 1; 0 <= s; s--) {
            var r = l[s], d = r.instance, x = r.currentTarget;
            if (r = r.listener, d !== i && n.isPropagationStopped())
              break t;
            i = r, n.currentTarget = x;
            try {
              i(n);
            } catch (A) {
              Xi(A);
            }
            n.currentTarget = null, i = d;
          }
        else
          for (s = 0; s < l.length; s++) {
            if (r = l[s], d = r.instance, x = r.currentTarget, r = r.listener, d !== i && n.isPropagationStopped())
              break t;
            i = r, n.currentTarget = x;
            try {
              i(n);
            } catch (A) {
              Xi(A);
            }
            n.currentTarget = null, i = d;
          }
      }
    }
  }
  function ht(t, e) {
    var a = e[Mu];
    a === void 0 && (a = e[Mu] = /* @__PURE__ */ new Set());
    var l = t + "__bubble";
    a.has(l) || (yd(e, t, 2, !1), a.add(l));
  }
  function gs(t, e, a) {
    var l = 0;
    e && (l |= 4), yd(
      a,
      t,
      l,
      e
    );
  }
  var lu = "_reactListening" + Math.random().toString(36).slice(2);
  function ys(t) {
    if (!t[lu]) {
      t[lu] = !0, rr.forEach(function(a) {
        a !== "selectionchange" && (cm.has(a) || gs(a, !1, t), gs(a, !0, t));
      });
      var e = t.nodeType === 9 ? t : t.ownerDocument;
      e === null || e[lu] || (e[lu] = !0, gs("selectionchange", !1, e));
    }
  }
  function yd(t, e, a, l) {
    switch (Ld(e)) {
      case 2:
        var n = wm;
        break;
      case 8:
        n = qm;
        break;
      default:
        n = Rs;
    }
    a = n.bind(
      null,
      e,
      a,
      t
    ), n = void 0, !Yu || e !== "touchstart" && e !== "touchmove" && e !== "wheel" || (n = !0), l ? n !== void 0 ? t.addEventListener(e, a, {
      capture: !0,
      passive: n
    }) : t.addEventListener(e, a, !0) : n !== void 0 ? t.addEventListener(e, a, {
      passive: n
    }) : t.addEventListener(e, a, !1);
  }
  function bs(t, e, a, l, n) {
    var i = l;
    if ((e & 1) === 0 && (e & 2) === 0 && l !== null)
      t: for (; ; ) {
        if (l === null) return;
        var s = l.tag;
        if (s === 3 || s === 4) {
          var r = l.stateNode.containerInfo;
          if (r === n) break;
          if (s === 4)
            for (s = l.return; s !== null; ) {
              var d = s.tag;
              if ((d === 3 || d === 4) && s.stateNode.containerInfo === n)
                return;
              s = s.return;
            }
          for (; r !== null; ) {
            if (s = cl(r), s === null) return;
            if (d = s.tag, d === 5 || d === 6 || d === 26 || d === 27) {
              l = i = s;
              continue t;
            }
            r = r.parentNode;
          }
        }
        l = l.return;
      }
    Nr(function() {
      var x = i, A = Bu(a), M = [];
      t: {
        var S = Fr.get(t);
        if (S !== void 0) {
          var N = gi, it = t;
          switch (t) {
            case "keypress":
              if (mi(a) === 0) break t;
            case "keydown":
            case "keyup":
              N = ev;
              break;
            case "focusin":
              it = "focus", N = Qu;
              break;
            case "focusout":
              it = "blur", N = Qu;
              break;
            case "beforeblur":
            case "afterblur":
              N = Qu;
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
              N = _r;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              N = Xh;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              N = nv;
              break;
            case Kr:
            case Jr:
            case $r:
              N = Vh;
              break;
            case Wr:
              N = uv;
              break;
            case "scroll":
            case "scrollend":
              N = Gh;
              break;
            case "wheel":
              N = sv;
              break;
            case "copy":
            case "cut":
            case "paste":
              N = Jh;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              N = zr;
              break;
            case "toggle":
            case "beforetoggle":
              N = ov;
          }
          var at = (e & 4) !== 0, _t = !at && (t === "scroll" || t === "scrollend"), g = at ? S !== null ? S + "Capture" : null : S;
          at = [];
          for (var m = x, y; m !== null; ) {
            var z = m;
            if (y = z.stateNode, z = z.tag, z !== 5 && z !== 26 && z !== 27 || y === null || g === null || (z = an(m, g), z != null && at.push(
              kn(m, z, y)
            )), _t) break;
            m = m.return;
          }
          0 < at.length && (S = new N(
            S,
            it,
            null,
            a,
            A
          ), M.push({ event: S, listeners: at }));
        }
      }
      if ((e & 7) === 0) {
        t: {
          if (S = t === "mouseover" || t === "pointerover", N = t === "mouseout" || t === "pointerout", S && a !== Hu && (it = a.relatedTarget || a.fromElement) && (cl(it) || it[Ue]))
            break t;
          if ((N || S) && (S = A.window === A ? A : (S = A.ownerDocument) ? S.defaultView || S.parentWindow : window, N ? (it = a.relatedTarget || a.toElement, N = x, it = it ? cl(it) : null, it !== null && (_t = T(it), at = it.tag, it !== _t || at !== 5 && at !== 27 && at !== 6) && (it = null)) : (N = null, it = x), N !== it)) {
            if (at = _r, z = "onMouseLeave", g = "onMouseEnter", m = "mouse", (t === "pointerout" || t === "pointerover") && (at = zr, z = "onPointerLeave", g = "onPointerEnter", m = "pointer"), _t = N == null ? S : en(N), y = it == null ? S : en(it), S = new at(
              z,
              m + "leave",
              N,
              a,
              A
            ), S.target = _t, S.relatedTarget = y, z = null, cl(A) === x && (at = new at(
              g,
              m + "enter",
              it,
              a,
              A
            ), at.target = y, at.relatedTarget = _t, z = at), _t = z, N && it)
              e: {
                for (at = N, g = it, m = 0, y = at; y; y = Gl(y))
                  m++;
                for (y = 0, z = g; z; z = Gl(z))
                  y++;
                for (; 0 < m - y; )
                  at = Gl(at), m--;
                for (; 0 < y - m; )
                  g = Gl(g), y--;
                for (; m--; ) {
                  if (at === g || g !== null && at === g.alternate)
                    break e;
                  at = Gl(at), g = Gl(g);
                }
                at = null;
              }
            else at = null;
            N !== null && bd(
              M,
              S,
              N,
              at,
              !1
            ), it !== null && _t !== null && bd(
              M,
              _t,
              it,
              at,
              !0
            );
          }
        }
        t: {
          if (S = x ? en(x) : window, N = S.nodeName && S.nodeName.toLowerCase(), N === "select" || N === "input" && S.type === "file")
            var V = Cr;
          else if (wr(S))
            if (Hr)
              V = xv;
            else {
              V = yv;
              var ot = gv;
            }
          else
            N = S.nodeName, !N || N.toLowerCase() !== "input" || S.type !== "checkbox" && S.type !== "radio" ? x && Cu(x.elementType) && (V = Cr) : V = bv;
          if (V && (V = V(t, x))) {
            qr(
              M,
              V,
              a,
              A
            );
            break t;
          }
          ot && ot(t, S, x), t === "focusout" && x && S.type === "number" && x.memoizedProps.value != null && qu(S, "number", S.value);
        }
        switch (ot = x ? en(x) : window, t) {
          case "focusin":
            (wr(ot) || ot.contentEditable === "true") && (gl = ot, Wu = x, fn = null);
            break;
          case "focusout":
            fn = Wu = gl = null;
            break;
          case "mousedown":
            Fu = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Fu = !1, Zr(M, a, A);
            break;
          case "selectionchange":
            if (jv) break;
          case "keydown":
          case "keyup":
            Zr(M, a, A);
        }
        var $;
        if (Vu)
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
          pl ? Rr(t, a) && (lt = "onCompositionEnd") : t === "keydown" && a.keyCode === 229 && (lt = "onCompositionStart");
        lt && (Mr && a.locale !== "ko" && (pl || lt !== "onCompositionStart" ? lt === "onCompositionEnd" && pl && ($ = Tr()) : (va = A, Gu = "value" in va ? va.value : va.textContent, pl = !0)), ot = nu(x, lt), 0 < ot.length && (lt = new Ar(
          lt,
          t,
          null,
          a,
          A
        ), M.push({ event: lt, listeners: ot }), $ ? lt.data = $ : ($ = Ur(a), $ !== null && (lt.data = $)))), ($ = dv ? hv(t, a) : vv(t, a)) && (lt = nu(x, "onBeforeInput"), 0 < lt.length && (ot = new Ar(
          "onBeforeInput",
          "beforeinput",
          null,
          a,
          A
        ), M.push({
          event: ot,
          listeners: lt
        }), ot.data = $)), nm(
          M,
          t,
          x,
          a,
          A
        );
      }
      gd(M, e);
    });
  }
  function kn(t, e, a) {
    return {
      instance: t,
      listener: e,
      currentTarget: a
    };
  }
  function nu(t, e) {
    for (var a = e + "Capture", l = []; t !== null; ) {
      var n = t, i = n.stateNode;
      if (n = n.tag, n !== 5 && n !== 26 && n !== 27 || i === null || (n = an(t, a), n != null && l.unshift(
        kn(t, n, i)
      ), n = an(t, e), n != null && l.push(
        kn(t, n, i)
      )), t.tag === 3) return l;
      t = t.return;
    }
    return [];
  }
  function Gl(t) {
    if (t === null) return null;
    do
      t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function bd(t, e, a, l, n) {
    for (var i = e._reactName, s = []; a !== null && a !== l; ) {
      var r = a, d = r.alternate, x = r.stateNode;
      if (r = r.tag, d !== null && d === l) break;
      r !== 5 && r !== 26 && r !== 27 || x === null || (d = x, n ? (x = an(a, i), x != null && s.unshift(
        kn(a, x, d)
      )) : n || (x = an(a, i), x != null && s.push(
        kn(a, x, d)
      ))), a = a.return;
    }
    s.length !== 0 && t.push({ event: e, listeners: s });
  }
  var sm = /\r\n?/g, rm = /\u0000|\uFFFD/g;
  function xd(t) {
    return (typeof t == "string" ? t : "" + t).replace(sm, `
`).replace(rm, "");
  }
  function Sd(t, e) {
    return e = xd(e), xd(t) === e;
  }
  function iu() {
  }
  function Et(t, e, a, l, n, i) {
    switch (a) {
      case "children":
        typeof l == "string" ? e === "body" || e === "textarea" && l === "" || hl(t, l) : (typeof l == "number" || typeof l == "bigint") && e !== "body" && hl(t, "" + l);
        break;
      case "className":
        oi(t, "class", l);
        break;
      case "tabIndex":
        oi(t, "tabindex", l);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        oi(t, a, l);
        break;
      case "style":
        Sr(t, l, i);
        break;
      case "data":
        if (e !== "object") {
          oi(t, "data", l);
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
        l = hi("" + l), t.setAttribute(a, l);
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
          typeof i == "function" && (a === "formAction" ? (e !== "input" && Et(t, e, "name", n.name, n, null), Et(
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
        l = hi("" + l), t.setAttribute(a, l);
        break;
      case "onClick":
        l != null && (t.onclick = iu);
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
        a = hi("" + l), t.setAttributeNS(
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
        ht("beforetoggle", t), ht("toggle", t), ri(t, "popover", l);
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
        ri(t, "is", l);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < a.length) || a[0] !== "o" && a[0] !== "O" || a[1] !== "n" && a[1] !== "N") && (a = kh.get(a) || a, ri(t, a, l));
    }
  }
  function xs(t, e, a, l, n, i) {
    switch (a) {
      case "style":
        Sr(t, l, i);
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
        l != null && (t.onclick = iu);
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
        if (!or.hasOwnProperty(a))
          t: {
            if (a[0] === "o" && a[1] === "n" && (n = a.endsWith("Capture"), e = a.slice(2, n ? a.length - 7 : void 0), i = t[Xt] || null, i = i != null ? i[a] : null, typeof i == "function" && t.removeEventListener(e, i, n), typeof l == "function")) {
              typeof i != "function" && i !== null && (a in t ? t[a] = null : t.hasAttribute(a) && t.removeAttribute(a)), t.addEventListener(e, l, n);
              break t;
            }
            a in t ? t[a] = l : l === !0 ? t.setAttribute(a, "") : ri(t, a, l);
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
        var l = !1, n = !1, i;
        for (i in a)
          if (a.hasOwnProperty(i)) {
            var s = a[i];
            if (s != null)
              switch (i) {
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
                  Et(t, e, i, s, a, null);
              }
          }
        n && Et(t, e, "srcSet", a.srcSet, a, null), l && Et(t, e, "src", a.src, a, null);
        return;
      case "input":
        ht("invalid", t);
        var r = i = s = n = null, d = null, x = null;
        for (l in a)
          if (a.hasOwnProperty(l)) {
            var A = a[l];
            if (A != null)
              switch (l) {
                case "name":
                  n = A;
                  break;
                case "type":
                  s = A;
                  break;
                case "checked":
                  d = A;
                  break;
                case "defaultChecked":
                  x = A;
                  break;
                case "value":
                  i = A;
                  break;
                case "defaultValue":
                  r = A;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (A != null)
                    throw Error(f(137, e));
                  break;
                default:
                  Et(t, e, l, A, a, null);
              }
          }
        gr(
          t,
          i,
          r,
          d,
          x,
          s,
          n,
          !1
        ), fi(t);
        return;
      case "select":
        ht("invalid", t), l = s = i = null;
        for (n in a)
          if (a.hasOwnProperty(n) && (r = a[n], r != null))
            switch (n) {
              case "value":
                i = r;
                break;
              case "defaultValue":
                s = r;
                break;
              case "multiple":
                l = r;
              default:
                Et(t, e, n, r, a, null);
            }
        e = i, a = s, t.multiple = !!l, e != null ? dl(t, !!l, e, !1) : a != null && dl(t, !!l, a, !0);
        return;
      case "textarea":
        ht("invalid", t), i = n = l = null;
        for (s in a)
          if (a.hasOwnProperty(s) && (r = a[s], r != null))
            switch (s) {
              case "value":
                l = r;
                break;
              case "defaultValue":
                n = r;
                break;
              case "children":
                i = r;
                break;
              case "dangerouslySetInnerHTML":
                if (r != null) throw Error(f(91));
                break;
              default:
                Et(t, e, s, r, a, null);
            }
        br(t, l, n, i), fi(t);
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
        for (x in a)
          if (a.hasOwnProperty(x) && (l = a[x], l != null))
            switch (x) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(f(137, e));
              default:
                Et(t, e, x, l, a, null);
            }
        return;
      default:
        if (Cu(e)) {
          for (A in a)
            a.hasOwnProperty(A) && (l = a[A], l !== void 0 && xs(
              t,
              e,
              A,
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
  function om(t, e, a, l) {
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
        var n = null, i = null, s = null, r = null, d = null, x = null, A = null;
        for (N in a) {
          var M = a[N];
          if (a.hasOwnProperty(N) && M != null)
            switch (N) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                d = M;
              default:
                l.hasOwnProperty(N) || Et(t, e, N, null, l, M);
            }
        }
        for (var S in l) {
          var N = l[S];
          if (M = a[S], l.hasOwnProperty(S) && (N != null || M != null))
            switch (S) {
              case "type":
                i = N;
                break;
              case "name":
                n = N;
                break;
              case "checked":
                x = N;
                break;
              case "defaultChecked":
                A = N;
                break;
              case "value":
                s = N;
                break;
              case "defaultValue":
                r = N;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (N != null)
                  throw Error(f(137, e));
                break;
              default:
                N !== M && Et(
                  t,
                  e,
                  S,
                  N,
                  l,
                  M
                );
            }
        }
        wu(
          t,
          s,
          r,
          d,
          x,
          A,
          i,
          n
        );
        return;
      case "select":
        N = s = r = S = null;
        for (i in a)
          if (d = a[i], a.hasOwnProperty(i) && d != null)
            switch (i) {
              case "value":
                break;
              case "multiple":
                N = d;
              default:
                l.hasOwnProperty(i) || Et(
                  t,
                  e,
                  i,
                  null,
                  l,
                  d
                );
            }
        for (n in l)
          if (i = l[n], d = a[n], l.hasOwnProperty(n) && (i != null || d != null))
            switch (n) {
              case "value":
                S = i;
                break;
              case "defaultValue":
                r = i;
                break;
              case "multiple":
                s = i;
              default:
                i !== d && Et(
                  t,
                  e,
                  n,
                  i,
                  l,
                  d
                );
            }
        e = r, a = s, l = N, S != null ? dl(t, !!a, S, !1) : !!l != !!a && (e != null ? dl(t, !!a, e, !0) : dl(t, !!a, a ? [] : "", !1));
        return;
      case "textarea":
        N = S = null;
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
        for (s in l)
          if (n = l[s], i = a[s], l.hasOwnProperty(s) && (n != null || i != null))
            switch (s) {
              case "value":
                S = n;
                break;
              case "defaultValue":
                N = n;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (n != null) throw Error(f(91));
                break;
              default:
                n !== i && Et(t, e, s, n, l, i);
            }
        yr(t, S, N);
        return;
      case "option":
        for (var it in a)
          if (S = a[it], a.hasOwnProperty(it) && S != null && !l.hasOwnProperty(it))
            switch (it) {
              case "selected":
                t.selected = !1;
                break;
              default:
                Et(
                  t,
                  e,
                  it,
                  null,
                  l,
                  S
                );
            }
        for (d in l)
          if (S = l[d], N = a[d], l.hasOwnProperty(d) && S !== N && (S != null || N != null))
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
                  N
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
        for (x in l)
          if (S = l[x], N = a[x], l.hasOwnProperty(x) && S !== N && (S != null || N != null))
            switch (x) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (S != null)
                  throw Error(f(137, e));
                break;
              default:
                Et(
                  t,
                  e,
                  x,
                  S,
                  l,
                  N
                );
            }
        return;
      default:
        if (Cu(e)) {
          for (var _t in a)
            S = a[_t], a.hasOwnProperty(_t) && S !== void 0 && !l.hasOwnProperty(_t) && xs(
              t,
              e,
              _t,
              void 0,
              l,
              S
            );
          for (A in l)
            S = l[A], N = a[A], !l.hasOwnProperty(A) || S === N || S === void 0 && N === void 0 || xs(
              t,
              e,
              A,
              S,
              l,
              N
            );
          return;
        }
    }
    for (var g in a)
      S = a[g], a.hasOwnProperty(g) && S != null && !l.hasOwnProperty(g) && Et(t, e, g, null, l, S);
    for (M in l)
      S = l[M], N = a[M], !l.hasOwnProperty(M) || S === N || S == null && N == null || Et(t, e, M, S, l, N);
  }
  var Ss = null, js = null;
  function uu(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function jd(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Nd(t, e) {
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
  function Ns(t, e) {
    return t === "textarea" || t === "noscript" || typeof e.children == "string" || typeof e.children == "number" || typeof e.children == "bigint" || typeof e.dangerouslySetInnerHTML == "object" && e.dangerouslySetInnerHTML !== null && e.dangerouslySetInnerHTML.__html != null;
  }
  var Ts = null;
  function fm() {
    var t = window.event;
    return t && t.type === "popstate" ? t === Ts ? !1 : (Ts = t, !0) : (Ts = null, !1);
  }
  var Td = typeof setTimeout == "function" ? setTimeout : void 0, dm = typeof clearTimeout == "function" ? clearTimeout : void 0, Ed = typeof Promise == "function" ? Promise : void 0, hm = typeof queueMicrotask == "function" ? queueMicrotask : typeof Ed < "u" ? function(t) {
    return Ed.resolve(null).then(t).catch(vm);
  } : Td;
  function vm(t) {
    setTimeout(function() {
      throw t;
    });
  }
  function Oa(t) {
    return t === "head";
  }
  function _d(t, e) {
    var a = e, l = 0, n = 0;
    do {
      var i = a.nextSibling;
      if (t.removeChild(a), i && i.nodeType === 8)
        if (a = i.data, a === "/$") {
          if (0 < l && 8 > l) {
            a = l;
            var s = t.ownerDocument;
            if (a & 1 && Yn(s.documentElement), a & 2 && Yn(s.body), a & 4)
              for (a = s.head, Yn(a), s = a.firstChild; s; ) {
                var r = s.nextSibling, d = s.nodeName;
                s[tn] || d === "SCRIPT" || d === "STYLE" || d === "LINK" && s.rel.toLowerCase() === "stylesheet" || a.removeChild(s), s = r;
              }
          }
          if (n === 0) {
            t.removeChild(i), Jn(e);
            return;
          }
          n--;
        } else
          a === "$" || a === "$?" || a === "$!" ? n++ : l = a.charCodeAt(0) - 48;
      else l = 0;
      a = i;
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
          Es(a), Ou(a);
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
  function mm(t, e, a, l) {
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
              if (i = t.getAttribute("rel"), i === "stylesheet" && t.hasAttribute("data-precedence"))
                break;
              if (i !== n.rel || t.getAttribute("href") !== (n.href == null || n.href === "" ? null : n.href) || t.getAttribute("crossorigin") !== (n.crossOrigin == null ? null : n.crossOrigin) || t.getAttribute("title") !== (n.title == null ? null : n.title))
                break;
              return t;
            case "style":
              if (t.hasAttribute("data-precedence")) break;
              return t;
            case "script":
              if (i = t.getAttribute("src"), (i !== (n.src == null ? null : n.src) || t.getAttribute("type") !== (n.type == null ? null : n.type) || t.getAttribute("crossorigin") !== (n.crossOrigin == null ? null : n.crossOrigin)) && i && t.hasAttribute("async") && !t.hasAttribute("itemprop"))
                break;
              return t;
            default:
              return t;
          }
      } else if (e === "input" && t.type === "hidden") {
        var i = n.name == null ? null : "" + n.name;
        if (n.type === "hidden" && t.getAttribute("name") === i)
          return t;
      } else return t;
      if (t = Ce(t.nextSibling), t === null) break;
    }
    return null;
  }
  function pm(t, e, a) {
    if (e === "") return null;
    for (; t.nodeType !== 3; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !a || (t = Ce(t.nextSibling), t === null)) return null;
    return t;
  }
  function _s(t) {
    return t.data === "$!" || t.data === "$?" && t.ownerDocument.readyState === "complete";
  }
  function gm(t, e) {
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
  function Ce(t) {
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
  var As = null;
  function Ad(t) {
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
  function zd(t, e, a) {
    switch (e = uu(a), t) {
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
  function Yn(t) {
    for (var e = t.attributes; e.length; )
      t.removeAttributeNode(e[0]);
    Ou(t);
  }
  var Me = /* @__PURE__ */ new Map(), Md = /* @__PURE__ */ new Set();
  function cu(t) {
    return typeof t.getRootNode == "function" ? t.getRootNode() : t.nodeType === 9 ? t : t.ownerDocument;
  }
  var ra = G.d;
  G.d = {
    f: ym,
    r: bm,
    D: xm,
    C: Sm,
    L: jm,
    m: Nm,
    X: Em,
    S: Tm,
    M: _m
  };
  function ym() {
    var t = ra.f(), e = Pi();
    return t || e;
  }
  function bm(t) {
    var e = sl(t);
    e !== null && e.tag === 5 && e.type === "form" ? Jo(e) : ra.r(t);
  }
  var Ll = typeof document > "u" ? null : document;
  function Od(t, e, a) {
    var l = Ll;
    if (l && typeof e == "string" && e) {
      var n = je(e);
      n = 'link[rel="' + t + '"][href="' + n + '"]', typeof a == "string" && (n += '[crossorigin="' + a + '"]'), Md.has(n) || (Md.add(n), t = { rel: t, crossOrigin: a, href: e }, l.querySelector(n) === null && (e = l.createElement("link"), Pt(e, "link", t), Qt(e), l.head.appendChild(e)));
    }
  }
  function xm(t) {
    ra.D(t), Od("dns-prefetch", t, null);
  }
  function Sm(t, e) {
    ra.C(t, e), Od("preconnect", t, e);
  }
  function jm(t, e, a) {
    ra.L(t, e, a);
    var l = Ll;
    if (l && t && e) {
      var n = 'link[rel="preload"][as="' + je(e) + '"]';
      e === "image" && a && a.imageSrcSet ? (n += '[imagesrcset="' + je(
        a.imageSrcSet
      ) + '"]', typeof a.imageSizes == "string" && (n += '[imagesizes="' + je(
        a.imageSizes
      ) + '"]')) : n += '[href="' + je(t) + '"]';
      var i = n;
      switch (e) {
        case "style":
          i = Xl(t);
          break;
        case "script":
          i = Ql(t);
      }
      Me.has(i) || (t = U(
        {
          rel: "preload",
          href: e === "image" && a && a.imageSrcSet ? void 0 : t,
          as: e
        },
        a
      ), Me.set(i, t), l.querySelector(n) !== null || e === "style" && l.querySelector(Gn(i)) || e === "script" && l.querySelector(Ln(i)) || (e = l.createElement("link"), Pt(e, "link", t), Qt(e), l.head.appendChild(e)));
    }
  }
  function Nm(t, e) {
    ra.m(t, e);
    var a = Ll;
    if (a && t) {
      var l = e && typeof e.as == "string" ? e.as : "script", n = 'link[rel="modulepreload"][as="' + je(l) + '"][href="' + je(t) + '"]', i = n;
      switch (l) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          i = Ql(t);
      }
      if (!Me.has(i) && (t = U({ rel: "modulepreload", href: t }, e), Me.set(i, t), a.querySelector(n) === null)) {
        switch (l) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (a.querySelector(Ln(i)))
              return;
        }
        l = a.createElement("link"), Pt(l, "link", t), Qt(l), a.head.appendChild(l);
      }
    }
  }
  function Tm(t, e, a) {
    ra.S(t, e, a);
    var l = Ll;
    if (l && t) {
      var n = rl(l).hoistableStyles, i = Xl(t);
      e = e || "default";
      var s = n.get(i);
      if (!s) {
        var r = { loading: 0, preload: null };
        if (s = l.querySelector(
          Gn(i)
        ))
          r.loading = 5;
        else {
          t = U(
            { rel: "stylesheet", href: t, "data-precedence": e },
            a
          ), (a = Me.get(i)) && zs(t, a);
          var d = s = l.createElement("link");
          Qt(d), Pt(d, "link", t), d._p = new Promise(function(x, A) {
            d.onload = x, d.onerror = A;
          }), d.addEventListener("load", function() {
            r.loading |= 1;
          }), d.addEventListener("error", function() {
            r.loading |= 2;
          }), r.loading |= 4, su(s, e, l);
        }
        s = {
          type: "stylesheet",
          instance: s,
          count: 1,
          state: r
        }, n.set(i, s);
      }
    }
  }
  function Em(t, e) {
    ra.X(t, e);
    var a = Ll;
    if (a && t) {
      var l = rl(a).hoistableScripts, n = Ql(t), i = l.get(n);
      i || (i = a.querySelector(Ln(n)), i || (t = U({ src: t, async: !0 }, e), (e = Me.get(n)) && Ms(t, e), i = a.createElement("script"), Qt(i), Pt(i, "link", t), a.head.appendChild(i)), i = {
        type: "script",
        instance: i,
        count: 1,
        state: null
      }, l.set(n, i));
    }
  }
  function _m(t, e) {
    ra.M(t, e);
    var a = Ll;
    if (a && t) {
      var l = rl(a).hoistableScripts, n = Ql(t), i = l.get(n);
      i || (i = a.querySelector(Ln(n)), i || (t = U({ src: t, async: !0, type: "module" }, e), (e = Me.get(n)) && Ms(t, e), i = a.createElement("script"), Qt(i), Pt(i, "link", t), a.head.appendChild(i)), i = {
        type: "script",
        instance: i,
        count: 1,
        state: null
      }, l.set(n, i));
    }
  }
  function Dd(t, e, a, l) {
    var n = (n = K.current) ? cu(n) : null;
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
          var i = rl(
            n
          ).hoistableStyles, s = i.get(t);
          if (s || (n = n.ownerDocument || n, s = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, i.set(t, s), (i = n.querySelector(
            Gn(t)
          )) && !i._p && (s.instance = i, s.state.loading = 5), Me.has(t) || (a = {
            rel: "preload",
            as: "style",
            href: a.href,
            crossOrigin: a.crossOrigin,
            integrity: a.integrity,
            media: a.media,
            hrefLang: a.hrefLang,
            referrerPolicy: a.referrerPolicy
          }, Me.set(t, a), i || Am(
            n,
            t,
            a,
            s.state
          ))), e && l === null)
            throw Error(f(528, ""));
          return s;
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
  function Gn(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function Rd(t) {
    return U({}, t, {
      "data-precedence": t.precedence,
      precedence: null
    });
  }
  function Am(t, e, a, l) {
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
  function Ud(t, e, a) {
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
          ), Qt(l), Pt(l, "style", n), su(l, a.precedence, t), e.instance = l;
        case "stylesheet":
          n = Xl(a.href);
          var i = t.querySelector(
            Gn(n)
          );
          if (i)
            return e.state.loading |= 4, e.instance = i, Qt(i), i;
          l = Rd(a), (n = Me.get(n)) && zs(l, n), i = (t.ownerDocument || t).createElement("link"), Qt(i);
          var s = i;
          return s._p = new Promise(function(r, d) {
            s.onload = r, s.onerror = d;
          }), Pt(i, "link", l), e.state.loading |= 4, su(i, a.precedence, t), e.instance = i;
        case "script":
          return i = Ql(a.src), (n = t.querySelector(
            Ln(i)
          )) ? (e.instance = n, Qt(n), n) : (l = a, (n = Me.get(i)) && (l = U({}, a), Ms(l, n)), t = t.ownerDocument || t, n = t.createElement("script"), Qt(n), Pt(n, "link", l), t.head.appendChild(n), e.instance = n);
        case "void":
          return null;
        default:
          throw Error(f(443, e.type));
      }
    else
      e.type === "stylesheet" && (e.state.loading & 4) === 0 && (l = e.instance, e.state.loading |= 4, su(l, a.precedence, t));
    return e.instance;
  }
  function su(t, e, a) {
    for (var l = a.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), n = l.length ? l[l.length - 1] : null, i = n, s = 0; s < l.length; s++) {
      var r = l[s];
      if (r.dataset.precedence === e) i = r;
      else if (i !== n) break;
    }
    i ? i.parentNode.insertBefore(t, i.nextSibling) : (e = a.nodeType === 9 ? a.head : a, e.insertBefore(t, e.firstChild));
  }
  function zs(t, e) {
    t.crossOrigin == null && (t.crossOrigin = e.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy), t.title == null && (t.title = e.title);
  }
  function Ms(t, e) {
    t.crossOrigin == null && (t.crossOrigin = e.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy), t.integrity == null && (t.integrity = e.integrity);
  }
  var ru = null;
  function wd(t, e, a) {
    if (ru === null) {
      var l = /* @__PURE__ */ new Map(), n = ru = /* @__PURE__ */ new Map();
      n.set(a, l);
    } else
      n = ru, l = n.get(a), l || (l = /* @__PURE__ */ new Map(), n.set(a, l));
    if (l.has(t)) return l;
    for (l.set(t, null), a = a.getElementsByTagName(t), n = 0; n < a.length; n++) {
      var i = a[n];
      if (!(i[tn] || i[Ot] || t === "link" && i.getAttribute("rel") === "stylesheet") && i.namespaceURI !== "http://www.w3.org/2000/svg") {
        var s = i.getAttribute(e) || "";
        s = t + s;
        var r = l.get(s);
        r ? r.push(i) : l.set(s, [i]);
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
  function zm(t, e, a) {
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
  function Mm() {
  }
  function Om(t, e, a) {
    if (Xn === null) throw Error(f(475));
    var l = Xn;
    if (e.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== !1) && (e.state.loading & 4) === 0) {
      if (e.instance === null) {
        var n = Xl(a.href), i = t.querySelector(
          Gn(n)
        );
        if (i) {
          t = i._p, t !== null && typeof t == "object" && typeof t.then == "function" && (l.count++, l = ou.bind(l), t.then(l, l)), e.state.loading |= 4, e.instance = i, Qt(i);
          return;
        }
        i = t.ownerDocument || t, a = Rd(a), (n = Me.get(n)) && zs(a, n), i = i.createElement("link"), Qt(i);
        var s = i;
        s._p = new Promise(function(r, d) {
          s.onload = r, s.onerror = d;
        }), Pt(i, "link", a), e.instance = i;
      }
      l.stylesheets === null && (l.stylesheets = /* @__PURE__ */ new Map()), l.stylesheets.set(e, t), (t = e.state.preload) && (e.state.loading & 3) === 0 && (l.count++, e = ou.bind(l), t.addEventListener("load", e), t.addEventListener("error", e));
    }
  }
  function Dm() {
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
  function ou() {
    if (this.count--, this.count === 0) {
      if (this.stylesheets) Os(this, this.stylesheets);
      else if (this.unsuspend) {
        var t = this.unsuspend;
        this.unsuspend = null, t();
      }
    }
  }
  var fu = null;
  function Os(t, e) {
    t.stylesheets = null, t.unsuspend !== null && (t.count++, fu = /* @__PURE__ */ new Map(), e.forEach(Rm, t), fu = null, ou.call(t));
  }
  function Rm(t, e) {
    if (!(e.state.loading & 4)) {
      var a = fu.get(t);
      if (a) var l = a.get(null);
      else {
        a = /* @__PURE__ */ new Map(), fu.set(t, a);
        for (var n = t.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), i = 0; i < n.length; i++) {
          var s = n[i];
          (s.nodeName === "LINK" || s.getAttribute("media") !== "not all") && (a.set(s.dataset.precedence, s), l = s);
        }
        l && a.set(null, l);
      }
      n = e.instance, s = n.getAttribute("data-precedence"), i = a.get(s) || l, i === l && a.set(null, n), a.set(s, n), this.count++, l = ou.bind(this), n.addEventListener("load", l), n.addEventListener("error", l), i ? i.parentNode.insertBefore(n, i.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(n, t.firstChild)), e.state.loading |= 4;
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
  function Um(t, e, a, l, n, i, s, r) {
    this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = il(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = il(0), this.hiddenUpdates = il(null), this.identifierPrefix = l, this.onUncaughtError = n, this.onCaughtError = i, this.onRecoverableError = s, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = r, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Hd(t, e, a, l, n, i, s, r, d, x, A, M) {
    return t = new Um(
      t,
      e,
      a,
      s,
      r,
      d,
      x,
      M
    ), e = 1, i === !0 && (e |= 24), i = he(3, null, null, e), t.current = i, i.stateNode = t, e = fc(), e.refCount++, t.pooledCache = e, e.refCount++, i.memoizedState = {
      element: l,
      isDehydrated: a,
      cache: e
    }, mc(i), t;
  }
  function Bd(t) {
    return t ? (t = Sl, t) : Sl;
  }
  function kd(t, e, a, l, n, i) {
    n = Bd(n), l.context === null ? l.context = n : l.pendingContext = n, l = ga(e), l.payload = { element: a }, i = i === void 0 ? null : i, i !== null && (l.callback = i), a = ya(t, l, e), a !== null && (ye(a, t, e), xn(a, t, e));
  }
  function Yd(t, e) {
    if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
      var a = t.retryLane;
      t.retryLane = a !== 0 && a < e ? a : e;
    }
  }
  function Ds(t, e) {
    Yd(t, e), (t = t.alternate) && Yd(t, e);
  }
  function Gd(t) {
    if (t.tag === 13) {
      var e = xl(t, 67108864);
      e !== null && ye(e, t, 67108864), Ds(t, 67108864);
    }
  }
  var du = !0;
  function wm(t, e, a, l) {
    var n = _.T;
    _.T = null;
    var i = G.p;
    try {
      G.p = 2, Rs(t, e, a, l);
    } finally {
      G.p = i, _.T = n;
    }
  }
  function qm(t, e, a, l) {
    var n = _.T;
    _.T = null;
    var i = G.p;
    try {
      G.p = 8, Rs(t, e, a, l);
    } finally {
      G.p = i, _.T = n;
    }
  }
  function Rs(t, e, a, l) {
    if (du) {
      var n = Us(l);
      if (n === null)
        bs(
          t,
          e,
          l,
          hu,
          a
        ), Xd(t, l);
      else if (Hm(
        n,
        t,
        e,
        a,
        l
      ))
        l.stopPropagation();
      else if (Xd(t, l), e & 4 && -1 < Cm.indexOf(t)) {
        for (; n !== null; ) {
          var i = sl(n);
          if (i !== null)
            switch (i.tag) {
              case 3:
                if (i = i.stateNode, i.current.memoizedState.isDehydrated) {
                  var s = Ge(i.pendingLanes);
                  if (s !== 0) {
                    var r = i;
                    for (r.pendingLanes |= 2, r.entangledLanes |= 2; s; ) {
                      var d = 1 << 31 - $t(s);
                      r.entanglements[1] |= d, s &= ~d;
                    }
                    Ve(i), (xt & 6) === 0 && (Wi = xe() + 500, Hn(0));
                  }
                }
                break;
              case 13:
                r = xl(i, 2), r !== null && ye(r, i, 2), Pi(), Ds(i, 2);
            }
          if (i = Us(l), i === null && bs(
            t,
            e,
            l,
            hu,
            a
          ), i === n) break;
          n = i;
        }
        n !== null && l.stopPropagation();
      } else
        bs(
          t,
          e,
          l,
          null,
          a
        );
    }
  }
  function Us(t) {
    return t = Bu(t), ws(t);
  }
  var hu = null;
  function ws(t) {
    if (hu = null, t = cl(t), t !== null) {
      var e = T(t);
      if (e === null) t = null;
      else {
        var a = e.tag;
        if (a === 13) {
          if (t = D(e), t !== null) return t;
          t = null;
        } else if (a === 3) {
          if (e.stateNode.current.memoizedState.isDehydrated)
            return e.tag === 3 ? e.stateNode.containerInfo : null;
          t = null;
        } else e !== t && (t = null);
      }
    }
    return hu = t, null;
  }
  function Ld(t) {
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
        switch (ei()) {
          case ie:
            return 2;
          case ai:
            return 8;
          case ll:
          case li:
            return 32;
          case ni:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var qs = !1, Da = null, Ra = null, Ua = null, Zn = /* @__PURE__ */ new Map(), Vn = /* @__PURE__ */ new Map(), wa = [], Cm = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function Xd(t, e) {
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
  function Kn(t, e, a, l, n, i) {
    return t === null || t.nativeEvent !== i ? (t = {
      blockedOn: e,
      domEventName: a,
      eventSystemFlags: l,
      nativeEvent: i,
      targetContainers: [n]
    }, e !== null && (e = sl(e), e !== null && Gd(e)), t) : (t.eventSystemFlags |= l, e = t.targetContainers, n !== null && e.indexOf(n) === -1 && e.push(n), t);
  }
  function Hm(t, e, a, l, n) {
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
        var i = n.pointerId;
        return Zn.set(
          i,
          Kn(
            Zn.get(i) || null,
            t,
            e,
            a,
            l,
            n
          )
        ), !0;
      case "gotpointercapture":
        return i = n.pointerId, Vn.set(
          i,
          Kn(
            Vn.get(i) || null,
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
  function Qd(t) {
    var e = cl(t.target);
    if (e !== null) {
      var a = T(e);
      if (a !== null) {
        if (e = a.tag, e === 13) {
          if (e = D(a), e !== null) {
            t.blockedOn = e, bt(t.priority, function() {
              if (a.tag === 13) {
                var l = ge();
                l = ul(l);
                var n = xl(a, l);
                n !== null && ye(n, a, l), Ds(a, l);
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
  function vu(t) {
    if (t.blockedOn !== null) return !1;
    for (var e = t.targetContainers; 0 < e.length; ) {
      var a = Us(t.nativeEvent);
      if (a === null) {
        a = t.nativeEvent;
        var l = new a.constructor(
          a.type,
          a
        );
        Hu = l, a.target.dispatchEvent(l), Hu = null;
      } else
        return e = sl(a), e !== null && Gd(e), t.blockedOn = a, !1;
      e.shift();
    }
    return !0;
  }
  function Zd(t, e, a) {
    vu(t) && a.delete(e);
  }
  function Bm() {
    qs = !1, Da !== null && vu(Da) && (Da = null), Ra !== null && vu(Ra) && (Ra = null), Ua !== null && vu(Ua) && (Ua = null), Zn.forEach(Zd), Vn.forEach(Zd);
  }
  function mu(t, e) {
    t.blockedOn === e && (t.blockedOn = null, qs || (qs = !0, c.unstable_scheduleCallback(
      c.unstable_NormalPriority,
      Bm
    )));
  }
  var pu = null;
  function Vd(t) {
    pu !== t && (pu = t, c.unstable_scheduleCallback(
      c.unstable_NormalPriority,
      function() {
        pu === t && (pu = null);
        for (var e = 0; e < t.length; e += 3) {
          var a = t[e], l = t[e + 1], n = t[e + 2];
          if (typeof l != "function") {
            if (ws(l || a) === null)
              continue;
            break;
          }
          var i = sl(a);
          i !== null && (t.splice(e, 3), e -= 3, wc(
            i,
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
      return mu(d, t);
    }
    Da !== null && mu(Da, t), Ra !== null && mu(Ra, t), Ua !== null && mu(Ua, t), Zn.forEach(e), Vn.forEach(e);
    for (var a = 0; a < wa.length; a++) {
      var l = wa[a];
      l.blockedOn === t && (l.blockedOn = null);
    }
    for (; 0 < wa.length && (a = wa[0], a.blockedOn === null); )
      Qd(a), a.blockedOn === null && wa.shift();
    if (a = (t.ownerDocument || t).$$reactFormReplay, a != null)
      for (l = 0; l < a.length; l += 3) {
        var n = a[l], i = a[l + 1], s = n[Xt] || null;
        if (typeof i == "function")
          s || Vd(a);
        else if (s) {
          var r = null;
          if (i && i.hasAttribute("formAction")) {
            if (n = i, s = i[Xt] || null)
              r = s.formAction;
            else if (ws(n) !== null) continue;
          } else r = s.action;
          typeof r == "function" ? a[l + 1] = r : (a.splice(l, 3), l -= 3), Vd(a);
        }
      }
  }
  function Cs(t) {
    this._internalRoot = t;
  }
  gu.prototype.render = Cs.prototype.render = function(t) {
    var e = this._internalRoot;
    if (e === null) throw Error(f(409));
    var a = e.current, l = ge();
    kd(a, l, t, e, null, null);
  }, gu.prototype.unmount = Cs.prototype.unmount = function() {
    var t = this._internalRoot;
    if (t !== null) {
      this._internalRoot = null;
      var e = t.containerInfo;
      kd(t.current, 2, null, t, null, null), Pi(), e[Ue] = null;
    }
  };
  function gu(t) {
    this._internalRoot = t;
  }
  gu.prototype.unstable_scheduleHydration = function(t) {
    if (t) {
      var e = ct();
      t = { blockedOn: null, target: t, priority: e };
      for (var a = 0; a < wa.length && e !== 0 && e < wa[a].priority; a++) ;
      wa.splice(a, 0, t), a === 0 && Qd(t);
    }
  };
  var Kd = o.version;
  if (Kd !== "19.1.0")
    throw Error(
      f(
        527,
        Kd,
        "19.1.0"
      )
    );
  G.findDOMNode = function(t) {
    var e = t._reactInternals;
    if (e === void 0)
      throw typeof t.render == "function" ? Error(f(188)) : (t = Object.keys(t).join(","), Error(f(268, t)));
    return t = E(e), t = t !== null ? b(t) : null, t = t === null ? null : t.stateNode, t;
  };
  var km = {
    bundleType: 0,
    version: "19.1.0",
    rendererPackageName: "react-dom",
    currentDispatcherRef: _,
    reconcilerVersion: "19.1.0"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var yu = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!yu.isDisabled && yu.supportsFiber)
      try {
        Je = yu.inject(
          km
        ), It = yu;
      } catch {
      }
  }
  return Wn.createRoot = function(t, e) {
    if (!p(t)) throw Error(f(299));
    var a = !1, l = "", n = rf, i = of, s = ff, r = null;
    return e != null && (e.unstable_strictMode === !0 && (a = !0), e.identifierPrefix !== void 0 && (l = e.identifierPrefix), e.onUncaughtError !== void 0 && (n = e.onUncaughtError), e.onCaughtError !== void 0 && (i = e.onCaughtError), e.onRecoverableError !== void 0 && (s = e.onRecoverableError), e.unstable_transitionCallbacks !== void 0 && (r = e.unstable_transitionCallbacks)), e = Hd(
      t,
      1,
      !1,
      null,
      null,
      a,
      l,
      n,
      i,
      s,
      r,
      null
    ), t[Ue] = e.current, ys(t), new Cs(e);
  }, Wn.hydrateRoot = function(t, e, a) {
    if (!p(t)) throw Error(f(299));
    var l = !1, n = "", i = rf, s = of, r = ff, d = null, x = null;
    return a != null && (a.unstable_strictMode === !0 && (l = !0), a.identifierPrefix !== void 0 && (n = a.identifierPrefix), a.onUncaughtError !== void 0 && (i = a.onUncaughtError), a.onCaughtError !== void 0 && (s = a.onCaughtError), a.onRecoverableError !== void 0 && (r = a.onRecoverableError), a.unstable_transitionCallbacks !== void 0 && (d = a.unstable_transitionCallbacks), a.formState !== void 0 && (x = a.formState)), e = Hd(
      t,
      1,
      !0,
      e,
      a ?? null,
      l,
      n,
      i,
      s,
      r,
      d,
      x
    ), e.context = Bd(null), a = e.current, l = ge(), l = ul(l), n = ga(l), n.callback = null, ya(a, n, l), a = l, e.current.lanes = a, ha(e, a), Ve(e), t[Ue] = e.current, ys(t), new gu(e);
  }, Wn.version = "19.1.0", Wn;
}
var lh;
function Jm() {
  if (lh) return Bs.exports;
  lh = 1;
  function c() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(c);
      } catch (o) {
        console.error(o);
      }
  }
  return c(), Bs.exports = Km(), Bs.exports;
}
var $m = Jm();
const Wm = '.ahv{--ahv-bg: var(--activity-bg, var(--background, #ffffff));--ahv-fg: var(--activity-fg, var(--foreground, #16181d));--ahv-muted: var(--activity-muted, var(--muted-foreground, #6b7080));--ahv-subtle: var(--activity-subtle, var(--muted, #f3f4f7));--ahv-line: var(--activity-line, var(--border, #e3e5ea));--ahv-main: var(--activity-main, var(--primary, #16181d));--ahv-main-fg: var(--activity-main-fg, var(--primary-foreground, #ffffff));--ahv-radius: var(--activity-radius, var(--radius, .625rem));--ahv-mono-font: var(--activity-mono-font, var(--font-mono, ui-monospace, "SF Mono", Menlo, Consolas, monospace));--ahv-bad: var(--activity-bad, #d92d20);--ahv-warn: var(--activity-warn, #b54708);--ahv-ok: var(--activity-ok, #067647);--ahv-attention: var(--activity-attention, #3e63dd);color:var(--ahv-fg);font-size:13px;line-height:1.45}.dark .ahv,[data-theme=dark] .ahv,.ahv-dark-host .ahv,.ahv.ahv-dark-host{--ahv-bad: var(--activity-bad, #f97066);--ahv-warn: var(--activity-warn, #fdb022);--ahv-ok: var(--activity-ok, #47cd89);--ahv-attention: var(--activity-attention, #8da4ef)}.ahv *,.ahv *:before,.ahv *:after{box-sizing:border-box}.ahv button{font:inherit}.ahv h2,.ahv h3,.ahv p{margin:0}.ahv-dim{color:var(--ahv-muted)}.ahv-strong{font-weight:600}.ahv-small{font-size:12px}.ahv-mono{font-family:var(--ahv-mono-font);font-size:12px}.ahv-num{font-variant-numeric:tabular-nums}.ahv-clip{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:100%}.ahv-bad{color:var(--ahv-bad)}.ahv-warn{color:var(--ahv-warn)}.ahv-log{display:flex;flex-direction:column;min-width:0;background:var(--ahv-bg);border:1px solid var(--ahv-line);border-radius:calc(var(--ahv-radius) * 1.4);overflow:hidden}.ahv-head{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px 16px;padding:16px 20px;border-bottom:1px solid var(--ahv-line)}.ahv-title{display:flex;align-items:center;gap:8px;font-size:16px;font-weight:600;text-wrap:balance}.ahv-head p{margin-top:2px;font-size:13px}.ahv-actions{display:flex;flex-wrap:wrap;align-items:center;gap:8px}.ahv-status{display:flex;flex-wrap:wrap;align-items:center;gap:6px 18px;padding:9px 20px;font-size:12.5px;color:var(--ahv-muted);border-bottom:1px solid var(--ahv-line)}.ahv-status strong{color:var(--ahv-fg);font-weight:500}.ahv-status .ahv-bad,.ahv-status strong.ahv-bad{color:var(--ahv-bad)}.ahv-status .ahv-warn{color:var(--ahv-warn)}.ahv-ok,.ahv-status strong.ahv-ok{color:var(--ahv-ok)}.ahv-status-wrap{border-bottom:1px solid var(--ahv-line)}.ahv-status-wrap .ahv-status{border-bottom:0}.ahv-checks{display:grid;gap:10px;padding:4px 20px 14px}.ahv-checks .ahv-bar{align-items:flex-end}.ahv-checks .ahv-field{width:170px}.ahv-hidden{display:none}.ahv-disabled{opacity:.55;pointer-events:none}label.ahv-button{cursor:pointer}.ahv-streams{display:grid;gap:12px;padding:12px 20px 16px;border-bottom:1px solid var(--ahv-line)}.ahv-streams .ahv-bar>p{margin:0;flex:1 1 320px;max-width:70ch}.ahv-stream-list{margin:0;padding:0;list-style:none;display:grid;border:1px solid var(--ahv-line);border-radius:var(--ahv-radius)}.ahv-stream-list li{display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,1fr) 230px 250px;align-items:center;gap:6px 16px;padding:10px 14px}.ahv-stream-list li+li{border-top:1px solid var(--ahv-line)}.ahv-stream-list li>.ahv-bad{grid-column:1 / -1}.ahv-stream-main{display:flex;flex-wrap:wrap;align-items:center;gap:4px 8px;min-width:0}.ahv-stream-where{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.ahv-stream-tools{display:flex;align-items:center;gap:6px;justify-self:end}.ahv-stream-form{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px 16px;max-width:760px}.ahv-stream-form .ahv-segment{justify-self:start}.ahv-textarea{height:auto;padding:8px 10px;resize:vertical}@media(max-width:720px){.ahv-stream-list li{grid-template-columns:minmax(0,1fr)}.ahv-stream-tools{justify-self:start;flex-wrap:wrap}.ahv-stream-form{grid-template-columns:minmax(0,1fr)}.ahv-stream-form .ahv-field-wide{grid-column:auto}}.ahv-verdict{display:grid;gap:6px;padding:10px 12px;font-size:12.5px;border-radius:var(--ahv-radius);border:1px solid}.ahv-verdict ul{margin:0;padding-left:18px;display:grid;gap:2px}.ahv-verdict-ok{color:var(--ahv-ok);border-color:color-mix(in srgb,var(--ahv-ok) 35%,transparent);background:color-mix(in srgb,var(--ahv-ok) 6%,transparent)}.ahv-verdict-bad{color:var(--ahv-bad);border-color:color-mix(in srgb,var(--ahv-bad) 35%,transparent);background:color-mix(in srgb,var(--ahv-bad) 6%,transparent)}.ahv-seal{display:inline-flex;vertical-align:-2px;margin-left:4px;color:var(--ahv-ok)}.ahv-seal-waiting{color:var(--ahv-muted)}.ahv-button{display:inline-flex;align-items:center;gap:6px;height:32px;padding:0 12px;cursor:pointer;color:var(--ahv-fg);background:var(--ahv-bg);border:1px solid var(--ahv-line);border-radius:var(--ahv-radius);font-size:13px;font-weight:500;white-space:nowrap;transition:background-color .15s,border-color .15s}.ahv-button:hover:not(:disabled){background:var(--ahv-subtle)}.ahv-button:disabled{opacity:.55;cursor:default}.ahv-button-quiet{border-color:transparent;background:transparent;color:var(--ahv-muted)}.ahv-button-quiet:hover:not(:disabled){color:var(--ahv-fg)}.ahv-button-main{background:var(--ahv-main);color:var(--ahv-main-fg);border-color:var(--ahv-main);padding:0 16px}.ahv-button-main:hover:not(:disabled){background:var(--ahv-main);opacity:.9}.ahv-button-live{color:var(--ahv-ok);border-color:color-mix(in srgb,var(--ahv-ok) 45%,transparent)}.ahv-icon-button{display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;padding:0;cursor:pointer;background:transparent;border:0;border-radius:var(--ahv-radius);color:var(--ahv-muted)}.ahv-icon-button:hover{background:var(--ahv-subtle);color:var(--ahv-fg)}.ahv :focus-visible{outline:2px solid var(--ahv-attention);outline-offset:1px}.ahv-input{width:100%;min-width:0;height:34px;padding:0 10px;font:inherit;font-size:13px;color:var(--ahv-fg);background:var(--ahv-bg);border:1px solid var(--ahv-line);border-radius:var(--ahv-radius)}.ahv-input[aria-invalid]{border-color:var(--ahv-bad)}.ahv-input::placeholder{color:var(--ahv-muted)}.ahv-input-icon{position:relative;display:block}.ahv-input-icon>svg{position:absolute;left:10px;top:50%;transform:translateY(-50%);color:var(--ahv-muted);pointer-events:none}.ahv-input-icon>.ahv-input{padding-left:30px}.ahv-pair{display:flex;gap:6px}.ahv-segment{display:inline-flex;padding:2px;gap:2px;background:var(--ahv-subtle);border-radius:var(--ahv-radius)}.ahv-segment button{height:28px;padding:0 12px;border:0;border-radius:calc(var(--ahv-radius) * .8);background:transparent;cursor:pointer;color:var(--ahv-muted);font-size:12.5px;font-weight:500}.ahv-segment button[aria-pressed=true]{background:var(--ahv-bg);color:var(--ahv-fg);box-shadow:0 1px 2px #00000014}.ahv-chips{display:flex;flex-wrap:wrap;gap:6px}.ahv-chip{height:28px;padding:0 11px;cursor:pointer;font-size:12.5px;color:var(--ahv-muted);background:transparent;border:1px solid var(--ahv-line);border-radius:999px}.ahv-chip[aria-pressed=true]{color:var(--ahv-fg);border-color:var(--ahv-fg);font-weight:500}.ahv-menu{position:relative}.ahv-menu-list{position:absolute;right:0;top:calc(100% + 4px);z-index:20;min-width:220px;padding:4px;display:grid;background:var(--ahv-bg);border:1px solid var(--ahv-line);border-radius:var(--ahv-radius);box-shadow:0 8px 24px #0000001f}.ahv-menu-list>button{color:inherit;text-align:left;padding:8px 10px;border:0;background:transparent;border-radius:calc(var(--ahv-radius) * .8);cursor:pointer}.ahv-menu-list>button:hover{background:var(--ahv-subtle)}.ahv-filters{display:grid;gap:14px;padding:14px 20px;border-bottom:1px solid var(--ahv-line);background:color-mix(in srgb,var(--ahv-subtle) 35%,var(--ahv-bg))}.ahv-bar{display:flex;flex-wrap:wrap;align-items:center;gap:8px 12px}.ahv-bar-end{gap:8px}.ahv-push{flex:1}.ahv-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:12px}.ahv-more{padding:12px;border:1px dashed var(--ahv-line);border-radius:var(--ahv-radius)}.ahv-field{display:grid;gap:5px;align-content:start;min-width:0}.ahv-field-wide{grid-column:span 2}.ahv-field>span:first-child{font-size:12px;font-weight:500;color:var(--ahv-muted)}.ahv-field em{font-style:normal;font-size:12px}.ahv-applied{display:flex;flex-wrap:wrap;align-items:center;gap:6px;padding-top:12px;border-top:1px dashed var(--ahv-line)}.ahv-pill{display:inline-flex;align-items:center;gap:4px;height:26px;padding:0 2px 0 9px;font-size:12.5px;background:var(--ahv-bg);border:1px solid var(--ahv-line);border-radius:var(--ahv-radius)}.ahv-pill button{display:inline-flex;padding:3px;border:0;background:transparent;border-radius:4px;cursor:pointer;color:var(--ahv-muted)}.ahv-pill button:hover{background:var(--ahv-subtle);color:var(--ahv-fg)}.ahv-searchbar{display:flex;flex-wrap:wrap;gap:8px;align-items:flex-start}.ahv-search{position:relative;flex:1 1 360px;min-width:0}.ahv-range{width:auto;flex:0 0 auto}.ahv-searchbar .ahv-pair{flex:0 1 300px}.ahv-suggest{position:absolute;left:0;right:0;top:calc(100% + 4px);z-index:30;margin:0;padding:4px;list-style:none;max-height:300px;overflow:auto;background:var(--ahv-bg);border:1px solid var(--ahv-line);border-radius:var(--ahv-radius);box-shadow:0 8px 24px #0000001f}.ahv-suggest li{display:flex;justify-content:space-between;gap:12px;padding:6px 9px;border-radius:calc(var(--ahv-radius) * .8);cursor:pointer}.ahv-suggest li .ahv-dim{font-size:12px;text-align:right}.ahv-suggest-on{background:var(--ahv-subtle)}.ahv-add{gap:4px 6px}.ahv-link-button{padding:2px 8px;font-size:12.5px;color:var(--ahv-muted);background:transparent;border:1px dashed var(--ahv-line);border-radius:999px;cursor:pointer}.ahv-link-button:hover{color:var(--ahv-fg);border-style:solid}.ahv-push-right{margin-left:auto}.ahv-pill-not{border-style:dashed}.ahv-cell{white-space:nowrap}.ahv-check{display:flex;align-items:center;gap:8px;padding:5px 4px;font-size:13px;cursor:pointer}.ahv-menu-panel{min-width:280px;padding:10px;gap:4px}.ahv-views{margin:0 0 6px;padding:0;list-style:none;display:grid;gap:2px;max-height:300px;overflow:auto}.ahv-views li{display:flex;align-items:center;gap:4px;border-radius:calc(var(--ahv-radius) * .8)}.ahv-views li:hover,.ahv-views-on{background:var(--ahv-subtle)}.ahv-views-open{flex:1;display:grid;gap:1px;padding:6px 8px;text-align:left;color:inherit;background:transparent;border:0;cursor:pointer;min-width:0}.ahv-views-tools{display:flex}.ahv-views-save{display:grid;gap:6px;padding-top:8px;border-top:1px solid var(--ahv-line)}.ahv-chart{padding:14px 20px 10px;border-bottom:1px solid var(--ahv-line)}.ahv-chart-head{display:flex;flex-wrap:wrap;justify-content:space-between;gap:4px 16px;margin-bottom:10px;font-size:12.5px}.ahv-chart-head strong{font-size:14px}.ahv-chart-plot{position:relative;height:96px;border-bottom:1px solid var(--ahv-line)}.ahv-chart-svg{display:block;width:100%;height:100%}.ahv-bar{fill:var(--ahv-main);fill-opacity:.55}.ahv-bar-on{fill-opacity:1}.ahv-chart-max{position:absolute;left:0;top:-2px;font-size:10.5px;color:var(--ahv-muted)}.ahv-chart-empty{position:absolute;top:0;right:0;bottom:0;left:0;display:grid;place-items:center;color:var(--ahv-muted);font-size:12.5px}.ahv-chart-axis{position:relative;height:30px}.ahv-chart-axis span{position:absolute;top:4px;transform:translate(-50%);display:grid;justify-items:center;font-size:10.5px;color:var(--ahv-muted);font-variant-numeric:tabular-nums;white-space:nowrap}.ahv-chart-axis b{font-weight:600}.ahv-tip{position:absolute;top:-6px;transform:translate(-50%,-100%);z-index:5;display:grid;gap:1px;padding:6px 9px;pointer-events:none;font-size:12px;white-space:nowrap;background:var(--ahv-bg);border:1px solid var(--ahv-line);border-radius:var(--ahv-radius);box-shadow:0 6px 18px #0000001f}.ahv-tip span{color:var(--ahv-muted)}.ahv-table-wrap{max-height:min(70vh,52rem);overflow:auto}.ahv-table{width:100%;border-collapse:collapse}.ahv-table thead th{position:sticky;top:0;z-index:2;padding:9px 14px;text-align:left;font-size:12px;font-weight:500;color:var(--ahv-muted);background:var(--ahv-bg);box-shadow:inset 0 -1px 0 var(--ahv-line);white-space:nowrap}.ahv-table td{padding:10px 14px;vertical-align:middle;border-bottom:1px solid color-mix(in srgb,var(--ahv-line) 70%,transparent)}.ahv-table th:first-child,.ahv-table td:first-child{padding-left:20px;width:1%}.ahv-table th:last-child,.ahv-table td:last-child{padding-right:20px;width:1%}.ahv-table td:nth-child(2){width:22%;max-width:260px}.ahv-day td{padding:6px 20px;font-size:11px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:var(--ahv-muted);background:color-mix(in srgb,var(--ahv-subtle) 60%,var(--ahv-bg))}.ahv-row{cursor:pointer}.ahv-row:hover td{background:color-mix(in srgb,var(--ahv-subtle) 55%,transparent)}.ahv-row-problem td:first-child{box-shadow:inset 3px 0 0 var(--ahv-bad)}.ahv-when{display:grid;white-space:nowrap;line-height:1.3}.ahv-when .ahv-dim{font-size:11.5px}.ahv-who{display:flex;align-items:center;gap:10px;min-width:0}.ahv-avatar{flex:none;display:grid;place-items:center;width:28px;height:28px;border-radius:999px;font-size:10.5px;font-weight:600;color:var(--ahv-muted);background:var(--ahv-subtle)}.ahv-avatar-system{border-radius:8px}.ahv-stack{display:grid;min-width:0;line-height:1.3}.ahv-stack .ahv-dim{font-size:11.5px}.ahv-link{display:block;max-width:100%;padding:0;color:inherit;border:0;background:none;text-align:left;cursor:pointer}.ahv-link:hover{text-decoration:underline;text-underline-offset:2px}.ahv-what{display:flex;align-items:center;gap:8px;min-width:0}.ahv-sentence{min-width:0;overflow-wrap:anywhere}.ahv-mark{flex:none;width:7px;height:7px;border-radius:999px;background:var(--ahv-attention)}.ahv-what>svg{flex:none}.ahv-count{flex:none;display:inline-flex;align-items:center;gap:3px;padding:1px 6px;font-size:11px;color:var(--ahv-muted);border:1px solid var(--ahv-line);border-radius:999px;font-variant-numeric:tabular-nums}.ahv-count-bad{color:var(--ahv-main-fg);background:var(--ahv-bad);border-color:var(--ahv-bad)}.ahv-where{display:flex;align-items:center;gap:6px;white-space:nowrap}.ahv-tag{display:inline-flex;align-items:center;height:20px;padding:0 7px;font-size:11px;font-weight:500;white-space:nowrap;color:var(--ahv-muted);background:var(--ahv-subtle);border-radius:6px;text-transform:none}.ahv-tag-bad{color:var(--ahv-bad);background:color-mix(in srgb,var(--ahv-bad) 12%,transparent)}.ahv-tag-warn{color:var(--ahv-warn);background:color-mix(in srgb,var(--ahv-warn) 12%,transparent)}.ahv-tag-ok{color:var(--ahv-ok);background:color-mix(in srgb,var(--ahv-ok) 12%,transparent)}.ahv-tag-accent{color:var(--ahv-attention);background:color-mix(in srgb,var(--ahv-attention) 12%,transparent)}.ahv-method-get{color:var(--ahv-attention)}.ahv-method-post{color:var(--ahv-ok)}.ahv-method-put,.ahv-method-patch{color:var(--ahv-warn)}.ahv-method-delete{color:var(--ahv-bad)}.ahv-foot{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:8px;padding:10px 20px;font-size:12.5px}.ahv-empty{display:grid;justify-items:center;gap:6px;padding:48px 20px;text-align:center;color:var(--ahv-muted)}.ahv-empty strong{color:var(--ahv-fg);font-size:14px}.ahv-message{display:flex;align-items:center;justify-content:space-between;gap:12px;margin:12px 20px;padding:9px 12px;font-size:12.5px;border:1px solid var(--ahv-line);border-radius:var(--ahv-radius);background:var(--ahv-subtle)}.ahv-message-bad{color:var(--ahv-bad);border-color:color-mix(in srgb,var(--ahv-bad) 35%,transparent);background:color-mix(in srgb,var(--ahv-bad) 6%,transparent)}.ahv-timeline .ahv-message{margin:0}.ahv-skeleton{display:grid;gap:8px;padding:16px 20px}.ahv-timeline .ahv-skeleton{padding:0}.ahv-skeleton span{height:38px;border-radius:var(--ahv-radius);background:var(--ahv-subtle);animation:ahv-fade 1.4s ease-in-out infinite}.ahv-drawer-layer{position:fixed;top:0;right:0;bottom:0;left:0;z-index:60;display:flex;justify-content:flex-end}.ahv-backdrop{position:absolute;top:0;right:0;bottom:0;left:0;background:#00000052;animation:ahv-fade-in .15s ease-out}.ahv-drawer{position:relative;width:min(680px,100%);height:100%;overflow-y:auto;background:var(--ahv-bg);color:var(--ahv-fg);border-left:1px solid var(--ahv-line);box-shadow:-12px 0 32px #00000024;animation:ahv-slide-in .18s ease-out}.ahv-drawer-close{position:absolute;top:14px;right:14px}.ahv-drawer-body{display:grid;gap:22px;padding:22px 24px 32px}.ahv-drawer-head{display:grid;gap:8px;padding-right:36px;padding-bottom:18px;border-bottom:1px solid var(--ahv-line)}.ahv-drawer-head h2{font-size:17px;font-weight:600;line-height:1.35;text-wrap:balance;overflow-wrap:anywhere}.ahv-drawer-head .ahv-actions{margin-top:4px}.ahv-tags{display:flex;flex-wrap:wrap;gap:6px}.ahv-section{display:grid;gap:8px}.ahv-section h3{font-size:11px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;color:var(--ahv-muted)}.ahv-kv{width:100%;border-collapse:collapse;font-size:12.5px}.ahv-kv th{width:36%;padding:7px 12px;text-align:left;vertical-align:top;font-weight:500;color:var(--ahv-muted);background:color-mix(in srgb,var(--ahv-subtle) 60%,var(--ahv-bg))}.ahv-kv td{padding:7px 12px;overflow-wrap:anywhere}.ahv-kv tr+tr>*{border-top:1px solid var(--ahv-line)}.ahv-scroll-x{overflow-x:auto;border:1px solid var(--ahv-line);border-radius:var(--ahv-radius)}.ahv-changes{width:100%;border-collapse:collapse;font-size:12.5px}.ahv-changes th{padding:7px 12px;text-align:left;font-weight:500;color:var(--ahv-muted);background:var(--ahv-subtle)}.ahv-changes td{padding:7px 12px;border-top:1px solid var(--ahv-line);overflow-wrap:anywhere}.ahv-before{color:var(--ahv-bad)}.ahv-after{color:var(--ahv-ok)}.ahv-list{margin:0;padding:0;list-style:none;border:1px solid var(--ahv-line);border-radius:var(--ahv-radius);overflow:hidden}.ahv-list li+li{border-top:1px solid var(--ahv-line)}.ahv-list button{display:flex;align-items:center;gap:10px;width:100%;padding:8px 12px;text-align:left;border:0;background:transparent;cursor:pointer;color:inherit}.ahv-list button:hover:not(:disabled){background:var(--ahv-subtle)}.ahv-list button:disabled{cursor:default;background:var(--ahv-subtle)}.ahv-row-between{display:flex;align-items:center;justify-content:space-between;gap:8px}.ahv-disclose{display:inline-flex;align-items:center;gap:4px;padding:0;border:0;background:none;cursor:pointer;font-size:11px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;color:var(--ahv-muted)}.ahv-pre{margin:0;max-height:380px;overflow:auto;padding:12px;font-family:var(--ahv-mono-font);font-size:12px;background:var(--ahv-subtle);border:1px solid var(--ahv-line);border-radius:var(--ahv-radius);white-space:pre-wrap;overflow-wrap:anywhere}.ahv-timeline{display:grid;gap:12px}.ahv-eyebrow{font-size:11px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;color:var(--ahv-muted)}.ahv-steps{margin:0;padding:0;list-style:none;display:grid}.ahv-step{--tone: var(--ahv-muted);position:relative;display:flex;gap:12px;padding-bottom:20px}.ahv-step:before{content:"";position:absolute;left:13.5px;top:30px;bottom:2px;width:1px;background:var(--ahv-line)}.ahv-step:last-child{padding-bottom:0}.ahv-step:last-child:before{display:none}.ahv-tone-sky{--tone: #0284c7}.ahv-tone-violet{--tone: #7c3aed}.ahv-tone-amber{--tone: #b45309}.ahv-tone-emerald{--tone: #047857}.ahv-tone-rose{--tone: var(--ahv-bad)}.ahv-tone-neutral{--tone: var(--ahv-fg)}.dark .ahv-tone-sky,[data-theme=dark] .ahv-tone-sky,.ahv-dark-host .ahv-tone-sky{--tone: #38bdf8}.dark .ahv-tone-violet,[data-theme=dark] .ahv-tone-violet,.ahv-dark-host .ahv-tone-violet{--tone: #a78bfa}.dark .ahv-tone-amber,[data-theme=dark] .ahv-tone-amber,.ahv-dark-host .ahv-tone-amber{--tone: #fbbf24}.dark .ahv-tone-emerald,[data-theme=dark] .ahv-tone-emerald,.ahv-dark-host .ahv-tone-emerald{--tone: #34d399}.ahv-step-icon{position:relative;z-index:1;flex:none;display:grid;place-items:center;width:28px;height:28px;border-radius:999px;color:var(--tone);background:color-mix(in srgb,var(--tone) 12%,var(--ahv-bg));box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--tone) 35%,transparent)}.ahv-step-main{flex:1;min-width:0;display:grid;gap:8px;align-content:start}.ahv-step-head{display:flex;align-items:flex-start;justify-content:space-between;gap:12px}.ahv .ahv-step-title{display:inline-flex;align-items:center;gap:8px;padding:0;border:0;background:none;cursor:pointer;text-align:left;color:inherit;font-size:14px;font-weight:600;line-height:1.3}.ahv .ahv-step-title:hover{text-decoration:underline;text-underline-offset:3px}.ahv-step-when{flex:none;display:grid;justify-items:end;line-height:1.3}.ahv-step-when .ahv-mono{font-size:12px;font-weight:500}.ahv-step-when .ahv-dim{font-size:11px}.ahv-byline{display:flex;flex-wrap:wrap;align-items:center;gap:2px 6px;font-size:12px;color:var(--ahv-muted);margin-top:3px}.ahv-byline .ahv-sep:before{content:"·";margin-right:6px}.ahv-byline .ahv-strong{color:var(--ahv-fg);font-weight:500}.ahv-avatar-small{width:18px;height:18px;font-size:8px}.ahv-step-problem{padding:8px 12px;font-size:12.5px;color:var(--ahv-bad);border-radius:var(--ahv-radius);border:1px solid color-mix(in srgb,var(--ahv-bad) 30%,transparent);background:color-mix(in srgb,var(--ahv-bad) 6%,transparent)}.ahv-chips-row{display:flex;flex-wrap:wrap;gap:6px}.ahv-fact{display:inline-flex;align-items:baseline;gap:6px;padding:3px 9px;font-size:12px;border:1px solid var(--ahv-line);border-radius:calc(var(--ahv-radius) * .8);background:var(--ahv-bg)}.ahv-fact .ahv-mono{font-weight:500;color:var(--ahv-fg)}.ahv-step-more{display:grid;gap:10px}.ahv-records{display:grid;gap:6px;justify-items:start}.ahv-records .ahv-records-table{border:1px solid var(--ahv-line);border-radius:var(--ahv-radius);border-collapse:separate;border-spacing:0;overflow:hidden}.ahv-records-table td:nth-child(2){white-space:nowrap}.ahv-records-table td:first-child .ahv-disclose{text-align:left;justify-content:flex-start;text-transform:none;letter-spacing:0;font-size:12.5px;font-weight:500;color:var(--ahv-fg)}.ahv-records-table .ahv-disclose:disabled{cursor:default}.ahv-records-fields>td{padding:8px 12px 12px;background:var(--ahv-subtle)}.ahv-turned-right{transform:rotate(90deg)}.ahv-turned{transform:rotate(180deg)}.ahv-spin{animation:ahv-spin 1s linear infinite}.ahv-pulse{animation:ahv-fade 1.6s ease-in-out infinite}@keyframes ahv-spin{to{transform:rotate(360deg)}}@keyframes ahv-fade{50%{opacity:.45}}@keyframes ahv-fade-in{0%{opacity:0}}@keyframes ahv-slide-in{0%{transform:translate(24px);opacity:0}}@media(prefers-reduced-motion:reduce){.ahv *,.ahv-drawer-layer *{animation:none!important;transition:none!important}}@media(max-width:720px){.ahv-head,.ahv-filters,.ahv-chart,.ahv-foot{padding-left:16px;padding-right:16px}.ahv-field-wide{grid-column:span 1}.ahv-table thead{display:none}.ahv-table,.ahv-table tbody,.ahv-table tr,.ahv-table td{display:block;width:auto!important;max-width:none!important}.ahv-table td{border:0;padding:2px 16px!important}.ahv-row{padding:10px 0;border-bottom:1px solid var(--ahv-line)}.ahv-day td{padding:6px 16px!important}}';
var X = er();
const oa = (c) => "action" in c, Fm = {
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
function jt({ name: c, size: o = 16, ...h }) {
  return /* @__PURE__ */ u.jsx(
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
      ...h,
      children: /* @__PURE__ */ u.jsx("path", { d: Fm[c] })
    }
  );
}
function Oe(c, o, h) {
  const [f, p] = X.useState({ loading: c !== null }), T = X.useRef(0), D = X.useRef(o);
  D.current = o;
  const q = X.useCallback(() => {
    if (c === null) return;
    const b = ++T.current;
    p((U) => ({ ...U, loading: !0 })), D.current().then(
      (U) => b === T.current && p({ data: U, loading: !1 }),
      (U) => b === T.current && p((Y) => ({ data: Y.data, error: U, loading: !1 }))
    );
  }, [c]);
  X.useEffect(() => {
    p({ loading: c !== null }), q();
  }, [c, q]);
  const E = !!f.error;
  return X.useEffect(() => {
    if (!h || c === null || E) return;
    const b = setInterval(q, h);
    return () => clearInterval(b);
  }, [h, c, E, q]), { ...f, refresh: q };
}
const Zs = 20;
function Pm(c, o, h, f, p) {
  var O;
  const T = o && JSON.stringify(o), [D, q] = X.useState([]), [E, b] = X.useState(!1), [U, Y] = X.useState({ loading: !1 }), w = X.useRef(T);
  w.current = T;
  const B = Oe(
    T,
    () => c("search", { method: "POST", body: { ...o, limit: h } }),
    f ? p : void 0
  ), Z = X.useRef(0);
  X.useEffect(() => {
    B.data && (Z.current += 1, q([B.data]), b(!1), Y({ loading: !1 }));
  }, [B.data]), X.useEffect(() => {
    q([]), Y({ loading: !1 });
  }, [T]);
  const k = ((O = D[D.length - 1]) == null ? void 0 : O.next_cursor) ?? null, I = X.useCallback(() => {
    if (!k || U.loading || !o) return;
    Y({ loading: !0 });
    const H = T, W = Z.current;
    c("search", { method: "POST", body: { ...o, limit: h, cursor: k } }).then(
      (F) => {
        w.current !== H || Z.current !== W || (q((ut) => [...ut, F].slice(-Zs)), D.length >= Zs && b(!0), Y({ loading: !1 }));
      },
      (F) => w.current === H && Z.current === W && Y({ loading: !1, error: F })
    );
  }, [k, U.loading, o, T, c, h, D.length]);
  return {
    rows: D.flatMap((H) => H.items),
    trimmed: E,
    hasMore: !!k && !f,
    loading: B.loading && !D.length,
    refreshing: B.loading,
    error: B.error,
    more: U,
    loadMore: I,
    refresh: B.refresh,
    pageCount: D.length
  };
}
const He = (c) => Date.parse(`${c.slice(0, 23).replace(" ", "T")}Z`), fe = (c) => c.replace(/[._]+/g, " ").trim(), In = (c) => c.charAt(0).toUpperCase() + c.slice(1), yh = 864e5, Im = [[60, "second"], [60, "minute"], [24, "hour"], [7, "day"]], t0 = new Intl.RelativeTimeFormat(void 0, { numeric: "auto", style: "short" });
function ar(c, o = Date.now()) {
  let h = (He(c) - o) / 1e3;
  for (const [f, p] of Im) {
    if (Math.abs(h) < f) return t0.format(Math.round(h), p);
    h /= f;
  }
  return "";
}
const Nu = (c, o) => new Date(c).toLocaleString(void 0, { ...o, timeZone: "UTC" }), $l = (c) => Nu(c, { day: "numeric", month: "short", year: "numeric" }), Vl = (c) => Nu(c, { day: "numeric", month: "short" }), Vs = (c) => Nu(c, { hour: "2-digit", minute: "2-digit", hour12: !1 });
function e0(c, o = Date.now()) {
  const h = c.slice(0, 10);
  return h === new Date(o).toISOString().slice(0, 10) ? "Today" : h === new Date(o - yh).toISOString().slice(0, 10) ? "Yesterday" : Nu(He(`${h} 00:00:00`), { weekday: "short", day: "numeric", month: "short", year: "numeric" });
}
const Tu = (c) => c.slice(11, 23);
function bh(c) {
  var h, f;
  if (/^[\d#]/.test(c)) return "#";
  const o = c.split(/[\s@._-]+/).filter(Boolean);
  return ((((h = o[0]) == null ? void 0 : h[0]) ?? "?") + (((f = o[1]) == null ? void 0 : f[0]) ?? "")).toUpperCase();
}
const a0 = (c) => c.actor_name || (c.actor_type === "system" ? In(fe(c.actor_id)) || "System" : c.actor_id || "Anonymous"), Ks = (c) => /^\d{4}-\d{2}-\d{2}$/.test(c) && !Number.isNaN(Date.parse(`${c}T00:00:00Z`)), Js = (c) => `${c} 00:00:00`, l0 = (c) => `${new Date(Date.parse(`${c}T00:00:00Z`) + yh).toISOString().slice(0, 10)} 00:00:00`, n0 = (c, o = Date.now()) => new Date(o - c * 6e4).toISOString().slice(0, 19).replace("T", " "), i0 = (c, o, h = `${o}s`) => `${c.toLocaleString()} ${c === 1 ? o : h}`, bu = 1e5, u0 = [
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
], c0 = [
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
async function s0(c, o, h) {
  const f = [];
  let p = null;
  do {
    const T = await c("export", { method: "POST", body: { ...o, cursor: p } });
    f.push(...T.items), h(f.length), p = T.next_cursor;
  } while (p && f.length < bu);
  return { rows: f.slice(0, bu), more: !!p || f.length > bu };
}
function r0(c) {
  let o = c == null ? "" : typeof c == "object" ? JSON.stringify(c) : String(c);
  return /^[=+\-@\t\r]/.test(o) && (o = `'${o}`), /[",\n\r]/.test(o) ? `"${o.replace(/"/g, '""')}"` : o;
}
function o0(c, o) {
  const h = c === "events" ? u0 : c0;
  return `\uFEFF${[h.join(","), ...o.map((p) => h.map((T) => r0(p[T])).join(","))].join(`\r
`)}\r
`;
}
const f0 = (c) => c.map((o) => {
  const { children: h, ...f } = o;
  return JSON.stringify(f);
}).join(`
`) + `
`;
function $s(c, o, h) {
  const f = URL.createObjectURL(new Blob([c], { type: h })), p = document.createElement("a");
  p.href = f, p.download = o, p.click(), setTimeout(() => URL.revokeObjectURL(f), 1e3);
}
const d0 = /(-?)(?:([a-z_]+):)?("([^"]*)"?|\S+)/g;
function Fn(c) {
  const o = [];
  for (const h of c.matchAll(d0)) {
    let f = h[3].startsWith('"') ? h[4] ?? "" : h[3], p = h[2] ?? null;
    p && f.startsWith("//") && (f = `${p}:${f}`, p = null), f && o.push({ field: p, value: f, negated: h[1] === "-", text: h[0] });
  }
  return o;
}
const h0 = (c, o) => Fn(c).filter((h) => h !== o && h.text !== o.text).map((h) => h.text).join(" "), Ws = (c) => /\s/.test(c) ? `"${c.replace(/"/g, "")}"` : c, xh = [
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
], lr = (c) => xh.filter((o) => o.kinds.includes(c)), v0 = { events: ["origin", "outcome", "session"], requests: ["origin", "session"] }, m0 = (c) => [...lr(c).map((o) => o.field), ...v0[c]], p0 = (c) => {
  var o;
  return ((o = xh.find((h) => h.field === c)) == null ? void 0 : o.label) ?? In(fe(c));
};
function g0(c, o, h, f = {}) {
  const p = c.startsWith("-"), T = p ? c.slice(1) : c, D = p ? "-" : "", q = T.indexOf(":");
  if (q < 0)
    return lr(o).filter((Y) => Y.field.startsWith(T.toLowerCase()) || Y.label.toLowerCase().startsWith(T.toLowerCase())).map((Y) => ({ insert: `${D}${Y.field}:`, label: `${Y.field}:`, hint: Y.hint }));
  const E = T.slice(0, q), b = T.slice(q + 1).toLowerCase();
  return (() => {
    const Y = (w) => (f[w] ?? []).filter((B) => B.value).map((B) => ({ insert: B.value, label: B.value, hint: B.count.toLocaleString() }));
    switch (E) {
      case "action":
        return Object.entries((h == null ? void 0 : h.actions) ?? {}).map(([w, B]) => ({ insert: w, label: w, hint: B.title }));
      case "category":
        return [...new Set(Object.values((h == null ? void 0 : h.actions) ?? {}).map((w) => w.category))].map((w) => ({ insert: w, label: w }));
      case "actor_type":
        return Object.entries((h == null ? void 0 : h.actor_types) ?? {}).map(([w, B]) => ({ insert: w, label: w, hint: B }));
      case "result":
        return ["success", "failed", "refused"].map((w) => ({ insert: w, label: w }));
      case "method":
        return ["GET", "POST", "PUT", "PATCH", "DELETE"].map((w) => ({ insert: w, label: w }));
      case "status":
        return ["2xx", "4xx", "5xx"].map((w) => ({ insert: w, label: w }));
      case "on":
        return Object.entries((h == null ? void 0 : h.entities) ?? {}).filter(([w]) => !w.includes("_")).map(([w, B]) => ({ insert: `${w}:`, label: `${w}:`, hint: B }));
      case "app":
        return Y("origin");
      case "service":
        return Y("service");
      default:
        return [];
    }
  })().filter((Y) => Y.insert.toLowerCase().startsWith(b) || Y.insert.toLowerCase().split(/[._:]/).some((w) => w.startsWith(b)) || (Y.hint ?? "").toLowerCase().split(/\s+/).some((w) => w.startsWith(b))).slice(0, 12).map((Y) => ({ ...Y, insert: `${D}${E}:${Y.insert.endsWith(":") ? Y.insert : Ws(Y.insert)}` }));
}
const Su = 6e4, Jl = 1440, y0 = [15, 30, 60, 120, 180, 360, 720, 1440, 2880, 10080, 20160, 43200], nh = 7, b0 = new Intl.NumberFormat(void 0, { notation: "compact", maximumFractionDigits: 1 });
function x0(c) {
  const o = c.bucket_minutes * Su, h = new Map(c.buckets.map((p) => [He(p.at), p.count])), f = [];
  for (let p = Math.floor(He(c.occurred_from) / o) * o; p < He(c.occurred_to); p += o)
    f.push({ at: p, count: h.get(p) ?? 0 });
  return f;
}
function S0(c) {
  return c % Jl === 0 ? c === Jl ? "Daily bars" : `${c / Jl}-day bars` : c % 60 === 0 ? c === 60 ? "Hourly bars" : `${c / 60}-hour bars` : `${c}-minute bars`;
}
function Xs(c, o) {
  return o >= Jl ? $l(c) : `${Vl(c)}, ${Vs(c)} – ${Vs(c + o * Su)}`;
}
function j0(c, o) {
  if (c.length < 2) return [];
  const h = (c[c.length - 1].at - c[0].at) / Su, f = y0.find((D) => D >= o && D % o === 0 && h / D <= nh) ?? o * Math.ceil(c.length / nh), p = f >= Jl, T = [];
  return c.forEach((D, q) => {
    if (D.at % (f * Su) !== 0) return;
    const E = T[T.length - 1], b = !E || Vl(c[E.index].at) !== Vl(D.at);
    T.push({ index: q, top: p ? Vl(D.at) : Vs(D.at), bottom: !p && b ? Vl(D.at) : "" });
  }), T;
}
function N0({ chart: c, noun: o, loading: h }) {
  const f = X.useMemo(() => c ? x0(c) : [], [c]), [p, T] = X.useState(null), D = f.reduce((B, Z) => B + Z.count, 0), q = f.reduce((B, Z) => Math.max(B, Z.count), 0), E = f.find((B) => B.count === q && q > 0), b = (c == null ? void 0 : c.bucket_minutes) ?? Jl, U = X.useMemo(() => j0(f, b), [f, b]), Y = o.replace(/s$/, ""), w = p !== null ? f[p] : void 0;
  return /* @__PURE__ */ u.jsxs("div", { className: "ahv-chart", children: [
    /* @__PURE__ */ u.jsxs("div", { className: "ahv-chart-head", children: [
      /* @__PURE__ */ u.jsxs("span", { children: [
        /* @__PURE__ */ u.jsx("strong", { className: "ahv-num", children: h && !c ? "…" : D.toLocaleString() }),
        " ",
        D === 1 ? Y : o,
        c && /* @__PURE__ */ u.jsxs("span", { className: "ahv-dim", children: [
          " · ",
          Vl(He(c.occurred_from)),
          " – ",
          $l(He(c.occurred_to) - 1),
          " UTC"
        ] })
      ] }),
      c && /* @__PURE__ */ u.jsxs("span", { className: "ahv-dim", children: [
        E && /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
          "Peak ",
          /* @__PURE__ */ u.jsx("strong", { className: "ahv-num", children: E.count.toLocaleString() }),
          " at ",
          Xs(E.at, b).split(" – ")[0],
          " · "
        ] }),
        S0(b)
      ] })
    ] }),
    /* @__PURE__ */ u.jsxs(
      "div",
      {
        className: "ahv-chart-plot",
        role: "img",
        "aria-label": `${D.toLocaleString()} ${o}${E ? `, most at ${Xs(E.at, b)} UTC (${E.count})` : ""}`,
        onMouseMove: (B) => {
          if (!f.length) return;
          const Z = B.currentTarget.getBoundingClientRect();
          T(Math.min(f.length - 1, Math.max(0, Math.floor((B.clientX - Z.left) / Z.width * f.length))));
        },
        onMouseLeave: () => T(null),
        children: [
          q > 0 && /* @__PURE__ */ u.jsx("span", { className: "ahv-chart-max ahv-num", children: b0.format(q) }),
          /* @__PURE__ */ u.jsx("svg", { viewBox: `0 0 ${Math.max(f.length, 1)} 100`, preserveAspectRatio: "none", className: "ahv-chart-svg", children: f.map((B, Z) => {
            const k = q ? Math.max(B.count / q * 100, B.count ? 2 : 0) : 0;
            return /* @__PURE__ */ u.jsx(
              "rect",
              {
                x: Z + 0.12,
                width: 0.76,
                y: 100 - k,
                height: k,
                className: Z === p ? "ahv-bar ahv-bar-on" : "ahv-bar"
              },
              B.at
            );
          }) }),
          !h && D === 0 && /* @__PURE__ */ u.jsxs("span", { className: "ahv-chart-empty", children: [
            "No ",
            o,
            " in this period"
          ] }),
          w && /* @__PURE__ */ u.jsxs("div", { className: "ahv-tip", style: { left: `${(p + 0.5) / f.length * 100}%` }, children: [
            /* @__PURE__ */ u.jsx("strong", { className: "ahv-num", children: w.count ? `${w.count.toLocaleString()} ${w.count === 1 ? Y : o}` : `No ${o}` }),
            /* @__PURE__ */ u.jsxs("span", { children: [
              Xs(w.at, b),
              " UTC"
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ u.jsx("div", { className: "ahv-chart-axis", "aria-hidden": "true", children: U.map((B) => /* @__PURE__ */ u.jsxs("span", { style: { left: `${(B.index + 0.5) / f.length * 100}%` }, children: [
      B.top,
      B.bottom && /* @__PURE__ */ u.jsx("b", { children: B.bottom })
    ] }, B.index)) })
  ] });
}
var T0 = gh();
const zt = (...c) => c.filter(Boolean).join(" "), Sh = (c) => oa(c) ? c.actor : a0(c), Fs = (c, o = {}) => oa(c) ? c.actor_label : o[c.actor_type] || In(fe(c.actor_type)) || "Unknown", Ps = {
  sealed: "Sealed: kept unchanged since its minute ended",
  waiting: "Waiting for its seal: each minute is sealed two minutes after it ends"
};
function E0({ value: c, seal: o }) {
  return /* @__PURE__ */ u.jsxs("span", { className: "ahv-when", title: `${c} UTC`, children: [
    /* @__PURE__ */ u.jsxs("span", { className: "ahv-mono", children: [
      Tu(c),
      o && /* @__PURE__ */ u.jsx("span", { className: zt("ahv-seal", o === "waiting" && "ahv-seal-waiting"), title: Ps[o], "aria-label": Ps[o], children: /* @__PURE__ */ u.jsx(jt, { name: o === "sealed" ? "shield" : "history", size: 11 }) })
    ] }),
    /* @__PURE__ */ u.jsx("span", { className: "ahv-dim", children: ar(c) })
  ] });
}
const _0 = (c) => c ? Ps[c] : "";
function A0({ onClick: c, title: o, children: h }) {
  return c ? /* @__PURE__ */ u.jsx(
    "button",
    {
      type: "button",
      className: "ahv-link",
      title: o,
      onClick: (f) => {
        f.stopPropagation(), c();
      },
      onKeyDown: (f) => f.stopPropagation(),
      children: h
    }
  ) : /* @__PURE__ */ u.jsx(u.Fragment, { children: h });
}
function z0({ row: c, actorTypes: o, onFocus: h }) {
  const f = Sh(c), p = Fs(c, o), T = c.actor_type !== "system" && c.actor_id && c.actor_id !== f ? c.actor_id : "";
  return /* @__PURE__ */ u.jsxs("span", { className: "ahv-who", children: [
    /* @__PURE__ */ u.jsx("span", { className: zt("ahv-avatar", c.actor_type === "system" && "ahv-avatar-system"), "aria-hidden": "true", children: bh(f) }),
    /* @__PURE__ */ u.jsxs("span", { className: "ahv-stack", children: [
      /* @__PURE__ */ u.jsx(A0, { title: `Only activity by ${f}`, onClick: c.actor_id ? h : void 0, children: /* @__PURE__ */ u.jsx("span", { className: "ahv-strong ahv-clip", children: f }) }),
      /* @__PURE__ */ u.jsx("span", { className: "ahv-dim ahv-clip", children: [p, T].filter(Boolean).join(" · ") })
    ] })
  ] });
}
function M0({ row: c }) {
  return /* @__PURE__ */ u.jsxs("span", { className: "ahv-where", children: [
    c.origin && /* @__PURE__ */ u.jsx("span", { className: "ahv-tag", children: fe(c.origin) }),
    c.country && /* @__PURE__ */ u.jsx("span", { className: "ahv-dim", title: c.ip || void 0, children: c.country })
  ] });
}
function Eu({ outcome: c }) {
  return c === "success" ? null : /* @__PURE__ */ u.jsx("span", { className: zt("ahv-tag", c === "failed" ? "ahv-tag-bad" : "ahv-tag-warn"), children: c });
}
const O0 = (c) => c >= 500 ? "ahv-tag-bad" : c >= 400 ? "ahv-tag-warn" : "ahv-tag-ok", jh = ({ status: c }) => /* @__PURE__ */ u.jsx("span", { className: zt("ahv-tag ahv-mono", O0(c)), children: c }), Nh = ({ method: c }) => /* @__PURE__ */ u.jsx("span", { className: zt("ahv-tag ahv-mono", `ahv-method-${c.toLowerCase()}`), children: c });
function D0({ row: c }) {
  var h;
  const o = c.children_count ?? ((h = c.children) == null ? void 0 : h.length) ?? 0;
  return /* @__PURE__ */ u.jsxs("span", { className: "ahv-what", children: [
    c.importance === "high" && c.outcome === "success" && /* @__PURE__ */ u.jsx("span", { className: "ahv-mark", title: "Worth attention" }),
    c.outcome !== "success" && /* @__PURE__ */ u.jsx(jt, { name: "alert", size: 14, className: c.outcome === "failed" ? "ahv-bad" : "ahv-warn" }),
    /* @__PURE__ */ u.jsx("span", { className: "ahv-sentence", children: c.summary }),
    o > 0 && /* @__PURE__ */ u.jsxs("span", { className: "ahv-count", title: `${o} record change${o === 1 ? "" : "s"} made by the same request`, children: [
      /* @__PURE__ */ u.jsx(jt, { name: "layers", size: 12 }),
      o
    ] })
  ] });
}
function Th({ row: c }) {
  return /* @__PURE__ */ u.jsxs("span", { className: "ahv-what", children: [
    /* @__PURE__ */ u.jsx(Nh, { method: c.method }),
    /* @__PURE__ */ u.jsx("span", { className: "ahv-mono ahv-clip", children: c.route }),
    /* @__PURE__ */ u.jsx(jh, { status: c.status }),
    /* @__PURE__ */ u.jsxs("span", { className: "ahv-dim ahv-num", children: [
      c.duration_ms,
      " ms"
    ] })
  ] });
}
function Kl({ tone: c = "plain", children: o, action: h }) {
  return /* @__PURE__ */ u.jsxs("div", { className: zt("ahv-message", c === "bad" && "ahv-message-bad"), role: c === "bad" ? "alert" : void 0, children: [
    /* @__PURE__ */ u.jsx("span", { children: o }),
    h
  ] });
}
function nr({ rows: c = 6 }) {
  return /* @__PURE__ */ u.jsx("div", { className: "ahv-skeleton", "aria-busy": "true", children: Array.from({ length: c }, (o, h) => /* @__PURE__ */ u.jsx("span", {}, h)) });
}
function Eh({ facts: c }) {
  return c != null && c.length ? /* @__PURE__ */ u.jsx("span", { className: "ahv-chips-row", children: c.map((o, h) => /* @__PURE__ */ u.jsxs("span", { className: "ahv-fact", children: [
    o.label && /* @__PURE__ */ u.jsx("span", { className: "ahv-dim", children: o.label }),
    /* @__PURE__ */ u.jsx("span", { className: "ahv-mono", children: o.value })
  ] }, h)) }) : null;
}
function _h({ items: c, mono: o = !1 }) {
  const h = c.filter(([, f]) => f != null && f !== "");
  return h.length ? /* @__PURE__ */ u.jsx("div", { className: "ahv-scroll-x", children: /* @__PURE__ */ u.jsx("table", { className: "ahv-kv", children: /* @__PURE__ */ u.jsx("tbody", { children: h.map(([f, p], T) => /* @__PURE__ */ u.jsxs("tr", { children: [
    /* @__PURE__ */ u.jsx("th", { scope: "row", children: f }),
    /* @__PURE__ */ u.jsx("td", { className: zt(o && "ahv-mono"), children: typeof p == "object" ? JSON.stringify(p) : String(p) })
  ] }, `${f}-${T}`)) }) }) }) : null;
}
function ir({ changes: c, valueLabel: o = "Value" }) {
  if (!c.length) return null;
  const h = c.every((p) => p.before === null), f = c.every((p) => p.after === null);
  return /* @__PURE__ */ u.jsx("div", { className: "ahv-scroll-x", children: /* @__PURE__ */ u.jsxs("table", { className: "ahv-changes", children: [
    /* @__PURE__ */ u.jsx("thead", { children: /* @__PURE__ */ u.jsxs("tr", { children: [
      /* @__PURE__ */ u.jsx("th", { children: "Field" }),
      h || f ? /* @__PURE__ */ u.jsx("th", { children: o }) : /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
        /* @__PURE__ */ u.jsx("th", { children: "Before" }),
        /* @__PURE__ */ u.jsx("th", { children: "After" })
      ] })
    ] }) }),
    /* @__PURE__ */ u.jsx("tbody", { children: c.map((p) => /* @__PURE__ */ u.jsxs("tr", { children: [
      /* @__PURE__ */ u.jsx("td", { children: p.label }),
      h || f ? /* @__PURE__ */ u.jsx("td", { className: "ahv-mono", children: (h ? p.after : p.before) ?? "—" }) : /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
        /* @__PURE__ */ u.jsx("td", { className: "ahv-mono ahv-before", children: p.before ?? "—" }),
        /* @__PURE__ */ u.jsx("td", { className: "ahv-mono ahv-after", children: p.after ?? "—" })
      ] })
    ] }, p.field)) })
  ] }) });
}
const R0 = 200, Ah = X.createContext(null);
function Ke({ title: c, children: o }) {
  return /* @__PURE__ */ u.jsxs("section", { className: "ahv-section", children: [
    /* @__PURE__ */ u.jsx("h3", { children: c }),
    o
  ] });
}
const Zl = _h;
function U0({ event: c }) {
  const o = c.change_list;
  if (!(o != null && o.length)) return null;
  const h = o.every((p) => p.before === null), f = o.every((p) => p.after === null);
  return /* @__PURE__ */ u.jsx(Ke, { title: h ? "Recorded values" : f ? "Values removed" : "Changes", children: /* @__PURE__ */ u.jsx(ir, { changes: o }) });
}
function w0({ text: c }) {
  const [o, h] = X.useState(!1);
  return /* @__PURE__ */ u.jsxs("button", { type: "button", className: "ahv-button ahv-button-quiet", onClick: () => {
    var f;
    (f = navigator.clipboard) == null || f.writeText(c).then(() => {
      h(!0), setTimeout(() => h(!1), 1500);
    });
  }, children: [
    /* @__PURE__ */ u.jsx(jt, { name: o ? "check" : "copy", size: 14 }),
    o ? "Copied" : "Copy"
  ] });
}
function q0({ row: c }) {
  const [o, h] = X.useState(!1), { children: f, details: p, ...T } = c, D = JSON.stringify(T, null, 2);
  return /* @__PURE__ */ u.jsxs("section", { className: "ahv-section", children: [
    /* @__PURE__ */ u.jsxs("div", { className: "ahv-row-between", children: [
      /* @__PURE__ */ u.jsxs("button", { type: "button", className: "ahv-disclose", "aria-expanded": o, onClick: () => h((q) => !q), children: [
        /* @__PURE__ */ u.jsx(jt, { name: "chevronDown", size: 14, className: zt(o && "ahv-turned") }),
        "Full record (JSON)"
      ] }),
      /* @__PURE__ */ u.jsx(w0, { text: D })
    ] }),
    o && /* @__PURE__ */ u.jsx("pre", { className: "ahv-pre", children: D })
  ] });
}
function C0({ open: c, events: o, calls: h, onOpen: f }) {
  const p = [...o, ...h].sort((T, D) => T.occurred_at.localeCompare(D.occurred_at));
  return p.length ? /* @__PURE__ */ u.jsx("ol", { className: "ahv-list", children: p.map((T) => /* @__PURE__ */ u.jsx("li", { children: /* @__PURE__ */ u.jsxs("button", { type: "button", disabled: T.id === c.id, onClick: () => f(T), children: [
    /* @__PURE__ */ u.jsx("span", { className: "ahv-mono ahv-dim", children: Tu(T.occurred_at) }),
    oa(T) ? /* @__PURE__ */ u.jsxs("span", { className: "ahv-what", children: [
      /* @__PURE__ */ u.jsx("span", { className: "ahv-sentence", children: T.summary }),
      /* @__PURE__ */ u.jsx(Eu, { outcome: T.outcome })
    ] }) : /* @__PURE__ */ u.jsx(Th, { row: T })
  ] }) }, T.id)) }) : /* @__PURE__ */ u.jsx("p", { className: "ahv-dim", children: "Nothing else was recorded for this request." });
}
function H0(c, o) {
  const h = oa(o);
  return Oe(`${o.id}`, async () => {
    if (h) return c(`events/${o.id}`, { method: "GET" });
    if (!o.request_id) return { same_request: [], requests: [] };
    const f = (D) => c("search", {
      method: "POST",
      body: { kind: D, filters: { request_id: o.request_id }, limit: R0 }
    }), [p, T] = await Promise.all([f("events"), f("requests")]);
    return { same_request: p.items, requests: T.items.filter((D) => D.id !== o.id) };
  });
}
function zh({ request: c, row: o, onClose: h, onFocus: f, actorTypes: p, entities: T, seal: D }) {
  const [q, E] = X.useState(o);
  X.useEffect(() => E(o), [o]);
  const b = X.useRef(null), U = X.useRef(null), Y = X.useRef(h);
  Y.current = h;
  const w = q !== null;
  X.useEffect(() => {
    var tt, O;
    if (!w) return;
    const Z = ((tt = b.current) == null ? void 0 : tt.getRootNode()) ?? document, k = Z.activeElement ?? document.activeElement;
    (O = b.current) == null || O.focus();
    const I = (H) => {
      if (H.key === "Escape")
        H.stopPropagation(), Y.current();
      else if (H.key === "Tab" && U.current) {
        const W = [...U.current.querySelectorAll("button:not(:disabled), [href], input, select, [tabindex]:not([tabindex='-1'])")], F = Z.activeElement;
        if (!W.length) return;
        H.shiftKey && F === W[0] ? (H.preventDefault(), W[W.length - 1].focus()) : !H.shiftKey && F === W[W.length - 1] ? (H.preventDefault(), W[0].focus()) : U.current.contains(F) || (H.preventDefault(), W[0].focus());
      }
    };
    return window.addEventListener("keydown", I, !0), () => {
      var H;
      window.removeEventListener("keydown", I, !0), (H = k == null ? void 0 : k.focus) == null || H.call(k);
    };
  }, [w]);
  const B = X.useContext(Ah);
  return q ? T0.createPortal(
    /* @__PURE__ */ u.jsxs("div", { className: "ahv ahv-drawer-layer", children: [
      /* @__PURE__ */ u.jsx("div", { className: "ahv-backdrop", onClick: h }),
      /* @__PURE__ */ u.jsxs("aside", { ref: U, className: "ahv-drawer", role: "dialog", "aria-modal": "true", "aria-label": "Activity details", children: [
        /* @__PURE__ */ u.jsx("button", { ref: b, type: "button", className: "ahv-icon-button ahv-drawer-close", onClick: h, "aria-label": "Close", children: /* @__PURE__ */ u.jsx(jt, { name: "close" }) }),
        /* @__PURE__ */ u.jsx(
          B0,
          {
            request: c,
            row: q,
            onOpen: E,
            onFocus: f,
            actorTypes: p,
            entities: T,
            seal: q === o ? D : null
          },
          q.id
        )
      ] })
    ] }),
    B ?? document.body
  ) : null;
}
function B0({ request: c, row: o, onOpen: h, onFocus: f, actorTypes: p, entities: T = {}, seal: D }) {
  var w, B, Z, k;
  const q = H0(c, o), E = oa(o) ? ((w = q.data) == null ? void 0 : w.event) ?? o : null, b = Sh(o), U = E != null && E.target_type ? `${T[E.target_type] ?? fe(E.target_type)} ${E.target_name || E.target_id}` : "", Y = `${$l(He(o.occurred_at))}, ${Tu(o.occurred_at)} UTC`;
  return /* @__PURE__ */ u.jsxs("div", { className: "ahv-drawer-body", children: [
    /* @__PURE__ */ u.jsxs("header", { className: "ahv-drawer-head", children: [
      E ? /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
        /* @__PURE__ */ u.jsxs("div", { className: "ahv-tags", children: [
          /* @__PURE__ */ u.jsx("span", { className: "ahv-tag", children: E.title }),
          /* @__PURE__ */ u.jsx(Eu, { outcome: E.outcome }),
          E.importance === "high" && /* @__PURE__ */ u.jsx("span", { className: "ahv-tag ahv-tag-accent", children: "Worth attention" }),
          E.imported && /* @__PURE__ */ u.jsx("span", { className: "ahv-tag", children: "Imported" })
        ] }),
        /* @__PURE__ */ u.jsx("h2", { children: E.summary }),
        /* @__PURE__ */ u.jsx(Eh, { facts: E.facts })
      ] }) : /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
        /* @__PURE__ */ u.jsxs("div", { className: "ahv-tags", children: [
          /* @__PURE__ */ u.jsx(Nh, { method: o.method }),
          /* @__PURE__ */ u.jsx(jh, { status: o.status })
        ] }),
        /* @__PURE__ */ u.jsx("h2", { className: "ahv-mono", children: o.route })
      ] }),
      /* @__PURE__ */ u.jsxs("p", { className: "ahv-dim", children: [
        b,
        " · ",
        Fs(o, p),
        " · ",
        Y
      ] }),
      f && /* @__PURE__ */ u.jsxs("div", { className: "ahv-actions", children: [
        o.actor_id && /* @__PURE__ */ u.jsxs("button", { type: "button", className: "ahv-button", onClick: () => f({ actor_id: o.actor_id }), children: [
          /* @__PURE__ */ u.jsx(jt, { name: "user", size: 14 }),
          "All by ",
          b
        ] }),
        (E == null ? void 0 : E.target_type) && /* @__PURE__ */ u.jsxs(
          "button",
          {
            type: "button",
            className: "ahv-button",
            onClick: () => f({ target_type: E.target_type, target_id: E.target_id }),
            children: [
              /* @__PURE__ */ u.jsx(jt, { name: "history", size: 14 }),
              "Timeline of ",
              U
            ]
          }
        )
      ] })
    ] }),
    E ? /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
      E.outcome !== "success" && E.reason && /* @__PURE__ */ u.jsx(Ke, { title: "Reason", children: /* @__PURE__ */ u.jsx("p", { children: E.reason }) }),
      /* @__PURE__ */ u.jsx(U0, { event: E }),
      (B = E.details) != null && B.length ? /* @__PURE__ */ u.jsx(Ke, { title: "Details", children: /* @__PURE__ */ u.jsx(Zl, { items: E.details.map((I) => [I.label, I.value]) }) }) : E.metadata && !q.loading ? /* @__PURE__ */ u.jsx(Ke, { title: "Details", children: /* @__PURE__ */ u.jsx(Zl, { items: Object.entries(E.metadata).map(([I, tt]) => [In(fe(I)), tt]) }) }) : null,
      (U || E.related.length > 0) && /* @__PURE__ */ u.jsx(Ke, { title: "Concerns", children: /* @__PURE__ */ u.jsx(Zl, { items: [
        ["Target", U],
        ...E.related.map(([I, tt]) => [In(T[I] ?? fe(I)), tt])
      ] }) })
    ] }) : /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
      /* @__PURE__ */ u.jsx(Ke, { title: "Request", children: /* @__PURE__ */ u.jsx(Zl, { items: [["Path", o.path], ["Took", `${o.duration_ms} ms`], ["Service", fe(o.service)]] }) }),
      o.request_body && /* @__PURE__ */ u.jsx(Ke, { title: "Sent (secrets masked)", children: /* @__PURE__ */ u.jsx("pre", { className: "ahv-pre", children: JSON.stringify(o.request_body, null, 2) }) })
    ] }),
    o.request_id && /* @__PURE__ */ u.jsx(Ke, { title: "Same request", children: q.error ? /* @__PURE__ */ u.jsxs(Kl, { tone: "bad", action: /* @__PURE__ */ u.jsx("button", { type: "button", className: "ahv-button", onClick: q.refresh, children: "Retry" }), children: [
      "Couldn't load: ",
      q.error.message
    ] }) : q.loading && !q.data ? /* @__PURE__ */ u.jsx(nr, { rows: 2 }) : /* @__PURE__ */ u.jsx(C0, { open: o, events: ((Z = q.data) == null ? void 0 : Z.same_request) ?? [], calls: ((k = q.data) == null ? void 0 : k.requests) ?? [], onOpen: h }) }),
    /* @__PURE__ */ u.jsx(Ke, { title: "Who and from where", children: /* @__PURE__ */ u.jsx(Zl, { items: [
      ["Who", `${b} (${Fs(o, p)}${o.actor_id && o.actor_id !== b ? ` ${o.actor_id}` : ""})`],
      ["App", o.origin && fe(o.origin)],
      ["Country", o.country],
      ["IP address", o.ip],
      ["Device", E ? E.device : o.user_agent],
      ["Session", o.session_id],
      ["Company", o.tenant_id],
      ["Service", fe(o.service)]
    ] }) }),
    /* @__PURE__ */ u.jsx(Ke, { title: "Reference", children: /* @__PURE__ */ u.jsx(Zl, { items: [
      ["Record id", o.id],
      ["Request id", o.request_id],
      ["Recorded", `${o.received_at} UTC`],
      ["Integrity", _0(D ?? null)],
      ...E ? [["Action", E.action]] : []
    ] }) }),
    /* @__PURE__ */ u.jsx(q0, { row: E ?? o })
  ] });
}
const ih = 65, Is = { events: "Events", access_logs: "Requests" }, k0 = 20, uh = (c, o = Date.now()) => (o - Date.parse(`${c.replace(" ", "T")}:00Z`)) / 6e4, Y0 = () => new Date(Date.now() - 864e5).toISOString().slice(0, 10);
function G0(c, o, h) {
  var p;
  const f = (p = h == null ? void 0 : h.sealed_until) == null ? void 0 : p[o];
  return f ? c.slice(0, 16) <= f ? "sealed" : "waiting" : null;
}
function L0({ request: c, status: o }) {
  var W, F;
  const [h, f] = X.useState(!1), [p, T] = X.useState(Y0), [D, q] = X.useState(!1), [E, b] = X.useState(null), U = X.useRef(null), Y = Oe(
    o != null && o.checks ? "integrity" : null,
    () => c("integrity", { method: "GET" })
  ), w = !!(o != null && o.checks && ((W = Y.data) != null && W.allowed));
  if (!o) return null;
  const B = Object.entries(o.sealed_until ?? {}), Z = o.last_daily, k = (F = o.stats) == null ? void 0 : F.queued;
  if (!B.length && o.recording === void 0 && !Z) return null;
  const I = async (ut) => {
    q(!0);
    try {
      b(await ut());
    } catch (C) {
      b({ kind: "error", message: C.message });
    } finally {
      q(!1);
    }
  }, tt = () => I(async () => ({ kind: "day", ...await c("integrity/verify", { method: "POST", body: { day: p } }) })), O = () => I(async () => {
    const ut = await c(`integrity/seal/${p}`, { method: "GET" });
    return $s(`${JSON.stringify(ut, null, 2)}
`, `activity-seal-${p}.json`, "application/json"), { kind: "downloaded", day: p };
  }), H = (ut) => I(async () => {
    let C;
    try {
      C = JSON.parse(await ut.text());
    } catch {
      C = {};
    }
    if (!C || !Array.isArray(C.seals) || !C.seals.length)
      throw new Error(`${ut.name} is not a seal record: choose a proof downloaded here (activity-seal-<day>.json)`);
    const P = await c("integrity/check", { method: "POST", body: { record: C } });
    return { kind: "proof", name: ut.name, day: String(C.day ?? ""), ...P };
  });
  return /* @__PURE__ */ u.jsxs("div", { className: "ahv-status-wrap", children: [
    /* @__PURE__ */ u.jsxs("div", { className: "ahv-status", role: "status", children: [
      /* @__PURE__ */ u.jsx(jt, { name: "shield", size: 14 }),
      o.recording !== void 0 && /* @__PURE__ */ u.jsx("span", { className: zt("ahv-tag", o.recording ? "ahv-tag-ok" : "ahv-tag-bad"), children: o.recording ? "Recording" : "Not recording" }),
      k !== void 0 && /* @__PURE__ */ u.jsxs("span", { children: [
        "Waiting to be written ",
        /* @__PURE__ */ u.jsx("strong", { className: "ahv-num", children: k.toLocaleString() })
      ] }),
      B.map(([ut, C]) => /* @__PURE__ */ u.jsxs(
        "span",
        {
          className: zt(uh(C) > ih && "ahv-warn"),
          title: uh(C) > ih ? "Sealing is behind" : "Every minute up to this one is sealed",
          children: [
            Is[ut] ?? ut,
            " sealed through ",
            /* @__PURE__ */ u.jsx("strong", { className: "ahv-num", children: C })
          ]
        },
        ut
      )),
      Z && /* @__PURE__ */ u.jsxs("span", { children: [
        "Check of ",
        Z.day,
        ":",
        " ",
        /* @__PURE__ */ u.jsx("strong", { className: Z.ok === !1 ? "ahv-bad" : Z.ok ? "ahv-ok" : "ahv-warn", children: Z.ok === !1 ? `${Z.problems ?? ""} problem(s)`.trim() : Z.ok ? "intact" : "not checked" })
      ] }),
      w && /* @__PURE__ */ u.jsx("button", { type: "button", className: "ahv-link-button ahv-push-right", "aria-expanded": h, onClick: () => f((ut) => !ut), children: "Check integrity" })
    ] }),
    h && w && /* @__PURE__ */ u.jsxs("div", { className: "ahv-checks", children: [
      /* @__PURE__ */ u.jsxs("div", { className: "ahv-bar", children: [
        /* @__PURE__ */ u.jsxs("label", { className: "ahv-field", children: [
          /* @__PURE__ */ u.jsx("span", { children: "Day (UTC)" }),
          /* @__PURE__ */ u.jsx(
            "input",
            {
              type: "date",
              className: "ahv-input",
              value: p,
              max: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
              min: "2000-01-01",
              onChange: (ut) => T(ut.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ u.jsxs("button", { type: "button", className: "ahv-button ahv-button-main", disabled: D || !p, onClick: tt, children: [
          /* @__PURE__ */ u.jsx(jt, { name: "shield", size: 14 }),
          D ? "Checking…" : "Check this day"
        ] }),
        /* @__PURE__ */ u.jsxs(
          "button",
          {
            type: "button",
            className: "ahv-button",
            disabled: D || !p,
            onClick: O,
            title: "The day's last seal of each table, to keep outside the database",
            children: [
              /* @__PURE__ */ u.jsx(jt, { name: "download", size: 14 }),
              "Download proof"
            ]
          }
        ),
        /* @__PURE__ */ u.jsxs(
          "button",
          {
            type: "button",
            className: "ahv-button",
            disabled: D,
            title: "Compare a proof kept earlier with the database",
            onClick: () => {
              var ut;
              return (ut = U.current) == null ? void 0 : ut.click();
            },
            children: [
              /* @__PURE__ */ u.jsx(jt, { name: "check", size: 14 }),
              "Check a kept proof"
            ]
          }
        ),
        /* @__PURE__ */ u.jsx(
          "input",
          {
            ref: U,
            type: "file",
            accept: "application/json,.json",
            className: "ahv-hidden",
            tabIndex: -1,
            "aria-hidden": "true",
            onChange: (ut) => {
              var P;
              const C = (P = ut.target.files) == null ? void 0 : P[0];
              ut.target.value = "", C && H(C);
            }
          }
        )
      ] }),
      E && /* @__PURE__ */ u.jsx(X0, { verdict: E })
    ] })
  ] });
}
function X0({ verdict: c }) {
  return c.kind === "error" ? /* @__PURE__ */ u.jsx("p", { className: "ahv-bad", role: "alert", children: c.message }) : c.kind === "day" ? /* @__PURE__ */ u.jsxs("div", { role: "status", className: zt("ahv-verdict", c.ok ? "ahv-verdict-ok" : "ahv-verdict-bad"), children: [
    /* @__PURE__ */ u.jsx("strong", { children: c.ok ? `${c.day}: intact. ${c.rows.toLocaleString()} records in ${c.checked.toLocaleString()} sealed minutes match their seals.` : `${c.day}: ${(c.problems.length + c.more).toLocaleString()} problem(s) found.` }),
    !c.ok && /* @__PURE__ */ u.jsxs("ul", { children: [
      c.problems.slice(0, k0).map((o, h) => /* @__PURE__ */ u.jsxs("li", { children: [
        /* @__PURE__ */ u.jsx("span", { className: "ahv-mono", children: o.window_start }),
        " ",
        Is[o.table] ?? o.table,
        ": ",
        o.problem
      ] }, h)),
      c.more > 0 && /* @__PURE__ */ u.jsxs("li", { className: "ahv-dim", children: [
        "and ",
        c.more.toLocaleString(),
        " more"
      ] })
    ] })
  ] }) : c.kind === "downloaded" ? /* @__PURE__ */ u.jsx("div", { role: "status", className: "ahv-verdict ahv-verdict-ok", children: /* @__PURE__ */ u.jsxs("strong", { children: [
    "Proof of ",
    c.day,
    " downloaded. Keep it outside this system: checking it later shows any rewrite since."
  ] }) }) : c.mismatches.length ? /* @__PURE__ */ u.jsxs("div", { role: "status", className: "ahv-verdict ahv-verdict-bad", children: [
    /* @__PURE__ */ u.jsxs("strong", { children: [
      c.name,
      ": the database no longer matches this proof of ",
      c.day,
      "."
    ] }),
    /* @__PURE__ */ u.jsx("ul", { children: c.mismatches.map((o, h) => /* @__PURE__ */ u.jsxs("li", { children: [
      /* @__PURE__ */ u.jsx("span", { className: "ahv-mono", children: o.window_start }),
      " ",
      Is[o.table] ?? o.table,
      ": ",
      o.problem
    ] }, h)) })
  ] }) : /* @__PURE__ */ u.jsx("div", { role: "status", className: "ahv-verdict ahv-verdict-ok", children: /* @__PURE__ */ u.jsxs("strong", { children: [
    c.name,
    ": the database still matches this proof of ",
    c.day,
    "."
  ] }) });
}
function ch(c, o) {
  const h = c.lastIndexOf(" ", o - 1) + 1, f = c.indexOf(" ", o);
  return { start: h, end: f < 0 ? c.length : f, word: c.slice(h, f < 0 ? c.length : f) };
}
function Q0({ value: c, onChange: o, onSubmit: h, suggestions: f, placeholder: p, inputRef: T }) {
  const D = X.useRef(null), q = T ?? D, E = X.useId(), [b, U] = X.useState(0), [Y, w] = X.useState(!1), [B, Z] = X.useState(0), [k, I] = X.useState(!1), { start: tt, end: O, word: H } = ch(c, b), W = Y ? f(H) : [], F = W[Math.min(B, W.length - 1)], ut = (C) => {
    const P = c.slice(O), Rt = C.insert.endsWith(":") ? "" : " ", Be = `${c.slice(0, tt)}${C.insert}${P.startsWith(" ") || !Rt ? "" : Rt}${P}`, ae = tt + C.insert.length + (C.insert.endsWith(":") ? 0 : 1);
    o(Be), Z(0), I(!1), requestAnimationFrame(() => {
      var Nt, be;
      (Nt = q.current) == null || Nt.focus(), (be = q.current) == null || be.setSelectionRange(ae, ae), U(ae);
    });
  };
  return /* @__PURE__ */ u.jsxs("div", { className: "ahv-search", children: [
    /* @__PURE__ */ u.jsxs("span", { className: "ahv-input-icon", children: [
      /* @__PURE__ */ u.jsx(jt, { name: "search", size: 14 }),
      /* @__PURE__ */ u.jsx(
        "input",
        {
          ref: q,
          className: "ahv-input",
          role: "combobox",
          "aria-label": "Search",
          "aria-expanded": W.length > 0,
          "aria-controls": E,
          "aria-autocomplete": "list",
          "aria-activedescendant": W.length && k ? `${E}-${W.indexOf(F)}` : void 0,
          value: c,
          placeholder: p,
          spellCheck: !1,
          onChange: (C) => {
            o(C.target.value), U(C.target.selectionStart ?? C.target.value.length), w(!0), Z(0), I(!1);
          },
          onSelect: (C) => {
            const P = C.currentTarget.selectionStart ?? 0;
            ch(c, P).start !== tt && I(!1), U(P);
          },
          onFocus: () => w(!0),
          onBlur: () => setTimeout(() => {
            w(!1), I(!1);
          }, 120),
          onKeyDown: (C) => {
            W.length && (C.key === "ArrowDown" || C.key === "ArrowUp") ? (C.preventDefault(), Z((P) => k ? (P + (C.key === "ArrowDown" ? 1 : W.length - 1)) % W.length : C.key === "ArrowDown" ? 0 : W.length - 1), I(!0)) : W.length && k && C.key === "Enter" ? (C.preventDefault(), ut(F)) : C.key === "Escape" ? (w(!1), I(!1)) : C.key === "Enter" && (w(!1), h());
          }
        }
      )
    ] }),
    W.length > 0 && /* @__PURE__ */ u.jsx("ul", { id: E, role: "listbox", className: "ahv-suggest", children: W.map((C, P) => /* @__PURE__ */ u.jsxs(
      "li",
      {
        id: `${E}-${P}`,
        role: "option",
        "aria-selected": k && C === F,
        className: zt(k && C === F && "ahv-suggest-on"),
        onMouseDown: (Rt) => {
          Rt.preventDefault(), ut(C);
        },
        onMouseEnter: () => {
          Z(P), I(!0);
        },
        children: [
          /* @__PURE__ */ u.jsx("span", { className: "ahv-mono", children: C.label }),
          C.hint && /* @__PURE__ */ u.jsx("span", { className: "ahv-dim", children: C.hint })
        ]
      },
      C.insert
    )) })
  ] });
}
function ur({ label: c, icon: o, children: h, open: f, setOpen: p, badge: T, disabled: D }) {
  const q = X.useRef(null);
  return X.useEffect(() => {
    if (!f) return;
    const E = (U) => {
      q.current && !U.composedPath().includes(q.current) && p(!1);
    }, b = (U) => U.key === "Escape" && p(!1);
    return document.addEventListener("mousedown", E), document.addEventListener("keydown", b), () => {
      document.removeEventListener("mousedown", E), document.removeEventListener("keydown", b);
    };
  }, [f, p]), /* @__PURE__ */ u.jsxs("div", { className: "ahv-menu", ref: q, children: [
    /* @__PURE__ */ u.jsxs("button", { type: "button", className: "ahv-button", "aria-expanded": f, disabled: D, onClick: () => p(!f), children: [
      /* @__PURE__ */ u.jsx(jt, { name: o, size: 14 }),
      c,
      T && /* @__PURE__ */ u.jsx("span", { className: "ahv-count", children: T }),
      /* @__PURE__ */ u.jsx(jt, { name: "chevronDown", size: 14 })
    ] }),
    f && /* @__PURE__ */ u.jsx("div", { className: "ahv-menu-list ahv-menu-panel", children: h })
  ] });
}
function Z0({ columns: c, shown: o, onChange: h }) {
  const [f, p] = X.useState(!1);
  return /* @__PURE__ */ u.jsxs(ur, { label: "Columns", icon: "sliders", open: f, setOpen: p, children: [
    /* @__PURE__ */ u.jsx("p", { className: "ahv-dim ahv-small", children: "When, who and what always show." }),
    c.map((T) => /* @__PURE__ */ u.jsxs("label", { className: "ahv-check", children: [
      /* @__PURE__ */ u.jsx(
        "input",
        {
          type: "checkbox",
          checked: o.includes(T.key),
          onChange: (D) => h(D.target.checked ? [...o, T.key] : o.filter((q) => q !== T.key))
        }
      ),
      T.label
    ] }, T.key))
  ] });
}
function V0({ request: c, current: o, onOpen: h }) {
  var O;
  const [f, p] = X.useState(!1), T = Oe("views", () => c("views", { method: "GET" })), [D, q] = X.useState(""), [E, b] = X.useState(!1), [U, Y] = X.useState(!1), [w, B] = X.useState(null);
  if (!((O = T.data) != null && O.enabled)) return null;
  const Z = T.data.views, k = Z.find((H) => H.search === o), I = async (H) => {
    Y(!0), B(null);
    try {
      await H(), T.refresh(), q("");
    } catch (W) {
      B(W.message);
    } finally {
      Y(!1);
    }
  }, tt = (H, W = D, F = E) => I(() => c("views", { method: "POST", body: { id: H, name: W.trim(), search: o, shared: F } }));
  return /* @__PURE__ */ u.jsxs(ur, { label: k ? k.name : "Views", icon: "layers", open: f, setOpen: p, children: [
    Z.length ? /* @__PURE__ */ u.jsx("ul", { className: "ahv-views", children: Z.map((H) => /* @__PURE__ */ u.jsxs("li", { className: zt(H === k && "ahv-views-on"), children: [
      /* @__PURE__ */ u.jsxs("button", { type: "button", className: "ahv-views-open", onClick: () => {
        h(H.search), p(!1);
      }, children: [
        /* @__PURE__ */ u.jsx("span", { children: H.name }),
        /* @__PURE__ */ u.jsx("span", { className: "ahv-dim ahv-small", children: H.mine ? H.shared ? "Shared by you" : "Only you" : `Shared by ${H.owner_name}` })
      ] }),
      H.mine && /* @__PURE__ */ u.jsxs("span", { className: "ahv-views-tools", children: [
        H.search !== o && /* @__PURE__ */ u.jsx(
          "button",
          {
            type: "button",
            className: "ahv-icon-button",
            title: "Save the current search into this view",
            disabled: U,
            onClick: () => tt(H.id, H.name, H.shared),
            children: /* @__PURE__ */ u.jsx(jt, { name: "refresh", size: 14 })
          }
        ),
        /* @__PURE__ */ u.jsx(
          "button",
          {
            type: "button",
            className: "ahv-icon-button",
            title: "Remove this view",
            disabled: U,
            onClick: () => I(() => c(`views/${H.id}`, { method: "DELETE" })),
            children: /* @__PURE__ */ u.jsx(jt, { name: "close", size: 14 })
          }
        )
      ] })
    ] }, H.id)) }) : /* @__PURE__ */ u.jsx("p", { className: "ahv-dim ahv-small", children: "No saved views yet. Save the current search to come back to it." }),
    /* @__PURE__ */ u.jsxs("form", { className: "ahv-views-save", onSubmit: (H) => {
      H.preventDefault(), D.trim() && tt();
    }, children: [
      /* @__PURE__ */ u.jsx(
        "input",
        {
          className: "ahv-input",
          value: D,
          maxLength: 80,
          placeholder: "Name this search",
          "aria-label": "View name",
          onChange: (H) => q(H.target.value)
        }
      ),
      /* @__PURE__ */ u.jsxs("label", { className: "ahv-check", children: [
        /* @__PURE__ */ u.jsx("input", { type: "checkbox", checked: E, onChange: (H) => b(H.target.checked) }),
        "Share with my team"
      ] }),
      /* @__PURE__ */ u.jsx("button", { type: "submit", className: "ahv-button ahv-button-main", disabled: U || !D.trim(), children: "Save view" }),
      w && /* @__PURE__ */ u.jsx("span", { className: "ahv-bad ahv-small", children: w })
    ] })
  ] });
}
const K0 = { active: ["Active", "ahv-tag-ok"], failing: ["Failing", "ahv-tag-bad"], paused: ["Paused", "ahv-tag-warn"] }, sh = { events: "Events", requests: "API requests", both: "Events and API requests" }, Mh = {
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
}, Qs = (c) => c.destination === "webhook" ? c.target.url ?? "" : `s3://${[c.target.bucket, c.target.prefix].filter(Boolean).join("/")}`, rh = (c) => ({
  ...Mh,
  id: c.id,
  name: c.name,
  kind: c.kind,
  query: c.query,
  destination: c.destination,
  url: c.target.url ?? "",
  headers: Object.keys(c.target.headers ?? {}).map((o) => `${o}: `).join(`
`),
  bucket: c.target.bucket ?? "",
  prefix: c.target.prefix ?? "",
  region: c.target.region ?? "",
  endpoint: c.target.endpoint ?? "",
  enabled: c.enabled
});
function J0(c) {
  const o = {};
  for (const h of c.split(`
`)) {
    const f = h.indexOf(":");
    f > 0 && (o[h.slice(0, f).trim()] = h.slice(f + 1).trim());
  }
  return o;
}
function oh(c) {
  const o = c.destination === "webhook", h = o ? c.secret || void 0 : c.accessKey || c.secretKey ? { access_key: c.accessKey, secret_key: c.secretKey } : void 0;
  return {
    id: c.id,
    name: c.name.trim(),
    kind: c.kind,
    query: c.query.trim(),
    destination: c.destination,
    target: o ? { url: c.url.trim() } : { bucket: c.bucket.trim(), prefix: c.prefix.trim(), region: c.region.trim(), endpoint: c.endpoint.trim() },
    // header values are secrets: sent under a name the access log masks, kept encrypted
    secret: h,
    secret_headers: o ? J0(c.headers) : {},
    enabled: c.enabled,
    start: c.start
  };
}
const fh = () => Array.from(crypto.getRandomValues(new Uint8Array(24)), (c) => c.toString(16).padStart(2, "0")).join("");
function $0({ request: c, kinds: o, list: h, refresh: f }) {
  const [p, T] = X.useState(null), [D, q] = X.useState(!1), [E, b] = X.useState(null), U = async (O, H) => {
    q(!0), b(null);
    try {
      return await O(), H && b({ ok: !0, text: H }), f(), !0;
    } catch (W) {
      return b({ ok: !1, text: W.message }), !1;
    } finally {
      q(!1);
    }
  }, Y = async (O) => {
    O.preventDefault(), p && await U(() => c("streams", { method: "POST", body: oh(p) }), `${p.name.trim()} saved.`) && T(null);
  }, w = (O) => U(async () => {
    const H = await c(`streams/${O.id}/test`, { method: "POST" });
    if (!H.ok) throw new Error(`${O.name}: ${H.error}`);
  }, `${O.name}: the test line was delivered.`), B = (O) => U(
    () => c("streams", { method: "POST", body: { ...oh(rh(O)), enabled: !O.enabled } }),
    `${O.name} ${O.enabled ? "paused" : "resumed"}.`
  ), Z = (O) => window.confirm(`Remove ${O.name}? Nothing more is sent to ${Qs(O)}.`) && U(() => c(`streams/${O.id}`, { method: "DELETE" }), `${O.name} removed.`), k = (O) => T((H) => H && { ...H, ...O }), I = o.includes("requests") ? ["events", "requests", "both"] : ["events"], tt = p && !I.includes(p.kind) ? [...I, p.kind] : I;
  return /* @__PURE__ */ u.jsxs("section", { className: "ahv-streams", "aria-label": "Streams", children: [
    /* @__PURE__ */ u.jsxs("div", { className: "ahv-bar", children: [
      /* @__PURE__ */ u.jsx("p", { className: "ahv-dim ahv-small", children: "Each stream sends new records to your own system as they are sealed, a few minutes after they happen. Webhooks receive JSON lines signed with your secret; S3 buckets receive one gzip file per batch." }),
      !p && /* @__PURE__ */ u.jsx(
        "button",
        {
          type: "button",
          className: "ahv-button ahv-button-main ahv-push-right",
          onClick: () => {
            b(null), T({ ...Mh, secret: fh() });
          },
          children: "Add stream"
        }
      )
    ] }),
    h.streams.length > 0 && !p && /* @__PURE__ */ u.jsx("ul", { className: "ahv-stream-list", children: h.streams.map((O) => {
      const [H, W] = K0[O.state];
      return /* @__PURE__ */ u.jsxs("li", { children: [
        /* @__PURE__ */ u.jsxs("div", { className: "ahv-stream-main", children: [
          /* @__PURE__ */ u.jsx("strong", { children: O.name }),
          /* @__PURE__ */ u.jsx("span", { className: zt("ahv-tag", W), children: H }),
          /* @__PURE__ */ u.jsxs("span", { className: "ahv-dim ahv-small", children: [
            sh[O.kind],
            O.query && /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
              " matching ",
              /* @__PURE__ */ u.jsx("code", { className: "ahv-mono", children: O.query })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ u.jsx("span", { className: "ahv-mono ahv-dim ahv-stream-where", title: Qs(O), children: Qs(O) }),
        /* @__PURE__ */ u.jsxs("span", { className: "ahv-small", children: [
          /* @__PURE__ */ u.jsx("strong", { className: "ahv-num", children: O.delivered.toLocaleString() }),
          " delivered",
          O.last_delivered_at && /* @__PURE__ */ u.jsxs("span", { className: "ahv-dim", children: [
            ", last ",
            ar(O.last_delivered_at) || O.last_delivered_at.slice(0, 16)
          ] })
        ] }),
        /* @__PURE__ */ u.jsxs("span", { className: "ahv-stream-tools", children: [
          /* @__PURE__ */ u.jsx("button", { type: "button", className: "ahv-link-button", disabled: D, onClick: () => w(O), children: "Send test" }),
          /* @__PURE__ */ u.jsx("button", { type: "button", className: "ahv-link-button", disabled: D, onClick: () => B(O), children: O.enabled ? "Pause" : "Resume" }),
          /* @__PURE__ */ u.jsx("button", { type: "button", className: "ahv-link-button", disabled: D, onClick: () => {
            b(null), T(rh(O));
          }, children: "Edit" }),
          /* @__PURE__ */ u.jsx("button", { type: "button", className: "ahv-icon-button", title: `Remove ${O.name}`, disabled: D, onClick: () => Z(O), children: /* @__PURE__ */ u.jsx(jt, { name: "close", size: 14 }) })
        ] }),
        O.state === "failing" && O.error && /* @__PURE__ */ u.jsxs("span", { className: "ahv-bad ahv-small", children: [
          O.error,
          ". It is tried again shortly."
        ] })
      ] }, O.id);
    }) }),
    !h.streams.length && !p && /* @__PURE__ */ u.jsx("p", { className: "ahv-dim ahv-small", children: "No streams yet." }),
    p && /* @__PURE__ */ u.jsxs("form", { className: "ahv-stream-form", onSubmit: Y, children: [
      /* @__PURE__ */ u.jsxs("label", { className: "ahv-field", children: [
        /* @__PURE__ */ u.jsx("span", { children: "Name" }),
        /* @__PURE__ */ u.jsx("input", { className: "ahv-input", required: !0, maxLength: 80, value: p.name, placeholder: "CRM intake", onChange: (O) => k({ name: O.target.value }) })
      ] }),
      /* @__PURE__ */ u.jsxs("label", { className: "ahv-field", children: [
        /* @__PURE__ */ u.jsx("span", { children: "Records" }),
        /* @__PURE__ */ u.jsx("select", { className: "ahv-input", value: p.kind, disabled: tt.length < 2, onChange: (O) => k({ kind: O.target.value }), children: tt.map((O) => /* @__PURE__ */ u.jsx("option", { value: O, children: sh[O] }, O)) })
      ] }),
      /* @__PURE__ */ u.jsxs("label", { className: "ahv-field ahv-field-wide", children: [
        /* @__PURE__ */ u.jsxs("span", { children: [
          "Only records matching ",
          /* @__PURE__ */ u.jsx("em", { className: "ahv-dim", children: "(optional, the search language)" })
        ] }),
        /* @__PURE__ */ u.jsx(
          "input",
          {
            className: "ahv-input ahv-mono",
            maxLength: 500,
            value: p.query,
            placeholder: "action:trade.* -result:success",
            onChange: (O) => k({ query: O.target.value })
          }
        )
      ] }),
      /* @__PURE__ */ u.jsxs("div", { className: "ahv-field ahv-field-wide", children: [
        /* @__PURE__ */ u.jsx("span", { children: "Send to" }),
        /* @__PURE__ */ u.jsx("div", { className: "ahv-segment", role: "group", "aria-label": "Destination", children: ["webhook", "s3"].map((O) => /* @__PURE__ */ u.jsx(
          "button",
          {
            type: "button",
            "aria-pressed": p.destination === O,
            disabled: !!p.id,
            onClick: () => k({ destination: O, secret: O === "webhook" && !p.id ? fh() : "" }),
            children: O === "webhook" ? "Webhook" : "S3 bucket"
          },
          O
        )) })
      ] }),
      p.destination === "webhook" ? /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
        /* @__PURE__ */ u.jsxs("label", { className: "ahv-field ahv-field-wide", children: [
          /* @__PURE__ */ u.jsxs("span", { children: [
            "URL ",
            /* @__PURE__ */ u.jsx("em", { className: "ahv-dim", children: "(https, on the internet)" })
          ] }),
          /* @__PURE__ */ u.jsx(
            "input",
            {
              className: "ahv-input ahv-mono",
              type: "url",
              required: !0,
              value: p.url,
              placeholder: "https://crm.example.com/activity",
              onChange: (O) => k({ url: O.target.value })
            }
          )
        ] }),
        /* @__PURE__ */ u.jsxs("label", { className: "ahv-field ahv-field-wide", children: [
          /* @__PURE__ */ u.jsxs("span", { children: [
            "Signing secret ",
            /* @__PURE__ */ u.jsx("em", { className: "ahv-dim", children: p.id ? "(blank keeps the current one while the URL's host stays the same)" : "(copy it to your receiver: it is not shown again)" })
          ] }),
          /* @__PURE__ */ u.jsx(
            "input",
            {
              className: "ahv-input ahv-mono",
              minLength: 16,
              required: !p.id,
              value: p.secret,
              autoComplete: "off",
              onChange: (O) => k({ secret: O.target.value })
            }
          )
        ] }),
        /* @__PURE__ */ u.jsxs("label", { className: "ahv-field ahv-field-wide", children: [
          /* @__PURE__ */ u.jsxs("span", { children: [
            "Headers ",
            /* @__PURE__ */ u.jsx("em", { className: "ahv-dim", children: '(one "Name: value" a line, kept encrypted; on an edit a blank value keeps the stored one)' })
          ] }),
          /* @__PURE__ */ u.jsx(
            "textarea",
            {
              className: "ahv-input ahv-textarea ahv-mono",
              rows: 2,
              value: p.headers,
              placeholder: "Authorization: Bearer …",
              onChange: (O) => k({ headers: O.target.value })
            }
          )
        ] })
      ] }) : /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
        /* @__PURE__ */ u.jsxs("label", { className: "ahv-field", children: [
          /* @__PURE__ */ u.jsx("span", { children: "Bucket" }),
          /* @__PURE__ */ u.jsx("input", { className: "ahv-input", required: !0, value: p.bucket, onChange: (O) => k({ bucket: O.target.value }) })
        ] }),
        /* @__PURE__ */ u.jsxs("label", { className: "ahv-field", children: [
          /* @__PURE__ */ u.jsxs("span", { children: [
            "Folder ",
            /* @__PURE__ */ u.jsx("em", { className: "ahv-dim", children: "(optional)" })
          ] }),
          /* @__PURE__ */ u.jsx("input", { className: "ahv-input", value: p.prefix, placeholder: "activity", onChange: (O) => k({ prefix: O.target.value }) })
        ] }),
        /* @__PURE__ */ u.jsxs("label", { className: "ahv-field", children: [
          /* @__PURE__ */ u.jsxs("span", { children: [
            "Region ",
            /* @__PURE__ */ u.jsx("em", { className: "ahv-dim", children: "(optional)" })
          ] }),
          /* @__PURE__ */ u.jsx("input", { className: "ahv-input", value: p.region, placeholder: "eu-central-1", onChange: (O) => k({ region: O.target.value }) })
        ] }),
        /* @__PURE__ */ u.jsxs("label", { className: "ahv-field", children: [
          /* @__PURE__ */ u.jsxs("span", { children: [
            "Endpoint ",
            /* @__PURE__ */ u.jsx("em", { className: "ahv-dim", children: "(for R2, MinIO …)" })
          ] }),
          /* @__PURE__ */ u.jsx("input", { className: "ahv-input ahv-mono", type: "url", value: p.endpoint, onChange: (O) => k({ endpoint: O.target.value }) })
        ] }),
        /* @__PURE__ */ u.jsxs("label", { className: "ahv-field", children: [
          /* @__PURE__ */ u.jsxs("span", { children: [
            "Access key ",
            p.id && /* @__PURE__ */ u.jsx("em", { className: "ahv-dim", children: "(blank keeps it)" })
          ] }),
          /* @__PURE__ */ u.jsx("input", { className: "ahv-input ahv-mono", required: !p.id, autoComplete: "off", value: p.accessKey, onChange: (O) => k({ accessKey: O.target.value }) })
        ] }),
        /* @__PURE__ */ u.jsxs("label", { className: "ahv-field", children: [
          /* @__PURE__ */ u.jsx("span", { children: "Secret key" }),
          /* @__PURE__ */ u.jsx(
            "input",
            {
              className: "ahv-input ahv-mono",
              type: "password",
              required: !p.id || !!p.accessKey,
              autoComplete: "new-password",
              value: p.secretKey,
              onChange: (O) => k({ secretKey: O.target.value })
            }
          )
        ] })
      ] }),
      !p.id && /* @__PURE__ */ u.jsxs("label", { className: "ahv-field ahv-field-wide", children: [
        /* @__PURE__ */ u.jsx("span", { children: "Start with" }),
        /* @__PURE__ */ u.jsxs("select", { className: "ahv-input", value: p.start, onChange: (O) => k({ start: O.target.value }), children: [
          /* @__PURE__ */ u.jsx("option", { value: "now", children: "Records from now on" }),
          /* @__PURE__ */ u.jsx("option", { value: "beginning", children: "Everything already kept, then what follows" })
        ] })
      ] }),
      /* @__PURE__ */ u.jsxs("div", { className: "ahv-bar ahv-field-wide", children: [
        /* @__PURE__ */ u.jsx("button", { type: "submit", className: "ahv-button ahv-button-main", disabled: D, children: D ? "Saving…" : p.id ? "Save changes" : "Add stream" }),
        /* @__PURE__ */ u.jsx("button", { type: "button", className: "ahv-button", disabled: D, onClick: () => T(null), children: "Cancel" })
      ] })
    ] }),
    E && /* @__PURE__ */ u.jsx("p", { role: E.ok ? "status" : "alert", className: zt("ahv-small", E.ok ? "ahv-ok" : "ahv-bad"), children: E.text })
  ] });
}
const dh = [
  { value: "important", label: "Important", hint: "What people did, without the details behind it" },
  { value: "all", label: "All", hint: "Every record, each request's row changes inside its event" },
  { value: "problems", label: "Problems", hint: "Only what failed or was refused" }
], W0 = [
  { label: "All requests", search: {} },
  { label: "Changes only", search: { filters: { method: ["POST", "PUT", "PATCH", "DELETE"] } } },
  { label: "Errors", search: { status_from: 400 } }
], tr = [
  { value: "1h", label: "Last hour", minutes: 60 },
  { value: "24h", label: "Last 24 hours", minutes: 1440 },
  { value: "7d", label: "Last 7 days", minutes: 10080 },
  { value: "30d", label: "Last 30 days", minutes: 43200 },
  { value: "all", label: "All time" },
  { value: "custom", label: "Dates…" }
], hh = {
  events: [
    { key: "where", label: "Where" },
    { key: "concerning", label: "Concerning" },
    { key: "result", label: "Result" },
    { key: "service", label: "Service" },
    { key: "ip", label: "IP address" }
  ],
  requests: [{ key: "where", label: "Where" }, { key: "service", label: "Service" }, { key: "ip", label: "IP address" }]
}, vh = ["where"], F0 = [], Oh = "activity-hub-columns", xu = ["kind", "view", "p", "q", "range", "from", "to", "cols"], Pn = (c) => c ? "all" : "7d";
function mh(c, o) {
  const h = (T) => {
    const D = c.get(T) ?? "";
    return Ks(D) ? D : "";
  }, f = h("from"), p = h("to");
  return { q: c.get("q") ?? "", from: f, to: p, range: c.get("range") || (f || p ? "custom" : Pn(o)) };
}
function P0(c) {
  var h;
  if (c.range === "custom")
    return { occurred_from: Ks(c.from) ? Js(c.from) : void 0, occurred_to: Ks(c.to) ? l0(c.to) : void 0 };
  const o = (h = tr.find((f) => f.value === c.range)) == null ? void 0 : h.minutes;
  return o ? { occurred_from: `${n0(o).slice(0, 16)}:00` } : {};
}
function I0(c, o, h, f, p) {
  const T = { ...(h == null ? void 0 : h.search.filters) ?? {} }, D = { kind: c, filters: T, query: f.q.trim() || void 0, ...P0(f) };
  return c === "events" ? (D.view = o, D.action = h == null ? void 0 : h.search.action, p && Object.assign(D, { related_type: p.type, related_id: p.id })) : (D.status_from = h == null ? void 0 : h.search.status_from, p && (T.actor_id = p.id)), D;
}
const tp = (c) => {
  const o = new URLSearchParams();
  return c.forEach((h, f) => xu.includes(f) && o.set(f, h)), o.toString();
};
function ep() {
  try {
    return JSON.parse(localStorage.getItem(Oh) ?? "null") ?? vh;
  } catch {
    return vh;
  }
}
function ap({
  request: c,
  title: o = "Activity Log",
  description: h,
  presets: f = F0,
  kinds: p = ["events", "requests"],
  entity: T,
  params: D,
  onParamsChange: q,
  canExport: E = !1,
  showStatus: b = !0,
  pageSize: U = 100,
  liveEveryMs: Y = 5e3,
  className: w
}) {
  var Fl, il, ha, si, Pl, Il, ul;
  const [B, Z] = X.useState(() => new URLSearchParams()), k = D ?? B, I = X.useCallback((j) => q ? q(j) : Z(j), [q]), tt = k.get("kind") === "requests" && p.includes("requests") ? "requests" : p[0], O = ((Fl = dh.find((j) => j.value === k.get("view"))) == null ? void 0 : Fl.value) ?? "important", H = X.useMemo(() => tt === "events" ? [{ label: "Everything", search: {} }, ...f] : W0, [tt, f]), W = Math.min(Math.max(Number(k.get("p")) || 0, 0), H.length - 1), F = k.has("cols") ? (k.get("cols") || "").split(",").filter(Boolean) : ep(), ut = hh[tt].filter((j) => F.includes(j.key)), C = X.useMemo(() => mh(k, T), [k, T]), [P, Rt] = X.useState(C), [Be, ae] = X.useState(k.toString());
  Be !== k.toString() && (ae(k.toString()), Rt(C));
  const [Nt, be] = X.useState(!1), [De, Ct] = X.useState(null), [_, G] = X.useState(null), [et, gt] = X.useState(!1), [v, R] = X.useState(null), Q = X.useRef(null), [, L] = X.useState(0);
  X.useEffect(() => {
    const j = setInterval(() => L((ct) => ct + 1), 3e4);
    return () => clearInterval(j);
  }, []);
  const J = X.useMemo(
    () => I0(tt, O, H[W], C, T),
    [tt, O, H, W, C, T]
  ), ft = JSON.stringify(J), K = Pm(c, J, U, Nt, Y), Jt = X.useRef(null), yt = Oe(ft, () => {
    var bt;
    const j = ft, ct = !J.occurred_from && ((bt = Jt.current) == null ? void 0 : bt.key) === j;
    return c("chart", { method: "POST", body: ct ? { ...J, occurred_from: Jt.current.from } : J }).then((nt) => (J.occurred_from || (Jt.current = { key: j, from: nt.occurred_from }), nt));
  }, Nt ? Y : void 0), ne = Oe("catalog", () => c("catalog", { method: "GET" })), tl = Oe(b ? "status" : null, () => c("status", { method: "GET" }), 6e4), ke = Oe(E && !T ? "streams" : null, () => c("streams", { method: "GET" }), 6e4), [el, Wl] = X.useState(!1), al = (j) => G0(j.received_at, oa(j) ? "events" : "access_logs", tl.data), ti = (j) => () => c("values", { method: "POST", body: { ...J, field: j } }).then((ct) => ct.values), _u = Oe(`${ft}|service`, ti("service")), xe = Oe(`${ft}|origin`, ti("origin")), ei = (j = {}) => {
    const ct = new URLSearchParams(k);
    for (const Xt of xu) ct.delete(Xt);
    const bt = j.kind ?? tt;
    let nt = j.draft ?? P;
    if (bt !== tt) {
      const Xt = new Set(m0(bt));
      nt = { ...nt, q: Fn(nt.q).filter((Ue) => !Ue.field || Xt.has(Ue.field)).map((Ue) => Ue.text).join(" ") };
    }
    bt !== p[0] && ct.set("kind", bt), (j.view ?? O) !== "important" && ct.set("view", j.view ?? O);
    const Ot = j.preset ?? (j.kind && j.kind !== tt ? 0 : W);
    return Ot && ct.set("p", String(Ot)), nt.q.trim() && ct.set("q", nt.q.trim()), nt.range !== Pn(T) && ct.set("range", nt.range), nt.range === "custom" && (nt.from && ct.set("from", nt.from), nt.to && ct.set("to", nt.to)), (j.columns || k.has("cols")) && ct.set("cols", (j.columns ?? F).join(",")), ct;
  }, ie = (j = {}) => {
    j.draft && Rt(j.draft), I(ei(j));
  }, ai = (j) => {
    try {
      localStorage.setItem(Oh, JSON.stringify(j));
    } catch {
    }
    ie({ draft: C, columns: j });
  }, ll = (j, ct) => {
    const bt = Fn(C.q).filter((nt) => nt.field !== j).map((nt) => nt.text);
    ie({ draft: { ...C, q: [...bt, `${j}:${Ws(ct)}`].join(" ") } });
  }, li = (j) => {
    Ct(null), j.actor_id ? ll("actor", j.actor_id) : j.target_type && j.target_id && ie({
      kind: "events",
      view: "all",
      preset: 0,
      draft: { q: `on:${j.target_type}:${Ws(j.target_id)}`, range: "all", from: "", to: "" }
    });
  }, ni = (j) => {
    const ct = P.q.trim();
    Rt({ ...P, q: `${ct ? `${ct} ` : ""}${j}:` }), requestAnimationFrame(() => {
      const bt = Q.current;
      bt && (bt.focus(), bt.setSelectionRange(bt.value.length, bt.value.length));
    });
  }, Au = P.q.trim() !== C.q.trim() || P.range !== C.range || P.from !== C.from || P.to !== C.to, Ca = !!(P.range === "custom" && P.from && P.to && P.to < P.from), Je = X.useRef(null), It = X.useRef(null), { hasMore: Re, loadMore: $t, more: Ye, pageCount: ii } = K;
  X.useEffect(() => {
    if (!Je.current || !Re || Ye.loading || Ye.error || ii >= Zs) return;
    const j = new IntersectionObserver(([ct]) => ct.isIntersecting && $t(), { root: It.current, rootMargin: "240px" });
    return j.observe(Je.current), () => j.disconnect();
  }, [Re, $t, Ye.loading, Ye.error, ii, K.rows.length]);
  const ui = async (j) => {
    gt(!1), G(0);
    try {
      const { rows: ct, more: bt } = await s0(c, J, G);
      bt && R(`Only the newest ${bu.toLocaleString()} rows were exported. Narrow the dates for the rest.`);
      const nt = (/* @__PURE__ */ new Date()).toISOString().slice(0, 16).replace(/[-:T]/g, ""), Ot = `activity-${T ? `${T.type}-${T.id}-` : ""}${tt}-${nt}`;
      j === "csv" ? $s(o0(tt, ct), `${Ot}.csv`, "text/csv;charset=utf-8") : $s(f0(ct), `${Ot}.jsonl`, "application/x-ndjson");
    } catch (ct) {
      R(`Export failed: ${ct.message}`);
    } finally {
      G(null);
    }
  }, fa = tt === "events" ? "events" : "requests", da = ((il = ne.data) == null ? void 0 : il.actor_types) ?? {}, Ge = ((ha = ne.data) == null ? void 0 : ha.entities) ?? {}, nl = (j) => {
    var ct, bt;
    if (j.field === "action") return ((bt = (ct = ne.data) == null ? void 0 : ct.actions[j.value]) == null ? void 0 : bt.title) ?? j.value;
    if (j.field === "actor_type") return da[j.value] ?? j.value;
    if (j.field === "on") {
      const [nt, ...Ot] = j.value.split(":");
      return `${Ge[nt] ?? fe(nt)} ${Ot.join(":")}`;
    }
    return j.value;
  }, ue = K.rows, zu = { service: _u.data ?? [], origin: xe.data ?? [] }, ci = 3 + ut.length;
  return T && !(T.type && T.id) ? /* @__PURE__ */ u.jsx("div", { className: zt("ahv ahv-log", w), children: /* @__PURE__ */ u.jsxs(Kl, { children: [
    "Nothing to show: no ",
    T.type || "record",
    " chosen."
  ] }) }) : /* @__PURE__ */ u.jsxs("div", { className: zt("ahv ahv-log", w), children: [
    /* @__PURE__ */ u.jsxs("header", { className: "ahv-head", children: [
      /* @__PURE__ */ u.jsxs("div", { children: [
        /* @__PURE__ */ u.jsxs("h2", { className: "ahv-title", children: [
          /* @__PURE__ */ u.jsx(jt, { name: "log", size: 18 }),
          T && o === "Activity Log" ? "Activity" : o
        ] }),
        /* @__PURE__ */ u.jsx("p", { className: "ahv-dim", children: h ?? (T ? `Everything about ${T.label}, and the API requests it made itself. Times are UTC.` : "Every action and API request, kept permanently and sealed. Times are UTC.") })
      ] }),
      /* @__PURE__ */ u.jsxs("div", { className: "ahv-actions", children: [
        !T && /* @__PURE__ */ u.jsx(
          V0,
          {
            request: c,
            current: tp(ei({ draft: C })),
            onOpen: (j) => {
              const ct = new URLSearchParams(k);
              for (const bt of xu) ct.delete(bt);
              new URLSearchParams(j).forEach((bt, nt) => xu.includes(nt) && ct.set(nt, bt)), I(ct);
            }
          }
        ),
        /* @__PURE__ */ u.jsx(Z0, { columns: hh[tt], shown: F, onChange: ai }),
        E && /* @__PURE__ */ u.jsxs(
          ur,
          {
            label: _ === null ? "Export" : `Exporting… ${_.toLocaleString()}`,
            icon: "download",
            open: et,
            setOpen: gt,
            disabled: _ !== null || !ue.length,
            children: [
              /* @__PURE__ */ u.jsx("button", { type: "button", role: "menuitem", onClick: () => ui("csv"), children: "CSV, for spreadsheets" }),
              /* @__PURE__ */ u.jsx("button", { type: "button", role: "menuitem", onClick: () => ui("jsonl"), children: "JSON Lines, for other tools" })
            ]
          }
        ),
        ((si = ke.data) == null ? void 0 : si.enabled) && /* @__PURE__ */ u.jsxs(
          "button",
          {
            type: "button",
            className: "ahv-button",
            "aria-expanded": el,
            onClick: () => Wl((j) => !j),
            title: "Send the log to your own systems as it is written",
            children: [
              /* @__PURE__ */ u.jsx(jt, { name: "send", size: 14 }),
              "Streams",
              ke.data.streams.some((j) => j.state === "failing") && /* @__PURE__ */ u.jsx("span", { className: "ahv-count ahv-count-bad", children: "!" })
            ]
          }
        ),
        /* @__PURE__ */ u.jsxs(
          "button",
          {
            type: "button",
            className: zt("ahv-button", Nt && "ahv-button-live"),
            "aria-pressed": Nt,
            title: "Check for new activity every few seconds",
            onClick: () => be((j) => !j),
            children: [
              /* @__PURE__ */ u.jsx(jt, { name: "live", size: 14, className: zt(Nt && "ahv-pulse") }),
              Nt ? "Live" : "Go live"
            ]
          }
        ),
        /* @__PURE__ */ u.jsxs(
          "button",
          {
            type: "button",
            className: "ahv-button",
            disabled: K.refreshing && !K.error,
            onClick: () => {
              K.refresh(), yt.refresh();
            },
            children: [
              /* @__PURE__ */ u.jsx(jt, { name: "refresh", size: 14, className: zt(K.refreshing && !Nt && "ahv-spin") }),
              "Refresh"
            ]
          }
        )
      ] })
    ] }),
    el && ((Pl = ke.data) == null ? void 0 : Pl.enabled) && /* @__PURE__ */ u.jsx($0, { request: c, kinds: p, list: ke.data, refresh: ke.refresh }),
    b && !T && /* @__PURE__ */ u.jsx(L0, { request: c, status: tl.data }),
    /* @__PURE__ */ u.jsxs("div", { className: "ahv-filters", children: [
      /* @__PURE__ */ u.jsxs("div", { className: "ahv-bar", children: [
        p.length > 1 && /* @__PURE__ */ u.jsx("div", { className: "ahv-segment", role: "group", "aria-label": "Records", children: p.map((j) => /* @__PURE__ */ u.jsx("button", { type: "button", "aria-pressed": tt === j, onClick: () => ie({ kind: j, draft: C }), children: j === "events" ? "Events" : "API requests" }, j)) }),
        tt === "events" && /* @__PURE__ */ u.jsx("div", { className: "ahv-segment", role: "group", "aria-label": "Show", children: dh.map((j) => /* @__PURE__ */ u.jsx(
          "button",
          {
            type: "button",
            title: j.hint,
            "aria-pressed": O === j.value,
            onClick: () => ie({ view: j.value, draft: C }),
            children: j.label
          },
          j.value
        )) }),
        H.length > 1 && /* @__PURE__ */ u.jsx("div", { className: "ahv-chips", role: "group", "aria-label": "Presets", children: H.map((j, ct) => /* @__PURE__ */ u.jsx(
          "button",
          {
            type: "button",
            className: "ahv-chip",
            "aria-pressed": W === ct,
            onClick: () => ie({ preset: ct, draft: C }),
            children: j.label
          },
          j.label
        )) })
      ] }),
      /* @__PURE__ */ u.jsxs("div", { className: "ahv-searchbar", children: [
        /* @__PURE__ */ u.jsx(
          Q0,
          {
            value: P.q,
            inputRef: Q,
            onChange: (j) => Rt({ ...P, q: j }),
            onSubmit: () => !Ca && ie({ draft: P }),
            suggestions: (j) => g0(j, tt, ne.data, zu),
            placeholder: tt === "events" ? "Search: words, or actor:… action:trade.* -result:success on:account:100234" : "Search: words, or actor:… method:POST status:4xx route:/trading/*"
          }
        ),
        /* @__PURE__ */ u.jsx(
          "select",
          {
            className: "ahv-input ahv-range",
            value: P.range,
            "aria-label": "When",
            onChange: (j) => Rt({ ...P, range: j.target.value }),
            children: tr.map((j) => /* @__PURE__ */ u.jsx("option", { value: j.value, children: j.label }, j.value))
          }
        ),
        P.range === "custom" && /* @__PURE__ */ u.jsxs("span", { className: "ahv-pair", children: [
          /* @__PURE__ */ u.jsx(
            "input",
            {
              type: "date",
              className: "ahv-input",
              value: P.from,
              "aria-label": "From (UTC)",
              "aria-invalid": Ca || void 0,
              onChange: (j) => Rt({ ...P, from: j.target.value })
            }
          ),
          /* @__PURE__ */ u.jsx(
            "input",
            {
              type: "date",
              className: "ahv-input",
              value: P.to,
              "aria-label": "To (UTC)",
              "aria-invalid": Ca || void 0,
              onChange: (j) => Rt({ ...P, to: j.target.value })
            }
          )
        ] }),
        /* @__PURE__ */ u.jsx("button", { type: "button", className: "ahv-button ahv-button-main", disabled: Ca, onClick: () => ie({ draft: P }), children: "Search" })
      ] }),
      Ca && /* @__PURE__ */ u.jsx("em", { className: "ahv-bad ahv-small", children: "The end date is before the start date" }),
      /* @__PURE__ */ u.jsxs("div", { className: "ahv-bar ahv-add", children: [
        /* @__PURE__ */ u.jsx("span", { className: "ahv-dim ahv-small", children: "Add" }),
        lr(tt).filter((j) => !(T && (j.field === "on" || tt === "requests" && j.field === "actor"))).slice(0, 8).map((j) => /* @__PURE__ */ u.jsx("button", { type: "button", className: "ahv-link-button", title: j.hint, onClick: () => ni(j.field), children: j.label }, j.field)),
        Au && /* @__PURE__ */ u.jsx("span", { className: "ahv-warn ahv-small ahv-push-right", children: "Not searched yet: press Enter or Search" })
      ] }),
      (Fn(C.q).length > 0 || C.range !== Pn(T)) && /* @__PURE__ */ u.jsxs("div", { className: "ahv-applied", children: [
        Fn(C.q).map((j) => /* @__PURE__ */ u.jsxs("span", { className: zt("ahv-pill", j.negated && "ahv-pill-not"), children: [
          /* @__PURE__ */ u.jsxs("span", { className: "ahv-dim", children: [
            j.negated ? "Not " : "",
            j.field ? `${p0(j.field)}:` : "Text:"
          ] }),
          " ",
          nl(j),
          /* @__PURE__ */ u.jsx("button", { type: "button", "aria-label": `Remove ${j.text}`, onClick: () => ie({ draft: { ...C, q: h0(C.q, j) } }), children: /* @__PURE__ */ u.jsx(jt, { name: "close", size: 12 }) })
        ] }, j.text)),
        C.range !== Pn(T) && /* @__PURE__ */ u.jsxs("span", { className: "ahv-pill", children: [
          /* @__PURE__ */ u.jsx("span", { className: "ahv-dim", children: "When:" }),
          " ",
          C.range === "custom" ? [C.from && $l(He(Js(C.from))), C.to && $l(He(Js(C.to)))].filter(Boolean).join(" – ") || "Any date" : (Il = tr.find((j) => j.value === C.range)) == null ? void 0 : Il.label,
          /* @__PURE__ */ u.jsx(
            "button",
            {
              type: "button",
              "aria-label": "Remove the time range",
              onClick: () => ie({ draft: { ...C, range: Pn(T), from: "", to: "" } }),
              children: /* @__PURE__ */ u.jsx(jt, { name: "close", size: 12 })
            }
          )
        ] }),
        /* @__PURE__ */ u.jsx("button", { type: "button", className: "ahv-link-button", onClick: () => ie({ preset: 0, draft: mh(new URLSearchParams(), T) }), children: "Clear all" })
      ] })
    ] }),
    yt.error && !yt.data ? null : /* @__PURE__ */ u.jsx(N0, { chart: yt.data, noun: fa, loading: yt.loading }),
    v && /* @__PURE__ */ u.jsx(Kl, { action: /* @__PURE__ */ u.jsx("button", { type: "button", className: "ahv-icon-button", "aria-label": "Dismiss", onClick: () => R(null), children: /* @__PURE__ */ u.jsx(jt, { name: "close", size: 14 }) }), children: v }),
    K.error && ue.length > 0 && /* @__PURE__ */ u.jsxs(Kl, { tone: "bad", action: /* @__PURE__ */ u.jsx("button", { type: "button", className: "ahv-button", onClick: K.refresh, children: "Retry" }), children: [
      "Couldn't load newer activity: ",
      K.error.message
    ] }),
    K.error && !ue.length ? /* @__PURE__ */ u.jsx(Kl, { tone: "bad", action: /* @__PURE__ */ u.jsx("button", { type: "button", className: "ahv-button", onClick: K.refresh, children: "Retry" }), children: K.error.message }) : K.loading ? /* @__PURE__ */ u.jsx(nr, {}) : ue.length ? /* @__PURE__ */ u.jsxs("div", { className: "ahv-table-wrap", ref: It, children: [
      /* @__PURE__ */ u.jsxs("table", { className: "ahv-table", children: [
        /* @__PURE__ */ u.jsx("thead", { children: /* @__PURE__ */ u.jsxs("tr", { children: [
          /* @__PURE__ */ u.jsx("th", { children: "When (UTC)" }),
          /* @__PURE__ */ u.jsx("th", { children: "Who" }),
          /* @__PURE__ */ u.jsx("th", { children: tt === "events" ? "What happened" : "Request" }),
          ut.map((j) => /* @__PURE__ */ u.jsx("th", { children: j.label }, j.key))
        ] }) }),
        /* @__PURE__ */ u.jsx("tbody", { children: ue.map((j, ct) => {
          var bt;
          return /* @__PURE__ */ u.jsxs(X.Fragment, { children: [
            j.occurred_at.slice(0, 10) !== ((bt = ue[ct - 1]) == null ? void 0 : bt.occurred_at.slice(0, 10)) && /* @__PURE__ */ u.jsx("tr", { className: "ahv-day", children: /* @__PURE__ */ u.jsx("td", { colSpan: ci, children: e0(j.occurred_at) }) }),
            /* @__PURE__ */ u.jsxs(
              "tr",
              {
                tabIndex: 0,
                className: zt("ahv-row", oa(j) && j.outcome !== "success" && "ahv-row-problem"),
                onClick: () => Ct(j),
                onKeyDown: (nt) => {
                  nt.target === nt.currentTarget && (nt.key === "Enter" || nt.key === " ") && (nt.preventDefault(), Ct(j));
                },
                children: [
                  /* @__PURE__ */ u.jsx("td", { children: /* @__PURE__ */ u.jsx(E0, { value: j.occurred_at, seal: al(j) }) }),
                  /* @__PURE__ */ u.jsx("td", { children: /* @__PURE__ */ u.jsx(
                    z0,
                    {
                      row: j,
                      actorTypes: da,
                      onFocus: T && tt === "requests" ? void 0 : () => li({ actor_id: j.actor_id })
                    }
                  ) }),
                  /* @__PURE__ */ u.jsx("td", { children: oa(j) ? /* @__PURE__ */ u.jsx(D0, { row: j }) : /* @__PURE__ */ u.jsx(Th, { row: j }) }),
                  ut.map((nt) => /* @__PURE__ */ u.jsx("td", { className: "ahv-cell", children: nt.key === "where" ? /* @__PURE__ */ u.jsx(M0, { row: j }) : nt.key === "service" ? /* @__PURE__ */ u.jsx("span", { className: "ahv-dim", children: fe(j.service) }) : nt.key === "ip" ? /* @__PURE__ */ u.jsx("span", { className: "ahv-mono ahv-dim", children: j.ip || "—" }) : oa(j) ? nt.key === "result" ? j.outcome === "success" ? /* @__PURE__ */ u.jsx("span", { className: "ahv-dim", children: "success" }) : /* @__PURE__ */ u.jsx(Eu, { outcome: j.outcome }) : j.target_type ? /* @__PURE__ */ u.jsxs("span", { children: [
                    Ge[j.target_type] ?? fe(j.target_type),
                    " ",
                    /* @__PURE__ */ u.jsx("span", { className: "ahv-mono", children: j.target_name || j.target_id })
                  ] }) : "—" : null }, nt.key))
                ]
              }
            )
          ] }, j.id);
        }) })
      ] }),
      /* @__PURE__ */ u.jsx("div", { ref: Je, "aria-hidden": "true" })
    ] }) : /* @__PURE__ */ u.jsxs("div", { className: "ahv-empty", children: [
      /* @__PURE__ */ u.jsx(jt, { name: "log", size: 28 }),
      /* @__PURE__ */ u.jsxs("strong", { children: [
        "No ",
        fa,
        " match"
      ] }),
      /* @__PURE__ */ u.jsx("span", { className: "ahv-dim", children: tt === "events" && O === "important" ? "Try All, or a wider time range." : "Try a wider time range or fewer filters." })
    ] }),
    ue.length > 0 && /* @__PURE__ */ u.jsxs("footer", { className: "ahv-foot", children: [
      /* @__PURE__ */ u.jsxs("span", { className: "ahv-dim ahv-num", children: [
        i0(ue.length, fa.slice(0, -1)),
        " shown",
        Nt ? " · Live keeps the newest page" : K.trimmed ? " · the newest were let go to keep the list light; Refresh brings them back" : K.hasMore ? "" : " · that is all of them"
      ] }),
      Ye.error && /* @__PURE__ */ u.jsxs("span", { className: "ahv-bad ahv-small", children: [
        "Couldn't load more: ",
        Ye.error.message
      ] }),
      K.hasMore && /* @__PURE__ */ u.jsx("button", { type: "button", className: "ahv-button", onClick: $t, disabled: Ye.loading, children: Ye.loading ? "Loading…" : "Load more" })
    ] }),
    /* @__PURE__ */ u.jsx(
      zh,
      {
        request: c,
        row: De,
        onClose: () => Ct(null),
        onFocus: T ? void 0 : li,
        actorTypes: da,
        entities: (ul = ne.data) == null ? void 0 : ul.entities,
        seal: De ? al(De) : null
      }
    )
  ] });
}
const ph = 500;
function lp({ request: c, entity: o, view: h = "all", action: f, newestFirst: p = !1, header: T, more: D, className: q }) {
  var I, tt, O, H;
  const E = o.type && o.id ? `${o.type}:${o.id}:${h}:${f ?? ""}` : null, b = Oe(E, () => c("search", {
    method: "POST",
    body: { kind: "events", filters: {}, related_type: o.type, related_id: o.id, view: h, action: f, limit: ph, details: !0 }
  })), U = Oe("catalog", () => c("catalog", { method: "GET" })), [Y, w] = X.useState(null), B = ((I = b.data) == null ? void 0 : I.items) ?? [], Z = p ? B : [...B].reverse(), k = !!((tt = b.data) != null && tt.next_cursor);
  return /* @__PURE__ */ u.jsxs("div", { className: zt("ahv ahv-timeline", q), children: [
    b.error ? /* @__PURE__ */ u.jsxs(Kl, { tone: "bad", action: /* @__PURE__ */ u.jsx("button", { type: "button", className: "ahv-button", onClick: b.refresh, children: "Retry" }), children: [
      "Couldn't load: ",
      b.error.message
    ] }) : b.loading && !b.data ? /* @__PURE__ */ u.jsx(nr, { rows: 4 }) : Z.length ? /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
      T == null ? void 0 : T(B.length ? [...B].reverse() : [], k),
      k && /* @__PURE__ */ u.jsxs("p", { className: "ahv-dim ahv-small", children: [
        "Showing the newest ",
        ph,
        " steps.",
        D && /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
          " ",
          D
        ] })
      ] }),
      /* @__PURE__ */ u.jsxs("h3", { className: "ahv-eyebrow", children: [
        Z.length,
        " step",
        Z.length === 1 ? "" : "s",
        ", ",
        p ? "newest" : "oldest",
        " first"
      ] }),
      /* @__PURE__ */ u.jsx("ol", { className: "ahv-steps", children: Z.map((W) => /* @__PURE__ */ u.jsx(ip, { event: W, onOpen: () => w(W) }, W.id)) })
    ] }) : /* @__PURE__ */ u.jsx("p", { className: "ahv-dim", children: "Nothing has been recorded about this yet." }),
    /* @__PURE__ */ u.jsx(
      zh,
      {
        request: c,
        row: Y,
        onClose: () => w(null),
        actorTypes: (O = U.data) == null ? void 0 : O.actor_types,
        entities: (H = U.data) == null ? void 0 : H.entities
      }
    )
  ] });
}
const np = (c) => c.outcome !== "success" ? { icon: "alert", tone: "rose" } : { icon: c.icon ?? (c.category === "data" ? "layers" : "log"), tone: c.tone ?? "neutral" };
function ip({ event: c, onOpen: o }) {
  var U, Y, w, B, Z;
  const [h, f] = X.useState(!1), { icon: p, tone: T } = np(c), D = c.children ?? [], q = c.children_count ?? D.length, E = c.category !== "data" && ((U = c.change_list) != null && U.length) ? c.change_list : null, b = !!((Y = c.details) != null && Y.length) || q > 0;
  return /* @__PURE__ */ u.jsxs("li", { className: `ahv-step ahv-tone-${T}`, children: [
    /* @__PURE__ */ u.jsx("span", { className: "ahv-step-icon", "aria-hidden": "true", children: /* @__PURE__ */ u.jsx(jt, { name: p, size: 14 }) }),
    /* @__PURE__ */ u.jsxs("div", { className: "ahv-step-main", children: [
      /* @__PURE__ */ u.jsxs("div", { className: "ahv-step-head", children: [
        /* @__PURE__ */ u.jsxs("div", { className: "ahv-stack", children: [
          /* @__PURE__ */ u.jsxs("button", { type: "button", className: "ahv-step-title", onClick: o, title: "Open the full detail", children: [
            c.title,
            /* @__PURE__ */ u.jsx(Eu, { outcome: c.outcome })
          ] }),
          /* @__PURE__ */ u.jsx(up, { event: c })
        ] }),
        /* @__PURE__ */ u.jsxs("span", { className: "ahv-step-when", title: `${c.occurred_at} UTC`, children: [
          /* @__PURE__ */ u.jsx("span", { className: "ahv-mono", children: Tu(c.occurred_at) }),
          /* @__PURE__ */ u.jsx("span", { className: "ahv-dim", children: ar(c.occurred_at) || $l(He(c.occurred_at)) })
        ] })
      ] }),
      c.outcome !== "success" ? /* @__PURE__ */ u.jsx("p", { className: "ahv-step-problem", children: c.summary }) : (w = c.facts) != null && w.length ? /* @__PURE__ */ u.jsx(Eh, { facts: c.facts }) : c.summary !== c.title ? /* @__PURE__ */ u.jsx("p", { className: "ahv-sentence", children: c.summary }) : null,
      E && /* @__PURE__ */ u.jsx(ir, { changes: E, valueLabel: "Set to" }),
      b && /* @__PURE__ */ u.jsxs("button", { type: "button", className: "ahv-disclose", "aria-expanded": h, onClick: () => f((k) => !k), children: [
        /* @__PURE__ */ u.jsx(jt, { name: "chevronDown", size: 13, className: zt(h && "ahv-turned") }),
        h ? "Hide" : [((B = c.details) == null ? void 0 : B.length) && "Details", q > 0 && `${q} record change${q === 1 ? "" : "s"}`].filter(Boolean).join(" and ")
      ] }),
      h && /* @__PURE__ */ u.jsxs("div", { className: "ahv-step-more", children: [
        (Z = c.details) != null && Z.length ? /* @__PURE__ */ u.jsx(_h, { items: c.details.map((k) => [k.label, k.value]), mono: !0 }) : null,
        q > 0 && /* @__PURE__ */ u.jsx(cp, { records: D, counted: q, onOpen: o })
      ] })
    ] })
  ] });
}
function up({ event: c }) {
  return /* @__PURE__ */ u.jsxs("span", { className: "ahv-byline", children: [
    /* @__PURE__ */ u.jsx("span", { className: zt("ahv-avatar ahv-avatar-small", c.actor_type === "system" && "ahv-avatar-system"), "aria-hidden": "true", children: bh(c.actor) }),
    [c.actor, c.actor_label, c.origin && fe(c.origin).toUpperCase(), c.device, c.country, c.ip].filter(Boolean).map((o, h) => /* @__PURE__ */ u.jsx("span", { className: zt(h === 0 ? "ahv-strong" : "ahv-sep"), children: o }, h))
  ] });
}
function cp({ records: c, counted: o, onOpen: h }) {
  const [f, p] = X.useState(null);
  return /* @__PURE__ */ u.jsxs("div", { className: "ahv-records", children: [
    /* @__PURE__ */ u.jsxs("table", { className: "ahv-changes ahv-records-table", children: [
      /* @__PURE__ */ u.jsx("thead", { children: /* @__PURE__ */ u.jsxs("tr", { children: [
        /* @__PURE__ */ u.jsx("th", { children: "Record" }),
        /* @__PURE__ */ u.jsx("th", { children: "Change" }),
        /* @__PURE__ */ u.jsx("th", { children: "Fields" })
      ] }) }),
      /* @__PURE__ */ u.jsx("tbody", { children: c.map((T) => {
        const D = T.change_list ?? [], q = f === T.id;
        return /* @__PURE__ */ u.jsx(
          sp,
          {
            record: T,
            fields: D.length,
            open: q,
            onToggle: () => p(q ? null : T.id),
            children: q && /* @__PURE__ */ u.jsx("tr", { className: "ahv-records-fields", children: /* @__PURE__ */ u.jsx("td", { colSpan: 3, children: /* @__PURE__ */ u.jsx(ir, { changes: D }) }) })
          },
          T.id
        );
      }) })
    ] }),
    o > c.length && /* @__PURE__ */ u.jsxs("button", { type: "button", className: "ahv-link-button", onClick: h, children: [
      o - c.length,
      " more in the full detail"
    ] })
  ] });
}
function sp({ record: c, fields: o, open: h, onToggle: f, children: p }) {
  const T = c.action === "data.created" ? "Created" : c.action === "data.deleted" ? "Deleted" : "Updated";
  return /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
    /* @__PURE__ */ u.jsxs("tr", { children: [
      /* @__PURE__ */ u.jsx("td", { children: /* @__PURE__ */ u.jsxs("button", { type: "button", className: "ahv-disclose", "aria-expanded": h, disabled: !o, onClick: f, children: [
        /* @__PURE__ */ u.jsx(jt, { name: "chevronRight", size: 12, className: zt(h && "ahv-turned-right") }),
        c.summary.replace(/^(Created|Updated|Deleted) /, "").split(":")[0]
      ] }) }),
      /* @__PURE__ */ u.jsx("td", { children: T }),
      /* @__PURE__ */ u.jsx("td", { className: "ahv-dim", children: c.action === "data.updated" ? (c.change_list ?? []).slice(0, 3).map((D) => D.label).join(", ") + (o > 3 ? ` and ${o - 3} more` : "") : `${o} value${o === 1 ? "" : "s"}` })
    ] }),
    p
  ] });
}
const cr = class cr extends HTMLElement {
  get request() {
    return this.requester;
  }
  set request(o) {
    this.requester = o, this.render();
  }
  connectedCallback() {
    if (!this.root) {
      const o = this.shadowRoot ?? this.attachShadow({ mode: "open" }), h = document.createElement("style");
      h.textContent = Wm;
      const f = document.createElement("div");
      this.panel = document.createElement("div"), o.replaceChildren(h, f, this.panel), this.root = $m.createRoot(f);
      const p = document.documentElement, T = () => {
        var q;
        const D = p.classList.contains("dark") || p.dataset.theme === "dark";
        f.classList.toggle("ahv-dark-host", D), (q = this.panel) == null || q.classList.toggle("ahv-dark-host", D);
      };
      T(), this.theme = new MutationObserver(T), this.theme.observe(p, { attributes: !0, attributeFilter: ["class", "data-theme"] });
    }
    this.render();
  }
  disconnectedCallback() {
    var o, h, f;
    (o = this.theme) == null || o.disconnect(), (h = this.root) == null || h.unmount(), this.root = void 0, (f = this.shadowRoot) == null || f.replaceChildren();
  }
  attributeChangedCallback() {
    this.render();
  }
  render() {
    !this.root || !this.requester || this.root.render(/* @__PURE__ */ u.jsx(Ah.Provider, { value: this.panel ?? null, children: this.view(this.requester) }));
  }
};
cr.observedAttributes = [
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
let ju = cr;
class rp extends ju {
  view(o) {
    const h = this.getAttribute("entity-type"), f = this.getAttribute("entity-id"), p = (this.getAttribute("kinds") || "events,requests").split(",").map((T) => T.trim());
    return /* @__PURE__ */ u.jsx(
      ap,
      {
        request: o,
        title: this.getAttribute("title") || void 0,
        kinds: p,
        canExport: this.hasAttribute("can-export"),
        showStatus: !this.hasAttribute("no-status"),
        entity: h && f ? { type: h, id: f, label: this.getAttribute("entity-label") || `${h} ${f}` } : void 0
      }
    );
  }
}
class op extends ju {
  view(o) {
    return /* @__PURE__ */ u.jsx(
      lp,
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
customElements.get("activity-log") || customElements.define("activity-log", rp);
customElements.get("activity-timeline") || customElements.define("activity-timeline", op);
