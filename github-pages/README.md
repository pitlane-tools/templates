# Pitlane — GitHub Pages Template

A [Remix 3](https://remix.run) guest book starter that runs entirely in the browser: an ordinary Remix fetch router answers requests with UI nodes through the `render()` middleware from `remix/spa`, and `run()` connects it to the document — no server, no service worker, no HTTP. Navigations and form submissions dispatch through the same in-memory router, and data persists locally in IndexedDB via [`idb-keyval`](https://github.com/jakearchibald/idb-keyval). Once built, it deploys as pure static files.

| Runtime       | Package manager | Database                 | Deploys to                               |
| ------------- | --------------- | ------------------------ | ---------------------------------------- |
| Browser (SPA) | pnpm            | IndexedDB (`idb-keyval`) | [GitHub Pages](https://pages.github.com) |

> [!NOTE]
> This template tracks a preview build of [remix-run/remix#11687](https://github.com/remix-run/remix/pull/11687)
> (client-rendered SPA routing). The `remix` dependency installs
> straight from that PR's preview branch, and `pnpm-workspace.yaml` pins the
> matching `allowBuilds` keys — pnpm only matches git-hosted packages by exact
> commit, so regenerate those keys whenever the preview commit moves.

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

## Architecture

The router is an ordinary Remix fetch router. The `render()` middleware from
`remix/spa` gives every handler a `context.render()` that answers with a UI
node instead of a body, and the transform passed to it wraps each route in the
app's `<Theme />` ([app/router.tsx](./app/router.tsx)). The browser entry
([app/entry.browser.tsx](./app/entry.browser.tsx)) calls `run(router)`, which
dispatches the initial URL and every same-origin navigation and form
submission through that router — POST submissions arrive as an in-memory
`Request` complete with `FormData`.

The guest book is a single form route
([app/actions/guest-book.tsx](./app/actions/guest-book.tsx)): `index` renders
the entry list, `action` writes the new entry and redirects back to `index`,
which `run()` follows in memory before re-rendering. Unknown paths fall through
to the router's `defaultHandler`, which renders the 404 page.

Guest book entries live in the visitor's own browser through `AppStorage`
([app/data/app-storage.ts](./app/data/app-storage.ts)), a small
schema-validated KV layer over IndexedDB.

## Commands

```sh
vp dev              # dev server
vp run build        # production build (static site in dist, incl. 404.html)
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
   SPA `404.html` fallback, and uploads `dist` to Pages.

Deploying to a **user/org page** (`username.github.io`) or a **custom domain**?
Delete the `BASE_PATH` line from the workflow — the app then serves from `/`.

GitHub Pages serves `404.html` (a copy of the app shell) for unknown routes, so
deep links boot the SPA and the router renders the matching page client-side.
