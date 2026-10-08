import "server-only";
import type { ContentEntityType, CopyrightStatus, MediaPurpose, MediaVisibility, Prisma } from "@/generated/prisma/client";
import { toExcerpt } from "@/server/content/render";
import { mediaSrc } from "@/server/content/service";
import { db } from "@/server/db";
import { audit } from "@/server/lib/audit";
import { AppError } from "@/server/lib/errors";
import type { StorageDriver } from "@/server/lib/storage";
import { createMediaAsset, type UploadFile } from "@/server/lib/uploads";
import { infraActor, type CmsActor } from "@/server/cms/users/access";
import {
  assertCanDraft,
  auditContent,
  CONTENT_CMS_AUDIT,
  CONTENT_CMS_OPERATIONS,
  inTransaction,
  parseInput,
  PERSON_SELECT,
  staffName,
  type ContentServiceContext,
} from "../review/context";
import { decodeKeyset, keysetOrder, keysetPage, keysetWhere } from "../review/cursor";
import { editorHref, type ReviewableType } from "../review/labels";
import { assetSnippet, LIBRARY_PURPOSES, mediaFilterSchema, mediaIdSchema, updateMediaSchema, uploadMediaSchema } from "./schemas";

/**
 * Media library for content images and diagrams (§8 images and diagrams, §27 licensing, §43 alt text; ARCHITECTURE
 * §3.11). Uploads go through `createMediaAsset` (magic-byte sniffing, size caps, EXIF stripping, re-encoding, per-user
 * rate limit); this service adds the editorial metadata rules, the usage list (`ContentMediaUsage`) and audit entries.
 * Files are never hard-deleted while referenced: an unused file is soft-deleted (status DELETED).
 */

export interface MediaListItem {
  id: string;
  src: string;
  mimeType: string;
  byteSize: number;
  width: number | null;
  height: number | null;
  altText: string | null;
  caption: string | null;
  originalFilename: string | null;
  purpose: MediaPurpose;
  visibility: MediaVisibility;
  copyrightStatus: CopyrightStatus;
  createdAt: Date;
  uploadedBy: string | null;
  usageCount: number;
  snippet: string;
}

const LIST_SELECT = {
  id: true,
  storageKey: true,
  mimeType: true,
  byteSize: true,
  width: true,
  height: true,
  altText: true,
  caption: true,
  originalFilename: true,
  purpose: true,
  visibility: true,
  copyrightStatus: true,
  createdAt: true,
  uploadedBy: { select: PERSON_SELECT },
  _count: { select: { usages: true } },
} as const satisfies Prisma.MediaAssetSelect;

type ListRow = Prisma.MediaAssetGetPayload<{ select: typeof LIST_SELECT }>;

function toListItem(row: ListRow): MediaListItem {
  const { storageKey, uploadedBy, _count, ...rest } = row;
  return { ...rest, src: mediaSrc(storageKey), uploadedBy: staffName(uploadedBy), usageCount: _count.usages, snippet: assetSnippet(row.id, row.altText, row.caption) };
}

const LIBRARY_WHERE = { purpose: { in: [...LIBRARY_PURPOSES] }, status: "READY", deletedAt: null } as const satisfies Prisma.MediaAssetWhereInput;

/** Content images and diagrams, newest first, searchable by description, caption and file name. */
export async function listMedia(actor: CmsActor, raw: unknown = {}): Promise<{ items: MediaListItem[]; nextCursor: string | null }> {
  assertCanDraft(actor);
  const filter = parseInput(mediaFilterSchema, raw);
  const cursor = decodeKeyset(filter.cursor);
  const and: Prisma.MediaAssetWhereInput[] = [LIBRARY_WHERE];
  if (filter.purpose) and.push({ purpose: filter.purpose });
  if (filter.q) {
    and.push({
      OR: [
        { altText: { contains: filter.q, mode: "insensitive" } },
        { caption: { contains: filter.q, mode: "insensitive" } },
        { originalFilename: { contains: filter.q, mode: "insensitive" } },
      ],
    });
  }
  if (filter.usage === "used") and.push({ usages: { some: {} } });
  if (filter.usage === "unused") and.push({ usages: { none: {} } });
  const page = keysetWhere("createdAt", cursor, "desc") as Prisma.MediaAssetWhereInput;
  if (Object.keys(page).length > 0) and.push(page);
  const rows = await db.mediaAsset.findMany({
    where: { AND: and },
    orderBy: keysetOrder("createdAt", "desc") as Prisma.MediaAssetOrderByWithRelationInput[],
    take: filter.limit + 1,
    select: LIST_SELECT,
  });
  const { items, nextCursor } = keysetPage(rows, filter.limit, (row) => row.createdAt);
  return { items: items.map(toListItem), nextCursor };
}

