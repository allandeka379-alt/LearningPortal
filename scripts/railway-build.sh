#!/bin/sh
# Build step of Dockerfile.railway. Kept in a script so the build log shows `RUN sh scripts/railway-build.sh` and never
# the expanded values: Docker prints a RUN line with its build arguments substituted, which would put the build
# database password into Railway's build logs. Reads APP_URL, BUILD_DATABASE_URL and RAILWAY_GIT_COMMIT_SHA (build args).
set -eu
if [ -z "${APP_URL:-}" ]; then echo "Service variable APP_URL is required (public https origin)." >&2; exit 1; fi
if [ -z "${BUILD_DATABASE_URL:-}" ]; then
  echo "Service variable BUILD_DATABASE_URL is required (read-only app_build role, public proxy)." >&2
  exit 1
fi
DATABASE_URL="$BUILD_DATABASE_URL" \
SESSION_SECRET="$(node -e "process.stdout.write(require('node:crypto').randomBytes(32).toString('hex'))")" \
NEXT_DEPLOYMENT_ID="${RAILWAY_GIT_COMMIT_SHA:-}" \
NODE_ENV=production \
  npm run build
node scripts/build-worker.mjs --outdir=build/worker
