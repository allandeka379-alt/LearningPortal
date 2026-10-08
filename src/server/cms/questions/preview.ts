import "server-only";
import { z } from "zod";
import type { Prisma } from "@/generated/prisma/client";
import { feedbackOutcome } from "@/components/questions/response-model";
import type { PresentedFeedback, PresentedQuestion } from "@/components/questions/types";
import { toAnswerReveal, toStudentView, type QuestionRecord, type StudentQuestionView } from "@/lib/questions";
import type { DbClient } from "@/server/db";
import { markQuestion, toAttemptColumns, type MarkingFlag, type MarkingOutcome, type MarkingResult, type PartMarking } from "@/server/marking";
import { loadQuestionAssets, loadRevealAssets, partResultsFrom, presentQuestion, presentReveal } from "@/server/practice/present";
import { AppError } from "@/server/lib/errors";
import { assertCanDraft, parseInput, readClient, uuidSchema, type CmsActor, type CmsContext } from "./context";

/**
 * "Try it" (§9, §42): editors see the question exactly as a student would (the answer-safe `toStudentView` projection,
 * rendered by the same presenter as practice) and mark sample answers with the REAL marking engine, so they can verify
 * the answer key before review. Works for any status (drafts included) and writes nothing: no attempt, no stats.
 */

const OPTION_ORDER = [{ sortOrder: "asc" }, { key: "asc" }] satisfies Prisma.QuestionOptionOrderByWithRelationInput[];
const PART_ORDER = [{ partOrder: "asc" }, { id: "asc" }] satisfies Prisma.QuestionOrderByWithRelationInput[];
const LIVE_PARTS = { status: { not: "ARCHIVED" } } satisfies Prisma.QuestionWhereInput;

const NODE = {
  id: true,
  type: true,
  markingMode: true,
  stem: true,
  payload: true,
  answerSpec: true,
  marks: true,
  partLabel: true,
  partOrder: true,
  explanation: true,
  workedSolution: true,
  hints: true,
  conceptSummary: true,
  relatedLessonId: true,
  calculatorAllowed: true,
  estimatedSeconds: true,
  renderedHtml: true,
  options: { orderBy: OPTION_ORDER, select: { key: true, content: true, isCorrect: true, rationale: true, mediaAssetId: true, sortOrder: true } },
} satisfies Prisma.QuestionSelect;

const RECORD_SELECT = {
  ...NODE,
  parentId: true,
  schoolId: true,
  ownerUserId: true,
  parts: { where: LIVE_PARTS, orderBy: PART_ORDER, select: { ...NODE, parts: { where: LIVE_PARTS, orderBy: PART_ORDER, select: NODE } } },
} satisfies Prisma.QuestionSelect;

type NodeRow = Prisma.QuestionGetPayload<{ select: typeof NODE }> & { parts?: NodeRow[] };

function toRecord(node: NodeRow): QuestionRecord {
  return {
    id: node.id,
    type: node.type,
    markingMode: node.markingMode,
    stem: node.stem,
    payload: node.payload,
    answerSpec: node.answerSpec,
    marks: node.marks,
    partLabel: node.partLabel,
    partOrder: node.partOrder,
    explanation: node.explanation,
    workedSolution: node.workedSolution,
    hints: node.hints,
    conceptSummary: node.conceptSummary,
    relatedLessonId: node.relatedLessonId,
    calculatorAllowed: node.calculatorAllowed,
    estimatedSeconds: node.estimatedSeconds,
    renderedHtml: node.renderedHtml,
    options: node.options,
    parts: (node.parts ?? []).map(toRecord),
  };
}

/** Platform root questions by id (any status), as marking/rendering records; unknown or private ids are omitted. */
export async function loadQuestionRecords(client: DbClient, ids: readonly string[]): Promise<Map<string, QuestionRecord>> {
  if (ids.length === 0) return new Map();
  const rows = await client.question.findMany({ where: { id: { in: [...new Set(ids)] }, parentId: null, schoolId: null, ownerUserId: null }, select: RECORD_SELECT });
  return new Map(rows.map((row) => [row.id, toRecord(row)]));
}

/** Student views of several records with one asset query; null for a record whose definition cannot be shown. */
export async function presentRecords(records: readonly QuestionRecord[], seed: string): Promise<Map<string, PresentedQuestion | null>> {
  const views = new Map<string, StudentQuestionView | null>();
  for (const record of records) {
    try {
      views.set(record.id, toStudentView(record, { shuffleSeed: `${seed}:${record.id}` }));
    } catch {
      views.set(record.id, null);
    }
  }
  const resolveAsset = await loadQuestionAssets([...views.values()].filter((v): v is StudentQuestionView => v !== null));
  return new Map([...views].map(([id, view]) => [id, view ? presentQuestion(view, resolveAsset) : null]));
}

async function loadRecord(actor: CmsActor, id: string, context: CmsContext): Promise<QuestionRecord> {
  assertCanDraft(actor);
  const row = await readClient(context).question.findUnique({ where: { id }, select: RECORD_SELECT });
  if (!row || row.parentId !== null || row.schoolId !== null || row.ownerUserId !== null) throw AppError.notFound("Question not found.");
  return toRecord(row);
}

export interface QuestionPreview {
  /** The student view, or null when the question cannot be shown yet. */
  question: PresentedQuestion | null;
  /** Why the preview is unavailable (an incomplete definition), in editor-facing words. */
  problem: string | null;
}

