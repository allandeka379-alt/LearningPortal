/**
 * Background job worker entry point: `npm run worker` (tsx --conditions=react-server src/worker/index.ts).
 * Flags: see ./options.ts (e.g. `npm run worker -- --concurrency=4 --queues=ai,default`, or `--drain` to process due
 * jobs and exit).
 *
 * Boot order matters: `.env` is loaded BEFORE any module that reads the environment at import time (the Prisma
 * singleton reads DATABASE_URL), so everything else is imported dynamically. In production the database boot
 * assertions (raw SQL section D) must pass or the worker exits.
 *
 * Shutdown: SIGINT / SIGTERM stop claiming and wait for in-flight jobs (graceful); a second signal exits immediately
 * (unfinished jobs stay RUNNING and are reclaimed after the lease). See ./shutdown.ts.
 *
 * Container image: this same file is bundled by `node scripts/build-worker.mjs` into `worker/index.mjs` and started with
 * `node worker/index.mjs` (one process, so SIGTERM reaches the handler directly; docs/DEPLOYMENT.md "Worker entry").
 */
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { parseEnv as parseDotEnv } from "node:util";

/** Loads `.env` outside production without overriding variables already set by the shell or the platform. */
function loadDotEnv(): void {
  if (process.env.NODE_ENV === "production") return;
  const file = path.join(process.cwd(), ".env");
  if (!existsSync(file)) return;
  const values = parseDotEnv(readFileSync(file, "utf8"));
  for (const [key, value] of Object.entries(values)) {
    if (process.env[key] === undefined && value !== undefined) process.env[key] = value;
  }
}

async function main(): Promise<void> {
  loadDotEnv();
  const { parseWorkerOptions } = await import("./options");
  const options = parseWorkerOptions(process.argv.slice(2), process.env);

  const { getEnv } = await import("@/server/lib/env");
  getEnv(); // fail fast on an invalid environment
  const { logger } = await import("@/server/lib/logger");

  if (process.env.NODE_ENV === "production") {
    const { assertDatabaseSafety } = await import("@/server/lib/db-safety");
    const report = await assertDatabaseSafety();
    for (const warning of report.warnings) logger.warn("database configuration warning", { warning });
  }

  const { registerAllJobs } = await import("./handlers");
  registerAllJobs();
  const { startWorker } = await import("./runner");
  const { db } = await import("@/server/db");
  const worker = startWorker(options, { logger });
  const { installShutdownHandlers } = await import("./shutdown");
  installShutdownHandlers(worker, { logger });

  await worker.done;
  await db.$disconnect();
  process.exit(0);
}

main().catch((error: unknown) => {
  // The logger may not be importable if the environment is broken; stderr always works.
  process.stderr.write(`[worker] fatal: ${error instanceof Error ? error.message : String(error)}\n`);
  process.exit(1);
});
