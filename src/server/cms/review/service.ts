import "server-only";
import { z } from "zod";
import type { ContentStatus, Prisma } from "@/generated/prisma/client";
import type { ContentWarning, SanitizedHtml } from "@/lib/content/types";
import { buildSnapshot, loadContentAggregate, WORKFLOW_ENTITY_TYPES, type WorkflowEntityType } from "@/server/content/publish";
import { renderContent, renderInline, toExcerpt, type AssetResolver } from "@/server/content/render";
import { LESSON_RENDER_OPTIONS, loadAssetResolver } from "@/server/content/service";
import { db, type DbClient } from "@/server/db";
import type { Tx } from "@/server/lib/db-context";
import { AppError, type FieldErrors } from "@/server/lib/errors";
import type { CmsActor } from "@/server/cms/users/access";
import { contentSubmitIssues, FLASHCARD_PREVIEW_OPTIONS } from "./checks";
import { assertCanArchive, assertCanDraft, assertCanPublish, assertCanReview, isFourEyesEnforced, parseInput, PERSON_SELECT, staffName } from "./context";
import { compareKeyset, decodeKeyset, encodeKeyset, keysetOrder, keysetWhere, LIST_PAGE_SIZE } from "./cursor";
import { diffSnapshots, referencedIds, type DiffEntry, type JsonObject } from "./diff";
import { editorHref } from "./labels";
import { findWorkflowRow } from "./workflow";

/**
 * Review queue, review detail (diff against the last published revision + rendered preview + blocking issues) and
 * read-only revision history (§25, §26, §41, §42). Reads only; the transitions are in ./workflow.
 */

// =====================================================================================================================
// Queue
// =====================================================================================================================

export const QUEUE_STATUSES = ["IN_REVIEW", "APPROVED"] as const;
export type QueueStatus = (typeof QUEUE_STATUSES)[number];

const queueFilterSchema = z.object({
  status: z.enum(QUEUE_STATUSES).default("IN_REVIEW"),
  type: z.enum(WORKFLOW_ENTITY_TYPES).optional(),
  ai: z.enum(["only", "exclude"]).optional(),
  authored: z.enum(["mine", "others"]).optional(),
  cursor: z.string().max(500).optional(),
  limit: z.coerce.number().int().min(1).max(100).default(LIST_PAGE_SIZE),
});
export type ReviewQueueFilter = z.input<typeof queueFilterSchema>;

export interface ReviewQueueItem {
  entityType: WorkflowEntityType;
  id: string;
  title: string;
  /** Home subject (or "General" for subject-less items). */
  subject: string | null;
  status: ContentStatus;
  revision: number;
  /** Set for draft copies: the edit of an already-published item. */
  draftOfId: string | null;
  aiGenerated: boolean;
  createdById: string | null;
  author: string | null;
  /** Last change (submission time for items waiting in the queue). */
  updatedAt: Date;
  /** The viewer authored this item (four-eyes: they cannot approve it when enforced). */
  isOwnWork: boolean;
  approvedBy: string | null;
  approvedAt: Date | null;
}

interface QueueRow {
  id: string;
  status: ContentStatus;
  revision: number;
  draftOfId: string | null;
  aiGenerated: boolean;
  createdById: string | null;
  updatedAt: Date;
  approvedAt: Date | null;
  title: string;
  subject: string | null;
  author: string | null;
  approvedBy: string | null;
}

const queueSelect = {
  id: true,
  status: true,
  revision: true,
  draftOfId: true,
  aiGenerated: true,
  createdById: true,
  updatedAt: true,
  approvedAt: true,
  createdBy: { select: PERSON_SELECT },
  approvedBy: { select: PERSON_SELECT },
} as const;

const subjectSelect = { select: { name: true } } as const;

function excerpt(source: string | null | undefined, max = 120): string {
  if (!source) return "(empty)";
  try {
    return toExcerpt(source, max) || "(empty)";
  } catch {
    return source.slice(0, max);
  }
}

