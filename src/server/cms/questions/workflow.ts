import "server-only";
import { z } from "zod";
import type { ContentStatus } from "@/generated/prisma/client";
import {
  approve,
  archive,
  createDraftCopyForEdit,
  discardDraftCopy,
  publish,
  reopenArchived,
  requestChanges,
  submitForReview,
  type DraftCopy,
  type PublishResult,
  type WorkflowResult,
} from "@/server/content/publish";
import type { DbClient } from "@/server/db";
import type { Tx } from "@/server/lib/db-context";
import { AppError, type FieldErrors } from "@/server/lib/errors";
import { infraActor } from "@/server/cms/users/access";
import {
  assertCanArchive,
  assertCanDraft,
  assertCanPublish,
  assertCanReview,
  auditCms,
  CMS_CONTENT_AUDIT,
  CMS_CONTENT_OPERATIONS,
  enqueueReindex,
  inTransaction,
  parseInput,
  uuidSchema,
  type CmsActor,
  type CmsContext,
} from "./context";
import { clearMediaUsage } from "./media";

/**
 * The editorial workflow (§41, §42; CLAUDE.md "Database rules") for the three content types of this workstream:
 * questions, assessments and study packs. Every step re-checks the actor's permission, refuses school / tutor content
 * (the CMS edits the platform bank only), delegates the transition to THE shared publish helper
 * (src/server/content/publish.ts: four-eyes, human approver for AI drafts, publish merge, revision snapshot) and writes
 * the audit entry in the same transaction. Type-specific readiness checks and derived-row upkeep (render caches, media
 * usage) are passed in as {@link WorkflowHooks} by each service.
 */

export type CmsWorkflowEntity = "QUESTION" | "ASSESSMENT" | "STUDY_PACK";

export const WORKFLOW_TABLE: Readonly<Record<CmsWorkflowEntity, string>> = {
  QUESTION: "Question",
  ASSESSMENT: "Assessment",
  STUDY_PACK: "StudyPack",
};

export interface WorkflowHooks {
  /** Problems that block review / approval / publication of the row (field errors; empty = ready). */
  readiness?: (tx: Tx, id: string) => Promise<FieldErrors>;
  /** Refresh derived rows (media usage, render caches) after a draft copy was created or a merge changed the live row. */
  afterContentChange?: (tx: Tx, id: string) => Promise<void>;
}

/** Workflow columns of a platform row. */
export interface WorkflowRowInfo {
  id: string;
  status: ContentStatus;
  revision: number;
  draftOfId: string | null;
  createdById: string | null;
  aiGenerated: boolean;
  /** Id of the pending draft copy of a live row, if any. */
  pendingDraftId: string | null;
}

const BASE_SELECT = {
  id: true,
  status: true,
  revision: true,
  draftOfId: true,
  createdById: true,
  aiGenerated: true,
  pendingDraft: { select: { id: true } },
} as const;

/**
 * Reads the workflow columns of a PLATFORM root row; NOT_FOUND for unknown ids, school / tutor content and question
 * parts (the CMS shows them nowhere, so their existence is not revealed either).
 */
export async function findPlatformRow(client: DbClient, entityType: CmsWorkflowEntity, id: string): Promise<WorkflowRowInfo> {
  let row: (Omit<WorkflowRowInfo, "pendingDraftId"> & { pendingDraft: { id: string } | null }) | null = null;
  const valid = uuidSchema.safeParse(id).success;
  switch (valid ? entityType : null) {
    case "QUESTION": {
      const found = await client.question.findUnique({ where: { id }, select: { ...BASE_SELECT, parentId: true, schoolId: true, ownerUserId: true } });
      row = found && found.parentId === null && found.schoolId === null && found.ownerUserId === null ? found : null;
      break;
    }
    case "ASSESSMENT": {
      const found = await client.assessment.findUnique({ where: { id }, select: { ...BASE_SELECT, schoolId: true, ownerUserId: true } });
      row = found && found.schoolId === null && found.ownerUserId === null ? found : null;
      break;
    }
    case "STUDY_PACK":
      row = await client.studyPack.findUnique({ where: { id }, select: BASE_SELECT });
      break;
  }
  if (!row) throw AppError.notFound(`${entityType === "QUESTION" ? "Question" : entityType === "ASSESSMENT" ? "Assessment" : "Study pack"} not found.`);
  return {
    id: row.id,
    status: row.status,
    revision: row.revision,
    draftOfId: row.draftOfId,
    createdById: row.createdById,
    aiGenerated: row.aiGenerated,
    pendingDraftId: row.pendingDraft?.id ?? null,
  };
}

