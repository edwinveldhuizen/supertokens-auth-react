import { __extends, __assign } from "./_virtual/_tslib.js";
import { jsx } from "react/jsx-runtime";
import NormalisedURLPath from "supertokens-web-js/utils/normalisedURLPath";
import UserContextWrapper from "./lib/ts/usercontext/userContextWrapper.js";
import { isTest } from "./lib/ts/utils.js";
import "./multifactorauth.js";
import { RecipeRouter } from "./lib/ts/recipe/recipeRouter/index.js";
import { SessionAuth } from "./session.js";
import { useRecipeComponentOverrideContext as useContext } from "./lib/ts/recipe/thirdparty/componentOverrideContext.js";
import SignInAndUpFeatureWrapper from "./lib/ts/recipe/thirdparty/components/features/signInAndUp/index.js";
import SignInAndUpCallback$1 from "./lib/ts/recipe/thirdparty/components/features/signInAndUpCallback/index.js";
import { SignInAndUpCallbackTheme } from "./lib/ts/recipe/thirdparty/components/themes/signInAndUpCallback/index.js";
import { defaultTranslationsThirdParty } from "./lib/ts/recipe/thirdparty/components/themes/translations.js";
import ThirdParty from "./lib/ts/recipe/thirdparty/recipe.js";
import { matchRecipeIdUsingState } from "./lib/ts/recipe/thirdparty/utils.js";
import { FactorIds } from "./lib/ts/recipe/multifactorauth/types.js";

var ThirdPartyPreBuiltUI = /** @class */ (function (_super) {
    __extends(ThirdPartyPreBuiltUI, _super);
    function ThirdPartyPreBuiltUI(recipeInstance) {
        var _this = _super.call(this) || this;
        _this.recipeInstance = recipeInstance;
        _this.languageTranslations = defaultTranslationsThirdParty;
        // Instance methods
        _this.getFeatures = function (useComponentOverrides) {
            if (useComponentOverrides === void 0) {
                useComponentOverrides = useContext;
            }
            var features = {};
            // Add callback route for all provider
            var normalisedFullPath = _this.recipeInstance.config.appInfo.websiteBasePath.appendPath(
                new NormalisedURLPath("/callback/:id")
            );
            features[normalisedFullPath.getAsStringDangerous()] = {
                matches: function () {
                    return matchRecipeIdUsingState(_this.recipeInstance, {});
                },
                component: function (prop) {
                    return _this.getFeatureComponent("signinupcallback", prop, useComponentOverrides);
                },
                recipeID: ThirdParty.RECIPE_ID,
            };
            return features;
        };
        _this.getFeatureComponent = function (componentName, props, useComponentOverrides) {
            if (useComponentOverrides === void 0) {
                useComponentOverrides = useContext;
            }
            if (componentName === "signinupcallback") {
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
                                            SignInAndUpCallback$1,
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
            } else {
                throw new Error("Should never come here");
            }
        };
        return _this;
    }
    // Static methods
    ThirdPartyPreBuiltUI.getInstanceOrInitAndGetInstance = function () {
        if (ThirdPartyPreBuiltUI.instance === undefined) {
            var recipeInstace = ThirdParty.getInstanceOrThrow();
            ThirdPartyPreBuiltUI.instance = new ThirdPartyPreBuiltUI(recipeInstace);
        }
        return ThirdPartyPreBuiltUI.instance;
    };
    ThirdPartyPreBuiltUI.getFeatures = function (useComponentOverrides) {
        if (useComponentOverrides === void 0) {
            useComponentOverrides = useContext;
        }
        return ThirdPartyPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatures(useComponentOverrides);
    };
    ThirdPartyPreBuiltUI.getFeatureComponent = function (componentName, props, useComponentOverrides) {
        if (useComponentOverrides === void 0) {
            useComponentOverrides = useContext;
        }
        return ThirdPartyPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatureComponent(
            componentName,
            props,
            useComponentOverrides
        );
    };
    ThirdPartyPreBuiltUI.prototype.getAuthComponents = function () {
        var _this = this;
        return [
            {
                component: function (props) {
                    return jsx(
                        SignInAndUpFeatureWrapper,
                        __assign({}, props, { recipe: _this.recipeInstance, useComponentOverrides: useContext }),
                        "thirdparty-signinup"
                    );
                },
                displayOrder: 1,
                factorIds: [FactorIds.THIRDPARTY],
                type: "SIGN_IN_UP",
            },
        ];
    };
    // For tests
    ThirdPartyPreBuiltUI.reset = function () {
        if (!isTest()) {
            return;
        }
        ThirdPartyPreBuiltUI.instance = undefined;
        return;
    };
    ThirdPartyPreBuiltUI.SignInAndUpCallback = function (prop) {
        return ThirdPartyPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatureComponent("signinupcallback", prop);
    };
    ThirdPartyPreBuiltUI.SignInAndUpCallbackTheme = SignInAndUpCallbackTheme;
    return ThirdPartyPreBuiltUI;
})(RecipeRouter);
var SignInAndUpCallback = ThirdPartyPreBuiltUI.SignInAndUpCallback;

export { SignInAndUpCallback, SignInAndUpCallbackTheme, ThirdPartyPreBuiltUI };
