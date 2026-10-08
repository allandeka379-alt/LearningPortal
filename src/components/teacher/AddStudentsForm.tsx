"use client";

import { CircleAlert, CircleCheck, Mail, UserCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useRef } from "react";
import { CopyValueField } from "@/components/admin/CopyValueField";
import { fieldErrorsFor, type AdminActionState, type AdminFormAction } from "@/components/admin/form-state";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { Textarea } from "@/components/ui/Textarea";
import { formatJoinCode } from "@/server/teaching/core";
import type { AddStudentOutcome } from "@/server/teaching/invitations";

type InvitedOutcome = Extract<AddStudentOutcome, { outcome: "invited" }>;

function invitedText(result: InvitedOutcome): string {
  if (result.delivered) return `invitation sent to ${result.sentTo}. They join once they accept.`;
  if (result.notSentReason === "sms_switched_off") {
    return "invitation created. We don't send text messages, so share the link below with them. They join once they accept.";
  }
  return "invitation created, but it could not be delivered right now. Share the link below, or try again later.";
}

export interface AddStudentsFormProps {
  classId: string;
  /** School classes can add students by their school username. */
  schoolClass: boolean;
  action: AdminFormAction<{ results: AddStudentOutcome[] }>;
}

function OutcomeLine({ result }: { result: AddStudentOutcome }) {
  switch (result.outcome) {
    case "added":
      return (
        <span className="inline-flex items-start gap-1.5 text-success-text">
          <CircleCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          <span>
            <strong>{result.identifier}</strong>: {result.name} added to the class.
          </span>
        </span>
      );
    case "already_member":
      return (
        <span className="inline-flex items-start gap-1.5 text-muted">
          <UserCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          <span>
            <strong>{result.identifier}</strong>: already in the class.
          </span>
        </span>
      );
    case "invited":
      return (
        <div className="space-y-2">
          <span className="inline-flex items-start gap-1.5 text-text">
            <Mail aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            <span>
              <strong>{result.identifier}</strong>: {invitedText(result)}
            </span>
          </span>
          {!result.delivered && (
            <CopyValueField
              value={result.inviteLink}
              label={`Invitation link for ${result.identifier}`}
              hint={
                result.joinCode
                  ? `Works for 14 days. They can also join with the class code ${formatJoinCode(result.joinCode)}.`
                  : "Works for 14 days. Share it only with this student."
              }
            />
          )}
        </div>
      );
    case "rejected":
      return (
        <span className="inline-flex items-start gap-1.5 text-danger-text">
          <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          <span>
            <strong>{result.identifier}</strong>: {result.message}
          </span>
        </span>
      );
  }
}

/**
 * Add students (§22) by email, phone number or (school classes) school username, one per line. Students of the
 * class's school are added at once; anyone else receives an invitation to accept. Per-line outcomes are announced.
 */
export function AddStudentsForm({ classId, schoolClass, action }: AddStudentsFormProps) {
  const [state, formAction, pending] = useActionState<AdminActionState<{ results: AddStudentOutcome[] }>, FormData>(action, null);
  const router = useRouter();
  const handled = useRef<AdminActionState>(null);
  useEffect(() => {
    if (state === null || handled.current === state || !state.ok) return;
    handled.current = state;
    router.refresh();
  }, [state, router]);
  const results = state?.ok ? state.data.results : [];
  return (
    <div className="space-y-4">
      <form action={formAction} className="space-y-3">
        <input type="hidden" name="classId" value={classId} />
        <Field
          label="Emails, phone numbers or usernames"
          hint={
            schoolClass
              ? "One per line. Students of your school are added straight away; anyone else gets an invitation to accept."
              : "One per line. Each person gets an invitation and joins once they accept."
          }
          error={fieldErrorsFor(state, "identifiers")}
        >
          <Textarea name="identifiers" rows={4} required maxLength={10_000} defaultValue={state && !state.ok ? state.values?.identifiers : undefined} />
        </Field>
        {state && !state.ok && !fieldErrorsFor(state, "identifiers") && (
          <Alert tone="danger" role="alert">
            {state.error.message}
          </Alert>
        )}
        <Button type="submit" loading={pending} loadingText="Adding…">
          Add or invite
        </Button>
      </form>
      <div role="status" aria-live="polite">
        {results.length > 0 && (
          <ul className="space-y-1.5 rounded-card border border-border bg-subtle p-3 text-sm">
            {results.map((result, index) => (
              <li key={`${result.identifier}-${index}`}>
                <OutcomeLine result={result} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
