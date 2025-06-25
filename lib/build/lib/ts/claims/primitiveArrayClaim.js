import { __extends, __assign } from '../../../_virtual/_tslib.js';
import { PrimitiveArrayClaim as PrimitiveArrayClaim$1 } from 'supertokens-web-js/recipe/session';

var PrimitiveArrayClaim = /** @class */ (function (_super) {
    __extends(PrimitiveArrayClaim, _super);
    function PrimitiveArrayClaim(config) {
        var _this = _super.call(this, config) || this;
        var validatorsWithCallbacks = __assign({}, _this.validators);
        var _loop_1 = function (key) {
            var validator = validatorsWithCallbacks[key];
            validatorsWithCallbacks[key] = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return __assign(__assign({}, validator.apply(void 0, args)), { onFailureRedirection: config.onFailureRedirection, showAccessDeniedOnFailure: config.showAccessDeniedOnFailure });
            };
        };
        for (var key in validatorsWithCallbacks) {
            _loop_1(key);
        }
        _this.validators = validatorsWithCallbacks;
        return _this;
    }
    return PrimitiveArrayClaim;
}(PrimitiveArrayClaim$1));

export { PrimitiveArrayClaim };
