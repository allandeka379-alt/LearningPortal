/**
 * Vitest `globalSetup`: runs once in the main process before any test worker starts.
 *
 * Applies pending Prisma migrations to the test database (`DATABASE_URL_TEST`) with `prisma migrate deploy`, which is
 * idempotent and never resets data, so parallel test files can rely on an up-to-date schema.
 *
 * Skipped (so pure unit tests still run) when:
 * - `prisma/migrations` does not exist yet or contains no migration folders;
 * - `DATABASE_URL_TEST` is not configured (a warning is printed);
 * - `VITEST_SKIP_DB_SETUP=1` is set (handy for unit-only runs while Postgres is stopped).
 *
 * Output from Prisma is captured and only printed when the command fails, to keep test output readable.
 */
import { execSync } from "node:child_process";
import { existsSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { config } from "dotenv";
import { applyGrants } from "../scripts/apply-db-grants";
import { assertTestDatabaseUrl } from "./support/test-database";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const migrationsDir = path.join(projectRoot, "prisma", "migrations");

function hasMigrations(): boolean {
  if (!existsSync(migrationsDir)) return false;
  return readdirSync(migrationsDir, { withFileTypes: true }).some((entry) => entry.isDirectory());
}

type ExecError = Error & { stdout?: Buffer | string; stderr?: Buffer | string; status?: number | null };

function printCapturedOutput(error: ExecError): void {
  if (error.stdout) process.stderr.write(error.stdout.toString());
  if (error.stderr) process.stderr.write(error.stderr.toString());
}

export default async function setup(): Promise<void> {
  config({ path: path.join(projectRoot, ".env"), quiet: true });

  if (process.env.VITEST_SKIP_DB_SETUP === "1") return;
  if (!hasMigrations()) return;

  const rawUrl = process.env.DATABASE_URL_TEST;
  if (rawUrl === undefined || rawUrl.trim() === "") {
    process.stderr.write(
      "[tests] DATABASE_URL_TEST is not set: skipping migrations. Database integration tests will fail.\n",
    );
    return;
  }
  const databaseUrl = assertTestDatabaseUrl(rawUrl);
  // Migrations (and grants) run as the database owner; the tests themselves connect as the restricted app role
  // (DATABASE_URL_TEST) so row-level security and append-only privileges are exercised exactly as in production.
  const ownerUrl = assertTestDatabaseUrl(process.env.MIGRATION_DATABASE_URL_TEST?.trim() || databaseUrl);

  try {
    execSync("npx prisma migrate deploy", {
      cwd: projectRoot,
      env: { ...process.env, DATABASE_URL: databaseUrl, MIGRATION_DATABASE_URL: ownerUrl },
      stdio: "pipe",
    });
  } catch (error) {
    printCapturedOutput(error as ExecError);
    throw new Error(
      "[tests] `prisma migrate deploy` against DATABASE_URL_TEST failed (output above). " +
        "Is Postgres running (`npm run db:start`) and does the test database exist? " +
        "For unit-only runs set VITEST_SKIP_DB_SETUP=1.",
    );
  }

  if (ownerUrl !== databaseUrl) {
    await applyGrants(ownerUrl);
  }
}
