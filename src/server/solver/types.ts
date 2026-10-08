/**
 * Public contracts of the AI question solver (§15). Type-only: safe to import from Client Components (`import type`).
 * HTML fields are `SanitizedHtml` produced server-side by the content pipeline (KaTeX math, strict sanitiser) and shown
 * with `RichContent`.
 */
import type { SanitizedHtml } from "@/lib/content/types";

export type { SolveMode } from "./core";
import type { SolveMode } from "./core";

/** Why the solver form is (not) shown. "ready" is the only state that offers the form. */
export type SolverAvailability = "ready" | "not_configured" | "disabled" | "not_entitled" | "exam_locked";

export interface SolverQuota {
  limit: number;
  remaining: number;
}

export interface SolverStatus {
  /** The server has an AI key. Without it every AI surface shows "AI tutor is not configured yet". */
  configured: boolean;
  /** Kill switch (Setting ai.enabled + per-feature SOLVER switch). */
  enabled: boolean;
  /** The plan includes solver requests (aiSolverPerDay > 0). */
  entitled: boolean;
  /** The plan allows photo questions (aiImageUploads). */
  imageUploads: boolean;
  /** Today's allowance; null = unlimited. */
  quota: SolverQuota | null;
  /** A timed exam / mock exam is in progress: no AI help until it is submitted (exam integrity). */
  examLocked: boolean;
  maxInputChars: number;
  /** Largest accepted photo (Setting ai.limits.maxImageBytes, never above the 5 MB upload policy). */
  maxImageBytes: number;
  upgradeHref: string;
}

export interface SolverSubjectOption {
  subjectId: string;
  name: string;
  qualification: string;
}

/** Outcome of a stored solve, as shown to the student. */
export type SolveOutcome = "COMPLETE" | "UNREADABLE" | "REFUSED" | "TRUNCATED" | "ERROR";

export interface SolutionStepView {
  title: string;
  explanationHtml: SanitizedHtml;
  /** Display math for the step's key formula. */
  formulaHtml: SanitizedHtml | null;
  /** "Teach me": what to try before the next step is shown. */
  tryThisHtml: SanitizedHtml | null;
}

export interface SimilarBankQuestionView {
  id: string;
  /** Stem only (student view): never options' correctness, answers or mark schemes. */
  stemHtml: SanitizedHtml;
  marks: number;
}

export interface SolutionView {
  /** AiConversation id. */
  id: string;
  /** Assistant message id (rating); null when the solve has no answer message. */
  messageId: string | null;
  createdAt: Date;
  mode: SolveMode;
  outcome: SolveOutcome;
  title: string | null;
  question: {
    /** What the student typed (may be empty for a photo-only question). */
    text: string;
    /** The model's reading of the question (shown for photos so the student can check it). */
    readHtml: SanitizedHtml | null;
    /** `/api/media/<key>`: served to the owner only. */
    imageUrl: string | null;
    imageWidth: number | null;
    imageHeight: number | null;
  };
  subject: { id: string; name: string } | null;
  topic: { id: string; name: string } | null;
  /** Unreadable photo / question: what was missing. */
  unreadableReason: string | null;
  conceptHtml: SanitizedHtml | null;
  steps: SolutionStepView[];
  finalAnswerHtml: SanitizedHtml | null;
  commonMistakesHtml: SanitizedHtml[];
  similar: {
    /** PUBLISHED questions from the bank on the same topic. */
    bank: SimilarBankQuestionView[];
    /** Freshly generated practice prompts: always labelled "AI-generated practice, not from the official bank". */
    generatedHtml: SanitizedHtml[];
  };
  /** Practice on this topic (practice builder deep link); null without a subject. */
  practiceHref: string | null;
  tutorHref: string;
  rating: 1 | -1 | null;
}

export interface SolveSummary {
  id: string;
  title: string | null;
  mode: SolveMode;
  outcome: SolveOutcome;
  hasPhoto: boolean;
  subjectName: string | null;
  topicName: string | null;
  createdAt: Date;
}

export interface SolverHelpline {
  name: string;
  phone?: string | undefined;
  url?: string | undefined;
  description?: string | undefined;
}

/** `solveQuestion` result: a stored solve to open, or a safeguarding response (nothing stored, no model call). */
export type SolveResult = { kind: "SOLVED"; conversationId: string; replayed: boolean } | { kind: "SAFEGUARD"; helplines: SolverHelpline[] };
