import { __assign, __rest } from '../../../../../../../_virtual/_tslib.js';
import { jsx } from 'react/jsx-runtime';
import SuperTokens from '../../../../../superTokens.js';
import UserContextWrapper from '../../../../../usercontext/userContextWrapper.js';
import '../../../../../../../multifactorauth.js';
import { ThemeBase } from '../themeBase.js';
import { EmailForm } from './emailForm.js';
import { EmailOrPhoneForm } from './emailOrPhoneForm.js';
import { PhoneForm } from './phoneForm.js';
import { FactorIds } from '../../../../multifactorauth/types.js';

var SignInUpScreens;
(function (SignInUpScreens) {
    SignInUpScreens[SignInUpScreens["EmailForm"] = 0] = "EmailForm";
    SignInUpScreens[SignInUpScreens["PhoneForm"] = 1] = "PhoneForm";
    SignInUpScreens[SignInUpScreens["EmailOrPhoneForm"] = 2] = "EmailOrPhoneForm";
})(SignInUpScreens || (SignInUpScreens = {}));
/*
 * Component.
 */
var SignInUpTheme = function (_a) {
    var activeScreen = _a.activeScreen, props = __rest(_a, ["activeScreen"]);
    var commonProps = {
        recipeImplementation: props.recipeImplementation,
        config: props.config,
        clearError: props.clearError,
        onError: props.onError,
        onFetchError: props.onFetchError,
        error: props.error,
        validatePhoneNumber: props.validatePhoneNumber,
    };
    return activeScreen === SignInUpScreens.EmailForm ? (jsx(EmailForm, __assign({}, commonProps))) : activeScreen === SignInUpScreens.PhoneForm ? (jsx(PhoneForm, __assign({}, commonProps))) : activeScreen === SignInUpScreens.EmailOrPhoneForm ? (jsx(EmailOrPhoneForm, __assign({}, commonProps))) : null;
};
function SignInUpThemeWrapper(props) {
    var rootStyle = SuperTokens.getInstanceOrThrow().rootStyle;
    var activeScreen = getActiveScreen(props.factorIds);
    var activeStyle;
    if (activeScreen === SignInUpScreens.EmailForm) {
        activeStyle = props.config.signInUpFeature.emailOrPhoneFormStyle;
    }
    else if (activeScreen === SignInUpScreens.PhoneForm) {
        activeStyle = props.config.signInUpFeature.emailOrPhoneFormStyle;
    }
    else if (activeScreen === SignInUpScreens.EmailOrPhoneForm) {
        activeStyle = props.config.signInUpFeature.emailOrPhoneFormStyle;
    }
    return (jsx(UserContextWrapper, __assign({ userContext: props.userContext }, { children: jsx(ThemeBase, __assign({ userStyles: [rootStyle, props.config.recipeRootStyle, activeStyle] }, { children: jsx(SignInUpTheme, __assign({}, props, { activeScreen: activeScreen })) })) })));
}
function getActiveScreen(factorIds) {
    if (factorIds.includes(FactorIds.LINK_EMAIL) || factorIds.includes(FactorIds.OTP_EMAIL)) {
        if (factorIds.includes(FactorIds.OTP_PHONE) || factorIds.includes(FactorIds.LINK_PHONE)) {
            return SignInUpScreens.EmailOrPhoneForm;
        }
        else {
            return SignInUpScreens.EmailForm;
        }
    }
    else {
        return SignInUpScreens.PhoneForm;
    }
}

export { SignInUpScreens, SignInUpThemeWrapper as default, getActiveScreen };
