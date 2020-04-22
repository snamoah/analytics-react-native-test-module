import { NativeModules } from 'react-native';
var bridge = NativeModules.RNAnalytics;
if (!bridge) {
    throw new Error('Failed to load Analytics native module.');
}
export default bridge;
//# sourceMappingURL=bridge.js.map