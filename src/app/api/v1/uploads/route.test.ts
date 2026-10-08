import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import sharp from "sharp";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createSession } from "@/server/auth/sessions";
import { testMeta } from "@/server/auth/testing";
import { contentChain } from "@/server/cms/review/testing";
import { db } from "@/server/db";
import { getEnv } from "@/server/lib/env";
import { LocalDriver, setStorageDriver } from "@/server/lib/storage";
import { MULTIPART_OVERHEAD_BYTES } from "@/server/lib/uploads";
import { createStudent, createUser, uniqueSuffix } from "../../../../../tests/factories/index";
import { POST } from "./route";

/**
 * POST /api/v1/uploads: session auth + same-origin CSRF check, permission per purpose before the body is read, a hard
 * byte cap enforced while streaming, magic-byte type checks, and the purpose's service storing the file.
 */

let root: string;

beforeAll(async () => {
  root = await mkdtemp(path.join(tmpdir(), "dz-upload-route-"));
  setStorageDriver(new LocalDriver(root));
});

afterAll(async () => {
  setStorageDriver(null);
  await rm(root, { recursive: true, force: true });
});

const ORIGIN = new URL(getEnv().APP_URL).origin;
const MB = 1024 * 1024;

async function cookieFor(roles: ("CONTENT_EDITOR" | "ADMIN")[]): Promise<{ cookie: string; userId: string }> {
  const { user } = await createUser({ roles });
  const session = await createSession(user.id, "WEB", testMeta(), { authMethod: "PASSWORD" });
  return { cookie: `dz_session=${session.token}`, userId: user.id };
}

async function studentCookie(): Promise<{ cookie: string; userId: string }> {
  const { user } = await createStudent({ student: { isMinor: false } });
  const session = await createSession(user.id, "WEB", testMeta(), { authMethod: "PASSWORD" });
  return { cookie: `dz_session=${session.token}`, userId: user.id };
}

async function png(width = 24, height = 24): Promise<Uint8Array> {
  const colour = `#${uniqueSuffix().replace(/[^0-9a-f]/gi, "").padEnd(6, "0").slice(0, 6)}`;
  return new Uint8Array(await sharp({ create: { width, height, channels: 3, background: colour } }).png().toBuffer());
}

function form(file: { bytes: Uint8Array; name: string; type?: string }, fields: Record<string, string> = {}): FormData {
  const data = new FormData();
  for (const [name, value] of Object.entries(fields)) data.set(name, value);
  data.set("file", new File([file.bytes as Uint8Array<ArrayBuffer>], file.name, { type: file.type ?? "application/octet-stream" }));
  return data;
}

function upload(purpose: string, body: FormData | null, headers: Record<string, string>): Promise<Response> {
  return POST(new Request(`${ORIGIN}/api/v1/uploads?purpose=${purpose}`, { method: "POST", headers, ...(body ? { body } : {}) }));
}

async function json(response: Response): Promise<{ data?: Record<string, unknown>; error?: { code: string; message: string; fieldErrors?: Record<string, string[]> } }> {
  return (await response.json()) as never;
}

describe("POST /api/v1/uploads: authentication, CSRF and permissions", () => {
  it("needs a session, refuses cross-site cookie requests and checks the purpose's permission", async () => {
    const bytes = await png();
    const anonymous = await upload("media", form({ bytes, name: "a.png" }, { altText: "A blue square" }), { origin: ORIGIN });
    expect(anonymous.status).toBe(401);

    const editor = await cookieFor(["CONTENT_EDITOR"]);
    const crossSite = await upload("media", form({ bytes, name: "a.png" }, { altText: "A blue square" }), { cookie: editor.cookie, origin: "https://evil.example" });
    expect(crossSite.status).toBe(403);
    expect(await db.mediaAsset.count({ where: { uploadedById: editor.userId } })).toBe(0);

    const student = await studentCookie();
    expect((await upload("media", form({ bytes, name: "a.png" }, { altText: "A blue square" }), { cookie: student.cookie, origin: ORIGIN })).status).toBe(403);
    expect((await upload("import", form({ bytes, name: "a.csv" }), { cookie: student.cookie, origin: ORIGIN })).status).toBe(403);
    // Solver photos are for students with the AI solver and image uploads in their plan.
    expect((await upload("solver", form({ bytes, name: "q.png" }), { cookie: editor.cookie, origin: ORIGIN })).status).toBe(403);
    expect((await upload("other", form({ bytes, name: "a.png" }), { cookie: editor.cookie, origin: ORIGIN })).status).toBe(422);
  });
});

