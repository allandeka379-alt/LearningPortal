import { describe, expect, it } from "vitest";
import { canAccessSubjectContent } from "@/server/billing/entitlements";
import { db } from "@/server/db";
import { isAppError } from "@/server/lib/errors";
import { answerPracticeQuestion, getPracticeSummary } from "@/server/practice";
import { createClass } from "../../../tests/factories/identity";
import { correctResponse, createEnrollment, createLearner, learnerActor, sponsorAssignments, type Learner } from "../../../tests/factories/learning";
import { getLessonCheck, getLessonForStudent, getTopicPageForStudent, startLessonCheck } from "./index";
import { createLessonFixture, createNewerVersion, type LessonFixture } from "./testing";

/**
 * Integration: the topic page, the lesson reader and the lesson's practice questions against the test database —
 * pinned syllabus versions (§26), the free / full lesson split (§31), teacher assignments (§22) and LESSON_CHECK
 * attempts through the real attempt engine.
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

async function enrolled(fixture: LessonFixture, features: "UNLIMITED" | null = "UNLIMITED"): Promise<Learner> {
  const learner = await createLearner({ features });
  await createEnrollment(learner.userId, { subjectId: fixture.subjectId, syllabusId: fixture.syllabusId });
  return learner;
}

/** True when the shared default plan already opens every lesson (lock assertions are then not testable). */
async function freePlanOpensEverything(learner: Learner, fixture: LessonFixture): Promise<boolean> {
  return canAccessSubjectContent(learner.userId, fixture.subjectId, { syllabusId: fixture.syllabusId });
}

