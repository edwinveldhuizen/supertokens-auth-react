import { __extends } from '../../../../../_virtual/_tslib.js';
import Provider from './index.js';

/*
 * Class.
 */
var Custom = /** @class */ (function (_super) {
    __extends(Custom, _super);
    /*
     * Constructor.
     */
    function Custom(config) {
        var _this = _super.call(this, config) || this;
        _this.getLogo = function () {
            return _this.logo;
        };
        _this.logo = config.logo;
        return _this;
    }
    /*
     * Static Methods
     */
    Custom.init = function (config) {
        if (config === undefined || config.id === undefined) {
            throw new Error("Custom provider config should contain an id attribute");
        }
        return new Custom(config);
    };
    return Custom;
}(Provider));

export { Custom as default };