async function queueRowsFor(
  client: DbClient,
  type: WorkflowEntityType,
  where: Record<string, unknown>,
  orderBy: Record<string, "asc" | "desc">[],
  take: number,
): Promise<QueueRow[]> {
  const people = (row: { createdBy: Parameters<typeof staffName>[0]; approvedBy: Parameters<typeof staffName>[0] }) => ({
    author: staffName(row.createdBy),
    approvedBy: staffName(row.approvedBy),
  });
  switch (type) {
    case "LESSON": {
      const rows = await client.lesson.findMany({ where: where as Prisma.LessonWhereInput, orderBy, take, select: { ...queueSelect, title: true, subject: subjectSelect } });
      return rows.map(({ createdBy, approvedBy, subject, ...row }) => ({ ...row, subject: subject?.name ?? null, ...people({ createdBy, approvedBy }) }));
    }
    case "QUESTION": {
      const rows = await client.question.findMany({
        where: { ...(where as Prisma.QuestionWhereInput), schoolId: null, ownerUserId: null, parentId: null },
        orderBy,
        take,
        select: { ...queueSelect, stem: true, subject: subjectSelect },
      });
      return rows.map(({ createdBy, approvedBy, subject, stem, ...row }) => ({ ...row, title: excerpt(stem), subject: subject.name, ...people({ createdBy, approvedBy }) }));
    }
    case "FLASHCARD": {
      const rows = await client.flashcard.findMany({
        where: { ...(where as Prisma.FlashcardWhereInput), ownerUserId: null },
        orderBy,
        take,
        select: { ...queueSelect, front: true, subject: subjectSelect },
      });
      return rows.map(({ createdBy, approvedBy, subject, front, ...row }) => ({ ...row, title: excerpt(front), subject: subject.name, ...people({ createdBy, approvedBy }) }));
    }
    case "ASSESSMENT": {
      const rows = await client.assessment.findMany({
        where: { ...(where as Prisma.AssessmentWhereInput), schoolId: null, ownerUserId: null },
        orderBy,
        take,
        select: { ...queueSelect, title: true, subject: subjectSelect },
      });
      return rows.map(({ createdBy, approvedBy, subject, ...row }) => ({ ...row, subject: subject?.name ?? null, ...people({ createdBy, approvedBy }) }));
    }
    case "STUDY_PACK": {
      const rows = await client.studyPack.findMany({ where: where as Prisma.StudyPackWhereInput, orderBy, take, select: { ...queueSelect, title: true } });
      return rows.map(({ createdBy, approvedBy, ...row }) => ({ ...row, subject: null, ...people({ createdBy, approvedBy }) }));
    }
    case "STUDY_PLAN_TEMPLATE": {
      const rows = await client.studyPlanTemplate.findMany({
        where: where as Prisma.StudyPlanTemplateWhereInput,
        orderBy,
        take,
        select: { ...queueSelect, title: true, subject: subjectSelect },
      });
      return rows.map(({ createdBy, approvedBy, subject, ...row }) => ({ ...row, subject: subject?.name ?? null, ...people({ createdBy, approvedBy }) }));
    }
  }
}

/**
 * Items waiting for a reviewer (IN_REVIEW) or ready to publish (APPROVED), across every content type, OLDEST first
 * (first come, first served). Platform content only. Cursor-paginated: each type is read with the same keyset and
 * the pages are merged, so a page never needs an OFFSET or a total count.
 */
export async function listReviewQueue(actor: CmsActor, raw: ReviewQueueFilter = {}): Promise<{ items: ReviewQueueItem[]; nextCursor: string | null }> {
  assertCanDraft(actor);
  const filter = parseInput(queueFilterSchema, raw);
  const cursor = decodeKeyset(filter.cursor);
  const where: Record<string, unknown> = {
    status: filter.status,
    ...(filter.ai === "only" ? { aiGenerated: true } : filter.ai === "exclude" ? { aiGenerated: false } : {}),
    ...(filter.authored === "mine" ? { createdById: actor.userId } : {}),
    ...(filter.authored === "others" ? { OR: [{ createdById: null }, { createdById: { not: actor.userId } }] } : {}),
  };
  const page = keysetWhere("updatedAt", cursor, "asc");
  const fullWhere = Object.keys(page).length > 0 ? { AND: [where, page] } : where;
  const types = filter.type ? [filter.type] : WORKFLOW_ENTITY_TYPES;
  const orderBy = keysetOrder("updatedAt", "asc");
  const perType = await Promise.all(types.map(async (type) => (await queueRowsFor(db, type, fullWhere, orderBy, filter.limit + 1)).map((row) => ({ type, row }))));
  const merged = perType.flat().sort((a, b) => compareKeyset({ at: a.row.updatedAt, id: a.row.id }, { at: b.row.updatedAt, id: b.row.id }, "asc"));
  const items = merged.slice(0, filter.limit).map(({ type, row }) => ({
    entityType: type,
    id: row.id,
    title: row.title,
    subject: row.subject,
    status: row.status,
    revision: row.revision,
    draftOfId: row.draftOfId,
    aiGenerated: row.aiGenerated,
    createdById: row.createdById,
    author: row.author,
    updatedAt: row.updatedAt,
    isOwnWork: row.createdById !== null && row.createdById === actor.userId,
    approvedBy: row.approvedBy,
    approvedAt: row.approvedAt,
  }));
  const last = items.at(-1);
  return { items, nextCursor: merged.length > filter.limit && last ? encodeKeyset(last.updatedAt, last.id) : null };
}

