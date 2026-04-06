FROM node:22-alpine AS base

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN corepack enable && \
    corepack prepare pnpm@9 --activate && \
    pnpm install --frozen-lockfile --prefer-offline

# Copy source code
COPY . .

# Build
RUN pnpm build

# Production stage
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy only necessary files
COPY --from=base /app/.next ./.next
COPY --from=base /app/public ./public
COPY --from=base /app/package.json ./package.json
COPY --from=base /app/node_modules ./node_modules

EXPOSE 3000

CMD ["pnpm", "start"]