import { __extends, __awaiter, __generator, __assign } from "../../../../_virtual/_tslib.js";
import MultitenancyWebJS from "supertokens-web-js/recipe/multitenancy";
import { getNormalisedUserContext } from "supertokens-web-js/utils";
import { SSR_ERROR } from "../../constants.js";
import SuperTokens from "../../superTokens.js";
import { isTest } from "../../utils.js";
import { BaseRecipeModule } from "../recipeModule/baseRecipeModule.js";
import { normaliseMultitenancyConfig, hasIntersectingRecipes } from "./utils.js";

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
var Multitenancy = /** @class */ (function (_super) {
    __extends(Multitenancy, _super);
    function Multitenancy(config, webJSRecipe) {
        if (webJSRecipe === void 0) {
            webJSRecipe = MultitenancyWebJS;
        }
        var _this = _super.call(this, config) || this;
        _this.webJSRecipe = webJSRecipe;
        _this.recipeID = Multitenancy.RECIPE_ID;
        _this.dynamicLoginMethodsCache = {};
        return _this;
    }
    Multitenancy.prototype.getCurrentDynamicLoginMethods = function (input) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var userContext, tenantId, tenantMethods;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (SuperTokens.usesDynamicLoginMethods === false) {
                            return [2 /*return*/, undefined];
                        }
                        userContext = getNormalisedUserContext(input.userContext);
                        return [4 /*yield*/, Multitenancy.getInstanceOrThrow().webJSRecipe.getTenantId()];
                    case 1:
                        tenantId = (_a = _b.sent()) !== null && _a !== void 0 ? _a : "public";
                        if (this.dynamicLoginMethodsCache[tenantId] === undefined) {
                            this.dynamicLoginMethodsCache[tenantId] = Multitenancy.getDynamicLoginMethods({
                                tenantId: tenantId,
                                userContext: userContext,
                            });
                        }
                        return [4 /*yield*/, this.dynamicLoginMethodsCache[tenantId]];
                    case 2:
                        tenantMethods = _b.sent();
                        if (
                            !hasIntersectingRecipes(
                                tenantMethods,
                                SuperTokens.getInstanceOrThrow().recipeList.filter(function (recipe) {
                                    return "firstFactorIds" in recipe;
                                })
                            )
                        ) {
                            throw new Error(
                                "Initialized recipes have no overlap with core recipes or could not load login methods"
                            );
                        }
                        return [2 /*return*/, tenantMethods];
                }
            });
        });
    };
    Multitenancy.getDynamicLoginMethods = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, thirdParty, firstFactors;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        return [4 /*yield*/, MultitenancyWebJS.getLoginMethods(input)];
                    case 1:
                        (_a = _b.sent()), (thirdParty = _a.thirdParty), (firstFactors = _a.firstFactors);
                        return [
                            2 /*return*/,
                            {
                                thirdparty: thirdParty,
                                firstFactors: firstFactors,
                            },
                        ];
                }
            });
        });
    };
    Multitenancy.init = function (config) {
        var normalisedConfig = normaliseMultitenancyConfig(config);
        return {
            recipeID: Multitenancy.RECIPE_ID,
            authReact: function (appInfo) {
                Multitenancy.instance = new Multitenancy(
                    __assign(__assign({}, normalisedConfig), { appInfo: appInfo, recipeId: Multitenancy.RECIPE_ID })
                );
                return Multitenancy.instance;
            },
            webJS: MultitenancyWebJS.init(__assign({}, normalisedConfig)),
        };
    };
    Multitenancy.getInstanceOrThrow = function () {
        if (Multitenancy.instance === undefined) {
            var error =
                "No instance of Multitenancy found. Make sure to call the Multitenancy.init method." +
                "See https://supertokens.io/docs/multitenancy/quick-setup/frontend";
            // eslint-disable-next-line supertokens-auth-react/no-direct-window-object
            if (typeof window === "undefined") {
                error = error + SSR_ERROR;
            }
            throw Error(error);
        }
        return Multitenancy.instance;
    };
    /*
     * Tests methods.
     */
    Multitenancy.reset = function () {
        if (!isTest()) {
            return;
        }
        Multitenancy.instance = undefined;
        return;
    };
    Multitenancy.RECIPE_ID = "multitenancy";
    return Multitenancy;
})(BaseRecipeModule);

export { Multitenancy as default };
