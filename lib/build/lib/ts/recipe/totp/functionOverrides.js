import { __assign, __awaiter, __generator } from '../../../../_virtual/_tslib.js';

var getFunctionOverrides = function (onHandleEvent) {
    return function (originalImp) { return (__assign(__assign({}, originalImp), { createDevice: function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, originalImp.createDevice(input)];
                        case 1:
                            response = _a.sent();
                            if (response.status === "OK") {
                                onHandleEvent({
                                    action: "TOTP_DEVICE_CREATED",
                                    deviceName: response.deviceName,
                                    userContext: input.userContext,
                                });
                            }
                            return [2 /*return*/, response];
                    }
                });
            });
        }, verifyDevice: function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, originalImp.verifyDevice(input)];
                        case 1:
                            response = _a.sent();
                            if (response.status === "OK") {
                                onHandleEvent({
                                    action: "TOTP_DEVICE_VERIFIED",
                                    deviceName: input.deviceName,
                                    wasAlreadyVerified: response.wasAlreadyVerified,
                                    userContext: input.userContext,
                                });
                            }
                            return [2 /*return*/, response];
                    }
                });
            });
        }, verifyCode: function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, originalImp.verifyCode(input)];
                        case 1:
                            response = _a.sent();
                            if (response.status === "OK") {
                                onHandleEvent({
                                    action: "TOTP_CODE_VERIFIED",
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
