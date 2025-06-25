import { __assign, __awaiter, __generator } from '../../../../../../../_virtual/_tslib.js';
import { jsx } from 'react/jsx-runtime';
import { useTranslation } from '../../../../../translation/translationContext.js';
import { useFormFields } from '../../../../emailpassword/components/library/formBase.js';

var ContinueWithPasswordlessFooter = function (_a) {
    var onError = _a.onError, onContinueWithPasswordlessClick = _a.onContinueWithPasswordlessClick, validatePhoneNumber = _a.validatePhoneNumber, isPhoneNumber = _a.isPhoneNumber, config = _a.config;
    var state = useFormFields();
    var t = useTranslation();
    if (isPhoneNumber && validatePhoneNumber === undefined) {
        throw new Error("This should never happen: ContinueWithPasswordlessFooter rendered without validatePhoneNumber but isPhoneNumber=true");
    }
    return (jsx("a", __assign({ "data-supertokens": "link linkButton continueWithPasswordlessLink", onClick: function () { return __awaiter(void 0, void 0, void 0, function () {
            var phoneNumber, validationRes, email, validationRes;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!isPhoneNumber) return [3 /*break*/, 2];
                        phoneNumber = (_a = state.find(function (field) { return field.id === "phoneNumber"; })) === null || _a === void 0 ? void 0 : _a.value;
                        if (phoneNumber === undefined) {
                            onError("GENERAL_ERROR_PHONE_UNDEFINED");
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, validatePhoneNumber(phoneNumber)];
                    case 1:
                        validationRes = _c.sent();
                        if (validationRes !== undefined) {
                            onError(validationRes);
                            return [2 /*return*/];
                        }
                        return [2 /*return*/, onContinueWithPasswordlessClick(phoneNumber)];
                    case 2:
                        email = (_b = state.find(function (field) { return field.id === "email"; })) === null || _b === void 0 ? void 0 : _b.value;
                        if (email === undefined) {
                            onError("GENERAL_ERROR_EMAIL_UNDEFINED");
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, config.validateEmailAddress(email)];
                    case 3:
                        validationRes = _c.sent();
                        if (validationRes !== undefined) {
                            onError(validationRes);
                            return [2 /*return*/];
                        }
                        return [2 /*return*/, onContinueWithPasswordlessClick(email)];
                }
            });
        }); } }, { children: t("PWLESS_COMBO_CONTINUE_WITH_PASSWORDLESS_LINK") })));
};

export { ContinueWithPasswordlessFooter };
