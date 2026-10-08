/**
 * npm run content:publish -- --approver <email> [--family <f>[,<f>…]] [--topic <node key>] [--dry-run] [--note "<what you checked>"]
 *                                               [--author <pipeline author email>] [--no-catalogue] [--four-eyes]
 *
 * RUNNING THIS COMMAND IS A HUMAN ATTESTATION (§41, docs/CONTENT_PIPELINE.md "Publishing"): you, the approver, state
 * that you have reviewed every item it publishes — answers re-derived, facts, units and notation checked, syllabus
 * alignment and originality confirmed. Use --dry-run first to list what would be published, and review it at
 * /admin/review/topics. Items are approved in your name (four-eyes: never the author), published through the shared
 * publish helper (revision snapshots, audit log, search re-index), in dependency order. With an ADMIN approver, DRAFT
 * syllabus versions are published first and subjects with published content become AVAILABLE.
 */
import path from "node:path";
import { config } from "dotenv";
import { assertKnownFlags, boolFlag, listFlag, parseArgs, stringFlag } from "./cli";

config({ path: path.join(process.cwd(), ".env"), quiet: true });

const KNOWN = ["approver", "family", "topic", "dry-run", "note", "author", "no-catalogue", "four-eyes", "verbose"];

async function main(): Promise<void> {
  process.env.LOG_LEVEL ??= "error";
  const args = parseArgs(process.argv.slice(2), ["dry-run", "no-catalogue", "four-eyes", "verbose"]);
  assertKnownFlags(args, KNOWN);
  const approver = stringFlag(args, "approver");
  if (!approver) {
    console.error("Name the person who reviewed the content: npm run content:publish -- --approver <email> [--dry-run]");
    process.exitCode = 1;
    return;
  }
  const { db } = await import("@/server/db");
  const { publishContentFromPipeline } = await import("@/server/content-pipeline/publisher");
  const { table } = await import("@/server/content-pipeline/report");
  const dryRun = boolFlag(args, "dry-run");
  console.log(
    dryRun
      ? `DRY RUN: nothing is approved or published.\n`
      : `ATTESTATION: by publishing as ${approver} you confirm that you reviewed every item below (accuracy, notation, syllabus alignment, originality). This is recorded in the audit log.\n`,
  );
  try {
    const report = await publishContentFromPipeline({
      repoRoot: process.cwd(),
      approverEmail: approver,
      families: [...listFlag(args, "family"), ...args.positionals],
      topicKey: stringFlag(args, "topic") ?? null,
      dryRun,
      note: stringFlag(args, "note") ?? null,
      authorEmail: stringFlag(args, "author") ?? null,
      catalogue: !boolFlag(args, "no-catalogue"),
      requireFourEyes: boolFlag(args, "four-eyes"),
      onProgress: (line) => {
        if (boolFlag(args, "verbose")) console.log(`  ${line}`);
      },
    });
    if (report.syllabi.length > 0) console.log(`${table(["Syllabus version", "Outcome", "Details"], report.syllabi.map((s) => [s.path, s.outcome, s.message ?? ""]))}\n`);
    if (report.items.length === 0) console.log("Nothing is waiting for review or publication.");
    else {
      console.log(
        table(
          ["Type", "Item", "Was", "Outcome", "Rev.", "Details"],
          report.items.map((i) => [i.type.toLowerCase(), i.externalRef?.replace(/^content:/, "") ?? i.id, i.from, i.outcome, i.revision ?? "", (i.message ?? i.title).slice(0, 90)]),
        ),
      );
    }
    for (const line of report.catalogue) console.log(`Catalogue: ${line}`);
    const published = report.items.filter((i) => i.outcome === "published").length;
    const failed = report.items.filter((i) => i.outcome === "error").length + report.syllabi.filter((s) => s.outcome === "error").length;
    console.log(dryRun ? `\n${report.items.length} item(s) would be published.` : `\nPublished ${published} item(s) as ${report.approver}; ${failed} failed.`);
    process.exitCode = failed > 0 ? 1 : 0;
  } finally {
    await db.$disconnect();
  }
}

main().catch((error: unknown) => {
  console.error("[content:publish] FAILED:", error instanceof Error ? (error.stack ?? error.message) : error);
  process.exitCode = 2;
});
