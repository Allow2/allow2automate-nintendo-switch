import axios from 'axios';
import { EventEmitter } from 'events';

function _assertThisInitialized(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
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
function _callSuper(t, o, e) {
  return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
}
function _classCallCheck(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
  }
}
function _createClass(e, r, t) {
  return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}
function _getPrototypeOf(t) {
  return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
    return t.__proto__ || Object.getPrototypeOf(t);
  }, _getPrototypeOf(t);
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
function _isNativeReflectConstruct() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
  } catch (t) {}
  return (_isNativeReflectConstruct = function () {
    return !!t;
  })();
}
function _possibleConstructorReturn(t, e) {
  if (e && ("object" == typeof e || "function" == typeof e)) return e;
  if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
  return _assertThisInitialized(t);
}
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
    return _regeneratorDefine(u, "_invoke", function (r, n, o) {
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
          d: function (t, r) {
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
              } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1);
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
  var c = [][n] ? t(t([][n]())) : (_regeneratorDefine(t = {}, n, function () {
      return this;
    }), t),
    u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c);
  function f(e) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e;
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine(u), _regeneratorDefine(u, o, "Generator"), _regeneratorDefine(u, n, function () {
    return this;
  }), _regeneratorDefine(u, "toString", function () {
    return "[object Generator]";
  }), (_regenerator = function () {
    return {
      w: i,
      m: f
    };
  })();
}
function _regeneratorDefine(e, r, n, t) {
  var i = Object.defineProperty;
  try {
    i({}, "", {});
  } catch (e) {
    i = 0;
  }
  _regeneratorDefine = function (e, r, n, t) {
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
  }, _regeneratorDefine(e, r, n, t);
}
function _setPrototypeOf(t, e) {
  return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
    return t.__proto__ = e, t;
  }, _setPrototypeOf(t, e);
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}

var NintendoAuth = /*#__PURE__*/function () {
  function NintendoAuth() {
    _classCallCheck(this, NintendoAuth);
    this.sessionToken = null;
    this.accessToken = null;
    this.expiresAt = null;
  }

  /**
   * Set session token (long-lived, obtained via nxapi-cli or OAuth flow)
   */
  return _createClass(NintendoAuth, [{
    key: "setSessionToken",
    value: function setSessionToken(token) {
      this.sessionToken = token;
    }

    /**
     * Exchange session token for access token (15-minute expiry)
     */
  }, {
    key: "authenticate",
    value: (function () {
      var _authenticate = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var response, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              if (this.sessionToken) {
                _context.n = 1;
                break;
              }
              throw new Error('Session token not set');
            case 1:
              _context.p = 1;
              _context.n = 2;
              return axios.post('https://accounts.nintendo.com/connect/1.0.0/api/token', {
                client_id: '54789befb391a838',
                session_token: this.sessionToken,
                grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer-session-token'
              });
            case 2:
              response = _context.v;
              this.accessToken = response.data.access_token;
              this.expiresAt = Date.now() + response.data.expires_in * 1000;
              return _context.a(2, this.accessToken);
            case 3:
              _context.p = 3;
              _t = _context.v;
              throw new Error("Authentication failed: ".concat(_t.message));
            case 4:
              return _context.a(2);
          }
        }, _callee, this, [[1, 3]]);
      }));
      function authenticate() {
        return _authenticate.apply(this, arguments);
      }
      return authenticate;
    }()
    /**
     * Auto-refresh token if expired
     */
    )
  }, {
    key: "ensureValidToken",
    value: (function () {
      var _ensureValidToken = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              if (!(!this.accessToken || Date.now() >= this.expiresAt)) {
                _context2.n = 1;
                break;
              }
              _context2.n = 1;
              return this.authenticate();
            case 1:
              return _context2.a(2, this.accessToken);
          }
        }, _callee2, this);
      }));
      function ensureValidToken() {
        return _ensureValidToken.apply(this, arguments);
      }
      return ensureValidToken;
    }()
    /**
     * Get authorization headers
     */
    )
  }, {
    key: "getHeaders",
    value: (function () {
      var _getHeaders = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              _context3.n = 1;
              return this.ensureValidToken();
            case 1:
              return _context3.a(2, {
                'Authorization': "Bearer ".concat(this.accessToken),
                'User-Agent': 'Allow2Automate/1.0.0',
                'X-Moon-App-Id': 'com.nintendo.znma',
                'X-Moon-Os': 'IOS',
                'X-Moon-Os-Version': '15.0.0',
                'X-Moon-Model': 'iPhone',
                'X-Moon-App-Display-Version': '1.22.0',
                'X-Moon-App-Internal-Version': '222',
                'X-Moon-TimeZone': 'America/New_York',
                'X-Moon-Os-Language': 'en-US',
                'X-Moon-App-Language': 'en-US',
                'Content-Type': 'application/json'
              });
          }
        }, _callee3, this);
      }));
      function getHeaders() {
        return _getHeaders.apply(this, arguments);
      }
      return getHeaders;
    }())
  }]);
}();

