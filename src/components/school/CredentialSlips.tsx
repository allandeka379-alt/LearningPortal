"use client";

import { Printer } from "lucide-react";
import { useId } from "react";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { APP_NAME } from "@/lib/config";
import type { CredentialSlip } from "@/server/schools/core";

export interface CredentialSlipsProps {
  slips: readonly CredentialSlip[];
  schoolName: string;
  /** Where students sign in (shown on every slip). */
  signInUrl: string;
}

/**
 * One-time printable credential slips for school-provisioned accounts (§23 roster import, password resets). The
 * temporary passwords exist only in this page's memory: they are never stored in plain text, so the admin is told to
 * print or copy them now. Printing hides everything else on the page (scoped print stylesheet) and lays the slips
 * out to be cut apart.
 */
export function CredentialSlips({ slips, schoolName, signInUrl }: CredentialSlipsProps) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const scope = `slips-${id}`;
  if (slips.length === 0) return null;
  return (
    <section aria-labelledby={`${scope}-title`} className="space-y-4">
      <style>{`@media print {
  body * { visibility: hidden !important; }
  #${scope}, #${scope} * { visibility: visible !important; }
  #${scope} { position: absolute; inset: 0 auto auto 0; width: 100%; }
  #${scope} .slip { break-inside: avoid; }
}`}</style>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between print:hidden">
        <h2 id={`${scope}-title`} className="text-lg font-semibold text-text">
          Sign-in slips ({slips.length})
        </h2>
        <Button type="button" variant="primary" iconStart={<Printer aria-hidden="true" />} onClick={() => window.print()}>
          Print slips
        </Button>
      </div>
      <Alert tone="warning" title="Shown once" className="print:hidden">
        These temporary passwords are not saved anywhere. Print or copy them now and hand each slip to its student. If a slip
        is lost, reset that student&rsquo;s password to print a new one.
      </Alert>
      <ul id={scope} className="grid gap-3 sm:grid-cols-2 print:grid-cols-2 print:gap-2" aria-label="Credential slips">
        {slips.map((slip) => (
          <li key={slip.userId} className="slip rounded-card border border-dashed border-border-strong bg-surface p-4 text-sm print:p-3">
            <p className="text-xs font-semibold tracking-wide text-muted uppercase">
              {APP_NAME} · {schoolName}
            </p>
            <p className="mt-1 text-base font-semibold text-text">{slip.name}</p>
            {slip.className && <p className="text-muted">Class: {slip.className}</p>}
            <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1">
              <dt className="text-muted">Username</dt>
              <dd className="font-mono font-semibold break-all text-text">{slip.username}</dd>
              <dt className="text-muted">Password</dt>
              <dd className="font-mono font-semibold break-all text-text">{slip.temporaryPassword}</dd>
            </dl>
            <p className="mt-3 text-xs text-muted">
              Sign in at {signInUrl} and change this password in Settings after your first sign-in.
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
