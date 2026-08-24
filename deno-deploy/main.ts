// main.ts — Deno Deploy entrypoint. Serves the built fetch handler; build
// first (`vp build`), then `deno serve` or Deno Deploy runs this module.
// The built output has no declarations. `@ts-ignore` rather than
// `@ts-expect-error` because Deno type-checks the emitted JS and so sees no
// error here, while tsc and oxlint's type-aware pass do.
// @ts-ignore - built output has no types
import server from "./dist/ssr/index.js";

Deno.serve({ port: Number(Deno.env.get("PORT") ?? 8000) }, request => server.fetch(request));
