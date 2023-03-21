# Payload RBAC Plugin (BETA)

**Needs more testing!**

A plugin for [Payload CMS](https://github.com/payloadcms/payload) to provide a baseline to help handle user roles and permissions.

Roadmap to stable release:

- ~~Sync collections on create and update~~
- ~~Delete collections~~
- Support all field types of Payload (in progress)
- Support for Payload's draft system (planned)
- Support for nested fields (planned)
- Support Meilisearch index options for filtering and sorting (planned)

## Installation

```bash
  yarn add @nouance/payload-meilisearch
  # OR
  npm i @nouance/payload-meilisearch
```

## Basic Usage

In the `plugins` array of your [Payload config](https://payloadcms.com/docs/configuration/overview), call the plugin with [options](#options):

```js
import { buildConfig } from "payload/config";
import meilisearchPlugin from "@nouance/payload-meilisearch";

const config = buildConfig({
  plugins: [
    meilisearchPlugin({
      host: process.env.MEILISEARCH_HOST,
      apiKey: process.env.MEILISEARCH_API_KEY,
    }),
  ],
});

export default config;
```

### Options

- `host`

  Required. Your Meilisearch host URL.

- `apiKey`

  Required. Your Meilisearch API key. Must have permissions to read, create and delete indexes and documents.

- `sync`

  Required. An array of sync configs. This will automatically configure a sync between Payload collections and Meilisearch indexes. See [sync](#sync) for more details.

- `logs`

  Optional. When `true`, logs sync events to the console as they happen.

## Sync

## Development

For development purposes, there is a full working example of how this plugin might be used in the [demo](./demo) of this repo:

```bash
git clone git@github.com:NouanceLabs/payload-rbac.git \
  cd payload-rbac && yarn \
  cd demo && yarn \
  cp .env.example .env \
  vim .env \ # add your creds to this file
  yarn dev
```
