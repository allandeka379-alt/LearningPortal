/**
 * The attempt engine (§10 practice, §11 adaptive, §12 tests and mocks, §13 exam mode, §46 daily question, §52
 * diagnostic): one service for every channel (web, REST API, WhatsApp, worker). Server-only.
 *
 * - `startAttempt(actor, input)`               start or resume (entitlements, selection, server deadline)
 * - `getAttemptForStudent(actor, attemptId)`   student-safe view (never answers before the feedback rules allow)
 * - `saveResponse(actor, attemptId, pos, …)`   autosave + flag (deadline + grace enforced)
 * - `answerAndMark(actor, attemptId, pos, …)`  immediate marking + feedback (practice-style modes)
 * - `submitAttempt(actor, attemptId)`          idempotent close, score, grade estimate, analysis, side effects
 * - `autoSubmitExpired()` / `registerAttemptJobs()`  the `exams.autoSubmit` job
 * - `closeAttemptForAssignment(attemptId, now)` closes an open attempt when its assignment closes (teaching)
 * - `getAttemptQuestionScope(attemptId)`       pinned syllabus + private pools, to load an attempt's questions
 * - `revealHint(actor, attemptId, pos)`        next hint text (practice-style modes, counted against mastery)
 * - `recordMarkingDecision(input)`             AI / teacher / reviewer marks; re-scores closed attempts
 * - `recordSelfAssessment(actor, attemptId, pos, …)`  the student marks their own open answer when AI marking is not
 *                                              configured (SELF_ASSESSED: lower mastery weight, effort-only XP)
 */
export { startAttempt } from "./start";
export { getAttemptForStudent } from "./read";
export { answerAndMark, saveResponse, type AnswerAndMarkOptions, type SaveResponseOptions } from "./answer";
export {
  attemptDueReason,
  autoSubmitExpired,
  closeAttemptForAssignment,
  closeAttemptIfDue,
  getAttemptResult,
  submitAttempt,
  type DueReason,
} from "./submit";
export { getAttemptQuestionScope, type AttemptQuestionScope } from "./context";
export { registerAttemptJobs, autoSubmitPayloadSchema } from "./jobs";
export { recordMarkingDecision, markingDecisionSchema, type MarkingDecisionInput, type MarkingDecisionResult } from "./remark";
export { revealHint, type RevealedHint } from "./hints";
export {
  aiMarkingConfigured,
  recordSelfAssessment,
  selfAssessedMarks,
  selfAssessmentSchema,
  type SelfAssessmentInput,
} from "./self-assess";
export { AI_MARK_JOB } from "./effects";
export {
  AUTO_SUBMIT_JOB,
  ATTEMPT_MODES,
  attemptNoun,
  attemptResultsHref,
  DIFFICULTY_CHOICES,
  GRADED_MODES,
  PRACTICE_LIKE_MODES,
  feedbackModeFor,
  gatesFor,
  isGradedMode,
  isPracticeLike,
  readAttemptAnalysis,
  revealAllowed,
  SELF_ASSESSABLE_TYPES,
  selfAssessmentAllowed,
  type AttemptAnalysisJson,
  type AttemptConfig,
  type DifficultyChoice,
  type FeedbackMode,
} from "./policy";
export type {
  AnswerFeedback,
  AttemptResult,
  AttemptScore,
  AttemptSectionView,
  AttemptSlotView,
  AttemptView,
  AutoSubmitSummary,
  GradeEstimateView,
  LearnerActor,
  RecommendationView,
  SaveResponseResult,
  SlotResult,
  StartAttemptInput,
  StartedAttempt,
  StudyLessonLink,
  TopicResultView,
} from "./types";
