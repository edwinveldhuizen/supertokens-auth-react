import { __assign } from "../../../../../../../_virtual/_tslib.js";
import { jsxs, jsx } from "react/jsx-runtime";
import { Fragment } from "react";
import { withOverride } from "../../../../../components/componentOverride/withOverride.js";
import { useTranslation } from "../../../../../translation/translationContext.js";
import BackButton from "../../../../emailpassword/components/library/backButton.js";

var CodeVerificationHeader = withOverride("TOTPCodeVerificationHeader", function TOTPCodeVerificationHeader(props) {
    var t = useTranslation();
    return jsxs(Fragment, {
        children: [
            jsxs(
                "div",
                __assign(
                    { "data-supertokens": "headerTitle withBackButton totp-mfa codeVerificationHeader" },
                    {
                        children: [
                            props.showBackButton
                                ? jsx(BackButton, { onClick: props.onBackButtonClicked })
                                : jsx("span", { "data-supertokens": "backButtonPlaceholder backButtonCommon" }),
                            t("TOTP_CODE_VERIFICATION_HEADER_TITLE"),
                            jsx("span", { "data-supertokens": "backButtonPlaceholder backButtonCommon" }),
                        ],
                    }
                )
            ),
            jsx(
                "div",
                __assign(
                    { "data-supertokens": "headerSubtitle secondaryText" },
                    { children: t("TOTP_CODE_VERIFICATION_HEADER_SUBTITLE") }
                )
            ),
            jsx("div", { "data-supertokens": "divider" }),
        ],
    });
});

export { CodeVerificationHeader };
