import { __assign, __awaiter, __generator } from '../../../../_virtual/_tslib.js';
import { MultiFactorAuthClaimClass as MultiFactorAuthClaimClass$1 } from 'supertokens-web-js/recipe/multifactorauth';
import { logDebugMessage } from '../../logger.js';

var MultiFactorAuthClaimClass = /** @class */ (function () {
    function MultiFactorAuthClaimClass(getRecipe, getRedirectURL, onFailureRedirection) {
        var _this = this;
        this.webJSClaim = new MultiFactorAuthClaimClass$1(function () { return getRecipe().webJSRecipe; });
        this.refresh = this.webJSClaim.refresh;
        this.getLastFetchedTime = this.webJSClaim.getLastFetchedTime;
        this.getValueFromPayload = this.webJSClaim.getValueFromPayload;
        this.id = this.webJSClaim.id;
        var defaultOnFailureRedirection = function (_a) {
            var reason = _a.reason, userContext = _a.userContext;
            return __awaiter(_this, void 0, void 0, function () {
                var recipe, nextFactorOptions, availableFactors, mfaInfo_1, availableFactors;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            recipe = getRecipe();
                            nextFactorOptions = reason.oneOf ||
                                reason.allOfInAnyOrder ||
                                (reason.factorId !== undefined ? [reason.factorId] : undefined);
                            if (!(nextFactorOptions !== undefined)) return [3 /*break*/, 1];
                            logDebugMessage("Redirecting to MFA on next array from validation failure: " + nextFactorOptions.join(", "));
                            availableFactors = recipe
                                .getSecondaryFactors(userContext)
                                .filter(function (v) { return nextFactorOptions.factors.next.includes(v.id); })
                                .map(function (v) { return v.id; });
                            // In this case we got here from a validator that defined the list of validators
                            if (availableFactors.length === 1) {
                                return [2 /*return*/, getRedirectURL({ action: "GO_TO_FACTOR", factorId: availableFactors[0] }, userContext)];
                            }
                            else {
                                return [2 /*return*/, getRedirectURL({ action: "FACTOR_CHOOSER", nextFactorOptions: nextFactorOptions }, userContext)];
                            }
                        case 1: return [4 /*yield*/, recipe.webJSRecipe.resyncSessionAndFetchMFAInfo({ userContext: userContext })];
                        case 2:
                            mfaInfo_1 = _b.sent();
                            availableFactors = recipe
                                .getSecondaryFactors(userContext)
                                .filter(function (v) { return mfaInfo_1.factors.next.includes(v.id); })
                                .map(function (v) { return v.id; });
                            logDebugMessage("Redirecting to MFA on next array from backend: " + availableFactors.join(", "));
                            if (availableFactors.length === 1) {
                                return [2 /*return*/, getRedirectURL({ action: "GO_TO_FACTOR", factorId: availableFactors[0] }, userContext)];
                            }
                            else {
                                return [2 /*return*/, getRedirectURL({ action: "FACTOR_CHOOSER" }, userContext)];
                            }
                        case 3: 
                        // If this happens the user can't complete sign-in (the claim validator fails, but there is no valid next factor for us)
                        // Returning undefined here will make SessionAuth render an access denied screen.
                        return [2 /*return*/, undefined];
                    }
                });
            });
        };
        this.validators = __assign(__assign({}, this.webJSClaim.validators), { hasCompletedMFARequirementsForAuth: function (doRedirection, showAccessDeniedOnFailure) {
                if (doRedirection === void 0) { doRedirection = true; }
                if (showAccessDeniedOnFailure === void 0) { showAccessDeniedOnFailure = true; }
                var orig = _this.webJSClaim.validators.hasCompletedMFARequirementsForAuth();
                return __assign(__assign({}, orig), { showAccessDeniedOnFailure: showAccessDeniedOnFailure, onFailureRedirection: onFailureRedirection !== null && onFailureRedirection !== void 0 ? onFailureRedirection : (function (_a) {
                        var reason = _a.reason, userContext = _a.userContext;
                        return doRedirection ? defaultOnFailureRedirection({ reason: reason, userContext: userContext }) : undefined;
                    }) });
            }, hasCompletedFactors: function (requirements, doRedirection, showAccessDeniedOnFailure) {
                if (doRedirection === void 0) { doRedirection = true; }
                if (showAccessDeniedOnFailure === void 0) { showAccessDeniedOnFailure = true; }
                var orig = _this.webJSClaim.validators.hasCompletedFactors(requirements);
                return __assign(__assign({}, orig), { showAccessDeniedOnFailure: showAccessDeniedOnFailure, onFailureRedirection: onFailureRedirection !== null && onFailureRedirection !== void 0 ? onFailureRedirection : (function (_a) {
                        var reason = _a.reason, userContext = _a.userContext;
                        return doRedirection ? defaultOnFailureRedirection({ reason: reason, userContext: userContext }) : undefined;
                    }) });
            } });
    }
    return MultiFactorAuthClaimClass;
}());

export { MultiFactorAuthClaimClass };
