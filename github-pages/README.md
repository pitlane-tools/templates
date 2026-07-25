# Pitlane — GitHub Pages Template

A [Remix 3](https://remix.run) guest book starter that runs entirely in the browser: the Remix fetch router returns UI nodes directly — no server, no service worker, no HTTP — and the `SPA` component from `remix/ui/spa` renders them, intercepting navigations and form submissions. Frames resolve through the same in-memory router, and data persists locally in IndexedDB via [`idb-keyval`](https://github.com/jakearchibald/idb-keyval). Once built, it deploys as pure static files.

| Runtime       | Package manager | Database                 | Deploys to                               |
| ------------- | --------------- | ------------------------ | ---------------------------------------- |
| Browser (SPA) | pnpm            | IndexedDB (`idb-keyval`) | [GitHub Pages](https://pages.github.com) |

> [!NOTE]
> This template tracks a preview build of [remix-run/remix#11629](https://github.com/remix-run/remix/pull/11629)
> (SPA routing with custom fetch router outputs). The `remix` dependency installs
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

The router declares `RouterTypes.output = RemixNode`, so handlers return JSX
instead of Responses ([app/router.tsx](./app/router.tsx)). The browser entry
([app/entry.browser.tsx](./app/entry.browser.tsx)) renders an `SPA` component
that dispatches every same-origin navigation and form submission through the
router — POST submissions arrive as an in-memory `Request` complete with
`FormData`.

Frames work the same way they do on a server: the guest book page is a
`<Frame name="welcome">` shell, and the frame's `src` resolves through the
router with the frame name in the `x-remix-target` header
([app/actions/guest-book.tsx](./app/actions/guest-book.tsx)). After a
submission the action stamps a freshness token into the frame `src`, which is
what tells the frame to re-resolve — old content stays visible until the new
fragment lands.

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
