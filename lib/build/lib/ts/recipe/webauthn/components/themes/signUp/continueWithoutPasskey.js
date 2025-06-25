import { __assign } from '../../../../../../../_virtual/_tslib.js';
import { jsx } from 'react/jsx-runtime';
import { withOverride } from '../../../../../components/componentOverride/withOverride.js';
import { useTranslation } from '../../../../../translation/translationContext.js';

var ContinueWithoutPasskey = withOverride("WebauthnContinueWithoutPasskey", function ContinueWithoutPasskeyButton(props) {
    var t = useTranslation();
    return (jsx("div", __assign({ "data-supertokens": "continueWithoutPasskey" }, { children: jsx("a", __assign({ onClick: props.onClick, "data-supertokens": "formLabelLinkBtn continueWithoutPasskeyLabel" }, { children: t("WEBAUTHN_CONTINUE_WITHOUT_PASSKEY_BUTTON") })) })));
});

export { ContinueWithoutPasskey };
