import { randomUUID } from "node:crypto";
import { beforeAll, describe, expect, it } from "vitest";
import { db } from "@/server/db";
import { addDays, localDateString, type LocalDate } from "@/lib/dates";
import { assertSchoolAdmin, isSchoolAdmin } from "./access";
import { getSchoolAnalytics } from "./school";
import {
  addAssignmentProgress,
  addClassMember,
  addClassTeacher,
  addDailyActivity,
  addSchoolMember,
  addSubjectProgress,
  addTopicMastery,
  createAssignment,
  createAttempt,
  createClass,
  createCurriculum,
  createSchool,
  createUser,
  enrol,
  harareTime,
  type CurriculumFixture,
  type SchoolFixture,
} from "./testing/fixtures";

/**
 * §23 school analytics on a small school: 4 current students (+1 removed, +1 outsider who must never count), two
 * classes, two teachers. Every query is scoped to the school roster, so exact values are asserted.
 */

const NOW = new Date();
const TODAY: LocalDate = localDateString(NOW, "Africa/Harare");
const at = (offsetDays: number, hour = 10) => harareTime(addDays(TODAY, offsetDays), hour);
const RANGE = { from: addDays(TODAY, -29), to: TODAY };

let school: SchoolFixture;
let maths: CurriculumFixture;
let science: CurriculumFixture;
const u: Record<string, string> = {};
const classes: Record<string, string> = {};

