/**
 * npm run content:import [-- --family <f>[,<f>…]] [--author <email>] [--approver <admin email>] [--force] [--no-cache]
 *
 * Validates the content source, then upserts it into the database (docs/CONTENT_PIPELINE.md "Importing"): syllabus
 * versions (DRAFT; published only with an ADMIN --approver), media, questions, lessons, flashcards and assessments.
 * New and changed items are written as AI-generated drafts and submitted for review (IN_REVIEW). Published content is
 * never changed in place: a changed file produces a draft copy for review (reported as a conflict). Runs as the app
 * database role, so every trigger and CHECK applies. Exit code 1 when anything failed or validation failed.
 */
import path from "node:path";
import { config } from "dotenv";
import { assertKnownFlags, boolFlag, listFlag, parseArgs, stringFlag } from "./cli";

config({ path: path.join(process.cwd(), ".env"), quiet: true });

const KNOWN = ["family", "author", "approver", "force", "no-cache", "verbose"];

async function main(): Promise<void> {
  process.env.LOG_LEVEL ??= "error";
  const args = parseArgs(process.argv.slice(2), ["force", "no-cache", "verbose"]);
  assertKnownFlags(args, KNOWN);
  const { db } = await import("@/server/db");
  const { importContent } = await import("@/server/content-pipeline/import");
  const { formatIssues, table } = await import("@/server/content-pipeline/report");
  const verbose = boolFlag(args, "verbose");
  try {
    const report = await importContent({
      repoRoot: process.cwd(),
      families: [...listFlag(args, "family"), ...args.positionals],
      authorEmail: stringFlag(args, "author") ?? null,
      approverEmail: stringFlag(args, "approver") ?? null,
      force: boolFlag(args, "force"),
      ...(boolFlag(args, "no-cache") ? { cacheDir: null } : {}),
      onProgress: (line) => {
        if (verbose) console.log(`  ${line}`);
      },
    });
    if (report.aborted) {
      console.log(formatIssues(report.validationIssues.filter((i) => i.severity === "error")));
      console.log(`\nValidation found ${report.validation.errorCount} error(s): nothing was imported. Fix them (npm run content:validate) and run again.`);
      process.exitCode = 1;
      return;
    }
    console.log(`Author: ${report.author.email}${report.author.created ? " (pipeline account created)" : ""}`);
    if (report.syllabi.length > 0) {
      console.log(`\n${table(["Syllabus version", "Outcome", "Details"], report.syllabi.map((s) => [s.path, s.outcome, s.message ?? ""]))}`);
    }
    const media = report.media.filter((m) => m.outcome !== "unchanged");
    if (media.length > 0) console.log(`\n${table(["Media", "Outcome", "Details"], media.map((m) => [`${m.family}/${m.file}`, m.outcome, m.message ?? ""]))}`);
    const types = ["QUESTION", "LESSON", "FLASHCARD", "ASSESSMENT"] as const;
    console.log(
      `\n${table(
        ["Type", "Created", "Updated", "Unchanged", "Retagged", "Conflicts", "Skipped", "Errors"],
        types.map((type) => {
          const c = report.counts[type];
          return [type.toLowerCase(), c.created, c.updated, c.unchanged, c.retagged, c.conflict, c.skipped, c.error];
        }),
      )}`,
    );
    const notable = report.items.filter((item) => item.outcome === "conflict" || item.outcome === "error" || item.outcome === "skipped" || (verbose && item.message));
    if (notable.length > 0) {
      console.log("\nNeeds attention:");
      for (const item of notable) console.log(`  ${item.outcome.toUpperCase().padEnd(8)} ${item.type.toLowerCase()} ${item.family}:${item.key}${item.id ? ` [${item.id}]` : ""}${item.message ? ` — ${item.message}` : ""}`);
    }
    if (report.orphans.length > 0) {
      console.log(`\nIn the database but no longer in the files (not deleted; archive them in the CMS if they should go):`);
      for (const orphan of report.orphans) console.log(`  ${orphan.type.toLowerCase()} ${orphan.externalRef} [${orphan.id}] ${orphan.status}`);
    }
    for (const line of report.catalogue) console.log(`Catalogue: ${line}`);
    if (report.validation.warningCount > 0) console.log(`\nValidation warnings: ${report.validation.warningCount} (npm run content:validate for details).`);
    const failed = report.items.some((i) => i.outcome === "error") || report.syllabi.some((s) => s.outcome === "error") || report.media.some((m) => m.outcome === "error");
    const changed = report.items.some((i) => i.outcome !== "unchanged") || report.syllabi.some((s) => s.outcome !== "unchanged");
    console.log(
      failed
        ? "\nImport finished with errors."
        : changed
          ? "\nImport finished. New and changed items are IN REVIEW: review them at /admin/review/topics, then publish with npm run content:publish -- --approver <your email>."
          : "\nImport finished: the database already matches the files.",
    );
    process.exitCode = failed ? 1 : 0;
  } finally {
    await db.$disconnect();
  }
}

main().catch((error: unknown) => {
  console.error("[content:import] FAILED:", error instanceof Error ? (error.stack ?? error.message) : error);
  process.exitCode = 2;
});
