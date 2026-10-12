import { describe, expect, it } from "vitest";
import { db } from "@/server/db";
import { isAppError } from "@/server/lib/errors";
import { createEnrollment, createLearner } from "../../../tests/factories/learning";
import { getCourse, getLearningHome, getLessonCourseContext, listCourses } from "./course";
import { createLessonFixture } from "./testing";

/**
 * Integration: course library, course page, the lesson page's course context and the dashboard's learning facts
 * against the test database (published lessons only, the pinned syllabus version, the student's own progress).
 */

async function expectAppError(promise: Promise<unknown>, code: string): Promise<void> {
  try {
    await promise;
  } catch (error) {
    expect(isAppError(error) ? error.code : error).toBe(code);
    return;
  }
  throw new Error(`expected AppError ${code}`);
}

describe("courses", () => {
  it("lists a course with its published lessons in syllabus order and offers the first lesson", async () => {
    const fixture = await createLessonFixture();
    const [first, second, third] = fixture.lessons;
    const learner = await createLearner({ firstName: "Rufaro" });
    await createEnrollment(learner.userId, { subjectId: fixture.subjectId, syllabusId: fixture.syllabusId });

    const [course, ...rest] = await listCourses(learner.actor);
    expect(rest).toHaveLength(0);
    expect(course).toMatchObject({
      subjectId: fixture.subjectId,
      totalLessons: 3,
      completedLessons: 0,
      unitsTotal: 2,
      unitsWithLessons: 1,
      lastActivityAt: null,
      next: { id: first.id, reason: "START", locked: false, topicId: fixture.topicId },
    });

    const page = await getCourse(learner.actor, fixture.subjectId);
    expect(page.units.map((unit) => unit.id)).toEqual([fixture.topicId, fixture.otherTopicId]);
    // The draft lesson is never part of the course.
    expect(page.units[0]?.lessons.map((lesson) => lesson.id)).toEqual([first.id, second.id, third.id]);
    expect(page.units[1]).toMatchObject({ total: 0, lessons: [] });
    expect(page.assessments).toEqual({ topicTests: 0, mockExams: 0 });
  });

  it("follows the student's progress: next lesson, course context and the dashboard's continue card", async () => {
    const fixture = await createLessonFixture();
    const [first, second] = fixture.lessons;
    const learner = await createLearner({ firstName: "Tendai" });
    await createEnrollment(learner.userId, { subjectId: fixture.subjectId, syllabusId: fixture.syllabusId });
    const at = new Date("2026-10-01T08:00:00.000Z");
    await db.lessonProgress.create({
      data: { userId: learner.userId, lessonId: first.id, status: "COMPLETED", completedAt: at, lastViewedAt: at, firstViewedAt: at, progressPercent: 100 },
    });

    const [course] = await listCourses(learner.actor);
    expect(course).toMatchObject({ completedLessons: 1, next: { id: second.id, reason: "NEXT" } });
    expect(course?.lastActivityAt?.toISOString()).toBe(at.toISOString());

    const context = await getLessonCourseContext(learner.actor, fixture.subjectId, first.id);
    expect(context).toMatchObject({
      unit: { id: fixture.topicId, completed: 1, total: 3, position: 1 },
      next: { id: second.id, newUnit: false },
      course: { completed: 1, total: 3 },
    });
    expect(await getLessonCourseContext(learner.actor, fixture.subjectId, fixture.draft.id)).toBeNull();

    const home = await getLearningHome(learner.actor);
    expect(home.learner.firstName).toBe("Tendai");
    expect(home.continueLearning).toMatchObject({ course: { subjectId: fixture.subjectId }, lesson: { id: second.id } });
    expect(home.week).toBeNull();
  });

  it("refuses a course the student is not enrolled in and shows nothing for others' progress", async () => {
    const fixture = await createLessonFixture();
    const learner = await createLearner();
    await expectAppError(getCourse(learner.actor, fixture.subjectId), "NOT_FOUND");
    await expectAppError(getCourse(learner.actor, "not-a-uuid"), "NOT_FOUND");
    expect(await listCourses(learner.actor)).toEqual([]);
    expect(await getLessonCourseContext(learner.actor, fixture.subjectId, fixture.lessons[0].id)).toBeNull();
    const home = await getLearningHome(learner.actor);
    expect(home.continueLearning).toBeNull();
    expect(home.courses).toEqual([]);
  });
});
