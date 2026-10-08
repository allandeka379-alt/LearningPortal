import "server-only";
import { db, type DbClient } from "@/server/db";

/**
 * Production boot assertions (raw SQL section D; ARCHITECTURE §4.12). The privacy and integrity guarantees enforced
 * by Postgres only hold when the application connects as the right kind of role with the right database defaults:
 *
 * 1. the role is NOT a superuser and NOT `BYPASSRLS` (otherwise row-level security on AI conversations is skipped);
 * 2. the role cannot UPDATE or DELETE `AuditLog` (append-only audit trail; the trigger is only the second line);
 * 3. `app.environment = 'production'` (database default; forbids demo rows).
 *
 * `app.four_eyes = 'on'` (approver ≠ author) is reported as a warning: it is a section D default too, but an
 * environment may deliberately run without it during a migration window.
 *
 * {@link assertDatabaseSafety} runs from `src/instrumentation.ts` and the worker at boot in production; the process
 * exits when any check fails.
 */

/** Facts read from the database (injectable for unit tests). */
export interface DatabaseSafetyFacts {
  roleName: string;
  isSuperuser: boolean;
  bypassesRls: boolean;
  canUpdateAuditLog: boolean;
  canDeleteAuditLog: boolean;
  /** `current_setting('app.environment', true)`; `null` when unset. */
  environment: string | null;
  /** `current_setting('app.four_eyes', true)`; `null` when unset. */
  fourEyes: string | null;
}

export interface DatabaseSafetyReport {
  ok: boolean;
  /** Failed hard requirements (each a human-readable sentence naming the fix). */
  failures: string[];
  warnings: string[];
}

/** Pure decision over {@link DatabaseSafetyFacts}. */
export function evaluateDatabaseSafety(facts: DatabaseSafetyFacts): DatabaseSafetyReport {
  const failures: string[] = [];
  const warnings: string[] = [];
  const role = `role "${facts.roleName}"`;
  if (facts.isSuperuser) {
    failures.push(`${role} is a SUPERUSER; connect as a NOSUPERUSER application role (raw SQL section D).`);
  }
  if (facts.bypassesRls) {
    failures.push(`${role} has BYPASSRLS, which skips AI-conversation row-level security; use NOBYPASSRLS.`);
  }
  if (facts.canUpdateAuditLog || facts.canDeleteAuditLog) {
    failures.push(`${role} can UPDATE or DELETE "AuditLog"; REVOKE UPDATE, DELETE, TRUNCATE ON "AuditLog" FROM it.`);
  }
  if (facts.environment !== "production") {
    failures.push(
      `app.environment is ${facts.environment === null ? "unset" : `"${facts.environment}"`}; ` +
        `run ALTER DATABASE <db> SET app.environment = 'production'.`,
    );
  }
  if (facts.fourEyes !== "on") {
    warnings.push("app.four_eyes is not 'on': content approvers may approve their own work (ALTER DATABASE <db> SET app.four_eyes = 'on').");
  }
  return { ok: failures.length === 0, failures, warnings };
}

/** Reads the {@link DatabaseSafetyFacts} for the connected role. */
export async function readDatabaseSafetyFacts(client: DbClient = db): Promise<DatabaseSafetyFacts> {
  const rows = await client.$queryRaw<DatabaseSafetyFacts[]>`
    SELECT r.rolname::text AS "roleName",
           r.rolsuper AS "isSuperuser",
           r.rolbypassrls AS "bypassesRls",
           has_table_privilege(current_user, '"AuditLog"', 'UPDATE') AS "canUpdateAuditLog",
           has_table_privilege(current_user, '"AuditLog"', 'DELETE') AS "canDeleteAuditLog",
           current_setting('app.environment', true) AS "environment",
           current_setting('app.four_eyes', true) AS "fourEyes"
      FROM pg_roles r
     WHERE r.rolname = current_user`;
  const facts = rows[0];
  if (!facts) throw new Error("db-safety: could not read the current role from pg_roles");
  // current_setting(..., true) returns '' (not NULL) for a placeholder that was set and reset in this session.
  return {
    ...facts,
    environment: facts.environment === "" ? null : facts.environment,
    fourEyes: facts.fourEyes === "" ? null : facts.fourEyes,
  };
}

/** Thrown by {@link assertDatabaseSafety}; `message` lists every failed check. */
export class DatabaseSafetyError extends Error {
  readonly failures: readonly string[];

  constructor(failures: readonly string[]) {
    super(`Unsafe database configuration, refusing to start:\n${failures.map((failure) => `  - ${failure}`).join("\n")}`);
    this.name = "DatabaseSafetyError";
    this.failures = failures;
  }
}

/**
 * Reads and evaluates the database configuration.
 *
 * @throws DatabaseSafetyError when any hard requirement fails.
 * @returns the report (including warnings) when safe.
 */
export async function assertDatabaseSafety(client: DbClient = db): Promise<DatabaseSafetyReport> {
  const report = evaluateDatabaseSafety(await readDatabaseSafetyFacts(client));
  if (!report.ok) throw new DatabaseSafetyError(report.failures);
  return report;
}
