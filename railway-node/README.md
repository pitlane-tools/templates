# Pitlane — Railway Template (Node)

A [Remix 3](https://remix.run) guest book starter built with [`@pitlane/dev`](https://pitlane.tools/package/dev), running on Node.js with [`node:sqlite`](https://nodejs.org/api/sqlite.html), containerized for [Railway](https://railway.com).

| Runtime | Package manager | Database      | Deploys to                            |
| ------- | --------------- | ------------- | ------------------------------------- |
| Node.js | pnpm            | `node:sqlite` | [Railway](https://railway.com), via Docker |

## Scaffold

```sh
npx giget github:pitlane-tools/templates/railway-node my-app
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
vp dev     # migrate the SQLite database, then start the dev server
```

The dev server reads `DATABASE_URL` from [.env](./.env) (defaults to `db/data.db`).

## Commands

```sh
vp dev              # dev server (runs db:migrate first)
vp build            # production build
vp preview          # serve the production build
vp check            # format, lint, and type-check
vp run db:migrate   # apply pending migrations
vp run db:reset     # delete the local database
vp run typecheck    # typecheck using tsc
```

## Production

The [Dockerfile](./Dockerfile) builds the app and starts [server.ts](./server.ts) — a
[`remix/node-fetch-server`](https://remix.run) listener around the built fetch handler
in `dist/ssr/index.js`. Railway injects `PORT`; migrations run at container start.

To try the production shape locally:

```sh
vp install --frozen-lockfile
vp build
node db/migrate.ts && node server.ts   # needs DATABASE_URL in the environment
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
