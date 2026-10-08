/**
 * Subject enrolments (§5, §26): enrol (pins the syllabus version), list, update per-subject choices, unenrol (soft),
 * and the audited move to a newer syllabus version (./version-move).
 * Server-only.
 */
export {
  enrolInSubjects,
  enrolInSubjectsSchema,
  ensureEnrollmentTx,
  listEnrollments,
  unenrol,
  updateEnrollment,
  updateEnrollmentSchema,
  type EnrolInSubjectsInput,
  type EnrollmentActor,
  type EnrollmentView,
  type EnsureEnrollmentOptions,
  type UpdateEnrollmentInput,
} from "./service";
export {
  getSyllabusUpgradeOffer,
  moveEnrollmentToCurrentSyllabus,
  moveSyllabusSchema,
  type MoveSyllabusInput,
  type SyllabusMoveResult,
  type SyllabusUpgradeOffer,
  type SyllabusVersionSummary,
} from "./version-move";
