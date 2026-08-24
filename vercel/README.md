# Pitlane — Vercel Template

A [Remix 3](https://remix.run) guest book starter built with [`@pitlane/dev`](https://pitlane.tools/package/dev), packaged for [Vercel](https://vercel.com) by [Nitro](https://nitro.build), with PostgreSQL via [`remix/data-table`](https://remix.run).

| Runtime                 | Package manager | Database   | Deploys to                   |
| ----------------------- | --------------- | ---------- | ---------------------------- |
| Node (Vercel Functions) | pnpm            | PostgreSQL | [Vercel](https://vercel.com) |

## Scaffold

```sh
npx giget github:pitlane-tools/templates/vercel my-app
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
vp dev     # start PGlite + migrate + dev server
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

Production requires a real PostgreSQL server, configured as `DATABASE_URL`. The same
schema, migrations, and client are used in development and production. Note PGlite's
limits: it multiplexes one underlying connection, so don't treat it as a stand-in for
testing lock contention, pool behavior, or throughput.

## Commands

```sh
vp dev               # PGlite + migrations + dev server
vp build             # production build (Nitro portable output)
vp preview           # preview the production build
vp check             # format, lint, and type-check
vp run db:migrate    # apply pending migrations (uses DATABASE_URL)
vp run db:reset      # delete the local PGlite database
vp run typecheck     # typecheck using tsc
```

## Deploy

Follow the [Vercel deploy guide](https://pitlane.tools/deploy/vercel). Short version:

1. Provision a PostgreSQL database — the [Vercel Marketplace](https://vercel.com/marketplace)
   Neon integration works well — and note its connection string.
2. Link the project once locally, which creates the IDs CI needs:

    ```sh
    vpx vercel login
    vpx vercel link
    ```

3. Add the repository secrets: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`
   (the IDs are in `.vercel/project.json` after linking), and `DATABASE_URL` (for CI
   migrations; also set it in the Vercel project environment for the runtime).
4. Push to `main`: CI pulls project config, migrates, builds with `vercel build`, and
   uploads the artifact with `vercel deploy --prebuilt`.

To deploy from your machine instead:

```sh
vpx vercel pull --yes --environment=production
vp run db:migrate # with DATABASE_URL pointing at production
vpx vercel build --prod && vpx vercel deploy --prebuilt --prod
```

The Vite build always runs in your CI (or locally) — never on Vercel.
