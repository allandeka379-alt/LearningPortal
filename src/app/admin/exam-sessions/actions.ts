"use server";

import type { AdminActionState } from "@/components/admin/form-state";
import { curriculumAction } from "@/components/admin/curriculum/route-helpers";
import { confirmExamSessionDates, createExamSession, setExamSessionStatus, updateExamSession } from "@/server/cms/curriculum";

/**
 * Exam sessions (§17). Editors create and edit DRAFT sessions; publishing, cancelling, archiving, editing published
 * sessions and confirming dates need ADMIN (re-checked in the service). Services validate and audit.
 */

const STATUS_MESSAGE: Readonly<Record<string, string>> = {
  PUBLISHED: "Session published: it now appears in onboarding and countdowns.",
  DRAFT: "Session moved back to draft.",
  CANCELLED: "Session cancelled.",
  ARCHIVED: "Session archived.",
};

export async function createExamSessionAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return curriculumAction("admin.curriculum.exam_session.create", formData, "draft", async (actor, input, context) => {
    const { id } = await createExamSession(actor, input, context);
    return { data: { id }, message: "Draft session created.", redirectTo: `/admin/exam-sessions/${id}`, revalidate: ["/admin/exam-sessions"] };
  });
}

export async function updateExamSessionAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return curriculumAction("admin.curriculum.exam_session.update", formData, "draft", async (actor, input, context) => {
    const result = await updateExamSession(actor, input, context);
    return {
      data: result,
      message: result.becameProvisional ? "Saved. The dates changed, so they are provisional again until re-confirmed." : "Session saved.",
      revalidate: ["/admin/exam-sessions", `/admin/exam-sessions/${result.id}`],
    };
  });
}

export async function setExamSessionStatusAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return curriculumAction("admin.curriculum.exam_session.status", formData, "admin", async (actor, input, context) => {
    const result = await setExamSessionStatus(actor, input, context);
    return { data: result, message: STATUS_MESSAGE[result.status] ?? "Status changed.", revalidate: ["/admin/exam-sessions", `/admin/exam-sessions/${result.id}`] };
  });
}

export async function confirmExamSessionDatesAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return curriculumAction("admin.curriculum.exam_session.confirm", formData, "admin", async (actor, input, context) => {
    const result = await confirmExamSessionDates(actor, input, context);
    return { data: result, message: "Dates confirmed against the official timetable.", revalidate: ["/admin/exam-sessions", `/admin/exam-sessions/${result.id}`] };
  });
}
