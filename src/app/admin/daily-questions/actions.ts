"use server";

import type { AdminActionState } from "@/components/admin/form-state";
import { requireAdminAction } from "@/components/admin/guards";
import { adminRequestMeta, formText, runAdminAction } from "@/components/admin/server-action";
import { buildHref } from "@/components/admin/search-params";
import { autoPickDailyQuestion, clearDailyQuestion, scheduleDailyQuestion } from "@/server/cms/daily-questions/service";
import { auditRequestFrom } from "@/server/cms/users/service";

/**
 * Daily-question calendar Server Actions (thin; §46). `content.publish` at scope "all"; the service validates the day,
 * the scope and the question, refuses answered days, and audits every change in the same transaction.
 */

/** Pages whose data changes with the schedule (the public /daily pages also revalidate every 5 minutes). */
const REVALIDATE = ["/admin/daily-questions", "/admin/daily-questions/choose", "/daily"] as const;

async function auditRequest() {
  return auditRequestFrom(await adminRequestMeta());
}

/** The scope fields of a form: `subjectId` "all" (or blank) is the qualification-wide scope. */
function scopeFields(formData: FormData) {
  const subject = formText(formData, "subjectId");
  return {
    date: formText(formData, "date") ?? "",
    qualificationId: formText(formData, "qualificationId") ?? "",
    subjectId: subject === undefined || subject === "all" ? null : subject,
    reason: formText(formData, "reason"),
  };
}

function calendarHref(scope: { qualificationId: string; subjectId: string | null }): string {
  return buildHref("/admin/daily-questions", { qualification: scope.qualificationId, subject: scope.subjectId ?? "all" });
}

export async function scheduleDailyQuestionAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("admin.dailyQuestions.schedule", formData, async () => {
    const actor = await requireAdminAction("content.publish");
    const fields = scopeFields(formData);
    const result = await scheduleDailyQuestion(actor, { ...fields, questionId: formText(formData, "questionId") ?? "" }, await auditRequest());
    return {
      data: result,
      message: result.replaced ? `The question for ${result.date} was changed.` : `The question for ${result.date} is scheduled.`,
      redirectTo: calendarHref(fields),
      revalidate: REVALIDATE,
    };
  });
}

export async function autoPickDailyQuestionAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("admin.dailyQuestions.autoPick", formData, async () => {
    const actor = await requireAdminAction("content.publish");
    const result = await autoPickDailyQuestion(actor, scopeFields(formData), await auditRequest());
    return { data: result, message: `A question was chosen for ${result.date}.`, revalidate: REVALIDATE };
  });
}

export async function clearDailyQuestionAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("admin.dailyQuestions.clear", formData, async () => {
    const actor = await requireAdminAction("content.publish");
    const result = await clearDailyQuestion(actor, { dailyQuestionId: formText(formData, "dailyQuestionId") ?? "", reason: formText(formData, "reason") }, await auditRequest());
    return { data: result, message: `${result.date} is empty again; the nightly job chooses a question the evening before unless you do.`, revalidate: REVALIDATE };
  });
}
