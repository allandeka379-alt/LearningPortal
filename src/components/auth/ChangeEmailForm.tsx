"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Alert } from "@/components/ui/Alert";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { authLinkClassName } from "./AuthCard";
import { CodeInput } from "./CodeForms";
import { fieldError, previousValue, type AuthFormAction } from "./form-state";
import { FormStatus } from "./FormStatus";
import { PasswordInput } from "./PasswordInput";
import { SubmitButton } from "./SubmitButton";

export interface ChangeEmailFormProps {
  /** Handles both steps: `step=request` (new address + current password) and `step=confirm` (address + code). */
  action: AuthFormAction;
  /** Where "Done" goes after the change (validated on the server). */
  doneHref: string;
}

/**
 * Change (or add) the account email address: the new address and the current password, then the 6-digit code emailed
 * to the new address. The step and the new address travel in the form state (`values`), never a password or code.
 */
export function ChangeEmailForm({ action, doneHref }: ChangeEmailFormProps) {
  const [state, formAction] = useActionState(action, null);
  const step = previousValue(state, "step", "request");

  if (step === "done" && state?.ok) {
    return (
      <div className="space-y-4">
        <FormStatus state={state} />
        <Link href={doneHref} className={authLinkClassName}>
          Done
        </Link>
      </div>
    );
  }

  if (step === "confirm") {
    const email = previousValue(state, "email");
    return (
      <form action={formAction} className="space-y-4">
        <FormStatus state={state} />
        <input type="hidden" name="step" value="confirm" />
        <input type="hidden" name="email" value={email} />
        <Field label="6-digit code" hint="It expires in 10 minutes. Check your spam folder if it hasn't arrived." error={fieldError(state, "code")} required>
          <CodeInput />
        </Field>
        <SubmitButton pendingText="Checking…">Confirm new email</SubmitButton>
        <p className="text-sm text-muted">
          Wrong address?{" "}
          <Link href="/change-email" className={authLinkClassName}>
            Start again
          </Link>
        </p>
      </form>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      <FormStatus state={state} />
      <input type="hidden" name="step" value="request" />
      <Field label="New email address" hint="We'll send a 6-digit code to it to confirm it's yours." error={fieldError(state, "email")} required>
        <Input
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          maxLength={254}
          defaultValue={previousValue(state, "email")}
        />
      </Field>
      <Field label="Current password" error={fieldError(state, "currentPassword")} required>
        <PasswordInput name="currentPassword" autoComplete="current-password" />
      </Field>
      <Alert tone="info">Sign-in codes and password resets will go to the new address once you confirm it.</Alert>
      <SubmitButton pendingText="Sending code…">Send code</SubmitButton>
    </form>
  );
}
