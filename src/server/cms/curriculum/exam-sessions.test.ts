import { beforeAll, describe, expect, it } from "vitest";
import { randomUUID } from "node:crypto";
import { db } from "@/server/db";
import { createCurriculumChain, createStudent } from "../../../../tests/factories/index";
import type { CurriculumActor } from "./access";
import { confirmExamSessionDates, createExamSession, getExamSession, listExamSessions, setExamSessionStatus, updateExamSession } from "./exam-sessions";
import { auditOperations, auditRowsFor, staffActor, studentActor } from "./testing";

let admin: CurriculumActor;
let editor: CurriculumActor;
let student: CurriculumActor;

beforeAll(async () => {
  [admin, editor, student] = await Promise.all([staffActor("ADMIN"), staffActor("CONTENT_EDITOR"), studentActor()]);
});

function sessionInput(qualificationId: string, overrides: Record<string, unknown> = {}) {
  return {
    qualificationId,
    name: "November 2027",
    seriesCode: `2027-nov-${randomUUID().slice(0, 4)}`,
    year: "2027",
    startsOn: "2027-10-25",
    endsOn: "2027-11-30",
    ...overrides,
  };
}

describe("exam sessions", () => {
  it("lets editors draft sessions and only admins publish them", async () => {
    const chain = await createCurriculumChain({ topicCount: 0, lessonsPerTopic: 0 });
    await expect(createExamSession(student, sessionInput(chain.qualification.id))).rejects.toMatchObject({ code: "FORBIDDEN" });
    const input = sessionInput(chain.qualification.id);
    const { id } = await createExamSession(editor, input);
    let session = await getExamSession(editor, id);
    expect(session).toMatchObject({ status: "DRAFT", isProvisional: true, seriesCode: input.seriesCode.toUpperCase(), startsOn: "2027-10-25", canEdit: true, allowedTransitions: [] });
    await expect(createExamSession(editor, input)).rejects.toMatchObject({ code: "VALIDATION", fieldErrors: { seriesCode: [expect.any(String)] } });

    await expect(setExamSessionStatus(editor, { id, status: "PUBLISHED" })).rejects.toMatchObject({ code: "FORBIDDEN" });
    await setExamSessionStatus(admin, { id, status: "PUBLISHED" });
    session = await getExamSession(editor, id);
    expect(session).toMatchObject({ status: "PUBLISHED", canEdit: false });
    expect((await getExamSession(admin, id)).allowedTransitions).toEqual(["DRAFT", "CANCELLED", "ARCHIVED"]);
    await expect(updateExamSession(editor, { ...input, id, name: "Changed" })).rejects.toMatchObject({ code: "FORBIDDEN" });
    expect(await auditOperations(id)).toEqual(["curriculum.exam_session.create", "curriculum.exam_session.published"]);
  });

  it("validates dates and series codes", async () => {
    const chain = await createCurriculumChain({ topicCount: 0, lessonsPerTopic: 0 });
    await expect(
      createExamSession(editor, sessionInput(chain.qualification.id, { startsOn: "2027-11-30", endsOn: "2027-11-01", seriesCode: "!", year: "2031" })),
    ).rejects.toMatchObject({ code: "VALIDATION", fieldErrors: { endsOn: expect.any(Array), seriesCode: expect.any(Array) } });
    await expect(createExamSession(editor, sessionInput(chain.qualification.id, { year: "2031" }))).rejects.toMatchObject({
      code: "VALIDATION",
      fieldErrors: { year: expect.any(Array) },
    });
  });

  it("confirms dates with who/when and makes changed dates provisional again", async () => {
    const chain = await createCurriculumChain({ topicCount: 0, lessonsPerTopic: 0 });
    const input = sessionInput(chain.qualification.id);
    const { id } = await createExamSession(editor, input);
    await setExamSessionStatus(admin, { id, status: "PUBLISHED" });
    await expect(confirmExamSessionDates(editor, { id, sourceUrl: "https://example.org/timetable" })).rejects.toMatchObject({ code: "FORBIDDEN" });
    await expect(confirmExamSessionDates(admin, { id, sourceUrl: "ftp://example.org" })).rejects.toMatchObject({ code: "VALIDATION" });
    await confirmExamSessionDates(admin, { id, sourceUrl: "https://example.org/timetable" });
    let session = await getExamSession(admin, id);
    expect(session).toMatchObject({ isProvisional: false, sourceUrl: "https://example.org/timetable", canConfirm: false });
    expect(session.confirmedAt).toBeInstanceOf(Date);
    expect(session.confirmedByName).toBe("Test");
    await expect(confirmExamSessionDates(admin, { id, sourceUrl: "https://example.org/timetable" })).rejects.toMatchObject({ code: "CONFLICT" });

    // Editing other fields keeps the confirmation; moving the dates resets it.
    expect(await updateExamSession(admin, { ...input, id, name: "Oct/Nov 2027", sourceUrl: "https://example.org/timetable" })).toMatchObject({ becameProvisional: false });
    expect(await updateExamSession(admin, { ...input, id, startsOn: "2027-10-26", sourceUrl: "https://example.org/timetable" })).toMatchObject({ becameProvisional: true });
    session = await getExamSession(admin, id);
    expect(session).toMatchObject({ isProvisional: true, confirmedAt: null, confirmedByName: null, startsOn: "2027-10-26" });
    expect((await auditRowsFor(id)).map((row) => row.action)).toContain("curriculum.update");
  });

  it("refuses to unpublish a session students target, but allows cancelling it", async () => {
    const chain = await createCurriculumChain({ topicCount: 0, lessonsPerTopic: 0 });
    const { id } = await createExamSession(editor, sessionInput(chain.qualification.id));
    await setExamSessionStatus(admin, { id, status: "PUBLISHED" });
    await createStudent({
      student: { isMinor: false, countryId: chain.country.id, examBoardId: chain.examBoard.id, qualificationId: chain.qualification.id },
    }).then(({ user }) => db.student.update({ where: { userId: user.id }, data: { targetExamSessionId: id } }));
    await expect(setExamSessionStatus(admin, { id, status: "DRAFT" })).rejects.toMatchObject({ code: "CONFLICT", message: expect.stringMatching(/target/) });
    await expect(setExamSessionStatus(admin, { id, status: "CANCELLED" })).resolves.toMatchObject({ status: "CANCELLED", targeting: 1 });
    await expect(setExamSessionStatus(admin, { id, status: "DRAFT" })).rejects.toMatchObject({ code: "CONFLICT" });
    await setExamSessionStatus(admin, { id, status: "ARCHIVED" });
    await expect(updateExamSession(admin, { ...sessionInput(chain.qualification.id), id })).rejects.toMatchObject({ code: "CONFLICT" });
    const rows = await auditRowsFor(id);
    expect(rows.find((row) => (row.metadata as { operation?: string }).operation === "curriculum.exam_session.cancelled")?.action).toBe("curriculum.retire");
  });

  it("lists sessions with filters", async () => {
    const chain = await createCurriculumChain({ topicCount: 0, lessonsPerTopic: 0 });
    const a = await createExamSession(editor, sessionInput(chain.qualification.id, { name: "June 2028", year: "2028", startsOn: "2028-05-10", endsOn: "2028-06-20" }));
    const b = await createExamSession(editor, sessionInput(chain.qualification.id));
    await setExamSessionStatus(admin, { id: b.id, status: "PUBLISHED" });
    const all = await listExamSessions(editor, { qualificationId: chain.qualification.id });
    expect(all.items.map((row) => row.id)).toEqual([a.id, b.id]);
    expect((await listExamSessions(editor, { qualificationId: chain.qualification.id, status: "PUBLISHED" })).items.map((row) => row.id)).toEqual([b.id]);
    expect((await listExamSessions(editor, { qualificationId: chain.qualification.id, year: "2028" })).items.map((row) => row.startsOn)).toEqual(["2028-05-10"]);
    await expect(listExamSessions(student, {})).rejects.toMatchObject({ code: "FORBIDDEN" });
  });
});
