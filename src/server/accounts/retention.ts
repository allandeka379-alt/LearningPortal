import "server-only";
import { db } from "@/server/db";
import { withAiScope } from "@/server/lib/db-context";
import { logger } from "@/server/lib/logger";
import { getStorage, isValidStorageKey, type StorageDriver } from "@/server/lib/storage";

/**
 * Retention of minors' most sensitive data (ARCHITECTURE §4.13 / §5.13; privacy notice "How long we keep it"):
 *
 * - **Solver photos** (MediaAsset SOLVER_UPLOAD, OWNER_ONLY): 30 days. The stored object (and any variants) is removed,
 *   then the row is marked DELETED (kept for FK integrity: `AiMessage.attachmentAssetId` still points at it, and the
 *   solver only ever loads READY photos). A photo whose object could not be removed stays as it is and is retried by the
 *   next run.
 * - **AI tutor / solver message text** (AiMessage.content): 12 months, then `content = ''` and `contentPurgedAt` is set;
 *   metering columns stay. The conversation's rolling `summary` (generated from those messages) and its `title` (for
 *   the solver, derived from the student's question) go too once its last message is older than 12 months. Runs under
 *   `withAiScope("system")`: row-level security hides AI rows from every other context.
 *
 * Both purges are idempotent and batched; `accounts.retentionPurge` runs them daily (./jobs.ts).
 */

export const SOLVER_PHOTO_RETENTION_DAYS = 30;
export const AI_MESSAGE_RETENTION_MONTHS = 12;

const DAY_MS = 86_400_000;
const BATCH = 500;

/** Solver photos uploaded before this instant are past retention. */
export function solverPhotoCutoff(now: Date): Date {
  return new Date(now.getTime() - SOLVER_PHOTO_RETENTION_DAYS * DAY_MS);
}

/** AI messages created before this instant are past retention (calendar months, UTC). */
export function aiMessageCutoff(now: Date): Date {
  const cutoff = new Date(now.getTime());
  cutoff.setUTCMonth(cutoff.getUTCMonth() - AI_MESSAGE_RETENTION_MONTHS);
  return cutoff;
}

/** Storage keys of an asset: the original plus pre-generated variants (`variants: [{ storageKey }]`). */
export function assetObjectKeys(asset: { storageKey: string; variants: unknown }): string[] {
  const keys = [asset.storageKey];
  if (Array.isArray(asset.variants)) {
    for (const variant of asset.variants as unknown[]) {
      const key = typeof variant === "object" && variant !== null ? (variant as { storageKey?: unknown }).storageKey : undefined;
      if (typeof key === "string") keys.push(key);
    }
  }
  return keys.filter(isValidStorageKey);
}

/**
 * Removes the stored objects of `assets`; returns the ids whose objects are all gone (deleting a missing object is
 * not an error). Failures are logged by id only and left for the next run.
 */
export async function deleteAssetObjects(
  assets: readonly { id: string; storageKey: string; variants: unknown }[],
  storage: StorageDriver,
): Promise<{ deletedIds: string[]; objects: number }> {
  const deletedIds: string[] = [];
  let objects = 0;
  for (const asset of assets) {
    let ok = true;
    for (const key of assetObjectKeys(asset)) {
      try {
        await storage.delete(key);
        objects += 1;
      } catch (error) {
        ok = false;
        logger.error("retention: object delete failed", { mediaAssetId: asset.id, err: error });
      }
    }
    if (ok) deletedIds.push(asset.id);
  }
  return { deletedIds, objects };
}

/** Deletes solver photos older than {@link SOLVER_PHOTO_RETENTION_DAYS} days (objects first, then the rows). */
export async function purgeExpiredSolverPhotos(options: { now?: Date; storage?: StorageDriver } = {}): Promise<{ assets: number; objects: number }> {
  const now = options.now ?? new Date();
  const storage = options.storage ?? getStorage();
  const cutoff = solverPhotoCutoff(now);
  let afterId: string | undefined;
  let assets = 0;
  let objects = 0;
  for (;;) {
    const rows = await db.mediaAsset.findMany({
      where: { purpose: "SOLVER_UPLOAD", status: { not: "DELETED" }, createdAt: { lt: cutoff }, ...(afterId ? { id: { gt: afterId } } : {}) },
      orderBy: { id: "asc" },
      take: BATCH,
      select: { id: true, storageKey: true, variants: true },
    });
    if (rows.length === 0) break;
    const removed = await deleteAssetObjects(rows, storage);
    objects += removed.objects;
    if (removed.deletedIds.length > 0) {
      const updated = await db.mediaAsset.updateMany({
        where: { id: { in: removed.deletedIds }, status: { not: "DELETED" } },
        data: { status: "DELETED", deletedAt: now },
      });
      assets += updated.count;
    }
    afterId = rows.at(-1)?.id;
    if (rows.length < BATCH) break;
  }
  return { assets, objects };
}

/**
 * Deletes the text of AI messages older than {@link AI_MESSAGE_RETENTION_MONTHS} months (and the summaries / titles of
 * conversations whose last message is that old). Metering, ratings and timestamps stay.
 */
export async function purgeExpiredAiMessageContent(options: { now?: Date } = {}): Promise<{ messages: number; conversations: number }> {
  const now = options.now ?? new Date();
  const cutoff = aiMessageCutoff(now);
  let messages = 0;
  for (;;) {
    const count = await withAiScope("system", null, (tx) =>
      tx.$executeRaw`
        UPDATE "AiMessage" SET "content" = '', "contentPurgedAt" = ${now}
         WHERE "id" IN (SELECT "id" FROM "AiMessage"
                         WHERE "contentPurgedAt" IS NULL AND "createdAt" < ${cutoff}
                         LIMIT ${BATCH})`,
    );
    messages += count;
    if (count < BATCH) break;
  }
  const conversations = await withAiScope("system", null, (tx) =>
    tx.aiConversation.updateMany({
      where: {
        OR: [{ summary: { not: null } }, { title: { not: null } }],
        AND: [{ OR: [{ lastMessageAt: { lt: cutoff } }, { lastMessageAt: null, createdAt: { lt: cutoff } }] }],
      },
      data: { summary: null, summarizedThrough: null, title: null },
    }),
  );
  return { messages, conversations: conversations.count };
}
