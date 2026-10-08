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
  WORKFLOW_ENTITY_TYPES,
  type DraftCopy,
  type PublishResult,
  type WorkflowEntityType,
  type WorkflowResult,
} from "@/server/content/publish";
import type { DbClient } from "@/server/db";
import type { Tx } from "@/server/lib/db-context";
import { AppError } from "@/server/lib/errors";
import { enqueue } from "@/server/lib/jobs";
import { searchIndexDedupeKey, SEARCH_JOB_QUEUE } from "@/server/search/indexer";
import { isSearchableEntityType } from "@/server/search/types";
import { infraActor, type CmsActor } from "@/server/cms/users/access";
import { clearMediaUsage, syncMediaUsageFromAggregate } from "../media/usage";
import { contentSubmitIssues } from "./checks";
import {
  assertCanArchive,
  assertCanDraft,
  assertCanPublish,
  assertCanReview,
  auditContent,
  CONTENT_CMS_AUDIT,
  CONTENT_CMS_OPERATIONS,
  inTransaction,
  parseInput,
  type ContentServiceContext,
} from "./context";

/**
 * The editorial workflow for every content type, as one set of services (§25, §41, §42; CLAUDE.md "Database rules"):
 * each step re-checks the actor's permission, delegates the transition to the shared publish helper
 * (src/server/content/publish.ts — THE only way to approve / publish / archive / edit published content), keeps
 * `ContentMediaUsage` in step, queues the search re-index after publish / archive and writes the audit entry in the same
 * transaction. The helper itself audits approve / publish / archive.
 */

export const WORKFLOW_TABLES: Readonly<Record<WorkflowEntityType, string>> = {
  LESSON: "Lesson",
  QUESTION: "Question",
  FLASHCARD: "Flashcard",
  ASSESSMENT: "Assessment",
  STUDY_PACK: "StudyPack",
  STUDY_PLAN_TEMPLATE: "StudyPlanTemplate",
};

export const contentRefSchema = z.object({
  entityType: z.enum(WORKFLOW_ENTITY_TYPES, { message: "Unknown content type." }),
  id: z.uuid("Choose a valid item."),
});
export type ContentRef = z.infer<typeof contentRefSchema>;

const notesSchema = z.preprocess(
  (value) => (typeof value === "string" ? value.trim() : value ?? ""),
  z.string().max(2_000, "Keep notes under 2,000 characters."),
);

/** Workflow columns of a content row (null when it does not exist). */
export interface WorkflowRowInfo {
  id: string;
  status: ContentStatus;
  revision: number;
  draftOfId: string | null;
  createdById: string | null;
  approvedById: string | null;
  aiGenerated: boolean;
  /** Platform content (no school / tutor / personal owner) follows the full editorial workflow. */
  isPlatform: boolean;
  /** Question parts are acted on through their root. */
  isPart: boolean;
}

const WORKFLOW_SELECT = { id: true, status: true, revision: true, draftOfId: true, createdById: true, approvedById: true, aiGenerated: true } as const;

/** Reads the workflow columns of any content row (no lock). */
export async function findWorkflowRow(client: DbClient, entityType: WorkflowEntityType, id: string): Promise<WorkflowRowInfo | null> {
  const where = { id };
  switch (entityType) {
    case "LESSON": {
      const row = await client.lesson.findUnique({ where, select: WORKFLOW_SELECT });
      return row && { ...row, isPlatform: true, isPart: false };
    }
    case "QUESTION": {
      const row = await client.question.findUnique({ where, select: { ...WORKFLOW_SELECT, schoolId: true, ownerUserId: true, parentId: true } });
      return row && { ...row, isPlatform: row.schoolId === null && row.ownerUserId === null, isPart: row.parentId !== null };
    }
    case "FLASHCARD": {
      const row = await client.flashcard.findUnique({ where, select: { ...WORKFLOW_SELECT, ownerUserId: true } });
      return row && { ...row, isPlatform: row.ownerUserId === null, isPart: false };
    }
    case "ASSESSMENT": {
      const row = await client.assessment.findUnique({ where, select: { ...WORKFLOW_SELECT, schoolId: true, ownerUserId: true } });
      return row && { ...row, isPlatform: row.schoolId === null && row.ownerUserId === null, isPart: false };
    }
    case "STUDY_PACK": {
      const row = await client.studyPack.findUnique({ where, select: WORKFLOW_SELECT });
      return row && { ...row, isPlatform: true, isPart: false };
    }
    case "STUDY_PLAN_TEMPLATE": {
      const row = await client.studyPlanTemplate.findUnique({ where, select: WORKFLOW_SELECT });
      return row && { ...row, isPlatform: true, isPart: false };
    }
  }
}

