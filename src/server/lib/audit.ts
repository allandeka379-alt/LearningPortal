import "server-only";
import type { Prisma, Role } from "@/generated/prisma/client";
import { db, type DbClient } from "@/server/db";
import { hashIp } from "./crypto";
import { logger, redact, scrubString } from "./logger";

/**
 * Audit log (§39, ARCHITECTURE §5.10). Writes append-only `AuditLog` rows: the app role has INSERT + SELECT only and a
 * trigger refuses UPDATE/DELETE, so entries can never be rewritten.
 *
 * What is recorded: staff role grants/revokes, staff logins, content publish/archive, syllabus publish, plan/price/promo
 * changes, manual entitlement grants, refunds, settings and kill switches, imports, school membership changes, data
 * exports, account deletions, admin views of a student's record and break-glass access.
 *
 * Privacy: `before` / `after` / `metadata` go through the logger's `redact()` (secret and contact keys replaced, emails
 * and phone numbers masked inside strings); the client IP is stored only as a keyed hash (`hashIp`). Never put answer
 * text, names or message bodies in an audit entry.
 *
 * Two entry points:
 * - {@link audit}: best effort on its own statement. Never throws into the caller; failures are logged.
 * - {@link auditInTx}: inside the caller's transaction, throws, so the privileged change and its audit entry commit or
 *   roll back together. REQUIRED for break-glass reads and anything whose audit entry is part of the guarantee.
 */

