import "server-only";
import type { z } from "zod";
import type { Prisma } from "@/generated/prisma/client";
import { mediaSrc } from "@/server/content/service";
import { db, type DbClient } from "@/server/db";
import { AUDIT_ACTIONS, auditActorFields, auditInTx, type AuditAction, type AuditRequestInfo } from "@/server/lib/audit";
import { AppError, type FieldErrors } from "@/server/lib/errors";
import { AUDIT_TRAIL_SELECT, toAuditTrailEntry, type AuditTrailEntry } from "../commerce/shared";
import { assertCmsPermission, infraActor, type CmsActor } from "../users/access";
import {
  createTestimonialSchema,
  listTestimonialsSchema,
  testimonialIdSchema,
  updateTestimonialSchema,
  type CreateTestimonialInput,
  type ListTestimonialsInput,
  type TestimonialState,
  type UpdateTestimonialInput,
} from "./schemas";

/**
 * Testimonial CMS (§45; CLAUDE.md rule 6 "no invented testimonials"; `content.publish`). The public read model is
 * src/server/marketing/testimonials.ts (published, consented, non-demo rows only).
 *
 * Rules, enforced here AND by the database (Testimonial_publish_chk, _quote_chk, _demo_chk):
 * - A testimonial cannot exist without recorded consent: when (`consentRecordedAt`, not in the future), how
 *   (`consentMethod`), optional evidence reference, and who recorded it (`consentRecordedById` = the editor).
 * - Minors (`authorIsMinor`, forced when the linked account is a minor student) need guardian consent recorded before
 *   publishing.
 * - Demo rows (dev seed) can never be published.
 * - Withdrawing consent is irreversible: the row is unpublished and the quote, name, description and photo are erased
 *   (the same treatment as account deletion, src/server/accounts/deletion.ts). New consent means a new testimonial.
 * - Audit entries record flags and ids only, never the quote or the person's name.
 */

/** Shown in place of the erased name once consent is withdrawn. */
export const WITHDRAWN_DISPLAY_NAME = "Consent withdrawn";

export interface TestimonialListItem {
  id: string;
  displayName: string;
  descriptor: string | null;
  quoteExcerpt: string;
  isPublished: boolean;
  publishedAt: Date | null;
  isDemo: boolean;
  authorIsMinor: boolean;
  hasGuardianConsent: boolean;
  consentWithdrawnAt: Date | null;
  sortOrder: number;
  createdAt: Date;
  state: TestimonialState;
  /** Why it cannot be published right now (null when it can, or is already published). */
  publishBlocker: string | null;
}

export interface TestimonialDetail extends TestimonialListItem {
  quote: string;
  userId: string | null;
  photo: { id: string; src: string | null; altText: string | null; usable: boolean } | null;
  consentRecordedAt: Date;
  consentMethod: string;
  consentEvidenceRef: string | null;
  consentRecordedBy: { id: string; name: string } | null;
  guardianConsentRecordedAt: Date | null;
  updatedAt: Date;
  audit: AuditTrailEntry[];
}

const LIST_SELECT = {
  id: true,
  displayName: true,
  descriptor: true,
  quote: true,
  isPublished: true,
  publishedAt: true,
  isDemo: true,
  authorIsMinor: true,
  guardianConsentRecordedAt: true,
  consentWithdrawnAt: true,
  sortOrder: true,
  createdAt: true,
} as const satisfies Prisma.TestimonialSelect;

type ListRow = Prisma.TestimonialGetPayload<{ select: typeof LIST_SELECT }>;

function parse<S extends z.ZodType>(schema: S, input: unknown): z.output<S> {
  const result = schema.safeParse(input);
  if (!result.success) throw AppError.fromZod(result.error, result.error.issues[0]?.message);
  return result.data;
}

