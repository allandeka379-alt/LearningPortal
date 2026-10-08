import "server-only";
import { z } from "zod";
import { Prisma, type ContentStatus } from "@/generated/prisma/client";
import { DEFAULT_TIMEZONE } from "@/lib/config";
import { NO_ENTITLEMENTS, type Entitlements } from "@/lib/billing/entitlements";
import type { DraftCopy, PublishResult, WorkflowResult } from "@/server/content/publish";
import { renderContent } from "@/server/content/render";
import { loadAssetResolver } from "@/server/content/service";
import type { DbClient } from "@/server/db";
import type { Tx } from "@/server/lib/db-context";
import { AppError, type FieldErrors } from "@/server/lib/errors";
import { localDateTimeToInstant } from "@/server/cms/announcements/schemas";
import {
  afterUpdatedCursor,
  assertCanDraft,
  assertCanPrice,
  auditCms,
  CMS_CONTENT_AUDIT,
  CMS_CONTENT_OPERATIONS,
  decodeUpdatedCursor,
  inTransaction,
  PAGE_SIZE,
  parseInput,
  PERSON_SELECT,
  personName,
  readClient,
  startOfUtcDay,
  updatedPage,
  uuidSchema,
  type CmsActor,
  type CmsContext,
} from "@/server/cms/questions/context";
import { plainExcerpt } from "@/server/cms/questions/core";
import { clearMediaUsage, syncMediaUsageFromAggregate } from "@/server/cms/media/usage";
import {
  approveItem,
  archiveItem,
  reopenItem,
  discardItemDraftCopy,
  findPlatformRow,
  publishItem,
  requestItemChanges,
  startEditingItem,
  submitItem,
  type WorkflowHooks,
} from "@/server/cms/questions/workflow";
import { parsePackEntitlements, pdfBlockReason, toMinorUnits, unlocksAnything, type PdfBlockReason } from "./core";
import {
  priceCreateSchema,
  priceUpdateSchema,
  scopesSchema,
  studyPackCreateSchema,
  studyPackFilterSchema,
  studyPackUpdateSchema,
  type ScopeInput,
  type ScopeKind,
  type StudyPackMetaInput,
} from "./schemas";

/**
 * Digital study packs (§24): a pack unlocks platform content matched by its scope rules (qualification, subject or
 * syllabus version — always current, never a static file), with the features of its entitlements document (validated
 * like plan entitlements, §31). Prices are PlanPrice rows (one-off, per currency and country) that only `billing.manage`
 * holders change; price-defining columns are frozen by the database, so a change is a new row. PDF export is offered
 * only when every included item's licence permits it (§27). Workflow through the shared publish helper.
 */

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// =====================================================================================================================
// List
// =====================================================================================================================

export interface StudyPackListRow {
  id: string;
  title: string;
  slug: string;
  status: ContentStatus;
  revision: number;
  draftOfId: string | null;
  pendingDraft: { id: string; status: ContentStatus } | null;
  isFeatured: boolean;
  isDemo: boolean;
  scopeCount: number;
  activePriceCount: number;
  allowPdfExport: boolean;
  updatedAt: Date;
  author: string | null;
}

export async function listStudyPacks(actor: CmsActor, raw: unknown, context: CmsContext = {}): Promise<{ items: StudyPackListRow[]; nextCursor: string | null }> {
  assertCanDraft(actor);
  const f = parseInput(studyPackFilterSchema, raw);
  const client = readClient(context);
  const where: Prisma.StudyPackWhereInput[] = [];
  if (f.q) where.push(UUID.test(f.q) ? { OR: [{ id: f.q.toLowerCase() }, { draftOfId: f.q.toLowerCase() }] } : { OR: [{ title: { contains: f.q, mode: "insensitive" } }, { slug: { contains: f.q.toLowerCase() } }] });
  if (f.status) where.push({ status: f.status });
  const rows = await client.studyPack.findMany({
    where: { AND: [...where, afterUpdatedCursor(decodeUpdatedCursor(f.cursor))] },
    orderBy: [{ updatedAt: "desc" }, { id: "desc" }],
    take: PAGE_SIZE + 1,
    select: {
      id: true,
      title: true,
      slug: true,
      status: true,
      revision: true,
      draftOfId: true,
      isFeatured: true,
      isDemo: true,
      allowPdfExport: true,
      updatedAt: true,
      pendingDraft: { select: { id: true, status: true } },
      createdBy: PERSON_SELECT,
      _count: { select: { scopes: true, planPrices: { where: { isActive: true } } } },
    },
  });
  const page = updatedPage(rows, PAGE_SIZE);
  return {
    items: page.items.map((row) => ({
      id: row.id,
      title: row.title,
      slug: row.slug,
      status: row.status,
      revision: row.revision,
      draftOfId: row.draftOfId,
      pendingDraft: row.pendingDraft,
      isFeatured: row.isFeatured,
      isDemo: row.isDemo,
      scopeCount: row._count.scopes,
      activePriceCount: row._count.planPrices,
      allowPdfExport: row.allowPdfExport,
      updatedAt: row.updatedAt,
      author: personName(row.createdBy),
    })),
    nextCursor: page.nextCursor,
  };
}

