import { Env } from "../app/data/schemas.ts";
import { parseEnv } from "../app/utils/parse-env.ts";
import path from "node:path";
import { Pool } from "pg";
import * as s from "remix/data-schema";
import { loadMigrations } from "remix/data-table/migrations/node";
import { createPostgresDatabase } from "remix/data-table/postgres";

const { DATABASE_URL } = parseEnv(Env);

let Direction = s.union([s.literal("up" as const), s.literal("down" as const)]);
let direction = s.parse(s.defaulted(Direction, "up"), process.argv[2]);
let to = process.argv[3];

let pool = new Pool({ connectionString: DATABASE_URL, max: 1 });
let db = createPostgresDatabase(pool);
let migrations = await loadMigrations(path.resolve("db/migrations"));
let result = await db.migrate(migrations, to ? { direction, to } : { direction });
console.log(direction + " complete", {
    applied: result.applied.map(entry => entry.id),
    reverted: result.reverted.map(entry => entry.id),
});

await pool.end();
