import { __assign } from '../../../../_virtual/_tslib.js';
import { normaliseRecipeModuleConfig } from '../recipeModule/utils.js';

function normaliseMultitenancyConfig(config) {
    return __assign(__assign({}, normaliseRecipeModuleConfig(config)), { override: __assign({ functions: function (originalImplementation) { return originalImplementation; } }, config === null || config === void 0 ? void 0 : config.override) });
}
function hasIntersectingRecipes(tenantMethods, recipeList) {
    return tenantMethods.firstFactors.some(function (factorId) { return recipeList.some(function (r) { return r.firstFactorIds.includes(factorId); }); });
}

export { hasIntersectingRecipes, normaliseMultitenancyConfig };
