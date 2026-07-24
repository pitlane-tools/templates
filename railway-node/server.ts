// Production server — runs the built fetch handler on Node.
// Build first (`vp build`), then start with `node server.ts`.
import * as http from "node:http";
import { createRequestListener } from "remix/node-fetch-server";

// @ts-expect-error - built output has no types
import ssr from "./dist/ssr/index.js";

let server = http.createServer(createRequestListener(request => ssr.fetch(request)));

server.listen(process.env.PORT ? Number.parseInt(process.env.PORT, 10) : 3000, () => {
    console.log("Server running");
});
