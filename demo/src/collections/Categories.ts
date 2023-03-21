import { CollectionConfig } from "payload/types";

const Categories: CollectionConfig = {
  slug: "categories",
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
  ],
  timestamps: true,
};

export default Categories;