// =====================================================================================================================
// Scope → included content, PDF-export check
// =====================================================================================================================

interface ScopeSets {
  qualificationIds: string[];
  subjectIds: string[];
  syllabusIds: string[];
}

function scopeSets(scopes: readonly { qualificationId: string | null; subjectId: string | null; syllabusId: string | null }[]): ScopeSets {
  return {
    qualificationIds: [...new Set(scopes.map((s) => s.qualificationId).filter((id): id is string => id !== null))],
    subjectIds: [...new Set(scopes.map((s) => s.subjectId).filter((id): id is string => id !== null))],
    syllabusIds: [...new Set(scopes.map((s) => s.syllabusId).filter((id): id is string => id !== null))],
  };
}

export type IncludedType = "LESSON" | "QUESTION" | "FLASHCARD" | "ASSESSMENT";

export interface PdfExportCheck {
  /** Every included item's licence permits PDF export (and the pack includes something). */
  allowed: boolean;
  /** The pack has no scope rules yet. */
  emptyScope: boolean;
  total: number;
  blocked: number;
  byType: { type: IncludedType; total: number; blocked: number; examples: { id: string; title: string; reason: PdfBlockReason }[] }[];
}

const SOURCE_FACTS = { select: { permitsPdfExport: true, isActive: true, validUntil: true } } as const;

/** Prisma condition of `pdfBlockReason(item) !== null` (kept in step with the pure rule; tested together). */
function blockedWhere(today: Date) {
  return {
    OR: [
      { copyrightStatus: "UNVERIFIED" as const },
      { sourceId: null, copyrightStatus: { in: ["LICENSED" as const, "OPEN_LICENSE" as const] } },
      { source: { is: { OR: [{ permitsPdfExport: false }, { isActive: false }, { validUntil: { lt: today } }] } } },
    ],
  };
}

/**
 * Which PUBLISHED platform content a scope includes and whether all of it may be exported to PDF: lessons, questions,
 * flashcards and assessments of the scoped subjects (directly or through a qualification) or tagged in the scoped
 * syllabus versions. Counts plus a few examples of blocked items per type.
 */
export async function pdfExportCheck(client: DbClient, scopes: readonly { qualificationId: string | null; subjectId: string | null; syllabusId: string | null }[], now: Date = new Date()): Promise<PdfExportCheck> {
  const sets = scopeSets(scopes);
  if (sets.qualificationIds.length + sets.subjectIds.length + sets.syllabusIds.length === 0) {
    return { allowed: false, emptyScope: true, total: 0, blocked: 0, byType: [] };
  }
  const viaQualification = sets.qualificationIds.length
    ? (await client.subject.findMany({ where: { qualificationId: { in: sets.qualificationIds } }, select: { id: true } })).map((s) => s.id)
    : [];
  const subjects = [...new Set([...sets.subjectIds, ...viaQualification])];
  const syllabi = sets.syllabusIds;
  const today = startOfUtcDay(now);
  const blocked = blockedWhere(today);

  const lessonWhere: Prisma.LessonWhereInput = {
    status: "PUBLISHED",
    draftOfId: null,
    OR: [{ subjectId: { in: subjects } }, { qualificationId: { in: sets.qualificationIds } }, { topics: { some: { topic: { syllabusId: { in: syllabi } } } } }],
  };
  const questionWhere: Prisma.QuestionWhereInput = {
    status: "PUBLISHED",
    draftOfId: null,
    parentId: null,
    schoolId: null,
    ownerUserId: null,
    OR: [{ subjectId: { in: subjects } }, { topics: { some: { OR: [{ subjectId: { in: subjects } }, { syllabusId: { in: syllabi } }] } } }],
  };
  const flashcardWhere: Prisma.FlashcardWhereInput = {
    status: "PUBLISHED",
    draftOfId: null,
    ownerUserId: null,
    OR: [{ subjectId: { in: subjects } }, { topics: { some: { topic: { syllabusId: { in: syllabi } } } } }],
  };
  const assessmentWhere: Prisma.AssessmentWhereInput = {
    status: "PUBLISHED",
    draftOfId: null,
    schoolId: null,
    ownerUserId: null,
    OR: [{ subjectId: { in: subjects } }, { syllabusId: { in: syllabi } }],
  };
  const select = { id: true, copyrightStatus: true, source: SOURCE_FACTS } as const;

  const [lessons, questions, flashcards, assessments] = await Promise.all([
    Promise.all([
      client.lesson.count({ where: lessonWhere }),
      client.lesson.count({ where: { AND: [lessonWhere, blocked] } }),
      client.lesson.findMany({ where: { AND: [lessonWhere, blocked] }, select: { ...select, title: true }, take: 5 }),
    ]),
    Promise.all([
      client.question.count({ where: questionWhere }),
      client.question.count({ where: { AND: [questionWhere, blocked] } }),
      client.question.findMany({ where: { AND: [questionWhere, blocked] }, select: { ...select, stem: true }, take: 5 }),
    ]),
    Promise.all([
      client.flashcard.count({ where: flashcardWhere }),
      client.flashcard.count({ where: { AND: [flashcardWhere, blocked] } }),
      client.flashcard.findMany({ where: { AND: [flashcardWhere, blocked] }, select: { ...select, front: true }, take: 5 }),
    ]),
    Promise.all([
      client.assessment.count({ where: assessmentWhere }),
      client.assessment.count({ where: { AND: [assessmentWhere, blocked] } }),
      client.assessment.findMany({ where: { AND: [assessmentWhere, blocked] }, select: { ...select, title: true }, take: 5 }),
    ]),
  ]);

  const example = (row: { id: string; copyrightStatus: string; source: { permitsPdfExport: boolean; isActive: boolean; validUntil: Date | null } | null }, title: string) => ({
    id: row.id,
    title,
    reason: pdfBlockReason(row, today) ?? "copyright_unverified",
  });
  const byType: PdfExportCheck["byType"] = [
    { type: "LESSON", total: lessons[0], blocked: lessons[1], examples: lessons[2].map((r) => example(r, r.title)) },
    { type: "QUESTION", total: questions[0], blocked: questions[1], examples: questions[2].map((r) => example(r, plainExcerpt(r.stem, 90))) },
    { type: "FLASHCARD", total: flashcards[0], blocked: flashcards[1], examples: flashcards[2].map((r) => example(r, plainExcerpt(r.front, 90))) },
    { type: "ASSESSMENT", total: assessments[0], blocked: assessments[1], examples: assessments[2].map((r) => example(r, r.title)) },
  ];
  const total = byType.reduce((sum, t) => sum + t.total, 0);
  const blockedCount = byType.reduce((sum, t) => sum + t.blocked, 0);
  return { allowed: total > 0 && blockedCount === 0, emptyScope: false, total, blocked: blockedCount, byType };
}

