import "server-only";
import { AUDIT_ACTIONS, type AuditAction } from "@/server/lib/audit";

/**
 * Audit actions used by the school administration services, in ONE place (keys of the shared registry
 * `AUDIT_ACTIONS`, src/server/lib/audit.ts). `metadata.operation` ({@link SCHOOL_AUDIT_OPERATIONS}) still names the
 * precise event, e.g. a class member added "via" a roster import.
 */
export const SCHOOL_AUDIT = {
  MEMBER_ADD: AUDIT_ACTIONS.SCHOOL_MEMBER_ADD,
  MEMBER_REMOVE: AUDIT_ACTIONS.SCHOOL_MEMBER_REMOVE,
  INVITATION_CREATE: AUDIT_ACTIONS.INVITATION_CREATE,
  INVITATION_RESEND: AUDIT_ACTIONS.INVITATION_RESEND,
  INVITATION_REVOKE: AUDIT_ACTIONS.INVITATION_REVOKE,
  ROLE_GRANT: AUDIT_ACTIONS.ROLE_GRANT,
  ROSTER_IMPORT: AUDIT_ACTIONS.SCHOOL_ROSTER_IMPORT,
  PASSWORD_RESET: AUDIT_ACTIONS.SCHOOL_PASSWORD_RESET,
  STUDENT_VIEW: AUDIT_ACTIONS.STUDENT_VIEW,
  CONSENT_GRANT: AUDIT_ACTIONS.CONSENT_GRANT,
  /** Student numbers and subject enrolments (see `metadata.operation`). */
  SCHOOL_UPDATE: AUDIT_ACTIONS.SCHOOL_UPDATE,
  /** The subjects the school offers. */
  SUBJECTS_UPDATE: AUDIT_ACTIONS.SCHOOL_SUBJECTS_UPDATE,
  /** Plan / seat change request to the platform (/school/billing). */
  PLAN_REQUEST: AUDIT_ACTIONS.SCHOOL_PLAN_REQUEST,
  /** Report requested (a background job is queued). */
  REPORT_REQUEST: AUDIT_ACTIONS.SCHOOL_REPORT_REQUEST,
  /** Report file downloaded (the school's analytics, as a file). */
  REPORT_DOWNLOAD: AUDIT_ACTIONS.SCHOOL_REPORT_DOWNLOAD,
  CLASS_CREATE: AUDIT_ACTIONS.CLASS_CREATE,
  CLASS_UPDATE: AUDIT_ACTIONS.CLASS_UPDATE,
  CLASS_ARCHIVE: AUDIT_ACTIONS.CLASS_ARCHIVE,
  CLASS_RESTORE: AUDIT_ACTIONS.CLASS_RESTORE,
  CLASS_TEACHER_ADD: AUDIT_ACTIONS.CLASS_TEACHER_ADD,
  CLASS_TEACHER_REMOVE: AUDIT_ACTIONS.CLASS_TEACHER_REMOVE,
  CLASS_MEMBER_ADD: AUDIT_ACTIONS.CLASS_MEMBER_ADD,
  CLASS_MEMBER_REMOVE: AUDIT_ACTIONS.CLASS_MEMBER_REMOVE,
} as const satisfies Record<string, AuditAction>;

export const SCHOOL_AUDIT_OPERATIONS = {
  teacherInvite: "school.teacher_invite",
  studentInvite: "school.student_invite",
  invitationAccept: "invitation.accept",
  teacherRemove: "school.teacher_remove",
  studentRemove: "school.student_remove",
  studentApprove: "school.student_request_approve",
  studentDecline: "school.student_request_decline",
  studentNumber: "school.student_number",
  rosterCommit: "school.roster_import.commit",
  guardianConsent: "guardian_consent.school",
  passwordReset: "school.password_reset",
  classCreate: "class.create",
  classUpdate: "class.update",
  classArchive: "class.archive",
  classRestore: "class.restore",
  classTeacherAdd: "class_teacher.add",
  classTeacherRemove: "class_teacher.remove",
  classMemberAdd: "class_member.add",
  classMemberRemove: "class_member.remove",
  subjectsSet: "school.subjects",
  subjectEnrol: "school.subject_enrol",
  reportRequest: "school_report.request",
  reportDownload: "school_report.download",
  planRequest: "school.plan_request",
  studentView: "school.student_view",
} as const;
