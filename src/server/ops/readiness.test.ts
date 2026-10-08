import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import type { DatabaseSafetyFacts } from "@/server/lib/db-safety";
import { createLogger } from "@/server/lib/logger";
import {
  checkReadiness,
  compareMigrations,
  getReadiness,
  listShippedMigrations,
  postgresErrorCode,
  readAppliedMigrations,
  resetReadinessCache,
  type ReadinessDeps,
} from "./readiness";

const silent = createLogger({ level: "silent" });

const SAFE_FACTS: DatabaseSafetyFacts = {
  roleName: "app_rw",
  isSuperuser: false,
  bypassesRls: false,
  canUpdateAuditLog: false,
  canDeleteAuditLog: false,
  environment: "production",
  fourEyes: "on",
};

const SHIPPED = ["20261005151329_init", "20261006064453_user_password_must_change"];

function deps(overrides: Partial<ReadinessDeps> = {}): Partial<ReadinessDeps> {
  return {
    ping: async () => undefined,
    listShippedMigrations: async () => [...SHIPPED],
    readAppliedMigrations: async () => SHIPPED.map((name) => ({ name, finished: true, rolledBack: false })),
    readSafetyFacts: async () => ({ ...SAFE_FACTS }),
    enforceDbSafety: true,
    timeoutMs: 200,
    logger: silent,
    now: () => new Date("2026-10-06T12:00:00Z"),
    ...overrides,
  };
}

/** What Prisma 7 throws for a raw query the database refused (shape observed on PostgreSQL 18 + @prisma/adapter-pg). */
function prismaRawError(sqlState: string): Error {
  return Object.assign(new Error(`Raw query failed. Code: \`${sqlState}\`. Message: \`refused\``), {
    code: "P2010",
    clientVersion: "7.10.0",
    meta: { driverAdapterError: { name: "DriverAdapterError", cause: { originalCode: sqlState, kind: "postgres" } } },
  });
}

describe("compareMigrations", () => {
  it("is clean when every shipped migration finished", () => {
    const result = compareMigrations(SHIPPED, SHIPPED.map((name) => ({ name, finished: true, rolledBack: false })));
    expect(result).toEqual({ expected: 2, applied: 2, pending: [], failed: [], ahead: [] });
  });

  it("reports missing, failed and in-progress migrations of this release as pending", () => {
    const shipped = ["001_a", "002_b", "003_c"];
    const result = compareMigrations(shipped, [
      { name: "001_a", finished: true, rolledBack: false },
      { name: "002_b", finished: false, rolledBack: false }, // failed or still running
    ]);
    expect(result).toEqual({ expected: 3, applied: 1, pending: ["002_b", "003_c"], failed: ["002_b"], ahead: [] });
  });

  it("counts a migration re-applied after a rolled-back attempt as applied", () => {
    const result = compareMigrations(["001_a"], [
      { name: "001_a", finished: false, rolledBack: true },
      { name: "001_a", finished: true, rolledBack: false },
    ]);
    expect(result).toMatchObject({ applied: 1, pending: [], failed: [] });
  });

  it("ignores a rolled-back attempt that was never re-applied (still pending, not failed)", () => {
    const result = compareMigrations(["001_a"], [{ name: "001_a", finished: true, rolledBack: true }]);
    expect(result).toMatchObject({ applied: 0, pending: ["001_a"], failed: [] });
  });

  it("tolerates migrations from a newer release (expand-then-contract rolling deploys)", () => {
    const result = compareMigrations(["001_a"], [
      { name: "001_a", finished: true, rolledBack: false },
      { name: "002_newer", finished: true, rolledBack: false },
      { name: "003_running_now", finished: false, rolledBack: false },
    ]);
    expect(result).toEqual({ expected: 1, applied: 1, pending: [], failed: [], ahead: ["002_newer"] });
  });
});

describe("postgresErrorCode", () => {
  it("reads Prisma driver-adapter errors, pg errors and Prisma messages", () => {
    expect(postgresErrorCode(prismaRawError("42501"))).toBe("42501");
    expect(postgresErrorCode(Object.assign(new Error("permission denied"), { code: "42P01" }))).toBe("42P01");
    expect(postgresErrorCode(new Error("Raw query failed. Code: `57014`. Message: `canceling statement`"))).toBe("57014");
    expect(postgresErrorCode(Object.assign(new Error("x"), { code: "P2010", clientVersion: "7.10.0" }))).toBeNull();
    // PL/pgSQL RAISE (trigger refusals) is a real SQLSTATE that starts with P.
    expect(postgresErrorCode(Object.assign(new Error("refused"), { code: "P0001", severity: "ERROR" }))).toBe("P0001");
    expect(postgresErrorCode("nope")).toBeNull();
    expect(postgresErrorCode(null)).toBeNull();
  });
});

describe("listShippedMigrations", () => {
  let dir: string;

  beforeAll(async () => {
    dir = await mkdtemp(path.join(tmpdir(), "dz-migrations-"));
    for (const name of ["20261006000000_second", "20261005000000_first"]) {
      await mkdir(path.join(dir, name));
      await writeFile(path.join(dir, name, "migration.sql"), "SELECT 1;");
    }
    await mkdir(path.join(dir, "20261007000000_no_sql_yet")); // created by `migrate dev --create-only` and abandoned
    await writeFile(path.join(dir, "migration_lock.toml"), 'provider = "postgresql"');
  });

  afterAll(async () => {
    await rm(dir, { recursive: true, force: true });
  });

  it("lists folders that contain migration.sql, in apply order", async () => {
    expect(await listShippedMigrations(dir)).toEqual(["20261005000000_first", "20261006000000_second"]);
  });

  it("finds this repository's migrations by default (the image copies prisma/ next to the server)", async () => {
    const shipped = await listShippedMigrations();
    expect(shipped.length).toBeGreaterThan(0);
    expect(shipped[0]).toMatch(/^\d{14}_init$/);
  });
});

