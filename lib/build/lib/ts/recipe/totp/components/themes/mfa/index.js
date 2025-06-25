import { __assign, __rest } from '../../../../../../../_virtual/_tslib.js';
import { jsx, jsxs } from 'react/jsx-runtime';
import React__default from 'react';
import { SuperTokensBranding } from '../../../../../components/SuperTokensBranding.js';
import SuperTokens from '../../../../../superTokens.js';
import { useTranslation } from '../../../../../translation/translationContext.js';
import UserContextWrapper from '../../../../../usercontext/userContextWrapper.js';
import GeneralError from '../../../../emailpassword/components/library/generalError.js';
import { AccessDeniedScreen } from '../../../../../../../sessionprebuiltui.js';
import { ThemeBase } from '../themeBase.js';
import { BlockedScreen } from './blockedScreen.js';
import { LoadingScreen } from './loadingScreen.js';
import { CodeForm } from './totpCodeForm.js';
import { CodeVerificationFooter } from './totpCodeVerificationFooter.js';
import { CodeVerificationHeader } from './totpCodeVerificationHeader.js';
import { DeviceInfoSection } from './totpDeviceInfoSection.js';
import { DeviceSetupFooter } from './totpDeviceSetupFooter.js';
import { DeviceSetupHeader } from './totpDeviceSetupHeader.js';

var TOTPMFAScreens;
(function (TOTPMFAScreens) {
    TOTPMFAScreens[TOTPMFAScreens["DeviceSetup"] = 0] = "DeviceSetup";
    TOTPMFAScreens[TOTPMFAScreens["CodeVerification"] = 1] = "CodeVerification";
    TOTPMFAScreens[TOTPMFAScreens["Loading"] = 2] = "Loading";
    TOTPMFAScreens[TOTPMFAScreens["Blocked"] = 3] = "Blocked";
    TOTPMFAScreens[TOTPMFAScreens["AccessDenied"] = 4] = "AccessDenied";
})(TOTPMFAScreens || (TOTPMFAScreens = {}));
var TOTPMFATheme = function (_a) {
    var activeScreen = _a.activeScreen, featureState = _a.featureState, props = __rest(_a, ["activeScreen", "featureState"]);
    var t = useTranslation();
    var commonProps = {
        featureState: featureState,
        recipeImplementation: props.recipeImplementation,
        config: props.config,
        clearError: function () { return props.dispatch({ type: "setError", showAccessDenied: false, error: undefined }); },
        onError: function (error) { return props.dispatch({ type: "setError", showAccessDenied: false, error: error }); },
    };
    return activeScreen === TOTPMFAScreens.Blocked ? (jsx(BlockedScreen, { nextRetryAt: featureState.nextRetryAt, onRetry: props.onRetryClicked, onSignOutClicked: props.onSignOutClicked })) : activeScreen === TOTPMFAScreens.AccessDenied ? (jsx(AccessDeniedScreen, { error: t(featureState.error), useShadowDom: false /* We set this to false, because we are already inside a shadowDom (if required) */ })) : activeScreen === TOTPMFAScreens.Loading ? (jsx(LoadingScreen, {})) : (jsxs("div", __assign({ "data-supertokens": "container totp-mfa" }, { children: [jsx("div", __assign({ "data-supertokens": "row" }, { children: featureState.loaded && (jsxs(React__default.Fragment, { children: [activeScreen === TOTPMFAScreens.DeviceSetup ? (jsx(DeviceSetupHeader, __assign({}, commonProps, { showBackButton: featureState.showBackButton, onBackButtonClicked: props.onBackButtonClicked }))) : (jsx(CodeVerificationHeader, __assign({}, commonProps, { showBackButton: featureState.showBackButton, onBackButtonClicked: props.onBackButtonClicked }))), activeScreen === TOTPMFAScreens.DeviceSetup && (jsx(DeviceInfoSection, __assign({}, commonProps, { deviceInfo: featureState.deviceInfo, showSecret: featureState.showSecret, onShowSecretClicked: props.onShowSecretClicked }))), featureState.error !== undefined && (jsx(GeneralError, { error: getErrorString(featureState.error, featureState, t) })), jsx(CodeForm, __assign({}, commonProps, { onSuccess: props.onSuccess, footer: activeScreen === TOTPMFAScreens.DeviceSetup ? (jsx(DeviceSetupFooter, __assign({}, commonProps, { onSignOutClicked: props.onSignOutClicked }))) : (jsx(CodeVerificationFooter, __assign({}, commonProps, { onSignOutClicked: props.onSignOutClicked }))) }))] })) })), jsx(SuperTokensBranding, {})] })));
};
function TOTPMFAThemeWrapper(props) {
    var rootStyle = SuperTokens.getInstanceOrThrow().rootStyle;
    var activeScreen = getActiveScreen(props);
    var activeStyle;
    if (activeScreen === TOTPMFAScreens.Blocked) {
        activeStyle = props.config.totpMFAScreen.blockedScreenStyle;
    }
    else if (activeScreen === TOTPMFAScreens.Loading) {
        activeStyle = props.config.totpMFAScreen.loadingScreenStyle;
    }
    else if (activeScreen === TOTPMFAScreens.DeviceSetup) {
        activeStyle = props.config.totpMFAScreen.setupScreenStyle;
    }
    else if (activeScreen === TOTPMFAScreens.CodeVerification) {
        activeStyle = props.config.totpMFAScreen.verificationScreenStyle;
    }
    return (jsx(UserContextWrapper, __assign({ userContext: props.userContext }, { children: jsx(ThemeBase, __assign({ userStyles: [rootStyle, props.config.recipeRootStyle, activeStyle] }, { children: jsx(TOTPMFATheme, __assign({}, props, { activeScreen: activeScreen })) })) })));
}
function getActiveScreen(props) {
    if (props.featureState.isBlocked) {
        return TOTPMFAScreens.Blocked;
    }
    else if (props.featureState.loaded === false) {
        return TOTPMFAScreens.Loading;
    }
    else if (props.featureState.showAccessDenied) {
        return TOTPMFAScreens.AccessDenied;
    }
    else if (props.featureState.deviceInfo) {
        return TOTPMFAScreens.DeviceSetup;
    }
    else {
        return TOTPMFAScreens.CodeVerification;
    }
}
function getErrorString(error, state, t) {
    if (error !== "ERROR_TOTP_INVALID_CODE") {
        return error;
    }
    return (t(error) +
        " " +
        t("ERROR_TOTP_INVALID_CODE_RETRY_START") +
        (state.maxAttemptCount - state.currAttemptCount + 1) +
        t("ERROR_TOTP_INVALID_CODE_RETRY_END"));
}

export { TOTPMFAScreens, TOTPMFAThemeWrapper as default, getActiveScreen };
