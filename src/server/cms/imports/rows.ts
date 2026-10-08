import type { z } from "zod";
import type { ContentAccessTier, FlashcardType, LessonKind, TopicKind } from "@/generated/prisma/enums";
import { defaultChildKind, topicPlacementProblem } from "@/server/cms/curriculum/core";
import { slugify as lessonSlugify } from "@/server/cms/lessons/core";
import { definitionReport, normaliseEditorDocument } from "@/server/cms/questions/core";
import { questionEditorSchema, type QuestionEditorData } from "@/server/cms/questions/schemas";
import { MAX_IMPORT_ROWS, type ImportEntityType, type ImportIssue, type ImportIssueCode } from "./constants";
import type { JsonRecord, ParsedImportFile, TableRecord } from "./formats";
import { normalizeHeader } from "./formats";
import {
  columnIndex,
  IMPORT_COLUMNS,
  IMPORT_ITEM_SCHEMAS,
  type ColumnSpec,
  type FlashcardImportItem,
  type LessonImportItem,
  topicNodeImportSchema,
  type QuestionImportItem,
  type TopicNodeImportItem,
} from "./items";

/**
 * The dry run of an import (§25), as pure functions: records → items (spreadsheet cells coerced per column) → schema
 * validation → content rules → DB-ready DRAFT inputs, with every problem reported against its row and field.
 * Database lookups (topic codes, objective codes, existing external references) and the Markdown renderer are passed
 * in as {@link ImportLookups}, so these rules are unit tested without a database (CLAUDE.md rule 2).
 *
 * Question items become the question editor's own document and go through the same checks as the editor
 * (`questionEditorSchema`, `validateQuestionDefinition`), so an import can never create a question the editor would
 * consider broken.
 */

// =====================================================================================================================
// Lookups and prepared rows
// =====================================================================================================================

export interface TopicTarget {
  id: string;
  kind: TopicKind;
  depth: number;
  path: string;
  name: string;
}

export type MarkdownMode = "block" | "inline" | "card" | "lesson";

export interface ImportLookups {
  subject: { id: string; languageCode: string };
  /** The import's syllabus version (topic and objective codes resolve in it). */
  syllabus: { id: string; label: string } | null;
  /** Lower-cased topic code AND slug → topic; `null` when a code is shared by several topics (ambiguous). */
  topicRefs: ReadonlyMap<string, TopicTarget | null>;
  /** Lower-cased objective code → objective ids with that code. */
  objectiveRefs: ReadonlyMap<string, readonly string[]>;
  /** External references already used by other rows of this content type (lower-cased). */
  existingRefs: ReadonlySet<string>;
  defaults: { difficulty: number; accessTier: ContentAccessTier };
  provenance: { sourceId: string; author: string | null; licenceCode: string | null; attribution: string | null; sourceUrl: string | null };
  /** Blocking render problems of a Markdown field (empty when it renders cleanly). */
  checkMarkdown: (source: string, mode: MarkdownMode) => string[];
}

export interface PreparedQuestion {
  entityType: "QUESTION";
  row: number;
  externalRef: string | null;
  doc: QuestionEditorData;
}

export interface PreparedFlashcard {
  entityType: "FLASHCARD";
  row: number;
  externalRef: string | null;
  cardType: FlashcardType;
  front: string;
  back: string;
  notes: string | null;
  accessTier: ContentAccessTier;
  topicId: string | null;
}

export interface PreparedLesson {
  entityType: "LESSON";
  row: number;
  externalRef: string | null;
  title: string;
  slugBase: string;
  kind: LessonKind;
  summary: string | null;
  body: string;
  estimatedMinutes: number;
  accessTier: ContentAccessTier;
  metaTitle: string | null;
  metaDescription: string | null;
  topicIds: string[];
  primaryTopicId: string | null;
  objectiveIds: string[];
}

export interface PreparedTopic {
  entityType: "TOPIC";
  row: number;
  /** Row-based key used by children rows of the same file. */
  key: string;
  /** Parent row of this file, if any. */
  parentKey: string | null;
  /** Existing parent topic of the version, if any. */
  parentTopicId: string | null;
  kind: TopicKind;
  code: string | null;
  name: string;
  description: string | null;
  objectives: { code: string | null; statement: string }[];
  estimatedStudyMinutes: number | null;
  isOptional: boolean;
  optionGroup: string | null;
}

export type PreparedRow = PreparedQuestion | PreparedFlashcard | PreparedLesson | PreparedTopic;

export interface DryRunResult {
  totalRows: number;
  validRows: number;
  failedRows: number;
  prepared: PreparedRow[];
  issues: ImportIssue[];
}

// =====================================================================================================================
// Helpers
// =====================================================================================================================

function issue(row: number, code: ImportIssueCode, message: string, field?: string, severity: ImportIssue["severity"] = "error"): ImportIssue {
  return field === undefined ? { row, code, message, severity } : { row, field, code, message, severity };
}

function lower(value: string): string {
  return value.trim().toLowerCase();
}

/**
 * Splits a list cell into values: on line breaks when the cell has them, otherwise on `|` characters outside `$…$`
 * maths (so `$|x|$` survives). Blank values are dropped.
 */
export function splitListCell(cell: string): string[] {
  const text = cell.replace(/\r\n?/g, "\n");
  if (text.includes("\n")) return text.split("\n").map((part) => part.trim()).filter((part) => part !== "");
  const parts: string[] = [];
  let current = "";
  let inMath = false;
  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i] as string;
    if (ch === "\\" && i + 1 < text.length) {
      current += ch + (text[i + 1] as string);
      i += 1;
      continue;
    }
    if (ch === "$") inMath = !inMath;
    if (ch === "|" && !inMath) {
      parts.push(current);
      current = "";
      continue;
    }
    current += ch;
  }
  parts.push(current);
  return parts.map((part) => part.trim()).filter((part) => part !== "");
}

