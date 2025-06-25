import { __assign, __rest } from '../../../../../../../_virtual/_tslib.js';
import { jsx } from 'react/jsx-runtime';
import SuperTokens from '../../../../../superTokens.js';
import UserContextWrapper from '../../../../../usercontext/userContextWrapper.js';
import '../../../../../../../multifactorauth.js';
import { ThemeBase } from '../themeBase.js';
import { EPComboEmailForm } from './emailForm.js';
import { EPComboEmailOrPhoneForm } from './emailOrPhoneForm.js';
import { FactorIds } from '../../../../multifactorauth/types.js';

var SignInUpEPComboScreens;
(function (SignInUpEPComboScreens) {
    SignInUpEPComboScreens[SignInUpEPComboScreens["EmailForm"] = 0] = "EmailForm";
    SignInUpEPComboScreens[SignInUpEPComboScreens["EmailOrPhoneForm"] = 1] = "EmailOrPhoneForm";
})(SignInUpEPComboScreens || (SignInUpEPComboScreens = {}));
/*
 * Component.
 */
var SignInUpTheme = function (_a) {
    var activeScreen = _a.activeScreen, props = __rest(_a, ["activeScreen"]);
    var commonProps = __assign({}, props);
    return activeScreen === SignInUpEPComboScreens.EmailForm ? (jsx(EPComboEmailForm, __assign({}, commonProps))) : activeScreen === SignInUpEPComboScreens.EmailOrPhoneForm ? (jsx(EPComboEmailOrPhoneForm, __assign({}, commonProps))) : null;
};
function SignInUpThemeWrapper(props) {
    var rootStyle = SuperTokens.getInstanceOrThrow().rootStyle;
    var activeScreen = getActiveScreen(props.factorIds);
    var activeStyle = props.config.signInUpFeature.emailOrPhoneFormStyle;
    return (jsx(UserContextWrapper, __assign({ userContext: props.userContext }, { children: jsx(ThemeBase, __assign({ userStyles: [rootStyle, props.config.recipeRootStyle, activeStyle] }, { children: jsx(SignInUpTheme, __assign({}, props, { activeScreen: activeScreen })) })) })));
}
function getActiveScreen(factorIds) {
    if (factorIds.includes(FactorIds.OTP_PHONE) || factorIds.includes(FactorIds.LINK_PHONE)) {
        return SignInUpEPComboScreens.EmailOrPhoneForm;
    }
    else {
        return SignInUpEPComboScreens.EmailForm;
    }
}

export { SignInUpEPComboScreens, SignInUpThemeWrapper as default };
