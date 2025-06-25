import { __assign } from "../../../../../../_virtual/_tslib.js";
import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import "../../../../../../index.js";
import CheckedIcon from "../../../../components/assets/checkedIcon.js";
import ErrorIcon from "../../../../components/assets/errorIcon.js";
import ShowPasswordIcon from "../../../../components/assets/showPasswordIcon.js";
import { useTranslation } from "../../../../translation/translationContext.js";

var Input = function (_a) {
    var type = _a.type,
        name = _a.name,
        hasError = _a.hasError,
        autoComplete = _a.autoComplete,
        onInputFocus = _a.onInputFocus,
        onInputBlur = _a.onInputBlur,
        onChange = _a.onChange,
        value = _a.value,
        placeholder = _a.placeholder,
        validated = _a.validated,
        autofocus = _a.autofocus;
    var t = useTranslation();
    var _b = useState(false),
        showPassword = _b[0],
        setShowPassword = _b[1];
    /*
     * Method.
     */
    function handleFocus() {
        if (onInputFocus !== undefined) {
            onInputFocus(value);
        }
    }
    function handleBlur() {
        if (onInputBlur !== undefined) {
            onInputBlur(value);
        }
    }
    function handleChange(event) {
        if (onChange) {
            onChange(event.target.value);
        }
    }
    if (autoComplete === undefined) {
        autoComplete = "off";
    }
    var inputType = type;
    if (type === "password" && showPassword === true) {
        inputType = "text";
    }
    return jsx(
        "div",
        __assign(
            { "data-supertokens": "inputContainer" },
            {
                children: jsxs(
                    "div",
                    __assign(
                        { "data-supertokens": ["inputWrapper", hasError ? "inputError" : ""].join(" ") },
                        {
                            children: [
                                jsx("input", {
                                    autoFocus: autofocus,
                                    autoComplete: autoComplete,
                                    "data-supertokens": "input input-".concat(name),
                                    className: "supertokens-input",
                                    onFocus: handleFocus,
                                    onBlur: handleBlur,
                                    type: inputType,
                                    name: name,
                                    placeholder: t(placeholder),
                                    onChange: handleChange,
                                    value: value,
                                }),
                                hasError === true &&
                                    jsx(
                                        "div",
                                        __assign(
                                            { "data-supertokens": "inputAdornment inputAdornmentError" },
                                            { children: jsx(ErrorIcon, {}) }
                                        )
                                    ),
                                validated === true &&
                                    hasError === false &&
                                    jsx(
                                        "div",
                                        __assign(
                                            { "data-supertokens": "inputAdornment inputAdornmentSuccess" },
                                            { children: jsx(CheckedIcon, {}) }
                                        )
                                    ),
                                type === "password" &&
                                    value.length > 0 &&
                                    jsx(
                                        "div",
                                        __assign(
                                            {
                                                onClick: function () {
                                                    return setShowPassword(showPassword === false);
                                                },
                                                "data-supertokens": "inputAdornment showPassword",
                                            },
                                            { children: jsx(ShowPasswordIcon, { showPassword: showPassword }) }
                                        )
                                    ),
                            ],
                        }
                    )
                ),
            }
        )
    );
};

export { Input as default };
