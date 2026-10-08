"use server";

import type { AdminActionState } from "@/components/admin/form-state";
import { curriculumAction } from "@/components/admin/curriculum/route-helpers";
import { createBoard, createCountry, setBoardCountries, updateBoard, updateCountry } from "@/server/cms/curriculum";

/** Exam boards and countries (§3, §53). ADMIN+ (`curriculum.manage` = all); services validate and audit. */

export async function createBoardAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return curriculumAction("admin.curriculum.board.create", formData, "admin", async (actor, input, context) => {
    const { id } = await createBoard(actor, input, context);
    return { data: { id }, message: "Exam board created.", redirectTo: `/admin/boards/${id}`, revalidate: ["/admin/boards"] };
  });
}

export async function updateBoardAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return curriculumAction("admin.curriculum.board.update", formData, "admin", async (actor, input, context) => {
    const { id } = await updateBoard(actor, input, context);
    return { data: { id }, message: "Exam board saved.", revalidate: ["/admin/boards", `/admin/boards/${id}`] };
  });
}

export async function setBoardCountriesAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return curriculumAction("admin.curriculum.board.countries", formData, "admin", async (actor, input, context) => {
    const result = await setBoardCountries(actor, input, context);
    const boardId = typeof input.boardId === "string" ? input.boardId : "";
    return {
      data: result,
      message: result.active === 1 ? "Offered in 1 country." : `Offered in ${result.active} countries.`,
      revalidate: [`/admin/boards/${boardId}`, "/admin/boards"],
    };
  });
}

export async function createCountryAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return curriculumAction("admin.curriculum.country.create", formData, "admin", async (actor, input, context) => {
    const { id } = await createCountry(actor, input, context);
    return { data: { id }, message: "Country created.", redirectTo: `/admin/boards/countries/${id}`, revalidate: ["/admin/boards/countries"] };
  });
}

export async function updateCountryAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return curriculumAction("admin.curriculum.country.update", formData, "admin", async (actor, input, context) => {
    const { id } = await updateCountry(actor, input, context);
    return { data: { id }, message: "Country saved.", revalidate: ["/admin/boards/countries", `/admin/boards/countries/${id}`] };
  });
}
