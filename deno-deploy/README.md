# Pitlane — Deno Deploy Template

A [Remix 3](https://remix.run) guest book starter built with [`@pitlane/dev`](https://pitlane.tools/package/dev), running Deno-native — `deno.json` holds every dependency and task, there is no `package.json` — on [Deno Deploy](https://deno.com/deploy) with PostgreSQL via [`remix/data-table`](https://remix.run).

| Runtime | Package manager | Database   | Deploys to                             |
| ------- | --------------- | ---------- | -------------------------------------- |
| Deno    | Deno            | PostgreSQL | [Deno Deploy](https://deno.com/deploy) |

## Scaffold

```sh
npx giget github:pitlane-tools/templates/deno-deploy my-app
cd my-app
```

## Install Deno

This template is Deno-native: [Deno](https://docs.deno.com/runtime/getting_started/installation/) is the runtime, package manager, formatter, and type-checker.

```sh
curl -fsSL https://deno.land/install.sh | sh # or: brew install deno
```

## Getting Started

```sh
deno install --allow-scripts # install dependencies from deno.json
deno task dev                # start PGlite + migrate + dev server
```

## Database

This template uses PostgreSQL in every environment.

For local development, `deno task dev` automatically starts a project-local
[PGlite](https://pglite.dev) database (PostgreSQL compiled to WebAssembly), applies
migrations, and starts the app — no Docker, no Postgres install. The app connects
through a normal `pg` client and the `DATABASE_URL` injected by the dev task; local
data persists in `.data/postgres`.

```sh
deno task dev           # persistent local database in .data/postgres
deno task dev:ephemeral # temporary in-memory database
deno task db:reset      # delete the persistent local database
```

Production requires a real PostgreSQL server, configured as `DATABASE_URL` — Deno
Deploy's managed PostgreSQL provisions one from the dashboard. The same schema,
migrations, and client are used in development and production. Note PGlite's limits:
it multiplexes one underlying connection, so don't treat it as a stand-in for testing
lock contention, pool behavior, or throughput.

## Commands

```sh
deno task dev        # PGlite + migrations + dev server
deno task build      # production build
deno task preview    # serve the production build
deno task db:migrate # apply pending migrations (uses DATABASE_URL)
deno task db:reset   # delete the local PGlite database
deno task check      # type-check the migration script and entrypoint
deno task start      # serve the built app the way Deno Deploy does (main.ts)
deno fmt && deno lint
```

## Deploy

Follow the [Deno Deploy guide](https://pitlane.tools/deploy/deno-deploy). Short version:

1. Create the app once, pointing the entrypoint at [main.ts](./main.ts):

    ```sh
    deno deploy create --org my-org --app my-remix-app \
        --install-command "deno install --allow-scripts" --entrypoint main.ts
    ```

2. Provision a database (**Dashboard → PostgreSQL**) and attach it to the app; set
   `DATABASE_URL` in the app's environment. Also save it as the `DATABASE_URL`
   repository secret so CI can run migrations, and add `DENO_DEPLOY_TOKEN`
   ([console.deno.com](https://console.deno.com) → tokens).
3. Update the app name in [.github/workflows/deploy.yml](./.github/workflows/deploy.yml),
   then push to `main`: CI builds, migrates, and ships `dist/` + `main.ts` with
   `deno deploy --prod`.

To deploy from your machine instead:

```sh
deno task build
deno deploy --app my-remix-app --prod
```

The Vite build always runs in your CI (or locally) — never on Deno Deploy.
