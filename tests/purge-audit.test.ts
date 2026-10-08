import { randomUUID } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import pg from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import {
  AUDIT_RETENTION_PURGE_ACTION,
  AUDIT_RETENTION_YEARS,
  PAYMENT_AUDIT_RETENTION_YEARS,
  parsePurgeAuditOptions,
  purgeAuditLog,
} from "../scripts/maintenance/purge-audit";
import { assertTestDatabaseUrl } from "./support/test-database";

const URL = "postgresql://app_maintenance:pw@db.internal:5432/dzidza";

describe("parsePurgeAuditOptions", () => {
  it("defaults to a real run in 5,000-row batches", () => {
    expect(parsePurgeAuditOptions([], { MAINTENANCE_DATABASE_URL: URL })).toEqual({ url: URL, dryRun: false, batchSize: 5_000, maxBatches: 200 });
    expect(parsePurgeAuditOptions(["--dry-run", "--batch-size=100", "--max-batches=3"], { MAINTENANCE_DATABASE_URL: URL })).toMatchObject({
      dryRun: true,
      batchSize: 100,
      maxBatches: 3,
    });
  });

  it("refuses bad input without echoing the connection string", () => {
    expect(() => parsePurgeAuditOptions([], {})).toThrow("MAINTENANCE_DATABASE_URL");
    expect(() => parsePurgeAuditOptions([], { MAINTENANCE_DATABASE_URL: "mysql://x" })).toThrow("postgresql://");
    expect(() => parsePurgeAuditOptions(["--force"], { MAINTENANCE_DATABASE_URL: URL })).toThrow('Unknown flag "--force"');
    expect(() => parsePurgeAuditOptions(["--batch-size=0"], { MAINTENANCE_DATABASE_URL: URL })).toThrow("between 1 and");
    expect(() => parsePurgeAuditOptions(["--batch-size"], { MAINTENANCE_DATABASE_URL: URL })).toThrow("needs a value");
    expect(() => parsePurgeAuditOptions(["--dry-run=yes"], { MAINTENANCE_DATABASE_URL: URL })).toThrow("takes no value");
    expect(() => parsePurgeAuditOptions(["--batch-size=x"], { MAINTENANCE_DATABASE_URL: URL })).not.toThrow(/pw@/);
  });

  it("matches the retention the database trigger enforces (2 years; 6 for payment entities)", () => {
    expect([AUDIT_RETENTION_YEARS, PAYMENT_AUDIT_RETENTION_YEARS]).toEqual([2, 6]);
    const migration = readFileSync(path.join(process.cwd(), "prisma", "migrations", "20261005151329_init", "migration.sql"), "utf8");
    expect(migration).toContain("THEN interval '6 years' ELSE interval '2 years' END");
  });
});

/**
 * Against the test database: the owner applies scripts/sql/maintenance-role-grants.sql, then `SET ROLE` drops to
 * app_maintenance (and app_rw) on the same connection, so the privileges and the trigger are exercised exactly as in
 * production. Rows are scoped by entity ids unique to this run; audit rows cannot be deleted afterwards (by design).
 */
