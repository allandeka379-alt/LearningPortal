import { z } from "zod";
import {
  AssessmentAssembly,
  AssessmentFeedbackTiming,
  AssessmentKind,
  CognitiveSkill,
  ContentAccessTier,
  FlashcardType,
  MarkingMode,
  QuestionType,
  SyllabusComponentKind,
  TopicKind,
} from "@/generated/prisma/enums";
import {
  CONCEPT_KEY_PATTERN,
  FAMILY_PATTERN,
  ITEM_KEY_PATTERN,
  MAX_CONCEPT_KEY_LENGTH,
  MAX_ITEM_KEY_LENGTH,
  NODE_KEY_PATTERN,
  parseObjectiveRef,
  parseSelector,
  SLUG_PATTERN,
  VERSION_LABEL_PATTERN,
} from "./keys";

/**
 * Zod contracts of the content SOURCE files (content/, docs/CONTENT_PIPELINE.md is the human-readable version of this
 * module: keep both in step). Strict objects everywhere so a misspelt field is an error, not silently ignored.
 * Question payloads / answer specs / responses are validated by the platform's own contracts (`@/lib/questions`) in
 * the validator, not here. Pure and isomorphic.
 */

const enumValues = <T extends string>(values: Record<string, T>) => Object.values(values) as [T, ...T[]];

const nonBlank = (max: number, label = "text") =>
  z
    .string()
    .max(max, `Use at most ${max.toLocaleString("en")} characters.`)
    .refine((value) => value.trim() !== "", `The ${label} must not be blank.`);

const optionalMarkdown = (max: number) => z.string().max(max, `Use at most ${max.toLocaleString("en")} characters.`).optional();

export const familySchema = z.string().regex(FAMILY_PATTERN, "Families are lower-case words joined by hyphens, e.g. mathematics-o.");
export const itemKeySchema = z
  .string()
  .max(MAX_ITEM_KEY_LENGTH)
  .regex(ITEM_KEY_PATTERN, "Keys are lower-case letters/digits in dot-separated segments (hyphens allowed), e.g. quadratics.factorising.q01.");
export const nodeKeySchema = z.string().max(MAX_ITEM_KEY_LENGTH).regex(NODE_KEY_PATTERN, "Node keys are lower-case letters/digits in dot-separated segments, e.g. algebra.quadratics.");
export const conceptKeySchema = z
  .string()
  .max(MAX_CONCEPT_KEY_LENGTH)
  .regex(CONCEPT_KEY_PATTERN, "Concept keys are dot-separated lower-case segments starting with the family prefix, e.g. math.algebra.quadratic-equations.");
const slugSchema = z.string().max(120).regex(SLUG_PATTERN, "Slugs are lower-case letters/digits joined by single hyphens.");
const isoDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Use the date format YYYY-MM-DD.")
  .refine((value) => !Number.isNaN(Date.parse(`${value}T00:00:00Z`)), "Use a real date.");
const httpsUrl = z.url({ protocol: /^https$/, message: "Use a full https:// link." }).max(2_000);

export const selectorSchema = z.string().refine((value) => parseSelector(value) !== null, {
  message: "Use a board, board/qualification or board/qualification/subject selector (optionally @version), e.g. cambridge/igcse.",
});
export const objectiveRefSchema = z.string().refine((value) => parseObjectiveRef(value) !== null, {
  message: "Objective references look like zimsec/o-level/mathematics:A3.2 (subject path, a colon, the objective code).",
});
export const subjectRefSchema = z.string().refine((value) => {
  const selector = parseSelector(value);
  return selector !== null && selector.qualification !== null && selector.subject !== null;
}, "Use board/qualification/subject (optionally @version), e.g. cambridge/igcse/mathematics.");

const accessSchema = z.enum(enumValues(ContentAccessTier));

// =====================================================================================================================
// Concept registry — content/concepts/<family>.json
// =====================================================================================================================

export const conceptSchema = z.strictObject({
  key: conceptKeySchema,
  name: nonBlank(200, "concept name"),
  description: optionalMarkdown(2_000),
});

