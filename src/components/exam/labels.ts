/**
 * Plain-language labels for the exams pages (catalogue, instructions, history, results). Pure and isomorphic; every
 * number shown comes from the server (CLAUDE.md rule 6), these helpers only put it into words.
 */
import { formatCount, formatPercent } from "@/lib/format";
import { formatTimeLimit } from "./exam-model";

/** "30 min", "2 papers · 2 h 30 min in total", "No time limit". */
export function durationText(timeLimitSeconds: number | null, timedPaperCount: number): string {
  if (timeLimitSeconds === null) return "No time limit";
  if (timedPaperCount > 1) return `${timedPaperCount} papers · ${formatTimeLimit(timeLimitSeconds)} in total`;
  return formatTimeLimit(timeLimitSeconds);
}

export type AttemptStatusTone = "neutral" | "info" | "warning";

/** Status of a past attempt for history rows (null = nothing to add: an ordinary marked attempt). */
export function attemptStatusLabel(status: string, submitReason: string | null, isProvisional: boolean): { text: string; tone: AttemptStatusTone } | null {
  if (status === "IN_PROGRESS") return { text: "In progress", tone: "info" };
  if (status === "EXPIRED") return { text: "Time ran out, nothing answered", tone: "neutral" };
  if (status === "ABANDONED") return { text: "Not finished", tone: "neutral" };
  if (status === "SUBMITTED" || status === "AWAITING_MARKING" || isProvisional) return { text: "Marking in progress", tone: "warning" };
  if (submitReason === "TIME_EXPIRED") return { text: "Submitted when time ran out", tone: "neutral" };
  return null;
}

/** §12 headline: "You scored 68%." — or the provisional / empty variants. */
export function scoreHeadline(score: { percentage: number | null; isProvisional: boolean } | null, nothingAnswered: boolean): string {
  if (nothingAnswered || !score) return "No answers were saved in this attempt.";
  if (score.percentage === null) return "Your answers are being marked.";
  const value = formatPercent(score.percentage);
  return score.isProvisional ? `Your score so far is ${value}.` : `You scored ${value}.`;
}

/** "34 of 50 marks" (+ the marks still being marked). */
export function marksLine(marksAwarded: number, totalMarks: number, pendingMarks: number): string {
  const base = `${marksAwarded} of ${formatCount(totalMarks, "mark")}`;
  return pendingMarks > 0 ? `${base} · ${formatCount(pendingMarks, "mark")} still being marked` : base;
}

/** Why the attempt closed, when that matters to the student. */
export function submitReasonNote(submitReason: string | null): string | null {
  switch (submitReason) {
    case "TIME_EXPIRED":
      return "Time ran out, so your saved answers were submitted automatically.";
    case "IDLE_TIMEOUT":
      return "This attempt was closed after a long time without activity. Your saved answers were marked.";
    case "ASSIGNMENT_CLOSED":
      return "Your teacher closed this assignment, so your saved answers were submitted.";
    default:
      return null;
  }
}

export interface RecommendationLike {
  kind: "LESSON" | "PRACTICE" | "TOPIC_TEST" | "FLASHCARDS";
  topicName: string | null;
  lessonTitle: string | null;
  questionCount: number | null;
}

/** §12 "Probability → Lesson 4", "Statistics → Practice test": the topic, then what to do. */
export function recommendationTarget(rec: RecommendationLike): { topic: string; action: string } {
  const topic = rec.topicName ?? "This topic";
  switch (rec.kind) {
    case "LESSON":
      return { topic, action: rec.lessonTitle ? `Lesson: ${rec.lessonTitle}` : "Lesson" };
    case "PRACTICE":
      return { topic, action: rec.questionCount ? `Practice test (${formatCount(rec.questionCount, "question")})` : "Practice test" };
    case "TOPIC_TEST":
      return { topic, action: "Topic test" };
    case "FLASHCARDS":
      return { topic, action: "Flashcards" };
  }
}