/** The editorial CMS only acts on platform content (school / tutor / personal items have their own owners). */
async function requirePlatformRow(client: DbClient, entityType: WorkflowEntityType, id: string): Promise<WorkflowRowInfo> {
  const row = await findWorkflowRow(client, entityType, id);
  if (!row || !row.isPlatform) throw AppError.notFound("Content not found.");
  if (row.isPart) throw new AppError("BAD_REQUEST", "Question parts follow their root question; open the whole question.");
  return row;
}

/** Queues `search.reindexEntity` for a searchable type in the caller's transaction (deduplicated while pending). */
export async function enqueueSearchReindex(tx: Tx, entityType: WorkflowEntityType, entityId: string): Promise<void> {
  if (!isSearchableEntityType(entityType)) return;
  await enqueue("search.reindexEntity", { entityType, entityId }, { client: tx, queue: SEARCH_JOB_QUEUE, dedupeKey: searchIndexDedupeKey(entityType, entityId) });
}

/** Rewrites `ContentMediaUsage` of a content row from its current aggregate. */
export async function syncUsageFromAggregate(tx: Tx, entityType: WorkflowEntityType, id: string): Promise<void> {
  await syncMediaUsageFromAggregate(tx, entityType, id);
}

// ---------------------------------------------------------------------------------------------------------------------
// Transitions
// ---------------------------------------------------------------------------------------------------------------------

/**
 * DRAFT → IN_REVIEW (`content.draft`). Runs the CMS checks first ({@link contentSubmitIssues}: licensing, alt text,
 * primary topic, published practice questions, LaTeX and blocks) and refuses with VALIDATION listing every problem.
 */
export async function submitContent(actor: CmsActor, raw: unknown, context: ContentServiceContext = {}): Promise<WorkflowResult> {
  assertCanDraft(actor);
  const ref = parseInput(contentRefSchema, raw);
  return inTransaction(context, async (tx) => {
    const row = await requirePlatformRow(tx, ref.entityType, ref.id);
    if (row.status !== "DRAFT") throw AppError.conflict("Only drafts can be submitted for review.");
    const issues = await contentSubmitIssues(tx, ref.entityType, ref.id);
    if (Object.keys(issues).length > 0) throw AppError.validation(issues, "Fix these problems before submitting for review.");
    const result = await submitForReview(tx, ref.entityType, ref.id, infraActor(actor));
    await auditContent(tx, actor, context, {
      action: CONTENT_CMS_AUDIT.SUBMIT,
      operation: CONTENT_CMS_OPERATIONS.submit,
      entityType: WORKFLOW_TABLES[ref.entityType],
      entityId: ref.id,
      metadata: { revision: result.revision, aiGenerated: row.aiGenerated, draftOfId: row.draftOfId },
    });
    return result;
  });
}

/** IN_REVIEW / APPROVED → DRAFT with the reviewer's notes (`content.review`). Notes are required. */
export async function requestContentChanges(actor: CmsActor, raw: unknown, context: ContentServiceContext = {}): Promise<WorkflowResult> {
  assertCanReview(actor);
  const input = parseInput(contentRefSchema.extend({ notes: notesSchema.pipe(z.string().min(3, "Tell the author what needs to change.")) }), raw);
  return inTransaction(context, async (tx) => {
    await requirePlatformRow(tx, input.entityType, input.id);
    const result = await requestChanges(tx, input.entityType, input.id, infraActor(actor), input.notes);
    await auditContent(tx, actor, context, {
      action: CONTENT_CMS_AUDIT.REQUEST_CHANGES,
      operation: CONTENT_CMS_OPERATIONS.requestChanges,
      entityType: WORKFLOW_TABLES[input.entityType],
      entityId: input.id,
      metadata: { revision: result.revision },
      reason: input.notes,
    });
    return result;
  });
}

/**
 * IN_REVIEW → APPROVED by a person (`content.review`). Four-eyes is enforced by the helper and the database when
 * `app.four_eyes = 'on'` (the last author cannot approve). AI-generated items (§41) need an explicit human
 * attestation: the reviewer must write what they checked (answers, facts, notation, originality).
 */
export async function approveContent(actor: CmsActor, raw: unknown, context: ContentServiceContext = {}): Promise<WorkflowResult> {
  assertCanReview(actor);
  const input = parseInput(contentRefSchema.extend({ notes: notesSchema }), raw);
  return inTransaction(context, async (tx) => {
    const row = await requirePlatformRow(tx, input.entityType, input.id);
    if (row.aiGenerated && input.notes.length < 10) {
      throw AppError.validation(
        { notes: ["This item was drafted by AI. Describe what you checked (answers, facts, notation, originality) before approving it."] },
        "AI-generated content needs an explicit human review note.",
      );
    }
    return approve(tx, input.entityType, input.id, infraActor(actor), { notes: input.notes === "" ? null : input.notes });
  });
}

