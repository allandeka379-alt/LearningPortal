/**
 * Exam-mode rules (§12, §13) shared by the exam room's client island and the exams service. PURE and isomorphic: no
 * DOM, no I/O, every function takes `nowMs` (server-clock milliseconds) explicitly. Unit tested in exam-model.test.ts.
 *
 * Timing model (server-authoritative, see `src/server/exams/timer.ts`):
 * - an attempt may have an OVERALL deadline (timed tests, timed exams, single-paper mocks);
 * - a paper (section) may have its OWN limit (multi-paper mocks): its clock starts when the student starts that
 *   paper and stops at its deadline, or when the student finishes the paper early. One paper runs at a time;
 * - the countdown the student sees is the earliest of the overall deadline and the running paper's deadline.
 */
import type { ExamClock, ExamSectionClock } from "./types";

// ---------------------------------------------------------------------------------------------------------------------
// Papers / sections
// ---------------------------------------------------------------------------------------------------------------------

/**
 * - `UNTIMED`: shares the attempt's timer (or the attempt is untimed); always open while the attempt is.
 * - `NOT_STARTED`: a timed paper whose clock has not started.
 * - `RUNNING`: a timed paper whose clock is running.
 * - `FINISHED`: the student finished it early (or the attempt was closed).
 * - `TIME_UP`: its clock ran out.
 */
export type SectionStatus = "UNTIMED" | "NOT_STARTED" | "RUNNING" | "FINISHED" | "TIME_UP";

export function sectionStatus(section: ExamSectionClock, nowMs: number): SectionStatus {
  if (section.finishedAtMs !== null) return "FINISHED";
  if (section.timeLimitSeconds === null) return "UNTIMED";
  if (section.startedAtMs === null || section.deadlineMs === null) return "NOT_STARTED";
  return nowMs >= section.deadlineMs ? "TIME_UP" : "RUNNING";
}

/** Answers in a closed paper can no longer be changed. */
export function isClosedStatus(status: SectionStatus): boolean {
  return status === "FINISHED" || status === "TIME_UP";
}

/** The timed paper whose clock is running, if any. */
export function runningSection<T extends ExamSectionClock>(sections: readonly T[], nowMs: number): T | null {
  return sections.find((section) => sectionStatus(section, nowMs) === "RUNNING") ?? null;
}

export type SectionStartDecision =
  | { kind: "START" }
  | { kind: "UNTIMED" }
  | { kind: "ALREADY_RUNNING" }
  | { kind: "CLOSED" }
  /** Another paper is running: finish it (or let its time run out) first. */
  | { kind: "BLOCKED"; runningSectionNumber: number }
  | { kind: "UNKNOWN" };

/** Whether the student may start the clock of paper `sectionNumber` now (one paper at a time). */
export function sectionStartDecision(sections: readonly ExamSectionClock[], sectionNumber: number, nowMs: number): SectionStartDecision {
  const section = sections.find((s) => s.sectionNumber === sectionNumber);
  if (!section) return { kind: "UNKNOWN" };
  const status = sectionStatus(section, nowMs);
  if (status === "UNTIMED") return { kind: "UNTIMED" };
  if (status === "RUNNING") return { kind: "ALREADY_RUNNING" };
  if (isClosedStatus(status)) return { kind: "CLOSED" };
  const running = runningSection(sections, nowMs);
  if (running) return { kind: "BLOCKED", runningSectionNumber: running.sectionNumber };
  return { kind: "START" };
}

export type SectionFinishDecision = { kind: "FINISH" } | { kind: "NOT_STARTED" } | { kind: "CLOSED" } | { kind: "UNTIMED" } | { kind: "UNKNOWN" };

/** Only a running timed paper can be finished early (its answers are then locked). */
export function sectionFinishDecision(sections: readonly ExamSectionClock[], sectionNumber: number, nowMs: number): SectionFinishDecision {
  const section = sections.find((s) => s.sectionNumber === sectionNumber);
  if (!section) return { kind: "UNKNOWN" };
  switch (sectionStatus(section, nowMs)) {
    case "RUNNING":
      return { kind: "FINISH" };
    case "NOT_STARTED":
      return { kind: "NOT_STARTED" };
    case "UNTIMED":
      return { kind: "UNTIMED" };
    default:
      return { kind: "CLOSED" };
  }
}

// ---------------------------------------------------------------------------------------------------------------------
// The countdown and time-up
// ---------------------------------------------------------------------------------------------------------------------

/**
 * The deadline the countdown shows: the attempt's, or the running paper's when that ends first. Once the attempt's
 * deadline has passed it stays the active deadline (the countdown shows 00:00); a paper stops being active when its
 * own time is up.
 */
export type ActiveDeadline = { scope: "ATTEMPT"; deadlineMs: number } | { scope: "SECTION"; sectionNumber: number; deadlineMs: number };

export function activeDeadline(clock: Pick<ExamClock, "deadlineMs" | "sections">, nowMs: number): ActiveDeadline | null {
  const running = runningSection(clock.sections, nowMs);
  const section = running && running.deadlineMs !== null ? running : null;
  if (clock.deadlineMs !== null && (section === null || clock.deadlineMs <= (section.deadlineMs as number))) {
    return { scope: "ATTEMPT", deadlineMs: clock.deadlineMs };
  }
  if (section) return { scope: "SECTION", sectionNumber: section.sectionNumber, deadlineMs: section.deadlineMs as number };
  return null;
}

