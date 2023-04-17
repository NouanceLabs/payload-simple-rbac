import { CollectionConfig } from "payload/types";
import { hasRoleField } from "../../../src";
import { myRoles } from "../payload.config";

const Tags: CollectionConfig = {
  slug: "tags",
  admin: {
    useAsTitle: "name",
  },
  access: {
    read: () => true,
  },
  versions: {
    drafts: {
      autosave: true,
    },
  },
  fields: [
    {
      name: "name",
      type: "text",
    },
    {
      name: "metadata",
      type: "json",
      access: {
        read: hasRoleField("admin", myRoles),
      },
    },
  ],
  timestamps: true,
};

export default Tags;
