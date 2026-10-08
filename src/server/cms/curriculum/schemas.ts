/**
 * Zod input contracts of the curriculum CMS (CLAUDE.md rule 4). Server Actions parse FormData into plain objects
 * (`./form-data`) and validate with these schemas; services parse again, so every channel (web, REST, scripts) gets
 * the same validation. Field names match the form controls, so `fieldErrors` map one-to-one onto `Field` errors.
 *
 * Form conventions: blank text becomes `null`; checkboxes are "on" when ticked (absent otherwise); numbers arrive as
 * text. Messages are written for staff and are safe to show.
 */
import { z } from "zod";
import { CatalogueStatus, CognitiveSkill, CopyrightStatus, SyllabusComponentKind, TopicKind } from "@/generated/prisma/enums";
import { isLocalDate, isValidTimeZone } from "@/lib/dates";
import { CURRICULUM_SLUG_PATTERN } from "@/server/curriculum/core";
import { MAX_CODE_LENGTH, MAX_OBJECTIVE_LENGTH, MAX_OUTLINE_LINES, MAX_SLUG_LENGTH, MAX_TOPIC_NAME_LENGTH } from "./core";

// ---------------------------------------------------------------------------------------------------------------------
// Primitives
// ---------------------------------------------------------------------------------------------------------------------

function blankToNull(value: unknown): unknown {
  if (value === undefined) return null;
  if (typeof value === "string" && value.trim() === "") return null;
  return value;
}

/** Required single-line text. */
export const requiredText = (max: number, label = "This field") =>
  z
    .string({ error: `${label} is required.` })
    .trim()
    .min(1, `${label} is required.`)
    .max(max, `${label} must be at most ${max} characters.`);

/** Optional text: blank → null. */
export const optionalText = (max: number) =>
  z.preprocess(blankToNull, z.string().trim().max(max, `Use at most ${max} characters.`).nullable());

/** Checkbox / switch: "on", "true", "1" or `true` → true; anything else (including absent) → false. */
export const checkbox = z.preprocess((value) => value === true || value === "on" || value === "true" || value === "1", z.boolean());

/** Optional whole number in a range: blank → null. */
export const optionalInt = (min: number, max: number) =>
  z.preprocess(
    blankToNull,
    z.coerce.number({ error: "Enter a whole number." }).int("Enter a whole number.").min(min, `Enter at least ${min}.`).max(max, `Enter at most ${max}.`).nullable(),
  );

/** Whole number with a default when blank. */
export const intWithDefault = (min: number, max: number, fallback: number) =>
  z.preprocess(
    (value) => (blankToNull(value) === null ? fallback : value),
    z.coerce.number({ error: "Enter a whole number." }).int("Enter a whole number.").min(min, `Enter at least ${min}.`).max(max, `Enter at most ${max}.`),
  );

export const sortOrder = intWithDefault(0, 100_000, 0);

/** A database id (UUID). */
export const id = z.uuid({ error: "Choose a valid item." });

/** Optional id: blank → null. */
export const optionalId = z.preprocess(blankToNull, z.uuid({ error: "Choose a valid item." }).nullable());

/** Calendar date `YYYY-MM-DD` (DATE columns). */
export const localDate = z
  .string({ error: "Enter a date." })
  .trim()
  .refine((value) => isLocalDate(value), "Enter a real date (YYYY-MM-DD).");

export const optionalLocalDate = z.preprocess(blankToNull, localDate.nullable());

/** http(s) URL (links only: official documents are never re-hosted, §27). */
export const optionalUrl = z.preprocess(
  blankToNull,
  z
    .url({ protocol: /^https?$/, error: "Enter a full web address starting with https://." })
    .max(2000, "Use at most 2000 characters.")
    .nullable(),
);

/** Public URL slug: blank → null (the service derives one from the name). */
export const optionalSlug = z.preprocess(
  (value) => (typeof value === "string" ? (value.trim() === "" ? null : value.trim()) : blankToNull(value)),
  z
    .string()
    .max(MAX_SLUG_LENGTH, `Slugs are at most ${MAX_SLUG_LENGTH} characters.`)
    .regex(CURRICULUM_SLUG_PATTERN, "Use lower-case letters, digits and single hyphens (e.g. additional-mathematics).")
    .nullable(),
);

/** A short official code (subject, syllabus, component): blank → null. */
export const optionalCode = (max: number) =>
  z.preprocess(blankToNull, z.string().trim().max(max, `Codes are at most ${max} characters.`).regex(/^\S(.*\S)?$/, "Remove surrounding spaces.").nullable());

