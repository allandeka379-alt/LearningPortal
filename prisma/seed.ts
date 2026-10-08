/**
 * Database seed entry point.
 *
 *   npm run db:seed        → tsx --conditions=react-server prisma/seed.ts          (ALWAYS data, every environment)
 *   npm run db:seed:demo   → tsx --conditions=react-server prisma/seed.ts --demo   (+ DEV-ONLY demo data)
 *
 * `SEED_DEMO=1` is equivalent to `--demo`. Demo data is refused when NODE_ENV=production or when the database has
 * `app.environment = 'production'`. Idempotent: run it as often as you like. Details: docs/DEV_SEED.md.
 */
import path from "node:path";
import { config } from "dotenv";

config({ path: path.join(process.cwd(), ".env"), quiet: true });

async function main(): Promise<void> {
  const demo = process.argv.includes("--demo") || process.env.SEED_DEMO === "1";
  const started = Date.now();
  const { db } = await import("@/server/db");
  const { runSeed } = await import("./seed/run");
  try {
    const { counts } = await runSeed(db, { demo, ...(process.env.SEED_DEMO_PASSWORD ? { password: process.env.SEED_DEMO_PASSWORD } : {}) });
    console.log(`[seed] done in ${((Date.now() - started) / 1000).toFixed(1)} s${demo ? " (with demo data)" : ""}. Row counts:`);
    for (const [table, count] of Object.entries(counts)) console.log(`[seed]   ${table.padEnd(22)} ${count}`);
  } finally {
    await db.$disconnect();
  }
}

main().catch((error: unknown) => {
  console.error("[seed] FAILED:", error instanceof Error ? (error.stack ?? error.message) : error);
  process.exitCode = 1;
});
