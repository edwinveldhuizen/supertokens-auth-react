import { __assign, __awaiter, __generator } from "../../../../../../../_virtual/_tslib.js";
import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Fragment, useMemo } from "react";
import STGeneralError from "supertokens-web-js/lib/build/error";
import AuthComponentWrapper from "../../../../../components/authCompWrapper.js";
import { useUserContext } from "../../../../../usercontext/index.js";
import {
    useRethrowInRender,
    validateForm,
    getTenantIdFromQueryParams,
    getRedirectToPathFromURL,
} from "../../../../../utils.js";
import EmailPassword from "../../../../emailpassword/recipe.js";
import { EmailVerificationClaim } from "../../../../../../../emailverification.js";
import EmailVerification from "../../../../emailverification/recipe.js";
import "../../../../../../../multifactorauth.js";
import { getInvalidClaimsFromResponse } from "../../../../../../../session.js";
import Session from "../../../../session/recipe.js";
import useSessionContext from "../../../../session/useSessionContext.js";
import { defaultPhoneNumberValidator } from "../../../defaultPhoneNumberValidator.js";
import { getPhoneNumberUtils } from "../../../phoneNumberUtils.js";
import SignInUpThemeWrapper from "../../themes/signInUpEPCombo/index.js";
import { FactorIds } from "../../../../multifactorauth/types.js";

