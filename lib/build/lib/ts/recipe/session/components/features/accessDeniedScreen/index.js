import { __assign } from "../../../../../../../_virtual/_tslib.js";
import { jsx } from "react/jsx-runtime";
import { ComponentOverrideContext } from "../../../../../components/componentOverride/componentOverrideContext.js";
import FeatureWrapper from "../../../../../components/featureWrapper.js";
import SuperTokens from "../../../../../superTokens.js";
import UI from "../../../../../../../ui-entry.js";
import { AccessDeniedScreenTheme } from "../../themes/accessDeniedScreenTheme/index.js";
import { defaultTranslationsSession } from "../../themes/translations.js";

var AccessDeniedScreen = function (props) {
    var _a, _b, _c;
    var recipeComponentOverrides = props.useComponentOverrides();
    var navigate =
        (_a = props.navigate) !== null && _a !== void 0
            ? _a
            : (_b = UI.getReactRouterDomWithCustomHistory()) === null || _b === void 0
            ? void 0
            : _b.useHistoryCustom();
    return jsx(
        ComponentOverrideContext.Provider,
        __assign(
            { value: recipeComponentOverrides },
            {
                children: jsx(
                    FeatureWrapper,
                    __assign(
                        {
                            defaultStore: defaultTranslationsSession,
                            useShadowDom:
                                (_c = props.useShadowDom) !== null && _c !== void 0
                                    ? _c
                                    : SuperTokens.getInstanceOrThrow().useShadowDom,
                        },
                        {
                            children: jsx(AccessDeniedScreenTheme, {
                                config: props.recipe.config,
                                navigate: navigate,
                                recipe: props.recipe,
                                error: props.error,
                            }),
                        }
                    )
                ),
            }
        )
    );
};

export { AccessDeniedScreen as default };