const refSchema = z.object({ id: uuidSchema });

const notesSchema = z.preprocess(
  (value) => (typeof value === "string" ? value.trim() : (value ?? "")),
  z.string().max(2_000, "Keep notes under 2,000 characters."),
);

async function assertReady(tx: Tx, hooks: WorkflowHooks, id: string, message: string): Promise<void> {
  if (!hooks.readiness) return;
  const issues = await hooks.readiness(tx, id);
  if (Object.keys(issues).length > 0) throw AppError.validation(issues, message);
}

/** DRAFT → IN_REVIEW (`content.draft`), after the type's readiness checks and the helper's authoring checks. */
export async function submitItem(actor: CmsActor, entityType: CmsWorkflowEntity, raw: unknown, context: CmsContext = {}, hooks: WorkflowHooks = {}): Promise<WorkflowResult> {
  assertCanDraft(actor);
  const { id } = parseInput(refSchema, raw);
  return inTransaction(context, async (tx) => {
    const row = await findPlatformRow(tx, entityType, id);
    if (row.status !== "DRAFT") throw AppError.conflict("Only drafts can be submitted for review.");
    await assertReady(tx, hooks, id, "Fix these problems before submitting for review.");
    const result = await submitForReview(tx, entityType, id, infraActor(actor));
    await auditCms(tx, actor, context, {
      action: CMS_CONTENT_AUDIT.SUBMIT,
      operation: CMS_CONTENT_OPERATIONS.submit,
      entityType: WORKFLOW_TABLE[entityType],
      entityId: id,
      metadata: { revision: result.revision, aiGenerated: row.aiGenerated, draftOfId: row.draftOfId },
    });
    return result;
  });
}

/** IN_REVIEW / APPROVED → DRAFT with the reviewer's notes (`content.review`). */
export async function requestItemChanges(actor: CmsActor, entityType: CmsWorkflowEntity, raw: unknown, context: CmsContext = {}): Promise<WorkflowResult> {
  assertCanReview(actor);
  const input = parseInput(refSchema.extend({ notes: notesSchema.pipe(z.string().min(3, "Tell the author what needs to change.")) }), raw);
  return inTransaction(context, async (tx) => {
    await findPlatformRow(tx, entityType, input.id);
    const result = await requestChanges(tx, entityType, input.id, infraActor(actor), input.notes);
    await auditCms(tx, actor, context, {
      action: CMS_CONTENT_AUDIT.REQUEST_CHANGES,
      operation: CMS_CONTENT_OPERATIONS.requestChanges,
      entityType: WORKFLOW_TABLE[entityType],
      entityId: input.id,
      metadata: { revision: result.revision },
      reason: input.notes,
    });
    return result;
  });
}

/**
 * IN_REVIEW → APPROVED by a person (`content.review`). Four-eyes is enforced by the helper and the database when
 * `app.four_eyes = 'on'`. AI drafts (§41) need an explicit human attestation: the reviewer writes what they checked.
 */
export async function approveItem(actor: CmsActor, entityType: CmsWorkflowEntity, raw: unknown, context: CmsContext = {}, hooks: WorkflowHooks = {}): Promise<WorkflowResult> {
  assertCanReview(actor);
  const input = parseInput(refSchema.extend({ notes: notesSchema }), raw);
  return inTransaction(context, async (tx) => {
    const row = await findPlatformRow(tx, entityType, input.id);
    if (row.aiGenerated && input.notes.length < 10) {
      throw AppError.validation(
        { notes: ["This item was drafted by AI. Describe what you checked (answers, facts, notation, originality) before approving it."] },
        "AI-generated content needs an explicit human review note.",
      );
    }
    await assertReady(tx, hooks, input.id, "Fix these problems before approving.");
    return approve(tx, entityType, input.id, infraActor(actor), { notes: input.notes === "" ? null : input.notes });
  });
}

/**
 * Publishes APPROVED content (`content.publish`): first publication, or the publish merge of an approved draft copy
 * into its live row (revision + 1, snapshot, copy deleted). `id` may be the live row or its draft copy. Afterwards the
 * merged copy's media usage is dropped, the live row's derived rows are refreshed and the search re-index is queued.
 */
