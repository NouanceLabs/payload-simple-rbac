export type Users = string[];

export type Collection = {
  slug: string;
  permissions: {
    read?: string | "public" | "publishedOnly";
    create?: string;
    update?: string;
    delete?: string;
  };
};

export type Global = {
  slug: string;
  permissions: {
    read?: string | "public" | "publishedOnly";
    update?: string;
  };
};

export interface PluginConfig {
  roles: string[];
  users: string[];
  defaultRole: string;
  fieldName?: string;
  collections?: Collection[];
  globals?: Global[];
}

export type SanitizedPluginConfig = PluginConfig & {};