describe("getLessonForStudent", () => {
  it("serves an open lesson with rendered maths, headings, objectives, licensing and its place in the topic", async () => {
    const fixture = await createLessonFixture({ questionCount: 2 });
    const [first, second, third] = fixture.lessons;
    await db.lessonObjective.create({ data: { lessonId: first.id, objectiveId: fixture.chain.objectiveIds[0] as string } });
    const learner = await enrolled(fixture);

    const lesson = await getLessonForStudent(learner.actor, first.id);
    expect(lesson).toMatchObject({
      id: first.id,
      title: "Solving quadratic equations",
      locked: false,
      subject: { id: fixture.subjectId },
      topic: { id: fixture.topicId },
      position: 1,
      totalInTopic: 3,
      previous: null,
      next: { id: second.id, locked: false, state: "NOT_STARTED" },
      practiceQuestionCount: 2,
      progress: null,
    });
    expect(lesson.content?.html).toContain('class="katex');
    expect(lesson.content?.html).toContain("cb-definition");
    expect(lesson.content?.headings.map((h) => h.text)).toEqual(["Introduction", "Method", "Factorising", "Summary"]);
    expect(lesson.objectives).toHaveLength(1);
    expect(lesson.attribution).toMatchObject({ author: "Test author" });
    expect(lesson.attribution?.statement).toMatch(/^Original content by /);

    const last = await getLessonForStudent(learner.actor, third.id);
    expect(last).toMatchObject({ position: 3, previous: { id: second.id }, next: null });
  });

  it("locks PREMIUM lessons on a free plan: no body, no licensing, an upgrade path (§31)", async () => {
    const fixture = await createLessonFixture();
    const [first, second] = fixture.lessons;
    const free = await enrolled(fixture, null);
    if (await freePlanOpensEverything(free, fixture)) return; // the shared default plan grants full lessons

    const locked = await getLessonForStudent(free.actor, second.id);
    expect(locked).toMatchObject({ locked: true, content: null, attribution: null, practiceQuestionCount: 0, upgradePath: "/pricing" });
    expect(JSON.stringify(locked)).not.toContain("quadratic equation has the form");
    // Free-preview lessons stay open, and they show the locked neighbour as locked.
    const open = await getLessonForStudent(free.actor, first.id);
    expect(open.locked).toBe(false);
    expect(open.next).toMatchObject({ id: second.id, locked: true });

    const full = await enrolled(fixture);
    expect((await getLessonForStudent(full.actor, second.id)).locked).toBe(false);
  });

  it("opens a PREMIUM lesson a sponsoring school's teacher assigned, even on a free plan (§22)", async () => {
    const fixture = await createLessonFixture();
    const premium = fixture.lessons[1];
    const free = await enrolled(fixture, null);
    if (await freePlanOpensEverything(free, fixture)) return;
    const { class: klass } = await createClass({ studentUserIds: [free.userId], subjectId: fixture.subjectId });
    // The school pays for assignment work; an unsponsored class never unlocks it (tests/authz/assignment-paywall.test.ts).
    await sponsorAssignments(klass);
    const assignment = await db.assignment.create({
      data: {
        classId: klass.id,
        createdById: klass.createdById,
        subjectId: fixture.subjectId,
        lessonId: premium.id,
        type: "LESSON",
        status: "PUBLISHED",
        publishedAt: new Date(Date.now() - 60_000),
        title: "Read: completing the square",
      },
    });
    await db.assignmentProgress.create({ data: { assignmentId: assignment.id, userId: free.userId } });

    const lesson = await getLessonForStudent(free.actor, premium.id);
    expect(lesson).toMatchObject({ locked: false, assigned: true });
    expect(lesson.content?.html).toContain("katex");
    // Its neighbours are not assigned: they keep their own lock state.
    expect(lesson.previous).toMatchObject({ id: fixture.lessons[0].id, locked: false });

    // A class member who is not enrolled in the subject reads assigned work too (in the subject's published version),
    // but nothing else of that subject.
    const outsider = await createLearner({ features: null });
    await db.classMember.create({ data: { classId: klass.id, userId: outsider.userId, status: "ACTIVE", source: "ADDED_BY_STAFF" } });
    await db.assignmentProgress.create({ data: { assignmentId: assignment.id, userId: outsider.userId } });
    expect(await getLessonForStudent(outsider.actor, premium.id)).toMatchObject({ locked: false, assigned: true, topic: { id: fixture.topicId } });
    await expectAppError(getLessonForStudent(outsider.actor, fixture.lessons[0].id), "NOT_FOUND");

    // A closed assignment no longer opens anything.
    await db.assignment.update({ where: { id: assignment.id }, data: { status: "CLOSED" } });
    await expectAppError(getLessonForStudent(outsider.actor, premium.id), "NOT_FOUND");
    expect((await getLessonForStudent(free.actor, premium.id)).locked).toBe(true);
  });

  it("finds only published lessons of the student's pinned syllabus version (§26)", async () => {
    const fixture = await createLessonFixture();
    const [first] = fixture.lessons;
    const learner = await enrolled(fixture);

    await expectAppError(getLessonForStudent(learner.actor, fixture.draft.id), "NOT_FOUND");
    await expectAppError(getLessonForStudent(learner.actor, "not-a-uuid"), "NOT_FOUND");
    const stranger = await createLearner();
    await expectAppError(getLessonForStudent(stranger.actor, first.id), "NOT_FOUND");
    await expectAppError(getLessonForStudent(learnerActor(learner.userId, { roles: ["PARENT"] }), first.id), "FORBIDDEN");

    // A newer version tags its own lesson, and re-tags the existing lesson (tags are curriculum metadata).
    const newer = await createNewerVersion(fixture);
    const newOnly = (
      await import("../../../tests/factories/curriculum").then((m) =>
        m.createLessonForTopic({ subjectId: fixture.subjectId, topicId: newer.topicId, title: "New syllabus lesson", accessTier: "FREE" }),
      )
    ).lesson;
    await db.lessonTopic.create({ data: { lessonId: first.id, topicId: newer.topicId, sortOrder: 5 } });

    // Pinned to the older version: the new version's lesson does not exist for them; the shared one reads in v1.
    await expectAppError(getLessonForStudent(learner.actor, newOnly.id), "NOT_FOUND");
    expect((await getLessonForStudent(learner.actor, first.id)).topic.id).toBe(fixture.topicId);

    // Pinned to the newer version: both are readable, in the new version's topic.
    const onNewer = await createLearner();
    await createEnrollment(onNewer.userId, { subjectId: fixture.subjectId, syllabusId: newer.syllabusId });
    expect((await getLessonForStudent(onNewer.actor, newOnly.id)).topic.id).toBe(newer.topicId);
    const shared = await getLessonForStudent(onNewer.actor, first.id);
    expect(shared.topic.id).toBe(newer.topicId);
    expect(shared).toMatchObject({ position: 2, totalInTopic: 2, previous: { id: newOnly.id } });
    // A topic of a version the student is not pinned to is never used, even when asked for.
    expect((await getLessonForStudent(onNewer.actor, first.id, { topicId: fixture.topicId })).topic.id).toBe(newer.topicId);
  });
});

