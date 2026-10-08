/**
 * Question-bank constants shared by the CMS, the student UI and the marking engine (§9, §10). Isomorphic and
 * dependency-free apart from the generated Prisma ENUM module (which contains plain objects only and is documented by
 * Prisma as safe to import anywhere, including client bundles).
 */
import { MarkingMode, QuestionType } from "@/generated/prisma/enums";

export { MarkingMode, QuestionType };

/** All 11 §9 question types, in schema order. Multi-select MCQ is MULTIPLE_CHOICE with `payload.selectMode = "multiple"`. */
export const QUESTION_TYPES = Object.values(QuestionType) as readonly QuestionType[];

/** AUTO | AI_ASSISTED | MANUAL (see `MarkingMode` docs in prisma/schema.prisma). */
export const MARKING_MODES = Object.values(MarkingMode) as readonly MarkingMode[];

/** Types whose answers are marked by a deterministic pure function (ARCHITECTURE §6.5). */
export const DETERMINISTIC_TYPES: ReadonlySet<QuestionType> = new Set<QuestionType>([
  "MULTIPLE_CHOICE",
  "TRUE_FALSE",
  "NUMERICAL",
  "MATCHING",
  "FILL_IN_THE_BLANK",
  "DIAGRAM_LABELLING",
]);

/** Types whose answers are free prose and are never auto-awarded (AI-assisted or manual marking only). */
export const OPEN_RESPONSE_TYPES: ReadonlySet<QuestionType> = new Set<QuestionType>(["ESSAY", "EXTENDED_RESPONSE"]);

/** Type guard for values coming from untrusted input (query strings, imports). */
export function isQuestionType(value: unknown): value is QuestionType {
  return typeof value === "string" && (QUESTION_TYPES as readonly string[]).includes(value);
}

/** Type guard for marking modes. */
export function isMarkingMode(value: unknown): value is MarkingMode {
  return typeof value === "string" && (MARKING_MODES as readonly string[]).includes(value);
}

/**
 * Size limits. Every student-supplied string is bounded so that a hostile client can never make marking (or storage)
 * expensive; every authored list is bounded so a malformed import cannot create pathological questions.
 */
export const QUESTION_LIMITS = {
  /** Authoring ids (blanks, pairs, hotspots, mark-scheme points). */
  idLength: 64,
  /** QuestionOption.key is VARCHAR(8). */
  optionKeyLength: 8,
  maxOptions: 26,
  /** Pairs, blanks, hotspots, labels, accepted answers, mark-scheme points… */
  maxItems: 100,
  /** Accepted answers / keyword alternatives per item. */
  maxAlternatives: 100,
  /** One authored answer string (accepted value, keyword, label text). */
  answerTextLength: 500,
  /** Short markdown fragments in payloads (matching items, labels, word-bank entries). */
  fragmentLength: 2_000,
  /** FILL_IN_THE_BLANK template (markdown). */
  templateLength: 20_000,
  /** Markdown notes for markers / model answers. */
  notesLength: 50_000,
  /** Safe answer-pattern source length (see `safe-pattern.ts`). */
  patternLength: 200,
  maxPatterns: 20,
  /** Student SHORT_ANSWER text. */
  shortTextResponse: 2_000,
  /** Student ESSAY / EXTENDED_RESPONSE text (~7 000 words). */
  longTextResponse: 50_000,
  /** Student number field (value of NUMERICAL / CALCULATION, a numeric blank). */
  numberInput: 64,
  /** Student unit field. */
  unitInput: 32,
  /** Student working (CALCULATION). */
  workingResponse: 10_000,
  /** One blank / one free-text label. */
  blankResponse: 500,
  /** Parts per STRUCTURED response (all depths). */
  maxParts: 50,
  /** Maximum marks of a single item / point. QuestionAttempt.marksAvailable is SMALLINT. */
  maxMarks: 1_000,
} as const;

/**
 * `{{blank:<id>}}` placeholders in a FILL_IN_THE_BLANK template. Lives here (not in `payload.ts`) so client code that
 * only needs the pattern, such as the CMS editor model, does not pull Zod into its bundle.
 */
export const BLANK_PLACEHOLDER = /\{\{blank:([A-Za-z0-9][A-Za-z0-9_.-]*)\}\}/g;
