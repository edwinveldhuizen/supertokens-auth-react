import { jsx } from 'react/jsx-runtime';
import React__default, { useState, useEffect } from 'react';
import NormalisedURLPath from 'supertokens-web-js/utils/normalisedURLPath';
import { redirectToAuth } from '../../../index.js';
import AuthPageWrapper from '../recipe/authRecipe/components/feature/authPage/authPage.js';
import DynamicLoginMethodsSpinner from '../recipe/multitenancy/components/features/dynamicLoginMethodsSpinner/index.js';
import Multitenancy from '../recipe/multitenancy/recipe.js';
import { RecipeRouter } from '../recipe/recipeRouter/index.js';
import SuperTokens from '../superTokens.js';
import { useRethrowInRender } from '../utils.js';
import { useUserContext } from '../usercontext/index.js';

function RoutingComponent(props) {
    var _a, _b;
    var userContext = useUserContext();
    var rethrowInRender = useRethrowInRender();
    var _c = useState(undefined), loadedDynamicLoginMethods = _c[0], setLoadedDynamicLoginMethods = _c[1];
    var navigate = (_a = props.getReactRouterDomWithCustomHistory()) === null || _a === void 0 ? void 0 : _a.useHistoryCustom();
    var path = props.path;
    var isAuthPage = path === SuperTokens.getInstanceOrThrow().appInfo.websiteBasePath.getAsStringDangerous();
    var location = (_b = props.getReactRouterDomWithCustomHistory()) === null || _b === void 0 ? void 0 : _b.useLocation();
    var componentToRender = React__default.useMemo(function () {
        if (isAuthPage) {
            return;
        }
        var normalizedPath = new NormalisedURLPath(path);
        // During development, this runs twice so as to warn devs of if there
        // are any side effects that happen here. So in tests, it will result in
        // the console log twice
        if (loadedDynamicLoginMethods !== undefined || SuperTokens.usesDynamicLoginMethods === false) {
            var result = RecipeRouter.getMatchingComponentForRouteAndRecipeIdFromPreBuiltUIList(normalizedPath, props.preBuiltUIList, false, loadedDynamicLoginMethods);
            if (result === undefined && SuperTokens.usesDynamicLoginMethods === true) {
                void redirectToAuth({ navigate: navigate, redirectBack: false });
            }
            return result;
        }
        return undefined;
        // location dependency needs to be kept in order to get new component on url change
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [path, location, loadedDynamicLoginMethods, props.preBuiltUIList]);
    useEffect(function () {
        if (loadedDynamicLoginMethods) {
            return;
        }
        Multitenancy.getInstanceOrThrow()
            .getCurrentDynamicLoginMethods({ userContext: userContext })
            .then(function (loginMethods) { return setLoadedDynamicLoginMethods(loginMethods); }, function (err) { return rethrowInRender(err); });
    }, [loadedDynamicLoginMethods, setLoadedDynamicLoginMethods]);
    if (isAuthPage) {
        return (jsx(AuthPageWrapper, { preBuiltUIList: props.preBuiltUIList, navigate: navigate, useSignUpStateFromQueryString: true }));
    }
    if (SuperTokens.usesDynamicLoginMethods && loadedDynamicLoginMethods === undefined) {
        return jsx(DynamicLoginMethodsSpinner, {});
    }
    if (componentToRender === undefined ||
        (loadedDynamicLoginMethods === undefined && SuperTokens.usesDynamicLoginMethods)) {
        return null;
    }
    return jsx(componentToRender.component, { navigate: navigate });
}

export { RoutingComponent };