var NintendoParentalAPI = /*#__PURE__*/function () {
  function NintendoParentalAPI(auth) {
    _classCallCheck(this, NintendoParentalAPI);
    this.auth = auth;
    this.baseURL = 'https://app.lp1.znma.srv.nintendo.net';
  }

  /**
   * Fetch all owned devices (Switch consoles)
   */
  return _createClass(NintendoParentalAPI, [{
    key: "getDevices",
    value: (function () {
      var _getDevices = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var headers, response;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              _context.n = 1;
              return this.auth.getHeaders();
            case 1:
              headers = _context.v;
              _context.n = 2;
              return axios.post("".concat(this.baseURL, "/v2/actions/user/fetchOwnedDevices"), {}, {
                headers: headers
              });
            case 2:
              response = _context.v;
              return _context.a(2, response.data.items || []);
          }
        }, _callee, this);
      }));
      function getDevices() {
        return _getDevices.apply(this, arguments);
      }
      return getDevices;
    }()
    /**
     * Get device details
     */
    )
  }, {
    key: "getDevice",
    value: (function () {
      var _getDevice = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(deviceId) {
        var headers, response;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              _context2.n = 1;
              return this.auth.getHeaders();
            case 1:
              headers = _context2.v;
              _context2.n = 2;
              return axios.post("".concat(this.baseURL, "/v2/actions/user/fetchOwnedDevice?deviceId=").concat(deviceId), {}, {
                headers: headers
              });
            case 2:
              response = _context2.v;
              return _context2.a(2, response.data);
          }
        }, _callee2, this);
      }));
      function getDevice(_x) {
        return _getDevice.apply(this, arguments);
      }
      return getDevice;
    }()
    /**
     * Get daily play summaries (includes child players)
     */
    )
  }, {
    key: "getDailySummaries",
    value: (function () {
      var _getDailySummaries = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(deviceId) {
        var headers, response;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              _context3.n = 1;
              return this.auth.getHeaders();
            case 1:
              headers = _context3.v;
              _context3.n = 2;
              return axios.post("".concat(this.baseURL, "/v2/actions/playSummary/fetchDailySummaries?deviceId=").concat(deviceId), {}, {
                headers: headers
              });
            case 2:
              response = _context3.v;
              return _context3.a(2, response.data.items || []);
          }
        }, _callee3, this);
      }));
      function getDailySummaries(_x2) {
        return _getDailySummaries.apply(this, arguments);
      }
      return getDailySummaries;
    }()
    /**
     * Get parental control settings
     */
    )
  }, {
    key: "getParentalControlSettings",
    value: (function () {
      var _getParentalControlSettings = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(deviceId) {
        var headers, response;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              _context4.n = 1;
              return this.auth.getHeaders();
            case 1:
              headers = _context4.v;
              _context4.n = 2;
              return axios.post("".concat(this.baseURL, "/v2/actions/parentalControlSetting/fetchParentalControlSetting?deviceId=").concat(deviceId), {}, {
                headers: headers
              });
            case 2:
              response = _context4.v;
              return _context4.a(2, response.data);
          }
        }, _callee4, this);
      }));
      function getParentalControlSettings(_x3) {
        return _getParentalControlSettings.apply(this, arguments);
      }
      return getParentalControlSettings;
    }()
    /**
     * ENFORCEMENT: Update play timer (set daily limits, bedtime, restrictions)
     */
    )
  }, {
    key: "updatePlayTimer",
    value: (function () {
      var _updatePlayTimer = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(deviceId, playTimerRegulations) {
        var headers, response;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              _context5.n = 1;
              return this.auth.getHeaders();
            case 1:
              headers = _context5.v;
              _context5.n = 2;
              return axios.post("".concat(this.baseURL, "/v3/actions/parentalControlSetting/updatePlayTimer"), {
                deviceId: deviceId,
                playTimerRegulations: playTimerRegulations
              }, {
                headers: headers
              });
            case 2:
              response = _context5.v;
              return _context5.a(2, response.data);
          }
        }, _callee5, this);
      }));
      function updatePlayTimer(_x4, _x5) {
        return _updatePlayTimer.apply(this, arguments);
      }
      return updatePlayTimer;
    }()
    /**
     * ENFORCEMENT: Add extra playing time
     */
    )
  }, {
    key: "updateExtraPlayingTime",
    value: (function () {
      var _updateExtraPlayingTime = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(deviceId, minutes) {
        var headers, response;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              _context6.n = 1;
              return this.auth.getHeaders();
            case 1:
              headers = _context6.v;
              _context6.n = 2;
              return axios.post("".concat(this.baseURL, "/v2/actions/device/updateExtraPlayingTime"), {
                deviceId: deviceId,
                additionalMinutes: minutes
              }, {
                headers: headers
              });
            case 2:
              response = _context6.v;
              return _context6.a(2, response.data);
          }
        }, _callee6, this);
      }));
      function updateExtraPlayingTime(_x6, _x7) {
        return _updateExtraPlayingTime.apply(this, arguments);
      }
      return updateExtraPlayingTime;
    }()
    /**
     * ENFORCEMENT: Update restriction level
     */
    )
  }, {
    key: "updateRestrictionLevel",
    value: (function () {
      var _updateRestrictionLevel = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(deviceId, functionalRestrictionLevel, whitelistedApps) {
        var headers, response;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              _context7.n = 1;
              return this.auth.getHeaders();
            case 1:
              headers = _context7.v;
              _context7.n = 2;
              return axios.post("".concat(this.baseURL, "/v2/actions/parentalControlSetting/updateRestrictionLevel"), {
                deviceId: deviceId,
                functionalRestrictionLevel: functionalRestrictionLevel,
                whitelistedApplicationList: whitelistedApps || []
              }, {
                headers: headers
              });
            case 2:
              response = _context7.v;
              return _context7.a(2, response.data);
          }
        }, _callee7, this);
      }));
      function updateRestrictionLevel(_x8, _x9, _x0) {
        return _updateRestrictionLevel.apply(this, arguments);
      }
      return updateRestrictionLevel;
    }())
  }]);
}();

