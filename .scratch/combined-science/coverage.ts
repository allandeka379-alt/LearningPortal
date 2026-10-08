/**
 * Coverage of the ZIMSEC Combined Science syllabus by the content it sees (own cs.* items plus items borrowed from
 * biology-o, chemistry-o, physics-o and mathematics-o): a markdown table per topic for the README, plus facts.
 * Run: npx tsx --conditions=react-server .scratch/combined-science/coverage.ts > .scratch/combined-science/coverage.md
 */
import { readFileSync } from "node:fs";
import { loadContentTree } from "@/server/content-pipeline/load";
import { buildSyllabusModel, planTags } from "@/server/content-pipeline/resolve";

const FAMILIES = ["combined-science-o", "biology-o", "chemistry-o", "physics-o", "mathematics-o"];
const tree = loadContentTree(process.cwd(), { families: FAMILIES });
const syl = tree.syllabi.find((s) => s.data.family === "combined-science-o");
if (!syl) throw new Error("no syllabus");
const model = buildSyllabusModel(syl).model;
const lineagesOf = (concepts: readonly string[], applies: readonly string[] | undefined) =>
  (planTags(concepts, applies, [model])[0]?.nodes ?? []).map((n) => [...n.lineage, n.key]);

type Row = { family: string; lineages: string[][]; type?: string; mcq1?: boolean; exam?: boolean; free?: boolean; d?: number };
const qs: Row[] = tree.questions.map((l) => ({
  family: l.family,
  lineages: lineagesOf(l.data.concepts, l.data.applies),
  type: l.data.type,
  mcq1: l.data.type === "MULTIPLE_CHOICE" && (l.data.payload as { selectMode?: string } | undefined)?.selectMode !== "multiple",
  exam: l.data.examStyle ?? false,
  d: l.data.difficulty,
})).filter((r) => r.lineages.length > 0);
const lessons: Row[] = tree.lessons.map((l) => ({ family: l.family, lineages: lineagesOf(l.front.concepts, l.front.applies), free: l.front.freePreview ?? false })).filter((r) => r.lineages.length > 0);
const cards: Row[] = tree.flashcards.map((l) => ({ family: l.family, lineages: lineagesOf(l.data.concepts, l.data.applies) })).filter((r) => r.lineages.length > 0);

const tests = JSON.parse(readFileSync("content/subjects/combined-science-o/assessments/topic-tests/zimsec-topic-tests.json", "utf8")) as { scope: { topics: string[] } }[];
const tested = new Set(tests.flatMap((t) => t.scope.topics));
const inNode = (r: Row, key: string) => r.lineages.some((l) => l.includes(key));
const short = (f: string) => ({ "combined-science-o": "CS", "biology-o": "Bio", "chemistry-o": "Chem", "physics-o": "Phys", "mathematics-o": "Maths" })[f] ?? f;

console.log("| Topic | Lessons (free) | Questions | from | Single-answer MCQ | Exam-style | d4–5 | Flashcards | Topic test |");
console.log("| --- | --- | --- | --- | --- | --- | --- | --- | --- |");
type N = { key: string; code?: string | null; name: string; children?: N[] };
const row = (n: N, depth: number) => {
  const q = qs.filter((r) => inNode(r, n.key));
  const l = lessons.filter((r) => inNode(r, n.key));
  const c = cards.filter((r) => inNode(r, n.key));
  const fam: Record<string, number> = {};
  for (const r of q) fam[short(r.family)] = (fam[short(r.family)] ?? 0) + 1;
  const from = Object.entries(fam).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k} ${v}`).join(", ");
  const name = `${n.name}`;
  const label = depth === 0 ? `**${name}**` : depth === 1 ? `**${name}**` : `&nbsp;&nbsp;${name}`;
  const b = (x: string | number) => (depth <= 1 ? `**${x}**` : String(x));
  console.log(`| ${label} | ${b(`${l.length} (${l.filter((r) => r.free).length})`)} | ${b(q.length)} | ${from} | ${q.filter((r) => r.mcq1).length} | ${q.filter((r) => r.exam).length} | ${q.filter((r) => (r.d ?? 0) >= 4).length} | ${b(c.length)} | ${tested.has(n.key) ? "yes" : ""} |`);
  for (const ch of n.children ?? []) row(ch, depth + 1);
};
for (const t of syl.data.topics as N[]) row(t, 0);
const fam: Record<string, number> = {};
for (const r of qs) fam[short(r.family)] = (fam[short(r.family)] ?? 0) + 1;
const lf: Record<string, number> = {};
for (const r of lessons) lf[short(r.family)] = (lf[short(r.family)] ?? 0) + 1;
console.log(`| **All topics (distinct items)** | **${lessons.length} (${lessons.filter((r) => r.free).length})** | **${qs.length}** | ${Object.entries(fam).map(([k, v]) => `${k} ${v}`).join(", ")} | ${qs.filter((r) => r.mcq1).length} | ${qs.filter((r) => r.exam).length} | ${qs.filter((r) => (r.d ?? 0) >= 4).length} | **${cards.length}** |  |`);
console.log(`\n<!-- facts ${JSON.stringify({ lessonsByFamily: lf, questionsByFamily: fam, cards: cards.length, nodes: model.nodes.length })} -->`);
