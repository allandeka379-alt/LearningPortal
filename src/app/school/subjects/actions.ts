"use server";

import { formList, runAdminAction } from "@/components/admin/server-action";
import type { AdminActionState } from "@/components/admin/form-state";
import { addSchoolSubjects, removeSchoolSubjects } from "@/server/schools/subjects";
import { auditRequest, requireSchoolAction } from "../_lib/context";

export async function addSubjectsAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("school.subjects.add", formData, async () => {
    const { actor, schoolId } = await requireSchoolAction();
    const result = await addSchoolSubjects(actor, { schoolId, subjectIds: formList(formData, "subjectIds") }, await auditRequest());
    return {
      data: result,
      message: result.added > 0 ? `${result.added} subject${result.added === 1 ? "" : "s"} added.` : "Those subjects were already offered.",
      revalidate: ["/school/subjects", "/school/classes", "/school"],
    };
  });
}

export async function removeSubjectAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("school.subjects.remove", formData, async () => {
    const { actor, schoolId } = await requireSchoolAction();
    await removeSchoolSubjects(actor, { schoolId, subjectIds: formList(formData, "subjectIds") }, await auditRequest());
    return { data: null, message: "Subject removed from your school's offer.", revalidate: ["/school/subjects", "/school/classes", "/school"] };
  });
}
