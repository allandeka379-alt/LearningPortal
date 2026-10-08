"use client";

import { useActionState } from "react";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { fieldError, previousValue, type AuthFormAction } from "./form-state";
import { FormStatus } from "./FormStatus";
import { SubmitButton } from "./SubmitButton";

/** Forgot password, step 1: ask for a reset code by email. */
export function ForgotPasswordForm({ action }: { action: AuthFormAction }) {
  const [state, formAction] = useActionState(action, null);
  return (
    <form action={formAction} className="space-y-4">
      <FormStatus state={state} />
      <Field label="Email address" hint="The one on your account. We'll email you a 6-digit reset code." error={fieldError(state, "identifier")} required>
        <Input
          name="identifier"
          type="email"
          inputMode="email"
          autoComplete="email"
          maxLength={254}
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          defaultValue={previousValue(state, "identifier")}
        />
      </Field>
      <SubmitButton pendingText="Sending code…">Send reset code</SubmitButton>
    </form>
  );
}
