FROM node:22-alpine AS base

WORKDIR /app

# Copy only essential files first
COPY package.json pnpm-lock.yaml ./

# Install pnpm and dependencies
RUN corepack enable && \
    corepack prepare pnpm@9 --activate && \
    pnpm install --frozen-lockfile --prefer-offline

# Copy source code
COPY . .

ENV NEXT_PUBLIC_SUPABASE_URL=//yfrqupwvvklyojymetod.supabase.co
ENV NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=sb_publishable_DgDXLA7PyOLUa9tEU0e6zw_utfIta9f

# Build the app
RUN pnpm build

# Production image
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy built assets
COPY --from=base /app/.next ./.next
COPY --from=base /app/public ./public
COPY --from=base /app/package.json ./package.json
COPY --from=base /app/node_modules ./node_modules

EXPOSE 3000

CMD ["pnpm", "start"]