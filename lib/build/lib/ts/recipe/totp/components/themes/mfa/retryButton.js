import { __assign } from '../../../../../../../_virtual/_tslib.js';
import { jsx, jsxs } from 'react/jsx-runtime';
import React__default, { useCallback, useState, useEffect } from 'react';
import { useTranslation } from '../../../../../translation/translationContext.js';

var RetryButton = function (_a) {
    var nextRetryAt = _a.nextRetryAt, onClick = _a.onClick;
    var t = useTranslation();
    var getTimeLeft = useCallback(function () {
        var timeLeft = nextRetryAt - Date.now();
        return timeLeft < 0 ? undefined : Math.ceil(timeLeft / 1000);
    }, [nextRetryAt]);
    var _b = useState(getTimeLeft()), secsUntilRetry = _b[0], setSecsUntilRetry = _b[1];
    useEffect(function () {
        // This runs every time nextRetryAt updates
        var interval = setInterval(function () {
            var timeLeft = getTimeLeft();
            if (timeLeft === undefined) {
                clearInterval(interval);
            }
            setSecsUntilRetry(timeLeft);
        }, 500);
        return function () {
            // This can safely run twice
            clearInterval(interval);
        };
    }, [getTimeLeft, setSecsUntilRetry]);
    return (jsx("button", __assign({ type: "button", disabled: secsUntilRetry !== undefined, onClick: onClick, "data-supertokens": "button retryCodeBtn" }, { children: secsUntilRetry !== undefined ? (jsxs(React__default.Fragment, { children: [t("TOTP_MFA_BLOCKED_TIMER_START"), jsxs("strong", { children: [Math.floor(secsUntilRetry / 60)
                            .toString()
                            .padStart(2, "0"), ":", (secsUntilRetry % 60).toString().padStart(2, "0")] }), t("TOTP_MFA_BLOCKED_TIMER_END")] })) : (t("TOTP_MFA_BLOCKED_RETRY")) })));
};

export { RetryButton };
