"use client";

import { RefreshCw } from "lucide-react";
import { useActionState } from "react";
import type { FamilyFormAction } from "@/components/family/action-state";
import { FormFeedback } from "@/components/student/FormFeedback";
import { Button } from "@/components/ui/Button";

/** "Check again" for a pending payment; the result is announced politely and the page data refreshes. */
export function RefreshPaymentForm({ paymentId, action }: { paymentId: string; action: FamilyFormAction }) {
  const [state, formAction, pending] = useActionState(action, null);
  return (
    <form action={formAction} className="flex flex-wrap items-center gap-3">
      <input type="hidden" name="paymentId" value={paymentId} />
      <Button type="submit" variant="outline" iconStart={<RefreshCw aria-hidden="true" />} loading={pending} loadingText="Checking…">
        Check again
      </Button>
      <FormFeedback state={state} />
    </form>
  );
}