/** A compact search for the editor's "Insert image" dialog (12 results). */
export async function searchMediaForEditor(actor: CmsActor, query: unknown): Promise<MediaListItem[]> {
  const { items } = await listMedia(actor, { q: typeof query === "string" ? query : undefined, limit: 12 });
  return items;
}

export interface MediaUsage {
  entityType: ContentEntityType;
  entityId: string;
  field: string;
  title: string;
  status: string | null;
  /** The usage belongs to a draft copy of published content. */
  isDraftCopy: boolean;
  href: string | null;
}

export interface MediaDetail extends MediaListItem {
  longDescription: string | null;
  sourceId: string | null;
  sourceName: string | null;
  licenceCode: string | null;
  attribution: string | null;
  author: string | null;
  sourceUrl: string | null;
  checksumSha256: string;
  usages: MediaUsage[];
  /** Other references (MCQ option images, study-pack covers, board logos, testimonials). */
  otherReferences: number;
  /** True when the file can be deleted (nothing references it). */
  deletable: boolean;
}

const MAX_LISTED_USAGES = 200;

function shortText(source: string | null | undefined): string {
  if (!source) return "(empty)";
  try {
    return toExcerpt(source, 100) || "(empty)";
  } catch {
    return source.slice(0, 100);
  }
}

/** Titles, statuses and admin links of the content rows that use an asset (one query per content type). */
async function describeUsages(rows: readonly { entityType: ContentEntityType; entityId: string; field: string }[]): Promise<MediaUsage[]> {
  const idsOf = (type: ContentEntityType) => [...new Set(rows.filter((r) => r.entityType === type).map((r) => r.entityId))];
  const select = { id: true, status: true, draftOfId: true } as const;
  const [lessons, questions, flashcards, assessments, packs] = await Promise.all([
    db.lesson.findMany({ where: { id: { in: idsOf("LESSON") } }, select: { ...select, title: true } }),
    db.question.findMany({ where: { id: { in: idsOf("QUESTION") } }, select: { ...select, stem: true, parentId: true } }),
    db.flashcard.findMany({ where: { id: { in: idsOf("FLASHCARD") } }, select: { ...select, front: true } }),
    db.assessment.findMany({ where: { id: { in: idsOf("ASSESSMENT") } }, select: { ...select, title: true } }),
    db.studyPack.findMany({ where: { id: { in: idsOf("STUDY_PACK") } }, select: { ...select, title: true } }),
  ]);
  const found = new Map<string, { title: string; status: string; draftOfId: string | null }>();
  for (const l of lessons) found.set(`LESSON:${l.id}`, { title: l.title, status: l.status, draftOfId: l.draftOfId });
  for (const q of questions) found.set(`QUESTION:${q.id}`, { title: shortText(q.stem), status: q.status, draftOfId: q.draftOfId });
  for (const f of flashcards) found.set(`FLASHCARD:${f.id}`, { title: shortText(f.front), status: f.status, draftOfId: f.draftOfId });
  for (const a of assessments) found.set(`ASSESSMENT:${a.id}`, { title: a.title, status: a.status, draftOfId: a.draftOfId });
  for (const p of packs) found.set(`STUDY_PACK:${p.id}`, { title: p.title, status: p.status, draftOfId: p.draftOfId });
  const linkable: readonly string[] = ["LESSON", "QUESTION", "FLASHCARD", "ASSESSMENT", "STUDY_PACK"];
  return rows.map((row) => {
    const item = found.get(`${row.entityType}:${row.entityId}`);
    return {
      entityType: row.entityType,
      entityId: row.entityId,
      field: row.field,
      title: item?.title ?? "Item no longer exists",
      status: item?.status ?? null,
      isDraftCopy: item?.draftOfId !== null && item?.draftOfId !== undefined,
      href: item && linkable.includes(row.entityType) ? editorHref(row.entityType as ReviewableType, row.entityId) : null,
    };
  });
}

