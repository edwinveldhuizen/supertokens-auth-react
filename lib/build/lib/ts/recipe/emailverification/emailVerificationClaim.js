import { __extends, __assign } from "../../../../_virtual/_tslib.js";
import { EmailVerificationClaimClass as EmailVerificationClaimClass$1 } from "supertokens-web-js/recipe/emailverification";
import { getTenantIdFromQueryParams } from "../../utils.js";
import EmailVerification from "./recipe.js";

var EmailVerificationClaimClass = /** @class */ (function (_super) {
    __extends(EmailVerificationClaimClass, _super);
    function EmailVerificationClaimClass(getRecipeImpl, onFailureRedirection) {
        var _this = _super.call(this, getRecipeImpl) || this;
        var validatorsWithCallbacks = __assign({}, _this.validators);
        var _loop_1 = function (key) {
            var validator = validatorsWithCallbacks[key];
            validatorsWithCallbacks[key] = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return __assign(__assign({}, validator.apply(void 0, args)), {
                    onFailureRedirection: function (args) {
                        if (onFailureRedirection !== undefined) {
                            return onFailureRedirection(args);
                        }
                        var recipe = EmailVerification.getInstanceOrThrow();
                        if (recipe.config.mode === "REQUIRED") {
                            return recipe.getRedirectUrl(
                                { action: "VERIFY_EMAIL", tenantIdFromQueryParams: getTenantIdFromQueryParams() },
                                args.userContext
                            );
                        }
                        return undefined;
                    },
                    showAccessDeniedOnFailure: false,
                });
            };
        };
        for (var key in validatorsWithCallbacks) {
            _loop_1(key);
        }
        _this.validators = validatorsWithCallbacks;
        return _this;
    }
    return EmailVerificationClaimClass;
})(EmailVerificationClaimClass$1);

export { EmailVerificationClaimClass };
