import { __extends, __assign } from "./_virtual/_tslib.js";
import { jsx } from "react/jsx-runtime";
import NormalisedURLPath from "supertokens-web-js/utils/normalisedURLPath";
import { UserContextContext } from "./lib/ts/usercontext/index.js";
import UserContextWrapper from "./lib/ts/usercontext/userContextWrapper.js";
import { matchRecipeIdUsingQueryParams, isTest } from "./lib/ts/utils.js";
import { RecipeRouter } from "./lib/ts/recipe/recipeRouter/index.js";
import { SessionAuth } from "./session.js";
import { useRecipeComponentOverrideContext as useContext } from "./lib/ts/recipe/emailverification/componentOverrideContext.js";
import { EmailVerification as EmailVerification$2 } from "./lib/ts/recipe/emailverification/components/features/emailVerification/index.js";
import { EmailVerificationTheme } from "./lib/ts/recipe/emailverification/components/themes/emailVerification/index.js";
import { defaultTranslationsEmailVerification } from "./lib/ts/recipe/emailverification/components/themes/translations.js";
import { DEFAULT_VERIFY_EMAIL_PATH } from "./lib/ts/recipe/emailverification/constants.js";
import EmailVerification$1 from "./lib/ts/recipe/emailverification/recipe.js";

var EmailVerificationPreBuiltUI = /** @class */ (function (_super) {
    __extends(EmailVerificationPreBuiltUI, _super);
    function EmailVerificationPreBuiltUI(recipeInstance) {
        var _this = _super.call(this) || this;
        _this.recipeInstance = recipeInstance;
        _this.languageTranslations = defaultTranslationsEmailVerification;
        // Instance methods
        _this.getFeatures = function (useComponentOverrides) {
            if (useComponentOverrides === void 0) {
                useComponentOverrides = useContext;
            }
            var features = {};
            if (_this.recipeInstance.config.disableDefaultUI !== true) {
                var normalisedFullPath = _this.recipeInstance.config.appInfo.websiteBasePath.appendPath(
                    new NormalisedURLPath(DEFAULT_VERIFY_EMAIL_PATH)
                );
                features[normalisedFullPath.getAsStringDangerous()] = {
                    matches: matchRecipeIdUsingQueryParams(_this.recipeInstance.config.recipeId),
                    component: function (props) {
                        return _this.getFeatureComponent("emailverification", props, useComponentOverrides);
                    },
                    recipeID: EmailVerification$1.RECIPE_ID,
                };
            }
            return features;
        };
        _this.getFeatureComponent = function (
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            _,
            props,
            useComponentOverrides
        ) {
            if (useComponentOverrides === void 0) {
                useComponentOverrides = useContext;
            }
            return jsx(
                UserContextWrapper,
                __assign(
                    { userContext: props.userContext },
                    {
                        children: jsx(
                            SessionAuth,
                            __assign(
                                {
                                    requireAuth: false,
                                    overrideGlobalClaimValidators: function () {
                                        return [];
                                    },
                                },
                                {
                                    children: jsx(UserContextContext.Consumer, {
                                        children: function (value) {
                                            return jsx(
                                                EmailVerification$2,
                                                __assign(
                                                    {
                                                        recipe: _this.recipeInstance,
                                                        useComponentOverrides: useComponentOverrides,
                                                    },
                                                    __assign(__assign({}, props), {
                                                        // We do this to make sure it does not add another provider
                                                        userContext: value,
                                                    })
                                                )
                                            );
                                        },
                                    }),
                                }
                            )
                        ),
                    }
                )
            );
        };
        return _this;
    }
    // Static methods
    EmailVerificationPreBuiltUI.getInstanceOrInitAndGetInstance = function () {
        if (EmailVerificationPreBuiltUI.instance === undefined) {
            var recipeInstance = EmailVerification$1.getInstanceOrThrow();
            EmailVerificationPreBuiltUI.instance = new EmailVerificationPreBuiltUI(recipeInstance);
        }
        return EmailVerificationPreBuiltUI.instance;
    };
    EmailVerificationPreBuiltUI.getFeatures = function (useComponentOverrides) {
        if (useComponentOverrides === void 0) {
            useComponentOverrides = useContext;
        }
        return EmailVerificationPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatures(useComponentOverrides);
    };
    EmailVerificationPreBuiltUI.getFeatureComponent = function (componentName, props, useComponentOverrides) {
        if (useComponentOverrides === void 0) {
            useComponentOverrides = useContext;
        }
        return EmailVerificationPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatureComponent(
            componentName,
            props,
            useComponentOverrides
        );
    };
    EmailVerificationPreBuiltUI.prototype.getAuthComponents = function () {
        return [];
    };
    // For tests
    EmailVerificationPreBuiltUI.reset = function () {
        if (!isTest()) {
            return;
        }
        EmailVerificationPreBuiltUI.instance = undefined;
        return;
    };
    EmailVerificationPreBuiltUI.EmailVerification = function (props) {
        return EmailVerificationPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatureComponent(
            "emailverification",
            props
        );
    };
    EmailVerificationPreBuiltUI.EmailVerificationTheme = EmailVerificationTheme;
    return EmailVerificationPreBuiltUI;
})(RecipeRouter);
var EmailVerification = EmailVerificationPreBuiltUI.EmailVerification;

export { EmailVerification, EmailVerificationPreBuiltUI, EmailVerificationTheme };
