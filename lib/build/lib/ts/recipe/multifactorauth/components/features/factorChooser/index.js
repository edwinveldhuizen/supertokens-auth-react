import { __awaiter, __generator, __assign } from '../../../../../../../_virtual/_tslib.js';
import { jsx, jsxs } from 'react/jsx-runtime';
import * as React from 'react';
import { useContext, useState, useCallback, Fragment } from 'react';
import { WindowHandlerReference } from 'supertokens-web-js/utils/windowHandler';
import { redirectToAuth } from '../../../../../../../index.js';
import { ComponentOverrideContext } from '../../../../../components/componentOverride/componentOverrideContext.js';
import FeatureWrapper from '../../../../../components/featureWrapper.js';
import SuperTokens from '../../../../../superTokens.js';
import { useUserContext } from '../../../../../usercontext/index.js';
import { useRethrowInRender, getQueryParams, getRedirectToPathFromURL, useOnMountAPICall } from '../../../../../utils.js';
import '../../../../../../../session.js';
import Session from '../../../../session/recipe.js';
import MultiFactorAuth from '../../../recipe.js';
import { getAvailableFactors } from '../../../utils.js';
import FactorChooserThemeWrapper from '../../themes/factorChooser/index.js';
import { defaultTranslationsMultiFactorAuth } from '../../themes/translations.js';
import SessionContext from '../../../../session/sessionContext.js';

var FactorChooser = function (props) {
    var _a;
    var sessionContext = useContext(SessionContext);
    var rethrowInRender = useRethrowInRender();
    var _b = useState(undefined), mfaInfo = _b[0], setMFAInfo = _b[1];
    var userContext = useUserContext();
    if (props.userContext !== undefined) {
        userContext = props.userContext;
    }
    var recipeComponentOverrides = props.useComponentOverrides();
    var nextQueryParam = (_a = getQueryParams("n")) !== null && _a !== void 0 ? _a : undefined;
    var stepUpQueryParam = getQueryParams("stepUp");
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
    var fetchMFAInfo = useCallback(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/, props.recipe.webJSRecipe.resyncSessionAndFetchMFAInfo({ userContext: userContext })];
    }); }); }, [props.recipe, userContext]);
    var checkMFAInfo = useCallback(function (mfaInfo) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (mfaInfo.factors.next.length === 0 && stepUpQueryParam !== "true") {
                void Session.getInstanceOrThrow()
                    .validateGlobalClaimsAndHandleSuccessRedirection(undefined, MultiFactorAuth.RECIPE_ID, getRedirectToPathFromURL(), userContext, props.navigate)
                    .catch(rethrowInRender);
            }
            else {
                setMFAInfo({
                    factors: mfaInfo.factors,
                    phoneNumbers: mfaInfo.phoneNumbers,
                    emails: mfaInfo.emails,
                });
            }
            return [2 /*return*/];
        });
    }); }, [setMFAInfo, nextQueryParam, userContext]);
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
    useOnMountAPICall(fetchMFAInfo, checkMFAInfo, handleError, sessionContext.loading === false);
    var navigateToFactor = useCallback(function (factorId) {
        props.recipe.config.onHandleEvent({
            action: "FACTOR_CHOOSEN",
            factorId: factorId,
        });
        return props.recipe.redirectToFactor({
            factorId: factorId,
            forceSetup: false,
            stepUp: stepUpQueryParam === "true",
            redirectBack: false,
            navigate: props.navigate,
            userContext: props.userContext,
        });
    }, [props.recipe]);
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
    }); }, [props.recipe, redirectToAuthWithHistory]);
    var onBackButtonClicked = useCallback(function () {
        // If we don't have navigate available this would mean we are not using react-router-dom, so we use window's history
        if (props.navigate === undefined) {
            return WindowHandlerReference.getReferenceOrThrow().windowHandler.getWindowUnsafe().history.back();
        }
        // If we do have navigate and goBack function on it this means we are using react-router-dom v5 or lower
        if ("goBack" in props.navigate) {
            return props.navigate.goBack();
        }
        // If we reach this code this means we are using react-router-dom v6
        return props.navigate(-1);
    }, [props.navigate]);
    if (mfaInfo === undefined) {
        return null;
    }
    var availableFactors = getAvailableFactors(mfaInfo.factors, nextQueryParam, props.recipe, userContext);
    var childProps = {
        config: props.recipe.config,
        onBackButtonClicked: onBackButtonClicked,
        // if the next array is empty, it means the user has logged in fully and has come here (from a settings page for example).
        // So we show the back button. In case the next array is not empty, it means we are still signing in, and
        // there is no where to go back to, other than logout, which is a different button in the UI.
        showBackButton: mfaInfo.factors.next.length === 0,
        mfaInfo: mfaInfo,
        availableFactors: availableFactors,
        onLogoutClicked: signOut,
        navigateToFactor: navigateToFactor,
    };
    return (jsx(ComponentOverrideContext.Provider, __assign({ value: recipeComponentOverrides }, { children: jsx(FeatureWrapper, __assign({ useShadowDom: SuperTokens.getInstanceOrThrow().useShadowDom, defaultStore: defaultTranslationsMultiFactorAuth }, { children: jsxs(Fragment, { children: [props.children === undefined && jsx(FactorChooserThemeWrapper, __assign({}, childProps)), props.children &&
                        React.Children.map(props.children, function (child) {
                            if (React.isValidElement(child)) {
                                return React.cloneElement(child, childProps);
                            }
                            return child;
                        })] }) })) })));
};

export { FactorChooser, FactorChooser as default };
