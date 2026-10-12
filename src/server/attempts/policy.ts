/**
 * Attempt-engine rules per mode (§10, §11, §12, §13, §46, §52). PURE: no DB, no I/O, unit tested in policy.test.ts.
 * The services in this folder ask these functions what a mode means instead of branching on mode names themselves.
 *
 * | Mode            | Questions from                         | Feedback        | Timer              | Plan gate (rule 9)                       |
 * |-----------------|----------------------------------------|-----------------|--------------------|------------------------------------------|
 * | PRACTICE        | adaptive selection over the bank       | immediate       | none               | practiceQuestionsPerDay (per answer)     |
 * | RETEST          | adaptive selection, due topics         | immediate       | none               | practiceQuestionsPerDay                  |
 * | LESSON_CHECK    | the lesson's practice questions        | immediate       | none               | none beyond full access                  |
 * | DAILY_QUESTION  | today's DailyQuestion                  | immediate       | none               | daily_question                           |
 * | QUIZ            | Assessment (fixed / blueprint)         | assessment's    | assessment's       | practiceQuestionsPerDay                  |
 * | TOPIC_TEST      | Assessment                             | assessment's    | assessment's       | topicTestsPerWeek                        |
 * | CHAPTER_TEST    | Assessment                             | assessment's    | assessment's       | none beyond full access                  |
 * | SUBJECT_TEST    | Assessment                             | assessment's    | assessment's       | none beyond full access                  |
 * | TIMED_EXAM      | Assessment, or generated timed paper   | on submit       | required           | mock_exams                               |
 * | MOCK_EXAM       | Assessment                             | assessment's    | overall or per paper | mock_exams + mockExamsPerMonth         |
 * | DIAGNOSTIC      | Assessment, or one question per topic  | on submit       | assessment's       | diagnostic_test                          |
 *
 * Every mode ALSO needs full access to the subject (`lessons.full`: a paid plan, a school seat or a study pack covering
 * it). There is no free tier (owner decision 2026-10-12): FREE / PUBLIC content opens nothing in the app by itself.
 *
 * Assignment work (§22) is any mode with `assignmentId`. It is exempt from the student's own plan gates and allowances
 * ONLY when the class's tenant sponsors it (holds the `assignments` entitlement: a school with a live school plan, or a
 * paying tutor; `assignmentWorkSponsored` in src/server/billing/entitlements.ts). Unsponsored assignment work is
 * stored with `config.planGated = true` and is gated and counted exactly like the student's own work, so a
 * self-registered "tutor" cannot hand out paid content ({@link isPlanExemptAttempt}).
 */
import { z } from "zod";
import type {
  AbilityLevel,
  AssessmentFeedbackTiming,
  AssessmentKind,
  AttemptMode,
  ContentAccessTier,
  MarkingStatus,
  QuestionType,
  XpReason,
} from "@/generated/prisma/enums";
import type { LimitFeature } from "@/lib/billing/entitlements";
import { MASTERY_BANDS } from "@/lib/mastery-band";
import { createRng, shuffled, type DifficultyMode } from "@/server/adaptive/core";
import type { EntitlementFeature } from "@/server/billing/entitlements";
import type { MarkingResult } from "@/server/marking/types";
import type { Difficulty } from "@/server/progress/core";

// ---------------------------------------------------------------------------------------------------------------------
// Mode families
// ---------------------------------------------------------------------------------------------------------------------

/** Every AttemptMode (mirrors the Prisma enum; a unit test checks they stay in sync). */
export const ATTEMPT_MODES = [
  "PRACTICE",
  "RETEST",
  "LESSON_CHECK",
  "DAILY_QUESTION",
  "QUIZ",
  "TOPIC_TEST",
  "CHAPTER_TEST",
  "SUBJECT_TEST",
  "TIMED_EXAM",
  "MOCK_EXAM",
  "DIAGNOSTIC",
] as const satisfies readonly AttemptMode[];