export const conceptRegistrySchema = z.strictObject({
  family: familySchema,
  name: nonBlank(200, "family name"),
  /** "O" = O-Level / IGCSE, "A" = AS & A Level. */
  level: z.enum(["O", "A"]),
  /** First segment of every concept key of this family, e.g. "math". */
  prefix: z.string().regex(/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/, "The prefix is one lower-case word, e.g. math."),
  /** Subjects this family's content is written for, in home-subject preference order (board/qualification/subject). */
  subjects: z.array(subjectRefSchema).min(1),
  concepts: z.array(conceptSchema).min(1),
});
export type ConceptRegistryFile = z.output<typeof conceptRegistrySchema>;

// =====================================================================================================================
// Syllabus version — content/syllabi/<board>/<qualification>/<subject>/<versionLabel>.json
// =====================================================================================================================

export const componentSchema = z.strictObject({
  code: z.string().trim().min(1).max(16),
  name: nonBlank(200, "paper name"),
  kind: z.enum(enumValues(SyllabusComponentKind)).default("WRITTEN"),
  description: optionalMarkdown(2_000),
  durationMinutes: z.int().min(1).max(600).optional(),
  maxMarks: z.int().min(1).max(1_000).optional(),
  weightingPercent: z.number().min(0).max(100).optional(),
  calculatorAllowed: z.boolean().optional(),
});

export const routeSchema = z.strictObject({
  code: z.string().regex(/^[A-Z0-9_-]{1,16}$/, "Route codes are upper-case, e.g. CORE, EXTENDED, AS."),
  name: nonBlank(200, "route name"),
  description: optionalMarkdown(2_000),
  isDefault: z.boolean().default(false),
  components: z
    .array(
      z.union([
        z.string().trim().min(1).max(16),
        z.strictObject({ code: z.string().trim().min(1).max(16), compulsory: z.boolean().default(true), choiceGroup: z.string().trim().max(64).optional() }),
      ]),
    )
    .default([]),
});

export const objectiveSchema = z.strictObject({
  code: z.string().trim().min(1).max(32),
  text: nonBlank(1_000, "objective"),
  skill: z.enum(enumValues(CognitiveSkill)).optional(),
});

export interface SyllabusNodeInput {
  key: string;
  code?: string | null;
  name: string;
  slug?: string;
  kind?: TopicKind;
  description?: string;
  covers?: string[];
  objectives?: z.input<typeof objectiveSchema>[];
  components?: string[];
  optional?: boolean;
  optionGroup?: string;
  estimatedStudyMinutes?: number;
  children?: SyllabusNodeInput[];
}

export interface SyllabusNode {
  key: string;
  code: string | null;
  name: string;
  slug?: string | undefined;
  kind?: TopicKind | undefined;
  description?: string | undefined;
  covers: string[];
  objectives: z.output<typeof objectiveSchema>[];
  components: string[];
  optional: boolean;
  optionGroup?: string | undefined;
  estimatedStudyMinutes?: number | undefined;
  children: SyllabusNode[];
}

export const syllabusNodeSchema: z.ZodType<SyllabusNode, SyllabusNodeInput> = z.strictObject({
  key: nodeKeySchema,
  code: z.string().trim().min(1).max(32).nullable().default(null),
  name: nonBlank(200, "topic name"),
  slug: slugSchema.optional(),
  kind: z.enum(enumValues(TopicKind)).optional(),
  description: optionalMarkdown(5_000),
  covers: z.array(conceptKeySchema).max(200).default([]),
  objectives: z.array(objectiveSchema).max(200).default([]),
  components: z.array(z.string().trim().min(1).max(16)).max(20).default([]),
  optional: z.boolean().default(false),
  optionGroup: z.string().trim().max(64).optional(),
  estimatedStudyMinutes: z.int().min(1).max(100_000).optional(),
  get children() {
    return z.array(syllabusNodeSchema).max(500).default([]);
  },
});

export const DEFAULT_SOURCE_NOTE =
  "Topic headings transcribed from the publicly available syllabus; verify against the current official document.";

