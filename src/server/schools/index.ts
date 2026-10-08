/**
 * School administration (§23; B2B / B2B2C §53). Server-only services; every function takes the acting user and an
 * explicit school id and re-checks that the user is an ACTIVE SCHOOL_ADMIN of that operating school (./access, which
 * delegates to `isActiveSchoolAdmin` in src/server/auth/rbac).
 *
 * - access:      listAdministeredSchools, resolveSchoolAdmin, assertSchoolAdmin
 * - dashboard:   getSchoolDashboard (§23 analytics + seats + setup gaps)
 * - teachers:    listSchoolTeachers, listTeacherOptions, deactivateTeacher
 * - students:    listSchoolStudents, listStudentOptions, getSchoolStudent (audited), deactivateStudent,
 *                approveStudentRequest, declineStudentRequest, setStudentNumber, resetStudentPassword(s) (audited)
 * - invitations: inviteSchoolMember, listSchoolInvitations, resendSchoolInvitation, revokeSchoolInvitation;
 *                getInvitationPreview, acceptInvitation, listMyPendingInvitations, acceptMyInvitation, declineInvitation
 * - roster:      validateRosterFile (dry run), commitRosterChunk (username accounts + one-time credential slips)
 * - classes:     listSchoolClasses, getSchoolClass, createSchoolClass, updateSchoolClass, setSchoolClassArchived,
 *                assignClassTeacher, removeClassTeacher, addStudentsToSchoolClass, removeStudentFromSchoolClass
 * - subjects:    listSchoolSubjects, listSubjectCatalogue, setSchoolSubjects, enrolStudentsInSubject
 * - reports:     requestSchoolReport, listSchoolReports, openSchoolReport; jobs runSchoolReport, expireSchoolReports
 * - billing:     getSchoolSubscription, getSchoolSeatSummary, requestSchoolPlan
 * - jobs:        registerSchoolJobs
 */
export * from "./access";
export * from "./billing";
export * from "./classes";
export * from "./core";
export * from "./dashboard";
export * from "./invitations";
export * from "./jobs";
export * from "./reports";
export * from "./roster";
export * from "./students";
export * from "./subjects";
export * from "./teachers";
