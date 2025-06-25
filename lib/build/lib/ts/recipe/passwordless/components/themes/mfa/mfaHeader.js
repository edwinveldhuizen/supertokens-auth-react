import { __assign } from "../../../../../../../_virtual/_tslib.js";
import { jsxs, jsx } from "react/jsx-runtime";
import { Fragment } from "react";
import { withOverride } from "../../../../../components/componentOverride/withOverride.js";
import { useTranslation } from "../../../../../translation/translationContext.js";
import BackButton from "../../../../emailpassword/components/library/backButton.js";

var MFAHeader = withOverride("PasswordlessMFAHeader", function PasswordlessMFAHeader(props) {
    var t = useTranslation();
    return jsxs(Fragment, {
        children: [
            jsxs(
                "div",
                __assign(
                    { "data-supertokens": "headerTitle withBackButton pwless-mfa header" },
                    {
                        children: [
                            props.showBackButton
                                ? jsx(BackButton, { onClick: props.onBackButtonClicked })
                                : jsx("span", { "data-supertokens": "backButtonPlaceholder backButtonCommon" }),
                            props.contactMethod === "EMAIL"
                                ? t("PWLESS_MFA_HEADER_TITLE_EMAIL")
                                : t("PWLESS_MFA_HEADER_TITLE_PHONE"),
                            jsx("span", { "data-supertokens": "backButtonPlaceholder backButtonCommon" }),
                        ],
                    }
                )
            ),
            jsx("div", { "data-supertokens": "divider" }),
        ],
    });
});

export { MFAHeader };
