import { beforeAll, describe, expect, it, vi } from "vitest";
import { randomUUID } from "node:crypto";
import type { Role } from "@/generated/prisma/client";
import { db } from "@/server/db";
import { AppError } from "@/server/lib/errors";
import { createCurriculumChain, createUser, uniqueCode } from "../../../../tests/factories/index";

/**
 * Wiring tests for the curriculum Server Actions: FormData → permission re-check (with scope) → service → ActionResult
 * (+ audit). The session lookup, request headers and cache revalidation are mocked; services and database are real.
 */

let currentActor: { kind: "user"; userId: string; roles: Role[] } | null = null;

vi.mock("@/server/auth/guards", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/server/auth/guards")>()),
  requirePermissionForAction: async () => {
    if (!currentActor) throw AppError.unauthenticated();
    const { hasPermission } = await import("@/server/auth/permissions");
    if (!hasPermission(currentActor, "curriculum.manage")) throw AppError.forbidden();
    return currentActor;
  },
}));
vi.mock("@/server/lib/request", () => ({ getRequestContext: async () => ({ requestId: "test-request", ip: "10.0.0.1", userAgent: "vitest" }) }));
vi.mock("next/cache", () => ({ revalidatePath: vi.fn(), revalidateTag: vi.fn(), refresh: vi.fn(), updateTag: vi.fn() }));

const { createBoardAction } = await import("../boards/actions");
const { createSyllabusVersionAction, publishSyllabusAction, runTopicCommand, updateDraftSyllabusAction } = await import("./actions");

function form(fields: Record<string, string>): FormData {
  const data = new FormData();
  for (const [key, value] of Object.entries(fields)) data.set(key, value);
  return data;
}

let admin: { kind: "user"; userId: string; roles: Role[] };
let editor: { kind: "user"; userId: string; roles: Role[] };
let student: { kind: "user"; userId: string; roles: Role[] };

beforeAll(async () => {
  const [a, e, s] = await Promise.all([createUser({ roles: ["ADMIN"] }), createUser({ roles: ["CONTENT_EDITOR"] }), createUser({ roles: ["STUDENT"] })]);
  admin = { kind: "user", userId: a.user.id, roles: ["ADMIN"] };
  editor = { kind: "user", userId: e.user.id, roles: ["CONTENT_EDITOR"] };
  student = { kind: "user", userId: s.user.id, roles: ["STUDENT"] };
});

describe("catalogue actions", () => {
  it("re-checks the admin scope, validates, and returns the redirect and audit trail", async () => {
    const code = uniqueCode("AB");
    const fields = { shortName: `Board ${code}`, name: "Action Test Board", code, slug: "", catalogueStatus: "HIDDEN", sortOrder: "" };

    currentActor = null;
    expect(await createBoardAction(null, form(fields))).toMatchObject({ ok: false, error: { code: "UNAUTHENTICATED" } });
    currentActor = student;
    expect(await createBoardAction(null, form(fields))).toMatchObject({ ok: false, error: { code: "FORBIDDEN" } });
    currentActor = editor;
    expect(await createBoardAction(null, form(fields))).toMatchObject({ ok: false, error: { code: "FORBIDDEN" } });

    currentActor = admin;
    const invalid = await createBoardAction(null, form({ ...fields, code: "?" }));
    expect(invalid).toMatchObject({ ok: false, error: { code: "VALIDATION", fieldErrors: { code: expect.any(Array) } }, values: { code: "?" } });

    const created = await createBoardAction(null, form(fields));
    expect(created).toMatchObject({ ok: true, message: "Exam board created.", redirectTo: expect.stringMatching(/^\/admin\/boards\/[0-9a-f-]{36}$/) });
    const id = (created as { data: { id: string } }).data.id;
    const audit = await db.auditLog.findFirstOrThrow({ where: { entityId: id } });
    expect(audit).toMatchObject({ actorUserId: admin.userId, requestId: "test-request", userAgent: "vitest" });
    expect(audit.ipHash).not.toBeNull();
  });
});

describe("syllabus actions", () => {
  it("lets editors draft but only admins publish", async () => {
    const chain = await createCurriculumChain({ lessonsPerTopic: 0 });
    currentActor = editor;
    const created = await createSyllabusVersionAction(
      null,
      form({ subjectId: chain.subject.id, versionLabel: `act-${randomUUID().slice(0, 6)}`, title: "Next", effectiveFrom: "2028-01-01", cloneFromId: chain.syllabus.id }),
    );
    expect(created).toMatchObject({ ok: true, message: expect.stringMatching(/6 topics/) });
    const id = (created as { data: { id: string } }).data.id;
    const versionLabel = (await db.syllabus.findUniqueOrThrow({ where: { id } })).versionLabel;

    expect(await updateDraftSyllabusAction(null, form({ id, versionLabel, title: "Next", effectiveFrom: "2028-01-01", copyrightStatus: "OWNED", sourceId: chain.source.id }))).toMatchObject({ ok: true });
    expect(await publishSyllabusAction(null, form({ id, mode: "CURRENT" }))).toMatchObject({ ok: false, error: { code: "FORBIDDEN" } });

    currentActor = admin;
    expect(await publishSyllabusAction(null, form({ id, mode: "CURRENT" }))).toMatchObject({ ok: true, message: expect.stringMatching(/current version.*superseded/) });
    expect((await db.syllabus.findUniqueOrThrow({ where: { id } })).status).toBe("CURRENT");
  });

  it("runs tree editor commands and rejects malformed ones", async () => {
    const chain = await createCurriculumChain({ topicCount: 0, lessonsPerTopic: 0, syllabusStatus: "DRAFT" });
    currentActor = editor;
    const malformed = await runTopicCommand({ type: "nonsense", syllabusId: chain.syllabus.id, input: {} } as never);
    expect(malformed).toMatchObject({ ok: false, error: { code: "BAD_REQUEST" } });
    const added = await runTopicCommand({ type: "add", syllabusId: chain.syllabus.id, input: { syllabusId: chain.syllabus.id, parentId: null, name: "Statistics" } });
    expect(added).toMatchObject({ ok: true, message: "Topic added.", data: { id: expect.any(String) } });
    const preview = await runTopicCommand({ type: "outline.preview", syllabusId: chain.syllabus.id, input: { syllabusId: chain.syllabus.id, text: "A\n  B", detectCodes: "on" } });
    expect(preview).toMatchObject({ ok: true, data: { topicCount: 2, ok: true } });
    expect(await db.topic.count({ where: { syllabusId: chain.syllabus.id } })).toBe(1);
    currentActor = student;
    expect(await runTopicCommand({ type: "delete", syllabusId: chain.syllabus.id, input: { id: (added as { data: { id: string } }).data.id } })).toMatchObject({
      ok: false,
      error: { code: "FORBIDDEN" },
    });
  });
});
