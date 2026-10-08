import "server-only";
import type { ContentStatus, Prisma } from "@/generated/prisma/client";
import { createAssessment, saveAssessmentStructure, updateAssessmentMeta } from "@/server/cms/assessments/service";
import { createFlashcard, saveFlashcard } from "@/server/cms/flashcards/service";
import { createLesson, saveLesson } from "@/server/cms/lessons/service";
import { normaliseEditorDocument } from "@/server/cms/questions/core";
import { questionEditorSchema, type QuestionEditorData } from "@/server/cms/questions/schemas";
import { createQuestion, updateQuestion } from "@/server/cms/questions/service";
import { requestContentChanges, startEditingPublished, submitContent } from "@/server/cms/review/workflow";
import type { CmsActor } from "@/server/cms/users/access";
import type { WorkflowEntityType } from "@/server/content/publish";
import { db } from "@/server/db";
import type { Tx } from "@/server/lib/db-context";
import {
  assessmentProjection,
  flashcardProjection,
  idSetKey,
  lessonProjection,
  questionProjection,
  tagKey,
  type AssessmentLike,
  type QuestionNodeLike,
  type QuestionRootLike,
} from "./compare";
import { describeError } from "./issues";
import { assessmentExternalRef, itemExternalRef } from "./keys";
import type { LoadedItem, LoadedLesson, LoadedRegistry } from "./load";
import { rewriteMedia, toEditorDocument } from "./question-model";
import { assessmentTargets, homeSubjectPath, planTags, resolveObjectives, syllabiForFamily, type SyllabusModel, type TagPlan } from "./resolve";
import type { AssessmentSource, FlashcardSource, QuestionSource } from "./schemas";
import { CONTENT_AUTHOR, OWN_LICENCE } from "./sources";
import type { SyllabusIndexEntry } from "./syllabus-sync";
import { resolveAssessmentTarget } from "./assessment-plan";

/**
 * Upserts lessons, questions, flashcards and assessments from the content source (docs/CONTENT_PIPELINE.md
 * "Importing"). Every write goes through the CMS services (validation, render caches, media usage, audit) inside one
 * transaction per item, with the pipeline AUTHOR as the acting account; the publish helper's workflow decides what may
 * change:
 *
 * | Database row                  | File unchanged                    | File changed                                         |
 * |-------------------------------|-----------------------------------|------------------------------------------------------|
 * | none                          | –                                 | created (DRAFT, aiGenerated) → submitted (IN_REVIEW) |
 * | DRAFT                         | submitted (unless changes were requested and not yet addressed) | updated → submitted |
 * | IN_REVIEW / APPROVED          | unchanged                         | sent back to DRAFT, updated, resubmitted (approval withdrawn) |
 * | PUBLISHED                     | unchanged (tags re-synced in place: tags are metadata) | CONFLICT: a draft copy (revision + 1) is created / updated and submitted; students keep the published revision |
 * | ARCHIVED                      | skipped                           | skipped (restore it in the CMS first)                |
 *
 * Items are never deleted: rows whose key disappeared from the files are reported as orphans.
 */

export type ItemType = Extract<WorkflowEntityType, "LESSON" | "QUESTION" | "FLASHCARD" | "ASSESSMENT">;
export type ItemOutcome = "created" | "updated" | "unchanged" | "retagged" | "conflict" | "skipped" | "error";

export interface ItemResult {
  type: ItemType;
  family: string;
  key: string;
  outcome: ItemOutcome;
  id?: string;
  message?: string;
}

export interface ItemImportContext {
  author: CmsActor;
  originalSourceId: string;
  /** syllabus path (board/qualification/subject/version) → imported version. */
  index: ReadonlyMap<string, SyllabusIndexEntry>;
  models: readonly SyllabusModel[];
  registries: ReadonlyMap<string, LoadedRegistry>;
  /** family → media file → MediaAsset id. */
  media: ReadonlyMap<string, ReadonlyMap<string, string>>;
  /** YYYY-MM-DD, recorded as the publication date of new lessons. */
  today: string;
}

const TX_OPTIONS = { timeout: 120_000, maxWait: 15_000 } as const;
const PROVENANCE_NOTE = "Superseded by an updated version from the content source (content:import).";

// =====================================================================================================================
// Tag resolution (concept plans → database topic / objective ids)
// =====================================================================================================================

interface ResolvedTags {
  /** Questions: one primary per syllabus version. */
  perSyllabus: { topicId: string; isPrimary: boolean }[];
  /** Lessons / flashcards: all topics, home syllabus first. */
  topicIds: string[];
  primaryTopicId: string | null;
  objectiveIds: string[];
  homeSubjectId: string | null;
  notes: string[];
}