var DeviceManager = /*#__PURE__*/function () {
  function DeviceManager(api) {
    _classCallCheck(this, DeviceManager);
    this.api = api;
    this.devices = new Map();
  }

  /**
   * Discover and cache all devices
   */
  return _createClass(DeviceManager, [{
    key: "discover",
    value: (function () {
      var _discover = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var _this = this;
        var devices;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              _context.n = 1;
              return this.api.getDevices();
            case 1:
              devices = _context.v;
              devices.forEach(function (device) {
                _this.devices.set(device.deviceId, device);
              });
              return _context.a(2, Array.from(this.devices.values()));
          }
        }, _callee, this);
      }));
      function discover() {
        return _discover.apply(this, arguments);
      }
      return discover;
    }()
    /**
     * Get child players from daily summaries
     */
    )
  }, {
    key: "getChildPlayers",
    value: (function () {
      var _getChildPlayers = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(deviceId) {
        var summaries, today;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              _context2.n = 1;
              return this.api.getDailySummaries(deviceId);
            case 1:
              summaries = _context2.v;
              today = summaries[0]; // Most recent day
              if (!(!today || !today.players)) {
                _context2.n = 2;
                break;
              }
              return _context2.a(2, []);
            case 2:
              return _context2.a(2, today.players.map(function (player) {
                return {
                  playerId: player.playerId,
                  nickname: player.nickname || 'Unknown',
                  imageUri: player.imageUri,
                  playingTime: player.playingTime || 0,
                  // Minutes today
                  isPlaying: player.isPlaying || false,
                  deviceId: deviceId
                };
              }));
          }
        }, _callee2, this);
      }));
      function getChildPlayers(_x) {
        return _getChildPlayers.apply(this, arguments);
      }
      return getChildPlayers;
    }()
    /**
     * ENFORCEMENT: Set daily play time limit for device
     * @param minutes -1 for unlimited, 0-360 for limit
     */
    )
  }, {
    key: "setDailyLimit",
    value: (function () {
      var _setDailyLimit = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(deviceId, minutes) {
        var settings, regulations;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              if (!(minutes < -1 || minutes > 360)) {
                _context3.n = 1;
                break;
              }
              throw new Error('Daily limit must be between -1 (unlimited) and 360 minutes');
            case 1:
              _context3.n = 2;
              return this.api.getParentalControlSettings(deviceId);
            case 2:
              settings = _context3.v;
              regulations = settings.playTimerRegulations || {};
              regulations.timerMode = 'DAILY'; // or 'PER_DAY_OF_WEEK'
              regulations.limitTime = minutes;
              regulations.limitTimeEnabled = minutes >= 0;
              _context3.n = 3;
              return this.api.updatePlayTimer(deviceId, regulations);
            case 3:
              return _context3.a(2, _context3.v);
          }
        }, _callee3, this);
      }));
      function setDailyLimit(_x2, _x3) {
        return _setDailyLimit.apply(this, arguments);
      }
      return setDailyLimit;
    }()
    /**
     * ENFORCEMENT: Disable gaming immediately (set limit to 0)
     */
    )
  }, {
    key: "disableGaming",
    value: (function () {
      var _disableGaming = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(deviceId) {
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              _context4.n = 1;
              return this.setDailyLimit(deviceId, 0);
            case 1:
              return _context4.a(2, _context4.v);
          }
        }, _callee4, this);
      }));
      function disableGaming(_x4) {
        return _disableGaming.apply(this, arguments);
      }
      return disableGaming;
    }()
    /**
     * ENFORCEMENT: Enable gaming (set to unlimited or specific limit)
     */
    )
  }, {
    key: "enableGaming",
    value: (function () {
      var _enableGaming = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(deviceId) {
        var minutes,
          _args5 = arguments;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              minutes = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : -1;
              _context5.n = 1;
              return this.setDailyLimit(deviceId, minutes);
            case 1:
              return _context5.a(2, _context5.v);
          }
        }, _callee5, this);
      }));
      function enableGaming(_x5) {
        return _enableGaming.apply(this, arguments);
      }
      return enableGaming;
    }()
    /**
     * ENFORCEMENT: Add extra time (bonus minutes)
     */
    )
  }, {
    key: "addExtraTime",
    value: (function () {
      var _addExtraTime = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(deviceId, minutes) {
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              _context6.n = 1;
              return this.api.updateExtraPlayingTime(deviceId, minutes);
            case 1:
              return _context6.a(2, _context6.v);
          }
        }, _callee6, this);
      }));
      function addExtraTime(_x6, _x7) {
        return _addExtraTime.apply(this, arguments);
      }
      return addExtraTime;
    }()
    /**
     * ENFORCEMENT: Set bedtime restrictions
     */
    )
  }, {
    key: "setBedtime",
    value: (function () {
      var _setBedtime = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(deviceId, startTime, endTime) {
        var enabled,
          settings,
          regulations,
          _args7 = arguments;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              enabled = _args7.length > 3 && _args7[3] !== undefined ? _args7[3] : true;
              _context7.n = 1;
              return this.api.getParentalControlSettings(deviceId);
            case 1:
              settings = _context7.v;
              regulations = settings.playTimerRegulations || {};
              regulations.bedtimeAlarm = {
                enabled: enabled,
                startTime: startTime,
                // e.g., "21:00"
                endTime: endTime // e.g., "07:00"
              };
              _context7.n = 2;
              return this.api.updatePlayTimer(deviceId, regulations);
            case 2:
              return _context7.a(2, _context7.v);
          }
        }, _callee7, this);
      }));
      function setBedtime(_x8, _x9, _x0) {
        return _setBedtime.apply(this, arguments);
      }
      return setBedtime;
    }())
  }]);
}();

