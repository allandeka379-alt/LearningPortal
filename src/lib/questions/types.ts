/**
 * Structural types for questions as loaded from the database (a subset of the Prisma `Question` / `QuestionOption`
 * rows). Isomorphic and Prisma-free so the marking engine, the student view and the CMS can share them; Prisma rows
 * (with `payload: JsonValue`) are assignable to them.
 */
import type { MarkingMode, QuestionType } from "./constants";

export interface QuestionOptionRecord {
  key: string;
  /** Markdown + LaTeX. */
  content: string;
  /** ANSWER KEY — never sent to students before submission. */
  isCorrect: boolean;
  /** Why the option is right / the misconception it reveals. Revealed after answering. */
  rationale?: string | null;
  mediaAssetId?: string | null;
  sortOrder?: number;
}

/** A question (root or part) with the fields needed for marking and rendering. */
export interface QuestionRecord {
  id: string;
  type: QuestionType;
  markingMode: MarkingMode;
  /** Markdown + LaTeX. For a STRUCTURED root: the shared context. */
  stem: string;
  /** Raw stored JSON; validated with `parseQuestionPayload`. */
  payload: unknown;
  /** Raw stored JSON (SERVER-ONLY); validated with `parseAnswerSpec`. */
  answerSpec: unknown;
  marks: number;
  /** "(a)", "(b)(ii)" — parts only. */
  partLabel?: string | null;
  partOrder?: number;
  explanation?: string | null;
  workedSolution?: string | null;
  hints?: readonly string[];
  conceptSummary?: string | null;
  relatedLessonId?: string | null;
  calculatorAllowed?: boolean | null;
  estimatedSeconds?: number | null;
  /** Pipeline output (see the `renderedHtml` doc comment on Question). */
  renderedHtml?: unknown;
  /** MULTIPLE_CHOICE options. */
  options?: readonly QuestionOptionRecord[];
  /** STRUCTURED parts, ordered by partOrder. */
  parts?: readonly QuestionRecord[];
}
