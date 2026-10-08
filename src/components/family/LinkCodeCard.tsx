"use client";

import { Check, Copy, KeyRound } from "lucide-react";
import { useActionState, useState, type ReactNode } from "react";
import { FormFeedback } from "@/components/student/FormFeedback";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { DEFAULT_LOCALE } from "@/lib/config";
import type { CodeFormAction, FamilyFormAction } from "./action-state";
import { ConfirmActionButton } from "./ConfirmActionButton";

export interface LinkCodeCardProps {
  /** Creates a code (Server Action). */
  action: CodeFormAction;
  /** Cancels the outstanding code (Server Action taking `linkId`). */
  cancelAction: FamilyFormAction;
  /** The person's unused code, if any (cannot be shown again: only its hash is stored). */
  outstanding: { linkId: string; expiresAt: string } | null;
  /** Who will receive the code: the copy differs for students and parents. */
  audience: "student" | "parent";
  /** IANA zone for expiry times. */
  timeZone: string;
  /** Extra fields sent when creating a code (e.g. the parent's relationship picker). */
  extraFields?: ReactNode;
}

/** "ABCD-EFGH" → "A B C D, E F G H" so screen readers read the code character by character. */
export function spellOut(displayCode: string): string {
  return displayCode
    .split("-")
    .map((group) => group.split("").join(" "))
    .join(", ");
}

function formatExpiry(iso: string, timeZone: string): string {
  try {
    return new Intl.DateTimeFormat(DEFAULT_LOCALE, { weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit", timeZone }).format(
      new Date(iso),
    );
  } catch {
    return new Date(iso).toUTCString();
  }
}

const COPY = {
  student: {
    intro: "Create a code and give it to your parent or guardian. They enter it in their account to follow your progress.",
    warning: "Only share it with a parent or guardian you trust: anyone with this code can link to your account until it expires.",
    create: "Create a link code",
    replace: "Create a new code",
    pendingTitle: "You have an unused code",
  },
  parent: {
    intro: "Prefer your child to enter a code instead? Create one here and give it to them. They enter it under Family in their account.",
    warning: "Give it only to your child. The code works once and expires after a day.",
    create: "Create a code for my child",
    replace: "Create a new code",
    pendingTitle: "You have an unused code",
  },
} as const;

/**
 * Create / show / cancel a parent-link code (§21 flows a and b). The new code is shown ONCE, large and spaced for
 * reading aloud, with a copy button; a code made earlier can only be cancelled or replaced. The code box is announced
 * character by character so screen-reader users can read it out.
 */
export function LinkCodeCard({ action, cancelAction, outstanding, audience, timeZone, extraFields }: LinkCodeCardProps) {
  const [state, formAction, pending] = useActionState(action, null);
  const [copied, setCopied] = useState(false);
  const copy = COPY[audience];
  const issued = state?.ok ? state.data : null;

  async function copyCode(code: string) {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted">{copy.intro}</p>

      {issued ? (
        <div className="space-y-3 rounded-card border border-primary/40 bg-primary-soft p-4">
          <p className="text-sm font-medium text-on-primary-soft">Your link code</p>
          <div className="flex flex-wrap items-center gap-3">
            <p className="font-mono text-3xl font-bold tracking-[0.2em] text-text tabular-nums sm:text-4xl">
              <span aria-hidden="true">{issued.displayCode}</span>
              <span className="sr-only">{spellOut(issued.displayCode)}</span>
            </p>
            <Button
              type="button"
              variant="outline"
              iconStart={copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
              onClick={() => copyCode(issued.displayCode)}
            >
              {copied ? "Copied" : "Copy code"}
            </Button>
          </div>
          <p className="text-sm text-on-primary-soft">
            Expires {formatExpiry(issued.expiresAt, timeZone)}. It works once. We can&rsquo;t show it again after you leave this page.
          </p>
        </div>
      ) : (
        outstanding && (
          <Alert
            tone="neutral"
            title={copy.pendingTitle}
            action={
              <ConfirmActionButton
                action={cancelAction}
                fields={{ linkId: outstanding.linkId }}
                triggerLabel="Cancel this code"
                triggerVariant="ghost"
                triggerSize="sm"
                title="Cancel your link code?"
                description="Nobody will be able to use it to link to your account."
                confirmLabel="Cancel code"
                pendingLabel="Cancelling…"
              />
            }
          >
            It expires {formatExpiry(outstanding.expiresAt, timeZone)}. For your safety we can&rsquo;t show it again. If you&rsquo;ve lost it,
            create a new one: the old code stops working.
          </Alert>
        )
      )}

      <Alert tone="info" variant="callout">
        {copy.warning}
      </Alert>

      <form action={formAction} className="space-y-4">
        {extraFields}
        <div className="flex flex-wrap items-center gap-3">
          <Button type="submit" iconStart={<KeyRound aria-hidden="true" />} loading={pending} loadingText="Creating…">
            {issued || outstanding ? copy.replace : copy.create}
          </Button>
          {state && !state.ok && <FormFeedback state={state} />}
        </div>
      </form>
      {issued && (
        <p role="status" className="sr-only">
          {issued.message}
        </p>
      )}
    </div>
  );
}
