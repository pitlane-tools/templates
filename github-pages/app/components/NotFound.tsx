import { css } from "@pitlane/theme";
// cssRaw is remix/ui's untyped css(), for the non-token layout lengths below.
import { css as cssRaw } from "remix/ui";

import { routes } from "#app/routes.ts";
import { t } from "#app/theme.ts";

export function NotFound() {
    return () => (
        <main
            mix={[
                css({
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: t.space.lg,
                    justifyContent: "center",
                    fontFamily: t.fontFamily.sans,
                    color: t.colors.text.primary,
                }),
                cssRaw({
                    minHeight: "100vh",
                    padding: "4rem 1rem",
                }),
            ]}
        >
            <h1
                mix={css({
                    fontSize: t.fontSize.xxl,
                    fontWeight: t.fontWeight.bold,
                })}
            >
                Page not found
            </h1>
            <a href={routes.guestBook.index.href()} mix={css({ color: t.colors.text.muted })}>
                Back to the guest book
            </a>
        </main>
    );
}
