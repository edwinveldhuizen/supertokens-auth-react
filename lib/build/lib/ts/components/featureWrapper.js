import { __assign } from '../../../_virtual/_tslib.js';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ST_ROOT_ID } from '../constants.js';
import DynamicLoginMethodsSpinner from '../recipe/multitenancy/components/features/dynamicLoginMethodsSpinner/index.js';
import { DynamicLoginMethodsProvider } from '../recipe/multitenancy/dynamicLoginMethodsContext.js';
import Multitenancy from '../recipe/multitenancy/recipe.js';
import SuperTokens from '../superTokens.js';
import { TranslationContextProvider } from '../translation/translationContext.js';
import { useUserContext } from '../usercontext/index.js';
import { useRethrowInRender, mergeObjects } from '../utils.js';

function FeatureWrapper(_a) {
    var children = _a.children, useShadowDom = _a.useShadowDom, defaultStore = _a.defaultStore;
    var userContext = useUserContext();
    var rethrowInRender = useRethrowInRender();
    var _b = useState(undefined), loadedDynamicLoginMethods = _b[0], setLoadedDynamicLoginMethods = _b[1];
    var st = SuperTokens.getInstanceOrThrow();
    useEffect(function () {
        if (loadedDynamicLoginMethods) {
            return;
        }
        Multitenancy.getInstanceOrThrow()
            .getCurrentDynamicLoginMethods({ userContext: userContext })
            .then(function (loginMethods) { return setLoadedDynamicLoginMethods(loginMethods); }, function (err) { return rethrowInRender(err); });
    }, [loadedDynamicLoginMethods, setLoadedDynamicLoginMethods]);
    if (SuperTokens.usesDynamicLoginMethods && !loadedDynamicLoginMethods) {
        return jsx(DynamicLoginMethodsSpinner, {});
    }
    return (jsx(DynamicLoginMethodsProvider, __assign({ value: loadedDynamicLoginMethods }, { children: jsx(TranslationContextProvider, __assign({ defaultLanguage: st.languageTranslations.defaultLanguage, defaultStore: mergeObjects(defaultStore, st.languageTranslations.userTranslationStore), translationControlEventSource: st.languageTranslations.translationEventSource, userTranslationFunc: st.languageTranslations.userTranslationFunc }, { children: jsx(WithOrWithoutShadowDom, __assign({ useShadowDom: useShadowDom }, { children: children })) })) })));
}
function WithShadowDom(_a) {
    var children = _a.children;
    var rootDiv = useRef(null);
    var _b = useState(), shadowRoot = _b[0], setShadowRoot = _b[1];
    useEffect(function () {
        if (rootDiv.current) {
            // defaults from react-shadow
            setShadowRoot(function (os) {
                return os ||
                    rootDiv.current.shadowRoot ||
                    rootDiv.current.attachShadow({ mode: "open", delegatesFocus: false });
            });
        }
    }, [rootDiv]);
    // Otherwise, use shadow dom.
    return (jsx("div", __assign({ id: ST_ROOT_ID, ref: rootDiv }, { children: shadowRoot && createPortal(children, shadowRoot) })));
}
function WithOrWithoutShadowDom(_a) {
    var children = _a.children, useShadowDom = _a.useShadowDom;
    // If explicitely specified to not use shadow dom.
    if (useShadowDom === false) {
        return (jsxs("div", __assign({ id: ST_ROOT_ID }, { children: [children, jsx(DisableAutoFillInput, {})] })));
    }
    return (jsxs(WithShadowDom, { children: [children, jsx(DisableAutoFillInput, {})] }));
}
function DisableAutoFillInput() {
    /* eslint-disable react/jsx-no-literals */
    return (jsx("style", __assign({ type: "text/css" }, { children: "input.supertokens-input:-webkit-autofill,input.supertokens-input:-webkit-autofill:focus,input.supertokens-input:-webkit-autofill:hover,select:-webkit-autofill,select:-webkit-autofill:focus,select:-webkit-autofill:hover,textarea:-webkit-autofill,textarea:-webkit-autofill:focus,textarea:-webkit-autofill:hover{transition:background-color 5000s ease-in-out 0s}" })));
    /* eslint-enable react/jsx-no-literals */
}

export { WithOrWithoutShadowDom, FeatureWrapper as default };
