/**
 * `Question.payload` — type-specific PRESENTATION data (§9). Shapes follow the `payload` doc comment in
 * prisma/schema.prisma (the contract) with these documented extensions:
 *   - SHORT_ANSWER may carry `{ maxLength }` (answer box limit) instead of null;
 *   - DIAGRAM_LABELLING `shuffleLabels` (default true) — the word bank is often authored in hotspot order, which would
 *     give the answer away;
 *   - defaults are applied on parse: MULTIPLE_CHOICE `{ selectMode: "single", shuffleOptions: false }`,
 *     TRUE_FALSE `{ statementStyle: "true_false" }`, MATCHING `shuffle: true`, blank `input: "text"`.
 * Payloads never contain answers: the answer lives in `answerSpec` (and QuestionOption.isCorrect), which never leaves
 * the server before submission (see `student-view.ts`).
 *
 * A stored JSON `null` is valid for every type whose payload fields are all optional; STRUCTURED roots must be null.
 */
import { z } from "zod";
import { BLANK_PLACEHOLDER, QUESTION_LIMITS, type QuestionType } from "./constants";
import { allDistinct, answerTextSchema, authoringIdSchema, fragmentSchema, nullAsEmpty } from "./primitives";

export const multipleChoicePayloadSchema = nullAsEmpty(
  z.strictObject({
    selectMode: z.enum(["single", "multiple"]).default("single"),
    shuffleOptions: z.boolean().default(false),
  }),
);

export const trueFalsePayloadSchema = nullAsEmpty(
  z.strictObject({
    statementStyle: z.enum(["true_false", "yes_no"]).default("true_false"),
  }),
);

export const shortAnswerPayloadSchema = nullAsEmpty(
  z.strictObject({
    maxLength: z.int().min(1).max(QUESTION_LIMITS.shortTextResponse).optional(),
  }),
);

/** NUMERICAL and CALCULATION. */
export const numericPayloadSchema = nullAsEmpty(
  z.strictObject({
    /** Shown next to the answer box, e.g. "km/h". Never derived from the answer spec. */
    unitHint: z.string().max(QUESTION_LIMITS.unitInput).optional(),
    /** Shown before the answer box, e.g. "x =". */
    answerPrefix: z.string().max(64).optional(),
  }),
);

const matchingItemSchema = z.strictObject({ id: authoringIdSchema, content: fragmentSchema });

export const matchingPayloadSchema = z
  .strictObject({
    left: z.array(matchingItemSchema).min(1).max(QUESTION_LIMITS.maxItems),
    right: z.array(matchingItemSchema).min(1).max(QUESTION_LIMITS.maxItems),
    shuffle: z.boolean().default(true),
  })
  .superRefine((payload, ctx) => {
    if (!allDistinct(payload.left, (item) => item.id)) ctx.addIssue({ code: "custom", path: ["left"], message: "Left item ids must be unique." });
    if (!allDistinct(payload.right, (item) => item.id)) ctx.addIssue({ code: "custom", path: ["right"], message: "Right item ids must be unique." });
  });

/** Blank ids referenced by a template, in order of appearance (duplicates kept). */
export function blankIdsInTemplate(template: string): string[] {
  return Array.from(template.matchAll(BLANK_PLACEHOLDER), (m) => m[1] as string);
}

const blankSchema = z.strictObject({
  id: authoringIdSchema,
  input: z.enum(["text", "number", "select"]).default("text"),
  choices: z.array(answerTextSchema).min(2).max(50).optional(),
});

export const fillInTheBlankPayloadSchema = z
  .strictObject({
    template: z
      .string()
      .max(QUESTION_LIMITS.templateLength)
      .refine((value) => value.trim() !== "", "Must not be blank."),
    blanks: z.array(blankSchema).min(1).max(QUESTION_LIMITS.maxItems),
  })
  .superRefine((payload, ctx) => {
    if (!allDistinct(payload.blanks, (blank) => blank.id)) {
      ctx.addIssue({ code: "custom", path: ["blanks"], message: "Blank ids must be unique." });
    }
    payload.blanks.forEach((blank, index) => {
      if (blank.input === "select" && !blank.choices) {
        ctx.addIssue({ code: "custom", path: ["blanks", index, "choices"], message: "A select blank needs choices." });
      }
      if (blank.input !== "select" && blank.choices) {
        ctx.addIssue({ code: "custom", path: ["blanks", index, "choices"], message: "Only select blanks have choices." });
      }
    });
    const referenced = blankIdsInTemplate(payload.template);
    const declared = new Set(payload.blanks.map((blank) => blank.id));
    const counts = new Map<string, number>();
    for (const id of referenced) counts.set(id, (counts.get(id) ?? 0) + 1);
    for (const id of declared) {
      const count = counts.get(id) ?? 0;
      if (count !== 1) {
        ctx.addIssue({ code: "custom", path: ["template"], message: `Blank "${id}" must appear exactly once in the template (found ${count}).` });
      }
    }
    for (const id of counts.keys()) {
      if (!declared.has(id)) ctx.addIssue({ code: "custom", path: ["template"], message: `The template references an undeclared blank "${id}".` });
    }
  });

