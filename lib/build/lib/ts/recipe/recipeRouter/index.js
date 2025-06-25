import { logDebugMessage } from "../../logger.js";
import SuperTokens from "../../superTokens.js";
import MultiFactorAuth from "../multifactorauth/recipe.js";
import { FactorIds } from "../multifactorauth/types.js";

// The related ADR: https://supertokens.com/docs/contribute/decisions/multitenancy/0006
var priorityOrder = [
    {
        rid: "thirdpartyemailpassword",
        includes: ["thirdparty", "emailpassword"],
        factorsProvided: [FactorIds.THIRDPARTY, FactorIds.EMAILPASSWORD],
    },
    {
        rid: "thirdpartypasswordless",
        includes: ["thirdparty", "passwordless"],
        factorsProvided: [
            FactorIds.THIRDPARTY,
            FactorIds.OTP_PHONE,
            FactorIds.OTP_EMAIL,
            FactorIds.LINK_PHONE,
            FactorIds.LINK_EMAIL,
        ],
    },
    { rid: "emailpassword", includes: ["emailpassword"], factorsProvided: [FactorIds.EMAILPASSWORD] },
    {
        rid: "passwordless",
        includes: ["passwordless"],
        factorsProvided: [FactorIds.OTP_PHONE, FactorIds.OTP_EMAIL, FactorIds.LINK_PHONE, FactorIds.LINK_EMAIL],
    },
    { rid: "thirdparty", includes: ["thirdparty"], factorsProvided: [FactorIds.THIRDPARTY] },
];
function chooseComponentBasedOnFirstFactors(firstFactors, routeComponents) {
    var fallbackRid;
    var fallbackComponent;
    var _loop_1 = function (rid, factorsProvided) {
        if (
            firstFactors.every(function (factor) {
                return factorsProvided.includes(factor);
            })
        ) {
            var matchingComp = routeComponents.find(function (comp) {
                return comp.recipeID === rid;
            });
            if (matchingComp) {
                fallbackRid = rid;
                fallbackComponent = matchingComp;
                if (firstFactors.length === factorsProvided.length) {
                    logDebugMessage(
                        "Rendering ".concat(rid, " because it matches factors: ").concat(firstFactors, " exactly")
                    );
                    return { value: matchingComp };
                }
            }
        }
    };
    // We first try to find an exact match, and fall back on something that covers all factors (but maybe more)
    /*
        Examples:
            1. firstFactors: emailpassword, route components from: thirdparty ->
                - no matches found, throwing error

            2. firstFactors: emailpassword, route components from: thirdpartyemailpassword ->
                - we find thirdpartyemailpassword covers all first factors, save it as fallback
                - we check all other recipes, bot nothing else has matching components
                - return fallback from TPEP

            3. firstFactors: emailpassword, route components from: thirdpartyemailpassword, emailpassword ->
                - we find thirdpartyemailpassword covers all first factors, save it as fallback
                - we find emailpassword as an exact match and return it

            4. firstFactors: otp-phone, route components from: thirdpartypasswordless, passwordless, thirdparty ->
                - we find thirdpartypasswordless covers all first factors (but more), save it as fallback
                - we find passwordless that covers all factors (but more), saving it as a fallback.
                  Keep in mind, that the passwordless and thirdpartypasswordless recipe provides 4 factors, so this is not an exact match.
                - no other recipes have matching components, so we return the fallback from passwordless

            5. firstFactors: thirdparty, otp-phone, route components from: thirdpartypasswordless, passwordless, thirdparty ->
                - we find thirdpartypasswordless covers all first factors (but more), save it as fallback
                  this is not an exact match, because thirdpartypasswordless provides multiple passwordless factors.
                - no other recipes cover all factors, so we return the fallback from thirdpartypasswordless
    */
    for (var _i = 0, priorityOrder_1 = priorityOrder; _i < priorityOrder_1.length; _i++) {
        var _a = priorityOrder_1[_i],
            rid = _a.rid,
            factorsProvided = _a.factorsProvided;
        var state_1 = _loop_1(rid, factorsProvided);
        if (typeof state_1 === "object") return state_1.value;
    }
    if (fallbackComponent !== undefined) {
        logDebugMessage("Rendering ".concat(fallbackRid, " to cover ").concat(firstFactors, " as a fallback"));
        return fallbackComponent;
    }
    // We may get here if:
    // - The backend/tenantconfig is older and didn't have the firstFactors array defined
    // - There is a configuration error
    // We choose not to throw in the configuration error case because:
    // - we can't tell these cases apart after the firstFactors array was made a requrired prop
    // - we want to maintain backwards compatbility
    // Here we replicate the old logic we had before the firstFactors array
    var enabledLoginMethods = [];
    if (firstFactors.includes(FactorIds.EMAILPASSWORD)) {
        enabledLoginMethods.push("emailpassword");
    }
    if (firstFactors.includes(FactorIds.THIRDPARTY)) {
        enabledLoginMethods.push("thirdparty");
    }
    if (
        [FactorIds.OTP_PHONE, FactorIds.OTP_EMAIL, FactorIds.LINK_PHONE, FactorIds.LINK_EMAIL].some(function (
            pwlessFactorId
        ) {
            return firstFactors.includes(pwlessFactorId);
        })
    ) {
        enabledLoginMethods.push("passwordless");
    }
    logDebugMessage("Choosing component using fallback logic w/ ".concat(enabledLoginMethods.join(", "), " enabled"));
    var enabledRecipeCount = enabledLoginMethods.length;
    var _loop_2 = function (rid, includes) {
        if (
            enabledRecipeCount === includes.length &&
            includes.every(function (subRId) {
                return enabledLoginMethods.includes(subRId);
            })
        ) {
            var matchingComp = routeComponents.find(function (comp) {
                return comp.recipeID === rid;
            });
            if (matchingComp) {
                return { value: matchingComp };
            }
        }
    };
    // We try and choose which component to show based on the enabled login methods
    // We first try to find an exact match (a recipe that covers all enabled login methods and nothing else)
    for (var _b = 0, priorityOrder_2 = priorityOrder; _b < priorityOrder_2.length; _b++) {
        var _c = priorityOrder_2[_b],
            rid = _c.rid,
            includes = _c.includes;
        var state_2 = _loop_2(rid, includes);
        if (typeof state_2 === "object") return state_2.value;
    }
    var _loop_3 = function (rid, includes) {
        if (
            includes.some(function (subRId) {
                return enabledLoginMethods.includes(subRId);
            })
        ) {
            var matchingComp = routeComponents.find(function (comp) {
                return comp.recipeID === rid;
            });
            if (matchingComp) {
                return { value: matchingComp };
            }
        }
    };
    // We try to find a partial match (so any recipe that overlaps with the enabled login methods)
    for (var _d = 0, priorityOrder_3 = priorityOrder; _d < priorityOrder_3.length; _d++) {
        var _e = priorityOrder_3[_d],
            rid = _e.rid,
            includes = _e.includes;
        var state_3 = _loop_3(rid, includes);
        if (typeof state_3 === "object") return state_3.value;
    }
    throw new Error("No enabled recipes overlap with the requested firstFactors: " + firstFactors);
}
var RecipeRouter = /** @class */ (function () {
    function RecipeRouter() {
        var _this = this;
        this.getPathsToFeatureComponentWithRecipeIdMap = function () {
            // Memoized version of the map.
            if (_this.pathsToFeatureComponentWithRecipeIdMap !== undefined) {
                return _this.pathsToFeatureComponentWithRecipeIdMap;
            }
            var pathsToFeatureComponentWithRecipeIdMap = {};
            var features = _this.getFeatures();
            var featurePaths = Object.keys(features);
            for (var j = 0; j < featurePaths.length; j++) {
                // If no components yet for this route, initialize empty array.
                var featurePath = featurePaths[j];
                if (pathsToFeatureComponentWithRecipeIdMap[featurePath] === undefined) {
                    pathsToFeatureComponentWithRecipeIdMap[featurePath] = [];
                }
                pathsToFeatureComponentWithRecipeIdMap[featurePath].push(features[featurePath]);
            }
            _this.pathsToFeatureComponentWithRecipeIdMap = pathsToFeatureComponentWithRecipeIdMap;
            return _this.pathsToFeatureComponentWithRecipeIdMap;
        };
        this.requiresSignUpPage = false;
    }
    RecipeRouter.getMatchingComponentForRouteAndRecipeIdFromPreBuiltUIList = function (
        normalisedUrl,
        preBuiltUIList,
        defaultToStaticList,
        dynamicLoginMethods
    ) {
        var path = normalisedUrl.getAsStringDangerous();
        // We check if we are on the auth page to later see if we should take first factors into account.
        var isAuthPage = path === SuperTokens.getInstanceOrThrow().appInfo.websiteBasePath.getAsStringDangerous();
        // We get all components that can handle the current path
        var routeComponents = preBuiltUIList.reduce(function (components, c) {
            var routes = c.getPathsToFeatureComponentWithRecipeIdMap();
            var _loop_4 = function (routePath, routeComps) {
                if (
                    routePath === path ||
                    new RegExp("^" + routePath.replace(/:\w+/g, "[^/]+").replace(/\/\*/g, "/[^/]+") + "$").test(path)
                ) {
                    components = components.concat(
                        routeComps.map(function (c) {
                            return { comp: c, route: routePath };
                        })
                    );
                }
            };
            for (var _i = 0, _a = Object.entries(routes); _i < _a.length; _i++) {
                var _b = _a[_i],
                    routePath = _b[0],
                    routeComps = _b[1];
                _loop_4(routePath, routeComps);
            }
            return components;
        }, []);
        // We check the query params to see if any recipe was requested by id
        var componentMatchingRid = routeComponents.find(function (c) {
            return c.comp.matches();
        });
        // We default to to one requested by id or the first in the list
        // i.e.: the first prebuilt ui in the list the user provided that can handle this route.
        var defaultComp;
        if (routeComponents.length === 0) {
            defaultComp = undefined;
        } else if (componentMatchingRid !== undefined) {
            defaultComp = componentMatchingRid.comp;
        } else {
            defaultComp = routeComponents[0].comp;
        }
        // We check if any non-auth recipe (emailverification, totp) can handle this
        // There should be no overlap between the routes handled by those and the auth recipes
        // so if there is a match we can return early
        var matchingNonAuthComponent = routeComponents.find(function (comp) {
            var ridlist = priorityOrder.map(function (a) {
                return a.rid;
            });
            return (
                !ridlist.includes(comp.comp.recipeID) ||
                comp.route !== SuperTokens.getInstanceOrThrow().appInfo.websiteBasePath.getAsStringDangerous()
            );
        });
        if (matchingNonAuthComponent) {
            return matchingNonAuthComponent.comp;
        }
        // We use this option in `canHandleRoute`, because it may be called by custom UIs before
        // dynamic login methods are loaded.
        if (defaultToStaticList) {
            return defaultComp;
        }
        var mfaRecipe = MultiFactorAuth.getInstance();
        if (SuperTokens.usesDynamicLoginMethods === false) {
            // If we are not using dynamic login methods, we can use the rid requested by the app
            if (componentMatchingRid) {
                return componentMatchingRid.comp;
            }
            // if we have a static firstFactors config we take it into account on the auth page
            // Other pages shouldn't care about this configuration.
            // Embedded components are not affected, since this is only called by the routing component.
            if (isAuthPage && mfaRecipe && mfaRecipe.config.firstFactors !== undefined) {
                return chooseComponentBasedOnFirstFactors(
                    mfaRecipe.config.firstFactors,
                    routeComponents.map(function (c) {
                        return c.comp;
                    })
                );
            } else {
                return defaultComp;
            }
        }
        if (dynamicLoginMethods === undefined) {
            throw new Error(
                "Should never come here: dynamic login methods info has not been loaded but recipeRouter rendered"
            );
        }
        // If we are using dynamic login methods, we check that the requested rid belongs to an enabled recipe
        if (
            componentMatchingRid && // if we find a component matching by rid
            (!priorityOrder
                .map(function (a) {
                    return a.rid;
                })
                .includes(componentMatchingRid.comp.recipeID) || // from a non-auth recipe
                priorityOrder.some(function (a) {
                    return (
                        a.rid === componentMatchingRid.comp.recipeID &&
                        a.factorsProvided.some(function (factorId) {
                            return dynamicLoginMethods.firstFactors.includes(factorId);
                        })
                    );
                })) // or an enabled auth recipe
        ) {
            return componentMatchingRid.comp;
        }
        // if we have a firstFactors config for the tenant we take it into account on the auth page
        // Other pages shouldn't care about this configuration.
        // Embedded components are not affected, since this is only called by the routing component.
        if (isAuthPage) {
            return chooseComponentBasedOnFirstFactors(
                dynamicLoginMethods.firstFactors,
                routeComponents.map(function (c) {
                    return c.comp;
                })
            );
        }
        return undefined;
    };
    return RecipeRouter;
})();

export { RecipeRouter };
