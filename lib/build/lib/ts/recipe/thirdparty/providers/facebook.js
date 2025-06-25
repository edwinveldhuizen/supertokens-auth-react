import { __extends, __assign } from "../../../../../_virtual/_tslib.js";
import { jsx } from "react/jsx-runtime";
import { isTest } from "../../../utils.js";
import Provider from "./index.js";

/*
 * Class.
 */
var Facebook = /** @class */ (function (_super) {
    __extends(Facebook, _super);
    /*
     * Constructor.
     */
    function Facebook(config) {
        var _this = _super.call(this, __assign({ id: "facebook", name: "Facebook" }, config)) || this;
        _this.getLogo = function () {
            return jsx(
                "svg",
                __assign(
                    {
                        fill: "#1777F2",
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 30 30",
                        width: "24px",
                        height: "24px",
                    },
                    {
                        children: jsx("path", {
                            d: "M15,3C8.373,3,3,8.373,3,15c0,6.016,4.432,10.984,10.206,11.852V18.18h-2.969v-3.154h2.969v-2.099c0-3.475,1.693-5,4.581-5 c1.383,0,2.115,0.103,2.461,0.149v2.753h-1.97c-1.226,0-1.654,1.163-1.654,2.473v1.724h3.593L19.73,18.18h-3.106v8.697 C22.481,26.083,27,21.075,27,15C27,8.373,21.627,3,15,3z",
                        }),
                    }
                )
            );
        };
        return _this;
    }
    /*
     * Static Methods
     */
    Facebook.init = function (config) {
        if (Facebook.instance !== undefined) {
            console.warn("Facebook Provider was already initialized");
            return Facebook.instance;
        }
        Facebook.instance = new Facebook(config);
        return Facebook.instance;
    };
    /*
     * Tests methods.
     */
    Facebook.reset = function () {
        if (!isTest()) {
            return;
        }
        Facebook.instance = undefined;
        return;
    };
    return Facebook;
})(Provider);

export { Facebook as default };
