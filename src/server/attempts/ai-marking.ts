import "server-only";
import { z } from "zod";
import type { AttemptMode, AttemptStatus, Prisma } from "@/generated/prisma/client";
import type { AiModelTier } from "@/lib/billing/entitlements";
import {
  MarkingMode,
  partEntryToResponse,
  QuestionType,
  safeParseAnswerSpec,
  structuredResponseSchema,
  type MarkScheme,
  type QuestionOptionRecord,
  type QuestionRecord,
  type StructuredPartEntry,
} from "@/lib/questions";
import { getAiGateway, type AiGateway } from "@/server/ai";
import {
  MARKING_ESSAY_ROUTE,
  MARKING_ROUTE,
  MAX_MARKING_RESPONSE_CHARS,
  markPendingAiResponses,
  markPendingAiResponsesPayloadSchema,
  toMarkingPointsJson,
  type AiMarkingOutcome,
  type MarkPendingAiResponsesDeps,
  type MarkPendingAiResponsesPayload,
  type MarkPendingAiResponsesSummary,
  type MarkSchemePoint,
  type PendingAiMarkingItem,
} from "@/server/ai/marking";
import { getEntitlements } from "@/server/billing/entitlements";
import { db } from "@/server/db";
import { aiProcessingRefusedFor } from "@/server/family/consent-gate";
import { isAppError } from "@/server/lib/errors";
import { registerJobHandler, type JobContext } from "@/server/lib/jobs";
import { logger as rootLogger, type Logger } from "@/server/lib/logger";
import { markQuestion, type MarkingResult, type PartMarking } from "@/server/marking";
import { createNotification } from "@/server/notifications/service";
import { scaleAwarded } from "./analysis";
import { AI_MARK_JOB } from "./effects";
import { attemptResultsHref, selfAssessableWithoutAi } from "./policy";
import { recordMarkingDecision } from "./remark";

/**
 * AI-assisted marking of open answers, attempt side (§9 "manually / AI-assisted marked", §40; ARCHITECTURE §6.5).
 *
 * The AI module owns the model call and the safety rules of a mark (`src/server/ai/marking.ts`: our own mark-scheme
 * points, totals recomputed in code, low confidence / invalid output / refusal -> NEEDS_REVIEW). This module
 * implements its persistence deps for the `ai.mark` job and registers the handler:
 *
 * - `loadItems`   PENDING answers (queued by the attempt engine) -> the revision the student SAW (ContentRevision
 *                 snapshot at `QuestionAttempt.questionRevision`), re-marked deterministically to split what is already
 *                 decided from what the AI must decide ({@link planAiMarking}, pure):
 *                   ESSAY / EXTENDED_RESPONSE  all mark-scheme points;
 *                   SHORT_ANSWER               mark scheme, else keyword rubric, else the accepted answers; the rule-based
 *                                              award stays a lower bound (final = max(rule, AI));
 *                   CALCULATION                the method (M) marks only; the final-answer (A) marks earned by rule are
 *                                              added (final = A + M);
 *                   STRUCTURED                 every leaf part waiting for AI in one call (point ids prefixed per part),
 *                                              plus the marks of auto-marked parts; a part that needs a human anyway
 *                                              keeps the whole answer in review.
 *                 Answers that cannot be planned (no snapshot, response too long, nothing for the AI to decide) are
 *                 moved to NEEDS_REVIEW with their provisional rule-based mark instead of waiting forever.
 * - `saveOutcome` `recordMarkingDecision` (source AI, model, prompt version, confidence, per-point awards, feedback): ONE
 *                 transaction that updates PENDING -> AI_MARKED | NEEDS_REVIEW, appends QuestionAttemptMarking, applies
 *                 the per-answer side effects (mastery, QuestionStats) and re-scores a closed attempt (totals, grade
 *                 estimate, analysis, AWAITING_MARKING -> MARKED, "results ready" notification). Idempotent: a decision is
 *                 only recorded while the answer is still PENDING.
 * - `requireSelfAssessment`  (no ANTHROPIC_API_KEY) essays, extended and short written answers in the student's own,
 *                 non-assignment work stay PENDING: the results / practice pages already offer the self-assessment form
 *                 with the mark scheme (`recordSelfAssessment`); the student gets one "mark your own answers"
 *                 notification per closed attempt. Every other answer (calculations, structured questions, assignment
 *                 work) goes to NEEDS_REVIEW so a teacher or reviewer marks it and the attempt can close.
 *
 * - `consentRefusedUserIds` / `markWithoutAi`  (MIN-01) a minor whose guardian consent refuses AI processing
 *                 (`aiProcessingRefusedFor`, src/server/family/consent-gate.ts: REFUSED / WITHDRAWN, PENDING while
 *                 `privacy.minorAiConsentRequired` is on) never has an answer sent to the model: the same no-AI routing as
 *                 `requireSelfAssessment` (self-assessment for their own written work, otherwise human review), with a
 *                 consent-specific reason and notification.
 *
 * Model tier: marking is system work but still capped by the student's plan (`aiMaxModelTier`), with a STANDARD floor
 * so the quality of a mark never depends on a FAST-only plan. Essays route to `markingEssay` (DEEP when the plan allows
 * it), everything else to `marking` (STANDARD). Spend is bounded per student: each answer reserves marking units
 * (`markingQuotaCost`) against Setting `ai.limits.markingUnitsPerUserPerDay`; once a student's units for the day are
 * used up, further answers go to human review with their provisional mark (no model call), so one account cannot
 * exhaust the platform's daily AI budget (AI-04).
 *
 * Wire it in src/worker/handlers.ts `registerAllJobs()` with one line: `registerAiMarkingJobs();`.
 */

