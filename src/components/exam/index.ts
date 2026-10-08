/**
 * Exam mode UI (§12 mock exams, §13 examination mode). Server side, build the data with `@/server/exams/service`
 * (`getExamRoom`, `getExamResults`, ...); the Server Actions live in `src/app/app/exams/actions.ts`.
 *
 * - `<FocusedLayer><ExamRoom data actions exitHref /></FocusedLayer>` — the exam room island (timer, navigator,
 *   autosave, papers, review, submit). Reusable for any ON_SUBMIT attempt (tests, mocks, timed exams, diagnostic).
 * - `<ExamTimer store />`, `<QuestionNavigator groups current onJump />`, `<SubmitDialog />`, `<ReviewScreen />`,
 *   `<SectionGate />`, `<SaveStatus />`, `<ShortcutHelp />` — its parts.
 * - `ExamController`, `ExamClockStore`, `ExamAnswerStore` — framework-free stores behind the island.
 * - Catalogue / instructions / results: `AssessmentCard`, `AttemptHistoryList`, `ExamAccessNotice`, `StartExamForm`,
 *   `ScoreSummary`, `TopicAreas`, `RecommendedStudy`, `ShareResultSlot` (share a final score, §46), `ClearExamDraft`.
 */
export { AssessmentCard, accessSummary } from "./AssessmentCard";
export { AttemptHistoryList, type AttemptHistoryListProps } from "./AttemptHistoryList";
export {
  AUTOSAVE_DEBOUNCE_MS,
  AUTOSAVE_MAX_INTERVAL_MS,
  AUTOSAVE_RETRY_BACKOFF_MS,
  ExamAnswerStore,
  clearExamOutbox,
  createOutboxStorage,
  outboxStorageKey,
  type AnswersSnapshot,
  type AutosaveStatus,
  type OutboxEntry,
  type SendOutcome,
} from "./autosave";
export { ClearExamDraft } from "./ClearExamDraft";
export { ExamController, classifySaveFailure, type ExamActions, type SubmitOutcome } from "./controller";
export { ExamAccessNotice } from "./ExamAccessNotice";
export { ExamClockStore, TIME_WARNING_SECONDS, dueWarning, warningMessage, type ClockPhase, type ClockTick } from "./exam-clock";
export * from "./exam-model";
export { ExamRoom, type ExamRoomProps } from "./ExamRoom";
export { ExamTimer, type ExamTimerProps } from "./ExamTimer";
export { FocusedLayer } from "./FocusedLayer";
export { EXAM_SHORTCUTS, isTypingTarget, shortcutFor, type ExamShortcut } from "./keyboard";
export * from "./labels";
export { QuestionNavigator, navigatorItemLabel, type NavigatorGroup, type NavigatorItem } from "./QuestionNavigator";
export { RecommendedStudy, type StudyRecommendation } from "./results/RecommendedStudy";
export { ScoreSummary } from "./results/ScoreSummary";
export { ShareResultSlot } from "./results/ShareResultSlot";
export { TopicAreas } from "./results/TopicAreas";
export { ReviewScreen, type ReviewPaper } from "./ReviewScreen";
export { SaveStatus, saveStatusText } from "./SaveStatus";
export { SectionGate } from "./SectionGate";
export { ShortcutHelp } from "./ShortcutHelp";
export { StartExamForm } from "./StartExamForm";
export { SubmitDialog, submitSummaryLines } from "./SubmitDialog";
export type * from "./types";