/** Modes that MUST name an Assessment (AssessmentAttempt_assessment_mode_chk). */
export const ASSESSMENT_REQUIRED_MODES = ["QUIZ", "TOPIC_TEST", "CHAPTER_TEST", "SUBJECT_TEST", "MOCK_EXAM"] as const satisfies readonly AttemptMode[];
/** Modes that MAY name an Assessment or be generated. */
export const ASSESSMENT_OPTIONAL_MODES = ["TIMED_EXAM", "DIAGNOSTIC"] as const satisfies readonly AttemptMode[];
/** Modes that never name an Assessment. */
export const ASSESSMENT_FORBIDDEN_MODES = ["PRACTICE", "RETEST", "LESSON_CHECK", "DAILY_QUESTION"] as const satisfies readonly AttemptMode[];
/**
 * Practice-style modes: one question at a time with immediate feedback; the score is over ANSWERED questions and the
 * attempt closes itself when the last question is answered.
 */
export const PRACTICE_LIKE_MODES = ["PRACTICE", "RETEST", "LESSON_CHECK", "DAILY_QUESTION"] as const satisfies readonly AttemptMode[];
/** Tests and exams: scored over all questions (unanswered = 0) and given a grade ESTIMATE. */
export const GRADED_MODES = ["QUIZ", "TOPIC_TEST", "CHAPTER_TEST", "SUBJECT_TEST", "TIMED_EXAM", "MOCK_EXAM", "DIAGNOSTIC"] as const satisfies readonly AttemptMode[];
/**
 * Modes whose answered questions count toward `practiceQuestionsPerDay`. MUST equal `PRACTICE_LIMIT_MODES` in
 * src/server/billing/usage.ts (the counter); a test asserts it.
 */
export const PRACTICE_LIMITED_MODES = ["PRACTICE", "RETEST", "QUIZ"] as const satisfies readonly AttemptMode[];

const has = (list: readonly AttemptMode[], mode: AttemptMode) => list.includes(mode);

/** True when the mode must name an Assessment. */
export function assessmentRequired(mode: AttemptMode): boolean {
  return has(ASSESSMENT_REQUIRED_MODES, mode);
}

/** True when the mode may name an Assessment. */
export function assessmentAllowed(mode: AttemptMode): boolean {
  return !has(ASSESSMENT_FORBIDDEN_MODES, mode);
}

/** Practice-style mode (see {@link PRACTICE_LIKE_MODES}). */
export function isPracticeLike(mode: AttemptMode): boolean {
  return has(PRACTICE_LIKE_MODES, mode);
}

/** Test / exam mode that receives a grade estimate. */
export function isGradedMode(mode: AttemptMode): boolean {
  return has(GRADED_MODES, mode);
}

/**
 * Counts toward the daily practice allowance (never for plan-exempt work: sponsored assignments, see
 * {@link isPlanExemptAttempt}).
 */
export function countsTowardPracticeLimit(mode: AttemptMode, planExempt: boolean): boolean {
  return !planExempt && has(PRACTICE_LIMITED_MODES, mode);
}

/**
 * Whether a stored attempt is exempt from the student's own plan gates and allowances: assignment work whose class
 * tenant sponsors it. Unsponsored assignment work carries `config.planGated = true` (written at start) and is treated
 * like the student's own work.
 */
export function isPlanExemptAttempt(assignmentId: string | null, config: { planGated?: boolean | undefined }): boolean {
  return assignmentId !== null && config.planGated !== true;
}

/**
 * Where a closed attempt's results live in the student web app: practice-style sessions their summary, the daily
 * question its page, a diagnostic its §52 report, tests and exams the exam results page.
 */
export function attemptResultsHref(mode: AttemptMode, attemptId: string): string {
  switch (mode) {
    case "PRACTICE":
    case "RETEST":
    case "LESSON_CHECK":
      return `/app/practice/${attemptId}/summary`;
    case "DAILY_QUESTION":
      return "/app/daily";
    case "DIAGNOSTIC":
      return `/app/diagnostic/${attemptId}/report`;
    default:
      return `/app/exams/attempt/${attemptId}/results`;
  }
}

