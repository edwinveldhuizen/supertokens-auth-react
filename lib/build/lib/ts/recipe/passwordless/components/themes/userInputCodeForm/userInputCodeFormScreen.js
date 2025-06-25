import { __awaiter, __generator, __assign } from "../../../../../../../_virtual/_tslib.js";
import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useState, useEffect, useCallback } from "react";
import STGeneralError from "supertokens-web-js/utils/error";
import { withOverride } from "../../../../../components/componentOverride/withOverride.js";
import { SuperTokensBranding } from "../../../../../components/SuperTokensBranding.js";
import SuperTokens from "../../../../../superTokens.js";
import { useTranslation } from "../../../../../translation/translationContext.js";
import { useUserContext } from "../../../../../usercontext/index.js";
import UserContextWrapper from "../../../../../usercontext/userContextWrapper.js";
import "../../../../../../../index.js";
import Label from "../../../../emailpassword/components/library/label.js";
import { FormBase } from "../../../../emailpassword/components/library/formBase.js";
import GeneralError from "../../../../emailpassword/components/library/generalError.js";
import { userInputCodeValidate } from "../../../validators.js";
import { ResendButton } from "../signInUp/resendButton.js";
import { ThemeBase } from "../themeBase.js";
import { UserInputCodeFormFooter } from "./userInputCodeFormFooter.js";
import { UserInputCodeFormHeader } from "./userInputCodeFormHeader.js";

