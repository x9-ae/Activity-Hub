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
var $d;
function Gm() {
  if ($d) return $n;
  $d = 1;
  var c = Symbol.for("react.transitional.element"), o = Symbol.for("react.fragment");
  function h(f, p, T) {
    var A = null;
    if (T !== void 0 && (A = "" + T), p.key !== void 0 && (A = "" + p.key), "key" in p) {
      T = {};
      for (var w in p)
        w !== "key" && (T[w] = p[w]);
    } else T = p;
    return p = T.ref, {
      $$typeof: c,
      type: f,
      key: A,
      ref: p !== void 0 ? p : null,
      props: T
    };
  }
  return $n.Fragment = o, $n.jsx = h, $n.jsxs = h, $n;
}
var Wd;
function Lm() {
  return Wd || (Wd = 1, Hs.exports = Gm()), Hs.exports;
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
var Fd;
function Xm() {
  return Fd || (Fd = 1, (function(c) {
    function o(_, G) {
      var te = _.length;
      _.push(G);
      e: for (; 0 < te; ) {
        var ge = te - 1 >>> 1, v = _[ge];
        if (0 < p(v, G))
          _[ge] = G, _[te] = v, te = ge;
        else break e;
      }
    }
    function h(_) {
      return _.length === 0 ? null : _[0];
    }
    function f(_) {
      if (_.length === 0) return null;
      var G = _[0], te = _.pop();
      if (te !== G) {
        _[0] = te;
        e: for (var ge = 0, v = _.length, R = v >>> 1; ge < R; ) {
          var Q = 2 * (ge + 1) - 1, L = _[Q], J = Q + 1, fe = _[J];
          if (0 > p(L, te))
            J < v && 0 > p(fe, L) ? (_[ge] = fe, _[J] = te, ge = J) : (_[ge] = L, _[Q] = te, ge = Q);
          else if (J < v && 0 > p(fe, te))
            _[ge] = fe, _[J] = te, ge = J;
          else break e;
        }
      }
      return G;
    }
    function p(_, G) {
      var te = _.sortIndex - G.sortIndex;
      return te !== 0 ? te : _.id - G.id;
    }
    if (c.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var T = performance;
      c.unstable_now = function() {
        return T.now();
      };
    } else {
      var A = Date, w = A.now();
      c.unstable_now = function() {
        return A.now() - w;
      };
    }
    var E = [], b = [], U = 1, Y = null, q = 3, B = !1, Z = !1, k = !1, I = !1, ee = typeof setTimeout == "function" ? setTimeout : null, D = typeof clearTimeout == "function" ? clearTimeout : null, H = typeof setImmediate < "u" ? setImmediate : null;
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
          Z = !0, ue || (ue = !0, Ne());
        else {
          var G = h(b);
          G !== null && Ce(F, G.startTime - _);
        }
    }
    var ue = !1, C = -1, P = 5, Re = -1;
    function Bt() {
      return I ? !0 : !(c.unstable_now() - Re < P);
    }
    function at() {
      if (I = !1, ue) {
        var _ = c.unstable_now();
        Re = _;
        var G = !0;
        try {
          e: {
            Z = !1, k && (k = !1, D(C), C = -1), B = !0;
            var te = q;
            try {
              t: {
                for (W(_), Y = h(E); Y !== null && !(Y.expirationTime > _ && Bt()); ) {
                  var ge = Y.callback;
                  if (typeof ge == "function") {
                    Y.callback = null, q = Y.priorityLevel;
                    var v = ge(
                      Y.expirationTime <= _
                    );
                    if (_ = c.unstable_now(), typeof v == "function") {
                      Y.callback = v, W(_), G = !0;
                      break t;
                    }
                    Y === h(E) && f(E), W(_);
                  } else f(E);
                  Y = h(E);
                }
                if (Y !== null) G = !0;
                else {
                  var R = h(b);
                  R !== null && Ce(
                    F,
                    R.startTime - _
                  ), G = !1;
                }
              }
              break e;
            } finally {
              Y = null, q = te, B = !1;
            }
            G = void 0;
          }
        } finally {
          G ? Ne() : ue = !1;
        }
      }
    }
    var Ne;
    if (typeof H == "function")
      Ne = function() {
        H(at);
      };
    else if (typeof MessageChannel < "u") {
      var bt = new MessageChannel(), Dt = bt.port2;
      bt.port1.onmessage = at, Ne = function() {
        Dt.postMessage(null);
      };
    } else
      Ne = function() {
        ee(at, 0);
      };
    function Ce(_, G) {
      C = ee(function() {
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
      return q;
    }, c.unstable_next = function(_) {
      switch (q) {
        case 1:
        case 2:
        case 3:
          var G = 3;
          break;
        default:
          G = q;
      }
      var te = q;
      q = G;
      try {
        return _();
      } finally {
        q = te;
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
      var te = q;
      q = _;
      try {
        return G();
      } finally {
        q = te;
      }
    }, c.unstable_scheduleCallback = function(_, G, te) {
      var ge = c.unstable_now();
      switch (typeof te == "object" && te !== null ? (te = te.delay, te = typeof te == "number" && 0 < te ? ge + te : ge) : te = ge, _) {
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
      return v = te + v, _ = {
        id: U++,
        callback: G,
        priorityLevel: _,
        startTime: te,
        expirationTime: v,
        sortIndex: -1
      }, te > ge ? (_.sortIndex = te, o(b, _), h(E) === null && _ === h(b) && (k ? (D(C), C = -1) : k = !0, Ce(F, te - ge))) : (_.sortIndex = v, o(E, _), Z || B || (Z = !0, ue || (ue = !0, Ne()))), _;
    }, c.unstable_shouldYield = Bt, c.unstable_wrapCallback = function(_) {
      var G = q;
      return function() {
        var te = q;
        q = G;
        try {
          return _.apply(this, arguments);
        } finally {
          q = te;
        }
      };
    };
  })(Ys)), Ys;
}
var Pd;
function Qm() {
  return Pd || (Pd = 1, ks.exports = Xm()), ks.exports;
}
var Gs = { exports: {} }, se = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Id;
function Zm() {
  if (Id) return se;
  Id = 1;
  var c = Symbol.for("react.transitional.element"), o = Symbol.for("react.portal"), h = Symbol.for("react.fragment"), f = Symbol.for("react.strict_mode"), p = Symbol.for("react.profiler"), T = Symbol.for("react.consumer"), A = Symbol.for("react.context"), w = Symbol.for("react.forward_ref"), E = Symbol.for("react.suspense"), b = Symbol.for("react.memo"), U = Symbol.for("react.lazy"), Y = Symbol.iterator;
  function q(v) {
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
  function ee() {
  }
  ee.prototype = I.prototype;
  function D(v, R, Q) {
    this.props = v, this.context = R, this.refs = k, this.updater = Q || B;
  }
  var H = D.prototype = new ee();
  H.constructor = D, Z(H, I.prototype), H.isPureReactComponent = !0;
  var W = Array.isArray, F = { H: null, A: null, T: null, S: null, V: null }, ue = Object.prototype.hasOwnProperty;
  function C(v, R, Q, L, J, fe) {
    return Q = fe.ref, {
      $$typeof: c,
      type: v,
      key: R,
      ref: Q !== void 0 ? Q : null,
      props: fe
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
  function Re(v) {
    return typeof v == "object" && v !== null && v.$$typeof === c;
  }
  function Bt(v) {
    var R = { "=": "=0", ":": "=2" };
    return "$" + v.replace(/[=:]/g, function(Q) {
      return R[Q];
    });
  }
  var at = /\/+/g;
  function Ne(v, R) {
    return typeof v == "object" && v !== null && v.key != null ? Bt("" + v.key) : R.toString(36);
  }
  function bt() {
  }
  function Dt(v) {
    switch (v.status) {
      case "fulfilled":
        return v.value;
      case "rejected":
        throw v.reason;
      default:
        switch (typeof v.status == "string" ? v.then(bt, bt) : (v.status = "pending", v.then(
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
  function Ce(v, R, Q, L, J) {
    var fe = typeof v;
    (fe === "undefined" || fe === "boolean") && (v = null);
    var K = !1;
    if (v === null) K = !0;
    else
      switch (fe) {
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
              return K = v._init, Ce(
                K(v._payload),
                R,
                Q,
                L,
                J
              );
          }
      }
    if (K)
      return J = J(v), K = L === "" ? "." + Ne(v, 0) : L, W(J) ? (Q = "", K != null && (Q = K.replace(at, "$&/") + "/"), Ce(J, R, Q, "", function(nt) {
        return nt;
      })) : J != null && (Re(J) && (J = P(
        J,
        Q + (J.key == null || v && v.key === J.key ? "" : ("" + J.key).replace(
          at,
          "$&/"
        ) + "/") + K
      )), R.push(J)), 1;
    K = 0;
    var Je = L === "" ? "." : L + ":";
    if (W(v))
      for (var ye = 0; ye < v.length; ye++)
        L = v[ye], fe = Je + Ne(L, ye), K += Ce(
          L,
          R,
          Q,
          fe,
          J
        );
    else if (ye = q(v), typeof ye == "function")
      for (v = ye.call(v), ye = 0; !(L = v.next()).done; )
        L = L.value, fe = Je + Ne(L, ye++), K += Ce(
          L,
          R,
          Q,
          fe,
          J
        );
    else if (fe === "object") {
      if (typeof v.then == "function")
        return Ce(
          Dt(v),
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
    return Ce(v, L, "", "", function(fe) {
      return R.call(Q, fe, J++);
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
  var te = typeof reportError == "function" ? reportError : function(v) {
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
  function ge() {
  }
  return se.Children = {
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
      if (!Re(v))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return v;
    }
  }, se.Component = I, se.Fragment = h, se.Profiler = p, se.PureComponent = D, se.StrictMode = f, se.Suspense = E, se.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = F, se.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(v) {
      return F.H.useMemoCache(v);
    }
  }, se.cache = function(v) {
    return function() {
      return v.apply(null, arguments);
    };
  }, se.cloneElement = function(v, R, Q) {
    if (v == null)
      throw Error(
        "The argument must be a React element, but you passed " + v + "."
      );
    var L = Z({}, v.props), J = v.key, fe = void 0;
    if (R != null)
      for (K in R.ref !== void 0 && (fe = void 0), R.key !== void 0 && (J = "" + R.key), R)
        !ue.call(R, K) || K === "key" || K === "__self" || K === "__source" || K === "ref" && R.ref === void 0 || (L[K] = R[K]);
    var K = arguments.length - 2;
    if (K === 1) L.children = Q;
    else if (1 < K) {
      for (var Je = Array(K), ye = 0; ye < K; ye++)
        Je[ye] = arguments[ye + 2];
      L.children = Je;
    }
    return C(v.type, J, void 0, void 0, fe, L);
  }, se.createContext = function(v) {
    return v = {
      $$typeof: A,
      _currentValue: v,
      _currentValue2: v,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, v.Provider = v, v.Consumer = {
      $$typeof: T,
      _context: v
    }, v;
  }, se.createElement = function(v, R, Q) {
    var L, J = {}, fe = null;
    if (R != null)
      for (L in R.key !== void 0 && (fe = "" + R.key), R)
        ue.call(R, L) && L !== "key" && L !== "__self" && L !== "__source" && (J[L] = R[L]);
    var K = arguments.length - 2;
    if (K === 1) J.children = Q;
    else if (1 < K) {
      for (var Je = Array(K), ye = 0; ye < K; ye++)
        Je[ye] = arguments[ye + 2];
      J.children = Je;
    }
    if (v && v.defaultProps)
      for (L in K = v.defaultProps, K)
        J[L] === void 0 && (J[L] = K[L]);
    return C(v, fe, void 0, void 0, null, J);
  }, se.createRef = function() {
    return { current: null };
  }, se.forwardRef = function(v) {
    return { $$typeof: w, render: v };
  }, se.isValidElement = Re, se.lazy = function(v) {
    return {
      $$typeof: U,
      _payload: { _status: -1, _result: v },
      _init: G
    };
  }, se.memo = function(v, R) {
    return {
      $$typeof: b,
      type: v,
      compare: R === void 0 ? null : R
    };
  }, se.startTransition = function(v) {
    var R = F.T, Q = {};
    F.T = Q;
    try {
      var L = v(), J = F.S;
      J !== null && J(Q, L), typeof L == "object" && L !== null && typeof L.then == "function" && L.then(ge, te);
    } catch (fe) {
      te(fe);
    } finally {
      F.T = R;
    }
  }, se.unstable_useCacheRefresh = function() {
    return F.H.useCacheRefresh();
  }, se.use = function(v) {
    return F.H.use(v);
  }, se.useActionState = function(v, R, Q) {
    return F.H.useActionState(v, R, Q);
  }, se.useCallback = function(v, R) {
    return F.H.useCallback(v, R);
  }, se.useContext = function(v) {
    return F.H.useContext(v);
  }, se.useDebugValue = function() {
  }, se.useDeferredValue = function(v, R) {
    return F.H.useDeferredValue(v, R);
  }, se.useEffect = function(v, R, Q) {
    var L = F.H;
    if (typeof Q == "function")
      throw Error(
        "useEffect CRUD overload is not enabled in this build of React."
      );
    return L.useEffect(v, R);
  }, se.useId = function() {
    return F.H.useId();
  }, se.useImperativeHandle = function(v, R, Q) {
    return F.H.useImperativeHandle(v, R, Q);
  }, se.useInsertionEffect = function(v, R) {
    return F.H.useInsertionEffect(v, R);
  }, se.useLayoutEffect = function(v, R) {
    return F.H.useLayoutEffect(v, R);
  }, se.useMemo = function(v, R) {
    return F.H.useMemo(v, R);
  }, se.useOptimistic = function(v, R) {
    return F.H.useOptimistic(v, R);
  }, se.useReducer = function(v, R, Q) {
    return F.H.useReducer(v, R, Q);
  }, se.useRef = function(v) {
    return F.H.useRef(v);
  }, se.useState = function(v) {
    return F.H.useState(v);
  }, se.useSyncExternalStore = function(v, R, Q) {
    return F.H.useSyncExternalStore(
      v,
      R,
      Q
    );
  }, se.useTransition = function() {
    return F.H.useTransition();
  }, se.version = "19.1.0", se;
}
var eh;
function tr() {
  return eh || (eh = 1, Gs.exports = Zm()), Gs.exports;
}
var Ls = { exports: {} }, tt = {};
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
  if (th) return tt;
  th = 1;
  var c = tr();
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
  var A = c.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function w(E, b) {
    if (E === "font") return "";
    if (typeof b == "string")
      return b === "use-credentials" ? b : "";
  }
  return tt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = f, tt.createPortal = function(E, b) {
    var U = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!b || b.nodeType !== 1 && b.nodeType !== 9 && b.nodeType !== 11)
      throw Error(o(299));
    return T(E, b, null, U);
  }, tt.flushSync = function(E) {
    var b = A.T, U = f.p;
    try {
      if (A.T = null, f.p = 2, E) return E();
    } finally {
      A.T = b, f.p = U, f.d.f();
    }
  }, tt.preconnect = function(E, b) {
    typeof E == "string" && (b ? (b = b.crossOrigin, b = typeof b == "string" ? b === "use-credentials" ? b : "" : void 0) : b = null, f.d.C(E, b));
  }, tt.prefetchDNS = function(E) {
    typeof E == "string" && f.d.D(E);
  }, tt.preinit = function(E, b) {
    if (typeof E == "string" && b && typeof b.as == "string") {
      var U = b.as, Y = w(U, b.crossOrigin), q = typeof b.integrity == "string" ? b.integrity : void 0, B = typeof b.fetchPriority == "string" ? b.fetchPriority : void 0;
      U === "style" ? f.d.S(
        E,
        typeof b.precedence == "string" ? b.precedence : void 0,
        {
          crossOrigin: Y,
          integrity: q,
          fetchPriority: B
        }
      ) : U === "script" && f.d.X(E, {
        crossOrigin: Y,
        integrity: q,
        fetchPriority: B,
        nonce: typeof b.nonce == "string" ? b.nonce : void 0
      });
    }
  }, tt.preinitModule = function(E, b) {
    if (typeof E == "string")
      if (typeof b == "object" && b !== null) {
        if (b.as == null || b.as === "script") {
          var U = w(
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
  }, tt.preload = function(E, b) {
    if (typeof E == "string" && typeof b == "object" && b !== null && typeof b.as == "string") {
      var U = b.as, Y = w(U, b.crossOrigin);
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
  }, tt.preloadModule = function(E, b) {
    if (typeof E == "string")
      if (b) {
        var U = w(b.as, b.crossOrigin);
        f.d.m(E, {
          as: typeof b.as == "string" && b.as !== "script" ? b.as : void 0,
          crossOrigin: U,
          integrity: typeof b.integrity == "string" ? b.integrity : void 0
        });
      } else f.d.m(E);
  }, tt.requestFormReset = function(E) {
    f.d.r(E);
  }, tt.unstable_batchedUpdates = function(E, b) {
    return E(b);
  }, tt.useFormState = function(E, b, U) {
    return A.H.useFormState(E, b, U);
  }, tt.useFormStatus = function() {
    return A.H.useHostTransitionStatus();
  }, tt.version = "19.1.0", tt;
}
var ah;
function yh() {
  if (ah) return Ls.exports;
  ah = 1;
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
var lh;
function Km() {
  if (lh) return Wn;
  lh = 1;
  var c = Qm(), o = tr(), h = yh();
  function f(e) {
    var t = "https://react.dev/errors/" + e;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var a = 2; a < arguments.length; a++)
        t += "&args[]=" + encodeURIComponent(arguments[a]);
    }
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function p(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
  }
  function T(e) {
    var t = e, a = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
      e = t;
      do
        t = e, (t.flags & 4098) !== 0 && (a = t.return), e = t.return;
      while (e);
    }
    return t.tag === 3 ? a : null;
  }
  function A(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function w(e) {
    if (T(e) !== e)
      throw Error(f(188));
  }
  function E(e) {
    var t = e.alternate;
    if (!t) {
      if (t = T(e), t === null) throw Error(f(188));
      return t !== e ? null : e;
    }
    for (var a = e, l = t; ; ) {
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
          if (i === a) return w(n), e;
          if (i === l) return w(n), t;
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
    return a.stateNode.current === a ? e : t;
  }
  function b(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e;
    for (e = e.child; e !== null; ) {
      if (t = b(e), t !== null) return t;
      e = e.sibling;
    }
    return null;
  }
  var U = Object.assign, Y = Symbol.for("react.element"), q = Symbol.for("react.transitional.element"), B = Symbol.for("react.portal"), Z = Symbol.for("react.fragment"), k = Symbol.for("react.strict_mode"), I = Symbol.for("react.profiler"), ee = Symbol.for("react.provider"), D = Symbol.for("react.consumer"), H = Symbol.for("react.context"), W = Symbol.for("react.forward_ref"), F = Symbol.for("react.suspense"), ue = Symbol.for("react.suspense_list"), C = Symbol.for("react.memo"), P = Symbol.for("react.lazy"), Re = Symbol.for("react.activity"), Bt = Symbol.for("react.memo_cache_sentinel"), at = Symbol.iterator;
  function Ne(e) {
    return e === null || typeof e != "object" ? null : (e = at && e[at] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var bt = Symbol.for("react.client.reference");
  function Dt(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === bt ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case Z:
        return "Fragment";
      case I:
        return "Profiler";
      case k:
        return "StrictMode";
      case F:
        return "Suspense";
      case ue:
        return "SuspenseList";
      case Re:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case B:
          return "Portal";
        case H:
          return (e.displayName || "Context") + ".Provider";
        case D:
          return (e._context.displayName || "Context") + ".Consumer";
        case W:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case C:
          return t = e.displayName || null, t !== null ? t : Dt(e.type) || "Memo";
        case P:
          t = e._payload, e = e._init;
          try {
            return Dt(e(t));
          } catch {
          }
      }
    return null;
  }
  var Ce = Array.isArray, _ = o.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, G = h.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, te = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, ge = [], v = -1;
  function R(e) {
    return { current: e };
  }
  function Q(e) {
    0 > v || (e.current = ge[v], ge[v] = null, v--);
  }
  function L(e, t) {
    v++, ge[v] = e.current, e.current = t;
  }
  var J = R(null), fe = R(null), K = R(null), Je = R(null);
  function ye(e, t) {
    switch (L(K, t), L(fe, e), L(J, null), t.nodeType) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? Nd(e) : 0;
        break;
      default:
        if (e = t.tagName, t = t.namespaceURI)
          t = Nd(t), e = Td(t, e);
        else
          switch (e) {
            case "svg":
              e = 1;
              break;
            case "math":
              e = 2;
              break;
            default:
              e = 0;
          }
    }
    Q(J), L(J, e);
  }
  function nt() {
    Q(J), Q(fe), Q(K);
  }
  function el(e) {
    e.memoizedState !== null && L(Je, e);
    var t = J.current, a = Td(t, e.type);
    t !== a && (L(fe, e), L(J, a));
  }
  function kt(e) {
    fe.current === e && (Q(J), Q(fe)), Je.current === e && (Q(Je), Qn._currentValue = te);
  }
  var tl = Object.prototype.hasOwnProperty, Wl = c.unstable_scheduleCallback, al = c.unstable_cancelCallback, ei = c.unstable_shouldYield, _u = c.unstable_requestPaint, xt = c.unstable_now, ti = c.unstable_getCurrentPriorityLevel, it = c.unstable_ImmediatePriority, ai = c.unstable_UserBlockingPriority, ll = c.unstable_NormalPriority, li = c.unstable_LowPriority, ni = c.unstable_IdlePriority, Au = c.log, Ca = c.unstable_setDisableYieldValue, Jt = null, Ie = null;
  function Rt(e) {
    if (typeof Au == "function" && Ca(e), Ie && typeof Ie.setStrictMode == "function")
      try {
        Ie.setStrictMode(Jt, e);
      } catch {
      }
  }
  var $e = Math.clz32 ? Math.clz32 : ui, Yt = Math.log, ii = Math.LN2;
  function ui(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (Yt(e) / ii | 0) | 0;
  }
  var fa = 256, da = 4194304;
  function Gt(e) {
    var t = e & 42;
    if (t !== 0) return t;
    switch (e & -e) {
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
        return e & 4194048;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return e & 62914560;
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
        return e;
    }
  }
  function nl(e, t, a) {
    var l = e.pendingLanes;
    if (l === 0) return 0;
    var n = 0, i = e.suspendedLanes, s = e.pingedLanes;
    e = e.warmLanes;
    var r = l & 134217727;
    return r !== 0 ? (l = r & ~i, l !== 0 ? n = Gt(l) : (s &= r, s !== 0 ? n = Gt(s) : a || (a = r & ~e, a !== 0 && (n = Gt(a))))) : (r = l & ~i, r !== 0 ? n = Gt(r) : s !== 0 ? n = Gt(s) : a || (a = l & ~e, a !== 0 && (n = Gt(a)))), n === 0 ? 0 : t !== 0 && t !== n && (t & i) === 0 && (i = n & -n, a = t & -t, i >= a || i === 32 && (a & 4194048) !== 0) ? t : n;
  }
  function ut(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function zu(e, t) {
    switch (e) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return t + 250;
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
        return t + 5e3;
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
    var e = fa;
    return fa <<= 1, (fa & 4194048) === 0 && (fa = 256), e;
  }
  function Fl() {
    var e = da;
    return da <<= 1, (da & 62914560) === 0 && (da = 4194304), e;
  }
  function il(e) {
    for (var t = [], a = 0; 31 > a; a++) t.push(e);
    return t;
  }
  function ha(e, t) {
    e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function si(e, t, a, l, n, i) {
    var s = e.pendingLanes;
    e.pendingLanes = a, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= a, e.entangledLanes &= a, e.errorRecoveryDisabledLanes &= a, e.shellSuspendCounter = 0;
    var r = e.entanglements, d = e.expirationTimes, x = e.hiddenUpdates;
    for (a = s & ~a; 0 < a; ) {
      var z = 31 - $e(a), O = 1 << z;
      r[z] = 0, d[z] = -1;
      var S = x[z];
      if (S !== null)
        for (x[z] = null, z = 0; z < S.length; z++) {
          var N = S[z];
          N !== null && (N.lane &= -536870913);
        }
      a &= ~O;
    }
    l !== 0 && Pl(e, l, 0), i !== 0 && n === 0 && e.tag !== 0 && (e.suspendedLanes |= i & ~(s & ~t));
  }
  function Pl(e, t, a) {
    e.pendingLanes |= t, e.suspendedLanes &= ~t;
    var l = 31 - $e(t);
    e.entangledLanes |= t, e.entanglements[l] = e.entanglements[l] | 1073741824 | a & 4194090;
  }
  function Il(e, t) {
    var a = e.entangledLanes |= t;
    for (e = e.entanglements; a; ) {
      var l = 31 - $e(a), n = 1 << l;
      n & t | e[l] & t && (e[l] |= t), a &= ~n;
    }
  }
  function ul(e) {
    switch (e) {
      case 2:
        e = 1;
        break;
      case 8:
        e = 4;
        break;
      case 32:
        e = 16;
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
        e = 128;
        break;
      case 268435456:
        e = 134217728;
        break;
      default:
        e = 0;
    }
    return e;
  }
  function j(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function ce() {
    var e = G.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : Xd(e.type));
  }
  function xe(e, t) {
    var a = G.p;
    try {
      return G.p = e, t();
    } finally {
      G.p = a;
    }
  }
  var ne = Math.random().toString(36).slice(2), Oe = "__reactFiber$" + ne, Xe = "__reactProps$" + ne, Ut = "__reactContainer$" + ne, Mu = "__reactEvents$" + ne, Dh = "__reactListeners$" + ne, Rh = "__reactHandles$" + ne, rr = "__reactResources$" + ne, en = "__reactMarker$" + ne;
  function Ou(e) {
    delete e[Oe], delete e[Xe], delete e[Mu], delete e[Dh], delete e[Rh];
  }
  function cl(e) {
    var t = e[Oe];
    if (t) return t;
    for (var a = e.parentNode; a; ) {
      if (t = a[Ut] || a[Oe]) {
        if (a = t.alternate, t.child !== null || a !== null && a.child !== null)
          for (e = zd(e); e !== null; ) {
            if (a = e[Oe]) return a;
            e = zd(e);
          }
        return t;
      }
      e = a, a = e.parentNode;
    }
    return null;
  }
  function sl(e) {
    if (e = e[Oe] || e[Ut]) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 26 || t === 27 || t === 3)
        return e;
    }
    return null;
  }
  function tn(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(f(33));
  }
  function rl(e) {
    var t = e[rr];
    return t || (t = e[rr] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function Qe(e) {
    e[en] = !0;
  }
  var or = /* @__PURE__ */ new Set(), fr = {};
  function Ha(e, t) {
    ol(e, t), ol(e + "Capture", t);
  }
  function ol(e, t) {
    for (fr[e] = t, e = 0; e < t.length; e++)
      or.add(t[e]);
  }
  var Uh = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), dr = {}, hr = {};
  function wh(e) {
    return tl.call(hr, e) ? !0 : tl.call(dr, e) ? !1 : Uh.test(e) ? hr[e] = !0 : (dr[e] = !0, !1);
  }
  function ri(e, t, a) {
    if (wh(t))
      if (a === null) e.removeAttribute(t);
      else {
        switch (typeof a) {
          case "undefined":
          case "function":
          case "symbol":
            e.removeAttribute(t);
            return;
          case "boolean":
            var l = t.toLowerCase().slice(0, 5);
            if (l !== "data-" && l !== "aria-") {
              e.removeAttribute(t);
              return;
            }
        }
        e.setAttribute(t, "" + a);
      }
  }
  function oi(e, t, a) {
    if (a === null) e.removeAttribute(t);
    else {
      switch (typeof a) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(t);
          return;
      }
      e.setAttribute(t, "" + a);
    }
  }
  function $t(e, t, a, l) {
    if (l === null) e.removeAttribute(a);
    else {
      switch (typeof l) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(a);
          return;
      }
      e.setAttributeNS(t, a, "" + l);
    }
  }
  var Du, vr;
  function fl(e) {
    if (Du === void 0)
      try {
        throw Error();
      } catch (a) {
        var t = a.stack.trim().match(/\n( *(at )?)/);
        Du = t && t[1] || "", vr = -1 < a.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < a.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + Du + e + vr;
  }
  var Ru = !1;
  function Uu(e, t) {
    if (!e || Ru) return "";
    Ru = !0;
    var a = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var l = {
        DetermineComponentFrameRoot: function() {
          try {
            if (t) {
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
                } catch (N) {
                  var S = N;
                }
                Reflect.construct(e, [], O);
              } else {
                try {
                  O.call();
                } catch (N) {
                  S = N;
                }
                e.call(O.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (N) {
                S = N;
              }
              (O = e()) && typeof O.catch == "function" && O.catch(function() {
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
                  var z = `
` + d[l].replace(" at new ", " at ");
                  return e.displayName && z.includes("<anonymous>") && (z = z.replace("<anonymous>", e.displayName)), z;
                }
              while (1 <= l && 0 <= n);
            break;
          }
      }
    } finally {
      Ru = !1, Error.prepareStackTrace = a;
    }
    return (a = e ? e.displayName || e.name : "") ? fl(a) : "";
  }
  function qh(e) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return fl(e.type);
      case 16:
        return fl("Lazy");
      case 13:
        return fl("Suspense");
      case 19:
        return fl("SuspenseList");
      case 0:
      case 15:
        return Uu(e.type, !1);
      case 11:
        return Uu(e.type.render, !1);
      case 1:
        return Uu(e.type, !0);
      case 31:
        return fl("Activity");
      default:
        return "";
    }
  }
  function mr(e) {
    try {
      var t = "";
      do
        t += qh(e), e = e.return;
      while (e);
      return t;
    } catch (a) {
      return `
Error generating stack: ` + a.message + `
` + a.stack;
    }
  }
  function St(e) {
    switch (typeof e) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return e;
      case "object":
        return e;
      default:
        return "";
    }
  }
  function pr(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function Ch(e) {
    var t = pr(e) ? "checked" : "value", a = Object.getOwnPropertyDescriptor(
      e.constructor.prototype,
      t
    ), l = "" + e[t];
    if (!e.hasOwnProperty(t) && typeof a < "u" && typeof a.get == "function" && typeof a.set == "function") {
      var n = a.get, i = a.set;
      return Object.defineProperty(e, t, {
        configurable: !0,
        get: function() {
          return n.call(this);
        },
        set: function(s) {
          l = "" + s, i.call(this, s);
        }
      }), Object.defineProperty(e, t, {
        enumerable: a.enumerable
      }), {
        getValue: function() {
          return l;
        },
        setValue: function(s) {
          l = "" + s;
        },
        stopTracking: function() {
          e._valueTracker = null, delete e[t];
        }
      };
    }
  }
  function fi(e) {
    e._valueTracker || (e._valueTracker = Ch(e));
  }
  function gr(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var a = t.getValue(), l = "";
    return e && (l = pr(e) ? e.checked ? "true" : "false" : e.value), e = l, e !== a ? (t.setValue(e), !0) : !1;
  }
  function di(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var Hh = /[\n"\\]/g;
  function jt(e) {
    return e.replace(
      Hh,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function wu(e, t, a, l, n, i, s, r) {
    e.name = "", s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? e.type = s : e.removeAttribute("type"), t != null ? s === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + St(t)) : e.value !== "" + St(t) && (e.value = "" + St(t)) : s !== "submit" && s !== "reset" || e.removeAttribute("value"), t != null ? qu(e, s, St(t)) : a != null ? qu(e, s, St(a)) : l != null && e.removeAttribute("value"), n == null && i != null && (e.defaultChecked = !!i), n != null && (e.checked = n && typeof n != "function" && typeof n != "symbol"), r != null && typeof r != "function" && typeof r != "symbol" && typeof r != "boolean" ? e.name = "" + St(r) : e.removeAttribute("name");
  }
  function yr(e, t, a, l, n, i, s, r) {
    if (i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" && (e.type = i), t != null || a != null) {
      if (!(i !== "submit" && i !== "reset" || t != null))
        return;
      a = a != null ? "" + St(a) : "", t = t != null ? "" + St(t) : a, r || t === e.value || (e.value = t), e.defaultValue = t;
    }
    l = l ?? n, l = typeof l != "function" && typeof l != "symbol" && !!l, e.checked = r ? e.checked : !!l, e.defaultChecked = !!l, s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" && (e.name = s);
  }
  function qu(e, t, a) {
    t === "number" && di(e.ownerDocument) === e || e.defaultValue === "" + a || (e.defaultValue = "" + a);
  }
  function dl(e, t, a, l) {
    if (e = e.options, t) {
      t = {};
      for (var n = 0; n < a.length; n++)
        t["$" + a[n]] = !0;
      for (a = 0; a < e.length; a++)
        n = t.hasOwnProperty("$" + e[a].value), e[a].selected !== n && (e[a].selected = n), n && l && (e[a].defaultSelected = !0);
    } else {
      for (a = "" + St(a), t = null, n = 0; n < e.length; n++) {
        if (e[n].value === a) {
          e[n].selected = !0, l && (e[n].defaultSelected = !0);
          return;
        }
        t !== null || e[n].disabled || (t = e[n]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function br(e, t, a) {
    if (t != null && (t = "" + St(t), t !== e.value && (e.value = t), a == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = a != null ? "" + St(a) : "";
  }
  function xr(e, t, a, l) {
    if (t == null) {
      if (l != null) {
        if (a != null) throw Error(f(92));
        if (Ce(l)) {
          if (1 < l.length) throw Error(f(93));
          l = l[0];
        }
        a = l;
      }
      a == null && (a = ""), t = a;
    }
    a = St(t), e.defaultValue = a, l = e.textContent, l === a && l !== "" && l !== null && (e.value = l);
  }
  function hl(e, t) {
    if (t) {
      var a = e.firstChild;
      if (a && a === e.lastChild && a.nodeType === 3) {
        a.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var Bh = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Sr(e, t, a) {
    var l = t.indexOf("--") === 0;
    a == null || typeof a == "boolean" || a === "" ? l ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : l ? e.setProperty(t, a) : typeof a != "number" || a === 0 || Bh.has(t) ? t === "float" ? e.cssFloat = a : e[t] = ("" + a).trim() : e[t] = a + "px";
  }
  function jr(e, t, a) {
    if (t != null && typeof t != "object")
      throw Error(f(62));
    if (e = e.style, a != null) {
      for (var l in a)
        !a.hasOwnProperty(l) || t != null && t.hasOwnProperty(l) || (l.indexOf("--") === 0 ? e.setProperty(l, "") : l === "float" ? e.cssFloat = "" : e[l] = "");
      for (var n in t)
        l = t[n], t.hasOwnProperty(n) && a[n] !== l && Sr(e, n, l);
    } else
      for (var i in t)
        t.hasOwnProperty(i) && Sr(e, i, t[i]);
  }
  function Cu(e) {
    if (e.indexOf("-") === -1) return !1;
    switch (e) {
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
  function hi(e) {
    return Yh.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  var Hu = null;
  function Bu(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var vl = null, ml = null;
  function Nr(e) {
    var t = sl(e);
    if (t && (e = t.stateNode)) {
      var a = e[Xe] || null;
      e: switch (e = t.stateNode, t.type) {
        case "input":
          if (wu(
            e,
            a.value,
            a.defaultValue,
            a.defaultValue,
            a.checked,
            a.defaultChecked,
            a.type,
            a.name
          ), t = a.name, a.type === "radio" && t != null) {
            for (a = e; a.parentNode; ) a = a.parentNode;
            for (a = a.querySelectorAll(
              'input[name="' + jt(
                "" + t
              ) + '"][type="radio"]'
            ), t = 0; t < a.length; t++) {
              var l = a[t];
              if (l !== e && l.form === e.form) {
                var n = l[Xe] || null;
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
            for (t = 0; t < a.length; t++)
              l = a[t], l.form === e.form && gr(l);
          }
          break e;
        case "textarea":
          br(e, a.value, a.defaultValue);
          break e;
        case "select":
          t = a.value, t != null && dl(e, !!a.multiple, t, !1);
      }
    }
  }
  var ku = !1;
  function Tr(e, t, a) {
    if (ku) return e(t, a);
    ku = !0;
    try {
      var l = e(t);
      return l;
    } finally {
      if (ku = !1, (vl !== null || ml !== null) && (Pi(), vl && (t = vl, e = ml, ml = vl = null, Nr(t), e)))
        for (t = 0; t < e.length; t++) Nr(e[t]);
    }
  }
  function an(e, t) {
    var a = e.stateNode;
    if (a === null) return null;
    var l = a[Xe] || null;
    if (l === null) return null;
    a = l[t];
    e: switch (t) {
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
        (l = !l.disabled) || (e = e.type, l = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !l;
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (a && typeof a != "function")
      throw Error(
        f(231, t, typeof a)
      );
    return a;
  }
  var Wt = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Yu = !1;
  if (Wt)
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
  function Er() {
    if (vi) return vi;
    var e, t = Gu, a = t.length, l, n = "value" in va ? va.value : va.textContent, i = n.length;
    for (e = 0; e < a && t[e] === n[e]; e++) ;
    var s = a - e;
    for (l = 1; l <= s && t[a - l] === n[i - l]; l++) ;
    return vi = n.slice(e, 1 < l ? 1 - l : void 0);
  }
  function mi(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function pi() {
    return !0;
  }
  function _r() {
    return !1;
  }
  function ct(e) {
    function t(a, l, n, i, s) {
      this._reactName = a, this._targetInst = n, this.type = l, this.nativeEvent = i, this.target = s, this.currentTarget = null;
      for (var r in e)
        e.hasOwnProperty(r) && (a = e[r], this[r] = a ? a(i) : i[r]);
      return this.isDefaultPrevented = (i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1) ? pi : _r, this.isPropagationStopped = _r, this;
    }
    return U(t.prototype, {
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
    }), t;
  }
  var Ba = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, gi = ct(Ba), nn = U({}, Ba, { view: 0, detail: 0 }), Gh = ct(nn), Lu, Xu, un, yi = U({}, nn, {
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
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== un && (un && e.type === "mousemove" ? (Lu = e.screenX - un.screenX, Xu = e.screenY - un.screenY) : Xu = Lu = 0, un = e), Lu);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : Xu;
    }
  }), Ar = ct(yi), Lh = U({}, yi, { dataTransfer: 0 }), Xh = ct(Lh), Qh = U({}, nn, { relatedTarget: 0 }), Qu = ct(Qh), Zh = U({}, Ba, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Vh = ct(Zh), Kh = U({}, Ba, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), Jh = ct(Kh), $h = U({}, Ba, { data: 0 }), zr = ct($h), Wh = {
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
  function Ih(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = Ph[e]) ? !!t[e] : !1;
  }
  function Zu() {
    return Ih;
  }
  var ev = U({}, nn, {
    key: function(e) {
      if (e.key) {
        var t = Wh[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress" ? (e = mi(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Fh[e.keyCode] || "Unidentified" : "";
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
    charCode: function(e) {
      return e.type === "keypress" ? mi(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? mi(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), tv = ct(ev), av = U({}, yi, {
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
  }), Mr = ct(av), lv = U({}, nn, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Zu
  }), nv = ct(lv), iv = U({}, Ba, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), uv = ct(iv), cv = U({}, yi, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), sv = ct(cv), rv = U({}, Ba, {
    newState: 0,
    oldState: 0
  }), ov = ct(rv), fv = [9, 13, 27, 32], Vu = Wt && "CompositionEvent" in window, cn = null;
  Wt && "documentMode" in document && (cn = document.documentMode);
  var dv = Wt && "TextEvent" in window && !cn, Or = Wt && (!Vu || cn && 8 < cn && 11 >= cn), Dr = " ", Rr = !1;
  function Ur(e, t) {
    switch (e) {
      case "keyup":
        return fv.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function wr(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var pl = !1;
  function hv(e, t) {
    switch (e) {
      case "compositionend":
        return wr(t);
      case "keypress":
        return t.which !== 32 ? null : (Rr = !0, Dr);
      case "textInput":
        return e = t.data, e === Dr && Rr ? null : e;
      default:
        return null;
    }
  }
  function vv(e, t) {
    if (pl)
      return e === "compositionend" || !Vu && Ur(e, t) ? (e = Er(), vi = Gu = va = null, pl = !1, e) : null;
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
          if (t.char && 1 < t.char.length)
            return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return Or && t.locale !== "ko" ? null : t.data;
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
  function qr(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!mv[e.type] : t === "textarea";
  }
  function Cr(e, t, a, l) {
    vl ? ml ? ml.push(l) : ml = [l] : vl = l, t = nu(t, "onChange"), 0 < t.length && (a = new gi(
      "onChange",
      "change",
      null,
      a,
      l
    ), e.push({ event: a, listeners: t }));
  }
  var sn = null, rn = null;
  function pv(e) {
    yd(e, 0);
  }
  function bi(e) {
    var t = tn(e);
    if (gr(t)) return e;
  }
  function Hr(e, t) {
    if (e === "change") return t;
  }
  var Br = !1;
  if (Wt) {
    var Ku;
    if (Wt) {
      var Ju = "oninput" in document;
      if (!Ju) {
        var kr = document.createElement("div");
        kr.setAttribute("oninput", "return;"), Ju = typeof kr.oninput == "function";
      }
      Ku = Ju;
    } else Ku = !1;
    Br = Ku && (!document.documentMode || 9 < document.documentMode);
  }
  function Yr() {
    sn && (sn.detachEvent("onpropertychange", Gr), rn = sn = null);
  }
  function Gr(e) {
    if (e.propertyName === "value" && bi(rn)) {
      var t = [];
      Cr(
        t,
        rn,
        e,
        Bu(e)
      ), Tr(pv, t);
    }
  }
  function gv(e, t, a) {
    e === "focusin" ? (Yr(), sn = t, rn = a, sn.attachEvent("onpropertychange", Gr)) : e === "focusout" && Yr();
  }
  function yv(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return bi(rn);
  }
  function bv(e, t) {
    if (e === "click") return bi(t);
  }
  function xv(e, t) {
    if (e === "input" || e === "change")
      return bi(t);
  }
  function Sv(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var dt = typeof Object.is == "function" ? Object.is : Sv;
  function on(e, t) {
    if (dt(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
      return !1;
    var a = Object.keys(e), l = Object.keys(t);
    if (a.length !== l.length) return !1;
    for (l = 0; l < a.length; l++) {
      var n = a[l];
      if (!tl.call(t, n) || !dt(e[n], t[n]))
        return !1;
    }
    return !0;
  }
  function Lr(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Xr(e, t) {
    var a = Lr(e);
    e = 0;
    for (var l; a; ) {
      if (a.nodeType === 3) {
        if (l = e + a.textContent.length, e <= t && l >= t)
          return { node: a, offset: t - e };
        e = l;
      }
      e: {
        for (; a; ) {
          if (a.nextSibling) {
            a = a.nextSibling;
            break e;
          }
          a = a.parentNode;
        }
        a = void 0;
      }
      a = Lr(a);
    }
  }
  function Qr(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Qr(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function Zr(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var t = di(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var a = typeof t.contentWindow.location.href == "string";
      } catch {
        a = !1;
      }
      if (a) e = t.contentWindow;
      else break;
      t = di(e.document);
    }
    return t;
  }
  function $u(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  var jv = Wt && "documentMode" in document && 11 >= document.documentMode, gl = null, Wu = null, fn = null, Fu = !1;
  function Vr(e, t, a) {
    var l = a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
    Fu || gl == null || gl !== di(l) || (l = gl, "selectionStart" in l && $u(l) ? l = { start: l.selectionStart, end: l.selectionEnd } : (l = (l.ownerDocument && l.ownerDocument.defaultView || window).getSelection(), l = {
      anchorNode: l.anchorNode,
      anchorOffset: l.anchorOffset,
      focusNode: l.focusNode,
      focusOffset: l.focusOffset
    }), fn && on(fn, l) || (fn = l, l = nu(Wu, "onSelect"), 0 < l.length && (t = new gi(
      "onSelect",
      "select",
      null,
      t,
      a
    ), e.push({ event: t, listeners: l }), t.target = gl)));
  }
  function ka(e, t) {
    var a = {};
    return a[e.toLowerCase()] = t.toLowerCase(), a["Webkit" + e] = "webkit" + t, a["Moz" + e] = "moz" + t, a;
  }
  var yl = {
    animationend: ka("Animation", "AnimationEnd"),
    animationiteration: ka("Animation", "AnimationIteration"),
    animationstart: ka("Animation", "AnimationStart"),
    transitionrun: ka("Transition", "TransitionRun"),
    transitionstart: ka("Transition", "TransitionStart"),
    transitioncancel: ka("Transition", "TransitionCancel"),
    transitionend: ka("Transition", "TransitionEnd")
  }, Pu = {}, Kr = {};
  Wt && (Kr = document.createElement("div").style, "AnimationEvent" in window || (delete yl.animationend.animation, delete yl.animationiteration.animation, delete yl.animationstart.animation), "TransitionEvent" in window || delete yl.transitionend.transition);
  function Ya(e) {
    if (Pu[e]) return Pu[e];
    if (!yl[e]) return e;
    var t = yl[e], a;
    for (a in t)
      if (t.hasOwnProperty(a) && a in Kr)
        return Pu[e] = t[a];
    return e;
  }
  var Jr = Ya("animationend"), $r = Ya("animationiteration"), Wr = Ya("animationstart"), Nv = Ya("transitionrun"), Tv = Ya("transitionstart"), Ev = Ya("transitioncancel"), Fr = Ya("transitionend"), Pr = /* @__PURE__ */ new Map(), Iu = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Iu.push("scrollEnd");
  function wt(e, t) {
    Pr.set(e, t), Ha(t, [e]);
  }
  var Ir = /* @__PURE__ */ new WeakMap();
  function Nt(e, t) {
    if (typeof e == "object" && e !== null) {
      var a = Ir.get(e);
      return a !== void 0 ? a : (t = {
        value: e,
        source: t,
        stack: mr(t)
      }, Ir.set(e, t), t);
    }
    return {
      value: e,
      source: t,
      stack: mr(t)
    };
  }
  var Tt = [], bl = 0, ec = 0;
  function xi() {
    for (var e = bl, t = ec = bl = 0; t < e; ) {
      var a = Tt[t];
      Tt[t++] = null;
      var l = Tt[t];
      Tt[t++] = null;
      var n = Tt[t];
      Tt[t++] = null;
      var i = Tt[t];
      if (Tt[t++] = null, l !== null && n !== null) {
        var s = l.pending;
        s === null ? n.next = n : (n.next = s.next, s.next = n), l.pending = n;
      }
      i !== 0 && eo(a, n, i);
    }
  }
  function Si(e, t, a, l) {
    Tt[bl++] = e, Tt[bl++] = t, Tt[bl++] = a, Tt[bl++] = l, ec |= l, e.lanes |= l, e = e.alternate, e !== null && (e.lanes |= l);
  }
  function tc(e, t, a, l) {
    return Si(e, t, a, l), ji(e);
  }
  function xl(e, t) {
    return Si(e, null, null, t), ji(e);
  }
  function eo(e, t, a) {
    e.lanes |= a;
    var l = e.alternate;
    l !== null && (l.lanes |= a);
    for (var n = !1, i = e.return; i !== null; )
      i.childLanes |= a, l = i.alternate, l !== null && (l.childLanes |= a), i.tag === 22 && (e = i.stateNode, e === null || e._visibility & 1 || (n = !0)), e = i, i = i.return;
    return e.tag === 3 ? (i = e.stateNode, n && t !== null && (n = 31 - $e(a), e = i.hiddenUpdates, l = e[n], l === null ? e[n] = [t] : l.push(t), t.lane = a | 536870912), i) : null;
  }
  function ji(e) {
    if (50 < Cn)
      throw Cn = 0, cs = null, Error(f(185));
    for (var t = e.return; t !== null; )
      e = t, t = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var Sl = {};
  function _v(e, t, a, l) {
    this.tag = e, this.key = a, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = l, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function ht(e, t, a, l) {
    return new _v(e, t, a, l);
  }
  function ac(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function Ft(e, t) {
    var a = e.alternate;
    return a === null ? (a = ht(
      e.tag,
      t,
      e.key,
      e.mode
    ), a.elementType = e.elementType, a.type = e.type, a.stateNode = e.stateNode, a.alternate = e, e.alternate = a) : (a.pendingProps = t, a.type = e.type, a.flags = 0, a.subtreeFlags = 0, a.deletions = null), a.flags = e.flags & 65011712, a.childLanes = e.childLanes, a.lanes = e.lanes, a.child = e.child, a.memoizedProps = e.memoizedProps, a.memoizedState = e.memoizedState, a.updateQueue = e.updateQueue, t = e.dependencies, a.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, a.sibling = e.sibling, a.index = e.index, a.ref = e.ref, a.refCleanup = e.refCleanup, a;
  }
  function to(e, t) {
    e.flags &= 65011714;
    var a = e.alternate;
    return a === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = a.childLanes, e.lanes = a.lanes, e.child = a.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = a.memoizedProps, e.memoizedState = a.memoizedState, e.updateQueue = a.updateQueue, e.type = a.type, t = a.dependencies, e.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), e;
  }
  function Ni(e, t, a, l, n, i) {
    var s = 0;
    if (l = e, typeof e == "function") ac(e) && (s = 1);
    else if (typeof e == "string")
      s = zm(
        e,
        a,
        J.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case Re:
          return e = ht(31, a, t, n), e.elementType = Re, e.lanes = i, e;
        case Z:
          return Ga(a.children, n, i, t);
        case k:
          s = 8, n |= 24;
          break;
        case I:
          return e = ht(12, a, t, n | 2), e.elementType = I, e.lanes = i, e;
        case F:
          return e = ht(13, a, t, n), e.elementType = F, e.lanes = i, e;
        case ue:
          return e = ht(19, a, t, n), e.elementType = ue, e.lanes = i, e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case ee:
              case H:
                s = 10;
                break e;
              case D:
                s = 9;
                break e;
              case W:
                s = 11;
                break e;
              case C:
                s = 14;
                break e;
              case P:
                s = 16, l = null;
                break e;
            }
          s = 29, a = Error(
            f(130, e === null ? "null" : typeof e, "")
          ), l = null;
      }
    return t = ht(s, a, t, n), t.elementType = e, t.type = l, t.lanes = i, t;
  }
  function Ga(e, t, a, l) {
    return e = ht(7, e, l, t), e.lanes = a, e;
  }
  function lc(e, t, a) {
    return e = ht(6, e, null, t), e.lanes = a, e;
  }
  function nc(e, t, a) {
    return t = ht(
      4,
      e.children !== null ? e.children : [],
      e.key,
      t
    ), t.lanes = a, t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation
    }, t;
  }
  var jl = [], Nl = 0, Ti = null, Ei = 0, Et = [], _t = 0, La = null, Pt = 1, It = "";
  function Xa(e, t) {
    jl[Nl++] = Ei, jl[Nl++] = Ti, Ti = e, Ei = t;
  }
  function ao(e, t, a) {
    Et[_t++] = Pt, Et[_t++] = It, Et[_t++] = La, La = e;
    var l = Pt;
    e = It;
    var n = 32 - $e(l) - 1;
    l &= ~(1 << n), a += 1;
    var i = 32 - $e(t) + n;
    if (30 < i) {
      var s = n - n % 5;
      i = (l & (1 << s) - 1).toString(32), l >>= s, n -= s, Pt = 1 << 32 - $e(t) + n | a << n | l, It = i + e;
    } else
      Pt = 1 << i | a << n | l, It = e;
  }
  function ic(e) {
    e.return !== null && (Xa(e, 1), ao(e, 1, 0));
  }
  function uc(e) {
    for (; e === Ti; )
      Ti = jl[--Nl], jl[Nl] = null, Ei = jl[--Nl], jl[Nl] = null;
    for (; e === La; )
      La = Et[--_t], Et[_t] = null, It = Et[--_t], Et[_t] = null, Pt = Et[--_t], Et[_t] = null;
  }
  var lt = null, we = null, pe = !1, Qa = null, Lt = !1, cc = Error(f(519));
  function Za(e) {
    var t = Error(f(418, ""));
    throw vn(Nt(t, e)), cc;
  }
  function lo(e) {
    var t = e.stateNode, a = e.type, l = e.memoizedProps;
    switch (t[Oe] = e, t[Xe] = l, a) {
      case "dialog":
        he("cancel", t), he("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        he("load", t);
        break;
      case "video":
      case "audio":
        for (a = 0; a < Bn.length; a++)
          he(Bn[a], t);
        break;
      case "source":
        he("error", t);
        break;
      case "img":
      case "image":
      case "link":
        he("error", t), he("load", t);
        break;
      case "details":
        he("toggle", t);
        break;
      case "input":
        he("invalid", t), yr(
          t,
          l.value,
          l.defaultValue,
          l.checked,
          l.defaultChecked,
          l.type,
          l.name,
          !0
        ), fi(t);
        break;
      case "select":
        he("invalid", t);
        break;
      case "textarea":
        he("invalid", t), xr(t, l.value, l.defaultValue, l.children), fi(t);
    }
    a = l.children, typeof a != "string" && typeof a != "number" && typeof a != "bigint" || t.textContent === "" + a || l.suppressHydrationWarning === !0 || jd(t.textContent, a) ? (l.popover != null && (he("beforetoggle", t), he("toggle", t)), l.onScroll != null && he("scroll", t), l.onScrollEnd != null && he("scrollend", t), l.onClick != null && (t.onclick = iu), t = !0) : t = !1, t || Za(e);
  }
  function no(e) {
    for (lt = e.return; lt; )
      switch (lt.tag) {
        case 5:
        case 13:
          Lt = !1;
          return;
        case 27:
        case 3:
          Lt = !0;
          return;
        default:
          lt = lt.return;
      }
  }
  function dn(e) {
    if (e !== lt) return !1;
    if (!pe) return no(e), pe = !0, !1;
    var t = e.tag, a;
    if ((a = t !== 3 && t !== 27) && ((a = t === 5) && (a = e.type, a = !(a !== "form" && a !== "button") || Ns(e.type, e.memoizedProps)), a = !a), a && we && Za(e), no(e), t === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(f(317));
      e: {
        for (e = e.nextSibling, t = 0; e; ) {
          if (e.nodeType === 8)
            if (a = e.data, a === "/$") {
              if (t === 0) {
                we = Ct(e.nextSibling);
                break e;
              }
              t--;
            } else
              a !== "$" && a !== "$!" && a !== "$?" || t++;
          e = e.nextSibling;
        }
        we = null;
      }
    } else
      t === 27 ? (t = we, Oa(e.type) ? (e = As, As = null, we = e) : we = t) : we = lt ? Ct(e.stateNode.nextSibling) : null;
    return !0;
  }
  function hn() {
    we = lt = null, pe = !1;
  }
  function io() {
    var e = Qa;
    return e !== null && (ot === null ? ot = e : ot.push.apply(
      ot,
      e
    ), Qa = null), e;
  }
  function vn(e) {
    Qa === null ? Qa = [e] : Qa.push(e);
  }
  var sc = R(null), Va = null, ea = null;
  function ma(e, t, a) {
    L(sc, t._currentValue), t._currentValue = a;
  }
  function ta(e) {
    e._currentValue = sc.current, Q(sc);
  }
  function rc(e, t, a) {
    for (; e !== null; ) {
      var l = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, l !== null && (l.childLanes |= t)) : l !== null && (l.childLanes & t) !== t && (l.childLanes |= t), e === a) break;
      e = e.return;
    }
  }
  function oc(e, t, a, l) {
    var n = e.child;
    for (n !== null && (n.return = e); n !== null; ) {
      var i = n.dependencies;
      if (i !== null) {
        var s = n.child;
        i = i.firstContext;
        e: for (; i !== null; ) {
          var r = i;
          i = n;
          for (var d = 0; d < t.length; d++)
            if (r.context === t[d]) {
              i.lanes |= a, r = i.alternate, r !== null && (r.lanes |= a), rc(
                i.return,
                a,
                e
              ), l || (s = null);
              break e;
            }
          i = r.next;
        }
      } else if (n.tag === 18) {
        if (s = n.return, s === null) throw Error(f(341));
        s.lanes |= a, i = s.alternate, i !== null && (i.lanes |= a), rc(s, a, e), s = null;
      } else s = n.child;
      if (s !== null) s.return = n;
      else
        for (s = n; s !== null; ) {
          if (s === e) {
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
  function mn(e, t, a, l) {
    e = null;
    for (var n = t, i = !1; n !== null; ) {
      if (!i) {
        if ((n.flags & 524288) !== 0) i = !0;
        else if ((n.flags & 262144) !== 0) break;
      }
      if (n.tag === 10) {
        var s = n.alternate;
        if (s === null) throw Error(f(387));
        if (s = s.memoizedProps, s !== null) {
          var r = n.type;
          dt(n.pendingProps.value, s.value) || (e !== null ? e.push(r) : e = [r]);
        }
      } else if (n === Je.current) {
        if (s = n.alternate, s === null) throw Error(f(387));
        s.memoizedState.memoizedState !== n.memoizedState.memoizedState && (e !== null ? e.push(Qn) : e = [Qn]);
      }
      n = n.return;
    }
    e !== null && oc(
      t,
      e,
      a,
      l
    ), t.flags |= 262144;
  }
  function _i(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!dt(
        e.context._currentValue,
        e.memoizedValue
      ))
        return !0;
      e = e.next;
    }
    return !1;
  }
  function Ka(e) {
    Va = e, ea = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function et(e) {
    return uo(Va, e);
  }
  function Ai(e, t) {
    return Va === null && Ka(e), uo(e, t);
  }
  function uo(e, t) {
    var a = t._currentValue;
    if (t = { context: t, memoizedValue: a, next: null }, ea === null) {
      if (e === null) throw Error(f(308));
      ea = t, e.dependencies = { lanes: 0, firstContext: t }, e.flags |= 524288;
    } else ea = ea.next = t;
    return a;
  }
  var Av = typeof AbortController < "u" ? AbortController : function() {
    var e = [], t = this.signal = {
      aborted: !1,
      addEventListener: function(a, l) {
        e.push(l);
      }
    };
    this.abort = function() {
      t.aborted = !0, e.forEach(function(a) {
        return a();
      });
    };
  }, zv = c.unstable_scheduleCallback, Mv = c.unstable_NormalPriority, Ge = {
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
  function pn(e) {
    e.refCount--, e.refCount === 0 && zv(Mv, function() {
      e.controller.abort();
    });
  }
  var gn = null, dc = 0, Tl = 0, El = null;
  function Ov(e, t) {
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
    return dc++, t.then(co, co), t;
  }
  function co() {
    if (--dc === 0 && gn !== null) {
      El !== null && (El.status = "fulfilled");
      var e = gn;
      gn = null, Tl = 0, El = null;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function Dv(e, t) {
    var a = [], l = {
      status: "pending",
      value: null,
      reason: null,
      then: function(n) {
        a.push(n);
      }
    };
    return e.then(
      function() {
        l.status = "fulfilled", l.value = t;
        for (var n = 0; n < a.length; n++) (0, a[n])(t);
      },
      function(n) {
        for (l.status = "rejected", l.reason = n, n = 0; n < a.length; n++)
          (0, a[n])(void 0);
      }
    ), l;
  }
  var so = _.S;
  _.S = function(e, t) {
    typeof t == "object" && t !== null && typeof t.then == "function" && Ov(e, t), so !== null && so(e, t);
  };
  var Ja = R(null);
  function hc() {
    var e = Ja.current;
    return e !== null ? e : Me.pooledCache;
  }
  function zi(e, t) {
    t === null ? L(Ja, Ja.current) : L(Ja, t.pool);
  }
  function ro() {
    var e = hc();
    return e === null ? null : { parent: Ge._currentValue, pool: e };
  }
  var yn = Error(f(460)), oo = Error(f(474)), Mi = Error(f(542)), vc = { then: function() {
  } };
  function fo(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function Oi() {
  }
  function ho(e, t, a) {
    switch (a = e[a], a === void 0 ? e.push(t) : a !== t && (t.then(Oi, Oi), t = a), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw e = t.reason, mo(e), e;
      default:
        if (typeof t.status == "string") t.then(Oi, Oi);
        else {
          if (e = Me, e !== null && 100 < e.shellSuspendCounter)
            throw Error(f(482));
          e = t, e.status = "pending", e.then(
            function(l) {
              if (t.status === "pending") {
                var n = t;
                n.status = "fulfilled", n.value = l;
              }
            },
            function(l) {
              if (t.status === "pending") {
                var n = t;
                n.status = "rejected", n.reason = l;
              }
            }
          );
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw e = t.reason, mo(e), e;
        }
        throw bn = t, yn;
    }
  }
  var bn = null;
  function vo() {
    if (bn === null) throw Error(f(459));
    var e = bn;
    return bn = null, e;
  }
  function mo(e) {
    if (e === yn || e === Mi)
      throw Error(f(483));
  }
  var pa = !1;
  function mc(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function pc(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
      baseState: e.baseState,
      firstBaseUpdate: e.firstBaseUpdate,
      lastBaseUpdate: e.lastBaseUpdate,
      shared: e.shared,
      callbacks: null
    });
  }
  function ga(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function ya(e, t, a) {
    var l = e.updateQueue;
    if (l === null) return null;
    if (l = l.shared, (Se & 2) !== 0) {
      var n = l.pending;
      return n === null ? t.next = t : (t.next = n.next, n.next = t), l.pending = t, t = ji(e), eo(e, null, a), t;
    }
    return Si(e, l, t, a), ji(e);
  }
  function xn(e, t, a) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (a & 4194048) !== 0)) {
      var l = t.lanes;
      l &= e.pendingLanes, a |= l, t.lanes = a, Il(e, a);
    }
  }
  function gc(e, t) {
    var a = e.updateQueue, l = e.alternate;
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
        i === null ? n = i = t : i = i.next = t;
      } else n = i = t;
      a = {
        baseState: l.baseState,
        firstBaseUpdate: n,
        lastBaseUpdate: i,
        shared: l.shared,
        callbacks: l.callbacks
      }, e.updateQueue = a;
      return;
    }
    e = a.lastBaseUpdate, e === null ? a.firstBaseUpdate = t : e.next = t, a.lastBaseUpdate = t;
  }
  var yc = !1;
  function Sn() {
    if (yc) {
      var e = El;
      if (e !== null) throw e;
    }
  }
  function jn(e, t, a, l) {
    yc = !1;
    var n = e.updateQueue;
    pa = !1;
    var i = n.firstBaseUpdate, s = n.lastBaseUpdate, r = n.shared.pending;
    if (r !== null) {
      n.shared.pending = null;
      var d = r, x = d.next;
      d.next = null, s === null ? i = x : s.next = x, s = d;
      var z = e.alternate;
      z !== null && (z = z.updateQueue, r = z.lastBaseUpdate, r !== s && (r === null ? z.firstBaseUpdate = x : r.next = x, z.lastBaseUpdate = d));
    }
    if (i !== null) {
      var O = n.baseState;
      s = 0, z = x = d = null, r = i;
      do {
        var S = r.lane & -536870913, N = S !== r.lane;
        if (N ? (ve & S) === S : (l & S) === S) {
          S !== 0 && S === Tl && (yc = !0), z !== null && (z = z.next = {
            lane: 0,
            tag: r.tag,
            payload: r.payload,
            callback: null,
            next: null
          });
          e: {
            var ie = e, ae = r;
            S = t;
            var _e = a;
            switch (ae.tag) {
              case 1:
                if (ie = ae.payload, typeof ie == "function") {
                  O = ie.call(_e, O, S);
                  break e;
                }
                O = ie;
                break e;
              case 3:
                ie.flags = ie.flags & -65537 | 128;
              case 0:
                if (ie = ae.payload, S = typeof ie == "function" ? ie.call(_e, O, S) : ie, S == null) break e;
                O = U({}, O, S);
                break e;
              case 2:
                pa = !0;
            }
          }
          S = r.callback, S !== null && (e.flags |= 64, N && (e.flags |= 8192), N = n.callbacks, N === null ? n.callbacks = [S] : N.push(S));
        } else
          N = {
            lane: S,
            tag: r.tag,
            payload: r.payload,
            callback: r.callback,
            next: null
          }, z === null ? (x = z = N, d = O) : z = z.next = N, s |= S;
        if (r = r.next, r === null) {
          if (r = n.shared.pending, r === null)
            break;
          N = r, r = N.next, N.next = null, n.lastBaseUpdate = N, n.shared.pending = null;
        }
      } while (!0);
      z === null && (d = O), n.baseState = d, n.firstBaseUpdate = x, n.lastBaseUpdate = z, i === null && (n.shared.lanes = 0), _a |= s, e.lanes = s, e.memoizedState = O;
    }
  }
  function po(e, t) {
    if (typeof e != "function")
      throw Error(f(191, e));
    e.call(t);
  }
  function go(e, t) {
    var a = e.callbacks;
    if (a !== null)
      for (e.callbacks = null, e = 0; e < a.length; e++)
        po(a[e], t);
  }
  var _l = R(null), Di = R(0);
  function yo(e, t) {
    e = sa, L(Di, e), L(_l, t), sa = e | t.baseLanes;
  }
  function bc() {
    L(Di, sa), L(_l, _l.current);
  }
  function xc() {
    sa = Di.current, Q(_l), Q(Di);
  }
  var ba = 0, re = null, Te = null, ke = null, Ri = !1, Al = !1, $a = !1, Ui = 0, Nn = 0, zl = null, Rv = 0;
  function He() {
    throw Error(f(321));
  }
  function Sc(e, t) {
    if (t === null) return !1;
    for (var a = 0; a < t.length && a < e.length; a++)
      if (!dt(e[a], t[a])) return !1;
    return !0;
  }
  function jc(e, t, a, l, n, i) {
    return ba = i, re = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, _.H = e === null || e.memoizedState === null ? tf : af, $a = !1, i = a(l, n), $a = !1, Al && (i = xo(
      t,
      a,
      l,
      n
    )), bo(e), i;
  }
  function bo(e) {
    _.H = ki;
    var t = Te !== null && Te.next !== null;
    if (ba = 0, ke = Te = re = null, Ri = !1, Nn = 0, zl = null, t) throw Error(f(300));
    e === null || Ze || (e = e.dependencies, e !== null && _i(e) && (Ze = !0));
  }
  function xo(e, t, a, l) {
    re = e;
    var n = 0;
    do {
      if (Al && (zl = null), Nn = 0, Al = !1, 25 <= n) throw Error(f(301));
      if (n += 1, ke = Te = null, e.updateQueue != null) {
        var i = e.updateQueue;
        i.lastEffect = null, i.events = null, i.stores = null, i.memoCache != null && (i.memoCache.index = 0);
      }
      _.H = kv, i = t(a, l);
    } while (Al);
    return i;
  }
  function Uv() {
    var e = _.H, t = e.useState()[0];
    return t = typeof t.then == "function" ? Tn(t) : t, e = e.useState()[0], (Te !== null ? Te.memoizedState : null) !== e && (re.flags |= 1024), t;
  }
  function Nc() {
    var e = Ui !== 0;
    return Ui = 0, e;
  }
  function Tc(e, t, a) {
    t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~a;
  }
  function Ec(e) {
    if (Ri) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      Ri = !1;
    }
    ba = 0, ke = Te = re = null, Al = !1, Nn = Ui = 0, zl = null;
  }
  function st() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return ke === null ? re.memoizedState = ke = e : ke = ke.next = e, ke;
  }
  function Ye() {
    if (Te === null) {
      var e = re.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Te.next;
    var t = ke === null ? re.memoizedState : ke.next;
    if (t !== null)
      ke = t, Te = e;
    else {
      if (e === null)
        throw re.alternate === null ? Error(f(467)) : Error(f(310));
      Te = e, e = {
        memoizedState: Te.memoizedState,
        baseState: Te.baseState,
        baseQueue: Te.baseQueue,
        queue: Te.queue,
        next: null
      }, ke === null ? re.memoizedState = ke = e : ke = ke.next = e;
    }
    return ke;
  }
  function _c() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Tn(e) {
    var t = Nn;
    return Nn += 1, zl === null && (zl = []), e = ho(zl, e, t), t = re, (ke === null ? t.memoizedState : ke.next) === null && (t = t.alternate, _.H = t === null || t.memoizedState === null ? tf : af), e;
  }
  function wi(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return Tn(e);
      if (e.$$typeof === H) return et(e);
    }
    throw Error(f(438, String(e)));
  }
  function Ac(e) {
    var t = null, a = re.updateQueue;
    if (a !== null && (t = a.memoCache), t == null) {
      var l = re.alternate;
      l !== null && (l = l.updateQueue, l !== null && (l = l.memoCache, l != null && (t = {
        data: l.data.map(function(n) {
          return n.slice();
        }),
        index: 0
      })));
    }
    if (t == null && (t = { data: [], index: 0 }), a === null && (a = _c(), re.updateQueue = a), a.memoCache = t, a = t.data[t.index], a === void 0)
      for (a = t.data[t.index] = Array(e), l = 0; l < e; l++)
        a[l] = Bt;
    return t.index++, a;
  }
  function aa(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function qi(e) {
    var t = Ye();
    return zc(t, Te, e);
  }
  function zc(e, t, a) {
    var l = e.queue;
    if (l === null) throw Error(f(311));
    l.lastRenderedReducer = a;
    var n = e.baseQueue, i = l.pending;
    if (i !== null) {
      if (n !== null) {
        var s = n.next;
        n.next = i.next, i.next = s;
      }
      t.baseQueue = n = i, l.pending = null;
    }
    if (i = e.baseState, n === null) e.memoizedState = i;
    else {
      t = n.next;
      var r = s = null, d = null, x = t, z = !1;
      do {
        var O = x.lane & -536870913;
        if (O !== x.lane ? (ve & O) === O : (ba & O) === O) {
          var S = x.revertLane;
          if (S === 0)
            d !== null && (d = d.next = {
              lane: 0,
              revertLane: 0,
              action: x.action,
              hasEagerState: x.hasEagerState,
              eagerState: x.eagerState,
              next: null
            }), O === Tl && (z = !0);
          else if ((ba & S) === S) {
            x = x.next, S === Tl && (z = !0);
            continue;
          } else
            O = {
              lane: 0,
              revertLane: x.revertLane,
              action: x.action,
              hasEagerState: x.hasEagerState,
              eagerState: x.eagerState,
              next: null
            }, d === null ? (r = d = O, s = i) : d = d.next = O, re.lanes |= S, _a |= S;
          O = x.action, $a && a(i, O), i = x.hasEagerState ? x.eagerState : a(i, O);
        } else
          S = {
            lane: O,
            revertLane: x.revertLane,
            action: x.action,
            hasEagerState: x.hasEagerState,
            eagerState: x.eagerState,
            next: null
          }, d === null ? (r = d = S, s = i) : d = d.next = S, re.lanes |= O, _a |= O;
        x = x.next;
      } while (x !== null && x !== t);
      if (d === null ? s = i : d.next = r, !dt(i, e.memoizedState) && (Ze = !0, z && (a = El, a !== null)))
        throw a;
      e.memoizedState = i, e.baseState = s, e.baseQueue = d, l.lastRenderedState = i;
    }
    return n === null && (l.lanes = 0), [e.memoizedState, l.dispatch];
  }
  function Mc(e) {
    var t = Ye(), a = t.queue;
    if (a === null) throw Error(f(311));
    a.lastRenderedReducer = e;
    var l = a.dispatch, n = a.pending, i = t.memoizedState;
    if (n !== null) {
      a.pending = null;
      var s = n = n.next;
      do
        i = e(i, s.action), s = s.next;
      while (s !== n);
      dt(i, t.memoizedState) || (Ze = !0), t.memoizedState = i, t.baseQueue === null && (t.baseState = i), a.lastRenderedState = i;
    }
    return [i, l];
  }
  function So(e, t, a) {
    var l = re, n = Ye(), i = pe;
    if (i) {
      if (a === void 0) throw Error(f(407));
      a = a();
    } else a = t();
    var s = !dt(
      (Te || n).memoizedState,
      a
    );
    s && (n.memoizedState = a, Ze = !0), n = n.queue;
    var r = To.bind(null, l, n, e);
    if (En(2048, 8, r, [e]), n.getSnapshot !== t || s || ke !== null && ke.memoizedState.tag & 1) {
      if (l.flags |= 2048, Ml(
        9,
        Ci(),
        No.bind(
          null,
          l,
          n,
          a,
          t
        ),
        null
      ), Me === null) throw Error(f(349));
      i || (ba & 124) !== 0 || jo(l, t, a);
    }
    return a;
  }
  function jo(e, t, a) {
    e.flags |= 16384, e = { getSnapshot: t, value: a }, t = re.updateQueue, t === null ? (t = _c(), re.updateQueue = t, t.stores = [e]) : (a = t.stores, a === null ? t.stores = [e] : a.push(e));
  }
  function No(e, t, a, l) {
    t.value = a, t.getSnapshot = l, Eo(t) && _o(e);
  }
  function To(e, t, a) {
    return a(function() {
      Eo(t) && _o(e);
    });
  }
  function Eo(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var a = t();
      return !dt(e, a);
    } catch {
      return !0;
    }
  }
  function _o(e) {
    var t = xl(e, 2);
    t !== null && yt(t, e, 2);
  }
  function Oc(e) {
    var t = st();
    if (typeof e == "function") {
      var a = e;
      if (e = a(), $a) {
        Rt(!0);
        try {
          a();
        } finally {
          Rt(!1);
        }
      }
    }
    return t.memoizedState = t.baseState = e, t.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: aa,
      lastRenderedState: e
    }, t;
  }
  function Ao(e, t, a, l) {
    return e.baseState = a, zc(
      e,
      Te,
      typeof l == "function" ? l : aa
    );
  }
  function wv(e, t, a, l, n) {
    if (Bi(e)) throw Error(f(485));
    if (e = t.action, e !== null) {
      var i = {
        payload: n,
        action: e,
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
      _.T !== null ? a(!0) : i.isTransition = !1, l(i), a = t.pending, a === null ? (i.next = t.pending = i, zo(t, i)) : (i.next = a.next, t.pending = a.next = i);
    }
  }
  function zo(e, t) {
    var a = t.action, l = t.payload, n = e.state;
    if (t.isTransition) {
      var i = _.T, s = {};
      _.T = s;
      try {
        var r = a(n, l), d = _.S;
        d !== null && d(s, r), Mo(e, t, r);
      } catch (x) {
        Dc(e, t, x);
      } finally {
        _.T = i;
      }
    } else
      try {
        i = a(n, l), Mo(e, t, i);
      } catch (x) {
        Dc(e, t, x);
      }
  }
  function Mo(e, t, a) {
    a !== null && typeof a == "object" && typeof a.then == "function" ? a.then(
      function(l) {
        Oo(e, t, l);
      },
      function(l) {
        return Dc(e, t, l);
      }
    ) : Oo(e, t, a);
  }
  function Oo(e, t, a) {
    t.status = "fulfilled", t.value = a, Do(t), e.state = a, t = e.pending, t !== null && (a = t.next, a === t ? e.pending = null : (a = a.next, t.next = a, zo(e, a)));
  }
  function Dc(e, t, a) {
    var l = e.pending;
    if (e.pending = null, l !== null) {
      l = l.next;
      do
        t.status = "rejected", t.reason = a, Do(t), t = t.next;
      while (t !== l);
    }
    e.action = null;
  }
  function Do(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function Ro(e, t) {
    return t;
  }
  function Uo(e, t) {
    if (pe) {
      var a = Me.formState;
      if (a !== null) {
        e: {
          var l = re;
          if (pe) {
            if (we) {
              t: {
                for (var n = we, i = Lt; n.nodeType !== 8; ) {
                  if (!i) {
                    n = null;
                    break t;
                  }
                  if (n = Ct(
                    n.nextSibling
                  ), n === null) {
                    n = null;
                    break t;
                  }
                }
                i = n.data, n = i === "F!" || i === "F" ? n : null;
              }
              if (n) {
                we = Ct(
                  n.nextSibling
                ), l = n.data === "F!";
                break e;
              }
            }
            Za(l);
          }
          l = !1;
        }
        l && (t = a[0]);
      }
    }
    return a = st(), a.memoizedState = a.baseState = t, l = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Ro,
      lastRenderedState: t
    }, a.queue = l, a = Po.bind(
      null,
      re,
      l
    ), l.dispatch = a, l = Oc(!1), i = Cc.bind(
      null,
      re,
      !1,
      l.queue
    ), l = st(), n = {
      state: t,
      dispatch: null,
      action: e,
      pending: null
    }, l.queue = n, a = wv.bind(
      null,
      re,
      n,
      i,
      a
    ), n.dispatch = a, l.memoizedState = e, [t, a, !1];
  }
  function wo(e) {
    var t = Ye();
    return qo(t, Te, e);
  }
  function qo(e, t, a) {
    if (t = zc(
      e,
      t,
      Ro
    )[0], e = qi(aa)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var l = Tn(t);
      } catch (s) {
        throw s === yn ? Mi : s;
      }
    else l = t;
    t = Ye();
    var n = t.queue, i = n.dispatch;
    return a !== t.memoizedState && (re.flags |= 2048, Ml(
      9,
      Ci(),
      qv.bind(null, n, a),
      null
    )), [l, i, e];
  }
  function qv(e, t) {
    e.action = t;
  }
  function Co(e) {
    var t = Ye(), a = Te;
    if (a !== null)
      return qo(t, a, e);
    Ye(), t = t.memoizedState, a = Ye();
    var l = a.queue.dispatch;
    return a.memoizedState = e, [t, l, !1];
  }
  function Ml(e, t, a, l) {
    return e = { tag: e, create: a, deps: l, inst: t, next: null }, t = re.updateQueue, t === null && (t = _c(), re.updateQueue = t), a = t.lastEffect, a === null ? t.lastEffect = e.next = e : (l = a.next, a.next = e, e.next = l, t.lastEffect = e), e;
  }
  function Ci() {
    return { destroy: void 0, resource: void 0 };
  }
  function Ho() {
    return Ye().memoizedState;
  }
  function Hi(e, t, a, l) {
    var n = st();
    l = l === void 0 ? null : l, re.flags |= e, n.memoizedState = Ml(
      1 | t,
      Ci(),
      a,
      l
    );
  }
  function En(e, t, a, l) {
    var n = Ye();
    l = l === void 0 ? null : l;
    var i = n.memoizedState.inst;
    Te !== null && l !== null && Sc(l, Te.memoizedState.deps) ? n.memoizedState = Ml(t, i, a, l) : (re.flags |= e, n.memoizedState = Ml(
      1 | t,
      i,
      a,
      l
    ));
  }
  function Bo(e, t) {
    Hi(8390656, 8, e, t);
  }
  function ko(e, t) {
    En(2048, 8, e, t);
  }
  function Yo(e, t) {
    return En(4, 2, e, t);
  }
  function Go(e, t) {
    return En(4, 4, e, t);
  }
  function Lo(e, t) {
    if (typeof t == "function") {
      e = e();
      var a = t(e);
      return function() {
        typeof a == "function" ? a() : t(null);
      };
    }
    if (t != null)
      return e = e(), t.current = e, function() {
        t.current = null;
      };
  }
  function Xo(e, t, a) {
    a = a != null ? a.concat([e]) : null, En(4, 4, Lo.bind(null, t, e), a);
  }
  function Rc() {
  }
  function Qo(e, t) {
    var a = Ye();
    t = t === void 0 ? null : t;
    var l = a.memoizedState;
    return t !== null && Sc(t, l[1]) ? l[0] : (a.memoizedState = [e, t], e);
  }
  function Zo(e, t) {
    var a = Ye();
    t = t === void 0 ? null : t;
    var l = a.memoizedState;
    if (t !== null && Sc(t, l[1]))
      return l[0];
    if (l = e(), $a) {
      Rt(!0);
      try {
        e();
      } finally {
        Rt(!1);
      }
    }
    return a.memoizedState = [l, t], l;
  }
  function Uc(e, t, a) {
    return a === void 0 || (ba & 1073741824) !== 0 ? e.memoizedState = t : (e.memoizedState = a, e = $f(), re.lanes |= e, _a |= e, a);
  }
  function Vo(e, t, a, l) {
    return dt(a, t) ? a : _l.current !== null ? (e = Uc(e, a, l), dt(e, t) || (Ze = !0), e) : (ba & 42) === 0 ? (Ze = !0, e.memoizedState = a) : (e = $f(), re.lanes |= e, _a |= e, t);
  }
  function Ko(e, t, a, l, n) {
    var i = G.p;
    G.p = i !== 0 && 8 > i ? i : 8;
    var s = _.T, r = {};
    _.T = r, Cc(e, !1, t, a);
    try {
      var d = n(), x = _.S;
      if (x !== null && x(r, d), d !== null && typeof d == "object" && typeof d.then == "function") {
        var z = Dv(
          d,
          l
        );
        _n(
          e,
          t,
          z,
          gt(e)
        );
      } else
        _n(
          e,
          t,
          l,
          gt(e)
        );
    } catch (O) {
      _n(
        e,
        t,
        { then: function() {
        }, status: "rejected", reason: O },
        gt()
      );
    } finally {
      G.p = i, _.T = s;
    }
  }
  function Cv() {
  }
  function wc(e, t, a, l) {
    if (e.tag !== 5) throw Error(f(476));
    var n = Jo(e).queue;
    Ko(
      e,
      n,
      t,
      te,
      a === null ? Cv : function() {
        return $o(e), a(l);
      }
    );
  }
  function Jo(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: te,
      baseState: te,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: aa,
        lastRenderedState: te
      },
      next: null
    };
    var a = {};
    return t.next = {
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
    }, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
  }
  function $o(e) {
    var t = Jo(e).next.queue;
    _n(e, t, {}, gt());
  }
  function qc() {
    return et(Qn);
  }
  function Wo() {
    return Ye().memoizedState;
  }
  function Fo() {
    return Ye().memoizedState;
  }
  function Hv(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var a = gt();
          e = ga(a);
          var l = ya(t, e, a);
          l !== null && (yt(l, t, a), xn(l, t, a)), t = { cache: fc() }, e.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function Bv(e, t, a) {
    var l = gt();
    a = {
      lane: l,
      revertLane: 0,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Bi(e) ? Io(t, a) : (a = tc(e, t, a, l), a !== null && (yt(a, e, l), ef(a, t, l)));
  }
  function Po(e, t, a) {
    var l = gt();
    _n(e, t, a, l);
  }
  function _n(e, t, a, l) {
    var n = {
      lane: l,
      revertLane: 0,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Bi(e)) Io(t, n);
    else {
      var i = e.alternate;
      if (e.lanes === 0 && (i === null || i.lanes === 0) && (i = t.lastRenderedReducer, i !== null))
        try {
          var s = t.lastRenderedState, r = i(s, a);
          if (n.hasEagerState = !0, n.eagerState = r, dt(r, s))
            return Si(e, t, n, 0), Me === null && xi(), !1;
        } catch {
        } finally {
        }
      if (a = tc(e, t, n, l), a !== null)
        return yt(a, e, l), ef(a, t, l), !0;
    }
    return !1;
  }
  function Cc(e, t, a, l) {
    if (l = {
      lane: 2,
      revertLane: vs(),
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Bi(e)) {
      if (t) throw Error(f(479));
    } else
      t = tc(
        e,
        a,
        l,
        2
      ), t !== null && yt(t, e, 2);
  }
  function Bi(e) {
    var t = e.alternate;
    return e === re || t !== null && t === re;
  }
  function Io(e, t) {
    Al = Ri = !0;
    var a = e.pending;
    a === null ? t.next = t : (t.next = a.next, a.next = t), e.pending = t;
  }
  function ef(e, t, a) {
    if ((a & 4194048) !== 0) {
      var l = t.lanes;
      l &= e.pendingLanes, a |= l, t.lanes = a, Il(e, a);
    }
  }
  var ki = {
    readContext: et,
    use: wi,
    useCallback: He,
    useContext: He,
    useEffect: He,
    useImperativeHandle: He,
    useLayoutEffect: He,
    useInsertionEffect: He,
    useMemo: He,
    useReducer: He,
    useRef: He,
    useState: He,
    useDebugValue: He,
    useDeferredValue: He,
    useTransition: He,
    useSyncExternalStore: He,
    useId: He,
    useHostTransitionStatus: He,
    useFormState: He,
    useActionState: He,
    useOptimistic: He,
    useMemoCache: He,
    useCacheRefresh: He
  }, tf = {
    readContext: et,
    use: wi,
    useCallback: function(e, t) {
      return st().memoizedState = [
        e,
        t === void 0 ? null : t
      ], e;
    },
    useContext: et,
    useEffect: Bo,
    useImperativeHandle: function(e, t, a) {
      a = a != null ? a.concat([e]) : null, Hi(
        4194308,
        4,
        Lo.bind(null, t, e),
        a
      );
    },
    useLayoutEffect: function(e, t) {
      return Hi(4194308, 4, e, t);
    },
    useInsertionEffect: function(e, t) {
      Hi(4, 2, e, t);
    },
    useMemo: function(e, t) {
      var a = st();
      t = t === void 0 ? null : t;
      var l = e();
      if ($a) {
        Rt(!0);
        try {
          e();
        } finally {
          Rt(!1);
        }
      }
      return a.memoizedState = [l, t], l;
    },
    useReducer: function(e, t, a) {
      var l = st();
      if (a !== void 0) {
        var n = a(t);
        if ($a) {
          Rt(!0);
          try {
            a(t);
          } finally {
            Rt(!1);
          }
        }
      } else n = t;
      return l.memoizedState = l.baseState = n, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: n
      }, l.queue = e, e = e.dispatch = Bv.bind(
        null,
        re,
        e
      ), [l.memoizedState, e];
    },
    useRef: function(e) {
      var t = st();
      return e = { current: e }, t.memoizedState = e;
    },
    useState: function(e) {
      e = Oc(e);
      var t = e.queue, a = Po.bind(null, re, t);
      return t.dispatch = a, [e.memoizedState, a];
    },
    useDebugValue: Rc,
    useDeferredValue: function(e, t) {
      var a = st();
      return Uc(a, e, t);
    },
    useTransition: function() {
      var e = Oc(!1);
      return e = Ko.bind(
        null,
        re,
        e.queue,
        !0,
        !1
      ), st().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, t, a) {
      var l = re, n = st();
      if (pe) {
        if (a === void 0)
          throw Error(f(407));
        a = a();
      } else {
        if (a = t(), Me === null)
          throw Error(f(349));
        (ve & 124) !== 0 || jo(l, t, a);
      }
      n.memoizedState = a;
      var i = { value: a, getSnapshot: t };
      return n.queue = i, Bo(To.bind(null, l, i, e), [
        e
      ]), l.flags |= 2048, Ml(
        9,
        Ci(),
        No.bind(
          null,
          l,
          i,
          a,
          t
        ),
        null
      ), a;
    },
    useId: function() {
      var e = st(), t = Me.identifierPrefix;
      if (pe) {
        var a = It, l = Pt;
        a = (l & ~(1 << 32 - $e(l) - 1)).toString(32) + a, t = "«" + t + "R" + a, a = Ui++, 0 < a && (t += "H" + a.toString(32)), t += "»";
      } else
        a = Rv++, t = "«" + t + "r" + a.toString(32) + "»";
      return e.memoizedState = t;
    },
    useHostTransitionStatus: qc,
    useFormState: Uo,
    useActionState: Uo,
    useOptimistic: function(e) {
      var t = st();
      t.memoizedState = t.baseState = e;
      var a = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return t.queue = a, t = Cc.bind(
        null,
        re,
        !0,
        a
      ), a.dispatch = t, [e, t];
    },
    useMemoCache: Ac,
    useCacheRefresh: function() {
      return st().memoizedState = Hv.bind(
        null,
        re
      );
    }
  }, af = {
    readContext: et,
    use: wi,
    useCallback: Qo,
    useContext: et,
    useEffect: ko,
    useImperativeHandle: Xo,
    useInsertionEffect: Yo,
    useLayoutEffect: Go,
    useMemo: Zo,
    useReducer: qi,
    useRef: Ho,
    useState: function() {
      return qi(aa);
    },
    useDebugValue: Rc,
    useDeferredValue: function(e, t) {
      var a = Ye();
      return Vo(
        a,
        Te.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = qi(aa)[0], t = Ye().memoizedState;
      return [
        typeof e == "boolean" ? e : Tn(e),
        t
      ];
    },
    useSyncExternalStore: So,
    useId: Wo,
    useHostTransitionStatus: qc,
    useFormState: wo,
    useActionState: wo,
    useOptimistic: function(e, t) {
      var a = Ye();
      return Ao(a, Te, e, t);
    },
    useMemoCache: Ac,
    useCacheRefresh: Fo
  }, kv = {
    readContext: et,
    use: wi,
    useCallback: Qo,
    useContext: et,
    useEffect: ko,
    useImperativeHandle: Xo,
    useInsertionEffect: Yo,
    useLayoutEffect: Go,
    useMemo: Zo,
    useReducer: Mc,
    useRef: Ho,
    useState: function() {
      return Mc(aa);
    },
    useDebugValue: Rc,
    useDeferredValue: function(e, t) {
      var a = Ye();
      return Te === null ? Uc(a, e, t) : Vo(
        a,
        Te.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = Mc(aa)[0], t = Ye().memoizedState;
      return [
        typeof e == "boolean" ? e : Tn(e),
        t
      ];
    },
    useSyncExternalStore: So,
    useId: Wo,
    useHostTransitionStatus: qc,
    useFormState: Co,
    useActionState: Co,
    useOptimistic: function(e, t) {
      var a = Ye();
      return Te !== null ? Ao(a, Te, e, t) : (a.baseState = e, [e, a.queue.dispatch]);
    },
    useMemoCache: Ac,
    useCacheRefresh: Fo
  }, Ol = null, An = 0;
  function Yi(e) {
    var t = An;
    return An += 1, Ol === null && (Ol = []), ho(Ol, e, t);
  }
  function zn(e, t) {
    t = t.props.ref, e.ref = t !== void 0 ? t : null;
  }
  function Gi(e, t) {
    throw t.$$typeof === Y ? Error(f(525)) : (e = Object.prototype.toString.call(t), Error(
      f(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e
      )
    ));
  }
  function lf(e) {
    var t = e._init;
    return t(e._payload);
  }
  function nf(e) {
    function t(g, m) {
      if (e) {
        var y = g.deletions;
        y === null ? (g.deletions = [m], g.flags |= 16) : y.push(m);
      }
    }
    function a(g, m) {
      if (!e) return null;
      for (; m !== null; )
        t(g, m), m = m.sibling;
      return null;
    }
    function l(g) {
      for (var m = /* @__PURE__ */ new Map(); g !== null; )
        g.key !== null ? m.set(g.key, g) : m.set(g.index, g), g = g.sibling;
      return m;
    }
    function n(g, m) {
      return g = Ft(g, m), g.index = 0, g.sibling = null, g;
    }
    function i(g, m, y) {
      return g.index = y, e ? (y = g.alternate, y !== null ? (y = y.index, y < m ? (g.flags |= 67108866, m) : y) : (g.flags |= 67108866, m)) : (g.flags |= 1048576, m);
    }
    function s(g) {
      return e && g.alternate === null && (g.flags |= 67108866), g;
    }
    function r(g, m, y, M) {
      return m === null || m.tag !== 6 ? (m = lc(y, g.mode, M), m.return = g, m) : (m = n(m, y), m.return = g, m);
    }
    function d(g, m, y, M) {
      var V = y.type;
      return V === Z ? z(
        g,
        m,
        y.props.children,
        M,
        y.key
      ) : m !== null && (m.elementType === V || typeof V == "object" && V !== null && V.$$typeof === P && lf(V) === m.type) ? (m = n(m, y.props), zn(m, y), m.return = g, m) : (m = Ni(
        y.type,
        y.key,
        y.props,
        null,
        g.mode,
        M
      ), zn(m, y), m.return = g, m);
    }
    function x(g, m, y, M) {
      return m === null || m.tag !== 4 || m.stateNode.containerInfo !== y.containerInfo || m.stateNode.implementation !== y.implementation ? (m = nc(y, g.mode, M), m.return = g, m) : (m = n(m, y.children || []), m.return = g, m);
    }
    function z(g, m, y, M, V) {
      return m === null || m.tag !== 7 ? (m = Ga(
        y,
        g.mode,
        M,
        V
      ), m.return = g, m) : (m = n(m, y), m.return = g, m);
    }
    function O(g, m, y) {
      if (typeof m == "string" && m !== "" || typeof m == "number" || typeof m == "bigint")
        return m = lc(
          "" + m,
          g.mode,
          y
        ), m.return = g, m;
      if (typeof m == "object" && m !== null) {
        switch (m.$$typeof) {
          case q:
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
            var M = m._init;
            return m = M(m._payload), O(g, m, y);
        }
        if (Ce(m) || Ne(m))
          return m = Ga(
            m,
            g.mode,
            y,
            null
          ), m.return = g, m;
        if (typeof m.then == "function")
          return O(g, Yi(m), y);
        if (m.$$typeof === H)
          return O(
            g,
            Ai(g, m),
            y
          );
        Gi(g, m);
      }
      return null;
    }
    function S(g, m, y, M) {
      var V = m !== null ? m.key : null;
      if (typeof y == "string" && y !== "" || typeof y == "number" || typeof y == "bigint")
        return V !== null ? null : r(g, m, "" + y, M);
      if (typeof y == "object" && y !== null) {
        switch (y.$$typeof) {
          case q:
            return y.key === V ? d(g, m, y, M) : null;
          case B:
            return y.key === V ? x(g, m, y, M) : null;
          case P:
            return V = y._init, y = V(y._payload), S(g, m, y, M);
        }
        if (Ce(y) || Ne(y))
          return V !== null ? null : z(g, m, y, M, null);
        if (typeof y.then == "function")
          return S(
            g,
            m,
            Yi(y),
            M
          );
        if (y.$$typeof === H)
          return S(
            g,
            m,
            Ai(g, y),
            M
          );
        Gi(g, y);
      }
      return null;
    }
    function N(g, m, y, M, V) {
      if (typeof M == "string" && M !== "" || typeof M == "number" || typeof M == "bigint")
        return g = g.get(y) || null, r(m, g, "" + M, V);
      if (typeof M == "object" && M !== null) {
        switch (M.$$typeof) {
          case q:
            return g = g.get(
              M.key === null ? y : M.key
            ) || null, d(m, g, M, V);
          case B:
            return g = g.get(
              M.key === null ? y : M.key
            ) || null, x(m, g, M, V);
          case P:
            var oe = M._init;
            return M = oe(M._payload), N(
              g,
              m,
              y,
              M,
              V
            );
        }
        if (Ce(M) || Ne(M))
          return g = g.get(y) || null, z(m, g, M, V, null);
        if (typeof M.then == "function")
          return N(
            g,
            m,
            y,
            Yi(M),
            V
          );
        if (M.$$typeof === H)
          return N(
            g,
            m,
            y,
            Ai(m, M),
            V
          );
        Gi(m, M);
      }
      return null;
    }
    function ie(g, m, y, M) {
      for (var V = null, oe = null, $ = m, le = m = 0, Ke = null; $ !== null && le < y.length; le++) {
        $.index > le ? (Ke = $, $ = null) : Ke = $.sibling;
        var me = S(
          g,
          $,
          y[le],
          M
        );
        if (me === null) {
          $ === null && ($ = Ke);
          break;
        }
        e && $ && me.alternate === null && t(g, $), m = i(me, m, le), oe === null ? V = me : oe.sibling = me, oe = me, $ = Ke;
      }
      if (le === y.length)
        return a(g, $), pe && Xa(g, le), V;
      if ($ === null) {
        for (; le < y.length; le++)
          $ = O(g, y[le], M), $ !== null && (m = i(
            $,
            m,
            le
          ), oe === null ? V = $ : oe.sibling = $, oe = $);
        return pe && Xa(g, le), V;
      }
      for ($ = l($); le < y.length; le++)
        Ke = N(
          $,
          g,
          le,
          y[le],
          M
        ), Ke !== null && (e && Ke.alternate !== null && $.delete(
          Ke.key === null ? le : Ke.key
        ), m = i(
          Ke,
          m,
          le
        ), oe === null ? V = Ke : oe.sibling = Ke, oe = Ke);
      return e && $.forEach(function(qa) {
        return t(g, qa);
      }), pe && Xa(g, le), V;
    }
    function ae(g, m, y, M) {
      if (y == null) throw Error(f(151));
      for (var V = null, oe = null, $ = m, le = m = 0, Ke = null, me = y.next(); $ !== null && !me.done; le++, me = y.next()) {
        $.index > le ? (Ke = $, $ = null) : Ke = $.sibling;
        var qa = S(g, $, me.value, M);
        if (qa === null) {
          $ === null && ($ = Ke);
          break;
        }
        e && $ && qa.alternate === null && t(g, $), m = i(qa, m, le), oe === null ? V = qa : oe.sibling = qa, oe = qa, $ = Ke;
      }
      if (me.done)
        return a(g, $), pe && Xa(g, le), V;
      if ($ === null) {
        for (; !me.done; le++, me = y.next())
          me = O(g, me.value, M), me !== null && (m = i(me, m, le), oe === null ? V = me : oe.sibling = me, oe = me);
        return pe && Xa(g, le), V;
      }
      for ($ = l($); !me.done; le++, me = y.next())
        me = N($, g, le, me.value, M), me !== null && (e && me.alternate !== null && $.delete(me.key === null ? le : me.key), m = i(me, m, le), oe === null ? V = me : oe.sibling = me, oe = me);
      return e && $.forEach(function(Ym) {
        return t(g, Ym);
      }), pe && Xa(g, le), V;
    }
    function _e(g, m, y, M) {
      if (typeof y == "object" && y !== null && y.type === Z && y.key === null && (y = y.props.children), typeof y == "object" && y !== null) {
        switch (y.$$typeof) {
          case q:
            e: {
              for (var V = y.key; m !== null; ) {
                if (m.key === V) {
                  if (V = y.type, V === Z) {
                    if (m.tag === 7) {
                      a(
                        g,
                        m.sibling
                      ), M = n(
                        m,
                        y.props.children
                      ), M.return = g, g = M;
                      break e;
                    }
                  } else if (m.elementType === V || typeof V == "object" && V !== null && V.$$typeof === P && lf(V) === m.type) {
                    a(
                      g,
                      m.sibling
                    ), M = n(m, y.props), zn(M, y), M.return = g, g = M;
                    break e;
                  }
                  a(g, m);
                  break;
                } else t(g, m);
                m = m.sibling;
              }
              y.type === Z ? (M = Ga(
                y.props.children,
                g.mode,
                M,
                y.key
              ), M.return = g, g = M) : (M = Ni(
                y.type,
                y.key,
                y.props,
                null,
                g.mode,
                M
              ), zn(M, y), M.return = g, g = M);
            }
            return s(g);
          case B:
            e: {
              for (V = y.key; m !== null; ) {
                if (m.key === V)
                  if (m.tag === 4 && m.stateNode.containerInfo === y.containerInfo && m.stateNode.implementation === y.implementation) {
                    a(
                      g,
                      m.sibling
                    ), M = n(m, y.children || []), M.return = g, g = M;
                    break e;
                  } else {
                    a(g, m);
                    break;
                  }
                else t(g, m);
                m = m.sibling;
              }
              M = nc(y, g.mode, M), M.return = g, g = M;
            }
            return s(g);
          case P:
            return V = y._init, y = V(y._payload), _e(
              g,
              m,
              y,
              M
            );
        }
        if (Ce(y))
          return ie(
            g,
            m,
            y,
            M
          );
        if (Ne(y)) {
          if (V = Ne(y), typeof V != "function") throw Error(f(150));
          return y = V.call(y), ae(
            g,
            m,
            y,
            M
          );
        }
        if (typeof y.then == "function")
          return _e(
            g,
            m,
            Yi(y),
            M
          );
        if (y.$$typeof === H)
          return _e(
            g,
            m,
            Ai(g, y),
            M
          );
        Gi(g, y);
      }
      return typeof y == "string" && y !== "" || typeof y == "number" || typeof y == "bigint" ? (y = "" + y, m !== null && m.tag === 6 ? (a(g, m.sibling), M = n(m, y), M.return = g, g = M) : (a(g, m), M = lc(y, g.mode, M), M.return = g, g = M), s(g)) : a(g, m);
    }
    return function(g, m, y, M) {
      try {
        An = 0;
        var V = _e(
          g,
          m,
          y,
          M
        );
        return Ol = null, V;
      } catch ($) {
        if ($ === yn || $ === Mi) throw $;
        var oe = ht(29, $, null, g.mode);
        return oe.lanes = M, oe.return = g, oe;
      } finally {
      }
    };
  }
  var Dl = nf(!0), uf = nf(!1), At = R(null), Xt = null;
  function xa(e) {
    var t = e.alternate;
    L(Le, Le.current & 1), L(At, e), Xt === null && (t === null || _l.current !== null || t.memoizedState !== null) && (Xt = e);
  }
  function cf(e) {
    if (e.tag === 22) {
      if (L(Le, Le.current), L(At, e), Xt === null) {
        var t = e.alternate;
        t !== null && t.memoizedState !== null && (Xt = e);
      }
    } else Sa();
  }
  function Sa() {
    L(Le, Le.current), L(At, At.current);
  }
  function la(e) {
    Q(At), Xt === e && (Xt = null), Q(Le);
  }
  var Le = R(0);
  function Li(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var a = t.memoizedState;
        if (a !== null && (a = a.dehydrated, a === null || a.data === "$?" || _s(a)))
          return t;
      } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
        if ((t.flags & 128) !== 0) return t;
      } else if (t.child !== null) {
        t.child.return = t, t = t.child;
        continue;
      }
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return null;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
    return null;
  }
  function Hc(e, t, a, l) {
    t = e.memoizedState, a = a(l, t), a = a == null ? t : U({}, t, a), e.memoizedState = a, e.lanes === 0 && (e.updateQueue.baseState = a);
  }
  var Bc = {
    enqueueSetState: function(e, t, a) {
      e = e._reactInternals;
      var l = gt(), n = ga(l);
      n.payload = t, a != null && (n.callback = a), t = ya(e, n, l), t !== null && (yt(t, e, l), xn(t, e, l));
    },
    enqueueReplaceState: function(e, t, a) {
      e = e._reactInternals;
      var l = gt(), n = ga(l);
      n.tag = 1, n.payload = t, a != null && (n.callback = a), t = ya(e, n, l), t !== null && (yt(t, e, l), xn(t, e, l));
    },
    enqueueForceUpdate: function(e, t) {
      e = e._reactInternals;
      var a = gt(), l = ga(a);
      l.tag = 2, t != null && (l.callback = t), t = ya(e, l, a), t !== null && (yt(t, e, a), xn(t, e, a));
    }
  };
  function sf(e, t, a, l, n, i, s) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(l, i, s) : t.prototype && t.prototype.isPureReactComponent ? !on(a, l) || !on(n, i) : !0;
  }
  function rf(e, t, a, l) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(a, l), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(a, l), t.state !== e && Bc.enqueueReplaceState(t, t.state, null);
  }
  function Wa(e, t) {
    var a = t;
    if ("ref" in t) {
      a = {};
      for (var l in t)
        l !== "ref" && (a[l] = t[l]);
    }
    if (e = e.defaultProps) {
      a === t && (a = U({}, a));
      for (var n in e)
        a[n] === void 0 && (a[n] = e[n]);
    }
    return a;
  }
  var Xi = typeof reportError == "function" ? reportError : function(e) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var t = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof e == "object" && e !== null && typeof e.message == "string" ? String(e.message) : String(e),
        error: e
      });
      if (!window.dispatchEvent(t)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", e);
      return;
    }
    console.error(e);
  };
  function of(e) {
    Xi(e);
  }
  function ff(e) {
    console.error(e);
  }
  function df(e) {
    Xi(e);
  }
  function Qi(e, t) {
    try {
      var a = e.onUncaughtError;
      a(t.value, { componentStack: t.stack });
    } catch (l) {
      setTimeout(function() {
        throw l;
      });
    }
  }
  function hf(e, t, a) {
    try {
      var l = e.onCaughtError;
      l(a.value, {
        componentStack: a.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null
      });
    } catch (n) {
      setTimeout(function() {
        throw n;
      });
    }
  }
  function kc(e, t, a) {
    return a = ga(a), a.tag = 3, a.payload = { element: null }, a.callback = function() {
      Qi(e, t);
    }, a;
  }
  function vf(e) {
    return e = ga(e), e.tag = 3, e;
  }
  function mf(e, t, a, l) {
    var n = a.type.getDerivedStateFromError;
    if (typeof n == "function") {
      var i = l.value;
      e.payload = function() {
        return n(i);
      }, e.callback = function() {
        hf(t, a, l);
      };
    }
    var s = a.stateNode;
    s !== null && typeof s.componentDidCatch == "function" && (e.callback = function() {
      hf(t, a, l), typeof n != "function" && (Aa === null ? Aa = /* @__PURE__ */ new Set([this]) : Aa.add(this));
      var r = l.stack;
      this.componentDidCatch(l.value, {
        componentStack: r !== null ? r : ""
      });
    });
  }
  function Yv(e, t, a, l, n) {
    if (a.flags |= 32768, l !== null && typeof l == "object" && typeof l.then == "function") {
      if (t = a.alternate, t !== null && mn(
        t,
        a,
        n,
        !0
      ), a = At.current, a !== null) {
        switch (a.tag) {
          case 13:
            return Xt === null ? rs() : a.alternate === null && qe === 0 && (qe = 3), a.flags &= -257, a.flags |= 65536, a.lanes = n, l === vc ? a.flags |= 16384 : (t = a.updateQueue, t === null ? a.updateQueue = /* @__PURE__ */ new Set([l]) : t.add(l), fs(e, l, n)), !1;
          case 22:
            return a.flags |= 65536, l === vc ? a.flags |= 16384 : (t = a.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([l])
            }, a.updateQueue = t) : (a = t.retryQueue, a === null ? t.retryQueue = /* @__PURE__ */ new Set([l]) : a.add(l)), fs(e, l, n)), !1;
        }
        throw Error(f(435, a.tag));
      }
      return fs(e, l, n), rs(), !1;
    }
    if (pe)
      return t = At.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = n, l !== cc && (e = Error(f(422), { cause: l }), vn(Nt(e, a)))) : (l !== cc && (t = Error(f(423), {
        cause: l
      }), vn(
        Nt(t, a)
      )), e = e.current.alternate, e.flags |= 65536, n &= -n, e.lanes |= n, l = Nt(l, a), n = kc(
        e.stateNode,
        l,
        n
      ), gc(e, n), qe !== 4 && (qe = 2)), !1;
    var i = Error(f(520), { cause: l });
    if (i = Nt(i, a), qn === null ? qn = [i] : qn.push(i), qe !== 4 && (qe = 2), t === null) return !0;
    l = Nt(l, a), a = t;
    do {
      switch (a.tag) {
        case 3:
          return a.flags |= 65536, e = n & -n, a.lanes |= e, e = kc(a.stateNode, l, e), gc(a, e), !1;
        case 1:
          if (t = a.type, i = a.stateNode, (a.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || i !== null && typeof i.componentDidCatch == "function" && (Aa === null || !Aa.has(i))))
            return a.flags |= 65536, n &= -n, a.lanes |= n, n = vf(n), mf(
              n,
              e,
              a,
              l
            ), gc(a, n), !1;
      }
      a = a.return;
    } while (a !== null);
    return !1;
  }
  var pf = Error(f(461)), Ze = !1;
  function We(e, t, a, l) {
    t.child = e === null ? uf(t, null, a, l) : Dl(
      t,
      e.child,
      a,
      l
    );
  }
  function gf(e, t, a, l, n) {
    a = a.render;
    var i = t.ref;
    if ("ref" in l) {
      var s = {};
      for (var r in l)
        r !== "ref" && (s[r] = l[r]);
    } else s = l;
    return Ka(t), l = jc(
      e,
      t,
      a,
      s,
      i,
      n
    ), r = Nc(), e !== null && !Ze ? (Tc(e, t, n), na(e, t, n)) : (pe && r && ic(t), t.flags |= 1, We(e, t, l, n), t.child);
  }
  function yf(e, t, a, l, n) {
    if (e === null) {
      var i = a.type;
      return typeof i == "function" && !ac(i) && i.defaultProps === void 0 && a.compare === null ? (t.tag = 15, t.type = i, bf(
        e,
        t,
        i,
        l,
        n
      )) : (e = Ni(
        a.type,
        null,
        l,
        t,
        t.mode,
        n
      ), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (i = e.child, !Kc(e, n)) {
      var s = i.memoizedProps;
      if (a = a.compare, a = a !== null ? a : on, a(s, l) && e.ref === t.ref)
        return na(e, t, n);
    }
    return t.flags |= 1, e = Ft(i, l), e.ref = t.ref, e.return = t, t.child = e;
  }
  function bf(e, t, a, l, n) {
    if (e !== null) {
      var i = e.memoizedProps;
      if (on(i, l) && e.ref === t.ref)
        if (Ze = !1, t.pendingProps = l = i, Kc(e, n))
          (e.flags & 131072) !== 0 && (Ze = !0);
        else
          return t.lanes = e.lanes, na(e, t, n);
    }
    return Yc(
      e,
      t,
      a,
      l,
      n
    );
  }
  function xf(e, t, a) {
    var l = t.pendingProps, n = l.children, i = e !== null ? e.memoizedState : null;
    if (l.mode === "hidden") {
      if ((t.flags & 128) !== 0) {
        if (l = i !== null ? i.baseLanes | a : a, e !== null) {
          for (n = t.child = e.child, i = 0; n !== null; )
            i = i | n.lanes | n.childLanes, n = n.sibling;
          t.childLanes = i & ~l;
        } else t.childLanes = 0, t.child = null;
        return Sf(
          e,
          t,
          l,
          a
        );
      }
      if ((a & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && zi(
          t,
          i !== null ? i.cachePool : null
        ), i !== null ? yo(t, i) : bc(), cf(t);
      else
        return t.lanes = t.childLanes = 536870912, Sf(
          e,
          t,
          i !== null ? i.baseLanes | a : a,
          a
        );
    } else
      i !== null ? (zi(t, i.cachePool), yo(t, i), Sa(), t.memoizedState = null) : (e !== null && zi(t, null), bc(), Sa());
    return We(e, t, n, a), t.child;
  }
  function Sf(e, t, a, l) {
    var n = hc();
    return n = n === null ? null : { parent: Ge._currentValue, pool: n }, t.memoizedState = {
      baseLanes: a,
      cachePool: n
    }, e !== null && zi(t, null), bc(), cf(t), e !== null && mn(e, t, l, !0), null;
  }
  function Zi(e, t) {
    var a = t.ref;
    if (a === null)
      e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof a != "function" && typeof a != "object")
        throw Error(f(284));
      (e === null || e.ref !== a) && (t.flags |= 4194816);
    }
  }
  function Yc(e, t, a, l, n) {
    return Ka(t), a = jc(
      e,
      t,
      a,
      l,
      void 0,
      n
    ), l = Nc(), e !== null && !Ze ? (Tc(e, t, n), na(e, t, n)) : (pe && l && ic(t), t.flags |= 1, We(e, t, a, n), t.child);
  }
  function jf(e, t, a, l, n, i) {
    return Ka(t), t.updateQueue = null, a = xo(
      t,
      l,
      a,
      n
    ), bo(e), l = Nc(), e !== null && !Ze ? (Tc(e, t, i), na(e, t, i)) : (pe && l && ic(t), t.flags |= 1, We(e, t, a, i), t.child);
  }
  function Nf(e, t, a, l, n) {
    if (Ka(t), t.stateNode === null) {
      var i = Sl, s = a.contextType;
      typeof s == "object" && s !== null && (i = et(s)), i = new a(l, i), t.memoizedState = i.state !== null && i.state !== void 0 ? i.state : null, i.updater = Bc, t.stateNode = i, i._reactInternals = t, i = t.stateNode, i.props = l, i.state = t.memoizedState, i.refs = {}, mc(t), s = a.contextType, i.context = typeof s == "object" && s !== null ? et(s) : Sl, i.state = t.memoizedState, s = a.getDerivedStateFromProps, typeof s == "function" && (Hc(
        t,
        a,
        s,
        l
      ), i.state = t.memoizedState), typeof a.getDerivedStateFromProps == "function" || typeof i.getSnapshotBeforeUpdate == "function" || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (s = i.state, typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount(), s !== i.state && Bc.enqueueReplaceState(i, i.state, null), jn(t, l, i, n), Sn(), i.state = t.memoizedState), typeof i.componentDidMount == "function" && (t.flags |= 4194308), l = !0;
    } else if (e === null) {
      i = t.stateNode;
      var r = t.memoizedProps, d = Wa(a, r);
      i.props = d;
      var x = i.context, z = a.contextType;
      s = Sl, typeof z == "object" && z !== null && (s = et(z));
      var O = a.getDerivedStateFromProps;
      z = typeof O == "function" || typeof i.getSnapshotBeforeUpdate == "function", r = t.pendingProps !== r, z || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (r || x !== s) && rf(
        t,
        i,
        l,
        s
      ), pa = !1;
      var S = t.memoizedState;
      i.state = S, jn(t, l, i, n), Sn(), x = t.memoizedState, r || S !== x || pa ? (typeof O == "function" && (Hc(
        t,
        a,
        O,
        l
      ), x = t.memoizedState), (d = pa || sf(
        t,
        a,
        d,
        l,
        S,
        x,
        s
      )) ? (z || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount()), typeof i.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = l, t.memoizedState = x), i.props = l, i.state = x, i.context = s, l = d) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308), l = !1);
    } else {
      i = t.stateNode, pc(e, t), s = t.memoizedProps, z = Wa(a, s), i.props = z, O = t.pendingProps, S = i.context, x = a.contextType, d = Sl, typeof x == "object" && x !== null && (d = et(x)), r = a.getDerivedStateFromProps, (x = typeof r == "function" || typeof i.getSnapshotBeforeUpdate == "function") || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (s !== O || S !== d) && rf(
        t,
        i,
        l,
        d
      ), pa = !1, S = t.memoizedState, i.state = S, jn(t, l, i, n), Sn();
      var N = t.memoizedState;
      s !== O || S !== N || pa || e !== null && e.dependencies !== null && _i(e.dependencies) ? (typeof r == "function" && (Hc(
        t,
        a,
        r,
        l
      ), N = t.memoizedState), (z = pa || sf(
        t,
        a,
        z,
        l,
        S,
        N,
        d
      ) || e !== null && e.dependencies !== null && _i(e.dependencies)) ? (x || typeof i.UNSAFE_componentWillUpdate != "function" && typeof i.componentWillUpdate != "function" || (typeof i.componentWillUpdate == "function" && i.componentWillUpdate(l, N, d), typeof i.UNSAFE_componentWillUpdate == "function" && i.UNSAFE_componentWillUpdate(
        l,
        N,
        d
      )), typeof i.componentDidUpdate == "function" && (t.flags |= 4), typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof i.componentDidUpdate != "function" || s === e.memoizedProps && S === e.memoizedState || (t.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || s === e.memoizedProps && S === e.memoizedState || (t.flags |= 1024), t.memoizedProps = l, t.memoizedState = N), i.props = l, i.state = N, i.context = d, l = z) : (typeof i.componentDidUpdate != "function" || s === e.memoizedProps && S === e.memoizedState || (t.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || s === e.memoizedProps && S === e.memoizedState || (t.flags |= 1024), l = !1);
    }
    return i = l, Zi(e, t), l = (t.flags & 128) !== 0, i || l ? (i = t.stateNode, a = l && typeof a.getDerivedStateFromError != "function" ? null : i.render(), t.flags |= 1, e !== null && l ? (t.child = Dl(
      t,
      e.child,
      null,
      n
    ), t.child = Dl(
      t,
      null,
      a,
      n
    )) : We(e, t, a, n), t.memoizedState = i.state, e = t.child) : e = na(
      e,
      t,
      n
    ), e;
  }
  function Tf(e, t, a, l) {
    return hn(), t.flags |= 256, We(e, t, a, l), t.child;
  }
  var Gc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Lc(e) {
    return { baseLanes: e, cachePool: ro() };
  }
  function Xc(e, t, a) {
    return e = e !== null ? e.childLanes & ~a : 0, t && (e |= zt), e;
  }
  function Ef(e, t, a) {
    var l = t.pendingProps, n = !1, i = (t.flags & 128) !== 0, s;
    if ((s = i) || (s = e !== null && e.memoizedState === null ? !1 : (Le.current & 2) !== 0), s && (n = !0, t.flags &= -129), s = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
      if (pe) {
        if (n ? xa(t) : Sa(), pe) {
          var r = we, d;
          if (d = r) {
            e: {
              for (d = r, r = Lt; d.nodeType !== 8; ) {
                if (!r) {
                  r = null;
                  break e;
                }
                if (d = Ct(
                  d.nextSibling
                ), d === null) {
                  r = null;
                  break e;
                }
              }
              r = d;
            }
            r !== null ? (t.memoizedState = {
              dehydrated: r,
              treeContext: La !== null ? { id: Pt, overflow: It } : null,
              retryLane: 536870912,
              hydrationErrors: null
            }, d = ht(
              18,
              null,
              null,
              0
            ), d.stateNode = r, d.return = t, t.child = d, lt = t, we = null, d = !0) : d = !1;
          }
          d || Za(t);
        }
        if (r = t.memoizedState, r !== null && (r = r.dehydrated, r !== null))
          return _s(r) ? t.lanes = 32 : t.lanes = 536870912, null;
        la(t);
      }
      return r = l.children, l = l.fallback, n ? (Sa(), n = t.mode, r = Vi(
        { mode: "hidden", children: r },
        n
      ), l = Ga(
        l,
        n,
        a,
        null
      ), r.return = t, l.return = t, r.sibling = l, t.child = r, n = t.child, n.memoizedState = Lc(a), n.childLanes = Xc(
        e,
        s,
        a
      ), t.memoizedState = Gc, l) : (xa(t), Qc(t, r));
    }
    if (d = e.memoizedState, d !== null && (r = d.dehydrated, r !== null)) {
      if (i)
        t.flags & 256 ? (xa(t), t.flags &= -257, t = Zc(
          e,
          t,
          a
        )) : t.memoizedState !== null ? (Sa(), t.child = e.child, t.flags |= 128, t = null) : (Sa(), n = l.fallback, r = t.mode, l = Vi(
          { mode: "visible", children: l.children },
          r
        ), n = Ga(
          n,
          r,
          a,
          null
        ), n.flags |= 2, l.return = t, n.return = t, l.sibling = n, t.child = l, Dl(
          t,
          e.child,
          null,
          a
        ), l = t.child, l.memoizedState = Lc(a), l.childLanes = Xc(
          e,
          s,
          a
        ), t.memoizedState = Gc, t = n);
      else if (xa(t), _s(r)) {
        if (s = r.nextSibling && r.nextSibling.dataset, s) var x = s.dgst;
        s = x, l = Error(f(419)), l.stack = "", l.digest = s, vn({ value: l, source: null, stack: null }), t = Zc(
          e,
          t,
          a
        );
      } else if (Ze || mn(e, t, a, !1), s = (a & e.childLanes) !== 0, Ze || s) {
        if (s = Me, s !== null && (l = a & -a, l = (l & 42) !== 0 ? 1 : ul(l), l = (l & (s.suspendedLanes | a)) !== 0 ? 0 : l, l !== 0 && l !== d.retryLane))
          throw d.retryLane = l, xl(e, l), yt(s, e, l), pf;
        r.data === "$?" || rs(), t = Zc(
          e,
          t,
          a
        );
      } else
        r.data === "$?" ? (t.flags |= 192, t.child = e.child, t = null) : (e = d.treeContext, we = Ct(
          r.nextSibling
        ), lt = t, pe = !0, Qa = null, Lt = !1, e !== null && (Et[_t++] = Pt, Et[_t++] = It, Et[_t++] = La, Pt = e.id, It = e.overflow, La = t), t = Qc(
          t,
          l.children
        ), t.flags |= 4096);
      return t;
    }
    return n ? (Sa(), n = l.fallback, r = t.mode, d = e.child, x = d.sibling, l = Ft(d, {
      mode: "hidden",
      children: l.children
    }), l.subtreeFlags = d.subtreeFlags & 65011712, x !== null ? n = Ft(x, n) : (n = Ga(
      n,
      r,
      a,
      null
    ), n.flags |= 2), n.return = t, l.return = t, l.sibling = n, t.child = l, l = n, n = t.child, r = e.child.memoizedState, r === null ? r = Lc(a) : (d = r.cachePool, d !== null ? (x = Ge._currentValue, d = d.parent !== x ? { parent: x, pool: x } : d) : d = ro(), r = {
      baseLanes: r.baseLanes | a,
      cachePool: d
    }), n.memoizedState = r, n.childLanes = Xc(
      e,
      s,
      a
    ), t.memoizedState = Gc, l) : (xa(t), a = e.child, e = a.sibling, a = Ft(a, {
      mode: "visible",
      children: l.children
    }), a.return = t, a.sibling = null, e !== null && (s = t.deletions, s === null ? (t.deletions = [e], t.flags |= 16) : s.push(e)), t.child = a, t.memoizedState = null, a);
  }
  function Qc(e, t) {
    return t = Vi(
      { mode: "visible", children: t },
      e.mode
    ), t.return = e, e.child = t;
  }
  function Vi(e, t) {
    return e = ht(22, e, null, t), e.lanes = 0, e.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }, e;
  }
  function Zc(e, t, a) {
    return Dl(t, e.child, null, a), e = Qc(
      t,
      t.pendingProps.children
    ), e.flags |= 2, t.memoizedState = null, e;
  }
  function _f(e, t, a) {
    e.lanes |= t;
    var l = e.alternate;
    l !== null && (l.lanes |= t), rc(e.return, t, a);
  }
  function Vc(e, t, a, l, n) {
    var i = e.memoizedState;
    i === null ? e.memoizedState = {
      isBackwards: t,
      rendering: null,
      renderingStartTime: 0,
      last: l,
      tail: a,
      tailMode: n
    } : (i.isBackwards = t, i.rendering = null, i.renderingStartTime = 0, i.last = l, i.tail = a, i.tailMode = n);
  }
  function Af(e, t, a) {
    var l = t.pendingProps, n = l.revealOrder, i = l.tail;
    if (We(e, t, l.children, a), l = Le.current, (l & 2) !== 0)
      l = l & 1 | 2, t.flags |= 128;
    else {
      if (e !== null && (e.flags & 128) !== 0)
        e: for (e = t.child; e !== null; ) {
          if (e.tag === 13)
            e.memoizedState !== null && _f(e, a, t);
          else if (e.tag === 19)
            _f(e, a, t);
          else if (e.child !== null) {
            e.child.return = e, e = e.child;
            continue;
          }
          if (e === t) break e;
          for (; e.sibling === null; ) {
            if (e.return === null || e.return === t)
              break e;
            e = e.return;
          }
          e.sibling.return = e.return, e = e.sibling;
        }
      l &= 1;
    }
    switch (L(Le, l), n) {
      case "forwards":
        for (a = t.child, n = null; a !== null; )
          e = a.alternate, e !== null && Li(e) === null && (n = a), a = a.sibling;
        a = n, a === null ? (n = t.child, t.child = null) : (n = a.sibling, a.sibling = null), Vc(
          t,
          !1,
          n,
          a,
          i
        );
        break;
      case "backwards":
        for (a = null, n = t.child, t.child = null; n !== null; ) {
          if (e = n.alternate, e !== null && Li(e) === null) {
            t.child = n;
            break;
          }
          e = n.sibling, n.sibling = a, a = n, n = e;
        }
        Vc(
          t,
          !0,
          a,
          null,
          i
        );
        break;
      case "together":
        Vc(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function na(e, t, a) {
    if (e !== null && (t.dependencies = e.dependencies), _a |= t.lanes, (a & t.childLanes) === 0)
      if (e !== null) {
        if (mn(
          e,
          t,
          a,
          !1
        ), (a & t.childLanes) === 0)
          return null;
      } else return null;
    if (e !== null && t.child !== e.child)
      throw Error(f(153));
    if (t.child !== null) {
      for (e = t.child, a = Ft(e, e.pendingProps), t.child = a, a.return = t; e.sibling !== null; )
        e = e.sibling, a = a.sibling = Ft(e, e.pendingProps), a.return = t;
      a.sibling = null;
    }
    return t.child;
  }
  function Kc(e, t) {
    return (e.lanes & t) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && _i(e)));
  }
  function Gv(e, t, a) {
    switch (t.tag) {
      case 3:
        ye(t, t.stateNode.containerInfo), ma(t, Ge, e.memoizedState.cache), hn();
        break;
      case 27:
      case 5:
        el(t);
        break;
      case 4:
        ye(t, t.stateNode.containerInfo);
        break;
      case 10:
        ma(
          t,
          t.type,
          t.memoizedProps.value
        );
        break;
      case 13:
        var l = t.memoizedState;
        if (l !== null)
          return l.dehydrated !== null ? (xa(t), t.flags |= 128, null) : (a & t.child.childLanes) !== 0 ? Ef(e, t, a) : (xa(t), e = na(
            e,
            t,
            a
          ), e !== null ? e.sibling : null);
        xa(t);
        break;
      case 19:
        var n = (e.flags & 128) !== 0;
        if (l = (a & t.childLanes) !== 0, l || (mn(
          e,
          t,
          a,
          !1
        ), l = (a & t.childLanes) !== 0), n) {
          if (l)
            return Af(
              e,
              t,
              a
            );
          t.flags |= 128;
        }
        if (n = t.memoizedState, n !== null && (n.rendering = null, n.tail = null, n.lastEffect = null), L(Le, Le.current), l) break;
        return null;
      case 22:
      case 23:
        return t.lanes = 0, xf(e, t, a);
      case 24:
        ma(t, Ge, e.memoizedState.cache);
    }
    return na(e, t, a);
  }
  function zf(e, t, a) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps)
        Ze = !0;
      else {
        if (!Kc(e, a) && (t.flags & 128) === 0)
          return Ze = !1, Gv(
            e,
            t,
            a
          );
        Ze = (e.flags & 131072) !== 0;
      }
    else
      Ze = !1, pe && (t.flags & 1048576) !== 0 && ao(t, Ei, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        e: {
          e = t.pendingProps;
          var l = t.elementType, n = l._init;
          if (l = n(l._payload), t.type = l, typeof l == "function")
            ac(l) ? (e = Wa(l, e), t.tag = 1, t = Nf(
              null,
              t,
              l,
              e,
              a
            )) : (t.tag = 0, t = Yc(
              null,
              t,
              l,
              e,
              a
            ));
          else {
            if (l != null) {
              if (n = l.$$typeof, n === W) {
                t.tag = 11, t = gf(
                  null,
                  t,
                  l,
                  e,
                  a
                );
                break e;
              } else if (n === C) {
                t.tag = 14, t = yf(
                  null,
                  t,
                  l,
                  e,
                  a
                );
                break e;
              }
            }
            throw t = Dt(l) || l, Error(f(306, t, ""));
          }
        }
        return t;
      case 0:
        return Yc(
          e,
          t,
          t.type,
          t.pendingProps,
          a
        );
      case 1:
        return l = t.type, n = Wa(
          l,
          t.pendingProps
        ), Nf(
          e,
          t,
          l,
          n,
          a
        );
      case 3:
        e: {
          if (ye(
            t,
            t.stateNode.containerInfo
          ), e === null) throw Error(f(387));
          l = t.pendingProps;
          var i = t.memoizedState;
          n = i.element, pc(e, t), jn(t, l, null, a);
          var s = t.memoizedState;
          if (l = s.cache, ma(t, Ge, l), l !== i.cache && oc(
            t,
            [Ge],
            a,
            !0
          ), Sn(), l = s.element, i.isDehydrated)
            if (i = {
              element: l,
              isDehydrated: !1,
              cache: s.cache
            }, t.updateQueue.baseState = i, t.memoizedState = i, t.flags & 256) {
              t = Tf(
                e,
                t,
                l,
                a
              );
              break e;
            } else if (l !== n) {
              n = Nt(
                Error(f(424)),
                t
              ), vn(n), t = Tf(
                e,
                t,
                l,
                a
              );
              break e;
            } else {
              switch (e = t.stateNode.containerInfo, e.nodeType) {
                case 9:
                  e = e.body;
                  break;
                default:
                  e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
              }
              for (we = Ct(e.firstChild), lt = t, pe = !0, Qa = null, Lt = !0, a = uf(
                t,
                null,
                l,
                a
              ), t.child = a; a; )
                a.flags = a.flags & -3 | 4096, a = a.sibling;
            }
          else {
            if (hn(), l === n) {
              t = na(
                e,
                t,
                a
              );
              break e;
            }
            We(
              e,
              t,
              l,
              a
            );
          }
          t = t.child;
        }
        return t;
      case 26:
        return Zi(e, t), e === null ? (a = Rd(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = a : pe || (a = t.type, e = t.pendingProps, l = uu(
          K.current
        ).createElement(a), l[Oe] = t, l[Xe] = e, Pe(l, a, e), Qe(l), t.stateNode = l) : t.memoizedState = Rd(
          t.type,
          e.memoizedProps,
          t.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return el(t), e === null && pe && (l = t.stateNode = Md(
          t.type,
          t.pendingProps,
          K.current
        ), lt = t, Lt = !0, n = we, Oa(t.type) ? (As = n, we = Ct(
          l.firstChild
        )) : we = n), We(
          e,
          t,
          t.pendingProps.children,
          a
        ), Zi(e, t), e === null && (t.flags |= 4194304), t.child;
      case 5:
        return e === null && pe && ((n = l = we) && (l = mm(
          l,
          t.type,
          t.pendingProps,
          Lt
        ), l !== null ? (t.stateNode = l, lt = t, we = Ct(
          l.firstChild
        ), Lt = !1, n = !0) : n = !1), n || Za(t)), el(t), n = t.type, i = t.pendingProps, s = e !== null ? e.memoizedProps : null, l = i.children, Ns(n, i) ? l = null : s !== null && Ns(n, s) && (t.flags |= 32), t.memoizedState !== null && (n = jc(
          e,
          t,
          Uv,
          null,
          null,
          a
        ), Qn._currentValue = n), Zi(e, t), We(e, t, l, a), t.child;
      case 6:
        return e === null && pe && ((e = a = we) && (a = pm(
          a,
          t.pendingProps,
          Lt
        ), a !== null ? (t.stateNode = a, lt = t, we = null, e = !0) : e = !1), e || Za(t)), null;
      case 13:
        return Ef(e, t, a);
      case 4:
        return ye(
          t,
          t.stateNode.containerInfo
        ), l = t.pendingProps, e === null ? t.child = Dl(
          t,
          null,
          l,
          a
        ) : We(
          e,
          t,
          l,
          a
        ), t.child;
      case 11:
        return gf(
          e,
          t,
          t.type,
          t.pendingProps,
          a
        );
      case 7:
        return We(
          e,
          t,
          t.pendingProps,
          a
        ), t.child;
      case 8:
        return We(
          e,
          t,
          t.pendingProps.children,
          a
        ), t.child;
      case 12:
        return We(
          e,
          t,
          t.pendingProps.children,
          a
        ), t.child;
      case 10:
        return l = t.pendingProps, ma(t, t.type, l.value), We(
          e,
          t,
          l.children,
          a
        ), t.child;
      case 9:
        return n = t.type._context, l = t.pendingProps.children, Ka(t), n = et(n), l = l(n), t.flags |= 1, We(e, t, l, a), t.child;
      case 14:
        return yf(
          e,
          t,
          t.type,
          t.pendingProps,
          a
        );
      case 15:
        return bf(
          e,
          t,
          t.type,
          t.pendingProps,
          a
        );
      case 19:
        return Af(e, t, a);
      case 31:
        return l = t.pendingProps, a = t.mode, l = {
          mode: l.mode,
          children: l.children
        }, e === null ? (a = Vi(
          l,
          a
        ), a.ref = t.ref, t.child = a, a.return = t, t = a) : (a = Ft(e.child, l), a.ref = t.ref, t.child = a, a.return = t, t = a), t;
      case 22:
        return xf(e, t, a);
      case 24:
        return Ka(t), l = et(Ge), e === null ? (n = hc(), n === null && (n = Me, i = fc(), n.pooledCache = i, i.refCount++, i !== null && (n.pooledCacheLanes |= a), n = i), t.memoizedState = {
          parent: l,
          cache: n
        }, mc(t), ma(t, Ge, n)) : ((e.lanes & a) !== 0 && (pc(e, t), jn(t, null, null, a), Sn()), n = e.memoizedState, i = t.memoizedState, n.parent !== l ? (n = { parent: l, cache: l }, t.memoizedState = n, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = n), ma(t, Ge, l)) : (l = i.cache, ma(t, Ge, l), l !== n.cache && oc(
          t,
          [Ge],
          a,
          !0
        ))), We(
          e,
          t,
          t.pendingProps.children,
          a
        ), t.child;
      case 29:
        throw t.pendingProps;
    }
    throw Error(f(156, t.tag));
  }
  function ia(e) {
    e.flags |= 4;
  }
  function Mf(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !Hd(t)) {
      if (t = At.current, t !== null && ((ve & 4194048) === ve ? Xt !== null : (ve & 62914560) !== ve && (ve & 536870912) === 0 || t !== Xt))
        throw bn = vc, oo;
      e.flags |= 8192;
    }
  }
  function Ki(e, t) {
    t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? Fl() : 536870912, e.lanes |= t, ql |= t);
  }
  function Mn(e, t) {
    if (!pe)
      switch (e.tailMode) {
        case "hidden":
          t = e.tail;
          for (var a = null; t !== null; )
            t.alternate !== null && (a = t), t = t.sibling;
          a === null ? e.tail = null : a.sibling = null;
          break;
        case "collapsed":
          a = e.tail;
          for (var l = null; a !== null; )
            a.alternate !== null && (l = a), a = a.sibling;
          l === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : l.sibling = null;
      }
  }
  function Ue(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, a = 0, l = 0;
    if (t)
      for (var n = e.child; n !== null; )
        a |= n.lanes | n.childLanes, l |= n.subtreeFlags & 65011712, l |= n.flags & 65011712, n.return = e, n = n.sibling;
    else
      for (n = e.child; n !== null; )
        a |= n.lanes | n.childLanes, l |= n.subtreeFlags, l |= n.flags, n.return = e, n = n.sibling;
    return e.subtreeFlags |= l, e.childLanes = a, t;
  }
  function Lv(e, t, a) {
    var l = t.pendingProps;
    switch (uc(t), t.tag) {
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
        return Ue(t), null;
      case 1:
        return Ue(t), null;
      case 3:
        return a = t.stateNode, l = null, e !== null && (l = e.memoizedState.cache), t.memoizedState.cache !== l && (t.flags |= 2048), ta(Ge), nt(), a.pendingContext && (a.context = a.pendingContext, a.pendingContext = null), (e === null || e.child === null) && (dn(t) ? ia(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, io())), Ue(t), null;
      case 26:
        return a = t.memoizedState, e === null ? (ia(t), a !== null ? (Ue(t), Mf(t, a)) : (Ue(t), t.flags &= -16777217)) : a ? a !== e.memoizedState ? (ia(t), Ue(t), Mf(t, a)) : (Ue(t), t.flags &= -16777217) : (e.memoizedProps !== l && ia(t), Ue(t), t.flags &= -16777217), null;
      case 27:
        kt(t), a = K.current;
        var n = t.type;
        if (e !== null && t.stateNode != null)
          e.memoizedProps !== l && ia(t);
        else {
          if (!l) {
            if (t.stateNode === null)
              throw Error(f(166));
            return Ue(t), null;
          }
          e = J.current, dn(t) ? lo(t) : (e = Md(n, l, a), t.stateNode = e, ia(t));
        }
        return Ue(t), null;
      case 5:
        if (kt(t), a = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== l && ia(t);
        else {
          if (!l) {
            if (t.stateNode === null)
              throw Error(f(166));
            return Ue(t), null;
          }
          if (e = J.current, dn(t))
            lo(t);
          else {
            switch (n = uu(
              K.current
            ), e) {
              case 1:
                e = n.createElementNS(
                  "http://www.w3.org/2000/svg",
                  a
                );
                break;
              case 2:
                e = n.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  a
                );
                break;
              default:
                switch (a) {
                  case "svg":
                    e = n.createElementNS(
                      "http://www.w3.org/2000/svg",
                      a
                    );
                    break;
                  case "math":
                    e = n.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      a
                    );
                    break;
                  case "script":
                    e = n.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild);
                    break;
                  case "select":
                    e = typeof l.is == "string" ? n.createElement("select", { is: l.is }) : n.createElement("select"), l.multiple ? e.multiple = !0 : l.size && (e.size = l.size);
                    break;
                  default:
                    e = typeof l.is == "string" ? n.createElement(a, { is: l.is }) : n.createElement(a);
                }
            }
            e[Oe] = t, e[Xe] = l;
            e: for (n = t.child; n !== null; ) {
              if (n.tag === 5 || n.tag === 6)
                e.appendChild(n.stateNode);
              else if (n.tag !== 4 && n.tag !== 27 && n.child !== null) {
                n.child.return = n, n = n.child;
                continue;
              }
              if (n === t) break e;
              for (; n.sibling === null; ) {
                if (n.return === null || n.return === t)
                  break e;
                n = n.return;
              }
              n.sibling.return = n.return, n = n.sibling;
            }
            t.stateNode = e;
            e: switch (Pe(e, a, l), a) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                e = !!l.autoFocus;
                break e;
              case "img":
                e = !0;
                break e;
              default:
                e = !1;
            }
            e && ia(t);
          }
        }
        return Ue(t), t.flags &= -16777217, null;
      case 6:
        if (e && t.stateNode != null)
          e.memoizedProps !== l && ia(t);
        else {
          if (typeof l != "string" && t.stateNode === null)
            throw Error(f(166));
          if (e = K.current, dn(t)) {
            if (e = t.stateNode, a = t.memoizedProps, l = null, n = lt, n !== null)
              switch (n.tag) {
                case 27:
                case 5:
                  l = n.memoizedProps;
              }
            e[Oe] = t, e = !!(e.nodeValue === a || l !== null && l.suppressHydrationWarning === !0 || jd(e.nodeValue, a)), e || Za(t);
          } else
            e = uu(e).createTextNode(
              l
            ), e[Oe] = t, t.stateNode = e;
        }
        return Ue(t), null;
      case 13:
        if (l = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (n = dn(t), l !== null && l.dehydrated !== null) {
            if (e === null) {
              if (!n) throw Error(f(318));
              if (n = t.memoizedState, n = n !== null ? n.dehydrated : null, !n) throw Error(f(317));
              n[Oe] = t;
            } else
              hn(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Ue(t), n = !1;
          } else
            n = io(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), n = !0;
          if (!n)
            return t.flags & 256 ? (la(t), t) : (la(t), null);
        }
        if (la(t), (t.flags & 128) !== 0)
          return t.lanes = a, t;
        if (a = l !== null, e = e !== null && e.memoizedState !== null, a) {
          l = t.child, n = null, l.alternate !== null && l.alternate.memoizedState !== null && l.alternate.memoizedState.cachePool !== null && (n = l.alternate.memoizedState.cachePool.pool);
          var i = null;
          l.memoizedState !== null && l.memoizedState.cachePool !== null && (i = l.memoizedState.cachePool.pool), i !== n && (l.flags |= 2048);
        }
        return a !== e && a && (t.child.flags |= 8192), Ki(t, t.updateQueue), Ue(t), null;
      case 4:
        return nt(), e === null && ys(t.stateNode.containerInfo), Ue(t), null;
      case 10:
        return ta(t.type), Ue(t), null;
      case 19:
        if (Q(Le), n = t.memoizedState, n === null) return Ue(t), null;
        if (l = (t.flags & 128) !== 0, i = n.rendering, i === null)
          if (l) Mn(n, !1);
          else {
            if (qe !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = t.child; e !== null; ) {
                if (i = Li(e), i !== null) {
                  for (t.flags |= 128, Mn(n, !1), e = i.updateQueue, t.updateQueue = e, Ki(t, e), t.subtreeFlags = 0, e = a, a = t.child; a !== null; )
                    to(a, e), a = a.sibling;
                  return L(
                    Le,
                    Le.current & 1 | 2
                  ), t.child;
                }
                e = e.sibling;
              }
            n.tail !== null && xt() > Wi && (t.flags |= 128, l = !0, Mn(n, !1), t.lanes = 4194304);
          }
        else {
          if (!l)
            if (e = Li(i), e !== null) {
              if (t.flags |= 128, l = !0, e = e.updateQueue, t.updateQueue = e, Ki(t, e), Mn(n, !0), n.tail === null && n.tailMode === "hidden" && !i.alternate && !pe)
                return Ue(t), null;
            } else
              2 * xt() - n.renderingStartTime > Wi && a !== 536870912 && (t.flags |= 128, l = !0, Mn(n, !1), t.lanes = 4194304);
          n.isBackwards ? (i.sibling = t.child, t.child = i) : (e = n.last, e !== null ? e.sibling = i : t.child = i, n.last = i);
        }
        return n.tail !== null ? (t = n.tail, n.rendering = t, n.tail = t.sibling, n.renderingStartTime = xt(), t.sibling = null, e = Le.current, L(Le, l ? e & 1 | 2 : e & 1), t) : (Ue(t), null);
      case 22:
      case 23:
        return la(t), xc(), l = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== l && (t.flags |= 8192) : l && (t.flags |= 8192), l ? (a & 536870912) !== 0 && (t.flags & 128) === 0 && (Ue(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Ue(t), a = t.updateQueue, a !== null && Ki(t, a.retryQueue), a = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (a = e.memoizedState.cachePool.pool), l = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), l !== a && (t.flags |= 2048), e !== null && Q(Ja), null;
      case 24:
        return a = null, e !== null && (a = e.memoizedState.cache), t.memoizedState.cache !== a && (t.flags |= 2048), ta(Ge), Ue(t), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(f(156, t.tag));
  }
  function Xv(e, t) {
    switch (uc(t), t.tag) {
      case 1:
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return ta(Ge), nt(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return kt(t), null;
      case 13:
        if (la(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(f(340));
          hn();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return Q(Le), null;
      case 4:
        return nt(), null;
      case 10:
        return ta(t.type), null;
      case 22:
      case 23:
        return la(t), xc(), e !== null && Q(Ja), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 24:
        return ta(Ge), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Of(e, t) {
    switch (uc(t), t.tag) {
      case 3:
        ta(Ge), nt();
        break;
      case 26:
      case 27:
      case 5:
        kt(t);
        break;
      case 4:
        nt();
        break;
      case 13:
        la(t);
        break;
      case 19:
        Q(Le);
        break;
      case 10:
        ta(t.type);
        break;
      case 22:
      case 23:
        la(t), xc(), e !== null && Q(Ja);
        break;
      case 24:
        ta(Ge);
    }
  }
  function On(e, t) {
    try {
      var a = t.updateQueue, l = a !== null ? a.lastEffect : null;
      if (l !== null) {
        var n = l.next;
        a = n;
        do {
          if ((a.tag & e) === e) {
            l = void 0;
            var i = a.create, s = a.inst;
            l = i(), s.destroy = l;
          }
          a = a.next;
        } while (a !== n);
      }
    } catch (r) {
      ze(t, t.return, r);
    }
  }
  function ja(e, t, a) {
    try {
      var l = t.updateQueue, n = l !== null ? l.lastEffect : null;
      if (n !== null) {
        var i = n.next;
        l = i;
        do {
          if ((l.tag & e) === e) {
            var s = l.inst, r = s.destroy;
            if (r !== void 0) {
              s.destroy = void 0, n = t;
              var d = a, x = r;
              try {
                x();
              } catch (z) {
                ze(
                  n,
                  d,
                  z
                );
              }
            }
          }
          l = l.next;
        } while (l !== i);
      }
    } catch (z) {
      ze(t, t.return, z);
    }
  }
  function Df(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var a = e.stateNode;
      try {
        go(t, a);
      } catch (l) {
        ze(e, e.return, l);
      }
    }
  }
  function Rf(e, t, a) {
    a.props = Wa(
      e.type,
      e.memoizedProps
    ), a.state = e.memoizedState;
    try {
      a.componentWillUnmount();
    } catch (l) {
      ze(e, t, l);
    }
  }
  function Dn(e, t) {
    try {
      var a = e.ref;
      if (a !== null) {
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            var l = e.stateNode;
            break;
          case 30:
            l = e.stateNode;
            break;
          default:
            l = e.stateNode;
        }
        typeof a == "function" ? e.refCleanup = a(l) : a.current = l;
      }
    } catch (n) {
      ze(e, t, n);
    }
  }
  function Qt(e, t) {
    var a = e.ref, l = e.refCleanup;
    if (a !== null)
      if (typeof l == "function")
        try {
          l();
        } catch (n) {
          ze(e, t, n);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof a == "function")
        try {
          a(null);
        } catch (n) {
          ze(e, t, n);
        }
      else a.current = null;
  }
  function Uf(e) {
    var t = e.type, a = e.memoizedProps, l = e.stateNode;
    try {
      e: switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          a.autoFocus && l.focus();
          break e;
        case "img":
          a.src ? l.src = a.src : a.srcSet && (l.srcset = a.srcSet);
      }
    } catch (n) {
      ze(e, e.return, n);
    }
  }
  function Jc(e, t, a) {
    try {
      var l = e.stateNode;
      om(l, e.type, a, t), l[Xe] = t;
    } catch (n) {
      ze(e, e.return, n);
    }
  }
  function wf(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Oa(e.type) || e.tag === 4;
  }
  function $c(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || wf(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && Oa(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Wc(e, t, a) {
    var l = e.tag;
    if (l === 5 || l === 6)
      e = e.stateNode, t ? (a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a).insertBefore(e, t) : (t = a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a, t.appendChild(e), a = a._reactRootContainer, a != null || t.onclick !== null || (t.onclick = iu));
    else if (l !== 4 && (l === 27 && Oa(e.type) && (a = e.stateNode, t = null), e = e.child, e !== null))
      for (Wc(e, t, a), e = e.sibling; e !== null; )
        Wc(e, t, a), e = e.sibling;
  }
  function Ji(e, t, a) {
    var l = e.tag;
    if (l === 5 || l === 6)
      e = e.stateNode, t ? a.insertBefore(e, t) : a.appendChild(e);
    else if (l !== 4 && (l === 27 && Oa(e.type) && (a = e.stateNode), e = e.child, e !== null))
      for (Ji(e, t, a), e = e.sibling; e !== null; )
        Ji(e, t, a), e = e.sibling;
  }
  function qf(e) {
    var t = e.stateNode, a = e.memoizedProps;
    try {
      for (var l = e.type, n = t.attributes; n.length; )
        t.removeAttributeNode(n[0]);
      Pe(t, l, a), t[Oe] = e, t[Xe] = a;
    } catch (i) {
      ze(e, e.return, i);
    }
  }
  var ua = !1, Be = !1, Fc = !1, Cf = typeof WeakSet == "function" ? WeakSet : Set, Ve = null;
  function Qv(e, t) {
    if (e = e.containerInfo, Ss = du, e = Zr(e), $u(e)) {
      if ("selectionStart" in e)
        var a = {
          start: e.selectionStart,
          end: e.selectionEnd
        };
      else
        e: {
          a = (a = e.ownerDocument) && a.defaultView || window;
          var l = a.getSelection && a.getSelection();
          if (l && l.rangeCount !== 0) {
            a = l.anchorNode;
            var n = l.anchorOffset, i = l.focusNode;
            l = l.focusOffset;
            try {
              a.nodeType, i.nodeType;
            } catch {
              a = null;
              break e;
            }
            var s = 0, r = -1, d = -1, x = 0, z = 0, O = e, S = null;
            t: for (; ; ) {
              for (var N; O !== a || n !== 0 && O.nodeType !== 3 || (r = s + n), O !== i || l !== 0 && O.nodeType !== 3 || (d = s + l), O.nodeType === 3 && (s += O.nodeValue.length), (N = O.firstChild) !== null; )
                S = O, O = N;
              for (; ; ) {
                if (O === e) break t;
                if (S === a && ++x === n && (r = s), S === i && ++z === l && (d = s), (N = O.nextSibling) !== null) break;
                O = S, S = O.parentNode;
              }
              O = N;
            }
            a = r === -1 || d === -1 ? null : { start: r, end: d };
          } else a = null;
        }
      a = a || { start: 0, end: 0 };
    } else a = null;
    for (js = { focusedElem: e, selectionRange: a }, du = !1, Ve = t; Ve !== null; )
      if (t = Ve, e = t.child, (t.subtreeFlags & 1024) !== 0 && e !== null)
        e.return = t, Ve = e;
      else
        for (; Ve !== null; ) {
          switch (t = Ve, i = t.alternate, e = t.flags, t.tag) {
            case 0:
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && i !== null) {
                e = void 0, a = t, n = i.memoizedProps, i = i.memoizedState, l = a.stateNode;
                try {
                  var ie = Wa(
                    a.type,
                    n,
                    a.elementType === a.type
                  );
                  e = l.getSnapshotBeforeUpdate(
                    ie,
                    i
                  ), l.__reactInternalSnapshotBeforeUpdate = e;
                } catch (ae) {
                  ze(
                    a,
                    a.return,
                    ae
                  );
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (e = t.stateNode.containerInfo, a = e.nodeType, a === 9)
                  Es(e);
                else if (a === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Es(e);
                      break;
                    default:
                      e.textContent = "";
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
              if ((e & 1024) !== 0) throw Error(f(163));
          }
          if (e = t.sibling, e !== null) {
            e.return = t.return, Ve = e;
            break;
          }
          Ve = t.return;
        }
  }
  function Hf(e, t, a) {
    var l = a.flags;
    switch (a.tag) {
      case 0:
      case 11:
      case 15:
        Na(e, a), l & 4 && On(5, a);
        break;
      case 1:
        if (Na(e, a), l & 4)
          if (e = a.stateNode, t === null)
            try {
              e.componentDidMount();
            } catch (s) {
              ze(a, a.return, s);
            }
          else {
            var n = Wa(
              a.type,
              t.memoizedProps
            );
            t = t.memoizedState;
            try {
              e.componentDidUpdate(
                n,
                t,
                e.__reactInternalSnapshotBeforeUpdate
              );
            } catch (s) {
              ze(
                a,
                a.return,
                s
              );
            }
          }
        l & 64 && Df(a), l & 512 && Dn(a, a.return);
        break;
      case 3:
        if (Na(e, a), l & 64 && (e = a.updateQueue, e !== null)) {
          if (t = null, a.child !== null)
            switch (a.child.tag) {
              case 27:
              case 5:
                t = a.child.stateNode;
                break;
              case 1:
                t = a.child.stateNode;
            }
          try {
            go(e, t);
          } catch (s) {
            ze(a, a.return, s);
          }
        }
        break;
      case 27:
        t === null && l & 4 && qf(a);
      case 26:
      case 5:
        Na(e, a), t === null && l & 4 && Uf(a), l & 512 && Dn(a, a.return);
        break;
      case 12:
        Na(e, a);
        break;
      case 13:
        Na(e, a), l & 4 && Yf(e, a), l & 64 && (e = a.memoizedState, e !== null && (e = e.dehydrated, e !== null && (a = Iv.bind(
          null,
          a
        ), gm(e, a))));
        break;
      case 22:
        if (l = a.memoizedState !== null || ua, !l) {
          t = t !== null && t.memoizedState !== null || Be, n = ua;
          var i = Be;
          ua = l, (Be = t) && !i ? Ta(
            e,
            a,
            (a.subtreeFlags & 8772) !== 0
          ) : Na(e, a), ua = n, Be = i;
        }
        break;
      case 30:
        break;
      default:
        Na(e, a);
    }
  }
  function Bf(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, Bf(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && Ou(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var De = null, rt = !1;
  function ca(e, t, a) {
    for (a = a.child; a !== null; )
      kf(e, t, a), a = a.sibling;
  }
  function kf(e, t, a) {
    if (Ie && typeof Ie.onCommitFiberUnmount == "function")
      try {
        Ie.onCommitFiberUnmount(Jt, a);
      } catch {
      }
    switch (a.tag) {
      case 26:
        Be || Qt(a, t), ca(
          e,
          t,
          a
        ), a.memoizedState ? a.memoizedState.count-- : a.stateNode && (a = a.stateNode, a.parentNode.removeChild(a));
        break;
      case 27:
        Be || Qt(a, t);
        var l = De, n = rt;
        Oa(a.type) && (De = a.stateNode, rt = !1), ca(
          e,
          t,
          a
        ), Yn(a.stateNode), De = l, rt = n;
        break;
      case 5:
        Be || Qt(a, t);
      case 6:
        if (l = De, n = rt, De = null, ca(
          e,
          t,
          a
        ), De = l, rt = n, De !== null)
          if (rt)
            try {
              (De.nodeType === 9 ? De.body : De.nodeName === "HTML" ? De.ownerDocument.body : De).removeChild(a.stateNode);
            } catch (i) {
              ze(
                a,
                t,
                i
              );
            }
          else
            try {
              De.removeChild(a.stateNode);
            } catch (i) {
              ze(
                a,
                t,
                i
              );
            }
        break;
      case 18:
        De !== null && (rt ? (e = De, Ad(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          a.stateNode
        ), Jn(e)) : Ad(De, a.stateNode));
        break;
      case 4:
        l = De, n = rt, De = a.stateNode.containerInfo, rt = !0, ca(
          e,
          t,
          a
        ), De = l, rt = n;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Be || ja(2, a, t), Be || ja(4, a, t), ca(
          e,
          t,
          a
        );
        break;
      case 1:
        Be || (Qt(a, t), l = a.stateNode, typeof l.componentWillUnmount == "function" && Rf(
          a,
          t,
          l
        )), ca(
          e,
          t,
          a
        );
        break;
      case 21:
        ca(
          e,
          t,
          a
        );
        break;
      case 22:
        Be = (l = Be) || a.memoizedState !== null, ca(
          e,
          t,
          a
        ), Be = l;
        break;
      default:
        ca(
          e,
          t,
          a
        );
    }
  }
  function Yf(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        Jn(e);
      } catch (a) {
        ze(t, t.return, a);
      }
  }
  function Zv(e) {
    switch (e.tag) {
      case 13:
      case 19:
        var t = e.stateNode;
        return t === null && (t = e.stateNode = new Cf()), t;
      case 22:
        return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new Cf()), t;
      default:
        throw Error(f(435, e.tag));
    }
  }
  function Pc(e, t) {
    var a = Zv(e);
    t.forEach(function(l) {
      var n = em.bind(null, e, l);
      a.has(l) || (a.add(l), l.then(n, n));
    });
  }
  function vt(e, t) {
    var a = t.deletions;
    if (a !== null)
      for (var l = 0; l < a.length; l++) {
        var n = a[l], i = e, s = t, r = s;
        e: for (; r !== null; ) {
          switch (r.tag) {
            case 27:
              if (Oa(r.type)) {
                De = r.stateNode, rt = !1;
                break e;
              }
              break;
            case 5:
              De = r.stateNode, rt = !1;
              break e;
            case 3:
            case 4:
              De = r.stateNode.containerInfo, rt = !0;
              break e;
          }
          r = r.return;
        }
        if (De === null) throw Error(f(160));
        kf(i, s, n), De = null, rt = !1, i = n.alternate, i !== null && (i.return = null), n.return = null;
      }
    if (t.subtreeFlags & 13878)
      for (t = t.child; t !== null; )
        Gf(t, e), t = t.sibling;
  }
  var qt = null;
  function Gf(e, t) {
    var a = e.alternate, l = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        vt(t, e), mt(e), l & 4 && (ja(3, e, e.return), On(3, e), ja(5, e, e.return));
        break;
      case 1:
        vt(t, e), mt(e), l & 512 && (Be || a === null || Qt(a, a.return)), l & 64 && ua && (e = e.updateQueue, e !== null && (l = e.callbacks, l !== null && (a = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = a === null ? l : a.concat(l))));
        break;
      case 26:
        var n = qt;
        if (vt(t, e), mt(e), l & 512 && (Be || a === null || Qt(a, a.return)), l & 4) {
          var i = a !== null ? a.memoizedState : null;
          if (l = e.memoizedState, a === null)
            if (l === null)
              if (e.stateNode === null) {
                e: {
                  l = e.type, a = e.memoizedProps, n = n.ownerDocument || n;
                  t: switch (l) {
                    case "title":
                      i = n.getElementsByTagName("title")[0], (!i || i[en] || i[Oe] || i.namespaceURI === "http://www.w3.org/2000/svg" || i.hasAttribute("itemprop")) && (i = n.createElement(l), n.head.insertBefore(
                        i,
                        n.querySelector("head > title")
                      )), Pe(i, l, a), i[Oe] = e, Qe(i), l = i;
                      break e;
                    case "link":
                      var s = qd(
                        "link",
                        "href",
                        n
                      ).get(l + (a.href || ""));
                      if (s) {
                        for (var r = 0; r < s.length; r++)
                          if (i = s[r], i.getAttribute("href") === (a.href == null || a.href === "" ? null : a.href) && i.getAttribute("rel") === (a.rel == null ? null : a.rel) && i.getAttribute("title") === (a.title == null ? null : a.title) && i.getAttribute("crossorigin") === (a.crossOrigin == null ? null : a.crossOrigin)) {
                            s.splice(r, 1);
                            break t;
                          }
                      }
                      i = n.createElement(l), Pe(i, l, a), n.head.appendChild(i);
                      break;
                    case "meta":
                      if (s = qd(
                        "meta",
                        "content",
                        n
                      ).get(l + (a.content || ""))) {
                        for (r = 0; r < s.length; r++)
                          if (i = s[r], i.getAttribute("content") === (a.content == null ? null : "" + a.content) && i.getAttribute("name") === (a.name == null ? null : a.name) && i.getAttribute("property") === (a.property == null ? null : a.property) && i.getAttribute("http-equiv") === (a.httpEquiv == null ? null : a.httpEquiv) && i.getAttribute("charset") === (a.charSet == null ? null : a.charSet)) {
                            s.splice(r, 1);
                            break t;
                          }
                      }
                      i = n.createElement(l), Pe(i, l, a), n.head.appendChild(i);
                      break;
                    default:
                      throw Error(f(468, l));
                  }
                  i[Oe] = e, Qe(i), l = i;
                }
                e.stateNode = l;
              } else
                Cd(
                  n,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = wd(
                n,
                l,
                e.memoizedProps
              );
          else
            i !== l ? (i === null ? a.stateNode !== null && (a = a.stateNode, a.parentNode.removeChild(a)) : i.count--, l === null ? Cd(
              n,
              e.type,
              e.stateNode
            ) : wd(
              n,
              l,
              e.memoizedProps
            )) : l === null && e.stateNode !== null && Jc(
              e,
              e.memoizedProps,
              a.memoizedProps
            );
        }
        break;
      case 27:
        vt(t, e), mt(e), l & 512 && (Be || a === null || Qt(a, a.return)), a !== null && l & 4 && Jc(
          e,
          e.memoizedProps,
          a.memoizedProps
        );
        break;
      case 5:
        if (vt(t, e), mt(e), l & 512 && (Be || a === null || Qt(a, a.return)), e.flags & 32) {
          n = e.stateNode;
          try {
            hl(n, "");
          } catch (N) {
            ze(e, e.return, N);
          }
        }
        l & 4 && e.stateNode != null && (n = e.memoizedProps, Jc(
          e,
          n,
          a !== null ? a.memoizedProps : n
        )), l & 1024 && (Fc = !0);
        break;
      case 6:
        if (vt(t, e), mt(e), l & 4) {
          if (e.stateNode === null)
            throw Error(f(162));
          l = e.memoizedProps, a = e.stateNode;
          try {
            a.nodeValue = l;
          } catch (N) {
            ze(e, e.return, N);
          }
        }
        break;
      case 3:
        if (ru = null, n = qt, qt = cu(t.containerInfo), vt(t, e), qt = n, mt(e), l & 4 && a !== null && a.memoizedState.isDehydrated)
          try {
            Jn(t.containerInfo);
          } catch (N) {
            ze(e, e.return, N);
          }
        Fc && (Fc = !1, Lf(e));
        break;
      case 4:
        l = qt, qt = cu(
          e.stateNode.containerInfo
        ), vt(t, e), mt(e), qt = l;
        break;
      case 12:
        vt(t, e), mt(e);
        break;
      case 13:
        vt(t, e), mt(e), e.child.flags & 8192 && e.memoizedState !== null != (a !== null && a.memoizedState !== null) && (ns = xt()), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, Pc(e, l)));
        break;
      case 22:
        n = e.memoizedState !== null;
        var d = a !== null && a.memoizedState !== null, x = ua, z = Be;
        if (ua = x || n, Be = z || d, vt(t, e), Be = z, ua = x, mt(e), l & 8192)
          e: for (t = e.stateNode, t._visibility = n ? t._visibility & -2 : t._visibility | 1, n && (a === null || d || ua || Be || Fa(e)), a = null, t = e; ; ) {
            if (t.tag === 5 || t.tag === 26) {
              if (a === null) {
                d = a = t;
                try {
                  if (i = d.stateNode, n)
                    s = i.style, typeof s.setProperty == "function" ? s.setProperty("display", "none", "important") : s.display = "none";
                  else {
                    r = d.stateNode;
                    var O = d.memoizedProps.style, S = O != null && O.hasOwnProperty("display") ? O.display : null;
                    r.style.display = S == null || typeof S == "boolean" ? "" : ("" + S).trim();
                  }
                } catch (N) {
                  ze(d, d.return, N);
                }
              }
            } else if (t.tag === 6) {
              if (a === null) {
                d = t;
                try {
                  d.stateNode.nodeValue = n ? "" : d.memoizedProps;
                } catch (N) {
                  ze(d, d.return, N);
                }
              }
            } else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === e) && t.child !== null) {
              t.child.return = t, t = t.child;
              continue;
            }
            if (t === e) break e;
            for (; t.sibling === null; ) {
              if (t.return === null || t.return === e) break e;
              a === t && (a = null), t = t.return;
            }
            a === t && (a = null), t.sibling.return = t.return, t = t.sibling;
          }
        l & 4 && (l = e.updateQueue, l !== null && (a = l.retryQueue, a !== null && (l.retryQueue = null, Pc(e, a))));
        break;
      case 19:
        vt(t, e), mt(e), l & 4 && (l = e.updateQueue, l !== null && (e.updateQueue = null, Pc(e, l)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        vt(t, e), mt(e);
    }
  }
  function mt(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var a, l = e.return; l !== null; ) {
          if (wf(l)) {
            a = l;
            break;
          }
          l = l.return;
        }
        if (a == null) throw Error(f(160));
        switch (a.tag) {
          case 27:
            var n = a.stateNode, i = $c(e);
            Ji(e, i, n);
            break;
          case 5:
            var s = a.stateNode;
            a.flags & 32 && (hl(s, ""), a.flags &= -33);
            var r = $c(e);
            Ji(e, r, s);
            break;
          case 3:
          case 4:
            var d = a.stateNode.containerInfo, x = $c(e);
            Wc(
              e,
              x,
              d
            );
            break;
          default:
            throw Error(f(161));
        }
      } catch (z) {
        ze(e, e.return, z);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function Lf(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        Lf(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
      }
  }
  function Na(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        Hf(e, t.alternate, t), t = t.sibling;
  }
  function Fa(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          ja(4, t, t.return), Fa(t);
          break;
        case 1:
          Qt(t, t.return);
          var a = t.stateNode;
          typeof a.componentWillUnmount == "function" && Rf(
            t,
            t.return,
            a
          ), Fa(t);
          break;
        case 27:
          Yn(t.stateNode);
        case 26:
        case 5:
          Qt(t, t.return), Fa(t);
          break;
        case 22:
          t.memoizedState === null && Fa(t);
          break;
        case 30:
          Fa(t);
          break;
        default:
          Fa(t);
      }
      e = e.sibling;
    }
  }
  function Ta(e, t, a) {
    for (a = a && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var l = t.alternate, n = e, i = t, s = i.flags;
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
              ze(l, l.return, x);
            }
          if (l = i, n = l.updateQueue, n !== null) {
            var r = l.stateNode;
            try {
              var d = n.shared.hiddenCallbacks;
              if (d !== null)
                for (n.shared.hiddenCallbacks = null, n = 0; n < d.length; n++)
                  po(d[n], r);
            } catch (x) {
              ze(l, l.return, x);
            }
          }
          a && s & 64 && Df(i), Dn(i, i.return);
          break;
        case 27:
          qf(i);
        case 26:
        case 5:
          Ta(
            n,
            i,
            a
          ), a && l === null && s & 4 && Uf(i), Dn(i, i.return);
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
          ), a && s & 4 && Yf(n, i);
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
      t = t.sibling;
    }
  }
  function Ic(e, t) {
    var a = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (a = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== a && (e != null && e.refCount++, a != null && pn(a));
  }
  function es(e, t) {
    e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && pn(e));
  }
  function Zt(e, t, a, l) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        Xf(
          e,
          t,
          a,
          l
        ), t = t.sibling;
  }
  function Xf(e, t, a, l) {
    var n = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        Zt(
          e,
          t,
          a,
          l
        ), n & 2048 && On(9, t);
        break;
      case 1:
        Zt(
          e,
          t,
          a,
          l
        );
        break;
      case 3:
        Zt(
          e,
          t,
          a,
          l
        ), n & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && pn(e)));
        break;
      case 12:
        if (n & 2048) {
          Zt(
            e,
            t,
            a,
            l
          ), e = t.stateNode;
          try {
            var i = t.memoizedProps, s = i.id, r = i.onPostCommit;
            typeof r == "function" && r(
              s,
              t.alternate === null ? "mount" : "update",
              e.passiveEffectDuration,
              -0
            );
          } catch (d) {
            ze(t, t.return, d);
          }
        } else
          Zt(
            e,
            t,
            a,
            l
          );
        break;
      case 13:
        Zt(
          e,
          t,
          a,
          l
        );
        break;
      case 23:
        break;
      case 22:
        i = t.stateNode, s = t.alternate, t.memoizedState !== null ? i._visibility & 2 ? Zt(
          e,
          t,
          a,
          l
        ) : Rn(e, t) : i._visibility & 2 ? Zt(
          e,
          t,
          a,
          l
        ) : (i._visibility |= 2, Rl(
          e,
          t,
          a,
          l,
          (t.subtreeFlags & 10256) !== 0
        )), n & 2048 && Ic(s, t);
        break;
      case 24:
        Zt(
          e,
          t,
          a,
          l
        ), n & 2048 && es(t.alternate, t);
        break;
      default:
        Zt(
          e,
          t,
          a,
          l
        );
    }
  }
  function Rl(e, t, a, l, n) {
    for (n = n && (t.subtreeFlags & 10256) !== 0, t = t.child; t !== null; ) {
      var i = e, s = t, r = a, d = l, x = s.flags;
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
          var z = s.stateNode;
          s.memoizedState !== null ? z._visibility & 2 ? Rl(
            i,
            s,
            r,
            d,
            n
          ) : Rn(
            i,
            s
          ) : (z._visibility |= 2, Rl(
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
          ), n && x & 2048 && es(s.alternate, s);
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
      t = t.sibling;
    }
  }
  function Rn(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var a = e, l = t, n = l.flags;
        switch (l.tag) {
          case 22:
            Rn(a, l), n & 2048 && Ic(
              l.alternate,
              l
            );
            break;
          case 24:
            Rn(a, l), n & 2048 && es(l.alternate, l);
            break;
          default:
            Rn(a, l);
        }
        t = t.sibling;
      }
  }
  var Un = 8192;
  function Ul(e) {
    if (e.subtreeFlags & Un)
      for (e = e.child; e !== null; )
        Qf(e), e = e.sibling;
  }
  function Qf(e) {
    switch (e.tag) {
      case 26:
        Ul(e), e.flags & Un && e.memoizedState !== null && Om(
          qt,
          e.memoizedState,
          e.memoizedProps
        );
        break;
      case 5:
        Ul(e);
        break;
      case 3:
      case 4:
        var t = qt;
        qt = cu(e.stateNode.containerInfo), Ul(e), qt = t;
        break;
      case 22:
        e.memoizedState === null && (t = e.alternate, t !== null && t.memoizedState !== null ? (t = Un, Un = 16777216, Ul(e), Un = t) : Ul(e));
        break;
      default:
        Ul(e);
    }
  }
  function Zf(e) {
    var t = e.alternate;
    if (t !== null && (e = t.child, e !== null)) {
      t.child = null;
      do
        t = e.sibling, e.sibling = null, e = t;
      while (e !== null);
    }
  }
  function wn(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var a = 0; a < t.length; a++) {
          var l = t[a];
          Ve = l, Kf(
            l,
            e
          );
        }
      Zf(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        Vf(e), e = e.sibling;
  }
  function Vf(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        wn(e), e.flags & 2048 && ja(9, e, e.return);
        break;
      case 3:
        wn(e);
        break;
      case 12:
        wn(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, $i(e)) : wn(e);
        break;
      default:
        wn(e);
    }
  }
  function $i(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var a = 0; a < t.length; a++) {
          var l = t[a];
          Ve = l, Kf(
            l,
            e
          );
        }
      Zf(e);
    }
    for (e = e.child; e !== null; ) {
      switch (t = e, t.tag) {
        case 0:
        case 11:
        case 15:
          ja(8, t, t.return), $i(t);
          break;
        case 22:
          a = t.stateNode, a._visibility & 2 && (a._visibility &= -3, $i(t));
          break;
        default:
          $i(t);
      }
      e = e.sibling;
    }
  }
  function Kf(e, t) {
    for (; Ve !== null; ) {
      var a = Ve;
      switch (a.tag) {
        case 0:
        case 11:
        case 15:
          ja(8, a, t);
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
      if (l = a.child, l !== null) l.return = a, Ve = l;
      else
        e: for (a = e; Ve !== null; ) {
          l = Ve;
          var n = l.sibling, i = l.return;
          if (Bf(l), l === a) {
            Ve = null;
            break e;
          }
          if (n !== null) {
            n.return = i, Ve = n;
            break e;
          }
          Ve = i;
        }
    }
  }
  var Vv = {
    getCacheForType: function(e) {
      var t = et(Ge), a = t.data.get(e);
      return a === void 0 && (a = e(), t.data.set(e, a)), a;
    }
  }, Kv = typeof WeakMap == "function" ? WeakMap : Map, Se = 0, Me = null, de = null, ve = 0, je = 0, pt = null, Ea = !1, wl = !1, ts = !1, sa = 0, qe = 0, _a = 0, Pa = 0, as = 0, zt = 0, ql = 0, qn = null, ot = null, ls = !1, ns = 0, Wi = 1 / 0, Fi = null, Aa = null, Fe = 0, za = null, Cl = null, Hl = 0, is = 0, us = null, Jf = null, Cn = 0, cs = null;
  function gt() {
    if ((Se & 2) !== 0 && ve !== 0)
      return ve & -ve;
    if (_.T !== null) {
      var e = Tl;
      return e !== 0 ? e : vs();
    }
    return ce();
  }
  function $f() {
    zt === 0 && (zt = (ve & 536870912) === 0 || pe ? ci() : 536870912);
    var e = At.current;
    return e !== null && (e.flags |= 32), zt;
  }
  function yt(e, t, a) {
    (e === Me && (je === 2 || je === 9) || e.cancelPendingCommit !== null) && (Bl(e, 0), Ma(
      e,
      ve,
      zt,
      !1
    )), ha(e, a), ((Se & 2) === 0 || e !== Me) && (e === Me && ((Se & 2) === 0 && (Pa |= a), qe === 4 && Ma(
      e,
      ve,
      zt,
      !1
    )), Vt(e));
  }
  function Wf(e, t, a) {
    if ((Se & 6) !== 0) throw Error(f(327));
    var l = !a && (t & 124) === 0 && (t & e.expiredLanes) === 0 || ut(e, t), n = l ? Wv(e, t) : os(e, t, !0), i = l;
    do {
      if (n === 0) {
        wl && !l && Ma(e, t, 0, !1);
        break;
      } else {
        if (a = e.current.alternate, i && !Jv(a)) {
          n = os(e, t, !1), i = !1;
          continue;
        }
        if (n === 2) {
          if (i = t, e.errorRecoveryDisabledLanes & i)
            var s = 0;
          else
            s = e.pendingLanes & -536870913, s = s !== 0 ? s : s & 536870912 ? 536870912 : 0;
          if (s !== 0) {
            t = s;
            e: {
              var r = e;
              n = qn;
              var d = r.current.memoizedState.isDehydrated;
              if (d && (Bl(r, s).flags |= 256), s = os(
                r,
                s,
                !1
              ), s !== 2) {
                if (ts && !d) {
                  r.errorRecoveryDisabledLanes |= i, Pa |= i, n = 4;
                  break e;
                }
                i = ot, ot = n, i !== null && (ot === null ? ot = i : ot.push.apply(
                  ot,
                  i
                ));
              }
              n = s;
            }
            if (i = !1, n !== 2) continue;
          }
        }
        if (n === 1) {
          Bl(e, 0), Ma(e, t, 0, !0);
          break;
        }
        e: {
          switch (l = e, i = n, i) {
            case 0:
            case 1:
              throw Error(f(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              Ma(
                l,
                t,
                zt,
                !Ea
              );
              break e;
            case 2:
              ot = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(f(329));
          }
          if ((t & 62914560) === t && (n = ns + 300 - xt(), 10 < n)) {
            if (Ma(
              l,
              t,
              zt,
              !Ea
            ), nl(l, 0, !0) !== 0) break e;
            l.timeoutHandle = Ed(
              Ff.bind(
                null,
                l,
                a,
                ot,
                Fi,
                ls,
                t,
                zt,
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
            break e;
          }
          Ff(
            l,
            a,
            ot,
            Fi,
            ls,
            t,
            zt,
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
    Vt(e);
  }
  function Ff(e, t, a, l, n, i, s, r, d, x, z, O, S, N) {
    if (e.timeoutHandle = -1, O = t.subtreeFlags, (O & 8192 || (O & 16785408) === 16785408) && (Xn = { stylesheets: null, count: 0, unsuspend: Mm }, Qf(t), O = Dm(), O !== null)) {
      e.cancelPendingCommit = O(
        nd.bind(
          null,
          e,
          t,
          i,
          a,
          l,
          n,
          s,
          r,
          d,
          z,
          1,
          S,
          N
        )
      ), Ma(e, i, s, !x);
      return;
    }
    nd(
      e,
      t,
      i,
      a,
      l,
      n,
      s,
      r,
      d
    );
  }
  function Jv(e) {
    for (var t = e; ; ) {
      var a = t.tag;
      if ((a === 0 || a === 11 || a === 15) && t.flags & 16384 && (a = t.updateQueue, a !== null && (a = a.stores, a !== null)))
        for (var l = 0; l < a.length; l++) {
          var n = a[l], i = n.getSnapshot;
          n = n.value;
          try {
            if (!dt(i(), n)) return !1;
          } catch {
            return !1;
          }
        }
      if (a = t.child, t.subtreeFlags & 16384 && a !== null)
        a.return = t, t = a;
      else {
        if (t === e) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return !0;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
    }
    return !0;
  }
  function Ma(e, t, a, l) {
    t &= ~as, t &= ~Pa, e.suspendedLanes |= t, e.pingedLanes &= ~t, l && (e.warmLanes |= t), l = e.expirationTimes;
    for (var n = t; 0 < n; ) {
      var i = 31 - $e(n), s = 1 << i;
      l[i] = -1, n &= ~s;
    }
    a !== 0 && Pl(e, a, t);
  }
  function Pi() {
    return (Se & 6) === 0 ? (Hn(0), !1) : !0;
  }
  function ss() {
    if (de !== null) {
      if (je === 0)
        var e = de.return;
      else
        e = de, ea = Va = null, Ec(e), Ol = null, An = 0, e = de;
      for (; e !== null; )
        Of(e.alternate, e), e = e.return;
      de = null;
    }
  }
  function Bl(e, t) {
    var a = e.timeoutHandle;
    a !== -1 && (e.timeoutHandle = -1, dm(a)), a = e.cancelPendingCommit, a !== null && (e.cancelPendingCommit = null, a()), ss(), Me = e, de = a = Ft(e.current, null), ve = t, je = 0, pt = null, Ea = !1, wl = ut(e, t), ts = !1, ql = zt = as = Pa = _a = qe = 0, ot = qn = null, ls = !1, (t & 8) !== 0 && (t |= t & 32);
    var l = e.entangledLanes;
    if (l !== 0)
      for (e = e.entanglements, l &= t; 0 < l; ) {
        var n = 31 - $e(l), i = 1 << n;
        t |= e[n], l &= ~i;
      }
    return sa = t, xi(), a;
  }
  function Pf(e, t) {
    re = null, _.H = ki, t === yn || t === Mi ? (t = vo(), je = 3) : t === oo ? (t = vo(), je = 4) : je = t === pf ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, pt = t, de === null && (qe = 1, Qi(
      e,
      Nt(t, e.current)
    ));
  }
  function If() {
    var e = _.H;
    return _.H = ki, e === null ? ki : e;
  }
  function ed() {
    var e = _.A;
    return _.A = Vv, e;
  }
  function rs() {
    qe = 4, Ea || (ve & 4194048) !== ve && At.current !== null || (wl = !0), (_a & 134217727) === 0 && (Pa & 134217727) === 0 || Me === null || Ma(
      Me,
      ve,
      zt,
      !1
    );
  }
  function os(e, t, a) {
    var l = Se;
    Se |= 2;
    var n = If(), i = ed();
    (Me !== e || ve !== t) && (Fi = null, Bl(e, t)), t = !1;
    var s = qe;
    e: do
      try {
        if (je !== 0 && de !== null) {
          var r = de, d = pt;
          switch (je) {
            case 8:
              ss(), s = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              At.current === null && (t = !0);
              var x = je;
              if (je = 0, pt = null, kl(e, r, d, x), a && wl) {
                s = 0;
                break e;
              }
              break;
            default:
              x = je, je = 0, pt = null, kl(e, r, d, x);
          }
        }
        $v(), s = qe;
        break;
      } catch (z) {
        Pf(e, z);
      }
    while (!0);
    return t && e.shellSuspendCounter++, ea = Va = null, Se = l, _.H = n, _.A = i, de === null && (Me = null, ve = 0, xi()), s;
  }
  function $v() {
    for (; de !== null; ) td(de);
  }
  function Wv(e, t) {
    var a = Se;
    Se |= 2;
    var l = If(), n = ed();
    Me !== e || ve !== t ? (Fi = null, Wi = xt() + 500, Bl(e, t)) : wl = ut(
      e,
      t
    );
    e: do
      try {
        if (je !== 0 && de !== null) {
          t = de;
          var i = pt;
          t: switch (je) {
            case 1:
              je = 0, pt = null, kl(e, t, i, 1);
              break;
            case 2:
            case 9:
              if (fo(i)) {
                je = 0, pt = null, ad(t);
                break;
              }
              t = function() {
                je !== 2 && je !== 9 || Me !== e || (je = 7), Vt(e);
              }, i.then(t, t);
              break e;
            case 3:
              je = 7;
              break e;
            case 4:
              je = 5;
              break e;
            case 7:
              fo(i) ? (je = 0, pt = null, ad(t)) : (je = 0, pt = null, kl(e, t, i, 7));
              break;
            case 5:
              var s = null;
              switch (de.tag) {
                case 26:
                  s = de.memoizedState;
                case 5:
                case 27:
                  var r = de;
                  if (!s || Hd(s)) {
                    je = 0, pt = null;
                    var d = r.sibling;
                    if (d !== null) de = d;
                    else {
                      var x = r.return;
                      x !== null ? (de = x, Ii(x)) : de = null;
                    }
                    break t;
                  }
              }
              je = 0, pt = null, kl(e, t, i, 5);
              break;
            case 6:
              je = 0, pt = null, kl(e, t, i, 6);
              break;
            case 8:
              ss(), qe = 6;
              break e;
            default:
              throw Error(f(462));
          }
        }
        Fv();
        break;
      } catch (z) {
        Pf(e, z);
      }
    while (!0);
    return ea = Va = null, _.H = l, _.A = n, Se = a, de !== null ? 0 : (Me = null, ve = 0, xi(), qe);
  }
  function Fv() {
    for (; de !== null && !ei(); )
      td(de);
  }
  function td(e) {
    var t = zf(e.alternate, e, sa);
    e.memoizedProps = e.pendingProps, t === null ? Ii(e) : de = t;
  }
  function ad(e) {
    var t = e, a = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = jf(
          a,
          t,
          t.pendingProps,
          t.type,
          void 0,
          ve
        );
        break;
      case 11:
        t = jf(
          a,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          ve
        );
        break;
      case 5:
        Ec(t);
      default:
        Of(a, t), t = de = to(t, sa), t = zf(a, t, sa);
    }
    e.memoizedProps = e.pendingProps, t === null ? Ii(e) : de = t;
  }
  function kl(e, t, a, l) {
    ea = Va = null, Ec(t), Ol = null, An = 0;
    var n = t.return;
    try {
      if (Yv(
        e,
        n,
        t,
        a,
        ve
      )) {
        qe = 1, Qi(
          e,
          Nt(a, e.current)
        ), de = null;
        return;
      }
    } catch (i) {
      if (n !== null) throw de = n, i;
      qe = 1, Qi(
        e,
        Nt(a, e.current)
      ), de = null;
      return;
    }
    t.flags & 32768 ? (pe || l === 1 ? e = !0 : wl || (ve & 536870912) !== 0 ? e = !1 : (Ea = e = !0, (l === 2 || l === 9 || l === 3 || l === 6) && (l = At.current, l !== null && l.tag === 13 && (l.flags |= 16384))), ld(t, e)) : Ii(t);
  }
  function Ii(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        ld(
          t,
          Ea
        );
        return;
      }
      e = t.return;
      var a = Lv(
        t.alternate,
        t,
        sa
      );
      if (a !== null) {
        de = a;
        return;
      }
      if (t = t.sibling, t !== null) {
        de = t;
        return;
      }
      de = t = e;
    } while (t !== null);
    qe === 0 && (qe = 5);
  }
  function ld(e, t) {
    do {
      var a = Xv(e.alternate, e);
      if (a !== null) {
        a.flags &= 32767, de = a;
        return;
      }
      if (a = e.return, a !== null && (a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null), !t && (e = e.sibling, e !== null)) {
        de = e;
        return;
      }
      de = e = a;
    } while (e !== null);
    qe = 6, de = null;
  }
  function nd(e, t, a, l, n, i, s, r, d) {
    e.cancelPendingCommit = null;
    do
      eu();
    while (Fe !== 0);
    if ((Se & 6) !== 0) throw Error(f(327));
    if (t !== null) {
      if (t === e.current) throw Error(f(177));
      if (i = t.lanes | t.childLanes, i |= ec, si(
        e,
        a,
        i,
        s,
        r,
        d
      ), e === Me && (de = Me = null, ve = 0), Cl = t, za = e, Hl = a, is = i, us = n, Jf = l, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, tm(ll, function() {
        return rd(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), l = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || l) {
        l = _.T, _.T = null, n = G.p, G.p = 2, s = Se, Se |= 4;
        try {
          Qv(e, t, a);
        } finally {
          Se = s, G.p = n, _.T = l;
        }
      }
      Fe = 1, id(), ud(), cd();
    }
  }
  function id() {
    if (Fe === 1) {
      Fe = 0;
      var e = za, t = Cl, a = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || a) {
        a = _.T, _.T = null;
        var l = G.p;
        G.p = 2;
        var n = Se;
        Se |= 4;
        try {
          Gf(t, e);
          var i = js, s = Zr(e.containerInfo), r = i.focusedElem, d = i.selectionRange;
          if (s !== r && r && r.ownerDocument && Qr(
            r.ownerDocument.documentElement,
            r
          )) {
            if (d !== null && $u(r)) {
              var x = d.start, z = d.end;
              if (z === void 0 && (z = x), "selectionStart" in r)
                r.selectionStart = x, r.selectionEnd = Math.min(
                  z,
                  r.value.length
                );
              else {
                var O = r.ownerDocument || document, S = O && O.defaultView || window;
                if (S.getSelection) {
                  var N = S.getSelection(), ie = r.textContent.length, ae = Math.min(d.start, ie), _e = d.end === void 0 ? ae : Math.min(d.end, ie);
                  !N.extend && ae > _e && (s = _e, _e = ae, ae = s);
                  var g = Xr(
                    r,
                    ae
                  ), m = Xr(
                    r,
                    _e
                  );
                  if (g && m && (N.rangeCount !== 1 || N.anchorNode !== g.node || N.anchorOffset !== g.offset || N.focusNode !== m.node || N.focusOffset !== m.offset)) {
                    var y = O.createRange();
                    y.setStart(g.node, g.offset), N.removeAllRanges(), ae > _e ? (N.addRange(y), N.extend(m.node, m.offset)) : (y.setEnd(m.node, m.offset), N.addRange(y));
                  }
                }
              }
            }
            for (O = [], N = r; N = N.parentNode; )
              N.nodeType === 1 && O.push({
                element: N,
                left: N.scrollLeft,
                top: N.scrollTop
              });
            for (typeof r.focus == "function" && r.focus(), r = 0; r < O.length; r++) {
              var M = O[r];
              M.element.scrollLeft = M.left, M.element.scrollTop = M.top;
            }
          }
          du = !!Ss, js = Ss = null;
        } finally {
          Se = n, G.p = l, _.T = a;
        }
      }
      e.current = t, Fe = 2;
    }
  }
  function ud() {
    if (Fe === 2) {
      Fe = 0;
      var e = za, t = Cl, a = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || a) {
        a = _.T, _.T = null;
        var l = G.p;
        G.p = 2;
        var n = Se;
        Se |= 4;
        try {
          Hf(e, t.alternate, t);
        } finally {
          Se = n, G.p = l, _.T = a;
        }
      }
      Fe = 3;
    }
  }
  function cd() {
    if (Fe === 4 || Fe === 3) {
      Fe = 0, _u();
      var e = za, t = Cl, a = Hl, l = Jf;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? Fe = 5 : (Fe = 0, Cl = za = null, sd(e, e.pendingLanes));
      var n = e.pendingLanes;
      if (n === 0 && (Aa = null), j(a), t = t.stateNode, Ie && typeof Ie.onCommitFiberRoot == "function")
        try {
          Ie.onCommitFiberRoot(
            Jt,
            t,
            void 0,
            (t.current.flags & 128) === 128
          );
        } catch {
        }
      if (l !== null) {
        t = _.T, n = G.p, G.p = 2, _.T = null;
        try {
          for (var i = e.onRecoverableError, s = 0; s < l.length; s++) {
            var r = l[s];
            i(r.value, {
              componentStack: r.stack
            });
          }
        } finally {
          _.T = t, G.p = n;
        }
      }
      (Hl & 3) !== 0 && eu(), Vt(e), n = e.pendingLanes, (a & 4194090) !== 0 && (n & 42) !== 0 ? e === cs ? Cn++ : (Cn = 0, cs = e) : Cn = 0, Hn(0);
    }
  }
  function sd(e, t) {
    (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, pn(t)));
  }
  function eu(e) {
    return id(), ud(), cd(), rd();
  }
  function rd() {
    if (Fe !== 5) return !1;
    var e = za, t = is;
    is = 0;
    var a = j(Hl), l = _.T, n = G.p;
    try {
      G.p = 32 > a ? 32 : a, _.T = null, a = us, us = null;
      var i = za, s = Hl;
      if (Fe = 0, Cl = za = null, Hl = 0, (Se & 6) !== 0) throw Error(f(331));
      var r = Se;
      if (Se |= 4, Vf(i.current), Xf(
        i,
        i.current,
        s,
        a
      ), Se = r, Hn(0, !1), Ie && typeof Ie.onPostCommitFiberRoot == "function")
        try {
          Ie.onPostCommitFiberRoot(Jt, i);
        } catch {
        }
      return !0;
    } finally {
      G.p = n, _.T = l, sd(e, t);
    }
  }
  function od(e, t, a) {
    t = Nt(a, t), t = kc(e.stateNode, t, 2), e = ya(e, t, 2), e !== null && (ha(e, 2), Vt(e));
  }
  function ze(e, t, a) {
    if (e.tag === 3)
      od(e, e, a);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          od(
            t,
            e,
            a
          );
          break;
        } else if (t.tag === 1) {
          var l = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof l.componentDidCatch == "function" && (Aa === null || !Aa.has(l))) {
            e = Nt(a, e), a = vf(2), l = ya(t, a, 2), l !== null && (mf(
              a,
              l,
              t,
              e
            ), ha(l, 2), Vt(l));
            break;
          }
        }
        t = t.return;
      }
  }
  function fs(e, t, a) {
    var l = e.pingCache;
    if (l === null) {
      l = e.pingCache = new Kv();
      var n = /* @__PURE__ */ new Set();
      l.set(t, n);
    } else
      n = l.get(t), n === void 0 && (n = /* @__PURE__ */ new Set(), l.set(t, n));
    n.has(a) || (ts = !0, n.add(a), e = Pv.bind(null, e, t, a), t.then(e, e));
  }
  function Pv(e, t, a) {
    var l = e.pingCache;
    l !== null && l.delete(t), e.pingedLanes |= e.suspendedLanes & a, e.warmLanes &= ~a, Me === e && (ve & a) === a && (qe === 4 || qe === 3 && (ve & 62914560) === ve && 300 > xt() - ns ? (Se & 2) === 0 && Bl(e, 0) : as |= a, ql === ve && (ql = 0)), Vt(e);
  }
  function fd(e, t) {
    t === 0 && (t = Fl()), e = xl(e, t), e !== null && (ha(e, t), Vt(e));
  }
  function Iv(e) {
    var t = e.memoizedState, a = 0;
    t !== null && (a = t.retryLane), fd(e, a);
  }
  function em(e, t) {
    var a = 0;
    switch (e.tag) {
      case 13:
        var l = e.stateNode, n = e.memoizedState;
        n !== null && (a = n.retryLane);
        break;
      case 19:
        l = e.stateNode;
        break;
      case 22:
        l = e.stateNode._retryCache;
        break;
      default:
        throw Error(f(314));
    }
    l !== null && l.delete(t), fd(e, a);
  }
  function tm(e, t) {
    return Wl(e, t);
  }
  var tu = null, Yl = null, ds = !1, au = !1, hs = !1, Ia = 0;
  function Vt(e) {
    e !== Yl && e.next === null && (Yl === null ? tu = Yl = e : Yl = Yl.next = e), au = !0, ds || (ds = !0, lm());
  }
  function Hn(e, t) {
    if (!hs && au) {
      hs = !0;
      do
        for (var a = !1, l = tu; l !== null; ) {
          if (e !== 0) {
            var n = l.pendingLanes;
            if (n === 0) var i = 0;
            else {
              var s = l.suspendedLanes, r = l.pingedLanes;
              i = (1 << 31 - $e(42 | e) + 1) - 1, i &= n & ~(s & ~r), i = i & 201326741 ? i & 201326741 | 1 : i ? i | 2 : 0;
            }
            i !== 0 && (a = !0, md(l, i));
          } else
            i = ve, i = nl(
              l,
              l === Me ? i : 0,
              l.cancelPendingCommit !== null || l.timeoutHandle !== -1
            ), (i & 3) === 0 || ut(l, i) || (a = !0, md(l, i));
          l = l.next;
        }
      while (a);
      hs = !1;
    }
  }
  function am() {
    dd();
  }
  function dd() {
    au = ds = !1;
    var e = 0;
    Ia !== 0 && (fm() && (e = Ia), Ia = 0);
    for (var t = xt(), a = null, l = tu; l !== null; ) {
      var n = l.next, i = hd(l, t);
      i === 0 ? (l.next = null, a === null ? tu = n : a.next = n, n === null && (Yl = a)) : (a = l, (e !== 0 || (i & 3) !== 0) && (au = !0)), l = n;
    }
    Hn(e);
  }
  function hd(e, t) {
    for (var a = e.suspendedLanes, l = e.pingedLanes, n = e.expirationTimes, i = e.pendingLanes & -62914561; 0 < i; ) {
      var s = 31 - $e(i), r = 1 << s, d = n[s];
      d === -1 ? ((r & a) === 0 || (r & l) !== 0) && (n[s] = zu(r, t)) : d <= t && (e.expiredLanes |= r), i &= ~r;
    }
    if (t = Me, a = ve, a = nl(
      e,
      e === t ? a : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l = e.callbackNode, a === 0 || e === t && (je === 2 || je === 9) || e.cancelPendingCommit !== null)
      return l !== null && l !== null && al(l), e.callbackNode = null, e.callbackPriority = 0;
    if ((a & 3) === 0 || ut(e, a)) {
      if (t = a & -a, t === e.callbackPriority) return t;
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
      return l = vd.bind(null, e), a = Wl(a, l), e.callbackPriority = t, e.callbackNode = a, t;
    }
    return l !== null && l !== null && al(l), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function vd(e, t) {
    if (Fe !== 0 && Fe !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var a = e.callbackNode;
    if (eu() && e.callbackNode !== a)
      return null;
    var l = ve;
    return l = nl(
      e,
      e === Me ? l : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), l === 0 ? null : (Wf(e, l, t), hd(e, xt()), e.callbackNode != null && e.callbackNode === a ? vd.bind(null, e) : null);
  }
  function md(e, t) {
    if (eu()) return null;
    Wf(e, t, !0);
  }
  function lm() {
    hm(function() {
      (Se & 6) !== 0 ? Wl(
        it,
        am
      ) : dd();
    });
  }
  function vs() {
    return Ia === 0 && (Ia = ci()), Ia;
  }
  function pd(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : hi("" + e);
  }
  function gd(e, t) {
    var a = t.ownerDocument.createElement("input");
    return a.name = t.name, a.value = t.value, e.id && a.setAttribute("form", e.id), t.parentNode.insertBefore(a, t), e = new FormData(e), a.parentNode.removeChild(a), e;
  }
  function nm(e, t, a, l, n) {
    if (t === "submit" && a && a.stateNode === n) {
      var i = pd(
        (n[Xe] || null).action
      ), s = l.submitter;
      s && (t = (t = s[Xe] || null) ? pd(t.formAction) : s.getAttribute("formAction"), t !== null && (i = t, s = null));
      var r = new gi(
        "action",
        "action",
        null,
        l,
        n
      );
      e.push({
        event: r,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (l.defaultPrevented) {
                if (Ia !== 0) {
                  var d = s ? gd(n, s) : new FormData(n);
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
                typeof i == "function" && (r.preventDefault(), d = s ? gd(n, s) : new FormData(n), wc(
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
    wt(
      im,
      "on" + um
    );
  }
  wt(Jr, "onAnimationEnd"), wt($r, "onAnimationIteration"), wt(Wr, "onAnimationStart"), wt("dblclick", "onDoubleClick"), wt("focusin", "onFocus"), wt("focusout", "onBlur"), wt(Nv, "onTransitionRun"), wt(Tv, "onTransitionStart"), wt(Ev, "onTransitionCancel"), wt(Fr, "onTransitionEnd"), ol("onMouseEnter", ["mouseout", "mouseover"]), ol("onMouseLeave", ["mouseout", "mouseover"]), ol("onPointerEnter", ["pointerout", "pointerover"]), ol("onPointerLeave", ["pointerout", "pointerover"]), Ha(
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
  function yd(e, t) {
    t = (t & 4) !== 0;
    for (var a = 0; a < e.length; a++) {
      var l = e[a], n = l.event;
      l = l.listeners;
      e: {
        var i = void 0;
        if (t)
          for (var s = l.length - 1; 0 <= s; s--) {
            var r = l[s], d = r.instance, x = r.currentTarget;
            if (r = r.listener, d !== i && n.isPropagationStopped())
              break e;
            i = r, n.currentTarget = x;
            try {
              i(n);
            } catch (z) {
              Xi(z);
            }
            n.currentTarget = null, i = d;
          }
        else
          for (s = 0; s < l.length; s++) {
            if (r = l[s], d = r.instance, x = r.currentTarget, r = r.listener, d !== i && n.isPropagationStopped())
              break e;
            i = r, n.currentTarget = x;
            try {
              i(n);
            } catch (z) {
              Xi(z);
            }
            n.currentTarget = null, i = d;
          }
      }
    }
  }
  function he(e, t) {
    var a = t[Mu];
    a === void 0 && (a = t[Mu] = /* @__PURE__ */ new Set());
    var l = e + "__bubble";
    a.has(l) || (bd(t, e, 2, !1), a.add(l));
  }
  function gs(e, t, a) {
    var l = 0;
    t && (l |= 4), bd(
      a,
      e,
      l,
      t
    );
  }
  var lu = "_reactListening" + Math.random().toString(36).slice(2);
  function ys(e) {
    if (!e[lu]) {
      e[lu] = !0, or.forEach(function(a) {
        a !== "selectionchange" && (cm.has(a) || gs(a, !1, e), gs(a, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[lu] || (t[lu] = !0, gs("selectionchange", !1, t));
    }
  }
  function bd(e, t, a, l) {
    switch (Xd(t)) {
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
      t,
      a,
      e
    ), n = void 0, !Yu || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (n = !0), l ? n !== void 0 ? e.addEventListener(t, a, {
      capture: !0,
      passive: n
    }) : e.addEventListener(t, a, !0) : n !== void 0 ? e.addEventListener(t, a, {
      passive: n
    }) : e.addEventListener(t, a, !1);
  }
  function bs(e, t, a, l, n) {
    var i = l;
    if ((t & 1) === 0 && (t & 2) === 0 && l !== null)
      e: for (; ; ) {
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
              continue e;
            }
            r = r.parentNode;
          }
        }
        l = l.return;
      }
    Tr(function() {
      var x = i, z = Bu(a), O = [];
      e: {
        var S = Pr.get(e);
        if (S !== void 0) {
          var N = gi, ie = e;
          switch (e) {
            case "keypress":
              if (mi(a) === 0) break e;
            case "keydown":
            case "keyup":
              N = tv;
              break;
            case "focusin":
              ie = "focus", N = Qu;
              break;
            case "focusout":
              ie = "blur", N = Qu;
              break;
            case "beforeblur":
            case "afterblur":
              N = Qu;
              break;
            case "click":
              if (a.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              N = Ar;
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
            case Jr:
            case $r:
            case Wr:
              N = Vh;
              break;
            case Fr:
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
              N = Mr;
              break;
            case "toggle":
            case "beforetoggle":
              N = ov;
          }
          var ae = (t & 4) !== 0, _e = !ae && (e === "scroll" || e === "scrollend"), g = ae ? S !== null ? S + "Capture" : null : S;
          ae = [];
          for (var m = x, y; m !== null; ) {
            var M = m;
            if (y = M.stateNode, M = M.tag, M !== 5 && M !== 26 && M !== 27 || y === null || g === null || (M = an(m, g), M != null && ae.push(
              kn(m, M, y)
            )), _e) break;
            m = m.return;
          }
          0 < ae.length && (S = new N(
            S,
            ie,
            null,
            a,
            z
          ), O.push({ event: S, listeners: ae }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (S = e === "mouseover" || e === "pointerover", N = e === "mouseout" || e === "pointerout", S && a !== Hu && (ie = a.relatedTarget || a.fromElement) && (cl(ie) || ie[Ut]))
            break e;
          if ((N || S) && (S = z.window === z ? z : (S = z.ownerDocument) ? S.defaultView || S.parentWindow : window, N ? (ie = a.relatedTarget || a.toElement, N = x, ie = ie ? cl(ie) : null, ie !== null && (_e = T(ie), ae = ie.tag, ie !== _e || ae !== 5 && ae !== 27 && ae !== 6) && (ie = null)) : (N = null, ie = x), N !== ie)) {
            if (ae = Ar, M = "onMouseLeave", g = "onMouseEnter", m = "mouse", (e === "pointerout" || e === "pointerover") && (ae = Mr, M = "onPointerLeave", g = "onPointerEnter", m = "pointer"), _e = N == null ? S : tn(N), y = ie == null ? S : tn(ie), S = new ae(
              M,
              m + "leave",
              N,
              a,
              z
            ), S.target = _e, S.relatedTarget = y, M = null, cl(z) === x && (ae = new ae(
              g,
              m + "enter",
              ie,
              a,
              z
            ), ae.target = y, ae.relatedTarget = _e, M = ae), _e = M, N && ie)
              t: {
                for (ae = N, g = ie, m = 0, y = ae; y; y = Gl(y))
                  m++;
                for (y = 0, M = g; M; M = Gl(M))
                  y++;
                for (; 0 < m - y; )
                  ae = Gl(ae), m--;
                for (; 0 < y - m; )
                  g = Gl(g), y--;
                for (; m--; ) {
                  if (ae === g || g !== null && ae === g.alternate)
                    break t;
                  ae = Gl(ae), g = Gl(g);
                }
                ae = null;
              }
            else ae = null;
            N !== null && xd(
              O,
              S,
              N,
              ae,
              !1
            ), ie !== null && _e !== null && xd(
              O,
              _e,
              ie,
              ae,
              !0
            );
          }
        }
        e: {
          if (S = x ? tn(x) : window, N = S.nodeName && S.nodeName.toLowerCase(), N === "select" || N === "input" && S.type === "file")
            var V = Hr;
          else if (qr(S))
            if (Br)
              V = xv;
            else {
              V = yv;
              var oe = gv;
            }
          else
            N = S.nodeName, !N || N.toLowerCase() !== "input" || S.type !== "checkbox" && S.type !== "radio" ? x && Cu(x.elementType) && (V = Hr) : V = bv;
          if (V && (V = V(e, x))) {
            Cr(
              O,
              V,
              a,
              z
            );
            break e;
          }
          oe && oe(e, S, x), e === "focusout" && x && S.type === "number" && x.memoizedProps.value != null && qu(S, "number", S.value);
        }
        switch (oe = x ? tn(x) : window, e) {
          case "focusin":
            (qr(oe) || oe.contentEditable === "true") && (gl = oe, Wu = x, fn = null);
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
            Fu = !1, Vr(O, a, z);
            break;
          case "selectionchange":
            if (jv) break;
          case "keydown":
          case "keyup":
            Vr(O, a, z);
        }
        var $;
        if (Vu)
          e: {
            switch (e) {
              case "compositionstart":
                var le = "onCompositionStart";
                break e;
              case "compositionend":
                le = "onCompositionEnd";
                break e;
              case "compositionupdate":
                le = "onCompositionUpdate";
                break e;
            }
            le = void 0;
          }
        else
          pl ? Ur(e, a) && (le = "onCompositionEnd") : e === "keydown" && a.keyCode === 229 && (le = "onCompositionStart");
        le && (Or && a.locale !== "ko" && (pl || le !== "onCompositionStart" ? le === "onCompositionEnd" && pl && ($ = Er()) : (va = z, Gu = "value" in va ? va.value : va.textContent, pl = !0)), oe = nu(x, le), 0 < oe.length && (le = new zr(
          le,
          e,
          null,
          a,
          z
        ), O.push({ event: le, listeners: oe }), $ ? le.data = $ : ($ = wr(a), $ !== null && (le.data = $)))), ($ = dv ? hv(e, a) : vv(e, a)) && (le = nu(x, "onBeforeInput"), 0 < le.length && (oe = new zr(
          "onBeforeInput",
          "beforeinput",
          null,
          a,
          z
        ), O.push({
          event: oe,
          listeners: le
        }), oe.data = $)), nm(
          O,
          e,
          x,
          a,
          z
        );
      }
      yd(O, t);
    });
  }
  function kn(e, t, a) {
    return {
      instance: e,
      listener: t,
      currentTarget: a
    };
  }
  function nu(e, t) {
    for (var a = t + "Capture", l = []; e !== null; ) {
      var n = e, i = n.stateNode;
      if (n = n.tag, n !== 5 && n !== 26 && n !== 27 || i === null || (n = an(e, a), n != null && l.unshift(
        kn(e, n, i)
      ), n = an(e, t), n != null && l.push(
        kn(e, n, i)
      )), e.tag === 3) return l;
      e = e.return;
    }
    return [];
  }
  function Gl(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function xd(e, t, a, l, n) {
    for (var i = t._reactName, s = []; a !== null && a !== l; ) {
      var r = a, d = r.alternate, x = r.stateNode;
      if (r = r.tag, d !== null && d === l) break;
      r !== 5 && r !== 26 && r !== 27 || x === null || (d = x, n ? (x = an(a, i), x != null && s.unshift(
        kn(a, x, d)
      )) : n || (x = an(a, i), x != null && s.push(
        kn(a, x, d)
      ))), a = a.return;
    }
    s.length !== 0 && e.push({ event: t, listeners: s });
  }
  var sm = /\r\n?/g, rm = /\u0000|\uFFFD/g;
  function Sd(e) {
    return (typeof e == "string" ? e : "" + e).replace(sm, `
`).replace(rm, "");
  }
  function jd(e, t) {
    return t = Sd(t), Sd(e) === t;
  }
  function iu() {
  }
  function Ee(e, t, a, l, n, i) {
    switch (a) {
      case "children":
        typeof l == "string" ? t === "body" || t === "textarea" && l === "" || hl(e, l) : (typeof l == "number" || typeof l == "bigint") && t !== "body" && hl(e, "" + l);
        break;
      case "className":
        oi(e, "class", l);
        break;
      case "tabIndex":
        oi(e, "tabindex", l);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        oi(e, a, l);
        break;
      case "style":
        jr(e, l, i);
        break;
      case "data":
        if (t !== "object") {
          oi(e, "data", l);
          break;
        }
      case "src":
      case "href":
        if (l === "" && (t !== "a" || a !== "href")) {
          e.removeAttribute(a);
          break;
        }
        if (l == null || typeof l == "function" || typeof l == "symbol" || typeof l == "boolean") {
          e.removeAttribute(a);
          break;
        }
        l = hi("" + l), e.setAttribute(a, l);
        break;
      case "action":
      case "formAction":
        if (typeof l == "function") {
          e.setAttribute(
            a,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof i == "function" && (a === "formAction" ? (t !== "input" && Ee(e, t, "name", n.name, n, null), Ee(
            e,
            t,
            "formEncType",
            n.formEncType,
            n,
            null
          ), Ee(
            e,
            t,
            "formMethod",
            n.formMethod,
            n,
            null
          ), Ee(
            e,
            t,
            "formTarget",
            n.formTarget,
            n,
            null
          )) : (Ee(e, t, "encType", n.encType, n, null), Ee(e, t, "method", n.method, n, null), Ee(e, t, "target", n.target, n, null)));
        if (l == null || typeof l == "symbol" || typeof l == "boolean") {
          e.removeAttribute(a);
          break;
        }
        l = hi("" + l), e.setAttribute(a, l);
        break;
      case "onClick":
        l != null && (e.onclick = iu);
        break;
      case "onScroll":
        l != null && he("scroll", e);
        break;
      case "onScrollEnd":
        l != null && he("scrollend", e);
        break;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l))
            throw Error(f(61));
          if (a = l.__html, a != null) {
            if (n.children != null) throw Error(f(60));
            e.innerHTML = a;
          }
        }
        break;
      case "multiple":
        e.multiple = l && typeof l != "function" && typeof l != "symbol";
        break;
      case "muted":
        e.muted = l && typeof l != "function" && typeof l != "symbol";
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
          e.removeAttribute("xlink:href");
          break;
        }
        a = hi("" + l), e.setAttributeNS(
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
        l != null && typeof l != "function" && typeof l != "symbol" ? e.setAttribute(a, "" + l) : e.removeAttribute(a);
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
        l && typeof l != "function" && typeof l != "symbol" ? e.setAttribute(a, "") : e.removeAttribute(a);
        break;
      case "capture":
      case "download":
        l === !0 ? e.setAttribute(a, "") : l !== !1 && l != null && typeof l != "function" && typeof l != "symbol" ? e.setAttribute(a, l) : e.removeAttribute(a);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        l != null && typeof l != "function" && typeof l != "symbol" && !isNaN(l) && 1 <= l ? e.setAttribute(a, l) : e.removeAttribute(a);
        break;
      case "rowSpan":
      case "start":
        l == null || typeof l == "function" || typeof l == "symbol" || isNaN(l) ? e.removeAttribute(a) : e.setAttribute(a, l);
        break;
      case "popover":
        he("beforetoggle", e), he("toggle", e), ri(e, "popover", l);
        break;
      case "xlinkActuate":
        $t(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          l
        );
        break;
      case "xlinkArcrole":
        $t(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          l
        );
        break;
      case "xlinkRole":
        $t(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          l
        );
        break;
      case "xlinkShow":
        $t(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          l
        );
        break;
      case "xlinkTitle":
        $t(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          l
        );
        break;
      case "xlinkType":
        $t(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          l
        );
        break;
      case "xmlBase":
        $t(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          l
        );
        break;
      case "xmlLang":
        $t(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          l
        );
        break;
      case "xmlSpace":
        $t(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          l
        );
        break;
      case "is":
        ri(e, "is", l);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < a.length) || a[0] !== "o" && a[0] !== "O" || a[1] !== "n" && a[1] !== "N") && (a = kh.get(a) || a, ri(e, a, l));
    }
  }
  function xs(e, t, a, l, n, i) {
    switch (a) {
      case "style":
        jr(e, l, i);
        break;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l))
            throw Error(f(61));
          if (a = l.__html, a != null) {
            if (n.children != null) throw Error(f(60));
            e.innerHTML = a;
          }
        }
        break;
      case "children":
        typeof l == "string" ? hl(e, l) : (typeof l == "number" || typeof l == "bigint") && hl(e, "" + l);
        break;
      case "onScroll":
        l != null && he("scroll", e);
        break;
      case "onScrollEnd":
        l != null && he("scrollend", e);
        break;
      case "onClick":
        l != null && (e.onclick = iu);
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
        if (!fr.hasOwnProperty(a))
          e: {
            if (a[0] === "o" && a[1] === "n" && (n = a.endsWith("Capture"), t = a.slice(2, n ? a.length - 7 : void 0), i = e[Xe] || null, i = i != null ? i[a] : null, typeof i == "function" && e.removeEventListener(t, i, n), typeof l == "function")) {
              typeof i != "function" && i !== null && (a in e ? e[a] = null : e.hasAttribute(a) && e.removeAttribute(a)), e.addEventListener(t, l, n);
              break e;
            }
            a in e ? e[a] = l : l === !0 ? e.setAttribute(a, "") : ri(e, a, l);
          }
    }
  }
  function Pe(e, t, a) {
    switch (t) {
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
        he("error", e), he("load", e);
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
                  throw Error(f(137, t));
                default:
                  Ee(e, t, i, s, a, null);
              }
          }
        n && Ee(e, t, "srcSet", a.srcSet, a, null), l && Ee(e, t, "src", a.src, a, null);
        return;
      case "input":
        he("invalid", e);
        var r = i = s = n = null, d = null, x = null;
        for (l in a)
          if (a.hasOwnProperty(l)) {
            var z = a[l];
            if (z != null)
              switch (l) {
                case "name":
                  n = z;
                  break;
                case "type":
                  s = z;
                  break;
                case "checked":
                  d = z;
                  break;
                case "defaultChecked":
                  x = z;
                  break;
                case "value":
                  i = z;
                  break;
                case "defaultValue":
                  r = z;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (z != null)
                    throw Error(f(137, t));
                  break;
                default:
                  Ee(e, t, l, z, a, null);
              }
          }
        yr(
          e,
          i,
          r,
          d,
          x,
          s,
          n,
          !1
        ), fi(e);
        return;
      case "select":
        he("invalid", e), l = s = i = null;
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
                Ee(e, t, n, r, a, null);
            }
        t = i, a = s, e.multiple = !!l, t != null ? dl(e, !!l, t, !1) : a != null && dl(e, !!l, a, !0);
        return;
      case "textarea":
        he("invalid", e), i = n = l = null;
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
                Ee(e, t, s, r, a, null);
            }
        xr(e, l, n, i), fi(e);
        return;
      case "option":
        for (d in a)
          if (a.hasOwnProperty(d) && (l = a[d], l != null))
            switch (d) {
              case "selected":
                e.selected = l && typeof l != "function" && typeof l != "symbol";
                break;
              default:
                Ee(e, t, d, l, a, null);
            }
        return;
      case "dialog":
        he("beforetoggle", e), he("toggle", e), he("cancel", e), he("close", e);
        break;
      case "iframe":
      case "object":
        he("load", e);
        break;
      case "video":
      case "audio":
        for (l = 0; l < Bn.length; l++)
          he(Bn[l], e);
        break;
      case "image":
        he("error", e), he("load", e);
        break;
      case "details":
        he("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        he("error", e), he("load", e);
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
                throw Error(f(137, t));
              default:
                Ee(e, t, x, l, a, null);
            }
        return;
      default:
        if (Cu(t)) {
          for (z in a)
            a.hasOwnProperty(z) && (l = a[z], l !== void 0 && xs(
              e,
              t,
              z,
              l,
              a,
              void 0
            ));
          return;
        }
    }
    for (r in a)
      a.hasOwnProperty(r) && (l = a[r], l != null && Ee(e, t, r, l, a, null));
  }
  function om(e, t, a, l) {
    switch (t) {
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
        var n = null, i = null, s = null, r = null, d = null, x = null, z = null;
        for (N in a) {
          var O = a[N];
          if (a.hasOwnProperty(N) && O != null)
            switch (N) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                d = O;
              default:
                l.hasOwnProperty(N) || Ee(e, t, N, null, l, O);
            }
        }
        for (var S in l) {
          var N = l[S];
          if (O = a[S], l.hasOwnProperty(S) && (N != null || O != null))
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
                z = N;
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
                  throw Error(f(137, t));
                break;
              default:
                N !== O && Ee(
                  e,
                  t,
                  S,
                  N,
                  l,
                  O
                );
            }
        }
        wu(
          e,
          s,
          r,
          d,
          x,
          z,
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
                l.hasOwnProperty(i) || Ee(
                  e,
                  t,
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
                i !== d && Ee(
                  e,
                  t,
                  n,
                  i,
                  l,
                  d
                );
            }
        t = r, a = s, l = N, S != null ? dl(e, !!a, S, !1) : !!l != !!a && (t != null ? dl(e, !!a, t, !0) : dl(e, !!a, a ? [] : "", !1));
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
                Ee(e, t, r, null, l, n);
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
                n !== i && Ee(e, t, s, n, l, i);
            }
        br(e, S, N);
        return;
      case "option":
        for (var ie in a)
          if (S = a[ie], a.hasOwnProperty(ie) && S != null && !l.hasOwnProperty(ie))
            switch (ie) {
              case "selected":
                e.selected = !1;
                break;
              default:
                Ee(
                  e,
                  t,
                  ie,
                  null,
                  l,
                  S
                );
            }
        for (d in l)
          if (S = l[d], N = a[d], l.hasOwnProperty(d) && S !== N && (S != null || N != null))
            switch (d) {
              case "selected":
                e.selected = S && typeof S != "function" && typeof S != "symbol";
                break;
              default:
                Ee(
                  e,
                  t,
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
        for (var ae in a)
          S = a[ae], a.hasOwnProperty(ae) && S != null && !l.hasOwnProperty(ae) && Ee(e, t, ae, null, l, S);
        for (x in l)
          if (S = l[x], N = a[x], l.hasOwnProperty(x) && S !== N && (S != null || N != null))
            switch (x) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (S != null)
                  throw Error(f(137, t));
                break;
              default:
                Ee(
                  e,
                  t,
                  x,
                  S,
                  l,
                  N
                );
            }
        return;
      default:
        if (Cu(t)) {
          for (var _e in a)
            S = a[_e], a.hasOwnProperty(_e) && S !== void 0 && !l.hasOwnProperty(_e) && xs(
              e,
              t,
              _e,
              void 0,
              l,
              S
            );
          for (z in l)
            S = l[z], N = a[z], !l.hasOwnProperty(z) || S === N || S === void 0 && N === void 0 || xs(
              e,
              t,
              z,
              S,
              l,
              N
            );
          return;
        }
    }
    for (var g in a)
      S = a[g], a.hasOwnProperty(g) && S != null && !l.hasOwnProperty(g) && Ee(e, t, g, null, l, S);
    for (O in l)
      S = l[O], N = a[O], !l.hasOwnProperty(O) || S === N || S == null && N == null || Ee(e, t, O, S, l, N);
  }
  var Ss = null, js = null;
  function uu(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function Nd(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Td(e, t) {
    if (e === 0)
      switch (t) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return e === 1 && t === "foreignObject" ? 0 : e;
  }
  function Ns(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var Ts = null;
  function fm() {
    var e = window.event;
    return e && e.type === "popstate" ? e === Ts ? !1 : (Ts = e, !0) : (Ts = null, !1);
  }
  var Ed = typeof setTimeout == "function" ? setTimeout : void 0, dm = typeof clearTimeout == "function" ? clearTimeout : void 0, _d = typeof Promise == "function" ? Promise : void 0, hm = typeof queueMicrotask == "function" ? queueMicrotask : typeof _d < "u" ? function(e) {
    return _d.resolve(null).then(e).catch(vm);
  } : Ed;
  function vm(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function Oa(e) {
    return e === "head";
  }
  function Ad(e, t) {
    var a = t, l = 0, n = 0;
    do {
      var i = a.nextSibling;
      if (e.removeChild(a), i && i.nodeType === 8)
        if (a = i.data, a === "/$") {
          if (0 < l && 8 > l) {
            a = l;
            var s = e.ownerDocument;
            if (a & 1 && Yn(s.documentElement), a & 2 && Yn(s.body), a & 4)
              for (a = s.head, Yn(a), s = a.firstChild; s; ) {
                var r = s.nextSibling, d = s.nodeName;
                s[en] || d === "SCRIPT" || d === "STYLE" || d === "LINK" && s.rel.toLowerCase() === "stylesheet" || a.removeChild(s), s = r;
              }
          }
          if (n === 0) {
            e.removeChild(i), Jn(t);
            return;
          }
          n--;
        } else
          a === "$" || a === "$?" || a === "$!" ? n++ : l = a.charCodeAt(0) - 48;
      else l = 0;
      a = i;
    } while (a);
    Jn(t);
  }
  function Es(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var a = t;
      switch (t = t.nextSibling, a.nodeName) {
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
      e.removeChild(a);
    }
  }
  function mm(e, t, a, l) {
    for (; e.nodeType === 1; ) {
      var n = a;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!l && (e.nodeName !== "INPUT" || e.type !== "hidden"))
          break;
      } else if (l) {
        if (!e[en])
          switch (t) {
            case "meta":
              if (!e.hasAttribute("itemprop")) break;
              return e;
            case "link":
              if (i = e.getAttribute("rel"), i === "stylesheet" && e.hasAttribute("data-precedence"))
                break;
              if (i !== n.rel || e.getAttribute("href") !== (n.href == null || n.href === "" ? null : n.href) || e.getAttribute("crossorigin") !== (n.crossOrigin == null ? null : n.crossOrigin) || e.getAttribute("title") !== (n.title == null ? null : n.title))
                break;
              return e;
            case "style":
              if (e.hasAttribute("data-precedence")) break;
              return e;
            case "script":
              if (i = e.getAttribute("src"), (i !== (n.src == null ? null : n.src) || e.getAttribute("type") !== (n.type == null ? null : n.type) || e.getAttribute("crossorigin") !== (n.crossOrigin == null ? null : n.crossOrigin)) && i && e.hasAttribute("async") && !e.hasAttribute("itemprop"))
                break;
              return e;
            default:
              return e;
          }
      } else if (t === "input" && e.type === "hidden") {
        var i = n.name == null ? null : "" + n.name;
        if (n.type === "hidden" && e.getAttribute("name") === i)
          return e;
      } else return e;
      if (e = Ct(e.nextSibling), e === null) break;
    }
    return null;
  }
  function pm(e, t, a) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !a || (e = Ct(e.nextSibling), e === null)) return null;
    return e;
  }
  function _s(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState === "complete";
  }
  function gm(e, t) {
    var a = e.ownerDocument;
    if (e.data !== "$?" || a.readyState === "complete")
      t();
    else {
      var l = function() {
        t(), a.removeEventListener("DOMContentLoaded", l);
      };
      a.addEventListener("DOMContentLoaded", l), e._reactRetry = l;
    }
  }
  function Ct(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (t = e.data, t === "$" || t === "$!" || t === "$?" || t === "F!" || t === "F")
          break;
        if (t === "/$") return null;
      }
    }
    return e;
  }
  var As = null;
  function zd(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var a = e.data;
        if (a === "$" || a === "$!" || a === "$?") {
          if (t === 0) return e;
          t--;
        } else a === "/$" && t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  function Md(e, t, a) {
    switch (t = uu(a), e) {
      case "html":
        if (e = t.documentElement, !e) throw Error(f(452));
        return e;
      case "head":
        if (e = t.head, !e) throw Error(f(453));
        return e;
      case "body":
        if (e = t.body, !e) throw Error(f(454));
        return e;
      default:
        throw Error(f(451));
    }
  }
  function Yn(e) {
    for (var t = e.attributes; t.length; )
      e.removeAttributeNode(t[0]);
    Ou(e);
  }
  var Mt = /* @__PURE__ */ new Map(), Od = /* @__PURE__ */ new Set();
  function cu(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
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
    var e = ra.f(), t = Pi();
    return e || t;
  }
  function bm(e) {
    var t = sl(e);
    t !== null && t.tag === 5 && t.type === "form" ? $o(t) : ra.r(e);
  }
  var Ll = typeof document > "u" ? null : document;
  function Dd(e, t, a) {
    var l = Ll;
    if (l && typeof t == "string" && t) {
      var n = jt(t);
      n = 'link[rel="' + e + '"][href="' + n + '"]', typeof a == "string" && (n += '[crossorigin="' + a + '"]'), Od.has(n) || (Od.add(n), e = { rel: e, crossOrigin: a, href: t }, l.querySelector(n) === null && (t = l.createElement("link"), Pe(t, "link", e), Qe(t), l.head.appendChild(t)));
    }
  }
  function xm(e) {
    ra.D(e), Dd("dns-prefetch", e, null);
  }
  function Sm(e, t) {
    ra.C(e, t), Dd("preconnect", e, t);
  }
  function jm(e, t, a) {
    ra.L(e, t, a);
    var l = Ll;
    if (l && e && t) {
      var n = 'link[rel="preload"][as="' + jt(t) + '"]';
      t === "image" && a && a.imageSrcSet ? (n += '[imagesrcset="' + jt(
        a.imageSrcSet
      ) + '"]', typeof a.imageSizes == "string" && (n += '[imagesizes="' + jt(
        a.imageSizes
      ) + '"]')) : n += '[href="' + jt(e) + '"]';
      var i = n;
      switch (t) {
        case "style":
          i = Xl(e);
          break;
        case "script":
          i = Ql(e);
      }
      Mt.has(i) || (e = U(
        {
          rel: "preload",
          href: t === "image" && a && a.imageSrcSet ? void 0 : e,
          as: t
        },
        a
      ), Mt.set(i, e), l.querySelector(n) !== null || t === "style" && l.querySelector(Gn(i)) || t === "script" && l.querySelector(Ln(i)) || (t = l.createElement("link"), Pe(t, "link", e), Qe(t), l.head.appendChild(t)));
    }
  }
  function Nm(e, t) {
    ra.m(e, t);
    var a = Ll;
    if (a && e) {
      var l = t && typeof t.as == "string" ? t.as : "script", n = 'link[rel="modulepreload"][as="' + jt(l) + '"][href="' + jt(e) + '"]', i = n;
      switch (l) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          i = Ql(e);
      }
      if (!Mt.has(i) && (e = U({ rel: "modulepreload", href: e }, t), Mt.set(i, e), a.querySelector(n) === null)) {
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
        l = a.createElement("link"), Pe(l, "link", e), Qe(l), a.head.appendChild(l);
      }
    }
  }
  function Tm(e, t, a) {
    ra.S(e, t, a);
    var l = Ll;
    if (l && e) {
      var n = rl(l).hoistableStyles, i = Xl(e);
      t = t || "default";
      var s = n.get(i);
      if (!s) {
        var r = { loading: 0, preload: null };
        if (s = l.querySelector(
          Gn(i)
        ))
          r.loading = 5;
        else {
          e = U(
            { rel: "stylesheet", href: e, "data-precedence": t },
            a
          ), (a = Mt.get(i)) && zs(e, a);
          var d = s = l.createElement("link");
          Qe(d), Pe(d, "link", e), d._p = new Promise(function(x, z) {
            d.onload = x, d.onerror = z;
          }), d.addEventListener("load", function() {
            r.loading |= 1;
          }), d.addEventListener("error", function() {
            r.loading |= 2;
          }), r.loading |= 4, su(s, t, l);
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
  function Em(e, t) {
    ra.X(e, t);
    var a = Ll;
    if (a && e) {
      var l = rl(a).hoistableScripts, n = Ql(e), i = l.get(n);
      i || (i = a.querySelector(Ln(n)), i || (e = U({ src: e, async: !0 }, t), (t = Mt.get(n)) && Ms(e, t), i = a.createElement("script"), Qe(i), Pe(i, "link", e), a.head.appendChild(i)), i = {
        type: "script",
        instance: i,
        count: 1,
        state: null
      }, l.set(n, i));
    }
  }
  function _m(e, t) {
    ra.M(e, t);
    var a = Ll;
    if (a && e) {
      var l = rl(a).hoistableScripts, n = Ql(e), i = l.get(n);
      i || (i = a.querySelector(Ln(n)), i || (e = U({ src: e, async: !0, type: "module" }, t), (t = Mt.get(n)) && Ms(e, t), i = a.createElement("script"), Qe(i), Pe(i, "link", e), a.head.appendChild(i)), i = {
        type: "script",
        instance: i,
        count: 1,
        state: null
      }, l.set(n, i));
    }
  }
  function Rd(e, t, a, l) {
    var n = (n = K.current) ? cu(n) : null;
    if (!n) throw Error(f(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof a.precedence == "string" && typeof a.href == "string" ? (t = Xl(a.href), a = rl(
          n
        ).hoistableStyles, l = a.get(t), l || (l = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, a.set(t, l)), l) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (a.rel === "stylesheet" && typeof a.href == "string" && typeof a.precedence == "string") {
          e = Xl(a.href);
          var i = rl(
            n
          ).hoistableStyles, s = i.get(e);
          if (s || (n = n.ownerDocument || n, s = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, i.set(e, s), (i = n.querySelector(
            Gn(e)
          )) && !i._p && (s.instance = i, s.state.loading = 5), Mt.has(e) || (a = {
            rel: "preload",
            as: "style",
            href: a.href,
            crossOrigin: a.crossOrigin,
            integrity: a.integrity,
            media: a.media,
            hrefLang: a.hrefLang,
            referrerPolicy: a.referrerPolicy
          }, Mt.set(e, a), i || Am(
            n,
            e,
            a,
            s.state
          ))), t && l === null)
            throw Error(f(528, ""));
          return s;
        }
        if (t && l !== null)
          throw Error(f(529, ""));
        return null;
      case "script":
        return t = a.async, a = a.src, typeof a == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = Ql(a), a = rl(
          n
        ).hoistableScripts, l = a.get(t), l || (l = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, a.set(t, l)), l) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(f(444, e));
    }
  }
  function Xl(e) {
    return 'href="' + jt(e) + '"';
  }
  function Gn(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function Ud(e) {
    return U({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function Am(e, t, a, l) {
    e.querySelector('link[rel="preload"][as="style"][' + t + "]") ? l.loading = 1 : (t = e.createElement("link"), l.preload = t, t.addEventListener("load", function() {
      return l.loading |= 1;
    }), t.addEventListener("error", function() {
      return l.loading |= 2;
    }), Pe(t, "link", a), Qe(t), e.head.appendChild(t));
  }
  function Ql(e) {
    return '[src="' + jt(e) + '"]';
  }
  function Ln(e) {
    return "script[async]" + e;
  }
  function wd(e, t, a) {
    if (t.count++, t.instance === null)
      switch (t.type) {
        case "style":
          var l = e.querySelector(
            'style[data-href~="' + jt(a.href) + '"]'
          );
          if (l)
            return t.instance = l, Qe(l), l;
          var n = U({}, a, {
            "data-href": a.href,
            "data-precedence": a.precedence,
            href: null,
            precedence: null
          });
          return l = (e.ownerDocument || e).createElement(
            "style"
          ), Qe(l), Pe(l, "style", n), su(l, a.precedence, e), t.instance = l;
        case "stylesheet":
          n = Xl(a.href);
          var i = e.querySelector(
            Gn(n)
          );
          if (i)
            return t.state.loading |= 4, t.instance = i, Qe(i), i;
          l = Ud(a), (n = Mt.get(n)) && zs(l, n), i = (e.ownerDocument || e).createElement("link"), Qe(i);
          var s = i;
          return s._p = new Promise(function(r, d) {
            s.onload = r, s.onerror = d;
          }), Pe(i, "link", l), t.state.loading |= 4, su(i, a.precedence, e), t.instance = i;
        case "script":
          return i = Ql(a.src), (n = e.querySelector(
            Ln(i)
          )) ? (t.instance = n, Qe(n), n) : (l = a, (n = Mt.get(i)) && (l = U({}, a), Ms(l, n)), e = e.ownerDocument || e, n = e.createElement("script"), Qe(n), Pe(n, "link", l), e.head.appendChild(n), t.instance = n);
        case "void":
          return null;
        default:
          throw Error(f(443, t.type));
      }
    else
      t.type === "stylesheet" && (t.state.loading & 4) === 0 && (l = t.instance, t.state.loading |= 4, su(l, a.precedence, e));
    return t.instance;
  }
  function su(e, t, a) {
    for (var l = a.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), n = l.length ? l[l.length - 1] : null, i = n, s = 0; s < l.length; s++) {
      var r = l[s];
      if (r.dataset.precedence === t) i = r;
      else if (i !== n) break;
    }
    i ? i.parentNode.insertBefore(e, i.nextSibling) : (t = a.nodeType === 9 ? a.head : a, t.insertBefore(e, t.firstChild));
  }
  function zs(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
  }
  function Ms(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity);
  }
  var ru = null;
  function qd(e, t, a) {
    if (ru === null) {
      var l = /* @__PURE__ */ new Map(), n = ru = /* @__PURE__ */ new Map();
      n.set(a, l);
    } else
      n = ru, l = n.get(a), l || (l = /* @__PURE__ */ new Map(), n.set(a, l));
    if (l.has(e)) return l;
    for (l.set(e, null), a = a.getElementsByTagName(e), n = 0; n < a.length; n++) {
      var i = a[n];
      if (!(i[en] || i[Oe] || e === "link" && i.getAttribute("rel") === "stylesheet") && i.namespaceURI !== "http://www.w3.org/2000/svg") {
        var s = i.getAttribute(t) || "";
        s = e + s;
        var r = l.get(s);
        r ? r.push(i) : l.set(s, [i]);
      }
    }
    return l;
  }
  function Cd(e, t, a) {
    e = e.ownerDocument || e, e.head.insertBefore(
      a,
      t === "title" ? e.querySelector("head > title") : null
    );
  }
  function zm(e, t, a) {
    if (a === 1 || t.itemProp != null) return !1;
    switch (e) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "")
          break;
        return !0;
      case "link":
        if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError)
          break;
        switch (t.rel) {
          case "stylesheet":
            return e = t.disabled, typeof t.precedence == "string" && e == null;
          default:
            return !0;
        }
      case "script":
        if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string")
          return !0;
    }
    return !1;
  }
  function Hd(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  var Xn = null;
  function Mm() {
  }
  function Om(e, t, a) {
    if (Xn === null) throw Error(f(475));
    var l = Xn;
    if (t.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== !1) && (t.state.loading & 4) === 0) {
      if (t.instance === null) {
        var n = Xl(a.href), i = e.querySelector(
          Gn(n)
        );
        if (i) {
          e = i._p, e !== null && typeof e == "object" && typeof e.then == "function" && (l.count++, l = ou.bind(l), e.then(l, l)), t.state.loading |= 4, t.instance = i, Qe(i);
          return;
        }
        i = e.ownerDocument || e, a = Ud(a), (n = Mt.get(n)) && zs(a, n), i = i.createElement("link"), Qe(i);
        var s = i;
        s._p = new Promise(function(r, d) {
          s.onload = r, s.onerror = d;
        }), Pe(i, "link", a), t.instance = i;
      }
      l.stylesheets === null && (l.stylesheets = /* @__PURE__ */ new Map()), l.stylesheets.set(t, e), (e = t.state.preload) && (t.state.loading & 3) === 0 && (l.count++, t = ou.bind(l), e.addEventListener("load", t), e.addEventListener("error", t));
    }
  }
  function Dm() {
    if (Xn === null) throw Error(f(475));
    var e = Xn;
    return e.stylesheets && e.count === 0 && Os(e, e.stylesheets), 0 < e.count ? function(t) {
      var a = setTimeout(function() {
        if (e.stylesheets && Os(e, e.stylesheets), e.unsuspend) {
          var l = e.unsuspend;
          e.unsuspend = null, l();
        }
      }, 6e4);
      return e.unsuspend = t, function() {
        e.unsuspend = null, clearTimeout(a);
      };
    } : null;
  }
  function ou() {
    if (this.count--, this.count === 0) {
      if (this.stylesheets) Os(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        this.unsuspend = null, e();
      }
    }
  }
  var fu = null;
  function Os(e, t) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, fu = /* @__PURE__ */ new Map(), t.forEach(Rm, e), fu = null, ou.call(e));
  }
  function Rm(e, t) {
    if (!(t.state.loading & 4)) {
      var a = fu.get(e);
      if (a) var l = a.get(null);
      else {
        a = /* @__PURE__ */ new Map(), fu.set(e, a);
        for (var n = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), i = 0; i < n.length; i++) {
          var s = n[i];
          (s.nodeName === "LINK" || s.getAttribute("media") !== "not all") && (a.set(s.dataset.precedence, s), l = s);
        }
        l && a.set(null, l);
      }
      n = t.instance, s = n.getAttribute("data-precedence"), i = a.get(s) || l, i === l && a.set(null, n), a.set(s, n), this.count++, l = ou.bind(this), n.addEventListener("load", l), n.addEventListener("error", l), i ? i.parentNode.insertBefore(n, i.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(n, e.firstChild)), t.state.loading |= 4;
    }
  }
  var Qn = {
    $$typeof: H,
    Provider: null,
    Consumer: null,
    _currentValue: te,
    _currentValue2: te,
    _threadCount: 0
  };
  function Um(e, t, a, l, n, i, s, r) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = il(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = il(0), this.hiddenUpdates = il(null), this.identifierPrefix = l, this.onUncaughtError = n, this.onCaughtError = i, this.onRecoverableError = s, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = r, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Bd(e, t, a, l, n, i, s, r, d, x, z, O) {
    return e = new Um(
      e,
      t,
      a,
      s,
      r,
      d,
      x,
      O
    ), t = 1, i === !0 && (t |= 24), i = ht(3, null, null, t), e.current = i, i.stateNode = e, t = fc(), t.refCount++, e.pooledCache = t, t.refCount++, i.memoizedState = {
      element: l,
      isDehydrated: a,
      cache: t
    }, mc(i), e;
  }
  function kd(e) {
    return e ? (e = Sl, e) : Sl;
  }
  function Yd(e, t, a, l, n, i) {
    n = kd(n), l.context === null ? l.context = n : l.pendingContext = n, l = ga(t), l.payload = { element: a }, i = i === void 0 ? null : i, i !== null && (l.callback = i), a = ya(e, l, t), a !== null && (yt(a, e, t), xn(a, e, t));
  }
  function Gd(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var a = e.retryLane;
      e.retryLane = a !== 0 && a < t ? a : t;
    }
  }
  function Ds(e, t) {
    Gd(e, t), (e = e.alternate) && Gd(e, t);
  }
  function Ld(e) {
    if (e.tag === 13) {
      var t = xl(e, 67108864);
      t !== null && yt(t, e, 67108864), Ds(e, 67108864);
    }
  }
  var du = !0;
  function wm(e, t, a, l) {
    var n = _.T;
    _.T = null;
    var i = G.p;
    try {
      G.p = 2, Rs(e, t, a, l);
    } finally {
      G.p = i, _.T = n;
    }
  }
  function qm(e, t, a, l) {
    var n = _.T;
    _.T = null;
    var i = G.p;
    try {
      G.p = 8, Rs(e, t, a, l);
    } finally {
      G.p = i, _.T = n;
    }
  }
  function Rs(e, t, a, l) {
    if (du) {
      var n = Us(l);
      if (n === null)
        bs(
          e,
          t,
          l,
          hu,
          a
        ), Qd(e, l);
      else if (Hm(
        n,
        e,
        t,
        a,
        l
      ))
        l.stopPropagation();
      else if (Qd(e, l), t & 4 && -1 < Cm.indexOf(e)) {
        for (; n !== null; ) {
          var i = sl(n);
          if (i !== null)
            switch (i.tag) {
              case 3:
                if (i = i.stateNode, i.current.memoizedState.isDehydrated) {
                  var s = Gt(i.pendingLanes);
                  if (s !== 0) {
                    var r = i;
                    for (r.pendingLanes |= 2, r.entangledLanes |= 2; s; ) {
                      var d = 1 << 31 - $e(s);
                      r.entanglements[1] |= d, s &= ~d;
                    }
                    Vt(i), (Se & 6) === 0 && (Wi = xt() + 500, Hn(0));
                  }
                }
                break;
              case 13:
                r = xl(i, 2), r !== null && yt(r, i, 2), Pi(), Ds(i, 2);
            }
          if (i = Us(l), i === null && bs(
            e,
            t,
            l,
            hu,
            a
          ), i === n) break;
          n = i;
        }
        n !== null && l.stopPropagation();
      } else
        bs(
          e,
          t,
          l,
          null,
          a
        );
    }
  }
  function Us(e) {
    return e = Bu(e), ws(e);
  }
  var hu = null;
  function ws(e) {
    if (hu = null, e = cl(e), e !== null) {
      var t = T(e);
      if (t === null) e = null;
      else {
        var a = t.tag;
        if (a === 13) {
          if (e = A(t), e !== null) return e;
          e = null;
        } else if (a === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      }
    }
    return hu = e, null;
  }
  function Xd(e) {
    switch (e) {
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
        switch (ti()) {
          case it:
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
  function Qd(e, t) {
    switch (e) {
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
        Zn.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Vn.delete(t.pointerId);
    }
  }
  function Kn(e, t, a, l, n, i) {
    return e === null || e.nativeEvent !== i ? (e = {
      blockedOn: t,
      domEventName: a,
      eventSystemFlags: l,
      nativeEvent: i,
      targetContainers: [n]
    }, t !== null && (t = sl(t), t !== null && Ld(t)), e) : (e.eventSystemFlags |= l, t = e.targetContainers, n !== null && t.indexOf(n) === -1 && t.push(n), e);
  }
  function Hm(e, t, a, l, n) {
    switch (t) {
      case "focusin":
        return Da = Kn(
          Da,
          e,
          t,
          a,
          l,
          n
        ), !0;
      case "dragenter":
        return Ra = Kn(
          Ra,
          e,
          t,
          a,
          l,
          n
        ), !0;
      case "mouseover":
        return Ua = Kn(
          Ua,
          e,
          t,
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
            e,
            t,
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
            e,
            t,
            a,
            l,
            n
          )
        ), !0;
    }
    return !1;
  }
  function Zd(e) {
    var t = cl(e.target);
    if (t !== null) {
      var a = T(t);
      if (a !== null) {
        if (t = a.tag, t === 13) {
          if (t = A(a), t !== null) {
            e.blockedOn = t, xe(e.priority, function() {
              if (a.tag === 13) {
                var l = gt();
                l = ul(l);
                var n = xl(a, l);
                n !== null && yt(n, a, l), Ds(a, l);
              }
            });
            return;
          }
        } else if (t === 3 && a.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = a.tag === 3 ? a.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function vu(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var a = Us(e.nativeEvent);
      if (a === null) {
        a = e.nativeEvent;
        var l = new a.constructor(
          a.type,
          a
        );
        Hu = l, a.target.dispatchEvent(l), Hu = null;
      } else
        return t = sl(a), t !== null && Ld(t), e.blockedOn = a, !1;
      t.shift();
    }
    return !0;
  }
  function Vd(e, t, a) {
    vu(e) && a.delete(t);
  }
  function Bm() {
    qs = !1, Da !== null && vu(Da) && (Da = null), Ra !== null && vu(Ra) && (Ra = null), Ua !== null && vu(Ua) && (Ua = null), Zn.forEach(Vd), Vn.forEach(Vd);
  }
  function mu(e, t) {
    e.blockedOn === t && (e.blockedOn = null, qs || (qs = !0, c.unstable_scheduleCallback(
      c.unstable_NormalPriority,
      Bm
    )));
  }
  var pu = null;
  function Kd(e) {
    pu !== e && (pu = e, c.unstable_scheduleCallback(
      c.unstable_NormalPriority,
      function() {
        pu === e && (pu = null);
        for (var t = 0; t < e.length; t += 3) {
          var a = e[t], l = e[t + 1], n = e[t + 2];
          if (typeof l != "function") {
            if (ws(l || a) === null)
              continue;
            break;
          }
          var i = sl(a);
          i !== null && (e.splice(t, 3), t -= 3, wc(
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
  function Jn(e) {
    function t(d) {
      return mu(d, e);
    }
    Da !== null && mu(Da, e), Ra !== null && mu(Ra, e), Ua !== null && mu(Ua, e), Zn.forEach(t), Vn.forEach(t);
    for (var a = 0; a < wa.length; a++) {
      var l = wa[a];
      l.blockedOn === e && (l.blockedOn = null);
    }
    for (; 0 < wa.length && (a = wa[0], a.blockedOn === null); )
      Zd(a), a.blockedOn === null && wa.shift();
    if (a = (e.ownerDocument || e).$$reactFormReplay, a != null)
      for (l = 0; l < a.length; l += 3) {
        var n = a[l], i = a[l + 1], s = n[Xe] || null;
        if (typeof i == "function")
          s || Kd(a);
        else if (s) {
          var r = null;
          if (i && i.hasAttribute("formAction")) {
            if (n = i, s = i[Xe] || null)
              r = s.formAction;
            else if (ws(n) !== null) continue;
          } else r = s.action;
          typeof r == "function" ? a[l + 1] = r : (a.splice(l, 3), l -= 3), Kd(a);
        }
      }
  }
  function Cs(e) {
    this._internalRoot = e;
  }
  gu.prototype.render = Cs.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(f(409));
    var a = t.current, l = gt();
    Yd(a, l, e, t, null, null);
  }, gu.prototype.unmount = Cs.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      Yd(e.current, 2, null, e, null, null), Pi(), t[Ut] = null;
    }
  };
  function gu(e) {
    this._internalRoot = e;
  }
  gu.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = ce();
      e = { blockedOn: null, target: e, priority: t };
      for (var a = 0; a < wa.length && t !== 0 && t < wa[a].priority; a++) ;
      wa.splice(a, 0, e), a === 0 && Zd(e);
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
  G.findDOMNode = function(e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(f(188)) : (e = Object.keys(e).join(","), Error(f(268, e)));
    return e = E(t), e = e !== null ? b(e) : null, e = e === null ? null : e.stateNode, e;
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
        Jt = yu.inject(
          km
        ), Ie = yu;
      } catch {
      }
  }
  return Wn.createRoot = function(e, t) {
    if (!p(e)) throw Error(f(299));
    var a = !1, l = "", n = of, i = ff, s = df, r = null;
    return t != null && (t.unstable_strictMode === !0 && (a = !0), t.identifierPrefix !== void 0 && (l = t.identifierPrefix), t.onUncaughtError !== void 0 && (n = t.onUncaughtError), t.onCaughtError !== void 0 && (i = t.onCaughtError), t.onRecoverableError !== void 0 && (s = t.onRecoverableError), t.unstable_transitionCallbacks !== void 0 && (r = t.unstable_transitionCallbacks)), t = Bd(
      e,
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
    ), e[Ut] = t.current, ys(e), new Cs(t);
  }, Wn.hydrateRoot = function(e, t, a) {
    if (!p(e)) throw Error(f(299));
    var l = !1, n = "", i = of, s = ff, r = df, d = null, x = null;
    return a != null && (a.unstable_strictMode === !0 && (l = !0), a.identifierPrefix !== void 0 && (n = a.identifierPrefix), a.onUncaughtError !== void 0 && (i = a.onUncaughtError), a.onCaughtError !== void 0 && (s = a.onCaughtError), a.onRecoverableError !== void 0 && (r = a.onRecoverableError), a.unstable_transitionCallbacks !== void 0 && (d = a.unstable_transitionCallbacks), a.formState !== void 0 && (x = a.formState)), t = Bd(
      e,
      1,
      !0,
      t,
      a ?? null,
      l,
      n,
      i,
      s,
      r,
      d,
      x
    ), t.context = kd(null), a = t.current, l = gt(), l = ul(l), n = ga(l), n.callback = null, ya(a, n, l), a = l, t.current.lanes = a, ha(t, a), Vt(t), e[Ut] = t.current, ys(e), new gu(t);
  }, Wn.version = "19.1.0", Wn;
}
var nh;
function Jm() {
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
  return c(), Bs.exports = Km(), Bs.exports;
}
var $m = Jm();
const Wm = '.ahv{--ahv-bg: var(--activity-bg, var(--background, #ffffff));--ahv-fg: var(--activity-fg, var(--foreground, #16181d));--ahv-muted: var(--activity-muted, var(--muted-foreground, #6b7080));--ahv-subtle: var(--activity-subtle, var(--muted, #f3f4f7));--ahv-line: var(--activity-line, var(--border, #e3e5ea));--ahv-main: var(--activity-main, var(--primary, #16181d));--ahv-main-fg: var(--activity-main-fg, var(--primary-foreground, #ffffff));--ahv-radius: var(--activity-radius, var(--radius, .625rem));--ahv-mono-font: var(--activity-mono-font, var(--font-mono, ui-monospace, "SF Mono", Menlo, Consolas, monospace));--ahv-bad: var(--activity-bad, #d92d20);--ahv-warn: var(--activity-warn, #b54708);--ahv-ok: var(--activity-ok, #067647);--ahv-attention: var(--activity-attention, #3e63dd);color:var(--ahv-fg);font-size:13px;line-height:1.45}.dark .ahv,[data-theme=dark] .ahv,.ahv-dark-host .ahv,.ahv.ahv-dark-host{--ahv-bad: var(--activity-bad, #f97066);--ahv-warn: var(--activity-warn, #fdb022);--ahv-ok: var(--activity-ok, #47cd89);--ahv-attention: var(--activity-attention, #8da4ef)}.ahv *,.ahv *:before,.ahv *:after{box-sizing:border-box}.ahv button{font:inherit}.ahv h2,.ahv h3,.ahv p{margin:0}.ahv-dim{color:var(--ahv-muted)}.ahv-strong{font-weight:600}.ahv-small{font-size:12px}.ahv-mono{font-family:var(--ahv-mono-font);font-size:12px}.ahv-num{font-variant-numeric:tabular-nums}.ahv-clip{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:100%}.ahv-bad{color:var(--ahv-bad)}.ahv-warn{color:var(--ahv-warn)}.ahv-log{display:flex;flex-direction:column;min-width:0;background:var(--ahv-bg);border:1px solid var(--ahv-line);border-radius:calc(var(--ahv-radius) * 1.4);overflow:hidden}.ahv-head{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px 16px;padding:16px 20px;border-bottom:1px solid var(--ahv-line)}.ahv-title{display:flex;align-items:center;gap:8px;font-size:16px;font-weight:600;text-wrap:balance}.ahv-head p{margin-top:2px;font-size:13px}.ahv-actions{display:flex;flex-wrap:wrap;align-items:center;gap:8px}.ahv-status{display:flex;flex-wrap:wrap;align-items:center;gap:6px 18px;padding:9px 20px;font-size:12.5px;color:var(--ahv-muted);border-bottom:1px solid var(--ahv-line)}.ahv-status strong{color:var(--ahv-fg);font-weight:500}.ahv-status .ahv-bad,.ahv-status strong.ahv-bad{color:var(--ahv-bad)}.ahv-status .ahv-warn{color:var(--ahv-warn)}.ahv-ok,.ahv-status strong.ahv-ok{color:var(--ahv-ok)}.ahv-status-wrap{border-bottom:1px solid var(--ahv-line)}.ahv-status-wrap .ahv-status{border-bottom:0}.ahv-checks{display:grid;gap:10px;padding:4px 20px 14px}.ahv-checks .ahv-bar{align-items:flex-end}.ahv-checks .ahv-field{width:170px}.ahv-hidden{display:none}.ahv-disabled{opacity:.55;pointer-events:none}label.ahv-button{cursor:pointer}.ahv-streams{display:grid;gap:12px;padding:12px 20px 16px;border-bottom:1px solid var(--ahv-line)}.ahv-streams .ahv-bar>p{margin:0;flex:1 1 320px;max-width:70ch}.ahv-stream-list{margin:0;padding:0;list-style:none;display:grid;border:1px solid var(--ahv-line);border-radius:var(--ahv-radius)}.ahv-stream-list li{display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,1fr) 230px 250px;align-items:center;gap:6px 16px;padding:10px 14px}.ahv-stream-list li+li{border-top:1px solid var(--ahv-line)}.ahv-stream-list li>.ahv-bad{grid-column:1 / -1}.ahv-stream-main{display:flex;flex-wrap:wrap;align-items:center;gap:4px 8px;min-width:0}.ahv-stream-where{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.ahv-stream-tools{display:flex;align-items:center;gap:6px;justify-self:end}.ahv-stream-form{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px 16px;max-width:760px}.ahv-stream-form .ahv-segment{justify-self:start}.ahv-textarea{height:auto;padding:8px 10px;resize:vertical}@media(max-width:720px){.ahv-stream-list li{grid-template-columns:minmax(0,1fr)}.ahv-stream-tools{justify-self:start;flex-wrap:wrap}.ahv-stream-form{grid-template-columns:minmax(0,1fr)}.ahv-stream-form .ahv-field-wide{grid-column:auto}}.ahv-verdict{display:grid;gap:6px;padding:10px 12px;font-size:12.5px;border-radius:var(--ahv-radius);border:1px solid}.ahv-verdict ul{margin:0;padding-left:18px;display:grid;gap:2px}.ahv-verdict-ok{color:var(--ahv-ok);border-color:color-mix(in srgb,var(--ahv-ok) 35%,transparent);background:color-mix(in srgb,var(--ahv-ok) 6%,transparent)}.ahv-verdict-bad{color:var(--ahv-bad);border-color:color-mix(in srgb,var(--ahv-bad) 35%,transparent);background:color-mix(in srgb,var(--ahv-bad) 6%,transparent)}.ahv-seal{display:inline-flex;vertical-align:-2px;margin-left:4px;color:var(--ahv-ok)}.ahv-seal-waiting{color:var(--ahv-muted)}.ahv-button{display:inline-flex;align-items:center;gap:6px;height:32px;padding:0 12px;cursor:pointer;color:var(--ahv-fg);background:var(--ahv-bg);border:1px solid var(--ahv-line);border-radius:var(--ahv-radius);font-size:13px;font-weight:500;white-space:nowrap;transition:background-color .15s,border-color .15s}.ahv-button:hover:not(:disabled){background:var(--ahv-subtle)}.ahv-button:disabled{opacity:.55;cursor:default}.ahv-button-quiet{border-color:transparent;background:transparent;color:var(--ahv-muted)}.ahv-button-quiet:hover:not(:disabled){color:var(--ahv-fg)}.ahv-button-main{background:var(--ahv-main);color:var(--ahv-main-fg);border-color:var(--ahv-main);padding:0 16px}.ahv-button-main:hover:not(:disabled){background:var(--ahv-main);opacity:.9}.ahv-button-live{color:var(--ahv-ok);border-color:color-mix(in srgb,var(--ahv-ok) 45%,transparent)}.ahv-icon-button{display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;padding:0;cursor:pointer;background:transparent;border:0;border-radius:var(--ahv-radius);color:var(--ahv-muted)}.ahv-icon-button:hover{background:var(--ahv-subtle);color:var(--ahv-fg)}.ahv :focus-visible{outline:2px solid var(--ahv-attention);outline-offset:1px}.ahv-input{width:100%;min-width:0;height:34px;padding:0 10px;font:inherit;font-size:13px;color:var(--ahv-fg);background:var(--ahv-bg);border:1px solid var(--ahv-line);border-radius:var(--ahv-radius)}.ahv-input[aria-invalid]{border-color:var(--ahv-bad)}.ahv-input::placeholder{color:var(--ahv-muted)}.ahv-input-icon{position:relative;display:block}.ahv-input-icon>svg{position:absolute;left:10px;top:50%;transform:translateY(-50%);color:var(--ahv-muted);pointer-events:none}.ahv-input-icon>.ahv-input{padding-left:30px}.ahv-pair{display:flex;gap:6px}.ahv-segment{display:inline-flex;padding:2px;gap:2px;background:var(--ahv-subtle);border-radius:var(--ahv-radius)}.ahv-segment button{height:28px;padding:0 12px;border:0;border-radius:calc(var(--ahv-radius) * .8);background:transparent;cursor:pointer;color:var(--ahv-muted);font-size:12.5px;font-weight:500}.ahv-segment button[aria-pressed=true]{background:var(--ahv-bg);color:var(--ahv-fg);box-shadow:0 1px 2px #00000014}.ahv-chips{display:flex;flex-wrap:wrap;gap:6px}.ahv-chip{height:28px;padding:0 11px;cursor:pointer;font-size:12.5px;color:var(--ahv-muted);background:transparent;border:1px solid var(--ahv-line);border-radius:999px}.ahv-chip[aria-pressed=true]{color:var(--ahv-fg);border-color:var(--ahv-fg);font-weight:500}.ahv-menu{position:relative}.ahv-menu-list{position:absolute;right:0;top:calc(100% + 4px);z-index:20;min-width:220px;padding:4px;display:grid;background:var(--ahv-bg);border:1px solid var(--ahv-line);border-radius:var(--ahv-radius);box-shadow:0 8px 24px #0000001f}.ahv-menu-list>button{color:inherit;text-align:left;padding:8px 10px;border:0;background:transparent;border-radius:calc(var(--ahv-radius) * .8);cursor:pointer}.ahv-menu-list>button:hover{background:var(--ahv-subtle)}.ahv-filters{display:grid;gap:14px;padding:14px 20px;border-bottom:1px solid var(--ahv-line);background:color-mix(in srgb,var(--ahv-subtle) 35%,var(--ahv-bg))}.ahv-bar{display:flex;flex-wrap:wrap;align-items:center;gap:8px 12px}.ahv-bar-end{gap:8px}.ahv-push{flex:1}.ahv-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:12px}.ahv-more{padding:12px;border:1px dashed var(--ahv-line);border-radius:var(--ahv-radius)}.ahv-field{display:grid;gap:5px;align-content:start;min-width:0}.ahv-field-wide{grid-column:span 2}.ahv-field>span:first-child{font-size:12px;font-weight:500;color:var(--ahv-muted)}.ahv-field em{font-style:normal;font-size:12px}.ahv-applied{display:flex;flex-wrap:wrap;align-items:center;gap:6px;padding-top:12px;border-top:1px dashed var(--ahv-line)}.ahv-pill{display:inline-flex;align-items:center;gap:4px;height:26px;padding:0 2px 0 9px;font-size:12.5px;background:var(--ahv-bg);border:1px solid var(--ahv-line);border-radius:var(--ahv-radius)}.ahv-pill button{display:inline-flex;padding:3px;border:0;background:transparent;border-radius:4px;cursor:pointer;color:var(--ahv-muted)}.ahv-pill button:hover{background:var(--ahv-subtle);color:var(--ahv-fg)}.ahv-searchbar{display:flex;flex-wrap:wrap;gap:8px;align-items:flex-start}.ahv-search{position:relative;flex:1 1 360px;min-width:0}.ahv-range{width:auto;flex:0 0 auto}.ahv-searchbar .ahv-pair{flex:0 1 300px}.ahv-suggest{position:absolute;left:0;right:0;top:calc(100% + 4px);z-index:30;margin:0;padding:4px;list-style:none;max-height:300px;overflow:auto;background:var(--ahv-bg);border:1px solid var(--ahv-line);border-radius:var(--ahv-radius);box-shadow:0 8px 24px #0000001f}.ahv-suggest li{display:flex;justify-content:space-between;gap:12px;padding:6px 9px;border-radius:calc(var(--ahv-radius) * .8);cursor:pointer}.ahv-suggest li .ahv-dim{font-size:12px;text-align:right}.ahv-suggest-on{background:var(--ahv-subtle)}.ahv-add{gap:4px 6px}.ahv-link-button{padding:2px 8px;font-size:12.5px;color:var(--ahv-muted);background:transparent;border:1px dashed var(--ahv-line);border-radius:999px;cursor:pointer}.ahv-link-button:hover{color:var(--ahv-fg);border-style:solid}.ahv-push-right{margin-left:auto}.ahv-pill-not{border-style:dashed}.ahv-cell{white-space:nowrap}.ahv-check{display:flex;align-items:center;gap:8px;padding:5px 4px;font-size:13px;cursor:pointer}.ahv-menu-panel{min-width:280px;padding:10px;gap:4px}.ahv-views{margin:0 0 6px;padding:0;list-style:none;display:grid;gap:2px;max-height:300px;overflow:auto}.ahv-views li{display:flex;align-items:center;gap:4px;border-radius:calc(var(--ahv-radius) * .8)}.ahv-views li:hover,.ahv-views-on{background:var(--ahv-subtle)}.ahv-views-open{flex:1;display:grid;gap:1px;padding:6px 8px;text-align:left;color:inherit;background:transparent;border:0;cursor:pointer;min-width:0}.ahv-views-tools{display:flex}.ahv-views-save{display:grid;gap:6px;padding-top:8px;border-top:1px solid var(--ahv-line)}.ahv-chart{padding:14px 20px 10px;border-bottom:1px solid var(--ahv-line)}.ahv-chart-head{display:flex;flex-wrap:wrap;justify-content:space-between;gap:4px 16px;margin-bottom:10px;font-size:12.5px}.ahv-chart-head strong{font-size:14px}.ahv-chart-plot{position:relative;height:96px;border-bottom:1px solid var(--ahv-line)}.ahv-chart-svg{display:block;width:100%;height:100%}.ahv-bar{fill:var(--ahv-main);fill-opacity:.55}.ahv-bar-on{fill-opacity:1}.ahv-chart-max{position:absolute;left:0;top:-2px;font-size:10.5px;color:var(--ahv-muted)}.ahv-chart-empty{position:absolute;top:0;right:0;bottom:0;left:0;display:grid;place-items:center;color:var(--ahv-muted);font-size:12.5px}.ahv-chart-axis{position:relative;height:30px}.ahv-chart-axis span{position:absolute;top:4px;transform:translate(-50%);display:grid;justify-items:center;font-size:10.5px;color:var(--ahv-muted);font-variant-numeric:tabular-nums;white-space:nowrap}.ahv-chart-axis b{font-weight:600}.ahv-tip{position:absolute;top:-6px;transform:translate(-50%,-100%);z-index:5;display:grid;gap:1px;padding:6px 9px;pointer-events:none;font-size:12px;white-space:nowrap;background:var(--ahv-bg);border:1px solid var(--ahv-line);border-radius:var(--ahv-radius);box-shadow:0 6px 18px #0000001f}.ahv-tip span{color:var(--ahv-muted)}.ahv-table-wrap{max-height:min(70vh,52rem);overflow:auto}.ahv-table{width:100%;border-collapse:collapse}.ahv-table thead th{position:sticky;top:0;z-index:2;padding:9px 14px;text-align:left;font-size:12px;font-weight:500;color:var(--ahv-muted);background:var(--ahv-bg);box-shadow:inset 0 -1px 0 var(--ahv-line);white-space:nowrap}.ahv-table td{padding:10px 14px;vertical-align:middle;border-bottom:1px solid color-mix(in srgb,var(--ahv-line) 70%,transparent)}.ahv-table th:first-child,.ahv-table td:first-child{padding-left:20px;width:1%}.ahv-table th:last-child,.ahv-table td:last-child{padding-right:20px;width:1%}.ahv-table td:nth-child(2){width:22%;max-width:260px}.ahv-day td{padding:6px 20px;font-size:11px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:var(--ahv-muted);background:color-mix(in srgb,var(--ahv-subtle) 60%,var(--ahv-bg))}.ahv-row{cursor:pointer}.ahv-row:hover td{background:color-mix(in srgb,var(--ahv-subtle) 55%,transparent)}.ahv-row-problem td:first-child{box-shadow:inset 3px 0 0 var(--ahv-bad)}.ahv-when{display:grid;white-space:nowrap;line-height:1.3}.ahv-when .ahv-dim{font-size:11.5px}.ahv-who{display:flex;align-items:center;gap:10px;min-width:0}.ahv-avatar{flex:none;display:grid;place-items:center;width:28px;height:28px;border-radius:999px;font-size:10.5px;font-weight:600;color:var(--ahv-muted);background:var(--ahv-subtle)}.ahv-avatar-system{border-radius:8px}.ahv-stack{display:grid;min-width:0;line-height:1.3}.ahv-stack .ahv-dim{font-size:11.5px}.ahv-link{display:block;max-width:100%;padding:0;color:inherit;border:0;background:none;text-align:left;cursor:pointer}.ahv-link:hover{text-decoration:underline;text-underline-offset:2px}.ahv-what{display:flex;align-items:center;gap:8px;min-width:0}.ahv-sentence{min-width:0;overflow-wrap:anywhere}.ahv-mark{flex:none;width:7px;height:7px;border-radius:999px;background:var(--ahv-attention)}.ahv-what>svg{flex:none}.ahv-count{flex:none;display:inline-flex;align-items:center;gap:3px;padding:1px 6px;font-size:11px;color:var(--ahv-muted);border:1px solid var(--ahv-line);border-radius:999px;font-variant-numeric:tabular-nums}.ahv-count-bad{color:var(--ahv-main-fg);background:var(--ahv-bad);border-color:var(--ahv-bad)}.ahv-where{display:flex;align-items:center;gap:6px;white-space:nowrap}.ahv-tag{display:inline-flex;align-items:center;height:20px;padding:0 7px;font-size:11px;font-weight:500;white-space:nowrap;color:var(--ahv-muted);background:var(--ahv-subtle);border-radius:6px;text-transform:none}.ahv-tag-bad{color:var(--ahv-bad);background:color-mix(in srgb,var(--ahv-bad) 12%,transparent)}.ahv-tag-warn{color:var(--ahv-warn);background:color-mix(in srgb,var(--ahv-warn) 12%,transparent)}.ahv-tag-ok{color:var(--ahv-ok);background:color-mix(in srgb,var(--ahv-ok) 12%,transparent)}.ahv-tag-accent{color:var(--ahv-attention);background:color-mix(in srgb,var(--ahv-attention) 12%,transparent)}.ahv-method-get{color:var(--ahv-attention)}.ahv-method-post{color:var(--ahv-ok)}.ahv-method-put,.ahv-method-patch{color:var(--ahv-warn)}.ahv-method-delete{color:var(--ahv-bad)}.ahv-foot{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:8px;padding:10px 20px;font-size:12.5px}.ahv-empty{display:grid;justify-items:center;gap:6px;padding:48px 20px;text-align:center;color:var(--ahv-muted)}.ahv-empty strong{color:var(--ahv-fg);font-size:14px}.ahv-message{display:flex;align-items:center;justify-content:space-between;gap:12px;margin:12px 20px;padding:9px 12px;font-size:12.5px;border:1px solid var(--ahv-line);border-radius:var(--ahv-radius);background:var(--ahv-subtle)}.ahv-message-bad{color:var(--ahv-bad);border-color:color-mix(in srgb,var(--ahv-bad) 35%,transparent);background:color-mix(in srgb,var(--ahv-bad) 6%,transparent)}.ahv-timeline .ahv-message{margin:0}.ahv-skeleton{display:grid;gap:8px;padding:16px 20px}.ahv-timeline .ahv-skeleton{padding:0}.ahv-skeleton span{height:38px;border-radius:var(--ahv-radius);background:var(--ahv-subtle);animation:ahv-fade 1.4s ease-in-out infinite}.ahv-drawer-layer{position:fixed;top:0;right:0;bottom:0;left:0;z-index:60;display:flex;justify-content:flex-end}.ahv-backdrop{position:absolute;top:0;right:0;bottom:0;left:0;background:#00000052;animation:ahv-fade-in .15s ease-out}.ahv-drawer{position:relative;width:min(680px,100%);height:100%;overflow-y:auto;background:var(--ahv-bg);color:var(--ahv-fg);border-left:1px solid var(--ahv-line);box-shadow:-12px 0 32px #00000024;animation:ahv-slide-in .18s ease-out}.ahv-drawer-close{position:absolute;top:14px;right:14px}.ahv-drawer-body{display:grid;gap:22px;padding:22px 24px 32px}.ahv-drawer-head{display:grid;gap:8px;padding-right:36px;padding-bottom:18px;border-bottom:1px solid var(--ahv-line)}.ahv-drawer-head h2{font-size:17px;font-weight:600;line-height:1.35;text-wrap:balance;overflow-wrap:anywhere}.ahv-drawer-head .ahv-actions{margin-top:4px}.ahv-tags{display:flex;flex-wrap:wrap;gap:6px}.ahv-section{display:grid;gap:8px}.ahv-section h3{font-size:11px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;color:var(--ahv-muted)}.ahv-pairs{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,250px),1fr));margin:0;font-size:12.5px;border:1px solid var(--ahv-line);border-radius:var(--ahv-radius);overflow:hidden}.ahv-pair-cell{display:grid;grid-template-columns:minmax(84px,42%) 1fr;box-shadow:1px 0 0 var(--ahv-line),0 1px 0 var(--ahv-line)}.ahv-pair-cell dt{padding:7px 10px;color:var(--ahv-muted);font-weight:500;background:color-mix(in srgb,var(--ahv-subtle) 60%,var(--ahv-bg));overflow-wrap:break-word}.ahv-pair-wide{grid-column:1 / -1;grid-template-columns:minmax(84px,21%) 1fr}.ahv-pair-cell dd{margin:0;padding:7px 10px;min-width:0;overflow-wrap:anywhere}.ahv-stack-gap{display:grid;gap:6px}.ahv-changes .ahv-field-name{width:34%;overflow-wrap:break-word}.ahv-scroll-x{overflow-x:auto;border:1px solid var(--ahv-line);border-radius:var(--ahv-radius)}.ahv-changes{width:100%;border-collapse:collapse;font-size:12.5px}.ahv-changes th{padding:7px 12px;text-align:left;font-weight:500;color:var(--ahv-muted);background:var(--ahv-subtle)}.ahv-changes td{padding:7px 12px;border-top:1px solid var(--ahv-line);overflow-wrap:anywhere}.ahv-before{color:var(--ahv-bad)}.ahv-after{color:var(--ahv-ok)}.ahv-list{margin:0;padding:0;list-style:none;border:1px solid var(--ahv-line);border-radius:var(--ahv-radius);overflow:hidden}.ahv-list li+li{border-top:1px solid var(--ahv-line)}.ahv-list button{display:flex;align-items:center;gap:10px;width:100%;padding:8px 12px;text-align:left;border:0;background:transparent;cursor:pointer;color:inherit}.ahv-list button:hover:not(:disabled){background:var(--ahv-subtle)}.ahv-list button:disabled{cursor:default;background:var(--ahv-subtle)}.ahv-row-between{display:flex;align-items:center;justify-content:space-between;gap:8px}.ahv-disclose{display:inline-flex;align-items:center;gap:4px;padding:0;border:0;background:none;cursor:pointer;font-size:11px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;color:var(--ahv-muted)}.ahv-pre{margin:0;max-height:380px;overflow:auto;padding:12px;font-family:var(--ahv-mono-font);font-size:12px;background:var(--ahv-subtle);border:1px solid var(--ahv-line);border-radius:var(--ahv-radius);white-space:pre-wrap;overflow-wrap:anywhere}.ahv-timeline{display:grid;gap:12px}.ahv-eyebrow{font-size:11px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;color:var(--ahv-muted)}.ahv-steps{margin:0;padding:0;list-style:none;display:grid}.ahv-step{--tone: var(--ahv-muted);position:relative;display:flex;gap:12px;padding-bottom:20px}.ahv-step:before{content:"";position:absolute;left:13.5px;top:30px;bottom:2px;width:1px;background:var(--ahv-line)}.ahv-step:last-child{padding-bottom:0}.ahv-step:last-child:before{display:none}.ahv-tone-sky{--tone: #0284c7}.ahv-tone-violet{--tone: #7c3aed}.ahv-tone-amber{--tone: #b45309}.ahv-tone-emerald{--tone: #047857}.ahv-tone-rose{--tone: var(--ahv-bad)}.ahv-tone-neutral{--tone: var(--ahv-fg)}.dark .ahv-tone-sky,[data-theme=dark] .ahv-tone-sky,.ahv-dark-host .ahv-tone-sky{--tone: #38bdf8}.dark .ahv-tone-violet,[data-theme=dark] .ahv-tone-violet,.ahv-dark-host .ahv-tone-violet{--tone: #a78bfa}.dark .ahv-tone-amber,[data-theme=dark] .ahv-tone-amber,.ahv-dark-host .ahv-tone-amber{--tone: #fbbf24}.dark .ahv-tone-emerald,[data-theme=dark] .ahv-tone-emerald,.ahv-dark-host .ahv-tone-emerald{--tone: #34d399}.ahv-step-icon{position:relative;z-index:1;flex:none;display:grid;place-items:center;width:28px;height:28px;border-radius:999px;color:var(--tone);background:color-mix(in srgb,var(--tone) 12%,var(--ahv-bg));box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--tone) 35%,transparent)}.ahv-step-main{flex:1;min-width:0;display:grid;gap:8px;align-content:start}.ahv-step-head{display:flex;align-items:flex-start;justify-content:space-between;gap:12px}.ahv .ahv-step-title{display:inline-flex;align-items:center;gap:8px;padding:0;border:0;background:none;cursor:pointer;text-align:left;color:inherit;font-size:14px;font-weight:600;line-height:1.3}.ahv .ahv-step-title:hover{text-decoration:underline;text-underline-offset:3px}.ahv-step-when{flex:none;display:grid;justify-items:end;line-height:1.3}.ahv-step-when .ahv-mono{font-size:12px;font-weight:500}.ahv-step-when .ahv-dim{font-size:11px}.ahv-byline{display:flex;flex-wrap:wrap;align-items:center;gap:2px 6px;font-size:12px;color:var(--ahv-muted);margin-top:3px}.ahv-byline .ahv-sep:before{content:"·";margin-right:6px}.ahv-byline .ahv-strong{color:var(--ahv-fg);font-weight:500}.ahv-avatar-small{width:18px;height:18px;font-size:8px}.ahv-step-problem{padding:8px 12px;font-size:12.5px;color:var(--ahv-bad);border-radius:var(--ahv-radius);border:1px solid color-mix(in srgb,var(--ahv-bad) 30%,transparent);background:color-mix(in srgb,var(--ahv-bad) 6%,transparent)}.ahv-chips-row{display:flex;flex-wrap:wrap;gap:6px}.ahv-fact{display:inline-flex;align-items:baseline;gap:6px;padding:3px 9px;font-size:12px;border:1px solid var(--ahv-line);border-radius:calc(var(--ahv-radius) * .8);background:var(--ahv-bg)}.ahv-fact .ahv-mono{font-weight:500;color:var(--ahv-fg)}.ahv-step-more{display:grid;gap:10px}.ahv-records{display:grid;gap:6px;justify-items:start}.ahv-records .ahv-records-table{border:1px solid var(--ahv-line);border-radius:var(--ahv-radius);border-collapse:separate;border-spacing:0;overflow:hidden}.ahv-records-table>tbody>tr>td:nth-child(2){white-space:nowrap}.ahv-records-table>tbody>tr>td:first-child>.ahv-disclose{text-align:left;justify-content:flex-start;text-transform:none;letter-spacing:0;font-size:12.5px;font-weight:500;color:var(--ahv-fg)}.ahv-records-table>tbody>tr>td>.ahv-disclose:disabled{cursor:default}.ahv-records-table .ahv-cell-end{width:1%;text-align:right;padding:2px 6px}.ahv-records-fields>td{padding:8px 12px 12px;background:var(--ahv-subtle)}.ahv-turned-right{transform:rotate(90deg)}.ahv-turned{transform:rotate(180deg)}.ahv-spin{animation:ahv-spin 1s linear infinite}.ahv-pulse{animation:ahv-fade 1.6s ease-in-out infinite}@keyframes ahv-spin{to{transform:rotate(360deg)}}@keyframes ahv-fade{50%{opacity:.45}}@keyframes ahv-fade-in{0%{opacity:0}}@keyframes ahv-slide-in{0%{transform:translate(24px);opacity:0}}@media(prefers-reduced-motion:reduce){.ahv *,.ahv-drawer-layer *{animation:none!important;transition:none!important}}@media(max-width:720px){.ahv-head,.ahv-filters,.ahv-chart,.ahv-foot{padding-left:16px;padding-right:16px}.ahv-field-wide{grid-column:span 1}.ahv-table thead{display:none}.ahv-table,.ahv-table tbody,.ahv-table tr,.ahv-table td{display:block;width:auto!important;max-width:none!important}.ahv-table td{border:0;padding:2px 16px!important}.ahv-row{padding:10px 0;border-bottom:1px solid var(--ahv-line)}.ahv-day td{padding:6px 16px!important}}';
var X = tr();
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
function be({ name: c, size: o = 16, ...h }) {
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
function Ot(c, o, h) {
  const [f, p] = X.useState({ loading: c !== null }), T = X.useRef(0), A = X.useRef(o);
  A.current = o;
  const w = X.useCallback(() => {
    if (c === null) return;
    const b = ++T.current;
    p((U) => ({ ...U, loading: !0 })), A.current().then(
      (U) => b === T.current && p({ data: U, loading: !1 }),
      (U) => b === T.current && p((Y) => ({ data: Y.data, error: U, loading: !1 }))
    );
  }, [c]);
  X.useEffect(() => {
    p({ loading: c !== null }), w();
  }, [c, w]);
  const E = !!f.error;
  return X.useEffect(() => {
    if (!h || c === null || E) return;
    const b = setInterval(w, h);
    return () => clearInterval(b);
  }, [h, c, E, w]), { ...f, refresh: w };
}
const Zs = 20;
function Pm(c, o, h, f, p) {
  var D;
  const T = o && JSON.stringify(o), [A, w] = X.useState([]), [E, b] = X.useState(!1), [U, Y] = X.useState({ loading: !1 }), q = X.useRef(T);
  q.current = T;
  const B = Ot(
    T,
    () => c("search", { method: "POST", body: { ...o, limit: h } }),
    f ? p : void 0
  ), Z = X.useRef(0);
  X.useEffect(() => {
    B.data && (Z.current += 1, w([B.data]), b(!1), Y({ loading: !1 }));
  }, [B.data]), X.useEffect(() => {
    w([]), Y({ loading: !1 });
  }, [T]);
  const k = ((D = A[A.length - 1]) == null ? void 0 : D.next_cursor) ?? null, I = X.useCallback(() => {
    if (!k || U.loading || !o) return;
    Y({ loading: !0 });
    const H = T, W = Z.current;
    c("search", { method: "POST", body: { ...o, limit: h, cursor: k } }).then(
      (F) => {
        q.current !== H || Z.current !== W || (w((ue) => [...ue, F].slice(-Zs)), A.length >= Zs && b(!0), Y({ loading: !1 }));
      },
      (F) => q.current === H && Z.current === W && Y({ loading: !1, error: F })
    );
  }, [k, U.loading, o, T, c, h, A.length]);
  return {
    rows: A.flatMap((H) => H.items),
    trimmed: E,
    hasMore: !!k && !f,
    loading: B.loading && !A.length,
    refreshing: B.loading,
    error: B.error,
    more: U,
    loadMore: I,
    refresh: B.refresh,
    pageCount: A.length
  };
}
const Ht = (c) => Date.parse(`${c.slice(0, 23).replace(" ", "T")}Z`), ft = (c) => c.replace(/[._]+/g, " ").trim(), In = (c) => c.charAt(0).toUpperCase() + c.slice(1), bh = 864e5, Im = [[60, "second"], [60, "minute"], [24, "hour"], [7, "day"]], e0 = new Intl.RelativeTimeFormat(void 0, { numeric: "auto", style: "short" });
function ar(c, o = Date.now()) {
  let h = (Ht(c) - o) / 1e3;
  for (const [f, p] of Im) {
    if (Math.abs(h) < f) return e0.format(Math.round(h), p);
    h /= f;
  }
  return "";
}
const Nu = (c, o) => new Date(c).toLocaleString(void 0, { ...o, timeZone: "UTC" }), $l = (c) => Nu(c, { day: "numeric", month: "short", year: "numeric" }), Vl = (c) => Nu(c, { day: "numeric", month: "short" }), Vs = (c) => Nu(c, { hour: "2-digit", minute: "2-digit", hour12: !1 });
function t0(c, o = Date.now()) {
  const h = c.slice(0, 10);
  return h === new Date(o).toISOString().slice(0, 10) ? "Today" : h === new Date(o - bh).toISOString().slice(0, 10) ? "Yesterday" : Nu(Ht(`${h} 00:00:00`), { weekday: "short", day: "numeric", month: "short", year: "numeric" });
}
const Tu = (c) => c.slice(11, 23);
function xh(c) {
  var h, f;
  if (/^[\d#]/.test(c)) return "#";
  const o = c.split(/[\s@._-]+/).filter(Boolean);
  return ((((h = o[0]) == null ? void 0 : h[0]) ?? "?") + (((f = o[1]) == null ? void 0 : f[0]) ?? "")).toUpperCase();
}
const a0 = (c) => c.actor_name || (c.actor_type === "system" ? In(ft(c.actor_id)) || "System" : c.actor_id || "Anonymous"), Ks = (c) => /^\d{4}-\d{2}-\d{2}$/.test(c) && !Number.isNaN(Date.parse(`${c}T00:00:00Z`)), Js = (c) => `${c} 00:00:00`, l0 = (c) => `${new Date(Date.parse(`${c}T00:00:00Z`) + bh).toISOString().slice(0, 10)} 00:00:00`, n0 = (c, o = Date.now()) => new Date(o - c * 6e4).toISOString().slice(0, 19).replace("T", " "), i0 = (c, o, h = `${o}s`) => `${c.toLocaleString()} ${c === 1 ? o : h}`, bu = 1e5, u0 = [
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
const h0 = (c, o) => Fn(c).filter((h) => h !== o && h.text !== o.text).map((h) => h.text).join(" "), Ws = (c) => /\s/.test(c) ? `"${c.replace(/"/g, "")}"` : c, Sh = [
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
], lr = (c) => Sh.filter((o) => o.kinds.includes(c)), v0 = { events: ["origin", "outcome", "session"], requests: ["origin", "session"] }, m0 = (c) => [...lr(c).map((o) => o.field), ...v0[c]], p0 = (c) => {
  var o;
  return ((o = Sh.find((h) => h.field === c)) == null ? void 0 : o.label) ?? In(ft(c));
};
function g0(c, o, h, f = {}) {
  const p = c.startsWith("-"), T = p ? c.slice(1) : c, A = p ? "-" : "", w = T.indexOf(":");
  if (w < 0)
    return lr(o).filter((Y) => Y.field.startsWith(T.toLowerCase()) || Y.label.toLowerCase().startsWith(T.toLowerCase())).map((Y) => ({ insert: `${A}${Y.field}:`, label: `${Y.field}:`, hint: Y.hint }));
  const E = T.slice(0, w), b = T.slice(w + 1).toLowerCase();
  return (() => {
    const Y = (q) => (f[q] ?? []).filter((B) => B.value).map((B) => ({ insert: B.value, label: B.value, hint: B.count.toLocaleString() }));
    switch (E) {
      case "action":
        return Object.entries((h == null ? void 0 : h.actions) ?? {}).map(([q, B]) => ({ insert: q, label: q, hint: B.title }));
      case "category":
        return [...new Set(Object.values((h == null ? void 0 : h.actions) ?? {}).map((q) => q.category))].map((q) => ({ insert: q, label: q }));
      case "actor_type":
        return Object.entries((h == null ? void 0 : h.actor_types) ?? {}).map(([q, B]) => ({ insert: q, label: q, hint: B }));
      case "result":
        return ["success", "failed", "refused"].map((q) => ({ insert: q, label: q }));
      case "method":
        return ["GET", "POST", "PUT", "PATCH", "DELETE"].map((q) => ({ insert: q, label: q }));
      case "status":
        return ["2xx", "4xx", "5xx"].map((q) => ({ insert: q, label: q }));
      case "on":
        return Object.entries((h == null ? void 0 : h.entities) ?? {}).filter(([q]) => !q.includes("_")).map(([q, B]) => ({ insert: `${q}:`, label: `${q}:`, hint: B }));
      case "app":
        return Y("origin");
      case "service":
        return Y("service");
      default:
        return [];
    }
  })().filter((Y) => Y.insert.toLowerCase().startsWith(b) || Y.insert.toLowerCase().split(/[._:]/).some((q) => q.startsWith(b)) || (Y.hint ?? "").toLowerCase().split(/\s+/).some((q) => q.startsWith(b))).slice(0, 12).map((Y) => ({ ...Y, insert: `${A}${E}:${Y.insert.endsWith(":") ? Y.insert : Ws(Y.insert)}` }));
}
const Su = 6e4, Jl = 1440, y0 = [15, 30, 60, 120, 180, 360, 720, 1440, 2880, 10080, 20160, 43200], ih = 7, b0 = new Intl.NumberFormat(void 0, { notation: "compact", maximumFractionDigits: 1 });
function x0(c) {
  const o = c.bucket_minutes * Su, h = new Map(c.buckets.map((p) => [Ht(p.at), p.count])), f = [];
  for (let p = Math.floor(Ht(c.occurred_from) / o) * o; p < Ht(c.occurred_to); p += o)
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
  const h = (c[c.length - 1].at - c[0].at) / Su, f = y0.find((A) => A >= o && A % o === 0 && h / A <= ih) ?? o * Math.ceil(c.length / ih), p = f >= Jl, T = [];
  return c.forEach((A, w) => {
    if (A.at % (f * Su) !== 0) return;
    const E = T[T.length - 1], b = !E || Vl(c[E.index].at) !== Vl(A.at);
    T.push({ index: w, top: p ? Vl(A.at) : Vs(A.at), bottom: !p && b ? Vl(A.at) : "" });
  }), T;
}
function N0({ chart: c, noun: o, loading: h }) {
  const f = X.useMemo(() => c ? x0(c) : [], [c]), [p, T] = X.useState(null), A = f.reduce((B, Z) => B + Z.count, 0), w = f.reduce((B, Z) => Math.max(B, Z.count), 0), E = f.find((B) => B.count === w && w > 0), b = (c == null ? void 0 : c.bucket_minutes) ?? Jl, U = X.useMemo(() => j0(f, b), [f, b]), Y = o.replace(/s$/, ""), q = p !== null ? f[p] : void 0;
  return /* @__PURE__ */ u.jsxs("div", { className: "ahv-chart", children: [
    /* @__PURE__ */ u.jsxs("div", { className: "ahv-chart-head", children: [
      /* @__PURE__ */ u.jsxs("span", { children: [
        /* @__PURE__ */ u.jsx("strong", { className: "ahv-num", children: h && !c ? "…" : A.toLocaleString() }),
        " ",
        A === 1 ? Y : o,
        c && /* @__PURE__ */ u.jsxs("span", { className: "ahv-dim", children: [
          " · ",
          Vl(Ht(c.occurred_from)),
          " – ",
          $l(Ht(c.occurred_to) - 1),
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
        "aria-label": `${A.toLocaleString()} ${o}${E ? `, most at ${Xs(E.at, b)} UTC (${E.count})` : ""}`,
        onMouseMove: (B) => {
          if (!f.length) return;
          const Z = B.currentTarget.getBoundingClientRect();
          T(Math.min(f.length - 1, Math.max(0, Math.floor((B.clientX - Z.left) / Z.width * f.length))));
        },
        onMouseLeave: () => T(null),
        children: [
          w > 0 && /* @__PURE__ */ u.jsx("span", { className: "ahv-chart-max ahv-num", children: b0.format(w) }),
          /* @__PURE__ */ u.jsx("svg", { viewBox: `0 0 ${Math.max(f.length, 1)} 100`, preserveAspectRatio: "none", className: "ahv-chart-svg", children: f.map((B, Z) => {
            const k = w ? Math.max(B.count / w * 100, B.count ? 2 : 0) : 0;
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
          !h && A === 0 && /* @__PURE__ */ u.jsxs("span", { className: "ahv-chart-empty", children: [
            "No ",
            o,
            " in this period"
          ] }),
          q && /* @__PURE__ */ u.jsxs("div", { className: "ahv-tip", style: { left: `${(p + 0.5) / f.length * 100}%` }, children: [
            /* @__PURE__ */ u.jsx("strong", { className: "ahv-num", children: q.count ? `${q.count.toLocaleString()} ${q.count === 1 ? Y : o}` : `No ${o}` }),
            /* @__PURE__ */ u.jsxs("span", { children: [
              Xs(q.at, b),
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
var T0 = yh();
const Ae = (...c) => c.filter(Boolean).join(" "), jh = (c) => oa(c) ? c.actor : a0(c), Fs = (c, o = {}) => oa(c) ? c.actor_label : o[c.actor_type] || In(ft(c.actor_type)) || "Unknown", Ps = {
  sealed: "Sealed: kept unchanged since its minute ended",
  waiting: "Waiting for its seal: each minute is sealed two minutes after it ends"
};
function E0({ value: c, seal: o }) {
  return /* @__PURE__ */ u.jsxs("span", { className: "ahv-when", title: `${c} UTC`, children: [
    /* @__PURE__ */ u.jsxs("span", { className: "ahv-mono", children: [
      Tu(c),
      o && /* @__PURE__ */ u.jsx("span", { className: Ae("ahv-seal", o === "waiting" && "ahv-seal-waiting"), title: Ps[o], "aria-label": Ps[o], children: /* @__PURE__ */ u.jsx(be, { name: o === "sealed" ? "shield" : "history", size: 11 }) })
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
  const f = jh(c), p = Fs(c, o), T = c.actor_type !== "system" && c.actor_id && c.actor_id !== f ? c.actor_id : "";
  return /* @__PURE__ */ u.jsxs("span", { className: "ahv-who", children: [
    /* @__PURE__ */ u.jsx("span", { className: Ae("ahv-avatar", c.actor_type === "system" && "ahv-avatar-system"), "aria-hidden": "true", children: xh(f) }),
    /* @__PURE__ */ u.jsxs("span", { className: "ahv-stack", children: [
      /* @__PURE__ */ u.jsx(A0, { title: `Only activity by ${f}`, onClick: c.actor_id ? h : void 0, children: /* @__PURE__ */ u.jsx("span", { className: "ahv-strong ahv-clip", children: f }) }),
      /* @__PURE__ */ u.jsx("span", { className: "ahv-dim ahv-clip", children: [p, T].filter(Boolean).join(" · ") })
    ] })
  ] });
}
function M0({ row: c }) {
  return /* @__PURE__ */ u.jsxs("span", { className: "ahv-where", children: [
    c.origin && /* @__PURE__ */ u.jsx("span", { className: "ahv-tag", children: ft(c.origin) }),
    c.country && /* @__PURE__ */ u.jsx("span", { className: "ahv-dim", title: c.ip || void 0, children: c.country })
  ] });
}
function Eu({ outcome: c }) {
  return c === "success" ? null : /* @__PURE__ */ u.jsx("span", { className: Ae("ahv-tag", c === "failed" ? "ahv-tag-bad" : "ahv-tag-warn"), children: c });
}
const O0 = (c) => c >= 500 ? "ahv-tag-bad" : c >= 400 ? "ahv-tag-warn" : "ahv-tag-ok", Nh = ({ status: c }) => /* @__PURE__ */ u.jsx("span", { className: Ae("ahv-tag ahv-mono", O0(c)), children: c }), Th = ({ method: c }) => /* @__PURE__ */ u.jsx("span", { className: Ae("ahv-tag ahv-mono", `ahv-method-${c.toLowerCase()}`), children: c });
function D0({ row: c }) {
  var h;
  const o = c.children_count ?? ((h = c.children) == null ? void 0 : h.length) ?? 0;
  return /* @__PURE__ */ u.jsxs("span", { className: "ahv-what", children: [
    c.importance === "high" && c.outcome === "success" && /* @__PURE__ */ u.jsx("span", { className: "ahv-mark", title: "Worth attention" }),
    c.outcome !== "success" && /* @__PURE__ */ u.jsx(be, { name: "alert", size: 14, className: c.outcome === "failed" ? "ahv-bad" : "ahv-warn" }),
    /* @__PURE__ */ u.jsx("span", { className: "ahv-sentence", children: c.summary }),
    o > 0 && /* @__PURE__ */ u.jsxs("span", { className: "ahv-count", title: `${o} record change${o === 1 ? "" : "s"} made by the same request`, children: [
      /* @__PURE__ */ u.jsx(be, { name: "layers", size: 12 }),
      o
    ] })
  ] });
}
function Eh({ row: c }) {
  return /* @__PURE__ */ u.jsxs("span", { className: "ahv-what", children: [
    /* @__PURE__ */ u.jsx(Th, { method: c.method }),
    /* @__PURE__ */ u.jsx("span", { className: "ahv-mono ahv-clip", children: c.route }),
    /* @__PURE__ */ u.jsx(Nh, { status: c.status }),
    /* @__PURE__ */ u.jsxs("span", { className: "ahv-dim ahv-num", children: [
      c.duration_ms,
      " ms"
    ] })
  ] });
}
function Kl({ tone: c = "plain", children: o, action: h }) {
  return /* @__PURE__ */ u.jsxs("div", { className: Ae("ahv-message", c === "bad" && "ahv-message-bad"), role: c === "bad" ? "alert" : void 0, children: [
    /* @__PURE__ */ u.jsx("span", { children: o }),
    h
  ] });
}
function nr({ rows: c = 6 }) {
  return /* @__PURE__ */ u.jsx("div", { className: "ahv-skeleton", "aria-busy": "true", children: Array.from({ length: c }, (o, h) => /* @__PURE__ */ u.jsx("span", {}, h)) });
}
function _h({ facts: c }) {
  return c != null && c.length ? /* @__PURE__ */ u.jsx("span", { className: "ahv-chips-row", children: c.map((o, h) => /* @__PURE__ */ u.jsxs("span", { className: "ahv-fact", children: [
    o.label && /* @__PURE__ */ u.jsx("span", { className: "ahv-dim", children: o.label }),
    /* @__PURE__ */ u.jsx("span", { className: "ahv-mono", children: o.value })
  ] }, h)) }) : null;
}
const R0 = 36;
function ir({ items: c, mono: o = !1 }) {
  const h = c.filter(([, f]) => f != null && f !== "");
  return h.length ? /* @__PURE__ */ u.jsx("dl", { className: "ahv-pairs", children: h.map(([f, p], T) => {
    const A = typeof p == "object" ? JSON.stringify(p) : String(p);
    return /* @__PURE__ */ u.jsxs("div", { className: Ae("ahv-pair-cell", A.length > R0 && "ahv-pair-wide"), children: [
      /* @__PURE__ */ u.jsx("dt", { children: f }),
      /* @__PURE__ */ u.jsx("dd", { className: Ae(o && "ahv-mono"), children: A })
    ] }, `${f}-${T}`);
  }) }) : null;
}
function ur({ changes: c, valueLabel: o = "Value" }) {
  if (!c.length) return null;
  const h = c.every((p) => p.before === null), f = c.every((p) => p.after === null);
  if (h || f) {
    const p = c.filter((A) => (h ? A.after : A.before) !== null), T = c.length - p.length;
    return /* @__PURE__ */ u.jsxs("div", { className: "ahv-stack-gap", children: [
      o !== "Value" && /* @__PURE__ */ u.jsx("span", { className: "ahv-eyebrow", children: o }),
      /* @__PURE__ */ u.jsx(ir, { items: p.map((A) => [A.label, h ? A.after : A.before]), mono: !0 }),
      T > 0 && /* @__PURE__ */ u.jsxs("span", { className: "ahv-dim ahv-small", children: [
        T,
        " empty field",
        T === 1 ? "" : "s",
        " not shown"
      ] })
    ] });
  }
  return /* @__PURE__ */ u.jsx("div", { className: "ahv-scroll-x", children: /* @__PURE__ */ u.jsxs("table", { className: "ahv-changes", children: [
    /* @__PURE__ */ u.jsx("thead", { children: /* @__PURE__ */ u.jsxs("tr", { children: [
      /* @__PURE__ */ u.jsx("th", { children: "Field" }),
      /* @__PURE__ */ u.jsx("th", { children: "Before" }),
      /* @__PURE__ */ u.jsx("th", { children: "After" })
    ] }) }),
    /* @__PURE__ */ u.jsx("tbody", { children: c.map((p) => /* @__PURE__ */ u.jsxs("tr", { children: [
      /* @__PURE__ */ u.jsx("td", { className: "ahv-field-name", children: p.label }),
      /* @__PURE__ */ u.jsx("td", { className: "ahv-mono ahv-before", children: p.before ?? "—" }),
      /* @__PURE__ */ u.jsx("td", { className: "ahv-mono ahv-after", children: p.after ?? "—" })
    ] }, p.field)) })
  ] }) });
}
const U0 = 200, Ah = X.createContext(null);
function Kt({ title: c, children: o }) {
  return /* @__PURE__ */ u.jsxs("section", { className: "ahv-section", children: [
    /* @__PURE__ */ u.jsx("h3", { children: c }),
    o
  ] });
}
const Zl = ir;
function w0({ event: c }) {
  const o = c.change_list;
  if (!(o != null && o.length)) return null;
  const h = o.every((p) => p.before === null), f = o.every((p) => p.after === null);
  return /* @__PURE__ */ u.jsx(Kt, { title: h ? "Recorded values" : f ? "Values removed" : "Changes", children: /* @__PURE__ */ u.jsx(ur, { changes: o }) });
}
function q0({ text: c }) {
  const [o, h] = X.useState(!1);
  return /* @__PURE__ */ u.jsxs("button", { type: "button", className: "ahv-button ahv-button-quiet", onClick: () => {
    var f;
    (f = navigator.clipboard) == null || f.writeText(c).then(() => {
      h(!0), setTimeout(() => h(!1), 1500);
    });
  }, children: [
    /* @__PURE__ */ u.jsx(be, { name: o ? "check" : "copy", size: 14 }),
    o ? "Copied" : "Copy"
  ] });
}
function C0({ row: c }) {
  const [o, h] = X.useState(!1), { children: f, details: p, ...T } = c, A = JSON.stringify(T, null, 2);
  return /* @__PURE__ */ u.jsxs("section", { className: "ahv-section", children: [
    /* @__PURE__ */ u.jsxs("div", { className: "ahv-row-between", children: [
      /* @__PURE__ */ u.jsxs("button", { type: "button", className: "ahv-disclose", "aria-expanded": o, onClick: () => h((w) => !w), children: [
        /* @__PURE__ */ u.jsx(be, { name: "chevronDown", size: 14, className: Ae(o && "ahv-turned") }),
        "Full record (JSON)"
      ] }),
      /* @__PURE__ */ u.jsx(q0, { text: A })
    ] }),
    o && /* @__PURE__ */ u.jsx("pre", { className: "ahv-pre", children: A })
  ] });
}
function H0({ open: c, events: o, calls: h, onOpen: f }) {
  const p = [...o, ...h].sort((T, A) => T.occurred_at.localeCompare(A.occurred_at));
  return p.length ? /* @__PURE__ */ u.jsx("ol", { className: "ahv-list", children: p.map((T) => /* @__PURE__ */ u.jsx("li", { children: /* @__PURE__ */ u.jsxs("button", { type: "button", disabled: T.id === c.id, onClick: () => f(T), children: [
    /* @__PURE__ */ u.jsx("span", { className: "ahv-mono ahv-dim", children: Tu(T.occurred_at) }),
    oa(T) ? /* @__PURE__ */ u.jsxs("span", { className: "ahv-what", children: [
      /* @__PURE__ */ u.jsx("span", { className: "ahv-sentence", children: T.summary }),
      /* @__PURE__ */ u.jsx(Eu, { outcome: T.outcome })
    ] }) : /* @__PURE__ */ u.jsx(Eh, { row: T })
  ] }) }, T.id)) }) : /* @__PURE__ */ u.jsx("p", { className: "ahv-dim", children: "Nothing else was recorded for this request." });
}
function B0(c, o) {
  const h = oa(o);
  return Ot(`${o.id}`, async () => {
    if (h) return c(`events/${o.id}`, { method: "GET" });
    if (!o.request_id) return { same_request: [], requests: [] };
    const f = (A) => c("search", {
      method: "POST",
      body: { kind: A, filters: { request_id: o.request_id }, limit: U0 }
    }), [p, T] = await Promise.all([f("events"), f("requests")]);
    return { same_request: p.items, requests: T.items.filter((A) => A.id !== o.id) };
  });
}
function zh({ request: c, row: o, onClose: h, onFocus: f, actorTypes: p, entities: T, seal: A }) {
  const [w, E] = X.useState(o);
  X.useEffect(() => E(o), [o]);
  const b = X.useRef(null), U = X.useRef(null), Y = X.useRef(h);
  Y.current = h;
  const q = w !== null;
  X.useEffect(() => {
    var ee, D;
    if (!q) return;
    const Z = ((ee = b.current) == null ? void 0 : ee.getRootNode()) ?? document, k = Z.activeElement ?? document.activeElement;
    (D = b.current) == null || D.focus();
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
  }, [q]);
  const B = X.useContext(Ah);
  return w ? T0.createPortal(
    /* @__PURE__ */ u.jsxs("div", { className: "ahv ahv-drawer-layer", children: [
      /* @__PURE__ */ u.jsx("div", { className: "ahv-backdrop", onClick: h }),
      /* @__PURE__ */ u.jsxs("aside", { ref: U, className: "ahv-drawer", role: "dialog", "aria-modal": "true", "aria-label": "Activity details", children: [
        /* @__PURE__ */ u.jsx("button", { ref: b, type: "button", className: "ahv-icon-button ahv-drawer-close", onClick: h, "aria-label": "Close", children: /* @__PURE__ */ u.jsx(be, { name: "close" }) }),
        /* @__PURE__ */ u.jsx(
          k0,
          {
            request: c,
            row: w,
            onOpen: E,
            onFocus: f,
            actorTypes: p,
            entities: T,
            seal: w === o ? A : null
          },
          w.id
        )
      ] })
    ] }),
    B ?? document.body
  ) : null;
}
function k0({ request: c, row: o, onOpen: h, onFocus: f, actorTypes: p, entities: T = {}, seal: A }) {
  var q, B, Z, k;
  const w = B0(c, o), E = oa(o) ? ((q = w.data) == null ? void 0 : q.event) ?? o : null, b = jh(o), U = E != null && E.target_type ? `${T[E.target_type] ?? ft(E.target_type)} ${E.target_name || E.target_id}` : "", Y = `${$l(Ht(o.occurred_at))}, ${Tu(o.occurred_at)} UTC`;
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
        /* @__PURE__ */ u.jsx(_h, { facts: E.facts })
      ] }) : /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
        /* @__PURE__ */ u.jsxs("div", { className: "ahv-tags", children: [
          /* @__PURE__ */ u.jsx(Th, { method: o.method }),
          /* @__PURE__ */ u.jsx(Nh, { status: o.status })
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
          /* @__PURE__ */ u.jsx(be, { name: "user", size: 14 }),
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
              /* @__PURE__ */ u.jsx(be, { name: "history", size: 14 }),
              "Timeline of ",
              U
            ]
          }
        )
      ] })
    ] }),
    E ? /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
      E.outcome !== "success" && E.reason && /* @__PURE__ */ u.jsx(Kt, { title: "Reason", children: /* @__PURE__ */ u.jsx("p", { children: E.reason }) }),
      /* @__PURE__ */ u.jsx(w0, { event: E }),
      (B = E.details) != null && B.length ? /* @__PURE__ */ u.jsx(Kt, { title: "Details", children: /* @__PURE__ */ u.jsx(Zl, { items: E.details.map((I) => [I.label, I.value]) }) }) : E.metadata && !w.loading ? /* @__PURE__ */ u.jsx(Kt, { title: "Details", children: /* @__PURE__ */ u.jsx(Zl, { items: Object.entries(E.metadata).map(([I, ee]) => [In(ft(I)), ee]) }) }) : null,
      (U || E.related.length > 0) && /* @__PURE__ */ u.jsx(Kt, { title: "Concerns", children: /* @__PURE__ */ u.jsx(Zl, { items: [
        ["Target", U],
        ...E.related.map(([I, ee]) => [In(T[I] ?? ft(I)), ee])
      ] }) })
    ] }) : /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
      /* @__PURE__ */ u.jsx(Kt, { title: "Request", children: /* @__PURE__ */ u.jsx(Zl, { items: [["Path", o.path], ["Took", `${o.duration_ms} ms`], ["Service", ft(o.service)]] }) }),
      o.request_body && /* @__PURE__ */ u.jsx(Kt, { title: "Sent (secrets masked)", children: /* @__PURE__ */ u.jsx("pre", { className: "ahv-pre", children: JSON.stringify(o.request_body, null, 2) }) })
    ] }),
    o.request_id && /* @__PURE__ */ u.jsx(Kt, { title: "Same request", children: w.error ? /* @__PURE__ */ u.jsxs(Kl, { tone: "bad", action: /* @__PURE__ */ u.jsx("button", { type: "button", className: "ahv-button", onClick: w.refresh, children: "Retry" }), children: [
      "Couldn't load: ",
      w.error.message
    ] }) : w.loading && !w.data ? /* @__PURE__ */ u.jsx(nr, { rows: 2 }) : /* @__PURE__ */ u.jsx(H0, { open: o, events: ((Z = w.data) == null ? void 0 : Z.same_request) ?? [], calls: ((k = w.data) == null ? void 0 : k.requests) ?? [], onOpen: h }) }),
    /* @__PURE__ */ u.jsx(Kt, { title: "Who and from where", children: /* @__PURE__ */ u.jsx(Zl, { items: [
      ["Who", `${b} (${Fs(o, p)}${o.actor_id && o.actor_id !== b ? ` ${o.actor_id}` : ""})`],
      ["App", o.origin && ft(o.origin)],
      ["Country", o.country],
      ["IP address", o.ip],
      ["Device", E ? E.device : o.user_agent],
      ["Session", o.session_id],
      ["Company", o.tenant_id],
      ["Service", ft(o.service)]
    ] }) }),
    /* @__PURE__ */ u.jsx(Kt, { title: "Reference", children: /* @__PURE__ */ u.jsx(Zl, { items: [
      ["Record id", o.id],
      ["Request id", o.request_id],
      ["Recorded", `${o.received_at} UTC`],
      ["Integrity", _0(A ?? null)],
      ...E ? [["Action", E.action]] : []
    ] }) }),
    /* @__PURE__ */ u.jsx(C0, { row: E ?? o })
  ] });
}
const uh = 65, Is = { events: "Events", access_logs: "Requests" }, Y0 = 20, ch = (c, o = Date.now()) => (o - Date.parse(`${c.replace(" ", "T")}:00Z`)) / 6e4, G0 = () => new Date(Date.now() - 864e5).toISOString().slice(0, 10);
function L0(c, o, h) {
  var p;
  const f = (p = h == null ? void 0 : h.sealed_until) == null ? void 0 : p[o];
  return f ? c.slice(0, 16) <= f ? "sealed" : "waiting" : null;
}
function X0({ request: c, status: o }) {
  var W, F;
  const [h, f] = X.useState(!1), [p, T] = X.useState(G0), [A, w] = X.useState(!1), [E, b] = X.useState(null), U = X.useRef(null), Y = Ot(
    o != null && o.checks ? "integrity" : null,
    () => c("integrity", { method: "GET" })
  ), q = !!(o != null && o.checks && ((W = Y.data) != null && W.allowed));
  if (!o) return null;
  const B = Object.entries(o.sealed_until ?? {}), Z = o.last_daily, k = (F = o.stats) == null ? void 0 : F.queued;
  if (!B.length && o.recording === void 0 && !Z) return null;
  const I = async (ue) => {
    w(!0);
    try {
      b(await ue());
    } catch (C) {
      b({ kind: "error", message: C.message });
    } finally {
      w(!1);
    }
  }, ee = () => I(async () => ({ kind: "day", ...await c("integrity/verify", { method: "POST", body: { day: p } }) })), D = () => I(async () => {
    const ue = await c(`integrity/seal/${p}`, { method: "GET" });
    return $s(`${JSON.stringify(ue, null, 2)}
`, `activity-seal-${p}.json`, "application/json"), { kind: "downloaded", day: p };
  }), H = (ue) => I(async () => {
    let C;
    try {
      C = JSON.parse(await ue.text());
    } catch {
      C = {};
    }
    if (!C || !Array.isArray(C.seals) || !C.seals.length)
      throw new Error(`${ue.name} is not a seal record: choose a proof downloaded here (activity-seal-<day>.json)`);
    const P = await c("integrity/check", { method: "POST", body: { record: C } });
    return { kind: "proof", name: ue.name, day: String(C.day ?? ""), ...P };
  });
  return /* @__PURE__ */ u.jsxs("div", { className: "ahv-status-wrap", children: [
    /* @__PURE__ */ u.jsxs("div", { className: "ahv-status", role: "status", children: [
      /* @__PURE__ */ u.jsx(be, { name: "shield", size: 14 }),
      o.recording !== void 0 && /* @__PURE__ */ u.jsx("span", { className: Ae("ahv-tag", o.recording ? "ahv-tag-ok" : "ahv-tag-bad"), children: o.recording ? "Recording" : "Not recording" }),
      k !== void 0 && /* @__PURE__ */ u.jsxs("span", { children: [
        "Waiting to be written ",
        /* @__PURE__ */ u.jsx("strong", { className: "ahv-num", children: k.toLocaleString() })
      ] }),
      B.map(([ue, C]) => /* @__PURE__ */ u.jsxs(
        "span",
        {
          className: Ae(ch(C) > uh && "ahv-warn"),
          title: ch(C) > uh ? "Sealing is behind" : "Every minute up to this one is sealed",
          children: [
            Is[ue] ?? ue,
            " sealed through ",
            /* @__PURE__ */ u.jsx("strong", { className: "ahv-num", children: C })
          ]
        },
        ue
      )),
      Z && /* @__PURE__ */ u.jsxs("span", { children: [
        "Check of ",
        Z.day,
        ":",
        " ",
        /* @__PURE__ */ u.jsx("strong", { className: Z.ok === !1 ? "ahv-bad" : Z.ok ? "ahv-ok" : "ahv-warn", children: Z.ok === !1 ? `${Z.problems ?? ""} problem(s)`.trim() : Z.ok ? "intact" : "not checked" })
      ] }),
      q && /* @__PURE__ */ u.jsx("button", { type: "button", className: "ahv-link-button ahv-push-right", "aria-expanded": h, onClick: () => f((ue) => !ue), children: "Check integrity" })
    ] }),
    h && q && /* @__PURE__ */ u.jsxs("div", { className: "ahv-checks", children: [
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
              onChange: (ue) => T(ue.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ u.jsxs("button", { type: "button", className: "ahv-button ahv-button-main", disabled: A || !p, onClick: ee, children: [
          /* @__PURE__ */ u.jsx(be, { name: "shield", size: 14 }),
          A ? "Checking…" : "Check this day"
        ] }),
        /* @__PURE__ */ u.jsxs(
          "button",
          {
            type: "button",
            className: "ahv-button",
            disabled: A || !p,
            onClick: D,
            title: "The day's last seal of each table, to keep outside the database",
            children: [
              /* @__PURE__ */ u.jsx(be, { name: "download", size: 14 }),
              "Download proof"
            ]
          }
        ),
        /* @__PURE__ */ u.jsxs(
          "button",
          {
            type: "button",
            className: "ahv-button",
            disabled: A,
            title: "Compare a proof kept earlier with the database",
            onClick: () => {
              var ue;
              return (ue = U.current) == null ? void 0 : ue.click();
            },
            children: [
              /* @__PURE__ */ u.jsx(be, { name: "check", size: 14 }),
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
            onChange: (ue) => {
              var P;
              const C = (P = ue.target.files) == null ? void 0 : P[0];
              ue.target.value = "", C && H(C);
            }
          }
        )
      ] }),
      E && /* @__PURE__ */ u.jsx(Q0, { verdict: E })
    ] })
  ] });
}
function Q0({ verdict: c }) {
  return c.kind === "error" ? /* @__PURE__ */ u.jsx("p", { className: "ahv-bad", role: "alert", children: c.message }) : c.kind === "day" ? /* @__PURE__ */ u.jsxs("div", { role: "status", className: Ae("ahv-verdict", c.ok ? "ahv-verdict-ok" : "ahv-verdict-bad"), children: [
    /* @__PURE__ */ u.jsx("strong", { children: c.ok ? `${c.day}: intact. ${c.rows.toLocaleString()} records in ${c.checked.toLocaleString()} sealed minutes match their seals.` : `${c.day}: ${(c.problems.length + c.more).toLocaleString()} problem(s) found.` }),
    !c.ok && /* @__PURE__ */ u.jsxs("ul", { children: [
      c.problems.slice(0, Y0).map((o, h) => /* @__PURE__ */ u.jsxs("li", { children: [
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
function sh(c, o) {
  const h = c.lastIndexOf(" ", o - 1) + 1, f = c.indexOf(" ", o);
  return { start: h, end: f < 0 ? c.length : f, word: c.slice(h, f < 0 ? c.length : f) };
}
function Z0({ value: c, onChange: o, onSubmit: h, suggestions: f, placeholder: p, inputRef: T }) {
  const A = X.useRef(null), w = T ?? A, E = X.useId(), [b, U] = X.useState(0), [Y, q] = X.useState(!1), [B, Z] = X.useState(0), [k, I] = X.useState(!1), { start: ee, end: D, word: H } = sh(c, b), W = Y ? f(H) : [], F = W[Math.min(B, W.length - 1)], ue = (C) => {
    const P = c.slice(D), Re = C.insert.endsWith(":") ? "" : " ", Bt = `${c.slice(0, ee)}${C.insert}${P.startsWith(" ") || !Re ? "" : Re}${P}`, at = ee + C.insert.length + (C.insert.endsWith(":") ? 0 : 1);
    o(Bt), Z(0), I(!1), requestAnimationFrame(() => {
      var Ne, bt;
      (Ne = w.current) == null || Ne.focus(), (bt = w.current) == null || bt.setSelectionRange(at, at), U(at);
    });
  };
  return /* @__PURE__ */ u.jsxs("div", { className: "ahv-search", children: [
    /* @__PURE__ */ u.jsxs("span", { className: "ahv-input-icon", children: [
      /* @__PURE__ */ u.jsx(be, { name: "search", size: 14 }),
      /* @__PURE__ */ u.jsx(
        "input",
        {
          ref: w,
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
            o(C.target.value), U(C.target.selectionStart ?? C.target.value.length), q(!0), Z(0), I(!1);
          },
          onSelect: (C) => {
            const P = C.currentTarget.selectionStart ?? 0;
            sh(c, P).start !== ee && I(!1), U(P);
          },
          onFocus: () => q(!0),
          onBlur: () => setTimeout(() => {
            q(!1), I(!1);
          }, 120),
          onKeyDown: (C) => {
            W.length && (C.key === "ArrowDown" || C.key === "ArrowUp") ? (C.preventDefault(), Z((P) => k ? (P + (C.key === "ArrowDown" ? 1 : W.length - 1)) % W.length : C.key === "ArrowDown" ? 0 : W.length - 1), I(!0)) : W.length && k && C.key === "Enter" ? (C.preventDefault(), ue(F)) : C.key === "Escape" ? (q(!1), I(!1)) : C.key === "Enter" && (q(!1), h());
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
        className: Ae(k && C === F && "ahv-suggest-on"),
        onMouseDown: (Re) => {
          Re.preventDefault(), ue(C);
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
function cr({ label: c, icon: o, children: h, open: f, setOpen: p, badge: T, disabled: A }) {
  const w = X.useRef(null);
  return X.useEffect(() => {
    if (!f) return;
    const E = (U) => {
      w.current && !U.composedPath().includes(w.current) && p(!1);
    }, b = (U) => U.key === "Escape" && p(!1);
    return document.addEventListener("mousedown", E), document.addEventListener("keydown", b), () => {
      document.removeEventListener("mousedown", E), document.removeEventListener("keydown", b);
    };
  }, [f, p]), /* @__PURE__ */ u.jsxs("div", { className: "ahv-menu", ref: w, children: [
    /* @__PURE__ */ u.jsxs("button", { type: "button", className: "ahv-button", "aria-expanded": f, disabled: A, onClick: () => p(!f), children: [
      /* @__PURE__ */ u.jsx(be, { name: o, size: 14 }),
      c,
      T && /* @__PURE__ */ u.jsx("span", { className: "ahv-count", children: T }),
      /* @__PURE__ */ u.jsx(be, { name: "chevronDown", size: 14 })
    ] }),
    f && /* @__PURE__ */ u.jsx("div", { className: "ahv-menu-list ahv-menu-panel", children: h })
  ] });
}
function V0({ columns: c, shown: o, onChange: h }) {
  const [f, p] = X.useState(!1);
  return /* @__PURE__ */ u.jsxs(cr, { label: "Columns", icon: "sliders", open: f, setOpen: p, children: [
    /* @__PURE__ */ u.jsx("p", { className: "ahv-dim ahv-small", children: "When, who and what always show." }),
    c.map((T) => /* @__PURE__ */ u.jsxs("label", { className: "ahv-check", children: [
      /* @__PURE__ */ u.jsx(
        "input",
        {
          type: "checkbox",
          checked: o.includes(T.key),
          onChange: (A) => h(A.target.checked ? [...o, T.key] : o.filter((w) => w !== T.key))
        }
      ),
      T.label
    ] }, T.key))
  ] });
}
function K0({ request: c, current: o, onOpen: h }) {
  var D;
  const [f, p] = X.useState(!1), T = Ot("views", () => c("views", { method: "GET" })), [A, w] = X.useState(""), [E, b] = X.useState(!1), [U, Y] = X.useState(!1), [q, B] = X.useState(null);
  if (!((D = T.data) != null && D.enabled)) return null;
  const Z = T.data.views, k = Z.find((H) => H.search === o), I = async (H) => {
    Y(!0), B(null);
    try {
      await H(), T.refresh(), w("");
    } catch (W) {
      B(W.message);
    } finally {
      Y(!1);
    }
  }, ee = (H, W = A, F = E) => I(() => c("views", { method: "POST", body: { id: H, name: W.trim(), search: o, shared: F } }));
  return /* @__PURE__ */ u.jsxs(cr, { label: k ? k.name : "Views", icon: "layers", open: f, setOpen: p, children: [
    Z.length ? /* @__PURE__ */ u.jsx("ul", { className: "ahv-views", children: Z.map((H) => /* @__PURE__ */ u.jsxs("li", { className: Ae(H === k && "ahv-views-on"), children: [
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
            onClick: () => ee(H.id, H.name, H.shared),
            children: /* @__PURE__ */ u.jsx(be, { name: "refresh", size: 14 })
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
            children: /* @__PURE__ */ u.jsx(be, { name: "close", size: 14 })
          }
        )
      ] })
    ] }, H.id)) }) : /* @__PURE__ */ u.jsx("p", { className: "ahv-dim ahv-small", children: "No saved views yet. Save the current search to come back to it." }),
    /* @__PURE__ */ u.jsxs("form", { className: "ahv-views-save", onSubmit: (H) => {
      H.preventDefault(), A.trim() && ee();
    }, children: [
      /* @__PURE__ */ u.jsx(
        "input",
        {
          className: "ahv-input",
          value: A,
          maxLength: 80,
          placeholder: "Name this search",
          "aria-label": "View name",
          onChange: (H) => w(H.target.value)
        }
      ),
      /* @__PURE__ */ u.jsxs("label", { className: "ahv-check", children: [
        /* @__PURE__ */ u.jsx("input", { type: "checkbox", checked: E, onChange: (H) => b(H.target.checked) }),
        "Share with my team"
      ] }),
      /* @__PURE__ */ u.jsx("button", { type: "submit", className: "ahv-button ahv-button-main", disabled: U || !A.trim(), children: "Save view" }),
      q && /* @__PURE__ */ u.jsx("span", { className: "ahv-bad ahv-small", children: q })
    ] })
  ] });
}
const J0 = { active: ["Active", "ahv-tag-ok"], failing: ["Failing", "ahv-tag-bad"], paused: ["Paused", "ahv-tag-warn"] }, rh = { events: "Events", requests: "API requests", both: "Events and API requests" }, Mh = {
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
}, Qs = (c) => c.destination === "webhook" ? c.target.url ?? "" : `s3://${[c.target.bucket, c.target.prefix].filter(Boolean).join("/")}`, oh = (c) => ({
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
function $0(c) {
  const o = {};
  for (const h of c.split(`
`)) {
    const f = h.indexOf(":");
    f > 0 && (o[h.slice(0, f).trim()] = h.slice(f + 1).trim());
  }
  return o;
}
function fh(c) {
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
    secret_headers: o ? $0(c.headers) : {},
    enabled: c.enabled,
    start: c.start
  };
}
const dh = () => Array.from(crypto.getRandomValues(new Uint8Array(24)), (c) => c.toString(16).padStart(2, "0")).join("");
function W0({ request: c, kinds: o, list: h, refresh: f }) {
  const [p, T] = X.useState(null), [A, w] = X.useState(!1), [E, b] = X.useState(null), U = async (D, H) => {
    w(!0), b(null);
    try {
      return await D(), H && b({ ok: !0, text: H }), f(), !0;
    } catch (W) {
      return b({ ok: !1, text: W.message }), !1;
    } finally {
      w(!1);
    }
  }, Y = async (D) => {
    D.preventDefault(), p && await U(() => c("streams", { method: "POST", body: fh(p) }), `${p.name.trim()} saved.`) && T(null);
  }, q = (D) => U(async () => {
    const H = await c(`streams/${D.id}/test`, { method: "POST" });
    if (!H.ok) throw new Error(`${D.name}: ${H.error}`);
  }, `${D.name}: the test line was delivered.`), B = (D) => U(
    () => c("streams", { method: "POST", body: { ...fh(oh(D)), enabled: !D.enabled } }),
    `${D.name} ${D.enabled ? "paused" : "resumed"}.`
  ), Z = (D) => window.confirm(`Remove ${D.name}? Nothing more is sent to ${Qs(D)}.`) && U(() => c(`streams/${D.id}`, { method: "DELETE" }), `${D.name} removed.`), k = (D) => T((H) => H && { ...H, ...D }), I = o.includes("requests") ? ["events", "requests", "both"] : ["events"], ee = p && !I.includes(p.kind) ? [...I, p.kind] : I;
  return /* @__PURE__ */ u.jsxs("section", { className: "ahv-streams", "aria-label": "Streams", children: [
    /* @__PURE__ */ u.jsxs("div", { className: "ahv-bar", children: [
      /* @__PURE__ */ u.jsx("p", { className: "ahv-dim ahv-small", children: "Each stream sends new records to your own system as they are sealed, a few minutes after they happen. Webhooks receive JSON lines signed with your secret; S3 buckets receive one gzip file per batch." }),
      !p && /* @__PURE__ */ u.jsx(
        "button",
        {
          type: "button",
          className: "ahv-button ahv-button-main ahv-push-right",
          onClick: () => {
            b(null), T({ ...Mh, secret: dh() });
          },
          children: "Add stream"
        }
      )
    ] }),
    h.streams.length > 0 && !p && /* @__PURE__ */ u.jsx("ul", { className: "ahv-stream-list", children: h.streams.map((D) => {
      const [H, W] = J0[D.state];
      return /* @__PURE__ */ u.jsxs("li", { children: [
        /* @__PURE__ */ u.jsxs("div", { className: "ahv-stream-main", children: [
          /* @__PURE__ */ u.jsx("strong", { children: D.name }),
          /* @__PURE__ */ u.jsx("span", { className: Ae("ahv-tag", W), children: H }),
          /* @__PURE__ */ u.jsxs("span", { className: "ahv-dim ahv-small", children: [
            rh[D.kind],
            D.query && /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
              " matching ",
              /* @__PURE__ */ u.jsx("code", { className: "ahv-mono", children: D.query })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ u.jsx("span", { className: "ahv-mono ahv-dim ahv-stream-where", title: Qs(D), children: Qs(D) }),
        /* @__PURE__ */ u.jsxs("span", { className: "ahv-small", children: [
          /* @__PURE__ */ u.jsx("strong", { className: "ahv-num", children: D.delivered.toLocaleString() }),
          " delivered",
          D.last_delivered_at && /* @__PURE__ */ u.jsxs("span", { className: "ahv-dim", children: [
            ", last ",
            ar(D.last_delivered_at) || D.last_delivered_at.slice(0, 16)
          ] })
        ] }),
        /* @__PURE__ */ u.jsxs("span", { className: "ahv-stream-tools", children: [
          /* @__PURE__ */ u.jsx("button", { type: "button", className: "ahv-link-button", disabled: A, onClick: () => q(D), children: "Send test" }),
          /* @__PURE__ */ u.jsx("button", { type: "button", className: "ahv-link-button", disabled: A, onClick: () => B(D), children: D.enabled ? "Pause" : "Resume" }),
          /* @__PURE__ */ u.jsx("button", { type: "button", className: "ahv-link-button", disabled: A, onClick: () => {
            b(null), T(oh(D));
          }, children: "Edit" }),
          /* @__PURE__ */ u.jsx("button", { type: "button", className: "ahv-icon-button", title: `Remove ${D.name}`, disabled: A, onClick: () => Z(D), children: /* @__PURE__ */ u.jsx(be, { name: "close", size: 14 }) })
        ] }),
        D.state === "failing" && D.error && /* @__PURE__ */ u.jsxs("span", { className: "ahv-bad ahv-small", children: [
          D.error,
          ". It is tried again shortly."
        ] })
      ] }, D.id);
    }) }),
    !h.streams.length && !p && /* @__PURE__ */ u.jsx("p", { className: "ahv-dim ahv-small", children: "No streams yet." }),
    p && /* @__PURE__ */ u.jsxs("form", { className: "ahv-stream-form", onSubmit: Y, children: [
      /* @__PURE__ */ u.jsxs("label", { className: "ahv-field", children: [
        /* @__PURE__ */ u.jsx("span", { children: "Name" }),
        /* @__PURE__ */ u.jsx("input", { className: "ahv-input", required: !0, maxLength: 80, value: p.name, placeholder: "CRM intake", onChange: (D) => k({ name: D.target.value }) })
      ] }),
      /* @__PURE__ */ u.jsxs("label", { className: "ahv-field", children: [
        /* @__PURE__ */ u.jsx("span", { children: "Records" }),
        /* @__PURE__ */ u.jsx("select", { className: "ahv-input", value: p.kind, disabled: ee.length < 2, onChange: (D) => k({ kind: D.target.value }), children: ee.map((D) => /* @__PURE__ */ u.jsx("option", { value: D, children: rh[D] }, D)) })
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
            onChange: (D) => k({ query: D.target.value })
          }
        )
      ] }),
      /* @__PURE__ */ u.jsxs("div", { className: "ahv-field ahv-field-wide", children: [
        /* @__PURE__ */ u.jsx("span", { children: "Send to" }),
        /* @__PURE__ */ u.jsx("div", { className: "ahv-segment", role: "group", "aria-label": "Destination", children: ["webhook", "s3"].map((D) => /* @__PURE__ */ u.jsx(
          "button",
          {
            type: "button",
            "aria-pressed": p.destination === D,
            disabled: !!p.id,
            onClick: () => k({ destination: D, secret: D === "webhook" && !p.id ? dh() : "" }),
            children: D === "webhook" ? "Webhook" : "S3 bucket"
          },
          D
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
              onChange: (D) => k({ url: D.target.value })
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
              onChange: (D) => k({ secret: D.target.value })
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
              onChange: (D) => k({ headers: D.target.value })
            }
          )
        ] })
      ] }) : /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
        /* @__PURE__ */ u.jsxs("label", { className: "ahv-field", children: [
          /* @__PURE__ */ u.jsx("span", { children: "Bucket" }),
          /* @__PURE__ */ u.jsx("input", { className: "ahv-input", required: !0, value: p.bucket, onChange: (D) => k({ bucket: D.target.value }) })
        ] }),
        /* @__PURE__ */ u.jsxs("label", { className: "ahv-field", children: [
          /* @__PURE__ */ u.jsxs("span", { children: [
            "Folder ",
            /* @__PURE__ */ u.jsx("em", { className: "ahv-dim", children: "(optional)" })
          ] }),
          /* @__PURE__ */ u.jsx("input", { className: "ahv-input", value: p.prefix, placeholder: "activity", onChange: (D) => k({ prefix: D.target.value }) })
        ] }),
        /* @__PURE__ */ u.jsxs("label", { className: "ahv-field", children: [
          /* @__PURE__ */ u.jsxs("span", { children: [
            "Region ",
            /* @__PURE__ */ u.jsx("em", { className: "ahv-dim", children: "(optional)" })
          ] }),
          /* @__PURE__ */ u.jsx("input", { className: "ahv-input", value: p.region, placeholder: "eu-central-1", onChange: (D) => k({ region: D.target.value }) })
        ] }),
        /* @__PURE__ */ u.jsxs("label", { className: "ahv-field", children: [
          /* @__PURE__ */ u.jsxs("span", { children: [
            "Endpoint ",
            /* @__PURE__ */ u.jsx("em", { className: "ahv-dim", children: "(for R2, MinIO …)" })
          ] }),
          /* @__PURE__ */ u.jsx("input", { className: "ahv-input ahv-mono", type: "url", value: p.endpoint, onChange: (D) => k({ endpoint: D.target.value }) })
        ] }),
        /* @__PURE__ */ u.jsxs("label", { className: "ahv-field", children: [
          /* @__PURE__ */ u.jsxs("span", { children: [
            "Access key ",
            p.id && /* @__PURE__ */ u.jsx("em", { className: "ahv-dim", children: "(blank keeps it)" })
          ] }),
          /* @__PURE__ */ u.jsx("input", { className: "ahv-input ahv-mono", required: !p.id, autoComplete: "off", value: p.accessKey, onChange: (D) => k({ accessKey: D.target.value }) })
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
              onChange: (D) => k({ secretKey: D.target.value })
            }
          )
        ] })
      ] }),
      !p.id && /* @__PURE__ */ u.jsxs("label", { className: "ahv-field ahv-field-wide", children: [
        /* @__PURE__ */ u.jsx("span", { children: "Start with" }),
        /* @__PURE__ */ u.jsxs("select", { className: "ahv-input", value: p.start, onChange: (D) => k({ start: D.target.value }), children: [
          /* @__PURE__ */ u.jsx("option", { value: "now", children: "Records from now on" }),
          /* @__PURE__ */ u.jsx("option", { value: "beginning", children: "Everything already kept, then what follows" })
        ] })
      ] }),
      /* @__PURE__ */ u.jsxs("div", { className: "ahv-bar ahv-field-wide", children: [
        /* @__PURE__ */ u.jsx("button", { type: "submit", className: "ahv-button ahv-button-main", disabled: A, children: A ? "Saving…" : p.id ? "Save changes" : "Add stream" }),
        /* @__PURE__ */ u.jsx("button", { type: "button", className: "ahv-button", disabled: A, onClick: () => T(null), children: "Cancel" })
      ] })
    ] }),
    E && /* @__PURE__ */ u.jsx("p", { role: E.ok ? "status" : "alert", className: Ae("ahv-small", E.ok ? "ahv-ok" : "ahv-bad"), children: E.text })
  ] });
}
const hh = [
  { value: "important", label: "Important", hint: "What people did, without the details behind it" },
  { value: "all", label: "All", hint: "Every record, each request's row changes inside its event" },
  { value: "problems", label: "Problems", hint: "Only what failed or was refused" }
], F0 = [
  { label: "All requests", search: {} },
  { label: "Changes only", search: { filters: { method: ["POST", "PUT", "PATCH", "DELETE"] } } },
  { label: "Errors", search: { status_from: 400 } }
], er = [
  { value: "1h", label: "Last hour", minutes: 60 },
  { value: "24h", label: "Last 24 hours", minutes: 1440 },
  { value: "7d", label: "Last 7 days", minutes: 10080 },
  { value: "30d", label: "Last 30 days", minutes: 43200 },
  { value: "all", label: "All time" },
  { value: "custom", label: "Dates…" }
], vh = {
  events: [
    { key: "where", label: "Where" },
    { key: "concerning", label: "Concerning" },
    { key: "result", label: "Result" },
    { key: "service", label: "Service" },
    { key: "ip", label: "IP address" }
  ],
  requests: [{ key: "where", label: "Where" }, { key: "service", label: "Service" }, { key: "ip", label: "IP address" }]
}, mh = ["where"], P0 = [], Oh = "activity-hub-columns", xu = ["kind", "view", "p", "q", "range", "from", "to", "cols"], Pn = (c) => c ? "all" : "7d";
function ph(c, o) {
  const h = (T) => {
    const A = c.get(T) ?? "";
    return Ks(A) ? A : "";
  }, f = h("from"), p = h("to");
  return { q: c.get("q") ?? "", from: f, to: p, range: c.get("range") || (f || p ? "custom" : Pn(o)) };
}
function I0(c) {
  var h;
  if (c.range === "custom")
    return { occurred_from: Ks(c.from) ? Js(c.from) : void 0, occurred_to: Ks(c.to) ? l0(c.to) : void 0 };
  const o = (h = er.find((f) => f.value === c.range)) == null ? void 0 : h.minutes;
  return o ? { occurred_from: `${n0(o).slice(0, 16)}:00` } : {};
}
function ep(c, o, h, f, p) {
  const T = { ...(h == null ? void 0 : h.search.filters) ?? {} }, A = { kind: c, filters: T, query: f.q.trim() || void 0, ...I0(f) };
  return c === "events" ? (A.view = o, A.action = h == null ? void 0 : h.search.action, p && Object.assign(A, { related_type: p.type, related_id: p.id })) : (A.status_from = h == null ? void 0 : h.search.status_from, p && (T.actor_id = p.id)), A;
}
const tp = (c) => {
  const o = new URLSearchParams();
  return c.forEach((h, f) => xu.includes(f) && o.set(f, h)), o.toString();
};
function ap() {
  try {
    return JSON.parse(localStorage.getItem(Oh) ?? "null") ?? mh;
  } catch {
    return mh;
  }
}
function lp({
  request: c,
  title: o = "Activity Log",
  description: h,
  presets: f = P0,
  kinds: p = ["events", "requests"],
  entity: T,
  params: A,
  onParamsChange: w,
  canExport: E = !1,
  showStatus: b = !0,
  pageSize: U = 100,
  liveEveryMs: Y = 5e3,
  className: q
}) {
  var Fl, il, ha, si, Pl, Il, ul;
  const [B, Z] = X.useState(() => new URLSearchParams()), k = A ?? B, I = X.useCallback((j) => w ? w(j) : Z(j), [w]), ee = k.get("kind") === "requests" && p.includes("requests") ? "requests" : p[0], D = ((Fl = hh.find((j) => j.value === k.get("view"))) == null ? void 0 : Fl.value) ?? "important", H = X.useMemo(() => ee === "events" ? [{ label: "Everything", search: {} }, ...f] : F0, [ee, f]), W = Math.min(Math.max(Number(k.get("p")) || 0, 0), H.length - 1), F = k.has("cols") ? (k.get("cols") || "").split(",").filter(Boolean) : ap(), ue = vh[ee].filter((j) => F.includes(j.key)), C = X.useMemo(() => ph(k, T), [k, T]), [P, Re] = X.useState(C), [Bt, at] = X.useState(k.toString());
  Bt !== k.toString() && (at(k.toString()), Re(C));
  const [Ne, bt] = X.useState(!1), [Dt, Ce] = X.useState(null), [_, G] = X.useState(null), [te, ge] = X.useState(!1), [v, R] = X.useState(null), Q = X.useRef(null), [, L] = X.useState(0);
  X.useEffect(() => {
    const j = setInterval(() => L((ce) => ce + 1), 3e4);
    return () => clearInterval(j);
  }, []);
  const J = X.useMemo(
    () => ep(ee, D, H[W], C, T),
    [ee, D, H, W, C, T]
  ), fe = JSON.stringify(J), K = Pm(c, J, U, Ne, Y), Je = X.useRef(null), ye = Ot(fe, () => {
    var xe;
    const j = fe, ce = !J.occurred_from && ((xe = Je.current) == null ? void 0 : xe.key) === j;
    return c("chart", { method: "POST", body: ce ? { ...J, occurred_from: Je.current.from } : J }).then((ne) => (J.occurred_from || (Je.current = { key: j, from: ne.occurred_from }), ne));
  }, Ne ? Y : void 0), nt = Ot("catalog", () => c("catalog", { method: "GET" })), el = Ot(b ? "status" : null, () => c("status", { method: "GET" }), 6e4), kt = Ot(E && !T ? "streams" : null, () => c("streams", { method: "GET" }), 6e4), [tl, Wl] = X.useState(!1), al = (j) => L0(j.received_at, oa(j) ? "events" : "access_logs", el.data), ei = (j) => () => c("values", { method: "POST", body: { ...J, field: j } }).then((ce) => ce.values), _u = Ot(`${fe}|service`, ei("service")), xt = Ot(`${fe}|origin`, ei("origin")), ti = (j = {}) => {
    const ce = new URLSearchParams(k);
    for (const Xe of xu) ce.delete(Xe);
    const xe = j.kind ?? ee;
    let ne = j.draft ?? P;
    if (xe !== ee) {
      const Xe = new Set(m0(xe));
      ne = { ...ne, q: Fn(ne.q).filter((Ut) => !Ut.field || Xe.has(Ut.field)).map((Ut) => Ut.text).join(" ") };
    }
    xe !== p[0] && ce.set("kind", xe), (j.view ?? D) !== "important" && ce.set("view", j.view ?? D);
    const Oe = j.preset ?? (j.kind && j.kind !== ee ? 0 : W);
    return Oe && ce.set("p", String(Oe)), ne.q.trim() && ce.set("q", ne.q.trim()), ne.range !== Pn(T) && ce.set("range", ne.range), ne.range === "custom" && (ne.from && ce.set("from", ne.from), ne.to && ce.set("to", ne.to)), (j.columns || k.has("cols")) && ce.set("cols", (j.columns ?? F).join(",")), ce;
  }, it = (j = {}) => {
    j.draft && Re(j.draft), I(ti(j));
  }, ai = (j) => {
    try {
      localStorage.setItem(Oh, JSON.stringify(j));
    } catch {
    }
    it({ draft: C, columns: j });
  }, ll = (j, ce) => {
    const xe = Fn(C.q).filter((ne) => ne.field !== j).map((ne) => ne.text);
    it({ draft: { ...C, q: [...xe, `${j}:${Ws(ce)}`].join(" ") } });
  }, li = (j) => {
    Ce(null), j.actor_id ? ll("actor", j.actor_id) : j.target_type && j.target_id && it({
      kind: "events",
      view: "all",
      preset: 0,
      draft: { q: `on:${j.target_type}:${Ws(j.target_id)}`, range: "all", from: "", to: "" }
    });
  }, ni = (j) => {
    const ce = P.q.trim();
    Re({ ...P, q: `${ce ? `${ce} ` : ""}${j}:` }), requestAnimationFrame(() => {
      const xe = Q.current;
      xe && (xe.focus(), xe.setSelectionRange(xe.value.length, xe.value.length));
    });
  }, Au = P.q.trim() !== C.q.trim() || P.range !== C.range || P.from !== C.from || P.to !== C.to, Ca = !!(P.range === "custom" && P.from && P.to && P.to < P.from), Jt = X.useRef(null), Ie = X.useRef(null), { hasMore: Rt, loadMore: $e, more: Yt, pageCount: ii } = K;
  X.useEffect(() => {
    if (!Jt.current || !Rt || Yt.loading || Yt.error || ii >= Zs) return;
    const j = new IntersectionObserver(([ce]) => ce.isIntersecting && $e(), { root: Ie.current, rootMargin: "240px" });
    return j.observe(Jt.current), () => j.disconnect();
  }, [Rt, $e, Yt.loading, Yt.error, ii, K.rows.length]);
  const ui = async (j) => {
    ge(!1), G(0);
    try {
      const { rows: ce, more: xe } = await s0(c, J, G);
      xe && R(`Only the newest ${bu.toLocaleString()} rows were exported. Narrow the dates for the rest.`);
      const ne = (/* @__PURE__ */ new Date()).toISOString().slice(0, 16).replace(/[-:T]/g, ""), Oe = `activity-${T ? `${T.type}-${T.id}-` : ""}${ee}-${ne}`;
      j === "csv" ? $s(o0(ee, ce), `${Oe}.csv`, "text/csv;charset=utf-8") : $s(f0(ce), `${Oe}.jsonl`, "application/x-ndjson");
    } catch (ce) {
      R(`Export failed: ${ce.message}`);
    } finally {
      G(null);
    }
  }, fa = ee === "events" ? "events" : "requests", da = ((il = nt.data) == null ? void 0 : il.actor_types) ?? {}, Gt = ((ha = nt.data) == null ? void 0 : ha.entities) ?? {}, nl = (j) => {
    var ce, xe;
    if (j.field === "action") return ((xe = (ce = nt.data) == null ? void 0 : ce.actions[j.value]) == null ? void 0 : xe.title) ?? j.value;
    if (j.field === "actor_type") return da[j.value] ?? j.value;
    if (j.field === "on") {
      const [ne, ...Oe] = j.value.split(":");
      return `${Gt[ne] ?? ft(ne)} ${Oe.join(":")}`;
    }
    return j.value;
  }, ut = K.rows, zu = { service: _u.data ?? [], origin: xt.data ?? [] }, ci = 3 + ue.length;
  return T && !(T.type && T.id) ? /* @__PURE__ */ u.jsx("div", { className: Ae("ahv ahv-log", q), children: /* @__PURE__ */ u.jsxs(Kl, { children: [
    "Nothing to show: no ",
    T.type || "record",
    " chosen."
  ] }) }) : /* @__PURE__ */ u.jsxs("div", { className: Ae("ahv ahv-log", q), children: [
    /* @__PURE__ */ u.jsxs("header", { className: "ahv-head", children: [
      /* @__PURE__ */ u.jsxs("div", { children: [
        /* @__PURE__ */ u.jsxs("h2", { className: "ahv-title", children: [
          /* @__PURE__ */ u.jsx(be, { name: "log", size: 18 }),
          T && o === "Activity Log" ? "Activity" : o
        ] }),
        /* @__PURE__ */ u.jsx("p", { className: "ahv-dim", children: h ?? (T ? `Everything about ${T.label}, and the API requests it made itself. Times are UTC.` : "Every action and API request, kept permanently and sealed. Times are UTC.") })
      ] }),
      /* @__PURE__ */ u.jsxs("div", { className: "ahv-actions", children: [
        !T && /* @__PURE__ */ u.jsx(
          K0,
          {
            request: c,
            current: tp(ti({ draft: C })),
            onOpen: (j) => {
              const ce = new URLSearchParams(k);
              for (const xe of xu) ce.delete(xe);
              new URLSearchParams(j).forEach((xe, ne) => xu.includes(ne) && ce.set(ne, xe)), I(ce);
            }
          }
        ),
        /* @__PURE__ */ u.jsx(V0, { columns: vh[ee], shown: F, onChange: ai }),
        E && /* @__PURE__ */ u.jsxs(
          cr,
          {
            label: _ === null ? "Export" : `Exporting… ${_.toLocaleString()}`,
            icon: "download",
            open: te,
            setOpen: ge,
            disabled: _ !== null || !ut.length,
            children: [
              /* @__PURE__ */ u.jsx("button", { type: "button", role: "menuitem", onClick: () => ui("csv"), children: "CSV, for spreadsheets" }),
              /* @__PURE__ */ u.jsx("button", { type: "button", role: "menuitem", onClick: () => ui("jsonl"), children: "JSON Lines, for other tools" })
            ]
          }
        ),
        ((si = kt.data) == null ? void 0 : si.enabled) && /* @__PURE__ */ u.jsxs(
          "button",
          {
            type: "button",
            className: "ahv-button",
            "aria-expanded": tl,
            onClick: () => Wl((j) => !j),
            title: "Send the log to your own systems as it is written",
            children: [
              /* @__PURE__ */ u.jsx(be, { name: "send", size: 14 }),
              "Streams",
              kt.data.streams.some((j) => j.state === "failing") && /* @__PURE__ */ u.jsx("span", { className: "ahv-count ahv-count-bad", children: "!" })
            ]
          }
        ),
        /* @__PURE__ */ u.jsxs(
          "button",
          {
            type: "button",
            className: Ae("ahv-button", Ne && "ahv-button-live"),
            "aria-pressed": Ne,
            title: "Check for new activity every few seconds",
            onClick: () => bt((j) => !j),
            children: [
              /* @__PURE__ */ u.jsx(be, { name: "live", size: 14, className: Ae(Ne && "ahv-pulse") }),
              Ne ? "Live" : "Go live"
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
              K.refresh(), ye.refresh();
            },
            children: [
              /* @__PURE__ */ u.jsx(be, { name: "refresh", size: 14, className: Ae(K.refreshing && !Ne && "ahv-spin") }),
              "Refresh"
            ]
          }
        )
      ] })
    ] }),
    tl && ((Pl = kt.data) == null ? void 0 : Pl.enabled) && /* @__PURE__ */ u.jsx(W0, { request: c, kinds: p, list: kt.data, refresh: kt.refresh }),
    b && !T && /* @__PURE__ */ u.jsx(X0, { request: c, status: el.data }),
    /* @__PURE__ */ u.jsxs("div", { className: "ahv-filters", children: [
      /* @__PURE__ */ u.jsxs("div", { className: "ahv-bar", children: [
        p.length > 1 && /* @__PURE__ */ u.jsx("div", { className: "ahv-segment", role: "group", "aria-label": "Records", children: p.map((j) => /* @__PURE__ */ u.jsx("button", { type: "button", "aria-pressed": ee === j, onClick: () => it({ kind: j, draft: C }), children: j === "events" ? "Events" : "API requests" }, j)) }),
        ee === "events" && /* @__PURE__ */ u.jsx("div", { className: "ahv-segment", role: "group", "aria-label": "Show", children: hh.map((j) => /* @__PURE__ */ u.jsx(
          "button",
          {
            type: "button",
            title: j.hint,
            "aria-pressed": D === j.value,
            onClick: () => it({ view: j.value, draft: C }),
            children: j.label
          },
          j.value
        )) }),
        H.length > 1 && /* @__PURE__ */ u.jsx("div", { className: "ahv-chips", role: "group", "aria-label": "Presets", children: H.map((j, ce) => /* @__PURE__ */ u.jsx(
          "button",
          {
            type: "button",
            className: "ahv-chip",
            "aria-pressed": W === ce,
            onClick: () => it({ preset: ce, draft: C }),
            children: j.label
          },
          j.label
        )) })
      ] }),
      /* @__PURE__ */ u.jsxs("div", { className: "ahv-searchbar", children: [
        /* @__PURE__ */ u.jsx(
          Z0,
          {
            value: P.q,
            inputRef: Q,
            onChange: (j) => Re({ ...P, q: j }),
            onSubmit: () => !Ca && it({ draft: P }),
            suggestions: (j) => g0(j, ee, nt.data, zu),
            placeholder: ee === "events" ? "Search: words, or actor:… action:trade.* -result:success on:account:100234" : "Search: words, or actor:… method:POST status:4xx route:/trading/*"
          }
        ),
        /* @__PURE__ */ u.jsx(
          "select",
          {
            className: "ahv-input ahv-range",
            value: P.range,
            "aria-label": "When",
            onChange: (j) => Re({ ...P, range: j.target.value }),
            children: er.map((j) => /* @__PURE__ */ u.jsx("option", { value: j.value, children: j.label }, j.value))
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
              onChange: (j) => Re({ ...P, from: j.target.value })
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
              onChange: (j) => Re({ ...P, to: j.target.value })
            }
          )
        ] }),
        /* @__PURE__ */ u.jsx("button", { type: "button", className: "ahv-button ahv-button-main", disabled: Ca, onClick: () => it({ draft: P }), children: "Search" })
      ] }),
      Ca && /* @__PURE__ */ u.jsx("em", { className: "ahv-bad ahv-small", children: "The end date is before the start date" }),
      /* @__PURE__ */ u.jsxs("div", { className: "ahv-bar ahv-add", children: [
        /* @__PURE__ */ u.jsx("span", { className: "ahv-dim ahv-small", children: "Add" }),
        lr(ee).filter((j) => !(T && (j.field === "on" || ee === "requests" && j.field === "actor"))).slice(0, 8).map((j) => /* @__PURE__ */ u.jsx("button", { type: "button", className: "ahv-link-button", title: j.hint, onClick: () => ni(j.field), children: j.label }, j.field)),
        Au && /* @__PURE__ */ u.jsx("span", { className: "ahv-warn ahv-small ahv-push-right", children: "Not searched yet: press Enter or Search" })
      ] }),
      (Fn(C.q).length > 0 || C.range !== Pn(T)) && /* @__PURE__ */ u.jsxs("div", { className: "ahv-applied", children: [
        Fn(C.q).map((j) => /* @__PURE__ */ u.jsxs("span", { className: Ae("ahv-pill", j.negated && "ahv-pill-not"), children: [
          /* @__PURE__ */ u.jsxs("span", { className: "ahv-dim", children: [
            j.negated ? "Not " : "",
            j.field ? `${p0(j.field)}:` : "Text:"
          ] }),
          " ",
          nl(j),
          /* @__PURE__ */ u.jsx("button", { type: "button", "aria-label": `Remove ${j.text}`, onClick: () => it({ draft: { ...C, q: h0(C.q, j) } }), children: /* @__PURE__ */ u.jsx(be, { name: "close", size: 12 }) })
        ] }, j.text)),
        C.range !== Pn(T) && /* @__PURE__ */ u.jsxs("span", { className: "ahv-pill", children: [
          /* @__PURE__ */ u.jsx("span", { className: "ahv-dim", children: "When:" }),
          " ",
          C.range === "custom" ? [C.from && $l(Ht(Js(C.from))), C.to && $l(Ht(Js(C.to)))].filter(Boolean).join(" – ") || "Any date" : (Il = er.find((j) => j.value === C.range)) == null ? void 0 : Il.label,
          /* @__PURE__ */ u.jsx(
            "button",
            {
              type: "button",
              "aria-label": "Remove the time range",
              onClick: () => it({ draft: { ...C, range: Pn(T), from: "", to: "" } }),
              children: /* @__PURE__ */ u.jsx(be, { name: "close", size: 12 })
            }
          )
        ] }),
        /* @__PURE__ */ u.jsx("button", { type: "button", className: "ahv-link-button", onClick: () => it({ preset: 0, draft: ph(new URLSearchParams(), T) }), children: "Clear all" })
      ] })
    ] }),
    ye.error && !ye.data ? null : /* @__PURE__ */ u.jsx(N0, { chart: ye.data, noun: fa, loading: ye.loading }),
    v && /* @__PURE__ */ u.jsx(Kl, { action: /* @__PURE__ */ u.jsx("button", { type: "button", className: "ahv-icon-button", "aria-label": "Dismiss", onClick: () => R(null), children: /* @__PURE__ */ u.jsx(be, { name: "close", size: 14 }) }), children: v }),
    K.error && ut.length > 0 && /* @__PURE__ */ u.jsxs(Kl, { tone: "bad", action: /* @__PURE__ */ u.jsx("button", { type: "button", className: "ahv-button", onClick: K.refresh, children: "Retry" }), children: [
      "Couldn't load newer activity: ",
      K.error.message
    ] }),
    K.error && !ut.length ? /* @__PURE__ */ u.jsx(Kl, { tone: "bad", action: /* @__PURE__ */ u.jsx("button", { type: "button", className: "ahv-button", onClick: K.refresh, children: "Retry" }), children: K.error.message }) : K.loading ? /* @__PURE__ */ u.jsx(nr, {}) : ut.length ? /* @__PURE__ */ u.jsxs("div", { className: "ahv-table-wrap", ref: Ie, children: [
      /* @__PURE__ */ u.jsxs("table", { className: "ahv-table", children: [
        /* @__PURE__ */ u.jsx("thead", { children: /* @__PURE__ */ u.jsxs("tr", { children: [
          /* @__PURE__ */ u.jsx("th", { children: "When (UTC)" }),
          /* @__PURE__ */ u.jsx("th", { children: "Who" }),
          /* @__PURE__ */ u.jsx("th", { children: ee === "events" ? "What happened" : "Request" }),
          ue.map((j) => /* @__PURE__ */ u.jsx("th", { children: j.label }, j.key))
        ] }) }),
        /* @__PURE__ */ u.jsx("tbody", { children: ut.map((j, ce) => {
          var xe;
          return /* @__PURE__ */ u.jsxs(X.Fragment, { children: [
            j.occurred_at.slice(0, 10) !== ((xe = ut[ce - 1]) == null ? void 0 : xe.occurred_at.slice(0, 10)) && /* @__PURE__ */ u.jsx("tr", { className: "ahv-day", children: /* @__PURE__ */ u.jsx("td", { colSpan: ci, children: t0(j.occurred_at) }) }),
            /* @__PURE__ */ u.jsxs(
              "tr",
              {
                tabIndex: 0,
                className: Ae("ahv-row", oa(j) && j.outcome !== "success" && "ahv-row-problem"),
                onClick: () => Ce(j),
                onKeyDown: (ne) => {
                  ne.target === ne.currentTarget && (ne.key === "Enter" || ne.key === " ") && (ne.preventDefault(), Ce(j));
                },
                children: [
                  /* @__PURE__ */ u.jsx("td", { children: /* @__PURE__ */ u.jsx(E0, { value: j.occurred_at, seal: al(j) }) }),
                  /* @__PURE__ */ u.jsx("td", { children: /* @__PURE__ */ u.jsx(
                    z0,
                    {
                      row: j,
                      actorTypes: da,
                      onFocus: T && ee === "requests" ? void 0 : () => li({ actor_id: j.actor_id })
                    }
                  ) }),
                  /* @__PURE__ */ u.jsx("td", { children: oa(j) ? /* @__PURE__ */ u.jsx(D0, { row: j }) : /* @__PURE__ */ u.jsx(Eh, { row: j }) }),
                  ue.map((ne) => /* @__PURE__ */ u.jsx("td", { className: "ahv-cell", children: ne.key === "where" ? /* @__PURE__ */ u.jsx(M0, { row: j }) : ne.key === "service" ? /* @__PURE__ */ u.jsx("span", { className: "ahv-dim", children: ft(j.service) }) : ne.key === "ip" ? /* @__PURE__ */ u.jsx("span", { className: "ahv-mono ahv-dim", children: j.ip || "—" }) : oa(j) ? ne.key === "result" ? j.outcome === "success" ? /* @__PURE__ */ u.jsx("span", { className: "ahv-dim", children: "success" }) : /* @__PURE__ */ u.jsx(Eu, { outcome: j.outcome }) : j.target_type ? /* @__PURE__ */ u.jsxs("span", { children: [
                    Gt[j.target_type] ?? ft(j.target_type),
                    " ",
                    /* @__PURE__ */ u.jsx("span", { className: "ahv-mono", children: j.target_name || j.target_id })
                  ] }) : "—" : null }, ne.key))
                ]
              }
            )
          ] }, j.id);
        }) })
      ] }),
      /* @__PURE__ */ u.jsx("div", { ref: Jt, "aria-hidden": "true" })
    ] }) : /* @__PURE__ */ u.jsxs("div", { className: "ahv-empty", children: [
      /* @__PURE__ */ u.jsx(be, { name: "log", size: 28 }),
      /* @__PURE__ */ u.jsxs("strong", { children: [
        "No ",
        fa,
        " match"
      ] }),
      /* @__PURE__ */ u.jsx("span", { className: "ahv-dim", children: ee === "events" && D === "important" ? "Try All, or a wider time range." : "Try a wider time range or fewer filters." })
    ] }),
    ut.length > 0 && /* @__PURE__ */ u.jsxs("footer", { className: "ahv-foot", children: [
      /* @__PURE__ */ u.jsxs("span", { className: "ahv-dim ahv-num", children: [
        i0(ut.length, fa.slice(0, -1)),
        " shown",
        Ne ? " · Live keeps the newest page" : K.trimmed ? " · the newest were let go to keep the list light; Refresh brings them back" : K.hasMore ? "" : " · that is all of them"
      ] }),
      Yt.error && /* @__PURE__ */ u.jsxs("span", { className: "ahv-bad ahv-small", children: [
        "Couldn't load more: ",
        Yt.error.message
      ] }),
      K.hasMore && /* @__PURE__ */ u.jsx("button", { type: "button", className: "ahv-button", onClick: $e, disabled: Yt.loading, children: Yt.loading ? "Loading…" : "Load more" })
    ] }),
    /* @__PURE__ */ u.jsx(
      zh,
      {
        request: c,
        row: Dt,
        onClose: () => Ce(null),
        onFocus: T ? void 0 : li,
        actorTypes: da,
        entities: (ul = nt.data) == null ? void 0 : ul.entities,
        seal: Dt ? al(Dt) : null
      }
    )
  ] });
}
const gh = 500;
function np({ request: c, entity: o, view: h = "all", action: f, newestFirst: p = !1, header: T, more: A, className: w }) {
  var I, ee, D, H;
  const E = o.type && o.id ? `${o.type}:${o.id}:${h}:${f ?? ""}` : null, b = Ot(E, () => c("search", {
    method: "POST",
    body: { kind: "events", filters: {}, related_type: o.type, related_id: o.id, view: h, action: f, limit: gh, details: !0 }
  })), U = Ot("catalog", () => c("catalog", { method: "GET" })), [Y, q] = X.useState(null), B = ((I = b.data) == null ? void 0 : I.items) ?? [], Z = p ? B : [...B].reverse(), k = !!((ee = b.data) != null && ee.next_cursor);
  return /* @__PURE__ */ u.jsxs("div", { className: Ae("ahv ahv-timeline", w), children: [
    b.error ? /* @__PURE__ */ u.jsxs(Kl, { tone: "bad", action: /* @__PURE__ */ u.jsx("button", { type: "button", className: "ahv-button", onClick: b.refresh, children: "Retry" }), children: [
      "Couldn't load: ",
      b.error.message
    ] }) : b.loading && !b.data ? /* @__PURE__ */ u.jsx(nr, { rows: 4 }) : Z.length ? /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
      T == null ? void 0 : T(B.length ? [...B].reverse() : [], k),
      k && /* @__PURE__ */ u.jsxs("p", { className: "ahv-dim ahv-small", children: [
        "Showing the newest ",
        gh,
        " steps.",
        A && /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
          " ",
          A
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
      /* @__PURE__ */ u.jsx("ol", { className: "ahv-steps", children: Z.map((W) => /* @__PURE__ */ u.jsx(up, { event: W, onOpen: q }, W.id)) })
    ] }) : /* @__PURE__ */ u.jsx("p", { className: "ahv-dim", children: "Nothing has been recorded about this yet." }),
    /* @__PURE__ */ u.jsx(
      zh,
      {
        request: c,
        row: Y,
        onClose: () => q(null),
        actorTypes: (D = U.data) == null ? void 0 : D.actor_types,
        entities: (H = U.data) == null ? void 0 : H.entities
      }
    )
  ] });
}
const ip = (c) => c.outcome !== "success" ? { icon: "alert", tone: "rose" } : { icon: c.icon ?? (c.category === "data" ? "layers" : "log"), tone: c.tone ?? "neutral" };
function up({ event: c, onOpen: o }) {
  var U, Y, q, B, Z;
  const [h, f] = X.useState(!1), { icon: p, tone: T } = ip(c), A = c.children ?? [], w = c.children_count ?? A.length, E = c.category !== "data" && ((U = c.change_list) != null && U.length) ? c.change_list : null, b = !!((Y = c.details) != null && Y.length) || w > 0;
  return /* @__PURE__ */ u.jsxs("li", { className: `ahv-step ahv-tone-${T}`, children: [
    /* @__PURE__ */ u.jsx("span", { className: "ahv-step-icon", "aria-hidden": "true", children: /* @__PURE__ */ u.jsx(be, { name: p, size: 14 }) }),
    /* @__PURE__ */ u.jsxs("div", { className: "ahv-step-main", children: [
      /* @__PURE__ */ u.jsxs("div", { className: "ahv-step-head", children: [
        /* @__PURE__ */ u.jsxs("div", { className: "ahv-stack", children: [
          /* @__PURE__ */ u.jsxs("button", { type: "button", className: "ahv-step-title", onClick: () => o(c), title: "Open the full detail", children: [
            c.title,
            /* @__PURE__ */ u.jsx(Eu, { outcome: c.outcome })
          ] }),
          /* @__PURE__ */ u.jsx(cp, { event: c })
        ] }),
        /* @__PURE__ */ u.jsxs("span", { className: "ahv-step-when", title: `${c.occurred_at} UTC`, children: [
          /* @__PURE__ */ u.jsx("span", { className: "ahv-mono", children: Tu(c.occurred_at) }),
          /* @__PURE__ */ u.jsx("span", { className: "ahv-dim", children: ar(c.occurred_at) || $l(Ht(c.occurred_at)) })
        ] })
      ] }),
      c.outcome !== "success" ? /* @__PURE__ */ u.jsx("p", { className: "ahv-step-problem", children: c.summary }) : (q = c.facts) != null && q.length ? /* @__PURE__ */ u.jsx(_h, { facts: c.facts }) : !E && c.summary !== c.title ? /* @__PURE__ */ u.jsx("p", { className: "ahv-sentence", children: c.summary }) : null,
      E && /* @__PURE__ */ u.jsx(ur, { changes: E, valueLabel: "Set to" }),
      b && /* @__PURE__ */ u.jsxs("button", { type: "button", className: "ahv-disclose", "aria-expanded": h, onClick: () => f((k) => !k), children: [
        /* @__PURE__ */ u.jsx(be, { name: "chevronDown", size: 13, className: Ae(h && "ahv-turned") }),
        h ? "Hide" : [((B = c.details) == null ? void 0 : B.length) && "Details", w > 0 && `${w} record change${w === 1 ? "" : "s"}`].filter(Boolean).join(" and ")
      ] }),
      h && /* @__PURE__ */ u.jsxs("div", { className: "ahv-step-more", children: [
        (Z = c.details) != null && Z.length ? /* @__PURE__ */ u.jsx(ir, { items: c.details.map((k) => [k.label, k.value]), mono: !0 }) : null,
        w > 0 && /* @__PURE__ */ u.jsx(sp, { records: A, counted: w, onOpen: o, parent: c })
      ] })
    ] })
  ] });
}
function cp({ event: c }) {
  return /* @__PURE__ */ u.jsxs("span", { className: "ahv-byline", children: [
    /* @__PURE__ */ u.jsx("span", { className: Ae("ahv-avatar ahv-avatar-small", c.actor_type === "system" && "ahv-avatar-system"), "aria-hidden": "true", children: xh(c.actor) }),
    [
      c.actor,
      c.actor_label,
      c.origin && ft(c.origin).toUpperCase(),
      c.actor_type !== "system" && c.device,
      c.country,
      c.ip
    ].filter(Boolean).map((o, h) => /* @__PURE__ */ u.jsx("span", { className: Ae(h === 0 ? "ahv-strong" : "ahv-sep"), children: o }, h))
  ] });
}
function sp({ records: c, counted: o, onOpen: h, parent: f }) {
  const [p, T] = X.useState(null);
  return /* @__PURE__ */ u.jsxs("div", { className: "ahv-records", children: [
    /* @__PURE__ */ u.jsxs("table", { className: "ahv-changes ahv-records-table", children: [
      /* @__PURE__ */ u.jsx("thead", { children: /* @__PURE__ */ u.jsxs("tr", { children: [
        /* @__PURE__ */ u.jsx("th", { children: "Record" }),
        /* @__PURE__ */ u.jsx("th", { children: "Change" }),
        /* @__PURE__ */ u.jsx("th", { children: "Fields" }),
        /* @__PURE__ */ u.jsx("th", { children: /* @__PURE__ */ u.jsx("span", { className: "ahv-hidden", children: "Detail" }) })
      ] }) }),
      /* @__PURE__ */ u.jsx("tbody", { children: c.map((A) => {
        const w = A.change_list ?? [], E = p === A.id;
        return /* @__PURE__ */ u.jsx(
          rp,
          {
            record: A,
            fields: w.length,
            open: E,
            onToggle: () => T(E ? null : A.id),
            onOpen: () => h(A),
            children: E && /* @__PURE__ */ u.jsx("tr", { className: "ahv-records-fields", children: /* @__PURE__ */ u.jsx("td", { colSpan: 4, children: /* @__PURE__ */ u.jsx(ur, { changes: w }) }) })
          },
          A.id
        );
      }) })
    ] }),
    o > c.length && /* @__PURE__ */ u.jsxs("button", { type: "button", className: "ahv-link-button", onClick: () => h(f), children: [
      o - c.length,
      " more in the full detail"
    ] })
  ] });
}
function rp({ record: c, fields: o, open: h, onToggle: f, onOpen: p, children: T }) {
  const A = c.action === "data.created" ? "Created" : c.action === "data.deleted" ? "Deleted" : "Updated";
  return /* @__PURE__ */ u.jsxs(u.Fragment, { children: [
    /* @__PURE__ */ u.jsxs("tr", { children: [
      /* @__PURE__ */ u.jsx("td", { children: /* @__PURE__ */ u.jsxs("button", { type: "button", className: "ahv-disclose", "aria-expanded": h, disabled: !o, onClick: f, children: [
        /* @__PURE__ */ u.jsx(be, { name: "chevronRight", size: 12, className: Ae(h && "ahv-turned-right") }),
        c.summary.replace(/^(Created|Updated|Deleted) /, "").split(":")[0]
      ] }) }),
      /* @__PURE__ */ u.jsx("td", { children: A }),
      /* @__PURE__ */ u.jsx("td", { className: "ahv-dim", children: c.action === "data.updated" ? (c.change_list ?? []).slice(0, 3).map((w) => w.label).join(", ") + (o > 3 ? ` and ${o - 3} more` : "") : `${o} value${o === 1 ? "" : "s"}` }),
      /* @__PURE__ */ u.jsx("td", { className: "ahv-cell-end", children: /* @__PURE__ */ u.jsx(
        "button",
        {
          type: "button",
          className: "ahv-icon-button",
          title: "Open the record's full detail",
          "aria-label": "Open the record's full detail",
          onClick: p,
          children: /* @__PURE__ */ u.jsx(be, { name: "arrowRight", size: 13 })
        }
      ) })
    ] }),
    T
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
      const o = this.shadowRoot ?? this.attachShadow({ mode: "open" }), h = document.createElement("style");
      h.textContent = Wm;
      const f = document.createElement("div");
      this.panel = document.createElement("div"), o.replaceChildren(h, f, this.panel), this.root = $m.createRoot(f);
      const p = document.documentElement, T = () => {
        var w;
        const A = p.classList.contains("dark") || p.dataset.theme === "dark";
        f.classList.toggle("ahv-dark-host", A), (w = this.panel) == null || w.classList.toggle("ahv-dark-host", A);
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
  "no-status"
];
let ju = sr;
class op extends ju {
  view(o) {
    const h = this.getAttribute("entity-type"), f = this.getAttribute("entity-id"), p = (this.getAttribute("kinds") || "events,requests").split(",").map((T) => T.trim());
    return /* @__PURE__ */ u.jsx(
      lp,
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
class fp extends ju {
  view(o) {
    return /* @__PURE__ */ u.jsx(
      np,
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
customElements.get("activity-log") || customElements.define("activity-log", op);
customElements.get("activity-timeline") || customElements.define("activity-timeline", fp);
