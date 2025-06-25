import { __extends, __assign } from "../../../../../_virtual/_tslib.js";
import { isTest } from "../../../utils.js";
import {
    genericSAMLLogo,
    openIdLogo,
    ripplingLogo,
    jumpCloudLogo,
    pingOneLogo,
    oneLoginLogo,
    googleLogo,
    auth0Logo,
    oktaLogo,
    microsoftADFSLogo,
    microsoftEntraIdLogo,
} from "../constants.js";
import Provider from "./index.js";

/*
 * Class.
 */
var BoxySAML = /** @class */ (function (_super) {
    __extends(BoxySAML, _super);
    /*
     * Constructor.
     */
    function BoxySAML(config) {
        var _this = _super.call(this, __assign({ id: "boxy-saml", name: "BoxySAML" }, config)) || this;
        _this.getLogo = function () {
            switch (_this.name.toLowerCase()) {
                case "microsoft entra id": {
                    return microsoftEntraIdLogo;
                }
                case "microsoft ad fs": {
                    return microsoftADFSLogo;
                }
                case "okta": {
                    return oktaLogo;
                }
                case "auth0": {
                    return auth0Logo;
                }
                case "google": {
                    return googleLogo;
                }
                case "onelogin": {
                    return oneLoginLogo;
                }
                case "pingone": {
                    return pingOneLogo;
                }
                case "jumpcloud": {
                    return jumpCloudLogo;
                }
                case "rippling": {
                    return ripplingLogo;
                }
                case "openid": {
                    return openIdLogo;
                }
                default: {
                    return genericSAMLLogo;
                }
            }
        };
        return _this;
    }
    /*
     * Static Methods
     */
    BoxySAML.init = function (config) {
        if (BoxySAML.instance !== undefined) {
            console.warn("BoxySAML Provider was already initialized");
            return BoxySAML.instance;
        }
        BoxySAML.instance = new BoxySAML(config);
        return BoxySAML.instance;
    };
    /*
     * Tests methods.
     */
    BoxySAML.reset = function () {
        if (!isTest()) {
            return;
        }
        BoxySAML.instance = undefined;
        return;
    };
    return BoxySAML;
})(Provider);

export { BoxySAML as default };
