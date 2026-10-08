/**
 * Applies scripts/sql/app-role-grants.sql to the local dev and test databases as the OWNER role.
 * Usage: `npm run db:grants` (run after `prisma migrate dev`). Tests do this automatically in tests/global-setup.ts.
 *
 * Owner URLs: MIGRATION_DATABASE_URL (dev) and MIGRATION_DATABASE_URL_TEST (test). Never used in production, where
 * roles and grants are a per-environment deploy step (raw SQL section D).
 */
import { readFileSync } from "node:fs";
import path from "node:path";
import { config } from "dotenv";
import pg from "pg";

export const GRANTS_SQL_PATH = path.join(process.cwd(), "scripts", "sql", "app-role-grants.sql");

export async function applyGrants(ownerUrl: string): Promise<void> {
  const sql = readFileSync(GRANTS_SQL_PATH, "utf8");
  const client = new pg.Client({ connectionString: ownerUrl });
  await client.connect();
  try {
    await client.query(sql);
  } finally {
    await client.end();
  }
}

async function main(): Promise<void> {
  config({ path: path.join(process.cwd(), ".env"), quiet: true });
  if (process.env.NODE_ENV === "production") throw new Error("Refusing to run in production (use section D).");
  const targets = [
    ["dev", process.env.MIGRATION_DATABASE_URL],
    ["test", process.env.MIGRATION_DATABASE_URL_TEST],
  ] as const;
  for (const [label, url] of targets) {
    if (!url) {
      console.warn(`[db:grants] ${label}: owner URL not set, skipped`);
      continue;
    }
    await applyGrants(url);
    console.log(`[db:grants] ${label}: app_rw privileges applied`);
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(process.cwd(), "scripts", "apply-db-grants.ts")) {
  main().catch((error: unknown) => {
    console.error(`[db:grants] ${error instanceof Error ? error.message : String(error)}`);
    process.exitCode = 1;
  });
}
