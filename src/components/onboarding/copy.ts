import { formatLocalDate } from "@/components/student/format";
import { formatCount, formatDuration } from "@/lib/format";

/**
 * Wording for the onboarding wizard and the diagnostic (§5, §52). Pure and isomorphic: UI copy only; every name,
 * date and number comes from the database through the onboarding service.
 */

export type AbilityValue = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";

/** §5 "Current ability" choices: label and a plain description the student can recognise themselves in. */
export const ABILITY_COPY: Readonly<Record<AbilityValue, { label: string; description: string }>> = {
  BEGINNER: { label: "Beginner", description: "I'm just starting, or I find most topics hard." },
  INTERMEDIATE: { label: "Intermediate", description: "I know the basics, but some topics are still shaky." },
  ADVANCED: { label: "Advanced", description: "I'm confident with most topics and want exam-level practice." },
};

export function abilityLabel(value: string | null | undefined): string | null {
  return value && value in ABILITY_COPY ? ABILITY_COPY[value as AbilityValue].label : null;
}

export interface SessionCopyInput {
  startsOn: string;
  isProvisional: boolean;
  isDemo: boolean;
  /** Days from today (student's time zone); omitted in summaries. */
  daysUntil?: number;
}

/** "Provisional date" / "Demo date (development only)" label, or null for a confirmed date. */
export function sessionDateStatus(session: Pick<SessionCopyInput, "isProvisional" | "isDemo">): string | null {
  if (session.isDemo) return "Demo date (development only)";
  if (session.isProvisional) return "Provisional date";
  return null;
}

/** Description under an examination session: "Starts 2 November 2027 · in 393 days · Provisional date". */
export function sessionDescription(session: SessionCopyInput): string {
  const parts = [`Starts ${formatLocalDate(session.startsOn, "long")}`];
  if (session.daysUntil !== undefined) {
    parts.push(session.daysUntil <= 0 ? "under way" : session.daysUntil === 1 ? "tomorrow" : `in ${formatCount(session.daysUntil, "day")}`);
  }
  const status = sessionDateStatus(session);
  if (status) parts.push(status);
  return parts.join(" · ");
}

/** "45 min a day" (daily goal choice / summary). */
export function dailyGoalLabel(minutes: number): string {
  return `${formatDuration(minutes)} a day`;
}

/** "Syllabus 4004" under a subject when the board code is known. */
export function subjectCodeLabel(code: string | null | undefined): string | null {
  const trimmed = code?.trim();
  return trimmed ? `Syllabus ${trimmed}` : null;
}

/** Case- and accent-insensitive subject search on name and code (pure; used by the subject picker). */
export function matchesSubjectQuery(subject: { name: string; code: string | null }, query: string): boolean {
  const normalise = (value: string) => value.normalize("NFD").replace(/\p{M}/gu, "").toLocaleLowerCase("en").trim();
  const needle = normalise(query);
  if (needle === "") return true;
  return normalise(subject.name).includes(needle) || (subject.code !== null && normalise(subject.code).includes(needle));
}

// ---------------------------------------------------------------------------------------------------------------------
// Diagnostic
// ---------------------------------------------------------------------------------------------------------------------

/** "12 questions · about 10 minutes". */
export function diagnosticSizeText(questions: number, minutes: number): string {
  return `${formatCount(questions, "question")} · about ${formatCount(minutes, "minute")}`;
}

/** Why a topic is a starting point, in the student's terms. */
export function startingReasonText(reason: "GAP" | "MIXED" | "NOT_COVERED", percent: number | null): string {
  switch (reason) {
    case "GAP":
      return percent === null ? "This is where the diagnostic found the most to work on." : `You scored ${Math.round(percent)}% here, so this is a good place to start.`;
    case "MIXED":
      return percent === null ? "Some answers were right; a little practice will secure it." : `You scored ${Math.round(percent)}%: some answers were right, and practice will secure the rest.`;
    case "NOT_COVERED":
      return "The diagnostic didn't ask about this topic yet, so start here to find out where you are.";
  }
}

/** "Based on 2 questions" (evidence note for a topic line), with pending answers mentioned. */
export function evidenceText(questionCount: number, pendingCount: number): string {
  const base = `Based on ${formatCount(questionCount, "question")}`;
  return pendingCount > 0 ? `${base} (${formatCount(pendingCount, "answer")} still being marked)` : base;
}
