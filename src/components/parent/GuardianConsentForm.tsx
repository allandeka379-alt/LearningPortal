"use client";

import { useActionState, useState } from "react";
import { fieldErrorsOf, type FamilyFormAction } from "@/components/family/action-state";
import { keepValuesSubmit } from "@/components/family/keep-values-submit";
import { FormFeedback } from "@/components/student/FormFeedback";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { APP_NAME } from "@/lib/config";

export interface GuardianConsentFormProps {
  studentUserId: string;
  childName: string;
  action: FamilyFormAction;
}

/**
 * Guardian consent for a minor (ARCHITECTURE §5.12, method PARENT_ACCOUNT): an explicit confirmation that the parent
 * is the child's parent or legal guardian and consents; the button stays disabled until it is ticked and the service
 * refuses without it.
 */
export function GuardianConsentForm({ studentUserId, childName, action }: GuardianConsentFormProps) {
  const [state, formAction, pending] = useActionState(action, null);
  const [confirmed, setConfirmed] = useState(false);
  const errors = fieldErrorsOf(state, "confirmed");
  return (
    <form method="post" onSubmit={keepValuesSubmit(formAction)} className="space-y-3">
      <input type="hidden" name="studentUserId" value={studentUserId} />
      <Checkbox
        name="confirmed"
        checked={confirmed}
        onChange={(event) => setConfirmed(event.currentTarget.checked)}
        invalid={Boolean(errors)}
        label={`I am ${childName}'s parent or legal guardian, and I consent to ${APP_NAME} using their learning data to run their account.`}
      />
      {errors && <p className="text-sm text-danger-text">{errors[0]}</p>}
      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={!confirmed} loading={pending} loadingText="Saving…">
          Give consent
        </Button>
        <FormFeedback state={errors ? null : state} />
      </div>
    </form>
  );
}
