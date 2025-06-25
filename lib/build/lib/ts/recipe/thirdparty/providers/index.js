import { jsx } from 'react/jsx-runtime';
import NormalisedURLPath from 'supertokens-web-js/utils/normalisedURLPath';
import SuperTokens from '../../../superTokens.js';
import ProviderButton from '../components/library/providerButton.js';

var Provider = /** @class */ (function () {
    function Provider(config) {
        var _this = this;
        this.config = config;
        this.getButton = function (name) {
            if (_this.config.buttonComponent !== undefined) {
                if (typeof _this.config.buttonComponent === "function") {
                    return jsx(_this.config.buttonComponent, { name: name !== null && name !== void 0 ? name : _this.name });
                }
                return _this.config.buttonComponent;
            }
            var providerName = name !== undefined ? name : _this.name;
            return jsx(ProviderButton, { logo: _this.getLogo(), providerName: providerName, displayName: providerName });
        };
    }
    Object.defineProperty(Provider.prototype, "id", {
        get: function () {
            return this.config.id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Provider.prototype, "name", {
        get: function () {
            if (this.config.name === undefined) {
                throw new Error("Name not defined for provider ".concat(this.config.id));
            }
            return this.config.name;
        },
        enumerable: false,
        configurable: true
    });
    Provider.prototype.getRedirectURL = function () {
        if (this.config.getRedirectURL) {
            return this.config.getRedirectURL(this.config.id);
        }
        var domain = SuperTokens.getInstanceOrThrow().appInfo.websiteDomain.getAsStringDangerous();
        var callbackPath = new NormalisedURLPath("/callback/".concat(this.config.id));
        var path = SuperTokens.getInstanceOrThrow()
            .appInfo.websiteBasePath.appendPath(callbackPath)
            .getAsStringDangerous();
        return "".concat(domain).concat(path);
    };
    Provider.prototype.getRedirectURIOnProviderDashboard = function () {
        return undefined;
    };
    return Provider;
}());

export { Provider as default };
