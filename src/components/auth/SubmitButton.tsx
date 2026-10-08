"use client";

import type { ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { Button, type ButtonProps } from "@/components/ui/Button";

export interface SubmitButtonProps extends Omit<ButtonProps, "type" | "loading"> {
  /** Label while the form is submitting, e.g. "Signing in…". */
  pendingText?: ReactNode;
}

/** Full-width submit button that shows a spinner and blocks double submits while its form's action runs. */
export function SubmitButton({ pendingText, children, size = "lg", fullWidth = true, ...props }: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size={size} fullWidth={fullWidth} loading={pending} loadingText={pendingText} {...props}>
      {children}
    </Button>
  );
}
