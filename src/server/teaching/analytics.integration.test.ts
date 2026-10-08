import { beforeAll, describe, expect, it } from "vitest";
import { dateColumnFromLocalDate, localDateString } from "@/lib/dates";
import { db } from "@/server/db";
import { createEnrollment, createLearningSetup, type LearningSetup } from "../../../tests/factories/learning";
import { getClassPerformance, getClassStudentPerformance, getClassTopicPerformance } from "./analytics";
import { createAssignment } from "./assignments";
import { getTeacherDashboard } from "./dashboard";
import { expectCode, harareLocal, makeClass, makeStudent, makeTeacher, teachingWorld, type TeachingWorld } from "./testing";

let world: TeachingWorld;
let science: LearningSetup;
let subjectClass: string;
let tutorClass: string;
let tutor: Awaited<ReturnType<typeof makeTeacher>>;
const s: Record<string, Awaited<ReturnType<typeof makeStudent>>> = {};

async function mastery(userId: string, setup: LearningSetup, topicIndex: number, score: number) {
  const band = score < 40 ? "WEAK" : score < 60 ? "DEVELOPING" : score < 75 ? "COMPETENT" : score < 90 ? "STRONG" : "MASTERED";
  await db.topicMastery.create({
    data: {
      userId,
      topicId: setup.topicIds[topicIndex] as string,
      subjectId: setup.subjectId,
      syllabusId: setup.syllabusId,
      topicKind: "TOPIC",
      score,
      band,
      questionsAttempted: 10,
      questionsCorrect: Math.round(score / 10),
      lastPracticedAt: new Date(),
    },
  });
}

beforeAll(async () => {
  world = await teachingWorld();
  science = await createLearningSetup({ topics: 1, subtopicsPerTopic: 1, questionsPerLeaf: 1 });
  for (const name of ["Ann", "Ben", "Cid"]) s[name] = await makeStudent({ schoolId: world.schoolId, firstName: name });
  const ids = Object.values(s).map((x) => x.userId);
  subjectClass = (await makeClass({ teacher: world.teacher, schoolId: world.schoolId, subjectId: world.setup.subjectId, members: ids })).id;
  tutor = await makeTeacher({ firstName: "Tutu" });
  tutorClass = (await makeClass({ teacher: tutor, schoolId: null, subjectId: null, members: [s.Ann!.userId] })).id;

  for (const [name, avg] of [["Ann", 80], ["Ben", 40], ["Cid", 60]] as const) {
    const userId = s[name]!.userId;
    await createEnrollment(userId, world.setup);
    await db.subjectProgress.create({ data: { userId, subjectId: world.setup.subjectId, averageScorePercent: avg, progressPercent: avg / 2 } });
  }
  await createEnrollment(s.Ann!.userId, science);
  await db.subjectProgress.create({ data: { userId: s.Ann!.userId, subjectId: science.subjectId, averageScorePercent: 10, progressPercent: 5 } });
  await mastery(s.Ann!.userId, world.setup, 0, 30);
  await mastery(s.Ben!.userId, world.setup, 0, 20);
  await mastery(s.Cid!.userId, world.setup, 0, 85);
  await mastery(s.Ann!.userId, world.setup, 1, 90);
  await mastery(s.Ben!.userId, world.setup, 1, 95);
  await mastery(s.Ann!.userId, science, 0, 5);
});

