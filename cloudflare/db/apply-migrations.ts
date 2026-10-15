import { spawnSync } from "node:child_process";

import config from "../cloudflare.config.ts";

// `cf d1 migrations apply` names the database by id — database names and binding
// names are rejected — so read the id from the one place that holds it.
let { id } = config.worker.env.DB;

if (!id) {
    throw new Error("Set the D1 binding's `id` in cloudflare.config.ts before migrating.");
}

// The dev server simulates D1 under .cloudflare/state. cf defaults to a shared
// directory in your home folder instead, which dev would never read.
let local = process.argv.includes("--local");
let where = local ? ["--local", "--persist-to", ".cloudflare/state"] : [];

let { status } = spawnSync(
    "cf",
    ["d1", "migrations", "apply", id, "--dir", "db/migrations", ...where],
    { stdio: "inherit" },
);

process.exit(status ?? 1);
