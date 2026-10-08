/**
 * `Question.answerSpec` — the marking specification ("the answer", §34). SERVER-ONLY DATA: it is parsed here (shared
 * with the CMS editor for validation) but must never be sent to a student before submission (`toStudentView`).
 *
 * Shapes follow the `answerSpec` doc comment in prisma/schema.prisma (the contract) and ARCHITECTURE §4.5. Documented
 * extensions (all optional, so every documented shape still parses):
 *   SHORT_ANSWER   `accepted[].marks` (partially creditworthy answers), `accepted[].feedback`, `rejected[]`
 *                  (mark-scheme "reject" lines: never credited), `rubric[]` (keyword rubric points with marks: partial
 *                  credit), `caseSensitive` (patterns/keywords), `markScheme` (points for AI-assisted marking).
 *                  `normalise` flags are listed in `text.ts`.
 *   NUMERICAL /    `units.conversions[]` (other units accepted after conversion), `precisionPenaltyMarks` (marks lost
 *   CALCULATION    when the value is right but sigFigs/decimalPlaces are not met; omitted = no credit for the value).
 *                  `tolerance.amount` for `relative` is a FRACTION (0.01 = 1 %), at most 1.
 *   CALCULATION    `methodRequired` (a correct final answer alone does not earn the method marks).
 *   FILL_IN_THE_BLANK `blanks[].marks`, `blanks[].normalise`; `tolerance` is absolute and applies to number blanks.
 *   DIAGRAM_LABELLING `hotspots[].alternativeLabelIds`, `hotspots[].caseSensitive`, `hotspots[].marks`.
 * Defaults applied on parse: MULTIPLE_CHOICE null → `{ scoring: "all_or_nothing" }`; `units.required` false.
 *
 * Marks are whole numbers everywhere (QuestionAttempt.marksAwarded is SMALLINT); see `src/server/marking` for how
 * partial credit is floored to whole marks.
 */
import { z } from "zod";
import { QUESTION_LIMITS, type QuestionType } from "./constants";
import { checkSafePattern, MAX_SPEC_PATTERN_PROGRAM_SIZE, patternsProgramSize } from "./safe-pattern";
import { NORMALISE_FLAGS } from "./text";
import { canonicalUnit } from "./units";
import {
  allDistinct,
  answerTextSchema,
  authoringIdSchema,
  finiteNumberSchema,
  nonNegativeMarksSchema,
  notesSchema,
  nullAsEmpty,
  positiveMarksSchema,
} from "./primitives";

const MAX_ITEMS = QUESTION_LIMITS.maxItems;
const MAX_ALTERNATIVES = QUESTION_LIMITS.maxAlternatives;

/** Common to every type: guidance for AI and human markers (markdown). */
const markingNotes = { markingNotes: notesSchema.optional() };

export const normaliseFlagsSchema = z.array(z.enum(NORMALISE_FLAGS)).max(NORMALISE_FLAGS.length);

/** An anchored answer pattern that passed the ReDoS-safety grammar (`safe-pattern.ts`). */
export const safePatternSchema = z.string().superRefine((value, ctx) => {
  const check = checkSafePattern(value);
  if (!check.ok) ctx.addIssue({ code: "custom", message: check.reason });
});

const descriptionSchema = z
  .string()
  .max(2_000)
  .refine((value) => value.trim() !== "", "Must not be blank.");

/** Our OWN mark-scheme points (never a board's copyrighted scheme, §27) for AI-assisted and human marking. */
export const markSchemePointSchema = z.strictObject({
  id: authoringIdSchema,
  description: descriptionSchema,
  marks: positiveMarksSchema,
  /** Phrases/ideas that evidence the point (guidance for markers; not matched literally). */
  indicators: z.array(z.string().max(500)).max(50).optional(),
});

export const markSchemeLevelSchema = z.strictObject({
  level: z.int().min(0).max(20),
  minMarks: nonNegativeMarksSchema,
  maxMarks: nonNegativeMarksSchema,
  descriptor: z
    .string()
    .max(5_000)
    .refine((value) => value.trim() !== "", "Must not be blank."),
});

export const markSchemeSchema = z
  .strictObject({
    points: z.array(markSchemePointSchema).min(1).max(MAX_ITEMS),
    levels: z.array(markSchemeLevelSchema).min(1).max(20).optional(),
  })
  .superRefine((scheme, ctx) => {
    if (!allDistinct(scheme.points, (p) => p.id)) ctx.addIssue({ code: "custom", path: ["points"], message: "Point ids must be unique." });
    if (scheme.levels) {
      if (!allDistinct(scheme.levels, (l) => String(l.level))) ctx.addIssue({ code: "custom", path: ["levels"], message: "Levels must be unique." });
      scheme.levels.forEach((level, index) => {
        if (level.minMarks > level.maxMarks) ctx.addIssue({ code: "custom", path: ["levels", index], message: "minMarks must not exceed maxMarks." });
      });
    }
  });

