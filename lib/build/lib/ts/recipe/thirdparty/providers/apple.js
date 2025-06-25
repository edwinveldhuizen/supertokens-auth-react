import { __extends, __assign } from '../../../../../_virtual/_tslib.js';
import { jsx, jsxs } from 'react/jsx-runtime';
import NormalisedURLPath from 'supertokens-web-js/lib/build/normalisedURLPath';
import SuperTokens from '../../../superTokens.js';
import { isTest } from '../../../utils.js';
import Provider from './index.js';

/*
 * Class.
 */
var Apple = /** @class */ (function (_super) {
    __extends(Apple, _super);
    /*
     * Constructor.
     */
    function Apple(config) {
        var _this = _super.call(this, __assign({ id: "apple", name: "Apple" }, config)) || this;
        _this.getLogo = function () {
            return (jsx("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", width: "15.614", height: "18", viewBox: "0 0 15.614 18.737" }, { children: jsxs("g", __assign({ id: "iconfinder_logo_brand_brands_logos_apple_ios_2993701", transform: "translate(-2)" }, { children: [jsx("path", { id: "Path_91415", d: "M14.494 11.075a4.29 4.29 0 0 1 2.372-3.836A4.888 4.888 0 0 0 13.713 6a4.783 4.783 0 0 0-1.83.406 4.357 4.357 0 0 1-1.684.375 4.357 4.357 0 0 1-1.684-.375A4.783 4.783 0 0 0 6.685 6C6.206 6 2 6.153 2 11.465c0 4.344 2.964 8.587 4.685 8.587a5.18 5.18 0 0 0 2.194-.464 3.2 3.2 0 0 1 1.32-.316 3.2 3.2 0 0 1 1.32.317 5.187 5.187 0 0 0 2.194.463c1.206 0 2.922-2.085 3.9-4.826a4.209 4.209 0 0 1-3.119-4.151z", style: { fill: "#000" }, transform: "translate(0 -1.316)" }), jsx("path", { id: "XMLID_1339_", d: "M12 4.684A4.734 4.734 0 0 0 15.906 0 4.734 4.734 0 0 0 12 4.684z", style: { fill: "#000" }, transform: "translate(-2.193)" }), jsx("path", { id: "Path_91416", d: "M6.685 6.2a4.783 4.783 0 0 1 1.83.406 4.357 4.357 0 0 0 1.684.375 4.357 4.357 0 0 0 1.684-.381 4.783 4.783 0 0 1 1.83-.406 4.953 4.953 0 0 1 3.014 1.126c.047-.026.091-.058.14-.082A4.888 4.888 0 0 0 13.713 6a4.783 4.783 0 0 0-1.83.406 4.357 4.357 0 0 1-1.684.375 4.357 4.357 0 0 1-1.684-.375A4.783 4.783 0 0 0 6.685 6C6.206 6 2 6.153 2 11.465v.107C2.053 6.352 6.208 6.2 6.685 6.2z", style: { fill: "#000", opacity: 0.1 }, transform: "translate(0 -1.316)" }), jsx("path", { id: "Path_91417", d: "M13.713 21.368a5.187 5.187 0 0 1-2.194-.463 3.2 3.2 0 0 0-1.32-.317 3.2 3.2 0 0 0-1.32.316 5.18 5.18 0 0 1-2.194.464c-1.707 0-4.633-4.174-4.681-8.48v.088c0 4.344 2.964 8.587 4.685 8.587a5.18 5.18 0 0 0 2.19-.463 3.2 3.2 0 0 1 1.32-.316 3.2 3.2 0 0 1 1.32.317 5.187 5.187 0 0 0 2.194.463c1.206 0 2.922-2.085 3.9-4.826-.023-.006-.043-.017-.066-.023-.991 2.654-2.655 4.653-3.834 4.653z", style: { fill: "#000", opacity: 0.2 }, transform: "translate(0 -2.826)" }), jsx("path", { id: "Path_91418", d: "M15.888.4A4.621 4.621 0 0 1 12 4.544v.2A4.745 4.745 0 0 0 15.9.261c0 .039 0 .098-.012.139z", style: { fill: "#000", opacity: 0.2 }, transform: "translate(-2.193 -.057)" }), jsx("path", { id: "Path_91419", d: "M12.005 4.477c.009-.051.02-.192.032-.278q.012-.161.035-.317A4.491 4.491 0 0 1 15.9.2V0a4.738 4.738 0 0 0-3.895 4.477z", style: { fill: "#000", opacity: 0.1 }, transform: "translate(-2.194)" }), jsx("path", { id: "Path_91420", d: "M14.494 9.759a4.29 4.29 0 0 1 2.372-3.836 4.888 4.888 0 0 0-3.153-1.239 4.783 4.783 0 0 0-1.83.406 4.357 4.357 0 0 1-1.684.375 4.357 4.357 0 0 1-1.684-.375 4.783 4.783 0 0 0-1.83-.406C6.206 4.684 2 4.838 2 10.15c0 4.344 2.964 8.587 4.685 8.587a5.18 5.18 0 0 0 2.194-.464 3.2 3.2 0 0 1 1.32-.316 3.2 3.2 0 0 1 1.32.317 5.187 5.187 0 0 0 2.194.463c1.206 0 2.922-2.085 3.9-4.826a4.209 4.209 0 0 1-3.119-4.152zM13.713 0a4.734 4.734 0 0 0-3.9 4.684A4.734 4.734 0 0 0 13.713 0z", style: { fill: "#000" } })] })) })));
        };
        return _this;
    }
    Apple.prototype.getRedirectURIOnProviderDashboard = function () {
        var domain = SuperTokens.getInstanceOrThrow().appInfo.apiDomain.getAsStringDangerous();
        var callbackPath = new NormalisedURLPath("/callback/".concat(this.id));
        var path = SuperTokens.getInstanceOrThrow()
            .appInfo.apiBasePath.appendPath(callbackPath)
            .getAsStringDangerous();
        return "".concat(domain).concat(path);
    };
    /*
     * Static Methods
     */
    Apple.init = function (config) {
        if (Apple.instance !== undefined) {
            console.warn("Apple Provider was already initialized");
            return Apple.instance;
        }
        Apple.instance = new Apple(config);
        return Apple.instance;
    };
    /*
     * Tests methods.
     */
    Apple.reset = function () {
        if (!isTest()) {
            return;
        }
        Apple.instance = undefined;
        return;
    };
    return Apple;
}(Provider));

export { Apple as default };
