/**
 * Detailed inventory of the physics-o question bank per syllabus (for blueprint design): one row per question with
 * its tags in that syllabus, type, marks, difficulty, exam style, access tier, MCQ select mode, leaf part types,
 * hand-marked marks and whether it targets Cambridge Supplement objectives.
 * Run: npx tsx --conditions=react-server .scratch/physics/inventory.ts .scratch/physics/inventory.json
 */
import { writeFileSync } from "node:fs";
import { loadContentTree } from "@/server/content-pipeline/load";
import { buildSyllabusModel, planTags, type SyllabusModel } from "@/server/content-pipeline/resolve";
import { questionAccessTier } from "@/server/content-pipeline/question-model";

const FAMILY = "physics-o";
const tree = loadContentTree(process.cwd(), { families: [FAMILY] });
const models: SyllabusModel[] = tree.syllabi.filter((s) => s.data.family === FAMILY).map((s) => buildSyllabusModel(s).model);
const questions = tree.questions.filter((q) => q.family === FAMILY);

type Part = { label: string; type: string; marks: number; markingMode?: string; parts?: Part[] };
const leafTypes = (parts: Part[] | undefined): string[] =>
  (parts ?? []).flatMap((p) => (p.type === "STRUCTURED" ? leafTypes(p.parts) : [p.markingMode === "MANUAL" ? `${p.type}*` : p.type]));
const manual = (parts: Part[] | undefined): number =>
  (parts ?? []).reduce((s, p) => s + (p.type === "STRUCTURED" ? manual(p.parts) : p.markingMode === "MANUAL" ? p.marks : 0), 0);

const cam = models.find((m) => m.path.startsWith("cambridge"));
const supplementObjectives = new Set<string>();
if (cam) for (const node of cam.nodes) for (const o of node.objectives) if (/^Supplement:/i.test(o.text) || node.components.length > 0) supplementObjectives.add(`cambridge/igcse/physics:${o.code}`);

const out: Record<string, unknown[]> = {};
for (const model of models) {
  const rows: unknown[] = [];
  for (const loaded of questions) {
    const q = loaded.data;
    const plan = planTags(q.concepts, q.applies, [model])[0];
    if (!plan) continue;
    const parts = q.parts as Part[] | undefined;
    const manualMarks = q.type === "ESSAY" || q.type === "EXTENDED_RESPONSE" || q.markingMode === "MANUAL" ? q.marks : manual(parts);
    const camObjs = (q.objectives ?? []).filter((o) => o.startsWith("cambridge/"));
    rows.push({
      key: q.key,
      concepts: q.concepts,
      type: q.type,
      selectMode: q.type === "MULTIPLE_CHOICE" ? ((q.payload as { selectMode?: string } | undefined)?.selectMode ?? "single") : null,
      optionCount: q.options?.length ?? 0,
      difficulty: q.difficulty,
      marks: q.marks,
      examStyle: q.examStyle ?? false,
      daily: q.dailyEligible ?? false,
      access: questionAccessTier(q),
      skill: q.skill,
      paper: q.paper ?? null,
      applies: q.applies ?? null,
      nodes: plan.nodes.map((n) => n.key),
      lineages: plan.nodes.map((n) => [...n.lineage, n.key]),
      tops: [...new Set(plan.nodes.map((n) => n.lineage[0] as string))],
      primary: plan.nodes[0]?.key ?? "",
      leafTypes: leafTypes(parts),
      manualMarks,
      supplement: camObjs.length > 0 && camObjs.every((o) => supplementObjectives.has(o)),
      anySupplement: camObjs.some((o) => supplementObjectives.has(o)),
      supplementText: /supplement|extended/i.test(JSON.stringify(q)),
      stem: q.stem.replace(/\s+/g, " ").slice(0, 160),
      file: loaded.file,
    });
  }
  out[model.path] = rows;
}
const target = process.argv[2];
if (target) writeFileSync(target, JSON.stringify(out, null, 1));
for (const [path, rows] of Object.entries(out)) console.log(path, rows.length, "questions");
