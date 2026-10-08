/**
 * Shared question renderers (§9 question types, §10 practice feedback, §13 exam mode, lesson checks, the diagnostic).
 *
 * Server side, present questions and results with `@/server/practice` (`presentQuestions`, `presentSlotFeedback`,
 * `presentAnswerFeedback`, `normalizeResponse`): every fragment is rendered and sanitised there and answers are
 * never included before marking. Client side:
 *
 * - `<QuestionView question mode="practice" | "exam" | "review" response onChange feedback disabled />` — any type;
 * - `<FeedbackPanel feedback />` — marking result, reveal, mastery change, "Study this topic", self-assessment;
 * - `<AnswerRunner />` — one question with "Check answer" → feedback → next (practice, daily question, lesson checks);
 * - `<ReportProblemButton action entityType entityId />` — learner "Report a problem" (§42), also offered by FeedbackPanel's
 *   `report` prop, AnswerRunner's `reportAction` and ReviewList's `report`;
 * - `<ReviewList items selfAssess? />` — collapsible answer review for results pages (written answers waiting for
 *   marking can be self-marked there when AI marking is not configured: `<SelfMarkableFeedback />`).
 */
export { AnswerRunner, type AnswerInput, type AnswerRunnerProps, type SlotRef } from "./AnswerRunner";
export { FeedbackPanel, feedbackSummary, type FeedbackPanelProps } from "./FeedbackPanel";
export { MarksLabel, type MarksLabelProps } from "./MarksLabel";
export { QuestionImage } from "./QuestionImage";
export { QuestionSkeleton } from "./QuestionSkeleton";
export { QuestionView, type QuestionViewProps } from "./QuestionView";
export { ReportProblemButton, REPORT_THANKS, type ReportProblemAction, type ReportProblemButtonProps, type ReportProblemTarget } from "./ReportProblem";
export { ReviewList, type ReviewListItem, type ReviewListProps } from "./ReviewList";
export { SelfAssessmentForm, type SelfAssessmentInput } from "./SelfAssessmentForm";
export { SelfMarkableFeedback, type SelfAssessAction, type SelfMarkableFeedbackProps } from "./SelfMarkableFeedback";
export * from "./response-model";
export type * from "./types";
