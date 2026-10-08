"use client";

import { BookOpen, ChevronDown, CircleCheck, CircleDashed, CircleMinus, CircleX, Clock } from "lucide-react";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { RichContent } from "@/components/content/RichContent";
import { AskTutorLink } from "@/components/tutor/AskTutorLink";
import { ButtonLink } from "@/components/ui/Button";
import { MasteryBadge } from "@/components/ui/MasteryBadge";
import { cn } from "@/lib/cn";
import type { SanitizedHtml } from "@/lib/content/types";
import { ReportProblemButton, type ReportProblemButtonProps } from "./ReportProblem";
import { marksText } from "./response-model";
import { SelfAssessmentForm, type SelfAssessmentInput } from "./SelfAssessmentForm";
import type { FeedbackOutcome, PresentedFeedback, PresentedReveal } from "./types";

const OUTCOME: Record<FeedbackOutcome, { title: string; icon: ReactNode; box: string; iconClass: string }> = {
  correct: { title: "Correct", icon: <CircleCheck aria-hidden="true" />, box: "border-success/40 bg-success-soft", iconClass: "text-success-text" },
  partial: { title: "Partly correct", icon: <CircleMinus aria-hidden="true" />, box: "border-warning/40 bg-warning-soft", iconClass: "text-warning-text" },
  incorrect: { title: "Incorrect", icon: <CircleX aria-hidden="true" />, box: "border-danger/40 bg-danger-soft", iconClass: "text-danger-text" },
  pending: { title: "Marking in progress", icon: <Clock aria-hidden="true" />, box: "border-border bg-subtle", iconClass: "text-muted" },
  review: { title: "Provisional mark", icon: <CircleDashed aria-hidden="true" />, box: "border-info/30 bg-info-soft", iconClass: "text-info-text" },
  unanswered: { title: "Not answered", icon: <CircleDashed aria-hidden="true" />, box: "border-border bg-subtle", iconClass: "text-muted" },
};

/** Short sentence for the live region and the panel subtitle, e.g. "2 of 3 marks". */
export function feedbackSummary(feedback: Pick<PresentedFeedback, "outcome" | "marksAwarded" | "marksAvailable">): string {
  const title = OUTCOME[feedback.outcome].title;
  if (feedback.marksAwarded === null) return `${title}.`;
  return `${title}. ${feedback.marksAwarded} of ${marksText(feedback.marksAvailable)}.`;
}

export interface FeedbackPanelProps {
  feedback: PresentedFeedback;
  /** Move keyboard / screen-reader focus to the panel when it appears (default true). */
  autoFocus?: boolean;
  /** Announce the result in a polite live region (default true). Turn off for lists of past answers. */
  announce?: boolean;
  /** Level of the panel heading in the page outline. */
  headingLevel?: 2 | 3;
  /** Saves a self-assessment (offered only when the feedback includes one). Resolves to an error message or null. */
  onSelfAssess?: (input: SelfAssessmentInput) => Promise<string | null>;
  /** Extra actions (e.g. "Next question"), rendered at the end of the panel. */
  actions?: ReactNode;
  /**
   * "Report a problem" with this question (§42), shown at the foot of the panel. Omit where reporting is not offered.
   * Its presence also marks a student's own learning context (practice, daily question, exam review, diagnostic
   * report), where an "Ask the tutor about this" link to the question is offered (§14).
   */
  report?: ReportProblemButtonProps;
  /**
   * Offer "Ask the tutor about this" with `report` (only when the AI tutor is switched on: `features.ai`, passed down
   * from the server). Default false: no tutor link.
   */
  askTutor?: boolean;
  className?: string;
}

/**
 * Marking feedback after an answer (§10): correct / incorrect / partly correct with marks, the correct answer, why it
 * is correct (explanation, worked solution, mark scheme or model answer), the relevant concept, the topic and a
 * "Study this topic" link, plus the topic mastery change (§11). Pending AI / manual marking shows "Marking in
 * progress" and, when automatic marking is unavailable, the self-assessment form.
 *
 * Accessibility: the result is announced through a polite live region that is filled after mount (so it is reliably
 * read), and focus moves to the panel so keyboard users continue from the feedback.
 */
