import { bindings, defineConfig } from "cf/config";

// Static assets are the output of Vite's client build (which includes `public/`),
// so they are configured in vite.config.ts; cloudflare.config.ts has no assets
// directory.
export default defineConfig({
    worker: {
        name: "pitlane-cloudflare",
        entrypoint: "app/entry.server.tsx",
        compatibilityDate: "2026-04-02",
        compatibilityFlags: ["nodejs_compat"],
        env: {
            DB: bindings.d1({
                name: "pitlane-cloudflare-db",
                // Replace with the id `cf d1 create --name pitlane-cloudflare-db`
                // prints before deploying; this one exists in no account. Local dev
                // works as-is, and db/apply-migrations.ts reads whatever id is here.
                // It has to look like a D1 id — a UUIDv4 or 32 hex digits — because
                // `cf d1 migrations apply` rejects anything else.
                id: "00000000-0000-4000-8000-000000000000",
            }),
        },
    },
});
