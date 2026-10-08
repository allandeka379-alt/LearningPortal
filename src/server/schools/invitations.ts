import "server-only";
import type { InvitationKind, Role, SchoolMemberRole, SchoolStatus } from "@/generated/prisma/client";
import { APP_NAME } from "@/lib/config";
import { maskIdentifier, parseContactIdentifier } from "@/server/auth/identifiers";
import { grantableRoles, hasPermission } from "@/server/auth/permissions";
import { OPERATING_SCHOOL_STATUSES } from "@/server/auth/session-policy";
import { db, type DbClient } from "@/server/db";
import { auditInTx } from "@/server/lib/audit";
import { randomToken, sha256Hex } from "@/server/lib/crypto";
import { getEnv } from "@/server/lib/env";
import { AppError } from "@/server/lib/errors";
import { adminContactSendLimits, assertRateLimit } from "@/server/lib/rate-limit";
import { sendToContact, type ContactChannel, type ContactNotSentReason } from "@/server/messaging";
import { createNotification } from "@/server/notifications";
import { assertSchoolAdmin, isOperatingSchoolStatus, isUuid, parseInput, schoolAuditActor, type SchoolActor, type SchoolRequestMeta } from "./access";
import { SCHOOL_AUDIT, SCHOOL_AUDIT_OPERATIONS } from "./audit";
import { invitationState, personName, SCHOOL_INVITATION_TTL_DAYS, type InvitationState, type SchoolInvitableRole } from "./core";
import { assertSchoolLimit } from "./limits";
import { invitationActionSchema, inviteMemberSchema } from "./schemas";

/**
 * School invitations (§23 "manage teachers, manage students"; ARCHITECTURE §3.3 `/invite/[token]`).
 *
 * School admin side ({@link inviteSchoolMember}): a teacher or student is ALWAYS invited by a link for their own
 * email / phone (32 random bytes, only the SHA-256 is stored, 14 days). The link is emailed to an email address
 * (account email: always sent, owner decision 2026-10-07); a phone number gets an SMS only while SMS is switched on
 * (`features.sms`, off by default). Either way the admin gets the link back once (`inviteLink`) to share it
 * themselves (copy, WhatsApp on their own phone, read it out). The admin sees the same
 * "invited" outcome whether or not an account exists, so the form cannot be used to discover accounts; nobody joins a
 * school (and so exposes their learning data to it) without accepting. An account that already has that VERIFIED
 * email / phone also gets an in-app notice and can accept from `/invite` without the link. School admins can never
 * invite another SCHOOL_ADMIN (that is a staff grant, ARCHITECTURE §5.2).
 *
 * Invitee side ({@link getInvitationPreview}, {@link acceptInvitation}, {@link listMyPendingInvitations},
 * {@link declineInvitation}): the invitation must be open (not accepted, revoked or expired) and its school operating.
 * - SCHOOL_MEMBER TEACHER: student accounts are refused; the TEACHER role (and its extension row) is granted on accept.
 * - SCHOOL_MEMBER STUDENT: student accounts only.
 * - SCHOOL_MEMBER SCHOOL_ADMIN and STAFF_ROLE (staff-issued): the signed-in account must own the invited email / phone
 *   (verified), and for STAFF_ROLE the inviter must still be allowed to grant that role.
 * - CLASS_MEMBER: handled by the teacher area's class-invitation page (`/app/classes/invite/[token]`).
 * Accepting creates or re-activates the membership and closes the invitation in one transaction, audited.
 */

const DAY_MS = 86_400_000;
const TOKEN_PATTERN = /^[A-Za-z0-9_-]{32,64}$/;

export const ROLE_LABELS: Readonly<Record<SchoolMemberRole, string>> = {
  SCHOOL_ADMIN: "school admin",
  TEACHER: "teacher",
  STUDENT: "student",
};

export function invitationLink(token: string): string {
  return new URL(`/invite/${token}`, getEnv().APP_URL).toString();
}

