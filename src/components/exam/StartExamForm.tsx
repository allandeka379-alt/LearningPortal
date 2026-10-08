"use client";

import { UpgradeButton } from "@/components/billing/UpgradeOffer";
import { Play } from "lucide-react";
import { useActionState } from "react";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import type { ActionResult } from "@/server/lib/errors";

export interface StartExamFormProps<T> {
  assessmentId: string;
  /** Generated once per page view on the server: a double tap or a resubmitted form resumes the same attempt. */
  idempotencyKey: string;
  origin: string;
  /** "Start test", "Start mock exam". */
  label: string;
  upgradeHref: string;
  action: (state: ActionResult<T> | null, formData: FormData) => Promise<ActionResult<T> | null>;
}

const UPGRADE_CODES = new Set(["ENTITLEMENT_REQUIRED", "QUOTA_EXCEEDED"]);

/**
 * "Start" on the instructions page: a plain form post to the start Server Action (works without JavaScript), which
 * opens the exam room. Failures (plan, allowance, no attempts left, test not set up) are shown in place with the way
 * forward.
 */
export function StartExamForm<T>({ assessmentId, idempotencyKey, origin, label, upgradeHref, action }: StartExamFormProps<T>) {
  const [state, formAction, pending] = useActionState(action, null);
  const error = state && !state.ok ? state.error : null;
  return (
    <form action={formAction} className="space-y-3">
      <input type="hidden" name="assessmentId" value={assessmentId} />
      <input type="hidden" name="idempotencyKey" value={idempotencyKey} />
      <input type="hidden" name="origin" value={origin} />
      <Button type="submit" size="lg" loading={pending} loadingText="Starting…" iconStart={<Play aria-hidden="true" />} className="w-full sm:w-auto">
        {label}
      </Button>
      {error && (
        <Alert
          tone={UPGRADE_CODES.has(error.code) ? "accent" : "danger"}
          role="alert"
          action={
            UPGRADE_CODES.has(error.code) ? (
              <UpgradeButton fallbackHref={upgradeHref} variant="outline" />
            ) : undefined
          }
        >
          {error.message}
        </Alert>
      )}
    </form>
  );
}
