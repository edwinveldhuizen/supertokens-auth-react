import { __assign, __awaiter, __generator } from "../../../../../../../_virtual/_tslib.js";
import { jsx, jsxs } from "react/jsx-runtime";
import { WindowHandlerReference } from "supertokens-web-js/utils/windowHandler";
import ErrorRoundIcon from "../../../../../components/assets/errorRoundIcon.js";
import { withOverride } from "../../../../../components/componentOverride/withOverride.js";
import SuperTokens from "../../../../../superTokens.js";
import { useTranslation } from "../../../../../translation/translationContext.js";
import { useUserContext } from "../../../../../usercontext/index.js";
import BackButton from "../../library/backButton.js";
import LogoutButton from "../../library/logoutButton.js";
import { ThemeBase } from "../themeBase.js";

var AccessDeniedScreen = function (props) {
    var userContext = useUserContext();
    var t = useTranslation();
    var onLogout = function () {
        return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        return [4 /*yield*/, props.recipe.signOut({ userContext: userContext })];
                    case 1:
                        _a.sent();
                        return [
                            4 /*yield*/,
                            SuperTokens.getInstanceOrThrow().redirectToAuth({
                                show: "signin",
                                redirectBack: false,
                                userContext: userContext,
                            }),
                        ];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    var onBackButtonClicked = function () {
        // If we don't have navigate available this would mean we are not using react-router-dom, so we use window's history
        if (props.navigate === undefined) {
            return WindowHandlerReference.getReferenceOrThrow().windowHandler.getWindowUnsafe().history.back();
        }
        // If we do have navigate and goBack function on it this means we are using react-router-dom v5 or lower
        if ("goBack" in props.navigate) {
            return props.navigate.goBack();
        }
        // If we reach this code this means we are using react-router-dom v6
        return props.navigate(-1);
    };
    return jsx(
        "div",
        __assign(
            { "data-supertokens": "center accessDenied" },
            {
                children: jsx(
                    "div",
                    __assign(
                        { "data-supertokens": "container" },
                        {
                            children: jsxs(
                                "div",
                                __assign(
                                    { "data-supertokens": "row" },
                                    {
                                        children: [
                                            jsx(ErrorRoundIcon, {}),
                                            jsx(
                                                "div",
                                                __assign(
                                                    { "data-supertokens": "headerTitle" },
                                                    { children: t("ACCESS_DENIED") }
                                                )
                                            ),
                                            jsx("div", { "data-supertokens": "divider" }),
                                            props.error &&
                                                jsxs(
                                                    "div",
                                                    __assign(
                                                        { "data-supertokens": "primaryText accessDeniedError" },
                                                        { children: [" ", props.error] }
                                                    )
                                                ),
                                            jsxs(
                                                "div",
                                                __assign(
                                                    { "data-supertokens": "buttonsGroup" },
                                                    {
                                                        children: [
                                                            jsx(BackButton, { onClick: onBackButtonClicked }),
                                                            jsx(LogoutButton, { onClick: onLogout }),
                                                        ],
                                                    }
                                                )
                                            ),
                                        ],
                                    }
                                )
                            ),
                        }
                    )
                ),
            }
        )
    );
};
var AccessDeniedThemeWithOverride = withOverride("SessionAccessDenied", AccessDeniedScreen);
var AccessDeniedScreenTheme = function (props) {
    var rootStyle = SuperTokens.getInstanceOrThrow().rootStyle;
    return jsx(
        ThemeBase,
        __assign(
            { userStyles: [rootStyle, props.config.recipeRootStyle, props.config.accessDeniedScreen.style] },
            { children: jsx(AccessDeniedThemeWithOverride, __assign({}, props)) }
        )
    );
};

export { AccessDeniedScreenTheme };
