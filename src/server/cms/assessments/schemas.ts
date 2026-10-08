import { z } from "zod";
import {
  AssessmentAssembly,
  AssessmentFeedbackTiming,
  AssessmentKind,
  CognitiveSkill,
  ContentAccessTier,
  ContentStatus,
} from "@/generated/prisma/enums";
import { QUESTION_TYPES, type QuestionType } from "@/lib/questions";
import { provenanceShape, refineProvenance, type ProvenanceInput } from "@/server/cms/questions/schemas";

/**
 * Zod contracts of the assessment builder (§12, §13, §46): topic / chapter / subject tests, timed exams, mock exams
 * and diagnostics. Isomorphic (types are shared with the builder UI); validation runs on the server.
 */

const blankToNull = (value: unknown) => (typeof value === "string" && value.trim() === "" ? null : (value ?? null));
const uuid = z.uuid("Choose a valid item.");
const optionalUuid = z.preprocess(blankToNull, uuid.nullable());
const flag = z.preprocess((value) => value === true || value === "true" || value === "on" || value === "1", z.boolean());

function optionalText(max: number) {
  return z.preprocess(
    (value) => (typeof value === "string" ? (value.trim() === "" ? null : value.trim()) : (value ?? null)),
    z.string().max(max, `Use at most ${max.toLocaleString("en")} characters.`).nullable(),
  );
}

function optionalInt(min: number, max: number, message: string) {
  return z.preprocess(
    (value) => (value === "" || value === null || value === undefined ? null : typeof value === "string" ? Number(value) : value),
    z.int(message).min(min, message).max(max, message).nullable(),
  );
}

function requiredInt(min: number, max: number, message: string) {
  return z.preprocess((value) => (typeof value === "string" && value.trim() !== "" ? Number(value) : value), z.int(message).min(min, message).max(max, message));
}

const enumOf = <T extends string>(values: Record<string, T>, message: string) => z.enum(Object.values(values) as [T, ...T[]], { message });

export const assessmentMetaShape = {
  kind: enumOf(AssessmentKind, "Choose what kind of assessment this is."),
  assembly: enumOf(AssessmentAssembly, "Choose how questions are chosen."),
  subjectId: uuid,
  syllabusId: optionalUuid,
  routeId: optionalUuid,
  title: z.string().trim().min(3, "Give the assessment a title.").max(200, "Use at most 200 characters."),
  description: optionalText(2_000),
  instructions: optionalText(20_000),
  timeLimitMinutes: optionalInt(1, 1_440, "Enter a time limit from 1 to 1,440 minutes, or leave it blank for untimed."),
  maxAttempts: optionalInt(1, 100, "Enter an attempt limit from 1 to 100, or leave it blank for unlimited."),
  gradeSchemeId: optionalUuid,
  feedbackTiming: enumOf(AssessmentFeedbackTiming, "Choose when students see marks and answers."),
  shuffleQuestions: flag,
  shuffleOptions: flag,
  allowNavigation: flag,
  accessTier: enumOf(ContentAccessTier, "Choose who can take it."),
  /** Topic scope (topic tests, weak-area analysis); empty = the whole syllabus. */
  topicIds: z.array(uuid).max(100, "At most 100 topics.").default([]),
  ...provenanceShape,
};

/** Rules of the database (`Assessment_rules_chk`) and of the builder, as field errors. */
export function refineAssessmentMeta(
  value: { kind: string; assembly: string; syllabusId: string | null; routeId: string | null; allowNavigation: boolean; copyrightStatus: string; sourceId: string | null; licenceCode: string | null },
  ctx: z.RefinementCtx,
): void {
  if (value.kind === "MOCK_EXAM" && !value.syllabusId) {
    ctx.addIssue({ code: "custom", path: ["syllabusId"], message: "A mock exam is built from a syllabus version: choose one." });
  }
  if (value.assembly !== "FIXED" && !value.syllabusId) {
    ctx.addIssue({ code: "custom", path: ["syllabusId"], message: "Blueprint and adaptive assessments draw from a syllabus version's topics: choose one." });
  }
  if (value.routeId && !value.syllabusId) ctx.addIssue({ code: "custom", path: ["routeId"], message: "Choose the syllabus version before a route." });
  if (value.assembly === "ADAPTIVE" && value.allowNavigation) {
    ctx.addIssue({ code: "custom", path: ["allowNavigation"], message: "Adaptive tests choose the next question from the last answer, so students cannot move freely." });
  }
  refineProvenance(value, ctx);
}

export const assessmentCreateSchema = z.object(assessmentMetaShape).superRefine(refineAssessmentMeta);
/** Assessment settings as forms send them (validated by {@link assessmentCreateSchema}). */
export interface AssessmentMetaInput extends ProvenanceInput {
  kind: AssessmentKind;
  assembly: AssessmentAssembly;
  subjectId: string;
  syllabusId?: string | null;
  routeId?: string | null;
  title: string;
  description?: string | null;
  instructions?: string | null;
  timeLimitMinutes?: number | string | null;
  maxAttempts?: number | string | null;
  gradeSchemeId?: string | null;
  feedbackTiming: AssessmentFeedbackTiming;
  shuffleQuestions?: boolean | string;
  shuffleOptions?: boolean | string;
  allowNavigation?: boolean | string;
  accessTier: ContentAccessTier;
  topicIds?: string[];
}
export type AssessmentMetaData = z.output<typeof assessmentCreateSchema>;

export const assessmentUpdateSchema = z
  .object({ id: uuid, version: z.string().max(40).optional(), ...assessmentMetaShape })
  .superRefine(refineAssessmentMeta);

// ---------------------------------------------------------------------------------------------------------------------
// Structure (sections, fixed items, blueprint rules) — saved as one document by the builder
// ---------------------------------------------------------------------------------------------------------------------

