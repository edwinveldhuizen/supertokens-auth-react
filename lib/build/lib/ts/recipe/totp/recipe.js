import { __extends, __awaiter, __generator, __assign } from "../../../../_virtual/_tslib.js";
import TOTPWebJS from "supertokens-web-js/recipe/totp";
import { PostSuperTokensInitCallbacks } from "supertokens-web-js/utils/postSuperTokensInitCallbacks";
import { TOTPIcon } from "../../components/assets/totpIcon.js";
import { SSR_ERROR } from "../../constants.js";
import MultiFactorAuth from "../multifactorauth/recipe.js";
import { FactorIds } from "../multifactorauth/types.js";
import RecipeModule from "../recipeModule/index.js";
import { getFunctionOverrides } from "./functionOverrides.js";
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
var totpFactor = {
    id: FactorIds.TOTP,
    name: "TOTP_MFA_NAME",
    description: "TOTP_MFA_DESCRIPTION",
    path: "/mfa/totp",
    logo: TOTPIcon,
};
var TOTP = /** @class */ (function (_super) {
    __extends(TOTP, _super);
    function TOTP(config, webJSRecipe) {
        if (webJSRecipe === void 0) {
            webJSRecipe = TOTPWebJS;
        }
        var _this = _super.call(this, config) || this;
        _this.webJSRecipe = webJSRecipe;
        _this.recipeID = TOTP.RECIPE_ID;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _this.getDefaultRedirectionURL = function (_context) {
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    throw new Error("Should never come here");
                });
            });
        };
        PostSuperTokensInitCallbacks.addPostInitCallback(function () {
            var mfa = MultiFactorAuth.getInstance();
            if (mfa !== undefined) {
                mfa.addMFAFactors([totpFactor]);
            }
        });
        return _this;
    }
    TOTP.init = function (config) {
        var normalisedConfig = normaliseMultiFactorAuthFeature(config);
        return {
            recipeID: TOTP.RECIPE_ID,
            authReact: function (appInfo) {
                TOTP.instance = new TOTP(
                    __assign(__assign({}, normalisedConfig), { appInfo: appInfo, recipeId: TOTP.RECIPE_ID })
                );
                return TOTP.instance;
            },
            webJS: TOTPWebJS.init(
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
    TOTP.getInstance = function () {
        return TOTP.instance;
    };
    TOTP.getInstanceOrThrow = function () {
        if (TOTP.instance === undefined) {
            var error = "No instance of TOTP found. Make sure to call the TOTP.init method.";
            // eslint-disable-next-line supertokens-auth-react/no-direct-window-object
            if (typeof window === "undefined") {
                error = error + SSR_ERROR;
            }
            throw Error(error);
        }
        return TOTP.instance;
    };
    TOTP.RECIPE_ID = "totp";
    return TOTP;
})(RecipeModule);

export { TOTP as default, totpFactor };
