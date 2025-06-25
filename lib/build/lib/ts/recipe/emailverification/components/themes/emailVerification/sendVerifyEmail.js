import { __awaiter, __generator, __assign } from "../../../../../../../_virtual/_tslib.js";
import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useCallback } from "react";
import STGeneralError from "supertokens-web-js/utils/error";
import ArrowRightIcon from "../../../../../components/assets/arrowRightIcon.js";
import EmailLargeIcon from "../../../../../components/assets/emailLargeIcon.js";
import { withOverride } from "../../../../../components/componentOverride/withOverride.js";
import { useTranslation } from "../../../../../translation/translationContext.js";
import { useUserContext } from "../../../../../usercontext/index.js";
import { useOnMountAPICall } from "../../../../../utils.js";
import GeneralError from "../../../../emailpassword/components/library/generalError.js";
import Session from "../../../../session/recipe.js";

var EmailVerificationSendVerifyEmail = function (props) {
    var t = useTranslation();
    var userContext = useUserContext();
    var _a = useState("READY"),
        status = _a[0],
        setStatus = _a[1];
    var _b = useState(undefined),
        errorMessage = _b[0],
        setErrorMessage = _b[1];
    var resendEmail = function () {
        return __awaiter(void 0, void 0, void 0, function () {
            var response, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [
                            4 /*yield*/,
                            props.recipeImplementation.sendVerificationEmail({
                                userContext: userContext,
                            }),
                        ];
                    case 1:
                        response = _a.sent();
                        if (!(response.status === "EMAIL_ALREADY_VERIFIED_ERROR")) return [3 /*break*/, 3];
                        return [4 /*yield*/, props.onEmailAlreadyVerified()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        if (response.status === "OK") {
                            setStatus("EMAIL_RESENT");
                        }
                        _a.label = 4;
                    case 4:
                        return [3 /*break*/, 6];
                    case 5:
                        e_1 = _a.sent();
                        if (STGeneralError.isThisError(e_1)) {
                            setErrorMessage(e_1.message);
                        }
                        setStatus("ERROR");
                        return [2 /*return*/, handleSendError()];
                    case 6:
                        return [2 /*return*/];
                }
            });
        });
    };
    var logout = function () {
        return __awaiter(void 0, void 0, void 0, function () {
            var e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, props.signOut()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_2 = _a.sent();
                        if (STGeneralError.isThisError(e_2)) {
                            setErrorMessage(e_2.message);
                        }
                        setStatus("ERROR");
                        return [3 /*break*/, 3];
                    case 3:
                        return [2 /*return*/];
                }
            });
        });
    };
    var sendVerificationEmail = useCallback(
        function () {
            return props.recipeImplementation.sendVerificationEmail({
                userContext: userContext,
            });
        },
        [props.config, props.recipeImplementation]
    );
    var checkSendResponse = useCallback(
        function (response) {
            return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(response.status === "EMAIL_ALREADY_VERIFIED_ERROR")) return [3 /*break*/, 2];
                            return [4 /*yield*/, props.onEmailAlreadyVerified()];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2:
                            return [2 /*return*/];
                    }
                });
            });
        },
        [props.config, props.recipeImplementation, props.onEmailAlreadyVerified]
    );
    var handleSendError = useCallback(function () {
        return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        return [
                            4 /*yield*/,
                            Session.getInstanceOrThrow().doesSessionExist({ userContext: userContext }),
                        ];
                    case 1:
                        if (!(_a.sent() !== true)) return [3 /*break*/, 3];
                        return [4 /*yield*/, props.redirectToAuth()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        return [2 /*return*/];
                }
            });
        });
    }, []);
    useOnMountAPICall(sendVerificationEmail, checkSendResponse, handleSendError);
    return jsx(
        "div",
        __assign(
            { "data-supertokens": "container" },
            {
                children: jsxs(
                    "div",
                    __assign(
                        { "data-supertokens": "row" },
                        {
                            children: [
                                status === "ERROR" &&
                                    jsx(GeneralError, {
                                        error: errorMessage === undefined ? "SOMETHING_WENT_WRONG_ERROR" : errorMessage,
                                    }),
                                status === "EMAIL_RESENT" &&
                                    jsx(
                                        "div",
                                        __assign(
                                            { "data-supertokens": "generalSuccess" },
                                            { children: t("EMAIL_VERIFICATION_RESEND_SUCCESS") }
                                        )
                                    ),
                                jsx(
                                    "div",
                                    __assign(
                                        { "data-supertokens": "sendVerifyEmailIcon" },
                                        { children: jsx(EmailLargeIcon, {}) }
                                    )
                                ),
                                jsx(
                                    "div",
                                    __assign(
                                        { "data-supertokens": "headerTitle headerTinyTitle" },
                                        { children: t("EMAIL_VERIFICATION_SEND_TITLE") }
                                    )
                                ),
                                jsx("div", { "data-supertokens": "divider" }),
                                jsxs(
                                    "div",
                                    __assign(
                                        { "data-supertokens": "primaryText sendVerifyEmailText" },
                                        {
                                            children: [
                                                t("EMAIL_VERIFICATION_SEND_DESC_START"),
                                                jsx("strong", { children: t("EMAIL_VERIFICATION_SEND_DESC_STRONG") }),
                                                t("EMAIL_VERIFICATION_SEND_DESC_END"),
                                            ],
                                        }
                                    )
                                ),
                                jsxs(
                                    "div",
                                    __assign(
                                        { "data-supertokens": "buttonWithArrow", onClick: logout },
                                        {
                                            children: [
                                                jsx(
                                                    "div",
                                                    __assign(
                                                        {
                                                            "data-supertokens":
                                                                "secondaryText secondaryLinkWithRightArrow",
                                                        },
                                                        { children: t("EMAIL_VERIFICATION_LOGOUT") }
                                                    )
                                                ),
                                                jsx(ArrowRightIcon, { color: "rgb(var(--palette-textGray))" }),
                                            ],
                                        }
                                    )
                                ),
                                status !== "EMAIL_RESENT" &&
                                    jsx(
                                        "div",
                                        __assign(
                                            { "data-supertokens": "link sendVerifyEmailResend", onClick: resendEmail },
                                            { children: t("EMAIL_VERIFICATION_RESEND_BTN") }
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
var SendVerifyEmail = withOverride("EmailVerificationSendVerifyEmail", EmailVerificationSendVerifyEmail);

export { EmailVerificationSendVerifyEmail, SendVerifyEmail };
