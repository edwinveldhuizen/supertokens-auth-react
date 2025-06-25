import { __assign, __awaiter, __generator } from "../../../../_virtual/_tslib.js";
import Session from "../session/recipe.js";

var getFunctionOverrides = function (onHandleEvent) {
    return function (originalImp) {
        return __assign(__assign({}, originalImp), {
            submitNewPassword: function (input) {
                return __awaiter(this, void 0, void 0, function () {
                    var response;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                return [
                                    4 /*yield*/,
                                    originalImp.submitNewPassword(
                                        __assign(__assign({}, input), { formFields: [input.formFields[0]] })
                                    ),
                                ];
                            case 1:
                                response = _a.sent();
                                if (response.status === "OK") {
                                    onHandleEvent({
                                        action: "PASSWORD_RESET_SUCCESSFUL",
                                        userContext: input.userContext,
                                    });
                                }
                                return [2 /*return*/, response];
                        }
                    });
                });
            },
            sendPasswordResetEmail: function (input) {
                return __awaiter(this, void 0, void 0, function () {
                    var response;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                return [4 /*yield*/, originalImp.sendPasswordResetEmail(input)];
                            case 1:
                                response = _a.sent();
                                if (response.status === "OK") {
                                    onHandleEvent({
                                        action: "RESET_PASSWORD_EMAIL_SENT",
                                        email: input.formFields.find(function (_a) {
                                            var id = _a.id;
                                            return id === "email";
                                        }).value,
                                        userContext: input.userContext,
                                    });
                                }
                                return [2 /*return*/, response];
                        }
                    });
                });
            },
            signUp: function (input) {
                return __awaiter(this, void 0, void 0, function () {
                    var payloadBeforeCall, response, payloadAfterCall;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                _c.trys.push([0, 2, , 3]);
                                return [
                                    4 /*yield*/,
                                    Session.getInstanceOrThrow().getAccessTokenPayloadSecurely({
                                        userContext: input.userContext,
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
                                return [4 /*yield*/, originalImp.signUp(input)];
                            case 4:
                                response = _c.sent();
                                if (!(response.status === "OK")) return [3 /*break*/, 9];
                                payloadAfterCall = void 0;
                                _c.label = 5;
                            case 5:
                                _c.trys.push([5, 7, , 8]);
                                return [
                                    4 /*yield*/,
                                    Session.getInstanceOrThrow().getAccessTokenPayloadSecurely({
                                        userContext: input.userContext,
                                    }),
                                ];
                            case 6:
                                payloadAfterCall = _c.sent();
                                return [3 /*break*/, 8];
                            case 7:
                                _c.sent();
                                // If getAccessTokenPayloadSecurely threw, that generally means we have no active session
                                payloadAfterCall = undefined;
                                return [3 /*break*/, 8];
                            case 8:
                                onHandleEvent({
                                    action: "SUCCESS",
                                    isNewRecipeUser: true,
                                    createdNewSession:
                                        payloadAfterCall !== undefined &&
                                        (payloadBeforeCall === undefined ||
                                            payloadBeforeCall.sessionHandle !== payloadAfterCall.sessionHandle),
                                    user: response.user,
                                    userContext: input.userContext,
                                });
                                _c.label = 9;
                            case 9:
                                return [2 /*return*/, response];
                        }
                    });
                });
            },
            signIn: function (input) {
                return __awaiter(this, void 0, void 0, function () {
                    var payloadBeforeCall, response, payloadAfterCall;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                _c.trys.push([0, 2, , 3]);
                                return [
                                    4 /*yield*/,
                                    Session.getInstanceOrThrow().getAccessTokenPayloadSecurely({
                                        userContext: input.userContext,
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
                                return [4 /*yield*/, originalImp.signIn(input)];
                            case 4:
                                response = _c.sent();
                                if (!(response.status === "OK")) return [3 /*break*/, 9];
                                payloadAfterCall = void 0;
                                _c.label = 5;
                            case 5:
                                _c.trys.push([5, 7, , 8]);
                                return [
                                    4 /*yield*/,
                                    Session.getInstanceOrThrow().getAccessTokenPayloadSecurely({
                                        userContext: input.userContext,
                                    }),
                                ];
                            case 6:
                                payloadAfterCall = _c.sent();
                                return [3 /*break*/, 8];
                            case 7:
                                _c.sent();
                                // If getAccessTokenPayloadSecurely threw, that generally means we have no active session
                                payloadAfterCall = undefined;
                                return [3 /*break*/, 8];
                            case 8:
                                onHandleEvent({
                                    action: "SUCCESS",
                                    isNewRecipeUser: false,
                                    createdNewSession:
                                        payloadAfterCall !== undefined &&
                                        (payloadBeforeCall === undefined ||
                                            payloadBeforeCall.sessionHandle !== payloadAfterCall.sessionHandle),
                                    user: response.user,
                                    userContext: input.userContext,
                                });
                                _c.label = 9;
                            case 9:
                                return [2 /*return*/, response];
                        }
                    });
                });
            },
        });
    };
};

export { getFunctionOverrides };
