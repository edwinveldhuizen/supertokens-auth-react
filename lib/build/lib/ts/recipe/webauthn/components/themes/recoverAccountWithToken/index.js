import { __awaiter, __generator, __assign } from "../../../../../../../_virtual/_tslib.js";
import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { SuperTokensBranding } from "../../../../../components/SuperTokensBranding.js";
import SuperTokens from "../../../../../superTokens.js";
import "../../../../../../../ui-entry.js";
import { useUserContext } from "../../../../../usercontext/index.js";
import UserContextWrapper from "../../../../../usercontext/userContextWrapper.js";
import { RecoverAccountScreen } from "../../../types.js";
import { PasskeyConfirmation } from "../signUp/confirmation.js";
import { ThemeBase } from "../themeBase.js";
import { PasskeyRecoverAccountSuccess } from "./success.js";
import { AuthPageHeader } from "../../../../authRecipe/components/theme/authPage/authPageHeader.js";
import { AuthPageFooter } from "../../../../authRecipe/components/theme/authPage/authPageFooter.js";

function PasskeyRecoverAccountWithTokenTheme(props) {
    var _this = this;
    var stInstance = SuperTokens.getInstanceOrThrow();
    var rootStyle = stInstance.rootStyle;
    var userContext = useUserContext();
    var activeStyle = props.config.signInAndUpFeature.style;
    var privacyPolicyLink = stInstance.privacyPolicyLink;
    var termsOfServiceLink = stInstance.termsOfServiceLink;
    var onResetFactorList = function () {
        throw new Error("Should never come here as we don't have back functionality");
    };
    var _a = useState(false),
        isPasskeySupported = _a[0],
        setIsPasskeySupported = _a[1];
    useEffect(
        function () {
            void (function () {
                return __awaiter(_this, void 0, void 0, function () {
                    var browserSupportsWebauthn;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                return [
                                    4 /*yield*/,
                                    props.recipeImplementation.doesBrowserSupportWebAuthn({
                                        userContext: userContext,
                                    }),
                                ];
                            case 1:
                                browserSupportsWebauthn = _a.sent();
                                if (browserSupportsWebauthn.status !== "OK") {
                                    console.error(browserSupportsWebauthn.error);
                                    return [2 /*return*/];
                                }
                                setIsPasskeySupported(browserSupportsWebauthn.browserSupportsWebauthn);
                                return [2 /*return*/];
                        }
                    });
                });
            })();
        },
        [props.recipeImplementation]
    );
    // Render the inner content based on the active screen
    var renderInnerContent = function () {
        var _a;
        if (props.activeScreen === RecoverAccountScreen.ContinueWithPasskey) {
            return jsx(
                PasskeyConfirmation,
                __assign({}, props, {
                    email:
                        ((_a = props.registerOptions) === null || _a === void 0 ? void 0 : _a.user.name) || undefined,
                    onContinueClick: props.onContinueClick,
                    errorMessageLabel: props.errorMessageLabel || undefined,
                    isLoading: props.isLoading,
                    hideContinueWithoutPasskey: true,
                    isContinueDisabled: props.registerOptions === null,
                    isPasskeySupported: isPasskeySupported,
                    showBackButton: false,
                })
            );
        } else if (props.activeScreen === RecoverAccountScreen.Success) {
            return jsx(PasskeyRecoverAccountSuccess, {});
        }
        return null;
    };
    return jsx(
        UserContextWrapper,
        __assign(
            { userContext: props.userContext },
            {
                children: jsx(
                    ThemeBase,
                    __assign(
                        { userStyles: [rootStyle, props.config.recipeRootStyle, activeStyle] },
                        {
                            children: jsxs(
                                "div",
                                __assign(
                                    { "data-supertokens": "container authPage singleFactor" },
                                    {
                                        children: [
                                            jsxs(
                                                "div",
                                                __assign(
                                                    { "data-supertokens": "row" },
                                                    {
                                                        children: [
                                                            props.activeScreen !== RecoverAccountScreen.Success &&
                                                                jsx(AuthPageHeader, {
                                                                    factorIds: ["webauthn"],
                                                                    isSignUp: true,
                                                                    onSignInUpSwitcherClick: undefined,
                                                                    hasSeparateSignUpView: true,
                                                                    resetFactorList: onResetFactorList,
                                                                    showBackButton: false,
                                                                    oauth2ClientInfo: undefined,
                                                                    headerLabel:
                                                                        props.activeScreen ===
                                                                        RecoverAccountScreen.ContinueWithPasskey
                                                                            ? "WEBAUTHN_CREATE_A_PASSKEY_HEADER"
                                                                            : undefined,
                                                                    hideSignInSwitcher: true,
                                                                }),
                                                            renderInnerContent(),
                                                            props.activeScreen !== RecoverAccountScreen.Success &&
                                                                jsx(AuthPageFooter, {
                                                                    factorIds: [],
                                                                    isSignUp: true,
                                                                    hasSeparateSignUpView: true,
                                                                    privacyPolicyLink: privacyPolicyLink,
                                                                    termsOfServiceLink: termsOfServiceLink,
                                                                }),
                                                        ],
                                                    }
                                                )
                                            ),
                                            jsx(SuperTokensBranding, {}),
                                        ],
                                    }
                                )
                            ),
                        }
                    )
                ),
            }
        )
    );
}

export { PasskeyRecoverAccountWithTokenTheme as default };