function resolveTags(family: string, concepts: readonly string[], applies: readonly string[] | undefined, objectives: readonly string[], ctx: ItemImportContext): ResolvedTags {
  const plans = planTags(concepts, applies, syllabiForFamily(family, ctx.models));
  const notes: string[] = [];
  const homePath = homeSubjectPath(plans, ctx.registries.get(family));
  const ordered: TagPlan[] = [...plans.filter((p) => p.syllabus.subjectPath === homePath), ...plans.filter((p) => p.syllabus.subjectPath !== homePath)];
  const perSyllabus: ResolvedTags["perSyllabus"] = [];
  const topicIds: string[] = [];
  let homeSubjectId: string | null = null;
  for (const plan of ordered) {
    const entry = ctx.index.get(plan.syllabus.path);
    if (!entry) {
      notes.push(`not tagged in ${plan.syllabus.path} (that syllabus was not imported)`);
      continue;
    }
    if (homeSubjectId === null && plan.syllabus.subjectPath === homePath) homeSubjectId = entry.subjectId;
    let first = true;
    for (const node of plan.nodes) {
      const topicId = entry.topicIds.get(node.key);
      if (!topicId) {
        notes.push(`topic ${node.key} of ${plan.syllabus.path} is not in the database`);
        continue;
      }
      perSyllabus.push({ topicId, isPrimary: first });
      topicIds.push(topicId);
      first = false;
    }
  }
  if (homeSubjectId === null) homeSubjectId = ordered.map((p) => ctx.index.get(p.syllabus.path)?.subjectId).find((id) => id !== undefined) ?? null;
  const objectiveIds: string[] = [];
  for (const objective of resolveObjectives(objectives, plans).objectives) {
    const id = ctx.index.get(objective.syllabus.path)?.objectiveIds.get(objective.code);
    if (id) objectiveIds.push(id);
  }
  return { perSyllabus, topicIds: [...new Set(topicIds)], primaryTopicId: topicIds[0] ?? null, objectiveIds: [...new Set(objectiveIds)], homeSubjectId, notes };
}

function mediaResolver(ctx: ItemImportContext, family: string): (file: string) => string | null {
  const files = ctx.media.get(family);
  return (file) => files?.get(file) ?? null;
}

// =====================================================================================================================
// Workflow helpers
// =====================================================================================================================

async function submit(tx: Tx, type: ItemType, id: string, author: CmsActor): Promise<void> {
  await submitContent(author, { entityType: type, id }, { client: tx });
}

/** A DRAFT row to write into: IN_REVIEW / APPROVED rows go back to DRAFT first (their approval no longer applies). */
async function draftForEdit(tx: Tx, type: ItemType, row: { id: string; status: ContentStatus }, author: CmsActor): Promise<string> {
  if (row.status === "IN_REVIEW" || row.status === "APPROVED") {
    await requestContentChanges(author, { entityType: type, id: row.id, notes: PROVENANCE_NOTE }, { client: tx });
  }
  return row.id;
}

/** Imported content is AI-written (§41): flag the row (and question parts); live rows carry the content key. */
async function markProvenance(tx: Tx, type: ItemType, id: string, externalRef: string | null): Promise<void> {
  const data = { aiGenerated: true, ...(externalRef ? { externalRef } : {}) };
  switch (type) {
    case "QUESTION":
      await tx.question.update({ where: { id }, data });
      await tx.question.updateMany({ where: { OR: [{ parentId: id }, { parent: { parentId: id } }], aiGenerated: false }, data: { aiGenerated: true } });
      return;
    case "LESSON":
      await tx.lesson.update({ where: { id }, data });
      return;
    case "FLASHCARD":
      await tx.flashcard.update({ where: { id }, data });
      return;
    case "ASSESSMENT":
      await tx.assessment.update({ where: { id }, data });
      return;
  }
}

async function inTx<T>(fn: (tx: Tx) => Promise<T>): Promise<T> {
  return db.$transaction(fn, TX_OPTIONS);
}

function result(type: ItemType, family: string, key: string, outcome: ItemOutcome, extra: { id?: string; message?: string; notes?: string[] } = {}): ItemResult {
  const message = [extra.message, ...(extra.notes ?? [])].filter(Boolean).join("; ");
  return { type, family, key, outcome, ...(extra.id ? { id: extra.id } : {}), ...(message ? { message } : {}) };
}

async function chunked<T>(values: readonly string[], load: (chunk: string[]) => Promise<T[]>): Promise<T[]> {
  const out: T[] = [];
  for (let i = 0; i < values.length; i += 500) out.push(...(await load(values.slice(i, i + 500))));
  return out;
}

// =====================================================================================================================
// Questions
// =====================================================================================================================

const OPTION_SELECT = { key: true, content: true, isCorrect: true, rationale: true } as const;
const OPTION_ORDER = [{ sortOrder: "asc" }, { key: "asc" }] satisfies Prisma.QuestionOptionOrderByWithRelationInput[];
const PART_FIELDS = {
  id: true,
  partLabel: true,
  type: true,
  markingMode: true,
  stem: true,
  payload: true,
  answerSpec: true,
  marks: true,
  explanation: true,
  workedSolution: true,
  hints: true,
  options: { orderBy: OPTION_ORDER, select: OPTION_SELECT },
} as const;
const LIVE_PARTS = { status: { not: "ARCHIVED" } } satisfies Prisma.QuestionWhereInput;
const PART_ORDER = [{ partOrder: "asc" }, { id: "asc" }] satisfies Prisma.QuestionOrderByWithRelationInput[];
const QUESTION_COMPARE = {
  id: true,
  status: true,
  revision: true,
  reviewNotes: true,
  subjectId: true,
  type: true,
  markingMode: true,
  stem: true,
  payload: true,
  answerSpec: true,
  marks: true,
  explanation: true,
  workedSolution: true,
  conceptSummary: true,
  hints: true,
  difficulty: true,
  estimatedSeconds: true,
  paperLabel: true,
  cognitiveSkill: true,
  isExamStyle: true,
  isDailyEligible: true,
  calculatorAllowed: true,
  accessTier: true,
  options: { orderBy: OPTION_ORDER, select: OPTION_SELECT },
  parts: { where: LIVE_PARTS, orderBy: PART_ORDER, select: { ...PART_FIELDS, parts: { where: LIVE_PARTS, orderBy: PART_ORDER, select: PART_FIELDS } } },
  topics: { select: { topicId: true, isPrimary: true } },
  objectives: { select: { objectiveId: true } },
} as const;
const QUESTION_SELECT = { ...QUESTION_COMPARE, externalRef: true, pendingDraft: { select: QUESTION_COMPARE } } as const;
type QuestionCompareRow = Prisma.QuestionGetPayload<{ select: typeof QUESTION_COMPARE }>;
type QuestionRow = Prisma.QuestionGetPayload<{ select: typeof QUESTION_SELECT }>;

