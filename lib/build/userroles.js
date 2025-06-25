import { PermissionClaim, UserRoleClaim } from 'supertokens-web-js/recipe/userroles';
export { PermissionClaim, UserRoleClaim } from 'supertokens-web-js/recipe/userroles';

var UserRoleAPIWrapper = /** @class */ (function () {
    function UserRoleAPIWrapper() {
    }
    UserRoleAPIWrapper.PermissionClaim = PermissionClaim;
    UserRoleAPIWrapper.UserRoleClaim = UserRoleClaim;
    return UserRoleAPIWrapper;
}());

export { UserRoleAPIWrapper as default };
