import type { FieldAccess } from "payload/types";
import type { TypeWithID } from "payload/dist/globals/config/types";

export function hasRoleField<T extends TypeWithID = any, P = any, U = any>(
  role: string,
  allRoles: string[]
): FieldAccess<T, P, U> {
  return async ({ req, id, data }) => {
    const user = req.user;

    const userRole = user?.role;

    if (!userRole || !allRoles) return false;

    if (userRole === role) return true;

    if (allRoles.indexOf(userRole) >= allRoles.indexOf(role)) return true;

    return false;
  };
}