export const syllabusFileSchema = z.strictObject({
  board: slugSchema,
  qualification: slugSchema,
  subject: slugSchema,
  versionLabel: z.string().max(64).regex(VERSION_LABEL_PATTERN, "Version labels are lower-case and also the file name, e.g. 2025-2027."),
  family: familySchema,
  /**
   * Other content families whose concepts this syllabus may cover, e.g. a Combined Science syllabus covering concepts of
   * biology-o, chemistry-o and physics-o: those families' lessons, questions and flashcards are tagged to it as well.
   */
  conceptFamilies: z.array(familySchema).max(10).default([]),
  title: nonBlank(200, "title"),
  /** Official syllabus code of this version, e.g. "0580" (null when not published by the board). */
  code: z.string().trim().min(1).max(16).nullable(),
  effectiveFrom: isoDate,
  effectiveTo: isoDate.nullable().default(null),
  /** How the version is published: CURRENT (default for new enrolments) or UPCOMING (examined from a future date). */
  publishAs: z.enum(["CURRENT", "UPCOMING"]).default("CURRENT"),
  officialDocument: z.strictObject({
    title: nonBlank(300, "document title"),
    url: httpsUrl,
    publisher: nonBlank(200, "publisher"),
  }),
  sourceNote: nonBlank(2_000, "source note").default(DEFAULT_SOURCE_NOTE),
  /** Transcription uncertainties for reviewers (stored with the version's source notes). */
  notes: z.array(nonBlank(2_000, "note")).max(100).default([]),
  overview: optionalMarkdown(20_000),
  assessmentOverview: optionalMarkdown(20_000),
  components: z.array(componentSchema).max(30).default([]),
  routes: z.array(routeSchema).max(10).default([]),
  topics: z.array(syllabusNodeSchema).min(1).max(500),
});
export type SyllabusFile = z.output<typeof syllabusFileSchema>;

// =====================================================================================================================
// Lessons — content/subjects/<family>/lessons/**/*.md (JSON front matter between --- lines, then Markdown)
// =====================================================================================================================

export const LESSON_LEVELS = ["core", "extended"] as const;
export const SOURCE_LESSON_KINDS = ["LESSON", "REVISION_NOTES", "WORKED_EXAMPLES", "EXAM_TIPS"] as const;

export const lessonFrontMatterSchema = z.strictObject({
  key: itemKeySchema,
  title: nonBlank(200, "title"),
  summary: nonBlank(1_000, "summary"),
  concepts: z.array(conceptKeySchema).min(1, "Tag the lesson with at least one concept.").max(30),
  objectives: z.array(objectiveRefSchema).max(100).default([]),
  estimatedMinutes: z.int().min(3).max(240),
  /** Free preview (accessTier FREE) instead of full-access only (PREMIUM). */
  freePreview: z.boolean().default(false),
  /** "core" = examined for all candidates; "extended" = supplement / extended-tier material. */
  level: z.enum(LESSON_LEVELS).default("core"),
  kind: z.enum(SOURCE_LESSON_KINDS).default("LESSON"),
  slug: slugSchema.optional(),
  applies: z.array(selectorSchema).max(20).optional(),
});
export type LessonFrontMatter = z.output<typeof lessonFrontMatterSchema>;

// =====================================================================================================================
// Questions — content/subjects/<family>/questions/**/*.json (a JSON array of questions)
// =====================================================================================================================

export const optionSchema = z.strictObject({
  key: z.string().regex(/^[A-Z]$/, "Option keys are single capital letters: A, B, C, …"),
  content: nonBlank(2_000, "option"),
  correct: z.boolean().default(false),
  rationale: optionalMarkdown(5_000),
});

const PART_LABEL = /^\((?:[a-z]{1,2}|[ivx]{1,6}|\d{1,2})\)$/;

export interface QuestionPartInput {
  label: string;
  type: QuestionType;
  markingMode?: MarkingMode;
  marks: number;
  stem: string;
  payload?: Record<string, unknown> | null;
  answerSpec?: Record<string, unknown> | null;
  options?: z.input<typeof optionSchema>[];
  explanation?: string;
  workedSolution?: string;
  hints?: string[];
  parts?: QuestionPartInput[];
}

export interface QuestionPart {
  label: string;
  type: QuestionType;
  markingMode?: MarkingMode | undefined;
  marks: number;
  stem: string;
  payload?: Record<string, unknown> | null | undefined;
  answerSpec?: Record<string, unknown> | null | undefined;
  options: z.output<typeof optionSchema>[];
  explanation?: string | undefined;
  workedSolution?: string | undefined;
  hints: string[];
  parts: QuestionPart[];
}

