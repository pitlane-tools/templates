# Pitlane — Cloudflare Template

A [Remix 3](https://remix.run) guest book starter built with [`@pitlane/dev`](https://pitlane.tools/package/dev), deploying to [Cloudflare Workers](https://developers.cloudflare.com/workers/) with a [D1](https://developers.cloudflare.com/d1/) database. **[See it live →](https://pitlane-cloudflare.mark-malstrom.workers.dev)**

| Runtime            | Package manager | Database     | Deploys to                                                       |
| ------------------ | --------------- | ------------ | ---------------------------------------------------------------- |
| Cloudflare Workers | pnpm            | `D1Database` | [Cloudflare Workers](https://developers.cloudflare.com/workers/) |

## Scaffold

```sh
npx giget github:pitlane-tools/templates/cloudflare my-app
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

You will also need a [Cloudflare account](https://dash.cloudflare.com/sign-up) to deploy. Local development works without one — dev runs inside [workerd](https://github.com/cloudflare/workerd) against a local D1.

## Getting Started

```sh
vp install # install dependencies
vp dev     # typegen + local D1 migrations, then start the dev server
```

## Commands

```sh
vp dev                    # dev server (runs typegen and db:migrate first)
vp build                  # production build
vp preview                # serve the production build in workerd
vp check                  # format, lint, and type-check
vp run db:migrate         # apply pending migrations to the local D1
vp run db:migrate:remote  # apply pending migrations to the remote D1
vp run db:reset           # remove the local D1 state
vp run typegen:cloudflare # regenerate worker-configuration.d.ts from wrangler.jsonc
vp run typecheck          # typecheck using tsc
```

## Deploy

Follow the [Cloudflare deploy guide](https://pitlane.tools/deploy/cloudflare). Short version:

1. Create the D1 database and copy the printed `database_id` into
   [wrangler.jsonc](./wrangler.jsonc):

    ```sh
    vpx wrangler d1 create pitlane-cloudflare-db
    ```

2. Create a Cloudflare API token with Workers and D1 edit permissions and save it as the
   `CLOUDFLARE_API_TOKEN` repository secret on GitHub.
3. Push to `main`: CI builds, applies migrations to the remote D1, and deploys with
   `wrangler deploy`.

To deploy from your machine instead:

```sh
vp build
vp run db:migrate:remote
vpx wrangler deploy
```

The Vite build always runs in your CI (or locally) — never on Cloudflare.