/** Registry of audit action keys (dotted, lower-case; `AuditLog.action`). Add new keys here, never inline strings. */
export const AUDIT_ACTIONS = {
  AUTH_LOGIN_SUCCESS: "auth.login.success",
  AUTH_LOGIN_FAILURE: "auth.login.failure",
  AUTH_LOGOUT: "auth.logout",
  AUTH_PASSWORD_CHANGE: "auth.password.change",
  AUTH_PASSWORD_RESET: "auth.password.reset",
  AUTH_SESSIONS_REVOKE: "auth.sessions.revoke",
  AUTH_STEP_UP: "auth.step_up",
  /** Self-service registration (account created, contact not yet verified). */
  AUTH_REGISTER: "auth.register",
  /** Email ownership proven with a one-time code (or by Google). */
  AUTH_CONTACT_VERIFY: "auth.contact.verify",
  /** Repeated wrong passwords temporarily locked password login. */
  AUTH_ACCOUNT_LOCKED: "auth.account.locked",
  /** External identity (Google) linked to an account. */
  AUTH_OAUTH_LINK: "auth.oauth.link",
  /** The account email address was replaced (proven with a code sent to the new address). */
  AUTH_EMAIL_CHANGE: "auth.email.change",
  ROLE_GRANT: "role.grant",
  ROLE_REVOKE: "role.revoke",
  USER_SUSPEND: "user.suspend",
  USER_REACTIVATE: "user.reactivate",
  /** Staff sent password-reset instructions to a user (the reset itself is `auth.password.reset`). */
  USER_PASSWORD_RESET_SENT: "user.password_reset_sent",
  /** Staff sent a "verify your contact" reminder to a user. */
  USER_VERIFICATION_REMINDER_SENT: "user.verification_reminder_sent",
  /** Staff set a one-time (temporary) password, shown once to them, that the user must change at sign-in. */
  USER_TEMPORARY_PASSWORD_ISSUED: "user.temporary_password_issued",
  /** Admin view of an individual student's record. Requires `reason` (AuditLog_reason_chk). */
  STUDENT_VIEW: "student.view",
  STUDENT_EXTRA_TIME_UPDATE: "student.extra_time.update",
  CONSENT_GRANT: "consent.grant",
  CONSENT_WITHDRAW: "consent.withdraw",
  PARENT_LINK_REVOKE: "parent_link.revoke",
  /** A parent–student link became ACTIVE (code redeemed or request approved); `metadata.basis` says how. */
  PARENT_LINK_ACTIVATE: "parent_link.activate",
  /** The student changed what a linked parent may see; `metadata.granted` / `metadata.withdrawn` list the sections. */
  PARENT_LINK_PERMISSIONS_UPDATE: "parent_link.permissions_update",
  /** The student allowed (or stopped) one linked parent reading their AI conversations; `metadata.allowed`. */
  PARENT_LINK_AI_CONSENT: "parent_link.ai_consent",
  // Editorial content (lessons, questions, assessments, flashcards, study packs; §27 workflow). `metadata.operation`
  // may refine the event (e.g. "content.bulk_create").
  CONTENT_CREATE: "content.create",
  CONTENT_UPDATE: "content.update",
  CONTENT_DELETE: "content.delete",
  CONTENT_SUBMIT: "content.submit",
  CONTENT_REQUEST_CHANGES: "content.request_changes",
  CONTENT_APPROVE: "content.approve",
  CONTENT_PUBLISH: "content.publish",
  CONTENT_ARCHIVE: "content.archive",
  /** Editable draft copy of a published item opened. */
  CONTENT_DRAFT_COPY: "content.draft_copy",
  /** Draft copy (or never-published draft) discarded. */
  CONTENT_DISCARD: "content.discard",
  /** ARCHIVED item restored to DRAFT (revision + 1). */
  CONTENT_REOPEN: "content.reopen",
  /** Student / teacher "Report a problem" triage outcomes (§42). */
  CONTENT_FLAG_TRIAGE: "content_flag.triage",
  CONTENT_FLAG_RESOLVE: "content_flag.resolve",
  CONTENT_FLAG_REJECT: "content_flag.reject",
  /** Curriculum catalogue / draft structure / exam session / grade scheme change; `metadata.operation` says which. */
  CURRICULUM_UPDATE: "curriculum.update",
  /** Exam session cancel / archive, grade scheme retirement. */
  CURRICULUM_RETIRE: "curriculum.retire",
  EXAM_SESSION_PUBLISH: "exam_session.publish",
  /** New version of a grade scheme (the old one is kept for historical results). */
  GRADE_SCHEME_VERSION: "grade_scheme.version",
  SYLLABUS_PUBLISH: "syllabus.publish",
  SYLLABUS_ARCHIVE: "syllabus.archive",
  /** A student moved a subject enrolment's pin to the CURRENT syllabus version (§26; src/server/enrollment/version-move.ts). */
  ENROLLMENT_SYLLABUS_MOVE: "enrollment.syllabus_move",
  IMPORT_UPLOAD: "import.upload",
  IMPORT_VALIDATE: "import.validate",
  IMPORT_COMMIT: "import.commit",
  IMPORT_CANCEL: "import.cancel",
  IMPORT_COMPLETE: "import.complete",
  IMPORT_FAIL: "import.fail",
  /** CMS AI draft generation (content always enters as DRAFT, `aiGenerated = true`). */
  AI_GENERATION_REQUEST: "ai_generation.request",
  AI_GENERATION_CANCEL: "ai_generation.cancel",
  AI_GENERATION_COMPLETE: "ai_generation.complete",
  AI_GENERATION_FAIL: "ai_generation.fail",
  SCHOOL_CREATE: "school.create",
  SCHOOL_UPDATE: "school.update",
  SCHOOL_STATUS_CHANGE: "school.status_change",
  /** Staff view of one school's analytics (/admin/schools/[id]/analytics). */
  SCHOOL_ANALYTICS_VIEW: "school.analytics.view",
  SCHOOL_ROSTER_IMPORT: "school.roster_import",
  SCHOOL_VERIFY: "school.verify",
  SCHOOL_MEMBER_ADD: "school_member.add",
  SCHOOL_MEMBER_REMOVE: "school_member.remove",
  SCHOOL_MEMBER_ROLE_CHANGE: "school_member.role_change",
  /** A school asked the platform for a plan / seat change (/school/billing). */
  SCHOOL_PLAN_REQUEST: "school.plan_request",
  /** A school report was requested (a background job is queued). */
  SCHOOL_REPORT_REQUEST: "school.report.request",
  /** A generated school report file was downloaded. */
  SCHOOL_REPORT_DOWNLOAD: "school.report.download",
  /** A school admin reset a student's password (the student must change it at next sign-in). */
  SCHOOL_PASSWORD_RESET: "school.password_reset",
  /** The subjects a school offers changed. */
  SCHOOL_SUBJECTS_UPDATE: "school.subjects.update",
  // Classes (§22 teachers, §23 school admins). `metadata.operation` may refine the event (e.g. "class_member.approve").
  CLASS_CREATE: "class.create",
  CLASS_UPDATE: "class.update",
  CLASS_ARCHIVE: "class.archive",
  CLASS_RESTORE: "class.restore",
  CLASS_MEMBER_ADD: "class_member.add",
  CLASS_MEMBER_REMOVE: "class_member.remove",
  CLASS_TEACHER_ADD: "class_teacher.add",
  CLASS_TEACHER_REMOVE: "class_teacher.remove",
  /** Teacher work (assignment) published to a class, or scheduled to go live. */
  ASSIGNMENT_PUBLISH: "assignment.publish",
  /** Teacher closed work early (open attempts finished, non-submitters marked MISSED). */
  ASSIGNMENT_CLOSE: "assignment.close",
  INVITATION_CREATE: "invitation.create",
  INVITATION_RESEND: "invitation.resend",
  INVITATION_REVOKE: "invitation.revoke",
  /** An invitation link was accepted (when no role grant / membership entry records it already). */
  INVITATION_ACCEPT: "invitation.accept",
  ANNOUNCEMENT_CREATE: "announcement.create",
  ANNOUNCEMENT_UPDATE: "announcement.update",
  ANNOUNCEMENT_PUBLISH: "announcement.publish",
  ANNOUNCEMENT_SCHEDULE: "announcement.schedule",
  ANNOUNCEMENT_UNSCHEDULE: "announcement.unschedule",
  ANNOUNCEMENT_EXPIRE: "announcement.expire",
  ANNOUNCEMENT_ARCHIVE: "announcement.archive",
  PLAN_UPDATE: "plan.update",
  PLAN_PRICE_CREATE: "plan_price.create",
  PLAN_PRICE_UPDATE: "plan_price.update",
  PROMO_CODE_CREATE: "promo_code.create",
  PROMO_CODE_UPDATE: "promo_code.update",
  PROMO_CODE_DELETE: "promo_code.delete",
  ENTITLEMENT_GRANT: "entitlement.grant",
  ENTITLEMENT_REVOKE: "entitlement.revoke",
  PAYMENT_REFUND: "payment.refund",
  PAYMENT_STATUS_CHANGE: "payment.status_change",
  PAYMENT_AMOUNT_MISMATCH: "payment.amount_mismatch",
  PAYMENT_DISPUTED: "payment.disputed",
  PAYMENT_NEEDS_REVIEW: "payment.needs_review",
  /** Staff cancellation of a subscription (immediately or at period end); `metadata.operation` says which. */
  SUBSCRIPTION_CANCEL: "subscription.cancel",
  SUBSCRIPTION_RESUME: "subscription.resume",
  /** Staff extension of a subscription's current period. */
  SUBSCRIPTION_EXTEND: "subscription.extend",
  SETTING_UPDATE: "setting.update",
  PRIVACY_EXPORT: "privacy.export",
  PRIVACY_DELETION_REQUEST: "privacy.deletion.request",
  PRIVACY_DELETION_COMPLETE: "privacy.deletion.complete",
  /** A student's leaderboard opt-in / name mode change (§20); opting out also deletes their LeaderboardEntry rows. */
  PRIVACY_LEADERBOARD_UPDATE: "privacy.leaderboard.update",
  /** SUPER_ADMIN break-glass read of AI conversations. Requires `reason` (AuditLog_reason_chk). */
  AI_CONVERSATION_BREAK_GLASS: "ai_conversation.break_glass",
  MEDIA_UPLOAD: "media.upload",
  MEDIA_UPDATE: "media.update",
  MEDIA_DELETE: "media.delete",
  /** Staff-enqueued background job (e.g. analytics backfill); `metadata.operation` names it. */
  JOB_ENQUEUE: "job.enqueue",
  JOB_RETRY: "job.retry",
  JOB_CANCEL: "job.cancel",
  /**
   * AuditLog retention purge (2 years; 6 for payment entities) by the maintenance role (scripts/maintenance/purge-audit.ts,
   * which writes this key itself: it runs outside the app). `metadata.deleted` counts the rows removed.
   */
  AUDIT_RETENTION_PURGE: "audit.retention_purge",
  /** Staff chose (or auto-picked) the daily question of a day and scope; `metadata.operation` is "override" or "auto_pick". */
  DAILY_QUESTION_SCHEDULE: "daily_question.schedule",
  /** Staff removed a scheduled daily question (the nightly job fills the day again). */
  DAILY_QUESTION_CLEAR: "daily_question.clear",
  // Marketing CMS (§45): FAQ entries and testimonials. Never put the quote, answer text or a person's name in metadata.
  FAQ_CREATE: "faq.create",
  FAQ_UPDATE: "faq.update",
  FAQ_PUBLISH: "faq.publish",
  FAQ_UNPUBLISH: "faq.unpublish",
  FAQ_REORDER: "faq.reorder",
  FAQ_DELETE: "faq.delete",
  TESTIMONIAL_CREATE: "testimonial.create",
  TESTIMONIAL_UPDATE: "testimonial.update",
  TESTIMONIAL_PUBLISH: "testimonial.publish",
  TESTIMONIAL_UNPUBLISH: "testimonial.unpublish",
  /** Consent withdrawn: unpublished and the quote, name and photo erased (irreversible). */
  TESTIMONIAL_CONSENT_WITHDRAW: "testimonial.consent_withdraw",
} as const;

