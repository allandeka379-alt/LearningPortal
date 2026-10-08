"use server";

import type { AdminActionState } from "@/components/admin/form-state";
import { curriculumAction } from "@/components/admin/curriculum/route-helpers";
import { createCategory, createSubject, updateCategory, updateSubject } from "@/server/cms/curriculum";

/** Subjects and subject categories (§4). ADMIN+; services validate (incl. the verified rule) and audit. */

export async function createSubjectAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return curriculumAction("admin.curriculum.subject.create", formData, "admin", async (actor, input, context) => {
    const { id } = await createSubject(actor, input, context);
    return { data: { id }, message: "Subject created.", redirectTo: `/admin/subjects/${id}`, revalidate: ["/admin/subjects"] };
  });
}

export async function updateSubjectAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return curriculumAction("admin.curriculum.subject.update", formData, "admin", async (actor, input, context) => {
    const { id } = await updateSubject(actor, input, context);
    return { data: { id }, message: "Subject saved.", revalidate: ["/admin/subjects", `/admin/subjects/${id}`] };
  });
}

export async function createCategoryAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return curriculumAction("admin.curriculum.category.create", formData, "admin", async (actor, input, context) => {
    const result = await createCategory(actor, input, context);
    return { data: result, message: "Category created.", revalidate: ["/admin/subjects/categories"] };
  });
}

export async function updateCategoryAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return curriculumAction("admin.curriculum.category.update", formData, "admin", async (actor, input, context) => {
    const result = await updateCategory(actor, input, context);
    return { data: result, message: "Category saved.", revalidate: ["/admin/subjects/categories"] };
  });
}
