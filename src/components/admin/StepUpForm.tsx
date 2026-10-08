"use client";

import { ShieldCheck } from "lucide-react";
import { useActionState, useEffect, useId } from "react";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { fieldErrorsFor } from "./form-state";
import { confirmPasswordAction } from "./step-up-actions";

export interface StepUpFormProps {
  /** Called once the password was confirmed (the user can then retry the sensitive action). */
  onConfirmed?: () => void;
  className?: string;
}

/**
 * Inline password confirmation for sensitive admin actions (role grants, refunds, settings, kill switches;
 * ARCHITECTURE §5.1 step-up). Rendered by `ActionForm` / `ConfirmAction` when an action answers REAUTH_REQUIRED.
 * Its own `<form>`: never nest it inside another form.
 */
export function StepUpForm({ onConfirmed, className }: StepUpFormProps) {
  const [state, formAction, pending] = useActionState(confirmPasswordAction, null);
  const headingId = useId();

  useEffect(() => {
    if (state?.ok) onConfirmed?.();
  }, [state, onConfirmed]);

  return (
    <section aria-labelledby={headingId} className={className}>
      <Alert tone="info" icon={<ShieldCheck aria-hidden="true" />} title={<span id={headingId}>Confirm it&apos;s you</span>}>
        For your security, enter your password to continue. You won&apos;t be asked again for 15 minutes.
      </Alert>
      {state?.ok ? (
        <p role="status" className="mt-3 text-sm font-medium text-success-text">
          {state.message}
        </p>
      ) : (
        <form action={formAction} className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end">
          <Field label="Your password" error={fieldErrorsFor(state, "password") ?? (state && !state.ok ? state.error.message : undefined)} className="flex-1">
            <Input name="password" type="password" autoComplete="current-password" required />
          </Field>
          <Button type="submit" variant="secondary" loading={pending} loadingText="Checking…">
            Confirm password
          </Button>
        </form>
      )}
    </section>
  );
}