/** Platform (non-school, non-personal) rows of one type in one queue status: an indexed count (`status` leads an index). */
function countQueue(type: WorkflowEntityType, status: QueueStatus): Promise<number> {
  switch (type) {
    case "LESSON":
      return db.lesson.count({ where: { status } });
    case "QUESTION":
      return db.question.count({ where: { status, schoolId: null, ownerUserId: null, parentId: null } });
    case "FLASHCARD":
      return db.flashcard.count({ where: { status, ownerUserId: null } });
    case "ASSESSMENT":
      return db.assessment.count({ where: { status, schoolId: null, ownerUserId: null } });
    case "STUDY_PACK":
      return db.studyPack.count({ where: { status } });
    case "STUDY_PLAN_TEMPLATE":
      return db.studyPlanTemplate.count({ where: { status } });
  }
}

/** Real counts per status and type for the queue tabs (platform content only; never estimated). */
export async function reviewQueueCounts(actor: CmsActor): Promise<Record<QueueStatus, Record<WorkflowEntityType, number>>> {
  assertCanDraft(actor);
  const result = {} as Record<QueueStatus, Record<WorkflowEntityType, number>>;
  for (const status of QUEUE_STATUSES) {
    const counts = await Promise.all(WORKFLOW_ENTITY_TYPES.map((type) => countQueue(type, status)));
    result[status] = Object.fromEntries(WORKFLOW_ENTITY_TYPES.map((type, i) => [type, counts[i] ?? 0])) as Record<WorkflowEntityType, number>;
  }
  return result;
}

/**
 * Items waiting for review across every content type: the IN_REVIEW total of {@link reviewQueueCounts}, computed with
 * only the IN_REVIEW counts (one indexed count per type, in parallel) for the admin sidebar badge.
 */
export async function countInReview(actor: CmsActor): Promise<number> {
  assertCanDraft(actor);
  const counts = await Promise.all(WORKFLOW_ENTITY_TYPES.map((type) => countQueue(type, "IN_REVIEW")));
  return counts.reduce((sum, value) => sum + value, 0);
}

// =====================================================================================================================
// Labels for snapshots (batch loaded, no N+1)
// =====================================================================================================================