export async function loadQuestions(refs: readonly string[]): Promise<Map<string, QuestionRow>> {
  const rows = await chunked(refs, (chunk) => db.question.findMany({ where: { externalRef: { in: chunk } }, select: QUESTION_SELECT }));
  return new Map(rows.map((row) => [row.externalRef as string, row]));
}

function partIdsOf(row: QuestionCompareRow): Map<string, string> {
  const ids = new Map<string, string>();
  for (const part of row.parts) {
    ids.set(part.partLabel ?? "", part.id);
    for (const sub of part.parts) ids.set(`${part.partLabel ?? ""}${sub.partLabel ?? ""}`, sub.id);
  }
  return ids;
}

function rowToLike(row: QuestionCompareRow): QuestionRootLike {
  const node = (part: QuestionCompareRow["parts"][number] | QuestionCompareRow["parts"][number]["parts"][number]): QuestionNodeLike => ({
    ...part,
    hints: part.hints,
    parts: "parts" in part ? part.parts.map(node) : [],
  });
  return { ...row, parts: row.parts.map(node) };
}

function docToLike(doc: QuestionEditorData): QuestionRootLike {
  const node = (part: QuestionEditorData["parts"][number] | QuestionEditorData["parts"][number]["parts"][number]): QuestionNodeLike => ({
    ...part,
    parts: "parts" in part ? part.parts.map(node) : [],
  });
  return { ...doc, parts: doc.parts.map(node) };
}

export async function importQuestion(item: LoadedItem<QuestionSource>, existing: QuestionRow | undefined, ctx: ItemImportContext): Promise<ItemResult> {
  const q = item.data;
  const done = (outcome: ItemOutcome, extra: { id?: string; message?: string; notes?: string[] } = {}) => result("QUESTION", item.family, q.key, outcome, extra);
  const tags = resolveTags(item.family, q.concepts, q.applies, q.objectives, ctx);
  if (!tags.homeSubjectId) return done("error", { message: "none of this question's syllabi has been imported", notes: tags.notes });
  const externalRef = itemExternalRef(item.family, q.key);
  const docFor = (partIds?: ReadonlyMap<string, string>) =>
    toEditorDocument(q, {
      subjectId: tags.homeSubjectId as string,
      topics: tags.perSyllabus,
      objectiveIds: tags.objectiveIds,
      provenance: { sourceId: ctx.originalSourceId, author: CONTENT_AUTHOR, licenceCode: OWN_LICENCE },
      resolveMedia: mediaResolver(ctx, item.family),
      ...(partIds ? { partIds } : {}),
    });
  let desired: QuestionEditorData;
  try {
    desired = normaliseEditorDocument(questionEditorSchema.parse(docFor()));
  } catch (error) {
    return done("error", { message: describeError(error) });
  }
  const want = { content: questionProjection(docToLike(desired)), tags: tagKey(tags.perSyllabus), objectives: idSetKey(tags.objectiveIds) };
  const matches = (row: QuestionCompareRow) => ({
    content: questionProjection(rowToLike(row)) === want.content,
    tags: tagKey(row.topics) === want.tags && idSetKey(row.objectives.map((o) => o.objectiveId)) === want.objectives,
  });
  const write = async (tx: Tx, row: QuestionCompareRow) => {
    const id = await draftForEdit(tx, "QUESTION", row, ctx.author);
    await updateQuestion(ctx.author, { id, question: docFor(partIdsOf(row)) }, { client: tx });
    await markProvenance(tx, "QUESTION", id, null);
    await submit(tx, "QUESTION", id, ctx.author);
    return id;
  };

  try {
    if (!existing) {
      const id = await inTx(async (tx) => {
        const created = await createQuestion(ctx.author, docFor(), { client: tx });
        await markProvenance(tx, "QUESTION", created.id, externalRef);
        await submit(tx, "QUESTION", created.id, ctx.author);
        return created.id;
      });
      return done("created", { id, notes: tags.notes });
    }
    if (existing.status === "ARCHIVED") return done("skipped", { id: existing.id, message: "archived in the database: restore it in the CMS to import changes" });
    const live = matches(existing);
    if (existing.status === "PUBLISHED") {
      const copy = existing.pendingDraft;
      if (live.content) {
        if (copy) return done("conflict", { id: existing.id, message: `matches the published revision, but a draft copy (${copy.id}, ${copy.status}) is pending: discard it in the CMS if it is no longer wanted` });
        if (live.tags) return done("unchanged", { id: existing.id, notes: tags.notes });
        await inTx(async (tx) => {
          await tx.questionTopic.deleteMany({ where: { questionId: existing.id } });
          await tx.questionObjective.deleteMany({ where: { questionId: existing.id } });
          const subjects = new Map([...ctx.index.values()].map((e) => [e.syllabusId, e.subjectId]));
          const topicSyllabus = await tx.topic.findMany({ where: { id: { in: tags.perSyllabus.map((t) => t.topicId) } }, select: { id: true, syllabusId: true } });
          const syllabusOf = new Map(topicSyllabus.map((t) => [t.id, t.syllabusId]));
          await tx.questionTopic.createMany({
            data: tags.perSyllabus.map((t) => ({ questionId: existing.id, topicId: t.topicId, syllabusId: syllabusOf.get(t.topicId) as string, subjectId: subjects.get(syllabusOf.get(t.topicId) as string) as string, isPrimary: t.isPrimary })),
          });
          if (tags.objectiveIds.length > 0) await tx.questionObjective.createMany({ data: tags.objectiveIds.map((objectiveId) => ({ questionId: existing.id, objectiveId })) });
        });
        return done("retagged", { id: existing.id, message: "topic tags updated (no new revision: tags are metadata)", notes: tags.notes });
      }
      if (copy) {
        const state = matches(copy);
        if (state.content && state.tags) return done("unchanged", { id: existing.id, message: `edit pending review as draft copy ${copy.id} (${copy.status})` });
        const id = await inTx((tx) => write(tx, copy));
        return done("conflict", { id, message: `published revision ${existing.revision} differs from the file: draft copy ${id} updated and submitted for review` });
      }
      const id = await inTx(async (tx) => {
        const draft = await startEditingPublished(ctx.author, { entityType: "QUESTION", id: existing.id }, { client: tx });
        const row = await tx.question.findUniqueOrThrow({ where: { id: draft.id }, select: QUESTION_COMPARE });
        return write(tx, row);
      });
      return done("conflict", { id, message: `published revision ${existing.revision} differs from the file: draft copy ${id} (revision ${existing.revision + 1}) created and submitted for review; students keep the published revision` });
    }
    if (live.content && live.tags) {
      if (existing.status !== "DRAFT") return done("unchanged", { id: existing.id, notes: tags.notes });
      if (existing.reviewNotes) return done("unchanged", { id: existing.id, message: `changes requested by a reviewer and not yet made in the file: ${existing.reviewNotes}` });
      await inTx((tx) => submit(tx, "QUESTION", existing.id, ctx.author));
      return done("updated", { id: existing.id, message: "submitted for review" });
    }
    await inTx((tx) => write(tx, existing));
    return done("updated", { id: existing.id, notes: tags.notes });
  } catch (error) {
    return done("error", { message: describeError(error) });
  }
}

