import { __extends, __awaiter, __generator, __assign } from "../../../../_virtual/_tslib.js";
import EmailVerificationWebJS from "supertokens-web-js/recipe/emailverification";
import { PostSuperTokensInitCallbacks } from "supertokens-web-js/utils/postSuperTokensInitCallbacks";
import { SessionClaimValidatorStore } from "supertokens-web-js/utils/sessionClaimValidatorStore";
import { SSR_ERROR } from "../../constants.js";
import { isTest, getDefaultRedirectionURLForPath } from "../../utils.js";
import RecipeModule from "../recipeModule/index.js";
import { DEFAULT_VERIFY_EMAIL_PATH } from "./constants.js";
import { EmailVerificationClaimClass } from "./emailVerificationClaim.js";
import { getFunctionOverrides } from "./functionOverrides.js";
import { normaliseEmailVerificationFeature } from "./utils.js";

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
var EmailVerification = /** @class */ (function (_super) {
    __extends(EmailVerification, _super);
    function EmailVerification(config, webJSRecipe) {
        if (webJSRecipe === void 0) {
            webJSRecipe = EmailVerificationWebJS;
        }
        var _this = _super.call(this, config) || this;
        _this.webJSRecipe = webJSRecipe;
        _this.recipeID = EmailVerification.RECIPE_ID;
        _this.getDefaultRedirectionURL = function (context) {
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (context.action === "VERIFY_EMAIL") {
                        return [
                            2 /*return*/,
                            getDefaultRedirectionURLForPath(this.config, DEFAULT_VERIFY_EMAIL_PATH, context),
                        ];
                    } else {
                        return [2 /*return*/, "/"];
                    }
                });
            });
        };
        PostSuperTokensInitCallbacks.addPostInitCallback(function () {
            var isVerifiedValidator = EmailVerification.EmailVerificationClaim.validators.isVerified(10);
            SessionClaimValidatorStore.addClaimValidatorFromOtherRecipe(isVerifiedValidator);
        });
        return _this;
    }
    EmailVerification.init = function (config) {
        var normalisedConfig = normaliseEmailVerificationFeature(config);
        return {
            recipeID: EmailVerification.RECIPE_ID,
            authReact: function (appInfo) {
                EmailVerification.instance = new EmailVerification(
                    __assign(__assign({}, normalisedConfig), {
                        appInfo: appInfo,
                        recipeId: EmailVerification.RECIPE_ID,
                    })
                );
                return EmailVerification.instance;
            },
            webJS: EmailVerificationWebJS.init(
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
    EmailVerification.getInstanceOrThrow = function () {
        if (EmailVerification.instance === undefined) {
            var error = "No instance of EmailVerification found. Make sure to call the EmailVerification.init method.";
            // eslint-disable-next-line supertokens-auth-react/no-direct-window-object
            if (typeof window === "undefined") {
                error = error + SSR_ERROR;
            }
            throw Error(error);
        }
        return EmailVerification.instance;
    };
    EmailVerification.prototype.isEmailVerified = function (userContext) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        return [
                            4 /*yield*/,
                            this.webJSRecipe.isEmailVerified({
                                userContext: userContext,
                            }),
                        ];
                    case 1:
                        return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    EmailVerification.reset = function () {
        if (!isTest()) {
            return;
        }
        EmailVerification.instance = undefined;
        return;
    };
    EmailVerification.RECIPE_ID = "emailverification";
    EmailVerification.EmailVerificationClaim = new EmailVerificationClaimClass(function () {
        return EmailVerification.getInstanceOrThrow().webJSRecipe;
    });
    return EmailVerification;
})(RecipeModule);

export { EmailVerification as default };
