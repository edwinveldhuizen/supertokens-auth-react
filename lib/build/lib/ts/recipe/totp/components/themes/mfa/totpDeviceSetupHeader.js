import { __assign } from "../../../../../../../_virtual/_tslib.js";
import { jsxs, jsx } from "react/jsx-runtime";
import { Fragment } from "react";
import { withOverride } from "../../../../../components/componentOverride/withOverride.js";
import { useTranslation } from "../../../../../translation/translationContext.js";
import BackButton from "../../../../emailpassword/components/library/backButton.js";

var DeviceSetupHeader = withOverride("TOTPDeviceSetupHeader", function TOTPDeviceSetupHeader(props) {
    var t = useTranslation();
    return jsxs(Fragment, {
        children: [
            jsxs(
                "div",
                __assign(
                    { "data-supertokens": "headerTitle withBackButton totp-mfa deviceSetupHeader" },
                    {
                        children: [
                            props.showBackButton
                                ? jsx(BackButton, { onClick: props.onBackButtonClicked })
                                : jsx("span", { "data-supertokens": "backButtonPlaceholder backButtonCommon" }),
                            t("TOTP_DEVICE_SETUP_HEADER_TITLE"),
                            jsx("span", { "data-supertokens": "backButtonPlaceholder backButtonCommon" }),
                        ],
                    }
                )
            ),
            jsx(
                "div",
                __assign(
                    { "data-supertokens": "headerSubtitle secondaryText" },
                    { children: t("TOTP_DEVICE_SETUP_HEADER_SUBTITLE") }
                )
            ),
            jsx("div", { "data-supertokens": "divider" }),
        ],
    });
});

export { DeviceSetupHeader };