// =====================================================================================================================
// Lessons
// =====================================================================================================================

const LESSON_COMPARE = {
  id: true,
  status: true,
  revision: true,
  reviewNotes: true,
  title: true,
  slug: true,
  kind: true,
  subjectId: true,
  summary: true,
  body: true,
  estimatedMinutes: true,
  accessTier: true,
  publicationDate: true,
  topics: { select: { topicId: true, isPrimary: true } },
  objectives: { select: { objectiveId: true } },
  practiceLinks: { orderBy: { sortOrder: "asc" }, select: { questionId: true } },
} as const;
const LESSON_SELECT = { ...LESSON_COMPARE, externalRef: true, pendingDraft: { select: LESSON_COMPARE } } as const;
type LessonCompareRow = Prisma.LessonGetPayload<{ select: typeof LESSON_COMPARE }>;
type LessonRow = Prisma.LessonGetPayload<{ select: typeof LESSON_SELECT }>;

export async function loadLessons(refs: readonly string[]): Promise<Map<string, LessonRow>> {
  const rows = await chunked(refs, (chunk) => db.lesson.findMany({ where: { externalRef: { in: chunk } }, select: LESSON_SELECT }));
  return new Map(rows.map((row) => [row.externalRef as string, row]));
}

function dateOnly(value: Date | null): string | null {
  return value ? value.toISOString().slice(0, 10) : null;
}

