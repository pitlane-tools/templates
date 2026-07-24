import { remix } from "@pitlane/dev";
import { nitro } from "nitro/vite";
import devtoolsJson from "vite-plugin-devtools-json";
import { defineConfig } from "vite-plus";

// Load .env into the dev-server process so request middleware (like the
// database) can read it. Values never override variables that are already
// set — like the DATABASE_URL injected by the PGlite dev task.
try {
    process.loadEnvFile(".env");
} catch {
    // no .env file — rely on ambient environment variables
}

export default defineConfig({
    plugins: [remix({ serverHandler: false }), nitro(), devtoolsJson()],
    server: {
        port: 1612,
    },
    css: {
        transformer: "lightningcss",
    },
    run: {
        tasks: {
            // `vp dev` starts a project-local PGlite (Postgres-in-WASM) database,
            // injects its DATABASE_URL, migrates, then runs the app dev server.
            // No Docker or local Postgres install needed.
            dev: {
                command: 'mkdir -p .data && pglite-server --db=./.data/postgres --port=54329 --max-connections=10 --include-database-url --run "vpr dev:ready"',
                cache: false,
            },
            "dev:ephemeral": {
                command: 'pglite-server --db=memory:// --port=54329 --max-connections=10 --include-database-url --run "vpr dev:ready"',
                cache: false,
            },
            "dev:ready": {
                command: "vpr db:migrate && vp dev --host",
                cache: false,
            },
            "db:migrate": {
                command: "node --env-file-if-exists=.env db/migrate.ts",
                cache: false,
            },
            "db:reset": {
                command: "rm -rf .data/postgres",
                cache: false,
            },
            typecheck: {
                command: "tsc",
                cache: false,
            },
        },
    },
    fmt: {
        ignorePatterns: ["dist/**"],
        printWidth: 100,
        tabWidth: 4,
        arrowParens: "avoid",
        sortPackageJson: true,
        sortImports: {
            groups: [
                "type-import",
                ["value-builtin", "value-external"],
                "type-internal",
                "value-internal",
                ["type-parent", "type-sibling", "type-index"],
                ["value-parent", "value-sibling", "value-index"],
                "unknown",
            ],
            partitionByComment: true,
        },
    },
    lint: {
        ignorePatterns: ["dist/**"],
        options: {
            typeAware: true,
            typeCheck: true,
        },
        jsPlugins: ["eslint-plugin-perfectionist"],
        rules: {
            "typescript/no-floating-promises": "allow",
            "perfectionist/sort-jsx-props": "warn",
        },
    },
});
