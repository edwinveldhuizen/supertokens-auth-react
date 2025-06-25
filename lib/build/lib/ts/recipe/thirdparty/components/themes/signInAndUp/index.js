import { __assign } from "../../../../../../../_virtual/_tslib.js";
import { jsx } from "react/jsx-runtime";
import SuperTokens from "../../../../../superTokens.js";
import UserContextWrapper from "../../../../../usercontext/userContextWrapper.js";
import { ThemeBase } from "../themeBase.js";
import { ProvidersForm } from "./providersForm.js";

var SignInAndUpThemeWrapper = function (props) {
    var rootStyle = SuperTokens.getInstanceOrThrow().rootStyle;
    return jsx(
        UserContextWrapper,
        __assign(
            { userContext: props.userContext },
            {
                children: jsx(
                    ThemeBase,
                    __assign(
                        {
                            userStyles: [
                                rootStyle,
                                props.config.recipeRootStyle,
                                props.config.signInAndUpFeature.style,
                            ],
                        },
                        { children: jsx(ProvidersForm, __assign({}, props)) }
                    )
                ),
            }
        )
    );
};

export { SignInAndUpThemeWrapper as default };
