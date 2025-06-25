import { __assign, __awaiter, __generator } from '../../../../../../../_virtual/_tslib.js';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
import { withOverride } from '../../../../../components/componentOverride/withOverride.js';
import { useTranslation } from '../../../../../translation/translationContext.js';
import { useUserContext } from '../../../../../usercontext/index.js';
import { validateForm } from '../../../../../utils.js';
import BackButton from '../../library/backButton.js';
import BackToSignInButton from '../../library/backToSignInButton.js';
import { FormBase } from '../../library/formBase.js';
import GeneralError from '../../library/generalError.js';

var EmailPasswordResetPasswordEmail = function (props) {
    var t = useTranslation();
    var userContext = useUserContext();
    var _a = useState("READY"), status = _a[0], setStatus = _a[1];
    var _b = useState(""), emailFieldValue = _b[0], setEmailFieldValue = _b[1];
    var onSuccess = function () {
        setStatus("SENT");
    };
    var resend = function () {
        setStatus("READY");
    };
    var formFields = props.formFields;
    var emailSuccessText = t("EMAIL_PASSWORD_RESET_SEND_BEFORE_EMAIL") +
        (emailFieldValue !== undefined && emailFieldValue.length > 0
            ? emailFieldValue
            : t("EMAIL_PASSWORD_RESET_SEND_FALLBACK_EMAIL")) +
        t("EMAIL_PASSWORD_RESET_SEND_AFTER_EMAIL");
    if (status === "SENT") {
        return (jsx("div", __assign({ "data-supertokens": "container" }, { children: jsxs("div", __assign({ "data-supertokens": "row" }, { children: [jsxs("div", __assign({ "data-supertokens": "primaryText enterEmailSuccessMessage" }, { children: [emailSuccessText, jsx("span", __assign({ "data-supertokens": "link resendEmailLink", onClick: resend }, { children: t("EMAIL_PASSWORD_RESET_RESEND_LINK") }))] })), jsx(BackToSignInButton, { onClick: props.onBackButtonClicked })] })) })));
    }
    // Otherwise, return Form.
    return (jsx("div", __assign({ "data-supertokens": "container resetPasswordEmailForm" }, { children: jsxs("div", __assign({ "data-supertokens": "row" }, { children: [jsxs("div", __assign({ "data-supertokens": "headerTitle withBackButton" }, { children: [jsx(BackButton, { onClick: props.onBackButtonClicked }), t("EMAIL_PASSWORD_RESET_HEADER_TITLE"), jsx("span", { "data-supertokens": "backButtonPlaceholder backButtonCommon" })] })), jsx("div", __assign({ "data-supertokens": "headerSubtitle secondaryText" }, { children: t("EMAIL_PASSWORD_RESET_HEADER_SUBTITLE") })), props.error !== undefined && jsx(GeneralError, { error: props.error }), jsx(FormBase, { clearError: props.clearError, onError: props.onError, formFields: formFields, buttonLabel: "EMAIL_PASSWORD_RESET_SEND_BTN", onSuccess: onSuccess, callAPI: function (formFields) { return __awaiter(void 0, void 0, void 0, function () {
                        var validationErrors, emailField, resp;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, validateForm(formFields, props.config.resetPasswordUsingTokenFeature.enterEmailForm.formFields)];
                                case 1:
                                    validationErrors = _a.sent();
                                    if (validationErrors.length > 0) {
                                        return [2 /*return*/, {
                                                status: "FIELD_ERROR",
                                                formFields: validationErrors,
                                            }];
                                    }
                                    emailField = formFields.find(function (field) {
                                        return field.id === "email";
                                    });
                                    if (emailField !== undefined) {
                                        setEmailFieldValue(emailField.value);
                                    }
                                    return [4 /*yield*/, props.recipeImplementation.sendPasswordResetEmail({
                                            formFields: formFields,
                                            userContext: userContext,
                                        })];
                                case 2:
                                    resp = _a.sent();
                                    if (resp.status === "PASSWORD_RESET_NOT_ALLOWED") {
                                        return [2 /*return*/, {
                                                status: "FIELD_ERROR",
                                                formFields: [{ id: "email", error: resp.reason }],
                                            }];
                                    }
                                    return [2 /*return*/, resp];
                            }
                        });
                    }); }, showLabels: true, validateOnBlur: true })] })) })));
};
var ResetPasswordEmail = withOverride("EmailPasswordResetPasswordEmail", EmailPasswordResetPasswordEmail);

export { ResetPasswordEmail };