export async function publishItem(actor: CmsActor, entityType: CmsWorkflowEntity, raw: unknown, context: CmsContext = {}, hooks: WorkflowHooks = {}): Promise<PublishResult> {
  assertCanPublish(actor);
  const input = parseInput(refSchema.extend({ changeNote: notesSchema }), raw);
  return inTransaction(context, async (tx) => {
    const row = await findPlatformRow(tx, entityType, input.id);
    const target = row.status === "PUBLISHED" && row.draftOfId === null && row.pendingDraftId ? row.pendingDraftId : row.id;
    await assertReady(tx, hooks, target, "Fix these problems before publishing.");
    const result = await publish(tx, entityType, input.id, infraActor(actor), { changeNote: input.changeNote === "" ? null : input.changeNote });
    if (result.mergedDraftId) await clearMediaUsage(tx, entityType, result.mergedDraftId);
    if (result.changed) {
      await hooks.afterContentChange?.(tx, result.id);
      await enqueueReindex(tx, entityType, result.id);
    }
    return result;
  });
}

/** PUBLISHED → ARCHIVED (`content.archive`); the queued re-index removes the search document. */
export async function archiveItem(actor: CmsActor, entityType: CmsWorkflowEntity, raw: unknown, context: CmsContext = {}): Promise<WorkflowResult> {
  assertCanArchive(actor);
  const { id } = parseInput(refSchema, raw);
  return inTransaction(context, async (tx) => {
    await findPlatformRow(tx, entityType, id);
    const result = await archive(tx, entityType, id, infraActor(actor));
    await enqueueReindex(tx, entityType, id);
    return result;
  });
}

/**
 * ARCHIVED → DRAFT ("Restore to draft", `content.archive`: whoever may archive may restore). The helper starts
 * revision + 1, makes the actor the author of the new revision, clears the old approval and writes `content.reopen`;
 * the item must be reviewed and published again (its search document comes back on publication).
 */
export async function reopenItem(actor: CmsActor, entityType: CmsWorkflowEntity, raw: unknown, context: CmsContext = {}): Promise<WorkflowResult> {
  assertCanArchive(actor);
  const { id } = parseInput(refSchema, raw);
  return inTransaction(context, async (tx) => {
    const row = await findPlatformRow(tx, entityType, id);
    if (row.status !== "ARCHIVED") throw AppError.conflict("Only archived content can be restored to draft.");
    return reopenArchived(tx, entityType, id, infraActor(actor));
  });
}

/**
 * Starts editing PUBLISHED content (`content.draft`): returns its draft copy (created now, or the existing one).
 * Students keep the live row until the copy is approved and published.
 */
export async function startEditingItem(actor: CmsActor, entityType: CmsWorkflowEntity, raw: unknown, context: CmsContext = {}, hooks: WorkflowHooks = {}): Promise<DraftCopy> {
  assertCanDraft(actor);
  const { id } = parseInput(refSchema, raw);
  return inTransaction(context, async (tx) => {
    await findPlatformRow(tx, entityType, id);
    const copy = await createDraftCopyForEdit(tx, entityType, id, infraActor(actor));
    if (copy.created) {
      await hooks.afterContentChange?.(tx, copy.id);
      await auditCms(tx, actor, context, {
        action: CMS_CONTENT_AUDIT.DRAFT_COPY,
        operation: CMS_CONTENT_OPERATIONS.draftCopy,
        entityType: WORKFLOW_TABLE[entityType],
        entityId: id,
        metadata: { draftId: copy.id, revision: copy.revision },
      });
    }
    return copy;
  });
}

/** Deletes an unpublished draft copy (`content.draft`); the live row is untouched. */
export async function discardItemDraftCopy(actor: CmsActor, entityType: CmsWorkflowEntity, raw: unknown, context: CmsContext = {}): Promise<{ liveId: string }> {
  assertCanDraft(actor);
  const { id } = parseInput(refSchema, raw);
  return inTransaction(context, async (tx) => {
    const row = await findPlatformRow(tx, entityType, id);
    if (row.draftOfId === null) throw new AppError("BAD_REQUEST", "Only a draft copy of published content can be discarded.");
    await discardDraftCopy(tx, entityType, id, infraActor(actor));
    await clearMediaUsage(tx, entityType, id);
    await auditCms(tx, actor, context, {
      action: CMS_CONTENT_AUDIT.DISCARD,
      operation: CMS_CONTENT_OPERATIONS.discardDraftCopy,
      entityType: WORKFLOW_TABLE[entityType],
      entityId: row.draftOfId,
      metadata: { draftId: id, revision: row.revision },
    });
    return { liveId: row.draftOfId };
  });
}
