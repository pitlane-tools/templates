# Dockerfile
FROM node:24-alpine
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile

COPY . .
RUN pnpm exec vp build && pnpm prune --prod

ENV NODE_ENV=production
# Apply pending migrations (idempotent), then serve the built fetch handler.
CMD ["sh", "-c", "node db/migrate.ts && node server.ts"]
