import { __assign } from "../../../../../../../_virtual/_tslib.js";
import { jsxs, jsx } from "react/jsx-runtime";
import { withOverride } from "../../../../../components/componentOverride/withOverride.js";
import { useTranslation } from "../../../../../translation/translationContext.js";

var FactorOption = withOverride("MFAFactorOption", function MFAFactorOption(_a) {
    var onClick = _a.onClick,
        id = _a.id,
        name = _a.name,
        description = _a.description,
        logo = _a.logo;
    var t = useTranslation();
    return jsxs(
        "a",
        __assign(
            { "data-supertokens": "factorChooserOption ".concat(id), onClick: onClick },
            {
                children: [
                    jsxs("div", __assign({ "data-supertokens": "factorLogo" }, { children: [" ", logo({})] })),
                    jsxs(
                        "div",
                        __assign(
                            { "data-supertokens": "factorOptionText" },
                            {
                                children: [
                                    jsx("h6", __assign({ "data-supertokens": "factorName" }, { children: t(name) })),
                                    jsx(
                                        "p",
                                        __assign(
                                            { "data-supertokens": "factorDescription" },
                                            { children: t(description) }
                                        )
                                    ),
                                ],
                            }
                        )
                    ),
                ],
            }
        )
    );
});

export { FactorOption };
