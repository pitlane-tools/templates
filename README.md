# Pitlane Templates

[Remix 3](https://remix.run) starter templates built with [`@pitlane/dev`](https://pitlane.tools/package/dev) — the `remix()` Vite plugin. Every template is the same guest book app; what changes is the runtime, the database, and the deploy target, so you can diff any two templates to see exactly what a platform swap touches.

## Usage

Scaffold with [giget](https://github.com/unjs/giget) — pick a template directory:

```sh
npx giget github:pitlane-tools/templates/<template> my-app
```

## Templates

| Template                         | Runtime            | Database                 | Deploys to         |
| -------------------------------- | ------------------ | ------------------------ | ------------------ |
| [`cloudflare`](./cloudflare)     | Cloudflare Workers | D1                       | Cloudflare Workers |
| [`netlify`](./netlify)           | Netlify Functions  | PostgreSQL (Netlify DB)  | Netlify            |
| [`vercel`](./vercel)             | Vercel Functions   | PostgreSQL (e.g. Neon)   | Vercel, via Nitro  |
| [`railway-node`](./railway-node) | Node.js            | `node:sqlite`            | Railway, in Docker |
| [`railway-bun`](./railway-bun)   | Bun                | SQLite                   | Railway, in Docker |
| [`railway-deno`](./railway-deno) | Deno               | `node:sqlite`            | Railway, in Docker |
| [`deno-deploy`](./deno-deploy)   | Deno               | PostgreSQL (managed)     | Deno Deploy        |
| [`github-pages`](./github-pages) | Service Worker     | IndexedDB (`idb-keyval`) | GitHub Pages       |

Each template ships a GitHub Actions deploy workflow following the
[Pitlane deploy guides](https://pitlane.tools/deploy/cloudflare): the Vite build runs
in your CI, and the platform only ever receives built artifacts.

## Conventions

- **One app, many platforms.** The guest book (schema-validated form writes, streamed
  HTML, a hydrated island) is identical everywhere; only the database middleware and
  the deploy surface change.
- **Vite+ canonical.** Templates use [Vite+](https://viteplus.dev) (`vp`) for dev,
  build, tasks, formatting, and linting — except the two Deno templates, which are
  Deno-native (`deno.json` holds dependencies and tasks; no `package.json`).
- **PostgreSQL templates develop against PGlite.** `netlify`, `vercel`, and
  `deno-deploy` start a project-local [PGlite](https://pglite.dev) socket server on
  `vp dev` / `deno task dev` and inject `DATABASE_URL` — no Docker, no local Postgres —
  while production always points at a real PostgreSQL server through the same
  migrations and client.

## Development

This is a pnpm workspace (the Deno templates opt out — install those with
`deno install`):

```sh
pnpm install
pnpm --filter ./railway-node exec vp build   # build any one template
```

CI builds every template against `@pitlane/dev` from npm on pushes and pull requests.

## License

[MIT](./LICENSE)