const catalogueStatus = z.enum(CatalogueStatus, { error: "Choose a catalogue status." });

/** String or string[] (repeated form field) → string[]. */
export const stringList = z.preprocess(
  (value) => (value === undefined || value === null || value === "" ? [] : Array.isArray(value) ? value : [value]),
  z.array(z.string()),
);

const seoFields = {
  metaTitle: optionalText(70),
  metaDescription: optionalText(170),
};

// ---------------------------------------------------------------------------------------------------------------------
// Catalogue (§3, §4)
// ---------------------------------------------------------------------------------------------------------------------

export const countryInputSchema = z.object({
  isoCode: z
    .string()
    .trim()
    .toUpperCase()
    .regex(/^[A-Z]{2}$/, "Use the two-letter ISO 3166 code, e.g. ZW."),
  name: requiredText(100, "Name"),
  slug: optionalSlug,
  defaultCurrency: z
    .string()
    .trim()
    .toUpperCase()
    .regex(/^[A-Z]{3}$/, "Use the three-letter ISO 4217 code, e.g. USD."),
  timezone: requiredText(64, "Time zone").refine((value) => isValidTimeZone(value), "Use an IANA time zone, e.g. Africa/Harare."),
  defaultLocale: requiredText(16, "Locale").regex(/^[a-z]{2,3}(-[A-Za-z0-9]{2,8})*$/, "Use a BCP-47 locale, e.g. en-ZW."),
  dialCode: z.preprocess(blankToNull, z.string().trim().regex(/^\+\d{1,4}$/, "Use the international prefix, e.g. +263.").nullable()),
  catalogueStatus,
  sortOrder,
});
export type CountryInput = z.output<typeof countryInputSchema>;
export const countryUpdateSchema = countryInputSchema.extend({ id });

export const boardInputSchema = z.object({
  slug: optionalSlug,
  code: z
    .string()
    .trim()
    .toUpperCase()
    .regex(/^[A-Z0-9][A-Z0-9_-]{1,31}$/, "Use 2-32 capital letters, digits, hyphens or underscores, e.g. ZIMSEC."),
  name: requiredText(200, "Full name"),
  shortName: requiredText(60, "Display name"),
  description: optionalText(2000),
  publicSummary: optionalText(10_000),
  websiteUrl: optionalUrl,
  homeCountryId: optionalId,
  catalogueStatus,
  sortOrder,
  ...seoFields,
  confirmSlugChange: checkbox,
});
export type BoardInput = z.output<typeof boardInputSchema>;
export const boardUpdateSchema = boardInputSchema.extend({ id });

export const boardCountriesSchema = z.object({
  boardId: id,
  links: z
    .array(z.object({ countryId: id, isActive: checkbox, sortOrder }))
    .max(250, "Too many countries."),
});
export type BoardCountriesInput = z.output<typeof boardCountriesSchema>;

export const levelInputSchema = z.object({
  slug: optionalSlug,
  name: requiredText(60, "Name"),
  shortName: optionalText(32),
  description: optionalText(500),
  sortOrder,
  isActive: checkbox,
});
export type LevelInput = z.output<typeof levelInputSchema>;
export const levelUpdateSchema = levelInputSchema.extend({ id });

export const qualificationInputSchema = z.object({
  examBoardId: id,
  levelId: id,
  slug: optionalSlug,
  code: optionalCode(32),
  name: requiredText(200, "Name"),
  shortName: requiredText(60, "Short name"),
  description: optionalText(2000),
  publicSummary: optionalText(10_000),
  catalogueStatus,
  sortOrder,
  ...seoFields,
  confirmSlugChange: checkbox,
});
export type QualificationInput = z.output<typeof qualificationInputSchema>;
/** The board of a qualification is fixed at creation (it is part of every public URL and student track). */
export const qualificationUpdateSchema = qualificationInputSchema.omit({ examBoardId: true }).extend({ id });
export type QualificationUpdateInput = z.output<typeof qualificationUpdateSchema>;

export const yearGroupInputSchema = z.object({
  countryId: id,
  code: z
    .string()
    .trim()
    .toUpperCase()
    .regex(/^[A-Z0-9]{1,16}$/, "Use 1-16 capital letters or digits, e.g. F4 or L6."),
  name: requiredText(60, "Name"),
  ordinal: intWithDefault(1, 100, 1),
  typicalLevelId: optionalId,
  isActive: checkbox,
});
export type YearGroupInput = z.output<typeof yearGroupInputSchema>;
export const yearGroupUpdateSchema = yearGroupInputSchema.omit({ countryId: true }).extend({ id });
export type YearGroupUpdateInput = z.output<typeof yearGroupUpdateSchema>;

