import { __assign } from "../../../../../../_virtual/_tslib.js";
import { jsx } from "react/jsx-runtime";
import HeavyArrowLeftIcon from "../../../../components/assets/heavyArrowLeftIcon.js";

/*
 * Component.
 */
function BackButton(_a) {
    var onClick = _a.onClick;
    return jsx(
        "button",
        __assign(
            { onClick: onClick, "data-supertokens": "backButton backButtonCommon" },
            { children: jsx(HeavyArrowLeftIcon, { color: "rgb(var(--palette-textTitle))" }) }
        )
    );
}

export { BackButton as default };
