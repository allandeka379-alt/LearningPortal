"use client";

import { useActionState, useState } from "react";
import { FormFeedback } from "@/components/student/FormFeedback";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { fieldErrorsOf, type FamilyFormAction } from "./action-state";
import { keepValuesSubmit } from "./keep-values-submit";

export interface AiConsentFormProps {
  linkId: string;
  parentName: string;
  action: FamilyFormAction;
  /** Where "Keep them private" goes. */
  backHref: string;
}

/**
 * The explicit consent step for sharing AI tutor conversations with ONE parent (§21). The share button stays disabled
 * until the student ticks the confirmation; the service also refuses without `confirmed=on`. Declining is a plain link
 * back: nothing changes.
 */
export function AiConsentForm({ linkId, parentName, action, backHref }: AiConsentFormProps) {
  const [state, formAction, pending] = useActionState(action, null);
  const [confirmed, setConfirmed] = useState(false);
  const errors = fieldErrorsOf(state, "confirmed");
  return (
    <form method="post" onSubmit={keepValuesSubmit(formAction)} className="space-y-4">
      <input type="hidden" name="linkId" value={linkId} />
      <input type="hidden" name="allow" value="on" />
      <Checkbox
        name="confirmed"
        checked={confirmed}
        onChange={(event) => setConfirmed(event.currentTarget.checked)}
        invalid={Boolean(errors)}
        label={`I understand that ${parentName} will be able to read my AI tutor and solver conversations, and that I can stop this at any time.`}
      />
      {errors && <p className="text-sm text-danger-text">{errors[0]}</p>}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" disabled={!confirmed} loading={pending} loadingText="Saving…">
          Share my AI conversations
        </Button>
        <ButtonLink href={backHref} variant="ghost">
          No, keep them private
        </ButtonLink>
      </div>
      <FormFeedback state={state && !errors ? state : null} />
    </form>
  );
}
