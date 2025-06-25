import { useContext } from "react";
import { ComponentOverrideContext } from "./componentOverrideContext.js";

var useComponentOverride = function (overrideKey) {
    var ctx = useContext(ComponentOverrideContext);
    if (ctx === "IS_DEFAULT") {
        throw new Error("Cannot use component override outside ComponentOverrideContext provider.");
    }
    var OverrideComponent = ctx[overrideKey];
    return OverrideComponent === undefined ? null : OverrideComponent;
};

export { useComponentOverride };
