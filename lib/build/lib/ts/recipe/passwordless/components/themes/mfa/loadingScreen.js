import { __assign } from '../../../../../../../_virtual/_tslib.js';
import { jsx } from 'react/jsx-runtime';
import SpinnerIcon from '../../../../../components/assets/spinnerIcon.js';
import { withOverride } from '../../../../../components/componentOverride/withOverride.js';

var OTPLoadingScreen = function () {
    return (jsx("div", __assign({ "data-supertokens": "container delayedRender pwless-mfa loadingScreen" }, { children: jsx("div", __assign({ "data-supertokens": "row" }, { children: jsx("div", __assign({ "data-supertokens": "spinner delayedRender" }, { children: jsx(SpinnerIcon, {}) })) })) })));
};
var LoadingScreen = withOverride("PasswordlessMFAOTPLoadingScreen", OTPLoadingScreen);

export { LoadingScreen };
