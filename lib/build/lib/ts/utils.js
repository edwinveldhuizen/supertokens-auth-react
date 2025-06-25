import { __awaiter, __generator, __assign } from '../../_virtual/_tslib.js';
import { useRef, useState, useEffect } from 'react';
import STGeneralError from 'supertokens-web-js/lib/build/error';
import { CookieHandlerReference } from 'supertokens-web-js/utils/cookieHandler';
import NormalisedURLDomain from 'supertokens-web-js/utils/normalisedURLDomain';
import NormalisedURLPath from 'supertokens-web-js/utils/normalisedURLPath';
import { WindowHandlerReference } from 'supertokens-web-js/utils/windowHandler';
import { RECIPE_ID_QUERY_PARAM, TENANT_ID_QUERY_PARAM, DEFAULT_API_BASE_PATH, DEFAULT_WEBSITE_BASE_PATH } from './constants.js';

/* Copyright (c) 2021, VRAI Labs and/or its affiliates. All rights reserved.
 *
 * This software is licensed under the Apache License, Version 2.0 (the
 * "License") as published by the Apache Software Foundation.
 *
 * You may not use this file except in compliance with the License. You may
 * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */
/*
 * getRecipeIdFromPath
 * Input:
 * Output: The "rid" query param if present, null otherwise.
 */
function getRecipeIdFromSearch(search) {
    var urlParams = new URLSearchParams(search);
    return urlParams.get(RECIPE_ID_QUERY_PARAM);
}
function clearQueryParams(paramNames) {
    var newURL = new URL(WindowHandlerReference.getReferenceOrThrow().windowHandler.location.getHref());
    for (var _i = 0, paramNames_1 = paramNames; _i < paramNames_1.length; _i++) {
        var param = paramNames_1[_i];
        newURL.searchParams.delete(param);
    }
    WindowHandlerReference.getReferenceOrThrow().windowHandler.history.replaceState(WindowHandlerReference.getReferenceOrThrow().windowHandler.history.getState(), "", newURL.toString());
}
function updateQueryParam(name, value) {
    var newURL = new URL(WindowHandlerReference.getReferenceOrThrow().windowHandler.location.getHref());
    newURL.searchParams.set(name, value);
    WindowHandlerReference.getReferenceOrThrow().windowHandler.history.replaceState(WindowHandlerReference.getReferenceOrThrow().windowHandler.history.getState(), "", newURL.toString());
}
function clearErrorQueryParam() {
    clearQueryParams(["error", "message"]);
}
function getQueryParams(param) {
    var urlParams = new URLSearchParams(WindowHandlerReference.getReferenceOrThrow().windowHandler.location.getSearch());
    return urlParams.get(param);
}
function getURLHash() {
    // By default it is returined with the "#" at the beginning, we cut that off here.
    return WindowHandlerReference.getReferenceOrThrow().windowHandler.location.getHash().substr(1);
}
function getRedirectToPathFromURL() {
    var redirectToPath = getQueryParams("redirectToPath");
    if (redirectToPath === null) {
        return undefined;
    }
    else {
        try {
            var url = void 0;
            try {
                url = new URL(redirectToPath);
            }
            catch (error) {
                var fakeDomain = redirectToPath.startsWith("/") ? "http://localhost" : "http://localhost/";
                url = new URL("".concat(fakeDomain).concat(redirectToPath));
            }
            // Prevent Open redirects by normalising path.
            var normalisedURLPath = new NormalisedURLPath(redirectToPath).getAsStringDangerous();
            var pathQueryParams = url.search || ""; // url.search contains the leading ?
            var pathHash = url.hash || ""; // url.hash contains the leading #
            var pathWithQueryParamsAndHash = normalisedURLPath + pathQueryParams + pathHash;
            // Ensure a leading "/" if `normalisedUrlPath` is empty but `pathWithQueryParamsAndHash` is not to ensure proper redirection.
            // Example: "?test=1" will not redirect the user to `/?test=1` if we don't add a leading "/".
            if (normalisedURLPath.length === 0 &&
                pathWithQueryParamsAndHash.length > 0 &&
                !pathWithQueryParamsAndHash.startsWith("/")) {
                return "/" + pathWithQueryParamsAndHash;
            }
            return pathWithQueryParamsAndHash;
        }
        catch (_a) {
            return undefined;
        }
    }
}
function getTenantIdFromQueryParams() {
    var _a;
    return (_a = getQueryParams(TENANT_ID_QUERY_PARAM)) !== null && _a !== void 0 ? _a : undefined;
}
function getDefaultRedirectionURLForPath(config, defaultPath, context, extraQueryParams) {
    var redirectPath = config.appInfo.websiteBasePath
        .appendPath(new NormalisedURLPath(defaultPath))
        .getAsStringDangerous();
    var queryParams = new URLSearchParams();
    if (context.tenantIdFromQueryParams !== undefined) {
        queryParams.set(TENANT_ID_QUERY_PARAM, context.tenantIdFromQueryParams);
    }
    if (extraQueryParams !== undefined) {
        Object.entries(extraQueryParams).forEach(function (_a) {
            var key = _a[0], value = _a[1];
            if (value !== undefined) {
                queryParams.set(key, value);
            }
        });
    }
    if (queryParams.toString() !== "") {
        return "".concat(redirectPath, "?").concat(queryParams.toString());
    }
    return redirectPath;
}
/*
 * isTest
 */
