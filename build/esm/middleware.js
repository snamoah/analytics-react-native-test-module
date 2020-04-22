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
import { assertNever } from './utils';
var MiddlewareChain = /** @class */ (function () {
    function MiddlewareChain(wrapper) {
        this.wrapper = wrapper;
        this.middlewares = [];
    }
    MiddlewareChain.prototype.add = function (middleware) {
        this.middlewares.push(middleware);
    };
    MiddlewareChain.prototype.run = function (type, data) {
        return __awaiter(this, void 0, void 0, function () {
            var ctx, payload, opts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ctx = {
                            library: {
                                name: 'analytics-react-native',
                                version: require('../package.json').version
                            }
                        };
                        return [4 /*yield*/, this.exec(type, ctx, data)];
                    case 1:
                        payload = _a.sent();
                        opts = {
                            context: payload.context,
                            integrations: payload.data.integrations
                        };
                        switch (payload.type) {
                            case 'alias':
                                return [2 /*return*/, this.wrapper.run('alias', function (alias) {
                                        return alias(payload.data.newId, payload.data.integrations, payload.context);
                                    })];
                            case 'group':
                                return [2 /*return*/, this.wrapper.run('group', function (group) {
                                        return group(payload.data.groupId, payload.data.traits, payload.data.integrations, payload.context);
                                    })];
                            case 'identify':
                                return [2 /*return*/, this.wrapper.run('identify', function (identify) {
                                        return identify(payload.data.user, payload.data.traits, payload.data.integrations, payload.context);
                                    })];
                            case 'screen':
                                return [2 /*return*/, this.wrapper.run('screen', function (screen) {
                                        return screen(payload.data.name, payload.data.properties, payload.data.integrations, payload.context);
                                    })];
                            case 'track':
                                return [2 /*return*/, this.wrapper.run('track', function (track) {
                                        return track(payload.data.event, payload.data.properties, payload.data.integrations, payload.context);
                                    })];
                            default:
                                return [2 /*return*/, assertNever(payload)];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    MiddlewareChain.prototype.exec = function (type, ctx, data, index) {
        if (index === void 0) { index = 0; }
        return __awaiter(this, void 0, void 0, function () {
            var middlewares, middleware, called;
            var _this = this;
            return __generator(this, function (_a) {
                middlewares = this.middlewares;
                middleware = middlewares[index];
                if (index >= middlewares.length || !middleware) {
                    return [2 /*return*/, makePayload(type, ctx, data)];
                }
                called = false;
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        return Promise.resolve(middleware.call(middleware, makePayload(type, ctx, data, function (nextCtx, nextProps) {
                            if (nextCtx === void 0) { nextCtx = ctx; }
                            if (nextProps === void 0) { nextProps = data; }
                            if (called) {
                                throw new Error('middleware.payload.next() can only be called one time');
                            }
                            var finalCtx = __assign({}, ctx, nextCtx);
                            called = true;
                            _this.exec(type, finalCtx, nextProps, index + 1)
                                .then(resolve)
                                .catch(reject);
                        }))).catch(reject);
                    })];
            });
        });
    };
    return MiddlewareChain;
}());
export { MiddlewareChain };
var notImplemented = function (name) { return function () {
    throw new Error("." + name + "() not implemented");
}; };
var makePayload = function (type, context, data, next) {
    if (next === void 0) { next = notImplemented('next'); }
    return ({
        context: context,
        data: data,
        next: next,
        type: type
    });
};
//# sourceMappingURL=middleware.js.map