const TRUE_WORDS = new Set(["true", "t", "yes", "y", "1"]);
const FALSE_WORDS = new Set(["false", "f", "no", "n", "0"]);

export function parseBooleanText(value: string): boolean | null {
  const word = value.trim().toLowerCase();
  if (TRUE_WORDS.has(word)) return true;
  if (FALSE_WORDS.has(word)) return false;
  return null;
}

const ENUM_FIELDS = new Set(["type", "markingMode", "cardType", "accessTier", "kind", "cognitiveSkill"]);
const ENUM_ALIASES: Readonly<Record<string, string>> = {
  MCQ: "MULTIPLE_CHOICE",
  MULTIPLE_CHOICE_QUESTION: "MULTIPLE_CHOICE",
  TF: "TRUE_FALSE",
  TRUE_OR_FALSE: "TRUE_FALSE",
  SHORT: "SHORT_ANSWER",
  NUMERIC: "NUMERICAL",
  NUMBER: "NUMERICAL",
  EXTENDED: "EXTENDED_RESPONSE",
  FILL_IN_BLANK: "FILL_IN_THE_BLANK",
  FILL_IN_THE_BLANKS: "FILL_IN_THE_BLANK",
  AI: "AI_ASSISTED",
  SUB_TOPIC: "SUBTOPIC",
};

/** "multiple choice" / "Multiple-Choice" / "mcq" → "MULTIPLE_CHOICE" (enum-ish fields only). */
export function normalizeEnumText(value: string): string {
  const upper = value.trim().toUpperCase().replace(/[\s/-]+/g, "_");
  return ENUM_ALIASES[upper] ?? upper;
}

function normalizeEnums(item: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = { ...item };
  for (const key of Object.keys(out)) {
    const value = out[key];
    if (ENUM_FIELDS.has(key) && typeof value === "string") out[key] = normalizeEnumText(value);
  }
  return out;
}

const OBJECTIVE_CODE_PREFIX = /^([A-Za-z]{0,3}\d[A-Za-z0-9.]{0,30}):\s+(\S[\s\S]*)$/;

/** "E1.1a: Identify integers" → { code: "E1.1a", statement: "Identify integers" }. */
export function splitObjectiveCode(text: string): { code: string | null; statement: string } {
  const match = OBJECTIVE_CODE_PREFIX.exec(text.trim());
  if (match?.[1] && match[2]) return { code: match[1], statement: match[2].trim() };
  return { code: null, statement: text.trim() };
}

/** Zod issues of an item → import issues, with the spreadsheet header as the field when the row came from one. */
function zodIssues(row: number, error: z.ZodError, entityType: ImportEntityType, fromTable: boolean, prefix: (string | number)[] = []): ImportIssue[] {
  return error.issues.slice(0, 20).map((zi) => {
    const path = [...prefix, ...zi.path.map((p) => (typeof p === "symbol" ? String(p) : p))];
    const field = fromTable ? tableFieldLabel(entityType, path) : path.join(".");
    const unknownKeys = zi.code === "unrecognized_keys" ? ` (${(zi as { keys?: string[] }).keys?.join(", ") ?? ""})` : "";
    const code: ImportIssueCode = zi.code === "invalid_type" && zi.message.toLowerCase().includes("undefined") ? "REQUIRED" : "INVALID";
    return issue(row, code, `${zi.message}${unknownKeys}`, field || undefined);
  });
}

/** Field path → spreadsheet header (`options.1.content` → `option_b`). */
function tableFieldLabel(entityType: ImportEntityType, path: readonly (string | number)[]): string {
  const [first, second] = path;
  if (first === "options" && typeof second === "number") return `option_${String.fromCharCode(97 + second)}`;
  const column = IMPORT_COLUMNS[entityType].find((spec) => spec.field === first);
  return column ? column.header : path.join(".");
}

// =====================================================================================================================
// Spreadsheet record → item
// =====================================================================================================================

/** Headers of a sheet the importer does not know (reported once, as warnings on row 1). */
export function unknownColumnIssues(entityType: ImportEntityType, headers: readonly string[]): ImportIssue[] {
  const index = columnIndex(entityType);
  return headers
    .filter((header) => !index.has(header))
    .map((header) => issue(1, "UNKNOWN_COLUMN", `The column "${header}" is not part of the ${entityType.toLowerCase()} template and was ignored.`, header, "warning"));
}

function coerceCell(spec: ColumnSpec, raw: string): { value?: unknown; problem?: string } {
  const text = raw.trim();
  switch (spec.kind) {
    case "text":
    case "answer":
      return { value: text };
    case "markdown":
      return { value: raw.replace(/\r\n?/g, "\n").trim() };
    case "int":
      return /^[+-]?\d+(\.0+)?$/.test(text) ? { value: Number.parseInt(text, 10) } : { problem: "Must be a whole number." };
    case "number": {
      const normalised = text.replace(/\s+/g, "");
      return /^[+-]?(\d+\.?\d*|\.\d+)([eE][+-]?\d+)?$/.test(normalised) ? { value: Number(normalised) } : { problem: "Must be a number (use a dot for decimals)." };
    }
    case "bool": {
      const parsed = parseBooleanText(text);
      return parsed === null ? { problem: "Use true or false." } : { value: parsed };
    }
    case "list":
      return { value: splitListCell(raw) };
    case "keys":
      return { value: text.split(/[\s,;|]+/).filter((key) => key !== "").map((key) => key.toUpperCase()) };
    case "json":
      try {
        const parsed: unknown = JSON.parse(text);
        if (parsed !== null && (typeof parsed !== "object" || Array.isArray(parsed))) return { problem: "Must be a JSON object." };
        return { value: parsed };
      } catch {
        return { problem: "Must be valid JSON." };
      }
    case "option":
      return { value: raw.replace(/\r\n?/g, "\n").trim() };
  }
}

