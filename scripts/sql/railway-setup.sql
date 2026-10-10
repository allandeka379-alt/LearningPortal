-- One-time setup of Railway Postgres 18 for production (docs/DEPLOYMENT.md "Appendix: Railway" and §4).
-- Run ONCE as Railway's `postgres` superuser, from a trusted machine, in psql (it prompts for every password, so none
-- ends up in a file, shell history or server log):
--
--   psql "<DATABASE_PUBLIC_URL of the Postgres service>" -f scripts/sql/railway-setup.sql
--
-- Then run the migrate job as the owner (scripts/db-deploy.ts) before the first web build.

-- Purpose: owner of the database and every table; holds ADMIN on app_rw for the grants script.
CREATE ROLE dzidza_owner LOGIN NOSUPERUSER NOBYPASSRLS NOCREATEDB CREATEROLE;
\echo 'Password for dzidza_owner (use 32+ hex characters):'
\password dzidza_owner

-- Purpose: the production database, owned by the owner role (Railway's default `railway` database stays unused).
CREATE DATABASE dzidza OWNER dzidza_owner;

-- Purpose: the app role, created AS the owner so the owner holds ADMIN OPTION on it (PostgreSQL 16+).
SET ROLE dzidza_owner;
CREATE ROLE app_rw LOGIN NOSUPERUSER NOBYPASSRLS NOCREATEDB NOCREATEROLE;
RESET ROLE;
\echo 'Password for app_rw:'
\password app_rw

-- Purpose: read-only role for `next build` (prerendering through the public proxy). SELECT only, no row-level-security bypass.
CREATE ROLE app_build LOGIN NOSUPERUSER NOBYPASSRLS NOCREATEDB NOCREATEROLE;
\echo 'Password for app_build:'
\password app_build

-- Purpose: the audit-log retention purge role (grants come from scripts/sql/maintenance-role-grants.sql).
CREATE ROLE app_maintenance LOGIN NOSUPERUSER NOBYPASSRLS NOCREATEDB NOCREATEROLE;
\echo 'Password for app_maintenance:'
\password app_maintenance

-- Purpose: production guards checked by the boot assertions and /api/ready (no demo rows; approver differs from author).
ALTER DATABASE dzidza SET app.environment = 'production';
ALTER DATABASE dzidza SET app.four_eyes = 'on';

-- Purpose: app_build reads every table the owner creates now or later (migrations add tables).
\connect dzidza
GRANT CONNECT ON DATABASE dzidza TO app_build;
GRANT USAGE ON SCHEMA public TO app_build;
ALTER DEFAULT PRIVILEGES FOR ROLE dzidza_owner IN SCHEMA public GRANT SELECT ON TABLES TO app_build;