/** Why a row cannot be published (pure), or null. Mirrors the database CHECKs plus the non-blank text rule. */
export function testimonialPublishBlocker(row: {
  isDemo: boolean;
  consentWithdrawnAt: Date | null;
  authorIsMinor: boolean;
  guardianConsentRecordedAt: Date | null;
  quote: string;
  displayName: string;
}): string | null {
  if (row.isDemo) return "Demo testimonials can never be published.";
  if (row.consentWithdrawnAt !== null) return "Consent was withdrawn.";
  if (row.authorIsMinor && row.guardianConsentRecordedAt === null) return "The author is under 18: record the guardian's consent first.";
  if (row.quote.trim() === "" || row.displayName.trim() === "") return "The quote and name are required.";
  return null;
}

function stateOf(row: Pick<ListRow, "isPublished" | "consentWithdrawnAt">): TestimonialState {
  if (row.consentWithdrawnAt !== null) return "withdrawn";
  return row.isPublished ? "published" : "unpublished";
}

function excerpt(text: string, max = 140): string {
  const flat = text.replace(/\s+/g, " ").trim();
  return flat.length <= max ? flat : `${flat.slice(0, max - 1).trimEnd()}…`;
}

function toListItem(row: ListRow): TestimonialListItem {
  const { quote, guardianConsentRecordedAt, ...rest } = row;
  return {
    ...rest,
    quoteExcerpt: excerpt(quote),
    hasGuardianConsent: guardianConsentRecordedAt !== null,
    state: stateOf(row),
    publishBlocker: row.isPublished ? null : testimonialPublishBlocker(row),
  };
}

function stateWhere(state: TestimonialState): Prisma.TestimonialWhereInput {
  switch (state) {
    case "withdrawn":
      return { consentWithdrawnAt: { not: null } };
    case "published":
      return { isPublished: true };
    case "unpublished":
      return { isPublished: false, consentWithdrawnAt: null };
  }
}

/** Newest first, filtered by state; cursor pagination by id (uuid v7 ids are time-ordered). */
export async function listTestimonials(actor: CmsActor, input: ListTestimonialsInput = {}): Promise<{ items: TestimonialListItem[]; nextCursor: string | null }> {
  assertCmsPermission(actor, "content.publish");
  const data = parse(listTestimonialsSchema, input);
  const rows = await db.testimonial.findMany({
    where: { ...(data.state ? stateWhere(data.state) : {}), ...(data.cursor ? { id: { lt: data.cursor } } : {}) },
    select: LIST_SELECT,
    orderBy: { id: "desc" },
    take: data.limit + 1,
  });
  const page = rows.slice(0, data.limit);
  return { items: page.map(toListItem), nextCursor: rows.length > data.limit ? (page[page.length - 1]?.id ?? null) : null };
}

/** One testimonial with its consent record, photo and recent audit trail. */
export async function getTestimonial(actor: CmsActor, testimonialId: string): Promise<TestimonialDetail> {
  assertCmsPermission(actor, "content.publish");
  const { testimonialId: id } = parse(testimonialIdSchema, { testimonialId });
  const [row, audit] = await Promise.all([
    db.testimonial.findUnique({
      where: { id },
      select: {
        ...LIST_SELECT,
        userId: true,
        consentRecordedAt: true,
        consentMethod: true,
        consentEvidenceRef: true,
        updatedAt: true,
        consentRecordedBy: { select: { id: true, profile: { select: { displayName: true, firstName: true, lastName: true } } } },
        photo: { select: { id: true, storageKey: true, altText: true, status: true, visibility: true, deletedAt: true } },
      },
    }),
    db.auditLog.findMany({ where: { entityType: "Testimonial", entityId: id }, select: AUDIT_TRAIL_SELECT, orderBy: { createdAt: "desc" }, take: 10 }),
  ]);
  if (!row) throw AppError.notFound("Testimonial not found.");
  const { userId, consentRecordedAt, consentMethod, consentEvidenceRef, updatedAt, consentRecordedBy, photo, ...listRow } = row;
  const recorder = consentRecordedBy
    ? {
        id: consentRecordedBy.id,
        name:
          consentRecordedBy.profile?.displayName?.trim() ||
          [consentRecordedBy.profile?.firstName, consentRecordedBy.profile?.lastName].filter(Boolean).join(" ") ||
          "Staff member",
      }
    : null;
  const usable = photo !== null && photo.status === "READY" && photo.visibility === "PUBLIC" && photo.deletedAt === null;
  return {
    ...toListItem(listRow),
    quote: row.quote,
    guardianConsentRecordedAt: row.guardianConsentRecordedAt,
    userId,
    photo: photo ? { id: photo.id, src: usable ? mediaSrc(photo.storageKey) : null, altText: photo.altText, usable } : null,
    consentRecordedAt,
    consentMethod,
    consentEvidenceRef,
    consentRecordedBy: recorder,
    updatedAt,
    audit: audit.map(toAuditTrailEntry),
  };
}

