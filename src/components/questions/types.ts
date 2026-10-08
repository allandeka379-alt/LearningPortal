/**
 * Client-safe contracts of the shared question renderers (§9 question types, §10 feedback, §13 exam mode).
 *
 * A {@link PresentedQuestion} is the `toStudentView` projection (`@/lib/questions/student-view`) with every authored
 * Markdown/LaTeX fragment already rendered to sanitised HTML ON THE SERVER (`src/server/practice/present.ts`), images
 * resolved to served URLs and the fill-in-the-blank template split around its blanks. It never carries answer data:
 * no answer spec, no `isCorrect`, no explanations — those arrive only after marking, as a {@link PresentedFeedback}.
 *
 * Type-only module: safe to import from Client Components, Server Components and server code.
 */
import type { MarkingStatus } from "@/generated/prisma/enums";
import type { SanitizedHtml } from "@/lib/content/types";
import type { MasteryBand } from "@/lib/mastery-band";
import type { MarkingMode, QuestionType } from "@/lib/questions/constants";
import type { PartResponse, QuestionResponse } from "@/lib/questions/response";

export type { PartResponse, QuestionResponse };

/**
 * How a question is shown:
 * - `practice`: answerable, feedback appears after "Check answer" (§10);
 * - `exam`: answerable, never annotated (answers are marked on submit, §13);
 * - `review`: read-only, annotated with the marking result when a feedback object is given.
 */
export type QuestionMode = "practice" | "exam" | "review";

/** A content image served from our own origin (`/api/media/...`). */
export interface PresentedImage {
  src: string;
  alt: string;
  width: number | null;
  height: number | null;
}

export interface PresentedChoiceOption {
  /** Stable QuestionOption.key ("A".."E"); this is what a response stores. */
  key: string;
  html: SanitizedHtml;
  image: PresentedImage | null;
}

/** A matching item or word-bank label. */
export interface PresentedItem {
  id: string;
  html: SanitizedHtml;
  /** Plain-text version for native `<option>` elements (which cannot contain markup). */
  label: string;
}

/** One piece of a fill-in-the-blank paragraph. */
export type FillSegment =
  | { kind: "html"; html: SanitizedHtml }
  /** Whitespace around a blank (inline rendering trims it from the HTML pieces). */
  | { kind: "space" }
  | { kind: "blank"; id: string; /** 1-based, in reading order. */ number: number; input: "text" | "number" | "select"; choices: string[] | null };

export interface PresentedHotspot {
  id: string;
  /** 1-based marker number shown on the diagram. */
  number: number;
  /** Centre of the target, as percentages of the image width / height. */
  x: number;
  y: number;
  w: number | null;
  h: number | null;
}

/** What the answer UI needs per question type. Contains no answer data. */
export type PresentedInteraction =
  | { type: "MULTIPLE_CHOICE"; selectMode: "single" | "multiple"; options: PresentedChoiceOption[] }
  | { type: "TRUE_FALSE"; statementStyle: "true_false" | "yes_no" }
  | { type: "SHORT_ANSWER"; maxLength: number | null }
  | { type: "NUMERICAL" | "CALCULATION"; unitHint: string | null; answerPrefix: string | null; expectsWorking: boolean }
  | { type: "MATCHING"; left: PresentedItem[]; right: (PresentedItem & { letter: string })[] }
  | { type: "FILL_IN_THE_BLANK"; paragraphs: FillSegment[][]; blankCount: number }
  | {
      type: "DIAGRAM_LABELLING";
      /** Null when the diagram could not be loaded (the question then cannot be answered meaningfully). */
      image: PresentedImage | null;
      /** Word bank; null = free-text labels. */
      labels: PresentedItem[] | null;
      hotspots: PresentedHotspot[];
    }
  | { type: "ESSAY" | "EXTENDED_RESPONSE"; wordLimit: { min: number | null; max: number | null } | null }
  | { type: "STRUCTURED" };

