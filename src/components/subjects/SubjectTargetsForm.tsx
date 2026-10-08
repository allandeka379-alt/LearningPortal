"use client";

import { useActionState } from "react";
import { fieldErrorsOf, type FormAction } from "@/components/student/action-state";
import { FormFeedback } from "@/components/student/FormFeedback";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { Select, type SelectOption } from "@/components/ui/Select";

export interface SubjectTargetsFormProps {
  subjectId: string;
  subjectName: string;
  /** PUBLISHED sessions of the subject's qualification (labels from data, provisional dates marked). */
  sessions: readonly SelectOption[];
  /** Grade labels of the qualification's scheme, best first; empty when no scheme is configured. */
  grades: readonly string[];
  current: { targetExamSessionId: string | null; targetGrade: string | null };
  action: FormAction;
}

/**
 * Per-subject targets (§5 "target examination", "target grade"; §17 countdown): which examination session the
 * student is sitting and the grade they are aiming for. Both are optional ("Not set").
 */
export function SubjectTargetsForm({ subjectId, subjectName, sessions, grades, current, action }: SubjectTargetsFormProps) {
  const [state, formAction, pending] = useActionState(action, null);
  return (
    <form action={formAction} className="space-y-4" aria-label={`Targets for ${subjectName}`}>
      <input type="hidden" name="subjectId" value={subjectId} />
      <Field
        label="Target examination"
        hint={sessions.length === 0 ? "No examination sessions are published for this qualification yet." : undefined}
        error={fieldErrorsOf(state, "targetExamSessionId")}
      >
        <Select name="targetExamSessionId" defaultValue={current.targetExamSessionId ?? ""} disabled={sessions.length === 0}>
          <option value="">Not set</option>
          {sessions.map((session) => (
            <option key={session.value} value={session.value}>
              {session.label}
            </option>
          ))}
        </Select>
      </Field>
      {grades.length > 0 && (
        <Field label="Target grade" optional error={fieldErrorsOf(state, "targetGrade")}>
          <Select name="targetGrade" defaultValue={current.targetGrade ?? ""}>
            <option value="">Not set</option>
            {grades.map((grade) => (
              <option key={grade} value={grade}>
                {grade}
              </option>
            ))}
          </Select>
        </Field>
      )}
      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" variant="secondary" loading={pending} loadingText="Saving…">
          Save targets
        </Button>
        <FormFeedback state={state} />
      </div>
    </form>
  );
}
