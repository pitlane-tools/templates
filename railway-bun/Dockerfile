# Dockerfile
FROM oven/bun:1-alpine
WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .
RUN bunx --bun vp build

ENV NODE_ENV=production
# Apply pending migrations (idempotent), then serve the built fetch handler.
CMD ["sh", "-c", "bun db/migrate.ts && bun server.ts"]