/** How an invitation reached (or did not reach) the invitee; the admin always gets the link to share. */
export interface InvitationDelivery {
  /** Masked email / phone the invitation is for. */
  sentTo: string;
  /** True when the platform delivered the link (by email; by SMS only while SMS is switched on). */
  delivered: boolean;
  /** Channel used for that contact. */
  channel: ContactChannel;
  /** Why nothing was delivered: a phone number while SMS is switched off, or the provider failed. */
  notSentReason: ContactNotSentReason | null;
  /** The invitation link (shown once to the admin, never stored in plain text). */
  inviteLink: string;
}

async function deliver(target: string, schoolName: string, role: SchoolMemberRole, token: string): Promise<InvitationDelivery> {
  const inviteLink = invitationLink(token);
  const outcome = await sendToContact(target, {
    subject: `You're invited to ${schoolName} on ${APP_NAME}`,
    text:
      `${schoolName} invited you to join as a ${ROLE_LABELS[role]} on ${APP_NAME}. ` +
      `Sign in (or create an account) and accept here: ${inviteLink} . ` +
      `The link works for ${SCHOOL_INVITATION_TTL_DAYS} days. If you weren't expecting this, you can ignore it.`,
    tag: "school.invitation",
    sensitive: true,
  });
  return {
    sentTo: maskIdentifier(target),
    delivered: outcome.status === "sent",
    channel: outcome.channel,
    notSentReason: outcome.status === "sent" ? null : outcome.reason,
    inviteLink,
  };
}

async function accountForContact(target: string, client: DbClient = db): Promise<{ id: string; verified: boolean } | null> {
  const isEmail = target.includes("@");
  const user = await client.user.findUnique({
    where: isEmail ? { emailNormalized: target } : { phoneE164: target },
    select: { id: true, status: true, emailVerifiedAt: true, phoneVerifiedAt: true },
  });
  if (!user || user.status !== "ACTIVE") return null;
  return { id: user.id, verified: isEmail ? user.emailVerifiedAt !== null : user.phoneVerifiedAt !== null };
}

// =====================================================================================================================
// School admin side
// =====================================================================================================================

export interface InviteResult extends InvitationDelivery {
  outcome: "invited" | "reinvited";
  invitationId: string;
}

