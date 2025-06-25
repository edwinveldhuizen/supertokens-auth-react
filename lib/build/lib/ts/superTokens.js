import { __awaiter, __generator, __assign } from "../../_virtual/_tslib.js";
import SuperTokensWebJS from "supertokens-web-js";
import { CookieHandlerReference } from "supertokens-web-js/utils/cookieHandler";
import { PostSuperTokensInitCallbacks } from "supertokens-web-js/utils/postSuperTokensInitCallbacks";
import { WindowHandlerReference } from "supertokens-web-js/utils/windowHandler";
import { TENANT_ID_QUERY_PARAM, SSR_ERROR } from "./constants.js";
import { logDebugMessage, enableLogging } from "./logger.js";
import Multitenancy from "./recipe/multitenancy/recipe.js";
import { saveCurrentLanguage, TranslationController } from "./translation/translationHelpers.js";
import {
    appendQueryParamsToURL,
    getCurrentNormalisedUrlPathWithQueryParamsAndFragments,
    getTenantIdFromQueryParams,
    getNormalisedUserContext,
    normaliseInputAppInfoOrThrowError,
    normaliseCookieScopeOrThrowError,
    getDefaultCookieScope,
    appendTrailingSlashToURL,
    isTest,
    getOriginOfPage,
    redirectWithFullPageReload,
    redirectWithNavigate,
} from "./utils.js";

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
 * Class.
 */
