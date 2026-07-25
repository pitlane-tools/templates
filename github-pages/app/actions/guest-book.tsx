import * as s from "remix/data-schema";
import { createController } from "remix/router";
import { Frame } from "remix/ui";

import { Welcome } from "#app/components/Welcome.tsx";
import { CreateGuestBookEntry, GuestBook } from "#app/data/schemas.ts";
import { routes } from "#app/routes.ts";

export default createController(routes.guestBook, {
    actions: {
        async index({ storage, headers, url }) {
            if (headers.get("x-remix-target") === "welcome") {
                let entries = await storage.getMany(GuestBook);
                return <Welcome entries={entries} />;
            }

            return <Frame name="welcome" src={url.toString()} />;
        },
        async action({ storage, formData, url }) {
            let payload = s.parse(CreateGuestBookEntry, formData);
            await storage.set(GuestBook, payload);

            let entries = await storage.getMany(GuestBook);
            let src = new URL(url);
            src.searchParams.set("entries", String(entries.length));
            return <Frame name="welcome" src={src.toString()} />;
        },
    },
});
