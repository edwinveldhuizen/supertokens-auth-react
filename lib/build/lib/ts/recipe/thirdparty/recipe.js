import { __extends, __awaiter, __generator, __assign } from "../../../../_virtual/_tslib.js";
import ThirdpartyWebJS from "supertokens-web-js/recipe/thirdparty";
import { SSR_ERROR } from "../../constants.js";
import SuperTokens from "../../superTokens.js";
import { isTest } from "../../utils.js";
import AuthRecipe from "../authRecipe/index.js";
import { FactorIds } from "../multifactorauth/types.js";
import { getFunctionOverrides } from "./functionOverrides.js";
import { normaliseThirdPartyConfig } from "./utils.js";

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
var ThirdParty = /** @class */ (function (_super) {
    __extends(ThirdParty, _super);
    function ThirdParty(config, webJSRecipe) {
        if (webJSRecipe === void 0) {
            webJSRecipe = ThirdpartyWebJS;
        }
        var _this = this;
        if (SuperTokens.usesDynamicLoginMethods === false && config.signInAndUpFeature.providers.length === 0) {
            throw new Error("ThirdParty signInAndUpFeature providers array cannot be empty.");
        }
        _this = _super.call(this, config) || this;
        _this.webJSRecipe = webJSRecipe;
        _this.recipeID = ThirdParty.RECIPE_ID;
        _this.firstFactorIds = [FactorIds.THIRDPARTY];
        /*
         * Instance methods.
         */
        _this.getDefaultRedirectionURL = function (context) {
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.getAuthRecipeDefaultRedirectionURL(context)];
                });
            });
        };
        _this.recipeID = config.recipeId;
        return _this;
    }
    ThirdParty.prototype.getFirstFactorsForAuthPage = function () {
        return this.firstFactorIds;
    };
    ThirdParty.init = function (config) {
        var normalisedConfig = normaliseThirdPartyConfig(config);
        return {
            recipeID: ThirdParty.RECIPE_ID,
            authReact: function (appInfo) {
                ThirdParty.instance = new ThirdParty(
                    __assign(__assign({}, normalisedConfig), { appInfo: appInfo, recipeId: ThirdParty.RECIPE_ID })
                );
                return ThirdParty.instance;
            },
            webJS: ThirdpartyWebJS.init(
                __assign(__assign({}, normalisedConfig), {
                    override: {
                        functions: function (originalImpl, builder) {
                            var functions = getFunctionOverrides(ThirdParty.RECIPE_ID, normalisedConfig.onHandleEvent);
                            builder.override(functions);
                            builder.override(normalisedConfig.override.functions);
                            return originalImpl;
                        },
                    },
                })
            ),
        };
    };
    ThirdParty.getInstanceOrThrow = function () {
        if (ThirdParty.instance === undefined) {
            var error =
                "No instance of ThirdParty found. Make sure to call the ThirdParty.init method." +
                "See https://supertokens.io/docs/thirdparty/quick-setup/frontend";
            // eslint-disable-next-line supertokens-auth-react/no-direct-window-object
            if (typeof window === "undefined") {
                error = error + SSR_ERROR;
            }
            throw Error(error);
        }
        return ThirdParty.instance;
    };
    /*
     * Tests methods.
     */
    ThirdParty.reset = function () {
        if (!isTest()) {
            return;
        }
        ThirdParty.instance = undefined;
        return;
    };
    ThirdParty.RECIPE_ID = "thirdparty";
    return ThirdParty;
})(AuthRecipe);

export { ThirdParty as default };
