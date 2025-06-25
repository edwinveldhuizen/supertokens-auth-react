import { __assign } from '../../../../../../../_virtual/_tslib.js';
import { jsxs, jsx } from 'react/jsx-runtime';
import SomethingWentWrongIcon from '../../../../../components/assets/somethingWentWrongIcon.js';
import { withOverride } from '../../../../../components/componentOverride/withOverride.js';
import { useTranslation } from '../../../../../translation/translationContext.js';

var SignUpSomethingWentWrong = withOverride("WebauthnPasskeySignUpSomethingWentWrong", function SomethingWentWrong(props) {
    var t = useTranslation();
    return (jsxs("div", __assign({ "data-supertokens": "somethingWentWrongContainer" }, { children: [jsx(SomethingWentWrongIcon, {}), jsxs("div", __assign({ "data-supertokens": "somethingWentWrongErrorDetailsContainer" }, { children: [jsx("div", __assign({ "data-supertokens": "label" }, { children: t("WEBAUTHN_UNRECOVERABLE_ERROR") })), jsx("div", { "data-supertokens": "divider" }), jsx("div", __assign({ "data-supertokens": "errorDetails" }, { children: t("WEBAUTHN_UNRECOVERABLE_ERROR_DETAILS") }))] })), jsx("div", __assign({ "data-supertokens": "goBackButtonContainer" }, { children: jsx("a", __assign({ onClick: props.onClick, "data-supertokens": "formLabelLinkBtn errorGoBackLabel" }, { children: t("WEBAUTHN_ERROR_GO_BACK_BUTTON_LABEL") })) }))] })));
});

export { SignUpSomethingWentWrong };