beforeAll(async () => {
  maths = await createCurriculum({ topicCount: 3, examStartsOn: addDays(TODAY, 100), examProvisional: true });
  science = await createCurriculum({ topicCount: 1, examStartsOn: addDays(TODAY, 200), examProvisional: false });
  school = await createSchool();
  u.t1 = await createUser({ student: false, roles: ["TEACHER"], firstName: "Alice", lastName: "Teacher" });
  u.t2 = await createUser({ student: false, roles: ["TEACHER"], firstName: "Brian", lastName: "Teacher" });
  await addSchoolMember(school.schoolId, u.t1, "TEACHER");
  await addSchoolMember(school.schoolId, u.t2, "TEACHER");
  for (const key of ["st1", "st2", "st3", "st4", "st5", "st6"]) u[key] = await createUser();
  for (const key of ["st1", "st2", "st3", "st4"]) await addSchoolMember(school.schoolId, u[key]!, "STUDENT");
  await addSchoolMember(school.schoolId, u.st5!, "STUDENT", "REMOVED");

  await enrol(u.st1!, maths, { targetGrade: "B" });
  await enrol(u.st2!, maths, { targetGrade: "A" });
  await enrol(u.st3!, maths, { targetGrade: "Z" });
  await enrol(u.st4!, maths);
  await enrol(u.st5!, maths, { targetGrade: "C" });
  await enrol(u.st6!, maths, { targetGrade: "C" });
  await enrol(u.st3!, science);
  await enrol(u.st4!, science);

  classes.k1 = await createClass({ schoolId: school.schoolId, subjectId: maths.subjectId, teacherUserId: u.t1, name: "4A Mathematics" });
  classes.k2 = await createClass({ schoolId: school.schoolId, subjectId: science.subjectId, teacherUserId: u.t2, name: "4B Science" });
  await addClassTeacher(classes.k2, u.t1, "ASSISTANT");
  for (const key of ["st1", "st2", "st3"]) await addClassMember(classes.k1, u[key]!);
  await addClassMember(classes.k1, u.st4!, "PENDING");
  await addClassMember(classes.k2, u.st3!);
  await addClassMember(classes.k2, u.st4!);

  // Rollups (progress, readiness, mock averages) and mastery.
  await addSubjectProgress(u.st1!, maths.subjectId, { readinessPercent: 70, averageMockPercent: 65, lastMockPercent: 65 });
  await addSubjectProgress(u.st2!, maths.subjectId, { readinessPercent: 50, averageMockPercent: 55, lastMockPercent: 55 });
  await addSubjectProgress(u.st3!, maths.subjectId, {});
  await addSubjectProgress(u.st5!, maths.subjectId, { readinessPercent: 99, averageMockPercent: 99, lastMockPercent: 99 });
  await addTopicMastery(u.st1!, maths, 0, { score: 30, attempted: 10, correct: 3 });
  await addTopicMastery(u.st1!, maths, 1, { score: 80, attempted: 10, correct: 8 });
  await addTopicMastery(u.st2!, maths, 0, { score: 45, attempted: 10, correct: 4 });
  await addTopicMastery(u.st2!, maths, 1, { score: 70, attempted: 5, correct: 4 });
  await addTopicMastery(u.st3!, maths, 0, { score: 20, attempted: 5, correct: 1 });
  await addTopicMastery(u.st3!, maths, 2, { score: 95, attempted: 4, correct: 4 });
  await addTopicMastery(u.st5!, maths, 0, { score: 0, attempted: 9, correct: 0 });

  // Results in the range (and some that must not count).
  await createAttempt({ userId: u.st1!, curriculum: maths, mode: "MOCK_EXAM", startedAt: at(-5), submittedAt: at(-5, 11), percentage: 80, gradeIsPass: true, gradeEstimate: "A" });
  await createAttempt({ userId: u.st1!, curriculum: maths, mode: "SUBJECT_TEST", startedAt: at(-2), submittedAt: at(-2, 11), percentage: 40, gradeIsPass: false });
  await createAttempt({ userId: u.st2!, curriculum: maths, mode: "MOCK_EXAM", startedAt: at(-3), submittedAt: at(-3, 11), percentage: 55 });
  await createAttempt({ userId: u.st3!, curriculum: maths, mode: "SUBJECT_TEST", startedAt: at(-1), submittedAt: at(-1, 11), percentage: 45 });
  await createAttempt({ userId: u.st3!, curriculum: science, mode: "MOCK_EXAM", startedAt: at(-1), submittedAt: at(-1, 11), percentage: 75, gradeIsPass: true, gradeEstimate: "A" });
  await createAttempt({ userId: u.st4!, curriculum: maths, mode: "QUIZ", startedAt: at(-4), submittedAt: at(-4, 11), percentage: 90 });
  await createAttempt({ userId: u.st5!, curriculum: maths, mode: "MOCK_EXAM", startedAt: at(-1), submittedAt: at(-1, 11), percentage: 100, gradeIsPass: true });
  await createAttempt({ userId: u.st6!, curriculum: maths, mode: "MOCK_EXAM", startedAt: at(-1), submittedAt: at(-1, 11), percentage: 5, gradeIsPass: false });
  await createAttempt({ userId: u.st1!, curriculum: maths, mode: "MOCK_EXAM", startedAt: at(-40), submittedAt: at(-40, 11), percentage: 30, gradeIsPass: false });

  // Engagement.
  await addDailyActivity(u.st1!, addDays(TODAY, -1), { studySeconds: 600, questionsAttempted: 5 });
  await addDailyActivity(u.st1!, addDays(TODAY, -2), { studySeconds: 300 });
  await addDailyActivity(u.st1!, addDays(TODAY, -40), { studySeconds: 3000 });
  await addDailyActivity(u.st2!, addDays(TODAY, -1), { studySeconds: 1200, questionsAttempted: 10 });
  await addDailyActivity(u.st3!, addDays(TODAY, -1), { freezeOnly: true });
  await addDailyActivity(u.st5!, addDays(TODAY, -1), { studySeconds: 5000 });

  // Assignments and teacher marking.
  const assignment = await createAssignment({ classId: classes.k1, teacherUserId: u.t1, curriculum: maths, publishedAt: at(-10) });
  await addAssignmentProgress(assignment, u.st1!, "SUBMITTED", 70);
  await addAssignmentProgress(assignment, u.st2!, "NOT_STARTED");
  await addAssignmentProgress(assignment, u.st3!, "LATE", 40);
  await createAssignment({ classId: classes.k1, teacherUserId: u.t1, curriculum: maths, publishedAt: null });
  const practice = await createAttempt({
    userId: u.st1!, curriculum: maths, mode: "PRACTICE", startedAt: at(-3), submittedAt: at(-3, 11),
    answers: [{ correct: true }, { correct: false }],
  });
  for (const position of [1, 2]) {
    await db.questionAttemptMarking.create({
      data: { attemptId: practice, position, markedById: u.t1, source: "TEACHER", resultingStatus: "TEACHER_MARKED", marksAwarded: 1, createdAt: at(-3, 12) },
    });
  }
  // Marking the same teacher did for a student who is NOT on this school's roster (e.g. private tutoring): never counted.
  const outside = await createAttempt({
    userId: u.st6!, curriculum: maths, mode: "PRACTICE", startedAt: at(-3), submittedAt: at(-3, 11), answers: [{ correct: true }],
  });
  await db.questionAttemptMarking.create({
    data: { attemptId: outside, position: 1, markedById: u.t1, source: "TEACHER", resultingStatus: "TEACHER_MARKED", marksAwarded: 1, createdAt: at(-3, 12) },
  });
});

