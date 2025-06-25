import { __assign } from '../../../../_virtual/_tslib.js';
import { normaliseRecipeModuleConfig } from '../recipeModule/utils.js';

function normaliseOAuth2Config(config) {
    var _a;
    return __assign(__assign({}, normaliseRecipeModuleConfig(config)), { disableDefaultUI: (_a = config === null || config === void 0 ? void 0 : config.disableDefaultUI) !== null && _a !== void 0 ? _a : false, tryRefreshPage: __assign({ disableDefaultUI: false }, config === null || config === void 0 ? void 0 : config.tryRefreshPage), oauth2LogoutScreen: __assign({ disableDefaultUI: false, style: "" }, config === null || config === void 0 ? void 0 : config.oauth2LogoutScreen), override: __assign({ functions: function (originalImplementation) { return originalImplementation; } }, config === null || config === void 0 ? void 0 : config.override) });
}

export { normaliseOAuth2Config };
