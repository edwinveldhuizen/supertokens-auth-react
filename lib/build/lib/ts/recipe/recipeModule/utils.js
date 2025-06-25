import { __assign, __awaiter, __generator } from '../../../../_virtual/_tslib.js';

function normaliseRecipeModuleConfig(config) {
    var _this = this;
    if (config === undefined) {
        config = {};
    }
    var onHandleEvent = config.onHandleEvent, getRedirectionURL = config.getRedirectionURL, preAPIHook = config.preAPIHook, postAPIHook = config.postAPIHook;
    if (onHandleEvent === undefined) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
        onHandleEvent = function (_) { };
    }
    if (getRedirectionURL === undefined) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        getRedirectionURL = function (_) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, undefined];
        }); }); };
    }
    if (preAPIHook === undefined) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        preAPIHook = function (context) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, context];
        }); }); };
    }
    if (postAPIHook === undefined) {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        postAPIHook = function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); }); };
    }
    var rootStyle = config.style === undefined ? "" : config.style;
    return __assign(__assign({}, config), { getRedirectionURL: getRedirectionURL, onHandleEvent: onHandleEvent, preAPIHook: preAPIHook, postAPIHook: postAPIHook, recipeRootStyle: rootStyle });
}

export { normaliseRecipeModuleConfig };