const jsonObject = z.record(z.string(), z.unknown());

export const questionPartSchema: z.ZodType<QuestionPart, QuestionPartInput> = z.strictObject({
  label: z.string().regex(PART_LABEL, "Part labels look like (a), (b), (i), (ii)."),
  type: z.enum(enumValues(QuestionType)),
  markingMode: z.enum(enumValues(MarkingMode)).optional(),
  marks: z.int().min(1).max(100),
  stem: nonBlank(20_000, "part text"),
  payload: jsonObject.nullable().optional(),
  answerSpec: jsonObject.nullable().optional(),
  options: z.array(optionSchema).max(10).default([]),
  explanation: optionalMarkdown(50_000),
  workedSolution: optionalMarkdown(50_000),
  hints: z.array(nonBlank(5_000, "hint")).max(10).default([]),
  get parts() {
    return z.array(questionPartSchema).max(20).default([]);
  },
});

export const questionSourceSchema = z.strictObject({
  key: itemKeySchema,
  type: z.enum(enumValues(QuestionType)),
  concepts: z.array(conceptKeySchema).min(1, "Tag the question with at least one concept.").max(10),
  difficulty: z.int().min(1).max(5),
  marks: z.int().min(1).max(100),
  estimatedSeconds: z.int().min(10).max(10_800),
  /** Default: AUTO, or MANUAL for essays / extended responses (marked against the mark scheme). */
  markingMode: z.enum(enumValues(MarkingMode)).optional(),
  stem: nonBlank(20_000, "question text"),
  payload: jsonObject.nullable().optional(),
  answerSpec: jsonObject.nullable().optional(),
  options: z.array(optionSchema).max(10).default([]),
  parts: z.array(questionPartSchema).max(20).default([]),
  explanation: nonBlank(50_000, "explanation"),
  workedSolution: optionalMarkdown(50_000),
  conceptSummary: optionalMarkdown(5_000),
  hints: z.array(nonBlank(5_000, "hint")).max(10).default([]),
  /** A response that must score FULL marks with the real marking engine (required for auto-marked questions). */
  modelResponse: z.unknown().optional(),
  /** Responses that must score LESS than full marks (typical mistakes). */
  wrongResponses: z.array(z.unknown()).max(20).default([]),
  /** Skill tested (board assessment objectives map onto these). */
  skill: z.enum(enumValues(CognitiveSkill)),
  examStyle: z.boolean().default(false),
  dailyEligible: z.boolean().default(false),
  applies: z.array(selectorSchema).max(20).optional(),
  objectives: z.array(objectiveRefSchema).max(50).default([]),
  calculator: z.boolean().nullable().default(null),
  paper: z.string().trim().min(1).max(32).optional(),
  /** Default: FREE for daily-eligible questions, otherwise PREMIUM (full access). */
  access: accessSchema.optional(),
});
export type QuestionSource = z.output<typeof questionSourceSchema>;

// =====================================================================================================================
// Flashcards — content/subjects/<family>/flashcards/**/*.json (a JSON array of cards)
// =====================================================================================================================

export const flashcardSourceSchema = z.strictObject({
  key: itemKeySchema,
  cardType: z.enum(enumValues(FlashcardType)),
  front: nonBlank(5_000, "front"),
  back: nonBlank(5_000, "back"),
  notes: optionalMarkdown(5_000),
  concepts: z.array(conceptKeySchema).min(1, "Tag the card with at least one concept.").max(10),
  applies: z.array(selectorSchema).max(20).optional(),
  access: accessSchema.optional(),
});
export type FlashcardSource = z.output<typeof flashcardSourceSchema>;

// =====================================================================================================================
// Assessments — content/subjects/<family>/assessments/**/*.json (a JSON array of assessments)
// =====================================================================================================================

