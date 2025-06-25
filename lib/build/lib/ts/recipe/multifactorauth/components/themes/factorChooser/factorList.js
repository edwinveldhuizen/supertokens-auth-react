import { __assign } from '../../../../../../../_virtual/_tslib.js';
import { jsx } from 'react/jsx-runtime';
import { withOverride } from '../../../../../components/componentOverride/withOverride.js';
import { FactorOption } from './factorOption.js';

var FactorList = withOverride("MFAFactorList", function MFAFactorList(_a) {
    var availableFactors = _a.availableFactors, navigateToFactor = _a.navigateToFactor;
    return (jsx("div", __assign({ "data-supertokens": "row factorChooserList" }, { children: availableFactors.map(function (factor) { return (jsx(FactorOption, { id: factor.id, name: factor.name, description: factor.description, logo: factor.logo, onClick: function () { return navigateToFactor(factor.id); } }, factor.id)); }) })));
});

export { FactorList };
