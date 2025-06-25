import { __assign, __awaiter, __generator } from '../../../../_virtual/_tslib.js';

var getFunctionOverrides = function (onHandleEvent) {
    return function (originalImp) { return (__assign(__assign({}, originalImp), { verifyEmail: function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, originalImp.verifyEmail(input)];
                        case 1:
                            response = _a.sent();
                            if (response.status === "OK") {
                                onHandleEvent({
                                    action: "EMAIL_VERIFIED_SUCCESSFUL",
                                    userContext: input.userContext,
                                });
                            }
                            return [2 /*return*/, response];
                    }
                });
            });
        }, sendVerificationEmail: function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, originalImp.sendVerificationEmail(input)];
                        case 1:
                            response = _a.sent();
                            if (response.status === "OK") {
                                onHandleEvent({
                                    action: "VERIFY_EMAIL_SENT",
                                    userContext: input.userContext,
                                });
                            }
                            return [2 /*return*/, response];
                    }
                });
            });
        } })); };
};

export { getFunctionOverrides };
