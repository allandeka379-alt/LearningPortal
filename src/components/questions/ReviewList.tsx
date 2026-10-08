import { ChevronDown, CircleCheck, CircleDashed, CircleMinus, CircleX, Clock } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { FeedbackPanel } from "./FeedbackPanel";
import { QuestionView } from "./QuestionView";
import type { ReportProblemAction, ReportProblemButtonProps } from "./ReportProblem";
import { marksText } from "./response-model";
import { ReviewDisclosure } from "./ReviewDisclosure";
import { SelfMarkableFeedback, type SelfAssessAction } from "./SelfMarkableFeedback";
import type { FeedbackOutcome, PresentedFeedback, PresentedQuestion, QuestionResponse } from "./types";

export interface ReviewListItem {
  position: number;
  question: PresentedQuestion | null;
  response: QuestionResponse | null;
  feedback: PresentedFeedback | null;
}

const STATUS: Record<FeedbackOutcome | "none", { label: string; icon: ReactNode; className: string }> = {
  correct: { label: "Correct", icon: <CircleCheck aria-hidden="true" />, className: "text-success-text" },
  partial: { label: "Partly correct", icon: <CircleMinus aria-hidden="true" />, className: "text-warning-text" },
  incorrect: { label: "Incorrect", icon: <CircleX aria-hidden="true" />, className: "text-danger-text" },
  pending: { label: "Marking in progress", icon: <Clock aria-hidden="true" />, className: "text-muted" },
  review: { label: "Provisional mark", icon: <CircleDashed aria-hidden="true" />, className: "text-info-text" },
  unanswered: { label: "Not answered", icon: <CircleDashed aria-hidden="true" />, className: "text-muted" },
  none: { label: "Not answered", icon: <CircleDashed aria-hidden="true" />, className: "text-muted" },
};

export interface ReviewListProps {
  items: readonly ReviewListItem[];
  headingLevel?: 2 | 3;
  /**
   * Self-marking of written answers still waiting for marking (AI marking not configured): items whose feedback carries
   * a self-assessment offer open with the mark scheme and the form; after saving, the row stays open and focused while
   * the page refreshes its score.
   */
  selfAssess?: { attemptId: string; action: SelfAssessAction };
  /** "Report a problem" under each answered question's feedback (§42): the Server Action and the attempt reviewed. */
  report?: { action: ReportProblemAction; attemptId?: string };
  /** Offer "Ask the tutor about this" with each report link (the AI tutor is switched on: `features.ai`). Default false. */
  askTutor?: boolean;
}

/**
 * "Review your answers": one collapsible row per question with its status and marks; opening it shows the question
 * with the student's answer (read-only, annotated) and the full feedback. Server-compatible (the question and
 * feedback leaves hydrate on the client); used by the practice summary, test results and the diagnostic report.
 */
export function ReviewList({ items, headingLevel = 3, selfAssess, report, askTutor = false }: ReviewListProps) {
  return (
    <ol className="space-y-3">
      {items.map((item) => {
        const status = STATUS[item.feedback?.outcome ?? "none"];
        const selfMarkable = selfAssess !== undefined && item.feedback?.selfAssessment != null;
        const reportProps: ReportProblemButtonProps | undefined =
          report && item.question
            ? { action: report.action, entityType: "QUESTION", entityId: item.question.id, position: item.position, ...(report.attemptId ? { attemptId: report.attemptId } : {}) }
            : undefined;
        return (
          <li key={item.position}>
            <ReviewDisclosure
              initialOpen={selfMarkable}
              summary={
                <summary className="flex min-h-12 cursor-pointer list-none flex-wrap items-center justify-between gap-x-3 gap-y-1 px-4 py-3 [&::-webkit-details-marker]:hidden">
                  <span className="inline-flex items-center gap-2 font-semibold text-text">
                    <ChevronDown aria-hidden="true" className="size-4 shrink-0 text-muted transition-transform motion-reduce:transition-none group-open/review:rotate-180" />
                    Question {item.position}
                  </span>
                  <span className={cn("inline-flex items-center gap-1.5 text-sm font-medium [&_svg]:size-4", status.className)}>
                    {status.icon}
                    {selfMarkable ? "Ready for you to mark" : status.label}
                    {item.feedback && item.feedback.marksAwarded !== null && (
                      <span className="text-muted tabular-nums">
                        · {item.feedback.marksAwarded}/{marksText(item.feedback.marksAvailable)}
                      </span>
                    )}
                  </span>
                </summary>
              }
            >
              <div className="space-y-4 border-t border-border p-4">
                {item.question ? (
                  <QuestionView
                    question={item.question}
                    mode="review"
                    response={item.response}
                    feedback={item.feedback}
                    heading={`Question ${item.position}`}
                    headingLevel={headingLevel}
                  />
                ) : (
                  <p className="text-sm text-muted">This question is no longer available.</p>
                )}
                {item.feedback && selfAssess ? (
                  // Same island for every row while self-marking is possible, so a refreshed row keeps its state.
                  <SelfMarkableFeedback attemptId={selfAssess.attemptId} position={item.position} feedback={item.feedback} action={selfAssess.action} headingLevel={headingLevel} report={reportProps} askTutor={askTutor} />
                ) : (
                  item.feedback && <FeedbackPanel feedback={item.feedback} autoFocus={false} announce={false} headingLevel={headingLevel} report={reportProps} askTutor={askTutor} />
                )}
              </div>
            </ReviewDisclosure>
          </li>
        );
      })}
    </ol>
  );
}
