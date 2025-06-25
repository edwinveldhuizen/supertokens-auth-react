import { __assign, __awaiter, __generator } from "../../../../../../../_virtual/_tslib.js";
import { jsxs, jsx } from "react/jsx-runtime";
import { redirectToAuth } from "../../../../../../../index.js";
import RecoverySuccessIcon from "../../../../../components/assets/recoverySuccessIcon.js";
import { useTranslation } from "../../../../../translation/translationContext.js";
import Button from "../../../../emailpassword/components/library/button.js";
import "react";

var PasskeyRecoverAccountSuccess = function () {
    var t = useTranslation();
    var onContinueClick = function () {
        return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        return [4 /*yield*/, redirectToAuth({ show: "signin" })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return jsxs(
        "div",
        __assign(
            { "data-supertokens": "passkeyRecoverAccountSuccessContainer" },
            {
                children: [
                    jsxs(
                        "div",
                        __assign(
                            { "data-supertokens": "header" },
                            {
                                children: [
                                    jsx(RecoverySuccessIcon, {}),
                                    jsx(
                                        "div",
                                        __assign(
                                            { "data-supertokens": "headerText" },
                                            { children: t("WEBAUTHN_ACCOUNT_RECOVERY_SUCCESSFUL_LABEL") }
                                        )
                                    ),
                                ],
                            }
                        )
                    ),
                    jsx("div", { "data-supertokens": "divider" }),
                    jsx(Button, {
                        disabled: false,
                        isLoading: false,
                        type: "button",
                        onClick: onContinueClick,
                        label: "WEBAUTHN_EMAIL_CONTINUE_BUTTON",
                    }),
                ],
            }
        )
    );
};

export { PasskeyRecoverAccountSuccess };
