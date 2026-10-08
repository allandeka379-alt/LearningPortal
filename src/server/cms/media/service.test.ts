import { randomBytes, randomInt } from "node:crypto";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import sharp from "sharp";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { db } from "@/server/db";
import { isAppError } from "@/server/lib/errors";
import { LocalDriver } from "@/server/lib/storage";
import { uniqueSuffix } from "../../../../tests/factories/index";
import { createLesson, saveLesson } from "../lessons/service";
import { auditRowsFor, clearedProvenance, contentChain, staffActor, teacherActor } from "../review/testing";
import { assetSnippet } from "./schemas";
import { deleteMedia, getMediaDetail, listMedia, searchMediaForEditor, updateMedia, uploadMedia } from "./service";
import { purgeDeletedMedia } from "./jobs";
import { assetReferences } from "./usage";

/** Integration tests for the media library: validated uploads, search, usage tracking, metadata edits, soft delete. */

let root: string;
let storage: LocalDriver;

beforeAll(async () => {
  root = await mkdtemp(path.join(tmpdir(), "dz-media-"));
  storage = new LocalDriver(root);
});

afterAll(async () => {
  await rm(root, { recursive: true, force: true });
});

/** A small PNG with random colour and size: unique bytes, because the shared test database keeps earlier runs' files. */
async function png(): Promise<Uint8Array> {
  const colour = `#${randomBytes(3).toString("hex")}`;
  const width = 16 + randomInt(0, 64);
  const height = 16 + randomInt(0, 64);
  return new Uint8Array(await sharp({ create: { width, height, channels: 3, background: colour } }).png().toBuffer());
}

async function expectValidation(promise: Promise<unknown>, field: string): Promise<void> {
  try {
    await promise;
  } catch (error) {
    expect(isAppError(error) && error.code).toBe("VALIDATION");
    if (isAppError(error)) expect(error.fieldErrors?.[field]?.length ?? 0).toBeGreaterThan(0);
    return;
  }
  throw new Error(`expected a VALIDATION error on ${field}`);
}