function isTest() {
    try {
        return process.env.TEST_MODE === "testing" || process.env.REACT_APP_TEST_MODE === "testing";
    }
    catch (err) {
        // can get Uncaught ReferenceError: process is not defined error
        return false;
    }
}
function normaliseInputAppInfoOrThrowError(appInfo) {
    if (appInfo === undefined) {
        throw new Error("Please provide the appInfo object when calling supertokens.init");
    }
    if (appInfo.apiDomain === undefined) {
        throw new Error("Please provide your apiDomain inside the appInfo object when calling supertokens.init");
    }
    if (appInfo.appName === undefined) {
        throw new Error("Please provide your appName inside the appInfo object when calling supertokens.init");
    }
    if (appInfo.websiteDomain === undefined) {
        throw new Error("Please provide your websiteDomain inside the appInfo object when calling supertokens.init");
    }
    var apiGatewayPath = new NormalisedURLPath("");
    if (appInfo.apiGatewayPath !== undefined) {
        apiGatewayPath = new NormalisedURLPath(appInfo.apiGatewayPath);
    }
    return {
        appName: appInfo.appName,
        apiDomain: new NormalisedURLDomain(appInfo.apiDomain),
        websiteDomain: new NormalisedURLDomain(appInfo.websiteDomain),
        apiBasePath: apiGatewayPath.appendPath(getNormalisedURLPathOrDefault(DEFAULT_API_BASE_PATH, appInfo.apiBasePath)),
        websiteBasePath: getNormalisedURLPathOrDefault(DEFAULT_WEBSITE_BASE_PATH, appInfo.websiteBasePath),
    };
}
function getNormalisedURLPathOrDefault(defaultPath, path) {
    if (path !== undefined) {
        return new NormalisedURLPath(path);
    }
    else {
        return new NormalisedURLPath(defaultPath);
    }
}
/*
 * validateForm
 */
// We check that the number of fields in input and config form field is the same.
// We check that each item in the config form field is also present in the input form field
function validateForm(inputs, configFormFields) {
    return __awaiter(this, void 0, void 0, function () {
        var validationErrors, _loop_1, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    validationErrors = [];
                    if (configFormFields.length !== inputs.length) {
                        throw Error("Are you sending too many / too few formFields?");
                    }
                    _loop_1 = function (i) {
                        var field, input, value, error;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    field = configFormFields[i];
                                    input = inputs.find(function (i) { return i.id === field.id; });
                                    value = input.value;
                                    if (input.id === "email") {
                                        value = value.trim();
                                    }
                                    return [4 /*yield*/, field.validate(value)];
                                case 1:
                                    error = _b.sent();
                                    // If error, add it.
                                    if (error !== undefined) {
                                        validationErrors.push({
                                            error: error,
                                            id: field.id,
                                        });
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    };
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < configFormFields.length)) return [3 /*break*/, 4];
                    return [5 /*yield**/, _loop_1(i)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, validationErrors];
            }
        });
    });
}
/*
 * getCurrentNormalisedUrlPath
 */
