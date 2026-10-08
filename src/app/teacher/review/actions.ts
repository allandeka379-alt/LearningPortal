"use server";

import type { AdminActionState } from "@/components/admin/form-state";
import { formText, runAdminAction } from "@/components/admin/server-action";
import { markAnswer } from "@/server/teaching/marking";
import { formObject, requireTeacherForAction } from "../_lib/action";

/** Records the teacher's mark for one answer (§22 marking queue). Thin: the service authorizes and re-scores. */
export async function markAnswerAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("teacher.marking.mark", formData, async () => {
    const actor = await requireTeacherForAction();
    const result = await markAnswer(actor, formObject(formData));
    const attemptId = formText(formData, "attemptId") ?? "";
    return {
      data: { percentage: result.percentage, pendingReviewCount: result.pendingReviewCount },
      message:
        result.pendingReviewCount === 0
          ? `Mark saved. All answers are marked${result.percentage === null ? "." : `: ${Math.round(result.percentage * 10) / 10}%.`}`
          : `Mark saved. ${result.pendingReviewCount} still to mark.`,
      revalidate: ["/teacher/review", `/teacher/review/${attemptId}`],
    };
  });
}
