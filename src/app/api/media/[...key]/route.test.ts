import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import sharp from "sharp";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { isSecureOrigin, sessionCookieName } from "@/server/auth/cookies";
import { createSession } from "@/server/auth/sessions";
import { testMeta } from "@/server/auth/testing";
import { getEnv } from "@/server/lib/env";
import { LocalDriver, setStorageDriver } from "@/server/lib/storage";
import { createUser } from "../../../../../tests/factories/index";
import { createMediaAsset } from "@/server/lib/uploads";
import { GET } from "./route";

let root: string;
let storage: LocalDriver;
const system = { kind: "system" as const, job: "test" };

beforeAll(async () => {
  root = await mkdtemp(path.join(tmpdir(), "dz-media-route-"));
  storage = new LocalDriver(root);
  setStorageDriver(storage);
});

afterAll(async () => {
  setStorageDriver(null);
  await rm(root, { recursive: true, force: true });
});

async function png(): Promise<Uint8Array> {
  return new Uint8Array(await sharp({ create: { width: 4, height: 4, channels: 3, background: "#123456" } }).png().toBuffer());
}

function call(key: string, init: RequestInit = {}) {
  return GET(new Request(`http://localhost/api/media/${key}`, init), { params: Promise.resolve({ key: key.split("/") }) });
}

describe("GET /api/media/[...key]", () => {
  it("serves PUBLIC assets with immutable caching and ETag revalidation", async () => {
    const asset = await createMediaAsset(
      system,
      { bytes: await png() },
      { purpose: "CONTENT_IMAGE", altText: "Blue square", visibility: "PUBLIC", copyrightStatus: "OWNED" },
    );
    const response = await call(asset.storageKey);
    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toBe("image/png");
    expect(response.headers.get("cache-control")).toBe("public, max-age=31536000, immutable");
    expect(response.headers.get("x-content-type-options")).toBe("nosniff");
    expect(response.headers.get("content-length")).toBe(String(asset.byteSize));
    const body = new Uint8Array(await response.arrayBuffer());
    expect(body).toEqual(await storage.get(asset.storageKey));

    const etag = response.headers.get("etag")!;
    expect(etag).toBe(`"${asset.checksumSha256}"`);
    const revalidated = await call(asset.storageKey, { headers: { "if-none-match": etag } });
    expect(revalidated.status).toBe(304);

    const head = await call(asset.storageKey, { method: "HEAD" });
    expect(head.status).toBe(200);
    expect(head.body).toBeNull();
  });

  it("returns the same 404 for non-public, unknown and malformed keys", async () => {
    const privateAsset = await createMediaAsset(system, { bytes: await png() }, { purpose: "ANSWER_ATTACHMENT" });
    const authenticated = await createMediaAsset(system, { bytes: await png() }, { purpose: "AVATAR" });
    for (const key of [
      privateAsset.storageKey,
      authenticated.storageKey,
      "content/2026/10/3f2a9c1e-0b7d-4a1e-8c1e-0b7d3f2a9c1e.png",
      "../../etc/passwd",
      "content/x.png",
    ]) {
      const response = await call(key);
      expect(response.status, key).toBe(404);
      expect(response.headers.get("cache-control")).toBe("no-store");
    }
  });

  it("returns 404 when the object is missing from storage", async () => {
    const asset = await createMediaAsset(
      system,
      { bytes: await png() },
      { purpose: "CONTENT_IMAGE", altText: "Square", visibility: "PUBLIC", copyrightStatus: "OWNED" },
    );
    await storage.delete(asset.storageKey);
    expect((await call(asset.storageKey)).status).toBe(404);
  });

  describe("non-public assets", () => {
    async function signedInAs(roles: ("STUDENT" | "TEACHER")[] = ["STUDENT"]) {
      const { user } = await createUser({ roles });
      const { token } = await createSession(user.id, "WEB", testMeta(), { authMethod: "PASSWORD" });
      const cookie = `${sessionCookieName(isSecureOrigin(getEnv().APP_URL))}=${token}`;
      return { actor: { kind: "user" as const, userId: user.id, roles: user.roles }, cookie };
    }

    it("serves AUTHENTICATED assets to any signed-in user, privately, and 404s anonymous or invalid sessions", async () => {
      const owner = await signedInAs();
      const reader = await signedInAs();
      const avatar = await createMediaAsset(owner.actor, { bytes: await png() }, { purpose: "AVATAR" });

      const response = await call(avatar.storageKey, { headers: { cookie: reader.cookie } });
      expect(response.status).toBe(200);
      expect(response.headers.get("cache-control")).toBe("private, no-cache");
      expect(response.headers.get("vary")).toBe("Cookie, Authorization");
      expect(new Uint8Array(await response.arrayBuffer())).toEqual(await storage.get(avatar.storageKey));

      const forgedCookie = `${sessionCookieName(isSecureOrigin(getEnv().APP_URL))}=not-a-real-token`;
      const refusedCredentials: Record<string, string>[] = [{}, { cookie: forgedCookie }, { authorization: "Bearer dz_forged" }];
      for (const headers of refusedCredentials) {
        const refused = await call(avatar.storageKey, { headers });
        expect(refused.status).toBe(404);
        expect(refused.headers.get("cache-control")).toBe("no-store");
      }
    });

    it("serves PRIVATE and OWNER_ONLY assets to the uploader only", async () => {
      const owner = await signedInAs();
      const other = await signedInAs(["TEACHER"]);
      const attachment = await createMediaAsset(owner.actor, { bytes: await png() }, { purpose: "ANSWER_ATTACHMENT" });
      const solver = await createMediaAsset(owner.actor, { bytes: await png() }, { purpose: "SOLVER_UPLOAD" });

      for (const asset of [attachment, solver]) {
        const mine = await call(asset.storageKey, { headers: { cookie: owner.cookie } });
        expect(mine.status, asset.purpose).toBe(200);
        expect(mine.headers.get("cache-control")).toBe("private, no-store");
        expect((await call(asset.storageKey, { headers: { cookie: other.cookie } })).status, asset.purpose).toBe(404);
        expect((await call(asset.storageKey)).status, asset.purpose).toBe(404);
      }
    });
  });
});
