import "server-only";
import { db } from "@/server/db";
import { AUDIT_ACTIONS, auditInTx } from "@/server/lib/audit";
import { AppError } from "@/server/lib/errors";
import { assertParent, type FamilyActor, type FamilyRequestMeta } from "./common";
import { CONSENT_GIVING_RELATIONSHIPS, studentIdSchema } from "./schemas";

/**
 * Guardian consent for a minor's data (ARCHITECTURE §5.12; schema `Student.guardianConsent*`, method PARENT_ACCOUNT).
 *
 * A linked PARENT or GUARDIAN (not a sponsor, sibling or other relative) with an ACTIVE link may record consent for a
 * student flagged as a minor; the database trigger re-checks that the consenting user holds an ACTIVE link at that
 * moment. The evidence reference points at the audit entry written in the same transaction (never contact details).
 * The parent who gave consent may withdraw it at any time, even after the link has ended.
 *
 * What a PENDING / REFUSED / WITHDRAWN consent restricts is decided in ./consent-gate.ts (AI processing of the minor's
 * text and photos: always refused once consent is withdrawn; PENDING per the `privacy.minorAiConsentRequired` setting,
 * legal TBC, §5.12); this module only records it.
 */

export interface GuardianConsentInput {
  studentUserId: unknown;
  /** The explicit "I am this student's parent or legal guardian and I consent" confirmation. */
  confirmed?: unknown;
}

function parseStudentId(value: unknown): string {
  const parsed = studentIdSchema.safeParse(value);
  if (!parsed.success) throw AppError.notFound("We couldn't find that child.");
  return parsed.data;
}

/** Records guardian consent (status GRANTED, method PARENT_ACCOUNT) for a linked minor. */
export async function grantGuardianConsent(
  actor: FamilyActor,
  input: GuardianConsentInput,
  meta?: FamilyRequestMeta | null,
  options: { now?: Date } = {},
): Promise<{ status: "GRANTED"; grantedAt: Date }> {
  assertParent(actor);
  const studentUserId = parseStudentId(input.studentUserId);
  if (input.confirmed !== true) {
    throw AppError.validation({ confirmed: ["Tick the box to confirm you are their parent or legal guardian."] });
  }
  const now = options.now ?? new Date();
  return db.$transaction(async (tx) => {
    const link = await tx.parentStudentLink.findFirst({
      where: { parentUserId: actor.userId, studentUserId, status: "ACTIVE" },
      select: { id: true, relationship: true },
    });
    if (!link) throw AppError.notFound("We couldn't find that child.");
    if (!CONSENT_GIVING_RELATIONSHIPS.includes(link.relationship)) {
      throw AppError.forbidden("Only a parent or legal guardian can give consent for a child.");
    }
    const student = await tx.student.findUnique({
      where: { userId: studentUserId },
      select: { isMinor: true, guardianConsentStatus: true },
    });
    if (!student) throw AppError.notFound("We couldn't find that child.");
    if (!student.isMinor) throw AppError.conflict("This student is an adult, so guardian consent isn't needed.");
    if (student.guardianConsentStatus === "GRANTED") throw AppError.conflict("Consent has already been given.");

    const auditId = await auditInTx(tx, {
      actorUserId: actor.userId,
      actorRoles: actor.roles,
      action: AUDIT_ACTIONS.CONSENT_GRANT,
      entityType: "Student",
      entityId: studentUserId,
      targetUserId: studentUserId,
      before: { guardianConsentStatus: student.guardianConsentStatus },
      after: { guardianConsentStatus: "GRANTED", guardianConsentMethod: "PARENT_ACCOUNT" },
      metadata: { scope: "guardian_consent", linkId: link.id, relationship: link.relationship },
      request: meta ?? null,
    });
    await tx.student.update({
      where: { userId: studentUserId },
      data: {
        guardianConsentStatus: "GRANTED",
        guardianConsentMethod: "PARENT_ACCOUNT",
        guardianConsentByUserId: actor.userId,
        guardianConsentAt: now,
        guardianConsentEvidenceRef: `AuditLog:${auditId}`,
      },
    });
    return { status: "GRANTED" as const, grantedAt: now };
  });
}

/** Withdraws consent this parent gave (status WITHDRAWN). Only the consenting parent may do it here. */
export async function withdrawGuardianConsent(
  actor: FamilyActor,
  input: { studentUserId: unknown },
  meta?: FamilyRequestMeta | null,
): Promise<{ status: "WITHDRAWN" }> {
  assertParent(actor);
  const studentUserId = parseStudentId(input.studentUserId);
  return db.$transaction(async (tx) => {
    const updated = await tx.student.updateMany({
      where: {
        userId: studentUserId,
        guardianConsentStatus: "GRANTED",
        guardianConsentMethod: "PARENT_ACCOUNT",
        guardianConsentByUserId: actor.userId,
      },
      data: { guardianConsentStatus: "WITHDRAWN" },
    });
    if (updated.count !== 1) throw AppError.notFound("There is no consent from you to withdraw.");
    await auditInTx(tx, {
      actorUserId: actor.userId,
      actorRoles: actor.roles,
      action: AUDIT_ACTIONS.CONSENT_WITHDRAW,
      entityType: "Student",
      entityId: studentUserId,
      targetUserId: studentUserId,
      before: { guardianConsentStatus: "GRANTED" },
      after: { guardianConsentStatus: "WITHDRAWN" },
      metadata: { scope: "guardian_consent" },
      request: meta ?? null,
    });
    return { status: "WITHDRAWN" as const };
  });
}