// =====================================================================================================================
// Checks
// =====================================================================================================================

export interface StudyPackChecks {
  errors: FieldErrors;
  warnings: FieldErrors;
}

/** What blocks review / approval / publication of a pack, and advisory warnings. */
export async function studyPackChecks(client: DbClient, id: string): Promise<StudyPackChecks> {
  const row = await client.studyPack.findUnique({
    where: { id },
    select: {
      slug: true,
      draftOfId: true,
      description: true,
      entitlements: true,
      allowPdfExport: true,
      coverImage: { select: { status: true, purpose: true, visibility: true, deletedAt: true, altText: true } },
      scopes: { select: { qualificationId: true, subjectId: true, syllabusId: true, syllabus: { select: { status: true } } } },
    },
  });
  if (!row) throw AppError.notFound("Study pack not found.");
  const errors: FieldErrors = {};
  const warnings: FieldErrors = {};
  const add = (bucket: FieldErrors, field: string, message: string) => (bucket[field] ??= []).push(message);

  if (row.scopes.length === 0) add(errors, "scopes", "Add at least one scope rule: a pack without scope unlocks nothing.");
  if (row.scopes.some((s) => s.syllabus?.status === "DRAFT")) add(warnings, "scopes", "A scoped syllabus version is still a draft: students see its content only once it is published.");
  const entitlements = parsePackEntitlements(row.entitlements);
  if (!entitlements.ok) Object.assign(errors, entitlements.errors);
  else if (!unlocksAnything(entitlements.value)) add(errors, "entitlements", "Choose at least one feature or allowance the pack unlocks.");
  if (row.allowPdfExport) {
    const check = await pdfExportCheck(client, row.scopes);
    if (!check.allowed) add(errors, "allowPdfExport", check.emptyScope || check.total === 0 ? "PDF export needs included content." : `PDF export is not permitted for ${check.blocked} included items. Turn PDF export off or fix their licensing.`);
  }
  const cover = row.coverImage;
  if (!cover) add(warnings, "coverImageId", "No cover image: the pack is shown without one.");
  else if (cover.deletedAt !== null || cover.status !== "READY" || cover.visibility !== "PUBLIC") add(errors, "coverImageId", "The cover image must be a public, uploaded image.");
  else if (!cover.altText?.trim()) add(warnings, "coverImageId", "Describe the cover image (alt text) in the media library.");
  const clash = await client.studyPack.findFirst({ where: { slug: row.slug, draftOfId: null, id: { not: row.draftOfId ?? id } }, select: { id: true } });
  if (clash) add(errors, "slug", "Another study pack already uses this web address.");
  if (row.description) {
    const resolveAsset = await loadAssetResolver([row.description], client);
    for (const warning of renderContent(row.description, { baseHeadingLevel: 3, resolveAsset }).warnings) {
      const blocking = ["image-missing-alt", "image-unresolved", "image-external", "math-error", "unknown-directive"].includes(warning.code);
      add(blocking ? errors : warnings, "description", warning.message);
    }
  }
  return { errors, warnings };
}

// =====================================================================================================================
// Editor view
// =====================================================================================================================

export interface StudyPackScopeView {
  kind: ScopeKind;
  targetId: string;
  label: string;
}

export interface StudyPackPriceView {
  id: string;
  currency: string;
  amountMinor: number;
  periodDays: number | null;
  country: string | null;
  label: string | null;
  isActive: boolean;
  validFrom: Date;
  validTo: Date | null;
  sortOrder: number;
  isDemo: boolean;
  /** Payments that used this price (a price is never deleted). */
  paymentCount: number;
}