export async function importLesson(lesson: LoadedLesson, existing: LessonRow | undefined, ctx: ItemImportContext): Promise<ItemResult> {
  const front = lesson.front;
  const done = (outcome: ItemOutcome, extra: { id?: string; message?: string; notes?: string[] } = {}) => result("LESSON", lesson.family, front.key, outcome, extra);
  const tags = resolveTags(lesson.family, front.concepts, front.applies, front.objectives, ctx);
  if (!tags.homeSubjectId) return done("error", { message: "none of this lesson's syllabi has been imported", notes: tags.notes });
  const externalRef = itemExternalRef(lesson.family, front.key);
  const body = rewriteMedia(lesson.body, mediaResolver(ctx, lesson.family)).replace(/\s+$/, "\n");
  const accessTier = front.freePreview ? "FREE" : "PREMIUM";
  const input = (row: LessonCompareRow | null, id: string) => ({
    id,
    title: front.title,
    slug: front.slug ?? null,
    kind: front.kind,
    subjectId: tags.homeSubjectId,
    summary: front.summary,
    body,
    estimatedMinutes: front.estimatedMinutes,
    accessTier,
    languageCode: "en",
    metaTitle: null,
    metaDescription: null,
    topicIds: tags.topicIds,
    primaryTopicId: tags.primaryTopicId,
    objectiveIds: tags.objectiveIds,
    // Practice questions attached by an editor in the CMS are kept.
    questionIds: row?.practiceLinks.map((l) => l.questionId) ?? [],
    sourceId: ctx.originalSourceId,
    author: CONTENT_AUTHOR,
    copyrightStatus: "OWNED",
    licenceCode: OWN_LICENCE,
    attribution: null,
    sourceUrl: null,
    publicationDate: dateOnly(row?.publicationDate ?? null) ?? ctx.today,
  });
  const want = {
    content: lessonProjection({ title: front.title.trim(), kind: front.kind, subjectId: tags.homeSubjectId, summary: front.summary.trim() || null, body, estimatedMinutes: front.estimatedMinutes, accessTier, slug: front.slug ?? null }, front.slug !== undefined),
    tags: tagKey(tags.topicIds.map((topicId) => ({ topicId, isPrimary: topicId === tags.primaryTopicId }))),
    objectives: idSetKey(tags.objectiveIds),
  };
  const matches = (row: LessonCompareRow) => ({
    content: lessonProjection(row, front.slug !== undefined) === want.content,
    tags: tagKey(row.topics) === want.tags && idSetKey(row.objectives.map((o) => o.objectiveId)) === want.objectives,
  });
  const write = async (tx: Tx, row: LessonCompareRow) => {
    const id = await draftForEdit(tx, "LESSON", row, ctx.author);
    await saveLesson(ctx.author, input(row, id), { client: tx });
    await markProvenance(tx, "LESSON", id, null);
    await submit(tx, "LESSON", id, ctx.author);
    return id;
  };

  try {
    if (!existing) {
      const id = await inTx(async (tx) => {
        const created = await createLesson(ctx.author, { title: front.title, kind: front.kind, subjectId: tags.homeSubjectId, primaryTopicId: tags.primaryTopicId }, { client: tx });
        await saveLesson(ctx.author, input(null, created.id), { client: tx });
        await markProvenance(tx, "LESSON", created.id, externalRef);
        await submit(tx, "LESSON", created.id, ctx.author);
        return created.id;
      });
      return done("created", { id, notes: tags.notes });
    }
    if (existing.status === "ARCHIVED") return done("skipped", { id: existing.id, message: "archived in the database: restore it in the CMS to import changes" });
    const live = matches(existing);
    if (existing.status === "PUBLISHED") {
      const copy = existing.pendingDraft;
      if (live.content) {
        if (copy) return done("conflict", { id: existing.id, message: `matches the published revision, but a draft copy (${copy.id}, ${copy.status}) is pending: discard it in the CMS if it is no longer wanted` });
        if (live.tags) return done("unchanged", { id: existing.id, notes: tags.notes });
        await inTx(async (tx) => {
          await tx.lessonTopic.deleteMany({ where: { lessonId: existing.id } });
          await tx.lessonObjective.deleteMany({ where: { lessonId: existing.id } });
          await tx.lessonTopic.createMany({ data: tags.topicIds.map((topicId, i) => ({ lessonId: existing.id, topicId, isPrimary: topicId === tags.primaryTopicId, sortOrder: i })) });
          if (tags.objectiveIds.length > 0) await tx.lessonObjective.createMany({ data: tags.objectiveIds.map((objectiveId) => ({ lessonId: existing.id, objectiveId })) });
        });
        return done("retagged", { id: existing.id, message: "topic tags updated (no new revision: tags are metadata)", notes: tags.notes });
      }
      if (copy) {
        const state = matches(copy);
        if (state.content && state.tags) return done("unchanged", { id: existing.id, message: `edit pending review as draft copy ${copy.id} (${copy.status})` });
        const id = await inTx((tx) => write(tx, copy));
        return done("conflict", { id, message: `published revision ${existing.revision} differs from the file: draft copy ${id} updated and submitted for review` });
      }
      const id = await inTx(async (tx) => {
        const draft = await startEditingPublished(ctx.author, { entityType: "LESSON", id: existing.id }, { client: tx });
        const row = await tx.lesson.findUniqueOrThrow({ where: { id: draft.id }, select: LESSON_COMPARE });
        return write(tx, row);
      });
      return done("conflict", { id, message: `published revision ${existing.revision} differs from the file: draft copy ${id} (revision ${existing.revision + 1}) created and submitted for review; students keep the published revision` });
    }
    if (live.content && live.tags) {
      if (existing.status !== "DRAFT") return done("unchanged", { id: existing.id, notes: tags.notes });
      if (existing.reviewNotes) return done("unchanged", { id: existing.id, message: `changes requested by a reviewer and not yet made in the file: ${existing.reviewNotes}` });
      await inTx((tx) => submit(tx, "LESSON", existing.id, ctx.author));
      return done("updated", { id: existing.id, message: "submitted for review" });
    }
    await inTx((tx) => write(tx, existing));
    return done("updated", { id: existing.id, notes: tags.notes });
  } catch (error) {
    return done("error", { message: describeError(error) });
  }
}

// =====================================================================================================================
// Flashcards
// =====================================================================================================================

const FLASHCARD_COMPARE = {
  id: true,
  status: true,
  revision: true,
  reviewNotes: true,
  subjectId: true,
  cardType: true,
  front: true,
  back: true,
  notes: true,
  accessTier: true,
  topics: { select: { topicId: true, isPrimary: true } },
} as const;
const FLASHCARD_SELECT = { ...FLASHCARD_COMPARE, externalRef: true, pendingDraft: { select: FLASHCARD_COMPARE } } as const;
type FlashcardCompareRow = Prisma.FlashcardGetPayload<{ select: typeof FLASHCARD_COMPARE }>;
type FlashcardRow = Prisma.FlashcardGetPayload<{ select: typeof FLASHCARD_SELECT }>;

export async function loadFlashcards(refs: readonly string[]): Promise<Map<string, FlashcardRow>> {
  const rows = await chunked(refs, (chunk) => db.flashcard.findMany({ where: { externalRef: { in: chunk } }, select: FLASHCARD_SELECT }));
  return new Map(rows.map((row) => [row.externalRef as string, row]));
}

