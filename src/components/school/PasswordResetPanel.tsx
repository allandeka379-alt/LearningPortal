"use client";

import { KeyRound } from "lucide-react";
import { useState, useTransition } from "react";
import { Alert } from "@/components/ui/Alert";
import { Button, type ButtonVariant } from "@/components/ui/Button";
import { Dialog, DialogClose } from "@/components/ui/Dialog";
import type { ActionResult } from "@/server/lib/errors";
import type { CredentialSlip } from "@/server/schools/core";
import { CredentialSlips } from "./CredentialSlips";

/** Result of one reset request (at most 50 students). */
export type PasswordResetActionResult = ActionResult<{ slips: CredentialSlip[]; skipped: { userId: string; reason: string }[] }>;
export type PasswordResetAction = (input: { userIds: string[] }) => Promise<PasswordResetActionResult>;

export interface PasswordResetPanelProps {
  action: PasswordResetAction;
  /** Students to reset (school-provisioned accounts; others are skipped with a reason). */
  userIds: readonly string[];
  triggerLabel: string;
  triggerVariant?: ButtonVariant;
  schoolName: string;
  signInUrl: string;
}

const BATCH = 50;

/**
 * "Reset password(s) and print slips" for school-provisioned username accounts (§23). Asks for confirmation (the old
 * passwords stop working and the students are signed out everywhere), resets in batches of 50 and shows the new
 * one-time credential slips. Results are announced in a polite live region.
 */
export function PasswordResetPanel({ action, userIds, triggerLabel, triggerVariant = "outline", schoolName, signInUrl }: PasswordResetPanelProps) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const [slips, setSlips] = useState<CredentialSlip[]>([]);
  const [skipped, setSkipped] = useState<{ userId: string; reason: string }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  function run() {
    setError(null);
    startTransition(async () => {
      const collected: CredentialSlip[] = [];
      const skippedRows: { userId: string; reason: string }[] = [];
      for (let start = 0; start < userIds.length; start += BATCH) {
        const result = await action({ userIds: userIds.slice(start, start + BATCH) });
        if (!result.ok) {
          setError(result.error.message);
          break;
        }
        collected.push(...result.data.slips);
        skippedRows.push(...result.data.skipped);
      }
      setSlips(collected);
      setSkipped(skippedRows);
      setDone(true);
      setOpen(false);
    });
  }

  const count = userIds.length;
  return (
    <div className="space-y-4">
      <Dialog
        open={open}
        onOpenChange={setOpen}
        role="alertdialog"
        title={count === 1 ? "Reset this password?" : `Reset ${count} passwords?`}
        description="The current password stops working at once and the student is signed out on every device."
        trigger={
          <Button variant={triggerVariant} iconStart={<KeyRound aria-hidden="true" />} disabled={count === 0}>
            {triggerLabel}
          </Button>
        }
        footer={
          <>
            <DialogClose>Cancel</DialogClose>
            <Button variant="danger" loading={pending} loadingText="Resetting…" onClick={run}>
              Reset and show slips
            </Button>
          </>
        }
      >
        <p className="text-sm text-muted">
          Only accounts your school created (school usernames) can be reset here. Students who sign in with their own phone
          number use &ldquo;Forgot password&rdquo; instead.
        </p>
      </Dialog>
      <div aria-live="polite" role="status" className="space-y-3">
        {error && <Alert tone="danger">{error}</Alert>}
        {done && !error && slips.length === 0 && <Alert tone="info">No passwords were reset.</Alert>}
        {done && skipped.length > 0 && (
          <Alert tone="info" title={`${skipped.length} not reset`}>
            {[...new Set(skipped.map((row) => row.reason))].join(" ")}
          </Alert>
        )}
      </div>
      <CredentialSlips slips={slips} schoolName={schoolName} signInUrl={signInUrl} />
    </div>
  );
}
