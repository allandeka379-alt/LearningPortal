"use client";

import { Check, Copy } from "lucide-react";
import { useId, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

/**
 * Copies an `![alt](asset:<id>)` snippet for pasting into the lesson / flashcard / question editor. Shows the snippet
 * in a read-only field (so it can also be selected by hand when the clipboard API is unavailable) and announces the
 * result politely.
 */
export function CopySnippetButton({ snippet, label = "Markdown snippet", compact = false }: { snippet: string; label?: string; compact?: boolean }) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");
  const input = useRef<HTMLInputElement | null>(null);
  const id = useId();

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(snippet);
      setStatus("copied");
    } catch {
      input.current?.select();
      setStatus("failed");
    }
    setTimeout(() => setStatus("idle"), 2500);
  };

  return (
    <div className={cn("space-y-1", compact && "space-y-0")}>
      <label htmlFor={id} className={cn("block text-xs font-medium text-muted", compact && "sr-only")}>
        {label}
      </label>
      <div className="flex gap-2">
        <input
          id={id}
          ref={input}
          readOnly
          value={snippet}
          onFocus={(event) => event.currentTarget.select()}
          className="min-h-9 min-w-0 flex-1 rounded-control border border-border bg-subtle px-2 font-mono text-xs text-text"
        />
        <Button type="button" size="sm" variant="outline" onClick={copy} iconStart={status === "copied" ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}>
          {status === "copied" ? "Copied" : "Copy"}
        </Button>
      </div>
      <p className="sr-only" aria-live="polite">
        {status === "copied" ? "Snippet copied to the clipboard." : status === "failed" ? "Copy failed: the snippet is selected, press Ctrl+C." : ""}
      </p>
    </div>
  );
}