function getCurrentNormalisedUrlPath() {
    return new NormalisedURLPath(WindowHandlerReference.getReferenceOrThrow().windowHandler.location.getPathName());
}
function getCurrentNormalisedUrlPathWithQueryParamsAndFragments() {
    var normalisedUrlPath = getCurrentNormalisedUrlPath().getAsStringDangerous();
    return (normalisedUrlPath +
        WindowHandlerReference.getReferenceOrThrow().windowHandler.location.getSearch() +
        WindowHandlerReference.getReferenceOrThrow().windowHandler.location.getHash());
}
function appendQueryParamsToURL(stringUrl, queryParams) {
    if (queryParams === undefined) {
        return stringUrl;
    }
    try {
        var url_1 = new URL(stringUrl);
        Object.entries(queryParams).forEach(function (_a) {
            var key = _a[0], value = _a[1];
            url_1.searchParams.set(key, value);
        });
        return url_1.href;
    }
    catch (e) {
        var fakeDomain = stringUrl.startsWith("/") ? "http://localhost" : "http://localhost/";
        var url_2 = new URL("".concat(fakeDomain).concat(stringUrl));
        Object.entries(queryParams).forEach(function (_a) {
            var key = _a[0], value = _a[1];
            url_2.searchParams.set(key, value);
        });
        return "".concat(url_2.pathname).concat(url_2.search).concat(url_2.hash);
    }
}
function appendTrailingSlashToURL(stringUrl) {
    return stringUrl.endsWith("/") ? stringUrl : stringUrl + "/";
}
/*
 * Default method for matching recipe route based on query params.
 */
