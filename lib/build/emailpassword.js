import { __awaiter, __generator, __assign } from './_virtual/_tslib.js';
import { getNormalisedUserContext } from './lib/ts/utils.js';
import { RecipeComponentsOverrideContextProvider as Provider } from './lib/ts/recipe/emailpassword/componentOverrideContext.js';
import EmailPassword from './lib/ts/recipe/emailpassword/recipe.js';

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
    function Wrapper() {
    }
    Wrapper.init = function (config) {
        return EmailPassword.init(config);
    };
    Wrapper.signOut = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, EmailPassword.getInstanceOrThrow().signOut({
                        userContext: getNormalisedUserContext(input === null || input === void 0 ? void 0 : input.userContext),
                    })];
            });
        });
    };
    Wrapper.submitNewPassword = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, EmailPassword.getInstanceOrThrow().webJSRecipe.submitNewPassword(__assign(__assign({}, input), { userContext: getNormalisedUserContext(input.userContext) }))];
            });
        });
    };
    Wrapper.sendPasswordResetEmail = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, EmailPassword.getInstanceOrThrow().webJSRecipe.sendPasswordResetEmail(__assign(__assign({}, input), { userContext: getNormalisedUserContext(input.userContext) }))];
            });
        });
    };
    Wrapper.signUp = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, EmailPassword.getInstanceOrThrow().webJSRecipe.signUp(__assign(__assign({}, input), { userContext: getNormalisedUserContext(input.userContext) }))];
            });
        });
    };
    Wrapper.signIn = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, EmailPassword.getInstanceOrThrow().webJSRecipe.signIn(__assign(__assign({}, input), { userContext: getNormalisedUserContext(input.userContext) }))];
            });
        });
    };
    Wrapper.doesEmailExist = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, EmailPassword.getInstanceOrThrow().webJSRecipe.doesEmailExist(__assign(__assign({}, input), { userContext: getNormalisedUserContext(input.userContext) }))];
            });
        });
    };
    Wrapper.getResetPasswordTokenFromURL = function (input) {
        return EmailPassword.getInstanceOrThrow().webJSRecipe.getResetPasswordTokenFromURL(__assign(__assign({}, input), { userContext: getNormalisedUserContext(input === null || input === void 0 ? void 0 : input.userContext) }));
    };
    Wrapper.ComponentsOverrideProvider = Provider;
    return Wrapper;
}());
var init = Wrapper.init;
var signOut = Wrapper.signOut;
var submitNewPassword = Wrapper.submitNewPassword;
var sendPasswordResetEmail = Wrapper.sendPasswordResetEmail;
var signUp = Wrapper.signUp;
var signIn = Wrapper.signIn;
var doesEmailExist = Wrapper.doesEmailExist;
var getResetPasswordTokenFromURL = Wrapper.getResetPasswordTokenFromURL;
var EmailPasswordComponentsOverrideProvider = Wrapper.ComponentsOverrideProvider;

export { EmailPasswordComponentsOverrideProvider, Wrapper as default, doesEmailExist, getResetPasswordTokenFromURL, init, sendPasswordResetEmail, signIn, signOut, signUp, submitNewPassword };
