import { __extends, __assign, __awaiter, __generator } from '../../../../_virtual/_tslib.js';
import OAuth2WebJS from 'supertokens-web-js/recipe/oauth2provider';
import { SSR_ERROR } from '../../constants.js';
import { isTest } from '../../utils.js';
import RecipeModule from '../recipeModule/index.js';
import { getFunctionOverrides } from './functionOverrides.js';
import { normaliseOAuth2Config } from './utils.js';

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
/*
 * Class.
 */
var OAuth2Provider = /** @class */ (function (_super) {
    __extends(OAuth2Provider, _super);
    function OAuth2Provider(config, webJSRecipe) {
        if (webJSRecipe === void 0) { webJSRecipe = OAuth2WebJS; }
        var _this = _super.call(this, config) || this;
        _this.webJSRecipe = webJSRecipe;
        _this.recipeID = OAuth2Provider.RECIPE_ID;
        return _this;
    }
    OAuth2Provider.init = function (config) {
        var normalisedConfig = normaliseOAuth2Config(config);
        return {
            recipeID: OAuth2Provider.RECIPE_ID,
            authReact: function (appInfo) {
                OAuth2Provider.instance = new OAuth2Provider(__assign(__assign({}, normalisedConfig), { appInfo: appInfo, recipeId: OAuth2Provider.RECIPE_ID }));
                return OAuth2Provider.instance;
            },
            webJS: OAuth2WebJS.init(__assign(__assign({}, normalisedConfig), { override: {
                    functions: function (originalImpl, builder) {
                        var functions = getFunctionOverrides(normalisedConfig.onHandleEvent);
                        builder.override(functions);
                        builder.override(normalisedConfig.override.functions);
                        return originalImpl;
                    },
                } })),
        };
    };
    OAuth2Provider.getInstanceOrThrow = function () {
        if (OAuth2Provider.instance === undefined) {
            var error = "No instance of OAuth2Provider found. Make sure to call the OAuth2Provider.init method." +
                "See https://supertokens.io/docs/oauth2/quick-setup/frontend";
            // eslint-disable-next-line supertokens-auth-react/no-direct-window-object
            if (typeof window === "undefined") {
                error = error + SSR_ERROR;
            }
            throw Error(error);
        }
        return OAuth2Provider.instance;
    };
    OAuth2Provider.getInstance = function () {
        return OAuth2Provider.instance;
    };
    OAuth2Provider.prototype.getDefaultRedirectionURL = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // We do not use the util here, because we are likely redirecting across domains here.
                if (ctx.action === "SUCCESS_OAUTH2" ||
                    ctx.action === "CONTINUE_OAUTH2_AFTER_REFRESH" ||
                    ctx.action === "POST_OAUTH2_LOGOUT_REDIRECT") {
                    return [2 /*return*/, ctx.frontendRedirectTo];
                }
                else {
                    throw new Error("Should never come here: unknown action in OAuth2Provider.getDefaultRedirectionURL");
                }
            });
        });
    };
    /*
     * Tests methods.
     */
    OAuth2Provider.reset = function () {
        if (!isTest()) {
            return;
        }
        OAuth2Provider.instance = undefined;
        return;
    };
    OAuth2Provider.RECIPE_ID = "oauth2provider";
    return OAuth2Provider;
}(RecipeModule));

export { OAuth2Provider as default };
