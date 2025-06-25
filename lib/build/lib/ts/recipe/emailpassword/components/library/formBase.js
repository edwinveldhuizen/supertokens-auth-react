import { __spreadArray, __assign, __awaiter, __generator } from '../../../../../../_virtual/_tslib.js';
import { jsx, jsxs } from 'react/jsx-runtime';
import React__default, { useRef, useEffect, useState, useCallback, Fragment, useContext } from 'react';
import { handleCallAPI } from '../../../../utils.js';
import { MANDATORY_FORM_FIELDS_ID_ARRAY } from '../../constants.js';
import Button from './button.js';
import FormRow from './formRow.js';
import Input from './input.js';
import InputError from './inputError.js';
import Label from './label.js';

var fetchDefaultValue = function (field) {
    if (field.getDefaultValue !== undefined) {
        var defaultValue = field.getDefaultValue();
        if (typeof defaultValue !== "string") {
            throw new Error("getDefaultValue for ".concat(field.id, " must return a string"));
        }
        else {
            return defaultValue;
        }
    }
    return "";
};
function InputComponentWrapper(props) {
    var field = props.field, type = props.type, fstate = props.fstate, onInputFocus = props.onInputFocus, onInputBlur = props.onInputBlur, onInputChange = props.onInputChange;
    var useCallbackOnInputFocus = useCallback(function (value) {
        onInputFocus({
            id: field.id,
            value: value,
        });
    }, [onInputFocus, field.id]);
    var useCallbackOnInputBlur = useCallback(function (value) {
        onInputBlur({
            id: field.id,
            value: value,
        });
    }, [onInputBlur, field.id]);
    var useCallbackOnInputChange = useCallback(function (value) {
        onInputChange({
            id: field.id,
            value: value,
        });
    }, [onInputChange, field.id]);
    return field.inputComponent !== undefined ? (jsx(field.inputComponent, { type: type, name: field.id, validated: fstate.validated === true, placeholder: field.placeholder, value: fstate.value, autoComplete: field.autoComplete, autofocus: field.autofocus, onInputFocus: useCallbackOnInputFocus, onInputBlur: useCallbackOnInputBlur, onChange: useCallbackOnInputChange, hasError: fstate.error !== undefined }, field.id)) : (jsx(Input, { type: type, name: field.id, validated: fstate.validated === true, placeholder: field.placeholder, value: fstate.value, autoComplete: field.autoComplete, onInputFocus: useCallbackOnInputFocus, onInputBlur: useCallbackOnInputBlur, onChange: useCallbackOnInputChange, autofocus: field.autofocus, hasError: fstate.error !== undefined }, field.id));
}
var FormBase = function (props) {
    var footer = props.footer, buttonLabel = props.buttonLabel, showLabels = props.showLabels, validateOnBlur = props.validateOnBlur, formFields = props.formFields;
    var unmounting = useRef(new AbortController());
    useEffect(function () {
        // We need this because in some cases this gets called multiple times
        unmounting.current = new AbortController();
        return function () {
            unmounting.current.abort();
        };
    }, [unmounting]);
    var _a = useState(props.formFields.map(function (f) { return ({ id: f.id, value: fetchDefaultValue(f) }); })), fieldStates = _a[0], setFieldStates = _a[1];
    useEffect(function () {
        setFieldStates(function (fs) {
            var ret = fs;
            var fieldsWithoutState = props.formFields.filter(function (f) { return !fieldStates.some(function (s) { return f.id === s.id; }); });
            // If there is a formfield missing from the states array, we fill with the default value
            if (fieldsWithoutState.length > 0) {
                fs = __spreadArray(__spreadArray([], fs, true), fieldsWithoutState.map(function (f) { return ({ id: f.id, value: fetchDefaultValue(f) }); }), true);
            }
            // If a field has been removed from formFields, we want to remove it from the states array as well.
            if (fieldStates.some(function (s) { return !props.formFields.some(function (f) { return f.id === s.id; }); })) {
                ret = fs.filter(function (s) { return props.formFields.some(function (f) { return f.id === s.id; }); });
            }
            return ret;
        });
    }, [props.formFields, setFieldStates]);
    var _b = useState(false), isLoading = _b[0], setIsLoading = _b[1];
    var updateFieldState = useCallback(function (id, update) {
        setFieldStates(function (os) {
            var field = os.find(function (f) { return f.id === id; });
            if (field === undefined) {
                return __spreadArray(__spreadArray([], os, true), [update({ id: id, value: "" })], false);
            }
            return os.filter(function (f) { return f.id !== field.id; }).concat(update(field));
        });
    }, [setFieldStates]);
    var onInputFocus = useCallback(function (field) {
        updateFieldState(field.id, function (os) { return (__assign(__assign({}, os), { validated: false })); });
    }, [updateFieldState]);
    var onInputBlur = useCallback(function (field) { return __awaiter(void 0, void 0, void 0, function () {
        var fieldConfig, error, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!validateOnBlur) {
                        return [2 /*return*/];
                    }
                    fieldConfig = props.formFields.find(function (f) { return f.id === field.id; });
                    if (!(fieldConfig && field.value !== "")) return [3 /*break*/, 2];
                    return [4 /*yield*/, fieldConfig.validate(field.value)];
                case 1:
                    _a = _b.sent();
                    return [3 /*break*/, 3];
                case 2:
                    _a = undefined;
                    _b.label = 3;
                case 3:
                    error = _a;
                    updateFieldState(field.id, function (os) { return (__assign(__assign({}, os), { error: error, validated: error === undefined && field.value.length !== 0 })); });
                    return [2 /*return*/];
            }
        });
    }); }, [validateOnBlur, updateFieldState, props.formFields]);
    var onInputChange = useCallback(function (field) {
        if (typeof field.value !== "string") {
            throw new Error("".concat(field.id, " value must be a string"));
        }
        updateFieldState(field.id, function (os) { return (__assign(__assign({}, os), { value: field.value, error: undefined })); });
        props.clearError();
    }, [updateFieldState]);
    var onFormSubmit = useCallback(function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var apiFields, fieldUpdates, _a, result, generalError, fetchError, _loop_1, _i, _b, field, errorFields_1, getErrorMessage_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    // Prevent default event propagation.
                    e.preventDefault();
                    // Set loading state.
                    setIsLoading(true);
                    setFieldStates(function (os) { return os.map(function (fs) { return (__assign(__assign({}, fs), { error: undefined })); }); });
                    apiFields = formFields === null || formFields === void 0 ? void 0 : formFields.map(function (field) {
                        var fieldState = fieldStates === null || fieldStates === void 0 ? void 0 : fieldStates.find(function (fs) { return fs.id === field.id; });
                        return {
                            id: field.id,
                            value: fieldState === undefined ? "" : fieldState.value,
                        };
                    });
                    fieldUpdates = [];
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, handleCallAPI({
                            apiFields: apiFields,
                            fieldUpdates: fieldUpdates,
                            callAPI: props.callAPI,
                        })];
                case 2:
                    _a = _c.sent(), result = _a.result, generalError = _a.generalError, fetchError = _a.fetchError;
                    if (unmounting === null || unmounting === void 0 ? void 0 : unmounting.current.signal.aborted) {
                        return [2 /*return*/];
                    }
                    if (generalError !== undefined || (result !== undefined && result.status !== "OK")) {
                        _loop_1 = function (field) {
                            var update = fieldUpdates.find(function (f) { return f.id === field.id; });
                            if ((update || field.clearOnSubmit === true) && updateFieldState) {
                                // We can do these one by one, it's almost never more than one field
                                updateFieldState(field.id, function (os) { return (__assign(__assign({}, os), { value: update ? update.value : "" })); });
                            }
                        };
                        for (_i = 0, _b = formFields || []; _i < _b.length; _i++) {
                            field = _b[_i];
                            _loop_1(field);
                        }
                    }
                    if (generalError !== undefined) {
                        props.onError(generalError.message);
                    }
                    else if (fetchError !== undefined) {
                        if (props.onFetchError) {
                            props.onFetchError(fetchError);
                        }
                        else {
                            throw fetchError;
                        }
                    }
                    else {
                        // If successful
                        if (result.status === "OK") {
                            setIsLoading(false);
                            props.clearError();
                            if (props.onSuccess !== undefined) {
                                props.onSuccess(result);
                            }
                        }
                        if (unmounting === null || unmounting === void 0 ? void 0 : unmounting.current.signal.aborted) {
                            return [2 /*return*/];
                        }
                        // If field error.
                        if (result.status === "FIELD_ERROR") {
                            errorFields_1 = result.formFields;
                            getErrorMessage_1 = function (fs) {
                                var _a;
                                var errorMessage = (_a = errorFields_1.find(function (ef) { return ef.id === fs.id; })) === null || _a === void 0 ? void 0 : _a.error;
                                if (errorMessage === "Field is not optional") {
                                    var fieldConfigData = formFields === null || formFields === void 0 ? void 0 : formFields.find(function (f) { return f.id === fs.id; });
                                    // replace non-optional server error message from nonOptionalErrorMsg
                                    if ((fieldConfigData === null || fieldConfigData === void 0 ? void 0 : fieldConfigData.nonOptionalErrorMsg) !== undefined) {
                                        return fieldConfigData === null || fieldConfigData === void 0 ? void 0 : fieldConfigData.nonOptionalErrorMsg;
                                    }
                                }
                                return errorMessage;
                            };
                            setFieldStates(function (os) { return os.map(function (fs) { return (__assign(__assign({}, fs), { error: getErrorMessage_1(fs) })); }); });
                        }
                    }
                    return [3 /*break*/, 5];
                case 3:
                    _c.sent();
                    props.onError("SOMETHING_WENT_WRONG_ERROR");
                    return [3 /*break*/, 5];
                case 4:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); }, [setIsLoading, setFieldStates, props, formFields, fieldStates, updateFieldState]);
    return (jsx(FormStateContext.Provider, __assign({ value: fieldStates }, { children: jsxs("form", __assign({ autoComplete: "on", noValidate: true, onSubmit: onFormSubmit, "data-supertokens": props.formDataSupertokens }, { children: [formFields
                    .filter(function (f) { return f.hidden !== true; })
                    .map(function (field) {
                    var type = "text";
                    // If email or password, replace field type.
                    if (MANDATORY_FORM_FIELDS_ID_ARRAY.includes(field.id)) {
                        type = field.id;
                    }
                    if (field.id === "confirm-password") {
                        type = "password";
                    }
                    var fstate = fieldStates.find(function (s) { return s.id === field.id; }) || {
                        id: field.id,
                        value: fetchDefaultValue(field),
                    };
                    return (jsx(FormRow, __assign({ hasError: fstate.error !== undefined }, { children: jsxs(Fragment, { children: [showLabels &&
                                    (field.labelComponent !== undefined ? (field.labelComponent) : (jsx(Label, { value: field.label, showIsRequired: field.showIsRequired }))), jsx(InputComponentWrapper, { type: type, field: field, fstate: fstate, onInputFocus: onInputFocus, onInputBlur: onInputBlur, onInputChange: onInputChange }), fstate.error && jsx(InputError, { error: fstate.error })] }) }), field.id));
                }), jsx(FormRow, { children: jsxs(Fragment, { children: [jsx(Button, { disabled: isLoading, isLoading: isLoading, type: "submit", label: buttonLabel }), footer] }) }, "form-button")] })) })));
};
var FormStateContext = React__default.createContext(undefined);
var useFormFields = function () {
    var ctx = useContext(FormStateContext);
    if (ctx === undefined) {
        throw new Error("useFormState used outside FormBase");
    }
    return ctx;
};

export { FormBase, FormBase as default, fetchDefaultValue, useFormFields };
