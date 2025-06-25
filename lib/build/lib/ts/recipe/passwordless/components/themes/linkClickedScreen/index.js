import { __assign } from "../../../../../../../_virtual/_tslib.js";
import { jsx, jsxs } from "react/jsx-runtime";
import React__default, { useState } from "react";
import SpinnerIcon from "../../../../../components/assets/spinnerIcon.js";
import { withOverride } from "../../../../../components/componentOverride/withOverride.js";
import SuperTokens from "../../../../../superTokens.js";
import { useTranslation } from "../../../../../translation/translationContext.js";
import Button from "../../../../emailpassword/components/library/button.js";
import "../../../../../../../index.js";
import { ThemeBase } from "../themeBase.js";

var PasswordlessLinkClickedScreen = function (props) {
    var t = useTranslation();
    var _a = useState(false),
        loading = _a[0],
        setLoading = _a[1];
    return jsx(
        "div",
        __assign(
            { "data-supertokens": "container" },
            {
                children: jsx(
                    "div",
                    __assign(
                        { "data-supertokens": "row" },
                        {
                            children:
                                props.requireUserInteraction === true
                                    ? jsxs(React__default.Fragment, {
                                          children: [
                                              jsx(
                                                  "div",
                                                  __assign(
                                                      { "data-supertokens": "headerTitle" },
                                                      { children: t("PWLESS_LINK_CLICKED_CONTINUE_HEADER") }
                                                  )
                                              ),
                                              jsx(
                                                  "div",
                                                  __assign(
                                                      { "data-supertokens": "headerSubtitle secondaryText" },
                                                      { children: t("PWLESS_LINK_CLICKED_CONTINUE_DESC") }
                                                  )
                                              ),
                                              jsx(
                                                  "div",
                                                  __assign(
                                                      { "data-supertokens": "continueButtonWrapper" },
                                                      {
                                                          children: jsx(Button, {
                                                              isLoading: loading,
                                                              onClick: function () {
                                                                  setLoading(true);
                                                                  props.consumeCode();
                                                              },
                                                              type: "button",
                                                              label: "PWLESS_LINK_CLICKED_CONTINUE_BUTTON",
                                                          }),
                                                      }
                                                  )
                                              ),
                                          ],
                                      })
                                    : jsx(
                                          "div",
                                          __assign(
                                              { "data-supertokens": "spinner" },
                                              { children: jsx(SpinnerIcon, {}) }
                                          )
                                      ),
                        }
                    )
                ),
            }
        )
    );
};
var LinkClickedScreenWithOverride = withOverride("PasswordlessLinkClickedScreen", PasswordlessLinkClickedScreen);
var LinkClickedScreen = function (props) {
    var rootStyle = SuperTokens.getInstanceOrThrow().rootStyle;
    return jsx(
        ThemeBase,
        __assign(
            { userStyles: [rootStyle, props.config.recipeRootStyle, props.config.linkClickedScreenFeature.style] },
            { children: jsx(LinkClickedScreenWithOverride, __assign({}, props)) }
        )
    );
};

export { LinkClickedScreen };