describe("purgeAuditLog against Postgres", () => {
  const ownerUrl = process.env.MIGRATION_DATABASE_URL_TEST?.trim();
  let client: pg.Client;
  const ids = { generalOld: randomUUID(), generalRecent: randomUUID(), paymentMid: randomUUID(), paymentOld: randomUUID() };

  async function insert(entityType: string, entityId: string, yearsAgo: number): Promise<void> {
    await client.query(
      `INSERT INTO "AuditLog" ("id", "actorKind", "action", "entityType", "entityId", "createdAt")
       VALUES (uuidv7(), 'SYSTEM', 'test.purge_fixture', $1, $2, now() - make_interval(years => $3::int, days => 1))`,
      [entityType, entityId, yearsAgo],
    );
  }

  async function remaining(): Promise<string[]> {
    const rows = await client.query<{ entityId: string }>(`SELECT "entityId" FROM "AuditLog" WHERE "entityId" = ANY($1::text[])`, [Object.values(ids)]);
    return rows.rows.map((row) => row.entityId).sort();
  }

  beforeAll(async () => {
    if (!ownerUrl) return;
    client = new pg.Client({ connectionString: assertTestDatabaseUrl(ownerUrl, "MIGRATION_DATABASE_URL_TEST") });
    await client.connect();
    await client.query(readFileSync(path.join(process.cwd(), "scripts", "sql", "maintenance-role-grants.sql"), "utf8"));
    await insert("PurgeFixture", ids.generalOld, 3);
    await insert("PurgeFixture", ids.generalRecent, 1);
    await insert("Payment", ids.paymentMid, 3);
    await insert("Payment", ids.paymentOld, 7);
  });

  afterAll(async () => {
    if (!client) return;
    await client.query("RESET ROLE").catch(() => undefined);
    await client.end();
  });

  it.skipIf(!ownerUrl)("never lets the app role delete, and refuses the maintenance role without the purge flag", async () => {
    await client.query("SET ROLE app_rw");
    await client.query("BEGIN");
    await client.query("SET LOCAL app.audit_retention_purge = 'on'");
    await expect(client.query(`DELETE FROM "AuditLog" WHERE "entityId" = $1`, [ids.generalOld])).rejects.toMatchObject({ code: "42501" });
    await client.query("ROLLBACK");

    await client.query("SET ROLE app_maintenance");
    await expect(client.query(`DELETE FROM "AuditLog" WHERE "entityId" = $1`, [ids.generalOld])).rejects.toThrow("append-only");
    await expect(client.query(`UPDATE "AuditLog" SET "reason" = 'x' WHERE "entityId" = $1`, [ids.generalOld])).rejects.toMatchObject({ code: "42501" });
    await client.query("RESET ROLE");
    expect(await remaining()).toEqual(Object.values(ids).sort());
  });

  it.skipIf(!ownerUrl)("deletes exactly the entries past retention, as app_maintenance, and records the run", async () => {
    await client.query("SET ROLE app_maintenance");
    const scope = { onlyEntityIds: Object.values(ids) };

    const dry = await purgeAuditLog(client, { ...scope, dryRun: true });
    expect(dry).toMatchObject({ dryRun: true, eligible: 2, deleted: 0 });
    expect(await remaining()).toHaveLength(4);

    const run = await purgeAuditLog(client, { ...scope, batchSize: 1 });
    expect(run).toMatchObject({ dryRun: false, eligible: 2, deleted: 2, batches: 3, truncated: false }); // the third batch finds nothing left
    expect(run.generalCutoff).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    expect(await remaining()).toEqual([ids.generalRecent, ids.paymentMid].sort());

    const again = await purgeAuditLog(client, scope);
    expect(again).toMatchObject({ eligible: 0, deleted: 0 });
    await client.query("RESET ROLE");

    const summary = await client.query<{ actorKind: string; actorUserId: string | null; metadata: { deleted: number; scopedToEntityIds: number } }>(
      `SELECT "actorKind", "actorUserId", "metadata" FROM "AuditLog"
        WHERE "action" = $1 AND "metadata"->>'generalCutoff' = $2 ORDER BY "createdAt" DESC LIMIT 1`,
      [AUDIT_RETENTION_PURGE_ACTION, run.generalCutoff],
    );
    expect(summary.rows[0]).toMatchObject({ actorKind: "SYSTEM", actorUserId: null, metadata: { deleted: 2, scopedToEntityIds: 4 } });
  });

  it.skipIf(!ownerUrl)("stops at max-batches and reports it", async () => {
    const extra = [randomUUID(), randomUUID()];
    for (const id of extra) await insert("PurgeFixture", id, 4);
    await client.query("SET ROLE app_maintenance");
    const run = await purgeAuditLog(client, { onlyEntityIds: extra, batchSize: 1, maxBatches: 1 });
    expect(run).toMatchObject({ deleted: 1, batches: 1, truncated: true });
    const rest = await purgeAuditLog(client, { onlyEntityIds: extra, batchSize: 1, maxBatches: 5 });
    expect(rest).toMatchObject({ deleted: 1, truncated: false });
    await client.query("RESET ROLE");
  });
});
