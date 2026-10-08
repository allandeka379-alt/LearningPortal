/**
 * Marking dispatcher (pure core, CLAUDE.md rule 2). Validates the stored payload / answer spec and the response with
 * the shared Zod schemas, then delegates to the per-type marker. Never throws for bad DATA:
 *   - invalid payload or answer spec           → NEEDS_REVIEW, 0, SPEC_INVALID (a broken question never awards marks;
 *     this includes a question whose answer patterns exceed the per-question budget of `safe-pattern.ts`);
 *   - response of the wrong type / malformed   → NEEDS_REVIEW, 0, RESPONSE_TYPE_MISMATCH / RESPONSE_INVALID;
 *   - null / undefined response                → UNANSWERED.
 * It throws only for programming errors (marks that are not a positive whole number).
 *
 * Marking modes: deterministic types (MCQ, true/false, numerical, matching, blanks, labelling) are always marked by
 * rule — AI_ASSISTED has no effect on them, and MANUAL turns the rule-based mark into a provisional NEEDS_REVIEW
 * suggestion. Short answers, calculations with method marks and open responses route to AI (AI_ASSISTED) or a human
 * (MANUAL) as documented in their modules.
 */
import {
  DETERMINISTIC_TYPES,
  MAX_QUESTION_PATTERN_PROGRAM_SIZE,
  QUESTION_LIMITS,
  formatCorrectAnswer,
  questionPatternsProgramSize,
  safeParseAnswerSpec,
  safeParseQuestionPayload,
  safeParseResponse,
  type AnswerSpecMap,
  type QuestionPayloadMap,
  type QuestionRecord,
  type ResponseMap,
} from "@/lib/questions";
import { markCalculation } from "./calculation";
import { markMultipleChoice, markTrueFalse } from "./choice";
import { markFillInTheBlank } from "./blanks";
import { markDiagramLabelling } from "./labelling";
import { markMatching } from "./matching";
import { markNumerical, numericAffixes } from "./numeric";
import { markOpenResponse } from "./open-response";
import { asManualReview, invalidResponse, invalidSpec } from "./result";
import { markShortAnswer } from "./short-answer";
import { markStructured } from "./structured";
import type { MarkingFlag, MarkingInput, MarkingOption, MarkingPartInput, MarkingResult } from "./types";

function assertMarks(marks: number): void {
  if (!Number.isInteger(marks) || marks < 1 || marks > QUESTION_LIMITS.maxMarks) {
    throw new RangeError(`marks must be a whole number from 1 to ${QUESTION_LIMITS.maxMarks}, received ${String(marks)}`);
  }
}

function responseFlag(raw: unknown, type: string): MarkingFlag {
  const actual = typeof raw === "object" && raw !== null ? (raw as { type?: unknown }).type : undefined;
  return actual !== undefined && actual !== type ? "RESPONSE_TYPE_MISMATCH" : "RESPONSE_INVALID";
}

