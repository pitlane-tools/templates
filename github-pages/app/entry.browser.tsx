import { run } from "remix/spa";

import { router } from "#app/router.tsx";
import "#app/styles/preflight.css";

// The whole app runs in the browser: run() connects the fetch router to the
// document's top frame, intercepts same-origin navigations and form
// submissions, dispatches them through the router, and renders the node each
// route returns through the render() middleware.
let app = run(router);

app.addEventListener("error", event => {
    console.error("Guest book failed to render:", event.error);
});

await app.ready();
