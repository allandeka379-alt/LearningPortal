import "server-only";
import { z } from "zod";
import type { GuardianRelationship, ParentLinkConsentBasis, Prisma } from "@/generated/prisma/client";
import { parseLoginIdentifier } from "@/server/auth/identifiers";
import { getParentAiAccessEnabled } from "@/server/cms/settings/catalogue";
import { db } from "@/server/db";
import { AUDIT_ACTIONS, auditInTx } from "@/server/lib/audit";
import type { Tx } from "@/server/lib/db-context";
import { AppError } from "@/server/lib/errors";
import { logger } from "@/server/lib/logger";
import { createNotification } from "@/server/notifications/service";
import {
  formatLinkCode,
  generateLinkCode,
  hashLinkCode,
  linkCodeExpiry,
  linkRequestExpiry,
  normalizeLinkCode,
} from "./codes";
import {
  assertFamilyRateLimits,
  assertParent,
  assertStudent,
  ipSubject,
  isActiveWithRole,
  isUniqueViolation,
  notBefore,
  personName,
  type FamilyActor,
  type FamilyRequestMeta,
} from "./common";
import {
  DEFAULT_LINK_PERMISSIONS,
  linkIdSchema,
  MAX_ACTIVE_LINKS_PER_STUDENT,
  MAX_CHILDREN_PER_PARENT,
  permissionsSchema,
  relationshipSchema,
  revokeReasonSchema,
  STUDENT_CONSENT_BASES,
  type LinkPermissions,
} from "./schemas";

/**
 * Parent-student linking (§21; schema `ParentStudentLink`, ARCHITECTURE §5.3, §5.12). Every link is one EPISODE with
 * its own consent; REVOKED / DECLINED are terminal and re-linking inserts a new row (DB trigger).
 *
 * Flows (schema docs):
 * (a) the STUDENT creates a short-lived code (`createStudentLinkCode`) and shares it; the parent redeems it
 *     (`redeemStudentCode`) → ACTIVE at once, basis STUDENT_CODE (sharing the code IS the student's consent);
 * (b) the PARENT creates a code (`createParentLinkCode`); the student enters it (`redeemParentCode`) → ACTIVE, basis
 *     STUDENT_APPROVAL (entering it is the approval);
 * (c) the parent asks by the student's email / phone / username (`requestLinkByContact`) → PENDING; the student
 *     accepts or declines in /app/family (`respondToLinkRequest`) → ACTIVE (STUDENT_APPROVAL) or DECLINED.
 *
 * Either side may end a link or cancel a pending one (`revokeLink`, audited). Only the STUDENT sets what the parent may
 * see (`updateLinkPermissions`); AI conversations need a separate, explicit consent AND the platform switch
 * `privacy.parentAiAccess.enabled` (`setAiConversationAccess`). Privacy rules:
 * - a parent's request never reveals whether an account exists (same answer for every identifier);
 * - declining or removing a parent does not notify the parent (a minor may need to quietly end a link);
 * - audit entries carry ids and flags only, never names or contact details.
 */

const MAX_CODE_ATTEMPTS = 3;
const INVALID_CODE = "That code is not valid or has expired. Ask for a new code and try again.";
const OPEN_STATUSES = ["PENDING", "ACTIVE"] as const;

const LINK_SELECT = {
  id: true,
  parentUserId: true,
  studentUserId: true,
  status: true,
  relationship: true,
  initiatedBy: true,
  consentBasis: true,
  inviteCodeHash: true,
  inviteExpiresAt: true,
  studentConsentAt: true,
  canViewAiConversations: true,
  createdAt: true,
} as const satisfies Prisma.ParentStudentLinkSelect;

type LinkRow = Prisma.ParentStudentLinkGetPayload<{ select: typeof LINK_SELECT }>;

function auditBase(actor: FamilyActor, meta: FamilyRequestMeta | null | undefined) {
  return { actorUserId: actor.userId, actorRoles: actor.roles, request: meta ?? null };
}

function permissionData(permissions: LinkPermissions) {
  return {
    canViewProgress: permissions.progress,
    canViewStudyActivity: permissions.activity,
    canViewTestResults: permissions.results,
  };
}