export async function importFlashcard(item: LoadedItem<FlashcardSource>, existing: FlashcardRow | undefined, ctx: ItemImportContext): Promise<ItemResult> {
  const card = item.data;
  const done = (outcome: ItemOutcome, extra: { id?: string; message?: string; notes?: string[] } = {}) => result("FLASHCARD", item.family, card.key, outcome, extra);
  const tags = resolveTags(item.family, card.concepts, card.applies, [], ctx);
  if (!tags.homeSubjectId) return done("error", { message: "none of this card's syllabi has been imported", notes: tags.notes });
  const resolve = mediaResolver(ctx, item.family);
  const fields = {
    subjectId: tags.homeSubjectId,
    cardType: card.cardType,
    front: rewriteMedia(card.front, resolve).trim(),
    back: rewriteMedia(card.back, resolve).trim(),
    notes: card.notes && card.notes.trim() !== "" ? rewriteMedia(card.notes, resolve).trim() : null,
    accessTier: card.access ?? "PREMIUM",
  };
  const input = (id?: string) => ({
    ...(id ? { id } : {}),
    ...fields,
    languageCode: "en",
    topicIds: tags.topicIds,
    primaryTopicId: tags.primaryTopicId,
    sourceId: ctx.originalSourceId,
    author: CONTENT_AUTHOR,
    copyrightStatus: "OWNED",
    licenceCode: OWN_LICENCE,
    attribution: null,
    sourceUrl: null,
    publicationDate: null,
  });
  const want = { content: flashcardProjection(fields), tags: tagKey(tags.topicIds.map((topicId) => ({ topicId, isPrimary: topicId === tags.primaryTopicId }))) };
  const matches = (row: FlashcardCompareRow) => ({ content: flashcardProjection(row) === want.content, tags: tagKey(row.topics) === want.tags });
  const write = async (tx: Tx, row: FlashcardCompareRow) => {
    const id = await draftForEdit(tx, "FLASHCARD", row, ctx.author);
    await saveFlashcard(ctx.author, input(id), { client: tx });
    await markProvenance(tx, "FLASHCARD", id, null);
    await submit(tx, "FLASHCARD", id, ctx.author);
    return id;
  };

  try {
    if (!existing) {
      const id = await inTx(async (tx) => {
        const created = await createFlashcard(ctx.author, input(), { client: tx });
        await markProvenance(tx, "FLASHCARD", created.id, itemExternalRef(item.family, card.key));
        await submit(tx, "FLASHCARD", created.id, ctx.author);
        return created.id;
      });
      return done("created", { id, notes: tags.notes });
    }
    if (existing.status === "ARCHIVED") return done("skipped", { id: existing.id, message: "archived in the database: restore it in the CMS to import changes" });
    const live = matches(existing);
    if (existing.status === "PUBLISHED") {
      const copy = existing.pendingDraft;
      if (live.content) {
        if (copy) return done("conflict", { id: existing.id, message: `matches the published revision, but a draft copy (${copy.id}, ${copy.status}) is pending` });
        if (live.tags) return done("unchanged", { id: existing.id, notes: tags.notes });
        await inTx(async (tx) => {
          await tx.flashcardTopic.deleteMany({ where: { flashcardId: existing.id } });
          await tx.flashcardTopic.createMany({ data: tags.topicIds.map((topicId, i) => ({ flashcardId: existing.id, topicId, isPrimary: topicId === tags.primaryTopicId, sortOrder: i })) });
        });
        return done("retagged", { id: existing.id, message: "topic tags updated (no new revision: tags are metadata)", notes: tags.notes });
      }
      if (copy) {
        const state = matches(copy);
        if (state.content && state.tags) return done("unchanged", { id: existing.id, message: `edit pending review as draft copy ${copy.id} (${copy.status})` });
        const id = await inTx((tx) => write(tx, copy));
        return done("conflict", { id, message: `published revision ${existing.revision} differs from the file: draft copy ${id} updated and submitted for review` });
      }
      const id = await inTx(async (tx) => {
        const draft = await startEditingPublished(ctx.author, { entityType: "FLASHCARD", id: existing.id }, { client: tx });
        const row = await tx.flashcard.findUniqueOrThrow({ where: { id: draft.id }, select: FLASHCARD_COMPARE });
        return write(tx, row);
      });
      return done("conflict", { id, message: `published revision ${existing.revision} differs from the file: draft copy ${id} created and submitted for review` });
    }
    if (live.content && live.tags) {
      if (existing.status !== "DRAFT") return done("unchanged", { id: existing.id, notes: tags.notes });
      if (existing.reviewNotes) return done("unchanged", { id: existing.id, message: `changes requested by a reviewer and not yet made in the file: ${existing.reviewNotes}` });
      await inTx((tx) => submit(tx, "FLASHCARD", existing.id, ctx.author));
      return done("updated", { id: existing.id, message: "submitted for review" });
    }
    await inTx((tx) => write(tx, existing));
    return done("updated", { id: existing.id, notes: tags.notes });
  } catch (error) {
    return done("error", { message: describeError(error) });
  }
}

// =====================================================================================================================
// Assessments (one row per target syllabus version)
// =====================================================================================================================