/** Invites a teacher or student by email / phone (see the module docs). */
export async function inviteSchoolMember(actor: SchoolActor, input: unknown, meta?: SchoolRequestMeta, options: { now?: Date } = {}): Promise<InviteResult> {
  const data = parseInput(inviteMemberSchema, input);
  const school = await assertSchoolAdmin(actor, data.schoolId);
  const contact = parseContactIdentifier(data.contact);
  if (contact === null) throw AppError.validation({ contact: ["Enter a valid email address (or mobile number)."] });
  const now = options.now ?? new Date();

  // Already on this school's roster with this role: say so (the admin sees their own roster anyway).
  const existing = await accountForContact(contact.value);
  if (existing) {
    const member = await db.schoolMember.findUnique({
      where: { schoolId_userId_role: { schoolId: school.schoolId, userId: existing.id, role: data.role } },
      select: { status: true },
    });
    if (member?.status === "ACTIVE") throw AppError.conflict(`This person is already a ${ROLE_LABELS[data.role]} at your school.`);
  }

  await assertSchoolLimit("invite", actor.userId, "You have sent a lot of invitations. Please try again in an hour.");
  for (const limit of adminContactSendLimits(contact.value)) {
    await assertRateLimit(limit, "An invitation was sent to this address recently. Please try again later.");
  }

  const token = randomToken(32);
  const tokenHash = sha256Hex(token);
  const expiresAt = new Date(now.getTime() + SCHOOL_INVITATION_TTL_DAYS * DAY_MS);
  const channel = contact.kind === "email" ? ("EMAIL" as const) : ("SMS" as const);

  const result = await db.$transaction(async (tx) => {
    const pending = await tx.invitation.findFirst({
      where: { kind: "SCHOOL_MEMBER", schoolId: school.schoolId, schoolRole: data.role, target: contact.value, acceptedAt: null, revokedAt: null, expiresAt: { gt: now } },
      select: { id: true, sendCount: true },
    });
    const invitation = pending
      ? await tx.invitation.update({
          where: { id: pending.id },
          data: { tokenHash, expiresAt, lastSentAt: now, sendCount: Math.min(32_767, pending.sendCount + 1), invitedById: actor.userId },
          select: { id: true },
        })
      : await tx.invitation.create({
          data: { kind: "SCHOOL_MEMBER", schoolId: school.schoolId, schoolRole: data.role, channel, target: contact.value, tokenHash, invitedById: actor.userId, expiresAt, lastSentAt: now },
          select: { id: true },
        });
    await auditInTx(tx, {
      ...schoolAuditActor(actor),
      action: pending ? SCHOOL_AUDIT.INVITATION_RESEND : SCHOOL_AUDIT.INVITATION_CREATE,
      entityType: "Invitation",
      entityId: invitation.id,
      schoolId: school.schoolId,
      after: { role: data.role, channel, expiresAt: expiresAt.toISOString() },
      metadata: { operation: data.role === "TEACHER" ? SCHOOL_AUDIT_OPERATIONS.teacherInvite : SCHOOL_AUDIT_OPERATIONS.studentInvite },
      request: meta ?? null,
    });
    if (existing?.verified) {
      await createNotification(
        existing.id,
        {
          type: "account.school_invitation",
          category: "ACCOUNT",
          title: `Invitation to join ${school.name}`.slice(0, 200),
          body: `${school.name} invited you to join as a ${ROLE_LABELS[data.role]}. Open your invitations to accept or decline.`.slice(0, 2_000),
          data: { href: "/invite", entityType: "Invitation", entityId: invitation.id },
          dedupeKey: `school-invite:${invitation.id}:${now.getTime()}`,
        },
        { client: tx },
      );
    }
    return { invitationId: invitation.id, outcome: pending ? ("reinvited" as const) : ("invited" as const) };
  });
  return { ...result, ...(await deliver(contact.value, school.name, data.role, token)) };
}

export interface SchoolInvitationItem {
  id: string;
  role: SchoolMemberRole | null;
  channel: string;
  targetMasked: string;
  state: InvitationState;
  sendCount: number;
  invitedBy: string | null;
  lastSentAt: Date | null;
  expiresAt: Date;
  createdAt: Date;
  /** The school admin may resend / withdraw it (teacher and student invitations only). */
  manageable: boolean;
}

/** The school's recent membership invitations (newest first, at most 50), targets masked. */
export async function listSchoolInvitations(
  actor: SchoolActor,
  input: { schoolId: string; role?: SchoolInvitableRole; pendingOnly?: boolean },
  options: { now?: Date } = {},
): Promise<SchoolInvitationItem[]> {
  const school = await assertSchoolAdmin(actor, input.schoolId);
  const now = options.now ?? new Date();
  const rows = await db.invitation.findMany({
    where: {
      kind: "SCHOOL_MEMBER",
      schoolId: school.schoolId,
      ...(input.role ? { schoolRole: input.role } : {}),
      ...(input.pendingOnly ? { acceptedAt: null, revokedAt: null, expiresAt: { gt: now } } : {}),
    },
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    take: 50,
    select: {
      id: true,
      schoolRole: true,
      channel: true,
      target: true,
      acceptedAt: true,
      revokedAt: true,
      expiresAt: true,
      sendCount: true,
      lastSentAt: true,
      createdAt: true,
      invitedBy: { select: { profile: { select: { displayName: true, firstName: true, lastName: true } } } },
    },
  });
  return rows.map((row) => {
    const state = invitationState(row, now);
    return {
      id: row.id,
      role: row.schoolRole,
      channel: row.channel,
      targetMasked: row.target ? maskIdentifier(row.target) : "—",
      state,
      sendCount: row.sendCount,
      invitedBy: row.invitedBy ? personName(row.invitedBy.profile, "Staff") : null,
      lastSentAt: row.lastSentAt,
      expiresAt: row.expiresAt,
      createdAt: row.createdAt,
      manageable: (row.schoolRole === "TEACHER" || row.schoolRole === "STUDENT") && (state === "PENDING" || state === "EXPIRED"),
    };
  });
}

