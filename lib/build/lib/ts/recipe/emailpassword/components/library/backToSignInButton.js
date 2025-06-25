import { __assign } from "../../../../../../_virtual/_tslib.js";
import { jsxs, jsx } from "react/jsx-runtime";
import "../../../../../../index.js";
import ArrowLeftIcon from "../../../../components/assets/arrowLeftIcon.js";
import { useTranslation } from "../../../../translation/translationContext.js";

/*
 * Component.
 */
function BackToSignInButton(_a) {
    var onClick = _a.onClick;
    var t = useTranslation();
    return jsxs(
        "div",
        __assign(
            { "data-supertokens": "secondaryText secondaryLinkWithLeftArrow", onClick: onClick },
            {
                children: [
                    jsx(ArrowLeftIcon, { color: "rgb(var(--palette-secondaryText))" }),
                    t("EMAIL_PASSWORD_RESET_SIGN_IN_LINK"),
                ],
            }
        )
    );
}

export { BackToSignInButton as default };