export type AuditAction = (typeof AUDIT_ACTIONS)[keyof typeof AUDIT_ACTIONS];

/** Actions that must carry a non-blank reason and a human actor (database CHECK `AuditLog_reason_chk`). */
export const AUDIT_ACTIONS_REQUIRING_REASON: ReadonlySet<string> = new Set<string>([
  AUDIT_ACTIONS.STUDENT_VIEW,
  AUDIT_ACTIONS.AI_CONVERSATION_BREAK_GLASS,
]);

/**
 * Minimal actor shape used by infrastructure services (settings, uploads, audit) until the auth module's `Actor` type
 * exists. Structurally compatible with ARCHITECTURE §3.1: `{ kind: "user", userId, roles, ... }` or
 * `{ kind: "system", job }`.
 */
export type InfraActor =
  | { kind: "user"; userId: string; roles: readonly Role[] }
  | { kind: "system"; job: string };

/** Request metadata for an audit entry (see `getRequestContext()` in ./request). */
export interface AuditRequestInfo {
  requestId?: string | null;
  /** Raw client IP: hashed before storage, never stored as-is. */
  ip?: string | null;
  userAgent?: string | null;
}

export interface AuditEntry {
  /** Acting user; `null` for system actions (worker, scheduler, webhook processing). */
  actorUserId: string | null;
  /** Effective roles at the time (include SCHOOL_ADMIN when acting in a school). */
  actorRoles?: readonly Role[];
  action: AuditAction;
  /** Target model / key space, e.g. "Setting", "Lesson", "User". */
  entityType: string;
  /** Target id (may be a non-uuid key such as a Setting key). */
  entityId?: string | null;
  /** School context for school-scoped actions. */
  schoolId?: string | null;
  /** Person whose data was viewed or changed. */
  targetUserId?: string | null;
  /** Snapshots / diff (redacted before storage). */
  before?: unknown;
  after?: unknown;
  /** Extra context, flat values preferred (redacted before storage). */
  metadata?: Record<string, unknown>;
  /** Required for {@link AUDIT_ACTIONS_REQUIRING_REASON}. */
  reason?: string | null;
  request?: AuditRequestInfo | null;
}

