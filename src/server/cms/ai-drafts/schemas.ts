import { z } from "zod";
import type { QuestionType } from "@/generated/prisma/enums";

/**
 * AI content generation for editors (§41; ARCHITECTURE §6.6): the request contract, kind metadata and labels.
 * Isomorphic (no server-only imports) so the generate page and the services share one vocabulary.
 *
 * Every generated item is a DRAFT with `aiGenerated = true` and its `generationJobId`; a person must review, approve
 * (never the requester when four-eyes is on) and publish it. Nothing here can publish.
 */

export const AI_DRAFT_KINDS = ["QUESTIONS", "MCQ", "FLASHCARDS", "LESSON", "EXPLANATION", "HINTS", "STUDY_PLAN"] as const;
export type AiDraftKind = (typeof AI_DRAFT_KINDS)[number];

export const AI_JOB_STATUSES = ["QUEUED", "RUNNING", "COMPLETED", "FAILED", "CANCELLED"] as const;
export type AiJobStatus = (typeof AI_JOB_STATUSES)[number];

export interface AiKindMeta {
  label: string;
  description: string;
  /** What `count` means for this kind, e.g. "Questions". */
  countLabel: string;
  defaultCount: number;
  maxCount: number;
  /** Content type the output is stored as (for links into the editors and the review queue). */
  output: "QUESTION" | "FLASHCARD" | "LESSON" | "STUDY_PLAN_TEMPLATE";
  /** Writes into an existing question (a draft copy when it is published). */
  needsTargetQuestion: boolean;
  needsSyllabus: boolean;
}

/**
 * Per-kind limits keep one structured response within the DEEP route's output budget (16k tokens, thinking included),
 * so a job is never truncated half-way.
 */
export const AI_KIND_META: Readonly<Record<AiDraftKind, AiKindMeta>> = {
  QUESTIONS: {
    label: "Practice questions",
    description: "Mixed question types with answers, our own mark schemes, explanations and hints.",
    countLabel: "Questions",
    defaultCount: 5,
    maxCount: 8,
    output: "QUESTION",
    needsTargetQuestion: false,
    needsSyllabus: false,
  },
  MCQ: {
    label: "Multiple-choice questions",
    description: "Single-answer MCQs with plausible distractors and feedback for every option.",
    countLabel: "Questions",
    defaultCount: 6,
    maxCount: 10,
    output: "QUESTION",
    needsTargetQuestion: false,
    needsSyllabus: false,
  },
  FLASHCARDS: {
    label: "Flashcards",
    description: "Definitions, formulas, key facts and vocabulary for the topic.",
    countLabel: "Cards",
    defaultCount: 12,
    maxCount: 30,
    output: "FLASHCARD",
    needsTargetQuestion: false,
    needsSyllabus: false,
  },
  LESSON: {
    label: "Lesson explanation",
    description: "One lesson page with definitions, worked examples, common mistakes and exam tips.",
    countLabel: "Lessons",
    defaultCount: 1,
    maxCount: 1,
    output: "LESSON",
    needsTargetQuestion: false,
    needsSyllabus: false,
  },
  EXPLANATION: {
    label: "Explanation for a question",
    description: "Why the answer is right, a step-by-step worked solution and the key concept, for an existing question.",
    countLabel: "Explanations",
    defaultCount: 1,
    maxCount: 1,
    output: "QUESTION",
    needsTargetQuestion: true,
    needsSyllabus: false,
  },
  HINTS: {
    label: "Hints for a question",
    description: "A ladder of hints that guide the student without giving the answer away.",
    countLabel: "Hints",
    defaultCount: 3,
    maxCount: 5,
    output: "QUESTION",
    needsTargetQuestion: true,
    needsSyllabus: false,
  },
  STUDY_PLAN: {
    label: "Study plan template",
    description: "A week-by-week plan through the syllabus version's topics.",
    countLabel: "Weeks",
    defaultCount: 8,
    maxCount: 16,
    output: "STUDY_PLAN_TEMPLATE",
    needsTargetQuestion: false,
    needsSyllabus: true,
  },
};

