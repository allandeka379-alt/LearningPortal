import "server-only";
import type { ContentAccessTier, ContentStatus, CopyrightStatus, FlashcardType, Prisma } from "@/generated/prisma/client";
import type { ContentWarning, SanitizedHtml } from "@/lib/content/types";
import { PIPELINE_VERSION, renderContent, toExcerpt, type AssetResolver } from "@/server/content/render";
import { loadAssetResolver, renderFlashcardHtml, toRenderedJson } from "@/server/content/service";
import { db } from "@/server/db";
import type { Tx } from "@/server/lib/db-context";
import { AppError, type FieldErrors } from "@/server/lib/errors";
import type { CmsActor } from "@/server/cms/users/access";
import { assetReferences, syncMediaUsage } from "../media/usage";
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
import { REVIEW_BLOCKING_WARNINGS } from "../review/provenance";
import { describeTopics, type TaggedTopic } from "../review/taxonomy";
import { normaliseTopicTags } from "../lessons/core";
import { parseFlashcardPaste, type PasteProblem } from "./paste";
import { bulkFlashcardSchema, createFlashcardSchema, flashcardFilterSchema, saveFlashcardSchema } from "./schemas";

/**
 * Platform flashcard authoring (§18, §25): single cards with a markdown front / back / notes and live preview, card
 * type, topic tags (one primary, which decides the deck), licensing, and bulk creation from a pasted 2-column block.
 * Every card is created as a DRAFT and follows the editorial workflow (../review/workflow); personal (student) cards
 * are never touched here. Each save writes the render cache (`renderedHtml`) and `ContentMediaUsage`.
 */

function excerpt(source: string, max = 120): string {
  try {
    return toExcerpt(source, max) || "(empty)";
  } catch {
    return source.slice(0, max);
  }
}

// =====================================================================================================================
// List
// =====================================================================================================================

export interface FlashcardListItem {
  id: string;
  front: string;
  back: string;
  cardType: FlashcardType;
  status: ContentStatus;
  revision: number;
  aiGenerated: boolean;
  accessTier: ContentAccessTier;
  subject: string;
  primaryTopic: string | null;
  author: string | null;
  updatedAt: Date;
  pendingDraft: { id: string; status: ContentStatus } | null;
  openFlags: number;
}