var UserInputCodeFormScreen = function (props) {
    return jsxs(
        "div",
        __assign(
            { "data-supertokens": "container" },
            {
                children: [
                    jsxs(
                        "div",
                        __assign(
                            { "data-supertokens": "row" },
                            {
                                children: [
                                    jsx(UserInputCodeFormHeader, __assign({}, props)),
                                    props.error !== undefined && jsx(GeneralError, { error: props.error }),
                                    jsx(UserInputCodeForm, __assign({}, props)),
                                ],
                            }
                        )
                    ),
                    jsx(SuperTokensBranding, {}),
                ],
            }
        )
    );
};
var UserInputCodeForm = withOverride("PasswordlessUserInputCodeForm", function (props) {
    var _a;
    var t = useTranslation();
    var userContext = useUserContext();
    // We need this any because the node types are also loaded
    var _b = useState(),
        clearResendNotifTimeout = _b[0],
        setClearResendNotifTimeout = _b[1];
    useEffect(
        function () {
            // This is just to clean up on unmount and if the clear timeout changes
            return function () {
                clearTimeout(clearResendNotifTimeout);
            };
        },
        [clearResendNotifTimeout]
    );
    var resend = useCallback(
        function resend() {
            return __awaiter(this, void 0, void 0, function () {
                var response, generalError, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 5, , 6]);
                            response = void 0;
                            generalError = void 0;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [
                                4 /*yield*/,
                                props.recipeImplementation.resendCode({
                                    userContext: userContext,
                                }),
                            ];
                        case 2:
                            response = _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            e_1 = _a.sent();
                            if (STGeneralError.isThisError(e_1)) {
                                generalError = e_1;
                            } else {
                                throw e_1;
                            }
                            return [3 /*break*/, 4];
                        case 4:
                            if (generalError !== undefined) {
                                props.onError(generalError.message);
                            } else {
                                if (response === undefined) {
                                    throw new Error("Should not come here");
                                }
                                if (response.status === "OK") {
                                    setClearResendNotifTimeout(
                                        setTimeout(function () {
                                            setClearResendNotifTimeout(undefined);
                                        }, 2000)
                                    );
                                }
                            }
                            return [3 /*break*/, 6];
                        case 5:
                            _a.sent();
                            props.onError("SOMETHING_WENT_WRONG_ERROR");
                            return [3 /*break*/, 6];
                        case 6:
                            return [2 /*return*/];
                    }
                });
            });
        },
        [setClearResendNotifTimeout, props.onError, props.recipeImplementation]
    );
    return jsxs(Fragment, {
        children: [
            clearResendNotifTimeout !== undefined &&
                jsx(
                    "div",
                    __assign(
                        { "data-supertokens": "generalSuccess" },
                        {
                            children:
                                props.loginAttemptInfo.contactMethod === "EMAIL"
                                    ? t("PWLESS_RESEND_SUCCESS_EMAIL")
                                    : t("PWLESS_RESEND_SUCCESS_PHONE"),
                        }
                    )
                ),
            jsx(FormBase, {
                clearError: props.clearError,
                onFetchError: props.onFetchError,
                onError: props.onError,
                formFields: [
                    {
                        id: "userInputCode",
                        label: "",
                        labelComponent: jsxs(
                            "div",
                            __assign(
                                { "data-supertokens": "formLabelWithLinkWrapper" },
                                {
                                    children: [
                                        jsx(Label, {
                                            value: "PWLESS_USER_INPUT_CODE_INPUT_LABEL",
                                            "data-supertokens": "codeInputLabel",
                                        }),
                                        jsx(ResendButton, {
                                            loginAttemptInfo: props.loginAttemptInfo,
                                            resendEmailOrSMSGapInSeconds:
                                                props.config.signInUpFeature.resendEmailOrSMSGapInSeconds,
                                            onClick: resend,
                                        }),
                                    ],
                                }
                            )
                        ),
                        autofocus: true,
                        optional: false,
                        clearOnSubmit: true,
                        autoComplete: "one-time-code",
                        placeholder: "",
                        validate: userInputCodeValidate,
                    },
                ],
                onSuccess: props.onSuccess,
                buttonLabel: "PWLESS_SIGN_IN_UP_CONTINUE_BUTTON",
                callAPI: function (formFields) {
                    return __awaiter(void 0, void 0, void 0, function () {
                        var userInputCode, response;
                        var _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    userInputCode =
                                        (_a = formFields.find(function (field) {
                                            return field.id === "userInputCode";
                                        })) === null || _a === void 0
                                            ? void 0
                                            : _a.value;
                                    if (userInputCode === undefined || userInputCode.length === 0) {
                                        throw new STGeneralError("GENERAL_ERROR_OTP_UNDEFINED");
                                    }
                                    return [
                                        4 /*yield*/,
                                        props.recipeImplementation.consumeCode({
                                            userInputCode: userInputCode,
                                            userContext: userContext,
                                        }),
                                    ];
                                case 1:
                                    response = _b.sent();
                                    // We can redirect these statuses, since they all cause a redirection
                                    // and we don't really want to show anything
                                    if (
                                        response.status === "OK" ||
                                        response.status === "RESTART_FLOW_ERROR" ||
                                        response.status === "SIGN_IN_UP_NOT_ALLOWED"
                                    ) {
                                        return [2 /*return*/, response];
                                    }
                                    if (response.status === "INCORRECT_USER_INPUT_CODE_ERROR") {
                                        throw new STGeneralError("GENERAL_ERROR_OTP_INVALID");
                                    }
                                    if (response.status === "EXPIRED_USER_INPUT_CODE_ERROR") {
                                        throw new STGeneralError("GENERAL_ERROR_OTP_EXPIRED");
                                    }
                                    throw new STGeneralError("SOMETHING_WENT_WRONG_ERROR");
                            }
                        });
                    });
                },
                validateOnBlur: false,
                showLabels: true,
                footer:
                    (_a = props.footer) !== null && _a !== void 0
                        ? _a
                        : jsx(
                              UserInputCodeFormFooter,
                              __assign({}, props, { loginAttemptInfo: props.loginAttemptInfo })
                          ),
            }),
        ],
    });
});
function UserInputCodeFormScreenWrapper(props) {
    var rootStyle = SuperTokens.getInstanceOrThrow().rootStyle;
    var activeStyle = props.config.signInUpFeature.userInputCodeFormStyle;
    return jsx(
        UserContextWrapper,
        __assign(
            { userContext: props.userContext },
            {
                children: jsx(
                    ThemeBase,
                    __assign(
                        { userStyles: [rootStyle, props.config.recipeRootStyle, activeStyle] },
                        { children: jsx(UserInputCodeFormScreen, __assign({}, props)) }
                    )
                ),
            }
        )
    );
}

export { UserInputCodeForm, UserInputCodeFormScreen, UserInputCodeFormScreenWrapper as default };
