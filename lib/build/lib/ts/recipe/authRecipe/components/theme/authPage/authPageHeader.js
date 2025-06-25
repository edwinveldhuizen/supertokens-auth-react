import { __assign } from "../../../../../../../_virtual/_tslib.js";
import { jsxs, jsx } from "react/jsx-runtime";
import { Fragment } from "react";
import { withOverride } from "../../../../../components/componentOverride/withOverride.js";
import { useTranslation } from "../../../../../translation/translationContext.js";
import BackButton from "../../../../emailpassword/components/library/backButton.js";

var AuthPageHeader = withOverride("AuthPageHeader", function AuthPageHeader(_a) {
    var onSignInUpSwitcherClick = _a.onSignInUpSwitcherClick,
        hasSeparateSignUpView = _a.hasSeparateSignUpView,
        isSignUp = _a.isSignUp,
        showBackButton = _a.showBackButton,
        resetFactorList = _a.resetFactorList,
        oauth2ClientInfo = _a.oauth2ClientInfo,
        headerLabel = _a.headerLabel,
        _b = _a.hideSignInSwitcher,
        hideSignInSwitcher = _b === void 0 ? false : _b;
    var t = useTranslation();
    return jsxs(Fragment, {
        children: [
            (oauth2ClientInfo === null || oauth2ClientInfo === void 0 ? void 0 : oauth2ClientInfo.logoUri) &&
                jsx("img", {
                    src: oauth2ClientInfo.logoUri,
                    alt: oauth2ClientInfo.clientName,
                    "data-supertokens": "authPageTitleOAuthClientLogo",
                }),
            jsxs(
                "div",
                __assign(
                    { "data-supertokens": "headerTitle withBackButton" },
                    {
                        children: [
                            showBackButton
                                ? jsx(BackButton, { onClick: resetFactorList })
                                : jsx("span", { "data-supertokens": "backButtonPlaceholder backButtonCommon" }),
                            headerLabel !== undefined
                                ? t(headerLabel)
                                : !hasSeparateSignUpView
                                ? t("AUTH_PAGE_HEADER_TITLE_SIGN_IN_AND_UP")
                                : isSignUp
                                ? t("AUTH_PAGE_HEADER_TITLE_SIGN_UP")
                                : t("AUTH_PAGE_HEADER_TITLE_SIGN_IN"),
                            jsx("span", { "data-supertokens": "backButtonPlaceholder backButtonCommon" }),
                        ],
                    }
                )
            ),
            oauth2ClientInfo &&
                oauth2ClientInfo.clientName !== undefined &&
                oauth2ClientInfo.clientName.length > 0 &&
                jsxs(
                    "div",
                    __assign(
                        { "data-supertokens": "authPageTitleOAuthClient" },
                        {
                            children: [
                                t("AUTH_PAGE_HEADER_TITLE_SIGN_IN_UP_TO_APP"),
                                oauth2ClientInfo.clientUri !== undefined
                                    ? jsx(
                                          "a",
                                          __assign(
                                              {
                                                  "data-supertokens": "authPageTitleOAuthClientUrl link",
                                                  href: oauth2ClientInfo.clientUri,
                                              },
                                              { children: oauth2ClientInfo.clientName }
                                          )
                                      )
                                    : jsx(
                                          "span",
                                          __assign(
                                              { "data-supertokens": "authPageTitleOAuthClientName" },
                                              { children: oauth2ClientInfo.clientName }
                                          )
                                      ),
                            ],
                        }
                    )
                ),
            !hideSignInSwitcher &&
                hasSeparateSignUpView &&
                (!isSignUp
                    ? jsxs(
                          "div",
                          __assign(
                              { "data-supertokens": "headerSubtitle secondaryText" },
                              {
                                  children: [
                                      t("AUTH_PAGE_HEADER_SUBTITLE_SIGN_IN_START"),
                                      jsx(
                                          "span",
                                          __assign(
                                              { "data-supertokens": "link", onClick: onSignInUpSwitcherClick },
                                              { children: t("AUTH_PAGE_HEADER_SUBTITLE_SIGN_IN_SIGN_UP_LINK") }
                                          )
                                      ),
                                      t("AUTH_PAGE_HEADER_SUBTITLE_SIGN_IN_END"),
                                  ],
                              }
                          )
                      )
                    : jsxs(
                          "div",
                          __assign(
                              { "data-supertokens": "headerSubtitle secondaryText" },
                              {
                                  children: [
                                      t("AUTH_PAGE_HEADER_SUBTITLE_SIGN_UP_START"),
                                      jsx(
                                          "span",
                                          __assign(
                                              { "data-supertokens": "link", onClick: onSignInUpSwitcherClick },
                                              { children: t("AUTH_PAGE_HEADER_SUBTITLE_SIGN_UP_SIGN_IN_LINK") }
                                          )
                                      ),
                                      t("AUTH_PAGE_HEADER_SUBTITLE_SIGN_UP_END"),
                                  ],
                              }
                          )
                      )),
            jsx("div", { "data-supertokens": "divider" }),
        ],
    });
});

export { AuthPageHeader };
