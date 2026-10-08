"use client";

import { useActionState } from "react";
import { fieldErrorsOf, type FormAction } from "@/components/student/action-state";
import { FormFeedback } from "@/components/student/FormFeedback";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";

/**
 * "Join a class" with the code a teacher shared (§22). Works without JavaScript as a plain form post. The outcome
 * (joined, request sent, or why not) is announced politely; joining at once opens the class.
 */
export function JoinClassForm({ action }: { action: FormAction }) {
  const [state, formAction, pending] = useActionState(action, null);
  const codeErrors = fieldErrorsOf(state, "code");
  return (
    <form action={formAction} className="space-y-3">
      <Field label="Class code" hint="Ask your teacher for the code, for example ABC DEFG." error={codeErrors}>
        <Input name="code" required autoComplete="off" autoCapitalize="characters" spellCheck={false} maxLength={20} className="font-mono uppercase tracking-widest" />
      </Field>
      <p className="text-sm text-muted">Your teachers in the class will see your progress in the class&apos;s subject. You can leave a class at any time.</p>
      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" loading={pending} loadingText="Joining…">
          Join class
        </Button>
        <FormFeedback state={codeErrors ? null : state} />
      </div>
    </form>
  );
}
