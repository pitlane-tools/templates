# Dockerfile
FROM denoland/deno:alpine
WORKDIR /app

COPY . .
RUN deno install --allow-scripts
RUN deno task build

ENV NODE_ENV=production
# Apply pending migrations (idempotent), then serve the built fetch handler.
# Shell form so Railway's injected $PORT expands.
CMD deno -A db/migrate.ts && deno serve -A --port=$PORT dist/ssr/index.js
