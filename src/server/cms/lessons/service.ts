import "server-only";
import type { ContentAccessTier, ContentStatus, CopyrightStatus, LessonKind, Prisma } from "@/generated/prisma/client";
import type { ContentHeading, ContentWarning, SanitizedHtml } from "@/lib/content/types";
import { contentHash, PIPELINE_VERSION, renderContent, renderInline } from "@/server/content/render";
import { LESSON_RENDER_OPTIONS, loadAssetResolver } from "@/server/content/service";
import { db } from "@/server/db";
import type { Tx } from "@/server/lib/db-context";
import { AppError } from "@/server/lib/errors";
import type { CmsActor } from "@/server/cms/users/access";
import { syncMediaUsage } from "../media/usage";
import { FLASHCARD_PREVIEW_OPTIONS } from "../review/checks";
import {
  assertCanDraft,
  auditContent,
  CONTENT_CMS_AUDIT,
  CONTENT_CMS_OPERATIONS,
  inTransaction,
  isFourEyesEnforced,
  parseInput,
  PERSON_SELECT,
  staffName,
  type ContentServiceContext,
} from "../review/context";
import { decodeKeyset, keysetOrder, keysetPage, keysetWhere } from "../review/cursor";
import {
  describeQuestions,
  describeTopics,
  objectivesUnderTopics,
  type ObjectiveOption,
  type PracticeQuestionOption,
  type TaggedTopic,
} from "../review/taxonomy";
import { isWithinTaggedTopics, nextFreeSlug, normaliseTopicTags, slugify } from "./core";
import { createLessonSchema, lessonFilterSchema, previewSchema, saveLessonSchema, type SaveLessonInput } from "./schemas";

/**
 * Lesson authoring (§8 lessons, §25 CMS, §27 licensing, §44 SEO). Lessons are platform content with the full editorial
 * workflow: only DRAFT rows (new lessons or draft copies of published ones) are edited here; review, approval,
 * publishing, archiving and "edit published" go through ../review/workflow (the shared publish helper). Every save
 * re-renders the body into the write-time cache (`bodyHtml`, `renderVersion`, `contentHash`, which the publish merge
 * carries onto the live row) and rewrites `ContentMediaUsage`.
 */

// =====================================================================================================================
// List
// =====================================================================================================================

export interface LessonListItem {
  id: string;
  title: string;
  slug: string;
  kind: LessonKind;
  status: ContentStatus;
  revision: number;
  aiGenerated: boolean;
  accessTier: ContentAccessTier;
  subject: string | null;
  primaryTopic: string | null;
  author: string | null;
  updatedAt: Date;
  /** A pending edit (draft copy) of this published lesson. */
  pendingDraft: { id: string; status: ContentStatus } | null;
  openFlags: number;
}

const LIST_SELECT = {
  id: true,
  title: true,
  slug: true,
  kind: true,
  status: true,
  revision: true,
  aiGenerated: true,
  accessTier: true,
  updatedAt: true,
  subject: { select: { name: true } },
  createdBy: { select: PERSON_SELECT },
  pendingDraft: { select: { id: true, status: true } },
  topics: { where: { isPrimary: true }, take: 1, select: { topic: { select: { code: true, name: true } } } },
} as const satisfies Prisma.LessonSelect;

/**
 * Live lessons (draft copies are shown on their live row as a pending edit), newest change first, with filters for
 * subject, syllabus version, topic, status (matching the live row or its pending edit), kind, AI drafts and author.
 */
