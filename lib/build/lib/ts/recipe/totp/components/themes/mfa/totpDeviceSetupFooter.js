import { __assign } from '../../../../../../../_virtual/_tslib.js';
import { jsx, jsxs } from 'react/jsx-runtime';
import ArrowLeftIcon from '../../../../../components/assets/arrowLeftIcon.js';
import { withOverride } from '../../../../../components/componentOverride/withOverride.js';
import { useTranslation } from '../../../../../translation/translationContext.js';

var DeviceSetupFooter = withOverride("TOTPDeviceSetupFooter", function TOTPDeviceSetupFooter(_a) {
    var onSignOutClicked = _a.onSignOutClicked;
    var t = useTranslation();
    return (jsx("div", __assign({ "data-supertokens": "footerLinkGroupVert totp-mfa deviceSetupFooter" }, { children: jsxs("div", __assign({ "data-supertokens": "secondaryText secondaryLinkWithLeftArrow", onClick: onSignOutClicked }, { children: [jsx(ArrowLeftIcon, { color: "rgb(var(--palette-textPrimary))" }), t("TOTP_MFA_LOGOUT")] })) })));
});

export { DeviceSetupFooter };
