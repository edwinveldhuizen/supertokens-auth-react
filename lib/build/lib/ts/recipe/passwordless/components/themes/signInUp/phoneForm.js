import { __awaiter, __generator } from "../../../../../../../_virtual/_tslib.js";
import { jsx } from "react/jsx-runtime";
import { useEffect, useMemo } from "react";
import STGeneralError from "supertokens-web-js/utils/error";
import { withOverride } from "../../../../../components/componentOverride/withOverride.js";
import { useUserContext } from "../../../../../usercontext/index.js";
import { FormBase } from "../../../../emailpassword/components/library/formBase.js";
import { defaultValidate } from "../../../../emailpassword/validators.js";
import { preloadPhoneNumberUtils } from "../../../phoneNumberUtils.js";
import { phoneNumberInputWithInjectedProps } from "./phoneNumberInput.js";

var PhoneForm = withOverride("PasswordlessPhoneForm", function PasswordlessPhoneForm(props) {
    var _this = this;
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
        formFields: [
            {
                id: "phoneNumber",
                label: "PWLESS_SIGN_IN_UP_PHONE_LABEL",
                inputComponent: phoneInput,
                optional: false,
                autofocus: true,
                placeholder: "",
                autoComplete: "tel",
                validate: defaultValidate,
            },
        ],
        buttonLabel: "PWLESS_SIGN_IN_UP_CONTINUE_BUTTON",
        onSuccess: props.onSuccess,
        callAPI: function (formFields) {
            return __awaiter(_this, void 0, void 0, function () {
                var phoneNumber, validationRes, response;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
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
                            validationRes = _b.sent();
                            if (validationRes !== undefined) {
                                throw new STGeneralError(validationRes);
                            }
                            return [
                                4 /*yield*/,
                                props.recipeImplementation.createCode({
                                    phoneNumber: phoneNumber,
                                    // shouldTryLinkingWithSessionUser is set by the fn override
                                    userContext: userContext,
                                }),
                            ];
                        case 2:
                            response = _b.sent();
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

export { PhoneForm };
