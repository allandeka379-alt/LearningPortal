/**
 * Topic and lesson experience for students (§2 hierarchy, §8 lesson system, §26 pinned syllabus versions, §27
 * licensing, §31 free vs paid lessons). Server-only.
 *
 * - `getTopicPageForStudent(actor, subjectId, topicId)`  topic page: objectives, subtopics, lessons (lock + completion)
 * - `getLessonForStudent(actor, lessonId, { topicId })`   reader: rendered body (open lessons only), headings, previous /
 *                                                         next, licensing footer, progress, practice question count
 * - `markLessonProgress(actor, lessonId, input)`          heartbeat + "Mark as complete" (idempotent, rate limited)
 * - `getLessonCheck` / `startLessonCheck`                 the lesson's practice questions (LESSON_CHECK attempts)
 */
export {
  assertStudent,
  liveLessonAssignments,
  resolveLessonAccess,
  type LessonAccess,
  type LessonActor,
  type LessonContextTopic,
  type ResolveLessonOptions,
} from "./access";
export {
  CREDIT_TOLERANCE_SECONDS,
  MAX_CREDIT_PER_BEAT_SECONDS,
  STUDY_SESSION_IDLE_MINUTES,
  buildAttribution,
  creditableSeconds,
  isFreePreview,
  isLessonOpen,
  lessonListCounts,
  lessonNeighbours,
  lessonState,
  pickContextTag,
  type LessonAttribution,
  type LessonState,
} from "./core";
export { countLessonQuestions, getLessonForStudent, type LessonForStudent, type LessonNavItem, type LessonProgressView } from "./service";
export {
  LESSON_PROGRESS_RATE_LIMIT,
  lessonProgressRateLimit,
  markLessonProgress,
  markLessonProgressSchema,
  type LessonProgressResult,
  type MarkLessonProgressInput,
} from "./progress";
export { getLessonCheck, startLessonCheck, startLessonCheckSchema, type LessonCheckState, type StartLessonCheckInput } from "./check";
export { getTopicPageForStudent, type SubtopicItem, type TopicLessonItem, type TopicMasteryView, type TopicPageView } from "./topic";
