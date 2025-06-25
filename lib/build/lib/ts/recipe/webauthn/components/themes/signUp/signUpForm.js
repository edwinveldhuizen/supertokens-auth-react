import { __assign, __awaiter, __generator } from "../../../../../../../_virtual/_tslib.js";
import { jsx, jsxs } from "react/jsx-runtime";
import { useCallback, useState, useEffect } from "react";
import STGeneralError from "supertokens-web-js/utils/error";
import { withOverride } from "../../../../../components/componentOverride/withOverride.js";
import { useTranslation } from "../../../../../translation/translationContext.js";
import { useUserContext } from "../../../../../usercontext/index.js";
import { handleCallAPI } from "../../../../../utils.js";
import "../../../../../../../index.js";
import Label from "../../../../emailpassword/components/library/label.js";
import { FormBase } from "../../../../emailpassword/components/library/formBase.js";
import { defaultEmailValidator } from "../../../../emailpassword/validators.js";
import { PasskeyConfirmation } from "./confirmation.js";
import { ContinueWithoutPasskey } from "./continueWithoutPasskey.js";
import { SignUpSomethingWentWrong } from "./somethingWentWrong.js";

var SignUpScreen;
(function (SignUpScreen) {
    SignUpScreen[(SignUpScreen["SignUpForm"] = 0)] = "SignUpForm";
    SignUpScreen[(SignUpScreen["PasskeyConfirmation"] = 1)] = "PasskeyConfirmation";
    SignUpScreen[(SignUpScreen["Error"] = 2)] = "Error";
})(SignUpScreen || (SignUpScreen = {}));
var SignUpFormInner = withOverride("WebauthnPasskeySignUpForm", function PasskeyEmailForm(props) {
    var _this = this;
    var t = useTranslation();
    var defaultFooter =
        props.resetFactorList !== undefined && props.showBackButton
            ? jsx(ContinueWithoutPasskey, { onClick: props.resetFactorList })
            : undefined;
    var onEmailContinueSuccess = useCallback(
        function (params) {
            props.onContinueClick(params);
        },
        [props]
    );
    var onError = useCallback(
        function (error) {
            if (error === "EMAIL_INPUT_NOT_POPULATED_ERROR") {
                props.onError("WEBAUTHN_EMAIL_INPUT_NOT_POPULATED_ERROR");
            } else {
                props.onError(t("WEBAUTHN_ACCOUNT_RECOVERY_FETCH_ERROR"));
            }
        },
        [props, t]
    );
    return jsxs(
        "div",
        __assign(
            { "data-supertokens": "signUpFormInnerContainer" },
            {
                children: [
                    jsx(
                        "div",
                        __assign(
                            { "data-supertokens": "cautionMessage" },
                            { children: t("WEBAUTHN_SIGN_UP_CAUTION_MESSAGE_LABEL") }
                        )
                    ),
                    jsx(FormBase, {
                        clearError: props.clearError,
                        onFetchError: props.onFetchError,
                        onError: onError,
                        formFields: [
                            {
                                id: "email",
                                label: "",
                                labelComponent: jsxs(
                                    "div",
                                    __assign(
                                        { "data-supertokens": "formLabelWithLinkWrapper" },
                                        {
                                            children: [
                                                jsx(Label, {
                                                    value: "WEBAUTHN_SIGN_UP_LABEL",
                                                    "data-supertokens": "emailInputLabel",
                                                }),
                                                jsx(
                                                    "a",
                                                    __assign(
                                                        {
                                                            onClick: props.onRecoverAccountClick,
                                                            "data-supertokens":
                                                                "link linkButton formLabelLinkBtn recoverAccountTrigger",
                                                        },
                                                        { children: t("WEBAUTHN_RECOVER_ACCOUNT_LABEL") }
                                                    )
                                                ),
                                            ],
                                        }
                                    )
                                ),
                                optional: false,
                                autofocus: true,
                                placeholder: "",
                                autoComplete: "email",
                                // We are using the default validator that allows any string
                                validate: defaultEmailValidator,
                            },
                        ],
                        buttonLabel: "WEBAUTHN_EMAIL_CONTINUE_BUTTON",
                        onSuccess: onEmailContinueSuccess,
                        callAPI: function (formFields) {
                            return __awaiter(_this, void 0, void 0, function () {
                                var email;
                                var _a;
                                return __generator(this, function (_b) {
                                    email =
                                        (_a = formFields.find(function (field) {
                                            return field.id === "email";
                                        })) === null || _a === void 0
                                            ? void 0
                                            : _a.value;
                                    if (email === undefined) {
                                        throw new STGeneralError("GENERAL_ERROR_EMAIL_UNDEFINED");
                                    }
                                    if (email === "") {
                                        throw new STGeneralError("EMAIL_INPUT_NOT_POPULATED_ERROR");
                                    }
                                    // We do not want the form to make the API call since we have
                                    // an intermediary step here so we will just mock an OK status
                                    // to render the next step.
                                    return [
                                        2 /*return*/,
                                        {
                                            status: "OK",
                                            email: email,
                                        },
                                    ];
                                });
                            });
                        },
                        validateOnBlur: false,
                        showLabels: true,
                        footer: props.footer || defaultFooter,
                    }),
                ],
            }
        )
    );
});
var SignUpForm = function (props) {
    var _a = useState(null),
        continueClickResponse = _a[0],
        setContinueClickResponse = _a[1];
    var userContext = useUserContext();
    var _b = useState(undefined),
        errorLabel = _b[0],
        setErrorLabel = _b[1];
    var _c = useState(false),
        isLoading = _c[0],
        setIsLoading = _c[1];
    var _d = useState(false),
        isPasskeySupported = _d[0],
        setIsPasskeySupported = _d[1];
    useEffect(
        function () {
            void (function () {
                return __awaiter(void 0, void 0, void 0, function () {
                    var browserSupportsWebauthn;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                return [
                                    4 /*yield*/,
                                    props.recipeImplementation.doesBrowserSupportWebAuthn({
                                        userContext: userContext,
                                    }),
                                ];
                            case 1:
                                browserSupportsWebauthn = _a.sent();
                                if (browserSupportsWebauthn.status !== "OK") {
                                    console.error(browserSupportsWebauthn.error);
                                    return [2 /*return*/];
                                }
                                setIsPasskeySupported(browserSupportsWebauthn.browserSupportsWebauthn);
                                return [2 /*return*/];
                        }
                    });
                });
            })();
        },
        [props.recipeImplementation]
    );
    var onContinueClickCallback = useCallback(
        function (params) {
            setContinueClickResponse(params);
            props.onContinueClick(params);
        },
        [setContinueClickResponse, props]
    );
    var callAPI = useCallback(
        function (_, __) {
            return __awaiter(void 0, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (continueClickResponse === null) {
                                throw props.onError("EMAIL_INPUT_NOT_POPULATED_ERROR");
                            }
                            return [
                                4 /*yield*/,
                                props.recipeImplementation.registerCredentialWithSignUp({
                                    email: continueClickResponse.email,
                                    userContext: userContext,
                                }),
                            ];
                        case 1:
                            response = _a.sent();
                            // If it is an error related to passkey, we need to handle it.
                            if (response.status !== "OK") {
                                setErrorLabel("WEBAUTHN_PASSKEY_RECOVERABLE_ERROR");
                            }
                            if (response.status === "EMAIL_ALREADY_EXISTS_ERROR") {
                                setErrorLabel("WEBAUTHN_EMAIL_ALREADY_EXISTS_ERROR");
                            }
                            if (response.status === "WEBAUTHN_NOT_SUPPORTED") {
                                setErrorLabel("WEBAUTHN_NOT_SUPPORTED_ERROR");
                            }
                            return [2 /*return*/, response];
                    }
                });
            });
        },
        [continueClickResponse, props, userContext]
    );
    var onConfirmationClick = useCallback(
        function () {
            return __awaiter(void 0, void 0, void 0, function () {
                var fieldUpdates, _a, result, generalError, fetchError, e_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            fieldUpdates = [];
                            setIsLoading(true);
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, 4, 5]);
                            return [
                                4 /*yield*/,
                                handleCallAPI({
                                    apiFields: [],
                                    fieldUpdates: fieldUpdates,
                                    callAPI: callAPI,
                                }),
                            ];
                        case 2:
                            (_a = _b.sent()),
                                (result = _a.result),
                                (generalError = _a.generalError),
                                (fetchError = _a.fetchError);
                            if (generalError !== undefined) {
                                props.setActiveScreen(SignUpScreen.Error);
                            } else if (fetchError !== undefined) {
                                setErrorLabel("WEBAUTHN_PASSKEY_RECOVERABLE_ERROR");
                            } else {
                                // If successful
                                if (result.status === "OK") {
                                    if (setIsLoading) {
                                        setIsLoading(false);
                                    }
                                    setErrorLabel(undefined);
                                    if (props.onSuccess !== undefined) {
                                        props.onSuccess(result);
                                    }
                                }
                            }
                            return [3 /*break*/, 5];
                        case 3:
                            e_1 = _b.sent();
                            console.error("error", e_1);
                            props.setActiveScreen(SignUpScreen.Error);
                            return [3 /*break*/, 5];
                        case 4:
                            if (setIsLoading) {
                                setIsLoading(false);
                            }
                            return [7 /*endfinally*/];
                        case 5:
                            return [2 /*return*/];
                    }
                });
            });
        },
        [callAPI, props]
    );
    return props.activeScreen === SignUpScreen.SignUpForm
        ? jsx(SignUpFormInner, __assign({}, props, { onContinueClick: onContinueClickCallback }))
        : props.activeScreen === SignUpScreen.PasskeyConfirmation
        ? jsx(
              PasskeyConfirmation,
              __assign({}, props, {
                  email:
                      (continueClickResponse === null || continueClickResponse === void 0
                          ? void 0
                          : continueClickResponse.email) || "",
                  onContinueClick: onConfirmationClick,
                  errorMessageLabel: errorLabel,
                  isLoading: isLoading,
                  isPasskeySupported: isPasskeySupported,
              })
          )
        : props.activeScreen === SignUpScreen.Error
        ? jsx(SignUpSomethingWentWrong, {
              onClick: function () {
                  return props.setActiveScreen(SignUpScreen.SignUpForm);
              },
          })
        : null;
};

export { SignUpForm, SignUpFormInner, SignUpScreen };
