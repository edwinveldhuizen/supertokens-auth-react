import { __assign, __awaiter, __generator } from "../../../../../../../_virtual/_tslib.js";
import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect, useMemo } from "react";
import STGeneralError from "supertokens-web-js/utils/error";
import { withOverride } from "../../../../../components/componentOverride/withOverride.js";
import { useTranslation } from "../../../../../translation/translationContext.js";
import { useUserContext } from "../../../../../usercontext/index.js";
import "../../../../../../../index.js";
import Label from "../../../../emailpassword/components/library/label.js";
import { FormBase } from "../../../../emailpassword/components/library/formBase.js";
import { preloadPhoneNumberUtils } from "../../../phoneNumberUtils.js";
import { defaultValidate } from "../../../validators.js";
import { phoneNumberInputWithInjectedProps } from "./phoneNumberInput.js";

var EmailOrPhoneForm = withOverride("PasswordlessEmailOrPhoneForm", function PasswordlessEmailOrPhoneForm(props) {
    var _this = this;
    var t = useTranslation();
    var _a = useState(!props.config.signInUpFeature.defaultToEmail),
        isPhoneNumber = _a[0],
        setIsPhoneNumber = _a[1];
    var userContext = useUserContext();
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
    return jsx(FormBase, {
        clearError: props.clearError,
        onFetchError: props.onFetchError,
        onError: props.onError,
        formFields: isPhoneNumber
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
                                                      return setIsPhoneNumber(false);
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
                                      jsx(Label, {
                                          value: "PWLESS_SIGN_IN_UP_EMAIL_LABEL",
                                          "data-supertokens": "passwordInputLabel",
                                      }),
                                      jsx(
                                          "a",
                                          __assign(
                                              {
                                                  onClick: function () {
                                                      return setIsPhoneNumber(function (v) {
                                                          return !v;
                                                      });
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
              ],
        buttonLabel: "PWLESS_SIGN_IN_UP_CONTINUE_BUTTON",
        onSuccess: props.onSuccess,
        callAPI: function (formFields) {
            return __awaiter(_this, void 0, void 0, function () {
                var contactInfo, phoneNumber, validationRes, email, validationRes, response;
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            if (!isPhoneNumber) return [3 /*break*/, 2];
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
                            contactInfo = { phoneNumber: phoneNumber };
                            return [3 /*break*/, 4];
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
                            contactInfo = { email: email };
                            _c.label = 4;
                        case 4:
                            return [
                                4 /*yield*/,
                                props.recipeImplementation.createCode(
                                    __assign(__assign({}, contactInfo), {
                                        // shouldTryLinkingWithSessionUser is set by the fn override
                                        userContext: userContext,
                                    })
                                ),
                            ];
                        case 5:
                            response = _c.sent();
                            if (response.status === "SIGN_IN_UP_NOT_ALLOWED") {
                                throw new STGeneralError(response.reason);
                            }
                            return [2 /*return*/, response];
                    }
                });
            });
        },
        validateOnBlur: false,
        showLabels: true,
        footer: props.footer,
    });
});

export { EmailOrPhoneForm };
