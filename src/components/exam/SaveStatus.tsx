"use client";

import { CircleAlert, CloudCheck, CloudOff } from "lucide-react";
import { Spinner } from "@/components/ui/Spinner";
import { cn } from "@/lib/cn";
import type { AutosaveStatus } from "./autosave";

export interface SaveStatusProps {
  status: AutosaveStatus;
  /** The browser reports a connection. */
  online: boolean;
  className?: string;
}

/** The visible sentence for an autosave state (pure; tested). */
export function saveStatusText(status: AutosaveStatus, online: boolean): { tone: "quiet" | "busy" | "problem"; text: string } {
  if (!online && status.unsaved > 0) {
    return { tone: "problem", text: "You're offline. Your answers are kept on this device and will be saved when you reconnect." };
  }
  switch (status.state) {
    case "saving":
    case "pending":
      return { tone: "busy", text: "Saving…" };
    case "retrying":
      return { tone: "problem", text: status.message ?? "Not saved yet. Trying again…" };
    case "error":
      return { tone: "problem", text: status.message ?? "An answer couldn't be saved." };
    case "saved":
      return { tone: "quiet", text: "All answers saved" };
    case "idle":
      return { tone: "quiet", text: online ? "Answers save automatically" : "You're offline. Answers will be saved when you reconnect." };
  }
}

/**
 * Autosave indicator (§12 "save progress"). Routine states ("Saving…", "All answers saved") are shown, not announced;
 * problems (offline, retrying, refused) are announced politely once each.
 */
export function SaveStatus({ status, online, className }: SaveStatusProps) {
  const { tone, text } = saveStatusText(status, online);
  return (
    <div className={cn("flex min-h-6 items-start gap-1.5 text-sm", tone === "problem" ? "text-warning-text" : "text-muted", className)}>
      <span aria-hidden="true" className="mt-0.5 shrink-0 [&_svg]:size-4">
        {tone === "busy" ? <Spinner size="sm" /> : tone === "problem" ? online ? <CircleAlert /> : <CloudOff /> : <CloudCheck />}
      </span>
      <span>{text}</span>
      <span aria-live="polite" className="sr-only">
        {tone === "problem" ? text : ""}
      </span>
    </div>
  );
}
