import { randomUUID } from "node:crypto";
import { beforeAll, describe, expect, it } from "vitest";
import { db } from "@/server/db";
import { addDays, localDateString, type LocalDate } from "@/lib/dates";
import { getParentLinkPermissions, type ParentPermissions } from "./access";
import { getChildOverview } from "./parent";
import {
  addDailyActivity,
  addStudySession,
  addSubjectProgress,
  addTopicMastery,
  createAttempt,
  createCurriculum,
  createUser,
  enrol,
  harareTime,
  type CurriculumFixture,
} from "./testing/fixtures";

/** §21 parent overview of one child, with the link's permission flags deciding which sections exist. */

const NOW = new Date();
const TODAY: LocalDate = localDateString(NOW, "Africa/Harare");
const at = (offsetDays: number, hour = 10) => harareTime(addDays(TODAY, offsetDays), hour);
const ALL: ParentPermissions = { canViewProgress: true, canViewStudyActivity: true, canViewTestResults: true };

let maths: CurriculumFixture;
let science: CurriculumFixture;
let history: CurriculumFixture;
let studentId: string;
let parentId: string;
let otherParentId: string;

beforeAll(async () => {
  maths = await createCurriculum({ topicCount: 3, examStartsOn: addDays(TODAY, 100), examProvisional: true });
  science = await createCurriculum({ topicCount: 1, examStartsOn: addDays(TODAY, 200), examProvisional: false });
  history = await createCurriculum({ topicCount: 1, examStartsOn: addDays(TODAY, 50) });
  studentId = await createUser({ firstName: "Tanaka" });
  parentId = await createUser({ student: false, roles: ["PARENT"], firstName: "Parent" });
  otherParentId = await createUser({ student: false, roles: ["PARENT"], firstName: "Other" });

  await enrol(studentId, maths, { targetGrade: "B" });
  await enrol(studentId, science);
  await enrol(studentId, history, { status: "DROPPED" });

  await addSubjectProgress(studentId, maths.subjectId, {
    progressPercent: 55, syllabusCoveragePercent: 40, topicsTotal: 3, topicsStarted: 2, topicsCompleted: 1,
    questionsAttempted: 20, questionsCorrect: 15, readinessPercent: 62, predictedGrade: "B",
    averageScorePercent: 72, averageMockPercent: 68, lastMockPercent: 70,
  });
  await db.subjectProgress.update({
    where: { userId_subjectId: { userId: studentId, subjectId: maths.subjectId } },
    data: { lessonsTotal: 10, lessonsCompleted: 4, bestMockPercent: 75, assessmentsCompleted: 3, mockExamsCompleted: 2 },
  });
  await addTopicMastery(studentId, maths, 0, { score: 30, attempted: 5, correct: 1 });
  await addTopicMastery(studentId, maths, 1, { score: 50, attempted: 4, correct: 2 });
  await addTopicMastery(studentId, maths, 2, { score: 80, attempted: 5, correct: 4 });
  await addTopicMastery(studentId, science, 0, { score: 0, attempted: 0, correct: 0 }); // not practised: not a weak area

  await addDailyActivity(studentId, addDays(TODAY, -1), { studySeconds: 600, questionsAttempted: 5 });
  await addDailyActivity(studentId, addDays(TODAY, -3), { freezeOnly: true });
  await addDailyActivity(studentId, addDays(TODAY, -5), { studySeconds: 1200 });
  await addDailyActivity(studentId, addDays(TODAY, -20), { studySeconds: 300 });
  await addDailyActivity(studentId, addDays(TODAY, -40), { studySeconds: 9000 });
  await addStudySession(studentId, maths.subjectId, at(-1), addDays(TODAY, -1), 600);
  await addStudySession(studentId, science.subjectId, at(-5), addDays(TODAY, -5), 1200);
  await addStudySession(studentId, null, at(-20), addDays(TODAY, -20), 300);
  await addStudySession(studentId, maths.subjectId, at(-40), addDays(TODAY, -40), 9000);
  await db.learnerStats.create({ data: { userId: studentId, currentStreak: 2, longestStreak: 5 } });

  await createAttempt({ userId: studentId, curriculum: maths, mode: "MOCK_EXAM", startedAt: at(-3), submittedAt: at(-3, 11), percentage: 70, gradeIsPass: true, gradeEstimate: "B" });
  await createAttempt({ userId: studentId, curriculum: science, mode: "QUIZ", startedAt: at(-1), submittedAt: at(-1, 11), status: "AWAITING_MARKING" });
  await createAttempt({ userId: studentId, curriculum: maths, mode: "PRACTICE", startedAt: at(0, 0), submittedAt: at(0, 0), answers: [{ correct: true }] });

  const linkedAt = new Date();
  await db.parentStudentLink.create({
    data: {
      parentUserId: parentId, studentUserId: studentId, status: "ACTIVE", initiatedBy: "STUDENT", consentBasis: "STUDENT_CODE",
      createdAt: linkedAt, studentConsentAt: linkedAt, activatedAt: linkedAt, canViewTestResults: false,
    },
  });
  await db.parentStudentLink.create({
    data: {
      parentUserId: otherParentId, studentUserId: studentId, status: "REVOKED", initiatedBy: "PARENT", revokedAt: linkedAt,
    },
  });
});

