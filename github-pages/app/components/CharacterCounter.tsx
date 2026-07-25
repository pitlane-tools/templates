import { css } from "@pitlane/theme";
import { type Handle, on } from "remix/ui";

import { field } from "#app/styles/recipes.ts";
import { t } from "#app/theme.ts";

const MAX_LENGTH = 280;

export function CharacterCounter(handle: Handle) {
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
                        field(),
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
                            "&[data-warning]": {
                                color: t.colors.text.warning,
                            },
                        }),
                    ]}
                >
                    {remaining} / {MAX_LENGTH}
                </p>
            </div>
        );
    };
}
