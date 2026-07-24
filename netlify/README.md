# Pitlane — Netlify Template

A [Remix 3](https://remix.run) guest book starter built with [`@pitlane/dev`](https://pitlane.tools/package/dev), running on [Netlify](https://www.netlify.com) — static client from the CDN, SSR through one Netlify Function — with PostgreSQL via [Netlify DB](https://docs.netlify.com/build/data-and-storage/netlify-db/).

| Runtime                  | Package manager | Database   | Deploys to                             |
| ------------------------ | --------------- | ---------- | -------------------------------------- |
| Node (Netlify Functions) | pnpm            | PostgreSQL | [Netlify](https://www.netlify.com) |

## Scaffold

```sh
npx giget github:pitlane-tools/templates/netlify my-app
cd my-app
```

## Install Vite+

This template uses [Vite+](https://viteplus.dev) as the canonical toolchain for dev, build, lint, format, and task running. Pick one:

```sh
# Unix script
curl -fsSL https://vite.plus | bash

# Homebrew
brew install vite-plus

# Powershell
irm https://vite.plus/ps1 | iex
```

## Getting Started

```sh
vp install # install dependencies
vp dev     # start PGlite + migrate + dev server (with Netlify platform emulation)
```

## Database

This template uses PostgreSQL in every environment.

For local development, `vp dev` automatically starts a project-local
[PGlite](https://pglite.dev) database (PostgreSQL compiled to WebAssembly), applies
migrations, and starts the app — no Docker, no Postgres install. The app connects
through a normal `pg` client and the `DATABASE_URL` injected by the dev task; local
data persists in `.data/postgres`.

```sh
vp dev               # persistent local database in .data/postgres
vp run dev:ephemeral # temporary in-memory database
vp run db:reset      # delete the persistent local database
```

In production the app reads `NETLIFY_DATABASE_URL`, which
[Netlify DB](https://docs.netlify.com/build/data-and-storage/netlify-db/) injects
after you provision it (one command, Neon-powered):

```sh
vpx netlify-cli db init
```

The same schema, migrations, and client are used in development and production. Note
PGlite's limits: it multiplexes one underlying connection, so don't treat it as a
stand-in for testing lock contention, pool behavior, or throughput.

## Commands

```sh
vp dev               # PGlite + migrations + dev server
vp build             # production build
vp preview           # serve the production build
vp check             # format, lint, and type-check
vp run db:migrate    # apply pending migrations (NETLIFY_DATABASE_URL or DATABASE_URL)
vp run db:reset      # delete the local PGlite database
vp run typecheck     # typecheck using tsc
```

## The server function

[netlify/functions/server.mjs](./netlify/functions/server.mjs) wraps the built fetch
handler in three lines: `path: "/*"` routes every request to the function, and
`preferStatic: true` lets the publish directory (`dist/client`) win first so hashed
assets are served from the CDN. Prefer the edge? See the
[deploy guide](https://pitlane.tools/deploy/netlify) for the Edge Function variant.

## Deploy

Follow the [Netlify deploy guide](https://pitlane.tools/deploy/netlify). Short version:

1. Create and link the site, then provision the database:

    ```sh
    vpx netlify-cli login
    vpx netlify-cli init  # or `link` for an existing site
    vpx netlify-cli db init
    ```

2. Apply migrations to the production database (dev:exec injects the site's env):

    ```sh
    vpx netlify-cli dev:exec -- vp run db:migrate
    ```

3. Add the repository secrets: `NETLIFY_AUTH_TOKEN` (a
   [personal access token](https://app.netlify.com/user/applications)),
   `NETLIFY_SITE_ID` (from `netlify status` or `.netlify/state.json`), and
   `NETLIFY_DATABASE_URL` (from the site's environment variables, for CI migrations).
4. Push to `main`: CI builds, migrates, and ships with `netlify deploy --no-build`.

To deploy from your machine instead:

```sh
vp build
vpx netlify-cli deploy --no-build          # draft URL
vpx netlify-cli deploy --no-build --prod   # production
```

The Vite build always runs in your CI (or locally) — never on Netlify's build system.
