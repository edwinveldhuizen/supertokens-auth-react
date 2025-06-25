import { __awaiter, __generator } from "../../../../../../../_virtual/_tslib.js";
import { jsx } from "react/jsx-runtime";
import STGeneralError from "supertokens-web-js/utils/error";
import { withOverride } from "../../../../../components/componentOverride/withOverride.js";
import { useUserContext } from "../../../../../usercontext/index.js";
import { FormBase } from "../../../../emailpassword/components/library/formBase.js";
import { defaultValidate } from "../../../../emailpassword/validators.js";

var EmailForm = withOverride("PasswordlessEmailForm", function PasswordlessEmailForm(props) {
    var _this = this;
    var userContext = useUserContext();
    return jsx(FormBase, {
        clearError: props.clearError,
        onFetchError: props.onFetchError,
        onError: props.onError,
        formFields: [
            {
                id: "email",
                label: "PWLESS_SIGN_IN_UP_EMAIL_LABEL",
                optional: false,
                autofocus: true,
                placeholder: "",
                autoComplete: "email",
                // We are using the default validator that allows any string
                validate: defaultValidate,
            },
        ],
        buttonLabel: "PWLESS_SIGN_IN_UP_CONTINUE_BUTTON",
        onSuccess: props.onSuccess,
        callAPI: function (formFields) {
            return __awaiter(_this, void 0, void 0, function () {
                var email, validationRes, response;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            email =
                                (_a = formFields.find(function (field) {
                                    return field.id === "email";
                                })) === null || _a === void 0
                                    ? void 0
                                    : _a.value;
                            if (email === undefined) {
                                throw new STGeneralError("GENERAL_ERROR_EMAIL_UNDEFINED");
                            }
                            return [4 /*yield*/, props.config.validateEmailAddress(email)];
                        case 1:
                            validationRes = _b.sent();
                            if (validationRes !== undefined) {
                                throw new STGeneralError(validationRes);
                            }
                            return [
                                4 /*yield*/,
                                props.recipeImplementation.createCode({
                                    email: email,
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

export { EmailForm };