function parsePermissions(input: unknown): LinkPermissions {
  if (input === undefined) return DEFAULT_LINK_PERMISSIONS;
  const parsed = permissionsSchema.safeParse(input);
  if (!parsed.success) throw AppError.fromZod(parsed.error, "Choose what your parent can see.");
  return parsed.data;
}

function parseLinkId(linkId: unknown): string {
  const parsed = linkIdSchema.safeParse(linkId);
  if (!parsed.success) throw AppError.notFound("We couldn't find that link.");
  return parsed.data;
}

async function countActiveLinks(tx: Tx, where: { parentUserId: string } | { studentUserId: string }): Promise<number> {
  // ParentStudentLink(parentUserId, status) / (studentUserId, status) indexes.
  return tx.parentStudentLink.count({ where: { ...where, status: "ACTIVE" } });
}

async function assertLinkCapacity(tx: Tx, parentUserId: string, studentUserId: string): Promise<void> {
  if ((await countActiveLinks(tx, { studentUserId })) >= MAX_ACTIVE_LINKS_PER_STUDENT) {
    throw AppError.conflict(`A student can have at most ${MAX_ACTIVE_LINKS_PER_STUDENT} parents or guardians linked. Remove one first.`);
  }
  if ((await countActiveLinks(tx, { parentUserId })) >= MAX_CHILDREN_PER_PARENT) {
    throw AppError.conflict(`A parent account can follow at most ${MAX_CHILDREN_PER_PARENT} children.`);
  }
}

/** Ends an older open episode between the same pair (a pending request superseded by a code, an expired request). */
async function supersedeOpenPair(tx: Tx, parentUserId: string, studentUserId: string, actorUserId: string, now: Date): Promise<"ACTIVE" | null> {
  const open = await tx.parentStudentLink.findFirst({
    where: { parentUserId, studentUserId, status: { in: [...OPEN_STATUSES] } },
    select: { id: true, status: true },
  });
  if (!open) return null;
  if (open.status === "ACTIVE") return "ACTIVE";
  await tx.parentStudentLink.update({
    where: { id: open.id },
    data: { status: "REVOKED", revokedAt: now, revokedById: actorUserId, revokeReason: "superseded", inviteCodeHash: null },
  });
  return null;
}

/** Marks a parent's onboarding done once a first child is linked (Parent.onboardingCompletedAt). */
async function markParentOnboarded(tx: Tx, parentUserId: string, now: Date): Promise<void> {
  await tx.parent.updateMany({ where: { userId: parentUserId, onboardingCompletedAt: null }, data: { onboardingCompletedAt: now } });
}

async function profileName(tx: Tx, userId: string, fallback: string): Promise<string> {
  const profile = await tx.profile.findUnique({ where: { userId }, select: { displayName: true, firstName: true, lastName: true } });
  return personName(profile, fallback);
}

// =====================================================================================================================
// Codes (flows a and b)
// =====================================================================================================================

export interface IssuedLinkCode {
  linkId: string;
  /** The raw code (shown ONCE; only its HMAC is stored). */
  code: string;
  /** `ABCD-EFGH`. */
  displayCode: string;
  expiresAt: Date;
}

