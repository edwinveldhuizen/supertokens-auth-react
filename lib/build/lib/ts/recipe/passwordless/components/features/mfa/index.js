import { __assign, __awaiter, __generator } from '../../../../../../../_virtual/_tslib.js';
import { jsx, jsxs } from 'react/jsx-runtime';
import * as React from 'react';
import { Fragment, useMemo } from 'react';
import { WindowHandlerReference } from 'supertokens-web-js/utils/windowHandler';
import { redirectToAuth } from '../../../../../../../index.js';
import { ComponentOverrideContext } from '../../../../../components/componentOverride/componentOverrideContext.js';
import FeatureWrapper from '../../../../../components/featureWrapper.js';
import SuperTokens from '../../../../../superTokens.js';
import { useUserContext } from '../../../../../usercontext/index.js';
import { getTenantIdFromQueryParams, getRedirectToPathFromURL, getQueryParams, useOnMountAPICall, clearErrorQueryParam, useRethrowInRender } from '../../../../../utils.js';
import { EmailVerificationClaim } from '../../../../../../../emailverification.js';
import EmailVerification from '../../../../emailverification/recipe.js';
import MultiFactorAuth from '../../../../multifactorauth/recipe.js';
import { FactorIds } from '../../../../multifactorauth/types.js';
import { getAvailableFactors } from '../../../../multifactorauth/utils.js';
import { getInvalidClaimsFromResponse } from '../../../../../../../session.js';
import Session from '../../../../session/recipe.js';
import { defaultPhoneNumberValidator } from '../../../defaultPhoneNumberValidator.js';
import { getPhoneNumberUtils } from '../../../phoneNumberUtils.js';
import { checkAdditionalLoginAttemptInfoProperties } from '../../../utils.js';
import MFAThemeWrapper from '../../themes/mfa/index.js';
import { defaultTranslationsPasswordless } from '../../themes/translations.js';