type CreateData = z.output<typeof createTestimonialSchema>;

/** Cross-field and cross-table checks shared by create and update. Returns the normalised minor / guardian fields. */
async function checkConsentAndLinks(client: DbClient, data: CreateData, now: Date): Promise<{ authorIsMinor: boolean; guardianConsentRecordedAt: Date | null }> {
  const errors: FieldErrors = {};
  if (data.consentRecordedAt.getTime() > now.getTime()) errors.consentRecordedAt = ["Consent cannot be recorded in the future."];
  let authorIsMinor = data.authorIsMinor;
  if (data.userId) {
    const user = await client.user.findUnique({ where: { id: data.userId }, select: { id: true, student: { select: { isMinor: true } } } });
    if (!user) errors.userId = ["No account has this id."];
    else if (user.student?.isMinor && !authorIsMinor) {
      errors.authorIsMinor = ["This account belongs to a student under 18. Tick “The author is under 18” and record the guardian's consent."];
      authorIsMinor = true;
    }
  }
  const guardian = authorIsMinor ? (data.guardianConsentRecordedAt ?? null) : null;
  if (guardian && guardian.getTime() > now.getTime()) errors.guardianConsentRecordedAt = ["Consent cannot be recorded in the future."];
  if (data.photoMediaId) {
    const photo = await client.mediaAsset.findUnique({ where: { id: data.photoMediaId }, select: { mimeType: true, status: true, deletedAt: true } });
    if (!photo || photo.deletedAt !== null || photo.status === "DELETED" || photo.status === "REJECTED") errors.photoMediaId = ["No usable media file has this id."];
    else if (!photo.mimeType.startsWith("image/")) errors.photoMediaId = ["Choose an image file."];
  }
  if (Object.keys(errors).length > 0) throw AppError.validation(errors, Object.values(errors)[0]?.[0]);
  return { authorIsMinor, guardianConsentRecordedAt: guardian };
}

function auditEntry(
  actor: CmsActor,
  action: AuditAction,
  testimonialId: string,
  extra: { before?: unknown; after?: unknown; metadata?: Record<string, unknown>; reason?: string | null; request: AuditRequestInfo | null },
) {
  return { ...auditActorFields(infraActor(actor)), action, entityType: "Testimonial", entityId: testimonialId, ...extra };
}

/** Flags safe for the audit log (no names, no quote). */
function consentFlags(row: { authorIsMinor: boolean; guardianConsentRecordedAt: Date | null; consentMethod: string; photoMediaId: string | null; userId: string | null }) {
  return {
    authorIsMinor: row.authorIsMinor,
    hasGuardianConsent: row.guardianConsentRecordedAt !== null,
    consentMethod: row.consentMethod,
    hasPhoto: row.photoMediaId !== null,
    linkedAccount: row.userId !== null,
  };
}

