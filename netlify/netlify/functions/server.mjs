// netlify/functions/server.mjs
import server from "../../dist/ssr/index.js";

export default request => server.fetch(request);

export const config = {
    // Route every request to the function…
    path: "/*",
    // …but let files in the publish directory win first, so hashed client
    // assets are served from the CDN and never touch the function.
    preferStatic: true,
};
