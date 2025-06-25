import { __extends, __assign, __awaiter, __generator } from "./_virtual/_tslib.js";
import { jsx } from "react/jsx-runtime";
import NormalisedURLPath from "supertokens-web-js/lib/build/normalisedURLPath";
import UserContextWrapper from "./lib/ts/usercontext/userContextWrapper.js";
import { matchRecipeIdUsingQueryParams, isTest } from "./lib/ts/utils.js";
import "./multifactorauth.js";
import { RecipeRouter } from "./lib/ts/recipe/recipeRouter/index.js";
import { useRecipeComponentOverrideContext as useContext } from "./lib/ts/recipe/webauthn/componentOverrideContext.js";
import { RecoverAccountUsingToken } from "./lib/ts/recipe/webauthn/components/features/recoverAccountWithToken/index.js";
import { SendRecoveryEmailForm } from "./lib/ts/recipe/webauthn/components/features/sendRecoveryEmail/index.js";
import { SignInWithPasskeyFeature } from "./lib/ts/recipe/webauthn/components/features/signIn/index.js";
import {
    SignInUpFeatureFullPage,
    SignUpWithPasskeyFeature,
} from "./lib/ts/recipe/webauthn/components/features/signUp/index.js";
import { defaultTranslationsWebauthn } from "./lib/ts/recipe/webauthn/components/themes/translations.js";
import {
    DEFAULT_WEBAUTHN_RECOVERY_PATH,
    DEFAULT_WEBAUTHN_SEND_RECOVERY_EMAIL_PATH,
} from "./lib/ts/recipe/webauthn/constants.js";
import Webauthn from "./lib/ts/recipe/webauthn/recipe.js";
import { FactorIds } from "./lib/ts/recipe/multifactorauth/types.js";

