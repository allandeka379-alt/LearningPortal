import { z } from "zod";
import { MAX_SOURCE_LENGTH } from "@/server/content/render";
import { COPYRIGHT_STATUSES } from "../review/provenance";
import { LESSON_KINDS, LESSON_SLUG_PATTERN, MAX_SLUG_LENGTH } from "./core";

/**
 * Validation for lesson authoring (§8, §27, §44). Inputs arrive as strings from forms; blank optional fields become
 * null. The database CHECKs (scope, licence evidence, positive minutes) are mirrored as field errors.
 */

export const ACCESS_TIERS = ["PREMIUM", "FREE", "PUBLIC"] as const;
export const CONTENT_STATUSES = ["DRAFT", "IN_REVIEW", "APPROVED", "PUBLISHED", "ARCHIVED"] as const;

const trimmedOrNull = (max: number, message?: string) =>
  z.preprocess(
    (value) => (typeof value === "string" ? (value.trim() === "" ? null : value.trim()) : value ?? null),
    z.string().max(max, message ?? `Use at most ${max} characters.`).nullable(),
  );

const optionalUuid = (message: string) =>
  z.preprocess((value) => (typeof value === "string" && value.trim() === "" ? null : value ?? null), z.uuid(message).nullable());

const uuidList = (max: number, message: string) =>
  z.preprocess(
    (value) => (value === undefined || value === null ? [] : Array.isArray(value) ? value.filter((v) => v !== "") : [value]),
    z.array(z.uuid("Choose valid items.")).max(max, message),
  );

const optionalUrl = z.preprocess(
  (value) => (typeof value === "string" ? (value.trim() === "" ? null : value.trim()) : value ?? null),
  z.url({ protocol: /^https?$/, message: "Use a full http(s) link." }).max(2_000).nullable(),
);

const optionalDate = z.preprocess(
  (value) => (typeof value === "string" ? (value.trim() === "" ? null : value.trim()) : value ?? null),
  z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Use a date like 2026-10-05.")
    .refine((v) => !Number.isNaN(Date.parse(`${v}T00:00:00Z`)), "Use a real date.")
    .nullable(),
);

/** Licensing fields shared by lessons and flashcards (§27). */
export const provenanceSchema = z.object({
  sourceId: optionalUuid("Choose a content source."),
  author: trimmedOrNull(200),
  copyrightStatus: z.enum(COPYRIGHT_STATUSES).default("UNVERIFIED"),
  licenceCode: trimmedOrNull(64),
  attribution: trimmedOrNull(1_000),
  sourceUrl: optionalUrl,
  publicationDate: optionalDate,
});

/** Database licence CHECKs as field errors (LICENSED needs a source; OPEN_LICENSE a source or a licence code). */
export function refineProvenance(value: z.infer<typeof provenanceSchema>, ctx: z.RefinementCtx): void {
  if (value.copyrightStatus === "LICENSED" && !value.sourceId) {
    ctx.addIssue({ code: "custom", path: ["sourceId"], message: "Licensed content must name the content source that holds the licence." });
  }
  if (value.copyrightStatus === "OPEN_LICENSE" && !value.sourceId && !value.licenceCode) {
    ctx.addIssue({ code: "custom", path: ["licenceCode"], message: "Open-licensed content needs a source or a licence code." });
  }
}

const titleSchema = z.preprocess(
  (value) => (typeof value === "string" ? value.trim() : value),
  z.string({ message: "Give the lesson a title." }).min(1, "Give the lesson a title.").max(200, "Keep the title under 200 characters."),
);

const slugSchema = z.preprocess(
  (value) => (typeof value === "string" ? (value.trim() === "" ? null : value.trim().toLowerCase()) : value ?? null),
  z
    .string()
    .max(MAX_SLUG_LENGTH, `Keep the slug under ${MAX_SLUG_LENGTH} characters.`)
    .regex(LESSON_SLUG_PATTERN, "Use lower-case letters, numbers and single hyphens (e.g. solving-quadratics).")
    .nullable(),
);