describe("checkReadiness (injected)", () => {
  it("is ready when the database answers, migrations are applied and section D holds", async () => {
    const report = await checkReadiness(deps());
    expect(report).toEqual({
      status: "ready",
      checkedAt: "2026-10-06T12:00:00.000Z",
      checks: {
        database: { ok: true, latencyMs: expect.any(Number) },
        migrations: { ok: true, expected: 2, applied: 2, pending: 0, failed: 0, ahead: 0 },
        dbSafety: { ok: true, enforced: true, failures: 0, warnings: 0 },
      },
    });
  });

  it("is not ready when a migration of this release has not run", async () => {
    const report = await checkReadiness(
      deps({ readAppliedMigrations: async () => [{ name: SHIPPED[0]!, finished: true, rolledBack: false }] }),
    );
    expect(report.status).toBe("not_ready");
    expect(report.checks.migrations).toEqual({ ok: false, expected: 2, applied: 1, pending: 1, failed: 0, ahead: 0 });
  });

  it("is not ready, without running the other checks, when the database is down", async () => {
    const readSafetyFacts = vi.fn(async () => SAFE_FACTS);
    const report = await checkReadiness(
      deps({
        ping: async () => {
          throw new Error("connect ECONNREFUSED 10.0.0.5:6432");
        },
        readSafetyFacts,
      }),
    );
    expect(report.status).toBe("not_ready");
    expect(report.checks.database).toEqual({ ok: false, latencyMs: null, error: "unavailable" });
    expect(report.checks.migrations.error).toBe("unavailable");
    expect(readSafetyFacts).not.toHaveBeenCalled();
    // Hosts, roles and messages never reach the public body.
    expect(JSON.stringify(report)).not.toMatch(/ECONNREFUSED|10\.0\.0\.5|app_rw/);
  });

  it("times out a hanging database", async () => {
    const report = await checkReadiness(deps({ ping: () => new Promise(() => undefined), timeoutMs: 20 }));
    expect(report.checks.database).toEqual({ ok: false, latencyMs: null, error: "timeout" });
  });

  it("reports a missing migrations grant and a missing migrations folder distinctly", async () => {
    const noGrant = await checkReadiness(
      deps({
        readAppliedMigrations: async () => {
          throw prismaRawError("42501");
        },
      }),
    );
    expect(noGrant.status).toBe("not_ready");
    expect(noGrant.checks.migrations).toMatchObject({ ok: false, error: "no_privilege" });

    const noFolder = await checkReadiness(
      deps({
        listShippedMigrations: async () => {
          throw Object.assign(new Error("ENOENT: no such file or directory, scandir '/app/prisma/migrations'"), { code: "ENOENT" });
        },
      }),
    );
    expect(noFolder.checks.migrations).toMatchObject({ ok: false, error: "migrations_dir_missing" });
  });

  it("enforces section D in production and only reports it elsewhere", async () => {
    const unsafe = async (): Promise<DatabaseSafetyFacts> => ({ ...SAFE_FACTS, isSuperuser: true, fourEyes: null });

    const production = await checkReadiness(deps({ readSafetyFacts: unsafe, enforceDbSafety: true }));
    expect(production.status).toBe("not_ready");
    expect(production.checks.dbSafety).toEqual({ ok: false, enforced: true, failures: 1, warnings: 1 });

    const development = await checkReadiness(deps({ readSafetyFacts: unsafe, enforceDbSafety: false }));
    expect(development.status).toBe("ready");
    expect(development.checks.dbSafety).toEqual({ ok: true, enforced: false, failures: 1, warnings: 1 });
  });
});

describe("readiness against the test database", () => {
  beforeEach(() => {
    resetReadinessCache();
  });

  it("reads _prisma_migrations through the app role's column grant", async () => {
    const rows = await readAppliedMigrations();
    const shipped = await listShippedMigrations();
    expect(compareMigrations(shipped, rows).pending).toEqual([]);
  });

  it("is ready: global setup migrated the test database and applied the grants", async () => {
    const report = await checkReadiness({ logger: silent });
    expect(report.status).toBe("ready");
    expect(report.checks.database.ok).toBe(true);
    expect(report.checks.migrations).toMatchObject({ ok: true, pending: 0, failed: 0 });
    expect(report.checks.migrations.expected).toBeGreaterThan(0);
    // NODE_ENV=test: section D is reported, not enforced (the test database is not app.environment=production).
    expect(report.checks.dbSafety).toMatchObject({ ok: true, enforced: false });
  });

  it("caches the report briefly and shares one computation between concurrent callers", async () => {
    const [first, second] = await Promise.all([getReadiness(), getReadiness()]);
    expect(second).toBe(first);
    expect(await getReadiness()).toBe(first);
    resetReadinessCache();
    expect(await getReadiness()).not.toBe(first);
  });
});
