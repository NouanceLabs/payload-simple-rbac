import { CollectionConfig } from "payload/types";

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
    },
  ],
  timestamps: true,
};

export default Tags;