async function loadManageableInvitation(actor: SchoolActor, input: unknown) {
  const data = parseInput(invitationActionSchema, input);
  const school = await assertSchoolAdmin(actor, data.schoolId);
  const invitation = await db.invitation.findFirst({
    where: { id: data.invitationId, schoolId: school.schoolId, kind: "SCHOOL_MEMBER", schoolRole: { in: ["TEACHER", "STUDENT"] } },
    select: { id: true, target: true, schoolRole: true, acceptedAt: true, revokedAt: true, sendCount: true },
  });
  if (!invitation) throw AppError.notFound("Invitation not found.");
  return { school, invitation };
}

/** Sends a pending (or expired) invitation again with a fresh link (the old one stops working) and a new window. */
export async function resendSchoolInvitation(actor: SchoolActor, input: unknown, meta?: SchoolRequestMeta, options: { now?: Date } = {}): Promise<InvitationDelivery> {
  const { school, invitation } = await loadManageableInvitation(actor, input);
  if (invitation.acceptedAt || invitation.revokedAt || !invitation.target) throw AppError.conflict("This invitation was already accepted or withdrawn.");
  const target = invitation.target;
  const role = invitation.schoolRole as SchoolInvitableRole;
  await assertSchoolLimit("invite", actor.userId, "You have sent a lot of invitations. Please try again in an hour.");
  for (const limit of adminContactSendLimits(target)) await assertRateLimit(limit, "An invitation was sent to this address recently. Please try again later.");
  const now = options.now ?? new Date();
  const token = randomToken(32);
  await db.$transaction(async (tx) => {
    const updated = await tx.invitation.updateMany({
      where: { id: invitation.id, acceptedAt: null, revokedAt: null },
      data: { tokenHash: sha256Hex(token), expiresAt: new Date(now.getTime() + SCHOOL_INVITATION_TTL_DAYS * DAY_MS), lastSentAt: now, sendCount: Math.min(32_767, invitation.sendCount + 1) },
    });
    if (updated.count === 0) throw AppError.conflict("This invitation was already accepted or withdrawn.");
    await auditInTx(tx, {
      ...schoolAuditActor(actor),
      action: SCHOOL_AUDIT.INVITATION_RESEND,
      entityType: "Invitation",
      entityId: invitation.id,
      schoolId: school.schoolId,
      metadata: { role },
      request: meta ?? null,
    });
  });
  return deliver(target, school.name, role, token);
}

/** Withdraws an invitation (its link stops working; the stored contact is cleared). */
export async function revokeSchoolInvitation(actor: SchoolActor, input: unknown, meta?: SchoolRequestMeta): Promise<void> {
  const { school, invitation } = await loadManageableInvitation(actor, input);
  await db.$transaction(async (tx) => {
    const updated = await tx.invitation.updateMany({
      where: { id: invitation.id, acceptedAt: null, revokedAt: null },
      data: { revokedAt: new Date(), target: null },
    });
    if (updated.count === 0) throw AppError.conflict("This invitation was already accepted or withdrawn.");
    await auditInTx(tx, {
      ...schoolAuditActor(actor),
      action: SCHOOL_AUDIT.INVITATION_REVOKE,
      entityType: "Invitation",
      entityId: invitation.id,
      schoolId: school.schoolId,
      metadata: { role: invitation.schoolRole },
      request: meta ?? null,
    });
  });
}

// =====================================================================================================================
// Invitee side
// =====================================================================================================================

