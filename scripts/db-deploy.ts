/**
 * Deploy-time database step for staging and production (docs/DEPLOYMENT.md "Migrations"; the `migrate` one-shot job
 * in docker-compose.prod.example.yml and the pre-deploy task of any other platform). Runs as the database OWNER over a
 * DIRECT connection (never through PgBouncer: Prisma Migrate holds a session advisory lock):
 *
 *   1. `prisma migrate deploy`                       (skipped with --skip-migrate)
 *   2. app role privileges: scripts/sql/app-role-grants.sql (idempotent; requires app_rw to exist already)
 *   3. section D database defaults: app.environment, app.four_eyes
 *   4. verification of section D for the app role; exits 1 when anything is off (the web and worker boot checks would
 *      refuse to start anyway, this fails the deploy earlier and says why)
 *
 * Usage (tools image or a checkout with dev dependencies):
 *   npx tsx scripts/db-deploy.ts [--skip-migrate] [--verify-only] [--environment=production|staging|development]
 *                                [--four-eyes=on|off] [--app-role=app_rw]
 * Environment: MIGRATION_DATABASE_URL (owner, required), DB_APP_ENVIRONMENT, DB_FOUR_EYES (defaults: production + on
 * when NODE_ENV=production, development + off otherwise).
 *
 * It never creates the app role: in staging/production the operator creates `app_rw` once WITH a password (managed
 * databases: as the master user, so the owner can manage it; see docs/DEPLOYMENT.md "Database roles"). Output names
 * roles and settings only, never connection strings or passwords.
 */
import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import path from "node:path";
import pg from "pg";
import { applyGrants } from "./apply-db-grants";

export const APP_ENVIRONMENTS = ["production", "staging", "development"] as const;
export type AppEnvironment = (typeof APP_ENVIRONMENTS)[number];

export interface DeployOptions {
  ownerUrl: string;
  appRole: string;
  environment: AppEnvironment;
  fourEyes: "on" | "off";
  migrate: boolean;
  verifyOnly: boolean;
}

const ROLE_PATTERN = /^[a-z_][a-z0-9_]{0,62}$/;

/**
 * Parses flags and environment. Pure.
 *
 * @throws Error naming the bad flag or variable (never its value when it may be a secret).
 */
