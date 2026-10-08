"use client";

import { CircleAlert, CircleCheck } from "lucide-react";
import { useActionState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import type { ActionResult } from "@/server/lib/errors";

/** Result of the "Mark as complete" Server Action: a confirmation to announce (including XP actually recorded). */
export type CompleteLessonState = ActionResult<{ message: string }> | null;
export type CompleteLessonAction = (state: CompleteLessonState, formData: FormData) => Promise<CompleteLessonState>;

export interface MarkCompleteFormProps {
  lessonId: string;
  action: CompleteLessonAction;
  /** Already completed when the page was rendered. */
  completed: boolean;
  /** e.g. "Completed on 5 Oct 2026" (formatted on the server in the student's time zone). */
  completedLabel?: string | null;
  className?: string;
}

/**
 * "Mark as complete" (§8). A plain form post that also works without JavaScript; with it, the outcome is announced in
 * a polite live region and the button gives way to the completed state. Completing is idempotent on the server.
 */
export function MarkCompleteForm({ lessonId, action, completed, completedLabel, className }: MarkCompleteFormProps) {
  const [state, formAction, pending] = useActionState(action, null);
  const done = completed || state?.ok === true;
  const message = state === null ? null : state.ok ? state.data.message : state.error.message;

  return (
    <div className={cn("space-y-3", className)}>
      {done ? (
        <div className="flex items-start gap-3">
          <CircleCheck aria-hidden="true" className="mt-0.5 size-6 shrink-0 text-success-text" />
          <div>
            <p className="font-semibold text-text">Lesson completed</p>
            {completedLabel && !state?.ok && <p className="text-sm text-muted">{completedLabel}</p>}
          </div>
        </div>
      ) : (
        <form action={formAction}>
          <input type="hidden" name="lessonId" value={lessonId} />
          <Button type="submit" size="lg" loading={pending} loadingText="Saving…" iconStart={<CircleCheck aria-hidden="true" />} fullWidth className="sm:w-auto">
            Mark as complete
          </Button>
        </form>
      )}
      <p role="status" aria-live="polite" className="min-h-5 text-sm">
        {message && state && (
          <span className={cn("inline-flex items-start gap-1.5", state.ok ? "text-success-text" : "text-danger-text")}>
            {!state.ok && <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />}
            <span>{message}</span>
          </span>
        )}
      </p>
    </div>
  );
}
