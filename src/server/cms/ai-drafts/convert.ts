import type { QuestionType, StudyActivityType } from "@/generated/prisma/enums";
import type { ImportIssue } from "@/server/cms/imports/constants";
import { flashcardImportItemSchema, FLASHCARD_CARD_TYPES, lessonImportItemSchema, questionImportItemSchema } from "@/server/cms/imports/items";
import { normalizeEnumText, prepareFlashcard, prepareLesson, prepareQuestion, type ImportLookups, type PreparedFlashcard, type PreparedLesson, type PreparedQuestion } from "@/server/cms/imports/rows";
import type { AiExplanation, AiFlashcard, AiLesson, AiMcq, AiQuestion, AiStudyPlan } from "./prompts";

/**
 * Model output → validated DRAFT inputs (§41), item by item. Pure. Each generated item goes through the same contracts
 * as human-authored content — the question editor schema, `validateQuestionDefinition`, the content renderer's
 * blocking warnings (invalid LaTeX, unknown blocks) — and is REJECTED individually with a reason when it fails; the
 * rest of the batch is kept. Curriculum references are the short refs given in the prompt (T1…, O1…), resolved
 * through the lookups, so a model can never tag content to an arbitrary id.
 */

export interface Rejection {
  /** 1-based item number in the model's output (0 = the output as a whole). */
  index: number;
  reason: string;
}

export interface ConvertContext {
  /** Lookups with `topicRefs` keyed by prompt ref ("t1") and `objectiveRefs` by prompt ref ("o1"). */
  lookups: ImportLookups;
  /** Prompt ref of the job's topic: always the primary tag when set. */
  defaultTopicRef: string | null;
  /** Requested number of items (extra items are rejected). */
  count: number;
  allowedTypes: ReadonlySet<QuestionType>;
  marksPerQuestion: number | null;
}

function reasonOf(issues: readonly ImportIssue[]): string {
  const errors = issues.filter((issue) => issue.severity === "error");
  return errors
    .slice(0, 3)
    .map((issue) => (issue.field ? `${issue.field}: ${issue.message}` : issue.message))
    .join("; ");
}