export const blueprintRuleSourceSchema = z
  .strictObject({
    /** Draw from questions tagged with any of these concepts (portable across syllabi). */
    concepts: z.array(conceptKeySchema).max(50).optional(),
    /** Or: from these topic nodes (node keys) of the assessment's single `syllabus`. */
    topics: z.array(nodeKeySchema).max(50).optional(),
    includeSubtopics: z.boolean().default(true),
    count: z.int().min(1).max(200),
    difficulty: z.tuple([z.int().min(1).max(5), z.int().min(1).max(5)]).default([1, 5]),
    type: z.enum(enumValues(QuestionType)).optional(),
    skill: z.enum(enumValues(CognitiveSkill)).optional(),
    marksPerQuestion: z.int().min(1).max(100).optional(),
    examStyleOnly: z.boolean().default(false),
  })
  .refine((rule) => rule.difficulty[0] <= rule.difficulty[1], { message: "difficulty is [lowest, highest].", path: ["difficulty"] })
  .refine((rule) => !(rule.concepts && rule.topics), { message: "Scope a rule by concepts OR topics, not both.", path: ["topics"] });

export const assessmentSectionSourceSchema = z.strictObject({
  title: nonBlank(200, "section title"),
  instructions: optionalMarkdown(5_000),
  /** Paper code of the target syllabus (requires a single `syllabus`). */
  component: z.string().trim().min(1).max(16).optional(),
  timeLimitMinutes: z.int().min(1).max(1_440).optional(),
  answerCount: z.int().min(1).max(100).optional(),
  marks: z.int().min(1).max(10_000).optional(),
  rules: z.array(blueprintRuleSourceSchema).max(50).default([]),
  items: z
    .array(z.strictObject({ question: itemKeySchema, label: z.string().trim().min(1).max(16).optional(), marks: z.int().min(1).max(1_000).optional() }))
    .max(200)
    .default([]),
});

export const assessmentSourceSchema = z.strictObject({
  key: itemKeySchema,
  kind: z.enum(enumValues(AssessmentKind)),
  assembly: z.enum(enumValues(AssessmentAssembly)).optional(),
  title: nonBlank(200, "title"),
  description: optionalMarkdown(2_000),
  instructions: optionalMarkdown(20_000),
  timeLimitMinutes: z.int().min(1).max(1_440).nullable().default(null),
  access: accessSchema.default("PREMIUM"),
  feedback: z.enum(enumValues(AssessmentFeedbackTiming)).default("AFTER_SUBMIT"),
  shuffleQuestions: z.boolean().default(false),
  shuffleOptions: z.boolean().default(false),
  allowNavigation: z.boolean().default(true),
  maxAttempts: z.int().min(1).max(100).nullable().default(null),
  /** Portable: one assessment per matching syllabus version (default: every syllabus of the family). */
  applies: z.array(selectorSchema).max(20).optional(),
  /** Or exactly one subject (optionally @version): required for papers (`component`) and topic-key rules. */
  syllabus: subjectRefSchema.optional(),
  /** Topic scope of the assessment (AssessmentTopic): the nodes covering these concepts / these node keys. */
  scope: z
    .strictObject({ concepts: z.array(conceptKeySchema).max(100).optional(), topics: z.array(nodeKeySchema).max(100).optional() })
    .optional(),
  sections: z.array(assessmentSectionSourceSchema).min(1).max(20),
});
export type AssessmentSource = z.output<typeof assessmentSourceSchema>;

// =====================================================================================================================
// Media manifest — content/subjects/<family>/media/media.json
// =====================================================================================================================

export const MEDIA_EXTENSIONS = [".png", ".jpg", ".jpeg", ".webp"] as const;
export const MAX_MEDIA_BYTES = 2 * 1024 * 1024;

export const mediaEntrySchema = z.strictObject({
  /** File name inside the family's media/ directory (sub-folders allowed with /). */
  file: z.string().regex(/^[a-z0-9][a-z0-9._/-]*\.(?:png|jpe?g|webp)$/, "Media files are lower-case .png, .jpg or .webp paths."),
  /** Required alt text (§43): what the image shows for the learning point. */
  alt: nonBlank(1_000, "alt text"),
  caption: z.string().trim().max(1_000).optional(),
  longDescription: z.string().trim().max(10_000).optional(),
  purpose: z.enum(["DIAGRAM", "CONTENT_IMAGE"]).default("DIAGRAM"),
});
export const mediaManifestSchema = z.array(mediaEntrySchema).max(5_000);
export type MediaEntry = z.output<typeof mediaEntrySchema>;
