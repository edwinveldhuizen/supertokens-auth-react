import { __extends, __awaiter, __generator, __assign } from '../../../../_virtual/_tslib.js';
import EmailPasswordWebJS from 'supertokens-web-js/recipe/emailpassword';
import { SSR_ERROR } from '../../constants.js';
import { isTest, getDefaultRedirectionURLForPath } from '../../utils.js';
import AuthRecipe from '../authRecipe/index.js';
import { FactorIds } from '../multifactorauth/types.js';
import { DEFAULT_RESET_PASSWORD_PATH } from './constants.js';
import { getFunctionOverrides } from './functionOverrides.js';
import { normaliseEmailPasswordConfig } from './utils.js';

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
var EmailPassword = /** @class */ (function (_super) {
    __extends(EmailPassword, _super);
    function EmailPassword(config, webJSRecipe) {
        if (webJSRecipe === void 0) { webJSRecipe = EmailPasswordWebJS; }
        var _this = _super.call(this, config) || this;
        _this.webJSRecipe = webJSRecipe;
        _this.recipeID = EmailPassword.RECIPE_ID;
        _this.firstFactorIds = [FactorIds.EMAILPASSWORD];
        _this.getDefaultRedirectionURL = function (context) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (context.action === "RESET_PASSWORD") {
                    return [2 /*return*/, getDefaultRedirectionURLForPath(this.config, DEFAULT_RESET_PASSWORD_PATH, context)];
                }
                return [2 /*return*/, this.getAuthRecipeDefaultRedirectionURL(context)];
            });
        }); };
        return _this;
    }
    EmailPassword.prototype.getFirstFactorsForAuthPage = function () {
        return this.firstFactorIds;
    };
    EmailPassword.init = function (config) {
        var normalisedConfig = normaliseEmailPasswordConfig(config);
        return {
            recipeID: EmailPassword.RECIPE_ID,
            authReact: function (appInfo) {
                EmailPassword.instance = new EmailPassword(__assign(__assign({}, normalisedConfig), { appInfo: appInfo, recipeId: EmailPassword.RECIPE_ID }));
                return EmailPassword.instance;
            },
            webJS: EmailPasswordWebJS.init(__assign(__assign({}, normalisedConfig), { override: {
                    functions: function (originalImpl, builder) {
                        var functions = getFunctionOverrides(normalisedConfig.onHandleEvent);
                        builder.override(functions);
                        builder.override(normalisedConfig.override.functions);
                        return originalImpl;
                    },
                } })),
        };
    };
    EmailPassword.getInstanceOrThrow = function () {
        if (EmailPassword.instance === undefined) {
            var error = "No instance of EmailPassword found. Make sure to call the EmailPassword.init method." +
                "See https://supertokens.io/docs/emailpassword/quick-setup/frontend";
            // eslint-disable-next-line supertokens-auth-react/no-direct-window-object
            if (typeof window === "undefined") {
                error = error + SSR_ERROR;
            }
            throw Error(error);
        }
        return EmailPassword.instance;
    };
    /*
     * Tests methods.
     */
    EmailPassword.reset = function () {
        if (!isTest()) {
            return;
        }
        EmailPassword.instance = undefined;
        return;
    };
    EmailPassword.RECIPE_ID = "emailpassword";
    return EmailPassword;
}(AuthRecipe));

export { EmailPassword as default };
