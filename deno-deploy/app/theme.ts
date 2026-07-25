import { createTheme } from "@pitlane/theme";

/**
 * App-owned design tokens, defined once as a W3C DTCG token document and
 * installed on the document as CSS custom properties by `<Theme />`.
 *
 * Dark mode lives in `modes.dark`: the base values are the light palette, and
 * each dark override changes only the colors that differ. `<Theme />` emits a
 * `:root` block plus one `@media (prefers-color-scheme: dark)` block, so the OS
 * appearance setting flips the variables with no attribute selectors and no
 * JavaScript — every alias follows in pure CSS.
 *
 * Reference tokens in `css()` mixins through the exported `t`, e.g.
 * `css({ gap: t.space.md })`.
 */
export let {
    token: t,
    Theme,
} = createTheme(
    {
        fontFamily: {
            $type: "fontFamily",
            sans: {
                $value: [
                    "Inter var",
                    "ui-sans-serif",
                    "system-ui",
                    "sans-serif",
                    "Apple Color Emoji",
                    "Segoe UI Emoji",
                    "Segoe UI Symbol",
                    "Noto Color Emoji",
                ],
            },
            mono: {
                $value: [
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
        },
        space: {
            $type: "dimension",
            none: { $value: "0px" },
            px: { $value: "1px" },
            xs: { $value: "2px" },
            sm: { $value: "4px" },
            md: { $value: "8px" },
            lg: { $value: "12px" },
            xl: { $value: "16px" },
            xxl: { $value: "24px" },
        },
        layout: {
            $type: "dimension",
            gutter: { $value: "{space.xl}" },
            section: { $value: "32px" },
            block: { $value: "48px" },
            page: { $value: "64px" },
        },
        size: {
            $type: "dimension",
            logo: { $value: "40px" },
            column: { $value: "448px" },
            prose: { $value: "512px" },
            full: { $value: "100%" },
            screen: { $value: "100vh" },
        },
        radius: {
            $type: "dimension",
            none: { $value: "0px" },
            sm: { $value: "4px" },
            md: { $value: "6px" },
            lg: { $value: "8px" },
            xl: { $value: "12px" },
            full: { $value: "9999px" },
        },
        fontSize: {
            $type: "dimension",
            xxxs: { $value: "10px" },
            xxs: { $value: "11px" },
            xs: { $value: "12px" },
            sm: { $value: "14px" },
            md: { $value: "16px" },
            lg: { $value: "18px" },
            xl: { $value: "20px" },
            xxl: { $value: "28px" },
            xxxl: { $value: "36px" },
        },
        lineHeight: {
            $type: "number",
            tight: { $value: 1.2 },
            normal: { $value: 1.5 },
            relaxed: { $value: 1.7 },
        },
        letterSpacing: {
            $type: "dimension",
            tight: { $value: "-0.025em" },
            normal: { $value: "0" },
            meta: { $value: "0.025em" },
            wide: { $value: "0.05em" },
        },
        fontWeight: {
            $type: "fontWeight",
            normal: { $value: 400 },
            medium: { $value: 500 },
            semibold: { $value: 600 },
            bold: { $value: 700 },
        },
        control: {
            height: {
                $type: "dimension",
                sm: { $value: "28px" },
                md: { $value: "36px" },
                lg: { $value: "44px" },
            },
        },
        shadow: {
            $type: "shadow",
            xs: {
                $value: { color: "rgb(0 0 0 / 0.05)", offsetX: "0px", offsetY: "1px", blur: "2px" },
            },
            sm: {
                $value: { color: "rgb(0 0 0 / 0.10)", offsetX: "0px", offsetY: "1px", blur: "3px" },
            },
            md: {
                $value: {
                    color: "rgb(0 0 0 / 0.12)",
                    offsetX: "0px",
                    offsetY: "4px",
                    blur: "10px",
                },
            },
            lg: {
                $value: {
                    color: "rgb(0 0 0 / 0.16)",
                    offsetX: "0px",
                    offsetY: "10px",
                    blur: "30px",
                },
            },
            xl: {
                $value: {
                    color: "rgb(0 0 0 / 0.20)",
                    offsetX: "0px",
                    offsetY: "20px",
                    blur: "50px",
                },
            },
            // `inset: true` moves the shadow inside the border box. The color
            // is an alias, so the dark override below flips it through the
            // cascade instead of restating the whole shadow.
            inset: {
                $value: {
                    color: "{colors.highlight.inset}",
                    offsetX: "0px",
                    offsetY: "1px",
                    blur: "0px",
                    inset: true,
                },
            },
        },
        surface: {
            $type: "color",
            lvl0: { $value: "#ffffff" },
            lvl1: { $value: "#f9fafb" },
            lvl2: { $value: "#f3f4f6" },
            lvl3: { $value: "#e5e7eb" },
            lvl4: { $value: "#d1d5db" },
        },
        colors: {
            $type: "color",
            text: {
                primary: { $value: "#111827" },
                secondary: { $value: "#374151" },
                muted: { $value: "#6b7280" },
                warning: { $value: "#ef4444" },
                link: { $value: "#2563eb" },
                linkHover: { $value: "#1e40af" },
            },
            highlight: { inset: { $value: "rgb(255 255 255 / 0.7)" } },
            border: {
                subtle: { $value: "#e5e7eb" },
                default: { $value: "#d1d5db" },
                strong: { $value: "#9ca3af" },
            },
            focus: { ring: { $value: "#3b82f6" } },
            overlay: { scrim: { $value: "rgb(0 0 0 / 0.45)" } },
            action: {
                primary: {
                    background: { $value: "#2563eb" },
                    backgroundHover: { $value: "#1d4ed8" },
                    backgroundActive: { $value: "#1e40af" },
                    foreground: { $value: "#ffffff" },
                    border: { $value: "#2563eb" },
                },
                secondary: {
                    background: { $value: "#ffffff" },
                    backgroundHover: { $value: "#f9fafb" },
                    backgroundActive: { $value: "#f3f4f6" },
                    foreground: { $value: "#111827" },
                    border: { $value: "#d1d5db" },
                },
                danger: {
                    background: { $value: "#dc2626" },
                    backgroundHover: { $value: "#b91c1c" },
                    backgroundActive: { $value: "#991b1b" },
                    foreground: { $value: "#ffffff" },
                    border: { $value: "#dc2626" },
                },
            },
        },
    },
    {
        modes: {
            dark: {
                surface: {
                    lvl0: { $value: "#0a0a0a" },
                    lvl1: { $value: "#111827" },
                    lvl2: { $value: "#1f2937" },
                    lvl3: { $value: "#374151" },
                    lvl4: { $value: "#4b5563" },
                },
                colors: {
                    text: {
                        primary: { $value: "#f3f4f6" },
                        secondary: { $value: "#d1d5db" },
                        muted: { $value: "#9ca3af" },
                        warning: { $value: "#f87171" },
                        link: { $value: "#60a5fa" },
                        linkHover: { $value: "#93c5fd" },
                    },
                    highlight: { inset: { $value: "rgb(255 255 255 / 0.04)" } },
                    border: {
                        subtle: { $value: "#1f2937" },
                        default: { $value: "#374151" },
                        strong: { $value: "#4b5563" },
                    },
                    focus: { ring: { $value: "#60a5fa" } },
                    action: {
                        primary: {
                            background: { $value: "#3b82f6" },
                            backgroundHover: { $value: "#2563eb" },
                            backgroundActive: { $value: "#1d4ed8" },
                            border: { $value: "#3b82f6" },
                        },
                        secondary: {
                            background: { $value: "#18181b" },
                            backgroundHover: { $value: "#27272a" },
                            backgroundActive: { $value: "#3f3f46" },
                            foreground: { $value: "#f3f4f6" },
                            border: { $value: "#374151" },
                        },
                        danger: {
                            background: { $value: "#ef4444" },
                            backgroundHover: { $value: "#dc2626" },
                            backgroundActive: { $value: "#b91c1c" },
                            border: { $value: "#ef4444" },
                        },
                    },
                },
            },
        },
    },
);
