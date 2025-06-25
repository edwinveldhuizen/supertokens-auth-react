import { __assign } from '../../../_virtual/_tslib.js';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useTranslation } from '../translation/translationContext.js';

function SuperTokensBranding() {
    var t = useTranslation();
    return (jsxs("a", __assign({ "data-supertokens": "superTokensBranding", href: "https://supertokens.com?utm_campaign=poweredby", target: "_blank" }, { children: [t("BRANDING_POWERED_BY_START"), jsx("strong", { children: "SuperTokens" }), t("BRANDING_POWERED_BY_END")] })));
}

export { SuperTokensBranding };
