/**
 * Coverage tables for content/subjects/physics-o/README.md (per syllabus topic: lessons, questions by type and
 * difficulty, flashcards, tests), computed with the pipeline's own tagging rules (planTags), plus family-wide facts.
 * Run: npx tsx --conditions=react-server .scratch/physics/coverage.ts > .scratch/physics/coverage.md
 */
import { loadContentTree } from "@/server/content-pipeline/load";
import { buildSyllabusModel, isWithin, planTags, type FlatNode, type SyllabusModel } from "@/server/content-pipeline/resolve";
import { questionAccessTier } from "@/server/content-pipeline/question-model";

const FAMILY = "physics-o";
const tree = loadContentTree(process.cwd(), { families: [FAMILY] });
const models: SyllabusModel[] = tree.syllabi
  .filter((s) => s.data.family === FAMILY)
  .map((s) => buildSyllabusModel(s).model)
  .sort((a, b) => (a.path.startsWith("zimsec") ? -1 : b.path.startsWith("zimsec") ? 1 : 0));

const questions = tree.questions.filter((q) => q.family === FAMILY).map((q) => q.data);
const lessons = tree.lessons.filter((l) => l.family === FAMILY);
const cards = tree.flashcards.filter((f) => f.family === FAMILY).map((f) => f.data);
const assessments = tree.assessments.filter((a) => a.family === FAMILY).map((a) => a.data);

const TYPE_COLS: [string, string[]][] = [
  ["MCQ", ["MULTIPLE_CHOICE"]],
  ["T/F", ["TRUE_FALSE"]],
  ["Num/Calc", ["NUMERICAL", "CALCULATION"]],
  ["Short", ["SHORT_ANSWER"]],
  ["Fill", ["FILL_IN_THE_BLANK"]],
  ["Match", ["MATCHING"]],
  ["Struct", ["STRUCTURED"]],
  ["Ext", ["EXTENDED_RESPONSE", "ESSAY"]],
];

type P = { type: string; marks: number; markingMode?: string; parts?: P[] };
function manualMarks(q: (typeof questions)[number]): number {
  const walk = (parts: P[] | undefined): number => (parts ?? []).reduce((s, p) => s + (p.type === "STRUCTURED" ? walk(p.parts) : p.markingMode === "MANUAL" ? p.marks : 0), 0);
  if (q.type === "ESSAY" || q.type === "EXTENDED_RESPONSE" || q.markingMode === "MANUAL") return q.marks;
  return walk(q.parts as P[] | undefined);
}

const out: string[] = [];
const perSyllabus: Record<string, unknown> = {};
for (const model of models) {
  const qPlans = questions.map((q) => ({ q, nodes: planTags(q.concepts, q.applies, [model])[0]?.nodes ?? [] }));
  const lPlans = lessons.map((l) => ({ l, nodes: planTags(l.front.concepts, l.front.applies, [model])[0]?.nodes ?? [] }));
  const cPlans = cards.map((c) => ({ c, nodes: planTags(c.concepts, c.applies, [model])[0]?.nodes ?? [] }));
  const inNode = (nodes: FlatNode[], key: string) => nodes.some((n) => isWithin(n, key));
  const subject = `${model.ref.board}/${model.ref.qualification}/${model.ref.subject}`;
  const tests = assessments.filter((a) => a.syllabus === subject);

  const row = (node: FlatNode | null, label: string) => {
    const qs = qPlans.filter((p) => p.nodes.length > 0 && (node ? inNode(p.nodes, node.key) : true)).map((p) => p.q);
    const ls = lPlans.filter((p) => p.nodes.length > 0 && (node ? inNode(p.nodes, node.key) : true));
    const cs = cPlans.filter((p) => p.nodes.length > 0 && (node ? inNode(p.nodes, node.key) : true));
    const byType = TYPE_COLS.map(([, types]) => qs.filter((q) => types.includes(q.type)).length);
    const byDiff = [1, 2, 3, 4, 5].map((d) => qs.filter((q) => q.difficulty === d).length);
    const exam = qs.filter((q) => q.examStyle).length;
    const free = ls.filter((p) => p.l.front.freePreview).length;
    const topicTests = node && node.depth === 0 ? tests.filter((a) => a.kind === "TOPIC_TEST" && (a.scope?.topics ?? []).includes(node.key)).length : 0;
    return { label, lessons: ls.length, free, questions: qs.length, byType, byDiff, exam, cards: cs.length, topicTests };
  };

  out.push(`### ${model.data.title} — version ${model.ref.versionLabel}`, "");
  out.push("Items are counted under every topic they are tagged to (some lessons, questions and cards serve two subtopics or two topics), so topic rows can add up to more than the syllabus total.", "");
  out.push("| Topic | Lessons (free) | Questions | MCQ | T/F | Num/Calc | Short | Fill | Match | Struct | Ext | d1 | d2 | d3 | d4 | d5 | Exam-style | Flashcards | Topic test |");
  out.push("| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |");
  const fmt = (r: ReturnType<typeof row>, bold: boolean) => {
    const b = (s: string | number) => (bold ? `**${s}**` : String(s));
    return `| ${b(r.label)} | ${b(`${r.lessons} (${r.free})`)} | ${b(r.questions)} | ${r.byType.join(" | ")} | ${r.byDiff.join(" | ")} | ${r.exam} | ${b(r.cards)} | ${r.topicTests > 0 ? "yes" : ""} |`;
  };
  for (const top of model.nodes.filter((n) => n.depth === 0)) {
    out.push(fmt(row(top, `${top.code ?? ""} ${top.name}`.trim()), true));
    for (const child of model.nodes.filter((n) => n.parentKey === top.key)) {
      const supplement = child.components.length > 0 ? " (Supplement)" : "";
      out.push(fmt(row(child, `&nbsp;&nbsp;${child.code ?? ""} ${child.name}${supplement}`), false));
    }
  }
  const total = row(null, "All topics (distinct items)");
  out.push(fmt(total, true));
  out.push("");
  perSyllabus[model.path] = {
    lessons: total.lessons,
    freeLessons: total.free,
    questions: total.questions,
    flashcards: total.cards,
    topicTests: tests.filter((a) => a.kind === "TOPIC_TEST").length,
    mocks: tests.filter((a) => a.kind === "MOCK_EXAM").map((a) => a.key),
    conceptsCovered: new Set(model.nodes.flatMap((n) => n.covers)).size,
    nodes: model.nodes.length,
    topLevel: model.nodes.filter((n) => n.depth === 0).length,
  };
}

