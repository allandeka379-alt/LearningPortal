/**
 * Inventory of the english-language-o question bank as each of its three syllabi sees it, for blueprint design.
 * Run: npx tsx --conditions=react-server .scratch/english/inventory.ts .scratch/english/inventory.json
 */
import { writeFileSync } from "node:fs";
import { loadContentTree } from "@/server/content-pipeline/load";
import { buildSyllabusModel, planTags } from "@/server/content-pipeline/resolve";
import { questionAccessTier } from "@/server/content-pipeline/question-model";

const tree = loadContentTree(process.cwd(), { families: ["english-language-o"] });
const syllabi = tree.syllabi.filter((s) => s.data.family === "english-language-o");

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
      difficulty: q.difficulty,
      marks: q.marks,
      examStyle: q.examStyle ?? false,
      access: questionAccessTier(q),
      applies: q.applies ?? null,
      lineages: plan.nodes.map((n) => [...n.lineage, n.key]),
      manualMarks: q.type === "ESSAY" || q.type === "EXTENDED_RESPONSE" || q.markingMode === "MANUAL" ? q.marks : manual(q.parts as Part[] | undefined),
    });
  }
  out[model.path] = rows;
  console.log(model.path, rows.length, "questions");
}
const target = process.argv[2];
if (target) writeFileSync(target, JSON.stringify(out, null, 1));