/** Readable labels for every id the snapshots reference: topics, objectives, questions, lessons, subjects, sources… */
export async function loadSnapshotLabels(client: DbClient, snapshots: readonly (JsonObject | null | undefined)[]): Promise<Map<string, string>> {
  const ids = new Set<string>();
  for (const snapshot of snapshots) for (const id of referencedIds(snapshot)) ids.add(id);
  const list = [...ids].filter((id) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)).slice(0, 2_000);
  const labels = new Map<string, string>();
  if (list.length === 0) return labels;
  const where = { id: { in: list } };
  const [topics, objectives, questions, lessons, subjects, sources, syllabi, media, qualifications] = await Promise.all([
    client.topic.findMany({ where, select: { id: true, code: true, name: true, syllabus: { select: { versionLabel: true, subject: { select: { name: true } } } } } }),
    client.learningObjective.findMany({ where, select: { id: true, code: true, statement: true } }),
    client.question.findMany({ where, select: { id: true, stem: true, type: true } }),
    client.lesson.findMany({ where, select: { id: true, title: true } }),
    client.subject.findMany({ where, select: { id: true, name: true, qualification: { select: { shortName: true, name: true } } } }),
    client.contentSource.findMany({ where, select: { id: true, name: true } }),
    client.syllabus.findMany({ where, select: { id: true, versionLabel: true, subject: { select: { name: true } } } }),
    client.mediaAsset.findMany({ where, select: { id: true, altText: true, originalFilename: true } }),
    client.qualification.findMany({ where, select: { id: true, name: true } }),
  ]);
  for (const t of topics) labels.set(t.id, `${t.code ? `${t.code} ` : ""}${t.name} — ${t.syllabus.subject.name} (${t.syllabus.versionLabel})`);
  for (const o of objectives) labels.set(o.id, `${o.code ? `${o.code} ` : ""}${o.statement}`);
  for (const q of questions) labels.set(q.id, `${excerpt(q.stem, 90)} [${q.type.toLowerCase().replace(/_/g, " ")}]`);
  for (const l of lessons) labels.set(l.id, l.title);
  for (const s of subjects) labels.set(s.id, `${s.name} (${s.qualification.shortName ?? s.qualification.name})`);
  for (const s of sources) labels.set(s.id, s.name);
  for (const s of syllabi) labels.set(s.id, `${s.subject.name} syllabus ${s.versionLabel}`);
  for (const m of media) labels.set(m.id, `Image: ${m.altText ?? m.originalFilename ?? m.id}`);
  for (const q of qualifications) labels.set(q.id, q.name);
  return labels;
}

// =====================================================================================================================
// Rendered preview of a snapshot
// =====================================================================================================================

export interface PreviewSection {
  label: string;
  html: SanitizedHtml;
  inline: boolean;
  warnings: readonly ContentWarning[];
}

function str(value: unknown): string | null {
  return typeof value === "string" && value.trim() !== "" ? value : null;
}

function obj(value: unknown): Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value) ? (value as Record<string, unknown>) : {};
}

function arr(value: unknown): Record<string, unknown>[] {
  return Array.isArray(value) ? value.map(obj) : [];
}

/** Markdown sources of a snapshot, as (label, source, inline) triples in reading order. Pure. */
export function snapshotSources(entityType: WorkflowEntityType, snapshot: JsonObject): { label: string; source: string; inline: boolean }[] {
  const out: { label: string; source: string; inline: boolean }[] = [];
  const push = (label: string, value: unknown, inline = false) => {
    const source = str(value);
    if (source) out.push({ label, source, inline });
  };
  switch (entityType) {
    case "LESSON": {
      const lesson = obj(snapshot.lesson);
      push("Summary", lesson.summary);
      push("Body", lesson.body);
      break;
    }
    case "FLASHCARD": {
      const card = obj(snapshot.flashcard);
      push("Front", card.front);
      push("Back", card.back);
      push("Notes", card.notes);
      break;
    }
    case "QUESTION": {
      const visit = (row: Record<string, unknown>, options: Record<string, unknown>[], parts: Record<string, unknown>[], prefix: string) => {
        push(`${prefix}Question`, row.stem);
        for (const option of options) push(`${prefix}Option ${String(option.key)}${option.isCorrect === true ? " (correct)" : ""}`, option.content, true);
        push(`${prefix}Explanation`, row.explanation);
        push(`${prefix}Worked solution`, row.workedSolution);
        for (const part of parts) visit(part, arr(part.options), arr(part.parts), `${prefix}Part ${String(part.partLabel ?? "")} · `);
      };
      visit(obj(snapshot.question), arr(snapshot.options), arr(snapshot.parts), "");
      break;
    }
    case "ASSESSMENT": {
      const assessment = obj(snapshot.assessment);
      push("Description", assessment.description);
      push("Instructions", assessment.instructions);
      break;
    }
    case "STUDY_PACK":
      push("Description", obj(snapshot.studyPack).description);
      break;
    case "STUDY_PLAN_TEMPLATE":
      push("Description", obj(snapshot.template).description);
      break;
  }
  return out;
}

