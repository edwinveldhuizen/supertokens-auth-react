import { __assign } from '../../../../../../../_virtual/_tslib.js';
import { jsxs, jsx } from 'react/jsx-runtime';
import { Fragment } from 'react';
import { withOverride } from '../../../../../components/componentOverride/withOverride.js';
import { useTranslation } from '../../../../../translation/translationContext.js';
import BackButton from '../../../../emailpassword/components/library/backButton.js';

var MFAOTPHeader = withOverride("PasswordlessMFAOTPHeader", function PasswordlessMFAOTPHeader(_a) {
    var showBackButton = _a.showBackButton, loginAttemptInfo = _a.loginAttemptInfo, onBackButtonClicked = _a.onBackButtonClicked, canChangeEmail = _a.canChangeEmail;
    var t = useTranslation();
    return (jsxs(Fragment, { children: [jsxs("div", __assign({ "data-supertokens": "headerTitle withBackButton pwless-mfa otpHeader" }, { children: [showBackButton && canChangeEmail === false ? (jsx(BackButton, { onClick: onBackButtonClicked })) : (jsx("span", { "data-supertokens": "backButtonPlaceholder backButtonCommon" })), t("PWLESS_USER_INPUT_CODE_HEADER_TITLE"), jsx("span", { "data-supertokens": "backButtonPlaceholder backButtonCommon" })] })), jsxs("div", __assign({ "data-supertokens": "headerSubtitle secondaryText" }, { children: [loginAttemptInfo.flowType === "USER_INPUT_CODE"
                        ? t("PWLESS_USER_INPUT_CODE_HEADER_SUBTITLE")
                        : t("PWLESS_USER_INPUT_CODE_HEADER_SUBTITLE_LINK"), jsx("br", {}), jsx("strong", { children: loginAttemptInfo.contactInfo })] })), jsx("div", { "data-supertokens": "divider" })] }));
});

export { MFAOTPHeader };
