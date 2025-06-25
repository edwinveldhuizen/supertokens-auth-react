import { __assign } from "../../../../_virtual/_tslib.js";
import { normaliseAuthRecipe } from "../authRecipe/utils.js";

function normaliseWebauthnConfig(config) {
    if (config === undefined) {
        config = {};
    }
    var override = __assign(
        {
            functions: function (originalImplementation) {
                return originalImplementation;
            },
        },
        config.override
    );
    return __assign(__assign({}, normaliseAuthRecipe(config)), {
        signInAndUpFeature: normalisePasskeyBaseConfig(config.signInAndUpFeature),
        recoveryFeature: normalisePasskeyBaseConfig(config.recoveryFeature),
        override: override,
    });
}
function normalisePasskeyBaseConfig(config) {
    var style = config && config.style !== undefined ? config.style : "";
    return __assign(__assign({}, config), { style: style });
}

export { normaliseWebauthnConfig };