/**
 * Publishes APPROVED content (`content.publish`): first publication, or the publish merge of an approved draft copy
 * into its live row (revision + 1, snapshot, draft deleted). Then rewrites media usage for the live row, drops the
 * merged draft's usage rows and queues the search re-index, all in the same transaction.
 */
export async function publishContent(actor: CmsActor, raw: unknown, context: ContentServiceContext = {}): Promise<PublishResult> {
  assertCanPublish(actor);
  const input = parseInput(contentRefSchema.extend({ changeNote: notesSchema }), raw);
  return inTransaction(context, async (tx) => {
    await requirePlatformRow(tx, input.entityType, input.id);
    const result = await publish(tx, input.entityType, input.id, infraActor(actor), { changeNote: input.changeNote === "" ? null : input.changeNote });
    if (result.mergedDraftId) await clearMediaUsage(tx, input.entityType, result.mergedDraftId);
    if (result.changed) {
      await syncUsageFromAggregate(tx, input.entityType, result.id);
      await enqueueSearchReindex(tx, input.entityType, result.id);
    }
    return result;
  });
}

/** PUBLISHED → ARCHIVED (`content.archive`); the search document is removed by the queued re-index. */
export async function archiveContent(actor: CmsActor, raw: unknown, context: ContentServiceContext = {}): Promise<WorkflowResult> {
  assertCanArchive(actor);
  const ref = parseInput(contentRefSchema, raw);
  return inTransaction(context, async (tx) => {
    await requirePlatformRow(tx, ref.entityType, ref.id);
    const result = await archive(tx, ref.entityType, ref.id, infraActor(actor));
    await enqueueSearchReindex(tx, ref.entityType, ref.id);
    return result;
  });
}

/**
 * ARCHIVED → DRAFT ("Restore to draft", `content.archive`: whoever may archive may restore). The helper starts
 * revision + 1, makes the actor the author of the new revision, clears the old approval and writes `content.reopen`;
 * the item goes through review and publication again (its search document returns on publication).
 */
export async function reopenContent(actor: CmsActor, raw: unknown, context: ContentServiceContext = {}): Promise<WorkflowResult> {
  assertCanArchive(actor);
  const ref = parseInput(contentRefSchema, raw);
  return inTransaction(context, async (tx) => {
    const row = await requirePlatformRow(tx, ref.entityType, ref.id);
    if (row.status !== "ARCHIVED") throw AppError.conflict("Only archived content can be restored to draft.");
    return reopenArchived(tx, ref.entityType, ref.id, infraActor(actor));
  });
}

/**
 * Starts editing PUBLISHED content (`content.draft`): returns the draft copy (created now, or the existing one).
 * Students keep seeing the live row until the copy is approved and published.
 */
export async function startEditingPublished(actor: CmsActor, raw: unknown, context: ContentServiceContext = {}): Promise<DraftCopy> {
  assertCanDraft(actor);
  const ref = parseInput(contentRefSchema, raw);
  return inTransaction(context, async (tx) => {
    await requirePlatformRow(tx, ref.entityType, ref.id);
    const copy = await createDraftCopyForEdit(tx, ref.entityType, ref.id, infraActor(actor));
    if (copy.created) {
      await syncUsageFromAggregate(tx, ref.entityType, copy.id);
      await auditContent(tx, actor, context, {
        action: CONTENT_CMS_AUDIT.DRAFT_COPY,
        operation: CONTENT_CMS_OPERATIONS.draftCopy,
        entityType: WORKFLOW_TABLES[ref.entityType],
        entityId: ref.id,
        metadata: { draftId: copy.id, revision: copy.revision },
      });
    }
    return copy;
  });
}

/** Deletes an unpublished draft copy (`content.draft`); the live row is untouched. */
export async function discardContentDraftCopy(actor: CmsActor, raw: unknown, context: ContentServiceContext = {}): Promise<{ liveId: string }> {
  assertCanDraft(actor);
  const ref = parseInput(contentRefSchema, raw);
  return inTransaction(context, async (tx) => {
    const row = await requirePlatformRow(tx, ref.entityType, ref.id);
    if (row.draftOfId === null) throw new AppError("BAD_REQUEST", "Only a draft copy of published content can be discarded.");
    await discardDraftCopy(tx, ref.entityType, ref.id, infraActor(actor));
    await clearMediaUsage(tx, ref.entityType, ref.id);
    await auditContent(tx, actor, context, {
      action: CONTENT_CMS_AUDIT.DISCARD,
      operation: CONTENT_CMS_OPERATIONS.discardDraftCopy,
      entityType: WORKFLOW_TABLES[ref.entityType],
      entityId: row.draftOfId,
      metadata: { draftId: ref.id, revision: row.revision },
    });
    return { liveId: row.draftOfId };
  });
}
