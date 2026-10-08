"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import type { FormAction } from "@/components/student/action-state";
import { FormFeedback } from "@/components/student/FormFeedback";
import { Button } from "@/components/ui/Button";

export interface SubscriptionActionsProps {
  subscriptionId: string;
  cancelAtPeriodEnd: boolean;
  /** Formatted end of the paid period, e.g. "6 Nov 2026". */
  periodEndLabel: string | null;
  cancelAction: FormAction;
  resumeAction: FormAction;
}

/**
 * Cancel at period end / keep the plan (§31). Cancelling asks for confirmation inline (no modal: works on any phone)
 * and says exactly what happens; focus moves to that explanation. Results are announced politely and the page data
 * refreshes (the Server Actions revalidate /app/billing).
 */
export function SubscriptionActions({ subscriptionId, cancelAtPeriodEnd, periodEndLabel, cancelAction, resumeAction }: SubscriptionActionsProps) {
  const [cancelState, cancelFormAction, cancelling] = useActionState(cancelAction, null);
  const [resumeState, resumeFormAction, resuming] = useActionState(resumeAction, null);
  const [confirming, setConfirming] = useState(false);
  const [seenCancelled, setSeenCancelled] = useState(cancelAtPeriodEnd);
  if (seenCancelled !== cancelAtPeriodEnd) {
    // The plan changed on the server (cancelled or resumed): close the confirmation.
    setSeenCancelled(cancelAtPeriodEnd);
    setConfirming(false);
  }
  const explanationRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    if (confirming) explanationRef.current?.focus();
  }, [confirming]);

  if (cancelAtPeriodEnd) {
    return (
      <form action={resumeFormAction} className="flex flex-wrap items-center gap-3">
        <input type="hidden" name="subscriptionId" value={subscriptionId} />
        <Button type="submit" variant="outline" loading={resuming} loadingText="Saving…">
          Keep my plan
        </Button>
        <FormFeedback state={resumeState ?? cancelState} />
      </form>
    );
  }

  if (!confirming) {
    return (
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="ghost" onClick={() => setConfirming(true)}>
          Cancel plan
        </Button>
        <FormFeedback state={resumeState} />
      </div>
    );
  }

  return (
    <form action={cancelFormAction} className="space-y-3 rounded-card border border-border bg-subtle p-4">
      <input type="hidden" name="subscriptionId" value={subscriptionId} />
      <p ref={explanationRef} tabIndex={-1} className="text-sm text-text focus-visible:outline-offset-4">
        {periodEndLabel
          ? `Your plan will stop on ${periodEndLabel}. You keep full access until then, and nothing more is charged.`
          : "Your plan will stop at the end of the paid period. You keep full access until then, and nothing more is charged."}
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" variant="danger" loading={cancelling} loadingText="Cancelling…">
          Cancel at period end
        </Button>
        <Button variant="outline" onClick={() => setConfirming(false)}>
          Keep my plan
        </Button>
      </div>
      <FormFeedback state={cancelState} />
    </form>
  );
}
