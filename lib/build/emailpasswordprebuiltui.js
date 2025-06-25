import { __extends, __assign } from "./_virtual/_tslib.js";
import { jsx } from "react/jsx-runtime";
import NormalisedURLPath from "supertokens-web-js/utils/normalisedURLPath";
import UserContextWrapper from "./lib/ts/usercontext/userContextWrapper.js";
import { matchRecipeIdUsingQueryParams, isTest } from "./lib/ts/utils.js";
import "./multifactorauth.js";
import { RecipeRouter } from "./lib/ts/recipe/recipeRouter/index.js";
import { useRecipeComponentOverrideContext as useContext } from "./lib/ts/recipe/emailpassword/componentOverrideContext.js";
import ResetPasswordUsingToken$1 from "./lib/ts/recipe/emailpassword/components/features/resetPasswordUsingToken/index.js";
import { SignInFeature } from "./lib/ts/recipe/emailpassword/components/features/signin/index.js";
import { SignUpFeature } from "./lib/ts/recipe/emailpassword/components/features/signup/index.js";
import ResetPasswordUsingTokenThemeWrapper from "./lib/ts/recipe/emailpassword/components/themes/resetPasswordUsingToken/index.js";
import { defaultTranslationsEmailPassword } from "./lib/ts/recipe/emailpassword/components/themes/translations.js";
import { DEFAULT_RESET_PASSWORD_PATH } from "./lib/ts/recipe/emailpassword/constants.js";
import EmailPassword from "./lib/ts/recipe/emailpassword/recipe.js";
import { FactorIds } from "./lib/ts/recipe/multifactorauth/types.js";

var EmailPasswordPreBuiltUI = /** @class */ (function (_super) {
    __extends(EmailPasswordPreBuiltUI, _super);
    function EmailPasswordPreBuiltUI(recipeInstance) {
        var _this = _super.call(this) || this;
        _this.recipeInstance = recipeInstance;
        _this.languageTranslations = defaultTranslationsEmailPassword;
        // Instance methods
        _this.getFeatures = function (useComponentOverrides) {
            if (useComponentOverrides === void 0) {
                useComponentOverrides = useContext;
            }
            var features = {};
            if (_this.recipeInstance.config.resetPasswordUsingTokenFeature.disableDefaultUI !== true) {
                var normalisedFullPath = _this.recipeInstance.config.appInfo.websiteBasePath.appendPath(
                    new NormalisedURLPath(DEFAULT_RESET_PASSWORD_PATH)
                );
                features[normalisedFullPath.getAsStringDangerous()] = {
                    matches: matchRecipeIdUsingQueryParams(_this.recipeInstance.config.recipeId),
                    component: function (props) {
                        return _this.getFeatureComponent("resetpassword", props, useComponentOverrides);
                    },
                    recipeID: EmailPassword.RECIPE_ID,
                };
            }
            return features;
        };
        _this.getFeatureComponent = function (componentName, props, useComponentOverrides) {
            if (useComponentOverrides === void 0) {
                useComponentOverrides = useContext;
            }
            if (componentName === "resetpassword") {
                return jsx(
                    UserContextWrapper,
                    __assign(
                        { userContext: props.userContext },
                        {
                            children: jsx(
                                ResetPasswordUsingToken$1,
                                __assign({ recipe: _this.recipeInstance }, props, {
                                    useComponentOverrides: useComponentOverrides,
                                })
                            ),
                        }
                    )
                );
            } else {
                throw new Error("Should never come here.");
            }
        };
        _this.requiresSignUpPage = true;
        return _this;
    }
    // Static methods
    EmailPasswordPreBuiltUI.getInstanceOrInitAndGetInstance = function () {
        if (EmailPasswordPreBuiltUI.instance === undefined) {
            var recipeInstance = EmailPassword.getInstanceOrThrow();
            EmailPasswordPreBuiltUI.instance = new EmailPasswordPreBuiltUI(recipeInstance);
        }
        return EmailPasswordPreBuiltUI.instance;
    };
    EmailPasswordPreBuiltUI.getFeatures = function (useComponentOverrides) {
        if (useComponentOverrides === void 0) {
            useComponentOverrides = useContext;
        }
        return EmailPasswordPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatures(useComponentOverrides);
    };
    EmailPasswordPreBuiltUI.getFeatureComponent = function (componentName, props, useComponentOverrides) {
        if (useComponentOverrides === void 0) {
            useComponentOverrides = useContext;
        }
        return EmailPasswordPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatureComponent(
            componentName,
            props,
            useComponentOverrides
        );
    };
    EmailPasswordPreBuiltUI.prototype.getAuthComponents = function () {
        var _this = this;
        return [
            {
                factorIds: [FactorIds.EMAILPASSWORD],
                displayOrder: 2,
                type: "SIGN_UP",
                component: function (props) {
                    return jsx(
                        SignUpFeature,
                        __assign({ recipe: _this.recipeInstance, useComponentOverrides: useContext }, props),
                        "emailpassword-sign-up"
                    );
                },
            },
            {
                factorIds: [FactorIds.EMAILPASSWORD],
                displayOrder: 2,
                type: "SIGN_IN",
                component: function (props) {
                    return jsx(
                        SignInFeature,
                        __assign({ recipe: _this.recipeInstance, useComponentOverrides: useContext }, props),
                        "emailpassword-sign-in"
                    );
                },
            },
        ];
    };
    // For tests
    EmailPasswordPreBuiltUI.reset = function () {
        if (!isTest()) {
            return;
        }
        EmailPasswordPreBuiltUI.instance = undefined;
        return;
    };
    EmailPasswordPreBuiltUI.ResetPasswordUsingToken = function (prop) {
        return EmailPasswordPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatureComponent("resetpassword", prop);
    };
    EmailPasswordPreBuiltUI.ResetPasswordUsingTokenTheme = ResetPasswordUsingTokenThemeWrapper;
    return EmailPasswordPreBuiltUI;
})(RecipeRouter);
var ResetPasswordUsingToken = EmailPasswordPreBuiltUI.ResetPasswordUsingToken;

export {
    EmailPasswordPreBuiltUI,
    ResetPasswordUsingToken,
    ResetPasswordUsingTokenThemeWrapper as ResetPasswordUsingTokenTheme,
};
