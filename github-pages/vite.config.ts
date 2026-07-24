import { remix } from "@pitlane/dev";
import devtoolsJson from "vite-plugin-devtools-json";
import { defineConfig } from "vite-plus";

export default defineConfig({
    // For GitHub project pages set BASE_PATH=/<repo>/ (the deploy workflow does
    // this automatically); user/org pages and custom domains use "/".
    base: process.env.BASE_PATH || "/",
    plugins: [
        remix({
            clientEntry: "app/entry.browser",
            serverEntry: "app/entry.worker",
            serverHandler: false,
        }),
        devtoolsJson(),
    ],
    server: {
        port: 1612,
        headers: {
            "Service-Worker-Allowed": "/",
        },
    },
    preview: {
        headers: {
            "Service-Worker-Allowed": "/",
        },
    },
    css: {
        transformer: "lightningcss",
    },
    environments: {
        client: {
            build: {
                rollupOptions: {
                    // The SPA shell is the client entry so index.html ships in
                    // the build output; app/entry.browser.tsx rides its script
                    // tag.
                    input: "index.html",
                },
            },
        },
        ssr: {
            // The "server" is a browser Service Worker: bundle every
            // dependency and resolve with browser semantics.
            consumer: "client",
            build: {
                rollupOptions: {
                    output: {
                        // Stable name so the build task can stage the compiled
                        // worker into the static artifact as sw.js.
                        entryFileNames: "index.js",
                    },
                },
            },
        },
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
                    // The compiled worker (and the assets manifest it imports)
                    // ship inside the static artifact…
                    "cp dist/ssr/index.js dist/client/sw.js",
                    "cp dist/ssr/__fullstack_assets_manifest.js dist/client/",
                    // …and unknown routes fall back to the app shell.
                    "cp dist/client/index.html dist/client/404.html",
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
