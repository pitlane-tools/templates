import { t } from "#app/theme.ts";
import { css } from "@pitlane/theme";
// cssRaw is remix/ui's untyped css(), used only for values the branded css()
// cannot express — here, the inset box-shadow (DTCG shadow tokens have no inset).
import { clientEntry, css as cssRaw, on } from "remix/ui";
import { inputStyle } from "remix/ui/combobox";

const MAX_LENGTH = 280;

export let CharacterCounter = clientEntry(import.meta.url, handle => {
    let count = 0;

    return () => {
        let remaining = MAX_LENGTH - count;

        return (
            <div
                mix={[
                    css({
                        display: "flex",
                        flexDirection: "column",
                        gap: t.space.sm,
                    }),
                ]}
            >
                <textarea
                    maxLength={MAX_LENGTH}
                    mix={[
                        on("input", event => {
                            count = event.currentTarget.value.length;
                            handle.update();
                        }),
                        inputStyle,
                        css({
                            paddingBlock: t.space.sm,
                            resize: "vertical",
                        }),
                        cssRaw({
                            boxShadow:
                                "inset 0 1px 0 light-dark(rgb(255 255 255 / 0.7), rgb(255 255 255 / 0.04))",
                        }),
                    ]}
                    name="message"
                    placeholder="Leave a message..."
                    required
                    rows={3}
                />
                <p
                    data-warning={remaining <= 20 ? "" : undefined}
                    mix={[
                        css({
                            fontSize: t.fontSize.xs,
                            color: t.colors.text.muted,
                            textAlign: "right",
                        }),
                        // Inline light-dark warning color; not a palette token.
                        cssRaw({
                            "&[data-warning]": {
                                color: "light-dark(#ef4444, #f87171)",
                            },
                        }),
                    ]}
                >
                    {remaining} / {MAX_LENGTH}
                </p>
            </div>
        );
    };
});
