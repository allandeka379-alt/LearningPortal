"use client";

import { CircleCheck, Flag } from "lucide-react";
import { useId, useState, useTransition, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { cn } from "@/lib/cn";
import { LEARNER_FLAG_REASON_LABELS, LEARNER_REPORT_REASONS, MAX_FLAG_DETAILS, type FlagReason, type LearnerReportableType } from "@/lib/content-flags";
import type { ActionResult } from "@/server/lib/errors";

/** What is being reported, and where the learner saw it (their own attempt, for questions). */
export interface ReportProblemTarget {
  entityType: LearnerReportableType;
  entityId: string;
  /** Attempt the question was answered in (the server only uses it when it is the reporter's own). */
  attemptId?: string;
  /** 1-based position of the question in that attempt. */
  position?: number;
}

export interface ReportProblemRequest extends ReportProblemTarget {
  reason: FlagReason;
  details?: string;
}

/** The "Report a problem" Server Action (src/app/app/_actions/report-problem.ts). */
export type ReportProblemAction = (input: ReportProblemRequest) => Promise<ActionResult<{ received: true }>>;

export interface ReportProblemButtonProps extends ReportProblemTarget {
  action: ReportProblemAction;
  /** For the form's question, e.g. "this question" / "this lesson". */
  itemLabel?: string;
  className?: string;
}

export const REPORT_THANKS = "Thanks — our editors will review this.";

/**
 * "Report a problem" (§42): a quiet link-style button that opens a short inline form (what is wrong, optional details)
 * and files a content flag for the editors. Afterwards the learner only sees a calm confirmation; nothing about the
 * report's handling is shown to them. The confirmation is announced through a polite status region that exists
 * before it is filled, and focus stays on a sensible element at every step.
 */
export function ReportProblemButton({ action, entityType, entityId, attemptId, position, itemLabel = "this question", className }: ReportProblemButtonProps) {
  const id = useId();
  const formId = `report${id.replace(/[^A-Za-z0-9]/g, "")}`;
  const toggleId = `${formId}-toggle`;
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reasonError, setReasonError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const reasons = LEARNER_REPORT_REASONS[entityType];

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const reason = String(data.get("reason") ?? "");
    const details = String(data.get("details") ?? "").slice(0, MAX_FLAG_DETAILS);
    if (!(reasons as readonly string[]).includes(reason)) {
      setReasonError("Choose what is wrong.");
      return;
    }
    setReasonError(null);
    setError(null);
    startTransition(async () => {
      const result = await action({
        entityType,
        entityId,
        reason: reason as FlagReason,
        ...(details.trim() ? { details } : {}),
        ...(attemptId ? { attemptId } : {}),
        ...(position !== undefined ? { position } : {}),
      });
      if (result.ok) {
        setSent(true);
        setOpen(false);
      } else {
        setError(result.error.fieldErrors ? (Object.values(result.error.fieldErrors).flat()[0] ?? result.error.message) : result.error.message);
      }
    });
  };

  const close = () => {
    setOpen(false);
    setError(null);
    setReasonError(null);
    // Return focus to the toggle once it is rendered again.
    window.setTimeout(() => document.getElementById(toggleId)?.focus(), 0);
  };

  return (
    <div className={cn("space-y-3", className)}>
      <p role="status" aria-live="polite" className={cn("text-sm text-muted", !sent && "sr-only")}>
        {sent && (
          <span className="inline-flex items-start gap-1.5">
            <CircleCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-success-text" />
            {REPORT_THANKS}
          </span>
        )}
      </p>
      {!sent && !open && (
        <Button
          id={toggleId}
          type="button"
          variant="ghost"
          className="-ml-3 text-muted"
          iconStart={<Flag aria-hidden="true" />}
          aria-expanded={false}
          aria-controls={formId}
          onClick={() => setOpen(true)}
        >
          Report a problem
        </Button>
      )}
      {!sent && open && (
        <form id={formId} onSubmit={submit} noValidate className="space-y-3 rounded-card border border-border bg-surface p-4" aria-label="Report a problem">
          <Field label={`What's wrong with ${itemLabel}?`} error={reasonError} required>
            <Select name="reason" placeholder="Choose a reason" defaultValue="" autoFocus options={reasons.map((reason) => ({ value: reason, label: LEARNER_FLAG_REASON_LABELS[reason] }))} />
          </Field>
          <Field label="Details" optional hint="What did you expect? No personal information, please.">
            <Textarea name="details" rows={3} maxLength={MAX_FLAG_DETAILS} />
          </Field>
          {error && (
            <p role="alert" className="text-sm text-danger-text">
              {error}
            </p>
          )}
          <div className="flex flex-wrap gap-2">
            <Button type="submit" loading={pending} loadingText="Sending…">
              Send report
            </Button>
            <Button type="button" variant="ghost" onClick={close} disabled={pending}>
              Cancel
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
