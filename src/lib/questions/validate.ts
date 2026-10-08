/**
 * Authoring-time validation of a whole question definition (CMS editor, bulk import §25, AI drafts §41, test
 * factories). Zod schemas check each JSON document on its own; this adds the CROSS-FIELD rules a schema cannot see:
 * ids that must agree between payload and answer spec, options vs. answer keys, marks that must add up, marking modes
 * that cannot work for a type, and numeric specs that no correctly rounded answer could satisfy.
 *
 * Errors make the question unmarkable or misleading and must block saving for review; warnings are shown to editors.
 */
import type { z } from "zod";
import { DETERMINISTIC_TYPES, OPEN_RESPONSE_TYPES, QUESTION_LIMITS, type MarkingMode, type QuestionType } from "./constants";
import type { AnswerSpecMap } from "./answer-spec";
import { formatExpectedNumber } from "./answer-display";
import { parseNumberInput } from "./number";
import { safeParseAnswerSpec, safeParseQuestionPayload } from "./parse";
import type { QuestionPayloadMap } from "./payload";
import { optionKeySchema } from "./primitives";
import { MAX_QUESTION_PATTERN_PROGRAM_SIZE, questionPatternsProgramSize } from "./safe-pattern";
import { withinTolerance } from "./tolerance";

export type IssuePath = (string | number)[];

export interface DefinitionIssue {
  severity: "error" | "warning";
  path: IssuePath;
  message: string;
}

export interface QuestionDefinitionInput {
  type: QuestionType;
  markingMode: MarkingMode;
  marks: number;
  payload: unknown;
  answerSpec: unknown;
  partLabel?: string | null;
  options?: readonly { key: string; isCorrect: boolean }[];
  parts?: readonly QuestionDefinitionInput[];
}

export interface DefinitionValidation {
  valid: boolean;
  issues: DefinitionIssue[];
}

/** Maximum nesting: root → part → sub-part ("(b)(i)"). */
const MAX_DEPTH = 2;

class Collector {
  readonly issues: DefinitionIssue[] = [];
  constructor(private readonly prefix: IssuePath) {}
  error(path: IssuePath, message: string): void {
    this.issues.push({ severity: "error", path: [...this.prefix, ...path], message });
  }
  warn(path: IssuePath, message: string): void {
    this.issues.push({ severity: "warning", path: [...this.prefix, ...path], message });
  }
  zod(path: IssuePath, error: z.ZodError): void {
    for (const issue of error.issues) this.error([...path, ...issue.path.map((p) => (typeof p === "symbol" ? String(p) : p))], issue.message);
  }
}

function sum(values: readonly number[]): number {
  return values.reduce((a, b) => a + b, 0);
}

function checkMultipleChoice(c: Collector, def: QuestionDefinitionInput, payload: QuestionPayloadMap["MULTIPLE_CHOICE"], spec: AnswerSpecMap["MULTIPLE_CHOICE"]): void {
  const options = def.options ?? [];
  if (options.length < 2) c.error(["options"], "A multiple-choice question needs at least two options.");
  if (options.length > QUESTION_LIMITS.maxOptions) c.error(["options"], `At most ${QUESTION_LIMITS.maxOptions} options are allowed.`);
  const keys = new Set<string>();
  options.forEach((option, index) => {
    if (!optionKeySchema.safeParse(option.key).success) c.error(["options", index, "key"], "Option keys are 1–8 letters or digits.");
    if (keys.has(option.key)) c.error(["options", index, "key"], `Duplicate option key "${option.key}".`);
    keys.add(option.key);
  });
  const correct = options.filter((o) => o.isCorrect).length;
  if (correct === 0) c.error(["options"], "Mark at least one option as correct.");
  if (payload.selectMode === "single" && correct > 1) c.warn(["options"], "Single-answer question with several correct options: any one of them is accepted.");
  if (payload.selectMode === "single" && spec.scoring === "partial") c.warn(["answerSpec", "scoring"], "Partial scoring only applies to multi-select questions.");
  if (payload.selectMode === "multiple" && spec.scoring === "partial" && def.marks < correct) {
    c.warn(["marks"], "Partial credit is floored to whole marks: with fewer marks than correct options some partial answers earn nothing.");
  }
}

