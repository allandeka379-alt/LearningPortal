import { ClipboardCheck, ListChecks } from "lucide-react";
import Link from "next/link";
import { AnswerRunner, type AnswerInput, type SlotRef } from "@/components/questions/AnswerRunner";
import type { ReportProblemAction } from "@/components/questions/ReportProblem";
import type { SelfAssessmentInput } from "@/components/questions/SelfAssessmentForm";
import type { PresentedFeedback, PresentedHint } from "@/components/questions/types";
import { Alert } from "@/components/ui/Alert";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { cn } from "@/lib/cn";
import { formatCount } from "@/lib/format";
import type { ActionResult } from "@/server/lib/errors";
import type { LessonCheckState } from "@/server/lessons/check";
import { checkScoreText, LESSON_PRACTICE_ANCHOR, lessonHref } from "./labels";
import { StartLessonCheckForm, type StartLessonCheckAction } from "./StartLessonCheckForm";

export interface LessonCheckActions {
  start: StartLessonCheckAction;
  answer: (input: AnswerInput) => Promise<ActionResult<PresentedFeedback>>;
  hint: (input: SlotRef) => Promise<ActionResult<PresentedHint>>;
  selfAssess: (input: SlotRef & SelfAssessmentInput) => Promise<ActionResult<PresentedFeedback>>;
  /** "Report a problem" with a question (§42); omit to hide it. */
  report?: ReportProblemAction;
}

export interface LessonCheckSectionProps {
  state: Exclude<LessonCheckState, { status: "UNAVAILABLE" }>;
  lessonId: string;
  topicId: string;
  topicName: string;
  actions: LessonCheckActions;
  /** Generated per render for the start form (double taps start one attempt). */
  idempotencyKey: string;
  upgradeHref: string;
  /** Offer "Ask the tutor about this" under each answer (the AI tutor is switched on: `features.ai`). Default false. */
  askTutor?: boolean;
  className?: string;
}

const TITLE_ID = "lesson-practice-title";

/**
 * The lesson's practice questions (§8), one at a time with instant feedback (shared `AnswerRunner`, §10). States:
 * an invitation to start, the current question of the open check (the server picks the first unanswered one, so a
 * reload or another device resumes), or the latest result with a review link and "Try again". Server component; the
 * runner and the start form are the client islands.
 */
export function LessonCheckSection({ state, lessonId, topicId, topicName, actions, idempotencyKey, upgradeHref, askTutor = false, className }: LessonCheckSectionProps) {
  return (
    <section
      id={LESSON_PRACTICE_ANCHOR}
      aria-labelledby={TITLE_ID}
      className={cn("space-y-5 rounded-card border border-border bg-surface p-4 sm:p-6 print:hidden", className)}
    >
      <div className="flex items-start gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-soft text-on-primary-soft [&_svg]:size-5">
          <ListChecks aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <h2 id={TITLE_ID} className="text-lg font-semibold text-text">
            Check your understanding
          </h2>
          <p className="mt-0.5 text-sm text-muted">
            {formatCount(state.questionCount, "practice question")} on {topicName}, with instant feedback. Your answers
            count towards your topic mastery.
          </p>
        </div>
      </div>

      {state.status === "NOT_STARTED" && (
        <StartLessonCheckForm lessonId={lessonId} topicId={topicId} idempotencyKey={idempotencyKey} action={actions.start} upgradeHref={upgradeHref} />
      )}

      {state.status === "IN_PROGRESS" && (
        <div className="space-y-5">
          <ProgressBar
            label="Questions answered"
            value={state.answeredCount}
            max={Math.max(1, state.questionCount)}
            valueText={`${state.answeredCount} of ${state.questionCount} answered`}
            size="sm"
          />
          {state.current === null ? (
            <Alert tone="info" title="Your answers are being marked">
              Come back to this lesson later to see your result.
            </Alert>
          ) : state.current.question ? (
            <AnswerRunner
              key={`${state.attemptId}:${state.current.position}`}
              attemptId={state.attemptId}
              position={state.current.position}
              question={state.current.question}
              heading={`Question ${state.current.position} of ${state.questionCount}`}
              headingLevel={3}
              initialResponse={state.current.response}
              initialHints={state.current.hints}
              answerAction={actions.answer}
              hintAction={actions.hint}
              selfAssessAction={actions.selfAssess}
              reportAction={actions.report}
              askTutor={askTutor}
              completion={{ href: lessonHref(lessonId, { topicId, params: { practice: "done" }, hash: LESSON_PRACTICE_ANCHOR }), label: "See your result" }}
              upgradeHref={upgradeHref}
            />
          ) : (
            <Alert tone="warning" title="This question is no longer available">
              It was withdrawn after you started. Your other answers are kept.
            </Alert>
          )}
        </div>
      )}

      {state.status === "COMPLETED" && (
        <div className="space-y-4">
          <div className="flex items-start gap-3 rounded-control bg-subtle p-4">
            <ClipboardCheck aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-primary" />
            <div className="min-w-0">
              <p className="font-semibold text-text">Your last result: {checkScoreText(state.percentage, state.marksAwarded, state.totalMarks)}</p>
              <p className="text-sm text-muted">
                {state.correctCount} of {formatCount(state.answeredCount, "answer")} fully correct
                {state.provisional ? ". Some answers are still being marked, so this may change." : "."}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href={`/app/practice/${state.attemptId}/summary`}
              className="inline-flex min-h-11 items-center rounded-control text-sm font-semibold text-primary underline-offset-4 hover:underline"
            >
              Review your answers
            </Link>
            {state.canRetry && (
              <StartLessonCheckForm
                lessonId={lessonId}
                topicId={topicId}
                idempotencyKey={idempotencyKey}
                action={actions.start}
                mode="retry"
                upgradeHref={upgradeHref}
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
}
