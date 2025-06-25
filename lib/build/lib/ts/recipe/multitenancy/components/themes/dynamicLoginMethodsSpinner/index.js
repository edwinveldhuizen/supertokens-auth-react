import { __assign } from "../../../../../../../_virtual/_tslib.js";
import { jsx } from "react/jsx-runtime";
import SpinnerIcon from "../../../../../components/assets/spinnerIcon.js";
import { withOverride } from "../../../../../components/componentOverride/withOverride.js";
import SuperTokens from "../../../../../superTokens.js";
import { ThemeBase } from "../themeBase.js";

var MultitenancyDynamicLoginMethodsSpinnerTheme = function () {
    return jsx(
        "div",
        __assign(
            { "data-supertokens": "container delayedRender" },
            {
                children: jsx(
                    "div",
                    __assign(
                        { "data-supertokens": "row" },
                        {
                            children: jsx(
                                "div",
                                __assign(
                                    { "data-supertokens": "spinner delayedRender" },
                                    { children: jsx(SpinnerIcon, {}) }
                                )
                            ),
                        }
                    )
                ),
            }
        )
    );
};
var DynamicLoginMethodsSpinnerThemeWithOverride = withOverride(
    "MultitenancyDynamicLoginMethodsSpinnerTheme",
    MultitenancyDynamicLoginMethodsSpinnerTheme
);
var DynamicLoginMethodsSpinnerTheme = function (props) {
    var rootStyle = SuperTokens.getInstanceOrThrow().rootStyle;
    return jsx(
        ThemeBase,
        __assign(
            { userStyles: [rootStyle, props.config.recipeRootStyle] },
            { children: jsx(DynamicLoginMethodsSpinnerThemeWithOverride, {}) }
        )
    );
};

export { DynamicLoginMethodsSpinnerTheme };
