import { __assign } from '../../../../_virtual/_tslib.js';
import { jsx } from 'react/jsx-runtime';
import React__default from 'react';

var createGenericComponentsOverrideContext = function (v) {
    if (v === void 0) { v = {}; }
    var genericContext = React__default.createContext(v);
    var useComponentsOverrideContext = function () {
        return React__default.useContext(genericContext);
    };
    var Provider = function (_a) {
        var children = _a.children, components = _a.components;
        return jsx(genericContext.Provider, __assign({ value: components }, { children: children }));
    };
    return [useComponentsOverrideContext, Provider, genericContext.Consumer];
};

export { createGenericComponentsOverrideContext };