const ATTEMPT_NOUNS: Readonly<Record<AttemptMode, string>> = {
  PRACTICE: "practice session",
  RETEST: "re-test",
  LESSON_CHECK: "lesson practice",
  DAILY_QUESTION: "daily question",
  QUIZ: "quiz",
  TOPIC_TEST: "topic test",
  CHAPTER_TEST: "chapter test",
  SUBJECT_TEST: "subject test",
  TIMED_EXAM: "timed exam",
  MOCK_EXAM: "mock exam",
  DIAGNOSTIC: "diagnostic",
};

/** Lower-case noun for an attempt of `mode` in running text ("Your diagnostic results are ready"). */
export function attemptNoun(mode: AttemptMode): string {
  return ATTEMPT_NOUNS[mode];
}

/** The attempt mode that runs an assessment of `kind` (names are aligned one-to-one). */
export function modeForAssessmentKind(kind: AssessmentKind): AttemptMode {
  return kind;
}

/** True when an assessment of `kind` may be attempted in `mode`. */
export function modeMatchesAssessmentKind(mode: AttemptMode, kind: AssessmentKind): boolean {
  return modeForAssessmentKind(kind) === mode;
}

// ---------------------------------------------------------------------------------------------------------------------
// Feedback timing (§10 instant feedback vs §13 exam mode)
// ---------------------------------------------------------------------------------------------------------------------

/** Stored in AssessmentAttempt.config.feedback. */
export type FeedbackMode = "IMMEDIATE" | "ON_SUBMIT";

/**
 * Feedback for a new attempt: practice-style modes are immediate; timed exams, mocks and diagnostics always reveal on
 * submit (exam conditions, §13; the §52 performance report); quizzes and tests follow their definition.
 */
export function feedbackModeFor(mode: AttemptMode, timing: AssessmentFeedbackTiming | null): FeedbackMode {
  if (isPracticeLike(mode)) return "IMMEDIATE";
  if (mode === "TIMED_EXAM" || mode === "MOCK_EXAM" || mode === "DIAGNOSTIC") return "ON_SUBMIT";
  return timing === "IMMEDIATE" ? "IMMEDIATE" : "ON_SUBMIT";
}

/**
 * Whether marks and the answer reveal of one slot may be shown (§13: answers are never exposed before submission):
 * - IMMEDIATE attempts: once that slot is marked (any status but PENDING);
 * - ON_SUBMIT attempts: once the attempt is closed, and for AFTER_CLOSE assessments (teacher tests) only after the
 *   assignment window has closed.
 */
export function revealAllowed(input: {
  feedback: FeedbackMode;
  attemptOpen: boolean;
  slotMarked: boolean;
  assessmentTiming: AssessmentFeedbackTiming | null;
  /** Assignment window end (closesAt, else dueAt); null when not assignment work. */
  windowClosesAt: Date | null;
  now: Date;
}): boolean {
  if (input.feedback === "IMMEDIATE") return input.slotMarked;
  if (input.attemptOpen) return false;
  if (input.assessmentTiming === "AFTER_CLOSE" && input.windowClosesAt !== null && input.windowClosesAt.getTime() > input.now.getTime()) {
    return false;
  }
  return true;
}

// ---------------------------------------------------------------------------------------------------------------------
// Self-assessment fallback (ARCHITECTURE §6.5 / §6.8: AI marking not configured)
// ---------------------------------------------------------------------------------------------------------------------

/** Open answer types a student may mark against the mark scheme when AI marking is unavailable. */
export const SELF_ASSESSABLE_TYPES = ["ESSAY", "EXTENDED_RESPONSE", "SHORT_ANSWER"] as const satisfies readonly QuestionType[];

