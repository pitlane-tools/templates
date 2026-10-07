import { css } from "@pitlane/theme";

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
                    minHeight: t.size.screen,
                    padding: [t.layout.page, t.layout.gutter],
                    fontFamily: t.fontFamily.sans,
                    color: t.colors.text.primary,
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
