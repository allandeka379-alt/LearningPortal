import { z } from "zod";
import { CognitiveSkill, ContentAccessTier, ContentStatus, CopyrightStatus } from "@/generated/prisma/enums";
import { MARKING_MODES, QUESTION_LIMITS, QUESTION_TYPES, optionKeySchema, type MarkingMode, type QuestionType } from "@/lib/questions";

/**
 * Zod contracts of the question-bank CMS (§9, §27, §42). Isomorphic (no server-only imports) so the editor can share
 * the input TYPES; validation always runs on the server.
 *
 * The editor posts ONE JSON document per save (`QuestionEditorInput`): metadata, licensing, the type's presentation
 * `payload` and marking `answerSpec` (shapes from `@/lib/questions`), MCQ options and structured parts. Drafts may be
 * saved while still incomplete: this schema bounds sizes and checks field types and metadata ranges, while the
 * question-definition rules (`validateQuestionDefinition`) are reported as issues and block submission for review.
 */

const blankToNull = (value: unknown) => (typeof value === "string" && value.trim() === "" ? null : (value ?? null));

function optionalText(max: number) {
  return z.preprocess(
    (value) => (typeof value === "string" ? (value.trim() === "" ? null : value.trim()) : (value ?? null)),
    z.string().max(max, `Use at most ${max.toLocaleString("en")} characters.`).nullable(),
  );
}

const uuid = z.uuid("Choose a valid item.");
const optionalUuid = z.preprocess(blankToNull, uuid.nullable());

function optionalInt(min: number, max: number, message: string) {
  return z.preprocess(
    (value) => (value === "" || value === null || value === undefined ? null : typeof value === "string" ? Number(value) : value),
    z.int(message).min(min, message).max(max, message).nullable(),
  );
}

/** Upper bound of a stored JSON document (payload / answer spec) as text. */
export const MAX_JSON_DOCUMENT = 200_000;

/** A JSON object (or null) of bounded size; its shape is checked by the per-type rules. */
const jsonDocument = z.unknown().superRefine((value, ctx) => {
  if (value === null || value === undefined) return;
  if (typeof value !== "object" || Array.isArray(value)) {
    ctx.addIssue({ code: "custom", message: "Must be an object." });
    return;
  }
  if (JSON.stringify(value).length > MAX_JSON_DOCUMENT) ctx.addIssue({ code: "custom", message: "This question is too large to store." });
});

const markdown = (max: number) => z.string().max(max, `Use at most ${max.toLocaleString("en")} characters.`);

export const questionTypeSchema = z.enum(QUESTION_TYPES as [QuestionType, ...QuestionType[]], { message: "Choose a question type." });
export const markingModeSchema = z.enum(MARKING_MODES as [MarkingMode, ...MarkingMode[]], { message: "Choose a marking mode." });

export const questionOptionInputSchema = z.object({
  key: optionKeySchema,
  content: markdown(QUESTION_LIMITS.fragmentLength).refine((value) => value.trim() !== "", "Write the option text."),
  isCorrect: z.boolean(),
  rationale: optionalText(QUESTION_LIMITS.notesLength),
  mediaAssetId: optionalUuid.optional(),
});
/** An MCQ option as the editor sends it. */
export interface QuestionOptionInput {
  key: string;
  content: string;
  isCorrect: boolean;
  rationale?: string | null;
  mediaAssetId?: string | null;
}

const marksSchema = z.int("Marks must be a whole number.").min(1, "At least 1 mark.").max(QUESTION_LIMITS.maxMarks, "At most 1000 marks.");

const definitionShape = {
  type: questionTypeSchema,
  markingMode: markingModeSchema,
  stem: markdown(20_000),
  payload: jsonDocument,
  answerSpec: jsonDocument,
  marks: marksSchema,
  options: z.array(questionOptionInputSchema).max(QUESTION_LIMITS.maxOptions).default([]),
};

const partLabelSchema = z
  .string()
  .trim()
  .min(1, "Give the part a label such as (a).")
  .max(16, "Use at most 16 characters.");

const partTextShape = {
  explanation: optionalText(50_000),
  workedSolution: optionalText(50_000),
  hints: z.array(markdown(5_000).refine((value) => value.trim() !== "", "Remove empty hints.")).max(10, "At most 10 hints.").default([]),
};

