import { randomUUID } from "node:crypto";
import { beforeAll, describe, expect, it } from "vitest";
import { db } from "@/server/db";
import { addDays, localDateString, type LocalDate } from "@/lib/dates";
import { assertClassAccess, canViewClass } from "./access";
import { getClassAnalytics, getClassStudentDetail } from "./teacher";
import {
  addAssignmentProgress,
  addClassMember,
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
 * §22 drill-down on a school class (subject = maths) with three ACTIVE students, one PENDING and one REMOVED student
 * (who must never appear), plus a subject-less tutor class spanning two subjects.
 */

const NOW = new Date();
const TODAY: LocalDate = localDateString(NOW, "Africa/Harare");
const at = (offsetDays: number, hour = 10) => harareTime(addDays(TODAY, offsetDays), hour);

let school: SchoolFixture;
let maths: CurriculumFixture;
let science: CurriculumFixture;
const u: Record<string, string> = {};
let K: string;
let K0: string;
const a: Record<string, string> = {};

beforeAll(async () => {
  maths = await createCurriculum({ topicCount: 3 });
  science = await createCurriculum({ topicCount: 1 });
  school = await createSchool();
  u.teacher = await createUser({ student: false, roles: ["TEACHER"], firstName: "Tess" });
  u.otherTeacher = await createUser({ student: false, roles: ["TEACHER"], firstName: "Otto" });
  u.removedTeacher = await createUser({ student: false, roles: ["TEACHER"], firstName: "Remy" });
  u.tutor = await createUser({ student: false, roles: ["TEACHER"], firstName: "Tutu" });
  await addSchoolMember(school.schoolId, u.teacher, "TEACHER");
  await addSchoolMember(school.schoolId, u.otherTeacher, "TEACHER");
  u.st1 = await createUser({ firstName: "Ann", lastName: "A" });
  u.st2 = await createUser({ firstName: "Ben", lastName: "B" });
  u.st3 = await createUser({ firstName: "Cid", lastName: "C" });
  u.st4 = await createUser({ firstName: "Dee", lastName: "D" });
  u.st5 = await createUser({ firstName: "Eve", lastName: "E" });
  u.outsider = await createUser({ firstName: "Out", lastName: "O" });

  K = await createClass({ schoolId: school.schoolId, subjectId: maths.subjectId, teacherUserId: u.teacher, name: "Form 4 Maths" });
  await db.classTeacher.create({ data: { classId: K, userId: u.removedTeacher, role: "ASSISTANT", removedAt: new Date() } });
  for (const key of ["st1", "st2", "st3"]) await addClassMember(K, u[key]!);
  await addClassMember(K, u.st4!, "PENDING");
  await addClassMember(K, u.st5!, "REMOVED");
  K0 = await createClass({ schoolId: null, subjectId: null, teacherUserId: u.tutor, name: "Evening tutoring" });
  await addClassMember(K0, u.st1!);
  await addClassMember(K0, u.st2!);

  for (const key of ["st1", "st2", "st3", "st4", "st5", "outsider"]) await enrol(u[key]!, maths);
  await enrol(u.st1!, science);

  await addSubjectProgress(u.st1!, maths.subjectId, {
    averageScorePercent: 80, progressPercent: 60, averageMockPercent: 70, readinessPercent: 65,
    questionsAttempted: 20, questionsCorrect: 15, topicsTotal: 3, topicsStarted: 2, topicsCompleted: 1,
  });
  await addSubjectProgress(u.st2!, maths.subjectId, { averageScorePercent: 50, progressPercent: 40, questionsAttempted: 10, questionsCorrect: 4 });
  await addSubjectProgress(u.st4!, maths.subjectId, { averageScorePercent: 99, progressPercent: 99 });
  await addSubjectProgress(u.st5!, maths.subjectId, { averageScorePercent: 10, progressPercent: 10 });
  await addSubjectProgress(u.st1!, science.subjectId, { averageScorePercent: 90, progressPercent: 30, questionsAttempted: 5, questionsCorrect: 5 });

  await addTopicMastery(u.st1!, maths, 0, { score: 30, attempted: 10, correct: 3 });
  await addTopicMastery(u.st1!, maths, 1, { score: 85, attempted: 10, correct: 9 });
  await addTopicMastery(u.st2!, maths, 0, { score: 50, attempted: 6, correct: 3 });
  await addTopicMastery(u.st2!, maths, 2, { score: 65, attempted: 4, correct: 3 });
  await addTopicMastery(u.st4!, maths, 1, { score: 10, attempted: 3, correct: 0 });
  await addTopicMastery(u.st5!, maths, 0, { score: 0, attempted: 3, correct: 0 });
  await addTopicMastery(u.st1!, science, 0, { score: 40, attempted: 5, correct: 2 });

  a.A1 = await createAssignment({ classId: K, teacherUserId: u.teacher, curriculum: maths, publishedAt: at(-10), dueAt: at(-5), title: "Algebra quiz" });
  a.A2 = await createAssignment({ classId: K, teacherUserId: u.teacher, curriculum: maths, publishedAt: at(-1), dueAt: at(5), title: "Geometry test" });
  await createAssignment({ classId: K, teacherUserId: u.teacher, curriculum: maths, publishedAt: null, title: "Draft" });
  await addAssignmentProgress(a.A1, u.st1!, "SUBMITTED", 70);
  await addAssignmentProgress(a.A1, u.st2!, "MISSED");
  await addAssignmentProgress(a.A1, u.st3!, "NOT_STARTED");
  await addAssignmentProgress(a.A1, u.st5!, "SUBMITTED", 100);
  await addAssignmentProgress(a.A2, u.st1!, "LATE", 50);
  await addAssignmentProgress(a.A2, u.st2!, "EXCUSED");
  await addAssignmentProgress(a.A2, u.st3!, "SUBMITTED", 90);

  await addDailyActivity(u.st1!, addDays(TODAY, -2), { studySeconds: 600 });
  await addDailyActivity(u.st1!, addDays(TODAY, -40), { studySeconds: 6000 });
  await addDailyActivity(u.st2!, addDays(TODAY, -20), { questionsAttempted: 3, studySeconds: 0 });
  await addDailyActivity(u.st3!, addDays(TODAY, -1), { freezeOnly: true });

  await createAttempt({ userId: u.st1!, curriculum: maths, mode: "MOCK_EXAM", startedAt: at(-3), submittedAt: at(-3, 11), percentage: 70, gradeIsPass: true, gradeEstimate: "A" });
  await createAttempt({ userId: u.st1!, curriculum: maths, mode: "SUBJECT_TEST", startedAt: at(-1), submittedAt: at(-1, 11), status: "AWAITING_MARKING" });
  await createAttempt({ userId: u.st1!, curriculum: science, mode: "QUIZ", startedAt: at(-1), submittedAt: at(-1, 12), percentage: 90 });
  await createAttempt({ userId: u.st1!, curriculum: maths, mode: "PRACTICE", startedAt: at(-1), submittedAt: at(-1, 13), answers: [{ correct: true }] });
});

describe("getClassAnalytics", () => {
  it("drills from class average to subjects, topics and students (ACTIVE members only)", async () => {
    const result = await getClassAnalytics(K, { now: NOW });
    expect(result.class).toEqual({
      classId: K, name: "Form 4 Maths", schoolId: school.schoolId, subjectId: maths.subjectId, subjectName: maths.subjectName, archived: false,
    });
    expect(result.classAverage).toEqual({
      students: 3, averageScorePct: 65, studentsWithScores: 2, averageProgressPct: 50, activeLast7Days: 1, activeLast30Days: 2,
    });
    expect(result.subjects).toHaveLength(1);
    const subject = result.subjects[0]!;
    expect(subject).toMatchObject({
      subjectId: maths.subjectId, studentsEnrolled: 3, averageScorePct: 65, studentsWithScores: 2, averageProgressPct: 50,
      averageMockPct: 70, averageReadinessPct: 65, questionsAttempted: 30, correctRatePct: 63.3,
      syllabusVersions: [{ syllabusId: maths.syllabusId, versionLabel: "2026", isCurrent: true, students: 3 }],
    });
    expect(subject.topics).toEqual([
      {
        topicId: maths.topicIds[0], topicName: maths.topicNames[0], studentsStarted: 2, averageMastery: 40, weakStudents: 2,
        bands: { WEAK: 1, DEVELOPING: 1, COMPETENT: 0, STRONG: 0, MASTERED: 0 }, questionsAttempted: 16, correctRatePct: 37.5,
      },
      {
        topicId: maths.topicIds[2], topicName: maths.topicNames[2], studentsStarted: 1, averageMastery: 65, weakStudents: 0,
        bands: { WEAK: 0, DEVELOPING: 0, COMPETENT: 1, STRONG: 0, MASTERED: 0 }, questionsAttempted: 4, correctRatePct: 75,
      },
      {
        topicId: maths.topicIds[1], topicName: maths.topicNames[1], studentsStarted: 1, averageMastery: 85, weakStudents: 0,
        bands: { WEAK: 0, DEVELOPING: 0, COMPETENT: 0, STRONG: 1, MASTERED: 0 }, questionsAttempted: 10, correctRatePct: 90,
      },
    ]);
    expect(result.students).toEqual([
      {
        userId: u.st1, name: "Ann A", averageScorePct: 80, progressPct: 60, weakTopics: 1,
        assignments: { assigned: 2, completed: 2, completionPct: 100 }, lastActiveDate: addDays(TODAY, -2),
        syllabusVersions: [{ subjectId: maths.subjectId, subjectName: maths.subjectName, syllabusId: maths.syllabusId, versionLabel: "2026", isCurrent: true }],
      },
      {
        userId: u.st2, name: "Ben B", averageScorePct: 50, progressPct: 40, weakTopics: 1,
        assignments: { assigned: 1, completed: 0, completionPct: 0 }, lastActiveDate: addDays(TODAY, -20),
        syllabusVersions: [{ subjectId: maths.subjectId, subjectName: maths.subjectName, syllabusId: maths.syllabusId, versionLabel: "2026", isCurrent: true }],
      },
      {
        userId: u.st3, name: "Cid C", averageScorePct: null, progressPct: null, weakTopics: 0,
        assignments: { assigned: 2, completed: 1, completionPct: 50 }, lastActiveDate: null,
        syllabusVersions: [{ subjectId: maths.subjectId, subjectName: maths.subjectName, syllabusId: maths.syllabusId, versionLabel: "2026", isCurrent: true }],
      },
    ]);
  });

  it("covers every enrolled subject for a subject-less (tutor) class", async () => {
    const result = await getClassAnalytics(K0, { now: NOW });
    expect(result.class.schoolId).toBeNull();
    expect(result.subjects.map((s) => s.subjectId).sort()).toEqual([maths.subjectId, science.subjectId].sort());
    expect(result.subjects.find((s) => s.subjectId === science.subjectId)).toMatchObject({ studentsEnrolled: 1, averageScorePct: 90 });
    expect(result.classAverage.averageScorePct).toBe(73.3); // (80 + 50 + 90) / 3 student-subject results
    expect(result.students.find((s) => s.userId === u.st1)).toMatchObject({ averageScorePct: 85, progressPct: 45, weakTopics: 2 });
  });

  it("reads only the subjects in an explicit scope (a subject-less class's derived scope)", async () => {
    const scoped = await getClassAnalytics(K0, { now: NOW, subjectIds: [science.subjectId] });
    expect(scoped.subjects.map((s) => s.subjectId)).toEqual([science.subjectId]);
    expect(scoped.classAverage.averageScorePct).toBe(90);
    expect(scoped.students.find((s) => s.userId === u.st1)).toMatchObject({ averageScorePct: 90, progressPct: 30 });
    expect(scoped.students.find((s) => s.userId === u.st2)).toMatchObject({ averageScorePct: null, weakTopics: 0 });
    // No work set yet: no subject data at all (never "every subject").
    const empty = await getClassAnalytics(K0, { now: NOW, subjectIds: [] });
    expect(empty.subjects).toEqual([]);
    expect(empty.classAverage.averageScorePct).toBeNull();
    // A class WITH a subject can only be narrowed, never widened.
    expect((await getClassAnalytics(K, { now: NOW, subjectIds: [science.subjectId] })).subjects).toEqual([]);
    const detail = await getClassStudentDetail(K0, u.st1!, { now: NOW, subjectIds: [science.subjectId] });
    expect(detail.subjects.map((s) => s.subjectId)).toEqual([science.subjectId]);
    expect(detail.recentScores.every((s) => s.subjectId === science.subjectId)).toBe(true);
  });

  it("rejects unknown and malformed classes", async () => {
    await expect(getClassAnalytics(randomUUID())).rejects.toMatchObject({ code: "NOT_FOUND" });
    await expect(getClassAnalytics("nope")).rejects.toMatchObject({ code: "VALIDATION" });
  });
});

describe("getClassStudentDetail", () => {
  it("returns scores, mastery by topic, assignment completion and last activity", async () => {
    const detail = await getClassStudentDetail(K, u.st1!, { now: NOW });
    expect(detail.student).toMatchObject({ userId: u.st1, name: "Ann A" });
    expect(detail.subjects).toHaveLength(1);
    expect(detail.subjects[0]).toMatchObject({
      subjectId: maths.subjectId, progressPct: 60, averageScorePct: 80, averageMockPct: 70, readinessPct: 65,
      topicsStarted: 2, topicsCompleted: 1, topicsTotal: 3, questionsAttempted: 20, correctRatePct: 75,
      syllabus: { id: maths.syllabusId, versionLabel: "2026", isCurrent: true },
    });
    expect(detail.subjects[0]!.mastery.map((m) => [m.topicId, m.score, m.band, m.correctRatePct])).toEqual([
      [maths.topicIds[0], 30, "WEAK", 30],
      [maths.topicIds[1], 85, "STRONG", 90],
    ]);
    expect(detail.recentScores.map((s) => [s.mode, s.percentage, s.gradeEstimate, s.isProvisional])).toEqual([
      ["SUBJECT_TEST", null, null, true],
      ["MOCK_EXAM", 70, "A", false],
    ]);
    expect(detail.assignments.summary).toEqual({ assigned: 2, completed: 2, late: 1, missed: 0, completionPct: 100, averageScorePct: 60 });
    expect(detail.assignments.items.map((i) => [i.assignmentId, i.status, i.scorePercent])).toEqual([
      [a.A2, "LATE", 50],
      [a.A1, "SUBMITTED", 70],
    ]);
    expect(detail.activity).toEqual({ lastActiveDate: addDays(TODAY, -2), activeDaysLast30: 1, studyMinutesLast30: 10 });
    expect(JSON.stringify(detail)).not.toMatch(/conversation/i);
  });

  it("refuses students who are not ACTIVE members of the class", async () => {
    for (const key of ["st4", "st5", "outsider"]) {
      await expect(getClassStudentDetail(K, u[key]!)).rejects.toMatchObject({ code: "NOT_FOUND" });
    }
  });
});

describe("class access", () => {
  it("allows current class teachers and the school's admins only", async () => {
    expect(await canViewClass(u.teacher!, K)).toBe(true);
    expect(await canViewClass(school.adminUserId, K)).toBe(true);
    expect(await canViewClass(u.otherTeacher!, K)).toBe(false);
    expect(await canViewClass(u.removedTeacher!, K)).toBe(false);
    expect(await canViewClass(u.st1!, K)).toBe(false);
    expect(await canViewClass(u.tutor!, K0)).toBe(true);
    expect(await canViewClass(school.adminUserId, K0)).toBe(false);
    expect(await canViewClass(u.teacher!, randomUUID())).toBe(false);
    await expect(assertClassAccess({ userId: u.otherTeacher! }, K)).rejects.toMatchObject({ code: "FORBIDDEN" });
  });
});
