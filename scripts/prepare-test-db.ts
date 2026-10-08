/**
 * (Re)creates the integration-test database schema: `npm run test:db:prepare`.
 *
 * Runs `prisma migrate reset --force` against DATABASE_URL_TEST, which drops every table in that database and
 * re-applies all migrations (Prisma 7 does not seed on reset; tests create their own fixtures).
 *
 * Safety: refuses to run unless the target database name ends with `_test` and differs from DATABASE_URL, because
 * a reset destroys all data. Day-to-day test runs do NOT need this script: Vitest's global setup applies pending
 * migrations with the non-destructive `prisma migrate deploy`. Use this after editing or squashing migrations.
 */
import { execSync } from "node:child_process";
import { existsSync, readdirSync } from "node:fs";
import path from "node:path";
import { config } from "dotenv";
import { assertTestDatabaseUrl, databaseNameFromUrl } from "../tests/support/test-database";

function main(): void {
  // npm scripts always run from the package root; checking for prisma.config.ts catches direct invocations elsewhere.
  const projectRoot = process.cwd();
  if (!existsSync(path.join(projectRoot, "prisma.config.ts"))) {
    throw new Error("Run this script from the project root (npm run test:db:prepare).");
  }
  config({ path: path.join(projectRoot, ".env"), quiet: true });

  const testUrl = assertTestDatabaseUrl(process.env.DATABASE_URL_TEST);
  if (process.env.DATABASE_URL !== undefined && process.env.DATABASE_URL === testUrl) {
    throw new Error("DATABASE_URL_TEST must not be the same as DATABASE_URL.");
  }
  const databaseName = databaseNameFromUrl(testUrl) ?? "(unknown)";

  const migrationsDir = path.join(projectRoot, "prisma", "migrations");
  const hasMigrations =
    existsSync(migrationsDir) && readdirSync(migrationsDir, { withFileTypes: true }).some((entry) => entry.isDirectory());
  if (!hasMigrations) {
    console.warn("[test-db] prisma/migrations has no migrations yet: the reset database will have an empty schema.");
  }

  console.log(`[test-db] Resetting test database "${databaseName}" and applying migrations...`);
  const ownerUrl = assertTestDatabaseUrl(process.env.MIGRATION_DATABASE_URL_TEST?.trim() || testUrl);
  execSync("npx prisma migrate reset --force", {
    cwd: projectRoot,
    stdio: "inherit",
    env: { ...process.env, DATABASE_URL: testUrl, MIGRATION_DATABASE_URL: ownerUrl },
  });
  console.log(`[test-db] "${databaseName}" is ready.`);
}

try {
  main();
} catch (error) {
  console.error(`[test-db] ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
}