/** A sub-part ("(b)(i)"); parts nest at most one level. */
export const subPartInputSchema = z.object({
  /** Existing part row id (kept so a draft copy's part still matches its live part at publish). */
  id: optionalUuid.optional(),
  partLabel: partLabelSchema,
  ...definitionShape,
  ...partTextShape,
});

export const partInputSchema = subPartInputSchema.extend({
  parts: z.array(subPartInputSchema).max(QUESTION_LIMITS.maxParts).default([]),
});
/** A part ("(a)") or sub-part ("(b)(i)") as the editor sends it; `id` names an existing part row. */
export interface QuestionPartInput {
  id?: string | null;
  partLabel: string;
  type: QuestionType;
  markingMode: MarkingMode;
  stem: string;
  payload: unknown;
  answerSpec: unknown;
  marks: number;
  options?: QuestionOptionInput[];
  explanation?: string | null;
  workedSolution?: string | null;
  hints?: string[];
  /** Sub-parts (parts only; ignored on sub-parts). */
  parts?: QuestionPartInput[];
}

export const topicTagInputSchema = z.object({ topicId: uuid, isPrimary: z.boolean().default(false) });

/** Provenance fields (§27). LICENSED needs a source; OPEN_LICENSE a source or a licence code (database CHECKs). */
export const provenanceShape = {
  sourceId: optionalUuid,
  author: optionalText(200),
  copyrightStatus: z.enum(Object.values(CopyrightStatus) as [CopyrightStatus, ...CopyrightStatus[]], { message: "Choose a copyright status." }),
  licenceCode: optionalText(64),
  attribution: optionalText(1_000),
  sourceUrl: z.preprocess(
    (value) => (typeof value === "string" && value.trim() === "" ? null : typeof value === "string" ? value.trim() : (value ?? null)),
    z
      .string()
      .max(2_000)
      .refine((value) => /^https?:\/\/\S+$/i.test(value), "Enter a full web address starting with https://.")
      .nullable(),
  ),
  publicationDate: z.preprocess(
    blankToNull,
    z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Use the format YYYY-MM-DD.")
      .refine((value) => !Number.isNaN(new Date(`${value}T00:00:00Z`).getTime()), "Enter a real date.")
      .nullable(),
  ),
};

/** Adds the licence-evidence rules of the database as field errors. */
export function refineProvenance(value: { copyrightStatus: string; sourceId: string | null; licenceCode: string | null }, ctx: z.RefinementCtx): void {
  if (value.copyrightStatus === "LICENSED" && !value.sourceId) {
    ctx.addIssue({ code: "custom", path: ["sourceId"], message: "Licensed content must name the content source that holds the licence." });
  }
  if (value.copyrightStatus === "OPEN_LICENSE" && !value.sourceId && !value.licenceCode) {
    ctx.addIssue({ code: "custom", path: ["licenceCode"], message: "Open-licensed content needs a source or a licence code such as CC-BY-4.0." });
  }
}

export const questionEditorSchema = z
  .object({
    subjectId: uuid,
    ...definitionShape,
    parts: z.array(partInputSchema).max(QUESTION_LIMITS.maxParts).default([]),
    explanation: optionalText(50_000),
    workedSolution: optionalText(50_000),
    conceptSummary: optionalText(5_000),
    hints: partTextShape.hints,
    relatedLessonId: optionalUuid,
    difficulty: z.int("Choose a difficulty.").min(1, "Choose a difficulty from 1 to 5.").max(5, "Choose a difficulty from 1 to 5."),
    estimatedSeconds: optionalInt(1, 36_000, "Enter a time from 1 second to 10 hours."),
    year: optionalInt(1900, 2100, "Enter a year from 1900 to 2100."),
    paperLabel: optionalText(32),
    cognitiveSkill: z.preprocess(blankToNull, z.enum(Object.values(CognitiveSkill) as [CognitiveSkill, ...CognitiveSkill[]]).nullable()),
    isExamStyle: z.boolean().default(false),
    isDailyEligible: z.boolean().default(false),
    calculatorAllowed: z.boolean().nullable().default(null),
    accessTier: z.enum(Object.values(ContentAccessTier) as [ContentAccessTier, ...ContentAccessTier[]]),
    languageCode: z
      .string()
      .trim()
      .regex(/^[a-z]{2,3}(-[A-Za-z0-9]{2,8})*$/, "Use a language code such as en, sn or nd.")
      .max(10)
      .default("en"),
    topics: z.array(topicTagInputSchema).max(50, "At most 50 topic tags.").default([]),
    objectiveIds: z.array(uuid).max(50, "At most 50 learning objectives.").default([]),
    ...provenanceShape,
  })
  .superRefine(refineProvenance);
