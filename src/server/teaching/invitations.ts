import "server-only";
import type { SchoolStatus } from "@/generated/prisma/client";
import { APP_NAME } from "@/lib/config";
import { maskIdentifier, parseLoginIdentifier } from "@/server/auth/identifiers";
import { OPERATING_SCHOOL_STATUSES } from "@/server/auth/session-policy";
import { db } from "@/server/db";
import { AUDIT_ACTIONS, auditInTx, type AuditRequestInfo } from "@/server/lib/audit";
import { randomToken, sha256Hex } from "@/server/lib/crypto";
import { getEnv } from "@/server/lib/env";
import { AppError } from "@/server/lib/errors";
import { rateLimit, rateLimits } from "@/server/lib/rate-limit";
import { sendToContact, type ContactNotSentReason } from "@/server/messaging";
import { createNotification } from "@/server/notifications";
import { isOperatingSchool, loadClassForTeacher, type TeachingActor } from "./access";
import { CLASS_AUDIT } from "./classes";
import { rosterName } from "./core";
import { assertConsentAllowsClass, requireStudentAccount, upsertMembership } from "./membership";
import { addStudentsSchema, invitationRefSchema, invitationTokenSchema } from "./schemas";
import { parseWith } from "./validation";

/**
 * Adding students to a class (§22 "add students") and the student's side of class invitations.
 *
 * Teacher side ({@link addStudentsToClass}), per email / phone / school username:
 * - a student of the SAME school (ACTIVE STUDENT membership) is added at once — the school relationship is the basis
 *   (school usernames only ever resolve inside the class's own school);
 * - anyone else gets an Invitation (hashed token, 14 days): the link is emailed to an email address (account email,
 *   always sent; a phone number gets an SMS only while `features.sms` is on), plus an in-app notice when an account
 *   already uses it. The teacher always gets the link (and the class join code) back to share themselves. The student decides: nobody's learning data reaches a tutor or teacher until the
 *   student accepts (or joins with the code). The teacher sees the same "invited" outcome whether or not an account
 *   exists, so the form cannot be used to discover accounts.
 *
 * Student side: invitations addressed to the student's VERIFIED email / phone are listed in /app/classes, and an
 * invitation link (`/app/classes/invite/[token]`) works for the signed-in student who holds it. Accepting makes the
 * student an ACTIVE member; declining closes the invitation. Rate limits: invitations per recipient and per teacher.
 */

export const CLASS_INVITATION_TTL_DAYS = 14;
const DAY_MS = 86_400_000;

export type AddStudentOutcome =
  | { identifier: string; outcome: "added"; name: string }
  | { identifier: string; outcome: "already_member" }
  | {
      identifier: string;
      outcome: "invited";
      sentTo: string;
      /** True when the platform delivered the link (by email; by SMS only while SMS is switched on). */
      delivered: boolean;
      /** Why nothing was delivered (a phone number while SMS is switched off, or the provider failed). */
      notSentReason: ContactNotSentReason | null;
      /** The invitation link, for the teacher to share (shown once). */
      inviteLink: string;
      /** The class join code, when joining by code is on (another way in for the student). */
      joinCode: string | null;
    }
  | { identifier: string; outcome: "rejected"; message: string };

const USERNAME_REFUSAL = "No student with this username at your school.";

function invitationLink(token: string): string {
  return new URL(`/app/classes/invite/${token}`, getEnv().APP_URL).toString();
}

async function deliver(target: string, className: string, token: string): Promise<{ delivered: boolean; notSentReason: ContactNotSentReason | null }> {
  const outcome = await sendToContact(target, {
    subject: `You're invited to join ${className} on ${APP_NAME}`,
    text:
      `Your teacher invited you to join the class "${className}" on ${APP_NAME}. ` +
      `Sign in (or create a student account) and accept here: ${invitationLink(token)} . ` +
      `The link works for ${CLASS_INVITATION_TTL_DAYS} days. If you weren't expecting this, you can ignore it.`,
    tag: "teaching.class_invitation",
    sensitive: true,
  });
  return outcome.status === "sent" ? { delivered: true, notSentReason: null } : { delivered: false, notSentReason: outcome.reason };
}

