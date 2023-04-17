import type { Access } from "payload/config";

export function publishedOnly(slugs?: string[]): Access {
  return ({ req: { user } }) => {
    if (slugs) {
      if (user?.collection && slugs.includes(user.collection)) return true;
    } else {
      if (user) return true;
    }

    return {
      _status: {
        equals: "published",
      },
    };
  };
}
