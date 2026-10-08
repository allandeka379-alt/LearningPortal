import Link from "next/link";
import { formatDateTime } from "@/components/admin/format";
import { RichContent } from "@/components/content/RichContent";
import { ASSIGNMENT_TYPE_LABELS, percentText, STUDENT_STATE_LABELS } from "@/components/teacher/labels";
import { Badge } from "@/components/ui/Badge";
import type { MyAssignment } from "@/server/teaching/student";
import { startAssignmentAction } from "../actions";
import { StudentActionButton } from "./StudentActionButton";

const KIND_LABELS: Record<string, string> = {
  QUIZ: "Quiz",
  TOPIC_TEST: "Topic test",
  CHAPTER_TEST: "Chapter test",
  SUBJECT_TEST: "Subject test",
  TIMED_EXAM: "Timed exam",
  MOCK_EXAM: "Mock exam",
};

function what(a: MyAssignment): string {
  if (a.lesson) return `Read: ${a.lesson.title}`;
  if (a.assessment) return `${KIND_LABELS[a.assessment.kind] ?? "Test"} · ${a.assessment.totalMarks} marks${a.assessment.timeLimitMinutes ? ` · ${a.assessment.timeLimitMinutes} min` : ""}`;
  if (a.practice) return `${a.practice.questionCount} practice questions${a.practice.timeLimitMinutes ? ` · ${a.practice.timeLimitMinutes} min` : ""}`;
  return ASSIGNMENT_TYPE_LABELS[a.type];
}

function startLabel(a: MyAssignment): string {
  if (a.type === "LESSON") return a.view.state === "SUBMITTED" || a.view.state === "LATE" ? "Read again" : "Open lesson";
  if (a.view.state === "IN_PROGRESS") return "Continue";
  if (a.view.state === "SUBMITTED" || a.view.state === "LATE") return "Try again";
  return "Start";
}

/**
 * One piece of assigned work for the student: what it is, the due date and late flags, the state, the score (marked
 * as provisional while a teacher still has answers to mark), the teacher's feedback and the start button.
 */
export function AssignmentCard({ assignment: a, timeZone, showClass = false, headingLevel = 3 }: { assignment: MyAssignment; timeZone: string; showClass?: boolean; headingLevel?: 2 | 3 }) {
  const state = STUDENT_STATE_LABELS[a.view.state];
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const attemptsLeft = a.maxAttempts === null ? null : Math.max(0, a.maxAttempts - a.attemptsCount);
  const canStart = a.view.canWork && (attemptsLeft === null || attemptsLeft > 0 || a.view.state === "IN_PROGRESS" || a.type === "LESSON");
  return (
    <article className="space-y-3 rounded-card border border-border bg-surface p-4" aria-labelledby={`a-${a.id}`}>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0">
          <Heading id={`a-${a.id}`} className="font-semibold text-text">
            {a.title}
          </Heading>
          <p className="text-sm text-muted">
            {showClass && (
              <>
                <Link href={`/app/classes/${a.classId}`} className="underline-offset-4 hover:underline">
                  {a.className}
                </Link>
                {" · "}
              </>
            )}
            {what(a)}
          </p>
        </div>
        <span className="flex flex-wrap gap-1">
          <Badge tone={state.tone}>{state.label}</Badge>
          {a.view.dueSoon && <Badge tone="warning">Due soon</Badge>}
        </span>
      </div>
      <p className="text-sm text-text">
        {a.dueAt ? <>Due {formatDateTime(a.dueAt, timeZone)}</> : "No due date"}
        {a.closesAt && <span className="text-muted"> · closes {formatDateTime(a.closesAt, timeZone)}</span>}
      </p>
      {a.instructionsHtml && (a.view.state === "TO_DO" || a.view.state === "IN_PROGRESS" || a.view.state === "OVERDUE") && (
        <details className="text-sm">
          <summary className="cursor-pointer font-medium text-text">Instructions</summary>
          <RichContent html={a.instructionsHtml} className="mt-2" />
        </details>
      )}
      {a.scorePercent !== null && (
        <p className="text-sm text-text">
          Score: <strong>{percentText(a.scorePercent)}</strong>
          {a.provisional && <span className="text-muted"> (provisional: your teacher is still marking some answers)</span>}
          {a.resultsHref && (
            <>
              {" · "}
              <Link href={a.resultsHref} className="font-semibold text-primary underline-offset-4 hover:underline">
                See results
              </Link>
            </>
          )}
        </p>
      )}
      {a.teacherFeedback && (
        <blockquote className="rounded-card border-l-4 border-l-primary bg-subtle p-3 text-sm text-text">
          <span className="block text-xs font-semibold text-muted">Your teacher&apos;s feedback</span>
          {a.teacherFeedback}
        </blockquote>
      )}
      {attemptsLeft !== null && a.type !== "LESSON" && <p className="text-xs text-muted">{attemptsLeft === 0 ? "No attempts left." : `${attemptsLeft} ${attemptsLeft === 1 ? "attempt" : "attempts"} left.`}</p>}
      {canStart && (
        <StudentActionButton action={startAssignmentAction} fields={{ assignmentId: a.id }} variant={a.view.state === "SUBMITTED" || a.view.state === "LATE" ? "outline" : "primary"} pendingLabel="Opening…" ariaLabel={`${startLabel(a)}: ${a.title}`}>
          {startLabel(a)}
        </StudentActionButton>
      )}
    </article>
  );
}
