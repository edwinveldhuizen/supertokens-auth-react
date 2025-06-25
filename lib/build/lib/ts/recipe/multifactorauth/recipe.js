import { __extends, __awaiter, __generator, __assign, __spreadArray } from "../../../../_virtual/_tslib.js";
import MultiFactorAuthWebJS from "supertokens-web-js/recipe/multifactorauth";
import { getNormalisedUserContext } from "supertokens-web-js/utils";
import { PostSuperTokensInitCallbacks } from "supertokens-web-js/utils/postSuperTokensInitCallbacks";
import { SessionClaimValidatorStore } from "supertokens-web-js/utils/sessionClaimValidatorStore";
import { WindowHandlerReference } from "supertokens-web-js/utils/windowHandler";
import { SSR_ERROR } from "../../constants.js";
import SuperTokens from "../../superTokens.js";
import {
    isTest,
    getDefaultRedirectionURLForPath,
    getCurrentNormalisedUrlPathWithQueryParamsAndFragments,
    appendQueryParamsToURL,
    getRedirectToPathFromURL,
    getTenantIdFromQueryParams,
} from "../../utils.js";
import RecipeModule from "../recipeModule/index.js";
import Session from "../session/recipe.js";
import { MFA_INFO_CACHE_KEY, DEFAULT_FACTOR_CHOOSER_PATH } from "./constants.js";
import { getFunctionOverrides } from "./functionOverrides.js";
import { MultiFactorAuthClaimClass } from "./multiFactorAuthClaim.js";
import { normaliseMultiFactorAuthFeature } from "./utils.js";

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
var MultiFactorAuth = /** @class */ (function (_super) {
    __extends(MultiFactorAuth, _super);
    function MultiFactorAuth(config, webJSRecipe) {
        if (webJSRecipe === void 0) {
            webJSRecipe = MultiFactorAuthWebJS;
        }
        var _this = _super.call(this, config) || this;
        _this.webJSRecipe = webJSRecipe;
        _this.recipeID = MultiFactorAuth.RECIPE_ID;
        _this.secondaryFactors = [];
        _this.getDefaultRedirectionURL = function (context, userContext) {
            return __awaiter(_this, void 0, void 0, function () {
                var nParam, redirectInfo;
                return __generator(this, function (_b) {
                    if (context.action === "FACTOR_CHOOSER") {
                        nParam =
                            context.nextFactorOptions && context.nextFactorOptions.length > 0
                                ? context.nextFactorOptions.join(",")
                                : undefined;
                        return [
                            2 /*return*/,
                            getDefaultRedirectionURLForPath(this.config, DEFAULT_FACTOR_CHOOSER_PATH, context, {
                                n: nParam,
                                stepUp: context.stepUp ? "true" : undefined,
                            }),
                        ];
                    } else if (context.action === "GO_TO_FACTOR") {
                        redirectInfo = this.getSecondaryFactors(userContext).find(function (f) {
                            return f.id === context.factorId;
                        });
                        if (redirectInfo !== undefined) {
                            return [
                                2 /*return*/,
                                getDefaultRedirectionURLForPath(this.config, redirectInfo.path, context, {
                                    setup: context.forceSetup ? "true" : undefined,
                                    stepUp: context.stepUp ? "true" : undefined,
                                }),
                            ];
                        }
                        throw new Error("Requested redirect to unknown factor id: " + context.factorId);
                    } else {
                        return [2 /*return*/, "/"];
                    }
                });
            });
        };
        PostSuperTokensInitCallbacks.addPostInitCallback(function () {
            var defaultFactorsValidator =
                MultiFactorAuth.MultiFactorAuthClaim.validators.hasCompletedMFARequirementsForAuth();
            SessionClaimValidatorStore.addClaimValidatorFromOtherRecipe(defaultFactorsValidator);
            Session.getInstanceOrThrow().addEventListener(function () {
                // We clear the cache if the session updated, since that may mean that the MFA info has changed
                var stWindow = WindowHandlerReference.getReferenceOrThrow();
                stWindow.windowHandler.sessionStorage.removeItemSync(MFA_INFO_CACHE_KEY);
            });
        });
        return _this;
    }
    MultiFactorAuth.init = function (config) {
        var normalisedConfig = normaliseMultiFactorAuthFeature(config);
        return {
            recipeID: MultiFactorAuth.RECIPE_ID,
            authReact: function (appInfo) {
                MultiFactorAuth.instance = new MultiFactorAuth(
                    __assign(__assign({}, normalisedConfig), { appInfo: appInfo, recipeId: MultiFactorAuth.RECIPE_ID })
                );
                return MultiFactorAuth.instance;
            },
            webJS: MultiFactorAuthWebJS.init(
                __assign(__assign({}, normalisedConfig), {
                    override: {
                        functions: function (originalImpl, builder) {
                            var functions = getFunctionOverrides(normalisedConfig.onHandleEvent);
                            builder.override(functions);
                            builder.override(normalisedConfig.override.functions);
                            return originalImpl;
                        },
                    },
                })
            ),
        };
    };
    MultiFactorAuth.getInstance = function () {
        return MultiFactorAuth.instance;
    };
    MultiFactorAuth.getInstanceOrThrow = function () {
        if (MultiFactorAuth.instance === undefined) {
            var error = "No instance of MultiFactorAuth found. Make sure to call the MultiFactorAuth.init method.";
            // eslint-disable-next-line supertokens-auth-react/no-direct-window-object
            if (typeof window === "undefined") {
                error = error + SSR_ERROR;
            }
            throw Error(error);
        }
        return MultiFactorAuth.instance;
    };
    MultiFactorAuth.prototype.addMFAFactors = function (secondaryFactors) {
        this.secondaryFactors = __spreadArray(
            __spreadArray(
                [],
                this.secondaryFactors.filter(function (factor) {
                    return secondaryFactors.every(function (newFactor) {
                        return factor.id !== newFactor.id;
                    });
                }),
                true
            ),
            secondaryFactors,
            true
        );
    };
    MultiFactorAuth.prototype.isFirstFactorEnabledOnClient = function (factorId) {
        return this.config.firstFactors === undefined || this.config.firstFactors.includes(factorId);
    };
    MultiFactorAuth.prototype.getSecondaryFactors = function (userContext) {
        return this.config.getSecondaryFactorInfo(this.secondaryFactors, userContext);
    };
    MultiFactorAuth.prototype.redirectToFactor = function (_b) {
        var factorId = _b.factorId,
            forceSetup = _b.forceSetup,
            stepUp = _b.stepUp,
            redirectBack = _b.redirectBack,
            navigate = _b.navigate,
            userContext = _b.userContext;
        return __awaiter(this, void 0, void 0, function () {
            var url, redirectUrl, redirectUrl;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        return [
                            4 /*yield*/,
                            this.getRedirectUrl(
                                {
                                    action: "GO_TO_FACTOR",
                                    forceSetup: forceSetup,
                                    stepUp: stepUp,
                                    factorId: factorId,
                                    tenantIdFromQueryParams: getTenantIdFromQueryParams(),
                                },
                                getNormalisedUserContext(userContext)
                            ),
                        ];
                    case 1:
                        url = _c.sent();
                        if (url === null) {
                            return [2 /*return*/];
                        }
                        // If redirectBack was set to true we always set redirectToPath to that value
                        // otherwise we try and get it from the query params, finally falling back to not setting it.
                        // Example:
                        // 1. If the app calls this on pathX and with redirectBack=false, we redirect to /auth/mfa/factor-id
                        // 2. If the app calls this on pathX and with redirectBack=true, we redirect to /auth/mfa/factor-id?redirectToPath=pathX
                        // 3. If:
                        //      - the app redirects to the factor chooser with redirectBack=true from path=X, they end up on /auth/mfa?redirectToPath=pathX
                        //      - the factor chooser screen then calls this with redirectBack=false, then they end up on /auth/mfa/factor-id?redirectToPath=pathX
                        // 4. In the unlikely case that the app itself uses a `redirectToPath` query param internally
                        //    and is on a custom path that has a redirectToPath set to pathX when calling this function,
                        //    then we keep that in the query params if redirectBack is set to false.
                        if (redirectBack) {
                            redirectUrl = getCurrentNormalisedUrlPathWithQueryParamsAndFragments();
                            url = appendQueryParamsToURL(url, { redirectToPath: redirectUrl });
                        } else {
                            redirectUrl = getRedirectToPathFromURL();
                            if (redirectUrl) {
                                url = appendQueryParamsToURL(url, { redirectToPath: redirectUrl });
                            }
                        }
                        return [2 /*return*/, SuperTokens.getInstanceOrThrow().redirectToUrl(url, navigate)];
                }
            });
        });
    };
    MultiFactorAuth.prototype.redirectToFactorChooser = function (_b) {
        var _c = _b.redirectBack,
            redirectBack = _c === void 0 ? false : _c,
            _d = _b.nextFactorOptions,
            nextFactorOptions = _d === void 0 ? [] : _d,
            stepUp = _b.stepUp,
            navigate = _b.navigate,
            userContext = _b.userContext;
        return __awaiter(this, void 0, void 0, function () {
            var url, redirectUrl, redirectUrl;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        return [
                            4 /*yield*/,
                            this.getRedirectUrl(
                                {
                                    action: "FACTOR_CHOOSER",
                                    nextFactorOptions: nextFactorOptions,
                                    stepUp: stepUp,
                                    tenantIdFromQueryParams: getTenantIdFromQueryParams(),
                                },
                                getNormalisedUserContext(userContext)
                            ),
                        ];
                    case 1:
                        url = _e.sent();
                        if (url === null) {
                            return [2 /*return*/];
                        }
                        if (redirectBack) {
                            redirectUrl = getCurrentNormalisedUrlPathWithQueryParamsAndFragments();
                            url = appendQueryParamsToURL(url, { redirectToPath: redirectUrl });
                        } else {
                            redirectUrl = getRedirectToPathFromURL();
                            if (redirectUrl) {
                                url = appendQueryParamsToURL(url, { redirectToPath: redirectUrl });
                            }
                        }
                        return [2 /*return*/, SuperTokens.getInstanceOrThrow().redirectToUrl(url, navigate)];
                }
            });
        });
    };
    /*
     * Tests methods.
     */
    MultiFactorAuth.reset = function () {
        if (!isTest()) {
            return;
        }
        MultiFactorAuth.instance = undefined;
        return;
    };
    var _a;
    _a = MultiFactorAuth;
    MultiFactorAuth.RECIPE_ID = "multifactorauth";
    MultiFactorAuth.MultiFactorAuthClaim = new MultiFactorAuthClaimClass(
        function () {
            return MultiFactorAuth.getInstanceOrThrow();
        },
        function (context, userContext) {
            return __awaiter(void 0, void 0, void 0, function () {
                return __generator(_a, function (_b) {
                    switch (_b.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                this.getInstanceOrThrow().getRedirectUrl(
                                    __assign(__assign({}, context), {
                                        tenantIdFromQueryParams: getTenantIdFromQueryParams(),
                                    }),
                                    userContext
                                ),
                            ];
                        case 1:
                            return [2 /*return*/, _b.sent() || undefined];
                    }
                });
            });
        }
    );
    return MultiFactorAuth;
})(RecipeModule);

export { MultiFactorAuth as default };
