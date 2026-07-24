import * as s from "remix/data-schema";
import * as f from "remix/data-schema/form-data";
import { column as c, table, type TableRow } from "remix/data-table";

export let Env = s.object({
    // Netlify DB injects NETLIFY_DATABASE_URL in production; the local PGlite
    // dev task injects DATABASE_URL.
    NETLIFY_DATABASE_URL: s.optional(s.string()),
    DATABASE_URL: s.optional(s.string()),
});

export let GuestBook = table({
    name: "guest_book",
    columns: {
        id: c.integer().primaryKey(),
        name: c.text().notNull(),
        message: c.text().notNull(),
        createdAt: c.timestamp().defaultNow(),
    },
});

export type GuestBookEntry = TableRow<typeof GuestBook>;

export let CreateGuestBookEntry = f.object({
    name: f.field(s.string()),
    message: f.field(s.string()),
});