/** Types the generator writes (deterministic or mark-scheme based; no diagrams, matching grids or structured parts). */
export const GENERATABLE_QUESTION_TYPES = ["MULTIPLE_CHOICE", "TRUE_FALSE", "SHORT_ANSWER", "NUMERICAL", "CALCULATION", "ESSAY", "EXTENDED_RESPONSE"] as const satisfies readonly QuestionType[];
export type GeneratableQuestionType = (typeof GENERATABLE_QUESTION_TYPES)[number];

export const DIFFICULTY_BANDS = ["EASY", "MEDIUM", "HARD", "MIXED"] as const;
export type DifficultyBand = (typeof DIFFICULTY_BANDS)[number];
export const DIFFICULTY_LABELS: Readonly<Record<DifficultyBand, string>> = {
  EASY: "Easy (1–2)",
  MEDIUM: "Medium (3)",
  HARD: "Hard (4–5)",
  MIXED: "Mixed (1–5)",
};

export const LANGUAGE_LEVELS = ["SIMPLE", "STANDARD", "ADVANCED"] as const;
export type LanguageLevel = (typeof LANGUAGE_LEVELS)[number];
export const LANGUAGE_LEVEL_LABELS: Readonly<Record<LanguageLevel, { label: string; hint: string }>> = {
  SIMPLE: { label: "Simple", hint: "Short sentences and everyday words, technical terms explained (English as a second language)." },
  STANDARD: { label: "Exam standard", hint: "The language expected at this level in the exam." },
  ADVANCED: { label: "Advanced", hint: "Precise technical language with extension depth for strong students." },
};

export const ACCESS_TIERS = ["PREMIUM", "FREE", "PUBLIC"] as const;

const blankToNull = (value: unknown) => (typeof value === "string" && value.trim() === "" ? null : (value ?? null));
const optionalUuid = (message: string) => z.preprocess(blankToNull, z.uuid(message).nullable());
/** Optional whole number from a form field (blank = not given). */
const optionalIntFromForm = (min: number, max: number, message: string) =>
  z.preprocess((value) => (value === "" || value === null || value === undefined ? undefined : Number(value)), z.int(message).min(min, message).max(max, message).optional());
const listFromForm = <T extends z.ZodType>(item: T, max: number) =>
  z.preprocess((value) => (value === undefined || value === null || value === "" ? [] : Array.isArray(value) ? value.filter((v) => v !== "") : [value]), z.array(item).max(max));

/** A generation request as the generate form submits it (validated again in the service). */
export const generationRequestSchema = z
  .object({
    kind: z.enum(AI_DRAFT_KINDS, { message: "Choose what to generate." }),
    subjectId: z.uuid("Choose a subject."),
    syllabusId: optionalUuid("Choose a syllabus version."),
    topicId: optionalUuid("Choose a topic."),
    objectiveIds: listFromForm(z.uuid("Choose valid learning objectives."), 20),
    count: optionalIntFromForm(1, 30, "Choose how many to generate."),
    difficulty: z.preprocess((v) => (v === "" || v === undefined ? "MIXED" : v), z.enum(DIFFICULTY_BANDS)),
    languageLevel: z.preprocess((v) => (v === "" || v === undefined ? "STANDARD" : v), z.enum(LANGUAGE_LEVELS)),
    questionTypes: listFromForm(z.enum(GENERATABLE_QUESTION_TYPES), GENERATABLE_QUESTION_TYPES.length),
    marksPerQuestion: z.preprocess(blankToNull, z.coerce.number().int("Use whole marks.").min(1, "At least 1 mark.").max(20, "At most 20 marks.").nullable()),
    targetQuestionId: optionalUuid("Choose the question."),
    accessTier: z.preprocess((v) => (v === "" || v === undefined ? "PREMIUM" : v), z.enum(ACCESS_TIERS)),
    weeklyMinutes: z.preprocess(blankToNull, z.coerce.number().int().min(30, "At least 30 minutes a week.").max(1_200, "At most 1,200 minutes a week.").nullable()),
    instructions: z.preprocess(blankToNull, z.string().trim().max(1_000, "Keep the instructions under 1,000 characters.").nullable()),
  })
  .superRefine((value, ctx) => {
    const meta = AI_KIND_META[value.kind];
    const count = value.count ?? meta.defaultCount;
    if (count > meta.maxCount) ctx.addIssue({ code: "custom", path: ["count"], message: `Generate at most ${meta.maxCount} ${meta.countLabel.toLowerCase()} per run.` });
    if (meta.needsTargetQuestion && !value.targetQuestionId) ctx.addIssue({ code: "custom", path: ["targetQuestionId"], message: "Choose the question to write it for." });
    if (meta.needsSyllabus && !value.syllabusId) ctx.addIssue({ code: "custom", path: ["syllabusId"], message: "Study plans follow one syllabus version: choose it." });
    if (value.topicId && !value.syllabusId) ctx.addIssue({ code: "custom", path: ["syllabusId"], message: "Choose the syllabus version of the topic." });
    if (value.objectiveIds.length > 0 && !value.syllabusId) ctx.addIssue({ code: "custom", path: ["objectiveIds"], message: "Learning objectives belong to a syllabus version: choose it first." });
  });