// =====================================================================================================================
// Pure planning
// =====================================================================================================================

/** How a unit's AI marks combine with the marks already earned by rule. */
export type MarkCombineRule = "ADD" | "MAX";

/** One part of an answer the AI marks (a whole question, or one leaf part of a STRUCTURED question). */
export interface AiMarkingUnit {
  /** "(a)", "(b)(i)" for STRUCTURED parts; null for a single question. */
  label: string | null;
  type: QuestionType;
  /** Authored markdown of the (part) stem. */
  stem: string;
  /** Points as sent to the model (ids prefixed "<n>." for STRUCTURED parts). */
  points: MarkSchemePoint[];
  /** Marks already earned by rule in this unit (question scale). */
  base: number;
  /** The unit's marks. */
  max: number;
  /** Most the AI can award in this unit. */
  aiMax: number;
  combine: MarkCombineRule;
  /** The student's answer to this unit as plain text. */
  response: string;
}

export interface AiMarkingPlan {
  /** Question.marks of the revision (the slot may allocate a different number: scaled with `scaleAwarded`). */
  questionMarks: number;
  /** Marks earned by rule outside the AI units (auto-marked parts), question scale. */
  fixedMarks: number;
  /** STRUCTURED parts whose marks do not add up to the root's marks are scaled (MARKS_MISMATCH); 1 otherwise. */
  scale: number;
  units: AiMarkingUnit[];
  /** Some part needs a human anyway (MANUAL part): the AI mark is recorded as provisional NEEDS_REVIEW. */
  forceReview: boolean;
  route: typeof MARKING_ROUTE | typeof MARKING_ESSAY_ROUTE;
  /** Prompt material for `aiMarkResponse`. */
  questionStem: string;
  response: string;
  points: MarkSchemePoint[];
  /** Sum of the units' AI maxima (the model's `maxMarks`). */
  maxMarks: number;
  /** The rule-based provisional mark (question scale): what a human starts from when the AI cannot decide. */
  provisionalMarks: number;
}

export type AiMarkingPlanFailure = "NOT_PENDING" | "NOT_MARKABLE" | "TOO_LONG";

export type AiMarkingPlanResult =
  | { ok: true; plan: AiMarkingPlan }
  | { ok: false; reason: AiMarkingPlanFailure; provisionalMarks: number };

const OPEN_TYPES: ReadonlySet<QuestionType> = new Set(["ESSAY", "EXTENDED_RESPONSE"]);
const MAX_POINT_TEXT_CHARS = 1_200;
const MAX_POINTS = 50;

function clip(text: string, max: number): string {
  const clean = text.replace(/\s+/g, " ").trim();
  return clean.length <= max ? clean : `${clean.slice(0, max - 1).trimEnd()}…`;
}

function schemePoints(scheme: MarkScheme): MarkSchemePoint[] {
  return scheme.points.map((point) => {
    const indicators = (point.indicators ?? []).map((item) => item.trim()).filter(Boolean);
    const text = indicators.length > 0 ? `${point.description} (look for: ${indicators.join("; ")})` : point.description;
    return { id: point.id, text: clip(text, MAX_POINT_TEXT_CHARS), marks: point.marks };
  });
}

