import { __assign } from "../../../../../../../_virtual/_tslib.js";
import { jsx } from "react/jsx-runtime";
import { ComponentOverrideContext } from "../../../../../components/componentOverride/componentOverrideContext.js";
import { WithOrWithoutShadowDom } from "../../../../../components/featureWrapper.js";
import SuperTokens from "../../../../../superTokens.js";
import { useRecipeComponentOverrideContext as useContext } from "../../../componentOverrideContext.js";
import Multitenancy from "../../../recipe.js";
import { DynamicLoginMethodsSpinnerTheme } from "../../themes/dynamicLoginMethodsSpinner/index.js";

// TODO: move this to the root components dir and rename (incl. the override)
// This is a special "feature" component:
//  - it's used inside FeatureWrapper & RoutingComponent (meaning it can't use FeatureWrapper)
//  - it's not used in any specific route (multitenancy doesn't have a pre-built UI)
var DynamicLoginMethodsSpinner = function () {
    var recipe = Multitenancy.getInstanceOrThrow();
    var recipeComponentOverrides = useContext();
    return jsx(
        ComponentOverrideContext.Provider,
        __assign(
            { value: recipeComponentOverrides },
            {
                children: jsx(
                    WithOrWithoutShadowDom,
                    __assign(
                        { useShadowDom: SuperTokens.getInstanceOrThrow().useShadowDom },
                        { children: jsx(DynamicLoginMethodsSpinnerTheme, { config: recipe.config }) }
                    )
                ),
            }
        )
    );
};

export { DynamicLoginMethodsSpinner as default };
