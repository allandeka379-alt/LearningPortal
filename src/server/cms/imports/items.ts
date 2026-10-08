import { z } from "zod";
import { CognitiveSkill, MarkingMode, QuestionType } from "@/generated/prisma/enums";
import { QUESTION_LIMITS } from "@/lib/questions/constants";
import type { ImportEntityType } from "./constants";

/**
 * The import CONTRACT per content type (§25): one Zod schema per JSON item (camelCase keys) and the spreadsheet columns
 * that map onto it. CSV / Excel rows are converted into the same item shape first, so both formats are validated by the
 * same schema; the downloadable templates (CSV headers, JSON example, JSON Schema) are generated from these
 * definitions (see ./templates.ts). Isomorphic and pure.
 *
 * Items reference curriculum by CODE or SLUG in the import's syllabus version (`topics: ["1.2"]`,
 * `objectives: ["E1.2a"]`), never by database id, so files can be prepared outside the platform.
 * Licensing is chosen once per import (source, licence, attribution); items cannot assert a copyright status.
 */

export const ACCESS_TIERS = ["PREMIUM", "FREE", "PUBLIC"] as const;
export const FLASHCARD_CARD_TYPES = ["DEFINITION", "FORMULA", "VOCABULARY", "CONCEPT", "DATE", "FACT"] as const;
export const IMPORT_LESSON_KINDS = ["LESSON", "REVISION_NOTES", "WORKED_EXAMPLES", "EXAM_TIPS", "STUDY_GUIDE", "ARTICLE"] as const;
export const IMPORT_TOPIC_KINDS = ["SECTION", "TOPIC", "SUBTOPIC"] as const;

/** Stable key for idempotent re-imports: rows whose reference already exists are reported, never overwritten. */
export const externalRefSchema = z
  .string()
  .trim()
  .min(1)
  .max(128)
  .regex(/^[A-Za-z0-9][A-Za-z0-9._:/-]*$/, "Use letters, digits and . _ : / - only (e.g. MATH-ALG-0001).")
  .describe("Your own stable id for the item. Re-importing a file never creates a second item with the same reference.");

const curriculumRef = z.string().trim().min(1).max(160).describe("Topic code (e.g. 1.2) or slug in the import's syllabus version.");
const objectiveRef = z.string().trim().min(1).max(64).describe("Learning-objective code in the import's syllabus version.");
const markdown = (max: number) => z.string().max(max, `Use at most ${max.toLocaleString("en")} characters.`);
const nonBlank = (max: number) => markdown(max).refine((value) => value.trim() !== "", "Must not be blank.");

// ---------------------------------------------------------------------------------------------------------------------
// Questions
// ---------------------------------------------------------------------------------------------------------------------

export const markSchemeLineSchema = z.union([
  nonBlank(2_000),
  z.strictObject({ description: nonBlank(2_000), marks: z.int().min(1).max(QUESTION_LIMITS.maxMarks) }),
]);

