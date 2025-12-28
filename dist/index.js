'use strict';

var React = require('react');
var Table = require('@material-ui/core/Table');
var TableBody = require('@material-ui/core/TableBody');
var TableRow = require('@material-ui/core/TableRow');
var TableCell = require('@material-ui/core/TableCell');
var TableHead = require('@material-ui/core/TableHead');
var Button = require('@material-ui/core/Button');
var Switch = require('@material-ui/core/Switch');
var Select = require('@material-ui/core/Select');
var MenuItem = require('@material-ui/core/MenuItem');
var Snackbar = require('@material-ui/core/Snackbar');
var Alert = require('@material-ui/lab/Alert');
var TextField = require('@material-ui/core/TextField');
var Typography = require('@material-ui/core/Typography');
var Box = require('@material-ui/core/Box');
var Chip = require('@material-ui/core/Chip');
var VideogameAssetIcon = require('@material-ui/icons/VideogameAsset');
var Dialog = require('@material-ui/core/Dialog');
var DialogTitle = require('@material-ui/core/DialogTitle');
var DialogContent = require('@material-ui/core/DialogContent');
var DialogActions = require('@material-ui/core/DialogActions');
var List = require('@material-ui/core/List');
var ListItem = require('@material-ui/core/ListItem');
var ListItemText = require('@material-ui/core/ListItemText');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var Table__default = /*#__PURE__*/_interopDefaultLegacy(Table);
var TableBody__default = /*#__PURE__*/_interopDefaultLegacy(TableBody);
var TableRow__default = /*#__PURE__*/_interopDefaultLegacy(TableRow);
var TableCell__default = /*#__PURE__*/_interopDefaultLegacy(TableCell);
var TableHead__default = /*#__PURE__*/_interopDefaultLegacy(TableHead);
var Button__default = /*#__PURE__*/_interopDefaultLegacy(Button);
var Switch__default = /*#__PURE__*/_interopDefaultLegacy(Switch);
var Select__default = /*#__PURE__*/_interopDefaultLegacy(Select);
var MenuItem__default = /*#__PURE__*/_interopDefaultLegacy(MenuItem);
var Snackbar__default = /*#__PURE__*/_interopDefaultLegacy(Snackbar);
var Alert__default = /*#__PURE__*/_interopDefaultLegacy(Alert);
var TextField__default = /*#__PURE__*/_interopDefaultLegacy(TextField);
var Typography__default = /*#__PURE__*/_interopDefaultLegacy(Typography);
var Box__default = /*#__PURE__*/_interopDefaultLegacy(Box);
var Chip__default = /*#__PURE__*/_interopDefaultLegacy(Chip);
var VideogameAssetIcon__default = /*#__PURE__*/_interopDefaultLegacy(VideogameAssetIcon);
var Dialog__default = /*#__PURE__*/_interopDefaultLegacy(Dialog);
var DialogTitle__default = /*#__PURE__*/_interopDefaultLegacy(DialogTitle);
var DialogContent__default = /*#__PURE__*/_interopDefaultLegacy(DialogContent);
var DialogActions__default = /*#__PURE__*/_interopDefaultLegacy(DialogActions);
var List__default = /*#__PURE__*/_interopDefaultLegacy(List);
var ListItem__default = /*#__PURE__*/_interopDefaultLegacy(ListItem);
var ListItemText__default = /*#__PURE__*/_interopDefaultLegacy(ListItemText);

function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}

function toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}

function toPropertyKey(t) {
  var i = toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}

function _defineProperty(e, r, t) {
  return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}

function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}

function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}

function _arrayLikeToArray$1(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}

function _unsupportedIterableToArray$1(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray$1(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$1(r, a) : void 0;
  }
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray$1(r, e) || _nonIterableRest();
}

function asyncGeneratorStep(n, t, e, r, o, a, c) {
  try {
    var i = n[a](c),
      u = i.value;
  } catch (n) {
    return void e(n);
  }
  i.done ? t(u) : Promise.resolve(u).then(r, o);
}
function _asyncToGenerator(n) {
  return function () {
    var t = this,
      e = arguments;
    return new Promise(function (r, o) {
      var a = n.apply(t, e);
      function _next(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
      }
      function _throw(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
      }
      _next(void 0);
    });
  };
}

function createCommonjsModule(fn) {
  var module = { exports: {} };
	return fn(module, module.exports), module.exports;
}

var OverloadYield = createCommonjsModule(function (module) {
function _OverloadYield(e, d) {
  this.v = e, this.k = d;
}
module.exports = _OverloadYield, module.exports.__esModule = true, module.exports["default"] = module.exports;
});

var regeneratorDefine = createCommonjsModule(function (module) {
function _regeneratorDefine(e, r, n, t) {
  var i = Object.defineProperty;
  try {
    i({}, "", {});
  } catch (e) {
    i = 0;
  }
  module.exports = _regeneratorDefine = function regeneratorDefine(e, r, n, t) {
    function o(r, n) {
      _regeneratorDefine(e, r, function (e) {
        return this._invoke(r, n, e);
      });
    }
    r ? i ? i(e, r, {
      value: n,
      enumerable: !t,
      configurable: !t,
      writable: !t
    }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2));
  }, module.exports.__esModule = true, module.exports["default"] = module.exports, _regeneratorDefine(e, r, n, t);
}
module.exports = _regeneratorDefine, module.exports.__esModule = true, module.exports["default"] = module.exports;
});

var regenerator$1 = createCommonjsModule(function (module) {
function _regenerator() {
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */
  var e,
    t,
    r = "function" == typeof Symbol ? Symbol : {},
    n = r.iterator || "@@iterator",
    o = r.toStringTag || "@@toStringTag";
  function i(r, n, o, i) {
    var c = n && n.prototype instanceof Generator ? n : Generator,
      u = Object.create(c.prototype);
    return regeneratorDefine(u, "_invoke", function (r, n, o) {
      var i,
        c,
        u,
        f = 0,
        p = o || [],
        y = !1,
        G = {
          p: 0,
          n: 0,
          v: e,
          a: d,
          f: d.bind(e, 4),
          d: function d(t, r) {
            return i = t, c = 0, u = e, G.n = r, a;
          }
        };
      function d(r, n) {
        for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) {
          var o,
            i = p[t],
            d = G.p,
            l = i[2];
          r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0));
        }
        if (o || r > 1) return a;
        throw y = !0, n;
      }
      return function (o, p, l) {
        if (f > 1) throw TypeError("Generator is already running");
        for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) {
          i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u);
          try {
            if (f = 2, i) {
              if (c || (o = "next"), t = i[o]) {
                if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object");
                if (!t.done) return t;
                u = t.value, c < 2 && (c = 0);
              } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1);
              i = e;
            } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break;
          } catch (t) {
            i = e, c = 1, u = t;
          } finally {
            f = 1;
          }
        }
        return {
          value: t,
          done: y
        };
      };
    }(r, o, i), !0), u;
  }
  var a = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  t = Object.getPrototypeOf;
  var c = [][n] ? t(t([][n]())) : (regeneratorDefine(t = {}, n, function () {
      return this;
    }), t),
    u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c);
  function f(e) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, regeneratorDefine(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e;
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, regeneratorDefine(u, "constructor", GeneratorFunctionPrototype), regeneratorDefine(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", regeneratorDefine(GeneratorFunctionPrototype, o, "GeneratorFunction"), regeneratorDefine(u), regeneratorDefine(u, o, "Generator"), regeneratorDefine(u, n, function () {
    return this;
  }), regeneratorDefine(u, "toString", function () {
    return "[object Generator]";
  }), (module.exports = _regenerator = function _regenerator() {
    return {
      w: i,
      m: f
    };
  }, module.exports.__esModule = true, module.exports["default"] = module.exports)();
}
module.exports = _regenerator, module.exports.__esModule = true, module.exports["default"] = module.exports;
});

