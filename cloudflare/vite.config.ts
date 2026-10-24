import { cloudflare } from "@cloudflare/vite-plugin";
import { remix } from "pitlane/vite-plugin-remix";
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
                command: "node db/apply-migrations.ts --local",
            },
            "db:migrate:remote": {
                dependsOn: ["db:generate"],
                command: "node db/apply-migrations.ts",
            },
            "db:reset": {
                command: "rm -rf .cloudflare/state/v3/d1",
                cache: false,
            },
            "typegen:cloudflare": {
                cache: { input: ["cloudflare.config.ts"] },
                command: "cf workers types",
            },
            typecheck: {
                dependsOn: ["typegen:cloudflare"],
                command: "tsc",
                cache: false,
            },
        },
    },
    fmt: {
        ignorePatterns: [".cloudflare/**"],
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
        ignorePatterns: [".cloudflare/**"],
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
