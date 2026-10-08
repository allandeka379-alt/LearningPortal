/**
 * Typed entry points for validating stored or submitted question JSON. `parse*` throw a `ZodError` (map it with
 * `AppError.fromZod` at a route boundary); `safeParse*` return Zod's result object. Unknown keys are rejected
 * everywhere (strict objects), so typos in authored JSON are caught at save/import time.
 */
import type { z } from "zod";
import type { QuestionType } from "./constants";
import { ANSWER_SPEC_SCHEMAS, type AnswerSpecFor } from "./answer-spec";
import { QUESTION_PAYLOAD_SCHEMAS, type PayloadFor } from "./payload";
import { RESPONSE_SCHEMAS, type ResponseFor } from "./response";

/** Validates a `Question.payload` for `type` and applies defaults. Throws `ZodError`. */
export function parseQuestionPayload<T extends QuestionType>(type: T, raw: unknown): PayloadFor<T> {
  return (QUESTION_PAYLOAD_SCHEMAS[type] as z.ZodType).parse(raw) as PayloadFor<T>;
}

/** Non-throwing {@link parseQuestionPayload}. */
export function safeParseQuestionPayload<T extends QuestionType>(type: T, raw: unknown): z.ZodSafeParseResult<PayloadFor<T>> {
  return (QUESTION_PAYLOAD_SCHEMAS[type] as z.ZodType).safeParse(raw) as z.ZodSafeParseResult<PayloadFor<T>>;
}

/** Validates a `Question.answerSpec` for `type` and applies defaults. Throws `ZodError`. SERVER-SIDE data. */
export function parseAnswerSpec<T extends QuestionType>(type: T, raw: unknown): AnswerSpecFor<T> {
  return (ANSWER_SPEC_SCHEMAS[type] as z.ZodType).parse(raw) as AnswerSpecFor<T>;
}

/** Non-throwing {@link parseAnswerSpec}. */
export function safeParseAnswerSpec<T extends QuestionType>(type: T, raw: unknown): z.ZodSafeParseResult<AnswerSpecFor<T>> {
  return (ANSWER_SPEC_SCHEMAS[type] as z.ZodType).safeParse(raw) as z.ZodSafeParseResult<AnswerSpecFor<T>>;
}

/**
 * Validates a student response for a question of `type` (the response's own `type` must match). `null`/`undefined`
 * mean "not answered" and return null. Throws `ZodError`.
 */
export function parseResponse<T extends QuestionType>(type: T, raw: unknown): ResponseFor<T> | null {
  if (raw === null || raw === undefined) return null;
  return (RESPONSE_SCHEMAS[type] as z.ZodType).parse(raw) as ResponseFor<T>;
}

/** Non-throwing {@link parseResponse}; `data` is null for "not answered". */
export function safeParseResponse<T extends QuestionType>(type: T, raw: unknown): z.ZodSafeParseResult<ResponseFor<T> | null> {
  if (raw === null || raw === undefined) return { success: true, data: null } as z.ZodSafeParseResult<ResponseFor<T> | null>;
  return (RESPONSE_SCHEMAS[type] as z.ZodType).safeParse(raw) as z.ZodSafeParseResult<ResponseFor<T> | null>;
}
