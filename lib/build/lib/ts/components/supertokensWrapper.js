import { __assign } from '../../../_virtual/_tslib.js';
import { jsx } from 'react/jsx-runtime';
import SessionAuthWrapper from '../recipe/session/sessionAuth.js';

var SuperTokensWrapper = function (props) {
    return jsx(SessionAuthWrapper, __assign({}, props, { requireAuth: false, doRedirection: false }));
};

export { SuperTokensWrapper };
