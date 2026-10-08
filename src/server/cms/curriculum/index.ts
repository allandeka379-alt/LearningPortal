/**
 * Curriculum CMS services (§3, §4, §17, §25, §26, §27; ARCHITECTURE §4.2, §4.3, §5.2): catalogue management, syllabus
 * versions and their topic trees, content re-tagging across versions, exam sessions and grade schemes. Server-only.
 * Pure rules live in ./core (unit tested); Zod contracts in ./schemas; permissions in ./access.
 */
export { assertCurriculumAdmin, assertCurriculumDraft, assertCurriculumRead, curriculumAccess, type CurriculumAccess, type CurriculumActor } from "./access";
export * from "./catalogue";
export * from "./syllabuses";
export * from "./topics";
export * from "./retag";
export * from "./exam-sessions";
export * from "./grade-schemes";
export { formDataToObject } from "./form-data";
export { CURRICULUM_AUDIT, ADMIN_PAGE_SIZE, type Page, type ServiceContext } from "./shared";
export { SEED_VERIFICATION_POLICY, type SeedSubjectNote } from "./seed-notes";
