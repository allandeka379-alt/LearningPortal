-- Maintenance role for retention purges (docs/DEPLOYMENT.md "Scheduled operations"; ARCHITECTURE §4.12 section D,
-- §4.13). Run as the database OWNER; idempotent.
--
-- Why a separate role: the application role (app_rw) can never UPDATE or DELETE "AuditLog" (append-only by privilege,
-- with the "AuditLog_append_only" trigger as the second line). Retention still has to remove entries older than the
-- documented period (2 years; 6 years for payment-related entities). Only this role may DELETE audit rows, and the
-- trigger lets a DELETE through only inside a transaction that ran SET LOCAL app.audit_retention_purge = 'on' AND only
-- for rows past retention. scripts/maintenance/purge-audit.ts is the one program that does this.
--
-- Local dev/test: the role is created without a password (trust auth). Staging/production: create it ONCE with a
-- password as the owner or admin before running this file (the CREATE below is then skipped):
--   CREATE ROLE app_maintenance LOGIN NOSUPERUSER NOBYPASSRLS NOCREATEDB NOCREATEROLE PASSWORD '<hex password>';

-- Purpose: the maintenance login role exists (no password here: local trust auth only).
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'app_maintenance') THEN
    CREATE ROLE app_maintenance LOGIN NOSUPERUSER NOBYPASSRLS NOCREATEDB NOCREATEROLE;
  END IF;
END
$$;

-- Purpose: it may connect to this database and see the schema.
DO $$
BEGIN
  EXECUTE format('GRANT CONNECT ON DATABASE %I TO app_maintenance', current_database());
END
$$;
GRANT USAGE ON SCHEMA public TO app_maintenance;

-- Purpose: read and purge audit entries past retention, and record each purge run (one SYSTEM entry). Nothing else:
-- no UPDATE (entries are never rewritten), no access to any other table.
GRANT SELECT, INSERT, DELETE ON "AuditLog" TO app_maintenance;
REVOKE UPDATE, TRUNCATE ON "AuditLog" FROM app_maintenance;

-- Purpose: timestamps in UTC, like the app role.
ALTER ROLE app_maintenance SET TimeZone = 'UTC';
