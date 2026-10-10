#!/bin/sh
# Entry of the Railway "migrate" service (Dockerfile.railway-migrate). Variables (Railway references, never literals):
#   MIGRATION_DATABASE_URL  owner (dzidza_owner) on postgres.railway.internal  - required
#   DATABASE_URL            app_rw on postgres.railway.internal                - for seed/import
#   DB_APP_ENVIRONMENT      production
#   RUN_SEED=1              run the catalogue seed (never the demo seed)
#   IMPORT_FAMILIES=a,b     import these content families (IN REVIEW; publishing is a separate human step, section 41)
set -eu
echo "[migrate] 1/3 migrations, grants and production guards"
node_modules/.bin/tsx scripts/db-deploy.ts

if [ "${RUN_SEED:-0}" = "1" ]; then
  echo "[migrate] 2/3 catalogue seed"
  env -u MIGRATION_DATABASE_URL npm run db:seed
fi

if [ -n "${IMPORT_FAMILIES:-}" ]; then
  echo "[migrate] 3/3 content import: ${IMPORT_FAMILIES}"
  env -u MIGRATION_DATABASE_URL npm run content:import -- --family "${IMPORT_FAMILIES}" --no-cache
fi
echo "[migrate] done"