export type InteractionOf<T extends PresentedInteraction["type"]> = Extract<PresentedInteraction, { type: T }>;

export interface PresentedQuestion {
  id: string;
  type: QuestionType;
  markingMode: MarkingMode;
  marks: number;
  /** "(a)", "(b)(ii)" — parts only. */
  partLabel: string | null;
  /** The stem (for a STRUCTURED root: the shared context). */
  stemHtml: SanitizedHtml;
  interaction: PresentedInteraction;
  /** Number of hints available (texts are revealed one at a time by the server). */
  hintCount: number;
  calculatorAllowed: boolean | null;
  estimatedSeconds: number | null;
  /** STRUCTURED parts in order. */
  parts: PresentedQuestion[];
}

// ---------------------------------------------------------------------------------------------------------------------
// Feedback (after marking)
// ---------------------------------------------------------------------------------------------------------------------

/** Student-facing classification of a marking result. */
export type FeedbackOutcome = "correct" | "partial" | "incorrect" | "pending" | "review" | "unanswered";

export interface PresentedPoint {
  id: string;
  descriptionHtml: SanitizedHtml;
  marks: number;
}

export interface PresentedMarkScheme {
  points: PresentedPoint[];
  levels: { level: number; minMarks: number; maxMarks: number; descriptorHtml: SanitizedHtml }[];
}

/** Marks of one STRUCTURED part (from the stored per-part marking detail). */
export interface PresentedPartResult {
  awarded: number;
  max: number;
  correct: boolean;
  /** Still waiting for AI or a human. */
  pending: boolean;
}

/** Everything a student may see once an answer is marked (§10). Recursive for STRUCTURED parts. */
export interface PresentedReveal {
  questionId: string;
  partLabel: string | null;
  correctAnswerHtml: SanitizedHtml | null;
  /** "Why the answer is correct". */
  explanationHtml: SanitizedHtml | null;
  workedSolutionHtml: SanitizedHtml | null;
  /** The relevant concept. */
  conceptHtml: SanitizedHtml | null;
  /** MULTIPLE_CHOICE: every option's key flag and rationale. */
  options: { key: string; isCorrect: boolean; rationaleHtml: SanitizedHtml | null }[];
  markScheme: PresentedMarkScheme | null;
  modelAnswerHtml: SanitizedHtml | null;
  /** CALCULATION method marks. */
  methodMarks: PresentedPoint[];
  /** This part's marks (parts only, when known). */
  partResult: PresentedPartResult | null;
  parts: PresentedReveal[];
}

export interface PresentedFeedback {
  position: number;
  status: MarkingStatus;
  outcome: FeedbackOutcome;
  /** Null while marking is pending. Provisional while the status is NEEDS_REVIEW. */
  marksAwarded: number | null;
  marksAvailable: number;
  /** Short marker notes ("Include the unit (km/h)."). Plain text. */
  notes: string[];
  reveal: PresentedReveal | null;
  /** Free-text comment from the marker (AI or teacher), plain text. */
  markerComment: string | null;
  topic: { id: string; name: string } | null;
  /** "Study this topic" (§10): a lesson for the question's topic when one is published. */
  studyLesson: { title: string; href: string; premium: boolean } | null;
  /** Topic mastery change caused by this answer (null when the mark is not final yet). */
  mastery: { before: MasteryBand | null; after: MasteryBand; score: number } | null;
  /** Offered when automatic marking is unavailable: the student marks their own answer against the mark scheme. */
  selfAssessment: { maxMarks: number; points: PresentedPoint[] } | null;
  /** The answer completed the session (practice closes after its last question). */
  attemptCompleted: boolean;
  nextPosition: number | null;
}

/** A hint revealed by the server (sanitised HTML). */
export interface PresentedHint {
  hintNumber: number;
  totalHints: number;
  html: SanitizedHtml;
}
