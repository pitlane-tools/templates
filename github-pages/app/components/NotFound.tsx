import { css } from "remix/ui";

import { theme } from "#app/components/Theme.tsx";
import { routes } from "#app/routes.ts";

export function NotFound() {
    return () => (
        <main
            mix={css({
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: theme.space.lg,
                minHeight: "100vh",
                justifyContent: "center",
                fontFamily: theme.fontFamily.sans,
                color: theme.colors.text.primary,
                padding: "4rem 1rem",
            })}
        >
            <h1
                mix={css({
                    fontSize: theme.fontSize.xxl,
                    fontWeight: theme.fontWeight.bold,
                })}
            >
                Page not found
            </h1>
            <a href={routes.guestBook.index.href()} mix={css({ color: theme.colors.text.muted })}>
                Back to the guest book
            </a>
        </main>
    );
}
