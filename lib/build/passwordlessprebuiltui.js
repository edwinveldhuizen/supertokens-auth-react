import { __extends, __assign, __spreadArray, __awaiter, __generator, __rest } from "./_virtual/_tslib.js";
import { createElement } from "react";
import { jsx } from "react/jsx-runtime";
import NormalisedURLPath from "supertokens-web-js/utils/normalisedURLPath";
import UserContextWrapper from "./lib/ts/usercontext/userContextWrapper.js";
import { matchRecipeIdUsingQueryParams, isTest } from "./lib/ts/utils.js";
import EmailPassword from "./lib/ts/recipe/emailpassword/recipe.js";
import "./multifactorauth.js";
import { RecipeRouter } from "./lib/ts/recipe/recipeRouter/index.js";
import { SessionAuth } from "./session.js";
import { useRecipeComponentOverrideContext as useContext } from "./lib/ts/recipe/passwordless/componentOverrideContext.js";
import { ContinueWithPasswordlessFeature } from "./lib/ts/recipe/passwordless/components/features/continueWithPasswordless/index.js";
import LinkClickedScreen from "./lib/ts/recipe/passwordless/components/features/linkClickedScreen/index.js";
import { LinkSentFeature } from "./lib/ts/recipe/passwordless/components/features/linkSent/index.js";
import { MFAFeature } from "./lib/ts/recipe/passwordless/components/features/mfa/index.js";
import { SignInUpFeature } from "./lib/ts/recipe/passwordless/components/features/signInAndUp/index.js";
import { SignInUpEPComboFeature } from "./lib/ts/recipe/passwordless/components/features/signInAndUpEPCombo/index.js";
import { UserInputCodeFeature } from "./lib/ts/recipe/passwordless/components/features/userInputCode/index.js";
import MFAThemeWrapper from "./lib/ts/recipe/passwordless/components/themes/mfa/index.js";
import { defaultTranslationsPasswordless } from "./lib/ts/recipe/passwordless/components/themes/translations.js";
import Passwordless from "./lib/ts/recipe/passwordless/recipe.js";
import { checkAdditionalLoginAttemptInfoProperties } from "./lib/ts/recipe/passwordless/utils.js";
import { FactorIds } from "./lib/ts/recipe/multifactorauth/types.js";

