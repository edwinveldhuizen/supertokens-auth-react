import { __awaiter, __generator, __assign } from '../../../../../../../_virtual/_tslib.js';
import { jsx, jsxs } from 'react/jsx-runtime';
import * as React from 'react';
import { useContext, useState, useCallback, useMemo, Fragment } from 'react';
import { redirectToAuth } from '../../../../../../../index.js';
import { ComponentOverrideContext } from '../../../../../components/componentOverride/componentOverrideContext.js';
import FeatureWrapper from '../../../../../components/featureWrapper.js';
import SuperTokens from '../../../../../superTokens.js';
import { useUserContext } from '../../../../../usercontext/index.js';
import { useRethrowInRender, clearQueryParams, getQueryParams, useOnMountAPICall } from '../../../../../utils.js';
import '../../../../../../../session.js';
import Session from '../../../../session/recipe.js';
import EmailVerificationThemeWrapper from '../../themes/emailVerification/index.js';
import { defaultTranslationsEmailVerification } from '../../themes/translations.js';
import SessionContext from '../../../../session/sessionContext.js';

var EmailVerification = function (props) {
    var _a;
    var sessionContext = useContext(SessionContext);
    var _b = useState("LOADING"), status = _b[0], setStatus = _b[1];
    var rethrowInRender = useRethrowInRender();
    var recipeComponentOverrides = props.useComponentOverrides();
    var userContext = useUserContext();
    if (props.userContext !== undefined) {
        userContext = props.userContext;
    }
    var redirectToAuthWithHistory = useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, redirectToAuth({ redirectBack: false, navigate: props.navigate })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); }, [props.navigate]);
    var modifiedRecipeImplementation = useMemo(function () { return (__assign(__assign({}, props.recipe.webJSRecipe), { sendVerificationEmail: function (input) { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, props.recipe.webJSRecipe.sendVerificationEmail(input)];
                    case 1:
                        response = _a.sent();
                        clearQueryParams(["token"]);
                        return [2 /*return*/, response];
                }
            });
        }); } })); }, [props.recipe]);
    var onSuccess = useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, Session.getInstanceOrThrow()
                    .validateGlobalClaimsAndHandleSuccessRedirection(undefined, props.recipe.recipeID, undefined, userContext, props.navigate)
                    .catch(rethrowInRender)];
        });
    }); }, [props.recipe, props.navigate, userContext]);
    var fetchIsEmailVerified = useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        var token;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (sessionContext.loading === true) {
                        // This callback should only be called if the session is already loaded
                        throw new Error("Should never come here");
                    }
                    token = (_a = getQueryParams("token")) !== null && _a !== void 0 ? _a : undefined;
                    if (!(token === undefined)) return [3 /*break*/, 4];
                    if (!!sessionContext.doesSessionExist) return [3 /*break*/, 2];
                    return [4 /*yield*/, redirectToAuthWithHistory()];
                case 1:
                    _b.sent();
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, props.recipe.webJSRecipe.isEmailVerified({ userContext: userContext })];
                case 3: 
                // we check if the email is already verified, and if it is, then we redirect the user
                return [2 /*return*/, (_b.sent()).isVerified];
                case 4: return [2 /*return*/, false];
            }
        });
    }); }, [props.recipe, sessionContext, redirectToAuthWithHistory]);
    var checkIsEmailVerified = useCallback(function (isVerified) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (isVerified) {
                return [2 /*return*/, onSuccess()];
            }
            setStatus("READY");
            return [2 /*return*/];
        });
    }); }, [props.recipe, setStatus, onSuccess]);
    var handleError = useCallback(function (err) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Session.getInstanceOrThrow().doesSessionExist({ userContext: userContext })];
                case 1:
                    if (!_a.sent()) return [3 /*break*/, 2];
                    throw err;
                case 2: return [4 /*yield*/, redirectToAuthWithHistory()];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    }); }, [redirectToAuthWithHistory]);
    useOnMountAPICall(fetchIsEmailVerified, checkIsEmailVerified, handleError, sessionContext.loading === false);
    var signOut = useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        var session;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    session = Session.getInstanceOrThrow();
                    return [4 /*yield*/, session.signOut({ userContext: userContext })];
                case 1:
                    _a.sent();
                    return [2 /*return*/, redirectToAuthWithHistory()];
            }
        });
    }); }, [redirectToAuthWithHistory, userContext]);
    if (status === "LOADING") {
        return jsx(Fragment, {});
    }
    var sendVerifyEmailScreenFeature = props.recipe.config.sendVerifyEmailScreen;
    var sendVerifyEmailScreen = {
        styleFromInit: sendVerifyEmailScreenFeature.style,
        recipeImplementation: modifiedRecipeImplementation,
        config: props.recipe.config,
        signOut: signOut,
        onEmailAlreadyVerified: onSuccess,
        redirectToAuth: redirectToAuthWithHistory,
    };
    var verifyEmailLinkClickedScreenFeature = props.recipe.config.verifyEmailLinkClickedScreen;
    var token = (_a = getQueryParams("token")) !== null && _a !== void 0 ? _a : undefined;
    var verifyEmailLinkClickedScreen = token === undefined
        ? undefined
        : {
            styleFromInit: verifyEmailLinkClickedScreenFeature.style,
            onTokenInvalidRedirect: redirectToAuthWithHistory,
            onSuccess: onSuccess,
            recipeImplementation: modifiedRecipeImplementation,
            config: props.recipe.config,
            token: token,
        };
    var childProps = {
        config: props.recipe.config,
        sendVerifyEmailScreen: sendVerifyEmailScreen,
        verifyEmailLinkClickedScreen: verifyEmailLinkClickedScreen,
        hasToken: token !== undefined,
    };
    return (jsx(ComponentOverrideContext.Provider, __assign({ value: recipeComponentOverrides }, { children: jsx(FeatureWrapper, __assign({ useShadowDom: SuperTokens.getInstanceOrThrow().useShadowDom, defaultStore: defaultTranslationsEmailVerification }, { children: jsxs(Fragment, { children: [props.children === undefined && jsx(EmailVerificationThemeWrapper, __assign({}, childProps)), props.children &&
                        React.Children.map(props.children, function (child) {
                            if (React.isValidElement(child)) {
                                return React.cloneElement(child, childProps);
                            }
                            return child;
                        })] }) })) })));
};

export { EmailVerification, EmailVerification as default };