export async function listLessons(actor: CmsActor, raw: unknown = {}): Promise<{ items: LessonListItem[]; nextCursor: string | null }> {
  assertCanDraft(actor);
  const filter = parseInput(lessonFilterSchema, raw);
  const cursor = decodeKeyset(filter.cursor);
  const and: Prisma.LessonWhereInput[] = [{ draftOfId: null }];
  if (filter.q) {
    and.push({ OR: [{ title: { contains: filter.q, mode: "insensitive" } }, { slug: { contains: filter.q.toLowerCase() } }] });
  }
  if (filter.subjectId) and.push({ subjectId: filter.subjectId });
  if (filter.topicId) and.push({ topics: { some: { topicId: filter.topicId } } });
  else if (filter.syllabusId) and.push({ topics: { some: { topic: { syllabusId: filter.syllabusId } } } });
  if (filter.status) and.push({ OR: [{ status: filter.status }, { pendingDraft: { is: { status: filter.status } } }] });
  if (filter.kind) and.push({ kind: filter.kind });
  if (filter.ai) and.push({ aiGenerated: filter.ai === "yes" });
  if (filter.authorId) and.push({ OR: [{ createdById: filter.authorId }, { pendingDraft: { is: { createdById: filter.authorId } } }] });
  const page = keysetWhere("updatedAt", cursor, "desc") as Prisma.LessonWhereInput;
  if (Object.keys(page).length > 0) and.push(page);

  const rows = await db.lesson.findMany({
    where: { AND: and },
    orderBy: keysetOrder("updatedAt", "desc") as Prisma.LessonOrderByWithRelationInput[],
    take: filter.limit + 1,
    select: LIST_SELECT,
  });
  const { items, nextCursor } = keysetPage(rows, filter.limit, (row) => row.updatedAt);
  const flags = items.length
    ? await db.contentFlag.groupBy({
        by: ["entityId"],
        where: { entityType: "LESSON", entityId: { in: items.map((row) => row.id) }, status: { in: ["OPEN", "IN_PROGRESS"] } },
        _count: { _all: true },
      })
    : [];
  const flagCounts = new Map(flags.map((row) => [row.entityId, row._count._all]));
  return {
    items: items.map((row) => {
      const primary = row.topics[0]?.topic;
      return {
        id: row.id,
        title: row.title,
        slug: row.slug,
        kind: row.kind,
        status: row.status,
        revision: row.revision,
        aiGenerated: row.aiGenerated,
        accessTier: row.accessTier,
        subject: row.subject?.name ?? null,
        primaryTopic: primary ? `${primary.code ? `${primary.code} ` : ""}${primary.name}` : null,
        author: staffName(row.createdBy),
        updatedAt: row.updatedAt,
        pendingDraft: row.pendingDraft,
        openFlags: flagCounts.get(row.id) ?? 0,
      };
    }),
    nextCursor,
  };
}

// =====================================================================================================================
// Editor data
// =====================================================================================================================

export interface LessonEditorData {
  id: string;
  /** Set on a draft copy: the live lesson it will replace when published. */
  draftOfId: string | null;
  /** Pending draft copy of this live lesson (open it to edit). */
  pendingDraft: { id: string; status: ContentStatus } | null;
  status: ContentStatus;
  revision: number;
  /** Latest published revision of the live lesson (null when never published). */
  publishedRevision: number | null;
  editable: boolean;
  aiGenerated: boolean;
  updatedAt: Date;
  fields: {
    title: string;
    slug: string;
    kind: LessonKind;
    subjectId: string | null;
    summary: string | null;
    body: string;
    estimatedMinutes: number;
    accessTier: ContentAccessTier;
    languageCode: string;
    metaTitle: string | null;
    metaDescription: string | null;
    sourceId: string | null;
    author: string | null;
    copyrightStatus: CopyrightStatus;
    licenceCode: string | null;
    attribution: string | null;
    sourceUrl: string | null;
    publicationDate: string | null;
  };
  topics: (TaggedTopic & { isPrimary: boolean })[];
  objectiveIds: string[];
  /** Objectives available under the tagged topics (plus any selected one outside them). */
  objectives: ObjectiveOption[];
  questions: PracticeQuestionOption[];
  people: {
    createdBy: string | null;
    createdById: string | null;
    createdAt: Date;
    reviewedBy: string | null;
    reviewedAt: Date | null;
    approvedBy: string | null;
    approvedAt: Date | null;
    publishedAt: Date | null;
    archivedAt: Date | null;
  };
  reviewNotes: string | null;
  openFlags: number;
  isOwnWork: boolean;
  fourEyes: boolean;
}

function dateOnly(value: Date | null): string | null {
  return value ? value.toISOString().slice(0, 10) : null;
}

