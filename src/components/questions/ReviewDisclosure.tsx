"use client";

import { useState, type ReactNode } from "react";

/**
 * One collapsible row of `<ReviewList>`. A client island only so its open / closed state survives a server refresh
 * (self-marking an answer refreshes the page to update the score; the row the student is working in stays open).
 */
export function ReviewDisclosure({ initialOpen = false, summary, children }: { initialOpen?: boolean; summary: ReactNode; children: ReactNode }) {
  const [open, setOpen] = useState(initialOpen);
  return (
    <details open={open} onToggle={(event) => setOpen(event.currentTarget.open)} className="group/review rounded-card border border-border bg-surface">
      {summary}
      {children}
    </details>
  );
}