/** Converts one spreadsheet row into the entity's JSON item shape (cells coerced; problems per column). */
export function tableRecordToItem(entityType: ImportEntityType, record: TableRecord): { item: Record<string, unknown>; issues: ImportIssue[] } {
  const index = columnIndex(entityType);
  const item: Record<string, unknown> = {};
  const issues: ImportIssue[] = [];
  const options: { key: string; content: string }[] = [];
  for (const [header, raw] of Object.entries(record.values)) {
    const spec = index.get(header);
    if (!spec) continue;
    const { value, problem } = coerceCell(spec, raw);
    if (problem) {
      issues.push(issue(record.row, "INVALID", problem, spec.header));
      continue;
    }
    if (spec.kind === "option" && spec.optionKey && typeof value === "string") {
      options.push({ key: spec.optionKey, content: value });
      continue;
    }
    item[spec.field] = value;
  }
  if (options.length > 0) item.options = options.sort((a, b) => a.key.localeCompare(b.key));
  if (entityType === "TOPIC" && Array.isArray(item.objectives)) {
    item.objectives = (item.objectives as string[]).map((text) => {
      const split = splitObjectiveCode(text);
      return split.code ? { code: split.code, statement: split.statement } : split.statement;
    });
  }
  if (entityType === "FLASHCARD" && Array.isArray(item.topic)) item.topic = (item.topic as string[])[0];
  return { item, issues };
}

// =====================================================================================================================
// Curriculum references
// =====================================================================================================================

function resolveTopicRefs(
  row: number,
  refs: readonly string[],
  lookups: ImportLookups,
  field: string,
  issues: ImportIssue[],
): TopicTarget[] {
  if (refs.length === 0) return [];
  if (!lookups.syllabus) {
    issues.push(issue(row, "REFERENCE", "Choose a syllabus version for this import so topic codes can be matched.", field));
    return [];
  }
  const out: TopicTarget[] = [];
  for (const ref of refs) {
    const target = lookups.topicRefs.get(lower(ref));
    if (target === undefined) issues.push(issue(row, "REFERENCE", `No topic "${ref}" in ${lookups.syllabus.label}. Use a topic code or slug from that version.`, field));
    else if (target === null) issues.push(issue(row, "REFERENCE", `"${ref}" matches several topics in ${lookups.syllabus.label}. Use the topic's slug instead.`, field));
    else if (!out.some((t) => t.id === target.id)) out.push(target);
  }
  return out;
}

function resolveObjectiveRefs(row: number, refs: readonly string[], lookups: ImportLookups, field: string, issues: ImportIssue[]): string[] {
  if (refs.length === 0) return [];
  if (!lookups.syllabus) {
    issues.push(issue(row, "REFERENCE", "Choose a syllabus version for this import so objective codes can be matched.", field));
    return [];
  }
  const ids: string[] = [];
  for (const ref of refs) {
    const found = lookups.objectiveRefs.get(lower(ref)) ?? [];
    if (found.length === 0) issues.push(issue(row, "REFERENCE", `No learning objective with code "${ref}" in ${lookups.syllabus.label}.`, field));
    else if (found.length > 1) issues.push(issue(row, "REFERENCE", `The objective code "${ref}" is used ${found.length} times in ${lookups.syllabus.label}; it cannot be matched.`, field));
    else if (found[0] && !ids.includes(found[0])) ids.push(found[0]);
  }
  return ids;
}

function checkFields(row: number, lookups: ImportLookups, fields: readonly [string, string | null | undefined, MarkdownMode][], issues: ImportIssue[]): void {
  for (const [field, source, mode] of fields) {
    if (!source) continue;
    for (const message of lookups.checkMarkdown(source, mode)) issues.push(issue(row, "CONTENT", message, field));
  }
}

function externalRefIssue(row: number, ref: string | undefined, lookups: ImportLookups, seen: Map<string, number>, field: string): ImportIssue | null {
  if (!ref) return null;
  const key = lower(ref);
  const first = seen.get(key);
  if (first !== undefined) return issue(row, "DUPLICATE", `The reference "${ref}" is already used by row ${first} of this file.`, field);
  seen.set(key, row);
  if (lookups.existingRefs.has(key)) {
    return issue(row, "DUPLICATE", `Already imported: an item with reference "${ref}" exists. It was not changed (published content is only edited through a draft copy).`, field);
  }
  return null;
}

// =====================================================================================================================
// Questions
// =====================================================================================================================

const MARKS_SUFFIX = /\s*\[(\d{1,4})\]\s*$/;

/** "Defines osmosis [2]" → { description: "Defines osmosis", marks: 2 }. */
export function parseMarkSchemeLine(line: QuestionImportItem["markScheme"] extends (infer L)[] | undefined ? L : never): { description: string; marks: number } {
  if (typeof line !== "string") return { description: line.description.trim(), marks: line.marks };
  const match = MARKS_SUFFIX.exec(line);
  return match?.[1] ? { description: line.slice(0, match.index).trim(), marks: Math.max(1, Number.parseInt(match[1], 10)) } : { description: line.trim(), marks: 1 };
}

function answerList(item: QuestionImportItem): string[] {
  if (item.acceptedAnswers) return item.acceptedAnswers.map((value) => value.trim()).filter((value) => value !== "");
  if (typeof item.answer === "string") return splitListCell(item.answer);
  if (typeof item.answer === "number") return [String(item.answer)];
  return [];
}