var useFeatureReducer = function () {
    return React.useReducer(function (oldState, action) {
        switch (action.type) {
            case "load":
                return {
                    // We want to wait for createCode to finish before marking the page fully loaded
                    loaded: !action.callingCreateCode,
                    error: action.error,
                    loginAttemptInfo: action.loginAttemptInfo,
                    canChangeEmail: action.canChangeEmail,
                    showAccessDenied: action.showAccessDenied,
                    showBackButton: action.showBackButton,
                };
            case "resendCode":
                if (!oldState.loginAttemptInfo) {
                    return oldState;
                }
                return __assign(__assign({}, oldState), { error: undefined, loginAttemptInfo: __assign(__assign({}, oldState.loginAttemptInfo), { lastResend: action.timestamp }) });
            case "restartFlow":
                return __assign(__assign({}, oldState), { error: action.error, loginAttemptInfo: undefined, showAccessDenied: !oldState.canChangeEmail });
            case "setError":
                return __assign(__assign({}, oldState), { loaded: true, error: action.error, showAccessDenied: action.showAccessDenied });
            case "startVerify":
                return __assign(__assign({}, oldState), { loaded: true, loginAttemptInfo: action.loginAttemptInfo, error: undefined });
            default:
                return oldState;
        }
    }, {
        showAccessDenied: false,
        error: undefined,
        loaded: false,
        loginAttemptInfo: undefined,
        canChangeEmail: false,
        showBackButton: false,
    }, function (initArg) {
        var error = undefined;
        var errorQueryParam = getQueryParams("error");
        if (errorQueryParam !== null) {
            error = "SOMETHING_WENT_WRONG_ERROR";
        }
        return __assign(__assign({}, initArg), { error: error });
    });
};
function useChildProps(recipe, recipeImplementation, state, contactMethod, dispatch, userContext, navigate) {
    var _this = this;
    var rethrowInRender = useRethrowInRender();
    return useMemo(function () {
        var _a;
        return {
            onSuccess: function () {
                var redirectToPath = getRedirectToPathFromURL();
                return Session.getInstanceOrThrow()
                    .validateGlobalClaimsAndHandleSuccessRedirection(undefined, recipe.recipeID, redirectToPath, userContext, navigate)
                    .catch(rethrowInRender);
            },
            onSignOutClicked: function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, Session.getInstanceOrThrow().signOut({ userContext: userContext })];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, recipeImplementation.clearLoginAttemptInfo({ userContext: userContext })];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, redirectToAuth({ redirectBack: false, navigate: navigate })];
                        case 3:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); },
            onBackButtonClicked: function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!state.loginAttemptInfo) return [3 /*break*/, 2];
                            return [4 /*yield*/, recipeImplementation.clearLoginAttemptInfo({ userContext: userContext })];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2:
                            // If we don't have navigate available this would mean we are not using react-router-dom, so we use window's history
                            if (navigate === undefined) {
                                return [2 /*return*/, WindowHandlerReference.getReferenceOrThrow().windowHandler.getWindowUnsafe().history.back()];
                            }
                            // If we do have navigate and goBack function on it this means we are using react-router-dom v5 or lower
                            if ("goBack" in navigate) {
                                return [2 /*return*/, navigate.goBack()];
                            }
                            // If we reach this code this means we are using react-router-dom v6
                            return [2 /*return*/, navigate(-1)];
                    }
                });
            }); },
            onFetchError: function (err) { return __awaiter(_this, void 0, void 0, function () {
                var invalidClaims, evInstance;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!(err.status === Session.getInstanceOrThrow().config.invalidClaimStatusCode)) return [3 /*break*/, 5];
                            return [4 /*yield*/, getInvalidClaimsFromResponse({ response: err, userContext: userContext })];
                        case 1:
                            invalidClaims = _b.sent();
                            if (!invalidClaims.some(function (i) { return i.id === EmailVerificationClaim.id; })) return [3 /*break*/, 5];
                            _b.label = 2;
                        case 2:
                            _b.trys.push([2, 4, , 5]);
                            evInstance = EmailVerification.getInstanceOrThrow();
                            return [4 /*yield*/, evInstance.redirect({
                                    action: "VERIFY_EMAIL",
                                    tenantIdFromQueryParams: getTenantIdFromQueryParams(),
                                }, navigate, undefined, userContext)];
                        case 3:
                            _b.sent();
                            return [2 /*return*/];
                        case 4:
                            _b.sent();
                            return [3 /*break*/, 5];
                        case 5:
                            dispatch({ type: "setError", showAccessDenied: false, error: "SOMETHING_WENT_WRONG_ERROR" });
                            return [2 /*return*/];
                    }
                });
            }); },
            recipeImplementation: recipeImplementation,
            config: recipe.config,
            contactMethod: contactMethod,
            validatePhoneNumber: (_a = recipe.config.validatePhoneNumber) !== null && _a !== void 0 ? _a : defaultPhoneNumberValidator,
        };
    }, [contactMethod, state, recipeImplementation]);
}
var MFAFeatureInner = function (props) {
    var userContext = useUserContext();
    var _a = useFeatureReducer(), state = _a[0], dispatch = _a[1];
    var recipeImplementation = React.useMemo(function () { return props.recipe && getModifiedRecipeImplementation(props.recipe.webJSRecipe, props.recipe.config, dispatch); }, [props.recipe]);
    useOnLoad(props, recipeImplementation, dispatch, userContext);
    var childProps = useChildProps(props.recipe, recipeImplementation, state, props.contactMethod, dispatch, userContext, props.navigate);
    return (jsxs(Fragment, { children: [props.children === undefined && (jsx(MFAThemeWrapper, __assign({}, childProps, { featureState: state, dispatch: dispatch }))), props.children &&
                React.Children.map(props.children, function (child) {
                    if (React.isValidElement(child)) {
                        return React.cloneElement(child, __assign(__assign({}, childProps), { featureState: state, dispatch: dispatch }));
                    }
                    return child;
                })] }));
};
var MFAFeature = function (props) {
    var recipeComponentOverrides = props.useComponentOverrides();
    return (jsx(ComponentOverrideContext.Provider, __assign({ value: recipeComponentOverrides }, { children: jsx(FeatureWrapper, __assign({ useShadowDom: SuperTokens.getInstanceOrThrow().useShadowDom, defaultStore: defaultTranslationsPasswordless }, { children: jsx(MFAFeatureInner, __assign({}, props)) })) })));
};
function useOnLoad(props, recipeImplementation, dispatch, userContext) {
    var _this = this;
    var fetchMFAInfo = React.useCallback(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/, MultiFactorAuth.getInstanceOrThrow().webJSRecipe.resyncSessionAndFetchMFAInfo({ userContext: userContext })];
    }); }); }, [userContext]);
    var handleLoadError = React.useCallback(function () { return dispatch({ type: "setError", showAccessDenied: true, error: "SOMETHING_WENT_WRONG_ERROR_RELOAD" }); }, [dispatch]);
    var onLoad = React.useCallback(function (mfaInfo) { return __awaiter(_this, void 0, void 0, function () {
        var error, errorQueryParam, doSetup, stepUp, loginAttemptInfo, factorId, redirectToPath, showBackButton, contactInfoList, createCodeInfo, createResp, err_1, invalidClaims, evInstance;
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
                    return [4 /*yield*/, recipeImplementation.getLoginAttemptInfo({
                            userContext: userContext,
                        })];
                case 1:
                    loginAttemptInfo = _c.sent();
                    factorId = props.contactMethod === "EMAIL" ? FactorIds.OTP_EMAIL : FactorIds.OTP_PHONE;
                    if (!(loginAttemptInfo &&
                        (props.contactMethod !== loginAttemptInfo.contactMethod ||
                            !checkAdditionalLoginAttemptInfoProperties(loginAttemptInfo)))) return [3 /*break*/, 3];
                    return [4 /*yield*/, (recipeImplementation === null || recipeImplementation === void 0 ? void 0 : recipeImplementation.clearLoginAttemptInfo({ userContext: userContext }))];
                case 2:
                    _c.sent();
                    loginAttemptInfo = undefined;
                    _c.label = 3;
                case 3:
                    if (!(mfaInfo.factors.next.length === 0 && stepUp !== "true" && doSetup !== "true")) return [3 /*break*/, 7];
                    redirectToPath = getRedirectToPathFromURL();
                    _c.label = 4;
                case 4:
                    _c.trys.push([4, 6, , 7]);
                    return [4 /*yield*/, Session.getInstanceOrThrow().validateGlobalClaimsAndHandleSuccessRedirection(undefined, props.recipe.recipeID, redirectToPath, userContext, props.navigate)];
                case 5:
                    _c.sent();
                    return [3 /*break*/, 7];
                case 6:
                    _c.sent();
                    // If we couldn't redirect to EV (or an unknown claim validation failed or somehow the redirection threw an error)
                    // we fall back to showing the something went wrong error
                    dispatch({
                        type: "setError",
                        showAccessDenied: true,
                        error: "SOMETHING_WENT_WRONG_ERROR_RELOAD",
                    });
                    return [3 /*break*/, 7];
                case 7:
                    showBackButton = mfaInfo.factors.next.length === 0 ||
                        getAvailableFactors(mfaInfo.factors, undefined, MultiFactorAuth.getInstanceOrThrow(), userContext)
                            .length !== 1;
                    contactInfoList = (props.contactMethod === "EMAIL" ? mfaInfo.emails[factorId] : mfaInfo.phoneNumbers[factorId]) || [];
                    if (!!loginAttemptInfo) return [3 /*break*/, 19];
                    if (!(contactInfoList.length > 0 && doSetup !== "true")) return [3 /*break*/, 17];
                    createCodeInfo = props.contactMethod === "EMAIL"
                        ? { email: contactInfoList[0] }
                        : { phoneNumber: contactInfoList[0] };
                    createResp = void 0;
                    _c.label = 8;
                case 8:
                    _c.trys.push([8, 10, , 16]);
                    dispatch({
                        type: "load",
                        showAccessDenied: false,
                        loginAttemptInfo: undefined,
                        error: error,
                        canChangeEmail: contactInfoList.length === 0,
                        showBackButton: showBackButton,
                        callingCreateCode: true,
                    });
                    return [4 /*yield*/, recipeImplementation.createCode(__assign(__assign({}, createCodeInfo), { shouldTryLinkingWithSessionUser: true, userContext: userContext }))];
                case 9:
                    // createCode also dispatches the event that marks this page fully loaded
                    createResp = _c.sent();
                    return [3 /*break*/, 16];
                case 10:
                    err_1 = _c.sent();
                    if (!("status" in err_1 &&
                        err_1.status === Session.getInstanceOrThrow().config.invalidClaimStatusCode)) return [3 /*break*/, 15];
                    return [4 /*yield*/, getInvalidClaimsFromResponse({ response: err_1, userContext: userContext })];
                case 11:
                    invalidClaims = _c.sent();
                    if (!invalidClaims.some(function (i) { return i.id === EmailVerificationClaim.id; })) return [3 /*break*/, 15];
                    _c.label = 12;
                case 12:
                    _c.trys.push([12, 14, , 15]);
                    evInstance = EmailVerification.getInstanceOrThrow();
                    return [4 /*yield*/, evInstance.redirect({
                            tenantIdFromQueryParams: getTenantIdFromQueryParams(),
                            action: "VERIFY_EMAIL",
                        }, props.navigate, undefined, userContext)];
                case 13:
                    _c.sent();
                    return [2 /*return*/];
                case 14:
                    _c.sent();
                    return [3 /*break*/, 15];
                case 15:
                    // If it isn't a 403 or if it is not an EV claim error, we show the error
                    dispatch({
                        type: "setError",
                        showAccessDenied: true,
                        error: "SOMETHING_WENT_WRONG_ERROR_RELOAD",
                    });
                    return [2 /*return*/];
                case 16:
                    if ((createResp === null || createResp === void 0 ? void 0 : createResp.status) !== "OK") {
                        dispatch({
                            type: "setError",
                            showAccessDenied: true,
                            error: createResp.status === "SIGN_IN_UP_NOT_ALLOWED"
                                ? createResp.reason
                                : "SOMETHING_WENT_WRONG_ERROR_RELOAD",
                        });
                    }
                    return [3 /*break*/, 18];
                case 17:
                    // this will ask the user for the email/phone
                    dispatch({
                        type: "load",
                        showAccessDenied: false,
                        loginAttemptInfo: loginAttemptInfo,
                        error: error,
                        canChangeEmail: true,
                        showBackButton: showBackButton,
                        callingCreateCode: false,
                    });
                    _c.label = 18;
                case 18: return [3 /*break*/, 20];
                case 19:
                    // In this branch we already have a valid login attempt so we show the OTP screen
                    dispatch({
                        type: "load",
                        showAccessDenied: false,
                        loginAttemptInfo: loginAttemptInfo,
                        error: error,
                        canChangeEmail: contactInfoList.length === 0,
                        showBackButton: showBackButton,
                        callingCreateCode: false,
                    });
                    _c.label = 20;
                case 20: return [2 /*return*/];
            }
        });
    }); }, [dispatch, recipeImplementation, props.contactMethod, userContext]);
    useOnMountAPICall(fetchMFAInfo, onLoad, handleLoadError);
}
function getModifiedRecipeImplementation(originalImpl, config, dispatch) {
    var _this = this;
    return __assign(__assign({}, originalImpl), { createCode: function (input) { return __awaiter(_this, void 0, void 0, function () {
            var contactInfo, phoneNumberUtils, contactMethod, additionalAttemptInfo, res, loginAttemptInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getPhoneNumberUtils()];
                    case 1:
                        phoneNumberUtils = _a.sent();
                        if ("email" in input) {
                            contactInfo = input.email;
                        }
                        else {
                            contactInfo = phoneNumberUtils.formatNumber(input.phoneNumber, config.signInUpFeature.defaultCountry || "", phoneNumberUtils.numberFormat.E164);
                        }
                        contactMethod = "email" in input ? "EMAIL" : "PHONE";
                        additionalAttemptInfo = {
                            lastResend: Date.now(),
                            contactMethod: contactMethod,
                            contactInfo: contactInfo,
                            redirectToPath: getRedirectToPathFromURL(),
                        };
                        return [4 /*yield*/, originalImpl.createCode(__assign(__assign({}, input), { shouldTryLinkingWithSessionUser: true, userContext: __assign(__assign({}, input.userContext), { additionalAttemptInfo: additionalAttemptInfo }) }))];
                    case 2:
                        res = _a.sent();
                        if (!(res.status === "OK")) return [3 /*break*/, 4];
                        return [4 /*yield*/, originalImpl.getLoginAttemptInfo({
                                userContext: input.userContext,
                            })];
                    case 3:
                        loginAttemptInfo = (_a.sent());
                        dispatch({ type: "startVerify", loginAttemptInfo: loginAttemptInfo });
                        _a.label = 4;
                    case 4: return [2 /*return*/, res];
                }
            });
        }); }, resendCode: function (input) { return __awaiter(_this, void 0, void 0, function () {
            var res, loginAttemptInfo, timestamp;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, originalImpl.resendCode(input)];
                    case 1:
                        res = _b.sent();
                        if (!(res.status === "OK")) return [3 /*break*/, 5];
                        return [4 /*yield*/, originalImpl.getLoginAttemptInfo({
                                userContext: input.userContext,
                            })];
                    case 2:
                        loginAttemptInfo = _b.sent();
                        if (!(loginAttemptInfo !== undefined)) return [3 /*break*/, 4];
                        timestamp = Date.now();
                        return [4 /*yield*/, originalImpl.setLoginAttemptInfo({
                                userContext: input.userContext,
                                attemptInfo: __assign(__assign({}, loginAttemptInfo), { shouldTryLinkingWithSessionUser: (_a = loginAttemptInfo.shouldTryLinkingWithSessionUser) !== null && _a !== void 0 ? _a : true, lastResend: timestamp }),
                            })];
                    case 3:
                        _b.sent();
                        dispatch({ type: "resendCode", timestamp: timestamp });
                        _b.label = 4;
                    case 4: return [3 /*break*/, 7];
                    case 5:
                        if (!(res.status === "RESTART_FLOW_ERROR")) return [3 /*break*/, 7];
                        return [4 /*yield*/, originalImpl.clearLoginAttemptInfo({
                                userContext: input.userContext,
                            })];
                    case 6:
                        _b.sent();
                        dispatch({ type: "restartFlow", error: "ERROR_SIGN_IN_UP_RESEND_RESTART_FLOW" });
                        _b.label = 7;
                    case 7: return [2 /*return*/, res];
                }
            });
        }); }, consumeCode: function (input) { return __awaiter(_this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, originalImpl.consumeCode(__assign(__assign({}, input), { shouldTryLinkingWithSessionUser: true }))];
                    case 1:
                        res = _a.sent();
                        if (!(res.status === "RESTART_FLOW_ERROR")) return [3 /*break*/, 3];
                        return [4 /*yield*/, originalImpl.clearLoginAttemptInfo({
                                userContext: input.userContext,
                            })];
                    case 2:
                        _a.sent();
                        dispatch({ type: "restartFlow", error: "ERROR_SIGN_IN_UP_CODE_CONSUME_RESTART_FLOW" });
                        return [3 /*break*/, 7];
                    case 3:
                        if (!(res.status === "SIGN_IN_UP_NOT_ALLOWED")) return [3 /*break*/, 5];
                        // This should never happen, but technically possible based on the API specs
                        // so we keep this here to cover all cases
                        return [4 /*yield*/, originalImpl.clearLoginAttemptInfo({
                                userContext: input.userContext,
                            })];
                    case 4:
                        // This should never happen, but technically possible based on the API specs
                        // so we keep this here to cover all cases
                        _a.sent();
                        dispatch({ type: "restartFlow", error: res.reason });
                        return [3 /*break*/, 7];
                    case 5:
                        if (!(res.status === "OK")) return [3 /*break*/, 7];
                        return [4 /*yield*/, originalImpl.clearLoginAttemptInfo({
                                userContext: input.userContext,
                            })];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7: return [2 /*return*/, res];
                }
            });
        }); }, clearLoginAttemptInfo: function (input) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, originalImpl.clearLoginAttemptInfo({
                            userContext: input.userContext,
                        })];
                    case 1:
                        _a.sent();
                        clearErrorQueryParam();
                        dispatch({ type: "restartFlow", error: undefined });
                        return [2 /*return*/];
                }
            });
        }); } });
}

export { MFAFeature, MFAFeature as default, useChildProps, useFeatureReducer };
