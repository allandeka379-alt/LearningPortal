"use client";

import { Check, Copy } from "lucide-react";
import { useId, useRef, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { useActionFormState } from "./ActionForm";

/**
 * A read-only value with a Copy button: an invitation link, a one-time password. The value stays selectable by hand
 * when the clipboard API is unavailable, and the result of copying is announced politely.
 */
export function CopyValueField({ value, label, hint, monospace = true }: { value: string; label: string; hint?: ReactNode; monospace?: boolean }) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");
  const input = useRef<HTMLInputElement | null>(null);
  const id = useId();
  const hintId = useId();

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setStatus("copied");
    } catch {
      input.current?.select();
      setStatus("failed");
    }
  };

  return (
    <div className="space-y-1.5 rounded-card border border-border bg-subtle p-3">
      <label htmlFor={id} className="block text-sm font-medium text-text">
        {label}
      </label>
      <div className="flex gap-2">
        <input
          id={id}
          ref={input}
          readOnly
          value={value}
          aria-describedby={hint ? hintId : undefined}
          onFocus={(event) => event.currentTarget.select()}
          className={`min-h-11 min-w-0 flex-1 rounded-control border border-border bg-surface px-3 text-sm text-text ${monospace ? "font-mono" : ""}`}
        />
        <Button type="button" variant="outline" onClick={copy} iconStart={status === "copied" ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}>
          {status === "copied" ? "Copied" : "Copy"}
        </Button>
      </div>
      {hint && (
        <p id={hintId} className="text-sm text-muted">
          {hint}
        </p>
      )}
      <p className="sr-only" aria-live="polite">
        {status === "copied" ? `${label} copied to the clipboard.` : status === "failed" ? `Copy failed: the ${label.toLowerCase()} is selected, copy it by hand.` : ""}
      </p>
    </div>
  );
}

/**
 * Inside an `ActionForm`: after a successful submit, shows `data[field]` (a string) as a {@link CopyValueField}.
 * Renders nothing before that or when the action returned no such value.
 */
export function ActionResultCopyField({ field, label, hint }: { field: string; label: string; hint?: ReactNode }) {
  const { state } = useActionFormState();
  if (state === null || !state.ok || typeof state.data !== "object" || state.data === null) return null;
  const value = (state.data as Record<string, unknown>)[field];
  if (typeof value !== "string" || value === "") return null;
  return <CopyValueField value={value} label={label} hint={hint} />;
}