async function issueCode(
  actor: FamilyActor,
  side: "student" | "parent",
  relationship: GuardianRelationship,
  now: Date,
): Promise<IssuedLinkCode> {
  await assertFamilyRateLimits([{ name: "codeIssue", subject: actor.userId }], "You've created a lot of codes. Please wait a while and try again.");
  const expiresAt = linkCodeExpiry(now);
  for (let attempt = 0; attempt < MAX_CODE_ATTEMPTS; attempt += 1) {
    const code = generateLinkCode();
    const inviteCodeHash = hashLinkCode(code);
    try {
      const link = await db.$transaction(async (tx) => {
        // One outstanding code per person: a new code replaces (and invalidates) the previous one.
        await tx.parentStudentLink.updateMany({
          where:
            side === "student"
              ? { studentUserId: actor.userId, parentUserId: null, status: "PENDING" }
              : { parentUserId: actor.userId, studentUserId: null, status: "PENDING" },
          data: { status: "REVOKED", revokedAt: now, revokedById: actor.userId, revokeReason: "replaced", inviteCodeHash: null },
        });
        return tx.parentStudentLink.create({
          data: {
            ...(side === "student" ? { studentUserId: actor.userId } : { parentUserId: actor.userId }),
            status: "PENDING",
            relationship,
            initiatedBy: side === "student" ? "STUDENT" : "PARENT",
            inviteCodeHash,
            inviteExpiresAt: expiresAt,
            createdAt: now,
          },
          select: { id: true },
        });
      });
      return { linkId: link.id, code, displayCode: formatLinkCode(code), expiresAt };
    } catch (error) {
      if (isUniqueViolation(error) && attempt < MAX_CODE_ATTEMPTS - 1) continue; // astronomically rare hash collision
      throw error;
    }
  }
  throw new AppError("INTERNAL", "We couldn't create a code. Please try again.");
}

/** Flow (a): a student creates a code to give to a parent or guardian. Replaces any earlier unused code. */
export async function createStudentLinkCode(actor: FamilyActor, options: { now?: Date } = {}): Promise<IssuedLinkCode> {
  assertStudent(actor);
  return issueCode(actor, "student", "PARENT", options.now ?? new Date());
}

/** Flow (b): a parent creates a code for their child to enter. Replaces any earlier unused code. */
export async function createParentLinkCode(
  actor: FamilyActor,
  input: { relationship?: unknown } = {},
  options: { now?: Date } = {},
): Promise<IssuedLinkCode> {
  assertParent(actor);
  const relationship = relationshipSchema.safeParse(input.relationship ?? "PARENT");
  if (!relationship.success) throw AppError.fromZod(relationship.error);
  return issueCode(actor, "parent", relationship.data, options.now ?? new Date());
}

async function assertRedeemAllowed(actor: FamilyActor, meta: FamilyRequestMeta | null | undefined): Promise<void> {
  const ip = ipSubject(meta?.ip);
  await assertFamilyRateLimits(
    [
      { name: "codeRedeem", subject: actor.userId },
      { name: "codeRedeemDaily", subject: actor.userId },
      ...(ip ? [{ name: "codeRedeemIp" as const, subject: ip }] : []),
    ],
    "Too many code attempts. Please wait a few minutes and try again.",
  );
}

function usableCode(link: LinkRow | null, hash: string, now: Date): link is LinkRow {
  return (
    link !== null &&
    link.status === "PENDING" &&
    link.inviteCodeHash === hash &&
    link.inviteExpiresAt !== null &&
    link.inviteExpiresAt.getTime() > now.getTime()
  );
}

interface ActivationContext {
  tx: Tx;
  link: LinkRow;
  hash: string;
  parentUserId: string;
  studentUserId: string;
  basis: ParentLinkConsentBasis;
  relationship: GuardianRelationship;
  permissions: LinkPermissions;
  actor: FamilyActor;
  meta: FamilyRequestMeta | null | undefined;
  now: Date;
}

/** Turns a PENDING code episode into an ACTIVE link (compare-and-set on the code, so a code works exactly once). */
async function activateCodeLink(ctx: ActivationContext): Promise<void> {
  const { tx, link, now } = ctx;
  const existing = await supersedeOpenPair(tx, ctx.parentUserId, ctx.studentUserId, ctx.actor.userId, now);
  if (existing === "ACTIVE") throw AppError.conflict("You're already linked to each other.");
  await assertLinkCapacity(tx, ctx.parentUserId, ctx.studentUserId);
  const consentAt = notBefore(now, link.createdAt);
  const updated = await tx.parentStudentLink.updateMany({
    where: { id: link.id, status: "PENDING", inviteCodeHash: ctx.hash },
    data: {
      parentUserId: ctx.parentUserId,
      studentUserId: ctx.studentUserId,
      status: "ACTIVE",
      consentBasis: ctx.basis,
      relationship: ctx.relationship,
      studentConsentAt: consentAt,
      activatedAt: consentAt,
      inviteCodeHash: null,
      ...permissionData(ctx.permissions),
    },
  });
  if (updated.count !== 1) throw new AppError("BAD_REQUEST", INVALID_CODE); // redeemed concurrently
  await markParentOnboarded(tx, ctx.parentUserId, now);
  await auditInTx(tx, {
    ...auditBase(ctx.actor, ctx.meta),
    action: AUDIT_ACTIONS.PARENT_LINK_ACTIVATE,
    entityType: "ParentStudentLink",
    entityId: link.id,
    targetUserId: ctx.studentUserId,
    metadata: { basis: ctx.basis, ...ctx.permissions },
  });
}

