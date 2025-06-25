import { __extends, __assign } from './_virtual/_tslib.js';
import { jsx } from 'react/jsx-runtime';
import UserContextWrapper from './lib/ts/usercontext/userContextWrapper.js';
import { isTest } from './lib/ts/utils.js';
import { RecipeRouter } from './lib/ts/recipe/recipeRouter/index.js';
import { useRecipeComponentOverrideContext as useContext } from './lib/ts/recipe/session/componentOverrideContext.js';
import AccessDeniedScreen$1 from './lib/ts/recipe/session/components/features/accessDeniedScreen/index.js';
import { AccessDeniedScreenTheme } from './lib/ts/recipe/session/components/themes/accessDeniedScreenTheme/index.js';
import { defaultTranslationsSession } from './lib/ts/recipe/session/components/themes/translations.js';
import Session from './lib/ts/recipe/session/recipe.js';

var SessionPreBuiltUI = /** @class */ (function (_super) {
    __extends(SessionPreBuiltUI, _super);
    function SessionPreBuiltUI(recipeInstance) {
        var _this = _super.call(this) || this;
        _this.recipeInstance = recipeInstance;
        _this.languageTranslations = defaultTranslationsSession;
        // Instance methods
        _this.getFeatures = function (
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _useComponentOverrides) {
            return {};
        };
        _this.getFeatureComponent = function (componentName, props, useComponentOverrides) {
            if (useComponentOverrides === void 0) { useComponentOverrides = useContext; }
            if (componentName === "accessDenied") {
                return (jsx(UserContextWrapper, __assign({ userContext: props.userContext }, { children: jsx(AccessDeniedScreen$1, { recipe: _this.recipeInstance, useComponentOverrides: useComponentOverrides, error: props.error, useShadowDom: props.useShadowDom }) })));
            }
            throw new Error("Should never come here.");
        };
        return _this;
    }
    // Static methods
    SessionPreBuiltUI.getInstanceOrInitAndGetInstance = function () {
        if (SessionPreBuiltUI.instance === undefined) {
            var recipeInstance = Session.getInstanceOrThrow();
            SessionPreBuiltUI.instance = new SessionPreBuiltUI(recipeInstance);
        }
        return SessionPreBuiltUI.instance;
    };
    SessionPreBuiltUI.getFeatures = function (useComponentOverrides) {
        if (useComponentOverrides === void 0) { useComponentOverrides = useContext; }
        return SessionPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatures(useComponentOverrides);
    };
    SessionPreBuiltUI.getFeatureComponent = function (componentName, props, useComponentOverrides) {
        if (useComponentOverrides === void 0) { useComponentOverrides = useContext; }
        return SessionPreBuiltUI.getInstanceOrInitAndGetInstance().getFeatureComponent(componentName, props, useComponentOverrides);
    };
    SessionPreBuiltUI.prototype.getAuthComponents = function () {
        return [];
    };
    // For tests
    SessionPreBuiltUI.reset = function () {
        if (!isTest()) {
            return;
        }
        SessionPreBuiltUI.instance = undefined;
        return;
    };
    var _a;
    _a = SessionPreBuiltUI;
    SessionPreBuiltUI.AccessDeniedScreen = function (prop) {
        if (prop === void 0) { prop = {}; }
        return _a.getFeatureComponent("accessDenied", prop);
    };
    SessionPreBuiltUI.AccessDeniedScreenTheme = AccessDeniedScreenTheme;
    return SessionPreBuiltUI;
}(RecipeRouter));
var AccessDeniedScreen = SessionPreBuiltUI.AccessDeniedScreen;

export { AccessDeniedScreen, AccessDeniedScreenTheme, SessionPreBuiltUI };
