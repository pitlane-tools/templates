import { type Middleware } from "remix/router";

import { AppStorage } from "#app/data/app-storage.ts";

export type StorageMiddleware = Middleware<{
    key: typeof AppStorage;
    value: AppStorage;
    property: "storage";
}>;

export function loadStorage(): StorageMiddleware {
    let storage = new AppStorage();

    return (context, next) => {
        context.set(AppStorage, storage, { property: "storage" });
        return next();
    };
}