describe("getSchoolAnalytics", () => {
  it("reports the roster and average score by subject (current students only)", async () => {
    const result = await getSchoolAnalytics({ schoolId: school.schoolId }, RANGE, { now: NOW });
    expect(result.roster).toEqual({ students: 4, teachers: 2, classes: 2 });
    expect(result.averageScoreBySubject.overall).toEqual({ scoredAttempts: 6, averageScorePct: 64.2 });
    expect(result.averageScoreBySubject.subjects).toEqual(
      expect.arrayContaining([
        { subjectId: maths.subjectId, subjectName: maths.subjectName, scoredAttempts: 5, students: 4, averageScorePct: 62 },
        { subjectId: science.subjectId, subjectName: science.subjectName, scoredAttempts: 1, students: 1, averageScorePct: 75 },
      ]),
    );
  });

  it("estimates the pass rate from each student's latest mock / subject test", async () => {
    const { passRate } = await getSchoolAnalytics({ schoolId: school.schoolId }, RANGE, { now: NOW });
    expect(passRate.passMarkPercent).toBeNull();
    expect(passRate.overall).toEqual({ assessed: 4, passed: 2, ratePercent: 50, unknown: 0, isEstimate: true });
    const bySubject = Object.fromEntries(passRate.subjects.map((s) => [s.subjectId, [s.assessed, s.passed, s.ratePercent]]));
    expect(bySubject[maths.subjectId]).toEqual([3, 1, 33.3]); // st1 latest 40 (fail at marking), st2 55 ≥ C, st3 45 < C
    expect(bySubject[science.subjectId]).toEqual([1, 1, 100]);
    expect(passRate.basisNote).toMatch(/estimate/i);
  });

  it("uses the school pass mark when configured", async () => {
    await db.school.update({ where: { id: school.schoolId }, data: { settings: { version: 1, passMarkPercent: 40 } } });
    try {
      const { passRate } = await getSchoolAnalytics({ schoolId: school.schoolId }, RANGE, { now: NOW });
      expect(passRate.passMarkPercent).toBe(40);
      expect(passRate.overall).toMatchObject({ assessed: 4, passed: 4, ratePercent: 100 });
    } finally {
      await db.school.update({ where: { id: school.schoolId }, data: { settings: { version: 1 } } });
    }
  });

  it("lists the weakest topics from current mastery", async () => {
    const { topicPerformance } = await getSchoolAnalytics({ schoolId: school.schoolId }, RANGE, { now: NOW, minStudentsPerTopic: 2 });
    expect(topicPerformance).toEqual([
      {
        topicId: maths.topicIds[0], topicName: maths.topicNames[0], subjectId: maths.subjectId, subjectName: maths.subjectName,
        students: 3, averageMastery: 31.7, weakStudents: 3, questionsAttempted: 25, correctRatePct: 32,
      },
      {
        topicId: maths.topicIds[1], topicName: maths.topicNames[1], subjectId: maths.subjectId, subjectName: maths.subjectName,
        students: 2, averageMastery: 75, weakStudents: 0, questionsAttempted: 15, correctRatePct: 80,
      },
    ]);
  });

  it("measures engagement over the range with real zero days", async () => {
    const { engagement } = await getSchoolAnalytics({ schoolId: school.schoolId }, RANGE, { now: NOW });
    expect(engagement).toMatchObject({
      rosterSize: 4,
      activeStudents: 2,
      activeStudentsPct: 50,
      studyMinutes: 35,
      questionsAttempted: 15,
      averageStudyMinutesPerActiveStudent: 17.5,
    });
    expect(engagement.daily).toHaveLength(30);
    expect(engagement.daily.find((d) => d.date === addDays(TODAY, -1))).toEqual({ date: addDays(TODAY, -1), activeStudents: 2, studyMinutes: 30 });
    expect(engagement.daily.find((d) => d.date === addDays(TODAY, -2))).toEqual({ date: addDays(TODAY, -2), activeStudents: 1, studyMinutes: 5 });
    expect(engagement.daily.find((d) => d.date === TODAY)).toEqual({ date: TODAY, activeStudents: 0, studyMinutes: 0 });
  });

  it("reports days that have not happened yet as null, never as zero", async () => {
    const { engagement } = await getSchoolAnalytics(
      { schoolId: school.schoolId },
      { from: addDays(TODAY, -1), to: addDays(TODAY, 2) },
      { now: NOW },
    );
    expect(engagement.daily).toEqual([
      { date: addDays(TODAY, -1), activeStudents: 2, studyMinutes: 30 },
      { date: TODAY, activeStudents: 0, studyMinutes: 0 },
      { date: addDays(TODAY, 1), activeStudents: null, studyMinutes: null },
      { date: addDays(TODAY, 2), activeStudents: null, studyMinutes: null },
    ]);
  });

  it("presents teacher performance as class outcomes", async () => {
    const { teacherPerformance } = await getSchoolAnalytics({ schoolId: school.schoolId }, RANGE, { now: NOW });
    expect(teacherPerformance.framing).toBe("CLASS_OUTCOMES");
    expect(teacherPerformance.teachers.map((t) => [t.teacherUserId, t.teacherName, t.answersMarked])).toEqual([
      [u.t1, "Alice Teacher", 2],
      [u.t2, "Brian Teacher", 0],
    ]);
    const alice = teacherPerformance.teachers[0]!;
    expect(alice.classes).toEqual([
      {
        classId: classes.k1, className: "4A Mathematics", subjectId: maths.subjectId, subjectName: maths.subjectName, teacherRole: "LEAD",
        students: 3, activeStudents: 2, activeStudentsPct: 66.7, scoredAttempts: 4, averageScorePct: 55,
        assignmentsSet: 1, assignmentCompletionPct: 66.7,
      },
      {
        classId: classes.k2, className: "4B Science", subjectId: science.subjectId, subjectName: science.subjectName, teacherRole: "ASSISTANT",
        students: 2, activeStudents: 0, activeStudentsPct: 0, scoredAttempts: 1, averageScorePct: 75,
        assignmentsSet: 0, assignmentCompletionPct: null,
      },
    ]);
    expect(teacherPerformance.teachers[1]!.classes.map((c) => [c.classId, c.teacherRole])).toEqual([[classes.k2, "LEAD"]]);
  });

  it("reports examination readiness against targets with the exam countdown", async () => {
    const { examinationReadiness } = await getSchoolAnalytics({ schoolId: school.schoolId }, RANGE, { now: NOW });
    const mathsReadiness = examinationReadiness.find((r) => r.subjectId === maths.subjectId);
    expect(mathsReadiness).toEqual({
      subjectId: maths.subjectId,
      subjectName: maths.subjectName,
      studentsEnrolled: 4,
      averageReadinessPct: 60,
      studentsWithReadiness: 2,
      averageMockPct: 60,
      studentsWithMock: 2,
      studentsWithTarget: 2, // "B" and "A"; "Z" is not a band of the scheme
      onTrack: 1, // st1 65 ≥ 60; st2 55 < 70
      onTrackPct: 50,
      nextExam: {
        examSessionId: maths.examSessionId, name: expect.any(String), startsOn: addDays(TODAY, 100), daysUntil: 100,
        isProvisional: true, studentsTargeting: 4,
      },
    });
    const scienceReadiness = examinationReadiness.find((r) => r.subjectId === science.subjectId);
    expect(scienceReadiness).toMatchObject({
      studentsEnrolled: 2, averageReadinessPct: null, averageMockPct: null, studentsWithTarget: 0, onTrackPct: null,
      nextExam: { daysUntil: 200, isProvisional: false, studentsTargeting: 2 },
    });
  });

  it("returns honest empty values for a school without students", async () => {
    const empty = await createSchool();
    const result = await getSchoolAnalytics({ schoolId: empty.schoolId }, RANGE, { now: NOW });
    expect(result.roster).toEqual({ students: 0, teachers: 0, classes: 0 });
    expect(result.averageScoreBySubject.overall).toEqual({ scoredAttempts: 0, averageScorePct: null });
    expect(result.passRate.overall.ratePercent).toBeNull();
    expect(result.engagement.activeStudentsPct).toBeNull();
    expect(result.teacherPerformance.teachers).toEqual([]);
    expect(result.examinationReadiness).toEqual([]);
  });

  it("validates the scope and range", async () => {
    await expect(getSchoolAnalytics({ schoolId: "not-a-uuid" }, RANGE)).rejects.toMatchObject({ code: "VALIDATION" });
    await expect(getSchoolAnalytics({ schoolId: randomUUID() }, RANGE)).rejects.toMatchObject({ code: "NOT_FOUND" });
    await expect(getSchoolAnalytics({ schoolId: school.schoolId }, { from: TODAY, to: addDays(TODAY, -1) })).rejects.toMatchObject({
      code: "VALIDATION",
    });
  });
});

