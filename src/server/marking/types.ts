/**
 * Marking engine contracts (§9 "automatically marked and manually/AI-assisted marked", §10 feedback, ARCHITECTURE
 * §6.5). Pure data: no DB, no I/O.
 */
import type { MarkingMode, QuestionType } from "@/lib/questions";

/**
 * Outcome of marking one answer:
 * - `MARKED`       final deterministic mark (store as AUTO_MARKED);
 * - `NEEDS_REVIEW` a human must decide (manual marking, an ambiguous number, an invalid spec/response); `marksAwarded`
 *                  is a provisional lower bound;
 * - `PENDING_AI`   queue AI-assisted marking (ai.mark job); `marksAwarded` holds the deterministic part already earned;
 * - `UNANSWERED`   no answer: 0 marks.
 */
export type MarkingOutcome = "MARKED" | "NEEDS_REVIEW" | "PENDING_AI" | "UNANSWERED";

/** Machine-readable reasons attached to a result (analytics, review queues, UI hints). */
export type MarkingFlag =
  | "SPEC_INVALID"
  | "RESPONSE_INVALID"
  | "RESPONSE_TYPE_MISMATCH"
  | "UNKNOWN_OPTION"
  | "TOO_MANY_SELECTIONS"
  | "DUPLICATE_ENTRY"
  | "UNKNOWN_TARGET"
  | "NUMBER_INVALID"
  | "NUMBER_AMBIGUOUS"
  | "UNIT_MISSING"
  | "UNIT_WRONG"
  | "UNIT_CONVERTED"
  | "SIG_FIGS"
  | "DECIMAL_PLACES"
  | "REJECTED_ANSWER"
  | "PARTIAL_ANSWER"
  | "PATTERN_SKIPPED"
  | "KEYWORD_MATCH"
  | "RUBRIC_PARTIAL"
  | "AI_REQUIRED"
  | "MANUAL_REVIEW"
  | "METHOD_MARKS_PENDING"
  | "METHOD_MARKS_IMPLIED"
  | "WORKING_MISSING"
  | "OVER_WORD_LIMIT"
  | "UNDER_WORD_LIMIT"
  | "MARKS_MISMATCH"
  | "DEPTH_EXCEEDED";

/** A mark-scheme / rubric / method point. `awarded` is null while AI or a human still has to decide it. */
export interface MatchedPoint {
  pointId: string;
  description: string | null;
  maxMarks: number;
  awarded: number | null;
  evidence: string | null;
}

/** Per-item detail for blanks, pairs, labels and options. Weights may be fractional (whole marks are floored at the end). */
export interface ItemMarking {
  id: string;
  correct: boolean;
  awarded: number | null;
  maxMarks: number | null;
  /** Display of an accepted answer (shown after marking). */
  expected: string | null;
  /** What the student gave (echo, for the review screen). */
  given: string | null;
}

export interface PartMarking {
  partId: string;
  partLabel: string | null;
  type: QuestionType;
  result: MarkingResult;
}

export interface MarkingFeedback {
  /** See `formatCorrectAnswer` (plain text with possible inline markdown/LaTeX); null for open responses. */
  correctAnswerDisplay: string | null;
  /** STRUCTURED: one entry per direct part (nested parts inside their parent's result). */
  perPart?: PartMarking[];
  /** Rubric, mark-scheme or method points. */
  matchedPoints?: MatchedPoint[];
  /** Blanks, pairs, labels, options. */
  items?: ItemMarking[];
  /** Authored markdown for the chosen answer (true/false feedback, accepted/rejected answer feedback). */
  responseFeedback?: string;
  /** Short student-facing sentences (UI copy, no answer data beyond what is revealed after marking). */
  notes: string[];
  flags: MarkingFlag[];
}

export interface MarkingResult {
  status: MarkingOutcome;
  /** Whole marks, 0 ≤ marksAwarded ≤ maxMarks. Provisional unless `status` is MARKED or UNANSWERED. */
  marksAwarded: number;
  maxMarks: number;
  /** true = full marks, false = zero (final), null = partial credit or not final. */
  isCorrect: boolean | null;
  /** Marks still to be decided by AI or a human (0 when final). */
  pendingMarks: number;
  feedback: MarkingFeedback;
}

/** An MCQ option as the marker needs it (QuestionOption subset). */
export interface MarkingOption {
  key: string;
  isCorrect: boolean;
  content?: string;
  sortOrder?: number;
}

/** A STRUCTURED part. Its answer comes from the root response (`parts[].partId`). */
export interface MarkingPartInput {
  id: string;
  type: QuestionType;
  marks: number;
  markingMode?: MarkingMode;
  partLabel?: string | null;
  partOrder?: number;
  payload: unknown;
  answerSpec: unknown;
  options?: readonly MarkingOption[];
  parts?: readonly MarkingPartInput[];
}

export interface MarkingInput {
  type: QuestionType;
  /** Question.marks (positive whole number). */
  marks: number;
  /** Default AUTO. */
  markingMode?: MarkingMode;
  /** Raw stored JSON; validated here. */
  payload: unknown;
  answerSpec: unknown;
  /** Raw stored / submitted JSON; null or undefined = not answered. */
  response: unknown;
  options?: readonly MarkingOption[];
  parts?: readonly MarkingPartInput[];
}