/**
 * Flow (a), parent side: redeems a code the student created. The link becomes ACTIVE immediately with basis
 * STUDENT_CODE. Rate-limited per parent and per IP; every failure gives the same message (no code oracle).
 */
export async function redeemStudentCode(
  actor: FamilyActor,
  input: { code: unknown; relationship?: unknown },
  meta?: FamilyRequestMeta | null,
  options: { now?: Date } = {},
): Promise<{ linkId: string; studentUserId: string }> {
  assertParent(actor);
  const relationship = relationshipSchema.safeParse(input.relationship ?? "PARENT");
  if (!relationship.success) throw AppError.fromZod(relationship.error);
  await assertRedeemAllowed(actor, meta);
  const code = normalizeLinkCode(input.code);
  if (code === null) throw AppError.validation({ code: [INVALID_CODE] }, INVALID_CODE);
  const hash = hashLinkCode(code);
  const now = options.now ?? new Date();

  try {
    return await db.$transaction(async (tx) => {
      const link = await tx.parentStudentLink.findUnique({ where: { inviteCodeHash: hash }, select: LINK_SELECT });
      if (!usableCode(link, hash, now) || link.studentUserId === null || link.parentUserId !== null) {
        throw AppError.validation({ code: [INVALID_CODE] }, INVALID_CODE);
      }
      const studentUserId = link.studentUserId;
      if (studentUserId === actor.userId) throw AppError.validation({ code: ["You can't link your account to itself."] });
      const student = await tx.user.findUnique({ where: { id: studentUserId }, select: { status: true, roles: true } });
      if (!isActiveWithRole(student, "STUDENT")) throw AppError.validation({ code: [INVALID_CODE] }, INVALID_CODE);

      await activateCodeLink({
        tx,
        link,
        hash,
        parentUserId: actor.userId,
        studentUserId,
        basis: "STUDENT_CODE",
        relationship: relationship.data,
        permissions: DEFAULT_LINK_PERMISSIONS,
        actor,
        meta,
        now,
      });
      const parentName = await profileName(tx, actor.userId, "A parent or guardian");
      await createNotification(
        studentUserId,
        {
          type: "parent.linked",
          title: "A parent is now linked to your account",
          body: `${parentName} used your link code and can now follow your progress. You choose what they see in Family.`,
          data: { href: "/app/family", linkId: link.id },
          dedupeKey: `parent_link:${link.id}:linked`,
        },
        { client: tx },
      );
      return { linkId: link.id, studentUserId };
    });
  } catch (error) {
    if (isUniqueViolation(error)) throw AppError.conflict("You're already linked to each other.");
    throw error;
  }
}

/**
 * Flow (b), student side: enters a code their parent created. ACTIVE immediately with basis STUDENT_APPROVAL and the
 * permissions the student chose (defaults: progress, activity and results on; AI conversations always off).
 */
