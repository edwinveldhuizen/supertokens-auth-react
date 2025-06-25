import { __assign } from '../../../../../../_virtual/_tslib.js';
import { jsx } from 'react/jsx-runtime';
import { useTranslation } from '../../../../translation/translationContext.js';

function GeneralError(_a) {
    var error = _a.error;
    var t = useTranslation();
    return jsx("div", __assign({ "data-supertokens": "generalError" }, { children: t(error) }));
}

export { GeneralError as default };