export const categoryInputSchema = z.object({
  slug: optionalSlug,
  name: requiredText(60, "Name"),
  description: optionalText(500),
  iconKey: optionalText(64),
  sortOrder,
  isActive: checkbox,
});
export type CategoryInput = z.output<typeof categoryInputSchema>;
export const categoryUpdateSchema = categoryInputSchema.extend({ id });

export const subjectInputSchema = z.object({
  qualificationId: id,
  categoryId: id,
  slug: optionalSlug,
  name: requiredText(120, "Name"),
  shortName: optionalText(64),
  officialCode: optionalCode(16),
  description: optionalText(2000),
  publicSummary: optionalText(10_000),
  ...seoFields,
  languageCode: requiredText(10, "Language").regex(/^[a-z]{2,3}(-[A-Za-z0-9]{2,8})?$/, "Use a language code such as en, sn, nd or fr."),
  iconKey: optionalText(64),
  catalogueStatus,
  isPublic: checkbox,
  sortOrder,
  /** The board's official subject list this entry was verified against (§27). */
  sourceId: optionalId,
  confirmSlugChange: checkbox,
});
export type SubjectInput = z.output<typeof subjectInputSchema>;
/** A subject's qualification is fixed at creation (enrolments and syllabus versions hang off it). */
export const subjectUpdateSchema = subjectInputSchema.omit({ qualificationId: true }).extend({ id });
export type SubjectUpdateInput = z.output<typeof subjectUpdateSchema>;

// ---------------------------------------------------------------------------------------------------------------------
// Syllabus versions (§26, §27)
// ---------------------------------------------------------------------------------------------------------------------

const versionLabel = requiredText(64, "Version label");

export const syllabusCreateSchema = z
  .object({
    subjectId: id,
    versionLabel,
    title: requiredText(200, "Title"),
    code: optionalCode(16),
    effectiveFrom: localDate,
    effectiveTo: optionalLocalDate,
    /** Version whose structure is cloned (topics, objectives, components, routes) with lineage; null = empty tree. */
    cloneFromId: optionalId,
  })
  .refine((value) => value.effectiveTo === null || value.effectiveTo > value.effectiveFrom, {
    path: ["effectiveTo"],
    message: "The end date must be after the start date.",
  });
export type SyllabusCreateInput = z.output<typeof syllabusCreateSchema>;

export const syllabusUpdateSchema = z
  .object({
    id,
    versionLabel,
    title: requiredText(200, "Title"),
    code: optionalCode(16),
    effectiveFrom: localDate,
    effectiveTo: optionalLocalDate,
    overview: optionalText(20_000),
    assessmentOverview: optionalText(20_000),
    officialDocumentUrl: optionalUrl,
    gradeSchemeId: optionalId,
    sourceId: optionalId,
    copyrightStatus: z.enum(CopyrightStatus, { error: "Choose a copyright status." }),
    sourceNotes: optionalText(5000),
  })
  .refine((value) => value.effectiveTo === null || value.effectiveTo > value.effectiveFrom, {
    path: ["effectiveTo"],
    message: "The end date must be after the start date.",
  });
export type SyllabusUpdateInput = z.output<typeof syllabusUpdateSchema>;

/** Editorial corrections allowed on a PUBLISHED version (its structure and identity are frozen). */
export const syllabusEditorialSchema = z.object({
  id,
  title: requiredText(200, "Title"),
  effectiveTo: optionalLocalDate,
  overview: optionalText(20_000),
  assessmentOverview: optionalText(20_000),
  officialDocumentUrl: optionalUrl,
  gradeSchemeId: optionalId,
  sourceNotes: optionalText(5000),
});
export type SyllabusEditorialInput = z.output<typeof syllabusEditorialSchema>;

export const syllabusPublishSchema = z.object({
  id,
  mode: z.enum(["CURRENT", "UPCOMING"], { error: "Choose how to publish this version." }),
  /** Archive the version that stops being CURRENT instead of keeping it SUPERSEDED (still examined). */
  archivePrevious: checkbox,
});
export type SyllabusPublishInput = z.output<typeof syllabusPublishSchema>;

