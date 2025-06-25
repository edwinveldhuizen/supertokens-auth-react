import { __assign } from '../../../../../../../_virtual/_tslib.js';
import { jsxs, jsx } from 'react/jsx-runtime';
import { withOverride } from '../../../../../components/componentOverride/withOverride.js';
import { useTranslation } from '../../../../../translation/translationContext.js';

var AuthPageFooter = withOverride("AuthPageFooter", function AuthPageFooter(_a) {
    var hasSeparateSignUpView = _a.hasSeparateSignUpView, isSignUp = _a.isSignUp, termsOfServiceLink = _a.termsOfServiceLink, privacyPolicyLink = _a.privacyPolicyLink;
    var t = useTranslation();
    if (termsOfServiceLink === undefined && privacyPolicyLink === undefined) {
        return null;
    }
    if (hasSeparateSignUpView && !isSignUp) {
        return null;
    }
    return (jsxs("div", __assign({ "data-supertokens": "secondaryText privacyPolicyAndTermsAndConditions" }, { children: [t("AUTH_PAGE_FOOTER_START"), termsOfServiceLink !== undefined && (jsx("a", __assign({ "data-supertokens": "link", href: termsOfServiceLink, target: "_blank", rel: "noopener noreferer" }, { children: t("AUTH_PAGE_FOOTER_TOS") }))), termsOfServiceLink !== undefined && privacyPolicyLink !== undefined && t("AUTH_PAGE_FOOTER_AND"), privacyPolicyLink !== undefined && (jsx("a", __assign({ "data-supertokens": "link", href: privacyPolicyLink, target: "_blank", rel: "noopener noreferer" }, { children: t("AUTH_PAGE_FOOTER_PP") }))), t("AUTH_PAGE_FOOTER_END")] })));
});

export { AuthPageFooter };
