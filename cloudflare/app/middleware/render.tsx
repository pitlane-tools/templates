import type { RemixNode } from "remix/component";

import { renderToStream } from "remix/component/server";
import { renderWith } from "remix/middleware/render";
import { createHtmlResponse } from "remix/response/html";

import { assets } from "#app/assets.ts";

export function render() {
    return renderWith(
        context =>
            function render(node: RemixNode, init?: ResponseInit) {
                let stream = renderToStream(node, {
                    frameSrc: context.url,
                    async resolveClientEntry(entryId, component) {
                        let fragment = entryId.lastIndexOf("#");
                        let path = fragment < 0 ? entryId : entryId.slice(0, fragment);
                        let exportName =
                            fragment < 0 ? component.name : entryId.slice(fragment + 1);
                        return path.startsWith("file:")
                            ? { ...(await assets.getScriptEntry(path)), exportName }
                            : { href: path, exportName };
                    },
                    async resolveFrame(src, target, frame) {
                        let url = new URL(src, frame?.currentFrameSrc ?? context.url);
                        let headers = new Headers({ accept: "text/html" });
                        if (target) headers.set("x-remix-target", target);

                        let response = await context.router.fetch(new Request(url, { headers }));
                        if (!response.ok) {
                            throw new Error(`Failed to resolve frame ${url.pathname}`);
                        }

                        return response.body ?? (await response.text());
                    },
                });

                return createHtmlResponse(stream, init);
            },
    );
}
