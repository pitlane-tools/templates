import type { RemixNode } from "remix/ui";

import { formData } from "remix/middleware/form-data";
import { createRouter, MiddlewareContext } from "remix/router";

import guestBook from "#app/actions/guest-book.tsx";
import { NotFound } from "#app/components/NotFound.tsx";
import { loadStorage } from "#app/middleware/storage.ts";
import { routes } from "#app/routes.ts";

type AppContext = MiddlewareContext<[ReturnType<typeof formData>, ReturnType<typeof loadStorage>]>;

declare module "remix/router" {
    interface RouterTypes {
        context: AppContext;
        output: RemixNode;
    }
}

export let router = createRouter<AppContext>({
    middleware: [formData(), loadStorage()],
    defaultHandler: () => <NotFound />,
});

router.map(routes.guestBook, guestBook);
