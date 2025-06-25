import { __extends, __assign } from './_virtual/_tslib.js';
import { jsx } from 'react/jsx-runtime';
import NormalisedURLPath from 'supertokens-web-js/utils/normalisedURLPath';
import UserContextWrapper from './lib/ts/usercontext/userContextWrapper.js';
import { matchRecipeIdUsingQueryParams, isTest } from './lib/ts/utils.js';
import { RecipeRouter } from './lib/ts/recipe/recipeRouter/index.js';
import { SessionAuth } from './session.js';
import { useRecipeComponentOverrideContext as useContext } from './lib/ts/recipe/oauth2provider/componentOverrideContext.js';
import { OAuth2LogoutScreen } from './lib/ts/recipe/oauth2provider/components/features/oauth2LogoutScreen/index.js';
import { TryRefreshPage as TryRefreshPage$1 } from './lib/ts/recipe/oauth2provider/components/features/tryRefreshPage/index.js';
import { defaultTranslationsOAuth2Provider } from './lib/ts/recipe/oauth2provider/components/themes/translations.js';
import { DEFAULT_TRY_REFRESH_PATH, DEFAULT_OAUTH2_LOGOUT_PATH } from './lib/ts/recipe/oauth2provider/constants.js';
import OAuth2Provider from './lib/ts/recipe/oauth2provider/recipe.js';

var OAuth2ProviderPreBuiltUI = /** @class */ (function (_super) {
    __extends(OAuth2ProviderPreBuiltUI, _super);
    function OAuth2ProviderPreBuiltUI(recipeInstance) {
        var _this = _super.call(this) || this;
        _this.recipeInstance = recipeInstance;
        _this.languageTranslations = defaultTranslationsOAuth2Provider;
        // Instance methods
        _this.getFeatures = function (useComponentOverrides) {
            if (useComponentOverrides === void 0) { useComponentOverrides = useContext; }
            if (_this.recipeInstance.config.disableDefaultUI) {
                return {};
            }
            var features = {};
            if (_this.recipeInstance.config.tryRefreshPage.disableDefaultUI !== true) {
                var normalisedFullPath = _this.recipeInstance.config.appInfo.websiteBasePath.appendPath(new NormalisedURLPath(DEFAULT_TRY_REFRESH_PATH));
                features[normalisedFullPath.getAsStringDangerous()] = {
                    matches: matchRecipeIdUsingQueryParams(_this.recipeInstance.config.recipeId),
                    component: function (props) { return _this.getFeatureComponent("try-refresh-page", props, useComponentOverrides); },
                    recipeID: OAuth2Provider.RECIPE_ID,
                };
            }
            if (_this.recipeInstance.config.oauth2LogoutScreen.disableDefaultUI !== true) {
                var normalisedFullPath = _this.recipeInstance.config.appInfo.websiteBasePath.appendPath(new NormalisedURLPath(DEFAULT_OAUTH2_LOGOUT_PATH));
                features[normalisedFullPath.getAsStringDangerous()] = {
                    matches: matchRecipeIdUsingQueryParams(_this.recipeInstance.config.recipeId),
                    component: function (props) {
                        return _this.getFeatureComponent("oauth2-logout-screen", props, useComponentOverrides);
                    },
                    recipeID: OAuth2Provider.RECIPE_ID,
                };
            }
            return features;
        };
        _this.getFeatureComponent = function (
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        componentName, props, useComponentOverrides) {
            if (useComponentOverrides === void 0) { useComponentOverrides = useContext; }
            if (componentName === "try-refresh-page") {
                return (jsx(UserContextWrapper, __assign({ userContext: props.userContext }, { children: jsx(SessionAuth, __assign({ requireAuth: false, overrideGlobalClaimValidators: function () { return []; } }, { children: jsx(TryRefreshPage$1, __assign({ recipe: _this.recipeInstance, useComponentOverrides: useComponentOverrides }, props)) })) })));
            }
            else if (componentName === "oauth2-logout-screen") {
                return (jsx(UserContextWrapper, __assign({ userContext: props.userContext }, { children: jsx(SessionAuth, __assign({ requireAuth: false, overrideGlobalClaimValidators: function () { return []; } }, { children: jsx(OAuth2LogoutScreen, __assign({ recipe: _this.recipeInstance, useComponentOverrides: useComponentOverrides }, props)) })) })));
            }
            throw new Error("Should never come here.");
        };
        return _this;
    }
    // Static methods
    OAuth2ProviderPreBuiltUI.getInstanceOrInitAndGetInstance = function () {
        if (OAuth2ProviderPreBuiltUI.instance === undefined) {
            var recipeInstance = OAuth2Provider.getInstanceOrThrow();
            OAuth2ProviderPreBuiltUI.instance = new OAuth2ProviderPreBuiltUI(recipeInstance);
        }
        return OAuth2ProviderPreBuiltUI.instance;
    };
    OAuth2ProviderPreBuiltUI.getFeatures = function (useComponentOverrides) {
        if (useComponentOverrides === void 0) { useComponentOverrides = useContext; }
        return OAuth2ProviderPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatures(useComponentOverrides);
    };
    OAuth2ProviderPreBuiltUI.getFeatureComponent = function (componentName, props, useComponentOverrides) {
        if (useComponentOverrides === void 0) { useComponentOverrides = useContext; }
        return OAuth2ProviderPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatureComponent(componentName, props, useComponentOverrides);
    };
    OAuth2ProviderPreBuiltUI.prototype.getAuthComponents = function () {
        return [];
    };
    // For tests
    OAuth2ProviderPreBuiltUI.reset = function () {
        if (!isTest()) {
            return;
        }
        OAuth2ProviderPreBuiltUI.instance = undefined;
        return;
    };
    OAuth2ProviderPreBuiltUI.TryRefreshPage = function (props) {
        return OAuth2ProviderPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatureComponent("try-refresh-page", props);
    };
    OAuth2ProviderPreBuiltUI.OAuth2LogoutScreen = function (props) {
        return OAuth2ProviderPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatureComponent("oauth2-logout-screen", props);
    };
    return OAuth2ProviderPreBuiltUI;
}(RecipeRouter));
var TryRefreshPage = OAuth2ProviderPreBuiltUI.TryRefreshPage;

export { OAuth2ProviderPreBuiltUI, TryRefreshPage };
