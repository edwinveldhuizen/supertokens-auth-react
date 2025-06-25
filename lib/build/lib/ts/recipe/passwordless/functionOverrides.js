import { __assign, __awaiter, __generator } from '../../../../_virtual/_tslib.js';
import Session from '../session/recipe.js';

var getFunctionOverrides = function (onHandleEvent) {
    return function (originalImp) { return (__assign(__assign({}, originalImp), { createCode: function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, originalImp.createCode(input)];
                        case 1:
                            response = _a.sent();
                            if (response.status === "OK") {
                                onHandleEvent({
                                    action: "PASSWORDLESS_CODE_SENT",
                                    isResend: false,
                                });
                            }
                            return [2 /*return*/, response];
                    }
                });
            });
        }, resendCode: function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, originalImp.resendCode(input)];
                        case 1:
                            response = _a.sent();
                            if (response.status === "RESTART_FLOW_ERROR") {
                                onHandleEvent({
                                    action: "PASSWORDLESS_RESTART_FLOW",
                                });
                            }
                            else if (response.status === "OK") {
                                onHandleEvent({
                                    action: "PASSWORDLESS_CODE_SENT",
                                    isResend: true,
                                });
                            }
                            return [2 /*return*/, response];
                    }
                });
            });
        }, consumeCode: function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var payloadBeforeCall, response, payloadAfterCall;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _c.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, Session.getInstanceOrThrow().getAccessTokenPayloadSecurely({
                                    userContext: input.userContext,
                                })];
                        case 1:
                            payloadBeforeCall = _c.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            _c.sent();
                            // If getAccessTokenPayloadSecurely threw, that generally means we have no active session
                            payloadBeforeCall = undefined;
                            return [3 /*break*/, 3];
                        case 3: return [4 /*yield*/, originalImp.consumeCode(input)];
                        case 4:
                            response = _c.sent();
                            if (!(response.status === "RESTART_FLOW_ERROR")) return [3 /*break*/, 5];
                            onHandleEvent({
                                action: "PASSWORDLESS_RESTART_FLOW",
                            });
                            return [3 /*break*/, 10];
                        case 5:
                            if (!(response.status === "OK")) return [3 /*break*/, 10];
                            payloadAfterCall = void 0;
                            _c.label = 6;
                        case 6:
                            _c.trys.push([6, 8, , 9]);
                            return [4 /*yield*/, Session.getInstanceOrThrow().getAccessTokenPayloadSecurely({
                                    userContext: input.userContext,
                                })];
                        case 7:
                            payloadAfterCall = _c.sent();
                            return [3 /*break*/, 9];
                        case 8:
                            _c.sent();
                            // If getAccessTokenPayloadSecurely threw, that generally means we have no active session
                            payloadAfterCall = undefined;
                            return [3 /*break*/, 9];
                        case 9:
                            onHandleEvent({
                                action: "SUCCESS",
                                isNewRecipeUser: response.createdNewRecipeUser,
                                user: response.user,
                                createdNewSession: payloadAfterCall !== undefined &&
                                    (payloadBeforeCall === undefined ||
                                        payloadBeforeCall.sessionHandle !== payloadAfterCall.sessionHandle),
                            });
                            _c.label = 10;
                        case 10: return [2 /*return*/, response];
                    }
                });
            });
        }, setLoginAttemptInfo: function (input) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, originalImp.setLoginAttemptInfo(__assign(__assign({}, input), { attemptInfo: __assign(__assign({}, input.attemptInfo), input.userContext.additionalAttemptInfo) }))];
                });
            });
        } })); };
};

export { getFunctionOverrides };