export async function redeemParentCode(
  actor: FamilyActor,
  input: { code: unknown; permissions?: unknown },
  meta?: FamilyRequestMeta | null,
  options: { now?: Date } = {},
): Promise<{ linkId: string; parentUserId: string }> {
  assertStudent(actor);
  const permissions = parsePermissions(input.permissions);
  await assertRedeemAllowed(actor, meta);
  const code = normalizeLinkCode(input.code);
  if (code === null) throw AppError.validation({ code: [INVALID_CODE] }, INVALID_CODE);
  const hash = hashLinkCode(code);
  const now = options.now ?? new Date();

  try {
    return await db.$transaction(async (tx) => {
      const link = await tx.parentStudentLink.findUnique({ where: { inviteCodeHash: hash }, select: LINK_SELECT });
      if (!usableCode(link, hash, now) || link.parentUserId === null || link.studentUserId !== null) {
        throw AppError.validation({ code: [INVALID_CODE] }, INVALID_CODE);
      }
      const parentUserId = link.parentUserId;
      if (parentUserId === actor.userId) throw AppError.validation({ code: ["You can't link your account to itself."] });
      const parent = await tx.user.findUnique({ where: { id: parentUserId }, select: { status: true, roles: true } });
      if (!isActiveWithRole(parent, "PARENT")) throw AppError.validation({ code: [INVALID_CODE] }, INVALID_CODE);

      await activateCodeLink({
        tx,
        link,
        hash,
        parentUserId,
        studentUserId: actor.userId,
        basis: "STUDENT_APPROVAL",
        relationship: link.relationship,
        permissions,
        actor,
        meta,
        now,
      });
      const childName = await profileName(tx, actor.userId, "Your child");
      await createNotification(
        parentUserId,
        {
          type: "parent.link_accepted",
          title: `${childName} is now linked`,
          body: `${childName} entered your link code. You can now follow their progress.`,
          data: { href: `/parent/children/${actor.userId}` },
          dedupeKey: `parent_link:${link.id}:accepted`,
        },
        { client: tx },
      );
      return { linkId: link.id, parentUserId };
    });
  } catch (error) {
    if (isUniqueViolation(error)) throw AppError.conflict("You're already linked to each other.");
    throw error;
  }
}

// =====================================================================================================================
// Requests by contact (flow c)
// =====================================================================================================================

const requestInputSchema = z.object({
  identifier: z
    .string({ error: "Enter your child's email, phone number or username." })
    .trim()
    .min(3, { error: "Enter your child's email, phone number or username." })
    .max(254, { error: "That is too long." }),
  relationship: relationshipSchema.default("PARENT"),
});

/** The single answer to every request, whether or not an account matched (no account enumeration). */
export const LINK_REQUEST_SENT_MESSAGE =
  "Request sent. If that matches a student account, they will see it in their Family page and can approve it.";

/**
 * Flow (c): a parent asks to link by the student's email, phone or username. Creates a PENDING episode (expires after
 * 14 days) and an in-app notification for the student. ALWAYS resolves the same way, whether an account matched,
 * a request was already pending or the pair is already linked, so the form cannot be used to discover accounts.
 * Rate-limited per parent.
 */
