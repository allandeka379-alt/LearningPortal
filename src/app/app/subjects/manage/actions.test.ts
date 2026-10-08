import { beforeEach, describe, expect, it, vi } from "vitest";
import { addDays, localDateString } from "@/lib/dates";
import { createCurriculumChain, createStudent } from "../../../../../tests/factories/index";
import { createExamSession, createGradeScheme } from "../../../../../tests/factories/learning";

/**
 * Wiring tests for the subject-enrolment Server Actions (§5, §26): form → guard → enrollment service → ActionResult.
 * `next/headers` and `next/cache` are mocked; services and the database are real.
 */

const jar = new Map<string, string>();
let incomingHeaders = new Headers();

vi.mock("next/headers", () => ({
  cookies: async () => ({
    get: (name: string) => (jar.has(name) ? { name, value: jar.get(name) } : undefined),
    set: (name: string, value: string) => void jar.set(name, value),
  }),
  headers: async () => incomingHeaders,
}));
vi.mock("next/cache", () => ({ revalidatePath: () => undefined }));

const { addSubjectAction, removeSubjectAction, updateTargetsAction } = await import("./actions");
const { db } = await import("@/server/db");
const { createSession, currentSessionCookieName } = await import("@/server/auth/sessions");
const { randomIp, testMeta } = await import("@/server/auth/testing");

function form(fields: Record<string, string>): FormData {
  const data = new FormData();
  for (const [key, value] of Object.entries(fields)) data.set(key, value);
  return data;
}

async function signedInStudent() {
  const chain = await createCurriculumChain({ topicCount: 1, subtopicsPerTopic: 1, lessonsPerTopic: 0 });
  const { user } = await createStudent({
    student: { isMinor: false, countryId: chain.country.id, examBoardId: chain.examBoard.id, qualificationId: chain.qualification.id, onboardingCompleted: true },
  });
  const { token } = await createSession(user.id, "WEB", testMeta(), { authMethod: "PASSWORD", roles: ["STUDENT"] });
  jar.set(currentSessionCookieName(), token);
  return { userId: user.id, chain };
}

beforeEach(() => {
  jar.clear();
  incomingHeaders = new Headers({ "x-forwarded-for": randomIp(), "user-agent": "vitest" });
});

describe("subject enrolment Server Actions", () => {
  it("adds a subject (pinning the current syllabus version), sets targets, removes it and adds it back", async () => {
    const { userId, chain } = await signedInStudent();
    const subjectId = chain.subject.id;
    // Before the first enrolment: grade schemes are cached per qualification.
    await createGradeScheme(chain.qualification.id);

    const added = await addSubjectAction(null, form({ subjectId }));
    expect(added).toEqual({ ok: true, data: { message: `${chain.subject.name} added to your subjects.` } });
    const enrolment = await db.subjectEnrollment.findUniqueOrThrow({ where: { userId_subjectId: { userId, subjectId } } });
    expect(enrolment).toMatchObject({ status: "ACTIVE", syllabusId: chain.syllabus.id });

    const session = await createExamSession(chain.qualification.id, { startsOn: addDays(localDateString(new Date()), 200) });
    const targets = await updateTargetsAction(null, form({ subjectId, targetExamSessionId: session.id, targetGrade: "B" }));
    expect(targets).toEqual({ ok: true, data: { message: "Targets saved." } });
    expect(await db.subjectEnrollment.findUniqueOrThrow({ where: { id: enrolment.id }, select: { targetExamSessionId: true, targetGrade: true } })).toEqual({
      targetExamSessionId: session.id,
      targetGrade: "B",
    });
    const badGrade = await updateTargetsAction(null, form({ subjectId, targetGrade: "Z9" }));
    expect(badGrade).toMatchObject({ ok: false, error: { code: "VALIDATION", fieldErrors: { targetGrade: expect.any(Array) } } });
    expect((await updateTargetsAction(null, form({ subjectId, targetExamSessionId: "", targetGrade: "" })))?.ok).toBe(true);
    expect(await db.subjectEnrollment.findUniqueOrThrow({ where: { id: enrolment.id }, select: { targetExamSessionId: true, targetGrade: true } })).toEqual({
      targetExamSessionId: null,
      targetGrade: null,
    });

    const removed = await removeSubjectAction(null, form({ subjectId }));
    expect(removed).toEqual({ ok: true, data: { message: `${chain.subject.name} removed from your subjects.` } });
    expect((await db.subjectEnrollment.findUniqueOrThrow({ where: { id: enrolment.id } })).status).toBe("DROPPED");

    expect((await addSubjectAction(null, form({ subjectId })))?.ok).toBe(true);
    const again = await db.subjectEnrollment.findUniqueOrThrow({ where: { id: enrolment.id } });
    expect([again.status, again.syllabusId]).toEqual(["ACTIVE", chain.syllabus.id]);
  });

  it("validates input and refuses subjects the student is not enrolled in", async () => {
    await signedInStudent();
    expect(await addSubjectAction(null, form({}))).toMatchObject({ ok: false, error: { code: "VALIDATION", fieldErrors: { subjectId: expect.any(Array) } } });
    expect(await addSubjectAction(null, form({ subjectId: "not-a-uuid" }))).toMatchObject({ ok: false, error: { code: "VALIDATION" } });
    const other = await createCurriculumChain({ topicCount: 1, subtopicsPerTopic: 1, lessonsPerTopic: 0 });
    expect(await removeSubjectAction(null, form({ subjectId: other.subject.id }))).toMatchObject({ ok: false, error: { code: "NOT_FOUND" } });
  });

  it("requires a signed-in student", async () => {
    const chain = await createCurriculumChain({ topicCount: 1, subtopicsPerTopic: 1, lessonsPerTopic: 0 });
    expect(await addSubjectAction(null, form({ subjectId: chain.subject.id }))).toMatchObject({ ok: false, error: { code: "UNAUTHENTICATED" } });
  });
});
