"use server";

import type { AdminActionState } from "@/components/admin/form-state";
import { curriculumAction } from "@/components/admin/curriculum/route-helpers";
import { createGradeScheme, updateGradeScheme } from "@/server/cms/curriculum";

/**
 * Grade schemes (§12 estimates). Editors draft inactive schemes; activating, making default and editing live schemes
 * need ADMIN (checked in the service). Bands that graded attempts are frozen: the service creates a new version.
 */

export async function createGradeSchemeAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return curriculumAction("admin.curriculum.grade_scheme.create", formData, "draft", async (actor, input, context) => {
    const result = await createGradeScheme(actor, input, context);
    return { data: result, message: "Grade scheme created.", redirectTo: `/admin/grade-schemes/${result.id}`, revalidate: ["/admin/grade-schemes"] };
  });
}

export async function updateGradeSchemeAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return curriculumAction("admin.curriculum.grade_scheme.update", formData, "draft", async (actor, input, context) => {
    const result = await updateGradeScheme(actor, input, context);
    if (result.versioned) {
      return {
        data: result,
        message: `The bands had graded students' attempts, so version ${result.version} was created and the old version kept for those results.${
          result.assessmentsOnPrevious > 0 ? ` ${result.assessmentsOnPrevious} assessments still name the old version.` : ""
        }`,
        redirectTo: `/admin/grade-schemes/${result.id}`,
        revalidate: ["/admin/grade-schemes", `/admin/grade-schemes/${result.previousId}`],
      };
    }
    return { data: result, message: "Grade scheme saved.", revalidate: ["/admin/grade-schemes", `/admin/grade-schemes/${result.id}`] };
  });
}
