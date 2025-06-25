import { __assign } from '../../../../../../../_virtual/_tslib.js';
import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import LogoutIcon from '../../../../../components/assets/logoutIcon.js';
import { withOverride } from '../../../../../components/componentOverride/withOverride.js';
import { useTranslation } from '../../../../../translation/translationContext.js';
import Button from '../../../../emailpassword/components/library/button.js';
import 'react';
import '../../../../../../../index.js';

var OAuth2LogoutScreenInner = withOverride("OAuth2LogoutScreenInner", function OAuth2LogoutScreenInner(props) {
    var t = useTranslation();
    return (jsxs(Fragment, { children: [jsx(LogoutIcon, {}), jsx("div", __assign({ "data-supertokens": "headerTitle" }, { children: t("LOGGING_OUT") })), jsx("div", __assign({ "data-supertokens": "headerSubtitle" }, { children: t("LOGOUT_CONFIRMATION") })), jsx("div", { "data-supertokens": "divider" }), jsx(Button, { disabled: props.isLoggingOut, isLoading: props.isLoggingOut, type: "button", label: t("LOGOUT"), onClick: props.onLogoutClicked })] }));
});

export { OAuth2LogoutScreenInner };