export const createLessonSchema = z
  .object({
    title: titleSchema,
    kind: z.enum(LESSON_KINDS).default("LESSON"),
    subjectId: optionalUuid("Choose a subject."),
    primaryTopicId: optionalUuid("Choose a topic."),
  })
  .superRefine((value, ctx) => {
    if (value.subjectId === null && value.kind !== "ARTICLE" && value.kind !== "STUDY_GUIDE") {
      ctx.addIssue({ code: "custom", path: ["subjectId"], message: "Choose the lesson's home subject." });
    }
  });

export const saveLessonSchema = z
  .object({
    id: z.uuid("Choose a valid lesson."),
    /** Optimistic concurrency: the `updatedAt` the editor loaded (ISO). */
    expectedUpdatedAt: z.preprocess((v) => (v === "" ? undefined : v), z.iso.datetime({ offset: true }).optional()),
    title: titleSchema,
    slug: slugSchema,
    kind: z.enum(LESSON_KINDS),
    subjectId: optionalUuid("Choose a subject."),
    summary: trimmedOrNull(1_000),
    body: z.preprocess((v) => (typeof v === "string" ? v.replace(/\r\n/g, "\n") : v ?? ""), z.string().max(MAX_SOURCE_LENGTH, "The lesson is too long.")),
    estimatedMinutes: z.coerce.number({ message: "Enter the reading time in minutes." }).int("Use whole minutes.").min(1, "At least 1 minute.").max(600, "At most 600 minutes."),
    accessTier: z.enum(ACCESS_TIERS).default("PREMIUM"),
    languageCode: z.preprocess(
      (v) => (typeof v === "string" && v.trim() !== "" ? v.trim() : "en"),
      z.string().regex(/^[a-z]{2,3}(-[A-Za-z0-9]{2,8})*$/, "Use a language code such as en, sn or nd.").max(10),
    ),
    metaTitle: trimmedOrNull(120, "Keep the SEO title under 120 characters."),
    metaDescription: trimmedOrNull(320, "Keep the SEO description under 320 characters."),
    topicIds: uuidList(30, "Tag at most 30 topics."),
    primaryTopicId: optionalUuid("Choose the primary topic."),
    objectiveIds: uuidList(100, "Choose at most 100 learning objectives."),
    questionIds: uuidList(50, "Attach at most 50 practice questions."),
  })
  .and(provenanceSchema)
  .superRefine((value, ctx) => {
    if (value.subjectId === null && value.kind !== "ARTICLE" && value.kind !== "STUDY_GUIDE") {
      ctx.addIssue({ code: "custom", path: ["subjectId"], message: "Choose the lesson's home subject." });
    }
    if (value.primaryTopicId && !value.topicIds.map((id) => id.toLowerCase()).includes(value.primaryTopicId.toLowerCase())) {
      ctx.addIssue({ code: "custom", path: ["primaryTopicId"], message: "The primary topic must be one of the tagged topics." });
    }
    refineProvenance(value, ctx);
  });

export type SaveLessonInput = z.infer<typeof saveLessonSchema>;

export const lessonFilterSchema = z.object({
  q: z.string().trim().max(200).optional(),
  subjectId: z.uuid().optional(),
  syllabusId: z.uuid().optional(),
  topicId: z.uuid().optional(),
  status: z.enum(CONTENT_STATUSES).optional(),
  kind: z.enum(LESSON_KINDS).optional(),
  ai: z.enum(["yes", "no"]).optional(),
  authorId: z.uuid().optional(),
  cursor: z.string().max(500).optional(),
  limit: z.coerce.number().int().min(1).max(100).default(25),
});

export const previewSchema = z.object({
  body: z.string().max(MAX_SOURCE_LENGTH, "The text is too long to preview."),
  mode: z.enum(["lesson", "card", "inline"]).default("lesson"),
});