export const questionImportItemSchema = z
  .strictObject({
    externalRef: externalRefSchema.optional(),
    type: z.enum(Object.values(QuestionType) as [QuestionType, ...QuestionType[]]).describe("One of the 11 question types."),
    markingMode: z.enum(Object.values(MarkingMode) as [MarkingMode, ...MarkingMode[]]).optional().describe("Default: AUTO, or AI_ASSISTED for essays."),
    stem: nonBlank(20_000).describe("The question text (Markdown + LaTeX)."),
    marks: z.int().min(1).max(QUESTION_LIMITS.maxMarks).optional().describe("Default 1 (essays: the mark-scheme total)."),
    difficulty: z.int().min(1).max(5).optional().describe("1 (easiest) to 5 (hardest). Default: the import's default difficulty."),
    options: z
      .array(
        z.strictObject({
          key: z.string().trim().max(QUESTION_LIMITS.optionKeyLength).optional(),
          content: nonBlank(QUESTION_LIMITS.fragmentLength),
          isCorrect: z.boolean().optional(),
          rationale: markdown(QUESTION_LIMITS.notesLength).optional(),
        }),
      )
      .max(QUESTION_LIMITS.maxOptions)
      .optional()
      .describe("Multiple-choice options in order. Keys default to A, B, C…"),
    correct: z.array(z.string().trim().min(1).max(QUESTION_LIMITS.optionKeyLength)).max(QUESTION_LIMITS.maxOptions).optional().describe("Keys of the correct options (alternative to isCorrect)."),
    answer: z.union([z.string().max(QUESTION_LIMITS.answerTextLength), z.number(), z.boolean()]).optional().describe("True/false: true or false. Short answer: accepted answers separated by |. Numerical: the value."),
    acceptedAnswers: z.array(nonBlank(QUESTION_LIMITS.answerTextLength)).max(QUESTION_LIMITS.maxAlternatives).optional(),
    tolerance: z.number().min(0).optional().describe("Numerical: absolute tolerance."),
    units: z.array(nonBlank(QUESTION_LIMITS.unitInput)).max(50).optional().describe("Numerical: accepted spellings of the unit."),
    unitRequired: z.boolean().optional(),
    markScheme: z.array(markSchemeLineSchema).max(QUESTION_LIMITS.maxItems).optional().describe("Our own mark-scheme points (never a board's scheme). \"text [2]\" sets 2 marks."),
    modelAnswer: markdown(QUESTION_LIMITS.notesLength).optional(),
    payload: z.record(z.string(), z.unknown()).nullable().optional().describe("Advanced: the type's presentation data, exactly as the question editor stores it."),
    answerSpec: z.record(z.string(), z.unknown()).nullable().optional().describe("Advanced: the type's marking specification, exactly as the question editor stores it."),
    parts: z.array(z.record(z.string(), z.unknown())).max(QUESTION_LIMITS.maxParts).optional().describe("Structured questions: parts in the question editor's shape."),
    explanation: markdown(50_000).optional(),
    workedSolution: markdown(50_000).optional(),
    conceptSummary: markdown(5_000).optional(),
    hints: z.array(nonBlank(5_000)).max(10).optional(),
    topics: z.array(curriculumRef).max(20).optional(),
    primaryTopic: curriculumRef.optional(),
    objectives: z.array(objectiveRef).max(50).optional(),
    year: z.int().min(1900).max(2100).optional(),
    paperLabel: z.string().trim().max(32).optional(),
    cognitiveSkill: z.enum(Object.values(CognitiveSkill) as [CognitiveSkill, ...CognitiveSkill[]]).optional(),
    estimatedSeconds: z.int().min(1).max(36_000).optional(),
    calculatorAllowed: z.boolean().optional(),
    isExamStyle: z.boolean().optional(),
    accessTier: z.enum(ACCESS_TIERS).optional(),
  })
  .describe("One question of the bank (§9).");
export type QuestionImportItem = z.output<typeof questionImportItemSchema>;

// ---------------------------------------------------------------------------------------------------------------------
// Flashcards
// ---------------------------------------------------------------------------------------------------------------------

export const flashcardImportItemSchema = z
  .strictObject({
    externalRef: externalRefSchema.optional(),
    front: nonBlank(5_000).describe("Prompt side (Markdown + LaTeX)."),
    back: nonBlank(5_000).describe("Answer side (Markdown + LaTeX)."),
    notes: markdown(5_000).optional(),
    cardType: z.enum(FLASHCARD_CARD_TYPES).optional().describe("Default CONCEPT."),
    topic: curriculumRef.optional().describe("Primary topic (decides the deck)."),
    accessTier: z.enum(ACCESS_TIERS).optional(),
  })
  .describe("One platform flashcard (§18).");
export type FlashcardImportItem = z.output<typeof flashcardImportItemSchema>;

// ---------------------------------------------------------------------------------------------------------------------
// Lessons
// ---------------------------------------------------------------------------------------------------------------------

export const lessonImportItemSchema = z
  .strictObject({
    externalRef: externalRefSchema.optional(),
    title: nonBlank(200).optional().describe("Required unless given in the front matter of `markdown`."),
    kind: z.enum(IMPORT_LESSON_KINDS).optional(),
    slug: z.string().trim().max(80).regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Use lower-case letters, numbers and single hyphens.").optional(),
    summary: markdown(1_000).optional(),
    body: markdown(500_000).optional().describe("The lesson in Markdown (content blocks, LaTeX, tables)."),
    markdown: markdown(500_000).optional().describe("Alternative to body: Markdown starting with a --- front-matter block (title, kind, topics…)."),
    estimatedMinutes: z.int().min(1).max(600).optional(),
    accessTier: z.enum(ACCESS_TIERS).optional(),
    topics: z.array(curriculumRef).max(30).optional(),
    primaryTopic: curriculumRef.optional(),
    objectives: z.array(objectiveRef).max(100).optional(),
    metaTitle: z.string().trim().max(120).optional(),
    metaDescription: z.string().trim().max(320).optional(),
  })
  .describe("One lesson page (§8).");
