import { jsx } from "react/jsx-runtime";
import NormalisedURLPath from "supertokens-web-js/lib/build/normalisedURLPath";
import SuperTokens from "../superTokens.js";
import { RoutingComponent } from "./routingComponent.js";

/*
 * Component.
 */
function getSuperTokensRoutesForReactRouterDomV6(_a) {
    var getReactRouterDomWithCustomHistory = _a.getReactRouterDomWithCustomHistory,
        recipeList = _a.recipeList,
        basePath = _a.basePath;
    var routerInfo = getReactRouterDomWithCustomHistory();
    if (routerInfo === undefined) {
        return [];
    }
    var Route = routerInfo.router.Route;
    var routes = Object.values(
        recipeList.reduce(function (routes, recipe) {
            var pathsToFeatureComponentWithRecipeIdMap = recipe.getPathsToFeatureComponentWithRecipeIdMap();
            Object.keys(pathsToFeatureComponentWithRecipeIdMap).forEach(function (path) {
                path = path === "" ? "/" : path;
                var pathForRouter = getPathForRouter(basePath, path);
                if (!(path in routes)) {
                    routes[path] = jsx(
                        Route,
                        {
                            path: pathForRouter,
                            element: jsx(RoutingComponent, {
                                getReactRouterDomWithCustomHistory: getReactRouterDomWithCustomHistory,
                                preBuiltUIList: recipeList,
                                path: path,
                            }),
                        },
                        "st-".concat(path)
                    );
                }
            });
            return routes;
        }, {})
    );
    if (
        !SuperTokens.getInstanceOrThrow().disableAuthRoute &&
        recipeList.some(function (ui) {
            return ui.getAuthComponents().length !== 0;
        })
    ) {
        var path = SuperTokens.getInstanceOrThrow()
            .appInfo.websiteBasePath.appendPath(new NormalisedURLPath("/"))
            .getAsStringDangerous();
        routes.push(
            jsx(
                Route,
                {
                    path: getPathForRouter(basePath, path),
                    element: jsx(RoutingComponent, {
                        getReactRouterDomWithCustomHistory: getReactRouterDomWithCustomHistory,
                        preBuiltUIList: recipeList,
                        path: path,
                    }),
                },
                "st-/auth"
            )
        );
    }
    return routes;
}
function getPathForRouter(basePath, path) {
    if (basePath !== undefined) {
        if (path.startsWith(basePath)) {
            path = path.slice(basePath.length);
            if (!path.startsWith("/")) {
                path = "/" + path;
            }
        } else {
            throw new Error("basePath has to be a prefix of websiteBasePath passed to SuperTokens.init");
        }
    }
    return path;
}

export { getSuperTokensRoutesForReactRouterDomV6 };
