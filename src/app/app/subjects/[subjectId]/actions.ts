"use server";

import type { FormActionState } from "@/components/student/action-state";
import { formString, runStudentAction, studentRequestMeta } from "@/components/student/server-action";
import { requireOnboardedStudentForAction } from "@/server/auth/guards";
import { moveEnrollmentToCurrentSyllabus } from "@/server/enrollment";

/**
 * Subject page actions (§26). Thin: guard, read the form, call the enrollment service (which validates, moves the pin
 * in one audited transaction and recomputes progress), refresh the student area.
 */

/** Moves this subject to the subject's CURRENT syllabus version ("A newer syllabus is available"). */
export async function moveSyllabusVersionAction(_state: FormActionState, formData: FormData): Promise<FormActionState> {
  return runStudentAction("subjects.syllabus_move", async () => {
    const actor = await requireOnboardedStudentForAction();
    const result = await moveEnrollmentToCurrentSyllabus(
      actor,
      {
        subjectId: formString(formData, "subjectId") ?? "",
        fromSyllabusId: formString(formData, "fromSyllabusId") ?? "",
        toSyllabusId: formString(formData, "toSyllabusId") ?? "",
      },
      { request: await studentRequestMeta() },
    );
    const carried = result.carriedTopics === 0 ? "" : ` Progress in ${result.carriedTopics} ${result.carriedTopics === 1 ? "topic" : "topics"} carried over.`;
    return { message: `You are now on syllabus version ${result.to.versionLabel}.${carried}`, revalidateLayout: true };
  });
}
