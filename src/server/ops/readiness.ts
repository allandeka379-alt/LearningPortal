import "server-only";
import { readdir } from "node:fs/promises";
import path from "node:path";
import { db, type DbClient } from "@/server/db";
import { evaluateDatabaseSafety, readDatabaseSafetyFacts, type DatabaseSafetyFacts } from "@/server/lib/db-safety";
import { isProd } from "@/server/lib/env";
import { logger as rootLogger, type Logger } from "@/server/lib/logger";

/**
 * Readiness probe behind `GET /api/ready` (ARCHITECTURE §10.6, docs/DEPLOYMENT.md "Health checks"). Liveness
 * (`/api/health`) only says the process is up; readiness says this instance can serve traffic:
 *
 * 1. **database**: `SELECT 1` through the app's own pool and role (`DATABASE_URL`, usually via PgBouncer).
 * 2. **migrations**: every migration shipped in this image (`prisma/migrations/<name>/migration.sql`) is applied and
 *    finished in `_prisma_migrations`. Rows the image does not know (a NEWER release already migrated:
 *    expand-then-contract rolling deploys) are fine; a migration of this image that is missing, failed or still
 *    running makes the instance not ready, so a release whose `migrate` step did not run never takes traffic.
 *    The app role may read only `migration_name`, `finished_at` and `rolled_back_at` (column grant in
 *    scripts/sql/app-role-grants.sql).
 * 3. **dbSafety**: the section D boot assertions (src/server/lib/db-safety.ts). Enforced in production only; elsewhere
 *    reported for information.
 *
 * The public JSON carries booleans and counts only: no role names, hosts, migration names or error messages (those go
 * to the log with the request id). Results are cached for {@link READINESS_CACHE_MS} and computed single-flight, so
 * load-balancer probes and uptime checks from many sources cost at most one round of three small queries per
 * instance every couple of seconds.
 */

/** How long a computed report is reused. Probes typically run every 5-30 s per checker. */
export const READINESS_CACHE_MS = 2_000;
/** Upper bound for each database round trip of the probe. */
export const READINESS_QUERY_TIMEOUT_MS = 2_500;

export type ReadinessErrorCode = "timeout" | "unavailable" | "no_privilege" | "migrations_dir_missing";

export interface DatabaseCheck {
  ok: boolean;
  latencyMs: number | null;
  error?: ReadinessErrorCode;
}

export interface MigrationsCheck {
  ok: boolean;
  /** Migrations shipped in this image. */
  expected: number;
  /** Of those, applied and finished. */
  applied: number;
  /** Of those, not applied (includes failed and in-progress ones). */
  pending: number;
  /** Of the pending ones, those with a failed (unfinished, not rolled back) attempt. */
  failed: number;
  /** Applied migrations this image does not ship (a newer release migrated first). Informational. */
  ahead: number;
  error?: ReadinessErrorCode;
}

export interface DbSafetyCheck {
  ok: boolean;
  /** True in production, where a failure makes the instance not ready (and the boot check would exit). */
  enforced: boolean;
  failures: number;
  warnings: number;
  error?: ReadinessErrorCode;
}

export interface ReadinessReport {
  status: "ready" | "not_ready";
  checkedAt: string;
  checks: {
    database: DatabaseCheck;
    migrations: MigrationsCheck;
    dbSafety: DbSafetyCheck;
  };
}

/** One `_prisma_migrations` row, reduced to what the probe may read. */
export interface AppliedMigrationRow {
  name: string;
  finished: boolean;
  rolledBack: boolean;
}

export interface MigrationComparison {
  expected: number;
  applied: number;
  pending: string[];
  failed: string[];
  ahead: string[];
}

/**
 * Compares the migrations shipped with this build against `_prisma_migrations`. Pure.
 *
 * A name counts as applied when at least one row for it finished and was not rolled back (Prisma inserts a new row per
 * attempt, so a failed attempt that was later resolved and re-applied still counts as applied).
 */
export function compareMigrations(onDisk: readonly string[], rows: readonly AppliedMigrationRow[]): MigrationComparison {
  const applied = new Set<string>();
  const failedAttempt = new Set<string>();
  for (const row of rows) {
    if (row.rolledBack) continue;
    if (row.finished) applied.add(row.name);
    else failedAttempt.add(row.name);
  }
  const shipped = new Set(onDisk);
  const pending = onDisk.filter((name) => !applied.has(name));
  return {
    expected: onDisk.length,
    applied: onDisk.length - pending.length,
    pending,
    failed: pending.filter((name) => failedAttempt.has(name)),
    ahead: [...applied].filter((name) => !shipped.has(name)).sort(),
  };
}

