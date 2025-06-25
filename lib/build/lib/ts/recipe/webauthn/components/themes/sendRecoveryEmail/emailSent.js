import { __assign } from "../../../../../../../_virtual/_tslib.js";
import { jsxs, jsx } from "react/jsx-runtime";
import { withOverride } from "../../../../../components/componentOverride/withOverride.js";
import { useTranslation } from "../../../../../translation/translationContext.js";

var PasskeyRecoveryEmailSent = withOverride("WebauthnPasskeyRecoveryEmailSent", function (props) {
    var t = useTranslation();
    return jsxs(
        "div",
        __assign(
            { "data-supertokens": "passkeyEmailSentContainer" },
            {
                children: [
                    jsx(
                        "div",
                        __assign({ "data-supertokens": "headerTitle" }, { children: t("WEBAUTHN_EMAIL_SENT_LABEL") })
                    ),
                    jsxs(
                        "div",
                        __assign(
                            { "data-supertokens": "emailSentDescription" },
                            {
                                children: [
                                    t("WEBAUTHN_EMAIL_SENT_LABEL_PRE_EMAIL"),
                                    props.email,
                                    t("WEBAUTHN_EMAIL_SENT_LABEL_POST_EMAIL"),
                                    jsx(
                                        "a",
                                        __assign(
                                            {
                                                onClick: props.onEmailChangeClick,
                                                "data-supertokens": "link linkButton formLabelLinkBtn changeEmailBtn",
                                            },
                                            { children: t("WEBAUTHN_RESEND_OR_CHANGE_EMAIL_LABEL") }
                                        )
                                    ),
                                ],
                            }
                        )
                    ),
                ],
            }
        )
    );
});

export { PasskeyRecoveryEmailSent };
