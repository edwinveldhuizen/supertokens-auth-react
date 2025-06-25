import { __assign } from '../../../_virtual/_tslib.js';
import { jsx } from 'react/jsx-runtime';
import NormalisedURLPath from 'supertokens-web-js/lib/build/normalisedURLPath';
import SuperTokens from '../superTokens.js';
import { RoutingComponent } from './routingComponent.js';

/*
 * Component.
 */
function getSuperTokensRoutesForReactRouterDom(_a) {
    var getReactRouterDomWithCustomHistory = _a.getReactRouterDomWithCustomHistory, recipeList = _a.recipeList, basePath = _a.basePath;
    var routerInfo = getReactRouterDomWithCustomHistory();
    if (routerInfo === undefined) {
        return [];
    }
    var Route = routerInfo.router.Route;
    var routes = Object.values(recipeList.reduce(function (routes, recipe) {
        var pathsToFeatureComponentWithRecipeIdMap = recipe.getPathsToFeatureComponentWithRecipeIdMap();
        Object.keys(pathsToFeatureComponentWithRecipeIdMap).forEach(function (path) {
            path = path === "" ? "/" : path;
            var pathForRouter = getPathForRouter(basePath, path);
            if (!(path in routes)) {
                routes[path] = (jsx(Route, __assign({ exact: true, path: pathForRouter }, { children: jsx(RoutingComponent, { getReactRouterDomWithCustomHistory: getReactRouterDomWithCustomHistory, preBuiltUIList: recipeList, path: path }) }), "st-".concat(path)));
            }
        });
        return routes;
    }, {}));
    if (!SuperTokens.getInstanceOrThrow().disableAuthRoute &&
        recipeList.some(function (ui) { return ui.getAuthComponents().length !== 0; })) {
        var path = SuperTokens.getInstanceOrThrow()
            .appInfo.websiteBasePath.appendPath(new NormalisedURLPath("/"))
            .getAsStringDangerous();
        routes.push(jsx(Route, __assign({ exact: true, path: getPathForRouter(basePath, path) }, { children: jsx(RoutingComponent, { getReactRouterDomWithCustomHistory: getReactRouterDomWithCustomHistory, preBuiltUIList: recipeList, path: path }) }), "st-/auth"));
    }
    return routes;
}
function getPathForRouter(basePath, path) {
    var pathForRouter = path;
    if (basePath !== undefined) {
        if (pathForRouter.startsWith(basePath)) {
            pathForRouter = pathForRouter.slice(basePath.length);
            if (!pathForRouter.startsWith("/")) {
                pathForRouter = "/" + pathForRouter;
            }
        }
        else {
            throw new Error("basePath has to be a prefix of websiteBasePath passed to SuperTokens.init");
        }
    }
    return pathForRouter;
}

export { getSuperTokensRoutesForReactRouterDom };
