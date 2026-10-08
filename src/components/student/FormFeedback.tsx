import { CircleAlert, CircleCheck } from "lucide-react";
import { cn } from "@/lib/cn";
import type { FormActionState } from "./action-state";

/**
 * Result line under a student-area form. Always mounted as a polite live region so the outcome of a submit
 * ("Saved." or the error) is announced without moving focus. Server-compatible.
 */
export function FormFeedback({ state, className }: { state: FormActionState; className?: string }) {
  const message = state === null ? null : state.ok ? state.data.message : state.error.message;
  return (
    <p aria-live="polite" role="status" className={cn("min-h-5 text-sm", className)}>
      {message && state && (
        <span className={cn("inline-flex items-start gap-1.5", state.ok ? "text-success-text" : "text-danger-text")}>
          {state.ok ? (
            <CircleCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          ) : (
            <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          )}
          <span>{message}</span>
        </span>
      )}
    </p>
  );
}
