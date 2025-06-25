import { __assign, __rest } from "../../../../../../../_virtual/_tslib.js";
import { jsx, jsxs } from "react/jsx-runtime";
import React__default from "react";
import { SuperTokensBranding } from "../../../../../components/SuperTokensBranding.js";
import SuperTokens from "../../../../../superTokens.js";
import { useTranslation } from "../../../../../translation/translationContext.js";
import UserContextWrapper from "../../../../../usercontext/userContextWrapper.js";
import GeneralError from "../../../../emailpassword/components/library/generalError.js";
import { AccessDeniedScreen } from "../../../../../../../sessionprebuiltui.js";
import { EmailForm } from "../signInUp/emailForm.js";
import { PhoneForm } from "../signInUp/phoneForm.js";
import { ThemeBase } from "../themeBase.js";
import { UserInputCodeForm } from "../userInputCodeForm/userInputCodeFormScreen.js";
import { LoadingScreen } from "./loadingScreen.js";
import { MFAFooter } from "./mfaFooter.js";
import { MFAHeader } from "./mfaHeader.js";
import { MFAOTPFooter } from "./mfaOTPFooter.js";
import { MFAOTPHeader } from "./mfaOTPHeader.js";

var MFAScreens;
(function (MFAScreens) {
    MFAScreens[(MFAScreens["CloseTab"] = 0)] = "CloseTab";
    MFAScreens[(MFAScreens["EmailForm"] = 1)] = "EmailForm";
    MFAScreens[(MFAScreens["PhoneForm"] = 2)] = "PhoneForm";
    MFAScreens[(MFAScreens["UserInputCodeForm"] = 3)] = "UserInputCodeForm";
    MFAScreens[(MFAScreens["AccessDenied"] = 4)] = "AccessDenied";
})(MFAScreens || (MFAScreens = {}));
var MFATheme = function (_a) {
    var activeScreen = _a.activeScreen,
        featureState = _a.featureState,
        onBackButtonClicked = _a.onBackButtonClicked,
        props = __rest(_a, ["activeScreen", "featureState", "onBackButtonClicked"]);
    var t = useTranslation();
    var commonProps = {
        recipeImplementation: props.recipeImplementation,
        config: props.config,
        clearError: function () {
            return props.dispatch({ type: "setError", showAccessDenied: false, error: undefined });
        },
        onError: function (error) {
            return props.dispatch({ type: "setError", showAccessDenied: false, error: error });
        },
        onFetchError: props.onFetchError,
        error: featureState.error,
        validatePhoneNumber: props.validatePhoneNumber,
    };
    if (!featureState.loaded) {
        return jsx(LoadingScreen, {});
    }
    return activeScreen === MFAScreens.AccessDenied
        ? jsx(AccessDeniedScreen, {
              useShadowDom: false /* We set this to false, because we are already inside a shadowDom (if required) */,
              error: t(featureState.error),
          })
        : jsxs(
              "div",
              __assign(
                  { "data-supertokens": "container pwless-mfa" },
                  {
                      children: [
                          jsx(
                              "div",
                              __assign(
                                  { "data-supertokens": "row" },
                                  {
                                      children: jsxs(React__default.Fragment, {
                                          children: [
                                              activeScreen === MFAScreens.UserInputCodeForm
                                                  ? jsx(
                                                        MFAOTPHeader,
                                                        __assign({}, commonProps, {
                                                            showBackButton: featureState.showBackButton,
                                                            loginAttemptInfo: featureState.loginAttemptInfo,
                                                            canChangeEmail: featureState.canChangeEmail,
                                                            onBackButtonClicked: onBackButtonClicked,
                                                        })
                                                    )
                                                  : jsx(
                                                        MFAHeader,
                                                        __assign({}, commonProps, {
                                                            showBackButton: featureState.showBackButton,
                                                            onBackButtonClicked: onBackButtonClicked,
                                                            contactMethod:
                                                                activeScreen === MFAScreens.EmailForm
                                                                    ? "EMAIL"
                                                                    : "PHONE",
                                                        })
                                                    ),
                                              featureState.error !== undefined &&
                                                  jsx(GeneralError, { error: featureState.error }),
                                              activeScreen === MFAScreens.EmailForm
                                                  ? jsx(
                                                        EmailForm,
                                                        __assign({}, commonProps, {
                                                            footer: jsx(
                                                                MFAFooter,
                                                                __assign({}, commonProps, {
                                                                    onSignOutClicked: props.onSignOutClicked,
                                                                    canChangeEmail: featureState.canChangeEmail,
                                                                })
                                                            ),
                                                        })
                                                    )
                                                  : activeScreen === MFAScreens.PhoneForm
                                                  ? jsx(
                                                        PhoneForm,
                                                        __assign({}, commonProps, {
                                                            footer: jsx(
                                                                MFAFooter,
                                                                __assign({}, commonProps, {
                                                                    onSignOutClicked: props.onSignOutClicked,
                                                                    canChangeEmail: featureState.canChangeEmail,
                                                                })
                                                            ),
                                                        })
                                                    )
                                                  : activeScreen === MFAScreens.UserInputCodeForm
                                                  ? jsx(
                                                        UserInputCodeForm,
                                                        __assign({}, commonProps, {
                                                            loginAttemptInfo: featureState.loginAttemptInfo,
                                                            onSuccess: props.onSuccess,
                                                            footer: jsx(
                                                                MFAOTPFooter,
                                                                __assign({}, commonProps, {
                                                                    onSignOutClicked: props.onSignOutClicked,
                                                                    canChangeEmail: featureState.canChangeEmail,
                                                                    loginAttemptInfo: featureState.loginAttemptInfo,
                                                                })
                                                            ),
                                                        })
                                                    )
                                                  : null,
                                          ],
                                      }),
                                  }
                              )
                          ),
                          jsx(SuperTokensBranding, {}),
                      ],
                  }
              )
          );
};
function MFAThemeWrapper(props) {
    var rootStyle = SuperTokens.getInstanceOrThrow().rootStyle;
    var activeScreen = getActiveScreen(props);
    var activeStyle;
    if (activeScreen === MFAScreens.UserInputCodeForm) {
        activeStyle = props.config.signInUpFeature.userInputCodeFormStyle;
    } else if (activeScreen === MFAScreens.EmailForm) {
        activeStyle = props.config.signInUpFeature.emailOrPhoneFormStyle;
    } else if (activeScreen === MFAScreens.PhoneForm) {
        activeStyle = props.config.signInUpFeature.emailOrPhoneFormStyle;
    } else {
        activeStyle = ""; // styling the access denied screen is handled through the session recipe
    }
    return jsx(
        UserContextWrapper,
        __assign(
            { userContext: props.userContext },
            {
                children: jsx(
                    ThemeBase,
                    __assign(
                        {
                            userStyles: [
                                rootStyle,
                                props.config.recipeRootStyle,
                                activeStyle,
                                props.config.mfaFeature.style,
                            ],
                        },
                        { children: jsx(MFATheme, __assign({}, props, { activeScreen: activeScreen })) }
                    )
                ),
            }
        )
    );
}
function getActiveScreen(props) {
    if (props.featureState.showAccessDenied) {
        return MFAScreens.AccessDenied;
    } else if (props.featureState.loginAttemptInfo) {
        return MFAScreens.UserInputCodeForm;
    } else if (props.contactMethod === "EMAIL") {
        return MFAScreens.EmailForm;
    } else if (props.contactMethod === "PHONE") {
        return MFAScreens.PhoneForm;
    }
    throw new Error("Couldn't choose active screen; Should never happen");
}

export { MFAScreens, MFAThemeWrapper as default, getActiveScreen };
