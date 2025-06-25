import { __assign } from "../../../../../../../_virtual/_tslib.js";
import { jsx, jsxs } from "react/jsx-runtime";
import { withOverride } from "../../../../../components/componentOverride/withOverride.js";
import { useTranslation } from "../../../../../translation/translationContext.js";
import BackButton from "../../../../emailpassword/components/library/backButton.js";

var FactorChooserHeader = withOverride("MFAFactorChooserHeader", function MFAFactorChooserHeader(props) {
    var t = useTranslation();
    return jsx(
        "div",
        __assign(
            { "data-supertokens": "row factorChooserHeader" },
            {
                children: jsxs(
                    "div",
                    __assign(
                        { "data-supertokens": "headerTitle withBackButton" },
                        {
                            children: [
                                props.showBackButton
                                    ? jsx(BackButton, { onClick: props.onBackButtonClicked })
                                    : jsx("span", { "data-supertokens": "backButtonPlaceholder backButtonCommon" }),
                                t("MULTI_FACTOR_CHOOSER_HEADER_TITLE"),
                                jsx("span", { "data-supertokens": "backButtonPlaceholder backButtonCommon" }),
                            ],
                        }
                    )
                ),
            }
        )
    );
});

export { FactorChooserHeader };
