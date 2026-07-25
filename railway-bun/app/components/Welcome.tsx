import type { GuestBookEntry } from "#app/data/schemas.ts";

import { CharacterCounter } from "#app/components/CharacterCounter.tsx";
import { routes } from "#app/routes.ts";
import { t } from "#app/theme.ts";
import { css } from "@pitlane/theme";
// cssRaw is remix/ui's untyped css(), used only for values the branded css()
// cannot express: non-token layout lengths, inset box-shadows, and the inline
// light-dark() hover color that is not a palette token.
import { css as cssRaw, type Handle } from "remix/ui";
import { button } from "remix/ui/button";
import { inputStyle } from "remix/ui/combobox";

export interface WelcomeProps {
    entries: GuestBookEntry[];
}

export function Welcome(handle: Handle<WelcomeProps>) {
    return () => {
        let { entries } = handle.props;

        return (
            <div
                mix={[
                    css({
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        fontFamily: t.fontFamily.sans,
                        color: t.colors.text.primary,
                    }),
                    cssRaw({
                        minHeight: "100vh",
                        padding: "4rem 1rem",
                    }),
                ]}
            >
                <header
                    mix={[
                        css({
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: t.space.xl,
                        }),
                        cssRaw({
                            maxWidth: "32rem",
                        }),
                    ]}
                >
                    <picture>
                        <source
                            media="(prefers-color-scheme: dark)"
                            srcSet="/remix-3-logo-dark.svg"
                        />
                        <img
                            alt="Remix 3"
                            mix={[cssRaw({ height: "2.5rem" })]}
                            src="/remix-3-logo-light.svg"
                        />
                    </picture>
                    <h1
                        mix={[
                            css({
                                fontWeight: t.fontWeight.bold,
                                letterSpacing: t.letterSpacing.tight,
                            }),
                            cssRaw({
                                fontSize: "2.25rem",
                            }),
                        ]}
                    >
                        Welcome to Remix 3
                    </h1>
                </header>

                <nav
                    mix={[
                        css({
                            display: "flex",
                            gap: t.space.xxl,
                        }),
                        cssRaw({
                            marginTop: "2rem",
                        }),
                    ]}
                >
                    <ResourceLink href="https://github.com/remix-run/remix" label="GitHub" />
                    <ResourceLink href="https://discord.gg/xwx7mMzVkA" label="Discord" />
                </nav>

                <section
                    mix={[
                        cssRaw({
                            marginTop: "3rem",
                            width: "100%",
                            maxWidth: "28rem",
                            display: "flex",
                            flexDirection: "column",
                            gap: "2rem",
                        }),
                    ]}
                >
                    <div
                        mix={cssRaw({
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.5rem",
                        })}
                    >
                        <h2
                            mix={css({
                                fontSize: t.fontSize.xl,
                                fontWeight: t.fontWeight.semibold,
                            })}
                        >
                            Guest Book
                        </h2>
                        {entries.length > 0 && (
                            <ul
                                mix={[
                                    css({
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: t.space.lg,
                                    }),
                                ]}
                            >
                                {entries.map(entry => (
                                    <li
                                        key={entry.id}
                                        mix={[
                                            css({
                                                padding: t.space.lg,
                                                borderRadius: t.radius.lg,
                                                backgroundColor: t.surface.lvl1,
                                                border: `1px solid ${t.colors.border.subtle}`,
                                            }),
                                        ]}
                                    >
                                        <p
                                            mix={[
                                                css({
                                                    fontWeight: t.fontWeight.medium,
                                                    color: t.colors.text.primary,
                                                }),
                                            ]}
                                        >
                                            {entry.name}
                                        </p>
                                        <p
                                            mix={[
                                                css({
                                                    color: t.colors.text.muted,
                                                    fontSize: t.fontSize.sm,
                                                    marginTop: t.space.sm,
                                                }),
                                            ]}
                                        >
                                            {entry.message}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <form
                        action={routes.guestBook.action.href()}
                        method={routes.guestBook.action.method}
                        mix={[
                            css({
                                display: "flex",
                                flexDirection: "column",
                                gap: t.space.lg,
                            }),
                        ]}
                    >
                        <input
                            mix={[
                                inputStyle,
                                cssRaw({
                                    boxShadow:
                                        "inset 0 1px 0 light-dark(rgb(255 255 255 / 0.7), rgb(255 255 255 / 0.04))",
                                }),
                            ]}
                            name="name"
                            placeholder="Your name"
                            required
                        />
                        <CharacterCounter />
                        <button
                            mix={[button({ tone: "primary" }), css({ alignSelf: "flex-end" })]}
                            rmx-target="welcome"
                            type="submit"
                        >
                            Sign
                        </button>
                    </form>
                </section>
            </div>
        );
    };
}

interface ResourceLinkProps {
    href: string;
    label: string;
}

function ResourceLink(handle: Handle<ResourceLinkProps>) {
    return () => {
        let { href, label } = handle.props;

        return (
            <a
                href={href}
                target="_blank"
                mix={[
                    css({
                        color: t.colors.text.link,
                        fontSize: t.fontSize.md,
                        fontWeight: t.fontWeight.medium,
                    }),
                    cssRaw({
                        "&:hover": {
                            color: "light-dark(#1e40af, #93c5fd)",
                        },
                    }),
                ]}
            >
                {label}
            </a>
        );
    };
}
