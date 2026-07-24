import { cloudflare } from "@cloudflare/vite-plugin";
import { remix } from "@pitlane/dev";
import devtoolsJson from "vite-plugin-devtools-json";
import { defineConfig } from "vite-plus";

export default defineConfig({
    plugins: [
        remix({ serverHandler: false }),
        cloudflare({ viteEnvironment: { name: "ssr" } }),
        devtoolsJson(),
    ],
    server: {
        port: 1612,
    },
    css: {
        transformer: "lightningcss",
    },
    run: {
        tasks: {
            dev: {
                dependsOn: ["typegen:cloudflare", "db:migrate"],
                command: "vp dev --host",
                cache: false,
            },
            "db:generate": {
                command: "node db/generate-migrations.ts",
            },
            "db:migrate": {
                dependsOn: ["db:generate"],
                command: "wrangler d1 migrations apply DB --local",
            },
            "db:migrate:remote": {
                dependsOn: ["db:generate"],
                command: "wrangler d1 migrations apply DB --remote",
            },
            "db:reset": {
                command: "rm -rf .wrangler/state/v3/d1",
                cache: false,
            },
            "typegen:cloudflare": {
                input: ["wrangler.jsonc"],
                command: "wrangler types",
            },
            typecheck: {
                dependsOn: ["typegen:cloudflare"],
                command: "tsc",
                cache: false,
            },
        },
    },
    fmt: {
        ignorePatterns: ["**/worker-configuration.d.ts", "dist/**"],
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
        ignorePatterns: ["**/worker-configuration.d.ts", "dist/**"],
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
