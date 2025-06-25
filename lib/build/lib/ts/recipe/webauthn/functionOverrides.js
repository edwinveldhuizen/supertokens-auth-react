import { __assign, __awaiter, __generator } from "../../../../_virtual/_tslib.js";

var getFunctionOverrides = function (onHandleEvent) {
    return function (originalImp) {
        return __assign(__assign({}, originalImp), {
            getEmailExists: function (input) {
                return __awaiter(this, void 0, void 0, function () {
                    var response;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                return [4 /*yield*/, originalImp.getEmailExists(input)];
                            case 1:
                                response = _a.sent();
                                if (response.status === "OK") {
                                    onHandleEvent({
                                        action: "GET_EMAIL_EXISTS",
                                        exists: response.exists,
                                    });
                                }
                                return [2 /*return*/, response];
                        }
                    });
                });
            },
            registerCredential: function (input) {
                return __awaiter(this, void 0, void 0, function () {
                    var response;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                return [4 /*yield*/, originalImp.registerCredential(input)];
                            case 1:
                                response = _a.sent();
                                if (response.status === "OK") {
                                    onHandleEvent({
                                        action: "REGISTER_CREDENTIAL_OK",
                                    });
                                }
                                return [2 /*return*/, response];
                        }
                    });
                });
            },
            authenticateCredential: function (input) {
                return __awaiter(this, void 0, void 0, function () {
                    var response;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                return [4 /*yield*/, originalImp.authenticateCredential(input)];
                            case 1:
                                response = _a.sent();
                                if (response.status === "OK") {
                                    onHandleEvent({
                                        action: "AUTHENTICATE_CREDENTIAL_OK",
                                    });
                                }
                                return [2 /*return*/, response];
                        }
                    });
                });
            },
            registerCredentialWithSignUp: function (input) {
                return __awaiter(this, void 0, void 0, function () {
                    var response;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                return [4 /*yield*/, originalImp.registerCredentialWithSignUp(input)];
                            case 1:
                                response = _a.sent();
                                if (response.status === "FAILED_TO_REGISTER_USER") {
                                    onHandleEvent({
                                        action: "FAILED_TO_REGISTER_USER",
                                    });
                                }
                                return [2 /*return*/, response];
                        }
                    });
                });
            },
        });
    };
};

export { getFunctionOverrides };