/** One file with its metadata, licensing and everywhere it is used. */
export async function getMediaDetail(actor: CmsActor, id: string): Promise<MediaDetail> {
  assertCanDraft(actor);
  if (!mediaIdSchema.safeParse({ id }).success) throw AppError.notFound("File not found.");
  const row = await db.mediaAsset.findFirst({
    where: { id, ...LIBRARY_WHERE },
    select: {
      ...LIST_SELECT,
      longDescription: true,
      sourceId: true,
      licenceCode: true,
      attribution: true,
      author: true,
      sourceUrl: true,
      checksumSha256: true,
      source: { select: { name: true } },
      _count: { select: { usages: true, questionOptions: true, studyPackCovers: true, examBoardLogos: true, testimonials: true } },
    },
  });
  if (!row) throw AppError.notFound("File not found.");
  const usageRows = await db.contentMediaUsage.findMany({
    where: { mediaAssetId: id },
    orderBy: [{ createdAt: "desc" }],
    take: MAX_LISTED_USAGES,
    select: { entityType: true, entityId: true, field: true },
  });
  const { source, _count, longDescription, sourceId, licenceCode, attribution, author, sourceUrl, checksumSha256, ...listRow } = row;
  const otherReferences = _count.questionOptions + _count.studyPackCovers + _count.examBoardLogos + _count.testimonials;
  return {
    ...toListItem({ ...listRow, _count: { usages: _count.usages } }),
    longDescription,
    sourceId,
    sourceName: source?.name ?? null,
    licenceCode,
    attribution,
    author,
    sourceUrl,
    checksumSha256,
    usages: await describeUsages(usageRows),
    otherReferences,
    deletable: _count.usages === 0 && otherReferences === 0,
  };
}

/**
 * Uploads a content image or diagram (`content.draft`). Alt text is required (§43); provenance follows §27 (a PUBLIC
 * file must have cleared copyright). `createMediaAsset` sniffs, size-checks, strips metadata, re-encodes and rate
 * limits. Reports an earlier upload with the same bytes so editors can reuse it instead of duplicating it.
 */
export async function uploadMedia(
  actor: CmsActor,
  file: UploadFile,
  raw: unknown,
  context: ContentServiceContext = {},
  deps: { storage?: StorageDriver } = {},
): Promise<{ id: string; duplicateOf: string | null; snippet: string }> {
  assertCanDraft(actor);
  const input = parseInput(uploadMediaSchema, raw);
  const asset = await createMediaAsset(infraActor(actor), file, {
    purpose: input.purpose,
    altText: input.altText,
    caption: input.caption,
    longDescription: input.longDescription,
    visibility: input.visibility,
    copyrightStatus: input.copyrightStatus,
    sourceId: input.sourceId,
    licenceCode: input.licenceCode,
    attribution: input.attribution,
    author: input.author,
    sourceUrl: input.sourceUrl,
  }, deps);
  const duplicate = await db.mediaAsset.findFirst({
    where: { checksumSha256: asset.checksumSha256, id: { not: asset.id }, ...LIBRARY_WHERE },
    orderBy: { createdAt: "asc" },
    select: { id: true },
  });
  await audit({
    actorUserId: actor.userId,
    actorRoles: actor.roles,
    action: CONTENT_CMS_AUDIT.MEDIA_UPLOAD,
    entityType: "MediaAsset",
    entityId: asset.id,
    metadata: {
      operation: CONTENT_CMS_OPERATIONS.mediaUpload,
      purpose: asset.purpose,
      visibility: asset.visibility,
      copyrightStatus: asset.copyrightStatus,
      mimeType: asset.mimeType,
      byteSize: asset.byteSize,
      duplicateOf: duplicate?.id ?? null,
    },
    request: context.request ?? null,
  });
  return { id: asset.id, duplicateOf: duplicate?.id ?? null, snippet: assetSnippet(asset.id, asset.altText, asset.caption) };
}

