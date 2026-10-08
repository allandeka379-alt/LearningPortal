"use client";

import { UpgradeButton } from "@/components/billing/UpgradeOffer";
import { ArrowRight, RotateCcw } from "lucide-react";
import { useActionState } from "react";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import type { ActionResult } from "@/server/lib/errors";

/** Null before the first submit; a failure otherwise (success redirects back to the lesson's questions). */
export type StartLessonCheckState = ActionResult<never> | null;
export type StartLessonCheckAction = (state: StartLessonCheckState, formData: FormData) => Promise<StartLessonCheckState>;

export interface StartLessonCheckFormProps {
  lessonId: string;
  /** Topic the lesson is read in (kept in the URL after starting). */
  topicId: string;
  /** Generated per page render, so a double tap starts one attempt. */
  idempotencyKey: string;
  action: StartLessonCheckAction;
  /** `retry` after a finished check ("Try again"). */
  mode?: "start" | "retry";
  upgradeHref: string;
}

/** Starts (or resumes) the lesson's practice questions. Works as a plain form post without JavaScript. */
export function StartLessonCheckForm({ lessonId, topicId, idempotencyKey, action, mode = "start", upgradeHref }: StartLessonCheckFormProps) {
  const [state, formAction, pending] = useActionState(action, null);
  const error = state !== null && !state.ok ? state.error : null;

  return (
    <div className="space-y-3">
      <form action={formAction}>
        <input type="hidden" name="lessonId" value={lessonId} />
        <input type="hidden" name="topicId" value={topicId} />
        <input type="hidden" name="idempotencyKey" value={idempotencyKey} />
        {mode === "retry" ? (
          <Button type="submit" variant="outline" loading={pending} loadingText="Starting…" iconStart={<RotateCcw aria-hidden="true" />}>
            Try again
          </Button>
        ) : (
          <Button type="submit" size="lg" loading={pending} loadingText="Starting…" iconEnd={<ArrowRight aria-hidden="true" />} fullWidth className="sm:w-auto">
            Start the questions
          </Button>
        )}
      </form>
      {error && (
        <Alert
          role="alert"
          tone={error.code === "ENTITLEMENT_REQUIRED" ? "accent" : "danger"}
          title={error.code === "ENTITLEMENT_REQUIRED" ? "Not included in your plan" : "The questions couldn't start"}
          action={
            error.code === "ENTITLEMENT_REQUIRED" ? (
              <UpgradeButton fallbackHref={upgradeHref} variant="accent" />
            ) : undefined
          }
        >
          {error.fieldErrors ? (Object.values(error.fieldErrors).flat()[0] ?? error.message) : error.message}
        </Alert>
      )}
    </div>
  );
}