const percent = z.number().min(0).max(100);

export const diagramLabellingPayloadSchema = z
  .strictObject({
    /** The diagram (MediaAsset, purpose DIAGRAM / CONTENT_IMAGE, alt text required). */
    mediaAssetId: z.uuid(),
    /** Word bank. Omit for free-text labelling. */
    labels: z.array(z.strictObject({ id: authoringIdSchema, text: answerTextSchema })).min(1).max(QUESTION_LIMITS.maxItems).optional(),
    /** Target positions as percentages of the image width/height (responsive). */
    hotspots: z
      .array(
        z.strictObject({
          id: authoringIdSchema,
          x: percent,
          y: percent,
          w: z.number().gt(0).max(100).optional(),
          h: z.number().gt(0).max(100).optional(),
        }),
      )
      .min(1)
      .max(QUESTION_LIMITS.maxItems),
    shuffleLabels: z.boolean().default(true),
  })
  .superRefine((payload, ctx) => {
    if (!allDistinct(payload.hotspots, (h) => h.id)) ctx.addIssue({ code: "custom", path: ["hotspots"], message: "Hotspot ids must be unique." });
    if (payload.labels && !allDistinct(payload.labels, (l) => l.id)) ctx.addIssue({ code: "custom", path: ["labels"], message: "Label ids must be unique." });
  });

/** ESSAY and EXTENDED_RESPONSE. */
export const openResponsePayloadSchema = nullAsEmpty(
  z.strictObject({
    wordLimit: z
      .strictObject({ min: z.int().min(0).max(20_000).optional(), max: z.int().min(1).max(20_000).optional() })
      .refine((limit) => limit.min === undefined || limit.max === undefined || limit.min <= limit.max, "min must not exceed max.")
      .optional(),
  }),
);

/** STRUCTURED roots hold the shared context in `stem`; parts carry their own payloads. */
export const structuredPayloadSchema = z.preprocess((value) => (value === undefined ? null : value), z.null());

/** Payload schema per question type. */
export const QUESTION_PAYLOAD_SCHEMAS = {
  MULTIPLE_CHOICE: multipleChoicePayloadSchema,
  TRUE_FALSE: trueFalsePayloadSchema,
  SHORT_ANSWER: shortAnswerPayloadSchema,
  NUMERICAL: numericPayloadSchema,
  STRUCTURED: structuredPayloadSchema,
  ESSAY: openResponsePayloadSchema,
  CALCULATION: numericPayloadSchema,
  MATCHING: matchingPayloadSchema,
  FILL_IN_THE_BLANK: fillInTheBlankPayloadSchema,
  DIAGRAM_LABELLING: diagramLabellingPayloadSchema,
  EXTENDED_RESPONSE: openResponsePayloadSchema,
} as const satisfies Record<QuestionType, z.ZodType>;

export type MultipleChoicePayload = z.output<typeof multipleChoicePayloadSchema>;
export type TrueFalsePayload = z.output<typeof trueFalsePayloadSchema>;
export type ShortAnswerPayload = z.output<typeof shortAnswerPayloadSchema>;
export type NumericPayload = z.output<typeof numericPayloadSchema>;
export type MatchingPayload = z.output<typeof matchingPayloadSchema>;
export type FillInTheBlankPayload = z.output<typeof fillInTheBlankPayloadSchema>;
export type DiagramLabellingPayload = z.output<typeof diagramLabellingPayloadSchema>;
export type OpenResponsePayload = z.output<typeof openResponsePayloadSchema>;

/** Parsed (defaults applied) payload per type. */
export type QuestionPayloadMap = { [K in QuestionType]: z.output<(typeof QUESTION_PAYLOAD_SCHEMAS)[K]> };
export type PayloadFor<T extends QuestionType> = QuestionPayloadMap[T];
