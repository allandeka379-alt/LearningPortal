import { formatNumber } from "@/lib/format";

/**
 * Wording for the course views (Learn library, course page, dashboard "Continue learning", lesson "Next steps"). Pure
 * and isomorphic: UI copy only; every name and number comes from the read models.
 */

export type NextLessonReasonLabel = "RESUME" | "NEXT" | "START";

/** The button verb for the lesson a course offers: "Start", "Resume" or "Continue". */
export function continueVerb(reason: NextLessonReasonLabel): string {
  if (reason === "START") return "Start";
  if (reason === "RESUME") return "Resume";
  return "Continue";
}

/** The small label above the offered lesson: "First lesson", "Pick up where you left off", "Up next". */
export function nextLessonCaption(reason: NextLessonReasonLabel): string {
  if (reason === "START") return "First lesson";
  if (reason === "RESUME") return "Pick up where you left off";
  return "Up next";
}

/** "3 of 12 lessons completed" (singular-aware). */
export function lessonsProgressText(completed: number, total: number): string {
  return `${formatNumber(completed)} of ${formatNumber(total)} ${total === 1 ? "lesson" : "lessons"} completed`;
}

/** Whole-number percentage of lessons completed (0 without lessons). */
export function lessonsPercent(completed: number, total: number): number {
  return total > 0 ? Math.round((Math.min(completed, total) * 100) / total) : 0;
}

/** "ZIMSEC Ordinary Level" — the board is already in most qualification names; add it only when it is not. */
export function qualificationLine(qualificationName: string, boardName: string): string {
  return qualificationName.toLowerCase().includes(boardName.toLowerCase()) ? qualificationName : `${boardName} ${qualificationName}`;
}

/** "Form 4 · ZIMSEC Ordinary Level", skipping what is unknown; null when both are. */
export function learnerLine(yearGroupName: string | null, qualificationName: string | null): string | null {
  const parts = [yearGroupName, qualificationName].filter((part): part is string => Boolean(part?.trim()));
  return parts.length > 0 ? parts.join(" · ") : null;
}

/** "Your exam is in 11 months" / "in 1 month". */
export function examMonthsSentence(months: number): string {
  return `Your exams are in ${formatNumber(months)} ${months === 1 ? "month" : "months"}`;
}
