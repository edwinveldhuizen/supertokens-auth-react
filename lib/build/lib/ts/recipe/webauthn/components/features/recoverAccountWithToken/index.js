import { __awaiter, __generator, __assign } from "../../../../../../../_virtual/_tslib.js";
import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { useState, useCallback } from "react";
import { redirectToAuth } from "../../../../../../../index.js";
import { ComponentOverrideContext } from "../../../../../components/componentOverride/componentOverrideContext.js";
import FeatureWrapper from "../../../../../components/featureWrapper.js";
import SuperTokens from "../../../../../superTokens.js";
import { getQueryParams, useOnMountAPICall, handleCallAPI } from "../../../../../utils.js";
import { RecoverAccountScreen } from "../../../types.js";
import PasskeyRecoverAccountWithTokenTheme from "../../themes/recoverAccountWithToken/index.js";
import { defaultTranslationsWebauthn } from "../../themes/translations.js";

var RecoverAccountUsingToken = function (props) {
    var token = getQueryParams("token");
    var userContext;
    if (props.userContext !== undefined) {
        userContext = props.userContext;
    }
    var _a = React.useState(),
        error = _a[0],
        setError = _a[1];
    var _b = useState(null),
        errorMessageLabel = _b[0],
        setErrorMessageLabel = _b[1];
    var _c = useState(null),
        preloadedRegisterOptions = _c[0],
        setPreloadedRegisterOptions = _c[1];
    var _d = useState(RecoverAccountScreen.ContinueWithPasskey),
        activeScreen = _d[0],
        setActiveScreen = _d[1];
    var _e = useState(false),
        isLoading = _e[0],
        setLoading = _e[1];
    // Get the reset options as soon as the page loads and afterwards use the token
    // with the options.
    var fetchAndStoreRegisterOptions = useCallback(
        function () {
            return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(token === null)) return [3 /*break*/, 2];
                            return [4 /*yield*/, redirectToAuth()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, { status: "MISSING_TOKEN" }];
                        case 2:
                            return [
                                2 /*return*/,
                                props.recipe.webJSRecipe.getRegisterOptions({
                                    userContext: props.userContext,
                                    recoverAccountToken: token,
                                }),
                            ];
                    }
                });
            });
        },
        [props.recipe.webJSRecipe, props.userContext, token]
    );
    useOnMountAPICall(
        fetchAndStoreRegisterOptions,
        function (registerOptions) {
            return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (registerOptions.status === "MISSING_TOKEN") {
                        return [2 /*return*/];
                    }
                    if (registerOptions.status !== "OK") {
                        switch (registerOptions.status) {
                            case "RECOVER_ACCOUNT_TOKEN_INVALID_ERROR":
                                setErrorMessageLabel("WEBAUTHN_ACCOUNT_RECOVERY_TOKEN_INVALID_ERROR");
                                break;
                            case "INVALID_EMAIL_ERROR":
                                setErrorMessageLabel("WEBAUTHN_ACCOUNT_RECOVERY_INVALID_EMAIL_ERROR");
                                break;
                            case "INVALID_OPTIONS_ERROR":
                                setErrorMessageLabel("WEBAUTHN_ACCOUNT_RECOVERY_INVALID_GENERATED_OPTIONS_ERROR");
                                break;
                            default:
                                throw new Error("Should never come here");
                        }
                        return [2 /*return*/];
                    }
                    setPreloadedRegisterOptions(registerOptions);
                    return [2 /*return*/];
                });
            });
        },
        function (err) {
            // This will likely be a fetch error.
            console.error("error", err);
            setErrorMessageLabel("WEBAUTHN_ACCOUNT_RECOVERY_FETCH_ERROR");
        }
    );
    var callAPI = useCallback(
        function () {
            return __awaiter(void 0, void 0, void 0, function () {
                var registerOptions, _a, registerCredentialResponse, recoverAccountResponse;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            // We will do the following things in the order when the user clicks on the continue
                            // button.
                            // 1. Check if the fetched register options have expired
                            // 2. If not expired, we can continue and use the values to register the user.
                            // 3. If expired, we will get new registerOptions and register the user.
                            // 4. If registration fails with a token expiry error, we should following 3rd step.
                            if (token === null) {
                                // The token should not be null because while fetching the register options
                                // we already checked for null and redirected to the sign in page if it is null.
                                throw new Error("Should never come here");
                            }
                            if (
                                !(
                                    preloadedRegisterOptions !== null &&
                                    new Date(preloadedRegisterOptions.expiresAt) > new Date()
                                )
                            )
                                return [3 /*break*/, 1];
                            _a = preloadedRegisterOptions;
                            return [3 /*break*/, 3];
                        case 1:
                            return [
                                4 /*yield*/,
                                props.recipe.webJSRecipe.getRegisterOptions({
                                    userContext: props.userContext,
                                    recoverAccountToken: token,
                                }),
                            ];
                        case 2:
                            _a = _b.sent();
                            _b.label = 3;
                        case 3:
                            registerOptions = _a;
                            if (registerOptions.status !== "OK") {
                                switch (registerOptions.status) {
                                    case "RECOVER_ACCOUNT_TOKEN_INVALID_ERROR":
                                        setErrorMessageLabel("WEBAUTHN_ACCOUNT_RECOVERY_TOKEN_INVALID_ERROR");
                                        break;
                                    case "INVALID_EMAIL_ERROR":
                                        setErrorMessageLabel("WEBAUTHN_ACCOUNT_RECOVERY_INVALID_EMAIL_ERROR");
                                        break;
                                    case "INVALID_OPTIONS_ERROR":
                                        setErrorMessageLabel(
                                            "WEBAUTHN_ACCOUNT_RECOVERY_INVALID_GENERATED_OPTIONS_ERROR"
                                        );
                                        break;
                                    default:
                                        throw new Error("Should never come here");
                                }
                                return [2 /*return*/];
                            }
                            return [
                                4 /*yield*/,
                                props.recipe.webJSRecipe.registerCredential({
                                    registrationOptions: registerOptions,
                                    userContext: props.userContext,
                                }),
                            ];
                        case 4:
                            registerCredentialResponse = _b.sent();
                            if (registerCredentialResponse.status !== "OK") {
                                return [2 /*return*/, registerCredentialResponse];
                            }
                            return [
                                4 /*yield*/,
                                props.recipe.webJSRecipe.recoverAccount({
                                    token: token,
                                    webauthnGeneratedOptionsId: registerOptions.webauthnGeneratedOptionsId,
                                    credential: registerCredentialResponse.registrationResponse,
                                    userContext: props.userContext,
                                }),
                            ];
                        case 5:
                            recoverAccountResponse = _b.sent();
                            return [2 /*return*/, recoverAccountResponse];
                    }
                });
            });
        },
        [props, preloadedRegisterOptions, token, fetchAndStoreRegisterOptions]
    );
    var onContinueClick = useCallback(
        function () {
            return __awaiter(void 0, void 0, void 0, function () {
                var fieldUpdates, _a, result, generalError, fetchError, e_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            fieldUpdates = [];
                            setLoading(true);
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, 4, 5]);
                            return [
                                4 /*yield*/,
                                handleCallAPI({
                                    apiFields: [],
                                    fieldUpdates: fieldUpdates,
                                    callAPI: callAPI,
                                }),
                            ];
                        case 2:
                            (_a = _b.sent()),
                                (result = _a.result),
                                (generalError = _a.generalError),
                                (fetchError = _a.fetchError);
                            if (generalError !== undefined || fetchError !== undefined) {
                                setErrorMessageLabel("WEBAUTHN_ACCOUNT_RECOVERY_GENERAL_ERROR");
                            } else {
                                // If successful
                                if (result.status === "OK") {
                                    setLoading(false);
                                    setActiveScreen(RecoverAccountScreen.Success);
                                } else {
                                    switch (result.status) {
                                        case "RECOVER_ACCOUNT_TOKEN_INVALID_ERROR":
                                            setErrorMessageLabel("WEBAUTHN_ACCOUNT_RECOVERY_TOKEN_INVALID_ERROR");
                                            break;
                                        case "GENERAL_ERROR":
                                            setErrorMessageLabel("WEBAUTHN_ACCOUNT_RECOVERY_GENERAL_ERROR");
                                            break;
                                        case "INVALID_OPTIONS_ERROR":
                                            setErrorMessageLabel(
                                                "WEBAUTHN_ACCOUNT_RECOVERY_INVALID_GENERATED_OPTIONS_ERROR"
                                            );
                                            break;
                                        case "INVALID_CREDENTIALS_ERROR":
                                            setErrorMessageLabel("WEBAUTHN_ACCOUNT_RECOVERY_INVALID_CREDENTIALS_ERROR");
                                            break;
                                        case "OPTIONS_NOT_FOUND_ERROR":
                                            setErrorMessageLabel(
                                                "WEBAUTHN_ACCOUNT_RECOVERY_GENERATED_OPTIONS_NOT_FOUND_ERROR"
                                            );
                                            break;
                                        case "INVALID_AUTHENTICATOR_ERROR":
                                            setErrorMessageLabel(
                                                "WEBAUTHN_ACCOUNT_RECOVERY_INVALID_AUTHENTICATOR_ERROR"
                                            );
                                            break;
                                        case "WEBAUTHN_NOT_SUPPORTED":
                                            setErrorMessageLabel("WEBAUTHN_NOT_SUPPORTED_ERROR");
                                            break;
                                        default:
                                            throw new Error("Should never come here");
                                    }
                                    return [2 /*return*/];
                                }
                            }
                            return [3 /*break*/, 5];
                        case 3:
                            e_1 = _b.sent();
                            console.error("error", e_1);
                            setErrorMessageLabel("WEBAUTHN_ACCOUNT_RECOVERY_GENERAL_ERROR");
                            return [3 /*break*/, 5];
                        case 4:
                            setLoading(false);
                            return [7 /*endfinally*/];
                        case 5:
                            return [2 /*return*/];
                    }
                });
            });
        },
        [callAPI]
    );
    var childProps = {
        config: props.recipe.config,
        error: error,
        onError: function (error) {
            return setError(error);
        },
        clearError: function () {
            return setError(undefined);
        },
        recipeImplementation: props.recipe.webJSRecipe,
        token: token,
        useComponentOverride: props.useComponentOverrides,
        userContext: userContext,
        registerOptions: preloadedRegisterOptions,
        errorMessageLabel: errorMessageLabel,
        isLoading: isLoading,
        activeScreen: activeScreen,
        onContinueClick: onContinueClick,
    };
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
                            defaultStore: defaultTranslationsWebauthn,
                        },
                        {
                            children: jsxs(React.Fragment, {
                                children: [
                                    props.children === undefined &&
                                        jsx(PasskeyRecoverAccountWithTokenTheme, __assign({}, childProps)),
                                    props.children &&
                                        React.Children.map(props.children, function (child) {
                                            if (React.isValidElement(child)) {
                                                return React.cloneElement(child, childProps);
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

export { RecoverAccountUsingToken };
