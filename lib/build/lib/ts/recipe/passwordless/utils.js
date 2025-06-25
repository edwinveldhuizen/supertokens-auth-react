import { __assign } from "../../../../_virtual/_tslib.js";
import { normaliseAuthRecipe } from "../authRecipe/utils.js";
import { defaultEmailValidator } from "./validators.js";

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
function normalisePasswordlessConfig(config) {
    if (config === undefined) {
        throw new Error("Passwordless config should not be empty");
    }
    if (!["EMAIL", "PHONE", "EMAIL_OR_PHONE"].includes(config.contactMethod)) {
        throw new Error("Please pass one of 'PHONE', 'EMAIL' or 'EMAIL_OR_PHONE' as the contactMethod");
    }
    var signInUpFeature = normalizeSignInUpFeatureConfig(config.signInUpFeature, config);
    var override = __assign(
        {
            functions: function (originalImplementation) {
                return originalImplementation;
            },
        },
        config.override
    );
    var validateEmailAddress = defaultEmailValidator;
    if (
        (config.contactMethod === "EMAIL" || config.contactMethod === "EMAIL_OR_PHONE") &&
        config.validateEmailAddress !== undefined
    ) {
        validateEmailAddress = config.validateEmailAddress;
    }
    var validatePhoneNumber = undefined;
    if (
        (config.contactMethod === "PHONE" || config.contactMethod === "EMAIL_OR_PHONE") &&
        config.validatePhoneNumber !== undefined
    ) {
        validatePhoneNumber = config.validatePhoneNumber;
    }
    return __assign(__assign({}, normaliseAuthRecipe(config)), {
        validateEmailAddress: validateEmailAddress,
        validatePhoneNumber: validatePhoneNumber,
        signInUpFeature: signInUpFeature,
        linkClickedScreenFeature: normalisePasswordlessBaseConfig(config.linkClickedScreenFeature),
        mfaFeature: normalisePasswordlessBaseConfig(config.mfaFeature),
        contactMethod: config.contactMethod,
        override: override,
    });
}
function normalizeSignInUpFeatureConfig(signInUpInput, config) {
    if (
        (signInUpInput === null || signInUpInput === void 0 ? void 0 : signInUpInput.resendEmailOrSMSGapInSeconds) !==
            undefined &&
        signInUpInput.resendEmailOrSMSGapInSeconds <= 0
    ) {
        throw new Error("Please pass a positive number as resendEmailOrSMSGapInSeconds");
    }
    return __assign(__assign({}, signInUpInput), {
        resendEmailOrSMSGapInSeconds:
            (signInUpInput === null || signInUpInput === void 0
                ? void 0
                : signInUpInput.resendEmailOrSMSGapInSeconds) === undefined
                ? 15
                : signInUpInput.resendEmailOrSMSGapInSeconds,
        emailOrPhoneFormStyle:
            (signInUpInput === null || signInUpInput === void 0 ? void 0 : signInUpInput.emailOrPhoneFormStyle) !==
            undefined
                ? signInUpInput.emailOrPhoneFormStyle
                : "",
        linkSentScreenStyle:
            (signInUpInput === null || signInUpInput === void 0 ? void 0 : signInUpInput.linkSentScreenStyle) !==
            undefined
                ? signInUpInput.linkSentScreenStyle
                : "",
        userInputCodeFormStyle:
            (signInUpInput === null || signInUpInput === void 0 ? void 0 : signInUpInput.userInputCodeFormStyle) !==
            undefined
                ? signInUpInput.userInputCodeFormStyle
                : "",
        defaultCountry:
            ["PHONE", "EMAIL_OR_PHONE"].includes(config.contactMethod) &&
            signInUpInput !== undefined &&
            "defaultCountry" in signInUpInput
                ? signInUpInput.defaultCountry
                : undefined,
        defaultToEmail:
            signInUpInput !== undefined &&
            "defaultToEmail" in signInUpInput &&
            signInUpInput.defaultToEmail !== undefined
                ? signInUpInput.defaultToEmail
                : true,
    });
}
function normalisePasswordlessBaseConfig(config) {
    var style = config && config.style !== undefined ? config.style : "";
    return __assign(__assign({}, config), { style: style });
}
function checkAdditionalLoginAttemptInfoProperties(loginAttemptInfo) {
    if (
        loginAttemptInfo.contactInfo === undefined ||
        loginAttemptInfo.contactMethod === undefined ||
        loginAttemptInfo.lastResend === undefined
    ) {
        return false;
    }
    return true;
}

export { checkAdditionalLoginAttemptInfoProperties, normalisePasswordlessConfig };