/** Records a testimonial with its consent (UNPUBLISHED; publish it separately). */
export async function createTestimonial(
  actor: CmsActor,
  input: CreateTestimonialInput,
  request: AuditRequestInfo | null = null,
  now: Date = new Date(),
): Promise<{ id: string }> {
  assertCmsPermission(actor, "content.publish");
  const data = parse(createTestimonialSchema, input);
  const minor = await checkConsentAndLinks(db, data, now);
  const columns = {
    displayName: data.displayName,
    descriptor: data.descriptor ?? null,
    quote: data.quote,
    photoMediaId: data.photoMediaId ?? null,
    userId: data.userId ?? null,
    consentRecordedAt: data.consentRecordedAt,
    consentMethod: data.consentMethod,
    consentEvidenceRef: data.consentEvidenceRef ?? null,
    authorIsMinor: minor.authorIsMinor,
    guardianConsentRecordedAt: minor.guardianConsentRecordedAt,
    sortOrder: data.sortOrder ?? 0,
  };
  return db.$transaction(async (tx) => {
    const created = await tx.testimonial.create({ data: { ...columns, consentRecordedById: actor.userId, isPublished: false, isDemo: false }, select: { id: true } });
    await auditInTx(tx, auditEntry(actor, AUDIT_ACTIONS.TESTIMONIAL_CREATE, created.id, { after: consentFlags(columns), request }));
    return created;
  });
}

const STALE = "This testimonial was changed by someone else. Reload the page to see the latest version.";

/** Edits the text, photo, order and consent record (optimistic concurrency). Withdrawn rows cannot be edited. */
export async function updateTestimonial(
  actor: CmsActor,
  input: UpdateTestimonialInput,
  request: AuditRequestInfo | null = null,
  now: Date = new Date(),
): Promise<{ id: string; changed: string[] }> {
  assertCmsPermission(actor, "content.publish");
  const data = parse(updateTestimonialSchema, input);
  const minor = await checkConsentAndLinks(db, data, now);
  return db.$transaction(async (tx) => {
    const current = await tx.testimonial.findUnique({
      where: { id: data.testimonialId },
      select: {
        displayName: true,
        descriptor: true,
        quote: true,
        photoMediaId: true,
        userId: true,
        consentRecordedAt: true,
        consentMethod: true,
        consentEvidenceRef: true,
        authorIsMinor: true,
        guardianConsentRecordedAt: true,
        sortOrder: true,
        isPublished: true,
        isDemo: true,
        consentWithdrawnAt: true,
        updatedAt: true,
      },
    });
    if (!current) throw AppError.notFound("Testimonial not found.");
    if (current.updatedAt.getTime() !== new Date(data.expectedUpdatedAt).getTime()) throw AppError.conflict(STALE);
    if (current.consentWithdrawnAt !== null) throw AppError.conflict("Consent was withdrawn: this testimonial has been erased and cannot be edited.");
    const next = {
      displayName: data.displayName,
      descriptor: data.descriptor ?? null,
      quote: data.quote,
      photoMediaId: data.photoMediaId ?? null,
      userId: data.userId ?? null,
      consentRecordedAt: data.consentRecordedAt,
      consentMethod: data.consentMethod,
      consentEvidenceRef: data.consentEvidenceRef ?? null,
      authorIsMinor: minor.authorIsMinor,
      guardianConsentRecordedAt: minor.guardianConsentRecordedAt,
      sortOrder: data.sortOrder ?? current.sortOrder,
    };
    if (current.isPublished) {
      const blocker = testimonialPublishBlocker({ ...next, isDemo: current.isDemo, consentWithdrawnAt: null });
      if (blocker) throw AppError.validation({ guardianConsentRecordedAt: [blocker] }, `${blocker} Unpublish it first to make this change.`);
    }
    const same = (a: unknown, b: unknown) => (a instanceof Date && b instanceof Date ? a.getTime() === b.getTime() : a === b);
    const changed = (Object.keys(next) as (keyof typeof next)[]).filter((key) => !same(next[key], current[key]));
    if (changed.length === 0) return { id: data.testimonialId, changed };
    const updated = await tx.testimonial.updateMany({ where: { id: data.testimonialId, updatedAt: current.updatedAt, consentWithdrawnAt: null }, data: next });
    if (updated.count !== 1) throw AppError.conflict(STALE);
    await auditInTx(
      tx,
      auditEntry(actor, AUDIT_ACTIONS.TESTIMONIAL_UPDATE, data.testimonialId, { before: consentFlags(current), after: consentFlags(next), metadata: { changed }, request }),
    );
    return { id: data.testimonialId, changed };
  });
}