export const blueprintRuleSchema = z
  .object({
    topicId: optionalUuid,
    objectiveId: optionalUuid,
    includeSubtopics: z.boolean().default(true),
    questionType: z.preprocess(blankToNull, z.enum(QUESTION_TYPES as [QuestionType, ...QuestionType[]]).nullable()),
    cognitiveSkill: z.preprocess(blankToNull, enumOf(CognitiveSkill, "Choose a skill.").nullable()),
    difficultyMin: requiredInt(1, 5, "Difficulty runs from 1 to 5."),
    difficultyMax: requiredInt(1, 5, "Difficulty runs from 1 to 5."),
    questionCount: requiredInt(1, 200, "Draw from 1 to 200 questions."),
    marksPerQuestion: optionalInt(1, 1_000, "Marks per question from 1 to 1,000, or blank for any."),
    examStyleOnly: z.boolean().default(false),
  })
  .superRefine((rule, ctx) => {
    if (rule.difficultyMin > rule.difficultyMax) ctx.addIssue({ code: "custom", path: ["difficultyMax"], message: "The highest difficulty must not be below the lowest." });
  });
/** A blueprint rule as the builder sends it. */
export interface BlueprintRuleInput {
  topicId?: string | null;
  objectiveId?: string | null;
  includeSubtopics?: boolean;
  questionType?: QuestionType | null | "";
  cognitiveSkill?: CognitiveSkill | null | "";
  difficultyMin: number | string;
  difficultyMax: number | string;
  questionCount: number | string;
  marksPerQuestion?: number | string | null;
  examStyleOnly?: boolean;
}
export type BlueprintRuleData = z.output<typeof blueprintRuleSchema>;

export const sectionItemSchema = z.object({
  questionId: uuid,
  label: optionalText(16),
  /** Marks override (teacher weighting); blank = the question's own marks. */
  marks: optionalInt(1, 1_000, "Marks from 1 to 1,000, or blank to use the question's marks."),
});

export const sectionSchema = z
  .object({
    title: z.string().trim().min(1, "Give the section a title such as “Paper 1” or “Section A”.").max(200),
    instructions: optionalText(5_000),
    componentId: optionalUuid,
    timeLimitMinutes: optionalInt(1, 1_440, "Enter a section time limit from 1 to 1,440 minutes, or leave it blank."),
    /** "Answer any N" sections. */
    answerCount: optionalInt(1, 100, "Answer any 1 to 100 questions, or leave it blank for all."),
    /** Section total; required for "answer any N" sections (N × marks per question). */
    marks: optionalInt(0, 10_000, "Enter the section's total marks."),
    items: z.array(sectionItemSchema).max(200, "At most 200 questions per section.").default([]),
    rules: z.array(blueprintRuleSchema).max(50, "At most 50 rules per section.").default([]),
  })
  .superRefine((section, ctx) => {
    if (section.answerCount !== null && section.marks === null) {
      ctx.addIssue({ code: "custom", path: ["marks"], message: "An “answer any N” section states its total marks (N × marks per question)." });
    }
    const available = section.items.length + section.rules.reduce((sum, rule) => sum + rule.questionCount, 0);
    if (section.answerCount !== null && section.answerCount > available) {
      ctx.addIssue({ code: "custom", path: ["answerCount"], message: `The section has only ${available} questions to choose from.` });
    }
    const seen = new Set<string>();
    section.items.forEach((item, index) => {
      if (seen.has(item.questionId)) ctx.addIssue({ code: "custom", path: ["items", index, "questionId"], message: "This question is already in the section." });
      seen.add(item.questionId);
    });
  });
/** A section as the builder sends it. */
export interface SectionInput {
  title: string;
  instructions?: string | null;
  componentId?: string | null;
  timeLimitMinutes?: number | string | null;
  answerCount?: number | string | null;
  marks?: number | string | null;
  items?: { questionId: string; label?: string | null; marks?: number | string | null }[];
  rules?: BlueprintRuleInput[];
}
export type SectionData = z.output<typeof sectionSchema>;

export const structureSchema = z
  .object({
    id: uuid,
    version: z.string().max(40).optional(),
    sections: z.array(sectionSchema).min(1, "Add at least one section.").max(20, "At most 20 sections."),
  })
  .superRefine((value, ctx) => {
    const where = new Map<string, number>();
    value.sections.forEach((section, s) =>
      section.items.forEach((item, i) => {
        const first = where.get(item.questionId);
        if (first !== undefined && first !== s) {
          ctx.addIssue({ code: "custom", path: ["sections", s, "items", i, "questionId"], message: `This question is already in section ${first + 1}.` });
        }
        if (first === undefined) where.set(item.questionId, s);
      }),
    );
  });
export interface StructureInput {
  id: string;
  version?: string;
  sections: SectionInput[];
}

/** Live blueprint check of an unsaved structure (the rules as currently edited). */
export const blueprintCheckSchema = z.object({ id: uuid, sections: z.array(sectionSchema).max(20) });

// ---------------------------------------------------------------------------------------------------------------------
// List filters
// ---------------------------------------------------------------------------------------------------------------------

const optionalEnum = <T extends string>(values: Record<string, T>) => z.preprocess(blankToNull, z.enum(Object.values(values) as [T, ...T[]]).nullable().optional());

export const assessmentFilterSchema = z.object({
  q: z.preprocess(blankToNull, z.string().trim().max(200).nullable().optional()),
  kind: optionalEnum(AssessmentKind),
  assembly: optionalEnum(AssessmentAssembly),
  status: optionalEnum(ContentStatus),
  subjectId: z.preprocess(blankToNull, uuid.nullable().optional()),
  cursor: z.preprocess(blankToNull, z.string().max(200).nullable().optional()),
});