const ASSESSMENT_COMPARE = {
  id: true,
  status: true,
  revision: true,
  reviewNotes: true,
  kind: true,
  assembly: true,
  subjectId: true,
  syllabusId: true,
  title: true,
  description: true,
  instructions: true,
  timeLimitSeconds: true,
  maxAttempts: true,
  feedbackTiming: true,
  shuffleQuestions: true,
  shuffleOptions: true,
  allowNavigation: true,
  accessTier: true,
  topics: { select: { topicId: true } },
  sections: {
    orderBy: [{ sortOrder: "asc" }, { id: "asc" }],
    select: {
      title: true,
      instructions: true,
      componentId: true,
      timeLimitSeconds: true,
      answerCount: true,
      marks: true,
      items: { orderBy: [{ sortOrder: "asc" }, { id: "asc" }], select: { questionId: true, label: true, marks: true } },
      rules: {
        orderBy: [{ sortOrder: "asc" }, { id: "asc" }],
        select: {
          topicId: true,
          objectiveId: true,
          includeSubtopics: true,
          questionType: true,
          cognitiveSkill: true,
          difficultyMin: true,
          difficultyMax: true,
          questionCount: true,
          marksPerQuestion: true,
          examStyleOnly: true,
        },
      },
    },
  },
} as const satisfies Prisma.AssessmentSelect;
const ASSESSMENT_SELECT = { ...ASSESSMENT_COMPARE, externalRef: true, pendingDraft: { select: ASSESSMENT_COMPARE } } as const;
type AssessmentCompareRow = Prisma.AssessmentGetPayload<{ select: typeof ASSESSMENT_COMPARE }>;
type AssessmentRow = Prisma.AssessmentGetPayload<{ select: typeof ASSESSMENT_SELECT }>;

export async function loadAssessments(refs: readonly string[]): Promise<Map<string, AssessmentRow>> {
  const rows = await chunked(refs, (chunk) => db.assessment.findMany({ where: { externalRef: { in: chunk } }, select: ASSESSMENT_SELECT }));
  return new Map(rows.map((row) => [row.externalRef as string, row]));
}

/** External references of every assessment row an assessment source produces. */
export function assessmentRefs(item: LoadedItem<AssessmentSource>, models: readonly SyllabusModel[]): string[] {
  return assessmentTargets(item.family, item.data, models).map((m) => assessmentExternalRef(item.family, item.data.key, m.ref));
}

function rowToAssessmentLike(row: AssessmentCompareRow): AssessmentLike {
  return { ...row, sections: row.sections.map((s) => ({ ...s, items: s.items, rules: s.rules })) };
}

