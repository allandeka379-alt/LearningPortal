"use client";

import { useActionState, useEffect, useRef, useState, type ReactNode } from "react";
import { FormFeedback } from "@/components/student/FormFeedback";
import { Button, type ButtonSize, type ButtonVariant } from "@/components/ui/Button";
import { Dialog, DialogClose } from "@/components/ui/Dialog";
import { Field } from "@/components/ui/Field";
import { Textarea } from "@/components/ui/Textarea";
import { useToast } from "@/components/ui/Toast";
import { fieldErrorsOf, type FamilyFormAction } from "./action-state";

export interface ConfirmActionButtonProps {
  action: FamilyFormAction;
  /** Hidden fields sent with the action (ids). */
  fields: Readonly<Record<string, string>>;
  triggerLabel: ReactNode;
  triggerVariant?: ButtonVariant;
  triggerSize?: ButtonSize;
  triggerIcon?: ReactNode;
  title: string;
  description?: ReactNode;
  /** What will happen (consequences), shown in the dialog body. */
  children?: ReactNode;
  confirmLabel: string;
  pendingLabel?: string;
  /** `danger`: red confirm button and `alertdialog` role. */
  tone?: "danger" | "primary";
  /** Optional free-text reason field (`reason`). */
  reasonLabel?: string;
}

/**
 * A button that runs a family Server Action only after an explicit confirmation dialog: removing a parent, cancelling
 * a code, stopping AI-conversation sharing, withdrawing consent. Errors stay in the dialog; on success the dialog
 * closes and the outcome is announced (toast, polite live region). Usable from Server Components.
 */
export function ConfirmActionButton(props: ConfirmActionButtonProps) {
  const { triggerLabel, triggerVariant = "outline", triggerSize = "md", triggerIcon, title, description, tone = "primary" } = props;
  const [open, setOpen] = useState(false);
  // A fresh form (and action state) per opening, so an old error never greets the next attempt.
  const [round, setRound] = useState(0);

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (next) setRound((value) => value + 1);
        setOpen(next);
      }}
      role={tone === "danger" ? "alertdialog" : "dialog"}
      title={title}
      description={description}
      trigger={
        <Button variant={triggerVariant} size={triggerSize} iconStart={triggerIcon}>
          {triggerLabel}
        </Button>
      }
    >
      <ConfirmBody key={round} {...props} onDone={() => setOpen(false)} />
    </Dialog>
  );
}

function ConfirmBody({
  action,
  fields,
  children,
  confirmLabel,
  pendingLabel = "Working…",
  tone = "primary",
  reasonLabel,
  onDone,
}: ConfirmActionButtonProps & { onDone: () => void }) {
  const [state, formAction, pending] = useActionState(action, null);
  const { toast } = useToast();
  const handled = useRef<unknown>(null);

  useEffect(() => {
    if (state?.ok && handled.current !== state) {
      handled.current = state;
      toast({ title: state.data.message, tone: "success" });
      onDone();
    }
  }, [state, toast, onDone]);

  return (
    <form action={formAction} className="space-y-4">
      {Object.entries(fields).map(([name, value]) => (
        <input key={name} type="hidden" name={name} value={value} />
      ))}
      {children && <div className="space-y-2 text-sm text-muted">{children}</div>}
      {reasonLabel && (
        <Field label={reasonLabel} optional error={fieldErrorsOf(state, "reason")}>
          <Textarea name="reason" rows={3} maxLength={255} />
        </Field>
      )}
      {state && !state.ok && <FormFeedback state={state} />}
      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <DialogClose>Cancel</DialogClose>
        <Button type="submit" variant={tone === "danger" ? "danger" : "primary"} loading={pending} loadingText={pendingLabel}>
          {confirmLabel}
        </Button>
      </div>
    </form>
  );
}
