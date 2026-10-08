"use client";

import { RefreshCw } from "lucide-react";
import { useActionState } from "react";
import type { FormAction } from "@/components/student/action-state";
import { FormFeedback } from "@/components/student/FormFeedback";
import { Button } from "@/components/ui/Button";

/**
 * "Update my plan" (§16 adapts dynamically): re-plans the coming days from the student's latest results, keeping what
 * is done. The result is announced under the button.
 */
export function AdaptPlanButton({ action }: { action: FormAction }) {
  const [state, formAction, pending] = useActionState(action, null);
  return (
    <form action={formAction} className="flex flex-col items-start gap-1 sm:items-end">
      <Button type="submit" variant="secondary" loading={pending} loadingText="Updating…" iconStart={<RefreshCw aria-hidden="true" />}>
        Update my plan
      </Button>
      <FormFeedback state={state} className="sm:text-right" />
    </form>
  );
}