export async function importAssessment(
  item: LoadedItem<AssessmentSource>,
  target: SyllabusModel,
  existing: AssessmentRow | undefined,
  questionIds: ReadonlyMap<string, string>,
  ctx: ItemImportContext,
): Promise<ItemResult> {
  const a = item.data;
  const key = `${a.key}@${target.path}`;
  const done = (outcome: ItemOutcome, extra: { id?: string; message?: string; notes?: string[] } = {}) => result("ASSESSMENT", item.family, key, outcome, extra);
  const entry = ctx.index.get(target.path);
  if (!entry) return done("error", { message: `${target.path} was not imported` });
  const resolved = resolveAssessmentTarget(a, target);
  const problems = resolved.problems.filter((p) => p.severity === "error");
  if (problems.length > 0) return done("error", { message: problems.map((p) => p.message).join("; ") });
  const components = await db.syllabusComponent.findMany({ where: { syllabusId: entry.syllabusId }, select: { id: true, code: true } });
  const componentIds = new Map(components.map((c) => [c.code, c.id]));
  const missingQuestions = resolved.sections.flatMap((s) => s.items.filter((i) => !questionIds.has(i.key)).map((i) => i.key));
  if (missingQuestions.length > 0) return done("error", { message: `questions not in the database: ${missingQuestions.join(", ")}` });
  const topicId = (nodeKey: string | undefined) => (nodeKey ? (entry.topicIds.get(nodeKey) ?? null) : null);
  const assembly = a.assembly ?? (a.sections.some((s) => s.rules.length > 0) ? "BLUEPRINT" : "FIXED");
  const scopeTopicIds = resolved.scope.map((n) => topicId(n.key)).filter((id): id is string => id !== null);
  const meta = {
    kind: a.kind,
    assembly,
    subjectId: entry.subjectId,
    syllabusId: entry.syllabusId,
    routeId: null,
    title: a.title,
    description: a.description ?? null,
    instructions: a.instructions ?? null,
    timeLimitMinutes: a.timeLimitMinutes,
    maxAttempts: a.maxAttempts,
    gradeSchemeId: null,
    feedbackTiming: a.feedback,
    shuffleQuestions: a.shuffleQuestions,
    shuffleOptions: a.shuffleOptions,
    allowNavigation: assembly === "ADAPTIVE" ? false : a.allowNavigation,
    accessTier: a.access,
    topicIds: scopeTopicIds,
    sourceId: ctx.originalSourceId,
    author: CONTENT_AUTHOR,
    copyrightStatus: "OWNED",
    licenceCode: OWN_LICENCE,
    attribution: null,
    sourceUrl: null,
    publicationDate: null,
  };
  const sections = resolved.sections.map((section, s) => {
    const source = a.sections[s] as AssessmentSource["sections"][number];
    return {
      title: source.title,
      instructions: source.instructions ?? null,
      componentId: section.componentCode ? (componentIds.get(section.componentCode) ?? null) : null,
      timeLimitMinutes: source.timeLimitMinutes ?? null,
      answerCount: source.answerCount ?? null,
      marks: source.marks ?? null,
      items: section.items.map((i) => ({ questionId: questionIds.get(i.key) as string, label: i.label, marks: i.marks })),
      rules: section.rules.map(({ topic, includeSubtopics, rule }) => ({
        topicId: topicId(topic?.key),
        objectiveId: null,
        includeSubtopics,
        questionType: rule.type ?? null,
        cognitiveSkill: rule.skill ?? null,
        difficultyMin: rule.difficulty[0],
        difficultyMax: rule.difficulty[1],
        questionCount: rule.count,
        marksPerQuestion: rule.marksPerQuestion ?? null,
        examStyleOnly: rule.examStyleOnly,
      })),
    };
  });
  const desired: AssessmentLike = {
    kind: meta.kind,
    assembly,
    subjectId: meta.subjectId,
    syllabusId: meta.syllabusId,
    title: meta.title.trim(),
    description: meta.description?.trim() || null,
    instructions: meta.instructions?.trim() || null,
    timeLimitSeconds: meta.timeLimitMinutes === null ? null : meta.timeLimitMinutes * 60,
    maxAttempts: meta.maxAttempts,
    feedbackTiming: meta.feedbackTiming,
    shuffleQuestions: meta.shuffleQuestions,
    shuffleOptions: meta.shuffleOptions,
    allowNavigation: meta.allowNavigation,
    accessTier: meta.accessTier,
    sections: sections.map((s) => ({
      title: s.title.trim(),
      instructions: s.instructions?.trim() || null,
      componentId: s.componentId,
      timeLimitSeconds: s.timeLimitMinutes === null ? null : s.timeLimitMinutes * 60,
      answerCount: s.answerCount,
      marks: s.marks,
      items: s.items.map((i) => ({ questionId: i.questionId, label: i.label, marks: i.marks })),
      rules: s.rules,
    })),
  };
  const want = { content: assessmentProjection(desired), topics: idSetKey(scopeTopicIds) };
  const matches = (row: AssessmentCompareRow) => ({ content: assessmentProjection(rowToAssessmentLike(row)) === want.content, tags: idSetKey(row.topics.map((t) => t.topicId)) === want.topics });
  const write = async (tx: Tx, row: AssessmentCompareRow) => {
    const id = await draftForEdit(tx, "ASSESSMENT", row, ctx.author);
    await updateAssessmentMeta(ctx.author, { id, ...meta }, { client: tx });
    await saveAssessmentStructure(ctx.author, { id, sections }, { client: tx });
    await markProvenance(tx, "ASSESSMENT", id, null);
    return id;
  };
  /** Fixed assessments can only enter review once their questions are published (the publisher submits them then). */
  const trySubmit = async (id: string): Promise<string | undefined> => {
    try {
      await inTx((tx) => submit(tx, "ASSESSMENT", id, ctx.author));
      return undefined;
    } catch (error) {
      return `kept as DRAFT until it can enter review: ${describeError(error)}`;
    }
  };

  try {
    if (!existing) {
      const id = await inTx(async (tx) => {
        const created = await createAssessment(ctx.author, meta, { client: tx });
        await saveAssessmentStructure(ctx.author, { id: created.id, sections }, { client: tx });
        await markProvenance(tx, "ASSESSMENT", created.id, assessmentExternalRef(item.family, a.key, target.ref));
        return created.id;
      });
      const note = await trySubmit(id);
      return done("created", { id, ...(note ? { message: note } : {}) });
    }
    if (existing.status === "ARCHIVED") return done("skipped", { id: existing.id, message: "archived in the database: restore it in the CMS to import changes" });
    const live = matches(existing);
    if (existing.status === "PUBLISHED") {
      const copy = existing.pendingDraft;
      if (live.content && live.tags && !copy) return done("unchanged", { id: existing.id });
      if (live.content && live.tags && copy) return done("conflict", { id: existing.id, message: `matches the published revision, but a draft copy (${copy.id}, ${copy.status}) is pending` });
      if (copy) {
        const state = matches(copy);
        if (state.content && state.tags) return done("unchanged", { id: existing.id, message: `edit pending review as draft copy ${copy.id} (${copy.status})` });
        const id = await inTx((tx) => write(tx, copy));
        const note = await trySubmit(id);
        return done("conflict", { id, message: `published revision ${existing.revision} differs from the file: draft copy ${id} updated${note ? `; ${note}` : " and submitted for review"}` });
      }
      const id = await inTx(async (tx) => {
        const draft = await startEditingPublished(ctx.author, { entityType: "ASSESSMENT", id: existing.id }, { client: tx });
        const row = await tx.assessment.findUniqueOrThrow({ where: { id: draft.id }, select: ASSESSMENT_COMPARE });
        return write(tx, row);
      });
      const note = await trySubmit(id);
      return done("conflict", { id, message: `published revision ${existing.revision} differs from the file: draft copy ${id} created${note ? `; ${note}` : " and submitted for review"}` });
    }
    if (live.content && live.tags) {
      if (existing.status !== "DRAFT") return done("unchanged", { id: existing.id });
      if (existing.reviewNotes) return done("unchanged", { id: existing.id, message: `changes requested by a reviewer and not yet made in the file: ${existing.reviewNotes}` });
      const note = await trySubmit(existing.id);
      return done(note ? "unchanged" : "updated", { id: existing.id, message: note ?? "submitted for review" });
    }
    const id = await inTx((tx) => write(tx, existing));
    const note = await trySubmit(id);
    return done("updated", { id, ...(note ? { message: note } : {}) });
  } catch (error) {
    return done("error", { message: describeError(error) });
  }
}

