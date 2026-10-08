"use client";

import { useActionState } from "react";
import { fieldErrorsOf, type FamilyFormAction } from "@/components/family/action-state";
import { keepValuesSubmit } from "@/components/family/keep-values-submit";
import { RELATIONSHIP_OPTIONS } from "@/components/family/labels";
import { FormFeedback } from "@/components/student/FormFeedback";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

/**
 * Ask to link by the child's email, phone number or school username (§21 flow c). The answer is the same whether or
 * not an account matches (no account discovery); the child approves in their own account.
 */
export function RequestLinkForm({ action }: { action: FamilyFormAction }) {
  const [state, formAction, pending] = useActionState(action, null);
  return (
    <form method="post" onSubmit={keepValuesSubmit(formAction)} className="space-y-4">
      <Field
        label="Your child's email, phone number or username"
        hint="Use what they sign in with. Phone numbers like 0771234567 are fine."
        error={fieldErrorsOf(state, "identifier")}
        required
      >
        <Input name="identifier" autoComplete="off" spellCheck={false} maxLength={254} />
      </Field>
      <RelationshipSelect error={fieldErrorsOf(state, "relationship")} />
      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" variant="secondary" loading={pending} loadingText="Sending…">
          Send request
        </Button>
        <FormFeedback state={state && !state.ok && fieldErrorsOf(state, "identifier") ? null : state} />
      </div>
    </form>
  );
}

/** "How are you related?" select (default Parent). Shared by the code and request forms. */
export function RelationshipSelect({ error, name = "relationship" }: { error?: string[] | undefined; name?: string }) {
  return (
    <Field label="How are you related?" error={error}>
      <Select name={name} defaultValue="PARENT" options={RELATIONSHIP_OPTIONS} className="sm:max-w-xs" />
    </Field>
  );
}
