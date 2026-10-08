"use client";

import { Download, FileJson, Trash2, Undo2 } from "lucide-react";
import { useActionState } from "react";
import type { FormAction, FormActionState } from "@/components/student/action-state";
import { fieldErrorsOf } from "@/components/student/action-state";
import { FormFeedback } from "@/components/student/FormFeedback";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";

export interface YourDataFormsProps {
  /** Latest export: a download link while it is available, or its progress. */
  exportState: { status: "none" | "preparing" | "ready" | "expired" | "failed"; downloadHref: string | null; availableUntil: string | null };
  /** Formatted date the account will be deleted, when a deletion is scheduled. */
  deletionScheduledFor: string | null;
  /** The scheduled deletion was asked for by a parent or guardian (the student can still cancel it). */
  deletionRequestedByGuardian?: boolean;
  graceDays: number;
  requestExport: () => Promise<FormActionState>;
  requestDeletion: FormAction;
  cancelDeletion: () => Promise<FormActionState>;
}

/**
 * "Your data" (privacy notice "Your rights"): download a copy of your data, and delete your account. Deletion is
 * scheduled after a grace period and can be cancelled until then.
 */
export function YourDataForms({
  exportState,
  deletionScheduledFor,
  deletionRequestedByGuardian = false,
  graceDays,
  requestExport,
  requestDeletion,
  cancelDeletion,
}: YourDataFormsProps) {
  const [exportResult, exportAction, exporting] = useActionState(async () => requestExport(), null);
  const [deleteResult, deleteAction, deleting] = useActionState(requestDeletion, null);
  const [cancelResult, cancelAction, cancelling] = useActionState(async () => cancelDeletion(), null);
  const confirmError = fieldErrorsOf(deleteResult, "confirmed")?.[0];

  return (
    <div className="space-y-6">
      <form action={exportAction} className="space-y-3">
        <h3 className="text-sm font-semibold text-text">A copy of your data</h3>
        <p className="text-sm text-muted">
          {exportState.status === "ready" && exportState.availableUntil
            ? `Your data is ready to download until ${exportState.availableUntil}.`
            : exportState.status === "preparing"
              ? "We're preparing your data. Refresh this page in a few minutes."
              : exportState.status === "failed"
                ? "We couldn't prepare your data last time. Please try again."
                : "Download your profile, subjects, results, progress, flashcards and AI tutor conversations as a file."}
        </p>
        <div className="flex flex-wrap items-center gap-3">
          {exportState.status === "ready" && exportState.downloadHref ? (
            <a
              href={exportState.downloadHref}
              className="inline-flex min-h-11 items-center gap-2 rounded-control border border-border px-4 text-sm font-semibold text-text hover:bg-subtle"
              download
            >
              <Download aria-hidden="true" className="size-4" />
              Download your data
            </a>
          ) : (
            <Button
              type="submit"
              variant="outline"
              loading={exporting}
              loadingText="Preparing…"
              disabled={exportState.status === "preparing" || exportResult?.ok === true}
              iconStart={<FileJson aria-hidden="true" />}
            >
              Prepare a copy of my data
            </Button>
          )}
          <FormFeedback state={exportResult} />
        </div>
      </form>

      <div className="space-y-3 border-t border-border pt-4">
        <h3 className="text-sm font-semibold text-text">Delete your account</h3>
        {deletionScheduledFor ? (
          <form action={cancelAction} className="space-y-3">
            <p className="text-sm text-muted">
              {deletionRequestedByGuardian
                ? `Your parent or guardian asked for your account to be deleted on ${deletionScheduledFor}. Until then you can keep using it. If you cancel, they will be told.`
                : `Your account will be deleted on ${deletionScheduledFor}. Until then you can keep using it, and you can cancel.`}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button type="submit" variant="outline" loading={cancelling} loadingText="Cancelling…" iconStart={<Undo2 aria-hidden="true" />}>
                Cancel deletion
              </Button>
              <FormFeedback state={cancelResult} />
            </div>
          </form>
        ) : (
          <form action={deleteAction} className="space-y-3">
            <p className="text-sm text-muted">
              {`After ${graceDays} days your name, email address, phone number, AI conversations and uploads are deleted, and you can no longer sign in. Your learning history is kept only in anonymised form.`}
            </p>
            <Checkbox
              name="confirmed"
              label="I understand, delete my account"
              invalid={Boolean(confirmError)}
              description={confirmError}
            />
            <div className="flex flex-wrap items-center gap-3">
              <Button type="submit" variant="danger" loading={deleting} loadingText="Scheduling…" iconStart={<Trash2 aria-hidden="true" />}>
                Delete my account
              </Button>
              <FormFeedback state={deleteResult} />
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