describe("getTopicPageForStudent", () => {
  it("lists the topic's lessons in order with completion and lock state, subtopics and mastery", async () => {
    const fixture = await createLessonFixture();
    const [first, second, third] = fixture.lessons;
    const learner = await enrolled(fixture);
    await db.lessonProgress.create({ data: { userId: learner.userId, lessonId: first.id, status: "COMPLETED", completedAt: new Date(), completedRevision: 1, progressPercent: 100 } });
    await db.lessonProgress.create({ data: { userId: learner.userId, lessonId: third.id } });

    const page = await getTopicPageForStudent(learner.actor, fixture.subjectId, fixture.topicId);
    expect(page.topic).toMatchObject({ id: fixture.topicId, kind: "TOPIC", descriptionHtml: null });
    expect(page.lessons.map((l) => [l.id, l.state, l.locked])).toEqual([
      [first.id, "COMPLETED", false],
      [second.id, "NOT_STARTED", false],
      [third.id, "IN_PROGRESS", false],
    ]);
    expect(page.lessonCounts).toEqual({ total: 3, completed: 1, locked: 0 });
    expect(page.lessonsFrom).toBeNull();
    expect(page.mastery).toBeNull();
    expect(page.subtopics).toEqual([
      expect.objectContaining({ id: fixture.subtopicId, kind: "SUBTOPIC", score: null, band: null, questionsAttempted: 0, lessonCount: 0 }),
    ]);
    expect(page.syllabus.id).toBe(fixture.syllabusId);
    expect(page.ancestors).toEqual([]);
  });

  it("shows a subtopic's objectives and inherits its parent topic's lessons", async () => {
    const fixture = await createLessonFixture();
    const learner = await enrolled(fixture);
    const page = await getTopicPageForStudent(learner.actor, fixture.subjectId, fixture.subtopicId);
    expect(page.ancestors.map((a) => a.id)).toEqual([fixture.topicId]);
    expect(page.objectives).toHaveLength(2);
    expect(page.lessonsFrom).toMatchObject({ id: fixture.topicId });
    expect(page.lessons.map((l) => l.id)).toEqual(fixture.lessons.map((l) => l.id));

    const empty = await getTopicPageForStudent(learner.actor, fixture.subjectId, fixture.otherTopicId);
    expect(empty.lessons).toEqual([]);
    expect(empty.lessonsFrom).toBeNull();
  });

  it("marks lessons the plan does not cover as locked", async () => {
    const fixture = await createLessonFixture();
    const free = await enrolled(fixture, null);
    if (await freePlanOpensEverything(free, fixture)) return;
    const page = await getTopicPageForStudent(free.actor, fixture.subjectId, fixture.topicId);
    expect(page.lessons.map((l) => l.locked)).toEqual([false, true, false]);
    expect(page.lessonCounts.locked).toBe(1);
  });

  it("refuses other versions' topics, other subjects and students not enrolled (§26)", async () => {
    const fixture = await createLessonFixture();
    const learner = await enrolled(fixture);
    const newer = await createNewerVersion(fixture);
    await expectAppError(getTopicPageForStudent(learner.actor, fixture.subjectId, newer.topicId), "NOT_FOUND");
    const other = await createLessonFixture();
    await expectAppError(getTopicPageForStudent(learner.actor, other.subjectId, other.topicId), "NOT_FOUND");
    await expectAppError(getTopicPageForStudent(learner.actor, fixture.subjectId, other.topicId), "NOT_FOUND");
    await expectAppError(getTopicPageForStudent(learner.actor, "x", fixture.topicId), "NOT_FOUND");
  });
});

