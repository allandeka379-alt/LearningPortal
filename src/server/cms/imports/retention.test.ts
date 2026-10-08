import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { ContentImportStatus } from "@/generated/prisma/client";
import { db } from "@/server/db";
import { sha256Hex } from "@/server/lib/crypto";
import { generateStorageKey, LocalDriver } from "@/server/lib/storage";
import { createUser } from "../../../../tests/factories/identity";
import { IMPORT_FILE_RETENTION_DAYS, importFileCutoff, purgeExpiredImportFiles } from "./retention";

/**
 * 90-day import-file purge (ARCHITECTURE §3.11) against the test database with a temporary local storage root. The
 * clock is set in 2019 so only this file's rows (uploaded in 2019) can be old enough: rows other test files create
 * "now" are never touched.
 */

let storageRoot: string;
let storage: LocalDriver;
let editorId: string;

beforeAll(async () => {
  storageRoot = await mkdtemp(path.join(tmpdir(), "dz-import-retention-"));
  storage = new LocalDriver(storageRoot);
  editorId = (await createUser({ roles: ["CONTENT_EDITOR"] })).user.id;
});

afterAll(async () => {
  await rm(storageRoot, { recursive: true, force: true });
});

async function importFile(createdAt: Date, importStatus: ContentImportStatus | null) {
  const key = generateStorageKey("imports", "csv", createdAt);
  await storage.put(key, new TextEncoder().encode("question,answer\n"), "text/csv");
  const asset = await db.mediaAsset.create({
    data: {
      storageKey: key,
      mimeType: "text/csv",
      byteSize: 16,
      checksumSha256: sha256Hex(key),
      originalFilename: "questions.csv",
      purpose: "IMPORT_FILE",
      visibility: "PRIVATE",
      status: "READY",
      uploadedById: editorId,
      createdAt,
    },
    select: { id: true },
  });
  const contentImport = importStatus
    ? await db.contentImport.create({
        data: { entityType: "QUESTION", format: "CSV", status: importStatus, fileMediaId: asset.id, createdById: editorId, totalRows: 1, createdAt },
        select: { id: true },
      })
    : null;
  return { id: asset.id, key, importId: contentImport?.id ?? null };
}

describe("import file retention", () => {
  it("is 90 days", () => {
    expect(IMPORT_FILE_RETENTION_DAYS).toBe(90);
    expect(importFileCutoff(new Date("2019-12-01T00:00:00.000Z")).toISOString()).toBe("2019-09-02T00:00:00.000Z");
  });

  it("deletes files older than 90 days, keeps the import history, skips in-flight imports and recent files", async () => {
    const now = new Date("2019-12-01T00:00:00.000Z");
    const completed = await importFile(new Date("2019-03-01T00:00:00.000Z"), "COMPLETED");
    const orphan = await importFile(new Date("2019-04-01T00:00:00.000Z"), null);
    const running = await importFile(new Date("2019-05-01T00:00:00.000Z"), "IMPORTING");
    const recent = await importFile(new Date("2019-11-20T00:00:00.000Z"), "VALIDATED");

    const result = await purgeExpiredImportFiles({ now, storage, batchSize: 1 });
    expect(result.assets).toBeGreaterThanOrEqual(2);

    for (const purged of [completed, orphan]) {
      expect(await db.mediaAsset.findUnique({ where: { id: purged.id }, select: { status: true, deletedAt: true } })).toEqual({ status: "DELETED", deletedAt: now });
      expect(await storage.exists(purged.key)).toBe(false);
    }
    // The import itself (counts, errors, who and when) stays readable.
    expect(await db.contentImport.findUnique({ where: { id: completed.importId! }, select: { status: true, fileMediaId: true } })).toEqual({
      status: "COMPLETED",
      fileMediaId: completed.id,
    });
    for (const kept of [running, recent]) {
      expect((await db.mediaAsset.findUniqueOrThrow({ where: { id: kept.id } })).status).toBe("READY");
      expect(await storage.exists(kept.key)).toBe(true);
    }

    // Idempotent: a second run finds nothing of ours left to do.
    await purgeExpiredImportFiles({ now, storage });
    expect(await storage.exists(running.key)).toBe(true);

    // Once the import finishes, its old file goes on the next run.
    await db.contentImport.update({ where: { id: running.importId! }, data: { status: "FAILED", completedAt: now } });
    await purgeExpiredImportFiles({ now, storage });
    expect((await db.mediaAsset.findUniqueOrThrow({ where: { id: running.id } })).status).toBe("DELETED");
    expect(await storage.exists(running.key)).toBe(false);
  });
});
