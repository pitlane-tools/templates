# Pitlane — GitHub Pages Template

A [Remix 3](https://remix.run) guest book starter built with [`@pitlane/dev`](https://pitlane.tools/package/dev) that runs entirely in the browser: the Remix fetch router lives inside a Service Worker, and data persists locally in IndexedDB via [`idb-keyval`](https://github.com/jakearchibald/idb-keyval). Once built, it deploys as pure static files.

| Runtime        | Package manager | Database                 | Deploys to                                  |
| -------------- | --------------- | ------------------------ | ------------------------------------------- |
| Service Worker | pnpm            | IndexedDB (`idb-keyval`) | [GitHub Pages](https://pages.github.com) |

## Scaffold

```sh
npx giget github:pitlane-tools/templates/github-pages my-app
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
vp dev     # start the dev server
```

There is no server and no server database: the router runs in a Service Worker, and
every guest book entry is stored in the visitor's own browser through `AppStorage`
([app/data/app-storage.ts](./app/data/app-storage.ts)), a small schema-validated
KV layer over IndexedDB.

## Commands

```sh
vp dev              # dev server
vp run build        # production build (static site in dist/client, incl. sw.js)
vp preview          # serve the production build
vp check            # format, lint, and type-check
vp run typecheck    # typecheck using tsc
```

## Deploy

Follow the [GitHub Pages deploy guide](https://pitlane.tools/deploy/github-pages).
Short version:

1. In the repository settings, set **Pages → Build and deployment → Source** to
   **GitHub Actions**.
2. Push to `main`. The [workflow](./.github/workflows/deploy.yml) builds with
   `BASE_PATH=/<repo>/` (so the app works at `username.github.io/<repo>/`), adds the
   SPA `404.html` fallback, and uploads `dist/client` to Pages.

Deploying to a **user/org page** (`username.github.io`) or a **custom domain**?
Delete the `BASE_PATH` line from the workflow — the app then serves from `/`.

The service worker registers at the configured base, routes navigations through the
Remix router, and passes asset requests straight to the Pages CDN.
