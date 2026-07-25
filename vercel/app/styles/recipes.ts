import type { TVAProps } from "@pitlane/theme";

import { tva } from "@pitlane/theme";

import { t } from "#app/theme.ts";

/**
 * Shared control styling, built from the app's own tokens.
 *
 * `remix/ui` ships `button()` and `inputStyle`, but both carry their own
 * hard-coded palette and both are typed against `Element`, so neither
 * composes into a `mix` array on a typed host element. These recipes
 * cover the same ground through `<Theme />`, which means one palette,
 * dark mode for free, and a compile error for any off-palette value.
 */

/** Text inputs and textareas. */
export let field = tva({
    base: {
        minHeight: t.control.height.md,
        width: t.size.full,
        paddingBlock: t.space.md,
        paddingInline: t.space.lg,
        border: `1px solid ${t.colors.border.default}`,
        borderRadius: t.radius.md,
        backgroundColor: t.surface.lvl0,
        color: t.colors.text.primary,
        fontFamily: t.fontFamily.sans,
        fontSize: t.fontSize.sm,
        lineHeight: t.lineHeight.normal,
        boxShadow: t.shadow.inset,
        "&::placeholder": {
            color: t.colors.text.muted,
        },
        "&:focus-visible": {
            outline: `2px solid ${t.colors.focus.ring}`,
            outlineOffset: t.space.none,
        },
    },
});

/** Buttons, and anything that should read as one. */
export let button = tva({
    base: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: t.control.height.md,
        paddingInline: t.space.xl,
        borderRadius: t.radius.md,
        border: "1px solid transparent",
        fontFamily: t.fontFamily.sans,
        fontSize: t.fontSize.sm,
        fontWeight: t.fontWeight.medium,
        lineHeight: t.lineHeight.normal,
        cursor: "pointer",
        boxShadow: t.shadow.xs,
        "&:focus-visible": {
            outline: `2px solid ${t.colors.focus.ring}`,
            outlineOffset: t.space.xs,
        },
        "&:disabled": {
            opacity: 0.55,
            cursor: "not-allowed",
        },
    },
    variants: {
        tone: {
            primary: {
                backgroundColor: t.colors.action.primary.background,
                borderColor: t.colors.action.primary.border,
                color: t.colors.action.primary.foreground,
                "&:hover:not(:disabled)": {
                    backgroundColor: t.colors.action.primary.backgroundHover,
                },
                "&:active:not(:disabled)": {
                    backgroundColor: t.colors.action.primary.backgroundActive,
                },
            },
            secondary: {
                backgroundColor: t.colors.action.secondary.background,
                borderColor: t.colors.action.secondary.border,
                color: t.colors.action.secondary.foreground,
                "&:hover:not(:disabled)": {
                    backgroundColor: t.colors.action.secondary.backgroundHover,
                },
                "&:active:not(:disabled)": {
                    backgroundColor: t.colors.action.secondary.backgroundActive,
                },
            },
            danger: {
                backgroundColor: t.colors.action.danger.background,
                borderColor: t.colors.action.danger.border,
                color: t.colors.action.danger.foreground,
                "&:hover:not(:disabled)": {
                    backgroundColor: t.colors.action.danger.backgroundHover,
                },
                "&:active:not(:disabled)": {
                    backgroundColor: t.colors.action.danger.backgroundActive,
                },
            },
        },
    },
    defaultVariants: { tone: "primary" },
});

export type ButtonProps = TVAProps<typeof button>;
