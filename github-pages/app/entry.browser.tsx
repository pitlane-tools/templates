import { createRoot } from "remix/ui";
import { SPA } from "remix/ui/spa";

import { router } from "#app/router.tsx";
import "#app/styles/preflight.css";
import { Theme } from "#app/theme.ts";

// The whole app runs in the browser: the SPA component intercepts
// same-origin navigations and form submissions, dispatches them through the
// fetch router, and renders whatever node comes back. Frames resolve through
// the same router — the in-memory Request carries the frame name as the
// x-remix-target header, and handlers answer with the matching fragment.
let root = createRoot(document.getElementById("app")!, {
    frameInit: {
        resolveFrame(src, signal, target) {
            let headers = new Headers();
            if (target) headers.set("x-remix-target", target);
            return router.fetch(src, { headers, signal });
        },
    },
});

root.render(
    <>
        <Theme />
        <SPA fallback={null} router={router} />
    </>,
);
