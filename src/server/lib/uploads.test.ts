import { createHash } from "node:crypto";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import sharp from "sharp";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { db } from "@/server/db";
import { createStudent, createUser } from "../../../tests/factories/index";
import { isAppError } from "./errors";
import { LocalDriver } from "./storage";
import {
  createMediaAsset,
  findPublicMedia,
  openMediaStream,
  sanitizeFilename,
  sanitizeImage,
  sniffMimeType,
  validateUpload,
} from "./uploads";

let root: string;
let storage: LocalDriver;

beforeAll(async () => {
  root = await mkdtemp(path.join(tmpdir(), "dz-uploads-"));
  storage = new LocalDriver(root);
});

afterAll(async () => {
  await rm(root, { recursive: true, force: true });
});

const text = (value: string) => new TextEncoder().encode(value);

async function png(width = 12, height = 8): Promise<Uint8Array> {
  return new Uint8Array(
    await sharp({ create: { width, height, channels: 3, background: "#1e6f8a" } }).png().toBuffer(),
  );
}

async function jpegWithExif(): Promise<Uint8Array> {
  return new Uint8Array(
    await sharp({ create: { width: 40, height: 20, channels: 3, background: "#d99a2b" } })
      .jpeg()
      .withExif({ IFD0: { Copyright: "Test", ImageDescription: "GPS would be here" } })
      .toBuffer(),
  );
}

function expectValidation(error: unknown, field: string) {
  expect(isAppError(error)).toBe(true);
  if (!isAppError(error)) return;
  expect(error.code).toBe("VALIDATION");
  expect(error.fieldErrors?.[field]?.length).toBeGreaterThan(0);
}

describe("sniffMimeType", () => {
  it("recognises formats by their bytes, never by name", async () => {
    expect(sniffMimeType(await png())).toBe("image/png");
    expect(sniffMimeType(await jpegWithExif())).toBe("image/jpeg");
    expect(sniffMimeType(new Uint8Array(await sharp(await png()).webp().toBuffer()))).toBe("image/webp");
    expect(sniffMimeType(new Uint8Array(await sharp(await png()).avif().toBuffer()))).toBe("image/avif");
    expect(sniffMimeType(text("%PDF-1.7\n..."))).toBe("application/pdf");
    expect(sniffMimeType(text('{"rows":[1,2]}'))).toBe("application/json");
    expect(sniffMimeType(text("name,score\nTendai,80\n"))).toBe("text/csv");
    expect(sniffMimeType(text("ID3\u0004rest"))).toBe("audio/mpeg");
    expect(sniffMimeType(new Uint8Array([0x50, 0x4b, 0x03, 0x04, ...text("[Content_Types].xml xl/workbook.xml")]))).toBe(
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    );
    expect(sniffMimeType(new Uint8Array([0x50, 0x4b, 0x03, 0x04, 1, 2, 3]))).toBeNull(); // some other zip
    expect(sniffMimeType(new Uint8Array([0x4d, 0x5a, 0x90, 0x00, 0x03]))).toBeNull(); // Windows executable
    expect(sniffMimeType(text("<svg xmlns='http://www.w3.org/2000/svg'><script/></svg>"))).toBeNull();
    expect(sniffMimeType(text("  <!DOCTYPE html><html></html>"))).toBeNull();
    expect(sniffMimeType(new Uint8Array())).toBeNull();
  });
});

describe("validateUpload", () => {
  it("returns sniffed type, dimensions and checksum", async () => {
    const bytes = await png(30, 20);
    const result = await validateUpload(bytes, { allowed: ["image/png"], maxBytes: 1024 * 1024 });
    expect(result).toEqual({
      mimeType: "image/png",
      extension: "png",
      byteSize: bytes.byteLength,
      width: 30,
      height: 20,
      checksumSha256: createHash("sha256").update(bytes).digest("hex"),
    });
  });

  it("rejects empty, oversized, disallowed and corrupt files", async () => {
    expectValidation(await validateUpload(new Uint8Array(), { allowed: ["image/png"], maxBytes: 10 }).catch((e) => e), "file");
    expectValidation(await validateUpload(await png(), { allowed: ["image/png"], maxBytes: 10 }).catch((e) => e), "file");
    expectValidation(await validateUpload(text("%PDF-1.4"), { allowed: ["image/png"], maxBytes: 1000 }).catch((e) => e), "file");
    const truncated = (await png()).subarray(0, 40);
    expectValidation(await validateUpload(truncated, { allowed: ["image/png"], maxBytes: 1000 }).catch((e) => e), "file");
  });
});

