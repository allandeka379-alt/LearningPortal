"use client";

import { useActionState, type ReactNode } from "react";
import { FormFeedback } from "@/components/student/FormFeedback";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { fieldErrorsOf, type FamilyFormAction } from "./action-state";
import { keepValuesSubmit } from "./keep-values-submit";

export interface EnterCodeFormProps {
  action: FamilyFormAction;
  label: string;
  hint?: ReactNode;
  submitLabel: string;
  /** Extra fields (relationship picker, permission checkboxes). */
  children?: ReactNode;
}

/**
 * Enter a parent-link code (§21): one forgiving text field (case, spaces and dashes are ignored by the service),
 * with field errors and the outcome announced politely. On success the Server Action may redirect.
 */
export function EnterCodeForm({ action, label, hint, submitLabel, children }: EnterCodeFormProps) {
  const [state, formAction, pending] = useActionState(action, null);
  return (
    // Keeps a mistyped code in the field after an error, so it can be corrected.
    <form method="post" onSubmit={keepValuesSubmit(formAction)} className="space-y-4">
      <Field label={label} hint={hint ?? "8 letters and numbers, for example ABCD-EFGH."} error={fieldErrorsOf(state, "code")} required>
        <Input
          name="code"
          autoComplete="off"
          autoCapitalize="characters"
          spellCheck={false}
          inputMode="text"
          maxLength={20}
          placeholder="ABCD-EFGH"
          className="font-mono tracking-widest uppercase sm:max-w-xs"
        />
      </Field>
      {children}
      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" loading={pending} loadingText="Checking…">
          {submitLabel}
        </Button>
        <FormFeedback state={state && !state.ok && fieldErrorsOf(state, "code") ? null : state} />
      </div>
    </form>
  );
}
