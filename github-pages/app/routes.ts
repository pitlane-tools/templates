import { route, form } from "remix/routes";

// Routes live under Vite's base (vite.config.ts) so the app also works on
// GitHub project pages, where it is served from /<repo>/ instead of /.
export let routes = route({
    guestBook: form(import.meta.env.BASE_URL),
});
