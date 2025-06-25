import { __assign, __awaiter, __generator, __spreadArray } from '../../../../../../../_virtual/_tslib.js';
import { jsx, jsxs } from 'react/jsx-runtime';
import React__default, { useRef, useState, useEffect, useCallback, useMemo, Fragment } from 'react';
import { WindowHandlerReference } from 'supertokens-web-js/utils/windowHandler';
import { ComponentOverrideContext } from '../../../../../components/componentOverride/componentOverrideContext.js';
import { WithOrWithoutShadowDom } from '../../../../../components/featureWrapper.js';
import SuperTokens from '../../../../../superTokens.js';
import { TranslationContextProvider } from '../../../../../translation/translationContext.js';
import { defaultTranslationsCommon } from '../../../../../translation/translations.js';
import { UserContextProvider, useUserContext } from '../../../../../usercontext/index.js';
import { useRethrowInRender, updateQueryParam, useOnMountAPICall, getTenantIdFromQueryParams, getRedirectToPathFromURL, mergeObjects, clearQueryParams } from '../../../../../utils.js';
import MultiFactorAuth from '../../../../multifactorauth/recipe.js';
import { FactorIds } from '../../../../multifactorauth/types.js';
import DynamicLoginMethodsSpinner from '../../../../multitenancy/components/features/dynamicLoginMethodsSpinner/index.js';
import { DynamicLoginMethodsProvider } from '../../../../multitenancy/dynamicLoginMethodsContext.js';
import Multitenancy from '../../../../multitenancy/recipe.js';
import OAuth2Provider from '../../../../oauth2provider/recipe.js';
import Session from '../../../../session/recipe.js';
import SessionAuthWrapper from '../../../../session/sessionAuth.js';
import useSessionContext from '../../../../session/useSessionContext.js';
import { useAuthRecipeComponentOverrideContext as useContext } from '../../../componentOverrideContext.js';
import { selectComponentsToCoverAllFirstFactors } from '../../../utils.js';
import AuthPageThemeWrapper from '../../theme/authPage/index.js';