/** The student's answer to one unit as plain text ("" when nothing usable was given). */
export function responseText(type: QuestionType, response: unknown): string {
  if (typeof response !== "object" || response === null) return "";
  const value = response as { text?: unknown; value?: unknown; unit?: unknown; working?: unknown };
  const str = (raw: unknown): string => (typeof raw === "string" ? raw.trim() : "");
  switch (type) {
    case "SHORT_ANSWER":
    case "ESSAY":
    case "EXTENDED_RESPONSE":
      return str(value.text);
    case "CALCULATION": {
      const answer = [str(value.value), str(value.unit)].filter(Boolean).join(" ");
      const working = str(value.working);
      return [answer ? `Final answer: ${answer}` : "Final answer: (none given)", working ? `Working:\n${working}` : ""].filter(Boolean).join("\n");
    }
    default:
      return "";
  }
}

/** The AI-markable unit of one (part) question, or null when the AI has nothing to decide for it. */
function unitFor(question: QuestionRecord, result: MarkingResult, response: unknown, label: string | null): AiMarkingUnit | null {
  const text = responseText(question.type, response);
  if (text.length === 0) return null;
  const common = { label, type: question.type, stem: question.stem, max: question.marks, response: text };
  switch (question.type) {
    case "ESSAY":
    case "EXTENDED_RESPONSE": {
      const spec = safeParseAnswerSpec(question.type, question.answerSpec);
      if (!spec.success) return null;
      return { ...common, points: schemePoints(spec.data.markScheme), base: 0, aiMax: question.marks, combine: "MAX" };
    }
    case "SHORT_ANSWER": {
      const spec = safeParseAnswerSpec("SHORT_ANSWER", question.answerSpec);
      if (!spec.success) return null;
      let points: MarkSchemePoint[];
      if (spec.data.markScheme) {
        points = schemePoints(spec.data.markScheme);
      } else if (spec.data.rubric) {
        points = spec.data.rubric.map((point) => ({
          id: point.id,
          text: clip(point.description?.trim() || `Mentions any of: ${point.anyOf.join("; ")}`, MAX_POINT_TEXT_CHARS),
          marks: point.marks,
        }));
      } else if (spec.data.accepted.length > 0) {
        const accepted = spec.data.accepted.map((answer) => answer.value).join("; ");
        points = [{ id: "answer", text: clip(`A correct answer, equivalent in meaning to: ${accepted}`, MAX_POINT_TEXT_CHARS), marks: question.marks }];
      } else {
        return null;
      }
      return { ...common, points, base: result.marksAwarded, aiMax: question.marks, combine: "MAX" };
    }
    case "CALCULATION": {
      const spec = safeParseAnswerSpec("CALCULATION", question.answerSpec);
      const methodMarks = spec.success ? (spec.data.methodMarks ?? []) : [];
      if (methodMarks.length === 0 || result.pendingMarks <= 0) return null;
      return {
        ...common,
        points: methodMarks.map((mark) => ({ id: mark.id, text: clip(mark.description, MAX_POINT_TEXT_CHARS), marks: mark.marks })),
        base: result.marksAwarded,
        aiMax: result.pendingMarks,
        combine: "ADD",
      };
    }
    default:
      return null;
  }
}

interface Collected {
  units: AiMarkingUnit[];
  fixed: number;
  forceReview: boolean;
}

/** Walks the per-part results of a STRUCTURED answer: AI-pending leaves become units, everything else is fixed. */
function collectParts(
  parts: readonly QuestionRecord[],
  perPart: readonly PartMarking[],
  entries: ReadonlyMap<string, StructuredPartEntry>,
  parentLabel: string,
  into: Collected,
): void {
  const byId = new Map(parts.map((part) => [part.id, part]));
  for (const marking of perPart) {
    const part = byId.get(marking.partId);
    const status = marking.result.status;
    const label = `${parentLabel}${marking.partLabel ?? part?.partLabel ?? ""}`;
    if (status !== "PENDING_AI" || !part) {
      into.fixed += marking.result.marksAwarded;
      if (status === "NEEDS_REVIEW" || status === "PENDING_AI") into.forceReview = true;
      continue;
    }
    if (part.type === "STRUCTURED") {
      collectParts(part.parts ?? [], marking.result.feedback.perPart ?? [], entries, label, into);
      continue;
    }
    const entry = entries.get(part.id);
    const unit = unitFor(part, marking.result, entry ? partEntryToResponse(entry, part.type) : null, label || null);
    if (unit) {
      into.units.push(unit);
    } else {
      into.fixed += marking.result.marksAwarded;
      into.forceReview = true;
    }
  }
}