/** Everything the lesson editor page needs (one lesson, with labels for its tags and attached questions). */
export async function getLessonEditor(actor: CmsActor, id: string): Promise<LessonEditorData> {
  assertCanDraft(actor);
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) throw AppError.notFound("Lesson not found.");
  const lesson = await db.lesson.findUnique({
    where: { id },
    include: {
      topics: { orderBy: [{ isPrimary: "desc" }, { createdAt: "asc" }], select: { topicId: true, isPrimary: true } },
      objectives: { select: { objectiveId: true } },
      practiceLinks: { orderBy: [{ sortOrder: "asc" }], select: { questionId: true } },
      createdBy: { select: PERSON_SELECT },
      reviewedBy: { select: PERSON_SELECT },
      approvedBy: { select: PERSON_SELECT },
      pendingDraft: { select: { id: true, status: true } },
    },
  });
  if (!lesson) throw AppError.notFound("Lesson not found.");
  const liveId = lesson.draftOfId ?? lesson.id;
  const [topics, questions, publishedRevision, openFlags, fourEyes] = await Promise.all([
    describeTopics(lesson.topics.map((t) => t.topicId)),
    describeQuestions(lesson.practiceLinks.map((q) => q.questionId)),
    db.contentRevision.findFirst({ where: { entityType: "LESSON", entityId: liveId }, orderBy: { revision: "desc" }, select: { revision: true } }),
    db.contentFlag.count({ where: { entityType: "LESSON", entityId: liveId, status: { in: ["OPEN", "IN_PROGRESS"] } } }),
    isFourEyesEnforced(),
  ]);
  const primary = new Set(lesson.topics.filter((t) => t.isPrimary).map((t) => t.topicId));
  const objectiveIds = lesson.objectives.map((o) => o.objectiveId);
  const available = await objectivesUnderTopics(topics.map((t) => t.path));
  const missing = objectiveIds.filter((oid) => !available.some((o) => o.id === oid));
  const extra = missing.length
    ? (
        await db.learningObjective.findMany({
          where: { id: { in: missing } },
          select: { id: true, code: true, statement: true, topicId: true, topic: { select: { path: true } } },
        })
      ).map((o) => ({ id: o.id, topicId: o.topicId, topicPath: o.topic.path, label: `${o.code ? `${o.code} ` : ""}${o.statement}` }))
    : [];
  return {
    id: lesson.id,
    draftOfId: lesson.draftOfId,
    pendingDraft: lesson.pendingDraft,
    status: lesson.status,
    revision: lesson.revision,
    publishedRevision: publishedRevision?.revision ?? null,
    editable: lesson.status === "DRAFT",
    aiGenerated: lesson.aiGenerated,
    updatedAt: lesson.updatedAt,
    fields: {
      title: lesson.title,
      slug: lesson.slug,
      kind: lesson.kind,
      subjectId: lesson.subjectId,
      summary: lesson.summary,
      body: lesson.body,
      estimatedMinutes: lesson.estimatedMinutes,
      accessTier: lesson.accessTier,
      languageCode: lesson.languageCode,
      metaTitle: lesson.metaTitle,
      metaDescription: lesson.metaDescription,
      sourceId: lesson.sourceId,
      author: lesson.author,
      copyrightStatus: lesson.copyrightStatus,
      licenceCode: lesson.licenceCode,
      attribution: lesson.attribution,
      sourceUrl: lesson.sourceUrl,
      publicationDate: dateOnly(lesson.publicationDate),
    },
    topics: topics.map((t) => ({ ...t, isPrimary: primary.has(t.id) })),
    objectiveIds,
    objectives: [...available, ...extra],
    questions,
    people: {
      createdBy: staffName(lesson.createdBy),
      createdById: lesson.createdById,
      createdAt: lesson.createdAt,
      reviewedBy: staffName(lesson.reviewedBy),
      reviewedAt: lesson.reviewedAt,
      approvedBy: staffName(lesson.approvedBy),
      approvedAt: lesson.approvedAt,
      publishedAt: lesson.publishedAt,
      archivedAt: lesson.archivedAt,
    },
    reviewNotes: lesson.reviewNotes,
    openFlags,
    isOwnWork: lesson.createdById !== null && lesson.createdById === actor.userId,
    fourEyes,
  };
}

// =====================================================================================================================
// Create / save
// =====================================================================================================================

/** A slug free among LIVE lessons of the scope (draft copies share their live row's slug). */
async function freeSlug(tx: Tx, subjectId: string | null, base: string, exceptId?: string): Promise<string> {
  const rows = await tx.lesson.findMany({
    where: { draftOfId: null, subjectId, slug: { startsWith: base }, ...(exceptId ? { id: { not: exceptId } } : {}) },
    select: { slug: true },
    take: 1_000,
  });
  return nextFreeSlug(base, new Set(rows.map((row) => row.slug)));
}

/** Renders a lesson body into the write-time cache columns (assets resolved in one query). */
async function renderCache(tx: Tx, body: string): Promise<{ bodyHtml: string; renderVersion: number; contentHash: string }> {
  const resolveAsset = await loadAssetResolver([body], tx);
  const rendered = renderContent(body, { ...LESSON_RENDER_OPTIONS, resolveAsset });
  return { bodyHtml: rendered.html, renderVersion: PIPELINE_VERSION, contentHash: contentHash(body, LESSON_RENDER_OPTIONS) };
}

