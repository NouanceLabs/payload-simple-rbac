import { hasRole } from "./hasRole";
import { publicAccess } from "./public";
import { publishedOnly } from "./publishedOnly";
import type { Access } from "payload/config";

function accessControl(
  permission: string | "public" | "publishedOnly",
  roles: string[]
): Access {
  switch (permission) {
    case "public":
      return publicAccess();
    case "publishedOnly":
      return publishedOnly();
    default:
      return hasRole(permission, roles);
  }
}

export default accessControl;
