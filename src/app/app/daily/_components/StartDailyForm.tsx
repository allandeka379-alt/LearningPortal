"use client";

import { UpgradeButton } from "@/components/billing/UpgradeOffer";
import { ArrowRight } from "lucide-react";
import { useActionState } from "react";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import type { ActionResult } from "@/server/lib/errors";

export interface StartDailyFormProps {
  subjectId: string;
  subjectName: string;
  upgradeHref: string;
  action: (state: ActionResult<string> | null, formData: FormData) => Promise<ActionResult<string> | null>;
}

/** "Show today's question": opens the day's question for the subject (form post; works without JavaScript). */
export function StartDailyForm({ subjectId, subjectName, upgradeHref, action }: StartDailyFormProps) {
  const [state, formAction, pending] = useActionState(action, null);
  const error = state && !state.ok ? state.error : null;
  const upgrade = error?.code === "ENTITLEMENT_REQUIRED" || error?.code === "QUOTA_EXCEEDED";
  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="subjectId" value={subjectId} />
      <Button type="submit" size="lg" loading={pending} loadingText="Opening…" iconEnd={<ArrowRight aria-hidden="true" />}>
        Show today&apos;s {subjectName} question
      </Button>
      {error && (
        <Alert
          role="alert"
          tone={upgrade ? "accent" : "danger"}
          title={upgrade ? "Not included in your plan" : "Today's question couldn't open"}
          action={
            upgrade ? (
              <UpgradeButton fallbackHref={upgradeHref} variant="accent" />
            ) : undefined
          }
        >
          {error.message}
        </Alert>
      )}
    </form>
  );
}