export interface StudyPackEditorView {
  id: string;
  /** The live pack whose prices apply (the draft copy's live row, or this row). */
  liveId: string;
  status: ContentStatus;
  revision: number;
  version: string;
  editable: boolean;
  aiGenerated: boolean;
  isDemo: boolean;
  draftOf: { id: string; status: ContentStatus; revision: number } | null;
  pendingDraft: { id: string; status: ContentStatus; revision: number; author: string | null } | null;
  meta: StudyPackMetaInput;
  entitlements: Entitlements;
  /** The stored document did not validate (shown as an error; saving rewrites it). */
  entitlementsInvalid: boolean;
  cover: { id: string; src: string | null; alt: string | null } | null;
  scopes: StudyPackScopeView[];
  prices: StudyPackPriceView[];
  pdfCheck: PdfExportCheck;
  checks: StudyPackChecks;
  workflow: {
    author: string | null;
    createdById: string | null;
    createdAt: Date;
    updatedAt: Date;
    reviewedBy: string | null;
    reviewedAt: Date | null;
    reviewNotes: string | null;
    approvedBy: string | null;
    approvedAt: Date | null;
    publishedAt: Date | null;
    archivedAt: Date | null;
  };
  revisions: { revision: number; createdAt: Date; changeNote: string | null; author: string | null; approvedBy: string | null }[];
  grants: number;
}

const SCOPE_LABEL_SELECT = {
  qualificationId: true,
  subjectId: true,
  syllabusId: true,
  qualification: { select: { shortName: true, examBoard: { select: { shortName: true } } } },
  subject: { select: { name: true, qualification: { select: { shortName: true, examBoard: { select: { shortName: true } } } } } },
  syllabus: { select: { title: true, versionLabel: true, status: true } },
} as const;

type ScopeRow = Prisma.StudyPackScopeGetPayload<{ select: typeof SCOPE_LABEL_SELECT }>;

function scopeView(scope: ScopeRow): StudyPackScopeView {
  if (scope.qualificationId && scope.qualification) {
    return { kind: "QUALIFICATION", targetId: scope.qualificationId, label: `Every subject of ${scope.qualification.examBoard.shortName} ${scope.qualification.shortName}` };
  }
  if (scope.subjectId && scope.subject) {
    return {
      kind: "SUBJECT",
      targetId: scope.subjectId,
      label: `${scope.subject.name} (${scope.subject.qualification.examBoard.shortName} ${scope.subject.qualification.shortName}), any syllabus version`,
    };
  }
  return {
    kind: "SYLLABUS",
    targetId: scope.syllabusId ?? "",
    label: scope.syllabus ? `${scope.syllabus.title} · ${scope.syllabus.versionLabel} only${scope.syllabus.status === "DRAFT" ? " (draft version)" : ""}` : "Unknown syllabus version",
  };
}

