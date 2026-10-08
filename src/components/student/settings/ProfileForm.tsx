"use client";

import { useActionState } from "react";
import { fieldErrorsOf, type FormAction } from "@/components/student/action-state";
import { FormFeedback } from "@/components/student/FormFeedback";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";

export interface ProfileFormProps {
  displayName: string;
  username: string | null;
  maxLength: number;
  action: FormAction;
}

/** The name used in greetings and menus. Leaderboards use the privacy setting below, never this name directly. */
export function ProfileForm({ displayName, username, maxLength, action }: ProfileFormProps) {
  const [state, formAction, pending] = useActionState(action, null);
  return (
    <form action={formAction} className="space-y-4">
      <Field
        label="Display name"
        hint="How we greet you in the app."
        error={fieldErrorsOf(state, "displayName")}
        required
      >
        <Input name="displayName" defaultValue={displayName} maxLength={maxLength} autoComplete="nickname" />
      </Field>
      {username && (
        <p className="text-sm text-muted">
          Your public username is <span className="font-semibold text-text">{username}</span>.
        </p>
      )}
      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" loading={pending} loadingText="Saving…">
          Save name
        </Button>
        <FormFeedback state={state} />
      </div>
    </form>
  );
}
