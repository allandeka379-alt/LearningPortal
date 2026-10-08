/**
 * Practice orchestration (§10, §11, §46) on top of the attempt engine, plus the server-side presenter of the shared
 * question renderers. Server-only.
 *
 * Other areas (exam mode, lesson checks, the diagnostic) present questions for `<QuestionView>` with
 * `presentQuestions` / `presentQuestion` + `loadQuestionAssets`, feedback for `<FeedbackPanel>` with
 * `presentSlotFeedback` / `presentAnswerFeedback`, and saved answers with `normalizeResponse`.
 */
export {
  loadQuestionAssets,
  loadRevealAssets,
  normalizeResponse,
  partResultsFrom,
  presentAnswerFeedback,
  presentSelfAssessment,
  slotSelfAssessment,
  presentQuestion,
  presentQuestions,
  presentReveal,
  presentSlotFeedback,
  splitFillTemplate,
  type FeedbackExtras,
} from "./present";
export {
  MAX_PRACTICE_QUESTIONS,
  PRACTICE_SESSION_SIZES,
  aiMarkingAvailable,
  answerPracticeQuestion,
  answerSchema,
  endPracticeSession,
  getPracticeAllowance,
  getPracticeBuilder,
  getPracticeSummary,
  getSessionState,
  listOpenPracticeSessions,
  revealPracticeHint,
  selfAssessPracticeAnswer,
  selfAssessSchema,
  startPracticeSchema,
  startPracticeSession,
  type AnswerPracticeInput,
  type OpenPracticeSession,
  type PracticeAllowance,
  type PracticeBuilderData,
  type PracticeSubjectOption,
  type PracticeSummary,
  type PracticeTopicOption,
  type ReviewItem,
  type SelfAssessInput,
  type SessionSlot,
  type SessionState,
  type StartPracticeInput,
  type StartedPractice,
  type SummaryTopic,
} from "./service";
export { getDailyOverview, startDailyQuestion, type DailyOverview, type DailySubjectItem } from "./daily";
