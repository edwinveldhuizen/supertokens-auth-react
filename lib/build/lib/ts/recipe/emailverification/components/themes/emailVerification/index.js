import { __assign } from "../../../../../../../_virtual/_tslib.js";
import { jsx, Fragment } from "react/jsx-runtime";
import SuperTokens from "../../../../../superTokens.js";
import UserContextWrapper from "../../../../../usercontext/userContextWrapper.js";
import { ThemeBase } from "../../../../emailpassword/components/themes/themeBase.js";
import { useSessionContext } from "../../../../../../../session.js";
import { SendVerifyEmail } from "./sendVerifyEmail.js";
import { VerifyEmailLinkClicked } from "./verifyEmailLinkClicked.js";

function EmailVerificationTheme(props) {
    var sessionContext = useSessionContext();
    // If we have a token, return VerifyEmailLinkClicked.
    if (props.verifyEmailLinkClickedScreen !== undefined) {
        return jsx(VerifyEmailLinkClicked, __assign({}, props.verifyEmailLinkClickedScreen));
    }
    // If we have an active session, we want to send the verification email
    if (sessionContext.loading === false && sessionContext.doesSessionExist === true) {
        return jsx(SendVerifyEmail, __assign({}, props.sendVerifyEmailScreen));
    }
    // Otherwise, return an empty screen, waiting for the feature component to redirection to complete.
    return jsx(Fragment, {});
}
function EmailVerificationThemeWrapper(props) {
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
                                props.verifyEmailLinkClickedScreen === undefined
                                    ? props.config.sendVerifyEmailScreen.style
                                    : props.config.verifyEmailLinkClickedScreen.style,
                            ],
                        },
                        { children: jsx(EmailVerificationTheme, __assign({}, props)) }
                    )
                ),
            }
        )
    );
}

export { EmailVerificationTheme, EmailVerificationThemeWrapper as default };
