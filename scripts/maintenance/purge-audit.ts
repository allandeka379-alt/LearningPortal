/**
 * AuditLog retention purge (ARCHITECTURE §4.13 / §5.13: audit entries are kept 2 years, payment-related ones 6 years;
 * docs/DEPLOYMENT.md "Scheduled operations"). A scheduled OPS task, not an app job: the application role can never
 * delete audit rows (append-only by privilege), so this runs as the dedicated maintenance role.
 *
 *   MAINTENANCE_DATABASE_URL=postgresql://app_maintenance:…@db:5432/dzidza npx tsx scripts/maintenance/purge-audit.ts
 *       [--dry-run] [--batch-size=5000] [--max-batches=200]
 *
 * Each batch is one transaction: `SET LOCAL app.audit_retention_purge = 'on'`, then DELETE of at most `batch-size`
 * rows past retention. The database re-checks every row: the "AuditLog_append_only" trigger refuses any DELETE without
 * the flag or of a row younger than its retention (2 years; 6 for Payment, PaymentEvent, Subscription,
 * EntitlementGrant, PlanPrice and PromoCode entries), so a bug here cannot remove live history. A run that removed
 * rows records one SYSTEM entry `audit.retention_purge` with the count. Output names counts and cutoffs only, never
 * the connection string or any entry's content. Exit code 1 on failure.
 *
 * Role setup (once per database, as the owner): scripts/sql/maintenance-role-grants.sql.
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";

/** Retention in years (ARCHITECTURE §4.13). The database trigger enforces the same periods. */
export const AUDIT_RETENTION_YEARS = 2;
export const PAYMENT_AUDIT_RETENTION_YEARS = 6;
/** Entity types kept for the payment retention period (mirror of the "AuditLog_append_only" trigger). */
export const PAYMENT_AUDIT_ENTITY_TYPES = ["Payment", "PaymentEvent", "Subscription", "EntitlementGrant", "PlanPrice", "PromoCode"] as const;
export const AUDIT_RETENTION_PURGE_ACTION = "audit.retention_purge";

export interface PurgeAuditOptions {
  url: string;
  dryRun: boolean;
  batchSize: number;
  maxBatches: number;
}

const FLAGS = ["dry-run", "batch-size", "max-batches"];

function positiveInt(name: string, raw: string, max: number): number {
  if (!/^\d+$/.test(raw)) throw new Error(`--${name} must be a whole number`);
  const value = Number(raw);
  if (value < 1 || value > max) throw new Error(`--${name} must be between 1 and ${max}`);
  return value;
}

/**
 * Parses flags and environment. Pure.
 *
 * @throws Error naming the bad flag or variable (never its value: the URL carries a password)
 */
