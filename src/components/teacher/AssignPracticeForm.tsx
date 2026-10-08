"use client";

import { ActionForm, AdminField } from "@/components/admin/ActionForm";
import type { AdminFormAction } from "@/components/admin/form-state";

export interface AssignPracticeFormProps {
  classId: string;
  topicId: string;
  topicName: string;
  /** Students currently weak on the topic (offers the "only them" option when > 0). */
  weakStudents: number;
  action: AdminFormAction<unknown>;
}

/**
 * One-click "assign practice on this topic" (§22 weak topics): adaptive practice due in a week, for the whole class or
 * only the students who are weak on it. The new assignment opens after it is set.
 */
export function AssignPracticeForm({ classId, topicId, topicName, weakStudents, action }: AssignPracticeFormProps) {
  return (
    <ActionForm
      action={action}
      hiddenFields={{ classId, topicId }}
      submitLabel={`Assign practice on ${topicName}`}
      pendingLabel="Setting practice…"
      submitVariant="secondary"
      columns="two"
    >
      <AdminField
        name="audience"
        label="For"
        type="select"
        defaultValue="CLASS"
        options={[
          { value: "CLASS", label: "The whole class" },
          ...(weakStudents > 0 ? [{ value: "WEAK_STUDENTS", label: `Only the ${weakStudents} weak ${weakStudents === 1 ? "student" : "students"}` }] : []),
        ]}
      />
      <AdminField name="questionCount" label="Questions" type="number" defaultValue={10} min={1} max={60} />
    </ActionForm>
  );
}
