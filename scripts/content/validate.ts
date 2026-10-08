/**
 * npm run content:validate [-- <family|path> ...] [--strict] [--no-cache] [--quiet]
 *
 * Validates the version-controlled content source (content/, docs/CONTENT_PIPELINE.md) without a database: schemas,
 * keys, concept/objective references, rendering (no warnings, no KaTeX errors), marking of model and wrong responses
 * with the real marking engine, and assessment blueprints. Exits 1 on errors (and on warnings with --strict).
 *
 *   npm run content:validate                              everything
 *   npm run content:validate -- mathematics-o             one family (+ its syllabi and registry)
 *   npm run content:validate -- content/subjects/mathematics-o/questions/algebra
 */
import path from "node:path";
import { assertKnownFlags, boolFlag, parseArgs } from "./cli";

async function main(): Promise<void> {
  // The renderer logs every authoring warning; the validator reports them itself.
  process.env.LOG_LEVEL ??= "error";
  const args = parseArgs(process.argv.slice(2), ["strict", "no-cache", "quiet"]);
  assertKnownFlags(args, ["strict", "no-cache", "quiet"]);
  const { validateContent } = await import("@/server/content-pipeline/validate");
  const { formatIssues, formatSummary } = await import("@/server/content-pipeline/report");

  const result = validateContent({
    repoRoot: process.cwd(),
    targets: args.positionals.map((target) => (path.isAbsolute(target) ? path.relative(process.cwd(), target) : target)),
    ...(boolFlag(args, "no-cache") ? { cacheDir: null } : {}),
  });
  const shown = boolFlag(args, "quiet") ? result.issues.filter((issue) => issue.severity === "error") : result.issues;
  if (shown.length > 0) console.log(formatIssues(shown));
  console.log(`\n${formatSummary(result)}`);
  const failed = result.errorCount > 0 || (boolFlag(args, "strict") && result.warningCount > 0);
  console.log(failed ? "\nContent validation FAILED." : "\nContent validation passed.");
  process.exitCode = failed ? 1 : 0;
}

main().catch((error: unknown) => {
  console.error("[content:validate] FAILED:", error instanceof Error ? (error.stack ?? error.message) : error);
  process.exitCode = 2;
});
