import { __extends, __assign } from './_virtual/_tslib.js';
import { jsx } from 'react/jsx-runtime';
import NormalisedURLPath from 'supertokens-web-js/utils/normalisedURLPath';
import UserContextWrapper from './lib/ts/usercontext/userContextWrapper.js';
import { matchRecipeIdUsingQueryParams, isTest } from './lib/ts/utils.js';
import { RecipeRouter } from './lib/ts/recipe/recipeRouter/index.js';
import { SessionAuth } from './session.js';
import { useRecipeComponentOverrideContext as useContext } from './lib/ts/recipe/multifactorauth/componentOverrideContext.js';
import { FactorChooser as FactorChooser$1 } from './lib/ts/recipe/multifactorauth/components/features/factorChooser/index.js';
import FactorChooserThemeWrapper from './lib/ts/recipe/multifactorauth/components/themes/factorChooser/index.js';
import { defaultTranslationsMultiFactorAuth } from './lib/ts/recipe/multifactorauth/components/themes/translations.js';
import { DEFAULT_FACTOR_CHOOSER_PATH } from './lib/ts/recipe/multifactorauth/constants.js';
import MultiFactorAuth from './lib/ts/recipe/multifactorauth/recipe.js';

var MultiFactorAuthPreBuiltUI = /** @class */ (function (_super) {
    __extends(MultiFactorAuthPreBuiltUI, _super);
    function MultiFactorAuthPreBuiltUI(recipeInstance) {
        var _this = _super.call(this) || this;
        _this.recipeInstance = recipeInstance;
        _this.languageTranslations = defaultTranslationsMultiFactorAuth;
        // Instance methods
        _this.getFeatures = function (useComponentOverrides) {
            if (useComponentOverrides === void 0) { useComponentOverrides = useContext; }
            var features = {};
            if (_this.recipeInstance.config.disableDefaultUI !== true) {
                var normalisedFullPath = _this.recipeInstance.config.appInfo.websiteBasePath.appendPath(new NormalisedURLPath(DEFAULT_FACTOR_CHOOSER_PATH));
                features[normalisedFullPath.getAsStringDangerous()] = {
                    matches: matchRecipeIdUsingQueryParams(_this.recipeInstance.config.recipeId),
                    component: function (props) { return _this.getFeatureComponent("factorchooser", props, useComponentOverrides); },
                    recipeID: MultiFactorAuth.RECIPE_ID,
                };
            }
            return features;
        };
        _this.getFeatureComponent = function (
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _, props, useComponentOverrides) {
            if (useComponentOverrides === void 0) { useComponentOverrides = useContext; }
            return (jsx(UserContextWrapper, __assign({ userContext: props.userContext }, { children: jsx(SessionAuth, __assign({ overrideGlobalClaimValidators: function () { return []; } }, { children: jsx(FactorChooser$1, __assign({ recipe: _this.recipeInstance, useComponentOverrides: useComponentOverrides }, props)) })) })));
        };
        return _this;
    }
    // Static methods
    MultiFactorAuthPreBuiltUI.getInstanceOrInitAndGetInstance = function () {
        if (MultiFactorAuthPreBuiltUI.instance === undefined) {
            var recipeInstance = MultiFactorAuth.getInstanceOrThrow();
            MultiFactorAuthPreBuiltUI.instance = new MultiFactorAuthPreBuiltUI(recipeInstance);
        }
        return MultiFactorAuthPreBuiltUI.instance;
    };
    MultiFactorAuthPreBuiltUI.getFeatures = function (useComponentOverrides) {
        if (useComponentOverrides === void 0) { useComponentOverrides = useContext; }
        return MultiFactorAuthPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatures(useComponentOverrides);
    };
    MultiFactorAuthPreBuiltUI.getFeatureComponent = function (componentName, props, useComponentOverrides) {
        if (useComponentOverrides === void 0) { useComponentOverrides = useContext; }
        return MultiFactorAuthPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatureComponent(componentName, props, useComponentOverrides);
    };
    MultiFactorAuthPreBuiltUI.prototype.getAuthComponents = function () {
        return [];
    };
    // For tests
    MultiFactorAuthPreBuiltUI.reset = function () {
        if (!isTest()) {
            return;
        }
        MultiFactorAuthPreBuiltUI.instance = undefined;
        return;
    };
    MultiFactorAuthPreBuiltUI.FactorChooser = function (props) {
        return MultiFactorAuthPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatureComponent("factorchooser", props);
    };
    MultiFactorAuthPreBuiltUI.FactorChooserTheme = FactorChooserThemeWrapper;
    return MultiFactorAuthPreBuiltUI;
}(RecipeRouter));
var FactorChooser = MultiFactorAuthPreBuiltUI.FactorChooser;

export { FactorChooser, FactorChooserThemeWrapper as FactorChooserTheme, MultiFactorAuthPreBuiltUI };