var errorQSMap = {
    signin: "SOMETHING_WENT_WRONG_ERROR",
    no_email_present: "THIRD_PARTY_ERROR_NO_EMAIL",
    restart_link: "ERROR_SIGN_IN_UP_LINK",
};
var AuthPageWrapper = function (props) {
    var authRecipeComponentOverrides = useContext();
    return (jsx(UserContextProvider, __assign({ userContext: props.userContext }, { children: jsx(SessionAuthWrapper, __assign({ requireAuth: false, doRedirection: false }, { children: jsx(ComponentOverrideContext.Provider, __assign({ value: authRecipeComponentOverrides }, { children: jsx(AuthPageInner, __assign({}, props)) })) })) })));
};
var AuthPageInner = function (props) {
    var _a, _b, _c, _d, _e;
    if (props.factors !== undefined && props.factors.length === 0) {
        throw new Error("The factors array cannot be empty");
    }
    var windowHandler = WindowHandlerReference.getReferenceOrThrow().windowHandler;
    var search = new URLSearchParams(windowHandler.location.getSearch());
    var showStringFromQS = search.get("show");
    var isSignUpFromQS = props.useSignUpStateFromQueryString !== true || showStringFromQS === null
        ? undefined
        : showStringFromQS === "signup";
    var errorFromQS = search.get("error") !== null ? (_b = (_a = search.get("message")) !== null && _a !== void 0 ? _a : search.get("error")) !== null && _b !== void 0 ? _b : undefined : undefined;
    errorFromQS = errorFromQS !== undefined ? (_c = errorQSMap[errorFromQS]) !== null && _c !== void 0 ? _c : errorFromQS : undefined;
    var showStringFromQSRef = useRef(showStringFromQS);
    var errorFromQSRef = useRef(errorFromQS);
    var loginChallenge = search.get("loginChallenge");
    var forceFreshAuth = search.get("forceFreshAuth") === "true";
    var sessionContext = useSessionContext();
    var userContext = useUserContext();
    var rethrowInRender = useRethrowInRender();
    var _f = useState(undefined), loadedDynamicLoginMethods = _f[0], setLoadedDynamicLoginMethods = _f[1];
    var _g = useState(undefined), oauth2ClientInfo = _g[0], setOAuth2ClientInfo = _g[1];
    var _h = useState(errorFromQS), error = _h[0], setError = _h[1];
    var _j = useState(false), sessionLoadedAndNotRedirecting = _j[0], setSessionLoadedAndNotRedirecting = _j[1];
    var st = SuperTokens.getInstanceOrThrow();
    var _k = useState(props.factors), factorList = _k[0], setFactorList = _k[1];
    var _l = useState((_e = (_d = props.isSignUp) !== null && _d !== void 0 ? _d : isSignUpFromQS) !== null && _e !== void 0 ? _e : st.defaultToSignUp), isSignUp = _l[0], setIsSignUp = _l[1];
    // We use this to signal that we need to update the components we show on screen
    var _m = useState(0), rebuildReqCount = _m[0], setRebuildReqCount = _m[1];
    var lastBuild = useRef({ buildReq: undefined });
    useEffect(function () {
        if (props.useSignUpStateFromQueryString && showStringFromQSRef.current !== showStringFromQS) {
            var isSignUpFromQS_1 = props.useSignUpStateFromQueryString !== true || showStringFromQS === null
                ? undefined
                : showStringFromQS === "signup";
            showStringFromQSRef.current = showStringFromQS;
            var newIsSignUpVal = isSignUpFromQS_1 !== null && isSignUpFromQS_1 !== void 0 ? isSignUpFromQS_1 : st.defaultToSignUp;
            if (isSignUp !== newIsSignUpVal) {
                setIsSignUp(newIsSignUpVal);
                setRebuildReqCount(function (v) { return v + 1; });
            }
        }
    });
    useEffect(function () {
        if (errorFromQSRef.current !== errorFromQS) {
            errorFromQSRef.current = errorFromQS;
            setError(errorFromQS);
        }
    });
    var onSignInUpSwitcherClick = useCallback(function () {
        if (props.useSignUpStateFromQueryString === true) {
            updateQueryParam("show", isSignUp ? "signin" : "signup");
        }
        setError(undefined);
        setIsSignUp(!isSignUp);
        setRebuildReqCount(function (v) { return v + 1; });
    }, [isSignUp, setIsSignUp, setRebuildReqCount, setError, props.useSignUpStateFromQueryString]);
    useEffect(function () {
        if (loadedDynamicLoginMethods) {
            return;
        }
        Multitenancy.getInstanceOrThrow()
            .getCurrentDynamicLoginMethods({ userContext: userContext })
            .then(function (loginMethods) { return setLoadedDynamicLoginMethods(loginMethods); }, function (err) { return rethrowInRender(err); });
    }, [loadedDynamicLoginMethods, setLoadedDynamicLoginMethods]);
    useOnMountAPICall(function () { return __awaiter(void 0, void 0, void 0, function () {
        var oauth2Recipe;
        return __generator(this, function (_a) {
            if (oauth2ClientInfo) {
                return [2 /*return*/];
            }
            oauth2Recipe = OAuth2Provider.getInstance();
            if (oauth2Recipe !== undefined && loginChallenge !== null) {
                return [2 /*return*/, oauth2Recipe.webJSRecipe.getLoginChallengeInfo({ loginChallenge: loginChallenge, userContext: userContext })];
            }
            return [2 /*return*/, undefined];
        });
    }); }, function (info) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (info !== undefined) {
                if (info.status === "OK") {
                    setOAuth2ClientInfo(info.info);
                }
                else {
                    setError("SOMETHING_WENT_WRONG_ERROR");
                }
            }
            return [2 /*return*/];
        });
    }); }, function () {
        clearQueryParams(["loginChallenge"]);
        setError("SOMETHING_WENT_WRONG_ERROR");
    });
    useEffect(function () {
        if (sessionLoadedAndNotRedirecting) {
            return;
        }
        // we want to do this just once, so we supply it with only the loading state.
        // if we supply it with props, sessionContext, then once the user signs in, then this will route the
        // user to the dashboard, as opposed to the sign up / sign in functions.
        if (sessionContext.loading === false) {
            if (sessionContext.doesSessionExist) {
                if (props.onSessionAlreadyExists !== undefined) {
                    props.onSessionAlreadyExists();
                }
                else if (props.redirectOnSessionExists !== false && !forceFreshAuth) {
                    Session.getInstanceOrThrow().config.onHandleEvent({
                        action: "SESSION_ALREADY_EXISTS",
                    });
                    var oauth2Recipe_1 = OAuth2Provider.getInstance();
                    if (loginChallenge !== null && oauth2Recipe_1 !== undefined) {
                        (function () {
                            return __awaiter(this, void 0, void 0, function () {
                                var frontendRedirectTo;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, oauth2Recipe_1.webJSRecipe.getRedirectURLToContinueOAuthFlow({
                                                loginChallenge: loginChallenge,
                                                userContext: userContext,
                                            })];
                                        case 1:
                                            frontendRedirectTo = (_a.sent()).frontendRedirectTo;
                                            return [2 /*return*/, Session.getInstanceOrThrow().validateGlobalClaimsAndHandleSuccessRedirection({
                                                    // We get here if the user was redirected to the auth screen with an already existing session
                                                    // and a loginChallenge (we check the forceFreshAuth queryparam above)
                                                    action: "SUCCESS_OAUTH2",
                                                    frontendRedirectTo: frontendRedirectTo,
                                                    // We can use these defaults, since this is not the result of a sign in/up call
                                                    createdNewUser: false,
                                                    isNewRecipeUser: false,
                                                    newSessionCreated: false,
                                                    tenantIdFromQueryParams: getTenantIdFromQueryParams(),
                                                    recipeId: Session.RECIPE_ID,
                                                }, Session.RECIPE_ID, getRedirectToPathFromURL(), userContext, props.navigate)];
                                    }
                                });
                            });
                        })().catch(rethrowInRender);
                    }
                    else {
                        void Session.getInstanceOrThrow()
                            .validateGlobalClaimsAndHandleSuccessRedirection(undefined, Session.RECIPE_ID, getRedirectToPathFromURL(), userContext, props.navigate)
                            .catch(rethrowInRender);
                    }
                }
                else {
                    setSessionLoadedAndNotRedirecting(true);
                }
            }
            else {
                setSessionLoadedAndNotRedirecting(true);
            }
        }
    }, [sessionContext.loading]);
    var _o = useState(), authComponentListInfo = _o[0], setAuthComponentListInfo = _o[1];
    var showUseAnotherLink = factorList !== undefined &&
        (props.factors === undefined || props.factors.some(function (id) { return !factorList.includes(id); }));
    var stInstance = SuperTokens.getInstanceOrThrow();
    var privacyPolicyLink = stInstance.privacyPolicyLink;
    var termsOfServiceLink = stInstance.termsOfServiceLink;
    useEffect(function () {
        var abortCtl = new AbortController();
        if (lastBuild.current.buildReq === rebuildReqCount) {
            return;
        }
        if (sessionLoadedAndNotRedirecting &&
            (loadedDynamicLoginMethods !== undefined || !SuperTokens.usesDynamicLoginMethods)) {
            void buildAndSetChildProps(props.preBuiltUIList, loadedDynamicLoginMethods, userContext, factorList, isSignUp, setAuthComponentListInfo, abortCtl.signal).then(function () {
                lastBuild.current.buildReq = rebuildReqCount;
            }, rethrowInRender);
        }
        return function () {
            abortCtl.abort();
        };
    }, [
        sessionLoadedAndNotRedirecting,
        rebuildReqCount,
        setRebuildReqCount,
        props.preBuiltUIList,
        loadedDynamicLoginMethods,
        userContext,
        factorList,
        isSignUp,
        setAuthComponentListInfo,
        rethrowInRender,
    ]);
    var onAuthSuccess = useCallback(function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
        var oauth2Recipe, frontendRedirectTo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    oauth2Recipe = OAuth2Provider.getInstance();
                    if (loginChallenge === null || oauth2Recipe === undefined) {
                        return [2 /*return*/, Session.getInstanceOrThrow().validateGlobalClaimsAndHandleSuccessRedirection(__assign(__assign({}, ctx), { action: "SUCCESS", tenantIdFromQueryParams: getTenantIdFromQueryParams(), redirectToPath: getRedirectToPathFromURL() }), ctx.recipeId, getRedirectToPathFromURL(), userContext, props.navigate)];
                    }
                    return [4 /*yield*/, oauth2Recipe.webJSRecipe.getRedirectURLToContinueOAuthFlow({
                            loginChallenge: loginChallenge,
                            userContext: userContext,
                        })];
                case 1:
                    frontendRedirectTo = (_a.sent()).frontendRedirectTo;
                    return [2 /*return*/, Session.getInstanceOrThrow().validateGlobalClaimsAndHandleSuccessRedirection(__assign(__assign({}, ctx), { action: "SUCCESS_OAUTH2", tenantIdFromQueryParams: getTenantIdFromQueryParams(), frontendRedirectTo: frontendRedirectTo }), ctx.recipeId, getRedirectToPathFromURL(), userContext, props.navigate)];
            }
        });
    }); }, [loginChallenge]);
    var childProps = authComponentListInfo !== undefined &&
        (loginChallenge === null || oauth2ClientInfo !== undefined || OAuth2Provider.getInstance() === undefined)
        ? __assign(__assign({}, authComponentListInfo), { oauth2ClientInfo: oauth2ClientInfo, onAuthSuccess: onAuthSuccess, error: error, onError: function (err) {
                setError(err);
            }, clearError: function () { return setError(undefined); }, navigate: props.navigate, onSignInUpSwitcherClick: onSignInUpSwitcherClick, privacyPolicyLink: privacyPolicyLink, rebuildAuthPage: function () { return setRebuildReqCount(function (v) { return v + 1; }); }, setFactorList: function (factorIds) {
                setFactorList(factorIds);
                setRebuildReqCount(function (v) { return v + 1; });
            }, resetFactorList: function () {
                setFactorList(props.factors);
                setRebuildReqCount(function (v) { return v + 1; });
            }, showBackButton: showUseAnotherLink, termsOfServiceLink: termsOfServiceLink, userContext: userContext }) : undefined;
    var mergedTranslations = useMemo(function () {
        var res = defaultTranslationsCommon;
        if (authComponentListInfo !== undefined) {
            for (var _i = 0, _a = props.preBuiltUIList; _i < _a.length; _i++) {
                var ui = _a[_i];
                res = mergeObjects(res, ui.languageTranslations);
            }
        }
        res = mergeObjects(res, st.languageTranslations.userTranslationStore);
        return res;
    }, [st.languageTranslations.userTranslationStore, authComponentListInfo]);
    if (childProps === undefined) {
        return jsx(DynamicLoginMethodsSpinner, {});
    }
    else {
        return (jsx(DynamicLoginMethodsProvider, __assign({ value: loadedDynamicLoginMethods }, { children: jsx(TranslationContextProvider, __assign({ defaultLanguage: st.languageTranslations.defaultLanguage, defaultStore: mergedTranslations, translationControlEventSource: st.languageTranslations.translationEventSource, userTranslationFunc: st.languageTranslations.userTranslationFunc }, { children: jsx(WithOrWithoutShadowDom, __assign({ useShadowDom: st.useShadowDom }, { children: jsxs(Fragment, { children: [props.children === undefined && jsx(AuthPageThemeWrapper, __assign({}, childProps)), props.children &&
                                React__default.Children.map(props.children, function (child) {
                                    if (React__default.isValidElement(child)) {
                                        return React__default.cloneElement(child, childProps);
                                    }
                                    return child;
                                })] }) })) })) })));
    }
};
function buildAndSetChildProps(recipeRouters, loadedDynamicLoginMethods, userContext, factorListState, isSignUpState, setComponentListInfo, abort) {
    var _a, _b, _c, _d, _e;
    return __awaiter(this, void 0, void 0, function () {
        var authRecipesInited, firstFactors, missingPreBuiltUIs, thirdPartyPreBuiltUI, hasSeparateSignUpView, isSignUp, authComps, _i, recipeRouters_1, ui, _f, authComps_1, a, preloadRes, partialAuthComps, selectedComponents, availableFactors, _g, partialAuthComps_1, comp, _h, _j, id, source;
        return __generator(this, function (_k) {
            switch (_k.label) {
                case 0:
                    authRecipesInited = SuperTokens.getInstanceOrThrow().recipeList.filter(function (recipe) { return "firstFactorIds" in recipe; });
                    firstFactors = (_c = (_a = factorListState !== null && factorListState !== void 0 ? factorListState : loadedDynamicLoginMethods === null || loadedDynamicLoginMethods === void 0 ? void 0 : loadedDynamicLoginMethods.firstFactors) !== null && _a !== void 0 ? _a : (_b = MultiFactorAuth.getInstance()) === null || _b === void 0 ? void 0 : _b.config.firstFactors) !== null && _c !== void 0 ? _c : authRecipesInited.reduce(function (acc, recipe) { return __spreadArray(__spreadArray([], acc, true), recipe.getFirstFactorsForAuthPage(), true); }, []);
                    if (factorListState === undefined &&
                        (loadedDynamicLoginMethods === null || loadedDynamicLoginMethods === void 0 ? void 0 : loadedDynamicLoginMethods.firstFactors) === undefined &&
                        ((_d = MultiFactorAuth.getInstance()) === null || _d === void 0 ? void 0 : _d.config.firstFactors) === undefined) {
                        missingPreBuiltUIs = authRecipesInited.filter(function (recipe) { return !recipeRouters.some(function (router) { return router.recipeInstance.recipeID === recipe.recipeID; }); });
                        if (missingPreBuiltUIs.length > 0) {
                            // In this case we'd most likely throw anyway (except in the case of EP+Pwless), but we want to provide a better error message
                            throw new Error("Factor list not set but PreBuiltUI not added for ".concat(missingPreBuiltUIs.map(function (r) { return r.recipeID; })));
                        }
                    }
                    if (firstFactors.length === 0) {
                        throw new Error("There are no enabled factors to show");
                    }
                    if (firstFactors.includes(FactorIds.THIRDPARTY)) {
                        thirdPartyPreBuiltUI = recipeRouters.find(function (r) { return r.recipeInstance.recipeID === FactorIds.THIRDPARTY; });
                        // here we ignore if we couldn't find the necessary prebuilt UI, because we want to throw in the standard location
                        if (thirdPartyPreBuiltUI !== undefined) {
                            // We remove the thirdparty factor if:
                            //  We have no provider defined on the client side and
                            //  We have no provider defined for the tenant either
                            if (thirdPartyPreBuiltUI.recipeInstance.config.signInAndUpFeature.providers.length === 0 &&
                                (!SuperTokens.usesDynamicLoginMethods || loadedDynamicLoginMethods.thirdparty.providers.length === 0)) {
                                firstFactors = firstFactors.filter(function (f) { return f !== FactorIds.THIRDPARTY; });
                                if (firstFactors.length === 0) {
                                    throw new Error("The only enabled first factor is thirdparty, but no providers were defined. Please define at least one provider.");
                                }
                            }
                        }
                    }
                    hasSeparateSignUpView = recipeRouters.some(function (ui) {
                        return ui.requiresSignUpPage &&
                            ui.recipeInstance.firstFactorIds.some(function (id) { return firstFactors.includes(id); });
                    });
                    isSignUp = hasSeparateSignUpView && isSignUpState;
                    authComps = [];
                    for (_i = 0, recipeRouters_1 = recipeRouters; _i < recipeRouters_1.length; _i++) {
                        ui = recipeRouters_1[_i];
                        authComps.push.apply(authComps, ui.getAuthComponents());
                    }
                    _f = 0, authComps_1 = authComps;
                    _k.label = 1;
                case 1:
                    if (!(_f < authComps_1.length)) return [3 /*break*/, 4];
                    a = authComps_1[_f];
                    if (!(a.type === "FULL_PAGE")) return [3 /*break*/, 3];
                    return [4 /*yield*/, a.preloadInfoAndRunChecks(firstFactors, userContext, isSignUp)];
                case 2:
                    preloadRes = _k.sent();
                    // We skip setting if the auth page unmounted while we were checking
                    // if we should show any full page comps
                    if (abort.aborted) {
                        return [2 /*return*/];
                    }
                    if (preloadRes.shouldDisplay) {
                        setComponentListInfo({
                            authComponents: [],
                            fullPageCompWithPreloadedInfo: {
                                component: a.component,
                                preloadInfo: preloadRes.preloadInfo,
                            },
                            isSignUp: isSignUp,
                            hasSeparateSignUpView: hasSeparateSignUpView,
                            factorIds: firstFactors,
                        });
                        return [2 /*return*/];
                    }
                    _k.label = 3;
                case 3:
                    _f++;
                    return [3 /*break*/, 1];
                case 4:
                    if (abort.aborted) {
                        // We stop if the auth page unmounted while we were checking if we should show any full page comps
                        return [2 /*return*/];
                    }
                    partialAuthComps = authComps.filter(function (c) { return c.type !== "FULL_PAGE" && c.factorIds.every(function (id) { return firstFactors.includes(id); }); });
                    partialAuthComps = partialAuthComps.filter(function (c) {
                        return c.type === "SIGN_IN_UP" || // sign in+up components show in all cases
                            (isSignUp ? c.type === "SIGN_UP" : c.type === "SIGN_IN");
                    } // otherwise we check if the sign up state is appropriate
                    );
                    // We sort the auth components by the number of factors they cover, DESC
                    // This helps us choose combination components (ep+pwless) first
                    partialAuthComps.sort(function (a, b) { return b.factorIds.length - a.factorIds.length; });
                    selectedComponents = selectComponentsToCoverAllFirstFactors(partialAuthComps, firstFactors);
                    if (selectedComponents === undefined) {
                        availableFactors = new Set();
                        for (_g = 0, partialAuthComps_1 = partialAuthComps; _g < partialAuthComps_1.length; _g++) {
                            comp = partialAuthComps_1[_g];
                            for (_h = 0, _j = comp.factorIds; _h < _j.length; _h++) {
                                id = _j[_h];
                                availableFactors.add(id);
                            }
                        }
                        source = factorListState !== undefined
                            ? "local state or props"
                            : (loadedDynamicLoginMethods === null || loadedDynamicLoginMethods === void 0 ? void 0 : loadedDynamicLoginMethods.firstFactors) !== undefined
                                ? "dynamic tenant configuration"
                                : ((_e = MultiFactorAuth.getInstance()) === null || _e === void 0 ? void 0 : _e.config.firstFactors) !== undefined
                                    ? "the config passed to the MFA recipe"
                                    : "all recipes initialized";
                        throw new Error("Couldn't cover all first factors: ".concat(firstFactors.join(", "), " (from ").concat(source, "), available components: ").concat(Array.from(availableFactors).join(", "), ".\n") +
                            "You may have missed adding a recipe into the list of prebuiltUIs passed to list of prebuiltUIs passed to getSuperTokensRoutesForReactRouterDom, canHandleRoute, handleRoute functions or the AuthPage component.\n" +
                            "Another common error is adding a non-existent factor id into the list, e.g.: passwordless instead of otp-email/phone");
                    }
                    setComponentListInfo({
                        authComponents: selectedComponents.sort(function (a, b) { return a.displayOrder - b.displayOrder; }).map(function (w) { return w.component; }),
                        factorIds: firstFactors,
                        hasSeparateSignUpView: hasSeparateSignUpView,
                        isSignUp: isSignUp,
                    });
                    return [2 /*return*/];
            }
        });
    });
}

export { AuthPageWrapper as default };
