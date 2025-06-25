import { __assign } from '../../../../../../../_virtual/_tslib.js';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useCallback } from 'react';
import { SuperTokensBranding } from '../../../../../components/SuperTokensBranding.js';
import SuperTokens from '../../../../../superTokens.js';
import '../../../../../../../ui-entry.js';
import UserContextWrapper from '../../../../../usercontext/userContextWrapper.js';
import GeneralError from '../../../../emailpassword/components/library/generalError.js';
import { ThemeBase } from '../themeBase.js';
import { SignUpScreen, SignUpForm } from './signUpForm.js';
import { AuthPageHeader } from '../../../../authRecipe/components/theme/authPage/authPageHeader.js';
import { AuthPageFooter } from '../../../../authRecipe/components/theme/authPage/authPageFooter.js';

function PasskeySignUpTheme(props) {
    var stInstance = SuperTokens.getInstanceOrThrow();
    var rootStyle = stInstance.rootStyle;
    var activeStyle = props.config.signInAndUpFeature.style;
    var privacyPolicyLink = stInstance.privacyPolicyLink;
    var termsOfServiceLink = stInstance.termsOfServiceLink;
    var _a = useState(SignUpScreen.SignUpForm), activeScreen = _a[0], setActiveScreen = _a[1];
    var onContinueClick = useCallback(function () {
        setActiveScreen(SignUpScreen.PasskeyConfirmation);
    }, [setActiveScreen]);
    return (jsx(UserContextWrapper, __assign({ userContext: props.userContext }, { children: jsx(ThemeBase, __assign({ userStyles: [rootStyle, props.config.recipeRootStyle, activeStyle] }, { children: jsxs("div", __assign({ "data-supertokens": "container authPage ".concat(props.factorIds.length > 1 ? "multiFactor" : "singleFactor") }, { children: [jsxs("div", __assign({ "data-supertokens": "row" }, { children: [![SignUpScreen.Error].includes(activeScreen) && (jsx(AuthPageHeader, { factorIds: props.factorIds, isSignUp: true, onSignInUpSwitcherClick: props.onSignInUpSwitcherClick, hasSeparateSignUpView: true, resetFactorList: props.resetFactorList, showBackButton: props.showBackButton, oauth2ClientInfo: undefined, headerLabel: activeScreen === SignUpScreen.PasskeyConfirmation
                                    ? "WEBAUTHN_CREATE_A_PASSKEY_HEADER"
                                    : undefined, hideSignInSwitcher: activeScreen === SignUpScreen.PasskeyConfirmation })), props.error !== undefined && jsx(GeneralError, { error: props.error }), jsx(SignUpForm, __assign({}, props, { onContinueClick: onContinueClick, activeScreen: activeScreen, setActiveScreen: setActiveScreen })), jsx(AuthPageFooter, { factorIds: props.factorIds, isSignUp: true, hasSeparateSignUpView: true, privacyPolicyLink: privacyPolicyLink, termsOfServiceLink: termsOfServiceLink })] })), jsx(SuperTokensBranding, {})] })) })) })));
}

export { PasskeySignUpTheme as default };
