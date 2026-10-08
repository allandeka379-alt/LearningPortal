"use server";

import type { AdminActionState } from "@/components/admin/form-state";
import { formText, runAdminAction } from "@/components/admin/server-action";
import type { MarkdownPreview } from "@/components/admin/questions/editor/MarkdownField";
import { safeAction, type ActionResult } from "@/server/lib/errors";
import {
  archiveTeacherTest,
  createTeacherQuestion,
  createTeacherTest,
  previewTeacherMarkdown,
  publishTeacherTest,
  searchBuilderQuestions,
  updateTeacherTest,
  type BuilderQuestion,
} from "@/server/teaching/test-builder";
import { formObject, requireTeacherForAction } from "../_lib/action";

/**
 * Test builder Server Actions (§22 "create tests"). Thin: re-check the TEACHER role, pass the raw input to the
 * test-builder service (validation, tenant checks, the shared publish helper) and return an ActionResult.
 */

const LIST = "/teacher/assessments";

/** "school:<uuid>" | "tutor" from the owner picker. */
function ownerFrom(key: string | undefined): unknown {
  if (key === "tutor") return { kind: "tutor" };
  if (key?.startsWith("school:")) return { kind: "school", schoolId: key.slice("school:".length) };
  return null;
}

export async function createTestAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState<{ id: string }>> {
  return runAdminAction("teacher.test.create", formData, async () => {
    const actor = await requireTeacherForAction();
    const fields = formObject(formData);
    const { id } = await createTeacherTest(actor, { ...fields, owner: ownerFrom(formText(formData, "owner")) });
    return { data: { id }, message: "Draft test created. Add questions next.", redirectTo: `${LIST}/${id}`, revalidate: [LIST] };
  });
}

export async function publishTestAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("teacher.test.publish", formData, async () => {
    const actor = await requireTeacherForAction();
    const assessmentId = formText(formData, "assessmentId") ?? "";
    await publishTeacherTest(actor, { assessmentId });
    return { data: null, message: "Test published. You can now set it to your classes.", revalidate: [LIST, `${LIST}/${assessmentId}`] };
  });
}

export async function archiveTestAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("teacher.test.archive", formData, async () => {
    const actor = await requireTeacherForAction();
    const { deleted } = await archiveTeacherTest(actor, { assessmentId: formText(formData, "assessmentId") ?? "" });
    return { data: null, message: deleted ? "Draft deleted." : "Test archived.", redirectTo: LIST, revalidate: [LIST] };
  });
}

const save = safeAction(
  async (input: unknown) => {
    const actor = await requireTeacherForAction();
    return updateTeacherTest(actor, input);
  },
  { operation: "teacher.test.save" },
);
const search = safeAction(
  async (input: unknown) => {
    const actor = await requireTeacherForAction();
    return searchBuilderQuestions(actor, input);
  },
  { operation: "teacher.test.search" },
);
const writeQuestion = safeAction(
  async (input: unknown) => {
    const actor = await requireTeacherForAction();
    return createTeacherQuestion(actor, input);
  },
  { operation: "teacher.test.question" },
);
const preview = safeAction(
  async (input: { source: string; inline: boolean }) => {
    const actor = await requireTeacherForAction();
    return previewTeacherMarkdown(actor, input);
  },
  { operation: "teacher.test.preview" },
);

/** Saves a draft test's details and question list. */
export async function saveTestAction(input: unknown): Promise<ActionResult<{ id: string }>> {
  return save(input);
}

/** Questions for the builder's picker (bank or own). */
export async function searchQuestionsAction(input: unknown): Promise<ActionResult<BuilderQuestion[]>> {
  return search(input);
}

/** Writes and publishes a question in the test owner's private bank. */
export async function createQuestionAction(input: unknown): Promise<ActionResult<{ id: string; marks: number }>> {
  return writeQuestion(input);
}

/** Live preview of authored markdown with the student pipeline. */
export async function previewMarkdownAction(input: { source: string; inline: boolean }): Promise<ActionResult<MarkdownPreview>> {
  return preview(input);
}
