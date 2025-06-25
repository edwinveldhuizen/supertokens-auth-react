import { __assign } from '../../../../../../../_virtual/_tslib.js';
import { jsxs, jsx } from 'react/jsx-runtime';
import PasskeyIcon from '../../../../../components/assets/passkeyIcon.js';
import { withOverride } from '../../../../../components/componentOverride/withOverride.js';
import SuperTokens from '../../../../../superTokens.js';
import Button from '../../../../emailpassword/components/library/button.js';
import 'react';
import '../../../../../../../index.js';
import '../../../../../translation/translationContext.js';
import { PasskeyNotSupportedError } from '../error/passkeyNotSupportedError.js';
import { ThemeBase } from '../themeBase.js';

var ContinueWithPasskey = function (_a) {
    var continueWithPasskeyClicked = _a.continueWithPasskeyClicked, isLoading = _a.isLoading, isPasskeySupported = _a.isPasskeySupported;
    return (jsxs("div", __assign({ "data-supertokens": "continueWithPasskeyButtonWrapper" }, { children: [jsx(Button, { isLoading: isLoading, onClick: function () {
                    continueWithPasskeyClicked();
                }, type: "button", label: "WEBAUTHN_COMBO_CONTINUE_WITH_PASSKEY_BUTTON", disabled: !isPasskeySupported, isGreyedOut: !isPasskeySupported, icon: PasskeyIcon }), !isPasskeySupported && jsx(PasskeyNotSupportedError, {})] })));
};
var ContinueWithPasskeyWithOverride = withOverride("WebauthnContinueWithPasskey", ContinueWithPasskey);
var ContinueWithPasskeyTheme = function (props) {
    var rootStyle = SuperTokens.getInstanceOrThrow().rootStyle;
    return (jsx(ThemeBase, __assign({ userStyles: [rootStyle, props.config.recipeRootStyle] }, { children: jsx(ContinueWithPasskeyWithOverride, __assign({}, props)) })));
};

export { ContinueWithPasskeyTheme, ContinueWithPasskeyWithOverride };
