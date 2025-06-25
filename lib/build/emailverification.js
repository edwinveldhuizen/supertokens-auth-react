import { __awaiter, __generator, __assign } from "./_virtual/_tslib.js";
import { getNormalisedUserContext } from "./lib/ts/utils.js";
import { RecipeComponentsOverrideContextProvider as Provider } from "./lib/ts/recipe/emailverification/componentOverrideContext.js";
import EmailVerification from "./lib/ts/recipe/emailverification/recipe.js";

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
var Wrapper = /** @class */ (function () {
    function Wrapper() {}
    Wrapper.init = function (config) {
        return EmailVerification.init(config);
    };
    Wrapper.isEmailVerified = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [
                    2 /*return*/,
                    EmailVerification.getInstanceOrThrow().webJSRecipe.isEmailVerified(
                        __assign(__assign({}, input), {
                            userContext: getNormalisedUserContext(
                                input === null || input === void 0 ? void 0 : input.userContext
                            ),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.verifyEmail = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [
                    2 /*return*/,
                    EmailVerification.getInstanceOrThrow().webJSRecipe.verifyEmail(
                        __assign(__assign({}, input), {
                            userContext: getNormalisedUserContext(
                                input === null || input === void 0 ? void 0 : input.userContext
                            ),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.sendVerificationEmail = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [
                    2 /*return*/,
                    EmailVerification.getInstanceOrThrow().webJSRecipe.sendVerificationEmail(
                        __assign(__assign({}, input), {
                            userContext: getNormalisedUserContext(
                                input === null || input === void 0 ? void 0 : input.userContext
                            ),
                        })
                    ),
                ];
            });
        });
    };
    Wrapper.getEmailVerificationTokenFromURL = function (input) {
        return EmailVerification.getInstanceOrThrow().webJSRecipe.getEmailVerificationTokenFromURL(
            __assign(__assign({}, input), {
                userContext: getNormalisedUserContext(input === null || input === void 0 ? void 0 : input.userContext),
            })
        );
    };
    Wrapper.EmailVerificationClaim = EmailVerification.EmailVerificationClaim;
    Wrapper.ComponentsOverrideProvider = Provider;
    return Wrapper;
})();
var init = Wrapper.init;
var isEmailVerified = Wrapper.isEmailVerified;
var verifyEmail = Wrapper.verifyEmail;
var sendVerificationEmail = Wrapper.sendVerificationEmail;
var getEmailVerificationTokenFromURL = Wrapper.getEmailVerificationTokenFromURL;
var EmailVerificationComponentsOverrideProvider = Wrapper.ComponentsOverrideProvider;
var EmailVerificationClaim = EmailVerification.EmailVerificationClaim;

export {
    EmailVerificationClaim,
    EmailVerificationComponentsOverrideProvider,
    Wrapper as default,
    getEmailVerificationTokenFromURL,
    init,
    isEmailVerified,
    sendVerificationEmail,
    verifyEmail,
};