function checkShortAnswer(c: Collector, def: QuestionDefinitionInput, spec: AnswerSpecMap["SHORT_ANSWER"]): void {
  spec.accepted.forEach((accepted, index) => {
    if (accepted.marks !== undefined && accepted.marks > def.marks) c.error(["answerSpec", "accepted", index, "marks"], "Exceeds the question's marks.");
  });
  if (def.markingMode === "AI_ASSISTED" && !spec.markScheme) c.warn(["answerSpec", "markScheme"], "AI-assisted marking works best with a mark scheme.");
  if (spec.rubric && sum(spec.rubric.map((p) => p.marks)) < def.marks && spec.accepted.length === 0 && !spec.patterns && !spec.keywords) {
    c.warn(["answerSpec", "rubric"], "The rubric cannot reach full marks and no accepted answer is given.");
  }
}

function checkNumeric(c: Collector, def: QuestionDefinitionInput, spec: AnswerSpecMap["NUMERICAL"] | AnswerSpecMap["CALCULATION"]): void {
  if (spec.units?.penaltyMarks !== undefined && spec.units.penaltyMarks > def.marks) c.error(["answerSpec", "units", "penaltyMarks"], "Exceeds the question's marks.");
  if (spec.precisionPenaltyMarks !== undefined && spec.precisionPenaltyMarks > def.marks) {
    c.error(["answerSpec", "precisionPenaltyMarks"], "Exceeds the question's marks.");
  }
  if (spec.sigFigs !== undefined || spec.decimalPlaces !== undefined) {
    const shown = formatExpectedNumber(spec.value, spec);
    const parsed = parseNumberInput(shown);
    if (!parsed.ok || !withinTolerance(parsed.number.value, spec.value, spec.tolerance)) {
      c.error(["answerSpec", "tolerance"], `A correctly rounded answer (${shown}) would be outside the tolerance: widen the tolerance.`);
    }
  }
  if ("methodMarks" in spec && spec.methodMarks) {
    const method = sum(spec.methodMarks.map((m) => m.marks));
    if (method >= def.marks) c.error(["answerSpec", "methodMarks"], "Method marks must leave at least one mark for the final answer.");
    if (def.markingMode === "AUTO") c.warn(["markingMode"], "Method marks need AI-assisted or manual marking; they are routed to AI marking.");
  }
}

function checkMatching(c: Collector, def: QuestionDefinitionInput, payload: QuestionPayloadMap["MATCHING"], spec: AnswerSpecMap["MATCHING"]): void {
  const left = new Set(payload.left.map((l) => l.id));
  const right = new Set(payload.right.map((r) => r.id));
  spec.pairs.forEach((pair, index) => {
    if (!left.has(pair.leftId)) c.error(["answerSpec", "pairs", index, "leftId"], `Unknown left item "${pair.leftId}".`);
    if (!right.has(pair.rightId)) c.error(["answerSpec", "pairs", index, "rightId"], `Unknown right item "${pair.rightId}".`);
  });
  const paired = new Set(spec.pairs.map((p) => p.leftId));
  for (const id of left) if (!paired.has(id)) c.error(["answerSpec", "pairs"], `Left item "${id}" has no correct match.`);
  if (spec.marksPerPair !== undefined && spec.marksPerPair * left.size !== def.marks) {
    c.warn(["answerSpec", "marksPerPair"], `marksPerPair × ${left.size} items = ${spec.marksPerPair * left.size}, but the question is worth ${def.marks} (the total is capped).`);
  }
}

function checkWeights(c: Collector, def: QuestionDefinitionInput, path: IssuePath, marks: readonly (number | undefined)[]): void {
  const specified = marks.filter((m): m is number => m !== undefined);
  const total = sum(specified);
  if (total > def.marks) c.error(path, `Per-item marks add up to ${total}, more than the question's ${def.marks}.`);
  else if (specified.length === marks.length && total < def.marks) c.warn(path, `Per-item marks add up to ${total}; the question is worth ${def.marks}.`);
}

