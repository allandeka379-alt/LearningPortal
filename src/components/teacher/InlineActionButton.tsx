"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect, useRef, type ReactNode } from "react";
import type { AdminActionState, AdminFormAction } from "@/components/admin/form-state";
import { Button, type ButtonSize, type ButtonVariant } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

export interface InlineActionButtonProps {
  action: AdminFormAction<unknown>;
  /** Hidden fields (ids) sent with the action. */
  fields: Readonly<Record<string, string>>;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  pendingLabel?: string;
  /** Accessible name when the visible label is ambiguous in a list ("Approve Tariro"). */
  ariaLabel?: string;
}

/**
 * A one-button form for quick, reversible actions (approve a request, publish a draft): runs the Server Action,
 * announces the outcome as a toast (errors too) and refreshes the page data. Works without JavaScript as a plain form
 * post. Irreversible actions use `ConfirmAction` instead.
 */
export function InlineActionButton({ action, fields, children, variant = "outline", size = "sm", icon, pendingLabel = "Working…", ariaLabel }: InlineActionButtonProps) {
  const [state, formAction, pending] = useActionState<AdminActionState<unknown>, FormData>(action, null);
  const router = useRouter();
  const { toast } = useToast();
  const handled = useRef<AdminActionState>(null);

  useEffect(() => {
    if (state === null || handled.current === state) return;
    handled.current = state;
    if (state.ok) {
      if (state.message) toast({ title: state.message, tone: "success" });
      if (state.redirectTo) router.push(state.redirectTo);
      else router.refresh();
    } else {
      toast({ title: state.error.message, tone: "danger" });
    }
  }, [state, toast, router]);

  return (
    <form action={formAction} className="inline-flex">
      {Object.entries(fields).map(([name, value]) => (
        <input key={name} type="hidden" name={name} value={value} />
      ))}
      <Button type="submit" variant={variant} size={size} iconStart={icon} loading={pending} loadingText={pendingLabel} aria-label={ariaLabel}>
        {children}
      </Button>
    </form>
  );
}