describe("sanitizeImage", () => {
  it("strips metadata and downscales", async () => {
    const input = await jpegWithExif();
    expect((await sharp(input).metadata()).exif).toBeDefined();
    const clean = await sanitizeImage(input, "image/jpeg", 10);
    expect(clean.mimeType).toBe("image/jpeg");
    expect([clean.width, clean.height]).toEqual([10, 5]);
    expect((await sharp(clean.bytes).metadata()).exif).toBeUndefined();
  });

  it("sanitises file names for display", () => {
    expect(sanitizeFilename("C:\\Users\\kid\\My <script> notes.png")).toBe("My _script_ notes.png");
    expect(sanitizeFilename("../../etc/passwd")).toBe("passwd");
    expect(sanitizeFilename("...")).toBeNull();
    expect(sanitizeFilename(null)).toBeNull();
  });
});

describe("createMediaAsset (database)", () => {
  it("stores a sanitised content image and serves it when public", async () => {
    const { user } = await createUser({ roles: ["CONTENT_EDITOR"] });
    const actor = { kind: "user" as const, userId: user.id, roles: user.roles };
    const asset = await createMediaAsset(
      actor,
      { bytes: await jpegWithExif(), filename: "diagram.JPG" },
      { purpose: "DIAGRAM", altText: "A labelled triangle", visibility: "PUBLIC", copyrightStatus: "OWNED" },
      { storage },
    );
    expect(asset).toMatchObject({
      status: "READY",
      mimeType: "image/jpeg",
      visibility: "PUBLIC",
      uploadedById: user.id,
      originalFilename: "diagram.JPG",
      width: 40,
      height: 20,
    });
    expect(asset.storageKey).toMatch(/^content\/\d{4}\/\d{2}\/[0-9a-f-]{36}\.jpg$/);
    const stored = await storage.get(asset.storageKey);
    expect(stored).not.toBeNull();
    expect(createHash("sha256").update(stored!).digest("hex")).toBe(asset.checksumSha256);
    expect((await sharp(stored!).metadata()).exif).toBeUndefined();

    const found = await findPublicMedia(asset.storageKey);
    expect(found?.id).toBe(asset.id);
    const opened = await openMediaStream(found!, storage);
    expect(opened?.size).toBe(asset.byteSize);
    await opened?.stream.cancel();
  });

  it("keeps private files private and enforces purpose rules", async () => {
    const student = await createStudent();
    const actor = { kind: "user" as const, userId: student.user.id, roles: student.user.roles };
    const solver = await createMediaAsset(actor, { bytes: await png() }, { purpose: "SOLVER_UPLOAD" }, { storage });
    expect(solver.visibility).toBe("OWNER_ONLY");
    expect(await findPublicMedia(solver.storageKey)).toBeNull();

    const forbidden = await createMediaAsset(actor, { bytes: await png() }, { purpose: "CONTENT_IMAGE", altText: "x" }, { storage }).catch(
      (e: unknown) => e,
    );
    expect(isAppError(forbidden) && forbidden.code).toBe("FORBIDDEN");

    const wrongVisibility = await createMediaAsset(
      actor,
      { bytes: await png() },
      { purpose: "SOLVER_UPLOAD", visibility: "PUBLIC" },
      { storage },
    ).catch((e: unknown) => e);
    expectValidation(wrongVisibility, "visibility");

    const wrongType = await createMediaAsset(actor, { bytes: text("%PDF-1.4 x") }, { purpose: "AVATAR" }, { storage }).catch(
      (e: unknown) => e,
    );
    expectValidation(wrongType, "file");
  });

  it("requires alt text for content images and cleared copyright for public files", async () => {
    const actor = { kind: "system" as const, job: "test" };
    const noAlt = await createMediaAsset(actor, { bytes: await png() }, { purpose: "CONTENT_IMAGE" }, { storage }).catch(
      (e: unknown) => e,
    );
    expectValidation(noAlt, "altText");
    const unverifiedPublic = await createMediaAsset(
      actor,
      { bytes: await png() },
      { purpose: "MARKETING_IMAGE" },
      { storage },
    ).catch((e: unknown) => e);
    expectValidation(unverifiedPublic, "copyrightStatus");

    const logo = await createMediaAsset(actor, { bytes: await png(2000, 1000) }, { purpose: "SCHOOL_LOGO" }, { storage });
    expect([logo.width, logo.height]).toEqual([1024, 512]);
    expect(logo.uploadedById).toBeNull();
    await db.mediaAsset.update({ where: { id: logo.id }, data: { status: "DELETED", deletedAt: new Date() } });
    expect(await findPublicMedia(logo.storageKey)).toBeNull();
  });
});
