"use client";

import { UpgradeButton } from "@/components/billing/UpgradeOffer";
import { ArrowRight, Lightbulb, RotateCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState, useTransition, type FormEvent } from "react";
import { RichContent } from "@/components/content/RichContent";
import { Alert } from "@/components/ui/Alert";
import { Button, ButtonLink } from "@/components/ui/Button";
import type { ActionResult } from "@/server/lib/errors";
import { FeedbackPanel } from "./FeedbackPanel";
import { QuestionView } from "./QuestionView";
import type { ReportProblemAction } from "./ReportProblem";
import type { SelfAssessmentInput } from "./SelfAssessmentForm";
import type { PresentedFeedback, PresentedHint, PresentedQuestion, QuestionResponse } from "./types";

export interface AnswerInput {
  attemptId: string;
  position: number;
  response: QuestionResponse;
  /** Active seconds on the question (client-measured; the server clamps it). */
  timeSpentSeconds: number;
  hintsUsed: number;
}

export interface SlotRef {
  attemptId: string;
  position: number;
}

type ActionError = Extract<ActionResult<never>, { ok: false }>["error"];

/** Errors about the session or the plan, not about the answer itself (not linked to the answer controls). */
const NON_ANSWER_ERRORS: ReadonlySet<string> = new Set(["QUOTA_EXCEEDED", "ENTITLEMENT_REQUIRED", "CONFLICT", "NOT_FOUND"]);

export interface AnswerRunnerProps {
  attemptId: string;
  position: number;
  question: PresentedQuestion;
  /** Visible question heading, e.g. "Question 3 of 20". */
  heading: string;
  /** A saved, unmarked answer to continue from (or, with `initialFeedback`, the answer that was marked). */
  initialResponse?: QuestionResponse | null;
  /** The question was already answered: start on its feedback (no focus move, no announcement). */
  initialFeedback?: PresentedFeedback | null;
  /** Hints already revealed on this question (a reload shows them again and they keep counting). */
  initialHints?: readonly PresentedHint[];
  /** Level of the question and feedback headings (3 inside a page section that has its own h2). Default 2. */
  headingLevel?: 2 | 3;
  /** Marks the answer and returns the feedback (a Server Action). */
  answerAction: (input: AnswerInput) => Promise<ActionResult<PresentedFeedback>>;
  /** Reveals the next hint (a Server Action). Omit to hide hints. */
  hintAction?: (input: SlotRef) => Promise<ActionResult<PresentedHint>>;
  /** Records a self-assessment when automatic marking is unavailable (a Server Action). */
  selfAssessAction?: (input: SlotRef & SelfAssessmentInput) => Promise<ActionResult<PresentedFeedback>>;
  /** Where to go once the attempt is complete (e.g. the session summary). */
  completion: { href: string; label: string };
  /** Label of the button that loads the next question (the page re-renders with the next open slot). */
  nextLabel?: string;
  /** Plans page for entitlement / allowance messages. */
  upgradeHref: string;
  /** "Report a problem" with the question, offered under its feedback (§42; a Server Action). Omit to hide. */
  reportAction?: ReportProblemAction;
  /** Offer "Ask the tutor about this" under the feedback (the AI tutor is switched on: `features.ai`). Default false. */
  askTutor?: boolean;
}

/**
 * One-question-at-a-time answering with instant feedback (§10 practice, §46 daily question, lesson checks):
 * answer → "Check answer" (Server Action: mark + side effects) → {@link FeedbackPanel} → "Next question". The next
 * question comes from the server (`router.refresh()`), which stays the source of truth for the session's position, so
 * a reload or a second device resumes at the right place. Hints are revealed one at a time and lower the credit;
 * hints revealed before a reload are passed back in (`initialHints`). The topic's band change is recorded by the server
 * on the attempt (the session summary reads it there).
 */
