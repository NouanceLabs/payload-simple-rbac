import type { Access } from "payload/config";

export function publicAccess(): Access {
  return () => true;
}
