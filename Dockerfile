FROM node:22-alpine AS base

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@9 --activate

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile --prefer-offline

# Copy source code
COPY . .

# Build the application
RUN pnpm build

# Production image
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy built files
COPY --from=base /app/.next ./.next
COPY --from=base /app/public ./public
COPY --from=base /app/package.json ./package.json
COPY --from=base /app/node_modules ./node_modules

EXPOSE 3000

CMD ["pnpm", "start"]