/** Whether an answer of this type, in this work, is marked by the student when AI marking is unavailable. */
export function selfAssessableWithoutAi(questionType: QuestionType, isAssignment: boolean): boolean {
  return !isAssignment && (SELF_ASSESSABLE_TYPES as readonly QuestionType[]).includes(questionType);
}

export const SELF_MARK_NOTE = "Mark your answer yourself against the mark scheme.";
export const TEACHER_MARK_NOTE = "A teacher or reviewer will mark this answer.";

/**
 * Marking result when AI marking is switched off (`features.ai`, ARCHITECTURE §3.14), decided at answer time so no
 * `ai.mark` job is ever queued: an answer that would wait for AI (`PENDING_AI`) either stays pending for the student's
 * own self-assessment against the mark scheme (their own written work: {@link selfAssessableWithoutAi}) or goes straight
 * to the teacher / reviewer queue (`NEEDS_REVIEW`) with the marks already earned by rule as its provisional mark
 * (calculations, structured questions, assignment work). This is the same routing the `ai.mark` job applies when no
 * model is available. Every other result is returned unchanged.
 */
export function routeWithoutAiMarking(result: MarkingResult, questionType: QuestionType, isAssignment: boolean): MarkingResult {
  if (result.status !== "PENDING_AI") return result;
  const otherFlags = result.feedback.flags.filter((flag) => flag !== "AI_REQUIRED");
  const otherNotes = result.feedback.notes.filter((note) => !/marked against the mark scheme shortly/i.test(note));
  if (selfAssessableWithoutAi(questionType, isAssignment)) {
    return { ...result, feedback: { ...result.feedback, notes: [SELF_MARK_NOTE, ...otherNotes], flags: otherFlags } };
  }
  return {
    ...result,
    status: "NEEDS_REVIEW",
    isCorrect: null,
    feedback: { ...result.feedback, notes: [TEACHER_MARK_NOTE, ...otherNotes], flags: ["MANUAL_REVIEW", ...otherFlags.filter((flag) => flag !== "MANUAL_REVIEW")] },
  };
}

/**
 * Whether the student may self-mark one answer: an open answer that is saved and waiting for AI marking (PENDING,
 * processed), in their own non-assignment work (teachers mark assignment answers), whose feedback may already be
 * shown (exam modes: after submission; the mark scheme is part of the reveal), and only while AI marking is not
 * configured on this server. The mark is recorded as SELF_ASSESSED: weighted lower in mastery, effort-only XP.
 */
export function selfAssessmentAllowed(input: {
  markingStatus: MarkingStatus;
  /** The answer was deterministically processed (QuestionAttempt.markedAt set; PENDING = queued for AI). */
  processed: boolean;
  answered: boolean;
  questionType: QuestionType | null;
  isAssignment: boolean;
  /** `revealAllowed` for this slot. */
  feedbackVisible: boolean;
  aiMarkingAvailable: boolean;
}): boolean {
  return (
    input.markingStatus === "PENDING" &&
    input.processed &&
    input.answered &&
    input.questionType !== null &&
    (SELF_ASSESSABLE_TYPES as readonly QuestionType[]).includes(input.questionType) &&
    !input.isAssignment &&
    input.feedbackVisible &&
    !input.aiMarkingAvailable
  );
}

// ---------------------------------------------------------------------------------------------------------------------
// Difficulty and counts (§10 "20 questions, medium")
// ---------------------------------------------------------------------------------------------------------------------

export const DIFFICULTY_CHOICES = ["EASY", "MEDIUM", "HARD", "ADAPTIVE"] as const;
export type DifficultyChoice = (typeof DIFFICULTY_CHOICES)[number];

/** Maps the student-facing difficulty choice onto the adaptive selector's mode. */
export function toDifficultyMode(choice: DifficultyChoice | undefined): DifficultyMode {
  switch (choice) {
    case "EASY":
      return "easy";
    case "MEDIUM":
      return "medium";
    case "HARD":
      return "hard";
    default:
      return "adaptive";
  }
}

