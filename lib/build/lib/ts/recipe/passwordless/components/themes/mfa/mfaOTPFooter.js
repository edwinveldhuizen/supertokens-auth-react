import { __assign } from '../../../../../../../_virtual/_tslib.js';
import { jsxs, jsx } from 'react/jsx-runtime';
import ArrowLeftIcon from '../../../../../components/assets/arrowLeftIcon.js';
import { withOverride } from '../../../../../components/componentOverride/withOverride.js';
import { useTranslation } from '../../../../../translation/translationContext.js';
import { useUserContext } from '../../../../../usercontext/index.js';

var MFAOTPFooter = withOverride("PasswordlessMFAOTPFooter", function PasswordlessMFAOTPFooter(_a) {
    var loginAttemptInfo = _a.loginAttemptInfo, recipeImplementation = _a.recipeImplementation, onSignOutClicked = _a.onSignOutClicked, canChangeEmail = _a.canChangeEmail;
    var t = useTranslation();
    var userContext = useUserContext();
    return (jsxs("div", __assign({ "data-supertokens": "footerLinkGroupVert pwless-mfa otpFooter" }, { children: [canChangeEmail && (jsx("div", __assign({ "data-supertokens": "secondaryText", onClick: function () {
                    return recipeImplementation.clearLoginAttemptInfo({
                        userContext: userContext,
                    });
                } }, { children: loginAttemptInfo.contactMethod === "EMAIL"
                    ? t("PWLESS_SIGN_IN_UP_CHANGE_CONTACT_INFO_EMAIL")
                    : t("PWLESS_SIGN_IN_UP_CHANGE_CONTACT_INFO_PHONE") }))), jsxs("div", __assign({ "data-supertokens": "secondaryText secondaryLinkWithLeftArrow", onClick: onSignOutClicked }, { children: [jsx(ArrowLeftIcon, { color: "rgb(var(--palette-textPrimary))" }), t("PWLESS_MFA_FOOTER_LOGOUT")] }))] })));
});

export { MFAOTPFooter };
