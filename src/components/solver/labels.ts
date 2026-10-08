import type { SolveMode, SolveOutcome, SolverAvailability, SolverQuota, SolverStatus } from "@/server/solver/types";

/**
 * UI copy and small pure helpers for the AI question solver (§15). Labels and generic guidance only: no educational
 * content (CLAUDE.md rule 5), no model ids, prices or limits (those come from the server).
 */

export interface SolveModeOption {
  mode: SolveMode;
  label: string;
  description: string;
}

/** "Teach me" first: it is the default (§14 teach-first, §15 "Teach me" vs "Give me the answer"). */
export const SOLVE_MODE_OPTIONS: readonly SolveModeOption[] = [
  { mode: "TEACH", label: "Teach me", description: "One step at a time, with something to try before each next step." },
  { mode: "ANSWER", label: "Give me the answer", description: "The full worked solution, with every step explained." },
];

/** Shown while "Give me the answer" is selected: the answer mode still explains (§15 educational integrity). */
export const ANSWER_MODE_NOTE =
  "You'll see the full worked solution. Read each step and the reason for it, then try one of the practice questions on your own: that's what earns marks in the exam.";

export const AI_PRACTICE_LABEL = "AI-generated practice, not from the official bank";

export const SOLVER_DISCLAIMER = "AI can make mistakes. Check important answers against your lessons or with your teacher.";

export const NOT_CONFIGURED_TITLE = "AI tutor is not configured yet";

/** Which calm state the solver page shows (not configured beats switched off beats plan beats exam lock). */
export function solverAvailabilityOf(status: Pick<SolverStatus, "configured" | "enabled" | "entitled" | "examLocked">): SolverAvailability {
  if (!status.configured) return "not_configured";
  if (!status.enabled) return "disabled";
  if (!status.entitled) return "not_entitled";
  if (status.examLocked) return "exam_locked";
  return "ready";
}

/** "3 of 10 questions left today"; null for unlimited plans. */
export function solverQuotaText(quota: SolverQuota | null): string | null {
  if (quota === null) return null;
  const noun = quota.limit === 1 ? "question" : "questions";
  return `${quota.remaining} of ${quota.limit} ${noun} left today`;
}

/** "5 MB" / "2.5 MB" for upload limits. */
export function formatMegabytes(bytes: number): string {
  const mb = bytes / (1024 * 1024);
  return Number.isInteger(mb) ? `${mb} MB` : `${mb.toFixed(1)} MB`;
}

export function modeLabel(mode: SolveMode): string {
  return mode === "ANSWER" ? "Full answer" : "Teach me";
}

/** Short status shown in the history list; null for a normal, complete solve. */
export function outcomeLabel(outcome: SolveOutcome): string | null {
  switch (outcome) {
    case "COMPLETE":
      return null;
    case "UNREADABLE":
      return "Couldn't read it";
    case "REFUSED":
      return "Not answered";
    case "TRUNCATED":
    case "ERROR":
      return "Didn't finish";
  }
}

/**
 * How many TEACH steps to show first, from the `?step=` deep link: 1..steps, or steps + 1 once the final answer is
 * shown. Anything else starts at the first step. Pure.
 */
export function initialRevealed(stepParam: string | string[] | undefined, stepCount: number): number {
  const raw = Array.isArray(stepParam) ? stepParam[0] : stepParam;
  const value = Number(raw);
  if (stepCount <= 0) return 0;
  if (!Number.isInteger(value) || value < 1) return 1;
  return Math.min(value, stepCount + 1);
}

/** A request id for retries after a dropped connection (server: `[A-Za-z0-9_-]{8,64}`). */
export function newRequestId(random: () => string = defaultRandom): string {
  return `solve_${random().replace(/[^A-Za-z0-9_-]/g, "").slice(0, 48)}`;
}

function defaultRandom(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") return crypto.randomUUID();
  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 12)}`;
}