var regeneratorAsyncIterator = createCommonjsModule(function (module) {
function AsyncIterator(t, e) {
  function n(r, o, i, f) {
    try {
      var c = t[r](o),
        u = c.value;
      return u instanceof OverloadYield ? e.resolve(u.v).then(function (t) {
        n("next", t, i, f);
      }, function (t) {
        n("throw", t, i, f);
      }) : e.resolve(u).then(function (t) {
        c.value = t, i(c);
      }, function (t) {
        return n("throw", t, i, f);
      });
    } catch (t) {
      f(t);
    }
  }
  var r;
  this.next || (regeneratorDefine(AsyncIterator.prototype), regeneratorDefine(AsyncIterator.prototype, "function" == typeof Symbol && Symbol.asyncIterator || "@asyncIterator", function () {
    return this;
  })), regeneratorDefine(this, "_invoke", function (t, o, i) {
    function f() {
      return new e(function (e, r) {
        n(t, i, e, r);
      });
    }
    return r = r ? r.then(f, f) : f();
  }, !0);
}
module.exports = AsyncIterator, module.exports.__esModule = true, module.exports["default"] = module.exports;
});

var regeneratorAsyncGen = createCommonjsModule(function (module) {
function _regeneratorAsyncGen(r, e, t, o, n) {
  return new regeneratorAsyncIterator(regenerator$1().w(r, e, t, o), n || Promise);
}
module.exports = _regeneratorAsyncGen, module.exports.__esModule = true, module.exports["default"] = module.exports;
});

var regeneratorAsync = createCommonjsModule(function (module) {
function _regeneratorAsync(n, e, r, t, o) {
  var a = regeneratorAsyncGen(n, e, r, t, o);
  return a.next().then(function (n) {
    return n.done ? n.value : a.next();
  });
}
module.exports = _regeneratorAsync, module.exports.__esModule = true, module.exports["default"] = module.exports;
});

var regeneratorKeys = createCommonjsModule(function (module) {
function _regeneratorKeys(e) {
  var n = Object(e),
    r = [];
  for (var t in n) r.unshift(t);
  return function e() {
    for (; r.length;) if ((t = r.pop()) in n) return e.value = t, e.done = !1, e;
    return e.done = !0, e;
  };
}
module.exports = _regeneratorKeys, module.exports.__esModule = true, module.exports["default"] = module.exports;
});

var _typeof_1 = createCommonjsModule(function (module) {
function _typeof(o) {
  "@babel/helpers - typeof";

  return module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports, _typeof(o);
}
module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;
});

var regeneratorValues = createCommonjsModule(function (module) {
var _typeof = _typeof_1["default"];
function _regeneratorValues(e) {
  if (null != e) {
    var t = e["function" == typeof Symbol && Symbol.iterator || "@@iterator"],
      r = 0;
    if (t) return t.call(e);
    if ("function" == typeof e.next) return e;
    if (!isNaN(e.length)) return {
      next: function next() {
        return e && r >= e.length && (e = void 0), {
          value: e && e[r++],
          done: !e
        };
      }
    };
  }
  throw new TypeError(_typeof(e) + " is not iterable");
}
module.exports = _regeneratorValues, module.exports.__esModule = true, module.exports["default"] = module.exports;
});

var regeneratorRuntime$1 = createCommonjsModule(function (module) {
function _regeneratorRuntime() {

  var r = regenerator$1(),
    e = r.m(_regeneratorRuntime),
    t = (Object.getPrototypeOf ? Object.getPrototypeOf(e) : e.__proto__).constructor;
  function n(r) {
    var e = "function" == typeof r && r.constructor;
    return !!e && (e === t || "GeneratorFunction" === (e.displayName || e.name));
  }
  var o = {
    "throw": 1,
    "return": 2,
    "break": 3,
    "continue": 3
  };
  function a(r) {
    var e, t;
    return function (n) {
      e || (e = {
        stop: function stop() {
          return t(n.a, 2);
        },
        "catch": function _catch() {
          return n.v;
        },
        abrupt: function abrupt(r, e) {
          return t(n.a, o[r], e);
        },
        delegateYield: function delegateYield(r, o, a) {
          return e.resultName = o, t(n.d, regeneratorValues(r), a);
        },
        finish: function finish(r) {
          return t(n.f, r);
        }
      }, t = function t(r, _t, o) {
        n.p = e.prev, n.n = e.next;
        try {
          return r(_t, o);
        } finally {
          e.next = n.n;
        }
      }), e.resultName && (e[e.resultName] = n.v, e.resultName = void 0), e.sent = n.v, e.next = n.n;
      try {
        return r.call(this, e);
      } finally {
        n.p = e.prev, n.n = e.next;
      }
    };
  }
  return (module.exports = _regeneratorRuntime = function _regeneratorRuntime() {
    return {
      wrap: function wrap(e, t, n, o) {
        return r.w(a(e), t, n, o && o.reverse());
      },
      isGeneratorFunction: n,
      mark: r.m,
      awrap: function awrap(r, e) {
        return new OverloadYield(r, e);
      },
      AsyncIterator: regeneratorAsyncIterator,
      async: function async(r, e, t, o, u) {
        return (n(e) ? regeneratorAsyncGen : regeneratorAsync)(a(r), e, t, o, u);
      },
      keys: regeneratorKeys,
      values: regeneratorValues
    };
  }, module.exports.__esModule = true, module.exports["default"] = module.exports)();
}
module.exports = _regeneratorRuntime, module.exports.__esModule = true, module.exports["default"] = module.exports;
});

// TODO(Babel 8): Remove this file.

var runtime = regeneratorRuntime$1();
var regenerator = runtime;

// Copied from https://github.com/facebook/regenerator/blob/main/packages/runtime/runtime.js#L736=
try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}

function _classCallCheck(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}

function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, toPropertyKey(o.key), o);
  }
}
function _createClass(e, r, t) {
  return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}

function _assertThisInitialized(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}

function _possibleConstructorReturn(t, e) {
  if (e && ("object" == _typeof(e) || "function" == typeof e)) return e;
  if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
  return _assertThisInitialized(t);
}

function _getPrototypeOf(t) {
  return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
    return t.__proto__ || Object.getPrototypeOf(t);
  }, _getPrototypeOf(t);
}

function _setPrototypeOf(t, e) {
  return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
    return t.__proto__ = e, t;
  }, _setPrototypeOf(t, e);
}

function _inherits(t, e) {
  if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(t, "prototype", {
    writable: !1
  }), e && _setPrototypeOf(t, e);
}

