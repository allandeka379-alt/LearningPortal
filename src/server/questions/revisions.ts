import "server-only";
import type { Prisma } from "@/generated/prisma/client";
import { sha256Hex } from "@/server/lib/crypto";
import { AppError } from "@/server/lib/errors";
import type { Tx } from "@/server/lib/db-context";
import { buildQuestionSnapshot, canonicalJson, QUESTION_SNAPSHOT_SCHEMA_VERSION, type SnapshotQuestionRow } from "./snapshot";

/**
 * ContentRevision snapshots for questions (§26, §42; ARCHITECTURE §4.4 "Draft copies and revisions").
 *
 * The database requires every live PUBLISHED root question to have the snapshot of its current revision
 * (`Question_revision_snapshot`, a deferred constraint trigger checked at COMMIT), and ContentRevision is append-only.
 * Call {@link recordRevisionSnapshot} INSIDE the publish transaction, after the live row (and its options/parts) carry
 * their final content and the bumped `revision` — i.e. as step 4 of the publish merge, after
 * `setContentPublishContext(tx, rootId)` and the merge itself.
 */

/** Render caches are not part of a snapshot (see `snapshot.ts`). */
const OMIT_CACHES = { renderedHtml: true, renderVersion: true } as const;
const OPTION_ORDER: Prisma.QuestionOptionOrderByWithRelationInput[] = [{ sortOrder: "asc" }, { key: "asc" }];
const PART_ORDER: Prisma.QuestionOrderByWithRelationInput[] = [{ partOrder: "asc" }, { id: "asc" }];
/** Parts removed in a later revision are archived or deleted by the publish merge; archived parts are not content. */
const LIVE_PARTS: Prisma.QuestionWhereInput = { status: { not: "ARCHIVED" } };

const AGGREGATE_INCLUDE = {
  options: { orderBy: OPTION_ORDER },
  parts: {
    where: LIVE_PARTS,
    orderBy: PART_ORDER,
    omit: OMIT_CACHES,
    include: {
      options: { orderBy: OPTION_ORDER },
      parts: { where: LIVE_PARTS, orderBy: PART_ORDER, omit: OMIT_CACHES, include: { options: { orderBy: OPTION_ORDER } } },
    },
  },
  topics: { select: { topicId: true, syllabusId: true, isPrimary: true } },
  objectives: { select: { objectiveId: true } },
} satisfies Prisma.QuestionInclude;

export interface RecordedRevision {
  id: string;
  revision: number;
  contentHash: string;
  /** False when an identical snapshot for this revision already existed (idempotent retry). */
  created: boolean;
}

/**
 * Writes the ContentRevision snapshot of a PUBLISHED root question at its current revision.
 *
 * @param tx       the publish transaction (the deferred snapshot check runs at its COMMIT)
 * @param actorId  editor who authored the changes (ContentRevision.authorId); null for system/imported content
 * @param note     change note shown in the revision history
 * @throws AppError NOT_FOUND (no such question), BAD_REQUEST (a part, a draft copy, or not PUBLISHED),
 *                  CONFLICT (a DIFFERENT snapshot already exists for this revision — published content is immutable)
 */
export async function recordRevisionSnapshot(tx: Tx, questionId: string, actorId: string | null, note?: string | null): Promise<RecordedRevision> {
  const question = await tx.question.findUnique({ where: { id: questionId }, omit: OMIT_CACHES, include: AGGREGATE_INCLUDE });
  if (!question) throw AppError.notFound("Question not found.", { questionId });
  if (question.parentId !== null) throw new AppError("BAD_REQUEST", "Snapshots are recorded for the root question, not for a part.");
  if (question.draftOfId !== null) throw new AppError("BAD_REQUEST", "A draft copy has no revisions of its own; publish it into the live question.");
  if (question.status !== "PUBLISHED") throw new AppError("BAD_REQUEST", "Only published questions have revision snapshots.");

  const { topics, objectives, ...root } = question;
  const snapshot = buildQuestionSnapshot({
    question: root as unknown as SnapshotQuestionRow,
    topics,
    objectives: objectives.map((o) => o.objectiveId),
  });
  const contentHash = sha256Hex(canonicalJson(snapshot));

  const existing = await tx.contentRevision.findUnique({
    where: { entityType_entityId_revision: { entityType: "QUESTION", entityId: questionId, revision: question.revision } },
    select: { id: true, contentHash: true },
  });
  if (existing) {
    if (existing.contentHash === contentHash) return { id: existing.id, revision: question.revision, contentHash, created: false };
    throw AppError.conflict("This revision was already published with different content. Publish a new revision instead.", {
      questionId,
      revision: question.revision,
    });
  }

  const created = await tx.contentRevision.create({
    data: {
      entityType: "QUESTION",
      entityId: questionId,
      revision: question.revision,
      schemaVersion: QUESTION_SNAPSHOT_SCHEMA_VERSION,
      snapshot: snapshot as Prisma.InputJsonObject,
      contentHash,
      authorId: actorId,
      approvedById: question.approvedById,
      changeNote: note ?? null,
      aiGenerated: question.aiGenerated,
    },
    select: { id: true },
  });
  return { id: created.id, revision: question.revision, contentHash, created: true };
}
