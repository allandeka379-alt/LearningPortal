/**
 * npm run content:check -- <family> [--fail] [--kind LESSON_REUSE|QUESTION_REUSE|UNBALANCED_MATH] [--limit 50]
 *
 * Advisory self-checks for a family (src/server/content-pipeline/self-check.ts): practice questions that repeat a
 * lesson's worked examples, near-duplicate questions within a concept, and unbalanced `$` maths delimiters. Run it
 * after writing and before review; `npm run content:validate` remains the gate. Exits 1 only with --fail and findings.
 */
import { assertKnownFlags, boolFlag, parseArgs, stringFlag } from "./cli";

async function main(): Promise<void> {
  const args = parseArgs(process.argv.slice(2), ["fail"]);
  assertKnownFlags(args, ["fail", "kind", "limit"]);
  const families = args.positionals;
  if (families.length === 0) throw new Error("Name at least one family, e.g. npm run content:check -- physics-o");
  const { loadContentTree } = await import("@/server/content-pipeline/load");
  const { selfCheck } = await import("@/server/content-pipeline/self-check");

  const tree = loadContentTree(process.cwd(), { families });
  const inFamilies = (family: string) => families.includes(family);
  const findings = selfCheck({
    lessons: tree.lessons.filter((lesson) => inFamilies(lesson.family)).map((lesson) => ({ file: lesson.file, key: lesson.front.key, concepts: lesson.front.concepts, body: lesson.body })),
    questions: tree.questions.filter((item) => inFamilies(item.family)).map((item) => ({ file: item.file, key: item.data.key, concepts: item.data.concepts, data: item.data })),
    others: [
      ...tree.flashcards.filter((item) => inFamilies(item.family)).map((item) => ({ file: item.file, key: item.data.key, concepts: item.data.concepts, data: item.data })),
      ...tree.assessments.filter((item) => inFamilies(item.family)).map((item) => ({ file: item.file, key: item.data.key, concepts: [], data: item.data })),
    ],
  });

  const kind = stringFlag(args, "kind");
  const shown = kind ? findings.filter((finding) => finding.kind === kind) : findings;
  const limit = Number(stringFlag(args, "limit") ?? "200");
  const counts = new Map<string, number>();
  for (const finding of findings) counts.set(finding.kind, (counts.get(finding.kind) ?? 0) + 1);

  for (const finding of shown.slice(0, limit)) console.log(`${finding.kind.padEnd(15)} ${finding.key}  ${finding.detail}  (${finding.file})`);
  if (shown.length > limit) console.log(`... ${shown.length - limit} more (raise --limit)`);
  console.log(
    `\n${families.join(", ")}: ${tree.lessons.filter((l) => inFamilies(l.family)).length} lessons, ${tree.questions.filter((q) => inFamilies(q.family)).length} questions checked. ` +
      (findings.length === 0 ? "No findings." : [...counts].map(([name, count]) => `${name} ${count}`).join(", ")),
  );
  process.exitCode = boolFlag(args, "fail") && findings.length > 0 ? 1 : 0;
}

main().catch((error: unknown) => {
  console.error("[content:check] FAILED:", error instanceof Error ? (error.stack ?? error.message) : error);
  process.exitCode = 2;
});
