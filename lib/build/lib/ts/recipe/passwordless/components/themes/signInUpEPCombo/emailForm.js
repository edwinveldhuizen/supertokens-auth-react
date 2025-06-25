import { __assign, __awaiter, __generator } from '../../../../../../../_virtual/_tslib.js';
import { jsxs, jsx } from 'react/jsx-runtime';
import STGeneralError from 'supertokens-web-js/utils/error';
import { withOverride } from '../../../../../components/componentOverride/withOverride.js';
import { useTranslation } from '../../../../../translation/translationContext.js';
import { getTenantIdFromQueryParams } from '../../../../../utils.js';
import '../../../../../../../index.js';
import 'react';
import Label from '../../../../emailpassword/components/library/label.js';
import { FormBase } from '../../../../emailpassword/components/library/formBase.js';
import EmailPassword from '../../../../emailpassword/recipe.js';
import { defaultValidate } from '../../../validators.js';
import { ContinueWithPasswordlessFooter } from './continueWithPasswordlessFooter.js';

var EPComboEmailForm = withOverride("PasswordlessEPComboEmailForm", function PasswordlessEPComboEmailForm(props) {
    var _this = this;
    var t = useTranslation();
    var formFields = [
        {
            id: "email",
            label: "PWLESS_SIGN_IN_UP_EMAIL_LABEL",
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
            labelComponent: (jsxs("div", __assign({ "data-supertokens": "formLabelWithLinkWrapper" }, { children: [jsx(Label, { value: "PWLESS_COMBO_PASSWORD_LABEL", "data-supertokens": "passwordInputLabel" }), jsx("a", __assign({ onClick: function () {
                            return EmailPassword.getInstanceOrThrow().redirect({
                                action: "RESET_PASSWORD",
                                tenantIdFromQueryParams: getTenantIdFromQueryParams(),
                            }, props.navigate);
                        }, "data-supertokens": "link linkButton formLabelLinkBtn forgotPasswordLink" }, { children: t("PWLESS_COMBO_FORGOT_PW_LINK") }))] }))),
        });
    }
    return (jsx(FormBase, { clearError: props.clearError, onFetchError: props.onFetchError, onError: props.onError, formFields: formFields, buttonLabel: "PWLESS_SIGN_IN_UP_CONTINUE_BUTTON", onSuccess: props.onSuccess, callAPI: function (formFields) { return __awaiter(_this, void 0, void 0, function () {
            var email, validationRes;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        email = (_a = formFields.find(function (field) { return field.id === "email"; })) === null || _a === void 0 ? void 0 : _a.value;
                        if (email === undefined) {
                            throw new STGeneralError("GENERAL_ERROR_EMAIL_UNDEFINED");
                        }
                        return [4 /*yield*/, props.config.validateEmailAddress(email)];
                    case 1:
                        validationRes = _b.sent();
                        if (validationRes !== undefined) {
                            throw new STGeneralError(validationRes);
                        }
                        if (props.showPasswordField) {
                            return [2 /*return*/, props.onPasswordSubmit(formFields)];
                        }
                        else {
                            return [2 /*return*/, props.onContactInfoSubmit(email)];
                        }
                }
            });
        }); }, validateOnBlur: false, showLabels: true, footer: props.showContinueWithPasswordlessLink ? (jsx(ContinueWithPasswordlessFooter, { isPhoneNumber: false, onContinueWithPasswordlessClick: props.onContinueWithPasswordlessClick, onError: props.onError, config: props.config, validatePhoneNumber: props.validatePhoneNumber })) : undefined }));
});

export { EPComboEmailForm };
