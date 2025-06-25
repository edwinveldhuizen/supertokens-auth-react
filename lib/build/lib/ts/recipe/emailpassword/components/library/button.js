import { __assign } from '../../../../../../_virtual/_tslib.js';
import { jsxs, jsx } from 'react/jsx-runtime';
import '../../../../../../index.js';
import { useTranslation } from '../../../../translation/translationContext.js';

/*
 * Component.
 */
function Button(_a) {
    var type = _a.type, label = _a.label, disabled = _a.disabled, isLoading = _a.isLoading, onClick = _a.onClick, isGreyedOut = _a.isGreyedOut, icon = _a.icon;
    var t = useTranslation();
    if (disabled === undefined) {
        disabled = false;
    }
    // Determine the data-supertokens attribute
    var dataSupertokens = "button";
    if (isGreyedOut) {
        dataSupertokens += " buttonGreyedOut";
    }
    if (icon) {
        dataSupertokens += " buttonWithIcon";
    }
    return (jsxs("button", __assign({ type: type, disabled: disabled, onClick: onClick, "data-supertokens": dataSupertokens }, { children: [icon && jsx("div", { children: icon() }), jsxs("div", { children: [t(label), isLoading && "..."] })] })));
}

export { Button as default };
