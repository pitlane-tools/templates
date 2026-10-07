import { revalidate } from "pitlane/vite-plugin-remix/hmr";
import { run } from "remix/component";

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

// During `vite dev`, pitlane/vite-plugin-remix broadcasts `server:update` when a
// server-only module changes; `revalidate` reloads the top frame in place.
// Builds drop this branch.
if (import.meta.hot) {
    import.meta.hot.on("server:update", () => revalidate(app));
}
