import { __extends, __assign } from './_virtual/_tslib.js';
import { jsx } from 'react/jsx-runtime';
import NormalisedURLPath from 'supertokens-web-js/utils/normalisedURLPath';
import UserContextWrapper from './lib/ts/usercontext/userContextWrapper.js';
import { matchRecipeIdUsingQueryParams, isTest } from './lib/ts/utils.js';
import { RecipeRouter } from './lib/ts/recipe/recipeRouter/index.js';
import { SessionAuth } from './session.js';
import { useRecipeComponentOverrideContext as useContext } from './lib/ts/recipe/totp/componentOverrideContext.js';
import { SignInUpFeature } from './lib/ts/recipe/totp/components/features/mfa/index.js';
import TOTPMFAThemeWrapper from './lib/ts/recipe/totp/components/themes/mfa/index.js';
import { defaultTranslationsTOTP } from './lib/ts/recipe/totp/components/themes/translations.js';
import { DEFAULT_TOTP_PATH } from './lib/ts/recipe/totp/constants.js';
import TOTP from './lib/ts/recipe/totp/recipe.js';

var TOTPPreBuiltUI = /** @class */ (function (_super) {
    __extends(TOTPPreBuiltUI, _super);
    function TOTPPreBuiltUI(recipeInstance) {
        var _this = _super.call(this) || this;
        _this.recipeInstance = recipeInstance;
        _this.languageTranslations = defaultTranslationsTOTP;
        // Instance methods
        _this.getFeatures = function (useComponentOverrides) {
            if (useComponentOverrides === void 0) { useComponentOverrides = useContext; }
            var features = {};
            if (_this.recipeInstance.config.totpMFAScreen.disableDefaultUI !== true) {
                var normalisedFullPath = _this.recipeInstance.config.appInfo.websiteBasePath.appendPath(new NormalisedURLPath(DEFAULT_TOTP_PATH));
                features[normalisedFullPath.getAsStringDangerous()] = {
                    matches: matchRecipeIdUsingQueryParams(_this.recipeInstance.config.recipeId),
                    component: function (props) { return _this.getFeatureComponent("mfaTOTP", props, useComponentOverrides); },
                    recipeID: TOTP.RECIPE_ID,
                };
            }
            return features;
        };
        _this.getFeatureComponent = function (
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _, props, useComponentOverrides) {
            if (useComponentOverrides === void 0) { useComponentOverrides = useContext; }
            return (jsx(UserContextWrapper, __assign({ userContext: props.userContext }, { children: jsx(SessionAuth, __assign({ overrideGlobalClaimValidators: function () { return []; } }, { children: jsx(SignInUpFeature, __assign({ recipe: _this.recipeInstance, useComponentOverrides: useComponentOverrides }, props)) })) })));
        };
        return _this;
    }
    // Static methods
    TOTPPreBuiltUI.getInstanceOrInitAndGetInstance = function () {
        if (TOTPPreBuiltUI.instance === undefined) {
            var recipeInstance = TOTP.getInstanceOrThrow();
            TOTPPreBuiltUI.instance = new TOTPPreBuiltUI(recipeInstance);
        }
        return TOTPPreBuiltUI.instance;
    };
    TOTPPreBuiltUI.getFeatures = function (useComponentOverrides) {
        if (useComponentOverrides === void 0) { useComponentOverrides = useContext; }
        return TOTPPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatures(useComponentOverrides);
    };
    TOTPPreBuiltUI.getFeatureComponent = function (componentName, props, useComponentOverrides) {
        if (useComponentOverrides === void 0) { useComponentOverrides = useContext; }
        return TOTPPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatureComponent(componentName, props, useComponentOverrides);
    };
    TOTPPreBuiltUI.prototype.getAuthComponents = function () {
        return [];
    };
    // For tests
    TOTPPreBuiltUI.reset = function () {
        if (!isTest()) {
            return;
        }
        TOTPPreBuiltUI.instance = undefined;
        return;
    };
    TOTPPreBuiltUI.MFATOTP = function (props) {
        return TOTPPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatureComponent("mfaTOTP", props);
    };
    TOTPPreBuiltUI.MFATOTPTheme = TOTPMFAThemeWrapper;
    return TOTPPreBuiltUI;
}(RecipeRouter));
var MFATOTP = TOTPPreBuiltUI.MFATOTP;

export { MFATOTP, TOTPMFAThemeWrapper as MFATOTPTheme, TOTPPreBuiltUI };
