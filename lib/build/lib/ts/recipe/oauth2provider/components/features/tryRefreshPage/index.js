import { __awaiter, __generator, __assign } from "../../../../../../../_virtual/_tslib.js";
import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { useContext, Fragment } from "react";
import FeatureWrapper from "../../../../../components/featureWrapper.js";
import SuperTokens from "../../../../../superTokens.js";
import { useUserContext } from "../../../../../usercontext/index.js";
import { useRethrowInRender, getQueryParams, getTenantIdFromQueryParams } from "../../../../../utils.js";
import DynamicLoginMethodsSpinner from "../../../../multitenancy/components/features/dynamicLoginMethodsSpinner/index.js";
import "../../../../../../../session.js";
import { defaultTranslationsOAuth2Provider } from "../../themes/translations.js";
import SessionContext from "../../../../session/sessionContext.js";

var TryRefreshPage = function (props) {
    var _a;
    var rethrowInRender = useRethrowInRender();
    var sessionContext = useContext(SessionContext);
    var loginChallenge = (_a = getQueryParams("loginChallenge")) !== null && _a !== void 0 ? _a : undefined;
    var userContext = useUserContext();
    if (props.userContext !== undefined) {
        userContext = props.userContext;
    }
    React.useEffect(
        function () {
            if (sessionContext.loading === false) {
                if (loginChallenge) {
                    (function () {
                        return __awaiter(this, void 0, void 0, function () {
                            var frontendRedirectTo;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        return [
                                            4 /*yield*/,
                                            props.recipe.webJSRecipe.getRedirectURLToContinueOAuthFlow({
                                                loginChallenge: loginChallenge,
                                                userContext: userContext,
                                            }),
                                        ];
                                    case 1:
                                        frontendRedirectTo = _a.sent().frontendRedirectTo;
                                        return [
                                            2 /*return*/,
                                            props.recipe.redirect(
                                                {
                                                    action: "CONTINUE_OAUTH2_AFTER_REFRESH",
                                                    frontendRedirectTo: frontendRedirectTo,
                                                    tenantIdFromQueryParams: getTenantIdFromQueryParams(),
                                                    recipeId: "oauth2provider",
                                                },
                                                props.navigate,
                                                {},
                                                userContext
                                            ),
                                        ];
                                }
                            });
                        });
                    })().catch(rethrowInRender);
                } else {
                    void SuperTokens.getInstanceOrThrow()
                        .redirectToAuth({
                            userContext: userContext,
                            redirectBack: false,
                        })
                        .catch(rethrowInRender);
                }
            }
        },
        [loginChallenge, props.recipe, props.navigate, userContext, sessionContext]
    );
    var childProps = {
        config: props.recipe.config,
    };
    return jsx(
        FeatureWrapper,
        __assign(
            {
                useShadowDom: SuperTokens.getInstanceOrThrow().useShadowDom,
                defaultStore: defaultTranslationsOAuth2Provider,
            },
            {
                children: jsxs(Fragment, {
                    children: [
                        props.children === undefined && jsx(DynamicLoginMethodsSpinner, {}),
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
    );
};

export { TryRefreshPage, TryRefreshPage as default };