const INVITATION_SELECT = {
  id: true,
  kind: true,
  schoolId: true,
  classId: true,
  schoolRole: true,
  platformRole: true,
  target: true,
  expiresAt: true,
  acceptedAt: true,
  revokedAt: true,
  invitedById: true,
  createdAt: true,
  school: { select: { name: true, status: true } },
  class: { select: { name: true, archivedAt: true } },
} as const;

interface InvitationRow {
  id: string;
  kind: InvitationKind;
  schoolId: string | null;
  classId: string | null;
  schoolRole: SchoolMemberRole | null;
  platformRole: Role | null;
  target: string | null;
  expiresAt: Date;
  acceptedAt: Date | null;
  revokedAt: Date | null;
  invitedById: string | null;
  createdAt: Date;
  school: { name: string; status: SchoolStatus } | null;
  class: { name: string; archivedAt: Date | null } | null;
}

export type InvitationPreview =
  | { state: "INVALID" }
  | { state: Exclude<InvitationState, "PENDING">; kind: InvitationKind }
  | {
      state: "PENDING";
      kind: InvitationKind;
      schoolName: string | null;
      className: string | null;
      schoolRole: SchoolMemberRole | null;
      platformRole: Role | null;
      /** Masked email / phone the invitation was sent to. */
      sentTo: string | null;
      expiresAt: Date;
      /** The school can take members now (ACTIVE or PENDING_VERIFICATION). */
      schoolOperating: boolean;
      /** The accepting account must own the invited email / phone (school admin and staff invitations). */
      requiresMatchingContact: boolean;
    };

function isWellFormedToken(token: unknown): token is string {
  return typeof token === "string" && TOKEN_PATTERN.test(token);
}

async function findByToken(token: string): Promise<InvitationRow | null> {
  if (!isWellFormedToken(token)) return null;
  return db.invitation.findUnique({ where: { tokenHash: sha256Hex(token) }, select: INVITATION_SELECT });
}

function requiresMatchingContact(row: Pick<InvitationRow, "kind" | "schoolRole">): boolean {
  return row.kind === "STAFF_ROLE" || (row.kind === "SCHOOL_MEMBER" && row.schoolRole === "SCHOOL_ADMIN");
}

/** What an invitation link shows before signing in (no personal data beyond the masked contact). */
export async function getInvitationPreview(token: string, options: { now?: Date } = {}): Promise<InvitationPreview> {
  const row = await findByToken(token);
  if (!row) return { state: "INVALID" };
  const state = invitationState(row, options.now ?? new Date());
  if (state !== "PENDING") return { state, kind: row.kind };
  return {
    state,
    kind: row.kind,
    schoolName: row.school?.name ?? null,
    className: row.class?.name ?? null,
    schoolRole: row.schoolRole,
    platformRole: row.platformRole,
    sentTo: row.target ? maskIdentifier(row.target) : null,
    expiresAt: row.expiresAt,
    schoolOperating: row.kind !== "SCHOOL_MEMBER" || isOperatingSchoolStatus(row.school?.status),
    requiresMatchingContact: requiresMatchingContact(row),
  };
}

interface AcceptingUser {
  id: string;
  roles: Role[];
  hasStudent: boolean;
  hasTeacher: boolean;
  verifiedContacts: string[];
}

async function loadAcceptingUser(client: DbClient, userId: string): Promise<AcceptingUser> {
  const user = await client.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      status: true,
      roles: true,
      emailNormalized: true,
      emailVerifiedAt: true,
      phoneE164: true,
      phoneVerifiedAt: true,
      student: { select: { userId: true } },
      teacher: { select: { userId: true } },
    },
  });
  if (!user || user.status !== "ACTIVE") throw AppError.forbidden("This account can't accept invitations right now.");
  return {
    id: user.id,
    roles: user.roles,
    hasStudent: user.student !== null,
    hasTeacher: user.teacher !== null,
    verifiedContacts: [user.emailVerifiedAt ? user.emailNormalized : null, user.phoneVerifiedAt ? user.phoneE164 : null].filter((v): v is string => v !== null),
  };
}

