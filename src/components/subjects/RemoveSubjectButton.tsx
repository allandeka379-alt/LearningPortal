"use client";

import { useActionState, useEffect, useId, useRef, useState } from "react";
import type { FormAction } from "@/components/student/action-state";
import { FormFeedback } from "@/components/student/FormFeedback";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

export interface RemoveSubjectButtonProps {
  subjectId: string;
  subjectName: string;
  action: FormAction;
}

/**
 * Removes a subject from the student's list after an inline confirmation. Removal is soft (history, mastery and
 * progress are kept, and adding the subject back restores them), which the confirmation says plainly. Cancel
 * returns focus to the Remove button; success is announced with a toast (the row then disappears).
 */
export function RemoveSubjectButton({ subjectId, subjectName, action }: RemoveSubjectButtonProps) {
  const [state, formAction, pending] = useActionState(action, null);
  const [confirming, setConfirming] = useState(false);
  const promptId = useId();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const restoreFocus = useRef(false);
  const { toast } = useToast();

  useEffect(() => {
    if (state?.ok) toast({ title: state.data.message, tone: "success" });
  }, [state, toast]);

  useEffect(() => {
    if (!confirming && restoreFocus.current) {
      restoreFocus.current = false;
      wrapperRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
    }
  }, [confirming]);

  return (
    <div ref={wrapperRef} className={confirming ? "w-full" : undefined}>
      {confirming ? (
        <form action={formAction} role="group" aria-labelledby={promptId} className="space-y-3 rounded-control border border-border bg-subtle p-3">
          <p id={promptId} className="text-sm text-text">
            Remove <span className="font-semibold">{subjectName}</span> from your subjects? Your progress is kept, and adding it
            back later restores it.
          </p>
          <input type="hidden" name="subjectId" value={subjectId} />
          <div className="flex flex-wrap gap-2">
            <Button type="submit" variant="danger" loading={pending} loadingText="Removing…" autoFocus>
              Remove subject
            </Button>
            <Button
              variant="outline"
              disabled={pending}
              onClick={() => {
                restoreFocus.current = true;
                setConfirming(false);
              }}
            >
              Cancel
            </Button>
          </div>
          {state !== null && !state.ok && <FormFeedback state={state} />}
        </form>
      ) : (
        <Button variant="ghost" onClick={() => setConfirming(true)} aria-label={`Remove ${subjectName}`}>
          Remove
        </Button>
      )}
    </div>
  );
}
