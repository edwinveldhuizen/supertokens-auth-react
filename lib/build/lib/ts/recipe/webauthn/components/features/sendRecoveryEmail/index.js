import { __assign, __awaiter, __generator } from '../../../../../../../_virtual/_tslib.js';
import { jsx, jsxs } from 'react/jsx-runtime';
import * as React from 'react';
import { redirectToAuth } from '../../../../../../../index.js';
import { ComponentOverrideContext } from '../../../../../components/componentOverride/componentOverrideContext.js';
import FeatureWrapper from '../../../../../components/featureWrapper.js';
import SuperTokens from '../../../../../superTokens.js';
import { SendRecoveryEmailScreen } from '../../../types.js';
import SendRecoveryEmailFormTheme from '../../themes/sendRecoveryEmail/index.js';
import { defaultTranslationsWebauthn } from '../../themes/translations.js';

var SendRecoveryEmailForm = function (props) {
    var userContext;
    if (props.userContext !== undefined) {
        userContext = props.userContext;
    }
    var _a = React.useState(), error = _a[0], setError = _a[1];
    var _b = React.useState(""), recoverAccountEmail = _b[0], setRecoverAccountEmail = _b[1];
    var _c = React.useState(SendRecoveryEmailScreen.RecoverAccount), activeScreen = _c[0], setActiveScreen = _c[1];
    var onRecoverAccountFormSuccess = function (result) {
        setRecoverAccountEmail(result.email);
        setActiveScreen(SendRecoveryEmailScreen.RecoverEmailSent);
    };
    var onRecoverAccountBackClick = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, redirectToAuth({ show: "signup" })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var onEmailChangeClick = function () {
        setActiveScreen(SendRecoveryEmailScreen.RecoverAccount);
    };
    var childProps = {
        config: props.recipe.config,
        error: error,
        onError: function (error) { return setError(error); },
        clearError: function () { return setError(undefined); },
        recipeImplementation: props.recipe.webJSRecipe,
        useComponentOverride: props.useComponentOverrides,
        userContext: userContext,
        recoverAccountEmail: recoverAccountEmail,
        activeScreen: activeScreen,
        onRecoverAccountFormSuccess: onRecoverAccountFormSuccess,
        onRecoverAccountBackClick: onRecoverAccountBackClick,
        onEmailChangeClick: onEmailChangeClick,
        setActiveScreen: setActiveScreen,
    };
    var recipeComponentOverrides = props.useComponentOverrides();
    return (jsx(ComponentOverrideContext.Provider, __assign({ value: recipeComponentOverrides }, { children: jsx(FeatureWrapper, __assign({ useShadowDom: SuperTokens.getInstanceOrThrow().useShadowDom, defaultStore: defaultTranslationsWebauthn }, { children: jsxs(React.Fragment, { children: [props.children === undefined && jsx(SendRecoveryEmailFormTheme, __assign({}, childProps)), props.children &&
                        React.Children.map(props.children, function (child) {
                            if (React.isValidElement(child)) {
                                return React.cloneElement(child, childProps);
                            }
                            return child;
                        })] }) })) })));
};

export { SendRecoveryEmailForm };
