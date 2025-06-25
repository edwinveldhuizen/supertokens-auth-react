import { __assign, __awaiter, __generator } from "../../../../../../../_virtual/_tslib.js";
import { jsxs, jsx } from "react/jsx-runtime";
import { useEffect, useMemo } from "react";
import STGeneralError from "supertokens-web-js/utils/error";
import { withOverride } from "../../../../../components/componentOverride/withOverride.js";
import { useTranslation } from "../../../../../translation/translationContext.js";
import { getTenantIdFromQueryParams } from "../../../../../utils.js";
import "../../../../../../../index.js";
import Label from "../../../../emailpassword/components/library/label.js";
import { FormBase } from "../../../../emailpassword/components/library/formBase.js";
import EmailPassword from "../../../../emailpassword/recipe.js";
import { preloadPhoneNumberUtils } from "../../../phoneNumberUtils.js";
import { defaultValidate } from "../../../validators.js";
import { phoneNumberInputWithInjectedProps } from "../signInUp/phoneNumberInput.js";
import { ContinueWithPasswordlessFooter } from "./continueWithPasswordlessFooter.js";

var EPComboEmailOrPhoneForm = withOverride(
    "PasswordlessEPComboEmailOrPhoneForm",
    function PasswordlessEPComboEmailOrPhoneForm(props) {
        var _this = this;
        var t = useTranslation();
        useEffect(function () {
            // We preload this here, since it will be used almost for sure, but loading it
            void preloadPhoneNumberUtils();
        }, []);
        var phoneInput = useMemo(
            function () {
                return phoneNumberInputWithInjectedProps({
                    defaultCountry: props.config.signInUpFeature.defaultCountry,
                });
            },
            [props.config.signInUpFeature.defaultCountry]
        );
        var formFields = props.isPhoneNumber
            ? [
                  {
                      id: "phoneNumber",
                      label: "",
                      labelComponent: jsxs(
                          "div",
                          __assign(
                              { "data-supertokens": "formLabelWithLinkWrapper" },
                              {
                                  children: [
                                      jsx(Label, { value: "PWLESS_SIGN_IN_UP_PHONE_LABEL" }),
                                      jsx(
                                          "a",
                                          __assign(
                                              {
                                                  onClick: function () {
                                                      return props.setIsPhoneNumber(false);
                                                  },
                                                  "data-supertokens":
                                                      "link linkButton formLabelLinkBtn contactMethodSwitcher",
                                              },
                                              { children: t("PWLESS_SIGN_IN_UP_SWITCH_TO_EMAIL") }
                                          )
                                      ),
                                  ],
                              }
                          )
                      ),
                      inputComponent: phoneInput,
                      optional: false,
                      autofocus: true,
                      placeholder: "",
                      autoComplete: "tel",
                      validate: defaultValidate,
                  },
              ]
            : [
                  {
                      id: "email",
                      label: "",
                      labelComponent: jsxs(
                          "div",
                          __assign(
                              { "data-supertokens": "formLabelWithLinkWrapper" },
                              {
                                  children: [
                                      jsx(Label, { value: "PWLESS_SIGN_IN_UP_EMAIL_LABEL" }),
                                      jsx(
                                          "a",
                                          __assign(
                                              {
                                                  onClick: function () {
                                                      return props.setIsPhoneNumber(true);
                                                  },
                                                  "data-supertokens":
                                                      "link linkButton formLabelLinkBtn contactMethodSwitcher",
                                              },
                                              { children: t("PWLESS_SIGN_IN_UP_SWITCH_TO_PHONE") }
                                          )
                                      ),
                                  ],
                              }
                          )
                      ),
                      inputComponent: undefined,
                      optional: false,
                      autofocus: true,
                      placeholder: "",
                      autoComplete: "email",
                      validate: defaultValidate,
                  },
              ];
        if (props.showPasswordField) {
            formFields.push({
                id: "password",
                autofocus: false,
                optional: false,
                placeholder: "",
                label: "",
                validate: defaultValidate,
                labelComponent: jsxs(
                    "div",
                    __assign(
                        { "data-supertokens": "formLabelWithLinkWrapper" },
                        {
                            children: [
                                jsx(Label, {
                                    value: "PWLESS_COMBO_PASSWORD_LABEL",
                                    "data-supertokens": "passwordInputLabel",
                                }),
                                jsx(
                                    "a",
                                    __assign(
                                        {
                                            onClick: function () {
                                                return EmailPassword.getInstanceOrThrow().redirect(
                                                    {
                                                        action: "RESET_PASSWORD",
                                                        tenantIdFromQueryParams: getTenantIdFromQueryParams(),
                                                    },
                                                    props.navigate
                                                );
                                            },
                                            "data-supertokens": "link linkButton formLabelLinkBtn forgotPasswordLink",
                                        },
                                        { children: t("PWLESS_COMBO_FORGOT_PW_LINK") }
                                    )
                                ),
                            ],
                        }
                    )
                ),
            });
        }
        return jsx(FormBase, {
            clearError: props.clearError,
            onFetchError: props.onFetchError,
            onError: props.onError,
            formFields: formFields,
            buttonLabel: "PWLESS_SIGN_IN_UP_CONTINUE_BUTTON",
            callAPI: function (formFields) {
                return __awaiter(_this, void 0, void 0, function () {
                    var phoneNumber, validationRes, email, validationRes;
                    var _a, _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                if (!props.isPhoneNumber) return [3 /*break*/, 2];
                                phoneNumber =
                                    (_a = formFields.find(function (field) {
                                        return field.id === "phoneNumber";
                                    })) === null || _a === void 0
                                        ? void 0
                                        : _a.value;
                                if (phoneNumber === undefined) {
                                    throw new STGeneralError("GENERAL_ERROR_PHONE_UNDEFINED");
                                }
                                return [4 /*yield*/, props.validatePhoneNumber(phoneNumber)];
                            case 1:
                                validationRes = _c.sent();
                                if (validationRes !== undefined) {
                                    throw new STGeneralError(validationRes);
                                }
                                return [2 /*return*/, props.onContactInfoSubmit(phoneNumber)];
                            case 2:
                                email =
                                    (_b = formFields.find(function (field) {
                                        return field.id === "email";
                                    })) === null || _b === void 0
                                        ? void 0
                                        : _b.value;
                                if (email === undefined) {
                                    throw new STGeneralError("GENERAL_ERROR_EMAIL_UNDEFINED");
                                }
                                return [4 /*yield*/, props.config.validateEmailAddress(email)];
                            case 3:
                                validationRes = _c.sent();
                                if (validationRes !== undefined) {
                                    throw new STGeneralError(validationRes);
                                }
                                if (props.showPasswordField) {
                                    return [2 /*return*/, props.onPasswordSubmit(formFields)];
                                } else {
                                    return [2 /*return*/, props.onContactInfoSubmit(email)];
                                }
                            case 4:
                                return [2 /*return*/];
                        }
                    });
                });
            },
            validateOnBlur: false,
            showLabels: true,
            onSuccess: props.onSuccess,
            footer: props.showContinueWithPasswordlessLink
                ? jsx(ContinueWithPasswordlessFooter, {
                      isPhoneNumber: props.isPhoneNumber,
                      onContinueWithPasswordlessClick: props.onContinueWithPasswordlessClick,
                      validatePhoneNumber: props.validatePhoneNumber,
                      onError: props.onError,
                      config: props.config,
                  })
                : undefined,
        });
    }
);

export { EPComboEmailOrPhoneForm };
