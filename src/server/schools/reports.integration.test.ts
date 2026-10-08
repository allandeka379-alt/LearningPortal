import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { addDays, localDateString } from "@/lib/dates";
import { addDailyActivity, createAttempt, createCurriculum, enrol, harareTime, type CurriculumFixture } from "@/server/analytics/testing/fixtures";
import { db } from "@/server/db";
import { LocalDriver, setStorageDriver } from "@/server/lib/storage";
import { createClass } from "../../../tests/factories/index";
import { expireSchoolReports, listSchoolReports, openSchoolReport, requestSchoolReport, runSchoolReport } from "./reports";
import { errorCodeOf, rawActor, schoolWithAdmin, studentOf } from "./testing";

/**
 * School reports (§23 generate reports): request → background generation into a PRIVATE file → download only by the
 * school's admins (audited) → expiry. Negative cases: another school's admin, a removed admin, a suspended school,
 * future periods, classes of another school.
 */

const TODAY = localDateString(new Date(), "Africa/Harare");
let storageRoot: string;
let storage: LocalDriver;
let maths: CurriculumFixture;

beforeAll(async () => {
  storageRoot = await mkdtemp(path.join(os.tmpdir(), "school-reports-"));
  storage = new LocalDriver(storageRoot);
  setStorageDriver(storage);
  maths = await createCurriculum({ topicCount: 1 });
});

afterAll(async () => {
  setStorageDriver(null);
  await rm(storageRoot, { recursive: true, force: true });
});

async function readAll(stream: ReadableStream<Uint8Array>): Promise<string> {
  const chunks: Uint8Array[] = [];
  const reader = stream.getReader();
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
  }
  return new TextDecoder().decode(Buffer.concat(chunks));
}

