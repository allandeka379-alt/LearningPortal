"use server";

import { z } from "zod";
import type { AdminActionState } from "@/components/admin/form-state";
import { curriculumAction } from "@/components/admin/curriculum/route-helpers";
import type { TopicCommand } from "@/components/admin/curriculum/topic-commands";
import {
  addComponent,
  addObjective,
  addRoute,
  addTopic,
  applyRetag,
  archiveSyllabusVersion,
  correctPublishedSyllabusVersion,
  correctTopicText,
  createSyllabusVersion,
  deleteComponent,
  deleteDraftSyllabusVersion,
  deleteObjective,
  deleteRoute,
  deleteTopic,
  importOutline,
  makeSyllabusVersionCurrent,
  moveObjective,
  moveTopic,
  previewOutline,
  publishSyllabusVersion,
  reparentTopic,
  shiftTopic,
  updateComponent,
  updateDraftSyllabusVersion,
  updateObjective,
  updateRoute,
  updateTopic,
} from "@/server/cms/curriculum";
import { AppError } from "@/server/lib/errors";

/**
 * Syllabus versions, papers, routes, topic trees and re-tagging (§26). Drafting is open to content editors
 * (`curriculum.manage` restricted); publishing, switching and archiving versions and correcting published wording need
 * ADMIN. Each action re-checks its permission, the service validates with Zod, enforces the version rules (the database
 * enforces them too) and audits.
 */

function idOf(input: Record<string, unknown>, key = "id"): string {
  const value = input[key];
  return typeof value === "string" ? value : "";
}

function versionPaths(id: string): string[] {
  return ["/admin/syllabuses", `/admin/syllabuses/${id}`, `/admin/syllabuses/${id}/topics`, `/admin/syllabuses/${id}/retag`];
}

// ---------------------------------------------------------------------------------------------------------------------
// Versions
// ---------------------------------------------------------------------------------------------------------------------

export async function createSyllabusVersionAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return curriculumAction("admin.curriculum.syllabus.create", formData, "draft", async (actor, input, context) => {
    const { id, cloned } = await createSyllabusVersion(actor, input, context);
    return {
      data: { id },
      message: cloned ? `Draft created with ${cloned.topics} topics and ${cloned.objectives} objectives copied.` : "Empty draft created.",
      redirectTo: `/admin/syllabuses/${id}`,
      revalidate: ["/admin/syllabuses", `/admin/subjects/${idOf(input, "subjectId")}`],
    };
  });
}

export async function updateDraftSyllabusAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return curriculumAction("admin.curriculum.syllabus.update", formData, "draft", async (actor, input, context) => {
    const { id } = await updateDraftSyllabusVersion(actor, input, context);
    return { data: { id }, message: "Draft saved.", revalidate: versionPaths(id) };
  });
}

export async function correctPublishedSyllabusAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return curriculumAction("admin.curriculum.syllabus.correct", formData, "admin", async (actor, input, context) => {
    const { id } = await correctPublishedSyllabusVersion(actor, input, context);
    return { data: { id }, message: "Corrections saved.", revalidate: versionPaths(id) };
  });
}

export async function publishSyllabusAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return curriculumAction("admin.curriculum.syllabus.publish", formData, "admin", async (actor, input, context) => {
    const result = await publishSyllabusVersion(actor, input, context);
    const previous = result.previous ? ` The previous version is now ${result.previous.status.toLowerCase()}.` : "";
    return {
      data: result,
      message: `Version published as ${result.status === "CURRENT" ? "the current version" : "an upcoming version"}.${previous}`,
      revalidate: [...versionPaths(result.id), ...(result.previous ? [`/admin/syllabuses/${result.previous.id}`] : [])],
    };
  });
}

export async function makeSyllabusCurrentAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return curriculumAction("admin.curriculum.syllabus.make_current", formData, "admin", async (actor, input, context) => {
    const result = await makeSyllabusVersionCurrent(actor, input, context);
    return {
      data: result,
      message: "This is now the current version for new enrolments.",
      revalidate: [...versionPaths(result.id), ...(result.previous ? [`/admin/syllabuses/${result.previous.id}`] : [])],
    };
  });
}

export async function archiveSyllabusAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return curriculumAction("admin.curriculum.syllabus.archive", formData, "admin", async (actor, input, context) => {
    const result = await archiveSyllabusVersion(actor, input, context);
    return {
      data: result,
      message:
        result.pinnedEnrollments > 0
          ? `Version archived. ${result.pinnedEnrollments} enrolled students keep their content.`
          : "Version archived.",
      revalidate: versionPaths(result.id),
    };
  });
}

export async function deleteDraftSyllabusAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return curriculumAction("admin.curriculum.syllabus.delete_draft", formData, "draft", async (actor, input, context) => {
    const result = await deleteDraftSyllabusVersion(actor, input, context);
    return { data: result, message: "Draft deleted.", redirectTo: `/admin/subjects/${result.subjectId}`, revalidate: ["/admin/syllabuses"] };
  });
}

// ---------------------------------------------------------------------------------------------------------------------
// Papers and routes
// ---------------------------------------------------------------------------------------------------------------------

export async function addComponentAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return curriculumAction("admin.curriculum.component.create", formData, "draft", async (actor, input, context) => {
    const result = await addComponent(actor, input, context);
    return { data: result, message: "Paper added.", revalidate: versionPaths(idOf(input, "syllabusId")) };
  });
}

