import { __awaiter, __generator, __assign } from "./_virtual/_tslib.js";
import { getNormalisedUserContext } from "./lib/ts/utils.js";
import { RecipeComponentsOverrideContextProvider as Provider } from "./lib/ts/recipe/passwordless/componentOverrideContext.js";
import Passwordless from "./lib/ts/recipe/passwordless/recipe.js";

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
        return Passwordless.init(config);
    };
    Wrapper.signOut = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [
                    2 /*return*/,
                    Passwordless.getInstanceOrThrow().signOut({
                        userContext: getNormalisedUserContext(
                            input === null || input === void 0 ? void 0 : input.userContext
                        ),
                    }),
                ];
            });
        });
    };
    Wrapper.createCode = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [
                    2 /*return*/,
                    Passwordless.getInstanceOrThrow().webJSRecipe.createCode(
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
    Wrapper.resendCode = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [
                    2 /*return*/,
                    Passwordless.getInstanceOrThrow().webJSRecipe.resendCode(
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
    Wrapper.consumeCode = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [
                    2 /*return*/,
                    Passwordless.getInstanceOrThrow().webJSRecipe.consumeCode(
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
    Wrapper.getLinkCodeFromURL = function (input) {
        return Passwordless.getInstanceOrThrow().webJSRecipe.getLinkCodeFromURL(
            __assign(__assign({}, input), {
                userContext: getNormalisedUserContext(input === null || input === void 0 ? void 0 : input.userContext),
            })
        );
    };
    Wrapper.getPreAuthSessionIdFromURL = function (input) {
        return Passwordless.getInstanceOrThrow().webJSRecipe.getPreAuthSessionIdFromURL(
            __assign(__assign({}, input), {
                userContext: getNormalisedUserContext(input === null || input === void 0 ? void 0 : input.userContext),
            })
        );
    };
    Wrapper.doesEmailExist = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [
                    2 /*return*/,
                    Passwordless.getInstanceOrThrow().webJSRecipe.doesEmailExist(
                        __assign(__assign({}, input), { userContext: getNormalisedUserContext(input.userContext) })
                    ),
                ];
            });
        });
    };
    Wrapper.doesPhoneNumberExist = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [
                    2 /*return*/,
                    Passwordless.getInstanceOrThrow().webJSRecipe.doesPhoneNumberExist(
                        __assign(__assign({}, input), { userContext: getNormalisedUserContext(input.userContext) })
                    ),
                ];
            });
        });
    };
    Wrapper.getLoginAttemptInfo = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [
                    2 /*return*/,
                    Passwordless.getInstanceOrThrow().webJSRecipe.getLoginAttemptInfo(
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
    Wrapper.setLoginAttemptInfo = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [
                    2 /*return*/,
                    Passwordless.getInstanceOrThrow().webJSRecipe.setLoginAttemptInfo(
                        __assign(__assign({}, input), { userContext: getNormalisedUserContext(input.userContext) })
                    ),
                ];
            });
        });
    };
    Wrapper.clearLoginAttemptInfo = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [
                    2 /*return*/,
                    Passwordless.getInstanceOrThrow().webJSRecipe.clearLoginAttemptInfo(
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
    Wrapper.ComponentsOverrideProvider = Provider;
    return Wrapper;
})();
var init = Wrapper.init;
var createCode = Wrapper.createCode;
var resendCode = Wrapper.resendCode;
var consumeCode = Wrapper.consumeCode;
var getLinkCodeFromURL = Wrapper.getLinkCodeFromURL;
var getPreAuthSessionIdFromURL = Wrapper.getPreAuthSessionIdFromURL;
var doesEmailExist = Wrapper.doesEmailExist;
var doesPhoneNumberExist = Wrapper.doesPhoneNumberExist;
var getLoginAttemptInfo = Wrapper.getLoginAttemptInfo;
var setLoginAttemptInfo = Wrapper.setLoginAttemptInfo;
var clearLoginAttemptInfo = Wrapper.clearLoginAttemptInfo;
var signOut = Wrapper.signOut;
var PasswordlessComponentsOverrideProvider = Wrapper.ComponentsOverrideProvider;

export {
    PasswordlessComponentsOverrideProvider,
    clearLoginAttemptInfo,
    consumeCode,
    createCode,
    Wrapper as default,
    doesEmailExist,
    doesPhoneNumberExist,
    getLinkCodeFromURL,
    getLoginAttemptInfo,
    getPreAuthSessionIdFromURL,
    init,
    resendCode,
    setLoginAttemptInfo,
    signOut,
};
