import { __assign, __awaiter, __generator } from '../../../../../../../_virtual/_tslib.js';
import { jsx } from 'react/jsx-runtime';
import { Fragment } from 'react';
import STGeneralError from 'supertokens-web-js/utils/error';
import { withOverride } from '../../../../../components/componentOverride/withOverride.js';
import { useUserContext } from '../../../../../usercontext/index.js';
import { redirectToThirdPartyLogin } from '../../../utils.js';

var ThirdPartySignInAndUpProvidersForm = function (props) {
    var userContext = useUserContext();
    var signInClick = function (providerId) { return __awaiter(void 0, void 0, void 0, function () {
        var response, generalError, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    response = void 0;
                    generalError = void 0;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, redirectToThirdPartyLogin({
                            recipeImplementation: props.recipeImplementation,
                            thirdPartyId: providerId,
                            config: props.config,
                            shouldTryLinkingWithSessionUser: false,
                            userContext: userContext,
                        })];
                case 2:
                    response = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    if (STGeneralError.isThisError(e_1)) {
                        generalError = e_1;
                    }
                    else {
                        throw e_1;
                    }
                    return [3 /*break*/, 4];
                case 4:
                    if (generalError !== undefined) {
                        props.onError(generalError.message);
                    }
                    else {
                        if (response === undefined) {
                            throw new Error("Should not come here");
                        }
                        if (response.status === "ERROR") {
                            props.onError("SOMETHING_WENT_WRONG_ERROR");
                        }
                    }
                    return [3 /*break*/, 6];
                case 5:
                    _a.sent();
                    props.onError("SOMETHING_WENT_WRONG_ERROR");
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    return (jsx(Fragment, { children: props.providers.map(function (provider) {
            return (jsx("div", __assign({ "data-supertokens": "providerContainer" }, { children: jsx("span", __assign({ onClick: function () { return signInClick(provider.id); } }, { children: provider.getButton() })) }), "provider-".concat(provider.id)));
        }) }));
};
var ProvidersForm = withOverride("ThirdPartySignInAndUpProvidersForm", ThirdPartySignInAndUpProvidersForm);

export { ProvidersForm, ThirdPartySignInAndUpProvidersForm };
