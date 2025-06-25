import { __awaiter, __generator } from './_virtual/_tslib.js';
export { BooleanClaim } from './lib/ts/claims/booleanClaim.js';
export { PrimitiveArrayClaim } from './lib/ts/claims/primitiveArrayClaim.js';
export { PrimitiveClaim } from './lib/ts/claims/primitiveClaim.js';
import { getNormalisedUserContext } from './lib/ts/utils.js';
import { RecipeComponentsOverrideContextProvider as Provider } from './lib/ts/recipe/session/componentOverrideContext.js';
import Session from './lib/ts/recipe/session/recipe.js';
import SessionAuthWrapper from './lib/ts/recipe/session/sessionAuth.js';
export { default as SessionContext } from './lib/ts/recipe/session/sessionContext.js';
import { useClaimValue as useClaimValue$1 } from './lib/ts/recipe/session/useClaimValue.js';
import useSessionContext$1 from './lib/ts/recipe/session/useSessionContext.js';

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
var SessionAPIWrapper = /** @class */ (function () {
    function SessionAPIWrapper() {
    }
    SessionAPIWrapper.init = function (config) {
        return Session.init(config);
    };
    SessionAPIWrapper.getUserId = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Session.getInstanceOrThrow().getUserId({
                        userContext: getNormalisedUserContext(input === null || input === void 0 ? void 0 : input.userContext),
                    })];
            });
        });
    };
    SessionAPIWrapper.getAccessToken = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Session.getInstanceOrThrow().getAccessToken({
                        userContext: getNormalisedUserContext(input === null || input === void 0 ? void 0 : input.userContext),
                    })];
            });
        });
    };
    SessionAPIWrapper.getAccessTokenPayloadSecurely = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Session.getInstanceOrThrow().getAccessTokenPayloadSecurely({
                        userContext: getNormalisedUserContext(input === null || input === void 0 ? void 0 : input.userContext),
                    })];
            });
        });
    };
    SessionAPIWrapper.attemptRefreshingSession = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Session.getInstanceOrThrow().attemptRefreshingSession()];
            });
        });
    };
    SessionAPIWrapper.doesSessionExist = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Session.getInstanceOrThrow().doesSessionExist({
                        userContext: getNormalisedUserContext(input === null || input === void 0 ? void 0 : input.userContext),
                    })];
            });
        });
    };
    /**
     * @deprecated
     */
    SessionAPIWrapper.addAxiosInterceptors = function (axiosInstance, userContext) {
        return Session.addAxiosInterceptors(axiosInstance, getNormalisedUserContext(userContext));
    };
    SessionAPIWrapper.signOut = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Session.getInstanceOrThrow().signOut({
                        userContext: getNormalisedUserContext(input === null || input === void 0 ? void 0 : input.userContext),
                    })];
            });
        });
    };
    SessionAPIWrapper.validateClaims = function (input) {
        return Session.getInstanceOrThrow().validateClaims({
            overrideGlobalClaimValidators: input === null || input === void 0 ? void 0 : input.overrideGlobalClaimValidators,
            userContext: getNormalisedUserContext(input === null || input === void 0 ? void 0 : input.userContext),
        });
    };
    SessionAPIWrapper.getInvalidClaimsFromResponse = function (input) {
        return Session.getInstanceOrThrow().getInvalidClaimsFromResponse(input);
    };
    SessionAPIWrapper.getClaimValue = function (input) {
        return Session.getInstanceOrThrow().getClaimValue({
            claim: input.claim,
            userContext: getNormalisedUserContext(input === null || input === void 0 ? void 0 : input.userContext),
        });
    };
    SessionAPIWrapper.useSessionContext = useSessionContext$1;
    SessionAPIWrapper.useClaimValue = useClaimValue$1;
    SessionAPIWrapper.SessionAuth = SessionAuthWrapper;
    SessionAPIWrapper.ComponentsOverrideProvider = Provider;
    return SessionAPIWrapper;
}());
var useSessionContext = SessionAPIWrapper.useSessionContext;
var useClaimValue = SessionAPIWrapper.useClaimValue;
var SessionAuth = SessionAPIWrapper.SessionAuth;
var init = SessionAPIWrapper.init;
var getUserId = SessionAPIWrapper.getUserId;
var getAccessToken = SessionAPIWrapper.getAccessToken;
var getAccessTokenPayloadSecurely = SessionAPIWrapper.getAccessTokenPayloadSecurely;
var attemptRefreshingSession = SessionAPIWrapper.attemptRefreshingSession;
var doesSessionExist = SessionAPIWrapper.doesSessionExist;
/**
 * @deprecated
 */
var addAxiosInterceptors = SessionAPIWrapper.addAxiosInterceptors;
var signOut = SessionAPIWrapper.signOut;
var validateClaims = SessionAPIWrapper.validateClaims;
var getInvalidClaimsFromResponse = SessionAPIWrapper.getInvalidClaimsFromResponse;
var getClaimValue = SessionAPIWrapper.getClaimValue;
var SessionComponentsOverrideProvider = SessionAPIWrapper.ComponentsOverrideProvider;

export { SessionAuth, SessionComponentsOverrideProvider, addAxiosInterceptors, attemptRefreshingSession, SessionAPIWrapper as default, doesSessionExist, getAccessToken, getAccessTokenPayloadSecurely, getClaimValue, getInvalidClaimsFromResponse, getUserId, init, signOut, useClaimValue, useSessionContext, validateClaims };