export type LessonImportItem = z.output<typeof lessonImportItemSchema>;

// ---------------------------------------------------------------------------------------------------------------------
// Topics (outline)
// ---------------------------------------------------------------------------------------------------------------------

export const topicObjectiveImportSchema = z.union([
  nonBlank(1_000),
  z.strictObject({ code: z.string().trim().max(32).optional(), statement: nonBlank(1_000) }),
]);

export interface TopicImportItem {
  code?: string | undefined;
  name: string;
  kind?: (typeof IMPORT_TOPIC_KINDS)[number] | undefined;
  parent?: string | undefined;
  description?: string | undefined;
  objectives?: z.output<typeof topicObjectiveImportSchema>[] | undefined;
  estimatedMinutes?: number | undefined;
  isOptional?: boolean | undefined;
  optionGroup?: string | undefined;
  children?: TopicImportItem[] | undefined;
}

const topicNodeShape = {
  code: z.string().trim().min(1).max(32).optional().describe("Official reference, e.g. 1.2 or E1.1. Must be unique in the file."),
  name: nonBlank(200),
  kind: z.enum(IMPORT_TOPIC_KINDS).optional().describe("Default: TOPIC at the top level, SUBTOPIC below a topic."),
  parent: z.string().trim().min(1).max(32).optional().describe("Code of the parent: an earlier row of the file or an existing topic of the version."),
  description: markdown(5_000).optional(),
  objectives: z.array(topicObjectiveImportSchema).max(100).optional(),
  estimatedMinutes: z.int().min(1).max(100_000).optional(),
  isOptional: z.boolean().optional(),
  optionGroup: z.string().trim().max(64).optional(),
};

/** One node without its children (what each spreadsheet row, and each flattened JSON node, is validated against). */
export const topicNodeImportSchema = z.strictObject(topicNodeShape).describe("One node of a syllabus version's topic tree (§3).");
export type TopicNodeImportItem = z.output<typeof topicNodeImportSchema>;

/** The JSON contract: nodes may nest their children (`children`), to any depth the tree allows. */
export const topicImportItemSchema: z.ZodType<TopicImportItem> = z
  .strictObject({
    ...topicNodeShape,
    get children() {
      return z.array(topicImportItemSchema).max(500).optional().describe("Nested child topics (JSON only).");
    },
  })
  .describe("One node of a syllabus version's topic tree (§3).");

export const IMPORT_ITEM_SCHEMAS = {
  QUESTION: questionImportItemSchema,
  FLASHCARD: flashcardImportItemSchema,
  LESSON: lessonImportItemSchema,
  TOPIC: topicImportItemSchema,
} as const satisfies Record<ImportEntityType, z.ZodType>;

// ---------------------------------------------------------------------------------------------------------------------
// Spreadsheet columns
// ---------------------------------------------------------------------------------------------------------------------

/**
 * How a spreadsheet cell becomes a JSON item field:
 * text (trimmed) · markdown (kept as written) · int · number · bool (true/false, yes/no, 1/0) · list (values separated
 * by `|`) · json (a JSON object in the cell) · option (one MCQ option; `key` names it) · keys (option letters such as
 * `A` or `A,C`) · answer (kept as text; the item rules interpret it per type).
 */
export type ColumnKind = "text" | "markdown" | "int" | "number" | "bool" | "list" | "json" | "option" | "keys" | "answer";

export interface ColumnSpec {
  /** Canonical snake_case header. */
  header: string;
  /** Other accepted headers (normalised). */
  aliases?: readonly string[];
  /** Target field of the JSON item (`options` for option columns). */
  field: string;
  kind: ColumnKind;
  /** Option key for `option` columns. */
  optionKey?: string;
  required?: boolean;
  description: string;
}

const OPTION_KEYS = ["A", "B", "C", "D", "E", "F"] as const;

