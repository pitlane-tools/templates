import { Env } from "../data/schemas.ts";
import { parseEnv } from "../utils/parse-env.ts";
import { Pool } from "pg";
import { Database } from "remix/data-table";
import { createPostgresDatabase } from "remix/data-table/postgres";
import { type Middleware } from "remix/router";

const { DATABASE_URL } = parseEnv(Env);

export function loadDatabase(): Middleware<{
    key: typeof Database;
    value: Database;
    property: "db";
}> {
    let pool = new Pool({
        connectionString: DATABASE_URL,
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