describe("school reports", () => {
  it("generates a class-results CSV from the roster and serves it to the school's admins only", async () => {
    const { school, admin, adminActor } = await schoolWithAdmin();
    const student = await studentOf(school.id, { firstName: "Tendai", lastName: "Moyo" });
    await db.schoolMember.update({ where: { id: student.member.id }, data: { studentNumber: "=HYPERLINK(1)" } });
    await enrol(student.user.id, maths);
    await createClass({ schoolId: school.id, subjectId: maths.subjectId, name: "4A Maths", studentUserIds: [student.user.id] });
    await createAttempt({
      userId: student.user.id,
      curriculum: maths,
      mode: "SUBJECT_TEST",
      startedAt: harareTime(addDays(TODAY, -3), 9),
      submittedAt: harareTime(addDays(TODAY, -3), 10),
      percentage: 72,
    });
    await addDailyActivity(student.user.id, addDays(TODAY, -3), { studySeconds: 1800, questionsAttempted: 12 });
    const other = await schoolWithAdmin();
    await studentOf(other.school.id, { firstName: "Outsider" });

    const { reportId } = await requestSchoolReport(adminActor!, { schoolId: school.id, kind: "class_results", periodStart: addDays(TODAY, -10), periodEnd: addDays(TODAY, -1) });
    const queued = await db.schoolReport.findUniqueOrThrow({ where: { id: reportId }, include: { job: true } });
    expect(queued).toMatchObject({ status: "QUEUED", requestedById: admin.id, schoolId: school.id });
    expect(queued.job).toMatchObject({ type: "schools.generateReport", status: "PENDING" });

    expect(await runSchoolReport(reportId, { attempt: 1, maxAttempts: 3 }, { storage })).toMatchObject({ status: "READY" });
    const ready = await db.schoolReport.findUniqueOrThrow({ where: { id: reportId }, include: { mediaAsset: true } });
    expect(ready.status).toBe("READY");
    expect(ready.mediaAsset).toMatchObject({ purpose: "REPORT_EXPORT", visibility: "PRIVATE", mimeType: "text/csv", uploadedById: null });
    expect(ready.expiresAt!.getTime()).toBeGreaterThan(Date.now() + 29 * 86_400_000);
    // Idempotent: a second run does nothing.
    expect(await runSchoolReport(reportId, { attempt: 1, maxAttempts: 3 }, { storage })).toEqual({ status: "READY" });

    const list = await listSchoolReports(adminActor!, school.id);
    expect(list).toEqual([expect.objectContaining({ id: reportId, status: "READY", title: "Class results" })]);

    const file = await openSchoolReport(adminActor!, { schoolId: school.id, reportId });
    const text = await readAll(file.stream);
    expect(file.filename).toMatch(/^class-results-\d{4}-\d{2}-\d{2}-to-\d{4}-\d{2}-\d{2}\.csv$/);
    expect(text).toContain("Class,Subject,Academic year,Student,Student number");
    expect(text).toContain(`4A Maths,${maths.subjectName},2026,Tendai Moyo`);
    expect(text).toContain("Tendai Moyo");
    expect(text).toContain("72.0");
    expect(text).toContain("'=HYPERLINK(1)");
    expect(text).not.toContain("Outsider");
    expect(await db.auditLog.count({ where: { entityType: "SchoolReport", entityId: reportId, action: "school.report.download" } })).toBe(1);

    // Nobody else can download it (NOT_FOUND, so ids cannot be probed).
    expect(await errorCodeOf(openSchoolReport(other.adminActor!, { schoolId: school.id, reportId }))).toBe("NOT_FOUND");
    expect(await errorCodeOf(openSchoolReport(other.adminActor!, { schoolId: other.school.id, reportId }))).toBe("NOT_FOUND");
    await db.school.update({ where: { id: school.id }, data: { status: "SUSPENDED" } });
    expect(await errorCodeOf(openSchoolReport(rawActor(admin.id), { schoolId: school.id, reportId }))).toBe("NOT_FOUND");
    await db.school.update({ where: { id: school.id }, data: { status: "ACTIVE" } });

    // Expiry deletes the file and keeps the row.
    expect(await expireSchoolReports({ now: new Date(Date.now() + 31 * 86_400_000), storage })).toMatchObject({ expired: expect.any(Number) });
    const expired = await db.schoolReport.findUniqueOrThrow({ where: { id: reportId } });
    expect(expired).toMatchObject({ status: "EXPIRED", mediaAssetId: null });
    expect(await storage.exists(ready.mediaAsset!.storageKey)).toBe(false);
    expect(await errorCodeOf(openSchoolReport(adminActor!, { schoolId: school.id, reportId }))).toBe("NOT_FOUND");
  });

  it("builds engagement and readiness reports", async () => {
    const { school, adminActor } = await schoolWithAdmin();
    const student = await studentOf(school.id, { firstName: "Rudo", lastName: "Ncube" });
    await enrol(student.user.id, maths, { targetGrade: "B" });
    await addDailyActivity(student.user.id, addDays(TODAY, -2), { studySeconds: 3600, questionsAttempted: 20 });
    for (const kind of ["engagement", "exam_readiness"] as const) {
      const { reportId } = await requestSchoolReport(adminActor!, { schoolId: school.id, kind, periodStart: addDays(TODAY, -7), periodEnd: addDays(TODAY, -1) });
      await runSchoolReport(reportId, { attempt: 1, maxAttempts: 1 }, { storage });
      const text = await readAll((await openSchoolReport(adminActor!, { schoolId: school.id, reportId })).stream);
      expect(text).toContain("Rudo Ncube");
      if (kind === "engagement") expect(text).toMatch(/Rudo Ncube,,,,1,60,20,/);
      else expect(text).toContain(",B,");
    }
  });

  it("validates requests and refuses other schools", async () => {
    const { school, adminActor } = await schoolWithAdmin();
    const other = await schoolWithAdmin();
    const foreignClass = await createClass({ schoolId: other.school.id });
    expect(await errorCodeOf(requestSchoolReport(adminActor!, { schoolId: school.id, kind: "engagement", periodStart: TODAY, periodEnd: addDays(TODAY, 3) }))).toBe("VALIDATION");
    expect(await errorCodeOf(requestSchoolReport(adminActor!, { schoolId: school.id, kind: "engagement", periodStart: addDays(TODAY, -1), periodEnd: addDays(TODAY, -5) }))).toBe("VALIDATION");
    expect(await errorCodeOf(requestSchoolReport(adminActor!, { schoolId: school.id, kind: "nonsense", periodStart: addDays(TODAY, -5), periodEnd: addDays(TODAY, -1) }))).toBe("VALIDATION");
    expect(
      await errorCodeOf(requestSchoolReport(adminActor!, { schoolId: school.id, kind: "engagement", periodStart: addDays(TODAY, -5), periodEnd: addDays(TODAY, -1), classIds: [foreignClass.class.id] })),
    ).toBe("VALIDATION");
    expect(await errorCodeOf(requestSchoolReport(other.adminActor!, { schoolId: school.id, kind: "engagement", periodStart: addDays(TODAY, -5), periodEnd: addDays(TODAY, -1) }))).toBe("FORBIDDEN");
    expect(await errorCodeOf(listSchoolReports(other.adminActor!, school.id))).toBe("FORBIDDEN");
  });

  it("marks a report FAILED on the last attempt and back to QUEUED before it", async () => {
    const { school, adminActor } = await schoolWithAdmin();
    const { reportId } = await requestSchoolReport(adminActor!, { schoolId: school.id, kind: "engagement", periodStart: addDays(TODAY, -5), periodEnd: addDays(TODAY, -1) });
    await db.schoolReport.update({ where: { id: reportId }, data: { parameters: { format: "PDF" } } });
    await expect(runSchoolReport(reportId, { attempt: 1, maxAttempts: 2 }, { storage })).rejects.toThrow();
    expect((await db.schoolReport.findUniqueOrThrow({ where: { id: reportId } })).status).toBe("QUEUED");
    expect(await runSchoolReport(reportId, { attempt: 2, maxAttempts: 2 }, { storage })).toEqual({ status: "FAILED" });
    expect(await db.schoolReport.findUniqueOrThrow({ where: { id: reportId } })).toMatchObject({ status: "FAILED", error: expect.stringContaining("could not be generated") });
  });
});
