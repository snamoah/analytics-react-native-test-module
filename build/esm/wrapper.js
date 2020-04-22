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
import bridge from './bridge';
var NativeWrapper = /** @class */ (function () {
    function NativeWrapper(delegate, handler, queue) {
        if (queue === void 0) { queue = []; }
        this.delegate = delegate;
        this.handler = handler;
        this.queue = queue;
    }
    /**
     * Run a bridge method.
     * It first waits for `.setup()` or `.useNativeConfiguration()` to be
     * called and redirects exceptions to `handler`.
     * @param method Name of the method to call.
     * @param caller Function with the bridge function as first argument.
     */
    NativeWrapper.prototype.run = function (method, caller) {
        return __awaiter(this, void 0, void 0, function () {
            function run() {
                return __awaiter(this, void 0, void 0, function () {
                    var err_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, caller(bridge[method])];
                            case 1:
                                _a.sent();
                                return [3 /*break*/, 3];
                            case 2:
                                err_1 = _a.sent();
                                return [2 /*return*/, handler(err_1)];
                            case 3: return [2 /*return*/];
                        }
                    });
                });
            }
            var _a, delegate, handler, queue;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this, delegate = _a.delegate, handler = _a.handler, queue = _a.queue;
                        if (!delegate.ready) return [3 /*break*/, 2];
                        return [4 /*yield*/, run()];
                    case 1:
                        _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        queue.push(run);
                        _b.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /** Waits for `.setup()` or `.useNativeConfiguration()` to be called. */
    NativeWrapper.prototype.wait = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (this.delegate.ready) {
                    return [2 /*return*/];
                }
                return [2 /*return*/, new Promise(function (resolve) { return _this.queue.push(resolve); })];
            });
        });
    };
    NativeWrapper.prototype.ready = function () {
        var _a = this, delegate = _a.delegate, queue = _a.queue;
        delegate.ready = true;
        while (queue.length) {
            queue.shift()();
        }
    };
    return NativeWrapper;
}());
export { NativeWrapper };
//# sourceMappingURL=wrapper.js.map