/** Licensing fields as forms send them (§27). */
export interface ProvenanceInput {
  sourceId?: string | null;
  author?: string | null;
  copyrightStatus: CopyrightStatus;
  licenceCode?: string | null;
  attribution?: string | null;
  sourceUrl?: string | null;
  /** YYYY-MM-DD. */
  publicationDate?: string | null;
}

/** The question editor document (what the editor posts; validated by {@link questionEditorSchema}). */
export interface QuestionEditorInput extends ProvenanceInput {
  subjectId: string;
  type: QuestionType;
  markingMode: MarkingMode;
  stem: string;
  payload: unknown;
  answerSpec: unknown;
  marks: number;
  options?: QuestionOptionInput[];
  parts?: QuestionPartInput[];
  explanation?: string | null;
  workedSolution?: string | null;
  conceptSummary?: string | null;
  hints?: string[];
  relatedLessonId?: string | null;
  difficulty: number;
  estimatedSeconds?: number | null;
  year?: number | null;
  paperLabel?: string | null;
  cognitiveSkill?: CognitiveSkill | null;
  isExamStyle?: boolean;
  isDailyEligible?: boolean;
  calculatorAllowed?: boolean | null;
  accessTier: ContentAccessTier;
  languageCode?: string;
  topics?: { topicId: string; isPrimary?: boolean }[];
  objectiveIds?: string[];
}
export type QuestionEditorData = z.output<typeof questionEditorSchema>;

/** Update = the full document + the row and the version the editor loaded (optimistic concurrency). */
export const questionUpdateSchema = z.object({
  id: uuid,
  /** `updatedAt` (ISO) of the row the editor loaded; a different value means someone else saved meanwhile. */
  version: z.string().max(40).optional(),
  question: z.unknown(),
});

// ---------------------------------------------------------------------------------------------------------------------
// List filters (URL search params)
// ---------------------------------------------------------------------------------------------------------------------

const optionalFilterUuid = z.preprocess(blankToNull, uuid.nullable().optional());
const optionalEnum = <T extends string>(values: readonly T[]) => z.preprocess(blankToNull, z.enum(values as [T, ...T[]]).nullable().optional());
const optionalNumber = (min: number, max: number) =>
  z.preprocess((value) => (value === "" || value === null || value === undefined ? null : Number(value)), z.int().min(min).max(max).nullable().optional());

export const YES_NO = ["yes", "no"] as const;

export const questionFilterSchema = z.object({
  q: z.preprocess(blankToNull, z.string().trim().max(200).nullable().optional()),
  boardId: optionalFilterUuid,
  qualificationId: optionalFilterUuid,
  subjectId: optionalFilterUuid,
  syllabusId: optionalFilterUuid,
  topicId: optionalFilterUuid,
  type: optionalEnum(QUESTION_TYPES),
  difficulty: optionalNumber(1, 5),
  marks: optionalNumber(1, QUESTION_LIMITS.maxMarks),
  status: optionalEnum(Object.values(ContentStatus) as ContentStatus[]),
  year: optionalNumber(1900, 2100),
  paper: z.preprocess(blankToNull, z.string().trim().max(32).nullable().optional()),
  skill: optionalEnum(Object.values(CognitiveSkill) as CognitiveSkill[]),
  ai: optionalEnum(YES_NO),
  flagged: optionalEnum(YES_NO),
  cursor: z.preprocess(blankToNull, z.string().max(200).nullable().optional()),
});
export type QuestionFilter = z.input<typeof questionFilterSchema>;

/** Picker for assessment items: PUBLISHED platform root questions only. */
export const questionPickerSchema = z.object({
  subjectId: uuid,
  syllabusId: optionalFilterUuid,
  topicId: optionalFilterUuid,
  type: optionalEnum(QUESTION_TYPES),
  difficulty: optionalNumber(1, 5),
  q: z.preprocess(blankToNull, z.string().trim().max(200).nullable().optional()),
  excludeIds: z.array(uuid).max(500).default([]),
  limit: z.int().min(1).max(50).default(20),
});
export type QuestionPickerInput = z.input<typeof questionPickerSchema>;

/** "Try it": a sample response marked with the real marking engine. */
export const tryQuestionSchema = z.object({ questionId: uuid, response: z.unknown() });
