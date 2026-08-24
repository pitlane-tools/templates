# Pitlane — Railway Template (Deno)

A [Remix 3](https://remix.run) guest book starter built with [`@pitlane/dev`](https://pitlane.tools/package/dev), running Deno-native — `deno.jsonc` holds every dependency and task, there is no `package.json` — with [`node:sqlite`](https://docs.deno.com/api/node/sqlite/) (Deno implements the Node API), containerized for [Railway](https://railway.com).

| Runtime | Package manager | Database      | Deploys to                                 |
| ------- | --------------- | ------------- | ------------------------------------------ |
| Deno    | Deno            | `node:sqlite` | [Railway](https://railway.com), via Docker |

## Scaffold

```sh
npx giget github:pitlane-tools/templates/railway-deno my-app
cd my-app
```

## Install Deno

This template is Deno-native: [Deno](https://docs.deno.com/runtime/getting_started/installation/) is the runtime, package manager, formatter, and type-checker.

```sh
curl -fsSL https://deno.land/install.sh | sh # or: brew install deno
```

## Getting Started

```sh
deno install --allow-scripts # install dependencies from deno.jsonc
deno task dev                # migrate the SQLite database, then start Vite
```

The dev server reads `DATABASE_URL` from [.env](./.env) (defaults to `db/data.db`).

## Commands

```sh
deno task dev        # dev server (runs db:migrate first)
deno task build      # production build
deno task preview    # serve the production build
deno task db:migrate # apply pending migrations
deno task db:reset   # delete the local database
deno task check      # type-check the migration script
deno task start      # serve the built app the way the container does
deno fmt && deno lint
```

## Production

The [Dockerfile](./Dockerfile) installs with Deno, builds, and serves the built fetch
handler with [`deno serve`](https://docs.deno.com/runtime/reference/cli/serve/) —
`dist/ssr/index.js` default-exports an object with `fetch`, which `deno serve` hosts
on `$PORT` directly. No server file needed. Migrations run at container start.

To try the production shape locally:

```sh
deno task build
DATABASE_URL=db/data.db deno -A db/migrate.ts
DATABASE_URL=db/data.db deno task start
```

## Deploy

Follow the [Railway deploy guide](https://pitlane.tools/deploy/railway). Short version:

1. Create an empty Railway project and add a service with a **Docker Image** source
   pointing at `ghcr.io/<user>/<repo>:latest` (make the package public, or add registry
   credentials).
2. Add a [volume](https://docs.railway.com/reference/volumes) mounted at `/data` and set
   the service variable `DATABASE_URL=/data/data.db` so guest book entries survive
   restarts and redeploys.
3. Create a project-scoped token (**Project Settings → Tokens**) and save it as the
   `RAILWAY_TOKEN` repository secret on GitHub.
4. Update the service name in [.github/workflows/deploy.yml](./.github/workflows/deploy.yml),
   then push to `main`: CI builds the image, pushes it to GHCR, and re-pulls it with
   `railway redeploy`.

The Vite build always runs in your CI — never on Railway.
