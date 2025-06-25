import { __assign } from '../../../../../../../_virtual/_tslib.js';
import { jsx, Fragment, jsxs } from 'react/jsx-runtime';
import { SuperTokensBranding } from '../../../../../components/SuperTokensBranding.js';
import SuperTokens from '../../../../../superTokens.js';
import UserContextWrapper from '../../../../../usercontext/userContextWrapper.js';
import GeneralError from '../../../../emailpassword/components/library/generalError.js';
import { ThemeBase } from '../themeBase.js';
import { AuthPageComponentList } from './authPageComponentList.js';
import { AuthPageFooter } from './authPageFooter.js';
import { AuthPageHeader } from './authPageHeader.js';

function AuthPageTheme(props) {
    if (props.fullPageCompWithPreloadedInfo) {
        return (jsx(Fragment, { children: props.fullPageCompWithPreloadedInfo.component(__assign(__assign({}, props), { preloadInfo: props.fullPageCompWithPreloadedInfo.preloadInfo, showBackButton: props.showBackButton })) }));
    }
    return (jsxs("div", __assign({ "data-supertokens": "container authPage ".concat(props.factorIds.length > 1 ? "multiFactor" : "singleFactor") }, { children: [jsxs("div", __assign({ "data-supertokens": "row" }, { children: [jsx(AuthPageHeader, { factorIds: props.factorIds, isSignUp: props.isSignUp, onSignInUpSwitcherClick: props.onSignInUpSwitcherClick, hasSeparateSignUpView: props.hasSeparateSignUpView, resetFactorList: props.resetFactorList, showBackButton: props.showBackButton, oauth2ClientInfo: props.oauth2ClientInfo }), props.error !== undefined && jsx(GeneralError, { error: props.error }), jsx(AuthPageComponentList, __assign({}, props)), jsx(AuthPageFooter, { factorIds: props.factorIds, isSignUp: props.isSignUp, hasSeparateSignUpView: props.hasSeparateSignUpView, privacyPolicyLink: props.privacyPolicyLink, termsOfServiceLink: props.termsOfServiceLink })] })), jsx(SuperTokensBranding, {})] })));
}
function AuthPageThemeWrapper(props) {
    var rootStyle = SuperTokens.getInstanceOrThrow().rootStyle;
    return (jsx(UserContextWrapper, __assign({ userContext: props.userContext }, { children: jsx(ThemeBase, __assign({ userStyles: [rootStyle] }, { children: jsx(AuthPageTheme, __assign({}, props)) })) })));
}

export { AuthPageTheme, AuthPageThemeWrapper as default };
