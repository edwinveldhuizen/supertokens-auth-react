import { __awaiter, __generator, __assign } from '../../../../../../../_virtual/_tslib.js';
import { jsx, jsxs } from 'react/jsx-runtime';
import * as React from 'react';
import SuperTokens from '../../../../../superTokens.js';
import { useUserContext } from '../../../../../usercontext/index.js';
import UserContextWrapper from '../../../../../usercontext/userContextWrapper.js';
import { handleCallAPI } from '../../../../../utils.js';
import GeneralError from '../../../../emailpassword/components/library/generalError.js';
import { ContinueWithPasskeyTheme } from '../continueWithPasskey/index.js';
import { ThemeBase } from '../themeBase.js';

function PasskeySignInTheme(props) {
    var _this = this;
    var userContext = useUserContext();
    var _a = React.useState(null), error = _a[0], setError = _a[1];
    var _b = React.useState(false), isLoading = _b[0], setIsLoading = _b[1];
    var callAPI = React.useCallback(function (_, __) { return __awaiter(_this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, props.recipeImplementation.authenticateCredentialWithSignIn({
                        userContext: userContext,
                    })];
                case 1:
                    response = _a.sent();
                    switch (response.status) {
                        case "INVALID_CREDENTIALS_ERROR":
                            setError("WEBAUTHN_PASSKEY_INVALID_CREDENTIALS_ERROR");
                            break;
                        case "FAILED_TO_AUTHENTICATE_USER":
                        case "INVALID_OPTIONS_ERROR":
                            setError("WEBAUTHN_PASSKEY_RECOVERABLE_ERROR");
                            break;
                        case "WEBAUTHN_NOT_SUPPORTED":
                            setError("WEBAUTHN_NOT_SUPPORTED_ERROR");
                            break;
                    }
                    return [2 /*return*/, response];
            }
        });
    }); }, [props, userContext]);
    // Define the code to handle sign in properly through this component.
    var handleWebauthnSignInClick = function () { return __awaiter(_this, void 0, void 0, function () {
        var fieldUpdates, _a, result, generalError, fetchError;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    fieldUpdates = [];
                    setIsLoading(true);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, handleCallAPI({
                            apiFields: [],
                            fieldUpdates: fieldUpdates,
                            callAPI: callAPI,
                        })];
                case 2:
                    _a = _b.sent(), result = _a.result, generalError = _a.generalError, fetchError = _a.fetchError;
                    if (generalError !== undefined) {
                        setError(generalError.message);
                    }
                    else if (fetchError !== undefined) {
                        setError("Failed to fetch from upstream");
                    }
                    else {
                        // If successful
                        if (result.status === "OK") {
                            if (setIsLoading) {
                                setIsLoading(false);
                            }
                            setError(null);
                            if (props.onSuccess !== undefined) {
                                props.onSuccess(result);
                            }
                        }
                    }
                    return [3 /*break*/, 5];
                case 3:
                    _b.sent();
                    setError("SOMETHING_WENT_WRONG_ERROR");
                    return [3 /*break*/, 5];
                case 4:
                    if (setIsLoading) {
                        setIsLoading(false);
                    }
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var rootStyle = SuperTokens.getInstanceOrThrow().rootStyle;
    var activeStyle = props.config.signInAndUpFeature.style;
    return (jsx(UserContextWrapper, __assign({ userContext: props.userContext }, { children: jsx(ThemeBase, __assign({ userStyles: [rootStyle, props.config.recipeRootStyle, activeStyle] }, { children: jsxs("div", __assign({ "data-supertokens": "passkeySignInContainer" }, { children: [error !== "" && error !== null && jsx(GeneralError, { error: error }), jsx(ContinueWithPasskeyTheme, __assign({}, props, { continueWithPasskeyClicked: handleWebauthnSignInClick, config: props.config, continueTo: "SIGN_IN", isLoading: isLoading, isPasskeySupported: props.isPasskeySupported }))] })) })) })));
}

export { PasskeySignInTheme as default };
