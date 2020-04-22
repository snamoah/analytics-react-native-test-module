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
var jest_mock_console_1 = require("jest-mock-console");
var analytics_1 = require("../analytics");
var bridge_1 = require("../bridge");
jest.mock('../bridge');
var nextTick = function () { return new Promise(function (resolve) { return setImmediate(resolve); }); };
var getBridgeStub = function (name) { return bridge_1.default[name]; };
var analytics = null;
var restoreConsole = null;
var ctx = {
    library: {
        name: 'analytics-react-native',
        version: require('../../package.json').version
    }
};
beforeEach(function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                restoreConsole = jest_mock_console_1.default();
                analytics = new analytics_1.Analytics.Client();
                Object.keys(bridge_1.default).forEach(function (key) { return getBridgeStub(key).mockClear(); });
                return [4 /*yield*/, analytics.setup('write key')];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
afterEach(function () {
    restoreConsole();
});
it('is ready', function () { return expect(analytics.ready).toBe(true); });
it('catches bridge errors', function () { return __awaiter(_this, void 0, void 0, function () {
    var error, onError;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                error = new Error('test-error');
                onError = jest.fn();
                getBridgeStub('track').mockImplementationOnce(function () { return Promise.reject(error); });
                analytics.catch(onError);
                analytics.track('test');
                expect(onError).not.toHaveBeenCalled();
                return [4 /*yield*/, new Promise(function (resolve) { return setImmediate(resolve); })];
            case 1:
                _a.sent();
                expect(onError).toHaveBeenCalledWith(error);
                return [2 /*return*/];
        }
    });
}); });
it('waits for .setup()', function () { return __awaiter(_this, void 0, void 0, function () {
    var client;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                client = new analytics_1.Analytics.Client();
                client.track('test 1');
                client.track('test 2');
                expect(bridge_1.default.track).not.toHaveBeenCalled();
                return [4 /*yield*/, client.setup('key')];
            case 1:
                _a.sent();
                expect(bridge_1.default.track).toHaveBeenNthCalledWith(1, 'test 1', {}, {}, ctx);
                expect(bridge_1.default.track).toHaveBeenNthCalledWith(2, 'test 2', {}, {}, ctx);
                return [2 /*return*/];
        }
    });
}); });
it('does .track()', function () {
    return testCall('track')('Added to cart', { productId: 'azertyuiop' }, {}, ctx);
});
it('does .screen()', function () {
    return testCall('screen')('Shopping cart', { from: 'Product page' }, {}, ctx);
});
it('does .identify()', function () {
    return testCall('identify')('sloth', { eats: 'leaves' }, {}, ctx);
});
it('does .group()', function () { return testCall('group')('bots', { humans: false }, {}, ctx); });
it('does .alias()', function () { return testCall('alias')('new alias', {}, ctx); });
it('does .reset()', testCall('reset'));
it('does .flush()', testCall('flush'));
it('does .enable()', testCall('enable'));
it('does .disable()', testCall('disable'));
it('does .getAnonymousId()', testCall('getAnonymousId'));
it('logs uncaught bridge errors', function () { return __awaiter(_this, void 0, void 0, function () {
    var error;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                error = {
                    message: 'test-error'
                };
                getBridgeStub('track').mockImplementationOnce(function () { return Promise.reject(error); });
                expect(analytics.track('test')).rejects.toBe(error);
                expect(console.error).not.toHaveBeenCalled();
                return [4 /*yield*/, nextTick()];
            case 1:
                _a.sent();
                expect(console.error).toHaveBeenCalledWith('Uncaught Analytics error', error);
                return [2 /*return*/];
        }
    });
}); });
function testCall(name) {
    var _this = this;
    return (function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __awaiter(_this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        (_a = analytics.constructor.prototype[name]).call.apply(_a, [analytics].concat(args));
                        return [4 /*yield*/, nextTick()];
                    case 1:
                        _c.sent();
                        (_b = expect(bridge_1.default[name])).toHaveBeenNthCalledWith.apply(_b, [1].concat(args));
                        return [2 /*return*/];
                }
            });
        });
    });
}
it('enables setting integrations from the middleware', function () { return __awaiter(_this, void 0, void 0, function () {
    var integrations, trackSpy;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                integrations = {
                    'Google Analytics': false,
                    Mixpanel: { foo: 'bar' }
                };
                analytics.middleware(function (_a) {
                    var next = _a.next, context = _a.context, data = _a.data;
                    return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_b) {
                        // @ts-ignore ts is expecting newId for some reasons
                        return [2 /*return*/, next(context, __assign({}, data, { integrations: integrations }))];
                    }); });
                });
                trackSpy = jest.fn();
                getBridgeStub('track').mockImplementationOnce(trackSpy);
                analytics.track('test');
                return [4 /*yield*/, nextTick()];
            case 1:
                _a.sent();
                expect(trackSpy).toBeCalledWith('test', {}, integrations, {
                    library: ctx.library
                });
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=analytics.spec.js.map