export type GenerationRequestInput = z.input<typeof generationRequestSchema>;
export type GenerationRequest = z.output<typeof generationRequestSchema>;

/** `AiGenerationJob.params` (Json, version 1). */
export const generationParamsSchema = z.looseObject({
  version: z.literal(1),
  count: z.int().min(1).max(30),
  difficulty: z.enum(DIFFICULTY_BANDS),
  languageLevel: z.enum(LANGUAGE_LEVELS),
  language: z.string().max(10),
  questionTypes: z.array(z.enum(GENERATABLE_QUESTION_TYPES)).default([]),
  learningObjectiveIds: z.array(z.uuid()).default([]),
  marksPerQuestion: z.int().min(1).max(20).nullable().default(null),
  targetQuestionId: z.uuid().nullable().default(null),
  accessTier: z.enum(ACCESS_TIERS).default("PREMIUM"),
  weeklyMinutes: z.int().nullable().default(null),
  instructions: z.string().max(1_000).nullable().default(null),
});
export type GenerationParams = z.output<typeof generationParamsSchema>;

/** `AiGenerationJob.outputSummary` (Json). */
export const outputSummarySchema = z.looseObject({
  created: z.array(z.object({ entityType: z.string(), id: z.uuid() })).default([]),
  nearDuplicatesFlagged: z.int().min(0).default(0),
  nearDuplicates: z.array(z.object({ id: z.uuid(), similarToId: z.uuid(), similarity: z.number() })).default([]),
  rejected: z.array(z.object({ index: z.int(), reason: z.string() })).default([]),
  warnings: z.array(z.string()).default([]),
});
export type OutputSummary = z.output<typeof outputSummarySchema>;

export const generationFilterSchema = z.object({
  status: z.enum(AI_JOB_STATUSES).optional(),
  kind: z.enum(AI_DRAFT_KINDS).optional(),
  mine: z.preprocess((v) => v === true || v === "true" || v === "1", z.boolean()).default(false),
  cursor: z.string().max(200).optional(),
  limit: z.coerce.number().int().min(1).max(100).default(25),
});

export const AI_JOB_STATUS_META: Readonly<Record<AiJobStatus, { label: string; tone: "neutral" | "info" | "success" | "danger"; outline?: boolean }>> = {
  QUEUED: { label: "Queued", tone: "neutral" },
  RUNNING: { label: "Generating", tone: "info" },
  COMPLETED: { label: "Drafts ready", tone: "success" },
  FAILED: { label: "Failed", tone: "danger" },
  CANCELLED: { label: "Cancelled", tone: "neutral", outline: true },
};
