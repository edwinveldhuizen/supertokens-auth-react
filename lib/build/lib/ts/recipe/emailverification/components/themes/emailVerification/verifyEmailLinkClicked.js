import { __awaiter, __generator, __assign } from "../../../../../../../_virtual/_tslib.js";
import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useCallback } from "react";
import STGeneralError from "supertokens-web-js/utils/error";
import ArrowRightIcon from "../../../../../components/assets/arrowRightIcon.js";
import CheckedRoundIcon from "../../../../../components/assets/checkedRoundIcon.js";
import ErrorLargeIcon from "../../../../../components/assets/errorLargeIcon.js";
import SpinnerIcon from "../../../../../components/assets/spinnerIcon.js";
import { withOverride } from "../../../../../components/componentOverride/withOverride.js";
import { useTranslation } from "../../../../../translation/translationContext.js";
import { useUserContext } from "../../../../../usercontext/index.js";
import { useOnMountAPICall } from "../../../../../utils.js";
import Button from "../../../../emailpassword/components/library/button.js";
import "../../../../../../../index.js";
import useSessionContext from "../../../../session/useSessionContext.js";

var EmailVerificationVerifyEmailLinkClicked = function (props) {
    var t = useTranslation();
    var sessionContext = useSessionContext();
    var userContext = useUserContext();
    var _a = useState("LOADING"),
        status = _a[0],
        setStatus = _a[1];
    var _b = useState(undefined),
        errorMessage = _b[0],
        setErrorMessage = _b[1];
    var _c = useState(false),
        verifyLoading = _c[0],
        setVerifyLoading = _c[1];
    var verifyEmailOnMount = useCallback(
        function () {
            return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (sessionContext.loading === true) {
                        // This callback should only be called if the session is already loaded
                        throw new Error("Should never come here");
                    }
                    // If there is no active session we know that the verification was started elsewhere, since it requires a session
                    // otherwise we assume it's the same session. The main purpose of this is to prevent mail scanners
                    // from accidentally validating an email address
                    if (!sessionContext.doesSessionExist) {
                        return [2 /*return*/, "INTERACTION_REQUIRED"];
                    }
                    return [
                        2 /*return*/,
                        props.recipeImplementation.verifyEmail({
                            userContext: userContext,
                        }),
                    ];
                });
            });
        },
        [props.recipeImplementation, sessionContext]
    );
    var handleVerifyResp = useCallback(
        function (response) {
            return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (response === "INTERACTION_REQUIRED") {
                        setStatus("INTERACTION_REQUIRED");
                    } else if (response.status === "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR") {
                        setStatus("INVALID");
                    } else {
                        setStatus("SUCCESSFUL");
                    }
                    return [2 /*return*/];
                });
            });
        },
        [setStatus]
    );
    var handleError = useCallback(
        function (err) {
            if (STGeneralError.isThisError(err)) {
                setErrorMessage(err.message);
            }
            setStatus("GENERAL_ERROR");
        },
        [setStatus, setErrorMessage]
    );
    useOnMountAPICall(verifyEmailOnMount, handleVerifyResp, handleError, sessionContext.loading === false);
    var onTokenInvalidRedirect = props.onTokenInvalidRedirect,
        onSuccess = props.onSuccess;
    if (status === "LOADING") {
        return jsx(
            "div",
            __assign(
                { "data-supertokens": "container" },
                {
                    children: jsx(
                        "div",
                        __assign(
                            { "data-supertokens": "row" },
                            {
                                children: jsx(
                                    "div",
                                    __assign({ "data-supertokens": "spinner" }, { children: jsx(SpinnerIcon, {}) })
                                ),
                            }
                        )
                    ),
                }
            )
        );
    }
    if (status === "INTERACTION_REQUIRED") {
        return jsx(
            "div",
            __assign(
                { "data-supertokens": "container" },
                {
                    children: jsxs(
                        "div",
                        __assign(
                            { "data-supertokens": "row noFormRow" },
                            {
                                children: [
                                    jsx(
                                        "div",
                                        __assign(
                                            { "data-supertokens": "headerTitle" },
                                            { children: t("EMAIL_VERIFICATION_LINK_CLICKED_HEADER") }
                                        )
                                    ),
                                    jsx(
                                        "div",
                                        __assign(
                                            { "data-supertokens": "headerSubtitle secondaryText" },
                                            { children: t("EMAIL_VERIFICATION_LINK_CLICKED_DESC") }
                                        )
                                    ),
                                    jsx(Button, {
                                        isLoading: verifyLoading,
                                        onClick: function () {
                                            return __awaiter(void 0, void 0, void 0, function () {
                                                var resp, err_1;
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0:
                                                            setVerifyLoading(true);
                                                            _a.label = 1;
                                                        case 1:
                                                            _a.trys.push([1, 4, , 5]);
                                                            return [
                                                                4 /*yield*/,
                                                                props.recipeImplementation.verifyEmail({
                                                                    userContext: userContext,
                                                                }),
                                                            ];
                                                        case 2:
                                                            resp = _a.sent();
                                                            return [4 /*yield*/, handleVerifyResp(resp)];
                                                        case 3:
                                                            _a.sent();
                                                            return [3 /*break*/, 5];
                                                        case 4:
                                                            err_1 = _a.sent();
                                                            void handleError(err_1);
                                                            return [3 /*break*/, 5];
                                                        case 5:
                                                            return [2 /*return*/];
                                                    }
                                                });
                                            });
                                        },
                                        type: "button",
                                        label: "EMAIL_VERIFICATION_LINK_CLICKED_CONTINUE_BUTTON",
                                    }),
                                ],
                            }
                        )
                    ),
                }
            )
        );
    }
    if (status === "SUCCESSFUL") {
        return jsx(
            "div",
            __assign(
                { "data-supertokens": "container" },
                {
                    children: jsxs(
                        "div",
                        __assign(
                            { "data-supertokens": "row noFormRow" },
                            {
                                children: [
                                    jsx(CheckedRoundIcon, {}),
                                    jsx(
                                        "div",
                                        __assign(
                                            { "data-supertokens": "headerTitle headerTinyTitle" },
                                            { children: t("EMAIL_VERIFICATION_SUCCESS") }
                                        )
                                    ),
                                    jsx(
                                        "div",
                                        __assign(
                                            { "data-supertokens": "emailVerificationButtonWrapper" },
                                            {
                                                children: jsx(Button, {
                                                    isLoading: false,
                                                    onClick: onSuccess,
                                                    type: "button",
                                                    label: "EMAIL_VERIFICATION_CONTINUE_BTN",
                                                }),
                                            }
                                        )
                                    ),
                                ],
                            }
                        )
                    ),
                }
            )
        );
    }
    if (status === "INVALID") {
        return jsx(
            "div",
            __assign(
                { "data-supertokens": "container" },
                {
                    children: jsxs(
                        "div",
                        __assign(
                            { "data-supertokens": "row noFormRow" },
                            {
                                children: [
                                    jsx(
                                        "div",
                                        __assign(
                                            { "data-supertokens": "headerTitle headerTinyTitle" },
                                            { children: t("EMAIL_VERIFICATION_EXPIRED") }
                                        )
                                    ),
                                    jsxs(
                                        "div",
                                        __assign(
                                            {
                                                onClick: onTokenInvalidRedirect,
                                                "data-supertokens": "secondaryText secondaryLinkWithArrow",
                                            },
                                            {
                                                children: [
                                                    t("EMAIL_VERIFICATION_CONTINUE_LINK"),
                                                    " ",
                                                    jsx(ArrowRightIcon, { color: "rgb(var(--palette-textPrimary))" }),
                                                ],
                                            }
                                        )
                                    ),
                                ],
                            }
                        )
                    ),
                }
            )
        );
    }
    return jsx(
        "div",
        __assign(
            { "data-supertokens": "container" },
            {
                children: jsxs(
                    "div",
                    __assign(
                        { "data-supertokens": "row noFormRow" },
                        {
                            children: [
                                jsxs(
                                    "div",
                                    __assign(
                                        { "data-supertokens": "headerTitle error" },
                                        { children: [jsx(ErrorLargeIcon, {}), t("EMAIL_VERIFICATION_ERROR_TITLE")] }
                                    )
                                ),
                                jsx(
                                    "div",
                                    __assign(
                                        { "data-supertokens": "primaryText" },
                                        {
                                            children: t(
                                                errorMessage === undefined
                                                    ? "EMAIL_VERIFICATION_ERROR_DESC"
                                                    : errorMessage
                                            ),
                                        }
                                    )
                                ),
                            ],
                        }
                    )
                ),
            }
        )
    );
};
var VerifyEmailLinkClicked = withOverride(
    "EmailVerificationVerifyEmailLinkClicked",
    EmailVerificationVerifyEmailLinkClicked
);

export { EmailVerificationVerifyEmailLinkClicked, VerifyEmailLinkClicked };
