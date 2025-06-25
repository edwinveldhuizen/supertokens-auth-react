import { __assign } from '../../../../../../_virtual/_tslib.js';
import { jsx } from 'react/jsx-runtime';

/*
 * Component.
 */
function FormRow(_a) {
    var children = _a.children, hasError = _a.hasError;
    return jsx("div", __assign({ "data-supertokens": ["formRow", hasError ? "hasError" : ""].join(" ") }, { children: children }));
}

export { FormRow as default };
