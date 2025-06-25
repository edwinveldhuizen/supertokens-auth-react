import { __assign } from "../../../../../../../_virtual/_tslib.js";
import { jsxs, jsx } from "react/jsx-runtime";
import { Fragment } from "react";
import { withOverride } from "../../../../../components/componentOverride/withOverride.js";
import { useTranslation } from "../../../../../translation/translationContext.js";

var UserInputCodeFormHeader = withOverride(
    "PasswordlessUserInputCodeFormHeader",
    function PasswordlessUserInputCodeFormHeader(_a) {
        var loginAttemptInfo = _a.loginAttemptInfo;
        var t = useTranslation();
        return jsxs(Fragment, {
            children: [
                jsx(
                    "div",
                    __assign(
                        { "data-supertokens": "headerTitle" },
                        { children: t("PWLESS_USER_INPUT_CODE_HEADER_TITLE") }
                    )
                ),
                jsxs(
                    "div",
                    __assign(
                        { "data-supertokens": "headerSubtitle secondaryText" },
                        {
                            children: [
                                loginAttemptInfo.flowType === "USER_INPUT_CODE"
                                    ? t("PWLESS_USER_INPUT_CODE_HEADER_SUBTITLE")
                                    : t("PWLESS_USER_INPUT_CODE_HEADER_SUBTITLE_LINK"),
                                jsx("br", {}),
                                jsx("strong", { children: loginAttemptInfo.contactInfo }),
                            ],
                        }
                    )
                ),
                jsx("div", { "data-supertokens": "divider" }),
            ],
        });
    }
);

export { UserInputCodeFormHeader };