/** Adds or invites up to 50 students (see the module header). Returns one outcome per identifier, in order. */
export async function addStudentsToClass(
  actor: TeachingActor,
  input: unknown,
  options: { now?: Date; request?: AuditRequestInfo | null } = {},
): Promise<{ results: AddStudentOutcome[] }> {
  const data = parseWith(addStudentsSchema, input);
  const cls = await loadClassForTeacher(actor, data.classId, { write: true });
  const now = options.now ?? new Date();
  const results: AddStudentOutcome[] = [];

  for (const raw of data.identifiers) {
    const identifier = parseLoginIdentifier(raw);
    if (identifier === null) {
      results.push({ identifier: raw, outcome: "rejected", message: "Not a valid email address, phone number or username." });
      continue;
    }
    const user = await db.user.findUnique({
      where:
        identifier.kind === "email"
          ? { emailNormalized: identifier.value }
          : identifier.kind === "phone"
            ? { phoneE164: identifier.value }
            : { loginUsername: identifier.value },
      select: {
        id: true,
        status: true,
        roles: true,
        profile: { select: { displayName: true, firstName: true, lastName: true } },
        student: { select: { userId: true } },
      },
    });
    const isStudent = user !== null && user.status === "ACTIVE" && user.roles.includes("STUDENT") && user.student !== null;
    const inSchool =
      isStudent && cls.schoolId !== null
        ? (await db.schoolMember.count({ where: { schoolId: cls.schoolId, userId: user.id, role: "STUDENT", status: "ACTIVE" } })) > 0
        : false;

    if (identifier.kind === "username" && !inSchool) {
      results.push({ identifier: raw, outcome: "rejected", message: USERNAME_REFUSAL });
      continue;
    }
    if (isStudent) {
      const membership = await db.classMember.findUnique({ where: { classId_userId: { classId: cls.id, userId: user.id } }, select: { status: true } });
      if (membership?.status === "ACTIVE") {
        results.push({ identifier: raw, outcome: "already_member" });
        continue;
      }
    }

    if (inSchool && user) {
      await db.$transaction(async (tx) => {
        await upsertMembership(tx, { classId: cls.id, userId: user.id, status: "ACTIVE", source: "ADDED_BY_STAFF", now });
        await auditInTx(tx, {
          actorUserId: actor.userId,
          actorRoles: actor.roles,
          action: CLASS_AUDIT.MEMBER_ADD,
          entityType: "ClassMember",
          entityId: cls.id,
          schoolId: cls.schoolId,
          targetUserId: user.id,
          after: { status: "ACTIVE" },
          metadata: { operation: "class_member.add", classId: cls.id, via: "school_roster" },
          request: options.request ?? null,
        });
        await createNotification(
          user.id,
          {
            type: "class.membership",
            category: "ACCOUNT",
            title: `You were added to ${cls.name}`.slice(0, 200),
            body: `Your teacher added you to ${cls.name}. Your work for this class appears under Classes.`.slice(0, 2_000),
            data: { href: `/app/classes/${cls.id}`, entityType: "Class", entityId: cls.id },
            dedupeKey: `class-added:${cls.id}:${now.getTime()}`,
          },
          { client: tx },
        );
      });
      results.push({ identifier: raw, outcome: "added", name: rosterName(user.profile) });
      continue;
    }

    // Invitation (email / phone only): the student decides.
    const target = identifier.value;
    const kind = identifier.kind as "email" | "phone";
    const [perTarget, perTeacher] = await Promise.all([
      rateLimit(rateLimits.classInviteTarget(target)),
      rateLimit(rateLimits.classInviteSender(actor.userId)),
    ]);
    if (!perTarget.allowed || !perTeacher.allowed) {
      results.push({ identifier: raw, outcome: "rejected", message: "Too many invitations were sent to this address. Try again tomorrow." });
      continue;
    }
    const token = randomToken(32);
    const expiresAt = new Date(now.getTime() + CLASS_INVITATION_TTL_DAYS * DAY_MS);
    await db.$transaction(async (tx) => {
      const pending = await tx.invitation.findFirst({
        where: { kind: "CLASS_MEMBER", classId: cls.id, target, acceptedAt: null, revokedAt: null, expiresAt: { gt: now } },
        select: { id: true, sendCount: true },
      });
      const invitation = pending
        ? await tx.invitation.update({
            where: { id: pending.id },
            data: { tokenHash: sha256Hex(token), expiresAt, lastSentAt: now, sendCount: Math.min(32_767, pending.sendCount + 1), invitedById: actor.userId },
            select: { id: true },
          })
        : await tx.invitation.create({
            data: {
              kind: "CLASS_MEMBER",
              classId: cls.id,
              channel: kind === "email" ? "EMAIL" : "SMS",
              target,
              tokenHash: sha256Hex(token),
              invitedById: actor.userId,
              expiresAt,
              lastSentAt: now,
            },
            select: { id: true },
          });
      await auditInTx(tx, {
        actorUserId: actor.userId,
        actorRoles: actor.roles,
        action: pending ? AUDIT_ACTIONS.INVITATION_RESEND : AUDIT_ACTIONS.INVITATION_CREATE,
        entityType: "Invitation",
        entityId: invitation.id,
        schoolId: cls.schoolId,
        after: { kind: "CLASS_MEMBER", channel: kind, expiresAt: expiresAt.toISOString() },
        metadata: { classId: cls.id },
        request: options.request ?? null,
      });
      if (isStudent && user) {
        await createNotification(
          user.id,
          {
            type: "class.invitation",
            category: "ACCOUNT",
            title: `Invitation to join ${cls.name}`.slice(0, 200),
            body: `You're invited to join ${cls.name}. Open Classes to accept or decline.`.slice(0, 2_000),
            data: { href: "/app/classes", entityType: "Invitation", entityId: invitation.id },
            dedupeKey: `class-invite:${invitation.id}:${now.getTime()}`,
          },
          { client: tx },
        );
      }
    });
    const delivery = await deliver(target, cls.name, token);
    results.push({ identifier: raw, outcome: "invited", sentTo: maskIdentifier(target), ...delivery, inviteLink: invitationLink(token), joinCode: cls.joinCode });
  }
  return { results };
}

