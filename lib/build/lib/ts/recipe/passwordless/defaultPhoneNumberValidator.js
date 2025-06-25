import { __awaiter, __generator } from "../../../../_virtual/_tslib.js";
import { getPhoneNumberUtils } from "./phoneNumberUtils.js";

// This was moved to a separate file to make tree-shaking more effective, since we do not want to include the phoneNumberUtils
// in the base pwless recipe because it increases the bundle size by a lot
function defaultPhoneNumberValidator(value) {
    return __awaiter(this, void 0, void 0, function () {
        var intlTelInputUtils;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (typeof value !== "string") {
                        return [2 /*return*/, "GENERAL_ERROR_PHONE_NON_STRING"];
                    }
                    value = value.trim();
                    return [4 /*yield*/, getPhoneNumberUtils()];
                case 1:
                    intlTelInputUtils = _a.sent();
                    if (!intlTelInputUtils.isValidNumber(value, undefined)) {
                        return [2 /*return*/, "GENERAL_ERROR_PHONE_INVALID"];
                    }
                    return [2 /*return*/, undefined];
            }
        });
    });
}

export { defaultPhoneNumberValidator };