/** Renders the markdown of a snapshot exactly as students see it (assets resolved in one query). */
export async function renderSnapshotPreview(client: DbClient, entityType: WorkflowEntityType, snapshot: JsonObject): Promise<PreviewSection[]> {
  const sources = snapshotSources(entityType, snapshot);
  const resolveAsset: AssetResolver = await loadAssetResolver(sources.map((s) => s.source), client);
  return sources.map(({ label, source, inline }) => {
    const rendered = inline
      ? renderInline(source, { resolveAsset })
      : renderContent(source, entityType === "LESSON" ? { ...LESSON_RENDER_OPTIONS, resolveAsset } : { ...FLASHCARD_PREVIEW_OPTIONS, resolveAsset });
    return { label, html: rendered.html, inline, warnings: rendered.warnings };
  });
}

// =====================================================================================================================
// Review detail
// =====================================================================================================================

export interface ReviewPerson {
  name: string | null;
  at: Date | null;
}

export interface ReviewDetail {
  entityType: WorkflowEntityType;
  id: string;
  title: string;
  status: ContentStatus;
  revision: number;
  draftOfId: string | null;
  /** The live row's pending draft copy, when this is a published live row being edited. */
  pendingDraft: { id: string; status: ContentStatus } | null;
  aiGenerated: boolean;
  isOwnWork: boolean;
  fourEyes: boolean;
  reviewNotes: string | null;
  createdBy: ReviewPerson;
  reviewedBy: ReviewPerson;
  approvedBy: ReviewPerson;
  publishedAt: Date | null;
  /** The published revision this version is compared with (null for content never published). */
  baselineRevision: number | null;
  diff: DiffEntry[] | null;
  preview: PreviewSection[];
  /** Problems that block review / approval (empty when ready). */
  issues: FieldErrors;
  openFlags: number;
  editorHref: string;
}

interface DetailRow {
  title: string;
  reviewNotes: string | null;
  reviewedAt: Date | null;
  publishedAt: Date | null;
  createdAt: Date;
  approvedAt: Date | null;
  createdBy: Parameters<typeof staffName>[0];
  reviewedBy: Parameters<typeof staffName>[0];
  approvedBy: Parameters<typeof staffName>[0];
  pendingDraft: { id: string; status: ContentStatus } | null;
}

const detailSelect = {
  reviewNotes: true,
  reviewedAt: true,
  publishedAt: true,
  createdAt: true,
  approvedAt: true,
  createdBy: { select: PERSON_SELECT },
  reviewedBy: { select: PERSON_SELECT },
  approvedBy: { select: PERSON_SELECT },
  pendingDraft: { select: { id: true, status: true } },
} as const;

async function detailRow(client: DbClient, type: WorkflowEntityType, id: string): Promise<DetailRow | null> {
  const where = { id };
  switch (type) {
    case "LESSON":
      return client.lesson.findUnique({ where, select: { ...detailSelect, title: true } });
    case "QUESTION": {
      const row = await client.question.findUnique({ where, select: { ...detailSelect, stem: true } });
      return row && { ...row, title: excerpt(row.stem) };
    }
    case "FLASHCARD": {
      const row = await client.flashcard.findUnique({ where, select: { ...detailSelect, front: true } });
      return row && { ...row, title: excerpt(row.front) };
    }
    case "ASSESSMENT":
      return client.assessment.findUnique({ where, select: { ...detailSelect, title: true } });
    case "STUDY_PACK":
      return client.studyPack.findUnique({ where, select: { ...detailSelect, title: true } });
    case "STUDY_PLAN_TEMPLATE":
      return client.studyPlanTemplate.findUnique({ where, select: { ...detailSelect, title: true } });
  }
}

/** The snapshot of `revision` (or the latest one below `before`) of a live row; null when there is none. */
async function revisionSnapshot(client: DbClient, type: WorkflowEntityType, liveId: string, options: { below?: number } = {}) {
  return client.contentRevision.findFirst({
    where: { entityType: type, entityId: liveId, ...(options.below !== undefined ? { revision: { lt: options.below } } : {}) },
    orderBy: { revision: "desc" },
    select: { revision: true, snapshot: true },
  });
}

/**
 * Everything a reviewer needs on one page: the item's workflow state and people, a readable field-level diff against
 * the last PUBLISHED revision (draft copies compare with their live row's latest snapshot; re-opened items with their
 * last snapshot), the rendered preview, blocking issues and open quality flags. Requires `content.draft` to view;
 * the transitions re-check their own permissions.
 */
