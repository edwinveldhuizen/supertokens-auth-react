import { __assign } from '../../../../../../../_virtual/_tslib.js';
import { jsx, jsxs } from 'react/jsx-runtime';
import ArrowLeftIcon from '../../../../../components/assets/arrowLeftIcon.js';
import { withOverride } from '../../../../../components/componentOverride/withOverride.js';
import { useTranslation } from '../../../../../translation/translationContext.js';

var FactorChooserFooter = withOverride("MFAFactorChooserFooter", function MFAChooserFooter(_a) {
    var logout = _a.logout;
    var t = useTranslation();
    return (jsx("div", __assign({ "data-supertokens": "row factorChooserFooter" }, { children: jsxs("div", __assign({ "data-supertokens": "secondaryText secondaryLinkWithLeftArrow", onClick: logout }, { children: [jsx(ArrowLeftIcon, { color: "rgb(var(--palette-textPrimary))" }), t("MULTI_FACTOR_AUTH_LOGOUT")] })) })));
});

export { FactorChooserFooter };