const EDITABLE_FIELDS = ["altText", "caption", "longDescription", "visibility", "copyrightStatus", "sourceId", "licenceCode", "attribution", "author", "sourceUrl"] as const;

/** Edits a file's description, caption, visibility and licensing (`content.draft`); audited with a field diff. */
export async function updateMedia(actor: CmsActor, raw: unknown, context: ContentServiceContext = {}): Promise<{ id: string; changed: string[] }> {
  assertCanDraft(actor);
  const input = parseInput(updateMediaSchema, raw);
  return inTransaction(context, async (tx) => {
    const before = await tx.mediaAsset.findFirst({
      where: { id: input.id, ...LIBRARY_WHERE },
      select: { id: true, altText: true, caption: true, longDescription: true, visibility: true, copyrightStatus: true, sourceId: true, licenceCode: true, attribution: true, author: true, sourceUrl: true },
    });
    if (!before) throw AppError.notFound("File not found.");
    const changed = EDITABLE_FIELDS.filter((field) => (before[field] ?? null) !== (input[field] ?? null));
    if (changed.length === 0) return { id: input.id, changed: [] };
    const data = Object.fromEntries(changed.map((field) => [field, input[field] ?? null])) as Prisma.MediaAssetUncheckedUpdateInput;
    await tx.mediaAsset.update({ where: { id: input.id }, data });
    await auditContent(tx, actor, context, {
      action: CONTENT_CMS_AUDIT.MEDIA_UPDATE,
      operation: CONTENT_CMS_OPERATIONS.mediaUpdate,
      entityType: "MediaAsset",
      entityId: input.id,
      before: Object.fromEntries(changed.map((field) => [field, before[field]])),
      after: Object.fromEntries(changed.map((field) => [field, input[field] ?? null])),
    });
    return { id: input.id, changed };
  });
}

/**
 * Soft-deletes an unused file (`content.draft`): status DELETED + deletedAt, so it disappears from the library and is
 * never rendered again. Refused (CONFLICT) while any content, option, cover, logo or testimonial references it.
 */
export async function deleteMedia(actor: CmsActor, raw: unknown, context: ContentServiceContext = {}): Promise<{ id: string }> {
  assertCanDraft(actor);
  const { id } = parseInput(mediaIdSchema, raw);
  return inTransaction(context, async (tx) => {
    const rows = await tx.$queryRaw<{ id: string }[]>`SELECT "id" FROM "MediaAsset" WHERE "id" = ${id}::uuid FOR UPDATE`;
    if (rows.length === 0) throw AppError.notFound("File not found.");
    const asset = await tx.mediaAsset.findFirst({
      where: { id, ...LIBRARY_WHERE },
      select: { id: true, _count: { select: { usages: true, questionOptions: true, studyPackCovers: true, examBoardLogos: true, testimonials: true } } },
    });
    if (!asset) throw AppError.notFound("File not found.");
    const references = Object.values(asset._count).reduce((sum, n) => sum + n, 0);
    if (references > 0) throw AppError.conflict("This file is still used by content. Remove it from that content first.");
    await tx.mediaAsset.update({ where: { id }, data: { status: "DELETED", deletedAt: new Date() } });
    await auditContent(tx, actor, context, {
      action: CONTENT_CMS_AUDIT.MEDIA_DELETE,
      operation: CONTENT_CMS_OPERATIONS.mediaDelete,
      entityType: "MediaAsset",
      entityId: id,
    });
    return { id };
  });
}