/**
 * Splits a PENDING answer into what the rules already decided and what the AI must decide (module header). Pure: the
 * question is the revision the student saw, the response is the stored response.
 */
export function planAiMarking(question: QuestionRecord, response: unknown): AiMarkingPlanResult {
  const result = markQuestion(question, response);
  if (result.status !== "PENDING_AI") return { ok: false, reason: "NOT_PENDING", provisionalMarks: result.marksAwarded };
  const provisionalMarks = result.marksAwarded;

  const collected: Collected = { units: [], fixed: 0, forceReview: false };
  let scale = 1;
  if (question.type === "STRUCTURED") {
    const parsed = structuredResponseSchema.safeParse(response);
    const entries = new Map<string, StructuredPartEntry>();
    for (const entry of parsed.success ? parsed.data.parts : []) if (!entries.has(entry.partId)) entries.set(entry.partId, entry);
    collectParts(question.parts ?? [], result.feedback.perPart ?? [], entries, "", collected);
    const partsMax = (question.parts ?? []).reduce((sum, part) => sum + part.marks, 0);
    if (partsMax > 0 && partsMax !== question.marks) scale = question.marks / partsMax;
  } else {
    const unit = unitFor(question, result, response, null);
    if (unit) collected.units.push(unit);
  }
  if (collected.units.length === 0) return { ok: false, reason: "NOT_MARKABLE", provisionalMarks };

  const structured = question.type === "STRUCTURED";
  const points: MarkSchemePoint[] = collected.units.flatMap((unit, index) =>
    unit.points.map((point) => ({
      id: structured ? `${index + 1}.${point.id}` : point.id,
      text: structured ? `Part ${unit.label ?? index + 1}: ${point.text}` : point.text,
      marks: point.marks,
    })),
  );
  if (points.length === 0 || points.length > MAX_POINTS) return { ok: false, reason: "NOT_MARKABLE", provisionalMarks };
  const units = structured
    ? collected.units.map((unit, index) => ({ ...unit, points: unit.points.map((point) => ({ ...point, id: `${index + 1}.${point.id}` })) }))
    : collected.units;

  const answer = structured
    ? units.map((unit, index) => `Part ${unit.label ?? index + 1}:\n${unit.response}`).join("\n\n")
    : (units[0]?.response ?? "");
  if (answer.length > MAX_MARKING_RESPONSE_CHARS) return { ok: false, reason: "TOO_LONG", provisionalMarks };
  const questionStem = structured
    ? [question.stem, ...units.map((unit, index) => `Part ${unit.label ?? index + 1}: ${unit.stem}`)].join("\n\n")
    : question.stem;

  return {
    ok: true,
    plan: {
      questionMarks: question.marks,
      fixedMarks: collected.fixed,
      scale,
      units,
      forceReview: collected.forceReview,
      route: units.some((unit) => OPEN_TYPES.has(unit.type)) ? MARKING_ESSAY_ROUTE : MARKING_ROUTE,
      questionStem,
      response: answer,
      points,
      maxMarks: Math.min(32_767, units.reduce((sum, unit) => sum + unit.aiMax, 0)),
      provisionalMarks,
    },
  };
}

/**
 * The question-scale mark from the AI's per-point awards: per unit, AI marks are capped at the unit's AI maximum, then
 * combined with the rule-based marks (ADD for method marks, MAX for a rule-based lower bound), plus the fixed marks of
 * auto-marked parts, scaled for a structured marks mismatch and clamped to the question's marks. Pure.
 */
export function combineAiMarks(plan: AiMarkingPlan, awards: readonly { pointId: string; marks: number }[]): number {
  const byPoint = new Map<string, number>();
  for (const award of awards) {
    if (!byPoint.has(award.pointId) && Number.isFinite(award.marks)) byPoint.set(award.pointId, Math.max(0, Math.floor(award.marks)));
  }
  let total = plan.fixedMarks;
  for (const unit of plan.units) {
    const ai = Math.min(
      unit.aiMax,
      unit.points.reduce((sum, point) => sum + Math.min(point.marks, byPoint.get(point.id) ?? 0), 0),
    );
    total += unit.combine === "ADD" ? Math.min(unit.max, unit.base + ai) : Math.min(unit.max, Math.max(unit.base, ai));
  }
  return Math.min(plan.questionMarks, Math.max(0, Math.floor(total * plan.scale + 1e-9)));
}

