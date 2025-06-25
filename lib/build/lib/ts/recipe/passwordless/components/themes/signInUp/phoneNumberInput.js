import { __assign } from '../../../../../../../_virtual/_tslib.js';
import { jsx, jsxs } from 'react/jsx-runtime';
import intlTelInput from '../../../../../../../node_modules/intl-tel-input/index.js';
import phoneNumberInputLibStyles from '../../../../../../../node_modules/intl-tel-input/build/css/intlTelInput.css.js';
import { useCallback, useRef, useEffect } from 'react';
import ErrorIcon from '../../../../../components/assets/errorIcon.js';
import { ST_ROOT_ID } from '../../../../../constants.js';

/*
 * Component.
 */
function PhoneNumberInput(_a) {
    var defaultCountry = _a.defaultCountry, autoComplete = _a.autoComplete, autofocus = _a.autofocus, name = _a.name, onInputBlur = _a.onInputBlur, onInputFocus = _a.onInputFocus, onChange = _a.onChange, hasError = _a.hasError, value = _a.value;
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
    var handleChange = useCallback(function (newValue) {
        onChange(newValue);
    }, [onChange]);
    var handleCountryChange = useCallback(function (ev) {
        onChange(ev.target.value);
    }, [onChange]);
    var inputRef = useRef(null);
    var itiRef = useRef(null);
    useEffect(function () {
        if (inputRef.current !== null && inputRef.current.value !== value && itiRef.current) {
            itiRef.current.setNumber(value);
        }
    }, [itiRef, value]);
    useEffect(function () {
        if (inputRef.current !== null && itiRef.current === null) {
            itiRef.current = intlTelInput(inputRef.current, {
                initialCountry: defaultCountry,
                nationalMode: false,
                preferredCountries: defaultCountry ? [defaultCountry] : [],
            });
            if (value.length > 0) {
                itiRef.current.setNumber(value);
            }
            else if (defaultCountry === undefined) {
                // We set the country to an empty string, because this will display the Unknown flag
                // instead of the first one in the list
                itiRef.current.setCountry("");
            }
            else {
                // if we get here that means that value is empty and defaultCountry is not undefined
                var data = itiRef.current.getSelectedCountryData();
                // In this case we want to also signal to the embedding form that we are prefilling this.
                handleChange("+" + data.dialCode);
            }
            // This is a workaround, since the lib adds the dropdown to the body directly,
            // if it detects a mobile environment, but this doesn't work with our styling if we use shadow dom
            var anyIti = itiRef;
            if (anyIti.isMobile) {
                var root = document.getElementById(ST_ROOT_ID);
                // We only have to do this if we are using shadowDom and we need access to the dom element anyway
                // so passing the shadowroot element here would be both impractical and not too useful
                if (root === null || root === void 0 ? void 0 : root.shadowRoot) {
                    // We can't set the shadowRoot directly as the dropdownContainer, because we need to add a style to it
                    var container = root.shadowRoot.querySelector("[data-supertokens~=container]");
                    if (!container) {
                        throw new Error("Should never happen: container element not found");
                    }
                    container.classList.add("iti-mobile");
                    anyIti.options.dropdownContainer = container;
                }
            }
            inputRef.current.addEventListener("countrychange", handleCountryChange);
        }
    }, []);
    /* eslint-disable react/jsx-no-literals */
    /*
     * Render.
     */
    return (jsxs("div", __assign({ "data-supertokens": "inputContainer" }, { children: [jsxs("style", __assign({ type: "text/css" }, { children: [phoneNumberInputLibStyles, "\n                    .iti__flag {background-image: url(\"https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/img/flags.png\");}\n\n                    @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {\n                        .iti__flag {background-image: url(\"https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/img/flags@2x.png\");}\n                    }\n                "] })), jsxs("div", __assign({ "data-supertokens": "phoneInputWrapper inputWrapper ".concat(hasError ? "inputError" : "") }, { children: [jsx("input", { type: "tel", "data-supertokens": "input input-".concat(name), name: name + "_text", autoFocus: autofocus, autoComplete: autoComplete, onChange: function (ev) {
                            // We do this to ensure that country detection starts working as soon as the user starts typing.
                            // This also replicates how the old lib worked (automatically formatting to an international number)
                            if (ev.target.value.trim().length > 0 && !ev.target.value.trim().startsWith("+")) {
                                ev.target.value = "+" + ev.target.value.trim();
                            }
                            handleChange(ev.target.value);
                        }, onFocus: handleFocus, onBlur: handleBlur, ref: inputRef }), hasError === true && (jsx("div", __assign({ "data-supertokens": "inputAdornment inputAdornmentError" }, { children: jsx(ErrorIcon, {}) })))] }))] })));
    /* eslint-enable react/jsx-no-literals */
}
// TODO: type props
var phoneNumberInputWithInjectedProps = function (injectedProps) {
    return function (props) { return jsx(PhoneNumberInput, __assign({}, injectedProps, props)); };
};

export { PhoneNumberInput as default, phoneNumberInputWithInjectedProps };