export const QUESTION_COLUMNS: readonly ColumnSpec[] = [
  { header: "external_ref", aliases: ["ref", "id", "external_id"], field: "externalRef", kind: "text", description: "Optional stable id (idempotent re-imports)." },
  { header: "type", aliases: ["question_type"], field: "type", kind: "text", required: true, description: "MULTIPLE_CHOICE, TRUE_FALSE, SHORT_ANSWER, NUMERICAL, CALCULATION, ESSAY, EXTENDED_RESPONSE (others need payload / answer_spec)." },
  { header: "stem", aliases: ["question", "question_text", "text"], field: "stem", kind: "markdown", required: true, description: "Question text (Markdown + LaTeX)." },
  { header: "marks", field: "marks", kind: "int", description: "Whole marks (default 1)." },
  { header: "difficulty", field: "difficulty", kind: "int", description: "1-5 (default: the import's difficulty)." },
  ...OPTION_KEYS.map((key): ColumnSpec => ({ header: `option_${key.toLowerCase()}`, field: "options", kind: "option", optionKey: key, description: `Multiple choice: option ${key}.` })),
  { header: "correct", aliases: ["correct_option", "correct_options", "answer_key"], field: "correct", kind: "keys", description: "Multiple choice: the correct option letter(s), e.g. B or A,C." },
  { header: "answer", aliases: ["correct_answer", "accepted_answers"], field: "answer", kind: "answer", description: "True/false: true or false. Short answer: accepted answers separated by |. Numerical: the value." },
  { header: "tolerance", field: "tolerance", kind: "number", description: "Numerical: absolute tolerance, e.g. 0.05." },
  { header: "units", aliases: ["unit"], field: "units", kind: "list", description: "Numerical: accepted unit spellings separated by |, e.g. m/s|ms^-1." },
  { header: "unit_required", field: "unitRequired", kind: "bool", description: "Numerical: true when a missing unit loses a mark." },
  { header: "mark_scheme", field: "markScheme", kind: "list", description: "Essay / short answer: our own mark-scheme points separated by |; end a point with [2] for 2 marks." },
  { header: "model_answer", field: "modelAnswer", kind: "markdown", description: "Essay: our own model answer." },
  { header: "marking_mode", field: "markingMode", kind: "text", description: "AUTO, AI_ASSISTED or MANUAL." },
  { header: "explanation", field: "explanation", kind: "markdown", description: "Why the answer is right (shown after answering)." },
  { header: "worked_solution", field: "workedSolution", kind: "markdown", description: "Step-by-step solution." },
  { header: "concept_summary", aliases: ["concept"], field: "conceptSummary", kind: "markdown", description: "The concept in one or two sentences." },
  { header: "hints", field: "hints", kind: "list", description: "Hints in order, separated by |." },
  { header: "topics", aliases: ["topic", "topic_code", "topic_codes"], field: "topics", kind: "list", description: "Topic code(s) or slug(s) in the import's syllabus version, separated by |. The first is the primary tag." },
  { header: "objectives", aliases: ["objective", "objective_codes"], field: "objectives", kind: "list", description: "Learning-objective codes separated by |." },
  { header: "year", field: "year", kind: "int", description: "Year of origin (authoring year for original questions)." },
  { header: "paper", aliases: ["paper_label"], field: "paperLabel", kind: "text", description: "Paper style, e.g. Paper 2." },
  { header: "skill", aliases: ["cognitive_skill"], field: "cognitiveSkill", kind: "text", description: "RECALL, UNDERSTANDING, APPLICATION, ANALYSIS, EVALUATION or CREATION." },
  { header: "estimated_seconds", aliases: ["time_seconds"], field: "estimatedSeconds", kind: "int", description: "Expected answering time in seconds." },
  { header: "calculator_allowed", aliases: ["calculator"], field: "calculatorAllowed", kind: "bool", description: "true / false." },
  { header: "exam_style", field: "isExamStyle", kind: "bool", description: "true when the question mirrors real exam format." },
  { header: "access_tier", aliases: ["access"], field: "accessTier", kind: "text", description: "PREMIUM, FREE or PUBLIC (default: the import's tier)." },
  { header: "payload", field: "payload", kind: "json", description: "Advanced: presentation JSON exactly as the question editor stores it." },
  { header: "answer_spec", field: "answerSpec", kind: "json", description: "Advanced: marking JSON exactly as the question editor stores it." },
];