/** Default location of the migrations shipped with this build (the image copies `prisma/` next to the server). */
export function defaultMigrationsDir(): string {
  return path.join(process.cwd(), "prisma", "migrations");
}

/**
 * Names of the migration folders (those containing `migration.sql`), sorted. Prisma names them `<timestamp>_<name>`,
 * so lexical order is apply order.
 */
export async function listShippedMigrations(dir: string = defaultMigrationsDir()): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const names: string[] = [];
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const files = await readdir(path.join(dir, entry.name));
    if (files.includes("migration.sql")) names.push(entry.name);
  }
  return names.sort();
}

/** Reads `_prisma_migrations` with the columns the app role is granted. A missing table means "nothing applied". */
export async function readAppliedMigrations(client: DbClient = db): Promise<AppliedMigrationRow[]> {
  try {
    return await client.$queryRaw<AppliedMigrationRow[]>`
      SELECT migration_name AS "name",
             finished_at IS NOT NULL AS "finished",
             rolled_back_at IS NOT NULL AS "rolledBack"
        FROM "_prisma_migrations"`;
  } catch (error) {
    if (postgresErrorCode(error) === "42P01") return []; // undefined_table: migrate deploy never ran
    throw error;
  }
}

/**
 * The SQLSTATE of a database error, from a `pg` error (`code`), a Prisma driver-adapter error
 * (`meta.driverAdapterError.cause.originalCode`) or, as a last resort, Prisma's "Code: `XXXXX`" message.
 */
export function postgresErrorCode(error: unknown): string | null {
  if (typeof error !== "object" || error === null) return null;
  const sqlState = /^[0-9A-Z]{5}$/;
  const record = error as { code?: unknown; meta?: unknown; message?: unknown; clientVersion?: unknown };
  const cause = (record.meta as { driverAdapterError?: { cause?: { originalCode?: unknown; code?: unknown } } } | undefined)
    ?.driverAdapterError?.cause;
  // A Prisma error's own `code` is a Prisma code (P2010), which can look like a SQLSTATE (PL/pgSQL raises P0001).
  const isPrismaError = record.clientVersion !== undefined || record.meta !== undefined;
  for (const candidate of [cause?.originalCode, cause?.code, isPrismaError ? undefined : record.code]) {
    if (typeof candidate === "string" && sqlState.test(candidate)) return candidate;
  }
  if (typeof record.message === "string") {
    const match = /Code: `([0-9A-Z]{5})`/.exec(record.message);
    if (match?.[1]) return match[1];
  }
  return null;
}

class ProbeTimeoutError extends Error {
  constructor(label: string, ms: number) {
    super(`${label} did not answer within ${ms} ms`);
    this.name = "ProbeTimeoutError";
  }
}

async function withTimeout<T>(work: Promise<T>, ms: number, label: string): Promise<T> {
  let timer: NodeJS.Timeout | undefined;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new ProbeTimeoutError(label, ms)), ms);
    timer.unref?.();
  });
  try {
    return await Promise.race([work, timeout]);
  } finally {
    clearTimeout(timer);
  }
}

function errorCodeOf(error: unknown): ReadinessErrorCode {
  if (error instanceof ProbeTimeoutError) return "timeout";
  if (postgresErrorCode(error) === "42501") return "no_privilege";
  if (typeof error === "object" && error !== null && (error as { code?: unknown }).code === "ENOENT") {
    return "migrations_dir_missing";
  }
  return "unavailable";
}

/** Everything the probe touches, injectable for tests. */
export interface ReadinessDeps {
  ping: () => Promise<void>;
  listShippedMigrations: () => Promise<string[]>;
  readAppliedMigrations: () => Promise<AppliedMigrationRow[]>;
  readSafetyFacts: () => Promise<DatabaseSafetyFacts>;
  /** Whether db-safety failures make the instance not ready (production). */
  enforceDbSafety: boolean;
  timeoutMs: number;
  logger: Logger;
  now: () => Date;
}

let shippedMigrationsCache: Promise<string[]> | null = null;

/** The image never changes at runtime, so the folder is listed once per process (a failed listing is retried). */
function cachedShippedMigrations(): Promise<string[]> {
  shippedMigrationsCache ??= listShippedMigrations().catch((error: unknown) => {
    shippedMigrationsCache = null;
    throw error;
  });
  return shippedMigrationsCache;
}

