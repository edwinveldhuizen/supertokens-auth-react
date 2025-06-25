import { __assign } from "../../../../../../../_virtual/_tslib.js";
import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Fragment, useMemo } from "react";
import AuthComponentWrapper from "../../../../../components/authCompWrapper.js";
import SuperTokens from "../../../../../superTokens.js";
import { FactorIds } from "../../../../multifactorauth/types.js";
import { useDynamicLoginMethods } from "../../../../multitenancy/dynamicLoginMethodsContext.js";
import { mergeProviders } from "../../../utils.js";
import SignInAndUpThemeWrapper from "../../themes/signInAndUp/index.js";

function useChildProps(
    recipe,
    onAuthSuccess,
    error,
    onError,
    clearError,
    rebuildAuthPage,
    setFactorList,
    navigate,
    userContext,
    resetFactorList,
    onSignInUpSwitcherClick,
    showBackButton
) {
    var recipeImplementation = useMemo(
        function () {
            return recipe && getModifiedRecipeImplementation(recipe.webJSRecipe);
        },
        [recipe]
    );
    var dynamicLoginMethods = useDynamicLoginMethods();
    return useMemo(
        function () {
            var tenantProviders;
            if (SuperTokens.usesDynamicLoginMethods) {
                if (dynamicLoginMethods.loaded === false) {
                    throw new Error("Component requiring dynamicLoginMethods rendered without FeatureWrapper.");
                } else {
                    tenantProviders = dynamicLoginMethods.loginMethods.firstFactors.includes(FactorIds.THIRDPARTY)
                        ? dynamicLoginMethods.loginMethods.thirdparty.providers
                        : [];
                }
            }
            return {
                onAuthSuccess: onAuthSuccess,
                error: error,
                onError: onError,
                clearError: clearError,
                rebuildAuthPage: rebuildAuthPage,
                setFactorList: setFactorList,
                providers: mergeProviders({
                    tenantProviders: tenantProviders,
                    clientProviders: recipe.config.signInAndUpFeature.providers,
                }),
                recipeImplementation: recipeImplementation,
                config: recipe.config,
                recipe: recipe,
                navigate: navigate,
                userContext: userContext,
                resetFactorList: resetFactorList,
                onSignInUpSwitcherClick: onSignInUpSwitcherClick,
                showBackButton: showBackButton,
            };
        },
        [recipe, recipeImplementation, error, userContext]
    );
}
var SignInAndUpFeature = function (props) {
    var childProps = useChildProps(
        props.recipe,
        props.onAuthSuccess,
        props.error,
        props.onError,
        props.clearError,
        props.rebuildAuthPage,
        props.setFactorList,
        props.navigate,
        props.userContext,
        props.resetFactorList,
        props.onSignInUpSwitcherClick,
        props.showBackButton
    );
    var themeProps = __assign(__assign({}, childProps), { providers: childProps.providers });
    return jsxs(Fragment, {
        children: [
            props.children === undefined && jsx(SignInAndUpThemeWrapper, __assign({}, themeProps)),
            props.children &&
                React.Children.map(props.children, function (child) {
                    if (React.isValidElement(child)) {
                        return React.cloneElement(child, __assign({}, childProps));
                    }
                    return child;
                }),
        ],
    });
};
var SignInAndUpFeatureWrapper = function (props) {
    var recipeComponentOverrides = props.useComponentOverrides();
    return jsx(
        AuthComponentWrapper,
        __assign(
            { recipeComponentOverrides: recipeComponentOverrides },
            { children: jsx(SignInAndUpFeature, __assign({}, props)) }
        )
    );
};
var getModifiedRecipeImplementation = function (origImpl) {
    return __assign({}, origImpl);
};

export { SignInAndUpFeature, SignInAndUpFeatureWrapper as default, useChildProps };