export function FeedbackPanel({ feedback, autoFocus = true, announce = true, headingLevel = 2, onSelfAssess, actions, report, askTutor = false, className }: FeedbackPanelProps) {
  const ref = useRef<HTMLElement>(null);
  const id = useId();
  const prefix = `fb${id.replace(/[^A-Za-z0-9]/g, "")}`;
  const headingId = `${prefix}-heading`;
  const [announcement, setAnnouncement] = useState("");
  const summary = feedbackSummary(feedback);
  const style = OUTCOME[feedback.outcome];
  const Heading = `h${headingLevel}` as "h2" | "h3";
  const Sub = `h${headingLevel + 1}` as "h3" | "h4";

  useEffect(() => {
    if (autoFocus) ref.current?.focus();
  }, [autoFocus]);

  useEffect(() => {
    if (!announce) return;
    // Filled after mount so the (already mounted) live region announces it.
    const timer = window.setTimeout(() => setAnnouncement(summary), 50);
    return () => window.clearTimeout(timer);
  }, [announce, summary]);

  const reveal = feedback.reveal;

  return (
    <section
      ref={ref}
      tabIndex={-1}
      aria-labelledby={headingId}
      className={cn("space-y-4 rounded-card border p-4 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus sm:p-5", style.box, className)}
    >
      <p aria-live="polite" aria-atomic="true" className="sr-only">
        {announcement}
      </p>

      <div className="flex items-start gap-3">
        <span className={cn("mt-0.5 shrink-0 [&_svg]:size-6", style.iconClass)}>{style.icon}</span>
        <div className="min-w-0 flex-1">
          <Heading id={headingId} className="text-lg font-semibold text-text">
            {style.title}
          </Heading>
          {feedback.marksAwarded !== null && (
            <p className="text-sm font-medium text-text tabular-nums">
              {feedback.marksAwarded} of {marksText(feedback.marksAvailable)}
              {feedback.status === "SELF_ASSESSED" && <span className="font-normal text-muted"> · self-marked</span>}
              {feedback.status === "AI_MARKED" && <span className="font-normal text-muted"> · AI-marked</span>}
              {feedback.status === "TEACHER_MARKED" && <span className="font-normal text-muted"> · teacher-marked</span>}
            </p>
          )}
        </div>
      </div>

      {feedback.outcome === "pending" && (
        <p className="text-sm text-text">
          {feedback.selfAssessment && onSelfAssess
            ? "Your answer is saved."
            : "Your answer is saved. Written answers are marked against the mark scheme, and your score updates when marking is finished."}
        </p>
      )}
      {feedback.outcome === "review" && (
        <p className="text-sm text-text">This mark is provisional: a reviewer will confirm it.</p>
      )}

      {feedback.notes.length > 0 && (
        <ul className="list-disc space-y-1 pl-5 text-sm text-text">
          {feedback.notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      )}

      {feedback.selfAssessment && onSelfAssess && (
        <SelfAssessmentForm assessment={feedback.selfAssessment} onSubmit={onSelfAssess} idPrefix={prefix} />
      )}

      {reveal && <RevealDetails reveal={reveal} Sub={Sub} />}

      {feedback.markerComment && (
        <div className="space-y-1">
          <Sub className="text-sm font-semibold text-text">Marker&apos;s comment</Sub>
          <p className="text-sm text-text">{feedback.markerComment}</p>
        </div>
      )}

      {(feedback.topic || feedback.mastery || feedback.studyLesson) && (
        <div className="flex flex-col gap-3 border-t border-border/70 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0 space-y-1 text-sm">
            {feedback.topic && (
              <p className="text-text">
                <span className="text-muted">Topic: </span>
                <span className="font-medium">{feedback.topic.name}</span>
              </p>
            )}
            {feedback.mastery && (
              <p className="flex flex-wrap items-center gap-1.5 text-text">
                <span className="text-muted">Topic mastery:</span>
                {feedback.mastery.before && feedback.mastery.before !== feedback.mastery.after ? (
                  <>
                    <MasteryBadge band={feedback.mastery.before} size="sm" />
                    <span aria-hidden="true">→</span>
                    <span className="sr-only">changed to</span>
                    <MasteryBadge band={feedback.mastery.after} size="sm" />
                  </>
                ) : (
                  <MasteryBadge band={feedback.mastery.after} size="sm" />
                )}
              </p>
            )}
          </div>
          {feedback.studyLesson && (
            <ButtonLink href={feedback.studyLesson.href} variant="outline" iconStart={<BookOpen aria-hidden="true" />}>
              Study this topic<span className="sr-only">: {feedback.studyLesson.title}</span>
            </ButtonLink>
          )}
        </div>
      )}

      {actions && <div className="flex flex-wrap gap-3 pt-1">{actions}</div>}

      {report?.entityType === "QUESTION" && (
        <AskTutorLink enabled={askTutor} questionId={report.entityId} variant="ghost" size="sm" className="-ml-3 self-start" />
      )}

      {report && <ReportProblemButton {...report} className={cn("border-t border-border/70 pt-2", report.className)} />}
    </section>
  );
}

/** Disclosure toggle with a visible chevron (the native marker disappears with `display: flex`). */
function Summary({ children }: { children: ReactNode }) {
  return (
    <summary className="flex min-h-11 cursor-pointer list-none items-center gap-1.5 text-sm font-semibold text-primary [&::-webkit-details-marker]:hidden">
      <ChevronDown aria-hidden="true" className="size-4 shrink-0 transition-transform motion-reduce:transition-none group-open/disclosure:rotate-180" />
      {children}
    </summary>
  );
}

function HtmlBlock({ title, html, Sub, inline = false }: { title: string; html: SanitizedHtml; Sub: "h3" | "h4"; inline?: boolean }) {
  return (
    <div className="space-y-1">
      <Sub className="text-sm font-semibold text-text">{title}</Sub>
      <RichContent html={html} inline={inline} className="text-sm text-text" />
    </div>
  );
}

function RevealDetails({ reveal, Sub }: { reveal: PresentedReveal; Sub: "h3" | "h4" }) {
  const rationales = reveal.options.filter((option) => option.rationaleHtml !== null);
  return (
    <div className="space-y-4">
      {reveal.correctAnswerHtml && <HtmlBlock title="Correct answer" html={reveal.correctAnswerHtml} Sub={Sub} inline />}
      {reveal.explanationHtml && <HtmlBlock title="Why this is the answer" html={reveal.explanationHtml} Sub={Sub} />}
      {rationales.length > 0 && (
        <details className="group/disclosure">
          <Summary>About each option</Summary>
          <ul className="mt-1 space-y-2">
            {rationales.map((option) => (
              <li key={option.key} className="flex gap-2 text-sm text-text">
                <span className="w-16 shrink-0 font-semibold">
                  {option.key}
                  <span className="block text-xs font-medium text-muted">{option.isCorrect ? "Correct" : "Incorrect"}</span>
                </span>
                {option.rationaleHtml && <RichContent html={option.rationaleHtml} className="min-w-0" />}
              </li>
            ))}
          </ul>
        </details>
      )}
      {reveal.workedSolutionHtml && (
        <details className="group/disclosure">
          <Summary>Worked solution</Summary>
          <RichContent html={reveal.workedSolutionHtml} className="mt-1 text-sm text-text" />
        </details>
      )}
      {reveal.methodMarks.length > 0 && (
        <div className="space-y-1">
          <Sub className="text-sm font-semibold text-text">Method marks</Sub>
          <ul className="space-y-1 text-sm text-text">
            {reveal.methodMarks.map((point) => (
              <li key={point.id} className="flex justify-between gap-3">
                <RichContent inline html={point.descriptionHtml} />
                <span className="shrink-0 text-muted tabular-nums">{marksText(point.marks)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {reveal.markScheme && (
        <details className="group/disclosure">
          <Summary>Mark scheme</Summary>
          <ul className="mt-1 space-y-1 text-sm text-text">
            {reveal.markScheme.points.map((point) => (
              <li key={point.id} className="flex justify-between gap-3">
                <RichContent inline html={point.descriptionHtml} />
                <span className="shrink-0 text-muted tabular-nums">{marksText(point.marks)}</span>
              </li>
            ))}
          </ul>
          {reveal.markScheme.levels.length > 0 && (
            <dl className="mt-3 space-y-2 text-sm text-text">
              {reveal.markScheme.levels.map((level) => (
                <div key={level.level}>
                  <dt className="font-semibold">
                    Level {level.level} ({level.minMarks}–{level.maxMarks} marks)
                  </dt>
                  <dd>
                    <RichContent html={level.descriptorHtml} />
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </details>
      )}
      {reveal.modelAnswerHtml && (
        <details className="group/disclosure">
          <Summary>Model answer</Summary>
          <RichContent html={reveal.modelAnswerHtml} className="mt-1 text-sm text-text" />
        </details>
      )}
      {reveal.conceptHtml && <HtmlBlock title="Key concept" html={reveal.conceptHtml} Sub={Sub} />}
      {reveal.parts.length > 0 && (
        <ol className="space-y-3">
          {reveal.parts.map((part, index) => (
            <li key={part.questionId} className="space-y-2 rounded-md border border-border/70 bg-surface/60 p-3">
              <p className="flex flex-wrap items-baseline justify-between gap-2 text-sm font-semibold text-text">
                <span>{part.partLabel ?? `Part ${index + 1}`}</span>
                {part.partResult && (
                  <span className="font-medium text-muted tabular-nums">
                    {part.partResult.pending ? "Marking in progress" : `${part.partResult.awarded} of ${marksText(part.partResult.max)}`}
                  </span>
                )}
              </p>
              <RevealDetails reveal={part} Sub={Sub} />
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
