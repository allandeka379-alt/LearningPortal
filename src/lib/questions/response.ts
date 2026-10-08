/**
 * Student responses (`QuestionAttempt.response`), discriminated by question type. Shapes follow the `response` doc
 * comment on QuestionAttempt in prisma/schema.prisma, with two documented extensions:
 *   - NUMERICAL / CALCULATION: `unit` and `working` are optional; a unit typed into `value` ("60 km/h") is split off
 *     by the marker;
 *   - STRUCTURED: each part entry may carry a full typed `response` for part types that `text`/`value`/`unit` cannot
 *     express (MCQ, matching, blanks, labelling, true/false); a `working` field is accepted for CALCULATION parts.
 *     The documented `{ partId, text?, value?, unit? }` entries remain valid (see `partEntryToResponse`).
 * Every string is length-bounded so hostile input is rejected at the API boundary before it reaches marking.
 * `null` (no answer) is a valid stored response; "blank" responses (`""`, `[]`) are treated as unanswered by marking.
 */
import { z } from "zod";
import { QUESTION_LIMITS, type QuestionType } from "./constants";
import { authoringIdSchema, optionKeySchema } from "./primitives";

const L = QUESTION_LIMITS;

export const multipleChoiceResponseSchema = z.strictObject({
  type: z.literal("MULTIPLE_CHOICE"),
  /** QuestionOption.key values (stable across revisions). */
  optionKeys: z.array(optionKeySchema).max(L.maxOptions),
});

export const trueFalseResponseSchema = z.strictObject({
  type: z.literal("TRUE_FALSE"),
  value: z.boolean(),
});

export const shortAnswerResponseSchema = z.strictObject({
  type: z.literal("SHORT_ANSWER"),
  text: z.string().max(L.shortTextResponse),
});

export const essayResponseSchema = z.strictObject({
  type: z.literal("ESSAY"),
  text: z.string().max(L.longTextResponse),
});

export const extendedResponseSchema = z.strictObject({
  type: z.literal("EXTENDED_RESPONSE"),
  text: z.string().max(L.longTextResponse),
});

const numericFields = {
  /** As typed: parsing (separators, scientific notation, fractions) happens in marking with `parseNumberInput`. */
  value: z.string().max(L.numberInput),
  unit: z.string().max(L.unitInput).optional(),
  working: z.string().max(L.workingResponse).optional(),
};

export const numericalResponseSchema = z.strictObject({ type: z.literal("NUMERICAL"), ...numericFields });
export const calculationResponseSchema = z.strictObject({ type: z.literal("CALCULATION"), ...numericFields });

export const matchingResponseSchema = z.strictObject({
  type: z.literal("MATCHING"),
  pairs: z.array(z.strictObject({ leftId: authoringIdSchema, rightId: authoringIdSchema })).max(L.maxItems),
});

export const fillInTheBlankResponseSchema = z.strictObject({
  type: z.literal("FILL_IN_THE_BLANK"),
  blanks: z.array(z.strictObject({ blankId: authoringIdSchema, text: z.string().max(L.blankResponse) })).max(L.maxItems),
});

export const diagramLabellingResponseSchema = z.strictObject({
  type: z.literal("DIAGRAM_LABELLING"),
  /** `targetId` = hotspot id; `labelId` for word-bank mode, `text` for free-text mode. */
  labels: z
    .array(
      z.strictObject({
        targetId: authoringIdSchema,
        labelId: authoringIdSchema.optional(),
        text: z.string().max(L.blankResponse).optional(),
      }),
    )
    .max(L.maxItems),
});

/** Any response a STRUCTURED part can carry (parts are never STRUCTURED responses themselves; nesting is by partId). */
export const partResponseSchema = z.discriminatedUnion("type", [
  multipleChoiceResponseSchema,
  trueFalseResponseSchema,
  shortAnswerResponseSchema,
  numericalResponseSchema,
  essayResponseSchema,
  calculationResponseSchema,
  matchingResponseSchema,
  fillInTheBlankResponseSchema,
  diagramLabellingResponseSchema,
  extendedResponseSchema,
]);