function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var TabContent = /*#__PURE__*/function (_Component) {
  function TabContent(props) {
    var _this;
    _classCallCheck(this, TabContent);
    _this = _callSuper(this, TabContent, [props]);
    _defineProperty(_this, "handleStartOAuth", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/regenerator.mark(function _callee() {
      var _yield$_this$props$ip, _yield$_this$props$ip2, err, result;
      return regenerator.wrap(function (_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _this.showSnackbar('info', 'Opening Nintendo login window...');
            _context.next = 1;
            return _this.props.ipc.invoke('startOAuth');
          case 1:
            _yield$_this$props$ip = _context.sent;
            _yield$_this$props$ip2 = _slicedToArray(_yield$_this$props$ip, 2);
            err = _yield$_this$props$ip2[0];
            result = _yield$_this$props$ip2[1];
            if (!err) {
              _context.next = 2;
              break;
            }
            _this.showSnackbar('error', "Login failed: ".concat(err.message));
            return _context.abrupt("return");
          case 2:
            if (result.needsSelection) {
              // Multiple accounts - show selection dialog
              _this.setState({
                accountSelectionDialog: true,
                accounts: result.accounts,
                oauthState: result.state,
                oauthVerifier: result.verifier
              });
            } else {
              // Success - single account
              _this.showSnackbar('success', 'Authenticated! Discovering devices...');
              _this.handleDiscover();
            }
          case 3:
          case "end":
            return _context.stop();
        }
      }, _callee);
    })));
    _defineProperty(_this, "handleSelectAccount", /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator(/*#__PURE__*/regenerator.mark(function _callee2(account) {
        var _yield$_this$props$ip3, _yield$_this$props$ip4, err;
        return regenerator.wrap(function (_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _this.setState({
                accountSelectionDialog: false
              });
              _this.showSnackbar('info', "Selecting ".concat(account.name, "..."));
              _context2.next = 1;
              return _this.props.ipc.invoke('selectAccount', {
                accountHref: account.href,
                state: _this.state.oauthState,
                verifier: _this.state.oauthVerifier
              });
            case 1:
              _yield$_this$props$ip3 = _context2.sent;
              _yield$_this$props$ip4 = _slicedToArray(_yield$_this$props$ip3, 1);
              err = _yield$_this$props$ip4[0];
              if (err) {
                _this.showSnackbar('error', "Selection failed: ".concat(err.message));
              } else {
                _this.showSnackbar('success', 'Authenticated! Discovering devices...');
                _this.handleDiscover();
              }
            case 2:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }());
    _defineProperty(_this, "handleAuthenticate", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/regenerator.mark(function _callee3() {
      var _yield$_this$props$ip5, _yield$_this$props$ip6, err;
      return regenerator.wrap(function (_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 1;
            return _this.props.ipc.invoke('authenticateNintendo', _this.state.sessionToken);
          case 1:
            _yield$_this$props$ip5 = _context3.sent;
            _yield$_this$props$ip6 = _slicedToArray(_yield$_this$props$ip5, 1);
            err = _yield$_this$props$ip6[0];
            if (err) {
              _this.showSnackbar('error', "Authentication failed: ".concat(err.message));
            } else {
              _this.showSnackbar('success', 'Authenticated! Now discovering devices...');
              _this.handleDiscover();
            }
          case 2:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    })));
    _defineProperty(_this, "handleDiscover", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/regenerator.mark(function _callee4() {
      var _yield$_this$props$ip7, _yield$_this$props$ip8, err, result;
      return regenerator.wrap(function (_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 1;
            return _this.props.ipc.invoke('discoverDevices');
          case 1:
            _yield$_this$props$ip7 = _context4.sent;
            _yield$_this$props$ip8 = _slicedToArray(_yield$_this$props$ip7, 2);
            err = _yield$_this$props$ip8[0];
            result = _yield$_this$props$ip8[1];
            if (err) {
              _this.showSnackbar('error', "Discovery failed: ".concat(err.message));
            } else {
              _this.showSnackbar('success', "Found ".concat(Object.keys(result.childPlayers).length, " child players"));
            }
          case 2:
          case "end":
            return _context4.stop();
        }
      }, _callee4);
    })));
    _defineProperty(_this, "handlePairChild", /*#__PURE__*/function () {
      var _ref5 = _asyncToGenerator(/*#__PURE__*/regenerator.mark(function _callee5(playerId, allow2ChildId) {
        var _yield$_this$props$ip9, _yield$_this$props$ip0, err;
        return regenerator.wrap(function (_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 1;
              return _this.props.ipc.invoke('pairChild', {
                playerId: playerId,
                allow2ChildId: allow2ChildId,
                activityType: 1 // Gaming
              });
            case 1:
              _yield$_this$props$ip9 = _context5.sent;
              _yield$_this$props$ip0 = _slicedToArray(_yield$_this$props$ip9, 1);
              err = _yield$_this$props$ip0[0];
              if (err) {
                _this.showSnackbar('error', "Pairing failed: ".concat(err.message));
              } else {
                _this.showSnackbar('success', 'Paired and monitoring started!');
              }
            case 2:
            case "end":
              return _context5.stop();
          }
        }, _callee5);
      }));
      return function (_x2, _x3) {
        return _ref5.apply(this, arguments);
      };
    }());
    _defineProperty(_this, "handleToggleMonitoring", /*#__PURE__*/function () {
      var _ref6 = _asyncToGenerator(/*#__PURE__*/regenerator.mark(function _callee6(playerId, enabled) {
        var _yield$_this$props$ip1, _yield$_this$props$ip10, err;
        return regenerator.wrap(function (_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 1;
              return _this.props.ipc.invoke('toggleMonitoring', {
                playerId: playerId,
                enabled: enabled
              });
            case 1:
              _yield$_this$props$ip1 = _context6.sent;
              _yield$_this$props$ip10 = _slicedToArray(_yield$_this$props$ip1, 1);
              err = _yield$_this$props$ip10[0];
              if (err) {
                _this.showSnackbar('error', "Toggle failed: ".concat(err.message));
              } else {
                _this.showSnackbar('success', enabled ? 'Monitoring enabled' : 'Monitoring paused');
              }
            case 2:
            case "end":
              return _context6.stop();
          }
        }, _callee6);
      }));
      return function (_x4, _x5) {
        return _ref6.apply(this, arguments);
      };
    }());
    _defineProperty(_this, "handleSyncNow", /*#__PURE__*/function () {
      var _ref7 = _asyncToGenerator(/*#__PURE__*/regenerator.mark(function _callee7(playerId) {
        var _yield$_this$props$ip11, _yield$_this$props$ip12, err;
        return regenerator.wrap(function (_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 1;
              return _this.props.ipc.invoke('syncNow', playerId);
            case 1:
              _yield$_this$props$ip11 = _context7.sent;
              _yield$_this$props$ip12 = _slicedToArray(_yield$_this$props$ip11, 1);
              err = _yield$_this$props$ip12[0];
              if (err) {
                _this.showSnackbar('error', "Sync failed: ".concat(err.message));
              } else {
                _this.showSnackbar('success', 'Synced successfully!');
              }
            case 2:
            case "end":
              return _context7.stop();
          }
        }, _callee7);
      }));
      return function (_x6) {
        return _ref7.apply(this, arguments);
      };
    }());
    _defineProperty(_this, "handleUnpair", /*#__PURE__*/function () {
      var _ref8 = _asyncToGenerator(/*#__PURE__*/regenerator.mark(function _callee8(playerId) {
        var _yield$_this$props$ip13, _yield$_this$props$ip14, err;
        return regenerator.wrap(function (_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              if (window.confirm('Unpair this child?')) {
                _context8.next = 1;
                break;
              }
              return _context8.abrupt("return");
            case 1:
              _context8.next = 2;
              return _this.props.ipc.invoke('unpairChild', playerId);
            case 2:
              _yield$_this$props$ip13 = _context8.sent;
              _yield$_this$props$ip14 = _slicedToArray(_yield$_this$props$ip13, 1);
              err = _yield$_this$props$ip14[0];
              if (err) {
                _this.showSnackbar('error', "Unpair failed: ".concat(err.message));
              } else {
                _this.showSnackbar('success', 'Unpaired');
              }
            case 3:
            case "end":
              return _context8.stop();
          }
        }, _callee8);
      }));
      return function (_x7) {
        return _ref8.apply(this, arguments);
      };
    }());
    _this.state = {
      sessionToken: '',
      snackbar: null,
      accountSelectionDialog: false,
      accounts: [],
      oauthState: null,
      oauthVerifier: null
    };
    _this.setupIPCListeners();
    return _this;
  }
  _inherits(TabContent, _Component);
  return _createClass(TabContent, [{
    key: "setupIPCListeners",
    value: function setupIPCListeners() {
      var _this2 = this;
      if (!this.props.ipc) return;
      this.props.ipc.on('gamingActive', function (event, data) {
        console.log('Gaming active:', data);
      });
      this.props.ipc.on('quotaExhausted', function (event, data) {
        _this2.showSnackbar('warning', "".concat(data.nickname, "'s gaming has been automatically disabled (quota exhausted)"));
      });
    }
  }, {
    key: "showSnackbar",
    value: function showSnackbar(severity, message) {
      this.setState({
        snackbar: {
          severity: severity,
          message: message
        }
      });
    }
  }, {
    key: "formatTime",
    value: function formatTime(minutes) {
      var hours = Math.floor(minutes / 60);
      var mins = minutes % 60;
      return hours > 0 ? "".concat(hours, "h ").concat(mins, "m") : "".concat(mins, "m");
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;
      if (!this.props || !this.props.data) {
        return /*#__PURE__*/React__default["default"].createElement("div", {
          style: {
            padding: 20
          }
        }, "Loading...");
      }
      var _this$props = this.props,
        data = _this$props.data,
        children = _this$props.children;
      var auth = data.auth,
        childPlayers = data.childPlayers,
        pairings = data.pairings;
      var isAuthenticated = !!(auth !== null && auth !== void 0 && auth.sessionToken);
      return /*#__PURE__*/React__default["default"].createElement("div", {
        style: {
          padding: 20
        }
      }, /*#__PURE__*/React__default["default"].createElement(Typography__default["default"], {
        variant: "h5",
        gutterBottom: true
      }, /*#__PURE__*/React__default["default"].createElement(VideogameAssetIcon__default["default"], {
        style: {
          verticalAlign: 'middle',
          marginRight: 8
        }
      }), "Nintendo Switch Parental Controls"), !isAuthenticated && /*#__PURE__*/React__default["default"].createElement(Box__default["default"], {
        mb: 3
      }, /*#__PURE__*/React__default["default"].createElement(Typography__default["default"], {
        variant: "h6"
      }, "Login to Nintendo Account"), /*#__PURE__*/React__default["default"].createElement(Typography__default["default"], {
        variant: "body2",
        color: "textSecondary",
        paragraph: true
      }, "Click below to securely login with your Nintendo Account. Your credentials are never stored - only the session token."), /*#__PURE__*/React__default["default"].createElement(Button__default["default"], {
        variant: "contained",
        color: "primary",
        size: "large",
        onClick: this.handleStartOAuth,
        startIcon: /*#__PURE__*/React__default["default"].createElement(VideogameAssetIcon__default["default"], null),
        style: {
          marginRight: 10
        }
      }, "Login with Nintendo"), /*#__PURE__*/React__default["default"].createElement(Typography__default["default"], {
        variant: "caption",
        color: "textSecondary",
        display: "block",
        style: {
          marginTop: 10
        }
      }, "Advanced: Have a session token already? ", /*#__PURE__*/React__default["default"].createElement(Button__default["default"], {
        size: "small",
        onClick: function onClick() {
          return _this3.setState({
            showManualAuth: !_this3.state.showManualAuth
          });
        }
      }, "Manual Login")), this.state.showManualAuth && /*#__PURE__*/React__default["default"].createElement(Box__default["default"], {
        mt: 2
      }, /*#__PURE__*/React__default["default"].createElement(TextField__default["default"], {
        label: "Nintendo Session Token",
        value: this.state.sessionToken,
        onChange: function onChange(e) {
          return _this3.setState({
            sessionToken: e.target.value
          });
        },
        fullWidth: true,
        margin: "normal",
        type: "password",
        helperText: "Get from npx nxapi nso token --json"
      }), /*#__PURE__*/React__default["default"].createElement(Button__default["default"], {
        variant: "outlined",
        color: "primary",
        onClick: this.handleAuthenticate,
        disabled: !this.state.sessionToken
      }, "Authenticate Manually"))), isAuthenticated && Object.keys(childPlayers || {}).length === 0 && /*#__PURE__*/React__default["default"].createElement(Box__default["default"], {
        mb: 3
      }, /*#__PURE__*/React__default["default"].createElement(Button__default["default"], {
        variant: "contained",
        color: "primary",
        onClick: this.handleDiscover
      }, "Discover Nintendo Children")), isAuthenticated && Object.keys(childPlayers || {}).length > 0 && /*#__PURE__*/React__default["default"].createElement(Table__default["default"], null, /*#__PURE__*/React__default["default"].createElement(TableHead__default["default"], null, /*#__PURE__*/React__default["default"].createElement(TableRow__default["default"], null, /*#__PURE__*/React__default["default"].createElement(TableCell__default["default"], null, "Nintendo Child"), /*#__PURE__*/React__default["default"].createElement(TableCell__default["default"], null, "Monitor & Enforce"), /*#__PURE__*/React__default["default"].createElement(TableCell__default["default"], null, "Paired Allow2 Child"), /*#__PURE__*/React__default["default"].createElement(TableCell__default["default"], null, "Today's Play Time"), /*#__PURE__*/React__default["default"].createElement(TableCell__default["default"], null, "Status"), /*#__PURE__*/React__default["default"].createElement(TableCell__default["default"], null, "Actions"))), /*#__PURE__*/React__default["default"].createElement(TableBody__default["default"], null, Object.entries(childPlayers || {}).map(function (_ref9) {
        var _ref0 = _slicedToArray(_ref9, 2),
          playerId = _ref0[0],
          player = _ref0[1];
        var pairing = pairings[playerId];
        var allow2Child = pairing && children && children[pairing.allow2ChildId];
        return /*#__PURE__*/React__default["default"].createElement(TableRow__default["default"], {
          key: playerId
        }, /*#__PURE__*/React__default["default"].createElement(TableCell__default["default"], null, /*#__PURE__*/React__default["default"].createElement("strong", null, player.nickname)), /*#__PURE__*/React__default["default"].createElement(TableCell__default["default"], null, pairing ? /*#__PURE__*/React__default["default"].createElement(Switch__default["default"], {
          checked: pairing.enabled,
          onChange: function onChange(e) {
            return _this3.handleToggleMonitoring(playerId, e.target.checked);
          },
          color: "primary"
        }) : /*#__PURE__*/React__default["default"].createElement(Typography__default["default"], {
          variant: "caption",
          color: "textSecondary"
        }, "Not paired")), /*#__PURE__*/React__default["default"].createElement(TableCell__default["default"], null, pairing ? /*#__PURE__*/React__default["default"].createElement("strong", null, (allow2Child === null || allow2Child === void 0 ? void 0 : allow2Child.name) || 'Unknown') : /*#__PURE__*/React__default["default"].createElement(Select__default["default"], {
          value: "",
          onChange: function onChange(e) {
            return _this3.handlePairChild(playerId, e.target.value);
          },
          displayEmpty: true
        }, /*#__PURE__*/React__default["default"].createElement(MenuItem__default["default"], {
          value: "",
          disabled: true
        }, "Select child..."), children && Object.values(children).map(function (child) {
          return /*#__PURE__*/React__default["default"].createElement(MenuItem__default["default"], {
            key: child.id,
            value: child.id
          }, child.name);
        }))), /*#__PURE__*/React__default["default"].createElement(TableCell__default["default"], null, player.playingTime > 0 ? /*#__PURE__*/React__default["default"].createElement("span", null, _this3.formatTime(player.playingTime)) : /*#__PURE__*/React__default["default"].createElement(Typography__default["default"], {
          variant: "caption",
          color: "textSecondary"
        }, "None")), /*#__PURE__*/React__default["default"].createElement(TableCell__default["default"], null, player.isPlaying && /*#__PURE__*/React__default["default"].createElement(Chip__default["default"], {
          icon: /*#__PURE__*/React__default["default"].createElement(VideogameAssetIcon__default["default"], null),
          label: "Playing Now",
          color: "primary",
          size: "small"
        }), !player.isPlaying && (pairing === null || pairing === void 0 ? void 0 : pairing.enabled) && /*#__PURE__*/React__default["default"].createElement(Chip__default["default"], {
          label: "Monitoring",
          size: "small"
        }), !pairing && /*#__PURE__*/React__default["default"].createElement(Chip__default["default"], {
          label: "Not configured",
          size: "small"
        })), /*#__PURE__*/React__default["default"].createElement(TableCell__default["default"], null, pairing && /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(Button__default["default"], {
          size: "small",
          onClick: function onClick() {
            return _this3.handleSyncNow(playerId);
          }
        }, "Sync"), /*#__PURE__*/React__default["default"].createElement(Button__default["default"], {
          size: "small",
          color: "secondary",
          onClick: function onClick() {
            return _this3.handleUnpair(playerId);
          }
        }, "Unpair"))));
      }))), /*#__PURE__*/React__default["default"].createElement(Dialog__default["default"], {
        open: this.state.accountSelectionDialog,
        onClose: function onClose() {
          return _this3.setState({
            accountSelectionDialog: false
          });
        }
      }, /*#__PURE__*/React__default["default"].createElement(DialogTitle__default["default"], null, "Select Nintendo Account"), /*#__PURE__*/React__default["default"].createElement(DialogContent__default["default"], null, /*#__PURE__*/React__default["default"].createElement(Typography__default["default"], {
        variant: "body2",
        color: "textSecondary",
        paragraph: true
      }, "Multiple accounts found. Select the one with parental controls:"), /*#__PURE__*/React__default["default"].createElement(List__default["default"], null, this.state.accounts.map(function (account, idx) {
        return /*#__PURE__*/React__default["default"].createElement(ListItem__default["default"], {
          button: true,
          key: idx,
          onClick: function onClick() {
            return _this3.handleSelectAccount(account);
          }
        }, /*#__PURE__*/React__default["default"].createElement(ListItemText__default["default"], {
          primary: account.name,
          secondary: "Click to select this account"
        }));
      }))), /*#__PURE__*/React__default["default"].createElement(DialogActions__default["default"], null, /*#__PURE__*/React__default["default"].createElement(Button__default["default"], {
        onClick: function onClick() {
          return _this3.setState({
            accountSelectionDialog: false
          });
        }
      }, "Cancel"))), this.state.snackbar && /*#__PURE__*/React__default["default"].createElement(Snackbar__default["default"], {
        open: true,
        autoHideDuration: 6000,
        onClose: function onClose() {
          return _this3.setState({
            snackbar: null
          });
        }
      }, /*#__PURE__*/React__default["default"].createElement(Alert__default["default"], {
        severity: this.state.snackbar.severity,
        onClose: function onClose() {
          return _this3.setState({
            snackbar: null
          });
        }
      }, this.state.snackbar.message)));
    }
  }]);
}(React.Component);

