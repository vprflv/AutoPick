FROM node:22-alpine AS base

# Enable corepack and prepare pnpm
RUN corepack enable && corepack prepare pnpm@9 --activate

WORKDIR /app

# Copy workspace configuration files first
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Copy all package.json files from workspaces
COPY src/*/package.json ./src/

# Install dependencies
RUN pnpm install --frozen-lockfile --prefer-offline

# Build
COPY . .
RUN pnpm build

# Production stage
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