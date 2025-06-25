import { __extends, __assign } from "../../../../../_virtual/_tslib.js";
import { isTest } from "../../../utils.js";
import { googleLogo } from "../constants.js";
import Provider from "./index.js";

/*
 * Class.
 */
var Google = /** @class */ (function (_super) {
    __extends(Google, _super);
    /*
     * Constructor.
     */
    function Google(config) {
        var _this = _super.call(this, __assign({ id: "google", name: "Google" }, config)) || this;
        _this.getLogo = function () {
            return googleLogo;
        };
        return _this;
    }
    /*
     * Static Methods
     */
    Google.init = function (config) {
        if (Google.instance !== undefined) {
            console.warn("Google Provider was already initialized");
            return Google.instance;
        }
        Google.instance = new Google(config);
        return Google.instance;
    };
    /*
     * Tests methods.
     */
    Google.reset = function () {
        if (!isTest()) {
            return;
        }
        Google.instance = undefined;
        return;
    };
    return Google;
})(Provider);

export { Google as default };
