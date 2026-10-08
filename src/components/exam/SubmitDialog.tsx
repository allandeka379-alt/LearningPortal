"use client";

import { Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Dialog, DialogClose } from "@/components/ui/Dialog";
import { formatCount } from "@/lib/format";
import type { AnswerSummary } from "./exam-model";

export interface SubmitDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  summary: AnswerSummary;
  /** Questions whose last change is not confirmed by the server yet. */
  unsaved: number;
  submitting: boolean;
  error: string | null;
  onConfirm: () => void;
  /** What is being submitted, in running text ("exam", "diagnostic"). Default "exam". */
  noun?: string;
}

/** The confirmation lines (pure; tested): what is unanswered or flagged, and that submitting is final. */
export function submitSummaryLines(summary: AnswerSummary, unsaved: number): string[] {
  const lines = [`You've answered ${summary.answered} of ${formatCount(summary.total, "question")}.`];
  if (summary.answered === 0) lines.push("You haven't answered any questions, so you would score 0.");
  else if (summary.unanswered.length > 0) lines.push(`${formatCount(summary.unanswered.length, "question")} not answered: ${summary.unanswered.join(", ")}.`);
  if (summary.flagged.length > 0) lines.push(`Flagged for review: ${summary.flagged.join(", ")}.`);
  if (unsaved > 0) lines.push("Your latest changes will be saved first.");
  lines.push("After you submit, you can't change your answers.");
  return lines;
}

/** "Submit your exam?" confirmation (§13 "submit exam"): an alert dialog listing what is still open. */
export function SubmitDialog({ open, onOpenChange, summary, unsaved, submitting, error, onConfirm, noun = "exam" }: SubmitDialogProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!submitting) onOpenChange(next);
      }}
      role="alertdialog"
      size="sm"
      title={`Submit your ${noun}?`}
      hideCloseButton={submitting}
      footer={
        <>
          <DialogClose disabled={submitting} data-autofocus>
            Keep working
          </DialogClose>
          <Button onClick={onConfirm} loading={submitting} loadingText="Submitting…" iconStart={<Send aria-hidden="true" />}>
            Submit {noun}
          </Button>
        </>
      }
    >
      <div className="space-y-2 text-sm text-text">
        {submitSummaryLines(summary, unsaved).map((line) => (
          <p key={line}>{line}</p>
        ))}
        {error && (
          <p role="alert" className="font-medium text-danger-text">
            {error}
          </p>
        )}
      </div>
    </Dialog>
  );
}