export async function requestLinkByContact(
  actor: FamilyActor,
  input: { identifier: unknown; relationship?: unknown },
  options: { now?: Date } = {},
): Promise<{ message: string }> {
  assertParent(actor);
  const parsed = requestInputSchema.safeParse({ identifier: input.identifier, relationship: input.relationship ?? undefined });
  if (!parsed.success) throw AppError.fromZod(parsed.error);
  const identifier = parseLoginIdentifier(parsed.data.identifier);
  if (identifier === null) {
    throw AppError.validation({ identifier: ["Enter a valid email address, phone number (e.g. 0771234567) or username."] });
  }
  await assertFamilyRateLimits(
    [
      { name: "linkRequest", subject: actor.userId },
      { name: "linkRequestDaily", subject: actor.userId },
    ],
    "You've sent several requests. Please wait a while before sending another.",
  );
  const now = options.now ?? new Date();
  const where =
    identifier.kind === "email"
      ? { emailNormalized: identifier.value }
      : identifier.kind === "phone"
        ? { phoneE164: identifier.value }
        : { loginUsername: identifier.value };
  const student = await db.user.findUnique({ where, select: { id: true, status: true, roles: true } });
  if (!student || student.id === actor.userId || !isActiveWithRole(student, "STUDENT")) {
    return { message: LINK_REQUEST_SENT_MESSAGE };
  }

  try {
    await db.$transaction(async (tx) => {
      const open = await tx.parentStudentLink.findFirst({
        where: { parentUserId: actor.userId, studentUserId: student.id, status: { in: [...OPEN_STATUSES] } },
        select: { id: true, status: true, inviteExpiresAt: true },
      });
      if (open?.status === "ACTIVE") return;
      if (open && (open.inviteExpiresAt === null || open.inviteExpiresAt.getTime() > now.getTime())) return; // still pending
      if (open) {
        await tx.parentStudentLink.update({
          where: { id: open.id },
          data: { status: "REVOKED", revokedAt: now, revokedById: actor.userId, revokeReason: "expired", inviteCodeHash: null },
        });
      }
      const link = await tx.parentStudentLink.create({
        data: {
          parentUserId: actor.userId,
          studentUserId: student.id,
          status: "PENDING",
          relationship: parsed.data.relationship,
          initiatedBy: "PARENT",
          inviteExpiresAt: linkRequestExpiry(now),
          createdAt: now,
        },
        select: { id: true },
      });
      const parentName = await profileName(tx, actor.userId, "Someone");
      await createNotification(
        student.id,
        {
          type: "parent.link_request",
          title: "A parent asked to follow your progress",
          body: `${parentName} asked to see your progress. Only accept if you know them. Review the request in Family.`,
          data: { href: "/app/family", linkId: link.id },
          dedupeKey: `parent_link:${link.id}:request`,
        },
        { client: tx },
      );
    });
  } catch (error) {
    // A concurrent duplicate request hit the one-open-episode unique: the earlier one stands. Same answer.
    if (!isUniqueViolation(error)) throw error;
    logger.info("family: duplicate link request ignored", { parentUserId: actor.userId });
  }
  return { message: LINK_REQUEST_SENT_MESSAGE };
}

const respondSchema = z.object({
  linkId: linkIdSchema,
  decision: z.enum(["accept", "decline"], { error: "Choose accept or decline." }),
});

/**
 * Flow (c), student side: accepts (→ ACTIVE, basis STUDENT_APPROVAL, with the chosen permissions) or declines
 * (→ DECLINED, terminal; the parent is not told) a parent's pending request.
 */
export async function respondToLinkRequest(
  actor: FamilyActor,
  input: { linkId: unknown; decision: unknown; permissions?: unknown },
  meta?: FamilyRequestMeta | null,
  options: { now?: Date } = {},
): Promise<{ linkId: string; status: "ACTIVE" | "DECLINED" }> {
  assertStudent(actor);
  const parsed = respondSchema.safeParse({ linkId: input.linkId, decision: input.decision });
  if (!parsed.success) throw AppError.fromZod(parsed.error);
  const permissions = parsePermissions(input.permissions);
  const now = options.now ?? new Date();
  const { linkId, decision } = parsed.data;

  try {
    return await db.$transaction(async (tx) => {
      const link = await tx.parentStudentLink.findFirst({
        where: { id: linkId, studentUserId: actor.userId, status: "PENDING", initiatedBy: "PARENT", parentUserId: { not: null } },
        select: LINK_SELECT,
      });
      if (!link || link.parentUserId === null) throw AppError.notFound("We couldn't find that request. It may have been cancelled.");
      if (link.inviteExpiresAt !== null && link.inviteExpiresAt.getTime() <= now.getTime()) {
        throw AppError.conflict("This request has expired. Your parent can send a new one.");
      }
      const parentUserId = link.parentUserId;

      if (decision === "decline") {
        const updated = await tx.parentStudentLink.updateMany({
          where: { id: link.id, status: "PENDING" },
          data: { status: "DECLINED", inviteCodeHash: null },
        });
        if (updated.count !== 1) throw AppError.conflict("This request was already answered.");
        return { linkId: link.id, status: "DECLINED" as const };
      }

      const parent = await tx.user.findUnique({ where: { id: parentUserId }, select: { status: true, roles: true } });
      if (!isActiveWithRole(parent, "PARENT")) throw AppError.conflict("This parent account can't be linked right now.");
      await assertLinkCapacity(tx, parentUserId, actor.userId);
      const consentAt = notBefore(now, link.createdAt);
      const updated = await tx.parentStudentLink.updateMany({
        where: { id: link.id, status: "PENDING" },
        data: {
          status: "ACTIVE",
          consentBasis: "STUDENT_APPROVAL",
          studentConsentAt: consentAt,
          activatedAt: consentAt,
          ...permissionData(permissions),
        },
      });
      if (updated.count !== 1) throw AppError.conflict("This request was already answered.");
      await markParentOnboarded(tx, parentUserId, now);
      await auditInTx(tx, {
        ...auditBase(actor, meta),
        action: AUDIT_ACTIONS.PARENT_LINK_ACTIVATE,
        entityType: "ParentStudentLink",
        entityId: link.id,
        targetUserId: actor.userId,
        metadata: { basis: "STUDENT_APPROVAL", ...permissions },
      });
      const childName = await profileName(tx, actor.userId, "Your child");
      await createNotification(
        parentUserId,
        {
          type: "parent.link_accepted",
          title: `${childName} accepted your request`,
          body: `You can now follow ${childName}'s progress.`,
          data: { href: `/parent/children/${actor.userId}` },
          dedupeKey: `parent_link:${link.id}:accepted`,
        },
        { client: tx },
      );
      return { linkId: link.id, status: "ACTIVE" as const };
    });
  } catch (error) {
    if (isUniqueViolation(error)) throw AppError.conflict("You're already linked to this parent.");
    throw error;
  }
}

