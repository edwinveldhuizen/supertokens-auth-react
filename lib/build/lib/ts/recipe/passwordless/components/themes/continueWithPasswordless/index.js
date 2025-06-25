import { __assign } from "../../../../../../../_virtual/_tslib.js";
import { jsx } from "react/jsx-runtime";
import { withOverride } from "../../../../../components/componentOverride/withOverride.js";
import SuperTokens from "../../../../../superTokens.js";
import Button from "../../../../emailpassword/components/library/button.js";
import "react";
import "../../../../../../../index.js";
import "../../../../../translation/translationContext.js";
import { ThemeBase } from "../themeBase.js";

var ContinueWithPasswordless = function (props) {
    return jsx(
        "div",
        __assign(
            { "data-supertokens": "continueWithPasswordlessButtonWrapper" },
            {
                children: jsx(Button, {
                    isLoading: false,
                    onClick: function () {
                        props.continueWithPasswordlessClicked();
                    },
                    type: "button",
                    label: "PWLESS_COMBO_CONTINUE_WITH_PASSWORDLESS_BUTTON",
                }),
            }
        )
    );
};
var ContinueWithPasswordlessWithOverride = withOverride(
    "PasswordlessContinueWithPasswordless",
    ContinueWithPasswordless
);
var ContinueWithPasswordlessTheme = function (props) {
    var rootStyle = SuperTokens.getInstanceOrThrow().rootStyle;
    return jsx(
        ThemeBase,
        __assign(
            { userStyles: [rootStyle, props.config.recipeRootStyle] },
            { children: jsx(ContinueWithPasswordlessWithOverride, __assign({}, props)) }
        )
    );
};

export { ContinueWithPasswordlessTheme };