export async function getStudyPackEditor(actor: CmsActor, id: string, context: CmsContext = {}): Promise<StudyPackEditorView> {
  assertCanDraft(actor);
  if (!UUID.test(id)) throw AppError.notFound("Study pack not found.");
  const client = readClient(context);
  const row = await client.studyPack.findUnique({
    where: { id },
    select: {
      id: true,
      slug: true,
      title: true,
      subtitle: true,
      description: true,
      coverImageId: true,
      entitlements: true,
      allowPdfExport: true,
      isFeatured: true,
      sortOrder: true,
      metaTitle: true,
      metaDescription: true,
      status: true,
      revision: true,
      draftOfId: true,
      createdById: true,
      reviewedAt: true,
      reviewNotes: true,
      approvedAt: true,
      publishedAt: true,
      archivedAt: true,
      aiGenerated: true,
      isDemo: true,
      createdAt: true,
      updatedAt: true,
      createdBy: PERSON_SELECT,
      reviewedBy: PERSON_SELECT,
      approvedBy: PERSON_SELECT,
      coverImage: { select: { id: true, storageKey: true, altText: true, status: true, deletedAt: true } },
      scopes: { select: SCOPE_LABEL_SELECT, orderBy: { createdAt: "asc" } },
      draftOf: { select: { id: true, status: true, revision: true } },
      pendingDraft: { select: { id: true, status: true, revision: true, createdBy: PERSON_SELECT } },
    },
  });
  if (!row) throw AppError.notFound("Study pack not found.");
  const liveId = row.draftOfId ?? row.id;
  const [prices, pdfCheck, checks, revisions, grants] = await Promise.all([
    client.planPrice.findMany({
      where: { studyPackId: liveId },
      orderBy: [{ isActive: "desc" }, { sortOrder: "asc" }, { createdAt: "desc" }],
      take: 100,
      select: {
        id: true,
        currency: true,
        amountMinor: true,
        periodDays: true,
        label: true,
        isActive: true,
        validFrom: true,
        validTo: true,
        sortOrder: true,
        isDemo: true,
        country: { select: { name: true } },
        _count: { select: { payments: true } },
      },
    }),
    pdfExportCheck(client, row.scopes),
    studyPackChecks(client, id),
    client.contentRevision.findMany({
      where: { entityType: "STUDY_PACK", entityId: liveId },
      orderBy: { revision: "desc" },
      take: 20,
      select: { revision: true, createdAt: true, changeNote: true, author: PERSON_SELECT, approvedBy: PERSON_SELECT },
    }),
    client.entitlementGrant.count({ where: { studyPackId: liveId } }),
  ]);
  const parsed = parsePackEntitlements(row.entitlements);
  const cover = row.coverImage && row.coverImage.deletedAt === null ? row.coverImage : null;
  return {
    id: row.id,
    liveId,
    status: row.status,
    revision: row.revision,
    version: row.updatedAt.toISOString(),
    editable: row.status === "DRAFT",
    aiGenerated: row.aiGenerated,
    isDemo: row.isDemo,
    draftOf: row.draftOf,
    pendingDraft: row.pendingDraft
      ? { id: row.pendingDraft.id, status: row.pendingDraft.status, revision: row.pendingDraft.revision, author: personName(row.pendingDraft.createdBy) }
      : null,
    meta: {
      slug: row.slug,
      title: row.title,
      subtitle: row.subtitle,
      description: row.description,
      coverImageId: row.coverImageId,
      isFeatured: row.isFeatured,
      sortOrder: row.sortOrder,
      metaTitle: row.metaTitle,
      metaDescription: row.metaDescription,
      allowPdfExport: row.allowPdfExport,
    },
    entitlements: parsed.ok ? parsed.value : { ...NO_ENTITLEMENTS },
    entitlementsInvalid: !parsed.ok,
    cover: cover ? { id: cover.id, src: cover.status === "READY" ? `/api/media/${cover.storageKey}` : null, alt: cover.altText } : null,
    scopes: row.scopes.map(scopeView),
    prices: prices.map((p) => ({
      id: p.id,
      currency: p.currency,
      amountMinor: p.amountMinor,
      periodDays: p.periodDays,
      country: p.country?.name ?? null,
      label: p.label,
      isActive: p.isActive,
      validFrom: p.validFrom,
      validTo: p.validTo,
      sortOrder: p.sortOrder,
      isDemo: p.isDemo,
      paymentCount: p._count.payments,
    })),
    pdfCheck,
    checks,
    workflow: {
      author: personName(row.createdBy),
      createdById: row.createdById,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
      reviewedBy: personName(row.reviewedBy),
      reviewedAt: row.reviewedAt,
      reviewNotes: row.reviewNotes,
      approvedBy: personName(row.approvedBy),
      approvedAt: row.approvedAt,
      publishedAt: row.publishedAt,
      archivedAt: row.archivedAt,
    },
    revisions: revisions.map((r) => ({ revision: r.revision, createdAt: r.createdAt, changeNote: r.changeNote, author: personName(r.author), approvedBy: personName(r.approvedBy) })),
    grants,
  };
}

// =====================================================================================================================
// Create / update
// =====================================================================================================================

async function assertSlugFree(client: DbClient, slug: string, ownLiveId: string | null): Promise<void> {
  const clash = await client.studyPack.findFirst({ where: { slug, draftOfId: null, ...(ownLiveId ? { id: { not: ownLiveId } } : {}) }, select: { id: true } });
  if (clash) throw AppError.validation({ slug: ["Another study pack already uses this web address."] });
}

async function assertCover(client: DbClient, coverImageId: string | null): Promise<void> {
  if (!coverImageId) return;
  const asset = await client.mediaAsset.findUnique({ where: { id: coverImageId }, select: { status: true, deletedAt: true, purpose: true } });
  if (!asset || asset.deletedAt !== null) throw AppError.validation({ coverImageId: ["Choose an image from the media library."] });
}

/** Media usage (cover image, description) through the media library's one mapping (src/server/cms/media/usage.ts). */
async function refreshStudyPackDerived(tx: Tx, id: string): Promise<void> {
  await syncMediaUsageFromAggregate(tx, "STUDY_PACK", id);
}

/** Creates a DRAFT pack that unlocks nothing yet (`content.draft`). */
export async function createStudyPack(actor: CmsActor, raw: unknown, context: CmsContext = {}): Promise<{ id: string }> {
  assertCanDraft(actor);
  const meta = parseInput(studyPackCreateSchema, raw);
  return inTransaction(context, async (tx) => {
    await assertSlugFree(tx, meta.slug, null);
    await assertCover(tx, meta.coverImageId);
    const created = await tx.studyPack.create({
      data: {
        ...meta,
        // PDF export can only be switched on once the scope exists and passes the licensing check.
        allowPdfExport: false,
        entitlements: { ...NO_ENTITLEMENTS } as Prisma.InputJsonObject,
        status: "DRAFT",
        createdById: actor.userId,
      },
      select: { id: true },
    });
    await refreshStudyPackDerived(tx, created.id);
    await auditCms(tx, actor, context, {
      action: CMS_CONTENT_AUDIT.CREATE,
      operation: CMS_CONTENT_OPERATIONS.create,
      entityType: "StudyPack",
      entityId: created.id,
      after: { slug: meta.slug, title: meta.title },
    });
    return created;
  });
}