/**
 * Creates a DRAFT lesson (`content.draft`) with a unique slug from its title, optionally tagged to its primary topic.
 * The author is recorded as `createdById` (four-eyes: someone else must approve it).
 */
export async function createLesson(actor: CmsActor, raw: unknown, context: ContentServiceContext = {}): Promise<{ id: string; slug: string }> {
  assertCanDraft(actor);
  const input = parseInput(createLessonSchema, raw);
  return inTransaction(context, async (tx) => {
    const subject = input.subjectId ? await tx.subject.findUnique({ where: { id: input.subjectId }, select: { languageCode: true } }) : null;
    if (input.subjectId && !subject) throw AppError.validation({ subjectId: ["Choose an existing subject."] });
    if (input.primaryTopicId) {
      const topic = await tx.topic.findUnique({ where: { id: input.primaryTopicId }, select: { id: true } });
      if (!topic) throw AppError.validation({ primaryTopicId: ["Choose an existing topic."] });
    }
    const slug = await freeSlug(tx, input.subjectId, slugify(input.title));
    const created = await tx.lesson.create({
      data: {
        title: input.title,
        slug,
        kind: input.kind,
        subjectId: input.subjectId,
        body: "",
        languageCode: subject?.languageCode ?? "en",
        status: "DRAFT",
        createdById: actor.userId,
        ...(input.primaryTopicId ? { topics: { create: { topicId: input.primaryTopicId, isPrimary: true } } } : {}),
      },
      select: { id: true, slug: true },
    });
    await auditContent(tx, actor, context, {
      action: CONTENT_CMS_AUDIT.CREATE,
      operation: CONTENT_CMS_OPERATIONS.create,
      entityType: "Lesson",
      entityId: created.id,
      after: { title: input.title, kind: input.kind, subjectId: input.subjectId },
    });
    return created;
  });
}

const TRACKED_FIELDS = [
  "title",
  "slug",
  "kind",
  "subjectId",
  "summary",
  "body",
  "estimatedMinutes",
  "accessTier",
  "languageCode",
  "metaTitle",
  "metaDescription",
  "sourceId",
  "author",
  "copyrightStatus",
  "licenceCode",
  "attribution",
  "sourceUrl",
  "publicationDate",
] as const;

/** Fields whose values are recorded in the audit diff (long text such as the body is recorded as "changed" only). */
const AUDIT_VALUE_FIELDS: ReadonlySet<string> = new Set(["title", "slug", "kind", "subjectId", "estimatedMinutes", "accessTier", "languageCode", "sourceId", "copyrightStatus", "licenceCode", "publicationDate"]);

async function validateReferences(tx: Tx, input: SaveLessonInput, tags: { topicId: string }[]): Promise<void> {
  const errors: Record<string, string[]> = {};
  // Sequential: a transaction is one connection (concurrent queries on it are deprecated by `pg`).
  const subject = input.subjectId ? await tx.subject.findUnique({ where: { id: input.subjectId }, select: { id: true } }) : null;
  const source = input.sourceId ? await tx.contentSource.findUnique({ where: { id: input.sourceId }, select: { id: true, isActive: true } }) : null;
  const topics = tags.length ? await tx.topic.findMany({ where: { id: { in: tags.map((t) => t.topicId) } }, select: { id: true, path: true } }) : [];
  const questions = input.questionIds.length
    ? await tx.question.findMany({
        where: { id: { in: input.questionIds } },
        select: { id: true, status: true, parentId: true, draftOfId: true, schoolId: true, ownerUserId: true },
      })
    : [];
  if (input.subjectId && !subject) errors.subjectId = ["Choose an existing subject."];
  if (input.sourceId && !source) errors.sourceId = ["Choose an existing content source."];
  if (topics.length !== tags.length) errors.topicIds = ["One of the tagged topics no longer exists. Remove it and save again."];
  const questionsById = new Map(questions.map((q) => [q.id, q]));
  for (const qid of input.questionIds) {
    const q = questionsById.get(qid);
    if (!q) (errors.questionIds ??= []).push("One of the attached questions no longer exists.");
    else if (q.parentId !== null || q.draftOfId !== null || q.schoolId !== null || q.ownerUserId !== null) {
      (errors.questionIds ??= []).push("Attach whole platform questions only (not parts, drafts or school questions).");
    } else if (q.status === "ARCHIVED") (errors.questionIds ??= []).push("An attached question is archived. Remove it.");
  }
  if (input.objectiveIds.length > 0) {
    const objectives = await tx.learningObjective.findMany({ where: { id: { in: input.objectiveIds } }, select: { id: true, topic: { select: { path: true } } } });
    const paths = topics.map((t) => t.path);
    if (objectives.length !== new Set(input.objectiveIds).size) errors.objectiveIds = ["One of the learning objectives no longer exists."];
    else if (objectives.some((o) => !isWithinTaggedTopics(o.topic.path, paths))) {
      errors.objectiveIds = ["Choose learning objectives of the tagged topics only."];
    }
  }
  if (Object.keys(errors).length > 0) throw AppError.validation(errors);
}