/** Tier for a marking call: the plan's tier with a STANDARD floor (module header). */
export function markingTierFor(planTier: AiModelTier): AiModelTier {
  return planTier === "FAST" ? "STANDARD" : planTier;
}

/** Whether an answer of this type, in this work, is marked by the student when AI marking is unavailable (./policy.ts). */
export { selfAssessableWithoutAi };

// =====================================================================================================================
// Revision snapshots -> QuestionRecord
// =====================================================================================================================

const snapshotOptionSchema = z.looseObject({
  key: z.string(),
  content: z.string().nullable().optional(),
  isCorrect: z.boolean(),
  sortOrder: z.number().optional(),
});

interface SnapshotPart {
  id: string;
  type: QuestionType;
  markingMode: MarkingMode;
  stem: string;
  payload?: unknown;
  answerSpec?: unknown;
  marks: number;
  partLabel?: string | null | undefined;
  partOrder?: number | undefined;
  options: z.output<typeof snapshotOptionSchema>[];
  parts: SnapshotPart[];
}

const questionColumns = {
  id: z.string(),
  type: z.enum(QuestionType),
  markingMode: z.enum(MarkingMode),
  stem: z.string(),
  payload: z.unknown().optional(),
  answerSpec: z.unknown().optional(),
  marks: z.number().int().min(1),
  partLabel: z.string().nullable().optional(),
  partOrder: z.number().int().optional(),
};

const snapshotPartSchema: z.ZodType<SnapshotPart> = z.lazy(() =>
  z.looseObject({
    ...questionColumns,
    options: z.array(snapshotOptionSchema).default([]),
    parts: z.array(snapshotPartSchema).default([]),
  }),
) as z.ZodType<SnapshotPart>;

/** ContentRevision.snapshot (entityType QUESTION, schemaVersion 1); see src/server/questions/snapshot.ts. */
export const questionSnapshotSchema = z.looseObject({
  question: z.looseObject(questionColumns),
  options: z.array(snapshotOptionSchema).default([]),
  parts: z.array(snapshotPartSchema).default([]),
});

function toOptions(options: readonly z.output<typeof snapshotOptionSchema>[]): QuestionOptionRecord[] {
  return options.map((option) => ({
    key: option.key,
    content: option.content ?? "",
    isCorrect: option.isCorrect,
    ...(option.sortOrder !== undefined ? { sortOrder: option.sortOrder } : {}),
  }));
}

function toRecord(part: SnapshotPart): QuestionRecord {
  return {
    id: part.id,
    type: part.type,
    markingMode: part.markingMode,
    stem: part.stem,
    payload: part.payload ?? null,
    answerSpec: part.answerSpec ?? null,
    marks: part.marks,
    partLabel: part.partLabel ?? null,
    ...(part.partOrder !== undefined ? { partOrder: part.partOrder } : {}),
    options: toOptions(part.options),
    parts: [...part.parts].sort((a, b) => (a.partOrder ?? 0) - (b.partOrder ?? 0)).map(toRecord),
  };
}

/** The question exactly as published at a revision (what the student saw), or null for an unreadable snapshot. */
export function questionFromSnapshot(snapshot: unknown): QuestionRecord | null {
  const parsed = questionSnapshotSchema.safeParse(snapshot);
  if (!parsed.success) return null;
  const { question, options, parts } = parsed.data;
  return toRecord({ ...question, options, parts } as SnapshotPart);
}

// =====================================================================================================================
// Persistence deps for the ai.mark job
// =====================================================================================================================

const SLOT_SELECT = {
  attemptId: true,
  position: true,
  questionId: true,
  questionRevision: true,
  response: true,
  marksAvailable: true,
  question: { select: { type: true } },
  attempt: {
    select: {
      userId: true,
      mode: true,
      status: true,
      assignmentId: true,
      user: { select: { profile: { select: { timezone: true } } } },
      subject: { select: { name: true, qualification: { select: { shortName: true, examBoard: { select: { shortName: true } } } } } },
    },
  },
} as const satisfies Prisma.QuestionAttemptSelect;

type SlotRow = Prisma.QuestionAttemptGetPayload<{ select: typeof SLOT_SELECT }>;

/** What this module keeps about a loaded item between `loadItems` and `saveOutcome` / `requireSelfAssessment`. */
interface ItemMeta {
  plan: AiMarkingPlan;
  marksAvailable: number;
  questionType: QuestionType;
  userId: string;
  attemptMode: AttemptMode;
  attemptStatus: AttemptStatus;
  isAssignment: boolean;
}