async function lockDraft(tx: Tx, id: string, version: string | undefined): Promise<{ draftOfId: string | null; updatedAt: Date }> {
  await tx.$queryRaw`SELECT "id" FROM "StudyPack" WHERE "id" = ${id}::uuid FOR UPDATE`;
  const row = await findPlatformRow(tx, "STUDY_PACK", id);
  if (row.status !== "DRAFT") {
    throw AppError.conflict(row.status === "PUBLISHED" ? "Published packs are edited through a draft copy. Choose “Edit” first." : "Only drafts can be edited. Send it back to draft first.");
  }
  const current = await tx.studyPack.findUniqueOrThrow({ where: { id }, select: { updatedAt: true } });
  if (version && current.updatedAt.toISOString() !== version) {
    throw AppError.conflict("Someone else saved this pack after you opened it. Reload to see their changes, then edit again.");
  }
  return { draftOfId: row.draftOfId, updatedAt: current.updatedAt };
}

/**
 * Saves a DRAFT pack's details and entitlements (`content.draft`). Turning PDF export on runs the licensing check over
 * every included item and is refused while any item's licence forbids it.
 */
export async function updateStudyPack(actor: CmsActor, raw: unknown, context: CmsContext = {}): Promise<{ id: string; version: string }> {
  assertCanDraft(actor);
  const input = parseInput(studyPackUpdateSchema, raw);
  const { id, version, entitlements: rawEntitlements, ...meta } = input;
  const entitlements = parsePackEntitlements(rawEntitlements);
  if (!entitlements.ok) throw AppError.validation(entitlements.errors, "Check what the pack unlocks.");
  return inTransaction(context, async (tx) => {
    const locked = await lockDraft(tx, id, version);
    await assertSlugFree(tx, meta.slug, locked.draftOfId ?? id);
    await assertCover(tx, meta.coverImageId);
    if (meta.allowPdfExport) {
      const scopes = await tx.studyPackScope.findMany({ where: { studyPackId: id }, select: { qualificationId: true, subjectId: true, syllabusId: true } });
      const check = await pdfExportCheck(tx, scopes);
      if (!check.allowed) {
        throw AppError.validation({
          allowPdfExport: [
            check.emptyScope || check.total === 0
              ? "Add scope rules that include published content before offering PDF export."
              : `${check.blocked} of ${check.total} included items do not permit PDF export. Fix their licensing first.`,
          ],
        });
      }
    }
    const before = await tx.studyPack.findUniqueOrThrow({ where: { id }, select: { slug: true, title: true, allowPdfExport: true, entitlements: true } });
    await tx.studyPack.update({
      where: { id },
      data: { ...meta, entitlements: entitlements.value as unknown as Prisma.InputJsonObject, createdById: actor.userId },
    });
    await refreshStudyPackDerived(tx, id);
    const saved = await tx.studyPack.findUniqueOrThrow({ where: { id }, select: { updatedAt: true } });
    await auditCms(tx, actor, context, {
      action: CMS_CONTENT_AUDIT.UPDATE,
      operation: CMS_CONTENT_OPERATIONS.update,
      entityType: "StudyPack",
      entityId: id,
      before,
      after: { slug: meta.slug, title: meta.title, allowPdfExport: meta.allowPdfExport, entitlements: entitlements.value },
      metadata: { part: "details" },
    });
    return { id, version: saved.updatedAt.toISOString() };
  });
}

/** Replaces the scope rules of a DRAFT pack (`content.draft`); PDF export is switched off if the new scope fails the check. */
export async function saveStudyPackScopes(actor: CmsActor, raw: unknown, context: CmsContext = {}): Promise<{ id: string; version: string; pdfExportTurnedOff: boolean }> {
  assertCanDraft(actor);
  const input = parseInput(scopesSchema, raw);
  return inTransaction(context, async (tx) => {
    await lockDraft(tx, input.id, input.version);
    await assertScopeTargets(tx, input.scopes);
    const rows = input.scopes.map((scope) => ({
      studyPackId: input.id,
      qualificationId: scope.kind === "QUALIFICATION" ? scope.targetId : null,
      subjectId: scope.kind === "SUBJECT" ? scope.targetId : null,
      syllabusId: scope.kind === "SYLLABUS" ? scope.targetId : null,
    }));
    const before = await tx.studyPackScope.count({ where: { studyPackId: input.id } });
    await tx.studyPackScope.deleteMany({ where: { studyPackId: input.id } });
    if (rows.length > 0) await tx.studyPackScope.createMany({ data: rows });
    const pack = await tx.studyPack.findUniqueOrThrow({ where: { id: input.id }, select: { allowPdfExport: true } });
    let pdfExportTurnedOff = false;
    if (pack.allowPdfExport && !(await pdfExportCheck(tx, rows)).allowed) {
      await tx.studyPack.update({ where: { id: input.id }, data: { allowPdfExport: false } });
      pdfExportTurnedOff = true;
    }
    await tx.studyPack.update({ where: { id: input.id }, data: { createdById: actor.userId } });
    const saved = await tx.studyPack.findUniqueOrThrow({ where: { id: input.id }, select: { updatedAt: true } });
    await auditCms(tx, actor, context, {
      action: CMS_CONTENT_AUDIT.UPDATE,
      operation: CMS_CONTENT_OPERATIONS.update,
      entityType: "StudyPack",
      entityId: input.id,
      before: { scopes: before },
      after: { scopes: input.scopes },
      metadata: { part: "scopes", pdfExportTurnedOff },
    });
    return { id: input.id, version: saved.updatedAt.toISOString(), pdfExportTurnedOff };
  });
}