export const syllabusMakeCurrentSchema = z.object({ id, archivePrevious: checkbox });
export const syllabusIdSchema = z.object({ id });

const calculatorChoice = z.preprocess(
  (value) => (value === "yes" ? true : value === "no" ? false : null),
  z.boolean().nullable(),
);

export const componentInputSchema = z.object({
  syllabusId: id,
  code: requiredText(16, "Code"),
  name: requiredText(120, "Name"),
  kind: z.enum(SyllabusComponentKind, { error: "Choose the kind of paper." }),
  description: optionalText(2000),
  durationMinutes: optionalInt(1, 1000),
  maxMarks: optionalInt(1, 10_000),
  weightingPercent: z.preprocess(
    blankToNull,
    z.coerce
      .number({ error: "Enter a percentage." })
      .min(0, "Enter 0-100.")
      .max(100, "Enter 0-100.")
      .refine((value) => Math.round(value * 100) === value * 100, "Use at most two decimal places.")
      .nullable(),
  ),
  calculatorAllowed: calculatorChoice,
  sortOrder,
});
export type ComponentInput = z.output<typeof componentInputSchema>;
export const componentUpdateSchema = componentInputSchema.omit({ syllabusId: true }).extend({ id });
export type ComponentUpdateInput = z.output<typeof componentUpdateSchema>;

export const routeInputSchema = z.object({
  syllabusId: id,
  code: z
    .string()
    .trim()
    .toUpperCase()
    .regex(/^[A-Z0-9][A-Z0-9_-]{0,15}$/, "Use up to 16 capital letters or digits, e.g. CORE or AS."),
  name: requiredText(120, "Name"),
  description: optionalText(2000),
  gradeSchemeId: optionalId,
  isDefault: checkbox,
  sortOrder,
  components: z
    .array(z.object({ componentId: id, included: checkbox, isCompulsory: checkbox, choiceGroup: optionalText(64) }))
    .max(50)
    .default([]),
});
export type RouteInput = z.output<typeof routeInputSchema>;
export const routeUpdateSchema = routeInputSchema.omit({ syllabusId: true }).extend({ id });
export type RouteUpdateInput = z.output<typeof routeUpdateSchema>;

// ---------------------------------------------------------------------------------------------------------------------
// Topic tree (§3)
// ---------------------------------------------------------------------------------------------------------------------

const topicName = requiredText(MAX_TOPIC_NAME_LENGTH, "Name");
const topicKind = z.enum(TopicKind, { error: "Choose a kind." });

export const topicAddSchema = z.object({
  syllabusId: id,
  parentId: optionalId,
  kind: z.preprocess(blankToNull, topicKind.nullable()),
  name: topicName,
  code: optionalCode(MAX_CODE_LENGTH),
  slug: optionalSlug,
});
export type TopicAddInput = z.output<typeof topicAddSchema>;

const examYear = optionalInt(2000, 2100);

export const topicUpdateSchema = z
  .object({
    id,
    kind: topicKind,
    name: topicName,
    code: optionalCode(MAX_CODE_LENGTH),
    slug: optionalSlug,
    description: optionalText(10_000),
    publicSummary: optionalText(10_000),
    ...seoFields,
    isPublic: checkbox,
    isOptional: checkbox,
    optionGroup: optionalText(64),
    examYearFrom: examYear,
    examYearTo: examYear,
    estimatedStudyMinutes: optionalInt(1, 100_000),
    componentIds: stringList.pipe(z.array(id).max(50)),
  })
  .refine((value) => value.examYearFrom === null || value.examYearTo === null || value.examYearTo >= value.examYearFrom, {
    path: ["examYearTo"],
    message: "The last exam year cannot be before the first.",
  })
  .refine((value) => value.optionGroup === null || value.isOptional, {
    path: ["optionGroup"],
    message: "Only optional topics belong to an option group.",
  });
export type TopicUpdateInput = z.output<typeof topicUpdateSchema>;

/** Editorial wording that may still be corrected on a PUBLISHED version (the database freezes the structure). */
export const topicEditorialSchema = z.object({
  id,
  name: topicName,
  description: optionalText(10_000),
  publicSummary: optionalText(10_000),
  ...seoFields,
  isPublic: checkbox,
  estimatedStudyMinutes: optionalInt(1, 100_000),
});
export type TopicEditorialInput = z.output<typeof topicEditorialSchema>;

