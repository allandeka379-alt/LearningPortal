import type { AssignmentType, MarkingStatus } from "@/generated/prisma/enums";
import type { BadgeTone } from "@/components/ui/Badge";
import type { AssignmentWindow, StudentAssignmentState } from "@/server/teaching/core";

/** Display labels and badge tones for the teacher area and the student class pages (isomorphic). */

export const ASSIGNMENT_TYPE_LABELS: Readonly<Record<AssignmentType, string>> = {
  LESSON: "Lesson",
  ASSESSMENT: "Test",
  PRACTICE: "Practice",
};

export const WINDOW_LABELS: Readonly<Record<AssignmentWindow, { label: string; tone: BadgeTone }>> = {
  DRAFT: { label: "Draft", tone: "neutral" },
  SCHEDULED: { label: "Scheduled", tone: "info" },
  OPEN: { label: "Open", tone: "success" },
  PAST_DUE: { label: "Past due (late work accepted)", tone: "warning" },
  CLOSED: { label: "Closed", tone: "neutral" },
  ARCHIVED: { label: "Archived", tone: "neutral" },
};

export const STUDENT_STATE_LABELS: Readonly<Record<StudentAssignmentState, { label: string; tone: BadgeTone }>> = {
  TO_DO: { label: "To do", tone: "neutral" },
  IN_PROGRESS: { label: "In progress", tone: "info" },
  OVERDUE: { label: "Overdue", tone: "warning" },
  SUBMITTED: { label: "Handed in", tone: "success" },
  LATE: { label: "Handed in late", tone: "warning" },
  MISSED: { label: "Missed", tone: "danger" },
  EXCUSED: { label: "Excused", tone: "neutral" },
};

export const MARKING_STATUS_LABELS: Readonly<Record<MarkingStatus, string>> = {
  PENDING: "Waiting for marking",
  AUTO_MARKED: "Marked automatically",
  AI_MARKED: "AI-marked",
  TEACHER_MARKED: "Marked by a teacher",
  SELF_ASSESSED: "Self-assessed",
  NEEDS_REVIEW: "Needs your marking",
  UNANSWERED: "Not answered",
};

export const DIFFICULTY_CHOICE_LABELS: Readonly<Record<"EASY" | "MEDIUM" | "HARD" | "ADAPTIVE", string>> = {
  ADAPTIVE: "Adaptive (matches each student)",
  EASY: "Easy",
  MEDIUM: "Medium",
  HARD: "Hard",
};

/** "45%" or an honest dash. */
export function percentText(value: number | null | undefined): string {
  return value === null || value === undefined ? "—" : `${Math.round(value * 10) / 10}%`;
}