/** Starting difficulty for a topic with no evidence (SubjectEnrollment.abilityLevel; NULL starts at INTERMEDIATE). */
export function initialDifficultyFor(ability: AbilityLevel | null | undefined): Difficulty {
  switch (ability) {
    case "BEGINNER":
      return 2;
    case "ADVANCED":
      return 4;
    default:
      return 3;
  }
}

// ---------------------------------------------------------------------------------------------------------------------
// Generated diagnostic (§52 "the diagnostic should place the student")
// ---------------------------------------------------------------------------------------------------------------------

const clampDifficulty = (value: number) => Math.min(5, Math.max(1, Math.round(value)));

/**
 * Target difficulty of each question of a generated diagnostic: a third each just below, at and just above the
 * student's self-reported ability (`initialDifficultyFor`: BEGINNER 2, INTERMEDIATE / unknown 3, ADVANCED 4), clamped
 * to 1–5, so the result can place a student who under- or over-estimated themselves. Remainders go to the easier
 * level, then the ability level. In order below / at / above, repeating (the planner spreads them over topics).
 */
export function diagnosticDifficultyTargets(ability: AbilityLevel | null | undefined, count: number): number[] {
  const center = initialDifficultyFor(ability);
  const levels = [clampDifficulty(center - 1), center, clampDifficulty(center + 1)];
  const n = Number.isFinite(count) ? Math.max(0, Math.floor(count)) : 0;
  return Array.from({ length: n }, (_, index) => levels[index % 3] as number);
}

/** A candidate question for a diagnostic, with the top-level topic of the topic it is tagged under. */
export interface DiagnosticCandidate {
  id: string;
  /** The (leaf) topic the question is tagged under. */
  topicId: string;
  /** Top-level topic of `topicId` (first segment of the materialised path). */
  rootTopicId: string;
  difficulty: number;
  /** Times this student has seen the question (unseen questions are preferred). */
  timesSeen: number;
}

export interface DiagnosticPick {
  questionId: string;
  topicId: string;
  /** The difficulty this slot aimed for (the bank may only have a neighbouring level). */
  targetDifficulty: number;
}

/**
 * Picks a generated diagnostic (pure, deterministic for a seed): coverage first across TOP-LEVEL topics (round-robin
 * in seeded order, so every top-level topic gets a question before any gets a second), then across each top-level
 * topic's leaves (the least-asked leaf next); each slot takes the question closest to its target difficulty
 * ({@link diagnosticDifficultyTargets}, shuffled so difficulty does not follow topic order), unseen questions first.
 * Returns fewer picks than targets when the bank runs out.
 */
