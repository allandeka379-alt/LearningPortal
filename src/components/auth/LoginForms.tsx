"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { authLinkClassName } from "./AuthCard";
import { fieldError, previousValue, type AuthFormAction } from "./form-state";
import { FormStatus } from "./FormStatus";
import { PasswordInput } from "./PasswordInput";
import { SubmitButton } from "./SubmitButton";

export interface LoginFormProps {
  action: AuthFormAction;
  /** Validated post-login path (hidden field). */
  next: string | null;
}

/** Email (or school username) + password sign-in. */
export function PasswordLoginForm({ action, next }: LoginFormProps) {
  const [state, formAction] = useActionState(action, null);
  return (
    <form action={formAction} className="space-y-4">
      <FormStatus state={state} />
      {next && <input type="hidden" name="next" value={next} />}
      <Field
        label="Email address or username"
        hint="Use the username from your school if you were given one."
        error={fieldError(state, "identifier")}
        required
      >
        <Input
          name="identifier"
          autoComplete="username"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          maxLength={254}
          defaultValue={previousValue(state, "identifier")}
        />
      </Field>
      <Field label="Password" error={fieldError(state, "password")} required>
        <PasswordInput name="password" autoComplete="current-password" />
      </Field>
      <p className="text-right text-sm">
        <Link href="/forgot-password" className={authLinkClassName}>
          Forgot your password?
        </Link>
      </p>
      <SubmitButton pendingText="Signing in…">Sign in</SubmitButton>
    </form>
  );
}

/** Passwordless sign-in, step 1: ask for a one-time code by email. */
export function CodeLoginForm({ action, next }: LoginFormProps) {
  const [state, formAction] = useActionState(action, null);
  return (
    <form action={formAction} className="space-y-4">
      <FormStatus state={state} />
      {next && <input type="hidden" name="next" value={next} />}
      <Field label="Email address" hint="We'll email you a 6-digit sign-in code." error={fieldError(state, "identifier")} required>
        <Input
          name="identifier"
          type="email"
          inputMode="email"
          autoComplete="email"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          maxLength={254}
          defaultValue={previousValue(state, "identifier")}
        />
      </Field>
      <SubmitButton pendingText="Sending code…">Email me a code</SubmitButton>
    </form>
  );
}