function checkFillInTheBlank(c: Collector, def: QuestionDefinitionInput, payload: QuestionPayloadMap["FILL_IN_THE_BLANK"], spec: AnswerSpecMap["FILL_IN_THE_BLANK"]): void {
  const declared = new Map(payload.blanks.map((b) => [b.id, b]));
  const specified = new Set(spec.blanks.map((b) => b.id));
  for (const id of declared.keys()) if (!specified.has(id)) c.error(["answerSpec", "blanks"], `Blank "${id}" has no accepted answers.`);
  spec.blanks.forEach((blank, index) => {
    const presentation = declared.get(blank.id);
    if (!presentation) {
      c.error(["answerSpec", "blanks", index, "id"], `Unknown blank "${blank.id}".`);
      return;
    }
    if (presentation.input === "select") {
      const choices = new Set(presentation.choices ?? []);
      blank.accepted.forEach((value, j) => {
        if (!choices.has(value)) c.error(["answerSpec", "blanks", index, "accepted", j], `"${value}" is not one of the choices.`);
      });
    }
    if (presentation.input === "number") {
      blank.accepted.forEach((value, j) => {
        if (!parseNumberInput(value).ok) c.error(["answerSpec", "blanks", index, "accepted", j], `"${value}" is not a number.`);
      });
    }
  });
  checkWeights(c, def, ["answerSpec", "blanks"], spec.blanks.map((b) => b.marks));
}

function checkDiagram(c: Collector, def: QuestionDefinitionInput, payload: QuestionPayloadMap["DIAGRAM_LABELLING"], spec: AnswerSpecMap["DIAGRAM_LABELLING"]): void {
  const hotspots = new Set(payload.hotspots.map((h) => h.id));
  const labels = new Set((payload.labels ?? []).map((l) => l.id));
  const specified = new Set(spec.hotspots.map((h) => h.hotspotId));
  for (const id of hotspots) if (!specified.has(id)) c.error(["answerSpec", "hotspots"], `Hotspot "${id}" has no answer.`);
  spec.hotspots.forEach((h, index) => {
    if (!hotspots.has(h.hotspotId)) c.error(["answerSpec", "hotspots", index, "hotspotId"], `Unknown hotspot "${h.hotspotId}".`);
    const ids = [...(h.labelId !== undefined ? [h.labelId] : []), ...(h.alternativeLabelIds ?? [])];
    if (!payload.labels && ids.length > 0) c.error(["answerSpec", "hotspots", index], "Free-text labelling (no word bank) needs accepted texts, not label ids.");
    if (!payload.labels && !h.accepted) c.error(["answerSpec", "hotspots", index, "accepted"], "Give accepted texts for free-text labelling.");
    for (const id of ids) if (payload.labels && !labels.has(id)) c.error(["answerSpec", "hotspots", index], `Unknown label "${id}".`);
  });
  checkWeights(c, def, ["answerSpec", "hotspots"], spec.hotspots.map((h) => h.marks));
}

function checkOpen(c: Collector, def: QuestionDefinitionInput, spec: AnswerSpecMap["ESSAY"]): void {
  const total = sum(spec.markScheme.points.map((p) => p.marks));
  if (total < def.marks) c.warn(["answerSpec", "markScheme", "points"], `Mark-scheme points total ${total}; the question is worth ${def.marks}.`);
  spec.markScheme.levels?.forEach((level, index) => {
    if (level.maxMarks > def.marks) c.error(["answerSpec", "markScheme", "levels", index, "maxMarks"], "Exceeds the question's marks.");
  });
}

