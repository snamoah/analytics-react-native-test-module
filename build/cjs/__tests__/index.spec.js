"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
var analytics_1 = require("../analytics");
jest.mock('../bridge');
it('exports an instance of Analytics.Client', function () {
    return expect(__1.default).toBeInstanceOf(analytics_1.Analytics.Client);
});
//# sourceMappingURL=index.spec.js.map