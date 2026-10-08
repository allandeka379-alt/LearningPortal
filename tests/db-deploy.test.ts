import pg from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { parseDeployOptions, parseSettings, readRoleFacts, verifySectionD, type RoleFacts } from "../scripts/db-deploy";
import { assertTestDatabaseUrl } from "./support/test-database";

const OWNER = "postgresql://owner:pw@db.internal:5432/dzidza";

const GOOD: RoleFacts = {
  exists: true,
  canLogin: true,
  isSuperuser: false,
  bypassesRls: false,
  auditLogWritable: false,
  contentRevisionDeletable: false,
  paymentEventDeletable: false,
  canReadMigrations: true,
  canWriteMigrations: false,
  databaseSettings: { "app.environment": "production", "app.four_eyes": "on" },
  roleSettings: { timezone: "UTC" },
};

const PRODUCTION = { appRole: "app_rw", environment: "production" as const, fourEyes: "on" as const };

describe("parseDeployOptions", () => {
  it("defaults to production + four-eyes under NODE_ENV=production", () => {
    expect(parseDeployOptions([], { MIGRATION_DATABASE_URL: OWNER, NODE_ENV: "production" })).toEqual({
      ownerUrl: OWNER,
      appRole: "app_rw",
      environment: "production",
      fourEyes: "on",
      migrate: true,
      verifyOnly: false,
    });
  });

  it("supports staging, skipping the migration and verify-only runs", () => {
    expect(parseDeployOptions(["--skip-migrate"], { MIGRATION_DATABASE_URL: OWNER, NODE_ENV: "production", DB_APP_ENVIRONMENT: "staging" }))
      .toMatchObject({ environment: "staging", fourEyes: "on", migrate: false });
    expect(parseDeployOptions(["--verify-only", "--app-role=app_ro"], { MIGRATION_DATABASE_URL: OWNER }))
      .toMatchObject({ environment: "development", fourEyes: "off", migrate: false, verifyOnly: true, appRole: "app_ro" });
  });

  it("refuses unsafe or malformed input", () => {
    expect(() => parseDeployOptions([], {})).toThrow("MIGRATION_DATABASE_URL");
    expect(() => parseDeployOptions([], { MIGRATION_DATABASE_URL: "mysql://x" })).toThrow("postgresql://");
    expect(() => parseDeployOptions(["--environment=prod"], { MIGRATION_DATABASE_URL: OWNER })).toThrow('Invalid environment "prod"');
    expect(() => parseDeployOptions(["--environment=production", "--four-eyes=off"], { MIGRATION_DATABASE_URL: OWNER }))
      .toThrow("app.four_eyes must be on in production");
    expect(() => parseDeployOptions(["--app-role=other"], { MIGRATION_DATABASE_URL: OWNER })).toThrow("Only app_rw");
    expect(() => parseDeployOptions(["--force"], { MIGRATION_DATABASE_URL: OWNER })).toThrow('Unknown flag "--force"');
    // The owner URL (it carries a password) is never echoed.
    expect(() => parseDeployOptions(["--environment=x"], { MIGRATION_DATABASE_URL: OWNER })).not.toThrow(/pw@/);
  });
});

describe("parseSettings", () => {
  it("parses pg_db_role_setting entries, later entries winning", () => {
    expect(parseSettings(["app.environment=production", "TimeZone=UTC", "search_path=a,b", "app.environment=staging"])).toEqual({
      "app.environment": "staging",
      timezone: "UTC",
      search_path: "a,b",
    });
    expect(parseSettings(null)).toEqual({});
  });
});

describe("verifySectionD", () => {
  it("passes a correctly configured production database", () => {
    expect(verifySectionD(GOOD, PRODUCTION)).toEqual({ ok: true, failures: [] });
  });

  it("explains a missing app role", () => {
    const result = verifySectionD({ ...GOOD, exists: false }, PRODUCTION);
    expect(result.ok).toBe(false);
    expect(result.failures).toEqual([expect.stringContaining("role app_rw does not exist")]);
  });

  it("lists every violated requirement", () => {
    const result = verifySectionD(
      {
        ...GOOD,
        canLogin: false,
        isSuperuser: true,
        bypassesRls: true,
        auditLogWritable: true,
        contentRevisionDeletable: true,
        paymentEventDeletable: true,
        canReadMigrations: false,
        canWriteMigrations: true,
        databaseSettings: {},
        roleSettings: { timezone: "Africa/Harare" },
      },
      PRODUCTION,
    );
    expect(result.ok).toBe(false);
    expect(result.failures).toHaveLength(11);
    expect(result.failures.join("\n")).toMatch(/superuser[\s\S]*BYPASSRLS[\s\S]*AuditLog[\s\S]*app\.environment is unset[\s\S]*TimeZone/);
  });

  it("lets a role-level setting override the database default, as PostgreSQL does", () => {
    const shadowed = verifySectionD({ ...GOOD, roleSettings: { timezone: "UTC", "app.environment": "development" } }, PRODUCTION);
    expect(shadowed.failures).toEqual(['app.environment is "development" for app_rw, expected "production"']);
  });
});

describe("readRoleFacts against the test database (owner connection, read-only)", () => {
  const ownerUrl = process.env.MIGRATION_DATABASE_URL_TEST?.trim();
  let client: pg.Client;

  beforeAll(async () => {
    if (!ownerUrl) return;
    client = new pg.Client({ connectionString: assertTestDatabaseUrl(ownerUrl, "MIGRATION_DATABASE_URL_TEST") });
    await client.connect();
  });

  afterAll(async () => {
    await client?.end();
  });

  it.skipIf(!ownerUrl)("sees app_rw exactly as scripts/sql/app-role-grants.sql left it", async () => {
    const facts = await readRoleFacts(client, "app_rw");
    expect(facts).toMatchObject({
      exists: true,
      canLogin: true,
      isSuperuser: false,
      bypassesRls: false,
      auditLogWritable: false,
      contentRevisionDeletable: false,
      paymentEventDeletable: false,
      canReadMigrations: true,
      canWriteMigrations: false,
    });
    expect(facts.roleSettings.timezone).toBe("UTC");
  });

  it.skipIf(!ownerUrl)("reports a role that does not exist", async () => {
    expect((await readRoleFacts(client, "dz_no_such_role")).exists).toBe(false);
  });
});