async function assertScopeTargets(client: DbClient, scopes: readonly ScopeInput[]): Promise<void> {
  const ids = (kind: ScopeKind) => scopes.filter((s) => s.kind === kind).map((s) => s.targetId);
  const [qualifications, subjects, syllabi] = await Promise.all([
    ids("QUALIFICATION").length ? client.qualification.count({ where: { id: { in: ids("QUALIFICATION") } } }) : 0,
    ids("SUBJECT").length ? client.subject.count({ where: { id: { in: ids("SUBJECT") } } }) : 0,
    ids("SYLLABUS").length ? client.syllabus.count({ where: { id: { in: ids("SYLLABUS") } } }) : 0,
  ]);
  if (qualifications !== new Set(ids("QUALIFICATION")).size || subjects !== new Set(ids("SUBJECT")).size || syllabi !== new Set(ids("SYLLABUS")).size) {
    throw AppError.validation({ scopes: ["One of the chosen qualifications, subjects or syllabus versions no longer exists."] });
  }
}

/**
 * Deletes a draft pack that was never published and was never priced, sold or granted (`content.draft`). Draft copies
 * are discarded instead; anything with commercial history is archived.
 */
export async function deleteDraftStudyPack(actor: CmsActor, raw: unknown, context: CmsContext = {}): Promise<{ id: string }> {
  assertCanDraft(actor);
  const { id } = parseInput(z.object({ id: uuidSchema }), raw);
  return inTransaction(context, async (tx) => {
    const row = await findPlatformRow(tx, "STUDY_PACK", id);
    if (row.draftOfId !== null) throw new AppError("BAD_REQUEST", "This is an edit of a published pack: discard the draft copy instead.");
    const extra = await tx.studyPack.findUniqueOrThrow({
      where: { id },
      select: { publishedAt: true, slug: true, _count: { select: { planPrices: true, payments: true, entitlementGrants: true } } },
    });
    if (row.status !== "DRAFT" || extra.publishedAt !== null || row.revision > 1) throw AppError.conflict("Only drafts that were never published can be deleted. Archive published packs instead.");
    if (extra._count.planPrices + extra._count.payments + extra._count.entitlementGrants > 0) {
      throw AppError.conflict("This pack has prices, payments or grants. Archive it instead of deleting it.");
    }
    await clearMediaUsage(tx, "STUDY_PACK", id);
    await tx.studyPack.delete({ where: { id } });
    await auditCms(tx, actor, context, { action: CMS_CONTENT_AUDIT.DELETE, operation: CMS_CONTENT_OPERATIONS.delete, entityType: "StudyPack", entityId: id, before: { slug: extra.slug } });
    return { id };
  });
}

/** Live PDF-export check of the pack's saved scope (`content.draft`). */
export async function getPdfExportCheck(actor: CmsActor, id: string, context: CmsContext = {}): Promise<PdfExportCheck> {
  assertCanDraft(actor);
  const client = readClient(context);
  await findPlatformRow(client, "STUDY_PACK", id);
  const scopes = await client.studyPackScope.findMany({ where: { studyPackId: id }, select: { qualificationId: true, subjectId: true, syllabusId: true } });
  return pdfExportCheck(client, scopes);
}

// =====================================================================================================================
// Prices (billing.manage)
// =====================================================================================================================

function instantOf(value: string | null, fallback: Date | null): Date | null {
  if (!value) return fallback;
  return localDateTimeToInstant(value.length === 10 ? `${value}T00:00` : value, DEFAULT_TIMEZONE);
}

/**
 * Adds a one-off price to a pack (`billing.manage`, ADMIN+). Prices are never edited in place: a different amount is
 * a new row, and the old one is deactivated.
 */
export async function createStudyPackPrice(actor: CmsActor, raw: unknown, context: CmsContext = {}): Promise<{ id: string }> {
  assertCanPrice(actor);
  const input = parseInput(priceCreateSchema, raw);
  const amountMinor = toMinorUnits(input.amount, input.currency);
  if (amountMinor === null) throw AppError.validation({ amount: [`${input.currency} amounts have at most the currency's decimal places.`] });
  const validFrom = instantOf(input.validFrom, new Date());
  const validTo = instantOf(input.validTo, null);
  if (validFrom === null || (input.validTo && validTo === null)) throw AppError.validation({ validFrom: ["Enter a real date and time."] });
  return inTransaction(context, async (tx) => {
    const pack = await findPlatformRow(tx, "STUDY_PACK", input.studyPackId);
    if (pack.draftOfId !== null) throw new AppError("BAD_REQUEST", "Prices belong to the live pack, not to a draft copy.");
    if (input.countryId && !(await tx.country.findUnique({ where: { id: input.countryId }, select: { id: true } }))) {
      throw AppError.validation({ countryId: ["Choose a country from the list."] });
    }
    const created = await tx.planPrice.create({
      data: {
        studyPackId: input.studyPackId,
        countryId: input.countryId,
        currency: input.currency,
        amountMinor,
        interval: "ONE_OFF",
        intervalCount: 1,
        periodDays: input.accessDays,
        perSeat: false,
        label: input.label,
        validFrom,
        validTo,
        sortOrder: input.sortOrder,
      },
      select: { id: true },
    });
    await auditCms(tx, actor, context, {
      action: CMS_CONTENT_AUDIT.PRICE_CREATE,
      operation: CMS_CONTENT_OPERATIONS.priceCreate,
      entityType: "PlanPrice",
      entityId: created.id,
      after: { studyPackId: input.studyPackId, currency: input.currency, amountMinor, periodDays: input.accessDays, countryId: input.countryId, validFrom, validTo },
    });
    return created;
  });
}

