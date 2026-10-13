import "server-only";
import { AUDIT_ACTIONS, type AuditAction } from "@/server/lib/audit";

/**
 * Audit actions used by the admin people / schools / announcements services, in ONE place. Every key is a precise
 * entry of the shared registry (`AUDIT_ACTIONS`, src/server/lib/audit.ts). Entries also carry `metadata.operation`
 * ({@link CMS_AUDIT_OPERATIONS}) where it refines the action (e.g. which sessions were revoked, which job was queued).
 */
export const CMS_AUDIT = {
  USER_SUSPEND: AUDIT_ACTIONS.USER_SUSPEND,
  USER_REACTIVATE: AUDIT_ACTIONS.USER_REACTIVATE,
  SESSIONS_REVOKE: AUDIT_ACTIONS.AUTH_SESSIONS_REVOKE,
  ROLE_GRANT: AUDIT_ACTIONS.ROLE_GRANT,
  ROLE_REVOKE: AUDIT_ACTIONS.ROLE_REVOKE,
  STUDENT_VIEW: AUDIT_ACTIONS.STUDENT_VIEW,
  PASSWORD_RESET_SENT: AUDIT_ACTIONS.USER_PASSWORD_RESET_SENT,
  VERIFICATION_REMINDER_SENT: AUDIT_ACTIONS.USER_VERIFICATION_REMINDER_SENT,
  USER_CREATE: AUDIT_ACTIONS.USER_CREATE,
  TEMPORARY_PASSWORD_ISSUED: AUDIT_ACTIONS.USER_TEMPORARY_PASSWORD_ISSUED,
  JOB_ENQUEUE: AUDIT_ACTIONS.JOB_ENQUEUE,
  SCHOOL_CREATE: AUDIT_ACTIONS.SCHOOL_CREATE,
  SCHOOL_UPDATE: AUDIT_ACTIONS.SCHOOL_UPDATE,
  SCHOOL_STATUS_CHANGE: AUDIT_ACTIONS.SCHOOL_STATUS_CHANGE,
  SCHOOL_ANALYTICS_VIEW: AUDIT_ACTIONS.SCHOOL_ANALYTICS_VIEW,
  SCHOOL_MEMBER_ADD: AUDIT_ACTIONS.SCHOOL_MEMBER_ADD,
  SCHOOL_MEMBER_REMOVE: AUDIT_ACTIONS.SCHOOL_MEMBER_REMOVE,
  INVITATION_CREATE: AUDIT_ACTIONS.INVITATION_CREATE,
  INVITATION_RESEND: AUDIT_ACTIONS.INVITATION_RESEND,
  INVITATION_REVOKE: AUDIT_ACTIONS.INVITATION_REVOKE,
  ANNOUNCEMENT_CREATE: AUDIT_ACTIONS.ANNOUNCEMENT_CREATE,
  ANNOUNCEMENT_UPDATE: AUDIT_ACTIONS.ANNOUNCEMENT_UPDATE,
  ANNOUNCEMENT_PUBLISH: AUDIT_ACTIONS.ANNOUNCEMENT_PUBLISH,
  ANNOUNCEMENT_SCHEDULE: AUDIT_ACTIONS.ANNOUNCEMENT_SCHEDULE,
  ANNOUNCEMENT_UNSCHEDULE: AUDIT_ACTIONS.ANNOUNCEMENT_UNSCHEDULE,
  ANNOUNCEMENT_EXPIRE: AUDIT_ACTIONS.ANNOUNCEMENT_EXPIRE,
  ANNOUNCEMENT_ARCHIVE: AUDIT_ACTIONS.ANNOUNCEMENT_ARCHIVE,
} as const satisfies Record<string, AuditAction>;

/** Precise operation names written to `AuditLog.metadata.operation`. */
export const CMS_AUDIT_OPERATIONS = {
  passwordResetSent: "user.password_reset_sent",
  verificationReminderSent: "user.verification_reminder_sent",
  staffCreate: "user.staff_create",
  temporaryPasswordIssued: "user.temporary_password_issued",
  forceSignOut: "user.force_sign_out",
  sessionRevoke: "user.session_revoke",
  analyticsBackfill: "job.enqueue.analytics_backfill",
  schoolCreate: "school.create",
  schoolUpdate: "school.update",
  schoolStatusChange: "school.status_change",
  schoolAnalyticsView: "school.analytics.view",
  memberAdd: "school_member.add",
  memberRemove: "school_member.remove",
  invitationCreate: "invitation.create",
  invitationResend: "invitation.resend",
  invitationRevoke: "invitation.revoke",
  announcementCreate: "announcement.create",
  announcementUpdate: "announcement.update",
  announcementPublish: "announcement.publish",
  announcementSchedule: "announcement.schedule",
  announcementUnschedule: "announcement.unschedule",
  announcementExpire: "announcement.expire",
  announcementArchive: "announcement.archive",
} as const;