var PlayTimeMonitor = /*#__PURE__*/function (_EventEmitter) {
  function PlayTimeMonitor(api) {
    var _this;
    _classCallCheck(this, PlayTimeMonitor);
    _this = _callSuper(this, PlayTimeMonitor);
    _this.api = api;
    _this.monitors = new Map(); // deviceId → interval
    _this.lastPlayTimes = new Map(); // playerId → minutes
    return _this;
  }

  /**
   * Start monitoring a device
   */
  _inherits(PlayTimeMonitor, _EventEmitter);
  return _createClass(PlayTimeMonitor, [{
    key: "startMonitoring",
    value: function startMonitoring(deviceId) {
      var _this2 = this;
      var intervalMs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300000;
      // 5 minutes
      if (this.monitors.has(deviceId)) {
        this.stopMonitoring(deviceId);
      }
      var interval = setInterval(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              _context.n = 1;
              return _this2.poll(deviceId);
            case 1:
              return _context.a(2);
          }
        }, _callee);
      })), intervalMs);
      this.monitors.set(deviceId, interval);

      // Immediate poll
      this.poll(deviceId);
    }

    /**
     * Stop monitoring a device
     */
  }, {
    key: "stopMonitoring",
    value: function stopMonitoring(deviceId) {
      var interval = this.monitors.get(deviceId);
      if (interval) {
        clearInterval(interval);
        this.monitors["delete"](deviceId);
      }
    }

    /**
     * Poll device for current play state
     */
  }, {
    key: "poll",
    value: (function () {
      var _poll = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(deviceId) {
        var _this3 = this;
        var summaries, today, _t;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              _context2.p = 0;
              _context2.n = 1;
              return this.api.getDailySummaries(deviceId);
            case 1:
              summaries = _context2.v;
              today = summaries[0];
              if (!(!today || !today.players)) {
                _context2.n = 2;
                break;
              }
              return _context2.a(2);
            case 2:
              today.players.forEach(function (player) {
                var lastTime = _this3.lastPlayTimes.get(player.playerId) || 0;
                var currentTime = player.playingTime || 0;
                var delta = currentTime - lastTime;
                if (delta > 0) {
                  // Gaming time increased
                  _this3.emit('playTimeIncreased', {
                    deviceId: deviceId,
                    playerId: player.playerId,
                    nickname: player.nickname,
                    delta: delta,
                    totalToday: currentTime
                  });
                }
                if (player.isPlaying) {
                  _this3.emit('gamingActive', {
                    deviceId: deviceId,
                    playerId: player.playerId,
                    nickname: player.nickname
                  });
                }
                _this3.lastPlayTimes.set(player.playerId, currentTime);
              });
              _context2.n = 4;
              break;
            case 3:
              _context2.p = 3;
              _t = _context2.v;
              this.emit('error', {
                deviceId: deviceId,
                error: _t
              });
            case 4:
              return _context2.a(2);
          }
        }, _callee2, this, [[0, 3]]);
      }));
      function poll(_x) {
        return _poll.apply(this, arguments);
      }
      return poll;
    }()
    /**
     * Cleanup all monitors
     */
    )
  }, {
    key: "cleanup",
    value: function cleanup() {
      var _this4 = this;
      this.monitors.forEach(function (_, deviceId) {
        return _this4.stopMonitoring(deviceId);
      });
      this.lastPlayTimes.clear();
    }
  }]);
}(EventEmitter);

var RestrictionMode = {
  NONE: 'NONE',
  FORCED_TERMINATION: 'FORCED_TERMINATION'
};
var TimerMode = {
  DAILY: 'DAILY',
  PER_DAY_OF_WEEK: 'PER_DAY_OF_WEEK'
};
var FunctionalRestrictionLevel = {
  NONE: 'NONE',
  TEEN: 'TEEN',
  CHILD: 'CHILD',
  YOUNG_CHILD: 'YOUNG_CHILD'
};

export { DeviceManager, FunctionalRestrictionLevel, NintendoAuth, NintendoParentalAPI, PlayTimeMonitor, RestrictionMode, TimerMode };
