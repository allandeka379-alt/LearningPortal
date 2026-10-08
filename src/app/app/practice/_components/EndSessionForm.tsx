"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/Button";
import type { ActionResult } from "@/server/lib/errors";

export interface EndSessionFormProps {
  attemptId: string;
  action: (state: ActionResult<string> | null, formData: FormData) => Promise<ActionResult<string> | null>;
  /** Answered so far: ending with none answered says so plainly. */
  answered: number;
}

/** "End session": scores what has been answered and opens the summary. Works without JavaScript (form post). */
export function EndSessionForm({ attemptId, action, answered }: EndSessionFormProps) {
  const [state, formAction, pending] = useActionState(action, null);
  return (
    <form action={formAction} className="space-y-2">
      <input type="hidden" name="attemptId" value={attemptId} />
      <Button type="submit" variant="ghost" loading={pending} loadingText="Ending…">
        End session and see results
      </Button>
      <p className="text-xs text-muted">
        {answered === 0
          ? "You haven't answered any questions yet, so there will be nothing to score."
          : "Unanswered questions are left out of your score."}
      </p>
      {state && !state.ok && (
        <p role="alert" className="text-sm text-danger-text">
          {state.error.message}
        </p>
      )}
    </form>
  );
}
