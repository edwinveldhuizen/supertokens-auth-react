import { __extends, __assign } from "../../../../../_virtual/_tslib.js";
import { isTest } from "../../../utils.js";
import { oktaLogo } from "../constants.js";
import Provider from "./index.js";

/*
 * Class.
 */
var Okta = /** @class */ (function (_super) {
    __extends(Okta, _super);
    /*
     * Constructor.
     */
    function Okta(config) {
        var _this = _super.call(this, __assign({ id: "okta", name: "Okta" }, config)) || this;
        _this.getLogo = function () {
            return oktaLogo;
        };
        return _this;
    }
    /*
     * Static Methods
     */
    Okta.init = function (config) {
        if (Okta.instance !== undefined) {
            console.warn("Okta Provider was already initialized");
            return Okta.instance;
        }
        Okta.instance = new Okta(config);
        return Okta.instance;
    };
    /*
     * Tests methods.
     */
    Okta.reset = function () {
        if (!isTest()) {
            return;
        }
        Okta.instance = undefined;
        return;
    };
    return Okta;
})(Provider);

export { Okta as default };