describe("POST /api/v1/uploads: limits and types", () => {
  it("refuses a declared body over the cap before reading it", async () => {
    const editor = await cookieFor(["CONTENT_EDITOR"]);
    const response = await upload("media", form({ bytes: await png(), name: "a.png" }, { altText: "A blue square" }), {
      cookie: editor.cookie,
      origin: ORIGIN,
      "content-length": String(10 * MB + MULTIPART_OVERHEAD_BYTES + 1),
    });
    expect(response.status).toBe(422);
    expect((await json(response)).error?.fieldErrors?.file?.[0]).toMatch(/too large \(maximum 10 MB\)/);
  });

  it("cuts an oversized streamed body off mid-stream (no Content-Length) and stores nothing", async () => {
    const editor = await cookieFor(["CONTENT_EDITOR"]);
    let pulled = 0;
    const chunk = new Uint8Array(MB).fill(65);
    const body = new ReadableStream<Uint8Array>({
      pull(controller) {
        pulled += 1;
        if (pulled > 40) controller.close();
        else controller.enqueue(chunk);
      },
    });
    const response = await POST(
      new Request(`${ORIGIN}/api/v1/uploads?purpose=media`, {
        method: "POST",
        headers: { cookie: editor.cookie, origin: ORIGIN, "content-type": "multipart/form-data; boundary=----dz" },
        body,
        duplex: "half",
      } as RequestInit),
    );
    expect(response.status).toBe(422);
    expect((await json(response)).error?.fieldErrors?.file?.[0]).toMatch(/too large/);
    expect(pulled).toBeLessThan(20); // stopped shortly after the 10 MB cap, not at the end of the 40 MB stream
    expect(await db.mediaAsset.count({ where: { uploadedById: editor.userId } })).toBe(0);
  });

  it("refuses a file over the cap and a file whose bytes are not an accepted type", async () => {
    const editor = await cookieFor(["CONTENT_EDITOR"]);
    const big = new Uint8Array(10 * MB + 1);
    big.set(await png());
    const tooBig = await upload("media", form({ bytes: big, name: "big.png", type: "image/png" }, { altText: "A big picture" }), { cookie: editor.cookie, origin: ORIGIN });
    expect(tooBig.status).toBe(422);
    expect((await json(tooBig)).error?.fieldErrors?.file?.[0]).toMatch(/too large/);

    // Declared as a PNG, but the bytes are a PDF: the magic bytes decide.
    const pdf = new TextEncoder().encode("%PDF-1.7\n%âãÏÓ\n1 0 obj\n<<>>\nendobj\n");
    const wrongType = await upload("media", form({ bytes: pdf, name: "diagram.png", type: "image/png" }, { altText: "A diagram" }), { cookie: editor.cookie, origin: ORIGIN });
    expect(wrongType.status).toBe(422);
    expect((await json(wrongType)).error?.fieldErrors?.file).toEqual(["This type of file is not allowed here."]);

    const notMultipart = await POST(new Request(`${ORIGIN}/api/v1/uploads?purpose=media`, { method: "POST", headers: { cookie: editor.cookie, origin: ORIGIN, "content-type": "image/png" }, body: new Blob([(await png()) as Uint8Array<ArrayBuffer>]) }));
    expect(notMultipart.status).toBe(400);
    expect(await db.mediaAsset.count({ where: { uploadedById: editor.userId } })).toBe(0);
  });
});

describe("POST /api/v1/uploads: storing", () => {
  it("adds an image to the media library with its alt text and licensing", async () => {
    const editor = await cookieFor(["CONTENT_EDITOR"]);
    const response = await upload(
      "media",
      form({ bytes: await png(32, 20), name: "circle.png", type: "image/png" }, { purpose: "DIAGRAM", altText: "Parts of a circle", copyrightStatus: "OWNED", visibility: "AUTHENTICATED" }),
      { cookie: editor.cookie, origin: ORIGIN },
    );
    expect(response.status).toBe(201);
    const { data } = await json(response);
    expect(data).toMatchObject({ kind: "media", id: expect.any(String), href: `/admin/media/${String(data?.id)}` });
    const asset = await db.mediaAsset.findUniqueOrThrow({ where: { id: String(data?.id) } });
    expect(asset).toMatchObject({ purpose: "DIAGRAM", altText: "Parts of a circle", copyrightStatus: "OWNED", uploadedById: editor.userId, mimeType: "image/png" });

    // Field errors of the service come back for the form (alt text is required).
    const missingAlt = await upload("media", form({ bytes: await png(), name: "x.png" }), { cookie: editor.cookie, origin: ORIGIN });
    expect(missingAlt.status).toBe(422);
    expect((await json(missingAlt)).error?.fieldErrors?.altText).toBeDefined();
  });

  it("starts a content import (dry run) from a streamed CSV", async () => {
    const chain = await contentChain();
    const editor = await cookieFor(["CONTENT_EDITOR"]);
    const tag = `up-${uniqueSuffix()}`;
    const csv = ["external_ref,type,stem,option_a,option_b,option_c,correct,answer,topics,explanation", `${tag}-1,TRUE_FALSE,Every square is a rectangle.,,,,,true,,`].join("\n");
    const response = await upload(
      "import",
      form(
        { bytes: new TextEncoder().encode(csv), name: "questions.csv", type: "text/csv" },
        { entityType: "QUESTION", subjectId: chain.subject.id, syllabusId: chain.syllabus.id, sourceId: chain.source.id, licenceCode: "PROPRIETARY", rightsConfirmed: "on" },
      ),
      { cookie: editor.cookie, origin: ORIGIN },
    );
    expect(response.status).toBe(201);
    const { data } = await json(response);
    expect(data).toMatchObject({ kind: "import", id: expect.any(String), href: `/admin/imports/${String(data?.id)}` });
    expect(await db.contentImport.findUniqueOrThrow({ where: { id: String(data?.id) }, select: { createdById: true, entityType: true } })).toEqual({
      createdById: editor.userId,
      entityType: "QUESTION",
    });

    // A spreadsheet upload is never an image, and an image is never an import file.
    const image = await upload("import", form({ bytes: await png(), name: "questions.csv" }, { entityType: "QUESTION" }), { cookie: editor.cookie, origin: ORIGIN });
    expect(image.status).toBe(422);
  });
});
