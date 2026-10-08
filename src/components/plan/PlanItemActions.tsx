"use client";

import { Check, SkipForward, Undo2 } from "lucide-react";
import { useActionState, type ReactNode } from "react";
import type { FormAction } from "@/components/student/action-state";
import { Button } from "@/components/ui/Button";

export interface PlanItemActionsProps {
  itemId: string;
  /** StudyPlanItemStatus. */
  status: string;
  /** Names the item in button labels ("Mark Algebra as done"). */
  itemTitle: string;
  /** Server Action taking `itemId` and `status` (DONE | SKIPPED | PENDING). */
  action: FormAction;
}

/**
 * The student's own ticks on a plan item: Done and Skip for an open item, Undo for one done or skipped. Each button is
 * its own small form (works before hydration). The outcome is announced politely; errors are also shown.
 */
export function PlanItemActions({ itemId, status, itemTitle, action }: PlanItemActionsProps) {
  const [state, formAction, pending] = useActionState(action, null);
  const open = status === "PENDING" || status === "PARTIAL" || status === "MISSED";

  const tick = (value: "DONE" | "SKIPPED" | "PENDING", label: string, ariaLabel: string, icon: ReactNode, variant: "outline" | "ghost") => (
    <form action={formAction}>
      <input type="hidden" name="itemId" value={itemId} />
      <input type="hidden" name="status" value={value} />
      <Button type="submit" variant={variant} disabled={pending} aria-label={ariaLabel} iconStart={icon}>
        {label}
      </Button>
    </form>
  );

  return (
    <div className="flex flex-col items-start gap-1 sm:items-end">
      <div className="flex flex-wrap gap-2">
        {open ? (
          <>
            {tick("DONE", "Done", `Mark ${itemTitle} as done`, <Check aria-hidden="true" />, "outline")}
            {tick("SKIPPED", "Skip", `Skip ${itemTitle}`, <SkipForward aria-hidden="true" />, "ghost")}
          </>
        ) : (
          tick("PENDING", "Undo", `Undo: put ${itemTitle} back in your plan`, <Undo2 aria-hidden="true" />, "ghost")
        )}
      </div>
      <p role="status" aria-live="polite" className={state !== null && !state.ok ? "text-xs text-danger-text" : "sr-only"}>
        {state === null ? "" : state.ok ? state.data.message : state.error.message}
      </p>
    </div>
  );
}
