# syntax=docker/dockerfile:1.7
#
# Container image (docs/DEPLOYMENT.md, ARCHITECTURE §10). One Dockerfile, one build, two targets:
#
#   runtime (default)  web    -> node server.js            (Next.js standalone server, port 3000)
#                      worker -> node worker/index.mjs     (same image, CMD override; bundled by scripts/build-worker.mjs)
#   tools              one-shot jobs with the full toolchain, never serves traffic:
#                      migrations + section D -> tsx scripts/db-deploy.ts (default CMD)
#                      catalogue seed         -> npm run db:seed            (NEVER db:seed:demo / --demo)
#
# Build (BuildKit). `next build` prerenders public pages from the database, so the build needs a reachable, migrated
# database: pass its URL as a SECRET (never a build arg: build args are visible in `docker history`). Use a read-only
# role on the target environment's database or replica, so prerendered pages carry real content.
#
#   docker build \
#     --secret id=build_database_url,env=BUILD_DATABASE_URL \
#     --build-arg APP_URL=https://learn.example.com \
#     --build-arg GIT_SHA=$(git rev-parse --short=12 HEAD) \
#     --network host \
#     -t dzidza:$(git rev-parse --short=12 HEAD) .
#   docker build --target tools -t dzidza-tools:$(git rev-parse --short=12 HEAD) .
#
# The tools target does not run `next build` and needs no secret or database.

ARG NODE_IMAGE=node:24-bookworm-slim

# ---------------------------------------------------------------------------------------------------------------------
# deps: every dependency (dev included: next build, prisma CLI, tsx, esbuild). Cached on package-lock.json.
# ---------------------------------------------------------------------------------------------------------------------
FROM ${NODE_IMAGE} AS deps
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
# openssl + ca-certificates: Prisma's schema engine (migrate deploy) detects and links OpenSSL and verifies TLS to
# managed PostgreSQL; @prisma/engines downloads that engine during npm ci.
RUN apt-get update \
 && apt-get install -y --no-install-recommends openssl ca-certificates \
 && rm -rf /var/lib/apt/lists/*
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm npm ci --no-audit --no-fund

# ---------------------------------------------------------------------------------------------------------------------
# build: prisma generate, next build (standalone), worker bundle.
# ---------------------------------------------------------------------------------------------------------------------
FROM deps AS build
# Inlined into client bundles and prerendered HTML at build time, so they are build arguments.
ARG APP_URL
ARG NEXT_PUBLIC_APP_NAME=BvunzoHub
ARG NEXT_PUBLIC_SUPPORT_EMAIL=
# Release id (git SHA): Next.js deploymentId (version-skew protection during rolling deploys) + /api/health.
ARG GIT_SHA=
ENV NEXT_PUBLIC_APP_NAME=${NEXT_PUBLIC_APP_NAME} \
    NEXT_PUBLIC_SUPPORT_EMAIL=${NEXT_PUBLIC_SUPPORT_EMAIL}
COPY . .
# The Prisma CLI only needs SOME URL to load prisma.config.ts; generate never connects.
RUN MIGRATION_DATABASE_URL=postgresql://build@127.0.0.1:1/unused npx prisma generate
# - SESSION_SECRET: a throwaway value that satisfies env validation while prerendering; never stored in a layer.
# - NODE_ENV=production: production build; runtime-only env rules (payments, messaging, proxy hops) are skipped by
#   env.ts while NEXT_PHASE=phase-production-build, and the database boot checks run only when the server starts.
RUN --mount=type=secret,id=build_database_url,required=true \
    --mount=type=cache,target=/app/.next/cache \
    test -n "${APP_URL}" || { echo "Build argument APP_URL is required (public https origin of this environment)." >&2; exit 1; }; \
    DATABASE_URL="$(cat /run/secrets/build_database_url)" \
    SESSION_SECRET="$(node -e "process.stdout.write(require('node:crypto').randomBytes(32).toString('hex'))")" \
    APP_URL="${APP_URL}" \
    NEXT_DEPLOYMENT_ID="${GIT_SHA}" \
    NODE_ENV=production \
    npm run build \
 && node scripts/build-worker.mjs --outdir=build/worker

# ---------------------------------------------------------------------------------------------------------------------
# tools: migrations, section D grants and the catalogue seed. Full source + node_modules; runs as the non-root `node`.
# ---------------------------------------------------------------------------------------------------------------------
FROM deps AS tools
COPY . .
RUN MIGRATION_DATABASE_URL=postgresql://build@127.0.0.1:1/unused npx prisma generate
# CHECKPOINT_DISABLE: no Prisma update/telemetry calls from production jobs.
ENV NODE_ENV=production \
    CHECKPOINT_DISABLE=1
USER node
# Needs MIGRATION_DATABASE_URL (owner, DIRECT connection, not PgBouncer) and DB_APP_ENVIRONMENT (production|staging).
CMD ["node_modules/.bin/tsx", "scripts/db-deploy.ts"]

# ---------------------------------------------------------------------------------------------------------------------
# runtime (default target): web + worker. Slim: standalone server, static assets, worker bundle, migrations folder.
# ---------------------------------------------------------------------------------------------------------------------
FROM ${NODE_IMAGE} AS runtime
# tini as PID 1: forwards SIGTERM to node (graceful shutdown) and reaps zombies.
RUN apt-get update \
 && apt-get install -y --no-install-recommends tini \
 && rm -rf /var/lib/apt/lists/*
WORKDIR /app
ARG GIT_SHA=
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0 \
    APP_RELEASE=${GIT_SHA}

# Code and dependencies stay root-owned (read-only for the app user).
COPY --from=build /app/.next/standalone/server.js /app/.next/standalone/package.json ./
COPY --from=build /app/.next/standalone/node_modules ./node_modules
COPY --from=build /app/public ./public
# Native addons the worker bundle loads from node_modules (the web trace normally contains them too).
COPY --from=build /app/node_modules/sharp ./node_modules/sharp
COPY --from=build /app/node_modules/@img ./node_modules/@img
COPY --from=build /app/node_modules/@node-rs ./node_modules/@node-rs
COPY --from=build /app/node_modules/detect-libc ./node_modules/detect-libc
COPY --from=build /app/node_modules/semver ./node_modules/semver
COPY --from=build /app/build/worker ./worker
# Shipped migrations: /api/ready checks they are all applied (src/server/ops/readiness.ts).
COPY --from=build /app/prisma/schema.prisma ./prisma/schema.prisma
COPY --from=build /app/prisma/migrations ./prisma/migrations
# Next.js writes regenerated ISR pages under .next at runtime, and the local storage driver writes ./storage
# (STORAGE_DRIVER=local with a shared volume); both belong to the app user.
COPY --from=build --chown=node:node /app/.next/standalone/.next ./.next
COPY --from=build --chown=node:node /app/.next/static ./.next/static
RUN mkdir -p /app/storage && chown node:node /app/storage

USER node
EXPOSE 3000
# Liveness only (no database): /api/health. Load balancers should use /api/ready. The worker container disables this
# check (docker-compose.prod.example.yml): it serves no HTTP.
HEALTHCHECK --interval=30s --timeout=5s --start-period=40s --retries=3 \
  CMD ["node", "-e", "fetch('http://127.0.0.1:'+(process.env.PORT||3000)+'/api/health').then(r=>process.exit(r.ok?0:1),()=>process.exit(1))"]
ENTRYPOINT ["/usr/bin/tini", "--"]
CMD ["node", "server.js"]
