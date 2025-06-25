import { __assign, __awaiter, __generator } from "../../../../_virtual/_tslib.js";

var getFunctionOverrides = function (onHandleEvent) {
    return function (originalImp) {
        return __assign(__assign({}, originalImp), {
            getLoginChallengeInfo: function (input) {
                return __awaiter(this, void 0, void 0, function () {
                    var response;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                return [4 /*yield*/, originalImp.getLoginChallengeInfo(input)];
                            case 1:
                                response = _a.sent();
                                onHandleEvent({
                                    action: "LOADED_LOGIN_CHALLENGE",
                                    loginChallenge: input.loginChallenge,
                                    loginInfo: response.info,
                                    userContext: input.userContext,
                                });
                                return [2 /*return*/, response];
                        }
                    });
                });
            },
            logOut: function (input) {
                return __awaiter(this, void 0, void 0, function () {
                    var response;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                return [4 /*yield*/, originalImp.logOut(input)];
                            case 1:
                                response = _a.sent();
                                onHandleEvent({
                                    action: "OAUTH2_LOGOUT_SUCCESS",
                                    frontendRedirectTo: response.frontendRedirectTo,
                                    userContext: input.userContext,
                                });
                                return [2 /*return*/, response];
                        }
                    });
                });
            },
        });
    };
};

export { getFunctionOverrides };
