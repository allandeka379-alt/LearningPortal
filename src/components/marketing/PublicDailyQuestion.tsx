"use client";

import { ArrowRight, RotateCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition, type FormEvent } from "react";
import { FeedbackPanel } from "@/components/questions/FeedbackPanel";
import { QuestionView } from "@/components/questions/QuestionView";
import type { PresentedFeedback, PresentedQuestion, QuestionResponse } from "@/components/questions/types";
import { Alert } from "@/components/ui/Alert";
import { Button, ButtonLink } from "@/components/ui/Button";
import type { ActionResult } from "@/server/lib/errors";

/** What the anonymous marking action receives. */
export interface PublicDailyAnswer {
  /** The `answerId` prop: a DailyQuestion id on /daily, a Question id for an SEO topic-page sample. */
  id: string;
  response: QuestionResponse;
}

export type PublicDailyAction = (input: PublicDailyAnswer) => Promise<ActionResult<PresentedFeedback>>;

export interface PublicDailyQuestionProps {
  /** Passed back to `action` as `id` (a DailyQuestion id, or a Question id for a topic-page sample). */
  answerId: string;
  question: PresentedQuestion;
  /** Visible heading, e.g. "Mathematics". */
  heading: string;
  headingLevel?: 2 | 3;
  action: PublicDailyAction;
  /** Sign-up link shown with the feedback (e.g. continuing to the signed-in daily question, for streaks). */
  signUpHref: string;
  /** Label of that link. Default "Sign up to keep a streak". */
  signUpLabel?: string;
  signInHref: string;
}

type ActionError = Extract<ActionResult<never>, { ok: false }>["error"];

/**
 * A public question for signed-out visitors: the daily question (§46) and the practice sample of SEO topic pages (§44).
 * Answer → "Check answer" → marked on the server (nothing is stored, rate-limited per IP) → the same feedback panel
 * students see, with an invitation to sign up. The question and the feedback are rendered on the server; this island
 * only holds the answer and calls the Server Action.
 */
export function PublicDailyQuestion({
  answerId,
  question,
  heading,
  headingLevel = 2,
  action,
  signUpHref,
  signUpLabel = "Sign up to keep a streak",
  signInHref,
}: PublicDailyQuestionProps) {
  const router = useRouter();
  const [response, setResponse] = useState<QuestionResponse | null>(null);
  const [feedback, setFeedback] = useState<PresentedFeedback | null>(null);
  const [error, setError] = useState<ActionError | null>(null);
  const [checking, startChecking] = useTransition();

  const check = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (response === null || checking) return;
    setError(null);
    const answer = response;
    startChecking(async () => {
      const result = await action({ id: answerId, response: answer });
      if (result.ok) setFeedback(result.data);
      else setError(result.error);
    });
  };

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
        />
        {error && (
          <Alert
            role="alert"
            tone={error.code === "RATE_LIMITED" ? "accent" : error.code === "NOT_FOUND" ? "warning" : "danger"}
            title={error.code === "RATE_LIMITED" ? "Take a short break" : error.code === "NOT_FOUND" ? "This question has changed" : "Your answer wasn't checked"}
            action={
              error.code === "NOT_FOUND" ? (
                <Button variant="outline" onClick={() => router.refresh()} iconStart={<RotateCw aria-hidden="true" />}>
                  Reload
                </Button>
              ) : error.code === "RATE_LIMITED" ? (
                <ButtonLink href={signUpHref} variant="accent">
                  Create a free account
                </ButtonLink>
              ) : undefined
            }
          >
            {error.fieldErrors ? (Object.values(error.fieldErrors).flat()[0] ?? error.message) : error.message}
          </Alert>
        )}
        {!feedback && (
          <div className="flex justify-end">
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
          actions={
            <>
              <ButtonLink href={signUpHref} size="lg" iconEnd={<ArrowRight aria-hidden="true" />}>
                {signUpLabel}
              </ButtonLink>
              <ButtonLink href={signInHref} size="lg" variant="ghost">
                I have an account
              </ButtonLink>
            </>
          }
        />
      )}
    </div>
  );
}
