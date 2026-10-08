"use server";

import type { AdminActionState } from "@/components/admin/form-state";
import { curriculumAction } from "@/components/admin/curriculum/route-helpers";
import { createLevel, createQualification, createYearGroup, updateLevel, updateQualification, updateYearGroup } from "@/server/cms/curriculum";

/** Qualifications, cross-board levels and year groups (§3, §5). ADMIN+; services validate and audit. */

export async function createQualificationAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return curriculumAction("admin.curriculum.qualification.create", formData, "admin", async (actor, input, context) => {
    const { id } = await createQualification(actor, input, context);
    return { data: { id }, message: "Qualification created.", redirectTo: `/admin/qualifications/${id}`, revalidate: ["/admin/qualifications"] };
  });
}

export async function updateQualificationAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return curriculumAction("admin.curriculum.qualification.update", formData, "admin", async (actor, input, context) => {
    const { id } = await updateQualification(actor, input, context);
    return { data: { id }, message: "Qualification saved.", revalidate: ["/admin/qualifications", `/admin/qualifications/${id}`] };
  });
}

export async function createLevelAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return curriculumAction("admin.curriculum.level.create", formData, "admin", async (actor, input, context) => {
    const result = await createLevel(actor, input, context);
    return { data: result, message: "Level created.", revalidate: ["/admin/qualifications/levels"] };
  });
}

export async function updateLevelAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return curriculumAction("admin.curriculum.level.update", formData, "admin", async (actor, input, context) => {
    const result = await updateLevel(actor, input, context);
    return { data: result, message: "Level saved.", revalidate: ["/admin/qualifications/levels"] };
  });
}

export async function createYearGroupAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return curriculumAction("admin.curriculum.year_group.create", formData, "admin", async (actor, input, context) => {
    const result = await createYearGroup(actor, input, context);
    return { data: result, message: "Year group created.", revalidate: ["/admin/qualifications/year-groups"] };
  });
}

export async function updateYearGroupAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return curriculumAction("admin.curriculum.year_group.update", formData, "admin", async (actor, input, context) => {
    const result = await updateYearGroup(actor, input, context);
    return { data: result, message: "Year group saved.", revalidate: ["/admin/qualifications/year-groups"] };
  });
}
