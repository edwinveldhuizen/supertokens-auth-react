import { __assign } from '../../../../../../../_virtual/_tslib.js';
import { jsx, jsxs } from 'react/jsx-runtime';
import { withOverride } from '../../../../../components/componentOverride/withOverride.js';
import { useTranslation } from '../../../../../translation/translationContext.js';

var AuthPageComponentList = withOverride("AuthPageComponentList", function AuthPageComponentList(props) {
    var t = useTranslation();
    var list = [props.authComponents[0]];
    var _loop_1 = function (i) {
        list.push(function () { return (jsxs("div", __assign({ "data-supertokens": "dividerWithOr" }, { children: [jsx("div", { "data-supertokens": "divider" }), jsx("div", __assign({ "data-supertokens": "dividerText" }, { children: t("DIVIDER_OR") })), jsx("div", { "data-supertokens": "divider" })] }), "divider-".concat(i))); });
        list.push(props.authComponents[i]);
    };
    for (var i = 1; i < props.authComponents.length; ++i) {
        _loop_1(i);
    }
    return (jsx("div", __assign({ "data-supertokens": "authComponentList" }, { children: list.map(function (i) {
            return i(__assign({}, props));
        }) })));
});

export { AuthPageComponentList };
