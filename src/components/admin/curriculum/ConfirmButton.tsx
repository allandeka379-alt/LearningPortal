"use client";

import { useState, type ReactNode } from "react";
import { Button, type ButtonSize, type ButtonVariant } from "@/components/ui/Button";
import { Dialog, DialogClose } from "@/components/ui/Dialog";

/**
 * A button that runs a client callback (e.g. a tree-editor command) only after an explicit confirmation dialog — for
 * destructive steps outside a form (deleting a topic and its subtopics). Native `<dialog>`: focus trap, Escape.
 */
export function ConfirmButton({
  label,
  icon,
  variant = "outline",
  size = "md",
  disabled,
  title,
  description,
  children,
  confirmLabel,
  tone = "danger",
  onConfirm,
}: {
  label: ReactNode;
  icon?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  title: string;
  description?: ReactNode;
  children?: ReactNode;
  confirmLabel: string;
  tone?: "danger" | "primary";
  /** Resolves when done; the dialog closes afterwards. */
  onConfirm: () => Promise<unknown>;
}) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
      role={tone === "danger" ? "alertdialog" : "dialog"}
      title={title}
      description={description}
      size="sm"
      trigger={
        <Button variant={variant} size={size} iconStart={icon} disabled={disabled}>
          {label}
        </Button>
      }
      footer={
        <>
          <DialogClose>Cancel</DialogClose>
          <Button
            variant={tone === "danger" ? "danger" : "primary"}
            loading={busy}
            onClick={async () => {
              setBusy(true);
              try {
                await onConfirm();
              } finally {
                setBusy(false);
                setOpen(false);
              }
            }}
          >
            {confirmLabel}
          </Button>
        </>
      }
    >
      {children}
    </Dialog>
  );
}