export async function updateComponentAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return curriculumAction("admin.curriculum.component.update", formData, "draft", async (actor, input, context) => {
    const result = await updateComponent(actor, input, context);
    return { data: result, message: "Paper saved.", revalidate: versionPaths(idOf(input, "syllabusId")) };
  });
}

export async function deleteComponentAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return curriculumAction("admin.curriculum.component.delete", formData, "draft", async (actor, input, context) => {
    const result = await deleteComponent(actor, input, context);
    return { data: result, message: "Paper removed.", revalidate: versionPaths(result.syllabusId) };
  });
}

export async function addRouteAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return curriculumAction("admin.curriculum.route.create", formData, "draft", async (actor, input, context) => {
    const result = await addRoute(actor, input, context);
    return { data: result, message: "Route added.", revalidate: versionPaths(idOf(input, "syllabusId")) };
  });
}

export async function updateRouteAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return curriculumAction("admin.curriculum.route.update", formData, "draft", async (actor, input, context) => {
    const result = await updateRoute(actor, input, context);
    return { data: result, message: "Route saved.", revalidate: versionPaths(idOf(input, "syllabusId")) };
  });
}

export async function deleteRouteAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return curriculumAction("admin.curriculum.route.delete", formData, "draft", async (actor, input, context) => {
    const result = await deleteRoute(actor, input, context);
    return { data: result, message: "Route removed.", revalidate: versionPaths(result.syllabusId) };
  });
}

// ---------------------------------------------------------------------------------------------------------------------
// Re-tagging content into a new version
// ---------------------------------------------------------------------------------------------------------------------

export async function applyRetagAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return curriculumAction("admin.curriculum.syllabus.retag", formData, "draft", async (actor, input, context) => {
    const result = await applyRetag(actor, input, context);
    const total = result.questions + result.lessons + result.flashcards + result.questionObjectives + result.lessonObjectives;
    return {
      data: result,
      message: total === 0 ? "Nothing new to copy: every mapped tag is already in this version." : `Added ${total} tags to this version.`,
      revalidate: versionPaths(idOf(input, "syllabusId")),
    };
  });
}

// ---------------------------------------------------------------------------------------------------------------------
// Topic tree editor commands
// ---------------------------------------------------------------------------------------------------------------------

const commandSchema = z.object({
  type: z.enum([
    "add",
    "update",
    "correct",
    "move",
    "shift",
    "reparent",
    "delete",
    "objective.add",
    "objective.update",
    "objective.move",
    "objective.delete",
    "outline.preview",
    "outline.import",
  ]),
  syllabusId: z.uuid(),
  input: z.record(z.string(), z.unknown()),
});

const COMMAND_MESSAGES: Readonly<Record<TopicCommand["type"], string | null>> = {
  add: "Topic added.",
  update: "Topic saved.",
  correct: "Wording corrected.",
  move: null,
  shift: null,
  reparent: "Topic moved.",
  delete: "Topic deleted.",
  "objective.add": "Objective added.",
  "objective.update": "Objective saved.",
  "objective.move": null,
  "objective.delete": "Objective deleted.",
  "outline.preview": null,
  "outline.import": null,
};

/**
 * One entry point for the client-side topic tree editor (add, edit, reorder, indent/outdent, move, delete, objectives,
 * pasted outlines). Coarse guard: `curriculum.manage` (editors and admins); the services decide the rest (DRAFT-only
 * structure, admin-only corrections of published wording).
 */
export async function runTopicCommand(command: TopicCommand): Promise<AdminActionState> {
  return curriculumAction(`admin.curriculum.topic.${String((command as { type?: unknown })?.type ?? "unknown")}`, null, "draft", async (actor, _input, context) => {
    const parsed = commandSchema.safeParse(command);
    if (!parsed.success) throw new AppError("BAD_REQUEST", "This change could not be understood. Refresh the page and try again.");
    const { type, syllabusId, input } = parsed.data;
    const revalidate = versionPaths(syllabusId);
    let data: unknown;
    let message = COMMAND_MESSAGES[type];
    switch (type) {
      case "add":
        data = await addTopic(actor, input, context);
        break;
      case "update":
        data = await updateTopic(actor, input, context);
        break;
      case "correct":
        data = await correctTopicText(actor, input, context);
        break;
      case "move":
        data = await moveTopic(actor, input, context);
        break;
      case "shift": {
        const result = await shiftTopic(actor, input, context);
        data = result;
        if (result.kindChanges > 0) message = `Moved. ${result.kindChanges} node${result.kindChanges === 1 ? "'s kind was" : "s' kinds were"} adjusted to fit the new place.`;
        break;
      }
      case "reparent": {
        const result = await reparentTopic(actor, input, context);
        data = result;
        if (result.kindChanges > 0) message = `Moved. ${result.kindChanges} node${result.kindChanges === 1 ? "'s kind was" : "s' kinds were"} adjusted to fit the new place.`;
        break;
      }
      case "delete":
        data = await deleteTopic(actor, input, context);
        break;
      case "objective.add":
        data = await addObjective(actor, input, context);
        break;
      case "objective.update":
        data = await updateObjective(actor, input, context);
        break;
      case "objective.move":
        data = await moveObjective(actor, input, context);
        break;
      case "objective.delete":
        data = await deleteObjective(actor, input, context);
        break;
      case "outline.preview":
        return { data: await previewOutline(actor, input, context) };
      case "outline.import": {
        const result = await importOutline(actor, input, context);
        data = result;
        message = `Added ${result.topics} topics and ${result.objectives} objectives.`;
        break;
      }
    }
    return { data, ...(message ? { message } : {}), revalidate };
  });
}
