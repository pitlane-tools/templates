// Production server — serves the built fetch handler with Bun.
// Build first (`vp build`), then start with `bun server.ts`.
// @ts-expect-error - built output has no types
import ssr from "./dist/ssr/index.js";

let server = Bun.serve({
    port: process.env.PORT ? Number.parseInt(process.env.PORT, 10) : 3000,
    fetch: request => ssr.fetch(request),
});

console.log(`Server running at http://localhost:${server.port}`);
