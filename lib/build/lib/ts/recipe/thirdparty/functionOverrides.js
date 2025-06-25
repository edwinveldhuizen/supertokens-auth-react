import { __assign, __awaiter, __generator } from "../../../../_virtual/_tslib.js";
import { getQueryParams, getRedirectToPathFromURL } from "../../utils.js";
import Session from "../session/recipe.js";

var getFunctionOverrides = function (recipeId, onHandleEvent) {
    return function (originalImp) {
        return __assign(__assign({}, originalImp), {
            signInAndUp: function (input) {
                return __awaiter(this, void 0, void 0, function () {
                    var payloadBeforeCall, response, payloadAfterCall;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                _c.trys.push([0, 2, , 3]);
                                return [
                                    4 /*yield*/,
                                    Session.getInstanceOrThrow().getAccessTokenPayloadSecurely({
                                        userContext: input.userContext,
                                    }),
                                ];
                            case 1:
                                payloadBeforeCall = _c.sent();
                                return [3 /*break*/, 3];
                            case 2:
                                _c.sent();
                                // If getAccessTokenPayloadSecurely threw, that generally means we have no active session
                                payloadBeforeCall = undefined;
                                return [3 /*break*/, 3];
                            case 3:
                                return [4 /*yield*/, originalImp.signInAndUp(input)];
                            case 4:
                                response = _c.sent();
                                if (!(response.status === "OK")) return [3 /*break*/, 9];
                                payloadAfterCall = void 0;
                                _c.label = 5;
                            case 5:
                                _c.trys.push([5, 7, , 8]);
                                return [
                                    4 /*yield*/,
                                    Session.getInstanceOrThrow().getAccessTokenPayloadSecurely({
                                        userContext: input.userContext,
                                    }),
                                ];
                            case 6:
                                payloadAfterCall = _c.sent();
                                return [3 /*break*/, 8];
                            case 7:
                                _c.sent();
                                // If getAccessTokenPayloadSecurely threw, that generally means we have no active session
                                payloadAfterCall = undefined;
                                return [3 /*break*/, 8];
                            case 8:
                                onHandleEvent({
                                    action: "SUCCESS",
                                    isNewRecipeUser: response.createdNewRecipeUser,
                                    user: response.user,
                                    createdNewSession:
                                        payloadAfterCall !== undefined &&
                                        (payloadBeforeCall === undefined ||
                                            payloadBeforeCall.sessionHandle !== payloadAfterCall.sessionHandle),
                                    userContext: input.userContext,
                                });
                                _c.label = 9;
                            case 9:
                                return [2 /*return*/, response];
                        }
                    });
                });
            },
            setStateAndOtherInfoToStorage: function (input) {
                var _a;
                var loginChallenge = (_a = getQueryParams("loginChallenge")) !== null && _a !== void 0 ? _a : undefined;
                return originalImp.setStateAndOtherInfoToStorage({
                    state: __assign(__assign({}, input.state), {
                        rid: recipeId,
                        oauth2LoginChallenge: loginChallenge,
                        redirectToPath: getRedirectToPathFromURL(),
                    }),
                    userContext: input.userContext,
                });
            },
        });
    };
};

export { getFunctionOverrides };
