import type { Config as PayloadConfig } from "payload/config";
import type { CollectionConfig } from "payload/dist/collections/config/types";
import type { GlobalConfig } from "payload/types";
import type { PluginConfig } from "./types";
import { extendWebpackConfig } from "./utilities/extendWebpackConfig";
import accessControl from "./accessControl/index";
import starterRoles from "./utilities/starterRoles";

const payloadSimpleRBAC =
  (incomingConfig: PluginConfig) =>
  (config: PayloadConfig): PayloadConfig => {
    const { collections, admin } = config;
    const { users, roles, defaultRole, globals } = incomingConfig;

    if (!roles || !users) return config;

    const processedConfig: PayloadConfig = {
      admin: {
        ...admin,
        webpack: extendWebpackConfig(config),
      },
      ...config,
      ...(collections && {
        collections: collections.map((collection) => {
          if (users.includes(collection.slug)) {
            const configWithRoleFields: CollectionConfig = {
              ...collection,
              fields: [
                ...collection.fields,
                {
                  name: "role",
                  type: "select",
                  defaultValue: defaultRole,
                  options: [
                    ...roles.map((role) => {
                      return {
                        label: role,
                        value: role,
                      };
                    }),
                  ],
                },
              ],
            };

            return configWithRoleFields;
          }

          const targetCollection = incomingConfig.collections?.find((col) => {
            if (col.slug === collection.slug) return true;
            return false;
          });

          if (targetCollection) {
            const collectionConfigWithHooks: CollectionConfig = {
              ...collection,
              access: {
                ...collection.access,
                ...(targetCollection.permissions.read && {
                  read: accessControl(targetCollection.permissions.read, roles),
                }),
                ...(targetCollection.permissions.update && {
                  update: accessControl(
                    targetCollection.permissions.update,
                    roles
                  ),
                }),
                ...(targetCollection.permissions.create && {
                  create: accessControl(
                    targetCollection.permissions.create,
                    roles
                  ),
                }),
                ...(targetCollection.permissions.delete && {
                  delete: accessControl(
                    targetCollection.permissions.delete,
                    roles
                  ),
                }),
              },
            };

            return collectionConfigWithHooks;
          }

          return collection;
        }),
      }),
      ...(globals && {
        globals: config.globals?.map((global) => {
          const targetGlobal = globals.find((glob) => {
            return global.slug === glob.slug;
          });

          if (targetGlobal) {
            const globalConfigWithHooks: GlobalConfig = {
              ...global,
              access: {
                ...global.access,
                ...(targetGlobal.permissions.read && {
                  read: accessControl(targetGlobal.permissions.read, roles),
                }),
                ...(targetGlobal.permissions.update && {
                  update: accessControl(targetGlobal.permissions.update, roles),
                }),
              },
            };

            return globalConfigWithHooks;
          }

          return global;
        }),
      }),
    };

    return processedConfig;
  };

export default payloadSimpleRBAC;

export { starterRoles };
