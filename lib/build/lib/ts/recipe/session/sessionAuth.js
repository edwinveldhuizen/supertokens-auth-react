import { __assign, __rest, __awaiter, __generator } from '../../../../_virtual/_tslib.js';
import { jsx } from 'react/jsx-runtime';
import { useRef, useState, useCallback, useEffect } from 'react';
import SuperTokens from '../../superTokens.js';
import UI from '../../../../ui-entry.js';
import { useUserContext } from '../../usercontext/index.js';
import UserContextWrapper from '../../usercontext/userContextWrapper.js';
import { useRethrowInRender, useOnMountAPICall } from '../../utils.js';
import Session from './recipe.js';
import SessionContext from './sessionContext.js';
import { validateAndCompareOnFailureRedirectionURLToCurrent, getFailureRedirectionInfo } from './utils.js';

var SessionAuth = function (_a) {
    var _b;
    var children = _a.children, props = __rest(_a, ["children"]);
    var requireAuth = useRef(props.requireAuth);
    if (props.requireAuth !== requireAuth.current) {
        throw new Error(
        // eslint-disable-next-line @typescript-eslint/quotes
        'requireAuth prop should not change. If you are seeing this, it probably means that you are using SessionAuth in multiple routes with different values for requireAuth. To solve this, try adding the "key" prop to all uses of SessionAuth like <SessionAuth key="someUniqueKeyPerRoute" requireAuth={...}>');
    }
    // Reusing the parent context was removed because it caused a redirect loop in an edge case
    // because it'd also reuse the invalid claims part until it loaded.
    var _c = useState({ loading: true }), context = _c[0], setContext = _c[1];
    var setContextIfChanged = useCallback(function (newValue) {
        setContext(function (oldValue) {
            // We can't do this check before re-validation because there are be validators that depend on the current time
            // Since the context is constructed by the same functions the property order should be stable, meaning that
            // a simple JSON string check should be sufficient.
            // Plus since this is just an optimization it is fine to have false positives,
            // and this method won't have false negatives (where we'd miss an update).
            if (JSON.stringify(oldValue) !== JSON.stringify(newValue)) {
                return newValue;
            }
            return oldValue;
        });
    }, [setContext]);
    var session = useRef();
    // We store this here, to prevent the list of called hooks changing even if a navigate hook is added later to SuperTokens.
    var navigateHookRef = useRef((_b = UI.getReactRouterDomWithCustomHistory()) === null || _b === void 0 ? void 0 : _b.useHistoryCustom);
    var navigate;
    try {
        if (navigateHookRef.current) {
            navigate = navigateHookRef.current();
        }
    }
    catch (_d) {
        // We catch and ignore errors here, because this is may throw if
        // the app is using react-router-dom but added a session auth outside of the router.
    }
    var userContext = useUserContext();
    var rethrowInRender = useRethrowInRender();
    var redirectToLogin = useCallback(function () {
        void SuperTokens.getInstanceOrThrow().redirectToAuth({ navigate: navigate, userContext: userContext, redirectBack: true });
    }, []);
    var buildContext = useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        var sessionExists, invalidClaims, err_1, err_2;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (session.current === undefined) {
                        session.current = Session.getInstanceOrThrow();
                    }
                    return [4 /*yield*/, session.current.doesSessionExist({
                            userContext: userContext,
                        })];
                case 1:
                    sessionExists = _b.sent();
                    if (sessionExists === false) {
                        return [2 /*return*/, {
                                loading: false,
                                doesSessionExist: false,
                                accessTokenPayload: {},
                                invalidClaims: [],
                                userId: "",
                            }];
                    }
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 4, , 6]);
                    return [4 /*yield*/, session.current.validateClaims({
                            overrideGlobalClaimValidators: props.overrideGlobalClaimValidators,
                            userContext: userContext,
                        })];
                case 3:
                    invalidClaims = _b.sent();
                    return [3 /*break*/, 6];
                case 4:
                    err_1 = _b.sent();
                    return [4 /*yield*/, session.current.doesSessionExist({
                            userContext: userContext,
                        })];
                case 5:
                    // These errors should only come from getAccessTokenPayloadSecurely inside validateClaims if refreshing a claim cleared the session
                    // Which means that the session was most likely cleared, meaning returning false is right.
                    // This might also happen if the user provides an override or a custom claim validator that throws (or if we have a bug)
                    // In which case the session will not be cleared so we rethrow the error
                    if (_b.sent()) {
                        throw err_1;
                    }
                    return [2 /*return*/, {
                            loading: false,
                            doesSessionExist: false,
                            accessTokenPayload: {},
                            invalidClaims: [],
                            userId: "",
                        }];
                case 6:
                    _b.trys.push([6, 9, , 11]);
                    _a = {
                        loading: false,
                        doesSessionExist: true,
                        invalidClaims: invalidClaims
                    };
                    return [4 /*yield*/, session.current.getAccessTokenPayloadSecurely({
                            userContext: userContext,
                        })];
                case 7:
                    _a.accessTokenPayload = _b.sent();
                    return [4 /*yield*/, session.current.getUserId({
                            userContext: userContext,
                        })];
                case 8: return [2 /*return*/, (_a.userId = _b.sent(),
                        _a)];
                case 9:
                    err_2 = _b.sent();
                    return [4 /*yield*/, session.current.doesSessionExist({
                            userContext: userContext,
                        })];
                case 10:
                    if (_b.sent()) {
                        throw err_2;
                    }
                    // This means that loading the access token or the userId failed
                    // This may happen if the server cleared the error since the validation was done which should be extremely rare
                    return [2 /*return*/, {
                            loading: false,
                            doesSessionExist: false,
                            accessTokenPayload: {},
                            invalidClaims: [],
                            userId: "",
                        }];
                case 11: return [2 /*return*/];
            }
        });
    }); }, []);
    var setInitialContextAndMaybeRedirect = useCallback(function (toSetContext) { return __awaiter(void 0, void 0, void 0, function () {
        var failureRedirectInfo, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (context.loading === false) {
                        return [2 /*return*/];
                    }
                    if (!(props.doRedirection !== false)) return [3 /*break*/, 8];
                    if (!toSetContext.doesSessionExist && props.requireAuth !== false) {
                        redirectToLogin();
                        return [2 /*return*/];
                    }
                    if (!(toSetContext.invalidClaims.length !== 0)) return [3 /*break*/, 8];
                    failureRedirectInfo = void 0;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, getFailureRedirectionInfo({
                            invalidClaims: toSetContext.invalidClaims,
                            overrideGlobalClaimValidators: props.overrideGlobalClaimValidators,
                            userContext: userContext,
                        })];
                case 2:
                    failureRedirectInfo = _a.sent();
                    if (!(failureRedirectInfo.redirectPath !== undefined)) return [3 /*break*/, 5];
                    if (!validateAndCompareOnFailureRedirectionURLToCurrent(failureRedirectInfo.redirectPath)) return [3 /*break*/, 3];
                    setContextIfChanged(toSetContext);
                    return [2 /*return*/];
                case 3: return [4 /*yield*/, SuperTokens.getInstanceOrThrow().redirectToUrl(failureRedirectInfo.redirectPath, navigate)];
                case 4: return [2 /*return*/, _a.sent()];
                case 5: return [3 /*break*/, 7];
                case 6:
                    err_3 = _a.sent();
                    rethrowInRender(err_3);
                    throw err_3;
                case 7:
                    if (props.accessDeniedScreen !== undefined && failureRedirectInfo.failedClaim !== undefined) {
                        console.warn({
                            message: "Showing access denied screen because a claim validator failed",
                            claimValidationError: failureRedirectInfo.failedClaim,
                        });
                        return [2 /*return*/, setContextIfChanged(__assign(__assign({}, toSetContext), { accessDeniedValidatorError: failureRedirectInfo.failedClaim }))];
                    }
                    _a.label = 8;
                case 8:
                    setContextIfChanged(toSetContext);
                    return [2 /*return*/];
            }
        });
    }); }, [
        context.loading,
        props.doRedirection,
        props.requireAuth,
        props.overrideGlobalClaimValidators,
        props.accessDeniedScreen,
        redirectToLogin,
        userContext,
        navigate,
    ]);
    useOnMountAPICall(buildContext, setInitialContextAndMaybeRedirect);
    // subscribe to events on mount
    useEffect(function () {
        function onHandleEvent(event) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, invalidClaims, failureRedirectInfo, err_4;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = event.action;
                            switch (_a) {
                                case "SESSION_CREATED": return [3 /*break*/, 1];
                                case "REFRESH_SESSION": return [3 /*break*/, 1];
                                case "ACCESS_TOKEN_PAYLOAD_UPDATED": return [3 /*break*/, 1];
                                case "API_INVALID_CLAIM": return [3 /*break*/, 1];
                                case "SIGN_OUT": return [3 /*break*/, 11];
                                case "UNAUTHORISED": return [3 /*break*/, 12];
                            }
                            return [3 /*break*/, 13];
                        case 1: return [4 /*yield*/, session.current.validateClaims({
                                overrideGlobalClaimValidators: props.overrideGlobalClaimValidators,
                                userContext: userContext,
                            })];
                        case 2:
                            invalidClaims = _b.sent();
                            if (!(props.doRedirection !== false)) return [3 /*break*/, 10];
                            failureRedirectInfo = void 0;
                            _b.label = 3;
                        case 3:
                            _b.trys.push([3, 8, , 9]);
                            return [4 /*yield*/, getFailureRedirectionInfo({
                                    invalidClaims: invalidClaims,
                                    overrideGlobalClaimValidators: props.overrideGlobalClaimValidators,
                                    userContext: userContext,
                                })];
                        case 4:
                            failureRedirectInfo = _b.sent();
                            if (!failureRedirectInfo.redirectPath) return [3 /*break*/, 7];
                            if (!validateAndCompareOnFailureRedirectionURLToCurrent(failureRedirectInfo.redirectPath)) return [3 /*break*/, 5];
                            setContextIfChanged(__assign(__assign({}, event.sessionContext), { loading: false, invalidClaims: invalidClaims }));
                            return [3 /*break*/, 7];
                        case 5: return [4 /*yield*/, SuperTokens.getInstanceOrThrow().redirectToUrl(failureRedirectInfo.redirectPath, navigate)];
                        case 6: return [2 /*return*/, _b.sent()];
                        case 7: return [3 /*break*/, 9];
                        case 8:
                            err_4 = _b.sent();
                            rethrowInRender(err_4);
                            throw err_4;
                        case 9:
                            if (props.accessDeniedScreen !== undefined && failureRedirectInfo.failedClaim !== undefined) {
                                console.warn({
                                    message: "Showing access denied screen because a claim validator failed",
                                    claimValidationError: failureRedirectInfo.failedClaim,
                                });
                                return [2 /*return*/, setContextIfChanged(__assign(__assign({}, event.sessionContext), { loading: false, invalidClaims: invalidClaims, accessDeniedValidatorError: failureRedirectInfo.failedClaim }))];
                            }
                            _b.label = 10;
                        case 10:
                            setContextIfChanged(__assign(__assign({}, event.sessionContext), { loading: false, invalidClaims: invalidClaims }));
                            return [2 /*return*/];
                        case 11:
                            setContextIfChanged(__assign(__assign({}, event.sessionContext), { loading: false, invalidClaims: [] }));
                            return [2 /*return*/];
                        case 12:
                            setContextIfChanged(__assign(__assign({}, event.sessionContext), { loading: false, invalidClaims: [] }));
                            if (props.onSessionExpired !== undefined) {
                                props.onSessionExpired();
                            }
                            else if (props.requireAuth !== false && props.doRedirection !== false) {
                                redirectToLogin();
                            }
                            return [2 /*return*/];
                        case 13: return [2 /*return*/];
                    }
                });
            });
        }
        if (session.current === undefined) {
            session.current = Session.getInstanceOrThrow();
        }
        if (context.loading === false) {
            // we return here cause addEventListener returns a function that removes
            // the listener, and this function will be called by useEffect when
            // onHandleEvent changes or if the component is unmounting.
            return session.current.addEventListener(onHandleEvent);
        }
        return undefined;
    }, [props, setContextIfChanged, context.loading, userContext, navigate, redirectToLogin]);
    if (props.requireAuth !== false && (context.loading || !context.doesSessionExist)) {
        return null;
    }
    if (!context.loading && context.accessDeniedValidatorError && props.accessDeniedScreen) {
        return (jsx(props.accessDeniedScreen, { userContext: userContext, navigate: navigate, validationError: context.accessDeniedValidatorError }));
    }
    return jsx(SessionContext.Provider, __assign({ value: context }, { children: children }));
};
var SessionAuthWrapper = function (props) {
    return (jsx(UserContextWrapper, __assign({ userContext: props.userContext }, { children: jsx(SessionAuth, __assign({}, props)) })));
};

export { SessionAuthWrapper as default };