export function planDiagnosticQuestions(candidates: readonly DiagnosticCandidate[], targets: readonly number[], seed: string): DiagnosticPick[] {
  const random = createRng(`diagnostic:${seed}`);
  const byId = (a: { id: string }, b: { id: string }) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0);
  const unique = new Map<string, DiagnosticCandidate>();
  for (const candidate of [...candidates].sort(byId)) if (!unique.has(candidate.id)) unique.set(candidate.id, candidate);

  // root → leaf → remaining candidates (seeded order within a leaf as the final tie-breaker)
  const roots = new Map<string, Map<string, DiagnosticCandidate[]>>();
  for (const candidate of shuffled([...unique.values()], random)) {
    const leaves = roots.get(candidate.rootTopicId) ?? new Map<string, DiagnosticCandidate[]>();
    leaves.set(candidate.topicId, [...(leaves.get(candidate.topicId) ?? []), candidate]);
    roots.set(candidate.rootTopicId, leaves);
  }
  const rootOrder = shuffled([...roots.keys()].sort(), random);
  const leafOrder = new Map([...roots.entries()].map(([root, leaves]) => [root, shuffled([...leaves.keys()].sort(), random)]));
  const asked = new Map<string, number>();
  const slotTargets = shuffled([...targets], random);

  const picks: DiagnosticPick[] = [];
  let cursor = 0;
  for (const target of slotTargets) {
    let picked: DiagnosticPick | null = null;
    for (let tries = 0; tries < rootOrder.length && picked === null; tries += 1) {
      const root = rootOrder[(cursor + tries) % rootOrder.length] as string;
      const leaves = roots.get(root) as Map<string, DiagnosticCandidate[]>;
      const order = (leafOrder.get(root) ?? []).filter((leaf) => (leaves.get(leaf)?.length ?? 0) > 0);
      if (order.length === 0) continue;
      const leaf = order.reduce((best, current) => ((asked.get(current) ?? 0) < (asked.get(best) ?? 0) ? current : best));
      const pool = leaves.get(leaf) as DiagnosticCandidate[];
      let bestIndex = 0;
      pool.forEach((candidate, index) => {
        const best = pool[bestIndex] as DiagnosticCandidate;
        const distance = Math.abs(clampDifficulty(candidate.difficulty) - target) - Math.abs(clampDifficulty(best.difficulty) - target);
        if (distance < 0 || (distance === 0 && candidate.timesSeen === 0 && best.timesSeen > 0)) bestIndex = index;
      });
      const [chosen] = pool.splice(bestIndex, 1);
      if (!chosen) continue;
      asked.set(leaf, (asked.get(leaf) ?? 0) + 1);
      picked = { questionId: chosen.id, topicId: chosen.topicId, targetDifficulty: target };
      cursor = (cursor + tries + 1) % rootOrder.length;
    }
    if (picked === null) break;
    picks.push(picked);
  }
  return picks;
}

const DEFAULT_COUNTS: Readonly<Partial<Record<AttemptMode, number>>> = {
  PRACTICE: 10,
  RETEST: 10,
  DIAGNOSTIC: 20,
  TIMED_EXAM: 20,
  DAILY_QUESTION: 1,
};

/** Hard ceiling on generated session sizes (also the QuestionAttempt position range we create at start). */
export const MAX_GENERATED_QUESTIONS = 60;
/** Ceiling on assessment papers (positions are SMALLINT; getQuestionsForAttempt loads at most 500). */
export const MAX_ATTEMPT_QUESTIONS = 300;

/** Requested question count for a generated mode, clamped to 1..{@link MAX_GENERATED_QUESTIONS}. */
export function questionCountFor(mode: AttemptMode, requested: number | undefined): number {
  const value = requested ?? DEFAULT_COUNTS[mode] ?? 10;
  return Math.min(MAX_GENERATED_QUESTIONS, Math.max(1, Math.floor(value)));
}

// ---------------------------------------------------------------------------------------------------------------------
// Entitlements (CLAUDE.md rule 9)
// ---------------------------------------------------------------------------------------------------------------------

export interface ModeGates {
  /** Boolean features the plan must include (`assertEntitlement`). */
  features: EntitlementFeature[];
  /** Numeric limit checked at start with the current usage (`assertWithinLimit`). */
  limit: LimitFeature | null;
  /** The subject's full (premium) content is required (`canAccessSubjectContent`). */
  needsSubjectContent: boolean;
}

/**
 * What the student's plan must allow to START an attempt. `accessTier` is the assessment's tier (null for generated
 * modes); since 2026-10-12 it no longer opens anything by itself (there is no free tier, every mode needs full subject
 * access) and is kept for callers and future use. `planExempt` is true ONLY for
 * assignment work the class's tenant sponsors (`assignmentWorkSponsored`); any other assignment work is gated like the
 * student's own.
 */