function text(value: string | null | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

function wholeNumber(value: number | null | undefined, min: number, max: number): number | undefined {
  if (value === null || value === undefined || !Number.isFinite(value)) return undefined;
  return Math.min(max, Math.max(min, Math.round(value)));
}

function knownRefs(refs: readonly string[] | null | undefined, map: ReadonlyMap<string, unknown>): string[] {
  return [...new Set((refs ?? []).map((ref) => ref.trim().toLowerCase()).filter((ref) => map.has(ref)))];
}

const COGNITIVE_SKILLS = new Set(["RECALL", "UNDERSTANDING", "APPLICATION", "ANALYSIS", "EVALUATION", "CREATION"]);

function topicsFor(item: { topicRef?: string | null }, context: ConvertContext): string[] {
  if (context.defaultTopicRef) return [context.defaultTopicRef];
  return knownRefs(item.topicRef ? [item.topicRef] : [], context.lookups.topicRefs);
}

/** One generated question (generic or MCQ shape) in the import item shape the validators understand. */
export function questionItemFromAi(raw: AiQuestion | AiMcq, kind: "QUESTIONS" | "MCQ", context: ConvertContext): Record<string, unknown> {
  const type = kind === "MCQ" ? "MULTIPLE_CHOICE" : normalizeEnumText((raw as AiQuestion).type ?? "");
  const skill = raw.cognitiveSkill ? normalizeEnumText(raw.cognitiveSkill) : null;
  const modelMarks = Number.isFinite(raw.marks) && raw.marks >= 1 ? wholeNumber(raw.marks, 1, 1_000) : undefined;
  const marks = context.marksPerQuestion && type !== "ESSAY" && type !== "EXTENDED_RESPONSE" ? context.marksPerQuestion : modelMarks;
  const item: Record<string, unknown> = {
    type,
    stem: raw.stem,
    marks,
    difficulty: wholeNumber(raw.difficulty, 1, 5),
    explanation: text(raw.explanation),
    workedSolution: text(raw.workedSolution),
    conceptSummary: text(raw.conceptSummary),
    hints: raw.hints.map((hint) => hint.trim()).filter((hint) => hint !== "").slice(0, 5),
    cognitiveSkill: skill && COGNITIVE_SKILLS.has(skill) ? skill : undefined,
    estimatedSeconds: wholeNumber(raw.estimatedSeconds, 10, 36_000),
    objectives: knownRefs(raw.objectiveRefs, context.lookups.objectiveRefs),
    topics: topicsFor(raw, context),
  };
  if (type === "MULTIPLE_CHOICE") {
    item.options = raw.options.map((option) => ({ content: option.text, isCorrect: option.isCorrect, ...(text(option.rationale) ? { rationale: option.rationale.trim() } : {}) }));
    return item;
  }
  const full = raw as AiQuestion;
  const scheme = full.markScheme
    .filter((point) => point.description.trim() !== "")
    .map((point) => ({ description: point.description.trim(), marks: wholeNumber(point.marks, 1, 1_000) ?? 1 }));
  switch (type) {
    case "TRUE_FALSE":
      if (full.trueFalseAnswer !== null) item.answer = full.trueFalseAnswer;
      break;
    case "SHORT_ANSWER":
      item.acceptedAnswers = full.acceptedAnswers.map((a) => a.trim()).filter((a) => a !== "");
      if (scheme.length > 0) item.markScheme = scheme;
      break;
    case "NUMERICAL":
    case "CALCULATION":
      if (full.numericAnswer !== null) item.answer = full.numericAnswer;
      if (full.tolerance !== null && Number.isFinite(full.tolerance) && full.tolerance >= 0) item.tolerance = full.tolerance;
      item.units = full.units.map((u) => u.trim()).filter((u) => u !== "");
      if (type === "CALCULATION" && scheme.length > 0) item.markScheme = scheme;
      break;
    case "ESSAY":
    case "EXTENDED_RESPONSE":
      item.markScheme = scheme;
      if (text(full.modelAnswer)) item.modelAnswer = full.modelAnswer?.trim();
      // Essays are worth their mark scheme unless the model gave a total.
      if (item.marks === undefined) item.marks = scheme.reduce((sum, point) => sum + point.marks, 0) || undefined;
      break;
    default:
      break;
  }
  return item;
}

/** Validates generated questions; keeps the valid ones (up to `count`) and explains every rejection. */
export function convertQuestions(kind: "QUESTIONS" | "MCQ", items: readonly (AiQuestion | AiMcq)[], context: ConvertContext): { drafts: PreparedQuestion[]; rejected: Rejection[]; warnings: string[] } {
  const drafts: PreparedQuestion[] = [];
  const rejected: Rejection[] = [];
  const warnings: string[] = [];
  items.forEach((raw, i) => {
    const index = i + 1;
    if (drafts.length >= context.count) {
      rejected.push({ index, reason: "More items than requested." });
      return;
    }
    const item = questionItemFromAi(raw, kind, context);
    const type = item.type as QuestionType;
    if (!context.allowedTypes.has(type)) {
      rejected.push({ index, reason: `The question type ${String(item.type) || "(none)"} was not requested.` });
      return;
    }
    const parsed = questionImportItemSchema.safeParse(item);
    if (!parsed.success) {
      rejected.push({ index, reason: parsed.error.issues.slice(0, 3).map((issue) => `${issue.path.join(".")}: ${issue.message}`).join("; ") });
      return;
    }
    const result = prepareQuestion(parsed.data, context.lookups, index, false);
    if (!result.prepared) {
      rejected.push({ index, reason: reasonOf(result.issues) || "The question is incomplete." });
      return;
    }
    for (const issue of result.issues.filter((i) => i.severity === "warning")) warnings.push(`Item ${index}: ${issue.message}`);
    drafts.push(result.prepared);
  });
  return { drafts, rejected, warnings };
}

export function convertFlashcards(items: readonly AiFlashcard[], context: ConvertContext): { drafts: PreparedFlashcard[]; rejected: Rejection[] } {
  const drafts: PreparedFlashcard[] = [];
  const rejected: Rejection[] = [];
  const seen = new Set<string>();
  items.forEach((raw, i) => {
    const index = i + 1;
    if (drafts.length >= context.count) {
      rejected.push({ index, reason: "More items than requested." });
      return;
    }
    const cardType = normalizeEnumText(raw.cardType ?? "");
    const parsed = flashcardImportItemSchema.safeParse({
      front: raw.front,
      back: raw.back,
      ...(text(raw.notes) ? { notes: raw.notes?.trim() } : {}),
      cardType: (FLASHCARD_CARD_TYPES as readonly string[]).includes(cardType) ? cardType : "CONCEPT",
      ...(topicsFor(raw, context)[0] ? { topic: topicsFor(raw, context)[0] } : {}),
    });
    if (!parsed.success) {
      rejected.push({ index, reason: parsed.error.issues.slice(0, 3).map((issue) => `${issue.path.join(".")}: ${issue.message}`).join("; ") });
      return;
    }
    const key = parsed.data.front.trim().toLowerCase();
    if (seen.has(key)) {
      rejected.push({ index, reason: "Repeats the front of an earlier card." });
      return;
    }
    const result = prepareFlashcard(parsed.data, context.lookups, index, false);
    if (!result.prepared) {
      rejected.push({ index, reason: reasonOf(result.issues) });
      return;
    }
    seen.add(key);
    drafts.push(result.prepared);
  });
  return { drafts, rejected };
}

export function convertLesson(raw: AiLesson, context: ConvertContext): { draft: PreparedLesson | null; rejected: Rejection[] } {
  const parsed = lessonImportItemSchema.safeParse({
    title: raw.title,
    summary: text(raw.summary)?.slice(0, 1_000),
    body: raw.body,
    estimatedMinutes: wholeNumber(raw.estimatedMinutes, 1, 600),
    kind: "LESSON",
    objectives: knownRefs(raw.objectiveRefs, context.lookups.objectiveRefs),
    topics: context.defaultTopicRef ? [context.defaultTopicRef] : [],
  });
  if (!parsed.success) return { draft: null, rejected: [{ index: 1, reason: parsed.error.issues.slice(0, 3).map((i) => `${i.path.join(".")}: ${i.message}`).join("; ") }] };
  const result = prepareLesson(parsed.data, context.lookups, 1, false);
  return result.prepared ? { draft: result.prepared, rejected: [] } : { draft: null, rejected: [{ index: 1, reason: reasonOf(result.issues) }] };
}

export interface ExplanationPatch {
  explanation: string;
  workedSolution: string | null;
  conceptSummary: string | null;
}

export function convertExplanation(raw: AiExplanation, checkMarkdown: ImportLookups["checkMarkdown"]): { patch: ExplanationPatch | null; rejected: Rejection[] } {
  const explanation = text(raw.explanation);
  if (!explanation) return { patch: null, rejected: [{ index: 1, reason: "explanation: The explanation is empty." }] };
  const patch: ExplanationPatch = {
    explanation: explanation.slice(0, 50_000),
    workedSolution: text(raw.workedSolution)?.slice(0, 50_000) ?? null,
    conceptSummary: text(raw.conceptSummary)?.slice(0, 5_000) ?? null,
  };
  const problems = (["explanation", "workedSolution", "conceptSummary"] as const).flatMap((field) => {
    const source = patch[field];
    return source ? checkMarkdown(source, "block").map((message) => `${field}: ${message}`) : [];
  });
  return problems.length > 0 ? { patch: null, rejected: [{ index: 1, reason: problems.slice(0, 3).join("; ") }] } : { patch, rejected: [] };
}

export function convertHints(hints: readonly string[], count: number, checkMarkdown: ImportLookups["checkMarkdown"]): { hints: string[]; rejected: Rejection[] } {
  const kept: string[] = [];
  const rejected: Rejection[] = [];
  hints.forEach((raw, i) => {
    const index = i + 1;
    const hint = raw.trim();
    if (kept.length >= count) rejected.push({ index, reason: "More hints than requested." });
    else if (hint === "") rejected.push({ index, reason: "The hint is empty." });
    else if (hint.length > 5_000) rejected.push({ index, reason: "The hint is too long." });
    else {
      const problems = checkMarkdown(hint, "block");
      if (problems.length > 0) rejected.push({ index, reason: problems.slice(0, 2).join("; ") });
      else kept.push(hint);
    }
  });
  return { hints: kept, rejected };
}

// ---------------------------------------------------------------------------------------------------------------------
// Study plan templates
// ---------------------------------------------------------------------------------------------------------------------

export const PLAN_ACTIVITY_TYPES = ["LESSON", "PRACTICE", "TEST", "FLASHCARDS", "REVIEW", "MOCK_EXAM"] as const satisfies readonly StudyActivityType[];

export interface StudyPlanDraftItem {
  weekNumber: number;
  dayOfWeek: number | null;
  sortOrder: number;
  activityType: (typeof PLAN_ACTIVITY_TYPES)[number];
  topicId: string | null;
  targetMinutes: number;
  targetQuestions: number | null;
  note: string | null;
}

export interface StudyPlanDraft {
  title: string;
  description: string | null;
  durationWeeks: number;
  weeklyMinutes: number | null;
  items: StudyPlanDraftItem[];
}

/**
 * Validates a generated plan against the template rules (StudyPlanTemplateItem CHECKs): weeks 1..duration, ISO
 * weekdays, allowed activities, topics of the template's version (by prompt ref), positive targets, short notes.
 * Invalid items are dropped with a reason; a plan with no valid items is rejected as a whole.
 */
export function convertStudyPlan(
  raw: AiStudyPlan,
  context: { weeks: number; weeklyMinutes: number | null; topicRefs: ReadonlyMap<string, { id: string }> },
): { plan: StudyPlanDraft | null; rejected: Rejection[] } {
  const rejected: Rejection[] = [];
  const title = text(raw.title)?.slice(0, 200);
  if (!title) return { plan: null, rejected: [{ index: 0, reason: "title: The plan has no title." }] };
  const durationWeeks = Math.min(context.weeks, wholeNumber(raw.durationWeeks, 1, 156) ?? context.weeks);
  const perWeek = new Map<number, number>();
  const items: StudyPlanDraftItem[] = [];
  raw.items.forEach((item, i) => {
    const index = i + 1;
    const week = wholeNumber(item.weekNumber, -1, 1_000) ?? -1;
    const activity = normalizeEnumText(item.activityType ?? "");
    const topic = item.topicRef ? context.topicRefs.get(item.topicRef.trim().toLowerCase()) : undefined;
    const minutes = wholeNumber(item.targetMinutes, 0, 10_000) ?? 0;
    const day = item.dayOfWeek === null ? null : wholeNumber(item.dayOfWeek, 0, 100) ?? null;
    if (week < 1 || week > durationWeeks) rejected.push({ index, reason: `weekNumber: Week ${week} is outside the plan (1–${durationWeeks}).` });
    else if (!(PLAN_ACTIVITY_TYPES as readonly string[]).includes(activity)) rejected.push({ index, reason: `activityType: "${item.activityType}" is not a plan activity.` });
    else if (activity !== "MOCK_EXAM" && !topic) rejected.push({ index, reason: `topicRef: "${item.topicRef ?? ""}" is not one of the listed topics.` });
    else if (day !== null && (day < 1 || day > 7)) rejected.push({ index, reason: "dayOfWeek: Use 1 (Monday) to 7 (Sunday)." });
    else if (minutes < 1 || minutes > 1_440) rejected.push({ index, reason: "targetMinutes: Use 1 to 1,440 minutes." });
    else {
      const sortOrder = perWeek.get(week) ?? 0;
      perWeek.set(week, sortOrder + 1);
      const questions = wholeNumber(item.targetQuestions, 0, 500);
      items.push({
        weekNumber: week,
        dayOfWeek: day,
        sortOrder,
        activityType: activity as StudyPlanDraftItem["activityType"],
        topicId: topic?.id ?? null,
        targetMinutes: minutes,
        targetQuestions: questions && questions > 0 ? questions : null,
        note: text(item.note)?.slice(0, 500) ?? null,
      });
    }
  });
  if (items.length === 0) return { plan: null, rejected: [...rejected, { index: 0, reason: "No valid plan items." }] };
  const weekly = wholeNumber(raw.weeklyMinutes, 1, 10_080) ?? context.weeklyMinutes;
  return {
    plan: { title, description: text(raw.description)?.slice(0, 5_000) ?? null, durationWeeks, weeklyMinutes: weekly ?? null, items: items.sort((a, b) => a.weekNumber - b.weekNumber || a.sortOrder - b.sortOrder) },
    rejected,
  };
}
