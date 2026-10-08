import "server-only";
import { z } from "zod";
import { db } from "@/server/db";
import { registerJobHandler, registerRecurringJob } from "@/server/lib/jobs";
import { logger } from "@/server/lib/logger";
import { getStorage, isValidStorageKey, type StorageDriver } from "@/server/lib/storage";
import { LIBRARY_PURPOSES } from "./schemas";

/**
 * Media library maintenance (ARCHITECTURE §3.11, schema: "the row is soft-deleted (status DELETED) and a worker removes
 * the object"). `media.purgeDeleted` removes the stored bytes (and pre-generated variants) of library files deleted in
 * the last few days; the MediaAsset row stays (FK integrity, audit). Idempotent: deleting a missing object is not an
 * error, and the look-back window overlaps between runs so a failed run is retried by the next one.
 *
 * Register with `registerMediaJobs()` in src/worker/handlers.ts (reported to the integrator).
 */

export const MEDIA_PURGE_JOB = "media.purgeDeleted";
const LOOK_BACK_MS = 3 * 24 * 3600 * 1000;
const BATCH = 500;

function variantKeys(variants: unknown): string[] {
  if (!Array.isArray(variants)) return [];
  return variants.flatMap((variant: unknown) => {
    const key = typeof variant === "object" && variant !== null ? (variant as { storageKey?: unknown }).storageKey : undefined;
    return typeof key === "string" && isValidStorageKey(key) ? [key] : [];
  });
}

/** Deletes the stored objects of library files soft-deleted since `since` (default: the last 3 days). */
export async function purgeDeletedMedia(options: { since?: Date; storage?: StorageDriver; now?: Date } = {}): Promise<{ assets: number; objects: number }> {
  const storage = options.storage ?? getStorage();
  const since = options.since ?? new Date((options.now ?? new Date()).getTime() - LOOK_BACK_MS);
  let afterId: string | undefined;
  let assets = 0;
  let objects = 0;
  for (;;) {
    const rows = await db.mediaAsset.findMany({
      where: { status: "DELETED", deletedAt: { gte: since }, purpose: { in: [...LIBRARY_PURPOSES] }, ...(afterId ? { id: { gt: afterId } } : {}) },
      orderBy: { id: "asc" },
      take: BATCH,
      select: { id: true, storageKey: true, variants: true },
    });
    for (const row of rows) {
      for (const key of [row.storageKey, ...variantKeys(row.variants)]) {
        if (!isValidStorageKey(key)) continue;
        try {
          await storage.delete(key);
          objects += 1;
        } catch (error) {
          logger.error("media purge: object delete failed", { mediaAssetId: row.id, err: error });
        }
      }
      assets += 1;
    }
    afterId = rows.at(-1)?.id;
    if (rows.length < BATCH) break;
  }
  return { assets, objects };
}

/** Registers `media.purgeDeleted` (daily at 03:00 CAT = 01:00 UTC). */
export function registerMediaJobs(): void {
  registerJobHandler(MEDIA_PURGE_JOB, z.unknown(), async () => purgeDeletedMedia(), { queue: "default", maxAttempts: 3 });
  registerRecurringJob(MEDIA_PURGE_JOB, 1440, MEDIA_PURGE_JOB, { offsetMinutes: 60 });
}
