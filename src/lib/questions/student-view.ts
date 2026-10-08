/**
 * Client-safe projections of a question.
 *
 * `toStudentView` is the ONLY shape of a question that may be sent to a browser (or WhatsApp, or the API) before the
 * answer is submitted. It is built by WHITELISTING fields — never by deleting fields from a row — so a column added
 * later cannot leak by accident. It never contains: `answerSpec`, `QuestionOption.isCorrect` / `rationale`,
 * `explanation`, `workedSolution`, `conceptSummary`, hint texts (only their count), marking notes, or rendered HTML of
 * any of those. Shuffling (MCQ options, matching right column, diagram word bank) is applied here, deterministically
 * per `shuffleSeed`, so the authored order (often the answer order) is never what the student sees.
 *
 * `toAnswerReveal` is the post-submission counterpart (§10: correct answer, explanation, why it is correct, the
 * relevant concept, "Study this topic"). Exam modes with AFTER_SUBMIT / AFTER_CLOSE feedback must hold it back until
 * the attempt / window closes.
 */
import type { MarkingMode, QuestionType } from "./constants";
import { formatCorrectAnswer } from "./answer-display";
import { parseQuestionPayload, safeParseAnswerSpec, safeParseQuestionPayload } from "./parse";
import type { MarkScheme } from "./answer-spec";
import type { QuestionRecord } from "./types";

// ---------------------------------------------------------------------------------------------------------------
// Deterministic shuffling (isomorphic; mulberry32 seeded with FNV-1a)
// ---------------------------------------------------------------------------------------------------------------

function hashString(value: string): number {
  let hash = 0x811c9dc5;
  for (let i = 0; i < value.length; i++) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}

function seededShuffle<T>(items: readonly T[], seed: string): T[] {
  let state = hashString(seed);
  const random = () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4_294_967_296;
  };
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    const a = copy[i] as T;
    copy[i] = copy[j] as T;
    copy[j] = a;
  }
  return copy;
}

// ---------------------------------------------------------------------------------------------------------------
// Student view
// ---------------------------------------------------------------------------------------------------------------

export interface StudentOption {
  key: string;
  /** Markdown + LaTeX source. */
  content: string;
  mediaAssetId: string | null;
  /** Pipeline HTML from `renderedHtml.options[key]` when present (wrap with `trustPersistedHtml` server-side). */
  html: string | null;
}

/** What the answer UI needs per type. Contains no answer data. */
export type StudentInteraction =
  | { type: "MULTIPLE_CHOICE"; selectMode: "single" | "multiple"; options: StudentOption[] }
  | { type: "TRUE_FALSE"; statementStyle: "true_false" | "yes_no" }
  | { type: "SHORT_ANSWER"; maxLength: number | null }
  | { type: "NUMERICAL" | "CALCULATION"; unitHint: string | null; answerPrefix: string | null; expectsWorking: boolean }
  | { type: "MATCHING"; left: { id: string; content: string }[]; right: { id: string; content: string }[] }
  | { type: "FILL_IN_THE_BLANK"; template: string; blanks: { id: string; input: "text" | "number" | "select"; choices: string[] | null }[] }
  | {
      type: "DIAGRAM_LABELLING";
      mediaAssetId: string;
      labels: { id: string; text: string }[] | null;
      hotspots: { id: string; x: number; y: number; w: number | null; h: number | null }[];
    }
  | { type: "ESSAY" | "EXTENDED_RESPONSE"; wordLimit: { min: number | null; max: number | null } | null }
  | { type: "STRUCTURED" };

export interface StudentQuestionView {
  id: string;
  type: QuestionType;
  /** Lets the UI label results "AI-marked" / "teacher-marked"; not sensitive. */
  markingMode: MarkingMode;
  marks: number;
  partLabel: string | null;
  /** Markdown + LaTeX source (for clients that render themselves, e.g. WhatsApp plain text). */
  stem: string;
  /** Pipeline HTML of the stem, when cached. */
  stemHtml: string | null;
  /** Pipeline HTML of payload fragments (matching items, labels), keyed as in `renderedHtml.payload`. */
  payloadHtml: Record<string, string> | null;
  interaction: StudentInteraction;
  /** Number of hints available; the texts are fetched one at a time (§10, §14). */
  hintCount: number;
  calculatorAllowed: boolean | null;
  estimatedSeconds: number | null;
  /** STRUCTURED parts (each its own view), ordered by partOrder. */
  parts: StudentQuestionView[];
}

