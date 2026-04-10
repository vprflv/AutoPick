# ====================== BASE ======================
FROM node:22-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@9 --activate

# ====================== BUILDER ======================
FROM base AS builder

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prefer-offline

COPY . .

ENV NODE_ENV=production

# Собираем приложение (здесь можно передать build-time переменные, если нужно)
RUN pnpm build

# ====================== RUNNER (production) ======================
FROM base AS runner



# Создаём пользователя
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod --prefer-offline

# Копируем собранное приложение
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

CMD ["pnpm", "start"]