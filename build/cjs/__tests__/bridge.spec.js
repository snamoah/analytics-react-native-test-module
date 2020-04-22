"use strict";
var forceRequire = function () {
    jest.resetModules();
    return require.requireActual('../bridge');
};
it('should throw an error if the core native module is not linked', function () {
    jest.setMock('react-native', {
        NativeModules: {}
    });
    expect(forceRequire).toThrow(/Failed to load Analytics native module./);
});
it('should export the core native module', function () {
    var RNAnalytics = {};
    jest.setMock('react-native', {
        NativeModules: { RNAnalytics: RNAnalytics }
    });
    expect(forceRequire().default).toBe(RNAnalytics);
});
//# sourceMappingURL=bridge.spec.js.map