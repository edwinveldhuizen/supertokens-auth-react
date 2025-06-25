import { __assign } from "../../../../../../../_virtual/_tslib.js";
import { jsx } from "react/jsx-runtime";
import SuperTokens from "../../../../../superTokens.js";
import UserContextWrapper from "../../../../../usercontext/userContextWrapper.js";
import { ThemeBase } from "../themeBase.js";
import { ResetPasswordEmail } from "./resetPasswordEmail.js";
import { SubmitNewPassword } from "./submitNewPassword.js";

/*
 * Component.
 */
function ResetPasswordUsingTokenTheme(props) {
    /*
     * Render.
     */
    // If no token, return SubmitNewPassword.
    if (props.submitNewPasswordForm !== undefined) {
        return jsx(SubmitNewPassword, __assign({}, props.submitNewPasswordForm));
    }
    // Otherwise, return EnterEmail.
    return jsx(ResetPasswordEmail, __assign({}, props.enterEmailForm));
}
function ResetPasswordUsingTokenThemeWrapper(props) {
    var rootStyle = SuperTokens.getInstanceOrThrow().rootStyle;
    var userStyles = props.submitNewPasswordForm
        ? props.config.resetPasswordUsingTokenFeature.submitNewPasswordForm.style
        : props.config.resetPasswordUsingTokenFeature.enterEmailForm.style;
    return jsx(
        UserContextWrapper,
        __assign(
            { userContext: props.userContext },
            {
                children: jsx(
                    ThemeBase,
                    __assign(
                        { userStyles: [rootStyle, props.config.recipeRootStyle, userStyles] },
                        { children: jsx(ResetPasswordUsingTokenTheme, __assign({}, props)) }
                    )
                ),
            }
        )
    );
}

export { ResetPasswordUsingTokenTheme, ResetPasswordUsingTokenThemeWrapper as default };
