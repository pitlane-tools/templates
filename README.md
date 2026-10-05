# Pitlane Templates

[Remix 3](https://remix.run) starter templates built with [`pitlane`](https://pitlane.tools/guides). Every template is the same guest book app; what changes is the runtime, the database, and the deploy target, so you can diff any two templates to see exactly what a platform swap touches.

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
- **Vite+ canonical.** Templates use [Vite+](https://viteplus.dev) (`vp`) for dev, build, tasks, formatting, and linting — except the two Deno templates, which are Deno-native (`deno.jsonc` holds dependencies and tasks; no `package.json`).
- **PostgreSQL templates develop against PGlite.** `netlify`, `vercel`, and `deno-deploy` start a project-local [PGlite](https://pglite.dev) socket server on `vp dev` / `deno task dev` and inject `DATABASE_URL` — no Docker, no local Postgres — while production always points at a real PostgreSQL server through the same migrations and client.

## Installed documentation

Every template imports through `pitlane/*` and installs `pitlane` as a runtime dependency. The package pins its scoped dependencies and includes the guides, package READMEs, and `INDEX.md` for that version. Each app's `AGENTS.md` and `.agents/skills/pitlane/SKILL.md` direct coding agents to `node_modules/pitlane/INDEX.md`; the skill contains discovery guidance rather than version-specific APIs.

The umbrella also installs its Vite tooling in production. Apps that need only selected packages can use scoped dependencies instead, but those installs do not include the umbrella's documentation index.

## Development

This is a pnpm workspace (the Deno templates opt out — install those with `deno install`):

```sh
vp install
vp run --filter ./railway-node build   # build any one template
```

CI builds every template against `pitlane` from npm on pushes and pull requests, and [deploy-demo](./.github/workflows/deploy-demo.yml) redeploys the [live Cloudflare demo](https://guestbook.pitlane.tools) whenever the `cloudflare` template changes.

## License

[MIT](./LICENSE)
