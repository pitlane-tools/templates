import { Env } from "#app/data/schemas.ts";
import { parseEnv } from "#app/utils/parse-env.ts";
import { Pool } from "pg";
import { assert } from "remix/assert";
import { Database } from "remix/data-table";
import { createPostgresDatabase } from "remix/data-table/postgres";
import { type Middleware } from "remix/router";

const { NETLIFY_DATABASE_URL, DATABASE_URL } = parseEnv(Env);
const connectionString = NETLIFY_DATABASE_URL ?? DATABASE_URL;

export function loadDatabase(): Middleware<{
    key: typeof Database;
    value: Database;
    property: "db";
}> {
    assert(
        connectionString,
        "Must provide NETLIFY_DATABASE_URL (Netlify DB) or DATABASE_URL (local dev)",
    );

    let pool = new Pool({
        connectionString,
        // The local PGlite dev database multiplexes one underlying connection;
        // a small pool is also the right shape for serverless Postgres.
        max: process.env.NODE_ENV === "development" ? 1 : 5,
    });
    let db = createPostgresDatabase(pool);

    return (context, next) => {
        context.set(Database, db, { property: "db" });
        return next();
    };
}