describe("lesson practice questions (LESSON_CHECK)", () => {
  it("starts, resumes, answers with instant feedback and reports the result", async () => {
    const fixture = await createLessonFixture({ questionCount: 2 });
    const [first] = fixture.lessons;
    const learner = await enrolled(fixture);

    expect(await getLessonCheck(learner.actor, first.id)).toEqual({ status: "NOT_STARTED", questionCount: 2 });
    const started = await startLessonCheck(learner.actor, first.id, { idempotencyKey: "lesson-check-key-1" });
    expect(started.resumed).toBe(false);
    expect((await startLessonCheck(learner.actor, first.id)).attemptId).toBe(started.attemptId);

    const attempt = await db.assessmentAttempt.findUniqueOrThrow({ where: { id: started.attemptId }, select: { mode: true, lessonId: true, questionCount: true } });
    expect(attempt).toEqual({ mode: "LESSON_CHECK", lessonId: first.id, questionCount: 2 });
    const slots = await db.questionAttempt.findMany({ where: { attemptId: started.attemptId }, orderBy: { position: "asc" }, select: { questionId: true } });
    expect(slots.map((s) => s.questionId)).toEqual(fixture.questions.map((q) => q.id));

    const open = await getLessonCheck(learner.actor, first.id);
    if (open.status !== "IN_PROGRESS") throw new Error(`expected IN_PROGRESS, got ${open.status}`);
    expect(open).toMatchObject({ attemptId: started.attemptId, questionCount: 2, answeredCount: 0, current: { position: 1 } });
    // The presented question carries no answer key before marking.
    expect(JSON.stringify(open.current?.question)).not.toMatch(/isCorrect|answerSpec/);

    for (const [index, question] of fixture.questions.entries()) {
      const feedback = await answerPracticeQuestion(learner.actor, { attemptId: started.attemptId, position: index + 1, response: correctResponse(question.definition) });
      expect(feedback.outcome).toBe("correct");
    }

    const done = await getLessonCheck(learner.actor, first.id);
    expect(done).toMatchObject({ status: "COMPLETED", attemptId: started.attemptId, answeredCount: 2, correctCount: 2, percentage: 100, provisional: false, canRetry: true });
    // The results page links back to the lesson, and shows the band change recorded on the attempt (§11).
    const summary = await getPracticeSummary(learner.actor, started.attemptId);
    expect(summary).toMatchObject({ mode: "LESSON_CHECK", lesson: { id: first.id, title: first.title }, selfAssessableCount: 0 });
    expect(summary.topics.length).toBeGreaterThan(0);
    for (const topic of summary.topics) expect(topic.change).toEqual({ before: null, after: topic.mastery?.band });
    const again = await startLessonCheck(learner.actor, first.id);
    expect(again.resumed).toBe(false);
    expect(again.attemptId).not.toBe(started.attemptId);
  });

  it("never starts the questions of a locked lesson, and needs questions and an active subject", async () => {
    const fixture = await createLessonFixture({ questionCount: 1 });
    const [first, second] = fixture.lessons;
    const learner = await enrolled(fixture);
    await expectAppError(startLessonCheck(learner.actor, second.id), "NOT_FOUND"); // no questions linked
    expect(await getLessonCheck(learner.actor, second.id)).toEqual({ status: "UNAVAILABLE", questionCount: 0 });

    await db.subjectEnrollment.update({ where: { userId_subjectId: { userId: learner.userId, subjectId: fixture.subjectId } }, data: { status: "DROPPED" } });
    await expectAppError(startLessonCheck(learner.actor, first.id), "VALIDATION");

    const free = await enrolled(fixture, null);
    if (await freePlanOpensEverything(free, fixture)) return;
    // Link a question to the PREMIUM lesson: it still never starts for a free plan.
    const { setContentPublishContext } = await import("@/server/lib/db-context");
    await db.$transaction(async (tx) => {
      await setContentPublishContext(tx, second.id);
      await tx.lessonQuestion.create({ data: { lessonId: second.id, questionId: fixture.questions[0]?.id as string } });
    });
    await expectAppError(startLessonCheck(free.actor, second.id), "ENTITLEMENT_REQUIRED");
    expect(await getLessonCheck(free.actor, second.id)).toEqual({ status: "UNAVAILABLE", questionCount: 0 });
  });
});
