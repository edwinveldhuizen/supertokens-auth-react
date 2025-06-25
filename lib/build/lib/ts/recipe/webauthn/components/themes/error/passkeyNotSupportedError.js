import { __assign } from '../../../../../../../_virtual/_tslib.js';
import { jsx } from 'react/jsx-runtime';
import { withOverride } from '../../../../../components/componentOverride/withOverride.js';
import { useTranslation } from '../../../../../translation/translationContext.js';

var PasskeyNotSupportedError = withOverride("WebauthnPasskeyNotSupportedError", function () {
    var t = useTranslation();
    return (jsx("div", __assign({ "data-supertokens": "continueWithPasskeyButtonNotSupported" }, { children: t("WEBAUTHN_PASSKEY_NOT_SUPPORTED_BY_BROWSER") })));
});

export { PasskeyNotSupportedError };
