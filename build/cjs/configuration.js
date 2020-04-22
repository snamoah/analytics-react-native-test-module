"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var defaults = {
    android: function (_a) {
        var _b = _a.collectDeviceId, collectDeviceId = _b === void 0 ? true : _b, flushInterval = _a.flushInterval;
        return ({
            collectDeviceId: collectDeviceId,
            flushInterval: flushInterval
        });
    },
    ios: function (_a) {
        var _b = _a.trackAdvertising, trackAdvertising = _b === void 0 ? true : _b, _c = _a.trackDeepLinks, trackDeepLinks = _c === void 0 ? false : _c;
        return ({
            trackAdvertising: trackAdvertising,
            trackDeepLinks: trackDeepLinks
        });
    }
};
exports.configure = function (writeKey, _a) {
    var _b = _a.flushAt, flushAt = _b === void 0 ? 20 : _b, _c = _a.debug, debug = _c === void 0 ? false : _c, _d = _a.recordScreenViews, recordScreenViews = _d === void 0 ? false : _d, _e = _a.trackAppLifecycleEvents, trackAppLifecycleEvents = _e === void 0 ? false : _e, _f = _a.trackAttributionData, trackAttributionData = _f === void 0 ? false : _f, _g = _a.using, using = _g === void 0 ? [] : _g, _h = _a.ios, ios = _h === void 0 ? {} : _h, _j = _a.android, android = _j === void 0 ? {} : _j;
    return __awaiter(_this, void 0, void 0, function () {
        var config, json;
        var _this = this;
        return __generator(this, function (_k) {
            switch (_k.label) {
                case 0: return [4 /*yield*/, Promise.all(using.map(function (integration) { return __awaiter(_this, void 0, void 0, function () { var _a; return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                if (!(typeof integration === 'function')) return [3 /*break*/, 2];
                                return [4 /*yield*/, integration()];
                            case 1:
                                _a = _b.sent();
                                return [3 /*break*/, 3];
                            case 2:
                                _a = null;
                                _b.label = 3;
                            case 3: return [2 /*return*/, _a];
                        }
                    }); }); }))];
                case 1:
                    _k.sent();
                    config = {
                        debug: debug,
                        flushAt: flushAt,
                        recordScreenViews: recordScreenViews,
                        trackAppLifecycleEvents: trackAppLifecycleEvents,
                        trackAttributionData: trackAttributionData,
                        writeKey: writeKey,
                        android: defaults.android(android),
                        ios: defaults.ios(ios)
                    };
                    json = JSON.stringify(config);
                    return [2 /*return*/, __assign({}, config, { json: json })];
            }
        });
    });
};
//# sourceMappingURL=configuration.js.map