const itemMeta = new WeakMap<PendingAiMarkingItem, ItemMeta>();

export interface AttemptAiMarkingOptions {
  /** Defaults to the production gateway (resolved per job, so a newly configured key is picked up). */
  gateway?: AiGateway | (() => AiGateway);
  now?: () => Date;
  logger?: Logger;
}

type SlotKey = MarkPendingAiResponsesPayload["items"][number];

const REVIEW_REASON = "A teacher or reviewer will mark this answer.";
const NO_AI_REVIEW_REASON = "Automatic marking isn't available, so a teacher or reviewer will mark this answer.";
const OVER_ALLOWANCE_REVIEW_REASON = "Today's automatic marking limit has been reached, so a teacher or reviewer will mark this answer.";
const CONSENT_REVIEW_REASON = "Automatic marking needs a parent or guardian's consent for this student, so a teacher or reviewer will mark this answer.";

/** Why answers are marked without AI, and what the student is told when they mark their own. */
const WITHOUT_AI = {
  NOT_CONFIGURED: {
    reviewReason: NO_AI_REVIEW_REASON,
    why: "AI not configured",
    body: "Automatic marking isn't available right now. Open your results to mark your written answers against the mark scheme.",
  },
  GUARDIAN_CONSENT: {
    reviewReason: CONSENT_REVIEW_REASON,
    why: "guardian consent refuses AI processing",
    body: "Your written answers are not marked automatically until a parent or guardian gives consent. Open your results to mark them against the mark scheme.",
  },
} as const;

function keyOf(key: SlotKey): string {
  return `${key.attemptId}:${key.position}`;
}

function levelOf(row: SlotRow): string {
  const qualification = row.attempt.subject.qualification;
  return `${qualification.examBoard.shortName} ${qualification.shortName}`.trim();
}

interface PlannedSlot {
  row: SlotRow;
  planned: AiMarkingPlanResult;
}

/** PENDING, processed answers for `keys` with their plans (no writes). */
async function loadPlannedSlots(keys: readonly SlotKey[]): Promise<PlannedSlot[]> {
  const unique = [...new Map(keys.map((key) => [keyOf(key), key])).values()];
  if (unique.length === 0) return [];
  const rows = await db.questionAttempt.findMany({
    where: {
      OR: unique.map((key) => ({ attemptId: key.attemptId, position: key.position })),
      markingStatus: "PENDING",
      markedAt: { not: null },
    },
    select: SLOT_SELECT,
  });
  if (rows.length === 0) return [];
  const revisionKeys = [...new Map(rows.map((row) => [`${row.questionId}:${row.questionRevision}`, row])).values()];
  const revisions = await db.contentRevision.findMany({
    where: { entityType: "QUESTION", OR: revisionKeys.map((row) => ({ entityId: row.questionId, revision: row.questionRevision })) },
    select: { entityId: true, revision: true, snapshot: true },
  });
  const snapshots = new Map(revisions.map((revision) => [`${revision.entityId}:${revision.revision}`, revision.snapshot]));
  return rows.map((row) => {
    const question = questionFromSnapshot(snapshots.get(`${row.questionId}:${row.questionRevision}`));
    const planned: AiMarkingPlanResult = question
      ? planAiMarking(question, row.response)
      : { ok: false, reason: "NOT_MARKABLE", provisionalMarks: 0 };
    return { row, planned };
  });
}

function slotMarks(questionMarks: number | null, marks: number, marksAvailable: number): number {
  if (questionMarks === null) return Math.min(marksAvailable, Math.max(0, marks));
  return scaleAwarded(marks, questionMarks, marksAvailable);
}

function expectedRace(error: unknown): boolean {
  // Marked meanwhile (self-assessment, a teacher, another run) or the attempt vanished: nothing left to do.
  return isAppError(error) && (error.code === "CONFLICT" || error.code === "NOT_FOUND" || error.code === "BAD_REQUEST");
}

/** Moves a PENDING answer to the human review queue with its provisional rule-based mark (system decision). */
async function sendToReview(
  key: SlotKey,
  marksAwarded: number,
  reason: string,
  options: { now: Date; log: Logger; why: string },
): Promise<boolean> {
  try {
    await recordMarkingDecision(
      { attemptId: key.attemptId, position: key.position, source: "AUTO", resultingStatus: "NEEDS_REVIEW", marksAwarded, reason },
      { now: options.now, expectStatus: "PENDING" },
    );
    options.log.info("Answer sent for human review", { attemptId: key.attemptId, position: key.position, why: options.why });
    return true;
  } catch (error) {
    if (expectedRace(error)) return false;
    throw error;
  }
}

