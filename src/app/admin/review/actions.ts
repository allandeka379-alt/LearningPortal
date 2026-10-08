"use server";

import type { AdminActionState } from "@/components/admin/form-state";
import { requireAdminAction } from "@/components/admin/guards";
import { adminRequestMeta, formText, runAdminAction } from "@/components/admin/server-action";
import { editorHref, reviewHref, type ReviewableType } from "@/server/cms/review/labels";
import {
  approveContent,
  archiveContent,
  discardContentDraftCopy,
  publishContent,
  reopenContent,
  requestContentChanges,
  startEditingPublished,
  submitContent,
} from "@/server/cms/review/workflow";
import { auditRequestFrom } from "@/server/cms/users/service";

/**
 * Editorial workflow Server Actions shared by the lesson / flashcard editors and the review queue (thin: permission
 * re-check with the *ForAction guard, then the workflow service, which validates, calls the shared publish helper and
 * audits). Each returns an AdminActionState for `ConfirmAction`.
 */

async function context() {
  return { request: auditRequestFrom(await adminRequestMeta()) };
}

function ref(formData: FormData) {
  return { entityType: formText(formData, "entityType"), id: formText(formData, "id") };
}

/** Pages showing an item: its editor (lessons, flashcards), its review page and the queue / lists. */
function pathsFor(entityType: string | undefined, ...ids: (string | null | undefined)[]): string[] {
  const paths = ["/admin/review", "/admin"];
  const type = entityType as ReviewableType | undefined;
  if (type === "LESSON") paths.push("/admin/lessons");
  if (type === "FLASHCARD") paths.push("/admin/flashcards");
  for (const id of ids) {
    if (!id || !type) continue;
    paths.push(reviewHref(type, id), `${reviewHref(type, id)}/revisions`);
    if (type === "LESSON" || type === "FLASHCARD") paths.push(editorHref(type, id));
  }
  return paths;
}

export async function submitForReviewAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("admin.review.submit", formData, async () => {
    const actor = await requireAdminAction("content.draft");
    const input = ref(formData);
    const result = await submitContent(actor, input, await context());
    return { data: result, message: "Submitted for review.", revalidate: pathsFor(input.entityType, input.id) };
  });
}

export async function requestChangesAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("admin.review.requestChanges", formData, async () => {
    const actor = await requireAdminAction("content.review");
    const input = ref(formData);
    const result = await requestContentChanges(actor, { ...input, notes: formText(formData, "notes") ?? "" }, await context());
    return { data: result, message: "Sent back to draft with your notes.", revalidate: pathsFor(input.entityType, input.id) };
  });
}

export async function approveAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("admin.review.approve", formData, async () => {
    const actor = await requireAdminAction("content.review");
    const input = ref(formData);
    const result = await approveContent(actor, { ...input, notes: formText(formData, "notes") ?? "" }, await context());
    return { data: result, message: "Approved. It can now be published.", revalidate: pathsFor(input.entityType, input.id) };
  });
}

export async function publishAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("admin.review.publish", formData, async () => {
    const actor = await requireAdminAction("content.publish");
    const input = ref(formData);
    const result = await publishContent(actor, { ...input, changeNote: formText(formData, "changeNote") ?? "" }, await context());
    const type = input.entityType as ReviewableType;
    // A merged draft copy no longer exists: continue on the live item.
    const redirectTo = result.mergedDraftId ? (type === "LESSON" || type === "FLASHCARD" ? editorHref(type, result.id) : reviewHref(type, result.id)) : undefined;
    return {
      data: result,
      message: result.changed ? `Published (revision ${result.revision}).` : "Nothing had changed: the draft copy was discarded.",
      ...(redirectTo ? { redirectTo } : {}),
      revalidate: pathsFor(input.entityType, input.id, result.id),
    };
  });
}

export async function archiveAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("admin.review.archive", formData, async () => {
    const actor = await requireAdminAction("content.archive");
    const input = ref(formData);
    const result = await archiveContent(actor, input, await context());
    return { data: result, message: "Archived. Students no longer see it.", revalidate: pathsFor(input.entityType, input.id) };
  });
}

export async function reopenAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("admin.review.reopen", formData, async () => {
    const actor = await requireAdminAction("content.archive");
    const input = ref(formData);
    const result = await reopenContent(actor, input, await context());
    return { data: result, message: `Restored to draft (revision ${result.revision}). It goes through review again.`, revalidate: pathsFor(input.entityType, input.id) };
  });
}

export async function startEditAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("admin.review.startEdit", formData, async () => {
    const actor = await requireAdminAction("content.draft");
    const input = ref(formData);
    const copy = await startEditingPublished(actor, input, await context());
    const type = input.entityType as ReviewableType;
    return {
      data: copy,
      message: copy.created ? "Draft copy created. Students keep seeing the published version." : "Opening the existing draft copy.",
      redirectTo: type === "LESSON" || type === "FLASHCARD" ? editorHref(type, copy.id) : reviewHref(type, copy.id),
      revalidate: pathsFor(input.entityType, input.id, copy.id),
    };
  });
}

export async function discardDraftAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("admin.review.discard", formData, async () => {
    const actor = await requireAdminAction("content.draft");
    const input = ref(formData);
    const result = await discardContentDraftCopy(actor, input, await context());
    const type = input.entityType as ReviewableType;
    return {
      data: result,
      message: "Draft copy discarded.",
      redirectTo: type === "LESSON" || type === "FLASHCARD" ? editorHref(type, result.liveId) : reviewHref(type, result.liveId),
      revalidate: pathsFor(input.entityType, input.id, result.liveId),
    };
  });
}