export interface StudentViewOptions {
  /**
   * Seed for shuffling, e.g. `${attemptId}:${position}` so an attempt always shows the same order on reload.
   * Defaults to the question id (stable, but identical for every student).
   */
  shuffleSeed?: string | number;
}

interface RenderedHtmlCache {
  stem: string | null;
  options: Record<string, string>;
  payload: Record<string, string> | null;
  explanation: string | null;
  workedSolution: string | null;
  conceptSummary: string | null;
}

function stringRecord(value: unknown): Record<string, string> | null {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return null;
  const out: Record<string, string> = {};
  for (const [key, v] of Object.entries(value)) if (typeof v === "string") out[key] = v;
  return out;
}

/** Reads `Question.renderedHtml` defensively (only string values survive). */
function readRenderedHtml(value: unknown): RenderedHtmlCache {
  const record = typeof value === "object" && value !== null && !Array.isArray(value) ? (value as Record<string, unknown>) : {};
  const str = (key: string) => (typeof record[key] === "string" ? (record[key] as string) : null);
  return {
    stem: str("stem"),
    options: stringRecord(record.options) ?? {},
    payload: stringRecord(record.payload),
    explanation: str("explanation"),
    workedSolution: str("workedSolution"),
    conceptSummary: str("conceptSummary"),
  };
}

function interactionFor(question: QuestionRecord, seed: string, html: RenderedHtmlCache): StudentInteraction {
  switch (question.type) {
    case "MULTIPLE_CHOICE": {
      const payload = parseQuestionPayload("MULTIPLE_CHOICE", question.payload);
      const ordered = [...(question.options ?? [])].sort(
        (a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0) || (a.key < b.key ? -1 : a.key > b.key ? 1 : 0),
      );
      const shown = payload.shuffleOptions ? seededShuffle(ordered, `${seed}:options`) : ordered;
      return {
        type: "MULTIPLE_CHOICE",
        selectMode: payload.selectMode,
        // Whitelisted fields only: never isCorrect / rationale.
        options: shown.map((o) => ({ key: o.key, content: o.content, mediaAssetId: o.mediaAssetId ?? null, html: html.options[o.key] ?? null })),
      };
    }
    case "TRUE_FALSE":
      return { type: "TRUE_FALSE", statementStyle: parseQuestionPayload("TRUE_FALSE", question.payload).statementStyle };
    case "SHORT_ANSWER":
      return { type: "SHORT_ANSWER", maxLength: parseQuestionPayload("SHORT_ANSWER", question.payload).maxLength ?? null };
    case "NUMERICAL":
    case "CALCULATION": {
      const payload = parseQuestionPayload(question.type, question.payload);
      return {
        type: question.type,
        unitHint: payload.unitHint ?? null,
        answerPrefix: payload.answerPrefix ?? null,
        expectsWorking: question.type === "CALCULATION",
      };
    }
    case "MATCHING": {
      const payload = parseQuestionPayload("MATCHING", question.payload);
      const left = payload.left.map((i) => ({ id: i.id, content: i.content }));
      const right = payload.right.map((i) => ({ id: i.id, content: i.content }));
      return { type: "MATCHING", left, right: payload.shuffle ? seededShuffle(right, `${seed}:right`) : right };
    }
    case "FILL_IN_THE_BLANK": {
      const payload = parseQuestionPayload("FILL_IN_THE_BLANK", question.payload);
      return {
        type: "FILL_IN_THE_BLANK",
        template: payload.template,
        blanks: payload.blanks.map((b) => ({ id: b.id, input: b.input, choices: b.choices ? [...b.choices] : null })),
      };
    }
    case "DIAGRAM_LABELLING": {
      const payload = parseQuestionPayload("DIAGRAM_LABELLING", question.payload);
      const labels = payload.labels ? payload.labels.map((l) => ({ id: l.id, text: l.text })) : null;
      return {
        type: "DIAGRAM_LABELLING",
        mediaAssetId: payload.mediaAssetId,
        labels: labels && payload.shuffleLabels ? seededShuffle(labels, `${seed}:labels`) : labels,
        hotspots: payload.hotspots.map((h) => ({ id: h.id, x: h.x, y: h.y, w: h.w ?? null, h: h.h ?? null })),
      };
    }
    case "ESSAY":
    case "EXTENDED_RESPONSE": {
      const limit = parseQuestionPayload(question.type, question.payload).wordLimit;
      return { type: question.type, wordLimit: limit ? { min: limit.min ?? null, max: limit.max ?? null } : null };
    }
    case "STRUCTURED":
      parseQuestionPayload("STRUCTURED", question.payload);
      return { type: "STRUCTURED" };
  }
}

