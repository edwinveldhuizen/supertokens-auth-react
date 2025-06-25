import { __awaiter, __generator, __assign } from '../../../../../../../_virtual/_tslib.js';
import { jsx, jsxs } from 'react/jsx-runtime';
import React__default, { useState, useCallback, Fragment } from 'react';
import STGeneralError from 'supertokens-web-js/utils/error';
import { ComponentOverrideContext } from '../../../../../components/componentOverride/componentOverrideContext.js';
import FeatureWrapper from '../../../../../components/featureWrapper.js';
import SuperTokens from '../../../../../superTokens.js';
import { useUserContext } from '../../../../../usercontext/index.js';
import { useRethrowInRender, getQueryParams, getURLHash, getTenantIdFromQueryParams, useOnMountAPICall } from '../../../../../utils.js';
import Session from '../../../../session/recipe.js';
import { LinkClickedScreen as LinkClickedScreen$1 } from '../../themes/linkClickedScreen/index.js';
import { defaultTranslationsPasswordless } from '../../themes/translations.js';

var LinkClickedScreen = function (props) {
    var rethrowInRender = useRethrowInRender();
    var userContext = useUserContext();
    if (props.userContext !== undefined) {
        userContext = props.userContext;
    }
    var _a = useState(false), requireUserInteraction = _a[0], setRequireUserInteraction = _a[1];
    var consumeCodeAtMount = useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        var preAuthSessionId, linkCode, loginAttemptInfo, payloadBeforeCall;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    preAuthSessionId = getQueryParams("preAuthSessionId");
                    linkCode = getURLHash();
                    if (!(preAuthSessionId === null || preAuthSessionId.length === 0 || linkCode.length === 0)) return [3 /*break*/, 2];
                    return [4 /*yield*/, SuperTokens.getInstanceOrThrow().redirectToAuth({
                            navigate: props.navigate,
                            queryParams: {
                                error: "signin",
                            },
                            redirectBack: false,
                            userContext: userContext,
                        })];
                case 1:
                    _c.sent();
                    return [2 /*return*/, "REDIRECTING"];
                case 2: return [4 /*yield*/, props.recipe.webJSRecipe.getLoginAttemptInfo({ userContext: userContext })];
                case 3:
                    loginAttemptInfo = _c.sent();
                    if ((loginAttemptInfo === null || loginAttemptInfo === void 0 ? void 0 : loginAttemptInfo.preAuthSessionId) !== preAuthSessionId) {
                        return [2 /*return*/, "REQUIRES_INTERACTION"];
                    }
                    _c.label = 4;
                case 4:
                    _c.trys.push([4, 6, , 7]);
                    return [4 /*yield*/, Session.getInstanceOrThrow().getAccessTokenPayloadSecurely({
                            userContext: userContext,
                        })];
                case 5:
                    payloadBeforeCall = _c.sent();
                    return [3 /*break*/, 7];
                case 6:
                    _c.sent();
                    // If getAccessTokenPayloadSecurely threw, that generally means we have no active session
                    payloadBeforeCall = undefined;
                    return [3 /*break*/, 7];
                case 7:
                    _b = {
                        payloadBeforeCall: payloadBeforeCall
                    };
                    return [4 /*yield*/, props.recipe.webJSRecipe.consumeCode({
                            userContext: userContext,
                        })];
                case 8: return [2 /*return*/, (_b.response = _c.sent(),
                        _b)];
            }
        });
    }); }, [props.recipe, props.navigate, userContext]);
    var handleConsumeResp = useCallback(function (consumeRes) { return __awaiter(void 0, void 0, void 0, function () {
        var response, payloadBeforeCall, payloadAfterCall, loginAttemptInfo;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (consumeRes === "REQUIRES_INTERACTION") {
                        // We set this here, to make sure it's set after a possible remount
                        setRequireUserInteraction(true);
                    }
                    if (typeof consumeRes === "string") {
                        // In this case we are already redirecting or showing the continue button
                        return [2 /*return*/];
                    }
                    response = consumeRes.response, payloadBeforeCall = consumeRes.payloadBeforeCall;
                    if (response.status === "RESTART_FLOW_ERROR") {
                        return [2 /*return*/, SuperTokens.getInstanceOrThrow().redirectToAuth({
                                navigate: props.navigate,
                                queryParams: {
                                    error: "restart_link",
                                },
                                redirectBack: false,
                                userContext: userContext,
                            })];
                    }
                    if (response.status === "SIGN_IN_UP_NOT_ALLOWED") {
                        return [2 /*return*/, SuperTokens.getInstanceOrThrow().redirectToAuth({
                                navigate: props.navigate,
                                queryParams: {
                                    error: response.reason,
                                },
                                redirectBack: false,
                                userContext: userContext,
                            })];
                    }
                    if (!(response.status === "OK")) return [3 /*break*/, 7];
                    payloadAfterCall = void 0;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, Session.getInstanceOrThrow().getAccessTokenPayloadSecurely({
                            userContext: userContext,
                        })];
                case 2:
                    payloadAfterCall = _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    _b.sent();
                    payloadAfterCall = undefined;
                    return [3 /*break*/, 4];
                case 4: return [4 /*yield*/, props.recipe.webJSRecipe.getLoginAttemptInfo({
                        userContext: userContext,
                    })];
                case 5:
                    loginAttemptInfo = _b.sent();
                    return [4 /*yield*/, props.recipe.webJSRecipe.clearLoginAttemptInfo({
                            userContext: userContext,
                        })];
                case 6:
                    _b.sent();
                    return [2 /*return*/, Session.getInstanceOrThrow()
                            .validateGlobalClaimsAndHandleSuccessRedirection({
                            action: "SUCCESS",
                            createdNewUser: response.createdNewRecipeUser && response.user.loginMethods.length === 1,
                            isNewRecipeUser: response.createdNewRecipeUser,
                            newSessionCreated: payloadAfterCall !== undefined &&
                                (payloadBeforeCall === undefined ||
                                    payloadBeforeCall.sessionHandle !== payloadAfterCall.sessionHandle),
                            recipeId: props.recipe.recipeID,
                            tenantIdFromQueryParams: getTenantIdFromQueryParams(),
                        }, props.recipe.recipeID, loginAttemptInfo === null || loginAttemptInfo === void 0 ? void 0 : loginAttemptInfo.redirectToPath, userContext, props.navigate)
                            .catch(rethrowInRender)];
                case 7: return [2 /*return*/];
            }
        });
    }); }, [props.navigate, props.recipe, userContext]);
    var handleConsumeError = useCallback(function (err) {
        if (STGeneralError.isThisError(err)) {
            return SuperTokens.getInstanceOrThrow().redirectToAuth({
                navigate: props.navigate,
                queryParams: {
                    error: "custom",
                    message: err.message,
                },
                redirectBack: false,
                userContext: userContext,
            });
        }
        else {
            return SuperTokens.getInstanceOrThrow().redirectToAuth({
                navigate: props.navigate,
                queryParams: {
                    error: "signin",
                },
                redirectBack: false,
                userContext: userContext,
            });
        }
    }, [props.navigate, userContext]);
    useOnMountAPICall(consumeCodeAtMount, handleConsumeResp, handleConsumeError);
    var recipeComponentOverrides = props.useComponentOverrides();
    var childProps = {
        recipeImplementation: props.recipe.webJSRecipe,
        config: props.recipe.config,
        requireUserInteraction: requireUserInteraction,
        consumeCode: function () { return __awaiter(void 0, void 0, void 0, function () {
            var payloadBeforeCall, consumeResp, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 7, , 8]);
                        payloadBeforeCall = void 0;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, Session.getInstanceOrThrow().getAccessTokenPayloadSecurely({
                                userContext: userContext,
                            })];
                    case 2:
                        payloadBeforeCall = _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        _b.sent();
                        // If getAccessTokenPayloadSecurely threw, that generally means we have no active session
                        payloadBeforeCall = undefined;
                        return [3 /*break*/, 4];
                    case 4: return [4 /*yield*/, props.recipe.webJSRecipe.consumeCode({
                            userContext: userContext,
                        })];
                    case 5:
                        consumeResp = _b.sent();
                        return [4 /*yield*/, handleConsumeResp({ response: consumeResp, payloadBeforeCall: payloadBeforeCall })];
                    case 6:
                        _b.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        err_1 = _b.sent();
                        void handleConsumeError(err_1);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        }); },
    };
    return (jsx(ComponentOverrideContext.Provider, __assign({ value: recipeComponentOverrides }, { children: jsx(FeatureWrapper, __assign({ useShadowDom: SuperTokens.getInstanceOrThrow().useShadowDom, defaultStore: defaultTranslationsPasswordless }, { children: jsxs(Fragment, { children: [props.children === undefined && jsx(LinkClickedScreen$1, __assign({}, childProps)), props.children &&
                        React__default.Children.map(props.children, function (child) {
                            if (React__default.isValidElement(child)) {
                                return React__default.cloneElement(child, childProps);
                            }
                            return child;
                        })] }) })) })));
};

export { LinkClickedScreen as default };
