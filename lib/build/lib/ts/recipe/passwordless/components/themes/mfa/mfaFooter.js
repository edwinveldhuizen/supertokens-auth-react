import { __assign } from '../../../../../../../_virtual/_tslib.js';
import { jsx, jsxs } from 'react/jsx-runtime';
import ArrowLeftIcon from '../../../../../components/assets/arrowLeftIcon.js';
import { withOverride } from '../../../../../components/componentOverride/withOverride.js';
import { useTranslation } from '../../../../../translation/translationContext.js';

var MFAFooter = withOverride("PasswordlessMFAFooter", function PasswordlessMFAFooter(props) {
    var t = useTranslation();
    return (jsx("div", __assign({ "data-supertokens": "footerLinkGroupVert pwless-mfa footer" }, { children: jsxs("div", __assign({ "data-supertokens": "secondaryText secondaryLinkWithLeftArrow", onClick: props.onSignOutClicked }, { children: [jsx(ArrowLeftIcon, { color: "rgb(var(--palette-textPrimary))" }), t("PWLESS_MFA_FOOTER_LOGOUT")] })) })));
});

export { MFAFooter };
