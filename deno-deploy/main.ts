// main.ts — Deno Deploy entrypoint. Serves the built fetch handler; build
// first (`vp build`), then `deno serve` or Deno Deploy runs this module.
import server from "./dist/ssr/index.js";

Deno.serve({ port: Number(Deno.env.get("PORT") ?? 8000) }, request => server.fetch(request));
