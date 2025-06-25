import { __assign, __awaiter, __generator } from "../../../../../../../_virtual/_tslib.js";
import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Fragment, useMemo } from "react";
import { WindowHandlerReference } from "supertokens-web-js/utils/windowHandler";
import { redirectToAuth } from "../../../../../../../index.js";
import { ComponentOverrideContext } from "../../../../../components/componentOverride/componentOverrideContext.js";
import FeatureWrapper from "../../../../../components/featureWrapper.js";
import SuperTokens from "../../../../../superTokens.js";
import { useUserContext } from "../../../../../usercontext/index.js";
import {
    getQueryParams,
    getRedirectToPathFromURL,
    useOnMountAPICall,
    useRethrowInRender,
} from "../../../../../utils.js";
import MultiFactorAuth from "../../../../multifactorauth/recipe.js";
import { FactorIds } from "../../../../multifactorauth/types.js";
import { getAvailableFactors } from "../../../../multifactorauth/utils.js";
import Session from "../../../../session/recipe.js";
import TOTP from "../../../recipe.js";
import TOTPMFAThemeWrapper from "../../themes/mfa/index.js";
import { defaultTranslationsTOTP } from "../../themes/translations.js";

var useFeatureReducer = function () {
    return React.useReducer(
        function (oldState, action) {
            var _a, _b;
            switch (action.type) {
                case "load":
                    return {
                        // We want to wait for createDevice to finish before marking the page fully loaded
                        loaded: !action.callingCreateDevice,
                        error: action.error,
                        deviceInfo: action.deviceInfo,
                        showBackButton: action.showBackButton,
                        showAccessDenied: action.showAccessDenied,
                        isBlocked: false,
                        showSecret: false,
                    };
                case "setBlocked":
                    return __assign(__assign({}, oldState), {
                        isBlocked: true,
                        nextRetryAt: action.nextRetryAt,
                        error: action.error,
                    });
                case "setError":
                    return __assign(__assign({}, oldState), {
                        loaded: true,
                        maxAttemptCount:
                            (_a = action.maxAttemptCount) !== null && _a !== void 0 ? _a : oldState.maxAttemptCount,
                        currAttemptCount:
                            (_b = action.currAttemptCount) !== null && _b !== void 0 ? _b : oldState.currAttemptCount,
                        showAccessDenied: action.showAccessDenied,
                        error: action.error,
                    });
                case "createDevice":
                    return __assign(__assign({}, oldState), {
                        deviceInfo: action.deviceInfo,
                        isBlocked: false,
                        showSecret: false,
                        nextRetryAt: undefined,
                        error: undefined,
                    });
                case "showSecret":
                    return __assign(__assign({}, oldState), { showSecret: true });
                case "restartFlow":
                    return __assign(__assign({}, oldState), {
                        isBlocked: false,
                        showSecret: false,
                        nextRetryAt: undefined,
                        error: action.error,
                    });
                default:
                    return oldState;
            }
        },
        {
            error: undefined,
            loaded: false,
            deviceInfo: undefined,
            showSecret: false,
            isBlocked: false,
            showBackButton: false,
            showAccessDenied: false,
        },
        function (initArg) {
            var error = undefined;
            var errorQueryParam = getQueryParams("error");
            if (errorQueryParam !== null) {
                error = "SOMETHING_WENT_WRONG_ERROR";
            }
            return __assign(__assign({}, initArg), { error: error });
        }
    );
};
function useOnLoad(recipeImpl, dispatch, navigate, userContext) {
    var _this = this;
    var fetchMFAInfo = React.useCallback(
        function () {
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [
                        2 /*return*/,
                        MultiFactorAuth.getInstanceOrThrow().webJSRecipe.resyncSessionAndFetchMFAInfo({
                            userContext: userContext,
                        }),
                    ];
                });
            });
        },
        [userContext]
    );
    var handleLoadError = React.useCallback(
        function () {
            return dispatch({ type: "setError", showAccessDenied: true, error: "SOMETHING_WENT_WRONG_ERROR_RELOAD" });
        },
        [dispatch]
    );
    var onLoad = React.useCallback(
        function (mfaInfo) {
            return __awaiter(_this, void 0, void 0, function () {
                var error,
                    errorQueryParam,
                    doSetup,
                    stepUp,
                    redirectToPath,
                    alreadySetup,
                    showBackButton,
                    deviceInfo,
                    createResp;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            error = undefined;
                            errorQueryParam = getQueryParams("error");
                            doSetup = getQueryParams("setup");
                            stepUp = getQueryParams("stepUp");
                            if (errorQueryParam !== null) {
                                error = "SOMETHING_WENT_WRONG_ERROR";
                            }
                            if (!(mfaInfo.factors.next.length === 0 && stepUp !== "true" && doSetup !== "true"))
                                return [3 /*break*/, 4];
                            redirectToPath = getRedirectToPathFromURL();
                            _c.label = 1;
                        case 1:
                            _c.trys.push([1, 3, , 4]);
                            return [
                                4 /*yield*/,
                                Session.getInstanceOrThrow().validateGlobalClaimsAndHandleSuccessRedirection(
                                    undefined,
                                    TOTP.RECIPE_ID,
                                    redirectToPath,
                                    userContext,
                                    navigate
                                ),
                            ];
                        case 2:
                            _c.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            _c.sent();
                            // If we couldn't redirect to EV (or an unknown claim validation failed or somehow the redirection threw an error)
                            // we fall back to showing the something went wrong error
                            dispatch({
                                type: "setError",
                                showAccessDenied: true,
                                error: "SOMETHING_WENT_WRONG_ERROR_RELOAD",
                            });
                            return [3 /*break*/, 4];
                        case 4:
                            alreadySetup = mfaInfo.factors.alreadySetup.includes(FactorIds.TOTP);
                            showBackButton =
                                mfaInfo.factors.next.length === 0 ||
                                getAvailableFactors(
                                    mfaInfo.factors,
                                    undefined,
                                    MultiFactorAuth.getInstanceOrThrow(),
                                    userContext
                                ).length !== 1;
                            if (!(doSetup || !alreadySetup)) return [3 /*break*/, 9];
                            createResp = void 0;
                            _c.label = 5;
                        case 5:
                            _c.trys.push([5, 7, , 8]);
                            dispatch({
                                type: "load",
                                deviceInfo: undefined,
                                error: error,
                                showBackButton: showBackButton,
                                showAccessDenied: false,
                                callingCreateDevice: true,
                            });
                            return [4 /*yield*/, recipeImpl.createDevice({ userContext: userContext })];
                        case 6:
                            createResp = _c.sent();
                            return [3 /*break*/, 8];
                        case 7:
                            _c.sent();
                            dispatch({
                                type: "setError",
                                showAccessDenied: true,
                                error: "SOMETHING_WENT_WRONG_ERROR_RELOAD",
                            });
                            return [2 /*return*/];
                        case 8:
                            if (createResp.status !== "OK") {
                                dispatch({
                                    type: "setError",
                                    showAccessDenied: true,
                                    error: "SOMETHING_WENT_WRONG_ERROR_RELOAD",
                                });
                                return [2 /*return*/];
                            }
                            deviceInfo = __assign({}, createResp);
                            delete deviceInfo.status;
                            _c.label = 9;
                        case 9:
                            // No need to check if the component is unmounting, since this has no effect then.
                            dispatch({
                                type: "load",
                                deviceInfo: deviceInfo,
                                error: error,
                                showBackButton: showBackButton,
                                showAccessDenied: false,
                                callingCreateDevice: false,
                            });
                            return [2 /*return*/];
                    }
                });
            });
        },
        [dispatch, recipeImpl, userContext]
    );
    useOnMountAPICall(fetchMFAInfo, onLoad, handleLoadError);
}
function useChildProps(recipe, recipeImplementation, state, dispatch, userContext, navigate) {
    var _this = this;
    var rethrowInRender = useRethrowInRender();
    return useMemo(
        function () {
            return {
                onShowSecretClicked: function () {
                    dispatch({ type: "showSecret" });
                },
                onBackButtonClicked: function () {
                    return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!state.deviceInfo) return [3 /*break*/, 2];
                                    return [
                                        4 /*yield*/,
                                        recipeImplementation.removeDevice({
                                            deviceName: state.deviceInfo.deviceName,
                                            userContext: userContext,
                                        }),
                                    ];
                                case 1:
                                    _a.sent();
                                    _a.label = 2;
                                case 2:
                                    // If we don't have navigate available this would mean we are not using react-router-dom, so we use window's history
                                    if (navigate === undefined) {
                                        return [
                                            2 /*return*/,
                                            WindowHandlerReference.getReferenceOrThrow()
                                                .windowHandler.getWindowUnsafe()
                                                .history.back(),
                                        ];
                                    }
                                    // If we do have navigate and goBack function on it this means we are using react-router-dom v5 or lower
                                    if ("goBack" in navigate) {
                                        return [2 /*return*/, navigate.goBack()];
                                    }
                                    // If we reach this code this means we are using react-router-dom v6
                                    return [2 /*return*/, navigate(-1)];
                            }
                        });
                    });
                },
                onRetryClicked: function () {
                    dispatch({ type: "restartFlow", error: undefined });
                },
                onSignOutClicked: function () {
                    return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!state.deviceInfo) return [3 /*break*/, 2];
                                    return [
                                        4 /*yield*/,
                                        recipeImplementation.removeDevice({
                                            deviceName: state.deviceInfo.deviceName,
                                            userContext: userContext,
                                        }),
                                    ];
                                case 1:
                                    _a.sent();
                                    _a.label = 2;
                                case 2:
                                    return [
                                        4 /*yield*/,
                                        Session.getInstanceOrThrow().signOut({ userContext: userContext }),
                                    ];
                                case 3:
                                    _a.sent();
                                    return [4 /*yield*/, redirectToAuth({ redirectBack: false, navigate: navigate })];
                                case 4:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    });
                },
                onSuccess: function () {
                    var redirectToPath = getRedirectToPathFromURL();
                    return Session.getInstanceOrThrow()
                        .validateGlobalClaimsAndHandleSuccessRedirection(
                            undefined,
                            recipe.recipeID,
                            redirectToPath,
                            userContext,
                            navigate
                        )
                        .catch(rethrowInRender);
                },
                recipeImplementation: recipeImplementation,
                config: recipe.config,
            };
        },
        [state, recipeImplementation]
    );
}
var SignInUpFeature = function (props) {
    var recipeComponentOverrides = props.useComponentOverrides();
    var _a = useFeatureReducer(),
        state = _a[0],
        dispatch = _a[1];
    var userContext = useUserContext();
    var recipeImplementation = React.useMemo(
        function () {
            return getModifiedRecipeImplementation(props.recipe.webJSRecipe, dispatch);
        },
        [props.recipe]
    );
    var childProps = useChildProps(props.recipe, recipeImplementation, state, dispatch, userContext, props.navigate);
    useOnLoad(recipeImplementation, dispatch, props.navigate, userContext);
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
                            defaultStore: defaultTranslationsTOTP,
                        },
                        {
                            children: jsxs(Fragment, {
                                children: [
                                    props.children === undefined &&
                                        jsx(
                                            TOTPMFAThemeWrapper,
                                            __assign({}, childProps, { featureState: state, dispatch: dispatch })
                                        ),
                                    props.children &&
                                        React.Children.map(props.children, function (child) {
                                            if (React.isValidElement(child)) {
                                                return React.cloneElement(
                                                    child,
                                                    __assign(__assign({}, childProps), {
                                                        featureState: state,
                                                        dispatch: dispatch,
                                                    })
                                                );
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
function getModifiedRecipeImplementation(originalImpl, dispatch) {
    var _this = this;
    return __assign(__assign({}, originalImpl), {
        createDevice: function (input) {
            return __awaiter(_this, void 0, void 0, function () {
                var res, deviceInfo;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [4 /*yield*/, originalImpl.createDevice(input)];
                        case 1:
                            res = _a.sent();
                            if (res.status === "OK") {
                                deviceInfo = __assign({}, res);
                                delete deviceInfo.status;
                                dispatch({ type: "createDevice", deviceInfo: deviceInfo });
                            }
                            return [2 /*return*/, res];
                    }
                });
            });
        },
        verifyCode: function (input) {
            return __awaiter(_this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [4 /*yield*/, originalImpl.verifyCode(input)];
                        case 1:
                            res = _a.sent();
                            if (res.status === "LIMIT_REACHED_ERROR") {
                                dispatch({
                                    type: "setBlocked",
                                    error: "ERROR_SIGN_IN_UP_CODE_VERIFY_BLOCKED",
                                    nextRetryAt: Date.now() + res.retryAfterMs,
                                });
                            } else if (res.status === "INVALID_TOTP_ERROR") {
                                dispatch({
                                    type: "setError",
                                    error: "ERROR_TOTP_INVALID_CODE",
                                    showAccessDenied: false,
                                    maxAttemptCount: res.maxNumberOfFailedAttempts,
                                    currAttemptCount: res.currentNumberOfFailedAttempts,
                                });
                            }
                            return [2 /*return*/, res];
                    }
                });
            });
        },
        verifyDevice: function (input) {
            return __awaiter(_this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [4 /*yield*/, originalImpl.verifyDevice(input)];
                        case 1:
                            res = _a.sent();
                            if (res.status === "LIMIT_REACHED_ERROR") {
                                dispatch({
                                    type: "setBlocked",
                                    error: "ERROR_TOTP_MFA_VERIFY_DEVICE_BLOCKED",
                                    nextRetryAt: Date.now() + res.retryAfterMs,
                                });
                            } else if (res.status === "UNKNOWN_DEVICE_ERROR") {
                                dispatch({
                                    type: "setError",
                                    error: "ERROR_TOTP_UNKNOWN_DEVICE",
                                    showAccessDenied: true,
                                });
                            } else if (res.status === "INVALID_TOTP_ERROR") {
                                dispatch({
                                    type: "setError",
                                    error: "ERROR_TOTP_INVALID_CODE",
                                    showAccessDenied: false,
                                    maxAttemptCount: res.maxNumberOfFailedAttempts,
                                    currAttemptCount: res.currentNumberOfFailedAttempts,
                                });
                            }
                            return [2 /*return*/, res];
                    }
                });
            });
        },
        removeDevice: function (input) {
            return __awaiter(_this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [4 /*yield*/, originalImpl.removeDevice(input)];
                        case 1:
                            res = _a.sent();
                            dispatch({ type: "restartFlow", error: undefined });
                            return [2 /*return*/, res];
                    }
                });
            });
        },
    });
}

export { SignInUpFeature, SignInUpFeature as default, useChildProps, useFeatureReducer };
