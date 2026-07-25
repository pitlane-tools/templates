import type { RemixNode } from "remix/ui";

import { formData } from "remix/middleware/form-data";
import { type Middleware, type MiddlewareContext, createRouter } from "remix/router";

import type { StorageMiddleware } from "#app/middleware/storage.ts";

import guestBook from "#app/actions/guest-book.tsx";
import { NotFound } from "#app/components/NotFound.tsx";
import { loadStorage } from "#app/middleware/storage.ts";
import { routes } from "#app/routes.ts";

type FormDataMiddleware = Middleware<{
    key: typeof FormData;
    value: FormData;
    property: "formData";
}>;

type AppContext = MiddlewareContext<[FormDataMiddleware, StorageMiddleware]>;

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