// =====================================================================================================================
// Ending links (either side)
// =====================================================================================================================

/**
 * Ends an ACTIVE link or cancels a PENDING one (an unused code, a request). Either side may do it; the row becomes
 * REVOKED (terminal) with who and when, AI-conversation access is switched off with it, and an audit entry is written
 * in the same transaction. Re-linking later starts a new episode with fresh consent.
 */
export async function revokeLink(
  actor: FamilyActor,
  input: { linkId: unknown; reason?: unknown },
  meta?: FamilyRequestMeta | null,
  options: { now?: Date } = {},
): Promise<{ linkId: string; previousStatus: "PENDING" | "ACTIVE" }> {
  const linkId = parseLinkId(input.linkId);
  const reason = revokeReasonSchema.safeParse(typeof input.reason === "string" ? input.reason : undefined);
  if (!reason.success) throw AppError.fromZod(reason.error);
  const now = options.now ?? new Date();

  return db.$transaction(async (tx) => {
    const link = await tx.parentStudentLink.findFirst({
      where: { id: linkId, OR: [{ parentUserId: actor.userId }, { studentUserId: actor.userId }] },
      select: LINK_SELECT,
    });
    if (!link) throw AppError.notFound("We couldn't find that link.");
    if (link.status !== "ACTIVE" && link.status !== "PENDING") throw AppError.conflict("This link has already ended.");
    const updated = await tx.parentStudentLink.updateMany({
      where: { id: link.id, status: link.status },
      data: {
        status: "REVOKED",
        revokedAt: now,
        revokedById: actor.userId,
        revokeReason: reason.data,
        inviteCodeHash: null,
        canViewAiConversations: false,
      },
    });
    if (updated.count !== 1) throw AppError.conflict("This link has already ended.");
    await auditInTx(tx, {
      ...auditBase(actor, meta),
      action: AUDIT_ACTIONS.PARENT_LINK_REVOKE,
      entityType: "ParentStudentLink",
      entityId: link.id,
      targetUserId: link.studentUserId,
      metadata: {
        by: link.studentUserId === actor.userId ? "student" : "parent",
        previousStatus: link.status,
        hadReason: reason.data !== null,
      },
    });
    return { linkId: link.id, previousStatus: link.status };
  });
}

// =====================================================================================================================
// What the parent may see (student only)
// =====================================================================================================================

async function loadOwnActiveLink(tx: Tx, actor: FamilyActor, linkId: string) {
  const link = await tx.parentStudentLink.findFirst({
    where: { id: linkId, studentUserId: actor.userId, status: "ACTIVE" },
    select: {
      ...LINK_SELECT,
      canViewProgress: true,
      canViewStudyActivity: true,
      canViewTestResults: true,
      aiConversationsConsentAt: true,
    },
  });
  if (!link) throw AppError.notFound("We couldn't find that parent link.");
  return link;
}

