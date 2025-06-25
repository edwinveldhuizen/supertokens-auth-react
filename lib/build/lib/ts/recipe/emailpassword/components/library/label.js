import { __assign } from "../../../../../../_virtual/_tslib.js";
import { jsxs } from "react/jsx-runtime";
import "../../../../../../index.js";
import { useTranslation } from "../../../../translation/translationContext.js";

function Label(_a) {
    var value = _a.value,
        showIsRequired = _a.showIsRequired;
    var t = useTranslation();
    return jsxs(
        "div",
        __assign(
            { "data-supertokens": "label" },
            { children: [t(value), showIsRequired && value && value.trim() !== "" && " *"] }
        )
    );
}

export { Label as default };
