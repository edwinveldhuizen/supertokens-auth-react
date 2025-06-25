import { __assign } from "../../../../../../../_virtual/_tslib.js";
import { jsx } from "react/jsx-runtime";
import AuthComponentWrapper from "../../../../../components/authCompWrapper.js";
import { ContinueWithPasswordlessTheme } from "../../themes/continueWithPasswordless/index.js";

var ContinueWithPasswordlessFeature = function (props) {
    var recipeComponentOverrides = props.useComponentOverrides();
    return jsx(
        AuthComponentWrapper,
        __assign(
            { recipeComponentOverrides: recipeComponentOverrides },
            {
                children: jsx(
                    ContinueWithPasswordlessTheme,
                    __assign({}, props, {
                        continueWithPasswordlessClicked: function () {
                            return props.setFactorList(props.factorIds);
                        },
                        config: props.recipe.config,
                    })
                ),
            }
        )
    );
};

export { ContinueWithPasswordlessFeature, ContinueWithPasswordlessFeature as default };