/**
 * Builds the question editor document (payload, answer spec, options) of an item from the convenience fields
 * (options + correct keys, answer, tolerance, units, mark scheme). Explicit `payload` / `answerSpec` win.
 * Returns the raw editor input (validated afterwards by `questionEditorSchema`) and conversion problems.
 */
export function buildQuestionInput(item: QuestionImportItem, lookups: ImportLookups, row: number, fromTable: boolean): { input: Record<string, unknown>; issues: ImportIssue[] } {
  const issues: ImportIssue[] = [];
  const field = (name: string, header: string) => (fromTable ? header : name);
  let payload: unknown = item.payload;
  let answerSpec: unknown = item.answerSpec;
  let markingMode = item.markingMode;
  const scheme = (item.markScheme ?? []).map(parseMarkSchemeLine).map((point, index) => ({ id: `P${index + 1}`, description: point.description, marks: point.marks }));
  const schemeTotal = scheme.reduce((sum, point) => sum + point.marks, 0);

  // Options (multiple choice).
  const correctKeys = new Set((item.correct ?? []).map((key) => key.toUpperCase()));
  const options = (item.options ?? []).map((option, index) => {
    const key = (option.key?.trim() || String.fromCharCode(65 + index)).toUpperCase();
    return { key, content: option.content, isCorrect: option.isCorrect ?? correctKeys.has(key), rationale: option.rationale ?? null };
  });
  if (item.type === "MULTIPLE_CHOICE") {
    for (const key of correctKeys) {
      if (!options.some((option) => option.key === key)) issues.push(issue(row, "INVALID", `The correct option "${key}" is not one of the options.`, field("correct", "correct")));
    }
    if (payload === undefined) payload = { selectMode: options.filter((o) => o.isCorrect).length > 1 ? "multiple" : "single", shuffleOptions: false };
    if (answerSpec === undefined) answerSpec = { scoring: "all_or_nothing" };
  }

  if (answerSpec === undefined) {
    switch (item.type) {
      case "TRUE_FALSE": {
        const value = typeof item.answer === "boolean" ? item.answer : typeof item.answer === "string" ? parseBooleanText(item.answer) : null;
        if (value === null) issues.push(issue(row, "REQUIRED", "Give the answer as true or false.", field("answer", "answer")));
        else answerSpec = { correct: value };
        break;
      }
      case "SHORT_ANSWER": {
        const accepted = answerList(item).map((value) => ({ value }));
        answerSpec = { accepted, ...(scheme.length > 0 ? { markScheme: { points: scheme } } : {}) };
        if (accepted.length === 0 && scheme.length > 0) markingMode ??= "AI_ASSISTED";
        break;
      }
      case "NUMERICAL":
      case "CALCULATION": {
        const raw = typeof item.answer === "number" ? item.answer : typeof item.answer === "string" ? Number(item.answer.trim()) : Number.NaN;
        if (item.answer === undefined || (typeof item.answer === "string" && item.answer.trim() === "") || !Number.isFinite(raw)) {
          issues.push(issue(row, "REQUIRED", "Give the numerical answer as a number.", field("answer", "answer")));
          break;
        }
        const units = item.units ?? [];
        answerSpec = {
          value: raw,
          ...(item.tolerance !== undefined ? { tolerance: { kind: "absolute", amount: item.tolerance } } : {}),
          ...(units.length > 0 ? { units: { required: item.unitRequired ?? false, accepted: units } } : {}),
          ...(item.type === "CALCULATION" && scheme.length > 0 ? { methodMarks: scheme.map((point, i) => ({ id: `M${i + 1}`, description: point.description, marks: point.marks })) } : {}),
        };
        if (item.type === "CALCULATION" && scheme.length > 0) markingMode ??= "AI_ASSISTED";
        break;
      }
      case "ESSAY":
      case "EXTENDED_RESPONSE": {
        if (scheme.length === 0) {
          issues.push(issue(row, "REQUIRED", "Give at least one mark-scheme point (our own wording).", field("markScheme", "mark_scheme")));
          break;
        }
        answerSpec = { markScheme: { points: scheme }, ...(item.modelAnswer ? { modelAnswer: item.modelAnswer } : {}) };
        markingMode ??= "AI_ASSISTED";
        break;
      }
      case "STRUCTURED":
        answerSpec = null;
        break;
      default:
        issues.push(issue(row, "REQUIRED", `${item.type.toLowerCase().replace(/_/g, " ")} questions need their payload and answer spec (use the JSON format or the payload / answer_spec columns).`, field("answerSpec", "answer_spec")));
    }
  }
  if (payload === undefined) payload = null;

  const topics = resolveTopicRefs(row, [...(item.topics ?? []), ...(item.primaryTopic ? [item.primaryTopic] : [])], lookups, field("topics", "topics"), issues);
  const primary = item.primaryTopic ? topics.find((t) => t.id === lookups.topicRefs.get(lower(item.primaryTopic as string))?.id) : topics[0];
  const objectiveIds = resolveObjectiveRefs(row, item.objectives ?? [], lookups, field("objectives", "objectives"), issues);
  const { provenance } = lookups;

  const isOpen = item.type === "ESSAY" || item.type === "EXTENDED_RESPONSE";
  const input: Record<string, unknown> = {
    subjectId: lookups.subject.id,
    type: item.type,
    markingMode: markingMode ?? "AUTO",
    stem: item.stem,
    payload,
    answerSpec,
    marks: item.marks ?? (isOpen && schemeTotal > 0 ? schemeTotal : 1),
    options: item.type === "MULTIPLE_CHOICE" ? options : [],
    parts: item.parts ?? [],
    explanation: item.explanation ?? null,
    workedSolution: item.workedSolution ?? null,
    conceptSummary: item.conceptSummary ?? null,
    hints: item.hints ?? [],
    relatedLessonId: null,
    difficulty: item.difficulty ?? lookups.defaults.difficulty,
    estimatedSeconds: item.estimatedSeconds ?? null,
    year: item.year ?? null,
    paperLabel: item.paperLabel ?? null,
    cognitiveSkill: item.cognitiveSkill ?? null,
    isExamStyle: item.isExamStyle ?? false,
    isDailyEligible: false,
    calculatorAllowed: item.calculatorAllowed ?? null,
    accessTier: item.accessTier ?? lookups.defaults.accessTier,
    languageCode: lookups.subject.languageCode,
    topics: topics.map((topic) => ({ topicId: topic.id, isPrimary: topic.id === primary?.id })),
    objectiveIds,
    sourceId: provenance.sourceId,
    author: provenance.author,
    // Imports never assert copyright (§27): editors clear it per item at review.
    copyrightStatus: "UNVERIFIED",
    licenceCode: provenance.licenceCode,
    attribution: provenance.attribution,
    sourceUrl: provenance.sourceUrl,
    publicationDate: null,
  };
  return { input, issues };
}

