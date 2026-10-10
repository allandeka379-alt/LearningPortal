-- Application role + privileges for LOCAL dev/test databases (mirrors docs/ARCHITECTURE.md §4 / raw SQL section D).
--
-- Why: the app must connect as a NOSUPERUSER NOBYPASSRLS role. Superusers silently skip row-level security, so with
-- the `postgres` superuser the AI-conversation privacy policies (§21) would never be exercised by dev or tests.
-- Migrations run as the owner (`MIGRATION_DATABASE_URL`); the app uses `app_rw` (`DATABASE_URL`).
--
-- Idempotent: safe to run after every migration (`npm run db:grants`; tests/global-setup.ts runs it automatically).
-- Run as the database OWNER. Local clusters use trust auth, so app_rw needs no password here.
-- Staging/production: `scripts/db-deploy.mjs` (the deploy `migrate` job, docs/DEPLOYMENT.md) applies THIS file after
-- `prisma migrate deploy`, but only once the operator has created app_rw WITH a password (it refuses otherwise, so the
-- password-less CREATE ROLE below never runs there), and then sets the section D database defaults
-- (app.environment, app.four_eyes) and verifies the result.

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'app_rw') THEN
    CREATE ROLE app_rw LOGIN NOSUPERUSER NOBYPASSRLS NOCREATEDB NOCREATEROLE;
  END IF;
END
$$;

DO $$
BEGIN
  EXECUTE format('GRANT CONNECT ON DATABASE %I TO app_rw', current_database());
END
$$;

GRANT USAGE ON SCHEMA public TO app_rw;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO app_rw;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO app_rw;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO app_rw;

-- Objects created later by the owner (future migrations) get the same privileges automatically.
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO app_rw;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT USAGE, SELECT ON SEQUENCES TO app_rw;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT EXECUTE ON FUNCTIONS TO app_rw;

-- Append-only tables (primary control; the triggers are the second line of defence) + migration bookkeeping.
DO $$
BEGIN
  IF to_regclass('public."AuditLog"') IS NOT NULL THEN
    REVOKE UPDATE, DELETE, TRUNCATE ON "AuditLog" FROM app_rw;
  END IF;
  IF to_regclass('public."ContentRevision"') IS NOT NULL THEN
    REVOKE DELETE, TRUNCATE ON "ContentRevision" FROM app_rw;
  END IF;
  IF to_regclass('public."PaymentEvent"') IS NOT NULL THEN
    REVOKE DELETE, TRUNCATE ON "PaymentEvent" FROM app_rw;
  END IF;
  IF to_regclass('public."_prisma_migrations"') IS NOT NULL THEN
    REVOKE ALL ON "_prisma_migrations" FROM app_rw;
    -- Purpose: the readiness probe (GET /api/ready, src/server/ops/readiness.ts) checks that every migration shipped
    -- with the running release is applied. It may read names and state only: no checksums, no logs, no writes.
    GRANT SELECT (migration_name, finished_at, rolled_back_at) ON "_prisma_migrations" TO app_rw;
  END IF;
END
$$;

-- Timestamps: the app stores and reads UTC. The pg adapter also sends `-c TimeZone=UTC` at connect time
-- (src/server/db.ts); this role default is the backstop for poolers that drop startup options.
ALTER ROLE app_rw SET TimeZone = 'UTC';

-- Purpose: optional read-only build role (Railway: `next build` prerenders through the public proxy as app_build,
-- docs/DEPLOYMENT.md "Appendix: Railway"). SELECT only, re-applied after every migration so new tables are readable;
-- skipped where the role does not exist (local dev, containers).
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'app_build') THEN
    EXECUTE format('GRANT CONNECT ON DATABASE %I TO app_build', current_database());
    GRANT USAGE ON SCHEMA public TO app_build;
    GRANT SELECT ON ALL TABLES IN SCHEMA public TO app_build;
    ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO app_build;
  END IF;
END
$$;