/** Publishes a consented testimonial (see {@link testimonialPublishBlocker}). Idempotent. */
export async function publishTestimonial(
  actor: CmsActor,
  input: { testimonialId: string; reason?: string },
  request: AuditRequestInfo | null = null,
  now: Date = new Date(),
): Promise<{ id: string; changed: boolean }> {
  assertCmsPermission(actor, "content.publish");
  const data = parse(testimonialIdSchema, input);
  return db.$transaction(async (tx) => {
    const row = await tx.testimonial.findUnique({
      where: { id: data.testimonialId },
      select: { isPublished: true, isDemo: true, consentWithdrawnAt: true, authorIsMinor: true, guardianConsentRecordedAt: true, quote: true, displayName: true },
    });
    if (!row) throw AppError.notFound("Testimonial not found.");
    if (row.isPublished) return { id: data.testimonialId, changed: false };
    const blocker = testimonialPublishBlocker(row);
    if (blocker) throw AppError.conflict(blocker);
    await tx.testimonial.update({ where: { id: data.testimonialId }, data: { isPublished: true, publishedAt: now } });
    await auditInTx(tx, auditEntry(actor, AUDIT_ACTIONS.TESTIMONIAL_PUBLISH, data.testimonialId, { after: { isPublished: true }, reason: data.reason ?? null, request }));
    return { id: data.testimonialId, changed: true };
  });
}

/** Takes a testimonial off the public site (consent unchanged). Idempotent. */
export async function unpublishTestimonial(
  actor: CmsActor,
  input: { testimonialId: string; reason?: string },
  request: AuditRequestInfo | null = null,
): Promise<{ id: string; changed: boolean }> {
  assertCmsPermission(actor, "content.publish");
  const data = parse(testimonialIdSchema, input);
  return db.$transaction(async (tx) => {
    const updated = await tx.testimonial.updateMany({ where: { id: data.testimonialId, isPublished: true }, data: { isPublished: false, publishedAt: null } });
    if (updated.count === 0) {
      if (!(await tx.testimonial.findUnique({ where: { id: data.testimonialId }, select: { id: true } }))) throw AppError.notFound("Testimonial not found.");
      return { id: data.testimonialId, changed: false };
    }
    await auditInTx(tx, auditEntry(actor, AUDIT_ACTIONS.TESTIMONIAL_UNPUBLISH, data.testimonialId, { after: { isPublished: false }, reason: data.reason ?? null, request }));
    return { id: data.testimonialId, changed: true };
  });
}

/**
 * Records that the person withdrew consent: unpublishes the testimonial and erases its quote, name, description and
 * photo link (irreversible; the consent record — when, how, evidence reference — is kept as proof of what was agreed).
 */
export async function withdrawTestimonialConsent(
  actor: CmsActor,
  input: { testimonialId: string; reason?: string },
  request: AuditRequestInfo | null = null,
  now: Date = new Date(),
): Promise<{ id: string; changed: boolean }> {
  assertCmsPermission(actor, "content.publish");
  const data = parse(testimonialIdSchema, input);
  return db.$transaction(async (tx) => {
    const row = await tx.testimonial.findUnique({ where: { id: data.testimonialId }, select: { isPublished: true, consentWithdrawnAt: true, photoMediaId: true } });
    if (!row) throw AppError.notFound("Testimonial not found.");
    if (row.consentWithdrawnAt !== null) return { id: data.testimonialId, changed: false };
    await tx.testimonial.update({
      where: { id: data.testimonialId },
      data: { consentWithdrawnAt: now, isPublished: false, publishedAt: null, quote: "", displayName: WITHDRAWN_DISPLAY_NAME, descriptor: null, photoMediaId: null },
    });
    await auditInTx(
      tx,
      auditEntry(actor, AUDIT_ACTIONS.TESTIMONIAL_CONSENT_WITHDRAW, data.testimonialId, {
        before: { isPublished: row.isPublished, hasPhoto: row.photoMediaId !== null },
        after: { isPublished: false, erased: true },
        reason: data.reason ?? null,
        request,
      }),
    );
    return { id: data.testimonialId, changed: true };
  });
}
