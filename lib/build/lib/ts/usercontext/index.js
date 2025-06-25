import { __assign } from '../../../_virtual/_tslib.js';
import { jsx } from 'react/jsx-runtime';
import React__default, { useState } from 'react';
import { getNormalisedUserContext } from '../utils.js';

var UserContextContext = React__default.createContext(undefined);
var useUserContext = function () {
    return React__default.useContext(UserContextContext);
};
var UserContextProvider = function (_a) {
    var children = _a.children, userContext = _a.userContext;
    var currentUserContext = useState(getNormalisedUserContext(userContext))[0];
    return jsx(UserContextContext.Provider, __assign({ value: currentUserContext }, { children: children }));
};

export { UserContextContext, UserContextProvider, useUserContext };
