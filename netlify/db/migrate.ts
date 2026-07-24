import { Env } from "#app/data/schemas.ts";
import { parseEnv } from "#app/utils/parse-env.ts";
import path from "node:path";
import { Pool } from "pg";
import { assert } from "remix/assert";
import * as s from "remix/data-schema";
import { createMigrationRunner } from "remix/data-table/migrations";
import { loadMigrations } from "remix/data-table/migrations/node";
import { createPostgresDatabaseAdapter } from "remix/data-table/postgres";

const { NETLIFY_DATABASE_URL, DATABASE_URL } = parseEnv(Env);
let connectionString = NETLIFY_DATABASE_URL ?? DATABASE_URL;
assert(
    connectionString,
    "Must provide NETLIFY_DATABASE_URL (Netlify DB) or DATABASE_URL (local dev)",
);

let Direction = s.union([s.literal("up" as const), s.literal("down" as const)]);
let direction = s.parse(s.defaulted(Direction, "up"), process.argv[2]);
let to = process.argv[3];

let pool = new Pool({ connectionString, max: 1 });
let adapter = createPostgresDatabaseAdapter(pool);
let migrations = await loadMigrations(path.resolve("db/migrations"));
let runner = createMigrationRunner(adapter, migrations);

let result = await runner[direction]({ to });
console.log(direction + " complete", {
    applied: result.applied.map(entry => entry.id),
    reverted: result.reverted.map(entry => entry.id),
});

await pool.end();
