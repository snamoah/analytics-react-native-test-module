"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var bridge = react_native_1.NativeModules.RNAnalytics;
if (!bridge) {
    throw new Error('Failed to load Analytics native module.');
}
exports.default = bridge;
//# sourceMappingURL=bridge.js.map