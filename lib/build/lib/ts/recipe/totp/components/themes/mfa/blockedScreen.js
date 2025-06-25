import { __assign } from '../../../../../../../_virtual/_tslib.js';
import { jsx, jsxs } from 'react/jsx-runtime';
import ArrowLeftIcon from '../../../../../components/assets/arrowLeftIcon.js';
import { BlockedIcon } from '../../../../../components/assets/blockedIcon.js';
import { withOverride } from '../../../../../components/componentOverride/withOverride.js';
import { useTranslation } from '../../../../../translation/translationContext.js';
import '../../../../../../../index.js';
import FormRow from '../../../../emailpassword/components/library/formRow.js';
import 'react';
import { RetryButton } from './retryButton.js';

var TOTPBlockedScreen = function (props) {
    var t = useTranslation();
    return (jsx("div", __assign({ "data-supertokens": "container totp-mfa blockedScreen" }, { children: jsxs("div", __assign({ "data-supertokens": "row noFormRow" }, { children: [jsx(BlockedIcon, {}), jsx("div", __assign({ "data-supertokens": "headerTitle" }, { children: t("TOTP_BLOCKED_TITLE") })), jsx("div", __assign({ "data-supertokens": "headerSubtitle secondaryText" }, { children: t("TOTP_BLOCKED_SUBTITLE") })), jsx("div", { "data-supertokens": "divider" }), jsx(FormRow, { children: jsx(RetryButton, { nextRetryAt: props.nextRetryAt, onClick: props.onRetry }) }, "form-button"), jsxs("div", __assign({ "data-supertokens": "secondaryText secondaryLinkWithLeftArrow", onClick: props.onSignOutClicked }, { children: [jsx(ArrowLeftIcon, { color: "rgb(var(--palette-textPrimary))" }), t("TOTP_MFA_LOGOUT")] }))] })) })));
};
var BlockedScreen = withOverride("TOTPBlockedScreen", TOTPBlockedScreen);

export { BlockedScreen };