export const topicMoveSchema = z.object({ id, direction: z.enum(["up", "down"]) });
export const topicShiftSchema = z.object({ id, operation: z.enum(["indent", "outdent"]) });
export const topicReparentSchema = z.object({ id, parentId: optionalId });
export const topicIdSchema = z.object({ id });

const objectiveFields = {
  code: optionalCode(MAX_CODE_LENGTH),
  statement: requiredText(MAX_OBJECTIVE_LENGTH, "Objective"),
  cognitiveSkill: z.preprocess(blankToNull, z.enum(CognitiveSkill).nullable()),
};
export const objectiveAddSchema = z.object({ topicId: id, ...objectiveFields });
export type ObjectiveAddInput = z.output<typeof objectiveAddSchema>;
export const objectiveUpdateSchema = z.object({ id, ...objectiveFields });
export type ObjectiveUpdateInput = z.output<typeof objectiveUpdateSchema>;
export const objectiveMoveSchema = z.object({ id, direction: z.enum(["up", "down"]) });

export const outlineImportSchema = z.object({
  syllabusId: id,
  parentId: optionalId,
  text: z
    .string({ error: "Paste the outline." })
    .max(MAX_OUTLINE_LINES * 400, "The outline is too long. Paste it in parts.")
    .refine((value) => value.trim() !== "", "Paste the outline."),
  topLevelKind: z.enum(["TOPIC", "SECTION"]).default("TOPIC"),
  detectCodes: checkbox,
  /** Licensed document the structure was copied from (§27); recorded on the version. */
  sourceId: optionalId,
  sourceNote: optionalText(500),
});
export type OutlineImportInput = z.output<typeof outlineImportSchema>;

export const retagSchema = z
  .object({
    syllabusId: id,
    questions: checkbox,
    lessons: checkbox,
    flashcards: checkbox,
    objectives: checkbox,
  })
  .refine((value) => value.questions || value.lessons || value.flashcards || value.objectives, {
    path: ["_form"],
    message: "Choose at least one kind of content to copy.",
  });
export type RetagInput = z.output<typeof retagSchema>;

// ---------------------------------------------------------------------------------------------------------------------
// Exam sessions (§17) and grade schemes (§12)
// ---------------------------------------------------------------------------------------------------------------------

const examSessionFields = {
  name: requiredText(120, "Name"),
  seriesCode: z
    .string()
    .trim()
    .toUpperCase()
    .regex(/^[A-Z0-9][A-Z0-9-]{1,31}$/, "Use 2-32 capital letters, digits or hyphens, e.g. 2027-NOV."),
  year: intWithDefault(2000, 2100, new Date().getUTCFullYear()),
  startsOn: localDate,
  endsOn: localDate,
  sourceUrl: optionalUrl,
  notes: optionalText(2000),
};

function examSessionDates<T extends { startsOn: string; endsOn: string; year: number }>(schema: z.ZodType<T>) {
  return schema
    .refine((value) => value.endsOn >= value.startsOn, { path: ["endsOn"], message: "The last exam day cannot be before the first." })
    .refine((value) => Math.abs(Number(value.startsOn.slice(0, 4)) - value.year) <= 1, {
      path: ["year"],
      message: "The series year should match the exam dates.",
    });
}

export const examSessionCreateSchema = examSessionDates(z.object({ qualificationId: id, ...examSessionFields }));
export type ExamSessionCreateInput = z.output<typeof examSessionCreateSchema>;
export const examSessionUpdateSchema = examSessionDates(z.object({ id, ...examSessionFields }));
export type ExamSessionUpdateInput = z.output<typeof examSessionUpdateSchema>;

export const examSessionStatusSchema = z.object({ id, status: z.enum(["DRAFT", "PUBLISHED", "CANCELLED", "ARCHIVED"]) });
export const examSessionConfirmSchema = z.object({
  id,
  sourceUrl: z.url({ protocol: /^https?$/, error: "Link the official timetable you checked the dates against." }).max(2000),
});

export const gradeBandSchema = z.object({
  label: z.string().trim().max(8, "At most 8 characters."),
  minPercent: z.coerce.number({ error: "Enter a percentage." }),
  isPass: checkbox,
  description: optionalText(200),
});

const gradeSchemeFields = {
  name: requiredText(120, "Name"),
  description: optionalText(2000),
  disclaimer: optionalText(500),
  isEstimate: checkbox,
  sourceId: optionalId,
  sourceNote: optionalText(1000),
  isDefault: checkbox,
  isActive: checkbox,
  bands: z.array(gradeBandSchema).max(40, "Too many bands."),
};

