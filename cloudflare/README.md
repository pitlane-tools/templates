# Pitlane — Cloudflare Template

A [Remix 3](https://remix.run) guest book starter built with [`pitlane`](https://pitlane.tools/guides), deploying to [Cloudflare Workers](https://developers.cloudflare.com/workers/) with a [D1](https://developers.cloudflare.com/d1/) database. The build runs `pitlane/vite-plugin-remix`; browser scripts and stylesheets resolve through `pitlane/assets`. **[See it live →](https://pitlane-cloudflare.mark-malstrom.workers.dev)**

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
vp run dev # typegen + local D1 migrations, then start the dev server
```

## Documentation for coding agents

After installing dependencies, `node_modules/pitlane/INDEX.md` indexes the guides and package READMEs for the installed version. [AGENTS.md](./AGENTS.md) and the [Pitlane skill](./.agents/skills/pitlane/SKILL.md) point coding agents there.

## Commands

```sh
vp run dev                # dev server (runs typegen and db:migrate first)
vp build                  # production build, written to .cloudflare/output
vp preview                # serve the production build in workerd
vp check                  # format, lint, and type-check
vp run db:migrate         # apply pending migrations to the local D1
vp run db:migrate:remote  # apply pending migrations to the remote D1
vp run db:reset           # remove the local D1 state
vp run typegen:cloudflare # regenerate .cloudflare/types from cloudflare.config.ts
vp run typecheck          # typecheck using tsc
```

## Deploy

Follow the [Cloudflare deploy guide](https://pitlane.tools/deploy/cloudflare). Short version:

1. Sign in, create the D1 database, and copy the id it prints into the `DB` binding in
   [cloudflare.config.ts](./cloudflare.config.ts):

    ```sh
    vpx cf auth login
    vpx cf d1 create --name pitlane-cloudflare-db
    ```

    The id this template ships with belongs to no account. It is still shaped like a real
    one, because `cf d1 migrations apply` takes a database id — a UUIDv4 or 32 hex digits,
    never a name or a binding — and local dev needs something to key its simulated database
    on.

2. Create a Cloudflare API token with Workers and D1 edit permissions and save it as the
   `CLOUDFLARE_API_TOKEN` repository secret on GitHub, and your account id as the
   `CLOUDFLARE_ACCOUNT_ID` repository variable.
3. Push to `main`: CI builds, applies migrations to the remote D1, and deploys the build
   with `cf deploy --prebuilt`.

To deploy from your machine instead:

```sh
vp build
vp run db:migrate:remote
vpx cf deploy --prebuilt --mode production
```

The Vite build always runs in your CI (or locally) — never on Cloudflare. `vp build` writes
Cloudflare's Build Output to `.cloudflare/output`, which is what `cf deploy --prebuilt`
uploads; `--mode production` is the mode that build recorded. Build with Vite+ rather than
`cf build`: `cf build` shells out to `vite build`, and this project's Vite is Vite+, whose
command is `vp`.
