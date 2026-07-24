import { Document } from "#app/components/Document.tsx";
import { Welcome } from "#app/components/Welcome.tsx";
import { CreateGuestBookEntry, GuestBook } from "#app/data/schemas.ts";
import { routes } from "#app/routes.ts";
import * as s from "remix/data-schema";
import { redirect } from "remix/response/redirect";
import { createController } from "remix/router";

export default createController(routes.guestBook, {
    actions: {
        async index({ storage, headers, render, url }) {
            let entries = await storage.getMany(GuestBook);

            if (headers.get("x-remix-target") === "welcome") {
                return render(<Welcome entries={entries} />);
            }

            return render(<Document url={url} />);
        },
        async action({ storage, formData }) {
            let payload = s.parse(CreateGuestBookEntry, formData);
            await storage.set(GuestBook, payload);
            return redirect(routes.guestBook.index.href());
        },
    },
});
