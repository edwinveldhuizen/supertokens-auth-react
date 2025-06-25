import { __assign, __awaiter, __generator } from '../../../../_virtual/_tslib.js';
import { WindowHandlerReference } from 'supertokens-web-js/utils/windowHandler';
import { MFA_INFO_CACHE_KEY } from './constants.js';

// This is a simple in-memory lock using a promise
// We do not need anything more complex than this, since the cache we are locking is in sessionStorage anyway.
var lockProm = undefined;
var getFunctionOverrides = function (
// eslint-disable-next-line @typescript-eslint/no-unused-vars
_onHandleEvent) {
    return function (originalImp) { return (__assign(__assign({}, originalImp), { resyncSessionAndFetchMFAInfo: function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var stWindow, stored, parsed, unlock, stored_1, parsed, val;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            stWindow = WindowHandlerReference.getReferenceOrThrow();
                            // If someone is refreshing from the server we wait for it to finish.
                            return [4 /*yield*/, lockProm];
                        case 1:
                            // If someone is refreshing from the server we wait for it to finish.
                            _a.sent();
                            return [4 /*yield*/, stWindow.windowHandler.sessionStorage.getItem(MFA_INFO_CACHE_KEY)];
                        case 2:
                            stored = _a.sent();
                            if (stored !== null) {
                                parsed = JSON.parse(stored);
                                if (parsed.t > Date.now() - 1000) {
                                    return [2 /*return*/, __assign(__assign({}, parsed.v), { 
                                            // Adding a fake response is not great, but we do want to add something and this way it's detectable by the app
                                            // so they could even add specific handling for it if they preferred.
                                            fetchResponse: new Response(null, { status: 304 }) })];
                                }
                            }
                            _a.label = 3;
                        case 3:
                            if (!(lockProm !== undefined)) return [3 /*break*/, 5];
                            return [4 /*yield*/, lockProm];
                        case 4:
                            _a.sent();
                            return [3 /*break*/, 3];
                        case 5:
                            lockProm = new Promise(function (res) { return (unlock = res); });
                            _a.label = 6;
                        case 6:
                            _a.trys.push([6, , 11, 12]);
                            return [4 /*yield*/, stWindow.windowHandler.sessionStorage.getItem(MFA_INFO_CACHE_KEY)];
                        case 7:
                            stored_1 = _a.sent();
                            if (stored_1 !== null) {
                                parsed = JSON.parse(stored_1);
                                if (parsed.t > Date.now() - 1000) {
                                    return [2 /*return*/, __assign(__assign({}, parsed.v), { 
                                            // Adding a fake response is not great, but we do want to add something and this way it's detectable by the app
                                            // so they could even add specific handling for it if they preferred.
                                            fetchResponse: new Response(null, { status: 304 }) })];
                                }
                            }
                            return [4 /*yield*/, originalImp.resyncSessionAndFetchMFAInfo(input)];
                        case 8:
                            val = _a.sent();
                            if (!(val.status === "OK")) return [3 /*break*/, 10];
                            // We are not storing the fetchResponse
                            return [4 /*yield*/, stWindow.windowHandler.sessionStorage.setItem(MFA_INFO_CACHE_KEY, JSON.stringify({
                                    t: Date.now(),
                                    v: {
                                        emails: val.emails,
                                        phoneNumbers: val.phoneNumbers,
                                        factors: val.factors,
                                        status: val.status,
                                    },
                                }))];
                        case 9:
                            // We are not storing the fetchResponse
                            _a.sent();
                            _a.label = 10;
                        case 10: return [2 /*return*/, val];
                        case 11:
                            // Release the lock
                            lockProm = undefined;
                            unlock();
                            return [7 /*endfinally*/];
                        case 12: return [2 /*return*/];
                    }
                });
            });
        } })); };
};

export { getFunctionOverrides };