/**
 * Projects a question (and its parts) into the client-safe {@link StudentQuestionView}. Throws a `ZodError` when the
 * stored payload is invalid (a broken question must not be shown; callers log and skip it).
 */
export function toStudentView(question: QuestionRecord, options: StudentViewOptions = {}): StudentQuestionView {
  const seed = `${options.shuffleSeed ?? question.id}:${question.id}`;
  const html = readRenderedHtml(question.renderedHtml);
  return {
    id: question.id,
    type: question.type,
    markingMode: question.markingMode,
    marks: question.marks,
    partLabel: question.partLabel ?? null,
    stem: question.stem,
    stemHtml: html.stem,
    payloadHtml: html.payload,
    interaction: interactionFor(question, seed, html),
    hintCount: question.hints?.length ?? 0,
    calculatorAllowed: question.calculatorAllowed ?? null,
    estimatedSeconds: question.estimatedSeconds ?? null,
    parts: [...(question.parts ?? [])]
      .sort((a, b) => (a.partOrder ?? 0) - (b.partOrder ?? 0))
      .map((part) => toStudentView(part, { shuffleSeed: options.shuffleSeed ?? question.id })),
  };
}

// ---------------------------------------------------------------------------------------------------------------
// Answer reveal (after submission)
// ---------------------------------------------------------------------------------------------------------------

export interface AnswerReveal {
  questionId: string;
  partLabel: string | null;
  /** See `formatCorrectAnswer`; null for open responses or an invalid spec. */
  correctAnswerDisplay: string | null;
  explanation: string | null;
  workedSolution: string | null;
  conceptSummary: string | null;
  relatedLessonId: string | null;
  /** Pipeline HTML of explanation / worked solution / concept summary when cached. */
  html: { explanation: string | null; workedSolution: string | null; conceptSummary: string | null };
  /** MCQ: every option with its key flag and rationale. */
  options: { key: string; isCorrect: boolean; rationale: string | null }[];
  /** Open responses / short answers with a scheme: our own mark scheme and model answer. */
  markScheme: MarkScheme | null;
  modelAnswer: string | null;
  /** CALCULATION: method marks. */
  methodMarks: { id: string; description: string; marks: number }[];
  parts: AnswerReveal[];
}

/** Everything a student may see once the answer is marked (§10). Never throws: an invalid spec reveals no answer. */
export function toAnswerReveal(question: QuestionRecord): AnswerReveal {
  const html = readRenderedHtml(question.renderedHtml);
  const payload = safeParseQuestionPayload(question.type, question.payload);
  const spec = safeParseAnswerSpec(question.type, question.answerSpec);
  let correctAnswerDisplay: string | null = null;
  let markScheme: MarkScheme | null = null;
  let modelAnswer: string | null = null;
  let methodMarks: AnswerReveal["methodMarks"] = [];
  if (payload.success && spec.success && question.type !== "STRUCTURED") {
    correctAnswerDisplay = formatCorrectAnswer(question.type, payload.data, spec.data, question.options ?? []);
    const data = spec.data as { markScheme?: MarkScheme; modelAnswer?: string; methodMarks?: AnswerReveal["methodMarks"] };
    markScheme = data.markScheme ?? null;
    modelAnswer = data.modelAnswer ?? null;
    methodMarks = data.methodMarks?.map((m) => ({ id: m.id, description: m.description, marks: m.marks })) ?? [];
  }
  return {
    questionId: question.id,
    partLabel: question.partLabel ?? null,
    correctAnswerDisplay,
    explanation: question.explanation ?? null,
    workedSolution: question.workedSolution ?? null,
    conceptSummary: question.conceptSummary ?? null,
    relatedLessonId: question.relatedLessonId ?? null,
    html: { explanation: html.explanation, workedSolution: html.workedSolution, conceptSummary: html.conceptSummary },
    options: [...(question.options ?? [])]
      .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
      .map((o) => ({ key: o.key, isCorrect: o.isCorrect, rationale: o.rationale ?? null })),
    markScheme,
    modelAnswer,
    methodMarks,
    parts: [...(question.parts ?? [])].sort((a, b) => (a.partOrder ?? 0) - (b.partOrder ?? 0)).map((part) => toAnswerReveal(part)),
  };
}
