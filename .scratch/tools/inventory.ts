/**
 * Inventory of a content family's question bank as each of its syllabi sees it (for blueprint design and smoke tests).
 * Run: npx tsx --conditions=react-server .scratch/tools/inventory.ts <family> <out.json>
 * Output: { "<board>/<qualification>/<subject>/<version>": [ { key, concepts, type, difficulty, marks, examStyle,
 *           access, applies, lineages, manualMarks } ] }
 */
import { writeFileSync } from "node:fs";
import { loadContentTree } from "@/server/content-pipeline/load";
import { buildSyllabusModel, planTags } from "@/server/content-pipeline/resolve";
import { questionAccessTier } from "@/server/content-pipeline/question-model";

const family = process.argv[2];
const target = process.argv[3];
if (!family) throw new Error("usage: inventory.ts <family> <out.json>");

const tree = loadContentTree(process.cwd(), { families: [family] });
const syllabi = tree.syllabi.filter((s) => s.data.family === family);

type Part = { label: string; type: string; marks: number; markingMode?: string; parts?: Part[] };
const manual = (parts: Part[] | undefined): number =>
  (parts ?? []).reduce((s, p) => s + (p.type === "STRUCTURED" ? manual(p.parts) : p.markingMode === "MANUAL" ? p.marks : 0), 0);

const out: Record<string, unknown[]> = {};
for (const syl of syllabi) {
  const model = buildSyllabusModel(syl).model;
  const rows: unknown[] = [];
  for (const loaded of tree.questions) {
    const q = loaded.data;
    const plan = planTags(q.concepts, q.applies, [model])[0];
    if (!plan) continue;
    rows.push({
      key: q.key,
      concepts: q.concepts,
      type: q.type,
      selectMode: q.type === "MULTIPLE_CHOICE" ? ((q.payload as { selectMode?: string } | undefined)?.selectMode ?? "single") : null,
      difficulty: q.difficulty,
      marks: q.marks,
      examStyle: q.examStyle ?? false,
      access: questionAccessTier(q),
      applies: q.applies ?? null,
      skill: q.skill ?? null,
      lineages: plan.nodes.map((n) => [...n.lineage, n.key]),
      manualMarks: q.type === "ESSAY" || q.type === "EXTENDED_RESPONSE" || q.markingMode === "MANUAL" ? q.marks : manual(q.parts as Part[] | undefined),
    });
  }
  out[model.path] = rows;
  console.log(model.path, rows.length, "questions");
}
if (target) writeFileSync(target, JSON.stringify(out, null, 1));