function matchRecipeIdUsingQueryParams(recipeId) {
    return function () {
        var recipeIdFromSearch = getRecipeIdFromSearch(WindowHandlerReference.getReferenceOrThrow().windowHandler.location.getSearch());
        return recipeIdFromSearch === recipeId;
    };
}
function redirectWithFullPageReload(to) {
    if (to.trim() === "") {
        to = "/";
    }
    WindowHandlerReference.getReferenceOrThrow().windowHandler.location.setHref(to);
}
function redirectWithNavigate(to, navigate) {
    if (to.trim() === "") {
        to = "/";
    }
    if ("push" in navigate) {
        // we are using react-router-dom that is before v6
        navigate.push(to);
    }
    else {
        // in react-router-dom v6, it is just navigate(to)
        navigate(to);
    }
}
function getOriginOfPage() {
    return new NormalisedURLDomain(WindowHandlerReference.getReferenceOrThrow().windowHandler.location.getOrigin());
}
function getLocalStorage(key) {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            res = WindowHandlerReference.getReferenceOrThrow().windowHandler.localStorage.getItem(key);
            if (res === null || res === undefined) {
                return [2 /*return*/, null];
            }
            return [2 /*return*/, res];
        });
    });
}
function setLocalStorage(key, value) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, WindowHandlerReference.getReferenceOrThrow().windowHandler.localStorage.setItem(key, value)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function removeFromLocalStorage(key) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, WindowHandlerReference.getReferenceOrThrow().windowHandler.localStorage.removeItem(key)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function mergeObjects(obj1, obj2) {
    var res = __assign({}, obj1);
    for (var key in obj2) {
        if (typeof res[key] === "object" && typeof obj2[key] === "object") {
            res[key] = mergeObjects(res[key], obj2[key]);
        }
        else {
            res[key] = obj2[key];
        }
    }
    return res;
}
function normaliseCookieScopeOrThrowError(cookieScope) {
    function helper(cookieScope) {
        cookieScope = cookieScope.trim().toLowerCase();
        // first we convert it to a URL so that we can use the URL class
        if (cookieScope.startsWith(".")) {
            cookieScope = cookieScope.substr(1);
        }
        if (!cookieScope.startsWith("http://") && !cookieScope.startsWith("https://")) {
            cookieScope = "http://" + cookieScope;
        }
        try {
            var urlObj = new URL(cookieScope);
            cookieScope = urlObj.hostname;
            // remove leading dot
            if (cookieScope.startsWith(".")) {
                cookieScope = cookieScope.substr(1);
            }
            return cookieScope;
        }
        catch (err) {
            throw new Error("Please provide a valid cookie scope");
        }
    }
    function isAnIpAddress(ipaddress) {
        return /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress);
    }
    var noDotNormalised = helper(cookieScope);
    if (noDotNormalised === "localhost" || isAnIpAddress(noDotNormalised)) {
        return noDotNormalised;
    }
    if (cookieScope.startsWith(".")) {
        return "." + noDotNormalised;
    }
    return noDotNormalised;
}
function getDefaultCookieScope() {
    try {
        return normaliseCookieScopeOrThrowError(WindowHandlerReference.getReferenceOrThrow().windowHandler.location.getHostName());
    }
    catch (_a) {
        return undefined;
    }
}
function getCookieValue(name) {
    return __awaiter(this, void 0, void 0, function () {
        var value, _a, parts, last, temp;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = "; ";
                    return [4 /*yield*/, CookieHandlerReference.getReferenceOrThrow().cookieHandler.getCookie()];
                case 1:
                    value = _a + (_b.sent());
                    parts = value.split("; " + name + "=");
                    if (parts.length >= 2) {
                        last = parts.pop();
                        if (last !== undefined) {
                            temp = last.split(";").shift();
                            if (temp === undefined) {
                                return [2 /*return*/, null];
                            }
                            return [2 /*return*/, temp];
                        }
                    }
                    return [2 /*return*/, null];
            }
        });
    });
}
// undefined value will remove the cookie
function setFrontendCookie(name, value, scope) {
    return __awaiter(this, void 0, void 0, function () {
        var expires, cookieVal;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    expires = "Thu, 01 Jan 1970 00:00:01 GMT";
                    cookieVal = "";
                    if (value !== undefined) {
                        cookieVal = value;
                        expires = undefined; // set cookie without expiry
                    }
                    if (!(scope === "localhost" ||
                        scope === WindowHandlerReference.getReferenceOrThrow().windowHandler.location.getHostName() ||
                        scope === undefined)) return [3 /*break*/, 5];
                    if (!(expires !== undefined)) return [3 /*break*/, 2];
                    return [4 /*yield*/, CookieHandlerReference.getReferenceOrThrow().cookieHandler.setCookie("".concat(name, "=").concat(cookieVal, ";expires=").concat(expires, ";path=/;samesite=lax"))];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, CookieHandlerReference.getReferenceOrThrow().cookieHandler.setCookie("".concat(name, "=").concat(cookieVal, ";expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/;samesite=lax"))];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [3 /*break*/, 9];
                case 5:
                    if (!(expires !== undefined)) return [3 /*break*/, 7];
                    return [4 /*yield*/, CookieHandlerReference.getReferenceOrThrow().cookieHandler.setCookie("".concat(name, "=").concat(cookieVal, ";expires=").concat(expires, ";domain=").concat(scope, ";path=/;samesite=lax"))];
                case 6:
                    _a.sent();
                    return [3 /*break*/, 9];
                case 7: return [4 /*yield*/, CookieHandlerReference.getReferenceOrThrow().cookieHandler.setCookie("".concat(name, "=").concat(cookieVal, ";domain=").concat(scope, ";expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/;samesite=lax"))];
                case 8:
                    _a.sent();
                    _a.label = 9;
                case 9: return [2 /*return*/];
            }
        });
    });
}
function getNormalisedUserContext(userContext) {
    return userContext === undefined ? {} : userContext;
}
/**
 * This function handles calling APIs that should only be called once during mount (mostly on mount of a route/feature component).
 * It's split into multiple callbacks (fetch + handleResponse/handleError) because we expect fetch to take longer and
 * and the component may be unmounted during the first fetch, in which case we want to avoid updating state/redirecting.
 * This is especially relevant for development in strict mode with React 18 (and in the future for concurrent rendering).
 *
 * @param fetch This is a callback that is only called once on mount. Mostly it's for consuming tokens/doing one time only API calls
 * @param handleResponse This is called with the result of the first (fetch) call if it succeeds.
 * @param handleError This is called with the error of the first (fetch) call if it rejects.
 * @param startLoading Will start the whole process if this is set to true (or omitted). Mostly used to wait for session loading.
 */
