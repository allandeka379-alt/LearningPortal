// The zod-free constants module, not the `@/lib/questions` barrel: this model runs in the browser (CMS and teacher
// editors), and the barrel's Zod schemas would add ~90 kB gzip to those pages.
import { BLANK_PLACEHOLDER, type MarkingMode, type QuestionType } from "@/lib/questions/constants";
import type { QuestionEditorInput, QuestionOptionInput, QuestionPartInput } from "@/server/cms/questions/schemas";

/**
 * Pure editing helpers of the question editor (client-safe, unit tested in model.test.ts): templates per type, part
 * labels, ids, list/line conversion, blank synchronisation and the JSON clean-up that keeps payloads and answer specs
 * valid for the strict `@/lib/questions` schemas (optional keys are OMITTED, never null).
 */

export type Json = Record<string, unknown>;

/** A part or sub-part as edited (sub-parts have no `parts`). */
export type PartDraft = QuestionPartInput;

/** The fields every definition (root, part, sub-part) has. */
export interface DefinitionDraft {
  type: QuestionType;
  markingMode: MarkingMode;
  marks: number;
  payload: unknown;
  answerSpec: unknown;
  options?: QuestionOptionInput[];
  parts?: PartDraft[];
}

export function asRecord(value: unknown): Json {
  return typeof value === "object" && value !== null && !Array.isArray(value) ? (value as Json) : {};
}

export function asArray<T = Json>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

/** Drops undefined, null, empty strings and empty arrays (strict schemas accept missing optionals, not nulls). */
export function compact(record: Json): Json {
  const out: Json = {};
  for (const [key, value] of Object.entries(record)) {
    if (value === undefined || value === null || value === "") continue;
    if (Array.isArray(value) && value.length === 0) continue;
    out[key] = value;
  }
  return out;
}

/** A number typed into a text box ("", "1.5", "-2") → number | undefined. */
export function parseNumber(text: string): number | undefined {
  const trimmed = text.trim();
  if (trimmed === "") return undefined;
  const value = Number(trimmed);
  return Number.isFinite(value) ? value : undefined;
}

/** Whole number or undefined. */
export function parseWhole(text: string): number | undefined {
  const value = parseNumber(text);
  return value !== undefined && Number.isInteger(value) ? value : undefined;
}

/** One entry per non-empty line. */
export function linesToList(text: string): string[] {
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line !== "");
}

export function listToLines(list: readonly unknown[] | undefined): string {
  return (list ?? []).filter((v): v is string => typeof v === "string").join("\n");
}

/** `${prefix}1`, `${prefix}2`… — the first id not in `taken`. */
export function nextId(prefix: string, taken: Iterable<string>): string {
  const used = new Set(taken);
  for (let n = 1; n < 10_000; n += 1) if (!used.has(`${prefix}${n}`)) return `${prefix}${n}`;
  return `${prefix}${Date.now()}`;
}

const LETTERS = "abcdefghijklmnopqrstuvwxyz";
const ROMAN = ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix", "x", "xi", "xii", "xiii", "xiv", "xv", "xvi", "xvii", "xviii", "xix", "xx"];

/** "(a)", "(b)"… for parts; "(i)", "(ii)"… for sub-parts — the first label not used yet. */
export function nextPartLabel(existing: readonly string[], level: 1 | 2): string {
  const used = new Set(existing.map((label) => label.trim()));
  const pool = level === 1 ? LETTERS.split("") : ROMAN;
  for (const symbol of pool) if (!used.has(`(${symbol})`)) return `(${symbol})`;
  return `(${existing.length + 1})`;
}

