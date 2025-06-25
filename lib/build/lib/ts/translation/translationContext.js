import { __assign, __awaiter, __generator } from '../../../_virtual/_tslib.js';
import { jsx } from 'react/jsx-runtime';
import React__default, { useContext, useState, useEffect, useCallback } from 'react';
import { mergeObjects } from '../utils.js';
import { getCurrentLanguageFromCookie } from './translationHelpers.js';

var errCB = function () {
    throw new Error("Cannot use translation func outside TranslationContext provider.");
};
var TranslationContext = React__default.createContext({
    translate: errCB,
});
var useTranslation = function () {
    return useContext(TranslationContext).translate;
};
var TranslationContextProvider = function (_a) {
    var children = _a.children, defaultLanguage = _a.defaultLanguage, userTranslationFunc = _a.userTranslationFunc, defaultStore = _a.defaultStore, translationControlEventSource = _a.translationControlEventSource;
    var _b = useState(defaultStore), translationStore = _b[0], setTranslationStore = _b[1];
    var _c = useState(undefined), currentLanguage = _c[0], setCurrentLanguage = _c[1];
    useEffect(function () {
        function loadLanguageFromCookies() {
            return __awaiter(this, void 0, void 0, function () {
                var cookieLang, cookieLangTemp;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, getCurrentLanguageFromCookie()];
                        case 1:
                            cookieLang = _a.sent();
                            cookieLangTemp = cookieLang === null ? defaultLanguage : cookieLang;
                            /**
                             * If current is not undefined, it means that something else has set the language.
                             * For example if the user calls SuperTokens.changeLanguage before this
                             *
                             * We want to use the language preference from cookies only if something else has
                             * not set language before this
                             */
                            setCurrentLanguage(function (current) { return (current !== undefined ? current : cookieLangTemp); });
                            return [2 /*return*/];
                    }
                });
            });
        }
        void loadLanguageFromCookies();
    }, [defaultLanguage, setCurrentLanguage]);
    useEffect(function () {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        var changeHandler = function (_eventName, detail) {
            setCurrentLanguage(detail);
        };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        var loadHandler = function (_eventName, detail) {
            setTranslationStore(function (os) { return mergeObjects(os, detail); });
        };
        translationControlEventSource.on("LanguageChange", changeHandler);
        translationControlEventSource.on("TranslationLoaded", loadHandler);
        return function () {
            translationControlEventSource.off("LanguageChange", changeHandler);
            translationControlEventSource.off("TranslationLoaded", loadHandler);
        };
    });
    var translateFunc = useCallback(function (key) {
        if (userTranslationFunc !== undefined) {
            return userTranslationFunc(key);
        }
        if (currentLanguage !== undefined) {
            var res = translationStore[currentLanguage] && translationStore[currentLanguage][key];
            var fallback = translationStore[defaultLanguage] && translationStore[defaultLanguage][key];
            if (res === undefined) {
                if (fallback !== undefined) {
                    return fallback;
                }
                return key;
            }
            return res;
        }
        throw new Error("Should never come here");
    }, [translationStore, currentLanguage, defaultLanguage, userTranslationFunc]);
    if (currentLanguage === undefined) {
        return null;
    }
    return jsx(TranslationContext.Provider, __assign({ value: { translate: translateFunc } }, { children: children }));
};

export { TranslationContext, TranslationContextProvider, useTranslation };
