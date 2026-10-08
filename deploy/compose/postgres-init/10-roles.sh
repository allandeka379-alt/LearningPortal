#!/bin/sh
# Runs ONCE, when the postgres container initialises an EMPTY data volume (/docker-entrypoint-initdb.d), as the
# bootstrap superuser. Creates the section D roles and database for docker-compose.prod.example.yml
# (docs/DEPLOYMENT.md "Database roles"):
#
#   dzidza_owner  owns the database and runs migrations (NOSUPERUSER; CREATEROLE only so it holds ADMIN on app_rw,
#                 which `ALTER ROLE app_rw SET TimeZone` in scripts/sql/app-role-grants.sql needs on PostgreSQL 16+)
#   app_rw        the application role: NOSUPERUSER NOBYPASSRLS, so row-level security and append-only rules apply
#
# It also stores the section D database defaults (app.environment, app.four_eyes). They are placeholder parameters,
# which only a superuser may store with ALTER DATABASE (or a role granted SET ON PARAMETER); the migrate job then
# verifies them on every deploy.
#
# Changing a password later: ALTER ROLE ... PASSWORD from psql (\password), then update .env.production.
set -eu

: "${DZ_OWNER_PASSWORD:?DZ_OWNER_PASSWORD must be set}"
: "${DZ_APP_PASSWORD:?DZ_APP_PASSWORD must be set}"
DZ_DB_NAME="${DZ_DB_NAME:-dzidza}"
DZ_APP_ENVIRONMENT="${DZ_APP_ENVIRONMENT:-production}"

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "${POSTGRES_DB:-postgres}" \
  --set=owner_password="$DZ_OWNER_PASSWORD" \
  --set=app_password="$DZ_APP_PASSWORD" \
  --set=db_name="$DZ_DB_NAME" \
  --set=app_environment="$DZ_APP_ENVIRONMENT" <<'SQL'
CREATE ROLE dzidza_owner LOGIN NOSUPERUSER NOBYPASSRLS NOCREATEDB CREATEROLE PASSWORD :'owner_password';
CREATE DATABASE :"db_name" OWNER dzidza_owner;

-- Created BY the owner, so the owner holds ADMIN OPTION on it (PostgreSQL 16+ semantics).
SET ROLE dzidza_owner;
CREATE ROLE app_rw LOGIN NOSUPERUSER NOBYPASSRLS NOCREATEDB NOCREATEROLE PASSWORD :'app_password';
RESET ROLE;

ALTER DATABASE :"db_name" SET app.environment = :'app_environment';
ALTER DATABASE :"db_name" SET app.four_eyes = 'on';
-- Lets the owner (the migrate job) correct these defaults itself on later deploys.
GRANT SET ON PARAMETER app.environment, app.four_eyes TO dzidza_owner;

\connect :"db_name"
-- Query statistics for slow-query work (ARCHITECTURE §9.2); needs shared_preload_libraries (see the compose file).
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
SQL

echo "[init] created dzidza_owner, app_rw and database ${DZ_DB_NAME} (app.environment=${DZ_APP_ENVIRONMENT})"