// Copyright [2021] [Allow2 Pty Ltd]
var OAuthWindowManager = /*#__PURE__*/function () {
  function OAuthWindowManager(BrowserWindow) {
    _classCallCheck(this, OAuthWindowManager);
    this.BrowserWindow = BrowserWindow;
    this.authWindow = null;
  }
  return _createClass(OAuthWindowManager, [{
    key: "startOAuthFlow",
    value: function () {
      var _startOAuthFlow = _asyncToGenerator(/*#__PURE__*/regenerator.mark(function _callee3(authUrl, state, verifier, nintendoAuth) {
        var _this = this;
        return regenerator.wrap(function (_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              return _context3.abrupt("return", new Promise(function (resolve, reject) {
                _this.authWindow = new _this.BrowserWindow({
                  width: 500,
                  height: 700,
                  webPreferences: {
                    nodeIntegration: false,
                    contextIsolation: true,
                    javascript: true
                  },
                  title: 'Login to Nintendo Account',
                  autoHideMenuBar: true
                });
                var redirectUrl = null;
                var accounts = [];
                var oauthState = state;
                var oauthVerifier = verifier;
                _this.authWindow.webContents.on('did-finish-load', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/regenerator.mark(function _callee() {
                  var result, _t;
                  return regenerator.wrap(function (_context) {
                    while (1) switch (_context.prev = _context.next) {
                      case 0:
                        _context.prev = 0;
                        _context.next = 1;
                        return _this.authWindow.webContents.executeJavaScript("\n            (function() {\n              const buttons = Array.from(document.querySelectorAll('button, a'))\n                .filter(el => {\n                  const text = el.textContent || '';\n                  const href = el.href || el.getAttribute('href') || '';\n                  return text.includes('Select') ||\n                         text.includes('person') ||\n                         href.includes('npf54789bef');\n                });\n\n              if (buttons.length > 0) {\n                const accountData = buttons.map((btn, idx) => {\n                  const parent = btn.closest('div, li, section');\n                  const nameEl = parent ? parent.querySelector('[class*=\"name\"], [class*=\"user\"], h2, h3, strong') : null;\n                  const name = nameEl ? nameEl.textContent.trim() : 'Account ' + (idx + 1);\n                  const href = btn.href || btn.getAttribute('href') || '';\n\n                  return { name, href, element: idx };\n                });\n\n                return {\n                  found: true,\n                  accounts: accountData,\n                  count: buttons.length\n                };\n              }\n\n              return { found: false };\n            })();\n          ");
                      case 1:
                        result = _context.sent;
                        if (!(result && result.found)) {
                          _context.next = 4;
                          break;
                        }
                        accounts = result.accounts;
                        if (!(result.count === 1)) {
                          _context.next = 3;
                          break;
                        }
                        _context.next = 2;
                        return _this.authWindow.webContents.executeJavaScript("\n                const buttons = Array.from(document.querySelectorAll('button, a'))\n                  .filter(el => {\n                    const text = el.textContent || '';\n                    const href = el.href || el.getAttribute('href') || '';\n                    return text.includes('Select') ||\n                           text.includes('person') ||\n                           href.includes('npf54789bef');\n                  });\n                if (buttons[0]) buttons[0].click();\n              ");
                      case 2:
                        _context.next = 4;
                        break;
                      case 3:
                        _this.authWindow.close();
                        resolve({
                          accounts: accounts,
                          needsSelection: true,
                          state: oauthState,
                          verifier: oauthVerifier
                        });
                      case 4:
                        _context.next = 6;
                        break;
                      case 5:
                        _context.prev = 5;
                        _t = _context["catch"](0);
                        console.error('Error injecting script:', _t);
                      case 6:
                      case "end":
                        return _context.stop();
                    }
                  }, _callee, null, [[0, 5]]);
                })));
                _this.authWindow.webContents.on('will-redirect', function (event, url) {
                  if (url.startsWith('npf54789befb391a838://auth')) {
                    event.preventDefault();
                    redirectUrl = url;
                    _this.authWindow.close();
                  }
                });
                _this.authWindow.webContents.on('did-navigate', function (event, url) {
                  if (url.startsWith('npf54789befb391a838://auth')) {
                    redirectUrl = url;
                    _this.authWindow.close();
                  }
                });
                _this.authWindow.on('closed', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/regenerator.mark(function _callee2() {
                  var params, sessionToken, _t2;
                  return regenerator.wrap(function (_context2) {
                    while (1) switch (_context2.prev = _context2.next) {
                      case 0:
                        _this.authWindow = null;
                        if (!redirectUrl) {
                          _context2.next = 6;
                          break;
                        }
                        _context2.prev = 1;
                        params = _this.parseRedirectUrl(redirectUrl);
                        if (!(params.state !== state)) {
                          _context2.next = 2;
                          break;
                        }
                        reject(new Error('Invalid state parameter'));
                        return _context2.abrupt("return");
                      case 2:
                        _context2.next = 3;
                        return nintendoAuth.exchangeCodeForSessionToken(params.session_token_code, verifier);
                      case 3:
                        sessionToken = _context2.sent;
                        resolve({
                          sessionToken: sessionToken
                        });
                        _context2.next = 5;
                        break;
                      case 4:
                        _context2.prev = 4;
                        _t2 = _context2["catch"](1);
                        reject(_t2);
                      case 5:
                        _context2.next = 7;
                        break;
                      case 6:
                        if (accounts.length === 0) {
                          reject(new Error('OAuth flow cancelled or failed'));
                        }
                      case 7:
                      case "end":
                        return _context2.stop();
                    }
                  }, _callee2, null, [[1, 4]]);
                })));
                _this.authWindow.loadURL(authUrl);
              }));
            case 1:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }));
      function startOAuthFlow(_x, _x2, _x3, _x4) {
        return _startOAuthFlow.apply(this, arguments);
      }
      return startOAuthFlow;
    }()
  }, {
    key: "selectAccount",
    value: function () {
      var _selectAccount = _asyncToGenerator(/*#__PURE__*/regenerator.mark(function _callee5(accountHref, state, verifier, nintendoAuth) {
        var _this2 = this;
        return regenerator.wrap(function (_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              return _context5.abrupt("return", new Promise(function (resolve, reject) {
                _this2.authWindow = new _this2.BrowserWindow({
                  width: 500,
                  height: 700,
                  show: false,
                  webPreferences: {
                    nodeIntegration: false,
                    contextIsolation: true
                  }
                });
                var redirectUrl = null;
                _this2.authWindow.webContents.on('will-redirect', function (event, url) {
                  if (url.startsWith('npf54789befb391a838://auth')) {
                    event.preventDefault();
                    redirectUrl = url;
                    _this2.authWindow.close();
                  }
                });
                _this2.authWindow.webContents.on('did-navigate', function (event, url) {
                  if (url.startsWith('npf54789befb391a838://auth')) {
                    redirectUrl = url;
                    _this2.authWindow.close();
                  }
                });
                _this2.authWindow.on('closed', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/regenerator.mark(function _callee4() {
                  var params, sessionToken, _t3;
                  return regenerator.wrap(function (_context4) {
                    while (1) switch (_context4.prev = _context4.next) {
                      case 0:
                        _this2.authWindow = null;
                        if (!redirectUrl) {
                          _context4.next = 5;
                          break;
                        }
                        _context4.prev = 1;
                        params = _this2.parseRedirectUrl(redirectUrl);
                        _context4.next = 2;
                        return nintendoAuth.exchangeCodeForSessionToken(params.session_token_code, verifier);
                      case 2:
                        sessionToken = _context4.sent;
                        resolve({
                          sessionToken: sessionToken
                        });
                        _context4.next = 4;
                        break;
                      case 3:
                        _context4.prev = 3;
                        _t3 = _context4["catch"](1);
                        reject(_t3);
                      case 4:
                        _context4.next = 6;
                        break;
                      case 5:
                        reject(new Error('Account selection failed'));
                      case 6:
                      case "end":
                        return _context4.stop();
                    }
                  }, _callee4, null, [[1, 3]]);
                })));
                _this2.authWindow.loadURL(accountHref);
              }));
            case 1:
            case "end":
              return _context5.stop();
          }
        }, _callee5);
      }));
      function selectAccount(_x5, _x6, _x7, _x8) {
        return _selectAccount.apply(this, arguments);
      }
      return selectAccount;
    }()
  }, {
    key: "parseRedirectUrl",
    value: function parseRedirectUrl(url) {
      var hash = url.split('#')[1];
      if (!hash) throw new Error('No hash in redirect URL');
      var params = {};
      hash.split('&').forEach(function (pair) {
        var _pair$split = pair.split('='),
          _pair$split2 = _slicedToArray(_pair$split, 2),
          key = _pair$split2[0],
          value = _pair$split2[1];
        params[key] = decodeURIComponent(value);
      });
      return params;
    }
  }, {
    key: "close",
    value: function close() {
      if (this.authWindow) {
        this.authWindow.close();
        this.authWindow = null;
      }
    }
  }]);
}();

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }

