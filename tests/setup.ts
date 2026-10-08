/**
 * Vitest `setupFiles` entry: runs in every test worker BEFORE the test file (and therefore before any app module such
 * as `@/server/db` or `@/server/lib/env`) is imported.
 *
 * 1. Loads `.env` without overriding variables already set by the shell or CI.
 * 2. Points `DATABASE_URL` at `DATABASE_URL_TEST` (which must name a `*_test` database), so the Prisma singleton can
 *    only ever reach the test database. Without a test database configured, `DATABASE_URL` is replaced by an
 *    unroutable `.invalid` URL: `getEnv()` still parses (pure unit tests run), and any test that touches the database
 *    fails loudly instead of silently writing to the development database.
 * 3. Forces `NODE_ENV=test` and fills the remaining required variables with test-only values when absent, so the
 *    suite is hermetic in CI without a `.env` file.
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import { config } from "dotenv";
import { assertTestDatabaseUrl } from "./support/test-database";

/** Unroutable by definition (RFC 2606 `.invalid`); the name says what to fix when a connection error mentions it. */
export const UNCONFIGURED_TEST_DATABASE_URL = "postgresql://set-DATABASE_URL_TEST.invalid:5432/unconfigured_test";

const envFile = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../.env");
config({ path: envFile, quiet: true });

// `process.env.NODE_ENV` is typed read-only by Next's ambient types; tests are the one place we must set it.
const env = process.env as Record<string, string | undefined>;

const testDatabaseUrl = env.DATABASE_URL_TEST;
env.DATABASE_URL =
  testDatabaseUrl !== undefined && testDatabaseUrl.trim() !== ""
    ? assertTestDatabaseUrl(testDatabaseUrl)
    : UNCONFIGURED_TEST_DATABASE_URL;

env.NODE_ENV = "test";
env.APP_URL ||= "http://localhost:3000";
env.SESSION_SECRET ||= "test-only-session-secret-not-for-real-use-0123456789";
// The suite must never reach a real email / SMS provider (a developer's .env may name one with live keys); tests read
// codes from the console outbox. Adapter tests construct drivers directly with a fake fetch.
env.EMAIL_PROVIDER = "console";
env.SMS_PROVIDER = "console";
