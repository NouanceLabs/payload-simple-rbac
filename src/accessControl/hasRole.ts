import type { Access } from "payload/types";

export function hasRole<T = any, U = any>(
  role: string,
  allRoles: string[]
): Access<T, U> {
  return async ({ req, id, data }) => {
    const user = req.user;

    const userRole = user?.role;
    if (userRole === role) return true;

    if (allRoles.indexOf(userRole) >= allRoles.indexOf(role)) return true;
    return false;
  };
}
