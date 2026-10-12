/**
 * npx tsx --conditions=react-server scripts/content/exam-sessions.ts [--approver <email>|system] [--dry-run]
 *
 * Creates, updates (while provisional) and publishes the exam sessions listed in content/exam-sessions.json, as the
 * system publisher by default (src/server/content-pipeline/exam-sessions.ts). Run on deploy by scripts/railway-migrate.sh.
 */
import path from "node:path";
import { config } from "dotenv";
import { assertKnownFlags, boolFlag, parseArgs, stringFlag } from "./cli";

config({ path: path.join(process.cwd(), ".env"), quiet: true });

async function main(): Promise<void> {
  const args = parseArgs(process.argv.slice(2), ["dry-run"]);
  assertKnownFlags(args, ["approver", "dry-run"]);
  const { loadExamSessionFile, syncExamSessions } = await import("@/server/content-pipeline/exam-sessions");
  const { db } = await import("@/server/db");
  try {
    const entries = loadExamSessionFile(process.cwd());
    const outcomes = await syncExamSessions(entries, { approverEmail: stringFlag(args, "approver") ?? "system", dryRun: boolFlag(args, "dry-run") });
    for (const o of outcomes) console.log(`${o.outcome.padEnd(22)} ${o.key}${o.message ? ` — ${o.message}` : ""}`);
    const errors = outcomes.filter((o) => o.outcome === "error").length;
    console.log(`\n${outcomes.length} exam session(s); ${errors} error(s).`);
    if (errors > 0) process.exitCode = 1;
  } finally {
    await db.$disconnect();
  }
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