export function gatesFor(mode: AttemptMode, options: { accessTier: ContentAccessTier | null; planExempt: boolean }): ModeGates {
  if (options.planExempt) return { features: [], limit: null, needsSubjectContent: false };
  // No free tier (owner decision 2026-10-12): every mode needs full access to the subject (a paid plan, a school seat
  // or a study pack covering it), whatever the access tier of the questions or the assessment.
  switch (mode) {
    case "PRACTICE":
    case "RETEST":
    case "QUIZ":
      return { features: [], limit: "practiceQuestionsPerDay", needsSubjectContent: true };
    case "TOPIC_TEST":
      return { features: [], limit: "topicTestsPerWeek", needsSubjectContent: true };
    case "CHAPTER_TEST":
    case "SUBJECT_TEST":
    case "LESSON_CHECK":
      return { features: [], limit: null, needsSubjectContent: true };
    case "MOCK_EXAM":
      return { features: ["mock_exams"], limit: "mockExamsPerMonth", needsSubjectContent: true };
    case "TIMED_EXAM":
      return { features: ["mock_exams"], limit: null, needsSubjectContent: true };
    case "DIAGNOSTIC":
      return { features: ["diagnostic_test"], limit: null, needsSubjectContent: true };
    case "DAILY_QUESTION":
      return { features: ["daily_question"], limit: null, needsSubjectContent: true };
  }
}

// ---------------------------------------------------------------------------------------------------------------------
// XP (awarded per completed attempt, never per answer: XpEvent ledger stays small)
// ---------------------------------------------------------------------------------------------------------------------

/** XP ledger reason for completing an attempt of `mode`. */
export function xpReasonFor(mode: AttemptMode, isAssignment: boolean): XpReason {
  if (isAssignment) return "ASSIGNMENT_SUBMITTED";
  switch (mode) {
    case "PRACTICE":
    case "RETEST":
    case "LESSON_CHECK":
      return "PRACTICE_COMPLETED";
    case "DAILY_QUESTION":
      return "DAILY_QUESTION_ANSWERED";
    case "MOCK_EXAM":
      return "MOCK_EXAM_COMPLETED";
    case "DIAGNOSTIC":
      return "DIAGNOSTIC_COMPLETED";
    default:
      return "ASSESSMENT_COMPLETED";
  }
}

// ---------------------------------------------------------------------------------------------------------------------
// Timing
// ---------------------------------------------------------------------------------------------------------------------

/** Job that closes a timed attempt after its deadline + late-sync grace (and, without a payload id, sweeps). */
export const AUTO_SUBMIT_JOB = "exams.autoSubmit";

/** Untimed attempts idle this long (no save) are closed by the sweep (answered questions kept and marked). */
export const IDLE_TIMEOUT_MINUTES = 360;
/** Fallback time per mark when a question has no estimatedSeconds (generated timed papers). */
export const SECONDS_PER_MARK_FALLBACK = 90;
const MIN_GENERATED_LIMIT_SECONDS = 5 * 60;
const MAX_GENERATED_LIMIT_SECONDS = 4 * 3600;

/** Extra-time accommodation (Student.examExtraTimePercent, 1–100) as a timer multiplier (1–2). */
export function extraTimeMultiplier(percent: number | null | undefined): number {
  if (percent === null || percent === undefined || !Number.isFinite(percent) || percent <= 0) return 1;
  return 1 + Math.min(100, Math.floor(percent)) / 100;
}

/**
 * Time limit of a generated timed paper: Σ estimatedSeconds (falling back to {@link SECONDS_PER_MARK_FALLBACK} per mark),
 * rounded up to whole minutes and clamped to 5 minutes – 4 hours.
 */
export function estimateTimeLimitSeconds(questions: readonly { estimatedSeconds: number | null; marks: number }[]): number {
  const total = questions.reduce(
    (sum, q) => sum + (q.estimatedSeconds && q.estimatedSeconds > 0 ? q.estimatedSeconds : Math.max(1, q.marks) * SECONDS_PER_MARK_FALLBACK),
    0,
  );
  const minutes = Math.ceil(total / 60) * 60;
  return Math.min(MAX_GENERATED_LIMIT_SECONDS, Math.max(MIN_GENERATED_LIMIT_SECONDS, minutes));
}

