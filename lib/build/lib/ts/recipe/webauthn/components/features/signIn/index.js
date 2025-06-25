import { __assign, __awaiter, __generator } from '../../../../../../../_virtual/_tslib.js';
import { jsx, jsxs } from 'react/jsx-runtime';
import * as React from 'react';
import { useState, useEffect } from 'react';
import AuthComponentWrapper from '../../../../../components/authCompWrapper.js';
import { useUserContext } from '../../../../../usercontext/index.js';
import { useRethrowInRender } from '../../../../../utils.js';
import { useSessionContext } from '../../../../../../../session.js';
import Session from '../../../../session/recipe.js';
import PasskeySignInTheme from '../../themes/signIn/index.js';

function useChildProps(recipe, factorIds, onAuthSuccess, error, onError, userContext, clearError, resetFactorList, onSignInUpSwitcherClick, showBackButton, isPasskeySupported) {
    var _this = this;
    var session = useSessionContext();
    var recipeImplementation = recipe.webJSRecipe;
    var rethrowInRender = useRethrowInRender();
    return React.useMemo(function () {
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
                                recipeId: "webauthn",
                            }).catch(rethrowInRender)];
                    }
                });
            }); },
            error: error,
            onError: onError,
            clearError: clearError,
            onFetchError: function ( /* err: Response*/) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    onError("SOMETHING_WENT_WRONG_ERROR");
                    return [2 /*return*/];
                });
            }); },
            factorIds: factorIds,
            recipeImplementation: recipeImplementation,
            config: recipe.config,
            resetFactorList: resetFactorList,
            onSignInUpSwitcherClick: onSignInUpSwitcherClick,
            isPasskeySupported: isPasskeySupported,
            showBackButton: showBackButton,
        };
    }, [error, factorIds, userContext, isPasskeySupported, showBackButton, recipeImplementation]);
}
var SignInFeatureInner = function (props) {
    var userContext = useUserContext();
    if (props.userContext !== undefined) {
        userContext = props.userContext;
    }
    var _a = useState(true), isPasskeySupported = _a[0], setIsPasskeySupported = _a[1];
    useEffect(function () {
        void (function () { return __awaiter(void 0, void 0, void 0, function () {
            var browserSupportsWebauthn;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, props.recipe.webJSRecipe.doesBrowserSupportWebAuthn({
                            userContext: userContext,
                        })];
                    case 1:
                        browserSupportsWebauthn = _a.sent();
                        if (browserSupportsWebauthn.status !== "OK") {
                            console.error(browserSupportsWebauthn.error);
                            return [2 /*return*/];
                        }
                        setIsPasskeySupported(browserSupportsWebauthn.browserSupportsWebauthn);
                        return [2 /*return*/];
                }
            });
        }); })();
    }, [props.recipe.webJSRecipe]);
    var childProps = useChildProps(props.recipe, props.factorIds, props.onAuthSuccess, props.error, props.onError, userContext, props.clearError, props.resetFactorList, props.onSignInUpSwitcherClick, props.showBackButton, isPasskeySupported);
    return (jsxs(React.Fragment, { children: [props.children === undefined && jsx(PasskeySignInTheme, __assign({}, childProps)), props.children &&
                React.Children.map(props.children, function (child) {
                    if (React.isValidElement(child)) {
                        return React.cloneElement(child, __assign({}, childProps));
                    }
                    return child;
                })] }));
};
var SignInWithPasskeyFeature = function (props) {
    var recipeComponentOverrides = props.useComponentOverrides();
    return (jsx(AuthComponentWrapper, __assign({ recipeComponentOverrides: recipeComponentOverrides }, { children: jsx(SignInFeatureInner, __assign({}, props)) })));
};

export { SignInWithPasskeyFeature, SignInWithPasskeyFeature as default, useChildProps };
