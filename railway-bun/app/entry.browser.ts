import { run } from "remix/component";
import { revalidate } from "@pitlane/dev/hmr";

let app = run({
    async loadModule(moduleUrl, exportName) {
        let mod = await import(/* @vite-ignore */ moduleUrl);
        let exported = mod[exportName];

        if (typeof exported !== "function") {
            throw new TypeError(
                `Expected export '${exportName}' from '${moduleUrl}' to be a function`,
            );
        }

        return exported;
    },
});

// During `vite dev`, @pitlane/dev broadcasts `server:update` when a
// server-only module changes; `revalidate` reloads the top frame in place.
// Builds drop this branch.
if (import.meta.hot) {
    import.meta.hot.on("server:update", () => revalidate(app));
}
