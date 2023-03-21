import { buildConfig } from "payload/config";
import path from "path";
import Categories from "./collections/Categories";
import Posts from "./collections/Posts";
import Tags from "./collections/Tags";
import Users from "./collections/Users";
import Media from "./collections/Media";
import payloadSimpleRBAC from "../../src/index";

export default buildConfig({
  serverURL: "http://localhost:3000",
  admin: {
    user: Users.slug,
  },
  collections: [Categories, Posts, Tags, Users, Media],
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
  },
  plugins: [
    payloadSimpleRBAC({
      roles: ["customer", "editor", "manager", "admin"],
      users: [Users.slug],
      defaultRole: "customer",
      collections: [
        {
          slug: Posts.slug,
          permissions: {
            read: "publishedOnly",
            update: "editor",
            create: "editor",
            delete: "manager",
          },
        },
        {
          slug: Categories.slug,
          permissions: {
            read: "public",
          },
        },
        {
          slug: Tags.slug,
          permissions: {
            read: "publishedOnly",
            create: "manager",
            update: "manager",
            delete: "admin",
          },
        },
      ],
    }),
  ],
});