export async function getReviewDetail(actor: CmsActor, entityType: WorkflowEntityType, id: string): Promise<ReviewDetail> {
  assertCanDraft(actor);
  const ref = parseInput(z.object({ entityType: z.enum(WORKFLOW_ENTITY_TYPES), id: z.uuid() }), { entityType, id });
  const row = await findWorkflowRow(db, ref.entityType, ref.id);
  if (!row || !row.isPlatform || row.isPart) throw AppError.notFound("Content not found.");
  const [detail, fourEyes] = await Promise.all([detailRow(db, ref.entityType, ref.id), isFourEyesEnforced()]);
  if (!detail) throw AppError.notFound("Content not found.");

  const { current, issues } = await db.$transaction(async (tx: Tx) => {
    const aggregate = await loadContentAggregate(tx, ref.entityType, ref.id);
    if (!aggregate) throw AppError.notFound("Content not found.");
    const reviewable = row.status === "DRAFT" || row.status === "IN_REVIEW" || row.status === "APPROVED";
    return {
      current: buildSnapshot(ref.entityType, aggregate).snapshot as JsonObject,
      issues: reviewable ? await contentSubmitIssues(tx, ref.entityType, ref.id) : {},
    };
  });

  const liveId = row.draftOfId ?? row.id;
  const live = row.draftOfId === null && (row.status === "PUBLISHED" || row.status === "ARCHIVED");
  const baseline = await revisionSnapshot(db, ref.entityType, liveId, live ? { below: row.revision } : {});
  const baselineSnapshot = baseline ? (baseline.snapshot as JsonObject) : null;
  const [labels, preview, openFlags] = await Promise.all([
    loadSnapshotLabels(db, [current, baselineSnapshot]),
    renderSnapshotPreview(db, ref.entityType, current),
    db.contentFlag.count({ where: { entityType: ref.entityType, entityId: liveId, status: { in: ["OPEN", "IN_PROGRESS"] } } }),
  ]);

  return {
    entityType: ref.entityType,
    id: ref.id,
    title: detail.title,
    status: row.status,
    revision: row.revision,
    draftOfId: row.draftOfId,
    pendingDraft: detail.pendingDraft,
    aiGenerated: row.aiGenerated,
    isOwnWork: row.createdById !== null && row.createdById === actor.userId,
    fourEyes,
    reviewNotes: detail.reviewNotes,
    createdBy: { name: staffName(detail.createdBy), at: detail.createdAt },
    reviewedBy: { name: staffName(detail.reviewedBy), at: detail.reviewedAt },
    approvedBy: { name: staffName(detail.approvedBy), at: detail.approvedAt },
    publishedAt: detail.publishedAt,
    baselineRevision: baseline?.revision ?? null,
    diff: baselineSnapshot ? diffSnapshots(ref.entityType, baselineSnapshot, current, labels) : null,
    preview,
    issues,
    openFlags,
    editorHref: editorHref(ref.entityType, ref.id),
  };
}

// =====================================================================================================================
// Revision history (read-only snapshots, §26)
// =====================================================================================================================

export interface RevisionListItem {
  revision: number;
  createdAt: Date;
  author: string | null;
  approvedBy: string | null;
  changeNote: string | null;
  aiGenerated: boolean;
  contentHash: string;
}

export interface RevisionHistory {
  entityType: WorkflowEntityType;
  /** The live row (students' id). */
  liveId: string;
  title: string;
  status: ContentStatus;
  currentRevision: number;
  revisions: RevisionListItem[];
  /** True when the item has more revisions than were listed. */
  truncated: boolean;
}

const MAX_LISTED_REVISIONS = 100;

function revisionTarget(row: { id: string; draftOfId: string | null }): string {
  return row.draftOfId ?? row.id;
}

