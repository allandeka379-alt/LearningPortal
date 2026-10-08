"use client";

import { useState } from "react";
import { ActionForm, AdminField } from "@/components/admin/ActionForm";
import type { AdminFormAction } from "@/components/admin/form-state";
import { Button } from "@/components/ui/Button";

export interface StudentFeedbackFormProps {
  assignmentId: string;
  classId: string;
  userId: string;
  studentName: string;
  current: string | null;
  action: AdminFormAction<unknown>;
}

/** A short comment to one student about their work (plain text; the student is notified). Collapsed until opened. */
export function StudentFeedbackForm({ assignmentId, classId, userId, studentName, current, action }: StudentFeedbackFormProps) {
  const [open, setOpen] = useState(false);
  if (!open) {
    return (
      <Button variant="ghost" size="sm" onClick={() => setOpen(true)} aria-label={`${current ? "Edit" : "Write"} feedback for ${studentName}`}>
        {current ? "Edit feedback" : "Feedback"}
      </Button>
    );
  }
  return (
    <div className="w-full">
      <ActionForm
        action={action}
        hiddenFields={{ assignmentId, classId, userId }}
        submitLabel="Save feedback"
        successAs="toast"
        secondaryActions={
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Close
          </Button>
        }
      >
        <AdminField name="feedback" label={`Feedback for ${studentName}`} type="textarea" rows={3} maxLength={2000} defaultValue={current} hint="Plain text. The student sees it with their result." />
      </ActionForm>
    </div>
  );
}