export const FLASHCARD_COLUMNS: readonly ColumnSpec[] = [
  { header: "external_ref", aliases: ["ref", "id", "external_id"], field: "externalRef", kind: "text", description: "Optional stable id (idempotent re-imports)." },
  { header: "front", aliases: ["term", "question", "prompt"], field: "front", kind: "markdown", required: true, description: "Prompt side (Markdown + LaTeX)." },
  { header: "back", aliases: ["definition", "answer", "meaning"], field: "back", kind: "markdown", required: true, description: "Answer side (Markdown + LaTeX)." },
  { header: "notes", field: "notes", kind: "markdown", description: "Optional mnemonic or example." },
  { header: "card_type", aliases: ["type"], field: "cardType", kind: "text", description: "DEFINITION, FORMULA, VOCABULARY, CONCEPT, DATE or FACT (default CONCEPT)." },
  { header: "topic", aliases: ["topic_code", "topics"], field: "topic", kind: "text", description: "Primary topic code or slug in the import's syllabus version." },
  { header: "access_tier", aliases: ["access"], field: "accessTier", kind: "text", description: "PREMIUM, FREE or PUBLIC (default: the import's tier)." },
];

export const LESSON_COLUMNS: readonly ColumnSpec[] = [
  { header: "external_ref", aliases: ["ref", "id", "external_id"], field: "externalRef", kind: "text", description: "Optional stable id (idempotent re-imports)." },
  { header: "title", field: "title", kind: "text", required: true, description: "Lesson title." },
  { header: "kind", aliases: ["lesson_kind"], field: "kind", kind: "text", description: "LESSON, REVISION_NOTES, WORKED_EXAMPLES, EXAM_TIPS, STUDY_GUIDE or ARTICLE (default LESSON)." },
  { header: "slug", field: "slug", kind: "text", description: "Optional URL slug (default: from the title)." },
  { header: "summary", field: "summary", kind: "markdown", description: "One-paragraph summary." },
  { header: "body", aliases: ["content", "markdown_body"], field: "body", kind: "markdown", required: true, description: "The lesson in Markdown." },
  { header: "estimated_minutes", aliases: ["minutes"], field: "estimatedMinutes", kind: "int", description: "Reading time in minutes (default 10)." },
  { header: "access_tier", aliases: ["access"], field: "accessTier", kind: "text", description: "PREMIUM, FREE or PUBLIC (default: the import's tier)." },
  { header: "topics", aliases: ["topic", "topic_codes"], field: "topics", kind: "list", description: "Topic codes or slugs separated by |; the first is the primary topic." },
  { header: "objectives", aliases: ["objective_codes"], field: "objectives", kind: "list", description: "Learning-objective codes separated by |." },
  { header: "meta_title", field: "metaTitle", kind: "text", description: "SEO title (public pages only)." },
  { header: "meta_description", field: "metaDescription", kind: "text", description: "SEO description." },
];

export const TOPIC_COLUMNS: readonly ColumnSpec[] = [
  { header: "code", aliases: ["topic_code", "reference"], field: "code", kind: "text", description: "Official reference, e.g. 1.2. Needed to be a parent." },
  { header: "name", aliases: ["topic", "title"], field: "name", kind: "text", required: true, description: "Topic name." },
  { header: "parent", aliases: ["parent_code"], field: "parent", kind: "text", description: "Code of the parent topic (an earlier row or an existing topic of the version). Blank = top level." },
  { header: "kind", field: "kind", kind: "text", description: "SECTION, TOPIC or SUBTOPIC (default from the position)." },
  { header: "description", field: "description", kind: "markdown", description: "Scope of the topic, in original words." },
  { header: "objectives", aliases: ["learning_objectives"], field: "objectives", kind: "list", description: "Learning objectives separated by |. Start one with a code and a colon to give it a code, e.g. E1.1a: Identify integers." },
  { header: "estimated_minutes", aliases: ["study_minutes"], field: "estimatedMinutes", kind: "int", description: "Planning estimate of study time." },
  { header: "optional", aliases: ["is_optional"], field: "isOptional", kind: "bool", description: "true for optional / alternative content." },
  { header: "option_group", field: "optionGroup", kind: "text", description: "Groups alternative optional topics." },
];

export const IMPORT_COLUMNS: Readonly<Record<ImportEntityType, readonly ColumnSpec[]>> = {
  QUESTION: QUESTION_COLUMNS,
  FLASHCARD: FLASHCARD_COLUMNS,
  LESSON: LESSON_COLUMNS,
  TOPIC: TOPIC_COLUMNS,
};

/** Header (canonical or alias) → column spec, per entity type. */
export function columnIndex(entityType: ImportEntityType): Map<string, ColumnSpec> {
  const index = new Map<string, ColumnSpec>();
  for (const column of IMPORT_COLUMNS[entityType]) {
    index.set(column.header, column);
    for (const alias of column.aliases ?? []) if (!index.has(alias)) index.set(alias, column);
  }
  return index;
}
