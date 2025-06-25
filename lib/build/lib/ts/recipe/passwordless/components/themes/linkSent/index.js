import { __awaiter, __generator, __assign } from '../../../../../../../_virtual/_tslib.js';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useRef, useEffect, useCallback } from 'react';
import STGeneralError from 'supertokens-web-js/utils/error';
import ArrowLeftIcon from '../../../../../components/assets/arrowLeftIcon.js';
import EmailLargeIcon from '../../../../../components/assets/emailLargeIcon.js';
import SMSLargeIcon from '../../../../../components/assets/smsLargeIcon.js';
import { withOverride } from '../../../../../components/componentOverride/withOverride.js';
import SuperTokens from '../../../../../superTokens.js';
import { useTranslation } from '../../../../../translation/translationContext.js';
import { useUserContext } from '../../../../../usercontext/index.js';
import UserContextWrapper from '../../../../../usercontext/userContextWrapper.js';
import GeneralError from '../../../../emailpassword/components/library/generalError.js';
import { ResendButton } from '../signInUp/resendButton.js';
import { ThemeBase } from '../themeBase.js';

var PasswordlessLinkSent = function (props) {
    var t = useTranslation();
    var userContext = useUserContext();
    var _a = useState(props.error !== undefined ? "ERROR" : "READY"), status = _a[0], setStatus = _a[1];
    // Any because node types are included here, messing with return type of setTimeout
    var resendNotifTimeout = useRef();
    useEffect(function () {
        return function () {
            // This can safely run even if it was cleared before
            if (resendNotifTimeout.current) {
                clearTimeout(resendNotifTimeout.current);
            }
        };
    }, []);
    var resendEmail = useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, generalError, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    props.clearError();
                    response = void 0;
                    generalError = void 0;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, props.recipeImplementation.resendCode({
                            userContext: userContext,
                        })];
                case 2:
                    response = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    if (STGeneralError.isThisError(e_1)) {
                        generalError = e_1;
                    }
                    else {
                        throw e_1;
                    }
                    return [3 /*break*/, 4];
                case 4:
                    if (response !== undefined && response.status === "OK") {
                        setStatus("LINK_RESENT");
                        resendNotifTimeout.current = setTimeout(function () {
                            setStatus(function (status) { return (status === "LINK_RESENT" ? "READY" : status); });
                            resendNotifTimeout.current = undefined;
                        }, 2000);
                    }
                    else {
                        setStatus("ERROR");
                        if (generalError !== undefined) {
                            props.onError(generalError.message);
                        }
                    }
                    return [3 /*break*/, 6];
                case 5:
                    _a.sent();
                    setStatus("ERROR");
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    }); }, [props.recipeImplementation, props.loginAttemptInfo, props.config, setStatus]);
    var resendActive = status === "LINK_RESENT";
    return (jsx("div", __assign({ "data-supertokens": "container" }, { children: jsxs("div", __assign({ "data-supertokens": "row" }, { children: [status === "ERROR" && (jsx(GeneralError, { error: props.error === undefined ? "SOMETHING_WENT_WRONG_ERROR" : props.error })), resendActive && jsx("div", __assign({ "data-supertokens": "generalSuccess" }, { children: t("PWLESS_LINK_SENT_RESEND_SUCCESS") })), jsx("div", __assign({ "data-supertokens": "sendCodeIcon" }, { children: props.loginAttemptInfo.contactMethod === "EMAIL" ? jsx(EmailLargeIcon, {}) : jsx(SMSLargeIcon, {}) })), jsx("div", __assign({ "data-supertokens": "headerTitle headerTinyTitle" }, { children: t("PWLESS_LINK_SENT_RESEND_TITLE") })), jsx("div", { "data-supertokens": "divider" }), jsxs("div", __assign({ "data-supertokens": "primaryText sendCodeText" }, { children: [props.loginAttemptInfo.contactMethod === "EMAIL"
                            ? t("PWLESS_LINK_SENT_RESEND_DESC_START_EMAIL")
                            : t("PWLESS_LINK_SENT_RESEND_DESC_START_PHONE"), jsx("strong", { children: props.loginAttemptInfo.contactInfo }), props.loginAttemptInfo.contactMethod === "EMAIL"
                            ? t("PWLESS_LINK_SENT_RESEND_DESC_END_EMAIL")
                            : t("PWLESS_LINK_SENT_RESEND_DESC_END_PHONE")] })), jsx("div", __assign({ "data-supertokens": "buttonWithArrow", onClick: function () {
                        return props.recipeImplementation.clearLoginAttemptInfo({
                            userContext: userContext,
                        });
                    } }, { children: jsxs("div", __assign({ "data-supertokens": "secondaryText secondaryLinkWithLeftArrow" }, { children: [jsx(ArrowLeftIcon, { color: "rgb(var(--palette-textGray))" }), jsx("span", { children: props.loginAttemptInfo.contactMethod === "EMAIL"
                                    ? t("PWLESS_SIGN_IN_UP_CHANGE_CONTACT_INFO_EMAIL")
                                    : t("PWLESS_SIGN_IN_UP_CHANGE_CONTACT_INFO_PHONE") })] })) })), jsx(ResendButton, { loginAttemptInfo: props.loginAttemptInfo, resendEmailOrSMSGapInSeconds: props.config.signInUpFeature.resendEmailOrSMSGapInSeconds, onClick: resendEmail })] })) })));
};
var LinkSent = withOverride("PasswordlessLinkSent", PasswordlessLinkSent);
function LinkSentWrapper(props) {
    var rootStyle = SuperTokens.getInstanceOrThrow().rootStyle;
    var activeStyle = props.config.signInUpFeature.linkSentScreenStyle;
    return (jsx(UserContextWrapper, __assign({ userContext: props.userContext }, { children: jsx(ThemeBase, __assign({ userStyles: [rootStyle, props.config.recipeRootStyle, activeStyle] }, { children: jsx(LinkSent, __assign({}, props)) })) })));
}

export { LinkSent, LinkSentWrapper as default };