export function defaultReadinessDeps(): ReadinessDeps {
  return {
    ping: async () => {
      await db.$queryRaw`SELECT 1`;
    },
    listShippedMigrations: cachedShippedMigrations,
    readAppliedMigrations: () => readAppliedMigrations(db),
    readSafetyFacts: () => readDatabaseSafetyFacts(db),
    enforceDbSafety: isProd(),
    timeoutMs: READINESS_QUERY_TIMEOUT_MS,
    logger: rootLogger.child({ component: "readiness" }),
    now: () => new Date(),
  };
}

/** Runs every check now (no cache). */
export async function checkReadiness(overrides: Partial<ReadinessDeps> = {}): Promise<ReadinessReport> {
  const deps: ReadinessDeps = { ...defaultReadinessDeps(), ...overrides };
  const log = deps.logger;
  const checkedAt = deps.now().toISOString();

  const started = Date.now();
  let database: DatabaseCheck;
  try {
    await withTimeout(deps.ping(), deps.timeoutMs, "database ping");
    database = { ok: true, latencyMs: Date.now() - started };
  } catch (error) {
    log.error("readiness: database unreachable", { err: error });
    database = { ok: false, latencyMs: null, error: errorCodeOf(error) };
  }

  const emptyMigrations: MigrationsCheck = { ok: false, expected: 0, applied: 0, pending: 0, failed: 0, ahead: 0 };
  const emptySafety: DbSafetyCheck = { ok: !deps.enforceDbSafety, enforced: deps.enforceDbSafety, failures: 0, warnings: 0 };
  if (!database.ok) {
    return {
      status: "not_ready",
      checkedAt,
      checks: {
        database,
        migrations: { ...emptyMigrations, error: "unavailable" },
        dbSafety: { ...emptySafety, ok: false, error: "unavailable" },
      },
    };
  }

  const [migrations, dbSafety] = await Promise.all([
    (async (): Promise<MigrationsCheck> => {
      try {
        const [shipped, rows] = await Promise.all([
          deps.listShippedMigrations(),
          withTimeout(deps.readAppliedMigrations(), deps.timeoutMs, "migrations query"),
        ]);
        const comparison = compareMigrations(shipped, rows);
        if (comparison.pending.length > 0) {
          log.warn("readiness: migrations of this release are not applied", {
            pending: comparison.pending,
            failed: comparison.failed,
          });
        }
        return {
          ok: comparison.pending.length === 0,
          expected: comparison.expected,
          applied: comparison.applied,
          pending: comparison.pending.length,
          failed: comparison.failed.length,
          ahead: comparison.ahead.length,
        };
      } catch (error) {
        log.error("readiness: migration check failed", { err: error });
        return { ...emptyMigrations, error: errorCodeOf(error) };
      }
    })(),
    (async (): Promise<DbSafetyCheck> => {
      try {
        const report = evaluateDatabaseSafety(await withTimeout(deps.readSafetyFacts(), deps.timeoutMs, "db-safety query"));
        if (!report.ok && deps.enforceDbSafety) {
          log.error("readiness: database safety checks failed", { failures: report.failures });
        }
        return {
          ok: report.ok || !deps.enforceDbSafety,
          enforced: deps.enforceDbSafety,
          failures: report.failures.length,
          warnings: report.warnings.length,
        };
      } catch (error) {
        log.error("readiness: db-safety check failed", { err: error });
        return { ...emptySafety, ok: false, error: errorCodeOf(error) };
      }
    })(),
  ]);

  const ready = database.ok && migrations.ok && dbSafety.ok;
  return { status: ready ? "ready" : "not_ready", checkedAt, checks: { database, migrations, dbSafety } };
}

let cached: { report: ReadinessReport; at: number } | null = null;
let inFlight: Promise<ReadinessReport> | null = null;

/**
 * The readiness report, reusing one computed within the last {@link READINESS_CACHE_MS}; concurrent callers share one
 * computation.
 */
export async function getReadiness(nowMs: number = Date.now()): Promise<ReadinessReport> {
  if (cached && nowMs - cached.at < READINESS_CACHE_MS) return cached.report;
  inFlight ??= checkReadiness()
    .then((report) => {
      cached = { report, at: Date.now() };
      return report;
    })
    .finally(() => {
      inFlight = null;
    });
  return inFlight;
}

/** Clears the report and migration-folder caches. Tests only. */
export function resetReadinessCache(): void {
  cached = null;
  inFlight = null;
  shippedMigrationsCache = null;
}