function useChildProps(
    recipe,
    factorIds,
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
            return recipe && getModifiedRecipeImplementation(recipe.webJSRecipe, recipe.config, rebuildAuthPage);
        },
        [recipe]
    );
    var _a = React.useState(!recipe.config.signInUpFeature.defaultToEmail),
        isPhoneNumber = _a[0],
        setIsPhoneNumber = _a[1];
    var _b = React.useState(false),
        showPasswordField = _b[0],
        setShowPasswordField = _b[1];
    var _c = React.useState(false),
        showContinueWithPasswordlessLink = _c[0],
        setShowContinueWithPasswordlessLink = _c[1];
    var rethrowInRender = useRethrowInRender();
    return useMemo(
        function () {
            var _a;
            var isPasswordlessEmailEnabled = [FactorIds.LINK_EMAIL, FactorIds.OTP_EMAIL].some(function (id) {
                return factorIds.includes(id);
            });
            return {
                isPhoneNumber: isPhoneNumber,
                setIsPhoneNumber: function (isPhone) {
                    if (isPhone && showPasswordField) {
                        setShowPasswordField(false);
                        setShowContinueWithPasswordlessLink(false);
                    }
                    setIsPhoneNumber(isPhone);
                },
                userContext: userContext,
                showPasswordField: showPasswordField,
                showContinueWithPasswordlessLink: showContinueWithPasswordlessLink,
                onContactInfoSubmit: function (contactInfo) {
                    return __awaiter(_this, void 0, void 0, function () {
                        var createRes, email, _a, epExists, pwlessExists, createRes;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    if (!isPhoneNumber) return [3 /*break*/, 2];
                                    return [
                                        4 /*yield*/,
                                        recipeImplementation.createCode({
                                            phoneNumber: contactInfo,
                                            shouldTryLinkingWithSessionUser: false,
                                            userContext: userContext,
                                        }),
                                    ];
                                case 1:
                                    createRes = _b.sent();
                                    if (createRes.status === "SIGN_IN_UP_NOT_ALLOWED") {
                                        throw new STGeneralError(createRes.reason);
                                    } else {
                                        clearError();
                                        return [2 /*return*/, createRes];
                                    }
                                case 2:
                                    email = contactInfo;
                                    if (recipe.config.contactMethod === "PHONE" || !isPasswordlessEmailEnabled) {
                                        setShowPasswordField(true);
                                        return [2 /*return*/, { status: "OK" }];
                                    }
                                    return [
                                        4 /*yield*/,
                                        Promise.all([
                                            EmailPassword.getInstanceOrThrow().webJSRecipe.doesEmailExist({
                                                email: email,
                                                userContext: userContext,
                                            }),
                                            recipeImplementation.doesEmailExist({
                                                email: email,
                                                userContext: userContext,
                                            }),
                                        ]),
                                    ];
                                case 3:
                                    (_a = _b.sent()), (epExists = _a[0]), (pwlessExists = _a[1]);
                                    if (!epExists.doesExist) return [3 /*break*/, 4];
                                    // EP exists
                                    setShowPasswordField(true);
                                    if (pwlessExists.doesExist) {
                                        // Both exist
                                        setShowContinueWithPasswordlessLink(true);
                                    }
                                    return [2 /*return*/, { status: "OK" }];
                                case 4:
                                    if (!pwlessExists.doesExist) return [3 /*break*/, 6];
                                    return [
                                        4 /*yield*/,
                                        recipeImplementation.createCode({
                                            email: email,
                                            shouldTryLinkingWithSessionUser: false,
                                            userContext: userContext,
                                        }),
                                    ];
                                case 5:
                                    createRes = _b.sent();
                                    if (createRes.status === "SIGN_IN_UP_NOT_ALLOWED") {
                                        throw new STGeneralError(createRes.reason);
                                    } else {
                                        clearError();
                                        return [2 /*return*/, createRes];
                                    }
                                case 6:
                                    setShowPasswordField(true);
                                    if (isPasswordlessEmailEnabled) {
                                        setShowContinueWithPasswordlessLink(true);
                                    }
                                    return [2 /*return*/, { status: "OK" }];
                                case 7:
                                    return [2 /*return*/];
                            }
                        });
                    });
                },
                onPasswordSubmit: function (formFields) {
                    return __awaiter(_this, void 0, void 0, function () {
                        var validationErrors, response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    return [
                                        4 /*yield*/,
                                        validateForm(
                                            formFields,
                                            EmailPassword.getInstanceOrThrow().config.signInAndUpFeature.signInForm
                                                .formFields
                                        ),
                                    ];
                                case 1:
                                    validationErrors = _a.sent();
                                    if (validationErrors.length > 0) {
                                        return [
                                            2 /*return*/,
                                            {
                                                status: "FIELD_ERROR",
                                                formFields: validationErrors,
                                            },
                                        ];
                                    }
                                    return [
                                        4 /*yield*/,
                                        EmailPassword.getInstanceOrThrow().webJSRecipe.signIn({
                                            formFields: formFields,
                                            shouldTryLinkingWithSessionUser: false,
                                            userContext: userContext,
                                        }),
                                    ];
                                case 2:
                                    response = _a.sent();
                                    if (response.status === "WRONG_CREDENTIALS_ERROR") {
                                        throw new STGeneralError("EMAIL_PASSWORD_SIGN_IN_WRONG_CREDENTIALS_ERROR");
                                    } else if (response.status === "SIGN_IN_NOT_ALLOWED") {
                                        throw new STGeneralError(response.reason);
                                    } else {
                                        return [
                                            2 /*return*/,
                                            __assign(__assign({}, response), { isEmailPassword: true }),
                                        ];
                                    }
                            }
                        });
                    });
                },
                onContinueWithPasswordlessClick: function (contactInfo) {
                    return __awaiter(_this, void 0, void 0, function () {
                        var createInfo, createRes;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    createInfo = isPhoneNumber ? { phoneNumber: contactInfo } : { email: contactInfo };
                                    return [
                                        4 /*yield*/,
                                        recipeImplementation.createCode(
                                            __assign(__assign({}, createInfo), {
                                                shouldTryLinkingWithSessionUser: false,
                                                userContext: userContext,
                                            })
                                        ),
                                    ];
                                case 1:
                                    createRes = _a.sent();
                                    if (createRes.status !== "OK") {
                                        onError(createRes.reason);
                                    } else {
                                        clearError();
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    });
                },
                onSuccess: function (result) {
                    return __awaiter(_this, void 0, void 0, function () {
                        var payloadAfterCall;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    if (!result.isEmailPassword) {
                                        return [2 /*return*/];
                                    }
                                    _b.label = 1;
                                case 1:
                                    _b.trys.push([1, 3, , 4]);
                                    return [
                                        4 /*yield*/,
                                        Session.getInstanceOrThrow().getAccessTokenPayloadSecurely({
                                            userContext: userContext,
                                        }),
                                    ];
                                case 2:
                                    payloadAfterCall = _b.sent();
                                    return [3 /*break*/, 4];
                                case 3:
                                    _b.sent();
                                    payloadAfterCall = undefined;
                                    return [3 /*break*/, 4];
                                case 4:
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
                                            recipeId: result.isEmailPassword
                                                ? EmailPassword.RECIPE_ID
                                                : recipe.recipeID,
                                        }).catch(rethrowInRender),
                                    ];
                            }
                        });
                    });
                },
                error: error,
                onError: onError,
                clearError: clearError,
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
                factorIds: factorIds,
                recipeImplementation: recipeImplementation,
                config: recipe.config,
                validatePhoneNumber:
                    (_a = recipe.config.validatePhoneNumber) !== null && _a !== void 0
                        ? _a
                        : defaultPhoneNumberValidator,
                navigate: navigate,
            };
        },
        [
            error,
            factorIds,
            userContext,
            recipeImplementation,
            isPhoneNumber,
            showPasswordField,
            showContinueWithPasswordlessLink,
            navigate,
        ]
    );
}
var SignInUpEPComboFeatureInner = function (props) {
    var userContext = useUserContext();
    if (props.userContext !== undefined) {
        userContext = props.userContext;
    }
    var childProps = useChildProps(
        props.recipe,
        props.factorIds,
        props.onAuthSuccess,
        props.error,
        props.onError,
        props.clearError,
        props.rebuildAuthPage,
        userContext,
        props.navigate
    );
    return jsxs(Fragment, {
        children: [
            props.children === undefined && jsx(SignInUpThemeWrapper, __assign({}, childProps)),
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
var SignInUpEPComboFeature = function (props) {
    var recipeComponentOverrides = props.useComponentOverrides();
    return jsx(
        AuthComponentWrapper,
        __assign(
            { recipeComponentOverrides: recipeComponentOverrides },
            { children: jsx(SignInUpEPComboFeatureInner, __assign({}, props)) }
        )
    );
};
function getModifiedRecipeImplementation(originalImpl, config, rebuildAuthPage) {
    var _this = this;
    return __assign(__assign({}, originalImpl), {
        createCode: function (input) {
            return __awaiter(_this, void 0, void 0, function () {
                var contactInfo, phoneNumberUtils, contactMethod, additionalAttemptInfo, res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            return [4 /*yield*/, getPhoneNumberUtils()];
                        case 1:
                            phoneNumberUtils = _a.sent();
                            if ("email" in input) {
                                contactInfo = input.email;
                            } else {
                                contactInfo = phoneNumberUtils.formatNumber(
                                    input.phoneNumber,
                                    config.signInUpFeature.defaultCountry || "",
                                    phoneNumberUtils.numberFormat.E164
                                );
                            }
                            contactMethod = "email" in input ? "EMAIL" : "PHONE";
                            additionalAttemptInfo = {
                                lastResend: Date.now(),
                                contactMethod: contactMethod,
                                contactInfo: contactInfo,
                                redirectToPath: getRedirectToPathFromURL(),
                            };
                            return [
                                4 /*yield*/,
                                originalImpl.createCode(
                                    __assign(__assign({}, input), {
                                        shouldTryLinkingWithSessionUser: false,
                                        userContext: __assign(__assign({}, input.userContext), {
                                            additionalAttemptInfo: additionalAttemptInfo,
                                        }),
                                    })
                                ),
                            ];
                        case 2:
                            res = _a.sent();
                            if (res.status === "OK") {
                                rebuildAuthPage();
                            }
                            return [2 /*return*/, res];
                    }
                });
            });
        },
    });
}

export { SignInUpEPComboFeature, SignInUpEPComboFeature as default, useChildProps };
