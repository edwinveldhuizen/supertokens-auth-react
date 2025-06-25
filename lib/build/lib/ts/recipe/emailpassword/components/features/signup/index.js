import { __assign, __awaiter, __generator } from "../../../../../../../_virtual/_tslib.js";
import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Fragment, useMemo, useCallback } from "react";
import STGeneralError from "supertokens-web-js/utils/error";
import AuthComponentWrapper from "../../../../../components/authCompWrapper.js";
import { useUserContext } from "../../../../../usercontext/index.js";
import { useRethrowInRender, getTenantIdFromQueryParams } from "../../../../../utils.js";
import { EmailVerificationClaim } from "../../../../../../../emailverification.js";
import EmailVerification from "../../../../emailverification/recipe.js";
import { getInvalidClaimsFromResponse } from "../../../../../../../session.js";
import Session from "../../../../session/recipe.js";
import useSessionContext from "../../../../session/useSessionContext.js";
import SignUpTheme from "../../themes/signUp/index.js";

function useChildProps(recipe, onAuthSuccess, error, onError, clearError, userContext, navigate) {
    var _this = this;
    var session = useSessionContext();
    var recipeImplementation = useMemo(
        function () {
            return recipe && getModifiedRecipeImplementation(recipe.webJSRecipe);
        },
        [recipe]
    );
    var rethrowInRender = useRethrowInRender();
    var onSignUpSuccess = useCallback(
        function (result) {
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
                                    createdNewUser: result.user.loginMethods.length === 1,
                                    isNewRecipeUser: true,
                                    newSessionCreated:
                                        session.loading ||
                                        !session.doesSessionExist ||
                                        (payloadAfterCall !== undefined &&
                                            session.accessTokenPayload.sessionHandle !==
                                                payloadAfterCall.sessionHandle),
                                    recipeId: recipe.recipeID,
                                }).catch(rethrowInRender),
                            ];
                    }
                });
            });
        },
        [recipe, userContext, navigate]
    );
    return useMemo(
        function () {
            var signInAndUpFeature = recipe.config.signInAndUpFeature;
            var signUpFeature = signInAndUpFeature.signUpForm;
            return {
                recipeImplementation: recipeImplementation,
                config: recipe.config,
                styleFromInit: signUpFeature.style,
                formFields: getThemeSignUpFeatureFormFields(signUpFeature.formFields, recipe, userContext),
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
                onSuccess: onSignUpSuccess,
                userContext: userContext,
                error: error,
                onError: onError,
                clearError: clearError,
            };
        },
        [recipe, error, userContext]
    );
}
var SignUpFeature = function (props) {
    var userContext = useUserContext();
    if (props.userContext !== undefined) {
        userContext = props.userContext;
    }
    var childProps = useChildProps(
        props.recipe,
        props.onAuthSuccess,
        props.error,
        props.onError,
        props.clearError,
        userContext,
        props.navigate
    );
    var recipeComponentOverrides = props.useComponentOverrides();
    return jsx(
        AuthComponentWrapper,
        __assign(
            { recipeComponentOverrides: recipeComponentOverrides },
            {
                children: jsxs(Fragment, {
                    children: [
                        props.children === undefined && jsx(SignUpTheme, __assign({}, childProps)),
                        props.children &&
                            React.Children.map(props.children, function (child) {
                                if (React.isValidElement(child)) {
                                    return React.cloneElement(child, __assign({}, childProps));
                                }
                                return child;
                            }),
                    ],
                }),
            }
        )
    );
};
var getModifiedRecipeImplementation = function (origImpl) {
    return __assign(__assign({}, origImpl), {
        signIn: function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                origImpl.signIn(
                                    __assign(__assign({}, input), { shouldTryLinkingWithSessionUser: false })
                                ),
                            ];
                        case 1:
                            response = _a.sent();
                            return [2 /*return*/, response];
                    }
                });
            });
        },
        signUp: function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [
                                4 /*yield*/,
                                origImpl.signUp(
                                    __assign(__assign({}, input), { shouldTryLinkingWithSessionUser: false })
                                ),
                            ];
                        case 1:
                            response = _a.sent();
                            return [2 /*return*/, response];
                    }
                });
            });
        },
    });
};
function getThemeSignUpFeatureFormFields(formFields, recipe, userContext) {
    var _this = this;
    var emailPasswordOnly = formFields.length === 2;
    return formFields.map(function (field) {
        return __assign(__assign({}, field), {
            showIsRequired: (function () {
                // If email and password only, do not show required indicator (*).
                if (emailPasswordOnly) {
                    return false;
                }
                // Otherwise, show for all non optional fields (including email and password).
                return field.optional === false;
            })(),
            validate: (function () {
                // If field is not email, return field validate unchanged.
                if (field.id !== "email") {
                    return field.validate;
                }
                // Otherwise, if email, use syntax validate method and check if email exists.
                return function (value) {
                    return __awaiter(_this, void 0, void 0, function () {
                        var error, emailExists, err_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    return [4 /*yield*/, field.validate(value)];
                                case 1:
                                    error = _a.sent();
                                    if (error !== undefined) {
                                        return [2 /*return*/, error];
                                    }
                                    if (typeof value !== "string") {
                                        return [2 /*return*/, "GENERAL_ERROR_EMAIL_NON_STRING"];
                                    }
                                    _a.label = 2;
                                case 2:
                                    _a.trys.push([2, 4, , 5]);
                                    return [
                                        4 /*yield*/,
                                        recipe.webJSRecipe.doesEmailExist({
                                            email: value,
                                            userContext: userContext,
                                        }),
                                    ];
                                case 3:
                                    emailExists = _a.sent().doesExist;
                                    if (emailExists) {
                                        return [2 /*return*/, "EMAIL_PASSWORD_EMAIL_ALREADY_EXISTS"];
                                    }
                                    return [3 /*break*/, 5];
                                case 4:
                                    err_1 = _a.sent();
                                    if (STGeneralError.isThisError(err_1)) {
                                        return [2 /*return*/, err_1.message];
                                    }
                                    return [3 /*break*/, 5];
                                case 5:
                                    return [2 /*return*/, undefined];
                            }
                        });
                    });
                };
            })(),
        });
    });
}

export { SignUpFeature, SignUpFeature as default, useChildProps };
