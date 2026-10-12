"use client";

import { UpgradeButton } from "@/components/billing/UpgradeOffer";
import { ClipboardCheck } from "lucide-react";
import { useActionState, useState } from "react";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { formatCount } from "@/lib/format";
import { formMessages, UPGRADE_ERROR_CODES, type OnboardingFormAction } from "./form-state";

export interface DiagnosticSubjectOption {
  subjectId: string;
  name: string;
  /** "O-Level · 4004 · 2025-2027 · 12 questions · about 10 minutes" (built on the server). */
  detail: string;
  /** "Not taken yet", "In progress", "Taken 3 Oct 2026 · 64%". */
  statusText: string;
  /** False when the subject has no published questions yet. */
  available: boolean;
  defaultChecked: boolean;
}

export interface DiagnosticStartFormProps {
  subjects: readonly DiagnosticSubjectOption[];
  /** Generated once per page view: a double tap or a resubmitted form resumes the same attempts. */
  idempotencyKey: string;
  /** The student came straight from onboarding (recorded on the attempts). */
  fromOnboarding: boolean;
  action: OnboardingFormAction;
  upgradeHref: string;
}

/**
 * "Choose subject(s)" on the diagnostic page (§52 step 5): one checkbox per enrolled subject with what its diagnostic
 * contains and its status, then Start. A plain form post (works without JavaScript) to the start Server Action, which
 * opens the first diagnostic; the others wait, already prepared, on this page. Subjects without questions yet are
 * shown but cannot be chosen.
 */
export function DiagnosticStartForm({ subjects, idempotencyKey, fromOnboarding, action, upgradeHref }: DiagnosticStartFormProps) {
  const [state, formAction, pending] = useActionState(action, null);
  const [chosen, setChosen] = useState<ReadonlySet<string>>(() => new Set(subjects.filter((s) => s.available && s.defaultChecked).map((s) => s.subjectId)));
  const messages = formMessages(state);
  const upgrade = state !== null && !state.ok && UPGRADE_ERROR_CODES.has(state.error.code);

  const toggle = (id: string, checked: boolean) =>
    setChosen((current) => {
      const next = new Set(current);
      if (checked) next.add(id);
      else next.delete(id);
      return next;
    });

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="idempotencyKey" value={idempotencyKey} />
      {fromOnboarding && <input type="hidden" name="from" value="onboarding" />}
      <fieldset className="min-w-0">
        <legend className="mb-2 text-sm font-medium text-text">Subjects to test</legend>
        <ul className="space-y-2">
          {subjects.map((subject) => (
            <li key={subject.subjectId}>
              <Checkbox
                name="subjectIds"
                value={subject.subjectId}
                checked={chosen.has(subject.subjectId)}
                onChange={(event) => toggle(subject.subjectId, event.target.checked)}
                disabled={!subject.available}
                label={
                  <span className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                    <span className="text-base font-semibold">{subject.name}</span>
                    <span className="text-xs font-medium text-muted">{subject.statusText}</span>
                  </span>
                }
                description={subject.detail}
                className="rounded-card border border-border bg-surface px-4 py-3 transition-colors has-checked:border-primary has-checked:bg-primary-soft has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-focus"
              />
            </li>
          ))}
        </ul>
      </fieldset>

      <Button
        type="submit"
        size="lg"
        loading={pending}
        loadingText="Preparing your questions…"
        iconStart={<ClipboardCheck aria-hidden="true" />}
        className="w-full sm:w-auto"
      >
        {chosen.size > 1 ? `Start (${formatCount(chosen.size, "subject")})` : "Start the diagnostic"}
      </Button>

      {messages.length > 0 && (
        <Alert
          role="alert"
          tone={upgrade ? "accent" : "danger"}
          title={upgrade ? "Needs full access" : "The diagnostic couldn't start"}
          action={
            upgrade ? (
              <UpgradeButton fallbackHref={upgradeHref} variant="accent" />
            ) : undefined
          }
        >
          {messages.join(" ")}
        </Alert>
      )}
    </form>
  );
}