var useOnMountAPICall = function (fetch, handleResponse, handleError, startLoading) {
    if (startLoading === void 0) { startLoading = true; }
    var consumeReq = useRef();
    var _a = useState(undefined), error = _a[0], setError = _a[1];
    useEffect(function () {
        var effect = function (signal) { return __awaiter(void 0, void 0, void 0, function () {
            var resp, err_1, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 9]);
                        if (consumeReq.current === undefined) {
                            consumeReq.current = fetch();
                        }
                        return [4 /*yield*/, consumeReq.current];
                    case 1:
                        resp = _a.sent();
                        if (!signal.aborted) {
                            void handleResponse(resp);
                        }
                        return [3 /*break*/, 9];
                    case 2:
                        err_1 = _a.sent();
                        if (!!signal.aborted) return [3 /*break*/, 8];
                        if (!(handleError !== undefined)) return [3 /*break*/, 7];
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, handleError(err_1, resp)];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        err_2 = _a.sent();
                        setError(err_2);
                        return [3 /*break*/, 6];
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        setError(err_1);
                        _a.label = 8;
                    case 8: return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        }); };
        if (startLoading) {
            var ctrl_1 = new AbortController();
            void effect(ctrl_1.signal);
            return function () {
                ctrl_1.abort();
            };
        }
        return;
    }, [setError, consumeReq, fetch, handleResponse, handleError, startLoading]);
    if (error) {
        throw error;
    }
};
function useRethrowInRender() {
    var _a = useState(undefined), error = _a[0], setError = _a[1];
    if (error) {
        throw error;
    }
    return setError;
}
var handleCallAPI = function (_a) {
    var apiFields = _a.apiFields, fieldUpdates = _a.fieldUpdates, callAPI = _a.callAPI;
    return __awaiter(void 0, void 0, void 0, function () {
        var result, generalError, fetchError, e_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, callAPI(apiFields || [], function (id, value) { return fieldUpdates.push({ id: id, value: value }); })];
                case 1:
                    result = _b.sent();
                    return [3 /*break*/, 3];
                case 2:
                    e_1 = _b.sent();
                    if (STGeneralError.isThisError(e_1)) {
                        generalError = e_1;
                    }
                    else if (e_1 instanceof Response) {
                        fetchError = e_1;
                    }
                    else {
                        throw e_1;
                    }
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/, {
                        result: result,
                        generalError: generalError,
                        fetchError: fetchError,
                    }];
            }
        });
    });
};

export { appendQueryParamsToURL, appendTrailingSlashToURL, clearErrorQueryParam, clearQueryParams, getCookieValue, getCurrentNormalisedUrlPath, getCurrentNormalisedUrlPathWithQueryParamsAndFragments, getDefaultCookieScope, getDefaultRedirectionURLForPath, getLocalStorage, getNormalisedUserContext, getOriginOfPage, getQueryParams, getRecipeIdFromSearch, getRedirectToPathFromURL, getTenantIdFromQueryParams, getURLHash, handleCallAPI, isTest, matchRecipeIdUsingQueryParams, mergeObjects, normaliseCookieScopeOrThrowError, normaliseInputAppInfoOrThrowError, redirectWithFullPageReload, redirectWithNavigate, removeFromLocalStorage, setFrontendCookie, setLocalStorage, updateQueryParam, useOnMountAPICall, useRethrowInRender, validateForm };
