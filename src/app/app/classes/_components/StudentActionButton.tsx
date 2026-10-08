"use client";

import { useActionState, type ReactNode } from "react";
import type { FormAction } from "@/components/student/action-state";
import { FormFeedback } from "@/components/student/FormFeedback";
import { Button, type ButtonVariant } from "@/components/ui/Button";

export interface StudentActionButtonProps {
  action: FormAction;
  fields: Readonly<Record<string, string>>;
  children: ReactNode;
  variant?: ButtonVariant;
  pendingLabel?: string;
  ariaLabel?: string;
  /** Asks before submitting (leaving a class). */
  confirmText?: string;
}

/**
 * A one-button student form (start work, accept / decline an invitation, leave a class) with its result announced
 * below. Works as a plain form post without JavaScript (the optional confirmation then does not apply).
 */
export function StudentActionButton({ action, fields, children, variant = "primary", pendingLabel = "Working…", ariaLabel, confirmText }: StudentActionButtonProps) {
  const [state, formAction, pending] = useActionState(action, null);
  return (
    <form
      action={formAction}
      className="space-y-1"
      onSubmit={(event) => {
        if (confirmText && !window.confirm(confirmText)) event.preventDefault();
      }}
    >
      {Object.entries(fields).map(([name, value]) => (
        <input key={name} type="hidden" name={name} value={value} />
      ))}
      <Button type="submit" variant={variant} loading={pending} loadingText={pendingLabel} aria-label={ariaLabel}>
        {children}
      </Button>
      <FormFeedback state={state?.ok ? null : state} />
    </form>
  );
}
