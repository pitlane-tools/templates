import { asyncContext } from "remix/middleware/async-context";
import { formData } from "remix/middleware/form-data";
import { staticFiles } from "remix/middleware/static";
import { type MiddlewareContext, createRouter } from "remix/router";

import guestBook from "#app/actions/guest-book.tsx";
import { loadDatabase } from "#app/middleware/database.ts";
import { render } from "#app/middleware/render.tsx";
import { routes } from "#app/routes.ts";

type AppContext = MiddlewareContext<
    [ReturnType<typeof formData>, ReturnType<typeof loadDatabase>, ReturnType<typeof render>]
>;

declare module "remix/router" {
    interface RouterTypes {
        context: AppContext;
    }
}

export let router = createRouter<AppContext>({
    middleware: [
        staticFiles("./public"),
        staticFiles("./dist/client"),
        formData(),
        asyncContext(),
        loadDatabase(),
        render(),
    ],
});

router.map(routes.guestBook, guestBook);

export default router;

if (import.meta.hot) {
    import.meta.hot.accept();
}