describe("class drill-down (§22)", () => {
  it("shows class average, subject and topic performance, students and weak topics", async () => {
    const perf = await getClassPerformance(world.teacher, subjectClass);
    expect(perf.scope).toEqual({ subjectIds: [world.setup.subjectId], derived: false });
    expect(perf.analytics.classAverage).toMatchObject({ students: 3, averageScorePct: 60, studentsWithScores: 3 });
    expect(perf.analytics.subjects.map((x) => x.subjectId)).toEqual([world.setup.subjectId]);
    expect(perf.weakTopics.map((t) => t.topicId)).toEqual([world.setup.topicIds[0]]);
    expect(perf.weakTopics[0]).toMatchObject({ weakStudents: 2, subjectId: world.setup.subjectId });
    expect(perf.analytics.students.map((x) => x.name)).toEqual(["Ann", "Ben", "Cid"]);
  });

  it("drills into a topic, weakest students first", async () => {
    const topic = await getClassTopicPerformance(world.teacher, subjectClass, world.setup.topicIds[0] as string);
    expect(topic.students.map((x) => [x.name, x.band])).toEqual([
      ["Ben", "WEAK"],
      ["Ann", "WEAK"],
      ["Cid", "STRONG"],
    ]);
    expect(topic.summary).toMatchObject({ students: 3, started: 3, weakStudents: 2 });
    await expectCode(getClassTopicPerformance(world.teacher, subjectClass, science.topicIds[0] as string), "NOT_FOUND");
  });

  it("drills into one student and audits the view once per window", async () => {
    const ann = s.Ann!.userId;
    const view = await getClassStudentPerformance(world.teacher, subjectClass, ann);
    expect(view.detail.subjects.map((x) => x.subjectId)).toEqual([world.setup.subjectId]);
    await getClassStudentPerformance(world.teacher, subjectClass, ann);
    const audits = await db.auditLog.findMany({ where: { action: "student.view", targetUserId: ann, actorUserId: world.teacher.userId } });
    expect(audits).toHaveLength(1);
    expect(audits[0]).toMatchObject({ schoolId: world.schoolId, reason: expect.stringContaining("Class teacher") });

    const outsider = await makeStudent();
    await expectCode(getClassStudentPerformance(world.teacher, subjectClass, outsider.userId), "NOT_FOUND");
    const other = await teachingWorld({ topics: 1 });
    await expectCode(getClassStudentPerformance(other.teacher, subjectClass, ann), "FORBIDDEN");
    await expectCode(getClassPerformance(other.teacher, subjectClass), "FORBIDDEN");
  });
});

describe("subject-less classes are scoped to the work set to them", () => {
  it("shows no subject data before any work, then only the assigned subjects", async () => {
    const before = await getClassPerformance(tutor, tutorClass);
    expect(before.scope).toEqual({ subjectIds: [], derived: true });
    expect(before.analytics.subjects).toEqual([]);
    expect(before.analytics.classAverage.averageScorePct).toBeNull();
    expect(before.analytics.students[0]).toMatchObject({ averageScorePct: null, weakTopics: 0 });
    const hidden = await getClassStudentPerformance(tutor, tutorClass, s.Ann!.userId);
    expect(hidden.detail.subjects).toEqual([]);

    await createAssignment(tutor, {
      classId: tutorClass,
      type: "PRACTICE",
      title: "Maths practice",
      subjectId: world.setup.subjectId,
      topicIds: [world.setup.topicIds[0]],
      questionCount: "1",
      dueAt: harareLocal(new Date(Date.now() + 86_400_000)),
    });
    const after = await getClassPerformance(tutor, tutorClass);
    expect(after.scope.subjectIds).toEqual([world.setup.subjectId]);
    expect(after.analytics.subjects.map((x) => x.subjectId)).toEqual([world.setup.subjectId]);
    // Science (average 10) is excluded: only maths (80) counts.
    expect(after.analytics.classAverage.averageScorePct).toBe(80);
    expect(after.analytics.students[0]).toMatchObject({ averageScorePct: 80, weakTopics: 1 });
    const detail = await getClassStudentPerformance(tutor, tutorClass, s.Ann!.userId);
    expect(detail.detail.subjects.map((x) => x.subjectId)).toEqual([world.setup.subjectId]);
    await expectCode(getClassTopicPerformance(tutor, tutorClass, science.topicIds[0] as string), "NOT_FOUND");
  });
});

describe("teacher dashboard", () => {
  it("shows classes with averages, active students and upcoming work", async () => {
    await createAssignment(world.teacher, {
      classId: subjectClass,
      type: "PRACTICE",
      title: "Due soon",
      topicIds: [world.setup.topicIds[0]],
      questionCount: "1",
      dueAt: harareLocal(new Date(Date.now() + 2 * 86_400_000)),
    });
    await db.dailyActivity.create({ data: { userId: s.Ben!.userId, date: dateColumnFromLocalDate(localDateString(new Date())), studySeconds: 600 } });
    const dashboard = await getTeacherDashboard(world.teacher);
    const row = dashboard.classes.find((c) => c.id === subjectClass);
    expect(row).toMatchObject({ activeStudents: 3, classAveragePct: 60 });
    expect(row?.activeLast7Days).toBe(1);
    expect(dashboard.upcoming.map((a) => a.title)).toContain("Due soon");
    expect(dashboard.marking).toEqual({ attempts: 0, answers: 0 });
    const tutorDashboard = await getTeacherDashboard(tutor);
    expect(tutorDashboard.classes.find((c) => c.id === tutorClass)?.classAveragePct).toBe(80);
  });
});
