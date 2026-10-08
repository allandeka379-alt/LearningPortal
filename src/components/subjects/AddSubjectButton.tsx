"use client";

import { Plus } from "lucide-react";
import { useActionState, useEffect } from "react";
import type { FormAction } from "@/components/student/action-state";
import { FormFeedback } from "@/components/student/FormFeedback";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

export interface AddSubjectButtonProps {
  subjectId: string;
  subjectName: string;
  action: FormAction;
  /** "Add back" for a subject the student removed earlier (history is kept). */
  label?: string;
}

/**
 * Enrols the student in one subject (pins the current syllabus version, §26) via a Server Action. Works without
 * JavaScript; while pending the button is disabled so slow connections cannot double-submit. Success is announced
 * with a toast because the refreshed list replaces this button; errors stay inline.
 */
export function AddSubjectButton({ subjectId, subjectName, action, label = "Add" }: AddSubjectButtonProps) {
  const [state, formAction, pending] = useActionState(action, null);
  const { toast } = useToast();

  useEffect(() => {
    if (state?.ok) toast({ title: state.data.message, tone: "success" });
  }, [state, toast]);

  return (
    <form action={formAction} className="flex flex-col items-end gap-1">
      <input type="hidden" name="subjectId" value={subjectId} />
      <Button
        type="submit"
        variant="outline"
        loading={pending}
        loadingText="Adding…"
        iconStart={<Plus aria-hidden="true" />}
        aria-label={`${label} ${subjectName}`}
      >
        {label}
      </Button>
      {state !== null && !state.ok && <FormFeedback state={state} className="text-right" />}
    </form>
  );
}