// ----------------------------------------------------------------------------------------------------------------
// Selected response
// ----------------------------------------------------------------------------------------------------------------

/** Correct keys are `QuestionOption.isCorrect`; this only chooses the scoring rule for multi-select. */
export const multipleChoiceSpecSchema = nullAsEmpty(
  z.strictObject({
    scoring: z.enum(["all_or_nothing", "partial"]).default("all_or_nothing"),
    ...markingNotes,
  }),
);

export const trueFalseSpecSchema = z.strictObject({
  correct: z.boolean(),
  /** Markdown shown after answering "true" / "false". */
  feedbackTrue: notesSchema.optional(),
  feedbackFalse: notesSchema.optional(),
  ...markingNotes,
});

// ----------------------------------------------------------------------------------------------------------------
// Short answer
// ----------------------------------------------------------------------------------------------------------------

export const shortAnswerSpecSchema = z
  .strictObject({
    accepted: z
      .array(
        z.strictObject({
          value: answerTextSchema,
          caseSensitive: z.boolean().optional(),
          /** Marks for this answer when it is only partially creditworthy (default: full marks). */
          marks: positiveMarksSchema.optional(),
          feedback: notesSchema.optional(),
        }),
      )
      .max(MAX_ALTERNATIVES)
      .default([]),
    /** Anchored, ReDoS-safe regular expressions matched against the normalised answer. */
    patterns: z.array(safePatternSchema).max(QUESTION_LIMITS.maxPatterns).optional(),
    /** Full credit when the answer contains ALL of `all` and at least `minAny` (default 1) of `any`. */
    keywords: z
      .strictObject({
        all: z.array(answerTextSchema).max(50).optional(),
        any: z.array(answerTextSchema).max(MAX_ALTERNATIVES).optional(),
        minAny: z.int().min(1).max(MAX_ALTERNATIVES).optional(),
      })
      .refine((k) => (k.all?.length ?? 0) + (k.any?.length ?? 0) > 0, "List at least one keyword.")
      .refine((k) => k.minAny === undefined || k.minAny <= (k.any?.length ?? 0), "minAny cannot exceed the number of 'any' keywords.")
      .optional(),
    /** Keyword rubric: each point is earned when ANY of its phrases appears (whole words; trailing * = prefix). */
    rubric: z
      .array(
        z.strictObject({
          id: authoringIdSchema,
          anyOf: z.array(answerTextSchema).min(1).max(50),
          marks: positiveMarksSchema,
          description: z.string().max(2_000).optional(),
        }),
      )
      .min(1)
      .max(50)
      .optional(),
    /** Answers that must never be credited (exact match after normalisation). */
    rejected: z.array(z.strictObject({ value: answerTextSchema, feedback: notesSchema.optional() })).max(MAX_ALTERNATIVES).optional(),
    normalise: normaliseFlagsSchema.optional(),
    /** Case sensitivity of patterns, keywords, rubric and rejected answers (default false). */
    caseSensitive: z.boolean().optional(),
    /** Mark scheme for AI-assisted / manual marking of answers the rules above cannot decide. */
    markScheme: markSchemeSchema.optional(),
    ...markingNotes,
  })
  .superRefine((spec, ctx) => {
    const hasRule =
      spec.accepted.length > 0 || (spec.patterns?.length ?? 0) > 0 || spec.keywords !== undefined || spec.rubric !== undefined || spec.markScheme !== undefined;
    if (!hasRule) ctx.addIssue({ code: "custom", message: "Give accepted answers, patterns, keywords, a rubric or a mark scheme." });
    if (spec.rubric && !allDistinct(spec.rubric, (p) => p.id)) ctx.addIssue({ code: "custom", path: ["rubric"], message: "Rubric point ids must be unique." });
    // Bounds the matching work per answer (safe-pattern.ts); also enforced whenever a stored spec is parsed for marking.
    if (spec.patterns && patternsProgramSize(spec.patterns) > MAX_SPEC_PATTERN_PROGRAM_SIZE) {
      ctx.addIssue({ code: "custom", path: ["patterns"], message: "These patterns are too long in total once their repetitions are expanded: use fewer patterns or smaller {n,m} counts." });
    }
  });

