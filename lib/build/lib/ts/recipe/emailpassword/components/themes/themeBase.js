import { jsxs } from 'react/jsx-runtime';
import { Fragment } from 'react';
import styles from './styles.css.js';

var ThemeBase = function (_a) {
    var children = _a.children, userStyles = _a.userStyles;
    return (jsxs(Fragment, { children: [children, jsxs("style", { children: [styles, userStyles.join("\n")] })] }));
};

export { ThemeBase };