/** Withdraws an open invitation of the class. */
export async function revokeClassInvitation(actor: TeachingActor, input: unknown, request?: AuditRequestInfo | null): Promise<void> {
  const data = parseWith(invitationRefSchema, input);
  const cls = await loadClassForTeacher(actor, data.classId, { write: true });
  await db.$transaction(async (tx) => {
    const updated = await tx.invitation.updateMany({
      where: { id: data.invitationId, classId: cls.id, kind: "CLASS_MEMBER", acceptedAt: null, revokedAt: null },
      data: { revokedAt: new Date(), target: null },
    });
    if (updated.count === 0) throw AppError.notFound("This invitation is no longer open.");
    await auditInTx(tx, {
      actorUserId: actor.userId,
      actorRoles: actor.roles,
      action: AUDIT_ACTIONS.INVITATION_REVOKE,
      entityType: "Invitation",
      entityId: data.invitationId,
      schoolId: cls.schoolId,
      metadata: { classId: cls.id },
      request: request ?? null,
    });
  });
}

// =====================================================================================================================
// Student side
// =====================================================================================================================

export interface StudentInvitation {
  id: string;
  classId: string;
  className: string;
  subjectName: string | null;
  schoolName: string | null;
  invitedBy: string | null;
  expiresAt: Date;
}

const INVITATION_VIEW_SELECT = {
  id: true,
  expiresAt: true,
  acceptedAt: true,
  revokedAt: true,
  target: true,
  invitedBy: { select: { profile: { select: { displayName: true, firstName: true, lastName: true } } } },
  class: {
    select: {
      id: true,
      name: true,
      schoolId: true,
      archivedAt: true,
      subject: { select: { name: true } },
      school: { select: { name: true, status: true } },
    },
  },
} as const;

type InvitationRow = {
  id: string;
  expiresAt: Date;
  acceptedAt: Date | null;
  revokedAt: Date | null;
  target: string | null;
  invitedBy: { profile: { displayName: string | null; firstName: string | null; lastName: string | null } | null } | null;
  class: {
    id: string;
    name: string;
    schoolId: string | null;
    archivedAt: Date | null;
    subject: { name: string } | null;
    school: { name: string; status: SchoolStatus } | null;
  } | null;
};

function isOpen(row: InvitationRow, now: Date): boolean {
  if (row.acceptedAt !== null || row.revokedAt !== null || row.expiresAt.getTime() <= now.getTime()) return false;
  if (!row.class || row.class.archivedAt !== null) return false;
  return row.class.schoolId === null || isOperatingSchool(row.class.school?.status);
}

function toStudentInvitation(row: InvitationRow): StudentInvitation {
  const cls = row.class!;
  return {
    id: row.id,
    classId: cls.id,
    className: cls.name,
    subjectName: cls.subject?.name ?? null,
    schoolName: cls.school?.name ?? null,
    invitedBy: row.invitedBy ? rosterName(row.invitedBy.profile) : null,
    expiresAt: row.expiresAt,
  };
}

