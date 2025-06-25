import { __assign, __awaiter, __generator } from '../../../../../../../_virtual/_tslib.js';
import { jsx, jsxs } from 'react/jsx-runtime';
import * as React from 'react';
import { Fragment, useMemo, useCallback } from 'react';
import AuthComponentWrapper from '../../../../../components/authCompWrapper.js';
import { useTranslation } from '../../../../../translation/translationContext.js';
import { useRethrowInRender, getTenantIdFromQueryParams } from '../../../../../utils.js';
import { EmailVerificationClaim } from '../../../../../../../emailverification.js';
import EmailVerification from '../../../../emailverification/recipe.js';
import { getInvalidClaimsFromResponse } from '../../../../../../../session.js';
import Session from '../../../../session/recipe.js';
import useSessionContext from '../../../../session/useSessionContext.js';
import EmailPassword from '../../../recipe.js';
import '../../../../../../../index.js';
import Label from '../../library/label.js';
import SignInTheme from '../../themes/signIn/index.js';

function useChildProps(recipe, onAuthSuccess, error, onError, clearError, userContext, navigate) {
    var _this = this;
    var session = useSessionContext();
    var recipeImplementation = useMemo(function () { return getModifiedRecipeImplementation(recipe.webJSRecipe); }, [recipe]);
    var rethrowInRender = useRethrowInRender();
    var t = useTranslation();
    var onSignInSuccess = useCallback(function () { return __awaiter(_this, void 0, void 0, function () {
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
                        createdNewUser: false,
                        isNewRecipeUser: false,
                        newSessionCreated: session.loading ||
                            !session.doesSessionExist ||
                            (payloadAfterCall !== undefined &&
                                session.accessTokenPayload.sessionHandle !== payloadAfterCall.sessionHandle),
                        recipeId: EmailPassword.RECIPE_ID,
                    }).catch(rethrowInRender)];
            }
        });
    }); }, [recipe, userContext, navigate]);
    return useMemo(function () {
        var onForgotPasswordClick = function () {
            return recipe.redirect({ action: "RESET_PASSWORD", tenantIdFromQueryParams: getTenantIdFromQueryParams() }, navigate, undefined, userContext);
        };
        var signInAndUpFeature = recipe.config.signInAndUpFeature;
        var signInFeature = signInAndUpFeature.signInForm;
        var formFields = signInFeature.formFields.map(function (f) {
            return f.id !== "password"
                ? f
                : __assign(__assign({}, f), { labelComponent: (jsxs("div", __assign({ "data-supertokens": "formLabelWithLinkWrapper" }, { children: [jsx(Label, { value: f.label, "data-supertokens": "passwordInputLabel" }), jsx("a", __assign({ onClick: onForgotPasswordClick, "data-supertokens": "link linkButton formLabelLinkBtn forgotPasswordLink" }, { children: t("EMAIL_PASSWORD_SIGN_IN_FORGOT_PW_LINK") }))] }))) });
        });
        return {
            recipeImplementation: recipeImplementation,
            config: recipe.config,
            styleFromInit: signInFeature.style,
            formFields: formFields,
            error: error,
            clearError: clearError,
            onError: onError,
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
            onSuccess: onSignInSuccess,
            onForgotPasswordClick: onForgotPasswordClick,
            userContext: userContext,
        };
    }, [recipe, error, userContext]);
}
var SignInFeature = function (props) {
    var childProps = useChildProps(props.recipe, props.onAuthSuccess, props.error, props.onError, props.clearError, props.userContext, props.navigate);
    var recipeComponentOverrides = props.useComponentOverrides();
    return (jsx(AuthComponentWrapper, __assign({ recipeComponentOverrides: recipeComponentOverrides }, { children: jsxs(Fragment, { children: [props.children === undefined && jsx(SignInTheme, __assign({}, childProps)), props.children &&
                    React.Children.map(props.children, function (child) {
                        if (React.isValidElement(child)) {
                            return React.cloneElement(child, __assign({}, childProps));
                        }
                        return child;
                    })] }) })));
};
var getModifiedRecipeImplementation = function (origImpl) {
    return __assign(__assign({}, origImpl), { signIn: function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, origImpl.signIn(__assign(__assign({}, input), { shouldTryLinkingWithSessionUser: false }))];
                        case 1:
                            response = _a.sent();
                            return [2 /*return*/, response];
                    }
                });
            });
        }, signUp: function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, origImpl.signUp(__assign(__assign({}, input), { shouldTryLinkingWithSessionUser: false }))];
                        case 1:
                            response = _a.sent();
                            return [2 /*return*/, response];
                    }
                });
            });
        } });
};

export { SignInFeature, SignInFeature as default, useChildProps };
