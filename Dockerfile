FROM node:22-alpine AS base

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@9 --activate

WORKDIR /app

# Copy root files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc* ./

# Copy all workspace package.json files
COPY src/app/package.json ./src/app/
COPY src/features/*/package.json ./src/features/
COPY src/components/*/package.json ./src/components/
COPY src/shared/*/package.json ./src/shared/

# Install dependencies
RUN pnpm install --frozen-lockfile --prefer-offline

# Copy source code
COPY . .

# Build
RUN pnpm build

# Production image
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy necessary files from builder
COPY --from=base /app/.next ./.next
COPY --from=base /app/public ./public
COPY --from=base /app/package.json ./package.json
COPY --from=base /app/node_modules ./node_modules

EXPOSE 3000

CMD ["pnpm", "start"]