const ACTION_PATTERN = /^[a-z0-9_]+(\.[a-z0-9_]+)+$/;

function truncate(value: string | null | undefined, max: number): string | null {
  if (value === null || value === undefined) return null;
  const trimmed = value.trim();
  if (trimmed === "") return null;
  return trimmed.length > max ? trimmed.slice(0, max) : trimmed;
}

function redactJson(value: unknown): Prisma.InputJsonValue | undefined {
  if (value === undefined) return undefined;
  const redacted = redact(value);
  return redacted === undefined || redacted === null ? undefined : (redacted as Prisma.InputJsonValue);
}

/** `{ actorUserId, actorRoles }` for an {@link InfraActor}; system actors are recorded with `actorUserId = null`. */
export function auditActorFields(actor: InfraActor): Pick<AuditEntry, "actorUserId" | "actorRoles"> {
  return actor.kind === "user" ? { actorUserId: actor.userId, actorRoles: actor.roles } : { actorUserId: null, actorRoles: [] };
}

/**
 * Validates an entry and maps it to an `AuditLog` insert. Throws `Error` for programming mistakes (malformed action,
 * missing reason on a reason-required action) so they surface in tests instead of as a CHECK violation.
 */
export function buildAuditRow(entry: AuditEntry): Prisma.AuditLogUncheckedCreateInput {
  if (!ACTION_PATTERN.test(entry.action) || entry.action.length > 100) {
    throw new Error(`audit: malformed action key "${entry.action}"`);
  }
  const entityType = truncate(entry.entityType, 64);
  if (entityType === null) throw new Error("audit: entityType is required");
  const reason = truncate(entry.reason === undefined || entry.reason === null ? null : scrubString(entry.reason), 500);
  if (AUDIT_ACTIONS_REQUIRING_REASON.has(entry.action) && (reason === null || entry.actorUserId === null)) {
    throw new Error(`audit: "${entry.action}" requires a reason and a human actor`);
  }
  const ip = entry.request?.ip?.trim();
  const before = redactJson(entry.before);
  const after = redactJson(entry.after);
  const metadata = redactJson(entry.metadata);
  return {
    actorUserId: entry.actorUserId,
    actorKind: entry.actorUserId === null ? "SYSTEM" : "USER",
    actorRoles: [...new Set(entry.actorRoles ?? [])],
    action: entry.action,
    entityType,
    entityId: truncate(entry.entityId, 128),
    schoolId: entry.schoolId ?? null,
    targetUserId: entry.targetUserId ?? null,
    ...(before === undefined ? {} : { before }),
    ...(after === undefined ? {} : { after }),
    ...(metadata === undefined ? {} : { metadata }),
    reason,
    requestId: truncate(entry.request?.requestId, 64),
    ipHash: ip ? hashIp(ip) : null,
    userAgent: truncate(entry.request?.userAgent, 512),
  };
}