// ----------------------------------------------------------------------------------------------------------------
// Numeric
// ----------------------------------------------------------------------------------------------------------------

export const toleranceSchema = z.discriminatedUnion("kind", [
  z.strictObject({ kind: z.literal("absolute"), amount: z.number().min(0).refine(Number.isFinite, "Must be finite.") }),
  /** Fraction of the expected value: 0.01 = 1 %. */
  z.strictObject({ kind: z.literal("relative"), amount: z.number().min(0).max(1) }),
]);

export const sigFigsSchema = z
  .strictObject({ min: z.int().min(1).max(15).optional(), max: z.int().min(1).max(15).optional() })
  .refine((s) => s.min !== undefined || s.max !== undefined, "Give min and/or max significant figures.")
  .refine((s) => s.min === undefined || s.max === undefined || s.min <= s.max, "min must not exceed max.");

const unitTextSchema = z
  .string()
  .max(QUESTION_LIMITS.unitInput)
  .refine((value) => canonicalUnit(value) !== "", "Must not be blank.");

export const unitsSpecSchema = z
  .strictObject({
    required: z.boolean().default(false),
    /** Spellings of the canonical unit (the unit `value` is expressed in). */
    accepted: z.array(unitTextSchema).min(1).max(50),
    /** Other units, converted with canonical = value × factor + offset. */
    conversions: z
      .array(
        z.strictObject({
          unit: unitTextSchema,
          factor: finiteNumberSchema.refine((f) => f !== 0, "factor must not be zero."),
          offset: finiteNumberSchema.optional(),
        }),
      )
      .max(50)
      .optional(),
    /** Marks lost for a missing (when required) or unrecognised unit. Default 1. */
    penaltyMarks: nonNegativeMarksSchema.optional(),
  })
  .superRefine((units, ctx) => {
    const accepted = new Set(units.accepted.map(canonicalUnit));
    const seen = new Set<string>();
    (units.conversions ?? []).forEach((conversion, index) => {
      const unit = canonicalUnit(conversion.unit);
      if (accepted.has(unit) || seen.has(unit)) {
        ctx.addIssue({ code: "custom", path: ["conversions", index, "unit"], message: "This unit is already listed." });
      }
      seen.add(unit);
    });
  });

const numericSpecShape = {
  value: finiteNumberSchema,
  tolerance: toleranceSchema.optional(),
  sigFigs: sigFigsSchema.optional(),
  decimalPlaces: z.int().min(0).max(15).optional(),
  precisionPenaltyMarks: nonNegativeMarksSchema.optional(),
  units: unitsSpecSchema.optional(),
  ...markingNotes,
};

export const numericalSpecSchema = z.strictObject(numericSpecShape);

export const methodMarkSchema = z.strictObject({
  id: authoringIdSchema,
  description: descriptionSchema,
  marks: positiveMarksSchema,
});

export const calculationSpecSchema = z
  .strictObject({
    ...numericSpecShape,
    /** M marks for the working (AI-assisted or manual). The remaining marks are A marks for the final answer. */
    methodMarks: z.array(methodMarkSchema).min(1).max(20).optional(),
    /** When true a correct final answer does NOT imply the method marks ("show that" questions). */
    methodRequired: z.boolean().optional(),
  })
  .superRefine((spec, ctx) => {
    if (spec.methodMarks && !allDistinct(spec.methodMarks, (m) => m.id)) {
      ctx.addIssue({ code: "custom", path: ["methodMarks"], message: "Method mark ids must be unique." });
    }
  });

// ----------------------------------------------------------------------------------------------------------------
// Pairing and blanks
// ----------------------------------------------------------------------------------------------------------------

export const matchingSpecSchema = z
  .strictObject({
    /** Correct pairs. Listing a leftId twice makes either right item acceptable for it. */
    pairs: z.array(z.strictObject({ leftId: authoringIdSchema, rightId: authoringIdSchema })).min(1).max(MAX_ITEMS * 2),
    marksPerPair: positiveMarksSchema.optional(),
    ...markingNotes,
  })
  .superRefine((spec, ctx) => {
    if (!allDistinct(spec.pairs, (p) => `${p.leftId}\u0000${p.rightId}`)) ctx.addIssue({ code: "custom", path: ["pairs"], message: "Duplicate pair." });
  });