export interface AcceptResult {
  kind: InvitationKind;
  /** Where to continue. */
  redirectTo: string;
  schoolId: string | null;
}

function assertOpen(row: InvitationRow, now: Date): void {
  const state = invitationState(row, now);
  if (state === "ACCEPTED") throw AppError.conflict("This invitation has already been used.");
  if (state === "REVOKED") throw AppError.notFound("This invitation was withdrawn. Ask for a new one.");
  if (state === "EXPIRED") throw AppError.notFound("This invitation has expired. Ask for a new one.");
}

async function acceptRow(actor: SchoolActor, row: InvitationRow, meta: SchoolRequestMeta, now: Date): Promise<AcceptResult> {
  assertOpen(row, now);
  if (row.kind === "CLASS_MEMBER") {
    // Class invitations are accepted on the class page (teacher area), which applies the class membership rules.
    throw new AppError("BAD_REQUEST", "Open this class invitation from the link in your message.");
  }
  const user = await loadAcceptingUser(db, actor.userId);
  if (requiresMatchingContact(row) && (row.target === null || !user.verifiedContacts.includes(row.target))) {
    throw AppError.forbidden(
      `This invitation was sent to ${row.target ? maskIdentifier(row.target) : "someone else"}. Sign in with the account that uses it (verified), then open the link again.`,
    );
  }

  if (row.kind === "STAFF_ROLE") return acceptStaffRole(user, row, meta, now);

  // SCHOOL_MEMBER
  if (!row.schoolId || !row.schoolRole || !isOperatingSchoolStatus(row.school?.status)) {
    throw AppError.forbidden("This school isn't accepting new members right now.");
  }
  const schoolId = row.schoolId;
  const role = row.schoolRole;
  const schoolName = row.school?.name ?? "the school";
  if (role === "STUDENT" && (!user.roles.includes("STUDENT") || !user.hasStudent)) {
    throw AppError.forbidden("This invitation is for a student account. Sign in with your student account, or create one.");
  }
  if (role === "TEACHER" && user.roles.includes("STUDENT")) {
    throw AppError.forbidden("Student accounts can't join a school as teachers. Sign in with a teacher account, or create one.");
  }

  await db.$transaction(async (tx) => {
    const claimed = await tx.invitation.updateMany({
      where: { id: row.id, acceptedAt: null, revokedAt: null, expiresAt: { gt: now } },
      data: { acceptedAt: now, acceptedByUserId: user.id, target: null },
    });
    if (claimed.count === 0) throw AppError.conflict("This invitation has already been used.");

    let teacherRoleGranted = false;
    if (role === "TEACHER" && !user.roles.includes("TEACHER")) {
      const roles: Role[] = [...user.roles, "TEACHER"];
      await tx.user.update({ where: { id: user.id }, data: { roles }, select: { id: true } });
      if (!user.hasTeacher) await tx.teacher.create({ data: { userId: user.id } });
      teacherRoleGranted = true;
      await auditInTx(tx, {
        actorUserId: user.id,
        actorRoles: user.roles,
        action: SCHOOL_AUDIT.ROLE_GRANT,
        entityType: "User",
        entityId: user.id,
        targetUserId: user.id,
        schoolId,
        before: { roles: user.roles },
        after: { roles },
        metadata: { role: "TEACHER", operation: SCHOOL_AUDIT_OPERATIONS.invitationAccept, invitationId: row.id, invitedById: row.invitedById },
        request: meta ?? null,
      });
    } else if (role === "TEACHER" && !user.hasTeacher) {
      await tx.teacher.create({ data: { userId: user.id } });
    }

    const previous = await tx.schoolMember.findUnique({
      where: { schoolId_userId_role: { schoolId, userId: user.id, role } },
      select: { id: true, status: true },
    });
    const member = await tx.schoolMember.upsert({
      where: { schoolId_userId_role: { schoolId, userId: user.id, role } },
      create: { schoolId, userId: user.id, role, status: "ACTIVE", source: "INVITE", invitedById: row.invitedById, invitedAt: row.createdAt, joinedAt: now },
      update:
        previous?.status === "ACTIVE"
          ? {}
          : { status: "ACTIVE", source: "INVITE", invitedById: row.invitedById, invitedAt: row.createdAt, joinedAt: now, removedAt: null, removedById: null },
      select: { id: true },
    });
    if (role === "STUDENT") {
      await tx.student.updateMany({ where: { userId: user.id, schoolId: null }, data: { schoolId } });
    }
    await auditInTx(tx, {
      actorUserId: user.id,
      actorRoles: user.roles,
      action: SCHOOL_AUDIT.MEMBER_ADD,
      entityType: "SchoolMember",
      entityId: member.id,
      schoolId,
      targetUserId: user.id,
      before: previous ? { status: previous.status } : undefined,
      after: { role, status: "ACTIVE" },
      metadata: { operation: SCHOOL_AUDIT_OPERATIONS.invitationAccept, invitationId: row.id, teacherRoleGranted },
      request: meta ?? null,
    });
    if (row.invitedById && row.invitedById !== user.id) {
      await createNotification(
        row.invitedById,
        {
          type: "account.school_invitation_accepted",
          category: "ACCOUNT",
          title: `A ${ROLE_LABELS[role]} joined ${schoolName}`.slice(0, 200),
          body: `Your invitation to join ${schoolName} as a ${ROLE_LABELS[role]} was accepted.`.slice(0, 2_000),
          data: { href: role === "STUDENT" ? "/school/students" : "/school/teachers", entityType: "SchoolMember", entityId: member.id },
          dedupeKey: `school-invite-accepted:${row.id}`,
        },
        { client: tx },
      );
    }
  });
  const redirectTo = role === "SCHOOL_ADMIN" ? "/school" : role === "TEACHER" ? "/teacher" : "/app";
  return { kind: row.kind, redirectTo, schoolId };
}