/** The student changes what one linked parent may see (§21). Changes are audited as consent grants / withdrawals. */
export async function updateLinkPermissions(
  actor: FamilyActor,
  input: { linkId: unknown; permissions: unknown },
  meta?: FamilyRequestMeta | null,
): Promise<LinkPermissions> {
  assertStudent(actor);
  const linkId = parseLinkId(input.linkId);
  const next = parsePermissions(input.permissions ?? {});
  return db.$transaction(async (tx) => {
    const link = await loadOwnActiveLink(tx, actor, linkId);
    const before: LinkPermissions = {
      progress: link.canViewProgress,
      activity: link.canViewStudyActivity,
      results: link.canViewTestResults,
    };
    const granted = (Object.keys(next) as (keyof LinkPermissions)[]).filter((key) => next[key] && !before[key]);
    const withdrawn = (Object.keys(next) as (keyof LinkPermissions)[]).filter((key) => !next[key] && before[key]);
    if (granted.length === 0 && withdrawn.length === 0) return before;
    await tx.parentStudentLink.update({ where: { id: link.id }, data: permissionData(next) });
    await auditInTx(tx, {
      ...auditBase(actor, meta),
      action: AUDIT_ACTIONS.PARENT_LINK_PERMISSIONS_UPDATE,
      entityType: "ParentStudentLink",
      entityId: link.id,
      targetUserId: actor.userId,
      before,
      after: next,
      metadata: { granted: granted.join(","), withdrawn: withdrawn.join(",") },
    });
    return next;
  });
}

/** Injectable platform switch (tests); default `privacy.parentAiAccess.enabled`. */
export interface AiAccessOptions {
  isParentAiAccessEnabled?: () => Promise<boolean>;
  now?: Date;
}

/**
 * The student's separate, explicit consent for ONE linked parent to read their AI tutor / solver conversations.
 * Turning it ON requires: the platform switch `privacy.parentAiAccess.enabled`, an ACTIVE link the student consented
 * to themself (code / approval; never a school or staff record), and `confirmed === true` from the consent screen.
 * Turning it OFF is always allowed and takes effect at once (the database policy reads the flag on every query).
 */
export async function setAiConversationAccess(
  actor: FamilyActor,
  input: { linkId: unknown; allow: unknown; confirmed?: unknown },
  meta?: FamilyRequestMeta | null,
  options: AiAccessOptions = {},
): Promise<{ allowed: boolean }> {
  assertStudent(actor);
  const linkId = parseLinkId(input.linkId);
  const allow = input.allow === true;
  const now = options.now ?? new Date();
  if (allow) {
    const enabled = await (options.isParentAiAccessEnabled ?? getParentAiAccessEnabled)();
    if (!enabled) throw AppError.forbidden("Sharing AI conversations with parents isn't available.");
    if (input.confirmed !== true) {
      throw AppError.validation({ confirmed: ["Tick the box to confirm you understand what will be shared."] });
    }
  }
  return db.$transaction(async (tx) => {
    const link = await loadOwnActiveLink(tx, actor, linkId);
    if (allow && (link.consentBasis === null || !STUDENT_CONSENT_BASES.includes(link.consentBasis))) {
      throw AppError.forbidden("AI conversations can only be shared with a parent you linked yourself.");
    }
    if (link.canViewAiConversations === allow) return { allowed: allow };
    const consentFloor = link.studentConsentAt ?? link.createdAt;
    await tx.parentStudentLink.update({
      where: { id: link.id },
      data: allow
        ? { canViewAiConversations: true, aiConversationsConsentAt: notBefore(now, consentFloor) }
        : { canViewAiConversations: false, aiConversationsConsentAt: null },
    });
    await auditInTx(tx, {
      ...auditBase(actor, meta),
      action: AUDIT_ACTIONS.PARENT_LINK_AI_CONSENT,
      entityType: "ParentStudentLink",
      entityId: link.id,
      targetUserId: actor.userId,
      metadata: { allowed: allow },
    });
    return { allowed: allow };
  });
}
