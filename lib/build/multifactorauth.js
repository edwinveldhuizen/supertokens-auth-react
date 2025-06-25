import { __assign } from './_virtual/_tslib.js';
import { getNormalisedUserContext } from './lib/ts/utils.js';
import { RecipeComponentsOverrideContextProvider as Provider } from './lib/ts/recipe/multifactorauth/componentOverrideContext.js';
import MultiFactorAuth from './lib/ts/recipe/multifactorauth/recipe.js';
import { FactorIds } from './lib/ts/recipe/multifactorauth/types.js';

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
var Wrapper = /** @class */ (function () {
    function Wrapper() {
    }
    Wrapper.init = function (config) {
        return MultiFactorAuth.init(config);
    };
    Wrapper.resyncSessionAndFetchMFAInfo = function (input) {
        return MultiFactorAuth.getInstanceOrThrow().webJSRecipe.resyncSessionAndFetchMFAInfo(__assign(__assign({}, input), { userContext: getNormalisedUserContext(input === null || input === void 0 ? void 0 : input.userContext) }));
    };
    Wrapper.redirectToFactor = function (input) {
        var _a, _b, _c;
        return MultiFactorAuth.getInstanceOrThrow().redirectToFactor({
            factorId: input.factorId,
            forceSetup: (_a = input.forceSetup) !== null && _a !== void 0 ? _a : false,
            redirectBack: (_b = input.redirectBack) !== null && _b !== void 0 ? _b : true,
            stepUp: (_c = input.stepUp) !== null && _c !== void 0 ? _c : false,
            navigate: input.navigate,
            userContext: getNormalisedUserContext(input.userContext),
        });
    };
    Wrapper.redirectToFactorChooser = function (input) {
        var _a, _b, _c;
        return MultiFactorAuth.getInstanceOrThrow().redirectToFactorChooser({
            nextFactorOptions: (_a = input.nextFactorOptions) !== null && _a !== void 0 ? _a : [],
            redirectBack: (_b = input.redirectBack) !== null && _b !== void 0 ? _b : true,
            stepUp: (_c = input.stepUp) !== null && _c !== void 0 ? _c : false,
            navigate: input.navigate,
            userContext: getNormalisedUserContext(input.userContext),
        });
    };
    Wrapper.MultiFactorAuthClaim = MultiFactorAuth.MultiFactorAuthClaim;
    Wrapper.FactorIds = FactorIds;
    Wrapper.ComponentsOverrideProvider = Provider;
    return Wrapper;
}());
var init = Wrapper.init;
var resyncSessionAndFetchMFAInfo = Wrapper.resyncSessionAndFetchMFAInfo;
var redirectToFactor = Wrapper.redirectToFactor;
var redirectToFactorChooser = Wrapper.redirectToFactorChooser;
var MultiFactorAuthComponentsOverrideProvider = Wrapper.ComponentsOverrideProvider;
var MultiFactorAuthClaim = MultiFactorAuth.MultiFactorAuthClaim;

export { FactorIds, MultiFactorAuthClaim, MultiFactorAuthComponentsOverrideProvider, Wrapper as default, init, redirectToFactor, redirectToFactorChooser, resyncSessionAndFetchMFAInfo };
