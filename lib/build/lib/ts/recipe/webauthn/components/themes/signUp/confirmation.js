import { __assign } from "../../../../../../../_virtual/_tslib.js";
import { jsxs, jsx } from "react/jsx-runtime";
import { useMemo } from "react";
import { withOverride } from "../../../../../components/componentOverride/withOverride.js";
import { useTranslation } from "../../../../../translation/translationContext.js";
import Button from "../../../../emailpassword/components/library/button.js";
import GeneralError from "../../../../emailpassword/components/library/generalError.js";
import { PasskeyNotSupportedError } from "../error/passkeyNotSupportedError.js";
import { ContinueWithoutPasskey } from "./continueWithoutPasskey.js";
import { PasskeyFeatureBlockList } from "./featureBlocks.js";

var PasskeyConfirmation = withOverride("WebauthnPasskeyConfirmation", function PasskeyConfirmation(props) {
    var t = useTranslation();
    var showContinueWithoutPasskey = useMemo(
        function () {
            return props.hideContinueWithoutPasskey !== true && props.showBackButton === true;
        },
        [props]
    );
    return jsxs(
        "div",
        __assign(
            { "data-supertokens": "passkeyConfirmationContainer" },
            {
                children: [
                    props.email !== undefined &&
                        jsxs(
                            "div",
                            __assign(
                                { "data-supertokens": "passkeyConfirmationEmailContainer" },
                                {
                                    children: [
                                        jsx(
                                            "div",
                                            __assign(
                                                { "data-supertokens": "continueWithLabel" },
                                                { children: t("WEBAUTHN_CONTINUE_WITH_EMAIL_SUBTEXT") }
                                            )
                                        ),
                                        jsx(
                                            "div",
                                            __assign(
                                                { "data-supertokens": "enteredEmailId" },
                                                { children: props.email }
                                            )
                                        ),
                                    ],
                                }
                            )
                        ),
                    jsx(PasskeyFeatureBlockList, {}),
                    props.errorMessageLabel !== undefined &&
                        props.errorMessageLabel !== "" &&
                        jsx(GeneralError, { error: props.errorMessageLabel }),
                    jsxs(
                        "div",
                        __assign(
                            { "data-supertokens": "passkeyConfirmationFooter" },
                            {
                                children: [
                                    jsx(Button, {
                                        disabled: props.isContinueDisabled || !props.isPasskeySupported,
                                        isLoading: props.isLoading,
                                        type: "button",
                                        onClick: props.onContinueClick,
                                        label: "WEBAUTHN_EMAIL_CONTINUE_BUTTON",
                                        isGreyedOut: !props.isPasskeySupported,
                                    }),
                                    !props.isPasskeySupported && jsx(PasskeyNotSupportedError, {}),
                                    showContinueWithoutPasskey &&
                                        props.resetFactorList !== undefined &&
                                        jsx(ContinueWithoutPasskey, { onClick: props.resetFactorList }),
                                ],
                            }
                        )
                    ),
                ],
            }
        )
    );
});

export { PasskeyConfirmation };
