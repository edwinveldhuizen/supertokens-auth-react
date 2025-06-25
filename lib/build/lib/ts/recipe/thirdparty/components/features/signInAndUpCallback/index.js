import { __awaiter, __generator, __assign } from "../../../../../../../_virtual/_tslib.js";
import { jsx, jsxs } from "react/jsx-runtime";
import { useCallback, Fragment } from "react";
import STGeneralError from "supertokens-web-js/utils/error";
import { ComponentOverrideContext } from "../../../../../components/componentOverride/componentOverrideContext.js";
import FeatureWrapper from "../../../../../components/featureWrapper.js";
import SuperTokens from "../../../../../superTokens.js";
import { useUserContext } from "../../../../../usercontext/index.js";
import { useRethrowInRender, getTenantIdFromQueryParams, useOnMountAPICall } from "../../../../../utils.js";
import { EmailVerificationClaim } from "../../../../../../../emailverification.js";
import EmailVerification from "../../../../emailverification/recipe.js";
import OAuth2Provider from "../../../../oauth2provider/recipe.js";
import { getInvalidClaimsFromResponse } from "../../../../../../../session.js";
import Session from "../../../../session/recipe.js";
import { SignInAndUpCallbackTheme } from "../../themes/signInAndUpCallback/index.js";
import { defaultTranslationsThirdParty } from "../../themes/translations.js";