function questionMarksOf(planned: AiMarkingPlanResult): number | null {
  return planned.ok ? planned.plan.questionMarks : null;
}

async function maxTiersFor(userIds: readonly string[]): Promise<Map<string, AiModelTier>> {
  const entries = await Promise.all(
    [...new Set(userIds)].map(async (userId) => [userId, markingTierFor((await getEntitlements(userId)).entitlements.aiMaxModelTier)] as const),
  );
  return new Map(entries);
}

/** The `ai.mark` deps for `markPendingAiResponses` (src/server/ai/marking.ts). Exported for tests and other runners. */
export function createAttemptAiMarkingDeps(options: AttemptAiMarkingOptions = {}): MarkPendingAiResponsesDeps {
  const clock = options.now ?? (() => new Date());
  const log = (options.logger ?? rootLogger).child({ module: "attempts.ai-marking" });
  const gateway = typeof options.gateway === "function" ? options.gateway() : (options.gateway ?? getAiGateway());

  async function toItems(slots: readonly PlannedSlot[]): Promise<PendingAiMarkingItem[]> {
    const plannable = slots.filter((slot): slot is PlannedSlot & { planned: { ok: true; plan: AiMarkingPlan } } => slot.planned.ok);
    const tiers = await maxTiersFor(plannable.map((slot) => slot.row.attempt.userId));
    return plannable.map(({ row, planned }) => {
      const { plan } = planned;
      const item: PendingAiMarkingItem = {
        attemptId: row.attemptId,
        position: row.position,
        userId: row.attempt.userId,
        questionStem: plan.questionStem,
        markSchemePoints: plan.points,
        maxMarks: plan.maxMarks,
        response: plan.response,
        subject: row.attempt.subject.name,
        level: levelOf(row),
        route: plan.route,
        maxTier: tiers.get(row.attempt.userId) ?? "STANDARD",
        timeZone: row.attempt.user.profile?.timezone ?? undefined,
      };
      itemMeta.set(item, {
        plan,
        marksAvailable: row.marksAvailable,
        questionType: row.question.type,
        userId: row.attempt.userId,
        attemptMode: row.attempt.mode,
        attemptStatus: row.attempt.status,
        isAssignment: row.attempt.assignmentId !== null,
      });
      return item;
    });
  }

  async function metaOf(item: PendingAiMarkingItem): Promise<ItemMeta | null> {
    const known = itemMeta.get(item);
    if (known) return known;
    // An item not built by `loadItems` (another runner): plan it again from the database.
    const [reloaded] = await toItems(await loadPlannedSlots([{ attemptId: item.attemptId, position: item.position }]));
    return reloaded ? (itemMeta.get(reloaded) ?? null) : null;
  }

  /**
   * Answers the AI must not (or cannot) mark: the student's own written work stays PENDING for self-assessment (one
   * notification per closed attempt), everything else goes to human review with its provisional mark.
   */
  async function routeWithoutAi(items: readonly PendingAiMarkingItem[], cause: keyof typeof WITHOUT_AI): Promise<void> {
    const copy = WITHOUT_AI[cause];
    const now = clock();
    const notify = new Map<string, { userId: string; mode: AttemptMode }>();
    for (const item of items) {
      const meta = await metaOf(item);
      if (!meta) continue;
      if (selfAssessableWithoutAi(meta.questionType, meta.isAssignment)) {
        // Stays PENDING: the results / practice pages offer the self-assessment form with the mark scheme.
        if (meta.attemptStatus !== "IN_PROGRESS") notify.set(item.attemptId, { userId: meta.userId, mode: meta.attemptMode });
        continue;
      }
      await sendToReview(
        { attemptId: item.attemptId, position: item.position },
        slotMarks(meta.plan.questionMarks, meta.plan.provisionalMarks, meta.marksAvailable),
        copy.reviewReason,
        { now, log, why: copy.why },
      );
    }
    for (const [attemptId, { userId, mode }] of notify) {
      await createNotification(userId, {
        type: "exam.self_assess",
        category: "LEARNING",
        title: "Mark your written answers",
        body: copy.body,
        data: { href: attemptResultsHref(mode, attemptId), entityType: "AssessmentAttempt", entityId: attemptId },
        dedupeKey: `self-assess:${attemptId}`,
      });
    }
  }

  return {
    gateway,

    async loadItems(keys) {
      const slots = await loadPlannedSlots(keys);
      const now = clock();
      for (const { row, planned } of slots) {
        if (planned.ok) continue;
        // Nothing the AI can decide (or no readable revision): a human marks it rather than it waiting forever.
        await sendToReview(
          { attemptId: row.attemptId, position: row.position },
          slotMarks(null, planned.provisionalMarks, row.marksAvailable),
          REVIEW_REASON,
          { now, log, why: `not plannable: ${planned.reason}` },
        );
      }
      return toItems(slots);
    },

    async saveOutcome(item: PendingAiMarkingItem, outcome: AiMarkingOutcome) {
      const meta = await metaOf(item);
      if (!meta) return; // no longer PENDING
      const { plan } = meta;
      const questionScale = combineAiMarks(
        plan,
        outcome.awards.map((award) => ({ pointId: award.pointId, marks: award.marks })),
      );
      const status = plan.forceReview ? "NEEDS_REVIEW" : outcome.status;
      const comment = outcome.feedback.trim();
      try {
        await recordMarkingDecision(
          {
            attemptId: item.attemptId,
            position: item.position,
            source: "AI",
            resultingStatus: status,
            marksAwarded: slotMarks(plan.questionMarks, questionScale, meta.marksAvailable),
            confidence: outcome.confidence,
            aiModel: outcome.model.slice(0, 64) || "unknown",
            promptVersion: outcome.promptVersion.slice(0, 32),
            points: toMarkingPointsJson(outcome.awards)
              .slice(0, MAX_POINTS)
              .map((point) => ({ ...point, pointId: point.pointId.slice(0, 64), ...(point.evidence ? { evidence: point.evidence.slice(0, 300) } : {}) })),
            ...(comment ? { comment: comment.slice(0, 2_000) } : {}),
            ...(outcome.misconceptions.length > 0 ? { misconceptions: outcome.misconceptions.slice(0, 5) } : {}),
          },
          { now: clock(), expectStatus: "PENDING" },
        );
      } catch (error) {
        if (expectedRace(error)) {
          log.info("AI mark not recorded: the answer was marked meanwhile", { attemptId: item.attemptId, position: item.position });
          return;
        }
        throw error;
      }
    },

    async requireSelfAssessment(items) {
      await routeWithoutAi(items, "NOT_CONFIGURED");
    },

    async consentRefusedUserIds(userIds) {
      return aiProcessingRefusedFor(userIds);
    },

    async markWithoutAi(items, reason) {
      await routeWithoutAi(items, reason);
    },
  };
}

