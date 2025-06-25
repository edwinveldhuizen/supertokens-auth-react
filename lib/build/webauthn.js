import { RecipeComponentsOverrideContextProvider as Provider } from "./lib/ts/recipe/webauthn/componentOverrideContext.js";
import Webauthn from "./lib/ts/recipe/webauthn/recipe.js";

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
        return Webauthn.init(config);
    };
    Wrapper.getRegisterOptions = function (input) {
        return Webauthn.getInstanceOrThrow().webJSRecipe.getRegisterOptions(input);
    };
    Wrapper.getSignInOptions = function (input) {
        return Webauthn.getInstanceOrThrow().webJSRecipe.getSignInOptions(input);
    };
    Wrapper.signUp = function (input) {
        return Webauthn.getInstanceOrThrow().webJSRecipe.signUp(input);
    };
    Wrapper.signIn = function (input) {
        return Webauthn.getInstanceOrThrow().webJSRecipe.signIn(input);
    };
    Wrapper.getEmailExists = function (input) {
        return Webauthn.getInstanceOrThrow().webJSRecipe.getEmailExists(input);
    };
    Wrapper.generateRecoverAccountToken = function (input) {
        return Webauthn.getInstanceOrThrow().webJSRecipe.generateRecoverAccountToken(input);
    };
    Wrapper.recoverAccount = function (input) {
        return Webauthn.getInstanceOrThrow().webJSRecipe.recoverAccount(input);
    };
    Wrapper.registerCredential = function (input) {
        return Webauthn.getInstanceOrThrow().webJSRecipe.registerCredential(input);
    };
    Wrapper.authenticateCredential = function (input) {
        return Webauthn.getInstanceOrThrow().webJSRecipe.authenticateCredential(input);
    };
    Wrapper.registerCredentialWithSignUp = function (input) {
        return Webauthn.getInstanceOrThrow().webJSRecipe.registerCredentialWithSignUp(input);
    };
    Wrapper.authenticateCredentialWithSignIn = function (input) {
        return Webauthn.getInstanceOrThrow().webJSRecipe.authenticateCredentialWithSignIn(input);
    };
    Wrapper.registerCredentialWithRecoverAccount = function (input) {
        return Webauthn.getInstanceOrThrow().webJSRecipe.registerCredentialWithRecoverAccount(input);
    };
    Wrapper.doesBrowserSupportWebAuthn = function (input) {
        return Webauthn.getInstanceOrThrow().webJSRecipe.doesBrowserSupportWebAuthn(input);
    };
    Wrapper.ComponentsOverrideProvider = Provider;
    return Wrapper;
})();
var init = Wrapper.init;
var getRegisterOptions = Wrapper.getRegisterOptions;
var getSignInOptions = Wrapper.getSignInOptions;
var signUp = Wrapper.signUp;
var signIn = Wrapper.signIn;
var getEmailExists = Wrapper.getEmailExists;
var generateRecoverAccountToken = Wrapper.generateRecoverAccountToken;
var recoverAccount = Wrapper.recoverAccount;
var registerCredential = Wrapper.registerCredential;
var authenticateCredential = Wrapper.authenticateCredential;
var registerCredentialWithSignUp = Wrapper.registerCredentialWithSignUp;
var authenticateCredentialWithSignIn = Wrapper.authenticateCredentialWithSignIn;
var registerCredentialWithRecoverAccount = Wrapper.registerCredentialWithRecoverAccount;
var doesBrowserSupportWebAuthn = Wrapper.doesBrowserSupportWebAuthn;
var WebauthnComponentsOverrideProvider = Wrapper.ComponentsOverrideProvider;

export {
    WebauthnComponentsOverrideProvider,
    authenticateCredential,
    authenticateCredentialWithSignIn,
    Wrapper as default,
    doesBrowserSupportWebAuthn,
    generateRecoverAccountToken,
    getEmailExists,
    getRegisterOptions,
    getSignInOptions,
    init,
    recoverAccount,
    registerCredential,
    registerCredentialWithRecoverAccount,
    registerCredentialWithSignUp,
    signIn,
    signUp,
};
