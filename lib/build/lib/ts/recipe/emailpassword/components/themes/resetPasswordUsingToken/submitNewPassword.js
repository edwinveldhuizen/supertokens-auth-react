import { __assign, __awaiter, __generator } from '../../../../../../../_virtual/_tslib.js';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, Fragment } from 'react';
import STGeneralError from 'supertokens-web-js/utils/error';
import { withOverride } from '../../../../../components/componentOverride/withOverride.js';
import { useTranslation } from '../../../../../translation/translationContext.js';
import { useUserContext } from '../../../../../usercontext/index.js';
import { validateForm } from '../../../../../utils.js';
import Button from '../../library/button.js';
import FormRow from '../../library/formRow.js';
import '../../../../../../../index.js';
import { FormBase } from '../../library/formBase.js';
import GeneralError from '../../library/generalError.js';

var EmailPasswordSubmitNewPassword = function (props) {
    var t = useTranslation();
    var userContext = useUserContext();
    var _a = useState("READY"), status = _a[0], setStatus = _a[1];
    var onSuccess = function () {
        setStatus("SUCCESS");
    };
    var formFields = props.formFields, onSignInClicked = props.onSignInClicked;
    if (status === "SUCCESS") {
        return (jsx("div", __assign({ "data-supertokens": "container" }, { children: jsxs("div", __assign({ "data-supertokens": "row" }, { children: [jsx("div", __assign({ "data-supertokens": "headerTitle" }, { children: t("EMAIL_PASSWORD_RESET_SUBMIT_PW_SUCCESS_HEADER_TITLE") })), jsx(FormRow, { children: jsxs(Fragment, { children: [jsx("div", __assign({ "data-supertokens": "primaryText submitNewPasswordSuccessMessage" }, { children: t("EMAIL_PASSWORD_RESET_SUBMIT_PW_SUCCESS_DESC") })), jsx(Button, { disabled: false, isLoading: false, type: "button", onClick: onSignInClicked, label: "EMAIL_PASSWORD_RESET_SUBMIT_PW_SUCCESS_SIGN_IN_BTN" })] }) }, "form-button")] })) })));
    }
    return (jsx("div", __assign({ "data-supertokens": "container resetPasswordPasswordForm" }, { children: jsxs("div", __assign({ "data-supertokens": "row" }, { children: [jsx("div", __assign({ "data-supertokens": "headerTitle" }, { children: t("EMAIL_PASSWORD_RESET_SUBMIT_PW_HEADER_TITLE") })), jsx("div", __assign({ "data-supertokens": "headerSubtitle secondaryText" }, { children: t("EMAIL_PASSWORD_RESET_SUBMIT_PW_HEADER_SUBTITLE") })), props.error !== undefined && jsx(GeneralError, { error: props.error }), jsx(FormBase, { formFields: formFields, clearError: props.clearError, onError: props.onError, buttonLabel: "EMAIL_PASSWORD_RESET_SUBMIT_PW_CHANGE_PW_BTN", onSuccess: onSuccess, validateOnBlur: true, callAPI: function (fields) { return __awaiter(void 0, void 0, void 0, function () {
                        var validationErrors, response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, validateForm(fields, props.config.resetPasswordUsingTokenFeature.submitNewPasswordForm.formFields)];
                                case 1:
                                    validationErrors = _a.sent();
                                    if (validationErrors.length > 0) {
                                        return [2 /*return*/, {
                                                status: "FIELD_ERROR",
                                                formFields: validationErrors,
                                            }];
                                    }
                                    // Verify that both passwords match.
                                    if (fields[0].value !== fields[1].value) {
                                        return [2 /*return*/, {
                                                status: "FIELD_ERROR",
                                                formFields: [
                                                    {
                                                        id: fields[1].id,
                                                        error: "ERROR_CONFIRM_PASSWORD_NO_MATCH",
                                                    },
                                                ],
                                            }];
                                    }
                                    return [4 /*yield*/, props.recipeImplementation.submitNewPassword({
                                            formFields: fields,
                                            userContext: userContext,
                                        })];
                                case 2:
                                    response = _a.sent();
                                    if (response.status === "RESET_PASSWORD_INVALID_TOKEN_ERROR") {
                                        throw new STGeneralError("EMAIL_PASSWORD_RESET_PASSWORD_INVALID_TOKEN_ERROR");
                                    }
                                    return [2 /*return*/, response.status === "FIELD_ERROR"
                                            ? response
                                            : {
                                                status: "OK",
                                            }];
                            }
                        });
                    }); }, showLabels: true })] })) })));
};
var SubmitNewPassword = withOverride("EmailPasswordSubmitNewPassword", EmailPasswordSubmitNewPassword);

export { SubmitNewPassword };