/**
 * The `ai.mark` job handler: AI-marks a batch of PENDING answers, then sends answers the AI module could not mark
 * (e.g. an answer too long to mark automatically) to the review queue with their provisional mark.
 */
export function createAttemptAiMarkingHandler(
  options: AttemptAiMarkingOptions = {},
): (payload: unknown, context: Pick<JobContext, "signal" | "logger">) => Promise<MarkPendingAiResponsesSummary> {
  return async (payload, context) => {
    const deps = createAttemptAiMarkingDeps({ ...options, logger: options.logger ?? context.logger });
    const summary = await markPendingAiResponses(payload, deps, context);
    if (summary.failed.length > 0) {
      const now = (options.now ?? (() => new Date()))();
      const log = (options.logger ?? context.logger).child({ module: "attempts.ai-marking" });
      const overAllowance = new Set(summary.failed.filter((item) => item.code === "QUOTA_EXCEEDED").map((item) => keyOf(item)));
      for (const { row, planned } of await loadPlannedSlots(summary.failed)) {
        const quota = overAllowance.has(keyOf(row));
        await sendToReview(
          { attemptId: row.attemptId, position: row.position },
          slotMarks(questionMarksOf(planned), planned.ok ? planned.plan.provisionalMarks : planned.provisionalMarks, row.marksAvailable),
          quota ? OVER_ALLOWANCE_REVIEW_REASON : REVIEW_REASON,
          { now, log, why: quota ? "daily AI marking allowance used up" : "rejected by the AI marker's input checks" },
        );
      }
    }
    return summary;
  };
}

/** Registers the `ai.mark` handler (queue "ai", where the attempt engine enqueues it). */
export function registerAiMarkingJobs(options: AttemptAiMarkingOptions = {}): void {
  const handler = createAttemptAiMarkingHandler(options);
  registerJobHandler(AI_MARK_JOB, markPendingAiResponsesPayloadSchema, (payload, context) => handler(payload, context), {
    queue: "ai",
    maxAttempts: 5,
  });
}