var SignInAndUpCallback = function (props) {
    var userContext = useUserContext();
    if (props.userContext !== undefined) {
        userContext = props.userContext;
    }
    var rethrowInRender = useRethrowInRender();
    var verifyCode = useCallback(
        function () {
            return __awaiter(void 0, void 0, void 0, function () {
                var payloadBeforeCall;
                var _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _c.trys.push([0, 2, , 3]);
                            return [
                                4 /*yield*/,
                                Session.getInstanceOrThrow().getAccessTokenPayloadSecurely({
                                    userContext: userContext,
                                }),
                            ];
                        case 1:
                            payloadBeforeCall = _c.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            _c.sent();
                            // If getAccessTokenPayloadSecurely threw, that generally means we have no active session
                            payloadBeforeCall = undefined;
                            return [3 /*break*/, 3];
                        case 3:
                            _b = {
                                payloadBeforeCall: payloadBeforeCall,
                            };
                            return [
                                4 /*yield*/,
                                props.recipe.webJSRecipe.signInAndUp({
                                    userContext: userContext,
                                }),
                            ];
                        case 4:
                            return [2 /*return*/, ((_b.response = _c.sent()), _b)];
                    }
                });
            });
        },
        [props.recipe, userContext]
    );
    var handleVerifyResponse = useCallback(
        function (_a) {
            var response = _a.response,
                payloadBeforeCall = _a.payloadBeforeCall;
            return __awaiter(void 0, void 0, void 0, function () {
                var payloadAfterCall,
                    stateResponse,
                    redirectToPath,
                    loginChallenge,
                    ctx,
                    oauth2Recipe,
                    frontendRedirectTo,
                    e_1;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            if (response.status === "NO_EMAIL_GIVEN_BY_PROVIDER") {
                                return [
                                    2 /*return*/,
                                    SuperTokens.getInstanceOrThrow().redirectToAuth({
                                        navigate: props.navigate,
                                        queryParams: {
                                            error: "no_email_present",
                                        },
                                        redirectBack: false,
                                        userContext: userContext,
                                    }),
                                ];
                            }
                            if (response.status === "SIGN_IN_UP_NOT_ALLOWED") {
                                return [
                                    2 /*return*/,
                                    SuperTokens.getInstanceOrThrow().redirectToAuth({
                                        navigate: props.navigate,
                                        queryParams: {
                                            error: response.status,
                                            message: response.reason,
                                        },
                                        redirectBack: false,
                                        userContext: userContext,
                                    }),
                                ];
                            }
                            if (!(response.status === "OK")) return [3 /*break*/, 10];
                            payloadAfterCall = void 0;
                            _c.label = 1;
                        case 1:
                            _c.trys.push([1, 3, , 4]);
                            return [
                                4 /*yield*/,
                                Session.getInstanceOrThrow().getAccessTokenPayloadSecurely({
                                    userContext: userContext,
                                }),
                            ];
                        case 2:
                            payloadAfterCall = _c.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            _c.sent();
                            payloadAfterCall = undefined;
                            return [3 /*break*/, 4];
                        case 4:
                            stateResponse = props.recipe.webJSRecipe.getStateAndOtherInfoFromStorage({
                                userContext: userContext,
                            });
                            redirectToPath = stateResponse === undefined ? undefined : stateResponse.redirectToPath;
                            loginChallenge =
                                stateResponse === null || stateResponse === void 0
                                    ? void 0
                                    : stateResponse.oauth2LoginChallenge;
                            ctx = {
                                createdNewUser:
                                    response.createdNewRecipeUser && response.user.loginMethods.length === 1,
                                isNewRecipeUser: response.createdNewRecipeUser,
                                newSessionCreated:
                                    payloadAfterCall !== undefined &&
                                    (payloadBeforeCall === undefined ||
                                        payloadBeforeCall.sessionHandle !== payloadAfterCall.sessionHandle),
                                recipeId: props.recipe.recipeID,
                                tenantIdFromQueryParams: getTenantIdFromQueryParams(),
                            };
                            oauth2Recipe = OAuth2Provider.getInstance();
                            if (!(loginChallenge !== undefined && oauth2Recipe !== undefined)) return [3 /*break*/, 9];
                            _c.label = 5;
                        case 5:
                            _c.trys.push([5, 7, , 8]);
                            return [
                                4 /*yield*/,
                                oauth2Recipe.webJSRecipe.getRedirectURLToContinueOAuthFlow({
                                    loginChallenge: loginChallenge,
                                    userContext: userContext,
                                }),
                            ];
                        case 6:
                            frontendRedirectTo = _c.sent().frontendRedirectTo;
                            return [
                                2 /*return*/,
                                Session.getInstanceOrThrow().validateGlobalClaimsAndHandleSuccessRedirection(
                                    __assign(__assign({}, ctx), {
                                        action: "SUCCESS_OAUTH2",
                                        frontendRedirectTo: frontendRedirectTo,
                                    }),
                                    props.recipe.recipeID,
                                    redirectToPath,
                                    userContext,
                                    props.navigate
                                ),
                            ];
                        case 7:
                            e_1 = _c.sent();
                            rethrowInRender(e_1);
                            return [3 /*break*/, 8];
                        case 8:
                            return [3 /*break*/, 10];
                        case 9:
                            return [
                                2 /*return*/,
                                Session.getInstanceOrThrow()
                                    .validateGlobalClaimsAndHandleSuccessRedirection(
                                        __assign(__assign({}, ctx), { action: "SUCCESS" }),
                                        props.recipe.recipeID,
                                        redirectToPath,
                                        userContext,
                                        props.navigate
                                    )
                                    .catch(rethrowInRender),
                            ];
                        case 10:
                            return [2 /*return*/];
                    }
                });
            });
        },
        [props.recipe, props.navigate, userContext]
    );
    var handleError = useCallback(
        function (err) {
            return __awaiter(void 0, void 0, void 0, function () {
                var invalidClaims, evInstance;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (
                                !(
                                    "status" in err &&
                                    err.status === Session.getInstanceOrThrow().config.invalidClaimStatusCode
                                )
                            )
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
                                    props.navigate,
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
                            if (STGeneralError.isThisError(err)) {
                                return [
                                    2 /*return*/,
                                    SuperTokens.getInstanceOrThrow().redirectToAuth({
                                        navigate: props.navigate,
                                        queryParams: {
                                            error: "custom",
                                            message: err.message,
                                        },
                                        redirectBack: false,
                                        userContext: userContext,
                                    }),
                                ];
                            }
                            return [
                                2 /*return*/,
                                SuperTokens.getInstanceOrThrow().redirectToAuth({
                                    navigate: props.navigate,
                                    queryParams: {
                                        error: "signin",
                                    },
                                    redirectBack: false,
                                    userContext: userContext,
                                }),
                            ];
                    }
                });
            });
        },
        [props.navigate, userContext]
    );
    useOnMountAPICall(verifyCode, handleVerifyResponse, handleError);
    var recipeComponentOverrides = props.useComponentOverrides();
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
                            defaultStore: defaultTranslationsThirdParty,
                        },
                        {
                            children: jsxs(Fragment, {
                                children: [
                                    props.children === undefined &&
                                        jsx(SignInAndUpCallbackTheme, { config: props.recipe.config }),
                                    props.children,
                                ],
                            }),
                        }
                    )
                ),
            }
        )
    );
};

export { SignInAndUpCallback as default };
