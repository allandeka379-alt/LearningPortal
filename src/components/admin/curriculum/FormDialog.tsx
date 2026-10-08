"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ActionForm, useActionFormState } from "@/components/admin/ActionForm";
import type { AdminActionState, AdminFormAction } from "@/components/admin/form-state";
import { Button, type ButtonSize, type ButtonVariant } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";

/**
 * A confirmation dialog that contains a real form (choices, a link, a note) for consequential curriculum steps:
 * publishing a version, switching the current version, confirming exam dates. Built on the shared `ActionForm`, so
 * `AdminField`s inside get field errors and re-fill; on success the dialog closes, a toast confirms and the page data
 * refreshes. Usable from Server Components.
 */

export interface FormDialogProps {
  action: AdminFormAction<unknown>;
  triggerLabel: ReactNode;
  triggerVariant?: ButtonVariant;
  triggerSize?: ButtonSize;
  triggerIcon?: ReactNode;
  disabled?: boolean;
  title: string;
  description?: ReactNode;
  /** Fields and explanatory content of the form. */
  children: ReactNode;
  submitLabel: string;
  pendingLabel?: string;
  hiddenFields?: Readonly<Record<string, string>>;
  /** `danger` for destructive steps (red submit, `alertdialog`). */
  tone?: "primary" | "danger";
}

export function FormDialog({
  action,
  triggerLabel,
  triggerVariant = "outline",
  triggerSize = "sm",
  triggerIcon,
  disabled,
  title,
  description,
  children,
  submitLabel,
  pendingLabel,
  hiddenFields,
  tone = "primary",
}: FormDialogProps) {
  const [open, setOpen] = useState(false);
  const [round, setRound] = useState(0);
  const router = useRouter();
  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
      title={title}
      description={description}
      role={tone === "danger" ? "alertdialog" : "dialog"}
      size="md"
      trigger={
        <Button variant={triggerVariant} size={triggerSize} iconStart={triggerIcon} disabled={disabled} onClick={() => setRound((value) => value + 1)}>
          {triggerLabel}
        </Button>
      }
    >
      {open && (
        <ActionForm
          key={round}
          action={action}
          submitLabel={submitLabel}
          pendingLabel={pendingLabel}
          submitVariant={tone === "danger" ? "danger" : "primary"}
          hiddenFields={hiddenFields}
          successAs="toast"
        >
          {children}
          <CloseOnSuccess
            onSuccess={(state) => {
              setOpen(false);
              if (!state?.redirectTo) router.refresh();
            }}
          />
        </ActionForm>
      )}
    </Dialog>
  );
}

/**
 * Field errors of the enclosing `ActionForm` for controls that are not `AdminField`s (radio groups, list editors), or
 * for fields that are not on the form at all (e.g. a publish checklist item). Announced with `role="alert"`.
 */
export function ActionFieldErrors({ names, labels }: { names: readonly string[]; labels?: Readonly<Record<string, string>> }) {
  const { state } = useActionFormState();
  if (state === null || state.ok || !state.error.fieldErrors) return null;
  const fieldErrors = state.error.fieldErrors;
  const messages = names.flatMap((name) => (fieldErrors[name] ?? []).map((message) => (labels?.[name] ? `${labels[name]}: ${message}` : message)));
  if (messages.length === 0) return null;
  return (
    <ul role="alert" className="space-y-1 text-sm text-danger-text md:col-span-2">
      {messages.map((message) => (
        <li key={message}>{message}</li>
      ))}
    </ul>
  );
}

/** Calls `onSuccess` once per successful submit of the enclosing `ActionForm`. Renders nothing. */
function CloseOnSuccess({ onSuccess }: { onSuccess: (state: AdminActionState) => void }) {
  const { state } = useActionFormState();
  const handled = useRef<AdminActionState>(null);
  useEffect(() => {
    if (state === null || !state.ok || handled.current === state) return;
    handled.current = state;
    onSuccess(state);
  }, [state, onSuccess]);
  return null;
}
