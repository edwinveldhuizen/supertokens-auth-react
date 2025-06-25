import { __assign, __awaiter, __generator } from '../../../../../../../_virtual/_tslib.js';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
import STGeneralError from 'supertokens-web-js/lib/build/error';
import { withOverride } from '../../../../../components/componentOverride/withOverride.js';
import { useTranslation } from '../../../../../translation/translationContext.js';
import { useUserContext } from '../../../../../usercontext/index.js';
import '../../../../../../../index.js';
import Label from '../../../../emailpassword/components/library/label.js';
import BackButton from '../../../../emailpassword/components/library/backButton.js';
import { FormBase } from '../../../../emailpassword/components/library/formBase.js';
import GeneralError from '../../../../emailpassword/components/library/generalError.js';
import { defaultEmailValidator } from '../../../../emailpassword/validators.js';

var WebauthnRecoverAccountForm = withOverride("WebauthnRecoverAccountForm", function (props) {
    var userContext = useUserContext();
    return (jsx(FormBase, { clearError: function () { return props.setError(undefined); }, onFetchError: function () { return props.setError("WEBAUTHN_ACCOUNT_RECOVERY_GENERAL_ERROR"); }, onError: function () { return props.setError("WEBAUTHN_ACCOUNT_RECOVERY_GENERAL_ERROR"); }, formFields: [
            {
                id: "email",
                label: "",
                labelComponent: (jsx("div", __assign({ "data-supertokens": "formLabelWithLinkWrapper" }, { children: jsx(Label, { value: "WEBAUTHN_SIGN_UP_LABEL", "data-supertokens": "emailInputLabel" }) }))),
                optional: false,
                autofocus: true,
                placeholder: "",
                autoComplete: "email",
                // We are using the default validator that allows any string
                validate: defaultEmailValidator,
            },
        ], buttonLabel: "WEBAUTHN_EMAIL_CONTINUE_BUTTON", onSuccess: props.onSuccess, callAPI: function (formFields) { return __awaiter(void 0, void 0, void 0, function () {
            var email, res;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        email = (_a = formFields.find(function (field) { return field.id === "email"; })) === null || _a === void 0 ? void 0 : _a.value;
                        if (email === undefined) {
                            throw new STGeneralError("GENERAL_ERROR_EMAIL_UNDEFINED");
                        }
                        return [4 /*yield*/, props.recipeImplementation.generateRecoverAccountToken({
                                email: email,
                                userContext: userContext,
                            })];
                    case 1:
                        res = _b.sent();
                        if (res.status === "RECOVER_ACCOUNT_NOT_ALLOWED") {
                            props.setError("WEBAUTHN_ACCOUNT_RECOVERY_NOT_ALLOWED_LABEL");
                        }
                        return [2 /*return*/, __assign(__assign({}, res), { email: email })];
                }
            });
        }); }, validateOnBlur: false, showLabels: true }));
});
var WebauthnRecoverAccount = withOverride("WebauthnRecoverAccount", function (props) {
    var t = useTranslation();
    var _a = useState(undefined), errorLabel = _a[0], setErrorLabel = _a[1];
    return (jsxs("div", __assign({ "data-supertokens": "passkeyRecoverAccountFormContainer" }, { children: [jsxs("div", __assign({ "data-supertokens": "passkeyRecoverAccountFormHeaderWrapper" }, { children: [jsxs("div", __assign({ "data-supertokens": "passkeyRecoverAccountFormHeader headerTitle withBackButton" }, { children: [jsx(BackButton, { onClick: props.onBackClick }), t("WEBAUTHN_RECOVER_ACCOUNT_LABEL"), jsx("span", { "data-supertokens": "backButtonPlaceholder backButtonCommon" })] })), jsx("div", __assign({ "data-supertokens": "passkeyRecoverAccountFormSubHeader" }, { children: t("WEBAUTHN_RECOVER_ACCOUNT_SUBHEADER_LABEL") }))] })), errorLabel !== undefined && (jsx("div", __assign({ "data-supertokens": "errorContainer" }, { children: jsx(GeneralError, { error: errorLabel }) }))), jsx(WebauthnRecoverAccountForm, __assign({}, props, { setError: setErrorLabel }))] })));
});

export { WebauthnRecoverAccount, WebauthnRecoverAccountForm };
