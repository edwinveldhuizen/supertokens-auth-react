import { __awaiter, __generator, __assign } from "./_virtual/_tslib.js";
import { getNormalisedUserContext } from "./lib/ts/utils.js";
import { RecipeComponentsOverrideContextProvider as Provider } from "./lib/ts/recipe/thirdparty/componentOverrideContext.js";
import ActiveDirectory from "./lib/ts/recipe/thirdparty/providers/activeDirectory.js";
import Apple from "./lib/ts/recipe/thirdparty/providers/apple.js";
import Bitbucket from "./lib/ts/recipe/thirdparty/providers/bitbucket.js";
import BoxySAML from "./lib/ts/recipe/thirdparty/providers/boxySaml.js";
import Discord from "./lib/ts/recipe/thirdparty/providers/discord.js";
import Facebook from "./lib/ts/recipe/thirdparty/providers/facebook.js";
import Github from "./lib/ts/recipe/thirdparty/providers/github.js";
import Gitlab from "./lib/ts/recipe/thirdparty/providers/gitlab.js";
import Google from "./lib/ts/recipe/thirdparty/providers/google.js";
import GoogleWorkspaces from "./lib/ts/recipe/thirdparty/providers/googleWorkspaces.js";
import LinkedIn from "./lib/ts/recipe/thirdparty/providers/linkedIn.js";
import Okta from "./lib/ts/recipe/thirdparty/providers/okta.js";
import Twitter from "./lib/ts/recipe/thirdparty/providers/twitter.js";
import ThirdParty from "./lib/ts/recipe/thirdparty/recipe.js";
import { redirectToThirdPartyLogin as redirectToThirdPartyLogin$1 } from "./lib/ts/recipe/thirdparty/utils.js";

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
    /*
     * Static attributes.
     */
    Wrapper.init = function (config) {
        return ThirdParty.init(config);
    };
    Wrapper.signOut = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [
                    2 /*return*/,
                    ThirdParty.getInstanceOrThrow().signOut({
                        userContext: getNormalisedUserContext(
                            input === null || input === void 0 ? void 0 : input.userContext
                        ),
                    }),
                ];
            });
        });
    };
    Wrapper.redirectToThirdPartyLogin = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var recipeInstance;
            return __generator(this, function (_a) {
                recipeInstance = ThirdParty.getInstanceOrThrow();
                return [
                    2 /*return*/,
                    redirectToThirdPartyLogin$1({
                        thirdPartyId: input.thirdPartyId,
                        config: recipeInstance.config,
                        userContext: getNormalisedUserContext(input.userContext),
                        shouldTryLinkingWithSessionUser: input.shouldTryLinkingWithSessionUser,
                        recipeImplementation: recipeInstance.webJSRecipe,
                    }),
                ];
            });
        });
    };
    Wrapper.getStateAndOtherInfoFromStorage = function (input) {
        return ThirdParty.getInstanceOrThrow().webJSRecipe.getStateAndOtherInfoFromStorage(
            __assign(__assign({}, input), {
                userContext: getNormalisedUserContext(input === null || input === void 0 ? void 0 : input.userContext),
            })
        );
    };
    Wrapper.getAuthorisationURLWithQueryParamsAndSetState = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [
                    2 /*return*/,
                    ThirdParty.getInstanceOrThrow().webJSRecipe.getAuthorisationURLWithQueryParamsAndSetState(
                        __assign(__assign({}, input), { userContext: getNormalisedUserContext(input.userContext) })
                    ),
                ];
            });
        });
    };
    Wrapper.signInAndUp = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [
                    2 /*return*/,
                    ThirdParty.getInstanceOrThrow().webJSRecipe.signInAndUp(
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
    /*
     * Providers
     */
    Wrapper.Apple = Apple;
    Wrapper.Bitbucket = Bitbucket;
    Wrapper.Discord = Discord;
    Wrapper.Github = Github;
    Wrapper.Gitlab = Gitlab;
    Wrapper.Google = Google;
    Wrapper.GoogleWorkspaces = GoogleWorkspaces;
    Wrapper.Facebook = Facebook;
    Wrapper.LinkedIn = LinkedIn;
    Wrapper.ActiveDirectory = ActiveDirectory;
    Wrapper.BoxySAML = BoxySAML;
    Wrapper.Okta = Okta;
    Wrapper.Twitter = Twitter;
    Wrapper.ComponentsOverrideProvider = Provider;
    return Wrapper;
})();
var init = Wrapper.init;
var signOut = Wrapper.signOut;
var redirectToThirdPartyLogin = Wrapper.redirectToThirdPartyLogin;
var getStateAndOtherInfoFromStorage = Wrapper.getStateAndOtherInfoFromStorage;
var getAuthorisationURLWithQueryParamsAndSetState = Wrapper.getAuthorisationURLWithQueryParamsAndSetState;
var signInAndUp = Wrapper.signInAndUp;
var ThirdpartyComponentsOverrideProvider = Wrapper.ComponentsOverrideProvider;

export {
    ActiveDirectory,
    Apple,
    Bitbucket,
    BoxySAML,
    Discord,
    Facebook,
    Github,
    Gitlab,
    Google,
    GoogleWorkspaces,
    LinkedIn,
    Okta,
    ThirdpartyComponentsOverrideProvider,
    Twitter,
    Wrapper as default,
    getAuthorisationURLWithQueryParamsAndSetState,
    getStateAndOtherInfoFromStorage,
    init,
    redirectToThirdPartyLogin,
    signInAndUp,
    signOut,
};
