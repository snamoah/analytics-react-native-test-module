import analytics from '..';
import { Analytics } from '../analytics';
jest.mock('../bridge');
it('exports an instance of Analytics.Client', function () {
    return expect(analytics).toBeInstanceOf(Analytics.Client);
});
//# sourceMappingURL=index.spec.js.map