export function parseDeployOptions(argv: readonly string[], env: Readonly<Record<string, string | undefined>>): DeployOptions {
  const flags = new Map<string, string | true>();
  for (const arg of argv) {
    const match = /^--([a-z][a-z-]*)(?:=(.*))?$/.exec(arg);
    if (!match?.[1]) throw new Error(`Unknown argument "${arg}"`);
    flags.set(match[1], match[2] ?? true);
  }
  for (const name of flags.keys()) {
    if (!["skip-migrate", "verify-only", "environment", "four-eyes", "app-role"].includes(name)) throw new Error(`Unknown flag "--${name}"`);
  }
  const value = (name: string, fallback: string | undefined): string | undefined => {
    const flag = flags.get(name);
    if (flag === true) throw new Error(`Flag "--${name}" needs a value`);
    return flag ?? fallback;
  };

  const ownerUrl = env.MIGRATION_DATABASE_URL?.trim();
  if (!ownerUrl) throw new Error("MIGRATION_DATABASE_URL (the database owner, direct connection) is required");
  if (!/^postgres(?:ql)?:\/\//.test(ownerUrl)) throw new Error("MIGRATION_DATABASE_URL must be a postgresql:// URL");

  const isProduction = env.NODE_ENV === "production";
  const environment = value("environment", env.DB_APP_ENVIRONMENT?.trim() || (isProduction ? "production" : "development"));
  if (!APP_ENVIRONMENTS.includes(environment as AppEnvironment)) {
    throw new Error(`Invalid environment "${environment}" (expected ${APP_ENVIRONMENTS.join(", ")})`);
  }
  const fourEyes = value("four-eyes", env.DB_FOUR_EYES?.trim() || (environment === "development" ? "off" : "on"));
  if (fourEyes !== "on" && fourEyes !== "off") throw new Error(`Invalid four-eyes setting "${fourEyes}" (expected on or off)`);
  if (environment === "production" && fourEyes !== "on") {
    throw new Error("app.four_eyes must be on in production (approver must differ from the author)");
  }
  const appRole = value("app-role", "app_rw")!;
  if (!ROLE_PATTERN.test(appRole)) throw new Error(`Invalid role name "${appRole}"`);
  // scripts/sql/app-role-grants.sql is written for app_rw; another name would grant the wrong role.
  if (appRole !== "app_rw" && !flags.has("verify-only")) throw new Error("Only app_rw is supported for grants (use --verify-only for other roles)");

  return {
    ownerUrl,
    appRole,
    environment: environment as AppEnvironment,
    fourEyes,
    migrate: !flags.has("skip-migrate") && !flags.has("verify-only"),
    verifyOnly: flags.has("verify-only"),
  };
}

/** What the owner can see about the app role and the database defaults. */
export interface RoleFacts {
  exists: boolean;
  canLogin: boolean;
  isSuperuser: boolean;
  bypassesRls: boolean;
  auditLogWritable: boolean;
  contentRevisionDeletable: boolean;
  paymentEventDeletable: boolean;
  canReadMigrations: boolean;
  canWriteMigrations: boolean;
  /** Database-level defaults (`ALTER DATABASE ... SET`). */
  databaseSettings: Record<string, string>;
  /** Role-level settings that apply in this database (`ALTER ROLE ... SET`, with or without `IN DATABASE`). */
  roleSettings: Record<string, string>;
}

/** Parses `pg_db_role_setting.setconfig` entries (`name=value`). Later entries win. */
export function parseSettings(entries: readonly string[] | null | undefined): Record<string, string> {
  const settings: Record<string, string> = {};
  for (const entry of entries ?? []) {
    const index = entry.indexOf("=");
    if (index > 0) settings[entry.slice(0, index).toLowerCase()] = entry.slice(index + 1);
  }
  return settings;
}

export interface Verification {
  ok: boolean;
  failures: string[];
}

/** Section D, checked from the owner's side. Pure. */
export function verifySectionD(facts: RoleFacts, expected: { appRole: string; environment: AppEnvironment; fourEyes: "on" | "off" }): Verification {
  const failures: string[] = [];
  const role = `role ${expected.appRole}`;
  if (!facts.exists) {
    return { ok: false, failures: [`${role} does not exist: create it once with a password (docs/DEPLOYMENT.md "Database roles")`] };
  }
  if (!facts.canLogin) failures.push(`${role} cannot log in (ALTER ROLE ${expected.appRole} LOGIN)`);
  if (facts.isSuperuser) failures.push(`${role} is a superuser (row-level security would be skipped)`);
  if (facts.bypassesRls) failures.push(`${role} has BYPASSRLS (AI conversation privacy would be skipped)`);
  if (facts.auditLogWritable) failures.push(`${role} can UPDATE, DELETE or TRUNCATE "AuditLog"`);
  if (facts.contentRevisionDeletable) failures.push(`${role} can DELETE from "ContentRevision"`);
  if (facts.paymentEventDeletable) failures.push(`${role} can DELETE from "PaymentEvent"`);
  if (!facts.canReadMigrations) failures.push(`${role} cannot read "_prisma_migrations" names (the /api/ready migration check needs it)`);
  if (facts.canWriteMigrations) failures.push(`${role} can write "_prisma_migrations"`);

  const effective = (name: string): string | undefined => facts.roleSettings[name] ?? facts.databaseSettings[name];
  const environment = effective("app.environment");
  if (environment !== expected.environment) {
    failures.push(`app.environment is ${environment === undefined ? "unset" : `"${environment}"`} for ${expected.appRole}, expected "${expected.environment}"`);
  }
  const fourEyes = effective("app.four_eyes");
  if ((fourEyes ?? "off") !== expected.fourEyes) {
    failures.push(`app.four_eyes is ${fourEyes === undefined ? "unset" : `"${fourEyes}"`} for ${expected.appRole}, expected "${expected.fourEyes}"`);
  }
  const timeZone = effective("timezone");
  if (timeZone !== undefined && timeZone.toUpperCase() !== "UTC") {
    failures.push(`TimeZone is "${timeZone}" for ${expected.appRole}; the app requires UTC sessions`);
  }
  return { ok: failures.length === 0, failures };
}

/** Reads {@link RoleFacts} as the owner. Table checks tolerate tables that do not exist yet (fresh database). */
export async function readRoleFacts(client: pg.Client, appRole: string): Promise<RoleFacts> {
  const roles = await client.query<{ rolcanlogin: boolean; rolsuper: boolean; rolbypassrls: boolean; oid: number }>(
    "SELECT oid::int AS oid, rolcanlogin, rolsuper, rolbypassrls FROM pg_roles WHERE rolname = $1",
    [appRole],
  );
  const dbSettings = await client.query<{ setconfig: string[] | null }>(
    `SELECT s.setconfig FROM pg_db_role_setting s JOIN pg_database d ON d.oid = s.setdatabase
      WHERE d.datname = current_database() AND s.setrole = 0`,
  );
  const databaseSettings = parseSettings(dbSettings.rows[0]?.setconfig);
  const role = roles.rows[0];
  const empty = { canLogin: false, isSuperuser: false, bypassesRls: false, auditLogWritable: false, contentRevisionDeletable: false,
    paymentEventDeletable: false, canReadMigrations: false, canWriteMigrations: false, roleSettings: {} };
  if (!role) return { exists: false, ...empty, databaseSettings };

  const privileges = await client.query<Record<string, boolean | null>>(
    `SELECT
       CASE WHEN to_regclass('public."AuditLog"') IS NULL THEN false ELSE
         has_table_privilege($1, 'public."AuditLog"', 'UPDATE') OR has_table_privilege($1, 'public."AuditLog"', 'DELETE')
         OR has_table_privilege($1, 'public."AuditLog"', 'TRUNCATE') END AS "auditLogWritable",
       CASE WHEN to_regclass('public."ContentRevision"') IS NULL THEN false ELSE
         has_table_privilege($1, 'public."ContentRevision"', 'DELETE') END AS "contentRevisionDeletable",
       CASE WHEN to_regclass('public."PaymentEvent"') IS NULL THEN false ELSE
         has_table_privilege($1, 'public."PaymentEvent"', 'DELETE') END AS "paymentEventDeletable",
       CASE WHEN to_regclass('public."_prisma_migrations"') IS NULL THEN false ELSE
         has_column_privilege($1, 'public."_prisma_migrations"', 'migration_name', 'SELECT')
         AND has_column_privilege($1, 'public."_prisma_migrations"', 'finished_at', 'SELECT')
         AND has_column_privilege($1, 'public."_prisma_migrations"', 'rolled_back_at', 'SELECT') END AS "canReadMigrations",
       CASE WHEN to_regclass('public."_prisma_migrations"') IS NULL THEN false ELSE
         has_table_privilege($1, 'public."_prisma_migrations"', 'INSERT') OR has_table_privilege($1, 'public."_prisma_migrations"', 'UPDATE')
         OR has_table_privilege($1, 'public."_prisma_migrations"', 'DELETE') END AS "canWriteMigrations"`,
    [appRole],
  );
  // Role-wide settings first, then role-in-this-database settings (which take precedence in PostgreSQL).
  const roleSettingRows = await client.query<{ setconfig: string[] | null; perDatabase: boolean }>(
    `SELECT s.setconfig, s.setdatabase <> 0 AS "perDatabase" FROM pg_db_role_setting s
      WHERE s.setrole = $1 AND (s.setdatabase = 0 OR s.setdatabase = (SELECT oid FROM pg_database WHERE datname = current_database()))
      ORDER BY "perDatabase"`,
    [role.oid],
  );
  const roleSettings: Record<string, string> = {};
  for (const row of roleSettingRows.rows) Object.assign(roleSettings, parseSettings(row.setconfig));
  const p = privileges.rows[0] ?? {};
  return {
    exists: true,
    canLogin: role.rolcanlogin,
    isSuperuser: role.rolsuper,
    bypassesRls: role.rolbypassrls,
    auditLogWritable: p.auditLogWritable === true,
    contentRevisionDeletable: p.contentRevisionDeletable === true,
    paymentEventDeletable: p.paymentEventDeletable === true,
    canReadMigrations: p.canReadMigrations === true,
    canWriteMigrations: p.canWriteMigrations === true,
    databaseSettings,
    roleSettings,
  };
}

/** The section D database defaults that differ from what the database already has. Pure. */
export function pendingDatabaseDefaults(
  current: Readonly<Record<string, string>>,
  wanted: { environment: AppEnvironment; fourEyes: "on" | "off" },
): { name: "app.environment" | "app.four_eyes"; value: string }[] {
  const pending: { name: "app.environment" | "app.four_eyes"; value: string }[] = [];
  if (current["app.environment"] !== wanted.environment) pending.push({ name: "app.environment", value: wanted.environment });
  if (current["app.four_eyes"] !== wanted.fourEyes) pending.push({ name: "app.four_eyes", value: wanted.fourEyes });
  return pending;
}

/**
 * Sets the section D database defaults that are not already in place (values are validated enums).
 *
 * `app.*` are placeholder (custom) parameters: since PostgreSQL 15 a NON-superuser owner may only store them with
 * `ALTER DATABASE ... SET` after `GRANT SET ON PARAMETER app.environment, app.four_eyes TO <owner>` (run once by a
 * superuser or the managed database's admin), or the admin sets the defaults once and this step finds nothing to do.
 */
export async function applyDatabaseDefaults(
  client: pg.Client,
  current: Readonly<Record<string, string>>,
  environment: AppEnvironment,
  fourEyes: "on" | "off",
): Promise<string[]> {
  const pending = pendingDatabaseDefaults(current, { environment, fourEyes });
  if (pending.length === 0) return [];
  const { rows } = await client.query<{ name: string }>("SELECT current_database() AS name");
  const database = client.escapeIdentifier(rows[0]!.name);
  for (const setting of pending) {
    try {
      await client.query(`ALTER DATABASE ${database} SET ${setting.name} = ${client.escapeLiteral(setting.value)}`);
    } catch (error) {
      if ((error as { code?: unknown }).code === "42501") {
        throw new Error(
          `not allowed to set ${setting.name} as the owner. Once, as a superuser / the managed database admin, run either
` +
            `  GRANT SET ON PARAMETER app.environment, app.four_eyes TO <owner role>;
` +
            `or set the defaults directly:
` +
            `  ALTER DATABASE ${database} SET app.environment = '${environment}';
` +
            `  ALTER DATABASE ${database} SET app.four_eyes = '${fourEyes}';`,
        );
      }
      throw error;
    }
  }
  return pending.map((setting) => `${setting.name}=${setting.value}`);
}

function runPrismaMigrateDeploy(ownerUrl: string): void {
  // Resolved from the project root (works whether tsx runs this file as CommonJS or as an ES module).
  const prismaPackage = createRequire(path.join(process.cwd(), "package.json")).resolve("prisma/package.json");
  const bin = path.join(path.dirname(prismaPackage), "build", "index.js");
  const result = spawnSync(process.execPath, [bin, "migrate", "deploy"], {
    stdio: "inherit",
    // prisma.config.ts reads MIGRATION_DATABASE_URL first.
    env: { ...process.env, MIGRATION_DATABASE_URL: ownerUrl },
  });
  if (result.status !== 0) throw new Error(`prisma migrate deploy failed (exit ${result.status ?? "signal"})`);
}

async function main(): Promise<void> {
  const options = parseDeployOptions(process.argv.slice(2), process.env);
  const log = (message: string): void => console.log(`[db-deploy] ${message}`);

  if (options.migrate) {
    log("prisma migrate deploy");
    runPrismaMigrateDeploy(options.ownerUrl);
  }

  const client = new pg.Client({ connectionString: options.ownerUrl });
  await client.connect();
  try {
    if (!options.verifyOnly) {
      const before = await readRoleFacts(client, options.appRole);
      if (!before.exists) {
        throw new Error(`role ${options.appRole} does not exist; create it once with a password first (docs/DEPLOYMENT.md "Database roles")`);
      }
      log(`applying ${options.appRole} privileges (scripts/sql/app-role-grants.sql)`);
      await applyGrants(options.ownerUrl);
      const changed = await applyDatabaseDefaults(client, before.databaseSettings, options.environment, options.fourEyes);
      log(changed.length > 0 ? `database defaults set: ${changed.join(", ")}` : "database defaults already in place");
    }
    const verification = verifySectionD(await readRoleFacts(client, options.appRole), options);
    if (!verification.ok) {
      for (const failure of verification.failures) console.error(`[db-deploy] FAIL ${failure}`);
      throw new Error("section D verification failed");
    }
    log(`section D verified for ${options.appRole} (${options.environment}); new connections pick up database defaults`);
  } finally {
    await client.end();
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(process.cwd(), "scripts", "db-deploy.ts")) {
  main().catch((error: unknown) => {
    console.error(`[db-deploy] ${error instanceof Error ? error.message : String(error)}`);
    process.exitCode = 1;
  });
}