export const fillInTheBlankSpecSchema = z
  .strictObject({
    blanks: z
      .array(
        z.strictObject({
          id: authoringIdSchema,
          accepted: z.array(answerTextSchema).min(1).max(MAX_ALTERNATIVES),
          caseSensitive: z.boolean().optional(),
          /** Absolute tolerance for number blanks. */
          tolerance: z.number().min(0).refine(Number.isFinite, "Must be finite.").optional(),
          marks: positiveMarksSchema.optional(),
          normalise: normaliseFlagsSchema.optional(),
        }),
      )
      .min(1)
      .max(MAX_ITEMS),
    ...markingNotes,
  })
  .superRefine((spec, ctx) => {
    if (!allDistinct(spec.blanks, (b) => b.id)) ctx.addIssue({ code: "custom", path: ["blanks"], message: "Blank ids must be unique." });
  });

export const diagramLabellingSpecSchema = z
  .strictObject({
    hotspots: z
      .array(
        z
          .strictObject({
            hotspotId: authoringIdSchema,
            /** Correct word-bank label. */
            labelId: authoringIdSchema.optional(),
            /** Other word-bank labels that are also correct here. */
            alternativeLabelIds: z.array(authoringIdSchema).min(1).max(20).optional(),
            /** Accepted free-text labels (and word-bank label TEXTS that are acceptable). */
            accepted: z.array(answerTextSchema).min(1).max(MAX_ALTERNATIVES).optional(),
            caseSensitive: z.boolean().optional(),
            marks: positiveMarksSchema.optional(),
          })
          .refine((h) => h.labelId !== undefined || h.alternativeLabelIds !== undefined || h.accepted !== undefined, "Give a labelId or accepted texts."),
      )
      .min(1)
      .max(MAX_ITEMS),
    ...markingNotes,
  })
  .superRefine((spec, ctx) => {
    if (!allDistinct(spec.hotspots, (h) => h.hotspotId)) ctx.addIssue({ code: "custom", path: ["hotspots"], message: "Hotspot ids must be unique." });
  });

// ----------------------------------------------------------------------------------------------------------------
// Open responses
// ----------------------------------------------------------------------------------------------------------------

/** ESSAY and EXTENDED_RESPONSE: never auto-marked. */
export const openResponseSpecSchema = z.strictObject({
  markScheme: markSchemeSchema,
  /** Our own exemplar answer (markdown), revealed after marking. */
  modelAnswer: notesSchema.optional(),
  ...markingNotes,
});

/** STRUCTURED roots have no answer spec (CHECK Question_structured_spec_chk); parts carry their own. */
export const structuredSpecSchema = z.preprocess((value) => (value === undefined ? null : value), z.null());

/** Answer-spec schema per question type. */
export const ANSWER_SPEC_SCHEMAS = {
  MULTIPLE_CHOICE: multipleChoiceSpecSchema,
  TRUE_FALSE: trueFalseSpecSchema,
  SHORT_ANSWER: shortAnswerSpecSchema,
  NUMERICAL: numericalSpecSchema,
  STRUCTURED: structuredSpecSchema,
  ESSAY: openResponseSpecSchema,
  CALCULATION: calculationSpecSchema,
  MATCHING: matchingSpecSchema,
  FILL_IN_THE_BLANK: fillInTheBlankSpecSchema,
  DIAGRAM_LABELLING: diagramLabellingSpecSchema,
  EXTENDED_RESPONSE: openResponseSpecSchema,
} as const satisfies Record<QuestionType, z.ZodType>;

export type MarkScheme = z.output<typeof markSchemeSchema>;
export type MarkSchemePoint = z.output<typeof markSchemePointSchema>;
export type MultipleChoiceSpec = z.output<typeof multipleChoiceSpecSchema>;
export type TrueFalseSpec = z.output<typeof trueFalseSpecSchema>;
export type ShortAnswerSpec = z.output<typeof shortAnswerSpecSchema>;
export type Tolerance = z.output<typeof toleranceSchema>;
export type UnitsSpec = z.output<typeof unitsSpecSchema>;
export type NumericalSpec = z.output<typeof numericalSpecSchema>;
export type CalculationSpec = z.output<typeof calculationSpecSchema>;
export type MatchingSpec = z.output<typeof matchingSpecSchema>;
export type FillInTheBlankSpec = z.output<typeof fillInTheBlankSpecSchema>;
export type DiagramLabellingSpec = z.output<typeof diagramLabellingSpecSchema>;
export type OpenResponseSpec = z.output<typeof openResponseSpecSchema>;

/** Parsed (defaults applied) answer spec per type. */
export type AnswerSpecMap = { [K in QuestionType]: z.output<(typeof ANSWER_SPEC_SCHEMAS)[K]> };
export type AnswerSpecFor<T extends QuestionType> = AnswerSpecMap[T];