describe("media library", () => {
  it("uploads with required alt text and licensing rules, then lists and searches", async () => {
    const editor = await staffActor();
    const tag = uniqueSuffix();
    await expectValidation(uploadMedia(editor, { bytes: await png() }, { purpose: "DIAGRAM", altText: " " }, {}, { storage }), "altText");
    await expectValidation(uploadMedia(editor, { bytes: await png() }, { altText: "A graph", visibility: "PUBLIC" }, {}, { storage }), "copyrightStatus");
    await expectValidation(uploadMedia(editor, { bytes: await png() }, { altText: "A graph", copyrightStatus: "LICENSED" }, {}, { storage }), "sourceId");
    await expectValidation(uploadMedia(editor, { bytes: new TextEncoder().encode("<svg></svg>") }, { altText: "Vector" }, {}, { storage }), "file");

    const bytes = await png();
    const uploaded = await uploadMedia(
      editor,
      { bytes, filename: "circle-parts.png" },
      { purpose: "DIAGRAM", altText: `Parts of a circle ${tag}`, caption: "Figure 1", copyrightStatus: "OWNED", visibility: "PUBLIC" },
      {},
      { storage },
    );
    expect(uploaded.snippet).toBe(`![Parts of a circle ${tag}](asset:${uploaded.id} "Figure 1")`);
    expect(uploaded.duplicateOf).toBeNull();
    const again = await uploadMedia(editor, { bytes }, { altText: `Duplicate ${tag}` }, {}, { storage });
    expect(again.duplicateOf).toBe(uploaded.id);

    const found = await listMedia(editor, { q: tag });
    expect(found.items.map((item) => item.id)).toEqual([again.id, uploaded.id]);
    expect(found.items[1]).toMatchObject({ purpose: "DIAGRAM", visibility: "PUBLIC", usageCount: 0, mimeType: "image/png", src: expect.stringMatching(/^\/api\/media\//) });
    expect((await listMedia(editor, { q: tag, purpose: "CONTENT_IMAGE" })).items.map((i) => i.id)).toEqual([again.id]);
    expect((await searchMediaForEditor(editor, `circle ${tag}`)).map((i) => i.id)).toEqual([uploaded.id]);

    const audit = await auditRowsFor(uploaded.id);
    expect(audit.map((row) => (row.metadata as { operation?: string }).operation)).toEqual(["media.upload"]);
  });

  it("tracks where an image is used, refuses to delete it while used, and soft-deletes unused files", async () => {
    const chain = await contentChain();
    const editor = await staffActor();
    const asset = await uploadMedia(editor, { bytes: await png() }, { altText: "A plant cell" }, {}, { storage });
    const { id: lessonId } = await createLesson(editor, { title: "Cells", kind: "LESSON", subjectId: chain.subject.id });
    await saveLesson(editor, {
      id: lessonId,
      title: "Cells",
      kind: "LESSON",
      subjectId: chain.subject.id,
      body: `## Cell\n\n${assetSnippet(asset.id, "A plant cell")}`,
      estimatedMinutes: 5,
      ...clearedProvenance(chain),
    });

    const detail = await getMediaDetail(editor, asset.id);
    expect(detail.usages).toEqual([expect.objectContaining({ entityType: "LESSON", entityId: lessonId, field: "body", title: "Cells", href: `/admin/lessons/${lessonId}` })]);
    expect(detail.deletable).toBe(false);
    await expect(deleteMedia(editor, { id: asset.id })).rejects.toMatchObject({ code: "CONFLICT" });
    expect((await listMedia(editor, { q: "A plant cell", usage: "used" })).items.some((i) => i.id === asset.id)).toBe(true);

    const unused = await uploadMedia(editor, { bytes: await png() }, { altText: `Unused ${uniqueSuffix()}` }, {}, { storage });
    await expect(deleteMedia(editor, { id: unused.id })).resolves.toEqual({ id: unused.id });
    expect(await db.mediaAsset.findUniqueOrThrow({ where: { id: unused.id }, select: { status: true, deletedAt: true } })).toMatchObject({ status: "DELETED" });
    await expect(getMediaDetail(editor, unused.id)).rejects.toMatchObject({ code: "NOT_FOUND" });
    expect((await auditRowsFor(unused.id)).map((r) => r.action)).toContain("media.delete");
  });

  it("edits metadata with an audited field diff and is staff-only", async () => {
    const editor = await staffActor();
    const asset = await uploadMedia(editor, { bytes: await png() }, { altText: "A bar chart" }, {}, { storage });
    await expectValidation(updateMedia(editor, { id: asset.id, altText: "", copyrightStatus: "UNVERIFIED" }), "altText");
    const result = await updateMedia(editor, { id: asset.id, altText: "A bar chart of rainfall by month", copyrightStatus: "OWNED", visibility: "PUBLIC", author: "Content team" });
    expect(result.changed.sort()).toEqual(["altText", "author", "copyrightStatus", "visibility"].sort());
    expect(await updateMedia(editor, { id: asset.id, altText: "A bar chart of rainfall by month", copyrightStatus: "OWNED", visibility: "PUBLIC", author: "Content team" })).toEqual({ id: asset.id, changed: [] });
    const row = (await auditRowsFor(asset.id)).find((r) => (r.metadata as { operation?: string }).operation === "media.update");
    expect(row?.after).toMatchObject({ altText: "A bar chart of rainfall by month", visibility: "PUBLIC" });

    const teacher = await teacherActor();
    await expect(listMedia(teacher, {})).rejects.toMatchObject({ code: "FORBIDDEN" });
    await expect(uploadMedia(teacher, { bytes: await png() }, { altText: "x x x" }, {}, { storage })).rejects.toMatchObject({ code: "FORBIDDEN" });
  });
});

describe("assetReferences", () => {
  it("finds asset ids per field, de-duplicated, ignoring malformed ids", () => {
    const id = "3f2a9c1e-5b7d-4e8a-9c0f-1a2b3c4d5e6f";
    expect(
      assetReferences({
        body: `![a](asset:${id}) and again ![b](asset:${id.toUpperCase()}) and ![c](asset:not-an-id)`,
        coverImageId: id,
        notes: null,
      }),
    ).toEqual([
      { field: "body", mediaAssetId: id },
      { field: "coverImageId", mediaAssetId: id },
    ]);
  });
});

describe("purgeDeletedMedia", () => {
  it("removes the stored object of a soft-deleted file and is idempotent", async () => {
    const editor = await staffActor();
    const asset = await uploadMedia(editor, { bytes: await png() }, { altText: `Purge ${uniqueSuffix()}` }, {}, { storage });
    const { storageKey } = await db.mediaAsset.findUniqueOrThrow({ where: { id: asset.id }, select: { storageKey: true } });
    expect(await storage.exists(storageKey)).toBe(true);
    await deleteMedia(editor, { id: asset.id });
    const since = new Date(Date.now() - 60_000);
    const first = await purgeDeletedMedia({ storage, since });
    expect(first.assets).toBeGreaterThanOrEqual(1);
    expect(await storage.exists(storageKey)).toBe(false);
    await expect(purgeDeletedMedia({ storage, since })).resolves.toMatchObject({ assets: expect.any(Number) });
    expect(await db.mediaAsset.findUniqueOrThrow({ where: { id: asset.id }, select: { status: true } })).toEqual({ status: "DELETED" });
  });
});
