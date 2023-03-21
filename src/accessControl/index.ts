import { hasRole } from "./hasRole";
import { publicAccess } from "./public";
import { publishedOnly } from "./publishedOnly";

function accessControl(
  permission: string | "public" | "publishedOnly",
  roles: string[]
) {
  switch (permission) {
    case "public":
      return publicAccess;
    case "publishedOnly":
      return publishedOnly;
    default:
      return hasRole(permission, roles);
  }
}

export default accessControl;