describe("school access", () => {
  it("only an ACTIVE school admin of that school may view its analytics", async () => {
    expect(await isSchoolAdmin(school.adminUserId, school.schoolId)).toBe(true);
    expect(await isSchoolAdmin(u.t1!, school.schoolId)).toBe(false);
    const other = await createSchool();
    expect(await isSchoolAdmin(school.adminUserId, other.schoolId)).toBe(false);
    await expect(assertSchoolAdmin({ userId: u.t1! }, school.schoolId)).rejects.toMatchObject({ code: "FORBIDDEN" });
    await expect(assertSchoolAdmin({ userId: school.adminUserId }, school.schoolId)).resolves.toBeUndefined();
  });

  it("a SUSPENDED or CLOSED school's admins lose access (same rule as the session's school memberships)", async () => {
    const suspended = await createSchool();
    expect(await isSchoolAdmin(suspended.adminUserId, suspended.schoolId)).toBe(true);
    await db.school.update({ where: { id: suspended.schoolId }, data: { status: "SUSPENDED" } });
    expect(await isSchoolAdmin(suspended.adminUserId, suspended.schoolId)).toBe(false);
    await expect(assertSchoolAdmin({ userId: suspended.adminUserId }, suspended.schoolId)).rejects.toMatchObject({ code: "FORBIDDEN" });
  });
});