// Family-wide facts used in the README text.
const manual = questions.filter((q) => manualMarks(q) > 0);
const fullyManual = questions.filter((q) => manualMarks(q) === q.marks);
const daily = questions.filter((q) => q.dailyEligible);
const exam = questions.filter((q) => q.examStyle);
const lessonWords = lessons.map((l) => l.body.split(/\s+/).filter(Boolean).length).sort((a, b) => a - b);
const freeLessons = lessons.filter((l) => l.front.freePreview).map((l) => l.front.title);
const extendedLessons = lessons.filter((l) => l.front.level === "extended").map((l) => l.front.title);
const applies = {
  zimsecOnly: questions.filter((q) => (q.applies ?? []).length > 0 && (q.applies ?? []).every((a) => a.startsWith("zimsec"))).length,
  cambridgeOnly: questions.filter((q) => (q.applies ?? []).length > 0 && (q.applies ?? []).every((a) => a.startsWith("cambridge"))).length,
};
const supplementLabelled = questions.filter((q) => /\(Supplement\)/.test(JSON.stringify(q))).length;
const marksTotal = questions.reduce((s, q) => s + q.marks, 0);
const manualTotal = questions.reduce((s, q) => s + manualMarks(q), 0);
const multiSelect = questions.filter((q) => q.type === "MULTIPLE_CHOICE" && (q.payload as { selectMode?: string } | undefined)?.selectMode === "multiple").length;
const access = { free: questions.filter((q) => questionAccessTier(q) === "FREE").length, public: questions.filter((q) => questionAccessTier(q) === "PUBLIC").length };
const cardTypes: Record<string, number> = {};
for (const c of cards) cardTypes[c.cardType] = (cardTypes[c.cardType] ?? 0) + 1;
const stemsMentioningDiagrams = questions.filter((q) => /\b(diagram|figure|drawing|photograph|micrograph|shown below)\b/i.test(JSON.stringify(q))).length;
out.push(
  "<!-- facts",
  JSON.stringify(
    {
      perSyllabus,
      questions: questions.length,
      lessons: lessons.length,
      flashcards: cards.length,
      cardTypes,
      assessments: assessments.length,
      topicTests: assessments.filter((a) => a.kind === "TOPIC_TEST").length,
      mocks: assessments.filter((a) => a.kind === "MOCK_EXAM").length,
      marksTotal,
      manualTotal,
      questionsWithManualParts: manual.length,
      fullyManualQuestions: fullyManual.length,
      dailyEligible: daily.length,
      freeQuestions: access.free,
      publicQuestions: access.public,
      examStyle: exam.length,
      multiSelect,
      appliesZimsecOnly: applies.zimsecOnly,
      appliesCambridgeOnly: applies.cambridgeOnly,
      supplementLabelled,
      stemsMentioningDiagrams,
      lessonWordsMin: lessonWords[0],
      lessonWordsMax: lessonWords[lessonWords.length - 1],
      lessonWordsMedian: lessonWords[Math.floor(lessonWords.length / 2)],
      freePreviewLessons: freeLessons,
      extendedLessons,
      media: tree.media.get(FAMILY)?.size ?? 0,
      byDifficulty: [1, 2, 3, 4, 5].map((d) => questions.filter((q) => q.difficulty === d).length),
      byType: Object.fromEntries(TYPE_COLS.map(([label, types]) => [label, questions.filter((q) => types.includes(q.type)).length])),
    },
    null,
    1,
  ),
  "-->",
);
console.log(out.join("\n"));
