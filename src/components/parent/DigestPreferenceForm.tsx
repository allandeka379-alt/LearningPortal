"use client";

import { useActionState } from "react";
import { fieldErrorsOf, type FamilyFormAction } from "@/components/family/action-state";
import { FormFeedback } from "@/components/student/FormFeedback";
import { Button } from "@/components/ui/Button";
import { RadioGroup } from "@/components/ui/RadioGroup";
import type { ParentDigestPreference } from "@/server/family/schemas";

const OPTIONS: readonly { value: ParentDigestPreference; label: string; description: string }[] = [
  { value: "WEEKLY", label: "Weekly", description: "Every Sunday evening: study time and marked tests for each child, as far as they share them." },
  { value: "MONTHLY", label: "Monthly", description: "In the first week of each month, covering the last 30 days." },
  { value: "OFF", label: "Off", description: "No summaries. You can still open the dashboard at any time." },
];

/** Parent summary preference (§21 weekly summary; stored in the profile's notification preferences). */
export function DigestPreferenceForm({ value, action }: { value: ParentDigestPreference; action: FamilyFormAction }) {
  const [state, formAction, pending] = useActionState(action, null);
  return (
    <form action={formAction} className="space-y-4">
      <RadioGroup
        legend="Progress summary"
        hint="Sent to your notifications inbox."
        name="parentDigest"
        defaultValue={value}
        appearance="card"
        error={fieldErrorsOf(state, "parentDigest") ?? fieldErrorsOf(state, "_form")}
        options={OPTIONS}
      />
      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" loading={pending} loadingText="Saving…">
          Save
        </Button>
        <FormFeedback state={state} />
      </div>
    </form>
  );
}
