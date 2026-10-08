/**
 * Curriculum read services (§2, §3, §4, §26, §44; ARCHITECTURE §4.2, §4.3): catalogue for onboarding, syllabus
 * versions and pinning, topic trees, lessons per topic, exam sessions, grade schemes and public URL resolution.
 * Server-only. Pure rules live in `./core` (unit tested).
 */
export {
  CURRICULUM_SLUG_PATTERN,
  ENROLLABLE_SYLLABUS_STATUSES,
  LISTED_CATALOGUE_STATUSES,
  PUBLISHED_SYLLABUS_STATUSES,
  RESERVED_TOP_LEVEL_SLUGS,
  ancestorIdsFromPath,
  buildTopicTree,
  flattenTopicTree,
  isAllowedBoardSlug,
  isEnrollableCatalogueStatus,
  isListedCatalogueStatus,
  isPublishedSyllabusStatus,
  isValidCurriculumSlug,
  selectSyllabusVersion,
  type SyllabusVersionCandidate,
  type TopicRowLike,
  type TopicTreeNode,
} from "./core";
export {
  CATALOGUE_CACHE_TTL_MS,
  getCountryByIsoCode,
  invalidateCatalogueCache,
  listBoardsForCountry,
  listCountries,
  listQualificationsByLevel,
  listSubjectsForQualification,
  type CatalogueBoard,
  type CatalogueCountry,
  type CatalogueQualification,
  type CatalogueSubject,
  type ListQualificationsOptions,
  type QualificationLevelGroup,
  type SubjectCategoryGroup,
} from "./catalogue";
export {
  getPublishedSyllabus,
  getSyllabusForEnrollment,
  listSyllabusVersions,
  resolveCurrentSyllabus,
  type PinnedSyllabus,
  type SyllabusSummary,
} from "./syllabus";
export {
  getTopicById,
  getTopicBySlug,
  getTopicSubtreeIds,
  getTopicTree,
  listTopicsOfKind,
  type TopicDetail,
  type TopicNode,
  type TopicObjective,
  type TopicReadOptions,
  type TopicRow,
} from "./topics";
export {
  countLessonsByTopic,
  getLessonById,
  getLessonBySlug,
  listLessonsForTopic,
  type LessonCard,
  type LessonListOptions,
  type LessonPage,
  type TopicLesson,
} from "./lessons";
export { getExamSessions, type ExamSessionSummary } from "./exam-sessions";
export {
  getGradeScheme,
  getGradeSchemeById,
  invalidateGradeSchemeCache,
  resolveGradeSchemeId,
  type GradeSchemeBand,
  type GradeSchemeView,
} from "./grades";
export {
  invalidateCurriculumPathCache,
  listPublicSubjectPaths,
  resolveCurriculumPath,
  type CurriculumPath,
  type CurriculumPathInput,
  type PublicBoard,
  type PublicQualification,
  type PublicSubject,
  type PublicSubjectPath,
} from "./seo";