// Use CommonJS build to avoid ES module issues with axios
var _require = require('@allow2/nintendo-switch-api'),
  NintendoAuth = _require.NintendoAuth,
  NintendoParentalAPI = _require.NintendoParentalAPI,
  DeviceManager = _require.DeviceManager,
  PlayTimeMonitor = _require.PlayTimeMonitor;
function plugin(context) {
  var nintendo = {};
  var state = null;
  var auth = null;
  var api = null;
  var deviceManager = null;
  var playTimeMonitor = null;
  var oauthManager = null;
  nintendo.onLoad = function (loadState) {
    console.log('Nintendo Switch plugin loading...');
    state = loadState || {
      auth: {
        sessionToken: null
      },
      devices: {},
      childPlayers: {},
      pairings: {},
      // playerId → { allow2ChildId, activityType, enabled, deviceId }
      settings: {
        pollInterval: 300000
      }
    };

    // Initialize Nintendo API
    auth = new NintendoAuth();
    if (state.auth.sessionToken) {
      auth.setSessionToken(state.auth.sessionToken);
    }
    api = new NintendoParentalAPI(auth);
    deviceManager = new DeviceManager(api);
    playTimeMonitor = new PlayTimeMonitor(api);
    oauthManager = new OAuthWindowManager(context.BrowserWindow);

    // Setup monitoring events
    playTimeMonitor.on('playTimeIncreased', /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(/*#__PURE__*/regenerator.mark(function _callee(data) {
        var pairing, child, quota, _t;
        return regenerator.wrap(function (_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              console.log('Play time increased:', data);

              // Find pairing
              pairing = state.pairings[data.playerId];
              if (!(!pairing || !pairing.enabled)) {
                _context.next = 1;
                break;
              }
              return _context.abrupt("return");
            case 1:
              _context.prev = 1;
              _context.next = 2;
              return context.allow2.reportUsage(pairing.allow2ChildId, pairing.activityType, data.delta);
            case 2:
              // Check quota
              child = context.allow2.getChild(pairing.allow2ChildId);
              quota = child.activities[pairing.activityType];
              if (!(quota && quota.timeRemaining <= 0)) {
                _context.next = 4;
                break;
              }
              _context.next = 3;
              return deviceManager.disableGaming(pairing.deviceId);
            case 3:
              context.sendToRenderer && context.sendToRenderer('quotaExhausted', {
                playerId: data.playerId,
                nickname: data.nickname,
                allow2ChildId: pairing.allow2ChildId
              });
            case 4:
              _context.next = 6;
              break;
            case 5:
              _context.prev = 5;
              _t = _context["catch"](1);
              console.error('Error reporting usage:', _t);
            case 6:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[1, 5]]);
      }));
      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
    playTimeMonitor.on('gamingActive', function (data) {
      context.sendToRenderer && context.sendToRenderer('gamingActive', data);
    });

    // Start monitoring paired children
    Object.entries(state.pairings).forEach(function (_ref2) {
      var _ref3 = _slicedToArray(_ref2, 2);
        _ref3[0];
        var pairing = _ref3[1];
      if (pairing.enabled && pairing.deviceId) {
        playTimeMonitor.startMonitoring(pairing.deviceId, state.settings.pollInterval);
      }
    });
    setupIPCHandlers(context);
    console.log('Nintendo Switch plugin loaded');
  };
  nintendo.newState = function (newState) {
    state = newState;
  };
  nintendo.onSetEnabled = function (enabled) {
    if (enabled) {
      Object.entries(state.pairings).forEach(function (_ref4) {
        var _ref5 = _slicedToArray(_ref4, 2);
          _ref5[0];
          var pairing = _ref5[1];
        if (pairing.enabled) {
          playTimeMonitor.startMonitoring(pairing.deviceId, state.settings.pollInterval);
        }
      });
    } else {
      playTimeMonitor.cleanup();
    }
  };
  nintendo.onUnload = function (callback) {
    var _oauthManager, _playTimeMonitor;
    (_oauthManager = oauthManager) === null || _oauthManager === void 0 || _oauthManager.close();
    (_playTimeMonitor = playTimeMonitor) === null || _playTimeMonitor === void 0 || _playTimeMonitor.cleanup();
    callback(null);
  };
  function setupIPCHandlers(context) {
    // Start OAuth flow
    context.ipcMain.handle('startOAuth', /*#__PURE__*/function () {
      var _ref6 = _asyncToGenerator(/*#__PURE__*/regenerator.mark(function _callee2(event) {
        var _auth$generateAuthUrl, authUrl, oauthState, verifier, result, _t2;
        return regenerator.wrap(function (_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              // Generate OAuth URL with PKCE
              _auth$generateAuthUrl = auth.generateAuthUrl(), authUrl = _auth$generateAuthUrl.authUrl, oauthState = _auth$generateAuthUrl.state, verifier = _auth$generateAuthUrl.verifier; // Open browser and handle flow
              _context2.next = 1;
              return oauthManager.startOAuthFlow(authUrl, oauthState, verifier, auth);
            case 1:
              result = _context2.sent;
              if (!result.needsSelection) {
                _context2.next = 2;
                break;
              }
              return _context2.abrupt("return", [null, {
                needsSelection: true,
                accounts: result.accounts,
                state: result.state,
                verifier: result.verifier
              }]);
            case 2:
              // Single account or selection complete - save token
              state.auth = {
                sessionToken: result.sessionToken
              };
              context.configurationUpdate(state);

              // Authenticate
              _context2.next = 3;
              return auth.authenticate();
            case 3:
              return _context2.abrupt("return", [null, {
                success: true,
                sessionToken: result.sessionToken
              }]);
            case 4:
              _context2.next = 6;
              break;
            case 5:
              _context2.prev = 5;
              _t2 = _context2["catch"](0);
              return _context2.abrupt("return", [_t2]);
            case 6:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[0, 5]]);
      }));
      return function (_x2) {
        return _ref6.apply(this, arguments);
      };
    }());

    // Handle account selection (multiple accounts case)
    context.ipcMain.handle('selectAccount', /*#__PURE__*/function () {
      var _ref8 = _asyncToGenerator(/*#__PURE__*/regenerator.mark(function _callee3(event, _ref7) {
        var accountHref, oauthState, verifier, result, _t3;
        return regenerator.wrap(function (_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              accountHref = _ref7.accountHref, oauthState = _ref7.state, verifier = _ref7.verifier;
              _context3.prev = 1;
              _context3.next = 2;
              return oauthManager.selectAccount(accountHref, oauthState, verifier, auth);
            case 2:
              result = _context3.sent;
              // Save session token
              state.auth = {
                sessionToken: result.sessionToken
              };
              context.configurationUpdate(state);

              // Authenticate
              _context3.next = 3;
              return auth.authenticate();
            case 3:
              return _context3.abrupt("return", [null, {
                success: true
              }]);
            case 4:
              _context3.prev = 4;
              _t3 = _context3["catch"](1);
              return _context3.abrupt("return", [_t3]);
            case 5:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[1, 4]]);
      }));
      return function (_x3, _x4) {
        return _ref8.apply(this, arguments);
      };
    }());

    // Authenticate (legacy - keep for backward compatibility)
    context.ipcMain.handle('authenticateNintendo', /*#__PURE__*/function () {
      var _ref9 = _asyncToGenerator(/*#__PURE__*/regenerator.mark(function _callee4(event, sessionToken) {
        var _t4;
        return regenerator.wrap(function (_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              auth.setSessionToken(sessionToken);
              _context4.next = 1;
              return auth.authenticate();
            case 1:
              state.auth = {
                sessionToken: sessionToken
              };
              context.configurationUpdate(state);
              return _context4.abrupt("return", [null, {
                success: true
              }]);
            case 2:
              _context4.prev = 2;
              _t4 = _context4["catch"](0);
              return _context4.abrupt("return", [_t4]);
            case 3:
            case "end":
              return _context4.stop();
          }
        }, _callee4, null, [[0, 2]]);
      }));
      return function (_x5, _x6) {
        return _ref9.apply(this, arguments);
      };
    }());

    // Discover devices and children
    context.ipcMain.handle('discoverDevices', /*#__PURE__*/function () {
      var _ref0 = _asyncToGenerator(/*#__PURE__*/regenerator.mark(function _callee5(event) {
        var devices, childPlayers, _iterator, _step, device, players, _t5, _t6;
        return regenerator.wrap(function (_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 1;
              return deviceManager.discover();
            case 1:
              devices = _context5.sent;
              childPlayers = {};
              _iterator = _createForOfIteratorHelper(devices);
              _context5.prev = 2;
              _iterator.s();
            case 3:
              if ((_step = _iterator.n()).done) {
                _context5.next = 6;
                break;
              }
              device = _step.value;
              _context5.next = 4;
              return deviceManager.getChildPlayers(device.deviceId);
            case 4:
              players = _context5.sent;
              players.forEach(function (player) {
                childPlayers[player.playerId] = player;
              });
            case 5:
              _context5.next = 3;
              break;
            case 6:
              _context5.next = 8;
              break;
            case 7:
              _context5.prev = 7;
              _t5 = _context5["catch"](2);
              _iterator.e(_t5);
            case 8:
              _context5.prev = 8;
              _iterator.f();
              return _context5.finish(8);
            case 9:
              state.devices = devices.reduce(function (acc, d) {
                return _objectSpread(_objectSpread({}, acc), {}, _defineProperty({}, d.deviceId, d));
              }, {});
              state.childPlayers = childPlayers;
              context.configurationUpdate(state);
              return _context5.abrupt("return", [null, {
                devices: devices,
                childPlayers: childPlayers
              }]);
            case 10:
              _context5.prev = 10;
              _t6 = _context5["catch"](0);
              return _context5.abrupt("return", [_t6]);
            case 11:
            case "end":
              return _context5.stop();
          }
        }, _callee5, null, [[0, 10], [2, 7, 8, 9]]);
      }));
      return function (_x7) {
        return _ref0.apply(this, arguments);
      };
    }());

    // Pair child
    context.ipcMain.handle('pairChild', /*#__PURE__*/function () {
      var _ref10 = _asyncToGenerator(/*#__PURE__*/regenerator.mark(function _callee6(event, _ref1) {
        var playerId, allow2ChildId, activityType, player, pairing, _t7;
        return regenerator.wrap(function (_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              playerId = _ref1.playerId, allow2ChildId = _ref1.allow2ChildId, activityType = _ref1.activityType;
              _context6.prev = 1;
              player = state.childPlayers[playerId];
              pairing = {
                allow2ChildId: allow2ChildId,
                activityType: activityType || 1,
                enabled: true,
                deviceId: player.deviceId
              };
              state.pairings[playerId] = pairing;
              context.configurationUpdate(state);
              playTimeMonitor.startMonitoring(player.deviceId, state.settings.pollInterval);
              return _context6.abrupt("return", [null, {
                success: true
              }]);
            case 2:
              _context6.prev = 2;
              _t7 = _context6["catch"](1);
              return _context6.abrupt("return", [_t7]);
            case 3:
            case "end":
              return _context6.stop();
          }
        }, _callee6, null, [[1, 2]]);
      }));
      return function (_x8, _x9) {
        return _ref10.apply(this, arguments);
      };
    }());

    // Toggle monitoring
    context.ipcMain.handle('toggleMonitoring', /*#__PURE__*/function () {
      var _ref12 = _asyncToGenerator(/*#__PURE__*/regenerator.mark(function _callee7(event, _ref11) {
        var playerId, enabled, pairing, child, quota, _t8;
        return regenerator.wrap(function (_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              playerId = _ref11.playerId, enabled = _ref11.enabled;
              _context7.prev = 1;
              state.pairings[playerId].enabled = enabled;
              context.configurationUpdate(state);
              pairing = state.pairings[playerId];
              if (!enabled) {
                _context7.next = 3;
                break;
              }
              playTimeMonitor.startMonitoring(pairing.deviceId, state.settings.pollInterval);

              // Re-enable gaming if Allow2 quota available
              child = context.allow2.getChild(pairing.allow2ChildId);
              quota = child.activities[pairing.activityType];
              if (!(quota && quota.timeRemaining > 0)) {
                _context7.next = 2;
                break;
              }
              _context7.next = 2;
              return deviceManager.enableGaming(pairing.deviceId, quota.timeRemaining);
            case 2:
              _context7.next = 4;
              break;
            case 3:
              playTimeMonitor.stopMonitoring(pairing.deviceId);
            case 4:
              return _context7.abrupt("return", [null, {
                success: true
              }]);
            case 5:
              _context7.prev = 5;
              _t8 = _context7["catch"](1);
              return _context7.abrupt("return", [_t8]);
            case 6:
            case "end":
              return _context7.stop();
          }
        }, _callee7, null, [[1, 5]]);
      }));
      return function (_x0, _x1) {
        return _ref12.apply(this, arguments);
      };
    }());

    // Manual sync
    context.ipcMain.handle('syncNow', /*#__PURE__*/function () {
      var _ref13 = _asyncToGenerator(/*#__PURE__*/regenerator.mark(function _callee8(event, playerId) {
        var pairing, _t9;
        return regenerator.wrap(function (_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              _context8.prev = 0;
              pairing = state.pairings[playerId];
              _context8.next = 1;
              return playTimeMonitor.poll(pairing.deviceId);
            case 1:
              return _context8.abrupt("return", [null, {
                success: true
              }]);
            case 2:
              _context8.prev = 2;
              _t9 = _context8["catch"](0);
              return _context8.abrupt("return", [_t9]);
            case 3:
            case "end":
              return _context8.stop();
          }
        }, _callee8, null, [[0, 2]]);
      }));
      return function (_x10, _x11) {
        return _ref13.apply(this, arguments);
      };
    }());

    // Unpair
    context.ipcMain.handle('unpairChild', /*#__PURE__*/function () {
      var _ref14 = _asyncToGenerator(/*#__PURE__*/regenerator.mark(function _callee9(event, playerId) {
        var pairing, _t0;
        return regenerator.wrap(function (_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              _context9.prev = 0;
              pairing = state.pairings[playerId];
              playTimeMonitor.stopMonitoring(pairing.deviceId);
              delete state.pairings[playerId];
              context.configurationUpdate(state);
              return _context9.abrupt("return", [null, {
                success: true
              }]);
            case 1:
              _context9.prev = 1;
              _t0 = _context9["catch"](0);
              return _context9.abrupt("return", [_t0]);
            case 2:
            case "end":
              return _context9.stop();
          }
        }, _callee9, null, [[0, 1]]);
      }));
      return function (_x12, _x13) {
        return _ref14.apply(this, arguments);
      };
    }());
  }
  return nintendo;
}
module.exports = {
  plugin: plugin,
  TabContent: TabContent
};
