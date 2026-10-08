"use client";

import { ChevronRight, Flag, Lightbulb } from "lucide-react";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { RichContent } from "@/components/content/RichContent";
import { buttonStyles } from "@/components/ui/button-styles";
import type { SanitizedHtml } from "@/lib/content/types";
import type { SolutionStepView, SolveMode } from "@/server/solver/types";

export interface SolutionStepsProps {
  mode: SolveMode;
  steps: readonly SolutionStepView[];
  finalAnswerHtml: SanitizedHtml | null;
  /**
   * TEACH: how many steps are shown first (from `?step=`, see `initialRevealed`); `steps.length + 1` also shows the
   * final answer. Ignored in ANSWER mode (everything is shown).
   */
  initialRevealed?: number;
  /** Page path for the no-JS "Show next step" links (`<basePath>?step=N`). */
  basePath: string;
}

const stepTitleId = (index: number): string => `step-${index + 1}-title`;
const FINAL_ANSWER_TITLE_ID = "final-answer-title";

/**
 * The worked solution (§15). "Give me the answer": every step and the final answer at once. "Teach me": one step at a
 * time ("Show next step"), each with something to try first, and the final answer only after the last step.
 *
 * Progressive enhancement: the reveal controls are real links (`?step=N`), so they work without JavaScript and a
 * reload keeps the student's place. With JavaScript the next step appears instantly, focus moves to its heading and a
 * polite live region announces it. Formulas arrive pre-rendered (KaTeX on the server).
 */
export function SolutionSteps({ mode, steps, finalAnswerHtml, initialRevealed = 1, basePath }: SolutionStepsProps) {
  const total = steps.length;
  const maxRevealed = total + (finalAnswerHtml ? 1 : 0);
  const teach = mode === "TEACH";
  const [revealed, setRevealed] = useState(() => (teach ? Math.min(Math.max(initialRevealed, Math.min(1, total)), maxRevealed) : maxRevealed));
  const [announcement, setAnnouncement] = useState("");
  const focusNext = useRef<string | null>(null);

  useEffect(() => {
    if (!focusNext.current) return;
    document.getElementById(focusNext.current)?.focus();
    focusNext.current = null;
  }, [revealed]);

  const visibleSteps = steps.slice(0, Math.min(revealed, total));
  const answerShown = finalAnswerHtml !== null && revealed > total;

  function reveal(event: MouseEvent<HTMLAnchorElement>, next: number): void {
    event.preventDefault();
    const target = Math.min(next, maxRevealed);
    setRevealed(target);
    if (target > total) {
      focusNext.current = FINAL_ANSWER_TITLE_ID;
      setAnnouncement("Final answer shown.");
    } else {
      focusNext.current = stepTitleId(target - 1);
      setAnnouncement(`Step ${target} of ${total} shown.`);
    }
    try {
      window.history.replaceState(window.history.state, "", `${basePath}?step=${target}`);
    } catch {
      // Not critical: the reveal still works, a reload just starts again.
    }
  }

  if (total === 0) return null;

  return (
    <section aria-labelledby="solution-steps-title" className="space-y-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="solution-steps-title" className="text-lg font-semibold text-text">
          {teach ? "Work through it step by step" : "Worked solution"}
        </h2>
        {teach && (
          <p className="text-sm text-muted">
            Step {Math.min(revealed, total)} of {total}
          </p>
        )}
      </div>

      <ol className="space-y-4">
        {visibleSteps.map((step, index) => (
          <li key={stepTitleId(index)} id={`step-${index + 1}`} className="rounded-card border border-border bg-surface p-4 shadow-xs">
            <h3 id={stepTitleId(index)} tabIndex={-1} className="flex items-baseline gap-2 font-semibold text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus">
              <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-primary-soft text-sm text-on-primary-soft">
                {index + 1}
              </span>
              <span className="min-w-0 break-words">{step.title}</span>
            </h3>
            <RichContent html={step.explanationHtml} className="mt-2" />
            {step.formulaHtml && (
              <div className="relative mt-3 overflow-x-auto rounded-control bg-subtle px-3 py-2">
                <RichContent html={step.formulaHtml} />
              </div>
            )}
            {teach && step.tryThisHtml && (
              <div className="mt-3 flex gap-2 rounded-control border-l-4 border-accent bg-accent-soft px-3 py-2 text-sm">
                <Lightbulb aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent-text" />
                <div className="min-w-0">
                  <p className="font-semibold text-text">Your turn</p>
                  <RichContent html={step.tryThisHtml} />
                </div>
              </div>
            )}
          </li>
        ))}
      </ol>

      {teach && revealed < total && (
        <a href={`${basePath}?step=${revealed + 1}#step-${revealed + 1}`} onClick={(event) => reveal(event, revealed + 1)} className={buttonStyles({ variant: "primary" })}>
          Show next step
          <ChevronRight aria-hidden="true" />
        </a>
      )}
      {teach && revealed === total && finalAnswerHtml && (
        <a href={`${basePath}?step=${total + 1}#final-answer`} onClick={(event) => reveal(event, total + 1)} className={buttonStyles({ variant: "secondary" })}>
          <Flag aria-hidden="true" />
          Show the final answer
        </a>
      )}

      {answerShown && (
        <section id="final-answer" aria-labelledby={FINAL_ANSWER_TITLE_ID} className="rounded-card border border-primary bg-primary-soft p-4">
          <h3 id={FINAL_ANSWER_TITLE_ID} tabIndex={-1} className="font-semibold text-on-primary-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus">
            Final answer
          </h3>
          <RichContent html={finalAnswerHtml} className="mt-2" />
        </section>
      )}

      <p aria-live="polite" role="status" className="sr-only">
        {announcement}
      </p>
    </section>
  );
}