/** The student's verified contacts (email / phone): invitations addressed to unverified contacts are never matched. */
async function verifiedContacts(userId: string): Promise<string[]> {
  const user = await db.user.findUnique({ where: { id: userId }, select: { emailNormalized: true, emailVerifiedAt: true, phoneE164: true, phoneVerifiedAt: true } });
  if (!user) return [];
  return [user.emailVerifiedAt ? user.emailNormalized : null, user.phoneVerifiedAt ? user.phoneE164 : null].filter((v): v is string => v !== null);
}

/** Open class invitations addressed to the student's verified email / phone. */
export async function listMyClassInvitations(actor: { userId: string }, options: { now?: Date } = {}): Promise<StudentInvitation[]> {
  const now = options.now ?? new Date();
  const contacts = await verifiedContacts(actor.userId);
  if (contacts.length === 0) return [];
  const rows = await db.invitation.findMany({
    where: {
      kind: "CLASS_MEMBER",
      target: { in: contacts },
      acceptedAt: null,
      revokedAt: null,
      expiresAt: { gt: now },
      class: { archivedAt: null, OR: [{ schoolId: null }, { school: { status: { in: [...OPERATING_SCHOOL_STATUSES] } } }] },
    },
    select: INVITATION_VIEW_SELECT,
    orderBy: { createdAt: "desc" },
    take: 20,
  });
  const memberships = await db.classMember.findMany({
    where: { userId: actor.userId, status: "ACTIVE", classId: { in: rows.flatMap((r) => (r.class ? [r.class.id] : [])) } },
    select: { classId: true },
  });
  const joined = new Set(memberships.map((m) => m.classId));
  return rows.filter((row) => isOpen(row, now) && !joined.has(row.class!.id)).map(toStudentInvitation);
}

async function findInvitationForStudent(actor: { userId: string }, ref: { token?: string; invitationId?: string }, now: Date): Promise<InvitationRow> {
  let row: InvitationRow | null = null;
  if (ref.token !== undefined) {
    const token = invitationTokenSchema.safeParse(ref.token);
    if (!token.success) throw AppError.notFound("This invitation link is not valid.");
    row = await db.invitation.findFirst({ where: { tokenHash: sha256Hex(token.data), kind: "CLASS_MEMBER" }, select: INVITATION_VIEW_SELECT });
  } else if (ref.invitationId !== undefined) {
    const contacts = await verifiedContacts(actor.userId);
    row = contacts.length
      ? await db.invitation.findFirst({ where: { id: ref.invitationId, kind: "CLASS_MEMBER", target: { in: contacts } }, select: INVITATION_VIEW_SELECT })
      : null;
  }
  if (!row || !isOpen(row, now)) throw AppError.notFound("This invitation has expired or is no longer open. Ask your teacher for a new one, or join with the class code.");
  return row;
}

/** The class behind an invitation link, for the accept page. */
export async function getClassInvitation(actor: { userId: string }, token: string, options: { now?: Date } = {}): Promise<StudentInvitation> {
  return toStudentInvitation(await findInvitationForStudent(actor, { token }, options.now ?? new Date()));
}

/**
 * Accepts a class invitation (by link token or, for invitations to the student's verified contact, by id): the
 * student becomes an ACTIVE member (no approval step: the teacher invited them) and the invitation is closed.
 */
export async function acceptClassInvitation(
  actor: { userId: string },
  ref: { token?: string; invitationId?: string },
  options: { now?: Date } = {},
): Promise<{ classId: string }> {
  const now = options.now ?? new Date();
  const student = await requireStudentAccount(db, actor.userId);
  const row = await findInvitationForStudent(actor, ref, now);
  const cls = row.class!;
  assertConsentAllowsClass(student, cls);
  await db.$transaction(async (tx) => {
    const updated = await tx.invitation.updateMany({
      where: { id: row.id, acceptedAt: null, revokedAt: null },
      data: { acceptedAt: now, acceptedByUserId: actor.userId, target: null },
    });
    if (updated.count === 0) throw AppError.conflict("This invitation was already used.");
    await upsertMembership(tx, { classId: cls.id, userId: actor.userId, status: "ACTIVE", source: "INVITE", now });
  });
  return { classId: cls.id };
}

/** Declines a class invitation (it closes; the teacher can invite again). */
export async function declineClassInvitation(actor: { userId: string }, ref: { token?: string; invitationId?: string }, options: { now?: Date } = {}): Promise<void> {
  const now = options.now ?? new Date();
  await requireStudentAccount(db, actor.userId);
  const row = await findInvitationForStudent(actor, ref, now);
  await db.invitation.updateMany({ where: { id: row.id, acceptedAt: null, revokedAt: null }, data: { revokedAt: now, target: null } });
}
