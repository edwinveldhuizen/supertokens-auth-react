import { __assign } from "../../../../_virtual/_tslib.js";
import { logDebugMessage } from "../../logger.js";
import { normaliseRecipeModuleConfig } from "../recipeModule/utils.js";

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
function normaliseMultiFactorAuthFeature(config) {
    var _a;
    if (config === undefined) {
        config = {};
    }
    var disableDefaultUI = config.disableDefaultUI === true;
    var override = __assign(
        {
            functions: function (originalImplementation) {
                return originalImplementation;
            },
        },
        config.override
    );
    return __assign(__assign({}, normaliseRecipeModuleConfig(config)), {
        disableDefaultUI: disableDefaultUI,
        firstFactors: config === null || config === void 0 ? void 0 : config.firstFactors,
        getSecondaryFactorInfo: function (orig) {
            return orig;
        },
        factorChooserScreen: (_a = config.factorChooserScreen) !== null && _a !== void 0 ? _a : {},
        override: override,
    });
}
function getAvailableFactors(factors, nextArrayQueryParam, recipe, userContext) {
    logDebugMessage("getAvailableFactors: allowed to setup: ".concat(factors.allowedToSetup));
    logDebugMessage("getAvailableFactors: already setup: ".concat(factors.alreadySetup));
    logDebugMessage("getAvailableFactors: next from factorInfo: ".concat(factors.next));
    logDebugMessage("getAvailableFactors: nextArrayQueryParam: ".concat(nextArrayQueryParam));
    logDebugMessage(
        "getAvailableFactors: secondary factors: ".concat(
            recipe.getSecondaryFactors(userContext).map(function (f) {
                return f.id;
            })
        )
    );
    // There are 3 cases here:
    // 1. The app provided an array of factors to show (nextArrayQueryParam) -> we show whatever is in the array
    // 2. no app provided list and validator passed -> we show all factors available to set up or complete
    // 3. no app provided list and validator failing -> we show whatever the BE tells us to (this is already filtered by allowedToSetup&alreadySetup on the BE)
    var nextArr = nextArrayQueryParam !== undefined ? nextArrayQueryParam.split(",") : factors.next;
    var availableFactors = recipe.getSecondaryFactors(userContext).filter(function (_a) {
        var id = _a.id;
        return nextArr.length === 0
            ? factors.allowedToSetup.includes(id) || factors.alreadySetup.includes(id)
            : nextArr.includes(id);
    });
    return availableFactors;
}

export { getAvailableFactors, normaliseMultiFactorAuthFeature };
