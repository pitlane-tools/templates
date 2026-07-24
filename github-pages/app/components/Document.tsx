import { Theme, theme } from "#app/components/Theme.tsx";
import clientAssets from "#app/entry.browser.tsx?assets=client";
import styles from "#app/styles/preflight.css?url";
import { Frame, css, type Handle } from "remix/ui";

export interface DocumentProps {
    url: URL;
}

export function Document(handle: Handle<DocumentProps>) {
    return () => {
        let { url } = handle.props;

        return (
            <html
                lang="en"
                mix={css({
                    backgroundColor: theme.surface.lvl0,
                })}
            >
                <head>
                    <meta charSet="utf-8" />
                    <meta content="width=device-width, initial-scale=1" name="viewport" />
                    <title>New Remix App</title>

                    <link href="/favicon.ico" rel="icon" sizes="32x32" type="image/x-icon" />
                    <link href="/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180" />

                    <Theme />
                    <link href={styles} rel="stylesheet" />
                    {clientAssets.css.map(attrs => (
                        <link key={attrs.href} {...attrs} rel="stylesheet" />
                    ))}

                    <script async src={clientAssets.entry} type="module" />
                    {clientAssets.js.map(attrs => (
                        <link key={attrs.href} {...attrs} rel="modulepreload" />
                    ))}
                </head>
                <body>
                    <Frame name="welcome" src={url.toString()} />
                </body>
            </html>
        );
    };
}
