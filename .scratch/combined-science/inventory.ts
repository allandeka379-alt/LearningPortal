/**
 * Inventory of the question bank as seen by ZIMSEC Combined Science (its own cs.* questions plus the questions it
 * borrows from biology-o, chemistry-o, physics-o and mathematics-o through conceptFamilies), for blueprint design.
 * Run: npx tsx --conditions=react-server .scratch/combined-science/inventory.ts .scratch/combined-science/inventory.json
 */
import { writeFileSync } from "node:fs";
import { loadContentTree } from "@/server/content-pipeline/load";
import { buildSyllabusModel, planTags } from "@/server/content-pipeline/resolve";
import { questionAccessTier } from "@/server/content-pipeline/question-model";

const FAMILIES = ["combined-science-o", "biology-o", "chemistry-o", "physics-o", "mathematics-o"];
const tree = loadContentTree(process.cwd(), { families: FAMILIES });
const syl = tree.syllabi.find((s) => s.data.family === "combined-science-o");
if (!syl) throw new Error("no combined-science syllabus");
const model = buildSyllabusModel(syl).model;

type Part = { label: string; type: string; marks: number; markingMode?: string; parts?: Part[] };
const leafTypes = (parts: Part[] | undefined): string[] =>
  (parts ?? []).flatMap((p) => (p.type === "STRUCTURED" ? leafTypes(p.parts) : [p.markingMode === "MANUAL" ? `${p.type}*` : p.type]));
const manual = (parts: Part[] | undefined): number =>
  (parts ?? []).reduce((s, p) => s + (p.type === "STRUCTURED" ? manual(p.parts) : p.markingMode === "MANUAL" ? p.marks : 0), 0);

const rows: unknown[] = [];
for (const loaded of tree.questions) {
  const q = loaded.data;
  const plan = planTags(q.concepts, q.applies, [model])[0];
  if (!plan) continue;
  const parts = q.parts as Part[] | undefined;
  rows.push({
    key: q.key,
    family: loaded.family,
    concepts: q.concepts,
    type: q.type,
    selectMode: q.type === "MULTIPLE_CHOICE" ? ((q.payload as { selectMode?: string } | undefined)?.selectMode ?? "single") : null,
    difficulty: q.difficulty,
    marks: q.marks,
    examStyle: q.examStyle ?? false,
    access: questionAccessTier(q),
    applies: q.applies ?? null,
    nodes: plan.nodes.map((n) => n.key),
    lineages: plan.nodes.map((n) => [...n.lineage, n.key]),
    tops: [...new Set(plan.nodes.map((n) => n.lineage[0] ?? n.key))],
    leafTypes: leafTypes(parts),
    manualMarks: q.type === "ESSAY" || q.type === "EXTENDED_RESPONSE" || q.markingMode === "MANUAL" ? q.marks : manual(parts),
    supplementText: /\(Supplement\)|Supplement only|Extended only/i.test(JSON.stringify(q)),
    stem: q.stem.replace(/\s+/g, " ").slice(0, 160),
  });
}
const target = process.argv[2];
if (target) writeFileSync(target, JSON.stringify({ [model.path]: rows }, null, 1));
console.log(model.path, rows.length, "questions");