/** Default definition of a new question (or part) of `type`: valid shapes with placeholders to fill in. */
export function templateFor(type: QuestionType): Pick<DefinitionDraft, "markingMode" | "marks" | "payload" | "answerSpec" | "options" | "parts"> {
  switch (type) {
    case "MULTIPLE_CHOICE":
      return {
        markingMode: "AUTO",
        marks: 1,
        payload: { selectMode: "single", shuffleOptions: true },
        answerSpec: { scoring: "all_or_nothing" },
        options: [
          { key: "A", content: "", isCorrect: true },
          { key: "B", content: "", isCorrect: false },
          { key: "C", content: "", isCorrect: false },
          { key: "D", content: "", isCorrect: false },
        ],
        parts: [],
      };
    case "TRUE_FALSE":
      return { markingMode: "AUTO", marks: 1, payload: { statementStyle: "true_false" }, answerSpec: { correct: true }, options: [], parts: [] };
    case "SHORT_ANSWER":
      return { markingMode: "AUTO", marks: 1, payload: null, answerSpec: { accepted: [{ value: "" }] }, options: [], parts: [] };
    case "NUMERICAL":
      return { markingMode: "AUTO", marks: 1, payload: null, answerSpec: { value: 0 }, options: [], parts: [] };
    case "CALCULATION":
      return {
        markingMode: "AI_ASSISTED",
        marks: 2,
        payload: null,
        answerSpec: { value: 0, methodMarks: [{ id: "M1", description: "", marks: 1 }] },
        options: [],
        parts: [],
      };
    case "MATCHING":
      return {
        markingMode: "AUTO",
        marks: 2,
        payload: {
          left: [
            { id: "l1", content: "" },
            { id: "l2", content: "" },
          ],
          right: [
            { id: "r1", content: "" },
            { id: "r2", content: "" },
          ],
          shuffle: true,
        },
        answerSpec: {
          pairs: [
            { leftId: "l1", rightId: "r1" },
            { leftId: "l2", rightId: "r2" },
          ],
          marksPerPair: 1,
        },
        options: [],
        parts: [],
      };
    case "FILL_IN_THE_BLANK":
      return {
        markingMode: "AUTO",
        marks: 1,
        payload: { template: "Complete: {{blank:b1}}.", blanks: [{ id: "b1", input: "text" }] },
        answerSpec: { blanks: [{ id: "b1", accepted: [""] }] },
        options: [],
        parts: [],
      };
    case "DIAGRAM_LABELLING":
      return {
        markingMode: "AUTO",
        marks: 1,
        payload: { mediaAssetId: "", labels: [{ id: "L1", text: "" }], hotspots: [], shuffleLabels: true },
        answerSpec: { hotspots: [] },
        options: [],
        parts: [],
      };
    case "ESSAY":
    case "EXTENDED_RESPONSE":
      return {
        markingMode: "AI_ASSISTED",
        marks: type === "ESSAY" ? 10 : 6,
        payload: null,
        answerSpec: { markScheme: { points: [{ id: "P1", description: "", marks: 2 }] } },
        options: [],
        parts: [],
      };
    case "STRUCTURED":
      return {
        markingMode: "AUTO",
        marks: 2,
        payload: null,
        answerSpec: null,
        options: [],
        parts: [newPart("(a)", "SHORT_ANSWER"), newPart("(b)", "NUMERICAL")],
      };
  }
}

/** A new part of `type` with its template. */
export function newPart(partLabel: string, type: QuestionType): PartDraft {
  const template = templateFor(type === "STRUCTURED" ? "SHORT_ANSWER" : type);
  return {
    partLabel,
    type,
    stem: "",
    markingMode: template.markingMode,
    marks: template.marks,
    payload: template.payload,
    answerSpec: template.answerSpec,
    options: template.options ?? [],
    explanation: null,
    workedSolution: null,
    hints: [],
    parts: type === "STRUCTURED" ? [newSubPart("(i)", "SHORT_ANSWER"), newSubPart("(ii)", "SHORT_ANSWER")] : [],
  };
}

/** A new sub-part ("(b)(i)"); sub-parts cannot be structured themselves. */
export function newSubPart(partLabel: string, type: QuestionType): PartDraft {
  return { ...newPart(partLabel, type === "STRUCTURED" ? "SHORT_ANSWER" : type), parts: [] };
}

