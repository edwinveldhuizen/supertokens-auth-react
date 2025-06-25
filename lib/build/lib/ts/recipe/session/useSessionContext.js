import React__default from "react";
import SessionContext from "./sessionContext.js";

var useSessionContext = function () {
    var ctx = React__default.useContext(SessionContext);
    if (ctx.isDefault === true) {
        throw new Error("Cannot use useSessionContext outside auth wrapper components.");
    }
    return ctx;
};

export { useSessionContext as default };