/** Published revisions of an item, newest first (a draft copy shows its live row's history). */
export async function listRevisions(actor: CmsActor, entityType: WorkflowEntityType, id: string): Promise<RevisionHistory> {
  assertCanDraft(actor);
  const ref = parseInput(z.object({ entityType: z.enum(WORKFLOW_ENTITY_TYPES), id: z.uuid() }), { entityType, id });
  const row = await findWorkflowRow(db, ref.entityType, ref.id);
  if (!row || !row.isPlatform || row.isPart) throw AppError.notFound("Content not found.");
  const liveId = revisionTarget(row);
  const [live, detail, rows] = await Promise.all([
    findWorkflowRow(db, ref.entityType, liveId),
    detailRow(db, ref.entityType, liveId),
    db.contentRevision.findMany({
      where: { entityType: ref.entityType, entityId: liveId },
      orderBy: { revision: "desc" },
      take: MAX_LISTED_REVISIONS + 1,
      select: {
        revision: true,
        createdAt: true,
        changeNote: true,
        aiGenerated: true,
        contentHash: true,
        author: { select: PERSON_SELECT },
        approvedBy: { select: PERSON_SELECT },
      },
    }),
  ]);
  if (!live || !detail) throw AppError.notFound("Content not found.");
  return {
    entityType: ref.entityType,
    liveId,
    title: detail.title,
    status: live.status,
    currentRevision: live.revision,
    revisions: rows.slice(0, MAX_LISTED_REVISIONS).map((r) => ({
      revision: r.revision,
      createdAt: r.createdAt,
      author: staffName(r.author),
      approvedBy: staffName(r.approvedBy),
      changeNote: r.changeNote,
      aiGenerated: r.aiGenerated,
      contentHash: r.contentHash,
    })),
    truncated: rows.length > MAX_LISTED_REVISIONS,
  };
}

export interface RevisionView extends RevisionListItem {
  entityType: WorkflowEntityType;
  liveId: string;
  title: string;
  snapshot: JsonObject;
  preview: PreviewSection[];
  previousRevision: number | null;
  /** Changes since the previous revision (null for revision 1). */
  diff: DiffEntry[] | null;
}

/** One immutable revision: the snapshot rendered as students saw it, and what changed since the previous revision. */
export async function getRevision(actor: CmsActor, entityType: WorkflowEntityType, id: string, revision: number): Promise<RevisionView> {
  assertCanDraft(actor);
  const ref = parseInput(z.object({ entityType: z.enum(WORKFLOW_ENTITY_TYPES), id: z.uuid(), revision: z.coerce.number().int().min(1).max(1_000_000) }), {
    entityType,
    id,
    revision,
  });
  const row = await findWorkflowRow(db, ref.entityType, ref.id);
  if (!row || !row.isPlatform || row.isPart) throw AppError.notFound("Content not found.");
  const liveId = revisionTarget(row);
  const [found, previous, detail] = await Promise.all([
    db.contentRevision.findUnique({
      where: { entityType_entityId_revision: { entityType: ref.entityType, entityId: liveId, revision: ref.revision } },
      select: {
        revision: true,
        createdAt: true,
        changeNote: true,
        aiGenerated: true,
        contentHash: true,
        snapshot: true,
        author: { select: PERSON_SELECT },
        approvedBy: { select: PERSON_SELECT },
      },
    }),
    revisionSnapshot(db, ref.entityType, liveId, { below: ref.revision }),
    detailRow(db, ref.entityType, liveId),
  ]);
  if (!found || !detail) throw AppError.notFound("Revision not found.");
  const snapshot = found.snapshot as JsonObject;
  const previousSnapshot = previous ? (previous.snapshot as JsonObject) : null;
  const [labels, preview] = await Promise.all([loadSnapshotLabels(db, [snapshot, previousSnapshot]), renderSnapshotPreview(db, ref.entityType, snapshot)]);
  return {
    entityType: ref.entityType,
    liveId,
    title: detail.title,
    revision: found.revision,
    createdAt: found.createdAt,
    author: staffName(found.author),
    approvedBy: staffName(found.approvedBy),
    changeNote: found.changeNote,
    aiGenerated: found.aiGenerated,
    contentHash: found.contentHash,
    snapshot,
    preview,
    previousRevision: previous?.revision ?? null,
    diff: previousSnapshot ? diffSnapshots(ref.entityType, previousSnapshot, snapshot, labels) : null,
  };
}

/** Whether the viewer may act as a reviewer (for showing the review actions; each action re-checks). */
export function reviewCapabilities(actor: CmsActor): { canReview: boolean; canPublish: boolean; canArchive: boolean; canDraft: boolean } {
  const can = (check: (a: CmsActor) => void) => {
    try {
      check(actor);
      return true;
    } catch {
      return false;
    }
  };
  return {
    canDraft: can(assertCanDraft),
    canReview: can(assertCanReview),
    canPublish: can(assertCanPublish),
    canArchive: can(assertCanArchive),
  };
}