export function parsePurgeAuditOptions(argv: readonly string[], env: Readonly<Record<string, string | undefined>>): PurgeAuditOptions {
  const flags = new Map<string, string | true>();
  for (const arg of argv) {
    const match = /^--([a-z][a-z-]*)(?:=(.*))?$/.exec(arg);
    if (!match?.[1]) throw new Error(`Unknown argument "${arg}"`);
    if (!FLAGS.includes(match[1])) throw new Error(`Unknown flag "--${match[1]}"`);
    flags.set(match[1], match[2] ?? true);
  }
  const url = env.MAINTENANCE_DATABASE_URL?.trim();
  if (!url) throw new Error("MAINTENANCE_DATABASE_URL (the app_maintenance role) is required");
  if (!/^postgres(?:ql)?:\/\//.test(url)) throw new Error("MAINTENANCE_DATABASE_URL must be a postgresql:// URL");
  const value = (name: string): string | undefined => {
    const flag = flags.get(name);
    if (flag === true) throw new Error(`Flag "--${name}" needs a value`);
    return flag;
  };
  const dryRun = flags.get("dry-run");
  if (dryRun !== undefined && dryRun !== true) throw new Error('Flag "--dry-run" takes no value');
  const batch = value("batch-size");
  const batches = value("max-batches");
  return {
    url,
    dryRun: dryRun === true,
    batchSize: batch === undefined ? 5_000 : positiveInt("batch-size", batch, 50_000),
    maxBatches: batches === undefined ? 200 : positiveInt("max-batches", batches, 100_000),
  };
}

export interface PurgeAuditResult {
  dryRun: boolean;
  /** Rows deleted (0 on a dry run). */
  deleted: number;
  /** Rows past retention before the run (dry run: what a real run would delete, up to the batch limits). */
  eligible: number;
  batches: number;
  /** True when `maxBatches` stopped the run with eligible rows left (the next run continues). */
  truncated: boolean;
  /** Database clock cutoffs used (ISO strings). */
  generalCutoff: string;
  paymentCutoff: string;
}

/** WHERE clause for rows past retention ($1 = payment entity types; $2 = optional entity-id scope, tests). */
const ELIGIBLE = `"createdAt" < now() - make_interval(years => ${AUDIT_RETENTION_YEARS})
     AND ("entityType" <> ALL($1::text[]) OR "createdAt" < now() - make_interval(years => ${PAYMENT_AUDIT_RETENTION_YEARS}))
     AND ($2::text[] IS NULL OR "entityId" = ANY($2::text[]))`;

/**
 * Runs the purge on an open connection (the maintenance role). `onlyEntityIds` narrows it to entries about those
 * entities (tests share one database; operators can purge one entity's history the same way).
 */
export async function purgeAuditLog(
  client: pg.ClientBase,
  options: { dryRun?: boolean; batchSize?: number; maxBatches?: number; onlyEntityIds?: readonly string[] } = {},
): Promise<PurgeAuditResult> {
  const batchSize = options.batchSize ?? 5_000;
  const maxBatches = options.maxBatches ?? 200;
  const scope = options.onlyEntityIds ? [...options.onlyEntityIds] : null;
  const types = [...PAYMENT_AUDIT_ENTITY_TYPES];

  const head = await client.query<{ eligible: string; general: string; payment: string }>(
    `SELECT count(*)::text AS eligible,
            to_char((now() - make_interval(years => ${AUDIT_RETENTION_YEARS})) AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"') AS general,
            to_char((now() - make_interval(years => ${PAYMENT_AUDIT_RETENTION_YEARS})) AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"') AS payment
       FROM "AuditLog" WHERE ${ELIGIBLE}`,
    [types, scope],
  );
  const eligible = Number(head.rows[0]?.eligible ?? 0);
  const base = { eligible, generalCutoff: head.rows[0]?.general ?? "", paymentCutoff: head.rows[0]?.payment ?? "" };
  if (options.dryRun || eligible === 0) return { dryRun: options.dryRun ?? false, deleted: 0, batches: 0, truncated: false, ...base };

  let deleted = 0;
  let batches = 0;
  let truncated = false;
  for (;;) {
    if (batches >= maxBatches) {
      truncated = true;
      break;
    }
    await client.query("BEGIN");
    let count: number;
    try {
      // Transaction-local: the flag can never leak to another statement on a pooled connection. (No FOR UPDATE in the
      // subquery: row locks need UPDATE, which this role deliberately lacks; the DELETE takes its own row locks.)
      await client.query("SET LOCAL app.audit_retention_purge = 'on'");
      await client.query("SET LOCAL statement_timeout = '120s'");
      const result = await client.query(
        `DELETE FROM "AuditLog" WHERE "id" IN (
           SELECT "id" FROM "AuditLog" WHERE ${ELIGIBLE} ORDER BY "createdAt" LIMIT $3)`,
        [types, scope, batchSize],
      );
      count = result.rowCount ?? 0;
      await client.query("COMMIT");
    } catch (error) {
      await client.query("ROLLBACK").catch(() => undefined);
      throw error;
    }
    batches += 1;
    deleted += count;
    if (count < batchSize) break;
  }

  if (deleted > 0) {
    await client.query(
      `INSERT INTO "AuditLog" ("id", "actorUserId", "actorKind", "actorRoles", "action", "entityType", "metadata", "createdAt")
       VALUES (uuidv7(), NULL, 'SYSTEM', ARRAY[]::"Role"[], $1, 'AuditLog', $2::jsonb, now())`,
      [
        AUDIT_RETENTION_PURGE_ACTION,
        JSON.stringify({
          deleted,
          batches,
          truncated,
          retentionYears: AUDIT_RETENTION_YEARS,
          paymentRetentionYears: PAYMENT_AUDIT_RETENTION_YEARS,
          generalCutoff: base.generalCutoff,
          paymentCutoff: base.paymentCutoff,
          ...(scope ? { scopedToEntityIds: scope.length } : {}),
        }),
      ],
    );
  }
  return { dryRun: false, deleted, batches, truncated, ...base };
}

async function main(): Promise<void> {
  const options = parsePurgeAuditOptions(process.argv.slice(2), process.env);
  const client = new pg.Client({ connectionString: options.url, application_name: "dzidza-purge-audit" });
  await client.connect();
  try {
    const role = await client.query<{ role: string; superuser: boolean }>(
      `SELECT current_user AS role, rolsuper AS superuser FROM pg_roles WHERE rolname = current_user`,
    );
    const who = role.rows[0];
    if (who?.superuser) console.warn("[purge-audit] WARNING: connected as a superuser; use the app_maintenance role");
    const result = await purgeAuditLog(client, { dryRun: options.dryRun, batchSize: options.batchSize, maxBatches: options.maxBatches });
    console.log(
      `[purge-audit] role=${who?.role ?? "?"} ${result.dryRun ? "DRY RUN " : ""}eligible=${result.eligible} deleted=${result.deleted} ` +
        `batches=${result.batches}${result.truncated ? " (stopped at --max-batches; run again)" : ""} ` +
        `cutoffs: general<${result.generalCutoff} payment<${result.paymentCutoff}`,
    );
  } finally {
    await client.end();
  }
}

const invokedPath = process.argv[1] ? path.resolve(process.argv[1]) : "";
if (invokedPath === path.resolve(fileURLToPath(import.meta.url))) {
  main().catch((error: unknown) => {
    // pg errors carry the SQL state; never print the connection string.
    const code = typeof error === "object" && error !== null && "code" in error ? ` (${String((error as { code: unknown }).code)})` : "";
    console.error(`[purge-audit] ${error instanceof Error ? error.message : String(error)}${code}`);
    process.exitCode = 1;
  });
}
