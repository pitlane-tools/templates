import { css } from "@pitlane/theme";
import { type Handle } from "remix/ui";

import type { GuestBookEntry } from "#app/data/schemas.ts";

import { CharacterCounter } from "#app/components/CharacterCounter.tsx";
import { routes } from "#app/routes.ts";
import { button, field } from "#app/styles/recipes.ts";
import { t } from "#app/theme.ts";

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
                        minHeight: t.size.screen,
                        padding: [t.layout.page, t.layout.gutter],
                        fontFamily: t.fontFamily.sans,
                        color: t.colors.text.primary,
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
                            maxWidth: t.size.prose,
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
                            mix={[css({ height: t.size.logo })]}
                            src="/remix-3-logo-light.svg"
                        />
                    </picture>
                    <h1
                        mix={[
                            css({
                                fontSize: t.fontSize.xxxl,
                                fontWeight: t.fontWeight.bold,
                                letterSpacing: t.letterSpacing.tight,
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
                            marginTop: t.layout.section,
                        }),
                    ]}
                >
                    <ResourceLink href="https://github.com/remix-run/remix" label="GitHub" />
                    <ResourceLink href="https://discord.gg/xwx7mMzVkA" label="Discord" />
                </nav>

                <section
                    mix={[
                        css({
                            display: "flex",
                            flexDirection: "column",
                            gap: t.layout.section,
                            width: t.size.full,
                            maxWidth: t.size.column,
                            marginTop: t.layout.block,
                        }),
                    ]}
                >
                    <div
                        mix={css({
                            display: "flex",
                            flexDirection: "column",
                            gap: t.space.md,
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
                        <input mix={[field()]} name="name" placeholder="Your name" required />
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
                        "&:hover": {
                            color: t.colors.text.linkHover,
                        },
                    }),
                ]}
            >
                {label}
            </a>
        );
    };
}
