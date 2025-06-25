import { __assign, __awaiter, __generator } from '../../../../../../../_virtual/_tslib.js';
import { jsx, jsxs } from 'react/jsx-runtime';
import * as React from 'react';
import { Fragment, useMemo } from 'react';
import AuthComponentWrapper from '../../../../../components/authCompWrapper.js';
import { useUserContext } from '../../../../../usercontext/index.js';
import { useRethrowInRender, getTenantIdFromQueryParams, getRedirectToPathFromURL } from '../../../../../utils.js';
import { EmailVerificationClaim } from '../../../../../../../emailverification.js';
import EmailVerification from '../../../../emailverification/recipe.js';
import { getInvalidClaimsFromResponse } from '../../../../../../../session.js';
import Session from '../../../../session/recipe.js';
import useSessionContext from '../../../../session/useSessionContext.js';
import { defaultPhoneNumberValidator } from '../../../defaultPhoneNumberValidator.js';
import { getPhoneNumberUtils } from '../../../phoneNumberUtils.js';
import SignInUpThemeWrapper from '../../themes/signInUp/index.js';

function useChildProps(recipe, factorIds, onAuthSuccess, error, onError, clearError, rebuildAuthPage, userContext, navigate) {
    var _this = this;
    var session = useSessionContext();
    var recipeImplementation = React.useMemo(function () { return recipe && getModifiedRecipeImplementation(recipe.webJSRecipe, recipe.config, rebuildAuthPage); }, [recipe]);
    var rethrowInRender = useRethrowInRender();
    return useMemo(function () {
        var _a;
        return {
            userContext: userContext,
            onSuccess: function (result) { return __awaiter(_this, void 0, void 0, function () {
                var payloadAfterCall;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, Session.getInstanceOrThrow().getAccessTokenPayloadSecurely({
                                    userContext: userContext,
                                })];
                        case 1:
                            payloadAfterCall = _b.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            _b.sent();
                            payloadAfterCall = undefined;
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/, onAuthSuccess({
                                createdNewUser: result.createdNewRecipeUser && result.user.loginMethods.length === 1,
                                isNewRecipeUser: result.createdNewRecipeUser,
                                newSessionCreated: session.loading ||
                                    !session.doesSessionExist ||
                                    (payloadAfterCall !== undefined &&
                                        session.accessTokenPayload.sessionHandle !== payloadAfterCall.sessionHandle),
                                recipeId: "passwordless",
                            }).catch(rethrowInRender)];
                    }
                });
            }); },
            error: error,
            onError: onError,
            clearError: clearError,
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
                            onError("SOMETHING_WENT_WRONG_ERROR");
                            return [2 /*return*/];
                    }
                });
            }); },
            factorIds: factorIds,
            recipeImplementation: recipeImplementation,
            config: recipe.config,
            validatePhoneNumber: (_a = recipe.config.validatePhoneNumber) !== null && _a !== void 0 ? _a : defaultPhoneNumberValidator,
        };
    }, [error, factorIds, userContext, recipeImplementation]);
}
var SignInUpFeatureInner = function (props) {
    var userContext = useUserContext();
    if (props.userContext !== undefined) {
        userContext = props.userContext;
    }
    var childProps = useChildProps(props.recipe, props.factorIds, props.onAuthSuccess, props.error, props.onError, props.clearError, props.rebuildAuthPage, userContext, props.navigate);
    return (jsxs(Fragment, { children: [props.children === undefined && jsx(SignInUpThemeWrapper, __assign({}, childProps)), props.children &&
                React.Children.map(props.children, function (child) {
                    if (React.isValidElement(child)) {
                        return React.cloneElement(child, __assign({}, childProps));
                    }
                    return child;
                })] }));
};
var SignInUpFeature = function (props) {
    var recipeComponentOverrides = props.useComponentOverrides();
    return (jsx(AuthComponentWrapper, __assign({ recipeComponentOverrides: recipeComponentOverrides }, { children: jsx(SignInUpFeatureInner, __assign({}, props)) })));
};
function getModifiedRecipeImplementation(originalImpl, config, rebuildAuthPage) {
    var _this = this;
    return __assign(__assign({}, originalImpl), { createCode: function (input) { return __awaiter(_this, void 0, void 0, function () {
            var contactInfo, phoneNumberUtils, contactMethod, additionalAttemptInfo, res;
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
                        return [4 /*yield*/, originalImpl.createCode(__assign(__assign({}, input), { shouldTryLinkingWithSessionUser: false, userContext: __assign(__assign({}, input.userContext), { additionalAttemptInfo: additionalAttemptInfo }) }))];
                    case 2:
                        res = _a.sent();
                        if (res.status === "OK") {
                            rebuildAuthPage();
                        }
                        return [2 /*return*/, res];
                }
            });
        }); } });
}

export { SignInUpFeature, SignInUpFeature as default, useChildProps };
