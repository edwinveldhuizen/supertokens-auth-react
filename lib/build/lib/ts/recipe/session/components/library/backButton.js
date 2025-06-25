import { __assign } from '../../../../../../_virtual/_tslib.js';
import { jsx } from 'react/jsx-runtime';
import { useTranslation } from '../../../../translation/translationContext.js';

/*
 * Component.
 */
function BackButton(_a) {
    var onClick = _a.onClick;
    var t = useTranslation();
    return (jsx("button", __assign({ onClick: onClick, "data-supertokens": "buttonBase backButton" }, { children: t("GO_BACK") })));
}

export { BackButton as default };
