import { __assign } from "./_virtual/_tslib.js";
import { jsx } from "react/jsx-runtime";
import React__default from "react";
import { RoutingComponent } from "./lib/ts/components/routingComponent.js";
import { getSuperTokensRoutesForReactRouterDom as getSuperTokensRoutesForReactRouterDom$1 } from "./lib/ts/components/superTokensRoute.js";
import { getSuperTokensRoutesForReactRouterDomV6 } from "./lib/ts/components/superTokensRouteV6.js";
import { AuthRecipeComponentsOverrideContextProvider as Provider } from "./lib/ts/recipe/authRecipe/componentOverrideContext.js";
import AuthPageWrapper from "./lib/ts/recipe/authRecipe/components/feature/authPage/authPage.js";
import { AuthPageTheme } from "./lib/ts/recipe/authRecipe/components/theme/authPage/index.js";
import { AuthPageComponentList } from "./lib/ts/recipe/authRecipe/components/theme/authPage/authPageComponentList.js";
import { AuthPageFooter } from "./lib/ts/recipe/authRecipe/components/theme/authPage/authPageFooter.js";
import { AuthPageHeader } from "./lib/ts/recipe/authRecipe/components/theme/authPage/authPageHeader.js";
import { RecipeRouter } from "./lib/ts/recipe/recipeRouter/index.js";
import SuperTokens from "./lib/ts/superTokens.js";
import { getCurrentNormalisedUrlPath } from "./lib/ts/utils.js";

var UI = /** @class */ (function () {
    function UI() {}
    UI.getSuperTokensRoutesForReactRouterDom = function (reactRouterDom, preBuiltUiClassList, basePath) {
        if (preBuiltUiClassList === void 0) {
            preBuiltUiClassList = [];
        }
        if (reactRouterDom === undefined || preBuiltUiClassList.length === 0) {
            throw new Error(
                // eslint-disable-next-line @typescript-eslint/quotes
                'Please use getSuperTokensRoutesForReactRouterDom like getSuperTokensRoutesForReactRouterDom(require("react-router-dom"), [EmailPasswordPreBuiltUI]) in your render function'
            );
        }
        var recipeList = preBuiltUiClassList.map(function (r) {
            return r.getInstanceOrInitAndGetInstance();
        });
        if (UI.reactRouterDomIsV6 === undefined) {
            UI.reactRouterDomIsV6 = reactRouterDom.withRouter === undefined;
        }
        if (UI.reactRouterDomIsV6) {
            if (UI.reactRouterDom === undefined) {
                // this function wraps the react-router-dom v6 useNavigate function in a way
                // that enforces that it runs within a useEffect. The reason we do this is
                // cause of https://github.com/remix-run/react-router/issues/7460
                // which gets shown when visiting a social auth callback url like
                // /auth/callback/github, without a valid code or state. This then
                // doesn't navigate the user to the auth page.
                var useNavigateHookForRRDV6 = function () {
                    var navigateHook = reactRouterDom.useNavigate();
                    var _a = React__default.useState(undefined),
                        to = _a[0],
                        setTo = _a[1];
                    React__default.useEffect(
                        function () {
                            if (to !== undefined) {
                                setTo(undefined);
                                navigateHook(to);
                            }
                        },
                        [to, navigateHook, setTo]
                    );
                    return setTo;
                };
                UI.reactRouterDom = {
                    router: reactRouterDom,
                    useHistoryCustom: useNavigateHookForRRDV6,
                    useLocation: reactRouterDom.useLocation,
                };
            }
            return getSuperTokensRoutesForReactRouterDomV6({
                getReactRouterDomWithCustomHistory: UI.getReactRouterDomWithCustomHistory,
                recipeList: recipeList,
                basePath: basePath,
            });
        }
        if (UI.reactRouterDom === undefined) {
            UI.reactRouterDom = {
                router: reactRouterDom,
                useHistoryCustom: reactRouterDom.useHistory,
                useLocation: reactRouterDom.useLocation,
            };
        }
        return getSuperTokensRoutesForReactRouterDom$1({
            getReactRouterDomWithCustomHistory: UI.getReactRouterDomWithCustomHistory,
            recipeList: recipeList,
            basePath: basePath,
        });
    };
    UI.canHandleRoute = function (preBuiltUiClassList) {
        var recipeList = preBuiltUiClassList.map(function (r) {
            return r.getInstanceOrInitAndGetInstance();
        });
        var path = getCurrentNormalisedUrlPath().getAsStringDangerous();
        var isAuthPage = path === SuperTokens.getInstanceOrThrow().appInfo.websiteBasePath.getAsStringDangerous();
        if (isAuthPage) {
            return !SuperTokens.getInstanceOrThrow().disableAuthRoute;
        }
        return (
            RecipeRouter.getMatchingComponentForRouteAndRecipeIdFromPreBuiltUIList(
                getCurrentNormalisedUrlPath(),
                recipeList,
                true
            ) !== undefined
        );
    };
    UI.getRoutingComponent = function (preBuiltUiClassList) {
        var recipeList = preBuiltUiClassList.map(function (r) {
            return r.getInstanceOrInitAndGetInstance();
        });
        return jsx(RoutingComponent, {
            getReactRouterDomWithCustomHistory: UI.getReactRouterDomWithCustomHistory,
            path: getCurrentNormalisedUrlPath().getAsStringDangerous(),
            preBuiltUIList: recipeList,
        });
    };
    UI.getReactRouterDomWithCustomHistory = function () {
        return UI.reactRouterDom;
    };
    UI.AuthPage = function (props) {
        return jsx(
            AuthPageWrapper,
            __assign({}, props, {
                preBuiltUIList: props.preBuiltUIList.map(function (r) {
                    return r.getInstanceOrInitAndGetInstance();
                }),
            })
        );
    };
    UI.AuthPageTheme = AuthPageTheme;
    UI.AuthPageFooter = AuthPageFooter;
    UI.AuthPageHeader = AuthPageHeader;
    UI.AuthPageComponentList = AuthPageComponentList;
    UI.AuthRecipeComponentsOverrideContextProvider = Provider;
    return UI;
})();
var getSuperTokensRoutesForReactRouterDom = UI.getSuperTokensRoutesForReactRouterDom;
var canHandleRoute = UI.canHandleRoute;
var getRoutingComponent = UI.getRoutingComponent;
var AuthPage = UI.AuthPage;

export {
    AuthPage,
    AuthPageComponentList,
    AuthPageFooter,
    AuthPageHeader,
    AuthPageTheme,
    Provider as AuthRecipeComponentsOverrideContextProvider,
    canHandleRoute,
    UI as default,
    getRoutingComponent,
    getSuperTokensRoutesForReactRouterDom,
};
