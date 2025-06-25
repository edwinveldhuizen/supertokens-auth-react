import { __awaiter, __generator } from "../../../../_virtual/_tslib.js";
import { WindowHandlerReference } from "supertokens-web-js/utils/windowHandler";

var phoneNumberUtilsImport;
function getPhoneNumberUtils() {
    return __awaiter(this, void 0, void 0, function () {
        var global;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    return [4 /*yield*/, preloadPhoneNumberUtils()];
                case 1:
                    _a.sent();
                    global = WindowHandlerReference.getReferenceOrThrow().windowHandler.getWindowUnsafe();
                    return [2 /*return*/, global.intlTelInputUtils];
            }
        });
    });
}
function preloadPhoneNumberUtils() {
    if (phoneNumberUtilsImport === undefined) {
        /* eslint-disable @typescript-eslint/ban-ts-comment */
        // @ts-ignore: We need to disable no implicit any here, otherwise we'd need to add types for this module
        phoneNumberUtilsImport = import("../../../../node_modules/intl-tel-input/build/js/utils.js");
        /* eslint-enable @typescript-eslint/ban-ts-comment */
    }
    return phoneNumberUtilsImport;
}

export { getPhoneNumberUtils, preloadPhoneNumberUtils };
