"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Checkbox } from "@/components/ui/Checkbox";
import { Field } from "@/components/ui/Field";
import { authLinkClassName } from "./AuthCard";
import { fieldError, type AuthFormAction } from "./form-state";
import { FormStatus } from "./FormStatus";
import { PasswordInput } from "./PasswordInput";
import { SubmitButton } from "./SubmitButton";

export interface ChangePasswordFormProps {
  action: AuthFormAction;
  /** Validated destination after the change (hidden field; the server validates it again). */
  next?: string | null;
  /** The current password was set by the user's school (wording of the first field). */
  schoolSet?: boolean;
  /** Ask to accept the Terms of Use and Privacy Notice (school-provisioned accounts, first own sign-in). */
  askTerms?: boolean;
}

/** Current password + new password (twice), for /change-password. Errors are announced by `FormStatus` / `Field`. */
export function ChangePasswordForm({ action, next, schoolSet = false, askTerms = false }: ChangePasswordFormProps) {
  const [state, formAction] = useActionState(action, null);
  return (
    <form action={formAction} className="space-y-4">
      <FormStatus state={state} />
      {next ? <input type="hidden" name="next" value={next} /> : null}
      <Field
        label={schoolSet ? "Password from your school" : "Current password"}
        error={fieldError(state, "currentPassword")}
        required
      >
        <PasswordInput name="currentPassword" autoComplete="current-password" />
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
      {askTerms && (
        <div>
          <Checkbox
            name="acceptTerms"
            required
            invalid={fieldError(state, "acceptTerms") !== undefined}
            aria-describedby={fieldError(state, "acceptTerms") ? "accept-terms-error" : undefined}
            label={
              <>
                I agree to the{" "}
                <Link href="/legal/terms" className={authLinkClassName}>
                  Terms of Use
                </Link>{" "}
                and the{" "}
                <Link href="/legal/privacy" className={authLinkClassName}>
                  Privacy Notice
                </Link>
                .
              </>
            }
          />
          {fieldError(state, "acceptTerms") && (
            <p id="accept-terms-error" className="text-sm text-danger-text">
              {fieldError(state, "acceptTerms")?.[0]}
            </p>
          )}
        </div>
      )}
      <SubmitButton pendingText="Saving…">Save new password</SubmitButton>
    </form>
  );
}
