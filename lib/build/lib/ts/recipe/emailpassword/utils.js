import { __assign, __spreadArray, __awaiter, __generator } from '../../../../_virtual/_tslib.js';
import { normaliseAuthRecipe } from '../authRecipe/utils.js';
import { MANDATORY_FORM_FIELDS_ID_ARRAY } from './constants.js';
import { defaultLoginPasswordValidator, defaultValidate, defaultEmailValidator, defaultPasswordValidator } from './validators.js';

/* Copyright (c) 2021, VRAI Labs and/or its affiliates. All rights reserved.
 *
 * This software is licensed under the Apache License, Version 2.0 (the
 * "License") as published by the Apache Software Foundation.
 *
 * You may not use this file except in compliance with the License. You may
 * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */
function normaliseEmailPasswordConfig(config) {
    if (config === undefined) {
        config = {};
    }
    var signInAndUpFeature = normaliseSignInAndUpFeature(config.signInAndUpFeature);
    var signUpPasswordField = signInAndUpFeature.signUpForm.formFields.find(function (field) {
        return field.id === "password";
    });
    var signUpEmailField = signInAndUpFeature.signUpForm.formFields.find(function (field) {
        return field.id === "email";
    });
    var resetPasswordUsingTokenFeature = normaliseResetPasswordUsingTokenFeature(signUpPasswordField.validate, signUpEmailField, config.resetPasswordUsingTokenFeature);
    var override = __assign({ functions: function (originalImplementation) { return originalImplementation; } }, config.override);
    return __assign(__assign({}, normaliseAuthRecipe(config)), { signInAndUpFeature: signInAndUpFeature, resetPasswordUsingTokenFeature: resetPasswordUsingTokenFeature, override: override });
}
function normaliseSignInAndUpFeature(config) {
    if (config === undefined) {
        config = {};
    }
    var signUpForm = normaliseSignUpFormFeatureConfig(config.signUpForm);
    /*
     * Default Sign In corresponds to computed Sign Up fields filtered by email and password only.
     * i.e. If the user overrides sign Up fields, that is propagated to default sign In fields.
     * Exception made of the password validator which only verifies that the value is not empty for login
     * https://github.com/supertokens/supertokens-auth-react/issues/21
     */
    var defaultSignInFields = signUpForm.formFields.reduce(function (signInFieldsAccumulator, field) {
        if (field.id === "email") {
            return __spreadArray(__spreadArray([], signInFieldsAccumulator, true), [field], false);
        }
        if (field.id === "password") {
            return __spreadArray(__spreadArray([], signInFieldsAccumulator, true), [
                __assign(__assign({}, field), { autoComplete: "current-password", validate: defaultLoginPasswordValidator }),
            ], false);
        }
        return signInFieldsAccumulator;
    }, []);
    var signInForm = normaliseSignInFormFeatureConfig(defaultSignInFields, config.signInForm);
    return {
        signUpForm: signUpForm,
        signInForm: signInForm,
    };
}
function normaliseSignUpFormFeatureConfig(config) {
    if (config === undefined) {
        config = {};
    }
    var defaultFormFields = getDefaultFormFields();
    var userFormFields = [];
    if (config.formFields !== undefined) {
        userFormFields = config.formFields;
    }
    var formFields = mergeFormFields(defaultFormFields, userFormFields);
    var style = config.style !== undefined ? config.style : "";
    return {
        style: style,
        formFields: formFields,
    };
}
function normaliseSignInFormFeatureConfig(defaultFormFields, config) {
    if (config === undefined) {
        config = {};
    }
    var userFormFields = [];
    if (config.formFields !== undefined) {
        userFormFields = config.formFields
            // Filter on email and password only.
            .filter(function (field) { return MANDATORY_FORM_FIELDS_ID_ARRAY.includes(field.id); })
            // Sign In fields are never optional.
            .map(function (field) { return (__assign(__assign({}, field), { optional: false })); });
    }
    var formFields = mergeFormFields(defaultFormFields, userFormFields);
    var style = config.style !== undefined ? config.style : "";
    return {
        style: style,
        formFields: formFields,
    };
}
function getDefaultFormFields() {
    return [getDefaultEmailFormField(), getDefaultPasswordFormField()];
}
function getDefaultEmailFormField() {
    return {
        id: "email",
        label: "EMAIL_PASSWORD_EMAIL_LABEL",
        placeholder: "EMAIL_PASSWORD_EMAIL_PLACEHOLDER",
        validate: defaultEmailValidator,
        optional: false,
        autoComplete: "email",
    };
}
function getDefaultPasswordFormField() {
    return {
        id: "password",
        label: "EMAIL_PASSWORD_PASSWORD_LABEL",
        placeholder: "EMAIL_PASSWORD_PASSWORD_PLACEHOLDER",
        validate: defaultPasswordValidator,
        optional: false,
        autoComplete: "new-password",
    };
}
function normaliseResetPasswordUsingTokenFeature(signUpPasswordFieldValidate, signUpEmailField, config) {
    if (config === undefined) {
        config = {};
    }
    var disableDefaultUI = config.disableDefaultUI === true;
    var submitNewPasswordFormStyle = config.submitNewPasswordForm !== undefined && config.submitNewPasswordForm.style !== undefined
        ? config.submitNewPasswordForm.style
        : "";
    var submitNewPasswordForm = {
        style: submitNewPasswordFormStyle,
        formFields: [
            {
                id: "password",
                label: "EMAIL_PASSWORD_NEW_PASSWORD_LABEL",
                placeholder: "EMAIL_PASSWORD_NEW_PASSWORD_PLACEHOLDER",
                validate: signUpPasswordFieldValidate,
                optional: false,
                autoComplete: "new-password",
            },
            {
                id: "confirm-password",
                label: "EMAIL_PASSWORD_CONFIRM_PASSWORD_LABEL",
                placeholder: "EMAIL_PASSWORD_CONFIRM_PASSWORD_PLACEHOLDER",
                validate: signUpPasswordFieldValidate,
                optional: false,
                autoComplete: "new-password",
            },
        ],
    };
    var enterEmailFormStyle = config.enterEmailForm !== undefined && config.enterEmailForm.style !== undefined
        ? config.enterEmailForm.style
        : "";
    var enterEmailForm = {
        style: enterEmailFormStyle,
        formFields: [
            __assign(__assign({}, getDefaultEmailFormField()), { validate: signUpEmailField.validate, placeholder: "", autofocus: true }),
        ],
    };
    return {
        disableDefaultUI: disableDefaultUI,
        submitNewPasswordForm: submitNewPasswordForm,
        enterEmailForm: enterEmailForm,
    };
}
/*
 * mergeFormFields by keeping the provided order, defaultFormFields or merged first, and unmerged userFormFields after.
 */
