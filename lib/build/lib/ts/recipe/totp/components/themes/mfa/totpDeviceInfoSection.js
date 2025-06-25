import { __assign } from "../../../../../../../_virtual/_tslib.js";
import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import _default from "../../../../../../../node_modules/react-qr-code/lib/index.js";
import { withOverride } from "../../../../../components/componentOverride/withOverride.js";
import { useTranslation } from "../../../../../translation/translationContext.js";

var DeviceInfoSection = withOverride("TOTPDeviceInfoSection", function TOTPDeviceInfoSection(props) {
    var t = useTranslation();
    return jsxs(Fragment, {
        children: [
            jsxs(
                "div",
                __assign(
                    { "data-supertokens": "totpDeviceInfoWithQR totp-mfa deviceInfoSection" },
                    {
                        children: [
                            jsx(_default, {
                                value: props.deviceInfo.qrCodeString,
                                "data-supertokens": "totpDeviceQR",
                                level: "L",
                            }),
                            jsxs(
                                "span",
                                __assign(
                                    { "data-supertokens": "showTOTPSecret" },
                                    {
                                        children: [
                                            t("TOTP_SHOW_SECRET_START"),
                                            jsx(
                                                "button",
                                                __assign(
                                                    {
                                                        type: "button",
                                                        onClick: props.onShowSecretClicked,
                                                        "data-supertokens": "link linkButton showTOTPSecretBtn",
                                                    },
                                                    { children: t("TOTP_SHOW_SECRET_LINK") }
                                                )
                                            ),
                                            t("TOTP_SHOW_SECRET_END"),
                                        ],
                                    }
                                )
                            ),
                            props.showSecret &&
                                jsx(
                                    "span",
                                    __assign(
                                        { "data-supertokens": "totpSecret" },
                                        { children: props.deviceInfo.secret }
                                    )
                                ),
                        ],
                    }
                )
            ),
            jsx("div", { "data-supertokens": "divider" }),
        ],
    });
});

export { DeviceInfoSection };