/** Live platform cards (pending edits shown on their live row), newest change first, with the editorial filters. */
export async function listFlashcards(actor: CmsActor, raw: unknown = {}): Promise<{ items: FlashcardListItem[]; nextCursor: string | null }> {
  assertCanDraft(actor);
  const filter = parseInput(flashcardFilterSchema, raw);
  const cursor = decodeKeyset(filter.cursor);
  const and: Prisma.FlashcardWhereInput[] = [{ draftOfId: null, ownerUserId: null }];
  if (filter.q) and.push({ OR: [{ front: { contains: filter.q, mode: "insensitive" } }, { back: { contains: filter.q, mode: "insensitive" } }] });
  if (filter.subjectId) and.push({ subjectId: filter.subjectId });
  if (filter.topicId) and.push({ topics: { some: { topicId: filter.topicId } } });
  else if (filter.syllabusId) and.push({ topics: { some: { topic: { syllabusId: filter.syllabusId } } } });
  if (filter.status) and.push({ OR: [{ status: filter.status }, { pendingDraft: { is: { status: filter.status } } }] });
  if (filter.cardType) and.push({ cardType: filter.cardType });
  if (filter.ai) and.push({ aiGenerated: filter.ai === "yes" });
  if (filter.authorId) and.push({ OR: [{ createdById: filter.authorId }, { pendingDraft: { is: { createdById: filter.authorId } } }] });
  const page = keysetWhere("updatedAt", cursor, "desc") as Prisma.FlashcardWhereInput;
  if (Object.keys(page).length > 0) and.push(page);
  const rows = await db.flashcard.findMany({
    where: { AND: and },
    orderBy: keysetOrder("updatedAt", "desc") as Prisma.FlashcardOrderByWithRelationInput[],
    take: filter.limit + 1,
    select: {
      id: true,
      front: true,
      back: true,
      cardType: true,
      status: true,
      revision: true,
      aiGenerated: true,
      accessTier: true,
      updatedAt: true,
      subject: { select: { name: true } },
      createdBy: { select: PERSON_SELECT },
      pendingDraft: { select: { id: true, status: true } },
      topics: { where: { isPrimary: true }, take: 1, select: { topic: { select: { code: true, name: true } } } },
    },
  });
  const { items, nextCursor } = keysetPage(rows, filter.limit, (row) => row.updatedAt);
  const flags = items.length
    ? await db.contentFlag.groupBy({
        by: ["entityId"],
        where: { entityType: "FLASHCARD", entityId: { in: items.map((row) => row.id) }, status: { in: ["OPEN", "IN_PROGRESS"] } },
        _count: { _all: true },
      })
    : [];
  const flagCounts = new Map(flags.map((row) => [row.entityId, row._count._all]));
  return {
    items: items.map((row) => {
      const primary = row.topics[0]?.topic;
      return {
        id: row.id,
        front: excerpt(row.front, 140),
        back: excerpt(row.back, 140),
        cardType: row.cardType,
        status: row.status,
        revision: row.revision,
        aiGenerated: row.aiGenerated,
        accessTier: row.accessTier,
        subject: row.subject.name,
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

export interface FlashcardEditorData {
  id: string;
  draftOfId: string | null;
  pendingDraft: { id: string; status: ContentStatus } | null;
  status: ContentStatus;
  revision: number;
  publishedRevision: number | null;
  editable: boolean;
  aiGenerated: boolean;
  updatedAt: Date;
  fields: {
    subjectId: string;
    cardType: FlashcardType;
    front: string;
    back: string;
    notes: string | null;
    accessTier: ContentAccessTier;
    languageCode: string;
    sourceId: string | null;
    author: string | null;
    copyrightStatus: CopyrightStatus;
    licenceCode: string | null;
    attribution: string | null;
    sourceUrl: string | null;
    publicationDate: string | null;
  };
  topics: (TaggedTopic & { isPrimary: boolean })[];
  people: {
    createdBy: string | null;
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

export async function getFlashcardEditor(actor: CmsActor, id: string): Promise<FlashcardEditorData> {
  assertCanDraft(actor);
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) throw AppError.notFound("Flashcard not found.");
  const card = await db.flashcard.findUnique({
    where: { id },
    include: {
      topics: { orderBy: [{ isPrimary: "desc" }, { createdAt: "asc" }], select: { topicId: true, isPrimary: true } },
      createdBy: { select: PERSON_SELECT },
      reviewedBy: { select: PERSON_SELECT },
      approvedBy: { select: PERSON_SELECT },
      pendingDraft: { select: { id: true, status: true } },
    },
  });
  if (!card || card.ownerUserId !== null) throw AppError.notFound("Flashcard not found.");
  const liveId = card.draftOfId ?? card.id;
  const [topics, publishedRevision, openFlags, fourEyes] = await Promise.all([
    describeTopics(card.topics.map((t) => t.topicId)),
    db.contentRevision.findFirst({ where: { entityType: "FLASHCARD", entityId: liveId }, orderBy: { revision: "desc" }, select: { revision: true } }),
    db.contentFlag.count({ where: { entityType: "FLASHCARD", entityId: liveId, status: { in: ["OPEN", "IN_PROGRESS"] } } }),
    isFourEyesEnforced(),
  ]);
  const primary = new Set(card.topics.filter((t) => t.isPrimary).map((t) => t.topicId));
  return {
    id: card.id,
    draftOfId: card.draftOfId,
    pendingDraft: card.pendingDraft,
    status: card.status,
    revision: card.revision,
    publishedRevision: publishedRevision?.revision ?? null,
    editable: card.status === "DRAFT",
    aiGenerated: card.aiGenerated,
    updatedAt: card.updatedAt,
    fields: {
      subjectId: card.subjectId,
      cardType: card.cardType,
      front: card.front,
      back: card.back,
      notes: card.notes,
      accessTier: card.accessTier,
      languageCode: card.languageCode,
      sourceId: card.sourceId,
      author: card.author,
      copyrightStatus: card.copyrightStatus,
      licenceCode: card.licenceCode,
      attribution: card.attribution,
      sourceUrl: card.sourceUrl,
      publicationDate: card.publicationDate ? card.publicationDate.toISOString().slice(0, 10) : null,
    },
    topics: topics.map((t) => ({ ...t, isPrimary: primary.has(t.id) })),
    people: {
      createdBy: staffName(card.createdBy),
      createdAt: card.createdAt,
      reviewedBy: staffName(card.reviewedBy),
      reviewedAt: card.reviewedAt,
      approvedBy: staffName(card.approvedBy),
      approvedAt: card.approvedAt,
      publishedAt: card.publishedAt,
      archivedAt: card.archivedAt,
    },
    reviewNotes: card.reviewNotes,
    openFlags,
    isOwnWork: card.createdById !== null && card.createdById === actor.userId,
    fourEyes,
  };
}

// =====================================================================================================================
// Create / save
// =====================================================================================================================

async function assertReferences(tx: Tx, subjectId: string, sourceId: string | null, topicIds: readonly string[]): Promise<void> {
  const errors: FieldErrors = {};
  // Sequential: a transaction is one connection.
  const subject = await tx.subject.findUnique({ where: { id: subjectId }, select: { id: true } });
  const source = sourceId ? await tx.contentSource.findUnique({ where: { id: sourceId }, select: { id: true } }) : null;
  const topics = topicIds.length ? await tx.topic.findMany({ where: { id: { in: [...topicIds] } }, select: { id: true } }) : [];
  if (!subject) errors.subjectId = ["Choose an existing subject."];
  if (sourceId && !source) errors.sourceId = ["Choose an existing content source."];
  if (topics.length !== new Set(topicIds).size) errors.topicIds = ["One of the tagged topics no longer exists."];
  if (Object.keys(errors).length > 0) throw AppError.validation(errors);
}

function provenanceData(input: {
  sourceId: string | null;
  author: string | null;
  copyrightStatus: CopyrightStatus;
  licenceCode: string | null;
  attribution: string | null;
  sourceUrl: string | null;
  publicationDate: string | null;
}) {
  return {
    sourceId: input.sourceId,
    author: input.author,
    copyrightStatus: input.copyrightStatus,
    licenceCode: input.licenceCode,
    attribution: input.attribution,
    sourceUrl: input.sourceUrl,
    publicationDate: input.publicationDate ? new Date(`${input.publicationDate}T00:00:00Z`) : null,
  };
}

function renderCard(id: string, card: { front: string; back: string; notes: string | null }, resolveAsset: AssetResolver) {
  return { renderedHtml: toRenderedJson(renderFlashcardHtml({ id, ...card }, resolveAsset)), renderVersion: PIPELINE_VERSION };
}

/** Fresh UUIDv7 ids from Postgres 18 (same generator as the column defaults), so cards can be rendered before insert. */
async function newIds(tx: Tx, count: number): Promise<string[]> {
  if (count === 0) return [];
  const rows = await tx.$queryRaw<{ id: string }[]>`SELECT uuidv7()::text AS "id" FROM generate_series(1, ${count}::int)`;
  return rows.map((row) => row.id);
}

/** Creates one DRAFT platform flashcard (`content.draft`). */
export async function createFlashcard(actor: CmsActor, raw: unknown, context: ContentServiceContext = {}): Promise<{ id: string }> {
  assertCanDraft(actor);
  const input = parseInput(createFlashcardSchema, raw);
  const tags = normaliseTopicTags(input.topicIds, input.primaryTopicId);
  return inTransaction(context, async (tx) => {
    await assertReferences(tx, input.subjectId, input.sourceId, tags.map((t) => t.topicId));
    const [id] = await newIds(tx, 1);
    if (!id) throw new Error("uuidv7() returned no id");
    const resolveAsset = await loadAssetResolver([input.front, input.back, input.notes], tx);
    await tx.flashcard.create({
      data: {
        id,
        subjectId: input.subjectId,
        cardType: input.cardType,
        front: input.front,
        back: input.back,
        notes: input.notes,
        accessTier: input.accessTier,
        languageCode: input.languageCode,
        status: "DRAFT",
        createdById: actor.userId,
        ...provenanceData(input),
        ...renderCard(id, input, resolveAsset),
        ...(tags.length > 0 ? { topics: { createMany: { data: tags } } } : {}),
      },
      select: { id: true },
    });
    await syncMediaUsage(tx, "FLASHCARD", id, { front: input.front, back: input.back, notes: input.notes });
    await auditContent(tx, actor, context, {
      action: CONTENT_CMS_AUDIT.CREATE,
      operation: CONTENT_CMS_OPERATIONS.create,
      entityType: "Flashcard",
      entityId: id,
      after: { cardType: input.cardType, subjectId: input.subjectId, copyrightStatus: input.copyrightStatus },
    });
    return { id };
  });
}

/**
 * Saves a DRAFT flashcard (`content.draft`); published cards are edited through a draft copy. The saver becomes the
 * draft's author (four-eyes: the last author cannot approve). Optimistic concurrency through `expectedUpdatedAt`.
 */
export async function saveFlashcard(actor: CmsActor, raw: unknown, context: ContentServiceContext = {}): Promise<{ id: string; updatedAt: Date; changed: string[] }> {
  assertCanDraft(actor);
  const input = parseInput(saveFlashcardSchema, raw);
  const tags = normaliseTopicTags(input.topicIds, input.primaryTopicId);
  return inTransaction(context, async (tx) => {
    const locked = await tx.$queryRaw<{ id: string }[]>`SELECT "id" FROM "Flashcard" WHERE "id" = ${input.id}::uuid AND "ownerUserId" IS NULL FOR UPDATE`;
    if (locked.length === 0) throw AppError.notFound("Flashcard not found.");
    const before = await tx.flashcard.findUniqueOrThrow({ where: { id: input.id }, include: { topics: { select: { topicId: true, isPrimary: true, sortOrder: true } } } });
    if (before.status !== "DRAFT") {
      throw AppError.conflict(
        before.status === "PUBLISHED"
          ? "Published cards can't be edited in place. Use “Edit published card” to start a new draft."
          : "Only drafts can be edited. Ask a reviewer to send it back to draft first.",
      );
    }
    if (input.expectedUpdatedAt && before.updatedAt.toISOString() !== new Date(input.expectedUpdatedAt).toISOString()) {
      throw AppError.conflict("Someone else saved this card after you opened it. Reload the page to see their changes, then edit again.");
    }
    await assertReferences(tx, input.subjectId, input.sourceId, tags.map((t) => t.topicId));
    const data = {
      subjectId: input.subjectId,
      cardType: input.cardType,
      front: input.front,
      back: input.back,
      notes: input.notes,
      accessTier: input.accessTier,
      languageCode: input.languageCode,
      ...provenanceData(input),
    };
    const beforeComparable: Record<string, unknown> = { ...before, publicationDate: before.publicationDate ? before.publicationDate.toISOString().slice(0, 10) : null };
    const afterComparable: Record<string, unknown> = { ...data, publicationDate: input.publicationDate };
    const changed: string[] = Object.keys(data).filter((field) => (beforeComparable[field] ?? null) !== (afterComparable[field] ?? null));
    const tagKey = (list: { topicId: string; isPrimary: boolean }[]) => list.map((t) => `${t.topicId}:${t.isPrimary}`).sort().join(",");
    if (tagKey(before.topics) !== tagKey(tags)) changed.push("topics");

    const resolveAsset = await loadAssetResolver([input.front, input.back, input.notes], tx);
    // Four-eyes is about the LAST author (ARCHITECTURE §5.3): whoever changes the draft becomes its author.
    const lastAuthor = changed.length > 0 && before.createdById !== actor.userId ? { createdById: actor.userId } : {};
    const updated = await tx.flashcard.update({
      where: { id: input.id },
      data: { ...data, ...renderCard(input.id, input, resolveAsset), ...lastAuthor },
      select: { updatedAt: true },
    });
    if (changed.includes("topics")) {
      const previousOrder = new Map(before.topics.map((t) => [t.topicId, t.sortOrder]));
      await tx.flashcardTopic.deleteMany({ where: { flashcardId: input.id } });
      if (tags.length > 0) {
        await tx.flashcardTopic.createMany({ data: tags.map((t) => ({ ...t, sortOrder: previousOrder.get(t.topicId) ?? t.sortOrder, flashcardId: input.id })) });
      }
    }
    await syncMediaUsage(tx, "FLASHCARD", input.id, { front: input.front, back: input.back, notes: input.notes });
    if (changed.length > 0) {
      await auditContent(tx, actor, context, {
        action: CONTENT_CMS_AUDIT.UPDATE,
        operation: CONTENT_CMS_OPERATIONS.update,
        entityType: "Flashcard",
        entityId: before.draftOfId ?? input.id,
        metadata: { changed, draftId: before.draftOfId ? input.id : null },
      });
    }
    return { id: input.id, updatedAt: updated.updatedAt, changed };
  });
}

// =====================================================================================================================
// Bulk create from a 2-column paste
// =====================================================================================================================

export interface BulkCardPreview {
  row: number;
  front: SanitizedHtml;
  back: SanitizedHtml;
  notes: SanitizedHtml | null;
  warnings: readonly ContentWarning[];
}

export type BulkFlashcardResult =
  | { intent: "preview"; total: number; problems: PasteProblem[]; cards: BulkCardPreview[] }
  | { intent: "create"; created: number; ids: string[] };

const PREVIEW_LIMIT = 20;

/**
 * Bulk-creates DRAFT cards from a pasted block of Front / Back (/ Notes) columns (`content.draft`). `intent: "preview"`
 * parses and renders without saving (first 20 cards, every problem); `intent: "create"` refuses (VALIDATION, one
 * message per bad row) unless every row parses and renders cleanly, then inserts all cards in ONE transaction with the
 * shared subject, type, primary topic and licensing. One audit entry records the batch.
 */
export async function bulkCreateFlashcards(actor: CmsActor, raw: unknown, context: ContentServiceContext = {}): Promise<BulkFlashcardResult> {
  assertCanDraft(actor);
  const input = parseInput(bulkFlashcardSchema, raw);
  const parsed = parseFlashcardPaste(input.text);
  const resolveAsset = await loadAssetResolver(parsed.cards.flatMap((card) => [card.front, card.back, card.notes]), readClientFor(context));
  const problems: PasteProblem[] = [...parsed.problems];
  const previews: BulkCardPreview[] = parsed.cards.map((card) => {
    const front = renderContent(card.front, { ...FLASHCARD_PREVIEW_OPTIONS, resolveAsset });
    const back = renderContent(card.back, { ...FLASHCARD_PREVIEW_OPTIONS, resolveAsset });
    const notes = card.notes ? renderContent(card.notes, { ...FLASHCARD_PREVIEW_OPTIONS, resolveAsset }) : null;
    const warnings = [...front.warnings, ...back.warnings, ...(notes?.warnings ?? [])];
    for (const warning of warnings) {
      if (REVIEW_BLOCKING_WARNINGS.has(warning.code)) problems.push({ row: card.row, message: warning.message });
    }
    return { row: card.row, front: front.html, back: back.html, notes: notes?.html ?? null, warnings };
  });
  problems.sort((a, b) => a.row - b.row);

  if (input.intent === "preview") return { intent: "preview", total: parsed.cards.length, problems, cards: previews.slice(0, PREVIEW_LIMIT) };
  if (parsed.cards.length === 0) throw AppError.validation({ text: ["No cards found. Paste two columns: front and back."] });
  if (problems.length > 0) {
    throw AppError.validation(
      { text: problems.slice(0, 50).map((p) => `Row ${p.row}: ${p.message}`) },
      `Fix ${problems.length === 1 ? "this problem" : `these ${problems.length} problems`} before creating the cards.`,
    );
  }

  return inTransaction(context, async (tx) => {
    await assertReferences(tx, input.subjectId, input.sourceId, input.primaryTopicId ? [input.primaryTopicId] : []);
    const ids = await newIds(tx, parsed.cards.length);
    const provenance = provenanceData(input);
    await tx.flashcard.createMany({
      data: parsed.cards.map((card, index) => {
        const id = ids[index] as string;
        return {
          id,
          subjectId: input.subjectId,
          cardType: input.cardType,
          front: card.front,
          back: card.back,
          notes: card.notes,
          accessTier: input.accessTier,
          languageCode: input.languageCode,
          status: "DRAFT" as const,
          createdById: actor.userId,
          ...provenance,
          ...renderCard(id, card, resolveAsset),
        };
      }),
    });
    if (input.primaryTopicId) {
      const topicId = input.primaryTopicId;
      await tx.flashcardTopic.createMany({ data: ids.map((flashcardId, index) => ({ flashcardId, topicId, isPrimary: true, sortOrder: index })) });
    }
    // Media usage for the whole batch: one existence query, one insert.
    const refs = parsed.cards.flatMap((card, index) =>
      assetReferences({ front: card.front, back: card.back, notes: card.notes }).map((ref) => ({ ...ref, entityId: ids[index] as string })),
    );
    if (refs.length > 0) {
      const known = new Set(
        (await tx.mediaAsset.findMany({ where: { id: { in: [...new Set(refs.map((r) => r.mediaAssetId))] } }, select: { id: true } })).map((row) => row.id),
      );
      const rows = refs.filter((r) => known.has(r.mediaAssetId)).map((r) => ({ entityType: "FLASHCARD" as const, ...r }));
      if (rows.length > 0) await tx.contentMediaUsage.createMany({ data: rows, skipDuplicates: true });
    }
    await auditContent(tx, actor, context, {
      action: CONTENT_CMS_AUDIT.CREATE,
      operation: CONTENT_CMS_OPERATIONS.bulkCreate,
      entityType: "Flashcard",
      entityId: ids[0] as string,
      metadata: { count: ids.length, subjectId: input.subjectId, cardType: input.cardType, primaryTopicId: input.primaryTopicId, firstIds: ids.slice(0, 20) },
    });
    return { intent: "create" as const, created: ids.length, ids };
  });
}

function readClientFor(context: ContentServiceContext) {
  return context.client ?? db;
}
