import { Access, FieldAccess } from "payload/types";

export const hasRole =
  (role: string, allRoles: string[]): Access<any> =>
  async ({ req, id, data }) => {
    const user = req.user;

    const userRole = user?.role;
    if (userRole === role) return true;

    if (allRoles.indexOf(userRole) >= allRoles.indexOf(role)) return true;
    return false;
  };
