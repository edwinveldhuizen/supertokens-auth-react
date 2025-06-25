import { __awaiter, __generator, __assign } from './_virtual/_tslib.js';
import { SuperTokensWrapper } from './lib/ts/components/supertokensWrapper.js';
import SuperTokens from './lib/ts/superTokens.js';
import { useTranslation } from './lib/ts/translation/translationContext.js';
import { useUserContext } from './lib/ts/usercontext/index.js';
import { getNormalisedUserContext } from './lib/ts/utils.js';

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
 * API Wrapper exposed to user.
 */
var SuperTokensAPIWrapper = /** @class */ (function () {
    function SuperTokensAPIWrapper() {
    }
    SuperTokensAPIWrapper.init = function (config) {
        SuperTokens.init(config);
    };
    SuperTokensAPIWrapper.changeLanguage = function (language) {
        return SuperTokens.getInstanceOrThrow().changeLanguage(language);
    };
    SuperTokensAPIWrapper.loadTranslation = function (store) {
        return SuperTokens.getInstanceOrThrow().loadTranslation(store);
    };
    var _a;
    _a = SuperTokensAPIWrapper;
    SuperTokensAPIWrapper.SuperTokensWrapper = SuperTokensWrapper;
    SuperTokensAPIWrapper.redirectToAuth = function (options) { return __awaiter(void 0, void 0, void 0, function () {
        var _b;
        return __generator(_a, function (_c) {
            return [2 /*return*/, SuperTokens.getInstanceOrThrow().redirectToAuth(__assign(__assign({}, options), { redirectBack: (_b = options === null || options === void 0 ? void 0 : options.redirectBack) !== null && _b !== void 0 ? _b : true, userContext: getNormalisedUserContext(options === null || options === void 0 ? void 0 : options.userContext) }))];
        });
    }); };
    SuperTokensAPIWrapper.useTranslation = useTranslation;
    SuperTokensAPIWrapper.useUserContext = useUserContext;
    return SuperTokensAPIWrapper;
}());
var init = SuperTokensAPIWrapper.init;
var changeLanguage = SuperTokensAPIWrapper.changeLanguage;
var loadTranslation = SuperTokensAPIWrapper.loadTranslation;
var redirectToAuth = SuperTokensAPIWrapper.redirectToAuth;

export { SuperTokensWrapper, changeLanguage, SuperTokensAPIWrapper as default, init, loadTranslation, redirectToAuth, useTranslation, useUserContext };
