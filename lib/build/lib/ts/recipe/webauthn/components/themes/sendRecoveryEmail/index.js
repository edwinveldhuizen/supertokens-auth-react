import { __assign } from '../../../../../../../_virtual/_tslib.js';
import { jsx, jsxs } from 'react/jsx-runtime';
import { SuperTokensBranding } from '../../../../../components/SuperTokensBranding.js';
import SuperTokens from '../../../../../superTokens.js';
import '../../../../../../../ui-entry.js';
import UserContextWrapper from '../../../../../usercontext/userContextWrapper.js';
import GeneralError from '../../../../emailpassword/components/library/generalError.js';
import { SendRecoveryEmailScreen } from '../../../types.js';
import { ThemeBase } from '../themeBase.js';
import { PasskeyRecoveryEmailSent } from './emailSent.js';
import { WebauthnRecoverAccount } from './recoverAccountForm.js';
import { AuthPageFooter } from '../../../../authRecipe/components/theme/authPage/authPageFooter.js';

var SendRecoveryEmailFormThemeInner = function (props) {
    return props.activeScreen === SendRecoveryEmailScreen.RecoverAccount ? (jsx(WebauthnRecoverAccount, { onSuccess: props.onRecoverAccountFormSuccess, onBackClick: props.onRecoverAccountBackClick, recipeImplementation: props.recipeImplementation })) : props.activeScreen === SendRecoveryEmailScreen.RecoverEmailSent ? (jsx(PasskeyRecoveryEmailSent, { email: props.recoverAccountEmail, onEmailChangeClick: props.onEmailChangeClick })) : null;
};
var SendRecoveryEmailFormTheme = function (props) {
    var stInstance = SuperTokens.getInstanceOrThrow();
    var rootStyle = stInstance.rootStyle;
    var privacyPolicyLink = stInstance.privacyPolicyLink;
    var termsOfServiceLink = stInstance.termsOfServiceLink;
    return (jsx(UserContextWrapper, __assign({ userContext: props.userContext }, { children: jsx(ThemeBase, __assign({ userStyles: [rootStyle, props.config.recipeRootStyle] }, { children: jsxs("div", __assign({ "data-supertokens": "container authPage recoverAccountWithEmail" }, { children: [jsxs("div", __assign({ "data-supertokens": "row" }, { children: [props.error !== undefined && jsx(GeneralError, { error: props.error }), jsx(SendRecoveryEmailFormThemeInner, __assign({}, props, { activeScreen: props.activeScreen, setActiveScreen: props.setActiveScreen })), props.activeScreen !== SendRecoveryEmailScreen.RecoverEmailSent && (jsx(AuthPageFooter, { factorIds: [], isSignUp: true, hasSeparateSignUpView: true, privacyPolicyLink: privacyPolicyLink, termsOfServiceLink: termsOfServiceLink }))] })), jsx(SuperTokensBranding, {})] })) })) })));
};

export { SendRecoveryEmailFormThemeInner, SendRecoveryEmailFormTheme as default };
