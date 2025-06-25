import { __assign } from '../../../../../../../_virtual/_tslib.js';
import { jsx, jsxs } from 'react/jsx-runtime';
import FingerPrintIcon from '../../../../../components/assets/fingerPrintIcon.js';
import MultipleDevicesIcon from '../../../../../components/assets/multipleDevicesIcon.js';
import SecurityIcon from '../../../../../components/assets/securityIcon.js';
import { withOverride } from '../../../../../components/componentOverride/withOverride.js';
import { useTranslation } from '../../../../../translation/translationContext.js';

var blockDetails = [
    {
        title: "WEBAUTHN_FEATURE_BLOCK_NO_NEED_TO_REMEMBER_PASSWORD",
        subText: "WEBAUTHN_FEATURE_BLOCK_NO_NEED_TO_REMEMBER_PASSWORD_DETAIL",
        icon: jsx(FingerPrintIcon, {}),
    },
    {
        title: "WEBAUTHN_FEATURE_BLOCK_WORKS_ON_ALL_DEVICES",
        subText: "WEBAUTHN_FEATURE_BLOCK_WORKS_ON_ALL_DEVICES_DETAIL",
        icon: jsx(MultipleDevicesIcon, {}),
    },
    {
        title: "WEBAUTHN_FEATURE_BLOCK_KEEP_ACCOUNT_SAFER",
        subText: "WEBAUTHN_FEATURE_BLOCK_KEEP_ACCOUNT_SAFER_DETAIL",
        icon: jsx(SecurityIcon, {}),
    },
];
var PasskeyFeatureBlock = withOverride("WebauthnPasskeyFeatureBlock", function FeatureBlock(props) {
    var t = useTranslation();
    return (jsxs("div", __assign({ "data-supertokens": "passkeyFeatureBlock" }, { children: [jsx("div", __assign({ "data-supertokens": "passkeyFeatureBlockIcon" }, { children: props.icon })), jsxs("div", __assign({ "data-supertokens": "passkeyFeatureBlockDetails" }, { children: [jsx("div", __assign({ "data-supertokens": "passkeyFeatureBlockTitle" }, { children: t(props.title) })), jsx("div", __assign({ "data-supertokens": "passkeyFeatureBlockSubText" }, { children: t(props.subText) }))] }))] })));
});
var PasskeyFeatureBlockList = function () {
    return (jsx("div", __assign({ "data-supertokens": "passkeyFeatureBlocksContainer" }, { children: blockDetails.map(function (blockDetail) { return (jsx(PasskeyFeatureBlock, __assign({}, blockDetail))); }) })));
};

export { PasskeyFeatureBlock, PasskeyFeatureBlockList };