// ---------------------------------------------------------------------------------------------------------------------
// Stored JSON shapes (AssessmentAttempt.config / .analysis), validated with Zod on read and write
// ---------------------------------------------------------------------------------------------------------------------

export const ATTEMPT_ORIGINS = ["BUILDER", "PLAN_ITEM", "RECOMMENDATION", "RETEST", "MISTAKES", "ASSIGNMENT", "ONBOARDING", "WHATSAPP"] as const;

/** AssessmentAttempt.config (schema doc shape; unknown keys tolerated on read for forward compatibility). */
export const attemptConfigSchema = z.looseObject({
  questionCount: z.int().min(0).optional(),
  difficulty: z.enum(DIFFICULTY_CHOICES).optional(),
  topicIds: z.array(z.uuid()).optional(),
  includeSubtopics: z.boolean().optional(),
  questionTypes: z.array(z.string()).optional(),
  feedback: z.enum(["IMMEDIATE", "ON_SUBMIT"]),
  origin: z.enum(ATTEMPT_ORIGINS),
  seed: z.string().optional(),
  graceSeconds: z.int().min(0).optional(),
  extraTimePercent: z.int().min(0).max(100).optional(),
  answerAnyPolicy: z.enum(["BEST", "FIRST"]).optional(),
  /** Assignment work the class's tenant does not sponsor: the student's own gates and allowances apply. */
  planGated: z.boolean().optional(),
});
export type AttemptConfig = z.output<typeof attemptConfigSchema>;

/** Reads a stored config; anything unreadable falls back to safe defaults (answers are then held back until submit). */
export function readAttemptConfig(raw: unknown, mode: AttemptMode): AttemptConfig {
  const parsed = attemptConfigSchema.safeParse(raw);
  if (parsed.success) return parsed.data;
  return { feedback: isPracticeLike(mode) ? "IMMEDIATE" : "ON_SUBMIT", origin: "BUILDER" };
}

export const ANALYSIS_RECOMMENDATION_KINDS = ["LESSON", "PRACTICE", "TOPIC_TEST", "FLASHCARDS"] as const;

/**
 * AssessmentAttempt.analysis (version 1; schema doc shape), plus `mastery`: each topic's mastery band before the
 * attempt's first final answer in it and after its latest (§11 "mastery band changes" on the practice summary). While a
 * practice session is open the document carries only `mastery` (empty results arrays); scoring at close fills the rest
 * and keeps `mastery`.
 */
export const attemptAnalysisSchema = z.object({
  version: z.literal(1),
  byTopic: z.array(z.object({ topicId: z.string(), marksAwarded: z.number(), marksAvailable: z.number(), percent: z.number() })),
  strongTopicIds: z.array(z.string()),
  weakTopicIds: z.array(z.string()),
  recommendations: z.array(
    z.object({
      kind: z.enum(ANALYSIS_RECOMMENDATION_KINDS),
      topicId: z.string(),
      lessonId: z.string().optional(),
      assessmentId: z.string().optional(),
      questionCount: z.number().optional(),
      reason: z.string(),
    }),
  ),
  grade: z.object({ nextGrade: z.string().optional(), marksToNextGrade: z.number().optional() }).optional(),
  time: z.object({ avgSecondsPerMark: z.number(), unansweredCount: z.number() }).optional(),
  // Unreadable entries drop the change list only, never the scored analysis around it.
  mastery: z
    .array(z.object({ topicId: z.string(), before: z.enum(MASTERY_BANDS).nullable(), after: z.enum(MASTERY_BANDS) }))
    .optional()
    .catch(undefined),
});
export type AttemptAnalysisJson = z.output<typeof attemptAnalysisSchema>;

/** Parses a stored analysis document; null when absent or not version 1. */
export function readAttemptAnalysis(raw: unknown): AttemptAnalysisJson | null {
  const parsed = attemptAnalysisSchema.safeParse(raw);
  return parsed.success ? parsed.data : null;
}
