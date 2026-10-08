/**
 * Guards shared by the test setup, the Vitest global setup and `scripts/prepare-test-db.ts`.
 *
 * The test suite creates rows and `prepare-test-db` resets a whole schema, so pointing either at the development or a
 * production database would destroy real data. Every entry point therefore refuses to run unless the target database
 * name ends with `_test`.
 */

/** Suffix every test database name must carry. */
export const TEST_DATABASE_SUFFIX = "_test";

/** Error thrown when a URL is missing, unparsable or does not point at a `*_test` database. */
export class UnsafeTestDatabaseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UnsafeTestDatabaseError";
  }
}

/**
 * Extracts the database name from a PostgreSQL connection URL (`postgresql://user@host:5433/name?opts`).
 * Returns `null` when the URL cannot be parsed or has no database path.
 */
export function databaseNameFromUrl(url: string): string | null {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return null;
  }
  if (parsed.protocol !== "postgresql:" && parsed.protocol !== "postgres:") return null;
  const name = decodeURIComponent(parsed.pathname.replace(/^\/+/, ""));
  return name.length > 0 ? name : null;
}

/**
 * Returns `url` unchanged when it points at a database whose name ends with `_test`; throws otherwise.
 *
 * @param url - the candidate connection string (usually `process.env.DATABASE_URL_TEST`).
 * @param variableName - used in the error message so the developer knows which variable to fix.
 */
export function assertTestDatabaseUrl(url: string | undefined, variableName = "DATABASE_URL_TEST"): string {
  if (url === undefined || url.trim() === "") {
    throw new UnsafeTestDatabaseError(`${variableName} is not set. Add it to .env (see .env.example).`);
  }
  const name = databaseNameFromUrl(url);
  if (name === null) {
    throw new UnsafeTestDatabaseError(`${variableName} is not a valid postgresql:// URL with a database name.`);
  }
  if (!name.endsWith(TEST_DATABASE_SUFFIX)) {
    throw new UnsafeTestDatabaseError(
      `${variableName} points at database "${name}", whose name does not end with "${TEST_DATABASE_SUFFIX}". ` +
        "Refusing to use it for tests because test runs create and reset data.",
    );
  }
  return url;
}