function validateInto(c: Collector, def: QuestionDefinitionInput, depth: number): void {
  if (!Number.isInteger(def.marks) || def.marks < 1 || def.marks > QUESTION_LIMITS.maxMarks) {
    c.error(["marks"], `Marks must be a whole number from 1 to ${QUESTION_LIMITS.maxMarks}.`);
  }
  if (def.type !== "MULTIPLE_CHOICE" && (def.options?.length ?? 0) > 0) c.error(["options"], "Only multiple-choice questions have options.");
  if (def.type !== "STRUCTURED" && (def.parts?.length ?? 0) > 0) c.error(["parts"], "Only structured questions have parts.");
  if (OPEN_RESPONSE_TYPES.has(def.type) && def.markingMode === "AUTO") {
    c.error(["markingMode"], "Essays and extended responses cannot be auto-marked: choose AI-assisted or manual marking.");
  }
  if (DETERMINISTIC_TYPES.has(def.type) && def.markingMode === "MANUAL") c.warn(["markingMode"], "This type can be marked automatically; manual marking sends every answer for review.");
  if (DETERMINISTIC_TYPES.has(def.type) && def.markingMode === "AI_ASSISTED") c.warn(["markingMode"], "This type is always marked automatically; AI-assisted has no effect.");

  const payload = safeParseQuestionPayload(def.type, def.payload);
  if (!payload.success) c.zod(["payload"], payload.error);
  const spec = safeParseAnswerSpec(def.type, def.answerSpec);
  if (!spec.success) c.zod(["answerSpec"], spec.error);

  if (def.type === "STRUCTURED") {
    const parts = def.parts ?? [];
    if (parts.length === 0) c.error(["parts"], "A structured question needs at least one part.");
    const total = sum(parts.map((p) => p.marks));
    if (parts.length > 0 && total !== def.marks) c.error(["marks"], `Parts are worth ${total} marks in total; the question says ${def.marks}.`);
    const labels = new Set<string>();
    parts.forEach((part, index) => {
      const label = part.partLabel?.trim() ?? "";
      if (label === "") c.error(["parts", index, "partLabel"], "Parts need a label such as (a).");
      else if (labels.has(label)) c.error(["parts", index, "partLabel"], `Duplicate part label "${label}".`);
      labels.add(label);
      if (depth + 1 >= MAX_DEPTH && part.type === "STRUCTURED") c.error(["parts", index, "type"], "Parts may nest only one level, e.g. (b)(i).");
      const child = new Collector([]);
      validateInto(child, part, depth + 1);
      for (const issue of child.issues) c.issues.push({ ...issue, path: [...["parts", index], ...issue.path] });
    });
    return;
  }
  if (!payload.success || !spec.success) return;

  switch (def.type) {
    case "MULTIPLE_CHOICE":
      checkMultipleChoice(c, def, payload.data as QuestionPayloadMap["MULTIPLE_CHOICE"], spec.data as AnswerSpecMap["MULTIPLE_CHOICE"]);
      break;
    case "SHORT_ANSWER":
      checkShortAnswer(c, def, spec.data as AnswerSpecMap["SHORT_ANSWER"]);
      break;
    case "NUMERICAL":
    case "CALCULATION":
      checkNumeric(c, def, spec.data as AnswerSpecMap["CALCULATION"]);
      break;
    case "MATCHING":
      checkMatching(c, def, payload.data as QuestionPayloadMap["MATCHING"], spec.data as AnswerSpecMap["MATCHING"]);
      break;
    case "FILL_IN_THE_BLANK":
      checkFillInTheBlank(c, def, payload.data as QuestionPayloadMap["FILL_IN_THE_BLANK"], spec.data as AnswerSpecMap["FILL_IN_THE_BLANK"]);
      break;
    case "DIAGRAM_LABELLING":
      checkDiagram(c, def, payload.data as QuestionPayloadMap["DIAGRAM_LABELLING"], spec.data as AnswerSpecMap["DIAGRAM_LABELLING"]);
      break;
    case "ESSAY":
    case "EXTENDED_RESPONSE":
      checkOpen(c, def, spec.data as AnswerSpecMap["ESSAY"]);
      break;
    default:
      break;
  }
}

/** Validates a question definition (and its parts). `valid` is false when any issue is an error. */
export function validateQuestionDefinition(def: QuestionDefinitionInput): DefinitionValidation {
  const c = new Collector([]);
  validateInto(c, def, 0);
  // Bounds the matching work per answer over every part (safe-pattern.ts); marking re-checks stored questions.
  const patternSize = questionPatternsProgramSize(def);
  if (patternSize > MAX_QUESTION_PATTERN_PROGRAM_SIZE) {
    c.error(
      def.type === "STRUCTURED" ? ["parts"] : ["answerSpec", "patterns"],
      "The answer patterns of this question are too long in total once their repetitions are expanded: use fewer patterns or smaller {n,m} counts.",
    );
  }
  return { valid: !c.issues.some((i) => i.severity === "error"), issues: c.issues };
}
