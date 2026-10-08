"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect, useRef } from "react";
import { fieldErrorsFor, type AdminActionState, type AdminFormAction } from "@/components/admin/form-state";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { useToast } from "@/components/ui/Toast";

export interface MarkAnswerFormProps {
  attemptId: string;
  position: number;
  marksAvailable: number;
  /** Starting value: the current (provisional) mark or the AI's suggestion. */
  suggestedMarks: number | null;
  /** The answer already has a final mark: changing it needs a reason the student sees. */
  isFinal: boolean;
  currentComment: string | null;
  action: AdminFormAction<unknown>;
}

/**
 * Award marks for one answer (§22 marking): whole marks from 0 to the allocation, an optional comment for the
 * student, and a reason when an existing final mark is changed. The result is announced (toast + live region) and the
 * page refreshes with the re-scored attempt.
 */
export function MarkAnswerForm({ attemptId, position, marksAvailable, suggestedMarks, isFinal, currentComment, action }: MarkAnswerFormProps) {
  const [state, formAction, pending] = useActionState<AdminActionState<unknown>, FormData>(action, null);
  const router = useRouter();
  const { toast } = useToast();
  const handled = useRef<AdminActionState>(null);

  useEffect(() => {
    if (state === null || handled.current === state || !state.ok) return;
    handled.current = state;
    toast({ title: state.message ?? "Mark saved.", tone: "success" });
    router.refresh();
  }, [state, toast, router]);

  const failure = state !== null && !state.ok ? state : null;
  const value = (name: string, fallback: string) => (failure ? (failure.values?.[name] ?? fallback) : fallback);

  return (
    <form action={formAction} className="space-y-3" aria-label={`Mark question ${position}`}>
      <input type="hidden" name="attemptId" value={attemptId} />
      <input type="hidden" name="position" value={position} />
      <div className="grid gap-3 sm:grid-cols-[10rem_1fr]">
        <Field label={`Marks (out of ${marksAvailable})`} error={fieldErrorsFor(state, "marksAwarded")} required>
          <Input
            name="marksAwarded"
            type="number"
            inputMode="numeric"
            min={0}
            max={marksAvailable}
            step={1}
            required
            defaultValue={value("marksAwarded", suggestedMarks === null ? "" : String(suggestedMarks))}
          />
        </Field>
        <Field label="Comment for the student" optional error={fieldErrorsFor(state, "comment")}>
          <Textarea name="comment" rows={2} maxLength={2000} defaultValue={value("comment", currentComment ?? "")} />
        </Field>
      </div>
      {isFinal && (
        <Field label="Reason for changing the mark" hint="The student sees this reason." required error={fieldErrorsFor(state, "reason")}>
          <Textarea name="reason" rows={2} maxLength={500} required defaultValue={value("reason", "")} />
        </Field>
      )}
      {failure && !failure.error.fieldErrors && (
        <Alert tone="danger" role="alert">
          {failure.error.message}
        </Alert>
      )}
      <div className="flex items-center gap-3">
        <Button type="submit" loading={pending} loadingText="Saving…">
          {isFinal ? "Change mark" : "Save mark"}
        </Button>
        <p role="status" aria-live="polite" className="text-sm text-success-text">
          {state?.ok ? (state.message ?? "Mark saved.") : ""}
        </p>
      </div>
    </form>
  );
}