/** Validates a question item into the editor document, or reports why it cannot be imported. */
export function prepareQuestion(item: QuestionImportItem, lookups: ImportLookups, row: number, fromTable: boolean): { prepared: PreparedQuestion | null; issues: ImportIssue[] } {
  const built = buildQuestionInput(item, lookups, row, fromTable);
  const issues = [...built.issues];
  const parsed = questionEditorSchema.safeParse(built.input);
  if (!parsed.success) {
    issues.push(...zodIssues(row, parsed.error, "QUESTION", false));
    return { prepared: null, issues };
  }
  const doc = normaliseEditorDocument(parsed.data);
  const report = definitionReport(doc);
  for (const problem of report.errors) issues.push(issue(row, "DEFINITION", problem.message, problem.path.join(".") || undefined));
  for (const problem of report.warnings) issues.push(issue(row, "DEFINITION", problem.message, problem.path.join(".") || undefined, "warning"));

  const fields: [string, string | null | undefined, MarkdownMode][] = [
    ["stem", doc.stem, "block"],
    ["explanation", doc.explanation, "block"],
    ["workedSolution", doc.workedSolution, "block"],
    ["conceptSummary", doc.conceptSummary, "block"],
    ...doc.hints.map((hint, i): [string, string, MarkdownMode] => [`hints.${i}`, hint, "block"]),
    ...doc.options.map((option, i): [string, string, MarkdownMode] => [`options.${i}.content`, option.content, "inline"]),
    ...doc.parts.flatMap((part, i): [string, string, MarkdownMode][] => [
      [`parts.${i}.stem`, part.stem, "block"],
      ...part.parts.map((sub, j): [string, string, MarkdownMode] => [`parts.${i}.parts.${j}.stem`, sub.stem, "block"]),
    ]),
  ];
  checkFields(row, lookups, fields, issues);
  const failed = issues.some((i) => i.severity === "error");
  return { prepared: failed ? null : { entityType: "QUESTION", row, externalRef: item.externalRef ?? null, doc }, issues };
}

// =====================================================================================================================
// Flashcards
// =====================================================================================================================

export function prepareFlashcard(item: FlashcardImportItem, lookups: ImportLookups, row: number, fromTable: boolean): { prepared: PreparedFlashcard | null; issues: ImportIssue[] } {
  const issues: ImportIssue[] = [];
  const topics = resolveTopicRefs(row, item.topic ? [item.topic] : [], lookups, fromTable ? "topic" : "topic", issues);
  const notes = item.notes?.trim() ? item.notes.trim() : null;
  checkFields(row, lookups, [["front", item.front, "card"], ["back", item.back, "card"], ["notes", notes, "card"]], issues);
  if (issues.some((i) => i.severity === "error")) return { prepared: null, issues };
  return {
    prepared: {
      entityType: "FLASHCARD",
      row,
      externalRef: item.externalRef ?? null,
      cardType: item.cardType ?? "CONCEPT",
      front: item.front.trim(),
      back: item.back.trim(),
      notes,
      accessTier: item.accessTier ?? lookups.defaults.accessTier,
      topicId: topics[0]?.id ?? null,
    },
    issues,
  };
}

// =====================================================================================================================
// Lessons (Markdown + front matter)
// =====================================================================================================================

/**
 * Splits `---` front matter from Markdown. Front matter is simple `key: value` lines (YAML subset): quotes are
 * stripped, `[a, b]` lists become `a|b` (list fields), `#` lines are comments. Keys are normalised like headers.
 */