/** A fresh editor document for a new question. */
export function newDocument(type: QuestionType, subjectId: string, defaults: Partial<QuestionEditorInput> = {}): QuestionEditorInput {
  const template = templateFor(type);
  return {
    subjectId,
    type,
    stem: "",
    ...template,
    options: template.options ?? [],
    parts: template.parts ?? [],
    explanation: null,
    workedSolution: null,
    conceptSummary: null,
    hints: [],
    relatedLessonId: null,
    difficulty: 3,
    estimatedSeconds: null,
    year: null,
    paperLabel: null,
    cognitiveSkill: null,
    isExamStyle: false,
    isDailyEligible: false,
    calculatorAllowed: null,
    accessTier: "PREMIUM",
    languageCode: "en",
    topics: [],
    objectiveIds: [],
    sourceId: null,
    author: null,
    copyrightStatus: "OWNED",
    licenceCode: null,
    attribution: null,
    sourceUrl: null,
    publicationDate: null,
    ...defaults,
  };
}

/** Changes the type of a definition, starting the answer over from the new type's template (marks kept). */
export function withType<T extends DefinitionDraft>(draft: T, type: QuestionType, level: 0 | 1 | 2): T {
  const effective = level === 2 && type === "STRUCTURED" ? "SHORT_ANSWER" : type;
  const template = templateFor(effective);
  const parts = effective === "STRUCTURED" ? (level === 0 ? template.parts : [newSubPart("(i)", "SHORT_ANSWER"), newSubPart("(ii)", "SHORT_ANSWER")]) : [];
  return {
    ...draft,
    type: effective,
    markingMode: template.markingMode,
    payload: template.payload,
    answerSpec: template.answerSpec,
    options: template.options ?? [],
    ...(level < 2 ? { parts } : {}),
    marks: effective === "STRUCTURED" ? draft.marks : draft.marks || template.marks,
  };
}

/** Total of parts (the service keeps a structured question worth exactly that). */
export function partsTotal(parts: readonly { marks: number; type: QuestionType; parts?: readonly { marks: number }[] }[]): number {
  return parts.reduce((sum, part) => sum + (part.type === "STRUCTURED" && part.parts && part.parts.length > 0 ? part.parts.reduce((s, p) => s + p.marks, 0) : part.marks), 0);
}

/** Blank ids of a template, in order of appearance (first occurrence). */
export function templateBlankIds(template: string): string[] {
  const ids: string[] = [];
  for (const match of template.matchAll(new RegExp(BLANK_PLACEHOLDER.source, "g"))) {
    const id = match[1] as string;
    if (!ids.includes(id)) ids.push(id);
  }
  return ids;
}

/**
 * Keeps the blank definitions (payload) and their answers (spec) in step with the template: one entry per blank in
 * template order, existing entries kept, new blanks get defaults, removed blanks are dropped.
 */
export function syncBlanks(template: string, payloadBlanks: readonly Json[], specBlanks: readonly Json[]): { payload: Json[]; spec: Json[] } {
  const ids = templateBlankIds(template);
  const payloadById = new Map(payloadBlanks.map((b) => [String(b.id), b]));
  const specById = new Map(specBlanks.map((b) => [String(b.id), b]));
  return {
    payload: ids.map((id) => payloadById.get(id) ?? { id, input: "text" }),
    spec: ids.map((id) => specById.get(id) ?? { id, accepted: [""] }),
  };
}

/** Field errors for `path` and the paths below it (e.g. all errors of an option row). */
export function errorsUnder(errors: Readonly<Record<string, readonly string[]>> | undefined, path: string, exact = true): string[] {
  if (!errors) return [];
  if (exact) return [...(errors[path] ?? [])];
  return Object.entries(errors)
    .filter(([key]) => key === path || key.startsWith(`${path}.`))
    .flatMap(([, messages]) => messages);
}
