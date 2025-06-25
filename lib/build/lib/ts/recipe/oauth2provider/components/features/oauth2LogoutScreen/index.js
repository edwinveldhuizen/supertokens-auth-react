import { __awaiter, __generator, __assign } from "../../../../../../../_virtual/_tslib.js";
import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Fragment } from "react";
import { ComponentOverrideContext } from "../../../../../components/componentOverride/componentOverrideContext.js";
import FeatureWrapper from "../../../../../components/featureWrapper.js";
import SuperTokens from "../../../../../superTokens.js";
import UI from "../../../../../../../ui-entry.js";
import { useUserContext } from "../../../../../usercontext/index.js";
import { useRethrowInRender, getQueryParams, getTenantIdFromQueryParams } from "../../../../../utils.js";
import { doesSessionExist } from "../../../../../../../session.js";
import OAuth2Provider from "../../../recipe.js";
import { OAuth2LogoutScreenTheme } from "../../themes/oauth2LogoutScreen/index.js";
import { defaultTranslationsOAuth2Provider } from "../../themes/translations.js";
import SessionContext from "../../../../session/sessionContext.js";

var OAuth2LogoutScreen = function (props) {
    var _a, _b, _c;
    var rethrowInRender = useRethrowInRender();
    var sessionContext = React.useContext(SessionContext);
    var _d = React.useState(false),
        isLoggingOut = _d[0],
        setIsLoggingOut = _d[1];
    var recipeComponentOverrides = props.useComponentOverrides();
    var userContext = useUserContext();
    if (props.userContext !== undefined) {
        userContext = props.userContext;
    }
    var logoutChallenge = (_a = getQueryParams("logoutChallenge")) !== null && _a !== void 0 ? _a : undefined;
    var navigate =
        (_b = props.navigate) !== null && _b !== void 0
            ? _b
            : (_c = UI.getReactRouterDomWithCustomHistory()) === null || _c === void 0
            ? void 0
            : _c.useHistoryCustom();
    var onLogout = React.useCallback(
        function () {
            return __awaiter(void 0, void 0, void 0, function () {
                var frontendRedirectTo, err_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (logoutChallenge === undefined) {
                                return [2 /*return*/];
                            }
                            setIsLoggingOut(true);
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 4, , 6]);
                            return [
                                4 /*yield*/,
                                OAuth2Provider.getInstanceOrThrow().webJSRecipe.logOut({
                                    logoutChallenge: logoutChallenge,
                                    userContext: userContext,
                                }),
                            ];
                        case 2:
                            frontendRedirectTo = _a.sent().frontendRedirectTo;
                            return [
                                4 /*yield*/,
                                props.recipe.redirect(
                                    {
                                        recipeId: "oauth2provider",
                                        action: "POST_OAUTH2_LOGOUT_REDIRECT",
                                        tenantIdFromQueryParams: getTenantIdFromQueryParams(),
                                        frontendRedirectTo: frontendRedirectTo,
                                    },
                                    navigate,
                                    {},
                                    userContext
                                ),
                            ];
                        case 3:
                            _a.sent();
                            return [3 /*break*/, 6];
                        case 4:
                            err_1 = _a.sent();
                            return [4 /*yield*/, doesSessionExist(userContext)];
                        case 5:
                            if (!_a.sent()) {
                                void SuperTokens.getInstanceOrThrow()
                                    .redirectToAuth({
                                        userContext: userContext,
                                        redirectBack: false,
                                    })
                                    .catch(rethrowInRender);
                            } else {
                                rethrowInRender(err_1);
                            }
                            return [3 /*break*/, 6];
                        case 6:
                            return [2 /*return*/];
                    }
                });
            });
        },
        [logoutChallenge, navigate, props.recipe, userContext, rethrowInRender]
    );
    React.useEffect(
        function () {
            // We wait for session loading to finish
            if (sessionContext.loading === false) {
                // Redirect to the auth page if there is no logoutChallenge
                if (logoutChallenge === undefined) {
                    void SuperTokens.getInstanceOrThrow()
                        .redirectToAuth({
                            userContext: userContext,
                            redirectBack: false,
                        })
                        .catch(rethrowInRender);
                } else {
                    // Call logOut directly if there is no session
                    if (sessionContext.doesSessionExist === false) {
                        void onLogout();
                    }
                }
            }
        },
        [userContext, logoutChallenge, sessionContext, onLogout]
    );
    var childProps = {
        config: props.recipe.config,
        showSpinner: sessionContext.loading || sessionContext.doesSessionExist === false,
        onLogoutClicked: onLogout,
        isLoggingOut: isLoggingOut,
    };
    if (logoutChallenge === undefined) {
        return null;
    }
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
                            defaultStore: defaultTranslationsOAuth2Provider,
                        },
                        {
                            children: jsxs(Fragment, {
                                children: [
                                    props.children === undefined &&
                                        jsx(OAuth2LogoutScreenTheme, __assign({}, childProps)),
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

export { OAuth2LogoutScreen, OAuth2LogoutScreen as default };
