import { __assign } from "../../../../../../../_virtual/_tslib.js";
import { jsx, jsxs } from "react/jsx-runtime";
import React__default, { useCallback, useState, useEffect } from "react";
import { withOverride } from "../../../../../components/componentOverride/withOverride.js";
import { useTranslation } from "../../../../../translation/translationContext.js";

var ResendButton = withOverride("PasswordlessResendButton", function PasswordlessResendButton(_a) {
    var loginAttemptInfo = _a.loginAttemptInfo,
        resendEmailOrSMSGapInSeconds = _a.resendEmailOrSMSGapInSeconds,
        onClick = _a.onClick;
    var t = useTranslation();
    var getTimeLeft = useCallback(
        function () {
            var timeLeft = loginAttemptInfo.lastResend + resendEmailOrSMSGapInSeconds * 1000 - Date.now();
            return timeLeft < 0 ? undefined : Math.ceil(timeLeft / 1000);
        },
        [loginAttemptInfo, resendEmailOrSMSGapInSeconds]
    );
    var _b = useState(getTimeLeft()),
        secsUntilResend = _b[0],
        setSecsUntilResend = _b[1];
    useEffect(
        function () {
            // This runs every time the loginAttemptInfo updates, so after every resend
            var interval = setInterval(function () {
                var timeLeft = getTimeLeft();
                if (timeLeft === undefined) {
                    clearInterval(interval);
                }
                setSecsUntilResend(timeLeft);
            }, 500);
            return function () {
                // This can safely run twice
                clearInterval(interval);
            };
        },
        [getTimeLeft, setSecsUntilResend]
    );
    return jsx(
        "button",
        __assign(
            {
                type: "button",
                disabled: secsUntilResend !== undefined,
                onClick: onClick,
                "data-supertokens": "link linkButton formLabelLinkBtn resendCodeBtn",
            },
            {
                children:
                    secsUntilResend !== undefined
                        ? jsxs(React__default.Fragment, {
                              children: [
                                  t("PWLESS_RESEND_BTN_DISABLED_START"),
                                  jsxs("strong", {
                                      children: [
                                          Math.floor(secsUntilResend / 60)
                                              .toString()
                                              .padStart(2, "0"),
                                          ":",
                                          (secsUntilResend % 60).toString().padStart(2, "0"),
                                      ],
                                  }),
                                  t("PWLESS_RESEND_BTN_DISABLED_END"),
                              ],
                          })
                        : loginAttemptInfo.contactMethod === "EMAIL"
                        ? t("PWLESS_RESEND_BTN_EMAIL")
                        : t("PWLESS_RESEND_BTN_PHONE"),
            }
        )
    );
});

export { ResendButton };