/**
 * Records an audit entry on its own statement. NEVER throws: a failure (database down, bad reference) is logged at
 * `error` level with the action and entity, so the user-facing operation is not failed by its audit trail.
 *
 * Do not call this with a transaction client: a failed insert would abort the caller's transaction. Use
 * {@link auditInTx} there.
 *
 * @returns `true` when the entry was written.
 */
export async function audit(entry: AuditEntry): Promise<boolean> {
  try {
    await db.auditLog.create({ data: buildAuditRow(entry), select: { id: true } });
    return true;
  } catch (error) {
    logger.error("audit write failed", {
      action: entry.action,
      entityType: entry.entityType,
      entityId: entry.entityId ?? null,
      err: error,
    });
    return false;
  }
}

/**
 * Records an audit entry inside the caller's transaction (or on `client`). Throws on any failure so the privileged
 * change and its audit entry are atomic.
 *
 * @example
 * await db.$transaction(async (tx) => {
 *   await tx.setting.update(...);
 *   await auditInTx(tx, { ...auditActorFields(actor), action: AUDIT_ACTIONS.SETTING_UPDATE, entityType: "Setting", entityId: key });
 * });
 */
export async function auditInTx(client: DbClient, entry: AuditEntry): Promise<string> {
  const row = await client.auditLog.create({ data: buildAuditRow(entry), select: { id: true } });
  return row.id;
}
