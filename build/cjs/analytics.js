"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var bridge_1 = require("./bridge");
var configuration_1 = require("./configuration");
var middleware_1 = require("./middleware");
var wrapper_1 = require("./wrapper");
// prettier-ignore
var Analytics;
(function (Analytics) {
    var Client = /** @class */ (function () {
        function Client() {
            var _this = this;
            /**
             * Whether the client is ready to send events to Segment.
             *
             * This becomes `true` when `.setup()` succeeds.
             * All calls will be queued until it becomes `true`.
             */
            this.ready = false;
            this.wrapper = new wrapper_1.NativeWrapper(this, function (err) {
                return _this.handleError(err);
            });
            this.handlers = [];
            this.middlewares = new middleware_1.MiddlewareChain(this.wrapper);
        }
        /**
         * Catch React-Native bridge errors
         *
         * These errors are emitted when calling the native counterpart.
         * This only applies to methods with no return value (`Promise<void>`),
         * methods like `getAnonymousId` do reject promises.
         */
        Client.prototype.catch = function (handler) {
            this.handlers.push(handler);
            return this;
        };
        /**
         * Append a new middleware to the middleware chain.
         *
         * Middlewares are a powerful mechanism that can augment the events collected by the SDK.
         * A middleware is a simple function that is invoked by the Segment SDK and can be used to monitor,
         * modify or reject events.
         *
         * Middlewares are invoked for all events, including automatically tracked events,
         * and external event sources like Adjust and Optimizely.
         * This offers you the ability the customize those messages to fit your use case even
         * if the event was sent outside your source code.
         *
         * The key thing to observe here is that the output produced by the first middleware feeds into the second.
         * This allows you to chain and compose independent middlewares!
         *
         * For example, you might want to record the device year class with your events.
         * Previously, you would have to do this everywhere you trigger an event with the Segment SDK.
         * With middlewares, you can do this in a single place :
         *
         * ```js
         * import DeviceYearClass from 'react-native-device-year-class'
         *
         * analytics.middleware(async ({next, context}) =>
         *   next({
         *     ...context,
         *     device_year_class: await DeviceYearClass()
         *   })
         * )
         * ```
         *
         * @param middleware
         */
        Client.prototype.middleware = function (middleware) {
            this.middlewares.add(middleware);
            return this;
        };
        /**
         * Use the native configuration.
         *
         * You'll need to call this method when you configure Analytics's singleton
         * using the native API.
         */
        Client.prototype.useNativeConfiguration = function () {
            if (this.ready) {
                throw new Error('Analytics has already been configured');
            }
            this.wrapper.ready();
            return this;
        };
        /**
         * Setup the Analytics module. All calls made before are queued
         * and only executed if the configuration was successful.
         *
         * ```js
         * await analytics.setup('YOUR_WRITE_KEY', {
         *   using: [Mixpanel, GoogleAnalytics],
         *   trackAppLifecycleEvents: true,
         *   ios: {
         *     trackDeepLinks: true
         *   }
         * })
         * ```
         *
         * @param writeKey Your Segment.io write key
         * @param configuration An optional {@link Configuration} object.
         */
        Client.prototype.setup = function (writeKey, configuration) {
            if (configuration === void 0) { configuration = {}; }
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _b = (_a = bridge_1.default).setup;
                            return [4 /*yield*/, configuration_1.configure(writeKey, configuration)];
                        case 1: return [4 /*yield*/, _b.apply(_a, [_c.sent()])];
                        case 2:
                            _c.sent();
                            this.wrapper.ready();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Record the actions your users perform.
         *
         * When a user performs an action in your app, you'll want to track that action for later analysis.
         * Use the event name to say what the user did, and properties to specify any interesting details of the action.
         *
         * @param event The name of the event you're tracking.
         * We recommend using human-readable names like `Played a Song` or `Updated Status`.
         * @param properties A dictionary of properties for the event.
         * If the event was 'Added to Shopping Cart', it might have properties like price, productType, etc.
         * @param options A dictionary of options, e.g. integrations (thigh analytics integration to forward the event to)
         */
        Client.prototype.track = function (event, properties, options) {
            if (properties === void 0) { properties = {}; }
            if (options === void 0) { options = {}; }
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.middlewares.run('track', { event: event, properties: properties, integrations: options.integrations || {} })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Record the screens or views your users see.
         *
         * When a user views a screen in your app, you'll want to record that here.
         * For some tools like Google Analytics and Flurry, screen views are treated specially, and are different
         * from "events" kind of like "page views" on the web. For services that don't treat "screen views" specially,
         * we map "screen" straight to "track" with the same parameters. For example, Mixpanel doesn't treat "screen views" any differently.
         * So a call to "screen" will be tracked as a normal event in Mixpanel, but get sent to Google Analytics and Flurry as a "screen".
         *
         * @param name The title of the screen being viewed.
         * We recommend using human-readable names like 'Photo Feed' or 'Completed Purchase Screen'.
         * @param properties A dictionary of properties for the screen view event.
         * If the event was 'Added to Shopping Cart', it might have properties like price, productType, etc.
         */
        Client.prototype.screen = function (name, properties, options) {
            if (properties === void 0) { properties = {}; }
            if (options === void 0) { options = {}; }
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.middlewares.run('screen', { name: name, properties: properties, integrations: options.integrations || {} })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Associate a user with their unique ID and record traits about them.
         *
         * When you learn more about who your user is, you can record that information with identify.
         *
         * @param user database ID (or email address) for this user.
         * If you don't have a userId but want to record traits, you should pass nil.
         * For more information on how we generate the UUID and Apple's policies on IDs, see https://segment.io/libraries/ios#ids
         * @param traits A dictionary of traits you know about the user. Things like: email, name, plan, etc.
         * @param options A dictionary of options, e.g. integrations (thigh analytics integration to forward the event to)
         */
        Client.prototype.identify = function (user, traits, options) {
            if (traits === void 0) { traits = {}; }
            if (options === void 0) { options = {}; }
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.middlewares.run('identify', { user: user, traits: traits, integrations: options.integrations || {} })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Associate a user with a group, organization, company, project, or w/e *you* call them.
         *
         * When you learn more about who the group is, you can record that information with group.
         *
         * @param groupId A database ID for this group.
         * @param traits A dictionary of traits you know about the group. Things like: name, employees, etc.
         * @param options A dictionary of options, e.g. integrations (thigh analytics integration to forward the event to)
         */
        Client.prototype.group = function (groupId, traits, options) {
            if (traits === void 0) { traits = {}; }
            if (options === void 0) { options = {}; }
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.middlewares.run('group', { groupId: groupId, traits: traits, integrations: options.integrations || {} })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Merge two user identities, effectively connecting two sets of user data as one.
         * This may not be supported by all integrations.
         *
         * When you learn more about who the group is, you can record that information with group.
         *
         * @param newId The new ID you want to alias the existing ID to.
         * The existing ID will be either the previousId if you have called identify, or the anonymous ID.
         */
        Client.prototype.alias = function (newId, options) {
            if (options === void 0) { options = {}; }
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.middlewares.run('alias', { newId: newId, integrations: options.integrations || {} })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Reset any user state that is cached on the device.
         *
         * This is useful when a user logs out and you want to clear the identity.
         * It will clear any traits or userId's cached on the device.
         */
        Client.prototype.reset = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.wrapper.run('reset', function (reset) { return reset(); })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Trigger an upload of all queued events.
         *
         * This is useful when you want to force all messages queued on the device to be uploaded.
         * Please note that not all integrations respond to this method.
         */
        Client.prototype.flush = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.wrapper.run('flush', function (flush) { return flush(); })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Enable the sending of analytics data. Enabled by default.
         *
         * Occasionally used in conjunction with disable user opt-out handling.
         */
        Client.prototype.enable = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.wrapper.run('enable', function (enable) { return enable(); })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Completely disable the sending of any analytics data.
         *
         * If you have a way for users to actively or passively (sometimes based on location) opt-out of
         * analytics data collection, you can use this method to turn off all data collection.
         */
        Client.prototype.disable = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.wrapper.run('disable', function (disable) { return disable(); })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /** Retrieve the anonymousId. */
        Client.prototype.getAnonymousId = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.wrapper.wait()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, bridge_1.default.getAnonymousId()];
                    }
                });
            });
        };
        Client.prototype.handleError = function (error) {
            var handlers = this.handlers;
            if (!handlers.length) {
                console.error('Uncaught Analytics error', error);
                throw error;
            }
            else {
                handlers.forEach(function (handler) { return handler(error); });
            }
        };
        return Client;
    }());
    Analytics.Client = Client;
})(Analytics = exports.Analytics || (exports.Analytics = {}));
//# sourceMappingURL=analytics.js.map