var WebauthnPreBuiltUI = /** @class */ (function (_super) {
    __extends(WebauthnPreBuiltUI, _super);
    function WebauthnPreBuiltUI(recipeInstance) {
        var _this = _super.call(this) || this;
        _this.recipeInstance = recipeInstance;
        _this.languageTranslations = defaultTranslationsWebauthn;
        // Instance methods
        _this.getFeatures = function (useComponentOverrides) {
            if (useComponentOverrides === void 0) {
                useComponentOverrides = useContext;
            }
            var features = {};
            if (
                _this.recipeInstance.config.disableDefaultUI !== true &&
                _this.recipeInstance.config.recoveryFeature.disableDefaultUI !== true
            ) {
                var normalisedFullPath = _this.recipeInstance.config.appInfo.websiteBasePath.appendPath(
                    new NormalisedURLPath(DEFAULT_WEBAUTHN_RECOVERY_PATH)
                );
                features[normalisedFullPath.getAsStringDangerous()] = {
                    matches: matchRecipeIdUsingQueryParams(_this.recipeInstance.config.recipeId),
                    component: function (props) {
                        return _this.getFeatureComponent("webauthn-recover-account", props, useComponentOverrides);
                    },
                    recipeID: Webauthn.RECIPE_ID,
                };
                var normalisedFullPathForRecoveryThroughEmail =
                    _this.recipeInstance.config.appInfo.websiteBasePath.appendPath(
                        new NormalisedURLPath(DEFAULT_WEBAUTHN_SEND_RECOVERY_EMAIL_PATH)
                    );
                features[normalisedFullPathForRecoveryThroughEmail.getAsStringDangerous()] = {
                    matches: matchRecipeIdUsingQueryParams(_this.recipeInstance.config.recipeId),
                    component: function (props) {
                        return _this.getFeatureComponent("webauthn-send-recovery-email", props, useComponentOverrides);
                    },
                    recipeID: Webauthn.RECIPE_ID,
                };
            }
            return features;
        };
        _this.getFeatureComponent = function (componentName, props, useComponentOverrides) {
            if (useComponentOverrides === void 0) {
                useComponentOverrides = useContext;
            }
            if (componentName === "webauthn-recover-account") {
                return jsx(
                    UserContextWrapper,
                    __assign(
                        { userContext: props.userContext },
                        {
                            children: jsx(
                                RecoverAccountUsingToken,
                                __assign({ recipe: _this.recipeInstance }, props, {
                                    useComponentOverrides: useComponentOverrides,
                                })
                            ),
                        }
                    )
                );
            } else if (componentName === "webauthn-send-recovery-email") {
                return jsx(
                    UserContextWrapper,
                    __assign(
                        { userContext: props.userContext },
                        {
                            children: jsx(
                                SendRecoveryEmailForm,
                                __assign({ recipe: _this.recipeInstance }, props, {
                                    useComponentOverrides: useComponentOverrides,
                                })
                            ),
                        }
                    )
                );
            }
            throw new Error("Should never come here.");
        };
        _this.requiresSignUpPage = true;
        return _this;
    }
    // Static methods
    WebauthnPreBuiltUI.getInstanceOrInitAndGetInstance = function () {
        if (WebauthnPreBuiltUI.instance === undefined) {
            var recipeInstance = Webauthn.getInstanceOrThrow();
            WebauthnPreBuiltUI.instance = new WebauthnPreBuiltUI(recipeInstance);
        }
        return WebauthnPreBuiltUI.instance;
    };
    WebauthnPreBuiltUI.getFeatures = function (useComponentOverrides) {
        if (useComponentOverrides === void 0) {
            useComponentOverrides = useContext;
        }
        return WebauthnPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatures(useComponentOverrides);
    };
    WebauthnPreBuiltUI.getFeatureComponent = function (componentName, props, useComponentOverrides) {
        if (useComponentOverrides === void 0) {
            useComponentOverrides = useContext;
        }
        return WebauthnPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatureComponent(
            componentName,
            props,
            useComponentOverrides
        );
    };
    WebauthnPreBuiltUI.prototype.getAuthComponents = function () {
        var _this = this;
        return [
            {
                type: "FULL_PAGE",
                preloadInfoAndRunChecks: function (firstFactors, _, isSignUp) {
                    return __awaiter(this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            return [
                                2 /*return*/,
                                {
                                    shouldDisplay:
                                        isSignUp &&
                                        firstFactors.length === 1 &&
                                        firstFactors.includes(FactorIds.WEBAUTHN),
                                    preloadInfo: {},
                                },
                            ];
                        });
                    });
                },
                component: function (props) {
                    return jsx(
                        SignInUpFeatureFullPage,
                        __assign({}, props, {
                            recipe: _this.recipeInstance,
                            useComponentOverrides: useContext,
                            factorIds: [FactorIds.WEBAUTHN],
                        }),
                        "webauthnSignUpFullPage"
                    );
                },
            },
            {
                type: "SIGN_UP",
                factorIds: [FactorIds.WEBAUTHN],
                displayOrder: 4,
                component: function (props) {
                    return jsx(
                        SignUpWithPasskeyFeature,
                        __assign({}, props, {
                            recipe: _this.recipeInstance,
                            factorIds: [FactorIds.WEBAUTHN],
                            useComponentOverrides: useContext,
                        }),
                        "webauthn-sign-up"
                    );
                },
            },
            {
                type: "SIGN_IN",
                factorIds: [FactorIds.WEBAUTHN],
                displayOrder: 4,
                component: function (props) {
                    return jsx(
                        SignInWithPasskeyFeature,
                        __assign({}, props, {
                            recipe: _this.recipeInstance,
                            factorIds: [FactorIds.WEBAUTHN],
                            useComponentOverrides: useContext,
                        }),
                        "webauthn-sign-in"
                    );
                },
            },
        ];
    };
    // For tests
    WebauthnPreBuiltUI.reset = function () {
        if (!isTest()) {
            return;
        }
        WebauthnPreBuiltUI.instance = undefined;
        return;
    };
    return WebauthnPreBuiltUI;
})(RecipeRouter);

export { WebauthnPreBuiltUI };
