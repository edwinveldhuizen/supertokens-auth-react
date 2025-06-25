import { __extends, __awaiter, __generator, __assign } from "../../../../_virtual/_tslib.js";
import WebauthnWebJS from "supertokens-web-js/lib/build/recipe/webauthn";
import { SSR_ERROR } from "../../constants.js";
import { isTest, getDefaultRedirectionURLForPath } from "../../utils.js";
import AuthRecipe from "../authRecipe/index.js";
import { FactorIds } from "../multifactorauth/types.js";
import { DEFAULT_WEBAUTHN_SEND_RECOVERY_EMAIL_PATH } from "./constants.js";
import { getFunctionOverrides } from "./functionOverrides.js";
import { normaliseWebauthnConfig } from "./utils.js";

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
var Webauthn = /** @class */ (function (_super) {
    __extends(Webauthn, _super);
    function Webauthn(config, webJSRecipe) {
        if (webJSRecipe === void 0) {
            webJSRecipe = WebauthnWebJS;
        }
        var _this = _super.call(this, config) || this;
        _this.webJSRecipe = webJSRecipe;
        _this.recipeID = Webauthn.RECIPE_ID;
        _this.firstFactorIds = [FactorIds.WEBAUTHN];
        _this.getDefaultRedirectionURL = function (context) {
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (context.action === "SEND_RECOVERY_EMAIL") {
                        return [
                            2 /*return*/,
                            getDefaultRedirectionURLForPath(
                                this.config,
                                DEFAULT_WEBAUTHN_SEND_RECOVERY_EMAIL_PATH,
                                context
                            ),
                        ];
                    }
                    return [2 /*return*/, this.getAuthRecipeDefaultRedirectionURL(context)];
                });
            });
        };
        _this.recipeID = config.recipeId;
        return _this;
        // We can ideally call postInitCallbacks to set MFA's if
        // we are using it.
    }
    Webauthn.prototype.getFirstFactorsForAuthPage = function () {
        return this.firstFactorIds;
    };
    Webauthn.init = function (config) {
        var normalisedConfig = normaliseWebauthnConfig(config);
        return {
            recipeID: Webauthn.RECIPE_ID,
            authReact: function (appInfo) {
                Webauthn.instance = new Webauthn(
                    __assign(__assign({}, normalisedConfig), { appInfo: appInfo, recipeId: Webauthn.RECIPE_ID })
                );
                return Webauthn.instance;
            },
            webJS: WebauthnWebJS.init(
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
    Webauthn.getInstanceOrThrow = function () {
        if (Webauthn.instance === undefined) {
            var error = "No instance of Webauthn found. Make sure to call the Webauthn.init method.";
            // eslint-disable-next-line supertokens-auth-react/no-direct-window-object
            if (typeof window === "undefined") {
                error = error + SSR_ERROR;
            }
            throw Error(error);
        }
        return Webauthn.instance;
    };
    /*
     * Tests methods.
     */
    Webauthn.reset = function () {
        if (!isTest()) {
            return;
        }
        Webauthn.instance = undefined;
        return;
    };
    Webauthn.RECIPE_ID = "webauthn";
    return Webauthn;
})(AuthRecipe);

export { Webauthn as default };
