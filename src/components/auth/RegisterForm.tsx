"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { Checkbox } from "@/components/ui/Checkbox";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { RadioGroup, type RadioOption } from "@/components/ui/RadioGroup";
import { authLinkClassName } from "./AuthCard";
import { fieldError, previousValue, type AuthFormAction } from "./form-state";
import { FormStatus } from "./FormStatus";
import { PasswordInput } from "./PasswordInput";
import { SubmitButton } from "./SubmitButton";

export type RegisterRole = "STUDENT" | "PARENT" | "TEACHER";

const ROLE_OPTIONS: readonly RadioOption[] = [
  { value: "STUDENT", label: "Student", description: "Learn, practise and track your progress." },
  { value: "PARENT", label: "Parent or guardian", description: "Follow your child's progress." },
  { value: "TEACHER", label: "Teacher", description: "Run classes and set work." },
];

function isRole(value: string): value is RegisterRole {
  return value === "STUDENT" || value === "PARENT" || value === "TEACHER";
}

export interface RegisterFormProps {
  action: AuthFormAction;
  /** Pre-selected role (from `?role=`). */
  initialRole: RegisterRole;
  next: string | null;
}

/**
 * Sign-up form: role, name, email address (confirmed with a code sent by email), password, (students) optional birth
 * year, terms. The birth year is the only age data collected (ARCHITECTURE §5.12). No phone number is asked for.
 */
export function RegisterForm({ action, initialRole, next }: RegisterFormProps) {
  const [state, formAction] = useActionState(action, null);
  const submittedRole = previousValue(state, "role");
  const [role, setRole] = useState<RegisterRole>(isRole(submittedRole) ? submittedRole : initialRole);

  return (
    <form action={formAction} className="space-y-5">
      <FormStatus state={state} />
      {next && <input type="hidden" name="next" value={next} />}
      <RadioGroup
        legend="I'm signing up as"
        name="role"
        appearance="card"
        options={ROLE_OPTIONS}
        value={role}
        onValueChange={(value) => isRole(value) && setRole(value)}
        error={fieldError(state, "role")}
        required
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="First name" error={fieldError(state, "firstName")} required>
          <Input name="firstName" autoComplete="given-name" maxLength={100} defaultValue={previousValue(state, "firstName")} />
        </Field>
        <Field label="Last name" optional error={fieldError(state, "lastName")}>
          <Input name="lastName" autoComplete="family-name" maxLength={100} defaultValue={previousValue(state, "lastName")} />
        </Field>
      </div>
      <Field label="Email address" hint="We'll email you a 6-digit code to confirm it." error={fieldError(state, "identifier")} required>
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
      <Field
        label="Password"
        hint="At least 8 characters. A few unrelated words make a strong password."
        error={fieldError(state, "password")}
        required
      >
        <PasswordInput name="password" autoComplete="new-password" />
      </Field>
      {role === "STUDENT" && (
        <Field
          label="Year of birth"
          optional
          hint="Just the year. It helps us keep accounts of under-18s safe."
          error={fieldError(state, "birthYear")}
        >
          <Input
            name="birthYear"
            inputMode="numeric"
            autoComplete="bday-year"
            maxLength={4}
            className="max-w-32"
            defaultValue={previousValue(state, "birthYear")}
          />
        </Field>
      )}
      <div>
        <Checkbox
          name="acceptTerms"
          required
          defaultChecked={previousValue(state, "acceptTerms") === "on"}
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
      <SubmitButton pendingText="Creating your account…">Create account</SubmitButton>
    </form>
  );
}