var PasswordlessPreBuiltUI = /** @class */ (function (_super) {
    __extends(PasswordlessPreBuiltUI, _super);
    function PasswordlessPreBuiltUI(recipeInstance) {
        var _this = _super.call(this) || this;
        _this.recipeInstance = recipeInstance;
        _this.languageTranslations = defaultTranslationsPasswordless;
        // Instance methods
        _this.getFeatures = function (useComponentOverrides) {
            if (useComponentOverrides === void 0) {
                useComponentOverrides = useContext;
            }
            var features = {};
            if (_this.recipeInstance.config.linkClickedScreenFeature.disableDefaultUI !== true) {
                var normalisedFullPath = _this.recipeInstance.config.appInfo.websiteBasePath.appendPath(
                    new NormalisedURLPath("/verify")
                );
                features[normalisedFullPath.getAsStringDangerous()] = {
                    matches: matchRecipeIdUsingQueryParams(_this.recipeInstance.config.recipeId),
                    component: function (props) {
                        return _this.getFeatureComponent("linkClickedScreen", props, useComponentOverrides);
                    },
                    recipeID: Passwordless.RECIPE_ID,
                };
            }
            if (_this.recipeInstance.config.mfaFeature.disableDefaultUI !== true) {
                var normalisedFullPathPhone = _this.recipeInstance.config.appInfo.websiteBasePath.appendPath(
                    new NormalisedURLPath("/mfa/otp-phone")
                );
                features[normalisedFullPathPhone.getAsStringDangerous()] = {
                    matches: matchRecipeIdUsingQueryParams(_this.recipeInstance.config.recipeId),
                    component: function (props) {
                        return _this.getFeatureComponent("otp-phone", props, useComponentOverrides);
                    },
                    recipeID: Passwordless.RECIPE_ID,
                };
                var normalisedFullPathEmail = _this.recipeInstance.config.appInfo.websiteBasePath.appendPath(
                    new NormalisedURLPath("/mfa/otp-email")
                );
                features[normalisedFullPathEmail.getAsStringDangerous()] = {
                    matches: matchRecipeIdUsingQueryParams(_this.recipeInstance.config.recipeId),
                    component: function (props) {
                        return _this.getFeatureComponent("otp-email", props, useComponentOverrides);
                    },
                    recipeID: Passwordless.RECIPE_ID,
                };
            }
            return features;
        };
        _this.getFeatureComponent = function (componentName, props, useComponentOverrides) {
            if (useComponentOverrides === void 0) {
                useComponentOverrides = useContext;
            }
            if (componentName === "linkClickedScreen") {
                return jsx(
                    UserContextWrapper,
                    __assign(
                        { userContext: props.userContext },
                        {
                            children: jsx(
                                SessionAuth,
                                __assign(
                                    { requireAuth: false, doRedirection: false },
                                    {
                                        children: jsx(
                                            LinkClickedScreen,
                                            __assign({ recipe: _this.recipeInstance }, props, {
                                                useComponentOverrides: useComponentOverrides,
                                            })
                                        ),
                                    }
                                )
                            ),
                        }
                    )
                );
            }
            if (componentName === "otp-email") {
                return jsx(
                    UserContextWrapper,
                    __assign(
                        { userContext: props.userContext },
                        {
                            children: jsx(
                                SessionAuth,
                                __assign(
                                    {
                                        overrideGlobalClaimValidators: function () {
                                            return [];
                                        },
                                    },
                                    {
                                        children: jsx(
                                            MFAFeature,
                                            __assign(
                                                {
                                                    recipe: _this.recipeInstance,
                                                    useComponentOverrides: useComponentOverrides,
                                                    contactMethod: "EMAIL",
                                                    flowType: "USER_INPUT_CODE",
                                                },
                                                props
                                            )
                                        ),
                                    }
                                )
                            ),
                        }
                    )
                );
            }
            if (componentName === "otp-phone") {
                return jsx(
                    UserContextWrapper,
                    __assign(
                        { userContext: props.userContext },
                        {
                            children: jsx(
                                SessionAuth,
                                __assign(
                                    {
                                        overrideGlobalClaimValidators: function () {
                                            return [];
                                        },
                                    },
                                    {
                                        children: jsx(
                                            MFAFeature,
                                            __assign(
                                                {
                                                    recipe: _this.recipeInstance,
                                                    useComponentOverrides: useComponentOverrides,
                                                    contactMethod: "PHONE",
                                                    flowType: "USER_INPUT_CODE",
                                                },
                                                props
                                            )
                                        ),
                                    }
                                )
                            ),
                        }
                    )
                );
            }
            throw new Error("Should never come here.");
        };
        return _this;
    }
    // Static methods
    PasswordlessPreBuiltUI.getInstanceOrInitAndGetInstance = function () {
        if (PasswordlessPreBuiltUI.instance === undefined) {
            var recipeInstance = Passwordless.getInstanceOrThrow();
            PasswordlessPreBuiltUI.instance = new PasswordlessPreBuiltUI(recipeInstance);
        }
        return PasswordlessPreBuiltUI.instance;
    };
    PasswordlessPreBuiltUI.getFeatures = function (useComponentOverrides) {
        if (useComponentOverrides === void 0) {
            useComponentOverrides = useContext;
        }
        return PasswordlessPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatures(useComponentOverrides);
    };
    PasswordlessPreBuiltUI.getFeatureComponent = function (componentName, props, useComponentOverrides) {
        if (useComponentOverrides === void 0) {
            useComponentOverrides = useContext;
        }
        return PasswordlessPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatureComponent(
            componentName,
            props,
            useComponentOverrides
        );
    };
    PasswordlessPreBuiltUI.prototype.getAuthComponents = function () {
        var _this = this;
        var factorCombos = getAllFactorChoices([
            FactorIds.LINK_EMAIL,
            FactorIds.LINK_PHONE,
            FactorIds.OTP_EMAIL,
            FactorIds.OTP_PHONE,
        ]);
        var res = __spreadArray(
            __spreadArray(
                [
                    {
                        type: "FULL_PAGE",
                        preloadInfoAndRunChecks: function (firstFactors, userContext) {
                            var _b, _c, _d;
                            return __awaiter(this, void 0, void 0, function () {
                                var loginAttemptInfo;
                                return __generator(this, function (_e) {
                                    switch (_e.label) {
                                        case 0:
                                            return [
                                                4 /*yield*/,
                                                Passwordless.getInstanceOrThrow().webJSRecipe.getLoginAttemptInfo({
                                                    userContext: userContext,
                                                }),
                                            ];
                                        case 1:
                                            loginAttemptInfo = _e.sent();
                                            if (!(loginAttemptInfo !== undefined)) return [3 /*break*/, 7];
                                            if (
                                                !(
                                                    loginAttemptInfo.contactMethod === "PHONE" &&
                                                    !firstFactors.includes(FactorIds.OTP_PHONE) &&
                                                    !firstFactors.includes(FactorIds.LINK_PHONE)
                                                )
                                            )
                                                return [3 /*break*/, 3];
                                            return [
                                                4 /*yield*/,
                                                (_b = Passwordless.getInstanceOrThrow().webJSRecipe) === null ||
                                                _b === void 0
                                                    ? void 0
                                                    : _b.clearLoginAttemptInfo({ userContext: userContext }),
                                            ];
                                        case 2:
                                            _e.sent();
                                            loginAttemptInfo = undefined;
                                            return [3 /*break*/, 7];
                                        case 3:
                                            if (
                                                !(
                                                    loginAttemptInfo.contactMethod === "EMAIL" &&
                                                    !firstFactors.includes(FactorIds.OTP_EMAIL) &&
                                                    !firstFactors.includes(FactorIds.LINK_EMAIL)
                                                )
                                            )
                                                return [3 /*break*/, 5];
                                            return [
                                                4 /*yield*/,
                                                (_c = Passwordless.getInstanceOrThrow().webJSRecipe) === null ||
                                                _c === void 0
                                                    ? void 0
                                                    : _c.clearLoginAttemptInfo({ userContext: userContext }),
                                            ];
                                        case 4:
                                            _e.sent();
                                            loginAttemptInfo = undefined;
                                            return [3 /*break*/, 7];
                                        case 5:
                                            if (!!checkAdditionalLoginAttemptInfoProperties(loginAttemptInfo))
                                                return [3 /*break*/, 7];
                                            // If these properties are not set, it means that the user likely started logging in
                                            // using a custom UI and then switched to the pre-built UI. In that case, we should clear
                                            // the login attempt info so that the user is prompted to login again, since the pre-built UI
                                            // requires these properties to be set in order to show the correct UI.
                                            return [
                                                4 /*yield*/,
                                                (_d = Passwordless.getInstanceOrThrow().webJSRecipe) === null ||
                                                _d === void 0
                                                    ? void 0
                                                    : _d.clearLoginAttemptInfo({ userContext: userContext }),
                                            ];
                                        case 6:
                                            // If these properties are not set, it means that the user likely started logging in
                                            // using a custom UI and then switched to the pre-built UI. In that case, we should clear
                                            // the login attempt info so that the user is prompted to login again, since the pre-built UI
                                            // requires these properties to be set in order to show the correct UI.
                                            _e.sent();
                                            loginAttemptInfo = undefined;
                                            _e.label = 7;
                                        case 7:
                                            if (
                                                loginAttemptInfo === undefined ||
                                                loginAttemptInfo.flowType !== "MAGIC_LINK"
                                            ) {
                                                return [
                                                    2 /*return*/,
                                                    {
                                                        shouldDisplay: false,
                                                    },
                                                ];
                                            }
                                            return [
                                                2 /*return*/,
                                                {
                                                    shouldDisplay: true,
                                                    preloadInfo: loginAttemptInfo,
                                                },
                                            ];
                                    }
                                });
                            });
                        },
                        component: function (_b) {
                            var preloadInfo = _b.preloadInfo,
                                props = __rest(_b, ["preloadInfo"]);
                            return jsx(
                                LinkSentFeature,
                                __assign({}, props, {
                                    recipe: _this.recipeInstance,
                                    useComponentOverrides: useContext,
                                    loginAttemptInfo: preloadInfo,
                                }),
                                "linkSentFullPage"
                            );
                        },
                    },
                    {
                        type: "FULL_PAGE",
                        preloadInfoAndRunChecks: function (firstFactors, userContext) {
                            var _b, _c, _d;
                            return __awaiter(this, void 0, void 0, function () {
                                var loginAttemptInfo;
                                return __generator(this, function (_e) {
                                    switch (_e.label) {
                                        case 0:
                                            return [
                                                4 /*yield*/,
                                                Passwordless.getInstanceOrThrow().webJSRecipe.getLoginAttemptInfo({
                                                    userContext: userContext,
                                                }),
                                            ];
                                        case 1:
                                            loginAttemptInfo = _e.sent();
                                            if (!(loginAttemptInfo !== undefined)) return [3 /*break*/, 7];
                                            if (
                                                !(
                                                    loginAttemptInfo.contactMethod === "PHONE" &&
                                                    !firstFactors.includes(FactorIds.OTP_PHONE) &&
                                                    !firstFactors.includes(FactorIds.LINK_PHONE)
                                                )
                                            )
                                                return [3 /*break*/, 3];
                                            return [
                                                4 /*yield*/,
                                                (_b = Passwordless.getInstanceOrThrow().webJSRecipe) === null ||
                                                _b === void 0
                                                    ? void 0
                                                    : _b.clearLoginAttemptInfo({ userContext: userContext }),
                                            ];
                                        case 2:
                                            _e.sent();
                                            loginAttemptInfo = undefined;
                                            return [3 /*break*/, 7];
                                        case 3:
                                            if (
                                                !(
                                                    loginAttemptInfo.contactMethod === "EMAIL" &&
                                                    !firstFactors.includes(FactorIds.OTP_EMAIL) &&
                                                    !firstFactors.includes(FactorIds.LINK_EMAIL)
                                                )
                                            )
                                                return [3 /*break*/, 5];
                                            return [
                                                4 /*yield*/,
                                                (_c = Passwordless.getInstanceOrThrow().webJSRecipe) === null ||
                                                _c === void 0
                                                    ? void 0
                                                    : _c.clearLoginAttemptInfo({ userContext: userContext }),
                                            ];
                                        case 4:
                                            _e.sent();
                                            loginAttemptInfo = undefined;
                                            return [3 /*break*/, 7];
                                        case 5:
                                            if (!!checkAdditionalLoginAttemptInfoProperties(loginAttemptInfo))
                                                return [3 /*break*/, 7];
                                            // If these properties are not set, it means that the user likely started logging in
                                            // using a custom UI and then switched to the pre-built UI. In that case, we should clear
                                            // the login attempt info so that the user is prompted to login again, since the pre-built UI
                                            // requires these properties to be set in order to show the correct UI.
                                            return [
                                                4 /*yield*/,
                                                (_d = Passwordless.getInstanceOrThrow().webJSRecipe) === null ||
                                                _d === void 0
                                                    ? void 0
                                                    : _d.clearLoginAttemptInfo({ userContext: userContext }),
                                            ];
                                        case 6:
                                            // If these properties are not set, it means that the user likely started logging in
                                            // using a custom UI and then switched to the pre-built UI. In that case, we should clear
                                            // the login attempt info so that the user is prompted to login again, since the pre-built UI
                                            // requires these properties to be set in order to show the correct UI.
                                            _e.sent();
                                            loginAttemptInfo = undefined;
                                            _e.label = 7;
                                        case 7:
                                            if (
                                                loginAttemptInfo === undefined ||
                                                loginAttemptInfo.flowType === "MAGIC_LINK"
                                            ) {
                                                return [
                                                    2 /*return*/,
                                                    {
                                                        shouldDisplay: false,
                                                    },
                                                ];
                                            }
                                            return [
                                                2 /*return*/,
                                                {
                                                    shouldDisplay: true,
                                                    preloadInfo: loginAttemptInfo,
                                                },
                                            ];
                                    }
                                });
                            });
                        },
                        component: function (_b) {
                            var preloadInfo = _b.preloadInfo,
                                props = __rest(_b, ["preloadInfo"]);
                            return jsx(
                                UserInputCodeFeature,
                                __assign({}, props, {
                                    recipe: _this.recipeInstance,
                                    useComponentOverrides: useContext,
                                    loginAttemptInfo: preloadInfo,
                                }),
                                "userInputCodeFullPage"
                            );
                        },
                    },
                ],
                factorCombos.map(function (factors) {
                    return {
                        type: "SIGN_IN",
                        factorIds: factors,
                        displayOrder: 3,
                        component: function (props) {
                            return createElement(
                                SignInUpFeature,
                                __assign({}, props, {
                                    key: factors.join("|"),
                                    recipe: _this.recipeInstance,
                                    useComponentOverrides: useContext,
                                    factorIds: factors,
                                })
                            );
                        },
                    };
                }),
                true
            ),
            factorCombos.map(function (factors) {
                return {
                    type: "SIGN_UP",
                    factorIds: factors,
                    displayOrder: 3,
                    component: function (props) {
                        return jsx(
                            ContinueWithPasswordlessFeature,
                            __assign({}, props, {
                                recipe: _this.recipeInstance,
                                factorIds: factors,
                                useComponentOverrides: useContext,
                            }),
                            factors.join("|")
                        );
                    },
                };
            }),
            true
        );
        // We only do this and check if we should add this component
        // because it provides a better error message if EP is not initialized, but requested
        try {
            EmailPassword.getInstanceOrThrow();
            res.push.apply(
                res,
                factorCombos
                    .map(function (combo) {
                        return __spreadArray([FactorIds.EMAILPASSWORD], combo, true);
                    })
                    .map(function (factors) {
                        return {
                            type: "SIGN_IN",
                            factorIds: factors,
                            displayOrder: 3,
                            component: function (props) {
                                return createElement(
                                    SignInUpEPComboFeature,
                                    __assign({}, props, {
                                        key: factors.join("|"),
                                        recipe: _this.recipeInstance,
                                        useComponentOverrides: useContext,
                                        factorIds: factors,
                                    })
                                );
                            },
                        };
                    })
            );
        } catch (_b) {
            // EP was not initialized, so not adding the combo component is OK
        }
        return res;
    };
    // For tests
    PasswordlessPreBuiltUI.reset = function () {
        if (!isTest()) {
            return;
        }
        PasswordlessPreBuiltUI.instance = undefined;
        return;
    };
    var _a;
    _a = PasswordlessPreBuiltUI;
    PasswordlessPreBuiltUI.LinkClicked = function (props) {
        return _a.getFeatureComponent("linkClickedScreen", props);
    };
    PasswordlessPreBuiltUI.MfaOtpPhone = function (props) {
        return _a.getFeatureComponent("otp-phone", props);
    };
    PasswordlessPreBuiltUI.MfaOtpEmail = function (props) {
        return _a.getFeatureComponent("otp-email", props);
    };
    PasswordlessPreBuiltUI.MFAOTPTheme = MFAThemeWrapper;
    return PasswordlessPreBuiltUI;
})(RecipeRouter);
var LinkClicked = PasswordlessPreBuiltUI.LinkClicked;
var MfaOtpPhone = PasswordlessPreBuiltUI.MfaOtpPhone;
var MfaOtpEmail = PasswordlessPreBuiltUI.MfaOtpEmail;
function getAllChoices(choices) {
    if (choices.length === 0) {
        return [[]];
    }
    var subChoices = getAllChoices(choices.slice(1));
    return __spreadArray(
        __spreadArray([], subChoices, true),
        subChoices.map(function (a) {
            return __spreadArray([choices[0]], a, true);
        }),
        true
    );
}
function getAllFactorChoices(factorIds) {
    return getAllChoices(factorIds)
        .sort(function (a, b) {
            return a.length - b.length;
        })
        .slice(1);
}

export { LinkClicked, MFAThemeWrapper as MFAOTPTheme, MfaOtpEmail, MfaOtpPhone, PasswordlessPreBuiltUI };
