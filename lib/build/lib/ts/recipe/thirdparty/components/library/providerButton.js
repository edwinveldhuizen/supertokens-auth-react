import { __assign } from '../../../../../../_virtual/_tslib.js';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useRef, useLayoutEffect } from 'react';
import { useTranslation } from '../../../../translation/translationContext.js';

var isTextOverflowing = function (element) {
    return element.scrollWidth > element.clientWidth;
};
function ProviderButton(_a) {
    var logo = _a.logo, providerName = _a.providerName, displayName = _a.displayName;
    var t = useTranslation();
    var providerStyleName = "provider".concat(providerName);
    var buttonTextContainerRef = useRef(null);
    var SCROLL_ANIMATION_CLASS = "scroll-text-animation";
    useLayoutEffect(function () {
        var buttonTextContainer = buttonTextContainerRef.current;
        if (buttonTextContainer && isTextOverflowing(buttonTextContainer)) {
            buttonTextContainer.classList.add(SCROLL_ANIMATION_CLASS);
        }
        var handleResize = function () {
            if (buttonTextContainer) {
                if (isTextOverflowing(buttonTextContainer)) {
                    buttonTextContainer.classList.add(SCROLL_ANIMATION_CLASS);
                }
                else {
                    buttonTextContainer.classList.remove(SCROLL_ANIMATION_CLASS);
                }
            }
        };
        addEventListener("resize", handleResize);
        return function () {
            removeEventListener("resize", handleResize);
        };
    }, []);
    return (jsxs("button", __assign({ "data-supertokens": "button providerButton ".concat(providerStyleName) }, { children: [logo !== undefined && (jsx("div", __assign({ "data-supertokens": "providerButtonLeft" }, { children: jsx("div", __assign({ "data-supertokens": "providerButtonLogo" }, { children: jsx("div", __assign({ "data-supertokens": "providerButtonLogoCenter" }, { children: logo })) })) }))), jsx("div", __assign({ "data-supertokens": "providerButtonText", ref: buttonTextContainerRef }, { children: jsxs("span", { children: [t("THIRD_PARTY_PROVIDER_DEFAULT_BTN_START"), displayName, t("THIRD_PARTY_PROVIDER_DEFAULT_BTN_END")] }) }))] })));
}

export { ProviderButton as default };