describe("getChildOverview", () => {
  it("returns every section when the link allows it", async () => {
    const overview = await getChildOverview(studentId, { permissions: ALL, now: NOW });
    expect(overview.visibleSections).toEqual(["subjects", "examCountdown", "progress", "weakAreas", "studyTime", "activityCalendar", "testResults"]);
    expect(overview.student).toEqual({ userId: studentId, firstName: "Tanaka", timezone: "Africa/Harare" });
    expect(overview.subjects.map((s) => [s.subjectId, s.targetGrade])).toEqual(
      expect.arrayContaining([[maths.subjectId, "B"], [science.subjectId, null]]),
    );
    expect(overview.subjects).toHaveLength(2); // the dropped subject is not listed
  });

  it("counts down to the soonest target exam session and marks provisional dates", async () => {
    const { examCountdown } = await getChildOverview(studentId, { permissions: ALL, now: NOW });
    expect(examCountdown.sessions.map((s) => [s.examSessionId, s.startsOn, s.daysUntil, s.isProvisional, s.subjects])).toEqual([
      [maths.examSessionId, addDays(TODAY, 100), 100, true, [maths.subjectName]],
      [science.examSessionId, addDays(TODAY, 200), 200, false, [science.subjectName]],
    ]);
    expect(examCountdown.next?.examSessionId).toBe(maths.examSessionId);
  });

  it("never shows a DRAFT exam session, even when the student targets it", async () => {
    const draft = await db.examSession.create({
      data: {
        qualificationId: maths.qualificationId,
        name: "Unreviewed series",
        seriesCode: `DRAFT-${randomUUID().slice(0, 8)}`,
        year: Number(addDays(TODAY, 30).slice(0, 4)),
        startsOn: new Date(`${addDays(TODAY, 30)}T00:00:00Z`),
        endsOn: new Date(`${addDays(TODAY, 30)}T00:00:00Z`),
        status: "DRAFT",
      },
    });
    await db.student.update({ where: { userId: studentId }, data: { targetExamSessionId: draft.id } });
    try {
      const { examCountdown } = await getChildOverview(studentId, { permissions: ALL, now: NOW });
      expect(examCountdown.sessions.map((s) => s.examSessionId)).not.toContain(draft.id);
      expect(examCountdown.next?.examSessionId).toBe(maths.examSessionId);
    } finally {
      await db.student.update({ where: { userId: studentId }, data: { targetExamSessionId: null } });
    }
  });

  it("reports progress per subject and weak areas from the pinned syllabus", async () => {
    const overview = await getChildOverview(studentId, { permissions: ALL, now: NOW });
    expect(overview.progress?.find((p) => p.subjectId === maths.subjectId)).toEqual({
      subjectId: maths.subjectId, subjectName: maths.subjectName, progressPct: 55, syllabusCoveragePct: 40,
      topicsStarted: 2, topicsCompleted: 1, topicsTotal: 3, lessonsCompleted: 4, questionsAttempted: 20, correctRatePct: 75,
      readinessPct: 62, predictedGradeEstimate: "B", lastActivityAt: null,
    });
    expect(overview.progress?.find((p) => p.subjectId === science.subjectId)).toMatchObject({ progressPct: null, correctRatePct: null });
    expect(overview.weakAreas?.map((w) => [w.topicId, w.band, w.score, w.subjectName])).toEqual([
      [maths.topicIds[0], "WEAK", 30, maths.subjectName],
      [maths.topicIds[1], "DEVELOPING", 50, maths.subjectName],
    ]);
  });

  it("reports study time for 7 / 30 days, per subject, and a 30-day activity calendar", async () => {
    const overview = await getChildOverview(studentId, { permissions: ALL, now: NOW });
    expect(overview.studyTime).toEqual({
      last7Days: { minutes: 30, activeDays: 2 },
      last30Days: { minutes: 35, activeDays: 3 },
      bySubjectLast30Days: [
        { subjectId: science.subjectId, subjectName: science.subjectName, minutes: 20 },
        { subjectId: maths.subjectId, subjectName: maths.subjectName, minutes: 10 },
        { subjectId: null, subjectName: null, minutes: 5 },
      ],
      streak: { current: 2, longest: 5 },
    });
    const calendar = overview.activityCalendar!;
    expect(calendar.from).toBe(addDays(TODAY, -29));
    expect(calendar.to).toBe(TODAY);
    expect(calendar.days).toHaveLength(30);
    const day = (offset: number) => calendar.days.find((d) => d.date === addDays(TODAY, offset));
    expect(day(-1)).toEqual({ date: addDays(TODAY, -1), active: true, studyMinutes: 10, questionsAttempted: 5, streakFreezeUsed: false });
    expect(day(-3)).toEqual({ date: addDays(TODAY, -3), active: false, studyMinutes: 0, questionsAttempted: 0, streakFreezeUsed: true });
    expect(day(-2)).toEqual({ date: addDays(TODAY, -2), active: false, studyMinutes: 0, questionsAttempted: 0, streakFreezeUsed: false });
  });

  it("lists recent test results with provisional marks flagged", async () => {
    const { testResults } = await getChildOverview(studentId, { permissions: ALL, now: NOW });
    expect(testResults?.recent.map((r) => [r.subjectId, r.mode, r.percentage, r.gradeEstimate, r.isProvisional])).toEqual([
      [science.subjectId, "QUIZ", null, null, true],
      [maths.subjectId, "MOCK_EXAM", 70, "B", false],
    ]);
    expect(testResults?.bySubject.find((s) => s.subjectId === maths.subjectId)).toEqual({
      subjectId: maths.subjectId, subjectName: maths.subjectName, averageScorePct: 72, averageMockPct: 68, lastMockPct: 70,
      bestMockPct: 75, assessmentsCompleted: 3, mockExamsCompleted: 2,
    });
  });

  it("omits the sections the link does not allow", async () => {
    const noProgress = await getChildOverview(studentId, { permissions: { ...ALL, canViewProgress: false }, now: NOW });
    expect("progress" in noProgress).toBe(false);
    expect("weakAreas" in noProgress).toBe(false);
    expect(noProgress.studyTime).toBeDefined();

    const noActivity = await getChildOverview(studentId, { permissions: { ...ALL, canViewStudyActivity: false }, now: NOW });
    expect("studyTime" in noActivity).toBe(false);
    expect("activityCalendar" in noActivity).toBe(false);

    const noResults = await getChildOverview(studentId, { permissions: { ...ALL, canViewTestResults: false }, now: NOW });
    expect("testResults" in noResults).toBe(false);

    const minimal = await getChildOverview(studentId, {
      permissions: { canViewProgress: false, canViewStudyActivity: false, canViewTestResults: false },
      now: NOW,
    });
    expect(Object.keys(minimal).sort()).toEqual(["examCountdown", "lockedSections", "reportsIncluded", "student", "subjects", "visibleSections"]);
    expect(minimal.visibleSections).toEqual(["subjects", "examCountdown"]);
    expect(minimal.lockedSections).toEqual([]);
    expect(JSON.stringify(minimal)).not.toMatch(/conversation/i);
  });

  it("without detailed reports (the child's parentReports, §31) computes only the basic overview", async () => {
    const basic = await getChildOverview(studentId, { permissions: ALL, includeReports: false, now: NOW });
    expect(basic.reportsIncluded).toBe(false);
    expect(basic.visibleSections).toEqual(["subjects", "examCountdown", "studyTime"]);
    expect(basic.lockedSections).toEqual(["progress", "weakAreas", "activityCalendar", "testResults"]);
    for (const key of ["progress", "weakAreas", "activityCalendar", "testResults"]) expect(key in basic, key).toBe(false);
    expect(basic.studyTime?.last7Days).toBeDefined();
    expect(basic.subjects).toHaveLength(2);
  });

  it("rejects unknown students and malformed input", async () => {
    await expect(getChildOverview(parentId, { permissions: ALL })).rejects.toMatchObject({ code: "NOT_FOUND" });
    await expect(getChildOverview("x", { permissions: ALL })).rejects.toMatchObject({ code: "VALIDATION" });
    await expect(getChildOverview(studentId, { permissions: {} as ParentPermissions })).rejects.toMatchObject({ code: "VALIDATION" });
  });
});

describe("getParentLinkPermissions", () => {
  it("returns the flags of an ACTIVE link only", async () => {
    expect(await getParentLinkPermissions(parentId, studentId)).toEqual({
      canViewProgress: true,
      canViewStudyActivity: true,
      canViewTestResults: false,
    });
    expect(await getParentLinkPermissions(otherParentId, studentId)).toBeNull();
    expect(await getParentLinkPermissions(randomUUID(), studentId)).toBeNull();
  });
});
