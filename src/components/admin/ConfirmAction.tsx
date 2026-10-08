"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect, useId, useRef, useState, type ReactNode } from "react";
import { Alert } from "@/components/ui/Alert";
import { Button, type ButtonSize, type ButtonVariant } from "@/components/ui/Button";
import { Dialog, DialogClose } from "@/components/ui/Dialog";
import { Field } from "@/components/ui/Field";
import { Textarea } from "@/components/ui/Textarea";
import { useToast } from "@/components/ui/Toast";
import { fieldErrorsFor, needsReauth, type AdminActionState, type AdminFormAction } from "./form-state";
import { StepUpForm } from "./StepUpForm";

/**
 * A button that runs a Server Action only after an explicit confirmation dialog — for destructive or irreversible
 * admin actions (suspend, sign out everywhere, publish, archive, remove member…). Optional required reason (recorded
 * in the audit log), field errors and the step-up password prompt are handled inside the dialog. On success the
 * dialog closes, the confirmation is announced as a toast and the page data refreshes.
 *
 * Usable from Server Components (pass the Server Action and plain props).
 */

export interface ConfirmReasonField {
  /** Form field name (default "reason"). */
  name?: string;
  label: string;
  hint?: ReactNode;
  required?: boolean;
  maxLength?: number;
  placeholder?: string;
}

export interface ConfirmActionProps {
  action: AdminFormAction<unknown>;
  /** Hidden fields submitted with the action (ids). */
  fields?: Readonly<Record<string, string>>;
  triggerLabel: ReactNode;
  triggerVariant?: ButtonVariant;
  triggerSize?: ButtonSize;
  triggerIcon?: ReactNode;
  /** Disable the trigger (and explain why in `disabledReason`, shown as the button's description). */
  disabled?: boolean;
  disabledReason?: string;
  title: string;
  description?: ReactNode;
  /** Body content (consequences, a summary of what will change). */
  children?: ReactNode;
  confirmLabel: string;
  pendingLabel?: string;
  /** `danger` for destructive actions (red confirm button, `alertdialog` role). */
  tone?: "danger" | "primary";
  reason?: ConfirmReasonField;
  /** Toast text when the action does not supply its own `message`. */
  successMessage?: string;
}

export function ConfirmAction(props: ConfirmActionProps) {
  const {
    triggerLabel,
    triggerVariant = "outline",
    triggerSize = "sm",
    triggerIcon,
    disabled,
    disabledReason,
    title,
    description,
    tone = "primary",
  } = props;
  const [open, setOpen] = useState(false);
  // A fresh body (and action state) every time the dialog opens, so an old error never greets the next attempt.
  const [round, setRound] = useState(0);
  const disabledId = useId();

  const trigger = (
    <Button
      variant={triggerVariant}
      size={triggerSize}
      iconStart={triggerIcon}
      disabled={disabled}
      aria-describedby={disabled && disabledReason ? disabledId : undefined}
      onClick={() => setRound((value) => value + 1)}
    >
      {triggerLabel}
    </Button>
  );

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        trigger={trigger}
        title={title}
        description={description}
        role={tone === "danger" ? "alertdialog" : "dialog"}
        size="md"
      >
        {open && <ConfirmBody key={round} {...props} onDone={() => setOpen(false)} />}
      </Dialog>
      {disabled && disabledReason && (
        <span id={disabledId} className="sr-only">
          {disabledReason}
        </span>
      )}
    </>
  );
}

function ConfirmBody({
  action,
  fields,
  children,
  confirmLabel,
  pendingLabel = "Working…",
  tone = "primary",
  reason,
  successMessage,
  onDone,
}: ConfirmActionProps & { onDone: () => void }) {
  const [state, formAction, pending] = useActionState<AdminActionState<unknown>, FormData>(action, null);
  const router = useRouter();
  const { toast } = useToast();
  const formId = useId();
  const handled = useRef<AdminActionState>(null);

  useEffect(() => {
    if (state === null || !state.ok || handled.current === state) return;
    handled.current = state;
    toast({ title: state.message ?? successMessage ?? "Done.", tone: "success" });
    onDone();
    if (state.redirectTo) router.push(state.redirectTo);
    else router.refresh();
  }, [state, successMessage, toast, onDone, router]);

  const reasonName = reason?.name ?? "reason";
  const failure = state !== null && !state.ok ? state : null;

  return (
    <div className="space-y-4">
      {children && <div className="text-sm text-text">{children}</div>}
      <form id={formId} action={formAction} className="space-y-4">
        {fields && Object.entries(fields).map(([name, value]) => <input key={name} type="hidden" name={name} value={value} />)}
        {reason && (
          <Field
            label={reason.label}
            hint={reason.hint}
            required={reason.required}
            optional={!reason.required}
            error={fieldErrorsFor(state, reasonName)}
          >
            <Textarea
              name={reasonName}
              rows={3}
              maxLength={reason.maxLength ?? 500}
              placeholder={reason.placeholder}
              defaultValue={state?.values?.[reasonName]}
            />
          </Field>
        )}
        {failure && !needsReauth(state) && (
          <Alert tone="danger" role="alert">
            {failure.error.message}
          </Alert>
        )}
      </form>
      {needsReauth(state) && <StepUpForm />}
      <div className="flex flex-col-reverse gap-2 border-t border-border pt-4 sm:flex-row sm:justify-end">
        <DialogClose>Cancel</DialogClose>
        <Button type="submit" form={formId} variant={tone === "danger" ? "danger" : "primary"} loading={pending} loadingText={pendingLabel}>
          {confirmLabel}
        </Button>
      </div>
    </div>
  );
}