/** Staff invitation: the inviter must still be allowed to grant the role (ARCHITECTURE §5.2 roles.grant). */
async function acceptStaffRole(user: AcceptingUser, row: InvitationRow, meta: SchoolRequestMeta, now: Date): Promise<AcceptResult> {
  const role = row.platformRole;
  if (!role || role === "SCHOOL_ADMIN" || role === "STUDENT" || role === "PARENT") throw AppError.notFound("This invitation link is not valid.");
  if (user.roles.includes("STUDENT")) throw AppError.forbidden("Student accounts can't hold staff roles. Sign in with a separate staff account.");
  const inviter = row.invitedById
    ? await db.user.findUnique({ where: { id: row.invitedById }, select: { id: true, status: true, roles: true } })
    : null;
  const mayGrant =
    inviter !== null &&
    inviter.status === "ACTIVE" &&
    (role === "TEACHER" ? hasPermission(inviter, "users.manage") : grantableRoles(inviter).includes(role));
  if (!inviter || !mayGrant) throw AppError.forbidden("This invitation can no longer be accepted. Ask for a new one.");

  await db.$transaction(async (tx) => {
    const claimed = await tx.invitation.updateMany({
      where: { id: row.id, acceptedAt: null, revokedAt: null, expiresAt: { gt: now } },
      data: { acceptedAt: now, acceptedByUserId: user.id, target: null },
    });
    if (claimed.count === 0) throw AppError.conflict("This invitation has already been used.");
    if (!user.roles.includes(role)) {
      const roles: Role[] = [...user.roles, role];
      await tx.user.update({ where: { id: user.id }, data: { roles }, select: { id: true } });
      if (role === "TEACHER" && !user.hasTeacher) await tx.teacher.create({ data: { userId: user.id } });
      await auditInTx(tx, {
        actorUserId: inviter.id,
        actorRoles: inviter.roles,
        action: SCHOOL_AUDIT.ROLE_GRANT,
        entityType: "User",
        entityId: user.id,
        targetUserId: user.id,
        before: { roles: user.roles },
        after: { roles },
        metadata: { role, operation: SCHOOL_AUDIT_OPERATIONS.invitationAccept, invitationId: row.id, acceptedBy: user.id },
        request: meta ?? null,
      });
    }
  });
  return { kind: row.kind, redirectTo: role === "TEACHER" ? "/teacher" : "/admin", schoolId: null };
}