/** Stable key of a deadline (warnings and expiry fire once per key). */
export function deadlineKey(deadline: ActiveDeadline): string {
  return deadline.scope === "ATTEMPT" ? "attempt" : `section:${deadline.sectionNumber}`;
}

/**
 * True when the whole attempt must be submitted because time is up (server-checked on a `TIME_UP` submit):
 * the overall deadline has passed, or — without an overall deadline — every paper is timed and every paper's clock
 * has run out or been finished. A paper that was never started keeps the attempt open (it may be sat later).
 */
export function timeUpDue(clock: Pick<ExamClock, "deadlineMs" | "sections">, nowMs: number): boolean {
  if (clock.deadlineMs !== null) return nowMs >= clock.deadlineMs;
  if (clock.sections.length === 0) return false;
  return clock.sections.every((section) => section.timeLimitSeconds !== null && isClosedStatus(sectionStatus(section, nowMs)));
}

/** Whether question answers can be changed right now. */
export type PositionLock = "OPEN" | "NOT_STARTED" | "SECTION_CLOSED" | "TIME_UP";

/**
 * Whether the answer at a position can be edited: closed once the overall time is up, while its paper has not
 * started, and after its paper is finished or out of time.
 */
export function positionLock(clock: Pick<ExamClock, "deadlineMs" | "sections">, sectionNumber: number | null, nowMs: number): PositionLock {
  if (clock.deadlineMs !== null && nowMs >= clock.deadlineMs) return "TIME_UP";
  if (sectionNumber === null) return "OPEN";
  const section = clock.sections.find((s) => s.sectionNumber === sectionNumber);
  if (!section) return "OPEN";
  const status = sectionStatus(section, nowMs);
  if (status === "NOT_STARTED") return "NOT_STARTED";
  if (isClosedStatus(status)) return "SECTION_CLOSED";
  return "OPEN";
}

// ---------------------------------------------------------------------------------------------------------------------
// Answers and navigation
// ---------------------------------------------------------------------------------------------------------------------

export interface AnswerState {
  position: number;
  answered: boolean;
  flagged: boolean;
}

export interface AnswerSummary {
  total: number;
  answered: number;
  /** §13 "review unanswered questions". */
  unanswered: number[];
  flagged: number[];
}

export function answerSummary(states: readonly AnswerState[]): AnswerSummary {
  const sorted = [...states].sort((a, b) => a.position - b.position);
  return {
    total: sorted.length,
    answered: sorted.filter((s) => s.answered).length,
    unanswered: sorted.filter((s) => !s.answered).map((s) => s.position),
    flagged: sorted.filter((s) => s.flagged).map((s) => s.position),
  };
}

/** The next question number, or null after the last one. */
export function nextPosition(current: number, total: number): number | null {
  return current < total ? current + 1 : null;
}

/** The previous question number, or null on the first one (and always null for linear papers). */
export function previousPosition(current: number, allowNavigation: boolean): number | null {
  return allowNavigation && current > 1 ? current - 1 : null;
}

/** A position within 1..total (falls back to 1). */
export function clampPosition(position: number | null | undefined, total: number): number {
  if (position === null || position === undefined || !Number.isInteger(position) || total < 1) return 1;
  return Math.min(total, Math.max(1, position));
}

/** Plain-language status of a paper for the navigator and review screen ("42 min left", "Finished"). */
export function sectionStatusLabel(status: SectionStatus, remainingSeconds: number | null): string {
  switch (status) {
    case "UNTIMED":
      return "";
    case "NOT_STARTED":
      return "Not started";
    case "RUNNING":
      return remainingSeconds === null ? "In progress" : `${formatClock(remainingSeconds)} left`;
    case "FINISHED":
      return "Finished";
    case "TIME_UP":
      return "Time is up";
  }
}

// ---------------------------------------------------------------------------------------------------------------------
// Time formatting
// ---------------------------------------------------------------------------------------------------------------------

/** Countdown text: "1:05:09" with hours, else "09:59". Negative values show "00:00". */
export function formatClock(totalSeconds: number): string {
  const seconds = Math.max(0, Math.floor(totalSeconds));
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
}

/** Spoken form for screen readers: "1 hour 5 minutes", "9 minutes 59 seconds", "45 seconds". */
export function spokenDuration(totalSeconds: number): string {
  const seconds = Math.max(0, Math.floor(totalSeconds));
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  const unit = (n: number, word: string) => `${n} ${word}${n === 1 ? "" : "s"}`;
  const parts: string[] = [];
  if (h > 0) parts.push(unit(h, "hour"));
  if (m > 0) parts.push(unit(m, "minute"));
  // Seconds only matter in the last ten minutes.
  if (s > 0 && h === 0 && m < 10) parts.push(unit(s, "second"));
  return parts.length > 0 ? parts.join(" ") : "0 seconds";
}

/** A time limit for instructions: "30 min", "1 h 30 min" (whole minutes, rounded up). */
export function formatTimeLimit(seconds: number): string {
  const minutes = Math.max(1, Math.ceil(seconds / 60));
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m} min`;
  return m === 0 ? `${h} h` : `${h} h ${m} min`;
}