export function parseFrontMatter(markdown: string): { fields: Record<string, string>; body: string; problem: string | null } {
  const text = markdown.replace(/\r\n?/g, "\n").replace(/^﻿/, "");
  if (!text.startsWith("---\n")) return { fields: {}, body: text, problem: null };
  const end = text.indexOf("\n---", 4);
  if (end < 0) return { fields: {}, body: text, problem: "The front matter starts with --- but is never closed with ---." };
  const block = text.slice(4, end);
  const afterFence = text.indexOf("\n", end + 4);
  const body = afterFence < 0 ? "" : text.slice(afterFence + 1);
  const fields: Record<string, string> = {};
  for (const line of block.split("\n")) {
    if (line.trim() === "" || line.trim().startsWith("#")) continue;
    const colon = line.indexOf(":");
    if (colon <= 0) return { fields, body, problem: `Front-matter line "${line.trim().slice(0, 60)}" is not "key: value".` };
    const key = normalizeHeader(line.slice(0, colon));
    let value = line.slice(colon + 1).trim();
    if (/^\[.*\]$/.test(value)) value = value.slice(1, -1).split(",").map((part) => part.trim().replace(/^["']|["']$/g, "")).filter(Boolean).join("|");
    else value = value.replace(/^"(.*)"$/, "$1").replace(/^'(.*)'$/, "$1");
    fields[key] = value;
  }
  return { fields, body: body.replace(/^\n+/, ""), problem: null };
}

function wordCount(markdown: string): number {
  return markdown.replace(/\$\$[\s\S]*?\$\$|\$[^$\n]*\$/g, " x ").split(/\s+/).filter((word) => /[A-Za-z0-9]/.test(word)).length;
}

/** Reading-time estimate from the text (~150 words a minute for study reading), 1–600 minutes. */
export function estimateReadingMinutes(markdown: string): number {
  return Math.min(600, Math.max(1, Math.round(wordCount(markdown) / 150)));
}

export function prepareLesson(rawItem: LessonImportItem, lookups: ImportLookups, row: number, fromTable: boolean): { prepared: PreparedLesson | null; issues: ImportIssue[] } {
  const issues: ImportIssue[] = [];
  let item = rawItem;
  if (rawItem.markdown !== undefined) {
    const front = parseFrontMatter(rawItem.markdown);
    if (front.problem) issues.push(issue(row, "INVALID", front.problem, "markdown"));
    const converted = tableRecordToItem("LESSON", { row, values: front.fields });
    issues.push(...converted.issues.map((i) => ({ ...i, field: i.field ? `markdown.${i.field}` : "markdown" })));
    const merged = normalizeEnums({ ...converted.item, body: front.body, ...stripUndefined(rawItem) });
    delete merged.markdown;
    const parsed = IMPORT_ITEM_SCHEMAS.LESSON.safeParse(merged);
    if (!parsed.success) return { prepared: null, issues: [...issues, ...zodIssues(row, parsed.error, "LESSON", false)] };
    item = parsed.data;
  }
  const title = item.title?.trim() ?? "";
  const body = (item.body ?? "").replace(/\r\n?/g, "\n");
  if (title === "") issues.push(issue(row, "REQUIRED", "Give the lesson a title.", fromTable ? "title" : "title"));
  if (body.trim() === "") issues.push(issue(row, "REQUIRED", "The lesson body is empty.", fromTable ? "body" : "body"));
  const topics = resolveTopicRefs(row, [...(item.topics ?? []), ...(item.primaryTopic ? [item.primaryTopic] : [])], lookups, "topics", issues);
  const primaryId = item.primaryTopic ? (lookups.topicRefs.get(lower(item.primaryTopic))?.id ?? null) : (topics[0]?.id ?? null);
  const objectiveIds = resolveObjectiveRefs(row, item.objectives ?? [], lookups, "objectives", issues);
  checkFields(row, lookups, [["body", body, "lesson"]], issues);
  if (issues.some((i) => i.severity === "error")) return { prepared: null, issues };
  return {
    prepared: {
      entityType: "LESSON",
      row,
      externalRef: item.externalRef ?? null,
      title,
      slugBase: item.slug ?? lessonSlugify(title),
      kind: item.kind ?? "LESSON",
      summary: item.summary?.trim() ? item.summary.trim() : null,
      body,
      estimatedMinutes: item.estimatedMinutes ?? estimateReadingMinutes(body),
      accessTier: item.accessTier ?? lookups.defaults.accessTier,
      metaTitle: item.metaTitle?.trim() ? item.metaTitle.trim() : null,
      metaDescription: item.metaDescription?.trim() ? item.metaDescription.trim() : null,
      topicIds: topics.map((t) => t.id),
      primaryTopicId: primaryId,
      objectiveIds,
    },
    issues,
  };
}

function stripUndefined<T extends object>(value: T): Partial<T> {
  return Object.fromEntries(Object.entries(value).filter(([, v]) => v !== undefined)) as Partial<T>;
}

// =====================================================================================================================
// Topics (outline into a DRAFT syllabus version)
// =====================================================================================================================

export interface TopicLookups {
  syllabus: { id: string; label: string };
  /** Existing topics of the version by lower-cased code (codes shared by several topics map to null). */
  existingByCode: ReadonlyMap<string, TopicTarget | null>;
}

export interface TopicRecord {
  row: number;
  /** `null` when the node itself is invalid (its problems are already reported): children report their parent. */
  item: TopicNodeImportItem | null;
  /** Enclosing node of nested JSON (`children`). */
  parentRow: number | null;
}

const MAX_TOPIC_DEPTH = 5;

/**
 * Flattens raw JSON topic items (nodes may nest `children`) depth-first; nodes are numbered 1, 2, 3… in that order,
 * which is how the report refers to them ("Item 4").
 */
export function flattenTopicValues(values: readonly unknown[]): { row: number; value: unknown; parentRow: number | null }[] {
  const out: { row: number; value: unknown; parentRow: number | null }[] = [];
  const visit = (value: unknown, parentRow: number | null, depth: number) => {
    const row = out.length + 1;
    if (value !== null && typeof value === "object" && !Array.isArray(value) && "children" in value) {
      const { children, ...own } = value as Record<string, unknown>;
      out.push({ row, value: own, parentRow });
      if (Array.isArray(children) && depth < 20) for (const child of children) visit(child, row, depth + 1);
      return;
    }
    out.push({ row, value, parentRow });
  };
  for (const value of values) visit(value, null, 0);
  return out;
}

/** Validates an outline as a whole (parents, kinds, depth, duplicate codes) into topics ready to insert. */
export function prepareTopicBatch(records: readonly TopicRecord[], lookups: TopicLookups): { prepared: PreparedTopic[]; issues: ImportIssue[]; failedRows: Set<number> } {
  const issues: ImportIssue[] = [];
  const failedRows = new Set<number>();
  const byCode = new Map<string, number>();
  const placed = new Map<number, { kind: TopicKind; depth: number; failed: boolean }>();
  const prepared: PreparedTopic[] = [];
  const fail = (row: number, code: ImportIssueCode, message: string, field?: string) => {
    issues.push(issue(row, code, message, field));
    failedRows.add(row);
  };

  for (const record of records) {
    const { row, item } = record;
    if (item === null) {
      failedRows.add(row);
      placed.set(row, { kind: "TOPIC", depth: 0, failed: true });
      continue;
    }
    const code = item.code?.trim() || null;
    if (code) {
      const key = code.toLowerCase();
      const first = byCode.get(key);
      if (first !== undefined) fail(row, "DUPLICATE", `The code "${code}" is already used by row ${first} of this file.`, "code");
      else if (lookups.existingByCode.has(key)) fail(row, "DUPLICATE", `A topic with code "${code}" already exists in ${lookups.syllabus.label}.`, "code");
      else byCode.set(key, row);
    }

    let parentKind: TopicKind | null = null;
    let parentDepth = -1;
    let parentKey: string | null = null;
    let parentTopicId: string | null = null;
    const fileParent = (parentRow: number, label: string) => {
      const parent = placed.get(parentRow);
      parentKey = `row:${parentRow}`;
      if (!parent || parent.failed) fail(row, "REFERENCE", `The parent ${label} has errors, so this topic cannot be placed.`, "parent");
      else {
        parentKind = parent.kind;
        parentDepth = parent.depth;
      }
    };
    if (record.parentRow !== null) {
      fileParent(record.parentRow, `(item ${record.parentRow})`);
    } else if (item.parent) {
      const key = item.parent.trim().toLowerCase();
      const fileRow = byCode.get(key);
      if (fileRow !== undefined && fileRow !== row) {
        fileParent(fileRow, `"${item.parent}" (row ${fileRow})`);
      } else {
        const existing = lookups.existingByCode.get(key);
        if (existing === undefined) fail(row, "REFERENCE", `No parent with code "${item.parent}" earlier in the file or in ${lookups.syllabus.label}.`, "parent");
        else if (existing === null) fail(row, "REFERENCE", `The parent code "${item.parent}" matches several topics in ${lookups.syllabus.label}.`, "parent");
        else {
          parentTopicId = existing.id;
          parentKind = existing.kind;
          parentDepth = existing.depth;
        }
      }
    }

    const kind = item.kind ?? defaultChildKind(parentKind);
    if (!failedRows.has(row)) {
      const placement = topicPlacementProblem(kind, parentKind);
      if (placement) fail(row, "INVALID", placement, "kind");
    }
    const depth = parentDepth + 1;
    if (depth > MAX_TOPIC_DEPTH) fail(row, "INVALID", `Topics can nest at most ${MAX_TOPIC_DEPTH + 1} levels deep.`, "parent");

    const failed = failedRows.has(row);
    placed.set(row, { kind, depth, failed });
    if (failed) continue;
    prepared.push({
      entityType: "TOPIC",
      row,
      key: `row:${row}`,
      parentKey,
      parentTopicId,
      kind,
      code,
      name: item.name.trim(),
      description: item.description?.trim() ? item.description.trim() : null,
      objectives: (item.objectives ?? []).map((objective) =>
        typeof objective === "string" ? splitObjectiveCode(objective) : { code: objective.code?.trim() || null, statement: objective.statement.trim() },
      ),
      estimatedStudyMinutes: item.estimatedMinutes ?? null,
      isOptional: item.isOptional ?? false,
      optionGroup: item.optionGroup?.trim() ? item.optionGroup.trim() : null,
    });
  }
  return { prepared, issues, failedRows };
}

// =====================================================================================================================
// Whole-file dry run
// =====================================================================================================================

interface ItemRecord {
  row: number;
  item: Record<string, unknown>;
  fromTable: boolean;
  parentRow: number | null;
}

/**
 * Records of a parsed file as raw items (spreadsheet cells coerced), with conversion problems. Nested JSON topic
 * outlines are flattened first.
 */
export function fileItems(entityType: ImportEntityType, file: ParsedImportFile): { items: ItemRecord[]; issues: ImportIssue[] } {
  const issues: ImportIssue[] = [];
  if (file.kind === "table") {
    issues.push(...unknownColumnIssues(entityType, file.headers));
    const items = file.records.map((record) => {
      const converted = tableRecordToItem(entityType, record);
      issues.push(...converted.issues);
      return { row: record.row, item: converted.item, fromTable: true, parentRow: null };
    });
    return { items, issues };
  }
  const values =
    entityType === "TOPIC"
      ? flattenTopicValues((file.records as JsonRecord[]).map((record) => record.value))
      : (file.records as JsonRecord[]).map((record) => ({ row: record.row, value: record.value, parentRow: null }));
  const items: ItemRecord[] = [];
  for (const { row, value, parentRow } of values) {
    if (value === null || typeof value !== "object" || Array.isArray(value)) {
      issues.push(issue(row, "INVALID", "Each item must be a JSON object."));
      items.push({ row, item: {}, fromTable: false, parentRow });
      continue;
    }
    items.push({ row, item: value as Record<string, unknown>, fromTable: false, parentRow });
  }
  return { items, issues };
}

/**
 * A dry run that can be advanced in slices (`step`), so the background job can record progress between slices and
 * yield to the event loop. Topic outlines are validated as one batch (the tree is checked as a whole).
 */
export interface DryRunner {
  /** Rows (items) in the file. */
  readonly total: number;
  /** Rows processed so far. */
  readonly processed: number;
  /** Processes up to `maxRows` more rows; returns true when every row has been processed. */
  step(maxRows: number): boolean;
  result(): DryRunResult;
}

export function createDryRun(entityType: ImportEntityType, file: ParsedImportFile, lookups: ImportLookups, topicLookups: TopicLookups | null): DryRunner {
  const fileProblems = file.issues;
  if (fileProblems.some((i) => i.severity === "error" && i.row <= 0) || file.records.length === 0) {
    const done: DryRunResult = { totalRows: file.records.length, validRows: 0, failedRows: 0, prepared: [], issues: sortIssues(fileProblems) };
    return { total: 0, processed: 0, step: () => true, result: () => done };
  }
  const { items, issues: conversionIssues } = fileItems(entityType, file);
  const issues: ImportIssue[] = [...fileProblems, ...conversionIssues];
  const rowsWithErrors = new Set(conversionIssues.filter((i) => i.severity === "error").map((i) => i.row));
  const prepared: PreparedRow[] = [];
  const seenRefs = new Map<string, number>();
  let processed = 0;
  let finished: DryRunResult | null = null;

  const runTopics = (): DryRunResult => {
    if (!topicLookups) {
      issues.push(issue(0, "REFERENCE", "Topic outlines are added to a DRAFT syllabus version: choose one for this import."));
      return { totalRows: items.length, validRows: 0, failedRows: items.length, prepared: [], issues: sortIssues(issues) };
    }
    if (items.length > MAX_IMPORT_ROWS.TOPIC) {
      issues.push(issue(0, "FILE", `The outline has more than ${MAX_IMPORT_ROWS.TOPIC.toLocaleString("en")} topics. Split it into smaller files.`));
      return { totalRows: items.length, validRows: 0, failedRows: 0, prepared: [], issues: sortIssues(issues) };
    }
    const records: TopicRecord[] = items.map((entry) => {
      const parsed = topicNodeImportSchema.safeParse(normalizeEnums(entry.item));
      if (!parsed.success) {
        issues.push(...zodIssues(entry.row, parsed.error, "TOPIC", entry.fromTable));
        rowsWithErrors.add(entry.row);
      }
      return { row: entry.row, item: parsed.success && !rowsWithErrors.has(entry.row) ? parsed.data : null, parentRow: entry.parentRow };
    });
    const batch = prepareTopicBatch(records, topicLookups);
    prepared.push(...batch.prepared);
    issues.push(...batch.issues);
    const failed = new Set([...rowsWithErrors, ...batch.failedRows]);
    return { totalRows: items.length, validRows: prepared.length, failedRows: failed.size, prepared, issues: sortIssues(issues) };
  };

  const runItem = (entry: ItemRecord) => {
    const parsed = IMPORT_ITEM_SCHEMAS[entityType].safeParse(normalizeEnums(entry.item));
    if (!parsed.success) {
      issues.push(...zodIssues(entry.row, parsed.error, entityType, entry.fromTable));
      rowsWithErrors.add(entry.row);
      return;
    }
    const data = parsed.data as { externalRef?: string };
    const duplicate = externalRefIssue(entry.row, data.externalRef, lookups, seenRefs, entry.fromTable ? "external_ref" : "externalRef");
    if (duplicate) {
      issues.push(duplicate);
      rowsWithErrors.add(entry.row);
      return;
    }
    const result =
      entityType === "QUESTION"
        ? prepareQuestion(parsed.data as QuestionImportItem, lookups, entry.row, entry.fromTable)
        : entityType === "FLASHCARD"
          ? prepareFlashcard(parsed.data as FlashcardImportItem, lookups, entry.row, entry.fromTable)
          : prepareLesson(parsed.data as LessonImportItem, lookups, entry.row, entry.fromTable);
    issues.push(...result.issues);
    if (result.prepared && !rowsWithErrors.has(entry.row)) prepared.push(result.prepared);
    else rowsWithErrors.add(entry.row);
  };

  return {
    total: items.length,
    get processed() {
      return processed;
    },
    step(maxRows: number): boolean {
      if (finished) return true;
      if (entityType === "TOPIC") {
        finished = runTopics();
        processed = items.length;
        return true;
      }
      const end = Math.min(items.length, processed + Math.max(1, maxRows));
      for (; processed < end; processed += 1) runItem(items[processed] as ItemRecord);
      if (processed >= items.length) {
        finished = { totalRows: items.length, validRows: prepared.length, failedRows: rowsWithErrors.size, prepared, issues: sortIssues(issues) };
        return true;
      }
      return false;
    },
    result(): DryRunResult {
      if (!finished) throw new Error("createDryRun: result() before the last step");
      return finished;
    },
  };
}

/**
 * The complete dry run of a parsed file: every row validated against the item schema and the content rules, external
 * references de-duplicated, curriculum references resolved. Rows with any error are excluded from `prepared`.
 */
export function dryRun(entityType: ImportEntityType, file: ParsedImportFile, lookups: ImportLookups, topicLookups: TopicLookups | null): DryRunResult {
  const runner = createDryRun(entityType, file, lookups, topicLookups);
  runner.step(Number.MAX_SAFE_INTEGER);
  return runner.result();
}

/** By row (file-level first), errors before warnings within a row. */
export function sortIssues(issues: readonly ImportIssue[]): ImportIssue[] {
  return [...issues].sort((a, b) => a.row - b.row || (a.severity === b.severity ? 0 : a.severity === "error" ? -1 : 1));
}
