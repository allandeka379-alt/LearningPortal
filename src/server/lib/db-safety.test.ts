import { describe, expect, it } from "vitest";
import { assertDatabaseSafety, DatabaseSafetyError, evaluateDatabaseSafety, readDatabaseSafetyFacts, type DatabaseSafetyFacts } from "./db-safety";

const safe: DatabaseSafetyFacts = {
  roleName: "app_rw",
  isSuperuser: false,
  bypassesRls: false,
  canUpdateAuditLog: false,
  canDeleteAuditLog: false,
  environment: "production",
  fourEyes: "on",
};

describe("evaluateDatabaseSafety (pure)", () => {
  it("passes a correctly provisioned production role", () => {
    expect(evaluateDatabaseSafety(safe)).toEqual({ ok: true, failures: [], warnings: [] });
  });

  it("fails each hard requirement independently", () => {
    expect(evaluateDatabaseSafety({ ...safe, isSuperuser: true }).failures).toEqual([expect.stringMatching(/SUPERUSER/)]);
    expect(evaluateDatabaseSafety({ ...safe, bypassesRls: true }).failures).toEqual([expect.stringMatching(/BYPASSRLS/)]);
    expect(evaluateDatabaseSafety({ ...safe, canDeleteAuditLog: true }).failures).toEqual([expect.stringMatching(/AuditLog/)]);
    expect(evaluateDatabaseSafety({ ...safe, canUpdateAuditLog: true }).ok).toBe(false);
    expect(evaluateDatabaseSafety({ ...safe, environment: null }).failures).toEqual([expect.stringMatching(/app\.environment is unset/)]);
    expect(evaluateDatabaseSafety({ ...safe, environment: "staging" }).failures).toEqual([expect.stringMatching(/"staging"/)]);
    const all = evaluateDatabaseSafety({
      ...safe,
      isSuperuser: true,
      bypassesRls: true,
      canUpdateAuditLog: true,
      environment: null,
    });
    expect(all.failures).toHaveLength(4);
  });

  it("only warns about four-eyes", () => {
    const report = evaluateDatabaseSafety({ ...safe, fourEyes: null });
    expect(report.ok).toBe(true);
    expect(report.warnings).toHaveLength(1);
  });

  it("formats an error listing every failure", () => {
    const error = new DatabaseSafetyError(["a", "b"]);
    expect(error.message).toContain("  - a\n  - b");
  });
});

describe("database safety (test database)", () => {
  it("the app role used by tests passes the role and audit checks", async () => {
    const facts = await readDatabaseSafetyFacts();
    expect(facts).toMatchObject({ isSuperuser: false, bypassesRls: false, canUpdateAuditLog: false, canDeleteAuditLog: false });
    const report = evaluateDatabaseSafety(facts);
    // A test database is not production, so only the environment check may fail.
    expect(report.failures.filter((failure) => !failure.startsWith("app.environment"))).toEqual([]);
    if (facts.environment !== "production") {
      await expect(assertDatabaseSafety()).rejects.toBeInstanceOf(DatabaseSafetyError);
    }
  });
});
