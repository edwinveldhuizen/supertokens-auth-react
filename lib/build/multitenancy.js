import { AllowedDomainsClaim } from "supertokens-web-js/recipe/multitenancy";
export { AllowedDomainsClaim } from "supertokens-web-js/recipe/multitenancy";
import { RecipeComponentsOverrideContextProvider as Provider } from "./lib/ts/recipe/multitenancy/componentOverrideContext.js";
import Multitenancy from "./lib/ts/recipe/multitenancy/recipe.js";

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
var Wrapper = /** @class */ (function () {
    function Wrapper() {}
    Wrapper.init = function (config) {
        return Multitenancy.init(config);
    };
    Wrapper.AllowedDomainsClaim = AllowedDomainsClaim;
    Wrapper.ComponentsOverrideProvider = Provider;
    return Wrapper;
})();
var init = Wrapper.init;
var MultitenancyComponentsOverrideProvider = Wrapper.ComponentsOverrideProvider;

export { MultitenancyComponentsOverrideProvider, Wrapper as default, init };
