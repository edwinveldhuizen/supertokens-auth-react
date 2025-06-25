import { __assign } from './_virtual/_tslib.js';
import { getNormalisedUserContext } from './lib/ts/utils.js';
import { RecipeComponentsOverrideContextProvider as Provider } from './lib/ts/recipe/totp/componentOverrideContext.js';
import TOTP from './lib/ts/recipe/totp/recipe.js';

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
        return TOTP.init(config);
    };
    Wrapper.createDevice = function (input) {
        return TOTP.getInstanceOrThrow().webJSRecipe.createDevice(__assign(__assign({}, input), { userContext: getNormalisedUserContext(input === null || input === void 0 ? void 0 : input.userContext) }));
    };
    Wrapper.verifyCode = function (input) {
        return TOTP.getInstanceOrThrow().webJSRecipe.verifyCode(__assign(__assign({}, input), { userContext: getNormalisedUserContext(input === null || input === void 0 ? void 0 : input.userContext) }));
    };
    Wrapper.verifyDevice = function (input) {
        return TOTP.getInstanceOrThrow().webJSRecipe.verifyDevice(__assign(__assign({}, input), { userContext: getNormalisedUserContext(input === null || input === void 0 ? void 0 : input.userContext) }));
    };
    Wrapper.removeDevice = function (input) {
        return TOTP.getInstanceOrThrow().webJSRecipe.removeDevice(__assign(__assign({}, input), { userContext: getNormalisedUserContext(input === null || input === void 0 ? void 0 : input.userContext) }));
    };
    Wrapper.listDevices = function (input) {
        return TOTP.getInstanceOrThrow().webJSRecipe.listDevices(__assign(__assign({}, input), { userContext: getNormalisedUserContext(input === null || input === void 0 ? void 0 : input.userContext) }));
    };
    Wrapper.ComponentsOverrideProvider = Provider;
    return Wrapper;
}());
var init = Wrapper.init;
var createDevice = Wrapper.createDevice;
var verifyCode = Wrapper.verifyCode;
var verifyDevice = Wrapper.verifyDevice;
var removeDevice = Wrapper.removeDevice;
var listDevices = Wrapper.listDevices;
var TOTPComponentsOverrideProvider = Wrapper.ComponentsOverrideProvider;

export { TOTPComponentsOverrideProvider, createDevice, Wrapper as default, init, listDevices, removeDevice, verifyCode, verifyDevice };
