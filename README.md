# Payload RBAC Plugin (BETA)

**Needs more testing!**

A plugin for [Payload CMS](https://github.com/payloadcms/payload) to provide a baseline to help handle user roles and permissions.

## Installation

```bash
  yarn add @nouance/payload-simple-rbac
  # OR
  npm i @nouance/payload-simple-rbac
```

## How it works

On the face of it, this plugin only aims to get you up and started with some form of Role-Based Access Control.  
You create an array of roles in **order of priority** with the latter being the most important, for example this means that an admin can do everything an editor can and more but an editor will be limited to their level of access.

## Basic Usage

In the `plugins` array of your [Payload config](https://payloadcms.com/docs/configuration/overview), call the plugin with [options](#options):

```ts
import { buildConfig } from "payload/config";
import payloadSimpleRBAC, { starterRoles } from "@nouance/payload-simple-rbac";

const config = buildConfig({
  // ... rest of my config
  plugins: [
    payloadSimpleRBAC({
      roles: starterRoles,
      users: [Users.slug],
      defaultRole: "editor", // set a default
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
      ],
    }),
  ],
});

export default config;
```

### Options

- `Roles`

  `Array` | **Required**

  An array of roles as strings in order of priority, roles at the end have a higher priority.

- `users`

  `Array` | **Required**

  An array of user slugs to attach the `role` field to.

- `defaultRole`

  `String` | Required

  Set the default role for users to have.

- `fieldName`

  `String` | Optional | Defaults to `role`

  Allows you to configure the machine name of the role field to avoid conflicts.

- `collections`

  `Array` | Optional

  Must contain the following

  - slug : `String`
  - permissions : `read` | `update` | `create` | `delete`

- `globals`

  `Array` | Optional

  Must contain the following

  - slug : `String`
  - permissions : `read` | `update`

### Available permissions

- `role`

  This is your custom role name, any user with the same role or higher will pass this permission.

- `publishedOnly`

  Allow access only to published content, based on [Payload's draft system](https://payloadcms.com/docs/versions/drafts). So your collection must have it enabled.

- `public`

  This allows **full public access**. The actual function is

  ```ts
  publicAccess = () => true;
  ```

### Starter roles

```ts
import { starterRoles } from "@nouance/payload-simple-rbac";

// ...
  roles: starterRoles,
// ...
```

`starterRoles` is an array containing 3 roles, `editor` | `manager` | `admin` .

## Functions

We've exposed our internal functions in case you want to use them in your own code or in combination with other access controls.

- `hasRole`

  Takes in your target role and full list of roles.

  ```ts
  read: hasRole("editor", myRoles);
  ```

- `hasRoleField`

  Takes in your target role and full list of roles. Specifically used for field access control.

  ```ts
  {
    name: "metadata",
    type: "json",
    access: {
      read: hasRoleField("admin", myRoles),
    },
  },
  ```

- `publicAccess`

  Anyone can pass this access control.

  ```ts
  read: publicAccess();
  ```

- `publishedOnly`

  Any logged in user can pass this access control, non-authenticated requests can only pass published checks.
  You can also pass an array of strings for auth collection slugs to limit the auth'd access only to a specific set of users.

  ```ts
  read: publishedOnly();
  ```

  ```ts
  // limited to 'user' collection slug, other auth collections will not pass
  read: publishedOnly(["user"]);
  ```

## Full example

```ts
import { buildConfig } from "payload/config";
import payloadSimpleRBAC from "@nouance/payload-simple-rbac";

const config = buildConfig({
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

export default config;
```

## Development

For development purposes, there is a full working example of how this plugin might be used in the [demo](./demo) of this repo:

```bash
git clone git@github.com:NouanceLabs/payload-simple-rbac.git \
  cd payload-simple-rbac && yarn \
  cd demo && yarn \
  cp .env.example .env \
  vim .env \ # add your creds to this file
  yarn dev
```
