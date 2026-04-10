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

ENV NEXT_PUBLIC_SUPABASE_URL=https://yfrqupwvvklyojymetod.supabase.co
ENV NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=sb_publishable_DgDXLA7PyOLUa9tEU0e6zw_utfIta9f
ENV NEXT_PUBLIC_RESEND_API_KEY=re_ULBpYCK9_2gi9Y4p2GUyokdM3uodT3VH3
ENV RESEND_API_KEY=re_ULBpYCK9_2gi9Y4p2GUyokdM3uodT3VH3

# Собираем приложение (здесь можно передать build-time переменные, если нужно)
RUN pnpm build

# ====================== RUNNER (production) ======================
FROM base AS runner

ENV NODE_ENV=production




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