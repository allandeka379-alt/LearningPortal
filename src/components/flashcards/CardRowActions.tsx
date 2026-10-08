"use client";

import { RotateCcw, Trash2 } from "lucide-react";
import { useActionState, useState } from "react";
import type { FormAction } from "@/components/student/action-state";
import { FormFeedback } from "@/components/student/FormFeedback";
import { Button } from "@/components/ui/Button";

/**
 * "Delete" with a confirmation step, for one of the student's own cards (§18). The Server Action archives the card
 * and revalidates the list, so the row disappears; the outcome is announced politely.
 */
export function DeleteCardButton({ cardId, label, action }: { cardId: string; label: string; action: FormAction }) {
  const [confirming, setConfirming] = useState(false);
  const [state, formAction, pending] = useActionState(action, null);
  if (!confirming) {
    return (
      <div className="flex flex-wrap items-center gap-2">
        <Button type="button" variant="ghost" size="sm" iconStart={<Trash2 aria-hidden="true" />} onClick={() => setConfirming(true)} aria-label={`Delete ${label}`}>
          Delete
        </Button>
        <FormFeedback state={state} />
      </div>
    );
  }
  return (
    <form action={formAction} className="flex flex-wrap items-center gap-2">
      <input type="hidden" name="cardId" value={cardId} />
      <span className="text-sm text-text">Delete this card?</span>
      <Button type="submit" variant="danger" size="sm" loading={pending} loadingText="Deleting…">
        Delete
      </Button>
      <Button type="button" variant="ghost" size="sm" onClick={() => setConfirming(false)} disabled={pending}>
        Keep it
      </Button>
      <FormFeedback state={state} />
    </form>
  );
}

/** "Restore" for a hidden (suspended) card: it comes back into the student's reviews with its schedule. */
export function RestoreCardButton({ cardId, label, action }: { cardId: string; label: string; action: FormAction }) {
  const [state, formAction, pending] = useActionState(action, null);
  return (
    <form action={formAction} className="flex flex-wrap items-center gap-2">
      <input type="hidden" name="cardId" value={cardId} />
      <Button type="submit" variant="outline" size="sm" iconStart={<RotateCcw aria-hidden="true" />} loading={pending} loadingText="Restoring…" aria-label={`Restore ${label}`}>
        Restore
      </Button>
      <FormFeedback state={state} />
    </form>
  );
}
