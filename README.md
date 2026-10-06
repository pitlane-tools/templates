# Pitlane Templates

[Remix 3](https://remix.run) starter templates built with [`@pitlane/vite-plugin-remix`](https://pitlane.tools/package/vite-plugin-remix) — the `remix()` Vite plugin. Server-rendered templates resolve browser scripts and stylesheets through [`@pitlane/assets`](https://pitlane.tools/guide/assets). Every template is the same guest book app; what changes is the runtime, the database, and the deploy target, so you can diff any two templates to see exactly what a platform swap touches.

## Usage

Scaffold with [giget](https://github.com/unjs/giget) — pick a template directory:

```sh
npx giget github:pitlane-tools/templates/<template> my-app
```

The `cloudflare` template runs live at [guestbook.pitlane.tools](https://guestbook.pitlane.tools) — sign the guest book.

## Templates

| Template                         | Runtime                      | Database                      | Deploys to         |
| -------------------------------- | ---------------------------- | ----------------------------- | ------------------ |
| [`cloudflare`](./cloudflare)     | workerd (Cloudflare Workers) | SQLite (D1)                   | Cloudflare Workers |
| [`netlify`](./netlify)           | Node.js (Netlify Functions)  | PostgreSQL (Netlify Database) | Netlify            |
| [`vercel`](./vercel)             | Node.js (Vercel Functions)   | PostgreSQL (Neon)             | Vercel             |
| [`railway-node`](./railway-node) | Node.js                      | SQLite (`node:sqlite`)        | Railway            |
| [`railway-bun`](./railway-bun)   | Bun                          | SQLite (`bun:sqlite`)         | Railway            |
| [`railway-deno`](./railway-deno) | Deno                         | SQLite (`node:sqlite`)        | Railway            |
| [`deno-deploy`](./deno-deploy)   | Deno                         | PostgreSQL (Deno Deploy)      | Deno Deploy        |
| [`github-pages`](./github-pages) | Browser (`remix/spa`)        | IndexedDB (`idb-keyval`)      | GitHub Pages       |

Each template ships a GitHub Actions deploy workflow following the [Pitlane deploy guides](https://pitlane.tools/deploy/cloudflare): the Vite build runs in your CI, and the platform only ever receives built artifacts.

## Conventions

- **One app, many platforms.** The guest book (schema-validated form writes, streamed HTML, a hydrated island) is identical everywhere; only the database middleware and the deploy surface change.
- **Vite+ canonical.** Templates use [Vite+](https://viteplus.dev) (`vp`) for dev, build, tasks, formatting, and linting — except the two Deno templates, which run through `deno.jsonc`. During this preview, the Deno templates use npm to install package candidates. Their release checklist restores Deno-native dependency installation.
- **PostgreSQL templates develop against PGlite.** `netlify`, `vercel`, and `deno-deploy` start a project-local [PGlite](https://pglite.dev) socket server on `vp dev` / `deno task dev` and inject `DATABASE_URL` — no Docker, no local Postgres — while production always points at a real PostgreSQL server through the same migrations and client.

## Development

This is a pnpm workspace. The Deno templates opt out and document their preview installation separately.

```sh
vp install
cd railway-node
vp build
```

CI builds every template against the package versions pinned in its manifest. The companion migration stays in draft with immutable package previews until the new packages are released and installable. The [deploy-demo](./.github/workflows/deploy-demo.yml) workflow redeploys the [live Cloudflare demo](https://guestbook.pitlane.tools) when changes reach the default branch.

## License

[MIT](./LICENSE)
