import { __assign } from "../../../../../../../_virtual/_tslib.js";
import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Fragment } from "react";
import { ComponentOverrideContext } from "../../../../../components/componentOverride/componentOverrideContext.js";
import FeatureWrapper from "../../../../../components/featureWrapper.js";
import SuperTokens from "../../../../../superTokens.js";
import { useUserContext } from "../../../../../usercontext/index.js";
import { getQueryParams } from "../../../../../utils.js";
import ResetPasswordUsingTokenThemeWrapper from "../../themes/resetPasswordUsingToken/index.js";
import { defaultTranslationsEmailPassword } from "../../themes/translations.js";

var ResetPasswordUsingToken = function (props) {
    var token = getQueryParams("token");
    var userContext = useUserContext();
    if (props.userContext !== undefined) {
        userContext = props.userContext;
    }
    var _a = React.useState(),
        error = _a[0],
        setError = _a[1];
    var enterEmailFormFeature = props.recipe.config.resetPasswordUsingTokenFeature.enterEmailForm;
    var submitNewPasswordFormFeature = props.recipe.config.resetPasswordUsingTokenFeature.submitNewPasswordForm;
    var submitNewPasswordForm =
        token === undefined || token === null
            ? undefined
            : {
                  error: error,
                  onError: function (error) {
                      return setError(error);
                  },
                  clearError: function () {
                      return setError(undefined);
                  },
                  styleFromInit: submitNewPasswordFormFeature.style,
                  formFields: submitNewPasswordFormFeature.formFields,
                  recipeImplementation: props.recipe.webJSRecipe,
                  config: props.recipe.config,
                  onSignInClicked: function () {
                      void SuperTokens.getInstanceOrThrow().redirectToAuth({
                          show: "signin",
                          navigate: props.navigate,
                          redirectBack: false,
                          userContext: userContext,
                      });
                  },
                  token: token,
              };
    var enterEmailForm = {
        onBackButtonClicked: function () {
            return SuperTokens.getInstanceOrThrow().redirectToAuth({
                show: "signin",
                navigate: props.navigate,
                redirectBack: false,
                userContext: userContext,
            });
        },
        error: error,
        onError: function (error) {
            return setError(error);
        },
        clearError: function () {
            return setError(undefined);
        },
        styleFromInit: enterEmailFormFeature.style,
        formFields: enterEmailFormFeature.formFields,
        recipeImplementation: props.recipe.webJSRecipe,
        config: props.recipe.config,
    };
    var childProps = {
        config: props.recipe.config,
        submitNewPasswordForm: submitNewPasswordForm,
        enterEmailForm: enterEmailForm,
    };
    var recipeComponentOverrides = props.useComponentOverrides();
    return jsx(
        ComponentOverrideContext.Provider,
        __assign(
            { value: recipeComponentOverrides },
            {
                children: jsx(
                    FeatureWrapper,
                    __assign(
                        {
                            useShadowDom: SuperTokens.getInstanceOrThrow().useShadowDom,
                            defaultStore: defaultTranslationsEmailPassword,
                        },
                        {
                            children: jsxs(Fragment, {
                                children: [
                                    props.children === undefined &&
                                        jsx(ResetPasswordUsingTokenThemeWrapper, __assign({}, childProps)),
                                    props.children &&
                                        React.Children.map(props.children, function (child) {
                                            if (React.isValidElement(child)) {
                                                return React.cloneElement(child, childProps);
                                            }
                                            return child;
                                        }),
                                ],
                            }),
                        }
                    )
                ),
            }
        )
    );
};

export { ResetPasswordUsingToken as default };
