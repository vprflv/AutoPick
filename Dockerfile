# ====================== BASE ======================
FROM node:22-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

WORKDIR /app

# Включаем corepack (pnpm идёт вместе с Node 22)
RUN corepack enable && corepack prepare pnpm@9 --activate

# ====================== BUILDER ======================
FROM base AS builder

# Копируем только файлы для установки зависимостей
COPY package.json pnpm-lock.yaml ./

# Устанавливаем все зависимости (включая dev)
RUN pnpm install --frozen-lockfile --prefer-offline

# Копируем весь код
COPY . .

ENV NEXT_PUBLIC_SUPABASE_URL=https://yfrqupwvvklyojymetod.supabase.co
ENV NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=sb_publishable_DgDXLA7PyOLUa9tEU0e6zw_utfIta9f
ENV RESEND_API_KEY=re_ULBpYCK9_2gi9Y4p2GUyokdM3uodT3VH3

# Собираем приложение
RUN pnpm build

# ====================== RUNNER (production) ======================
FROM base AS runner

ENV NODE_ENV=production

# Создаём не-root пользователя (безопасность)
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

WORKDIR /app

# Копируем только package.json + lock для production install
COPY package.json pnpm-lock.yaml ./

# Устанавливаем ТОЛЬКО production зависимости
RUN pnpm install --frozen-lockfile --prod --prefer-offline

# Копируем собранное приложение из builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Даём права пользователю nextjs
RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

# Запуск (лучше через standalone, но для начала так)
CMD ["pnpm", "start"]