export function AnswerRunner({
  attemptId,
  position,
  question,
  heading,
  initialResponse = null,
  initialFeedback = null,
  initialHints = [],
  headingLevel = 2,
  answerAction,
  hintAction,
  selfAssessAction,
  completion,
  nextLabel = "Next question",
  upgradeHref,
  reportAction,
  askTutor = false,
}: AnswerRunnerProps) {
  const router = useRouter();
  const [response, setResponse] = useState<QuestionResponse | null>(initialResponse);
  const [feedback, setFeedback] = useState<PresentedFeedback | null>(initialFeedback);
  // Focus / announce only feedback produced in this visit, not feedback restored on page load.
  const [answeredHere, setAnsweredHere] = useState(false);
  const [hints, setHints] = useState<PresentedHint[]>(() => [...initialHints]);
  const [error, setError] = useState<ActionError | null>(null);
  const [hintError, setHintError] = useState<string | null>(null);
  const [hintsExhausted, setHintsExhausted] = useState(false);
  const [checking, startChecking] = useTransition();
  const [loadingHint, startHint] = useTransition();
  const [navigating, startNavigating] = useTransition();
  const startedAt = useRef<number | null>(null);
  const answerErrorId = `${useId().replace(/[^A-Za-z0-9]/g, "")}-answer-error`;
  const answerError = error !== null && !NON_ANSWER_ERRORS.has(error.code);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const elapsedSeconds = () => (startedAt.current === null ? 0 : Math.max(0, Math.round((Date.now() - startedAt.current) / 1000)));

  const check = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (response === null || checking) return;
    setError(null);
    const answer = response;
    startChecking(async () => {
      const result = await answerAction({ attemptId, position, response: answer, timeSpentSeconds: elapsedSeconds(), hintsUsed: hints.length });
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setFeedback(result.data);
      setAnsweredHere(true);
    });
  };

  const showHint = () => {
    if (!hintAction) return;
    setHintError(null);
    startHint(async () => {
      const result = await hintAction({ attemptId, position });
      if (result.ok) {
        setHints((current) => [...current, result.data]);
        return;
      }
      // E.g. the hints were already revealed before a reload: say so next to the button, not as an answer error.
      if (result.error.code === "CONFLICT") setHintsExhausted(true);
      setHintError(result.error.message);
    });
  };

  const selfAssess = async (input: SelfAssessmentInput): Promise<string | null> => {
    if (!selfAssessAction || !feedback) return "Self-marking is not available here.";
    const result = await selfAssessAction({ attemptId, position, ...input });
    if (!result.ok) return result.error.message;
    // Keep the context of the original feedback (topic, lesson link, session state); take the new mark.
    setFeedback({ ...feedback, ...result.data, topic: feedback.topic, studyLesson: feedback.studyLesson, attemptCompleted: feedback.attemptCompleted, nextPosition: feedback.nextPosition, mastery: result.data.mastery ?? feedback.mastery });
    return null;
  };

  const next = () => startNavigating(() => router.refresh());

  const hintsLeft = hintAction && !feedback && !hintsExhausted ? question.hintCount - hints.length : 0;

  return (
    <div className="space-y-6">
      <form onSubmit={check} noValidate className="space-y-6">
        <QuestionView
          question={question}
          mode={feedback ? "review" : "practice"}
          response={response}
          onChange={feedback ? undefined : setResponse}
          feedback={feedback}
          disabled={checking}
          heading={heading}
          headingLevel={headingLevel}
          errorId={answerError ? answerErrorId : undefined}
        />

        {hints.length > 0 && (
          <div className="space-y-3">
            {hints.map((hint) => (
              <Alert key={hint.hintNumber} tone="accent" variant="callout" icon={<Lightbulb aria-hidden="true" />} title={`Hint ${hint.hintNumber} of ${hint.totalHints}`}>
                <RichContent html={hint.html} className="text-sm" />
              </Alert>
            ))}
          </div>
        )}

        {error && <RunnerError error={error} answerErrorId={answerErrorId} upgradeHref={upgradeHref} onReload={() => router.refresh()} />}

        {!feedback && (
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
            {hintsLeft > 0 || hintError ? (
              <div className="space-y-1">
                {hintsLeft > 0 && (
                  <Button variant="ghost" onClick={showHint} loading={loadingHint} iconStart={<Lightbulb aria-hidden="true" />}>
                    {hints.length === 0 ? "Show a hint" : "Show another hint"}
                  </Button>
                )}
                <p className="text-xs text-muted" role="status">
                  {hintError ?? "Hints lower the credit you get for this question."}
                </p>
              </div>
            ) : (
              <span />
            )}
            <Button type="submit" size="lg" loading={checking} loadingText="Checking…" disabled={response === null} fullWidth className="sm:w-auto">
              Check answer
            </Button>
          </div>
        )}
      </form>

      {feedback && (
        <FeedbackPanel
          feedback={feedback}
          headingLevel={headingLevel}
          autoFocus={answeredHere}
          announce={answeredHere}
          onSelfAssess={selfAssessAction ? selfAssess : undefined}
          report={reportAction ? { action: reportAction, entityType: "QUESTION", entityId: question.id, attemptId, position } : undefined}
          askTutor={askTutor}
          actions={
            feedback.attemptCompleted ? (
              <ButtonLink href={completion.href} size="lg" iconEnd={<ArrowRight aria-hidden="true" />}>
                {completion.label}
              </ButtonLink>
            ) : (
              <Button size="lg" onClick={next} loading={navigating} loadingText="Loading…" iconEnd={<ArrowRight aria-hidden="true" />}>
                {nextLabel}
              </Button>
            )
          }
        />
      )}
    </div>
  );
}

function RunnerError({ error, answerErrorId, upgradeHref, onReload }: { error: ActionError; answerErrorId: string; upgradeHref: string; onReload: () => void }) {
  if (error.code === "QUOTA_EXCEEDED" || error.code === "ENTITLEMENT_REQUIRED") {
    return (
      <Alert
        role="alert"
        tone="accent"
        title={error.code === "QUOTA_EXCEEDED" ? "You've reached today's practice limit" : "Not included in your plan"}
        action={
          <UpgradeButton fallbackHref={upgradeHref} variant="accent" />
        }
      >
        {error.message}
      </Alert>
    );
  }
  if (error.code === "CONFLICT" || error.code === "NOT_FOUND") {
    return (
      <Alert
        role="alert"
        tone="warning"
        title="This question can't be answered any more"
        action={
          <Button variant="outline" onClick={onReload} iconStart={<RotateCw aria-hidden="true" />}>
            Reload
          </Button>
        }
      >
        {error.message}
      </Alert>
    );
  }
  const fieldMessage = error.fieldErrors ? Object.values(error.fieldErrors).flat()[0] : undefined;
  // Linked to the answer controls (`QuestionView errorId`), so the reason is read again on returning to the answer.
  return (
    <Alert id={answerErrorId} role="alert" tone="danger" title="Your answer wasn't checked">
      {fieldMessage ?? error.message} Your answer is still here — try again.
    </Alert>
  );
}
