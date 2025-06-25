import { __assign } from "../../../../_virtual/_tslib.js";
import { jsx } from "react/jsx-runtime";
import React__default from "react";

var dynamicLoginMethodsContext = React__default.createContext(undefined);
var useDynamicLoginMethods = function () {
    var value = React__default.useContext(dynamicLoginMethodsContext);
    if (value === undefined) {
        throw new Error("useDynamicLoginMethods used outside of a valid provider (FeatureWrapper)");
    }
    return value;
};
var DynamicLoginMethodsProvider = function (_a) {
    var value = _a.value,
        children = _a.children;
    var contextValue = value === undefined ? { loaded: false } : { loaded: true, loginMethods: value };
    return jsx(dynamicLoginMethodsContext.Provider, __assign({ value: contextValue }, { children: children }));
};

export { DynamicLoginMethodsProvider, useDynamicLoginMethods };