/** The question as a student would see it (shuffles seeded per question, like a fresh attempt). */
export async function getQuestionPreview(actor: CmsActor, id: string, context: CmsContext = {}): Promise<QuestionPreview> {
  const record = await loadRecord(actor, id, context);
  try {
    const view = toStudentView(record, { shuffleSeed: `preview:${id}` });
    const resolveAsset = await loadQuestionAssets([view]);
    return { question: presentQuestion(view, resolveAsset), problem: null };
  } catch {
    return { question: null, problem: "The preview needs a complete question: fix the problems listed under “Before review” and save." };
  }
}

/** One row of the engine's per-item or per-point detail, for the editor's marking table. */
export interface MarkingDetailRow {
  /** Blank / pair / label / option / mark-scheme point id, with the part label for structured questions. */
  id: string;
  correct: boolean | null;
  awarded: number | null;
  maxMarks: number | null;
  expected: string | null;
  given: string | null;
}

/** What the marking engine decided, beyond the student-facing feedback (flags explain partial and pending marks). */
export interface MarkingDetail {
  outcome: MarkingOutcome;
  marksAwarded: number;
  maxMarks: number;
  /** Marks still to be decided by AI or a person. */
  pendingMarks: number;
  isCorrect: boolean | null;
  correctAnswer: string | null;
  flags: MarkingFlag[];
  notes: string[];
  rows: MarkingDetailRow[];
  parts: { label: string; type: string; outcome: MarkingOutcome; awarded: number; max: number; pending: number }[];
}

export interface TryQuestionResult {
  feedback: PresentedFeedback;
  detail: MarkingDetail;
}

function detailRows(result: MarkingResult, prefix: string): MarkingDetailRow[] {
  const rows: MarkingDetailRow[] = (result.feedback.items ?? []).map((item) => ({
    id: `${prefix}${item.id}`,
    correct: item.correct,
    awarded: item.awarded,
    maxMarks: item.maxMarks,
    expected: item.expected,
    given: item.given,
  }));
  for (const point of result.feedback.matchedPoints ?? []) {
    rows.push({ id: `${prefix}${point.pointId}`, correct: null, awarded: point.awarded, maxMarks: point.maxMarks, expected: point.description, given: point.evidence });
  }
  return rows;
}

function flattenParts(perPart: readonly PartMarking[] | undefined, prefix: string, out: MarkingDetail["parts"], rows: MarkingDetailRow[], flags: Set<MarkingFlag>): void {
  for (const part of perPart ?? []) {
    const label = `${prefix}${part.partLabel ?? "Part"}`;
    out.push({ label, type: part.type, outcome: part.result.status, awarded: part.result.marksAwarded, max: part.result.maxMarks, pending: part.result.pendingMarks });
    rows.push(...detailRows(part.result, `${label} `));
    for (const flag of part.result.feedback.flags) flags.add(flag);
    flattenParts(part.result.feedback.perPart, label, out, rows, flags);
  }
}

const trySchema = z.object({
  questionId: uuidSchema,
  response: z.unknown().refine((value) => value === null || value === undefined || JSON.stringify(value).length <= 100_000, "This answer is too long."),
});

/**
 * Marks a sample response with the marking engine (pure; nothing is stored). AI-assisted and manual parts come back
 * as pending / provisional exactly as for a student, with the deterministic part of the mark already decided.
 */
export async function tryQuestion(actor: CmsActor, raw: unknown, context: CmsContext = {}): Promise<TryQuestionResult> {
  const input = parseInput(trySchema, raw);
  const record = await loadRecord(actor, input.questionId, context);
  const response = input.response ?? null;
  let result: MarkingResult;
  try {
    result = markQuestion(record, response);
  } catch {
    throw AppError.validation({ marks: ["The marks of this question or one of its parts are not valid."] }, "This question cannot be marked yet.");
  }
  const columns = toAttemptColumns(result, response);
  const reveal = toAnswerReveal(record);
  const resolveAsset = await loadRevealAssets([reveal]);
  const flags = new Set<MarkingFlag>(result.feedback.flags);
  const parts: MarkingDetail["parts"] = [];
  const rows = detailRows(result, "");
  flattenParts(result.feedback.perPart, "", parts, rows, flags);

  const feedback: PresentedFeedback = {
    position: 1,
    status: columns.markingStatus,
    outcome: feedbackOutcome({ status: columns.markingStatus, marksAwarded: columns.marksAwarded, marksAvailable: result.maxMarks, isCorrect: columns.isCorrect }),
    marksAwarded: columns.marksAwarded,
    marksAvailable: result.maxMarks,
    notes: [...result.feedback.notes],
    reveal: presentReveal(reveal, partResultsFrom(columns.feedback), resolveAsset),
    markerComment: null,
    topic: null,
    studyLesson: null,
    mastery: null,
    selfAssessment: null,
    attemptCompleted: false,
    nextPosition: null,
  };
  return {
    feedback,
    detail: {
      outcome: result.status,
      marksAwarded: result.marksAwarded,
      maxMarks: result.maxMarks,
      pendingMarks: result.pendingMarks,
      isCorrect: result.isCorrect,
      correctAnswer: result.feedback.correctAnswerDisplay,
      flags: [...flags],
      notes: [...result.feedback.notes],
      rows,
      parts,
    },
  };
}
