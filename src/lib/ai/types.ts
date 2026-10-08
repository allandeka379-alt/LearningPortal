/**
 * Isomorphic AI types shared by the server gateway (`src/server/ai`) and UI code (§14, §15, §40).
 *
 * Types and the literal lists that define them only: no model ids, prices, prompts or limits (those are
 * DB-configured, CLAUDE.md rule 5). Safe for client bundles.
 */

/**
 * Pedagogical intent of a student turn (§15 "Teach me" vs "Give me the answer"; ARCHITECTURE §6.3 step 4).
 * Classifier output. Persisted as Prisma `AiIntent` via `toDbIntent` in `src/server/ai/intent.ts` (UNSAFE has no DB
 * value: it is stored as OTHER and the conversation is safety-flagged instead).
 */
export const AI_INTENTS = ["TEACH", "HINT", "ANSWER", "CHECK_WORK", "OFF_TOPIC", "UNSAFE"] as const;
export type AiIntentLabel = (typeof AI_INTENTS)[number];

/** Hint-ladder levels (ARCHITECTURE §6.4): 0 restate .. 4 full worked solution. Matches the AiMessage CHECK 0..4. */
export const HINT_LEVELS = [0, 1, 2, 3, 4] as const;
export type HintLevel = (typeof HINT_LEVELS)[number];

/** The level at which the full worked solution is revealed. */
export const FULL_SOLUTION_HINT_LEVEL: HintLevel = 4;

/** Outcome of one model call; mirrors Prisma `AiMessageStatus` minus ERROR (errors are thrown, not returned). */
export const AI_CALL_STATUSES = ["COMPLETE", "TRUNCATED", "REFUSED", "ABORTED"] as const;
export type AiCallStatus = (typeof AI_CALL_STATUSES)[number];

/** Why a structured-output call produced no usable data. */
export const AI_STRUCTURED_FAILURES = ["REFUSED", "TRUNCATED", "INVALID_OUTPUT"] as const;
export type AiStructuredFailure = (typeof AI_STRUCTURED_FAILURES)[number];

/** Tutor behaviour selected for one turn by the pedagogical policy (§14, §15, ARCHITECTURE §6.4). */
export const TUTOR_TURN_MODES = [
  /** Default: teach step by step, one hint-ladder level per turn. */
  "TEACH",
  /** Student asked for a hint: next ladder level. */
  "HINT",
  /** Full worked solution (explicit request or after an attempt, never during an exam). */
  "ANSWER",
  /** Student shared working: find the first error, explain the misconception. */
  "CHECK_WORK",
  /** Off-topic: redirect to study. */
  "REDIRECT",
  /** Possible safeguarding concern: supportive response, no lesson. */
  "SAFEGUARD",
  /** A timed exam / mock exam attempt is in progress: no help with questions. */
  "EXAM_LOCKED",
  /** The teacher assignment does not allow AI help. */
  "NO_HELP",
] as const;
export type TutorTurnMode = (typeof TUTOR_TURN_MODES)[number];

/** Result of AI marking for one answer (ARCHITECTURE §6.5). Values match Prisma `MarkingStatus`. */
export const AI_MARKING_STATUSES = ["AI_MARKED", "NEEDS_REVIEW"] as const;
export type AiMarkingStatus = (typeof AI_MARKING_STATUSES)[number];

/** Why an AI mark went to the human review queue instead of being final. */
export const AI_MARKING_REVIEW_REASONS = [
  "LOW_CONFIDENCE",
  "INVALID_OUTPUT",
  "UNKNOWN_POINTS",
  "INCOMPLETE_AWARDS",
  "REFUSED",
  "TRUNCATED",
] as const;
export type AiMarkingReviewReason = (typeof AI_MARKING_REVIEW_REASONS)[number];