/** Changes the editable presentation columns of a pack price (label, order, active, end date) (`billing.manage`). */
export async function updateStudyPackPrice(actor: CmsActor, raw: unknown, context: CmsContext = {}): Promise<{ id: string }> {
  assertCanPrice(actor);
  const input = parseInput(priceUpdateSchema, raw);
  return inTransaction(context, async (tx) => {
    const price = await tx.planPrice.findUnique({ where: { id: input.priceId }, select: { id: true, studyPackId: true, label: true, sortOrder: true, isActive: true, validFrom: true, validTo: true } });
    if (!price || price.studyPackId === null) throw AppError.notFound("Price not found.");
    const validTo = instantOf(input.validTo, null);
    if (input.validTo && validTo === null) throw AppError.validation({ validTo: ["Enter a real date and time."] });
    if (validTo && validTo <= price.validFrom) throw AppError.validation({ validTo: ["The end must be after the price's start."] });
    await tx.planPrice.update({ where: { id: input.priceId }, data: { label: input.label, sortOrder: input.sortOrder, isActive: input.isActive, validTo } });
    await auditCms(tx, actor, context, {
      action: CMS_CONTENT_AUDIT.PRICE_UPDATE,
      operation: CMS_CONTENT_OPERATIONS.priceUpdate,
      entityType: "PlanPrice",
      entityId: input.priceId,
      before: { label: price.label, sortOrder: price.sortOrder, isActive: price.isActive, validTo: price.validTo },
      after: { label: input.label, sortOrder: input.sortOrder, isActive: input.isActive, validTo },
      metadata: { studyPackId: price.studyPackId },
    });
    return { id: input.priceId };
  });
}

/** Countries for country-specific prices (§53). */
export async function getCountryOptions(client: DbClient): Promise<{ value: string; label: string; currency: string }[]> {
  const rows = await client.country.findMany({ select: { id: true, name: true, defaultCurrency: true }, orderBy: { name: "asc" }, take: 300 });
  return rows.map((c) => ({ value: c.id, label: c.name, currency: c.defaultCurrency }));
}

// =====================================================================================================================
// Workflow
// =====================================================================================================================

export const STUDY_PACK_WORKFLOW_HOOKS: WorkflowHooks = {
  readiness: async (tx, id) => (await studyPackChecks(tx, id)).errors,
  afterContentChange: refreshStudyPackDerived,
};

export const submitStudyPack = (actor: CmsActor, raw: unknown, context?: CmsContext): Promise<WorkflowResult> =>
  submitItem(actor, "STUDY_PACK", raw, context, STUDY_PACK_WORKFLOW_HOOKS);
export const requestStudyPackChanges = (actor: CmsActor, raw: unknown, context?: CmsContext): Promise<WorkflowResult> =>
  requestItemChanges(actor, "STUDY_PACK", raw, context);
export const approveStudyPack = (actor: CmsActor, raw: unknown, context?: CmsContext): Promise<WorkflowResult> =>
  approveItem(actor, "STUDY_PACK", raw, context, STUDY_PACK_WORKFLOW_HOOKS);
export const publishStudyPack = (actor: CmsActor, raw: unknown, context?: CmsContext): Promise<PublishResult> =>
  publishItem(actor, "STUDY_PACK", raw, context, STUDY_PACK_WORKFLOW_HOOKS);
export const archiveStudyPack = (actor: CmsActor, raw: unknown, context?: CmsContext): Promise<WorkflowResult> => archiveItem(actor, "STUDY_PACK", raw, context);
export const reopenStudyPack = (actor: CmsActor, raw: unknown, context?: CmsContext): Promise<WorkflowResult> => reopenItem(actor, "STUDY_PACK", raw, context);
export const editPublishedStudyPack = (actor: CmsActor, raw: unknown, context?: CmsContext): Promise<DraftCopy> =>
  startEditingItem(actor, "STUDY_PACK", raw, context, STUDY_PACK_WORKFLOW_HOOKS);
export const discardStudyPackDraft = (actor: CmsActor, raw: unknown, context?: CmsContext): Promise<{ liveId: string }> =>
  discardItemDraftCopy(actor, "STUDY_PACK", raw, context);
