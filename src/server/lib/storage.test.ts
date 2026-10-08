import { mkdtemp, readdir, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { isAppError } from "./errors";
import { generateStorageKey, isValidStorageKey, LocalDriver, S3Driver } from "./storage";

let root: string;
let driver: LocalDriver;

beforeAll(async () => {
  root = await mkdtemp(path.join(tmpdir(), "dz-storage-"));
  driver = new LocalDriver(root);
});

afterAll(async () => {
  await rm(root, { recursive: true, force: true });
});

async function readAll(stream: ReadableStream<Uint8Array>): Promise<Uint8Array> {
  return new Uint8Array(await new Response(stream).arrayBuffer());
}

describe("storage keys", () => {
  it("generates unguessable keys in the strict format", () => {
    const key = generateStorageKey("content", "WEBP", new Date("2026-10-05T12:00:00Z"));
    expect(key).toMatch(/^content\/2026\/10\/[0-9a-f-]{36}\.webp$/);
    expect(isValidStorageKey(key)).toBe(true);
    expect(generateStorageKey("content", "webp")).not.toBe(generateStorageKey("content", "webp"));
    expect(() => generateStorageKey("../etc", "png")).toThrow(RangeError);
    expect(() => generateStorageKey("content", "p.ng")).toThrow(RangeError);
  });

  it("rejects traversal and anything not generated", () => {
    for (const bad of [
      "../secret.txt",
      "/etc/passwd",
      "content/2026/10/../../x.png",
      "content\\2026\\10\\x.png",
      "Content/2026/10/3f2a9c1e-0b7d-4a1e-8c1e-0b7d3f2a9c1e.png",
      "content/2026/10/not-a-uuid.png",
      "content/2026/10/3f2a9c1e-0b7d-4a1e-8c1e-0b7d3f2a9c1e.png/x",
      "",
    ]) {
      expect(isValidStorageKey(bad), bad).toBe(false);
    }
    expect(isValidStorageKey("content/2026/10/3f2a9c1e-0b7d-4a1e-8c1e-0b7d3f2a9c1e-w640.webp")).toBe(true);
  });
});

describe("LocalDriver", () => {
  it("puts, reads, streams, checks and deletes objects", async () => {
    const key = generateStorageKey("test", "bin");
    const bytes = new Uint8Array([1, 2, 3, 4]);
    expect(await driver.exists(key)).toBe(false);
    expect(await driver.get(key)).toBeNull();
    expect(await driver.getStream(key)).toBeNull();

    await driver.put(key, bytes, "application/octet-stream");
    expect(await driver.exists(key)).toBe(true);
    expect(await driver.get(key)).toEqual(bytes);
    const opened = await driver.getStream(key);
    expect(opened?.size).toBe(4);
    expect(await readAll(opened!.stream)).toEqual(bytes);

    await driver.put(key, new Uint8Array([9]), "application/octet-stream"); // atomic replace
    expect(await driver.get(key)).toEqual(new Uint8Array([9]));
    const dir = path.dirname(driver.resolvePath(key));
    expect((await readdir(dir)).filter((name) => name.endsWith(".tmp"))).toEqual([]);

    await driver.delete(key);
    await driver.delete(key); // idempotent
    expect(await driver.exists(key)).toBe(false);
  });

  it("refuses invalid keys before touching the file system", async () => {
    const error = await driver.get("../../outside.txt").catch((e: unknown) => e);
    expect(isAppError(error) && error.code).toBe("BAD_REQUEST");
    expect(() => driver.resolvePath("content/2026/10/../x.png")).toThrow();
  });
});

describe("S3Driver without S3_* configuration", () => {
  // The driver itself is covered in s3.test.ts (signing vectors + a fake S3 endpoint).
  it("throws INTERNAL until configured", async () => {
    const error = await new S3Driver().put(generateStorageKey("content", "png"), new Uint8Array(), "image/png").catch((e: unknown) => e);
    expect(isAppError(error) && error.code).toBe("INTERNAL");
    expect(isAppError(error) && error.message).toBe("S3 storage not configured");
  });
});
