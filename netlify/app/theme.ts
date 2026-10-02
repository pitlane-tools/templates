import { createTheme } from "@pitlane/theme";
import * as s from "@pitlane/theme/schema";

/**
 * App-owned design tokens, installed on the document as CSS custom properties
 * by `<Theme />`.
 *
 * The schema names each group's token type, and the token values are the CSS
 * they become. Dark mode lives in `modes.dark`: the base values are the light
 * palette, and the dark mode overrides only the colors that differ. `<Theme />`
 * emits a `:root` block plus one `@media (prefers-color-scheme: dark)` block,
 * so the OS appearance setting flips the variables with no attribute selectors
 * and no JavaScript.
 *
 * Tokens that reference other tokens are declared in the `extend` layer, where
 * the base accessor is in scope. Each one stays a `var()` reference, so a dark
 * override of the token it names flows through the cascade.
 *
 * Reference tokens in `css()` mixins through the exported `t`, e.g.
 * `css({ gap: t.space.md })`.
 */
export let { token: t, Theme } = createTheme({
    schema: {
        fontFamily: s.font.family(),
        space: s.dimension(),
        layout: s.dimension(),
        size: s.dimension(),
        radius: s.dimension(),
        fontSize: s.dimension(),
        lineHeight: s.number(),
        letterSpacing: s.dimension(),
        fontWeight: s.font.weight(),
        control: s.dimension(),
        shadow: s.shadow(),
        surface: s.color(),
        colors: s.color(),
    },
    tokens: {
        fontFamily: {
            sans: [
                "Inter var",
                "ui-sans-serif",
                "system-ui",
                "sans-serif",
                "Apple Color Emoji",
                "Segoe UI Emoji",
                "Segoe UI Symbol",
                "Noto Color Emoji",
            ],
            mono: [
                "ui-monospace",
                "SFMono-Regular",
                "Menlo",
                "Monaco",
                "Consolas",
                "Liberation Mono",
                "Courier New",
                "monospace",
            ],
        },
        space: {
            none: "0px",
            px: "1px",
            xs: "2px",
            sm: "4px",
            md: "8px",
            lg: "12px",
            xl: "16px",
            xxl: "24px",
        },
        layout: {
            section: "32px",
            block: "48px",
            page: "64px",
        },
        size: {
            logo: "40px",
            column: "448px",
            prose: "512px",
            full: "100%",
            screen: "100vh",
        },
        radius: {
            none: "0px",
            sm: "4px",
            md: "6px",
            lg: "8px",
            xl: "12px",
            full: "9999px",
        },
        fontSize: {
            xxxs: "10px",
            xxs: "11px",
            xs: "12px",
            sm: "14px",
            md: "16px",
            lg: "18px",
            xl: "20px",
            xxl: "28px",
            xxxl: "36px",
        },
        lineHeight: { tight: 1.2, normal: 1.5, relaxed: 1.7 },
        letterSpacing: {
            tight: "-0.025em",
            normal: "0",
            meta: "0.025em",
            wide: "0.05em",
        },
        fontWeight: { normal: 400, medium: 500, semibold: 600, bold: 700 },
        control: { height: { sm: "28px", md: "36px", lg: "44px" } },
        shadow: {
            xs: "0px 1px 2px rgb(0 0 0 / 0.05)",
            sm: "0px 1px 3px rgb(0 0 0 / 0.10)",
            md: "0px 4px 10px rgb(0 0 0 / 0.12)",
            lg: "0px 10px 30px rgb(0 0 0 / 0.16)",
            xl: "0px 20px 50px rgb(0 0 0 / 0.20)",
        },
        surface: {
            lvl0: "#ffffff",
            lvl1: "#f9fafb",
            lvl2: "#f3f4f6",
            lvl3: "#e5e7eb",
            lvl4: "#d1d5db",
        },
        colors: {
            text: {
                primary: "#111827",
                secondary: "#374151",
                muted: "#6b7280",
                warning: "#ef4444",
                link: "#2563eb",
                linkHover: "#1e40af",
            },
            highlight: { inset: "rgb(255 255 255 / 0.7)" },
            border: {
                subtle: "#e5e7eb",
                default: "#d1d5db",
                strong: "#9ca3af",
            },
            focus: { ring: "#3b82f6" },
            overlay: { scrim: "rgb(0 0 0 / 0.45)" },
            action: {
                primary: {
                    background: "#2563eb",
                    backgroundHover: "#1d4ed8",
                    backgroundActive: "#1e40af",
                    foreground: "#ffffff",
                    border: "#2563eb",
                },
                secondary: {
                    background: "#ffffff",
                    backgroundHover: "#f9fafb",
                    backgroundActive: "#f3f4f6",
                    foreground: "#111827",
                    border: "#d1d5db",
                },
                danger: {
                    background: "#dc2626",
                    backgroundHover: "#b91c1c",
                    backgroundActive: "#991b1b",
                    foreground: "#ffffff",
                    border: "#dc2626",
                },
            },
        },
    },
    modes: {
        dark: {
            tokens: {
                surface: {
                    lvl0: "#0a0a0a",
                    lvl1: "#111827",
                    lvl2: "#1f2937",
                    lvl3: "#374151",
                    lvl4: "#4b5563",
                },
                colors: {
                    text: {
                        primary: "#f3f4f6",
                        secondary: "#d1d5db",
                        muted: "#9ca3af",
                        warning: "#f87171",
                        link: "#60a5fa",
                        linkHover: "#93c5fd",
                    },
                    highlight: { inset: "rgb(255 255 255 / 0.04)" },
                    border: {
                        subtle: "#1f2937",
                        default: "#374151",
                        strong: "#4b5563",
                    },
                    focus: { ring: "#60a5fa" },
                    action: {
                        primary: {
                            background: "#3b82f6",
                            backgroundHover: "#2563eb",
                            backgroundActive: "#1d4ed8",
                            border: "#3b82f6",
                        },
                        secondary: {
                            background: "#18181b",
                            backgroundHover: "#27272a",
                            backgroundActive: "#3f3f46",
                            foreground: "#f3f4f6",
                            border: "#374151",
                        },
                        danger: {
                            background: "#ef4444",
                            backgroundHover: "#dc2626",
                            backgroundActive: "#b91c1c",
                            border: "#ef4444",
                        },
                    },
                },
            },
        },
    },
}).extend(base => ({
    tokens: {
        layout: { gutter: base.space.xl },
        shadow: { inset: `inset 0px 1px 0px ${base.colors.highlight.inset}` },
    },
}));
