#!/bin/sh
# Entry of the Railway "migrate" service (Dockerfile.railway-migrate). Variables (Railway references, never literals):
#   MIGRATION_DATABASE_URL    owner (dzidza_owner) on postgres.railway.internal  - required
#   DATABASE_URL              app_rw on postgres.railway.internal                - for seed/import/publish
#   DB_APP_ENVIRONMENT        production
#   RUN_SEED=1                run the catalogue seed (never the demo seed); also enforces "no free tier" on the FREE plan
#   IMPORT_FAMILIES=a,b       import these content families, then publish them (below). combined-science-o must be
#                             listed together with mathematics-o,biology-o,physics-o,chemistry-o (its tests borrow
#                             their question banks; alone it fails validation).
#   CONTENT_PUBLISH_APPROVER  email of an existing ADMIN account (content.review + content.publish; ADMIN also
#                             publishes DRAFT syllabus versions and makes subjects AVAILABLE). Unset = import only.
#
# Owner decision 2026-10-12: human content review before production publishing is removed, so every deploy imports
# AND publishes. The importer's author is the pipeline system account and the approver is this human ADMIN, so
# production's four-eyes rule (app.four_eyes = on) still holds. A family with nothing new is a fast no-op; changed
# files (CONFLICT draft copies) are merged into the live items as a new revision; students keep what they saw.
set -eu
echo "[migrate] 1/4 migrations, grants and production guards"
node_modules/.bin/tsx scripts/db-deploy.ts

if [ "${RUN_SEED:-0}" = "1" ]; then
  echo "[migrate] 2/4 catalogue seed"
  env -u MIGRATION_DATABASE_URL npm run db:seed
fi

if [ -n "${IMPORT_FAMILIES:-}" ]; then
  echo "[migrate] 3/4 content import: ${IMPORT_FAMILIES}"
  env -u MIGRATION_DATABASE_URL npm run content:import -- --family "${IMPORT_FAMILIES}" --no-cache

  if [ -n "${CONTENT_PUBLISH_APPROVER:-}" ]; then
    echo "[migrate] 4/4 content publish: ${IMPORT_FAMILIES} (approver ${CONTENT_PUBLISH_APPROVER})"
    env -u MIGRATION_DATABASE_URL npm run content:publish -- --approver "${CONTENT_PUBLISH_APPROVER}" --family "${IMPORT_FAMILIES}" \
      --note "Published automatically on deploy (owner decision 2026-10-12: no human review step before production)."
  else
    echo "[migrate] 4/4 content publish SKIPPED: CONTENT_PUBLISH_APPROVER is not set, so the imported items stay IN REVIEW"
  fi
fi
echo "[migrate] done"
