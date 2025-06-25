import { __awaiter, __generator } from "../../../../../../../_virtual/_tslib.js";
import { jsx } from "react/jsx-runtime";
import React__default from "react";
import STGeneralError from "supertokens-web-js/utils/error";
import { withOverride } from "../../../../../components/componentOverride/withOverride.js";
import { useUserContext } from "../../../../../usercontext/index.js";
import { FormBase } from "../../../../emailpassword/components/library/formBase.js";
import { totpCodeValidate } from "../../../utils.js";

var CodeForm = withOverride("TOTPCodeForm", function TOTPCodeForm(props) {
    var _this = this;
    var userContext = useUserContext();
    return jsx(React__default.Fragment, {
        children: jsx(FormBase, {
            formDataSupertokens: "totp-mfa codeForm",
            clearError: props.clearError,
            onError: props.onError,
            formFields: [
                {
                    id: "totp",
                    label: "TOTP_CODE_INPUT_LABEL",
                    autofocus: true,
                    optional: false,
                    clearOnSubmit: true,
                    autoComplete: "one-time-code",
                    placeholder: "",
                    validate: totpCodeValidate,
                },
            ],
            onSuccess: props.onSuccess,
            buttonLabel: "TOTP_CODE_CONTINUE_BUTTON",
            callAPI: function (formFields) {
                return __awaiter(_this, void 0, void 0, function () {
                    var totp, response;
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                totp =
                                    (_a = formFields.find(function (field) {
                                        return field.id === "totp";
                                    })) === null || _a === void 0
                                        ? void 0
                                        : _a.value;
                                if (totp === undefined || totp.length === 0) {
                                    throw new STGeneralError("GENERAL_ERROR_TOTP_UNDEFINED");
                                }
                                if (!props.featureState.deviceInfo) return [3 /*break*/, 2];
                                return [
                                    4 /*yield*/,
                                    props.recipeImplementation.verifyDevice({
                                        deviceName: props.featureState.deviceInfo.deviceName,
                                        totp: totp,
                                        userContext: userContext,
                                    }),
                                ];
                            case 1:
                                response = _b.sent();
                                return [3 /*break*/, 4];
                            case 2:
                                return [
                                    4 /*yield*/,
                                    props.recipeImplementation.verifyCode({
                                        totp: totp,
                                        userContext: userContext,
                                    }),
                                ];
                            case 3:
                                response = _b.sent();
                                _b.label = 4;
                            case 4:
                                // We can return these statuses, since they all cause a redirection or are handled elsewhere
                                // so we don't really want to show anything
                                if (
                                    response.status === "OK" ||
                                    response.status === "UNKNOWN_DEVICE_ERROR" ||
                                    response.status === "LIMIT_REACHED_ERROR" ||
                                    response.status === "INVALID_TOTP_ERROR"
                                ) {
                                    return [2 /*return*/, response];
                                }
                                throw new STGeneralError("SOMETHING_WENT_WRONG_ERROR");
                        }
                    });
                });
            },
            validateOnBlur: false,
            showLabels: true,
            footer: props.footer,
        }),
    });
});

export { CodeForm };
