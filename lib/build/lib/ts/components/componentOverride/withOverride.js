import { __assign } from "../../../../_virtual/_tslib.js";
import { jsx } from "react/jsx-runtime";
import { useComponentOverride } from "./useComponentOverride.js";

var withOverride = function (overrideKey, DefaultComponent) {
    var finalKey = overrideKey + "_Override";
    DefaultComponent.displayName = finalKey;
    return function (props) {
        var OverrideComponent = useComponentOverride(finalKey);
        if (OverrideComponent !== null) {
            return jsx(OverrideComponent, __assign({ DefaultComponent: DefaultComponent }, props));
        }
        return jsx(DefaultComponent, __assign({}, props));
    };
};

export { withOverride };