function markAt(input: MarkingInput, depth: number): MarkingResult {
  const { type, marks } = input;
  assertMarks(marks);
  const markingMode = input.markingMode ?? "AUTO";
  const options: readonly MarkingOption[] = input.options ?? [];

  const payloadResult = safeParseQuestionPayload(type, input.payload);
  const specResult = safeParseAnswerSpec(type, input.answerSpec);
  if (!payloadResult.success || !specResult.success) return invalidSpec(marks);

  const responseResult = safeParseResponse(type, input.response);
  if (!responseResult.success) {
    const display =
      type === "STRUCTURED"
        ? null
        : formatCorrectAnswer(
            type,
            payloadResult.data,
            specResult.data,
            options.map((o) => ({ ...o, content: o.content ?? "" })),
          );
    return invalidResponse(marks, responseFlag(input.response, type), display);
  }
  const response = responseResult.data;

  let result: MarkingResult;
  switch (type) {
    case "MULTIPLE_CHOICE":
      result = markMultipleChoice({
        marks,
        payload: payloadResult.data as QuestionPayloadMap["MULTIPLE_CHOICE"],
        spec: specResult.data as AnswerSpecMap["MULTIPLE_CHOICE"],
        options,
        response: response as ResponseMap["MULTIPLE_CHOICE"] | null,
      });
      break;
    case "TRUE_FALSE":
      result = markTrueFalse({
        marks,
        payload: payloadResult.data as QuestionPayloadMap["TRUE_FALSE"],
        spec: specResult.data as AnswerSpecMap["TRUE_FALSE"],
        response: response as ResponseMap["TRUE_FALSE"] | null,
      });
      break;
    case "SHORT_ANSWER":
      result = markShortAnswer({ marks, markingMode, spec: specResult.data as AnswerSpecMap["SHORT_ANSWER"], response: response as ResponseMap["SHORT_ANSWER"] | null });
      break;
    case "NUMERICAL":
      result = markNumerical({
        marks,
        markingMode,
        spec: specResult.data as AnswerSpecMap["NUMERICAL"],
        response: response as ResponseMap["NUMERICAL"] | null,
        affixes: numericAffixes(payloadResult.data as QuestionPayloadMap["NUMERICAL"]),
      });
      break;
    case "CALCULATION":
      result = markCalculation({
        marks,
        markingMode,
        spec: specResult.data as AnswerSpecMap["CALCULATION"],
        response: response as ResponseMap["CALCULATION"] | null,
        affixes: numericAffixes(payloadResult.data as QuestionPayloadMap["CALCULATION"]),
      });
      break;
    case "MATCHING":
      result = markMatching({
        marks,
        payload: payloadResult.data as QuestionPayloadMap["MATCHING"],
        spec: specResult.data as AnswerSpecMap["MATCHING"],
        response: response as ResponseMap["MATCHING"] | null,
      });
      break;
    case "FILL_IN_THE_BLANK":
      result = markFillInTheBlank({
        marks,
        payload: payloadResult.data as QuestionPayloadMap["FILL_IN_THE_BLANK"],
        spec: specResult.data as AnswerSpecMap["FILL_IN_THE_BLANK"],
        response: response as ResponseMap["FILL_IN_THE_BLANK"] | null,
      });
      break;
    case "DIAGRAM_LABELLING":
      result = markDiagramLabelling({
        marks,
        payload: payloadResult.data as QuestionPayloadMap["DIAGRAM_LABELLING"],
        spec: specResult.data as AnswerSpecMap["DIAGRAM_LABELLING"],
        response: response as ResponseMap["DIAGRAM_LABELLING"] | null,
      });
      break;
    case "ESSAY":
    case "EXTENDED_RESPONSE":
      result = markOpenResponse({
        marks,
        markingMode,
        payload: payloadResult.data as QuestionPayloadMap["ESSAY"],
        spec: specResult.data as AnswerSpecMap["ESSAY"],
        response: response as ResponseMap["ESSAY"] | null,
      });
      break;
    case "STRUCTURED":
      return markStructured({
        marks,
        parts: input.parts ?? [],
        response: response as ResponseMap["STRUCTURED"] | null,
        depth,
        markChild: (part, childResponse, childDepth) => markAt(partInput(part, childResponse), childDepth),
      });
  }
  return DETERMINISTIC_TYPES.has(type) && markingMode === "MANUAL" ? asManualReview(result) : result;
}

function partInput(part: MarkingPartInput, response: unknown): MarkingInput {
  return {
    type: part.type,
    marks: part.marks,
    ...(part.markingMode !== undefined ? { markingMode: part.markingMode } : {}),
    payload: part.payload,
    answerSpec: part.answerSpec,
    response,
    ...(part.options !== undefined ? { options: part.options } : {}),
    ...(part.parts !== undefined ? { parts: part.parts } : {}),
  };
}

/**
 * Marks one response. `marksAwarded` is always a whole number in [0, marks]; see {@link MarkingResult} for the
 * meaning of each status. Pure and deterministic.
 */
export function markResponse(input: MarkingInput): MarkingResult {
  assertMarks(input.marks);
  // Answer-pattern work is bounded per question (safe-pattern.ts). A stored question over the budget (authored before
  // it existed) is never run: it goes to review like any other spec that cannot be marked.
  if (questionPatternsProgramSize(input) > MAX_QUESTION_PATTERN_PROGRAM_SIZE) return invalidSpec(input.marks);
  return markAt(input, 0);
}

function toPartInput(question: QuestionRecord): MarkingPartInput {
  return {
    id: question.id,
    type: question.type,
    marks: question.marks,
    markingMode: question.markingMode,
    partLabel: question.partLabel ?? null,
    ...(question.partOrder !== undefined ? { partOrder: question.partOrder } : {}),
    payload: question.payload,
    answerSpec: question.answerSpec,
    options: (question.options ?? []).map((o) => ({ key: o.key, isCorrect: o.isCorrect, content: o.content, ...(o.sortOrder !== undefined ? { sortOrder: o.sortOrder } : {}) })),
    parts: (question.parts ?? []).map(toPartInput),
  };
}

/** Builds the marking input of a loaded question (options and parts included). */
export function toMarkingInput(question: QuestionRecord, response: unknown): MarkingInput {
  return partInput(toPartInput(question), response);
}

/** Marks a response to a loaded question (e.g. from `getQuestionsForAttempt`). */
export function markQuestion(question: QuestionRecord, response: unknown): MarkingResult {
  return markResponse(toMarkingInput(question, response));
}
