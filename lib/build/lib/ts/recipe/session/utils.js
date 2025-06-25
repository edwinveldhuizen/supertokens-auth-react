import { __assign, __awaiter, __generator } from '../../../../_virtual/_tslib.js';
import { getGlobalClaimValidators } from 'supertokens-web-js/utils';
import { WindowHandlerReference } from 'supertokens-web-js/utils/windowHandler';
import SuperTokens from '../../superTokens.js';
import { normaliseRecipeModuleConfig } from '../recipeModule/utils.js';

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
function normaliseSessionConfig(config) {
    var _a, _b, _c;
    if (config === undefined) {
        config = {};
    }
    var accessDeniedScreenStyle = (_b = (_a = config.accessDeniedScreen) === null || _a === void 0 ? void 0 : _a.style) !== null && _b !== void 0 ? _b : "";
    var accessDeniedScreen = {
        style: accessDeniedScreenStyle,
    };
    var override = __assign({ functions: function (originalImplementation) { return originalImplementation; } }, config.override);
    return __assign(__assign({}, normaliseRecipeModuleConfig(config)), { 
        // TODO: ideally we'd get the default (or normalized) value from supertokens-website
        invalidClaimStatusCode: (_c = config.invalidClaimStatusCode) !== null && _c !== void 0 ? _c : 403, accessDeniedScreen: accessDeniedScreen, override: override });
}
var getFailureRedirectionInfo = function (_a) {
    var invalidClaims = _a.invalidClaims, overrideGlobalClaimValidators = _a.overrideGlobalClaimValidators, userContext = _a.userContext;
    return __awaiter(void 0, void 0, void 0, function () {
        var globalValidators, failedClaim, _loop_1, _i, globalValidators_1, validator, state_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    globalValidators = getGlobalClaimValidators({
                        overrideGlobalClaimValidators: overrideGlobalClaimValidators,
                        userContext: userContext,
                    });
                    failedClaim = undefined;
                    _loop_1 = function (validator) {
                        var claim, failureCallback, redirectPath;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    claim = invalidClaims.find(function (c) { return c.id === validator.id; });
                                    if (!(claim !== undefined)) return [3 /*break*/, 2];
                                    failureCallback = validator.onFailureRedirection;
                                    if (!failureCallback) return [3 /*break*/, 2];
                                    return [4 /*yield*/, failureCallback({ reason: claim.reason, userContext: userContext })];
                                case 1:
                                    redirectPath = _c.sent();
                                    if (redirectPath !== undefined) {
                                        return [2 /*return*/, { value: {
                                                    redirectPath: redirectPath,
                                                    failedClaim: claim,
                                                } }];
                                    }
                                    _c.label = 2;
                                case 2:
                                    if (validator.showAccessDeniedOnFailure !== false && failedClaim === undefined) {
                                        failedClaim = claim;
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    };
                    _i = 0, globalValidators_1 = globalValidators;
                    _b.label = 1;
                case 1:
                    if (!(_i < globalValidators_1.length)) return [3 /*break*/, 4];
                    validator = globalValidators_1[_i];
                    return [5 /*yield**/, _loop_1(validator)];
                case 2:
                    state_1 = _b.sent();
                    if (typeof state_1 === "object")
                        return [2 /*return*/, state_1.value];
                    _b.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, {
                        redirectPath: undefined,
                        failedClaim: failedClaim,
                    }];
            }
        });
    });
};
function validateAndCompareOnFailureRedirectionURLToCurrent(redirectURL) {
    var currentUrl = WindowHandlerReference.getReferenceOrThrow().windowHandler.location.getHref();
    var fullRedirectURL;
    try {
        new URL(redirectURL);
        // if the url is a full, valid url, we can use that
        fullRedirectURL = redirectURL;
    }
    catch (_a) {
        // If we get here, we know it's not full url
        // We check if it's an absolute path
        if (!redirectURL.startsWith("/")) {
            throw new Error("onFailureRedirectionURL returned a relative url: ".concat(redirectURL));
        }
        var appInfo = SuperTokens.getInstanceOrThrow().appInfo;
        // otherwise we prepend the websiteDomain
        fullRedirectURL = "".concat(appInfo.websiteDomain.getAsStringDangerous()).concat(redirectURL);
    }
    return currentUrl === fullRedirectURL;
}

export { getFailureRedirectionInfo, normaliseSessionConfig, validateAndCompareOnFailureRedirectionURLToCurrent };
