"use client";

import { Copy } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { formatJoinCode } from "@/server/teaching/core";

/**
 * The class join code, large enough to read aloud or write on the board, with a copy button. The outcome of copying
 * is announced politely; a browser without clipboard access shows the code selected instead.
 */
export function JoinCodePanel({ code }: { code: string | null }) {
  const [message, setMessage] = useState("");
  if (!code) {
    return <p className="text-sm text-muted">Joining with a code is switched off. Create a new code to switch it on again.</p>;
  }
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setMessage("Code copied.");
    } catch {
      setMessage("Copy isn't available here. Select the code and copy it.");
    }
  };
  return (
    <div className="space-y-2">
      <p className="text-sm text-muted">Students open Classes in their app, choose “Join a class” and enter:</p>
      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded-control border border-border-strong bg-subtle px-4 py-2 font-mono text-2xl font-bold tracking-widest text-text select-all" aria-label={`Join code ${code.split("").join(" ")}`}>
          {formatJoinCode(code)}
        </span>
        <Button variant="outline" size="sm" iconStart={<Copy aria-hidden="true" />} onClick={copy}>
          Copy code
        </Button>
      </div>
      <p role="status" aria-live="polite" className="min-h-5 text-sm text-muted">
        {message}
      </p>
    </div>
  );
}
