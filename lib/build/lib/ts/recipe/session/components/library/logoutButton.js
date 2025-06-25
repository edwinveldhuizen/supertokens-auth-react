import { __assign } from "../../../../../../_virtual/_tslib.js";
import { jsxs, jsx } from "react/jsx-runtime";
import ArrowLeftIcon from "../../../../components/assets/arrowLeftIcon.js";
import { useTranslation } from "../../../../translation/translationContext.js";

/*
 * Component.
 */
function LogoutButton(_a) {
    var onClick = _a.onClick;
    var t = useTranslation();
    return jsxs(
        "button",
        __assign(
            { onClick: onClick, "data-supertokens": "buttonBase logoutButton" },
            {
                children: [
                    jsx(ArrowLeftIcon, { color: "rgb(var(--palette-textGray))" }),
                    jsx("span", { children: t("LOGOUT") }),
                ],
            }
        )
    );
}

export { LogoutButton as default };