export const structuredPartEntrySchema = z.strictObject({
  /** Question.id of the (leaf) part, at any nesting depth. */
  partId: z.uuid(),
  text: z.string().max(L.longTextResponse).optional(),
  value: z.string().max(L.numberInput).optional(),
  unit: z.string().max(L.unitInput).optional(),
  working: z.string().max(L.workingResponse).optional(),
  response: partResponseSchema.optional(),
});

export const structuredResponseSchema = z.strictObject({
  type: z.literal("STRUCTURED"),
  parts: z.array(structuredPartEntrySchema).max(L.maxParts),
});

/** Any stored response. */
export const questionResponseSchema = z.discriminatedUnion("type", [
  multipleChoiceResponseSchema,
  trueFalseResponseSchema,
  shortAnswerResponseSchema,
  numericalResponseSchema,
  structuredResponseSchema,
  essayResponseSchema,
  calculationResponseSchema,
  matchingResponseSchema,
  fillInTheBlankResponseSchema,
  diagramLabellingResponseSchema,
  extendedResponseSchema,
]);

/** Response schema per question type (the literal `type` must match). */
export const RESPONSE_SCHEMAS = {
  MULTIPLE_CHOICE: multipleChoiceResponseSchema,
  TRUE_FALSE: trueFalseResponseSchema,
  SHORT_ANSWER: shortAnswerResponseSchema,
  NUMERICAL: numericalResponseSchema,
  STRUCTURED: structuredResponseSchema,
  ESSAY: essayResponseSchema,
  CALCULATION: calculationResponseSchema,
  MATCHING: matchingResponseSchema,
  FILL_IN_THE_BLANK: fillInTheBlankResponseSchema,
  DIAGRAM_LABELLING: diagramLabellingResponseSchema,
  EXTENDED_RESPONSE: extendedResponseSchema,
} as const satisfies Record<QuestionType, z.ZodType>;

export type QuestionResponse = z.output<typeof questionResponseSchema>;
export type PartResponse = z.output<typeof partResponseSchema>;
export type StructuredPartEntry = z.output<typeof structuredPartEntrySchema>;
export type ResponseMap = { [K in QuestionType]: z.output<(typeof RESPONSE_SCHEMAS)[K]> };
export type ResponseFor<T extends QuestionType> = ResponseMap[T];

/**
 * Converts a documented STRUCTURED part entry (`{ partId, text?, value?, unit?, working? }`) into the typed response
 * for the part's type. An explicit `response` wins (and must match the part type, else null). Returns null when the
 * entry cannot express an answer for that type.
 */
export function partEntryToResponse(entry: StructuredPartEntry, partType: QuestionType): PartResponse | null {
  if (entry.response) return entry.response.type === partType ? entry.response : null;
  switch (partType) {
    case "SHORT_ANSWER":
      return { type: partType, text: (entry.text ?? "").slice(0, L.shortTextResponse) };
    case "ESSAY":
    case "EXTENDED_RESPONSE":
      return { type: partType, text: entry.text ?? "" };
    case "NUMERICAL":
      return {
        type: partType,
        value: entry.value ?? (entry.text ?? "").slice(0, L.numberInput),
        ...(entry.unit !== undefined ? { unit: entry.unit } : {}),
        ...(entry.working !== undefined ? { working: entry.working } : {}),
      };
    case "CALCULATION": {
      const working = entry.working ?? entry.text;
      return {
        type: partType,
        value: entry.value ?? "",
        ...(entry.unit !== undefined ? { unit: entry.unit } : {}),
        ...(working !== undefined ? { working: working.slice(0, L.workingResponse) } : {}),
      };
    }
    case "TRUE_FALSE": {
      const raw = (entry.value ?? entry.text ?? "").trim().toLowerCase();
      if (raw === "true" || raw === "yes") return { type: partType, value: true };
      if (raw === "false" || raw === "no") return { type: partType, value: false };
      return null;
    }
    case "MULTIPLE_CHOICE": {
      const key = (entry.value ?? entry.text ?? "").trim();
      return /^[A-Za-z0-9]{1,8}$/.test(key) ? { type: partType, optionKeys: [key] } : null;
    }
    default:
      return null;
  }
}
