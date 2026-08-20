import { remix } from "@pitlane/dev";
import devtoolsJson from "vite-plugin-devtools-json";
import { defineConfig } from "vite-plus";

export default defineConfig({
    // For GitHub project pages set BASE_PATH=/<repo>/ (the deploy workflow does
    // this automatically); user/org pages and custom domains use "/".
    base: process.env.BASE_PATH || "/",
    // ssr: false — this app renders entirely in the browser through
    // remix/spa, so the plugin contributes component HMR and nothing else.
    plugins: [remix({ ssr: false }), devtoolsJson()],
    server: {
        port: 1612,
    },
    css: {
        transformer: "lightningcss",
    },
    run: {
        tasks: {
            dev: {
                command: "vp dev --host",
                cache: false,
            },
            build: {
                command: [
                    "vp build",
                    // Unknown routes fall back to the app shell so the SPA
                    // router can render them.
                    "cp dist/index.html dist/404.html",
                ].join(" && "),
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