function gradeSchemeRules<T extends { isEstimate: boolean; disclaimer: string | null; sourceId: string | null }>(schema: z.ZodType<T>) {
  return schema
    .refine((value) => !value.isEstimate || value.disclaimer !== null, {
      path: ["disclaimer"],
      message: "Estimated grades need the caveat students see next to every estimate.",
    })
    .refine((value) => value.isEstimate || value.sourceId !== null, {
      path: ["sourceId"],
      message: "Official (non-estimate) boundaries must cite the board's published source.",
    });
}

export const gradeSchemeCreateSchema = gradeSchemeRules(z.object({ qualificationId: id, ...gradeSchemeFields }));
export type GradeSchemeCreateInput = z.output<typeof gradeSchemeCreateSchema>;
export const gradeSchemeUpdateSchema = gradeSchemeRules(z.object({ id, ...gradeSchemeFields }));
export type GradeSchemeUpdateInput = z.output<typeof gradeSchemeUpdateSchema>;

// ---------------------------------------------------------------------------------------------------------------------
// List filters (searchParams)
// ---------------------------------------------------------------------------------------------------------------------

/** Opaque list cursor (base64url of a row id). */
export const cursorParam = z.preprocess(blankToNull, z.string().regex(/^[A-Za-z0-9_-]{1,200}$/).nullable()).catch(null);

const searchText = z.preprocess(blankToNull, z.string().trim().max(100).nullable()).catch(null);
const optionalFilterId = z.preprocess(blankToNull, z.uuid().nullable()).catch(null);

export const catalogueListFilterSchema = z.object({
  q: searchText,
  status: z.preprocess(blankToNull, catalogueStatus.nullable()).catch(null),
  cursor: cursorParam,
});
export type CatalogueListFilter = z.output<typeof catalogueListFilterSchema>;

export const simpleListFilterSchema = z.object({ q: searchText, cursor: cursorParam });
export type SimpleListFilter = z.output<typeof simpleListFilterSchema>;

export const yearGroupListFilterSchema = simpleListFilterSchema.extend({ countryId: optionalFilterId });
export type YearGroupListFilter = z.output<typeof yearGroupListFilterSchema>;

export const qualificationListFilterSchema = catalogueListFilterSchema.extend({ boardId: optionalFilterId, levelId: optionalFilterId });
export type QualificationListFilter = z.output<typeof qualificationListFilterSchema>;

export const subjectListFilterSchema = catalogueListFilterSchema.extend({
  boardId: optionalFilterId,
  qualificationId: optionalFilterId,
  categoryId: optionalFilterId,
  verified: z.preprocess(blankToNull, z.enum(["yes", "no"]).nullable()).catch(null),
});
export type SubjectListFilter = z.output<typeof subjectListFilterSchema>;

export const syllabusListFilterSchema = z.object({
  q: searchText,
  subjectId: optionalFilterId,
  qualificationId: optionalFilterId,
  status: z.preprocess(blankToNull, z.enum(["DRAFT", "UPCOMING", "CURRENT", "SUPERSEDED", "ARCHIVED"]).nullable()).catch(null),
  cursor: cursorParam,
});
export type SyllabusListFilter = z.output<typeof syllabusListFilterSchema>;

export const topicSearchFilterSchema = z.object({
  q: searchText,
  subjectId: optionalFilterId,
  syllabusId: optionalFilterId,
  kind: z.preprocess(blankToNull, topicKind.nullable()).catch(null),
  cursor: cursorParam,
});
export type TopicSearchFilter = z.output<typeof topicSearchFilterSchema>;

export const examSessionListFilterSchema = z.object({
  q: searchText,
  qualificationId: optionalFilterId,
  status: z.preprocess(blankToNull, z.enum(["DRAFT", "PUBLISHED", "CANCELLED", "ARCHIVED"]).nullable()).catch(null),
  year: z.preprocess(blankToNull, z.coerce.number().int().min(2000).max(2100).nullable()).catch(null),
  cursor: cursorParam,
});
export type ExamSessionListFilter = z.output<typeof examSessionListFilterSchema>;

export const gradeSchemeListFilterSchema = z.object({
  qualificationId: optionalFilterId,
  active: z.preprocess(blankToNull, z.enum(["yes", "no"]).nullable()).catch(null),
  cursor: cursorParam,
});
export type GradeSchemeListFilter = z.output<typeof gradeSchemeListFilterSchema>;