var SuperTokens = /** @class */ (function () {
    /*
     * Constructor.
     */
    function SuperTokens(config) {
        var _this = this;
        var _a, _b, _c, _d;
        this.recipeList = [];
        this.changeLanguage = function (lang) {
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                saveCurrentLanguage(lang, this.languageTranslations.currentLanguageCookieScope),
                            ];
                        case 1:
                            _a.sent();
                            this.languageTranslations.translationEventSource.emit("LanguageChange", lang);
                            return [2 /*return*/];
                    }
                });
            });
        };
        this.redirectToAuth = function (options) {
            return __awaiter(_this, void 0, void 0, function () {
                var queryParams, redirectUrl;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            queryParams = options.queryParams === undefined ? {} : options.queryParams;
                            if (options.show !== undefined) {
                                queryParams.show = options.show;
                            }
                            if (options.redirectBack === true) {
                                queryParams.redirectToPath = getCurrentNormalisedUrlPathWithQueryParamsAndFragments();
                            }
                            return [
                                4 /*yield*/,
                                this.getRedirectUrl(
                                    {
                                        action: "TO_AUTH",
                                        showSignIn: options.show === "signin",
                                        tenantIdFromQueryParams: getTenantIdFromQueryParams(),
                                    },
                                    options.userContext
                                ),
                            ];
                        case 1:
                            redirectUrl = _a.sent();
                            if (redirectUrl === null) {
                                logDebugMessage("Skipping redirection because the user override returned null");
                                return [2 /*return*/];
                            }
                            redirectUrl = appendQueryParamsToURL(redirectUrl, queryParams);
                            return [2 /*return*/, this.redirectToUrl(redirectUrl, options.navigate)];
                    }
                });
            });
        };
        this.redirectToUrl = function (redirectUrl, navigate) {
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    doRedirection(this.appInfo, redirectUrl, navigate);
                    return [2 /*return*/];
                });
            });
        };
        this.redirect = function (context, navigate, queryParams, userContext) {
            return __awaiter(_this, void 0, void 0, function () {
                var redirectUrl;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [4 /*yield*/, this.getRedirectUrl(context, getNormalisedUserContext(userContext))];
                        case 1:
                            redirectUrl = _a.sent();
                            if (redirectUrl === null) {
                                logDebugMessage(
                                    "Skipping redirection because the user override returned null for context ".concat(
                                        JSON.stringify(context, null, 2)
                                    )
                                );
                                return [2 /*return*/];
                            }
                            redirectUrl = appendQueryParamsToURL(redirectUrl, queryParams);
                            return [
                                2 /*return*/,
                                SuperTokens.getInstanceOrThrow().redirectToUrl(redirectUrl, navigate),
                            ];
                    }
                });
            });
        };
        this.appInfo = normaliseInputAppInfoOrThrowError(config.appInfo);
        if (config.recipeList === undefined || config.recipeList.length === 0) {
            throw new Error(
                "Please provide at least one recipe to the supertokens.init function call. See https://supertokens.io/docs/emailpassword/quick-setup/frontend"
            );
        }
        var translationConfig = config.languageTranslations === undefined ? {} : config.languageTranslations;
        this.languageTranslations = {
            defaultLanguage: translationConfig.defaultLanguage === undefined ? "en" : translationConfig.defaultLanguage,
            currentLanguageCookieScope:
                translationConfig.currentLanguageCookieScope !== undefined
                    ? normaliseCookieScopeOrThrowError(translationConfig.currentLanguageCookieScope)
                    : getDefaultCookieScope(),
            userTranslationStore: translationConfig.translations !== undefined ? translationConfig.translations : {},
            translationEventSource: new TranslationController(),
            userTranslationFunc: translationConfig.translationFunc,
        };
        var enableDebugLogs = Boolean(config === null || config === void 0 ? void 0 : config.enableDebugLogs);
        if (enableDebugLogs) {
            enableLogging();
        }
        this.userGetRedirectionURL = config.getRedirectionURL;
        this.recipeList = config.recipeList.map(function (_a) {
            var authReact = _a.authReact;
            return authReact(_this.appInfo, enableDebugLogs);
        });
        this.rootStyle = (_a = config.style) !== null && _a !== void 0 ? _a : "";
        this.privacyPolicyLink = config.privacyPolicyLink;
        this.termsOfServiceLink = config.termsOfServiceLink;
        this.useShadowDom = (_b = config.useShadowDom) !== null && _b !== void 0 ? _b : true;
        this.defaultToSignUp = (_c = config.defaultToSignUp) !== null && _c !== void 0 ? _c : false;
        this.disableAuthRoute = (_d = config.disableAuthRoute) !== null && _d !== void 0 ? _d : false;
    }
    /*
     * Static Methods.
     */
    SuperTokens.init = function (config) {
        var _a;
        CookieHandlerReference.init(config.cookieHandler);
        WindowHandlerReference.init(config.windowHandler);
        if (SuperTokens.instance !== undefined) {
            console.warn("SuperTokens was already initialized");
            return;
        }
        SuperTokens.usesDynamicLoginMethods =
            (_a = config.usesDynamicLoginMethods) !== null && _a !== void 0 ? _a : false;
        var recipes =
            config.recipeList.find(function (recipe) {
                return recipe.recipeID === Multitenancy.RECIPE_ID;
            }) !== undefined
                ? config.recipeList
                : config.recipeList.concat(Multitenancy.init({}));
        SuperTokensWebJS.init(
            __assign(__assign({}, config), {
                recipeList: recipes.map(function (_a) {
                    var webJS = _a.webJS;
                    return webJS;
                }),
            })
        );
        SuperTokens.instance = new SuperTokens(__assign(__assign({}, config), { recipeList: recipes }));
        PostSuperTokensInitCallbacks.runPostInitCallbacks();
    };
    SuperTokens.getInstanceOrThrow = function () {
        if (SuperTokens.instance === undefined) {
            var error = "SuperTokens must be initialized before calling this method.";
            // eslint-disable-next-line supertokens-auth-react/no-direct-window-object
            if (typeof window === "undefined") {
                error = error + SSR_ERROR;
            }
            throw new Error(error);
        }
        return SuperTokens.instance;
    };
    SuperTokens.prototype.getRecipeOrThrow = function (recipeId) {
        var recipe = this.recipeList.find(function (recipe) {
            return recipe.config.recipeId === recipeId;
        });
        if (recipe === undefined) {
            throw new Error("Missing recipe: ".concat(recipeId));
        }
        return recipe;
    };
    SuperTokens.prototype.loadTranslation = function (store) {
        this.languageTranslations.translationEventSource.emit("TranslationLoaded", store);
    };
    SuperTokens.prototype.getRedirectUrl = function (context, userContext) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var userRes, redirectUrl, basePath;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!this.userGetRedirectionURL) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.userGetRedirectionURL(context, userContext)];
                    case 1:
                        userRes = _c.sent();
                        if (userRes !== undefined) {
                            return [2 /*return*/, userRes];
                        }
                        _c.label = 2;
                    case 2:
                        if (context.action === "TO_AUTH") {
                            redirectUrl = this.appInfo.websiteBasePath.getAsStringDangerous();
                            basePath = appendTrailingSlashToURL(redirectUrl);
                            if (context.tenantIdFromQueryParams) {
                                return [
                                    2 /*return*/,
                                    appendQueryParamsToURL(
                                        basePath,
                                        ((_b = {}), (_b[TENANT_ID_QUERY_PARAM] = context.tenantIdFromQueryParams), _b)
                                    ),
                                ];
                            }
                            return [2 /*return*/, basePath];
                        } else if (context.action === "SUCCESS") {
                            return [2 /*return*/, (_a = context.redirectToPath) !== null && _a !== void 0 ? _a : "/"];
                        }
                        throw new Error("Should never come here: unexpected redirection context");
                }
            });
        });
    };
    /*
     * Tests methods.
     */
    SuperTokens.reset = function () {
        if (!isTest()) {
            return;
        }
        SuperTokens.instance = undefined;
        return;
    };
    SuperTokens.usesDynamicLoginMethods = false;
    return SuperTokens;
})();
function doRedirection(appInfo, redirectUrl, navigate) {
    try {
        new URL(redirectUrl); // If full URL, no error thrown, skip in app redirection.
    } catch (e) {
        // For multi tenancy, If mismatch between websiteDomain and current location, prepend URL relative path with websiteDomain.
        var origin_1 = getOriginOfPage().getAsStringDangerous();
        if (origin_1 !== appInfo.websiteDomain.getAsStringDangerous()) {
            redirectUrl = "".concat(appInfo.websiteDomain.getAsStringDangerous()).concat(redirectUrl);
            redirectWithFullPageReload(redirectUrl);
            return;
        }
        // If navigate was provided, use to redirect without reloading.
        if (navigate !== undefined) {
            redirectWithNavigate(redirectUrl, navigate);
            return;
        }
    }
    // Otherwise, redirect in app.
    redirectWithFullPageReload(redirectUrl);
}

export { SuperTokens as default, doRedirection };
