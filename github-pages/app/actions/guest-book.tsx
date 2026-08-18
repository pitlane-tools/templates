import * as s from "remix/data-schema";
import { createController } from "remix/router";

import { Welcome } from "#app/components/Welcome.tsx";
import { CreateGuestBookEntry, GuestBook } from "#app/data/schemas.ts";
import { routes } from "#app/routes.ts";

export default createController(routes.guestBook, {
    actions: {
        async index({ render, storage }) {
            let entries = await storage.getMany(GuestBook);
            return render(<Welcome entries={entries} />);
        },
        async action({ render, storage, formData }) {
            let payload = s.parse(CreateGuestBookEntry, formData);
            await storage.set(GuestBook, payload);

            let entries = await storage.getMany(GuestBook);
            return render(<Welcome entries={entries} />);
        },
    },
});
