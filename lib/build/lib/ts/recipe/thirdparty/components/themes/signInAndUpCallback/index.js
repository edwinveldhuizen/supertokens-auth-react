import { __extends, __assign } from '../../../../../../../_virtual/_tslib.js';
import { jsx } from 'react/jsx-runtime';
import { PureComponent } from 'react';
import SpinnerIcon from '../../../../../components/assets/spinnerIcon.js';
import { withOverride } from '../../../../../components/componentOverride/withOverride.js';
import SuperTokens from '../../../../../superTokens.js';
import { ThemeBase } from '../themeBase.js';

/*
 * Component.
 */
var ThirdPartySignInAndUpCallbackTheme = /** @class */ (function (_super) {
    __extends(ThirdPartySignInAndUpCallbackTheme, _super);
    function ThirdPartySignInAndUpCallbackTheme() {
        /*
         * Methods.
         */
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.render = function () {
            return (jsx("div", __assign({ "data-supertokens": "container" }, { children: jsx("div", __assign({ "data-supertokens": "row" }, { children: jsx("div", __assign({ "data-supertokens": "spinner" }, { children: jsx(SpinnerIcon, {}) })) })) })));
        };
        return _this;
    }
    return ThirdPartySignInAndUpCallbackTheme;
}(PureComponent));
var SignInAndUpCallbackThemeWithOverride = withOverride("ThirdPartySignInAndUpCallbackTheme", ThirdPartySignInAndUpCallbackTheme);
var SignInAndUpCallbackTheme = function (props) {
    var rootStyle = SuperTokens.getInstanceOrThrow().rootStyle;
    return (jsx(ThemeBase, __assign({ userStyles: [rootStyle, props.config.recipeRootStyle, props.config.signInAndUpFeature.style] }, { children: jsx(SignInAndUpCallbackThemeWithOverride, {}) })));
};

export { SignInAndUpCallbackTheme };