/**
 * Saves a DRAFT lesson (`content.draft`): fields, licensing, topic tags (one primary), learning objectives and ordered
 * practice questions, re-rendering the body cache and media usage in the same transaction. The saver becomes the
 * draft's author (`createdById`), so the last author can never approve it under four-eyes. Refuses (CONFLICT) when the
 * lesson is not a draft (published lessons are edited through a draft copy) or when someone else saved since the
 * editor loaded it (`expectedUpdatedAt`).
 */
export async function saveLesson(actor: CmsActor, raw: unknown, context: ContentServiceContext = {}): Promise<{ id: string; updatedAt: Date; changed: string[] }> {
  assertCanDraft(actor);
  const input = parseInput(saveLessonSchema, raw);
  const tags = normaliseTopicTags(input.topicIds, input.primaryTopicId);
  return inTransaction(context, async (tx) => {
    const locked = await tx.$queryRaw<{ id: string }[]>`SELECT "id" FROM "Lesson" WHERE "id" = ${input.id}::uuid FOR UPDATE`;
    if (locked.length === 0) throw AppError.notFound("Lesson not found.");
    const before = await tx.lesson.findUniqueOrThrow({
      where: { id: input.id },
      include: {
        topics: { select: { topicId: true, isPrimary: true, sortOrder: true } },
        objectives: { select: { objectiveId: true } },
        practiceLinks: { orderBy: { sortOrder: "asc" }, select: { questionId: true } },
      },
    });
    if (before.status !== "DRAFT") {
      throw AppError.conflict(
        before.status === "PUBLISHED"
          ? "Published lessons can't be edited in place. Use “Edit published lesson” to start a new draft."
          : "Only drafts can be edited. Ask a reviewer to send it back to draft first.",
      );
    }
    if (input.expectedUpdatedAt && before.updatedAt.toISOString() !== new Date(input.expectedUpdatedAt).toISOString()) {
      throw AppError.conflict("Someone else saved this lesson after you opened it. Reload the page to see their changes, then edit again.");
    }
    await validateReferences(tx, input, tags);

    // Slug: unique among live lessons of the scope. A draft copy keeps its live row's slug unless changed.
    const scopeSubject = input.subjectId;
    let slug = input.slug ?? slugify(input.title);
    if (slug !== before.slug || scopeSubject !== before.subjectId) {
      const taken = await tx.lesson.findFirst({
        where: { draftOfId: null, subjectId: scopeSubject, slug, id: { notIn: [before.id, ...(before.draftOfId ? [before.draftOfId] : [])] } },
        select: { id: true },
      });
      if (taken) {
        if (input.slug) throw AppError.validation({ slug: ["Another lesson in this subject already uses this slug."] });
        slug = await freeSlug(tx, scopeSubject, slug, before.draftOfId ?? before.id);
      }
    }

    const data = {
      title: input.title,
      slug,
      kind: input.kind,
      subjectId: input.subjectId,
      summary: input.summary,
      body: input.body,
      estimatedMinutes: input.estimatedMinutes,
      accessTier: input.accessTier,
      languageCode: input.languageCode,
      metaTitle: input.metaTitle,
      metaDescription: input.metaDescription,
      sourceId: input.sourceId,
      author: input.author,
      copyrightStatus: input.copyrightStatus,
      licenceCode: input.licenceCode,
      attribution: input.attribution,
      sourceUrl: input.sourceUrl,
      publicationDate: input.publicationDate ? new Date(`${input.publicationDate}T00:00:00Z`) : null,
    };
    const beforeComparable: Record<string, unknown> = { ...before, publicationDate: dateOnly(before.publicationDate) };
    const afterComparable: Record<string, unknown> = { ...data, publicationDate: input.publicationDate };
    const changed: string[] = TRACKED_FIELDS.filter((field) => (beforeComparable[field] ?? null) !== (afterComparable[field] ?? null));

    const tagKey = (list: { topicId: string; isPrimary: boolean }[]) => list.map((t) => `${t.topicId}:${t.isPrimary}`).sort().join(",");
    if (tagKey(before.topics) !== tagKey(tags)) changed.push("topics");
    if ([...before.objectives.map((o) => o.objectiveId)].sort().join(",") !== [...new Set(input.objectiveIds)].sort().join(",")) changed.push("objectives");
    if (before.practiceLinks.map((q) => q.questionId).join(",") !== [...new Set(input.questionIds)].join(",")) changed.push("questions");

    const cache = await renderCache(tx, input.body);
    // Four-eyes is about the LAST author (ARCHITECTURE §5.3): whoever changes the draft becomes its author.
    const lastAuthor = changed.length > 0 && before.createdById !== actor.userId ? { createdById: actor.userId } : {};
    const updated = await tx.lesson.update({ where: { id: input.id }, data: { ...data, ...cache, ...lastAuthor }, select: { updatedAt: true } });
    if (changed.includes("topics")) {
      // Keep each topic's position of the lesson (LessonTopic.sortOrder) when the tag survives.
      const previousOrder = new Map(before.topics.map((t) => [t.topicId, t.sortOrder]));
      await tx.lessonTopic.deleteMany({ where: { lessonId: input.id } });
      if (tags.length > 0) {
        await tx.lessonTopic.createMany({
          data: tags.map((t) => ({ lessonId: input.id, topicId: t.topicId, isPrimary: t.isPrimary, sortOrder: previousOrder.get(t.topicId) ?? t.sortOrder })),
        });
      }
    }
    if (changed.includes("objectives")) {
      await tx.lessonObjective.deleteMany({ where: { lessonId: input.id } });
      const objectiveIds = [...new Set(input.objectiveIds)];
      if (objectiveIds.length > 0) await tx.lessonObjective.createMany({ data: objectiveIds.map((objectiveId) => ({ lessonId: input.id, objectiveId })) });
    }
    if (changed.includes("questions")) {
      await tx.lessonQuestion.deleteMany({ where: { lessonId: input.id } });
      const questionIds = [...new Set(input.questionIds)];
      if (questionIds.length > 0) await tx.lessonQuestion.createMany({ data: questionIds.map((questionId, sortOrder) => ({ lessonId: input.id, questionId, sortOrder })) });
    }
    await syncMediaUsage(tx, "LESSON", input.id, { body: input.body, summary: input.summary });

    if (changed.length > 0) {
      await auditContent(tx, actor, context, {
        action: CONTENT_CMS_AUDIT.UPDATE,
        operation: CONTENT_CMS_OPERATIONS.update,
        entityType: "Lesson",
        entityId: before.draftOfId ?? input.id,
        before: Object.fromEntries(changed.filter((f) => AUDIT_VALUE_FIELDS.has(f)).map((f) => [f, beforeComparable[f] ?? null])),
        after: Object.fromEntries(changed.filter((f) => AUDIT_VALUE_FIELDS.has(f)).map((f) => [f, afterComparable[f] ?? null])),
        metadata: { changed, draftId: before.draftOfId ? input.id : null },
      });
    }
    return { id: input.id, updatedAt: updated.updatedAt, changed };
  });
}

// =====================================================================================================================
// Live preview
// =====================================================================================================================

export interface MarkdownPreview {
  html: SanitizedHtml;
  warnings: readonly ContentWarning[];
  headings: readonly ContentHeading[];
  hasMath: boolean;
}

/**
 * Renders markdown exactly as students will see it (server-side KaTeX, sanitised, assets resolved) plus the authoring
 * warnings for the editor (`content.draft`). `mode`: "lesson" (lesson body), "card" (flashcard side, explanation),
 * "inline" (MCQ option / label).
 */
export async function previewMarkdown(actor: CmsActor, raw: unknown): Promise<MarkdownPreview> {
  assertCanDraft(actor);
  const input = parseInput(previewSchema, raw);
  const resolveAsset = await loadAssetResolver([input.body]);
  const rendered =
    input.mode === "inline"
      ? renderInline(input.body, { resolveAsset })
      : renderContent(input.body, input.mode === "lesson" ? { ...LESSON_RENDER_OPTIONS, resolveAsset } : { ...FLASHCARD_PREVIEW_OPTIONS, resolveAsset });
  return { html: rendered.html, warnings: rendered.warnings, headings: rendered.headings, hasMath: rendered.hasMath };
}
