import { __assign, __awaiter, __generator } from "../../../../_virtual/_tslib.js";
import SuperTokens from "../../superTokens.js";
import { redirectWithFullPageReload } from "../../utils.js";
import { normaliseAuthRecipe } from "../authRecipe/utils.js";
import { FactorIds } from "../multifactorauth/types.js";
import Multitenancy from "../multitenancy/recipe.js";
import Provider from "./providers/index.js";
import ActiveDirectory from "./providers/activeDirectory.js";
import Apple from "./providers/apple.js";
import Bitbucket from "./providers/bitbucket.js";
import BoxySAML from "./providers/boxySaml.js";
import Custom from "./providers/custom.js";
import Discord from "./providers/discord.js";
import Facebook from "./providers/facebook.js";
import Github from "./providers/github.js";
import Gitlab from "./providers/gitlab.js";
import Google from "./providers/google.js";
import GoogleWorkspaces from "./providers/googleWorkspaces.js";
import LinkedIn from "./providers/linkedIn.js";
import Okta from "./providers/okta.js";
import Twitter from "./providers/twitter.js";

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
/*
 * Methods.
 */
function normaliseThirdPartyConfig(config) {
    if (config === undefined) {
        config = {};
    }
    var signInAndUpFeature = normaliseSignInAndUpFeature(config.signInAndUpFeature);
    var oAuthCallbackScreen =
        config.oAuthCallbackScreen === undefined ? {} : { style: config.oAuthCallbackScreen.style };
    var override = __assign(
        {
            functions: function (originalImplementation) {
                return originalImplementation;
            },
        },
        config.override
    );
    return __assign(__assign({}, normaliseAuthRecipe(config)), {
        signInAndUpFeature: signInAndUpFeature,
        oAuthCallbackScreen: oAuthCallbackScreen,
        override: override,
    });
}
function normaliseSignInAndUpFeature(config) {
    if (config === undefined) {
        config = {};
    }
    if (config.providers === undefined) {
        config.providers = [];
    }
    var style = config.style !== undefined ? config.style : "";
    /*
     * Convert custom configs to custom providers.
     */
    var providersWithCustom = config.providers.map(function (provider) {
        if (provider instanceof Provider) {
            return provider;
        }
        return Custom.init(provider);
    });
    /*
     * Make sure providers array is unique, filter duplicate values.
     * First, create a new set with unique ids from the configs.
     * Then map over those ids to find the first provider that matches from the configs.
     */
    var providers = Array.from(
        new Set(
            providersWithCustom.map(function (provider) {
                return provider.id;
            })
        )
    ).map(function (id) {
        return providersWithCustom.find(function (provider) {
            return provider.id === id;
        });
    });
    return {
        style: style,
        providers: providers,
    };
}
function matchRecipeIdUsingState(recipe, userContext) {
    var stateResponse = recipe.webJSRecipe.getStateAndOtherInfoFromStorage({
        userContext: userContext,
    });
    if (stateResponse === undefined) {
        return false;
    }
    if (stateResponse.rid === recipe.config.recipeId) {
        return true;
    }
    return false;
}
function redirectToThirdPartyLogin(input) {
    return __awaiter(this, void 0, void 0, function () {
        var loginMethods, tenantProviders, providers, provider, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    return [
                        4 /*yield*/,
                        Multitenancy.getInstanceOrThrow().getCurrentDynamicLoginMethods({
                            userContext: input.userContext,
                        }),
                    ];
                case 1:
                    loginMethods = _a.sent();
                    tenantProviders = (
                        loginMethods === null || loginMethods === void 0
                            ? void 0
                            : loginMethods.firstFactors.includes(FactorIds.THIRDPARTY)
                    )
                        ? loginMethods.thirdparty.providers
                        : [];
                    providers = mergeProviders({
                        tenantProviders: tenantProviders,
                        clientProviders: input.config.signInAndUpFeature.providers,
                    });
                    provider = providers.find(function (p) {
                        return p.id === input.thirdPartyId;
                    });
                    if (provider === undefined) {
                        return [2 /*return*/, { status: "ERROR" }];
                    }
                    return [
                        4 /*yield*/,
                        input.recipeImplementation.getAuthorisationURLWithQueryParamsAndSetState({
                            thirdPartyId: input.thirdPartyId,
                            frontendRedirectURI: provider.getRedirectURL(),
                            redirectURIOnProviderDashboard: provider.getRedirectURIOnProviderDashboard(),
                            shouldTryLinkingWithSessionUser: input.shouldTryLinkingWithSessionUser,
                            userContext: input.userContext,
                        }),
                    ];
                case 2:
                    response = _a.sent();
                    redirectWithFullPageReload(response);
                    return [2 /*return*/, { status: "OK" }];
            }
        });
    });
}
var mergeProviders = function (_a) {
    var _b = _a.tenantProviders,
        tenantProviders = _b === void 0 ? [] : _b,
        _c = _a.clientProviders,
        clientProviders = _c === void 0 ? [] : _c;
    var builtInProvidersMap = {
        apple: Apple,
        google: Google,
        "google-workspaces": GoogleWorkspaces,
        github: Github,
        "active-directory": ActiveDirectory,
        bitbucket: Bitbucket,
        "boxy-saml": BoxySAML,
        discord: Discord,
        gitlab: Gitlab,
        linkedin: LinkedIn,
        okta: Okta,
        twitter: Twitter,
        facebook: Facebook,
    };
    var usesDynamicLoginMethods = SuperTokens.usesDynamicLoginMethods === true;
    if (
        usesDynamicLoginMethods === false &&
        (clientProviders === null || clientProviders === void 0 ? void 0 : clientProviders.length) === 0
    ) {
        throw new Error("ThirdParty signInAndUpFeature providers array cannot be empty.");
    }
    // If we are not using dynamic login methods or if there is no providers
    // from the core we use frontend initialized providers
    if (usesDynamicLoginMethods === false || tenantProviders.length === 0) {
        return clientProviders;
    }
    var providers = [];
    var _loop_1 = function (tenantProvider) {
        // try finding exact match
        var provider = clientProviders.find(function (provider) {
            var id = tenantProvider.id;
            return provider.id === id;
        });
        // if none found try finding by tenantProvider id prefix match only
        if (provider === undefined) {
            provider = clientProviders.find(function (provider) {
                var id = tenantProvider.id;
                return id.startsWith(provider.id);
            });
        }
        // means provider is initialized on the frontend and found
        if (provider !== undefined) {
            providers.push(
                Custom.init(
                    __assign(__assign({}, provider.config), {
                        id: tenantProvider.id,
                        name: tenantProvider.name,
                        buttonComponent: provider.getButton(tenantProvider.name),
                    })
                )
            );
        } else {
            // try to find and initialize provider from all prebuilt providers list
            var providerID = Object.keys(builtInProvidersMap).find(function (id) {
                return tenantProvider.id === id || tenantProvider.id.startsWith(id);
            });
            if (builtInProvidersMap[providerID]) {
                var provider_1 = new builtInProvidersMap[providerID]({
                    id: tenantProvider.id,
                    name: tenantProvider.name,
                });
                providers.push(provider_1);
            } else {
                providers.push(Custom.init(tenantProvider));
            }
        }
    };
    for (var _i = 0, tenantProviders_1 = tenantProviders; _i < tenantProviders_1.length; _i++) {
        var tenantProvider = tenantProviders_1[_i];
        _loop_1(tenantProvider);
    }
    return providers;
};

export {
    matchRecipeIdUsingState,
    mergeProviders,
    normaliseSignInAndUpFeature,
    normaliseThirdPartyConfig,
    redirectToThirdPartyLogin,
};
