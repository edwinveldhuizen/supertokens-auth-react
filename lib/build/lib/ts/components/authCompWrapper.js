import { __assign } from '../../../_virtual/_tslib.js';
import { jsx } from 'react/jsx-runtime';
import { ComponentOverrideContext } from './componentOverride/componentOverrideContext.js';

function AuthComponentWrapper(_a) {
    var children = _a.children, recipeComponentOverrides = _a.recipeComponentOverrides;
    return (jsx(ComponentOverrideContext.Provider, __assign({ value: recipeComponentOverrides }, { children: children })));
}

export { AuthComponentWrapper as default };
