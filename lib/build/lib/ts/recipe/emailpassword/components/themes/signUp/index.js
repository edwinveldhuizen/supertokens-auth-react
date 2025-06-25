import { __awaiter, __generator, __assign } from '../../../../../../../_virtual/_tslib.js';
import { jsx } from 'react/jsx-runtime';
import STGeneralError from 'supertokens-web-js/lib/build/error';
import { withOverride } from '../../../../../components/componentOverride/withOverride.js';
import SuperTokens from '../../../../../superTokens.js';
import { useUserContext } from '../../../../../usercontext/index.js';
import UserContextWrapper from '../../../../../usercontext/userContextWrapper.js';
import { validateForm } from '../../../../../utils.js';
import { FormBase } from '../../library/formBase.js';
import { ThemeBase } from '../themeBase.js';

var SignUpForm = withOverride("EmailPasswordSignUpForm", function EmailPasswordSignUpForm(props) {
    var _this = this;
    var userContext = useUserContext();
    return (jsx(FormBase, { formFields: props.formFields, clearError: props.clearError, onError: props.onError, onFetchError: props.onFetchError, buttonLabel: "EMAIL_PASSWORD_SIGN_UP_SUBMIT_BTN", onSuccess: props.onSuccess, callAPI: function (formFields) { return __awaiter(_this, void 0, void 0, function () {
            var validationErrors, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, validateForm(formFields, props.config.signInAndUpFeature.signUpForm.formFields)];
                    case 1:
                        validationErrors = _a.sent();
                        if (validationErrors.length > 0) {
                            return [2 /*return*/, {
                                    status: "FIELD_ERROR",
                                    formFields: validationErrors,
                                }];
                        }
                        return [4 /*yield*/, props.recipeImplementation.signUp({
                                formFields: formFields,
                                shouldTryLinkingWithSessionUser: false,
                                userContext: userContext,
                            })];
                    case 2:
                        res = _a.sent();
                        if (res.status === "SIGN_UP_NOT_ALLOWED") {
                            throw new STGeneralError(res.reason);
                        }
                        return [2 /*return*/, res];
                }
            });
        }); }, validateOnBlur: true, showLabels: true, footer: props.footer }));
});
function SignUpTheme(props) {
    var rootStyle = SuperTokens.getInstanceOrThrow().rootStyle;
    var activeStyle = props.config.signInAndUpFeature.signUpForm.style;
    return (jsx(UserContextWrapper, __assign({ userContext: props.userContext }, { children: jsx(ThemeBase, __assign({ userStyles: [rootStyle, props.config.recipeRootStyle, activeStyle] }, { children: jsx(SignUpForm, __assign({}, props)) })) })));
}

export { SignUpForm, SignUpTheme as default };
