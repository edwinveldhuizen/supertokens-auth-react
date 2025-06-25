import { __assign } from '../../../../../../../_virtual/_tslib.js';
import { jsx, jsxs } from 'react/jsx-runtime';
import { SuperTokensBranding } from '../../../../../components/SuperTokensBranding.js';
import SuperTokens from '../../../../../superTokens.js';
import DynamicLoginMethodsSpinner from '../../../../multitenancy/components/features/dynamicLoginMethodsSpinner/index.js';
import { ThemeBase } from '../themeBase.js';
import { OAuth2LogoutScreenInner } from './OAuth2LogoutScreenInner.js';

var OAuth2LogoutScreen = function (props) {
    if (props.showSpinner) {
        return jsx(DynamicLoginMethodsSpinner, {});
    }
    return (jsxs("div", __assign({ "data-supertokens": "oauth2Logout container" }, { children: [jsx("div", __assign({ "data-supertokens": "row" }, { children: jsx(OAuth2LogoutScreenInner, { isLoggingOut: props.isLoggingOut, onLogoutClicked: props.onLogoutClicked }) })), jsx(SuperTokensBranding, {})] })));
};
var OAuth2LogoutScreenTheme = function (props) {
    var rootStyle = SuperTokens.getInstanceOrThrow().rootStyle;
    return (jsx(ThemeBase, __assign({ userStyles: [rootStyle, props.config.recipeRootStyle, props.config.oauth2LogoutScreen.style] }, { children: jsx(OAuth2LogoutScreen, __assign({}, props)) })));
};

export { OAuth2LogoutScreenTheme };
