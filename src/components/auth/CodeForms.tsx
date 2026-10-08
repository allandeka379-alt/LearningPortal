"use client";

import { useActionState, useSyncExternalStore } from "react";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { Input, type InputProps } from "@/components/ui/Input";
import { fieldError, type AuthFormAction } from "./form-state";
import { FormStatus } from "./FormStatus";
import { PasswordInput } from "./PasswordInput";
import { SubmitButton } from "./SubmitButton";

/** Seconds between code sends (must match the server's resend cooldown). */
export const RESEND_COOLDOWN_SECONDS = 60;

/**
 * The 6-digit code input: numeric keyboard, one-time-code autofill (from the email, on phones). Forwards the props
 * `Field` injects (id, aria-describedby, aria-invalid, required) so the label and errors are wired up.
 */
export function CodeInput(props: InputProps) {
  return (
    <Input
      {...props}
      name="code"
      inputMode="numeric"
      autoComplete="one-time-code"
      autoCapitalize="none"
      autoCorrect="off"
      spellCheck={false}
      className="text-center text-xl font-semibold tracking-[0.4em]"
    />
  );
}

/** Enter the 6-digit code (email verification or code sign-in). */
export function VerifyCodeForm({ action }: { action: AuthFormAction }) {
  const [state, formAction] = useActionState(action, null);
  return (
    <form action={formAction} className="space-y-4">
      <FormStatus state={state} />
      <Field label="6-digit code" error={fieldError(state, "code")} required>
        <CodeInput />
      </Field>
      <SubmitButton pendingText="Checking…">Continue</SubmitButton>
    </form>
  );
}

/** Forgot password, step 2: code + new password (twice). */
export function ResetPasswordForm({ action }: { action: AuthFormAction }) {
  const [state, formAction] = useActionState(action, null);
  return (
    <form action={formAction} className="space-y-4">
      <FormStatus state={state} />
      <Field label="6-digit code" error={fieldError(state, "code")} required>
        <CodeInput />
      </Field>
      <Field
        label="New password"
        hint="At least 8 characters. A few unrelated words make a strong password."
        error={fieldError(state, "password")}
        required
      >
        <PasswordInput name="password" autoComplete="new-password" />
      </Field>
      <Field label="Type the new password again" error={fieldError(state, "confirmPassword")} required>
        <PasswordInput name="confirmPassword" autoComplete="new-password" />
      </Field>
      <SubmitButton pendingText="Saving…">Set new password and sign in</SubmitButton>
    </form>
  );
}

function subscribeToClock(onTick: () => void): () => void {
  const id = window.setInterval(onTick, 1000);
  return () => window.clearInterval(id);
}
const clockSeconds = () => Math.floor(Date.now() / 1000);
// No clock during server rendering: the countdown appears right after hydration (no mismatch).
const serverClock = () => null;

/** "Resend code" with a visible countdown matching the server cooldown. */
export function ResendCodeForm({ action, sentAt }: { action: AuthFormAction; sentAt: number }) {
  const [state, formAction, pending] = useActionState(action, null);
  const nowSeconds = useSyncExternalStore(subscribeToClock, clockSeconds, serverClock);
  const lastSentAt = state?.ok && state.data?.sentAt ? state.data.sentAt : sentAt;
  const availableAt = Math.ceil(lastSentAt / 1000) + RESEND_COOLDOWN_SECONDS;
  const remaining = nowSeconds === null ? RESEND_COOLDOWN_SECONDS : Math.max(0, availableAt - nowSeconds);

  return (
    <form action={formAction} className="space-y-3">
      <FormStatus state={state} />
      <p className="text-sm text-muted">
        Didn&apos;t get it? Check the number or address you entered. Messages can take a minute to arrive.
      </p>
      <Button type="submit" variant="outline" fullWidth loading={pending} disabled={remaining > 0}>
        {remaining > 0 ? `Send a new code in ${remaining}s` : "Send a new code"}
      </Button>
    </form>
  );
}