/** Accepts the invitation behind a link `token` for the signed-in user (see the module docs). */
export async function acceptInvitation(actor: SchoolActor, token: string, meta?: SchoolRequestMeta, options: { now?: Date } = {}): Promise<AcceptResult> {
  const row = await findByToken(token);
  if (!row) throw AppError.notFound("This invitation link is not valid.");
  return acceptRow(actor, row, meta ?? null, options.now ?? new Date());
}

export interface MyInvitation {
  id: string;
  schoolName: string;
  role: SchoolMemberRole;
  expiresAt: Date;
}

/** Open school invitations addressed to the signed-in user's VERIFIED email / phone (for `/invite`). */
export async function listMyPendingInvitations(actor: SchoolActor, options: { now?: Date } = {}): Promise<MyInvitation[]> {
  const now = options.now ?? new Date();
  const user = await loadAcceptingUser(db, actor.userId);
  if (user.verifiedContacts.length === 0) return [];
  const rows = await db.invitation.findMany({
    where: {
      kind: "SCHOOL_MEMBER",
      target: { in: user.verifiedContacts },
      acceptedAt: null,
      revokedAt: null,
      expiresAt: { gt: now },
      school: { status: { in: [...OPERATING_SCHOOL_STATUSES] } },
    },
    orderBy: { createdAt: "desc" },
    take: 20,
    select: { id: true, schoolRole: true, expiresAt: true, school: { select: { name: true } } },
  });
  return rows.flatMap((row) => (row.schoolRole && row.school ? [{ id: row.id, schoolName: row.school.name, role: row.schoolRole, expiresAt: row.expiresAt }] : []));
}

async function findMine(actor: SchoolActor, invitationId: string): Promise<InvitationRow> {
  if (!isUuid(invitationId)) throw AppError.notFound("Invitation not found.");
  const user = await loadAcceptingUser(db, actor.userId);
  const row = user.verifiedContacts.length
    ? await db.invitation.findFirst({ where: { id: invitationId, kind: "SCHOOL_MEMBER", target: { in: user.verifiedContacts } }, select: INVITATION_SELECT })
    : null;
  if (!row) throw AppError.notFound("Invitation not found.");
  return row;
}

/** Accepts one of {@link listMyPendingInvitations} by id. */
export async function acceptMyInvitation(actor: SchoolActor, invitationId: string, meta?: SchoolRequestMeta, options: { now?: Date } = {}): Promise<AcceptResult> {
  return acceptRow(actor, await findMine(actor, invitationId), meta ?? null, options.now ?? new Date());
}

/** Declines a school invitation (by link token or, for invitations to a verified contact, by id). It closes. */
export async function declineInvitation(actor: SchoolActor, ref: { token?: string; invitationId?: string }, options: { now?: Date } = {}): Promise<void> {
  const now = options.now ?? new Date();
  const row = ref.token !== undefined ? await findByToken(ref.token) : ref.invitationId !== undefined ? await findMine(actor, ref.invitationId) : null;
  if (!row || row.kind !== "SCHOOL_MEMBER") throw AppError.notFound("This invitation link is not valid.");
  assertOpen(row, now);
  await db.invitation.updateMany({ where: { id: row.id, acceptedAt: null, revokedAt: null }, data: { revokedAt: now, target: null } });
}
