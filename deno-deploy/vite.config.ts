import { remix } from "@pitlane/dev";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [remix()],
    server: {
        port: 1612,
    },
});
