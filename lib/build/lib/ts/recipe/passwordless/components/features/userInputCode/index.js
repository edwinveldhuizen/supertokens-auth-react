import { __assign, __awaiter, __generator } from "../../../../../../../_virtual/_tslib.js";
import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Fragment, useMemo } from "react";
import AuthComponentWrapper from "../../../../../components/authCompWrapper.js";
import { useRethrowInRender, getTenantIdFromQueryParams, clearErrorQueryParam } from "../../../../../utils.js";
import { EmailVerificationClaim } from "../../../../../../../emailverification.js";
import EmailVerification from "../../../../emailverification/recipe.js";
import { getInvalidClaimsFromResponse } from "../../../../../../../session.js";
import Session from "../../../../session/recipe.js";
import useSessionContext from "../../../../session/useSessionContext.js";
import UserInputCodeFormScreenWrapper from "../../themes/userInputCodeForm/userInputCodeFormScreen.js";

function useChildProps(
    recipe,
    loginAttemptInfo,
    onAuthSuccess,
    error,
    onError,
    clearError,
    rebuildAuthPage,
    userContext,
    navigate
) {
    var _this = this;
    var session = useSessionContext();
    var recipeImplementation = React.useMemo(
        function () {
            return getModifiedRecipeImplementation(recipe.webJSRecipe, onError, rebuildAuthPage);
        },
        [recipe, onError, rebuildAuthPage]
    );
    var rethrowInRender = useRethrowInRender();
    return useMemo(
        function () {
            return {
                userContext: userContext,
                onSuccess: function (result) {
                    return __awaiter(_this, void 0, void 0, function () {
                        var payloadAfterCall;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _b.trys.push([0, 2, , 3]);
                                    return [
                                        4 /*yield*/,
                                        Session.getInstanceOrThrow().getAccessTokenPayloadSecurely({
                                            userContext: userContext,
                                        }),
                                    ];
                                case 1:
                                    payloadAfterCall = _b.sent();
                                    return [3 /*break*/, 3];
                                case 2:
                                    _b.sent();
                                    payloadAfterCall = undefined;
                                    return [3 /*break*/, 3];
                                case 3:
                                    return [
                                        2 /*return*/,
                                        onAuthSuccess({
                                            createdNewUser:
                                                result.createdNewRecipeUser && result.user.loginMethods.length === 1,
                                            isNewRecipeUser: result.createdNewRecipeUser,
                                            newSessionCreated:
                                                session.loading ||
                                                !session.doesSessionExist ||
                                                (payloadAfterCall !== undefined &&
                                                    session.accessTokenPayload.sessionHandle !==
                                                        payloadAfterCall.sessionHandle),
                                            recipeId: "passwordless",
                                        }).catch(rethrowInRender),
                                    ];
                            }
                        });
                    });
                },
                onFetchError: function (err) {
                    return __awaiter(_this, void 0, void 0, function () {
                        var invalidClaims, evInstance;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    if (!(err.status === Session.getInstanceOrThrow().config.invalidClaimStatusCode))
                                        return [3 /*break*/, 5];
                                    return [
                                        4 /*yield*/,
                                        getInvalidClaimsFromResponse({ response: err, userContext: userContext }),
                                    ];
                                case 1:
                                    invalidClaims = _b.sent();
                                    if (
                                        !invalidClaims.some(function (i) {
                                            return i.id === EmailVerificationClaim.id;
                                        })
                                    )
                                        return [3 /*break*/, 5];
                                    _b.label = 2;
                                case 2:
                                    _b.trys.push([2, 4, , 5]);
                                    evInstance = EmailVerification.getInstanceOrThrow();
                                    return [
                                        4 /*yield*/,
                                        evInstance.redirect(
                                            {
                                                action: "VERIFY_EMAIL",
                                                tenantIdFromQueryParams: getTenantIdFromQueryParams(),
                                            },
                                            navigate,
                                            undefined,
                                            userContext
                                        ),
                                    ];
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
                    });
                },
                loginAttemptInfo: loginAttemptInfo,
                error: error,
                onError: onError,
                clearError: clearError,
                recipeImplementation: recipeImplementation,
                config: recipe.config,
            };
        },
        [error, recipeImplementation]
    );
}
var UserInputCodeFeatureInner = function (props) {
    var childProps = useChildProps(
        props.recipe,
        props.loginAttemptInfo,
        props.onAuthSuccess,
        props.error,
        props.onError,
        props.clearError,
        props.rebuildAuthPage,
        props.userContext,
        props.navigate
    );
    return jsxs(Fragment, {
        children: [
            props.children === undefined &&
                jsx(UserInputCodeFormScreenWrapper, __assign({}, childProps, { userContext: props.userContext })),
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
var UserInputCodeFeature = function (props) {
    var recipeComponentOverrides = props.useComponentOverrides();
    return jsx(
        AuthComponentWrapper,
        __assign(
            { recipeComponentOverrides: recipeComponentOverrides },
            { children: jsx(UserInputCodeFeatureInner, __assign({}, props)) }
        )
    );
};
function getModifiedRecipeImplementation(originalImpl, setError, rebuildAuthPage) {
    var _this = this;
    return __assign(__assign({}, originalImpl), {
        resendCode: function (input) {
            return __awaiter(_this, void 0, void 0, function () {
                var res, loginAttemptInfo, timestamp;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            return [4 /*yield*/, originalImpl.resendCode(input)];
                        case 1:
                            res = _b.sent();
                            if (!(res.status === "OK")) return [3 /*break*/, 5];
                            return [
                                4 /*yield*/,
                                originalImpl.getLoginAttemptInfo({
                                    userContext: input.userContext,
                                }),
                            ];
                        case 2:
                            loginAttemptInfo = _b.sent();
                            if (!(loginAttemptInfo !== undefined)) return [3 /*break*/, 4];
                            timestamp = Date.now();
                            return [
                                4 /*yield*/,
                                originalImpl.setLoginAttemptInfo({
                                    userContext: input.userContext,
                                    attemptInfo: __assign(__assign({}, loginAttemptInfo), {
                                        shouldTryLinkingWithSessionUser:
                                            (_a = loginAttemptInfo.shouldTryLinkingWithSessionUser) !== null &&
                                            _a !== void 0
                                                ? _a
                                                : false,
                                        lastResend: timestamp,
                                    }),
                                }),
                            ];
                        case 3:
                            _b.sent();
                            _b.label = 4;
                        case 4:
                            return [3 /*break*/, 7];
                        case 5:
                            if (!(res.status === "RESTART_FLOW_ERROR")) return [3 /*break*/, 7];
                            return [
                                4 /*yield*/,
                                originalImpl.clearLoginAttemptInfo({
                                    userContext: input.userContext,
                                }),
                            ];
                        case 6:
                            _b.sent();
                            setError("ERROR_SIGN_IN_UP_RESEND_RESTART_FLOW");
                            rebuildAuthPage();
                            _b.label = 7;
                        case 7:
                            return [2 /*return*/, res];
                    }
                });
            });
        },
        consumeCode: function (input) {
            return __awaiter(_this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [4 /*yield*/, originalImpl.consumeCode(input)];
                        case 1:
                            res = _a.sent();
                            if (!(res.status === "RESTART_FLOW_ERROR")) return [3 /*break*/, 3];
                            return [
                                4 /*yield*/,
                                originalImpl.clearLoginAttemptInfo({
                                    userContext: input.userContext,
                                }),
                            ];
                        case 2:
                            _a.sent();
                            setError("ERROR_SIGN_IN_UP_CODE_CONSUME_RESTART_FLOW");
                            rebuildAuthPage();
                            return [3 /*break*/, 7];
                        case 3:
                            if (!(res.status === "SIGN_IN_UP_NOT_ALLOWED")) return [3 /*break*/, 5];
                            return [
                                4 /*yield*/,
                                originalImpl.clearLoginAttemptInfo({
                                    userContext: input.userContext,
                                }),
                            ];
                        case 4:
                            _a.sent();
                            setError(res.reason);
                            rebuildAuthPage();
                            return [3 /*break*/, 7];
                        case 5:
                            if (!(res.status === "OK")) return [3 /*break*/, 7];
                            return [
                                4 /*yield*/,
                                originalImpl.clearLoginAttemptInfo({
                                    userContext: input.userContext,
                                }),
                            ];
                        case 6:
                            _a.sent();
                            _a.label = 7;
                        case 7:
                            return [2 /*return*/, res];
                    }
                });
            });
        },
        clearLoginAttemptInfo: function (input) {
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                originalImpl.clearLoginAttemptInfo({
                                    userContext: input.userContext,
                                }),
                            ];
                        case 1:
                            _a.sent();
                            clearErrorQueryParam();
                            rebuildAuthPage();
                            return [2 /*return*/];
                    }
                });
            });
        },
    });
}

export { UserInputCodeFeature, UserInputCodeFeature as default, useChildProps };
