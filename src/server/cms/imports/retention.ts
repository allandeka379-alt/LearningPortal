import "server-only";
import { z } from "zod";
import { deleteAssetObjects } from "@/server/accounts/retention";
import { db } from "@/server/db";
import { registerJobHandler, registerRecurringJob } from "@/server/lib/jobs";
import { getStorage, type StorageDriver } from "@/server/lib/storage";

/**
 * Import-file retention (ARCHITECTURE §3.11 "Imports … 90 days", §4.13): uploaded bulk-import files (MediaAsset
 * IMPORT_FILE: CSV / XLSX / JSON, PRIVATE) are deleted 90 days after upload. The stored object (and any variants) is
 * removed first, then the row is marked DELETED (kept: `ContentImport.fileMediaId` still points at it, so the import's
 * history, counts and row errors stay readable; only the file is gone). A file whose object could not be removed is
 * left as it is and retried by the next run.
 *
 * Files of imports still being validated or committed (VALIDATING / IMPORTING) are skipped until they finish. An
 * import left UPLOADED / VALIDATED for 90 days loses its file; committing it later fails cleanly ("The uploaded file
 * is no longer in storage", a permanent job failure), and the editor uploads it again.
 *
 * `imports.purgeFiles` runs daily at 04:25 CAT; idempotent and batched.
 */

export const IMPORT_FILE_RETENTION_DAYS = 90;
export const IMPORT_FILE_PURGE_JOB = "imports.purgeFiles";

const DAY_MS = 86_400_000;
const BATCH = 500;

/** Import files uploaded before this instant are past retention. */
export function importFileCutoff(now: Date): Date {
  return new Date(now.getTime() - IMPORT_FILE_RETENTION_DAYS * DAY_MS);
}

/** Deletes import files older than {@link IMPORT_FILE_RETENTION_DAYS} days (objects first, then the rows). */
export async function purgeExpiredImportFiles(options: { now?: Date; storage?: StorageDriver; batchSize?: number } = {}): Promise<{ assets: number; objects: number }> {
  const now = options.now ?? new Date();
  const storage = options.storage ?? getStorage();
  const batch = options.batchSize ?? BATCH;
  const cutoff = importFileCutoff(now);
  let afterId: string | undefined;
  let assets = 0;
  let objects = 0;
  for (;;) {
    const rows = await db.mediaAsset.findMany({
      where: {
        purpose: "IMPORT_FILE",
        status: { not: "DELETED" },
        createdAt: { lt: cutoff },
        contentImports: { none: { status: { in: ["VALIDATING", "IMPORTING"] } } },
        ...(afterId ? { id: { gt: afterId } } : {}),
      },
      orderBy: { id: "asc" },
      take: batch,
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
    if (rows.length < batch) break;
  }
  return { assets, objects };
}

/** Registers `imports.purgeFiles` (daily at 04:25 CAT = 02:25 UTC). */
export function registerImportRetentionJobs(): void {
  registerJobHandler(IMPORT_FILE_PURGE_JOB, z.looseObject({ periodStart: z.iso.datetime().optional() }), async () => purgeExpiredImportFiles(), {
    queue: "default",
    maxAttempts: 3,
  });
  registerRecurringJob(IMPORT_FILE_PURGE_JOB, 1440, IMPORT_FILE_PURGE_JOB, { offsetMinutes: 145 });
}