function mergeFormFields(defaultFormFields, userFormFields) {
    // Create a new array with default fields.
    var mergedFormFields = defaultFormFields;
    // Loop through user provided fields.
    for (var i = 0; i < userFormFields.length; i++) {
        var userField = userFormFields[i];
        var isNewField = true;
        // Loop through the merged fields array.
        for (var j = 0; j < mergedFormFields.length; j++) {
            var mergedField = mergedFormFields[j];
            // If id is equal, merge the fields
            if (userField.id === mergedField.id) {
                // Make sure that email and password are kept mandatory.
                var optional = mergedField.optional; // Init with default value.
                // If user provided value, overwrite.
                if (userField.optional !== undefined) {
                    optional = userField.optional;
                }
                // If "email" or "password", always mandatory.
                if (MANDATORY_FORM_FIELDS_ID_ARRAY.includes(userField.id)) {
                    optional = false;
                }
                // Merge.
                mergedFormFields[j] = __assign(__assign(__assign({}, mergedFormFields[j]), userField), { optional: optional });
                isNewField = false;
                break;
            }
        }
        // If new field, push to mergeFormFields.
        if (isNewField) {
            mergedFormFields.push(__assign({ optional: false, placeholder: userField.label, validate: defaultValidate }, userField));
        }
    }
    return mergedFormFields.map(function (field) { return getFormattedFormField(field); });
}
function getFormattedFormField(field) {
    var _this = this;
    // Fields with the 'nonOptionalErrorMsg' property must have a valid message defined
    if (field.optional === false && field.nonOptionalErrorMsg === "") {
        throw new Error("nonOptionalErrorMsg for field ".concat(field.id, " cannot be an empty string"));
    }
    return __assign(__assign({}, field), { validate: function (value) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Absent or not optional empty field
                        if (value === "" && field.optional === false) {
                            if (field.nonOptionalErrorMsg !== undefined) {
                                return [2 /*return*/, field.nonOptionalErrorMsg];
                            }
                            return [2 /*return*/, "ERROR_NON_OPTIONAL"];
                        }
                        return [4 /*yield*/, field.validate(value)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); } });
}

export { getDefaultFormFields, getFormattedFormField, mergeFormFields, normaliseEmailPasswordConfig, normaliseResetPasswordUsingTokenFeature, normaliseSignInAndUpFeature, normaliseSignInFormFeatureConfig, normaliseSignUpFormFeatureConfig };
