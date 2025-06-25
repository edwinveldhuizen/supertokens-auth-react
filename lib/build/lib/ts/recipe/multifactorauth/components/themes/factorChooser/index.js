import { __assign } from '../../../../../../../_virtual/_tslib.js';
import { jsx, jsxs } from 'react/jsx-runtime';
import { SuperTokensBranding } from '../../../../../components/SuperTokensBranding.js';
import SuperTokens from '../../../../../superTokens.js';
import { useTranslation } from '../../../../../translation/translationContext.js';
import UserContextWrapper from '../../../../../usercontext/userContextWrapper.js';
import { AccessDeniedScreen } from '../../../../../../../sessionprebuiltui.js';
import { ThemeBase } from '../themeBase.js';
import { FactorChooserFooter } from './factorChooserFooter.js';
import { FactorChooserHeader } from './factorChooserHeader.js';
import { FactorList } from './factorList.js';

function FactorChooserTheme(props) {
    var t = useTranslation();
    if (props.availableFactors.length === 0) {
        return (jsx(AccessDeniedScreen, { useShadowDom: false /* We set this to false, because we are already inside a shadowDom (if required) */, error: props.showBackButton ? t("MFA_NO_AVAILABLE_OPTIONS") : t("MFA_NO_AVAILABLE_OPTIONS_LOGIN") }));
    }
    return (jsxs("div", __assign({ "data-supertokens": "container mfa" }, { children: [jsx(FactorChooserHeader, { onBackButtonClicked: props.onBackButtonClicked, showBackButton: props.showBackButton }), jsx(FactorList, { availableFactors: props.availableFactors, navigateToFactor: props.navigateToFactor }), jsx(FactorChooserFooter, { logout: props.onLogoutClicked }), jsx(SuperTokensBranding, {})] })));
}
function FactorChooserThemeWrapper(props) {
    var rootStyle = SuperTokens.getInstanceOrThrow().rootStyle;
    return (jsx(UserContextWrapper, __assign({ userContext: props.userContext }, { children: jsx(ThemeBase, __assign({ userStyles: [rootStyle, props.config.recipeRootStyle, props.config.factorChooserScreen.style] }, { children: jsx(FactorChooserTheme, __assign({}, props)) })) })));
}

export { FactorChooserTheme, FactorChooserThemeWrapper as default };
