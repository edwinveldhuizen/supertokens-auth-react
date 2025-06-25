import { __assign, __awaiter, __generator } from "../../../../_virtual/_tslib.js";
import { normaliseRecipeModuleConfig } from "../recipeModule/utils.js";

/* Copyright (c) 2024, VRAI Labs and/or its affiliates. All rights reserved.
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
function normaliseMultiFactorAuthFeature(config) {
    if (config === undefined) {
        config = {};
    }
    var override = __assign(
        {
            functions: function (originalImplementation) {
                return originalImplementation;
            },
        },
        config.override
    );
    return __assign(__assign({}, normaliseRecipeModuleConfig(config)), {
        totpMFAScreen: __assign(
            {
                disableDefaultUI: false,
                blockedScreenStyle: "",
                setupScreenStyle: "",
                verificationScreenStyle: "",
                loadingScreenStyle: "",
            },
            config.totpMFAScreen
        ),
        override: override,
    });
}
function totpCodeValidate(value) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (typeof value !== "string") {
                return [2 /*return*/, "GENERAL_ERROR_TOTP_NON_STRING"];
            }
            if (value.length === 0) {
                return [2 /*return*/, "GENERAL_ERROR_TOTP_EMPTY"];
            }
            return [2 /*return*/, undefined];
        });
    });
}

export { normaliseMultiFactorAuthFeature, totpCodeValidate };
