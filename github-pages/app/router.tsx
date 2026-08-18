import { formData } from "remix/middleware/form-data";
import { createRouter, MiddlewareContext } from "remix/router";
import { render } from "remix/spa";

import guestBook from "#app/actions/guest-book.tsx";
import { NotFound } from "#app/components/NotFound.tsx";
import { Theme } from "#app/components/Theme.tsx";
import { loadStorage } from "#app/middleware/storage.ts";
import { routes } from "#app/routes.ts";

type AppContext = MiddlewareContext<
    [ReturnType<typeof render>, ReturnType<typeof formData>, ReturnType<typeof loadStorage>]
>;

declare module "remix/router" {
    interface RouterTypes {
        context: AppContext;
    }
}

export let router = createRouter<AppContext>({
    // render() exposes context.render() for SPA route responses; the transform
    // publishes the app's design tokens alongside every rendered route.
    middleware: [
        render(content => (
            <>
                <Theme />
                {content}
            </>
        )),
        formData(),
        loadStorage(),
    ],
    defaultHandler: ({ render }) => render(<NotFound />, { status: 404 }),
});

router.map(routes.guestBook, guestBook);
