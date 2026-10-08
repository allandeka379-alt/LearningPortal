"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useActionState, type ReactNode } from "react";
import { Alert } from "@/components/ui/Alert";
import { Button, ButtonLink } from "@/components/ui/Button";
import { formMessages, type OnboardingFormAction } from "./form-state";

export interface StepFormProps {
  /** Wizard step key, posted as the hidden `step` field. */
  step: string;
  /** The save Server Action (redirects to the next screen on success). */
  action: OnboardingFormAction;
  /** Previous screen (a plain link, so Back works without JavaScript); null on the first screen. */
  backHref: string | null;
  submitLabel?: string;
  /** id of the error region, so the screen's controls can point at it with `aria-describedby`. */
  errorId: string;
  /** The screen's controls (server-rendered). */
  children: ReactNode;
  /** Validated page to continue to after the wizard, posted as the hidden `next` field. */
  next?: string | null;
}

/**
 * One wizard screen's form (§5): the screen's controls, a polite error region and Back / Continue. A plain form post
 * to the Server Action, so the wizard works without JavaScript; with JavaScript the submit shows a spinner and the
 * page never reloads. Touch targets are 44px or more; on phones Continue sits above Back, full width, within thumb
 * reach.
 */
export function StepForm({ step, action, backHref, submitLabel = "Continue", errorId, children, next = null }: StepFormProps) {
  const [state, formAction, pending] = useActionState(action, null);
  const messages = formMessages(state);
  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="step" value={step} />
      {next ? <input type="hidden" name="next" value={next} /> : null}
      {children}
      <div id={errorId}>
        {messages.length > 0 && (
          <Alert tone="danger" role="alert" title="Please check your answer">
            {messages.length === 1 ? (
              messages[0]
            ) : (
              <ul className="list-disc space-y-0.5 pl-5">
                {messages.map((message) => (
                  <li key={message}>{message}</li>
                ))}
              </ul>
            )}
          </Alert>
        )}
      </div>
      <div className="flex flex-col-reverse gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
        {backHref ? (
          <ButtonLink href={backHref} variant="ghost" iconStart={<ArrowLeft aria-hidden="true" />} className="justify-center sm:justify-start">
            Back
          </ButtonLink>
        ) : (
          <span aria-hidden="true" className="hidden sm:block" />
        )}
        <Button type="submit" size="lg" loading={pending} loadingText="Saving…" iconEnd={<ArrowRight aria-hidden="true" />} className="w-full sm:w-auto">
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
