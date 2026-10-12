"use client";

import { ArrowRight, ClipboardCheck } from "lucide-react";
import { useActionState, type ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { Alert } from "@/components/ui/Alert";
import { Button, ButtonLink, type ButtonVariant } from "@/components/ui/Button";
import { formMessages, type OnboardingFormAction } from "./form-state";

export interface FinishFormProps {
  action: OnboardingFormAction;
  /** The student's plan includes the diagnostic (§46). */
  diagnosticIncluded: boolean;
  /** The student has no full access yet: finishing continues to the unlock page (no free tier, 2026-10-12). */
  unlockNext?: boolean;
  /** The subjects screen, offered when a chosen subject can no longer be added. */
  subjectsHref: string;
  /** Validated page to open instead of the dashboard once set up (hidden `next` field). */
  next?: string | null;
}

function ChoiceButton({ value, variant, icon, children }: { value: string; variant: ButtonVariant; icon: ReactNode; children: ReactNode }) {
  const { pending, data } = useFormStatus();
  const mine = pending && data?.get("choice") === value;
  return (
    <Button type="submit" name="choice" value={value} variant={variant} size="lg" loading={mine} loadingText="Setting up…" disabled={pending} iconEnd={icon} className="w-full sm:w-auto">
      {children}
    </Button>
  );
}

/**
 * Last onboarding screen's actions (§52 step 4 → 5): "Start the diagnostic" (recommended) or go to the dashboard.
 * Both submit the same form (the pressed button's `choice` is posted), so it works without JavaScript; the server
 * enrols the chosen subjects, completes onboarding and redirects.
 */
export function FinishForm({ action, diagnosticIncluded, unlockNext = false, subjectsHref, next = null }: FinishFormProps) {
  const [state, formAction] = useActionState(action, null);
  const messages = formMessages(state);
  const subjectProblem = state !== null && !state.ok && (state.error.fieldErrors?.subjectIds?.length ?? 0) > 0;
  return (
    <form action={formAction} className="space-y-4">
      {next ? <input type="hidden" name="next" value={next} /> : null}
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        {diagnosticIncluded && (
          <ChoiceButton value="diagnostic" variant="primary" icon={<ClipboardCheck aria-hidden="true" />}>
            Start the diagnostic
          </ChoiceButton>
        )}
        <ChoiceButton value="dashboard" variant={diagnosticIncluded ? "outline" : "primary"} icon={<ArrowRight aria-hidden="true" />}>
          {unlockNext ? "Continue to full access" : diagnosticIncluded ? "Skip for now, go to my dashboard" : "Go to my dashboard"}
        </ChoiceButton>
      </div>
      {messages.length > 0 && (
        <Alert
          tone="danger"
          role="alert"
          title="We couldn't finish setting up"
          action={
            subjectProblem ? (
              <ButtonLink href={subjectsHref} variant="outline">
                Change subjects
              </ButtonLink>
            ) : undefined
          }
        >
          <ul className="space-y-0.5">
            {messages.map((message) => (
              <li key={message}>{message}</li>
            ))}
          </ul>
        </Alert>
      )}
    </form>
  );
}
