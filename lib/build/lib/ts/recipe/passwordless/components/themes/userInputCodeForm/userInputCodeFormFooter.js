import { __assign } from '../../../../../../../_virtual/_tslib.js';
import { jsx, jsxs } from 'react/jsx-runtime';
import { Fragment } from 'react';
import ArrowLeftIcon from '../../../../../components/assets/arrowLeftIcon.js';
import { withOverride } from '../../../../../components/componentOverride/withOverride.js';
import { useTranslation } from '../../../../../translation/translationContext.js';
import { useUserContext } from '../../../../../usercontext/index.js';

var UserInputCodeFormFooter = withOverride("PasswordlessUserInputCodeFormFooter", function PasswordlessUserInputCodeFormFooter(_a) {
    var loginAttemptInfo = _a.loginAttemptInfo, recipeImplementation = _a.recipeImplementation;
    var t = useTranslation();
    var userContext = useUserContext();
    return (jsx(Fragment, { children: jsxs("div", __assign({ "data-supertokens": "secondaryText secondaryLinkWithLeftArrow", onClick: function () {
                return recipeImplementation.clearLoginAttemptInfo({
                    userContext: userContext,
                });
            } }, { children: [jsx(ArrowLeftIcon, { color: "rgb(var(--palette-textPrimary))" }), loginAttemptInfo.contactMethod === "EMAIL"
                    ? t("PWLESS_SIGN_IN_UP_CHANGE_CONTACT_INFO_EMAIL")
                    : t("PWLESS_SIGN_IN_UP_CHANGE_CONTACT_INFO_PHONE")] })) }));
});

export { UserInputCodeFormFooter };
